function employeedetails()
{	
	if(document.empd.firstName.value == "")
	{
		var msg="Enter Employee First Name.";
		var dialog = bootbox.dialog({
	    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
	    closeButton: false
		});
		
		setTimeout(function() {
			dialog.modal('hide');
		
		}, 1500);
		
		return false;
	}	
	var letterNumber = /^[a-zA-Z, ]+$/;
	if(document.empd.firstName.value.match(letterNumber))
	{
		if(document.empd.middleName.value == "")
		{
			var msg="Enter Employee Middle Name.";
			var dialog = bootbox.dialog({
		    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		    closeButton: false
			});
			
			setTimeout(function() {
				dialog.modal('hide');
			
			}, 1500);
			return false;
		}	
		var letterNumber = /^[a-zA-Z, ]+$/;
		if(document.empd.middleName.value.match(letterNumber))
		{
			if(document.empd.lastName.value == "")
			{
				var msg="Enter Employee Last Name";
				var dialog = bootbox.dialog({
			    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
			    closeButton: false
				});
				
				setTimeout(function() {
					dialog.modal('hide');
				
				}, 1500);
				
				return false;
			}	
			var letterNumber = /^[a-zA-Z, ]+$/;
			if(document.empd.lastName.value.match(letterNumber))
			{
				if ( document.empd.joiningDate.value == "" )
				   {
					var msg="Please Select Date of Joining";
					var dialog = bootbox.dialog({
				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
				    closeButton: false
					});
					
					setTimeout(function() {
						dialog.modal('hide');
					
					}, 1500);
					
			       return false;
			}
				
				 var letterNumber = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  	        	 if(document.empd.emailId.value.match(letterNumber) || document.empd.emailId.value == null ||  document.empd.emailId.value == "")
  	        	 {	   	        	 
	   	        		 if ( document.empd.salary.value == "" )
	   	        		 {
	   	        			var msg="Please Enter Salary.";
	   						var dialog = bootbox.dialog({
	   					    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
	   					    closeButton: false
	   						});
	   						
	   						setTimeout(function() {
	   							dialog.modal('hide');
	   						
	   						}, 1500);
				         
				          return false;
	   	        		 }
	   	        		 var letterNumber = /^[0-9]+$/;
	   	        		 if(document.empd.salary.value.match(letterNumber))
	   	        		 {
	   	        			 if ( document.empd.contactNo.value == "" )
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
	   	        			 if(document.empd.contactNo.value.match(letterNumber))
	   	        			 {
	   	        				if(document.empd.address.value == "")
	   	        				{
	   	        					var msg="Please Enter Employee Address.";
			   						var dialog = bootbox.dialog({
			   					    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
			   					    closeButton: false
			   						});
			   						
			   						setTimeout(function() {
			   							dialog.modal('hide');
			   						
			   						}, 1500);
	   	        			
	   	        					return false;
	   	        				}	
	   	        				var letterNumber = /^[a-zA-Z0-9, ]+$/;
	   	        				if(document.empd.address.value.match(letterNumber))
	   	        				{
	   	        					if ( document.empd.zipCode.value == "" )
								    {
	   	        						var msg="Please Enter Zip Code";
				   						var dialog = bootbox.dialog({
				   					    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
				   					    closeButton: false
				   						});
				   						
				   						setTimeout(function() {
				   							dialog.modal('hide');
				   						
				   						}, 1500);
								         
								        return false;
								    }
									var letterNumber = /^[0-9]{6}$/;
									if(document.empd.zipCode.value.match(letterNumber))
									{
										
										if(document.empd.adhaarNumber.value == "")
										{
											var msg="Please Enter Adhaar Number";
					   						var dialog = bootbox.dialog({
					   					    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
					   					    closeButton: false
					   						});
					   						
					   						setTimeout(function() {
					   							dialog.modal('hide');
					   						
					   						}, 1500);
											
											return false;
										}
										var letterNumber = /^[0-9]{12}$/;
										if(document.empd.adhaarNumber.value.match(letterNumber))
										{
										
											empDetails();
										}
										else
										{
											var msg="Please Enter Valid 12 Digit Adhaar Number";
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
										var msg="Enter 6 Digit Numbers Only in Zip Code..!!";
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
		   	        					var msg="Enter Alphabates Only in Address..!!";
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
		   	        				var msg="Enter 10 digit Numbers Only in Contact Number..!!";
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
		   	        			var msg="Enter Numbers Only in Salary..!!";
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
		   	        		var msg="Enter a Valid Email Adress..!!";
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
					var msg="Enter Alphabets Only in Last Name..!!";
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
				var msg="Enter Alphabets Only in Middle Name..!!";
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
			var msg="Enter Alphabets Only in First Name..!!";
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


			

function empDetails(){
		
	document.getElementById("save").disabled = true;
	//document.empd.btn.disabled = true;

				var firstName = $('#firstName').val();
				var middleName = $('#middleName').val();
				var lastName = $('#lastName').val();
				var joiningDate = $('#joiningDate').val();
				var salary = $('#salary').val();
				var address = $('#address').val();
				var contactNo  = $('#contactNo').val();
				var emailId = $('#emailId').val();
				var zipCode = $('#zipCode').val();
				var adhaarNumber = $('#adhaarNumber').val();
				
				
				var params = {};
				
				params["firstName"] = firstName;
				params["middleName"] =middleName;
				params["lastName"] =lastName;
				params["joiningDate"] =joiningDate;
				params["salary"] =salary;
				params["address"] = address;
				params["contactNo"] =contactNo;
				params["emailId"] = emailId;
				params["zipCode"] = zipCode;
				params["adhaarNumber"] = adhaarNumber;
				
				
				params["methodName"] = "regDetails";
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
			 					document.getElementById("save").disabled = false;	
			 				//document.empd.btn.disabled =false;
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
   document.empd.reset();	

}


/********* Edit Employee Details ************/
function getEmployeeDetails(){
	
	var params= {};

	var input = document.getElementById('employee'),
	list = document.getElementById('emp_drop'),
	i,fkRootEmpId;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			fkRootEmpId = list.options[i].getAttribute('data-value');
		}
	}

	$("#firstName").append($("<input/>").attr("value","").text());
	$("#middleName").append($("<input/>").attr("value","").text());
	$("#lastName").append($("<input/>").attr("value","").text());
	$("#joiningDate").append($("<input/>").attr("value","").text());
	$("#emailId").append($("<input/>").attr("value","").text());
	$("#salary").append($("<input/>").attr("value","").text());
	$("#contactNo").append($("<input/>").attr("value","").text());
	$("#address").append($("<input/>").attr("value","").text());
	$("#zipCode").append($("<input/>").attr("value","").text());
	$("#adhaarNumber").append($("<input/>").attr("value","").text());
	
	

	params["EmpId"]= fkRootEmpId;

	params["methodName"] = "getEmployeeDetailsToEdit";

	$.post('/Shop/jsp/utility/controller.jsp',params,function(data){

		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		$.each(jsonData,function(i,v)
				{
			document.getElementById("firstName").value = v.firstName;
			document.getElementById("middleName").value = v.middleName;
			document.getElementById("lastName").value = v.lastName;
			document.getElementById("joiningDate").value = v.joiningDate;
			document.getElementById("emailId").value = v.email;
			document.getElementById("salary").value = v.salary;
			document.getElementById("contactNo").value = v.contactNo;
			document.getElementById("address").value = v.addresst;
			document.getElementById("zipCode").value = v.zipCode;
			document.getElementById("adhaarNumber").value = v.adhaarNumber;
			

				});
	}).error(function(jqXHR, textStatus, errorThrown){
		if(textStatus==="timeout") {

		}
	});
	
}

/*============= Update employee detail ========*/
function editEmployee(){
		
	if(document.empd1.firstName.value == "")
	{
		var msg="Enter Employee First Name.";
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
		/*alert("Enter Employee First Name.");
		return false;*/
	}	
	var letterNumber = /^[a-zA-Z, ]+$/;
	if(document.empd1.firstName.value.match(letterNumber))
	{
		if(document.empd1.middleName.value == "")
		{
			var msg="Enter Employee Middle Name.";
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
			/*alert("Enter Employee Middle Name.");
			return false;*/
		}	
		var letterNumber = /^[a-zA-Z, ]+$/;
		if(document.empd1.middleName.value.match(letterNumber))
		{
			if(document.empd1.lastName.value == "")
			{
				var msg="Enter Employee Last Name.";
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
				/*alert("Enter Employee Last Name.");
				return false;*/
			}	
			var letterNumber = /^[a-zA-Z, ]+$/;
			if(document.empd1.lastName.value.match(letterNumber))
			{
				
				
				var letterNumber = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  	        	 if(document.empd1.emailId.value.match(letterNumber) || document.empd1.emailId.value == null ||  document.empd1.emailId.value == "")
  	        	 {
	   	        	 
	   	        		 if ( document.empd1.salary.value == "" )
	   	        		 {
				         	var msg="Please Enter Salary.";
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
				  	      /* alert("Please Enter Salary.");
				          return false;*/
	   	        		 }
	   	        		 var letterNumber = /^[0-9]+$/;
	   	        		 if(document.empd1.salary.value.match(letterNumber))
	   	        		 {
	   	        			 if ( document.empd1.contactNo.value == "" )
	   	        			 {
								var msg="Please Enter Contact Number";
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
					  	       /*alert("Please Enter Contact Number");
					  	       return false;*/
	   	        			 }
	   	        			 var letterNumber = /^[0-9]{10}$/;
	   	        			 if(document.empd1.contactNo.value.match(letterNumber))
	   	        			 {
	   	        				if(document.empd1.address.value == "")
	   	        				{
									var msg="Please Enter Employee Address.";
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
	   	        					/*alert("Please Enter Employee Address.");
	   	        					return false;*/
	   	        				}	
	   	        				var letterNumber = /^[a-zA-Z0-9, ]+$/;
	   	        				if(document.empd1.address.value.match(letterNumber))
	   	        				{
	   	        					if ( document.empd1.zipCode.value == "" )
								    {
								        var msg="Please Enter Zip Code";
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
								  	      /*alert("Please Enter Zip Code");
								          return false;*/
								    }
									var letterNumber = /^[0-9]{6}$/;
									if(document.empd1.zipCode.value.match(letterNumber))
									{	
										if(document.empd1.adhaarNumber.value == "")
										{
											var msg="Please Enter Adhaar Number";
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
											/*alert("Please Enter Adhaar Number");
											return false;*/
										}
										var letterNumber = /^[0-9]{12}$/;
										if(document.empd1.adhaarNumber.value.match(letterNumber))
										{
										
											updateEmployeeDetails();
										}
										else
										{
											var msg="Please Enter Valid 12 Digit Adhaar Number";
											var dialog = bootbox.dialog({
												//title: "Embel Technologies Says :",
											    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
											    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
											    closeButton: false
											});
											
											setTimeout(function() {
												dialog.modal('hide');
											}, 1500);
											/*alert("Please Enter Valid 12 Digit Adhaar Number");*/
										}		
										
										}
									else
										{
											var msg="Enter 6 digit Numbers Only in zip code..!";
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
												/*alert("Enter 6 digit Numbers Only in zip code..!!");
												return false;*/
											}
										}
									
	   	        				else
									{
										var msg="Enter Alphabates Only in address..!";
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
										/*alert("Enter Alphabates Only in address..!!");
										return false;*/
									}	
								}
										
	   	        			 else
								{
									var msg="Enter 10 digit Numbers Only in contact number..!";
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
									/*alert("Enter 10 digit Numbers Only in contact number..!!");
									return false;*/
									}	
								}
										
	   	        		 else
							{
								var msg="Enter Numbers Only in salary..!";
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
								/*alert("Enter Numbers Only in salary..!!");
								return false;*/
							}
						}
										
	   	        	 else
						{
							var msg="Enter a Valid email adress..!";
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
							/*alert("Enter a Valid email adress..!!");
							return false;*/
						}
					}
																
			else
				{
					var msg="Enter Alphabets Only in last name..!";
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

					/*alert("Enter Alphabets Only in last name..!!");
					return false;*/
				}
			}
																
		else
			{
				var msg="Enter Alphabets Only in middle name..!";
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
				/*alert("Enter Alphabets Only in middle name..!!");
				return false;*/
			}
		}
												
	else
		{
			var msg="Enter Alphabets Only in first name..!";
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
			/*alert("Enter Alphabets Only in first name..!!");
			return false;*/
		}
	
}
function updateEmployeeDetails(){
	
	document.getElementById("edtempbtn").disabled = true;
	
	var input = document.getElementById('employee'),
    list = document.getElementById('emp_drop'),
    	i,fkRootEmpId;
	 		for (i = 0; i < list.options.length; ++i) {
			     if (list.options[i].value === input.value) {
			    	 fkRootEmpId = list.options[i].getAttribute('data-value');
			     }
	 		}
	
	//var customerId = document.getElementById("customerId").value;
	
	var firstName = $('#firstName').val();
	var middleName = $('#middleName').val();
	var lastName = $('#lastName').val();				
	var joiningDate = $('#newJoiningDate').val();
	var emailId = $('#emailId').val();
	var salary = $('#salary').val();
	var contactNo = $('#contactNo').val();
	var address = $('#address').val();
	var zipCode = $('#zipCode').val();
	var oldJoiningDate = $('#joiningDate').val();
	var adhaarNumber = $('#adhaarNumber').val();
	
	var params = {};
	
	params["EmployeeId"] = fkRootEmpId;
	params["firstName"] = firstName;	
	params["middleName"] = middleName;
	params["lastName"] = lastName;
	params["joiningDate"] = joiningDate;
	params["emailId"] =emailId;
	params["salary"] = salary;
	params["contactNo"] = contactNo;
	params["address"] = address;
	params["zipCode"] = zipCode;
	params["oldJoiningDate"] = oldJoiningDate;
	params["adhaarNumber"] = adhaarNumber;
	
	params["methodName"] = "updateEmployeeDetails";

	$.post('/Shop/jsp/utility/controller.jsp',params,function(data){
		
			/*alert(data);*/
			
		
		
		var msg=data;
		var dialog = bootbox.dialog({
	    message: '<p class="text-center">'+msg.fontcolor("green").fontsize(5)+'</p>',
	   
	    closeButton: false
		});
						
		setTimeout(function() {
			dialog.modal('hide');
			location.reload();
		}, 1500);
			
			
				if(document.empd1)
				{
					document.empd1.reset();
				}	
				document.getElementById("edtempbtn").disabled = false;
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