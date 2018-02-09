"use strict";

window.game = {
    onLoad: function (room) {
        console.log("Kapow loading complete" + JSON.stringify(room));
    },
    onGameEnd: function (outcome) {
        console.log("CLIENT : Game Ended", outcome);
    },
    onPlayerJoined: function (playerObj) {
        console.log("CLIENT onPlayerJoined - " + JSON.stringify(playerObj));
    },
    onInviteRejected: function (playerObj) {
        console.log("Client onInviteRejected - " + JSON.stringify(playerObj));
    },
    onPlayerLeft: function (playerObj) {
        console.log("Client onPlayerLeft - " + JSON.stringify(playerObj));
    },
    onTurnChange: function (player) {
        console.log("Player Turn Changed to : " + JSON.stringify(player));
    },
    onPause: function () {
        console.log('On Pause Triggered.');
    },
    onResume: function () {
        console.log('On Resume Triggered.');
    },
    onMessageReceived: function (message) {
        console.log('CLIENT : Message Received - ', JSON.stringify(message));
    },
    onBackButtonPressed: function () {
        kapow.close();
        return true;
    },
    onRoomLockStatusChange: function (room) {
        console.log("Room Lock status changed for room :", room);
    }
};