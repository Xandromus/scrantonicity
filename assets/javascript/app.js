    (function() {

        $(document).ready(function() {


            var questionArray = ["Which character went to college at Cornell University?", "Which of the following cities did NOT have a Dunder Mifflin branch?", "What is Erin's real first name?", "What was Andy Bernard's nickname in his acapella group?", "What is the name of Ryan's social media invention?"];
            var answerArray = [["Jim Halpert", "Andy Bernard", "Karen Filippelli", "Dwight Schrute"], ["Utica", "Akron", "Nashua", "Bristol"], ["Kelly", "Pam", "Karen", "Angela"], ["Broccoli Rob", "Lunchbox", "Boner Champ", "Jingle Jangle"], ["wolf", "woof", "wuphf", "whoop"]];

            // TIMER

            var number = 10;

            var intervalId;


            function run() {
                clearInterval(intervalId);
                intervalId = setInterval(decrement, 1000);
            }

            function decrement() {

                number--;

                $("#time-left").html("&nbsp;&nbsp;" + number);

                if (number === 0) {

                    stop();

                }
            }

            function stop() {

                clearInterval(intervalId);
            }

            run();

        });
    })();