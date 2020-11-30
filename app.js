const express = require('express');

const https = require('https');

const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
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
            res.write('<body style="color:#fff; background-color:#BFD7EA;font-family: "Open Sans", sans-serif;">')
            res.write('<section style = "height:100vh">')
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            res.write('<div style="max-width: 500px;padding: 5em 2em;background-color: #839788;border-radius : 10px;height:65vh;margin-right:35%;margin-left:35%;padding-top:10%;text-align:center">');
            res.write('<h1 style = "color:#fff;">The weather is currently ' + weatherDescription + '</h1>');
            const icon =weatherData.weather[0].icon;
            const imageURL = 'http://openweathermap.org/img/wn/' + icon + '@2x.png';
            res.write('<img src = ' +  imageURL + '>');
            res.write('<h1 style="font-family:"Raleway",sans-serif;text-align:center">The temperature in ' + place + ' is ' );
            res.write('<br><h1style="font-family:"Raleway",sans-serif;text-align:center">' + temp + " degrees Celcius</h1>");
            const feelLike = weatherData.main.feels_like;
            res.write("<h1>Feels like " + feelLike + " degrees celcius");
            res.write('</div>')
            res.write('</section');
            res.write("</body>");
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
