Attribute.Abstract.Controller.LocalPayloads.Generator.Text = function(name, label){
  return {
    render: function(currentValue){
      return $(document.createElement('div'))
        .addClass('control')
        .html('<label for="attr-'+name+'">'+label+'</label><textarea id="attr-'+name+'" style="width:95%;height:72px;">'+(currentValue ? currentValue : '')+'</textarea>')
    },
    get: function(){
      return $('#attr-'+name).val();
    },
    change: function(func){
      $('#attr-'+name).change(func);
    }
  };
}