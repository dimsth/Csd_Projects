/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package database.tables;

import com.google.gson.Gson;
import database.DB_Connection;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;
import mainClasses.Review;

/**
 *
 * @author micha
 */
public class EditReviewsTable {

    
     public void addReviewFromJSON(String json) throws ClassNotFoundException{
         Review msg=jsonToReview(json);
         createNewReview(msg);
    }
    
      public Review jsonToReview(String json) {
        Gson gson = new Gson();
        Review msg = gson.fromJson(json, Review.class);
        return msg;
    }
     
    public String reviewToJSON(Review msg) {
        Gson gson = new Gson();

        String json = gson.toJson(msg, Review.class);
        return json;
    }

   
    
    
     public ArrayList<Review> databaseTokeeperReviews(String keeper_id) throws SQLException, ClassNotFoundException {
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();
        ArrayList<Review> revs=new ArrayList<Review>();
        ResultSet rs;
        try {
            rs = stmt.executeQuery("SELECT * FROM reviews where keeper_id='"+keeper_id+"'");
            while (rs.next()) {
                String json = DB_Connection.getResultsToJSON(rs);
                Gson gson = new Gson();
                Review rev = gson.fromJson(json, Review.class);
                revs.add(rev);
            }
            return revs;

        } catch (Exception e) {
            System.err.println("Got an exception! ");
            System.err.println(e.getMessage());
        }
        return null;
    }


    public void createReviewTable() throws SQLException, ClassNotFoundException {
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();
        String sql = "CREATE TABLE reviews "
                + "(review_id INTEGER not NULL AUTO_INCREMENT, "
                + "owner_id INTEGER not null,"
                + "keeper_id INTEGER not null,"
                + "reviewText VARCHAR(2000) not null,"
                + "reviewScore INTEGER not null,"
                + "FOREIGN KEY (owner_id) REFERENCES petowners(owner_id), "
                + "FOREIGN KEY (keeper_id) REFERENCES petkeepers(keeper_id), "
                + "PRIMARY KEY ( review_id ))";
        stmt.execute(sql);
        stmt.close();
        con.close();

    }

    /**
     * Establish a database connection and add in the database.
     *
     * @throws ClassNotFoundException
     */
    public void createNewReview(Review rev) throws ClassNotFoundException {
        try {
            Connection con = DB_Connection.getConnection();

            Statement stmt = con.createStatement();

            String insertQuery = "INSERT INTO "
                    + " reviews (owner_id, keeper_id,reviewText,reviewScore) "
                    + " VALUES ("
                    + "'" + rev.getOwner_id()+ "',"
                    + "'" + rev.getKeeper_id()+ "',"
                    + "'" + rev.getReviewText() + "',"
                    + "'" + rev.getReviewScore() + "'"
                    + ")";
            //stmt.execute(table);
            System.out.println(insertQuery);
            stmt.executeUpdate(insertQuery);
            System.out.println("# The review was successfully added in the database.");

            /* Get the member id from the database and set it to the member */
            stmt.close();

        } catch (SQLException ex) {
            Logger.getLogger(EditPetsTable.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public ArrayList<Review> getReviewsForOwner(String ownerId) throws SQLException, ClassNotFoundException {
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();
        ResultSet rs;
        ArrayList<Review> reviews = new ArrayList<>();
        try {
            String query = "SELECT * FROM reviews WHERE owner_id = '" + ownerId + "'";
            rs = stmt.executeQuery(query);
            while (rs.next()) {
                String json = DB_Connection.getResultsToJSON(rs);
                Gson gson = new Gson();
                Review review = gson.fromJson(json, Review.class);
                reviews.add(review);
            }
            return reviews;
        } catch (Exception e) {
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
    public boolean reviewExistsForBooking(String ownerId, String keeperId) throws SQLException, ClassNotFoundException {
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();
        ResultSet rs;
        try {
            String query = "SELECT * FROM reviews WHERE owner_id = '" + ownerId + "' AND keeper_id = '" + keeperId + "'";
            rs = stmt.executeQuery(query);
            return rs.next();  // If there's at least one row, the review exists
        } catch (Exception e) {
            System.err.println("Got an exception! ");
            System.err.println(e.getMessage());
            return false;
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
