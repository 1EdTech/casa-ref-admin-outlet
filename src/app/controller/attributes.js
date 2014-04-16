App.Controller.Attributes = {

  index: function(){

    Engine.Attributes.all({

      success: function(attributes){

        App.Page.render('attributes/index', {attributes: attributes});

        $('a[data-attribute]').click(function(e){
          e.preventDefault();
          App.Controller.Attributes.show(JSON.parse($(this).attr('data-attribute')));
        })

      }

    })

  },

  show: function(attribute){

    App.Page.render('attributes/show', {attribute: attribute});

    $('#put-attribute').submit(function(e){
      e.preventDefault();
      App.Controller.Attributes.store(
        attribute.name,
        JSON.parse($(this).find('[name="data"]').val())
      );
    })

    $('#destroy-attribute').click(function(e){
      e.preventDefault();
      App.Controller.Attributes.destroy(attribute.name)
    })

  },

  store: function(name, data){

    Engine.Attributes.store({
      "name": name,
      "data": data,
      "success": function(data, textStatus, jqXHR){
        App.Controller.Attributes.index();
      },
      "error": function(jqXHR, textStatus, errorThrown){
        console.error(textStatus)
        console.error(errorThrown)
      }
    });

  },

  destroy: function(name){

    Engine.Attributes.destroy({
      "name": name,
      "success": function(data, textStatus, jqXHR){
        App.Controller.Attributes.index();
      },
      "error": function(jqXHR, textStatus, errorThrown){
        switch(errorThrown){
          case 'Not Found':
            App.Controller.Attributes.index();
            break;
          default:
            console.error(textStatus)
            console.error(errorThrown)
        }
      }
    });

  }

}