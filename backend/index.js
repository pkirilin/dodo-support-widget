require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const PORT = 3000;
const app = express();

app.use(cors());

app.get('/', (req, res) => {
    res.json('hello world from server');
});

app.get('/search', async (req, res) => {
    const term = req.query['term'];

    const response = await axios.get(
        `https://stage.dodopizza.info/api/search/searchAllWithApiKey/${term}`,
        {
            headers: {
                Key: process.env.API_KEY,
            },
        },
    );

    const data = response.data;

    res.json({
        count: data.count,
        articles: data.results.map(doc => ({
            title: doc['ru__Title'],
            link: `https://dodopizza.info/support/articles/${doc.Id}`,
        })),
    });
});

app.listen(PORT, () => {
    console.log(`Started on port ${PORT}`);
});
