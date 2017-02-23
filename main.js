$(function () {
  for (var i = 0; i < localStorage.length; i++){
    var $storedtoDos = getStoredToDos(localStorage.key(i));
    if ($storedtoDos.completed === false) {
    prependToDoBox($storedtoDos);
    hideToDos(0,9,10);
    } else {
      ;
    }
  }
})


function getStoredToDos (id) {
  return JSON.parse(localStorage.getItem(id));
}


$('#save-button').on('click', function() {
  var $title = $('#title-input').val();
  var $body = $('#body-input').val();
  var $uniqId = Date.now()
  var $newtoDo = {id: $uniqId, title: $title, body: $body, importance: 'normal', completed: false};
  storeToDo($uniqId, $newtoDo);
  prependToDoBox($newtoDo);
  hideToDos(0,9,10);
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


var i = 0;
$('#show-more').on('click', function () {
  i+=5;
  hideToDos(0, 9+i, 10+i);
});

function hideToDos (a, b, c) {
  $('article').slice(a, b).css('display', 'block');
  $('article').slice(c).css('display', 'none');
}


function prependToDoBox(toDoObj) {
  $('.to-do-list').prepend(
    `<article class="to-do-card" id="${toDoObj.id}">
      <button class="delete-button"></button>
      <section class="search-target">
        <h2 class="to-do-title" contenteditable>${toDoObj.title}</h2>
        <p class="to-do-body" contenteditable>${toDoObj.body}</p>
      </section>
      <section class="importance">
        <button class="upvote-button"></button>
        <button class="downvote-button"></button>
        <h3>importance: <span class="current-importance">${toDoObj.importance}</span></h3>
      </section>
      <button class="complete-btn">Completed</button>
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
  var $currentImportance = $(this).siblings().find('.current-importance');
  switch ($currentImportance.text()) {
    case "none":
      $currentImportance.text("low")
      break;
    case "low":
      $currentImportance.text("normal")
      break;
    case "normal":
      $currentImportance.text("high")
      break;
    case "high":
      $currentImportance.text("critical")
      break;
  };
  var newImportance = $currentImportance.text();
  updateImportance (this, newImportance);
});


$('.to-do-list').on('click','.downvote-button', function() {
  var $currentImportance = $(this).siblings().find('.current-importance');
  switch ($currentImportance.text()) {
    case "critical":
      $currentImportance.text("high")
      break;
    case "high":
      $currentImportance.text("normal")
      break;
    case "normal":
      $currentImportance.text("low")
      break;
    case "low":
      $currentImportance.text("none")
      break;
  };
  var newImportance = $currentImportance.text();
  updateImportance (this, newImportance);
});


$('.to-do-list').on('click', '.complete-btn', function (){
  console.log($(this));
  var key = $(this).closest('.to-do-card').attr('id');
  var toDoBox = JSON.parse(localStorage.getItem(key));
  $(this).parent().css({'text-decoration': 'line\\-through', 'background-color': '#F5F5F5'});
  toDoBox.completed = true;
  localStorage.setItem(key, JSON.stringify(toDoBox));
});


$('#show-completed').on('click', function() {
  for (var i = 0; i < localStorage.length; i++) {
    var storedToDos = getStoredToDos(localStorage.key(i));
    if (storedToDos.completed === true) {
      // storedToDos.css({'text-decoration': 'line\\-through', 'background-color': '#F5F5F5'});
      prependToDoBox(storedToDos);
    }
    console.log(this)
  }
})


function updateImportance (element, updatedImportance) {
  var key = $(element).closest('.to-do-card').attr('id');
  var toDoBox = JSON.parse(localStorage.getItem(key));
  toDoBox.importance = updatedImportance;
  localStorage.setItem(key, JSON.stringify(toDoBox));
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

//Need 5 radio buttons for each level of importance
//If radio button clicked, corresponding cars display
//others are hidden

$('.imp-btn').on('click', function() {
  var priorityButton = $(this).attr("label");
  console.log(priorityButton);
  $('.to-do-card').each(function(index, toDoCard){
    var text = $(this).text().toLowerCase();
    var matchImportance = text.indexOf(priorityButton) !== -1;
    $(toDoCard).toggle(matchImportance);
  })
})

// function getCardImportance () {
//   for (var i = 0; i < localStorage.length; i++){
//     var $storedtoDos = getStoredToDos(localStorage.key(i));
//   var toDoCard = JSON.parse(localStorage.getItem(key));
//   var key = $('.to-do-card').attr('id');
//   var toDoImp = toDoCard.importance;
//     console.log(toDoImp);
//   }
// }
