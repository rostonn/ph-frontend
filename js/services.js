app.service('authService', function($http) {
  this.loginLocal = function(user) {
    //POST request
    var req = {
      method: 'POST',
      url: config.host + 'auth/loginlocal',
      data: user
    };
    return $http(req)
      .then(function(token) {
        return token;
      })
  }
  this.signupLocal = function(user){
    var req = {
      method: 'POST',
      url: config.host + 'auth/signup',
      data: user
    };
    return $http(req)
      .then(function(status) {
        //respond with 201
        return status;
      })
  }
});

app.service('dashboard',function($http){
  this.pi = function(){
    var req = {
      method: 'GET',
      url: config.host + 'users',
    };
    return $http(req)
      .then(function(pis){
        return pis;
      })
  }
  this.insertPi = function(piId){
    console.log('HERE');
    var req = {
      method: 'POST',
      url: config.host + 'users/insertpi',
      data: piId
    };
    return $http(req)
      .then(function(pi){
        return pi
      })
  }
  this.deletePi = function(pi){
    var req = {
      method: 'POST',
      url: config.host + 'users/deletepi',
      data: pi
    };
    return $http(req)
      .then(function(pi){
        return pi
      })
  }
})
