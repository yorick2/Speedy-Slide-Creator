function onOpen(event)
{  
  var ui = SlidesApp.getUi();
  ui.createAddonMenu()
      .addItem('Create Slides', 'showInsertSidebar')
      .addToUi();
}

function onInstall(event) {
  onOpen(event);
}

function showInsertSidebar()
{
  var html = HtmlService.createTemplateFromFile('showInsertSidebar')
      .evaluate()
      .setTitle('Apend content text onto the end of a slideshow')
      .setWidth(800);
  var ui = SlidesApp.getUi();
  ui.showSidebar(html);
}
