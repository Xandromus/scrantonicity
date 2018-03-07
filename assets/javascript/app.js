    (function() {

            $(document).ready(function() {

                    function isAppleDevice() {
                        return (
                            (navigator.userAgent.toLowerCase().indexOf("ipad") > -1) ||
                            (navigator.userAgent.toLowerCase().indexOf("iphone") > -1) ||
                            (navigator.userAgent.toLowerCase().indexOf("ipod") > -1)
                        );
                    }
                    if (isAppleDevice()) {
                            $('body').addClass('is_apple')
                        }

                        // make sure the page wrapper is always the height of the window
                        $(".wrapper").css("min-height", $(window).height());

                        // VARIABLES

                        // global variable declarations
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

                        // array with questions, answers, and images
                        var questionsAnswersArray = [{
                                question: "What game was Creed Bratton always playing on his computer?",
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
                                firstPic: "assets/images/cornell.jpg",
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
                                question: "What was Erin Hannon's real first name?",
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
                                question: "What was the name of Ryan Howard's social media invention?",
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
                                question: "Who did Michael Scott run over in his car?",
                                answer: "Meredith Palmer",
                                incorrectAnswers: ["Oscar Martinez", "Pam Beesly", "Toby Flenderson"],
                                firstPic: "assets/images/michaelscott.jpg",
                                secondPic: "assets/images/meredithpalmer.jpg"
                            }
                        ];


                        // FUNCTIONS

                        // function to shuffle the questions every time the game is played
                        function shuffleQuestions() {

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

                        // function to spin the first picture and answers every time they load
                        function spin() {
                            $("#answer-list, #pic-field").addClass("flip");
                            $("#answer-list, #pic-field").toggleClass("flipback", "flip");
                        }

                        // Timer Object and its functions

                        var timer = {

                            // initialize seconds to 10
                            seconds: 10,

                            // function to make timer count down
                            decrement: function() {

                                // decrement by 1 second
                                timer.seconds--;

                                // display the number of seconds left
                                $("#time-left").html("&nbsp;&nbsp;" + timer.seconds);

                                // the seconds turn red once they reach 3
                                if (timer.seconds < 4) {
                                    $("#time-left").css("color", "red");
                                }

                                // change text from 'seconds' to 'second' when timer reaches 1
                                if (timer.seconds === 1) {
                                    $("#seconds").html("second&nbsp;&nbsp;");
                                } else {
                                    $("#seconds").text("seconds");
                                }

                                // if user doesn't select an answer, increase their number of incorrect answers, show them the correct answer, and highlight the correct answer
                                if (timer.seconds === 0) {
                                    incorrectCount++;
                                    $("#" + correctShow).addClass("correct");
                                    $("#right-wrong").html("<p>You ran out of time!</p><p>It was <span class='correct-text'>" + correctAnswer + "</span>.</p>");

                                    // stop the timer
                                    timer.stop();

                                    // remove active class from the answer <ul> so that user can't trigger click events
                                    $("#answer-list").removeClass("active");

                                    // display image for correct answer
                                    $("#pic-field").html(picTwo);

                                    // call function to display next question
                                    setTimeout(displayQuestion, 3000);
                                }
                            },

                            // function to start timer
                            run: function() {

                                // clear the interval each time the timer starts
                                clearInterval(intervalId);

                                // set the timer interval for the secrement function
                                intervalId = setInterval(timer.decrement, 1000);

                                // create the timer display
                                $("#timer").html("Time remaining: <span id='time-left'>10</span> <span id='seconds'>seconds</span>");

                                // always start with 10 seconds
                                $("#time-left").text(10);
                                timer.seconds = 10;
                            },

                            // fnuction to stop the timer and clear the interval
                            stop: function() {

                                clearInterval(intervalId);
                            }
                        };

                        // function to display questions and answers

                        function displayQuestion() {

                            // spin image and answers each time a new question appears
                            spin();

                            // keep displaying questions as long as the user hasn't seen all of them
                            if (q < questionsAnswersArray.length) {

                                // empty all display fields and start timer
                                $("#current-question, #answer-list, #pic-field, #right-wrong").empty();
                                timer.run();

                                // assign current question to each question from the array 
                                currentQuestion = questionsAnswersArray[q].question;

                                // assign image variables
                                picOne = $("<img class='img-fluid'>").attr("src", questionsAnswersArray[q].firstPic);
                                picTwo = $("<img class='img-fluid'>").attr("src", questionsAnswersArray[q].secondPic);

                                // add the question and initial image
                                $("#current-question").append("<h2>" + currentQuestion + "</h2>");
                                $("#pic-field").append(picOne);

                                // declar array to hold potential answers for each question 
                                var answers = [];
                                answers = [questionsAnswersArray[q].answer, questionsAnswersArray[q].incorrectAnswers[0], questionsAnswersArray[q].incorrectAnswers[1], questionsAnswersArray[q].incorrectAnswers[2]];

                                // shuffle answers
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

                                // assign correct answer to variable
                                correctAnswer = questionsAnswersArray[q].answer;

                                // assign variable for correct answer without spaces
                                correctShow = correctAnswer.replace(/\s/g, "");

                                // assign active class so that list items can be clicked
                                $("#answer-list").addClass("active");

                                // created list items from shuffled array and include unique ids without spaces
                                for (var i = 0; i < 4; i++) {
                                    $("#answer-list").append("<li class='answer-item text-center' id='" + answers[i].replace(/\s/g, "") + "'>" + answers[i] + "</li>");
                                }

                                // increment the question number
                                q++;

                                // end the game once the user has seen every question
                            } else {
                                endGame();
                            }
                        }

                        // function to start game, play theme music, shuffle questions, and display the first question
                        function startGame() {
                            theme.play();
                            shuffleQuestions();
                            displayQuestion();
                        }

                        // function to stop the game, empty the game displays, and create a button to show the user their results
                        function endGame() {
                            timer.stop();
                            $("#current-question, #answer-list, #timer, #right-wrong, #pic-field").empty();
                            $("#result-holder").html("<button id='results'><i class='fa fa-calculator'></i>&nbsp; See your results</button>");
                        }

                        // function to display the number of correct and incorrect answers and display a unique message and image depending on well user answered questions
                        function results() {
                            $(".tally").append("<h2 class='mb-1'>Here's how you did:</h2>").append("<p>Correct answers: " + correctCount + "</p>").append("<p>Incorrect answers: " + incorrectCount + "</p>");
                            // best score is between 8 and 10
                            if (correctCount > 7) {
                                $(".tally").append("<img class='img-fluid mt-3' src='assets/images/wbb.jpg' alt='Michael Scott with World's Best Boss mug />");
                                $(".tally").append("<p class='mt-3'>World's Best Boss</p>");

                                // middle score between 4 and 7
                            } else if (correctCount > 3 & correctCount < 8) {
                                $(".tally").append("<img class='img-fluid mt-3' src='assets/images/dwightschrute.jpg' alt='Dwight Schrute' />");
                                $(".tally").append("<p class='mt-3'>Oh no! You Schruted it!</p>");

                                // poor score between 0 and 3
                            } else {
                                $(".tally").append("<img class='img-fluid mt-3' src='assets/images/tobyflenderson.jpg' alt='Toby Flenderson' />");
                                $(".tally").append("<p class='mt-3'>What a Toby!</p>");
                            }
                        }


                        // CLICK EVENTS

                        // click events for right or wrong answers
                        $(document).on("click", ".active .answer-item", function() {

                            // stop timer and assign user choice to the clicked answer
                            timer.stop();
                            userChoice = $(this).text();

                            // if the answer is correct
                            if (userChoice === correctAnswer) {

                                // increase the correct answer count, highlight the correct answer, and display it as well
                                correctCount++;
                                $(this).addClass("correct");
                                $("#right-wrong").html("<p class='correct-text'>YESH!</p><p class='correct-text'>Correct!</p>");

                                // disable click events for list items
                                $("#answer-list").removeClass("active");

                                // change to correct answer image
                                $("#pic-field").html(picTwo);

                                // call function to display next question
                                setTimeout(displayQuestion, 3000);

                                // if answer is incorrect
                            } else {

                                // increase the incorrect answer count, highlight the correct and incorrect answers, and display the correct answer
                                incorrectCount++;
                                $(this).addClass("wrong");
                                $("#" + correctShow).addClass("correct");
                                $("#right-wrong").html("<p>Wrong!</p><p>It was <span class='correct-text'>" + correctAnswer + "</span></p>");

                                // disable click events for list items
                                $("#answer-list").removeClass("active");

                                // change to correct answer image
                                $("#pic-field").html(picTwo);

                                // call function to display next question
                                setTimeout(displayQuestion, 3000);
                            }
                        });

                        // click event to start game
                        $("#start-game").on("click", function() {
                            $(".header-container").hide();
                            $("main").show();
                            startGame();
                        });

                        // click event to display results
                        $(document).on("click", "#results", function() {
                            $("#current-question").empty();
                            $("main").hide();
                            $(".endgame").show();
                            results();
                        });

                        // click event to reset game
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