function disableSpaceKey()
{
	
	    if (event.keyCode == 32) {
	        return false;
	    }
	
}

/* function to check DuplicateTaxTypeEntry   */
          		
          		
          		function checkForDuplicateTaxTypeEntry(){
          		
          			var input = document.getElementById('taxType'),
          		     list = document.getElementById('cat_drop1'),
          		     	i,taxType;
          			 		for (i = 0; i < list.options.length; ++i) {
          					     if (list.options[i].value === input.value) {
          					    	taxType = list.options[i].getAttribute('value');
          					     }
          			 		}
          		
          			
          	
          			if(document.getElementById("taxType").value == taxType )
          	  		{
          				var msg="Tax Type already exist...Duplicate Not allowed";
        				var dialog = bootbox.dialog({
        					//title: "Embel Technologies Says :",
        				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
        				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
        				    closeButton: false
        				});
        				
        				setTimeout(function() {
        					dialog.modal('hide');
        				}, 1500);

        				document.getElementById("taxType").value = "";

          				return false;
          			}
          		
          			}
   
function calculateTax()
{
	var cgst=$('#cgst').val();
	var sgst=$('#sgst').val();

	var csgst=+cgst+ +sgst;
	
	document.getElementById('taxPercentage').value=csgst;
}
function calculateTax1()
{
	var cgst=$('#cgst1').val();
	var sgst=$('#sgst1').val();

	var csgst=+cgst+ +sgst;
	
	document.getElementById('taxPercentage1').value=csgst;
}
          			
  function addtax(){
	

	
	var taxType = $('#taxType').val();
	var taxPercentage = $('#taxPercentage').val();
	var cgst = $('#cgst').val();
	var sgst = $('#sgst').val();
	
	if ( taxType == "" )
	 {
		var msg="Please Enter Tax Type";
		
		var dialog = bootbox.dialog({
			
		    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		    closeButton: false
		});
		
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		
      return false;
	 }
	
	 if(document.txc.cgst.value == "")
		{
				var msg="Enter CGST";
				var dialog = bootbox.dialog({
					//title: "Embel Technologies Says :",
				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
				    closeButton: false
				});
				
				setTimeout(function() {
					dialog.modal('hide');
				}, 1500);
			
				return false;
		}
			
		if(document.txc.sgst.value == "")
		{
			var msg="Please Enter SGST";
			var dialog = bootbox.dialog({
				//title: "Embel Technologies Says :",
			    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
			    closeButton: false
			});
			
			setTimeout(function() {
				dialog.modal('hide');
			}, 1500);
		
			return false;
		}
	 var letterNumber = /^[a-zA-Z0-9, ]+$/;
	 //if(taxType.match(letterNumber))
	// {
	    if( taxPercentage == "" )
	      {
		    var msg="Please Enter Tax Percentage";
		
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
		 var letterNumber = /^\s*-?[0-9]\d*(\.\d{1,2})?\s*$/;
		 if(taxPercentage.match(letterNumber) )
		 {
			 txCreation();
		 }

		 else
			{
			 	var msg="Enter Only Number upto 2 decimal in Tax percentage field";
			 	
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
			//}
	/* else
		{
		 var msg="Enter Alphabates And Number Only in Tax Type field";
		
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
			}*/
		 
		
		}
  
  function txCreation(){
	   
	  document.getElementById("save").disabled=true;

			var taxType= $('#taxType').val();
			var taxPercentage = $('#taxPercentage').val();
			var cgst = $('#cgst').val();
			var sgst = $('#sgst').val();
							
			var params= {};
			
			params ["taxType"] = taxType;
			params ["taxPercentage"] = taxPercentage;
			params ["cgst"] = cgst;
		    params ["sgst"] = sgst;
			
			params["methodName"] = "taxCreation";
	    	
	    	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
	    	{
	    		alert(data);
	    		location.reload();
	    		var msg=data;
	    		
	    		var dialog = bootbox.dialog({
	    	    message: '<p class="text-center">'+msg.fontcolor("green").fontsize(5)+'</p>',
	    	    closeButton: false
	    		});
	    		
	    		setTimeout(function() {
	    			dialog.modal('hide');
	    			location.reload();
	    		}, 1500);
	    			}
	    	    	).error(function(jqXHR, textStatus, errorThrown){
	    	    		if(textStatus==="timeout") {
	    	    			$(loaderObj).hide();
	    	    			$(loaderObj).find('#errorDiv').show();
	    	    		}
	    	    	});
	    	
	    }

 /*-------------------- for pop window---------------*/
  function addtax1(){
		
		document.getElementById("save12").disabled = false;
		
		var taxType = $('#taxType1').val();
		var taxPercentage = $('#taxPercentage1').val();
		var cgst = $('#cgst1').val();
		var sgst = $('#sgst1').val();
		
		if ( taxType == "" )
		 {
			var msg="Please Enter Tax Type";
			
			var dialog = bootbox.dialog({
				
			    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
			    closeButton: false
			});
			
			setTimeout(function() {
				dialog.modal('hide');
			}, 1500);
			
	      return false;
		 }
		/* var letterNumber = /^[a-zA-Z0-9, ]+$/;
		 if(taxType.match(letterNumber))
		 {*/
		if( sgst == "" )
		      {
			    var msg="Please Enter SGST";
			
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
			
			if( cgst == "" )
		      {
			    var msg="Please Enter CGST";
			
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

		    if( taxPercentage == "" )
		      {
			    var msg="Please Enter Tax Percentage";
			
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
			 var letterNumber = /^\s*-?[0-9]\d*(\.\d{1,2})?\s*$/;
			 if(taxPercentage.match(letterNumber) )
			 {
				 txCreation1();
			 }

			 else
				{
				 	var msg="Enter Only Number upto 2 decimal in Tax percentage field";
				 	
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
			//	}
		/* else
			{
			 var msg="Enter Alphabates And Number Only in Tax Type field";
			
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
				}*/		
				
			}

function txCreation1(){
   
      document.getElementById("save12").disabled=true;
      
			var taxType= $('#taxType1').val();
			var taxPercentage = $('#taxPercentage1').val();
			var cgst = $('#cgst1').val();
			var sgst = $('#sgst1').val();
							
			var params= {};
			
			params ["taxType"] = taxType;
			params ["taxPercentage"] = taxPercentage;
			params ["cgst"] = cgst;
		    params ["sgst"] = sgst;
			
			params["methodName"] = "taxCreation";
	    	
	    	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
	    	{
	    		//alert(data);
	    		//location.reload();
	    		var msg=data;
	    		
	    		var dialog = bootbox.dialog({
	    	    message: '<p class="text-center">'+msg.fontcolor("green").fontsize(5)+'</p>',
	    	    closeButton: false
	    		});
	    		
	    		setTimeout(function() {
	    			dialog.modal('hide');
	    			location.reload();
	    		}, 1500);
	    			}
	    	    	).error(function(jqXHR, textStatus, errorThrown){
	    	    		if(textStatus==="timeout") {
	    	    			$(loaderObj).hide();
	    	    			$(loaderObj).find('#errorDiv').show();
	    	    		}
	    	    	});
	    	
	    }
	    

function editTax(){
	
	/*if ( document.txc.taxType1.value == "" )
	 {
		alert("Please Enter Tax Type");
		return false;
	 }*/
	 if(document.txc.taxType1.value == "")
	{
		var msg="Please Enter Tax Type";
		
		var dialog = bootbox.dialog({
			//title: "Embel Technologies Says :",
		    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		    closeButton: false
		});
		
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		
		return false;
	}	
	
		 if(document.txc.sgst.value == "")
	{
		var msg="Please Enter SGST ";
		
		var dialog = bootbox.dialog({
			//title: "Embel Technologies Says :",
		    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		    closeButton: false
		});
		
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		
		return false;
	}	
	
			 if(document.txc.cgst.value == "")
	{
		var msg="Please Enter CGST ";
		
		var dialog = bootbox.dialog({
			//title: "Embel Technologies Says :",
		    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		    closeButton: false
		});
		
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		
		return false;
	}	
	 
	 var letterNumber = /^[a-zA-Z0-9, ]+$/;
	
	/* if ( document.txc.taxName.value == "" )
	 {
	      alert("Please Enter NewTax Name");
	      return false;
		 }*/
		  if(document.txc.taxName.value == "")
	{
		var msg="Please Enter NewTax Name";
		
		var dialog = bootbox.dialog({
			//title: "Embel Technologies Says :",
		    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		    closeButton: false
		});
		
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		
		return false;
	}	
		 
		 
	
	/*if ( document.txc.taxPercentage.value == "" )
	 {
      alert("Please Enter Tax Percentage");
      return false;
	 }*/
	 		  if(document.txc.taxPercentage.value == "")
	{
		var msg="Please Enter Tax Percentage";
		
		var dialog = bootbox.dialog({
			//title: "Embel Technologies Says :",
		    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		    closeButton: false
		});
		
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		
		return false;
	}
	 
	 
	 var letterNumber = /^\d+(\.\d+)?$/;
	  		  if(document.txc.taxPercentage.value.match(letterNumber) )
	{
		var msg="Please Enter Tax Percentage";
		
		var dialog = bootbox.dialog({
			//title: "Embel Technologies Says :",
		    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		    closeButton: false
		});
		
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		
		return false;
	}

	/* if(document.txc.taxPercentage.value.match(letterNumber) )
	 {
		 edittxCreation();
	 }

	 else
	 {
		alert("Enter Number Only in percentage field..!!");
		return false;
	 }*/
	 
	 edittxCreation();
	
	  
}



function edittxCreation(){
	//document.getElementById("save2").disable=true;
	var input = document.getElementById('taxType1'),
    list = document.getElementById('tax_drop1'),
    i,taxType1;

	for (i = 0; i < list.options.length; ++i) {
    if (list.options[i].value === input.value) {
    	taxType1 = list.options[i].getAttribute('data-value');
    	}
	}
	/*var taxId=$('#fk_tax_id').val();
	alert(taxId);*/
	var taxName = $('#taxName').val();
	var taxPercentage = $('#taxPercentage').val();
	var sgst = $('#sgst').val();
	var cgst = $('#cgst').val();
			
	var params= {};
	
	params ["taxType1"] = taxType1;
	
	params ["taxName"] = taxName;
	params ["taxPercentage"] = taxPercentage;
	params ["sgst"] = sgst;
	params ["cgst"] = cgst;
		
	params["methodName"] = "edittaxCreation";
	
	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
	    	{
				alert(data);
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
   document.txc.reset();	

}



/*+++++++++++ Tax reports +++++++++++++*/
/*++++++++ for SALE +++++++++*/
/*++++++++ for Single date SALE +++++++++*/
function taxReportForSale(){
	var params= {};
	
	var input1 = document.getElementById('fk_cat_id_for_sale'),
	list = document.getElementById('cat_drop_for_sale'),
	i,fk_cat_id;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input1.value) {
			fk_cat_id = list.options[i].getAttribute('data-value');
		}
	}
	
	var fk_cat_id = fk_cat_id;
	var fDate= $('#fDate').val();
	params["cat"]= fk_cat_id;
	params["fDate"]= fDate;
	params["methodName"] = "getTaxDetailsAsPerCategoryFromSale";

	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
			{
		
		$('#saleTax').dataTable().fnClearTable();
		
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		
		
		
		$(document).ready(function() {
		 var total =   $('#saleTax').DataTable( {
			 
			 fnRowCallback : function(nRow, aData, iDisplayIndex){
	                $("th:first", nRow).html(iDisplayIndex +1);
	               return nRow;
	            },
		
	   		 "footerCallback": function ( row, data, start, end, display ) {
		            var api = this.api(), data;
		 
		            // Remove the formatting to get integer data for summation
		            var intVal = function ( i ) {
		                return typeof i === 'string' ?
		                    i.replace(/[\$,]/g, '')*1 :
		                    typeof i === 'number' ?
		                        i : 0;
		            };
		 
		         
		            pageTotal = api
		                .column( 8 )
		                .data()
		                .reduce( function (a, b) {
		                    return intVal(a) + intVal(b);
		                }, 0 );
		 
		            // Update footer
		            $( api.column( 8 ).footer() ).html(
		            		
		              parseFloat(pageTotal).toFixed(2)
		               
		            );
		            console.log( pageTotal);
	            
	        },
	            
		    	destroy: true,
		        searching: false,
		        
		      
		columns: [
		          			
		          			{"data": "billNo", "width": "5%"},
				            {"data": "product", "width": "5%"},
				            {"data": "manufacturer", "width": "5%"},
				            {"data": "weight" , "width": "5%"},
				            {"data": "salePrice" , "width": "5%"},
				            {"data": "mrp" , "width": "5%"},
				            {"data": "taxPercentage" , "width": "5%"},
				            {"data": "quantity" , "width": "5%"},
				            {"data": "taxAmount", "width": "5%"},
				           
		        ],
		      
		        
		    } );
		} );
		
	var mydata = catmap;
	$('#saleTax').dataTable().fnAddData(mydata);
	
		}
	

	);
	

	
	
	
}

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

/*++++++++ Between Two date SALE +++++++++*/
function taxFromSaleBetweenTwoDateValidation()
{
	var fk_cat_id_for_sale_Two = $("#fk_cat_id_for_sale_Two").val();
	var fDateTwo = $("#fDateTwo").val();
	var sDateTwo = $("#sDateTwo").val();
	
	if(fk_cat_id_for_sale_Two == "" || fk_cat_id_for_sale_Two == undefined)
	{
		msg = "Please Select Product Category";
		customAlert(msg)
		return false;
	}
	if(fDateTwo == "" || fDateTwo == undefined)
	{
		msg="Please Select Start Date";
		customAlert(msg)
		return false;

	}
	if(sDateTwo == "" || sDateTwo == undefined)
	{
		msg="Please Select End Date";
		customAlert(msg)
		return false;
	}
	
	taxFromSaleBetweenTwoDate();	
}


function taxFromSaleBetweenTwoDate(){

	var params= {};
	
	var input1 = document.getElementById('fk_cat_id_for_sale_Two'),
	list = document.getElementById('cat_drop_for_sale_Two'),
	i,fk_cat_id;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input1.value) {
			fk_cat_id = list.options[i].getAttribute('data-value');
		}
	}
	
	var fk_cat_id = fk_cat_id;
	var fDate= $('#fDateTwo').val();
	var sDate= $('#sDateTwo').val();
	params["cat"]= fk_cat_id;
	params["fDate"]= fDate;
	params["sDate"]= sDate;
	params["methodName"] = "getTaxDetailsAsPerCategoryFromSaleBetweenTwoDate";

	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
			{
		
		$('#saleTaxTwo').dataTable().fnClearTable();
		
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		
		if(catmap == "" || catmap == null)
		{
			//alert("No date Wise Purchase Reports for\nDate = "+fDate);
			var msg="Data is not available";
			var dialog = bootbox.dialog({
		    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		    closeButton: false
			});			
			setTimeout(function() {
				dialog.modal('hide');
			}, 1500);
			
			return false;
		}
		
		
		
		$(document).ready(function() {
		 var total =   $('#saleTaxTwo').DataTable( {
			 
			 fnRowCallback : function(nRow, aData, iDisplayIndex){
	                $("th:first", nRow).html(iDisplayIndex +1);
	               return nRow;
	            },
		
	   		 "footerCallback": function ( row, data, start, end, display ) {
		            var api = this.api(), data;
		 
		            // Remove the formatting to get integer data for summation
		            var intVal = function ( i ) {
		                return typeof i === 'string' ?
		                    i.replace(/[\$,]/g, '')*1 :
		                    typeof i === 'number' ?
		                        i : 0;
		            };
		 
		         
		            pageTotal = api
		                .column( 9 )
		                .data()
		                .reduce( function (a, b) {
		                    return intVal(a) + intVal(b);
		                }, 0 );
		 
		            // Update footer
		            $( api.column( 9 ).footer() ).html(
		            		
		              parseFloat(pageTotal).toFixed(2)
		               
		            );
		            console.log( pageTotal);
	            
	        },
	            
		    	destroy: true,
		        searching: false,
		        
		      
		columns: [
		          			
		          			{"data": "billNo", "width": "5%"},
				            {"data": "customerName" , "width": "5%"},
		          			{"data": "product", "width": "5%"},
				            {"data": "manufacturer", "width": "5%"},
				            {"data": "gstNo" , "width": "5%"},				           
				            {"data": "weight" , "width": "5%"},
				            {"data": "salePrice" , "width": "5%"},
				            {"data": "mrp" , "width": "5%"},
				            {"data": "taxPercentage" , "width": "5%"},
				            /*{"data": "kg" , "width": "5%"},
				            {"data": "grams" , "width": "5%"},
				            {"data": "ltr" , "width": "5%"},
				            {"data": "mili" , "width": "5%"},*/
				            {"data": "quantityCCReports" , "width": "5%"},
				            {"data": "unitName" , "width": "5%"},				            
				            {"data": "taxAmount", "width": "5%"},

 
				           
		        ],
		      
		        
		    } );
		} );
		
	var mydata = catmap;
	$('#saleTaxTwo').dataTable().fnAddData(mydata);
	
		}
	

	);
	

	
	
	

}

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

/*+++++++++++++ for Purchase +++++++++++++++*/
/*+++++++++++++++++  Single date ++++++++++++++++*/

function taxReportForPurchaseSingleDateValidation()
{
	var fk_cat_id_for_purchase = $("#fk_cat_id_for_purchase").val();
	var fDatePurchase = $("#fDatePurchase").val();
	var sDatePurchase = $("#sDatePurchase").val();
	
	if(fk_cat_id_for_purchase == "")
		{
			msg="Please Select Product Category";
			customAlert(msg);
			return false;
		}
	if(fDatePurchase == "")
		{
			msg="Please Select First Date";
			customAlert(msg);
			return false;
		}
	if(sDatePurchase == "")
		{
			msg="Please Select End Date";
			customAlert(msg);
			return false;
		}
	
	taxReportForPurchaseSingleDate();
}

function taxReportForPurchaseSingleDate()
{

	var params= {};
	
	var input1 = document.getElementById('fk_cat_id_for_purchase'),
	list = document.getElementById('cat_drop_for_purchase'),
	i,fk_cat_id;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input1.value) {
			fk_cat_id = list.options[i].getAttribute('data-value');
		}
	}
	
	var fk_cat_id = fk_cat_id;
	var fDate= $('#fDatePurchase').val();
	var sDate= $('#sDatePurchase').val();
	params["cat"]= fk_cat_id;
	params["fDate"]= fDate;
	params["sDate"]= sDate;
	params["methodName"] = "getTaxDetailsAsPerCategoryFromPurchase";

	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
			{
		
		$('#purchaseTaxSingle').dataTable().fnClearTable();
		
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		
		
		
		$(document).ready(function() {
		 var total =   $('#purchaseTaxSingle').DataTable( {
			 
			 fnRowCallback : function(nRow, aData, iDisplayIndex){
	                $("th:first", nRow).html(iDisplayIndex +1);
	               return nRow;
	            },
		
	   		 "footerCallback": function ( row, data, start, end, display ) {
		            var api = this.api(), data;
		 
		            // Remove the formatting to get integer data for summation
		            var intVal = function ( i ) {
		                return typeof i === 'string' ?
		                    i.replace(/[\$,]/g, '')*1 :
		                    typeof i === 'number' ?
		                        i : 0;
		            };
		 
		         
		            pageTotal = api
		                .column( 10 )
		                .data()
		                .reduce( function (a, b) {
		                    return intVal(a) + intVal(b);
		                }, 0 );
		 
		            // Update footer
		            $( api.column( 10 ).footer() ).html(
		            		
		              parseFloat(pageTotal).toFixed(2)
		               
		            );
		            console.log( pageTotal);
	            
	        },
	            
		    	destroy: true,
		        searching: false,
		        
		      
		columns: [
		          			{"data": "supplier", "width": "5%"},
		          			{"data": "tinNo", "width": "5%"},
		          			{"data": "billNo", "width": "5%"},
				            {"data": "productName", "width": "5%"},
				            {"data": "companyName", "width": "5%"},
				            {"data": "weight" , "width": "5%"},
				            {"data": "buyPrice" , "width": "5%"},
				            {"data": "mrp" , "width": "5%"},
				            {"data": "taxPercentage" , "width": "5%"},
				            {"data": "quantity2" , "width": "5%"},
				            {"data": "taxAmount", "width": "5%"},
				           
		        ],
		      
		        
		    } );
		} );
		
	var mydata = catmap;
	$('#purchaseTaxSingle').dataTable().fnAddData(mydata);
});
}

function fetchtaxdetailsforedit(){
	
	var params= {};
	 var input1 = document.getElementById('taxType1'),
		 list   = document.getElementById('tax_drop1'),
		 		  i,taxType1;
	 
	 for (i = 0; i < list.options.length; ++i) {
			if (list.options[i].value === input1.value) {
				taxType1 = list.options[i].getAttribute('data-value');
			}
		}
	
	 $("#taxName").append($("<input/>").attr("value","").text());
	 $("#sgst").append($("<input/>").attr("value","").text());
	 $("#cgst").append($("<input/>").attr("value","").text());
	 $("#taxPercentage").append($("<input/>").attr("value","").text());
	 
	 params["taxID"]= taxType1;
	 
	 params["methodName"] = "getTaxDetailsToEdit";
	 
	 $.post('/Shop/jsp/utility/controller.jsp',params,function(data){
			
			var jsonData = $.parseJSON(data);
			var catmap = jsonData.list;
			$.each(jsonData,function(i,v)
					{
				      document.getElementById("taxName").value = v.taxType;
					  document.getElementById("sgst").value = v.sgst;
				      document.getElementById("cgst").value = v.cgst;
				      document.getElementById("taxPercentage").value = v.taxPercentage;
				      		      
					});
				}).error(function(jqXHR, textStatus, errorThrown){
					if(textStatus==="timeout") {

					}
				});
	
}

function reset1()
{
   document.txc.reset();	
}
function back1()
{
 window.location("product_detail.jsp")	
}