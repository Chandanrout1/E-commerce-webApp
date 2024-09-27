const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth/auth-routes");
const adminProductsRouter = require("./routes/admin/products-routers");
const shopProductRouter = require("./routes/shop/shop-products-router");
const shopCartRouter = require("./routes/shop/cart-routes");

//created database connection

mongoose
  .connect("mongodb+srv://crout893:chandanrout2024@cluster0.imhjj.mongodb.net/")
  .then(() => console.log("mongodb conneted"))
  .catch((err) => console.log(`error: ${err}`));

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/shop/products", shopProductRouter);
app.use("/api/shop/cart", shopCartRouter);

// app.post("/api/login", (req, res) => {});

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
