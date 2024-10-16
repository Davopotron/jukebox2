const express = require("express");
const router = express.Router();

const prisma = require("../prisma");

router.get("/", async (req, res, next) => {
    next()
    });

module.exports = router;
