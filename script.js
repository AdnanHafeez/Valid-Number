/**
 * @param {string} s
 * @return {boolean}
 */

 /**
  * @param {string} s
  * @return {boolean}
  */

 var isScientific = function(s)
 {
     var eIndex = s.indexOf('e');
     if(eIndex === -1) eIndex = s.indexOf('E');

     var firstHalf = s.substring(0,eIndex);
     var secondHalf = s.substring(eIndex+1);

     if(firstHalf.includes('.'))
         {
             if(!isDecimalScientific(firstHalf)) return false;
             if(secondHalf.includes('.')) return false;
             return (validPositiveNumber(secondHalf) || validNegativeNumber(secondHalf));
         }

     return ( (validPositiveNumber(firstHalf) || validNegativeNumber(firstHalf)) && (validPositiveNumber(secondHalf) || validNegativeNumber(secondHalf)));
 }
 var isDecimalScientific = function(s)
 {
     var pointIndex = s.indexOf('.');
     var mantissa = s.substring(0,pointIndex);
     var characteristics = s.substring(pointIndex+1);

     if(mantissa.length === 0 && characteristics.length === 0) return false;
     if (mantissa.length == 0) return validPositiveCharacteristics(characteristics);
     if(characteristics.length == 0) return validMantissa(mantissa);
     return (validMantissa(mantissa)) && (validPositiveCharacteristics(characteristics));


 }
 var isPositiveScientific = function(s)
 {
     var eIndex = s.indexOf('e');
     if(eIndex === -1) eIndex = s.indexOf('E');

     var firstHalf = s.substring(0,eIndex);
     var secondHalf = s.substring(eIndex+1);

     if(firstHalf.includes('.'))
         {
             if(!isDecimal(firstHalf)) return false;
             if(secondHalf.includes('.')) return false;
             return (validPositiveNumber(secondHalf) || validNegativeNumber(secondHalf));
         }

     return ( (validPositiveNumber(firstHalf) && validPositiveNumber(secondHalf)));
 }

 var isPositiveDecimal = function(s)
 {
     var pointIndex = s.indexOf('.');
     var mantissa = s.substring(0,pointIndex);
     var characteristics = s.substring(pointIndex+1);

     if (mantissa.length == 0) return validPositiveNumber(characteristics);
     if(characteristics.length == 0) return validPositiveMantissa(mantissa);
     return (validPositiveMantissa(mantissa)) && (validPositiveNumber(characteristics));


 }

 var isDecimal = function(s)
 {
     var pointIndex = s.indexOf('.');
     var mantissa = s.substring(0,pointIndex);
     var characteristics = s.substring(pointIndex+1);

     if (mantissa.length == 0) return validPositiveCharacteristics(characteristics);
     if(characteristics.length == 0) return validMantissa(mantissa);
     return (validMantissa(mantissa)) && (validPositiveCharacteristics(characteristics));


 }
 var validPositiveCharacteristics = function(s)
 {
     for(var i = 0; i < s.length; i++)
         {
             if(s.charCodeAt(i) < 48 || s.charCodeAt(i) > 57) return false;
         }
     return true;
 }

 var validPositiveMantissa = function(s)
 {
   if(s.length == 1 && s == '-') return false;
   return validPositiveNumber(s);
 }


var validMantissa = function(s)
{
  if(s.length == 1 && s == '-') return true;
  return validPositiveNumber(s) || validNegativeNumber(s);
}

 var validPositiveNumber = function(s)
 {

    var i = 0;
    if(s.length == 0) return false;
      //could have a leading '+'
      if(s.charAt(0) == '+')
      {
      i = 1;
      if(s.length == 1) return false;
    }
     for(i; i < s.length; i++)
         {
             if(s.charCodeAt(i) < 48 || s.charCodeAt(i) > 57) return false;
         }
     return true;
 }

 var validNegativeNumber = function(s)
 {
     var validNumber = false;
     if(s.length > 0)
         {
            if(s.charAt(0) != '-') return false;
         }

     for(var i = 1; i < s.length; i++)
         {
             if(s.charCodeAt(i) < 48 || s.charCodeAt(i) > 57) return false;
             if(s.charCodeAt(i) == '-') return false;
             validNumber = true;
         }
     return validNumber;
 }

var containsOneNumber = function (s)
{
  for(var i = 0; i < s.length; i++)
  {
    if(s.charCodeAt(i) > 47 && s.charCodeAt(i) < 58) return true;
  }
  return false;
}

 var isNumber = function(s) {

     if(s.length === 0) return false;
     // Remove trailing and leading spaces
     s = s.trim();
     if(!containsOneNumber(s)) return false;
     if(s.charAt(0) == '+')
     {
       s = s.substring(1);
       // Check if number in scientific notation
       if(s.includes('e') || s.includes('E')) return isPositiveScientific(s);
       // Check for decimal number
       if(s.includes('.')) return isPositiveDecimal(s);
       // check for number
       return validPositiveNumber(s);
     }
     // Check if number in scientific notation
     if(s.includes('e') || s.includes('E')) return isScientific(s);
     // Check for decimal number
     if(s.includes('.')) return isDecimal(s);
     // check for number
     return validPositiveNumber(s) || validNegativeNumber(s);

 };

var temp = "166e-02767";
var t0 = performance.now();
console.log(isNumber(temp));
var t1 = performance.now();
console.log("It took " + (t1 - t0) + "milliseconds.");
