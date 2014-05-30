App.Controller.InPeers = {

  index: function(){

    Engine.InPeers.all({

      success: function(peers){

        App.Page.render('in_peers/index', {peers: peers});

        $('a[data-peer]').click(function(e){
          e.preventDefault();
          App.Controller.InPeers.show(JSON.parse($(this).attr('data-peer')));
        })

        $('#peers-list').dataTable();

        $('#put-peer').submit(function(e){
          e.preventDefault();
          $('#myModal').modal('hide');
          $('.modal-backdrop.in').remove();
          $('.modal-open').removeClass('modal-open');
          var data = {
            name: $(this).find('[name="name"]').val(),
            uri: $(this).find('[name="uri"]').val(),
            secret: $(this).find('[name="secret"]').val()
          };
          App.Controller.InPeers.store(data.name, data);
        })

      }

    })

  },

  show: function(peer){

    App.Page.render('in_peers/show', {peer: peer});

    $('#put-peer').submit(function(e){
      e.preventDefault();
      var data = {
        name: $(this).find('[name="name"]').val(),
        uri: $(this).find('[name="uri"]').val(),
        secret: $(this).find('[name="secret"]').val()
      };
      if(!data.secret.length)
        data.secret = null;
      App.Controller.InPeers.store(peer.name, data);
    })

    $('#destroy-peer').click(function(e){
      e.preventDefault();
      App.Controller.InPeers.destroy(peer.name)
    })

  },

  store: function(name, data){

    Engine.InPeers.store({
      "name": name,
      "data": data,
      "success": function(data, textStatus, jqXHR){
        App.Controller.InPeers.index();
      },
      "error": function(jqXHR, textStatus, errorThrown){
        console.error(textStatus)
        console.error(errorThrown)
      }
    });

  },

  destroy: function(name){

    Engine.InPeers.destroy({
      "name": name,
      "success": function(data, textStatus, jqXHR){
        App.Controller.InPeers.index();
      },
      "error": function(jqXHR, textStatus, errorThrown){
        switch(errorThrown){
          case 'Not Found':
            App.Controller.InPeers.index();
            break;
          default:
            console.error(textStatus)
            console.error(errorThrown)
        }
      }
    });

  }

}