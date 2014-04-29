App.Controller.Auth = {

  login: function(){

    App.Page.render('auth/login');

    $('#auth-login').submit(function(e){
      e.preventDefault();
      App.Auth.credentials = {
        username: $('#i-username').val(),
        password: $('#i-password').val()
      }
      stash.set('credentials', App.Auth.credentials);
      App.Controller.Settings.index();
    })

  },

  logout: function(){

    App.Auth.credentials = null;
    App.Controller.Auth.login();

  }

}