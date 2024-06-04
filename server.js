const express = require('express');
const app = express();
const budgetRouter = require('./routers');
const bodyParser = require('body-parser');


module.exports = app;


// test GET route with HelloWorld
app.get('/', (req, res, next) => {
   // console.log('Hello World');
    res.send('Hello World');
});


app.use(bodyParser.json());

app.use('/budget', budgetRouter);




const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is (hopefully) listening on port ${PORT}`);
});