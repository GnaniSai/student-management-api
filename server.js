import app from "./routes/studentRoutes.js";
const port = process.env.PORT;
app.listen(port, () => {
  console.log("Server is Running on port", port);
});
