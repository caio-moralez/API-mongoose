// imports Node.js modules
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Swagger imports
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

// import schema
const animalsSchema = require("./animalsData.js");

// create model from schema
const animalModel = mongoose.model("Animal", animalsSchema);

// dotenv to read .env
dotenv.config();

const app = express();
const PORT = 3000;

// middleware to convert request body to JSON
app.use(express.json());

// SWAGGER CONFIGURATION

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Animals API",
      version: "1.0.0",
      description: "RESTful API for animal management"
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local development server"
      }
    ],
    components: {
      schemas: {
        Animal: {
          type: "object",
          required: ["name", "species", "age"],
          properties: {
            _id: {
              type: "string",
              description: "MongoDB generated ID"
            },
            name: {
              type: "string",
              example: "Lion"
            },
            species: {
              type: "string",
              example: "Mammal"
            },
            age: {
              type: "integer",
              example: 5
            }
          }
        }
      }
    }
  },
  apis: ["./app.js"]
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Swagger UI route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// DATABASE CONNECTION

const conectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

conectDB();

// start server
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

// ROUTES

/**
 * @swagger
 * /animals:
 *   post:
 *     summary: Create a new animal
 *     tags: [Animals]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Animal'
 *     responses:
 *       201:
 *         description: Animal created successfully
 *       400:
 *         description: Invalid input data
 */
app.post("/animals", async (req, res) => {
  try {
    const newAnimal = await animalModel.create(req.body);
    res.status(201).json(newAnimal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /animals:
 *   get:
 *     summary: Get all animals
 *     tags: [Animals]
 *     responses:
 *       200:
 *         description: List of animals
 *       500:
 *         description: Internal server error
 */
app.get("/animals", async (req, res) => {
  try {
    const animals = await animalModel.find();
    res.status(200).json(animals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /animals/{id}:
 *   get:
 *     summary: Get an animal by ID
 *     tags: [Animals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Animal ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Animal found
 *       400:
 *         description: Invalid ID format
 *       404:
 *         description: Animal not found
 */
app.get("/animals/:id", async (req, res) => {
  try {
    const animal = await animalModel.findById(req.params.id);

    if (!animal) {
      return res.status(404).json({ error: "Animal not found" });
    }

    res.status(200).json(animal);
  } catch (error) {
    res.status(400).json({ error: "Invalid ID format" });
  }
});

/**
 * @swagger
 * /animals/{id}:
 *   put:
 *     summary: Update an animal
 *     tags: [Animals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Animal ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Animal'
 *     responses:
 *       200:
 *         description: Animal updated successfully
 *       400:
 *         description: Invalid input or ID
 *       404:
 *         description: Animal not found
 */
app.put("/animals/:id", async (req, res) => {
  try {
    const updatedAnimal = await animalModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedAnimal) {
      return res.status(404).json({ error: "Animal not found" });
    }

    res.status(200).json(updatedAnimal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /animals/{id}:
 *   delete:
 *     summary: Delete an animal
 *     tags: [Animals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Animal ID
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Animal deleted successfully
 *       400:
 *         description: Invalid ID format
 *       404:
 *         description: Animal not found
 */
app.delete("/animals/:id", async (req, res) => {
  try {
    const deletedAnimal = await animalModel.findByIdAndDelete(req.params.id);

    if (!deletedAnimal) {
      return res.status(404).json({ error: "Animal not found" });
    }

    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: "Invalid ID format" });
  }
});
