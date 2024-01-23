const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());



const PORT = 5001;

const CITIES = [
    {
        id: 1,
        city: 'Oslo',
        country: 'Norway'
    },
    {
        id: 2,
        city: 'Paris',
        country: 'France'
    },
    {
        id: 3,
        city: 'Pretoria',
        country: 'South-Africa'
    }
]

app.get('/',(req, res) => {
 res.send('👍 Hej!');
});

app.get('/cities', (req,res) => {
    res.status(200).json(CITIES);
});

app.get('/cities/:id', (req,res) => {
    const cityId = parseInt(req.params.id);

    const city = CITIES.find((item) => item.id === cityId);

    if (!city) {
        res.status(404).json({message: "City not found" });
    }

    res.status(200).json(city);

    console.log(req.params.id);
    res.send(OK);
});

app.post('/cities', (req,res) => {
 console.log(req.body);
 const city = {
    id: CITIES.length +1,
    city: req.body.city,
    country: req.body.country
 }

    CITIES.push(city);
    res.send(city);
});

    //res.status(200).json(city); old one

app.delete('/cities/:id', (req, res) => {
    const cityId = parseInt(req.params.id);
    
    const cityIndex = CITIES.findIndex((item) => item.id === cityId);
    
    if (cityIndex === -1) {
        return res.status(404).json({ message: "City not found" });
    }
    
    const deletedCity = CITIES.splice(cityIndex, 1)[0];
    res.status(200).json(deletedCity);
});


app.put('/cities/', (req, res) => {
    console.log(req.body)
    const id = parseInt(req.body.id);
  
    const cityIndex = CITIES.findIndex(item => item.id === id);
    if(cityIndex === -1) {
      res.status(404).send('City not found, can not update');
      return;
    }
  
    const updatedCity = CITIES.find(item => item.id === id);
    updatedCity.city = req.body.city;
    updatedCity.country = req.body.country;
    
    CITIES[cityIndex].city = req.body.city;
    CITIES[cityIndex].country = req.body.country;

    res.send(CITIES[cityIndex]);
  
  });

  
app.listen( PORT, () => {
    console.log("BACKEND IS LISTENING ON PORT " + PORT);
});


console.log("BACKEND IS RUNNING!");