/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package database.tables;

import mainClasses.Pet;
import com.google.gson.Gson;
import database.DB_Connection;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author Mike
 */
public class EditPetsTable {

    public void addPetFromJSON(String json) throws ClassNotFoundException {
        Pet bt = jsonToPet(json);
        createNewPet(bt);
    }

    public Pet jsonToPet(String json) {
        Gson gson = new Gson();
        Pet btest = gson.fromJson(json, Pet.class);
        return btest;
    }

    public String petToJSON(Pet bt) {
        Gson gson = new Gson();

        String json = gson.toJson(bt, Pet.class);
        return json;
    }

    public ArrayList<Pet> databaseToPets() throws SQLException, ClassNotFoundException {
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();
        ArrayList<Pet> pets = new ArrayList<Pet>();
        ResultSet rs;
        try {
            rs = stmt.executeQuery("SELECT * FROM pets");
            while (rs.next()) {
                String json = DB_Connection.getResultsToJSON(rs);
                Gson gson = new Gson();
                Pet pet = gson.fromJson(json, Pet.class);
                pets.add(pet);
            }
            return pets;

        } catch (Exception e) {
            System.err.println("Got an exception! ");
            System.err.println(e.getMessage());
        }
        return null;
    }

    
    public Pet petOfOwner(String id) throws SQLException, ClassNotFoundException {
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();
        Pet pet = new Pet();
        ResultSet rs;
        try {
            rs = stmt.executeQuery("SELECT * FROM pets WHERE owner_id= '" + id + "'");
           
            while (rs.next()) {
                String json = DB_Connection.getResultsToJSON(rs);
                Gson gson = new Gson();
                pet = gson.fromJson(json, Pet.class);
               
            }
            return pet;
        } catch (Exception e) {
            System.err.println("Got an exception! ");
            System.err.println(e.getMessage());
        }
        return null;
    }
    
    public ArrayList<Pet> databaseToPets(String type) throws SQLException, ClassNotFoundException {
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();
        ArrayList<Pet> pets = new ArrayList<Pet>();
        ResultSet rs;
        try {
            rs = stmt.executeQuery("SELECT * FROM pets WHERE type= '" + type + "'");
           
            while (rs.next()) {
                String json = DB_Connection.getResultsToJSON(rs);
                Gson gson = new Gson();
                Pet pet = gson.fromJson(json, Pet.class);
                pets.add(pet);
            }
            return pets;
        } catch (Exception e) {
            System.err.println("Got an exception! ");
            System.err.println(e.getMessage());
        }
        return null;
    }

    public void updatePet(String id, String weight) throws SQLException, ClassNotFoundException {
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();
        String update = "UPDATE pets SET weight='" + weight + "'" + "WHERE pet_id = '" + id + "'";
        stmt.executeUpdate(update);
        stmt.close();
        con.close();
    }

    public void deletePet(String id) throws SQLException, ClassNotFoundException {
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();
        String deleteQuery = "DELETE FROM pets WHERE pet_id='" + id + "'";
        stmt.executeUpdate(deleteQuery);
        stmt.close();
        con.close();
    }

    public void createPetsTable() throws SQLException, ClassNotFoundException {
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();
        String sql = "CREATE TABLE pets "
                + "(pet_id VARCHAR(10) not NULL unique, "
                + "owner_id INTEGER not null,"
                + "name VARCHAR(30) not null,"
                + "type VARCHAR(3)  not null, "
                + "breed VARCHAR(30)  not null, "
                + "gender VARCHAR(7)  not null, "
                + "birthyear INTEGER not null , "
                + "weight DOUBLE not null , "
                + "description VARCHAR (500), "
                + "photo VARCHAR (300), "
                + "FOREIGN KEY (owner_id) REFERENCES petowners(owner_id), "
                + "PRIMARY KEY (pet_id ))";
        stmt.execute(sql);
        stmt.close();
        con.close();

    }

    /**
     * Establish a database connection and add in the database.
     *
     * @throws ClassNotFoundException
     */
    public void createNewPet(Pet bt) throws ClassNotFoundException {
        try {
            Connection con = DB_Connection.getConnection();

            Statement stmt = con.createStatement();

            String insertQuery = "INSERT INTO "
                    + " pets (pet_id,owner_id,name,type,breed,gender,birthyear,weight,description,photo) "
                    + " VALUES ("
                    + "'" + bt.getPet_id() + "',"
                    + "'" + bt.getOwner_id() + "',"
                    + "'" + bt.getName() + "',"
                    + "'" + bt.getType()+ "',"
                    + "'" + bt.getBreed()+ "',"
                    + "'" + bt.getGender()+ "',"
                    + "'" + bt.getBirthyear()+ "',"
                    + "'" + bt.getWeight() + "',"
                    + "'" + bt.getDescription() + "',"
                    + "'" + bt.getPhoto() + "'"
                    + ")";
            //stmt.execute(table);
            System.out.println(insertQuery);
            stmt.executeUpdate(insertQuery);
            System.out.println("# The pet was successfully added in the database.");

            /* Get the member id from the database and set it to the member */
            stmt.close();

        } catch (SQLException ex) {
            Logger.getLogger(EditPetsTable.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public Pet getAvailablePetForOwner(String ownerId) throws SQLException, ClassNotFoundException {
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();
        Pet availablePet = null;
        ResultSet rs;
        try {
            // Assuming there is a field in the bookings table that indicates if the booking is active
            // This query needs to be adjusted based on your actual database schema and logic to determine availability
            String query = "SELECT * FROM pets WHERE owner_id= '" + ownerId + "' AND pet_id NOT IN (SELECT pet_id FROM bookings WHERE status IN ('active', 'requested', 'accepted'))";
            rs = stmt.executeQuery(query);

            if (rs.next()) {
                String json = DB_Connection.getResultsToJSON(rs);
                Gson gson = new Gson();
                availablePet = gson.fromJson(json, Pet.class);
            }
        } catch (Exception e) {
            System.err.println("Got an exception! ");
            System.err.println(e.getMessage());
        } finally {
            if (stmt != null) {
                stmt.close();
            }
            if (con != null) {
                con.close();
            }
        }
        return availablePet;
    }
    public String getPetTypeByOwnerId(String ownerId) throws SQLException, ClassNotFoundException {
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();
        try {
            String query = "SELECT type FROM pets WHERE owner_id = '" + ownerId + "'";
            ResultSet rs = stmt.executeQuery(query);
            if (rs.next()) {
                return rs.getString("type");
            } else {
                return null; // No pet found for the given owner ID
            }
        } catch (SQLException e) {
            System.err.println("Got an exception! ");
            System.err.println(e.getMessage());
            return null;
        } finally {
            if (stmt != null) {
                stmt.close();
            }
            if (con != null) {
                con.close();
            }
        }
    }

}
