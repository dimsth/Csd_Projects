package servlets;

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
import database.tables.EditPetKeepersTable;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import mainClasses.PetKeeper;

/**
 *
 * @author micha
 */
public class GetPetKeeper extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException, SQLException, ClassNotFoundException {
        //
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        System.out.println("GetPetKeeper Get");
        response.setContentType("text/html;charset=UTF-8");
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        String email = request.getParameter("email");

        System.out.println(username);
        System.out.println(password);

        if (username == null && password == null && email == null) {
            System.out.println("Seesion");
            HttpSession session = request.getSession(false);

            System.out.println(session.getAttribute("username"));

            // Check if the session exists and is valid
            if (session != null && session.getAttribute("username") != null) {
                System.out.println("Session Exists");

                EditPetKeepersTable eut = new EditPetKeepersTable();
                String usr = (String) session.getAttribute("username");
                PetKeeper su;
                try (PrintWriter out = response.getWriter()) {
                    su = eut.findUsernameToPetKeepers(usr);

                    String json = eut.petKeeperToJSON(su);
                    out.println(json);

                    response.setStatus(200);
                } catch (SQLException ex) {
                    Logger.getLogger(GetPetKeeper.class.getName()).log(Level.SEVERE, null, ex);
                } catch (ClassNotFoundException ex) {
                    Logger.getLogger(GetPetKeeper.class.getName()).log(Level.SEVERE, null, ex);
                }
            }

            response.setStatus(203);
            return;
        }


        if (email != null) {
            System.out.println("Email");
            try (PrintWriter out = response.getWriter()) {
                /* TODO output your page here. You may use following sample code. */
                EditPetKeepersTable eut = new EditPetKeepersTable();
                PetKeeper su = eut.findEmailToPetKeepers(email);
                if (su == null) {
                    response.setStatus(204);
                    out.println("{\"error\": \"PetOwner not found\"}");
                } else {
                    String json = eut.petKeeperToJSON(su);
                    out.println(json);
                    response.setStatus(200);
                }
            } catch (SQLException ex) {
                Logger.getLogger(GetPetKeeper.class.getName()).log(Level.SEVERE, null, ex);
            } catch (ClassNotFoundException ex) {
                Logger.getLogger(GetPetKeeper.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (password != null) {
            System.out.println("Username & Password");
            try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            EditPetKeepersTable eut = new EditPetKeepersTable();
            PetKeeper su = eut.databaseToPetKeepers(username, password);
            if (su == null) {
                response.setStatus(204);
                out.println("{\"error\": \"PetOwner not found\"}");
            } else {
                String json = eut.petKeeperToJSON(su);
                out.println(json);

                HttpSession session = request.getSession();

                // Store the username in the session to indicate that the user is logged in
                session.setAttribute("username", username);
                response.setStatus(200);
            }
            } catch (SQLException ex) {
                Logger.getLogger(GetPetKeeper.class.getName()).log(Level.SEVERE, null, ex);
            } catch (ClassNotFoundException ex) {
                Logger.getLogger(GetPetKeeper.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (username != null) {
            System.out.println("Username");
            try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            EditPetKeepersTable eut = new EditPetKeepersTable();
            PetKeeper su = eut.findUsernameToPetKeepers(username);
            if (su == null) {
                response.setStatus(204);
                out.println("{\"error\": \"PetOwner not found\"}");
            } else {
                String json = eut.petKeeperToJSON(su);
                out.println(json);
                response.setStatus(200);
            }
            } catch (SQLException ex) {
                Logger.getLogger(GetPetKeeper.class.getName()).log(Level.SEVERE, null, ex);
            } catch (ClassNotFoundException ex) {
                Logger.getLogger(GetPetKeeper.class.getName()).log(Level.SEVERE, null, ex);
            }
        }

    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        System.out.println("GetPetKeeper Post");
        response.setContentType("text/html;charset=UTF-8");
        String logout = request.getParameter("logout");
        if ("true".equals(logout)) {
            System.out.println("Logging out");
            HttpSession session = request.getSession(false);

            if (session != null) {
                // Invalidate the session
                session.invalidate();
            }

            response.setStatus(200);
            response.getWriter().write("Logout Successful");
            return;
        }

        System.out.println("Add PetKeeper");
        try (PrintWriter out = response.getWriter()) {
            String username = request.getParameter("username");
            String field = request.getParameter("field");
            String value = request.getParameter("value");

            EditPetKeepersTable eut = new EditPetKeepersTable();

            if (field == null && value == null) {
                PetKeeper su = new PetKeeper();
                su.setUsername(request.getParameter("username"));
                su.setEmail(request.getParameter("email"));
                su.setPassword(request.getParameter("password"));
                su.setFirstname(request.getParameter("firstname"));
                su.setLastname(request.getParameter("lastname"));
                su.setCountry(request.getParameter("country"));
                su.setCity(request.getParameter("city"));
                su.setAddress(request.getParameter("address"));
                su.setBirthdate(request.getParameter("birthdate"));
                su.setGender(request.getParameter("gender"));
                su.setJob(request.getParameter("job"));
                su.setPersonalpage(request.getParameter("personalpage"));
                try {
                    su.setLat(Double.valueOf(request.getParameter("lat")));
                    su.setLon(Double.valueOf(request.getParameter("lon")));
                } catch (NumberFormatException e) {
                    // Handle the case where the String is not a valid double
                    System.err.println("Invalid double format");
                    return;
                }
                su.setTelephone(request.getParameter("telephone"));
                su.setCatkeeper(request.getParameter("catkeeper"));
                su.setDogkeeper(request.getParameter("dogkeeper"));
                su.setProperty(request.getParameter("property"));
                su.setPropertydescription(request.getParameter("propertydescription"));
                int catp = Integer.parseInt(request.getParameter("catprice"));
                su.setCatprice(0);
                if ("true".equals(request.getParameter("catkeeper"))) {
                    su.setCatprice(catp);
                }
                int dogp = Integer.parseInt(request.getParameter("dogprice"));
                su.setDogprice(0);
                if ("true".equals(request.getParameter("dogkeeper"))) {
                    su.setCatprice(dogp);
                }

                eut.addNewPetKeeper(su);
                out.println("New Pet Owner added Successfully!!");
            } else {
                System.out.println(username + ": " + field + " with " + value);
                eut.updatePetKeeper(username, field, value);

                PetKeeper su = eut.findUsernameToPetKeepers(username);
                String json = eut.petKeeperToJSON(su);
                out.println(json);
                response.setStatus(200);
            }
            response.setStatus(200);
        } catch (ClassNotFoundException ex) {
            response.setStatus(403);
            System.out.println("{\"error\": \"Something happend\"}");
            Logger.getLogger(GetPetKeeper.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SQLException ex) {
            Logger.getLogger(GetPetKeeper.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
