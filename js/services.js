weatherApp
    .service('cityService', function(){
        this.city = "Dubai, UAE"
    })

    .service('weatherService',
        ['$resource', function($resource){

        this.getWeather = function(city, days, units) {
            var weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily",
                {callback: "JSON_CALLBACK"},
                {get: {method: "JSONP"}}
            );

            return weatherAPI.get(
                {
                    q: city,
                    mode: "json",
                    appid: "10291465235bff9adb7f5fcf71b7deb6",
                    units: units,
                    cnt: days
                }
            );
        }
    }]);