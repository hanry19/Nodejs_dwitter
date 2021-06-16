import express from 'express';

const app = express();

app.get('/',(req,res) => {
    res.send('welcom');

});

app.listen(8080);


