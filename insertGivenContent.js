/**
 * @param formObject 
 * @return bool
 */
function shouldRunInsertGivenContentBoolean(formObject)
{
  if (!('content-text' in formObject))
  {
    SlidesApp.getUi().alert('Error getting form field');
    return false;
  }
  if(formObject['content-text'].length == 0)
  {
    SlidesApp.getUi().alert('Please add some content text');
    return false;
  }
  return true;
}

/**
* @param string content 
* @return array
*/
function splitContentStringIntoArray(content)
{
  return content.split(/\r?\n\s*\r?\n/);
}
  
// function stripHTML(){
//   var re = /(<([^>]+)>)/gi;
//   for (i=0; i < arguments.length; i++)
//   arguments[i].value=arguments[i].value.replace(re, "")
// }

/**
 * @param object slection
 */
function getTemplateObject(selection)
{
  var layouts = SlidesApp.getActivePresentation().getLayouts();
  for(var i=0; i<layouts.length ;i++) {
      if( layouts[i].getLayoutName() == selection){
          return layouts[i];
      }
  }
}

/**
 * 
 * @param object template layout template
 * @param string text
 */
function createMainSlide(template,text) {
  var slide = SlidesApp.getActivePresentation()
    .appendSlide(template);
  slide.getPlaceholder(SlidesApp.PlaceholderType.BODY)
    .asShape()
    .getText()
    .setText(text);
}

/**
 * @param string textString
 * @return object
 */
function getTitleContentObject(textString){
  var indexOfBodyText = textString.search('\r?\n[^#]'); //first line notstarting with #
  var object =  {
    'title': textString.substring(1)
              .slice(0,indexOfBodyText)
              .replace(/\r?\n[#]/,'\r\n'),
    'body-text':  textString.slice(indexOfBodyText + 1)
  };
  return object;
}

/**
 * 
 * @param object template layout template
 * @param object contrentObject
 */
function createTitleSlide(template,contentObject) {
  var slide = SlidesApp.getActivePresentation()
    .appendSlide(template);
  slide.getPlaceholder(SlidesApp.PlaceholderType.TITLE)
    .asShape()
    .getText()
    .setText(contentObject['title']);
  if(contentObject['body-text'].length === 0){
    return;
  }
  if(!hasTemplateGotBodyTextPLaceHolder(slide)){
    return;
  }
  slide.getPlaceholder(SlidesApp.PlaceholderType.BODY)
  .asShape()
  .getText()
  .setText(contentObject['body-text']);
}

/**
 * @param object layout
 * @return bool
 */
function hasTemplateGotBodyTextPLaceHolder(layout)
{
    if(layout.getPlaceholder(SlidesApp.PlaceholderType.BODY) == null){
      return false;
    }
    return true;
}

/**
 * @param object layout
 * @return bool
 */
function hasTemplateGotTitlePLaceHolder(layout)
{
    if(layout.getPlaceholder(SlidesApp.PlaceholderType.TITLE) == null){
      return false;
    }
    return true;
}

function showSuccessMessage() {
  SlidesApp.getUi().alert('Slides added to the end of presentation successfully');
}

/**
 * @param object formObject
 */
function insertGivenContent(formObject)
{
  if(!shouldRunInsertGivenContentBoolean(formObject))
  {
    return false;
  }
  var layoutTitleTemplate = getTemplateObject(formObject['title-layout-template']);
  var layoutMainTemplate = getTemplateObject(formObject['layout-template']);
  if(!hasTemplateGotTitlePLaceHolder(layoutTitleTemplate)){
    SlidesApp.getUi()
      .alert('Title template dose not have a "Title text placeholder". Please try again.');
    return;
  }
  if(!hasTemplateGotBodyTextPLaceHolder(layoutMainTemplate)){
    SlidesApp.getUi()
      .alert('Main template dose not have a "Body text placeholder". Please try again.');
    return;
  }
  var contentArray = splitContentStringIntoArray(formObject['content-text']);
  for(var i=0; i<contentArray.length ;i++){
    if(contentArray[i][0] === '#'){
      var contentObject = getTitleContentObject(contentArray[i]);
      createTitleSlide(layoutTitleTemplate, contentObject);
      continue;
    }
    createMainSlide(layoutMainTemplate,contentArray[i]);  
  }
  showSuccessMessage();
}