/**
 * @param string html filename (not including the .html)
 * @return string file content
 */
function include(File) {
  return HtmlService.createHtmlOutputFromFile(File).getContent();
};

/**
 * @param string messaqe
 */
function showAlertMessage(message){
    SlidesApp.getUi()
      .alert(message);
}

function onOpen(event)
{  
  var ui = SlidesApp.getUi();
  ui.createAddonMenu()
      .addItem('Create Slides', 'showInsertSidebar')
      .addItem('Instructions', 'showInstructionsSidebar')
      .addToUi();
}

function onInstall(event) {
  onOpen(event);
}

function showInsertSidebar()
{
  var html = HtmlService.createTemplateFromFile('insertSidebar')
      .evaluate()
      .setTitle('Speedy Slide Creator: Create slides');
      // .setWidth(800);
  var ui = SlidesApp.getUi();
  ui.showSidebar(html);
}

function showInstructionsSidebar(){
   var html = HtmlService.createTemplateFromFile('instructionsSidebar')
      .evaluate()
      .setTitle('Speedy Slide Creator: Instructions');
      // .setWidth(800);
  var ui = SlidesApp.getUi();
  ui.showSidebar(html);
}