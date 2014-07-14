'use strict';

var forecastioWeather = ['$q', '$resource', '$http', 'FORECASTIO_KEY', 
  function($q, $resource, $http, FORECASTIO_KEY) {
  var url = 'https://api.forecast.io/forecast/' + FORECASTIO_KEY + '/';

  var weatherResource = $resource(url, {
    callback: 'JSON_CALLBACK',
  }, {
    get: {
      method: 'JSONP'
    }
  });

  return {
    //getAtLocation: function(lat, lng) {
    getCurrentWeather: function(lat, lng) {
      return $http.jsonp(url + lat + ',' + lng + '?callback=JSON_CALLBACK');
    }
  }
}];

angular.module('starter.services', ['ngResource'])
// .factory('Cities', function() {
//     var cities = [];

//     return {
//       all: function() {
//           debugger;

//           var data = window.localStorage.getItem('cities');

//           if (data != null )  {
//             cities   = null;
//             cities   = JSON.parse(data);
//             console.log('using local storage');
//           }
//           else {
            
//             var cityObj = Parse.Object.extend("City");
//             var query = new Parse.Query(cityObj);
//             //query.descending("createdAt");
//             //query.limit(20);  //fetch only 20 objects

//             query.find({
//                   success:function(results) { 
//                         var index =0;
//                         var Arrlen=results.length ;

//                         for (index = 0; index < Arrlen; ++index) {
//                             var obj = results[index];

//                             cities.push({ 
//                               id :  obj.id,
//                               name: obj.attributes.ventimage,
//                               lat:  obj.attributes.latitude,
//                               lgn:  obj.attributes.longitude
//                             });
//                         }
//                         return cities;
//               },
//               error:function(error) {
//                   console.log("Error retrieving cities!");
//                   }
//               }); //end query.find

//             //return cities;
//           }  
//       },
//       get: function(cityId) {
//         //given object id get object from localstorage
//         var data = window.localStorage.getItem('cities');
//         return data[cityId];
//       }
//     }
// }).
.factory('DataStore', function() {
    //create datastore with default values
    var DataStore = {
        city:       'Miami',
        latitude:   25.7877,
        longitude:  80.2241 };

    DataStore.setCity = function (value) {
       DataStore.city = value;
    };

    DataStore.setLatitude = function (value) {
       DataStore.longitude = value;
    };

    DataStore.setLongitude = function (value) {
       DataStore.longitude = value;
    };
   
    return DataStore;
})
.factory('Weather', forecastioWeather);
