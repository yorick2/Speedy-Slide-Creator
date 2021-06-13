

function getMainDropdownInnerHtml(layoutsData) {
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

function getTitleDropdownInnerHtml(layoutsData) {
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
