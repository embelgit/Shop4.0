function delSupplier(){
	
	if(document.delSup.supplier.value == "")
	{
		alert("Please Enter Customer Name");
		return false;
	}	
	/*var letterNumber = /^[a-zA-Z]+$/;
	if(document.delCust.delCustName.value.match(letterNumber))
	{*/
	deleteSupplier();

	
	/*else
	{
		alert("Enter Alphabates And Numbers Only in Godown name field..!!");
		return false;
	}	*/
}

function deleteSupplier(){
	
	var input = document.getElementById('supplier'),
    list = document.getElementById('sup_drop'),
    i,supplier;

	for (i = 0; i < list.options.length; ++i) {
    if (list.options[i].value === input.value) {
    	supplier = list.options[i].getAttribute('data-value');
    	}
	}
	
	var params = {};
	
	params["supplier"] =supplier;
	
	params["methodName"] = "deletSupplier";
	
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