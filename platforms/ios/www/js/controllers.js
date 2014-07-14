angular.module('starter.controllers', ['ionic'])
.constant('FORECASTIO_KEY', 'd077b9edfc6d7f4eb0642938e4cb3149')
.controller('HomeCtrl', function($scope,$state,Weather,DataStore) {
	//read default settings into scope
	console.log('inside home');
	$scope.city  = DataStore.city;
	var latitude  =  DataStore.latitude;
	var longitude = DataStore.longitude;
		
	//call getCurrentWeather method in factory ‘Weather’
	Weather.getCurrentWeather(latitude,longitude).then(function(resp) {
      $scope.current = resp.data;
      console.log('GOT CURRENT', $scope.current);
      //debugger;
    }, function(error) {
      alert('Unable to get current conditions');
      console.error(error);
    });

})
.controller('LocationsCtrl', function($scope,$rootScope, $state,DataStore) {
 	//get cities data from factory
  	$scope.cities = [];

  	var data = window.localStorage.getItem('cities');

    if (data != null )  {
        $scope.cities   = null;
        $scope.cities   = JSON.parse(data);
        console.log('using local storage');
    }
    else {
        var cityObj = Parse.Object.extend("City");
        var query = new Parse.Query(cityObj);
        //query.descending("createdAt");
        //query.limit(20);  //fetch only 20 objects

        query.find({
            success:function(results) { 
                $scope.$apply(function() {
                	var index =0;
                 	var Arrlen=results.length ;

                    for (index = 0; index < Arrlen; ++index) {
                       	var obj = results[index];
	                        $scope.cities.push({ 
                              id :  obj.id,
                              name: obj.attributes.name,
                              lat:  obj.attributes.latitude,
                              lgn:  obj.attributes.longitude
                            });
                    }
                    //debugger;
                    window.localStorage.setItem('cities', JSON.stringify($scope.cities));
                });     
            },
            error:function(error) {
                  console.log("Error retrieving cities!");
            }
        }); //end query.find
    }


  	$scope.changeCity = function(cityId) {
  		
	  	//get lat and longitude for seleted location
	  	var data = JSON.parse(window.localStorage.getItem('cities'));
	  	
		var lat  = data[cityId].lat; //latitude
		var lgn  = data[cityId].lgn; //longitude
		var city = data[cityId].name; //city name

		DataStore.setCity(city);
		DataStore.setLatitude(lat);
		DataStore.setLongitude(lgn);
		
	  	$state.go('tab.home');
  	}
})
.controller('SettingsCtrl', function($scope) {
	//manages app settings
});
