/**
 * @param string selection
 */
function getLayoutObjectByName(selection)
{
  var layouts = SlidesApp.getActivePresentation().getLayouts();
  for(var i=0; i<layouts.length ;i++) {
      if( layouts[i].getLayoutName() == selection){
          return layouts[i];
      }
  }
}

/**
 * @param object formObject
 * @return object
 */
function getTemplatesObject(formObject) {
  return {
    'title': getLayoutObjectByName(formObject['title-layout-template']),
    'body': getLayoutObjectByName(formObject['body-layout-template']),
    'mixed': getLayoutObjectByName(formObject['mixed-layout-template']),
  }
}