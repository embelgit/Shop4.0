/*function supplierAccount(){
	
		if(document.splAcc.fk_supplier_id.value == "")
		{
			alert("Please Select Supplier Name");
			return false;
		}	
		if(document.splAcc.billNo.value=""){
			alert("Please Enter Bill Number");
			return false;
		}
		var letterNumber = /^[0-9]+$/;
			 if(document.splAcc.billNo.value.match(letterNumber))
			 {
				 if(document.splAcc.totalAmt.value == "")
				 {
					 alert("Please Enter total Amount");
						return false;
					 }
					 var letterNumber = /^[0-9]+$/;
					 if(document.splAcc.totalAmt.value.match(letterNumber))
					 {
						 supAccount();
					 }
				 
				 
				 else{
					 alert("Please Enter Numbers only in Total Amount field");
				 	}
				}
			 
			 else{
				 alert("Please Enter Numbers only in Bill Number field");
			 	}
			 }*/

function supAccount(){
	
		document.splAcc.btn.disabled = true;
			
			var fk_supplier_id= $('#fk_supplier_id').val();
			var billNo= $('#billNo').val();
			var totalAmt= $('#totalAmt').val();
		
			
			var params = {};
	
			params["fk_supplier_id"] = fk_supplier_id;
			params["billNo"] =billNo;
			params["totalAmt"] =totalAmt;
			
			params["methodName"] = "suppAccountDetails";
	
			$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
		 	    	{
		 				alert(data);
		 				if(document.splAcc)
		 				{
		 					document.splAcc.reset();
		 				}	
		 				document.splAcc.btn.disabled =false;
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
	document.splAcc.reset();	

}

