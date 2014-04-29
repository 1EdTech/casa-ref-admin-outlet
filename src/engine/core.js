var Engine = {

  ajax: function(queryOptions){

    queryOptions.url = Engine.Route.to(queryOptions.url);

    if(!queryOptions.username && App.Auth.credentials)
      queryOptions.username = App.Auth.credentials.username;

    if(!queryOptions.password && App.Auth.credentials)
      queryOptions.password = App.Auth.credentials.password;

    queryOptions.xhrFields = {
      withCredentials: true
    }

    $.ajax(queryOptions);

  },

  Route: {
    to: function(path){
      return EngineConfig.url + path;
    }
  }

}