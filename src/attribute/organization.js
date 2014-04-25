Attribute.Organization = {
  Controller: {
    LocalPayloads: {
      Generator: {
        render: function(currentValue){
          return $(document.createElement('div'))
            .addClass('control')
            .html('<label for="attr-organization">Organization</label><textarea id="attr-organization" style="width:95%;height:72px;">'+(currentValue ? JSON.stringify(currentValue) : '')+'</textarea>')
        },
        get: function(){
          try {
            return JSON.parse($('#attr-organization').val());
          }catch(e){
            return null;
          }
        },
        change: function(func){
          $('#attr-organization').change(func);
        }
      }
    }
  }
};