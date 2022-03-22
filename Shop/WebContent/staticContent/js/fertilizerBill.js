//get Product detail as Per barcode for cash customer
function getitemData(){ 
		var value = document.getElementById("key").value;
		
		var params= {};
		var count=0;
		var newrow;
		var rowId;

		params["methodName"] ="fetchCust";
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
		        		var newSalePrice = Number(taxcalculation) + Number(options.rowData.salePrice)
		        		var tot= (Number(options.rowData.quantity) * Number(newSalePrice));
		        		if(isNaN(tot)){
		        			tot = 0;
						}
		        	}
		        	var jam=0;
		        	
		        	
		        	count = jQuery("#list4").jqGrid('getGridParam', 'records');
		        	var allRowsInGrid1 = $('#list4').getGridParam('data');
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
		                	
		                	var taxcal = (vatPercentage/100) * salePrice;
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
		        
		         count = jQuery("#list4").jqGrid('getGridParam', 'records'); 
			     var rowdata =$("#list4").jqGrid('getGridParam','data');
			     var ids = jQuery("#list4").jqGrid('getDataIDs');
				 
				
				  var prodName,com,packing,unit;
				  for (var j = 0; j < count; j++) 
				  {
					  prodName = rowdata[j].itemName;
					  com = rowdata[j].companyName;
					  packing = rowdata[j].weight;
					  unit = rowdata[j].unitName;
					
					 var rowId = ids[j];
					 var rowData = jQuery('#list4').jqGrid ('getRowData', rowId);
					
					if (prodName == jsonData.offer.itemName && com == jsonData.offer.companyName && packing == jsonData.offer.weight && unit == jsonData.offer.unitName) {
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
						
					  //$("#list4").addRowData(i,jsonData[i]);
					  $("#list4").addRowData(count,jsonData.offer);
						
					 }
			
			
			$("#list4").jqGrid({
				datatype: "local",
				
				colNames:['cat_id','ItemName','CompanyName','Packing','Unit','Quantity', 'UnitPrice','MRP','TaxPercentage' ,'Total'],
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
						
						
					},
					{	name:'unitName',
						width:100,
						
						
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
				width: 1200,
	            height: 350,
	            rowheight: 300,
	            hoverrows: true,
		        rownumbers: true,
	            rowNum: 10,
	            'cellEdit':true,
		           afterSaveCell: function () {
		        	   // $(this).trigger('reloadGrid');
		        	   var rowId =$("#list4").jqGrid('getGridParam','selrow');  
	                var rowData = jQuery("#list4").getRowData(rowId);
	             	var quantity = rowData['quantity'];
	             	var salePrice = rowData['salePrice'];
	             	
	             	var tota = quantity * salePrice;
	             	
	             	$("#list4").jqGrid("setCell", rowId, "total", tota);
		        	},
	           
				pager: "#jqGridPager",
				
				
				
			});
			
		
			//$("#list4").addRowData(i+1,jsonData[i]);
			if(count==0 || count==null)
			{
				 // $("#list4").addRowData(i,jsonData[i]);
				  $("#list4").addRowData(0,jsonData.offer);
			}
			

	     
			 $('#list4').navGrid('#jqGridPager',
		                
		                { edit: true, add: false, del: true, search: true, refresh: true, view: true, position: "left", cloneToTop: false },
		                
		                {
		                    editCaption: "The Edit Dialog",
		                   
		                    afterSubmit: function () {
								
		                      var grid = $("#list4"),
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


//get Product detail as per Barcode for credit customer
function getProDetailsAsPerBarcode(){
	 
	var value = document.getElementById("barcode1").value;
	
	var params= {};
	var count=0;
	var newrow;
	var rowId;

	params["methodName"] ="fetchCust";
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
	        		var newSalePrice = Number(taxcalculation) + Number(options.rowData.salePrice);
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
	                	
	                	var taxcal = (vatPercentage/100) *Number(salePrice);
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
	        
	        count = jQuery("#credit").jqGrid('getGridParam', 'records'); 
		     var rowdata =$("#credit").jqGrid('getGridParam','data');
		     var ids = jQuery("#credit").jqGrid('getDataIDs');
			 
			
			  var prodName,com,packing,unit;
			  for (var j = 0; j < count; j++) 
			  {
				  prodName = rowdata[j].itemName;
				  com = rowdata[j].companyName;
				  packing = rowdata[j].weight;
				  unit = rowdata[j].unitName;
				
				 var rowId = ids[j];
				 var rowData = jQuery('#credit').jqGrid ('getRowData', rowId);
				
				if (prodName == jsonData.offer.itemName && com == jsonData.offer.companyName && packing == jsonData.offer.weight && unit == jsonData.offer.unitName) {
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
			
			colNames:['cat_id','ItemName','CompanyName','Packing','Unit','Quantity', 'UnitPrice','MRP','TaxPercentage' ,'Total'],
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
					
				},
				{	name:'unitName',
					width:100,
					
					
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
			width: 1200,
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

/*+++++++++++++  Fetcing Data from goods receive by product name for cash customer 20-5-17++++++++++++*/
function fetchDataByProductName(){
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
	
	params["proName"]= proName;
	params["company"]= company;
	params["weight"]= weight;
	
	params["methodName"] = "fetchDetailsAsPerProductNameInFertiBill";
	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
 	    	{
			  var jsonData = $.parseJSON(data);
				
		      // $("#list4").jqGrid("clearGridData", true).trigger("reloadGrid");
			  var grid = jQuery("#list4");
		    	grid.trigger("reloadGrid");
			  
	        
		     $.each(jsonData,function(i,v)
				{
		    	 
		    	 
		        function sumFmatter (cellvalue, options, rowObject)
		        {
		            
		        	var tax = options.rowData.vatPercentage;
		        	
		        	if(tax == 0){
		        		var tot= (options.rowData.quantity * options.rowData.salePrice);
		        	}
		        	if(tax != 0){
		        		
		        		var taxcalculation = (tax/100)* options.rowData.salePrice;
		        		var tot= (options.rowData.quantity * options.rowData.salePrice) + taxcalculation;
		        	}
		        	var jam=0;
		        	
		        	
		        	var count = jQuery("#list4").jqGrid('getGridParam', 'records');
		        	var allRowsInGrid1 = $('#list4').getGridParam('data');
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
			            	jam = jam + totals1;
		            	}
		            	
		                if(vatPercentage != 0){
		                	
		                	var taxcal = (vatPercentage/100) * salePrice;
		                	var totals1=((salePrice)*(quantity)) + taxcal;
			            	jam = jam + totals1;
		                }                	
		    	    }
		        		 document.getElementById("totalWithExpense").value = jam;
		        	
		            	 return tot;
		        }
		        
			$("#list4").jqGrid({
				datatype: "local",
				
				colNames:['pk_goodre_id','supp_id','cat_id','BarcodeNO','ItemName','CompanyName','Packing', 'Quantity', 'UnitPrice','MRP','TaxPercentage' ,'Total'],
				colModel:[ 
				          
				          
	                 {
		                name:'PkGoodreceiveId',
		                hidden:true,
		              
	                 },    
				     {
				    	 name:'supplier_id',
				    	 hidden:true,
				     },
				     {
				    	 name:'cat_id',
				    	 hidden:true,
				     },
				    
				 	{
				    	 name:'barcodeNo',
				    	 width:100,				    	
				    	 
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
				width: 1200,
	            height: 350,
	            rowheight: 300,
	            hoverrows: true,
		        rownumbers: true,
	            rowNum: 10,
	            'cellEdit':true,
		           afterSaveCell: function () {
		        	   // $(this).trigger('reloadGrid');
		        	   var rowId =$("#list4").jqGrid('getGridParam','selrow');  
	                var rowData = jQuery("#list4").getRowData(rowId);
	             	var quantity = rowData['quantity'];
	             	var salePrice = rowData['salePrice'];
	             	
	             	var tota = quantity * salePrice;
	             	
	             	$("#list4").jqGrid("setCell", rowId, "total", tota);
		        	},
	           
				pager: "#jqGridPager",
				
				
				
			});
			
		
			$("#list4").addRowData(i+1,jsonData[i]);
	     
			 $('#list4').navGrid('#jqGridPager',
		                
		                { edit: true, add: false, del: true, search: true, refresh: true, view: true, position: "left", cloneToTop: false },
		                
		                {
		                    editCaption: "The Edit Dialog",
		                   
		                    afterSubmit: function () {
								
		                      var grid = $("#list4"),
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



/*++++++++++++++ Fetch product details by Barcode No for CREDIT customer 22-5-17 ++++++++++++++++++++++++++*/
/*function getProductDetailsByBarcodeNo1(){

	var params= {};
	
	var barcodeNo1 = $('#barcodeNo1').val();
	
		params["barcodeNo"]= barcodeNo1;
	
	var count=0;
	var newrow;
	var rowId;
	
	params["methodName"] = "getProductDetailsByBarcode";
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
	        		var newSalePrice = Number(taxcalculation) + Number(options.rowData.salePrice)
	        		var tot= (Number(options.rowData.quantity) * Number(newSalePrice));
	        		if(isNaN(tot)){
	        			tot = 0;
					}
	        	}
	        	var jam=0;
	        	
	        	
	        	count = jQuery("#credit").jqGrid('getGridParam', 'records');
	        	var allRowsInGrid1 = $('#credit').getGridParam('data');
	        	var AllRows=JSON.stringify(allRowsInGrid1);
	        	for (var i = 0; i < count; i++)
	        	{
	        		var kg = allRowsInGrid1[i].kg;
	        		params["kg"+i] = kg;
	        		
	        		var grams = allRowsInGrid1[i].grams;
	        		params["grams"+i] = grams;
	        		
	            	var quantity = allRowsInGrid1[i].quantity;
	             	params["quantity"+i] = quantity;
	             	
	             	var unitName = allRowsInGrid1[i].unitName;
	            	params["unitName"+i] = unitName;
	             	
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
	                	
	                	var taxcal = (vatPercentage/100) * salePrice;
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
			 
			
			  var prodName,com,packing,unit, expiryDate;
			  for (var j = 0; j < count; j++) 
			  {
				  prodName = rowdata[j].itemName;
				  com = rowdata[j].companyName;
				  packing = rowdata[j].weight;
				  unit = rowdata[j].unitName;
				  expiryDate = rowdata[j].expiryDate;
				
				 var rowId = ids[j];
				 var rowData = jQuery('#credit').jqGrid ('getRowData', rowId);
				
				if (prodName == jsonData.offer.itemName && com == jsonData.offer.companyName && packing == jsonData.offer.weight && unit == jsonData.offer.unitName && expiryDate == jsonData.offer.expiryDate) {
			    	ori_quantity = +rowdata[j].quantity+1;
			    	
			    	$("#list4").jqGrid("setCell", rowId, "quantity", ori_quantity);
			    	var grid = jQuery("#list4");
			    	grid.trigger("reloadGrid");
			    	newrow=false;
					alert("Product Name Already Inserted !!!");
					var grid = jQuery("#credit");
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
				  $("#credit").addRowData(count,jsonData.offer);
					
				 }
		
		
		$("#credit").jqGrid({
			datatype: "local",
			
			//colNames:['cat_id','sub_cat_id','ItemName','CompanyName',"HSN",'Packing','Unit', 'UnitPrice','MRP','GST','IGST','Quantity','Total'],
			//colNames:['cat_id','sub_cat_id','ItemName','CompanyName', 'Packing',"HSN",'Unit', 'UnitPrice','MRP','GST','IGST', 'Kg/Ltr', 'Gram/Mili', 'Quantity','Total','StockInGrams','StockInMili','TotalQuantity'],
			colNames:['cat_id','sub_cat_id',"Barcode<br>No",'Item<br>Name','Company<br>Name',"HSN","Batch No.","Packing", "Unit<br>Price",'MRP','GST%','IGST%','Qty','Free<br>Qty',"Unit","Expiry<br>Date",'Total','TotalKgLtrQuantity', 'stockPerEntry'],
			colModel:[ 
					     {
					    	 name:'cat_id',
					    	 hidden:true,
					    	 align:'center',
					     },
					     {
					    	 name:'sub_cat_id',
					    	 hidden:true,
					    	 align:'center',
					     },
							
           
					     {	name:'barcodeNo',
					    	 width:150,
					    	 align:'center',
							
						},
					     {	name:'itemName',
					    	 width:150,
					    	 align:'center',
							
						},

					     {	name:'companyName',
					    	 width:150,
					    	 align:'center',
							
						},
						{	name:'hsn',
							width:80,
							align:'center',
						},
						{	 name:'batchNumber',
							 width:125,
					    	 align:'center',
						},						   
						{	name:'weight',
							width:70,
							hidden:true,
							align:'center',
						},
						
						{	name:'salePrice',
							width:100,
							editable: true,
					    	 align:'center',
						},
						{	name:'mrp',
							width:100,
							editable: true,
							align:'center',
						},
						{	name:'vatPercentage',
							width:80,
							editable: true,
							align:'center',
						},				
						
						{	name:'gst',
							width:80,
							editable: true,
							
						},
						{	name:'sGst',
							width:80,
							editable: true
							
						},
						{	name:'igst',
							//width:80,
							//editable: true,
							align:'center',
							hidden:true
							
						},
						{	name:'quantity',
							width:100,
							editable: true,
							align:'center',
						},
						{	
							id:'freeQuantity',
							name:'freeQuantity',
							width:100,
							editable: true,
							align:'center',
						},
						{	name:'unitName',
							width:50,
							align:'center',
						},
						{				
							id:'expiryDate',
							name:'expiryDate',
							width:140,
							editable: false,
							align:'center',
						},						
						{	name:'total',
							width:150,
							align:'center',
							formatter: sumFmatter
							
						},		
						{	name:'totalKgLtrPiece',
							width:150,
							hidden:true,
							align:'center',
							//formatter: sumFmatter
						},
						{	name:'stockPerEntry',
							width:150,
							hidden:true,
							align:'center',
							//formatter: sumFmatter
						}
				
			],
				
			
			sortorder : 'desc',
			loadonce: false,
			viewrecords: true,
			width: 1200,
			shrinkToFit:true,
			rowheight: 300,
			hoverrows: true,
	        rownumbers: true,
	        rowNum: 10,
	        'cellEdit':true,
	        autowidth:true,
	        pgbuttons : false,
		    pginput : false,
      	
	        afterSaveCell: function  grossTotal()
			{
				        	Calculation of total after editing quantity
				        	   
	        		document.getElementById("discount1").value = 0;
	     			document.getElementById("discountAmount1").value = 0;
	     			document.getElementById("hamaliExpence3").value = 0;
	     			document.getElementById("hamaliExpence1").value = 0;
	        		 
	        		 
				        	   // $(this).trigger('reloadGrid');
				        	   var rowId =$("#credit").jqGrid('getGridParam','selrow');  
		                       var rowData = jQuery("#credit").getRowData(rowId);
		                       var productName = rowData['itemName'];
		                       var quantity = rowData['quantity'];
		                       var freeQuantity = rowData['freeQuantity'];
		                       var salePrice = rowData['salePrice'];
		                       var mrp = rowData['mrp'];
		                       var iGst = rowData['igst'];
		                       var Gst = rowData['gst'];
		                       var unit = rowData['unitName'];
		                       var vatPercentage = rowData['vatPercentage']; 
		                       var stockPerEntry = rowData['stockPerEntry'];
		                       var expiryDate = rowData['expiryDate'];
		                       
		                       if(salePrice != "")
		                       {
		                    	   var checkprice = /^[0-9]+\.?[0-9]*$/;
		                    	   if(salePrice.match(checkprice))
		                    	   {}
		                    	   else
		                    	   {
		                    		   var msg="Please Enter Valid Sale Price";
	                    				var dialog = bootbox.dialog({
	                    					//title: "Embel Technologies Says :",
	                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
	                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
	                    				    closeButton: false
	                    				});
	                    				
	                    				setTimeout(function() {
	                    					dialog.modal('hide');
	                    				}, 1500);
	                    				
                    				   var setZero = 0;
	 		                    	   $("#credit").jqGrid("setCell", rowId, "total", setZero);
			                    		
		 		                    	  gridTotalCalculation();

	                    				return false;
		                    	   }
		                       }
		                       
		                       if(mrp != "")
		                       {
		                    	   var checkprice = /^[0-9]+\.?[0-9]*$/;
		                    	   if(mrp.match(checkprice))
		                    	   {}
		                    	   else
		                    	   {
		                    		   var msg="Please Enter Valid MRP";
	                    				var dialog = bootbox.dialog({
	                    					//title: "Embel Technologies Says :",
	                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
	                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
	                    				    closeButton: false
	                    				});
	                    				
	                    				setTimeout(function() {
	                    					dialog.modal('hide');
	                    				}, 1500);
	                    				
	                    			   var setZero = 0;
	 		                    	   $("#credit").jqGrid("setCell", rowId, "total", setZero);
			                    		
	 		                    	  gridTotalCalculation();

	                    				return false;
		                    	   }
		                       }
		                       
		                       if(vatPercentage != "")
		                       {
		                    	   var checkTax = /^[0-9]+$/;
		                    	   if(vatPercentage.match(checkTax))
		                    	   {}
		                    	   else
		                    	   {
		                    		   var msg="Please Enter Valid GST %";
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
		                       }
		                       
		                       if(mrp == "" || mrp == "0")
		                       {}
		                       else
		                       {
			                       if(Number(salePrice) > Number(mrp))
			                       {
			                    	   var msg="MRP must be Greater Than Unit Price";
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
		                       }
		                       
		                       var userKgOrLtrInGramsOrMili = Number(quantity) * 1000;
							                			                    	
		                       var salePricePerGram = 0;
		                    	salePricePerGram = (Number)(salePrice/1000);                    	
		                    	
		                    	//KG CALCULATIONS
		                    	if(unit == 'kg')
	                    		{	
	                    	   		var setFq = 0;
	                    			$("#credit").jqGrid("setCell", rowId, "freeQuantity", setFq);
		                    		
	                    			var rowId =$("#credit").jqGrid('getGridParam','selrow');
	                    			var rowData = jQuery("#credit").getRowData(rowId);
	                    			var stockInKg = rowData['totalKgLtrPiece'];
	                    			var stockInGrams;
	                    			if(Number(stockInKg) > 1)
	                    			{
		                    			stockInGrams = stockInKg * 1000;
	                    			}
	                    			else
	                    			{
	                    				stockInGrams = stockInKg;
	                    			}
	                    			
	                    		if(quantity != '')
	                    		{
	                    			var checkKiloLtr = /^[0-9]+\.?[0-9]{0,3}$/;
	                    			if(quantity.match(checkKiloLtr))
	                    			{
	                    				if(quantity == 0)
	                    				{
	                    					quantity = 0;
		                    				
		                    				var msg="Please Enter Valid kg Value";
		                    				var dialog = bootbox.dialog({
		                    					//title: "Embel Technologies Says :",
		                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
		                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		                    				    closeButton: false
		                    				});
		                    				
		                    				setTimeout(function() {
		                    					dialog.modal('hide');
		                    				}, 1500);
		                    				
		                    				var setZero = 0;
				                    		$("#credit").jqGrid("setCell", rowId, "quantity", setZero);
				                    		
			 		                    	  gridTotalCalculation();
				                    		
				                    		return false;
	                    				}
	                    			}
	                    			else
	                    			{
	                    				quantity = 0;
	                    				
	                    				var msg="Please Enter Valid kg Value";
	                    				var dialog = bootbox.dialog({
	                    					//title: "Embel Technologies Says :",
	                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
	                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
	                    				    closeButton: false
	                    				});
	                    				
	                    				setTimeout(function() {
	                    					dialog.modal('hide');
	                    				}, 1500);
	                    				
	                    				var setZero = 0;
			                    		$("#credit").jqGrid("setCell", rowId, "quantity", setZero);
			                    		$("#credit").jqGrid("setCell", rowId, "total", setZero);
			                    		
		 		                    	  gridTotalCalculation();
			                    		return false;
	                    			}
	                    		}
	                    		
	                    		if(expiryDate == 'N/A')
                    			{		                    			
	                    			if(Number(userKgOrLtrInGramsOrMili) > Number(stockInGrams))
			                    	{
		                    			if(Number(stockInGrams) >1000)
		                    				{
		                    					var convertedStockInKg = Number(stockInGrams)/1000;
		                    					//alert(productName+" Available stock = "+convertedStockInKg+" Kg");
		                    					
		                    					 var msg = productName+" Available stock = "+convertedStockInKg+" Kg";
				 		                    	   var dialog = bootbox.dialog({
			                    					//title: "Embel Technologies Says :",
			                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
			                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
			                    				    closeButton: false
				 		                    	   });
			                    				
				 		                    	   setTimeout(function() {
			                    					dialog.modal('hide');
				 		                    	   }, 1500);
				 		                   	}
		                    				else
		                    				{
		                    					//alert(productName+" Available stock = "+stockInGrams+" Grams");
		                    					 var msg = productName+" Available stock = "+stockInGrams+" Grams";
				 		                    	   var dialog = bootbox.dialog({
			                    					//title: "Embel Technologies Says :",
			                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
			                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
			                    				    closeButton: false
				 		                    	   });
			                    				
				 		                    	   setTimeout(function() {
			                    					dialog.modal('hide');
				 		                    	   }, 1500);
		                    				}
		                    			
		                    			var setZero = 0;
			                    		$("#credit").jqGrid("setCell", rowId, "total", setZero);
			                    		$("#credit").jqGrid("setCell", rowId, "quantity", setZero);
			                    					                    		
		 		                    	gridTotalCalculation();
		 		                    	return false;
		                    			
			                    	}
                    			}
	                    		else if(expiryDate !='N/A')
	                    			{
	                    				var stockperEntryInKg = rowData['stockPerEntry'];
		                    			var stockperEntryInGrams;
		                    			if(Number(stockperEntryInKg) > 1)
		                    			{
		                    				stockperEntryInGrams = stockperEntryInKg * 1000;
		                    			}
		                    			else
		                    			{
		                    				stockperEntryInGrams = stockperEntryInKg;
		                    			}
	                    				
	                    			
	                    				if(Number(userKgOrLtrInGramsOrMili) > Number(stockperEntryInGrams))
				                    	{
			                    			if(Number(stockInGrams) >1000)
			                    				{
			                    					var convertedStockInKg = Number(stockperEntryInKg)/1000;
			                    					//alert(productName+" Available stock = "+convertedStockInKg+" Kg");
			                    					
			                    					 var msg = productName+" Available stock = "+stockperEntryInKg+" Kg";
					 		                    	   var dialog = bootbox.dialog({
				                    					//title: "Embel Technologies Says :",
				                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
				                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
				                    				    closeButton: false
					 		                    	   });
				                    				
					 		                    	   setTimeout(function() {
				                    					dialog.modal('hide');
					 		                    	   }, 1500);
					 		                   	}
			                    				else
			                    				{
			                    					//alert(productName+" Available stock = "+stockInGrams+" Grams");
			                    					 var msg = productName+" Available stock = "+stockperEntryInGrams+" Grams";
					 		                    	   var dialog = bootbox.dialog({
				                    					//title: "Embel Technologies Says :",
				                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
				                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
				                    				    closeButton: false
					 		                    	   });
				                    				
					 		                    	   setTimeout(function() {
				                    					dialog.modal('hide');
					 		                    	   }, 1500);
			                    				}
			                    			
			                    			var setZero = 0;
				                    		$("#credit").jqGrid("setCell", rowId, "total", setZero);
				                    		$("#credit").jqGrid("setCell", rowId, "quantity", setZero);
				                    					                    		
			 		                    	gridTotalCalculation();
			 		                    	return false;
			                    	}
	                    			
	                    		}
		                    			KgGramsLtrMiliCalculation();
		                    		
	                    		}
	                    		
		                    	//LTR CALCULATIONS
		                    	if(unit == 'ltr')
	                    		{
		                    		var setFq = 0;
	                    			$("#credit").jqGrid("setCell", rowId, "freeQuantity", setFq);
		                    		
		                    		var rowId =$("#credit").jqGrid('getGridParam','selrow');
	                    			var rowData = jQuery("#credit").getRowData(rowId);
	                    			var stockInLtr = rowData['totalKgLtrPiece'];
	                    			var stockInMili = stockInLtr * 1000;
	                    			
	                    			if(quantity != '')
		                    		{	
	                    			var checkKiloLtr = /^[0-9]+\.?[0-9]{0,3}$/;
	                    			if(quantity.match(checkKiloLtr))
	                    			{
	                    				if(quantity == 0)
	                    				{
	                    					quantity = 0;
		                    				
		                    				var msg="Please Enter Valid kg Value";
		                    				var dialog = bootbox.dialog({
		                    					//title: "Embel Technologies Says :",
		                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
		                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		                    				    closeButton: false
		                    				});
		                    				
		                    				setTimeout(function() {
		                    					dialog.modal('hide');
		                    				}, 1500);
		                    				
		                    				var setZero = 0;
				                    		$("#credit").jqGrid("setCell", rowId, "quantity", setZero);
				                    		
			 		                    	gridTotalCalculation();		
				                    		return false;	                    				
	                    				}
	                    			}
	                    			else
	                    			{
	                    				quantity = 0;
	                    				
	                    				   var msg = "Please Enter Valid ltr Value";
		 		                    	   var dialog = bootbox.dialog({
	                    					//title: "Embel Technologies Says :",
	                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
	                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
	                    				    closeButton: false
		 		                    	   });
	                    				
		 		                    	   setTimeout(function() {
	                    					dialog.modal('hide');
		 		                    	   }, 1500);
		 		                    	   
	                    				var setZero = 0;
			                    		$("#credit").jqGrid("setCell", rowId, "quantity", setZero);
			                    		KgGramsLtrMiliCalculation();
	                    				return false;
	                    			}
	                    		}
	                    			if(expiryDate =='N/A')
	                    			{	                    			
			                    		if(Number(userKgOrLtrInGramsOrMili) > Number(stockInMili))
				                    	{
			                    			if(Number(stockInMili) >1000)
			                    				{
			                    					var convertedStockInLtr = Number(stockInMili)/1000;
			                    					
			                    					 var msg = productName+" Available stock = "+convertedStockInLtr+" Ltr";
					 		                    	   var dialog = bootbox.dialog({
				                    					//title: "Embel Technologies Says :",
				                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
				                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
				                    				    closeButton: false
					 		                    	   });
				                    				
					 		                    	   setTimeout(function() {
				                    					dialog.modal('hide');
					 		                    	   }, 1500);		                    					
			                    				}
			                    				else
			                    				{		                    					
			                    					 var msg = productName+" Available stock = "+stockInMili+" mili";
					 		                    	   var dialog = bootbox.dialog({
				                    					//title: "Embel Technologies Says :",
				                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
				                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
				                    				    closeButton: false
					 		                    	   });
				                    				
					 		                    	   setTimeout(function() {
				                    					dialog.modal('hide');
					 		                    	   }, 1500);
			                    				}
			                    			
			                    			var setZero = 0;
				                    		$("#credit").jqGrid("setCell", rowId, "total", setZero);
				                    		$("#credit").jqGrid("setCell", rowId, "quantity", setZero);
				                    		
				                    		gridTotalCalculation();			        		        	
				        		        	return false;
			                    	}
	                    		}
	                    		else if(expiryDate !='N/A')
	                    		{	
	                    			var stockperEntryInLtr = rowData['stockPerEntry'];
	                    			var stockperEntryInMili;
	                    			if(Number(stockperEntryInLtr) > 1)
	                    			{
	                    				stockperEntryInMili = stockperEntryInLtr * 1000;
	                    			}
	                    			else
	                    			{
	                    				stockperEntryInMili = stockperEntryInLtr;
	                    			}	                    			
	                    		
	                    			if(Number(userKgOrLtrInGramsOrMili) > Number(stockperEntryInMili))
			                    	{
		                    			if(Number(stockInMili) >1000)
		                    				{
		                    					var convertedStockInLtr = Number(stockperEntryInMili)/1000;
		                    					
		                    					 var msg = productName+" Available stock = "+convertedStockInLtr+" Ltr";
				 		                    	   var dialog = bootbox.dialog({
			                    					//title: "Embel Technologies Says :",
			                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
			                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
			                    				    closeButton: false
				 		                    	   });
			                    				
				 		                    	   setTimeout(function() {
			                    					dialog.modal('hide');
				 		                    	   }, 1500);		                    					
		                    				}
		                    				else
		                    				{		                    					
		                    					 var msg = productName+" Available stock = "+stockperEntryInMili+" mili";
				 		                    	   var dialog = bootbox.dialog({
			                    					//title: "Embel Technologies Says :",
			                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
			                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
			                    				    closeButton: false
				 		                    	   });
			                    				
				 		                    	   setTimeout(function() {
			                    					dialog.modal('hide');
				 		                    	   }, 1500);
		                    				}
		                    			
		                    			var setZero = 0;
			                    		$("#credit").jqGrid("setCell", rowId, "total", setZero);
			                    		$("#credit").jqGrid("setCell", rowId, "quantity", setZero);
			                    		
			                    		gridTotalCalculation();			        		        	
			        		        	return false;
			                    	}
	                    		}
		                    		
		                    		KgGramsLtrMiliCalculation();
	                    		}
		                    	
		                    	function KgGramsLtrMiliCalculation()
		                    	{
		                    		if((Number(quantity)>0 || Number(quantity) != '' || quantity != '0'))
		                    		{
			                    		var salePriceKgTota = 0;
			                    		salePriceKgTota = userKgOrLtrInGramsOrMili*salePricePerGram;
			                    		salePriceKgTota = Math.round(salePriceKgTota * 100) / 100;			                    		
	                    				$("#credit").jqGrid("setCell", rowId, "total", salePriceKgTota);
	                    			}
			                    	
			                    	else if(Number(quantity) == 0  || Number(quantity)== '')
			                    	{		
	                    				var setZero = 0;
			                    		$("#credit").jqGrid("setCell", rowId, "total", setZero);
			                    		
		 		                    	gridTotalCalculation();
	 		                    	   
	 		                    	   return false;
			                    	}
		                    	}
		                    	
		                    	if(unit == 'pcs')
				                {
			                    		if(freeQuantity == "" || freeQuantity == "0")
			                    		{
			                    			freeQuantity = 0;
			                    			var setZero = 0;
	                                 		$("#credit").jqGrid("setCell", rowId, "freeQuantity", setZero);
	                                 		quantity = Number(quantity) + Number(freeQuantity);
			                    		}
				                    	else if(freeQuantity != '' || freeQuantity != "0")
			                    		{
											var checkFreeQuantity = /^[0-9]+$/;
								    		if(freeQuantity.match(checkFreeQuantity))
								    		{
								    			quantity = Number(quantity) + Number(freeQuantity);
								    		}
								    		else
								    		{
							    				 var msg="Please Enter Valid Free Quantity";
				 		                    	   var dialog = bootbox.dialog({
			                    					//title: "Embel Technologies Says :",
			                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
			                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
			                    				    closeButton: false
			                    				});
				 		                    	  setTimeout(function() {
				                    					dialog.modal('hide');
				                    				}, 1500);
			                    				 
			                    				 quantity = 0;
			                    				 var setZero = 0;
		                                   		 $("#credit").jqGrid("setCell", rowId, "quantity", setZero);
		 			                    		 $("#credit").jqGrid("setCell", rowId, "total", setZero);
		                                   		 $("#credit").jqGrid("setCell", rowId, "freeQuantity", setZero);
		 			                    		 
		                                   		finalCalculation();
		                                   		 	
			                    				return false;			                    			
								    		}
			                    		}
			                    		
			                    		var rowId =$("#credit").jqGrid('getGridParam','selrow');
		                    			var rowData = jQuery("#credit").getRowData(rowId);
		                    			var stockInTotalPieceQuantity = rowData['totalKgLtrPiece'];	                    			
		                    			
		                    			if(quantity != '')
			                    		{
			                    			 var checkQuantity = /^[0-9]+$/;
			                    			 if(String(quantity).match(checkQuantity))
			                    			 {}
			                    			 else
			                    			 {
			                    				 var msg = productName+"Please Enter Valid Quantity";
				 		                    	   var dialog = bootbox.dialog({
			                    					//title: "Embel Technologies Says :",
			                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
			                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
			                    				    closeButton: false
				 		                    	   });
			                    				
				 		                    	   setTimeout(function() {
			                    					dialog.modal('hide');
				 		                    	   }, 1500);
				 		                    	   
			                    				 quantity = 0;
			                    				 var setZero = 0;
		                                  		 $("#credit").jqGrid("setCell", rowId, "quantity", setZero);
		                                  		 $("#credit").jqGrid("setCell", rowId, "total", setZero);
		                                  		 $("#credit").jqGrid("setCell", rowId, "freeQuantity", setZero);
		                                  		 
				 		                    	  gridTotalCalculation();                                  		 
			                    				 return false;
			                    			 } 
			                    		}
		                    			
		                    			if(expiryDate =='N/A')
			                    		{		
		                    				if ( Number(quantity) > Number(stockInTotalPieceQuantity))
					                    	{					                    		
					                    		var msg = productName+" Available Stock For Expiry Date : "+expiryDate+" = "+stockInTotalPieceQuantity+" Pieces";
				 		                    	   var dialog = bootbox.dialog({
			                    					//title: "Embel Technologies Says :",
			                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
			                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
			                    				    closeButton: false
				 		                    	   });
			                    				
				 		                    	   setTimeout(function()
				 		                    		{
			                    					dialog.modal('hide');
				 		                    	   }, 1500);
				 		                    	   
				 		                    	   var setFq = 0;
				 		                    	   $("#credit").jqGrid("setCell", rowId, "freeQuantity", setFq);
				 		                    	   $("#credit").jqGrid("setCell", rowId, "quantity", setFq);
				 		                    	   $("#credit").jqGrid("setCell", rowId, "total", setFq);
					                    		
				 		                    	  gridTotalCalculation();
				 		                    	  return false;
					                    	}
			                    		}
		                    			if(expiryDate !='N/A')
			                    		{		
		                    				if ( Number(quantity) > Number(stockPerEntry))
					                    	{				                    		
					                    		var msg = productName+" Available stock = "+stockPerEntry+" Pieces";
				 		                    	   var dialog = bootbox.dialog({
			                    					//title: "Embel Technologies Says :",
			                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
			                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
			                    				    closeButton: false
				 		                    	   });
			                    				
				 		                    	   setTimeout(function() {
			                    					dialog.modal('hide');
				 		                    	   }, 1500);
				 		                    	   
				 		                    	   var zeroQuantity = 0;
				 		                    	   $("#credit").jqGrid("setCell", rowId, "freeQuantity", zeroQuantity);
				 		                    	   $("#credit").jqGrid("setCell", rowId, "quantity", zeroQuantity);
				 		                    	   $("#credit").jqGrid("setCell", rowId, "total", zeroQuantity);
					                    		
				 		                    	  gridTotalCalculation();
				 		                    	  return false;
					                    	}
		                    			}
				                    	
			                    	if (iGst != 0 || iGst != undefined)
			                    	{
		                    			var taxPercentage = iGst;
			                    		var taxAmount = ((taxPercentage/100)*salePrice);
			                    		var BuyPriceWithTaxAmount = Number(taxAmount) + Number(salePrice);
			                    		var tota = Number(quantity - freeQuantity) * salePrice;
			                    		tota = Math.round(tota * 100) / 100;
			                    		$("#credit").jqGrid("setCell", rowId, "total", tota);
				                    }
			                    	else if(iGst == 0 || iGst == undefined)
			                    	{
			                    		Gst = 0;
			                    		var  taxPercentage = Number(Gst);
			                    		var taxAmount = ((taxPercentage/100)*salePrice);
			                    		var BuyPriceWithTaxAmount = Number(taxAmount) + Number(salePrice);
			                    		var tota = Number(quantity - freeQuantity) * salePrice;
			                    		tota = Math.round(tota * 100) / 100;
			                    		$("#credit").jqGrid("setCell", rowId, "total", tota);
			                    	}
				                }
			                    		                    	
		                    	gridTotalCalculation();
		                    	
		                    	function gridTotalCalculation()
		                    	{
			                    	var Total =0;
			                    	var Total1 = 0;
		                    		var count = jQuery("#credit").jqGrid('getGridParam', 'records');
		        		        	var allRowsInGrid1 = $('#credit').getGridParam('data');
		        		        	var AllRows=JSON.stringify(allRowsInGrid1);
		        		        	for (var k = 0; k < count; k++)
		        		        	{
		        		        		Total1 = allRowsInGrid1[k].total;
		        		        		if(Total1 == undefined)
	        		        			{
		        		        			Total1 = 0;
	        		        			}
		        		        		Total = +Total + +Total1;
		        		        		Total = Math.round(Total * 100) / 100;
		        		        	}
		        		        	document.getElementById("totalWithExpense1").value = Total;
		        		        	document.getElementById("grossTotal1").value = Total;
	        		        	}  
	                    	
			},
			pager: "#jqGridPager1",
			
		});
		
	
		//$("#list4").addRowData(i+1,jsonData[i]);
		if(count==0 || count==null)
		{
			 // $("#list4").addRowData(i,jsonData[i]);
			  $("#credit").addRowData(0,jsonData.offer);
		}
		

 
		 $('#credit').navGrid('#jqGridPager1',
	                
	                { edit: true, add: false, del: true, search: true, refresh: true, view: true, position: "left", cloneToTop: false },
	                
	                {
	                    editCaption: "The Edit Dialog",
	                 
	                    afterSubmit: function () {
							
	                      var grid = $("#credit"),
						  intervalId = setInterval(
						  function()
						  {
					         grid.trigger("reloadGrid",[{current:true}]);
						  },500);
	                         
	                      
						},
						
						 recreateForm: true,
						 checkOnUpdate : true,
						 checkOnSubmit : true,
		                 closeAfterEdit: true, 
		                						
	                    errorTextFormat: function (data)
	                    {
	                        return 'Error: ' + data.responseText
	                    }
	                },
	                
	                {
	                    closeAfterAdd: true,
	                    recreateForm: true,
	                    errorTextFormat: function (data)
	                    {
	                        return 'Error: ' + data.responseText
	                    }
	                },
	                
	                {
	                	closeAfterdel:true,
	                	checkOnUpdate : true,
						checkOnSubmit : true,
						recreateForm: true,
	                	
						afterComplete: function() {
							
							document.getElementById("discount1").value = 0;
			     			document.getElementById("discountAmount1").value = 0;
			     			document.getElementById("hamaliExpence3").value = 0;
			     			document.getElementById("hamaliExpence1").value = 0;
							
	                		$('#credit').trigger( 'reloadGrid' );


	 				        	Calculation of total after editing quantity
	 				        	   
	 				        	   // $(this).trigger('reloadGrid');
	 				        	   var rowId =$("#credit").jqGrid('getGridParam','selrow');  
	 		                       var rowData = jQuery("#credit").getRowData(rowId);
	 		                    	var quantity = rowData['quantity'];
	 		                    	var salePrice = rowData['salePrice'];
	 		                    	
	 		                    	var iGst = rowData['igst'];
	 		                    	var Gst = rowData['gst'];
	 		                    	
	 		                    	productId = $('#proName1').val();
	 		                    	
	 		                    	$("#proName1 option:selected").each(function() {
	 		                    		   selectedVal = $(this).text();
	 		                    		});
	 		                    	
	 		                    	var splitText = selectedVal.split(",");
	 		                    	
	 		                    	var stock = splitText[4];
	 		                    	
	 		                    	if ( Number(quantity) > Number(stock))
	 		                    	{
	 		                    		alert("Available stock = "+stock);
	 		                    		
	 		                    		var tota = 0;
			                    		$("#credit").jqGrid("setCell", rowId, "total", tota);
			                    		//delete if next line if grid didn't work properly 
			                    		$("#credit").jqGrid("setCell", rowId, "quantity", tota);
			                    		
			                    		
			                    		return false;
			                        }
			                    	//if grid not work properly then just dlt else statement
			                    	else
			                    	{
			                    		var tota = quantity * salePrice;
			                    		tota = Math.round(tota * 100) / 100;
			                    		$("#credit").jqGrid("setCell", rowId, "total", tota);
			                    	//}
			                    		
			                    		var Total =0;
			                    		var count = jQuery("#credit").jqGrid('getGridParam', 'records');
			        		        	var allRowsInGrid1 = $('#credit').getGridParam('data');
			        		        	var AllRows=JSON.stringify(allRowsInGrid1);
			        		        	for (var k = 0; k < count; k++) {
			        		        		var Total1 = allRowsInGrid1[k].total;
			        		        		Total = +Total + +Total1;
			        		        		Total = Math.round(Total * 100) / 100;
			        		        	}
			        		        	document.getElementById("totalWithExpense1").value = Total;
			        		        	document.getElementById("grossTotal1").value = Total;
		        		        		//document.getElementById("duptotal").value = Total;
			                    	}
	 		                    		
	 		                    		
	 	                    		
	 	                    	      //  }
	 		                    	
	 			                    		var tota = quantity * salePrice;
	 			                    		$("#credit").jqGrid("setCell", rowId, "total", tota);
	 		                    	
	 		                    		
	 		                    		var Total =0;
	 		                    		var count = jQuery("#credit").jqGrid('getGridParam', 'records');
	 		        		        	var allRowsInGrid1 = $('#credit').getGridParam('data');
	 		        		        	var AllRows=JSON.stringify(allRowsInGrid1);
	 		        		        	for (var k = 0; k < count; k++) {
	 		        		        		var Total1 = allRowsInGrid1[k].total;
	 		        		        		Total = +Total + +Total1;
			        		        		Total = Math.round(Total * 100) / 100;
	 		        		        	}
	 		        		        	document.getElementById("totalWithExpense1").value = Total;
	 		        		        	document.getElementById("grossTotal1").value = Total;
	 	        		        		//document.getElementById("duptotal").value = Total;	 		        		        	
						//}	
						},
						reloadAftersubmit:true,	
	                    errorTextFormat: function (data) {
	                        return 'Error: ' + data.responseText
	                    }
	                		
	                });
		 
		 
			   });
			
			
			
		
			
		})
	
}*/




/*++++++++++++++ Fetch product details by product name for CREDIT customer 22-5-17 ++++++++++++++++++++++++++*/
function getProductDetailsByProductNameForCredit()
{
	var params= {};
	
	var barcodeNo = $('#barcodeNo1').val();
	var challanNo = $('#challanNo').val();
	var challanNoC = $('#challanNoC').val();
	var productIdCredit = $('#productIdCredit').val();
	//alert("productIdCredit---->"+productIdCredit);
	
	var splitText = productIdCredit.split(" => ");
		
//	var proName = splitText[0];
//	var barcode = splitText[1];
//	var company = splitText[2];
	var quandob = splitText[3];
//	var weight = splitText[4];
//	var unitnm = splitText[6];
//	var subCatId = splitText[5];
//	var catId = splitText[7];
//	var expiryDate = splitText[9];

	var proName = splitText[0];
	var barcode = splitText[1];
	var company = splitText[2];
	var subCatId = splitText[7];
	var weight= splitText[5];
	var unitnm = splitText[6];
	var catId = splitText[8];
	var expiryDate = splitText[9];
	var packed = splitText[10];
	var proid = splitText[11];
	
	params["proName"]= proName;
	params["barcode"]= barcode;
	params["company"]= company;
	params["weight"]= weight;
	params["catId"]= catId;
	params["subCatId"]= subCatId;
	params["expiryDate"]= expiryDate;
	params["packed"] = packed;
	params["barcodeNo"]= barcodeNo;	
	params["challanNo"]= challanNo;
	params["proid"] = proid;
	document.getElementById('barcodeNo1').value = "";
	document.getElementById('productIdCredit').value = "";	
	
	var count=0;
	var newrow;
	var rowId;
	
	params["methodName"] = "getProductDetails2";
	
	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
			{
		  var jsonData = $.parseJSON(data);
			
	       //$("#credit").jqGrid("clearGridData", true).trigger("reloadGrid");
		
         $.each(jsonData,function(i,v)
			{
	    	 
	    	var gstPercentage = +v.cgst+ +v.sgst;
	    	
		  var gTotal=0;
		  var aaa = document.getElementById("totalWithExpense1").value;
		  if(aaa=="" || aaa==null || aaa==undefined){
			  aaa=0;
		  }
				{
		    		gTotal = +gTotal + +v.total;
		    		aaa = +aaa + +gTotal;
				}
	    	document.getElementById("totalWithExpense1").value = aaa;  
	    	document.getElementById("grossTotal1").value = aaa;
	    
	        function sumFmatter (cellvalue, options, rowObject)
	        {
	            
	        	var tax = options.rowData.gstPercentage;
	        	
	        	if(tax == 0){
	        		var tot= (options.rowData.quantity * options.rowData.sp);
	        		if(isNaN(tot)){
	        			tot = 0;
					}
	        	}
	        	if(tax != 0){
	        		
	        		var taxcalculation = (tax/100)* Number(options.rowData.sp);
	        		var newSalePrice = Number(taxcalculation) + Number(options.rowData.sp)
	        		var tot= (Number(options.rowData.quantity) * Number(newSalePrice));
	        		if(isNaN(tot)){
	        			tot = 0;
					}
	        	}
	        	var jam=0;
	        	
	        	
	        	count = jQuery("#credit").jqGrid('getGridParam', 'records');
	        	var allRowsInGrid1 = $('#credit').getGridParam('data');
	        	var AllRows=JSON.stringify(allRowsInGrid1);
	        	for (var i = 0; i < count; i++)
	        	{
	        		var kg = allRowsInGrid1[i].kg;
	        		params["kg"+i] = kg;
	        		
	        		var grams = allRowsInGrid1[i].grams;
	        		params["grams"+i] = grams;
	        		
	            	var quantity = allRowsInGrid1[i].quantity;
	             	params["quantity"+i] = quantity;
	             	
	             	/*var unitName = allRowsInGrid1[i].unitName;
	            	params["unitName"+i] = unitName;*/
	             	
	             	var sp = allRowsInGrid1[i].sp;
	            	params["sp"+i] = sp;                         //sale price
	            	
	            	var cgst = allRowsInGrid1[i].cgst;
	            	params["cgst"+i] = cgst;
	            	
	            	var sgst = allRowsInGrid1[i].sgst;
	            	params["sgst"+i] = sgst;
	            	
	            	var noOfboxes = allRowsInGrid1[i].noOfboxes;
	            	params["noOfboxes"+i] = noOfboxes;
	            	
	            	vatPercentage = +cgst+ +sgst;                //gst value 
	            	
	            	if(vatPercentage == 0){
	            		
	            		var totals1=(sp)*(quantity);
	            		if(isNaN(totals1)){
		             		totals1 = 0;
						}
		            	jam = jam + totals1;
	            	}
	            	
	                if(vatPercentage != 0){
	                	
	                	var taxcal = (vatPercentage/100) * sp;
	                	var newSalePrice = Number(sp) + Number(taxcal);
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
			
			  var prodName,com,packing,unit, expiryDate;
			  var tot1=0;
			  for (var j = 0; j < count; j++) 
			  {
				  prodName = rowdata[j].itemName;
				  com = rowdata[j].companyName;
				  packing = rowdata[j].weight;
				  unit = rowdata[j].unitName;
				  expiryDate = rowdata[j].expiryDate;
				  cat = rowdata[j].cat_id;
				  subcat = rowdata[j].sub_cat_id;
				  proid = rowdata[j].productPkId;
				  tot1= rowdata[j].total;
				  gTotal = gTotal + tot1;
				  
				  
				 var rowId = ids[j];
				 var rowData = jQuery('#credit').jqGrid ('getRowData', rowId);
					var abc =	document.getElementById("totalWithExpense1").value; 
					var av=0;
					
				 if(challanNo == "")
				 {
//					 if (prodName == v.itemName && com == v.companyName && packing == v.weight && unit == v.unitName && expiryDate == v.expiryDate)
					 if (prodName == v.itemName && com == v.companyName && packing == v.weight && unit == v.unitName && cat==v.cat_id && subcat == v.sub_cat_id && proid==v.productPkId)					
					 {
			    	/*ori_quantity = +rowdata[j].quantity+1;
			    	
			    	$("#list4").jqGrid("setCell", rowId, "quantity", ori_quantity);
			    	var grid = jQuery("#list4");
			    	grid.trigger("reloadGrid");*/
					
					av = abc - tot1;
			    	document.getElementById("totalWithExpense1").value = av;  
			    	document.getElementById("grossTotal1").value = av;				  			  	 

			    	newrow=false;
					alert("Product Name Already Inserted !!!");
					var grid = jQuery("#credit");
				    grid.trigger("reloadGrid");
			    	break;
				}
				else
				{
					newrow = true;
//			    	document.getElementById("totalWithExpense1").value = gTotal;  
//			    	document.getElementById("grossTotal1").value = gTotal;
				}

				 }
				else
				{
					newrow = true;

				}
			 }
			  

			  
			  if(newrow == true)
				 {
					
				  //$("#list4").addRowData(i,jsonData[i]);
				  $("#credit").addRowData(count,jsonData[i]);
					
				 }
		
		
		$("#credit").jqGrid({
			datatype: "local",
			
			//colNames:['cat_id','sub_cat_id','ItemName','CompanyName',"HSN",'Packing','Unit', 'UnitPrice','MRP','GST','IGST','Quantity','Total'],
			//colNames:['cat_id','sub_cat_id','ItemName','CompanyName', 'Packing',"HSN",'Unit', 'UnitPrice','MRP','GST','IGST', 'Kg/Ltr', 'Gram/Mili', 'Quantity','Total','StockInGrams','StockInMili','TotalQuantity'],
			
			colNames:[	'cat_id',
						'sub_cat_id',
						"Barcode<br>No",
						'unitPkId',
						'taxPkId',
						'productPkId',
						'Sub Category',
						'Product<br>Name',
						'Company<br>Name',
						"HSN",
						"CH.<br>No",
						"Batch<br>No.",
						'MRP',
						"SP<br>Incl<br>Tax",
						'SP<br>Excl<br>Tax',
						'Quantity',
						"Weight",
						"Unit",
						'SGST%',
						'CGST%',
						'IGST%',
						'Disc %',
						'Disc<br>Amt',
						'Total<br>Excl<br>Tax',
						'Pkg',
						'Qty',
						'Free<br>Qty',
						"Expiry<br>Date",
						'Total',
						'TotalKgLtrQuantity', 
						'stockPerEntry',
						'PkGoodReceiveId',
						'Product ID',
						'Barcode ID'
					],
					
			colModel:[ 
					     {
					    	 name:'cat_id',
					    	 hidden:true,
					    	 align:'center',
					     },
					     {
					    	 name:'sub_cat_id',
					    	 hidden:true,
					    	 align:'center',
					     },         
					     {	
					    	 name:'barcodeNo',
					    	 width:100,
					    	 align:'center',
				   		 },
				   		 {
					    	 name:'unitPkId',
					    	 hidden:true,
					    	 align:'center',
					     }, 
					     {	
					    	 name:'taxPkId',
					    	 width:150,
					    	 hidden:true,
					    	 align:'center',
				   		 },
				   		 {
					    	 name:'productPkId',
					    	 hidden:true,
					    	 align:'center',
					     },
					     {	name:'subcat',
					    	 width:120,
					    	 align:'center',
					     },
					     {	name:'itemName',
					    	 width:120,
					    	 align:'center',
					     },
    				     {	
					    	 name:'companyName',
					    	 width:120,
					    	 align:'center',
						 },
						 {	
							 name:'hsn',
							 width:80,
							 align:'center',
					    	 hidden:true,
						 },
						 {	
					    	 name:'chaalanNo',
					    	 width:80,
					    	 align:'center',
					    	 hidden:true,
				   		 },
						 {	 
							 name:'batchNumber',
							 width:125,
					    	 align:'center',
					    	 hidden:true,
						 },						   
						 
					     {	 name:'mrp',
							 width:100,
							 editable: false,
							 align:'center',
							 hidden:true,
						 },
					     {	
							 name:'sp',
							 width:100,
							 editable: true,
					    	 align:'center',
						},
						{	
							 name:'salePriceEx',
							 width:100,
							 editable: false,
					    	 align:'center',
						},
						{    
							 name:'noOfboxes',
							 width:100,
							 hidden:false,
							 editable:true,
					    	 align:'center',
						},
						{
							name: 'weight',
							width:90,
							align:'center',
						},
						{	name:'unitName',
							width:90,
							align:'center',
						},
						{	
							name:'sgst',
							width:80,
							editable: true,
							align:'center',
						},
						{	
							name:'cgst',
							width:80,
							editable: true,
							align:'center',
						},
						{	
							name:'igst',
							width:80,
							align:'center',
							editable:true
						},
						{	 
							 name:'Discount',
							 width:100,
							 hidden:true,
							 editable:true,
					    	 align:'center',
						},
						{	 
							 name:'DiscountAmount',
							 width:100,
							 hidden:true,
					    	 align:'center',
						},
						{	 name:'TotalEx',
							 width:100,
							 //editable: true,
					    	 align:'center',
						},
						{	
							 name:'weight',
							 width:70,
							 hidden:true,
							 align:'center',
							 editable:true,
						},
						{	
							name:'quantity',
							width:100,
							editable: false,
							align:'center',
							hidden:true,
						},
						{	
							id:'freeQuantity',
							name:'freeQuantity',
							width:100,
							editable: true,
							align:'center',
							hidden:true,
						},
						
						{				
							id:'expiryDate',
							name:'expiryDate',
							width:140,
							editable: false,
							align:'center',
							hidden:true,
						},						
						{	name:'total',
							width:120,
							align:'center',
							/*formatter: sumFmatter*/
						},		
						{	name:'totalKgLtrPiece',
							width:150,
							hidden:true,
							align:'center',
							//formatter: sumFmatter
						},
						{	name:'stockPerEntry',
							width:150,
							hidden:true,
							align:'center',
							//formatter: sumFmatter
						},
						{	name:'PkGoodreceiveId',
							width:150,
							hidden:true,
							align:'center',
						},
						{	name:'productPkId',
							width:150,
							hidden:true,
							align:'center',
						},
						{	name:'barcode_id',
							width:150,
//							editable:true,
							align:'center',
							hidden:true,
						}
				
			],
				
			
			sortorder : 'desc',
			loadonce: false,
			viewrecords: true,
			width: 1200,
			shrinkToFit:true,
			rowheight: 300,
			hoverrows: true,
	        rownumbers: true,
	        rowNum: 10,
	        'cellEdit':true,
	        autowidth:true,
	        pgbuttons : false,
		    pginput : false,
      	
	        afterSaveCell: function  grossTotal()
			{
				       /* 	Calculation of total after editing quantity*/
				        	   
	        		document.getElementById("discount1").value = 0;
	     			document.getElementById("discountAmount1").value = 0;
	     			document.getElementById("hamaliExpence3").value = 0;
	     			document.getElementById("hamaliExpence1").value = 0;
	        		 
	        		 
				        	   // $(this).trigger('reloadGrid');
				        	   var rowId =$("#credit").jqGrid('getGridParam','selrow');  
		                       var rowData = jQuery("#credit").getRowData(rowId);
		                       var productName = rowData['itemName'];
		                       var quantity = rowData['quantity'];
		                       var freeQuantity = rowData['freeQuantity'];
		                       var salePrice = rowData['sp'];
		                       var mrp = rowData['mrp'];
		                       
		                       var iGst = rowData['igst'];
		                       var cgst = rowData['cgst'];
		                       var sgst = rowData['sgst'];
		                       var gst = +cgst+ +sgst; 
		                       
		                       var unit = rowData['unitName'];
		                       var stockPerEntry = rowData['stockPerEntry'];
		                       var expiryDate = rowData['expiryDate'];
		                       var barcodeNo = rowData['barcodeNo'];
		                       var discountPerc = rowData['Discount'];
		                       var noOfboxes = rowData['noOfboxes'];
		                       var weight = rowData['weight'];
		                       var stockInTotalPieceQuantity = rowData['totalKgLtrPiece'];
		                       
//		                        quantity = ((Number(weight)*Number(noOfboxes)));
		                        quantity = (noOfboxes);
		                        
		                        // quantity =  +totalQty+ +quantity;
	                           $("#credit").jqGrid("setCell", rowId, "quantity", quantity);
	                           
	                           if(Number(quantity) > Number(stockInTotalPieceQuantity)){

            					   var msg = productName+" Available Stock For Barcode No : "+barcodeNo+" = "+stockInTotalPieceQuantity+" Pieces";
 		                    	   var dialog = bootbox.dialog({
                					//title: "Embel Technologies Says :",
                				   /* message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',*/
                				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
                				    closeButton: false
 		                    	   });
                				
 		                    	   setTimeout(function()
 		                    		{
                					dialog.modal('hide');
 		                    	   }, 1500);
 		                    	   
 		                    	   var setFq = 0;
 		                    	   $("#credit").jqGrid("setCell", rowId, "freeQuantity", setFq);
 		                    	   $("#credit").jqGrid("setCell", rowId, "quantity", setFq);
		                    	   $("#credit").jqGrid("setCell", rowId, "total", setFq);
		                    	   $("#credit").jqGrid("setCell", rowId, "noOfboxes", setFq);
		                    	   
		                    	  // finalCalculation();					                    		
 		                    	   return false;
	                    	
	                           }
	                           if(noOfboxes == "")
		                       {
	                        	   noOfboxes = "0";
                   					var setZero = 0;
                   					$("#credit").jqGrid("setCell", rowId, "noOfboxes", setZero);
		                       }
		                       if(cgst == "")
		                       {
		                    	    cgst = "0";
                   					var setZero = 0;
                   					$("#credit").jqGrid("setCell", rowId, "cgst", setZero);
		                       }
		                       if(sgst == "")
		                       {
		                    	    sgst = "0";
                   					var setZero = 0;
                   					$("#credit").jqGrid("setCell", rowId, "sgst", setZero);
		                       }
		                       if(iGst == "")
		                       {
		                    	    igst = "0";
                   					var setZero = 0;
                   					$("#credit").jqGrid("setCell", rowId, "igst", setZero);
		                       }
		                       if(quantity == "")
		                       {
		                    	    quantity = "0";
                   					var setZero = 0;
                   					$("#credit").jqGrid("setCell", rowId, "quantity", setZero);
		                       }else{
		                    	   
		                    	   /*var checkQuantity = /^[0-9]+\.?[0-9]*$/;
									
									if (quantity.match(checkQuantity)) 
									{

									} else {
									var msg = "Please Enter Valid Quantity";
									var dialog = bootbox.dialog({
																														 
									message : '<p class="text-center">'+ msg.fontcolor("red").fontsize(5)+ '</p>',
									closeButton : false
									});

									setTimeout(
									function() 
									{
									dialog.modal('hide');
									},
														
									1500);

									var setZero = 0;
                   					$("#credit").jqGrid("setCell", rowId, "quantity", setZero);
									}*/
										
		                       }		                       
		                       if(discountPerc == "")
		                       {
		                    	    discountPerc = "0";
                   					var setZero = 0;
                   					$("#credit").jqGrid("setCell", rowId, "Discount", setZero);
		                       }
		                       
		                       if(salePrice != "")
		                       {
		                    	   var checkprice = /^[0-9]+\.?[0-9]*$/;
		                    	   if(salePrice.match(checkprice))
		                    	   {}
		                    	   else
		                    	   {
		                    		   var msg="Please Enter Valid Sale Price";
	                    				var dialog = bootbox.dialog({
	                    					
	                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
	                    				    closeButton: false
	                    				});
	                    				
	                    				setTimeout(function() {
	                    					dialog.modal('hide');
	                    				}, 1500);
	                    				
                    				   var setZero = 0;
	 		                    	   $("#credit").jqGrid("setCell", rowId, "salePrice", setZero);
			                    		
		 		                    	  gridTotalCalculation();

	                    				return false;
		                    	   }
		                       }
		                       
		                       if(mrp != "")
		                       {
		                    	   var checkprice = /^[0-9]+\.?[0-9]*$/;
		                    	   if(mrp.match(checkprice))
		                    	   {}
		                    	   else
		                    	   {
		                    		   var msg="Please Enter Valid MRP";
	                    				var dialog = bootbox.dialog({
	                    					
	                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
	                    				    closeButton: false
	                    				});
	                    				
	                    				setTimeout(function() {
	                    					dialog.modal('hide');
	                    				}, 1500);
	                    				
	                    			   var setZero = 0;
	 		                    	   $("#credit").jqGrid("setCell", rowId, "mrp", setZero);
			                    		
	 		                    	  gridTotalCalculation();

	                    				return false;
		                    	   }
		                       }
		                       
		                       
		                       
		                       /*if(vatPercentage != "")
		                       {
		                    	   var checkTax = /^[0-9]+$/;
		                    	   if(vatPercentage.match(checkTax))
		                    	   {}
		                    	   else
		                    	   {
		                    		   var msg="Please Enter Valid GST %";
	                    				var dialog = bootbox.dialog({
	                    					//title: "Embel Technologies Says :",
	                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
	                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
	                    				    closeButton: false
	                    				});
	                    				
	                    				setTimeout(function() {
	                    					dialog.modal('hide');
	                    				}, 1500);
	                    				
	                    				// var setZero = 0;
		 		                    	 $("#credit").jqGrid("setCell", rowId, "vatPercentage", gstPercentage);
	                    				
	                    				return false;
		                    	   }
		                       }*/
		                       
		                       if(mrp == "" || mrp == "0")
		                       {}
		                       else
		                       {
			                       if(Number(salePrice) > Number(mrp))
			                       {
			                    	   var msg="MRP must be Greater Than Sale Price";
	                    				var dialog = bootbox.dialog({
	                    					//title: "Embel Technologies Says :",
	                    				   /* message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',*/
	                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
	                    				    closeButton: false
	                    				});
	                    				
	                    				setTimeout(function() {
	                    					dialog.modal('hide');
	                    				}, 1500);
	                    				
	                    				var setZero = 0;
		 		                    	$("#credit").jqGrid("setCell", rowId, "sp", setZero);
		 		                    	   
	                    				return false;
			                       }
		                       }
		                       
		                       var userKgOrLtrInGramsOrMili = Number(quantity) * 1000;
							                			                    	
		                       var salePricePerGram = 0;
		                    	salePricePerGram = (Number)(salePrice/1000);                    	
		                    	
		                    	//KG CALCULATIONS
		                    	//commented on 8-10
		                    	/*if(unit == 'kg')
	                    		{	
	                    	   		var setFq = 0;
	                    			$("#credit").jqGrid("setCell", rowId, "freeQuantity", setFq);
		                    		
	                    			var rowId =$("#credit").jqGrid('getGridParam','selrow');
	                    			var rowData = jQuery("#credit").getRowData(rowId);
	                    			var stockInKg = rowData['totalKgLtrPiece'];
	                    			var stockInGrams;
	                    			if(Number(stockInKg) > 1)
	                    			{
		                    			stockInGrams = stockInKg * 1000;
	                    			}
	                    			else
	                    			{
	                    				stockInGrams = stockInKg;
	                    			}
	                    			
	                    		if(quantity != '')
	                    		{
	                    			var checkKiloLtr = /^[0-9]+\.?[0-9]{0,3}$/;
	                    			if(quantity.match(checkKiloLtr))
	                    			{
	                    				if(quantity == 0)
	                    				{
	                    					quantity = 0;
		                    				
		                    				var msg="Please Enter Valid kg Value";
		                    				var dialog = bootbox.dialog({
		                    					
		                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		                    				    closeButton: false
		                    				});
		                    				
		                    				setTimeout(function() {
		                    					dialog.modal('hide');
		                    				}, 1500);
		                    				
		                    				var setZero = 0;
				                    		$("#credit").jqGrid("setCell", rowId, "quantity", setZero);
				                    		
			 		                    	  gridTotalCalculation();
				                    		
				                    		return false;
	                    				}
	                    			}
	                    			else
	                    			{
	                    				quantity = 0;
	                    				
	                    				var msg="Please Enter Valid kg Value";
	                    				var dialog = bootbox.dialog({
	                    					//title: "Embel Technologies Says :",
	                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
	                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
	                    				    closeButton: false
	                    				});
	                    				
	                    				setTimeout(function() {
	                    					dialog.modal('hide');
	                    				}, 1500);
	                    				
	                    				var setZero = 0;
			                    		$("#credit").jqGrid("setCell", rowId, "quantity", setZero);
			                    		$("#credit").jqGrid("setCell", rowId, "total", setZero);
			                    		
		 		                    	  gridTotalCalculation();
			                    		return false;
	                    			}
	                    		}
	                    		
	                    		if(expiryDate == 'N/A')
                    			{		                    			
	                    			if(Number(userKgOrLtrInGramsOrMili) > Number(stockInGrams))
			                    	{
		                    			if(Number(stockInGrams) >1000)
		                    				{
		                    					var convertedStockInKg = Number(stockInGrams)/1000;
		                    					//alert(productName+" Available stock = "+convertedStockInKg+" Kg");
		                    					
		                    					 var msg = productName+" Available stock = "+convertedStockInKg+" Kg";
				 		                    	   var dialog = bootbox.dialog({
			                    					//title: "Embel Technologies Says :",
			                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
			                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
			                    				    closeButton: false
				 		                    	   });
			                    				
				 		                    	   setTimeout(function() {
			                    					dialog.modal('hide');
				 		                    	   }, 1500);
				 		                   	}
		                    				else
		                    				{
		                    					//alert(productName+" Available stock = "+stockInGrams+" Grams");
		                    					 var msg = productName+" Available stock = "+stockInGrams+" Grams";
				 		                    	   var dialog = bootbox.dialog({
			                    					//title: "Embel Technologies Says :",
			                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
			                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
			                    				    closeButton: false
				 		                    	   });
			                    				
				 		                    	   setTimeout(function() {
			                    					dialog.modal('hide');
				 		                    	   }, 1500);
		                    				}
		                    			
		                    			var setZero = 0;
			                    		$("#credit").jqGrid("setCell", rowId, "total", setZero);
			                    		$("#credit").jqGrid("setCell", rowId, "quantity", setZero);
			                    					                    		
		 		                    	gridTotalCalculation();
		 		                    	return false;
		                    			
			                    	}
                    			}
	                    		else if(expiryDate !='N/A')
	                    			{
	                    				var stockperEntryInKg = rowData['stockPerEntry'];
		                    			var stockperEntryInGrams;
		                    			if(Number(stockperEntryInKg) > 1)
		                    			{
		                    				stockperEntryInGrams = stockperEntryInKg * 1000;
		                    			}
		                    			else
		                    			{
		                    				stockperEntryInGrams = stockperEntryInKg;
		                    			}
	                    				
	                    			
	                    				if(Number(userKgOrLtrInGramsOrMili) > Number(stockperEntryInGrams))
				                    	{
			                    			if(Number(stockInGrams) >1000)
			                    				{
			                    					var convertedStockInKg = Number(stockperEntryInKg)/1000;
			                    					//alert(productName+" Available stock = "+convertedStockInKg+" Kg");
			                    					
			                    					 var msg = productName+" Available stock = "+stockperEntryInKg+" Kg";
					 		                    	   var dialog = bootbox.dialog({
				                    					//title: "Embel Technologies Says :",
				                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
				                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
				                    				    closeButton: false
					 		                    	   });
				                    				
					 		                    	   setTimeout(function() {
				                    					dialog.modal('hide');
					 		                    	   }, 1500);
					 		                   	}
			                    				else
			                    				{
			                    					//alert(productName+" Available stock = "+stockInGrams+" Grams");
			                    					 var msg = productName+" Available stock = "+stockperEntryInGrams+" Grams";
					 		                    	   var dialog = bootbox.dialog({
				                    					//title: "Embel Technologies Says :",
				                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
				                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
				                    				    closeButton: false
					 		                    	   });
				                    				
					 		                    	   setTimeout(function() {
				                    					dialog.modal('hide');
					 		                    	   }, 1500);
			                    				}
			                    			
			                    			var setZero = 0;
				                    		$("#credit").jqGrid("setCell", rowId, "total", setZero);
				                    		$("#credit").jqGrid("setCell", rowId, "quantity", setZero);
				                    					                    		
			 		                    	gridTotalCalculation();
			 		                    	return false;
			                    	}
	                    			
	                    		}
		                    			KgGramsLtrMiliCalculation();
		                    		
	                    		}*/
	                    		
		                    	//LTR CALCULATIONS
		                    	//commented on 8-10
		                    	/*if(unit == 'ltr')
	                    		{
		                    		var setFq = 0;
	                    			$("#credit").jqGrid("setCell", rowId, "freeQuantity", setFq);
		                    		
		                    		var rowId =$("#credit").jqGrid('getGridParam','selrow');
	                    			var rowData = jQuery("#credit").getRowData(rowId);
	                    			var stockInLtr = rowData['totalKgLtrPiece'];
	                    			var stockInMili = stockInLtr * 1000;
	                    			
	                    			if(quantity != '')
		                    		{	
	                    			var checkKiloLtr = /^[0-9]+\.?[0-9]{0,3}$/;
	                    			if(quantity.match(checkKiloLtr))
	                    			{
	                    				if(quantity == 0)
	                    				{
	                    					quantity = 0;
		                    				
		                    				var msg="Please Enter Valid kg Value";
		                    				var dialog = bootbox.dialog({
		                    					//title: "Embel Technologies Says :",
		                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
		                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		                    				    closeButton: false
		                    				});
		                    				
		                    				setTimeout(function() {
		                    					dialog.modal('hide');
		                    				}, 1500);
		                    				
		                    				var setZero = 0;
				                    		$("#credit").jqGrid("setCell", rowId, "quantity", setZero);
				                    		
			 		                    	gridTotalCalculation();		
				                    		return false;	                    				
	                    				}
	                    			}
	                    			else
	                    			{
	                    				quantity = 0;
	                    				
	                    				   var msg = "Please Enter Valid ltr Value";
		 		                    	   var dialog = bootbox.dialog({
	                    					//title: "Embel Technologies Says :",
	                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
	                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
	                    				    closeButton: false
		 		                    	   });
	                    				
		 		                    	   setTimeout(function() {
	                    					dialog.modal('hide');
		 		                    	   }, 1500);
		 		                    	   
	                    				var setZero = 0;
			                    		$("#credit").jqGrid("setCell", rowId, "quantity", setZero);
			                    		KgGramsLtrMiliCalculation();
	                    				return false;
	                    			}
	                    		}
	                    			if(expiryDate =='N/A')
	                    			{	                    			
			                    		if(Number(userKgOrLtrInGramsOrMili) > Number(stockInMili))
				                    	{
			                    			if(Number(stockInMili) >1000)
			                    				{
			                    					var convertedStockInLtr = Number(stockInMili)/1000;
			                    					
			                    					 var msg = productName+" Available stock = "+convertedStockInLtr+" Ltr";
					 		                    	   var dialog = bootbox.dialog({
				                    					//title: "Embel Technologies Says :",
				                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
				                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
				                    				    closeButton: false
					 		                    	   });
				                    				
					 		                    	   setTimeout(function() {
				                    					dialog.modal('hide');
					 		                    	   }, 1500);		                    					
			                    				}
			                    				else
			                    				{		                    					
			                    					 var msg = productName+" Available stock = "+stockInMili+" mili";
					 		                    	   var dialog = bootbox.dialog({
				                    					
				                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
				                    				    closeButton: false
					 		                    	   });
				                    				
					 		                    	   setTimeout(function() {
				                    					dialog.modal('hide');
					 		                    	   }, 1500);
			                    				}
			                    			
			                    			var setZero = 0;
				                    		$("#credit").jqGrid("setCell", rowId, "total", setZero);
				                    		$("#credit").jqGrid("setCell", rowId, "quantity", setZero);
				                    		
				                    		gridTotalCalculation();			        		        	
				        		        	return false;
			                    	}
	                    		}
	                    		else if(expiryDate !='N/A')
	                    		{	
	                    			var stockperEntryInLtr = rowData['stockPerEntry'];
	                    			var stockperEntryInMili;
	                    			if(Number(stockperEntryInLtr) > 1)
	                    			{
	                    				stockperEntryInMili = stockperEntryInLtr * 1000;
	                    			}
	                    			else
	                    			{
	                    				stockperEntryInMili = stockperEntryInLtr;
	                    			}	                    			
	                    		
	                    			if(Number(userKgOrLtrInGramsOrMili) > Number(stockperEntryInMili))
			                    	{
		                    			if(Number(stockInMili) >1000)
		                    				{
		                    					var convertedStockInLtr = Number(stockperEntryInMili)/1000;
		                    					
		                    					 var msg = productName+" Available stock = "+convertedStockInLtr+" Ltr";
				 		                    	   var dialog = bootbox.dialog({
			                    				
			                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
			                    				    closeButton: false
				 		                    	   });
			                    				
				 		                    	   setTimeout(function() {
			                    					dialog.modal('hide');
				 		                    	   }, 1500);		                    					
		                    				}
		                    				else
		                    				{		                    					
		                    					 var msg = productName+" Available stock = "+stockperEntryInMili+" mili";
				 		                    	   var dialog = bootbox.dialog({
			                    					
			                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
			                    				    closeButton: false
				 		                    	   });
			                    				
				 		                    	   setTimeout(function() {
			                    					dialog.modal('hide');
				 		                    	   }, 1500);
		                    				}
		                    			
		                    			var setZero = 0;
			                    		$("#credit").jqGrid("setCell", rowId, "total", setZero);
			                    		$("#credit").jqGrid("setCell", rowId, "quantity", setZero);
			                    		
			                    		gridTotalCalculation();			        		        	
			        		        	return false;
			                    	}
	                    		}
		                    		
		                    		KgGramsLtrMiliCalculation();
	                    		}*/
		                    	
		                    	function KgGramsLtrMiliCalculation()
		                    	{
		                    		if((Number(quantity) > 0 || Number(quantity) != '' || quantity != '0'))
		                    		{
			                    		var salePriceKgTota = 0;
			                    		salePriceKgTota = userKgOrLtrInGramsOrMili*salePricePerGram;
			                    		salePriceKgTota = Math.round(salePriceKgTota * 100) / 100;			                    		
	                    				$("#credit").jqGrid("setCell", rowId, "total", salePriceKgTota);
	                    			}
			                    	
			                    	else if(Number(quantity) == 0  || Number(quantity)== '')
			                    	{		
	                    				var setZero = 0;
			                    		$("#credit").jqGrid("setCell", rowId, "total", setZero);
			                    		
		 		                    	gridTotalCalculation();
	 		                    	   
	 		                    	   return false;
			                    	}
		                    	}
		                    	
		                    	if(unit == 'pcs')
				                {
			                    		if(freeQuantity == "" || freeQuantity == "0")
			                    		{
			                    			freeQuantity = 0;
			                    			var setZero = 0;
	                                 		$("#credit").jqGrid("setCell", rowId, "freeQuantity", setZero);
	                                 		quantity = Number(quantity) + Number(freeQuantity);
			                    		}
				                    	else if(freeQuantity != '' || freeQuantity != "0")
			                    		{
											var checkFreeQuantity = /^[0-9]+$/;
								    		if(freeQuantity.match(checkFreeQuantity))
								    		{
								    			quantity = Number(quantity) + Number(freeQuantity);
								    		}
								    		else
								    		{
							    				 var msg="Please Enter Valid Free Quantity";
				 		                    	   var dialog = bootbox.dialog({
			                    					
			                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
			                    				    closeButton: false
			                    				});
				 		                    	  setTimeout(function() {
				                    					dialog.modal('hide');
				                    				}, 1500);
			                    				 
			                    				 quantity = 0;
			                    				 var setZero = 0;
		                                   		 $("#credit").jqGrid("setCell", rowId, "quantity", setZero);
		 			                    		 $("#credit").jqGrid("setCell", rowId, "total", setZero);
		                                   		 $("#credit").jqGrid("setCell", rowId, "freeQuantity", setZero);
		 			                    		 
		                                   		finalCalculation();
		                                   		 	
			                    				return false;			                    			
								    		}
			                    		}
			                    		
			                    		var rowId =$("#credit").jqGrid('getGridParam','selrow');
		                    			var rowData = jQuery("#credit").getRowData(rowId);
		                    			var stockInTotalPieceQuantity = rowData['totalKgLtrPiece'];	                    			
		                    			
		                    			if(quantity != '')
			                    		{
			                    			 var checkQuantity = /^[0-9]+$/;
			                    			 if(String(quantity).match(checkQuantity))
			                    			 {}
			                    			 else
			                    			 {
			                    				 var msg = productName+"Please Enter Valid Quantity";
				 		                    	   var dialog = bootbox.dialog({
			                    					
			                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
			                    				    closeButton: false
				 		                    	   });
			                    				
				 		                    	   setTimeout(function() {
			                    					dialog.modal('hide');
				 		                    	   }, 1500);
				 		                    	   
			                    				 quantity = 0;
			                    				 var setZero = 0;
		                                  		 $("#credit").jqGrid("setCell", rowId, "quantity", setZero);
		                                  		 $("#credit").jqGrid("setCell", rowId, "total", setZero);
		                                  		 $("#credit").jqGrid("setCell", rowId, "freeQuantity", setZero);
		                                  		 
				 		                    	  gridTotalCalculation();                                  		 
			                    				 return false;
			                    			 } 
			                    		}
		                    			
		                    			if(expiryDate =='N/A')
			                    		{		
		                    				if (Number(quantity) > Number(stockInTotalPieceQuantity))
					                    	{					                    		
					                    		var msg = productName+" Available Stock For Barcode No : "+barcodeNo+" = "+stockInTotalPieceQuantity+" Pieces";
				 		                    	   var dialog = bootbox.dialog({
			                    					
			                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
			                    				    closeButton: false
				 		                    	   });
			                    				
				 		                    	   setTimeout(function()
				 		                    		{
			                    					dialog.modal('hide');
				 		                    	   }, 1500);
				 		                    	   
				 		                    	   var setFq = 0;
				 		                    	   $("#credit").jqGrid("setCell", rowId, "freeQuantity", setFq);
				 		                    	   $("#credit").jqGrid("setCell", rowId, "quantity", setFq);
				 		                    	   $("#credit").jqGrid("setCell", rowId, "total", setFq);
					                    		
				 		                    	  gridTotalCalculation();
				 		                    	  return false;
					                    	}
			                    		}
		                    			if(expiryDate !='N/A')
			                    		{		
		                    				if ( Number(quantity) > Number(stockPerEntry))
					                    	{				                    		
					                    		var msg = productName+" Available stock = "+stockPerEntry+" Pieces";
				 		                    	   var dialog = bootbox.dialog({
			                    					
			                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
			                    				    closeButton: false
				 		                    	   });
			                    				
				 		                    	   setTimeout(function() {
			                    					dialog.modal('hide');
				 		                    	   }, 1500);
				 		                    	   
				 		                    	   var zeroQuantity = 0;
				 		                    	   $("#credit").jqGrid("setCell", rowId, "freeQuantity", zeroQuantity);
				 		                    	   $("#credit").jqGrid("setCell", rowId, "quantity", zeroQuantity);
				 		                    	   $("#credit").jqGrid("setCell", rowId, "total", zeroQuantity);
					                    		
				 		                    	  gridTotalCalculation();
				 		                    	  return false;
					                    	}
		                    			}
				                    	
			                    	/*if (iGst != 0 || iGst != undefined)
			                    	{
		                    			var taxPercentage = iGst;
			                    		var taxAmount = ((taxPercentage/100)*salePrice);
			                    		var BuyPriceWithTaxAmount = Number(taxAmount) + Number(salePrice);
			                    		var tota = Number(quantity - freeQuantity) * salePrice;
			                    		tota = Math.round(tota * 100) / 100;
			                    		$("#credit").jqGrid("setCell", rowId, "total", tota);
				                    }
			                    	else if(iGst == 0 || iGst == undefined)
			                    	{
			                    		Gst = 0;
			                    		var  taxPercentage = Number(Gst);
			                    		var taxAmount = ((taxPercentage/100)*salePrice);
			                    		var BuyPriceWithTaxAmount = Number(taxAmount) + Number(salePrice);
			                    		var tota = Number(quantity - freeQuantity) * salePrice;
			                    		tota = Math.round(tota * 100) / 100;
			                    		$("#credit").jqGrid("setCell", rowId, "total", tota);
			                    	}*/
				                }
			                    		                    	
		                    	gridTotalCalculation();
		                    	
		                    	
		                    	
		                    	//var quantity = rowData['quantity'];
                                var DiscountAmount= rowData['DiscountAmount'];
								var Discount= rowData['Discount'];
								var TotalEx= rowData['TotalEx'];
								var salePriceEx= rowData['salePriceEx'];
								var iGst = rowData['igst'];
								var cgst = rowData['cgst'];
			                    var sgst = rowData['sgst'];
			                    var gst = +cgst+ +sgst;
								
			                  //CGST and SGST and IGST Validation
			                    
			                    if( Number(cgst)>0 &&  Number(sgst)>0 && Number(iGst)>0 )
								{
									 var setValue = 0;
									 
									 var msg = "You Can't Enter valur For Both tax";
									 var dialog = bootbox.dialog({
														
								message : '<p class="text-center">'+ msg.fontcolor("red").fontsize(5)+ '</p>',
								closeButton : false
								
									});

								setTimeout(
										function()
										{dialog.modal('hide');
											},
										1500);
								
						            $("#credit").jqGrid("setCell",rowId,"igst",setValue);
						           		
						           		 return false;									
								}
								else
								{
									 if(Number(cgst)>0 && Number(iGst)>0)
									 {
										   var setValue = 0;
					        			 
					        			 var msg = "You Can't Enter value For CGST And IGST";
										 var dialog = bootbox.dialog({
															
									message : '<p class="text-center">'+ msg.fontcolor("red").fontsize(5)+ '</p>',
									closeButton : false
									
										});

									setTimeout(
											function()
											{dialog.modal('hide');
												},
											1500);

								    var setValue;
							           		 $("#credit").jqGrid("setCell",rowId,"cgst",setValue);
							           		 $("#credit").jqGrid("setCell",rowId,"igst",setValue);
							           		
							           		 return false;	 
									 }
									 else{
										 
										 if(Number(sgst)>0 && Number(iGst)>0)
										 {
											 var setValue = 0;
						        			 
						        			 var msg = "You Can't Enter value For SGST And IGST";
											 var dialog = bootbox.dialog({
																
										message : '<p class="text-center">'+ msg.fontcolor("red").fontsize(5)+ '</p>',
										closeButton : false
										
											});

										setTimeout(
												function()
												{dialog.modal('hide');
													},
												1500);

									    var setValue;
								           		 $("#credit").jqGrid("setCell",rowId,"sgst",setValue);
								           		 $("#credit").jqGrid("setCell",rowId,"igst",setValue);
								           		
								           		 return false;	
						        		}
									 }
								}
			                    
			                    
								/*/////calculation of gst////*/														
								var checkDiscount = /^[0-9]+\.?[0-9]*$/;
								  if(Discount.match(checkDiscount))
								  {
									  if(Number(Discount) >= 100)
							  	  {
							  		  var setZero = 0;
							  		  //alert("In discount")
							  		  myAlert("Discount Percentage Must Be Less Than 100");
							  	      $("#credit").jqGrid("setCell", rowId, "DiscountAmount", setZero);
							      	  totalCalC();
							      	  totalDisC();
							  		  return false;
							  	  }
								  }
								  else
								  {
									  var setZero = 0;
									   if(Discount== "")
									   {
							  		 $("#credit").jqGrid("setCell", rowId, "DiscountAmount", setZero);
							      	  }
									  else
									  {
							  		  myAlert("Pleaee Enter Valid Discount value");
							  		  $("#credit").jqGrid("setCell", rowId, "DiscountAmount", setZero);
							      	  totalCalC();
							      	  totalDisC();
							      	  return false;
									  }
								  }			
								  
								//sale price excluding tax calc//
								  var checksalePrice= /^[0-9]+\.?[0-9]*$/;
								  if(salePrice.match(checksalePrice))
							    {
							      	  if(Number(salePrice) > 0)
							  		  {
							      		 
							      		  spwTax = (salePrice/(1+(gst/100)+(iGst/100)));

/*							      		  var aa = (salePriceEx*((gst/100)+(iGst/100)));
								      		spwTax = +salePriceEx + +aa;*/
								      		
							      		  $("#credit").jqGrid("setCell", rowId, "salePriceEx",  spwTax.toFixed(2));
//								      		  $("#credit").jqGrid("setCell", rowId, "sp",  spwTax.toFixed(2));							      	  
							      	
							      		 if(Number(gst) > 0)
							      		 {  							      			 
							      		      DiscountAmount= (spwTax*(Discount/100));
							      			  finalsp = (spwTax- DiscountAmount) * quantity;
							      			  newTaxAmt = (((finalsp*quantity)*gst)/100);
							      			  
							      			  var oneProTax = (((finalsp)*gst)/100);
							      			  newFinalsp = finalsp+ oneProTax;
							      			  tota = newFinalsp;
							      			  DiscountAmount = DiscountAmount * quantity;
							      									      		
									    $("#credit").jqGrid("setCell", rowId, "TotalEx", finalsp.toFixed(2));
									    $("#credit").jqGrid("setCell", rowId, "DiscountAmount", DiscountAmount.toFixed(2));	
									    $("#credit").jqGrid("setCell", rowId, "total", tota.toFixed(2));
//									    $("#credit").jqGrid("setCell", rowId, "total", finalsp.toFixed(2));
									 
									     totalCalC();
									     totalDisC();	
							      		}
							      		 
							      	else if(Number(iGst) > 0)
							      	{  							      			 
						      		      DiscountAmount= (spwTax*(Discount/100));
						      			  finalsp = (spwTax- DiscountAmount) * quantity;
						      			  newTaxAmt = (((finalsp*quantity)*iGst)/100);
						      			  
						      			  var oneProTax = (((finalsp)*iGst)/100);
						      			  newFinalsp = finalsp+ oneProTax;
						      			  tota = newFinalsp;
						      			  DiscountAmount = DiscountAmount * quantity;
						      									      		
								    $("#credit").jqGrid("setCell", rowId, "TotalEx", finalsp.toFixed(2));
								    $("#credit").jqGrid("setCell", rowId, "DiscountAmount", DiscountAmount.toFixed(2));	
								    $("#credit").jqGrid("setCell", rowId, "total", tota.toFixed(2));
//								    $("#credit").jqGrid("setCell", rowId, "total", finalsp.toFixed(2));								 
								     totalCalC();
								     totalDisC();	
						      		}
							      		 
							      	else if(Number(gst) == 0 && Number(iGst) == 0)
							      	{  							      			 
						      		      DiscountAmount= (spwTax*(Discount/100));
						      			  finalsp = (spwTax- DiscountAmount) * quantity;
						      			  newTaxAmt = (((finalsp*quantity)*iGst)/100);
						      			  
						      			  var oneProTax = (((finalsp)*iGst)/100);
						      			  newFinalsp = finalsp+ oneProTax;
						      			  tota = newFinalsp;
						      			  DiscountAmount = DiscountAmount * quantity;
						      									      		
								    $("#credit").jqGrid("setCell", rowId, "TotalEx", finalsp.toFixed(2));
								    $("#credit").jqGrid("setCell", rowId, "DiscountAmount", DiscountAmount.toFixed(2));	
								    $("#credit").jqGrid("setCell", rowId, "total", tota.toFixed(2));
//								    $("#credit").jqGrid("setCell", rowId, "total", finalsp.toFixed(2));								 
								     totalCalC();
								     totalDisC();	
						      		}			
							     else
							        {
								     var setZero = 0; 
									  $("#credit").jqGrid("setCell", rowId, "DiscountAmount", setZero);
								   /* $("#list4").jqGrid("setCell", rowId, "Total", tota.toFixed(2));*/
								  /*  $("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero);*/
							    }
					        }
						    else
					           {
							  	var setZero = 0;
							  /*$("#list4").jqGrid("setCell", rowId, "sPWithoutTax", setZero);*/
							    $("#credit").jqGrid("setCell", rowId, "DiscountAmount", setZero);
							    $("#credit").jqGrid("setCell", rowId, "total", setZero);
							 /* $("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero);*/
							    return false;
								}
							    }				        	  
						else
							{
								var setZero = 0;
								alert("Pleae Enter Valid Buy Price");
								$("#credit").jqGrid("setCell", rowId, "salePrice", setZero);
								$("#credit").jqGrid("setCell", rowId, "salePriceEx", setZero);
							  	$("#credit").jqGrid("setCell", rowId, "DiscountAmount", setZero);
							  	$("#credit").jqGrid("setCell", rowId, "total", setZero);
							 /*  $("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero);*/
									  return false;
								 }
								
								/*if(Gst!=0)
								{
								var taxpercentage = Gst;
								var salepriceEx=saleprice(1+(taxpercentage/100)));
								
								
							$("#jqGrid").jqGrid("setCell",rowId,"salepriceEx",salepriceEx);
							
							return false;
				                         }
								*/
								  //out of grid calc//
								
									function totalCalC()
									{	
									       var Total = 0;
									       var totAmtWithTax = 0;
									       var count = jQuery("#credit").jqGrid('getGridParam', 'records');
									       var allRowsInGrid1 = $('#credit').getGridParam('data');
									        var AllRows=JSON.stringify(allRowsInGrid1);
									       //alert("total...." +total);
									       for (var k = 0; k < count; k++)
									       {
									          var Total1 = allRowsInGrid1[k].total;//grid total 

									        if(Total1 != undefined)
									        {
									        		Total = +Total + +Total1;
									        		  }
									        	  }
									        	  /*for (var j = 0; j < count; j++)
									        	  {
									        		  var Total2 = allRowsInGrid1[j].taxAmount;
									        		  var Total3 = allRowsInGrid1[j].Total;
									        		  if(Total2 != undefined)
									        		  {
									        			  totAmtWithTax = +totAmtWithTax + +Total2 + +Total3;
									        		  }
									        	  }*/
									        	  document.getElementById("totalWithExpense1").value = +Total.toFixed(2);
//									        	  document.getElementById("totalAmount").value = Total.toFixed(2);//Math.round(Total);
									        	  document.getElementById("grossTotal1").value = Total.toFixed(2);//Math.round(Total);
									        	  var totAmount = Total.toFixed(2);//Math.round(Total);
										        }
									        	  
									      function totalDisC()
										   {
											    //TOTAL DISCOUNT AMOUNT
											       var TotalDisAmt = 0;
											        var TotalsPAmt = 0;
											        var disPer = 0;
											        var count = jQuery("#credit").jqGrid('getGridParam', 'records');
											        var allRowsInGrid1 = $('#credit').getGridParam('data');
											        var AllRows=JSON.stringify(allRowsInGrid1);
											        for (var l = 0; l < count; l++)
											        {
											          var TotalDisAmt1 = allRowsInGrid1[l].DiscountAmount;
											          var TotalsPAmt1 = allRowsInGrid1[l].salePriceEx;
											        		  
											        if(TotalsPAmt1 != undefined)
											        {
											        	TotalsPAmt = (+TotalsPAmt + +TotalsPAmt1).toFixed(2);
											        }
											        if(TotalDisAmt1 != undefined)
											        {
											        	TotalDisAmt = (+TotalDisAmt + +TotalDisAmt1).toFixed(2);
											        	disPer = ((TotalDisAmt/TotalsPAmt)*100).toFixed(2);
											        }						        	 
											        	  }
											        	  /*document.getElementById("discount1").value = disPer;*/
											        	 // document.getElementById("discount").value = TotalDisAmt;
										        	 }
		                    	
		                    	function gridTotalCalculation()
		                    	{
			                    	var Total =0;
			                    	var Total1 = 0;
		                    		var count = jQuery("#credit").jqGrid('getGridParam', 'records');
		        		        	var allRowsInGrid1 = $('#credit').getGridParam('data');
		        		        	var AllRows=JSON.stringify(allRowsInGrid1);
		        		        	for (var k = 0; k < count; k++)
		        		        	{
		        		        		Total1 = allRowsInGrid1[k].total;
		        		        		if(Total1 == undefined)
	        		        			{
		        		        			Total1 = 0;
	        		        			}
		        		        		Total = +Total + +Total1;
		        		        		Total = Math.round(Total * 100) / 100;
		        		        	}
		        		        	document.getElementById("totalWithExpense1").value = Total;
		        		        	document.getElementById("grossTotal1").value = Total;
	        		        	}  
	                    	
			},
			pager: "#jqGridPager1",
			
		});
		
	
		//$("#list4").addRowData(i+1,jsonData[i]);
		if(count==0 || count==null)
		{
			 // $("#list4").addRowData(i,jsonData[i]);
			  $("#credit").addRowData(0,jsonData[i]);
		}
		

 
		 $('#credit').navGrid('#jqGridPager1',
	                
	                { edit: true, add: false, del: true, search: true, refresh: true, view: true, position: "left", cloneToTop: false },
	                
	                {
	                    editCaption: "The Edit Dialog",
	                 
	                    afterSubmit: function () {
							
	                      var grid = $("#credit"),
						  intervalId = setInterval(
						  function()
						  {
					         grid.trigger("reloadGrid",[{current:true}]);
						  },500);
	                         
	                      
						},
						
						 recreateForm: true,
						 checkOnUpdate : true,
						 checkOnSubmit : true,
		                 closeAfterEdit: true, 
		                						
	                    errorTextFormat: function (data)
	                    {
	                        return 'Error: ' + data.responseText
	                    }
	                },
	                
	                {
	                    closeAfterAdd: true,
	                    recreateForm: true,
	                    errorTextFormat: function (data)
	                    {
	                        return 'Error: ' + data.responseText
	                    }
	                },
	                
	                {
	                	closeAfterdel:true,
	                	checkOnUpdate : true,
						checkOnSubmit : true,
						recreateForm: true,
	                	
						afterComplete: function() {
							
							document.getElementById("discount1").value = 0;
			     			document.getElementById("discountAmount1").value = 0;
			     			document.getElementById("hamaliExpence3").value = 0;
			     			document.getElementById("hamaliExpence1").value = 0;
							
	                		$('#credit').trigger( 'reloadGrid' );


	 				       /* 	Calculation of total after editing quantity*/
	 				        	   
	 				        	   // $(this).trigger('reloadGrid');
//	 				        	   var rowId =$("#credit").jqGrid('getGridParam','selrow');  
//	 		                       var rowData = jQuery("#credit").getRowData(rowId);
	 		                       
					        	   var rowId =$("#credit").jqGrid('getGridParam','selrow');  
			                       var rowData = jQuery("#credit").getRowData(rowId);
	 		                       
	 		                    	var quantity = rowData['quantity'];
	 		                    	var salePrice = rowData['salePrice'];
	 		                    	
	 		                    	var iGst = rowData['igst'];
	 		                    	var Gst = rowData['gst'];
	 		                    	
	 		                    	//productId = $('#proName1').val();
	 		                    	
	 		                    	/*$("#proName1 option:selected").each(function() {
	 		                    		   selectedVal = $(this).text();
	 		                    		});
	 		                    	*/
	 		                    	//var splitText = selectedVal.split(",");
	 		                    	
	 		                    	var stock = splitText[4];
	 		                    	
	 		                    	if ( Number(quantity) > Number(stock))
	 		                    	{
	 		                    		alert("Available stock = "+stock);
	 		                    		
	 		                    		var tota = 0;
			                    		$("#credit").jqGrid("setCell", rowId, "total", tota);
			                    		//delete if next line if grid didn't work properly 
			                    		$("#credit").jqGrid("setCell", rowId, "quantity", tota);
			                    		
			                    		
			                    		return false;
			                        }
			                    	//if grid not work properly then just dlt else statement
			                    	else
			                    	{
			                    		var tota = quantity * salePrice;
			                    		tota = Math.round(tota * 100) / 100;
			                    		$("#credit").jqGrid("setCell", rowId, "total", tota);
			                    	//}
			                    		
			                    		var Total =0;
			                    		var count = jQuery("#credit").jqGrid('getGridParam', 'records');
			        		        	var allRowsInGrid1 = $('#credit').getGridParam('data');
			        		        	var AllRows=JSON.stringify(allRowsInGrid1);
			        		        	for (var k = 0; k < count; k++) {
			        		        		var Total1 = allRowsInGrid1[k].total;
			        		        		Total = +Total + +Total1;
			        		        		Total = Math.round(Total * 100) / 100;
			        		        	}
			        		        	document.getElementById("totalWithExpense1").value = Total;
			        		        	document.getElementById("grossTotal1").value = Total;
		        		        		//document.getElementById("duptotal").value = Total;
			                    	}
	 		                    		
	 		                    		
	 		                    		
	 		                    		
	 		                    		
	 		                    		
	 	                    		
	 	                    	      //  }
	 		                    	
	 			                    		var tota = quantity * salePrice;
	 			                    		$("#credit").jqGrid("setCell", rowId, "total", tota);
	 		                    	
	 		                    		
	 		                    		var Total =0;
	 		                    		var count = jQuery("#credit").jqGrid('getGridParam', 'records');
	 		        		        	var allRowsInGrid1 = $('#credit').getGridParam('data');
	 		        		        	var AllRows=JSON.stringify(allRowsInGrid1);
	 		        		        	for (var k = 0; k < count; k++) {
	 		        		        		var Total1 = allRowsInGrid1[k].total;
	 		        		        		Total = +Total + +Total1;
			        		        		Total = Math.round(Total * 100) / 100;
	 		        		        	}
	 		        		        	document.getElementById("totalWithExpense1").value = Total;
	 		        		        	document.getElementById("grossTotal1").value = Total;
	 	        		        		//document.getElementById("duptotal").value = Total;	 		        		        	
						//}	
						},
						reloadAftersubmit:true,	
	                    errorTextFormat: function (data) {
	                        return 'Error: ' + data.responseText
	                    }
	                		
	                });
		 
		 
			   });
			
			
			
		
			
		})
	
}

function getProductDetailsForChallan(){
	
	var params= {};
	
	var barcodeNo = $('#barcodeNo1').val();
	var challanNo = $('#challanNo').val();
	var challanNoC = $('#challanNoC').val();
	var productIdCredit = $('#productIdCredit').val();
	//alert("productIdCredit---->"+productIdCredit);
	
	var splitText = productIdCredit.split(" => ");
		
	var proName = splitText[0];
	var barcode = splitText[1];
	var company = splitText[2];
	
	var quandob = splitText[4];
	var weight = splitText[5];
	var unitnm = splitText[6];
	var subCatId = splitText[7];
	var catId = splitText[8];
	var expiryDate = splitText[10];
	var packed = splitText[10];
	var proid = splitText[11];
	
/*	var quandob = splitText[3];
	var weight = splitText[4];
	var unitnm = splitText[6];
	var subCatId = splitText[5];
	var catId = splitText[7];
	var expiryDate = splitText[9];*/
	
	params["proName"]= proName;
	params["barcode"]= barcode;
	params["company"]= company;
	params["weight"]= weight;
	params["catId"]= catId;
	params["subCatId"]= subCatId;
	params["expiryDate"]= expiryDate;
	params["packed"] = packed;
	
	params["barcodeNo"]= barcodeNo;	
	params["challanNo"]= challanNo;
	params["proid"] = proid;
	
	document.getElementById('barcodeNo1').value = "";
	document.getElementById('productIdCredit').value = "";	
	
	var count=0;
	var newrow;
	var rowId;
	
	params["methodName"] = "getProductDetails2";
	
	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
			{
		  var jsonData = $.parseJSON(data);
			
	      // $("#list4").jqGrid("clearGridData", true).trigger("reloadGrid");
		
		  
         $.each(jsonData,function(i,v)
			{
	    	 
	    	var gstPercentage = +v.cgst+ +v.sgst;
	    	
			  var gTotal=0;
				{
		    		gTotal = +gTotal + +v.total;
				}
		    	document.getElementById("totalWithExpense1").value = gTotal;  
		    	document.getElementById("grossTotal1").value = gTotal;
	    	
	        function sumFmatter (cellvalue, options, rowObject)
	        {
	            
	        	var tax = options.rowData.gstPercentage;
	        	
	        	if(tax == 0){
	        		var tot= (options.rowData.quantity * options.rowData.sp);
	        		if(isNaN(tot)){
	        			tot = 0;
					}
	        	}
	        	if(tax != 0){
	        		
	        		var taxcalculation = (tax/100)* Number(options.rowData.sp);
	        		var newSalePrice = Number(taxcalculation) + Number(options.rowData.sp)
	        		var tot= (Number(options.rowData.quantity) * Number(newSalePrice));
	        		if(isNaN(tot)){
	        			tot = 0;
					}
	        	}
	        	var jam=0;
	        	
	        	
	        	count = jQuery("#credit").jqGrid('getGridParam', 'records');
	        	var allRowsInGrid1 = $('#credit').getGridParam('data');
	        	var AllRows=JSON.stringify(allRowsInGrid1);
	        	for (var i = 0; i < count; i++)
	        	{
	        		var kg = allRowsInGrid1[i].kg;
	        		params["kg"+i] = kg;
	        		
	        		var grams = allRowsInGrid1[i].grams;
	        		params["grams"+i] = grams;
	        		
	            	var quantity = allRowsInGrid1[i].quantity;
	             	params["quantity"+i] = quantity;
	             	
	             	/*var unitName = allRowsInGrid1[i].unitName;
	            	params["unitName"+i] = unitName;*/
	             	
	             	var sp = allRowsInGrid1[i].sp;
	            	params["sp"+i] = sp;                         //sale price
	            	
	            	var cgst = allRowsInGrid1[i].cgst;
	            	params["cgst"+i] = cgst;
	            	
	            	var sgst = allRowsInGrid1[i].sgst;
	            	params["sgst"+i] = sgst;
	            	
	            	var noOfboxes = allRowsInGrid1[i].noOfboxes;
	            	params["noOfboxes"+i] = noOfboxes;
	            	
	            	vatPercentage = +cgst+ +sgst;                //gst value 
	            	
	            	if(vatPercentage == 0){
	            		
	            		var totals1=(sp)*(quantity);
	            		if(isNaN(totals1)){
		             		totals1 = 0;
						}
		            	jam = jam + totals1;
	            	}
	            	
	                if(vatPercentage != 0){
	                	
	                	var taxcal = (vatPercentage/100) * sp;
	                	var newSalePrice = Number(sp) + Number(taxcal);
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
			
			  var prodName,com,packing,unit, expiryDate,tot;
			  for (var j = 0; j < count; j++) 
			  {
				  prodName = rowdata[j].itemName;
				  com = rowdata[j].companyName;
				  packing = rowdata[j].weight;
				  unit = rowdata[j].unitName;
				  expiryDate = rowdata[j].expiryDate;
				  tot= rowdata[j].total;
				  gTotal = gTotal + tot;
				  
				 var rowId = ids[j];
				 var rowData = jQuery('#credit').jqGrid ('getRowData', rowId);
				
			//	 if(challanNo == "")
				// {
					 if (prodName == v.itemName && com == v.companyName && packing == v.weight && unit == v.unitName && expiryDate == v.expiryDate)
					 {
			    	/*ori_quantity = +rowdata[j].quantity+1;
			    	
			    	$("#list4").jqGrid("setCell", rowId, "quantity", ori_quantity);
			    	var grid = jQuery("#list4");
			    	grid.trigger("reloadGrid");*/
			    	newrow=false;
					alert("Product Name Already Inserted !!!");
					var grid = jQuery("#credit");
				    grid.trigger("reloadGrid");
			    	break;
				}
				else
				{
					newrow = true;
			    	document.getElementById("totalWithExpense1").value = gTotal;  
			    	document.getElementById("grossTotal1").value = gTotal;
				}
			//	}
			/*	else
				{
					newrow = true;
			    	document.getElementById("totalWithExpense1").value = gTotal;  
			    	document.getElementById("grossTotal1").value = gTotal;
				}*/
			 }
			  
			  if(newrow == true)
				 {
					
				  //$("#list4").addRowData(i,jsonData[i]);
				  $("#credit").addRowData(count,jsonData[i]);
					
				 }
		
		
		$("#credit").jqGrid({
			datatype: "local",
			
			//colNames:['cat_id','sub_cat_id','ItemName','CompanyName',"HSN",'Packing','Unit', 'UnitPrice','MRP','GST','IGST','Quantity','Total'],
			//colNames:['cat_id','sub_cat_id','ItemName','CompanyName', 'Packing',"HSN",'Unit', 'UnitPrice','MRP','GST','IGST', 'Kg/Ltr', 'Gram/Mili', 'Quantity','Total','StockInGrams','StockInMili','TotalQuantity'],
			
			colNames:[	'cat_id',
						'sub_cat_id',
						"Barcode<br>No",
						'unitPkId',
						'taxPkId',
						'productPkId',
						'Product<br>Name',
						'Company<br>Name',
						"HSN",
						"CH.<br>No",
						"Batch<br>No.",
						'MRP',
						"SP<br>Incl<br>Tax",
						'SP<br>Excl<br>Tax',
						'Quantity',
						"Unit",
						'SGST%',
						'CGST%',
						'IGST%',
						'Disc %',
						'Disc<br>Amt',
						'Total<br>Excl<br>Tax',
						'Pkg',
						'Qty',
						'Free<br>Qty',
						"Expiry<br>Date",
						'Total',
						'TotalKgLtrQuantity', 
						'stockPerEntry',
						'PkGoodReceiveId'
					],
					
			colModel:[ 
					     {
					    	 name:'cat_id',
					    	 hidden:true,
					    	 align:'center',
					     },
					     {
					    	 name:'sub_cat_id',
					    	 hidden:true,
					    	 align:'center',
					     },         
					     {	
					    	 name:'barcodeNo',
					    	 width:100,
					    	 align:'center',
				   		 },
                         {
					    	 name:'unitPkId',
					    	 hidden:true,
					    	 align:'center',
					     }, 
					     {	
					    	 name:'taxPkId',
					    	 width:150,
					    	 hidden:true,
					    	 align:'center',
				   		 },
				   		 {
					    	 name:'productPkId',
					    	 hidden:true,
					    	 align:'center',
					     },
					     {	name:'itemName',
					    	 width:120,
					    	 align:'center',
					     },
    				     {	
					    	 name:'companyName',
					    	 width:120,
					    	 align:'center',
						 },
						 {	
							 name:'hsn',
							 width:80,
							 align:'center',
						 },
						 {	
					    	 name:'chaalanNo',
					    	 width:90,
					    	 align:'center',
				   		 },
						 {	 
							 name:'batchNumber',
							 width:125,
					    	 align:'center',
					    	 hidden:true,
						 },						   
						 
					     {	 name:'mrp',
							 width:100,
							 editable: false,
							 align:'center',
							 hidden:true,
						 },
					     {	
							 name:'sp',
							 width:100,
							 editable: true,
					    	 align:'center',
						},
						{	
							 name:'salePriceEx',
							 width:100,
							 editable: false,
					    	 align:'center',
						},
						{    
							 name:'noOfboxes',
							 width:90,
							 hidden:false,
							 editable:true,
					    	 align:'center',
						},
						{	name:'unitName',
							width:90,
							align:'center',
						},
						{	
							name:'sgst',
							width:80,
							editable: true,
							align:'center',
						},
						{	
							name:'cgst',
							width:80,
							editable: true,
							align:'center',
						},
						{	
							name:'igst',
							width:80,
							align:'center',
							editable:true
						},
						{	 
							 name:'Discount',
							 width:100,
							 hidden:true,
							 editable:true,
					    	 align:'center',
						},
						{	 
							 name:'DiscountAmount',
							 width:100,
							 hidden:true,
					    	 align:'center',
						},
						{	 name:'TotalEx',
							 width:100,
							 //editable: true,
					    	 align:'center',
					    },
						{	
							 name:'weight',
							 width:70,
							 hidden:true,
							 align:'center',
							 editable:true,
						},
						{	
							name:'quantity',
							width:100,
							editable: false,
							align:'center',
							hidden:true,
						},
						{	
							id:'freeQuantity',
							name:'freeQuantity',
							width:100,
							editable: true,
							align:'center',
							hidden:true,
						},
						
						{				
							id:'expiryDate',
							name:'expiryDate',
							width:140,
							editable: false,
							align:'center',
							hidden:true,
						},						
						{	name:'total',
							width:100,
							align:'center',
							/*formatter: sumFmatter*/
						},		
						{	name:'totalKgLtrPiece',
							width:150,
							hidden:true,
							align:'center',
							//formatter: sumFmatter
						},
						{	name:'stockPerEntry',
							width:150,
							hidden:true,
							align:'center',
							//formatter: sumFmatter
						},
						{	name:'PkGoodreceiveId',
							width:150,
							hidden:true,
							align:'center',
						}
				
			],
				
			
			sortorder : 'desc',
			loadonce: false,
			viewrecords: true,
			width: 1200,
			shrinkToFit:true,
			rowheight: 300,
			hoverrows: true,
	        rownumbers: true,
	        rowNum: 10,
	        'cellEdit':true,
	        autowidth:true,
	        pgbuttons : false,
		    pginput : false,
      	
	        afterSaveCell: function  grossTotal()
			{
				       /* 	Calculation of total after editing quantity*/
				        	   
	        		document.getElementById("discount1").value = 0;
	     			document.getElementById("discountAmount1").value = 0;
	     			document.getElementById("hamaliExpence3").value = 0;
	     			document.getElementById("hamaliExpence1").value = 0;
	        		 
	        		 
				        	   // $(this).trigger('reloadGrid');
				        	   var rowId =$("#credit").jqGrid('getGridParam','selrow');  
		                       var rowData = jQuery("#credit").getRowData(rowId);
		                       var productName = rowData['itemName'];
		                       var quantity = rowData['quantity'];
		                       var freeQuantity = rowData['freeQuantity'];
		                       var salePrice = rowData['sp'];
		                       var mrp = rowData['mrp'];
		                       
		                       var iGst = rowData['igst'];
		                       var cgst = rowData['cgst'];
		                       var sgst = rowData['sgst'];
		                       var gst = +cgst+ +sgst; 
		                       
		                       var unit = rowData['unitName'];
		                       var stockPerEntry = rowData['stockPerEntry'];
		                       var expiryDate = rowData['expiryDate'];
		                       var barcodeNo = rowData['barcodeNo'];
		                       var discountPerc = rowData['Discount'];
		                       var noOfboxes = rowData['noOfboxes'];
		                       var weight = rowData['weight'];
		                       var stockInTotalPieceQuantity = rowData['totalKgLtrPiece'];
		                       var TotalEx = rowData['TotalEx'];
		                       
		                        quantity = ((Number(weight)*Number(noOfboxes)));
	                          // quantity =  +totalQty+ +quantity;
	                           $("#credit").jqGrid("setCell", rowId, "quantity", quantity);
	                           
	                           if(Number(quantity) > Number(stockInTotalPieceQuantity)){

            					   var msg = productName+" Available Stock For Barcode No : "+barcodeNo+" = "+stockInTotalPieceQuantity+" Pieces";
 		                    	   var dialog = bootbox.dialog({
                					//title: "Embel Technologies Says :",
                				   /* message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',*/
                				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
                				    closeButton: false
 		                    	   });
                				
 		                    	   setTimeout(function()
 		                    		{
                					dialog.modal('hide');
 		                    	   }, 1500);
 		                    	   
 		                    	   var setFq = 0;
 		                    	   $("#credit").jqGrid("setCell", rowId, "freeQuantity", setFq);
 		                    	   $("#credit").jqGrid("setCell", rowId, "quantity", setFq);
		                    	   $("#credit").jqGrid("setCell", rowId, "total", setFq);
		                    	   $("#credit").jqGrid("setCell", rowId, "noOfboxes", setFq);
		                    	   $("#credit").jqGrid("setCell", rowId, "TotalEx", setFq);
		                    	   
		                    	   gridTotalCalculation();				                    		
 		                    	   return false;
	                    	
	                           }
	                           if(noOfboxes == "")
		                       {
	                        	   noOfboxes = "0";
                   					var setZero = 0;
                   					$("#credit").jqGrid("setCell", rowId, "noOfboxes", setZero);
		                       }
		                       if(cgst == "")
		                       {
		                    	    cgst = "0";
                   					var setZero = 0;
                   					$("#credit").jqGrid("setCell", rowId, "cgst", setZero);
		                       }
		                       if(sgst == "")
		                       {
		                    	    sgst = "0";
                   					var setZero = 0;
                   					$("#credit").jqGrid("setCell", rowId, "sgst", setZero);
		                       }
		                       if(iGst == "")
		                       {
		                    	    igst = "0";
                   					var setZero = 0;
                   					$("#credit").jqGrid("setCell", rowId, "igst", setZero);
		                       }
		                       if(quantity == "")
		                       {
		                    	    quantity = "0";
                   					var setZero = 0;
                   					$("#credit").jqGrid("setCell", rowId, "quantity", setZero);
		                       }		                       
		                       if(discountPerc == "")
		                       {
		                    	    discountPerc = "0";
                   					var setZero = 0;
                   					$("#credit").jqGrid("setCell", rowId, "Discount", setZero);
		                       }
		                       
		                       if(salePrice != "")
		                       {
		                    	   var checkprice = /^[0-9]+\.?[0-9]*$/;
		                    	   if(salePrice.match(checkprice))
		                    	   {}
		                    	   else
		                    	   {
		                    		   var msg="Please Enter Valid Sale Price";
	                    				var dialog = bootbox.dialog({
	                    					
	                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
	                    				    closeButton: false
	                    				});
	                    				
	                    				setTimeout(function() {
	                    					dialog.modal('hide');
	                    				}, 1500);
	                    				
                    				   var setZero = 0;
	 		                    	   $("#credit").jqGrid("setCell", rowId, "salePrice", setZero);
			                    		
		 		                    	  gridTotalCalculation();

	                    				return false;
		                    	   }
		                       }
		                       
		                       if(mrp != "")
		                       {
		                    	   var checkprice = /^[0-9]+\.?[0-9]*$/;
		                    	   if(mrp.match(checkprice))
		                    	   {}
		                    	   else
		                    	   {
		                    		   var msg="Please Enter Valid MRP";
	                    				var dialog = bootbox.dialog({
	                    					
	                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
	                    				    closeButton: false
	                    				});
	                    				
	                    				setTimeout(function() {
	                    					dialog.modal('hide');
	                    				}, 1500);
	                    				
	                    			   var setZero = 0;
	 		                    	   $("#credit").jqGrid("setCell", rowId, "mrp", setZero);
			                    		
	 		                    	  gridTotalCalculation();

	                    				return false;
		                    	   }
		                       }
		                       
		                       
		                       
		                       /*if(vatPercentage != "")
		                       {
		                    	   var checkTax = /^[0-9]+$/;
		                    	   if(vatPercentage.match(checkTax))
		                    	   {}
		                    	   else
		                    	   {
		                    		   var msg="Please Enter Valid GST %";
	                    				var dialog = bootbox.dialog({
	                    					//title: "Embel Technologies Says :",
	                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
	                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
	                    				    closeButton: false
	                    				});
	                    				
	                    				setTimeout(function() {
	                    					dialog.modal('hide');
	                    				}, 1500);
	                    				
	                    				// var setZero = 0;
		 		                    	 $("#credit").jqGrid("setCell", rowId, "vatPercentage", gstPercentage);
	                    				
	                    				return false;
		                    	   }
		                       }*/
		                       
		                       if(mrp == "" || mrp == "0")
		                       {}
		                       else
		                       {
			                       if(Number(salePrice) > Number(mrp))
			                       {
			                    	   var msg="MRP must be Greater Than Sale Price";
	                    				var dialog = bootbox.dialog({
	                    					//title: "Embel Technologies Says :",
	                    				   /* message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',*/
	                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
	                    				    closeButton: false
	                    				});
	                    				
	                    				setTimeout(function() {
	                    					dialog.modal('hide');
	                    				}, 1500);
	                    				
	                    				var setZero = 0;
		 		                    	$("#credit").jqGrid("setCell", rowId, "sp", setZero);
		 		                    	   
	                    				return false;
			                       }
		                       }
		                       
		                       var userKgOrLtrInGramsOrMili = Number(quantity) * 1000;
							                			                    	
		                       var salePricePerGram = 0;
		                    	salePricePerGram = (Number)(salePrice/1000);                    	
		                    	
		                    	//KG CALCULATIONS
		                    	if(unit == 'kg')
	                    		{	
	                    	   		var setFq = 0;
	                    			$("#credit").jqGrid("setCell", rowId, "freeQuantity", setFq);
		                    		
	                    			var rowId =$("#credit").jqGrid('getGridParam','selrow');
	                    			var rowData = jQuery("#credit").getRowData(rowId);
	                    			var stockInKg = rowData['totalKgLtrPiece'];
	                    			var stockInGrams;
	                    			if(Number(stockInKg) > 1)
	                    			{
		                    			stockInGrams = stockInKg * 1000;
	                    			}
	                    			else
	                    			{
	                    				stockInGrams = stockInKg;
	                    			}
	                    			
	                    		if(quantity != '')
	                    		{
//	                    			var checkKiloLtr = /^[0-9]+\.?[0-9]{0,3}$/;
	                    			var checkKiloLtr = /^[0-9]+\.?[0-9]*$/;
//	                    			if(quantity.match(checkKiloLtr))
	                    			if(quantity.match(checkKiloLtr))
	                    			{
	                    				if(quantity == 0)
	                    				{
	                    					quantity = 0;
		                    				
		                    				var msg="Please Enter Valid kg Value";
		                    				var dialog = bootbox.dialog({
		                    					
		                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		                    				    closeButton: false
		                    				});
		                    				
		                    				setTimeout(function() {
		                    					dialog.modal('hide');
		                    				}, 1500);
		                    				
/*		                    				var setZero = 0;
				                    		$("#credit").jqGrid("setCell", rowId, "quantity", setZero);*/
				                    		
			 		                    	  gridTotalCalculation();
				                    		
				                    		return false;
	                    				}
	                    			}
	                    			else
	                    			{
	                    				quantity = 0;
	                    				
	                    				var msg="Please Enter Valid kg Value";
	                    				var dialog = bootbox.dialog({
	                    					//title: "Embel Technologies Says :",
	                    				   /* message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',*/
	                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
	                    				    closeButton: false
	                    				});
	                    				
	                    				setTimeout(function() {
	                    					dialog.modal('hide');
	                    				}, 1500);
	                    				
	                    				var setZero = 0;
			                    		$("#credit").jqGrid("setCell", rowId, "quantity", setZero);
			                    		$("#credit").jqGrid("setCell", rowId, "total", setZero);
			                    		
		 		                    	  gridTotalCalculation();
			                    		return false;
	                    			}
	                    		}
	                    		
	                    		if(expiryDate == 'N/A')
                    			{		                    			
	                    			if(Number(userKgOrLtrInGramsOrMili) > Number(stockInGrams))
			                    	{
		                    			if(Number(stockInGrams) >1000)
		                    				{
		                    					var convertedStockInKg = Number(stockInGrams)/1000;
		                    					//alert(productName+" Available stock = "+convertedStockInKg+" Kg");
		                    					
		                    					 var msg = productName+" Available stock = "+convertedStockInKg+" Kg";
				 		                    	   var dialog = bootbox.dialog({
			                    					//title: "Embel Technologies Says :",
			                    				   /* message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',*/
			                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
			                    				    closeButton: false
				 		                    	   });
			                    				
				 		                    	   setTimeout(function() {
			                    					dialog.modal('hide');
				 		                    	   }, 1500);
				 		                   	}
		                    				else
		                    				{
		                    					//alert(productName+" Available stock = "+stockInGrams+" Grams");
		                    					 var msg = productName+" Available stock = "+stockInGrams+" Grams";
				 		                    	   var dialog = bootbox.dialog({
			                    					//title: "Embel Technologies Says :",
			                    				   /* message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',*/
			                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
			                    				    closeButton: false
				 		                    	   });
			                    				
				 		                    	   setTimeout(function() {
			                    					dialog.modal('hide');
				 		                    	   }, 1500);
		                    				}
		                    			
		                    			var setZero = 0;
			                    		$("#credit").jqGrid("setCell", rowId, "total", setZero);
			                    		$("#credit").jqGrid("setCell", rowId, "quantity", setZero);
			                    					                    		
		 		                    	gridTotalCalculation();
		 		                    	return false;
		                    			
			                    	}
                    			}
	                    		else if(expiryDate !='N/A')
	                    			{
	                    				var stockperEntryInKg = rowData['stockPerEntry'];
		                    			var stockperEntryInGrams;
		                    			if(Number(stockperEntryInKg) > 1)
		                    			{
		                    				stockperEntryInGrams = stockperEntryInKg * 1000;
		                    			}
		                    			else
		                    			{
		                    				stockperEntryInGrams = stockperEntryInKg;
		                    			}
	                    				
	                    			
	                    				if(Number(userKgOrLtrInGramsOrMili) > Number(stockperEntryInGrams))
				                    	{
			                    			if(Number(stockInGrams) >1000)
			                    				{
			                    					var convertedStockInKg = Number(stockperEntryInKg)/1000;
			                    					//alert(productName+" Available stock = "+convertedStockInKg+" Kg");
			                    					
			                    					 var msg = productName+" Available stock = "+stockperEntryInKg+" Kg";
					 		                    	   var dialog = bootbox.dialog({
				                    					//title: "Embel Technologies Says :",
				                    				   /* message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',*/
				                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
				                    				    closeButton: false
					 		                    	   });
				                    				
					 		                    	   setTimeout(function() {
				                    					dialog.modal('hide');
					 		                    	   }, 1500);
					 		                   	}
			                    				else
			                    				{
			                    					//alert(productName+" Available stock = "+stockInGrams+" Grams");
			                    					 var msg = productName+" Available stock = "+stockperEntryInGrams+" Grams";
					 		                    	   var dialog = bootbox.dialog({
				                    					//title: "Embel Technologies Says :",
				                    				   /* message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',*/
				                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
				                    				    closeButton: false
					 		                    	   });
				                    				
					 		                    	   setTimeout(function() {
				                    					dialog.modal('hide');
					 		                    	   }, 1500);
			                    				}
			                    			
			                    			var setZero = 0;
				                    		$("#credit").jqGrid("setCell", rowId, "total", setZero);
				                    		$("#credit").jqGrid("setCell", rowId, "quantity", setZero);
				                    					                    		
			 		                    	gridTotalCalculation();
			 		                    	return false;
			                    	}
	                    			
	                    		}
		                    			KgGramsLtrMiliCalculation();
		                    		
	                    		}
	                    		
		                    	//LTR CALCULATIONS
		                    	if(unit == 'ltr')
	                    		{
		                    		var setFq = 0;
	                    			$("#credit").jqGrid("setCell", rowId, "freeQuantity", setFq);
		                    		
		                    		var rowId =$("#credit").jqGrid('getGridParam','selrow');
	                    			var rowData = jQuery("#credit").getRowData(rowId);
	                    			var stockInLtr = rowData['totalKgLtrPiece'];
	                    			var stockInMili = stockInLtr * 1000;
	                    			
	                    			if(quantity != '')
		                    		{	
	                    			var checkKiloLtr = /^[0-9]+\.?[0-9]{0,3}$/;
	                    			if(quantity.match(checkKiloLtr))
	                    			{
	                    				if(quantity == 0)
	                    				{
	                    					quantity = 0;
		                    				
		                    				var msg="Please Enter Valid kg Value";
		                    				var dialog = bootbox.dialog({
		                    					//title: "Embel Technologies Says :",
		                    				   /* message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',*/
		                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		                    				    closeButton: false
		                    				});
		                    				
		                    				setTimeout(function() {
		                    					dialog.modal('hide');
		                    				}, 1500);
		                    				
		                    				var setZero = 0;
				                    		$("#credit").jqGrid("setCell", rowId, "quantity", setZero);
				                    		
			 		                    	gridTotalCalculation();		
				                    		return false;	                    				
	                    				}
	                    			}
	                    			else
	                    			{
	                    				quantity = 0;
	                    				
	                    				   var msg = "Please Enter Valid ltr Value";
		 		                    	   var dialog = bootbox.dialog({
	                    					//title: "Embel Technologies Says :",
	                    				   /* message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',*/
	                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
	                    				    closeButton: false
		 		                    	   });
	                    				
		 		                    	   setTimeout(function() {
	                    					dialog.modal('hide');
		 		                    	   }, 1500);
		 		                    	   
	                    				var setZero = 0;
			                    		$("#credit").jqGrid("setCell", rowId, "quantity", setZero);
			                    		KgGramsLtrMiliCalculation();
	                    				return false;
	                    			}
	                    		}
	                    			if(expiryDate =='N/A')
	                    			{	                    			
			                    		if(Number(userKgOrLtrInGramsOrMili) > Number(stockInMili))
				                    	{
			                    			if(Number(stockInMili) >1000)
			                    				{
			                    					var convertedStockInLtr = Number(stockInMili)/1000;
			                    					
			                    					 var msg = productName+" Available stock = "+convertedStockInLtr+" Ltr";
					 		                    	   var dialog = bootbox.dialog({
				                    					//title: "Embel Technologies Says :",
				                    				   /* message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',*/
				                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
				                    				    closeButton: false
					 		                    	   });
				                    				
					 		                    	   setTimeout(function() {
				                    					dialog.modal('hide');
					 		                    	   }, 1500);		                    					
			                    				}
			                    				else
			                    				{		                    					
			                    					 var msg = productName+" Available stock = "+stockInMili+" mili";
					 		                    	   var dialog = bootbox.dialog({
				                    					
				                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
				                    				    closeButton: false
					 		                    	   });
				                    				
					 		                    	   setTimeout(function() {
				                    					dialog.modal('hide');
					 		                    	   }, 1500);
			                    				}
			                    			
			                    			var setZero = 0;
				                    		$("#credit").jqGrid("setCell", rowId, "total", setZero);
				                    		$("#credit").jqGrid("setCell", rowId, "quantity", setZero);
				                    		
				                    		gridTotalCalculation();			        		        	
				        		        	return false;
			                    	}
	                    		}
	                    		else if(expiryDate !='N/A')
	                    		{	
	                    			var stockperEntryInLtr = rowData['stockPerEntry'];
	                    			var stockperEntryInMili;
	                    			if(Number(stockperEntryInLtr) > 1)
	                    			{
	                    				stockperEntryInMili = stockperEntryInLtr * 1000;
	                    			}
	                    			else
	                    			{
	                    				stockperEntryInMili = stockperEntryInLtr;
	                    			}	                    			
	                    		
	                    			if(Number(userKgOrLtrInGramsOrMili) > Number(stockperEntryInMili))
			                    	{
		                    			if(Number(stockInMili) >1000)
		                    				{
		                    					var convertedStockInLtr = Number(stockperEntryInMili)/1000;
		                    					
		                    					 var msg = productName+" Available stock = "+convertedStockInLtr+" Ltr";
				 		                    	   var dialog = bootbox.dialog({
			                    				
			                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
			                    				    closeButton: false
				 		                    	   });
			                    				
				 		                    	   setTimeout(function() {
			                    					dialog.modal('hide');
				 		                    	   }, 1500);		                    					
		                    				}
		                    				else
		                    				{		                    					
		                    					 var msg = productName+" Available stock = "+stockperEntryInMili+" mili";
				 		                    	   var dialog = bootbox.dialog({
			                    					
			                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
			                    				    closeButton: false
				 		                    	   });
			                    				
				 		                    	   setTimeout(function() {
			                    					dialog.modal('hide');
				 		                    	   }, 1500);
		                    				}
		                    			
		                    			var setZero = 0;
			                    		$("#credit").jqGrid("setCell", rowId, "total", setZero);
			                    		$("#credit").jqGrid("setCell", rowId, "quantity", setZero);
			                    		
			                    		gridTotalCalculation();			        		        	
			        		        	return false;
			                    	}
	                    		}
		                    		
		                    		KgGramsLtrMiliCalculation();
	                    		}
		                    	
		                    	function KgGramsLtrMiliCalculation()
		                    	{
		                    		if((Number(quantity) > 0 || Number(quantity) != '' || quantity != '0'))
		                    		{
			                    		var salePriceKgTota = 0;
			                    		salePriceKgTota = userKgOrLtrInGramsOrMili*salePricePerGram;
			                    		salePriceKgTota = Math.round(salePriceKgTota * 100) / 100;			                    		
	                    				$("#credit").jqGrid("setCell", rowId, "total", salePriceKgTota);
	                    			}
			                    	
			                    	else if(Number(quantity) == 0  || Number(quantity)== '')
			                    	{		
	                    				var setZero = 0;
			                    		$("#credit").jqGrid("setCell", rowId, "total", setZero);
			                    		
		 		                    	gridTotalCalculation();
	 		                    	   
	 		                    	   return false;
			                    	}
		                    	}
		                    	
		                    	if(unit == 'pcs')
				                {
			                    		if(freeQuantity == "" || freeQuantity == "0")
			                    		{
			                    			freeQuantity = 0;
			                    			var setZero = 0;
	                                 		$("#credit").jqGrid("setCell", rowId, "freeQuantity", setZero);
	                                 		quantity = Number(quantity) + Number(freeQuantity);
			                    		}
				                    	else if(freeQuantity != '' || freeQuantity != "0")
			                    		{
											var checkFreeQuantity = /^[0-9]+$/;
								    		if(freeQuantity.match(checkFreeQuantity))
								    		{
								    			quantity = Number(quantity) + Number(freeQuantity);
								    		}
								    		else
								    		{
							    				 var msg="Please Enter Valid Free Quantity";
				 		                    	   var dialog = bootbox.dialog({
			                    					
			                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
			                    				    closeButton: false
			                    				});
				 		                    	  setTimeout(function() {
				                    					dialog.modal('hide');
				                    				}, 1500);
			                    				 
			                    				 quantity = 0;
			                    				 var setZero = 0;
		                                   		 $("#credit").jqGrid("setCell", rowId, "quantity", setZero);
		 			                    		 $("#credit").jqGrid("setCell", rowId, "total", setZero);
		                                   		 $("#credit").jqGrid("setCell", rowId, "freeQuantity", setZero);
		 			                    		 
		                                   		finalCalculation();
		                                   		 	
			                    				return false;			                    			
								    		}
			                    		}
			                    		
			                    		var rowId =$("#credit").jqGrid('getGridParam','selrow');
		                    			var rowData = jQuery("#credit").getRowData(rowId);
		                    			var stockInTotalPieceQuantity = rowData['totalKgLtrPiece'];	                    			
		                    			
		                    			if(quantity != '')
			                    		{
			                    			 var checkQuantity = /^[0-9]+$/;
			                    			 if(String(quantity).match(checkQuantity))
			                    			 {}
			                    			 else
			                    			 {
			                    				 var msg = productName+"Please Enter Valid Quantity";
				 		                    	   var dialog = bootbox.dialog({
			                    					
			                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
			                    				    closeButton: false
				 		                    	   });
			                    				
				 		                    	   setTimeout(function() {
			                    					dialog.modal('hide');
				 		                    	   }, 1500);
				 		                    	   
			                    				 quantity = 0;
			                    				 var setZero = 0;
		                                  		 $("#credit").jqGrid("setCell", rowId, "quantity", setZero);
		                                  		 $("#credit").jqGrid("setCell", rowId, "total", setZero);
		                                  		 $("#credit").jqGrid("setCell", rowId, "freeQuantity", setZero);
		                                  		 
				 		                    	  gridTotalCalculation();                                  		 
			                    				 return false;
			                    			 } 
			                    		}
		                    			
		                    			if(expiryDate =='N/A')
			                    		{		
		                    				if (Number(quantity) > Number(stockInTotalPieceQuantity))
					                    	{					                    		
					                    		var msg = productName+" Available Stock For Barcode No : "+barcodeNo+" = "+stockInTotalPieceQuantity+" Pieces";
				 		                    	   var dialog = bootbox.dialog({
			                    					
			                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
			                    				    closeButton: false
				 		                    	   });
			                    				
				 		                    	   setTimeout(function()
				 		                    		{
			                    					dialog.modal('hide');
				 		                    	   }, 1500);
				 		                    	   
				 		                    	   var setFq = 0;
				 		                    	   $("#credit").jqGrid("setCell", rowId, "freeQuantity", setFq);
				 		                    	   $("#credit").jqGrid("setCell", rowId, "quantity", setFq);
				 		                    	   $("#credit").jqGrid("setCell", rowId, "total", setFq);
					                    		
				 		                    	  gridTotalCalculation();
				 		                    	  return false;
					                    	}
			                    		}
		                    			if(expiryDate !='N/A')
			                    		{		
		                    				if ( Number(quantity) > Number(stockPerEntry))
					                    	{				                    		
					                    		var msg = productName+" Available stock = "+stockPerEntry+" Pieces";
				 		                    	   var dialog = bootbox.dialog({
			                    					
			                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
			                    				    closeButton: false
				 		                    	   });
			                    				
				 		                    	   setTimeout(function() {
			                    					dialog.modal('hide');
				 		                    	   }, 1500);
				 		                    	   
				 		                    	   var zeroQuantity = 0;
				 		                    	   $("#credit").jqGrid("setCell", rowId, "freeQuantity", zeroQuantity);
				 		                    	   $("#credit").jqGrid("setCell", rowId, "quantity", zeroQuantity);
				 		                    	   $("#credit").jqGrid("setCell", rowId, "total", zeroQuantity);
					                    		
				 		                    	  gridTotalCalculation();
				 		                    	  return false;
					                    	}
		                    			}
				                    	
			                    	/*if (iGst != 0 || iGst != undefined)
			                    	{
		                    			var taxPercentage = iGst;
			                    		var taxAmount = ((taxPercentage/100)*salePrice);
			                    		var BuyPriceWithTaxAmount = Number(taxAmount) + Number(salePrice);
			                    		var tota = Number(quantity - freeQuantity) * salePrice;
			                    		tota = Math.round(tota * 100) / 100;
			                    		$("#credit").jqGrid("setCell", rowId, "total", tota);
				                    }
			                    	else if(iGst == 0 || iGst == undefined)
			                    	{
			                    		Gst = 0;
			                    		var  taxPercentage = Number(Gst);
			                    		var taxAmount = ((taxPercentage/100)*salePrice);
			                    		var BuyPriceWithTaxAmount = Number(taxAmount) + Number(salePrice);
			                    		var tota = Number(quantity - freeQuantity) * salePrice;
			                    		tota = Math.round(tota * 100) / 100;
			                    		$("#credit").jqGrid("setCell", rowId, "total", tota);
			                    	}*/
				                }
			                    		                    	
		                    	gridTotalCalculation();
		                    	
		                    	
		                    	
		                    	//var quantity = rowData['quantity'];
                                var DiscountAmount= rowData['DiscountAmount'];
								var Discount= rowData['Discount'];
								var TotalEx= rowData['TotalEx'];
								var salePriceEx= rowData['salePriceEx'];
								var iGst = rowData['igst'];
								var cgst = rowData['cgst'];
			                    var sgst = rowData['sgst'];
			                    var gst = +cgst+ +sgst;
								
			                  //CGST and SGST and IGST Validation
			                    
			                    if( Number(cgst)>0 &&  Number(sgst)>0 && Number(iGst)>0 )
								{
									 var setValue = 0;
									 
									 var msg = "You Can't Enter valur For Both tax";
									 var dialog = bootbox.dialog({
														
								message : '<p class="text-center">'+ msg.fontcolor("red").fontsize(5)+ '</p>',
								closeButton : false
								
									});

								setTimeout(
										function()
										{dialog.modal('hide');
											},
										1500);
								
						            $("#credit").jqGrid("setCell",rowId,"igst",setValue);
						           		
						           		 return false;									
								}
								else
								{
									 if(Number(cgst)>0 && Number(iGst)>0)
									 {
										   var setValue = 0;
					        			 
					        			 var msg = "You Can't Enter value For CGST And IGST";
										 var dialog = bootbox.dialog({
															
									message : '<p class="text-center">'+ msg.fontcolor("red").fontsize(5)+ '</p>',
									closeButton : false
									
										});

									setTimeout(
											function()
											{dialog.modal('hide');
												},
											1500);

								    var setValue;
							           		 $("#credit").jqGrid("setCell",rowId,"cgst",setValue);
							           		 $("#credit").jqGrid("setCell",rowId,"igst",setValue);
							           		
							           		 return false;	 
									 }
									 else{
										 
										 if(Number(sgst)>0 && Number(iGst)>0)
										 {
											 var setValue = 0;
						        			 
						        			 var msg = "You Can't Enter value For SGST And IGST";
											 var dialog = bootbox.dialog({
																
										message : '<p class="text-center">'+ msg.fontcolor("red").fontsize(5)+ '</p>',
										closeButton : false
										
											});

										setTimeout(
												function()
												{dialog.modal('hide');
													},
												1500);

									    var setValue;
								           		 $("#credit").jqGrid("setCell",rowId,"sgst",setValue);
								           		 $("#credit").jqGrid("setCell",rowId,"igst",setValue);
								           		
								           		 return false;	
						        		}
									 }
								}
			                    
			                    
								/*/////calculation of gst////*/														
								var checkDiscount = /^[0-9]+\.?[0-9]*$/;
								  if(Discount.match(checkDiscount))
								  {
									  if(Number(Discount) >= 100)
							  	  {
							  		  var setZero = 0;
							  		  //alert("In discount")
							  		  myAlert("Discount Percentage Must Be Less Than 100");
							  	      $("#credit").jqGrid("setCell", rowId, "DiscountAmount", setZero);
							      	  totalCalC();
							      	  totalDisC();
							  		  return false;
							  	  }
								  }
								  else
								  {
									  var setZero = 0;
									   if(Discount== "")
									   {
							  		 $("#credit").jqGrid("setCell", rowId, "DiscountAmount", setZero);
							      	  }
									  else
									  {
							  		  myAlert("Pleaee Enter Valid Discount value");
							  		  $("#credit").jqGrid("setCell", rowId, "DiscountAmount", setZero);
							      	  totalCalC();
							      	  totalDisC();
							      	  return false;
									  }
								  }			
								  
								//sale price excluding tax calc//
								  var checksalePrice= /^[0-9]+\.?[0-9]*$/;
								  if(salePrice.match(checksalePrice))
							    {
							      	  if(Number(salePrice) > 0)
							  		  {
							      		 
							      		  spwTax = (salePrice/(1+(gst/100)+(iGst/100)));
							      		  $("#credit").jqGrid("setCell", rowId, "salePriceEx",  spwTax.toFixed(2));
							      	  
							      	
							      		 if(Number(gst) > 0)
							      		 {  							      			 
							      		      DiscountAmount= (spwTax*(Discount/100));
							      			  finalsp = (spwTax- DiscountAmount) * quantity;
							      			  newTaxAmt = (((finalsp*quantity)*gst)/100);
							      			  
							      			  var oneProTax = (((finalsp)*gst)/100);
							      			  newFinalsp = finalsp+ oneProTax;
							      			  tota = newFinalsp;
							      			  DiscountAmount = DiscountAmount * quantity;
							      									      		
									    $("#credit").jqGrid("setCell", rowId, "TotalEx", finalsp.toFixed(2));
									    $("#credit").jqGrid("setCell", rowId, "DiscountAmount", DiscountAmount.toFixed(2));	
									    $("#credit").jqGrid("setCell", rowId, "total", tota.toFixed(2));
									 
									     totalCalC();
									     totalDisC();	
							      		}
							      		 
							      	else if(Number(iGst) > 0)
							      	{  							      			 
						      		      DiscountAmount= (spwTax*(Discount/100));
						      			  finalsp = (spwTax- DiscountAmount) * quantity;
						      			  newTaxAmt = (((finalsp*quantity)*iGst)/100);
						      			  
						      			  var oneProTax = (((finalsp)*iGst)/100);
						      			  newFinalsp = finalsp+ oneProTax;
						      			  tota = newFinalsp;
						      			  DiscountAmount = DiscountAmount * quantity;
						      									      		
								    $("#credit").jqGrid("setCell", rowId, "TotalEx", finalsp.toFixed(2));
								    $("#credit").jqGrid("setCell", rowId, "DiscountAmount", DiscountAmount.toFixed(2));	
								    $("#credit").jqGrid("setCell", rowId, "total", tota.toFixed(2));
								 
								     totalCalC();
								     totalDisC();	
						      		}
							      		 
							      	else if(Number(gst) == 0 && Number(iGst) == 0)
							      	{  							      			 
						      		      DiscountAmount= (spwTax*(Discount/100));
						      			  finalsp = (spwTax- DiscountAmount) * quantity;
						      			  newTaxAmt = (((finalsp*quantity)*iGst)/100);
						      			  
						      			  var oneProTax = (((finalsp)*iGst)/100);
						      			  newFinalsp = finalsp+ oneProTax;
						      			  tota = newFinalsp;
						      			  DiscountAmount = DiscountAmount * quantity;
						      									      		
								    $("#credit").jqGrid("setCell", rowId, "TotalEx", finalsp.toFixed(2));
								    $("#credit").jqGrid("setCell", rowId, "DiscountAmount", DiscountAmount.toFixed(2));	
								    $("#credit").jqGrid("setCell", rowId, "total", tota.toFixed(2));
								 
								     totalCalC();
								     totalDisC();	
						      		}			
							     else
							        {
								     var setZero = 0; 
									  $("#credit").jqGrid("setCell", rowId, "DiscountAmount", setZero);
								   /* $("#list4").jqGrid("setCell", rowId, "Total", tota.toFixed(2));*/
								  /*  $("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero);*/
							    }
					        }
						    else
					           {
							  	var setZero = 0;
							  /*$("#list4").jqGrid("setCell", rowId, "sPWithoutTax", setZero);*/
							    $("#credit").jqGrid("setCell", rowId, "DiscountAmount", setZero);
							    $("#credit").jqGrid("setCell", rowId, "total", setZero);
							 /* $("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero);*/
							    return false;
								}
							    }				        	  
						else
							{
								var setZero = 0;
								alert("Pleae Enter Valid Buy Price");
								$("#credit").jqGrid("setCell", rowId, "salePrice", setZero);
								$("#credit").jqGrid("setCell", rowId, "salePriceEx", setZero);
							  	$("#credit").jqGrid("setCell", rowId, "DiscountAmount", setZero);
							  	$("#credit").jqGrid("setCell", rowId, "total", setZero);
							 /*  $("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero);*/
									  return false;
								 }
								
								/*if(Gst!=0)
								{
								var taxpercentage = Gst;
								var salepriceEx=saleprice(1+(taxpercentage/100)));
								
								
							$("#jqGrid").jqGrid("setCell",rowId,"salepriceEx",salepriceEx);
							
							return false;
				                         }
								*/
								  //out of grid calc//
								
									function totalCalC()
									{	
									       var Total = 0;
									       var totAmtWithTax = 0;
									       var count = jQuery("#credit").jqGrid('getGridParam', 'records');
									       var allRowsInGrid1 = $('#credit').getGridParam('data');
									        var AllRows=JSON.stringify(allRowsInGrid1);
									       //alert("total...." +total);
									       for (var k = 0; k < count; k++)
									       {
									          var Total1 = allRowsInGrid1[k].total;//grid total 

									        if(Total1 != undefined)
									        {
									        		Total = +Total + +Total1;
									        		  }
									        	  }
									        	  /*for (var j = 0; j < count; j++)
									        	  {
									        		  var Total2 = allRowsInGrid1[j].taxAmount;
									        		  var Total3 = allRowsInGrid1[j].Total;
									        		  if(Total2 != undefined)
									        		  {
									        			  totAmtWithTax = +totAmtWithTax + +Total2 + +Total3;
									        		  }
									        	  }*/
									        	  document.getElementById("totalWithExpense1").value = +Total.toFixed(2);
//									        	  document.getElementById("totalAmount").value = Total.toFixed(2);//Math.round(Total);
									        	  document.getElementById("grossTotal1").value = Total.toFixed(2);//Math.round(Total);
									        	  var totAmount = Total.toFixed(2);//Math.round(Total);
										        }
									        	  
									      function totalDisC()
										   {
											    //TOTAL DISCOUNT AMOUNT
											       var TotalDisAmt = 0;
											        var TotalsPAmt = 0;
											        var disPer = 0;
											        var count = jQuery("#credit").jqGrid('getGridParam', 'records');
											        var allRowsInGrid1 = $('#credit').getGridParam('data');
											        var AllRows=JSON.stringify(allRowsInGrid1);
											        for (var l = 0; l < count; l++)
											        {
											          var TotalDisAmt1 = allRowsInGrid1[l].DiscountAmount;
											          var TotalsPAmt1 = allRowsInGrid1[l].salePriceEx;
											        		  
											        if(TotalsPAmt1 != undefined)
											        {
											        	TotalsPAmt = (+TotalsPAmt + +TotalsPAmt1).toFixed(2);
											        }
											        if(TotalDisAmt1 != undefined)
											        {
											        	TotalDisAmt = (+TotalDisAmt + +TotalDisAmt1).toFixed(2);
											        	disPer = ((TotalDisAmt/TotalsPAmt)*100).toFixed(2);
											        }						        	 
											        	  }
											        	  /*document.getElementById("discount1").value = disPer;*/
											        	 // document.getElementById("discount").value = TotalDisAmt;
										        	 }
		                    	
		                    	function gridTotalCalculation()
		                    	{
			                    	var Total =0;
			                    	var Total1 = 0;
		                    		var count = jQuery("#credit").jqGrid('getGridParam', 'records');
		        		        	var allRowsInGrid1 = $('#credit').getGridParam('data');
		        		        	var AllRows=JSON.stringify(allRowsInGrid1);
		        		        	for (var k = 0; k < count; k++)
		        		        	{
		        		        		Total1 = allRowsInGrid1[k].total;
		        		        		if(Total1 == undefined)
	        		        			{
		        		        			Total1 = 0;
	        		        			}
		        		        		Total = +Total + +Total1;
		        		        		Total = Math.round(Total * 100) / 100;
		        		        	}
		        		        	document.getElementById("totalWithExpense1").value = Total;
		        		        	document.getElementById("grossTotal1").value = Total;
	        		        	}  
	                    	
			},
			pager: "#jqGridPager1",
			
		});
		
	
		//$("#list4").addRowData(i+1,jsonData[i]);
		if(count==0 || count==null)
		{
			 // $("#list4").addRowData(i,jsonData[i]);
			  $("#credit").addRowData(0,jsonData[i]);
		}
		
		$('#credit').navGrid('#jqGridPager1',
	                
	                { edit: true, add: false, del: true, search: true, refresh: true, view: true, position: "left", cloneToTop: false },
	                
	                {
	                    editCaption: "The Edit Dialog",
	                 
	                    afterSubmit: function () {
							
	                      var grid = $("#credit"),
						  intervalId = setInterval(
						  function()
						  {
					         grid.trigger("reloadGrid",[{current:true}]);
						  },500);
	                         
	                      
						},
						
						 recreateForm: true,
						 checkOnUpdate : true,
						 checkOnSubmit : true,
		                 closeAfterEdit: true, 
		                						
	                    errorTextFormat: function (data)
	                    {
	                        return 'Error: ' + data.responseText
	                    }
	                },
	                
	                {
	                    closeAfterAdd: true,
	                    recreateForm: true,
	                    errorTextFormat: function (data)
	                    {
	                        return 'Error: ' + data.responseText
	                    }
	                },
	                
	                {
	                	closeAfterdel:true,
	                	checkOnUpdate : true,
						checkOnSubmit : true,
						recreateForm: true,
	                	
						afterComplete: function() {
							
							document.getElementById("discount1").value = 0;
			     			document.getElementById("discountAmount1").value = 0;
			     			document.getElementById("hamaliExpence3").value = 0;
			     			document.getElementById("hamaliExpence1").value = 0;
							
	                		$('#credit').trigger( 'reloadGrid' );


	 				       /* 	Calculation of total after editing quantity*/
	 				        	   
	 				        	   // $(this).trigger('reloadGrid');
	 				        	   var rowId =$("#credit").jqGrid('getGridParam','selrow');  
	 		                       var rowData = jQuery("#credit").getRowData(rowId);
	 		                    	//var quantity = rowData['quantity'];
	 		                    	var salePrice = rowData['salePrice'];
	 		                    	
	 		                    	var iGst = rowData['igst'];
	 		                    	var Gst = rowData['gst'];
	 		                    	
	 		                    	//productId = $('#proName1').val();
	 		                    	
	 		                    	/*$("#proName1 option:selected").each(function() {
	 		                    		   selectedVal = $(this).text();
	 		                    		});
	 		                    	*/
	 		                    	//var splitText = selectedVal.split(",");
	 		                    	
	 		                    	var stock = splitText[4];
	 		                    	
	 		                    	if ( Number(quantity) > Number(stock))
	 		                    	{
	 		                    		alert("Available stock = "+stock);
	 		                    		
	 		                    		var tota = 0;
			                    		$("#credit").jqGrid("setCell", rowId, "total", tota);
			                    		//delete if next line if grid didn't work properly 
			                    		$("#credit").jqGrid("setCell", rowId, "quantity", tota);
			                    		
			                    		
			                    		return false;
			                        }
			                    	//if grid not work properly then just dlt else statement
			                    	else
			                    	{
			                    		var tota = quantity * salePrice;
			                    		tota = Math.round(tota * 100) / 100;
			                    		$("#credit").jqGrid("setCell", rowId, "total", tota);
			                    	//}
			                    		
			                    		var Total =0;
			                    		var count = jQuery("#credit").jqGrid('getGridParam', 'records');
			        		        	var allRowsInGrid1 = $('#credit').getGridParam('data');
			        		        	var AllRows=JSON.stringify(allRowsInGrid1);
			        		        	for (var k = 0; k < count; k++) {
			        		        		var Total1 = allRowsInGrid1[k].total;
			        		        		Total = +Total + +Total1;
			        		        		Total = Math.round(Total * 100) / 100;
			        		        	}
			        		        	document.getElementById("totalWithExpense1").value = Total;
			        		        	document.getElementById("grossTotal1").value = Total;
		        		        		//document.getElementById("duptotal").value = Total;
			                    	}
	 		                    		
	 	                    //  }
	 		                    	
	 			                    		var tota = quantity * salePrice;
	 			                    		$("#credit").jqGrid("setCell", rowId, "total", tota);
	 		                    	
	 		                    		
	 		                    		var Total =0;
	 		                    		var count = jQuery("#credit").jqGrid('getGridParam', 'records');
	 		        		        	var allRowsInGrid1 = $('#credit').getGridParam('data');
	 		        		        	var AllRows=JSON.stringify(allRowsInGrid1);
	 		        		        	for (var k = 0; k < count; k++) {
	 		        		        		var Total1 = allRowsInGrid1[k].total;
	 		        		        		Total = +Total + +Total1;
			        		        		Total = Math.round(Total * 100) / 100;
	 		        		        	}
	 		        		        	document.getElementById("totalWithExpense1").value = Total;
	 		        		        	document.getElementById("grossTotal1").value = Total;
	 	        		        		//document.getElementById("duptotal").value = Total;	 		        		        	
						//}	
						},
						reloadAftersubmit:true,	
	                    errorTextFormat: function (data) {
	                        return 'Error: ' + data.responseText
	                    }
	                		
	                });
		 
		 
			   });
			
		})
}


// Chaallan No fetch grid data
function getProductDetailsByProductNameForchallan(){
	

	var params= {};
	
	var barcodeNo = $('#barcodeNo1').val();
	var challanNo = $('#challanNo').val();
	//var challanNoC = $('#challanNoC').val();
	var productIdCredit = $('#productIdCredit').val();
	
	var splitText = productIdCredit.split(" => ");
		
	var proName = splitText[0];
	var barcode = splitText[1];
	var company = splitText[2];
	var quandob = splitText[3];
	var weight = splitText[4];
	var unitnm = splitText[6];
	var subCatId = splitText[5];
	var catId = splitText[7];
	var expiryDate = splitText[9];
	
	params["proName"]= proName;
	params["barcode"]= barcode;
	params["company"]= company;
	params["weight"]= weight;
	params["catId"]= catId;
	params["subCatId"]= subCatId;
	params["expiryDate"]= expiryDate;
	
	params["barcodeNo"]= barcodeNo;	
	params["challanNo"]= challanNo;
	
	document.getElementById('challanNo').value = "";
	
	var count=0;
	var newrow;
	var rowId;
	
	params["methodName"] = "getProductDetails2";
	
	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
			{
		  var jsonData = $.parseJSON(data);
			
	      // $("#credit").jqGrid("clearGridData", true).trigger("reloadGrid");
		
         $.each(jsonData,function(i,v)
			{
	    	 
	    	var gstPercentage = +v.cgst+ +v.sgst;
	    	
	        function sumFmatter (cellvalue, options, rowObject)
	        {
	            
	        	var tax = options.rowData.gstPercentage;
	        	
	        	if(tax == 0){
	        		var tot= (options.rowData.quantity * options.rowData.sp);
	        		if(isNaN(tot)){
	        			tot = 0;
					}
	        	}
	        	if(tax != 0){
	        		
	        		var taxcalculation = (tax/100)* Number(options.rowData.sp);
	        		var newSalePrice = Number(taxcalculation) + Number(options.rowData.sp)
	        		var tot= (Number(options.rowData.quantity) * Number(newSalePrice));
	        		if(isNaN(tot)){
	        			tot = 0;
					}
	        	}
	        	var jam=0;
	        	
	        	
	        	count = jQuery("#credit").jqGrid('getGridParam', 'records');
	        	var allRowsInGrid1 = $('#credit').getGridParam('data');
	        	var AllRows=JSON.stringify(allRowsInGrid1);
	        	for (var i = 0; i < count; i++)
	        	{
	        		var kg = allRowsInGrid1[i].kg;
	        		params["kg"+i] = kg;
	        		
	        		var grams = allRowsInGrid1[i].grams;
	        		params["grams"+i] = grams;
	        		
	            	var quantity = allRowsInGrid1[i].quantity;
	             	params["quantity"+i] = quantity;
	             	
	             	/*var unitName = allRowsInGrid1[i].unitName;
	            	params["unitName"+i] = unitName;*/
	             	
	             	var sp = allRowsInGrid1[i].sp;
	            	params["sp"+i] = sp;                         //sale price
	            	
	            	var cgst = allRowsInGrid1[i].cgst;
	            	params["cgst"+i] = cgst;
	            	
	            	var sgst = allRowsInGrid1[i].sgst;
	            	params["sgst"+i] = sgst;
	            	
	            	var noOfboxes = allRowsInGrid1[i].noOfboxes;
	            	params["noOfboxes"+i] = noOfboxes;
	            	
	            	vatPercentage = +cgst+ +sgst;                //gst value 
	            	
	            	if(vatPercentage == 0){
	            		
	            		var totals1=(sp)*(quantity);
	            		if(isNaN(totals1)){
		             		totals1 = 0;
						}
		            	jam = jam + totals1;
	            	}
	            	
	                if(vatPercentage != 0){
	                	
	                	var taxcal = (vatPercentage/100) * sp;
	                	var newSalePrice = Number(sp) + Number(taxcal);
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
			
			  var prodName,com,packing,unit, expiryDate;
			  for (var j = 0; j < count; j++) 
			  {
				  prodName = rowdata[j].itemName;
				  com = rowdata[j].companyName;
				  packing = rowdata[j].weight;
				  unit = rowdata[j].unitName;
				  expiryDate = rowdata[j].expiryDate;
				
				 var rowId = ids[j];
				 var rowData = jQuery('#credit').jqGrid ('getRowData', rowId);
				
				 
				if (prodName == v.itemName && com == v.companyName && packing == v.weight && unit == v.unitName && expiryDate == v.expiryDate)
				{
//			    	newrow=false;
//					alert("Challan Number Already Inserted !!!");
//					var grid = jQuery("#credit");
//				    grid.trigger("reloadGrid");
//			    	break;
				}
				else
				{
					newrow = true;
				}
			 }
			  
			  if(newrow == true)
				 {
					
				  //$("#list4").addRowData(i,jsonData[i]);
				  $("#credit").addRowData(count,jsonData[i]);
					
				 }
		
		
		$("#credit").jqGrid({
			datatype: "local",
			
			//colNames:['cat_id','sub_cat_id','ItemName','CompanyName',"HSN",'Packing','Unit', 'UnitPrice','MRP','GST','IGST','Quantity','Total'],
			//colNames:['cat_id','sub_cat_id','ItemName','CompanyName', 'Packing',"HSN",'Unit', 'UnitPrice','MRP','GST','IGST', 'Kg/Ltr', 'Gram/Mili', 'Quantity','Total','StockInGrams','StockInMili','TotalQuantity'],
			
			colNames:[	'cat_id',
						'sub_cat_id',
						"Barcode<br>No",
						'unitPkId',
						'taxPkId',
						'productPkId',
						'Product<br>Name',
						'Company<br>Name',
						"HSN",
						"Challan<br>No",
						"Batch<br>No.",
						'MRP',
						"SP<br>Incl<br>Tax",
						'SP<br>Excl<br>Tax',
						'Quantity',
						'Unit',
						'Disc %',
						'Disc<br>Amt',
						'SGST%',
						'CGST%',
						'IGST%',
						'Length',
						'Table<br>Size',
						'Sq/<br>Feet',
						'Total<br>Excl<br>Tax',
						'Pkg',
						'Box',
						'Free<br>Qty',
						"Expiry<br>Date",
						'Total',
						'TotalKgLtrQuantity', 
						'stockPerEntry',
						'PkGoodReceiveId'
					],
					
			colModel:[ 
					     {
					    	 name:'cat_id',
					    	 hidden:true,
					    	 align:'center',
					     },
					     {
					    	 name:'sub_cat_id',
					    	 hidden:true,
					    	 align:'center',
					     },         
					     {	
					    	 name:'barcodeNo',
					    	 width:100,
					    	 align:'center',
				   		 },
				   		 {
					    	 name:'unitPkId',
					    	 hidden:true,
					    	 align:'center',
					     }, 
					     {	
					    	 name:'taxPkId',
					    	 width:100,
					    	 hidden:true,
					    	 align:'center',
				   		 },
				   		 {
					    	 name:'productPkId',
					    	 hidden:true,
					    	 align:'center',
					     },
					     {	
					    	 name:'itemName',
					    	 width:100,
					    	 align:'center',
					     },
    				     {	
					    	 name:'companyName',
					    	 width:100,
					    	 align:'center',
						 },
						 {	
							 name:'hsn',
							 width:80,
							 align:'center',
						 },
						 {	
					    	 name:'chaalanNo',
					    	 width:80,
					    	 align:'center',
				   		 },
						 {	 
							 name:'batchNumber',
							 width:100,
							 hidden:true,
					    	 align:'center',
						 },						   
						 
					     {	 name:'mrp',
							 width:50,
							 editable: false,
							 hidden:true,
							 align:'center',
						 },
					     {	
							 name:'sp',
							 width:100,
							 editable: true,
					    	 align:'center',
						},
						{	
							 name:'salePriceEx',
							 width:100,
							 editable: false,
					    	 align:'center',
						},
						{	
							 name:'quantity',
							 width:90,
							 editable: true,
							 align:'center',
						},
						{	 name:'unitName',
							 width:80,
							 align:'center',
						},
						{	 
							 name:'Discount',
							 width:80,
							 hidden:false,
							 editable:true,
					    	 align:'center',
						},
						{	 
							 name:'DiscountAmount',
							 width:80,
							 hidden:false,
					    	 align:'center',
						},
						{	
							name:'sgst',
							width:80,
							editable: true,
							align:'center',
						},
						{	
							name:'cgst',
							width:80,
							editable: true,
							align:'center',
						},
						{	
							name:'igst',
							width:80,
							align:'center',
							editable:true
						},
						{	 name:'length',
							 width:100,
							 hidden:true,
					    	 align:'center',
					    	 editable:true,
						},
						{	 name:'tableSize',
							 width:100,
							 hidden:true,
					    	 align:'center',
					    	 editable:true,
						},
						{	 name:'sqPerfeet',
							 width:100,
							 hidden:true,
					    	 align:'center',
					    	 editable:false,
						},
						{	 name:'TotalEx',
							 width:100,
							 //editable: true,
					    	 align:'center',
						},
						{	
							 name:'weight',
							 width:70,
							 hidden:true,
							 align:'center',
							 editable:true,
						 },
						 {   name:'noOfboxes',
							 width:100,
							 hidden:true,
							 editable:true,
					    	 align:'center',
						},
						{	
							id:'freeQuantity',
							name:'freeQuantity',
							width:100,
							editable: true,
							align:'center',
							hidden:true,
						},
						
						{				
							id:'expiryDate',
							name:'expiryDate',
							width:140,
							editable: false,
							align:'center',
							hidden:true,
						},						
						{	name:'total',
							width:150,
							align:'center',
							/*formatter: sumFmatter*/
						},		
						{	name:'totalKgLtrPiece',
							width:150,
							hidden:true,
							align:'center',
							//formatter: sumFmatter
						},
						{	name:'stockPerEntry',
							width:150,
							hidden:true,
							align:'center',
							//formatter: sumFmatter
						},
						{	name:'PkGoodreceiveId',
							width:150,
							hidden:true,
							align:'center',
						}
				
			],
				
			
			sortorder : 'desc',
			loadonce: false,
			viewrecords: true,
			width: 1200,
			shrinkToFit:true,
			rowheight: 300,
			hoverrows: true,
	        rownumbers: true,
	        rowNum: 10,
	        'cellEdit':true,
	        autowidth:true,
	        pgbuttons : false,
		    pginput : false,
      	
	        afterSaveCell: function  grossTotal()
			{
				       /* 	Calculation of total after editing quantity*/
				        	   
	        		document.getElementById("discount1").value = 0;
	     			document.getElementById("discountAmount1").value = 0;
	     			document.getElementById("hamaliExpence3").value = 0;
	     			document.getElementById("hamaliExpence1").value = 0;
	        		 
	        		 
				        	   // $(this).trigger('reloadGrid');
				        	   var rowId =$("#credit").jqGrid('getGridParam','selrow');  
		                       var rowData = jQuery("#credit").getRowData(rowId);
		                       var productName = rowData['itemName'];
		                       var quantity = rowData['quantity'];
		                       var freeQuantity = rowData['freeQuantity'];
		                       var salePrice = rowData['sp'];
		                       var mrp = rowData['mrp'];
		                       
		                       var iGst = rowData['igst'];
		                       var cgst = rowData['cgst'];
		                       var sgst = rowData['sgst'];
		                       var gst = +cgst+ +sgst; 
		                       
		                       var unit = rowData['unitName'];
		                       var stockPerEntry = rowData['stockPerEntry'];
		                       var expiryDate = rowData['expiryDate'];
		                       var barcodeNo = rowData['barcodeNo'];
		                       var discountPerc = rowData['Discount'];
		                       var noOfboxes = rowData['noOfboxes'];
		                       var weight = rowData['weight'];
		                       var stockInTotalPieceQuantity = rowData['totalKgLtrPiece'];
		                      
		                       // quantity = ((Number(weight)*Number(noOfboxes)));
	                          // quantity =  +totalQty+ +quantity;
	                         //  $("#credit").jqGrid("setCell", rowId, "quantity", quantity);
	                           if(Number(quantity) > Number(stockInTotalPieceQuantity)){

            					   var msg = productName+" Available Stock For Barcode No : "+barcodeNo+" = "+stockInTotalPieceQuantity+" Pieces";
 		                    	   var dialog = bootbox.dialog({
                					//title: "Embel Technologies Says :",
                				   /* message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',*/
                				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
                				    closeButton: false
 		                    	   });
                				
 		                    	   setTimeout(function()
 		                    		{
                					dialog.modal('hide');
 		                    	   }, 1500);
 		                    	   
 		                    	   var setFq = 0;
 		                    	   $("#credit").jqGrid("setCell", rowId, "freeQuantity", setFq);
 		                    	   $("#credit").jqGrid("setCell", rowId, "quantity", setFq);
		                    	   $("#credit").jqGrid("setCell", rowId, "total", setFq);
		                    	   $("#credit").jqGrid("setCell", rowId, "noOfboxes", setFq);
		                    	   
		                    	  // finalCalculation();					                    		
 		                    	   return false;
	                    	
	                           }
	                           if(noOfboxes == "")
		                       {
	                        	   noOfboxes = "0";
                   					var setZero = 0;
                   					$("#credit").jqGrid("setCell", rowId, "noOfboxes", setZero);
		                       }
		                       if(cgst == "")
		                       {
		                    	    cgst = "0";
                   					var setZero = 0;
                   					$("#credit").jqGrid("setCell", rowId, "cgst", setZero);
		                       }
		                       if(sgst == "")
		                       {
		                    	    sgst = "0";
                   					var setZero = 0;
                   					$("#credit").jqGrid("setCell", rowId, "sgst", setZero);
		                       }
		                       if(iGst == "")
		                       {
		                    	    igst = "0";
                   					var setZero = 0;
                   					$("#credit").jqGrid("setCell", rowId, "igst", setZero);
		                       }
		                       if(quantity == "")
		                       {
		                    	    quantity = "0";
                   					var setZero = 0;
                   					$("#credit").jqGrid("setCell", rowId, "quantity", setZero);
		                       }		                       
		                       if(discountPerc == "")
		                       {
		                    	    discountPerc = "0";
                   					var setZero = 0;
                   					$("#credit").jqGrid("setCell", rowId, "Discount", setZero);
		                       }
		                       
		                       if(salePrice != "")
		                       {
		                    	   var checkprice = /^[0-9]+\.?[0-9]*$/;
		                    	   if(salePrice.match(checkprice))
		                    	   {}
		                    	   else
		                    	   {
		                    		   var msg="Please Enter Valid Sale Price";
	                    				var dialog = bootbox.dialog({
	                    					
	                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
	                    				    closeButton: false
	                    				});
	                    				
	                    				setTimeout(function() {
	                    					dialog.modal('hide');
	                    				}, 1500);
	                    				
                    				   var setZero = 0;
	 		                    	   $("#credit").jqGrid("setCell", rowId, "salePrice", setZero);
			                    		
		 		                    	  gridTotalCalculation();

	                    				return false;
		                    	   }
		                       }
		                       
		                       if(mrp != "")
		                       {
		                    	   var checkprice = /^[0-9]+\.?[0-9]*$/;
		                    	   if(mrp.match(checkprice))
		                    	   {}
		                    	   else
		                    	   {
		                    		   var msg="Please Enter Valid MRP";
	                    				var dialog = bootbox.dialog({
	                    					
	                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
	                    				    closeButton: false
	                    				});
	                    				
	                    				setTimeout(function() {
	                    					dialog.modal('hide');
	                    				}, 1500);
	                    				
	                    			   var setZero = 0;
	 		                    	   $("#credit").jqGrid("setCell", rowId, "mrp", setZero);
			                    		
	 		                    	  gridTotalCalculation();

	                    				return false;
		                    	   }
		                       }
		                       
		                       
		                       
		                       /*if(vatPercentage != "")
		                       {
		                    	   var checkTax = /^[0-9]+$/;
		                    	   if(vatPercentage.match(checkTax))
		                    	   {}
		                    	   else
		                    	   {
		                    		   var msg="Please Enter Valid GST %";
	                    				var dialog = bootbox.dialog({
	                    					//title: "Embel Technologies Says :",
	                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
	                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
	                    				    closeButton: false
	                    				});
	                    				
	                    				setTimeout(function() {
	                    					dialog.modal('hide');
	                    				}, 1500);
	                    				
	                    				// var setZero = 0;
		 		                    	 $("#credit").jqGrid("setCell", rowId, "vatPercentage", gstPercentage);
	                    				
	                    				return false;
		                    	   }
		                       }*/
		                       
		                       if(mrp == "" || mrp == "0")
		                       {}
		                       else
		                       {
			                       if(Number(salePrice) > Number(mrp))
			                       {
			                    	   var msg="MRP must be Greater Than Sale Price";
	                    				var dialog = bootbox.dialog({
	                    					//title: "Embel Technologies Says :",
	                    				   /* message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',*/
	                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
	                    				    closeButton: false
	                    				});
	                    				
	                    				setTimeout(function() {
	                    					dialog.modal('hide');
	                    				}, 1500);
	                    				
	                    				var setZero = 0;
		 		                    	$("#credit").jqGrid("setCell", rowId, "sp", setZero);
		 		                    	   
	                    				return false;
			                       }
		                       }
		                       
		                       var userKgOrLtrInGramsOrMili = Number(quantity) * 1000;
							                			                    	
		                       var salePricePerGram = 0;
		                    	salePricePerGram = (Number)(salePrice/1000);                    	
		                    	
		                    	//KG CALCULATIONS
		                    	if(unit == 'kg')
	                    		{	
	                    	   		var setFq = 0;
	                    			$("#credit").jqGrid("setCell", rowId, "freeQuantity", setFq);
		                    		
	                    			var rowId =$("#credit").jqGrid('getGridParam','selrow');
	                    			var rowData = jQuery("#credit").getRowData(rowId);
	                    			var stockInKg = rowData['totalKgLtrPiece'];
	                    			var stockInGrams;
	                    			if(Number(stockInKg) > 1)
	                    			{
		                    			stockInGrams = stockInKg * 1000;
	                    			}
	                    			else
	                    			{
	                    				stockInGrams = stockInKg;
	                    			}
	                    			
	                    		if(quantity != '')
	                    		{
	                    			var checkKiloLtr = /^[0-9]+\.?[0-9]{0,3}$/;
	                    			if(quantity.match(checkKiloLtr))
	                    			{
	                    				if(quantity == 0)
	                    				{
	                    					quantity = 0;
		                    				
		                    				var msg="Please Enter Valid kg Value";
		                    				var dialog = bootbox.dialog({
		                    					
		                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		                    				    closeButton: false
		                    				});
		                    				
		                    				setTimeout(function() {
		                    					dialog.modal('hide');
		                    				}, 1500);
		                    				
/*		                    				var setZero = 0;
				                    		$("#credit").jqGrid("setCell", rowId, "quantity", setZero);*/
				                    		
			 		                    	  gridTotalCalculation();
				                    		
				                    		return false;
	                    				}
	                    			}
	                    			else
	                    			{
	                    				quantity = 0;
	                    				
	                    				var msg="Please Enter Valid kg Value";
	                    				var dialog = bootbox.dialog({
	                    					//title: "Embel Technologies Says :",
	                    				   /* message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',*/
	                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
	                    				    closeButton: false
	                    				});
	                    				
	                    				setTimeout(function() {
	                    					dialog.modal('hide');
	                    				}, 1500);
	                    				
	                    				var setZero = 0;
			                    		$("#credit").jqGrid("setCell", rowId, "quantity", setZero);
			                    		$("#credit").jqGrid("setCell", rowId, "total", setZero);
			                    		
		 		                    	  gridTotalCalculation();
			                    		return false;
	                    			}
	                    		}
	                    		
	                    		if(expiryDate == 'N/A')
                    			{		                    			
	                    			if(Number(userKgOrLtrInGramsOrMili) > Number(stockInGrams))
			                    	{
		                    			if(Number(stockInGrams) >1000)
		                    				{
		                    					var convertedStockInKg = Number(stockInGrams)/1000;
		                    					//alert(productName+" Available stock = "+convertedStockInKg+" Kg");
		                    					
		                    					 var msg = productName+" Available stock = "+convertedStockInKg+" Kg";
				 		                    	   var dialog = bootbox.dialog({
			                    					//title: "Embel Technologies Says :",
			                    				   /* message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',*/
			                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
			                    				    closeButton: false
				 		                    	   });
			                    				
				 		                    	   setTimeout(function() {
			                    					dialog.modal('hide');
				 		                    	   }, 1500);
				 		                   	}
		                    				else
		                    				{
		                    					//alert(productName+" Available stock = "+stockInGrams+" Grams");
		                    					 var msg = productName+" Available stock = "+stockInGrams+" Grams";
				 		                    	   var dialog = bootbox.dialog({
			                    					//title: "Embel Technologies Says :",
			                    				   /* message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',*/
			                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
			                    				    closeButton: false
				 		                    	   });
			                    				
				 		                    	   setTimeout(function() {
			                    					dialog.modal('hide');
				 		                    	   }, 1500);
		                    				}
		                    			
		                    			var setZero = 0;
			                    		$("#credit").jqGrid("setCell", rowId, "total", setZero);
			                    		$("#credit").jqGrid("setCell", rowId, "quantity", setZero);
			                    					                    		
		 		                    	gridTotalCalculation();
		 		                    	return false;
		                    			
			                    	}
                    			}
	                    		else if(expiryDate !='N/A')
	                    			{
	                    				var stockperEntryInKg = rowData['stockPerEntry'];
		                    			var stockperEntryInGrams;
		                    			if(Number(stockperEntryInKg) > 1)
		                    			{
		                    				stockperEntryInGrams = stockperEntryInKg * 1000;
		                    			}
		                    			else
		                    			{
		                    				stockperEntryInGrams = stockperEntryInKg;
		                    			}
	                    				
	                    			
	                    				if(Number(userKgOrLtrInGramsOrMili) > Number(stockperEntryInGrams))
				                    	{
			                    			if(Number(stockInGrams) >1000)
			                    				{
			                    					var convertedStockInKg = Number(stockperEntryInKg)/1000;
			                    					//alert(productName+" Available stock = "+convertedStockInKg+" Kg");
			                    					
			                    					 var msg = productName+" Available stock = "+stockperEntryInKg+" Kg";
					 		                    	   var dialog = bootbox.dialog({
				                    					//title: "Embel Technologies Says :",
				                    				   /* message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',*/
				                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
				                    				    closeButton: false
					 		                    	   });
				                    				
					 		                    	   setTimeout(function() {
				                    					dialog.modal('hide');
					 		                    	   }, 1500);
					 		                   	}
			                    				else
			                    				{
			                    					//alert(productName+" Available stock = "+stockInGrams+" Grams");
			                    					 var msg = productName+" Available stock = "+stockperEntryInGrams+" Grams";
					 		                    	   var dialog = bootbox.dialog({
				                    					//title: "Embel Technologies Says :",
				                    				   /* message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',*/
				                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
				                    				    closeButton: false
					 		                    	   });
				                    				
					 		                    	   setTimeout(function() {
				                    					dialog.modal('hide');
					 		                    	   }, 1500);
			                    				}
			                    			
			                    			var setZero = 0;
				                    		$("#credit").jqGrid("setCell", rowId, "total", setZero);
				                    		$("#credit").jqGrid("setCell", rowId, "quantity", setZero);
				                    					                    		
			 		                    	gridTotalCalculation();
			 		                    	return false;
			                    	}
	                    			
	                    		}
		                    			KgGramsLtrMiliCalculation();
		                    		
	                    		}
	                    		
		                    	//LTR CALCULATIONS
		                    	if(unit == 'ltr')
	                    		{
		                    		var setFq = 0;
	                    			$("#credit").jqGrid("setCell", rowId, "freeQuantity", setFq);
		                    		
		                    		var rowId =$("#credit").jqGrid('getGridParam','selrow');
	                    			var rowData = jQuery("#credit").getRowData(rowId);
	                    			var stockInLtr = rowData['totalKgLtrPiece'];
	                    			var stockInMili = stockInLtr * 1000;
	                    			
	                    			if(quantity != '')
		                    		{	
	                    			var checkKiloLtr = /^[0-9]+\.?[0-9]{0,3}$/;
	                    			if(quantity.match(checkKiloLtr))
	                    			{
	                    				if(quantity == 0)
	                    				{
	                    					quantity = 0;
		                    				
		                    				var msg="Please Enter Valid kg Value";
		                    				var dialog = bootbox.dialog({
		                    					//title: "Embel Technologies Says :",
		                    				   /* message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',*/
		                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		                    				    closeButton: false
		                    				});
		                    				
		                    				setTimeout(function() {
		                    					dialog.modal('hide');
		                    				}, 1500);
		                    				
		                    				var setZero = 0;
				                    		$("#credit").jqGrid("setCell", rowId, "quantity", setZero);
				                    		
			 		                    	gridTotalCalculation();		
				                    		return false;	                    				
	                    				}
	                    			}
	                    			else
	                    			{
	                    				quantity = 0;
	                    				
	                    				   var msg = "Please Enter Valid ltr Value";
		 		                    	   var dialog = bootbox.dialog({
	                    					//title: "Embel Technologies Says :",
	                    				   /* message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',*/
	                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
	                    				    closeButton: false
		 		                    	   });
	                    				
		 		                    	   setTimeout(function() {
	                    					dialog.modal('hide');
		 		                    	   }, 1500);
		 		                    	   
	                    				var setZero = 0;
			                    		$("#credit").jqGrid("setCell", rowId, "quantity", setZero);
			                    		KgGramsLtrMiliCalculation();
	                    				return false;
	                    			}
	                    		}
	                    			if(expiryDate =='N/A')
	                    			{	                    			
			                    		if(Number(userKgOrLtrInGramsOrMili) > Number(stockInMili))
				                    	{
			                    			if(Number(stockInMili) >1000)
			                    				{
			                    					var convertedStockInLtr = Number(stockInMili)/1000;
			                    					
			                    					 var msg = productName+" Available stock = "+convertedStockInLtr+" Ltr";
					 		                    	   var dialog = bootbox.dialog({
				                    					//title: "Embel Technologies Says :",
				                    				   /* message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',*/
				                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
				                    				    closeButton: false
					 		                    	   });
				                    				
					 		                    	   setTimeout(function() {
				                    					dialog.modal('hide');
					 		                    	   }, 1500);		                    					
			                    				}
			                    				else
			                    				{		                    					
			                    					 var msg = productName+" Available stock = "+stockInMili+" mili";
					 		                    	   var dialog = bootbox.dialog({
				                    					
				                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
				                    				    closeButton: false
					 		                    	   });
				                    				
					 		                    	   setTimeout(function() {
				                    					dialog.modal('hide');
					 		                    	   }, 1500);
			                    				}
			                    			
			                    			var setZero = 0;
				                    		$("#credit").jqGrid("setCell", rowId, "total", setZero);
				                    		$("#credit").jqGrid("setCell", rowId, "quantity", setZero);
				                    		
				                    		gridTotalCalculation();			        		        	
				        		        	return false;
			                    	}
	                    		}
	                    		else if(expiryDate !='N/A')
	                    		{	
	                    			var stockperEntryInLtr = rowData['stockPerEntry'];
	                    			var stockperEntryInMili;
	                    			if(Number(stockperEntryInLtr) > 1)
	                    			{
	                    				stockperEntryInMili = stockperEntryInLtr * 1000;
	                    			}
	                    			else
	                    			{
	                    				stockperEntryInMili = stockperEntryInLtr;
	                    			}	                    			
	                    		
	                    			if(Number(userKgOrLtrInGramsOrMili) > Number(stockperEntryInMili))
			                    	{
		                    			if(Number(stockInMili) >1000)
		                    				{
		                    					var convertedStockInLtr = Number(stockperEntryInMili)/1000;
		                    					
		                    					 var msg = productName+" Available stock = "+convertedStockInLtr+" Ltr";
				 		                    	   var dialog = bootbox.dialog({
			                    				
			                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
			                    				    closeButton: false
				 		                    	   });
			                    				
				 		                    	   setTimeout(function() {
			                    					dialog.modal('hide');
				 		                    	   }, 1500);		                    					
		                    				}
		                    				else
		                    				{		                    					
		                    					 var msg = productName+" Available stock = "+stockperEntryInMili+" mili";
				 		                    	   var dialog = bootbox.dialog({
			                    					
			                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
			                    				    closeButton: false
				 		                    	   });
			                    				
				 		                    	   setTimeout(function() {
			                    					dialog.modal('hide');
				 		                    	   }, 1500);
		                    				}
		                    			
		                    			var setZero = 0;
			                    		$("#credit").jqGrid("setCell", rowId, "total", setZero);
			                    		$("#credit").jqGrid("setCell", rowId, "quantity", setZero);
			                    		
			                    		gridTotalCalculation();			        		        	
			        		        	return false;
			                    	}
	                    		}
		                    		
		                    		KgGramsLtrMiliCalculation();
	                    		}
		                    	
		                    	function KgGramsLtrMiliCalculation()
		                    	{
		                    		if((Number(quantity) > 0 || Number(quantity) != '' || quantity != '0'))
		                    		{
			                    		var salePriceKgTota = 0;
			                    		salePriceKgTota = userKgOrLtrInGramsOrMili*salePricePerGram;
			                    		salePriceKgTota = Math.round(salePriceKgTota * 100) / 100;			                    		
	                    				$("#credit").jqGrid("setCell", rowId, "total", salePriceKgTota);
	                    			}
			                    	
			                    	else if(Number(quantity) == 0  || Number(quantity)== '')
			                    	{		
	                    				var setZero = 0;
			                    		$("#credit").jqGrid("setCell", rowId, "total", setZero);
			                    		
		 		                    	gridTotalCalculation();
	 		                    	   
	 		                    	   return false;
			                    	}
		                    	}
		                    	
		                    	if(unit == 'pcs')
				                {
			                    		if(freeQuantity == "" || freeQuantity == "0")
			                    		{
			                    			freeQuantity = 0;
			                    			var setZero = 0;
	                                 		$("#credit").jqGrid("setCell", rowId, "freeQuantity", setZero);
	                                 		quantity = Number(quantity) + Number(freeQuantity);
			                    		}
				                    	else if(freeQuantity != '' || freeQuantity != "0")
			                    		{
											var checkFreeQuantity = /^[0-9]+$/;
								    		if(freeQuantity.match(checkFreeQuantity))
								    		{
								    			quantity = Number(quantity) + Number(freeQuantity);
								    		}
								    		else
								    		{
							    				 var msg="Please Enter Valid Free Quantity";
				 		                    	   var dialog = bootbox.dialog({
			                    					
			                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
			                    				    closeButton: false
			                    				});
				 		                    	  setTimeout(function() {
				                    					dialog.modal('hide');
				                    				}, 1500);
			                    				 
			                    				 quantity = 0;
			                    				 var setZero = 0;
		                                   		 $("#credit").jqGrid("setCell", rowId, "quantity", setZero);
		 			                    		 $("#credit").jqGrid("setCell", rowId, "total", setZero);
		                                   		 $("#credit").jqGrid("setCell", rowId, "freeQuantity", setZero);
		 			                    		 
		                                   		finalCalculation();
		                                   		 	
			                    				return false;			                    			
								    		}
			                    		}
			                    		
			                    		var rowId =$("#credit").jqGrid('getGridParam','selrow');
		                    			var rowData = jQuery("#credit").getRowData(rowId);
		                    			var stockInTotalPieceQuantity = rowData['totalKgLtrPiece'];	                    			
		                    			
		                    			if(quantity != '')
			                    		{
			                    			 var checkQuantity = /^[0-9]+$/;
			                    			 if(String(quantity).match(checkQuantity))
			                    			 {}
			                    			 else
			                    			 {
			                    				 var msg = productName+"Please Enter Valid Quantity";
				 		                    	   var dialog = bootbox.dialog({
			                    					
			                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
			                    				    closeButton: false
				 		                    	   });
			                    				
				 		                    	   setTimeout(function() {
			                    					dialog.modal('hide');
				 		                    	   }, 1500);
				 		                    	   
			                    				 quantity = 0;
			                    				 var setZero = 0;
		                                  		 $("#credit").jqGrid("setCell", rowId, "quantity", setZero);
		                                  		 $("#credit").jqGrid("setCell", rowId, "total", setZero);
		                                  		 $("#credit").jqGrid("setCell", rowId, "freeQuantity", setZero);
		                                  		 
				 		                    	  gridTotalCalculation();                                  		 
			                    				 return false;
			                    			 } 
			                    		}
		                    			
		                    			if(expiryDate =='N/A')
			                    		{		
		                    				if (Number(quantity) > Number(stockInTotalPieceQuantity))
					                    	{					                    		
					                    		var msg = productName+" Available Stock For Barcode No : "+barcodeNo+" = "+stockInTotalPieceQuantity+" Pieces";
				 		                    	   var dialog = bootbox.dialog({
			                    					
			                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
			                    				    closeButton: false
				 		                    	   });
			                    				
				 		                    	   setTimeout(function()
				 		                    		{
			                    					dialog.modal('hide');
				 		                    	   }, 1500);
				 		                    	   
				 		                    	   var setFq = 0;
				 		                    	   $("#credit").jqGrid("setCell", rowId, "freeQuantity", setFq);
				 		                    	   $("#credit").jqGrid("setCell", rowId, "quantity", setFq);
				 		                    	   $("#credit").jqGrid("setCell", rowId, "total", setFq);
					                    		
				 		                    	  gridTotalCalculation();
				 		                    	  return false;
					                    	}
			                    		}
		                    			if(expiryDate !='N/A')
			                    		{		
		                    				if ( Number(quantity) > Number(stockPerEntry))
					                    	{				                    		
					                    		var msg = productName+" Available stock = "+stockPerEntry+" Pieces";
				 		                    	   var dialog = bootbox.dialog({
			                    					
			                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
			                    				    closeButton: false
				 		                    	   });
			                    				
				 		                    	   setTimeout(function() {
			                    					dialog.modal('hide');
				 		                    	   }, 1500);
				 		                    	   
				 		                    	   var zeroQuantity = 0;
				 		                    	   $("#credit").jqGrid("setCell", rowId, "freeQuantity", zeroQuantity);
				 		                    	   $("#credit").jqGrid("setCell", rowId, "quantity", zeroQuantity);
				 		                    	   $("#credit").jqGrid("setCell", rowId, "total", zeroQuantity);
					                    		
				 		                    	  gridTotalCalculation();
				 		                    	  return false;
					                    	}
		                    			}
				                    	
			                    	/*if (iGst != 0 || iGst != undefined)
			                    	{
		                    			var taxPercentage = iGst;
			                    		var taxAmount = ((taxPercentage/100)*salePrice);
			                    		var BuyPriceWithTaxAmount = Number(taxAmount) + Number(salePrice);
			                    		var tota = Number(quantity - freeQuantity) * salePrice;
			                    		tota = Math.round(tota * 100) / 100;
			                    		$("#credit").jqGrid("setCell", rowId, "total", tota);
				                    }
			                    	else if(iGst == 0 || iGst == undefined)
			                    	{
			                    		Gst = 0;
			                    		var  taxPercentage = Number(Gst);
			                    		var taxAmount = ((taxPercentage/100)*salePrice);
			                    		var BuyPriceWithTaxAmount = Number(taxAmount) + Number(salePrice);
			                    		var tota = Number(quantity - freeQuantity) * salePrice;
			                    		tota = Math.round(tota * 100) / 100;
			                    		$("#credit").jqGrid("setCell", rowId, "total", tota);
			                    	}*/
				                }
			                    		                    	
		                    	gridTotalCalculation();
		                    	
		                    	
		                    	
		                    	//var quantity = rowData['quantity'];
                                var DiscountAmount= rowData['DiscountAmount'];
								var Discount= rowData['Discount'];
								var TotalEx= rowData['TotalEx'];
								var salePriceEx= rowData['salePriceEx'];
								var iGst = rowData['igst'];
								
								/*/////calculation of gst////*/														
								var checkDiscount = /^[0-9]+\.?[0-9]*$/;
								  if(Discount.match(checkDiscount))
								  {
									  if(Number(Discount) >= 100)
							  	  {
							  		  var setZero = 0;
							  		  //alert("In discount")
							  		  myAlert("Discount Percentage Must Be Less Than 100");
							  	      $("#credit").jqGrid("setCell", rowId, "DiscountAmount", setZero);
							      	  totalCalC();
							      	  totalDisC();
							  		  return false;
							  	  }
								  }
								  else
								  {
									  var setZero = 0;
									   if(Discount== "")
									   {
							  		 $("#credit").jqGrid("setCell", rowId, "DiscountAmount", setZero);
							      	  }
									  else
									  {
							  		  myAlert("Pleaee Enter Valid Discount value");
							  		  $("#credit").jqGrid("setCell", rowId, "DiscountAmount", setZero);
							      	  totalCalC();
							      	  totalDisC();
							      	  return false;
									  }
								  }			
								  
								//sale price excluding tax calc//
								  var checksalePrice= /^[0-9]+\.?[0-9]*$/;
								  if(salePrice.match(checksalePrice))
							    {
							      	  if(Number(salePrice) > 0)
							  		  {
							      		 
							      		  spwTax = (salePrice/(1+(gst/100)+(iGst/100)));
							      		  $("#credit").jqGrid("setCell", rowId, "salePriceEx",  spwTax.toFixed(2));
							      	  
							      	
							      		 if(Number(gst) > 0)
							      		 {  							      			 
							      		      DiscountAmount= (spwTax*(Discount/100));
							      			  finalsp = (spwTax- DiscountAmount) * quantity;
							      			  newTaxAmt = (((finalsp*quantity)*gst)/100);
							      			  
							      			  var oneProTax = (((finalsp)*gst)/100);
							      			  newFinalsp = finalsp+ oneProTax;
							      			  tota = newFinalsp;
							      			  DiscountAmount = DiscountAmount * quantity;
							      									      		
									    $("#credit").jqGrid("setCell", rowId, "TotalEx", finalsp.toFixed(2));
									    $("#credit").jqGrid("setCell", rowId, "DiscountAmount", DiscountAmount.toFixed(2));	
									    $("#credit").jqGrid("setCell", rowId, "total", tota.toFixed(2));
									 
									     totalCalC();
									     totalDisC();	
							      		}
							      		 
							      	else if(Number(iGst) > 0)
							      	{  							      			 
						      		      DiscountAmount= (spwTax*(Discount/100));
						      			  finalsp = (spwTax- DiscountAmount) * quantity;
						      			  newTaxAmt = (((finalsp*quantity)*iGst)/100);
						      			  
						      			  var oneProTax = (((finalsp)*iGst)/100);
						      			  newFinalsp = finalsp+ oneProTax;
						      			  tota = newFinalsp;
						      			  DiscountAmount = DiscountAmount * quantity;
						      									      		
								    $("#credit").jqGrid("setCell", rowId, "TotalEx", finalsp.toFixed(2));
								    $("#credit").jqGrid("setCell", rowId, "DiscountAmount", DiscountAmount.toFixed(2));	
								    $("#credit").jqGrid("setCell", rowId, "total", tota.toFixed(2));
								 
								     totalCalC();
								     totalDisC();	
						      		}
							      		 
							      	else if(Number(gst) == 0 && Number(iGst) == 0)
							      	{  							      			 
						      		      DiscountAmount= (spwTax*(Discount/100));
						      			  finalsp = (spwTax- DiscountAmount) * quantity;
						      			  newTaxAmt = (((finalsp*quantity)*iGst)/100);
						      			  
						      			  var oneProTax = (((finalsp)*iGst)/100);
						      			  newFinalsp = finalsp+ oneProTax;
						      			  tota = newFinalsp;
						      			  DiscountAmount = DiscountAmount * quantity;
						      									      		
								    $("#credit").jqGrid("setCell", rowId, "TotalEx", finalsp.toFixed(2));
								    $("#credit").jqGrid("setCell", rowId, "DiscountAmount", DiscountAmount.toFixed(2));	
								    $("#credit").jqGrid("setCell", rowId, "total", tota.toFixed(2));
								 
								     totalCalC();
								     totalDisC();	
						      		}			
							     else
							        {
								     var setZero = 0; 
									  $("#credit").jqGrid("setCell", rowId, "DiscountAmount", setZero);
								   /* $("#list4").jqGrid("setCell", rowId, "Total", tota.toFixed(2));*/
								  /*  $("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero);*/
							    }
					        }
						    else
					           {
							  	var setZero = 0;
							  /*$("#list4").jqGrid("setCell", rowId, "sPWithoutTax", setZero);*/
							    $("#credit").jqGrid("setCell", rowId, "DiscountAmount", setZero);
							    $("#credit").jqGrid("setCell", rowId, "total", setZero);
							 /* $("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero);*/
							    return false;
								}
							    }				        	  
						else
							{
								var setZero = 0;
								alert("Pleae Enter Valid Buy Price");
								$("#credit").jqGrid("setCell", rowId, "salePrice", setZero);
								$("#credit").jqGrid("setCell", rowId, "salePriceEx", setZero);
							  	$("#credit").jqGrid("setCell", rowId, "DiscountAmount", setZero);
							  	$("#credit").jqGrid("setCell", rowId, "total", setZero);
							 /*  $("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero);*/
									  return false;
								 }
								
								/*if(Gst!=0)
								{
								var taxpercentage = Gst;
								var salepriceEx=saleprice(1+(taxpercentage/100)));
								
								
							$("#jqGrid").jqGrid("setCell",rowId,"salepriceEx",salepriceEx);
							
							return false;
				                         }
								*/
								  //out of grid calc//
								
									function totalCalC()
									{	
									       var Total = 0;
									       var totAmtWithTax = 0;
									       var count = jQuery("#credit").jqGrid('getGridParam', 'records');
									       var allRowsInGrid1 = $('#credit').getGridParam('data');
									        var AllRows=JSON.stringify(allRowsInGrid1);
									       //alert("total...." +total);
									       for (var k = 0; k < count; k++)
									       {
									          var Total1 = allRowsInGrid1[k].total;//grid total 

									        if(Total1 != undefined)
									        {
									        		Total = +Total + +Total1;
									        		  }
									        	  }
									        	  /*for (var j = 0; j < count; j++)
									        	  {
									        		  var Total2 = allRowsInGrid1[j].taxAmount;
									        		  var Total3 = allRowsInGrid1[j].Total;
									        		  if(Total2 != undefined)
									        		  {
									        			  totAmtWithTax = +totAmtWithTax + +Total2 + +Total3;
									        		  }
									        	  }*/
									        	  document.getElementById("totalWithExpense1").value = +Total.toFixed(2);
//									        	  document.getElementById("totalAmount").value = Total.toFixed(2);//Math.round(Total);
									        	  document.getElementById("grossTotal1").value = Total.toFixed(2);//Math.round(Total);
									        	  var totAmount = Total.toFixed(2);//Math.round(Total);
										        }
									        	  
									      function totalDisC()
										   {
											    //TOTAL DISCOUNT AMOUNT
											       var TotalDisAmt = 0;
											        var TotalsPAmt = 0;
											        var disPer = 0;
											        var count = jQuery("#credit").jqGrid('getGridParam', 'records');
											        var allRowsInGrid1 = $('#credit').getGridParam('data');
											        var AllRows=JSON.stringify(allRowsInGrid1);
											        for (var l = 0; l < count; l++)
											        {
											          var TotalDisAmt1 = allRowsInGrid1[l].DiscountAmount;
											          var TotalsPAmt1 = allRowsInGrid1[l].salePriceEx;
											        		  
											        if(TotalsPAmt1 != undefined)
											        {
											        	TotalsPAmt = (+TotalsPAmt + +TotalsPAmt1).toFixed(2);
											        }
											        if(TotalDisAmt1 != undefined)
											        {
											        	TotalDisAmt = (+TotalDisAmt + +TotalDisAmt1).toFixed(2);
											        	disPer = ((TotalDisAmt/TotalsPAmt)*100).toFixed(2);
											        }						        	 
											        	  }
											        	  /*document.getElementById("discount1").value = disPer;*/
											        	 // document.getElementById("discount").value = TotalDisAmt;
										        	 }
		                    	
		                    	function gridTotalCalculation()
		                    	{
			                    	var Total =0;
			                    	var Total1 = 0;
		                    		var count = jQuery("#credit").jqGrid('getGridParam', 'records');
		        		        	var allRowsInGrid1 = $('#credit').getGridParam('data');
		        		        	var AllRows=JSON.stringify(allRowsInGrid1);
		        		        	for (var k = 0; k < count; k++)
		        		        	{
		        		        		Total1 = allRowsInGrid1[k].total;
		        		        		if(Total1 == undefined)
	        		        			{
		        		        			Total1 = 0;
	        		        			}
		        		        		Total = +Total + +Total1;
		        		        		Total = Math.round(Total * 100) / 100;
		        		        	}
		        		        	document.getElementById("totalWithExpense1").value = Total;
		        		        	document.getElementById("grossTotal1").value = Total;
	        		        	}  
	                    	
			},
			pager: "#jqGridPager1",
			
		});
		
	
		//$("#list4").addRowData(i+1,jsonData[i]);
		if(count==0 || count==null)
		{
			 // $("#list4").addRowData(i,jsonData[i]);
			  $("#credit").addRowData(0,jsonData[i]);
		}
		

 
		 $('#credit').navGrid('#jqGridPager1',
	                
	                { edit: true, add: false, del: true, search: true, refresh: true, view: true, position: "left", cloneToTop: false },
	                
	                {
	                    editCaption: "The Edit Dialog",
	                 
	                    afterSubmit: function () {
							
	                      var grid = $("#credit"),
						  intervalId = setInterval(
						  function()
						  {
					         grid.trigger("reloadGrid",[{current:true}]);
						  },500);
	                         
	                      
						},
						
						 recreateForm: true,
						 checkOnUpdate : true,
						 checkOnSubmit : true,
		                 closeAfterEdit: true, 
		                						
	                    errorTextFormat: function (data)
	                    {
	                        return 'Error: ' + data.responseText
	                    }
	                },
	                
	                {
	                    closeAfterAdd: true,
	                    recreateForm: true,
	                    errorTextFormat: function (data)
	                    {
	                        return 'Error: ' + data.responseText
	                    }
	                },
	                
	                {
	                	closeAfterdel:true,
	                	checkOnUpdate : true,
						checkOnSubmit : true,
						recreateForm: true,
	                	
						afterComplete: function() {
							
							document.getElementById("discount1").value = 0;
			     			document.getElementById("discountAmount1").value = 0;
			     			document.getElementById("hamaliExpence3").value = 0;
			     			document.getElementById("hamaliExpence1").value = 0;
							
	                		$('#credit').trigger( 'reloadGrid' );


	 				       /* 	Calculation of total after editing quantity*/
	 				        	   
	 				        	   // $(this).trigger('reloadGrid');
	 				        	   var rowId =$("#credit").jqGrid('getGridParam','selrow');  
	 		                       var rowData = jQuery("#credit").getRowData(rowId);
	 		                    	//var quantity = rowData['quantity'];
	 		                    	var salePrice = rowData['salePrice'];
	 		                    	
	 		                    	var iGst = rowData['igst'];
	 		                    	var Gst = rowData['gst'];
	 		                    	
	 		                    	//productId = $('#proName1').val();
	 		                    	
	 		                    	/*$("#proName1 option:selected").each(function() {
	 		                    		   selectedVal = $(this).text();
	 		                    		});
	 		                    	*/
	 		                    	//var splitText = selectedVal.split(",");
	 		                    	
	 		                    	var stock = splitText[4];
	 		                    	
	 		                    	if ( Number(quantity) > Number(stock))
	 		                    	{
	 		                    		alert("Available stock = "+stock);
	 		                    		
	 		                    		var tota = 0;
			                    		$("#credit").jqGrid("setCell", rowId, "total", tota);
			                    		//delete if next line if grid didn't work properly 
			                    		$("#credit").jqGrid("setCell", rowId, "quantity", tota);
			                    		
			                    		
			                    		return false;
			                        }
			                    	//if grid not work properly then just dlt else statement
			                    	else
			                    	{
			                    		var tota = quantity * salePrice;
			                    		tota = Math.round(tota * 100) / 100;
			                    		$("#credit").jqGrid("setCell", rowId, "total", tota);
			                    	//}
			                    		
			                    		var Total =0;
			                    		var count = jQuery("#credit").jqGrid('getGridParam', 'records');
			        		        	var allRowsInGrid1 = $('#credit').getGridParam('data');
			        		        	var AllRows=JSON.stringify(allRowsInGrid1);
			        		        	for (var k = 0; k < count; k++) {
			        		        		var Total1 = allRowsInGrid1[k].total;
			        		        		Total = +Total + +Total1;
			        		        		Total = Math.round(Total * 100) / 100;
			        		        	}
			        		        	document.getElementById("totalWithExpense1").value = Total;
			        		        	document.getElementById("grossTotal1").value = Total;
		        		        		//document.getElementById("duptotal").value = Total;
			                    	}
	 		                    		
	 		                    	
	 	                    	      //  }
	 		                    	
	 			                    		var tota = quantity * salePrice;
	 			                    		$("#credit").jqGrid("setCell", rowId, "total", tota);
	 		                    	
	 		                    		
	 		                    		var Total =0;
	 		                    		var count = jQuery("#credit").jqGrid('getGridParam', 'records');
	 		        		        	var allRowsInGrid1 = $('#credit').getGridParam('data');
	 		        		        	var AllRows=JSON.stringify(allRowsInGrid1);
	 		        		        	for (var k = 0; k < count; k++) {
	 		        		        		var Total1 = allRowsInGrid1[k].total;
	 		        		        		Total = +Total + +Total1;
			        		        		Total = Math.round(Total * 100) / 100;
	 		        		        	}
	 		        		        	document.getElementById("totalWithExpense1").value = Total;
	 		        		        	document.getElementById("grossTotal1").value = Total;
	 	        		        		//document.getElementById("duptotal").value = Total;	 		        		        	
						//}	
						},
						reloadAftersubmit:true,	
	                    errorTextFormat: function (data) {
	                        return 'Error: ' + data.responseText
	                    }
	                		
	                });
		 
		 
			   });
			
			
			
		
			
		})
	

}


// Get Details By Barcode No
/*function getProductDetailsByBarcodeNo()
{	
	var params= {};
	
	var barcodeNo = $('#barcodeNo').val();


	params["barcodeNo"]= barcodeNo;
	document.getElementById('barcodeNo').value = null;
	var count=0;
	var newrow;
	var rowId;
	
	params["methodName"] = "getProductDetailsByBarcode";
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
	        	if(tax != 0)
	        	{	        		
	        		var taxcalculation = (tax/100)* Number(options.rowData.salePrice);
	        		var newSalePrice = Number(taxcalculation) + Number(options.rowData.salePrice)
	        		var tot= (Number(options.rowData.quantity) * Number(newSalePrice));
	        		if(isNaN(tot))
	        		{
	        			tot = 0;
					}
	        	}
	        	var jam=0;
	        	
	        	
	        	count = jQuery("#list4").jqGrid('getGridParam', 'records');
	        	var allRowsInGrid1 = $('#list4').getGridParam('data');
	        	var AllRows=JSON.stringify(allRowsInGrid1);
	        	for (var i = 0; i < count; i++)
	        	{	        		
	        		var kg = allRowsInGrid1[i].kg;
	        		params["kg"+i] = kg;
	        		
	        		var grams = allRowsInGrid1[i].grams;
	        		params["grams"+i] = grams;
	        		
	        		var defQuantity = 1;	        		
	            	var quantity = allRowsInGrid1[i].quantity;
	             	params["quantity"+i] = quantity;
	             	
	             	var salePrice = allRowsInGrid1[i].salePrice;
	            	params["salePrice"+i] = salePrice;
	            	
	            	var vatPercentage = allRowsInGrid1[i].vatPercentage;
	            	params["vatPercentage"+i] = vatPercentage;
	            		            	
	            	var stockInGrams = allRowsInGrid1[i].stockInGrams;
	            	params["stockInGrams"+i] = stockInGrams;
	            	
	   	    	 	var stockInMili = allRowsInGrid1[i].stockInMili;
	            	params["stockInMili"+i] = stockInMili;
	            	
	   	    	 	var totalPieceQuantity = allRowsInGrid1[i].totalPieceQuantity;
	            	params["totalPieceQuantity"+i] = totalPieceQuantity;
	            	
	            	if(vatPercentage == 0){
	            		
	            		var totals1=(salePrice)*(quantity);
	            		if(isNaN(totals1)){
		             		totals1 = 0;
						}
		            	jam = jam + totals1;
	            	}
	            	
	                if(vatPercentage != 0){
	                	
	                	var taxcal = (vatPercentage/100) * salePrice;
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
	        
	         count = jQuery("#list4").jqGrid('getGridParam', 'records'); 
		     var rowdata =$("#list4").jqGrid('getGridParam','data');
		     var ids = jQuery("#list4").jqGrid('getDataIDs');
			
			  var prodName,com,packing,unit, expiryDate;
			  
			  for (var j = 0; j < count; j++) 
			  {
				  prodName = rowdata[j].itemName;
				  com = rowdata[j].companyName;
				  packing = rowdata[j].weight;
				  unit = rowdata[j].unitName;
				  expiryDate = rowdata[j].expiryDate;
				
				 var rowId = ids[j];
				 var rowData = jQuery('#list4').jqGrid ('getRowData', rowId);
				
				if (prodName == jsonData.offer.itemName && com == jsonData.offer.companyName && packing == jsonData.offer.weight && unit == jsonData.offer.unitName && expiryDate == jsonData.offer.expiryDate)
				{
			    	ori_quantity = +rowdata[j].quantity+1;
			    	
			    	$("#list4").jqGrid("setCell", rowId, "quantity", ori_quantity);
			    	var grid = jQuery("#list4");
			    	grid.trigger("reloadGrid");
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
					
				  //$("#list4").addRowData(i,jsonData[i]);
				  $("#list4").addRowData(count,jsonData.offer);
				  for(var i=0; i<count; i++)
					  {
					  	if(count[i] == 10)
					  	{
					  								  		
					  	}					  
					  }					
				 }
			  var quantity = 1; 
		
			  
		$("#list4").jqGrid({
			datatype: "local",
			
			colNames:['cat_id','sub_cat_id','ItemName','CompanyName',"HSN",'Packing','Unit', 'UnitPrice','MRP','GST','IGST','Quantity','Total'],
			colNames:['cat_id','sub_cat_id','Item<br>Name','Company<br>Name',"HSN","Packing", "Unit<br>Price",'MRP','GST%','IGST%','kg/ltr','gram/mili','Qty',"Unit",'Total','StockInGrams','StockInMili','TotalQuantity'],
			colNames:['cat_id','sub_cat_id',"Barcode<br>No",'Item<br>Name','Company<br>Name',"HSN","Batch No.", "Unit<br>Price",'MRP','GST%',"Packing","Unit",'Qty','Free<br>Qty','Expiry<br>Date','Total','totalKgLtrPiece','stockPerEntry'],
			colNames:['cat_id','sub_cat_id','Barcode<br>No','Item<br>Name','Company<br>Name','HSN','Batch No', 'Unit<br>Price',
				'MRP','Sale<br>Price<br>Ex','Gst%','igst','Discount%','Discount<br>Amount','Total<br>Ex<br>Tax','Packing',
				'Unit','Qty','Free<br>Qty','Expiry<br>Date','Total','totalKgLtrPiece','stockPerEntry'],
			
			
			colModel:[ 
					     {
					    	 name:'cat_id',
					    	 hidden:true,
					    	 align:'center',
					     },		
					     {
					    	 name:'sub_cat_id',
					    	 hidden:true,
					    	 align:'center',
					     },	
					     
					     {	 name:'barcodeNo',
					    	 width:150,
					    	 align:'center',
							
						 },	
					     
					     {	 name:'itemName',
					    	 width:150,
					    	 align:'center',
							
						 },						
					     {	 name:'companyName',
					    	 width:150,
					    	 align:'center',
							
						},
						{	 name:'hsn',
							 width:80,
					    	 align:'center',
						},
						{	 name:'batchNumber',
							 width:125,
					    	 align:'center',
						},	
					
					
						
						{	 name:'salePrice',
							 width:100,
							 editable: true,
					    	 align:'center',
						},
						
						
						{	 name:'mrp',
							 width:100,
							 editable: true,
					    	 align:'center',
							
						},
						
						{	 name:'salePriceEx',
							 width:100,
							 editable: true,
					    	 align:'center',
						},
						
						
						
						{	 name:'vatPercentage',
							 width:80,
							 editable: true,
					    	 align:'center',
						},
						
						{	 name:'igst',
							 width:80,
							 editable: true
							
						},
						{	name:'sGst',
							width:80,
							editable: true
							
						},
						{	name:'igst',
							width:80,
							//editable: true,
					    	align:'center',
					    	hidden:true
							
						},
						
						{	 name:'Discount',
							 width:100,
							 hidden:false,
							 editable:true,
					    	 align:'center',
						},
						{	 name:'DiscountAmount',
							 width:100,
							 hidden:false,
					    	 align:'center',
						},
						{	 name:'TotalEx',
							 width:100,
							 //editable: true,
					    	 align:'center',
						},
						
						
						{	 name:'weight',
							 width:100,
							 hidden:false,
					    	 align:'center',
						},
						
						{	id:'unitName', 
							name:'unitName',
							width:50,
							align:'center',
						},
						{	
							id:'quantity',
							name:'quantity',
							width:100,
							editable: true,
							align:'center',
						},
						{	
							id:'freeQuantity',
							name:'freeQuantity',
							width:100,
							editable: true,
							align:'center',							
						},						
					
						{	id:'expiryDate', 
							name:'expiryDate',
							width:140,
							align:'center',
							editable: false,
						},						
						{	name:'total',
							width:150,
							align:'center',
							//formatter: sumFmatter
						},						
						{	name:'totalKgLtrPiece',
							width:150,
							hidden:true,
							align:'center',
							//formatter: sumFmatter
						},
						{	name:'stockPerEntry',
							width:150,
							hidden:true,
							align:'center',
							//formatter: sumFmatter
						}
			],
			
			
			sortorder : 'desc',
			loadonce: false,
			viewrecords: true,
			//width: 1200,
			shrinkToFit:true,
			rowheight: 300,
          	hoverrows: true,
	        rownumbers: true,
	        rowNum: 10,
           'cellEdit':true,
            autowidth:true,
            pgbuttons : false,
            pginput : false,
           
           beforeEditCell: function(rowid, cellname, value, irow, icol)
           { 
        	   var rowId =$("#list4").jqGrid('getGridParam','selrow');
               var rowData = jQuery("#list4").getRowData(rowId);
               var unit =  rowData['unitName'];
               
	        	if(unit == 'pcs')
	           	{
	           		$(this).jqGrid('setColProp', 'quantity', {editable:true});
	           		$(this).jqGrid('setColProp', 'kg', {editable:false});
	           		$(this).jqGrid('setColProp', 'grams', {editable:false});			                    		
	           	}
	           	else
	           	{
	           		$(this).jqGrid('setColProp', 'quantity', {editable:false});
	           		$(this).jqGrid('setColProp', 'kg', {editable:true});
	           		$(this).jqGrid('setColProp', 'grams', {editable:true});
	           	}
           },
            
            afterSaveCell: function grossTotal()
			{
            	       	document.getElementById("discount").value = 0;
		 				document.getElementById("discountAmount").value = 0;
		 				document.getElementById("hamaliExpence2").value = 0;
		 				document.getElementById("hamaliExpence").value = 0;
            	
            	
            		    	Calculation of total after editing quantity
				        	   
				        	   // $(this).trigger('reloadGrid');
				        	   var rowId =$("#list4").jqGrid('getGridParam','selrow');
				        	   //alert("rowId ==========> "+rowId);
		                       var rowData = jQuery("#list4").getRowData(rowId);
		                       productName = rowData['itemName'];
		                       var quantity = rowData['quantity'];
		                       var freeQuantity = rowData['freeQuantity'];
		                       //alert("ENTERED QUANTITY =====> "+quantity);
		                       var salePrice = rowData['salePrice'];
		                       var mrp = rowData['mrp'];
		                       //alert("grams entered = "+grams);
		                       var iGst = rowData['igst'];
		                      // var Gst = rowData['gst'];
		                       var gst = rowData['vatPercentage'];
		                       var unit = rowData['unitName'];
		                       //var vatPercentage = rowData['vatPercentage'];
		                       var stockPerEntry = rowData['stockPerEntry'];
		                       var expiryDate = rowData['expiryDate'];
		                       
		                       if(freeQuantity == "")
		                       {
		                    	   	freeQuantity = "0";
                   					var setZero = 0;
                   					$("#list4").jqGrid("setCell", rowId, "freeQuantity", setZero);
		                       }
		                       
		                 
		                     if(salePrice != "")
		                       {
		                    	   var checkprice = /^[0-9]+\.?[0-9]*$/;
		                    	   if(salePrice.match(checkprice))
		                    	   {}
		                    	   else
		                    	   {
		                    		   var msg="Please Enter Valid Sale Price";
	                    				var dialog = bootbox.dialog({
	                    					//title: "Embel Technologies Says :",
	                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
	                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
	                    				    closeButton: false
	                    				});
	                    				
	                    				setTimeout(function() {
	                    					dialog.modal('hide');
	                    				}, 1500);
	                    				
	                    				//var setZero = salePrice;
			                    		$("#list4").jqGrid("setCell", rowId, "salePrice", v.salePrice);
			                    		
			                    		finalCalculation();
			                    		
			                    		var Total = 0;
			                    		var Total1 = 0;
			                    		var count = jQuery("#list4").jqGrid('getGridParam', 'records');
			        		        	var allRowsInGrid1 = $('#list4').getGridParam('data');
			        		        	var AllRows=JSON.stringify(allRowsInGrid1);
			        		        	for (var k = 0; k < count; k++)
			        		        	{
			        		        		Total1 = allRowsInGrid1[k].total;
			        		        		if(Total1 == undefined)
			        		        			{
			        		        				Total1 = 0;
			        		        			}
			        		        		Total = +Total + +Total1;
			        		        		Total = Math.round(Total * 100) / 100;
			        		        		
			        		        	}
			        		        	
			        		        	document.getElementById("totalWithExpense").value = Total;
			        		        	document.getElementById("grossTotal").value = Total;
	                    				
	                    				return false;
		                    	   }
		                       }
		                       
		                       if(mrp != "")
		                       {
		                    	   var checkprice = /^[0-9]+\.?[0-9]*$/;
		                    	   if(mrp.match(checkprice))
		                    	   {}
		                    	   else
		                    	   {
		                    		   var msg="Please Enter Valid MRP";
	                    				var dialog = bootbox.dialog({
	                    					//title: "Embel Technologies Says :",
	                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
	                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
	                    				    closeButton: false
	                    				});
	                    				
	                    				setTimeout(function() {
	                    					dialog.modal('hide');
	                    				}, 1500);
	                    				
	                    				var setZero = 0;
	                    				$("#list4").jqGrid("setCell", rowId, "mrp", setZero);
	                    				
	                    				finalCalculation();
	                    				
	                    				var setZero = 0;
			                    		$("#list4").jqGrid("setCell", rowId, "total", setZero);
			                    		
			                    		var Total = 0;
			                    		var Total1 = 0;
			                    		var count = jQuery("#list4").jqGrid('getGridParam', 'records');
			        		        	var allRowsInGrid1 = $('#list4').getGridParam('data');
			        		        	var AllRows=JSON.stringify(allRowsInGrid1);
			        		        	for (var k = 0; k < count; k++)
			        		        	{
			        		        		Total1 = allRowsInGrid1[k].total;
			        		        		if(Total1 == undefined)
			        		        			{
			        		        				Total1 = 0;
			        		        			}
			        		        		Total = +Total + +Total1;
			        		        		Total = Math.round(Total * 100) / 100;
			        		        		
			        		        	}
			        		        	
			        		        	document.getElementById("totalWithExpense").value = Total;
			        		        	document.getElementById("grossTotal").value = Total;
	                    				
	                    				
	                    				document.getElementById("mrp").value = "";
	                    			
	                    				
	                    				var allRowsInGrid = $('#list4').getGridParam('data');//to get all rows of grid
	                    				var AllRows=JSON.stringify(allRowsInGrid);
	                    				
	                    				allRowsInGrid[i].mrp="";
	                    				

	                    				
	                    				return false;
		                    	   }
		                       }
		                       
		                       var vPercentage = v.vatPercentage;
		                       if(vatPercentage != "")
		                       {
		                    	   var checkTax = /^[0-9]+$/;
		                    	   if(vatPercentage.match(checkTax))
		                    	   {}
		                    	   else
		                    	   {
		                    		   var msg="Please Enter Valid GST %";
	                    				var dialog = bootbox.dialog({
	                    					//title: "Embel Technologies Says :",
	                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
	                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
	                    				    closeButton: false
	                    				});
	                    				
	                    				setTimeout(function() {
	                    					dialog.modal('hide');
	                    				}, 1500);
	                    				
	                    				$("#list4").jqGrid("setCell", rowId, "vatPercentage", vPercentage);
	                    				
	                    				return false;
		                    	   }
		                       }
		                       
		                       if(quantity != "")
		                       {
		                    	   var checkprice = /^[0-9]+\.?[0-9]*$/;
		                    	   if(quantity.match(checkprice))
		                    	   {}
		                    	   else
		                    	   {
		                    		   var msg="Please Enter Valid Quantity";
	                    				var dialog = bootbox.dialog({
	                    					//title: "Embel Technologies Says :",
	                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
	                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
	                    				    closeButton: false
	                    				});
	                    				
	                    				setTimeout(function() {
	                    					dialog.modal('hide');
	                    				}, 1500);
	                    				
	                    				var setValue;
	                    				$("#list4").jqGrid("setCell", rowId, "quantity", setValue);
	                    				
	                    				finalCalculation();
	                    				
	                    				
	                    				return false;
		                    	   }
		                       }
		                       
		                       if(freeQuantity != "")
		                       {
		                    	   var checkprice = /^[0-9]+\.?[0-9]*$/;
		                    	   if(freeQuantity.match(checkprice))
		                    	   {}
		                    	   else
		                    	   {
		                    		   var msg="Please Enter Valid Free Quantity";
	                    				var dialog = bootbox.dialog({
	                    					//title: "Embel Technologies Says :",
	                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
	                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
	                    				    closeButton: false
	                    				});
	                    				
	                    				setTimeout(function() {
	                    					dialog.modal('hide');
	                    				}, 1500);
	                    				
	                    				var setValue;
	                    				$("#list4").jqGrid("setCell", rowId, "freeQuantity", setValue);
	                    				
	                    				finalCalculation();
	                    				
	                    				
	                    				return false;
		                    	   }
		                       }
		                       
		                       
		                       
		                       if(mrp == "" || mrp == "0")
		                       {}
		                       else
		                       {
			                       if(Number(salePrice) > Number(mrp))
			                       {
			                    	   var msg="MRP must be Greater Than Unit Price";
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
		                       }
		                       
		                    	if(unit == 'pcs')
			                    	{
			                    		$(this).jqGrid('setColProp', 'quantity', {editable:true});
			                    		$(this).jqGrid('setColProp', 'kg', {editable:false});
			                    		$(this).jqGrid('setColProp', 'grams', {editable:false});			                    		
			                    	}
			                    	else
			                    	{
			                    		$(this).jqGrid('setColProp', 'quantity', {editable:false});
			                    		$(this).jqGrid('setColProp', 'kg', {editable:true});
			                    		$(this).jqGrid('setColProp', 'grams', {editable:true});
			                    	}
		                    	
		                    	productId = $('#proName').val();
		                    	
		                    	$("#proName option:selected").each(function()
		                    		{
		                    		   selectedVal = $(this).text();
		                    		});
		                    	
		                    	var splitText = selectedVal.split(",");
		                    	
		                    	//var stockArray = {};
		                    	
		                    		var stock = splitText[4];
		                    		
		                    	 	var stockInGrams = splitText[11];
		                    		var stockInMili = splitText[12];
		                    		var stockInTotalPieceQuantity = splitText[13];
		                    	           	
		                    	
		                    	var salePricePerGramOrMili = salePricePerGram = (Number)(salePrice/1000);
	                    		var userTotalGramsOrMili = Number(quantity) * 1000;
		                    	//alert("Sale Price Per Gram = "+salePricePerGram);
		                    	
		                    	if(unit == 'kg')
		                    	{		
 		                    	   		var setFq = 0;
		                    			$("#list4").jqGrid("setCell", rowId, "freeQuantity", setFq);
		                    			
		                    			var rowId =$("#list4").jqGrid('getGridParam','selrow');
		                    			var rowData = jQuery("#list4").getRowData(rowId);
		                    			var stockInKg = rowData['totalKgLtrPiece'];
		                    			var stockInGrams;
		                    			if(Number(stockInKg) > 1)
		                    			{
			                    			stockInGrams = stockInKg * 1000;
		                    			}
		                    			else
		                    			{
		                    				stockInGrams = stockInKg;
		                    			}
		                    					                    			
		                    			if(quantity != '')
		                    			{
		                    			var checkKiloLtr = /^[0-9]+\.?[0-9]{0,3}$/;
		                    			//var checkKiloLtr = /^[0-9]+\.?[0-9]*$/;
		                    			if(quantity.match(checkKiloLtr))
		                    			{
		                    				if(quantity == 0)
		                    				{
			                    				var msg="Please Enter Valid kg Value";
			                    				var dialog = bootbox.dialog({
			                    					//title: "Embel Technologies Says :",
			                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
			                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
			                    				    closeButton: false
			                    				});
			                    				
			                    				setTimeout(function() {
			                    					dialog.modal('hide');
			                    				}, 1500);

			 		                    	   	var setZero = 0;
					                    		$("#list4").jqGrid("setCell", rowId, "total", setZero);					                    		
					                    		
					                    		finalCalculation();
					                    					                    				 		                    	   
			 		                    	   return false;
		                    				}		                    				
		                    			}
		                    			else
		                    			{
		                    				var setZero = 0;
		                    				
		                    				var msg="Please Enter Valid kg Value";
		                    				var dialog = bootbox.dialog({
		                    					//title: "Embel Technologies Says :",
		                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
		                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		                    				    closeButton: false
		                    				});
		                    				
		                    				setTimeout(function() {
		                    					dialog.modal('hide');
		                    				}, 1500);
		                    						                    				
		                    				var setZero = 0;
				                    		$("#list4").jqGrid("setCell", rowId, "quantity", setZero);
				                    		$("#list4").jqGrid("setCell", rowId, "total", setZero);
				                    		
				                    		finalCalculation();
				                    						                    				                    		
				                    		return false;
		                    				}
		                    			}
		                    			
		                    			if(expiryDate =='N/A')
		                    			{
			                    			if(Number(userTotalGramsOrMili) > Number(stockInGrams))
					                    	{ 		                    				
				                    			if(Number(stockInGrams) >1000)
				                    				{
				                    					var convertedStockInKg = Number(stockInGrams)/1000;
				                    					
				                    					var msg=productName+" Available stock = "+convertedStockInKg+" Kg";
					                    				var dialog = bootbox.dialog({
					                    					//title: "Embel Technologies Says :",
					                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
					                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
					                    				    closeButton: false
					                    				});
					                    				setTimeout(function() {
					                    					dialog.modal('hide');
					                    				}, 1500);
				                    				}
				                    				else
				                    				{			                    					
				                    					var msg=productName+" Available stock = "+stockInGrams+" Grams";
					                    				var dialog = bootbox.dialog({
					                    					//title: "Embel Technologies Says :",
					                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
					                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
					                    				    closeButton: false
					                    				});
					                    				setTimeout(function() {
					                    					dialog.modal('hide');
					                    				}, 1500);
				                    				}
				                    			
					                    		var setZero = 0;
					                    		$("#list4").jqGrid("setCell", rowId, "total", setZero);
					                    		$("#list4").jqGrid("setCell", rowId, "quantity", setZero);
					                    		
					                    		finalCalculation();
					                    		
					                    	}
		                    			}
		                    			else if(expiryDate !='N/A')
		                    			{
		                    				var stockperEntryInKg = rowData['stockPerEntry'];
			                    			var stockperEntryInGrams;
			                    			if(Number(stockperEntryInKg) > 1)
			                    			{
			                    				stockperEntryInGrams = stockperEntryInKg * 1000;
			                    			}
			                    			else
			                    			{
			                    				stockperEntryInGrams = stockperEntryInKg;
			                    			}
		                    			
		                    				if(Number(userTotalGramsOrMili) > Number(stockperEntryInGrams))
					                    	{ 		                    				
				                    			if(Number(stockperEntryInGrams) >1000)
				                    				{
				                    					var convertedStockInKg = Number(stockperEntryInGrams)/1000;
				                    					
				                    					var msg=productName+" Available stock = "+convertedStockInKg+" Kg";
					                    				var dialog = bootbox.dialog({
					                    					//title: "Embel Technologies Says :",
					                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
					                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
					                    				    closeButton: false
					                    				});
					                    				setTimeout(function() {
					                    					dialog.modal('hide');
					                    				}, 1500);
				                    				}
				                    				else
				                    				{			                    					
				                    					var msg=productName+" Available stock = "+stockperEntryInGrams+" Grams";
					                    				var dialog = bootbox.dialog({
					                    					//title: "Embel Technologies Says :",
					                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
					                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
					                    				    closeButton: false
					                    				});
					                    				setTimeout(function() {
					                    					dialog.modal('hide');
					                    				}, 1500);
				                    				}
				                    			
					                    		var setZero = 0;
					                    		$("#list4").jqGrid("setCell", rowId, "total", setZero);
					                    		$("#list4").jqGrid("setCell", rowId, "quantity", setZero);
					                    		
					                    		finalCalculation();
					                    		
					                    	}
		                    			}
			                    		
			                    			KgGramsLtrMiliCalculation();
			                 		}
		                    	
		                    	if(unit == 'ltr')
	                    		{
	                    	   		var setFq = 0;
	                    			$("#list4").jqGrid("setCell", rowId, "freeQuantity", setFq);
		                    		
		                    		var rowId =$("#list4").jqGrid('getGridParam','selrow');
	                    			var rowData = jQuery("#list4").getRowData(rowId);
	                    			var stockInLtr = rowData['totalKgLtrPiece'];
	                    			var stockInMili = stockInLtr * 1000;
	                    			
	                    			var stockperEntryInLtr = rowData['stockPerEntry'];
	                    			var stockperEntryInMili;
	                    			if(Number(stockperEntryInLtr) > 1)
	                    			{
	                    				stockperEntryInMili = stockperEntryInLtr * 1000;
	                    			}
	                    			else
	                    			{
	                    				stockperEntryInMili = stockperEntryInLtr;
	                    			}
	                    			
	                    			if(quantity != '')
	                    			{
	                    			var checkKiloLtr = /^[0-9]+\.?[0-9]{0,3}$/;
	                    			if(quantity.match(checkKiloLtr))
	                    			{
	                    				if(quantity == "0")
	                    				{
			 		                    	   var msg="Please Enter ltr OR mili";
			 		                    	   var dialog = bootbox.dialog({
		                    					//title: "Embel Technologies Says :",
		                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
		                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		                    				    closeButton: false
		                    				});
			 		                    	  setTimeout(function() {
			                    					dialog.modal('hide');
			                    				}, 1500);
			 		                    	   
			 		                    	   var setZero = 0;
			 		                    	   $("#list4").jqGrid("setCell", rowId, "total", setZero);
					                    		
			 		                    	  finalCalculation();
			 		                    	   
			 		                    	  return false;
	                    				}
	                    			}
	                    			else
	                    			{
	                    				quantity = 0;
	                    				
	                    				var msg="Please Enter Valid ltr Value";
	                    				var dialog = bootbox.dialog({
	                    					//title: "Embel Technologies Says :",
	                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
	                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
	                    				    closeButton: false
	                    				});
	                    				setTimeout(function() {
	                    					dialog.modal('hide');
	                    				}, 1500);				
	                    				
	                    				var setZero = 0;
			                    		$("#list4").jqGrid("setCell", rowId, "quantity", setZero);
			                    		
			                    		finalCalculation();
			                    					                    			                    		
	                    				return false;
	                    				}
	                    			}
	                    			
	                    			
	                    			if(expiryDate =='N/A')
	                    			{
		                    		if(Number(userTotalGramsOrMili) > Number(stockInMili))
			                    	{
		                    			if(Number(stockInMili) >1000)
		                    				{
		                    					var convertedStockInLtr = Number(stockInMili)/1000;
		                    					
		                    					var msg=productName+" Available stock = "+convertedStockInLtr+" Ltr";
				 		                    	   var dialog = bootbox.dialog({
			                    					//title: "Embel Technologies Says :",
			                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
			                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
			                    				    closeButton: false
			                    				});
				 		                    	  setTimeout(function() {
				                    					dialog.modal('hide');
				                    				}, 1500);
		                    					
		                    					
		                    				}
		                    				else
		                    				{		                    					
		                    					var msg=productName+" Available stock = "+stockInMili+" mili";
				 		                    	   var dialog = bootbox.dialog({
			                    					//title: "Embel Technologies Says :",
			                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
			                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
			                    				    closeButton: false
			                    				});
				 		                    	  setTimeout(function() {
				                    					dialog.modal('hide');
				                    				}, 1500);
		                    				}
		                    			
			                    		var setZero = 0;
			                    		$("#list4").jqGrid("setCell", rowId, "total", setZero); 
			                    		$("#list4").jqGrid("setCell", rowId, "quantity", setZero);
			                    		
			                    		finalCalculation();
			                    		
			        		        	return false;
			                    	}
	                    			}
		                    		else if(expiryDate !='N/A')
	                    			{
		                    			if(Number(userTotalGramsOrMili) > Number(stockperEntryInMili))
				                    	{
			                    			if(Number(stockperEntryInMili) >1000)
			                    				{
			                    					var convertedStockInLtr = Number(stockperEntryInMili)/1000;
			                    					
			                    					var msg=productName+" Available stock = "+convertedStockInLtr+" Ltr";
					 		                    	   var dialog = bootbox.dialog({
				                    					//title: "Embel Technologies Says :",
				                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
				                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
				                    				    closeButton: false
				                    				});
					 		                    	  setTimeout(function() {
					                    					dialog.modal('hide');
					                    				}, 1500);
			                    					
			                    					
			                    				}
			                    				else
			                    				{		                    					
			                    					var msg=productName+" Available stock = "+stockperEntryInMili+" mili";
					 		                    	   var dialog = bootbox.dialog({
				                    					//title: "Embel Technologies Says :",
				                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
				                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
				                    				    closeButton: false
				                    				});
					 		                    	  setTimeout(function() {
					                    					dialog.modal('hide');
					                    				}, 1500);
			                    				}
			                    			
				                    		var setZero = 0;
				                    		$("#list4").jqGrid("setCell", rowId, "total", setZero); 
				                    		$("#list4").jqGrid("setCell", rowId, "quantity", setZero);
				                    		
				                    		finalCalculation();
				                    		
				        		        	return false;
	                    			}		                    		
	                    		}
                    				KgGramsLtrMiliCalculation();
                    		}
		                    	
	                    	function KgGramsLtrMiliCalculation()
	                    	{
	                    		if((Number(quantity)>0 || Number(quantity) != '' || quantity != '0'))
                    			{
	                    			salePricePerGram 
		                    		var salePriceKgTota = 0;
		                    		salePriceKgTota = userTotalGramsOrMili * salePricePerGramOrMili ;
		                    		salePriceKgTota = Math.round(salePriceKgTota * 100) / 100;			                    		
                    				$("#list4").jqGrid("setCell", rowId, "total", salePriceKgTota);
                    			}				                    	
		                    	          	
		                    	else if(Number(quantity) == 0  || Number(quantity)== '')
                    			{
		                    		
		                    		var setZero = 0;
		                    		$("#list4").jqGrid("setCell", rowId, "total", setZero);
		                    		
		                    		finalCalculation();
		                    	   
 		                    	   return false;
                    			}
	                    	}
			                   
			                    if(unit == 'pcs')
			                    {	
			                    	if(freeQuantity == "" || freeQuantity == "0")
		                    		{
		                    			freeQuantity = 0;
		                    			var setZero = 0;
                                 		$("#list4").jqGrid("setCell", rowId, "freeQuantity", setZero);
                                 		quantity = Number(quantity) + Number(freeQuantity);
		                    		}
			                    	else if(freeQuantity != '' || freeQuantity != "0")
		                    		{
										var checkFreeQuantity = /^[0-9]+$/;
							    		if(freeQuantity.match(checkFreeQuantity))
							    		{
							    			quantity = Number(quantity) + Number(freeQuantity);
							    		}
							    		else
							    		{
						    				 var msg="Please Enter Valid Free Quantity";
			 		                    	   var dialog = bootbox.dialog({
		                    					//title: "Embel Technologies Says :",
		                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
		                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		                    				    closeButton: false
		                    				});
			 		                    	  setTimeout(function() {
			                    					dialog.modal('hide');
			                    				}, 1500);
		                    				 
		                    				 quantity = 0;
		                    				 var setZero = 0;
	                                   		 $("#list4").jqGrid("setCell", rowId, "quantity", setZero);
	 			                    		 $("#list4").jqGrid("setCell", rowId, "total", setZero);
	                                   		 $("#list4").jqGrid("setCell", rowId, "freeQuantity", setZero);
	 			                    		 
	                                   		finalCalculation();
	                                   		 	
		                    				return false;			                    			
							    		}
		                    		}
			                    	
		                    		var rowId =$("#list4").jqGrid('getGridParam','selrow');
	                    			var rowData = jQuery("#list4").getRowData(rowId);
	                    			var stockInTotalPieceQuantity = rowData['totalKgLtrPiece'];	
	                    			
	                    			if(quantity != '')
	                    			{
	                    			 var checkQuantity = /^[0-9]+$/;
	                    			 if(String(quantity).match(checkQuantity) || String(quantity) == "")
	                    			 {}
	                    			 else
	                    			 {	                    				 
	                    				 var msg="Please Enter Valid Quantity";
		 		                    	   var dialog = bootbox.dialog({
	                    					//title: "Embel Technologies Says :",
	                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
	                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
	                    				    closeButton: false
	                    				});
		 		                    	  setTimeout(function() {
		                    					dialog.modal('hide');
		                    				}, 1500);
	                    				 
	                    				 quantity = 0;
	                    				 var setZero = 0;
                                   		 $("#list4").jqGrid("setCell", rowId, "quantity", setZero);
 			                    		 $("#list4").jqGrid("setCell", rowId, "total", setZero);
                                   		 $("#list4").jqGrid("setCell", rowId, "freeQuantity", setZero);
 			                    		 
                                   		finalCalculation();
                                   		 	
	                    				return false;
	                    			 	}
	                    			}
	                    			
	                    			 
		                    		if(expiryDate =='N/A')
		                    		{	
		                    			if ( Number(quantity) > Number(stockInTotalPieceQuantity))
					                    	{
	                    					   var msg = productName+" Available Stock For Expiry Date : "+expiryDate+" = "+stockInTotalPieceQuantity+" Pieces";
			 		                    	   var dialog = bootbox.dialog({
		                    					//title: "Embel Technologies Says :",
		                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
		                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		                    				    closeButton: false
			 		                    	   });
		                    				
			 		                    	   setTimeout(function()
			 		                    		{
		                    					dialog.modal('hide');
			 		                    	   }, 1500);
			 		                    	   
			 		                    	   var setFq = 0;
			 		                    	   $("#list4").jqGrid("setCell", rowId, "freeQuantity", setFq);
			 		                    	   $("#list4").jqGrid("setCell", rowId, "quantity", setFq);
					                    	   $("#list4").jqGrid("setCell", rowId, "total", setFq);
					                    	   
					                    	   finalCalculation();					                    		
			 		                    	   return false;
				                    	}	                    			 
		                    		}
	                    			else if(expiryDate !='N/A')
	                    			{	
	                    				if ( Number(quantity) > Number(stockPerEntry))
				                    	{
				                    		   var msg = productName+" Available Stock For Expiry Date : "+expiryDate+" = "+stockPerEntry+" Pieces";
			 		                    	   var dialog = bootbox.dialog({
		                    					//title: "Embel Technologies Says :",
		                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
		                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		                    				    closeButton: false
		                    				});
			 		                    	  setTimeout(function() {
			                    					dialog.modal('hide');
			                    				}, 1500);
				                    		
				                    		var tota = 0;
				                    		var quantity = 0;
				                    		$("#list4").jqGrid("setCell", rowId, "total", tota);
				                    		$("#list4").jqGrid("setCell", rowId, "quantity", quantity);
			 		                    	$("#list4").jqGrid("setCell", rowId, "freeQuantity", quantity);
				                    		
			 		                    	finalCalculation();
				                    	}
	                    			}
			                    	if (iGst != 0 || iGst != undefined || Number(quantity) > 0 || quantity == '')
			                    	{
		                    			var taxPercentage = iGst;
			                    		var taxAmount = ((taxPercentage/100)*salePrice);
			                    		var BuyPriceWithTaxAmount = Number(taxAmount) + Number(salePrice);
			                    		var tota = Number(quantity - freeQuantity) * salePrice;
			                    		tota = Math.round(tota * 100) / 100;
			                    		$("#list4").jqGrid("setCell", rowId, "total", tota);
				                    }
			                    	else if(iGst == 0 || iGst == undefined || Number(quantity) > 0 || quantity == '')
			                    	{
			                    		Gst = 0;
			                    		var  taxPercentage = Number(Gst);
			                    		var taxAmount = ((taxPercentage/100)*salePrice);
			                    		var BuyPriceWithTaxAmount = Number(taxAmount) + Number(salePrice);
			                    		var tota = Number(quantity - freeQuantity) * salePrice;
			                    		tota = Math.round(tota * 100) / 100;
			                    		$("#list4").jqGrid("setCell", rowId, "total", tota);
			                    				                    		
			                    	}
			                    	
			                    	if(freeQuantity == "")
			                    	{}
			                    	else
			                    	{
			                    		var checkFreeQuantity = /^[0-9]+$/;
			                    		if(freeQuantity.match(checkFreeQuantity))
			                    		{}
			                    		else
			                    		{	
			                    			 var msg="Please Enter Valid Free Quantity";
			 		                    	   var dialog = bootbox.dialog({
		                    					//title: "Embel Technologies Says :",
		                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
		                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		                    				    closeButton: false
		                    				});
			 		                    	  setTimeout(function() {
			                    					dialog.modal('hide');
			                    				}, 1500);
			 		                    	  
			 		                    	  	var setFq = 0;
		                                   		$("#list4").jqGrid("setCell", rowId, "freeQuantity", setFq);
			                    		}
			                    	}
			                    }
			                    
			                    finalCalculation();
			                    
			                    function finalCalculation()
			                    {
			                    		var Total = 0;
			                    		var Total1 = 0;
			                    		var count = jQuery("#list4").jqGrid('getGridParam', 'records');
			        		        	var allRowsInGrid1 = $('#list4').getGridParam('data');
			        		        	var AllRows=JSON.stringify(allRowsInGrid1);
			        		        	for (var k = 0; k < count; k++)
			        		        	{
			        		        		Total1 = allRowsInGrid1[k].total;
			        		        		if(Total1 == undefined)
			        		        			{
			        		        				Total1 = 0;
			        		        			}
			        		        		Total = +Total + +Total1;
			        		        		Total = Math.round(Total * 100) / 100;
			        		        		
			        		        	}
			        		        	
			        		        	document.getElementById("totalWithExpense").value = Total;
			        		        	document.getElementById("grossTotal").value = Total;
		        		        		
			                    }
	                    },
			//},
	        	
         
			pager: "#jqGridPager",
			
			
			
		});
		
	
		//$("#list4").addRowData(i+1,jsonData[i]);
		if(count==0 || count==null)
		{
			 // $("#list4").addRowData(i,jsonData[i]);
			  $("#list4").addRowData(0,jsonData.offer);
		}
		

   
		 $('#list4').navGrid('#jqGridPager',
	                
	                { edit: true, add: false, del: true, search: true, refresh: true, view: true, position: "left", cloneToTop: false },
	                
	                {
	                    editCaption: "The Edit Dialog",
	                   
	                    afterSubmit: function () {
							
	                      var grid = $("#list4"),
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
	                	
						

						afterComplete: function() {
	                		$('#list4').trigger( 'reloadGrid' );

	                		
	                		document.getElementById("discount").value = 0;
			 				document.getElementById("discountAmount").value = 0;
			 				document.getElementById("hamaliExpence2").value = 0;
			 				document.getElementById("hamaliExpence").value = 0;	                		
	                		
	 				        	Calculation of total after editing quantity
	 				        	   
	 				        	   // $(this).trigger('reloadGrid');
	 				        	   var rowId =$("#list4").jqGrid('getGridParam','selrow');  
	 		                       var rowData = jQuery("#list4").getRowData(rowId);
	 		                    	var quantity = rowData['quantity'];
	 		                    	var salePrice = rowData['salePrice'];
	 		                    	var kg = rowData['kg'];
			                    	//alert("kg entered = "+kg);
			                    	var grams = rowData['grams'];
			                    	//alert("grams entered = "+grams);
	 		                    	var iGst = rowData['igst'];
	 		                    	var Gst = rowData['gst'];
	 		                    	
	 		                    	productId = $('#proName').val();
	 		                    	
	 		                    	
	 		                    	$("#proName option:selected").each(function() {
	 		                    		   selectedVal = $(this).text();
	 		                    		});
	 		                    	
	 		                    	var splitText = selectedVal.split(",");
	 		                    	
	 		                    	var stock = splitText[4];
	 		                    	
	 		                    	var salePricePerGram = 0;
			                    	salePricePerGram = (Number)(salePrice/1000);
			                    	
			             
		                    	if(Number(grams) != "" || Number(kgValue) != "")
		                    	{
			                    	if(Number(kg)>0 && Number(grams) == 0)
	                    			{
			                    		var salePriceKgTota = 0;
			                    		salePriceKgTota = Number(salePrice)*kg;
			                    		salePriceKgTota = Math.round(salePriceKgTota * 100) / 100;
	                    				$("#list4").jqGrid("setCell", rowId, "total", salePriceKgTota);
	                    			}
			                    	
			                    	if(Number(grams)>0 && Number(kg) == 0)
	                    			{
			                    		var salePriceGramTota = 0;
			                    		salePriceGramTota = Number(salePricePerGram)*grams;
			                    		salePriceGramTota = Math.round(salePriceGramTota * 100) / 100;
	                    				$("#list4").jqGrid("setCell", rowId, "total", salePriceGramTota);
	                    			}
			                    	
			                    	if(Number(kg) > 0 && Number(grams) > 0)
	                    			{
			                    		var salePriceKgTota = 0;
			                    		var salePriceGramTota = 0;
			                    		var salePriceKgPlusGrams = 0;
			                    		salePriceKgTota = Number(salePrice)*kg;
			                    		salePriceGramTota = Number(salePricePerGram)*grams;                    		
			                    		salePriceKgPlusGrams = Number(salePriceKgTota) + Number(salePriceGramTota);
			                    		salePriceKgPlusGrams = Math.round(salePriceKgPlusGrams * 100) / 100;
	                    				$("#list4").jqGrid("setCell", rowId, "total", salePriceKgPlusGrams);
		                    		}
			                    	
			                    	var Total =0;
 		                    		var count = jQuery("#list4").jqGrid('getGridParam', 'records');
 		        		        	var allRowsInGrid1 = $('#list4').getGridParam('data');
 		        		        	var AllRows=JSON.stringify(allRowsInGrid1);
 		        		        	for (var k = 0; k < count; k++) {
 		        		        		var Total1 = allRowsInGrid1[k].total;
 		        		        		Total = +Total + +Total1;
 		        		        		Total = Math.round(Total * 100) / 100;
 		        		        	}
 		        		        	document.getElementById("totalWithExpense").value = Total;
 		        		        	document.getElementById("grossTotal").value = Total;
 		                        	
		                    	}
	 		                    	if ( Number(quantity) > Number(stock))
	 		                    	{
	 		                    		
	 		                    		alert("Available stock = "+stock);
	 		                    		
	 		                    		
	 		                    		
	 	                    		
	 	                    	        }
	 		                    	
	 		                    		if (iGst != 0){
	 		                    			var taxPercentage = iGst;
	 			                    		var taxAmount = ((taxPercentage/100)*salePrice);
	 			                    		var BuyPriceWithTaxAmount = Number(taxAmount) + Number(salePrice);
	 			                    		var tota = quantity * salePrice;
	 			                    		tota = Math.round(tota * 100) / 100;
	 			                    		$("#list4").jqGrid("setCell", rowId, "total", tota);
		 		                    	}
		 		                    	else if(iGst == 0){
	 		                    		var  taxPercentage = Number(Gst);
	 		                    		var taxAmount = ((taxPercentage/100)*salePrice);
	 		                    		var BuyPriceWithTaxAmount = Number(taxAmount) + Number(salePrice);
	 		                    		var tota = quantity * salePrice;
	 		                    		tota = Math.round(tota * 100) / 100;
	 		                    		$("#list4").jqGrid("setCell", rowId, "total", tota);
		 		                    		
		 		                    	}
		 		                    		
		 		                    		var Total =0;
		 		                    		var count = jQuery("#list4").jqGrid('getGridParam', 'records');
		 		        		        	var allRowsInGrid1 = $('#list4').getGridParam('data');
		 		        		        	var AllRows=JSON.stringify(allRowsInGrid1);
		 		        		        	for (var k = 0; k < count; k++) {
		 		        		        		var Total1 = allRowsInGrid1[k].total;
		 		        		        		Total = +Total + +Total1;
		 		        		        		Total = Math.round(Total * 100) / 100;
		 		        		        	}
		 		        		        	document.getElementById("totalWithExpense").value = Total;
		 		        		        	document.getElementById("grossTotal").value = Total;
		 	        		        		//document.getElementById("duptotal").value = Total;
		 		                    	
	 		        	
						},
						reloadAftersubmit:true,	
	                    errorTextFormat: function (data) {
	                        return 'Error: ' + data.responseText
	                    }
	                		
	                });
		 
		 
			   });
		
		})
}

            afterSaveCell: function grossTotal()
		{
        	       	document.getElementById("discount").value = 0;
	 				document.getElementById("discountAmount").value = 0;
	 				document.getElementById("hamaliExpence2").value = 0;
	 				document.getElementById("hamaliExpence").value = 0;
        	
        	//alert("In afterSave cell");
        		    	Calculation of total after editing quantity
			        	   
			        	   // $(this).trigger('reloadGrid');
			        	   var rowId =$("#list4").jqGrid('getGridParam','selrow');
			        	   
	                       var rowData = jQuery("#list4").getRowData(rowId);
	                       productName = rowData['itemName'];
	                       var quantity = rowData['quantity'];
	                       var freeQuantity = rowData['freeQuantity'];
	                       
	                       var salePrice = rowData['salePrice'];
	                       var mrp = rowData['mrp'];
	                      var iGst = rowData['igst'];
	                       //var gst = rowData['gst'];
	                       var unit = rowData['unitName'];
	                       var gst = rowData['vatPercentage'];
	                       var stockPerEntry = rowData['stockPerEntry'];
	                       var expiryDate = rowData['expiryDate'];
	                       
	                       if(freeQuantity == "")
	                       {
	                    	   	freeQuantity = "0";
               					var setZero = 0;
               					$("#list4").jqGrid("setCell", rowId, "freeQuantity", setZero);
	                       }
	                       
	                       
	                       var sPrice = v.salePrice;
	                 
	                       
	                       if(salePrice != "")
	                       {
	                    	   var checkprice = /^[0-9]+\.?[0-9]*$/;
	                    	   if(salePrice.match(checkprice))
	                    	   {}
	                    	   else
	                    	   {
	                    		   var msg="Please Enter Valid Sale Price";
                    				var dialog = bootbox.dialog({
                    					//title: "Embel Technologies Says :",
                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
                    				    closeButton: false
                    				});
                    				
                    				setTimeout(function() {
                    					dialog.modal('hide');
                    				}, 1500);
                    				
                    				var setZero = 0;
		                    		$("#list4").jqGrid("setCell", rowId, "total", setZero);
                    				
		                    		//var setZero="0"
                    				
		                    		$("#list4").jqGrid("setCell", rowId, "salePrice", sPrice);
		                    		
		                    		finalCalculation();
		                    		
		                    		
		                    		var Total = 0;
		                    		var Total1 = 0;
		                    		var count = jQuery("#list4").jqGrid('getGridParam', 'records');
		        		        	var allRowsInGrid1 = $('#list4').getGridParam('data');
		        		        	var AllRows=JSON.stringify(allRowsInGrid1);
		        		        	for (var k = 0; k < count; k++)
		        		        	{
		        		        		Total1 = allRowsInGrid1[k].total;
		        		        		if(Total1 == undefined)
		        		        			{
		        		        				Total1 = 0;
		        		        			}
		        		        		Total = +Total + +Total1;
		        		        		Total = Math.round(Total * 100) / 100;
		        		        		
		        		        	}
		        		        	
		        		        	document.getElementById("totalWithExpense").value = Total;
		        		        	document.getElementById("grossTotal").value = Total;
                    				
                    				return false;
	                    	   }
	                       }
	                       
	                       if(mrp != "")
	                       {
	                    	   var checkprice = /^[0-9]+\.?[0-9]*$/;
	                    	   if(mrp.match(checkprice))
	                    	   {}
	                    	   else
	                    	   {
	                    		   var msg="Please Enter Valid MRP";
                    				var dialog = bootbox.dialog({
                    					//title: "Embel Technologies Says :",
                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
                    				    closeButton: false
                    				});
                    				
                    				setTimeout(function() {
                    					dialog.modal('hide');
                    				}, 1500);
                    				
                    				var setZero = 0;
                    				$("#list4").jqGrid("setCell", rowId, "mrp", setZero);
                    				
                    				
                    				finalCalculation();
                    				
                    				var setZero = 0;
		                    		$("#list4").jqGrid("setCell", rowId, "total", setZero);
		                    		
		                    		var Total = 0;
		                    		var Total1 = 0;
		                    		var count = jQuery("#list4").jqGrid('getGridParam', 'records');
		        		        	var allRowsInGrid1 = $('#list4').getGridParam('data');
		        		        	var AllRows=JSON.stringify(allRowsInGrid1);
		        		        	for (var k = 0; k < count; k++)
		        		        	{
		        		        		Total1 = allRowsInGrid1[k].total;
		        		        		if(Total1 == undefined)
		        		        			{
		        		        				Total1 = 0;
		        		        			}
		        		        		Total = +Total + +Total1;
		        		        		Total = Math.round(Total * 100) / 100;
		        		        		
		        		        	}
		        		        	
		        		        	document.getElementById("totalWithExpense").value = Total;
		        		        	document.getElementById("grossTotal").value = Total;
                    				
                    				return false;
	                    	   }
	                       }
	                       
	                       var vPercentage = v.vatPercentage; 
	                       
	                     
	                       if(vatPercentage != "")
	                       {
	                    	   
	                    	   var checkTax = /^[0-9]+$/;
	                    	   if(vatPercentage.match(checkTax))
	                    	   {}
	                    	   else
	                    	   {
	                    		   var msg="Please Enter Valid GST %";
                    				var dialog = bootbox.dialog({
                    					//title: "Embel Technologies Says :",
                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
                    				    closeButton: false
                    				});
                    				
                    				setTimeout(function() {
                    					dialog.modal('hide');
                    				}, 1500);
                    				
                    				
                    				
		                    		$("#list4").jqGrid("setCell", rowId, "vatPercentage", vPercentage);
                    				
                    				return false;
	                    	   }
	                       }
	                       
	                       if(mrp == "" || mrp == "0")
	                       {}
	                       else
	                       {
		                       if(Number(salePrice) > Number(mrp))
		                       {
		                    	   var msg="MRP must be Greater Than Unit Price";
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
	                       }
	                       
	                    	if(unit == 'pcs')
		                    	{
		                    		$(this).jqGrid('setColProp', 'quantity', {editable:true});
		                    		$(this).jqGrid('setColProp', 'kg', {editable:false});
		                    		$(this).jqGrid('setColProp', 'grams', {editable:false});			                    		
		                    	}
		                    	else
		                    	{
		                    		$(this).jqGrid('setColProp', 'quantity', {editable:false});
		                    		$(this).jqGrid('setColProp', 'kg', {editable:true});
		                    		$(this).jqGrid('setColProp', 'grams', {editable:true});
		                    	}
	                    	
	                    	productId = $('#proName').val();
	                    	
	                    	$("#proName option:selected").each(function()
	                    		{
	                    		   selectedVal = $(this).text();
	                    		});
	                    	
	                    	var splitText = selectedVal.split(",");
	                    	
	                    	//var stockArray = {};
	                    	
	                    		var stock = splitText[4];
	                    		
	                    	 	var stockInGrams = splitText[11];
	                    		var stockInMili = splitText[12];
	                    		var stockInTotalPieceQuantity = splitText[13];
	                    	           	
	                    	
	                    	var salePricePerGramOrMili = salePricePerGram = (Number)(salePrice/1000);
                    		var userTotalGramsOrMili = Number(quantity) * 1000;
	                    	//alert("Sale Price Per Gram = "+salePricePerGram);
	                    	
	                    	if(unit == 'kg')
	                    	{		
		                    	   		var setFq = 0;
	                    			$("#list4").jqGrid("setCell", rowId, "freeQuantity", setFq);
	                    			
	                    			var rowId =$("#list4").jqGrid('getGridParam','selrow');
	                    			var rowData = jQuery("#list4").getRowData(rowId);
	                    			var stockInKg = rowData['totalKgLtrPiece'];
	                    			var stockInGrams;
	                    			if(Number(stockInKg) > 1)
	                    			{
		                    			stockInGrams = stockInKg * 1000;
	                    			}
	                    			else
	                    			{
	                    				stockInGrams = stockInKg;
	                    			}
	                    					                    			
	                    			if(quantity != '')
	                    			{
	                    			var checkKiloLtr = /^[0-9]+\.?[0-9]{0,3}$/;
	                    			//var checkKiloLtr = /^[0-9]+\.?[0-9]*$/;
	                    			if(quantity.match(checkKiloLtr))
	                    			{
	                    				if(quantity == 0)
	                    				{
		                    				var msg="Please Enter Valid kg Value";
		                    				var dialog = bootbox.dialog({
		                    					//title: "Embel Technologies Says :",
		                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
		                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		                    				    closeButton: false
		                    				});
		                    				
		                    				setTimeout(function() {
		                    					dialog.modal('hide');
		                    				}, 1500);

		 		                    	   	var setZero = 0;
				                    		$("#list4").jqGrid("setCell", rowId, "total", setZero);					                    		
				                    		
				                    		finalCalculation();
				                    					                    				 		                    	   
		 		                    	   return false;
	                    				}		                    				
	                    			}
	                    			else
	                    			{
	                    				var setZero = 0;
	                    				
	                    				var msg="Please Enter Valid kg Value";
	                    				var dialog = bootbox.dialog({
	                    					//title: "Embel Technologies Says :",
	                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
	                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
	                    				    closeButton: false
	                    				});
	                    				
	                    				setTimeout(function() {
	                    					dialog.modal('hide');
	                    				}, 1500);
	                    						                    				
	                    				var setZero = 0;
			                    		$("#list4").jqGrid("setCell", rowId, "quantity", setZero);
			                    		$("#list4").jqGrid("setCell", rowId, "total", setZero);
			                    		
			                    		finalCalculation();
			                    						                    				                    		
			                    		return false;
	                    				}
	                    			}
	                    			
	                    			if(expiryDate =='N/A')
	                    			{
		                    			if(Number(userTotalGramsOrMili) > Number(stockInGrams))
				                    	{ 		                    				
			                    			if(Number(stockInGrams) >1000)
			                    				{
			                    					var convertedStockInKg = Number(stockInGrams)/1000;
			                    					
			                    					var msg=productName+" Available stock = "+convertedStockInKg+" Kg";
				                    				var dialog = bootbox.dialog({
				                    					//title: "Embel Technologies Says :",
				                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
				                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
				                    				    closeButton: false
				                    				});
				                    				setTimeout(function() {
				                    					dialog.modal('hide');
				                    				}, 1500);
			                    				}
			                    				else
			                    				{			                    					
			                    					var msg=productName+" Available stock = "+stockInGrams+" Grams";
				                    				var dialog = bootbox.dialog({
				                    					//title: "Embel Technologies Says :",
				                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
				                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
				                    				    closeButton: false
				                    				});
				                    				setTimeout(function() {
				                    					dialog.modal('hide');
				                    				}, 1500);
			                    				}
			                    			
				                    		var setZero = 0;
				                    		$("#list4").jqGrid("setCell", rowId, "total", setZero);
				                    		$("#list4").jqGrid("setCell", rowId, "quantity", setZero);
				                    		
				                    		finalCalculation();
				                    		
				                    	}
	                    			}
	                    			else if(expiryDate !='N/A')
	                    			{
	                    				var stockperEntryInKg = rowData['stockPerEntry'];
		                    			var stockperEntryInGrams;
		                    			if(Number(stockperEntryInKg) > 1)
		                    			{
		                    				stockperEntryInGrams = stockperEntryInKg * 1000;
		                    			}
		                    			else
		                    			{
		                    				stockperEntryInGrams = stockperEntryInKg;
		                    			}
	                    			
	                    				if(Number(userTotalGramsOrMili) > Number(stockperEntryInGrams))
				                    	{ 		                    				
			                    			if(Number(stockperEntryInGrams) >1000)
			                    				{
			                    					var convertedStockInKg = Number(stockperEntryInGrams)/1000;
			                    					
			                    					var msg=productName+" Available stock = "+convertedStockInKg+" Kg";
				                    				var dialog = bootbox.dialog({
				                    					//title: "Embel Technologies Says :",
				                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
				                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
				                    				    closeButton: false
				                    				});
				                    				setTimeout(function() {
				                    					dialog.modal('hide');
				                    				}, 1500);
			                    				}
			                    				else
			                    				{			                    					
			                    					var msg=productName+" Available stock = "+stockperEntryInGrams+" Grams";
				                    				var dialog = bootbox.dialog({
				                    					//title: "Embel Technologies Says :",
				                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
				                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
				                    				    closeButton: false
				                    				});
				                    				setTimeout(function() {
				                    					dialog.modal('hide');
				                    				}, 1500);
			                    				}
			                    			
				                    		var setZero = 0;
				                    		$("#list4").jqGrid("setCell", rowId, "total", setZero);
				                    		$("#list4").jqGrid("setCell", rowId, "quantity", setZero);
				                    		
				                    		finalCalculation();
				                    		
				                    	}
	                    			}
		                    		
		                    			KgGramsLtrMiliCalculation();
		                 		}
	                    	
	                    	if(unit == 'ltr')
                    		{
                    	   		var setFq = 0;
                    			$("#list4").jqGrid("setCell", rowId, "freeQuantity", setFq);
	                    		
	                    		var rowId =$("#list4").jqGrid('getGridParam','selrow');
                    			var rowData = jQuery("#list4").getRowData(rowId);
                    			var stockInLtr = rowData['totalKgLtrPiece'];
                    			var stockInMili = stockInLtr * 1000;
                    			
                    			var stockperEntryInLtr = rowData['stockPerEntry'];
                    			var stockperEntryInMili;
                    			if(Number(stockperEntryInLtr) > 1)
                    			{
                    				stockperEntryInMili = stockperEntryInLtr * 1000;
                    			}
                    			else
                    			{
                    				stockperEntryInMili = stockperEntryInLtr;
                    			}
                    			
                    			if(quantity != '')
                    			{
                    			var checkKiloLtr = /^[0-9]+\.?[0-9]{0,3}$/;
                    			if(quantity.match(checkKiloLtr))
                    			{
                    				if(quantity == "0")
                    				{
		 		                    	   var msg="Please Enter ltr OR mili";
		 		                    	   var dialog = bootbox.dialog({
	                    					//title: "Embel Technologies Says :",
	                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
	                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
	                    				    closeButton: false
	                    				});
		 		                    	  setTimeout(function() {
		                    					dialog.modal('hide');
		                    				}, 1500);
		 		                    	   
		 		                    	   var setZero = 0;
		 		                    	   $("#list4").jqGrid("setCell", rowId, "total", setZero);
				                    		
		 		                    	  finalCalculation();
		 		                    	   
		 		                    	  return false;
                    				}
                    			}
                    			else
                    			{
                    				quantity = 0;
                    				
                    				var msg="Please Enter Valid ltr Value";
                    				var dialog = bootbox.dialog({
                    					//title: "Embel Technologies Says :",
                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
                    				    closeButton: false
                    				});
                    				setTimeout(function() {
                    					dialog.modal('hide');
                    				}, 1500);				
                    				
                    				var setZero = 0;
		                    		$("#list4").jqGrid("setCell", rowId, "quantity", setZero);
		                    		
		                    		finalCalculation();
		                    					                    			                    		
                    				return false;
                    				}
                    			}
                    			
                    			
                    			if(expiryDate =='N/A')
                    			{
	                    		if(Number(userTotalGramsOrMili) > Number(stockInMili))
		                    	{
	                    			if(Number(stockInMili) >1000)
	                    				{
	                    					var convertedStockInLtr = Number(stockInMili)/1000;
	                    					
	                    					var msg=productName+" Available stock = "+convertedStockInLtr+" Ltr";
			 		                    	   var dialog = bootbox.dialog({
		                    					//title: "Embel Technologies Says :",
		                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
		                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		                    				    closeButton: false
		                    				});
			 		                    	  setTimeout(function() {
			                    					dialog.modal('hide');
			                    				}, 1500);
	                    					
	                    					
	                    				}
	                    				else
	                    				{		                    					
	                    					var msg=productName+" Available stock = "+stockInMili+" mili";
			 		                    	   var dialog = bootbox.dialog({
		                    					//title: "Embel Technologies Says :",
		                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
		                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		                    				    closeButton: false
		                    				});
			 		                    	  setTimeout(function() {
			                    					dialog.modal('hide');
			                    				}, 1500);
	                    				}
	                    			
		                    		var setZero = 0;
		                    		$("#list4").jqGrid("setCell", rowId, "total", setZero); 
		                    		$("#list4").jqGrid("setCell", rowId, "quantity", setZero);
		                    		
		                    		finalCalculation();
		                    		
		        		        	return false;
		                    	}
                    			}
	                    		else if(expiryDate !='N/A')
                    			{
	                    			if(Number(userTotalGramsOrMili) > Number(stockperEntryInMili))
			                    	{
		                    			if(Number(stockperEntryInMili) >1000)
		                    				{
		                    					var convertedStockInLtr = Number(stockperEntryInMili)/1000;
		                    					
		                    					var msg=productName+" Available stock = "+convertedStockInLtr+" Ltr";
				 		                    	   var dialog = bootbox.dialog({
			                    					//title: "Embel Technologies Says :",
			                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
			                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
			                    				    closeButton: false
			                    				});
				 		                    	  setTimeout(function() {
				                    					dialog.modal('hide');
				                    				}, 1500);
		                    					
		                    					
		                    				}
		                    				else
		                    				{		                    					
		                    					var msg=productName+" Available stock = "+stockperEntryInMili+" mili";
				 		                    	   var dialog = bootbox.dialog({
			                    					//title: "Embel Technologies Says :",
			                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
			                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
			                    				    closeButton: false
			                    				});
				 		                    	  setTimeout(function() {
				                    					dialog.modal('hide');
				                    				}, 1500);
		                    				}
		                    			
			                    		var setZero = 0;
			                    		$("#list4").jqGrid("setCell", rowId, "total", setZero); 
			                    		$("#list4").jqGrid("setCell", rowId, "quantity", setZero);
			                    		
			                    		finalCalculation();
			                    		
			        		        	return false;
                    			}		                    		
                    		}
                				KgGramsLtrMiliCalculation();
                		}
	                    	
                    	function KgGramsLtrMiliCalculation()
                    	{
                    		if((Number(quantity)>0 || Number(quantity) != '' || quantity != '0'))
                			{
                    			salePricePerGram 
	                    		var salePriceKgTota = 0;
	                    		salePriceKgTota = userTotalGramsOrMili * salePricePerGramOrMili ;
	                    		salePriceKgTota = Math.round(salePriceKgTota * 100) / 100;			                    		
                				$("#list4").jqGrid("setCell", rowId, "total", salePriceKgTota);
                			}				                    	
	                    	          	
	                    	else if(Number(quantity) == 0  || Number(quantity)== '')
                			{
	                    		
	                    		var setZero = 0;
	                    		$("#list4").jqGrid("setCell", rowId, "total", setZero);
	                    		
	                    		finalCalculation();
	                    	   
		                    	   return false;
                			}
                    	}
		                   
		                    if(unit == 'pcs')
		                    {	
		                    	if(freeQuantity == "" || freeQuantity == "0")
	                    		{
	                    			freeQuantity = 0;
	                    			var setZero = 0;
                             		$("#list4").jqGrid("setCell", rowId, "freeQuantity", setZero);
                             		quantity = Number(quantity) + Number(freeQuantity);
	                    		}
		                    	else if(freeQuantity != '' || freeQuantity != "0")
	                    		{
									var checkFreeQuantity = /^[0-9]+$/;
						    		if(freeQuantity.match(checkFreeQuantity))
						    		{
						    			quantity = Number(quantity) + Number(freeQuantity);
						    		}
						    		else
						    		{
					    				 var msg="Please Enter Valid Free Quantity";
		 		                    	   var dialog = bootbox.dialog({
	                    					//title: "Embel Technologies Says :",
	                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
	                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
	                    				    closeButton: false
	                    				});
		 		                    	  setTimeout(function() {
		                    					dialog.modal('hide');
		                    				}, 1500);
	                    				 
	                    				 quantity = 0;
	                    				 var setZero = 0;
                                   		 $("#list4").jqGrid("setCell", rowId, "quantity", setZero);
 			                    		 $("#list4").jqGrid("setCell", rowId, "total", setZero);
                                   		 $("#list4").jqGrid("setCell", rowId, "freeQuantity", setZero);
 			                    		 
                                   		finalCalculation();
                                   		 	
	                    				return false;			                    			
						    		}
	                    		}
		                    	
	                    		var rowId =$("#list4").jqGrid('getGridParam','selrow');
                    			var rowData = jQuery("#list4").getRowData(rowId);
                    			var stockInTotalPieceQuantity = rowData['totalKgLtrPiece'];	
                    			
                    			if(quantity != '')
                    			{
                    			 var checkQuantity = /^[0-9]+$/;
                    			 if(String(quantity).match(checkQuantity) || String(quantity) == "")
                    			 {}
                    			 else
                    			 {	                    				 
                    				 var msg="Please Enter Valid Quantity";
	 		                    	   var dialog = bootbox.dialog({
                    					//title: "Embel Technologies Says :",
                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
                    				    closeButton: false
                    				});
	 		                    	  setTimeout(function() {
	                    					dialog.modal('hide');
	                    				}, 1500);
                    				 
                    				 quantity = 0;
                    				 var setZero = 0;
                               		 $("#list4").jqGrid("setCell", rowId, "quantity", setZero);
			                    		 $("#list4").jqGrid("setCell", rowId, "total", setZero);
                               		 $("#list4").jqGrid("setCell", rowId, "freeQuantity", setZero);
			                    		 
                               		finalCalculation();
                               		 	
                    				return false;
                    			 	}
                    			}
                    			
                    			 
	                    		if(expiryDate =='N/A')
	                    		{	
	                    			if ( Number(quantity) > Number(stockInTotalPieceQuantity))
				                    	{
                    					   var msg = productName+" Available Stock For Expiry Date : "+expiryDate+" = "+stockInTotalPieceQuantity+" Pieces";
		 		                    	   var dialog = bootbox.dialog({
	                    					//title: "Embel Technologies Says :",
	                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
	                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
	                    				    closeButton: false
		 		                    	   });
	                    				
		 		                    	   setTimeout(function()
		 		                    		{
	                    					dialog.modal('hide');
		 		                    	   }, 1500);
		 		                    	   
		 		                    	   var setFq = 0;
		 		                    	   $("#list4").jqGrid("setCell", rowId, "freeQuantity", setFq);
		 		                    	   $("#list4").jqGrid("setCell", rowId, "quantity", setFq);
				                    	   $("#list4").jqGrid("setCell", rowId, "total", setFq);
				                    	   
				                    	   finalCalculation();					                    		
		 		                    	   return false;
			                    	}	                    			 
	                    		}
                    			else if(expiryDate !='N/A')
                    			{	
                    				if ( Number(quantity) > Number(stockPerEntry))
			                    	{
			                    		   var msg = productName+" Available Stock For Expiry Date : "+expiryDate+" = "+stockPerEntry+" Pieces";
		 		                    	   var dialog = bootbox.dialog({
	                    					//title: "Embel Technologies Says :",
	                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
	                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
	                    				    closeButton: false
	                    				});
		 		                    	  setTimeout(function() {
		                    					dialog.modal('hide');
		                    				}, 1500);
			                    		
			                    		var tota = 0;
			                    		var quantity = 0;
			                    		$("#list4").jqGrid("setCell", rowId, "total", tota);
			                    		$("#list4").jqGrid("setCell", rowId, "quantity", quantity);
		 		                    	$("#list4").jqGrid("setCell", rowId, "freeQuantity", quantity);
			                    		
		 		                    	finalCalculation();
			                    	}
                    			}
		                    	if (iGst != 0 || iGst != undefined || Number(quantity) > 0 || quantity == '')
		                    	{
	                    			var taxPercentage = iGst;
		                    		var taxAmount = ((taxPercentage/100)*salePrice);
		                    		var BuyPriceWithTaxAmount = Number(taxAmount) + Number(salePrice);
		                    		var tota = Number(quantity - freeQuantity) * salePrice;
		                    		tota = Math.round(tota * 100) / 100;
		                    		$("#list4").jqGrid("setCell", rowId, "total", tota);
			                    }
		                    	else if(iGst == 0 || iGst == undefined || Number(quantity) > 0 || quantity == '')
		                    	{
		                    		Gst = 0;
		                    		var  taxPercentage = Number(Gst);
		                    		var taxAmount = ((taxPercentage/100)*salePrice);
		                    		var BuyPriceWithTaxAmount = Number(taxAmount) + Number(salePrice);
		                    		var tota = Number(quantity - freeQuantity) * salePrice;
		                    		tota = Math.round(tota * 100) / 100;
		                    		$("#list4").jqGrid("setCell", rowId, "total", tota);
		                    				                    		
		                    	}
		                    	
		                    	if(freeQuantity == "")
		                    	{}
		                    	else
		                    	{
		                    		var checkFreeQuantity = /^[0-9]+$/;
		                    		if(freeQuantity.match(checkFreeQuantity))
		                    		{}
		                    		else
		                    		{	
		                    			 var msg="Please Enter Valid Free Quantity";
		 		                    	   var dialog = bootbox.dialog({
	                    					//title: "Embel Technologies Says :",
	                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
	                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
	                    				    closeButton: false
	                    				});
		 		                    	  setTimeout(function() {
		                    					dialog.modal('hide');
		                    				}, 1500);
		 		                    	  
		 		                    	  	var setFq = 0;
	                                   		$("#list4").jqGrid("setCell", rowId, "freeQuantity", setFq);
		                    		}
		                    	}
		                    }
		                    
		                    finalCalculation();
		                    
		                    
		                    var quantity = rowData['quantity'];
							var iGst = rowData['igst'];
							var DiscountAmount= rowData['DiscountAmount'];
							var Discount= rowData['Discount'];
							var TotalEx= rowData['TotalEx'];
							

							/////calculation of gst////
														
							var checkDiscount = /^[0-9]+\.?[0-9]*$/;
							  if(Discount.match(checkDiscount))
							  {
								  if(Number(Discount) >= 100)
						  	  {
						  		  var setZero = 0;
						  		  //alert("In discount")
						  		  myAlert("Discount Percentage Must Be Less Than 100");
						  	      $("#list4").jqGrid("setCell", rowId, "DiscountAmount", setZero);
						      	  totalCalC();
						      	  totalDisC();
						  		  return false;
						  	  }
							  }
							  else
							  {
								  var setZero = 0;
								  
								  if(Discount== "")
						  	  {
						  		 
						  		  $("#list4").jqGrid("setCell", rowId, "DiscountAmount", setZero);
						      	  
						  	  }
								  else
								  {
						  		  myAlert("Pleaee Enter Valid Discount value");
						  		  $("#list4").jqGrid("setCell", rowId, "DiscountAmount", setZero);
						      	  totalCalC();
						      	  totalDisC();
						      	  return false;
								  }
							  }			
							  
							//sale price excluding tax calc//
							  var checksalePrice= /^[0-9]+\.?[0-9]*$/;
							  if(salePrice.match(checksalePrice))
						    {
						      	  if(Number(salePrice) > 0)
						  		  {
						      		 
						      		  spwTax = (salePrice/(1+(gst/100)));
						      		  $("#list4").jqGrid("setCell", rowId, "salePriceEx",  spwTax.toFixed(2));
						      	  
						      	if(Number(Discount) > 0)
						      	 {
						      		 if(Number(gst) > 0)
						      		 {  
						      			 
						      		     DiscountAmount= (spwTax*(Discount/100));
						      			  finalsp = spwTax- DiscountAmount;
						      			  newTaxAmt = (((finalsp*quantity)*gst)/100);
						      			  
						      			  var oneProTax = (((finalsp)*gst)/100);
						      			  newFinalsp = finalsp+ oneProTax;
						      			  tota = newFinalsp* quantity;
						      			  //DiscountAmount = DiscountAmount * quantity;
						      			 
						      		$("#list4").jqGrid("setCell", rowId, "DiscountAmount", DiscountAmount.toFixed(2));	  
								    $("#list4").jqGrid("setCell", rowId, "TotalEx", finalsp.toFixed(2));
								    $("#jqGrid").jqGrid("setCell", rowId, "DiscountAmount", DiscountAmount.toFixed(2));
								    $("#list4").jqGrid("setCell", rowId, "total", tota.toFixed(2));
								  $("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", newTaxAmt.toFixed(2));
								     totalCalC();
								     totalDisC();	
						      		}
						      	else if(Number(gst) == 0)
						      	{
						      		 var setZero = 0;
						      		spwTax= saleprice - 0;
						      		DiscountAmount = (spwTax*(Discount/100));
						      		finalsp= spwTax- DiscountAmount;
						      		newTaxAmt = ((( finalsp*quantity)*gst)/100);				        			  
						      		var oneProTax = (((finalsp)*gst)/100);
						      		newFinalsp =  finalsp+ oneProTax;	        			  
						      		tota = newFinalsp * quantity;
						      		DiscountAmount = DiscountAmount* quantity;
						      			 	
						      			  
						      $("#list4").jqGrid("setCell", rowId, "TotalEx", finalsp.toFixed(2));
							  $("#list4").jqGrid("setCell", rowId, "DiscountAmount", DiscountAmount.toFixed(2));
							  $("#list4").jqGrid("setCell", rowId, "total", tota.toFixed(2));
							  $("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", newTaxAmt.toFixed(2));
							  totalCalC();
							  totalDisC();
						      	}
						      	  
						      	// }
					else
						    {
						     var setZero = 0; 
							  $("#list4").jqGrid("setCell", rowId, "DiscountAmount", setZero);
						    $("#list4").jqGrid("setCell", rowId, "Total", tota.toFixed(2));
						    $("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero);
						     }
						        }
					else
				         {
						  	var setZero = 0;
						  $("#list4").jqGrid("setCell", rowId, "sPWithoutTax", setZero);
						    $("#list4").jqGrid("setCell", rowId, "DiscountAmount", setZero);
						    $("#list4").jqGrid("setCell", rowId, "total", setZero);
						  $("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero);
						    return false;
							}
						    }				        	  
					else
						{
							var setZero = 0;
							alert("Pleae Enter Valid Buy Price");
							$("#list4").jqGrid("setCell", rowId, "salePrice", setZero);
							$("#list4").jqGrid("setCell", rowId, "salePriceEx", setZero);
						  	$("#list4").jqGrid("setCell", rowId, "DiscountAmount", setZero);
						  	$("#list4").jqGrid("setCell", rowId, "total", setZero);
						   $("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero);
								  return false;
							 }
							
							if(Gst!=0)
							{
							var taxpercentage = Gst;
							var salepriceEx=saleprice(1+(taxpercentage/100)));
							
							
						$("#jqGrid").jqGrid("setCell",rowId,"salepriceEx",salepriceEx);
						
						return false;
			                         }
							
							  //out of grid calc//
							
								function totalCalC()
								{	
								       var Total = 0;
								       var totAmtWithTax = 0;
								       var count = jQuery("#list4").jqGrid('getGridParam', 'records');
								       var allRowsInGrid1 = $('#list4').getGridParam('data');
								        var AllRows=JSON.stringify(allRowsInGrid1);
								        	  
								       for (var k = 0; k < count; k++)
								       {
								          var Total1 = allRowsInGrid1[k].total;//grid total 

								        if(Total1 != undefined)
								        {
								        		Total = +Total + +Total1;
								        		  }
								        	  }
								        	  for (var j = 0; j < count; j++)
								        	  {
								        		  var Total2 = allRowsInGrid1[j].taxAmount;
								        		  var Total3 = allRowsInGrid1[j].total;
								        		  if(Total2 != undefined)
								        		  {
								        			  totAmtWithTax = +totAmtWithTax + +Total2 + +Total3;
								        		  }
								        	  }
								        	 document.getElementById("totalWithExpense").value = Total.toFixed(2);//Math.round(Total);
								        	  document.getElementById("grossTotal").value = Total.toFixed(2);//Math.round(Total);
								        	  var totAmount = Total.toFixed(2);//Math.round(Total);
									        }
								        	  
								      function totalDisC()
									   {
										    //TOTAL DISCOUNT AMOUNT
										       var TotalDisAmt = 0;
										        var TotalsPAmt = 0;
										        var disPer = 0;
										        var count = jQuery("#list4").jqGrid('getGridParam', 'records');
										        var allRowsInGrid1 = $('#list4').getGridParam('data');
										        var AllRows=JSON.stringify(allRowsInGrid1);
										        for (var l = 0; l < count; l++)
										        {
										          var TotalDisAmt1 = allRowsInGrid1[l].DiscountAmount;
										          var TotalsPAmt1 = allRowsInGrid1[l].salePriceEx;
										        		  
										        if(TotalsPAmt1 != undefined)
										        {
										        	TotalsPAmt = (+TotalsPAmt + +TotalsPAmt1).toFixed(2);
										        }
										        if(TotalDisAmt1 != undefined)
										        {
										        	TotalDisAmt = (+TotalDisAmt + +TotalDisAmt1).toFixed(2);
										        	disPer = ((TotalDisAmt/TotalsPAmt)*100).toFixed(2);
										        }						        	 
										        	  }
										        	  document.getElementById("discount1").value = disPer;
										        	 // document.getElementById("discount").value = TotalDisAmt;
									        	 }
		                    
		                    
		                    function finalCalculation()
		                    {
		                    		var Total = 0;
		                    		var Total1 = 0;
		                    		var count = jQuery("#list4").jqGrid('getGridParam', 'records');
		        		        	var allRowsInGrid1 = $('#list4').getGridParam('data');
		        		        	var AllRows=JSON.stringify(allRowsInGrid1);
		        		        	for (var k = 0; k < count; k++)
		        		        	{
		        		        		Total1 = allRowsInGrid1[k].total;
		        		        		if(Total1 == undefined)
		        		        			{
		        		        				Total1 = 0;
		        		        			}
		        		        		Total = +Total + +Total1;
		        		        		Total = Math.round(Total * 100) / 100;
		        		        		
		        		        	}
		        		        	
		        		        	document.getElementById("totalWithExpense").value = Total;
		        		        	document.getElementById("grossTotal").value = Total;
	        		        		
		                    }
                    },
		//},
        	
     
		pager: "#jqGridPager",
		
	});
	

	//$("#list4").addRowData(i+1,jsonData[i]);
	if(count==0 || count==null)
	{
		 // $("#list4").addRowData(i,jsonData[i]);
		  $("#list4").addRowData(0,jsonData.offer);
	}
	


	 $('#list4').navGrid('#jqGridPager',
                
                { edit: true, add: false, del: true, search: true, refresh: true, view: true, position: "left", cloneToTop: false },
                
                {
                    editCaption: "The Edit Dialog",
                   
                    afterSubmit: function () {
						
                      var grid = $("#list4"),
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
                	
					

					afterComplete: function() {
                		$('#list4').trigger( 'reloadGrid' );

                		
                		document.getElementById("discount").value = 0;
		 				document.getElementById("discountAmount").value = 0;
		 				document.getElementById("hamaliExpence2").value = 0;
		 				document.getElementById("hamaliExpence").value = 0;	                		
                		
 				        	Calculation of total after editing quantity
 				        	   
 				        	   // $(this).trigger('reloadGrid');
 				        	   var rowId =$("#list4").jqGrid('getGridParam','selrow');  
 		                       var rowData = jQuery("#list4").getRowData(rowId);
 		                    	var quantity = rowData['quantity'];
 		                    	var salePrice = rowData['salePrice'];
 		                    	var kg = rowData['kg'];
		                    	//alert("kg entered = "+kg);
		                    	var grams = rowData['grams'];
		                    	//alert("grams entered = "+grams);
 		                    	var iGst = rowData['igst'];
 		                    	var Gst = rowData['gst'];
 		                    	
 		                    	///productId = $('#proName').val();
 		                    	
 		                    	
 		                    	//var productName=$('#productName').val(); 
 		                    	
 		                    	$("#proName option:selected").each(function() {
 		                    		   selectedVal = $(this).text();
 		                    		});
 		                    	
 		                    	///var splitText = selectedVal.split(",");
 		                    	//var splitTextforproduct =productName.split(",");
 		                   	
 		                    	var stock = splitText[4];
 		                    	
 		                    	var salePricePerGram = 0;
		                    	salePricePerGram = (Number)(salePrice/1000);
		                    	
		             
	                    	if(Number(grams) != "" || Number(kgValue) != "")
	                    	{
		                    	if(Number(kg)>0 && Number(grams) == 0)
                    			{
		                    		var salePriceKgTota = 0;
		                    		salePriceKgTota = Number(salePrice)*kg;
		                    		salePriceKgTota = Math.round(salePriceKgTota * 100) / 100;
                    				$("#list4").jqGrid("setCell", rowId, "total", salePriceKgTota);
                    			}
		                    	
		                    	if(Number(grams)>0 && Number(kg) == 0)
                    			{
		                    		var salePriceGramTota = 0;
		                    		salePriceGramTota = Number(salePricePerGram)*grams;
		                    		salePriceGramTota = Math.round(salePriceGramTota * 100) / 100;
                    				$("#list4").jqGrid("setCell", rowId, "total", salePriceGramTota);
                    			}
		                    	
		                    	if(Number(kg) > 0 && Number(grams) > 0)
                    			{
		                    		var salePriceKgTota = 0;
		                    		var salePriceGramTota = 0;
		                    		var salePriceKgPlusGrams = 0;
		                    		salePriceKgTota = Number(salePrice)*kg;
		                    		salePriceGramTota = Number(salePricePerGram)*grams;                    		
		                    		salePriceKgPlusGrams = Number(salePriceKgTota) + Number(salePriceGramTota);
		                    		salePriceKgPlusGrams = Math.round(salePriceKgPlusGrams * 100) / 100;
                    				$("#list4").jqGrid("setCell", rowId, "total", salePriceKgPlusGrams);
	                    		}
		                    	
		                    	var Total =0;
		                    		var count = jQuery("#list4").jqGrid('getGridParam', 'records');
		        		        	var allRowsInGrid1 = $('#list4').getGridParam('data');
		        		        	var AllRows=JSON.stringify(allRowsInGrid1);
		        		        	for (var k = 0; k < count; k++) {
		        		        		var Total1 = allRowsInGrid1[k].total;
		        		        		Total = +Total + +Total1;
		        		        		Total = Math.round(Total * 100) / 100;
		        		        	}
		        		        	document.getElementById("totalWithExpense").value = Total;
		        		        	document.getElementById("grossTotal").value = Total;
		                        	
	                    	}
 		                    	if ( Number(quantity) > Number(stock))
 		                    	{
 		                    		
 		                    		alert("Available stock = "+stock);
 		                    		
 		                    		
 		                    		
 	                    		
 	                    	        }
 		                    	
 		                    		if (iGst != 0){
 		                    			var taxPercentage = iGst;
 			                    		var taxAmount = ((taxPercentage/100)*salePrice);
 			                    		var BuyPriceWithTaxAmount = Number(taxAmount) + Number(salePrice);
 			                    		var tota = quantity * salePrice;
 			                    		tota = Math.round(tota * 100) / 100;
 			                    		$("#list4").jqGrid("setCell", rowId, "total", tota);
	 		                    	}
	 		                    	else if(iGst == 0){
 		                    		var  taxPercentage = Number(Gst);
 		                    		var taxAmount = ((taxPercentage/100)*salePrice);
 		                    		var BuyPriceWithTaxAmount = Number(taxAmount) + Number(salePrice);
 		                    		var tota = quantity * salePrice;
 		                    		tota = Math.round(tota * 100) / 100;
 		                    		$("#list4").jqGrid("setCell", rowId, "total", tota);
	 		                    		
	 		                    	}
	 		                    		
	 		                    		var Total =0;
	 		                    		var count = jQuery("#list4").jqGrid('getGridParam', 'records');
	 		        		        	var allRowsInGrid1 = $('#list4').getGridParam('data');
	 		        		        	var AllRows=JSON.stringify(allRowsInGrid1);
	 		        		        	for (var k = 0; k < count; k++) {
	 		        		        		var Total1 = allRowsInGrid1[k].total;
	 		        		        		Total = +Total + +Total1;
	 		        		        		Total = Math.round(Total * 100) / 100;
	 		        		        	}
	 		        		        	document.getElementById("totalWithExpense").value = Total;
	 		        		        	document.getElementById("grossTotal").value = Total;
	 	        		        		//document.getElementById("duptotal").value = Total;
	 		                    	
 		        	
					},
					reloadAftersubmit:true,	
                    errorTextFormat: function (data) {
                        return 'Error: ' + data.responseText
                    }
                		
                });
	 
	 
		   });
	
	})
} */         
      
/*++++++++++++++ Fetch product details by product name for cash customer 03-10-2019 ++++++++++++++++++++++++++*/
function getProductDetailsByProductName()
{	
	var params= {};
	itemparams = {};
	
	var barcodeNo = $('#barcodeNo').val();
	var productId = $('#productIdCash').val();
	
	var splitText = productId.split(" => ");
	
	var proName = splitText[0];
	var barcode = splitText[1];
	var company = splitText[2];
	var subCatId = splitText[7];
	var weight= splitText[5];
	var catId = splitText[8];
	var expiryDate = splitText[9];
	var packed = splitText[10];
	var proid = splitText[11];
	
	params["proName"]= proName;
	params["barcode"]= barcode;
	params["productId"]= productId;
	params["company"]= company;
	params["weight"]= weight;
	params["catId"]= catId;
	params["subCatId"]= subCatId;
	params["expiryDate"]= expiryDate;
	params["packed"] = packed;
	params["barcodeNo"]= barcodeNo;	
	params["proid"] = proid;
	document.getElementById('barcodeNo').value = "";
	
	var count=0;
	var newrow;
	var rowId;
	
	params["methodName"] = "getProductDetails1";
	
	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
 	   {
		  var jsonData = $.parseJSON(data);
//		   $("#list4").jqGrid("clearGridData", true).trigger("reloadGrid");    
	     $.each(jsonData,function(i,v)
		 { 
	    	 
			  var gTotal=0;
			  var aaa = document.getElementById("totalWithExpense").value;
			  if(aaa=="" || aaa==null || aaa==undefined){
				  aaa=0;
			  }
					{
			    		gTotal = +gTotal + +v.total;
			    		aaa = +aaa + +gTotal;
					}
			    	document.getElementById("totalWithExpense").value = aaa;  
			    	document.getElementById("grossTotal").value = aaa;
					//			    	document.getElementById("totalWithExpense").value = gTotal;  
//			    	document.getElementById("grossTotal").value = gTotal;
			    	
	
	        function sumFmatter (cellvalue, options, rowObject)
	        {	 
	        	//			var tot= (options.rowData.quantity * options.rowData.prrice);
	        //	var toss=0;
	        //	var tots= (options.rowData.total);
             //   toss = toss+tots;
	        	var jam=0;
	        	var tot1=0;

	        	count = jQuery("#list4").jqGrid('getGridParam', 'records');
	        	var allRowsInGrid1 = $('#list4').getGridParam('data');
	        	var AllRows=JSON.stringify(allRowsInGrid1);
	        	for (var i = 0; i < count; i++)
	        	{	        		
	        		var kg = allRowsInGrid1[i].kg;
	        		params["kg"+i] = kg;
	        		
	        		var grams = allRowsInGrid1[i].grams;
	        		params["grams"+i] = grams;
	        		
	        		var defQuantity = 1;	        		
	            	var quantity = allRowsInGrid1[i].quantity;
	            	params["quantity"+i] = quantity;
	             	
	             	var sp = allRowsInGrid1[i].sp;
	            	params["sp"+i] = sp;                        //sale Price
	            	
	            	var cgst = allRowsInGrid1[i].cgst;
	            	params["cgst"+i] = cgst;
	            	
	            	var sgst = allRowsInGrid1[i].sgst;
	            	params["sgst"+i] = sgst;
					  
//	            	var tot2 = allRowsInGrid1[i].total;
//	            	tot1 = +tot1 + +tot2;	            	
	            	
					  vatPercentage = +cgst+ +sgst;               //gst percentage
	            	
	            	
	            	
	            	if(vatPercentage == 0){
	            		
	            		var totals1=(sp)*(quantity);
	            		if(isNaN(totals1)){
		             		totals1 = 0;
						}
		            	jam = jam + totals1;
	            	}
	            	
	                if(vatPercentage != 0){
	                	
	                	var taxcal = (vatPercentage/100) * sp;
	                	var newSalePrice = Number(sp) + Number(taxcal);
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
	        
	         count = jQuery("#list4").jqGrid('getGridParam', 'records'); 
		     var rowdata =$("#list4").jqGrid('getGridParam','data');
		     var ids = jQuery("#list4").jqGrid('getDataIDs');
		    // var allRowsInGrid11 = $('#list4').getGridParam('data');
		     //var AllRowss=JSON.stringify(allRowsInGrid11);
		     
			  var prodName, com, packing, unit, expiryDate, barcodeno2,subcat,cat,proid,pack;
			  var tot=0;
			  for (var j = 0; j < count; j++) 
			  {
				  prodName = rowdata[j].itemName;
				  com = rowdata[j].companyName;
				  packing = rowdata[j].weight;
				  unit = rowdata[j].unitName;
				  expiryDate = rowdata[j].expiryDate;
				  barcodeno2 = rowdata[j].barcodeNo;
				  cat = rowdata[j].cat_id;
				  subcat = rowdata[j].sub_cat_id;
				  proid = rowdata[j].productPkId;
				  pack = rowdata[j].packtype;
				  
				  tot= rowdata[j].total;
				  gTotal = gTotal + tot;

				 var rowId = ids[j];
				 var rowData = jQuery('#list4').jqGrid ('getRowData', rowId);
				var abc =	document.getElementById("totalWithExpense").value; 
				var av=0;
		//		if (prodName == v.itemName && com == v.companyName && packing == v.weight && unit == v.unitName && expiryDate == v.expiryDate && barcodeno2 == v.barcodeNo)
					if (prodName == v.itemName && com == v.companyName && packing == v.weight && unit == v.unitName && proid==v.productPkId && cat==v.cat_id && subcat==v.sub_cat_id)				
//					if (prodName == v.itemName && com == v.companyName && packing == v.weight && unit == v.unitName && proid==v.productPkId && cat==v.cat_id && subcat==v.sub_cat_id && pack==v.packtype)						
					{
			    	ori_quantity = +rowdata[j].quantity+0;
			    	
			    	$("#list4").jqGrid("setCell", rowId, "quantity", ori_quantity);
			    	var grid = jQuery("#list4");
			  //  	grid.trigger("reloadGrid");
			    	newrow=false;
					av = abc - tot;
			    	document.getElementById("totalWithExpense").value = av;  
			    	document.getElementById("grossTotal").value = av;				  			  

					alert("Product Name Already Inserted !!!");
					var grid = jQuery("#list4");
			//	    grid.trigger("reloadGrid");
			    	break;
				}
				else
				{
					newrow = true;
//			    	document.getElementById("totalWithExpense").value = gTotal;  
//			    	document.getElementById("grossTotal").value = gTotal;				  			  
				}
			 }					 
			  

		    	


			  

		    	
			  if(newrow == true)
				 {
				  $("#list4").addRowData(count,jsonData[i]);
				  for(var i=0; i<count; i++)
					  {
					  	if(count[i] == 10)
					  	{
					  								  		
					  	}					  
					  }					
				 }

/*			  var quantity = 1;*/ 
		
		$("#list4").jqGrid({
			datatype: "local",
			
			colNames:[  'cat_id',
						'sub_cat_id',
						'Barcode<br>No',
						'Sub Category',
						'Product<br>Name',
						'Company<br>Name',
						'HSN',
						'Batch<br>No.',
						'MRP',
/*						"Sale<br>Price",*/
						'SP<br>Incl<br>Tax',
						'SP<br>Excl<br>Tax',
						'Quantity',
						"Weight",
						'Unit',
						'SGST%',
						'CGST%',
						'IGST%',
						'Disc %',
						'Disc<br>Amt',
						'Total<br>Excl<br>Tax',
/*						'Total<br>Incl<br>Tax',*/
						'Pkg',
						'Qty',
						'Free<br>Qty',
						'Expiry<br>Date',
						'Total',
						'totalKgLtrPiece',
						'stockPerEntry',
						'PkGoodreceiveId',
						'Product ID',
						'Barcode ID',
						],
			
			colModel:[ 
					     {
					    	 name:'cat_id',
					    	 hidden:true,
					    	 align:'center',
					     },		
					     {
					    	 name:'sub_cat_id',
					    	 hidden:true,
					    	 align:'center',
					     },	
					     
					     {	 name:'barcodeNo',
					    	 width:100,
					    	 align:'center',
						 },	
						 {	 name:'subcat',
					    	 width:100,
					    	 align:'center',
						 },
					     {	 name:'itemName',
					    	 width:120,
					    	 align:'center',
							
						 },						
					     {	 name:'companyName',
					    	 width:120,
					    	 align:'center',
							
						},
						{	 name:'hsn',
							 width:80,
					    	 align:'center',
					    	 hidden:true,
						},

						{	 name:'batchNumber',
							 width:80,
					    	 align:'center',
					    	 hidden: true,
						},	
						
						{	 name:'mrp',
							 width:100,
							 editable: false,
					    	 align:'center',
					    	 hidden: true,
						},

						{	 name:'sp',                        // sale price
							 width:100,
							 editable: true,
					    	 align:'center',
						},
						{	 name:'salePriceEx',
							 width:100,
							 editable: false,
					    	 align:'center',
						},											

						{    name:'noOfboxes',
							 width:100,
							 hidden:false,
							 editable:true,
					    	 align:'center',
						},
						{
							name: 'weight',
							 width:80,
					    	 align:'center',
							
						},
						{	 id:'unitName', 
							 name:'unitName',
							 width:90,
							 align:'center',
						},	
						{	 name:'sgst',
							 width:80,
							 editable: true,
					    	 align:'center',
						},
						{	 name:'cgst',
							 width:80,
							 editable: true,
					    	 align:'center',
						},
						{	 name:'igst',
							 width:80,
							 editable: true,
					    	 align:'center',	
						},
						{	 name:'Discount',
							 width:100,
							 hidden:true,
							 editable:true,
					    	 align:'center',
						},
						{	 name:'DiscountAmount',
							 width:100,
							 hidden:true,
					    	 align:'center',
						},
						{	 name:'TotalEx',       //price ex amount
							 width:100,
							 align:'center',
						},
						{    name:'weight',
							 width:100,
							 hidden:true,
					    	 align:'center',
					    	 editable:true,
						},
						{	
							id:'quantity',
							name:'quantity',
							width:100,
							editable: false,
							align:'center',
							hidden: true,
						},
						{	
							id:'freeQuantity',
							name:'freeQuantity',
							width:100,
							//editable: true,
							align:'center',	
							hidden:true,
						},						
					
						{	id:'expiryDate', 
							name:'expiryDate',
							width:140,
							align:'center',
							editable: false,
							hidden:true,
						},						
						{	name:'total',
							width:120,
							align:'center',
							//formatter: sumFmatter
						},						
						{	name:'totalKgLtrPiece',    // available Qty Check
							width:150,
							hidden:true,
							align:'center',
							//formatter: sumFmatter
						},
						{	name:'stockPerEntry',         // Original Quantity
							width:150,
							hidden:true,
							align:'center',
							//formatter: sumFmatter
						},
						{	name:'PkGoodreceiveId',
							width:150,
							hidden:true,
							align:'center',
							//formatter: sumFmatter
						},
						{	name:'productPkId',
							width:150,
							hidden:true,
							align:'center',
							//formatter: sumFmatter
						},
						{	name:'barcode_id',
							width:150,
							editable:true,
							hidden:true,
							align:'center',
							//formatter: sumFmatter
						}
			],
				
			sortorder : 'desc',
			loadonce: false,
			viewrecords: true,
			//width: 1200,
			shrinkToFit:true,
			rowheight: 300,
          	hoverrows: true,
	        rownumbers: true,
	        rowNum: 10,
           'cellEdit':true,
            autowidth:true,
            pgbuttons : false,
            pginput : false,
           
          afterSaveCell: function grossTotal()
		  {
            	       	document.getElementById("discount").value = 0;
		 				document.getElementById("discountAmount").value = 0;
		 				document.getElementById("hamaliExpence2").value = 0;
		 				document.getElementById("hamaliExpence").value = 0;
            	
            	        	   var rowId =$("#list4").jqGrid('getGridParam','selrow');
				        	   
		                       var rowData = jQuery("#list4").getRowData(rowId);
		                       productName = rowData['itemName'];
		                       var quantity = rowData['quantity'];
		                       var freeQuantity = rowData['freeQuantity'];
		                       var salePrice = rowData['sp'];
		                       var salePriceEx = rowData['salePriceEx'];
		                       var mrp = rowData['mrp'];
		                       
		                       var iGst = rowData['igst'];
		                       var cgst = rowData['cgst'];
		                       var sgst = rowData['sgst'];
		                       var gst = +cgst+ +sgst;
		                      
		                       var unit = rowData['unitName'];
		                       var stockPerEntry = rowData['stockPerEntry'];
		                       var expiryDate = rowData['expiryDate'];
		                       var barcodeNo = rowData['barcodeNo'];
		                       var discountperc = rowData['Discount'];
		                       var noOfboxes = rowData['noOfboxes'];
		                       var weight = rowData['weight'];
		                       var stockInTotalPieceQuantity = rowData['totalKgLtrPiece'];
		                      
		                      // quantity = ((Number(weight)*Number(noOfboxes)));
		                       quantity = (noOfboxes);
		                       
		                          // quantity =  +totalQty+ +quantity;
		                        $("#list4").jqGrid("setCell", rowId, "quantity", quantity);
		                        
		                           if(Number(quantity) > Number(stockInTotalPieceQuantity)){

                					   var msg = productName+" Available Stock For Barcode No : "+barcodeNo+" = "+stockInTotalPieceQuantity+" Pieces";
	 		                    	   var dialog = bootbox.dialog({
                    					//title: "Embel Technologies Says :",
                    				   /* message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',*/
                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
                    				    closeButton: false
	 		                    	   });
                    				
	 		                    	   setTimeout(function()
	 		                    		{
                    					dialog.modal('hide');
	 		                    	   }, 1500);
	 		                    	   
	 		                    	   var setFq = 0;
	 		                    	   $("#list4").jqGrid("setCell", rowId, "freeQuantity", setFq);
	 		                    	   $("#list4").jqGrid("setCell", rowId, "quantity", setFq);
			                    	   $("#list4").jqGrid("setCell", rowId, "total", setFq);
			                    	   $("#list4").jqGrid("setCell", rowId, "noOfboxes", setFq);
			                    	   
			                    	   finalCalculation();					                    		
	 		                    	   return false;
		                    	
		                           }
		                      
		                       if(noOfboxes == "")
		                       {
		                    	    noOfboxes = "0";
                   					var setZero = 0;
                   					$("#list4").jqGrid("setCell", rowId, "noOfboxes", setZero);
		                       }
		                       if(cgst == "")
		                       {
		                    	    cgst = "0";
                   					var setZero = 0;
                   					$("#list4").jqGrid("setCell", rowId, "cgst", setZero);
		                       }
		                       if(sgst == "")
		                       {
		                    	    sgst = "0";
                   					var setZero = 0;
                   					$("#list4").jqGrid("setCell", rowId, "sgst", setZero);
		                       }
		                       if(iGst == "")
		                       {
		                    	    igst = "0";
                   					var setZero = 0;
                   					$("#list4").jqGrid("setCell", rowId, "igst", setZero);
		                       }
		                       if(freeQuantity == "")
		                       {
		                    	   	freeQuantity = "0";
                   					var setZero = 0;
                   					$("#list4").jqGrid("setCell", rowId, "freeQuantity", setZero);
		                       }
		                       if(quantity == "")
		                       {
		                    	    quantity = "0";
                   					var setZero = 0;
                   					$("#list4").jqGrid("setCell", rowId, "quantity", setZero);
		                       }
		                       else{
		                    	   
		                    	   /*var checkQuantity = /^[0-9]+\.?[0-9]*$/;
		                    	   if(Number(quantity) == Number(checkQuantity))
									{

									} else {
										var msg = "Please Enter Valid Quantity";
										var dialog = bootbox.dialog({
																															 
										message : '<p class="text-center">'+ msg.fontcolor("red").fontsize(5)+ '</p>',
										closeButton : false
										});
	
										setTimeout(
										function() 
										{
										dialog.modal('hide');
										},1500);
											
										var setZero = 0;
	                   					$("#list4").jqGrid("setCell", rowId, "quantity", setZero);
										 
										return false;
									}*/
		                    	}
		                       
		                       if(discountperc == "")
		                       {
		                    	    discountperc = "0";
                   					var setZero = 0;
                   					$("#list4").jqGrid("setCell", rowId, "Discount", setZero);
		                       }
		                        		                       
		                       var sPrice = v.salePrice;
		                 		                       
		                       if(salePrice != "")
		                       {
		                    	   var checkprice = /^[0-9]+\.?[0-9]*$/;
		                    	   if(salePrice.match(checkprice))
		                    	   {}
		                    	   else
		                    	   {
		                    		   var msg="Please Enter Valid Sale Price";
	                    				var dialog = bootbox.dialog({
	                    				
	                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
	                    				    closeButton: false
	                    				});
	                    				
	                    				setTimeout(function() {
	                    					dialog.modal('hide');
	                    				}, 1500);
	                    				                    				
			                    		$("#list4").jqGrid("setCell", rowId, "salePrice", sPrice);
			                    		
			                    		finalCalculation();
			                    	                    				
	                    				return false;
		                    	   }
		                       }
		                       
		                       if(mrp != "")
		                       {
		                    	   var checkprice = /^[0-9]+\.?[0-9]*$/;
		                    	   if(mrp.match(checkprice))
		                    	   {}
		                    	   else
		                    	   {
		                    		   var msg="Please Enter Valid MRP";
	                    				var dialog = bootbox.dialog({
	                    					
	                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
	                    				    closeButton: false
	                    				});
	                    				
	                    				setTimeout(function() {
	                    					dialog.modal('hide');
	                    				}, 1500);
	                    				
	                    				var setZero = 0;
	                    				$("#list4").jqGrid("setCell", rowId, "mrp", setZero);
	                    				
	                    				
	                    				finalCalculation();
	                    				
	                    				/*var setZero = 0;
			                    		$("#list4").jqGrid("setCell", rowId, "total", setZero);
			                    		
			                    		var Total = 0;
			                    		var Total1 = 0;
			                    		var count = jQuery("#list4").jqGrid('getGridParam', 'records');
			        		        	var allRowsInGrid1 = $('#list4').getGridParam('data');
			        		        	var AllRows=JSON.stringify(allRowsInGrid1);
			        		        	for (var k = 0; k < count; k++)
			        		        	{
			        		        		Total1 = allRowsInGrid1[k].total;
			        		        		if(Total1 == undefined)
			        		        			{
			        		        				Total1 = 0;
			        		        			}
			        		        		Total = +Total + +Total1;
			        		        		Total = Math.round(Total * 100) / 100;
			        		        		
			        		        	}
			        		        	
			        		        	document.getElementById("totalWithExpense").value = Total;
			        		        	document.getElementById("grossTotal").value = Total;*/
	                    				
	                    				return false;
		                    	   }
		                       }
		                       
		                       /*var vPercentage = v.vatPercentage; 
		                       
		                     
		                       if(vatPercentage != "")
		                       {
		                    	   
		                    	   var checkTax = /^[0-9]+$/;
		                    	   if(vatPercentage.match(checkTax))
		                    	   {}
		                    	   else
		                    	   {
		                    		   var msg="Please Enter Valid GST %";
	                    				var dialog = bootbox.dialog({
	                    					//title: "Embel Technologies Says :",
	                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
	                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
	                    				    closeButton: false
	                    				});
	                    				
	                    				setTimeout(function() {
	                    					dialog.modal('hide');
	                    				}, 1500);
	                    				
	                    				
	                    				
			                    		$("#list4").jqGrid("setCell", rowId, "vatPercentage", vPercentage);
	                    				
	                    				return false;
		                    	   }
		                       }*/
		                       
		                       if(mrp == "" || mrp == "0")
		                       {}
		                       else
		                       {
			                       if(Number(salePrice) > Number(mrp))
			                       {
			                    	   var msg="MRP must be Greater Than Sale Price";
	                    				var dialog = bootbox.dialog({
	                    					
	                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
	                    				    closeButton: false
	                    				});
	                    				
	                    				setTimeout(function() {
	                    					dialog.modal('hide');
	                    				}, 1500);
	                    				
	                    				var setZero = 0;
	                   					$("#list4").jqGrid("setCell", rowId, "sp", setZero);
	                   					
	                    				return false;
	                    				
	                    				
			                       }
		                       }
		                       
		                    	/*if(unit == 'pcs')
			                    	{
			                    		$(this).jqGrid('setColProp', 'quantity', {editable:true});
			                    		$(this).jqGrid('setColProp', 'kg', {editable:false});
			                    		$(this).jqGrid('setColProp', 'grams', {editable:false});			                    		
			                    	}
			                    	else
			                    	{
			                    		$(this).jqGrid('setColProp', 'quantity', {editable:false});
			                    		$(this).jqGrid('setColProp', 'kg', {editable:true});
			                    		$(this).jqGrid('setColProp', 'grams', {editable:true});
			                    	}*/
		                    	
		                    	/*productId = $('#proName').val();
		                    	
		                    	$("#proName option:selected").each(function()
		                    		{
		                    		   selectedVal = $(this).text();
		                    		});
		                    	
		                    	var splitText = selectedVal.split(",");
		                    	
		                    	//var stockArray = {};
		                    	
		                    		var stock = splitText[4];*/
		                    		
		                    	 	/*var stockInGrams = splitText[11];
		                    		var stockInMili = splitText[12];
		                    		var stockInTotalPieceQuantity = splitText[13];*/
		                    	           	
		                    	
		                    	var salePricePerGramOrMili = salePricePerGram = (Number)(salePrice/1000);
	                    		var userTotalGramsOrMili = Number(quantity) * 1000;
		                    	
	                    		//commented on 8-10
		                    	/*if(unit == 'kg')
		                    	{		
 		                    	   		var setFq = 0;
		                    			$("#list4").jqGrid("setCell", rowId, "freeQuantity", setFq);
		                    			
		                    			var rowId =$("#list4").jqGrid('getGridParam','selrow');
		                    			var rowData = jQuery("#list4").getRowData(rowId);
		                    			var stockInKg = rowData['totalKgLtrPiece'];
		                    			var stockInGrams;
		                    			if(Number(stockInKg) > 1)
		                    			{
			                    			stockInGrams = stockInKg * 1000;
		                    			}
		                    			else
		                    			{
		                    				stockInGrams = stockInKg;
		                    			}
		                    					                    			
		                    			if(quantity != '')
		                    			{
		                    			var checkKiloLtr = /^[0-9]+\.?[0-9]{0,3}$/;
		                    			//var checkKiloLtr = /^[0-9]+\.?[0-9]*$/;
		                    			if(quantity.match(checkKiloLtr))
		                    			{
		                    				if(quantity == 0)
		                    				{
			                    				var msg="Please Enter Valid kg Value";
			                    				var dialog = bootbox.dialog({
			                    					//title: "Embel Technologies Says :",
			                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
			                    				    closeButton: false
			                    				});
			                    				
			                    				setTimeout(function() {
			                    					dialog.modal('hide');
			                    				}, 1500);

			 		                    	   	var setZero = 0;
					                    		$("#list4").jqGrid("setCell", rowId, "total", setZero);	
					                    							                    		
					                    		finalCalculation();
					                    					                    				 		                    	   
			 		                    	   return false;
		                    				}		                    				
		                    			}
		                    			else
		                    			{
		                    				var setZero = 0;
		                    				
		                    				var msg="Please Enter Valid kg Value";
		                    				var dialog = bootbox.dialog({
		                    					//title: "Embel Technologies Says :",
		                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		                    				    closeButton: false
		                    				});
		                    				
		                    				setTimeout(function() {
		                    					dialog.modal('hide');
		                    				}, 1500);
		                    						                    				
		                    				var setZero = 0;
				                    		$("#list4").jqGrid("setCell", rowId, "quantity", setZero);
				                    		$("#list4").jqGrid("setCell", rowId, "total", setZero);
				                    		
				                    		finalCalculation();
				                    						                    				                    		
				                    		return false;
		                    				}
		                    			}
		                    			
		                    			if(expiryDate =='N/A')
		                    			{
			                    			if(Number(userTotalGramsOrMili) > Number(stockInGrams))
					                    	{ 		                    				
				                    			if(Number(stockInGrams) >1000)
				                    				{
				                    					var convertedStockInKg = Number(stockInGrams)/1000;
				                    					
				                    					var msg=productName+" Available stock = "+convertedStockInKg+" Kg";
					                    				var dialog = bootbox.dialog({
					                    					//title: "Embel Technologies Says :",
					                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
					                    				    closeButton: false
					                    				});
					                    				setTimeout(function() {
					                    					dialog.modal('hide');
					                    				}, 1500);
				                    				}
				                    				else
				                    				{			                    					
				                    					var msg=productName+" Available stock = "+stockInGrams+" Grams";
					                    				var dialog = bootbox.dialog({
					                    					//title: "Embel Technologies Says :",
					                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
					                    				    closeButton: false
					                    				});
					                    				setTimeout(function() {
					                    					dialog.modal('hide');
					                    				}, 1500);
				                    				}
				                    			
					                    		var setZero = 0;
					                    		$("#list4").jqGrid("setCell", rowId, "total", setZero);
					                    		$("#list4").jqGrid("setCell", rowId, "quantity", setZero);
					                    		
					                    		finalCalculation();
					                    		
					                    	}
		                    			}
		                    			else if(expiryDate !='N/A')
		                    			{
		                    				var stockperEntryInKg = rowData['stockPerEntry'];
			                    			var stockperEntryInGrams;
			                    			if(Number(stockperEntryInKg) > 1)
			                    			{
			                    				stockperEntryInGrams = stockperEntryInKg * 1000;
			                    			}
			                    			else
			                    			{
			                    				stockperEntryInGrams = stockperEntryInKg;
			                    			}
		                    			
		                    				if(Number(userTotalGramsOrMili) > Number(stockperEntryInGrams))
					                    	{ 		                    				
				                    			if(Number(stockperEntryInGrams) >1000)
				                    				{
				                    					var convertedStockInKg = Number(stockperEntryInGrams)/1000;
				                    					
				                    					var msg=productName+" Available stock = "+convertedStockInKg+" Kg";
					                    				var dialog = bootbox.dialog({
					                    					//title: "Embel Technologies Says :",
					                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
					                    				    closeButton: false
					                    				});
					                    				setTimeout(function() {
					                    					dialog.modal('hide');
					                    				}, 1500);
				                    				}
				                    				else
				                    				{			                    					
				                    					var msg=productName+" Available stock = "+stockperEntryInGrams+" Grams";
					                    				var dialog = bootbox.dialog({
					                    					//title: "Embel Technologies Says :",
					                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
					                    				    closeButton: false
					                    				});
					                    				setTimeout(function() {
					                    					dialog.modal('hide');
					                    				}, 1500);
				                    				}
				                    			
					                    		var setZero = 0;
					                    		$("#list4").jqGrid("setCell", rowId, "total", setZero);
					                    		$("#list4").jqGrid("setCell", rowId, "quantity", setZero);
					                    							                    		
					                    		finalCalculation();
					                    		
					                    	}
		                    			}
			                    		
			                    			KgGramsLtrMiliCalculation();
			                 		}*/
		                    
		                    	//commmented on 8-10
		                    	/*if(unit == 'ltr')
	                    		{
	                    	   		var setFq = 0;
	                    			$("#list4").jqGrid("setCell", rowId, "freeQuantity", setFq);
		                    		
		                    		var rowId =$("#list4").jqGrid('getGridParam','selrow');
	                    			var rowData = jQuery("#list4").getRowData(rowId);
	                    			var stockInLtr = rowData['totalKgLtrPiece'];
	                    			var stockInMili = stockInLtr * 1000;
	                    			
	                    			var stockperEntryInLtr = rowData['stockPerEntry'];
	                    			var stockperEntryInMili;
	                    			if(Number(stockperEntryInLtr) > 1)
	                    			{
	                    				stockperEntryInMili = stockperEntryInLtr * 1000;
	                    			}
	                    			else
	                    			{
	                    				stockperEntryInMili = stockperEntryInLtr;
	                    			}
	                    			
	                    			if(quantity != '')
	                    			{
	                    			var checkKiloLtr = /^[0-9]+\.?[0-9]{0,3}$/;
	                    			if(quantity.match(checkKiloLtr))
	                    			{
	                    				if(quantity == "0")
	                    				{
			 		                    	   var msg="Please Enter ltr OR mili";
			 		                    	   var dialog = bootbox.dialog({
		                    					//title: "Embel Technologies Says :",
		                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		                    				    closeButton: false
		                    				});
			 		                    	  setTimeout(function() {
			                    					dialog.modal('hide');
			                    				}, 1500);
			 		                    	   
			 		                    	   var setZero = 0;
			 		                    	   $("#list4").jqGrid("setCell", rowId, "total", setZero);
					                    		
			 		                    	  finalCalculation();
			 		                    	   
			 		                    	  return false;
	                    				}
	                    			}
	                    			else
	                    			{
	                    				quantity = 0;
	                    				
	                    				var msg="Please Enter Valid ltr Value";
	                    				var dialog = bootbox.dialog({
	                    					//title: "Embel Technologies Says :",
	                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
	                    				    closeButton: false
	                    				});
	                    				setTimeout(function() {
	                    					dialog.modal('hide');
	                    				}, 1500);				
	                    				
	                    				var setZero = 0;
			                    		$("#list4").jqGrid("setCell", rowId, "quantity", setZero);
			                    		
			                    		finalCalculation();
			                    					                    			                    		
	                    				return false;
	                    				}
	                    			}
	                    			
	                    			
	                    			if(expiryDate =='N/A')
	                    			{
		                    		if(Number(userTotalGramsOrMili) > Number(stockInMili))
			                    	{
		                    			if(Number(stockInMili) >1000)
		                    				{
		                    					var convertedStockInLtr = Number(stockInMili)/1000;
		                    					
		                    					var msg=productName+" Available stock = "+convertedStockInLtr+" Ltr";
				 		                    	   var dialog = bootbox.dialog({
			                    					//title: "Embel Technologies Says :",
			                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
			                    				    closeButton: false
			                    				});
				 		                    	  setTimeout(function() {
				                    					dialog.modal('hide');
				                    				}, 1500);
		                    					
		                    					
		                    				}
		                    				else
		                    				{		                    					
		                    					var msg=productName+" Available stock = "+stockInMili+" mili";
				 		                    	   var dialog = bootbox.dialog({
			                    					//title: "Embel Technologies Says :",
			                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
			                    				    closeButton: false
			                    				});
				 		                    	  setTimeout(function() {
				                    					dialog.modal('hide');
				                    				}, 1500);
		                    				}
		                    			
			                    		var setZero = 0;
			                    		$("#list4").jqGrid("setCell", rowId, "total", setZero); 
			                    		$("#list4").jqGrid("setCell", rowId, "quantity", setZero);
			                    		
			                    		finalCalculation();
			                    		
			        		        	return false;
			                    	}
	                    			}
		                    		else if(expiryDate !='N/A')
	                    			{
		                    			if(Number(userTotalGramsOrMili) > Number(stockperEntryInMili))
				                    	{
			                    			if(Number(stockperEntryInMili) >1000)
			                    				{
			                    					var convertedStockInLtr = Number(stockperEntryInMili)/1000;
			                    					
			                    					var msg=productName+" Available stock = "+convertedStockInLtr+" Ltr";
					 		                    	   var dialog = bootbox.dialog({
				                    					
				                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
				                    				    closeButton: false
				                    				});
					 		                    	  setTimeout(function() {
					                    					dialog.modal('hide');
					                    				}, 1500);
			                    					
			                    					
			                    				}
			                    				else
			                    				{		                    					
			                    					var msg=productName+" Available stock = "+stockperEntryInMili+" mili";
					 		                    	   var dialog = bootbox.dialog({
				                    					
				                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
				                    				    closeButton: false
				                    				});
					 		                    	  setTimeout(function() {
					                    					dialog.modal('hide');
					                    				}, 1500);
			                    				}
			                    			
				                    		var setZero = 0;
				                    		$("#list4").jqGrid("setCell", rowId, "total", setZero); 
				                    		$("#list4").jqGrid("setCell", rowId, "quantity", setZero);
				                    		
				                    		finalCalculation();
				                    		
				        		        	return false;
	                    			}		                    		
	                    		}
                    				KgGramsLtrMiliCalculation();
                    		}*/
		                    	
	                    	function KgGramsLtrMiliCalculation()
	                    	{
	                    		if((Number(quantity)>0 || Number(quantity) != '' || quantity != '0'))
                    			{
	                    			salePricePerGram 
		                    		var salePriceKgTota = 0;
		                    		salePriceKgTota = userTotalGramsOrMili * salePricePerGramOrMili ;
		                    		salePriceKgTota = Math.round(salePriceKgTota * 100) / 100;			                    		
                    				$("#list4").jqGrid("setCell", rowId, "total", salePriceKgTota);
                    			}				                    	
		                    	          	
		                    	else if(Number(quantity) == 0  || Number(quantity)== '')
                    			{
		                    		
		                    		var setZero = 0;
		                    		$("#list4").jqGrid("setCell", rowId, "total", setZero);
		                    		
		                    		finalCalculation();
		                    	   
 		                    	   return false;
                    			}
	                    	}
			                   
			                    if(unit == 'pcs')
			                    {
			                    	if(freeQuantity == "" || freeQuantity == "0")
		                    		{
		                    			freeQuantity = 0;
		                    			var setZero = 0;
                                 		$("#list4").jqGrid("setCell", rowId, "freeQuantity", setZero);
                                 		quantity = Number(quantity) + Number(freeQuantity);
		                    		}
			                    	else if(freeQuantity != '' || freeQuantity != "0")
		                    		{
										var checkFreeQuantity = /^[0-9]+$/;
							    		if(freeQuantity.match(checkFreeQuantity))
							    		{
							    			quantity = Number(quantity) + Number(freeQuantity);
							    		}
							    		else
							    		{
						    				 var msg="Please Enter Valid Free Quantity";
			 		                    	   var dialog = bootbox.dialog({
		                    					//title: "Embel Technologies Says :",
		                    				   /* message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',*/
		                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		                    				    closeButton: false
		                    				});
			 		                    	  setTimeout(function() {
			                    					dialog.modal('hide');
			                    				}, 1500);
		                    				 
		                    				 quantity = 0;
		                    				 var setZero = 0;
	                                   		 $("#list4").jqGrid("setCell", rowId, "quantity", setZero);
	 			                    		 $("#list4").jqGrid("setCell", rowId, "total", setZero);
	                                   		 $("#list4").jqGrid("setCell", rowId, "freeQuantity", setZero);
	 			                    		 
	                                   		finalCalculation();
	                                   		 	
		                    				return false;			                    			
							    		}
		                    		}
			                    	
		                    		var rowId =$("#list4").jqGrid('getGridParam','selrow');
	                    			var rowData = jQuery("#list4").getRowData(rowId);
	                    			var stockInTotalPieceQuantity = rowData['totalKgLtrPiece'];	
	                    			
	                    			
	                    			if(quantity != '')
	                    			{
	                    			 var checkQuantity = /^[0-9]+$/;
	                    			 if(String(quantity).match(checkQuantity) || String(quantity) == "")
	                    			 {}
	                    			 else
	                    			 {	                    				 
	                    				 var msg="Please Enter Valid Quantity";
		 		                    	   var dialog = bootbox.dialog({
	                    					//title: "Embel Technologies Says :",
	                    				   /* message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',*/
	                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
	                    				    closeButton: false
	                    				});
		 		                    	  setTimeout(function() {
		                    					dialog.modal('hide');
		                    				}, 1500);
	                    				 
	                    				 quantity = 0;
	                    				 var setZero = 0;
                                   		 $("#list4").jqGrid("setCell", rowId, "quantity", setZero);
 			                    		 $("#list4").jqGrid("setCell", rowId, "total", setZero);
                                   		 $("#list4").jqGrid("setCell", rowId, "freeQuantity", setZero);
 			                    		 
                                   		finalCalculation();
                                   		 	
	                    				return false;
	                    			 	}
	                    			}
	                    			
		                    		if(expiryDate =='N/A')
		                    		{	
		                    			if ( Number(quantity) > Number(stockInTotalPieceQuantity))
					                    	{
	                    					   var msg = productName+" Available Stock For Barcode No : "+barcodeNo+" = "+stockInTotalPieceQuantity+" Pieces";
			 		                    	   var dialog = bootbox.dialog({
		                    					//title: "Embel Technologies Says :",
		                    				   /* message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',*/
		                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		                    				    closeButton: false
			 		                    	   });
		                    				
			 		                    	   setTimeout(function()
			 		                    		{
		                    					dialog.modal('hide');
			 		                    	   }, 1500);
			 		                    	   
			 		                    	   var setFq = 0;
			 		                    	   $("#list4").jqGrid("setCell", rowId, "freeQuantity", setFq);
			 		                    	   $("#list4").jqGrid("setCell", rowId, "quantity", setFq);
					                    	   $("#list4").jqGrid("setCell", rowId, "total", setFq);
					                    	   
					                    	   finalCalculation();					                    		
			 		                    	   return false;
				                    	}	                    			 
		                    		} 
	                    			else if(expiryDate !='N/A')
	                    			{	
	                    				if ( Number(quantity) > Number(stockPerEntry))
				                    	{
				                    		   var msg = productName+" Available Stock For Barcode No : "+barcodeNo+" = "+stockPerEntry+" Pieces";
			 		                    	   var dialog = bootbox.dialog({
		                    					//title: "Embel Technologies Says :",
		                    				   /* message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',*/
		                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		                    				    closeButton: false
		                    				});
			 		                    	  setTimeout(function() {
			                    					dialog.modal('hide');
			                    				}, 1500);
				                    		
				                    		var tota = 0;
				                    		var quantity = 0;
				                    		$("#list4").jqGrid("setCell", rowId, "total", tota);
				                    		$("#list4").jqGrid("setCell", rowId, "quantity", quantity);
			 		                    	$("#list4").jqGrid("setCell", rowId, "freeQuantity", quantity);
				                    		
			 		                    	finalCalculation();
				                    	}
	                    			}
			                    }
			                    
			                    finalCalculation();
			                    
			                    
			                    //var quantity = rowData['quantity'];
								var iGst = rowData['igst'];
								var cgst = rowData['cgst'];
			                    var sgst = rowData['sgst'];
			                    var gst = +cgst+ +sgst;
								var DiscountAmount= rowData['DiscountAmount'];
								var Discount= rowData['Discount'];
								var TotalEx= rowData['TotalEx'];
								
								//CGST and SGST and IGST Validation
								
								if( Number(cgst)>0 &&  Number(sgst)>0 && Number(iGst)>0 )
								{
									 var setValue = 0;
									 
									 var msg = "You Can't Enter valur For Both tax";
									 var dialog = bootbox.dialog({
														
								message : '<p class="text-center">'+ msg.fontcolor("red").fontsize(5)+ '</p>',
								closeButton : false
								
									});

								setTimeout(
										function()
										{dialog.modal('hide');
											},
										1500);
								
						            $("#list4").jqGrid("setCell",rowId,"igst",setValue);
						           		
						           		 return false;									
								}
								else
								{
									 if(Number(cgst)>0 && Number(iGst)>0)
									 {
										   var setValue = 0;
					        			 
					        			 var msg = "You Can't Enter value For CGST And IGST";
										 var dialog = bootbox.dialog({
															
									message : '<p class="text-center">'+ msg.fontcolor("red").fontsize(5)+ '</p>',
									closeButton : false
									
										});

									setTimeout(
											function()
											{dialog.modal('hide');
												},
											1500);

								    var setValue;
							           		 $("#list4").jqGrid("setCell",rowId,"cgst",setValue);
							           		 $("#list4").jqGrid("setCell",rowId,"igst",setValue);
							           		
							           		 return false;	 
									 }
									 else{
										 
										 if(Number(sgst)>0 && Number(iGst)>0)
										 {
											 var setValue = 0;
						        			 
						        			 var msg = "You Can't Enter value For SGST And IGST";
											 var dialog = bootbox.dialog({
																
										message : '<p class="text-center">'+ msg.fontcolor("red").fontsize(5)+ '</p>',
										closeButton : false
										
											});

										setTimeout(
												function()
												{dialog.modal('hide');
													},
												1500);

									    var setValue;
								           		 $("#list4").jqGrid("setCell",rowId,"sgst",setValue);
								           		 $("#list4").jqGrid("setCell",rowId,"igst",setValue);
								           		
								           		 return false;	
						        		}
									 }
								}
								

								/*/////calculation of gst////
*/														
								var checkDiscount = /^[0-9]+\.?[0-9]*$/;
								  if(Discount.match(checkDiscount))
								  {
									  if(Number(Discount) >= 100)
							  	  {
							  		  var setZero = 0;
							  		  //alert("In discount")
							  		  myAlert("Discount Percentage Must Be Less Than 100");
							  	      $("#list4").jqGrid("setCell", rowId, "DiscountAmount", setZero);
							      	  totalCalC();
							      	  totalDisC();
							  		  return false;
							  	  }
								  }
								  else
								  {
									  var setZero = 0;
									  
									  if(Discount== "")
							  	  {
							  		 
							  		  $("#list4").jqGrid("setCell", rowId, "DiscountAmount", setZero);
							      	  
							  	  }
									  else
									  {
							  		  myAlert("Pleaee Enter Valid Discount value");
							  		  $("#list4").jqGrid("setCell", rowId, "DiscountAmount", setZero);
							      	  totalCalC();
							      	  totalDisC();
							      	  return false;
									  }
								  }			
								  
								//sale price excluding tax calc//
								  var checksalePrice= /^[0-9]+\.?[0-9]*$/;
								  if(salePrice.match(checksalePrice))
							    {
							      	  if(Number(salePrice) > 0)
							  		  {
							      		  spwTax = (salePrice/(1+(gst/100)+(iGst/100)));
	
/*							      		  var aa = (salePriceEx*((gst/100)+(iGst/100)));
							      		spwTax = +salePriceEx + +aa;*/
							      		  
							      		  $("#list4").jqGrid("setCell", rowId, "salePriceEx",  spwTax.toFixed(2));
//							      		  $("#list4").jqGrid("setCell", rowId, "sp",  spwTax.toFixed(2));							      		 	
							      		 if(Number(gst) > 0)
							      		 {  
							      			  DiscountAmount= (spwTax*(Discount/100));
							      			  finalsp = (spwTax- DiscountAmount) * quantity;
							      			  newTaxAmt = (((finalsp*quantity)*gst)/100);
							      			  
							      			  var oneProTax = (((finalsp)*gst)/100);
							      			  newFinalsp = finalsp+ oneProTax;
							      			  tota = newFinalsp;
							      			  DiscountAmount = DiscountAmount * quantity;
							      			
							      		$("#list4").jqGrid("setCell", rowId, "DiscountAmount", DiscountAmount.toFixed(2));	  
									    $("#list4").jqGrid("setCell", rowId, "TotalEx", finalsp.toFixed(2));
//									    $("#list4").jqGrid("setCell", rowId, "TotalEx", tota.toFixed(2));
									    $("#list4").jqGrid("setCell", rowId, "total", tota.toFixed(2));
/*									    $("#list4").jqGrid("setCell", rowId, "TotalEx", finalsp.toFixed(2));
									    $("#list4").jqGrid("setCell", rowId, "total", finalsp.toFixed(2));*/									
									     totalCalC();
									     totalDisC();	
							      		}
							      		 
							      	else if(Number(iGst) > 0)
							      	{  
						      			  DiscountAmount= (spwTax*(Discount/100));
						      			  finalsp = (spwTax- DiscountAmount) * quantity;
						      			  newTaxAmt = (((finalsp*quantity)*iGst)/100);
						      			  
						      			  var oneProTax = (((finalsp)*iGst)/100);
						      			  newFinalsp = finalsp+ oneProTax;
						      			  tota = newFinalsp;
						      			  DiscountAmount = DiscountAmount * quantity;
						      			 
						      		$("#list4").jqGrid("setCell", rowId, "DiscountAmount", DiscountAmount.toFixed(2));	  
								    $("#list4").jqGrid("setCell", rowId, "TotalEx", finalsp.toFixed(2));
//								    $("#list4").jqGrid("setCell", rowId, "TotalEx", tota.toFixed(2));						      		
								    $("#list4").jqGrid("setCell", rowId, "total", tota.toFixed(2));
/*								    $("#list4").jqGrid("setCell", rowId, "TotalEx", finalsp.toFixed(2));						      		
								    $("#list4").jqGrid("setCell", rowId, "total", finalsp.toFixed(2));*/
						      										
								     totalCalC();
								     totalDisC();	
						      		}
							      	
							      	else if(Number(gst) == 0 && Number(iGst) == 0)
							      	{  
						      			  DiscountAmount= (spwTax*(Discount/100));
						      			  finalsp = (spwTax- DiscountAmount) * quantity;
						      			  newTaxAmt = (((finalsp*quantity)*iGst)/100);
						      			  
						      			  var oneProTax = (((finalsp)*iGst)/100);
						      			  newFinalsp = finalsp+ oneProTax;
						      			  tota = newFinalsp;
						      			  DiscountAmount = DiscountAmount * quantity;
						      			 
						      		$("#list4").jqGrid("setCell", rowId, "DiscountAmount", DiscountAmount.toFixed(2));	  
								    $("#list4").jqGrid("setCell", rowId, "TotalEx", finalsp.toFixed(2));
								    $("#list4").jqGrid("setCell", rowId, "total", tota.toFixed(2));
//								    $("#list4").jqGrid("setCell", rowId, "total", finalsp.toFixed(2));
								
								     totalCalC();
								     totalDisC();	
						      		}
							   else
							      {
							     var setZero = 0; 
								  $("#list4").jqGrid("setCell", rowId, "DiscountAmount", setZero);
							   /* $("#list4").jqGrid("setCell", rowId, "Total", tota.toFixed(2));*/
							  /*  $("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero);*/
							     }
							        }
						else
					         {
							  	var setZero = 0;
							  /*$("#list4").jqGrid("setCell", rowId, "sPWithoutTax", setZero);*/
							    $("#list4").jqGrid("setCell", rowId, "DiscountAmount", setZero);
							    $("#list4").jqGrid("setCell", rowId, "total", setZero);
							 /* $("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero);*/
							    return false;
								}
							    }				        	  
						else
							{
								var setZero = 0;
								alert("Pleae Enter Valid Buy Price");
								$("#list4").jqGrid("setCell", rowId, "salePrice", setZero);
								$("#list4").jqGrid("setCell", rowId, "salePriceEx", setZero);
							  	$("#list4").jqGrid("setCell", rowId, "DiscountAmount", setZero);
							  	$("#list4").jqGrid("setCell", rowId, "total", setZero);
							 /* $("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero);*/
									  return false;
								 }
								
								/*if(Gst!=0)
								{
								var taxpercentage = Gst;
								var salepriceEx=saleprice(1+(taxpercentage/100)));
								
								
							$("#jqGrid").jqGrid("setCell",rowId,"salepriceEx",salepriceEx);
							
							return false;
				                         }
								*/
								  //out of grid calc//
								
									function totalCalC()
									{	
									       var Total = 0;
									       var totAmtWithTax = 0;
									       var count = jQuery("#list4").jqGrid('getGridParam', 'records');
									       var allRowsInGrid1 = $('#list4').getGridParam('data');
									        var AllRows=JSON.stringify(allRowsInGrid1);
									        	  
									       for (var k = 0; k < count; k++)
									       {
									          var Total1 = allRowsInGrid1[k].total;//grid total 

									        if(Total1 != undefined)
									        {
									        		Total = +Total + +Total1;
									        		  }
									        	  }
									        	  for (var j = 0; j < count; j++)
									        	  {
									        		  var Total2 = allRowsInGrid1[j].taxAmount;
									        		  var Total3 = allRowsInGrid1[j].total;
									        		  if(Total2 != undefined)
									        		  {
									        			  totAmtWithTax = +totAmtWithTax + +Total2 + +Total3;
									        		  }
									        	  }
									           	  document.getElementById("totalWithExpense").value = Total.toFixed(2);//Math.round(Total);
									        	  document.getElementById("grossTotal").value = Total.toFixed(2);//Math.round(Total);
									        	  var totAmount = Total.toFixed(2);//Math.round(Total);
										        }
									        	  
									      function totalDisC()
										   {
											    //TOTAL DISCOUNT AMOUNT
											       var TotalDisAmt = 0;
											        var TotalsPAmt = 0;
											        var disPer = 0;
											        var count = jQuery("#list4").jqGrid('getGridParam', 'records');
											        var allRowsInGrid1 = $('#list4').getGridParam('data');
											        var AllRows=JSON.stringify(allRowsInGrid1);
											        for (var l = 0; l < count; l++)
											        {
											          var TotalDisAmt1 = allRowsInGrid1[l].DiscountAmount;
											          var TotalsPAmt1 = allRowsInGrid1[l].salePriceEx;
											        		  
											        if(TotalsPAmt1 != undefined)
											        {
											        	TotalsPAmt = (+TotalsPAmt + +TotalsPAmt1).toFixed(2);
											        }
											        if(TotalDisAmt1 != undefined)
											        {
											        	TotalDisAmt = (+TotalDisAmt + +TotalDisAmt1).toFixed(2);
											        	//TotalDisAmt = ((TotalDisAmt1)*(quantity)).toFixed(2);
											        	disPer = ((TotalDisAmt/TotalsPAmt)*100).toFixed(2);
											        }						        	 
											        	  }
											        	  /*document.getElementById("discount1").value = disPer;*/
											        	 // document.getElementById("discount").value = TotalDisAmt;
										        	 }
			                    
			                    
			                    function finalCalculation()
			                    {
			                    		var Total = 0;
			                    		var Total1 = 0;
			                    		var count = jQuery("#list4").jqGrid('getGridParam', 'records');
			        		        	var allRowsInGrid1 = $('#list4').getGridParam('data');
			        		        	var AllRows=JSON.stringify(allRowsInGrid1);
			        		        	for (var k = 0; k < count; k++)
			        		        	{
			        		        		Total1 = allRowsInGrid1[k].total;
			        		        		if(Total1 == undefined)
			        		        			{
			        		        				Total1 = 0;
			        		        			}
			        		        		Total = +Total + +Total1;
			        		        		Total = Math.round(Total * 100) / 100;
			        		        		
			        		        	}
			        		        	
			        		        	document.getElementById("totalWithExpense").value = Total;
			        		        	document.getElementById("grossTotal").value = Total;
		        		        		
			                    }
	                    },
			//},
	        	
         
			pager: "#jqGridPager",
			
		});
		
	
		//$("#list4").addRowData(i+1,jsonData[i]);
		if(count==0 || count==null)
		{
			 // $("#list4").addRowData(i,jsonData[i]);
			  $("#list4").addRowData(0,jsonData[i]);
		}
		

   
		 $('#list4').navGrid('#jqGridPager',
	                
	                { edit: true, add: false, del: true, search: true, refresh: true, view: true, position: "left", cloneToTop: false },
	                
	                {
	                    editCaption: "The Edit Dialog",
	                   
	                    afterSubmit: function () {
							
	                      var grid = $("#list4"),
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
	                	
						

						afterComplete: function() {
	                		$('#list4').trigger( 'reloadGrid' );

	                		
	                		document.getElementById("discount").value = 0;
			 				document.getElementById("discountAmount").value = 0;
			 				document.getElementById("hamaliExpence2").value = 0;
			 				document.getElementById("hamaliExpence").value = 0;	                		
	                		
	 				       /* 	Calculation of total after editing quantity*/
	 				        	   
	 				        	   // $(this).trigger('reloadGrid');
	 				        	   var rowId =$("#list4").jqGrid('getGridParam','selrow');  
	 		                       var rowData = jQuery("#list4").getRowData(rowId);
	 		                    	var quantity = rowData['quantity'];
	 		                    	var salePrice = rowData['salePrice'];
	 		                    	var kg = rowData['kg'];
			                    	//alert("kg entered = "+kg);
			                    	var grams = rowData['grams'];
			                    	//alert("grams entered = "+grams);
	 		                    	var iGst = rowData['igst'];
	 		                    	var Gst = rowData['gst'];
	 		                    	
	 		                    	///productId = $('#proName').val();
	 		                    	
	 		                    	
	 		                    	//var productName=$('#productName').val(); 
	 		                    	/*
	 		                    	$("#proName option:selected").each(function() {
	 		                    		   selectedVal = $(this).text();
	 		                    		});*/
	 		                    	
	 		                    	///var splitText = selectedVal.split(",");
	 		                    	//var splitTextforproduct =productName.split(",");
	 		                   	
	 		                    	var stock = splitText[4];
	 		                    	
	 		                    	var salePricePerGram = 0;
			                    	salePricePerGram = (Number)(salePrice/1000);
			                    	
			             
		                    	if(Number(grams) != "" || Number(kgValue) != "")
		                    	{
			                    	if(Number(kg)>0 && Number(grams) == 0)
	                    			{
			                    		var salePriceKgTota = 0;
			                    		salePriceKgTota = Number(salePrice)*kg;
			                    		salePriceKgTota = Math.round(salePriceKgTota * 100) / 100;
	                    				$("#list4").jqGrid("setCell", rowId, "total", salePriceKgTota);
	                    			}
			                    	
			                    	if(Number(grams)>0 && Number(kg) == 0)
	                    			{
			                    		var salePriceGramTota = 0;
			                    		salePriceGramTota = Number(salePricePerGram)*grams;
			                    		salePriceGramTota = Math.round(salePriceGramTota * 100) / 100;
	                    				$("#list4").jqGrid("setCell", rowId, "total", salePriceGramTota);
	                    			}
			                    	
			                    	if(Number(kg) > 0 && Number(grams) > 0)
	                    			{
			                    		var salePriceKgTota = 0;
			                    		var salePriceGramTota = 0;
			                    		var salePriceKgPlusGrams = 0;
			                    		salePriceKgTota = Number(salePrice)*kg;
			                    		salePriceGramTota = Number(salePricePerGram)*grams;                    		
			                    		salePriceKgPlusGrams = Number(salePriceKgTota) + Number(salePriceGramTota);
			                    		salePriceKgPlusGrams = Math.round(salePriceKgPlusGrams * 100) / 100;
	                    				$("#list4").jqGrid("setCell", rowId, "total", salePriceKgPlusGrams);
		                    		}
			                    	
			                    	var Total =0;
 		                    		var count = jQuery("#list4").jqGrid('getGridParam', 'records');
 		        		        	var allRowsInGrid1 = $('#list4').getGridParam('data');
 		        		        	var AllRows=JSON.stringify(allRowsInGrid1);
 		        		        	for (var k = 0; k < count; k++) {
 		        		        		var Total1 = allRowsInGrid1[k].total;
 		        		        		Total = +Total + +Total1;
 		        		        		Total = Math.round(Total * 100) / 100;
 		        		        	}
 		        		        	document.getElementById("totalWithExpense").value = Total;
 		        		        	document.getElementById("grossTotal").value = Total;
 		                        	
		                    	}
	 		                    	if ( Number(quantity) > Number(stock))
	 		                    	{
	 		                    		
	 		                    		alert("Available stock = "+stock);
	 		                    		
	 		                    		
	 		                    		
	 	                    		
	 	                    	        }
	 		                    	
	 		                    		if (iGst != 0){
	 		                    		/*	var taxPercentage = iGst;
	 			                    		var taxAmount = ((taxPercentage/100)*salePrice);
	 			                    		var BuyPriceWithTaxAmount = Number(taxAmount) + Number(salePrice);*/
	 			                    		var tota = quantity * salePrice;
	 			                    		tota = Math.round(tota * 100) / 100;
	 			                    		$("#list4").jqGrid("setCell", rowId, "total", tota);
		 		                    	}
		 		                    	else if(iGst == 0){
	 		                    		/*var  taxPercentage = Number(Gst);
	 		                    		var taxAmount = ((taxPercentage/100)*salePrice);
	 		                    		var BuyPriceWithTaxAmount = Number(taxAmount) + Number(salePrice);*/
	 		                    		var tota = quantity * salePrice;
	 		                    		tota = Math.round(tota * 100) / 100;
	 		                    		$("#list4").jqGrid("setCell", rowId, "total", tota);
		 		                    		
		 		                    	}
		 		                    		
		 		                    		var Total =0;
		 		                    		var count = jQuery("#list4").jqGrid('getGridParam', 'records');
		 		        		        	var allRowsInGrid1 = $('#list4').getGridParam('data');
		 		        		        	var AllRows=JSON.stringify(allRowsInGrid1);
		 		        		        	for (var k = 0; k < count; k++) {
		 		        		        		var Total1 = allRowsInGrid1[k].total;
		 		        		        		Total = +Total + +Total1;
		 		        		        		Total = Math.round(Total * 100) / 100;
		 		        		        	}
		 		        		        	document.getElementById("totalWithExpense").value = Total;
		 		        		        	document.getElementById("grossTotal").value = Total;
		 	        		        		//document.getElementById("duptotal").value = Total;
		 		                    	
	 		        	
						},
						reloadAftersubmit:true,	
	                    errorTextFormat: function (data) {
	                        return 'Error: ' + data.responseText
	                    }
	                		
	                });
		 
		 
			   });
		
		})
}

				
						/*************	Cash Customer Bill adding to fertilizerBilling table ************************/

function fertilizerBill()
{	
	var customerName = $("#customerName").val();
	var shopName = $("#shopName").val();
	var contactNo = $("#contactNo2").val();
	var proName  = $("#proName").val();
	
	
	
	/*if (customerName == "")
	{
		$.getScript('/Shop/staticContent/js/bootbox.min.js', function()  
		{		
				var msg="Please Enter Customer Name";
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
				
					}//);		
	 }*/
	 
	/* 		if(customerName == "" || customerName==null || customerName==undefined)
	{
		var msg="Please Enter Customer Name ";
		
		var dialog = bootbox.dialog({
			//title: "Embel Technologies Says :",
		    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		    closeButton: false
		});
		
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		
		return false;
	}*/
	 
	
/*	if(customerName != "")
	{
	 var letterNumber = /^[a-zA-Z ]+$/;
	 if(customerName.match(letterNumber))
	 {
		 
	 }
	 else
		{
		 var msg="Please Enter Valid Customer Name";
			var dialog = bootbox.dialog({
				
			    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
			    closeButton: false
			});
			
			setTimeout(function() {
				dialog.modal('hide');
			}, 1500);
			
			return false;
		}
	 }*/
	
	
	/*  if(contactNo != "")
	  {
		  var letterNumber = /^[0-9]{10}$/;
			 if(contactNo.match(letterNumber))
			 {				
				
			 }
			 else
			 {
				    var msg="Please Enter Valid 10 Digit Contact Number";
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
	  }*/

	  
	  
	  if(proName == "" || proName == "Select product")
	  {
						
			var msg="Please Select Product";
			var dialog = bootbox.dialog({
				//title: "Embel Technologies Says :",
			   /* message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',*/
			    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
			    closeButton: false
			});
			
			setTimeout(function() {
				dialog.modal('hide');
			}, 1500);
			
			return false;
	  }
	  
	  if(document.fertiBill.paymentMode.value == ""  || document.fertiBill.paymentMode.value == "selected")
        {					
			var msg="Please Select Payment Mode";
			var dialog = bootbox.dialog({
				//title: "Embel Technologies Says :",
			   /* message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',*/
			    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
			    closeButton: false
			});
			
			setTimeout(function() {
				dialog.modal('hide');
			}, 1500);
			
			return false;
        }
    	if(document.fertiBill.paymentMode.value == "cheque")
    	{
        	if(document.fertiBill.chequeNum.value == "")
        	{					
				var msg="Please Enter Cheque Number";
				var dialog = bootbox.dialog({
					//title: "Embel Technologies Says :",
				   /* message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',*/
				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
				    closeButton: false
				});
				
				setTimeout(function() {
					dialog.modal('hide');
				}, 1500);
				
				return false;
        		}
        	
        	if(document.fertiBill.nameOnCheck.value == "")
    		{					
				var msg="Please Enter Name on Cheque";
				var dialog = bootbox.dialog({
					//title: "Embel Technologies Says :",
				   /* message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',*/
				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
				    closeButton: false
				});
				
				setTimeout(function() {
					dialog.modal('hide');
				}, 1500);
				
				return false;
    		}
    	}
    	
    	if(document.fertiBill.paymentMode.value == "card")
    	{	
    		
        	if(document.fertiBill.cardNum.value == "")
        	{					
				var msg="Please Enter Card Number";
				var dialog = bootbox.dialog({
					//title: "Embel Technologies Says :",
				   /* message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',*/
				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
				    closeButton: false
				});
				
				setTimeout(function() {
					dialog.modal('hide');
				}, 1500);
				
				return false;
        		}
        	if(document.fertiBill.cardNum.value != "")
    		{
        		var numbers = /^[0-9]+$/;
        		if(document.fertiBill.cardNum.value.match(numbers))
        		{
        			
        		}
        		else
        		{					
					var msg="Please Enter Valid Card Number";
					var dialog = bootbox.dialog({
						//title: "Embel Technologies Says :",
					   /* message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',*/
					    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
					    closeButton: false
					});
					
					setTimeout(function() {
						dialog.modal('hide');
					}, 1500);
					
					return false;
         		}
    		}
    	}
    	
    	
    	if(document.fertiBill.paymentMode.value == "neft")
    	{
        	if(document.fertiBill.accNum.value == "")
        	{
				var msg="Please Enter Account Number";
				var dialog = bootbox.dialog({
					//title: "Embel Technologies Says :",
				   /* message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',*/
				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
				    closeButton: false
				});
				
				setTimeout(function() {
					dialog.modal('hide');
				}, 1500);
				
				return false;
				
        	}
        	if(document.fertiBill.accNum.value != "")
    		{
        		var numbers = /^[0-9]+$/;
        		if(document.fertiBill.accNum.value.match(numbers))
        		{
        			
        		}
        		else
        		{
					var msg="Please Enter Valid Acount Number";
					var dialog = bootbox.dialog({
						//title: "Embel Technologies Says :",
					   /* message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',*/
					    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
					    closeButton: false
					});
					
					setTimeout(function() {
						dialog.modal('hide');
					}, 1500);
					
					return false;
        						
        		}

    		}
    	
        	if(document.fertiBill.bankName.value == "")
    		{
				var msg="Please Enter bank Name";
				var dialog = bootbox.dialog({
					//title: "Embel Technologies Says :",
				   /* message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',*/
				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
				    closeButton: false
				});
				
				setTimeout(function() {
					dialog.modal('hide');
				}, 1500);
				
				return false;
    		}
        	if(document.fertiBill.bankName.value != "")
    		{
   	        	var letters = /^[A-Za-z]+$/;
   	        	if(document.fertiBill.bankName.value.match(letters))
   	        	{
   	        		
   	        	}
   	        	else
   	        	{					
					var msg="Please Enter Valid Bank Name";
					var dialog = bootbox.dialog({
						//title: "Embel Technologies Says :",
					   /* message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',*/
					    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
					    closeButton: false
					});
					
					setTimeout(function() {
						dialog.modal('hide');
					}, 1500);
					
					return false;        						
           		}
        		
    		}
    	}	   	        				 
			fertilizerBilling();
}

function fertilizerBilling()
{	
	//document.fertiBill.btn.disabled = true;	
	document.getElementById("billingCashbtn").disabled = true;
	var params = {};
	
	var customerType = "NORMALCUSTOMER";
	
	var customerName = $('#customerName').val();
	var village = $('#village').val();
	var contactNo = $('#contactNo2').val();
	var hamaliExpense = $('#hamaliExpence').val();
	/*var transExpenseWithoutGST = $('#transExpence2').val();*/
	var hamaliExpenseWithourGST = $('#hamaliExpence2').val();
	var grossTotal = $('#grossTotal').val();
	var total = $('#totalWithExpense').val();
	var paymentMode = $('#paymentMode').val();
	var chequeNum = $('#chequeNum').val();
	var saleDate = $('#saleDate').val();
	var description = $('#description').val();
	var email = $('#email').val();
	var type = $('#type').val();
	var firmName = $('#firmName').val();
	var address  = $("#village").val();
	var input = document.getElementById('shopName'),
    	list  = document.getElementById('shop_drop1'),
    		    i,shopName;

	for (i = 0; i < list.options.length; ++i) {
    if (list.options[i].value === input.value) {
    	shopName = list.options[i].getAttribute('data-value');
    	}
	}
	var gstNo = $('#gstNo').val();
	var nameOnCheck = $('#nameOnCheck').val();
	var cardNum = $('#cardNum').val();
	var accNum = $('#accNum').val();
	var bankName = $('#bankName').val();
	
	var discount = $('#discount').val();
	var discountAmount = $('#discountAmount').val();
	
    productId = $('#proName').val();
	
	$("#proName option:Selected").each(function() {
		   selectedVal = $(this).text();
		});
	
	/*var splitText = selectedVal.split(",");
	
	var fk_shop_id = splitText[12];*/
	
	if(customerName=="" || customerName==null || customerName==undefined){
		customerName="NA";
	}
	if(email=="" || email==null || email==undefined){
		email="abc@g.com";
	}
	if(village=="" || village==null || village==undefined){
		village="NA";
	}
	if(contactNo=="" || contactNo==null || contactNo==undefined){
		contactNo=0;
	}
	if(firmName=="" || firmName==null || firmName==undefined){
		firmName="NA";
	}
	
	var count = jQuery("#list4").jqGrid('getGridParam', 'records');
	var allRowsInGrid = $('#list4').getGridParam('data');                        //to get all rows of grid
	var AllRows=JSON.stringify(allRowsInGrid);
	for (var i = 0; i < count; i++)
	{		
		var cat_id = allRowsInGrid[i].cat_id;
		params["cat_id"+i] = cat_id;
		
		var sub_cat_id = allRowsInGrid[i].sub_cat_id;
		params["sub_cat_id"+i] = sub_cat_id;
	
		var barcodeNo = allRowsInGrid[i].barcodeNo;
		params["barcodeNo"+i] = barcodeNo;
				
		var itemName = allRowsInGrid[i].itemName;
		params["itemName"+i] = itemName;
		
		var companyName = allRowsInGrid[i].companyName;
		params["companyName"+i] = companyName;
		
		var hsn = allRowsInGrid[i].hsn;
		params["hsn"+i] = hsn;
		
		var weight = allRowsInGrid[i].weight;
		params["weight"+i] = weight;
		
		var unitName = allRowsInGrid[i].unitName;
/*		if(unitName == 'Box/pcs'){
			unitName = 'pcs' ;
			params["unitName"+i] = unitName;
		}else{*/
			params["unitName"+i] = unitName;
	//	}
		
		var salePrice = allRowsInGrid[i].sp;
		var mrp = allRowsInGrid[i].mrp;
			
		if(salePrice != '' || salePrice == '0')
		{
			var numbers = /^[0-9]+\.?[0-9]*$/;
			if(String(salePrice).match(numbers))
			{	
				if(salePrice == '0' || salePrice == undefined || salePrice == '' || salePrice == null)
				{
					var msg="Please Enter Unit Price For :: "+(i+1)+" "+itemName;
					var dialog = bootbox.dialog({
						//title: "Embel Technologies Says :",
					    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
					    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
					    closeButton: false
					});
					
					setTimeout(function() {
						dialog.modal('hide');
					}, 1500);
	 				document.getElementById("billingCashbtn").disabled = false;	
					return false;
				}
			}
			else
			{
				var msg="Please Enter Valid Unit Price For :: "+(i+1)+" "+itemName;
				var dialog = bootbox.dialog({
					//title: "Embel Technologies Says :",
				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
				    closeButton: false
				});
				
				setTimeout(function() {
					dialog.modal('hide');
				}, 1500);
 				document.getElementById("billingCashbtn").disabled = false;	
				return false;
			}
		}
		
		if(mrp != '')
		{
			var numbers = /^[0-9]+\.?[0-9]*$/;
			if(String(mrp).match(numbers))
				{		
					if(mrp == '' || mrp == '0' || mrp == undefined || mrp == null)
					{
						mrp = 0;
					}
					else if(Number(salePrice) > Number(mrp))
					{
						var msg="MRP per Unit Must be Greater Than Unit Price";
						var dialog = bootbox.dialog({
							//title: "Embel Technologies Says :",
						    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
						    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
						    closeButton: false
						});
						
						setTimeout(function() {
							dialog.modal('hide');
						}, 1500);
		 				document.getElementById("billingCashbtn").disabled = false;	
						return false;
					}
				}
			else
			{
				var msg="Please Enter Valid MRP Price";
				var dialog = bootbox.dialog({
					//title: "Embel Technologies Says :",
				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
				    closeButton: false
				});
				
				setTimeout(function() {
					dialog.modal('hide');
				}, 1500);
 				document.getElementById("billingCashbtn").disabled = false;	
				return false;
			}
		}
		else
		{
			mrp = 0;
		}
		
		params["salePrice"+i] = salePrice;
		params["mrp"+i] = mrp;
		
		var quantity = allRowsInGrid[i].quantity;
		
		if(unitName == 'kg')
		{	
			if(quantity == "0" || quantity == undefined || quantity == "" || quantity == null)
			{
				var msg="Please Enter Kg OR grams :: "+(i+1)+" "+itemName;;
				var dialog = bootbox.dialog({
					//title: "Embel Technologies Says :",
				   /* message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',*/
				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
				    closeButton: false
				});
				
				setTimeout(function() {
					dialog.modal('hide');
				}, 1500);
 				document.getElementById("billingCashbtn").disabled = false;	
				return false;
			}
			else
			{
				params["quantity"+i] = quantity;
			}
		}
		
		if(unitName == 'ltr')
		{
			if(quantity == "0" || quantity == undefined || quantity == "" || quantity == null)
			{
				var msg="Please Enter Ltr OR mili :: "+(i+1)+" "+itemName;;
				var dialog = bootbox.dialog({
					//title: "Embel Technologies Says :",
				   /* message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',*/
				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
				    closeButton: false
				});
				
				setTimeout(function() {
					dialog.modal('hide');
				}, 1500);
 				document.getElementById("billingCashbtn").disabled = false;	
				return false;
			}
			else
			{
				params["quantity"+i] = quantity;
			}
		}		
		//ml
		if(unitName == 'millilitre')
		{
			if(quantity == "0" || quantity == undefined || quantity == "" || quantity == null)
			{
				var msg="Please Enter Ltr OR mili :: "+(i+1)+" "+itemName;;
				var dialog = bootbox.dialog({
					//title: "Embel Technologies Says :",
				   /* message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',*/
				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
				    closeButton: false
				});
				
				setTimeout(function() {
					dialog.modal('hide');
				}, 1500);
 				document.getElementById("billingCashbtn").disabled = false;	
				return false;
			}
			else
			{
				params["quantity"+i] = quantity;
			}
		}	
		
		
		if(unitName == 'pcs')
		{			
			if(quantity == "0" || quantity == undefined || quantity == "" || quantity == null)
			{
				var msg="Please Enter Quantity :: "+(i+1)+" "+itemName;
				var dialog = bootbox.dialog({
					//title: "Embel Technologies Says :",
				   /* message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',*/
				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
				    closeButton: false
				});
				
				setTimeout(function() {
					dialog.modal('hide');
				}, 1500);
 				document.getElementById("billingCashbtn").disabled = false;	
				return false;
			}
			else
			{
				params["quantity"+i] = quantity;
			}
			
			var freeQuantity = allRowsInGrid[i].freeQuantity;
			if(freeQuantity == "0" || freeQuantity == undefined || freeQuantity == "" || freeQuantity == null)
			{
				params["freeQuantity"+i] = 0;
			}
			else
			{
				params["freeQuantity"+i] = freeQuantity;
			}	
		}
		
		if(unitName == 'grams')
	
		{
			if(quantity == "0" || quantity == undefined || quantity == "" || quantity == null)
			{
				var msg="Please Enter Grams :: "+(i+1)+" "+itemName;;
				var dialog = bootbox.dialog({
					
					message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
				    closeButton: false
				});
				
				setTimeout(function() {
					dialog.modal('hide');
				}, 1500);
 				document.getElementById("billingCashbtn").disabled = false;	
				return false;
			}
			else
			{
				params["quantity"+i] = quantity;
			}
		}
		
		var quantity = allRowsInGrid[i].quantity;
		var freeQuantity = allRowsInGrid[i].freeQuantity;
		params["freeQuantity"+i] = freeQuantity;
		params["quantity"+i] = quantity;
		
		var cgst = allRowsInGrid[i].cgst;
		params["cgst"+i] = cgst;
		
		var sgst = allRowsInGrid[i].sgst;
		params["sgst"+i] = sgst;
			
		var DiscountperProd = allRowsInGrid[i].Discount;
		params["DiscountperProd"+i] = DiscountperProd;
		
		var DiscountAmountperProd = allRowsInGrid[i].DiscountAmount;
		params["DiscountAmountperProd"+i] = DiscountAmountperProd;
		
		var igst = allRowsInGrid[i].igst;
		params["igst"+i] = igst;
			
		var total = allRowsInGrid[i].total;
		params["total"+i] = total;
		
		var expiryDate = allRowsInGrid[i].expiryDate;
		params["expiryDate"+i] = expiryDate;
		
		var PkGoodreceiveId = allRowsInGrid[i].PkGoodreceiveId;
		params["PkGoodreceiveId"+i] = PkGoodreceiveId;
		
		var productPkId = allRowsInGrid[i].productPkId;
		params["productPkId"+i] = productPkId;
		
		var chaalanNo = "0";
		params["chaalanNo"+i] = chaalanNo;
		
		var barcode_id = allRowsInGrid[i].barcode_id;
		params["barcode_id"+i] = barcode_id;
	}
	
	if(count == '' || count == '0' || count == undefined || count == null)
	{
		var msg="Please Select Product";
		var dialog = bootbox.dialog({
			//title: "Embel Technologies Says :",
		   /* message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',*/
		    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		    closeButton: false
		});
		
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		document.getElementById("billingCashbtn").disabled = false;	
		return false;
	}
	params["address"] = address;
	params["firmName"] = firmName;
	params["email"] = email;
	params["type"]=type;
	params["customerName"] = customerName;
	params["count"] = count;
	params["village"] = village;
	params["contactNo"] = contactNo;
	params["total"] = total;
	params["fk_shop_id"] = shopName;
	params["gstNo"] = gstNo;
	params["grossTotal"] = grossTotal;
	params["hamaliExpense"] = hamaliExpense;
	/*params["transExpenseWithoutGST"] = transExpenseWithoutGST;*/
	params["hamaliExpenseWithourGST"] = hamaliExpenseWithourGST;
	params["paymentMode"] = paymentMode;
	params["chequeNum"] = chequeNum;
	params["saleDate"] = saleDate;
	params["nameOnCheck"] = nameOnCheck;
	params["cardNum"] = cardNum;
	params["accNum"] = accNum;
	params["discount"] = discount;
	params["discountAmount"] = discountAmount;
	params["bankName"] = bankName;
	params["customerType"] = customerType;
	params["description"] = description;
	
	
	params["methodName"] = "addingFertilizerBill";
	
	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
 	 {
//		window.open("GSTBillPDF.jsp");

//		window.open("NewbillPDF1.jsp");
		//window.open("AutoBillpdf.jsp");
	//window.open("newPDF.jsp");
	window.open("NewPdf1.jsp");
	
	//window.open("TrinityEnterprisesBillPdf.jsp");
	
		location.reload();
		document.getElementById("billingCashbtn").disabled = false;	
		
	 }).error(function(jqXHR, textStatus, errorThrown){
 	    		if(textStatus==="timeout") {
 	    			$(loaderObj).hide();
 	    			$(loaderObj).find('#errorDiv').show();
 	    		}
 	    	});


}

/*************					Cash Customer Bill adding to fertilizerBilling table    28-5-17  ************************/
function fertilizerBill_28_5_17(){
	
	document.fertiBill.btn.disabled = true;
	var params = {};

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
	
	var count = jQuery("#list4").jqGrid('getGridParam', 'records');
	var allRowsInGrid = $('#list4').getGridParam('data');//to get all rows of grid
	var AllRows=JSON.stringify(allRowsInGrid);
	for (var i = 0; i < count; i++) {

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
	params["discount"] = discount;
	params["discountAmount"] = discountAmount;
	
	params["methodName"] = "addingFertilizerBill_28_5_17";
	
	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
 	    	{
 				alert(data);
 				window.open("FertilizerBillPDF.jsp");
 				location.reload();
 	    	}
 	    	).error(function(jqXHR, textStatus, errorThrown){
 	    		if(textStatus==="timeout") {
 	    			$(loaderObj).hide();
 	    			$(loaderObj).find('#errorDiv').show();
 	    		}
 	    	});	
}



/*************					Credit Customer Bill adding to fertilizerBilling table      ************************/
//validation for submit button
function creditCustFertilizerBill()
{	
	if (document.creditFertiBill1.creditCustomer.value == "" )
	 {
	    alert("Please Select Customer Name");
	    return false;
	 }
	/*var letterNumber = /^[a-zA-Z, ]+$/;
	 if(document.creditfertiBill.creditCustomer.value.match(letterNumber))
	 {*/
		 if(document.creditFertiBill1.shopName2.value == "" )
		 {
			alert("Please Select Shop Name")
			return false;
		 }
	

	/*if ( document.creditFertiBill1.village1.value == "" )
	 {
    alert("Please Enter Village");
    return false;
	 }*/

	/* var letterNumber = /^[a-zA-Z, ]+$/;
	 if(document.creditFertiBill1.village1.value.match(letterNumber))
	 {
	
	if ( document.creditFertiBill1.contactNo1.value == "" )
	 {
     alert("Please Enter Contact Number");
     return false;
	 }*/
	 
	 /*var letterNumber = /^[0-9]{10}$/;
	 if(document.creditFertiBill1.contactNo1.value.match(letterNumber))
	 {*/
	if ( document.creditFertiBill1.saleDate2.value == "" )
		 {
	       alert("Please Enter Sale Date");
	       return false;
		 }
		 var letterNumber = /^[0-9]{12}$/;
		/* if(document.creditFertiBill1.aadharNo1.value.match(letterNumber))
		 {*/
						   	    if ( document.creditFertiBill1.proName2.value == "" )
							   	       {
											alert("Please Select Product Name");
											return false;
							   	        }
					   	        				 
					   	        				/*if ( document.creditFertiBill1.transExpence1.value == "" )
						   	        			 {
										  	       alert("Please Enter Transportation Expense");
										  	       return false;
						   	        			 }*/
						   	        			/* var letterNumber = /^\s*-?[0-9]\d*(\.\d{1,2})?\s*$/;
						   	        			 var num = /^\d+$/;
						   	        			 if(document.creditFertiBill1.transExpence1.value.match(letterNumber) || document.creditFertiBill1.transExpence1.value.match(num))
						   	        			 {*/
						   	        				/*if ( document.creditFertiBill1.hamaliExpence1.value == "" )
							   	        			 {
											  	       alert("Please Enter Hamali Expense");
											  	       return false;
							   	        			 }*/
							   	        			/* var letterNumber = /^\s*-?[0-9]\d*(\.\d{1,2})?\s*$/;
							   	        			 var num = /^\d+$/;
							   	        			 if(document.creditFertiBill1.hamaliExpence1.value.match(letterNumber) || document.creditFertiBill1.hamaliExpence1.value.match(num) )
							   	        			 {*/
						   	        				 
							   	        				fertilizerBillForCredit();
														}

							   	        			/*else
													{
														alert("Enter only Numbers upto 2 decimal in Hamali Expense field..!!");
														return false;
													} 
						   	        			 }*/
							   	       /* else
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
		}*/
	 /*else
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
	}*/

/*}*/


function fertilizerBillForCreditCustomer()
{
	
	var creditCustomerName = $('#creditCustomer').val();
	var creditCustomerHiddenName = $('#customerNameHidden').val();
	var village = $('#village1').val();
	var contactNo = $('#contactNo1').val();
	
	
	
			if(creditCustomerName == "")
	{
			var msg="Please Select creditCustomerName  ";
			var dialog = bootbox.dialog({
		    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		    closeButton: false
			});
			
			setTimeout(function() {
				dialog.modal('hide');
			}, 1500);
			return false;
	}
	
	/*		if(productIdCredit == "selected")
	{
			var msg="Please Enter 10 Digit contactNo  ";
			var dialog = bootbox.dialog({
		    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		    closeButton: false
			});
			
			setTimeout(function() {
				dialog.modal('hide');
			}, 1500);
			return false;
		
	}*/
	
			if(contactNo == "")
	{
			var msg="Please Enter 10 Digit contactNo  ";
			var dialog = bootbox.dialog({
		    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		    closeButton: false
			});
			
			setTimeout(function() {
				dialog.modal('hide');
			}, 1500);
			return false;
		
	}
	
	
	/*if (document.creditFertiBill1.creditCustomer.value == "" )
	 {
		var msg="Please Enter Credit Customer Name";
		var dialog = bootbox.dialog({
			//title: "Embel Technologies Says :",
		    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		    closeButton: false
		});
		
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
			document.getElementById("billingCashbtn").disabled = false;	
		return false;
	 }*/
//	else
//	{
		if (document.creditFertiBill1.creditCustomer.value != "" )
		{
		 var letterNumber = /^[a-zA-Z ]+$/;
		 if(document.creditFertiBill1.creditCustomer.value.match(letterNumber))
		 {
			 
		 }
		 else
			{
			 var msg="Please Enter Valid Customer Name";
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
		}
//	}
	
	if(document.creditFertiBill1.contactNo1.value == "" )
	{
		
	}
	else
	{
		if(document.creditFertiBill1.contactNo1.value != "" )
		{
			
			 var letterNumber = /^[0-9]{10}$/;
			 var contactForZero = /^[0-0]{1}$/;
			 if(document.creditFertiBill1.contactNo1.value.match(letterNumber) || document.creditFertiBill1.contactNo1.value.match(contactForZero))
			 {				
				
			 }
			 else
			 {
				    var msg="Please Enter Contact Number";
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
		}
	}
	
	
		/* var letterNumber = /^[0-9]{12}$/;
			if ( document.creditFertiBill1.productIdCredit.value == "" )
	   	     {
				var msg="Please Select Product";
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
						   	var netpayAmount = $("#firstPaidAmtCreditCustomer").val();
						   	var grossTotal1 = $("#grossTotal1").val();
						   	
						   	if((netpayAmount != "" || netpayAmount != "0" || netpayAmount != undefined || netpayAmount != null) && (grossTotal1 != "" || grossTotal1 != "0" || grossTotal1 != undefined || grossTotal1 != null) && Number(netpayAmount) > 0 && Number(grossTotal1) > 0)
						   	{
						   		if(Number(netpayAmount) > Number(grossTotal1))
						   		{
						   			var msg="Net Pay Amount Must not be greater That Gross Total";
						   			customAlert(msg);
									return false;
						   		}
						   	}
						   							   	        				 
						   	if(netpayAmount != "" && netpayAmount != "0")
						   	{
						   		var numbers = /^[0-9]+\.?[0-9]*$/;
						   		if(netpayAmount.match(numbers))
						   		{
						   			if(document.creditFertiBill1.paymentModeCredit.value == ""  || document.creditFertiBill1.paymentModeCredit.value == "selected")
						   			{
						   				var msg="Please Select Payment Mode";
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
						   		}
						   		else
						   		{
						   			var msg="Please Enter Valid Net Pay Amount\nEg : 100.50 ";
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
						   	 
				   	        	if(document.creditFertiBill1.paymentModeCredit.value == "cheque1")
				   	        	{
					   	        	if(document.creditFertiBill1.chequeNum.value == "")
					   	        		{
					   	        			var msg="Please Enter Cheque Number";
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
					   	        	
					   	        	if(document.creditFertiBill1.nameOnCheck.value == "")
				   	        		{				   	        			
				   	        			var msg="Please Enter Name On Check Number";
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
				   	        	}
				   	        	
				   	        	if(document.creditFertiBill1.paymentModeCredit.value == "card1")
				   	        	{	
				   	        		
					   	        	if(document.creditFertiBill1.cardNum.value == "")
					   	        	{					   	        			
					   	        			var msg="Please Enter Card Number";
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
					   	        	if(document.creditFertiBill1.cardNum.value != "")
				   	        		{
					   	        		var numbers = /^[0-9]+$/;
					   	        		if(document.creditFertiBill1.cardNum.value.match(numbers))
					   	        		{
					   	        			
					   	        		}
					   	        		else
					   	        		{
					   	        			var msg="Please Enter Only Numbers in Card Number";
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
				   	        		}
				   	        	}
				   	        	
				   	        	
				   	        	if(document.creditFertiBill1.paymentModeCredit.value == "neft1")
				   	        	{
					   	        	if(document.creditFertiBill1.accNum.value == "")
					   	        		{					   	        			
					   	        			
					   	        			var msg="Please Enter Account Number";
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
					   	        	if(document.creditFertiBill1.accNum.value != "")
				   	        		{
					   	        		var numbers = /^[0-9]+$/;
					   	        		if(document.creditFertiBill1.accNum.value.match(numbers))
					   	        		{
					   	        			
					   	        		}
					   	        		else
					   	        		{
					   	        			var msg="Please Enter Only Numbers in Account Number";
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

				   	        		}
				   	        	
					   	        	if(document.creditFertiBill1.bankName.value == "")
				   	        		{
					   	        		
				   	        			var msg="Please Enter Bank Name";
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
					   	        	if(document.creditFertiBill1.bankName.value != "")
				   	        		{
						   	        	var letters = /^[A-Za-z]+$/;
						   	        	if(document.creditFertiBill1.bankName.value.match(letters))
						   	        	{
						   	        		
						   	        	}
						   	        	else
						   	        	{
					   	        			var msg="Please Enter Valid Bank Name";
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
					   	        		
				   	        		}
				   	        	}
						   	}
							   	 	fertilizerBillForCredit();
}

function fertilizerBillForCredit()
{
	//document.creditFertiBill1.btn2.disable= true ;
	document.getElementById("billingCreditBtn").disabled = true;
	
	var params = {};
	
	var customerType = "CREDITCUSTOMER";	
	
	var firstPaidAmtCreditCustomer = $("#firstPaidAmtCreditCustomer").val();
	
	if(firstPaidAmtCreditCustomer == "" || firstPaidAmtCreditCustomer == null || firstPaidAmtCreditCustomer == undefined) 
	{
		firstPaidAmt = '0';
	}
	
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
	var saleDate = $('#saleDate2').val();
	var type1 = $('#type1').val();
	var email = $('#email1').val();
	
	var firmName = $('#CfirmName').val();
	
	if(creditCustomerName=="" || creditCustomerName==null || creditCustomerName==undefined){
		creditCustomerName="NA";
	}
	if(fkCreditCustomerID=="" || fkCreditCustomerID==null || fkCreditCustomerID==undefined){
		fkCreditCustomerID=0;
	}
	if(email=="" || email==null || email==undefined){
		email="abc@g.com";
	}
	if(village=="" || village==null || village==undefined){
		village="NA";
	}
	if(contactNo=="" || contactNo==null || contactNo==undefined){
		contactNo=0;
	}
	if(firmName=="" || firmName==null || firmName==undefined){
		firmName="NA";
	}
	
	var input = document.getElementById('shopName2'),
    list = document.getElementById('shop_drop2'),
           i,shopName;

	for (i = 0; i < list.options.length; ++i) {
    if (list.options[i].value === input.value) {
    	shopName = list.options[i].getAttribute('data-value');
    	}
	}
	var gstNo = $('#gstNo2').val();
	var hamaliExpense = $('#hamaliExpence1').val();
	var hamaliExpenseWithourGST = $('#hamaliExpence3').val();
	var grossTotal = $('#grossTotal1').val();
	var total = $('#totalWithExpense1').val();
	var discount = $('#discount1').val();
	var discountAmount = $('#discountAmount1').val();
	var paymentMode = $('#paymentModeCredit').val();
	var description = $('#description1').val();
	
//	var chequeNum = document.creditFertiBill1.chequeNum.value;
//	var nameOnCheck = document.creditFertiBill1.nameOnCheck.value;
//	var cardNum = document.creditFertiBill1.cardNum.value;
//	var accNum = document.creditFertiBill1.accNum.value;
//	var bankName = document.creditFertiBill1.bankName.value;
	
	var chequeNum = 0;
	var nameOnCheck = "NA";
	var cardNum = 0;
	var accNum = 0;
	var bankName = "NA";
	
	
	var count = jQuery("#credit").jqGrid('getGridParam', 'records');
	var allRowsInGrid = $('#credit').getGridParam('data');               //to get all rows of grid
	var AllRows=JSON.stringify(allRowsInGrid);
	for (var i = 0; i < count; i++)
	{

		var cat_id = allRowsInGrid[i].cat_id;
		params["cat_id"+i] = cat_id;
		
		var sub_Cat_Id = allRowsInGrid[i].sub_Cat_Id;
		params["sub_Cat_Id"+i] = sub_Cat_Id;
		
		var itemName = allRowsInGrid[i].itemName;
		params["itemName"+i] = itemName;
		
		var barcodeNo = allRowsInGrid[i].barcodeNo;
		params["barcodeNo"+i] = barcodeNo;
		
		var companyName = allRowsInGrid[i].companyName;
		params["companyName"+i] = companyName;
		
		var hsn = allRowsInGrid[i].hsn;
		params["hsn"+i] = hsn;
		
		var unitName = allRowsInGrid[i].unitName;
//		if(unitName == 'Box/pcs'){
//			unitName = 'pcs' ;
//			params["unitName"+i] = unitName;
//		}else{
			params["unitName"+i] = unitName;
//		}
		
		var weight = allRowsInGrid[i].weight;
		params["weight"+i] = weight;                //packing
		
		var expiryDate = allRowsInGrid[i].expiryDate;
		params["expiryDate"+i] = expiryDate;
		
		var salePrice = allRowsInGrid[i].sp;
		
		var mrp = allRowsInGrid[i].mrp;
		
		if(salePrice != '')
		{		
			var numbers = /^[0-9]+\.?[0-9]*$/;
			if(String(salePrice).match(numbers))
			{	
				if(salePrice == "0" || salePrice == undefined || salePrice == '' || salePrice == null)
				{
					var msg="Please Enter Unit Price";
					var dialog = bootbox.dialog({
						//title: "Embel Technologies Says :",
					    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
					    closeButton: false
					});
					
					setTimeout(function() {
						dialog.modal('hide');
					}, 1500);

						document.getElementById("billingCreditBtn").disabled = false;
						return false;
				}
			}
			else
			{
				var msg="Please Enter Valid Unit Price";
				var dialog = bootbox.dialog({
					//title: "Embel Technologies Says :",
				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
				    closeButton: false
				});
				
				setTimeout(function() {
					dialog.modal('hide');
				}, 1500);

					document.getElementById("billingCreditBtn").disabled = false;
					return false;
			}
		}
		
		
		if(mrp != '')
		{
			var numbers = /^[0-9]+\.?[0-9]*$/;
			if(String(mrp).match(numbers))
			{		
				if(mrp == '' || mrp == '0' || mrp == undefined || mrp == null)
				{
					mrp = 0;
				}
				else if(Number(salePrice) > Number(mrp))
					{
						var msg="MRP must be greater Than Unit Price";
						var dialog = bootbox.dialog({
							//title: "Embel Technologies Says :",
						    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
						    closeButton: false
						});
						
						setTimeout(function() {
							dialog.modal('hide');
						}, 1500);
						document.getElementById("billingCreditBtn").disabled = false;
						return false;

					}
			}
			else
			{			
					var msg="Please Enter valid MRP Price";
					var dialog = bootbox.dialog({
						//title: "Embel Technologies Says :",
					    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
					    closeButton: false
					});
					
					setTimeout(function() {
						dialog.modal('hide');
					}, 1500);

					document.getElementById("billingCreditBtn").disabled = false;
					return false;
			}			
		}
		
		params["salePrice"+i] = salePrice;
		params["mrp"+i] = mrp;
		
		var quantity = allRowsInGrid[i].quantity;
				
		if(unitName == 'kg')
		{
			if(quantity == "0" || quantity == undefined || quantity == "" || quantity == null)			
			{
				var msg="Please Enter Kg OR Grams";
				var dialog = bootbox.dialog({
					//title: "Embel Technologies Says :",
				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
				    closeButton: false
				});
				
				setTimeout(function() {
					dialog.modal('hide');
				}, 1500);

 				document.getElementById("billingCreditBtn").disabled = false;
				return false;
			}
			else
			{
				params["quantity"+i] = quantity;		
			}
		}
		
		if(unitName == 'grams')
		{
			if(quantity == "0" || quantity == undefined || quantity == "" || quantity == null)			
			{
				var msg="Please Enter Kg OR Grams";
				var dialog = bootbox.dialog({
					//title: "Embel Technologies Says :",
				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
				    closeButton: false
				});
				
				setTimeout(function() {
					dialog.modal('hide');
				}, 1500);

 				document.getElementById("billingCreditBtn").disabled = false;
				return false;
			}
			else
			{
				params["quantity"+i] = quantity;		
			}
		}
		
		if(unitName == 'ltr')
		{
			if(quantity == "0" || quantity == undefined || quantity == "" || quantity == null)
			{
				var msg="Please Enter Ltr OR mili";
				var dialog = bootbox.dialog({
					//title: "Embel Technologies Says :",
				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
				    closeButton: false
				});
				
				setTimeout(function() {
					dialog.modal('hide');
				}, 1500);

 				document.getElementById("billingCreditBtn").disabled = false;
				return false;
			}
			else
			{
				params["quantity"+i] = quantity;		
			}
		}
		
		if(unitName == 'millilitre')
		{
			if(quantity == "0" || quantity == undefined || quantity == "" || quantity == null)
			{
				var msg="Please Enter Ltr OR mili";
				var dialog = bootbox.dialog({
					//title: "Embel Technologies Says :",
				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
				    closeButton: false
				});
				
				setTimeout(function() {
					dialog.modal('hide');
				}, 1500);

 				document.getElementById("billingCreditBtn").disabled = false;
				return false;
			}
			else
			{
				params["quantity"+i] = quantity;		
			}
		}
		
		if(unitName == 'pcs')
		{
			if(quantity == "0" || quantity == undefined || quantity == "" || quantity == null)
			{
				var msg="Please Enter Quantity";
				var dialog = bootbox.dialog({
					//title: "Embel Technologies Says :",
				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
				    closeButton: false
				});
				
				setTimeout(function() {
					dialog.modal('hide');
				}, 1500);

 				document.getElementById("billingCreditBtn").disabled = false;
				return false;
			}
			else
			{
				params["quantity"+i] = quantity;		
			}
			
			var freeQuantity = allRowsInGrid[i].freeQuantity;
			if(freeQuantity == "0" || freeQuantity == undefined || freeQuantity == "" || freeQuantity == null)
			{
				params["freeQuantity"+i] = 0;
			}
			else
			{
				params["freeQuantity"+i] = freeQuantity;
			}
		}
		
		var freeQuantity = allRowsInGrid[i].freeQuantity;
		params["freeQuantity"+i] = freeQuantity;
		
		var quantity = allRowsInGrid[i].quantity;
		params["quantity"+i] = quantity;		
		
		var cgst = allRowsInGrid[i].cgst;
		params["cgst"+i] = cgst;
		
		var sgst = allRowsInGrid[i].sgst;
		params["sgst"+i] = sgst;
		
		var DiscountperProd = allRowsInGrid[i].Discount;
		params["DiscountperProd"+i] = DiscountperProd;
		
		var DiscountAmountperProd = allRowsInGrid[i].DiscountAmount;
		params["DiscountAmountperProd"+i] = DiscountAmountperProd;
		
		var gst = allRowsInGrid[i].vatPercentage;
		params["gst"+i] = gst;
				
		var igst = allRowsInGrid[i].igst;
		params["igst"+i] = igst;
		
		var total = allRowsInGrid[i].total;
		params["total"+i] = total;
		
		var PkGoodreceiveId = allRowsInGrid[i].PkGoodreceiveId;
		params["PkGoodreceiveId"+i] = PkGoodreceiveId;
		
		var productPkId = allRowsInGrid[i].productPkId;
		params["productPkId"+i] = productPkId;
		
		var chaalanNo = allRowsInGrid[i].chaalanNo;
		params["chaalanNo"+i] = chaalanNo;
		
		var barcode_id = allRowsInGrid[i].barcode_id;
		params["barcode_id"+i] = barcode_id;
		
	}
	
	if(count == "0" || count == undefined || count == "" || count == null)
	{
		var msg="Please Select Product";
		var dialog = bootbox.dialog({
			//title: "Embel Technologies Says :",
		    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		    closeButton: false
		});
		
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		document.getElementById("billingCreditBtn").disabled = false;
		return false;
	}
	
	params["firmName"] = firmName;
	params["email"] = email;
	params["creditCustomerHiddenName"] = creditCustomerHiddenName;
	params["fkCreditCustomerID"] = fkCreditCustomerID;
	params["count"] = count;
	params["village"] = village;
	params["saleDate"] = saleDate;
	params["gstNo"] = gstNo;
	params["contactNo"] = contactNo;
	params["hamaliExpenseWithourGST"] = hamaliExpenseWithourGST;
	params["total"] = total;
	params["fk_shop_id"] = shopName;
	params["grossTotal"] = grossTotal;
	params["hamaliExpense"] = hamaliExpense;
	params["creditCustomerName"] = creditCustomerName;
	params["discount"] = discount;
	params["discountAmount"] = discountAmount
	params["customerType"] = customerType;
	params["firstPaidAmtCreditCustomer"] = firstPaidAmtCreditCustomer;
	params["paymentMode"] = paymentMode;
	params["chequeNum"] = chequeNum;	
	params["nameOnCheck"] = nameOnCheck;
	params["cardNum"] = cardNum;
	params["accNum"] = accNum;
	params["bankName"] = bankName;	
	params["description"] = description;
	params["type"]=type1;
	
	params["methodName"] = "addingFertilizerBill";
	
	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
	{
//		window.open("GSTBillPDF.jsp");

//		window.open("NewbillPDF1.jsp");		
//		window.open("");
  //      window.open("TrinityEnterprisesBillPdf.jsp");
		
		/*if((firstPaidAmtCreditCustomer != "0" || firstPaidAmtCreditCustomer != "" || firstPaidAmtCreditCustomer != null || firstPaidAmtCreditCustomer != undefined) && Number(firstPaidAmtCreditCustomer) > 0)
		{
		//		window.open("newPDF.jsp");
		//	window.open("creditNoteForCustomerPDF.jsp");
		window.open("TrinityEnterprisesBillPdf.jsp");
		}*/
		
		//window.open("newPDF.jsp");	
		window.open("NewPdf1.jsp");	
		location.reload();
		document.getElementById("billingCreditBtn").disabled = false;
	}
	).error(function(jqXHR, textStatus, errorThrown){
		if(textStatus==="timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});
}

/*** +++ Fetching product Name FOR CASH CUSTOMER+++ *****/
function getProductName()
{				
	var shopId = $("#shopId").val();

	 	//var fk_cat_id = 1;
		$("#proName").empty();
		$("#proName").append($("<option></option>").attr("value","").text("Select Product"));
					 
		var params= {};
		
		params["shopId"] = shopId;
		params["methodName"] = "getAllProductByCategoriesForFertiBill";
		
		
		//params["fk_cat_id"]= fk_cat_id;
		
		$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
		{
			var count = 1;
				
			var jsonData = $.parseJSON(data);
			$.each(jsonData,function(i,v)
			{				
					$("#proName").append($("<option></option>").attr("value",count).text(v.product+" => "+v.manufacturer+" => "+v.weight+" "+v.unitName+" cat => "+v.catName+" => "+v.fkCatId+" subcat => "+v.subCatName+" => "+v.fkSubCatId+" => "+v.stockInTotalKgLtrPiece+" "+v.unitName+" Expiry Date => "+v.expiryDate));
					count++;
				
					$("#proName").append($("<option></option>").attr("value",count).text(v.product + ","+v.manufacturer+","+v.weight+",Kg Stock =,"+v.quantityDouble+",cat =,"+v.catName+","+v.fkCatId+",subcat =,"+v.subCatName+","+v.fkSubCatId+","+v.stockInGrams+","+v.stockInMili+","+v.stockInTotalPieceQauntity));
					count++;
			});
		}
		).error(function(jqXHR, textStatus, errorThrown){
					if(textStatus==="timeout") {

					}
				});
	}

/*** +++ Fetching product Name FOR CREDIT CUSTOMER+++ *****/
function getProductNameForCredit()
{
	var shopId = $("#shopId").val();
		
	 //var fk_cat_id = 1;
		$("#proName2").empty();
		$("#proName2").append($("<option></option>").attr("value","").text("Select product"));
		var params= {};
		params["shopId"] = shopId;
		params["methodName"] = "getAllProductByCategoriesForFertiBill";
		
		//params["fk_cat_id"]= fk_cat_id;
		
		$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
		{ var count = 1;
				
			var jsonData = $.parseJSON(data);
			$.each(jsonData,function(i,v)
			{
					$("#proName2").append($("<option></option>").attr("value",count).text(v.product+" => "+v.manufacturer+" => "+v.weight+" "+v.unitName+" cat => "+v.catName+" => "+v.fkCatId+" subcat => "+v.subCatName+" => "+v.fkSubCatId+" => "+v.stockInTotalKgLtrPiece+" "+v.unitName+" Expiry Date => "+v.expiryDate));
					count++;
					$("#proName2").append($("<option></option>").attr("value",count).text(v.product + ","+v.manufacturer+","+v.weight+",Kg Stock =,"+v.quantityDouble+",cat =,"+v.catName+","+v.fkCatId+",subcat =,"+v.subCatName+","+v.fkSubCatId)); 
					count++;
					});
				}).error(function(jqXHR, textStatus, errorThrown){
					if(textStatus==="timeout") {

					}
				});
}



/* ++++++++++++++ Get credit customer details ++++*/
function customerDetail(){
	
	this.getVillageName = getVillageName;
	this.getContactNo = getContactNo;
	this.getName = getName;
	//this.getAadhar = getAadhar;
	
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
		params["creditCustomerId"]= creditCustomerId;
		
		params["methodName"] = "getVillageNameAndContactNoAndFirstNameByCustomer";
		
		$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
				{
			var jsonData = $.parseJSON(data);
			//var jsonData = jsonData.list;
			$.each(jsonData,function(i,v)
			{
				document.getElementById("village1").value = v.village;
				document.getElementById("gstNo2").value = v.gstno;
				document.getElementById("contactNo1").value = v.contactNo;
				document.getElementById("email1").value = v.email;
				
					});
				}).error(function(jqXHR, textStatus, errorThrown){
					if(textStatus==="timeout") {

					}
				});

	}
	
	/*function getAadhar(){

		
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
		$.post('/Fertilizer/jsp/utility/controller.jsp',params,function(data)
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

	
		
	}*/
	
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



function getChallanNo()
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
	$("#challanNoC").empty();
	$("#challanNoC").append($("<input/>").attr("value","").text());
	var params= {};
	params["methodName"] = "getChallanNoByCustomer";
	params["creditCustomerId"]= creditCustomerId;
	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
			{
		var jsonData = $.parseJSON(data);
		//var jsonData = jsonData.list;
		$.each(jsonData,function(i,v)
		{
			document.getElementById("challanNoC").value = v.challanNo;
		});
	}).error(function(jqXHR, textStatus, errorThrown){
		if(textStatus==="timeout") {

		}
	});

}


function challanBillingV()
{
	if (document.creditFertiBill1.creditCustomer.value == "" )
	 {
		var msg="Please Enter Credit Customer Name";
		var dialog = bootbox.dialog({
			//title: "Embel Technologies Says :",
		    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		    closeButton: false
		});
		
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
			document.getElementById("billingCreditBtn").disabled = false;	
		return false;
	 }
	else
	{
		if (document.creditFertiBill1.creditCustomer.value != "" )
		{
		 var letterNumber = /^[a-zA-Z ]+$/;
		 if(document.creditFertiBill1.creditCustomer.value.match(letterNumber))
		 {
			 
		 }
		 else
			{
			 var msg="Please Enter Valid Customer Name";
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
		}
	}
	
	if(document.creditFertiBill1.contactNo1.value == "" )
	{
		
	}
	else
	{
		if(document.creditFertiBill1.contactNo1.value != "" )
		{
			
			 var letterNumber = /^[0-9]{10}$/;
			 var contactForZero = /^[0-0]{1}$/;
			 if(document.creditFertiBill1.contactNo1.value.match(letterNumber) || document.creditFertiBill1.contactNo1.value.match(contactForZero))
			 {				
				
			 }
			 else
			 {
				    var msg="Please Enter Valid 10 Digit Contact Number";
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
		}
	}
	
	
		/* var letterNumber = /^[0-9]{12}$/;
			if ( document.creditFertiBill1.productIdCredit.value == "" )
	   	     {
				var msg="Please Select Product";
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
						   	var netpayAmount = $("#firstPaidAmtCreditCustomer").val();
						   	var grossTotal1 = $("#grossTotal1").val();
						   	
						   	if((netpayAmount != "" || netpayAmount != "0" || netpayAmount != undefined || netpayAmount != null) && (grossTotal1 != "" || grossTotal1 != "0" || grossTotal1 != undefined || grossTotal1 != null) && Number(netpayAmount) > 0 && Number(grossTotal1) > 0)
						   	{
						   		if(Number(netpayAmount) > Number(grossTotal1))
						   		{
						   			var msg="Net Pay Amount Must not be greater That Gross Total";
						   			customAlert(msg);
									return false;
						   		}
						   	}
						   							   	        				 
						   	if(netpayAmount != "" && netpayAmount != "0")
						   	{
						   		var numbers = /^[0-9]+\.?[0-9]*$/;
						   		if(netpayAmount.match(numbers))
						   		{
						   			if(document.creditFertiBill1.paymentModeCredit.value == ""  || document.creditFertiBill1.paymentModeCredit.value == "selected")
						   			{
						   				var msg="Please Select Payment Mode";
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
						   		}
						   		else
						   		{
						   			var msg="Please Enter Valid Net Pay Amount\nEg : 100.50 ";
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
						   	 
				   	        	if(document.creditFertiBill1.paymentModeCredit.value == "cheque1")
				   	        	{
					   	        	if(document.creditFertiBill1.chequeNum.value == "")
					   	        		{
					   	        			var msg="Please Enter Cheque Number";
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
					   	        	
					   	        	if(document.creditFertiBill1.nameOnCheck.value == "")
				   	        		{				   	        			
				   	        			var msg="Please Enter Name On Check Number";
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
				   	        	}
				   	        	
				   	        	if(document.creditFertiBill1.paymentModeCredit.value == "card1")
				   	        	{	
				   	        		
					   	        	if(document.creditFertiBill1.cardNum.value == "")
					   	        	{					   	        			
					   	        			var msg="Please Enter Card Number";
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
					   	        	if(document.creditFertiBill1.cardNum.value != "")
				   	        		{
					   	        		var numbers = /^[0-9]+$/;
					   	        		if(document.creditFertiBill1.cardNum.value.match(numbers))
					   	        		{
					   	        			
					   	        		}
					   	        		else
					   	        		{
					   	        			var msg="Please Enter Only Numbers in Card Number";
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
				   	        		}
				   	        	}
				   	        	
				   	        	
				   	        	if(document.creditFertiBill1.paymentModeCredit.value == "neft1")
				   	        	{
					   	        	if(document.creditFertiBill1.accNum.value == "")
					   	        		{					   	        			
					   	        			
					   	        			var msg="Please Enter Account Number";
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
					   	        	if(document.creditFertiBill1.accNum.value != "")
				   	        		{
					   	        		var numbers = /^[0-9]+$/;
					   	        		if(document.creditFertiBill1.accNum.value.match(numbers))
					   	        		{
					   	        			
					   	        		}
					   	        		else
					   	        		{
					   	        			var msg="Please Enter Only Numbers in Account Number";
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
				   	        		}
				   	        	
					   	        	if(document.creditFertiBill1.bankName.value == "")
				   	        		{
					   	        		
				   	        			var msg="Please Enter Bank Name";
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
					   	        	if(document.creditFertiBill1.bankName.value != "")
				   	        		{
						   	        	var letters = /^[A-Za-z]+$/;
						   	        	if(document.creditFertiBill1.bankName.value.match(letters))
						   	        	{}
						   	        	else
						   	        	{
					   	        			var msg="Please Enter Valid Bank Name";
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
					   	        		
				   	        		}
				   	        	}
						   	}
						   	challanBilling();
}

function challanBilling()
{
	//document.creditFertiBill1.btn2.disable= true ;
	document.getElementById("billingCreditBtn").disabled = true;
	
	var params = {};
	
	var customerType = "CREDITCUSTOMER";	
	
	var firstPaidAmtCreditCustomer = $("#firstPaidAmtCreditCustomer").val();
	
	if(firstPaidAmtCreditCustomer == "" || firstPaidAmtCreditCustomer == null || firstPaidAmtCreditCustomer == undefined) 
	{
		firstPaidAmt = '0';
	}
	
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
	var saleDate = $('#saleDate2').val();
	
	var email= $('#email').val();
	
	var input = document.getElementById('shopName2'),
    list = document.getElementById('shop_drop2'),
           i,shopName;

	for (i = 0; i < list.options.length; ++i) {
    if (list.options[i].value === input.value) {
    	shopName = list.options[i].getAttribute('data-value');
    	}
	}
	var gstNo = $('#gstNo2').val();
	var hamaliExpense = $('#hamaliExpence1').val();
	var hamaliExpenseWithourGST = $('#hamaliExpence3').val();
	var grossTotal = $('#grossTotal1').val();
	var totalAll = $('#totalWithExpense1').val();
	var discount = $('#discount1').val();
	var discountAmount = $('#discountAmount1').val();
	var paymentMode = $('#paymentModeCredit').val();
	var challanNo = $('#challanNoC').val();
	var gstForExpense1 = $('#gstForExpense1').val();
	var hamaliExpence1 = $('#hamaliExpence1').val();
	
	
	if(discount == "" || discount == null || discount == undefined) 
	{
		discount = 0;
	}
	if(discountAmount == "" || discountAmount == null || discountAmount == undefined) 
	{
		discountAmount = 0;
	}
	if(email== "" || email== null || email== undefined) 
	{
		email= "abc@gmail.com";
	}
	
	var chequeNum = document.creditFertiBill1.chequeNum.value;
	var nameOnCheck = document.creditFertiBill1.nameOnCheck.value;
	var cardNum = document.creditFertiBill1.cardNum.value;
	var accNum = document.creditFertiBill1.accNum.value;
	var bankName = document.creditFertiBill1.bankName.value;
	
	var count = jQuery("#credit").jqGrid('getGridParam', 'records');
	var allRowsInGrid = $('#credit').getGridParam('data');               //to get all rows of grid
	var AllRows=JSON.stringify(allRowsInGrid);
	for (var i = 0; i < count; i++)
	{
		var cat_id = allRowsInGrid[i].cat_id;
		params["cat_id"+i] = cat_id;
		
		var sub_cat_id = allRowsInGrid[i].sub_cat_id;
		params["sub_cat_id"+i] = sub_cat_id;
		
		var itemName = allRowsInGrid[i].itemName;
		params["itemName"+i] = itemName;		
		
		var productPkId = allRowsInGrid[i].productPkId;
		params["productPkId"+i] = productPkId;
		
		var unitPkId = allRowsInGrid[i].unitPkId;
		params["unitPkId"+i] = unitPkId;
		
		var taxPkId = allRowsInGrid[i].taxPkId;
		params["taxPkId"+i] = taxPkId;
		
		var barcodeNo = allRowsInGrid[i].barcodeNo;
		params["barcodeNo"+i] = barcodeNo;
		
		var companyName = allRowsInGrid[i].companyName;
		params["companyName"+i] = companyName;
		
		var hsn = allRowsInGrid[i].hsn;
		params["hsn"+i] = hsn;
		
		var unitName = allRowsInGrid[i].unitName;
		if(unitName == 'Box/pcs'){
			unitName = 'pcs' ;
			params["unitName"+i] = unitName;
		}else{
			params["unitName"+i] = unitName;
		}
		
		var weight = allRowsInGrid[i].weight;
		params["weight"+i] = weight;                //packing
		
		var expiryDate = allRowsInGrid[i].expiryDate;
		params["expiryDate"+i] = expiryDate;
		
		var salePrice = allRowsInGrid[i].sp;
		
		var mrp = allRowsInGrid[i].mrp;
		
		if(salePrice != '')
		{		
			var numbers = /^[0-9]+\.?[0-9]*$/;
			if(String(salePrice).match(numbers))
			{	
				if(salePrice == "0" || salePrice == undefined || salePrice == '' || salePrice == null)
				{
					var msg="Please Enter Unit Price";
					var dialog = bootbox.dialog({
						//title: "Embel Technologies Says :",
					    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
					    closeButton: false
					});
					
					setTimeout(function() {
						dialog.modal('hide');
					}, 1500);

						document.getElementById("billingCreditBtn").disabled = false;
						return false;
				}
			}
			else
			{
				var msg="Please Enter Valid Unit Price";
				var dialog = bootbox.dialog({
					//title: "Embel Technologies Says :",
				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
				    closeButton: false
				});
				
				setTimeout(function() {
					dialog.modal('hide');
				}, 1500);

					document.getElementById("billingCreditBtn").disabled = false;
					return false;
			}
		}
		
		
		if(mrp != '')
		{
			var numbers = /^[0-9]+\.?[0-9]*$/;
			if(String(mrp).match(numbers))
			{		
				if(mrp == '' || mrp == '0' || mrp == undefined || mrp == null)
				{
					mrp = 0;
				}
				else if(Number(salePrice) > Number(mrp))
					{
						var msg="MRP must be greater Than Unit Price";
						var dialog = bootbox.dialog({
							//title: "Embel Technologies Says :",
						    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
						    closeButton: false
						});
						
						setTimeout(function() {
							dialog.modal('hide');
						}, 1500);
						document.getElementById("billingCreditBtn").disabled = false;
						return false;

					}
			}
			else
			{			
					var msg="Please Enter valid MRP Price";
					var dialog = bootbox.dialog({
						//title: "Embel Technologies Says :",
					    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
					    closeButton: false
					});
					
					setTimeout(function() {
						dialog.modal('hide');
					}, 1500);

					document.getElementById("billingCreditBtn").disabled = false;
					return false;
			}			
		}
		
		params["salePrice"+i] = salePrice;
		params["mrp"+i] = mrp;
		
		var quantity = allRowsInGrid[i].quantity;
		params["quantity"+i] = quantity;		
		
	/*	if(unitName == 'kg')
		{
			if(quantity == "0" || quantity == undefined || quantity == "" || quantity == null)			
			{
				var msg="Please Enter Kg OR Grams";
				var dialog = bootbox.dialog({
					//title: "Embel Technologies Says :",
				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
				    closeButton: false
				});
				
				setTimeout(function() {
					dialog.modal('hide');
				}, 1500);

 				document.getElementById("billingCreditBtn").disabled = false;
				return false;
			}
			else
			{
				params["quantity"+i] = quantity;		
			}
		}*/
		
		/*if(unitName == 'ltr')
		{
			if(quantity == "0" || quantity == undefined || quantity == "" || quantity == null)
			{
				var msg="Please Enter Ltr OR mili";
				var dialog = bootbox.dialog({
					//title: "Embel Technologies Says :",
				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
				    closeButton: false
				});
				
				setTimeout(function() {
					dialog.modal('hide');
				}, 1500);

 				document.getElementById("billingCreditBtn").disabled = false;
				return false;
			}
			else
			{
				params["quantity"+i] = quantity;		
			}
		}*/
		
		
	/*	if(unitName == 'pcs')
		{
			if(quantity == "0" || quantity == undefined || quantity == "" || quantity == null)
			{
				var msg="Please Enter Quantity";
				var dialog = bootbox.dialog({
					//title: "Embel Technologies Says :",
				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
				    closeButton: false
				});
				
				setTimeout(function() {
					dialog.modal('hide');
				}, 1500);

 				document.getElementById("billingCreditBtn").disabled = false;
				return false;
			}
			else
			{
				params["quantity"+i] = quantity;		
			}
			

			if(freeQuantity == "0" || freeQuantity == undefined || freeQuantity == "" || freeQuantity == null)
			{
				params["freeQuantity"+i] = 0;
			}
			else
			{

			}
		}*/
		
		var freeQuantity = allRowsInGrid[i].freeQuantity;
		params["freeQuantity"+i] = freeQuantity;
		
		var cgst = allRowsInGrid[i].cgst;
		params["cgst"+i] = cgst;
		
		var sgst = allRowsInGrid[i].sgst;
		params["sgst"+i] = sgst;
		
		var DiscountperProd = allRowsInGrid[i].Discount;
		params["DiscountperProd"+i] = DiscountperProd;
		
		var DiscountAmountperProd = allRowsInGrid[i].DiscountAmount;
		params["DiscountAmountperProd"+i] = DiscountAmountperProd;
		
		var gst = allRowsInGrid[i].vatPercentage;
		params["gst"+i] = gst;
				
		var igst = allRowsInGrid[i].igst;
		params["igst"+i] = igst;
		
		var total = allRowsInGrid[i].total;
		params["total"+i] = total;
		
		var PkGoodreceiveId = allRowsInGrid[i].PkGoodreceiveId;
		params["PkGoodreceiveId"+i] = PkGoodreceiveId;
		
		var noOfboxes = allRowsInGrid[i].noOfboxes;
		params["noOfboxes"+i] = noOfboxes;
		
		var TotalEx = allRowsInGrid[i].TotalEx;
		params["TotalEx"+i] = TotalEx;
	}
	
	if(count == "0" || count == undefined || count == "" || count == null)
	{
		var msg="Please Select Product";
		var dialog = bootbox.dialog({
			//title: "Embel Technologies Says :",
		    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		    closeButton: false
		});
		
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		document.getElementById("billingCreditBtn").disabled = false;
		return false;
	}
	
	params["creditCustomerHiddenName"] = creditCustomerHiddenName;
	params["fkCreditCustomerID"] = fkCreditCustomerID;
	params["count"] = count;
	params["village"] = village;
	params["saleDate"] = saleDate;
	params["gstNo"] = gstNo;
	params["contactNo"] = contactNo;
	params["hamaliExpenseWithourGST"] = hamaliExpenseWithourGST;
	params["totalAll"] = totalAll;
	params["fk_shop_id"] = shopName;
	params["grossTotal"] = grossTotal;
	params["hamaliExpense"] = hamaliExpense;
	params["creditCustomerName"] = creditCustomerName;
	params["discount"] = discount;
	params["discountAmount"] = discountAmount
	params["customerType"] = customerType;
	params["firstPaidAmtCreditCustomer"] = firstPaidAmtCreditCustomer;
	params["paymentMode"] = paymentMode;
	params["chequeNum"] = chequeNum;	
	params["nameOnCheck"] = nameOnCheck;
	params["cardNum"] = cardNum;
	params["accNum"] = accNum;
	params["bankName"] = bankName;	
	params["challanNo"] = challanNo;
	params["gstForExpense1"] = gstForExpense1;
	params["hamaliExpence1"] = hamaliExpence1;
	params["email"] = email;
	
	params["methodName"] = "challanBillHelper";
	
	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
	{
		window.open("ChallanBillPDF.jsp");
		/*if((firstPaidAmtCreditCustomer != "0" || firstPaidAmtCreditCustomer != "" || firstPaidAmtCreditCustomer != null || firstPaidAmtCreditCustomer != undefined) && Number(firstPaidAmtCreditCustomer) > 0)
		{
			window.open("creditNoteForCustomerPDF.jsp");
		}*/
		location.reload();
		document.getElementById("billingCreditBtn").disabled = false;
	}
	).error(function(jqXHR, textStatus, errorThrown){
		if(textStatus==="timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});
}

/*--------------------------------------All Non GST Billing Function-------------------------------------------*/

function getProductDetailsByProductNamefornonGSTbilling(){
	
	var params= {};
	itemparams = {};
	
	var barcodeNo = $('#barcodeNo').val();
	var productId = $('#productIdCash').val();
	
	var splitText = productId.split(" => ");
	
	var proName = splitText[0];
	var barcode = splitText[1];
	var company = splitText[2];
	var subCatId = splitText[7];
	var weight= splitText[5];
	var catId = splitText[8];
	var expiryDate = splitText[9];
	var packed = splitText[10];
	var proid = splitText[11];
	
	params["proName"]= proName;
	params["barcode"]= barcode;
	params["productId"]= productId;
	params["company"]= company;
	params["weight"]= weight;
	params["catId"]= catId;
	params["subCatId"]= subCatId;
	params["expiryDate"]= expiryDate;
	params["packed"] = packed;
	params["barcodeNo"]= barcodeNo;	
	params["proid"] = proid;
	
	document.getElementById('barcodeNo').value = "";
	
	var count=0;
	var newrow;
	var rowId;
	
	params["methodName"] = "getProductDetailsfornonGstbill";
	
	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
 	   {
		  var jsonData = $.parseJSON(data);
			    
	     $.each(jsonData,function(i,v)
		 { 
			  var gTotal=0;
			  
			  var aaa = document.getElementById("totalWithExpense").value;
			  if(aaa=="" || aaa==null || aaa==undefined){
				  aaa=0;
			  }
					{
			    		gTotal = +gTotal + +v.total;
			    		aaa = +aaa + +gTotal;
					}
					
		    	document.getElementById("totalWithExpense").value = aaa;  
		    	document.getElementById("grossTotal").value = aaa;
		    	
	        function sumFmatter (cellvalue, options, rowObject)
	        {	            
	        	var jam=0;
	        	
	        	count = jQuery("#list4").jqGrid('getGridParam', 'records');
	        	var allRowsInGrid1 = $('#list4').getGridParam('data');
	        	var AllRows=JSON.stringify(allRowsInGrid1);
	        	for (var i = 0; i < count; i++)
	        	{	        		
	        		var kg = allRowsInGrid1[i].kg;
	        		params["kg"+i] = kg;
	        		
	        		var grams = allRowsInGrid1[i].grams;
	        		params["grams"+i] = grams;
	        		
	        		var defQuantity = 1;	        		
	            	var quantity = allRowsInGrid1[i].quantity;
	            	params["quantity"+i] = quantity;
	             	
	             	var sp = allRowsInGrid1[i].sp;
	            	params["sp"+i] = sp;                        //sale Price
	            	
	            	var cgst = allRowsInGrid1[i].cgst;
	            	params["cgst"+i] = cgst;
	            	
	            	var sgst = allRowsInGrid1[i].sgst;
	            	params["sgst"+i] = sgst;
	            	
	            	vatPercentage = +cgst+ +sgst;               //gst percentage
	            		            		                        	
	            	if(vatPercentage == 0){
	            		
	            		var totals1=(sp)*(quantity);
	            		if(isNaN(totals1)){
		             		totals1 = 0;
						}
		            	jam = jam + totals1;
	            	}
	            	
	                if(vatPercentage != 0){
	                	
	                	var taxcal = (vatPercentage/100) * sp;
	                	var newSalePrice = Number(sp) + Number(taxcal);
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
	        
	         count = jQuery("#list4").jqGrid('getGridParam', 'records'); 
		     var rowdata =$("#list4").jqGrid('getGridParam','data');
		     var ids = jQuery("#list4").jqGrid('getDataIDs');
			
			  var prodName, com, packing, unit, expiryDate, barcodeno2,subcatid,proid,cat;
			  var tot1=0;
			  for (var j = 0; j < count; j++) 
			  {
				  prodName = rowdata[j].itemName;
				  com = rowdata[j].companyName;
				  packing = rowdata[j].weight;
				  unit = rowdata[j].unitName;
				  expiryDate = rowdata[j].expiryDate;
				  barcodeno2 = rowdata[j].barcodeNo;
				  subcatid = rowdata[j].sub_cat_id;
				  proid = rowdata[j].productPkId;
				  cat= rowdata[j].cat_id;
				  
				  tot1= rowdata[j].total;
				  gTotal = gTotal + tot1;
				  
				 var rowId = ids[j];
				 var rowData = jQuery('#list4').jqGrid ('getRowData', rowId);
					var abc =	document.getElementById("totalWithExpense").value; 
					var av=0;
					
//				if (prodName == v.itemName && com == v.companyName && packing == v.weight && unit == v.unitName && expiryDate == v.expiryDate && barcodeno2 == v.barcodeNo)
					if (prodName == v.itemName && com == v.companyName && packing == v.weight && unit == v.unitName && subcatid == v.sub_cat_id && proid==v.productPkId && cat==v.cat_id)	
				 {
			    	ori_quantity = +rowdata[j].quantity+0;
			    	
			    	$("#list4").jqGrid("setCell", rowId, "quantity", ori_quantity);
			    	var grid = jQuery("#list4");
			    	grid.trigger("reloadGrid");
			    	
					av = abc - tot1;
			    	document.getElementById("totalWithExpense").value = av;  
			    	document.getElementById("grossTotal").value = av;				  			  	 
			    	
			    	newrow=false;
					alert("Product Name Already Inserted !!!");
					var grid = jQuery("#list4");
				    grid.trigger("reloadGrid");
			    	break;
				}
				else
				{
					newrow = true;
//			    	document.getElementById("totalWithExpense").value = gTotal;  
//			    	document.getElementById("grossTotal").value = gTotal;
				}
			 }					 
			  
			  if(newrow == true)
				 {
				  $("#list4").addRowData(count,jsonData[i]);
				  for(var i=0; i<count; i++)
					  {
					  	if(count[i] == 10)
					  	{
					  								  		
					  	}					  
					  }					
				 }
/*			  var quantity = 1;*/ 
		
		$("#list4").jqGrid({
			datatype: "local",
			
			colNames:[  'cat_id',
						'sub_cat_id',
						'Barcode<br>No',
						'Sub Category',
						'Product<br>Name',
						'Company<br>Name',
						'HSN',
						'Batch<br>No.',
						'MRP',
						'Sale<br>Price',
/*						'SP Inc<br>Tax',*/
						'SP<br>Excl<br>Tax',
						'Quantity',
						"Weight",
						'Unit',
						'SGST%',
						'CGST%',
						'IGST%',
						'Disc %',
						'Disc<br>Amt',
						'Total<br>Excl<br>Tax',
						'Pkg',
						'Qty',
						'Free<br>Qty',
						'Expiry<br>Date',
						'Total',
						'totalKgLtrPiece',
						'stockPerEntry',
						'PkGoodReceiveId',
						'Product ID',
						'Barcode ID'
						],
			
			colModel:[ 
					     {
					    	 name:'cat_id',
					    	 hidden:true,
					    	 align:'center',
					     },		
					     {
					    	 name:'sub_cat_id',
					    	 hidden:true,
					    	 align:'center',
					     },	
					     
					     {	 name:'barcodeNo',
					    	 width:100,
					    	 align:'center',
					    	 editable: true,
						 },	
						 {	 name:'subcat',
					    	 width:100,
					    	 align:'center',
					    	 editable: true,
						 },
					     {	 name:'itemName',
					    	 width:120,
					    	 align:'center',
					    	 editable: true,
							
						 },						
					     {	 name:'companyName',
					    	 width:100,
					    	 align:'center',
					    	 editable: true,
							
						},
						{	 name:'hsn',
							 width:80,
					    	 align:'center',
					    	 editable: true,
						},
						{	 name:'batchNumber',
							 width:80,
					    	 align:'center',
					    	 hidden:true,
						},	
						
						{	 name:'mrp',
							 width:100,
							 editable: true,
					    	 align:'center',
					    	 hidden:true,
						},
					
						{	 name:'sp',                        // sale price
							 width:100,
							 editable: true,
					    	 align:'center',
						},
						
						{	 name:'salePriceEx',
							 width:100,
							 editable: false,
					    	 align:'center',
					    	 hidden:true,
						},
						{    name:'noOfboxes',
							 width:100,
							 hidden:false,
							 editable:true,
					    	 align:'center',
						},
						{
							name: 'weight',
							width:90,
							align:'center',
							editable: true,
						},
						{	id:'unitName', 
							name:'unitName',
							width:90,
							align:'center',
							editable: true,
						},	
						{	 name:'sgst',
							 width:80,
							 editable: true,
					    	 align:'center',
					    	 hidden:true,
						},
						{	 name:'cgst',
							 width:80,
							 editable: true,
					    	 align:'center',
					    	 hidden:true,
						},
						{	name:'igst',
							width:80,
							editable: true,
					    	align:'center',	
					    	hidden:true,
						},
						{	 name:'Discount',
							 width:100,
							 hidden:true,
							 editable:true,
					    	 align:'center',
						},
						{	 name:'DiscountAmount',
							 width:100,
							 hidden:true,
					    	 align:'center',
						},
						{	 name:'TotalEx',       //price ex amount
							 width:100,
							 align:'center',
							 hidden:true,
						},
						{    name:'weight',
							 width:100,
							 hidden:true,
					    	 align:'center',
					    	 editable:true,
						},
						{	
							id:'quantity',
							name:'quantity',
							width:100,
							editable: true,
							align:'center',
							hidden:true,
						},
						{	
							id:'freeQuantity',
							name:'freeQuantity',
							width:100,
							//editable: true,
							align:'center',	
							hidden:true,
						},						
					
						{	id:'expiryDate', 
							name:'expiryDate',
							width:140,
							align:'center',
							editable: false,
							hidden:true,
						},						
						{	name:'total',
							width:120,
							align:'center',
							editable: true,
							//formatter: sumFmatter
						},						
						{	name:'totalKgLtrPiece',    // available Qty Check
							width:150,
							hidden:true,
							align:'center',
							//formatter: sumFmatter
						},
						{	name:'stockPerEntry',         // Original Quantity
							width:150,
							hidden:true,
							align:'center',
							//formatter: sumFmatter
						},
						{	name:'PkGoodreceiveId',
							width:150,
							hidden:true,
							align:'center',
							//formatter: sumFmatter
						},
						{	name:'productPkId',
							width:150,
							hidden:true,
							align:'center',
							//formatter: sumFmatter
						},
						{	name:'barcode_id',
							width:150,
							editable:true,
							align:'center',
					    	 hidden:true,
							//formatter: sumFmatter
						}
			],
				
			sortorder : 'desc',
			loadonce: false,
			viewrecords: true,
			//width: 1200,
			shrinkToFit:true,
			rowheight: 300,
          	hoverrows: true,
	        rownumbers: true,
	        rowNum: 10,
           'cellEdit':true,
            autowidth:true,
            pgbuttons : false,
            pginput : false,
           
          afterSaveCell: function grossTotal()
		  {
            	       	document.getElementById("discount").value = 0;
		 				document.getElementById("discountAmount").value = 0;
		 				document.getElementById("hamaliExpence2").value = 0;
		 				//document.getElementById("hamaliExpence").value = 0;
            	
            	        	   var rowId =$("#list4").jqGrid('getGridParam','selrow');
				        	   
		                       var rowData = jQuery("#list4").getRowData(rowId);
		                       productName = rowData['itemName'];
		                       var quantity = rowData['quantity'];
		                       var freeQuantity = rowData['freeQuantity'];
		                       var salePrice = rowData['sp'];
		                       var salePriceEx = rowData['salePriceEx'];
		                       var mrp = rowData['mrp'];
		                       
		                       var iGst = rowData['igst'];
		                       var cgst = rowData['cgst'];
		                       var sgst = rowData['sgst'];
		                       var gst = +cgst+ +sgst;
		                      
		                       var unit = rowData['unitName'];
		                       var stockPerEntry = rowData['stockPerEntry'];
		                       var expiryDate = rowData['expiryDate'];
		                       var barcodeNo = rowData['barcodeNo'];
		                       var discountperc = rowData['Discount'];
		                       var noOfboxes = rowData['noOfboxes'];
		                       var weight = rowData['weight'];
		                       var stockInTotalPieceQuantity = rowData['totalKgLtrPiece'];
		                      
		                     //  quantity = ((Number(weight)*Number(noOfboxes)));
		                       quantity = (noOfboxes);
		                          // quantity =  +totalQty+ +quantity;
		                       $("#list4").jqGrid("setCell", rowId, "quantity", quantity);
		                        
		                           if(Number(quantity) > Number(stockInTotalPieceQuantity)){

                					   var msg = productName+" Available Stock For Barcode No : "+barcodeNo+" = "+stockInTotalPieceQuantity+" Pieces";
	 		                    	   var dialog = bootbox.dialog({
                    					//title: "Embel Technologies Says :",
                    				   /* message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',*/
                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
                    				    closeButton: false
	 		                    	   });
                    				
	 		                    	   setTimeout(function()
	 		                    		{
                    					dialog.modal('hide');
	 		                    	   }, 1500);
	 		                    	   
	 		                    	   var setFq = 0;
	 		                    	   $("#list4").jqGrid("setCell", rowId, "freeQuantity", setFq);
	 		                    	   $("#list4").jqGrid("setCell", rowId, "quantity", setFq);
			                    	   $("#list4").jqGrid("setCell", rowId, "total", setFq);
			                    	   $("#list4").jqGrid("setCell", rowId, "noOfboxes", setFq);
			                    	   
			                    	   finalCalculation();					                    		
	 		                    	   return false;
		                    	
		                           }
		                      
		                       if(noOfboxes == "")
		                       {
		                    	    noOfboxes = "0";
                   					var setZero = 0;
                   					$("#list4").jqGrid("setCell", rowId, "noOfboxes", setZero);
		                       }
		                       if(cgst == "")
		                       {
		                    	    cgst = "0";
                   					var setZero = 0;
                   					$("#list4").jqGrid("setCell", rowId, "cgst", setZero);
		                       }
		                       if(sgst == "")
		                       {
		                    	    sgst = "0";
                   					var setZero = 0;
                   					$("#list4").jqGrid("setCell", rowId, "sgst", setZero);
		                       }
		                       if(iGst == "")
		                       {
		                    	    igst = "0";
                   					var setZero = 0;
                   					$("#list4").jqGrid("setCell", rowId, "igst", setZero);
		                       }
		                       if(freeQuantity == "")
		                       {
		                    	   	freeQuantity = "0";
                   					var setZero = 0;
                   					$("#list4").jqGrid("setCell", rowId, "freeQuantity", setZero);
		                       }
		                       if(quantity == "")
		                       {
		                    	    quantity = "0";
                   					var setZero = 0;
                   					$("#list4").jqGrid("setCell", rowId, "quantity", setZero);
		                       }
		                       if(discountperc == "")
		                       {
		                    	    discountperc = "0";
                   					var setZero = 0;
                   					$("#list4").jqGrid("setCell", rowId, "Discount", setZero);
		                       }
		                       
		                       var sPrice = v.salePrice;
		                 		                       
		                       if(salePrice != "")
		                       {
		                    	   var checkprice = /^[0-9]+\.?[0-9]*$/;
		                    	   if(salePrice.match(checkprice))
		                    	   {}
		                    	   else
		                    	   {
		                    		   var msg="Please Enter Valid Sale Price";
	                    				var dialog = bootbox.dialog({
	                    				
	                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
	                    				    closeButton: false
	                    				});
	                    				
	                    				setTimeout(function() {
	                    					dialog.modal('hide');
	                    				}, 1500);
	                    				                    				
			                    		$("#list4").jqGrid("setCell", rowId, "salePrice", sPrice);
			                    		
			                    		finalCalculation();
			                    	                    				
	                    				return false;
		                    	   }
		                       }
		                       
		                       if(mrp != "")
		                       {
		                    	   var checkprice = /^[0-9]+\.?[0-9]*$/;
		                    	   if(mrp.match(checkprice))
		                    	   {}
		                    	   else
		                    	   {
		                    		   var msg="Please Enter Valid MRP";
	                    				var dialog = bootbox.dialog({
	                    					
	                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
	                    				    closeButton: false
	                    				});
	                    				
	                    				setTimeout(function() {
	                    					dialog.modal('hide');
	                    				}, 1500);
	                    				
	                    				var setZero = 0;
	                    				$("#list4").jqGrid("setCell", rowId, "mrp", setZero);
	                    				
	                    				
	                    				finalCalculation();
	                    				
	                    				/*var setZero = 0;
			                    		$("#list4").jqGrid("setCell", rowId, "total", setZero);
			                    		
			                    		var Total = 0;
			                    		var Total1 = 0;
			                    		var count = jQuery("#list4").jqGrid('getGridParam', 'records');
			        		        	var allRowsInGrid1 = $('#list4').getGridParam('data');
			        		        	var AllRows=JSON.stringify(allRowsInGrid1);
			        		        	for (var k = 0; k < count; k++)
			        		        	{
			        		        		Total1 = allRowsInGrid1[k].total;
			        		        		if(Total1 == undefined)
			        		        			{
			        		        				Total1 = 0;
			        		        			}
			        		        		Total = +Total + +Total1;
			        		        		Total = Math.round(Total * 100) / 100;
			        		        		
			        		        	}
			        		        	
			        		        	document.getElementById("totalWithExpense").value = Total;
			        		        	document.getElementById("grossTotal").value = Total;*/
	                    				
	                    				return false;
		                    	   }
		                       }
		                       
		                       /*var vPercentage = v.vatPercentage; 
		                       
		                     
		                       if(vatPercentage != "")
		                       {
		                    	   
		                    	   var checkTax = /^[0-9]+$/;
		                    	   if(vatPercentage.match(checkTax))
		                    	   {}
		                    	   else
		                    	   {
		                    		   var msg="Please Enter Valid GST %";
	                    				var dialog = bootbox.dialog({
	                    					//title: "Embel Technologies Says :",
	                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
	                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
	                    				    closeButton: false
	                    				});
	                    				
	                    				setTimeout(function() {
	                    					dialog.modal('hide');
	                    				}, 1500);
	                    				
	                    				
	                    				
			                    		$("#list4").jqGrid("setCell", rowId, "vatPercentage", vPercentage);
	                    				
	                    				return false;
		                    	   }
		                       }*/
		                       
		                       if(mrp == "" || mrp == "0")
		                       {}
		                       else
		                       {
			                       if(Number(salePrice) > Number(mrp))
			                       {
			                    	   var msg="MRP must be Greater Than Sale Price";
	                    				var dialog = bootbox.dialog({
	                    					
	                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
	                    				    closeButton: false
	                    				});
	                    				
	                    				setTimeout(function() {
	                    					dialog.modal('hide');
	                    				}, 1500);
	                    				
	                    				var setZero = 0;
	                   					$("#list4").jqGrid("setCell", rowId, "sp", setZero);
	                   					
	                    				return false;
	                    				
	                    				
			                       }
		                       }
		                       
		                    	/*if(unit == 'pcs')
			                    	{
			                    		$(this).jqGrid('setColProp', 'quantity', {editable:true});
			                    		$(this).jqGrid('setColProp', 'kg', {editable:false});
			                    		$(this).jqGrid('setColProp', 'grams', {editable:false});			                    		
			                    	}
			                    	else
			                    	{
			                    		$(this).jqGrid('setColProp', 'quantity', {editable:false});
			                    		$(this).jqGrid('setColProp', 'kg', {editable:true});
			                    		$(this).jqGrid('setColProp', 'grams', {editable:true});
			                    	}*/
		                    	
		                    	/*productId = $('#proName').val();
		                    	
		                    	$("#proName option:selected").each(function()
		                    		{
		                    		   selectedVal = $(this).text();
		                    		});
		                    	
		                    	var splitText = selectedVal.split(",");
		                    	
		                    	//var stockArray = {};
		                    	
		                    		var stock = splitText[4];*/
		                    		
		                    	 	/*var stockInGrams = splitText[11];
		                    		var stockInMili = splitText[12];
		                    		var stockInTotalPieceQuantity = splitText[13];*/
		                    	           	
		                    	
		                    	var salePricePerGramOrMili = salePricePerGram = (Number)(salePrice/1000);
	                    		var userTotalGramsOrMili = Number(quantity) * 1000;
		                    	//commented on 8-10
		             /*       	if(unit == 'kg')
		                    	{		
 		                    	   		var setFq = 0;
		                    			$("#list4").jqGrid("setCell", rowId, "freeQuantity", setFq);
		                    			
		                    			var rowId =$("#list4").jqGrid('getGridParam','selrow');
		                    			var rowData = jQuery("#list4").getRowData(rowId);
		                    			var stockInKg = rowData['totalKgLtrPiece'];
		                    			var stockInGrams;
		                    			if(Number(stockInKg) > 1)
		                    			{
			                    			stockInGrams = stockInKg * 1000;
		                    			}
		                    			else
		                    			{
		                    				stockInGrams = stockInKg;
		                    			}
		                    					                    			
		                    			if(quantity != '')
		                    			{
		                    			var checkKiloLtr = /^[0-9]+\.?[0-9]{0,3}$/;
		                    			//var checkKiloLtr = /^[0-9]+\.?[0-9]*$/;
		                    			if(quantity.match(checkKiloLtr))
		                    			{
		                    				if(quantity == 0)
		                    				{
			                    				var msg="Please Enter Valid kg Value";
			                    				var dialog = bootbox.dialog({
			                    					//title: "Embel Technologies Says :",
			                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
			                    				    closeButton: false
			                    				});
			                    				
			                    				setTimeout(function() {
			                    					dialog.modal('hide');
			                    				}, 1500);

			 		                    	   	var setZero = 0;
					                    		$("#list4").jqGrid("setCell", rowId, "total", setZero);	
					                    							                    		
					                    		finalCalculation();
					                    					                    				 		                    	   
			 		                    	   return false;
		                    				}		                    				
		                    			}
		                    			else
		                    			{
		                    				var setZero = 0;
		                    				
		                    				var msg="Please Enter Valid kg Value";
		                    				var dialog = bootbox.dialog({
		                    					//title: "Embel Technologies Says :",
		                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		                    				    closeButton: false
		                    				});
		                    				
		                    				setTimeout(function() {
		                    					dialog.modal('hide');
		                    				}, 1500);
		                    						                    				
		                    				var setZero = 0;
				                    		$("#list4").jqGrid("setCell", rowId, "quantity", setZero);
				                    		$("#list4").jqGrid("setCell", rowId, "total", setZero);
				                    		
				                    		finalCalculation();
				                    						                    				                    		
				                    		return false;
		                    				}
		                    			}
		                    			
		                    			if(expiryDate =='N/A')
		                    			{
			                    			if(Number(userTotalGramsOrMili) > Number(stockInGrams))
					                    	{ 		                    				
				                    			if(Number(stockInGrams) >1000)
				                    				{
				                    					var convertedStockInKg = Number(stockInGrams)/1000;
				                    					
				                    					var msg=productName+" Available stock = "+convertedStockInKg+" Kg";
					                    				var dialog = bootbox.dialog({
					                    					//title: "Embel Technologies Says :",
					                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
					                    				    closeButton: false
					                    				});
					                    				setTimeout(function() {
					                    					dialog.modal('hide');
					                    				}, 1500);
				                    				}
				                    				else
				                    				{			                    					
				                    					var msg=productName+" Available stock = "+stockInGrams+" Grams";
					                    				var dialog = bootbox.dialog({
					                    					//title: "Embel Technologies Says :",
					                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
					                    				    closeButton: false
					                    				});
					                    				setTimeout(function() {
					                    					dialog.modal('hide');
					                    				}, 1500);
				                    				}
				                    			
					                    		var setZero = 0;
					                    		$("#list4").jqGrid("setCell", rowId, "total", setZero);
					                    		$("#list4").jqGrid("setCell", rowId, "quantity", setZero);
					                    		
					                    		finalCalculation();
					                    		
					                    	}
		                    			}
		                    			else if(expiryDate !='N/A')
		                    			{
		                    				var stockperEntryInKg = rowData['stockPerEntry'];
			                    			var stockperEntryInGrams;
			                    			if(Number(stockperEntryInKg) > 1)
			                    			{
			                    				stockperEntryInGrams = stockperEntryInKg * 1000;
			                    			}
			                    			else
			                    			{
			                    				stockperEntryInGrams = stockperEntryInKg;
			                    			}
		                    			
		                    				if(Number(userTotalGramsOrMili) > Number(stockperEntryInGrams))
					                    	{ 		                    				
				                    			if(Number(stockperEntryInGrams) >1000)
				                    				{
				                    					var convertedStockInKg = Number(stockperEntryInGrams)/1000;
				                    					
				                    					var msg=productName+" Available stock = "+convertedStockInKg+" Kg";
					                    				var dialog = bootbox.dialog({
					                    					//title: "Embel Technologies Says :",
					                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
					                    				    closeButton: false
					                    				});
					                    				setTimeout(function() {
					                    					dialog.modal('hide');
					                    				}, 1500);
				                    				}
				                    				else
				                    				{			                    					
				                    					var msg=productName+" Available stock = "+stockperEntryInGrams+" Grams";
					                    				var dialog = bootbox.dialog({
					                    					//title: "Embel Technologies Says :",
					                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
					                    				    closeButton: false
					                    				});
					                    				setTimeout(function() {
					                    					dialog.modal('hide');
					                    				}, 1500);
				                    				}
				                    			
					                    		var setZero = 0;
					                    		$("#list4").jqGrid("setCell", rowId, "total", setZero);
					                    		$("#list4").jqGrid("setCell", rowId, "quantity", setZero);
					                    							                    		
					                    		finalCalculation();
					                    		
					                    	}
		                    			}
			                    		
			                    			KgGramsLtrMiliCalculation();
			                 		}*/
		                    //commented on 8-10	
		                    	/*if(unit == 'ltr')
	                    		{
	                    	   		var setFq = 0;
	                    			$("#list4").jqGrid("setCell", rowId, "freeQuantity", setFq);
		                    		
		                    		var rowId =$("#list4").jqGrid('getGridParam','selrow');
	                    			var rowData = jQuery("#list4").getRowData(rowId);
	                    			var stockInLtr = rowData['totalKgLtrPiece'];
	                    			var stockInMili = stockInLtr * 1000;
	                    			
	                    			var stockperEntryInLtr = rowData['stockPerEntry'];
	                    			var stockperEntryInMili;
	                    			if(Number(stockperEntryInLtr) > 1)
	                    			{
	                    				stockperEntryInMili = stockperEntryInLtr * 1000;
	                    			}
	                    			else
	                    			{
	                    				stockperEntryInMili = stockperEntryInLtr;
	                    			}
	                    			
	                    			if(quantity != '')
	                    			{
	                    			var checkKiloLtr = /^[0-9]+\.?[0-9]{0,3}$/;
	                    			if(quantity.match(checkKiloLtr))
	                    			{
	                    				if(quantity == "0")
	                    				{
			 		                    	   var msg="Please Enter ltr OR mili";
			 		                    	   var dialog = bootbox.dialog({
		                    					//title: "Embel Technologies Says :",
		                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		                    				    closeButton: false
		                    				});
			 		                    	  setTimeout(function() {
			                    					dialog.modal('hide');
			                    				}, 1500);
			 		                    	   
			 		                    	   var setZero = 0;
			 		                    	   $("#list4").jqGrid("setCell", rowId, "total", setZero);
					                    		
			 		                    	  finalCalculation();
			 		                    	   
			 		                    	  return false;
	                    				}
	                    			}
	                    			else
	                    			{
	                    				quantity = 0;
	                    				
	                    				var msg="Please Enter Valid ltr Value";
	                    				var dialog = bootbox.dialog({
	                    					//title: "Embel Technologies Says :",
	                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
	                    				    closeButton: false
	                    				});
	                    				setTimeout(function() {
	                    					dialog.modal('hide');
	                    				}, 1500);				
	                    				
	                    				var setZero = 0;
			                    		$("#list4").jqGrid("setCell", rowId, "quantity", setZero);
			                    		
			                    		finalCalculation();
			                    					                    			                    		
	                    				return false;
	                    				}
	                    			}
	                    			
	                    			
	                    			if(expiryDate =='N/A')
	                    			{
		                    		if(Number(userTotalGramsOrMili) > Number(stockInMili))
			                    	{
		                    			if(Number(stockInMili) >1000)
		                    				{
		                    					var convertedStockInLtr = Number(stockInMili)/1000;
		                    					
		                    					var msg=productName+" Available stock = "+convertedStockInLtr+" Ltr";
				 		                    	   var dialog = bootbox.dialog({
			                    					//title: "Embel Technologies Says :",
			                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
			                    				    closeButton: false
			                    				});
				 		                    	  setTimeout(function() {
				                    					dialog.modal('hide');
				                    				}, 1500);
		                    					
		                    					
		                    				}
		                    				else
		                    				{		                    					
		                    					var msg=productName+" Available stock = "+stockInMili+" mili";
				 		                    	   var dialog = bootbox.dialog({
			                    					//title: "Embel Technologies Says :",
			                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
			                    				    closeButton: false
			                    				});
				 		                    	  setTimeout(function() {
				                    					dialog.modal('hide');
				                    				}, 1500);
		                    				}
		                    			
			                    		var setZero = 0;
			                    		$("#list4").jqGrid("setCell", rowId, "total", setZero); 
			                    		$("#list4").jqGrid("setCell", rowId, "quantity", setZero);
			                    		
			                    		finalCalculation();
			                    		
			        		        	return false;
			                    	}
	                    			}
		                    		else if(expiryDate !='N/A')
	                    			{
		                    			if(Number(userTotalGramsOrMili) > Number(stockperEntryInMili))
				                    	{
			                    			if(Number(stockperEntryInMili) >1000)
			                    				{
			                    					var convertedStockInLtr = Number(stockperEntryInMili)/1000;
			                    					
			                    					var msg=productName+" Available stock = "+convertedStockInLtr+" Ltr";
					 		                    	   var dialog = bootbox.dialog({
				                    					
				                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
				                    				    closeButton: false
				                    				});
					 		                    	  setTimeout(function() {
					                    					dialog.modal('hide');
					                    				}, 1500);
			                    					
			                    					
			                    				}
			                    				else
			                    				{		                    					
			                    					var msg=productName+" Available stock = "+stockperEntryInMili+" mili";
					 		                    	   var dialog = bootbox.dialog({
				                    					
				                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
				                    				    closeButton: false
				                    				});
					 		                    	  setTimeout(function() {
					                    					dialog.modal('hide');
					                    				}, 1500);
			                    				}
			                    			
				                    		var setZero = 0;
				                    		$("#list4").jqGrid("setCell", rowId, "total", setZero); 
				                    		$("#list4").jqGrid("setCell", rowId, "quantity", setZero);
				                    		
				                    		finalCalculation();
				                    		
				        		        	return false;
	                    			}		                    		
	                    		}
                    				KgGramsLtrMiliCalculation();
                    		}*/
		                    	
	                    	function KgGramsLtrMiliCalculation()
	                    	{
	                    		if((Number(quantity)>0 || Number(quantity) != '' || quantity != '0'))
                    			{
	                    			salePricePerGram 
		                    		var salePriceKgTota = 0;
		                    		salePriceKgTota = userTotalGramsOrMili * salePricePerGramOrMili ;
		                    		salePriceKgTota = Math.round(salePriceKgTota * 100) / 100;			                    		
                    				$("#list4").jqGrid("setCell", rowId, "total", salePriceKgTota);
                    			}				                    	
		                    	          	
		                    	else if(Number(quantity) == 0  || Number(quantity)== '')
                    			{
		                    		
		                    		var setZero = 0;
		                    		$("#list4").jqGrid("setCell", rowId, "total", setZero);
		                    		
		                    		finalCalculation();
		                    	   
 		                    	   return false;
                    			}
	                    	}
			                   
			                    if(unit == 'pcs')
			                    {
			                    	if(freeQuantity == "" || freeQuantity == "0")
		                    		{
		                    			freeQuantity = 0;
		                    			var setZero = 0;
                                 		$("#list4").jqGrid("setCell", rowId, "freeQuantity", setZero);
                                 		quantity = Number(quantity) + Number(freeQuantity);
		                    		}
			                    	else if(freeQuantity != '' || freeQuantity != "0")
		                    		{
										var checkFreeQuantity = /^[0-9]+$/;
							    		if(freeQuantity.match(checkFreeQuantity))
							    		{
							    			quantity = Number(quantity) + Number(freeQuantity);
							    		}
							    		else
							    		{
						    				 var msg="Please Enter Valid Free Quantity";
			 		                    	   var dialog = bootbox.dialog({
		                    					//title: "Embel Technologies Says :",
		                    				   /* message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',*/
		                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		                    				    closeButton: false
		                    				});
			 		                    	  setTimeout(function() {
			                    					dialog.modal('hide');
			                    				}, 1500);
		                    				 
		                    				 quantity = 0;
		                    				 var setZero = 0;
	                                   		 $("#list4").jqGrid("setCell", rowId, "quantity", setZero);
	 			                    		 $("#list4").jqGrid("setCell", rowId, "total", setZero);
	                                   		 $("#list4").jqGrid("setCell", rowId, "freeQuantity", setZero);
	 			                    		 
	                                   		finalCalculation();
	                                   		 	
		                    				return false;			                    			
							    		}
		                    		}
			                    	
		                    		var rowId =$("#list4").jqGrid('getGridParam','selrow');
	                    			var rowData = jQuery("#list4").getRowData(rowId);
	                    			var stockInTotalPieceQuantity = rowData['totalKgLtrPiece'];	
	                    			
	                    			
	                    			if(quantity != '')
	                    			{
	                    			 var checkQuantity = /^[0-9]+$/;
	                    			 if(String(quantity).match(checkQuantity) || String(quantity) == "")
	                    			 {}
	                    			 else
	                    			 {	                    				 
	                    				 var msg="Please Enter Valid Quantity";
		 		                    	   var dialog = bootbox.dialog({
	                    					//title: "Embel Technologies Says :",
	                    				   /* message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',*/
	                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
	                    				    closeButton: false
	                    				});
		 		                    	  setTimeout(function() {
		                    					dialog.modal('hide');
		                    				}, 1500);
	                    				 
	                    				 quantity = 0;
	                    				 var setZero = 0;
                                   		 $("#list4").jqGrid("setCell", rowId, "quantity", setZero);
 			                    		 $("#list4").jqGrid("setCell", rowId, "total", setZero);
                                   		 $("#list4").jqGrid("setCell", rowId, "freeQuantity", setZero);
 			                    		 
                                   		finalCalculation();
                                   		 	
	                    				return false;
	                    			 	}
	                    			}
	                    			
		                    		if(expiryDate =='N/A')
		                    		{	
		                    			if ( Number(quantity) > Number(stockInTotalPieceQuantity))
					                    	{
	                    					   var msg = productName+" Available Stock For Barcode No : "+barcodeNo+" = "+stockInTotalPieceQuantity+" Pieces";
			 		                    	   var dialog = bootbox.dialog({
		                    					//title: "Embel Technologies Says :",
		                    				   /* message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',*/
		                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		                    				    closeButton: false
			 		                    	   });
		                    				
			 		                    	   setTimeout(function()
			 		                    		{
		                    					dialog.modal('hide');
			 		                    	   }, 1500);
			 		                    	   
			 		                    	   var setFq = 0;
			 		                    	   $("#list4").jqGrid("setCell", rowId, "freeQuantity", setFq);
			 		                    	   $("#list4").jqGrid("setCell", rowId, "quantity", setFq);
					                    	   $("#list4").jqGrid("setCell", rowId, "total", setFq);
					                    	   
					                    	   finalCalculation();					                    		
			 		                    	   return false;
				                    	}	                    			 
		                    		} 
	                    			else if(expiryDate !='N/A')
	                    			{	
	                    				if ( Number(quantity) > Number(stockPerEntry))
				                    	{
				                    		   var msg = productName+" Available Stock For Barcode No : "+barcodeNo+" = "+stockPerEntry+" Pieces";
			 		                    	   var dialog = bootbox.dialog({
		                    					//title: "Embel Technologies Says :",
		                    				   /* message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',*/
		                    				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		                    				    closeButton: false
		                    				});
			 		                    	  setTimeout(function() {
			                    					dialog.modal('hide');
			                    				}, 1500);
				                    		
				                    		var tota = 0;
				                    		var quantity = 0;
				                    		$("#list4").jqGrid("setCell", rowId, "total", tota);
				                    		$("#list4").jqGrid("setCell", rowId, "quantity", quantity);
			 		                    	$("#list4").jqGrid("setCell", rowId, "freeQuantity", quantity);
				                    		
			 		                    	finalCalculation();
				                    	}
	                    			}
			                    }
			                    
			                    finalCalculation();
			                    
			                    
			                    //var quantity = rowData['quantity'];
								var iGst = rowData['igst'];
								var DiscountAmount= rowData['DiscountAmount'];
								var Discount= rowData['Discount'];
								var TotalEx= rowData['TotalEx'];
								

								/*/////calculation of gst////
*/														
								var checkDiscount = /^[0-9]+\.?[0-9]*$/;
								  if(Discount.match(checkDiscount))
								  {
									  if(Number(Discount) >= 100)
							  	  {
							  		  var setZero = 0;
							  		  //alert("In discount")
							  		  myAlert("Discount Percentage Must Be Less Than 100");
							  	      $("#list4").jqGrid("setCell", rowId, "DiscountAmount", setZero);
							      	  totalCalC();
							      	  totalDisC();
							  		  return false;
							  	  }
								  }
								  else
								  {
									  var setZero = 0;
									  
									  if(Discount== "")
							  	  {
							  		 
							  		  $("#list4").jqGrid("setCell", rowId, "DiscountAmount", setZero);
							      	  
							  	  }
									  else
									  {
							  		  myAlert("Pleaee Enter Valid Discount value");
							  		  $("#list4").jqGrid("setCell", rowId, "DiscountAmount", setZero);
							      	  totalCalC();
							      	  totalDisC();
							      	  return false;
									  }
								  }			
								  
								//sale price excluding tax calc//
								  var checksalePrice= /^[0-9]+\.?[0-9]*$/;
								  if(salePrice.match(checksalePrice))
							    {
							      	  if(Number(salePrice) > 0)
							  		  {
							      		  spwTax = (salePrice/(1+(gst/100)+(iGst/100)));
							      		  $("#list4").jqGrid("setCell", rowId, "salePriceEx",  spwTax.toFixed(2));
							      		 	
							      		 if(Number(gst) > 0)
							      		 {  
							      			  DiscountAmount= (spwTax*(Discount/100));
							      			  finalsp = (spwTax- DiscountAmount) * quantity;
							      			  newTaxAmt = (((finalsp*quantity)*gst)/100);
							      			  
							      			  var oneProTax = (((finalsp)*gst)/100);
							      			  newFinalsp = finalsp+ oneProTax;
							      			  tota = newFinalsp;
							      			  DiscountAmount = DiscountAmount * quantity;
							      			
							      		$("#list4").jqGrid("setCell", rowId, "DiscountAmount", DiscountAmount.toFixed(2));	  
									    $("#list4").jqGrid("setCell", rowId, "TotalEx", finalsp.toFixed(2));
									    $("#list4").jqGrid("setCell", rowId, "total", tota.toFixed(2));
									
									     totalCalC();
									     totalDisC();	
							      		}
							      		 
							      	else if(Number(iGst) > 0)
							      	{  
						      			  DiscountAmount= (spwTax*(Discount/100));
						      			  finalsp = (spwTax- DiscountAmount) * quantity;
						      			  newTaxAmt = (((finalsp*quantity)*iGst)/100);
						      			  
						      			  var oneProTax = (((finalsp)*iGst)/100);
						      			  newFinalsp = finalsp+ oneProTax;
						      			  tota = newFinalsp;
						      			  DiscountAmount = DiscountAmount * quantity;
						      			 
						      		$("#list4").jqGrid("setCell", rowId, "DiscountAmount", DiscountAmount.toFixed(2));	  
								    $("#list4").jqGrid("setCell", rowId, "TotalEx", finalsp.toFixed(2));
								    $("#list4").jqGrid("setCell", rowId, "total", tota.toFixed(2));
								
								     totalCalC();
								     totalDisC();	
						      		}
							      	
							      	else if(Number(gst) == 0 && Number(iGst) == 0)
							      	{  
						      			  DiscountAmount= (spwTax*(Discount/100));
						      			  finalsp = (spwTax- DiscountAmount) * quantity;
						      			  newTaxAmt = (((finalsp*quantity)*iGst)/100);
						      			  
						      			  var oneProTax = (((finalsp)*iGst)/100);
						      			  newFinalsp = finalsp+ oneProTax;
						      			  tota = newFinalsp;
						      			  DiscountAmount = DiscountAmount * quantity;
						      			 
						      		$("#list4").jqGrid("setCell", rowId, "DiscountAmount", DiscountAmount.toFixed(2));	  
								    $("#list4").jqGrid("setCell", rowId, "TotalEx", finalsp.toFixed(2));
								    $("#list4").jqGrid("setCell", rowId, "total", tota.toFixed(2));
								
								     totalCalC();
								     totalDisC();	
						      		}
							   else
							      {
							     var setZero = 0; 
								  $("#list4").jqGrid("setCell", rowId, "DiscountAmount", setZero);
							   /* $("#list4").jqGrid("setCell", rowId, "Total", tota.toFixed(2));*/
							  /*  $("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero);*/
							     }
							        }
						else
					         {
							  	var setZero = 0;
							  /*$("#list4").jqGrid("setCell", rowId, "sPWithoutTax", setZero);*/
							    $("#list4").jqGrid("setCell", rowId, "DiscountAmount", setZero);
							    $("#list4").jqGrid("setCell", rowId, "total", setZero);
							 /* $("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero);*/
							    return false;
								}
							    }				        	  
						else
							{
								var setZero = 0;
								alert("Pleae Enter Valid Buy Price");
								$("#list4").jqGrid("setCell", rowId, "salePrice", setZero);
								$("#list4").jqGrid("setCell", rowId, "salePriceEx", setZero);
							  	$("#list4").jqGrid("setCell", rowId, "DiscountAmount", setZero);
							  	$("#list4").jqGrid("setCell", rowId, "total", setZero);
							 /* $("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero);*/
									  return false;
								 }
								
								/*if(Gst!=0)
								{
								var taxpercentage = Gst;
								var salepriceEx=saleprice(1+(taxpercentage/100)));
								
								
							$("#jqGrid").jqGrid("setCell",rowId,"salepriceEx",salepriceEx);
							
							return false;
				                         }
								*/
								  //out of grid calc//
								
									function totalCalC()
									{	
									       var Total = 0;
									       var totAmtWithTax = 0;
									       var count = jQuery("#list4").jqGrid('getGridParam', 'records');
									       var allRowsInGrid1 = $('#list4').getGridParam('data');
									        var AllRows=JSON.stringify(allRowsInGrid1);
									        	  
									       for (var k = 0; k < count; k++)
									       {
									          var Total1 = allRowsInGrid1[k].total;//grid total 

									        if(Total1 != undefined)
									        {
									        		Total = +Total + +Total1;
									        		  }
									        	  }
									        	  for (var j = 0; j < count; j++)
									        	  {
									        		  var Total2 = allRowsInGrid1[j].taxAmount;
									        		  var Total3 = allRowsInGrid1[j].total;
									        		  if(Total2 != undefined)
									        		  {
									        			  totAmtWithTax = +totAmtWithTax + +Total2 + +Total3;
									        		  }
									        	  }
									           	  document.getElementById("totalWithExpense").value = Total.toFixed(2);//Math.round(Total);
									        	  document.getElementById("grossTotal").value = Total.toFixed(2);//Math.round(Total);
									        	  var totAmount = Total.toFixed(2);//Math.round(Total);
										        }
									        	  
									      function totalDisC()
										   {
											    //TOTAL DISCOUNT AMOUNT
											       var TotalDisAmt = 0;
											        var TotalsPAmt = 0;
											        var disPer = 0;
											        var count = jQuery("#list4").jqGrid('getGridParam', 'records');
											        var allRowsInGrid1 = $('#list4').getGridParam('data');
											        var AllRows=JSON.stringify(allRowsInGrid1);
											        for (var l = 0; l < count; l++)
											        {
											          var TotalDisAmt1 = allRowsInGrid1[l].DiscountAmount;
											          var TotalsPAmt1 = allRowsInGrid1[l].salePriceEx;
											        		  
											        if(TotalsPAmt1 != undefined)
											        {
											        	TotalsPAmt = (+TotalsPAmt + +TotalsPAmt1).toFixed(2);
											        }
											        if(TotalDisAmt1 != undefined)
											        {
											        	TotalDisAmt = (+TotalDisAmt + +TotalDisAmt1).toFixed(2);
											        	//TotalDisAmt = ((TotalDisAmt1)*(quantity)).toFixed(2);
											        	disPer = ((TotalDisAmt/TotalsPAmt)*100).toFixed(2);
											        }						        	 
											        	  }
											        	  /*document.getElementById("discount1").value = disPer;*/
											        	 // document.getElementById("discount").value = TotalDisAmt;
										        	 }
			                    
			                    
			                    function finalCalculation()
			                    {
			                    		var Total = 0;
			                    		var Total1 = 0;
			                    		var count = jQuery("#list4").jqGrid('getGridParam', 'records');
			        		        	var allRowsInGrid1 = $('#list4').getGridParam('data');
			        		        	var AllRows=JSON.stringify(allRowsInGrid1);
			        		        	for (var k = 0; k < count; k++)
			        		        	{
			        		        		Total1 = allRowsInGrid1[k].total;
			        		        		if(Total1 == undefined)
			        		        			{
			        		        				Total1 = 0;
			        		        			}
			        		        		Total = +Total + +Total1;
			        		        		Total = Math.round(Total * 100) / 100;
			        		        		
			        		        	}
			        		        	
			        		        	document.getElementById("totalWithExpense").value = Total;
			        		        	document.getElementById("grossTotal").value = Total;
		        		        		
			                    }
	                    },
			//},
	        	
         
			pager: "#jqGridPager",
			
		});
		
	
		//$("#list4").addRowData(i+1,jsonData[i]);
		if(count==0 || count==null)
		{
			 // $("#list4").addRowData(i,jsonData[i]);
			  $("#list4").addRowData(0,jsonData[i]);
		}
		

   
		 $('#list4').navGrid('#jqGridPager',
	                
	                { edit: true, add: false, del: true, search: true, refresh: true, view: true, position: "left", cloneToTop: false },
	                
	                {
	                    editCaption: "The Edit Dialog",
	                   
	                    afterSubmit: function () {
							
	                      var grid = $("#list4"),
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
	                	
						

						afterComplete: function() {
	                		$('#list4').trigger( 'reloadGrid' );

	                		
	                		document.getElementById("discount").value = 0;
			 				document.getElementById("discountAmount").value = 0;
			 				document.getElementById("hamaliExpence2").value = 0;
			 				//document.getElementById("hamaliExpence").value = 0;	                		
	                		
	 				       /* 	Calculation of total after editing quantity*/
	 				        	   
	 				        	   // $(this).trigger('reloadGrid');
	 				        	   var rowId =$("#list4").jqGrid('getGridParam','selrow');  
	 		                       var rowData = jQuery("#list4").getRowData(rowId);
	 		                    	var quantity = rowData['quantity'];
	 		                    	var salePrice = rowData['salePrice'];
	 		                    	var kg = rowData['kg'];
			                    	//alert("kg entered = "+kg);
			                    	var grams = rowData['grams'];
			                    	//alert("grams entered = "+grams);
	 		                    	var iGst = rowData['igst'];
	 		                    	var Gst = rowData['gst'];
	 		                    	
	 		                    	///productId = $('#proName').val();
	 		                    	
	 		                    	
	 		                    	//var productName=$('#productName').val(); 
	 		                    	/*
	 		                    	$("#proName option:selected").each(function() {
	 		                    		   selectedVal = $(this).text();
	 		                    		});*/
	 		                    	
	 		                    	///var splitText = selectedVal.split(",");
	 		                    	//var splitTextforproduct =productName.split(",");
	 		                   	
	 		                    	var stock = splitText[4];
	 		                    	
	 		                    	var salePricePerGram = 0;
			                    	salePricePerGram = (Number)(salePrice/1000);
			                    	
			             
		                    	if(Number(grams) != "" || Number(kgValue) != "")
		                    	{
			                    	if(Number(kg)>0 && Number(grams) == 0)
	                    			{
			                    		var salePriceKgTota = 0;
			                    		salePriceKgTota = Number(salePrice)*kg;
			                    		salePriceKgTota = Math.round(salePriceKgTota * 100) / 100;
	                    				$("#list4").jqGrid("setCell", rowId, "total", salePriceKgTota);
	                    			}
			                    	
			                    	if(Number(grams)>0 && Number(kg) == 0)
	                    			{
			                    		var salePriceGramTota = 0;
			                    		salePriceGramTota = Number(salePricePerGram)*grams;
			                    		salePriceGramTota = Math.round(salePriceGramTota * 100) / 100;
	                    				$("#list4").jqGrid("setCell", rowId, "total", salePriceGramTota);
	                    			}
			                    	
			                    	if(Number(kg) > 0 && Number(grams) > 0)
	                    			{
			                    		var salePriceKgTota = 0;
			                    		var salePriceGramTota = 0;
			                    		var salePriceKgPlusGrams = 0;
			                    		salePriceKgTota = Number(salePrice)*kg;
			                    		salePriceGramTota = Number(salePricePerGram)*grams;                    		
			                    		salePriceKgPlusGrams = Number(salePriceKgTota) + Number(salePriceGramTota);
			                    		salePriceKgPlusGrams = Math.round(salePriceKgPlusGrams * 100) / 100;
	                    				$("#list4").jqGrid("setCell", rowId, "total", salePriceKgPlusGrams);
		                    		}
			                    	
			                    	var Total =0;
 		                    		var count = jQuery("#list4").jqGrid('getGridParam', 'records');
 		        		        	var allRowsInGrid1 = $('#list4').getGridParam('data');
 		        		        	var AllRows=JSON.stringify(allRowsInGrid1);
 		        		        	for (var k = 0; k < count; k++) {
 		        		        		var Total1 = allRowsInGrid1[k].total;
 		        		        		Total = +Total + +Total1;
 		        		        		Total = Math.round(Total * 100) / 100;
 		        		        	}
 		        		        	document.getElementById("totalWithExpense").value = Total;
 		        		        	document.getElementById("grossTotal").value = Total;
 		                        	
		                    	}
	 		                    	if ( Number(quantity) > Number(stock))
	 		                    	{	 		                    		
	 		                    		alert("Available stock = "+stock);
	 		                    	}
	 		                    	
	 		                    		if (iGst != 0){
	 		                    		/*	var taxPercentage = iGst;
	 			                    		var taxAmount = ((taxPercentage/100)*salePrice);
	 			                    		var BuyPriceWithTaxAmount = Number(taxAmount) + Number(salePrice);*/
	 			                    		var tota = quantity * salePrice;
	 			                    		tota = Math.round(tota * 100) / 100;
	 			                    		$("#list4").jqGrid("setCell", rowId, "total", tota);
		 		                    	}
		 		                    	else if(iGst == 0){
	 		                    		/*var  taxPercentage = Number(Gst);
	 		                    		var taxAmount = ((taxPercentage/100)*salePrice);
	 		                    		var BuyPriceWithTaxAmount = Number(taxAmount) + Number(salePrice);*/
	 		                    		var tota = quantity * salePrice;
	 		                    		tota = Math.round(tota * 100) / 100;
	 		                    		$("#list4").jqGrid("setCell", rowId, "total", tota);
		 		                    		
		 		                    	}
		 		                    		
		 		                    		var Total =0;
		 		                    		var count = jQuery("#list4").jqGrid('getGridParam', 'records');
		 		        		        	var allRowsInGrid1 = $('#list4').getGridParam('data');
		 		        		        	var AllRows=JSON.stringify(allRowsInGrid1);
		 		        		        	for (var k = 0; k < count; k++) {
		 		        		        		var Total1 = allRowsInGrid1[k].total;
		 		        		        		Total = +Total + +Total1;
		 		        		        		Total = Math.round(Total * 100) / 100;
		 		        		        	}
		 		        		        	document.getElementById("totalWithExpense").value = Total;
		 		        		        	document.getElementById("grossTotal").value = Total;
		 	        		        		//document.getElementById("duptotal").value = Total;
		 		                    	
	 		        	
						},
						reloadAftersubmit:true,	
	                    errorTextFormat: function (data) {
	                        return 'Error: ' + data.responseText
	                    }
	                		
	                });
		 
		 
			   });
		
		})

}

function nonGSTbillingV(){
	


	
//	alert("cc "+cc)
//	var aa = $('#ctype1').val();
//	var aa=document.getElementbyId("ctype1").value;
	/*if(document.getElementbyId("ctype1").checked){
		aa= document.getElementbyId("ctype1").value;
	}
	else if(document.getElementbyId("ctype2").checked){
		aa= document.getElementbyId("ctype2").value;
	}
	*/
	
/*	var s;
	for(var i=0; i<aa.length; i++){
		if(aa[i].checked){
			s=aa[i].value;
		}
	}	*/
/*for(var i=0; i<ctype1.length; i++){
	if(ctype1[i].checked){
		ctype2=ctype1[i].value;
	}
}	*/
//alert(s);	
//	alert(cuss);
	var aa=document.getElementById("customertype1");
	var bb=document.getElementById("customertype2");
	var cc;	
//	var customerName; 
	if(aa.checked==true){
		cc=aa.value;
	}
	
	else if(bb.checked==true){
	cc=bb.value;
	}
	
	
	
	
	if(cc=='Cash'){
	var customerName = $("#customerName").val();
	}
	if(cc=='Credit'){
		var customerName = $("#creditcustomerName").val();
	}
	
	var shopName = $("#shopName").val();
	var contactNo = $("#contactNo2").val();
	var proName  = $("#proName").val();
	
/*	if (customerName == "")
	{
		$.getScript('/Shop/staticContent/js/bootbox.min.js', function()  
		{		
				var msg="Please Enter Customer Name";
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
				
					}//);		
	 }*/
	
	if(customerName != "")
	{
	 var letterNumber = /^[a-zA-Z ]+$/;
	 if(customerName.match(letterNumber))
	 {
		 
	 }
	 else
		{
		 var msg="Please Enter Valid Customer Name";
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
	  /*if(contactNo != "")
	  {
		  var letterNumber = /^[0-9]{10}$/;
			 if(contactNo.match(letterNumber))
			 {				
				
			 }
			 else
			 {
				    var msg="Please Enter Valid 10 Digit Contact Number";
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
	  }*/
	  if(proName == "" || proName == "Select product")
	  {
						
			var msg="Please Select Product";
			var dialog = bootbox.dialog({
				//title: "Embel Technologies Says :",
			   /* message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',*/
			    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
			    closeButton: false
			});
			
			setTimeout(function() {
				dialog.modal('hide');
			}, 1500);
			
			return false;
	  }
	  
	  if(document.fertiBill.paymentMode.value == ""  || document.fertiBill.paymentMode.value == "selected")
        {					
			var msg="Please Select Payment Mode";
			var dialog = bootbox.dialog({
				//title: "Embel Technologies Says :",
			   /* message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',*/
			    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
			    closeButton: false
			});
			
			setTimeout(function() {
				dialog.modal('hide');
			}, 1500);
			
			return false;
        }
    	if(document.fertiBill.paymentMode.value == "cheque")
    	{
        	if(document.fertiBill.chequeNum.value == "")
        	{					
				var msg="Please Enter Cheque Number";
				var dialog = bootbox.dialog({
					//title: "Embel Technologies Says :",
				   /* message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',*/
				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
				    closeButton: false
				});
				
				setTimeout(function() {
					dialog.modal('hide');
				}, 1500);
				
				return false;
        		}
        	
        	if(document.fertiBill.nameOnCheck.value == "")
    		{					
				var msg="Please Enter Name on Cheque";
				var dialog = bootbox.dialog({
					//title: "Embel Technologies Says :",
				   /* message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',*/
				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
				    closeButton: false
				});
				
				setTimeout(function() {
					dialog.modal('hide');
				}, 1500);
				
				return false;
    		}
    	}
    	
    	if(document.fertiBill.paymentMode.value == "card")
    	{	
    		
        	if(document.fertiBill.cardNum.value == "")
        	{					
				var msg="Please Enter Card Number";
				var dialog = bootbox.dialog({
					//title: "Embel Technologies Says :",
				   /* message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',*/
				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
				    closeButton: false
				});
				
				setTimeout(function() {
					dialog.modal('hide');
				}, 1500);
				
				return false;
        		}
        	if(document.fertiBill.cardNum.value != "")
    		{
        		var numbers = /^[0-9]+$/;
        		if(document.fertiBill.cardNum.value.match(numbers))
        		{
        			
        		}
        		else
        		{					
					var msg="Please Enter Valid Card Number";
					var dialog = bootbox.dialog({
						//title: "Embel Technologies Says :",
					   /* message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',*/
					    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
					    closeButton: false
					});
					
					setTimeout(function() {
						dialog.modal('hide');
					}, 1500);
					
					return false;
         		}
    		}
    	}
    	
    	
    	if(document.fertiBill.paymentMode.value == "neft")
    	{
        	if(document.fertiBill.accNum.value == "")
        	{
				var msg="Please Enter Account Number";
				var dialog = bootbox.dialog({
					//title: "Embel Technologies Says :",
				   /* message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',*/
				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
				    closeButton: false
				});
				
				setTimeout(function() {
					dialog.modal('hide');
				}, 1500);
				
				return false;
				
        	}
        	if(document.fertiBill.accNum.value != "")
    		{
        		var numbers = /^[0-9]+$/;
        		if(document.fertiBill.accNum.value.match(numbers))
        		{
        			
        		}
        		else
        		{
					var msg="Please Enter Valid Acount Number";
					var dialog = bootbox.dialog({
						//title: "Embel Technologies Says :",
					   /* message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',*/
					    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
					    closeButton: false
					});
					
					setTimeout(function() {
						dialog.modal('hide');
					}, 1500);
					
					return false;
        						
        		}

    		}
    	
        	if(document.fertiBill.bankName.value == "")
    		{
				var msg="Please Enter bank Name";
				var dialog = bootbox.dialog({
					//title: "Embel Technologies Says :",
				   /* message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',*/
				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
				    closeButton: false
				});
				
				setTimeout(function() {
					dialog.modal('hide');
				}, 1500);
				
				return false;
    		}
        	if(document.fertiBill.bankName.value != "")
    		{
   	        	var letters = /^[A-Za-z]+$/;
   	        	if(document.fertiBill.bankName.value.match(letters))
   	        	{
   	        		
   	        	}
   	        	else
   	        	{					
					var msg="Please Enter Valid Bank Name";
					var dialog = bootbox.dialog({
						//title: "Embel Technologies Says :",
					   /* message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',*/
					    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
					    closeButton: false
					});
					
					setTimeout(function() {
						dialog.modal('hide');
					}, 1500);
					
					return false;        						
           		}
        		
    		}
    	}	   	        				 
    	nonGSTbilling();
}
function nonGSTbilling(){
	
	var aa=document.getElementById("customertype1");
	var bb=document.getElementById("customertype2");
	var cc;	
	if(aa.checked==true){
		cc=aa.value;
	}
	
	else if(bb.checked==true){
	cc=bb.value;
	}	
	
	//document.fertiBill.btn.disabled = true;	
	document.getElementById("billingCashbtn").disabled = true;
	var params = {};
	
	var customerType = "NORMALCUSTOMER";


		if(cc=='Cash'){
		var customerName = $('#customerName').val();
		var village = $('#village').val();
		var firmName = $('#firmName').val();
		}
		
		if(cc=='Credit'){
			var village = $('#ccvillage').val();
			var customerName = $('#creditcustomerName').val();
			var firmName = $('#CfirmName').val();
			
	var input = document.getElementById('creditcustomerName'),
	list = document.getElementById('customerName_drop'),
           i,creditCust;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
		creditCust = list.options[i].getAttribute('data-value');
	}
	}


	}
		
	var fkcustid = creditCust;
	
	if(firmName=="" || firmName==null || firmName==undefined){
		firmName="NA";
	}
	
	if((fkcustid=="") || (fkcustid==null) || (fkcustid==undefined)) {
		fkcustid=0;
	
	}
	if((customerName=="") || (customerName==null) || (customerName==undefined)) {
		customerName="NA";
	
	}
	if((village=="") || (village==null) || (village==undefined)) {
		village="NA";
	
	}
	
	var contactNo = $('#contactNo2').val();
	var hamaliExpense = $('#hamaliExpence').val();
	/*var transExpenseWithoutGST = $('#transExpence2').val();*/
	var hamaliExpenseWithourGST = $('#hamaliExpence2').val();
	var grossTotal = $('#grossTotal').val();
	var total = $('#totalWithExpense').val();
	var paymentMode = $('#paymentMode').val();
	var chequeNum = $('#chequeNum').val();
	var saleDate = $('#saleDate').val();
	var billtype = $('#billtype').val();
	var description = $('#description').val();
	var email = $('#email').val();		
	
	if((contactNo=="") || (contactNo==null) || (contactNo==undefined)) {
		contactNo=0;
	
	}
	
	var input = document.getElementById('shopName'),
    	list  = document.getElementById('shop_drop1'),
    		    i,shopName;

	for (i = 0; i < list.options.length; ++i) {
    if (list.options[i].value === input.value) {
    	shopName = list.options[i].getAttribute('data-value');
    	}
	}
	var gstNo = $('#gstNo').val();
	var nameOnCheck = $('#nameOnCheck').val();
	var cardNum = $('#cardNum').val();
	var accNum = $('#accNum').val();
	var bankName = $('#bankName').val();
	
	var discount = $('#discount').val();
	var discountAmount = $('#discountAmount').val();
	
	if((discount=="") || (discount==null) || (discount==undefined)) {
		discount=0;
	
	}
	if((discountAmount=="") || (discountAmount==null) || (discountAmount==undefined)) {
		discountAmount=0;
	
	}
	if((email=="") || (email==null) || (email==undefined)) {
		email="abc@g.com";
	
	}
		
    productId = $('#proName').val();
	
	$("#proName option:Selected").each(function() {
		   selectedVal = $(this).text();
		});
	
	/*var splitText = selectedVal.split(",");
	
	var fk_shop_id = splitText[12];*/
	
	var count = jQuery("#list4").jqGrid('getGridParam', 'records');
	var allRowsInGrid = $('#list4').getGridParam('data');                        //to get all rows of grid
	var AllRows=JSON.stringify(allRowsInGrid);
	for (var i = 0; i < count; i++)
	{		
		var cat_id = allRowsInGrid[i].cat_id;
		params["cat_id"+i] = cat_id;
		
		var sub_cat_id = allRowsInGrid[i].sub_cat_id;
		params["sub_cat_id"+i] = sub_cat_id;
	
		var barcodeNo = allRowsInGrid[i].barcodeNo;
		params["barcodeNo"+i] = barcodeNo;
				
		var itemName = allRowsInGrid[i].itemName;
		params["itemName"+i] = itemName;
		
		var companyName = allRowsInGrid[i].companyName;
		params["companyName"+i] = companyName;
		
		var hsn = allRowsInGrid[i].hsn;
		params["hsn"+i] = hsn;
		
		var weight = allRowsInGrid[i].weight;
		params["weight"+i] = weight;
		
		var unitName = allRowsInGrid[i].unitName;
//		if(unitName == 'Box/pcs'){
//			unitName = 'pcs' ;
//			params["unitName"+i] = unitName;
//		}else{
			params["unitName"+i] = unitName;
//		}
		
		var salePrice = allRowsInGrid[i].sp;
		var mrp = allRowsInGrid[i].mrp;
			
		if(salePrice != '' || salePrice == '0')
		{
			var numbers = /^[0-9]+\.?[0-9]*$/;
			if(String(salePrice).match(numbers))
			{	
				if(salePrice == '0' || salePrice == undefined || salePrice == '' || salePrice == null)
				{
					var msg="Please Enter Unit Price For :: "+(i+1)+" "+itemName;
					var dialog = bootbox.dialog({
						//title: "Embel Technologies Says :",
					    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
					    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
					    closeButton: false
					});
					
					setTimeout(function() {
						dialog.modal('hide');
					}, 1500);
	 				document.getElementById("billingCashbtn").disabled = false;	
					return false;
				}
			}
			else
			{
				var msg="Please Enter Valid Unit Price For :: "+(i+1)+" "+itemName;
				var dialog = bootbox.dialog({
					//title: "Embel Technologies Says :",
				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
				    closeButton: false
				});
				
				setTimeout(function() {
					dialog.modal('hide');
				}, 1500);
 				document.getElementById("billingCashbtn").disabled = false;	
				return false;
			}
		}
		
		if(mrp != '')
		{
			var numbers = /^[0-9]+\.?[0-9]*$/;
			if(String(mrp).match(numbers))
				{		
					if(mrp == '' || mrp == '0' || mrp == undefined || mrp == null)
					{
						mrp = 0;
					}
					else if(Number(salePrice) > Number(mrp))
					{
						var msg="MRP per Unit Must be Greater Than Unit Price";
						var dialog = bootbox.dialog({
							//title: "Embel Technologies Says :",
						    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
						    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
						    closeButton: false
						});
						
						setTimeout(function() {
							dialog.modal('hide');
						}, 1500);
		 				document.getElementById("billingCashbtn").disabled = false;	
						return false;
					}
				}
			else
			{
				var msg="Please Enter Valid MRP Price";
				var dialog = bootbox.dialog({
					//title: "Embel Technologies Says :",
				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
				    closeButton: false
				});
				
				setTimeout(function() {
					dialog.modal('hide');
				}, 1500);
 				document.getElementById("billingCashbtn").disabled = false;	
				return false;
			}
		}
		else
		{
			mrp = 0;
		}
		
		params["salePrice"+i] = salePrice;
		params["mrp"+i] = mrp;
		
		var quantity = allRowsInGrid[i].quantity;
		
		if(unitName == 'kg')
		{	
			if(quantity == "0" || quantity == undefined || quantity == "" || quantity == null)
			{
				var msg="Please Enter Kg OR grams :: "+(i+1)+" "+itemName;;
				var dialog = bootbox.dialog({
					//title: "Embel Technologies Says :",
				   /* message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',*/
				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
				    closeButton: false
				});
				
				setTimeout(function() {
					dialog.modal('hide');
				}, 1500);
 				document.getElementById("billingCashbtn").disabled = false;	
				return false;
			}
			else
			{
				params["quantity"+i] = quantity;
			}
		}
		
		
		if(unitName == 'ltr')
		{
			if(quantity == "0" || quantity == undefined || quantity == "" || quantity == null)
			{
				var msg="Please Enter Ltr OR mili :: "+(i+1)+" "+itemName;;
				var dialog = bootbox.dialog({
					//title: "Embel Technologies Says :",
				   /* message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',*/
				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
				    closeButton: false
				});
				
				setTimeout(function() {
					dialog.modal('hide');
				}, 1500);
 				document.getElementById("billingCashbtn").disabled = false;	
				return false;
			}
			else
			{
				params["quantity"+i] = quantity;
			}
		}		
		
		if(unitName == 'millilitre')
		{
			if(quantity == "0" || quantity == undefined || quantity == "" || quantity == null)
			{
				var msg="Please Enter Ltr OR mili :: "+(i+1)+" "+itemName;;
				var dialog = bootbox.dialog({
					//title: "Embel Technologies Says :",
				   /* message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',*/
				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
				    closeButton: false
				});
				
				setTimeout(function() {
					dialog.modal('hide');
				}, 1500);
 				document.getElementById("billingCashbtn").disabled = false;	
				return false;
			}
			else
			{
				params["quantity"+i] = quantity;
			}
		}
		
		if(unitName == 'pcs')
		{			
			if(quantity == "0" || quantity == undefined || quantity == "" || quantity == null)
			{
				var msg="Please Enter Quantity :: "+(i+1)+" "+itemName;
				var dialog = bootbox.dialog({
					//title: "Embel Technologies Says :",
				   /* message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',*/
				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
				    closeButton: false
				});
				
				setTimeout(function() {
					dialog.modal('hide');
				}, 1500);
 				document.getElementById("billingCashbtn").disabled = false;	
				return false;
			}
			else
			{
				params["quantity"+i] = quantity;
			}
			
			var freeQuantity = allRowsInGrid[i].freeQuantity;
			if(freeQuantity == "0" || freeQuantity == undefined || freeQuantity == "" || freeQuantity == null)
			{
				params["freeQuantity"+i] = 0;
			}
			else
			{
				params["freeQuantity"+i] = freeQuantity;
			}	
		}
		
		if(unitName == 'grams')
		{
			if(quantity == "0" || quantity == undefined || quantity == "" || quantity == null)
			{
				var msg="Please Enter Grams :: "+(i+1)+" "+itemName;;
				var dialog = bootbox.dialog({
					
					message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
				    closeButton: false
				});
				
				setTimeout(function() {
					dialog.modal('hide');
				}, 1500);
 				document.getElementById("billingCashbtn").disabled = false;	
				return false;
			}
			else
			{
				params["quantity"+i] = quantity;
			}
		}
		
		var quantity = allRowsInGrid[i].quantity;
		params["quantity"+i] = quantity;
		
		var freeQuantity = allRowsInGrid[i].freeQuantity;
		params["freeQuantity"+i] = freeQuantity;
		
		var cgst = allRowsInGrid[i].cgst;
		params["cgst"+i] = cgst;
		
		var sgst = allRowsInGrid[i].sgst;
		params["sgst"+i] = sgst;
			
		var DiscountperProd = allRowsInGrid[i].Discount;
		params["DiscountperProd"+i] = DiscountperProd;
		
		var DiscountAmountperProd = allRowsInGrid[i].DiscountAmount;
		params["DiscountAmountperProd"+i] = DiscountAmountperProd;
		
		var igst = allRowsInGrid[i].igst;
		params["igst"+i] = igst;
			
		var total = allRowsInGrid[i].total;
		params["total"+i] = total;
		
		var expiryDate = allRowsInGrid[i].expiryDate;
		params["expiryDate"+i] = expiryDate;
		
		var PkGoodreceiveId = allRowsInGrid[i].PkGoodreceiveId;
		params["PkGoodreceiveId"+i] = PkGoodreceiveId;
		
		var productPkId = allRowsInGrid[i].productPkId;
		params["productPkId"+i] = productPkId;
		
		var chaalanNo = "0";
		params["chaalanNo"+i] = chaalanNo;
		
		var barcode_id = allRowsInGrid[i].barcode_id;
		params["barcode_id"+i] = barcode_id;
	}
	
	if(count == '' || count == '0' || count == undefined || count == null)
	{
		var msg="Please Select Product";
		var dialog = bootbox.dialog({
			//title: "Embel Technologies Says :",
		   /* message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',*/
		    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		    closeButton: false
		});
		
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		document.getElementById("billingCashbtn").disabled = false;	
		return false;
	}
	
	params["firmName"] = firmName;
	params["email"] = email;
	params["customerName"] = customerName;
	params["fkcustid"] = fkcustid;
	params["count"] = count;
	params["village"] = village;
	params["contactNo"] = contactNo;
	params["total"] = total;
	params["fk_shop_id"] = shopName;
	params["gstNo"] = gstNo;
	params["grossTotal"] = grossTotal;
	params["hamaliExpense"] = hamaliExpense;
	/*params["transExpenseWithoutGST"] = transExpenseWithoutGST;*/
	params["hamaliExpenseWithourGST"] = hamaliExpenseWithourGST;
	params["paymentMode"] = paymentMode;
	params["chequeNum"] = chequeNum;
	params["saleDate"] = saleDate;
	params["nameOnCheck"] = nameOnCheck;
	params["cardNum"] = cardNum;
	params["accNum"] = accNum;
	params["discount"] = discount;
	params["discountAmount"] = discountAmount;
	params["bankName"] = bankName;
	params["customerType"] = customerType;
	params["billtype"] = billtype;
	params["description"] = description;
	params["type"]=cc;
	params["methodName"] = "addingnonGSTBill";
	
	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
 	 {
//		window.open("NonGSTBillPDF.jsp");

//		window.open("NewbillPDF1.jsp");	
		//window.open("AutoBillpdf.jsp");	
//		window.open("ReliablePDF.jsp");	

		//window.open("newPDF.jsp");
		window.open("NewPdf1.jsp");
		//window.open("TrinityEnterprisesBillPdf.jsp");
		location.reload();
		document.getElementById("billingCashbtn").disabled = false;	
		
	 }).error(function(jqXHR, textStatus, errorThrown){
 	    		if(textStatus==="timeout") {
 	    			$(loaderObj).hide();
 	    			$(loaderObj).find('#errorDiv').show();
 	    		}
 	 });
}

function getProductDetailsBynonGridDataForchallan(){
	
	var params= {};
	
	var challanNo=$('#challanNo').val();
		
	$("#gstForExpense1").append($("<input/>").attr("value","").text());
	$("#totalWithExpense1").append($("<input/>").attr("value","").text());
	$("#discount1").append($("<input/>").attr("value","").text());
	$("#discountAmount1").append($("<input/>").attr("value","").text());
	$("#hamaliExpence3").append($("<input/>").attr("value","").text());
	$("#hamaliExpence1").append($("<input/>").attr("value","").text());
	$("#grossTotal1").append($("<input/>").attr("value","").text());
	
	params["challanNo"]= challanNo;
	
	params["methodName"] = "getChallanBillingForEditNonGrid";
	
	$.post('/Shop/jsp/utility/controller.jsp', params,function(data){

		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		$.each(jsonData,function(i,v)
		{
			document.getElementById("gstForExpense1").value = v.expenseTaxPerc;
			document.getElementById("totalWithExpense1").value = v.totalAmount;
			document.getElementById("discount1").value = v.discPercentage;
			document.getElementById("discountAmount1").value = v.discAmount;
			document.getElementById("hamaliExpence3").value = v.hamaliExpenseInclTax;
			document.getElementById("hamaliExpence1").value = v.hamaliExpenseTaxAmt;
		    document.getElementById("grossTotal1").value = v.grossTotal;
		});
	}).error(function(jqXHR, textStatus, errorThrown){
		if(textStatus==="timeout") {

		}
	});
}

function discountCalculation()
{
	var total = document.getElementById("totalWithExpense").value;
	var discountAmount = document.getElementById("discountAmount").value;
	var discount = $('#discount').val();
	
	if(discount == "")
	{
		document.getElementById("discountAmount").value = "";
		discountAmount = 0;
		var hamaliExpence = document.getElementById("hamaliExpence2").value;			
		//var hamali = document.getElementById("hamaliExpence").value;
		var totalHamali = Number(hamaliExpence);
		if(hamaliExpence == "")
		{
			totalHamali = 0;
		}

		var totalminusDiscount = ((Number(total) + Number(totalHamali)) - Number(discountAmount));								
		document.getElementById("grossTotal").value = totalminusDiscount;
	}
	if(discount != "")
	{			
   	    var checkDiscount = /^[0-9]+$/;
   	    if(discount.match(checkDiscount))
   	    {
       	    if(discount >= Number(100))
       	    {
       	    	var msg="Discount Value Must Be less Than 100%";
				var dialog = bootbox.dialog({
					message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
				    closeButton: false
				});
				
				setTimeout(function() {
					dialog.modal('hide');
				}, 1500);

				document.getElementById("hamaliExpence2").value = "";
				//document.getElementById("hamaliExpence").value = "";
				document.getElementById("discountAmount").value = "";
				document.getElementById("discount").value = "";
				var total = document.getElementById("totalWithExpense").value;
				document.getElementById("grossTotal").value = total.toFixed(2);
				
				return false;
       	    }
       	}
   	    else
       	{
   	    	var msg="Please Enter Valid Discount";
			var dialog = bootbox.dialog({
				//title: "Embel Technologies Says :",
			   /* message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',*/
			    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
			    closeButton: false
			});
			
			setTimeout(function() {
				dialog.modal('hide');
			}, 1500);

			document.getElementById("hamaliExpence2").value = "";
			//document.getElementById("hamaliExpence").value = "";
			document.getElementById("discountAmount").value = "";
			document.getElementById("discount").value = "";
			var total = document.getElementById("totalWithExpense").value;
			document.getElementById("grossTotal").value = total.toFixed(2);
			
			return false;
       	}

   	 var hamaliAmoount = document.getElementById("hamaliExpence2").value;
		// var hamalitaxAmt = document.getElementById("hamaliExpence").value;
		 if(hamaliAmoount == "" || hamaliAmoount == "0")
		 {
			hamaliAmoount = 0;
		 }
		/*  if(hamalitaxAmt == "" || hamalitaxAmt == "0")
	 {
			hamalitaxAmt = 0;
		 } */
		
	var discountAmount = ((discount/100)*Number(total));
	var totalminusDiscount = ((Number(total) - discountAmount)+(Number(hamaliAmoount)));
	
	document.getElementById("discountAmount").value = discountAmount.toFixed(2);
	document.getElementById("grossTotal").value = totalminusDiscount.toFixed(2);
	}
}


//


function getVillageNamecredit()
{		
	var input = document.getElementById('creditcustomerName'),
    list = document.getElementById('customerName_drop'),
    i,creditCustomer;

	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
    	creditCustomer = list.options[i].getAttribute('data-value');
		}
	}
	
	var creditCustomerId = creditCustomer;
	$("#ccvillage").empty();
	$("#ccvillage").append($("<input/>").attr("value","").text());
	var params= {};
	params["creditCustomerId"]= creditCustomerId;
	
	params["methodName"] = "getVillageNameAndContactNoAndFirstNameByCustomer";
	
	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
			{
		var jsonData = $.parseJSON(data);
		//var jsonData = jsonData.list;
		$.each(jsonData,function(i,v)
		{
			document.getElementById("ccvillage").value = v.village;
			document.getElementById("gstNo").value = v.gstno;
			document.getElementById("contactNo2").value = v.contactNo;
			document.getElementById("email").value = v.email;
			
				});
			}).error(function(jqXHR, textStatus, errorThrown){
				if(textStatus==="timeout") {

				}
			});

}




function getVillageNamecash()
{		
	var input = document.getElementById('customerName'),
    list = document.getElementById('customerName_drop1'),
    i,creditCustomer;

	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
    	creditCustomer = list.options[i].getAttribute('data-value');
		}
	}
	
	var creditCustomerId = creditCustomer;
	$("#ccvillage").empty();
	$("#ccvillage").append($("<input/>").attr("value","").text());
	var params= {};
	params["creditCustomerId"]= creditCustomerId;
	
	params["methodName"] = "getVillageNameAndContactNoAndFirstNameByCustomer1";
	
	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
			{
		var jsonData = $.parseJSON(data);
		//var jsonData = jsonData.list;
		$.each(jsonData,function(i,v)
		{
			document.getElementById("ccvillage").value = v.village;
			document.getElementById("gstNo").value = v.gstno;
			document.getElementById("contactNo2").value = v.contactNo;
			document.getElementById("email").value = v.email;
			
				});
			}).error(function(jqXHR, textStatus, errorThrown){
				if(textStatus==="timeout") {

				}
			});

}

function getVillageNamecash1()
{		
	var input = document.getElementById('customerName'),
    list = document.getElementById('customerName_drop1'),
    i,creditCustomer;

	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
    	creditCustomer = list.options[i].getAttribute('data-value');
		}
	}
	
	var creditCustomerId = creditCustomer;
	$("#village").empty();
	$("#village").append($("<input/>").attr("value","").text());
	var params= {};
	params["creditCustomerId"]= creditCustomerId;
	
	params["methodName"] = "getVillageNameAndContactNoAndFirstNameByCustomer1";
	
	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
			{
		var jsonData = $.parseJSON(data);
		//var jsonData = jsonData.list;
		$.each(jsonData,function(i,v)
		{
			document.getElementById("village").value = v.village;
			document.getElementById("gstNo").value = v.gstno;
			document.getElementById("contactNo2").value = v.contactNo;
			document.getElementById("email").value = v.email;
			
				});
			}).error(function(jqXHR, textStatus, errorThrown){
				if(textStatus==="timeout") {

				}
			});

}