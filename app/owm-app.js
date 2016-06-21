(function(){
    angular.module('OWMApp', ['ngRoute', 'ngAnimate'])
        .config(['$routeProvider', function($routeProvider){
        $routeProvider
           .when('/', {
              templateUrl: './home.html',
              controller : 'HomeCtrl',
              controllerAs: 'home'
           })
           .when('/cities/:city', {
                templateUrl : 'city.html',
                controller : 'CityCtrl',
                controllerAs: 'vm',
                resolve : {
                    city: function(owmCities, $route, $location) {
                        var city = $route.current.params.city;
                        if(owmCities.indexOf(city) == -1 ) {
                            $location.path('/error');
                            return;
                        }
                        return city;
                    }
                }
            })
            .when('/error', {
                  template : '<p>Error Page Not Found</p>'
                })
            .otherwise('/error');
      }])
   .run(['$rootScope', '$location', '$timeout', function($rootScope, $location, $timeout) {
        $rootScope.$on('$routeChangeError', function() {
              //when there is a route change error, reroute to the error path
                $location.path("/error");
            });
            $rootScope.$on('$routeChangeStart', function() {
              //when the route change starts, set the root scope isLoading variable to true,
              //so it renders the image
              $rootScope.isLoading = true;
            });
            $rootScope.$on('$routeChangeSuccess', function(){
              //then when the route chage succeeds, wait 1 second and then set isLoading back to false
              $timeout(function(){
                  $rootScope.isLoading = false; 
                //we set 1 second for timeout otherwise the change will be so fast we will not see it
              //this is a simulation to a server request which can take a little longer
                }, 500);
            });
        }])

   .value('owmCities', ['New York', 'Dallas', 'Chicago'])

   .controller('HomeCtrl', ['$scope', function($scope) {
        //empty for now 
    }])

   .controller('CityCtrl', ['$scope', '$routeParams', 'city', function($scope, $routeParams, city) {
        var vm = this;
        vm.city = city;
      }]);
}());