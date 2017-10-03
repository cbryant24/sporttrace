const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')


const app = express();
const PORT = 8000;


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/', express.static('/Users/Chris/Desktop/lfz/c717_sports_pickup'))
app.get('/', function(req, res){
    res.sendFile('/Users/Chris/Desktop/lfz/c717_sports_pickup/index.php')
})

app.post('/proto', function(req, res){
    console.log(req.body.yo);
    res.json({data: req.body})
});


app.listen(PORT, () => {
    console.log("Listening on PORT: ", PORT);
});