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
  var $quality = 'swill';
  var $newtoDo = new toDoObject ($uniqId, $title, $body, $quality);
  var key = $newtoDo.id;
  localStorage.setItem(key, JSON.stringify($newtoDo));
  prependToDoBox($newtoDo);
  resetInputs();
})

function toDoObject (id, title, body, quality){
  this.id = id;
  this.title = title;
  this.body = body;
  this.quality = quality;
}

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

$('.to-do-list').on('click', '.delete-button', (function() {
  var selectId = $(this).parents('.to-do-card').attr('id')
  $(this).parents('.to-do-card').remove()
  localStorage.removeItem(selectId)
}))

function resetInputs(){
  $('#title-input, #body-input').val("");
  $('#save-button').prop('disabled', true);
}

$('#title-input, #body-input').on('keyup', function(){
  $('#save-button').prop('disabled', false);
})

$('.to-do-list').on('click','.upvote-button' , function() {
  var $currentQuality = $(this).closest('.to-do-card').find('.current-quality');
  if ($currentQuality.text() === "swill") {
    $currentQuality.text("plausible");
  } else if ($currentQuality.text() === "plausible"){
    $currentQuality.text("genius");
  }
  var key = $(this).closest('.to-do-card').attr('id');
  var updatedQuality = $currentQuality.text();
  var toDoBox = JSON.parse(localStorage.getItem(key));
  toDoBox.quality = updatedQuality;
  localStorage.setItem(key, JSON.stringify(toDoBox))
})

$('.to-do-list').on('click','.downvote-button', function() {
  var $currentQuality = $(this).closest('.to-do-card').find('.current-quality');
  if ($currentQuality.text() === "genius") {
    $currentQuality.text("plausible");
  } else if ($currentQuality.text() === "plausible"){
    $currentQuality.text("swill");
  }
  var key = $(this).closest('.to-do-card').attr('id');
  var updatedQuality = $currentQuality.text();
  var toDoBox = JSON.parse(localStorage.getItem(key));
  toDoBox.quality = updatedQuality;
  localStorage.setItem(key, JSON.stringify(toDoBox))
})

$('.to-do-list').on('focus', '.to-do-title, .to-do-body', function() {
  var key = $(this).closest('.to-do-card').attr('id')
  var toDobox = JSON.parse(localStorage.getItem(key));
  $(this).on('keydown', function(event) {
    if(event.keyCode === 13){
      event.preventDefault();
      $(this).blur();
      return false;
    }
  })

  $(this).on('blur', function() {
    toDobox.title = $(this).closest('.to-do-card').find('.to-do-title').text();
    toDobox.body = $(this).closest('.to-do-card').find('.to-do-body').text();
    localStorage.setItem(key, JSON.stringify(toDobox));
  })
})

$('#search-input').on('keyup',function (){
  var searchValue = $(this).val().toLowerCase();
  $('.search-target').each(function(){
    var text = $(this).text().toLowerCase();
    var isAMatch = !!text.match(searchValue);
    $(this).closest('.to-do-card').toggle(isAMatch);
  });
});
