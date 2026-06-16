const express = require("express");
const router = express.Router();

const appController = require("../controllers/app.controller");


router.post("/login", appController.login);

router.get("/tours", appController.getTours);
router.get("/tours/:id", appController.getTourById);
router.get("/tours/:id/hotels", appController.getTourHotels);

router.post("/add-hotel", appController.addHotel);

router.get("/hotels", appController.getHotels);
router.get("/hotels/:id", appController.getHotelsByTourId);

router.get("/tour-list", appController.getTourList);

router.post("/inquiry", appController.addInquiry);
router.get("/inquiry/:id", appController.getInquiryById);

module.exports = router;