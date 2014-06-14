var message = {};

message.endOfProgram = function(flag) {
    alert("Mission " + (flag ? "completed" : "failed") + "!");
}

message.badProgram = function() {
    alert("Bad program!");
}