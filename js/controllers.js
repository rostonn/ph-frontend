app.controller('mainController', function($scope, $http, $localStorage, $location) {
  $scope.logout = function() {
    $localStorage.$reset();
    $location.path('/');
  }
});

app.controller('LoginController', function($scope, $location, $http, $localStorage, authService) {
  // $scope.token = authService.loginLocal(user);
  // $localStorage.token = $routeParams.token;
  $scope.user = {};
  $scope.loginlocal = function() {
    authService.loginLocal($scope.user).then(function(token) {
      //Store Token
      $localStorage.token = token.data;
      //Go to Dashboard
      $location.path('/dashboard');
    });
  }
});


//signup
app.controller('signupController', function($scope, $location, $http, $localStorage, authService) {
  $scope.user = {};
  $scope.signupSuccess = 0;
  $scope.signUp = function() {
    console.log($scope.user);
    authService.signupLocal($scope.user).then(function(status) {
      console.log(status.status);
      $scope.signupSuccess = 1;
    })
  }
});

//dashboard
app.controller('dashboard', function($scope, $location, $http, $localStorage,$window, dashboard) {
  $scope.piArray = [];
  $scope.showPiForm = 0;
  $scope.newPi = {};
  $scope.showPiFormFunction = function(){
    $scope.showPiForm = 1;
  }
  $scope.hidePiFormFunction = function(){
    $scope.showPiForm = 0;
  }

  dashboard.pi().then(function(pis){
    $scope.piArray = pis.data;
  })

  //Insert Pi ID
  $scope.insertPi = function(){
    dashboard.insertPi($scope.newPi)
    .then(function(pi){
      $scope.piArray.push(pi.config.data);
      $scope.showPiForm = 0;
      $scope.newPi = {};
    })
  }

  //Delete PI
  $scope.deletePi = function(pi){
    if($window.confirm('Are you sure you want to delete '+pi.name+'?')){
      dashboard.deletePi(pi)
      .then(function(){
        var index = $scope.piArray.indexOf(pi);
        $scope.piArray.splice(index,1);
      })
    };
    return;
  }
});
