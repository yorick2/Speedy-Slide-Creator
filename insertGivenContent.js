/**
 * @param object formObject 
 * @param object templatesLayouts
 * @return bool
 */
function shouldRunInsertGivenContentBoolean(formObject,templatesLayouts)
{
  if (!isContentTextGiven(formObject)) {
    return false;
  }
  if(!templatesHaveRquiredPlaceholders(templatesLayouts)){
    return false;
  }
  return true;
}

/**
 * @param object formObject 
 * @return bool
 */
function isContentTextGiven(formObject)
{
  if (!('content-text' in formObject))
  {
    showAlertMessage('Error getting form field');
    return false;
  }
  if(formObject['content-text'].length == 0)
  {
    showAlertMessage('Please add some content text');
    return false;
  }
  return true;
}

/**
 * @param object templates object 
 */
function templatesHaveRquiredPlaceholders(templatesLayouts)
{
  if(!hasTemplateGotTitlePlaceHolder(templatesLayouts['title'])){
    showAlertMessage('Title template dose not have a "Title text placeholder". Please try again.');
    return false;
  }
  if(!hasTemplateGotBodyTextPlaceHolder(templatesLayouts['body'])){
    showAlertMessage('Body template dose not have a "Body text placeholder". Please try again.');
    return false;
  }
  if(!hasTemplateGotTitlePlaceHolder(templatesLayouts['mixed'])){
    showAlertMessage('Mixed template dose not have a "Title text placeholder". Please try again.');
    return false;
  }
  if(!hasTemplateGotBodyTextPlaceHolder(templatesLayouts['mixed'])){
    showAlertMessage('Mixed template dose not have a "Body text placeholder". Please try again.');
    return false;
  }
  return true;
}

/**
* @param string content 
* @return array
*/
function splitContentStringIntoParagraphArray(content)
{
  return content.split(/\r?\n\s*\r?\n/);
}
  
// function stripHTML(){
//   var re = /(<([^>]+)>)/gi;
//   for (i=0; i < arguments.length; i++)
//   arguments[i].value=arguments[i].value.replace(re, "")
// }

function showSuccessMessage() {
  showAlertMessage('Slides added to the end of presentation successfully');
}

/**
 * @param object formObject
 */
function insertGivenContent(formObject)
{
  var templateLayouts = getTemplatesObject(formObject);
  if(!shouldRunInsertGivenContentBoolean(formObject,templateLayouts)){
    return false;
  }
  var contentArray = splitContentStringIntoParagraphArray(formObject['content-text']);
  for(var i=0; i<contentArray.length ;i++){
    createSlide(templateLayouts,getContentObject(contentArray[i]));
  }
  showSuccessMessage();
}