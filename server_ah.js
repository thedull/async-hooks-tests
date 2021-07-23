const {log} = require('console');
const express = require('express');
const hooks = require('./hooks');
const app = express();
const port = 3000;

app.use((req, res, next) => {
    const data = { headers: req.headers };
    hooks.createRequestContext(data);
    next();
});

const requestHandler = (req, res, next) => {
    const reqContext = hooks.getRequestContext();
    res.json(reqContext);
    next();
};

app.get('/', requestHandler);

app.listen(port, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log(`Server listening on port ${port}`);
});
