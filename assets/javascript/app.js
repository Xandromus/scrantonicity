    (function() {

        $(document).ready(function() {

            $(".header-container").css("min-height", $(window).height());

            $(".middle").css("min-height", $(window).height());

            var answers = [];
            var currentQuestion;
            var correctAnswer;
            var q = 0;
            var seconds;

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

            // DISPLAY QUESTIONS AND ANSWERS

            function displayQuestion() {

                currentQuestion = questionsAnswersArray[q].question;
                $("#current-question").append("<h2>" + currentQuestion + "</h2>");

                answers = questionsAnswersArray[q].incorrectAnswers;
                answers.push(questionsAnswersArray[q].answer);

                var currentIndex = answers.length, temporaryValue, randomIndex;

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

                for (var i = 0; i < 4; i++) {
                    $("#answer-list").append("<li class='answer-item text-center'>" + answers[i] + "</li>");
                }
                q++;
            }

            displayQuestion();

            // TIMER

            seconds = 10;

            var intervalId;


            function run() {
                clearInterval(intervalId);
                intervalId = setInterval(decrement, 1000);
                $("#time-left").text(10);
                seconds = 10;
            }

            function decrement() {

                seconds--;

                $("#time-left").html("&nbsp;&nbsp;" + seconds);

                if (seconds === 0) {

                    stop();

                }
            }

            function stop() {

                clearInterval(intervalId);
            }


            // move to the trivia portion

            $("#start-game").on("click", function() {
                run();
                $("html, body").animate({
                    scrollTop: $(".middle").offset().top
                }, 1000);
            });

        });
    })();