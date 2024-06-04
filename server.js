const express = require('express');
const app = express();



module.exports = app;

/*
// test GET route with HelloWorld
app.get('/', (req, res, next) => {
    console.log('Hello World');
    res.send('Hello World');
});
*/

const budgetRouter = require('./routers');
app.use('/budget', budgetRouterRouter);




const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is (hopefully) listening on port ${PORT}`);
});