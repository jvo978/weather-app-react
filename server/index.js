const express = require('express');
const app = express();
const PORT = 3001;
// require("dotenv").config();

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}....`)
})