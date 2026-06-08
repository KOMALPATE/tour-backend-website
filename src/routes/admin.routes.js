const express =require("express");
const router = express.Router();

const adminController = require("../controllers/admin.controller");

router.post("/login", adminController.adminLogin);
router.post("/logout", adminController.adminLogout);

router.post("/tours/add", adminController.addTour);
router.get("/tours", adminController.getTours);
router.put("/tours/update/:id", adminController.updateTour);
router.delete("/tours/delete/:id", adminController.deleteTour);

router.post("/packages/add", adminController.addPackage);
router.get("/packages", adminController.getPackages);

router.get("/inquiries", adminController.getInquiries);
router.put("/inquiries/:id/status", adminController.updateInquiryStatus);

router.get("/users", adminController.getUsers);
router.get("/timeline/:id", adminController.getTimeline);

router.get("/dashboard-counts", adminController.getDashboardCounts);

module.exports = router;