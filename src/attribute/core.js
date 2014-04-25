Attribute = {
  Abstract: {
    Controller: {
      LocalPayloads: {
        Generator: {
          String: function(name){
            return {
              render: function(){
                return $(document.createElement('div'))
                  .addClass('control')
                  .html('<label for="attr-'+name+'">Title</label><input type="text" id="attr-'+name+'">')
              },
              get: function(){
                return $('#attr-'+name).val();
              },
              change: function(func){
                $('#attr-'+name).change(func);
              }
            };
          },
          Text: function(name){
            return {
              render: function(){
                return $(document.createElement('div'))
                  .addClass('control')
                  .html('<label for="attr-'+name+'">Description</label><textarea id="attr-'+name+'" style="width:95%;height:72px;"></textarea>')
              },
              get: function(){
                return $('#attr-'+name).val();
              },
              change: function(func){
                $('#attr-'+name).change(func);
              }
            };
          },
          StringSet: function(name){
            return {
              render: function(){
                var $ele = $(document.createElement('div'))
                    .addClass('control')
                    .attr('id', 'categories-control')
                    .html('<label for="attr-'+name+'">Categories</label>'),
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
        }
      }
    }
  }
};