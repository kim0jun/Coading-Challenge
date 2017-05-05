var express = require("express")
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 3000;

app.set('views', __dirname+'/views')
app.set('view engine','html');
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('list'));

// app.get('/', function (req, res) {
//   res.render('index', { title: 'Hey', message: 'Hello there!' });
// });


app.listen(port, function () {
    console.log(`start on ${port}`);
})