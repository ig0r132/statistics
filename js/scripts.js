var app = angular.module('Statistic', ['ngMaterial']);
app.controller('StatisticController', function($scope) {

    $scope.calculate = function(){
        var values = document.getElementsByName('values')[0].value;
        if(values.length > 0){
            var res = 0;
            var i=0;
            values = values.split(" ");
            values = values.map(function(x){
               return Number(x); 
            });
            var tam = values.length;
            var operation = $scope.getSelectedText();
            switch(operation) {
                case "Média":
                    for(i = 0; i < tam; i++){
                        res += values[i];
                    }
                        res = res/tam;
                        res = res.toFixed(4);
                    break;
                case "2":
                
                    break;
                default:
                    break;
            }
            
            document.getElementById('result').innerHTML = "Resultado: "+res;
        }else{
            alert("Favor digitar os valores que deseja calcular.");
            document.getElementById('result').innerHTML = '';
        }
    }

    $scope.items = ["Média"];
      $scope.selectedItem;
      $scope.getSelectedText = function() {
        if ($scope.selectedItem !== undefined) {
          return $scope.selectedItem;
        } else {
          return "Selecione uma operação";
        }
      };

});

/*var globalFlag = 0;

function clearInput(){
    var text = document.getElementsByName('values')[0].value;
    if(text.length > 0 && globalFlag == 0){
        document.getElementsByName('values')[0].value = '';
    }
}

function calculate(){
    var values = document.getElementsByName('values')[0].value;
    if(values.length > 0){
        var res = 0;
        var i=0;
        values = values.split(" ");
        values = values.map(function(x){
           return Number(x); 
        });
        var tam = values.length;
        var operation = document.getElementsByName('operation')[0].value;
        switch(operation) {
            case "1":
                for(i = 0; i < tam; i++){
                    res += values[i];
                    
                }
                    res = res/tam;
                break;
            case "2":
            
                break;
            default:
                break;
        }
        
        document.getElementById('result').innerHTML = "Resultado: "+res;
        
        globalFlag = 1;
    }else{
        alert("Favor digitar os valores que deseja calcular.");
        document.getElementById('result').innerHTML = '';
    }
    
    if (history.pushState) {
    var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '';
    window.history.pushState({path:newurl},'',newurl);
}
}*/