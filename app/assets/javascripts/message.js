$(function(){ 
  function buildHTML(message){
    if ( message.image ) {
      var html =
        `
          <ul class="main-messages__namebox">
            <li class="main-messages_namebox__name">
              ${message.user_name}
            </li>
            <li class="main-messages_namebox__date">
              ${message.created_at}
            </li>
          </ul>
          <ul class="main-messages__content">
            ${message.content}
          </ul>
          <img src=${message.image} >
        `
      return html;
    } 
    else {
      var html =
        `
          <ul class="main-messages__namebox">
            <li class="main-messages_namebox__name">
              ${message.user_name}
            </li>
            <li class="main-messages_namebox__date">
              ${message.created_at}
            </li>
          </ul>
          <ul class="main-messages__content">
            ${message.content}
          </ul>
        `
      return html;
    };
 }
$('#new_message').on('submit', function(e){
 e.preventDefault();
 var formData = new FormData(this);
 var url = $(this).attr('action')

//  投稿ボタンの連打を可能にして複数回投稿可能にする
 $('.submit-btn').removeAttr('data-disable-with');
 
 $.ajax({
   url: url,
   type: "POST",
   data: formData,
   dataType: 'json',
   processData: false,
   contentType: false
 })
  .done(function(data){
    var html = buildHTML(data);
    $('.main-messages').append(html);
    $('form')[0].reset();
    $('.main-messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
    

  })
})
});