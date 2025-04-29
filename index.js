const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config(); // Load environment variables



// Middleware
app.use(cors());
app.use(express.json());



app.get('/', (req, res) => {
    res.send("Server is runing to the local server");
});

// poloka12
// Vn9fLKbAqEhLLEL1

 


  


const uri = "mongodb+srv://poloka12:Vn9fLKbAqEhLLEL1@cluster0.f3bbt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const database = client.db("TourPackage");
    const collection = database.collection("packageData");
    const bookingCollections = database.collection("BookingData");
    const allUsers = database.collection("AllUsers");

  


    // Get All Tour Packages
    app.get("/tourpackages", async (req, res) => {
      const cursor = collection.find();
      const result = await cursor.toArray();
      res.send(result);
    })


    app.post('/booking', (req, res) =>{
      const booking = req.body;
      const result = bookingCollections.insertOne(booking);
      res.send(result);
    })

    app.get('/bookings', async (req, res) => {
      try {
          const bookings = await bookingCollections.find().toArray();
          res.send(bookings);
      } catch (error) {
          console.error("Error fetching bookings:", error);
          res.status(500).send({ message: "Failed to fetch bookings" });
      }
  });

  // all users are allowed to

  app.post('/allusers', (req, res) =>{
    const user = req.body;
    const result = allUsers.insertOne(user);
    res.send(result);
  

  })

  app.get('/allusers', async (req, res) => {
 
        const users = await allUsers.find().toArray();
        res.send(users);
   
  })


  app.put('/allusers/:id', async (req, res) => {
    const { id } = req.params;
    const userInfo = req.body;
    const filter = { _id: new ObjectId(id)};
    const options = { upsert: false };
    const updateUser = {
      $set: {
        name: userInfo.name,
        photoURL: userInfo.photoURL
      }
    }

    const result = await allUsers.updateOne(filter, updateUser, options);
    res.send(result);






   

});

  





    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);






app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });


