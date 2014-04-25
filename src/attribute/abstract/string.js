Attribute.Abstract.Controller.LocalPayloads.Generator.String = function(name, label){
  return {
    render: function(){
      return $(document.createElement('div'))
        .addClass('control')
        .html('<label for="attr-'+name+'">'+label+'</label><input type="text" id="attr-'+name+'">')
    },
    get: function(){
      return $('#attr-'+name).val();
    },
    change: function(func){
      $('#attr-'+name).change(func);
    }
  };
}