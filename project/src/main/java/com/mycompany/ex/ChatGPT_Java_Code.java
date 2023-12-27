package com.mycompany.ex;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;

public class ChatGPT_Java_Code {

    public static String key = "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";

    public static String chatGPT(String text) throws IOException, JSONException, InterruptedException {
        String url = "https://api.openai.com/v1/chat/completions";
        JSONObject message = new JSONObject();
        message.put("role", "user");
        message.put("content", text);

        JSONObject data = new JSONObject();
        data.put("model", "gpt-3.5-turbo");
        data.put("messages", new JSONArray().put(message));
        data.put("temperature", 1.0);
        data.put("max_tokens", 1000);

        int maxRetries = 3;
        int retryDelay = 60000; // milliseconds
        for (int retryCount = 0; retryCount < maxRetries; retryCount++) {
            try {
                HttpURLConnection con = (HttpURLConnection) new URL(url).openConnection();
                con.setRequestMethod("POST");
                con.setRequestProperty("Content-Type", "application/json");
                con.setRequestProperty("Authorization", "Bearer " + key);
                con.setDoOutput(true);

                try (OutputStream os = con.getOutputStream()) {
                    byte[] input = data.toString().getBytes("utf-8");
                    os.write(input, 0, input.length);
                }

                try (BufferedReader br = new BufferedReader(new InputStreamReader(con.getInputStream(), "utf-8"))) {
                    StringBuilder response = new StringBuilder();
                    String responseLine = null;
                    while ((responseLine = br.readLine()) != null) {
                        response.append(responseLine.trim());
                    }
                    return new JSONObject(response.toString()).getJSONArray("choices").getJSONObject(0).getJSONObject("message").getString("content");
                }
            } catch (IOException e) {
                if (e.getMessage().contains("Server returned HTTP response code: 429")) {
                    System.out.println("Rate limit exceeded. Retrying in " + retryDelay / 1000 + " seconds...");
                    Thread.sleep(retryDelay);
                } else {
                    throw e;
                }
            }
        }
        throw new IOException("Failed to get a response after " + maxRetries + " retries.");
    }

    public static String extractMessageFromJSONResponse(String response) {
        int start = response.indexOf("content") + 11;

        int end = response.indexOf("\"", start);

        return response.substring(start, end);

    }
}
