App.Controller.LocalPayloads = {

  index: function(){

    Engine.LocalPayloads.all({

      success: function(apps){

        App.Page.render('local_payloads/index', {apps: apps});

        $('a[data-app]').click(function(e){
          e.preventDefault();
          App.Controller.LocalPayloads.show(JSON.parse($(this).attr('data-app')));
        })

        $('#put-payload').submit(function(e){
          e.preventDefault();
          App.Controller.LocalPayloads.store(
            $(this).find('[name="id"]').val(),
            JSON.parse($(this).find('[name="data"]').val())
          );
        })

      }

    })

  },

  show: function(app){

    App.Page.render('local_payloads/show', {app: app});

    $('#put-payload').submit(function(e){
      e.preventDefault();
      App.Controller.LocalPayloads.store(
        app.identity.id,
        JSON.parse($(this).find('[name="data"]').val())
      );
    })

    $('#destroy-payload').click(function(e){
      e.preventDefault();
      App.Controller.LocalPayloads.destroy(app.identity.id)
    })

  },

  store: function(id, data){

    Engine.LocalPayloads.store({
      "id": id,
      "data": data,
      "success": function(data, textStatus, jqXHR){
        App.Controller.LocalPayloads.index();
      },
      "error": function(jqXHR, textStatus, errorThrown){
        console.error(textStatus)
        console.error(errorThrown)
      }
    });

  },

  destroy: function(id){

    Engine.LocalPayloads.destroy({
      "id": id,
      "success": function(data, textStatus, jqXHR){
        App.Controller.LocalPayloads.index();
      },
      "error": function(jqXHR, textStatus, errorThrown){
        console.error(textStatus)
        console.error(errorThrown)
      }
    });

  }

}