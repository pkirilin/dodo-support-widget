const express = require('express');
const cors = require('cors');

const PORT = 3000;
const app = express();

app.use(cors());

app.get('/', (req, res) => {
    res.json('hello world from server');
});

app.listen(PORT, () => {
    console.log(`Started on port ${PORT}`);
});
