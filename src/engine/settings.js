Engine.Settings = {
  all: function(options){
    Engine.ajax({
      type: 'GET',
      url: '/admin/settings',
      success: function(data, textStatus, jqXHR){
        if(options.success) options.success(data);
      },
      error: function(jqXHR, textStatus, errorThrown){
        if(options.error) options.error(errorThrown);
      }
    })
  }
}