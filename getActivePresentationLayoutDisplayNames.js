/**`
 * @return object
 */
function getActivePresentationLayoutDisplayNames()
{
  var output = {};  
  var presentationID = SlidesApp.getActivePresentation().getId();
  var layouts = Slides.Presentations.get(presentationID).layouts;
  for (i in layouts) {
      output[layouts[i].layoutProperties.name] = layouts[i].layoutProperties.displayName;
  }
  return output;
}

/**
 * @return bool
 */
function hasTemplateGotTitle(layout)
{
    if(layout.getPlaceholder(SlidesApp.PlaceholderType.TITLE) == null){
      return false;
    }
    return true;
}

/**
 * @return object 
 */
function getActivePresentationLayoutsHasTitle()
{
  var output = {};
  var layouts = SlidesApp.getActivePresentation().getLayouts();
  for(var i=0; i<layouts.length ;i++){
    output[layouts[i].getLayoutName()] = hasTemplateGotTitle(layouts[i])
  }
  return output;
}

/**
 * @return bool
 */
function hasTemplateGotBodyText(layout)
{
  console.log();
    if(layout.getPlaceholder(SlidesApp.PlaceholderType.BODY) == null){
      return false;
    }
    return true;
}

/**
 * @return object 
 */
function getActivePresentationLayoutsHasBodyText()
{
  var output = {};
  var layouts = SlidesApp.getActivePresentation().getLayouts();
  for(var i=0; i<layouts.length ;i++){
    output[layouts[i].getLayoutName()] = hasTemplateGotBodyText(layouts[i])
  }
  return output;
}

function getActivePresentationLayoutsData()
{
  return {
    displayNames: getActivePresentationLayoutDisplayNames(),
    hasTitleBooleans: getActivePresentationLayoutsHasTitle(),
    hasBodyTextBooleans: getActivePresentationLayoutsHasBodyText()
  }
}
