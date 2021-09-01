function billCopyValidation()
{
	var billno = $("#billno").val();
	if(billno == "" || billno == null)
		{
			alert("Please Select Bill Numebr");		
		}
	else
		{
			
		}
}
function billCopy()
{
	document.getElementById("save").disabled = true;
	//alert("billCopy Function");
	
	var billno = $('#billno').val();
	
	var params = {};
	
	params["billno"] = billno;
	params["methodName"] = "billCopyPdf";
	
	
	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
 	    	{
 				alert(data);
 				location.reload();
 				if(document.billcopy)
 				{
 					document.billcopy.reset();
 					
 				}	
 				document.getElementById("save").disabled = false;
 				 			}
 	    	).error(function(jqXHR, textStatus, errorThrown){
 	    		if(textStatus==="timeout") {
 	    			$(loaderObj).hide();
 	    			$(loaderObj).find('#errorDiv').show();
 	    		}
 	    		/*//document.munits.btn.disabled =false;
 				document.getElementById("save").disabled=false;*/
 	    	});
}