const express = require("express");
const https = require("https");
const { send } = require("process");
const ejs = require("ejs");
const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));



app.get("/", function(req, res) {
    res.render('index');
});

app.post("/", function(req, res) {
    const tableau_weather = [];
    const ville = req.body.ville;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + ville + "&appid=6fbe650541c5d3171826eefb4539199b&units=metric";

    https.get(url, function(response) {
        response.on("data", function(data) {
            const meteo_data = JSON.parse(data);
            /*const temperature = meteo_data.main.temp;
            const description = meteo_data.weather[0].description;*/
            const meteo = {
                city: ville,
                temperature: meteo_data.main.temp,
                description: meteo_data.weather[0].description,
                icon: meteo_data.weather[0].icon
            }
            tableau_weather.push(meteo);
            res.render("weather", { tableau: tableau_weather });

        });
    });
});

app.listen(3000, function() {
    console.log('le serveur a demarré sur le port 3000!');
})