const express = require('express');

const https = require('https');

const bodyParser = require('body-parser');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.get('/', function(req,res){

    res.sendFile(__dirname + '/public/index.html');
    
});


app.post('/',function(req,res){
    const place = req.body.cityname;

    const apiKey = 'a39b87fc707b5b7ff04d4f7ac35a7ff4';
    const unit = 'metric';
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + place + '&appid=' + apiKey + '&units=' + unit;
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on('data', function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            res.write('<p>The weather is currently ' + weatherDescription + '</p>');
            res.write("")
            const icon =weatherData.weather[0].icon;
            const imageURL = 'http://openweathermap.org/img/wn/' + icon + '@2x.png';
            res.write('<img src = ' +  imageURL + '>');
            res.write('<h1>The temperature in ' + place + ' is ' + temp + ' degrees Celcius</h1>');
            res.send();
        
        })
    });
})

/*const place = 'Chennai';

    const apiKey = 'a39b87fc707b5b7ff04d4f7ac35a7ff4';
    const unit = 'metric';
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + place + '&appid=' + apiKey + '&units=' + unit;
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on('data', function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            
            res.write('<p>The weather is currently ' + weatherDescription + '</p>');
            
            const icon =weatherData.weather[0].icon;
            const imageURL = 'http://openweathermap.org/img/wn/' + icon + '@2x.png';
            res.write('<img src = ' +  imageURL + '>');
            res.write('<h1>The temperature in Chennai is ' + temp + ' degrees Celcius</h1>');
            res.send();
        
        })
    });
*/
app.listen(3000, function(){
    console.log('Server is running on port 3000');
});