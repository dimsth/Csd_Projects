/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.ex;

import static spark.Spark.*;
import static spark.Spark.get;
import database.tables.EditPetsTable;
import mainClasses.Review;
import mainClasses.Pet;
import mainClasses.PetKeeper;
import servlets.StandardResponse;
import database.tables.EditPetKeepersTable;
import com.google.gson.JsonObject;
import com.google.gson.Gson;
import java.util.ArrayList;
import mainClasses.Booking;
import database.tables.EditBookingsTable;
import database.tables.EditReviewsTable;

/**
 *
 * @author spiros
 */
public class PetOwnerRESTAPI {

    public static void main(String[] args) {
        port(4562);
        EditPetsTable editPetsTable = new EditPetsTable();
        EditBookingsTable editBookingsTable = new EditBookingsTable();
        EditPetKeepersTable editPetKeepersTable = new EditPetKeepersTable();
        EditReviewsTable editReviewsTable = new EditReviewsTable();

        // Endpoint to check for available pet
        get("/api/petOwners/:ownerId/availablePet", (request, response) -> {
            String ownerId = request.params(":ownerId");
            try {
                Pet availablePet = editPetsTable.getAvailablePetForOwner(ownerId);
                if (availablePet != null) {
                    response.status(200);
                    response.type("application/json");
                    return new Gson().toJson(new StandardResponse(new Gson().toJsonTree(availablePet)));
                } else {
                    response.status(204); // No Content
                    return "";
                }
            } catch (Exception e) {
                e.printStackTrace();
                response.status(500);
                return "Internal Server Error";
            }
        });

        // Endpoint to check if the owner has already made a booking request
   get("/api/petOwners/:ownerId/hasActiveOrPendingBooking", (request, response) -> {
       String ownerId = request.params(":ownerId");

       try {
           boolean hasRequested = editBookingsTable.hasOwnerMadeRequest(ownerId);
           response.status(200);
           response.type("application/json");
           JsonObject jsonResponse = new JsonObject();
           jsonResponse.addProperty("hasRequested", hasRequested);
           jsonResponse.addProperty("status", response.status());
           return new Gson().toJson(jsonResponse);
       } catch (Exception e) {
           e.printStackTrace();
           response.status(500);
           JsonObject jsonResponse = new JsonObject();
           jsonResponse.addProperty("error", "Internal Server Error");
           jsonResponse.addProperty("status", response.status());
           return new Gson().toJson(jsonResponse);
       }

        });

        post("/api/addBooking", (request, response) -> {
            try {
                String bookingJson = request.body();
                System.out.println("Received booking data: " + bookingJson); // Print the raw JSON data

                editBookingsTable.addBookingFromJSON(bookingJson); // Assuming 'editBookingsTable' is an instance of EditBookingsTable
                response.status(200);
                return "Booking request successfully added";
            } catch (Exception e) {
                e.printStackTrace();
                response.status(500); // HTTP 500 Internal Server Error
                return "Internal Server Error";
            }
        });
        post("/api/submitReview", (request, response) -> {
            try {
                String reviewJson = request.body();
                System.out.println("Received review data: " + reviewJson); // Print the raw JSON data for debugging

                editReviewsTable.addReviewFromJSON(reviewJson);

                response.status(200); // HTTP 200 OK
                return "Review successfully submitted";
            } catch (Exception e) {
                e.printStackTrace();
                response.status(500); // HTTP 500 Internal Server Error
                return "Internal Server Error";
            }
        });


        get("/api/availablePetKeepers/:petType", (request, response) -> {
            String petType = request.params(":petType");
            try {
                ArrayList<PetKeeper> availableKeepers = editPetKeepersTable.getAvailablePetKeepersByType(petType);
                response.status(200);
                response.type("application/json");
                return new Gson().toJson(new StandardResponse(new Gson().toJsonTree(availableKeepers)));
            } catch (Exception e) {
                e.printStackTrace();
                response.status(500);
                return "Internal Server Error";
            }
        });

        get("/api/petOwners/:ownerId/petType", (request, response) -> {
            String ownerId = request.params(":ownerId");
            try {
                // Assuming the method getPetTypeByOwnerId returns the type of pet for a given owner ID
                String petType = editPetsTable.getPetTypeByOwnerId(ownerId);
                if (petType != null) {
                    response.status(200);
                    response.type("application/json");
                    JsonObject jsonResponse = new JsonObject();
                    jsonResponse.addProperty("petType", petType);
                    return new Gson().toJson(jsonResponse);
                } else {
                    response.status(204); // No Content
                    return "";
                }
            } catch (Exception e) {
                e.printStackTrace();
                response.status(500);
                JsonObject jsonResponse = new JsonObject();
                jsonResponse.addProperty("error", "Internal Server Error");
                jsonResponse.addProperty("status", response.status());
                return new Gson().toJson(jsonResponse);
            }
        });

        get("/ownerAPI/booking/:ownerId", (request, response) -> {
            String ownerId = request.params(":ownerId");
            try {
                ArrayList<Booking> bookingsForOwner = editBookingsTable.getBookingsForOwner(ownerId);
                if (!bookingsForOwner.isEmpty()) {
                    response.status(200);
                    response.type("application/json");
                    return new Gson().toJson(new StandardResponse(new Gson().toJsonTree(bookingsForOwner)));
                } else {
                    response.status(204); // No Content
                    return "";
                }
            } catch (Exception e) {
                e.printStackTrace();
                response.status(500);
                return "Internal Server Error";
            }
        });

        get("/ownerAPI/reviews/:ownerId", (request, response) -> {
            System.out.println("nigga15");
            String ownerId = request.params(":ownerId");
            try {
                ArrayList<Review> reviewsForOwner = editReviewsTable.getReviewsForOwner(ownerId);
                if (!reviewsForOwner.isEmpty()) {
                    response.status(200);
                    response.type("application/json");
                    return new Gson().toJson(new StandardResponse(new Gson().toJsonTree(reviewsForOwner)));
                } else {
                    response.status(204); // No Content
                    return "";
                }
            } catch (Exception e) {
                e.printStackTrace();
                response.status(500);
                return "Internal Server Error";
            }
        });
        get("/api/checkReview/:bookingId", (request, response) -> {
            String bookingId = request.params(":bookingId");
            try {
                Booking booking = editBookingsTable.getBookingById(bookingId);
                if (booking != null) {
                    String ownerId = String.valueOf(booking.getOwner_id());
                    String keeperId = String.valueOf(booking.getKeeper_id());
                    boolean reviewExists = editReviewsTable.reviewExistsForBooking(ownerId, keeperId);
                    response.status(200);
                    response.type("application/json");
                    JsonObject jsonResponse = new JsonObject();
                    jsonResponse.addProperty("exists", reviewExists);
                    return new Gson().toJson(jsonResponse);
                } else {
                    response.status(404); // Booking not found
                    return "Booking not found";
                }
            } catch (Exception e) {
                e.printStackTrace();
                response.status(500);
                return "Internal Server Error";
            }
        });

    }
}
