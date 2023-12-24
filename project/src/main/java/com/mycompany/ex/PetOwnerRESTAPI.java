/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.ex;

import static spark.Spark.*;
import static spark.Spark.get;
import database.tables.EditPetsTable;
import mainClasses.Pet;
import mainClasses.PetKeeper;
import servlets.StandardResponse;
import database.tables.EditBookingsTable;
import database.tables.EditPetKeepersTable;
import com.google.gson.JsonObject;
import com.google.gson.Gson;
import java.util.ArrayList;

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
    }
}
