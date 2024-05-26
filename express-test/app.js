const express = require("express");

const app = express();

app.get("/api", (req, res) => {
  res.json({ user: {
    username: 'moon01',
    firstName: 'Kaixuan',
  } });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
