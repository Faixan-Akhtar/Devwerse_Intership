const express = require("express");
const mongoose = require('mongoose');
const path = require("path");
const Travel_Bucket_list = require("./schema");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/Travel_Destination')
.then(()=>{console.log('MongoDb is connected Successfully')})
.catch(()=>{console.log('MongoDb is not connected ')})
const staticPath = path.join(__dirname, "public")
app.use(express.static(staticPath));


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

//Get Destinations
app.get("/list", async (req, res) => {
    const Destinations = await Travel_Bucket_list.find();
    res.json(Destinations);
});

//Get Destinations By Id
app.get("/list/:id", async (req, res) => {
  try {
    const Destination = await Travel_Bucket_list.findById(req.params.id);

    if (!Destination) {
      return res.status(404).json({
        success: false,
        message: "Id not found",
      });
    }
    res.status(200).json(Destination);
  } catch (err) {
    res.status(500).jon({
      success: false,
      message: "Interval Server Error",
    });
  }
});


// Create Destination
app.post("/list", async (req, res) => {
  try {
    const { country, city, description, image, verified } = req.body;

    if (!country || !city || !description) {
      return res.status(400).json({
        success: false,
        message: "Country, City and Description are required.",
      });
    }

  const newDestination = new Travel_Bucket_list({
  country,
  city,
  description,
  image,
  verified,
});

await newDestination.save();

res.status(201).json(newDestination);

    res.status(201).json({
      success: true,
      message: "Destination added successfully.",
      data: newDestination,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Interval Server Error",
    });
  }
});


// Update Destinations
app.put("/list/:id", async (req, res) => {
  try {
    const destination = await Travel_Bucket_list.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: "Destination not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Destination updated successfully.",
      data: destination,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
});


// Delete Destinations
app.delete("/list/:id", async (req, res) => {
  try {
    const Destination = await Travel_Bucket_list.findByIdAndDelete(
      req.params.id,
    );

    if (!Destination) {
      return res.status(404).json({
        success: false,
        message: "Destination not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Destination deleted successfully.",
    });
  } catch (err) {
    res.status(500).jon({
      success: false,
      message: "Interval Server Error",
    });
  }
});



app.listen(PORT, () => {

    console.log(`🚀 Server running at http://localhost:${PORT}`);

});
