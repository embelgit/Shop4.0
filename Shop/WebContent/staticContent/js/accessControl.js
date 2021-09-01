//fetch user-name and password from userDetails
function getUserDetails(){
	
	var params= {};
	var name= $('#EmpName').val();
	
	var userId=name.split(",")[0];
	var empname=name.split(",")[1];


	$("#userName").append($("<input/>").attr("value","").text());
	$("#password").append($("<input/>").attr("value","").text());
	
	
	params["userId"]= userId;
	params["empname"]= empname;
	
	params["methodName"] = "getUserDetailsToAccessControl";

	$.post('/Shop/jsp/utility/controller.jsp',params,function(data){

		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		$.each(jsonData,function(i,v)
				{
			document.getElementById("userName").value = v.userName;
			document.getElementById("password").value = v.password;
				});
	}).error(function(jqXHR, textStatus, errorThrown){
		if(textStatus==="timeout") {

		}
	});

}

//save Access Control
function AddAccessControlDetails(){

	//document.getElementById("save").disabled = true;
	document.usd.btn.disabled = true;
	
	var EmpName = $('#EmpName').val();
	var userid= EmpName.split(",")[0];
	var employeeName = EmpName.split(",")[1];
	
	var userName = $('#userName').val();
	var password = $('#password').val();
	var type = $('#type').val();
	
	var shopname  = $('#shopname').val();
	var shopid= shopname.split(",")[0];
	var shop= shopname.split(",")[1];

	var email = $('#email').val();
	var pass= $('#pass').val();
	
    if(email=="" || email==null || email==undefined){
    	email="abc@gmail.com";
    }
    if(pass=="" || pass==null || pass==undefined){
    	pass="abcd";
    }
    
	var params = {};


	params["userid"] =userid;
	params["EmpName"] =employeeName;
	params["userName"] =userName;
	params["password"] =password;
	params["type"] = type;
	params["shopid"] =shopid;
	params["shopname"] =shop;  
	params["email"] = email;
	params["pass"] = pass;
	
	params["methodName"] = "AddAccessControl";
	$.post('/Shop/jsp/utility/controller.jsp',params,function(data) {
		
		alert(data);
		/*var msg=data;
		var dialog = bootbox.dialog({
	    message: '<p class="text-center">'+msg.fontcolor("green").fontsize(5)+'</p>',
	    closeButton: false
		});
		
		setTimeout(function() {
			dialog.modal('hide');
			location.reload();
		}, 1500);*/
		
			document.usd.btn.disabled = false;
			location.reload();
			
	}).error(function(jqXHR, textStatus, errorThrown){
		if(textStatus==="timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});
}
