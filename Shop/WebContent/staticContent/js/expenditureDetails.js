/*
 * Name : Sonal Bharti
 * Date : 21/05/2017 
 * Method Name : expensePaymentValidation()
 * Reason : Credit Customer Validation in cashBook
 

function expensePaymentValidation() {

	var expenseName = $("#expenseName").val();
	var serviceProvider = $("#serviceProvider").val();
	var contactNumber = $("#contactNumber").val();
	var expCredit = $("#expCredit").val();
	var accountantName = $("#accountantName").val();

	if (expenseName != null && expenseName != "" && expenseName != " ") {
		if (serviceProvider != null && serviceProvider != ""
				&& serviceProvider != " ") {
			if (contactNumber != null && contactNumber != ""
					&& contactNumber != " ") {
				var phoneno = /^\d{10}$/;
				if (contactNumber.match(phoneno)) {
					if (accountantName != null && accountantName != ""
							&& accountantName != " ") {
						var onlyAlfabet = /^[a-zA-Z ]*$/;
						if (accountantName.match(onlyAlfabet)) {
							--if () {
								addExpense();
							} else {
								alert("Enter Accountant Name without Any Number and Special symbols");
							}
						} else {
							alert("Enter Accountant Name without Any Number and Special symbols");
						}
					} else {
						alert("Enter Accountant Name.");
					}

				} else {
					alert("Contact No Must be 10 digit.");
				}
			} else {
				alert("Enter Contact Number");
			}
		} else {
			alert("Enter Service Provider");
		}
	} else {
		alert("please Select Expenditure Name");
	}
}*/

//Adding expense detail
function addExpenseDetails(){
	
	var expenseName = $('#expenseName').val();
	var expenseType = $('#expensetype').val();

	
	if(document.expenseDetails.expenseName.value == "")
	{
		var msg="Please Enter Expense Name";
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

	
		var expenseType = $('#expensetype').val();
	
	if(expenseType == "select")
	{
		var msg="Please Select Expenditure Type";
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
	}	addExpense();
	
/*	if(document.expenseDetails.expenseName.value.match(letterNumber))
	{
		addExpense();
	}
	
	else
	{
		var msg="Enter Alphabates And Numbers Only in Expense name field";
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

}

function addExpense()
{	
	document.getElementById("save").disabled=true;

	//document.expenseDetails.btn.disabled = true;

	var expenseType = $('#expensetype').val();
	var expenseName = $('#expenseName').val();
	var description = $('#description').val();

	if(expenseType=="" || expenseType==null || expenseType== undefined){
		expenseType = "direct";
	}
	
	if(description=="" || description==null || description== undefined){
		description = "NA";
	}
	
	var params = {};

	params["expenseType"] = expenseType;
	params["expenseName"] = expenseName;
	params["description"] = description;

	params["methodName"] = "addExpenseDetails";

	$.post('/Shop/jsp/utility/controller.jsp', params, function(data) 
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
			
			document.expenseDetails.save.disabled = false;
		}
	    	).error(function(jqXHR, textStatus, errorThrown){
	    		if(textStatus==="timeout") {
	    			$(loaderObj).hide();
	    			$(loaderObj).find('#errorDiv').show();
	    		}
	    	});

}

function reset() {
	document.expenseDetails.reset();

}

function addExpenseForBillingAndGoodsReceive() {

	document.expenseDetails1.btn1.disabled = true;

	var expenseName = $('#expenseNameForBilling').val();

	var params = {};

	params["expenseName"] = expenseName;

	params["methodName"] = "addExpenseDetailsForBilling";

	$.post('/Shop/jsp/utility/controller.jsp', params, function(data) {
		alert(data);
		if (document.expenseDetails1) {
			document.expenseDetails1.reset();
		}
		document.expenseDetails1.btn1.disabled = false;
	}).error(function(jqXHR, textStatus, errorThrown) {
		if (textStatus === "timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});
}
function getAllExpenseName(){
	 
	var expenseType = $('#expensetype').val();
	
	$("#cat_drop").empty();
	$("#cat_drop").append($("<option></option>").attr("value","").text("Enter Expense Name"));
	
	var params = {};
	
	params["expenseType"] = expenseType;
	
	params["methodName"] = "getExpenseName";

	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
	{
		var count = 1;
		
		var jsonData = $.parseJSON(data);
		//var jsonData = jsonData.list;
		$.each(jsonData,function(i,v)
		{
			$("#cat_drop").append($("<option></option>").attr("value",(v.expenseName))); 
			count++;
				});
			}).error(function(jqXHR, textStatus, errorThrown){
				if(textStatus==="timeout") {

				}
			});
}