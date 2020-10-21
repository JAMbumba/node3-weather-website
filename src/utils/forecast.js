const request = require('request');

const forecast = (latitude, longitude, callback)=>{
  
    const url = 'http://api.weatherstack.com/current?access_key=9e6e5ba3a911d6974b7d73cc52841001&query='+ latitude +','+ longitude  +'&units=f';
    
    //request({url: url, json: true}, (error, response)=> {
    //request({url: url, json: true}, (error, response, body)=> {
    request({url, json:true}, (error, {body})=> {

        if (error) {
            callback("Unable to connect to weather service!", undefined);
        }else if(body.error){
            callback("Unable to find a location!", undefined);
        }else {
            callback(undefined, 
                body.current.weather_descriptions[0]+". It is currently "+ body.current.temperature + " degrees out. It feelslike "+ body.current.feelslike + " degrees out. The current humidity is "+ body.current.humidity + "%.");
                
        }
      
    }); 

};

module.exports = forecast;