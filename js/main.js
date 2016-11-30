/*=============================================
/* Programa para obtener la varianza y 
 Desviación estandar a partir de un archivo 
 cargado tipo JSON
 @handleFileSelect(),fnOrderArray(),fnCalculateMean(),fnCalculateStd();
=============================================*/
'use strict';
document.getElementById("oFileLoad").addEventListener('change', handleFileSelect, false);
/*=============================================
=             handleFileSelect()            =
=             Parametro tipo evt            =
=             return Object                 =
=============================================*/
function handleFileSelect(evt) {
  var json = ''; // variable para almacenar los datos del archivo cargao
  var files = evt.target.files; // FileList objeto para la lectura del archivo
  for (var i = 0, f; f = files[i]; i++) { // Número de iteraciones para nuestro objeto input file
    var reader = new FileReader();
    reader.onload = (function (theFile) {
      return function (e) {
        try {
          json = JSON.parse(e.target.result);
          fnOrderArray(json);
        } catch (ex) {
          alert('Ocurrio un problema: ' + ex);
        }
      }
    })(f);
    reader.readAsText(f);
  }
}
/*=============================================
=            función  fnOrderArray         =
=             Parametro tipo new Array()     =
=             return new Array()             =
=============================================*/
function fnOrderArray(oArray){
  var oArrayEstimateProxySize,oArrayDevelopmentHours;
  oArrayEstimateProxySize = new Array(); // objeto tipo Array donde almacenamos los datos del archivo tipo JSON cargado
  oArrayDevelopmentHours = new Array(); // objeto tipo Array donde almacenamos los datos del archivo tipo JSON cargado
  for (var i = 0; i < oArray.length; i++) {
    oArrayEstimateProxySize[i] = oArray[i].Estimated_Proxy_Size;
    oArrayDevelopmentHours[i] = oArray[i].Development_Hours;
  }  
  document.getElementById("plistaMediaYDesvEst").innerHTML = "<blockquote>"+
  															   "<ins>Horas Trabajadas:</ins>"+oArrayEstimateProxySize+
  															   "<br><ins>Horas Dedicadas:</ins>"+oArrayDevelopmentHours+
  															 "</blockquote>";
  document.getElementById("trData").innerHTML = "<td>"+fnCalculateStd(oArrayEstimateProxySize) +"</td>"+
									            "<td>"+fnCalculateMean(oArrayEstimateProxySize)+"</td>"+
									            "<td>"+fnCalculateStd(oArrayDevelopmentHours)+"</td>"+
									            "<td>"+fnCalculateMean(oArrayDevelopmentHours)+"</td>";
}

/*=============================================
=            función  fnCalculateMean        =
=             Parametro tipo new Array()     =
=             return new Array()             =
=============================================*/
function fnCalculateMean(oArray){
  if (oArray != null){
        // Validamos si nuestro parametro tenga algún valor
    return math.mean(oArray).toFixed(4);
  }
} 
/*=============================================
=            función  fnCalculateStd         =
=             Parametro tipo new Array()     =
=             return new Array()             =
=============================================*/
function fnCalculateStd(oArray){
  if (oArray != null){
      // Validamos si nuestro parametro tenga algún valor
    return math.std(oArray).toFixed(4); 
  }
}