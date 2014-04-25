Attribute.Abstract.Controller.LocalPayloads.Generator.StringSet = function(name, label){
  return {
    render: function(){
      var $ele = $(document.createElement('div'))
          .addClass('control')
          .attr('id', 'categories-control')
          .html('<label for="attr-'+name+'">'+label+'</label>'),
        makeInput = function(){
          return $(document.createElement('input'))
            .attr('type','text')
            .attr('class','attr-'+name).appendTo($ele)
        }

      makeInput();

      $ele.delegate('input').change(function(){
        $ele.find('input:not(:last-child)').each(function(){
          if(!$(this).val().length)
            $(this).remove();
        })
        if($ele.find('input').last().val().length)
          makeInput().focus();
      });

      return $ele;
    },
    get: function(){
      return $('.attr-'+name).map(function(){
        return $(this).val().length ? $(this).val() : null;
      }).get();
    },
    change: function(func){
      $('#categories-control').delegate('input').change(func)
    }
  };
}