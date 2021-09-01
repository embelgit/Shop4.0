function delProduct(){
	
	if(document.delPro.delProName.value == "")
	{
		alert("Please Enter Product Name");
		return false;
	}	
	/*var letterNumber = /^[a-zA-Z]+$/;
	if(document.delCust.delCustName.value.match(letterNumber))
	{*/
		deleteProduct();

	
	/*else
	{
		alert("Enter Alphabates And Numbers Only in Godown name field..!!");
		return false;
	}	*/
}

function deleteProduct(){
	
	var input = document.getElementById('delProName'),
    list = document.getElementById('proName_drop1'),
    i,delProName;

	for (i = 0; i < list.options.length; ++i) {
    if (list.options[i].value === input.value) {
    	delProName = list.options[i].getAttribute('data-value');
    	}
	}
	
	var params = {};
	
	params["delProName"] =delProName;
	
	params["methodName"] = "deleteProduct";
	
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