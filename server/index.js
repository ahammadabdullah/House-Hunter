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

const uri = `mongodb+srv://${process.env.mongoUser}:${process.env.mongoPass}@cluster0.mjl1d34.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

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
          .json({ success: false, message: "User already exists" });
      } else {
        const newUser = await userCollection.insertOne({
          email,
          password,
          name,
          number,
          role,
          isLoggedIn: true,
        });
        res
          .status(200)
          .json({ success: true, message: "User created successfully" });
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
              secure: false,
              sameSite: "none",
            })
            .json({ success: true, message: "Login successful" });
        } else {
          res
            .status(400)
            .json({ success: false, message: "Wrong Credentials" });
        }
      } else {
        res.status(400).json({ success: false, message: "Wrong Credentials" });
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
        .json({ success: true, message: "Logout successful" });
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
