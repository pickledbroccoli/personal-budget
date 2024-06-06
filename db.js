/*
------------------------------------------------------
"database" array for the distinct envelopes objects,
and helper functions to create/delete, and update them
------------------------------------------------------
*/

/*
*-----------------------------------------------------
* envelope object schema:
*
* id (int)
* name (string)
* balance (float /2 decimal/)
*
*
*-----------------------------------------------------
*/ 


// array to contain the envelope objects

const envelopes = [
    {
        id: 0,
        name: 'testEnvelope',
        balance: 102.15
    }];


// some 'global' vars to keep track of important things

let nextEnvelopeId = 1;


// MARK: Helper Functions 
// useful functions to retrieve, create, delete, modify data from envelopes

// to create a new envelope
const createNewEnvelope = (envelopeName, startingBudget) => {
    const newEnvelopeId = nextEnvelopeId++;
    const newEnvelope = {
        id: newEnvelopeId,
        name: envelopeName,
        balance: startingBudget
    };
    envelopes.push(newEnvelope);
};

// to get the index of a certain envelope
const getIndexById = (thisId) => {
    const lookingForThisIndex = envelopes.findIndex((envelope) => envelope.Id === thisId);
    return lookingForThisIndex;
};

const getIndexByName = (thisName) => {
    const lookingForThisIndex = envelopes.findIndex((envelope) => envelope.name === thisName);
    return lookingForThisIndex;
};

// delete a certain envelope
const deleteEnvelopeById = () => {};


// modify balance
const modifyBalance = (envelope, amount) => {
    // can deduct only if enough available
    if (envelope.balance + amount >= 0) {
        envelope.balance += amount;
        return true;
    } else {
        return false;
    }
};



module.exports = { getIndexById, getIndexByName, createNewEnvelope, modifyBalance, envelopes };