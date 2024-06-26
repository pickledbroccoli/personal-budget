const express = require('express');
const budgetRouter = express.Router();
const { envelopes, getIndexByName, modifyBalance } = require('./db.js');
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


// update a specific envelope by NAME

// subtract amount from envelope - amount in Headers
budgetRouter.put('/envelopes/deduct/:name', (req, res, next) => {
    const thisIndex = getIndexByName(req.params.name);
    const deductThisAmount = Number(req.header('amount'));

    if (thisIndex !== -1 && deductThisAmount >= 0 && modifyBalance(envelopes[thisIndex], -1 * deductThisAmount)) {
            res.status(200).send(envelopes[thisIndex]);
    } else {
        res.status(404).send(`envelope named ${req.params.name} not found, or balance is insufficient`)
    }
});

// add amount to envelope - amount in Headers
budgetRouter.put('/envelopes/add/:name', (req, res, next) => {
    const thisIndex = getIndexByName(req.params.name);
    const addThisAmount = Number(req.header('amount'));

    if (thisIndex !== -1 && addThisAmount >= 0 && modifyBalance(envelopes[thisIndex], addThisAmount)) {
            res.status(200).send(envelopes[thisIndex]);
    } else {
        res.status(404).send(`invalid arguments`)
    }
});


// transfer budgets between envelopes (amount in header)
budgetRouter.post('/envelopes/transfer/:from/:to', (req, res, next) => {
    // check if amount is available in the first envelope
    const deductThisAmount = Number(req.header('amount'));
    const fromIndex = getIndexByName(req.params.from);
    const toIndex = getIndexByName(req.params.to);

    if (deductThisAmount >=0 && modifyBalance(envelopes[fromIndex], -1 * deductThisAmount)) {
        modifyBalance(envelopes[toIndex], deductThisAmount);
        res.status(200).send(`${deductThisAmount} has been transfered from ${req.params.from} to ${req.params.to}`);
    } else {
        res.status(400).send('invalid arguments');
    }

});


// delete a specific envelope by NAME
budgetRouter.delete('/envelopes/:name', (req, res, next) => {
    const thisIndex = getIndexByName(req.params.name);
    if (thisIndex !== -1) {
        const thisEnvelope = envelopes[thisIndex];

        // only empty envelopes get to be deleted
        if (thisEnvelope.balance !== 0) {
            res.status(400).send('cannot delete envelope with a positive budget')
        } else {
            envelopes.splice(thisIndex, 1);
            res.status(204).send(`envelope ${req.params.name} deleted`);
        }

    } else {
        res.status(404).send(`envelope named ${req.params.name} not found`)
    }
});


module.exports = budgetRouter;