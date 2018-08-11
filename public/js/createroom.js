$(document).ready(function(){
    $("#btn").click(function(event){
        event.preventDefault();
        var roomName = $("#roomName").val();
        if(/[^a-zA-Z0-9]/.test(roomName) || roomName == ""){
            $("#error").html("Error: The room name should only alphabets and numbers");
            $("#roomName").value = "";
        }else{
            if(roomName.length > 25){
                $("#error").html("Error: The room name should not have more than 25 characters");
            }else{
                $.ajax({
                    type: "POST",
                    url: "/createroom",
                    data: {
                        roomName: roomName
                    },
                    success: function(response){
                        console.log(response);
                        if(response.error === "alreadyExists"){
                            $("#error").html("Error: Room name already exists");
                            $("#roomName").value = "";
                        }else if(response.error === "errorCreating"){
                            $("#error").html("Error: Error creating room. Please try again");
                            $("#roomName").value = "";
                        }else if(response.error === "noErr"){
                            window.location.href = "/" + roomName;
                        }
                    }
                });
            }
        }
    });
});
