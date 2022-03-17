function getAllBillsNoForCreditConver() {

	var input1 = document.getElementById('creditConvsupplier'),
	    list   = document.getElementById('sup_drop11'),
	             i,supplier;
	
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input1.value) {
			supplier= list.options[i].getAttribute('data-value');
		}
	}

	//var supplier = supplier;
	$("#bill_no1").empty();
	$("#bill_no1").append($("<option></option>").attr("value", "").text("Select Bill No"));
	
	var params = {};
	params["supplier"] = supplier;
	
	params["methodName"] = "getAllBillBySuppliersforCreditConver";
	
	$.post('/Shop/jsp/utility/controller.jsp', params, function(data) {
		
		var count = 1;
		var jsonData = $.parseJSON(data);
		$.each(jsonData, function(i, v) 
				{			
			$("#bill_no1").append($("<option></option>").attr("value", i).text(v.billNo));
				count++;
				});
		}).error(function(jqXHR, textStatus, errorThrown){
			if(textStatus==="timeout") {
	
			}
		});
}

//get purchase return total amount
function getPurchaseReturnTotal() {
	
	var bill_no1=$('#bill_no1').val();
	
	var input = document.getElementById('creditConvsupplier'),
		list  = document.getElementById('sup_drop11'),
				i,supplier;
	
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			supplier = list.options[i].getAttribute('data-value');
		}
	}
	
	$("#purchaseReturnAmt").empty();
	$("#purchaseReturnAmt").append($("<input/>").attr("value","").text());
	
	var params= {};
	
	params["supplier"]= supplier;
	params["bill_no1"]= bill_no1;
	
	params["methodName"] = "getpurchaseRetunTotal";
	
	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
			{
		var jsonData = $.parseJSON(data);
		$.each(jsonData,function(i,v)
				{
			document.getElementById("purchaseReturnAmt").value = v.buy_price;

				});
			})
			//getRemainingBalaneByBills();
}

//Get data for grid to Credit note conversion
function fetchDataForCreditNoteConversion(){
	
	var input = document.getElementById('creditConvsupplier'),
	    list  = document.getElementById('sup_drop11'),
	    		i,supplier;

	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			supplier = list.options[i].getAttribute('data-value');
		}
	}
	
	var bill_no1=$('#bill_no1').val();

	var params= {};
	
	params["supplier"]= supplier;
	params["bill_no1"]= bill_no1;

	params["methodName"] = "getAllIetmBySupplierForCreditNoteConversion";
			
	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
			{
		var jsonData = $.parseJSON(data);
		
		$("#jqGridCrCon").jqGrid("clearGridData", true).trigger("reloadGrid");

		$.each(jsonData,function(i, v) 
				{ 
				

			$("#jqGridCrCon").jqGrid({

					datatype : "local",

							colNames : [
									"Purchase<br>Return ID",
									"product_Id22",
									"Category_Id",
									"Barcode<br>No",
									"Product<br>Name",
									"Category",
									"Company",
									"Batch<br>No",
									"Packing",
									"Buy<br>Price",
									"Sale<br>Price",
									"M.R.P",
									"Tax<br>per",
									"Quantity",
									"Return<br>Quantity",
									"Price",
									"Total",
									"Supplier",
									"PurchaseDate",
									"pk_good_receive_id"
									],

												colModel : [
														{
															name : "purchase_return_pk",
															hidden : true
														},
														{
															name : "prodctId",
															hidden : true
														},
														{
															name : "fkCategoryId",
															hidden : true
														},
														{
															name : "barcodeNo",
															width : 80,
													    },
														{
															name : "product_name",
															width : 100,
														},
														{
															name : "category_name",
															width : 100,
														},
														{
															name : "company_Name",
															width : 100
														},
														{
															name : "batch_no",
															width : 70
														},
														{
															name : "weight",
															width : 70
														},
														{
															name : "buy_price",
															width : 70,
															editable:false
														},
														{
															name : "sale_price",
															width : 70
														},
														{
															name : 'mrp',
															width : 70,
															hidden:true
														},
														{
															name : "tax_percentage",
															width : 50
														},
														{
															name : "quantity",
															width : 70
														},
														{
															name : "return_quanty",  //return Quantity
															width : 80,
															editable : false
														},
														{
															name : "price",
															width : 70,
															editable:true
														},
														{
															name : "conversiontotal",
															width : 80,
															editable:false
														},
														{
															name : "supplier",
															width : 80,
															hidden : true
														},
														{
															name : "purchaseDate",
															width : 140
														},
														{
															name : "pkGoodReceiveId",
															hidden : true
														},
												 ],

												sortorder : 'desc',

												multiselect : false,
												loadonce : false,
												rownumbers : true,
												forcePlaceholderSize : true,
												'cellEdit' : true,
												viewrecords : true,
												width : 1400,
												shrinkToFit : true,
												rowNum : 10,
												pager : "#jqGridPagerCrCon",
												sortorder : "desc",

											   afterSaveCell : function grossTotal() {
													/*
													 * Calculation
													 * of total
													 * after
													 * editing
													 * quantity
													 */

													// $(this).trigger('reloadGrid');
													var rowId = $("#jqGridCrCon").jqGrid('getGridParam','selrow');
													var rowData = jQuery("#jqGridCrCon").getRowData(rowId);
													var prevquantity = rowData['quantity'];
													var buy_price= rowData['buy_price'];
													var tax_percentage= rowData['tax_percentage'];
													var price= rowData['price'];
													var quantity = rowData['return_quanty'];
													var total = rowData['conversiontotal'];
																										
											var total = 0;
																						
											if (Number(buy_price) < Number(price)) 
											{
												var setZero = 0; 
												alert("Return Price Must Less Than Buy Price");
												$("#jqGridCrCon").jqGrid("setCell", rowId, "price", setZero);
												return false;
												//price = "";
												
											}
											
											total = Number(price)*Number(quantity);
									        $("#jqGridCrCon").jqGrid("setCell", rowId, "conversiontotal", total);
									        		   
									        price = total/Number(quantity);
									        $("#jqGridCrCon").jqGrid("setCell", rowId, "price", price);
									        
									        var TotalReturnAmount = 0;
									        var count = jQuery("#jqGridCrCon").jqGrid('getGridParam', 'records');
									       	var allRowsInGrid1 = $('#jqGridCrCon').getGridParam('data');
								        	var AllRows=JSON.stringify(allRowsInGrid1);
								        	
								        	for (var k = 0; k < count; k++) {
								        		  var Total1 = allRowsInGrid1[k].conversiontotal;
								        		  
								        		  if(Total1 == undefined)
								        		  {
								        			  Total1 = 0;
								        		  }
								        		  TotalReturnAmount = +TotalReturnAmount + +Total1;
								        		 
								        	}
								        	
								        	 document.getElementById("crnotetotal").value = Math.floor(TotalReturnAmount * 100) / 100;
								        	 document.getElementById("CrCongrossTotal").value = Math.floor(TotalReturnAmount * 100) / 100;
								     
								   if (quantity == "" || quantity == null)
									{
									alert("Please Enter Return Quantity");
									return false;
									quantity = "";
									//location.reload();
									}

									if (Number(quantity) > Number(prevquantity)) {
									alert("Return Quantity Must Less Than Previous Quantity");
									return false;
									quantity = "";
									//location.reload();
									}
																		
									/*
									if(Number(quantity) > Number(prevquantity))
							       	  {
							       		  alert("Available Stock ="+prevquantity);
							       		  document.custord.btnSubmit.disabled = false;
							       		  return false;
							       	  }
									*/
											
								var total=0;
							    total=Number(buy_price)*Number(quantity);
								 $("#jqGridCrCon").jqGrid("setCell", rowId, "total", total);
								 
								 var checkbuyPrice= /^[0-9]+\.?[0-9]*$/;
								  if(buy_price.match(checkbuyPrice))
							    {
							      	  /*if(Number(buyPrice) > 0)
							  		  {*/
							      		  /*alert("Buy price");*/
							      		  BpwTax = (buy_price/(1+(tax_percentage/100)));
							      		  taxAmount = (BpwTax*(tax_percentage/100));
							      		  $("#jqGridCrCon").jqGrid("setCell", rowId, "taxAmount",  taxAmount.toFixed(2));
							    }
							     else
								{
							      var setZero = 0; 
								 $("#jqGridCrCon").jqGrid("setCell", rowId, "taxAmount", setZero);
									   
								}
								 		},
												pager : "#jqGridPagerCrCon",
											});

							     $("#jqGridCrCon").addRowData(i,jsonData[i]);
							     $('#jqGridCrCon').navGrid('#jqGridPagerCrCon',
											// the buttons to
											// appear on the
											// toolbar of the
											// grid
											{
												edit : true,
												add : false,
												del : true,
												search : true,
												//refresh : true,
												view : true,
												position : "left",
												cloneToTop : false
											},
											// options for the
											// Edit Dialog

											{
												afterSubmit : function()
												{
													$(this).trigger('reloadGrid');
												},
												editCaption : "The Edit Dialog",
												recreateForm : true,
												checkOnUpdate : true,
												checkOnSubmit : true,
												closeAfteredit : true,
												errorTextFormat : function(data)
												{
													return 'Error: '+data.responseText
												}

											},
											{},
											// options for the
											// Delete Dialogue
											{
												afterSubmit : function() {
													$(this).trigger('reloadGrid');
											},
												closeAfterdel : true,
												recreateForm : true,
												errorTextFormat : function(data) 
												{
													return 'Error: '+ data.responseText
												},

										onSelectRow : function(id)
										{
											if (id&& id !== lastSel) {
											jQuery("#jqGridCrCon").saveRow(lastSel,true,'clientArray');
											jQuery("#jqGridCrCon").editRow(id,true);
											lastSel = id;
											console.log(id);
													}
												}
											});

							// grid refresh code

						});

	});
	
}

//Validation of credit note conversion
function CrNoteConvertionVlidation(){
	
	if(document.creditNote.creditConvsupplier.value != "")
	{
		if(document.creditNote.bill_no1.value != "")
		{	
			if(document.creditNote.Cr_Conversion_No.value != "")
			{
				CrNoteConvertion();
			}
			else{

		     		var msg="Please Enter Cr. Concersion Number";
					
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
		else{
	     		var msg="Please Select Bill Number";
				
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
	else{
			var msg="Please Select Supplier Name";
			
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

//data store on database Credit Note Conversion
function CrNoteConvertion(){
	
	document.getElementById("btn").disabled = true;
	var params={};
	
	var input1 = document.getElementById('creditConvsupplier'),
		list   = document.getElementById('sup_drop11'),
				 i,fk_sup_id;
	
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input1.value) {
			fk_sup_id = list.options[i].getAttribute('data-value');
		}
	}
	
	var CrCongrossTotal=$('#CrCongrossTotal').val();
	var bill_no1=$('#bill_no1').val();
	var Cr_Conversion_No=$('#Cr_Conversion_No').val();
	var purchaseReturnAmt=$('#purchaseReturnAmt').val();
	
	var count = jQuery("#jqGridCrCon").jqGrid('getGridParam', 'records');
	var allRowsInGrid = $('#jqGridCrCon').getGridParam('data');               //to get all rows of grid
	var AllRows=JSON.stringify(allRowsInGrid);
	for (var i = 0; i < count; i++) {

		var prodctId = allRowsInGrid[i].prodctId;	
		params["prodctId"+i] = prodctId;

		var fkCategoryId = allRowsInGrid[i].fkCategoryId;		
		params["fkCategoryId"+i] = fkCategoryId;

		var supplier = allRowsInGrid[i].supplier;	
		params["supplier"+i] = supplier;

		var product_name = allRowsInGrid[i].product_name;
		params["product_name"+i] = product_name;

		var category_name = allRowsInGrid[i].category_name;
		params["category_name"+i] = category_name;
		
		var company_Name = allRowsInGrid[i].company_Name;
		params["company_Name"+i] = company_Name;

		var batch_no = allRowsInGrid[i].batch_no;
		params["batch_no"+i] = batch_no;
		
		var weight = allRowsInGrid[i].weight;
		params["weight"+i] = weight;
		
		var buy_price = allRowsInGrid[i].buy_price;
		params["buy_price"+i] = buy_price;
		
		var sale_price = allRowsInGrid[i].sale_price;
		params["sale_price"+i] = sale_price;
				
		var mrp = allRowsInGrid[i].mrp;
		params["mrp"+i] = mrp;
		
		var tax_percentage = allRowsInGrid[i].tax_percentage;
		params["tax_percentage"+i] = tax_percentage;
		
		var quantity = allRowsInGrid[i].quantity;
		params["quantity"+i] = quantity;
		
		var return_quanty = allRowsInGrid[i].return_quanty;
		params["return_quanty"+i] = return_quanty;
		
		var price = allRowsInGrid[i].price;
		params["price"+i] = price;
		
		var conversiontotal = allRowsInGrid[i].conversiontotal;
		params["conversiontotal"+i] = conversiontotal;
		
		var barcodeNo = allRowsInGrid[i].barcodeNo;
		params["barcodeNo"+i] = barcodeNo;
		
		var purchaseDate = allRowsInGrid[i].purchaseDate;
		params["purchaseDate"+i] = purchaseDate;
		
		var pkGoodReceiveId = allRowsInGrid[i].pkGoodReceiveId;
		params["pkGoodReceiveId"+i] = pkGoodReceiveId;
		
		var purchase_return_pk = allRowsInGrid[i].purchase_return_pk;
		params["purchase_return_pk"+i] = purchase_return_pk;
	}
	
	params["fk_sup_id"] = fk_sup_id;
	params["bill_no1"] = bill_no1;
	params["Cr_Conversion_No"] = Cr_Conversion_No;
	params["CrCongrossTotal"] = CrCongrossTotal;
	params["purchaseReturnAmt"] = purchaseReturnAmt;
	params["count"] = count;
	
	params["methodName"] = "insertCreditNoteConversion";
	
	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
		 	{
		//alert(data);
		if(document.creditNote)
		{
			window.open("CreditNoteConversionPDF.jsp");
			//window.location.reload();
			document.getElementById("btn").disabled = false;
			
		}	
	         /* var msg="Data Added Sucessfully";
				var dialog = bootbox.dialog({
			    message: '<p class="text-center">'+msg.fontcolor("green").fontsize(5)+'</p>',
			    closeButton: false
				});
				
				setTimeout(function() {
					dialog.modal('hide');
					location.reload();
				}, 1500);	
		 			document.prd.save1.disabled =false; */
		 			
		 	}).error(function(jqXHR, textStatus, errorThrown){
		 	    		if(textStatus==="timeout") {
		 	    			$(loaderObj).hide();
		 	    			$(loaderObj).find('#errorDiv').show();
		 	    		}
		 	 });
	
	
	
}

function getAllBills() {

	var input = document.getElementById('supplier'), 
		list  = document.getElementById('sup_drop'), 
				i, supplier;

	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			supplier = list.options[i].getAttribute('data-value');
		}
	}
	    
	var supplier = supplier;
	//$("#bill_no").empty();
	$("#bill_no").append($("<option></option>").attr("value", "").text("Select Bill"));
	
	
	var params = {};

	params["supplier"] = supplier;

	params["methodName"] = "getAllBillBySuppliers";

	$.post('/Shop/jsp/utility/controller.jsp', params, function(data) {
		var jsonData = $.parseJSON(data);
		// var jsonData = jsonData.list;
		$.each(jsonData, function(i, v) {
			$("#bill_no").append($("<option></option>").attr("value", i).text(v.billNo));
			$("#bill_no11").append($("<option></option>").attr("value", i).text(v.billNo));

		});
	})

}

function fetchDataForPurchase() {

	var bill_no = $('#bill_no').val();
	
	var input = document.getElementById('supplier'), 
		list  = document.getElementById('sup_drop'), 
			    i, supplier;

	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			supplier = list.options[i].getAttribute('data-value');
		}
	}
	 
	 var params = {};
	 params["supplier"] = supplier;
	 params["bill_no"] = bill_no;
	
	params["methodName"] = "getAllIetmByBillNo";

	$.post('/Shop/jsp/utility/controller.jsp',params,function(data) 
	{
		var jsonData = $.parseJSON(data);
		$("#jqGrid").jqGrid("clearGridData", true).trigger("reloadGrid");
		$.each(jsonData,function(i, v) {
	    	$("#jqGrid").jqGrid(
											{
						datatype : "local",
		
						colNames : [
								"pk_goods_receive_id",
								"PkStockId",
								"product_Id22",
								"Category_Id",
								"Barcode<br>No",
								"Product<br>Name",
								"Category",
								"Company",
								"Batch<br>No",
								"Pkg",
								"Buy<br>Price",
								"Sale<br>Price",
								"M.R.P",
								"Tax<br>%",
								"Tax<br>Amt",
								"Purc<br>Qty",
								"Avail<br>Qty",
								"Return<br>Qty",
								"Total",
								"Supplier",
								"Purchase<br>Date",
								"Sale unit",
								"Unit value",
								],
		
						        colModel : [
								{
									name : "pk_goods_receive_id",
									hidden : true
								},
								{
									name : "PkStockId",
									hidden : true
								},
								
								{
									name : "pkPOId",
									hidden : true
								},
								{
									name : "fkCategoryId",
									hidden : true
								},
								{
									name : "barcodeNo",
									width : 80
								},
								{
									name : "product_name",
									width : 100,
								},
								{
									name : "catName",
									width : 90,
								},
								{
									name : "company_Name",
									width : 100
								},
								{
									name : "batch_no",
									width : 70
								},
								{
									name : "weight",
									width : 70,
									hidden:true,
								},
								{
									name : "buy_price",
									width : 70,
									editable:false,
								},
								{
									name : "sale_price",
									width : 70
								},
								{
									name : 'mrp',
									width : 70, 
									hidden:true
								},
								{
									name : "tax_percentage",
									width : 50
								},
								{
									name : "taxAmount",
									width : 70
								},
								{
									name : "dupQuantity1",        //original Quantity
									width : 70
								},
								{
									name : "available_quanty",        
									width : 60
								},
								{
									name : "dupQuantity",         //return Quantity
									width : 70,
									editable : true
								},
								{
									name : "total",
									width : 80
								},
								{
									name : "supplier_name",
									width : 100,
									hidden : true
								},
								{
									name : "purchaseDate1",
									width : 100,
									
								},
								
								{
									name : "saleunit",
									width : 100,
									hidden : true
								},
								{
									name : "unitvalue",
									width : 100,
									hidden : true
								},
								
								],
		
						sortorder : 'desc',
		
						multiselect : false,
						loadonce : false,
						rownumbers : true,
						forcePlaceholderSize : true,
						'cellEdit' : true,
						viewrecords : true,
						width : 1400,
						shrinkToFit : true,
						rowNum : 10,
						pager : "#jqGridPager",
						sortorder : "desc",
		
						afterSaveCell : function grossTotal() {
							/*
							 * Calculation
							 * of total
							 * after
							 * editing
							 * quantity
							 */
							
							var rowId = $("#jqGrid").jqGrid('getGridParam','selrow');
							var rowData = jQuery("#jqGrid").getRowData(rowId);
							var prevquantity = rowData['dupQuantity1'];  //original qty
							var quantity = rowData['dupQuantity'];   //return qty
							var availablequantity = rowData['available_quanty'];  // available qty
							var buy_price= rowData['buy_price'];
							var sale_price= rowData['sale_price'];
							var total = rowData['total'];
							var tax_percentage= rowData['tax_percentage'];
							var total= rowData['total'];
							
							//alert("prevquantity----> "+prevquantity);
							//alert("total----> "+total);
				
							
						    if(quantity == "")
				            {
				                quantity = "0";
		                   		var setZero = 0;
		                   		$("#jqGrid").jqGrid("setCell",rowId,"dupQuantity",setZero);
				            }			
							
						   if (quantity == "" || quantity == null)
							{
							  alert("Please Enter Return Quantity");
							  return false;
							  quantity = "0";
							
							//location.reload();
							}

							if (Number(quantity) > Number(availablequantity)) {
							alert("Return Quantity Must Less Than Available Quantity");
							var setZero = 0;
							$("#jqGrid").jqGrid("setCell",rowId,"dupQuantity",setZero);
							return false;
							quantity = "";
												//location.reload();
							}
							/*
							if(Number(quantity) > Number(prevquantity))
					       	  {
					       		  alert("Available Stock ="+prevquantity);
					       		  document.custord.btnSubmit.disabled = false;
					       		  return false;
					       	  }
							*/
									
							 var total=0;
							 var tot1=0;
							 var taxAmount=0;
							 var BpwTax=0;
							 
							 total=Number(quantity) * Number(sale_price);
						     
						 $("#jqGrid").jqGrid("setCell", rowId, "total", total);
						 
						  var checkbuyPrice= /^[0-9]+\.?[0-9]*$/;
						  if(sale_price.match(checkbuyPrice))
					      {
					      	  if(quantity !=0)
					      	  {   
					      		  BpwTax = ((tax_percentage/100) * total);
					      		  //taxAmount1 = BpwTax.toFixed(2);
					      		  taxAmount = taxAmount + BpwTax;
					      		$("#jqGrid").jqGrid("setCell", rowId, "taxAmount",taxAmount.toFixed(2));
					          }
					      else
					          {
						    	 var setZero = 0;
		                   		
		                    	 $("#jqGrid").jqGrid("setCell", rowId, "taxAmount",setZero);
					          }
					      }
					      else
						  {
					    	  var setZero = 0; 
					    	  $("#jqGrid").jqGrid("setCell", rowId, "taxAmount", setZero);
						  }
						 
						 
										},
										pager : "#jqGridPager",
									});

					     $("#jqGrid").addRowData(i,jsonData[i]);
					     $('#jqGrid').navGrid('#jqGridPager',
									// the buttons to
									// appear on the
									// toolbar of the
									// grid
									{
										edit : true,
										add : false,
										del : true,
										search : true,
										//refresh : true,
										view : true,
										position : "left",
										cloneToTop : false
									},
									// options for the
									// Edit Dialog

									{
										afterSubmit : function()
										{
											$(this).trigger('reloadGrid');
										},
										editCaption : "The Edit Dialog",
										recreateForm : true,
										checkOnUpdate : true,
										checkOnSubmit : true,
										closeAfteredit : true,
										errorTextFormat : function(data)
										{
											return 'Error: '+data.responseText
										}

									},
									{},
									// options for the
									// Delete Dialogue
									{
										afterSubmit : function() {
											$(this).trigger('reloadGrid');
									},
										closeAfterdel : true,
										recreateForm : true,
										errorTextFormat : function(data) 
										{
											return 'Error: '+ data.responseText
										},

								onSelectRow : function(id)
								{
									if (id&& id !== lastSel) {
									jQuery("#jqGrid").saveRow(lastSel,true,'clientArray');
									jQuery("#jqGrid").editRow(id,true);
									lastSel = id;
									console.log(id);
											}
										}
									});

											// grid refresh code

						});

				});

}
/*function returnPurchaseValidate() {
	var supplier = $("#supplier").val();
	var bill_no = $("#bill_no").val();

	// if(supplier != "" || supplier != undefined || supplier != null ||
	// supplier != " ")
	if (supplier != "") {
		if (bill_no != "") {
			returntPurchase();
		} else {
			alert("Please Enter Bill No");
			return false;
		}
	} else {
		alert("Please Enter Supplier Name");
		return false;
	}
}*/

////////////////storing purchase Return data in database //////////////////

	function purchaseReturnTable1(){

		var supplierName=$('#supplier').val();
	   var bill_no=$('#bill_no').val();
		
		if(supplierName == "" || supplierName==null || supplierName==undefined)
	{
		var msg="Please Enter supplierName ";
		
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
	
			
				if(bill_no == "" || bill_no==null || bill_no==undefined)
	{
		var msg="Please Enter bill_no ";
		
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
	
		
		
		purchaseReturnTable();
	
	}





function purchaseReturnTable(){
	
	document.getElementById("btn").disabled = false;
	var params={};

	var supplierName=$('#supplier').val();
	var bill_no=$('#bill_no').val();
		
	var input1 = document.getElementById('supplier'),
	list = document.getElementById('sup_drop'),
	i,fk_supplier_id;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input1.value) {
			fk_supplier_id= list.options[i].getAttribute('data-value');
		}
	}

	var count = jQuery("#jqGrid").jqGrid('getGridParam', 'records');
	var allRowsInGrid = $('#jqGrid').getGridParam('data');//to get all rows of grid
	var AllRows=JSON.stringify(allRowsInGrid);
	var flag=0;
	for (var i = 0; i < count; i++)
	{
		var pk_goods_receive_id= allRowsInGrid[i].pk_goods_receive_id;
		params["pk_goods_receive_id" + i] = pk_goods_receive_id;
		
		var PkStockId= allRowsInGrid[i].PkStockId;
		params["PkStockId" + i] = PkStockId;
		
		var product_name= allRowsInGrid[i].product_name;
		params["product_name" + i] = product_name;

		var company_Name= allRowsInGrid[i].company_Name;
		params["company_Name" + i] = company_Name;

		var catName= allRowsInGrid[i].catName;
		params["catName"+i] = catName;
		
		var pkPOId= allRowsInGrid[i].pkPOId;
		params["pkPOId"+i] = pkPOId;
		
		var fkCategoryId= allRowsInGrid[i].fkCategoryId;
		params["fkCategoryId"+i] = fkCategoryId;
		
		var batch_no= allRowsInGrid[i].batch_no;
		params["batch_no"+i] = batch_no;

		var weight = allRowsInGrid[i].weight;
		params["weight" + i] = weight;
		
		var buy_price= allRowsInGrid[i].buy_price;
		params["buy_price" + i] = buy_price;
		
		var sale_price= allRowsInGrid[i].sale_price;
		params["sale_price" + i] = sale_price;
		
		var mrp = allRowsInGrid[i].mrp;
		params["mrp" + i] = mrp;
		
		var tax_percentage= allRowsInGrid[i].tax_percentage;
		params["tax_percentage" + i] = tax_percentage;
		
		var dupQuantity1= allRowsInGrid[i].dupQuantity1;//quantity
		params["dupQuantity1"+i] = dupQuantity1;
		
		var dupQuantity= allRowsInGrid[i].dupQuantity;
		params["dupQuantity"+i] = dupQuantity;
		
		var taxAmount= allRowsInGrid[i].taxAmount;
		if(taxAmount==null || taxAmount==undefined || taxAmount=="0")
		{
			params["taxAmount"+i] = 0.0;
		}
		else
		{
			params["taxAmount"+i] = taxAmount;
		}
				
		var total = allRowsInGrid[i].total;
		if(total==null || total==undefined || total=="0")
		{
			params["total"+i] = 0.0;
		}
		else
		{
			params["total"+i] = total;
		}
		
		if(dupQuantity1 < dupQuantity)
		{
			return false;
		}
		
		var barcodeNo= allRowsInGrid[i].barcodeNo;
		params["barcodeNo"+i] = barcodeNo;
		
		var purchaseDate= allRowsInGrid[i].purchaseDate1;
		params["purchaseDate" + i] = purchaseDate;		
	}
	
	params["fk_supplier_id"] = fk_supplier_id;
	params["bill_no"] = bill_no;
	params["product_name"] = product_name;
	params["supplierName"] = supplierName;
	params["count"] = count;
	
	params["methodName"] = "PurchaseReturn";

	$.post('/Shop/jsp/utility/controller.jsp', params, function(data) {
	
		// returntMinusFromStockPurchase();
		// var msg="Data Added successfully "
		 var msg=data;
				var dialog = bootbox.dialog({
					
				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
				    closeButton: false
				});
				
				setTimeout(function() {
					dialog.modal('hide');
				}, 1500);				
				document.getElementById("save").disabled = false;
				//return false;
				location.reload();
		
	}).error(function(jqXHR, textStatus, errorThrown) {
		if (textStatus === "timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});
}


function returntPurchase()
{
	var supplier = $("#supplier").val();
	var bill_no = $("#bill_no").val();

	var params = {};

	var count = jQuery("#jqGrid").jqGrid('getGridParam', 'records');
	var allRowsInGrid = $('#jqGrid').getGridParam('data');// to get all rows
	// of grid
	var AllRows = JSON.stringify(allRowsInGrid);
	for (var i = 0; i < count; i++) {
		var pk_goods_receive_id = allRowsInGrid[i].pk_goods_receive_id;
		params["pk_goods_receive_id" + i] = pk_goods_receive_id;

		//return Quantity
		var dupQuantity = allRowsInGrid[i].dupQuantity;        // Return Quantity
		if (dupQuantity == undefined)
		{
			alert("Please Enter Return Quantity FUNCTION ==> returntPurchase()")
			return false;
			dupQuantity = undefined;
			//return false;
		}
		params["dupQuantity" + i] = dupQuantity; 
		//alert("Return Quantity------------------>"+dupQuantity);

		var product_name = allRowsInGrid[i].product_name;
		params["product_name" + i] = product_name;

		var company_Name = allRowsInGrid[i].company_Name;
		params["company_Name" + i] = company_Name;

		var weight = allRowsInGrid[i].weight;
		params["weight" + i] = weight;

		var duplicateQuantity = allRowsInGrid[i].dupQuantity1;      //  Original Quantity
		params["duplicateQuantity" + i] = duplicateQuantity;

		var tax_percentage = allRowsInGrid[i].tax_percentage;
		params["tax_percentage" + i] = tax_percentage;

		var buy_price = allRowsInGrid[i].buy_price;
		params["buy_price" + i] = buy_price;
		
		var available_quanty = allRowsInGrid[i].available_quanty;      //  Available Quantity
		params["available_quanty" + i] = available_quanty;
		
		var pkPOId = allRowsInGrid[i].pkPOId;      //  Product ID
		params["pkPOId" + i] = pkPOId;
		
		var total = allRowsInGrid[i].total;      //  Return Total
		params["total" + i] = total;
		
	}

	params["count"] = count;
	params["methodName"] = "returntPurchase";

	$.post('/Shop/jsp/utility/controller.jsp', params, function(data) {
		 //alert(data);
		 //returntMinusFromStockPurchase();
		location.reload();
		
	}).error(function(jqXHR, textStatus, errorThrown) {
		if (textStatus === "timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});
}

function returntMinusFromStockPurchase() {
	var params = {};

	var count = jQuery("#jqGrid").jqGrid('getGridParam', 'records');
	var allRowsInGrid = $('#jqGrid').getGridParam('data');// to get all rows
	// of grid
	var AllRows = JSON.stringify(allRowsInGrid);
	for (var i = 0; i < count; i++) {
		var pk_goods_receive_id = allRowsInGrid[i].pk_goods_receive_id;
		params["pk_goods_receive_id" + i] = pk_goods_receive_id;
		
		var duplicateQuantity = allRowsInGrid[i].dupQuantity1;
		params["duplicateQuantity" + i] = duplicateQuantity;

		var dupQuantity = allRowsInGrid[i].dupQuantity;
		params["dupQuantity" + i] = dupQuantity;
		
		//return Quantity
		if(dupQuantity > duplicateQuantity)
			{
				alert("Return Quantity Must be Less Than Available Quantity");
				return false;
			}

		var product_name = allRowsInGrid[i].product_name;
		params["product_name" + i] = product_name;

		var company_Name = allRowsInGrid[i].company_Name;
		params["company_Name" + i] = company_Name;

		var weight = allRowsInGrid[i].weight;
		params["weight" + i] = weight;

		var saleunit = allRowsInGrid[i].saleunit;
		params["saleunit" + i] = saleunit;
		var unitvalue = allRowsInGrid[i].unitvalue;
		params["unitvalue" + i] = unitvalue;
		
		/*var duplicateQuantity = allRowsInGrid[i].dupQuantity1;
		params["duplicateQuantity" + i] = duplicateQuantity;*/
	}

	params["count"] = count;
	params["methodName"] = "returntMinusFromStockPurchase";

	$.post('/Shop/jsp/utility/controller.jsp', params, function(data) {
		alert(data);
		location.reload();

	}).error(function(jqXHR, textStatus, errorThrown) {
		if (textStatus === "timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});
}

function registerPurchaseReturn() {

	var params = {};

	var count = jQuery("#jqGrid").jqGrid('getGridParam', 'records');
	var allRowsInGrid = $('#jqGrid').getGridParam('data');// to get all rows
	// of grid
	var AllRows = JSON.stringify(allRowsInGrid);
	for (var i = 0; i < count; i++) {

		var pk_goods_receive_id = allRowsInGrid[i].pk_goods_receive_id;
		params["pk_goods_receive_id" + i] = pk_goods_receive_id;

		var dupQuantity = allRowsInGrid[i].dupQuantity;
		params["dupQuantity" + i] = dupQuantity;

		var product_name = allRowsInGrid[i].product_name;
		params["product_name" + i] = product_name;

		var company_Name = allRowsInGrid[i].company_Name;
		params["company_Name" + i] = company_Name;

		var weight = allRowsInGrid[i].weight;
		params["weight" + i] = weight;

		var duplicateQuantity = allRowsInGrid[i].dupQuantity1;
		params["duplicateQuantity" + i] = duplicateQuantity;

		var duplicateQuantity = allRowsInGrid[i].dupQuantity1;
		params["duplicateQuantity" + i] = duplicateQuantity;

		var duplicateQuantity = allRowsInGrid[i].dupQuantity1;
		params["duplicateQuantity" + i] = duplicateQuantity;

		var duplicateQuantity = allRowsInGrid[i].dupQuantity1;
		params["duplicateQuantity" + i] = duplicateQuantity;

		var duplicateQuantity = allRowsInGrid[i].dupQuantity1;
		params["duplicateQuantity" + i] = duplicateQuantity;

		var duplicateQuantity = allRowsInGrid[i].dupQuantity1;
		params["duplicateQuantity" + i] = duplicateQuantity;

		var duplicateQuantity = allRowsInGrid[i].dupQuantity1;
		params["duplicateQuantity" + i] = duplicateQuantity;

		var duplicateQuantity = allRowsInGrid[i].dupQuantity1;
		params["duplicateQuantity" + i] = duplicateQuantity;

		var duplicateQuantity = allRowsInGrid[i].dupQuantity1;
		params["duplicateQuantity" + i] = duplicateQuantity;

	}

	params["count"] = count;
	params["methodName"] = "returntMinusFromStockPurchase";

	$.post('/Shop/jsp/utility/controller.jsp', params, function(data)
			{
		alert(data);
		location.reload();

	}).error(function(jqXHR, textStatus, errorThrown) {
		if (textStatus === "timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});
}


/////Purchase Return Reports///////////

function supplierWisePurchaseReturnReportValidate()
{
	//alert("In purchase Report");
	//var purchaseReturnFisDate = $("#purchaseReturnFisDate").val();
	//var purchaseReturnEndDate = $("#purchaseReturnEndDate").val();
	var pr_fk_Supplier_Id= $("#pr_fk_Supplier_Id").val();
	//alert("Supplier id------------"+pr_fk_Supplier_Id);
	
	/*if(purchaseReturnFisDate != null && purchaseReturnFisDate !="")
		{
			if(purchaseReturnEndDate != null && purchaseReturnEndDate !="")
			{*/
				if(pr_fk_Supplier_Id!= null && pr_fk_Supplier_Id!= "")
				{
					supplierWisePurchaseReturnReport();
				}
				else
				{
					var msg="Please Select Supplier Name";
					var dialog = bootbox.dialog({
						//title: "Embel Technologies Says :",
					    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
					    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
					    closeButton: false
					});
					
					setTimeout(function() {
						dialog.modal('hide');
					}, 1500);
					/*alert("Please Select Supplier Name");*/
				}
			/*}
			else
				{
					alert("Please Enter End Date");
				}
			}
		else
		{
			alert("Please Enter Start Date");
		}*/
}

function supplierWisePurchaseReturnReport() {
	var params = {};

	var input11 = document.getElementById('pr_fk_Supplier_Id'),
	list1 = document.getElementById('sup_drop_Purchase_return'),
	i,fk_supplier_id;
	for (i = 0; i < list1.options.length; ++i) {
		if (list1.options[i].value === input11.value) {
			fk_supplier_id = list1.options[i].getAttribute('data-value');
		}
	}
	//var firstDate = $("#purchaseReturnFisDate").val();
	//var secondDate = $("#purchaseReturnEndDate").val();
	//var fkSupplierId_Purchase_Return = $("#fkSupplierId_Purchase_Return").val();
    //alert("supplier id-------"+fk_supplier_id );
	//params["supplier"] = fk_supplier_id_purchase_return;
	//params["firstDate"] = firstDate;
	//params["secondDate"] = secondDate;
	params["supplier"] = fk_supplier_id;
//	alert(fk_supplier_id);
	params["methodName"] = "getPurchaseReturnDetailsAsPerSupplier";

	$.post('/Shop/jsp/utility/controller.jsp', params, function(data) {

		$('#purchaseReturnTable').dataTable().fnClearTable();

		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		
		if(catmap == "" || catmap == null)
		{
			//alert("NO Purchase Return Report For\nStart Date = "+firstDate+"\nEnd Date = "+secondDate+"\nSupplier Name = "+fkSupplierId_Purchase_Return);
			alert("NO Purchase Return Report For\nSupplier Name = "+fkSupplierId_Purchase_Return);
			return false;
		}

		$(document).ready(function() {
			var total = $('#purchaseReturnTable').DataTable({


			    "bProcessing": true,
			    "sAutoWidth": false,
			    "bDestroy":true,
			    "sPaginationType": "bootstrap", // full_numbers
			    "iDisplayStart ": 10,
			    "iDisplayLength": 10,
			    "bPaginate": false, //hide pagination
			    //"bFilter": false, //hide Search bar
			    "bInfo": false, // hide showing entries
				
				fnRowCallback : function(nRow, aData, iDisplayIndex) {
					$("th:first", nRow).html(iDisplayIndex + 1);
					return nRow;
				},

				destroy : true,
				searching : false,
				"scrollY": 300,
		        "scrollX": true,
		        "paging":   false,

				columns : [ {
					"data" : "supplier",
					"width" : "5%"
				}, {
					"data" : "billNo",
					"width" : "5%"
				}, {
					"data" : "purchaseDate",
					"width" : "5%"
				}, {
					"data" : "productName",
					"width" : "5%"
				}, {
					"data" : "companyName",
					"width" : "5%"
				}, 
				
				/*{
					"data" : "dcNo",
					"width" : "5%"
				}, 
				*/
				
				{
					"data" : "taxPercentage",
					"width" : "5%"
				},
				
				{
					"data" : "batchNo",
					"width" : "5%"
				},{
					"data" : "barcodeNo",
					"width" : "5%"
				}, {
					"data" : "buyPrice",
					"width" : "5%"
				}, {
					"data" : "salePrice",
					"width" : "5%"
				}, /*{
					"data" : "mrp",
					"width" : "5%"
				},*/
				
				{
					"data" : "taxAmount",
					"width" : "5%"
				},
				{
					"data" : "weight",
					"width" : "5%"
				}, {
					"data" : "quantity2",
					"width" : "5%"
				}, {
					"data" : "returnQuantity",
					"width" : "5%"
				}, {
					"data" : "remainingQuantity",
					"width" : "5%"
				}, ],

				//dom : 'Bfrtip',
			    //buttons : [ 'copy', 'csv', 'excel', 'pdf', 'print' ],
				
				
				dom : 'Bfrtip',
				//buttons : [ 'copy', 'csv', 'excel', 'pdf', 'print' ],
				buttons : [
				           //'print',
				           				           
				           {	extend: 'print',
				        	    orientation: 'landscape',
				        	   	//title: 'Purchase Return Wise Purchase Report From '+firstDate+' to '+secondDate+'\n'+'Supplier Name = '+fkSupplierId_Purchase_Return,
				        	   	footer:true,
				        	   	pageSize: 'LEGAL' },
				           
			               { 	extend: 'copyHtml5',
				                orientation: 'landscape',
				        	   	//title: 'Purchase Return Wise Purchase Report From '+firstDate+' to '+secondDate+'\n'+'Supplier Name = '+fkSupplierId_Purchase_Return,
				                footer:true,
				                pageSize: 'LEGAL' },

				           { 	extend: 'excelHtml5',
				                orientation: 'landscape', 
				        	   	//title: 'Purchase Return Wise Purchase Report From '+firstDate+' to '+secondDate+'\n'+'Supplier Name = '+fkSupplierId_Purchase_Return,
				                //messageTop: 'Purchase Return Wise Purchase Report From '+firstDate+' to '+secondDate+'\n'+'Supplier Name = '+fkSupplierId_Purchase_Return,
				                footer:true,
				                pageSize: 'LEGAL' },
				                
				           { 	extend: 'csvHtml5',
				                orientation: 'landscape',
				        	   	//title: 'Purchase Return Wise Purchase Report From '+firstDate+' to '+secondDate+'\n'+'Supplier Name = '+fkSupplierId_Purchase_Return,
				                footer:true,
				                pageSize: 'LEGAL' },
				           
				               
				                
				           
						 //{ extend: 'copyHtml5', footer: true },
						 //{ extend: 'excelHtml5', footer: true },
						 //{ extend: 'csvHtml5', footer: true },
						 { extend: 'pdfHtml5',
				                orientation: 'landscape', 
				        	   	//title: 'Purchase Return Wise Purchase Report From '+firstDate+' to '+secondDate+'\n'+'Supplier Name = '+fkSupplierId_Purchase_Return,
				                //messageTop: 'Purchase Return Wise Purchase Report From '+firstDate+' to '+secondDate+'\n'+'Supplier Name = '+fkSupplierId_Purchase_Return,
				        	   	footer:true,
				                pageSize: 'LEGAL' } ]
				
				
			
			});
		});

		var mydata = catmap;
		$('#purchaseReturnTable').dataTable().fnAddData(mydata);

	}
);
	
	
}	


