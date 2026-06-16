const db = require('../../db');


//LOGIN
exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email=? AND password=?",
    [email, password],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (result.length === 0) {
        return res.status(401).json({
          success: false,
          message: "Invalid Email or Password"
        });
      }

      res.json({
        success: true,
        user: result[0]
      });
    }
  );
};

/* GET TOURS */
exports.getTours = (req, res) => {
  db.query('SELECT * FROM tours', (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

/* GET TOUR BY ID */
exports.getTourById = (req, res) => {
  db.query('SELECT * FROM tours WHERE id=?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length === 0) {
      return res.status(404).json({
        message: 'Tour not found',
      });
    }

    res.json(result[0]);
  });
};

/* GET TOUR HOTELS */
exports.getTourHotels = (req, res) => {
  db.query('SELECT * FROM hotels WHERE tour_id=?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

/* ADD HOTEL */
exports.addHotel = (req, res) => {
  const { tour_id, hotel_name, location, price } = req.body;

  db.query(
    'INSERT INTO hotels (tour_id, hotel_name, location, price) VALUES (?,?,?,?)',
    [tour_id, hotel_name, location, price],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: 'Hotel Added',
      });
    },
  );
};

/* GET HOTELS */
exports.getHotels = (req, res) => {
  db.query('SELECT * FROM hotels', (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

/* GET HOTELS BY TOUR */
exports.getHotelsByTourId = (req, res) => {
  db.query('SELECT * FROM hotels WHERE tour_id=?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

/* TOUR LIST */
exports.getTourList = (req, res) => {
  db.query('SELECT id,title,location FROM tours', (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

/* ADD INQUIRY */
exports.addInquiry = (req, res) => {
  const { name, email, mobile, destination, travel_date, persons } = req.body;

  db.query(
    `INSERT INTO inquiries
    (name,email,mobile,destination,travel_date,persons)
    VALUES (?,?,?,?,?,?)`,
    [name, email, mobile, destination, travel_date, persons],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: 'Inquiry Submitted',
      });
    },
  );
};

/* GET INQUIRY */
exports.getInquiryById = (req, res) => {
  db.query('SELECT * FROM inquiries WHERE id=?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result[0]);
  });
};
