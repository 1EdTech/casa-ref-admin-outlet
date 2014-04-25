Attribute.Abstract.Controller.LocalPayloads.Generator.Boolean = function(name, label){
  return {
    render: function(currentValue){
      return $(document.createElement('div'))
        .addClass('control')
        .html('<label for="attr-'+name+'">'+label+'</label><input type="checkbox" id="attr-'+name+'"'+(currentValue ? ' checked' : '')+'>')
    },
    get: function(){
      return $('#attr-'+name).prop('checked');
    },
    change: function(func){
      $('#attr-'+name).change(func);
    }
  };
}