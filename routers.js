const express = require('express');
const budgetRouter = express.Router();
const { envelopes } = require('./db.js');
const { createNewEnvelope } = require('./db.js');



// GET all the envelopes
budgetRouter.get('/envelopes', (req, res, next) => {
    res.status(200).send(envelopes);
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