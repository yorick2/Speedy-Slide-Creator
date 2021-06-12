function onOpen(event)
{  
  var ui = SlidesApp.getUi();
  ui.createMenu('Lyrics->slides')
      .addItem('import lyrics', 'showInsertSidebar')
      .addToUi();
}

function onInstall(event) {
  onOpen(event);
}

function showInsertSidebar()
{
  var html = HtmlService.createTemplateFromFile('showInsertSidebar')
      .evaluate()
      .setTitle('Apeand lyrics onto the end of a slideshow')
      .setWidth(800);
  var ui = SlidesApp.getUi();
  ui.showSidebar(html);
}

function shouldRunInsertLyricsRequirements(formObject)
{
  var ui = SlidesApp.getUi();
  if (!('lyrics-text' in formObject))
  {
    ui.alert('Error getting form field');
    return false;
  }
  if(formObject['lyrics-text'].length == 0)
  {
    ui.alert('Please add some lyrics text');
    return false;
  }
  return true;
}

/**
* @param string lyrics 
* @return array
*/
function splitLyrics(lyrics)
{
  return lyrics.split(/\r?\n\s*\r?\n/);
}

function getLayoutTemplate(selection)
{
  var layouts = SlidesApp.getActivePresentation().getLayouts();
  for(var i=0; i<layouts.length ;i++) {
      if( layouts[i].getLayoutName() == selection){
          return layouts[i];
      }
  }
}

/**
 * @param string text
 */
function createSlide(template,text) {
  var slide = SlidesApp.getActivePresentation()
    .appendSlide(template);
  slide.getPlaceholder(SlidesApp.PlaceholderType.BODY)
    .asShape()
    .getText()
    .setText(text);
}

/**
 * @return array
 */
function getActivePresentationLayoutDisplayNames()
{
  var layoutsArray = [];
  var presentation = SlidesApp.getActivePresentation();
  var layouts = Slides.Presentations.get(presentation.getId()).layouts;
  for (i in layouts) {
      layoutsArray[layouts[i].layoutProperties.name] = layouts[i].layoutProperties.displayName;
  }
  return layoutsArray;
}

/**
 * @return array 
 */
function getActivePresentationLayoutsHaveBodyTextPlaceholder()
{
  var output = [];
  var layouts = SlidesApp.getActivePresentation().getLayouts();
  for(var i=0; i<layouts.length ;i++){
    output[layouts[i].getLayoutName()] = hasTemplateGotBodyTextPLaceHolder(layouts[i])
  }
  return output;
}

function getActivePresentationLayoutsData()
{
  return {
    displayNames: getActivePresentationLayoutDisplayNames(),
    haveBodyTextBooleans: getActivePresentationLayoutsHaveBodyTextPlaceholder()
  }
}

/**
 * @return bool
 */
function hasTemplateGotBodyTextPLaceHolder(layout)
{
    if(layout.getPlaceholder(SlidesApp.PlaceholderType.BODY) == null){
      return false;
    }
    return true;
}

function insertLyrics(formObject)
{
  var ui = SlidesApp.getUi();
  if(!shouldRunInsertLyricsRequirements(formObject))
  {
    return false;
  }
  var layoutTemplate = getLayoutTemplate(formObject['layout-template']);
  if(!hasTemplateGotBodyTextPLaceHolder(layoutTemplate)){
    ui.alert('Template dose not have a "Body text placeholder". Please try again.');
    return;
  }
  var lyricsArray = splitLyrics(formObject['lyrics-text']);
  for(var i=0; i<lyricsArray.length ;i++){
    createSlide(layoutTemplate,lyricsArray[i]);  
  }
}