/*----------------------------ADD PARTNER DETAILS TO DATABASE-------------------------*/
function partnerDetailsV(){
	
	var partnerName = $('#partnerName').val();
	var contactNo = $('#contactNo').val();
	var alternateNo = $('#alternateNo').val();
	var emailId = $('#emailId').val();
	var city = $('#city').val();
	var address = $('#address').val();
	
	if(partnerName == "" || partnerName==null || partnerName==undefined)
	{
		alert("Please Enter Partner Name");
//		document.getElementById("save").disabled = false;
		return false;
	}
	if(contactNo=="" || contactNo==null || contactNo==undefined)
	{
		contactNo = 0;
	}	
	if(alternateNo=="" || alternateNo==null || alternateNo==undefined)
	{
		alternateNo =0;
	}	
	if(address=="" || address==null || address==undefined)
	{
		address="N/A";
	}
	/*
	if(partnerName == "" || partnerName==null || partnerName=="undefined")
	{
		alert("Please Enter Partner Name");
		document.getElementById("save").disabled = false;
		return false;
	}else{
		var check =  /^[a-zA-Z]+ [a-zA-Z]+$/;
		if(document.partnm.partnerName.value.match(check))
		{	}
		else
		{
			alert("Please Enter Valid Partner Name");
			document.getElementById("save").disabled = false;
			return false;
		}
	}*/
	/*
	if(contactNo=="" || contactNo==null || contactNo=="undefined" )
	{
		alert("Please Enter Contact Number");
		document.getElementById("save").disabled = false;
		return false;
	}else{
		var phno =  /^\d{10}$/;
		if(document.partnm.contactNo.value.match(phno))
		{	}
		else
		{
			alert("Please Enter Valid Contact Number");
			document.getElementById("save").disabled = false;
			return false;
		}
	}*/
	

	/*
	if(emailId=="" || emailId==null || emailId=="undefined" )
	{
		alert("Please Enter Email ID");
		document.getElementById("save").disabled = false;
		return false;
	}else{
		var emailIDcheck = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if(document.partnm.emailId.value.match(emailIDcheck))
		{	}
		else
		{
			alert("Please Enter Valid Email ID");
			document.getElementById("save").disabled = false;
			return false;
		}
	}*/
	/*
	if(city=="" || city==null || city=="undefined" )
	{
		alert("Please Enter City");
		document.getElementById("save").disabled = false;
		return false;
	}else{
		var checkCity =  /^[A-Za-z]+$/;
		if(document.partnm.city.value.match(checkCity))
		{	}
		else
		{
			alert("Please Enter Valid City Name");
			document.getElementById("save").disabled = false;
			return false;
		}
	}*/
	
	partnerDetails();
}

function partnerDetails()
{
	document.getElementById("save").disabled = true;

	var partnerName = $('#partnerName').val();
	var contactNo = $('#contactNo').val();
	var alternateNo = $('#alternateNo').val();
	var emailId = $('#emailId').val();
	var city = $('#city').val();
	var address = $('#address').val();
	
	if(contactNo=="" || contactNo==null || contactNo==undefined)
	{
		contactNo = 0;
	}
	if(emailId=="" || emailId==null || emailId==undefined)
	{
		emailId ="abc@g.com";
	}	
	if(city=="" || city==null || city==undefined)
	{
		city="N/A";
	}
	if(alternateNo=="" || alternateNo==null || alternateNo==undefined)
	{
		alternateNo =0;
	}	
	if(address=="" || address==null || address==undefined)
	{
		address="N/A";
	}
	
	var params = {};
	
	params["partnerName"] = partnerName;
	params["contactNo"] = contactNo;
	params["alternateNo"] =alternateNo;
	params["emailId"] = emailId;
	params["city"] = city;
	params["address"] = address;
					
	params["methodName"] = "partnerDetails";

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
			
			document.getElementById("save").disabled = false;
 			document.spld.btn.disabled =false;
 	}).error(function(jqXHR, textStatus, errorThrown){
 	    		if(textStatus==="timeout") {
 	    			$(loaderObj).hide();
 	    			$(loaderObj).find('#errorDiv').show();
 	    		}
 	    	});

}
/*----------------------------ONCLICK GET PARTNER DETAILS IN TEXT FIELD----------------------------*/
function getPartnerDetails(){
	var params= {};
	
	var input = document.getElementById('selectpartner'),
        list  = document.getElementById('part_drop'),
     	        i,fkRootPartId;
	for (i = 0; i < list.options.length; ++i) {
	     if (list.options[i].value === input.value) {
	    	 fkRootPartId = list.options[i].getAttribute('data-value');
	     }
	}
	$("#partnerName").append($("<input/>").attr("value","").text());
	$("#contactNo").append($("<input/>").attr("value","").text());
	$("#alternateNo").append($("<input/>").attr("value","").text());
	$("#emailId").append($("<input/>").attr("value","").text());
	$("#city").append($("<input/>").attr("value","").text());
	$("#address").append($("<input/>").attr("value","").text());
	
	params["PartnerId"]= fkRootPartId;
	params["methodName"] = "getPartnerDetailsToEdit";
	
	$.post('/Shop/jsp/utility/controller.jsp',params,function(data){
		
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		$.each(jsonData,function(i,v)
				{
				  document.getElementById("partnerName").value = v.partnerName;
			      document.getElementById("contactNo").value = v.contactNo;
			      document.getElementById("alternateNo").value = v.alternateContactNo;
			      document.getElementById("emailId").value = v.emailId;
			      document.getElementById("city").value = v.city;
			      document.getElementById("address").value = v.address;
			     
				});
			}).error(function(jqXHR, textStatus, errorThrown){
				if(textStatus==="timeout") {

				}
			});
 	    	
}

/*------------------------------UPDATE PARTNER DETAILS--------------------------*/
function updatePartnerDetailsV(){
	
	var selectpartner = $('#selectpartner').val();
	var partnerName = $('#partnerName').val();
	var contactNo = $('#contactNo').val();
	var alternateNo = $('#alternateNo').val();
	var emailId = $('#emailId').val();
	var city = $('#city').val();
	var address = $('#address').val();
	
	if(selectpartner == "" || selectpartner==null || selectpartner=="undefined")
	{
		alert("Please Select Partner Name");
		document.getElementById("save").disabled = false;
		return false;
	}
	if(partnerName == "" || partnerName==null || partnerName=="undefined")
	{
		alert("Please Enter Partner Name");
		document.getElementById("save").disabled = false;
		return false;
	}/*else{
		var check =  /^[a-zA-Z]+ [a-zA-Z]+$/;
		if(document.partnm.partnerName.value.match(check))
		{	}
		else
		{
			alert("Please Enter Valid Partner Name");
			document.getElementById("save").disabled = false;
			return false;
		}
	}*/
	
	if(contactNo=="" || contactNo==null || contactNo=="undefined" )
	{
		alert("Please Enter Contact Number");
		document.getElementById("save").disabled = false;
		return false;
	}/*else{
		var phno =  /^\d{10}$/;
		if(document.partnm.contactNo.value.match(phno))
		{	}
		else
		{
			alert("Please Enter 10 digit Valid Contact Number");
			document.getElementById("save").disabled = false;
			return false;
		}
	}*/
	if(alternateNo=="" || alternateNo==null || alternateNo=="undefined" )
	{
		alternateNo="00";
	}
	if(emailId=="" || emailId==null || emailId=="undefined" )
	{
		alert("Please Enter Email ID");
		document.getElementById("save").disabled = false;
		return false;
	}else{
		var emailIDcheck = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if(document.partnm.emailId.value.match(emailIDcheck))
		{	}
		else
		{
			alert("Please Enter Valid Email ID");
			document.getElementById("save").disabled = false;
			return false;
		}
	}
	if(city=="" || city==null || city=="undefined" )
	{
		alert("Please Enter City");
		document.getElementById("save").disabled = false;
		return false;
	}/*else{
		var checkCity =  /^[A-Za-z]+$/;
		if(document.partnm.city.value.match(checkCity))
		{	}
		else
		{
			alert("Please Enter Valid City Name");
			document.getElementById("save").disabled = false;
			return false;
		}*/
	
	if(address=="" || address==null || address=="undefined" )
	{
		address="N/A";
	}
	updatePartnerDetails();
}

function updatePartnerDetails() {
	
	var input = document.getElementById('selectpartner'),
        list  = document.getElementById('part_drop'),
    	        i,fkRootPartId;
	for (i = 0; i < list.options.length; ++i) {
	     if (list.options[i].value === input.value) {
	    	 fkRootPartId = list.options[i].getAttribute('data-value');
	     }
	}
	
	var partnerName = $('#partnerName').val();
	var contactNo = $('#contactNo').val();
	var alternateNo = $('#alternateNo').val();				
	var emailId = $('#emailId').val();
	var city = $('#city').val();
	var address = $('#address').val();
	
	var params = {};
	
	params["partnerId"] = fkRootPartId;
	
	params["partnerName"] = partnerName;	
	params["contactNo"] = contactNo;
	params["alternateNo"] = alternateNo;
	params["emailId"] = emailId;
	params["city"] =city;
	params["address"] = address;
	
	params["methodName"] = "updatePartnerDetails";

	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
	{
		alert(data);
		if(document.partnm)
		{
			document.partnm.reset();
		}	
		document.partnm.btn.disabled =false;
		
	}).error(function(jqXHR, textStatus, errorThrown){
		
		if(textStatus==="timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});
}