$(function(){ 

  function buildHTML(message){
    if ( message.image ) {
      var html =
        `
          <ul class="main-messages__namebox" data-message-id=${message.id}>
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
          <ul class="main-messages__namebox" data-message-id=${message.id}>
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
      $('.main-messages').animate({ scrollTop: $('.main-messages')[0].scrollHeight});
      

    })
  })

  var reloadMessages = function() {
    var last_message_id = $('.main-messages__content:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0){
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.main-messages').append(insertHTML);
        $('.main-messages').animate({ scrollTop: $('.main-messages')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };

  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});