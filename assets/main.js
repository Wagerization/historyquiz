STORE = [
    {Question: 'Suez canal opened in the year', 
    options: ['1863AD', '1869AD', '1875AD', '1983AD',], 
    answer: '1869AD'},

    {Question: 'The Eiffel Tower is built in', 
    options: ['1890', '1889', '1786', '1800',], 
    answer: '1889'},

    {Question: 'New Zeland becomes first country to grant woman to right to vote in the year', 
    options: ['1799', '1869', '1845', '1865',], 
    answer: '1869'},

    {Question: 'World War I commenced in', 
    options: ['1915', '1916', '1913', '1914',], 
    answer: '1914'},

    {Question: 'Who is considered the "Father of the Constitution', 
    options: ['James Madison', 'Gerald Ford', 'Abraham Lincoln', 'Benjamin Harrison',], 
    answer: 'James Madison'},

    {Question: 'Name the person who built Fort Necessity', 
    options: ['James A. Garfield', 'Bill Clinton', 'William Howard Taft', 'George Washington',], 
    answer: 'George Washington'},

    {Question: 'Which country did Germany invade on the 1st of September 1939', 
    options: ['France', 'Czechoslovakia', 'Poland', 'Finland',], 
    answer: 'Poland'},

    {Question: 'What was the first country to give women the vote in 1893', 
    options: ['America', 'Australia', 'New Zealand', 'Iceand',], 
    answer: 'New Zealand'},

    {Question: 'Which of these was one of the seven ancient wonders of the world', 
    options: ['Great Wall of China', 'Macchu Picchu', 'Lighthouse of Alexandria', 'Taj Mahal',], 
    answer: 'Lighthouse of Alexandria'},

    {Question: 'Sliced bread was invented in', 
    options: ['America in 1928', 'France in 1789', 'Australia in 1897', 'Scotland in 1902',], 
    answer: 'America in 1928'},
    
];

let score = 0;
let questionNumber = 0;

$('.btn-start').on('click', function (){
    $('.stage-start').removeClass('active');
    $('.stage-form').addClass('active');
});

function correctAnswer(){
    $('.correct-answer').text(STORE[currentQuestionIndex].answer);
    
}

function addScore(){
    $('.count-score').text(score);
}

function changeScore(){
    score++;
}

function addQuizz(){
    $('.count-quizz').text(questionNumber);
}

function changeQuizz(){
    questionNumber++;
}

let currentQuestionIndex = 0;

function renderQuestion(){ 
    if (currentQuestionIndex <= 9) {
      let question = STORE[currentQuestionIndex];
      $('.form-question').html(`<p>${question.Question}</p>`);
      options();
    } else {
        $('.stage-form').removeClass('active');
        renderScore();
    }
} 

function resetQuizz(){
    $('.reset').on('click', '.redo', function(event) {
        location.reload();
      });
}

function renderScore(){
    if( score  >= 10){

        $('.all-right').addClass('active');
        $('.stage-final').addClass('active');
        $('.score').append(`${score-1}`);
    } else if ( score >= 4){

        $('.half-right').addClass('active');
        $('.stage-final').addClass('active');
        $('.score').append(`${score-1}`);
    } else if( score >= 2){ 
        $('.count-quizz').removeClass('active')
        $('.three-right').addClass('active');
        $('.stage-final').addClass('active');
        $('.score').append(`${score-1}`);
    }
}


function moveTONextQuestion(){
    currentQuestionIndex++;
};

function options(){
  STORE[currentQuestionIndex].options.forEach(function(option, index){
      $(`.option-${index}`).html(option);
  });
}

function nextQuestion(){
    $('#next-form').submit(function(event){
        event.preventDefault();
    });
        $('.btn-next').on('click', function(){
            $('.right-answer').removeClass('active');
            $('.wrong-answer').removeClass('active');
            $('.stage-form').addClass('active');
            moveTONextQuestion();
            renderQuestion();
        });
}


function submitHandle(){
    $(document).on('submit', '#list-options', function(event){
    event.preventDefault();
    let correct = STORE[currentQuestionIndex].answer;
    let userChoice = $("input[name='options']:checked").next().html();
    if(correct === userChoice){
      $('.stage-form').removeClass('active');
      $('.right-answer').addClass('active');
      addScore();
      addQuizz();
      changeScore();
      changeQuizz();
    } else {
      $('.stage-form').removeClass('active');
      $('.wrong-answer').addClass('active');
      correctAnswer();
      addQuizz();
      changeQuizz();
      
    }
  });
}



$(function () {
    submitHandle();
    correctAnswer();
    nextQuestion();
    renderQuestion();
    options();
    changeScore();
    changeQuizz();
    renderScore();
    resetQuizz();
});
