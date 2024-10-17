const express = require("express");
const router = express.Router();
module.exports = router;

const prisma = require("../prisma");

router.get("/", async (req, res, next) => {
    try {
        const playlists = await prisma.playlist.findMany();
        res.json(playlists);
    } catch (e) {
        next(e);
    }
    });

router.post("/", async (req, res, next) => {
    console.log("req.body", req.body)
    const { name, description, ownerId, trackIds } = req.body;
    const tracks = trackIds.map((id) => ({ id: +id }));
    try {
        // this is creating a sql query that inserts a row on the playlist table
        const playlist = await prisma.playlist.create({
            data: { // rows are defined on this data property
                name, 
                description,
                ownerId: +ownerId,
                tracks: { connect: tracks },
            },
            include: {
                owner: true,
                tracks: true,
            },
        });
        res.json(playlist);
    } catch (e) {
        next(e);
    }
    });

    router.get("/:id", async (req, res, next) => {
        const { id } =req.params;
        try {
            const playlist = await prisma.playlist.findUniqueOrThrow({
                where: { id: +id },
                include: { tracks: true },
            });
            res.json(playlist);
        } catch (e) {
            next(e);
        }
        });