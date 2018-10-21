$(document).ready(function () {


    // Trivia questions.
    let questions = [{
        question: "What chili pepper is considered the world's hottest pepper?",
        answers: ["Habanero", "Jalapeno", "Ghost", "Carolina Reaper"],
        correctAnswer: "Carolina Reaper"
    },
    {
        question: "What war was the setting of the TV show 'M*A*S*H'?",
        answers: ["Korean War", "Vietnam War", "World War 2", "World War 1"],
        correctAnswer: "Korean War"
    },
    {
        question: "Which Soviet leader approved the building of the Berlin Wall?",
        answers: ["Nikola Khruschev", "Vladamir Putin", "Josef Stalin", "Dmitry Medvedev"],
        correctAnswer: "Nikola Khruschev"
    },
    {
        question: "What does the 'J' stand for in the name of rapper LL Cool J?",
        answers: ["John", "Jordan", "James", "Jamal"],
        correctAnswer: "James"
    },
    {
        question: "How many strings does a cello have?",
        answers: ["Three", "Four", "Six", "Eight"],
        correctAnswer: "Four"
    },
    {
        question: "What is the country of Brazil's official language?",
        answers: ["Spanish", "French", "English", "Portuguese"],
        correctAnswer: "Portuguese"
    },
    {
        question: "What is the air speed velocity of a laden swallow?",
        answers: ["About 24 miles per hour", "African or European?", "Laden swallows can't fly.", "About 24 kilometers per hour."],
        correctAnswer: "African or European?"
    },
    ];


    let timer;
    let countStartNum = 30;

    var viewPort = $("#quiz-area");


    var game = {
        questions: questions,
        currentQuestion: 0,
        counter: countStartNum,
        correct: 0,
        incorrect: 0,

        // This section holds all the main game functions.

        results: function () {

            clearInterval(timer);

            viewPort.html("<h2>Quiz Complete, here is how you did!</h2>");

            $("#counterNum").text(game.counter);

            viewPort.append("<h3>Correct Answers: " + game.correct + "</h3>");
            viewPort.append("<h3>Incorrect Answers: " + game.incorrect + "</h3>");
            viewPort.append("<h3>Unanswered: " + (questions.length - (game.incorrect + game.correct)) + "</h3>");
            viewPort.append("<br><button id='start-over'>Start Over?</button>");
        },

        loadQuestion: function () {
            timer = setInterval(game.countdown, 1500);

            viewPort.html("<h2>" + questions[this.currentQuestion].question + "</h2>");

            for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
                viewPort.append("<button class='answer-button' id='button' data-name='" + questions[this.currentQuestion].answers[i]
                    + "'>" + questions[this.currentQuestion].answers[i] + "</button>");
            }
        },

        nextQuestion: function () {
            game.counter = countStartNum;
            $("#counterNum").text(game.counter);
            game.currentQuestion++;
            game.loadQuestion();
        },

        timeUp: function () {

            clearInterval(timer);

            $("#counterNum").html(game.counter);

            viewPort.html("<h2>Out of Time!</h2>");
            viewPort.append("<h3>The Correct Answer Was: " + questions[this.currentQuestion].correctAnswer);

            if (game.currentQuestion === questions.length - 1) {
                setTimeout(game.results, 3 * 1000);
            }
            else {
                setTimeout(game.nextQuestion, 3 * 1000);
            }
        },

        clicked: function (e) {
            clearInterval(timer);
            if ($(e.target).attr("data-name") === questions[this.currentQuestion].correctAnswer) {
                this.answeredCorrectly();
            }
            else {
                this.answeredIncorrectly();
            }
        },

        answeredIncorrectly: function () {

            game.incorrect++;

            clearInterval(timer);

            viewPort.html("<h2 style='color:red'>WRONG!</h2>");
            viewPort.append("<h3>The Correct Answer was: " + questions[game.currentQuestion].correctAnswer + "</h3>");

            if (game.currentQuestion === questions.length - 1) {
                setTimeout(game.results, 3 * 1000);
            }
            else {
                setTimeout(game.nextQuestion, 3 * 1000)
            }
        },

        answeredCorrectly: function () {

            clearInterval(timer);

            game.correct++;

            viewPort.html("<h2 style='color:green'>Correct!</h2>");

            if (game.currentQuestion === questions.length - 1) {
                setTimeout(game.results, 3 * 1000);
            }
            else {
                setTimeout(game.nextQuestion, 3 * 1000);
            }
        },

        countdown: function () {
            game.counter--;
            $("#counterNum").text(game.counter);
            if (game.counter === 0) {
                game.timeUp();
            }
        },

        reset: function () {
            this.currentQuestion = 0;
            this.counter = countStartNum;
            this.correct = 0;
            this.incorrect = 0;
            this.loadQuestion();
        }
    };

    // On click functions.

    $(document).on("click", "#start-over", function () {
        game.reset();
    });

    $(document).on('click', ".answer-button", function (e) {
        game.clicked(e);
    });

    $(document).on("click", "#start", function () {
        $("#sub-wrapper").prepend("<h2>Time Remaining: <span id='counterNum'>30</span> Seconds</h2>");
        game.loadQuestion();
    });
});

// Music.

var themeSong = new Audio("./assets/music/themesong.mp3");
document.getElementById("start").addEventListener("click", e => themeSong.play());
document.getElementById("start-music").addEventListener("click", e => themeSong.play(), themeSong.volume = 0.2);
document.getElementById("stop-music").addEventListener("click", e => themeSong.pause());
