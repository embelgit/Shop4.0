//FETCH PRODUCT DETAIL 10-6-17
function getProductDetailForSeedBillForPesti(){

	var params= {};
	//var itemparams={};
	productId = $('#proName').val();
	
	$("#proName option:selected").each(function() {
		   selectedVal = $(this).text();
		});
	
	var splitText = selectedVal.split(",");
	
	var proName = splitText[0];
	var company = splitText[1];
	var weight = splitText[2];
	
	$("#batchNo option:selected").each(function() {
		   selectedVal = $(this).text();
		});
	
	var splitText = selectedVal.split(",");
	
	var batchNum = splitText[1];
	
	params["batchNum"]= batchNum;
	params["proName"]= proName;
	params["company"]= company;
	params["weight"]= weight;
	
	
	var count=0;
	var newrow;
	var rowId;
	
	params["methodName"] = "getProductDetailsforSeed";
	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
 	    	{
			  var jsonData = $.parseJSON(data);
				
		      // $("#list4").jqGrid("clearGridData", true).trigger("reloadGrid");
	        
		     $.each(jsonData,function(i,v)
				{
		    	 
		    	 
		        function sumFmatter (cellvalue, options, rowObject)
		        {
		            
		        	var tax = options.rowData.vatPercentage;
		        	
		        	if(tax == 0){
		        		var tot= (options.rowData.quantity * options.rowData.salePrice);
		        		if(isNaN(tot)){
		        			tot = 0;
						}
		        	}
		        	if(tax != 0){
		        		
		        		var taxcalculation = (tax/100)*Number(options.rowData.salePrice);
		        		var newSalePrice = Number(options.rowData.salePrice) + Number(taxcalculation);
		        		var tot= (Number(options.rowData.quantity) * Number(newSalePrice));
		        		if(isNaN(tot)){
		        			tot = 0;
						}
		        	}
		        	var jam=0;
		        	
		        	
		        	var count = jQuery("#credit").jqGrid('getGridParam', 'records');
		        	var allRowsInGrid1 = $('#credit').getGridParam('data');
		        	var AllRows=JSON.stringify(allRowsInGrid1);
		        	for (var i = 0; i < count; i++) {
		        		
		            	var quantity = allRowsInGrid1[i].quantity;
		             	params["quantity"+i] = quantity;
		             	
		             	var salePrice = allRowsInGrid1[i].salePrice;
		            	params["salePrice"+i] = salePrice;
		            	
		            	var vatPercentage = allRowsInGrid1[i].vatPercentage;
		            	params["vatPercentage"+i] = vatPercentage;
		            	
		            	if(vatPercentage == 0){
		            		
		            		var totals1=(salePrice)*(quantity);
		            		if(isNaN(totals1)){
			             		totals1 = 0;
							}
			            	jam = jam + totals1;
		            	}
		            	
		                if(vatPercentage != 0){
		                	
		                	var taxcal = (vatPercentage/100) * Number(salePrice);
		                	var newSalePrice = Number(salePrice) + Number(taxcal);
		                	var totals1=(Number(newSalePrice)*Number(quantity));
		                	if(isNaN(totals1)){
			             		totals1 = 0;
							}
			            	jam = jam + totals1;
		                }                	
		                
	            	
	        	    }
		        	
		        		
		        		 document.getElementById("totalWithExpense").value = jam;
		        	
		            	 return tot;

		        }
		        
		        count = jQuery("#credit").jqGrid('getGridParam', 'records'); 
			     var rowdata =$("#credit").jqGrid('getGridParam','data');
			     var ids = jQuery("#credit").jqGrid('getDataIDs');
				 
				
				  var batchName;
				  var proName;
				  var company;
				  var weight;
				  for (var j = 0; j < count; j++) 
				  {
					  batchName = rowdata[j].batchNumber;
					  proName = rowdata[j].itemName;
					  company = rowdata[j].companyName;
					  weight = rowdata[j].weight;
					  
					 var rowId = ids[j];
					 var rowData = jQuery('#credit').jqGrid ('getRowData', rowId);
					
					if (batchName == jsonData.offer.batchNumber && proName == jsonData.offer.itemName && company == jsonData.offer.companyName && weight == jsonData.offer.weight) {
				    	/*ori_quantity = +rowdata[j].quantity+1;
				    	
				    	$("#list4").jqGrid("setCell", rowId, "quantity", ori_quantity);
				    	var grid = jQuery("#list4");
				    	grid.trigger("reloadGrid");*/
				    	newrow=false;
						alert("Product Name Already Inserted !!!");
						var grid = jQuery("#list4");
					    grid.trigger("reloadGrid");
				    	break;
					}
					else
					{
						newrow = true;
					}
				 }
				  
				  if(newrow == true)
					 {
						
					 // $("#credit").addRowData(i,jsonData[i]);
					  $("#credit").addRowData(count,jsonData.offer);
						
					 }
			
			
			
			$("#credit").jqGrid({
				datatype: "local",
				
				colNames:['cat_id','ItemName','CompanyName','Packing','Batch Number','Unit','Quantity', 'UnitPrice','MRP','TaxPercentage' ,'Total'],
				colModel:[ 
						     {
						    	 name:'cat_id',
						    	 hidden:true,
						     },
				          
	               
				     {	name:'itemName',
				    	 width:150,
						
					},
					
				     {	name:'companyName',
				    	 width:150,
						
					},
				           
				   
					{	name:'weight',
						width:100,
						editable: true
						
					},
					{	name:'batchNumber',
						width:70,
						editable: true
						
					},
					{	name:'unitName',
						width:100,
						editable: true
						
					},
					{	name:'quantity',
						width:100,
						editable: true
						
					},

					{	name:'salePrice',
						width:150,
						editable: true
						
					},
					{	name:'mrp',
						width:140,
						editable: true
						
					},
					
					{	name:'vatPercentage',
						width:100,
						editable: true
						
					},
					{	name:'total',
						width:150,
						formatter: sumFmatter
					},
					
					
				],
					
				
				sortorder : 'desc',
				loadonce: false,
				viewrecords: true,
				width: 1300,
	            height: 350,
	            rowheight: 300,
	            hoverrows: true,
		        rownumbers: true,
	            rowNum: 10,
	            'cellEdit':true,
		           afterSaveCell: function () {
		        	   // $(this).trigger('reloadGrid');
		        	   var rowId =$("#credit").jqGrid('getGridParam','selrow');  
	                var rowData = jQuery("#credit").getRowData(rowId);
	             	var quantity = rowData['quantity'];
	             	var salePrice = rowData['salePrice'];
	             	
	             	var tota = quantity * salePrice;
	             	
	             	$("#credit").jqGrid("setCell", rowId, "total", tota);
		        	},
	           
				pager: "#jqGridPager",
				
				
				
			});
			
		
			//$("#credit").addRowData(i+1,jsonData[i]);
			if(count==0 || count==null)
			{
				// $("#credit").addRowData(i,jsonData[i]);
				 $("#credit").addRowData(0,jsonData.offer);
			}
			
			

	     
			 $('#credit').navGrid('#jqGridPager',
		                
		                { edit: true, add: false, del: true, search: true, refresh: true, view: true, position: "left", cloneToTop: false },
		                
		                {
		                    editCaption: "The Edit Dialog",
		                   
		                    afterSubmit: function () {
								
		                      var grid = $("#credit"),
							  intervalId = setInterval(
								 function() {
								         grid.trigger("reloadGrid",[{current:true}]);
								   },
								   500);
		                         
		                      
							},
							
							 recreateForm: true,
							 checkOnUpdate : true,
							 checkOnSubmit : true,
			                 closeAfterEdit: true,
							
		                    errorTextFormat: function (data) {
		                        return 'Error: ' + data.responseText
		                    }
		                },
		                
		                {
		                    closeAfterAdd: true,
		                    recreateForm: true,
		                    errorTextFormat: function (data) {
		                        return 'Error: ' + data.responseText
		                    }
		                },
		                
		                {
		                	closeAfterdel:true,
		                	checkOnUpdate : true,
							checkOnSubmit : true,
							recreateForm: true,
		                	
							reloadAftersubmit:true,	
		                    errorTextFormat: function (data) {
		                        return 'Error: ' + data.responseText
		                    }
		                		
		                });
			 
			 
				   });
				
 			})

	
}


/*+++++++++++++++++++++++ Adding Cash Customer Bill ++++++++++++++++++++++++++++*/
function addPestiBill(){

	if ( document.pestiBill.customerName.value == "" )
	 {
    alert("Please Enter Customer Name");
    return false;
	 }
	 var letterNumber = /^[a-zA-Z, ]+$/;
	 if(document.pestiBill.customerName.value.match(letterNumber))
	 {
	if ( document.pestiBill.village.value == "" )
	 {
     alert("Please Enter Village");
     return false;
	 }
	 var letterNumber = /^[a-zA-Z, ]+$/;
	 if(document.pestiBill.village.value.match(letterNumber))
	 {
	
	if ( document.pestiBill.contactNo.value == "" )
	 {
      alert("Please Enter Contact Number");
      return false;
	 }
	 var letterNumber = /^[0-9]{10}$/;
	 if(document.pestiBill.contactNo.value.match(letterNumber))
	 {
	if ( document.pestiBill.aadharNo.value == "" )
		 {
	       alert("Please Enter Aadhar Number");
	       return false;
		 }
		 var letterNumber = /^[0-9]{12}$/;
		 if(document.pestiBill.aadharNo.value.match(letterNumber))
		 {
						   	    if ( document.pestiBill.proName.value == "" )
							   	       {
											alert("Please Select Product Name");
											return false;
									   	        }
								   	 if ( document.pestiBill.batchNo.value == "" )
							   	        {
											alert("Please Select Batch Number");
											 return false;
							   	        }
						   	        	if ( document.pestiBill.paymentMode.value == "" )
							   	        {
											alert("Please Select Payment Mode");
											 return false;
							   	        }
					   	        				 
					   	        				if ( document.pestiBill.transExpence.value == "" )
						   	        			 {
										  	       alert("Please Enter Transportation Expense");
										  	       return false;
						   	        			 }
						   	        			 var letterNumber = /^\s*-?[1-9]\d*(\.\d{1,2})?\s*$/;
						   	        			 var num = /^\d+$/;
						   	        			 if(document.pestiBill.transExpence.value.match(letterNumber) || document.pestiBill.transExpence.value.match(num))
						   	        			 {
						   	        				if ( document.pestiBill.hamaliExpence.value == "" )
							   	        			 {
											  	       alert("Please Enter Hamali Expense");
											  	       return false;
							   	        			 }
							   	        			 var letterNumber = /^\s*-?[1-9]\d*(\.\d{1,2})?\s*$/;
							   	        			var num = /^\d+$/;
							   	        			 if(document.pestiBill.hamaliExpence.value.match(letterNumber) || document.pestiBill.hamaliExpence.value.match(num))
							   	        			 {
							   	        				PestiBill();
														}
										
							   	        			else
													{
														alert("Enter only Numbers upto 2 decimal in Hamali Expense field..!!");
														return false;
													} 
						   	        			 }
							   	        else
											{
												alert("Enter only Numbers upto 2 decimal in Transportation Expense field..!!");
												return false;
											}
										}
		  else
			{
				alert("Enter valid 12 digit Aadhar Number");
				return false;
			}
		}
	 else
		{
			alert("Enter valid 10 digit Contact Number");
			return false;
		}
	}
	 else
		{
			alert("Enter only Alphanumeric in Village field");
			return false;
		}
	}
	 else
		{
			alert("Enter only Alphanumeric in Customer Name field");
			return false;
		}
	}


function PestiBill(){
	document.pestiBill.btn1.disabled = true;
	var params = {};

	$("#batchNo option:selected").each(function() {
		   selectedVal = $(this).text();
		});
	
	var splitText = selectedVal.split(",");
	
	var batchNum = splitText[1];
	var stock = splitText[3];
	
	params["batchNum"]= batchNum;
	params["stock"]= stock;
	
	var customerName = $('#customerName').val();
	var village = $('#village').val();
	var contactNo = $('#contactNo').val();
	var aadhar = $('#aadharNo').val();
	var transExpense = $('#transExpence').val();
	var hamaliExpense = $('#hamaliExpence').val();
	var grossTotal = $('#grossTotal').val();
	var total = $('#totalWithExpense').val();
	var paymentMode = $('#paymentMode').val();
	var chequeNum = $('#chequeNum').val();
	var nameOnCheck = $('#nameOnCheck').val();
	var cardNum = $('#cardNum').val();
	var accNum = $('#accNum').val();
	var bankName = $('#bankName').val();
	
	var count = jQuery("#credit").jqGrid('getGridParam', 'records');
	var allRowsInGrid = $('#credit').getGridParam('data');//to get all rows of grid
	var AllRows=JSON.stringify(allRowsInGrid);
	for (var i = 0; i < count; i++) {

		
		var PkGoodreceiveId = allRowsInGrid[i].PkGoodreceiveId;
		params["PkGoodreceiveId"+i] = PkGoodreceiveId;
		
		var supplier_id = allRowsInGrid[i].supplier_id;
		params["supplier_id"+i] = supplier_id;
		
		var cat_id = allRowsInGrid[i].cat_id;
		params["cat_id"+i] = cat_id;
		
		var barcodeNo = allRowsInGrid[i].barcodeNo;
		params["barcodeNo"+i] = barcodeNo;
		
		var itemName = allRowsInGrid[i].itemName;
		params["itemName"+i] = itemName;
		
		
		var companyName = allRowsInGrid[i].companyName;
		params["companyName"+i] = companyName;
		
		var weight = allRowsInGrid[i].weight;
		params["weight"+i] = weight;
		
		var quantity = allRowsInGrid[i].quantity;
		params["quantity"+i] = quantity;
		
		var salePrice = allRowsInGrid[i].salePrice;
		params["salePrice"+i] = salePrice;
		
		var mrp = allRowsInGrid[i].mrp;
		params["mrp"+i] = mrp;
		
		var vatPercentage = allRowsInGrid[i].vatPercentage;
		params["vatPercentage"+i] = vatPercentage;
		
		var total = allRowsInGrid[i].total;
		params["total"+i] = total;
		
		var expiryDate = allRowsInGrid[i].expiryDate;
		params["expiryDate"+i] = expiryDate;
		
		var batchNumber = allRowsInGrid[i].batchNumber;
		params["batchNumber"+i] = batchNumber;
	}
	
	params["customerName"] = customerName;
	params["count"] = count;
	params["village"] = village;
	params["contactNo"] = contactNo;
	params["aadhar"] = aadhar;
	params["transExpense"] = transExpense;
	params["total"] = total;
	params["grossTotal"] = grossTotal;
	params["hamaliExpense"] = hamaliExpense;

	params["paymentMode"] = paymentMode;
	params["chequeNum"] = chequeNum;
	params["nameOnCheck"] = nameOnCheck;
	params["cardNum"] = cardNum;
	params["accNum"] = accNum;
	params["bankName"] = bankName;
	
	params["methodName"] = "addingPesticideBill";
	
	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
 	    	{
 				alert(data);
 				window.open("pesticideBillPdf.jsp");
 				location.reload();
 			}
 	    	).error(function(jqXHR, textStatus, errorThrown){
 	    		if(textStatus==="timeout") {
 	    			$(loaderObj).hide();
 	    			$(loaderObj).find('#errorDiv').show();
 	    		}
 	    	});



}


/*++++++++++++++  Adding credit customer bill ++++++++++++++++++*/
function addBillForCreditCustomerForPesti(){
	
	if ( document.pestiBillforCredit.creditCustomer.value == "" )
	 {
    alert("Please Select Customer Name");
    return false;
	 }
	 
	if ( document.pestiBillforCredit.village1.value == "" )
	 {
     alert("Please Enter Village");
     return false;
	 }
	 var letterNumber = /^[a-zA-Z, ]+$/;
	 if(document.pestiBillforCredit.village1.value.match(letterNumber))
	 {
	
	if ( document.pestiBillforCredit.contactNo1.value == "" )
	 {
      alert("Please Enter Contact Number");
      return false;
	 }
	 var letterNumber = /^[0-9]{10}$/;
	 if(document.pestiBillforCredit.contactNo1.value.match(letterNumber))
	 {
	if ( document.pestiBillforCredit.aadharNo1.value == "" )
		 {
	       alert("Please Enter Aadhar Number");
	       return false;
		 }
		 var letterNumber = /^[0-9]{12}$/;
		 if(document.pestiBillforCredit.aadharNo1.value.match(letterNumber))
		 {
						   	    if ( document.pestiBillforCredit.proName1.value == "" )
							   	       {
											alert("Please Select Product Name");
											return false;
							   	        }
									   	 if ( document.pestiBillforCredit.batchNo1.value == "" )
								   	       {
												alert("Please Select Batch Number");
												return false;
								   	        }
					   	        				 
					   	        				if ( document.pestiBillforCredit.transExpence1.value == "" )
						   	        			 {
										  	       alert("Please Enter Transportation Expense");
										  	       return false;
						   	        			 }
						   	        			 var letterNumber = /^\s*-?[0-9]\d*(\.\d{1,2})?\s*$/;
						   	        			var num = /^\d+$/;
						   	        			 if(document.pestiBillforCredit.transExpence1.value.match(letterNumber) || document.pestiBillforCredit.transExpence1.value.match(num))
						   	        			 {
						   	        				if ( document.pestiBillforCredit.hamaliExpence1.value == "" )
							   	        			 {
											  	       alert("Please Enter Hamali Expense");
											  	       return false;
							   	        			 }
							   	        			 var letterNumber = /^\s*-?[0-9]\d*(\.\d{1,2})?\s*$/;
							   	        			var num = /^\d+$/;
							   	        			 if(document.pestiBillforCredit.hamaliExpence1.value.match(letterNumber) || document.pestiBillforCredit.hamaliExpence1.value.match(num))
							   	        			 {
						   	        				 
							   	        				BillForCreditCustomerForPesti();
														}
										
							   	        			else
													{
														alert("Enter only Numbers upto 2 decimal in Hamali Expense field..!!");
														return false;
													} 
						   	        			 }
							   	        else
											{
												alert("Enter only Numbers upto 2 decimal in Transportation Expense field..!!");
												return false;
											}
										}
		  else
			{
				alert("Enter valid 12 digit Aadhar Number");
				return false;
			}
		}
	 else
		{
			alert("Enter valid 10 digit Contact Number");
			return false;
		}
	}
	 else
		{
			alert("Enter only Alphanumeric in Village field");
			return false;
		}
	
}




function BillForCreditCustomerForPesti(){

	document.pestiBillforCredit.custbtn.disable= true ;
	var params = {};
	
	var input = document.getElementById('creditCustomer'),
    list = document.getElementById('cust_drop1'),
    i,creditCustomer;

	for (i = 0; i < list.options.length; ++i) {
    if (list.options[i].value === input.value) {
    	creditCustomer = list.options[i].getAttribute('data-value');
    	}
	}
	
	var fkCreditCustomerID = creditCustomer;
	var creditCustomerName = $('#creditCustomer').val();
	var creditCustomerHiddenName = $('#customerNameHidden').val();
	var village = $('#village1').val();
	var contactNo = $('#contactNo1').val();
	var aadhar = $('#aadharNo1').val();
	var transExpense = $('#transExpence1').val();
	var hamaliExpense = $('#hamaliExpence1').val();
	var grossTotal = $('#grossTotal1').val();
	var total = $('#totalWithExpense1').val();
	
	var count = jQuery("#credit1").jqGrid('getGridParam', 'records');
	var allRowsInGrid = $('#credit1').getGridParam('data');//to get all rows of grid
	var AllRows=JSON.stringify(allRowsInGrid);
	for (var i = 0; i < count; i++) {

		
		var PkGoodreceiveId = allRowsInGrid[i].PkGoodreceiveId;
		params["PkGoodreceiveId"+i] = PkGoodreceiveId;
		
		var supplier_id = allRowsInGrid[i].supplier_id;
		params["supplier_id"+i] = supplier_id;
		
		var cat_id = allRowsInGrid[i].cat_id;
		params["cat_id"+i] = cat_id;
		
		var barcodeNo = allRowsInGrid[i].barcodeNo;
		params["barcodeNo"+i] = barcodeNo;
		
		var itemName = allRowsInGrid[i].itemName;
		params["itemName"+i] = itemName;
		
		
		var companyName = allRowsInGrid[i].companyName;
		params["companyName"+i] = companyName;
		
		var weight = allRowsInGrid[i].weight;
		params["weight"+i] = weight;
		
		var quantity = allRowsInGrid[i].quantity;
		params["quantity"+i] = quantity;
		
		var salePrice = allRowsInGrid[i].salePrice;
		params["salePrice"+i] = salePrice;
		
		var mrp = allRowsInGrid[i].mrp;
		params["mrp"+i] = mrp;
		
		var vatPercentage = allRowsInGrid[i].vatPercentage;
		params["vatPercentage"+i] = vatPercentage;
		
		var total = allRowsInGrid[i].total;
		params["total"+i] = total;
		
		var expiryDate = allRowsInGrid[i].expiryDate;
		params["expiryDate"+i] = expiryDate;
		
		var batchNumber = allRowsInGrid[i].batchNumber;
		params["batchNumber"+i] = batchNumber;
	}
	
	params["creditCustomerHiddenName"] = creditCustomerHiddenName;
	params["fkCreditCustomerID"] = fkCreditCustomerID;
	params["count"] = count;
	params["village"] = village;
	params["contactNo"] = contactNo;
	params["aadhar"] = aadhar;
	params["transExpense"] = transExpense;
	params["total"] = total;
	params["grossTotal"] = grossTotal;
	params["hamaliExpense"] = hamaliExpense;
	params["creditCustomerName"] = creditCustomerName;
	
	params["methodName"] = "addingPesticideBill";
	
	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
 	    	{
 				alert(data);
 				
 				document.pestiBillforCredit.custbtn.disabled =false;
 				window.open("pesticideBillPdf.jsp");
 				location.reload();
 			}
 	    	).error(function(jqXHR, textStatus, errorThrown){
 	    		if(textStatus==="timeout") {
 	    			$(loaderObj).hide();
 	    			$(loaderObj).find('#errorDiv').show();
 	    		}
 	    	});

	

}


/*+++++++++++++++++++++ fetch details for credit ++++++++++++++++++++++++++++++*/
function gridForCreditForPesti(){

	var params= {};
	//var itemparams={};
	
	$("#proName1 option:selected").each(function() {
		   selectedVal = $(this).text();
		});
	
	var splitText = selectedVal.split(",");
	
	var proName = splitText[0];
	var company = splitText[1];
	var weight = splitText[2];
	
	$("#batchNo1 option:selected").each(function() {
		   selectedVal = $(this).text();
		});
	
	var splitText = selectedVal.split(",");
	
	var batchNum = splitText[1];
	
	params["batchNum"]= batchNum;
	params["proName"]= proName;
	params["company"]= company;
	params["weight"]= weight;
	
	var count=0;
	var newrow;
	var rowId;
	
	params["methodName"] = "getProductDetailsforSeed";
	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
 	    	{
			  var jsonData = $.parseJSON(data);
				
		      // $("#list4").jqGrid("clearGridData", true).trigger("reloadGrid");
	        
		     $.each(jsonData,function(i,v)
				{
		    	 
		    	 
		        function sumFmatter (cellvalue, options, rowObject)
		        {
		            
		        	var tax = options.rowData.vatPercentage;
		        	
		        	if(tax == 0){
		        		var tot= (options.rowData.quantity * options.rowData.salePrice);
		        		if(isNaN(tot)){
		        			tot = 0;
						}
		        	}
		        	if(tax != 0){
		        		
		        		var taxcalculation = (tax/100)* Number(options.rowData.salePrice);
		        		var newSalePrice = Number(options.rowData.salePrice) + Number(taxcalculation);
		        		var tot= (Number(options.rowData.quantity) * Number(newSalePrice));
		        		if(isNaN(tot)){
		        			tot = 0;
						}
		        	}
		        	var jam=0;
		        	
		        	
		        	var count = jQuery("#credit1").jqGrid('getGridParam', 'records');
		        	var allRowsInGrid1 = $('#credit1').getGridParam('data');
		        	var AllRows=JSON.stringify(allRowsInGrid1);
		        	for (var i = 0; i < count; i++) {
		        		
		            	var quantity = allRowsInGrid1[i].quantity;
		             	params["quantity"+i] = quantity;
		             	
		             	var salePrice = allRowsInGrid1[i].salePrice;
		            	params["salePrice"+i] = salePrice;
		            	
		            	var vatPercentage = allRowsInGrid1[i].vatPercentage;
		            	params["vatPercentage"+i] = vatPercentage;
		            	
		            	if(vatPercentage == 0){
		            		
		            		var totals1=(salePrice)*(quantity);
		            		if(isNaN(totals1)){
			             		totals1 = 0;
							}
			            	jam = jam + totals1;
		            	}
		            	
		                if(vatPercentage != 0){
		                	
		                	var taxcal = (vatPercentage/100) * Number(salePrice);
		                	var newSalePrice = Number(salePrice) + Number(taxcal);
		                	var totals1=(Number(newSalePrice)*Number(quantity));
		                	if(isNaN(totals1)){
			             		totals1 = 0;
							}
			            	jam = jam + totals1;
		                }                	
		            	
	            	
	        	    }
		        	
		        		
		        		 document.getElementById("totalWithExpense1").value = jam;
		        	
		            	 return tot;

		        }
		        
		        count = jQuery("#credit1").jqGrid('getGridParam', 'records'); 
			     var rowdata =$("#credit1").jqGrid('getGridParam','data');
			     var ids = jQuery("#credit1").jqGrid('getDataIDs');
				 
				
				  var batchName;
				  var proName;
				  var company;
				  var weight;
				  for (var j = 0; j < count; j++) 
				  {
					  batchName = rowdata[j].batchNumber;
					  proName = rowdata[j].itemName;
					  company = rowdata[j].companyName;
					  weight = rowdata[j].weight;
					
					 var rowId = ids[j];
					 var rowData = jQuery('#credit1').jqGrid ('getRowData', rowId);
					
					if (batchName == jsonData.offer.batchNumber && proName == jsonData.offer.itemName && company == jsonData.offer.companyName && weight == jsonData.offer.weight) {
				    	/*ori_quantity = +rowdata[j].quantity+1;
				    	
				    	$("#list4").jqGrid("setCell", rowId, "quantity", ori_quantity);
				    	var grid = jQuery("#list4");
				    	grid.trigger("reloadGrid");*/
				    	newrow=false;
						alert("Product Name Already Inserted !!!");
						var grid = jQuery("#credit1");
					    grid.trigger("reloadGrid");
				    	break;
					}
					else
					{
						newrow = true;
					}
				 }
				  
				  if(newrow == true)
					 {
						
					  //$("#list4").addRowData(i,jsonData[i]);
					  $("#credit1").addRowData(count,jsonData.offer);
						
					 }
		    
			
			
			$("#credit1").jqGrid({
				datatype: "local",
				
				colNames:['cat_id','ItemName','CompanyName','Packing','Batch Number','Unit','Quantity', 'UnitPrice','MRP','TaxPercentage' ,'Total'],
				colModel:[ 
						     {
						    	 name:'cat_id',
						    	 hidden:true,
						     },
				          
	               
				     {	name:'itemName',
				    	 width:150,
						
					},
					
				     {	name:'companyName',
				    	 width:150,
						
					},
				           
				   
					{	name:'weight',
						width:100,
						editable: true
						
					},
					{	name:'batchNumber',
						width:70,
						editable: true
						
					},
					{	name:'unitName',
						width:70,
						editable: true
						
					},
					{	name:'quantity',
						width:100,
						editable: true
						
					},

					{	name:'salePrice',
						width:150,
						editable: true
						
					},
					{	name:'mrp',
						width:140,
						editable: true
						
					},
					
					{	name:'vatPercentage',
						width:100,
						editable: true
						
					},
					{	name:'total',
						width:150,
						formatter: sumFmatter
					},
					
					
				],
					
				
				sortorder : 'desc',
				loadonce: false,
				viewrecords: true,
				width: 1300,
	            height: 350,
	            rowheight: 300,
	            hoverrows: true,
		        rownumbers: true,
	            rowNum: 10,
	            'cellEdit':true,
		           afterSaveCell: function () {
		        	   // $(this).trigger('reloadGrid');
		        	   var rowId =$("#credit1").jqGrid('getGridParam','selrow');  
	                var rowData = jQuery("#credit1").getRowData(rowId);
	             	var quantity = rowData['quantity'];
	             	var salePrice = rowData['salePrice'];
	             	
	             	var tota = quantity * salePrice;
	             	
	             	$("#credit1").jqGrid("setCell", rowId, "total", tota);
		        	},
	           
				pager: "#jqGridPager",
				
				
				
			});
			
		
			//$("#credit1").addRowData(i+1,jsonData[i]);
			if(count==0 || count==null)
			{
				 // $("#list4").addRowData(i,jsonData[i]);
				  $("#credit1").addRowData(0,jsonData.offer);
			}
			
			

	     
			 $('#credit1').navGrid('#jqGridPager',
		                
		                { edit: true, add: false, del: true, search: true, refresh: true, view: true, position: "left", cloneToTop: false },
		                
		                {
		                    editCaption: "The Edit Dialog",
		                   
		                   /* afterSubmit: function () {
								
		                      var grid = $("#credit1"),
							  intervalId = setInterval(
								 function() {
								         grid.trigger("reloadGrid",[{current:true}]);
								   },
								   500);
		                         
		                      
							},*/
							
							 recreateForm: true,
							 checkOnUpdate : true,
							 checkOnSubmit : true,
			                 closeAfterEdit: true,
							
		                    errorTextFormat: function (data) {
		                        return 'Error: ' + data.responseText
		                    }
		                },
		                
		                {
		                    closeAfterAdd: true,
		                    recreateForm: true,
		                    errorTextFormat: function (data) {
		                        return 'Error: ' + data.responseText
		                    }
		                },
		                
		                {
		                	closeAfterdel:true,
		                	checkOnUpdate : true,
							checkOnSubmit : true,
							recreateForm: true,
		                	
							reloadAftersubmit:true,	
		                    errorTextFormat: function (data) {
		                        return 'Error: ' + data.responseText
		                    }
		                		
		                });
			 
			 
				   });
				
 			})
}


//get pesticide details as per barcode for credit billing
function getPesticideProDetailAsPerBarcodeForCredit(){

	var value = document.getElementById("pestiCreditBarcode").value;
	
	var params= {};
	var count=0;
	var newrow;
	var rowId;

	params["methodName"] ="getPesticideDetailsAsPerBarcode";
	params["key"]=value;
	

	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
			{
		  var jsonData = $.parseJSON(data);
			
	      // $("#list4").jqGrid("clearGridData", true).trigger("reloadGrid");
      
	     $.each(jsonData,function(i,v)
			{
	    	 
	    	 
	        function sumFmatter (cellvalue, options, rowObject)
	        {
	            
	        	var tax = options.rowData.vatPercentage;
	        	
	        	if(tax == 0){
	        		var tot= (options.rowData.quantity * options.rowData.salePrice);
	        		if(isNaN(tot)){
	        			tot = 0;
					}
	        	}
	        	if(tax != 0){
	        		
	        		var taxcalculation = (tax/100)* Number(options.rowData.salePrice);
	        		var newSalePrice = Number(options.rowData.salePrice) + Number(taxcalculation);
	        		var tot= (Number(options.rowData.quantity) * Number(newSalePrice));
	        		if(isNaN(tot)){
	        			tot = 0;
					}
	        	}
	        	var jam=0;
	        	
	        	
	        	var count = jQuery("#credit1").jqGrid('getGridParam', 'records');
	        	var allRowsInGrid1 = $('#credit1').getGridParam('data');
	        	var AllRows=JSON.stringify(allRowsInGrid1);
	        	for (var i = 0; i < count; i++) {
	        		
	            	var quantity = allRowsInGrid1[i].quantity;
	             	params["quantity"+i] = quantity;
	             	
	             	var salePrice = allRowsInGrid1[i].salePrice;
	            	params["salePrice"+i] = salePrice;
	            	
	            	var vatPercentage = allRowsInGrid1[i].vatPercentage;
	            	params["vatPercentage"+i] = vatPercentage;
	            	
	            	if(vatPercentage == 0){
	            		
	            		var totals1=(salePrice)*(quantity);
	            		if(isNaN(totals1)){
		             		totals1 = 0;
						}
		            	jam = jam + totals1;
	            	}
	            	
	                if(vatPercentage != 0){
	                	
	                	var taxcal = (vatPercentage/100) * Number(salePrice);
	                	var newSalePrice = Number(salePrice) + Number(taxcal);
	                	var totals1=(Number(newSalePrice)*Number(quantity));
	                	if(isNaN(totals1)){
		             		totals1 = 0;
						}
		            	jam = jam + totals1;
	                }                	
	            	
          	
      	    }
	        	
	        		
	        		 document.getElementById("totalWithExpense1").value = jam;
	        	
	            	 return tot;

	        }
	        
	        count = jQuery("#credit1").jqGrid('getGridParam', 'records'); 
		     var rowdata =$("#credit1").jqGrid('getGridParam','data');
		     var ids = jQuery("#credit1").jqGrid('getDataIDs');
			 
			
			  var batchName;
			  for (var j = 0; j < count; j++) 
			  {
				  batchName = rowdata[j].batchNumber;
				  
				
				 var rowId = ids[j];
				 var rowData = jQuery('#credit1').jqGrid ('getRowData', rowId);
				
				if (batchName == jsonData.offer.batchNumber) {
			    	/*ori_quantity = +rowdata[j].quantity+1;
			    	
			    	$("#list4").jqGrid("setCell", rowId, "quantity", ori_quantity);
			    	var grid = jQuery("#list4");
			    	grid.trigger("reloadGrid");*/
			    	newrow=false;
					alert("Product Name Already Inserted !!!");
					var grid = jQuery("#credit1");
				    grid.trigger("reloadGrid");
			    	break;
				}
				else
				{
					newrow = true;
				}
			 }
			  
			  if(newrow == true)
				 {
					
				  //$("#list4").addRowData(i,jsonData[i]);
				  $("#credit1").addRowData(count,jsonData.offer);
					
				 }
	    
		
		
		$("#credit1").jqGrid({
			datatype: "local",
			
			colNames:['cat_id','ItemName','CompanyName','Packing','Batch Number','Unit','Quantity', 'UnitPrice','MRP','TaxPercentage' ,'Total'],
			colModel:[ 
					     {
					    	 name:'cat_id',
					    	 hidden:true,
					     },
			          
             
			     {	name:'itemName',
			    	 width:150,
					
				},
				
			     {	name:'companyName',
			    	 width:150,
					
				},
			           
			   
				{	name:'weight',
					width:100,
					editable: true
					
				},
				{	name:'batchNumber',
					width:70,
					editable: true
					
				},
				{	name:'unitName',
					width:70,
					editable: true
					
				},
				{	name:'quantity',
					width:100,
					editable: true
					
				},

				{	name:'salePrice',
					width:150,
					editable: true
					
				},
				{	name:'mrp',
					width:140,
					editable: true
					
				},
				
				{	name:'vatPercentage',
					width:100,
					editable: true
					
				},
				{	name:'total',
					width:150,
					formatter: sumFmatter
				},
				
				
			],
				
			
			sortorder : 'desc',
			loadonce: false,
			viewrecords: true,
			width: 1300,
          height: 350,
          rowheight: 300,
          hoverrows: true,
	        rownumbers: true,
          rowNum: 10,
          'cellEdit':true,
	           afterSaveCell: function () {
	        	   // $(this).trigger('reloadGrid');
	        	   var rowId =$("#credit1").jqGrid('getGridParam','selrow');  
              var rowData = jQuery("#credit1").getRowData(rowId);
           	var quantity = rowData['quantity'];
           	var salePrice = rowData['salePrice'];
           	
           	var tota = quantity * salePrice;
           	
           	$("#credit1").jqGrid("setCell", rowId, "total", tota);
	        	},
         
			pager: "#jqGridPager",
			
			
			
		});
		
	
		//$("#credit1").addRowData(i+1,jsonData[i]);
		if(count==0 || count==null)
		{
			 // $("#list4").addRowData(i,jsonData[i]);
			  $("#credit1").addRowData(0,jsonData.offer);
		}
		
		

   
		 $('#credit1').navGrid('#jqGridPager',
	                
	                { edit: true, add: false, del: true, search: true, refresh: true, view: true, position: "left", cloneToTop: false },
	                
	                {
	                    editCaption: "The Edit Dialog",
	                   
	                   /* afterSubmit: function () {
							
	                      var grid = $("#credit1"),
						  intervalId = setInterval(
							 function() {
							         grid.trigger("reloadGrid",[{current:true}]);
							   },
							   500);
	                         
	                      
						},*/
						
						 recreateForm: true,
						 checkOnUpdate : true,
						 checkOnSubmit : true,
		                 closeAfterEdit: true,
						
	                    errorTextFormat: function (data) {
	                        return 'Error: ' + data.responseText
	                    }
	                },
	                
	                {
	                    closeAfterAdd: true,
	                    recreateForm: true,
	                    errorTextFormat: function (data) {
	                        return 'Error: ' + data.responseText
	                    }
	                },
	                
	                {
	                	closeAfterdel:true,
	                	checkOnUpdate : true,
						checkOnSubmit : true,
						recreateForm: true,
	                	
						reloadAftersubmit:true,	
	                    errorTextFormat: function (data) {
	                        return 'Error: ' + data.responseText
	                    }
	                		
	                });
		 
		 
			   });
			
		})
}


//get pesticide details as per barcode for cash billing
function getPesticideProDetailAsPerBarcodeForCash(){

	var value = document.getElementById("pestiBarcode").value;
	
	var params= {};
	var count=0;
	var newrow;
	var rowId;

	params["methodName"] ="getPesticideDetailsAsPerBarcode";
	params["key"]=value;
	

	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
			{
		  var jsonData = $.parseJSON(data);
			
	      // $("#list4").jqGrid("clearGridData", true).trigger("reloadGrid");
      
	     $.each(jsonData,function(i,v)
			{
	    	 
	    	 
	        function sumFmatter (cellvalue, options, rowObject)
	        {
	            
	        	var tax = options.rowData.vatPercentage;
	        	
	        	if(tax == 0){
	        		var tot= (options.rowData.quantity * options.rowData.salePrice);
	        		if(isNaN(tot)){
	        			tot = 0;
					}
	        	}
	        	if(tax != 0){
	        		
	        		var taxcalculation = (tax/100)*Number(options.rowData.salePrice);
	        		var newSalePrice = Number(options.rowData.salePrice) + Number(taxcalculation);
	        		var tot= (Number(options.rowData.quantity) * Number(newSalePrice));
	        		if(isNaN(tot)){
	        			tot = 0;
					}
	        	}
	        	var jam=0;
	        	
	        	
	        	var count = jQuery("#credit").jqGrid('getGridParam', 'records');
	        	var allRowsInGrid1 = $('#credit').getGridParam('data');
	        	var AllRows=JSON.stringify(allRowsInGrid1);
	        	for (var i = 0; i < count; i++) {
	        		
	            	var quantity = allRowsInGrid1[i].quantity;
	             	params["quantity"+i] = quantity;
	             	
	             	var salePrice = allRowsInGrid1[i].salePrice;
	            	params["salePrice"+i] = salePrice;
	            	
	            	var vatPercentage = allRowsInGrid1[i].vatPercentage;
	            	params["vatPercentage"+i] = vatPercentage;
	            	
	            	if(vatPercentage == 0){
	            		
	            		var totals1=(salePrice)*(quantity);
	            		if(isNaN(totals1)){
		             		totals1 = 0;
						}
		            	jam = jam + totals1;
	            	}
	            	
	                if(vatPercentage != 0){
	                	
	                	var taxcal = (vatPercentage/100) * Number(salePrice);
	                	var newSalePrice = Number(salePrice) + Number(taxcal);
	                	var totals1=(Number(newSalePrice)*Number(quantity));
	                	if(isNaN(totals1)){
		             		totals1 = 0;
						}
		            	jam = jam + totals1;
	                }                	
	                
          	
      	    }
	        	
	        		
	        		 document.getElementById("totalWithExpense").value = jam;
	        	
	            	 return tot;

	        }
	        
	        count = jQuery("#credit").jqGrid('getGridParam', 'records'); 
		     var rowdata =$("#credit").jqGrid('getGridParam','data');
		     var ids = jQuery("#credit").jqGrid('getDataIDs');
			 
			
			  var batchName;
			  for (var j = 0; j < count; j++) 
			  {
				  batchName = rowdata[j].batchNumber;
				 
				 var rowId = ids[j];
				 var rowData = jQuery('#credit').jqGrid ('getRowData', rowId);
				
				if (batchName == jsonData.offer.batchNumber) {
			    	/*ori_quantity = +rowdata[j].quantity+1;
			    	
			    	$("#list4").jqGrid("setCell", rowId, "quantity", ori_quantity);
			    	var grid = jQuery("#list4");
			    	grid.trigger("reloadGrid");*/
			    	newrow=false;
					alert("Product Name Already Inserted !!!");
					var grid = jQuery("#list4");
				    grid.trigger("reloadGrid");
			    	break;
				}
				else
				{
					newrow = true;
				}
			 }
			  
			  if(newrow == true)
				 {
					
				 // $("#credit").addRowData(i,jsonData[i]);
				  $("#credit").addRowData(count,jsonData.offer);
					
				 }
		
		
		
		$("#credit").jqGrid({
			datatype: "local",
			
			colNames:['cat_id','ItemName','CompanyName','Packing','Batch Number','Unit','Quantity', 'UnitPrice','MRP','TaxPercentage' ,'Total'],
			colModel:[ 
					     {
					    	 name:'cat_id',
					    	 hidden:true,
					     },
			          
             
			     {	name:'itemName',
			    	 width:150,
					
				},
				
			     {	name:'companyName',
			    	 width:150,
					
				},
			           
			   
				{	name:'weight',
					width:100,
					editable: true
					
				},
				{	name:'batchNumber',
					width:70,
					editable: true
					
				},
				{	name:'unitName',
					width:100,
					editable: true
					
				},
				{	name:'quantity',
					width:100,
					editable: true
					
				},

				{	name:'salePrice',
					width:150,
					editable: true
					
				},
				{	name:'mrp',
					width:140,
					editable: true
					
				},
				
				{	name:'vatPercentage',
					width:100,
					editable: true
					
				},
				{	name:'total',
					width:150,
					formatter: sumFmatter
				},
				
				
			],
				
			
			sortorder : 'desc',
			loadonce: false,
			viewrecords: true,
			width: 1300,
          height: 350,
          rowheight: 300,
          hoverrows: true,
	        rownumbers: true,
          rowNum: 10,
          'cellEdit':true,
	           afterSaveCell: function () {
	        	   // $(this).trigger('reloadGrid');
	        	   var rowId =$("#credit").jqGrid('getGridParam','selrow');  
              var rowData = jQuery("#credit").getRowData(rowId);
           	var quantity = rowData['quantity'];
           	var salePrice = rowData['salePrice'];
           	
           	var tota = quantity * salePrice;
           	
           	$("#credit").jqGrid("setCell", rowId, "total", tota);
	        	},
         
			pager: "#jqGridPager",
			
			
			
		});
		
	
		//$("#credit").addRowData(i+1,jsonData[i]);
		if(count==0 || count==null)
		{
			// $("#credit").addRowData(i,jsonData[i]);
			 $("#credit").addRowData(0,jsonData.offer);
		}
		
		

   
		 $('#credit').navGrid('#jqGridPager',
	                
	                { edit: true, add: false, del: true, search: true, refresh: true, view: true, position: "left", cloneToTop: false },
	                
	                {
	                    editCaption: "The Edit Dialog",
	                   
	                    afterSubmit: function () {
							
	                      var grid = $("#credit"),
						  intervalId = setInterval(
							 function() {
							         grid.trigger("reloadGrid",[{current:true}]);
							   },
							   500);
	                         
	                      
						},
						
						 recreateForm: true,
						 checkOnUpdate : true,
						 checkOnSubmit : true,
		                 closeAfterEdit: true,
						
	                    errorTextFormat: function (data) {
	                        return 'Error: ' + data.responseText
	                    }
	                },
	                
	                {
	                    closeAfterAdd: true,
	                    recreateForm: true,
	                    errorTextFormat: function (data) {
	                        return 'Error: ' + data.responseText
	                    }
	                },
	                
	                {
	                	closeAfterdel:true,
	                	checkOnUpdate : true,
						checkOnSubmit : true,
						recreateForm: true,
	                	
						reloadAftersubmit:true,	
	                    errorTextFormat: function (data) {
	                        return 'Error: ' + data.responseText
	                    }
	                		
	                });
		 
		 
			   });
			
		})


}

/* ++++++++++++++++     Fetching product Name for Cash customer seed and pesti bill ++++++++++++++++++++*/
function getProductNameForCashForPesti(){
	
	 var fk_cat_id1 = 2;
		$("#proName").empty();
		$("#proName").append($("<option></option>").attr("value","").text("Select product"));
		var params= {};
		
		params["methodName"] = "getAllProductByCategoriesForSeedAndPestiBill";
		
		params["fk_cat_id1"]= fk_cat_id1;
		
		$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
				{ var count = 1;
				
			var jsonData = $.parseJSON(data);
			$.each(jsonData,function(i,v)
					{
				$("#proName").append($("<option></option>").attr("value",count).text(v.product + ","+v.manufacturer+","+v.weight+","+v.unitName)); 
					count++;
					});
				}).error(function(jqXHR, textStatus, errorThrown){
					if(textStatus==="timeout") {

					}
				});

}


/*++++++++++++++++++++++  fetching batch number and stock as per product Cash customer  ++++++++++++++++++++++*/
function getBatchNumberAndStockForPesti(){
	$("#batchNo").empty();
	$("#batchNo").append($("<option></option>").attr("value","").text("Select product"));
	var params= {};
	
	productId = $('#proName').val();
	
	$("#proName option:selected").each(function() {
		   selectedVal = $(this).text();
		});
	
	var splitText = selectedVal.split(",");
	
	var proName = splitText[0];
	var company = splitText[1];
	var weight = splitText[2];
	
	params["proName"]= proName;
	params["company"]= company;
	params["weight"]= weight;
	
	params["methodName"] = "fetchBatchNumberAndStockForSeedPestiBilling";
	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
 	    	{
			var count = 1;
				
			var jsonData = $.parseJSON(data);
			$.each(jsonData,function(i,v)
					{
				$("#batchNo").append($("<option></option>").attr("value",count).text("Batch No = ,"+v.batchNum+", stock = ,"+v.stock)); 
					count++;
					});
				}).error(function(jqXHR, textStatus, errorThrown){
					if(textStatus==="timeout") {

					}
				});
}
/* ++++++++++++++++     Fetching product Name for CREDIT customer seed and pesti bill ++++++++++++++++++++*/
function getProductNameForCreditForPesti(){
	
	 var fk_cat_id1 = 2;
		$("#proName1").empty();
		$("#proName1").append($("<option></option>").attr("value","").text("Select product"));
		var params= {};
		
		params["methodName"] = "getAllProductByCategoriesForSeedAndPestiBill";
		
		params["fk_cat_id1"]= fk_cat_id1;
		
		$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
				{ var count = 1;
				
			var jsonData = $.parseJSON(data);
			$.each(jsonData,function(i,v)
					{
				$("#proName1").append($("<option></option>").attr("value",count).text(v.product + ","+v.manufacturer+","+v.weight+","+v.unitName)); 
					count++;
					});
				}).error(function(jqXHR, textStatus, errorThrown){
					if(textStatus==="timeout") {

					}
				});

}

/*++++++++++++++++++++++  fetching batch number and stock as per product CREDIT customer  ++++++++++++++++++++++*/
function getBatchNumberAndStock1ForPesticide(){
	$("#batchNo1").empty();
	$("#batchNo1").append($("<option></option>").attr("value","").text("Select product"));
	var params= {};
	
	productId = $('#proName1').val();
	
	$("#proName1 option:selected").each(function() {
		   selectedVal = $(this).text();
		});
	
	var splitText = selectedVal.split(",");
	
	var proName = splitText[0];
	var company = splitText[1];
	var weight = splitText[2];
	
	params["proName"]= proName;
	params["company"]= company;
	params["weight"]= weight;
	
	params["methodName"] = "fetchBatchNumberAndStockForSeedPestiBilling";
	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
 	    	{
			var count = 1;
				
			var jsonData = $.parseJSON(data);
			$.each(jsonData,function(i,v)
					{
				$("#batchNo1").append($("<option></option>").attr("value",count).text("Batch No = ,"+v.batchNum+", stock = ,"+v.stock)); 
					count++;
					});
				}).error(function(jqXHR, textStatus, errorThrown){
					if(textStatus==="timeout") {

					}
				});
}
//************** Credit Customer details like village,Name and Contact number***************//*

function customerDetail(){
	
	this.getVillageName = getVillageName;
	this.getContactNo = getContactNo;
	this.getName = getName;
	this.getAadhar = getAadhar;
	
	function getAadhar(){

		
		var input = document.getElementById('creditCustomer'),
	    list = document.getElementById('cust_drop1'),
	    i,creditCustomer;

		for (i = 0; i < list.options.length; ++i) {
	    if (list.options[i].value === input.value) {
	    	creditCustomer = list.options[i].getAttribute('data-value');
	    }
	}
		
		var creditCustomerId = creditCustomer;
		$("#aadharNo1").empty();
		$("#aadharNo1").append($("<input/>").attr("value","").text());
		var params= {};
		params["methodName"] = "getVillageNameAndContactNoAndFirstNameByCustomer";
		params["creditCustomerId"]= creditCustomerId;
		$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
				{
			var jsonData = $.parseJSON(data);
			//var jsonData = jsonData.list;
			$.each(jsonData,function(i,v)
					{
				document.getElementById("aadharNo1").value = v.aadhar;
				
					});
			
				}).error(function(jqXHR, textStatus, errorThrown){
					if(textStatus==="timeout") {

					}
				});

	
		
	}
	
	function getVillageName()
	{
		
		var input = document.getElementById('creditCustomer'),
	    list = document.getElementById('cust_drop1'),
	    i,creditCustomer;

		for (i = 0; i < list.options.length; ++i) {
	    if (list.options[i].value === input.value) {
	    	creditCustomer = list.options[i].getAttribute('data-value');
	    }
	}
		
		var creditCustomerId = creditCustomer;
		$("#village1").empty();
		$("#village1").append($("<input/>").attr("value","").text());
		var params= {};
		params["methodName"] = "getVillageNameAndContactNoAndFirstNameByCustomer";
		params["creditCustomerId"]= creditCustomerId;
		$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
				{
			var jsonData = $.parseJSON(data);
			//var jsonData = jsonData.list;
			$.each(jsonData,function(i,v)
					{
				document.getElementById("village1").value = v.village;
					});
				}).error(function(jqXHR, textStatus, errorThrown){
					if(textStatus==="timeout") {

					}
				});

	}
	
	
	function getContactNo()
	{
		
		var input = document.getElementById('creditCustomer'),
	    list = document.getElementById('cust_drop1'),
	    i,creditCustomer;

		for (i = 0; i < list.options.length; ++i) {
	    if (list.options[i].value === input.value) {
	    	creditCustomer = list.options[i].getAttribute('data-value');
	    }
	}
		
		var creditCustomerId = creditCustomer;
		$("#contactNo1").empty();
		$("#contactNo1").append($("<input/>").attr("value","").text());
		var params= {};
		params["methodName"] = "getVillageNameAndContactNoAndFirstNameByCustomer";
		params["creditCustomerId"]= creditCustomerId;
		$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
				{
			var jsonData = $.parseJSON(data);
			//var jsonData = jsonData.list;
			$.each(jsonData,function(i,v)
					{
				document.getElementById("contactNo1").value = v.contactNo;
					});
				}).error(function(jqXHR, textStatus, errorThrown){
					if(textStatus==="timeout") {

					}
				});

	}
	
	
	
	function getName()
	{
		
		var input = document.getElementById('creditCustomer'),
	    list = document.getElementById('cust_drop1'),
	    i,creditCustomer;

		for (i = 0; i < list.options.length; ++i) {
	    if (list.options[i].value === input.value) {
	    	creditCustomer = list.options[i].getAttribute('data-value');
	    }
	}
		
		var creditCustomerId = creditCustomer;
		$("#customerNameHidden").empty();
		$("#customerNameHidden").append($("<input/>").attr("value","").text());
		var params= {};
		params["methodName"] = "getVillageNameAndContactNoAndFirstNameByCustomer";
		params["creditCustomerId"]= creditCustomerId;
		$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
				{
			var jsonData = $.parseJSON(data);
			//var jsonData = jsonData.list;
			$.each(jsonData,function(i,v)
					{
				document.getElementById("customerNameHidden").value = v.firstName;
					});
				}).error(function(jqXHR, textStatus, errorThrown){
					if(textStatus==="timeout") {

					}
				});

	}
}

var custDetail = new customerDetail();