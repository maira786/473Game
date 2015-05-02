$( document ).ready(function() {
	var credentials = (function (){
        var submit_register = $("#submit_register");
        var submit_login = $("#submit_login");
        var reg_link = $("#register_link");
        var log_link = $("#login_link");

        var init = function(){
        	submit_register.on("click",function(e){
        		e.preventDefault();
        		register();
        	});
        	submit_login.on('click', function(e){
        		e.preventDefault();
        		login();
        	});
        	reg_link.on('click', function(e){
        		e.preventDefault();
        		clear();
        		$("#register").show();
        		$("#login").hide();
        	});
        	log_link.on('click', function(e){
        		e.preventDefault();
        		clear();
        		$("#login").show();
        		$("#register").hide();
        	});       	
        };
        var register = function (){
        	$.ajax({
				type:"POST",
				data: {
					email:$("#email").val(),
					pass:$("#password").val()
				},
				url: "http://localhost:1337/register",
				success: function (response)
				{
					if(response == "success")
					{
						$("#register").children("label").addClass("has-success");
						$("#email").addClass("has-success");
						$("#password").addClass("has-success");
						setTimeout(function() {
							window.location.href = "http://localhost:1337/cursor_game";
						}, 1500);
					}
					else if(response == "taken")
					{
						error('reg_prob','Sorry that email is already registered to an account.');
					}
					else if(response == "email")
					{
						error('reg_prob','The email you entered is invalid.');
					}
					else if(response == "empty")
					{
						error('reg_prob','You must fill in both fields.');
					}
					else
					{
						error('reg_prob','Sorry, there was an eror on our end please try again.');
					}
				},
				error: function (response)
				{
					//oops
				}
			});
        };
        var login = function (){
        	$.ajax({
				type:"POST",
				data: {
					email:$("#email_login").val(),
					pass:$("#password_login").val()
				},
				url: "http://localhost:1337/login",
				success: function (response)
				{
					if(response == "valid")
					{
						$("#login").children("label").addClass("has-success");
						$("#email_login").addClass("has-success");
						$("#password_login").addClass("has-success");
						setTimeout(function() {
							window.location.href = "http://localhost:1337/cursor_game";
						}, 1500);
					}
					else if(response == "invalid")
					{
						error('log_prob','Sorry that email/password combination was invalid.');
					}
					else if(response == "email")
					{
						error('log_prob','The email you entered is invalid.');
					}
					else if(response == "empty")
					{
						error('log_prob','You must fill in both fields.');
					}
					else
					{
						error('reg_prob','Sorry, there was an eror on our end please try again.');
					}
				},
				error: function (response)
				{
					console.log(response);
				}
			});
        };
        var error = function (lor,message){
        	$("#" + lor).children("span").text(message);
        	$("#" + lor).show();
        	$('input').on('input',function(){
        		$("#" + lor).hide();
        	});
        };
        var clear = function (){
			$("#email").val("");
			$("#password").val("");
			$("#email_login").val("");
			$("#password_login").val("");
        };
        return {
        	init: init
        };
    })();
    credentials.init();
});