/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.ex;

import com.google.gson.Gson;
import database.tables.EditBookingsTable;
import database.tables.EditPetKeepersTable;
import database.tables.EditPetOwnersTable;
import database.tables.EditPetsTable;
import java.util.ArrayList;
import mainClasses.Booking;
import mainClasses.Pet;
import mainClasses.PetKeeper;
import mainClasses.PetOwner;
import servlets.StandardResponse;
import static spark.Spark.delete;
import static spark.Spark.get;
import static spark.Spark.port;

/**
 *
 * @author dimos
 */
public class AdminRESTAPI {
    static ArrayList<PetOwner> owners = new ArrayList<>();
    static ArrayList<PetKeeper> keepers = new ArrayList<>();
    static ArrayList<Booking> bookings = new ArrayList<>();
    static ArrayList<Pet> pets = new ArrayList<>();
    static String apiPath = "/adminAPI";


    public static void main(String[] args) {
        port(4560);

        EditPetOwnersTable eot = new EditPetOwnersTable();
        EditPetKeepersTable ekt = new EditPetKeepersTable();
        EditBookingsTable ebt = new EditBookingsTable();
        EditPetsTable ept = new EditPetsTable();

        get(apiPath + "/PO", (request, response) -> {
            owners.clear();
            owners = eot.getAllPetOwners();

            response.status(200);
            return new Gson().toJson(new StandardResponse(new Gson().toJsonTree(owners)));
        });

        get(apiPath + "/PK", (request, response) -> {
            keepers.clear();
            keepers = ekt.getAllFullPetKeepers();

            response.status(200);
            return new Gson().toJson(new StandardResponse(new Gson().toJsonTree(keepers)));
        });

        delete(apiPath + "/PO/delete/:id", (request, response) -> {
            owners.clear();
            String id = request.params(":id");
            System.out.println("ID");
            System.out.println(id);
            eot.deletePetOwner(id);
            System.out.println("Delete");
            owners = eot.getAllPetOwners();
            System.out.println(owners);

            response.status(200);
            return new Gson().toJson(new StandardResponse(new Gson().toJsonTree(owners)));
        });

        delete(apiPath + "/PK/delete/:id", (request, response) -> {
            keepers.clear();
            String id = request.params(":id");
            ekt.deletePetKeeper(id);
            keepers = ekt.getAllFullPetKeepers();

            response.status(200);
            return new Gson().toJson(new StandardResponse(new Gson().toJsonTree(keepers)));
        });

        get(apiPath + "/profit", (request, response) -> {
            bookings.clear();
            bookings = ebt.getAllBookings();
            float profit = 0;
            float keepers_p = 0;

            for (Booking book : bookings) {
                if (book.getStatus().equals("finished")) {
                    int temp = book.getPrice();
                    profit += (temp * 0.15);
                    keepers_p += (temp * 0.85);
                }
            }

            ArrayList<Float> prof = new ArrayList<>();

            prof.add(profit);
            prof.add(keepers_p);

            response.status(200);
            return prof;
        });

        get(apiPath + "/pets", (request, response) -> {
            pets.clear();
            pets = ept.databaseToPets();
            int cat = 0;
            int dog = 0;

            for (Pet pet : pets) {
                if (pet.getType().equals("dog")) {
                    dog++;
                    continue;
                }
                cat++;
            }

            ArrayList<Integer> pet_coount = new ArrayList<>();

            pet_coount.add(cat);
            pet_coount.add(dog);

            response.status(200);
            return pet_coount;
        });
    }
}
