var app = angular.module('ph', ['ngRoute','ngStorage', 'angularMoment']);

app.config(function($routeProvider,$httpProvider) {
    $routeProvider
      .when('/login',{
        templateUrl: 'partials/login.html',
        controller: 'LoginController'
      })
      .when('/signup', {
        templateUrl: 'partials/signup.html',
        controller: 'signupController'
      })
      .when('/dashboard', {
        templateUrl: 'partials/dashboard.html',
        controller: 'dashboard'
      })
      // .when('/newbrew', {
      //   templateUrl: 'partials/newbrew.html',
      //   controller: 'NewBrewController'
      // })
      // .when('/authenticate/:token',{
      //   templateUrl:'/partials/auth.html',
      //   controller: 'authController'
      // })
      .otherwise({redirectTo: "/login"})

      $httpProvider.interceptors.push(['$q', '$location', '$localStorage','$window', function ($q, $location, $localStorage,$window) {
         return {
             'request': function (config) {
                 config.headers = config.headers || {};
                 if ($localStorage.token) {
                     config.headers.token = $localStorage.token;
                 }
                 return config;
             },
             'responseError': function (response) {
                 if (response.status === 401 || response.status === 403) {
                    if($window.location.hash == '#/login'){
                      $window.alert('Invalid Username or Password');
                      // $location.path('/');
                    }
                    else{
                      $window.alert('other error');
                    }
                 }
                 else if(response.status === 469){
                   $window.alert('Username is already in use please select another')
                 }
                 return $q.reject(response);
             }
         };
      }]);
});

// app.directive('dashboard', function() {
//   return {
//     restrict: 'E',
//     templateUrl: 'partials/dashboard.html'
//   };
// });
//
// app.directive('batch', function() {
//   return {
//     restrict: 'E',
//     templateUrl: 'partials/batch.html'
//   };
// });
//
// app.factory('batch_service', function($http){
//   return {
//     getBatches:function(){
//       return $http.get(config.host +'dashboard').then(function(data){
//         console.log(data);
//         return data.data;
//       });
//     },
//     createBrew:function(brew){
//       return $http.post(config.host +'dashboard',brew);
//     }
//   };
// });
