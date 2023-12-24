/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.ex;

import static spark.Spark.*;
import static spark.Spark.get;
import com.google.gson.Gson;
import database.tables.EditPetsTable;
import mainClasses.Pet;
import servlets.StandardResponse;

/**
 *
 * @author spiros
 */
public class PetOwnerRESTAPI {

    public static void main(String[] args) {
        port(4562);
        EditPetsTable editPetsTable = new EditPetsTable();

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
//        get("/api/petOwners/:ownerId/hasRequested", (request, response) -> {
//            String ownerId = request.params(":ownerId");
//            try {
//                boolean hasRequested = editBookingsTable.hasOwnerMadeRequest(ownerId);
//                response.status(200);
//                response.type("application/json");
//                return new Gson().toJson(new StandardResponse(hasRequested));
//            } catch (Exception e) {
//                e.printStackTrace();
//                response.status(500);
//                return "Internal Server Error";
//            }
//        });
    }
}
