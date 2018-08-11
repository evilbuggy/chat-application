$(document).ready(function(){
    var handleName = localStorage.getItem("evilbuggyChatAppHandlName");
    if(handleName == null){
        window.location.href = "/";
    }
    
    var from = $("#msgFromName").html();
    var roomName = $("#roomName").html();
    var socket = io('/' + roomName);
    $("#btn").click(function(event){
        event.preventDefault();
        var message = $("#message").val();
        socket.emit('chat', {
            from: handleName,
            content: message
        });
        $("#message").val("");
    });
    socket.on('msg', function(data){
        if(data.from == from){
            $("#messages").append("<div class=\"msg\">" + data.content + "</div>");
        }else{
            from = data.from;
            $("#messages").append("<div class=\"msgFrom\">" + from + ":</div>");
            $("#messages").append("<div class=\"msg\">" + data.content + "</div>");
        }
    });
});