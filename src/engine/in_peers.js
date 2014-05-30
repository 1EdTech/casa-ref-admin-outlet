Engine.InPeers = {
  all: function(options){
    Engine.ajax({
      type: 'GET',
      url: '/admin/in/peers',
      success: function(data, textStatus, jqXHR){
        if(options.success) options.success(data, textStatus, jqXHR);
      },
      error: function(jqXHR, textStatus, errorThrown){
        if(options.error) options.error(jqXHR, textStatus, errorThrown);
      }
    })
  },
  store: function(options){
    console.log(options)
    Engine.ajax({
      type: 'PUT',
      url: '/admin/in/peers/'+options.name,
      contentType: 'application/json',
      data:  JSON.stringify(options.data),
      success: function(data, textStatus, jqXHR){
        if(options.success) options.success(data, textStatus, jqXHR);
      },
      error: function(jqXHR, textStatus, errorThrown){
        if(options.error) options.error(jqXHR, textStatus, errorThrown);
      }
    })
  },
  destroy: function(options){
    Engine.ajax({
      type: 'DELETE',
      url: '/admin/in/peers/'+options.name,
      success: function(data, textStatus, jqXHR){
        if(options.success) options.success(data, textStatus, jqXHR);
      },
      error: function(jqXHR, textStatus, errorThrown){
        if(options.error) options.error(jqXHR, textStatus, errorThrown);
      }
    })
  }
}