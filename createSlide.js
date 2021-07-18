/**
 * 
 * @param object slide
 * @param string text
 */
function addTitleToSlide(slide,text) {
  slide.getPlaceholder(SlidesApp.PlaceholderType.TITLE)
    .asShape()
    .getText()
    .setText(text);
}

/**
 * 
 * @param object slide
 * @param string text
 */
function addBodyToSlide(slide,text) {
  slide.getPlaceholder(SlidesApp.PlaceholderType.BODY)
  .asShape()
  .getText()
  .setText(text);
}

/**
 * 
 * @param object template layout template
 * @param object contentObject
 */
function createTitleSlide(templatesLayouts,contentObject) {
  var slide = SlidesApp.getActivePresentation()
    .appendSlide(templatesLayouts['title']);
  addTitleToSlide(slide, contentObject['title']);
}

/**
 * 
 * @param object template layout template
 * @param object contentObject
 */
function createBodySlide(templatesLayouts,contentObject) {
  var slide = SlidesApp.getActivePresentation()
    .appendSlide(templatesLayouts['body']);
  addBodyToSlide(slide, contentObject['body']);
}

/**
 * 
 * @param object template layout template
 * @param object contentObject
 */
function createMixedSlide(templatesLayouts,contentObject) {
  var slide = SlidesApp.getActivePresentation()
    .appendSlide(templatesLayouts['mixed']);
  addTitleToSlide(slide, contentObject['title']);
  addBodyToSlide(slide, contentObject['body']);
}

/**
 * 
 * @param object contrentObject
 */
function createSlide(templatesLayouts,contentObject) {
  if(contentObject['title'].length == 0 && contentObject['body'].length == 0) {
    return;
  }
  if(contentObject['title'].length == 0) {
    createBodySlide(templatesLayouts,contentObject);
    return;
  }
  if(contentObject['body'].length == 0) {
    createTitleSlide(templatesLayouts, contentObject);
    return;
  }
  createMixedSlide(templatesLayouts,contentObject);  
}
