var mysql = require('mysql');

const GAME_CONST = {
    CELL_COUNT: 9,
    TIMEOUT_DELAY: 1,
    ROOM_DELETE_DELAY: 2880
};

console.log("2880");
var game = {
    onMessageDelivered: function (data) {
        console.log("SERVER onMessageDelivered - " + JSON.stringify(data));
    },
    postScore: function(obj) {
        var score = obj.score;
        var playerId = kapow.getPlayerId();
        var score = {
            "playerId":playerId,
            "scores": {
                'score' : score
            }
        };
        kapow.boards.postScores(score, function() {
            console.log("SUCCESS : Score Posting");
            kapow.return(obj);
        },
        function(error) {
            console.log("FAILURE : Score Posting",error);
            kapow.return(null, error);
        });
    }
};