App.Controller.LocalPayloads = {

  index: function(options){

    Engine.LocalPayloads.all({

      success: function(apps){

        App.Page.render('local_payloads/index', {apps: apps, options: options});

        App.Controller.LocalPayloads._initDataGenerators();

        $('#local_payloads-list').dataTable();
        $('#myModal').modal('hide');

        $('a[data-app]').click(function(e){
          e.preventDefault();
          App.Controller.LocalPayloads.show(JSON.parse($(this).attr('data-app')));
        })

        $('#put-payload').submit(function(e){
          e.preventDefault();
          $('#myModal').modal('hide');
          $('.modal-backdrop.in').removeClass('in').addClass('out');
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
        App.Controller.LocalPayloads.index({
          message: 'Update has been queued. Your changes will be available shortly. (<a href="#!" data-controller="LocalPayloads">Refresh</a>)',
          messageType: 'success'
        });
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
        App.Controller.LocalPayloads.index({
          message: 'Delete has been queued. Your changes will be available shortly. (<a href="#!" data-controller="LocalPayloads">Refresh</a>)',
          messageType: 'success'
        });
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
            data = {'use':{},'require':{}},
            flush = function(data){
              $definition.find('textarea').val(JSON.stringify(data));
            }

        $('[name="uri"]').change(function(){
          data['uri'] = $(this).val();
          flush(data);
        }).change();

        $('[name="share"]').change(function(){
          data['share'] = $(this).prop('checked');
          flush(data);
        }).change();

        $('[name="propagate"]').change(function(){
          data['propagate'] = $(this).prop('checked');
          flush(data);
        }).change();

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
                        flush(data);
                      })
                      .change()
          }

        })

        $definition.hide();

      }

    })

  }

}