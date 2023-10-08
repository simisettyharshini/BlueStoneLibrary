const express = require('express');
const dotenv = require("dotenv");
const DbConnection = require("./config/dbConfig")
dotenv.config();
const app = express();


app.use(express.json());
DbConnection();
const port = process.env.PORT || 5000;

const usersRoute = require("./routes/usersRoute.jsx");
const booksRoute = require("./routes/booksRoute.jsx");
const issuesRoute = require("./routes/issuesRoute.jsx");
const reportsRoute = require("./routes/reportsRoute.jsx");
const ratingsRoute = require("./routes/ratingsRoute.jsx");

app.use("/api/users", usersRoute)
app.use("/api/books",booksRoute)
app.use("/api/issues",issuesRoute)
app.use("/api/reports", reportsRoute);
app.use("/api/ratings",ratingsRoute);

app.listen(port, () => console.log(`Node server started at  ${port}`));
