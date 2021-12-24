require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const PORT = 3000;
const app = express();

app.use(cors());

app.get('/', (req, res) => {
    res.json('hello world from server');
});

app.get('/search', async (req, res) => {
    try {
        const term = req.query['term'];
        const filters = req.query['filters'];

        const response = await axios.get(
            `https://localhost:5000/api/search/searchAllWithApiKey/${encodeURIComponent(
                term,
            )}?filters=${filters}`,
            {
                headers: {
                    Key: process.env.API_KEY,
                },
            },
        );

        const count = response.data.count;
        const results = response.data.results;

        console.log(response.data);

        res.set({ 'content-type': 'application/json; charset=utf-8' });
        res.json({
            count,
            articles: results
                .map(res => res.document)
                .map(doc => ({
                    title: doc['ru__Title'],
                    link: `https://stage.dodopizza.info/support/articles/${doc.Id}`,
                })),
        });
    } catch (error) {
        res.send(error);
    }
});

app.listen(PORT, () => {
    console.log(`Started on port ${PORT}`);
});
