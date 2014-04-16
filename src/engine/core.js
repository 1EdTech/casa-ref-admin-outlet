var Engine = {

  ajax: function(queryOptions){

    queryOptions.url = Engine.Route.to(queryOptions.url);

    $.ajax(queryOptions);

  },

  Route: {
    to: function(path){
      return EngineConfig.url + path;
    }
  }

}