/**
 * @param object layout
 * @return bool
 */
function hasTemplateGotBodyTextPlaceHolder(layout)
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
function hasTemplateGotTitlePlaceHolder(layout)
{
    if(layout.getPlaceholder(SlidesApp.PlaceholderType.TITLE) == null){
      return false;
    }
    return true;
}