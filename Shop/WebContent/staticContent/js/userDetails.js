//validateing password with re-password

function customAlert(msg)
{
	var msg=msg;
	var dialog = bootbox.dialog({
	message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
	closeButton: false
	});			
	setTimeout(function() {
		dialog.modal('hide');
	}, 1500);
}

function validatePassword(){
        	 var password=$('#password').val();
        	 var rePassword=$('#password2').val();
        	 
        	 if(password != rePassword){
        		 
    		 msg = "Password Mismatch";
    		 customAlert(msg);
    		 document.getElementById('password2').value = null;
    		 return false;
        	 }
         } 
 
 //Ading user detail
 
function regUserDetails(){
	
        		if(document.usd.firstName.value == "")
        		{
        			msg = "Enter User First Name.";
           		 	customAlert(msg)
           		 	return false;
        		}
        		/*if(document.usd.typeId.value == "selected")
        		{
        			msg = "Please Select User Type.";
           		 	customAlert(msg)
           		 	return false;
        		}*/
        		if(document.usd.city.value == "")
        		{
        			msg = "Enter User City. ";
           		 	customAlert(msg)
           		 	return false;
        		}else{
    			      var letterNumber = /^[a-zA-Z, ]+$/;
    			      if(document.usd.city.value.match(letterNumber))
    			        {}else{
        			        msg = "Enter Valid City ";
           		 	        customAlert(msg)
           		 	        return false;
    			        }
        		}
        		var letterNumber = /^[a-zA-Z, ]+$/;
        		if(document.usd.firstName.value.match(letterNumber))
        		{
        			
        			/* var letterNumber = /^[a-zA-Z, ]+$/;
        			if(document.usd.middleName.value.match(letterNumber))
        			{
        				 */if(document.usd.lastName.value == "")
        				{
                			msg = "Enter User Last Name.";
                   		 	customAlert(msg)
                   		 	return false;
        				}	
        				var letterNumber = /^[a-zA-Z, ]+$/;
        				if(document.usd.lastName.value.match(letterNumber))
        				{
        					
        		   	        			 if ( document.usd.contactNo.value == "" )
        		   	        			 {
        		   	        				msg = "Please Enter Contact Number";
        		                   		 	customAlert(msg)
        		                   		 	return false;
        		   	        			 }
        		   	        			 var letterNumber = /^[0-9]{10}$/;
        		   	        			 if(document.usd.contactNo.value.match(letterNumber))
        		   	        			 {
        		   	        				if(document.usd.address1.value == "")
        		   	        				{
            		   	        				msg = "Please Enter User Address line 1.";
            		                   		 	customAlert(msg)
            		                   		 	return false;
        		   	        				}	
        		   	        				var letterNumber = /^[a-zA-Z0-9, ]+$/;
        		   	        				if(document.usd.address1.value.match(letterNumber))
        		   	        				{
        		   	        					
												if ( document.usd.userName.value == "" )
    										    {
	            		   	        				msg = "Please Enter user name...!!!";
	            		                   		 	customAlert(msg)
	            		                   		 	return false;
    										    }
    											var letterNumber = /^[a-zA-Z0-9, ]+$/;
    											if(document.usd.userName.value.match(letterNumber))
    											{
    												if ( document.usd.password.value == "" )
    												{
    													msg = "Please Enter password...!!!";
    	            		                   		 	customAlert(msg)
    	            		                   		 	return false;
		  										    }
														if ( document.usd.password2.value == "" )
		  										    {
    													msg = "Please Enter re-password...!!!";
    	            		                   		 	customAlert(msg)
    	            		                   		 	return false;
		  										    }
        											if ( document.usd.pan.value == "" )
        										    {
        												msg = "Please Enter Pan number...!!!";
    	            		                   		 	customAlert(msg)
    	            		                   		 	return false;
        										    }
        											var letterNumber = /^[a-zA-Z0-9]+$/;
        											if(document.usd.pan.value.match(letterNumber))
        											{
            											usrDetails();
        											
            										}else
            											{
            												msg = "Enter Numbers And Alphabates Only in Pan Number field..!!";
            	            		                   		customAlert(msg)
            	            		                   		return false;
            										}
            									}else
            												{
        														msg = "Enter Numbers And Alphabates Only in Username field..!!";
        														customAlert(msg)
        														return false;
            											}
        											}
        										
        		   	        				else
        										{
        											msg = "Enter Numbers and Alphabates Only in address line 1 field..!!";
	            		                   		 	customAlert(msg)
	            		                   		 	return false;
        										}	
        									}
        											
        		   	        			 else
        									{
        										msg = "Enter 10 digit Numbers Only in Contact Number field..!!";
            		                   		 	customAlert(msg)
            		                   		 	return false;
        										}	
        									}
				        				else
				        					{
				        						msg = "Enter Alphabets Only in Last Name field..!!";
					                   		 	customAlert(msg)
					                   		 	return false;
				        					}
				        				}
					        		else
					        			{
					        				msg = "Enter Alphabets Only in first name field..!!";
					               		 	customAlert(msg)
					               		 	return false;
					        			}
        		}	
      
        
        		
function usrDetails(){

    document.getElementById("svbtn").disabled = true;
	
    var params = {};

	var firstName = $('#firstName').val();
	var city = $('#city').val();
	var lastName  = $('#lastName').val();
	var contactNo = $('#contactNo').val();
	var address1 = $('#address1').val();
	var pan = $('#pan').val();
	var userName = $('#userName').val();
	var password = $('#password').val();
	var password2 = $('#password2').val();
	var typeId= $('#typeId').val();
	
	
    
	params["firstName"] = firstName;
	params["city"] = city;
	params["lastName"] = lastName;
	params["contactNo"] = contactNo;
	params["address1"] = address1;
	params["pan"] =pan;
	params["userName"] = userName;
	params["password"] = password;
	params["password2"] =password2;
	params ["typeId"] = typeId;

	
	
	params["methodName"] = "regUserDetails";

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
		
		document.getElementById("svbtn").disabled = false;
	}
	).error(function(jqXHR, textStatus, errorThrown){
		if(textStatus==="timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});        		 			
}       		
        		
function getUserDetails(){
	
	var params= {};

	var input = document.getElementById('user'),
	    list =  document.getElementById('user_drop'),
	            i,fkRootUserId;
	
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			fkRootUserId = list.options[i].getAttribute('data-value');
		}
	}

	$("#firstName").append($("<input/>").attr("value","").text());
	$("#lastName").append($("<input/>").attr("value","").text());
	$("#contactNumber").append($("<input/>").attr("value","").text());
	$("#address").append($("<input/>").attr("value","").text());
	$("#userName").append($("<input/>").attr("value","").text());
	$("#passWord").append($("<input/>").attr("value","").text());
	$("#repassWord").append($("<input/>").attr("value","").text());
	$("#city").append($("<input/>").attr("value","").text());
	$("#panNo").append($("<input/>").attr("value","").text());
	
	params["UserId"]= fkRootUserId;

	params["methodName"] = "getUserDetailsToEdit";

	$.post('/Shop/jsp/utility/controller.jsp',params,function(data){

		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		$.each(jsonData,function(i,v)
				{
			document.getElementById("firstName").value = v.firstName;
			document.getElementById("lastName").value = v.lastName;
			document.getElementById("contactNumber").value = v.contactNo;
			document.getElementById("address").value = v.address1;
			document.getElementById("userName").value = v.userName;
			document.getElementById("passWord").value = v.password;
			document.getElementById("repassWord").value = v.rePassword;
			document.getElementById("city").value = v.city;
			document.getElementById("panNo").value = v.pan;
			
				});
	}).error(function(jqXHR, textStatus, errorThrown){
		if(textStatus==="timeout") {

		}
	});
}

//Password match for user edit
function validatePassword1(){
	 var password=$('#passWord').val();
	 var rePassword=$('#repassWord').val();
	 
	 if(password != rePassword){
		 
	 msg = "Password Mismatch";
	 customAlert(msg);
	 document.getElementById('repassWord').value = null;
	 return false;
	 }
} 

//update User details
function updateuserDetails(){
	
	if(document.user1.user.value == "")
	{
		  msg = "Please Select Username.";
		  customAlert(msg)
		 	return false;
	}
	if(document.user1.firstName.value == "")
	{
		msg = "Enter User First Name.";
		customAlert(msg)
		 	return false;
	}
	if(document.user1.city.value == "")
	{
		msg = "Enter User City. ";
		customAlert(msg)
		 	return false;
	}else{
	      var letterNumber = /^[a-zA-Z, ]+$/;
	      if(document.user1.city.value.match(letterNumber))
	        {}else{
		        msg = "Enter Valid City ";
		        customAlert(msg)
		 	        return false;
	        }
	}
	var letterNumber = /^[a-zA-Z, ]+$/;
	if(document.user1.firstName.value.match(letterNumber))
	{
		if(document.user1.lastName.value == "")
			{
    			msg = "Enter User Last Name.";
    			customAlert(msg)
       		 	return false;
			}	
			var letterNumber = /^[a-zA-Z, ]+$/;
			if(document.user1.lastName.value.match(letterNumber))
			{
			     if ( document.user1.contactNumber.value == "" )
				 {
					msg = "Please Enter Contact Number";
					customAlert(msg)
	       		 	return false;
				 }
				 var letterNumber = /^[0-9]{10}$/;
				 if(document.user1.contactNumber.value.match(letterNumber))
				 {
					if(document.user1.address.value == "")
					{
	    				msg = "Please Enter User Address.";
	    				customAlert(msg)
	           		 	return false;
					}	
					var letterNumber = /^[a-zA-Z0-9, ]+$/;
					if(document.user1.address.value.match(letterNumber))
					{
						
						if ( document.user1.userName.value == "" )
					    {
	        				msg = "Please Enter user name...!!!";
	        				customAlert(msg)
	               		 	return false;
					    }
						var letterNumber = /^[a-zA-Z0-9, ]+$/;
						if(document.user1.userName.value.match(letterNumber))
						{
							if ( document.user1.passWord.value == "" )
							{
								msg = "Please Enter password...!!!";
								customAlert(msg)
	                   		 	return false;
							    }
								if ( document.user1.passWord.value == "" )
							    {
								msg = "Please Enter re-password...!!!";
								customAlert(msg)
	                   		 	return false;
							    }
							if ( document.user1.panNo.value == "" )
						    {
								msg = "Please Enter Pan number...!!!";
								customAlert(msg)
	                   		 	return false;
						    }
							var letterNumber = /^[a-zA-Z0-9]+$/;
							if(document.user1.panNo.value.match(letterNumber))
							{
								updtuserDetails();
							
							}else
								{
									msg = "Enter Numbers And Alphabates Only in Pan Number field..!!";
									customAlert(msg)
			                   		return false;
							}
						}else
									{
										msg = "Enter Numbers And Alphabates Only in Username field..!!";
										customAlert(msg)
										return false;
								}
							}
						
					else
						{
							msg = "Enter Numbers and Alphabates Only in address line 1 field..!!";
							customAlert(msg)
	               		 	return false;
						}	
					}
							
				 else
					{
						msg = "Enter 10 digit Numbers Only in Contact Number field..!!";
						customAlert(msg)
	           		 	return false;
						}	
					}
				else
					{
						msg = "Enter Alphabets Only in Last Name field..!!";
						customAlert(msg)
	           		 	return false;
					}
				}
			else
				{
					msg = "Enter Alphabets Only in first name field..!!";
					customAlert(msg)
	       		 	return false;
				}
	
}

function updtuserDetails(){

	document.getElementById("usredtbtn").disabled = true;
		
		var input = document.getElementById('user'),
	        list = document.getElementById('user_drop'),
	    	       i,fkRootUserId;
		
		for (i = 0; i < list.options.length; ++i) {
		     if (list.options[i].value === input.value) {
		    	 fkRootUserId = list.options[i].getAttribute('data-value');
		     }
		}
		
		var firstName = $('#firstName').val();
		var lastName = $('#lastName').val();
		var contactNumber = $('#contactNumber').val();				
		var address = $('#address').val();
		var userName = $('#userName').val();
		var passWord = $('#passWord').val();
		var repassWord = $('#repassWord').val();
		var city = $('#city').val();
		var panNo = $('#panNo').val();
		
	    var params = {};
		
		params["fkRootUserId"] = fkRootUserId;
		params["firstName"] = firstName;	
		params["lastName"] = lastName;
		params["address"] = address;
		params["userName"] = userName;
		params["passWord"] =passWord;
		params["repassWord"] = repassWord;
		params["city"] = city;
		params["panNo"] = panNo;
		
		params["methodName"] = "updateUserDetails";
		
		$.post('/Shop/jsp/utility/controller.jsp',params,function(data){
			alert(data);
				if(document.user1)
				{
					document.user1.reset();
				}	
				document.getElementById("usredtbtn").disabled = false;
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
document.usd.reset();	

}




/*function regUserDetails(){
	if(document.usd.firstName.value == "")
	{
		alert("Enter Employee First Name.");
		return false;
	}	
	var letterNumber = /^[a-zA-Z]+$/;
	if(document.usd.firstName.value.match(letterNumber))
	{
		
		var letterNumber = /^[a-zA-Z]+$/;
		if(document.usd.middleName.value.match(letterNumber))
		{
			if(document.usd.lastName.value == "")
			{
				alert("Enter Employee Last Name.");
				return false;
			}	
			var letterNumber = /^[a-zA-Z]+$/;
			if(document.usd.lastName.value.match(letterNumber))
			{
				
	   	        			 if ( document.usd.contactNo.value == "" )
	   	        			 {
					  	       alert("Please Enter Contact Number");
					  	       return false;
	   	        			 }
	   	        			 var letterNumber = /^[0-9]+$/;
	   	        			 if(document.usd.contactNo.value.match(letterNumber))
	   	        			 {
	   	        				if(document.usd.address1.value == "")
	   	        				{
	   	        					alert("Please Enter Employee Address line 1.");
	   	        					return false;
	   	        				}	
	   	        				var letterNumber = /^[a-zA-Z]+$/;
	   	        				if(document.usd.address1.value.match(letterNumber))
	   	        				{
	   	        					
	   	        					
										if ( document.usd.pan.value == "" )
									    {
									         
									  	      alert("Please Enter Pan number...!!!");
									          return false;
									    }
										var letterNumber = /^[a-zA-Z0-9]+$/;
										if(document.usd.pan.value.match(letterNumber))
										{
										usrDetails();
										}
									else
										{
												alert("Enter Numbers And Alphabates Only in Pan Number field..!!");
												return false;
											}
										}
									
	   	        				else
									{
										alert("Enter Alphabates Only in address line 1 field..!!");
										return false;
									}	
								}
										
	   	        			 else
								{
									alert("Enter Numbers Only in contact number field..!!");
									return false;
									}	
								}
	   	        		 		
			else
				{
					alert("Enter Alphabets Only in last name field..!!");
					return false;
				}
			}
																
		
												
	else
		{
			alert("Enter Alphabets Only in first name field..!!");
			return false;
		}

	}	
}
	
	
function usrDetails(){

	document.usd.btn.disabled = true;
		
	var params = {};
	
		var firstName = $('#firstName').val();
		var city = $('#city').val();
		var lastName  = $('#lastName').val();
		var contactNo = $('#contactNo').val();
		var address1 = $('#address1').val();
		var pan = $('#pan').val();
		var userName = $('#userName').val();
		var password = $('#password').val();
		var password2 = $('#password2').val();
		

		
		
		params["firstName"] = firstName;
		params["city"] = city;
		params["lastName"] = lastName;
		params["contactNo"] = contactNo;
		params["address1"] = address1;
		params["pan"] =pan;
		params["userName"] = userName;
		params["password"] = password;
		params["password2"] =password2;
		
		
		params["methodName"] = "regUserDetails";

		$.post('/Fertilizer/jsp/utility/controller.jsp',params,function(data)
	 	    	{
	 				alert(data);
	 				if(document.usd)
	 				{
	 					document.usd.reset();
	 				}	
	 				document.usd.btn.disabled =false;
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
document.usd.reset();	

}

*/