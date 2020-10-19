const request = require("request");

const geocode = (address, callback)=> {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiamJ1bWJhIiwiYSI6ImNrZXUyaXN1ejNxdTgyc3BjZG0yaWEyMnAifQ.nciefMzEQP7jHWxqCFce-w&limit=1';
    
    //request({url: url, json: true}, (error, response)=> {
    //request({url: url, json: true}, (error, response, body)=> {
    request({url: url, json: true}, (error, {body})=> {
       if (error) {
           callback("Unable to connect to weather app", undefined);
       }else if (body.features.length === 0) {
           callback("Unable to find a location. Try another search", undefined);
       }else{
           callback(undefined,{
            
            longitude: body.features[0].center[0],
            latitude : body.features[0].center[1],
            location: body.features[0].place_name
            
           })
       }
       
    });

};

module.exports = geocode;