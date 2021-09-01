function customerDetails11111111()
{
	var contactno = document.getElementById("contactNo").value;
	var contactNoLength = contactno.length;
	var zipCode = document.getElementById("zipCode").value;
	var zipCodeLength = zipCode.length;
	var emailId = document.getElementById("emailId").value;
	var firmname = document.getElementById("firmname").value;
		
	var FName = document.getElementById("firstName").value;
	var LName = document.getElementById("lastName").value;
	
	if(FName == "")
	{
		var msg="Please Enter First Name";
		var dialog = bootbox.dialog({
			//title: "Embel Technologies Says :",
		    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
		    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		    closeButton: false
		});
		
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		
		return false;
	}
	
	if(firmname == "")
	{
		var msg="Please Enter Firm Name";
		var dialog = bootbox.dialog({
			//title: "Embel Technologies Says :",
		    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
		    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		    closeButton: false
		});
		
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		
		return false;
	}
	
	/*
	if(contactno == "")
	{
		var msg="Please Enter Contact Number";
		var dialog = bootbox.dialog({
			
		    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
		    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		    closeButton: false
		});
		
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		
		return false;
	}else{
		
		var phoneno = /^\d{10}$/;
		if(document.cstd.contactNo.value.match(phoneno)){
			
		}else{
			
			var msg="Please Enter Valid Contact Number";
			var dialog = bootbox.dialog({
				
			    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
			    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
			    closeButton: false
			});
			
			setTimeout(function() {
				dialog.modal('hide');
			}, 1500);
			
			return false;
		}
		
	}*/
	  //  custDetails();	
}						   	        	 


function customerDetails(){
	var FName = document.getElementById("firstName").value;

	
	if(FName == "")
	{
		var msg="Please Enter First Name";
		var dialog = bootbox.dialog({
			//title: "Embel Technologies Says :",
		    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
		    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		    closeButton: false
		});
		
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		
		return false;
	}
	custDetails();	
}

function custDetails()
{	
	document.getElementById("save1").disabled=true;
	
	var firstName = $('#firstName').val();
	var middleName = $('#middleName').val();
	var lastName = $('#lastName').val();
	var address = $('#address').val();
	var contactNo  = $('#contactNo').val();
	var gstno = $('#gstno').val();
	var emailId = $('#emailId').val();
	var zipCode = $('#zipCode').val();
	var firmname = $('#firmname').val();
	
	var params = {};
	
	if(firstName=="" || firstName==null || firstName==undefined)
	{
		firstName="NA";
	}	
	if(middleName=="" || middleName==null || middleName==undefined)
	{
		middleName="NA";
	}
	if(lastName=="" || lastName==null || lastName==undefined)
	{
		lastName="NA";
	}
	if(contactNo=="" || contactNo==null || contactNo==undefined)
	{
		contactNo=0;
	}
	if(address=="" || address==null || address==undefined)
	{
		address="N/A";
	}
	if(gstno=="" || gstno==null || gstno==undefined)
	{
		gstno=0;
	}
	
	if(emailId=="" || emailId==null || emailId==undefined)
	{
		emailId="abc@g.com";
	}
	if(zipCode=="" || zipCode==null || zipCode==undefined)
	{
		zipCode=0;
	}
	if(firmname=="" || firmname==null || firmname==undefined)
	{
		firmname="NA";
	}
	
	params["firstName"] =firstName;
	params["middleName"] =middleName;
	params["lastName"] =lastName;
	params["address"] = address;
	params["contactNo"] =contactNo;
	params["emailId"] = emailId;
	params["zipCode"] = zipCode;
	params["gstno"] = gstno;
	params["firmname"] = firmname;
	
	params["methodName"] = "cashcustomerDetails";
	
 	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
 	{
 		var msg=data;
		var dialog = bootbox.dialog({
	    message: '<p class="text-center">'+msg.fontcolor("green").fontsize(5)+'</p>',
	    closeButton: false
		});
		
		setTimeout(function() {
			dialog.modal('hide');
			location.reload();
		}, 1500);
 				document.cstd.btn.disabled = false;
 	}).error(function(jqXHR, textStatus, errorThrown){
 	    		if(textStatus==="timeout") {
 	    			$(loaderObj).hide();
 	    			$(loaderObj).find('#errorDiv').show();
 	    	}
    });
	
}