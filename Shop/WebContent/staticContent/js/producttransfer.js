	function producttxDetailInGrid()
	{		
		var params = {};
		itemparams = {};
	
	
	var input1 = document.getElementById('proName1'),
	list   = document.getElementById('product_drop1'),
	         i,fk_cat_id, fk_subCat_id, productId, packweight, proName;

for (i = 0; i < list.options.length; ++i) {
	if (list.options[i].value === input1.value) {
		
		fk_cat_id    = list.options[i].getAttribute('myvalue1');
		fk_subCat_id = list.options[i].getAttribute('myvalue2');
		productId    = list.options[i].getAttribute('myvalue3');
		packweight   = list.options[i].getAttribute('myvalue4');
		proName      = list.options[i].getAttribute('myvalue5');
		pack      = list.options[i].getAttribute('myvalue6');
	}
}
	var shop_id = $('#shop_id').val();
	
	itemparams["proName"] = proName;
	itemparams["fk_cat_id"] = fk_cat_id;
	itemparams["fk_subCat_id"] = fk_subCat_id;
	itemparams["productId"] = productId;
	itemparams["packweight"] = packweight;
	itemparams["shop_id"] = shop_id;
	itemparams["pack"] = pack;
	//document.getElementById('proName1').value = null;

	var count = 0;
	var newrow;
	var rowId;
	var taxPercentage;
	
	itemparams["methodName"] = "getProductDetailstx";
	
	$.post('/Shop/jsp/utility/controller.jsp',itemparams,function(data) {
		
		var jsonData = $.parseJSON(data);
		
	    $.each(jsonData,function(i, v)
	    {		    
	    	
						$("#jqGrid").jqGrid({
							datatype : "local",
	
											colNames : [
												
													"pk_id",
													"Cat ID",
													"SubCatid",
													"Product ID",
													"Product<br>Name", 
													"Quantity",
													"Company",
													"Weight",
													"Unit",

													"Shop Name",
													"Shop ID",
													"Stock",
													"Packing"
													],
											
	
											colModel : [
													{
														name : "PkStockId",
														width : 120,
														hidden : true,
														align : 'center',
														editable : false,
													},
													{
														name : "catID",
														width : 120,
												//		hidden : true,
														align : 'center',
														editable : false,
													},
													{
														name : "subCatId",
														width : 120,
														align : 'center',
														editable : false,
													},
													{
														name : "productId",
														width : 100,
														align : 'center',
														editable : false,
													},
													{
														name : "productName",
														width : 100,
														align : 'center',
														editable : false,
													},
													{
														name : "QuantityTx",
														width : 100,
														align : 'center',
														editable : true,
													},
													{
														name : "companyName",
														width : 100,
														align : 'center',
														editable : false,
													},
													{
														name :"weight",
														width : 100,
														align : 'center',
														editable : false,
													},
													{
														name : 'unit',
														width : 120,
														align : 'center',
														editable : false,
													},
													{
														name : "shopName",
														width : 100,
														editable : false,
														align : 'center',
												//		hidden : true,
													},
													{
														name : "fk_shop_id",
														width : 100,
														editable : false,
														align : 'center',
													},
													{
														name : "quantity",
														width : 100,
														align : 'center',
														editable : false,
													},
													{
														name: "pack_type",
														width : 100,
														align : 'center',
														editable : false,
													},
													
											],
	
											sortorder : 'desc',
											loadonce : false,
											viewrecords : true,
											//width : 1400,
											shrinkToFit : true,
											hoverrows : true,
											rownumbers : true,
											rowNum : 10,
											'cellEdit' : true,
											autowidth : true,
											pgbuttons : false,
											pginput : false,
	
											afterSaveCell : function grossTotal() 
										    {
												//alert("In savecell");
										//		document.getElementById("discount").value = "";
										//		document.getElementById("discountAmount").value = "";
												
												/*Calculation of total after editing quantity*/
	
												// $(this).trigger('reloadGrid');
												var rowId = $("#jqGrid").jqGrid('getGridParam','selrow');
												var rowData = jQuery("#jqGrid").getRowData(rowId);
												var quant = rowData['QuantityTx'];
												var stock = rowData['quantity'];
												
																		
																			
									var checkQuantity = /^[0-9]+\.?[0-9]*$/;
										
										if (quant.match(checkQuantity)) 
										{
										if (+quant < +stock) 
										{
	
										}
										else {
										var msg = "Please Enter Quantity less than "+stock;
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
										$("#jqGrid").jqGrid("setCell",rowId,"QuantityTx",setZero);
	
										}
										}
										else {
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
											$("#jqGrid").jqGrid("setCell",rowId,"QuantityTx",setZero);
		
											}
										//////////Buy Price validation///////////
	
										
											
	                              //CGST and SGST and IGST Validation
										

										
			
	

	
												
												

												/*/////calculation of gst////
*/														
												
															
												  
												//Buy price excluding tax calc//
												  
											
												
												
												  //out of grid calc//
												
										
										      							        											
	
	
	
								
	
									         
	
	
	
											},
	
											viewrecords : true,
											width : 1200,
											rowNum : 10,
											pager : "#jqGridPager",
											sortorder : "desc",
											onSelectRow : function(productID) 
											{
												if (productID&& productID !== lastsel) 
												{
													jQuery('#jqGrid').jqGrid('restoreRow',lastsel);
													jQuery('#jqGrid').jqGrid('editRow',productID,true);
												 // jQuery('#jqGrid').jqGrid('editRow',productID,true,pickdates);
													lastsel = productID;
												}
											},
	
										});
	
						count = jQuery("#jqGrid").jqGrid('getGridParam', 'records');
						var rowdata = $("#jqGrid").jqGrid('getGridParam', 'data');
						var ids = jQuery("#jqGrid").jqGrid('getDataIDs');
	
						var catID, subCatId, productId;
						for (var j = 0; j < count; j++) 
						{
							catID = rowdata[j].catID;
							subCatId = rowdata[j].subCatId;
							productId = rowdata[j].productId;
							
							pack_type = rowdata[j].pack_type;
							weight = rowdata[j].weight;
							
							var rowId = ids[j];
							var rowData = jQuery('#jqGrid').jqGrid('getRowData',rowId);
	
						if (catID == jsonData[i].catID && subCatId == jsonData[i].subCatId && productId == jsonData[i].productId && weight==jsonData[i].weight && pack_type==jsonData[i].pack_type) 
						{	
							         newrow = false;
	                                             
							   //        var msg = "Product Name Already Inserted !!!";
/*							           var dialog = bootbox.dialog({
											
						          message : '<p class="text-center">'+ msg.fontcolor("red").fontsize(5)+ '</p>',
						          closeButton : false
										});
*/	
						//		   setTimeout(function() 
						//		   {
						//			dialog.modal('hide');
						//		    }, 1500);
	
								   var grid = jQuery("#jqGrid");
								   grid.trigger("reloadGrid");
								   break;
						}
						else 
							     {
								   newrow = true;
							     }
						      }
	
						if (newrow == true) 
						{
	
						 // $("#credit").addRowData(i,jsonData[i]);
							$("#jqGrid").addRowData(count,jsonData[i]);
	
						}
	
						// $("#jqGrid").addRowData(i,jsonData[i]);
						if (count == 0 || count == null) 
						{
							// $("#credit").addRowData(i,jsonData[i]);
							$("#jqGrid").addRowData(0,jsonData[i]);
						}
	
						// $("#jqGrid").addRowData(i,jsonData[i]);
						/*function pickdates(productID) 
						{
							jQuery("#" + productID+ "_expiryDate","#jqGrid").datepicker({
							dateFormat : "yyyy-mm-dd"
						});
						}*/
						/* jQuery("#jqGrid").jqGrid('navGrid',"#jqGridPager",{edit:false,add:false,del:true}); */
	
						$('#jqGrid')
								.navGrid(
										'#jqGridPager',
										// the buttons to
										// appear on the
										// toolbar of the
										// grid
										{
											edit : true,
											add : false,
											del : true,
											search : true,
											refresh : true,
											view : true,
											position : "left",
											cloneToTop : false,
										},
										// options for the
										// Edit Dialog
	
										{
	
											/*
											 * afterSaveCell:
											 * function () {
											 * $("#jqGrid").trigger('reloadGrid'); },
											 */
											editCaption : "The Edit Dialog",
											recreateForm : true,
											checkOnUpdate : true,
											checkOnSubmit : true,
											closeAfteredit : true,
											
	
											afterSubmit : function() {
												$('#jqGrid').trigger('reloadGrid');
											},
											errorTextFormat : function(data) 
											{
												return 'Error: '+ data.responseText
											}
	
										},
	
										{
	
										},
	
										// options for the
										// Delete Dialogue
										{
	
											// closeAfterdel:true,
											// recreateForm:
											// true,
											closeAfterdel : false,
											checkOnUpdate : true,
											checkOnSubmit : true,
											recreateForm : true,
	
											errorTextFormat : function(
													data) {
												return 'Error: '
														+ data.responseText
											},
	
											// change the
											// below
											// afterComplete
											// Method to
											// afterSubmit
											// if code work
											// unexpected {
											afterComplete : function() {
												
//												var total = document.getElementById("total").value;
//												document.getElementById("grossTotal").value = Number(total).toFixed(2);
//												document.getElementById("discount").value = "";
//												document.getElementById("discountAmount").value = "";
												/*document.getElementById("transExpence3").value = "";
												document.getElementById("hamaliExpence3").value = "";
												document.getElementById("transExpence").value = "";
												document.getElementById("hamaliExpence").value = "";*/
	
												$('#jqGrid').trigger('reloadGrid');
												/*
												 * Calculation
												 * of total
												 * after
												 * editing
												 * quantity
												 */
	
												// $(this).trigger('reloadGrid');
												var rowId = $("#jqGrid").jqGrid('getGridParam','selrow');
												var rowData = jQuery("#jqGrid").getRowData(rowId);
								//				var weight = rowData['weight'];
												/*var dcNum = rowData['dcNum'];*/
	
												/*if (dcNum >= 0) {
													var W = weight;
													var d = dcNum;
													var weightWithShortage = W
															- d;
													$("#jqGrid")
								                     .jqGrid("setCell",rowId,
																	"weightAftShortMinus",
																	weightWithShortage);
												}*/
	
									//			var quantity = rowData['quantity'];
									//			var buyPrice = rowData['buyPrice'];
									//			var iGst = rowData['igst1'];
									//			var cgst = rowData['cgst'];
									//			var sgst = rowData['sgst'];
									//			var Gst = +cgst+ +sgst;
	
/*												if (iGst != 0) {
													var taxPercentage = iGst;
													
													var tota = quantity	* buyPrice;
													
													$("#jqGrid").jqGrid("setCell",rowId,"Total",tota);
													
												} else if (iGst == 0) {													
													var taxPercentage = Number(Gst);
													
													var tota = quantity	* buyPrice;
													
													$("#jqGrid").jqGrid("setCell",rowId,"Total",tota);
	
												}
												*/
												var Total = 0;
												var count = jQuery("#jqGrid").jqGrid('getGridParam','records');
												
												var allRowsInGrid1 = $('#jqGrid').getGridParam('data');
												var AllRows = JSON.stringify(allRowsInGrid1);
	
												for (var k = 0; k < count; k++) 
												{
											//		var Total1 = allRowsInGrid1[k].Total;
											//		Total = +Total+ +Total1;
												}
	
										//	document.getElementById("total").value = Total.toFixed(2);
										//	document.getElementById("duptotal").value = Total.toFixed(2);
										//	document.getElementById("grossTotal").value = Total.toFixed(2);
	
											},
	
										onSelectRow : function(id) 
										{
											if (id&& id !== lastSel) 
											{
												jQuery("#jqGrid").saveRow(lastSel,true,'clientArray');
												jQuery("#jqGrid").editRow(id,true);
	
												lastSel = id;
												console.log(id);
												}
											},
										});
						
	
						// grid refresh code
	
						});
	
	});
	
	
	}
	
	function addproducttx(){
		
		var pro = $('#proName1').val();
		var shop = $('#shopName_id').val();
		
		
		/*if(pro=="" || pro==null || pro==undefined){
			alert("Please select product");
			return false;
		}*/
		
	if(document.goodsReceiveForm.proName1.value == "")
	{
		var msg="Please Enter Product Name";
		
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
	
				if(document.goodsReceiveForm.shopName_id.value == "")
	{
		var msg="Please Enter shopName Name";
		
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
	
		/*if(shop=="" || shop==null || shop==undefined){
			alert("Please select Shop Name");
			return false;
		}*/
		
		addproducttx1();
		/*addproducttx();*/
	}
	
	function addproducttx1()
	{
		
		var params = {};
		
		var count = jQuery("#jqGrid").jqGrid('getGridParam', 'records');
		var allRowsInGrid = $('#jqGrid').getGridParam('data');
		var AllRows=JSON.stringify(allRowsInGrid);

		for (var i = 0; i < count; i++)
		{
			
			var PkStockId = allRowsInGrid[i].PkStockId;
			params["PkStockId"+i] = PkStockId;

			var catID = allRowsInGrid[i].catID;
			params["catID"+i] = catID;
		
			var subCatId = allRowsInGrid[i].subCatId;			
			params["subCatId"+i] = subCatId;

			var productId = allRowsInGrid[i].productId;
			params["productId"+i] = productId;
			
			var productName = allRowsInGrid[i].productName;
			params["productName"+i] = productName;
			
			
			var QuantityTx = allRowsInGrid[i].QuantityTx;
			params["QuantityTx"+i] = QuantityTx;
		
			var companyName = allRowsInGrid[i].companyName;			
			params["companyName"+i] = companyName;

			var unit = allRowsInGrid[i].unit;
			params["unit"+i] = unit;
			
			var shopName = allRowsInGrid[i].shopName;
			params["shopName"+i] = shopName;
			
			
			var fk_shop_id = allRowsInGrid[i].fk_shop_id;			
			params["fk_shop_id"+i] = fk_shop_id;

			var quantity = allRowsInGrid[i].quantity;
			params["quantity"+i] = quantity;
			
			var weight = allRowsInGrid[i].weight;
			params["weight"+i] = weight;
			
			var pack_type = allRowsInGrid[i].pack_type;
			params["pack_type"+i] = pack_type;
						
		
		}
		
		
		
		
		var input = document.getElementById('shopName_id'), 
		list = document.getElementById('shopName'), 
		i, fkRootId;
		for (i = 0; i < list.options.length; ++i)
		{
			if (list.options[i].value === input.value) 
			{
				fkRootId = list.options[i].getAttribute('data-value');
			}
		}
		
				
			var shopNameTx = $('#shopName_id').val();


			
			params["shopNameTx"] = shopNameTx;
			params["fkshopIdTx"] = fkRootId;
			params["count"] = count;

			params["methodName"] = "addingproductTx";
		 	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
		 	    	{
			
			    var msg="Data Added successfully "
				var dialog = bootbox.dialog({
					
				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
				    closeButton: false
				});
				
				setTimeout(function() {
					dialog.modal('hide');
				}, 1500);	
				
				return false;
				
				document.getElementById("save").disabled = false;
				location.reload();
				
			
		 			}
		 	
		 		
		 	    	).error(function(jqXHR, textStatus, errorThrown){
		 	    		if(textStatus==="timeout") {
		 	    			$(loaderObj).hide();
		 	    			$(loaderObj).find('#errorDiv').show();
		 	    		}
		 	    	})

		
		
	}
	
	
	//
	
	
	function productDetailstock()
	{		
		var params = {};
		itemparams = {};
	
	
	var input1 = document.getElementById('proName1'),
	list   = document.getElementById('product_drop1'),
	         i,fk_cat_id, fk_subCat_id, productId, packweight, proName;

for (i = 0; i < list.options.length; ++i) {
	if (list.options[i].value === input1.value) {
		
		fk_cat_id    = list.options[i].getAttribute('myvalue1');
		fk_subCat_id = list.options[i].getAttribute('myvalue2');
		productId    = list.options[i].getAttribute('myvalue3');
		packweight   = list.options[i].getAttribute('myvalue4');
		proName      = list.options[i].getAttribute('myvalue5');
	}
}
	var shop_id = $('#shop_id').val();
	
	itemparams["proName"] = proName;
	itemparams["fk_cat_id"] = fk_cat_id;
	itemparams["fk_subCat_id"] = fk_subCat_id;
	itemparams["productId"] = productId;
	itemparams["packweight"] = packweight;
	itemparams["shop_id"] = shop_id;
	
//	document.getElementById('proName1').value = null;

	$("#stock").append($("<input/>").attr("value","").text());
	$("#pkid").append($("<input/>").attr("value","").text());
	$("#unit").append($("<input/>").attr("value","").text());
	
	var count = 0;
	var newrow;
	var rowId;
	var taxPercentage;
	
	itemparams["methodName"] = "getProductstock";
	
	$.post('/Shop/jsp/utility/controller.jsp',itemparams,function(data) {
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		$.each(jsonData,function(i,v)
				{
			      document.getElementById("stock").value = v.quantity;
			      document.getElementById("pkid").value = v.PkStockId;
			      document.getElementById("unit").value = v.unit;
			      
				});
			}).error(function(jqXHR, textStatus, errorThrown){
				if(textStatus==="timeout") {

				}
			});
	
}
	
	
	//
	function addpacking(){
		
		var proName = $('#proName1').val();
		var weight = $('#weight').val();
		var packunit = $('#packunit').val();
		var packquantity = $('#packing').val();
		
		/*if(proName=="" || proName==null || proName==undefined){
			alert("Please select product Name");
			return false;
		}*/
			if(proName=="" || proName==null || proName==undefined)
	{
		var msg="Please select product Name";
		
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
		
		
		/*if(weight=="" || weight==null || weight==undefined){
			alert("Please Enter Weight of Product");
			return false;
		}*/
		if(weight=="" || weight==null || weight==undefined)
	{
		var msg="Please Enter Weight of Product";
		
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
		
		/*if(packunit=="" || packunit==null || packunit==undefined){
			alert("Please select unit for packing");
			return false;
		}*/
		if(packunit=="" || packunit==null || packunit==undefined)
	{
		var msg="Please select unit for packing";
		
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
		
		/*if(packquantity=="" || packquantity==null || packquantity==undefined){
			alert("Please enter packing quantity");
			return false;
		}*/
			if(packquantity=="" || packquantity==null || packquantity==undefined)
	{
		var msg="Please enter packing quantity";
		
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
		
		addpacking1();
	}
	
	function addpacking1()
	{
		
		var params = {};
		itemparams = {};
	
	
		var input11 = document.getElementById('proName1'),
		listt   = document.getElementById('product_drop1'),
		         i,fk_cat_id1, fk_subCat_id1, productId1, packweight1, proName1;

	for (i = 0; i < listt.options.length; ++i) {
		if (listt.options[i].value === input11.value) {
			
			fk_cat_id1    = listt.options[i].getAttribute('myvalue1');
			fk_subCat_id1 = listt.options[i].getAttribute('myvalue2');
			productId1    = listt.options[i].getAttribute('myvalue3');
			packweight1   = listt.options[i].getAttribute('myvalue4');
			proName1      = listt.options[i].getAttribute('myvalue5');
		}
	}

	
var weight = $('#weight').val();
var packunit = $('#packunit').val();
var packquantity = $('#packing').val();
var packquankg = $('#packquan').val();

var msg="Data Loaded Successfully";

var stock = $('#stock').val();
var stckid = $('#pkid').val();

params["weight"] = weight;
params["packunit"] = packunit;
params["packquantity"] = packquantity;
params["packquankg"] = packquankg;

params["stock"] = stock;
params["stckid"] = stckid;


params["proName"] = proName1;
params["fk_cat_id"] = fk_cat_id1;
params["fk_subCat_id"] = fk_subCat_id1;
params["productId"] = productId1;
params["packweight"] = packweight1;


		
			params["methodName"] = "addpacking";
		 	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
		 	    	{
				 		/*alert(data)
				 		location.reload();*/
		 		
		 		
		 		
		 		/*var msg=data;*/
				var dialog = bootbox.dialog({
			    message: '<p class="text-center">'+msg.fontcolor("green").fontsize(5)+'</p>',
			   
			    closeButton: false
				});
								
				setTimeout(function() {
					dialog.modal('hide');
					location.reload();
				}, 1500);
					
					document.getElementById("save").disabled = false;
		 			document.spld.btn.disabled =false;
				
		 		
		 		
		 		
		 		
		 		
				
		 			}
		 		
		 	    	).error(function(jqXHR, textStatus, errorThrown){
		 	    		if(textStatus==="timeout") {
		 	    			$(loaderObj).hide();
		 	    			$(loaderObj).find('#errorDiv').show();
		 	    		}
		 	    	})

		
		
	}