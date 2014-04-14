App.Controller.Settings = {
  index: function(){
    Engine.Settings.all({
      success: function(settings){
        App.Page.render('settings/index', {settings: settings});
      }
    })
  }
}