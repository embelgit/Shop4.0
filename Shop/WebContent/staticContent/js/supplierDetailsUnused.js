function supplierDetailValidate()
{	
	var dealerName = $("#dealerName").val();
	var personName = $("#personName").val();
	var city = $("#city").val();
	var tinNo = $("#tinNo").val();
	var contactNo = $("#contactNo").val();
	var contactNoLength = contactNo.length;
	var landline = $("#landline").val();
	var landlineLength = landline.length;
	var emailId = $("#emailId").val();
	var address = $("#address").val();
	
	
	var letterNumber = /^[a-zA-Z, / ]+$/;
	if(dealerName != null && dealerName != "" && dealerName != " ")
		{
		if(dealerName.match(letterNumber))
			{
			var letterNumber = /^[a-zA-Z, / ]+$/;
			if(personName != null && personName != "" && personName != " ")
				{
				if(personName.match(letterNumber))
					{
					if(contactNoLength>Number(0))
						{
						if(contactNoLength > Number(10) || contactNoLength < Number(10))
							{
							
								var msg="Please Enter Valid 10 Digit Mobile Number";
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
						}
					
					if(landlineLength>Number(0))
					{
					if(landlineLength > Number(10) || landlineLength < Number(10))
					{
						
						var msg="Please Enter Valid 10 Digit Landline Number";
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
					}
					
					if(emailId == "" || emailId == undefined || emailId == null || emailId == " ")
					{
						
					}
					else
					{
						var letterNumber = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
						if(emailId.match(letterNumber))
						{
							
						}
						else
						{
							var msg="Please Enter Valid E-mail Address";
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
					}
						if(city != null && city != "" && city != " ")
						{
						var letterNumber = /^[a-zA-Z, ]+$/;
						if(city.match(letterNumber))
							{
							if(tinNo != null && tinNo != "")
								
							{
									
								/*var gstMatch = /^([0]{1}[1-9]{1}|[1-2]{1}[0-9]{1}|[3]{1}[0-7]{1})([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$/g;
									
								if(tinNo.match(gstMatch))
									
								{*/						
									
									if(address != "")
									{
										var letterNumber = /^[0-9a-zA-Z ]+$/;
										if(address.match(letterNumber))
										{
											
										}
										else
										{											
											var msg="Please Enter Customer's Valid Address";
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
									}								
								
									
								/*}*/
									/*else
									{
										var msg="Please Enter Valid GST Number";
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
									}*/
								}
							else
								{
								
									/*var msg="Please Enter GST No";
									var dialog = bootbox.dialog({
										//title: "Embel Technologies Says :",
									    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
									    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
									    closeButton: false
									});
									
									setTimeout(function() {
										dialog.modal('hide');
									}, 1500);
									
									return false;*/
								}
							}
						else
							{							
								var msg="Please Enter Valid City Name";
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
						
						}
					else
						{						
							var msg="Please Enter City";
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
					}
				else
				{
					var msg="Please Enter Valid Person Name";
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
				}else
					{
						var msg="Please Enter Person Name";
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
				}
		else
			{
			
				var msg="Please Enter Valid Supplier Name";
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
		}
	else
		{
			var msg="Please Enter Supplier Name";
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
//	supDetails();		
}

function supplierValidate()
{	
	var dealerName = $("#dealerName").val();
	if(dealerName=="" ||dealerName==null ||dealerName==undefined )
	{
			alert("Please enter supplier name");
			return false;
	}
	supDetails();
}
function supDetails(){

	//document.spld.btn.disabled = true;
	//document.spld.save.disabled =false;
	//document.getElementById("save").disabled = true;
	document.getElementById("save").disabled = true;
	
				var dealerName = $('#dealerName').val();
				var personName = $('#personName').val();
				var contactNo = $('#contactNo').val();
				var landline = $('#landline').val();
				var emailId = $('#emailId').val();
				var tinNo = $('#tinNo').val();
				var city = $('#city').val();
				var address = $('#address').val();
				
				
				var accNo = $('#accNo').val();
				var accName = $('#accName').val();
				var ifsc = $('#ifsc').val();
				var upi_id = $('#upi_id').val();
				var openbal = $('#openbal').val();
				
				var params = {};
				
				if(personName=="" ||personName==null ||personName==undefined )
				{
					personName="NA";
				}
				if(city=="" ||city==null ||city==undefined )
				{
					city="NA";
				}
				if(accNo=="" ||accNo==null ||accNo==undefined )
				{
					accNo="0";
				}
				if(accName=="" ||accName==null ||accName==undefined)
				{
					accName="N/A";
				}
				
				if(ifsc=="" || ifsc==null || ifsc==undefined )
				{
					ifsc="0";
				}
				
				
				if(dealerName=="" ||dealerName==null ||dealerName==undefined)
				{
					dealerName="N/A";
				}
				
				if(contactNo=="" ||contactNo==null ||contactNo==undefined)
				{
					contactNo="00";
				}
				if(landline=="" || landline==null ||landline==undefined)
				{
					landline="00";
				}
				if(emailId=="" || emailId==null || emailId==undefined)
				{
					emailId="N/A";
				}
				if(address=="" || address==null || address==undefined)
				{
					address="N/A";
				}
				if(tinNo=="" || tinNo==null || tinNo==undefined)
				{
					tinNo="N/A";
				}
				
				if(upi_id=="" || upi_id==null || upi_id==undefined)
				{
					upi_id="N/A";
				}
				if(openbal=="" || openbal==null || openbal==undefined)
				{
					openbal=0;
				}
				params["dealerName"] = dealerName;
				params["personName"] =personName;
				params["contactNo"] = contactNo;
				params["landline"] =landline;
				params["emailId"] = emailId;
				params["tinNo"] = tinNo;
				params["city"] = city;
				params["address"] = address;
				params["accNo"] = accNo;
				params["accName"] = accName;
				params["ifsc"] = ifsc;
				params["upi_id"] = upi_id;			
				params["openbal"] = openbal;
				params["methodName"] = "supplierDetails";

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


function reset()
{
   document.spld.reset();	

}


/********* Edit Supplier Details ************/
function getSupplierDetails(){
	var params= {};
	
	var input = document.getElementById('supplier'),
     list = document.getElementById('sup_drop'),
     	i,fkRootSupId;
	 		for (i = 0; i < list.options.length; ++i) {
			     if (list.options[i].value === input.value) {
			    	 fkRootSupId = list.options[i].getAttribute('data-value');
			     }
	 		}
	
	$("#dealerName").append($("<input/>").attr("value","").text());
	$("#personName").append($("<input/>").attr("value","").text());
	$("#contactNo").append($("<input/>").attr("value","").text());
	$("#landline").append($("<input/>").attr("value","").text());
	$("#emailId").append($("<input/>").attr("value","").text());
	$("#city").append($("<input/>").attr("value","").text());
	$("#tinNo").append($("<input/>").attr("value","").text());
	$("#address").append($("<input/>").attr("value","").text());
	
	
	
	params["SupplierId"]= fkRootSupId;
	params["methodName"] = "getSupplierDetailsToEdit";
	
	$.post('/Shop/jsp/utility/controller.jsp',params,function(data){
		
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		$.each(jsonData,function(i,v)
				{
				  document.getElementById("dealerName").value = v.dealerName;
			      document.getElementById("personName").value = v.personName;
			      document.getElementById("contactNo").value = v.contactNo;
			      document.getElementById("landline").value = v.landline;
			      document.getElementById("emailId").value = v.email;
			      document.getElementById("city").value = v.city;
			      document.getElementById("tinNo").value = v.tin;
			      document.getElementById("address").value = v.address;
			   
		      
				});
			}).error(function(jqXHR, textStatus, errorThrown){
				if(textStatus==="timeout") {

				}
			});
 	    	
}
function updateSupplierDetails()
{
	var contactNo = $("#contactNo").val();
	var contactNoLength = contactNo.length;
		
	if(document.spld1.supplier.value == "")
	{
		alert("Please Select Supplier Name");
		return false;
	}
	
	/*if(document.spld1.contactNo.value == "")
	{
		alert("Please Enter Contact No");
		return false;
	}else{
				
		var phoneno = /^\d{10}$/;
		if(document.spld1.contactNo.value.match(phoneno)){
			
		}else{
			
			alert("Please Enter Valid Contact No");
			return false;
		}	
	*/
	//}
	
	
addUpdateSupplierDetails();
	
}
function addUpdateSupplierDetails(){
	
	//document.spld1.btn.disabled = true;
	
	var input = document.getElementById('supplier'),
    list = document.getElementById('sup_drop'),
    	i,fkRootSupId;
	 		for (i = 0; i < list.options.length; ++i) {
			     if (list.options[i].value === input.value) {
			    	 fkRootSupId = list.options[i].getAttribute('data-value');
			     }
	 		}
	
	//var customerId = document.getElementById("customerId").value;
	
	var dealerName = $('#dealerName').val();
	var personName = $('#personName').val();
	var contactNo = $('#contactNo').val();				
	var landline = $('#landline').val();
	var emailId = $('#emailId').val();
	var city = $('#city').val();
	var tinNo = $('#tinNo').val();
	var address = $('#address').val();
	//var gstMatch = /^([0]{1}[1-9]{1}|[1-2]{1}[0-9]{1}|[3]{1}[0-7]{1})([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$/g;

	
	
	var params = {};
	
	if(dealerName=="" |dealerName==null |dealerName=="undefined" )
	{
		//alert("Enter Supplier Name");
		dealerName="N/A";
	}
	
	if(personName=="" |personName==null |personName=="undefined" )
	{
		//alert("Enter Person Name");
		personName="N/A";
	}
	
	if(city=="" |city==null |city=="undefined" )
	{
		//alert("Enter City");
		city="N/A";
		//return false;
	}
	/*if(tinNo != null && tinNo != "")
	{
		
	}	
	else
	{
		var msg="Please Enter GST Number";
		alert(msg);
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
	}	*/
	
	params["supplierId"] = fkRootSupId;
	
	params["dealerName"] = dealerName;	
	params["personName"] = personName;
	params["contactNo"] = contactNo;
	params["landline"] = landline;
	params["emailId"] =emailId;
	params["city"] = city;
	params["tinNo"] = tinNo;
	params["address"] = address;
	
	
	
	params["methodName"] = "updateSupplierDetails";

	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
			{
				alert(data);
				if(document.spld1)
				{
					document.spld1.reset();
				}	
				document.spld1.btn.disabled =false;
				
			}).error(function(jqXHR, textStatus, errorThrown){
 	    		
 	    		if(textStatus==="timeout") {
 	    			$(loaderObj).hide();
 	    			$(loaderObj).find('#errorDiv').show();
 	    		}
 	    	});
}

function getSuppliermailID()
{	
	var input = document.getElementById('supplier'),
	list = document.getElementById('sup_drop'),
		   i,supplierID;

	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			supplierID = list.options[i].getAttribute('data-value');
		}
	}
	
	var supplierID = supplierID;
	
	$("#mailid").empty();
	$("#mailid").append($("<input/>").attr("value","").text());
	
	var params= {};
	params["supplierID"]= supplierID;  

	params["methodName"] = "getMailIdbySupplierName";

	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
		{
	var jsonData = $.parseJSON(data);
	//var jsonData = jsonData.list;
	$.each(jsonData,function(i,v)
	{
		document.getElementById("mailid").value = v.email;
	});
	}).error(function(jqXHR, textStatus, errorThrown){
			if(textStatus==="timeout") {

			}
		});
}
