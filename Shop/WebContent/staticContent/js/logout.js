
$(document).ready(function() {
	$("#pass").on('keyup', function(e) {
		if (e.keyCode == 13) {
			login();
		}
	});
	$("#uname").on('keyup', function(e) {
		if (e.keyCode == 13) {
			login();
		}
	});
});

function Logout() {

	var params = {};

	params["methodName"] = "logout";

	$.post('/Shop/jsp/utility/controller.jsp', params, function(data) {

		alert("You have successfully logged out !!!");
		window.location.replace("/Shop/jsp/login.jsp");

	}).error(function(jqXHR, textStatus, errorThrown) {
		if (textStatus === "timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});

}

function login() {
	
	var uname = $("#uname").val();
	if (uname == "") 
	{
		alert("Please Enter User Name");
		return false;
	}
		
	var pass = $("#pass").val();
	if (pass == "") 
	{
		alert("Please Enter Password");
		return false;
	}
	
	var shopName = $("#shopName").val();
	
	if (shopName == "") 
	{
		alert("Please Enter Shop Name");
		return false;
	}

	var userid=shopName.split(",")[0];
	var shopid=shopName.split(",")[1];
	var shopname=shopName.split(",")[2];

	var params = {};

	params["uname"] = uname;
	params["pass"] = pass;
	params["userid"] = userid;
	params["shopid"] = shopid;
	params["shopName"] = shopName;
	
	params["methodName"] = "login";

	$.post('/Shop/jsp/utility/controller.jsp', params, function(data) 
			{
	/*window.location.replace("/Shop/jsp/index.html");*/
	  window.location.replace("/Shop/jsp/indexNew.jsp");
	
	}).error(function(jqXHR, textStatus, errorThrown) {
		if (textStatus === "timeout")
		{
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});

}

function language() {

	var language = $("#language").val();

	var params = {};

	params["language"] = language;

	params["methodName"] = "language";

	$.post('/Shop/jsp/utility/controller.jsp', params, function(data) {

		location.reload();

	}).error(function(jqXHR, textStatus, errorThrown) {
		if (textStatus === "timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});

}
