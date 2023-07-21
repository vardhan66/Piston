const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

app.get("/", (req,res) => {
	res.json({ name: "Code Bless You", Subscribe: true });
});
app.listen(5000, () => console.log("Server is listening on 50000"));


