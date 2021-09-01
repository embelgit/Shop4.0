function GoDetails(){
	
	if(document.godown.godownName.value == "")
	{
		alert("Please Enter Godown Name");
		return false;
	}	
	var letterNumber = /^[a-zA-Z0-9, ]+$/;
	if(document.godown.godownName.value.match(letterNumber))
	{
		GodownDetailsdd();
	}
	
	else
	{
		alert("Enter Alphabates And Numbers Only in Godown name field..!!");
		return false;
	}	
}

function GodownDetailsdd(){
	
	
		var godown = $('#godownName').val();
		
		var params = {};
		
		params["godown"] =godown;
		
		
		params["methodName"] = "godownDetailsFir";
	
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


function reset()
{
   document.catd.reset();	

}