var App = {
  start: function(){
    $('[data-controller]').each(function(){
      var $this = $(this),
          name = $(this).attr('data-controller');
      $this.click(function(e){
        e.preventDefault();
        App.Controller[name].index();
      })
    })
  },
  Controller: {

  },
  Page: {
    render: function(name, data){
      $('main').html(App.View.make(name, data));
    }
  },
  View: {
    make: function(name, data){
      return new EJS({url: 'view/'+name+'.ejs'}).render(data ? data : {})
    }
  }
}