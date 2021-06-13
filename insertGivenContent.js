/**
 * @param formObject 
 * @return bool
 */
function shouldRunInsertGivenContent(formObject)
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
function splitContent(content)
{
  return content.split(/\r?\n\s*\r?\n/);
}
  
// function stripHTML(){
//   var re = /(<([^>]+)>)/gi;
//   for (i=0; i < arguments.length; i++)
//   arguments[i].value=arguments[i].value.replace(re, "")
// }

/**
 * @param string slection
 */
function getTemplate(selection)
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
 * 
 * @param object template layout template
 * @param string text
 */
function createTitleSlide(template,text) {
  var slide = SlidesApp.getActivePresentation()
    .appendSlide(template);
  slide.getPlaceholder(SlidesApp.PlaceholderType.TITLE)
    .asShape()
    .getText()
    .setText(text);
}

// /**
//  * @return array 
//  */
// function getActivePresentationLayoutsHaveBodyTextPlaceholder()
// {
//   var output = [];
//   var layouts = SlidesApp.getActivePresentation().getLayouts();
//   for(var i=0; i<layouts.length ;i++){
//     output[layouts[i].getLayoutName()] = hasTemplateGotBodyTextPLaceHolder(layouts[i])
//   }
//   return output;
// }

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

/**
 * @param object formObject
 */
function insertGivenContent(formObject)
{
  if(!shouldRunInsertGivenContent(formObject))
  {
    return false;
  }
  var layoutTitleTemplate = getTemplate(formObject['title-layout-template']);
  var layoutMainTemplate = getTemplate(formObject['layout-template']);
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
  var contentArray = splitContent(formObject['content-text']);
  for(var i=0; i<contentArray.length ;i++){
    if(contentArray[i][0] === '#'){
      createTitleSlide(layoutTitleTemplate, contentArray[i].substring(1));
      continue;
    }
    createMainSlide(layoutMainTemplate,contentArray[i]);  
  }
}