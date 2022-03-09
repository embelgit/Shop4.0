	function fetchproductname()
	{
		var input1 = document.getElementById('fk_cat_id'), list = document
	.getElementById('cat_drop'), i, fk_cat_id;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input1.value) {
			fk_cat_id = list.options[i].getAttribute('data-value');
		}
	}
	
	var fk_cat_id = fk_cat_id;
	$("#proName").empty();
	$("#proName").append(
	$("<option></option>").attr("value", "").text("Select product"));
	var params = {};
	
	params["methodName"] = "getAllProductByCategoriesForAdvance";
	
	params["fk_cat_id"] = fk_cat_id;
	
	$.post(
			'/Shop/jsp/utility/controller.jsp',
	params,
	function(data) {
		var count = 1;
	
		var jsonData = $.parseJSON(data);
		$.each(jsonData, function(i, v) {
			$("#proName").append(
		$("<option></option>").attr("value", count).text(
				v.product + "," + v.manufacturer + ","
						+ v.weight));
	// $("#batchNo").append($("<option></option>").attr("value",v.batchNo).text("Batch
	// No = "+v.batchNo + " " +" Stock = "+ v.quantityForBatchNo
	// ));
				count++;
			});
		}).error(function(jqXHR, textStatus, errorThrown) {
	if (textStatus === "timeout") {
	
			}
		});
	
	}
	
	function getAllProduct() {
	
		var input1 = document.getElementById('fk_cat_id'), list = document
	.getElementById('cat_drop'), i, fk_cat_id;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input1.value) {
			fk_cat_id = list.options[i].getAttribute('data-value');
		}
	}
	
	var fk_cat_id = fk_cat_id;
	$("#proName").empty();
	$("#proName").append(
	$("<option></option>").attr("value", "").text("Select product"));
	var params = {};
	
	params["methodName"] = "getAllProductByCategories";
	
	params["fk_cat_id"] = fk_cat_id;
	
	$.post(
			'/Shop/jsp/utility/controller.jsp',
	params,
	function(data) {
		var jsonData = $.parseJSON(data);
		$.each(jsonData, function(i, v) {
			$("#proName").append(
		$("<option></option>").attr("value", i).text(
								v.product));
	
			});
		}).error(function(jqXHR, textStatus, errorThrown) {
	if (textStatus === "timeout") {
	
			}
		});
	
	}
	
	function getAllProductForBooked() {
	
		var input1 = document.getElementById('fk_cat_id1'), list = document
	.getElementById('cat_drop1'), i, fk_cat_id;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input1.value) {
			fk_cat_id = list.options[i].getAttribute('data-value');
		}
	}
	
	var input1 = document.getElementById('supplier1'), list = document
	.getElementById('sup_drop1'), i, fk_sup_id;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input1.value) {
			fk_sup_id = list.options[i].getAttribute('data-value');
		}
	}
	
	var fk_cat_id = fk_cat_id;
	var fk_sup_id = fk_sup_id;
	$("#proName1").empty();
	$("#proName1").append(
	$("<option></option>").attr("value", "").text("Select product"));
	var params = {};
	
	params["methodName"] = "getAllProductByCategoriesAndBySupplierForBookedGoodsReceiveNew";
	
	params["fk_cat_id"] = fk_cat_id;
	params["fk_sup_id"] = fk_sup_id;
	
	$.post(
			'/Shop/jsp/utility/controller.jsp',
	params,
	function(data) {
		var count = 1;
		var jsonData = $.parseJSON(data);
		$.each(jsonData, function(i, v) {
			$("#proName1").append(
		$("<option></option>").attr("value", count).text(
				v.product + "," + v.manufacturer + ","
						+ v.weight + "," + v.unitName));
				count++;
			});
		}).error(function(jqXHR, textStatus, errorThrown) {
	if (textStatus === "timeout") {
	
			}
		});
	
	}
	
	function prodetail() {
	
		var itemparams = {};
		var productId = $('#proName').val();
	
	itemparams["productId"] = productId;
	itemparams["methodName"] = "getpreviousDetsil";
	
	$.post(
			'/Shop/jsp/utility/controller.jsp',
	itemparams,
	function(data) {
		var jsonData = $.parseJSON(data);
		$.each(jsonData, function(i, v) {
			// $("#proName").append($("<option></option>").attr("value",i).text(v.product));
	
	alert("Previous Purchase Detail Of " + v.productName
		+ "\nProduct" + "\n\n\nProduct Name : "
		+ v.productName + "\nBuy Price    : " + v.buyPrice
		+ "\nSale Price   : " + v.salePrice
		+ "\nQuantity     : " + v.quantity
		+ "\nWeight       : " + v.weight
		+ "\nMRP          : " + v.mrp);
	
			});
		}).error(function(jqXHR, textStatus, errorThrown) {
	if (textStatus === "timeout") {
	
			}
		});
	
	}
	
	function getdetails() {
	
		var productList = "";
	this.getProductdetails = getProductdetails;
	this.getAllProductDetailsForBooked = getAllProductDetailsForBooked;
	
	function getProductdetails() {
		// Grid for Retail if it is checked
	if (document.getElementById('retail').checked) {
	jQuery("#jqGrid").trigger('reloadGrid');
	
	var params = {};
	var itemparams = {};
	var productId = $('#proName').val();
	
	itemparams["productId"] = productId;
	itemparams["methodName"] = "getProductDetailsPO";
	$
			.post(
					'/Shop/jsp/utility/controller.jsp',
		itemparams,
		function(data) {
			var jsonData = $.parseJSON(data);
	
			function sumFmatter(cellvalue, options,
					rowObject) {
	
				var jam = 0;
				var jam1 = "";
				var tot = (options.rowData.quantity * options.rowData.buyPrice);
				// var shree =
				// document.poferti.grossTotal.value;// to
				// get gross total
	
				var count = jQuery("#jqGrid").jqGrid(
						'getGridParam', 'records');
				var allRowsInGrid1 = $('#jqGrid')
						.getGridParam('data');
				var AllRows = JSON
						.stringify(allRowsInGrid1);
				for (var i = 0; i < count; i++) {
	
					var quantity = allRowsInGrid1[i].quantity;
					params["quantity" + i] = quantity;
	
					var buyPrice = allRowsInGrid1[i].buyPrice;
					params["buyPrice" + i] = buyPrice;
	
					var totals1 = ((buyPrice) * (quantity));
	
					jam = jam + totals1;
	
				}
				if (count == 0) {
					document.getElementById("total").value = tot;
				} else {
					document.getElementById("total").value = jam;
				}
				// to check whether bill is with or without
				// VAT
				if (document.getElementById('retail').checked) {
	
					/*
					 * Gross total calculation without VAT
					 * for cash customer
					 */
					var expence = document
							.getElementById("extraExpence").value;
					totalWithExpence = Number(jam)
							+ Number(expence);
					var discount = $('#discount').val();
					var discountAmount = ((discount / 100) * totalWithExpence);
					var totalminusDiscount = totalWithExpence
							- discountAmount;
					document
							.getElementById("discountAmount").value = discountAmount;
	
					document.getElementById("grossTotal").value = totalminusDiscount;
	
					return tot;
				}
	
				else {
					/*
					 * Gross total calculation with VAT for
					 * cash customer
					 */
					/* Vat Amount calculation */
					var expence = document
							.getElementById("extraExpence").value;
					totalWithExpence = Number(jam)
							+ Number(expence);
					var discount = $('#discount').val();
					var discountAmount = ((discount / 100) * totalWithExpence);
					var totalminusDiscount = totalWithExpence
							- discountAmount;
					document
							.getElementById("discountAmount").value = discountAmount;
	
					document.getElementById("grossTotal").value = totalminusDiscount;
	
					return tot;
				}
			}
	
			$
					.each(
							jsonData,
							function(i, v) {
	
								$("#jqGrid")
										.jqGrid(
												{
	
													datatype : "local",
	
													colNames : [
															"Product ID",
															"Product Name",
															"Buy Price",
															"M.R.P",
															"Sale Price",
															"Packing",
															"Quantity",
															"Total",
															"BatchNo",
															"ExpiryDate" ],
	
													colModel : [
															{
																name : "productID",
																hidden : true
															// resizable:
															// true,
	
															},
															{
																name : "productName",
																width : 100,
	
															},
															{
																name : "buyPrice",
																width : 140,
																editable : true
															},
															{
																name : "mrp",
																width : 140,
																editable : true
															},
	
															{
																name : "salePrice",
																width : 140,
																editable : true
															},
	
															{
																name : "weight",
																width : 100,
	
															},
	
															{
																name : "quantity",
																width : 140,
																editable : true
	
															},
	
															{
																name : 'Total',
																// name:
																// "",
																formatter : sumFmatter,
																width : 150,
	
															},
															{
																label : 'batchNo',
																name : "batchNo",
																width : 150,
																editable : true,
	
															},
															{
																label : 'expiryDate',
																name : "expiryDate",
																index : 'Date',
																width : 200,
																editable : true,
																edittype : "text",
																editrules : {
																	date : true,
																	minValue : 0
																},
																datefmt : 'Y-m-d',
																editoptions : {
																	dataInit : function(
																			elem) {
																		$(
																				elem)
																				.datepicker(
																						{
																							dateFormat : "yy-mm-dd"
																						});
																	}
																}
															} ],
	
													sortorder : 'desc',
	
													multiselect : false,
													loadonce : false,
													rownumbers : true,
													'cellEdit' : true,
													afterSaveCell : function grossTotal() {
														/*
														 * Calculation
														 * of
														 * total
														 * after
														 * editing
														 * quantity
														 */
	
														// $(this).trigger('reloadGrid');
														var rowId = $(
																"#jqGrid")
																.jqGrid(
																		'getGridParam',
																		'selrow');
														var rowData = jQuery(
																"#jqGrid")
																.getRowData(
																		rowId);
														var quantity = rowData['quantity'];
														var buyPrice = rowData['buyPrice'];
	
														var tota = quantity* buyPrice;
														$(
																"#jqGrid")
																.jqGrid(
																		"setCell",
																		rowId,
																		"Total",
																		tota);
													},
	
													viewrecords : true,
													width : 1200,
													height : 250,
													rowNum : 10,
													pager : "#jqGridPager",
													sortorder : "desc",
													onSelectRow : function(
															productID) {
														if (productID
																&& productID !== lastsel) {
															jQuery(
																	'#jqGrid')
																	.jqGrid(
																			'restoreRow',
																			lastsel);
															jQuery(
																	'#jqGrid')
																	.jqGrid(
																			'editRow',
																			productID,
																			true);
															// jQuery('#jqGrid').jqGrid('editRow',productID,true,pickdates);
															lastsel = productID;
														}
													},
	
												});
	
								$("#jqGrid").addRowData(i,
										jsonData[i]);
								function pickdates(
										productID) {
									jQuery(
											"#"
													+ productID
													+ "_expiryDate",
											"#jqGrid")
											.datepicker(
													{
														dateFormat : "yyyy-mm-dd"
													});
								}
								/* jQuery("#jqGrid").jqGrid('navGrid',"#jqGridPager",{edit:false,add:false,del:true}); */
	
								$('#jqGrid')
										.navGrid(
												'#jqGridPager',
												// the
												// buttons
												// to appear
												// on the
												// toolbar
												// of the
												// grid
												{
													edit : true,
													add : false,
													del : true,
													search : true,
													refresh : true,
													view : true,
													position : "left",
													cloneToTop : false
												},
												// options
												// for the
												// Edit
												// Dialog
	
												{
	
													afterSaveCell : function() {
														$(
																this)
																.trigger(
																		'reloadGrid');
													},
													editCaption : "The Edit Dialog",
													recreateForm : true,
													checkOnUpdate : true,
													checkOnSubmit : true,
													closeAfteredit : true,
													errorTextFormat : function(
															data) {
														return 'Error: '
																+ data.responseText
													}
	
												},
	
												// options
												// for the
												// Delete
												// Dialogue
												{
													closeAfterdel : true,
													recreateForm : true,
													errorTextFormat : function(
															data) {
														return 'Error: '
																+ data.responseText
													},
	
													onSelectRow : function(
															id) {
														if (id
																&& id !== lastSel) {
															jQuery(
																	"#jqGrid")
																	.saveRow(
																			lastSel,
																			true,
																			'clientArray');
															jQuery(
																	"#jqGrid")
																	.editRow(
																			id,
																			true);
	
															lastSel = id;
															console
																	.log(id);
														}
													}
	
												});
	
								// grid refresh code
	
											});
	
						});
	
	}
	
	// Grid for Tax if retail is not checked
	else if (document.getElementById('vat').checked) {
	
	jQuery("#jqGrid").trigger('reloadGrid');
	
	var params = {};
	itemparams = {};
	productId = $('#proName').val();
	
	itemparams["productId"] = productId;
	itemparams["methodName"] = "getProductDetailsForGoodsReceiveForTax";
	$
			.post(
					'/Shop/jsp/utility/controller.jsp',
		itemparams,
	
		function(data) {
			var jsonData = $.parseJSON(data);
	
			function sumFmatter(cellvalue, options,
					rowObject) {
				var jam = 0;
				var jam1 = "";
				var tot = ((options.rowData.quantity) * ((options.rowData.buyPrice) + ((options.rowData.taxPercentage / 100) * options.rowData.buyPrice)));
				// var shree =
				// document.poferti.grossTotal.value;// to
				// get gross total
	
				var count = jQuery("#jqGrid").jqGrid(
						'getGridParam', 'records');
				var allRowsInGrid1 = $('#jqGrid')
						.getGridParam('data');
				var AllRows = JSON
						.stringify(allRowsInGrid1);
				for (var i = 0; i < count; i++) {
	
					var quantity = allRowsInGrid1[i].quantity;
					params["quantity" + i] = quantity;
	
					var buyPrice = allRowsInGrid1[i].buyPrice;
					params["buyPrice" + i] = buyPrice;
	
					var taxPercentage = allRowsInGrid1[i].taxPercentage;
					params["taxPercentage" + i] = taxPercentage;
	
					var taxAmount = ((taxPercentage / 100) * buyPrice);
	
					var priceWithTaxamount = taxAmount + buyPrice;
	
					var totals1 = ((priceWithTaxamount) * (quantity));
	
					jam = jam + totals1;
	
					document.getElementById("total").value = jam;
				}
				if (count == 0) {
					document.getElementById("total").value = tot;
				} else {
					document.getElementById("total").value = jam;
				}
	
				// to check whether bill is with or without
				// VAT
				if (document.getElementById('retail').checked) {
	
					/*
					 * Gross total calculation without VAT
					 * for cash customer
					 */
					var expence = document
							.getElementById("extraExpence").value;
					totalWithExpence = Number(jam)
							+ Number(expence);
					var discount = $('#discount').val();
					var discountAmount = ((discount / 100) * totalWithExpence);
					var totalminusDiscount = totalWithExpence
							- discountAmount;
					document
							.getElementById("discountAmount").value = discountAmount;
	
					document.getElementById("grossTotal").value = totalminusDiscount;
	
					return tot;
				}
	
				else {
					/*
					 * Gross total calculation with VAT for
					 * cash customer
					 */
					/* Vat Amount calculation */
					var expence = document
							.getElementById("extraExpence").value;
					totalWithExpence = Number(jam)
							+ Number(expence);
					var discount = $('#discount').val();
					var discountAmount = ((discount / 100) * totalWithExpence);
					var totalminusDiscount = totalWithExpence
							- discountAmount;
					document
							.getElementById("discountAmount").value = discountAmount;
	
					document.getElementById("grossTotal").value = totalminusDiscount;
	
					return tot;
				}
			}
	
			$
					.each(
							jsonData,
							function(i, v) {
	
								var productName = v.productName;
								var buyPrice = v.buyPrice;
								var salePrice = v.salePrice;
								var quantity = v.quantity;
								var weight = v.weight;
								var productID = v.productID;
								var lastsel = productID;
	
								$("#jqGrid")
										.jqGrid(
												{
	
													datatype : "local",
	
													colNames : [
															"Product ID",
															"Product Name",
															"Buy Price",
															"Tax %",
															"M.R.P",
															"Sale Price",
															"Packing",
															"Quantity",
															"Total",
															"BatchNo",
															"ExpiryDate" ],
	
													colModel : [
															{
																name : "productID",
																hidden : true
															// resizable:
															// true,
	
															},
															{
																name : "productName",
																width : 100,
	
															},
															{
																name : "buyPrice",
																width : 120,
																editable : true
															},
															{
																name : "taxPercentage",
																width : 140,
																editable : true
															},
															{
																name : "mrp",
																width : 140,
																editable : true
															},
															{
																name : "salePrice",
																width : 140,
																editable : true
															},
	
															{
																name : "weight",
																width : 100,
	
															},
	
															{
																name : "quantity",
																width : 120,
																editable : true
	
															},
	
															{
																name : 'Total',
																// name:
																// "",
																formatter : sumFmatter,
																width : 150,
	
															},
															{
																label : 'batchNo',
																name : "batchNo",
																width : 150,
																editable : true,
	
															},
															{
																label : 'expiryDate',
																name : "expiryDate",
																index : 'Date',
																width : 200,
																editable : true,
																edittype : "text",
																editrules : {
																	date : true,
																	minValue : 0
																},
																datefmt : 'Y-m-d',
																editoptions : {
																	dataInit : function(
																			elem) {
																		$(
																				elem)
																				.datepicker(
																						{
																							dateFormat : "yy-mm-dd"
																						});
																	}
																}
															} ],
	
													sortorder : 'desc',
	
													multiselect : false,
													loadonce : false,
													rownumbers : true,
													'cellEdit' : true,
													afterSaveCell : function grossTotal() {
														/*
														 * Calculation
														 * of
														 * total
														 * after
														 * editing
														 * quantity
														 */
	
														// $(this).trigger('reloadGrid');
														var rowId = $(
																"#jqGrid")
																.jqGrid(
																		'getGridParam',
																		'selrow');
														var rowData = jQuery(
																"#jqGrid")
																.getRowData(
																		rowId);
														var quantity = rowData['quantity'];
														var buyPrice = rowData['buyPrice'];
														var taxPercentage = rowData['taxPercentage'];
														var taxAmount = ((taxPercentage / 100) * buyPrice);
														var BuyPriceWithTaxAmount = taxAmount
																+ buyPrice;
														var tota = quantity
																* BuyPriceWithTaxAmount;
														$(
																"#jqGrid")
																.jqGrid(
																		"setCell",
																		rowId,
																		"Total",
																		tota);
													},
	
													viewrecords : true,
													width : 1200,
													height : 250,
													rowNum : 10,
													pager : "#jqGridPager",
													sortorder : "desc",
													onSelectRow : function(
															productID) {
														if (productID
																&& productID !== lastsel) {
															jQuery(
																	'#jqGrid')
																	.jqGrid(
																			'restoreRow',
																			lastsel);
															jQuery(
																	'#jqGrid')
																	.jqGrid(
																			'editRow',
																			productID,
																			true);
															// jQuery('#jqGrid').jqGrid('editRow',productID,true,pickdates);
															lastsel = productID;
														}
													},
	
												});
	
								$("#jqGrid").addRowData(i,
										jsonData[i]);
								function pickdates(
										productID) {
									jQuery(
											"#"
													+ productID
													+ "_expiryDate",
											"#jqGrid")
											.datepicker(
													{
														dateFormat : "yyyy-mm-dd"
													});
								}
								/* jQuery("#jqGrid").jqGrid('navGrid',"#jqGridPager",{edit:false,add:false,del:true}); */
	
								$('#jqGrid')
										.navGrid(
												'#jqGridPager',
												// the
												// buttons
												// to appear
												// on the
												// toolbar
												// of the
												// grid
												{
													edit : true,
													add : false,
													del : true,
													search : true,
													refresh : true,
													view : true,
													position : "left",
													cloneToTop : false
												},
												// options
												// for the
												// Edit
												// Dialog
	
												{
	
													afterSaveCell : function() {
														$(
																this)
																.trigger(
																		'reloadGrid');
													},
													editCaption : "The Edit Dialog",
													recreateForm : true,
													checkOnUpdate : true,
													checkOnSubmit : true,
													closeAfteredit : true,
													errorTextFormat : function(
															data) {
														return 'Error: '
																+ data.responseText
													}
	
												},
	
												// options
												// for the
												// Delete
												// Dialogue
												{
													closeAfterdel : true,
													recreateForm : true,
													errorTextFormat : function(
															data) {
														return 'Error: '
																+ data.responseText
													},
	
													onSelectRow : function(
															id) {
														if (id
																&& id !== lastSel) {
															jQuery(
																	"#jqGrid")
																	.saveRow(
																			lastSel,
																			true,
																			'clientArray');
															jQuery(
																	"#jqGrid")
																	.editRow(
																			id,
																			true);
	
															lastSel = id;
															console
																	.log(id);
														}
													}
	
												});
	
								// grid refresh code
	
												});
	
							});
	
		}
	
	}
	
	/** ************** Grid for Booked Goods Receive new ******* */
	
	function getAllProductDetailsForBooked() {
	
		/*
	 * //Grid for Retail if it is checked if
	 * (document.getElementById('retail1').checked) {
	 * jQuery("#jqGrid1").trigger('reloadGrid');
	 * 
	 * var input1 = document.getElementById('fk_cat_id1'), list =
	 * document.getElementById('cat_drop1'), i,fk_cat_id; for (i = 0; i <
	 * list.options.length; ++i) { if (list.options[i].value ===
	 * input1.value) { fk_cat_id =
	 * list.options[i].getAttribute('data-value'); } }
	 * 
	 * var input1 = document.getElementById('supplier1'), list =
	 * document.getElementById('sup_drop1'), i,fk_sup_id; for (i = 0; i <
	 * list.options.length; ++i) { if (list.options[i].value ===
	 * input1.value) { fk_sup_id =
	 * list.options[i].getAttribute('data-value'); } }
	 * 
	 * var fk_cat_id = fk_cat_id; var fk_sup_id = fk_sup_id;
	 * 
	 * var params= {}; itemparams={}; productId = $('#proName1').val();
	 * 
	 * $("#proName1 option:selected").each(function() { selectedVal =
	 * $(this).text(); });
	 * 
	 * var splitText = selectedVal.split(",");
	 * 
	 * var proName = splitText[0]; var company = splitText[1]; var weight =
	 * splitText[2];
	 * 
	 * itemparams["proName"]= proName; itemparams["company"]= company;
	 * itemparams["weight"]= weight;
	 * 
	 * itemparams["fk_cat_id"]= fk_cat_id; itemparams["fk_sup_id"]=
	 * fk_sup_id;
	 * 
	 * var count=0; var newrow; var rowId;
	 * 
	 * itemparams["methodName"] =
	 * "getbookedProductDetailsForGoodsReceiveNew";
	 * $.post('/Fertilizer/jsp/utility/controller.jsp',itemparams,
	 * 
	 * 
	 * function(data) { var jsonData = $.parseJSON(data);
	 * 
	 * 
	 * 
	 * function sumFmatter (cellvalue, options, rowObject) {
	 * 
	 * 
	 * 
	 * var jam=0; var jam1=""; var tot= (options.rowData.quantity *
	 * options.rowData.buyPrice); //var shree =
	 * document.poferti.grossTotal.value;// to get gross total
	 * 
	 * var count = jQuery("#jqGrid1").jqGrid('getGridParam', 'records'); var
	 * allRowsInGrid1 = $('#jqGrid1').getGridParam('data'); var
	 * AllRows=JSON.stringify(allRowsInGrid1); for (var i = 0; i < count;
	 * i++) {
	 * 
	 * var quantity = allRowsInGrid1[i].quantity; params["quantity"+i] =
	 * quantity;
	 * 
	 * var buyPrice = allRowsInGrid1[i].buyPrice; params["buyPrice"+i] =
	 * buyPrice;
	 * 
	 * 
	 * var totals1=((buyPrice)*(quantity));
	 * 
	 * jam = jam + totals1;
	 * 
	 *  } if(count == 0){ document.getElementById("total1").value = tot;
	 * }else{ document.getElementById("total1").value = jam;
	 *  }
	 * 
	 * 
	 * return tot;
	 *  }
	 * 
	 * 
	 * 
	 * 
	 * 
	 * $.each(jsonData,function(i,v) {
	 * 
	 * $("#jqGrid1").jqGrid({
	 * 
	 * 
	 * 
	 * datatype:"local",
	 * 
	 * colNames: ["Product ID","Product Name","Company","Buy
	 * Price","M.R.P","Sale
	 * Price","Packing","Quantity","Total","BatchNo","ExpiryDate" ],
	 * 
	 * colModel: [ { name: "productID", hidden:true //resizable: true, }, {
	 * name: "productName", width:120,
	 *  }, { name: "manufacturer", width:120
	 *  }, { name: "buyPrice", width: 140, editable: true }, { name: "mrp",
	 * width: 140, editable: true }, { name: "salePrice", width: 140,
	 * editable: true },
	 *  { name: "weight", width: 100,
	 *  },
	 *  { name: "quantity", width: 140, editable: true
	 * 
	 *  },
	 *  { name : 'Total', // name: "", formatter: sumFmatter, width: 150,
	 *  }, { label : 'batchNo', name: "batchNo", width: 150, editable:true,
	 * 
	 *  }, { label : 'expiryDate', name: "expiryDate", index:'Date', width:
	 * 200, editable:true, edittype:"text", editrules:{date:true,
	 * minValue:0}, datefmt:'Y-m-d', editoptions:{dataInit: function (elem)
	 * {$(elem).datepicker({dateFormat:"yy-mm-dd"});} } } ],
	 * 
	 * 
	 * sortorder : 'desc',
	 * 
	 * multiselect: false, loadonce: false, rownumbers:true,
	 * 'cellEdit':true, afterSaveCell: function grossTotal() { Calculation
	 * of total after editing quantity
	 *  // $(this).trigger('reloadGrid'); var rowId
	 * =$("#jqGrid1").jqGrid('getGridParam','selrow'); var rowData =
	 * jQuery("#jqGrid1").getRowData(rowId); var quantity =
	 * rowData['quantity']; var buyPrice = rowData['buyPrice'];
	 * 
	 * var tota = quantity * buyPrice; $("#jqGrid1").jqGrid("setCell",
	 * rowId, "Total", tota); },
	 * 
	 * 
	 * 
	 * 
	 * viewrecords: true, width: 1200, height: 250, rowNum: 10, pager:
	 * "#jqGridPager1", sortorder: "desc", onSelectRow: function(productID){
	 * if(productID && productID!==lastsel){
	 * jQuery('#jqGrid1').jqGrid('restoreRow',lastsel);
	 * jQuery('#jqGrid1').jqGrid('editRow',productID,true);
	 * //jQuery('#jqGrid').jqGrid('editRow',productID,true,pickdates);
	 * lastsel=productID; } },
	 * 
	 * });
	 * 
	 * count = jQuery("#jqGrid1").jqGrid('getGridParam', 'records'); var
	 * rowdata =$("#jqGrid1").jqGrid('getGridParam','data'); var ids =
	 * jQuery("#jqGrid1").jqGrid('getDataIDs');
	 * 
	 * 
	 * var prodName,com,packing; for (var j = 0; j < count; j++) { prodName =
	 * rowdata[j].productName; com = rowdata[j].manufacturer; packing =
	 * rowdata[j].weight;
	 * 
	 * var rowId = ids[j]; var rowData = jQuery('#jqGrid1').jqGrid
	 * ('getRowData', rowId);
	 * 
	 * if (prodName == jsonData[i].productName && com ==
	 * jsonData[i].manufacturer && packing == jsonData[i].weight) {
	 * 
	 * newrow=false; alert("Product Name Already Inserted !!!"); var grid =
	 * jQuery("#jqGrid1"); grid.trigger("reloadGrid"); break; } else {
	 * newrow = true; } }
	 * 
	 * if(newrow == true) {
	 *  // $("#credit").addRowData(i,jsonData[i]);
	 * $("#jqGrid1").addRowData(count,jsonData[i]);
	 *  }
	 * 
	 * if(count==0 || count==null) { //
	 * $("#credit").addRowData(i,jsonData[i]);
	 * $("#jqGrid1").addRowData(0,jsonData[i]); }
	 * //$("#jqGrid1").addRowData(i,jsonData[i]); function
	 * pickdates(productID){
	 * jQuery("#"+productID+"_expiryDate","#jqGrid1").datepicker({dateFormat:"yy-mm-dd"}); }
	 * jQuery("#jqGrid").jqGrid('navGrid',"#jqGridPager",{edit:false,add:false,del:true});
	 * 
	 * 
	 * 
	 * $('#jqGrid1').navGrid('#jqGridPager1', // the buttons to appear on
	 * the toolbar of the grid {edit: true, add: false,del: true, search:
	 * true, refresh: true, view: true, position: "left", cloneToTop: false }, //
	 * options for the Edit Dialog
	 * 
	 * 
	 * 
	 * 
	 *  {
	 * 
	 * afterSaveCell: function () { $(this).trigger('reloadGrid'); },
	 * editCaption: "The Edit Dialog", recreateForm: true, checkOnUpdate :
	 * true, checkOnSubmit : true, closeAfteredit: true, errorTextFormat:
	 * function (data) { return 'Error: ' + data.responseText }
	 * 
	 * 
	 *  },
	 * 
	 * 
	 *  // options for the Delete Dialogue { closeAfterdel:true,
	 * recreateForm: true, errorTextFormat: function (data) { return 'Error: ' +
	 * data.responseText },
	 * 
	 * onSelectRow: function(id) { if (id && id !== lastSel) {
	 * jQuery("#jqGrid1").saveRow(lastSel, true, 'clientArray');
	 * jQuery("#jqGrid1").editRow(id, true);
	 * 
	 * lastSel = id; console.log(id); } }
	 * 
	 * 
	 * });
	 *  // grid refresh code
	 * 
	 * });
	 * 
	 * 
	 * });
	 *  }
	 */
	/*
	 * //Grid for Tax if retail is not checked else if
	 * (document.getElementById('vat1').checked) {
	 */
	
	jQuery("#jqGrid1").trigger('reloadGrid');
	
	var input1 = document.getElementById('fk_cat_id1'), list = document
	.getElementById('cat_drop1'), i, fk_cat_id;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input1.value) {
			fk_cat_id = list.options[i].getAttribute('data-value');
		}
	}
	
	var input1 = document.getElementById('supplier1'), list = document
	.getElementById('sup_drop1'), i, fk_sup_id;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input1.value) {
			fk_sup_id = list.options[i].getAttribute('data-value');
		}
	}
	
	var fk_cat_id = fk_cat_id;
	var fk_sup_id = fk_sup_id;
	
	var params = {};
	itemparams = {};
	productId = $('#proName1').val();
	
	$("#proName1 option:selected").each(function() {
		selectedVal = $(this).text();
	});
	
	var splitText = selectedVal.split(",");
	
	var proName = splitText[0];
	var company = splitText[1];
	var weight = splitText[2];
	
	itemparams["proName"] = proName;
	itemparams["company"] = company;
	itemparams["weight"] = weight;
	
	itemparams["fk_cat_id"] = fk_cat_id;
	itemparams["fk_sup_id"] = fk_sup_id;
	
	var count = 0;
	var newrow;
	var rowId;
	
	itemparams["methodName"] = "getProductDetailsForGoodsReceiveForBookedWithTaxNew";
	$
			.post(
					'/Shop/jsp/utility/controller.jsp',
	itemparams,
	
	function(data) {
		var jsonData = $.parseJSON(data);
	
		function sumFmatter(cellvalue, options, rowObject) {
	
			var jam = 0;
			var jam1 = "";
			var tot = ((options.rowData.quantity) * ((options.rowData.buyPrice) + ((options.rowData.taxPercentage / 100) * options.rowData.buyPrice)));
			// var shree =
			// document.poferti.grossTotal.value;// to get
			// gross total
	
			var count = jQuery("#jqGrid1").jqGrid(
					'getGridParam', 'records');
			var allRowsInGrid1 = $('#jqGrid1')
					.getGridParam('data');
			var AllRows = JSON.stringify(allRowsInGrid1);
			for (var i = 0; i < count; i++) {
	
				var quantity = allRowsInGrid1[i].quantity;
				params["quantity" + i] = quantity;
	
				var buyPrice = allRowsInGrid1[i].buyPrice;
				params["buyPrice" + i] = buyPrice;
	
				var taxPercentage = allRowsInGrid1[i].taxPercentage;
				params["taxPercentage" + i] = taxPercentage;
	
				var taxAmount = ((taxPercentage / 100) * buyPrice);
	
				var priceWithTaxamount = taxAmount
						+ buyPrice;
	
				var totals1 = ((priceWithTaxamount) * (quantity));
	
				jam = jam + totals1;
	
				/*
				 * document.getElementById("total").value =
				 * jam;
				 * document.getElementById("duptotal").value =
				 * jam;
				 */
			}
			if (count == 0) {
				document.getElementById("total1").value = tot;
	
			} else {
				document.getElementById("total1").value = jam;
	
			}
	
			return tot;
		}
	
		$
				.each(
						jsonData,
						function(i, v) {
	
							var productName = v.productName;
							var buyPrice = v.buyPrice;
							var salePrice = v.salePrice;
							var quantity = v.quantity;
							var weight = v.weight;
							var productID = v.productID;
							var manufacturer = v.manufacturer;
							var lastsel = productID;
	
							$("#jqGrid1")
									.jqGrid(
											{
	
												datatype : "local",
	
												colNames : [
														"Product ID",
														"Product Name",
														"Company",
														"Buy Price",
														"M.R.P",
														"Tax %",
														"Sale Price",
														"Packing",
														"Quantity",
														"Total",
														"BatchNo",
														"ExpiryDate" ],
	
												colModel : [
														{
															name : "productID",
															hidden : true
														// resizable:
														// true,
	
														},
														{
															name : "productName",
															width : 120,
	
														},
														{
															name : "manufacturer",
															width : 120
	
														},
														{
															name : "buyPrice",
															width : 120,
															editable : true
														},
														{
															name : "mrp",
															width : 120,
															editable : true
														},
														{
															name : "taxPercentage",
															width : 140,
															editable : true
														},
	
														{
															name : "salePrice",
															width : 140,
															editable : true
														},
	
														{
															name : "weight",
															width : 100,
	
														},
	
														{
															name : "quantity",
															width : 120,
															editable : true
	
														},
	
														{
															name : 'Total',
															// name:
															// "",
															formatter : sumFmatter,
															width : 150,
	
														},
														{
															label : 'batchNo',
															name : "batchNo",
															width : 150,
															editable : true,
	
														},
														{
															label : 'expiryDate',
															name : "expiryDate",
															index : 'Date',
															width : 200,
															editable : true,
															edittype : "text",
															editrules : {
																date : true,
																minValue : 0
															},
															datefmt : 'Y-m-d',
															editoptions : {
																dataInit : function(
																		elem) {
																	$(
																			elem)
																			.datepicker(
																					{
																						dateFormat : "yy-mm-dd"
																					});
																}
															}
														} ],
	
												sortorder : 'desc',
	
												multiselect : false,
												loadonce : false,
												rownumbers : true,
												'cellEdit' : true,
	
												afterSaveCell : function grossTotal() {
													/*
													 * Calculation
													 * of
													 * total
													 * after
													 * editing
													 * quantity
													 */
	
													// $(this).trigger('reloadGrid');
													var rowId = $(
															"#jqGrid1")
															.jqGrid(
																	'getGridParam',
																	'selrow');
													var rowData = jQuery(
															"#jqGrid1")
															.getRowData(
																	rowId);
													var quantity = rowData['quantity'];
													var buyPrice = rowData['buyPrice'];
													var taxPercentage = rowData['taxPercentage'];
													var taxAmount = ((taxPercentage / 100) * buyPrice);
													var BuyPriceWithTaxAmount = taxAmount
															+ buyPrice;
													var tota = quantity
															* BuyPriceWithTaxAmount;
													$(
															"#jqGrid1")
															.jqGrid(
																	"setCell",
																	rowId,
																	"Total",
																	tota);
												},
	
												viewrecords : true,
												width : 1200,
												height : 250,
												rowNum : 10,
												pager : "#jqGridPager1",
												sortorder : "desc",
	
												onSelectRow : function(
														productID) {
													if (productID
															&& productID !== lastsel) {
														jQuery(
																'#jqGrid1')
																.jqGrid(
																		'restoreRow',
																		lastsel);
														jQuery(
																'#jqGrid1')
																.jqGrid(
																		'editRow',
																		productID,
																		true);
														// jQuery('#jqGrid').jqGrid('editRow',productID,true,pickdates);
														lastsel = productID;
													}
												},
	
											});
	
							count = jQuery("#jqGrid1")
									.jqGrid('getGridParam',
											'records');
							var rowdata = $("#jqGrid1")
									.jqGrid('getGridParam',
											'data');
							var ids = jQuery("#jqGrid1")
									.jqGrid('getDataIDs');
	
							var prodName, com, packing;
							for (var j = 0; j < count; j++) {
								prodName = rowdata[j].productName;
								com = rowdata[j].manufacturer;
								packing = rowdata[j].weight;
	
								var rowId = ids[j];
								var rowData = jQuery(
										'#jqGrid1')
										.jqGrid(
												'getRowData',
												rowId);
	
								if (prodName == jsonData[i].productName
										&& com == jsonData[i].manufacturer
										&& packing == jsonData[i].weight) {
	
									newrow = false;
									alert("Product Name Already Inserted !!!");
									var grid = jQuery("#jqGrid1");
									grid
											.trigger("reloadGrid");
									break;
								} else {
									newrow = true;
								}
							}
	
							if (newrow == true) {
	
								// $("#credit").addRowData(i,jsonData[i]);
								$("#jqGrid1").addRowData(
										count, jsonData[i]);
	
							}
	
							if (count == 0 || count == null) {
								// $("#credit").addRowData(i,jsonData[i]);
								$("#jqGrid1").addRowData(0,
										jsonData[i]);
							}
							// $("#jqGrid1").addRowData(i,jsonData[i]);
							function pickdates(productID) {
								jQuery("#"
												+ productID
												+ "_expiryDate",
										"#jqGrid1")
										.datepicker(
												{
													dateFormat : "yyyy-mm-dd"
												});
							}
							/* jQuery("#jqGrid").jqGrid('navGrid',"#jqGridPager",{edit:false,add:false,del:true}); */
	
							$('#jqGrid1')
									.navGrid(
											'#jqGridPager1',
											// the buttons
											// to appear on
											// the toolbar
											// of the grid
											{
												edit : true,
												add : false,
												del : true,
												search : true,
												refresh : true,
												view : true,
												position : "left",
												cloneToTop : false
											},
											// options for
											// the Edit
											// Dialog
	
											{
	
												afterSaveCell : function() {
													$(this).trigger('reloadGrid');
												},
												editCaption : "The Edit Dialog",
												recreateForm : true,
												checkOnUpdate : true,
												checkOnSubmit : true,
												closeAfteredit : true,
												errorTextFormat : function(data) 
												{
													return 'Error: '+ data.responseText
												}
	
											},
	
											// options for
											// the Delete
											// Dialogue
											{
												closeAfterdel : true,
												recreateForm : true,
												errorTextFormat : function(data) 
												{
													return 'Error: '+ data.responseText
												},
	
												onSelectRow : function(id) 
												{
													if (id&& id !== lastSel) {
														jQuery("#jqGrid1").saveRow(lastSel,true,'clientArray');
														jQuery("#jqGrid1").editRow(id,true);
	                                                    lastSel = id;
														console.log(id);
													}
												}
	
											});
	
							// grid refresh code
	
												});
	
							});
	
		}
	
	}
	
	var prodetails = new getdetails();
	
	// calculation for Without booked
	
	// Calculations for Booked goods receive
	function discountCalculationForBooked() {
		var total = document.getElementById("total1").value;
	var discount = $('#discount1').val();
	var discountAmount = ((discount / 100) * Number(total));
	var totalminusDiscount = Number(total) - discountAmount;
	document.getElementById("discountAmount1").value = discountAmount;
	document.getElementById("grossTotal1").value = totalminusDiscount;
	}
	
	function hamaliExpenseAddingToGrossForBooked() {
		var hamaliExpence = document.getElementById("hamaliExpence1").value;
	// Gross total calculation
	var discount = $('#discount1').val();
	var transExpence = document.getElementById("transExpence1").value;
	
	if (discount == "") {
	
	if (transExpence == "") {
	var total = document.getElementById("total1").value;
	var totalWithExpense = Number(total) + Number(hamaliExpence);
	document.getElementById("grossTotal1").value = totalWithExpense;
	}
	if (transExpence != "") {
	var total = document.getElementById("total1").value;
	var totalWithExpense = Number(total) + Number(transExpence);
	var totalWithExpense1 = Number(totalWithExpense)
			+ Number(hamaliExpence);
	document.getElementById("grossTotal1").value = totalWithExpense1;
		}
	}
	
	if (discount != "") {
	var transExpence = document.getElementById("transExpence1").value;
	if (transExpence == "") {
	var total = document.getElementById("total1").value;
	var discountAmount = ((discount / 100) * Number(total));
	var totalminusDiscount = Number(total) - Number(discountAmount);
	var totalWithExpense = Number(totalminusDiscount)
			+ Number(hamaliExpence);
	document.getElementById("grossTotal1").value = totalWithExpense;
	}
	if (transExpence != "") {
	var total = document.getElementById("total1").value;
	var discountAmount = ((discount / 100) * Number(total));
	var totalminusDiscount = Number(total) - discountAmount;
	var totalwithTrans = Number(totalminusDiscount)
			+ Number(transExpence);
	var totalWithExpense = Number(totalwithTrans)
			+ Number(hamaliExpence);
	document.getElementById("grossTotal1").value = totalWithExpense;
			}
		}
	
	}
	
	function transExpenseAddingToGrossTotalForBooked() {
		var transExpence = document.getElementById("transExpence1").value;
	var hamaliExpence = document.getElementById("hamaliExpence1").value;
	var discount = $('#discount1').val();
	
	if (discount == "") {
	if (hamaliExpence == "") {
	var total = document.getElementById("total1").value;
	var totalWithExpense = Number(total) + Number(transExpence);
	document.getElementById("grossTotal1").value = totalWithExpense;
	}
	
	if (hamaliExpence != "") {
	var total = document.getElementById("total1").value;
	var hamaliTotal = Number(total) + Number(hamaliExpence);
	var totalWithExpense = Number(transExpence) + Number(hamaliTotal);
	document.getElementById("grossTotal1").value = totalWithExpense;
		}
	}
	
	if (discount != "") {
	if (hamaliExpence == "") {
	var total = document.getElementById("total1").value;
	var discountAmount = ((discount / 100) * Number(total));
	var totalminusDiscount = Number(total) - Number(discountAmount);
	var totalWithExpense = Number(totalminusDiscount)
			+ Number(transExpence);
	document.getElementById("grossTotal1").value = totalWithExpense;
	}
	if (hamaliExpence != "") {
	var total = document.getElementById("total1").value;
	var discountAmount = ((discount / 100) * Number(total));
	var totalminusDiscount = Number(total) - Number(discountAmount);
	var totalwithTrans = Number(totalminusDiscount)
			+ Number(hamaliExpence);
	var totalWithExpense = Number(totalwithTrans)
			+ Number(transExpence);
	document.getElementById("grossTotal1").value = totalWithExpense;
			}
	
		}
	
	}
	
	/* ++++++++ Grid code for Without Advance Booking by shrimant ++++++++++ */
	
	
	/*function getdata()
	{
		var input1 = document.getElementById('proName1'),
		list = document.getElementById('product_drop1'),
			   i,fk_cat_id, fk_subCat_id, productId,packweight,proName;
		
		for (i = 0; i < list.options.length; ++i) {
			if (list.options[i].value === input1.value) {
				fk_cat_id= list.options[i].getAttribute('myvalue1');
				fk_subCat_id= list.options[i].getAttribute('myvalue2');
				productId= list.options[i].getAttribute('myvalue3');
				packweight= list.options[i].getAttribute('myvalue4');
				proName= list.options[i].getAttribute('myvalue5');
				
				alert(fk_cat_id+" "+fk_subCat_id+" "+productId+" "+packweight+" "+proName);
			}
		}
		
	}*/
	
	function productDetailInGrid()
	{		
		var params = {};
		itemparams = {};
	
	var input1 = document.getElementById('fk_cat_id'),
		list   = document.getElementById('cat_drop'),
				 i,fk_cat_id;
	
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input1.value) {
			fk_cat_id= list.options[i].getAttribute('data-value');
		}
	}
		  
	productId = $('#subCat').val();

	var splitText = productId.split(",");

	var fk_subCat_id = splitText[0];
	
	productId = $('#proName').val();
	
	var splitText = productId.split(",");
	
	var proName = splitText[0];
	var packweight = splitText[1];
	productId = splitText[2];
	var booking = $('#booking').val();
			
	if((fk_cat_id == null && fk_cat_id == "" || fk_cat_id == undefined) || (productId == null || productId == "" ||  productId == undefined))
	{
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
	}
	else{
	
	toDate = $('#purchaseDate').val();
	
	var d = toDate.split("-");
	
	var todayDate = d[2]+"/"+d[1]+"/"+d[0];
		
	}
	
	itemparams["proName"] = proName;
	itemparams["fk_cat_id"] = fk_cat_id;
	itemparams["fk_subCat_id"] = fk_subCat_id;
	itemparams["productId"] = productId;
	itemparams["packweight"] = packweight;
	itemparams["booking"] = booking;
	
	document.getElementById('proName1').value = null;
	document.getElementById('booking').value = null;
	var count = 0;
	var newrow;
	var rowId;
	var taxPercentage;
	
	itemparams["methodName"] = "getProductDetailsForGoodsReceiveForTax";
	
	$.post('/Shop/jsp/utility/controller.jsp',itemparams,function(data) {
		
		var jsonData = $.parseJSON(data);
		
		//var catmap = jsonData.list;
		//var mydata=catmap;
		/*if(jsonData.xyz == null || jsonData.xyz == "" || jsonData.xyz == " " || jsonData.xyz == undefined)
		{
			alert("Invalid Advance Booking No.");
			return false;
		}
		else
			{}*/
		
		//$("#jqGrid").jqGrid("clearGridData", true).trigger("reloadGrid");
		
	    $.each(jsonData,function(i, v)
	    {		    
						var catIDforVAt = v.catIDforVAt;
						var productName = v.productName;
						var buyPrice = v.buyPrice;
						var salePrice = v.salePrice;
						var quantity = v.quantity;
						var weight = v.weight;
						var productID = v.productID;
						var manufacturer = v.manufacturer;
						var hsn = v.hsn;
						var lastsel = productID;
						var subCatId = v.subCatId;
						var unitName = v.unitName;
						//var gst = v.taxPercentage;
						var sgst = v.sgst;
						var cgst = v.cgst;
						var igst1 = v.igst1;
						var advancebookingId = v.advancebookingId;	
						var subCatName = v.subCatName;	
						
						$("#jqGrid").jqGrid({
							datatype : "local",
	
											colNames : [
													"Cat ID",
													"Product ID",
													"Product<br>Name", 
													"Sub<br>Category",
													"Company",
													"HSN",
													"PO<br>No",
													"Barcode ID",
													"MRP",
/*													"Buy<br>Price",*/
													"BP<br>Incl<br>Tax",
													"BP<br>Excl<br>Tax",
													"Sale<br>Price/Unit",
													/*"sale<br>Price<br>Ex.Tax",*/
													/*"Pkg",*/
													"Weight",
													"Quantity",
													"Unit",
													/*"Shortage",*/
													"Total<br>Pkg",
													"Disc<br>%",
													"Disc<br>Amt",
													"SGST<br>%",
													"CGST<br>%",
													"IGST<br>%",
													"Batch<br>No.",
													"Expiry<br>Date",
													"Total<br>Excl<br>Tax",
													"Total",
													"SubCatid",
													"PkBookingID",													
													"Unit Value",
													"Unit Desc",
													],
											
	
											colModel : [
													{
														name : "catIDforVAt",
														width : 120,
														hidden : true,
														align : 'center',
													},
													{
														name : "productID",
														width : 120,
														hidden : true,
														align : 'center',
													},
													{
														name : "productName",
														width : 120,
														align : 'center',
														editable : true,
													},
													{
														name : "subCatName",
														width : 100,
														align : 'center',
														editable : true,
													},
													{
														name : "manufacturer",
														width : 100,
														align : 'center',
														editable : true,
													},
													{
														name : "hsn",
														width : 100,
														align : 'center',
														editable : true,
													},
													{
														name : "advancebookingId",
														width : 100,
														align : 'center',
														editable : true,
													},

													{
														name : 'barcode_id',
														width : 120,
														align : 'center',
														editable : true,
													},
													{
														name : "mrp",
														width : 100,
														editable : false,
														align : 'center',
														hidden : true,
													},
													{
														name : "buyPrice",
														width : 100,
														editable : true,
														align : 'center',
													},
													{
														name : "buyPriceEx",
														width : 100,
														editable : true,
														align : 'center',
													},

													{
														name : "salePrice",
														width : 120,
														editable : false,
														hidden : true,
														align : 'center',
													},
													{
														name : "weight",
														width : 80,
														editable : true,
														align : 'center',
													//	hidden : true,
													},
													{
														name : "quantity",
														width : 100,
														editable :true,
														align : 'center',
													},
													{
														name : 'unitName',
														width : 90,
														// hidden:true,
														align : 'center',
														editable : true,
													},
													{
														name : "weightAftShortMinus",
														width : 100,
														hidden : true,
														align : 'center',
													},
													{
														name : "Discount",
														width : 80,
														align : 'center',
														editable : true
													},
													{
														name : "DiscountAmount",
														width : 100,
														align : 'center',
														editable : true
													},
													{
														name : "sgst",
														width : 80,
														align : 'center',
														editable : true
													},
													{
														name : "cgst",
														width : 80,
														align : 'center',
														editable : true
													},
													{
														name : "igst1",
														width : 85,
														align : 'center',
														editable : true
													},
													{
														id: "batchNo",
														name : "batchNo",
														width : 80,
														editable : true,
														align : 'center',
														hidden : true,
													},
													{
											          id: 'expiryDate',
											          name: 'expiryDate', 
											          index: 'PremiumDate',
											          align: 'left', 
											          width : 100,
											          sortable: true,
											          editable: true, 
											          hidden : true,
											         //formatter: 'date',																         
											        /*  formatoptions:
											          { 
											              srcformat: 'ISO8601Long', 
											              newformat: 'd/m/Y', 
											              defaultValue:null 
											          },
											          width : 140,
											          editable: true, 
											          edittype: 'text', 
											          editoptions:
											          {
											              size: 12, 
											              maxlengh: 12, 
											              dataInit: function (element)
											              { 
											                  $(element).datepicker({ dateFormat: 'dd/mm/yy' })
											              }
											          }, 
											          editrules: {date: true} */
											          
											           editrules:{date:true, minValue:0}, datefmt:'Y-m-d',
										        	   editoptions:{dataInit: function (elem) {$(elem).datepicker({dateFormat:"yy-mm-dd",minDate :new Date()});} }
												          
												     },
												     {
														name : "TotalExTax",
														width : 100,
														align : 'center',
														editable : true
													},
													{
														name : 'Total',
														width : 100,
														align : 'center',
														editable : true,
													},
													{
														name : 'subCatId',
														width : 80,
														hidden : true,
														align : 'center',
													},
													{
														name : 'pkbookingId',
														width : 80,
														hidden : true,
														align : 'center',
													},

													{
														name : 'unitvalue',
														width : 80,
														hidden : true,
														align : 'center',
													},
													{
														name : 'unitdesc',
														width : 80,
														hidden : true,
														align : 'center',
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
												document.getElementById("discount").value = "";
												document.getElementById("discountAmount").value = "";
												
												/*Calculation of total after editing quantity*/
	
												// $(this).trigger('reloadGrid');
												var rowId = $("#jqGrid").jqGrid('getGridParam','selrow');
												var rowData = jQuery("#jqGrid").getRowData(rowId);
												var weight = rowData['weight'];
												var mrp = rowData['mrp'];
												var salePrice = rowData['salePrice'];
												var unitName = rowData['unitName'];
												var quantity = rowData['quantity'];
												var Discount = rowData['Discount'];
												var buyPrice = rowData['buyPrice'];
												var expiryDate = rowData['expiryDate'];
												var buyPriceEx = rowData['buyPriceEx'];
												var Total = rowData['Total'];
												var igst1 = rowData['igst1'];
												var sgst = rowData['sgst'];
												var cgst = rowData['cgst'];
												var gst = +sgst+ +cgst;
												
												//////quantity checking//////
												/*if(gst>0){
													 BpwTax = (buyPrice/(1+(gst/100)+(igst1/100)));
										      		  //$("#jqGrid").jqGrid("setCell", rowId, "buyPriceEx",  BpwTax.toFixed(2));
										      		 $("#jqGrid").jqGrid("setCell", rowId, "buyPriceEx", Math.round(BpwTax * 100) / 100);
												}
												if(igst1>0){
													BpwTax = (buyPrice/(1+(gst/100)+(igst1/100)));
										      		  $("#jqGrid").jqGrid("setCell", rowId, "buyPriceEx",  BpwTax.toFixed(2));
												}*/
											     
										if(cgst == "")
							            {
											cgst = "0";
					                   		var setZero = 0;
					                   		$("#jqGrid").jqGrid("setCell",rowId,"cgst",setZero);
							            }
										
										if(sgst == "")
							            {
											sgst = "0";
					                   		var setZero = 0;
					                   		$("#jqGrid").jqGrid("setCell",rowId,"sgst",setZero);
							            }
												
										if(Discount == "")
							            {
											Discount = "0";
					                   		var setZero = 0;
					                   		$("#jqGrid").jqGrid("setCell",rowId,"Discount",setZero);
							            }
										
										if(igst1 == "")
							            {
											igst1 = "0";
					                   		var setZero = 0;
					                   		$("#jqGrid").jqGrid("setCell",rowId,"igst1",setZero);
							            }
												
									    if(quantity == "")
							            {
							                quantity = "0";
					                   		var setZero = 0;
					                   		$("#jqGrid").jqGrid("setCell",rowId,"quantity",setZero);
							            }
									    
									    if(buyPriceEx == "")
							            {
									    	buyPriceEx = "0";
					                   		var setZero = 0;
					                   		$("#jqGrid").jqGrid("setCell",rowId,"buyPriceEx",setZero);
							            }
											
										var checkQuantity = /^[0-9]+\.?[0-9]*$/;
										
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
										$("#jqGrid").jqGrid("setCell",rowId,"quantity",setZero);
													
	
										var Total = 0;
										var Total1 = 0;
										var count = jQuery("#jqGrid").jqGrid('getGridParam','records');
										var allRowsInGrid1 = $('#jqGrid').getGridParam('data');
										var AllRows = JSON.stringify(allRowsInGrid1);
											
										for (var k = 0; k < count; k++) 
										{
										  if (allRowsInGrid1[k].Total == undefined
																|| allRowsInGrid1[k].Total == ""
																|| allRowsInGrid1[k].Total == "NaN") 
										    {
															
												allRowsInGrid1[k].Total = 0;
													
											}
	
											    Total1 = allRowsInGrid1[k].Total;
												Total = +Total+ +Total1;
													
											}
	
											document.getElementById("total").value = Total.toFixed(2);
											document.getElementById("duptotal").value = Total.toFixed(2);
											document.getElementById("grossTotal").value = Total.toFixed(2);
	
												return false;
	
										}
												
												
	                                                      //////////Buy Price validation///////////
										if (buyPrice != "") 
										{
										var numbers = /^[0-9]+\.?[0-9]*$/;
											if (buyPrice.match(numbers)) 
												{
	
												} 
												else 
												{
													var msg = "Please Enter Valid Buy Price";
													var dialog = bootbox.dialog({
																	
											message : '<p class="text-center">'+ msg.fontcolor("red").fontsize(5)+ '</p>',
											closeButton : false
											
												});
	
											setTimeout(
													function()
													{dialog.modal('hide');
														},
													1500);
	
												var setValue = 0;
									           	$("#jqGrid").jqGrid("setCell",rowId,"buyPrice",setValue);
									           		
									           		 	return false;	
												}
										}
										
										/*check buy price and mrp price*/
										
										/*if(Number(buyPrice) >  Number(mrp))
										{
											 var setValue = 0;
											 
											 var msg = "MRP must be Greater Than Buy Price";
											 var dialog = bootbox.dialog({
																
										message : '<p class="text-center">'+ msg.fontcolor("red").fontsize(5)+ '</p>',
										closeButton : false
										
											});

										setTimeout(
												function()
												{dialog.modal('hide');
													},
												1500);
										
								            $("#jqGrid").jqGrid("setCell",rowId,"buyPrice",setValue);
								            $("#jqGrid").jqGrid("setCell",rowId,"buyPriceEx",setValue);
								            $("#jqGrid").jqGrid("setCell",rowId,"Total",setValue);
								            document.getElementById("total").value = +setValue.toFixed(2);
											document.getElementById("grossTotal").value = +setValue.toFixed(2);
								           		
								           		 return false;									
										}*/
										
	                              //CGST and SGST and IGST Validation
										
										if( Number(cgst)>0 &&  Number(sgst)>0 && Number(igst1)>0 )
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
										
								            $("#jqGrid").jqGrid("setCell",rowId,"igst1",setValue);
								           		
								           		 return false;									
										}
										else
										{
											 if(Number(cgst)>0 && Number(igst1)>0)
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
									           		 $("#jqGrid").jqGrid("setCell",rowId,"cgst",setValue);
									           		 $("#jqGrid").jqGrid("setCell",rowId,"igst1",setValue);
									           		
									           		 return false;	 
											 }
											 else{
												 
												 if(Number(sgst)>0 && Number(igst1)>0)
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
										           		 $("#jqGrid").jqGrid("setCell",rowId,"sgst",setValue);
										           		 $("#jqGrid").jqGrid("setCell",rowId,"igst1",setValue);
										           		
										           		 return false;	
								        			 
													 
												 }
											 }
										}
										
										
								   //Mrp validation//		
											/*if (mrp != "") 
											{
												var numbers = /^[0-9]+\.?[0-9]*$/;
											if (mrp.match(numbers)) 
											{
	
											} 
											else 
											{
												var msg = "Please Enter Valid MRP Price";
												var dialog = bootbox.dialog({
																																 
												message : '<p class="text-center">'+ msg.fontcolor("red").fontsize(5)+ '</p>',
												closeButton : false
												});
	
												setTimeout(
													function() {
													dialog.modal('hide');
														},
														1500);
														
													var setValue;
													$("#jqGrid").jqGrid("setCell",rowId,"mrp",setValue);
	
													return false;
													}
												}*/
								//sale price validation//		
	
										if (salePrice != "") 
										{
											var numbers = /^[0-9]+\.?[0-9]*$/;
										if (salePrice.match(numbers)) 
										{
	
										} else 
										{
											 var msg = "Please Enter Valid Sale Price";
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
														
											var setValue;
											$("#jqGrid").jqGrid("setCell",rowId,"salePrice",setValue);
	
											return false;
											}
												}
							//mrp and sale price validation//				
									/*if (mrp != "" & salePrice != "") 
									{
									if (Number(salePrice) > Number(mrp)) 
									{
									var msg = "MRP must be Greater Than Sale price Per Unit";
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
											$("#jqGrid").jqGrid("setCell",rowId,"salePrice",setZero);
											$("#jqGrid").jqGrid("setCell",rowId,"Total",setZero);
	
										var Total = 0;
										var Total1 = 0;
										var count = jQuery("#jqGrid").jqGrid('getGridParam','records');
										var allRowsInGrid1 = $('#jqGrid').getGridParam('data');
										var AllRows = JSON.stringify(allRowsInGrid1);
										for (var k = 0; k < count; k++) {
										if (allRowsInGrid1[k].Total == undefined
																	|| allRowsInGrid1[k].Total == ""
																	|| allRowsInGrid1[k].Total == "NaN")
										{
																
											allRowsInGrid1[k].Total = 0;
															
										}
	
											Total1 = allRowsInGrid1[k].Total;
											Total = +Total+ +Total1;
											}
	
											document.getElementById("total").value = +Total.toFixed(2);
										    document.getElementById("duptotal").value = +Total.toFixed(2);
											document.getElementById("grossTotal").value = +Total.toFixed(2);
	
											return false;
											}
													
									}*/
	
												/*if (dcNum >= 0) {
													var W = weight;
													var d = dcNum;
													var weightWithShortage = W
															- d;
													$(
															"#jqGrid")
															.jqGrid(
																	"setCell",
																	rowId,
																	"weightAftShortMinus",
																	weightWithShortage);
												}
	*/
												
												var buyPrice = rowData['buyPrice'];
												
												var cgst = rowData['cgst'];
												var sgst = rowData['sgst'];
												var gst = +cgst+ +sgst;
												var igst1 = rowData['igst1'];
												var DiscountAmount= rowData['DiscountAmount'];
												var Discount= rowData['Discount'];
												

												/*/////calculation of gst////
*/														
												var checkDiscount = /^[0-9]+\.?[0-9]*$/;
												  if(Discount.match(checkDiscount))
												  {
													  
													  if(Number(Discount) >= 100)
											  	  {
														  
											  		  var setZero = 0;
											  		  alert("In discount")
											  		  myAlert("Discount Percentage Must Be Less Than 100");
											  		 
											  		  $("#jqGrid").jqGrid("setCell", rowId, "DiscountAmount", setZero);
											      	
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
											  		
											  		  $("#jqGrid").jqGrid("setCell", rowId, "DiscountAmount", setZero);
											      
											  	  }
													 else
												{
											  		  myAlert("Pleaee Enter Valid Discount value");
											  		 
											      	  $("#jqGrid").jqGrid("setCell", rowId, "DiscountAmount", setZero);
											      	
											      	  totalCalC();
											      	  totalDisC();
											      	  return false;
													  }
												  }			
												  
												//Buy price excluding tax calc//
												  
												  var checkbuyPrice= /^[0-9]+\.?[0-9]*$/;
												  if(buyPrice.match(checkbuyPrice))
											    {
											      	  if(Number(buyPrice) > 0)
											  		  {
											      		  BpwTax = (buyPrice/(1+(gst/100)+(igst1/100)));
/*											      		  var aa = (buyPrice*((gst/100)+(igst1/100)));
											      		  BpwTax = +buyPrice + +aa;*/
											      		  $("#jqGrid").jqGrid("setCell", rowId, "buyPriceEx",  BpwTax.toFixed(2));
											     
											      	if(Number(gst) > 0)
											      	{  
											      		 DiscountAmount= (BpwTax*(Discount/100));
											      		 finalBp = (BpwTax- DiscountAmount) * quantity;
											      		 newTaxAmt = (((finalBp*quantity)*gst)/100);
											      			  
											      		 var oneProTax = (((finalBp)*gst)/100);
											      		 newFinalBp = finalBp+ oneProTax;
											      		 tota = newFinalBp;
											      													      			 
											      		$("#jqGrid").jqGrid("setCell", rowId, "DiscountAmount", DiscountAmount.toFixed(2));	  
													    $("#jqGrid").jqGrid("setCell", rowId, "TotalExTax", finalBp.toFixed(2));
													    $("#jqGrid").jqGrid("setCell", rowId, "Total", tota.toFixed(2));
//													    $("#jqGrid").jqGrid("setCell", rowId, "Total", finalBp.toFixed(2));												 
													     totalCalC();
													     totalDisC();	
											      		}
											      	else if(Number(igst1) > 0)
											      	{
											      		DiscountAmount= (BpwTax*(Discount/100));
											      		 finalBp = (BpwTax- DiscountAmount) * quantity;
											      		 newTaxAmt = (((finalBp*quantity)*igst1)/100);
											      			  
											      		 var oneProTax = (((finalBp)*igst1)/100);
											      		 newFinalBp = finalBp+ oneProTax;
											      		 tota = newFinalBp;
											      													      			 
											      		$("#jqGrid").jqGrid("setCell", rowId, "DiscountAmount", DiscountAmount.toFixed(2));	  
													    $("#jqGrid").jqGrid("setCell", rowId, "TotalExTax", finalBp.toFixed(2));
													    $("#jqGrid").jqGrid("setCell", rowId, "Total", tota.toFixed(2));
//													    $("#jqGrid").jqGrid("setCell", rowId, "Total", finalBp.toFixed(2));													 
													     totalCalC();
													     totalDisC();
											      	}
											      	
											      	else if(Number(gst) == 0 && Number(igst1) == 0)
											      	{
											      		 DiscountAmount= (BpwTax*(Discount/100));
											      		 finalBp = (BpwTax- DiscountAmount) * quantity;
											      		 newTaxAmt = (((finalBp*quantity)*igst1)/100);
											      			  
											      		 var oneProTax = (((finalBp)*igst1)/100);
											      		 newFinalBp = finalBp+ oneProTax;
											      		 tota = newFinalBp;
											      													      			 
											      		$("#jqGrid").jqGrid("setCell", rowId, "DiscountAmount", DiscountAmount.toFixed(2));	  
													    $("#jqGrid").jqGrid("setCell", rowId, "TotalExTax", finalBp.toFixed(2));
													    $("#jqGrid").jqGrid("setCell", rowId, "Total", tota.toFixed(2));
													 
													     totalCalC();
													     totalDisC();
											      	}
											      		else
											            {
											      		
											      var setZero = 0; 
												  $("#jqGrid").jqGrid("setCell", rowId, "DiscountAmount", setZero);
											   
											            }
											    }
										else
									         {
											  	var setZero = 0;
											 
											    $("#jqGrid").jqGrid("setCell", rowId, "DiscountAmount", setZero);
											    $("#jqGrid").jqGrid("setCell", rowId, "Total", setZero);
											
											    return false;
												}
											    }				        	  
										else
											{
												var setZero = 0;
												alert("Pleae Enter Valid Buy Price");
												$("#jqGrid").jqGrid("setCell", rowId, "buyPrice", setZero);
												$("#jqGrid").jqGrid("setCell", rowId, "buyPriceEx", setZero);
											  	$("#jqGrid").jqGrid("setCell", rowId, "DiscountAmount", setZero);
											  	$("#jqGrid").jqGrid("setCell", rowId, "Total", setZero);
											
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
										          var Total1 = allRowsInGrid1[k].Total; //grid total 

										        if(Total1 != undefined)
										        {
										        		Total = +Total + +Total1;
										        		  }
										        	  }
										        	  for (var j = 0; j < count; j++)
										        	  {
										        		  var Total2 = allRowsInGrid1[j].taxAmount;
										        		  var Total3 = allRowsInGrid1[j].Total;
										        		  if(Total2 != undefined)
										        		  {
										        			  totAmtWithTax = +totAmtWithTax + +Total2 + +Total3;
										        		  }
										        	  }
										        	  document.getElementById("total").value = Total.toFixed(2);//Math.round(Total);
										        	  document.getElementById("grossTotal").value = Total.toFixed(2);//Math.round(Total);
										        	  var totAmount = Total.toFixed(2);//Math.round(Total);
											        }
										        	  
										      function totalDisC()
											   {
												        //TOTAL DISCOUNT AMOUNT
												        var TotalDisAmt = 0;
												        var TotalBPAmt = 0;
												        var disPer = 0;
												        var count = jQuery("#list4").jqGrid('getGridParam', 'records');
												        var allRowsInGrid1 = $('#list4').getGridParam('data');
												        var AllRows=JSON.stringify(allRowsInGrid1);
												        for (var l = 0; l < count; l++)
												        {
												          var TotalDisAmt1 = allRowsInGrid1[l].DiscountAmount;
												          var TotalBPAmt1 = allRowsInGrid1[l].buyPriceEx;
												        		  
												        if(TotalBPAmt1 != undefined)
												        {
												        	TotalBPAmt = (+TotalBPAmt + +TotalBPAmt1).toFixed(2);
												        }
												        if(TotalDisAmt1 != undefined)
												        {
												        	TotalDisAmt = (+TotalDisAmt + +TotalDisAmt1).toFixed(2);
												        	disPer = ((TotalDisAmt/TotalBPAmt)*100).toFixed(2);
												        }						        	 
												        	  }
												        	  /*document.getElementById("discount1").value = disPer;*/
												        	 // document.getElementById("discount").value = TotalDisAmt;
											        	 }
																			        											
												if (gst != "") {
													
													var setZero = 0;
													
												  //var checkGstIgst = /^[0-9]+$/;
													var checkGstIgst = /^[0-9]+\.?[0-9]*$/;
												  //var checkGstIgst = /^[-+]?[0-9]+\.[0-9]+$/; 
													if (String(gst).match(checkGstIgst)) 
													{
														
													} else 
													{
													    var msg = "Please Enter Valid GST %";
														var dialog = bootbox.dialog({
																	
													message : '<p class="text-center">'+ msg.fontcolor("red").fontsize(5)+ '</p>',
													closeButton : false
													});
	
												setTimeout(
														function() {
														dialog.modal('hide');
																
														},
																1500);
	
														igst1 = 0;
														
												$("#jqGrid").jqGrid("setCell",rowId,"gst",setZero);
												return false;
													
													}
												}
												
											if (igst1 != "") 
											{
												//var checkGstIgst = /^[0-9]+$/;
												var checkGstIgst = /^[0-9]+\.?[0-9]*$/;
												if (igst1.match(checkGstIgst))
												{
													} else
													{
														var msg = "Please Enter Valid IGST %";
														var dialog = bootbox
																.dialog({
																	
											message : '<p class="text-center">'+ msg.fontcolor("red").fontsize(5)+ '</p>',
										    closeButton : false
													});
	
											setTimeout(
												function() 
												{
														
													dialog.modal('hide');
													},
													1500);
	
												gst = 0;
														
											    $("#jqGrid").jqGrid("setCell",rowId,"igst1",setZero);
														
														return false;
													}
												}
	
								          /*if (gst == "" || igst1 == "") 
								          {
										         var msg = "Please Enter Either GST OR IGST";
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
										  }*/
								
	
									         if ((gst > Number(0) && igst1 > Number(0))	|| (igst1 > 0 && gst != 0)) 
									          {
	
												var msg = "Please Enter Either GST OR IGST";
												var dialog = bootbox
															.dialog({
																
												message : '<p class="text-center">'+ msg.fontcolor("red").fontsize(5)+ '</p>',
												closeButton : false
													});
	
												setTimeout(
													function() {
														dialog.modal('hide');
															},
															1500);
	
												}
	
											if (gst > 0 || igst1 == "")
											{
													igst1 = 0;
											}
	
											if (igst1 > 0 || gst == "")
											{
													gst = 0;
											}
	
											if (igst1 != 0)
											{
												//return false;
											} 
											else if (igst1 == 0) 
											{	
											}
	
											var Total = 0;
											var Total1 = 0;
											var count = jQuery("#jqGrid").jqGrid('getGridParam','records');
											var allRowsInGrid1 = $('#jqGrid').getGridParam('data');
											var AllRows = JSON.stringify(allRowsInGrid1);
												for (var k = 0; k < count; k++) 
												{
													if (allRowsInGrid1[k].Total == undefined
															|| allRowsInGrid1[k].Total == ""
															|| allRowsInGrid1[k].Total == "NaN") 
													{
														
														allRowsInGrid1[k].Total = 0;
													}
	
													Total1 = allRowsInGrid1[k].Total;
													Total = +Total+ +Total1;
												}
	                               
											document.getElementById("total").value = +Total.toFixed(2);
											document.getElementById("duptotal").value = +Total.toFixed(2);
											document.getElementById("grossTotal").value = +Total.toFixed(2);
	
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
	
						var prodName, com, packing,prodid;
						for (var j = 0; j < count; j++) 
						{
							prodName = rowdata[j].productName;
							com = rowdata[j].manufacturer;
							packing = rowdata[j].weight;
							prodid = rowdata[j].productID;
							
							var rowId = ids[j];
							var rowData = jQuery('#jqGrid').jqGrid('getRowData',rowId);
	
						if (prodName == jsonData[i].productName && com == jsonData[i].manufacturer && packing == jsonData[i].weight && prodid==jsonData[i].productID) 
						{	
							         newrow = false;
	                                             
							           var msg = "Product Name Already Inserted !!!";
							           var dialog = bootbox.dialog({
											
						          message : '<p class="text-center">'+ msg.fontcolor("red").fontsize(5)+ '</p>',
						          closeButton : false
										});
	
								   setTimeout(function() 
								   {
									dialog.modal('hide');
								    }, 1500);
	
								   var grid = jQuery("#jqGrid");
								   grid.trigger("reloadGrid");
								   break;
							      } else 
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
						function pickdates(productID) 
						{
							jQuery("#" + productID+ "_expiryDate","#jqGrid").datepicker({
							dateFormat : "yyyy-mm-dd"
						});
						}
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
												
												var total = document.getElementById("total").value;
												document.getElementById("grossTotal").value = Number(total).toFixed(2);
												document.getElementById("discount").value = "";
												document.getElementById("discountAmount").value = "";
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
												var weight = rowData['weight'];
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
	
												var quantity = rowData['quantity'];
												var buyPrice = rowData['buyPrice'];
												var iGst = rowData['igst1'];
												var cgst = rowData['cgst'];
												var sgst = rowData['sgst'];
												var Gst = +cgst+ +sgst;
	
												if (iGst != 0) {
													var taxPercentage = iGst;
													
													var tota = quantity	* buyPrice;
													
													$("#jqGrid").jqGrid("setCell",rowId,"Total",tota);
													
												} else if (iGst == 0) {													
													var taxPercentage = Number(Gst);
													
													var tota = quantity	* buyPrice;
													
													$("#jqGrid").jqGrid("setCell",rowId,"Total",tota);
	
												}
												
												var Total = 0;
												var count = jQuery("#jqGrid").jqGrid('getGridParam','records');
												
												var allRowsInGrid1 = $('#jqGrid').getGridParam('data');
												var AllRows = JSON.stringify(allRowsInGrid1);
	
												for (var k = 0; k < count; k++) 
												{
													var Total1 = allRowsInGrid1[k].Total;
													Total = +Total+ +Total1;
												}
	
											document.getElementById("total").value = Total.toFixed(2);
											document.getElementById("duptotal").value = Total.toFixed(2);
											document.getElementById("grossTotal").value = Total.toFixed(2);
	
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
	
	/*
	 * }
	 * 
	 * 
	 * 
	 * +++++++++++ grid for Tax ++++++++++++ else
	 * if(document.getElementById('vat').checked){
	 * 
	 * var params= {}; itemparams={}; productId = $('#proName').val();
	 * 
	 * $("#proName option:selected").each(function() { selectedVal =
	 * $(this).text(); });
	 * 
	 * var splitText = selectedVal.split(",");
	 * 
	 * var proName = splitText[0]; var company = splitText[1]; var weight =
	 * splitText[2];
	 * 
	 * itemparams["proName"]= proName; itemparams["company"]= company;
	 * itemparams["weight"]= weight;
	 * 
	 * itemparams["productId"]= productId;
	 * 
	 * var count=0; var newrow; var rowId;
	 * 
	 * itemparams["methodName"] = "getProductDetailsForGoodsReceiveForTax";
	 * $.post('/Fertilizer/jsp/utility/controller.jsp',itemparams,
	 * function(data) { var jsonData = $.parseJSON(data);
	 * 
	 * 
	 * 
	 * function sumFmatter (cellvalue, options, rowObject) {
	 * 
	 * var jam=0; var jam1=""; var tot= ((options.rowData.quantity) *
	 * ((options.rowData.buyPrice)+((options.rowData.taxPercentage/100)*options.rowData.buyPrice)));
	 * //var shree = document.poferti.grossTotal.value;// to get gross total
	 * 
	 * var count = jQuery("#jqGrid").jqGrid('getGridParam', 'records'); var
	 * allRowsInGrid1 = $('#jqGrid').getGridParam('data'); var
	 * AllRows=JSON.stringify(allRowsInGrid1); for (var i = 0; i < count; i++) {
	 * 
	 * var quantity = allRowsInGrid1[i].quantity; params["quantity"+i] =
	 * quantity;
	 * 
	 * var buyPrice = allRowsInGrid1[i].buyPrice; params["buyPrice"+i] =
	 * buyPrice;
	 * 
	 * var taxPercentage = allRowsInGrid1[i].taxPercentage;
	 * params["taxPercentage"+i] = taxPercentage;
	 * 
	 * var taxAmount = ((taxPercentage/100)*buyPrice);
	 * 
	 * var priceWithTaxamount = taxAmount+buyPrice;
	 * 
	 * var totals1=((priceWithTaxamount)*(quantity));
	 * 
	 * jam = jam + totals1;
	 * 
	 * document.getElementById("total").value = jam;
	 * document.getElementById("duptotal").value = jam; } if(count == 0){
	 * document.getElementById("total").value = tot;
	 * document.getElementById("duptotal").value = tot; } else{
	 * document.getElementById("total").value = jam;
	 * document.getElementById("duptotal").value = jam; }
	 * 
	 * 
	 * 
	 * return tot; }
	 * 
	 * $.each(jsonData,function(i,v) {
	 * 
	 * var productName = v.productName; var buyPrice = v.buyPrice; var salePrice
	 * =v.salePrice; var quantity = v.quantity; var weight = v.weight ; var
	 * productID = v.productID ; var manufacturer = v.manufacturer ; var lastsel =
	 * productID;
	 * 
	 * $("#jqGrid").jqGrid({
	 * 
	 * 
	 * 
	 * datatype:"local",
	 * 
	 * colNames: [ "Cat ID","Product ID","Product Name","Company","Buy
	 * Price","Tax %","M.R.P","Sale
	 * Price","Packing","Quantity","Total","BatchNo","ExpiryDate" ],
	 * 
	 * colModel: [ { name: "catIDforVAt", hidden:true //resizable: true,
	 * 
	 *  }, { name: "productID", hidden:true //resizable: true,
	 * 
	 *  }, { name: "productName", width:120,
	 *  }, { name: "manufacturer", width:120
	 *  }, { name: "buyPrice", width: 120, editable: true }, { name:
	 * "taxPercentage", width: 140, editable: true }, { name: "mrp", width: 140,
	 * editable: true }, { name: "salePrice", width: 140, editable: true },
	 *  { name: "weight", width: 100,
	 *  },
	 *  { name: "quantity", width: 120, editable: true
	 * 
	 *  },
	 *  { name : 'Total', // name: "", formatter: sumFmatter, width: 150,
	 *  }, { label : 'batchNo', name: "batchNo", width: 150, editable:true,
	 * 
	 *  }, { label : 'expiryDate', name: "expiryDate", index:'Date', width: 200,
	 * editable:true, edittype:"text", editrules:{date:true, minValue:0},
	 * datefmt:'Y-m-d', editoptions:{dataInit: function (elem)
	 * {$(elem).datepicker({dateFormat:"yy-mm-dd"});} } } ],
	 * 
	 * 
	 * sortorder : 'desc',
	 * 
	 * multiselect: false, loadonce: false, rownumbers:true, 'cellEdit':true,
	 * afterSaveCell: function grossTotal() { Calculation of total after editing
	 * quantity
	 *  // $(this).trigger('reloadGrid'); var rowId
	 * =$("#jqGrid").jqGrid('getGridParam','selrow'); var rowData =
	 * jQuery("#jqGrid").getRowData(rowId); var quantity = rowData['quantity'];
	 * var buyPrice = rowData['buyPrice']; var taxPercentage =
	 * rowData['taxPercentage']; var taxAmount = ((taxPercentage/100)*buyPrice);
	 * var BuyPriceWithTaxAmount = taxAmount + buyPrice; var tota = quantity *
	 * BuyPriceWithTaxAmount; $("#jqGrid").jqGrid("setCell", rowId, "Total",
	 * tota); },
	 * 
	 * 
	 * 
	 * 
	 * viewrecords: true, width: 1200, height: 250, rowNum: 10, pager:
	 * "#jqGridPager", sortorder: "desc", onSelectRow: function(productID){
	 * if(productID && productID!==lastsel){
	 * jQuery('#jqGrid').jqGrid('restoreRow',lastsel);
	 * jQuery('#jqGrid').jqGrid('editRow',productID,true);
	 * //jQuery('#jqGrid').jqGrid('editRow',productID,true,pickdates);
	 * lastsel=productID; } },
	 * 
	 * });
	 * 
	 * count = jQuery("#jqGrid").jqGrid('getGridParam', 'records'); var rowdata
	 * =$("#jqGrid").jqGrid('getGridParam','data'); var ids =
	 * jQuery("#jqGrid").jqGrid('getDataIDs');
	 * 
	 * 
	 * var prodName,com,packing; for (var j = 0; j < count; j++) { prodName =
	 * rowdata[j].productName; com = rowdata[j].manufacturer; packing =
	 * rowdata[j].weight;
	 * 
	 * var rowId = ids[j]; var rowData = jQuery('#jqGrid').jqGrid ('getRowData',
	 * rowId);
	 * 
	 * if (prodName == jsonData[i].productName && com ==
	 * jsonData[i].manufacturer && packing == jsonData[i].weight) {
	 * 
	 * newrow=false; alert("Product Name Already Inserted !!!"); var grid =
	 * jQuery("#jqGrid"); grid.trigger("reloadGrid"); break; } else { newrow =
	 * true; } }
	 * 
	 * if(newrow == true) {
	 *  // $("#credit").addRowData(i,jsonData[i]);
	 * $("#jqGrid").addRowData(count,jsonData[i]);
	 *  }
	 * 
	 * 
	 * 
	 * 
	 * //$("#jqGrid").addRowData(i,jsonData[i]); if(count==0 || count==null) { //
	 * $("#credit").addRowData(i,jsonData[i]);
	 * $("#jqGrid").addRowData(0,jsonData[i]); }
	 * 
	 * 
	 * 
	 * 
	 * //$("#jqGrid").addRowData(i,jsonData[i]); function pickdates(productID){
	 * jQuery("#"+productID+"_expiryDate","#jqGrid").datepicker({dateFormat:"yyyy-mm-dd"}); }
	 * jQuery("#jqGrid").jqGrid('navGrid',"#jqGridPager",{edit:false,add:false,del:true});
	 * 
	 * 
	 * 
	 * $('#jqGrid').navGrid('#jqGridPager', // the buttons to appear on the
	 * toolbar of the grid {edit: true, add: false,del: true, search: true,
	 * refresh: true, view: true, position: "left", cloneToTop: false }, //
	 * options for the Edit Dialog
	 * 
	 * 
	 * 
	 * 
	 *  {
	 * 
	 * afterSaveCell: function () { $(this).trigger('reloadGrid'); },
	 * editCaption: "The Edit Dialog", recreateForm: true, checkOnUpdate : true,
	 * checkOnSubmit : true, closeAfteredit: true, errorTextFormat: function
	 * (data) { return 'Error: ' + data.responseText }
	 * 
	 * 
	 *  },
	 * 
	 * 
	 *  // options for the Delete Dialogue { closeAfterdel:true, recreateForm:
	 * true, errorTextFormat: function (data) { return 'Error: ' +
	 * data.responseText },
	 * 
	 * onSelectRow: function(id) { if (id && id !== lastSel) {
	 * jQuery("#jqGrid").saveRow(lastSel, true, 'clientArray');
	 * jQuery("#jqGrid").editRow(id, true);
	 * 
	 * lastSel = id; console.log(id); } }
	 * 
	 * 
	 * });
	 *  // grid refresh code
	 * 
	 * });
	 * 
	 * 
	 * });
	 *  }
	 */
    
	}
	
	function productDetailInGridasperPO(){
		
		var params = {};
		itemparams = {};
	
	var input1 = document.getElementById('fk_cat_id'),
		list   = document.getElementById('cat_drop'),
				 i,fk_cat_id;
	
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input1.value) {
			fk_cat_id= list.options[i].getAttribute('data-value');
		}
	}
		  
	productId = $('#subCat').val();

	var splitText = productId.split(",");

	var fk_subCat_id = splitText[0];
	
	productId = $('#proName').val();
	
	var splitText = productId.split(",");
	
	var proName = splitText[0];
	var packweight = splitText[1];
	
	var booking = $('#booking').val();
			
	if((fk_cat_id == null && fk_cat_id == "" || fk_cat_id == undefined) || (productId == null || productId == "" ||  productId == undefined))
	{
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
	}
	else{
	
	toDate = $('#purchaseDate').val();
	
	var d = toDate.split("-");
	
	var todayDate = d[2]+"/"+d[1]+"/"+d[0];
		
	}
	
	itemparams["proName"] = proName;
	itemparams["fk_cat_id"] = fk_cat_id;
	itemparams["fk_subCat_id"] = fk_subCat_id;
	itemparams["productId"] = productId;
	itemparams["packweight"] = packweight;
	itemparams["booking"] = booking;
	
	document.getElementById('proName1').value = null;
	//document.getElementById('booking').value = null;
	var count = 0;
	var newrow;
	var rowId;
	var taxPercentage;
	
	itemparams["methodName"] = "getProductDetailsForGoodsReceiveForTax";
	
	$.post('/Shop/jsp/utility/controller.jsp',itemparams,function(data) {
		
		var jsonData = $.parseJSON(data);
		
		//var catmap = jsonData.list;
		//var mydata=catmap;
		/*if(jsonData.xyz == null || jsonData.xyz == "" || jsonData.xyz == " " || jsonData.xyz == undefined)
		{
			alert("Invalid Advance Booking No.");
			return false;
		}
		else
			{}*/
		
		$("#jqGrid").jqGrid("clearGridData", true).trigger("reloadGrid");
		
	    $.each(jsonData,function(i, v)
	    {		    
						var catIDforVAt = v.catIDforVAt;
						var productName = v.productName;
						var buyPrice = v.buyPrice;
						var salePrice = v.salePrice;
						var quantity = v.quantity;
						var weight = v.weight;
						var productID = v.productID;
						var manufacturer = v.manufacturer;
						var hsn = v.hsn;
						var lastsel = productID;
						var subCatId = v.subCatId;
						var unitName = v.unitName;
						//var gst = v.taxPercentage;
						var sgst = v.sgst;
						var cgst = v.cgst;
						var igst1 = v.igst1;
						var advancebookingId = v.advancebookingId;	
						var subCatName = v.subCatName;	
						
						$("#jqGrid").jqGrid({
							datatype : "local",
	
											colNames : [
													"Cat ID",
													"Product ID",
													"Product<br>Name", 
													"Sub<br>Category",
													"Company",
													"HSN",
													"PO<br>No",
													"MRP",
													"BP<br>Incl<br>Tax",
													"BP<br>Excl<br>Tax",
													"Sale<br>Price/Unit",
													/*"sale<br>Price<br>Ex.Tax",*/
													"Pkg",
													"Quantity",
													"Unit",
													/*"Shortage",*/
													"Total<br>Pkg",
													"Disc<br>%",
													"Disc<br>Amt",
													"SGST<br>%",
													"CGST<br>%",
													"IGST<br>%",
													"Batch<br>No.",
													"Expiry<br>Date",
													"Total<br>Excl<br>Tax",
													"Total",
													"SubCatid",
													"PkBookingID",
													"Unitvalue",
													"Unit desc"],
											
	
											colModel : [
													{
														name : "catIDforVAt",
														width : 120,
														hidden : true,
														align : 'center',
													},
													{
														name : "productID",
														width : 120,
														hidden : true,
														align : 'center',
													},
													{
														name : "productName",
														width : 120,
														align : 'center',
													},
													{
														name : "subCatName",
														width : 100,
														align : 'center',
													},
													{
														name : "manufacturer",
														width : 100,
														align : 'center',
													},
													{
														name : "hsn",
														width : 100,
														align : 'center',
														editable : true,
													},
													{
														name : "advancebookingId",
														width : 100,
														align : 'center',
													},
													{
														name : "mrp",
														width : 100,
														editable : false,
														align : 'center',
														hidden : true,
													},
													{
														name : "buyPrice",
														width : 100,
														editable : true,
														align : 'center',
													},
													{
														name : "buyPriceEx",
														width : 100,
														editable : false,
														align : 'center',
													},
													{
														name : "salePrice",
														width : 120,
														editable : false,
														hidden : true,
														align : 'center',
													},
													{
														name : "weight",
														width : 80,
														editable : false,
														align : 'center',
														hidden : true,
													},
													{
														name : "quantity",
														width : 100,
														editable :true,
														align : 'center',
													},
													{
														name : 'unitName',
														width : 90,
														// hidden:true,
														align : 'center',
													},
													{
														name : "weightAftShortMinus",
														width : 100,
														hidden : true,
														align : 'center',
													},
													{
														name : "Discount",
														width : 80,
														align : 'center',
														editable : true
													},
													{
														name : "DiscountAmount",
														width : 100,
														align : 'center',
														editable : false
													},
													{
														name : "sgst",
														width : 80,
														align : 'center',
														editable : true
													},
													{
														name : "cgst",
														width : 80,
														align : 'center',
														editable : true
													},
													{
														name : "igst1",
														width : 85,
														align : 'center',
														editable : true
													},
													{
														id: "batchNo",
														name : "batchNo",
														width : 80,
														editable : true,
														align : 'center',
														hidden : true,
													},
													{
											          id: 'expiryDate',
											          name: 'expiryDate', 
											          index: 'PremiumDate',
											          align: 'left', 
											          width : 100,
											          sortable: true,
											          editable: true, 
											          hidden : true,
											         //formatter: 'date',																         
											        /*  formatoptions:
											          { 
											              srcformat: 'ISO8601Long', 
											              newformat: 'd/m/Y', 
											              defaultValue:null 
											          },
											          width : 140,
											          editable: true, 
											          edittype: 'text', 
											          editoptions:
											          {
											              size: 12, 
											              maxlengh: 12, 
											              dataInit: function (element)
											              { 
											                  $(element).datepicker({ dateFormat: 'dd/mm/yy' })
											              }
											          }, 
											          editrules: {date: true} */
											          
											           editrules:{date:true, minValue:0}, datefmt:'Y-m-d',
										        	   editoptions:{dataInit: function (elem) {$(elem).datepicker({dateFormat:"yy-mm-dd",minDate :new Date()});} }
												          
												     },
												     {
														name : "TotalExTax",
														width : 100,
														align : 'center',
														editable : false
													},
												    {
														name : 'Total',
														width : 100,
														align : 'center',
													},
													{
														name : 'subCatId',
														width : 80,
														hidden : true,
														align : 'center',
													},
													{
														name : 'pkbookingId',
														width : 80,
														hidden : true,
														align : 'center',
													},
												
													{
														name : 'unitvalue',
														width : 80,
														hidden : true,
														align : 'center',
													},
													{
														name : 'unitdesc',
														width : 80,
														hidden : true,
														align : 'center',
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
												document.getElementById("discount").value = "";
												document.getElementById("discountAmount").value = "";
												
												/*Calculation of total after editing quantity*/
	
												// $(this).trigger('reloadGrid');
												var rowId = $("#jqGrid").jqGrid('getGridParam','selrow');
												var rowData = jQuery("#jqGrid").getRowData(rowId);
												var weight = rowData['weight'];
												var mrp = rowData['mrp'];
												var salePrice = rowData['salePrice'];
												var quantity = rowData['quantity'];
												var Discount = rowData['Discount'];
												var buyPrice = rowData['buyPrice'];
												var expiryDate = rowData['expiryDate'];
												var buyPriceEx = rowData['buyPriceEx'];
												var Total = rowData['Total'];
												var igst1 = rowData['igst1'];
												var sgst = rowData['sgst'];
												var cgst = rowData['cgst'];
												var gst = +sgst+ +cgst;
												
												
												//////quantity checking//////
												/*if(gst>0){
													 BpwTax = (buyPrice/(1+(gst/100)+(igst1/100)));
										      		  //$("#jqGrid").jqGrid("setCell", rowId, "buyPriceEx",  BpwTax.toFixed(2));
										      		 $("#jqGrid").jqGrid("setCell", rowId, "buyPriceEx", Math.round(BpwTax * 100) / 100);
												}
												if(igst1>0){
													BpwTax = (buyPrice/(1+(gst/100)+(igst1/100)));
										      		  $("#jqGrid").jqGrid("setCell", rowId, "buyPriceEx",  BpwTax.toFixed(2));
												}*/
											     
										if(cgst == "")
							            {
											cgst = "0";
					                   		var setZero = 0;
					                   		$("#jqGrid").jqGrid("setCell",rowId,"cgst",setZero);
							            }
										
										if(sgst == "")
							            {
											sgst = "0";
					                   		var setZero = 0;
					                   		$("#jqGrid").jqGrid("setCell",rowId,"sgst",setZero);
							            }
												
										if(Discount == "")
							            {
											Discount = "0";
					                   		var setZero = 0;
					                   		$("#jqGrid").jqGrid("setCell",rowId,"Discount",setZero);
							            }
										
										if(igst1 == "")
							            {
											igst1 = "0";
					                   		var setZero = 0;
					                   		$("#jqGrid").jqGrid("setCell",rowId,"igst1",setZero);
							            }
												
									    if(quantity == "")
							            {
							                quantity = "0";
					                   		var setZero = 0;
					                   		$("#jqGrid").jqGrid("setCell",rowId,"quantity",setZero);
							            }
									    
									    if(buyPriceEx == "")
							            {
									    	buyPriceEx = "0";
					                   		var setZero = 0;
					                   		$("#jqGrid").jqGrid("setCell",rowId,"buyPriceEx",setZero);
							            }
											
										var checkQuantity = /^[0-9]+\.?[0-9]*$/;
										
										if (quantity.match(checkQuantity)) 
										{
	
										} else {
										var msg = "Please Enter valid Quantity";
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
										$("#jqGrid").jqGrid("setCell",rowId,"quantity",setZero);
													
	
										var Total = 0;
										var Total1 = 0;
										var count = jQuery("#jqGrid").jqGrid('getGridParam','records');
										var allRowsInGrid1 = $('#jqGrid').getGridParam('data');
										var AllRows = JSON.stringify(allRowsInGrid1);
											
										for (var k = 0; k < count; k++) 
										{
										  if (allRowsInGrid1[k].Total == undefined
																|| allRowsInGrid1[k].Total == ""
																|| allRowsInGrid1[k].Total == "NaN") 
										    {
															
												allRowsInGrid1[k].Total = 0;
													
											}
	
											    Total1 = allRowsInGrid1[k].Total;
												Total = +Total+ +Total1;
													
											}
	
											document.getElementById("total").value = Total.toFixed(2);
											document.getElementById("duptotal").value = Total.toFixed(2);
											document.getElementById("grossTotal").value = Total.toFixed(2);
	
												return false;
	
												}
												
												
	                                                      //////////Buy Price validation///////////
										if (buyPrice != "") 
										{
										var numbers = /^[0-9]+\.?[0-9]*$/;
											if (buyPrice.match(numbers)) 
												{
	
												} 
												else 
												{
													var msg = "Please Enter Valid Buy Price";
													var dialog = bootbox.dialog({
																	
											message : '<p class="text-center">'+ msg.fontcolor("red").fontsize(5)+ '</p>',
											closeButton : false
											
												});
	
											setTimeout(
													function()
													{dialog.modal('hide');
														},
													1500);
	
												var setValue = 0;
									           	$("#jqGrid").jqGrid("setCell",rowId,"buyPrice",setValue);
									           		
									           		 	return false;	
												}
										}
										
										/*check buy price and mrp price*/
										
										/*if(Number(buyPrice) >  Number(mrp))
										{
											 var setValue = 0;
											 
											 var msg = "MRP must be Greater Than Buy Price";
											 var dialog = bootbox.dialog({
																
										message : '<p class="text-center">'+ msg.fontcolor("red").fontsize(5)+ '</p>',
										closeButton : false
										
											});

										setTimeout(
												function()
												{dialog.modal('hide');
													},
												1500);
										
								            $("#jqGrid").jqGrid("setCell",rowId,"buyPrice",setValue);
								            $("#jqGrid").jqGrid("setCell",rowId,"buyPriceEx",setValue);
								            $("#jqGrid").jqGrid("setCell",rowId,"Total",setValue);
								            document.getElementById("total").value = +setValue.toFixed(2);
											document.getElementById("grossTotal").value = +setValue.toFixed(2);
								           		
								           		 return false;									
										}*/
										
	                              //CGST and SGST and IGST Validation
										
										if( Number(cgst)>0 &&  Number(sgst)>0 && Number(igst1)>0 )
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
										
								            $("#jqGrid").jqGrid("setCell",rowId,"igst1",setValue);
								           		
								           		 return false;									
										}
										else
										{
											 if(Number(cgst)>0 && Number(igst1)>0)
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
									           		 $("#jqGrid").jqGrid("setCell",rowId,"cgst",setValue);
									           		 $("#jqGrid").jqGrid("setCell",rowId,"igst1",setValue);
									           		
									           		 return false;	 
											 }
											 else{
												 
												 if(Number(sgst)>0 && Number(igst1)>0)
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
										           		 $("#jqGrid").jqGrid("setCell",rowId,"sgst",setValue);
										           		 $("#jqGrid").jqGrid("setCell",rowId,"igst1",setValue);
										           		
										           		 return false;	
								        			 
													 
												 }
											 }
										}
										
										
								   //Mrp validation//		
											/*if (mrp != "") 
											{
												var numbers = /^[0-9]+\.?[0-9]*$/;
											if (mrp.match(numbers)) 
											{
	
											} 
											else 
											{
												var msg = "Please Enter Valid MRP Price";
												var dialog = bootbox.dialog({
																																 
												message : '<p class="text-center">'+ msg.fontcolor("red").fontsize(5)+ '</p>',
												closeButton : false
												});
	
												setTimeout(
													function() {
													dialog.modal('hide');
														},
														1500);
														
													var setValue;
													$("#jqGrid").jqGrid("setCell",rowId,"mrp",setValue);
	
													return false;
													}
												}*/
								//sale price validation//		
	
										if (salePrice != "") 
										{
											var numbers = /^[0-9]+\.?[0-9]*$/;
										if (salePrice.match(numbers)) 
										{
	
										} else 
										{
											 var msg = "Please Enter Valid Sale Price";
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
														
											var setValue;
											$("#jqGrid").jqGrid("setCell",rowId,"salePrice",setValue);
	
											return false;
											}
												}
							//mrp and sale price validation//				
									/*if (mrp != "" & salePrice != "") 
									{
									if (Number(salePrice) > Number(mrp)) 
									{
									var msg = "MRP must be Greater Than Sale price Per Unit";
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
											$("#jqGrid").jqGrid("setCell",rowId,"salePrice",setZero);
											$("#jqGrid").jqGrid("setCell",rowId,"Total",setZero);
	
										var Total = 0;
										var Total1 = 0;
										var count = jQuery("#jqGrid").jqGrid('getGridParam','records');
										var allRowsInGrid1 = $('#jqGrid').getGridParam('data');
										var AllRows = JSON.stringify(allRowsInGrid1);
										for (var k = 0; k < count; k++) {
										if (allRowsInGrid1[k].Total == undefined
																	|| allRowsInGrid1[k].Total == ""
																	|| allRowsInGrid1[k].Total == "NaN")
										{
																
											allRowsInGrid1[k].Total = 0;
															
										}
	
											Total1 = allRowsInGrid1[k].Total;
											Total = +Total+ +Total1;
											}
	
											document.getElementById("total").value = +Total.toFixed(2);
										    document.getElementById("duptotal").value = +Total.toFixed(2);
											document.getElementById("grossTotal").value = +Total.toFixed(2);
	
											return false;
											}
													
									}*/
	
												/*if (dcNum >= 0) {
													var W = weight;
													var d = dcNum;
													var weightWithShortage = W
															- d;
													$(
															"#jqGrid")
															.jqGrid(
																	"setCell",
																	rowId,
																	"weightAftShortMinus",
																	weightWithShortage);
												}
	*/
												
												var buyPrice = rowData['buyPrice'];
												
												var cgst = rowData['cgst'];
												var sgst = rowData['sgst'];
												var gst = +cgst+ +sgst;
												var igst1 = rowData['igst1'];
												var DiscountAmount= rowData['DiscountAmount'];
												var Discount= rowData['Discount'];
												

												/*/////calculation of gst////
*/														
												var checkDiscount = /^[0-9]+\.?[0-9]*$/;
												  if(Discount.match(checkDiscount))
												  {
													  
													  if(Number(Discount) >= 100)
											  	  {
														  
											  		  var setZero = 0;
											  		  alert("In discount")
											  		  myAlert("Discount Percentage Must Be Less Than 100");
											  		 
											  		  $("#jqGrid").jqGrid("setCell", rowId, "DiscountAmount", setZero);
											      	
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
											  		
											  		  $("#jqGrid").jqGrid("setCell", rowId, "DiscountAmount", setZero);
											      
											  	  }
													 else
												{
											  		  myAlert("Pleaee Enter Valid Discount value");
											  		 
											      	  $("#jqGrid").jqGrid("setCell", rowId, "DiscountAmount", setZero);
											      	
											      	  totalCalC();
											      	  totalDisC();
											      	  return false;
													  }
												  }			
												  
												//Buy price excluding tax calc//
												  
												  var checkbuyPrice= /^[0-9]+\.?[0-9]*$/;
												  if(buyPrice.match(checkbuyPrice))
											    {
											      	  if(Number(buyPrice) > 0)
											  		  {
											      		  BpwTax = (buyPrice/(1+(gst/100)+(igst1/100)));
											      		  $("#jqGrid").jqGrid("setCell", rowId, "buyPriceEx",  BpwTax.toFixed(2));
											     
											      	if(Number(gst) > 0)
											      	{  
											      		 DiscountAmount= (BpwTax*(Discount/100));
											      		 finalBp = (BpwTax- DiscountAmount) * quantity;
											      		 newTaxAmt = (((finalBp*quantity)*gst)/100);
											      			  
											      		 var oneProTax = (((finalBp)*gst)/100);
											      		 newFinalBp = finalBp+ oneProTax;
											      		 tota = newFinalBp;
											      													      			 
											      		$("#jqGrid").jqGrid("setCell", rowId, "DiscountAmount", DiscountAmount.toFixed(2));	  
													    $("#jqGrid").jqGrid("setCell", rowId, "TotalExTax", finalBp.toFixed(2));
													    $("#jqGrid").jqGrid("setCell", rowId, "Total", tota.toFixed(2));
													 
													     totalCalC();
													     totalDisC();	
											      		}
											      	else if(Number(igst1) > 0)
											      	{
											      		DiscountAmount= (BpwTax*(Discount/100));
											      		 finalBp = (BpwTax- DiscountAmount) * quantity;
											      		 newTaxAmt = (((finalBp*quantity)*igst1)/100);
											      			  
											      		 var oneProTax = (((finalBp)*igst1)/100);
											      		 newFinalBp = finalBp+ oneProTax;
											      		 tota = newFinalBp;
											      													      			 
											      		$("#jqGrid").jqGrid("setCell", rowId, "DiscountAmount", DiscountAmount.toFixed(2));	  
													    $("#jqGrid").jqGrid("setCell", rowId, "TotalExTax", finalBp.toFixed(2));
													    $("#jqGrid").jqGrid("setCell", rowId, "Total", tota.toFixed(2));
													 
													     totalCalC();
													     totalDisC();
											      	}
											      	
											      	else if(Number(gst) == 0 && Number(igst1) == 0)
											      	{
											      		 DiscountAmount= (BpwTax*(Discount/100));
											      		 finalBp = (BpwTax- DiscountAmount) * quantity;
											      		 newTaxAmt = (((finalBp*quantity)*igst1)/100);
											      			  
											      		 var oneProTax = (((finalBp)*igst1)/100);
											      		 newFinalBp = finalBp+ oneProTax;
											      		 tota = newFinalBp;
											      													      			 
											      		$("#jqGrid").jqGrid("setCell", rowId, "DiscountAmount", DiscountAmount.toFixed(2));	  
													    $("#jqGrid").jqGrid("setCell", rowId, "TotalExTax", finalBp.toFixed(2));
													    $("#jqGrid").jqGrid("setCell", rowId, "Total", tota.toFixed(2));
													 
													     totalCalC();
													     totalDisC();
											      	}
											      		else
											            {
											      		
											      var setZero = 0; 
												  $("#jqGrid").jqGrid("setCell", rowId, "DiscountAmount", setZero);
											   
											            }
											    }
										else
									         {
											  	var setZero = 0;
											 
											    $("#jqGrid").jqGrid("setCell", rowId, "DiscountAmount", setZero);
											    $("#jqGrid").jqGrid("setCell", rowId, "Total", setZero);
											
											    return false;
												}
											    }				        	  
										else
											{
												var setZero = 0;
												alert("Pleae Enter Valid Buy Price");
												$("#jqGrid").jqGrid("setCell", rowId, "buyPrice", setZero);
												$("#jqGrid").jqGrid("setCell", rowId, "buyPriceEx", setZero);
											  	$("#jqGrid").jqGrid("setCell", rowId, "DiscountAmount", setZero);
											  	$("#jqGrid").jqGrid("setCell", rowId, "Total", setZero);
											
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
										          var Total1 = allRowsInGrid1[k].Total; //grid total 

										        if(Total1 != undefined)
										        {
										        		Total = +Total + +Total1;
										        		  }
										        	  }
										        	  for (var j = 0; j < count; j++)
										        	  {
										        		  var Total2 = allRowsInGrid1[j].taxAmount;
										        		  var Total3 = allRowsInGrid1[j].Total;
										        		  if(Total2 != undefined)
										        		  {
										        			  totAmtWithTax = +totAmtWithTax + +Total2 + +Total3;
										        		  }
										        	  }
										        	  document.getElementById("total").value = Total.toFixed(2);//Math.round(Total);
										        	  document.getElementById("grossTotal").value = Total.toFixed(2);//Math.round(Total);
										        	  var totAmount = Total.toFixed(2);//Math.round(Total);
											        }
										        	  
										      function totalDisC()
											   {
												        //TOTAL DISCOUNT AMOUNT
												        var TotalDisAmt = 0;
												        var TotalBPAmt = 0;
												        var disPer = 0;
												        var count = jQuery("#list4").jqGrid('getGridParam', 'records');
												        var allRowsInGrid1 = $('#list4').getGridParam('data');
												        var AllRows=JSON.stringify(allRowsInGrid1);
												        for (var l = 0; l < count; l++)
												        {
												          var TotalDisAmt1 = allRowsInGrid1[l].DiscountAmount;
												          var TotalBPAmt1 = allRowsInGrid1[l].buyPriceEx;
												        		  
												        if(TotalBPAmt1 != undefined)
												        {
												        	TotalBPAmt = (+TotalBPAmt + +TotalBPAmt1).toFixed(2);
												        }
												        if(TotalDisAmt1 != undefined)
												        {
												        	TotalDisAmt = (+TotalDisAmt + +TotalDisAmt1).toFixed(2);
												        	disPer = ((TotalDisAmt/TotalBPAmt)*100).toFixed(2);
												        }						        	 
												        	  }
												        	  /*document.getElementById("discount1").value = disPer;*/
												        	 // document.getElementById("discount").value = TotalDisAmt;
											        	 }
																			        											
												if (gst != "") {
													
													var setZero = 0;
													
												  //var checkGstIgst = /^[0-9]+$/;
													var checkGstIgst = /^[0-9]+\.?[0-9]*$/;
												  //var checkGstIgst = /^[-+]?[0-9]+\.[0-9]+$/; 
													if (String(gst).match(checkGstIgst)) 
													{
														
													} else 
													{
													    var msg = "Please Enter Valid GST %";
														var dialog = bootbox.dialog({
																	
													message : '<p class="text-center">'+ msg.fontcolor("red").fontsize(5)+ '</p>',
													closeButton : false
													});
	
												setTimeout(
														function() {
														dialog.modal('hide');
																
														},
																1500);
	
														igst1 = 0;
														
												$("#jqGrid").jqGrid("setCell",rowId,"gst",setZero);
												return false;
													
													}
												}
												
											if (igst1 != "") 
											{
												//var checkGstIgst = /^[0-9]+$/;
												var checkGstIgst = /^[0-9]+\.?[0-9]*$/;
												if (igst1.match(checkGstIgst))
												{
													} else
													{
														var msg = "Please Enter Valid IGST %";
														var dialog = bootbox
																.dialog({
																	
											message : '<p class="text-center">'+ msg.fontcolor("red").fontsize(5)+ '</p>',
										    closeButton : false
													});
	
											setTimeout(
												function() 
												{
														
													dialog.modal('hide');
													},
													1500);
	
												gst = 0;
														
											    $("#jqGrid").jqGrid("setCell",rowId,"igst1",setZero);
														
														return false;
													}
												}
	
								          /*if (gst == "" || igst1 == "") 
								          {
										         var msg = "Please Enter Either GST OR IGST";
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
										  }*/
								
	
									         if ((gst > Number(0) && igst1 > Number(0))	|| (igst1 > 0 && gst != 0)) 
									          {
	
												var msg = "Please Enter Either GST OR IGST";
												var dialog = bootbox
															.dialog({
																
												message : '<p class="text-center">'+ msg.fontcolor("red").fontsize(5)+ '</p>',
												closeButton : false
													});
	
												setTimeout(
													function() {
														dialog.modal('hide');
															},
															1500);
	
												}
	
											if (gst > 0 || igst1 == "")
											{
													igst1 = 0;
											}
	
											if (igst1 > 0 || gst == "")
											{
													gst = 0;
											}
	
											if (igst1 != 0)
											{
												//return false;
											} 
											else if (igst1 == 0) 
											{	
											}
	
											var Total = 0;
											var Total1 = 0;
											var count = jQuery("#jqGrid").jqGrid('getGridParam','records');
											var allRowsInGrid1 = $('#jqGrid').getGridParam('data');
											var AllRows = JSON.stringify(allRowsInGrid1);
												for (var k = 0; k < count; k++) 
												{
													if (allRowsInGrid1[k].Total == undefined
															|| allRowsInGrid1[k].Total == ""
															|| allRowsInGrid1[k].Total == "NaN") 
													{
														
														allRowsInGrid1[k].Total = 0;
													}
	
													Total1 = allRowsInGrid1[k].Total;
													Total = +Total+ +Total1;
												}
	                               
											document.getElementById("total").value = +Total.toFixed(2);
											document.getElementById("duptotal").value = +Total.toFixed(2);
											document.getElementById("grossTotal").value = +Total.toFixed(2);
	
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
	
						var prodName, com, packing;
						for (var j = 0; j < count; j++) 
						{
							prodName = rowdata[j].productName;
							com = rowdata[j].manufacturer;
							packing = rowdata[j].weight;
							
							var rowId = ids[j];
							var rowData = jQuery('#jqGrid').jqGrid('getRowData',rowId);
	
						if (prodName == jsonData[i].productName && com == jsonData[i].manufacturer && packing == jsonData[i].weight) 
						{	
							         newrow = false;
	                                             
							           var msg = "Product Name Already Inserted !!!";
							           var dialog = bootbox.dialog({
											
						          message : '<p class="text-center">'+ msg.fontcolor("red").fontsize(5)+ '</p>',
						          closeButton : false
										});
	
								   setTimeout(function() 
								   {
									dialog.modal('hide');
								    }, 1500);
	
								   var grid = jQuery("#jqGrid");
								   grid.trigger("reloadGrid");
								   break;
							      } else 
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
						function pickdates(productID) 
						{
							jQuery("#" + productID+ "_expiryDate","#jqGrid").datepicker({
							dateFormat : "yyyy-mm-dd"
						});
						}
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
												
												var total = document.getElementById("total").value;
												document.getElementById("grossTotal").value = Number(total).toFixed(2);
												document.getElementById("discount").value = "";
												document.getElementById("discountAmount").value = "";
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
												var weight = rowData['weight'];
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
	
												var quantity = rowData['quantity'];
												var buyPrice = rowData['buyPrice'];
												var iGst = rowData['igst1'];
												var cgst = rowData['cgst'];
												var sgst = rowData['sgst'];
												var Gst = +cgst+ +sgst;
	
												if (iGst != 0) {
													var taxPercentage = iGst;
													
													var tota = quantity	* buyPrice;
													
													$("#jqGrid").jqGrid("setCell",rowId,"Total",tota);
													
												} else if (iGst == 0) {													
													var taxPercentage = Number(Gst);
													
													var tota = quantity	* buyPrice;
													
													$("#jqGrid").jqGrid("setCell",rowId,"Total",tota);
	
												}
												
												var Total = 0;
												var count = jQuery("#jqGrid").jqGrid('getGridParam','records');
												
												var allRowsInGrid1 = $('#jqGrid').getGridParam('data');
												var AllRows = JSON.stringify(allRowsInGrid1);
	
												for (var k = 0; k < count; k++) 
												{
													var Total1 = allRowsInGrid1[k].Total;
													Total = +Total+ +Total1;
												}
	
											document.getElementById("total").value = Total.toFixed(2);
											document.getElementById("duptotal").value = Total.toFixed(2);
											document.getElementById("grossTotal").value = Total.toFixed(2);
	
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
	function productDetailnonGridasperPO(){
		
		var params= {};
		 
		var booking=$('#booking').val();
		
		$("#total").append($("<input/>").attr("value","").text());
		$("#grossTotal").append($("<input/>").attr("value","").text());
		
		params["booking"]= booking;
		
		params["methodName"] = "getPurchaseOrderForEditNonGrid";
		
		$.post('/Shop/jsp/utility/controller.jsp', params,function(data){
			
			var jsonData = $.parseJSON(data);
			var catmap = jsonData.list;
			$.each(jsonData,function(i,v)
			{
				document.getElementById("total").value = v.grossTotal;
				document.getElementById("grossTotal").value = v.grossTotal;
			});
		}).error(function(jqXHR, textStatus, errorThrown){
			if(textStatus==="timeout") {

			}
		});
	}
	
	function batchNoValidate() {
		var rowId = $("#jqGrid").jqGrid('getGridParam', 'selrow');
	var rowData = jQuery("#jqGrid").getRowData(rowId);
	var count = jQuery("#jqGrid").jqGrid('getGridParam', 'records');
	var allRowsInGrid = $('#jqGrid').getGridParam('data');// to get all rows
										// of grid
	var AllRows = JSON.stringify(allRowsInGrid);
	for (var i = 0; i < count; i++) {
		var catId = allRowsInGrid[i].catId;
		if (catId != 1) {
			var batchNo = allRowsInGrid[i].batchNo;
			var expiryDate = allRowsInGrid[i].expiryDate;
			/*
	 * var batchNo = rowData['batchNo'+i]; var expiryDate =
	 * rowData['expiryDate'+i];
	 */
	if (batchNo == undefined || batchNo == "") {
	alert("Please Enter Batch number At Column No :: " + ++i);
		return true;
	} else {
		if (expiryDate == undefined || expiryDate == "") {
	alert("Please Enter Expiry Date At Column No :: " + ++i);
						return true;
					}
				}
			}
		}
		addingGoodsReceive()
	}
	
	function batchNoValidateForBooked() {
		
	var rowId = $("#jqGrid1").jqGrid('getGridParam', 'selrow');
	var rowData = jQuery("#jqGrid1").getRowData(rowId);
	var count = jQuery("#jqGrid1").jqGrid('getGridParam', 'records');
	var allRowsInGrid = $('#jqGrid1').getGridParam('data');// to get all rows
										// of grid
	var AllRows = JSON.stringify(allRowsInGrid);
	for (var i = 0; i < count; i++) {
		var catId = allRowsInGrid[i].catId;
		if (catId != 1) {
			var batchNo = allRowsInGrid[i].batchNo;
			var expiryDate = allRowsInGrid[i].expiryDate;
			/*
	 * var batchNo = rowData['batchNo'+i]; var expiryDate =
	 * rowData['expiryDate'+i];
	 */
	if (batchNo == undefined || batchNo == "") {
	alert("Please Enter Batch number At Column No :: " + ++i);
		return true;
	} else {
		if (expiryDate == undefined || expiryDate == "") {
	alert("Please Enter Expiry Date At Column No :: " + ++i);
						return true;
					}
				}
			}
		}
		addBookedGoodsReceive()
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
	
	/*------------------------Advance Booking fetch Data for Grid-------------------------------*/
	
	function advBookingproductDetailInGrid(){
				
		var params = {};
		itemparams = {};
		
		var input1 = document.getElementById('fk_cat_id'),
			list   = document.getElementById('cat_drop'),
					 i,fk_cat_id;
		
		for (i = 0; i < list.options.length; ++i) {
			if (list.options[i].value === input1.value) {
				fk_cat_id= list.options[i].getAttribute('data-value');
			}
		}
			  
		productId = $('#subCat').val();

		var splitText = productId.split(",");

		var fk_subCat_id = splitText[0];
		
		productId = $('#proName').val();
		
		var splitText = productId.split(",");
		
		var proName = splitText[0];
		var packweight = splitText[1];
		
		if((fk_cat_id == null && fk_cat_id == "" || fk_cat_id == undefined) || (productId == null || productId == "" ||  productId == undefined))
		{
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
		}
				
		itemparams["proName"] = proName;
		itemparams["fk_cat_id"] = fk_cat_id;
		itemparams["fk_subCat_id"] = fk_subCat_id;
		itemparams["productId"] = productId;
		itemparams["packweight"] = packweight;
		
		document.getElementById('proName1').value = null;
		var count = 0;
		var newrow;
		var rowId;
		var taxPercentage;
		
		itemparams["methodName"] = "getProductDetailsForAdvanceBooking";
		
		$.post('/Shop/jsp/utility/controller.jsp',itemparams,function(data) {
			var jsonData = $.parseJSON(data);
		  	
		$.each(jsonData, function(i, v) {
							
							var productID = v.productID;
							var catID = v.catID;
							var subcatID = v.subcatID;
							var prodName = v.prodName;
							var packing = v.packing;
							var company = v.company;
							var hsn = v.hsn;
							var unit = v.unit;
							var catName = v.catName;
							var buyPrice = v.buyPrice;
							var salePrice = v.salePrice;
							var mrp = v.mrp;
							var taxPercentage = v.taxPercentage;
							var taxName = v.taxName;
							var salepriceEx = v.salepriceEx;
							var sgst = v.sgst;
							var cgst = v.cgst;	
							var subCatName = v.subCatName;
							var buyPriceEx = v.buyPriceEx;
							var Discount = v.Discount;
							var DiscountAmount = v.DiscountAmount;
														
							$("#jqGrid").jqGrid(
											{datatype : "local",
		
												colNames : [
														"Cat ID",
														"Product ID",
														"Product<br>Name", 
														"Sub<br>Category", 
														"Company",
														"HSN",
														"BP<br>Incl<br>Tax",
														"BP<br>Excl<br>Tax",
														"SP<br>Incl<br>Tax",
														"Pkg",
														"Quantity",
														"Unit",
														"Disc<br>%",
														"Disc<br>Amt",
														"SGST",
														"CGST",
														"IGST",
														"Total<br>Excl<br>Tax",
														"Total",
														"SubCatid" ],
												
		
												colModel : [
														{
															name : "catID",
															width : 120,
															hidden : true,
															align : 'center',
														},
														{
															name : "productID",
															width : 120,
															hidden : true,
															align : 'center',
														},
														{
															name : "prodName",
															width : 120,
															align : 'center',
														},
														{
															name : "subCatName",
															width : 120,
															hidden : false,
															align : 'center',
														},
														{
															name : "company",
															width : 100,
															editable : false,
															align : 'center',
														},
														{
															name : 'hsn',
															width : 70,
														    hidden : false,
															align : 'center',
														},
														{
															name : 'buyPrice',
															width : 70,
														    hidden : false,
														    editable : true,
															align : 'center',
														},
														{
															name : 'buyPriceEx',
															width : 70,
														    hidden : false,
															align : 'center',
														},
														{
															name : 'salePrice',
															width : 70,
														    hidden : true,
															align : 'center',
														},
														{
															name : "packing",
															width : 80,
															editable : false,
															align : 'center',
															hidden : true,
														},
														{
															name : "quantity",
															width : 90,
															editable :true,
															align : 'center',
														},
														{
															name : 'unit',
															width : 90,
															hidden:false,
															align : 'center',
														},
														{
															name : 'Discount',
															width : 70,
															hidden:false,
															align : 'center',
															editable : true,
														},
														{
															name : 'DiscountAmount',
															width : 70,
															hidden:false,
															align : 'center',
														},
														{
															name : "sgst",
															width : 80,
															align : 'center',
															editable : true
														},
														{
															name : "cgst",
															width : 80,
															align : 'center',
															editable : true
														},
														{
															name : "igst1",
															width : 80,
															align : 'center',
															editable : true
														},
														{
															name : 'TotalExTax',
															width : 70,
															hidden:false,
															align : 'center',
														},
														{
															name : 'Total',
															width : 100,
															align : 'center',
														},
														{
															name : "subcatID",
															width : 120,
															hidden : true,
															align : 'center',
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
													/*Calculation of total after editing quantity*/
		
													var rowId = $("#jqGrid").jqGrid('getGridParam','selrow');
													var rowData = jQuery("#jqGrid").getRowData(rowId);
													
													var packing = rowData['packing'];
													var mrp = rowData['mrp'];
													var salePrice = rowData['salePrice'];
													var Discount = rowData['Discount'];
													var buyPrice = rowData['buyPrice'];
													var expiryDate = rowData['expiryDate'];
													var buyPriceEx = rowData['buyPriceEx'];
													var quantity = rowData['quantity'];
													var Total = rowData['Total'];
													var igst1 = rowData['igst1'];
													var sgst = rowData['sgst'];
													var cgst = rowData['cgst'];
													var gst = +sgst+ +cgst;
																									
									/*---------------------quantity checking--------------------------*/
													
											if(cgst == "")
								            {
												cgst = "0";
						                   		var setZero = 0;
						                   		$("#jqGrid").jqGrid("setCell",rowId,"cgst",setZero);
								            }
											
											if(sgst == "")
								            {
												sgst = "0";
						                   		var setZero = 0;
						                   		$("#jqGrid").jqGrid("setCell",rowId,"sgst",setZero);
								            }
													
											if(Discount == "")
								            {
												Discount = "0";
						                   		var setZero = 0;
						                   		$("#jqGrid").jqGrid("setCell",rowId,"Discount",setZero);
								            }
											
											if(igst1 == "")
								            {
												igst1 = "0";
						                   		var setZero = 0;
						                   		$("#jqGrid").jqGrid("setCell",rowId,"igst1",setZero);
								            }		
										    if(quantity == "")
								            {
								                quantity = "0";
						                   		var setZero = 0;
						                   		$("#jqGrid").jqGrid("setCell",rowId,"quantity",setZero);
								            }
										    if(buyPriceEx == "")
								            {
										    	buyPriceEx = "0";
						                   		var setZero = 0;
						                   		$("#jqGrid").jqGrid("setCell",rowId,"buyPriceEx",setZero);
								            }
										    												
										    var checkQuantity = /^[0-9]+\.?[0-9]*$/;
											
											if (quantity.match(checkQuantity)) 
											{
		
											} else {
											var msg = "Please Enter valid Quantity";
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
											$("#jqGrid").jqGrid("setCell",rowId,"quantity",setZero);
														
		
											var Total = 0;
											var Total1 = 0;
											var count = jQuery("#jqGrid").jqGrid('getGridParam','records');
											var allRowsInGrid1 = $('#jqGrid').getGridParam('data');
											var AllRows = JSON.stringify(allRowsInGrid1);
												
											for (var k = 0; k < count; k++) 
											{
											  if (allRowsInGrid1[k].Total == undefined
																	|| allRowsInGrid1[k].Total == ""
																	|| allRowsInGrid1[k].Total == "NaN") 
											    {
																
													allRowsInGrid1[k].Total = 0;
														
												}
		
												    Total1 = allRowsInGrid1[k].Total;
													Total = +Total+ +Total1;
														
												}
		
												document.getElementById("total").value = Total.toFixed(2);
												//document.getElementById("duptotal").value = Total.toFixed(2);
												//document.getElementById("grossTotal").value = Total.toFixed(2);
		
													return false;
		
													}
													
													
		                                                      //////////Buy Price validation///////////
											if (buyPrice != "") 
											{
											var numbers = /^[0-9]+\.?[0-9]*$/;
												if (buyPrice.match(numbers)) 
													{
		
													} 
													else 
													{
														var msg = "Please Enter Valid Buy Price";
														var dialog = bootbox.dialog({
																		
												message : '<p class="text-center">'+ msg.fontcolor("red").fontsize(5)+ '</p>',
												closeButton : false
												
													});
		
												setTimeout(
														function()
														{dialog.modal('hide');
															},
														1500);
		
													var setValue = 0;
										           	$("#jqGrid").jqGrid("setCell",rowId,"buyPrice",setValue);
										           		
										           		 	return false;	
													}
											}
											
											/*check buy price and mrp price*/
											
											/*if(Number(buyPrice) >  Number(mrp))
											{
												 var setValue = 0;
												 
												 var msg = "MRP must be Greater Than Buy Price";
												 var dialog = bootbox.dialog({
																	
											message : '<p class="text-center">'+ msg.fontcolor("red").fontsize(5)+ '</p>',
											closeButton : false
											
												});

											setTimeout(
													function()
													{dialog.modal('hide');
														},
													1500);
											
									            $("#jqGrid").jqGrid("setCell",rowId,"buyPrice",setValue);
									            $("#jqGrid").jqGrid("setCell",rowId,"buyPriceEx",setValue);
									            $("#jqGrid").jqGrid("setCell",rowId,"Total",setValue);
									            document.getElementById("total").value = +setValue.toFixed(2);
												document.getElementById("grossTotal").value = +setValue.toFixed(2);
									           		
									           		 return false;									
											}*/
											
		                              //CGST and SGST and IGST Validation
											
											if( Number(cgst)>0 &&  Number(sgst)>0 && Number(igst1)>0 )
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
											
									            $("#jqGrid").jqGrid("setCell",rowId,"igst1",setValue);
									           		
									           		 return false;									
											}
											else
											{
												 if(Number(cgst)>0 && Number(igst1)>0)
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
										           		 $("#jqGrid").jqGrid("setCell",rowId,"cgst",setValue);
										           		 $("#jqGrid").jqGrid("setCell",rowId,"igst1",setValue);
										           		
										           		 return false;	 
												 }
												 else{
													 
													 if(Number(sgst)>0 && Number(igst1)>0)
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
											           		 $("#jqGrid").jqGrid("setCell",rowId,"cgst",setValue);
											           		 $("#jqGrid").jqGrid("setCell",rowId,"igst1",setValue);
											           		
											           		 return false;	
									        			 
														 
													 }
												 }
											}
											
											
									   //Mrp validation//		
												/*if (mrp != "") 
												{
													var numbers = /^[0-9]+\.?[0-9]*$/;
												if (mrp.match(numbers)) 
												{
		
												} 
												else 
												{
													var msg = "Please Enter Valid MRP Price";
													var dialog = bootbox.dialog({
																																	 
													message : '<p class="text-center">'+ msg.fontcolor("red").fontsize(5)+ '</p>',
													closeButton : false
													});
		
													setTimeout(
														function() {
														dialog.modal('hide');
															},
															1500);
															
														var setValue;
														$("#jqGrid").jqGrid("setCell",rowId,"mrp",setValue);
		
														return false;
														}
													}*/
									//sale price validation//		
		
											if (salePrice != "") 
											{
												var numbers = /^[0-9]+\.?[0-9]*$/;
											if (salePrice.match(numbers)) 
											{
		
											} else 
											{
												 var msg = "Please Enter Valid Sale Price";
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
															
												var setValue;
												$("#jqGrid").jqGrid("setCell",rowId,"salePrice",setValue);
		
												return false;
												}
													}
								//mrp and sale price validation//				
										/*if (mrp != "" & salePrice != "") 
										{
										if (Number(salePrice) > Number(mrp)) 
										{
										var msg = "MRP must be Greater Than Sale price Per Unit";
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
												$("#jqGrid").jqGrid("setCell",rowId,"salePrice",setZero);
												$("#jqGrid").jqGrid("setCell",rowId,"Total",setZero);
		
											var Total = 0;
											var Total1 = 0;
											var count = jQuery("#jqGrid").jqGrid('getGridParam','records');
											var allRowsInGrid1 = $('#jqGrid').getGridParam('data');
											var AllRows = JSON.stringify(allRowsInGrid1);
											for (var k = 0; k < count; k++) {
											if (allRowsInGrid1[k].Total == undefined
																		|| allRowsInGrid1[k].Total == ""
																		|| allRowsInGrid1[k].Total == "NaN")
											{
																	
												allRowsInGrid1[k].Total = 0;
																
											}
		
												Total1 = allRowsInGrid1[k].Total;
												Total = +Total+ +Total1;
												}
		
												document.getElementById("total").value = +Total.toFixed(2);
											    document.getElementById("duptotal").value = +Total.toFixed(2);
												document.getElementById("grossTotal").value = +Total.toFixed(2);
		
												return false;
												}
														
										}*/
		
													/*if (dcNum >= 0) {
														var W = weight;
														var d = dcNum;
														var weightWithShortage = W
																- d;
														$(
																"#jqGrid")
																.jqGrid(
																		"setCell",
																		rowId,
																		"weightAftShortMinus",
																		weightWithShortage);
													}
		*/
													
													var buyPrice = rowData['buyPrice'];
													
													var cgst = rowData['cgst'];
													var sgst = rowData['sgst'];
													var gst = +cgst+ +sgst;
													var igst1 = rowData['igst1'];
													var DiscountAmount= rowData['DiscountAmount'];
													var Discount= rowData['Discount'];
													

													/*/////calculation of gst////
	*/														
													var checkDiscount = /^[0-9]+\.?[0-9]*$/;
													  if(Discount.match(checkDiscount))
													  {
														  
														  if(Number(Discount) >= 100)
												  	  {
															  
												  		  var setZero = 0;
												  		  alert("In discount")
												  		  myAlert("Discount Percentage Must Be Less Than 100");
												  		 
												  		  $("#jqGrid").jqGrid("setCell", rowId, "DiscountAmount", setZero);
												      	
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
												  		
												  		  $("#jqGrid").jqGrid("setCell", rowId, "DiscountAmount", setZero);
												      
												  	  }
														 else
													{
												  		  myAlert("Pleaee Enter Valid Discount value");
												  		 
												      	  $("#jqGrid").jqGrid("setCell", rowId, "DiscountAmount", setZero);
												      	
												      	  totalCalC();
												      	  totalDisC();
												      	  return false;
														  }
													  }			
													  
													//Buy price excluding tax calc//
													  
													  var checkbuyPrice= /^[0-9]+\.?[0-9]*$/;
													  if(buyPrice.match(checkbuyPrice))
												    {
												      	  if(Number(buyPrice) > 0)
												  		  {
												      		  BpwTax = (buyPrice/(1+(gst/100)+(igst1/100)));
												      		  $("#jqGrid").jqGrid("setCell", rowId, "buyPriceEx",  BpwTax.toFixed(2));
												     
												      	if(Number(gst) > 0)
												      	{  
												      		 DiscountAmount= (BpwTax*(Discount/100));
												      		 finalBp = (BpwTax- DiscountAmount) * quantity;
												      		 newTaxAmt = (((finalBp*quantity)*gst)/100);
												      			  
												      		 var oneProTax = (((finalBp)*gst)/100);
												      		 newFinalBp = finalBp+ oneProTax;
												      		 tota = newFinalBp;
												      													      			 
												      		$("#jqGrid").jqGrid("setCell", rowId, "DiscountAmount", DiscountAmount.toFixed(2));	  
														    $("#jqGrid").jqGrid("setCell", rowId, "TotalExTax", finalBp.toFixed(2));
														    $("#jqGrid").jqGrid("setCell", rowId, "Total", tota.toFixed(2));
														 
														     totalCalC();
														     totalDisC();	
												      		}
												      	else if(Number(igst1) > 0)
												      	{
												      		DiscountAmount= (BpwTax*(Discount/100));
												      		 finalBp = (BpwTax- DiscountAmount) * quantity;
												      		 newTaxAmt = (((finalBp*quantity)*igst1)/100);
												      			  
												      		 var oneProTax = (((finalBp)*igst1)/100);
												      		 newFinalBp = finalBp+ oneProTax;
												      		 tota = newFinalBp;
												      													      			 
												      		$("#jqGrid").jqGrid("setCell", rowId, "DiscountAmount", DiscountAmount.toFixed(2));	  
														    $("#jqGrid").jqGrid("setCell", rowId, "TotalExTax", finalBp.toFixed(2));
														    $("#jqGrid").jqGrid("setCell", rowId, "Total", tota.toFixed(2));
														 
														     totalCalC();
														     totalDisC();
												      	}
												      	
												      	else if(Number(gst) == 0 && Number(igst1) == 0)
												      	{
												      		 DiscountAmount= (BpwTax*(Discount/100));
												      		 finalBp = (BpwTax- DiscountAmount) * quantity;
												      		 newTaxAmt = (((finalBp*quantity)*igst1)/100);
												      			  
												      		 var oneProTax = (((finalBp)*igst1)/100);
												      		 newFinalBp = finalBp+ oneProTax;
												      		 tota = newFinalBp;
												      													      			 
												      		$("#jqGrid").jqGrid("setCell", rowId, "DiscountAmount", DiscountAmount.toFixed(2));	  
														    $("#jqGrid").jqGrid("setCell", rowId, "TotalExTax", finalBp.toFixed(2));
														    $("#jqGrid").jqGrid("setCell", rowId, "Total", tota.toFixed(2));
														 
														     totalCalC();
														     totalDisC();
												      	}
												      		else
												            {
												      		
												      var setZero = 0; 
													  $("#jqGrid").jqGrid("setCell", rowId, "DiscountAmount", setZero);
												   
												            }
												    }
											else
										         {
												  	var setZero = 0;
												 
												    $("#jqGrid").jqGrid("setCell", rowId, "DiscountAmount", setZero);
												    $("#jqGrid").jqGrid("setCell", rowId, "Total", setZero);
												
												    return false;
													}
												    }				        	  
											else
												{
													var setZero = 0;
													alert("Pleae Enter Valid Buy Price");
													$("#jqGrid").jqGrid("setCell", rowId, "buyPrice", setZero);
													$("#jqGrid").jqGrid("setCell", rowId, "buyPriceEx", setZero);
												  	$("#jqGrid").jqGrid("setCell", rowId, "DiscountAmount", setZero);
												  	$("#jqGrid").jqGrid("setCell", rowId, "Total", setZero);
												
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
											          var Total1 = allRowsInGrid1[k].Total; //grid total 

											        if(Total1 != undefined)
											        {
											        		Total = +Total + +Total1;
											        		  }
											        	  }
											        	  for (var j = 0; j < count; j++)
											        	  {
											        		  var Total2 = allRowsInGrid1[j].taxAmount;
											        		  var Total3 = allRowsInGrid1[j].Total;
											        		  if(Total2 != undefined)
											        		  {
											        			  totAmtWithTax = +totAmtWithTax + +Total2 + +Total3;
											        		  }
											        	  }
											        	  document.getElementById("total").value = Total.toFixed(2);//Math.round(Total);
											        	  //document.getElementById("grossTotal").value = Total.toFixed(2);//Math.round(Total);
											        	  var totAmount = Total.toFixed(2);//Math.round(Total);
												        }
											        	  
											      function totalDisC()
												   {
													        //TOTAL DISCOUNT AMOUNT
													        var TotalDisAmt = 0;
													        var TotalBPAmt = 0;
													        var disPer = 0;
													        var count = jQuery("#list4").jqGrid('getGridParam', 'records');
													        var allRowsInGrid1 = $('#list4').getGridParam('data');
													        var AllRows=JSON.stringify(allRowsInGrid1);
													        for (var l = 0; l < count; l++)
													        {
													          var TotalDisAmt1 = allRowsInGrid1[l].DiscountAmount;
													          var TotalBPAmt1 = allRowsInGrid1[l].buyPriceEx;
													        		  
													        if(TotalBPAmt1 != undefined)
													        {
													        	TotalBPAmt = (+TotalBPAmt + +TotalBPAmt1).toFixed(2);
													        }
													        if(TotalDisAmt1 != undefined)
													        {
													        	TotalDisAmt = (+TotalDisAmt + +TotalDisAmt1).toFixed(2);
													        	disPer = ((TotalDisAmt/TotalBPAmt)*100).toFixed(2);
													        }						        	 
													        	  }
													        	  /*document.getElementById("discount1").value = disPer;*/
													        	 // document.getElementById("discount").value = TotalDisAmt;
												        	 }
																				        											
													if (gst != "") {
														
														var setZero = 0;
														
													  //var checkGstIgst = /^[0-9]+$/;
														var checkGstIgst = /^[0-9]+\.?[0-9]*$/;
													  //var checkGstIgst = /^[-+]?[0-9]+\.[0-9]+$/; 
														if (String(gst).match(checkGstIgst)) 
														{
															
														} else 
														{
														    var msg = "Please Enter Valid GST %";
															var dialog = bootbox.dialog({
																		
														message : '<p class="text-center">'+ msg.fontcolor("red").fontsize(5)+ '</p>',
														closeButton : false
														});
		
													setTimeout(
															function() {
															dialog.modal('hide');
																	
															},
																	1500);
		
															igst1 = 0;
															
													$("#jqGrid").jqGrid("setCell",rowId,"gst",setZero);
													return false;
														
														}
													}
													
												if (igst1 != "") 
												{
													//var checkGstIgst = /^[0-9]+$/;
													var checkGstIgst = /^[0-9]+\.?[0-9]*$/;
													if (igst1.match(checkGstIgst))
													{
														} else
														{
															var msg = "Please Enter Valid IGST %";
															var dialog = bootbox
																	.dialog({
																		
												message : '<p class="text-center">'+ msg.fontcolor("red").fontsize(5)+ '</p>',
											    closeButton : false
														});
		
												setTimeout(
													function() 
													{
															
														dialog.modal('hide');
														},
														1500);
		
													gst = 0;
															
												    $("#jqGrid").jqGrid("setCell",rowId,"igst1",setZero);
															
															return false;
														}
													}
		
									          /*if (gst == "" || igst1 == "") 
									          {
											         var msg = "Please Enter Either GST OR IGST";
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
											  }*/
									
		
										         if ((gst > Number(0) && igst1 > Number(0))	|| (igst1 > 0 && gst != 0)) 
										          {
		
													var msg = "Please Enter Either GST OR IGST";
													var dialog = bootbox
																.dialog({
																	
													message : '<p class="text-center">'+ msg.fontcolor("red").fontsize(5)+ '</p>',
													closeButton : false
														});
		
													setTimeout(
														function() {
															dialog.modal('hide');
																},
																1500);
		
													}
		
												if (gst > 0 || igst1 == "")
												{
														igst1 = 0;
												}
		
												if (igst1 > 0 || gst == "")
												{
														gst = 0;
												}
		
												if (igst1 != 0)
												{
													//return false;
												} 
												else if (igst1 == 0) 
												{	
												}
		
												var Total = 0;
												var Total1 = 0;
												var count = jQuery("#jqGrid").jqGrid('getGridParam','records');
												var allRowsInGrid1 = $('#jqGrid').getGridParam('data');
												var AllRows = JSON.stringify(allRowsInGrid1);
													for (var k = 0; k < count; k++) 
													{
														if (allRowsInGrid1[k].Total == undefined
																|| allRowsInGrid1[k].Total == ""
																|| allRowsInGrid1[k].Total == "NaN") 
														{
															
															allRowsInGrid1[k].Total = 0;
														}
		
														Total1 = allRowsInGrid1[k].Total;
														Total = +Total+ +Total1;
													}
		                               
												document.getElementById("total").value = +Total.toFixed(2);
												//document.getElementById("duptotal").value = +Total.toFixed(2);
												//document.getElementById("grossTotal").value = +Total.toFixed(2);
		
												},
		
												viewrecords : true,
												width : 1200,
												rowNum : 10,
												pager : "#jqGridPager",
												sortorder : "desc",
												onSelectRow : function(productID) 
												{
													if (productID && productID !== lastsel) 
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
		
							var prodName1, com1, packing1;
							for (var j = 0; j < count; j++) 
							{
								prodName1 = rowdata[j].prodName;
								com1 = rowdata[j].company;
								packing1 = rowdata[j].packing;
		
								var rowId = ids[j];
								var rowData = jQuery('#jqGrid').jqGrid('getRowData',rowId);
		
							if (prodName1 == jsonData[i].prodName && com1 == jsonData[i].company && packing1 == jsonData[i].packing) 
							{
		
								         newrow = false;
		                                             
								           var msg = "Product Name Already Inserted !!!";
								           var dialog = bootbox.dialog({
												
							          message : '<p class="text-center">'+ msg.fontcolor("red").fontsize(5)+ '</p>',
							          closeButton : false
											});
		
									   setTimeout(function() 
									   {
										dialog.modal('hide');
									    }, 1500);
		
									   var grid = jQuery("#jqGrid");
									   grid.trigger("reloadGrid");
									   break;
								      } else 
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
							function pickdates(productID) 
							{
								jQuery("#" + productID+ "_expiryDate","#jqGrid").datepicker({
								dateFormat : "yyyy-mm-dd"
							});
							}
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
													
													var total = document.getElementById("total").value;
													//document.getElementById("grossTotal").value = Number(total).toFixed(2);
													//document.getElementById("discount").value = "";
													//document.getElementById("discountAmount").value = "";
															
													$('#jqGrid').trigger('reloadGrid');
													
													/* Calculation of total after editing quantity */
				
													var rowId = $("#jqGrid").jqGrid('getGridParam','selrow');
													var rowData = jQuery("#jqGrid").getRowData(rowId);
													//var weight = rowData['weight'];
													
													var quantity = rowData['quantity'];
													var buyPrice = rowData['buyPrice'];
													var iGst = rowData['igst1'];
													var cgst = rowData['cgst'];
													var sgst = rowData['sgst'];
													var Gst = +cgst+ +sgst;
		
													var Total = 0;
													var count = jQuery("#jqGrid").jqGrid('getGridParam','records');
													
													var allRowsInGrid1 = $('#jqGrid').getGridParam('data');
													var AllRows = JSON.stringify(allRowsInGrid1);
		
													for (var k = 0; k < count; k++) 
													{
														var Total1 = allRowsInGrid1[k].Total;
														Total = +Total+ +Total1;
													}
		
												document.getElementById("total").value = Total.toFixed(2);
												//document.getElementById("duptotal").value = Total.toFixed(2);
												//document.getElementById("grossTotal").value = Total.toFixed(2);
		
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
	
	/*----------------validation for advance booking-----------------*/
	
	function addingAdvanvceBooking(){
		
	
		
		
		if (document.goodsReceiveForm.supplier.value == "")
		{		
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
		
		if(document.goodsReceiveForm.fk_cat_id.value == "")
	{
		var msg="Please Enter Product Category";
		
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
	
			if(document.goodsReceiveForm.subCat.value == "")
	{
		var msg="Please Enter Product Category";
		
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
		
		
		
				if(document.goodsReceiveForm.proName.value == "")
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
		
				if(document.goodsReceiveForm.proName1.value == "")
	{
		var msg="Please Enter All Product Name";
		
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
		
		
		
		
		/*if (document.goodsReceiveForm.mailid.value == "")
		{
			var msg="Please Enter Email ID";
			var dialog = bootbox.dialog({
						  
			    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
			    closeButton: false
			});
			
			setTimeout(function() {
				dialog.modal('hide');
			}, 1500);
			return false;
		}
		
		var emailIDcheck = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if (document.goodsReceiveForm.mailid.value.match(emailIDcheck))
		{	}
		else
		{
			var msg="Please Enter Valid Email ID";
			var dialog = bootbox.dialog({
						  
			    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
			    closeButton: false
			});
			
			setTimeout(function() {
				dialog.modal('hide');
			}, 1500);
			
			return false;	
		}*/
	/*	if (document.goodsReceiveForm.proName1.value == "")
		{		
			var msg="Please Select All Product Name";
			var dialog = bootbox.dialog({
						   
			    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
			    closeButton: false
			});
			
			setTimeout(function() {
				dialog.modal('hide');
			}, 1500);
			return false;
		}*/
		
		addAdvanvceBooking();
	}
	
function addAdvanvceBooking(){
		
	document.getElementById("save").disabled = true;
	
	var params = {};
	
	var input = document.getElementById('supplier'), 
	list = document.getElementById('sup_drop'),
		   i, supplier;

	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			supplier = list.options[i].getAttribute('data-value');
		}
	}

	var supplierId = supplier;
	
	var input1 = document.getElementById('fk_cat_id'), 
    list = document.getElementById('cat_drop'), 
           i, fk_cat_id;

	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input1.value) {
			fk_cat_id = list.options[i].getAttribute('data-value');
		}
	}
	
	var catName = document.getElementById('fk_cat_id').value;
	subCatId = $('#subCat').val();
		
	var splitText = subCatId.split(",");

	var fk_subCat_id = splitText[1];
		
	var count = jQuery("#jqGrid").jqGrid('getGridParam', 'records');
	var allRowsInGrid = $('#jqGrid').getGridParam('data');// to get all rows of grid
	var AllRows = JSON.stringify(allRowsInGrid);
	for (var i = 0; i < count; i++)
	{
		var catID = allRowsInGrid[i].catID;
		params["catID" + i] = catID;
		
		var productID = allRowsInGrid[i].productID;
		params["productID" + i] = productID;
		
		var prodName = allRowsInGrid[i].prodName;
		params["prodName" + i] = prodName;
		
		var catName = allRowsInGrid[i].catName;
		params["catName" + i] = catName;
		
		var subCatName = allRowsInGrid[i].subCatName;
		params["subCatName" + i] = subCatName;
		
		var company = allRowsInGrid[i].company;
		params["company" + i] = company;
		
		var hsn = allRowsInGrid[i].hsn;
		params["hsn" + i] = hsn;
		
		var packing = allRowsInGrid[i].packing;
		params["packing" + i] = packing;
		
		var unit = allRowsInGrid[i].unit;
		if(unit == 'Box'){
			unit = 'pcs' ;
			params["unit"+i] = unit;
		}else{
			params["unit"+i] = unit;
		}
				
		var quantity = allRowsInGrid[i].quantity;
		if(quantity == undefined || quantity == 0 || quantity == null || quantity == '')
		{			
			var msg="Please Enter Quantity<br>For Product => "+(count+1)+" "+prodName;;
			var dialog = bootbox.dialog({
				
			    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
			    closeButton: false
			});
			
			setTimeout(function() {
				dialog.modal('hide');
			}, 1500);				
			document.getElementById("save").disabled = false;
			return false;
		}
		else if(quantity != '')
		{
			//var numbers = /^[0-9]+$/;
			var numbers = /^[0-9]+\.?[0-9]*$/;
			if(quantity.match(numbers))
			{
				params["quantity" + i] = quantity;				
			}
			else
			{
				var msg="Please Enter Valid Quantity<br>For Product => "+(count+1)+" "+prodName;;
				var dialog = bootbox.dialog({
					
				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
				    closeButton: false
				});
				
				setTimeout(function() {
					dialog.modal('hide');
				}, 1500);				
				document.getElementById("save").disabled = false;
				return false;
			}
		}
		
		var Total = allRowsInGrid[i].Total;
		params["Total" + i] = Total;
		
		var subcatID = allRowsInGrid[i].subcatID;
		params["subcatID" + i] = subcatID;
		
		var buyPrice = allRowsInGrid[i].buyPrice;
		params["buyPrice" + i] = buyPrice;
		
		var buyPriceEx = allRowsInGrid[i].buyPriceEx;
		params["buyPriceEx" + i] = buyPriceEx;
		
		var Discount = allRowsInGrid[i].Discount;
		params["Discount" + i] = Discount;
		
		var DiscountAmount = allRowsInGrid[i].DiscountAmount;
		params["DiscountAmount" + i] = DiscountAmount;
		
		var TotalExTax = allRowsInGrid[i].TotalExTax;
		params["TotalExTax" + i] = TotalExTax;
		
		var sgst = allRowsInGrid[i].sgst;
		params["sgst" + i] = sgst;
		
		var cgst = allRowsInGrid[i].cgst;
		params["cgst" + i] = cgst;
		
		var igst1 = allRowsInGrid[i].igst1;
		params["igst1" + i] = igst1;
	}
	
	var supplierName = $('#supplier').val();
	var mailid = $('#mailid').val();
	if(mailid==null || mailid=="" || mailid==undefined){
		mailid="abc@gmail.com";
	}
	
	var totalqty = $('#total').val();
	var podate = $('#podate').val();
	
	params["supplierName"] = supplierName;
	params["catName"] = catName;
	params["mailid"] = mailid;
	params["fk_cat_id"] = fk_cat_id;
	params["fk_subCat_id"] = fk_subCat_id;
	params["supplierId"] = supplierId;
	params["count"] = count;
	params["totalqty"] = totalqty;
	params["podate"] = podate;
	
	params["methodName"] = "addingAdvanceBooking";
	
	$.post('/Shop/jsp/utility/controller.jsp', params, function(data)
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
			window.open("porderPDF.jsp");		   
	
	}).error(function(jqXHR, textStatus, errorThrown) {
		if (textStatus === "timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});
}

