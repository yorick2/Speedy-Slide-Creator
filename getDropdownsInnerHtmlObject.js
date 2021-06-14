/**
 * @return object elementId:innerHtml
 */
function getDropdownsInnerHtmlObject(){
  var layoutData = getActivePresentationLayoutsObject();
  return  {
    'title-layouts': getTitleDropdownInnerHtmlString(layoutData),
    'body-text-layouts': getMainDropdownInnerHtmlString(layoutData)
  }
}

/**
 * @param object layoutsData
 * @return string inner html
 */
function getMainDropdownInnerHtmlString(layoutsData) {
  var innerHTML = '';
  for (i in layoutsData.displayNames) {
    if (layoutsData.hasBodyTextBooleans[i]) {
      innerHTML += '<option value="'+ i + '">' + layoutsData.displayNames[i] + '</option>';
    } else  {
      innerHTML += '<option value="'+ i + '" disabled>' + layoutsData.displayNames[i] + '</option>';
    }
  }
  return innerHTML;
}

/**
 * @param object layoutsData
 * @return string inner html
 */
function getTitleDropdownInnerHtmlString(layoutsData) {
  var innerHTML = '';
  for (i in layoutsData.displayNames) {
    if (layoutsData.hasTitleBooleans[i]) {
      innerHTML += '<option value="'+ i + '">' + layoutsData.displayNames[i] + '</option>';
    } else  {
      innerHTML += '<option value="'+ i + '" disabled>' + layoutsData.displayNames[i] + '</option>';
    }
  }
  return innerHTML;
}
