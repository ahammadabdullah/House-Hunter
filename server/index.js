const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 3000;

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

const uri = `mongodb+srv://${process.env.mongoUser}:${process.env.mongoPass}@cluster0.mjl1d34.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// verify token
const verifyToken = async (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(403).send({ message: " access forbidden" });
  }
  jwt.verify(token, process.env.secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "unauthorized access" });
    }
    req.user = decoded;
    next();
  });
};
async function run() {
  try {
    // collections
    const userCollection = client.db("house-hunter").collection("users");
    const BookingCollection = client.db("house-hunter").collection("Bookings");
    const houseCollection = client.db("house-hunter").collection("houses");

    // registration api
    app.post("/v1/register", async (req, res) => {
      const { email, password, name, number, role } = req.body;
      const user = await userCollection.findOne({ email });
      if (user) {
        res
          .status(400)
          .send({ success: false, message: "User already exists" });
      } else {
        const newUser = await userCollection.insertOne({
          email,
          password,
          name,
          number,
          role,
          isLoggedIn: true,
        });
        const token = jwt.sign(
          { email: email, role: role },
          process.env.secretKey,
          {
            expiresIn: "1h",
          }
        );
        res
          .status(200)
          .cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
          })
          .send({ success: true, message: "User created successfully" });
      }
    });
    // login api
    app.put("/v1/login", async (req, res) => {
      const { email, password } = req.body;
      const user = await userCollection.findOne({ email });
      if (user) {
        if (user.password === password) {
          const result = await userCollection.updateOne(
            { email },
            { $set: { isLoggedIn: true } }
          );
          const token = jwt.sign(
            { email: user.email, role: user.role },
            process.env.secretKey,
            {
              expiresIn: "1h",
            }
          );
          res
            .status(200)
            .cookie("token", token, {
              httpOnly: true,
              secure: true,
              sameSite: "none",
            })
            .send({ success: true, message: "Login successful" });
        } else {
          res
            .status(400)
            .send({ success: false, message: "Wrong Credentials" });
        }
      } else {
        res.status(400).send({ success: false, message: "Wrong Credentials" });
      }
    });
    // logout api
    app.put("/v1/logout", async (req, res) => {
      const { email } = req.body;
      const result = await userCollection.updateOne(
        { email },
        { $set: { isLoggedIn: false } }
      );
      res
        .clearCookie("token", {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        })
        .status(200)
        .send({ success: true, message: "Logout successful" });
    });
    // get user by email api
    app.get("/v1/users/:email", async (req, res) => {
      const projection = {
        password: 0,
      };
      const result = await userCollection.findOne(
        {
          email: req.params.email,
        },
        { projection }
      );
      res.status(200).send(result);
    });

    // get all houses api
    app.get("/v1/houses", async (req, res) => {
      const cursor = parseInt(req.query.cursor) || 0;
      const pageSize = 10;
      const data = await houseCollection
        .find({})
        .skip(cursor)
        .limit(pageSize)
        .toArray();
      res.send({ data });
      // const result = await houseCollection.find().toArray();
      // res.status(200).send(result);
    });
    // add house api
    app.post("/v1/houses", verifyToken, async (req, res) => {
      const {
        email,
        name,
        address,
        city,
        bedrooms,
        bathrooms,
        roomSize,
        imgURL,
        availabilityDate,
        rent,
        number,
        title,
        description,
      } = req.body;
      const result = await houseCollection.insertOne({
        email,
        name,
        address,
        city,
        bedrooms,
        bathrooms,
        roomSize,
        imgURL,
        availabilityDate,
        rent,
        number,
        title,
        description,
      });
      res.status(200).send(result);
    });
    // add multiple houses api
    // app.post("/v1/houses/bulk", async (req, res) => {
    //   const result = await houseCollection.insertMany(req.body);
    //   res.status(200).send(result);
    // });
    // get house by id api
    app.get("/v1/houses/:id", async (req, res) => {
      const result = await houseCollection.findOne({
        _id: new ObjectId(req.params.id),
      });
      res.status(200).send(result);
    });
    // get owner houses by email api
    app.get("/v1/houses/owner/:email", verifyToken, async (req, res) => {
      const result = await houseCollection
        .find({
          email: req.params.email,
        })
        .toArray();
      res.status(200).send(result);
    });
    // update house by id api
    app.put("/v1/houses/:id", verifyToken, async (req, res) => {
      const {
        address,
        city,
        bedrooms,
        bathrooms,
        roomSize,
        imgURL,
        availabilityDate,
        rent,
        title,
        description,
      } = req.body;
      const result = await houseCollection.updateOne(
        { _id: new ObjectId(req.params.id) },
        {
          $set: {
            address,
            city,
            bedrooms,
            bathrooms,
            roomSize,
            imgURL,
            availabilityDate,
            rent,
            title,
            description,
          },
        }
      );
      res.status(200).send(result);
    });
    // delete house by id api
    app.delete("/v1/houses/:id", verifyToken, async (req, res) => {
      const result = await houseCollection.deleteOne({
        _id: new ObjectId(req.params.id),
      });
      res.status(200).send(result);
    });
    // book house by email api
    app.post("/v1/bookings", verifyToken, async (req, res) => {
      const {
        houseId,
        title,
        rent,
        address,
        renterName,
        renterNumber,
        renterEmail,
      } = req.body;
      const result = await BookingCollection.insertOne({
        houseId,
        title,
        rent,
        address,
        renterName,
        renterNumber,
        renterEmail,
      });
      res.status(200).send(result);
    });
    // get bookings by email api
    app.get("/v1/bookings/:email", verifyToken, async (req, res) => {
      const result = await BookingCollection.find({
        renterEmail: req.params.email,
      }).toArray();
      res.status(200).send(result);
    });
    // delete booking by id api
    app.delete("/v1/bookings/:id", verifyToken, async (req, res) => {
      const result = await BookingCollection.deleteOne({
        _id: new ObjectId(req.params.id),
      });
      res.status(200).send(result);
    });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/v1", (req, res) => {
  res.send("First version of this server is running well");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
