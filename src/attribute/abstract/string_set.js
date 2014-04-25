Attribute.Abstract.Controller.LocalPayloads.Generator.StringSet = function(name, label){
  return {
    render: function(currentValue){
      var $ele = $(document.createElement('div'))
          .addClass('control')
          .attr('id', 'categories-control')
          .html('<label for="attr-'+name+'">'+label+'</label>'),
        makeInput = function(value){
          return $(document.createElement('input'))
            .attr('type','text')
            .attr('class','attr-'+name)
            .val(value)
            .appendTo($ele)
        }

      if(currentValue)
        $.each(currentValue, function(_, value){
          makeInput(value)
        })

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
      if(func)
        $('#categories-control').delegate('input').change(func)
      else
        $('#categories-control input').change()
    }
  };
}