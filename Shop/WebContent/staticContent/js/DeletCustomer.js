function delCustomer(){
	
	if(document.delCust.delCustName.value == "")
	{
		alert("Please Enter Customer Name");
		return false;
	}	
	/*var letterNumber = /^[a-zA-Z]+$/;
	if(document.delCust.delCustName.value.match(letterNumber))
	{*/
		deleteCustomer();

	
	/*else
	{
		alert("Enter Alphabates And Numbers Only in Godown name field..!!");
		return false;
	}	*/
}

function deleteCustomer(){
	
	/*var input = document.getElementById('delCustName'),*/
/*    list = document.getElementById('custName_drop1'),
    i,delCustName;
	
	for (i = 0; i < list.options.length; ++i) {
    if (list.options[i].value === input.value) {
    	delCustName = list.options[i].getAttribute('data-value');
    	}
	}
	*/
	
	var name=$('#delCustName').val();
	var customerId=name.split(",")[0];
	var custname=name.split(",")[1];
	var params = {};
	
	/*params["delCustName"] =delCustName;*/
	
	params["customerId"] =customerId;
	
	params["methodName"] = "deletCustomer";
	
	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
 	    	{
 		if(data=="↵↵↵↵↵↵↵"){
 			alert("Not Added");
 		}
 		else{
 			alert(data);
 		}
 			location.reload();

 			}
 	    	).error(function(jqXHR, textStatus, errorThrown){
 	    		if(textStatus==="timeout") {
 	    			$(loaderObj).hide();
 	    			$(loaderObj).find('#errorDiv').show();
 	    		}
 	    	});
	
}