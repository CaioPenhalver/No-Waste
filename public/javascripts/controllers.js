'use strict';

angular.module('NoWaste.controllers', [])

.controller('headerController', ['$scope', 'httpService', 'profileService', '$state',
function($scope, httpService, profileService, $state){
    
    /*
    Function responsible for showing and hiding the sign up form.
    */
    $scope.profileInfo = profileService.getProfile;
    
    /*
    Function that makes the validation for the sign up form.
    */
    var user = {
        username: null,
        password: null
    };
    $scope.user = user;
    
    $scope.login = httpService.login;       
    $scope.logout = httpService.logout;
    
}])

.controller('contentController', ['$scope', 'httpService', 'profileService',
function($scope, httpService, profileService){
    
    $scope.loginByFacebook = httpService.facebook;
    
    /*Hide and show tab*/
    $scope.tab = 1;
    $scope.changeTab = function (tab){
        $scope.tab = tab;
    };
    
    /*
    Function that makes the validation for the sign up form.
    */
    $scope.newUser = {
        username: "",
        firstname: "",
        lastname: "",
        password: "",
        
    };
    $scope.passwordConfirmation = {
                password: ""
            }; 
    var newUserDefault = angular.copy($scope.newUser);

    $scope.register = function(newUser){
        httpService.register(newUser);
            
           $scope.newUser = {
                username: "",
                firstname: "",
                lastname: "",
                password: ""
            };  
            $scope.passwordConfirmation = {
                password: ""
            };  
    }
    $scope.registrationMsg = profileService.getRegistrationFlag;

}])

.controller('profileController', [function(){
    
}])

.controller('agendaController', ['$scope', 'agendaModelService', 'httpService',
function($scope, agendaModelService, httpService){
    
    $scope.agendaItem = {
        date: '',
        description: '',
        type: "Daily",
        value: ''
    };
    
    $scope.filter = {
        date: '',
        description: '',
        type: '',
        value: ''
    };
    
    $scope.setItem = function(item){
                console.log(item);

        agendaModelService.setNewItem(item);
        $scope.agendaItem = {
            date: '',
            description: '',
            type: "Daily",
            value: ''
        };
    }
   
    $scope.agenda = agendaModelService;
    
    $scope.saveTimeline = httpService.setTimeline;
    
    /*Hide and show tab*/
    $scope.tab = 1;
    $scope.changeTab = function (tab){
        $scope.tab = tab;
    }
}])
;