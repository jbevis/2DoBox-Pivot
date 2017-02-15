$('#save-button').on('click', function() {
  var $title = $('#title-input').val();
  var $body = $('#body-input').val();
  var $uniqId = Date.now()
  var $newIdea = new IdeaObject ($uniqId, $title, $body);
  prependIdeaBox($newIdea);
  resetInputs();
})

function IdeaObject (id, title, body){
  this.id = id;
  this.title = title;
  this.body = body;
  this.quality = 'swill';
}

function prependIdeaBox(ideaObj) {
  $('.idea-box-container').prepend(
    `<article id="${ideaObj.id}">
      <h2 contenteditable>${ideaObj.title}</h2>
      <button class="delete-button"></button>
      <p contenteditable>${ideaObj.body}</p>
      <section class="quality">
        <button class="upvote-button"></button>
        <button class="downvote-button"></button>
        <h3>quality: ${ideaObj.quality}</h3>
      </section>
    </article>
    `
  )
}

$('.idea-box-container').on('click', '.delete-button', (function() {
  $(this).parent().remove();
}))

function resetInputs(){
  $('#title-input, #body-input').val("");
  $('#save-button').prop('disabled', true);
}

$('#title-input, #body-input').on('keyup', function(){
  $('#save-button').prop('disabled', false);
})

$('.idea-box-container').on('click','.upvote-button' , function() {
  upVote();
})

function upVote(){
  if ($('.quality').val() === "swill") {
    $('.quality').val() = "plausible";
  } else if ($('.quality').val() === "plausible"){
    $('.quality').val() = "genius";
  }
  console.log('horse');
}
