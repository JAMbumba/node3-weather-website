const path = require('path')
const express = require('express');
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for express config
//3 WAYS U CAN USE THE PUBLIC FOLDER OR FILE PATH
const publicDirectoryPath = path.join(__dirname,'../public')
//const publicDirectoryPath = __dirname +"public/index.html"; 
//const publicDirectoryPath = "public";
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//Set up handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))//it used when u want to customize your server

app.get("",(req, res)=>{
    res.render('index',{
        title: "Weather app",
        name: "JA Mbumba"
    })
})

app.get("/about", (req, res) => {
    res.render("about",{
        title:'About me',
        name : "JA Mbumba"
    })
})

app.get("/help", (req, res) => {
    res.render("help",{
        message:'How can i help you',
        title:'Help',
        name: 'JA Mbumba'
    })
})

app.get("/weather",(req, res)=>{

    if(!req.query.address){
        return res.send({// we the return to stop the function/ you can use if else stament for same purpose
            error: "Please you must provide the address!"
        })
    }
    geocode(req.query.address,(error, {latitude, longitude, location}={})=>{//Done by using the Object Destruction
        if (error) {
            return res.send({error})//to stop callback function and wont execute the next line
        }
    
          forecast(latitude, longitude, (error, forecastData) => {
          if (error) {
              return res.send({error})//Sending JSON Object
          }
         ///Sending the JSON objectikjk
          res.send({
            forecast: forecastData, location,
            address: req.query.address
          })
        });
    
    });
   /* res.send({
        forecast: "40 degress",
        location: "Cape Town",
        address: req.query.address
    })*/
})

app.get('/products', (req, res)=>{
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }

    console.log(req.query.search);
    res.send({
        products: []

    })
})

//route to handle 404 pages
app.get('/help/*',(req, res)=>{

    res.render("404pages",{
        errorMessages:'Help article not found',
        title:'Help',
        name: 'JA Mbumba'
    })
})

app.get('*',(req, res)=>{
    res.render("404pages",{
        errorMessages:'Page not found',
        title:'Help',
        name: 'JA Mbumba'
    })
})

/*app.get("/about",(req, res)=>{
    res.send("<h1>ABout page</h1>")
})*/

//DOMAIN
//app.com
//app.com/help
//app.com/about

app.listen(port, ()=>{
    console.log('Server Started at port '+port);
})