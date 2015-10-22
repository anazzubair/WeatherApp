weatherApp
    .controller('homeController',['$scope', 'cityService', '$location', function($scope, cityService, $location){
        $scope.city = cityService.city;

        $scope.$watch('city', function(){
            cityService.city = $scope.city;
        });

        $scope.submit = function(){
            $location.path("/forecast");
        };
    }])

    .controller('forecastController',
        ['$scope', 'cityService', '$routeParams', 'weatherService',
        function($scope, cityService, $routeParams, weatherService){
            $scope.city = cityService.city;
            $scope.days = $routeParams.days || 3;
            $scope.units = "metric";

            $scope.weatherResult = weatherService.getWeather($scope.city, $scope.days, $scope.units);

            $scope.convertToDate = function(utcDate){
                return new Date(utcDate * 1000);
            };

        }]);