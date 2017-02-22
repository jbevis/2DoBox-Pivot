$(function () {
  for (var i = 0; i < localStorage.length; i++){
    var $storedtoDos = getStoredToDos(localStorage.key(i));
    prependToDoBox($storedtoDos)
  }
})


function getStoredToDos (id) {
  return JSON.parse(localStorage.getItem(id));
}


$('#save-button').on('click', function() {
  var $title = $('#title-input').val();
  var $body = $('#body-input').val();
  var $uniqId = Date.now()
  var $newtoDo = {id: $uniqId, title: $title, body: $body, quality: 'swill'};
  storeToDo($uniqId, $newtoDo);
  prependToDoBox($newtoDo);
  resetInputs();
})


function resetInputs(){
  $('#title-input, #body-input').val("");
  $('#save-button').prop('disabled', true);
}


function storeToDo (key, toDo) {
  localStorage.setItem(key, JSON.stringify(toDo));
}


$('#title-input, #body-input').on('keyup', function(){
  var titleInput = $('#title-input').val();
  var bodyInput = $('#body-input').val();
  var $saveButton = $('#save-button');
  if (titleInput === "" && bodyInput === "") {
    $saveButton.prop('disabled', true);
  }else {
    $saveButton.prop('disabled', false);
  }
})


function prependToDoBox(toDoObj) {
  $('.to-do-list').prepend(
    `<article class="to-do-card" id="${toDoObj.id}">
      <button class="delete-button"></button>
      <section class="search-target">
        <h2 class="to-do-title" contenteditable>${toDoObj.title}</h2>
        <p class="to-do-body" contenteditable>${toDoObj.body}</p>
      </section>
      <section class="quality">
        <button class="upvote-button"></button>
        <button class="downvote-button"></button>
        <h3>quality: <span class="current-quality">${toDoObj.quality}</span></h3>
      </section>
    </article>
    `
  )
}

$('.to-do-list').on('click', '.delete-button', function() {
  var selectId = $(this).parent().attr('id')
  localStorage.removeItem(selectId)
  $(this).parent().remove()
})


$('.to-do-list').on('click','.upvote-button' , function() {
  var $currentQuality = $(this).siblings().find('.current-quality');
  switch ($currentQuality.text()) {
    case "swill":
      $currentQuality.text("plausible")
      break;
    case "plausible":
      $currentQuality.text("genius")
      break;
  };
  var newQuality = $currentQuality.text();
  updateQuality (this, newQuality);
});


$('.to-do-list').on('click','.downvote-button', function() {
  var $currentQuality = $(this).siblings().find('.current-quality');
  switch ($currentQuality.text()) {
    case "genius":
      $currentQuality.text("plausible")
      break;
    case "plausible":
      $currentQuality.text("swill")
      break;
  };
  var newQuality = $currentQuality.text();
  updateQuality (this, newQuality);
});


function updateQuality (element, updatedQuality) {
  var key = $(element).closest('.to-do-card').attr('id');
  var toDoBox = JSON.parse(localStorage.getItem(key));
  toDoBox.quality = updatedQuality;
  localStorage.setItem(key, JSON.stringify(toDoBox))
};


$('.to-do-list').on('focus', '.to-do-title, .to-do-body', function() {
  var key = $(this).closest('.to-do-card').attr('id');
  console.log($(this));
  var toDoBox = JSON.parse(localStorage.getItem(key));
  $(this).on('keydown', function(event) {
    if(event.keyCode === 13){
      event.preventDefault();
      $(this).blur();
      return false;
    };
  });
  cardBlur(toDoBox);
})

function cardBlur () {
  $('.to-do-list').on('blur', '.to-do-title, .to-do-body', function() {
    var key = $(this).closest('.to-do-card').attr('id');
    var toDoBox = JSON.parse(localStorage.getItem(key));
    toDoBox.title = $(this).text();
    toDoBox.body = $(this).text();
    localStorage.setItem(key, JSON.stringify(toDoBox));
  });
};


$('#search-input').on('keyup',function (){
  var searchValue = $(this).val().toLowerCase();
  $('.to-do-list').each(function(index, toDo){
    var text = $(this).text().toLowerCase();
    var isAMatch = text.indexOf(searchValue) !== -1;
    $(toDo).toggle(isAMatch);
  });
});
