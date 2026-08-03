// 
const express = require("express");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const staticPath = path.join(__dirname, "public")
app.use(express.static(staticPath));


let destinations = [];
let nextId = 1;

// Home page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Get All Destinations
app.get("/list", (req, res) => {
    res.status(200).json(destinations);
});


// Get Destinations by Id
app.get("/list/:id", (req, res) => {

    const id = parseInt(req.params.id);
    const destination = destinations.find(
        (item) => item.id === id
    );

    if (!destination) {
        return res.status(404).json({
            success: false,
            message: "Destination not found"
        });
    }
    res.status(200).json(destination);

});


// Create Destination
app.post("/list", (req, res) => {

    const {
        country,
        city,
        description,
        image,
        verified
    } = req.body;

    if (!country || !city || !description) {
        return res.status(400).json({
            success: false,
            message: "Country, City and Description are required."
        });
    }

    const newDestination = {

        id: nextId++,
        country,
        city,
        description,
        image:image,
        verified: verified === true || verified === "true"

    };

    destinations.push(newDestination);
    res.status(201).json({
        success: true,
        message: "Destination added successfully.",
        data: newDestination
    });

});


// Update Destinations
app.put("/list/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const destination = destinations.find(
        (item) => item.id === id
    );

    if (!destination) {
        return res.status(404).json({
            success: false, message: "Destination not found."});
    }

    const {
        country,
        city,
        description,
        image,
        verified
    } = req.body;

    if (country !== undefined)
        destination.country = country;

    if (city !== undefined)
        destination.city = city;

    if (description !== undefined)
        destination.description = description;

    if (image !== undefined)
        destination.image = image;

    if (verified !== undefined)
        destination.verified =
            verified === true || verified === "true";

    res.status(200).json({
        success: true, message: "Destination updated successfully.",data: destination});

});


// Delete Destinations
app.delete("/list/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const index = destinations.findIndex(
        (item) => item.id === id
    );

    if (index === -1) {
        return res.status(404).json({
            success: false, message: "Destination not found." });
    }

    destinations.splice(index, 1);
    res.status(200).json({
        success: true,
        message: "Destination deleted successfully."
    });

});


app.listen(PORT, () => {

    console.log(`🚀 Server running at http://localhost:${PORT}`);

});

