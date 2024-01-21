const express = require('express');
const axios = require('axios');
const app = express();

//şablon motoru ejs olarak ayarlandı
app.set('view engine', 'ejs');

//statik dosyaları public klasörü olarak belirledik
app.use(express.static("public"));

// index sayfasını default değerler ile render ettik
app.get('/', (req, res) => {
    res.render("index", { weather: null, error: null });
});

//handle /weather route
app.get('/weather', async (req, res) => {
    const city = req.query.city;
    const apiKey = "";

    //API den hava durumunu almak için 
    const APIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

    let weather;
    let error= null;

    try {
        const response = await axios.get(APIUrl);
        weather = response.data;
    } catch (error) {
        weather = null;
        error = 'lütfen yeniden deneyin';

    }

    res.render("index", {weather , error});
});

//8000 portunu çalıştırdık

const port = process.env.PORT || 8000;

app.listen(port, ()=>{
    console.log(`port calisti ${port}`);
});
