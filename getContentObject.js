/**
 * @param string textString
 * @return bool
 */
function hasTitle(textString){
  return textString.startsWith('#');
}

/**
 * @param string textString
 * @return number
 */
function getBodyTextPosition(textString){
  return textString.search(/\r?\n[^#][\w\W]/);
}

/**
 * @param string textString
 * @return object
 */
function getContentObject(textString){
  if(!hasTitle(textString)){
      return  {
        'title': '',
        'body':  textString
      };
  }
  var indexOfBodyText = getBodyTextPosition(textString);
  if(indexOfBodyText === -1){
    return {
      'title': textString
        .slice(1)
        .replace(/\r?\n[#]/,'\r\n'),
      'body': ''
    }
  }else{
    return {
      'title': textString.slice(1,indexOfBodyText)
        .replace(/\r?\n[#]/,'\r\n'),
      'body': textString.slice(indexOfBodyText + 1)
    }
  }
}