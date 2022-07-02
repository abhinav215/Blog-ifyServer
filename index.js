const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Header",
//     "Origin, X-Requested-With, Content-Type,Accept"
//   );
//   next();
// });

// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
// header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token");

const corsOpts = {
  origin: "*",
  credentials: true,
  methods: ["GET", "POST", "HEAD", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type"],
  exposedHeaders: ["Content-Type"],
};
app.use(cors(corsOpts));

dotenv.config();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose
  .connect(
    "mongodb+srv://Abhinav:Abhi0606@cluster0.0tnfyce.mongodb.net/Blog?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
      // useFindAndModify: true,
    }
  )
  .then(console.log("MongoDb connected"))
  .catch((err) => console.log(err));

// mongoose.connect(
//   process.env.MONGO_URL,
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: true,
//   }).then(console.log("MongoDb connected")).catch((err)=>console.log(err))

// app.use("/api/auth/register", (req, res, next) => {
//   res.send("This is our starting page");
// });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

// app.use("/api/", (req, res, next) => {
//   res.send("This is our starting page");
// });

// app.listen("5000", () => {
//   console.log("Backend is running at Port 5000");
// });

app.listen(process.env.PORT || 5000, process.env.YOUR_HOST || "0.0.0.0", () => {
  console.log("Backend is running at Port 5000");
});

// console.log(mongoose.connection.readyState, "status");
