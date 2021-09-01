function getProductsInQuotationBilling()
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
	document.getElementById('productIdCash').value = "";
	
	var count=0;
	var newrow;
	var rowId;
	
	params["methodName"] = "getProductDetails1";
	
	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
 	   {
		  var jsonData = $.parseJSON(data);
			    
	     $.each(jsonData,function(i,v)
		 { 
			  var gTotal=0;
				{
		    		gTotal = +gTotal + +v.total;
				}
		    	document.getElementById("totalWithExpense").value = gTotal;  
		    	document.getElementById("grossTotal").value = gTotal;
	    	 
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
			
			  var prodName, com, packing, unit, expiryDate, barcodeno2,tot;
			  
			  for (var j = 0; j < count; j++) 
			  {
				  prodName = rowdata[j].itemName;
				  com = rowdata[j].companyName;
				  packing = rowdata[j].weight;
				  unit = rowdata[j].unitName;
				  expiryDate = rowdata[j].expiryDate;
				  barcodeno2 = rowdata[j].barcodeNo;
				  tot= rowdata[j].total;
				  gTotal = gTotal + tot;
				  
				 var rowId = ids[j];
				 var rowData = jQuery('#list4').jqGrid ('getRowData', rowId);
				
//				if (prodName == v.itemName && com == v.companyName && packing == v.weight && unit == v.unitName && expiryDate == v.expiryDate && barcodeno2 == v.barcodeNo)
					if (prodName == v.itemName && com == v.companyName && packing == v.weight && unit == v.unitName && expiryDate == v.expiryDate && barcodeno2 == v.barcodeNo)	
				 {
			    	ori_quantity = +rowdata[j].quantity+0;
			    	
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
			    	document.getElementById("totalWithExpense").value = gTotal;  
			    	document.getElementById("grossTotal").value = gTotal;
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
						'Product<br>Name',
						'Company<br>Name',
						'HSN',
						'Batch<br>No.',
						'MRP',
						'SP<br>Incl<br>Tax',
						'SP<br>Excl<br>Tax',
						'Quantity',
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
					     
					     {	 name:'barcodeNo',
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
						},
						{	 name:'batchNumber',
							 width:80,
					    	 align:'center',
					    	 hidden:true,
						},	
						
						{	 name:'mrp',
							 width:100,
							 editable: false,
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
						},
						{    name:'noOfboxes',
							 width:90,
							 hidden:false,
							 editable:true,
					    	 align:'center',
						},
						{	id:'unitName', 
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
						{	 name:'TotalEx',       //price excl amount
							 width:100,
							 align:'center',
						},
						{    name:'weight',
							 width:100,
							 hidden:true,
							 editable:true,
					    	 align:'center',
						},
						{	
							 id:'quantity',
							 name:'quantity',
							 width:100,
							 editable: true,
							 hidden:true,
							 align:'center',
						},
						{	
							 id:'freeQuantity',
							 name:'freeQuantity',
							 width:100,
							//editable: true,
							 align:'center',	
							 hidden:true,
						},						
					
						{	 id:'expiryDate', 
						 	 name:'expiryDate',
							 width:140,
							 align:'center',
							//editable: false,
							 hidden:true,
						},						
						{	 name:'total',
							 width:100,
							 align:'center',
							//formatter: sumFmatter
						},						
						{	 name:'totalKgLtrPiece',    // available Qty Check
							 width:150,
							 hidden:true,
							 align:'center',
							//formatter: sumFmatter
						},
						{	 name:'stockPerEntry',         // Original Quantity
							 width:150,
							 hidden:true,
							 align:'center',
							//formatter: sumFmatter
						},
						{	 name:'PkGoodreceiveId',
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
		                       var stockInTotalPieceQuantity = rowData['totalKgLtrPiece'];TotalEx
		                       var TotalEx = rowData['TotalEx'];
		                       
		                     
		                       quantity = ((Number(weight)*Number(noOfboxes)));
		                           //quantity =  +totalQty+ +quantity;
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
			                    	   $("#list4").jqGrid("setCell", rowId, "TotalEx", setFq);
			                    	   
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

function quotationBillingVal()
{	
	var customerName = $("#customerName").val();
	var shopName = $("#shopName").val();
	var contactNo = $("#contactNo2").val();
	var proName  = $("#proName").val();
	
	if (customerName == "")
	{
		/*$.getScript('/Shop/staticContent/js/bootbox.min.js', function() */ 
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
	 }
	
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
	  if(contactNo != "")
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
    	registerQuotationBilling();
}

function registerQuotationBilling()
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
//	var chequeNum = $('#chequeNum').val();
	var chequeNum = 0
	var saleDate = $('#saleDate').val();
			
	var input = document.getElementById('shopName'),
    	list  = document.getElementById('shop_drop1'),
    		    i,shopName;

	for (i = 0; i < list.options.length; ++i) {
    if (list.options[i].value === input.value) {
    	shopName = list.options[i].getAttribute('data-value');
    	}
	}
	var gstNo = $('#gstNo').val();
//	var nameOnCheck = $('#nameOnCheck').val();
//	var cardNum = $('#cardNum').val();
//	var accNum = $('#accNum').val();
//	var bankName = $('#bankName').val();
	
	var nameOnCheck = "NA";
	var cardNum = 0;
	var accNum = 0;
	var bankName = "NA";
	
	var discount = $('#discount').val();
	var discountAmount = $('#discountAmount').val();
	
	var email = $('#email').val();
	
	if(discount=="" || discount==null || discount==undefined){
		discount=0;
	}
	if(discountAmount=="" || discountAmount==null || discountAmount==undefined){
		discountAmount=0;
	}
	if(email=="" || email==null || email==undefined)
	{
		email="abc@gmail.com";
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
	/*	if(unitName == 'Box/pcs'){
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
		

		
		/*if(unitName == 'kg')
		{	
			if(quantity == "0" || quantity == undefined || quantity == "" || quantity == null)
			{
				var msg="Please Enter Kg OR grams :: "+(i+1)+" "+itemName;;
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
			else
			{
				params["quantity"+i] = quantity;
			}
		}*/
		
		/*if(unitName == 'ltr')
		{
			if(quantity == "0" || quantity == undefined || quantity == "" || quantity == null)
			{
				var msg="Please Enter Ltr OR mili :: "+(i+1)+" "+itemName;;
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
			else
			{
				params["quantity"+i] = quantity;
			}
		}*/		
		
		/*if(unitName == 'pcs')
		{			
			if(quantity == "0" || quantity == undefined || quantity == "" || quantity == null)
			{
				var msg="Please Enter Quantity :: "+(i+1)+" "+itemName;
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
		}*/
		
		/*if(unitName == 'grams')
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
		}*/
		
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
		
		var igst = allRowsInGrid[i].igst;
		params["igst"+i] = igst;
			
		var total = allRowsInGrid[i].total;
		params["total"+i] = total;
		
		var expiryDate = allRowsInGrid[i].expiryDate;
		params["expiryDate"+i] = expiryDate;
		
		var PkGoodreceiveId = allRowsInGrid[i].PkGoodreceiveId;
		params["PkGoodreceiveId"+i] = PkGoodreceiveId;
		
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
	params["email"] = email;
	
	params["methodName"] = "registerQuotationBill";
	
	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
 	 {
		window.open("quotationBillPDF.jsp");
		location.reload();
		document.getElementById("billingCashbtn").disabled = false;	
		
	 }).error(function(jqXHR, textStatus, errorThrown){
 	    		if(textStatus==="timeout") {
 	    			$(loaderObj).hide();
 	    			$(loaderObj).find('#errorDiv').show();
 	    		}
 	    	});
	}


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