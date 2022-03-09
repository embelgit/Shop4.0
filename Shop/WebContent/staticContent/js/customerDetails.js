
function customerDetails()
{
	var contactno = document.getElementById("contactNo").value;
	var contactNoLength = contactno.length;
	var zipCode = document.getElementById("zipCode").value;
	var zipCodeLength = zipCode.length;
	var emailId = document.getElementById("emailId").value;
	var gstno = document.getElementById("gstno").value;
		
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
	
	if(LName == "")
	{
		var msg="Please Enter Last Name";
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
	
	params["methodName"] = "customerDetails";
	
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

function reset()
{
   document.cstd.reset();	

}

/*************** Edit Credit Customer Details **********/
function getCustomerDetails(){
	var params= {};
	
	var input = document.getElementById('creditCustomer'),
     list = document.getElementById('cust_drop'), i,fkRootCustId;
	 		for (i = 0; i < list.options.length; ++i)
	 		{
			     if (list.options[i].value === input.value)
			     {
			    	 fkRootCustId = list.options[i].getAttribute('data-value');
			     }
	 		}
		
	$("#firstName").append($("<input/>").attr("value","").text());
	$("#middleName").append($("<input/>").attr("value","").text());
	$("#lastName").append($("<input/>").attr("value","").text());
	$("#address").append($("<input/>").attr("value","").text());
	$("#contactNo").append($("<input/>").attr("value","").text());
	$("#emailId").append($("<input/>").attr("value","").text());
	$("#zipCode").append($("<input/>").attr("value","").text());
	
	params["creditCustomer"]= fkRootCustId;
	params["methodName"] = "getCreditCustomerDetailsToEdit";
	
	$.post('/Shop/jsp/utility/controller.jsp',params,function(data){
		
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		$.each(jsonData,function(i,v)
				{
				  document.getElementById("firstName").value = v.firstName;
			      document.getElementById("middleName").value = v.middleName;
			      document.getElementById("lastName").value = v.lastName;
			      document.getElementById("address").value = v.address;
			      document.getElementById("contactNo").value = v.contactNo;
			      document.getElementById("emailId").value = v.email;
			      document.getElementById("zipCode").value = v.zipCode;
			      document.getElementById("gstno").value = v.gstno;
				});
			}).error(function(jqXHR, textStatus, errorThrown){
				if(textStatus==="timeout") {

				}
			});
}

function customAlert(msg)
{
	var msg=msg;
	var dialog = bootbox.dialog({
	message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
	closeButton: false
	});			
	setTimeout(function() {
		dialog.modal('hide');
	}, 1500);
}


function updateCustomerDetailsValidation()
{
	var creditCustomer = $('#creditCustomer').val();
    var lastName=  $('#lastName').val();
    var contactNo=  $('#contactNo').val();
   
/*  	if(creditCustomer == "")
	{
		
		alert("Please Select Customer Name");
		return false;
	}*/
	
	/*var msg="Please Select Customer Name ";
		var dialog = bootbox.dialog({
	    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
	    closeButton: false
		});
		
		setTimeout(function() {
			dialog.modal('hide');
				
		}, 1500);
		
		return false;*/
	
	if(creditCustomer == "")
	{
		var msg="Please Select Customer Name";
		
		var dialog = bootbox.dialog({
			//title: "Embel Technologies Says :",
		    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		    closeButton: false
		});
		
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		
		return false;
	}	
	
	
	/*
	if(lastName== "")
	{		
		alert("Please Enter Customer Last Name");
		return false;
	}
	
	if(contactNo== "")
	{		
		alert("Please Enter Contact No");
		return false;
	}else{
				
		var phoneno = /^\d{10}$/;
		if(document.cstd1.contactNo.value.match(phoneno)){
			
		}else{
			
			alert("Please Enter Valid Contact No");
			return false;
		}	
	}
	*/
	updateCustomerDetails();
	
	/*if(firstName == "")
	{
		msg="Enter Customer Name";
		customAlert(msg);
		return false;
	}
	else if(firstName.value != "")
	{
		var letterNumber = /^[a-zA-Z ]+$/;
		if(firstName.match(letterNumber))
		{}
		else
			{
				msg="Enter Characters only in First Name."
				customAlert(msg);
				return false;
			}
	}
	
	if(address != "" && address != "N/A")
	{
		var checkAddress = /^[a-z0-9 ]+$/;
		if(address.match(checkAddress))
		{}
		else
		{
			msg="Enter Please Enter Valid Address";
			customAlert(msg);
			return false;
		}
	}
	
	if(contactNo.length > Number(0) && contactNo != "0")
	{
	if(contactNo.length > Number(10) || contactNo.length < Number(10))
		{
			var msg="Please Enter Valid 10 Digit Mobile Number";
			customAlert(msg);
			return false;
		}
	}
	
	if(gstno != "" && gstno != "N/A")
	 {
		 var gstMatch = /^([0]{1}[1-9]{1}|[1-2]{1}[0-9]{1}|[3]{1}[0-7]{1})([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$/g;
		 if(gstno.match(gstMatch))
		 {}
		else
		{
			var msg="Please Enter Valid GST Number";
			customAlert(msg);			
			return false;
		}
	 }
	
	if(emailId != "" && emailId != "N/A")
	 {
		var letterNumber = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if(emailId.match(letterNumber))
		{}
		else
		{
			var msg="Please Enter Valid E-mail Address";
			customAlert(msg);
			return false;
		}
	}		
	
	if(zipCode.length > Number(0) && zipCode.value != "0")
	{
		if(document.cstd1.zipCode.value.length > Number(6) || document.cstd1.zipCode.value.length < Number(6))
		{
			var msg="Please Enter Valid 6 Digit Zip Code";
			customAlert(msg);
			return false;
		}
	}
	*/

}


function updateCustomerDetails(){

	//document.cstd1.updtbtn.disabled = true;
	document.getElementById("updtbtn").disabled=true;
	
	var input = document.getElementById('creditCustomer'),
    list = document.getElementById('cust_drop'),
    	i,fkRootCustId;
	 		for (i = 0; i < list.options.length; ++i) {
			     if (list.options[i].value === input.value) {
			    	 fkRootCustId = list.options[i].getAttribute('data-value');
			     }
	 		}
	
	//var customerId = document.getElementById("customerId").value;
	
	var fullName = $('#creditCustomer').val();
	var firstName = $('#firstName').val();
	var middleName = $('#middleName').val();
	var lastName = $('#lastName').val();		
	var address = $('#address').val();
	var contactNo = $('#contactNo').val();
	var gstNo = $('#gstno').val();
	var emailId = $('#emailId').val();
	var zipCode = $('#zipCode').val();
	
	
	var params = {};
	
	params["customerId"] = fkRootCustId;
	
	params["fullName"] = fullName;
	params["firstName"] = firstName;	
	params["middleName"] = middleName;
	params["lastName"] = lastName;
	params["address"] = address;
	params["contactNo"] =contactNo;
	params["contactNo"] =contactNo;
	params["gstNo"] =gstNo;
	params["emailId"] = emailId;
	params["zipCode"] = zipCode;
	
	
	
	params["methodName"] = "updateCreditCustomerDetails";

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
				if(document.cstd1)
				{
					document.cstd1.reset();
				}	
				document.getElementById("updtbtn").disabled=false;
			}
 	    	).error(function(jqXHR, textStatus, errorThrown){
 	    		
 	    		/*alert("Data Added Successfully..");
 	    		location.reload();
 				document.ccd.btn.disabled =false;*/
 	    		
 	    		if(textStatus==="timeout") {
 	    			$(loaderObj).hide();
 	    			$(loaderObj).find('#errorDiv').show();
 	    		}
 	    	});


}

//

function customerDetailscredit()
{
	var contactno = document.getElementById("contactNo").value;
	var contactNoLength = contactno.length;
	var zipCode = document.getElementById("zipCode").value;
	var zipCodeLength = zipCode.length;
	var emailId = document.getElementById("emailId").value;
	var gstno = document.getElementById("gstno").value;
		
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
	
	if(LName == "")
	{
		var msg="Please Enter Last Name";
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
		
	}
	    custDetailscredit();	
}						   	        	 

function custDetailscredit()
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
	
	var params = {};
	
	if(middleName=="" ||middleName==null ||middleName==undefined )
	{
		middleName="NA";
	}
	if(address=="" ||address==null ||address==undefined)
	{
		address="N/A";
	}
	if(gstno=="" ||gstno==null ||gstno==undefined)
	{
		gstno="N/A";
	}
		
	params["firstName"] =firstName;
	params["middleName"] =middleName;
	params["lastName"] =lastName;
	params["address"] = address;
	params["contactNo"] =contactNo;
	params["emailId"] = emailId;
	params["zipCode"] = zipCode;
	params["gstno"] = gstno;
	params["methodName"] = "customerDetails";
	
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