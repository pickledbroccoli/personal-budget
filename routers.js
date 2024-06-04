const express = require('express');
const budgetRouter = express.Router();
const { envelopes, getIndexByName } = require('./db.js');
const { createNewEnvelope } = require('./db.js');



// GET all the envelopes
budgetRouter.get('/envelopes', (req, res, next) => {
    res.status(200).send(envelopes);
});

// GET a specific envelope by NAME
budgetRouter.get('/envelopes/:name', (req, res, next) => {
    const thisIndex = getIndexByName(req.params.name);
    if (thisIndex !== -1) {
        const thisEnvelope = envelopes[thisIndex];
        res.status(200).send(thisEnvelope);
    } else {
        res.status(404).send(`envelope named ${req.params.name} not found`)
    }
});


// POST route to create new envelope
budgetRouter.post('/envelopes', (req, res, next) => {
    const newName = req.body.name;
    const newBalance = Number(req.body.budget);
    
    if ((newName !== '') && (newBalance >= 0)) {
        createNewEnvelope(newName, newBalance);
        const freshEnvelope = envelopes[envelopes.length -1];

        res.status(201).send(freshEnvelope);

    } else {
        res.status(400).send('no Name or Starting Budget given');
    }
});






module.exports = budgetRouter;