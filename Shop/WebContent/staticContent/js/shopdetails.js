function shopDetails(){
		
	if(document.catd.shopName.value == "")
	{
		var msg="Please Enter Shop Name";
		var dialog = bootbox.dialog({
			message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		    closeButton: false
		});
		
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
				
		return false;
	}
	else
	{
		var letterNumber = /^[0-9a-zA-Z, ]+$/;
		if(document.catd.shopName.value.match(letterNumber))
		{
			
		}
		else
		{
			var msg="Enter Valid Shop Name Field";
			var dialog = bootbox.dialog({
				message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
			    closeButton: false
			});
			
			setTimeout(function() {
				dialog.modal('hide');
			}, 1500);
			
			return false;
		}
	}
	
	if(document.catd.contactNumber.value == "")
	{
		
		var msg="Please Enter Contact Number";
		var dialog = bootbox.dialog({
			message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		    closeButton: false
		});
		
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		
		return false;
	}
	
	var letterNumber = /^[0-9]{10}$/;
	if(document.catd.contactNumber.value.match(letterNumber))
	{	
		if(document.catd.gstNo.value == "")
		{
			var msg="Please Enter GST Number";
			var dialog = bootbox.dialog({
				message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
			    closeButton: false
			});
			
			setTimeout(function() {
				dialog.modal('hide');
			}, 1500);
			
			return false;
		}
		
		if(document.catd.address.value == "")
		{
			
			var msg="Please Enter Address";
			var dialog = bootbox.dialog({
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
		
		var msg="Please Enter Valid 10 Digit Contact Number";
		var dialog = bootbox.dialog({
			message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		    closeButton: false
		});
		
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		
		return false;
	}
	
	if(document.catd.wholesalelicno.value == "")
	{
		var msg="Please Enter Wholesale Licence Number";
		var dialog = bootbox.dialog({
			message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		    closeButton: false
		});
		
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		
		return false;
	}
	else
	{
		var letterNumber = /^[0-9a-zA-Z, ]+$/;
		if(document.catd.wholesalelicno.value.match(letterNumber))
		{
			
		}
		else
		{
			var msg="Enter Valid Wholesale Licence Number";
			var dialog = bootbox.dialog({
				message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
			    closeButton: false
			});
			
			setTimeout(function() {
				dialog.modal('hide');
			}, 1500);
			
			return false;
		}
	}
	
	if(document.catd.shoplicno.value == "")
	{
		var msg="Please Enter Shop Licence Number";
		var dialog = bootbox.dialog({
			message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		    closeButton: false
		});
		
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
				
		return false;
	}
	else
	{
		var letterNumber = /^[0-9a-zA-Z, ]+$/;
		if(document.catd.shoplicno.value.match(letterNumber))
		{
			
		}
		else
		{
			var msg="Enter Valid  Shop Licence Number";
			var dialog = bootbox.dialog({
				message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
			    closeButton: false
			});
			
			setTimeout(function() {
				dialog.modal('hide');
			}, 1500);
			
			return false;
		}
	}
	
	if(document.catd.footershopname.value == "")
	{
		var msg="Please Enter Footer Shop Name";
		var dialog = bootbox.dialog({
			message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		    closeButton: false
		});
		
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
				
		return false;
	}
	else
	{
		var letterNumber = /^[0-9a-zA-Z, ]+$/;
		if(document.catd.footershopname.value.match(letterNumber))
		{
			
		}
		else
		{
			var msg="Enter Valid Footer Shop Name";
			var dialog = bootbox.dialog({
				message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
			    closeButton: false
			});
			
			setTimeout(function() {
				dialog.modal('hide');
			}, 1500);
			
			return false;
		}
	}
	
	shopDetails1();
	
	/*var letterNumber = /^[0-9a-zA-Z, ]+$/;
	if(document.catd.shopName.value.match(letterNumber))
	{
		shopDetails1();
	}	
	else
	{
		alert("Enter Alnumerics Only in shop name field..!!");
		return false;
	}
	*/	
}

function shopDetails1(){
	//document.getElementById('save').disabled = true;
	 document.getElementById("save").disabled = true;
	//document.catd.btn.disabled =true;
	
		var shopName = $('#shopName').val();
		var contactNumber = $('#contactNumber').val();
		var gstNo = $('#gstNo').val();
		var address = $('#address').val();
		var wholesalelicno = $('#wholesalelicno').val();
		var shoplicno = $('#shoplicno').val();
		var footershopname = $('#footershopname').val();
		
		var params = {};
		
		params["shopName"] = shopName;
		params["contactNumber"] = contactNumber;
		params["gstNo"] = gstNo;
		params["address"] = address;
		params["wholesalelicno"] = wholesalelicno;
		params["shoplicno"] = shoplicno;
		params["footershopname"] = footershopname;
		
		
		/*params["subCategoryName"] =subCategoryName;*/
		
		
		params["methodName"] = "shopDetails";
	
	 	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
	 	    	{
	        var msg="Data Added Sucessfully";
			var dialog = bootbox.dialog({
		    message: '<p class="text-center">'+msg.fontcolor("green").fontsize(5)+'</p>',
		    closeButton: false
			});
			
			setTimeout(function() {
				dialog.modal('hide');
				location.reload();
			}, 1500);	
	 				document.prd.save1.disabled =false;
	 			}
	 	    	).error(function(jqXHR, textStatus, errorThrown){
	 	    		if(textStatus==="timeout") {
	 	    			$(loaderObj).hide();
	 	    			$(loaderObj).find('#errorDiv').show();
	 	    		}
	 	    	});

}

function getShopDetails(){
	
	var params= {};

	var input = document.getElementById('shop'),
	    list =  document.getElementById('shop_drop'),
	            i,fkRootShopId;
	
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			fkRootShopId = list.options[i].getAttribute('data-value');
		}
	}

	$("#shopName").append($("<input/>").attr("value","").text());
	$("#contactNumber").append($("<input/>").attr("value","").text());
	$("#gstNo").append($("<input/>").attr("value","").text());
	$("#address").append($("<input/>").attr("value","").text());
	$("#wholesaleNo").append($("<input/>").attr("value","").text());
	$("#shopLicNo").append($("<input/>").attr("value","").text());
	$("#footername").append($("<input/>").attr("value","").text());
	
	params["ShopId"]= fkRootShopId;

	params["methodName"] = "getShopDetailsToEdit";

	$.post('/Shop/jsp/utility/controller.jsp',params,function(data){

		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		$.each(jsonData,function(i,v)
				{
			document.getElementById("shopName").value = v.shopName;
			document.getElementById("contactNumber").value = v.contactNumber;
			document.getElementById("gstNo").value = v.gstNo;
			document.getElementById("address").value = v.address;
			document.getElementById("wholesaleNo").value = v.wholesalelicno;
			document.getElementById("shopLicNo").value = v.shoplicno;
			document.getElementById("footername").value = v.footershopname;
			
				});
	}).error(function(jqXHR, textStatus, errorThrown){
		if(textStatus==="timeout") {

		}
	});
}

// update shop details
function updateshopDetails(){
	
	if(document.shop1.shop.value == "")
	{
		var msg="Please Select Shop Name";
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
		/*alert("Please Select Shop Name.");
		return false;*/
	}
	if(document.shop1.shopName.value == "")
	{
		var msg="Enter Shop Name";
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
		/*alert("Enter Shop Name.");
		return false;*/
	}
	if(document.shop1.contactNumber.value == "")
	{
		var msg="Enter Contact No.";
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
		/*alert("Enter Contact No.");
		return false;*/
	}else{
		 var contactNumber = /^[0-9]{10}$/;
		 if(document.shop1.contactNumber.value.match(contactNumber))
			 { }
		 else{
				var msg="Enter 10 digit Numbers Only in Contact No.";
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
			    /*alert("Enter 10 digit Numbers Only in Contact No..!!");
				return false;*/
		 }	
	}
	if(document.shop1.gstNo.value == "")
	{
		var msg="Enter Shop GST No.";
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
		/*alert("Enter Shop GST No.");
		return false;*/
	}
	if(document.shop1.address.value == "")
	{
		var msg="Enter Shop Address";
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
		/*alert("Enter Shop Address ");
		return false;*/
	}
	if(document.shop1.wholesaleNo.value == "")
	{
		var msg="Enter Shop Wholesale Lic No";
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
		/*alert("Enter Shop Wholesale Lic No ");
		return false;*/
	}
	if(document.shop1.shopLicNo.value == "")
	{
		var msg="Enter Shop Lic No";
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
		/*alert("Enter Shop Lic No ");
		return false;*/
	}
	if(document.shop1.footername.value == "")
	{
		var msg="Enter Shop Footer Name";
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
		/*alert("Enter Shop Footer Name ");
		return false;*/
	}
		
	updtshopDetails();	
}


function updtshopDetails(){

document.getElementById("shpedtbtn").disabled = true;
	
	var input = document.getElementById('shop'),
        list = document.getElementById('shop_drop'),
    	       i,fkRootShopId;
	
	for (i = 0; i < list.options.length; ++i) {
	     if (list.options[i].value === input.value) {
	    	 fkRootShopId = list.options[i].getAttribute('data-value');
	     }
	}
	
	var shopName = $('#shopName').val();
	var contactNumber = $('#contactNumber').val();
	var gstNo = $('#gstNo').val();				
	var address = $('#address').val();
	var wholesaleNo = $('#wholesaleNo').val();
	var shopLicNo = $('#shopLicNo').val();
	var footername = $('#footername').val();
	
    var params = {};
	
	params["fkRootShopId"] = fkRootShopId;
	params["shopName"] = shopName;	
	params["contactNumber"] = contactNumber;
	params["gstNo"] = gstNo;
	params["address"] = address;
	params["wholesaleNo"] =wholesaleNo;
	params["shopLicNo"] = shopLicNo;
	params["footername"] = footername;
	
	params["methodName"] = "updateShopDetails";
	
	$.post('/Shop/jsp/utility/controller.jsp',params,function(data){
		alert(data);
			if(document.shop1)
			{
				document.shop1.reset();
			}	
			
			document.getElementById("shpedtbtn").disabled = false;
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


function reset()
{
   document.catd.reset();	
}