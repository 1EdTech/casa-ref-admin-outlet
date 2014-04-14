var Engine = {

  ajax: function(queryOptions){
    queryOptions.url = EngineConfig.url + queryOptions.url;
    $.ajax(queryOptions);
  }

}