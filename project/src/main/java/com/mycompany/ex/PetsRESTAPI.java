/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.ex;

import com.google.gson.Gson;
import database.tables.EditPetsTable;
import static java.lang.Integer.parseInt;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;
import mainClasses.Pet;
import servlets.StandardResponse;
import static spark.Spark.get;
import static spark.Spark.post;
import static spark.Spark.put;
import static spark.Spark.delete;



/**
 *
 * @author mountant
 */
public class PetsRESTAPI {

    static ArrayList<Pet> pets = new ArrayList<>();
    static String apiPath = "/petsAPI";

    public static void main(String[] args) {
        pets.clear();
        EditPetsTable ept = new EditPetsTable();

        System.out.println("Start");

        get(apiPath + "/pets", (request, response) -> {
            System.out.println("Try");
            pets.clear();
            try {
                System.out.println("Now here");
                System.out.println("Requested URL: " + request.url());
                pets = ept.databaseToPets();
                response.status(200);
                response.type("application/json");
                return new Gson().toJson(new StandardResponse(new Gson().toJsonTree(pets)));
            } catch (Exception e) {
                e.printStackTrace();
                response.status(500);
                return "Internal Server Error";
            }
        });

        get(apiPath + "/owner/:owner_id", (request, response) -> {
            pets.clear();
            try {
                ArrayList<Pet> _pets = ept.databaseToPets();
                for (Pet p : _pets) {
                    if (request.params(":owner_id").equals("" + p.getOwner_id())) {
                        pets.add(p);
                    }
                }

                System.out.println(pets);
                if (pets.isEmpty()) {
                    response.status(200);
                    response.type("application/json");
                    return new Gson().toJson(new StandardResponse(new Gson().toJsonTree(pets)));
                }
                response.status(403);
                return new Gson().toJson(new StandardResponse(new Gson().toJsonTree(pets)));

            } catch (Exception e) {
                e.printStackTrace();
                response.status(500);
                return "Internal Server Error";
            }
        });

        get(apiPath + "/pets/:type/:breed", (request, response) -> {
            pets.clear();
            response.type("application/json");
            ArrayList<Pet> _pets = ept.databaseToPets();
            ArrayList<Pet> __pets = new ArrayList<>();
            ArrayList<Pet> __pets1 = new ArrayList<>();
            ArrayList<Pet> __pets2 = new ArrayList<>();

            System.out.println("Type");
            System.out.println(_pets);
            for (Pet p : _pets) {
                if (request.params(":type").equals(p.getType())) {
                    __pets.add(p);
                }
            }

            System.out.println(__pets);

            if (!request.params(":breed").equals("all") && !__pets.isEmpty()) {
                System.out.println("Breed");
                for (Pet p : __pets) {
                    if (request.params(":breed").equals(p.getBreed())) {
                        __pets1.add(p);
                    }
                }
            } else {
                System.out.println("No changes from breed");
                __pets1 = __pets;
            }

            System.out.println(__pets1);

            if (!request.queryParams("fromWeight").equals("") && !__pets1.isEmpty()) {
                System.out.println("From");
                for (Pet p : __pets1) {
                    if (parseInt(request.queryParams("fromWeight")) <= p.getWeight()) {
                        __pets2.add(p);
                    }
                }
            } else {
                System.out.println("No changes from fromWeight");
                __pets2 = __pets1;
            }
            System.out.println(__pets2);

            if (!request.queryParams("toWeight").equals("") && !__pets2.isEmpty()) {
                System.out.println("To");

                for (Pet p : __pets2) {
                    if (parseInt(request.queryParams("toWeight")) >= p.getWeight()) {
                        pets.add(p);
                    }
                }
            } else {
                System.out.println("No changes from toWeight");
                pets = __pets2;
            }

            System.out.println(pets);

            if (!pets.isEmpty()) {
                response.status(200);
                response.type("application/json");
                return new Gson().toJson(new StandardResponse(new Gson().toJsonTree(pets)));
            } else {
                response.status(404);
                return new Gson().toJson(new StandardResponse(new Gson()
                        .toJson("Error: Pet type or breed not exists")));
            }
        });

        post(apiPath + "/pet", (request, response) -> {
            pets.clear();
            response.type("application/json");

            try {
                Pet pet = new Gson().fromJson(request.body(), Pet.class);
                ept.createNewPet(pet);
                response.status(200);
                return new Gson().toJson(new StandardResponse(new Gson().toJsonTree(pet)));
            } catch (ClassNotFoundException ex) {
                Logger.getLogger(PetsRESTAPI.class.getName()).log(Level.SEVERE, null, ex);
                response.status(404);
                return "Some Error";
            }
        });

        put(apiPath + "/petWeight/:pet_id/:weight", (request, response) -> {
            pets.clear();
            response.type("application/json");

            System.out.println(request.params(":pet_id"));
            System.out.println(request.params(":weight"));

            ArrayList<Pet> _pets = ept.databaseToPets();

            for (Pet p : _pets) {
                System.out.println(p.getPet_id());
                if (request.params(":pet_id").equals("" + p.getPet_id())) {
                    pets.add(p);
                }
            }

            System.out.println(pets);
            if (!pets.isEmpty()) {
                ept.updatePet(request.params(":pet_id"), request.params(":weight"));
                response.status(200);
                return "Change was made!";
            }
            response.status(404);
            return "Pet Id not Existing!";
        });

        delete(apiPath + "/petDeletion/:pet_id", (request, response) -> {
            pets.clear();
            response.type("application/json");
            ArrayList<Pet> _pets = ept.databaseToPets();

            for (Pet p : _pets) {
                if (request.params(":pet_id").equals("" + p.getPet_id())) {
                    pets.add(p);
                }
            }

            if (!pets.isEmpty()) {
                ept.deletePet(request.params(":pet_id"));
                response.status(200);
                return "Change was made!";
            }
            response.status(404);
            return "Pet Id not Existing!";
        });
    }

}
