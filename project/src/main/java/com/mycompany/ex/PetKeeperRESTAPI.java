/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.ex;

import com.google.gson.Gson;
import static com.mycompany.ex.ChatGPT_Java_Code.chatGPT;
import database.tables.EditBookingsTable;
import database.tables.EditReviewsTable;
import java.util.ArrayList;
import mainClasses.Booking;
import mainClasses.Review;
import servlets.StandardResponse;
import static spark.Spark.*;
import static spark.Spark.get;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import static java.lang.Integer.parseInt;
import mainClasses.PetKeeper;
import database.tables.EditPetKeepersTable;

/**
 *
 * @author dimos
 */
public class PetKeeperRESTAPI {

    static ArrayList<Booking> bookings = new ArrayList<>();
    static ArrayList<Review> reviews = new ArrayList<>();
    static ArrayList<String> resp = new ArrayList<>();
    static String apiPath = "/keeperAPI";

    public static void main(String[] args) {
        port(4568);

        EditBookingsTable ebt = new EditBookingsTable();
        EditReviewsTable ert = new EditReviewsTable();

        get("/api/petKeepers", (request, response) -> {
            try {
                ArrayList<PetKeeper> petKeepers = new EditPetKeepersTable().getAllPetKeepers();
                response.status(200);
                response.type("application/json");
                return new Gson().toJson(new StandardResponse(new Gson().toJsonTree(petKeepers)));
            } catch (Exception e) {
                e.printStackTrace();
                response.status(500);
                return "Internal Server Error";
            }
        });

        get(apiPath + "/:id", (request, response) -> {
            resp.clear();
            bookings.clear();
            reviews.clear();
            String id = request.params(":id");
            try {
                bookings = ebt.takeAllPetKeepersBooking(id);
                reviews = ert.databaseTokeeperReviews(id);

                int finishedBook = 0;
                long daysDifference = 0;
                for (Booking book : bookings) {
                    if (book.getStatus().equals("finished")) {
                        LocalDate date1 = LocalDate.parse(book.getFromDate());
                        LocalDate date2 = LocalDate.parse(book.getToDate());

                        daysDifference += ChronoUnit.DAYS.between(date1, date2);

                        finishedBook++;
                    }
                }
                resp.add(String.valueOf(finishedBook));
                resp.add(String.valueOf(daysDifference));

                float sum = 0;
                for (Review rev : reviews) {
                    try {
                        sum += Float.parseFloat(rev.getReviewScore());
                    } catch (NumberFormatException e) {
                        System.err.println("Invalid float format");
                    }
                }
                if (sum != 0) {
                    sum = sum / reviews.size();
                }
                resp.add(String.valueOf(sum));

                for (Review rev : reviews) {
                    resp.add(rev.getReviewText());
                }

                response.status(200);
                response.type("application/json");
                return resp;
            } catch (Exception e) {
                e.printStackTrace();
                response.status(500);
                return "Internal Server Error";
            }
        });

        get(apiPath + "/booking/:id", (request, response) -> {
            resp.clear();
            String id = request.params(":id");

            try {
                bookings = ebt.takeAllPetKeepersBooking(id);

                for (Booking book : bookings) {
                    if (book.getStatus().equals("requested") || book.getStatus().equals("accepted")) {
                        resp.add(String.valueOf(book.getBorrowing_id()));
                        resp.add(String.valueOf(book.getOwner_id()));
                        resp.add(String.valueOf(book.getPet_id()));
                        resp.add(book.getFromDate());
                        resp.add(book.getToDate());
                        resp.add(book.getStatus());
                    }
                }
                response.status(200);
                response.type("application/json");
                return resp;
            } catch (Exception e) {
                e.printStackTrace();
                response.status(500);
                resp.add("0");
                return new Gson().toJson(new StandardResponse(new Gson().toJsonTree(resp)));
            }
        });

        put(apiPath + "/booking/:id/:status", (request, response) -> {
            resp.clear();
            int id = parseInt(request.params(":id"));
            String status = request.params(":status");

            try {
                ebt.updateBooking(id, status);
                resp.add("1");
                response.status(200);
                response.type("application/json");
                return resp;
            } catch (Exception e) {
                e.printStackTrace();
                response.status(500);
                resp.add("0");
                return new Gson().toJson(new StandardResponse(new Gson().toJsonTree(resp)));
            }
        });

        get(apiPath + "/chatgtp/:text", (request, response) -> {
            resp.clear();
            String text = request.params(":text");

            resp.add(chatGPT(text));

            return resp;
        });
    }
}
