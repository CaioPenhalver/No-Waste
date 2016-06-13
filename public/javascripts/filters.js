'strict'

angular.module('NoWaste.filters',[])

.filter('dateFilter', function(){
    return function (array, date) {
        date = date || null;
        
        var arrayFiltered = [];
        
        if(date !== null){
           var month =  date.getMonth();
           var day =  date.getDay();
           var year =  date.getFullYear();
           
            for(var i=0; i < array.length; i++){
               var d = new Date(array[i].date);
                if(d.getMonth() == month && d.getDay() == day && d.getFullYear() == year){
                    
                    arrayFiltered.push(array[i]);
                }
            }
        }else arrayFiltered = array;
        
        return arrayFiltered;
    };
})

.filter('descFilter', function(){
    return function (array, description) {
        description = description || null;
        
        var arrayFiltered = [];
    
        if(description !== null){
            for(var i=0; i < array.length; i++){
                if(array[i].description.search(description) != -1){
                    arrayFiltered.push(array[i]);
                }
            }
        }else arrayFiltered = array;
        
        return arrayFiltered;
    };
})

.filter('typeFilter', function(){
    return function (array, type) {
        type = type || null;
      
        var arrayFiltered = [];
        
        if(type !== null){
            for(var i=0; i < array.length; i++){
                if(array[i].type == type){
                    arrayFiltered.push(array[i]);
                }
            }
        }else arrayFiltered = array;
        return arrayFiltered;
    };
})

.filter('valueFilter', function(){
    return function (array, value) {
        value = value || null;
      
        var arrayFiltered = [];
        
        if(value !== null){
            for(var i=0; i < array.length; i++){
                if(array[i].value == value){
                    arrayFiltered.push(array[i]);
                }
            }
        }else arrayFiltered = array;
        return arrayFiltered;
    };
})
;