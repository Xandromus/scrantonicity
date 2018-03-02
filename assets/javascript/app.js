    (function() {

        $(document).ready(function() {

            $(".wrapper").css("min-height", $(window).height());

            //$(".middle").css("min-height", $(window).height());

            var currentQuestion;
            var picOne;
            var picTwo;
            var correctAnswer;
            var correctShow;
            var q = 0;
            var userChoice;
            var correctCount = 0;
            var incorrectCount = 0;
            var intervalId;
            var theme = new Audio("assets/sounds/officetheme.mp3");

            var questionsAnswersArray = [{
                    question: "What game is Creed Bratton always playing on his computer?",
                    answer: "solitaire",
                    incorrectAnswers: ["minesweeper", "mahjong", "hearts"],
                    firstPic: "assets/images/creedbratton.jpg",
                    secondPic: "assets/images/solitaire.jpg"
                },
                {
                    question: "Which TV show did the office watch in Viewing Party?",
                    answer: "Glee",
                    incorrectAnswers: ["Lost", "Desperate Housewives", "Mad Men"],
                    firstPic: "assets/images/kellykapoor.jpg",
                    secondPic: "assets/images/glee.jpg"
                },
                {
                    question: "Which character went to college at Cornell University?",
                    answer: "Andy Bernard",
                    incorrectAnswers: ["Jim Halpert", "Karen Filippelli", "Dwight Schrute"],
                    firstPic: "assets/images/cornell.png",
                    secondPic: "assets/images/andybernard.jpg"
                },
                {
                    question: "Which of the following cities did NOT have a Dunder Mifflin branch?",
                    answer: "Bristol",
                    incorrectAnswers: ["Utica", "Akron", "Nashua"],
                    firstPic: "assets/images/dunder.jpg",
                    secondPic: "assets/images/bristol.jpg"
                },
                {
                    question: "What is Erin Hannon's real first name?",
                    answer: "Kelly",
                    incorrectAnswers: ["Pam", "Karen", "Angela"],
                    firstPic: "assets/images/erinhannon.jpg",
                    secondPic: "assets/images/kellykelly.jpg"
                },
                {
                    question: "What was Andy Bernard's nickname in his acapella group?",
                    answer: "Boner Champ",
                    incorrectAnswers: ["Broccoli Rob", "Lunchbox", "Jingle Jangle"],
                    firstPic: "assets/images/andybernard.jpg",
                    secondPic: "assets/images/hct.jpg"
                },
                {
                    question: "What is the name of Ryan Howard's social media invention?",
                    answer: "wuphf",
                    incorrectAnswers: ["wolf", "woof", "whoop"],
                    firstPic: "assets/images/ryanhoward.jpg",
                    secondPic: "assets/images/wuphf.jpg"
                },
                {
                    question: "What was the name of Kevin Malone's Police cover band?",
                    answer: "Scrantonicity",
                    incorrectAnswers: ["Scranton in a Bottle", "Spirits in Scranton", "I Can't Stand Losing Scranton"],
                    firstPic: "assets/images/kevinmalone.jpg",
                    secondPic: "assets/images/scrantonicity.jpg"
                },
                {
                    question: "Who had a heart attack in the office?",
                    answer: "Stanley Hudson",
                    incorrectAnswers: ["Kevin Malone", "Phyllis Vance", "Nellie Bertram"],
                    firstPic: "assets/images/fire.jpg",
                    secondPic: "assets/images/stanleyhudson.jpg"
                },
                {
                    question: "Who does Michael Scott run over in his car?",
                    answer: "Meredith Palmer",
                    incorrectAnswers: ["Oscar Martinez", "Pam Beesly", "Toby Flenderson"],
                    firstPic: "assets/images/michaelscott.jpg",
                    secondPic: "assets/images/meredithpalmer.jpg"
                }
            ];

            function shuffleQuestions () {

            var currIndex = questionsAnswersArray.length,
                    temporaryValue, randomIndex;

                // While there remain elements to shuffle...
                while (0 !== currIndex) {

                    // Pick a remaining element...
                    randomIndex = Math.floor(Math.random() * currIndex);
                    currIndex -= 1;

                    // And swap it with the current element.
                    temporaryValue = questionsAnswersArray[currIndex];
                    questionsAnswersArray[currIndex] = questionsAnswersArray[randomIndex];
                    questionsAnswersArray[randomIndex] = temporaryValue;
                }
}

            // TIMER

            var timer = {

                seconds: 10,

                decrement: function() {

                    timer.seconds--;

                    $("#time-left").html("&nbsp;&nbsp;" + timer.seconds);

                    if (timer.seconds < 4) {
                        $("#time-left").css("color", "red");
                    }

                    if (timer.seconds === 0) {
                        incorrectCount++;
                        $("#" + correctShow).addClass("correct");
                        $("#right-wrong").html("<p>You ran out of time!</p><p>The answer was <span class='correct-text'>" + correctAnswer + "</span>.</p>");
                        timer.stop();
                        $("#answer-list").removeClass("active");
                        $("#pic-field").html(picTwo);
                        setTimeout(displayQuestion, 3000);
                        console.log(correctCount, incorrectCount);
                    }
                },

                run: function() {
                    clearInterval(intervalId);
                    intervalId = setInterval(timer.decrement, 1000);
                    $("#timer").html("Time remaining: <span id='time-left'>10</span> seconds");
                    $("#time-left").text(10);
                    timer.seconds = 10;
                },
                stop: function() {

                    clearInterval(intervalId);

                }

                
            };

            // DISPLAY QUESTIONS AND ANSWERS

            function displayQuestion() {
                if (q < 10) {
                $("#current-question, #answer-list, #pic-field, #right-wrong").empty();
                timer.run();

                currentQuestion = questionsAnswersArray[q].question;
                picOne = $("<img class='img-fluid'>").attr("src", questionsAnswersArray[q].firstPic);
                picTwo = $("<img class='img-fluid'>").attr("src", questionsAnswersArray[q].secondPic);
                
                $("#current-question").append("<h2>" + currentQuestion + "</h2>");
                $("#pic-field").append(picOne);

                var answers = [];
                answers = [questionsAnswersArray[q].answer, questionsAnswersArray[q].incorrectAnswers[0], questionsAnswersArray[q].incorrectAnswers[1], questionsAnswersArray[q].incorrectAnswers[2]];

                var currentIndex = answers.length,
                    temporaryValue, randomIndex;

                // While there remain elements to shuffle...
                while (0 !== currentIndex) {

                    // Pick a remaining element...
                    randomIndex = Math.floor(Math.random() * currentIndex);
                    currentIndex -= 1;

                    // And swap it with the current element.
                    temporaryValue = answers[currentIndex];
                    answers[currentIndex] = answers[randomIndex];
                    answers[randomIndex] = temporaryValue;
                }

                correctAnswer = questionsAnswersArray[q].answer;
                correctShow = correctAnswer.replace(/\s/g, "");
                $("#answer-list").addClass("active");

                for (var i = 0; i < 4; i++) {
                    $("#answer-list").append("<li class='answer-item text-center' id='" + answers[i].replace(/\s/g, "") + "'>" + answers[i] + "</li>");
                }
                q++;
            } else {
                    endGame();
                }
            }



            $(document).on("click", ".active .answer-item", function() {
                timer.stop();
                userChoice = $(this).text();
                if (userChoice === correctAnswer) {
                    correctCount++;
                    $(this).addClass("correct");
                    $("#right-wrong").html("<p>Correct!</p>");
                    $("#answer-list").removeClass("active");
                    $("#pic-field").html(picTwo);
                    setTimeout(displayQuestion, 3000);
                } else {
                    incorrectCount++;
                    $(this).addClass("wrong");
                    $("#" + correctShow).addClass("correct");
                    $("#right-wrong").html("<p>Wrong! It was <span class='correct-text'>" + correctAnswer + "</span></p>");
                    $("#answer-list").removeClass("active");
                    $("#pic-field").html(picTwo);
                    setTimeout(displayQuestion, 3000);
                }
            });

            function startGame() {
                theme.play();
                shuffleQuestions();
                displayQuestion();
            }

            function endGame() {
                timer.stop();
                $("#current-question, #answer-list, #timer, #right-wrong, #pic-field").empty();
                $("#result-holder").html("<button id='results'><i class='fa fa-calculator'></i>&nbsp; See your results</button>");
            }

            function results() {
                $(".tally").append("<p>Correct answers: " + correctCount + "</p>").append("<p>Incorrect answers: " + incorrectCount + "</p>");
                if (correctCount > 7) {
                    $(".tally").append("<img class='img-fluid mt-3' src='assets/images/wbb.jpg' alt='Michael Scott with World's Best Boss mug />");
                    $(".tally").append("<p class='mt-3'>World's Best Boss</p>");
                } else if (correctCount > 3 & correctCount < 8) {
                    $(".tally").append("<img class='img-fluid mt-3' src='assets/images/dwightschrute.jpg' alt='Dwight Schrute' />");
                    $(".tally").append("<p class='mt-3'>Oh no! You Schruted it!</p>");
                } else {
                    $(".tally").append("<img class='img-fluid mt-3' src='assets/images/tobyflenderson.jpg' alt='Toby Flenderson' />");
                    $(".tally").append("<p class='mt-3'>What a Toby!</p>");
                }
            }


            // move to the trivia portion

            $("#start-game").on("click", function() {
                $(".header-container").hide();
                $("main").show();
                startGame();
            });

            $(document).on("click", "#results", function() {
                $("#current-question").empty();
                $("main").hide();
                $(".endgame").show();
                theme.pause();
                results();
            });

            $(document).on("click", "#reset-game", function() {
                $(".tally, #result-holder").empty();
                $(".endgame").hide();
                $(".header-container").show();
                q = 0;
                correctCount = 0;
                incorrectCount = 0;
            });

        });
    })();