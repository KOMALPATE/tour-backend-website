const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

/* =====================================================
   LOGIN API
   POST /login
   ===================================================== */
app.post("/login", (req, res) => {

  const { email, password } = req.body;

  if (
    email === "komalpatel@gmail.com" &&
    password === "123456"
  ) {
    res.json({
      success: true,
      message: "Login Success",
    });
  } else {
    res.status(401).json({
      success: false,
      message: "Invalid Email or Password",
    });
  }
});


/* =====================================================
   GET ALL TOURS
   GET /tours
   ===================================================== */
app.get("/tours", (req, res) => {

  db.query(
    "SELECT * FROM tours",
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json(result);

    }
  );

});


/* =====================================================
   GET SINGLE TOUR DETAILS
   GET /tours/:id
   ===================================================== */
app.get("/tours/:id", (req, res) => {

  const id = req.params.id;

  db.query(
    "SELECT * FROM tours WHERE id = ?",
    [id],
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      if (result.length === 0) {
        return res.status(404).json({
          message: "Tour not found",
        });
      }

      res.json(result[0]);

    }
  );

});


/* =====================================================
   GET HOTELS BY TOUR ID
   GET /tours/:id/hotels
   ===================================================== */
app.get("/tours/:id/hotels", (req, res) => {

  const id = req.params.id;

  db.query(
    "SELECT * FROM hotels WHERE tour_id = ?",
    [id],
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json(result);

    }
  );

});


/* =====================================================
   ADD NEW HOTEL
   POST /add-hotel
   ===================================================== */
app.post("/add-hotel", (req, res) => {

  console.log("BODY:", req.body);

  const {
    tour_id,
    hotel_name,
    location,
    price
  } = req.body;

  db.query(
    "INSERT INTO hotels (tour_id, hotel_name, location, price) VALUES (?, ?, ?, ?)",
    [tour_id, hotel_name, location, price],
    (err, result) => {

      if (err) {
        console.log("MYSQL ERROR:", err);
        return res.status(500).json(err);
      }

      res.json({
        message: "Hotel Added",
      });

    }
  );

});


/* =====================================================
   GET ALL HOTELS
   GET /hotels
   ===================================================== */
app.get("/hotels", (req, res) => {

  db.query(
    "SELECT * FROM hotels",
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json(result);

    }
  );

});


/* =====================================================
   GET HOTELS BY TOUR ID
   GET /hotels/:id
   ===================================================== */
app.get("/hotels/:id", (req, res) => {

  const tourId = req.params.id;

  db.query(
    "SELECT * FROM hotels WHERE tour_id = ?",
    [tourId],
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json(result);

    }
  );

});


/* =====================================================
   GET TOUR DROPDOWN LIST
   (Admin Page Select Option)
   GET /tour-list
   ===================================================== */
app.get("/tour-list", (req, res) => {

  db.query(
    "SELECT id, title, location FROM tours",
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json(result);

    }
  );

});

/* =====================================================
   SAVE TRAVEL INQUIRY
   (Journey Page Inquiry Form)
   POST /inquiry
   ===================================================== */

app.post('/inquiry', (req, res) => {

  const { name, email, mobile, destination, travel_date, persons } = req.body;

  db.query(
    `INSERT INTO inquiries (name,email,mobile,destination,travel_date,persons) VALUES (?,?,?,?,?,?)`,
    [name, email, mobile, destination, travel_date, persons],
    (err, result) => {
      if (err) {
        console.log("MYSQL ERROR:", err);
        return res.status(500).json(err);
      }
      res.json({
        message: "Inquiry Submitted",
      });
    }
  )
});


/* =====================================================
   SAVE TRAVEL explore
   (Journey Page explore Form)
   GET /explore
   ===================================================== */

app.get('/inquiry/:id', (req, res) => {

  db.query(
    'SELECT * FROM inquiry WHERE id=?',
    [req.params.id],
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json(result[0]);

    }
  );

});


/* =====================================================
   START SERVER
   ===================================================== */
app.listen(3000, () => {
  console.log("Server Running on Port 3000");
});