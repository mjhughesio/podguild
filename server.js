const express = require("express"); // brings in express

const app = express(); // initializes app variable with express

app.get("/", (req, res) => res.send("API Running")); // single endpoint to test

const PORT = process.env.PORT || 5000; // looks for an environment variable called Port to use when deployed to Heroku || locally runs on Port 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
