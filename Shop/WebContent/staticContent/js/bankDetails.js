function bankDetailsValidate(){
	
	var bankName = document.getElementById("bankName").value;
	var accountNo = document.getElementById("accountNo").value;
	var ifscCode = document.getElementById("ifscCode").value;
	
	if(bankName == "")
	{
		var msg="Please Enter Bank Name";
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
	}else{
		
		//var bankNmcheck = /^[0-9a-zA-Z]+$/;
		var bankNmcheck = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/;
		if(document.cstd.bankName.value.match(bankNmcheck)){
			
		}else{
			
			var msg="Please Enter Valid Bank Name";
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
	
	if(accountNo == "")
	{
		var msg="Please Enter Account Number";
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
	}else{
		
		var accNocheck = /^[0-9]+$/;
		if(document.cstd.accountNo.value.match(accNocheck)){
			
		}else{
			
			var msg="Please Enter Valid Account Number";
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
	/*
	if(ifscCode == "")
	{
		var msg="Please Enter IFSC Code";
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
	}else{
		
		var bankNmcheck = /^[0-9a-zA-Z]+$/;
		if(document.cstd.ifscCode.value.match(bankNmcheck)){
			
		}else{
			
			var msg="Please Enter Valid IFSC Code";
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
	
	bankDetailsAdd();
}

function bankDetailsAdd(){
	
	document.getElementById("save1").disabled=true;
	
	var bankName = $('#bankName').val();
	var accountNo = $('#accountNo').val();
	var ifscCode = $('#ifscCode').val();
	var branchName = $('#branchName').val();
	var accountHolderName  = $('#accountHolderName').val();
	var contactNo = $('#contactNo').val();
	var address = $('#address').val();
	
	var params = {};
	
	if(ifscCode=="" || ifscCode==null || ifscCode=="undefined" )
	{
		ifscCode="0";
	}
	
	if(branchName=="" || branchName==null || branchName=="undefined" )
	{
		branchName="N/A";
	}
	if(accountHolderName=="" || accountHolderName==null || accountHolderName=="undefined" )
	{
		accountHolderName="N/A";
	}
	if(contactNo=="" || contactNo==null || contactNo=="undefined" )
	{
		contactNo="0";
	}
	if(address=="" || address==null || address=="undefined" )
	{
		address="N/A";
	}
	
	params["bankName"] =bankName;
	params["accountNo"] =accountNo;
	params["ifscCode"] =ifscCode;
	params["branchName"] = branchName;
	params["accountHolderName"] =accountHolderName;
	params["contactNo"] = contactNo;
	params["address"] = address;
	
	params["methodName"] = "addbankDetails";
	
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