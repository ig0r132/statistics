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
        /*Necessário melhorar como o resultado do calculo da moda sera demonstrado*/
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
        
        return values;
        
        /*
        var count=0,max=0,mode=0,num=0;
        for(var i = 0; i < tam; i++){
            if(num != values[i]){
                num = values[i];
                count = 1;
            }else{
                count++;
            }
            
            if(count > max){
                max = count;
                mode = num;
            }
        }
        return mode;
        */
    }

    $scope.items = ["Média","Mediana","Moda"];
    $scope.selectedItem;
    $scope.getSelectedText = function() {
        if ($scope.selectedItem !== undefined) {
          return $scope.selectedItem;
        } else {
          return "Selecione uma operação";
        }
    };

});