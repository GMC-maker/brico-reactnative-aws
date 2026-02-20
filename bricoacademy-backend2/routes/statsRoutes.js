// statsRoutes.js
const express = require("express");
const router = express.Router();
const statsController = require("../controllers/statsController");

// GET /api/stats/courses-per-teacher
router.get("/courses-per-teacher", statsController.getCoursesPerTeacher);

module.exports = router;