var app = angular.module('Statistic', ['ngMaterial']);
app.controller('StatisticController', function($scope) {

    $scope.calculate = function(){
        var values = document.getElementsByName('values')[0].value;
        if(values.length > 0){
            values = values.split(" ");
            values = values.map(function(x){
               return Number(x); 
            });
            var tam = values.length;
            var operation = $scope.getSelectedText();
            switch(operation) {
                case "Média":
                    var res = $scope.media(values,tam);
                    break;
                case "Mediana":
                    var res = $scope.mediana(values,tam);
                    break;
                case "Moda":
                    var res = $scope.moda(values,tam);
                    break;
                case "Variância":
                    var res = $scope.variancia(values,tam);
                    break;
                case "Desvio Padrão":
                    var res = $scope.desvioPadrao(values,tam);
                    break;
                default:
                    break;
            }
            
            document.getElementById('result').innerHTML = "Resultado: "+res;
        }else{
            alert("Favor digitar os valores que deseja calcular.");
            document.getElementById('result').innerHTML = '';
        }
    };
    
    $scope.media = function(values,tam){
        var res = 0, i = 0;
        for(i = 0; i < tam; i++){
            res += values[i];
        }
        return (res/tam).toFixed(4).replace('.',',');
    }
    
    $scope.mediana = function(values,tam){
        var size = tam/2;
        values.sort(function(a, b){return a - b});
        if(tam%2 == 0){
            return (values[size-1] + values[size]) / 2;
        }else{
            return values[Math.round(size-1)].toFixed(4).replace('.',',');
        }
    }
    
    $scope.moda = function(values,tam){
        values.sort(function(a, b){return a - b});
        
        var count = 1;
        var lista = [];

        for(var i=0; i<tam; i++){
            if(values[i] == values[i+1]){
                count++;
            }else{
                lista[values[i]] = count;
                count = 1;
            }
        }
        var max = lista[Object.keys(lista).reduce(function(a, b){ return lista[a] > lista[b] ? a : b })];
        values = [];
        
        
        for(var i = 0; i < lista.length; i++){
            if(lista[i] == max){
                values[i] = i;
            }
        }
        
        return $scope.removeUndefined(values);
    }

    $scope.variancia = function(values,tam){
        var media = parseInt($scope.media(values,tam));
        var total = 0;
        
        for(var i = 0; i < tam; i++){
            total += Math.pow(Math.abs((values[i]-media)),2);   
        }
        
        return (total/(tam-1)).toFixed(4).replace('.',',');
    }
    
    $scope.desvioPadrao = function(values,tam){
        return Math.sqrt($scope.variancia(values,tam).replace(',','.')).toFixed(4).replace('.',',');
    }

    $scope.removeUndefined = function(values){
        var count = 0;
        var lista = [];
        
        for(var i = 0; i <= values.length; i++){
            if(typeof values[i] !== 'undefined'){
                lista[count] = values[i];
                count++;
            }
        }
        return lista;
    }

    $scope.items = ["Média","Mediana","Moda","Variância","Desvio Padrão"];
    $scope.selectedItem;
    $scope.getSelectedText = function() {
        if ($scope.selectedItem !== undefined) {
          return $scope.selectedItem;
        } else {
          return "Selecione uma operação";
        }
    };

});