App.Controller.LocalPayloads = {

  index: function(){

    Engine.LocalPayloads.all({

      success: function(apps){

        App.Page.render('local_payloads/index', {apps: apps});

        App.Controller.LocalPayloads._initDataGenerators();

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

    App.Controller.LocalPayloads._initDataGenerators(app);

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

  },

  _initDataGenerators: function(app){

    Engine.Attributes.all({

      success: function(attributes){

        var $generators = $('#data-generators'),
            $definition = $('#data-definition'),
            data = {'use':{},'require':{}}

        $('[name="uri"]').change(function(){data['uri'] = $(this).val()}).change();
        $('[name="share"]').change(function(){data['share'] = $(this).prop('checked')}).change();
        $('[name="propagate"]').change(function(){data['propagate'] = $(this).prop('checked')}).change();

        $.each(attributes, function(_, attribute){
          var attributeName = attribute.name.charAt(0).toUpperCase() + attribute.name.slice(1),
              controller = null,
              attributeValue = null;

          try {
            controller = Attribute[attributeName].Controller.LocalPayloads.Generator
          }catch(e){}

          try {
            attributeValue = app.attributes[attribute.section][attribute.name]
          }catch(e){}

          if(controller){
            controller.render(attributeValue)
                      .appendTo($generators)
                      .change(function(){
                        data[attribute.section][attribute.name] = controller.get();
                        $definition.find('textarea').val(JSON.stringify(data));
                      })
                      .change()
          }

        })

        $definition.hide();

      }

    })

  }

}