Attribute.Author = {
  Controller: {
    LocalPayloads: {
      Generator: {
        render: function(currentValue){
          return $(document.createElement('div'))
            .addClass('control')
            .html('<label for="attr-author">Author</label><textarea id="attr-author" style="width:95%;height:72px;">'+(currentValue ? JSON.stringify(currentValue) : '')+'</textarea>')
        },
        get: function(){
          try {
            return JSON.parse($('#attr-author').val());
          }catch(e){
            return null;
          }
        },
        change: function(func){
          $('#attr-author').change(func);
        }
      }
    }
  }
};