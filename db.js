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
*/ */


// array to contain the envelope objects

const envelopes = [];


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
const getIndexById = () => {};

const getIndexByName = () => {};

// delete a certain envelope
const deleteEnvelopeById = () => {};





module.exports = { getIndexById, getIndexByName, createNewEnvelope, };