'use strict';

angular.module('NoWaste',['ui.router','NoWaste.controllers', 'NoWaste.services', 'NoWaste.filters'])


.config(function($stateProvider, $urlRouterProvider){
    
    $urlRouterProvider.otherwise('/');
    
    $stateProvider
    
    .state('app', {
        url: '/',
        views: {
            'header' :{
                templateUrl: "views/header.html",
                controller: 'headerController'
            },
            'content': {
                templateUrl: 'views/content.html',
                controller: 'contentController'
            },
            'footer': {
                templateUrl: 'views/footer.html',
                controller: ''
            }
            
        }
    })
    
    .state('app.profile', {
        url: 'profile/:user',
        views: {
            'content@': {
                templateUrl: 'views/profile.html',
                controller: 'profileController'
            }
            
        }
        
    })
    
    .state('app.agenda', {
        resolve:{agendaSource: function(httpService) {
            httpService.getTimeline();
        }},
        url: 'agenda/:user',
        views: {
            'content@': {
                templateUrl: 'views/agenda.html',
                controller: 'agendaController'
            }
        }
        
    })
    
    .state('app.facebook', {
        resolve:{
            setFacebookLogin: function(httpService, $stateParams) {
                httpService.getName($stateParams.token);
        }},
        url: 'facebook/:token',
        
    })
     
});