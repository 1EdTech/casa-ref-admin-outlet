Engine.LocalPayloads = {
  all: function(options){
    Engine.Search.elasticsearch({
      request: { "query": { "match_phrase": { "identity.originator_id": EngineConfig.id } } },
      success: function(data, textStatus, jqXHR){
        if(options.success) options.success(data);
      },
      error: function(jqXHR, textStatus, errorThrown){
        if(options.error) options.error(errorThrown);
      }
    })
  },
  store: function(options){
    Engine.ajax({
      type: 'PUT',
      url: '/admin/local/payloads/'+EngineConfig.id+'/'+options.id,
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
      url: '/admin/local/payloads/'+EngineConfig.id+'/'+options.id,
      success: function(data, textStatus, jqXHR){
        if(options.success) options.success(data, textStatus, jqXHR);
      },
      error: function(jqXHR, textStatus, errorThrown){
        if(options.error) options.error(jqXHR, textStatus, errorThrown);
      }
    })
  }
}