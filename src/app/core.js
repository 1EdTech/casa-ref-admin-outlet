var App = {

  start: function(){

    App.Auth.init();

    $('[data-controller]').each(function(){
      var $this = $(this),
          controller = $(this).attr('data-controller'),
          action = $(this).attr('data-action') ? $(this).attr('data-action') : 'index';
      $this.click(function(e){
        e.preventDefault();
        console.log(controller, action);
        App.Controller[controller][action]();
      })
    });

    $('.navbar-collapse a').click(function(){
      $(this).closest('.navbar').find('.navbar-toggle').click();
    });

  },

  Auth: {

    credentials: null,

    init: function(){
      App.Auth.credentials = stash.get('credentials');
      if(!App.Auth.credentials){
        $('body').addClass('not-authenticated');
        App.Controller.Auth.login();
      }else{
        $('body').removeClass('not-authenticated');
      }
    },

    login: function(credentials, options){
      if(credentials.username && credentials.password){
        Engine.Settings.all({
          username: credentials.username,
          password: credentials.password,
          success: function(settings){
            stash.set('credentials', credentials)
            App.Auth.init();
            if(options.success)
              options.success();
          },
          error: options.error
        })
      }else if(options.error){
        options.error();
      }
    }
  },

  Controller: {

  },

  Page: {

    render: function(name, data){
      $('main').html(App.View.make(name, data));
    }

  },

  View: {

    make: function(name, data){
      return new EJS({url: 'view/'+name+'.ejs'}).render(data ? data : {})
    }

  }

}