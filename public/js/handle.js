if(localStorage.getItem("evilbuggyChatAppHandlName") != null){
    window.location.href = "/home";
}
$(document).ready(function(){
    $("#btn").click(function(event){
        event.preventDefault();
        var handleName = $("#handleName").val();
        if(/[^a-zA-Z]/.test(handleName) || handleName == ""){
            $("#error").html("Error: The room name should contain alphabets only");
            $("#handleName").value = "";
        }else{
            if(handleName.length > 25){
                $("#error").html("Error: The handle name should not have more than 25 characters");
            }else{
                localStorage.setItem("evilbuggyChatAppHandlName", handleName);
                window.location.href = "/home";
            }
        }
    });
});
