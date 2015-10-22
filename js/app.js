var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource'])

    .controller('homeController',['$scope', 'cityService', function($scope, cityService){
        $scope.city = cityService.city;
        $scope.$watch('city', function(){
            cityService.city = $scope.city;
        });
    }])

    .controller('forecastController',
                    ['$scope', 'cityService', '$resource', '$routeParams',
                        function($scope, cityService, $resource, $routeParams){
        $scope.city = cityService.city;
        $scope.days = $routeParams.days || 3;

        $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily",
            { callback: "JSON_CALLBACK" },
            { get: { method: "JSONP" }}
        );

        $scope.weatherResult = $scope.weatherAPI.get(
            {
                q: $scope.city,
                mode: "json",
                appid: "10291465235bff9adb7f5fcf71b7deb6",
                units: "metric",
                cnt: $scope.days
            }
        );

        $scope.convertToDate = function(utcDate){
            return new Date(utcDate * 1000);
        };

    }])

    .service('cityService', function(){
        this.city = "Dubai, UAE"
    })

    .config(function($routeProvider){
        $routeProvider
            .when('/', {
                templateUrl: "pages/home.html",
                controller: "homeController"
            })
            .when('/forecast', {
                templateUrl: "pages/forecast.html",
                controller: "forecastController"
            })
            .when('/forecast/:days', {
                templateUrl: "pages/forecast.html",
                controller: "forecastController"
            });
    });