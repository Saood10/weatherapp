const express = require('express');
const bodyParser  = require('body-parser');
const https = require('https');
const { log } = require('console');
const { write } = require('fs');

const app  = express();

app.use(bodyParser.urlencoded({extended : true}));

app.get("/" , function( req , res ){

res.sendFile(__dirname + "/index.html");


});

app.get('/style.css', function(req, res) {

    res.sendFile(__dirname + "/" + "style.css");

});



app.post("/" ,  function(req , res){

    
    const query = (req.body.cityname).charAt(0).toUpperCase() + req.body.cityname.slice(1);

    const appkey ="f6af6db547203a2fcbe8ae6fce19de57";

    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&units=metric&appid="+appkey;

    https.get(url , function(response){

        response.on("data" , function(d){

        const weatherdata = JSON.parse(d);
        const temp = weatherdata.main.temp;
        const des = (weatherdata.weather[0].description).charAt(0).toUpperCase() + weatherdata.weather[0].description.slice(1);
        const icon = weatherdata.weather[0].icon;

        const imgUrl = "https://openweathermap.org/img/wn/"+ icon +"@2x.png";

        res.write("<h1>"+query+"</h1>");
        res.write(des);
        res.write("<h1><img height = 100px src = " + imgUrl + "><span >"+Math.round(temp)+"&deg;C</span> </h1>");
       

        res.send();

        });
  
    });



});

app.listen(3000 , function(){

    console.log("server running on port 3000");


});