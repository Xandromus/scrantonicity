    (function() {

        $(document).ready(function() {

            $(".wrapper").css("min-height", $(window).height());

            //$(".middle").css("min-height", $(window).height());

            var answers = [];
            var currentQuestion;
            var correctAnswer;
            var correctShow;
            var q = 0;
            var userChoice;
            var correctCount = 0;
            var incorrectCount = 0;
            var intervalId;

            var questionsAnswersArray = [{
                    question: "What game is Creed Bratton always playing on his computer?",
                    answer: "solitaire",
                    incorrectAnswers: ["minesweeper", "mahjong", "hearts"]
                },
                {
                    question: "Which TV show does the office watch in Viewing Party?",
                    answer: "Glee",
                    incorrectAnswers: ["Lost", "Desperate Housewives", "Mad Men"]
                },
                {
                    question: "Which character went to college at Cornell University?",
                    answer: "Andy Bernard",
                    incorrectAnswers: ["Jim Halpert", "Karen Filippelli", "Dwight Schrute"]
                },
                {
                    question: "Which of the following cities did NOT have a Dunder Mifflin branch?",
                    answer: "Bristol",
                    incorrectAnswers: ["Utica", "Akron", "Nashua"]
                },
                {
                    question: "What is Erin Hannon's real first name?",
                    answer: "Kelly",
                    incorrectAnswers: ["Pam", "Karen", "Angela"]
                },
                {
                    question: "What was Andy Bernard's nickname in his acapella group?",
                    answer: "Boner Champ",
                    incorrectAnswers: ["Broccoli Rob", "Lunchbox", "Jingle Jangle"]
                },
                {
                    question: "What is the name of Ryan Howard's social media invention?",
                    answer: "wuphf",
                    incorrectAnswers: ["wolf", "woof", "whoop"]
                },
                {
                    question: "What was the name of Kevin Malone's Police cover band?",
                    answer: "Scrantonicity",
                    incorrectAnswers: ["Scranton in a Bottle", "Spirits in Scranton", "I Can't Stand Losing Scranton"]
                },
                {
                    question: "Who has a heart attack in the office?",
                    answer: "Stanley Hudson",
                    incorrectAnswers: ["Kevin Malone", "Phyllis Vance", "Nellie Bertram"]
                },
                {
                    question: "Who does Michael Scott run over in his car?",
                    answer: "Meredith Palmer",
                    incorrectAnswers: ["Oscar Martinez", "Pam Beesly", "Toby Flenderson"]
                }
            ];

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
                        $("#right-wrong").html("<p>You ran out of time!</p>");
                        timer.stop();
                        $("#answer-list").removeClass("active");
                        setTimeout(displayQuestion, 3000);
                        console.log(correctCount, incorrectCount);
                    }
                },

                reset: function() {

                    stopwatch.time = 0;
                    stopwatch.lap = 1;

                    $("#display").text("00:00");
                    $("#laps").empty();
                    stopwatch.stop();

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

                $("#current-question, #answer-list").empty();
                timer.run();

                currentQuestion = questionsAnswersArray[q].question;
                $("#current-question").append("<h2>" + currentQuestion + "</h2>");

                answers = questionsAnswersArray[q].incorrectAnswers;
                answers.push(questionsAnswersArray[q].answer);

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
                    setTimeout(displayQuestion, 3000);
                } else {
                    incorrectCount++;
                    $(this).addClass("wrong");
                    $("#" + correctShow).addClass("correct");
                    $("#right-wrong").html("<p>Wrong answer!</p>");
                    $("#answer-list").removeClass("active");
                    setTimeout(displayQuestion, 3000);
                }
            });

            function startGame() {
                displayQuestion();
            }

            function endGame() {
                timer.stop();
                $("#current-question, #answer-list, #timer, #right-wrong").empty();
                $("#current-question").html("<button id='results'>See your results</button>");
            }

            function results() {
                $(".tally").append("<p>Correct answers: " + correctCount + "</p>").append("<p>Incorrect answers: " + incorrectCount + "</p>");
                if (correctCount > 7) {
                    $(".tally").append("<p>World's Best Boss</p>");
                } else if (correctCount > 3 & correctCount < 8) {
                    $(".tally").append("<p>Oh no! You Schruted it!</p>");
                } else {
                    $(".tally").append("<p>What a Toby!</p>");
                }
            }


            // move to the trivia portion

            $("#start-game").on("click", function() {
                $(".header-container").hide();
                $(".middle").show();
                startGame();
                $("#start-game").off("click");
            });

            $(document).on("click", "#results", function() {
                $("#current-question").empty();
                $(".middle").hide();
                $(".endgame").show();
                results();
            });

        });
    })();