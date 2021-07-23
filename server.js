const { v4 } = require('uuid');
const express = require('express');
const { AsyncLocalStorage } = require('async_hooks');
const helmet = require('helmet');

const app = express();
const port = 3000;

const als = new AsyncLocalStorage();

app.use(helmet());

app.use((req, res, next) => {
    const data = { id: v4(), headers: req.headers };
    als.run(data, () => {
        next();
    })
});

app.use((req, res, next) => {
    const ctx = als.getStore();
    ctx['foo'] = 'bar';
    next();
});

const requestHandler = (req, res, next) => {
    const reqContext = als.getStore();
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
