'use strict';

angular.module('NoWaste.services', [])


.factory('profileService', [function(){
 
    var profile = {
        username: null,
        token: null
        };
    var registrationFlag = {
        success: false,
        error: false    
    };
    
    var methods = {};
    
    methods.setProfile = function (newProfile){
        profile = newProfile;
        console.log(profile);
    }
    
    methods.getProfile = function (){
        return profile;
    }
    
    methods.getRegistrationFlag = function(){
        return registrationFlag;
    }
    
    methods.setRegistrationFlag = function(flag){
        registrationFlag = flag;
    }
    
    return methods;
    
    
}])

.factory('httpService', ['$http', 'agendaModelService', 'profileService', '$state', '$window',
function ($http, agendaModelService, profileService, $state, $window) {
    
    var httpMethods = {};
    
    httpMethods.getName = function(tokenFb){
        if(tokenFb){
                    $http.get('/timeline/getName', {headers: {
                    'x-access-token':tokenFb
                    }})
                    .then(function(res){
                        profileService.setProfile({
                            username: res.data.username,
                            token: tokenFb
                        });
                        console.log(res);
                        $state.go('app.agenda',{user: res.data.username});
                    }, 
                    function(res){
                        console.log(res);
                    });
                }
    }
    
    httpMethods.getTimeline = function(){
        var config = {
                headers: {
                    'x-access-token':profileService.getProfile().token
                }
            };
        $http.get('/timeline', config).then(function(res){
            agendaModelService.setAgenda(res.data.timeline);
            console.log(res);
        }, 
        function(res){
            console.log(res);
        });
    }
    
    httpMethods.setTimeline = function(){
        var data = {
            timeline: agendaModelService.getAgenda()
        }
        var config = {
                headers: {
                    'x-access-token':profileService.getProfile().token
                }
            };
        $http.post('/timeline', data, config).then(function(res){
            console.log(res);
        }, 
        function(res){
            console.log(profileService.getProfile().token);
            console.log(res);
        });
    }
    
    httpMethods.login = function(user){
        $http.post('/user/login', user).then(function(res){
            console.log(res);
            if(res.data.success){
               profileService.setProfile({
                    username: user.username,
                    token: res.data.token
                   });
                   $state.go('app.agenda',{user: profileService.getProfile().username})
            }
            
        }, 
        function(res){
            console.log(res);
        });
    };
   
    httpMethods.logout = function(){
        var config = {
                headers: {
                    'x-access-token':profileService.getProfile().token
                }
            };
        $http.get('/user/logout', config).then(function(res){
            if(res.data.success){
                profileService.setProfile({
                    username: null,
                    token: null
                });
                $state.go('app')
            }
            console.log(res);
        }, 
        function(res){
            console.log(res);
        });
        
    }
    
    httpMethods.facebook = function(){
      
            var url = 'http://nowaste.mybluemix.net/user/facebook',
                width = 1000,
                height = 650,
                top = (window.outerHeight - height) / 2,
                left = (window.outerWidth - width) / 2;
            $window.open(url, 'facebook_login', 'width=' + width + ',height=' + height + ',scrollbars=0,top=' + top + ',left=' + left);
        
        /*console.log('facebook');
        $http.get('/user/facebook').then(function(res){
            if(res.data.success){
      
                
            }
            console.log(res);
        }, 
        function(res){
            console.log(res);
        });*/
        
    }
    
    httpMethods.register = function (newUser) {   
        console.log(newUser);
        $http.post('/user/register', newUser).then(function(res){
            if(res.data.success){
               profileService.setRegistrationFlag({
                   success: true,
                    error: false 
               });
            }
            console.log(res);
        }, 
        function(res){
           console.log(res);
           profileService.setRegistrationFlag({
                   success: false,
                    error: true 
               });
        });
    };

    return httpMethods;
    
}])

.factory('agendaModelService', [function () {
    
    var data =[];
    
    var agendaObject = {};
    agendaObject.setNewItem = function(item){
        data.push(item);
        console.log(data);
    }
    
    agendaObject.getAgenda = function(){
        return data;
    }
    
    agendaObject.setAgenda = function(newData){
        data = newData;
    }
    
    
    return agendaObject;
}])
;