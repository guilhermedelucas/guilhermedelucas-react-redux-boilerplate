var express = require('express');
var app = express();

process.env.NODE_ENV = 'production';

if (process.env.NODE_ENV === 'production') {
    app.use(require('./webpack.config.js'));
}

app.use(function(req, res, next){
    console.log(req.method);
    console.log(req.url);
    next();
});
app.use(express.static(__dirname + '/public'));

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});


app.listen(process.env.PORT || 8080, function () {
  console.log('Hello World!');
})
