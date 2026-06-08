const jwt = require("jsonwebtoken");
const db = require("../../db");

const {
  INQUIRY_STATUS,
  INQUIRY_TIMELINE_REMARKS,
} = require("../constants/status");

/* ===========================
   ADMIN LOGIN
=========================== */
exports.adminLogin = (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM admins WHERE email=? AND password=?";

  db.query(sql, [email, password], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length > 0) {
      const token = jwt.sign(
        {
          id: result[0].id,
          email: result[0].email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      return res.json({
        success: true,
        message: "Login Successful",
        token,
      });
    }

    res.status(401).json({
      success: false,
      message: "Invalid Email or Password",
    });
  });
};

/* ===========================
   ADMIN LOGOUT
=========================== */
exports.adminLogout = (req, res) => {
  res.json({
    success: true,
    message: "Logout Successful",
  });
};

/* ===========================
   ADD TOUR
=========================== */
exports.addTour = (req, res) => {
  const {
    tour_name,
    destination,
    price,
    duration,
    start_date,
    end_date,
    description,
    image,
    status,
  } = req.body;

  const sql = `
    INSERT INTO tours
    (
      tour_name,
      destination,
      price,
      duration,
      start_date,
      end_date,
      description,
      image,
      status
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      tour_name,
      destination,
      price,
      duration,
      start_date,
      end_date,
      description,
      image,
      status,
    ],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({
        success: true,
        message: "Tour Added Successfully",
      });
    }
  );
};

/* ===========================
   GET TOURS
=========================== */
exports.getTours = (req, res) => {
  db.query(
    "SELECT * FROM tours ORDER BY id DESC",
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
};

/* ===========================
   UPDATE TOUR
=========================== */
exports.updateTour = (req, res) => {
  const id = req.params.id;

  const {
    tour_name,
    destination,
    price,
    duration,
    start_date,
    end_date,
    status,
  } = req.body;

  const sql = `
    UPDATE tours
    SET
      tour_name=?,
      destination=?,
      price=?,
      duration=?,
      start_date=?,
      end_date=?,
      status=?
    WHERE id=?
  `;

  db.query(
    sql,
    [tour_name, destination, price, duration, start_date, end_date, status, id],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({
        success: true,
        message: "Tour Updated Successfully",
      });
    }
  );
};

/* ===========================
   DELETE TOUR
=========================== */
exports.deleteTour = (req, res) => {
  db.query(
    "DELETE FROM tours WHERE id=?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({
        success: true,
        message: "Tour Deleted Successfully",
      });
    }
  );
};

/* ===========================
   ADD PACKAGE
=========================== */
exports.addPackage = (req, res) => {
  const {
    package_name,
    destination,
    duration_days,
    duration_nights,
    price,
    hotel_name,
    status,
  } = req.body;

  const sql = `
    INSERT INTO packages
    (
      package_name,
      destination,
      duration_days,
      duration_nights,
      price,
      hotel_name,
      status
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      package_name,
      destination,
      duration_days,
      duration_nights,
      price,
      hotel_name,
      status,
    ],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({
        success: true,
        message: "Package Added Successfully",
      });
    }
  );
};

/* ===========================
   GET PACKAGES
=========================== */
exports.getPackages = (req, res) => {
  db.query(
    "SELECT * FROM packages ORDER BY id DESC",
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
};

/* ===========================
   GET INQUIRIES
=========================== */
exports.getInquiries = (req, res) => {
  const sql = `
    SELECT
      i.id,
      u.customer_name,
      u.phone,
      i.destination,
      i.package_name,
      i.status,
      i.created_at
    FROM inquiries i
    JOIN users u
    ON i.user_id = u.id
    ORDER BY i.id DESC
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

/* ===========================
   UPDATE INQUIRY STATUS
=========================== */
exports.updateInquiryStatus = (req, res) => {
  const { status, remarks } = req.body;
  const inquiryId = req.params.id;

  db.query(
    "UPDATE inquiries SET status=? WHERE id=?",
    [status, inquiryId],
    (err) => {
      if (err) return res.status(500).json(err);

      db.query(
        `INSERT INTO inquiry_timeline
        (inquiry_id,status,remarks)
        VALUES (?,?,?)`,
        [inquiryId, status, remarks],
        (timelineErr) => {
          if (timelineErr)
            return res.status(500).json(timelineErr);

          res.json({
            success: true,
            message: "Status Updated Successfully",
          });
        }
      );
    }
  );
};

/* ===========================
   GET USERS
=========================== */
exports.getUsers = (req, res) => {
  db.query(
    "SELECT * FROM users ORDER BY id DESC",
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
};

/* ===========================
   GET TIMELINE
=========================== */
exports.getTimeline = (req, res) => {
  db.query(
    `SELECT *
     FROM inquiry_timeline
     WHERE inquiry_id=?
     ORDER BY created_at ASC`,
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
};

/* ===========================
   DASHBOARD COUNTS
=========================== */
exports.getDashboardCounts = (req, res) => {
  const sql = `
    SELECT
      (SELECT COUNT(*) FROM tours) AS totalTours,
      (SELECT COUNT(*) FROM packages) AS totalPackages,
      (SELECT COUNT(*) FROM users) AS totalUsers,
      (SELECT COUNT(*) FROM inquiries) AS totalInquiries
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result[0]);
  });
};