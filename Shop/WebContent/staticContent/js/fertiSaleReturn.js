//sale return for billing
function saleReturnVal(){
	var Customertype = $('#customerType').val();
	var Billno = $('#billNo').val();
	
	/*if(Customertype == "selected"){
		alert("Please Select Customer Type");
		
		return false;
	}*/
	
		/*if(Customertype != null && Customertype != "")*/
		if(Customertype == "selected")
		
		{
			var msg="Please  Select Customer type ";
			var dialog = bootbox.dialog({
		    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		    closeButton: false
			});
			
			setTimeout(function() {
				dialog.modal('hide');
			}, 1500);
			return false;
		}
	

	/*if(Billno == ""){
		alert("Please Select Bill No");
		return false;
	}*/
	
		/*if(Billno != null && Billno != "")*/
		if(Billno == "")
		
		{
			var msg="Please Billno ";
			var dialog = bootbox.dialog({
		    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		    closeButton: false
			});
			
			setTimeout(function() {
				dialog.modal('hide');
			}, 1500);
			return false;
		}
	

	
/*					if(Billno != null && Billno != "")
	{
		var msg="Please Enter Billno ";
		
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
	
	saleReturn();
}

function saleReturn(){

	document.getElementById("save").disabled = true;
	var params={};
	
	
    var billNo = $('#billNo').val();
    var grossTotal = $('#grossTotal').val();
	
	var splitText = billNo.split(",");
	
	var billno = splitText[0];
	var custName = splitText[1];
			
	var count = jQuery("#jqGrid").jqGrid('getGridParam', 'records');
	var allRowsInGrid = $('#jqGrid').getGridParam('data');//to get all rows of grid
	var AllRows=JSON.stringify(allRowsInGrid);
	for (var i = 0; i < count; i++) {

		var barcodeNo = allRowsInGrid[i].barcodeNo;
		params["barcodeNo"+i] = barcodeNo;
		
		var itemName = allRowsInGrid[i].itemName;
		params["itemName"+i] = itemName;
		
		var companyName = allRowsInGrid[i].companyName;
		params["companyName"+i] = companyName;
		
		var hsn = allRowsInGrid[i].hsn;
		params["hsn"+i] = hsn;
		
		var batchNumber = allRowsInGrid[i].batchNumber;
		params["batchNumber"+i] = batchNumber;
		
		var buyPrice = allRowsInGrid[i].buyPrice;                  //unit price
		params["buyPrice"+i] = buyPrice;
		
		var mrp = allRowsInGrid[i].mrp;
		params["mrp"+i] = mrp;
		
		var salePrice = allRowsInGrid[i].salePrice;
		params["salePrice"+i] = salePrice;
		
		var taxPercentage = allRowsInGrid[i].taxPercentage;
		params["taxPercentage"+i] = taxPercentage;
		
		var weight = allRowsInGrid[i].weight;                     //packing
		params["weight"+i] = weight;
		
		var unitName = allRowsInGrid[i].unitName;
		params["unitName"+i] = unitName;
		
		var quantity = allRowsInGrid[i].quantity;
		params["quantity"+i] = quantity;
		
		var returnQuantity = allRowsInGrid[i].returnQuantity;
		params["returnQuantity"+i] = returnQuantity;
		
		if(Number(quantity) < Number(returnQuantity))
			{
				alert("Please Enter Return Quantity less than Available Quantity");
				document.getElementById("save").disabled = false;
				return false;				
			}
		
		var alltotalforReturn = allRowsInGrid[i].alltotalforReturn;
		params["alltotalforReturn"+i] = alltotalforReturn;
		
		var returnTotal = allRowsInGrid[i].returnTotal;
		params["returnTotal"+i] = returnTotal;
		
		var pkBillingId = allRowsInGrid[i].pkBillingId;
		params["pkBillingId"+i] = pkBillingId;
		
		var PkGoodreceiveId = allRowsInGrid[i].PkGoodreceiveId;
		params["PkGoodreceiveId"+i] = PkGoodreceiveId;
	}
	
	params["billno"] = billno;
	params["custName"] = custName;
	params["grossTotal"] = grossTotal;
	
	params["count"] = count;
	
   params["methodName"] = "returnSale";
    
    
	
	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
 	    	{
 				 /*var msg="Data Added successfully "*/
		
 				var msg=data;
				var dialog = bootbox.dialog({
					
				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
				    closeButton: false
				});
				
				setTimeout(function() {
					dialog.modal('hide');
				}, 1500);				
				document.getElementById("save").disabled = false;
				return false;
 				/*document.getElementById("save").disabled = false;*/
 				 				
 	    	}).error(function(jqXHR, textStatus, errorThrown){
 	    		if(textStatus==="timeout") {
 	    			$(loaderObj).hide();
 	    			$(loaderObj).find('#errorDiv').show();
 	    		}
 	    	});
}

//sale return for seed
function seedReturn(){
	var params={};
	var input1 = document.getElementById('seedBillNo'),
	list = document.getElementById('seedBillNo_drop'),
	i,seedBillNo;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input1.value) {
			seedBillNo = list.options[i].getAttribute('data-value');
		}
	}	
	var count = jQuery("#jqGridSeed").jqGrid('getGridParam', 'records');
	var allRowsInGrid = $('#jqGridSeed').getGridParam('data');//to get all rows of grid
	var AllRows=JSON.stringify(allRowsInGrid);
	for (var i = 0; i < count; i++) {

		var pkSeedBillingId = allRowsInGrid[i].pkSeedBillingId;
		params["pkSeedBillingId"+i] = pkSeedBillingId;
		
		var availbleQuantity = allRowsInGrid[i].availbleQuantity;
		params["availbleQuantity"+i] = availbleQuantity;
		
		var productName = allRowsInGrid[i].productName;
		params["productName"+i] = productName;
		
		var company = allRowsInGrid[i].company;
		params["company"+i] = company;
		
		var weight = allRowsInGrid[i].weight;
		params["weight"+i] = weight;
		
		var quantity1 = allRowsInGrid[i].quantity1;
		params["quantity1"+i] = quantity1;
		
		var batchNo = allRowsInGrid[i].batchNo;
		params["batchNo"+i] = batchNo;
		
		var salePrice = allRowsInGrid[i].salePrice;
		params["salePrice"+i] = salePrice;
		
		var mrp = allRowsInGrid[i].mrp;
		params["mrp"+i] = mrp;
		
		var taxPercentage = allRowsInGrid[i].taxPercentage;
		params["taxPercentage"+i] = taxPercentage;
		
		var aadhar = allRowsInGrid[i].aadhar;
		params["aadhar"+i] = aadhar;
		
		var customerName = allRowsInGrid[i].customerName;
		params["customerName"+i] = customerName;
		
		var insertDate = allRowsInGrid[i].insertDate;
		params["insertDate"+i] = insertDate;
		
		var discount = allRowsInGrid[i].discount;
		params["discount"+i] = discount;
		
		var discAmt = allRowsInGrid[i].discAmt;
		params["discAmt"+i] = discAmt;
	}
	params["bill_no"] = seedBillNo;
	params["count"] = count;
    params["methodName"] = "seedSaleReturn";
	
	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
 	    	{
 				/*alert(data);
 				location.reload();	*/
 				
 					 var msg=data;
				var dialog = bootbox.dialog({
					
				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
				    closeButton: false
				});
				
				setTimeout(function() {
					dialog.modal('hide');
				}, 1500);				
				document.getElementById("save").disabled = false;
				return false;
 				
 				//returntMinusFromStockPurchase();
 				
 	    	}
 	    	).error(function(jqXHR, textStatus, errorThrown){
 	    		if(textStatus==="timeout") {
 	    			$(loaderObj).hide();
 	    			$(loaderObj).find('#errorDiv').show();
 	    		}
 	    	});
}

function getAllSaleReturnBills() {

	var input = document.getElementById('customerName'), 
		list  = document.getElementById('cust_drop'),
		        i, customerName;

	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			customerName = list.options[i].getAttribute('data-value');
		}
	}

	var customerName = customerName;
	$("#bill_no").empty();
	$("#bill_no").append($("<option></option>").attr("value", "").text("Select Cash Bill Number"));
	var params = {};

	params["methodName"] = "getAllBillByCustomerSaleReturn";

	params["customerName"] = customerName;

	$.post('/Shop/jsp/utility/controller.jsp', params, function(data) {
		var jsonData = $.parseJSON(data);
		// var jsonData = jsonData.list;
		$.each(jsonData, function(i, v) {
			$("#bill_no").append($("<option></option>").attr("value", i).text(v.billNo));
		});
	})

}

//Pesticide return for seed
function pesticideReturn(){
	var params={};
	var input1 = document.getElementById('pestiBillNo'),
	list = document.getElementById('pestiBillNo_drop'),
	i,pestiBillNo;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input1.value) {
			pestiBillNo = list.options[i].getAttribute('data-value');
		}
	}	
	var count = jQuery("#jqGridPesti").jqGrid('getGridParam', 'records');
	var allRowsInGrid = $('#jqGridPesti').getGridParam('data');//to get all rows of grid
	var AllRows=JSON.stringify(allRowsInGrid);
	for (var i = 0; i < count; i++) {

		var pkPesticideBillingId = allRowsInGrid[i].pkPesticideBillingId;
		params["pkPesticideBillingId"+i] = pkPesticideBillingId;
		
		var availbleQuantity = allRowsInGrid[i].availbleQuantity;
		params["availbleQuantity"+i] = availbleQuantity;
		
		var productName = allRowsInGrid[i].productName;
		params["productName"+i] = productName;
		
		var company = allRowsInGrid[i].company;
		params["company"+i] = company;
		
		var weight = allRowsInGrid[i].weight;
		params["weight"+i] = weight;
		
		var quantity1 = allRowsInGrid[i].quantity1;
		//alert("Quantity----------"+quantity1)
		params["quantity1"+i] = quantity1;
		
		var batchNo = allRowsInGrid[i].batchNo;
		params["batchNo"+i] = batchNo;
		
		var salePrice = allRowsInGrid[i].salePrice;
		params["salePrice"+i] = salePrice;
		
		var mrp = allRowsInGrid[i].mrp;
		params["mrp"+i] = mrp;
		
		var taxPercentage = allRowsInGrid[i].taxPercentage;
		params["taxPercentage"+i] = taxPercentage;
		
		var aadhar = allRowsInGrid[i].aadhar;
		params["aadhar"+i] = aadhar;
		
		var customerName = allRowsInGrid[i].customerName;
		params["customerName"+i] = customerName;
		
		var insertDate = allRowsInGrid[i].insertDate;
		params["insertDate"+i] = insertDate;
		
	}
	params["bill_no"] = pestiBillNo;
	params["count"] = count;
    params["methodName"] = "pesticideSaleReturn";
	
	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
 	    	{
 				alert(data);
 				//returntMinusFromStockPurchase();
 				location.reload();	
 				
 	    	}
 	    	).error(function(jqXHR, textStatus, errorThrown){
 	    		if(textStatus==="timeout") {
 	    			$(loaderObj).hide();
 	    			$(loaderObj).find('#errorDiv').show();
 	    		}
 	    	});
}

//Fetch data for sale return from bill table//cash
function fetchDataForSale() {
	
	var bill_no = $('#bill_no').val();
	
	var input = document.getElementById('customerName'),
		list  = document.getElementById('cust_drop'),
				i,customerName;
	
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			customerName = list.options[i].getAttribute('data-value');
		}
	}
	
	var params= {};
		
	params["bill_no"]= bill_no;
	//params["customerName"] = customerName;
	
	//document.getElementById('bill_no').value = " ";
	
	params["methodName"] ="getAllFertiIetmByBillNo";
	
	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
			{ 
		var jsonData = $.parseJSON(data);
		//$("#jqGrid1").jqGrid("clearGridData", true);
		
		$("#jqGrid").jqGrid("clearGridData", true).trigger("reloadGrid");

		$.each(jsonData,function(i,v)
				{
			$("#jqGrid").jqGrid({
			
				datatype:"local",

				colNames: ["Sr No","catId","Bill No","Customer Name","Product Name","Company","Packing","Sale Price","M.R.P","Available Quantity","Return Quantity","Sale Date","Credit Customer Name","Tax %","Discount","DiscountAmt" ],

				colModel: [
				           { 	
				        	   name: "pkfertilizerBillId",
				        	   hidden:true
				        	   //resizable: true,
				           },
				           
				        /* { 	
				        	   name: "fkGoodsReceive",
				        	   hidden:true
				        	   //resizable: true,
				           },*/
				           { 	
				        	   name: "catId",
				        	   hidden:true
				        	   //resizable: true,
				           },
				           { 	
				        	   name: "billno",
				        	   width:20,
				        	   //hidden:false
				        	   //resizable: true,
				           },
				           { 	
				        	   name: "customerName",
				        	   width:50,
				        	   //hidden:true
				        	   //resizable: true,
				           },
				           /*{
				        	   name: "aadhar",
				        	   width: 90,
				        	   hidden:true
				        	   
				           },*/
				           
				           
				           /*{ 	
				        	   name: "barcode",
				        	   width: 90,
				        	   hidden:true
				        	   //resizable: true,
				           },*/
				           
				           
				           { 	
				        	   name: "productName",
				        	   width:100,
				        	   //resizable: true,
				           },
				         
				           {
				        	   name: "company",
				        	   width: 80
				           },
				           {
				        	   name: "weight",
				        	   width: 40
				           },
				        
				           {
				        	   name: "salePrice",
				        	   width: 40,
				        	   editable:true,
				           },
				       
				           {
				        	   name : "mrp",
				        	   //formatter: sumFmatter,
				        	   editable:true,
				        	   width: 40
				           },
				           
				           
				           /*{
				        	   name : "salepriceEx",
				        	   //formatter: sumFmatter,
				        	   width: 60
				           },
				           */ 
				           {
				        	   name: "availbleQuantity",
				        	   width: 40,
				        	   
				           },
				           {
				        	   name: "totalInGrid",
				        	   width: 40,
				        	   ///editable:true,
				           },
				           {
				        	   name: "insertDate",
				        	   width:60
				           },
				           { 	
				        	   name: "customerHiddenName",
				        	   width: 40,
				        	   //hidden:true
				        	   //resizable: true,
				           },
				           /*{
				        	   name: "returnquantity",
				        	   width: 40,
				        	   editable:true,
				        	   editrules:{
		                            custom_func: validatePositive,
		                            custom: true,
		                            number:true,
		                            required: true
		                        }
				           },*/
				         
				          /* {
				        	   name: "insertDate",
				        	   width:60
				           },*/
				           
				           {
				        	   name: "taxPercentage",
				        	   width:40,
				        	   editable:true,
				           },
				           
				           /*{
				        	   name : "salepriceEx",
				        	   //formatter: sumFmatter,
				        	   editable:false,
				        	   width: 60
				           },*/
				           
				           {
				        	   name : "discount",
				        	   //formatter: sumFmatter,
				        	   editable:true,
				        	   width: 60
				           },
				           
				           {
				        	   name : "discAmt",
				        	   //formatter: sumFmatter,
				        	   editable:true,
				        	   width: 60
				           },
				           
				           /*{
				        	   name : "Total",
				        	   //formatter: sumFmatter,
				        	   width: 60
				           }*/
				           
				           
				           ],


				           sortorder : 'desc',
				           
				           multiselect: false,	
				           loadonce: false,
				           rownumbers:true,
				           forcePlaceholderSize: true ,
				           'cellEdit':true,
				           viewrecords: true,
				           width: 1300,
				           shrinkToFit:true,
				           rowNum: 10,
				           pager: "#jqGridPager",
				           sortorder: "desc",
			});

			$("#jqGrid").addRowData(i,jsonData[i]);
			
			$('#jqGrid').navGrid('#jqGridPager',
					// the buttons to appear on the toolbar of the grid
					{edit: true, add: false,del: true, search: true, refresh: true, view: true, position: "left", cloneToTop: false },
					// options for the Edit Dialog
					
					{
						/*afterSubmit: function () {
							  $(this).trigger('reloadGrid');
						},*/
						editCaption: "The Edit Dialog",
						recreateForm: true,
						checkOnUpdate : true,
						checkOnSubmit : true,
						closeAfteredit: true,
						errorTextFormat: function (data) {
							return 'Error:' + data.responseText
						}
					
					},
					{},
					// options for the Delete Dialogue
					{    
						/*afterSubmit: function () {
							  $(this).trigger('reloadGrid');
						},*/
						closeAfterdel:true,
						recreateForm: true,
						errorTextFormat: function (data)
						{
							return 'Error: ' + data.responseText
						},

						onSelectRow: function(id)
						{
							if (id && id !== lastSel)
							{
								jQuery("#jqGrid").saveRow(lastSel, true, 'clientArray');
								jQuery("#jqGrid").editRow(id, true);
								lastSel = id;
								console.log(id);
							}
						}
						
						
					});
			
		// grid refresh code	
			
				});
		        function validatePositive(value, column) {
		        var rowId =$("#jqGrid").jqGrid('getGridParam','selrow');  
	            var rowData = jQuery("#jqGrid").getRowData(rowId);
	            var quan = rowData['availbleQuantity']; 	
		        	
                if (value > quan)
                return [false, "Return Quantity Must Be Less Than "+quan+ " !!!"];
                else
                return [true, ""];
                }   
       
			}); 
			
}
	

//Seed billing details for sale return/////////credit
function fetchSeedDataForSale(){
	
	var input = document.getElementById('seedBillNo'),
	list = document.getElementById('seedBillNo_drop'),
	i,bill_no;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			bill_no = list.options[i].getAttribute('data-value');
		}
	}
	
	var params= {};
	
	params["methodName"] = "getAllSeedBillinfDetailsByBillNo";
	
	params["bill_no"]= bill_no;
	
	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
			{ 

		 
		var jsonData = $.parseJSON(data);
		//$("#jqGrid1").jqGrid("clearGridData", true);
		
		$("#jqGridSeed").jqGrid("clearGridData", true).trigger("reloadGrid");

	
		 
		$.each(jsonData,function(i,v)
				{
			$("#jqGridSeed").jqGrid({
			
				datatype:"local",

				colNames: ["pk SeedBill ID","catId","customerName","Adhar No","Product Name","Company","Packing","Batch Number","Sale Price","M.R.P","Available Quantity","Return Quantity","Sale Date","Tax %" ],

				colModel: [
				           { 	
				        	   name: "pkSeedBillingId",
				        	   hidden:true
				        	   //resizable: true,
				           },
				          
				           { 	
				        	   name: "catId",
				        	   hidden:true
				        	   //resizable: true,
				           },
				           { 	
				        	   name: "customerName",
				        	   hidden:true
				        	   //resizable: true,
				           },
				           {
				        	   name: "aadhar",
				        	   width: 90
				           },
				           { 	
				        	   name: "productName",
				        	   width:100,
				        	   //resizable: true,
				           },
				         
				           {
				        	   name: "company",
				        	   width: 80
				           },
				           {
				        	   name: "weight",
				        	   width: 60
				           },
				           {
				        	   name: "batchNo",
				        	   width: 60
				           },
				        
				           {
				        	   name: "salePrice",
				        	   width: 60,
				           },
				       
				           {
				        	   name : 'mrp',
				        	   //formatter: sumFmatter,
				        	   width: 60
				           },
				           
				           {
				        	   name: "availbleQuantity",
				        	   width: 40,
				        	   
				           },
				           {
				        	   name: "quantity1",
				        	   width: 40,
				        	   editable:true,
				        	   /*editrules:{
		                            custom_func: validatePositive,
		                            custom: true,
		                            number:true,
		                            required: true
		                        }*/
				           },
				         
				           {
				        	   name: "insertDate",
				        	   width:60
				           },
				           {
				        	   name: "taxPercentage",
				        	   width:40
				           }
				          
				           ],


				           sortorder : 'desc',
				           
				           multiselect: false,	
				           loadonce: false,
				           rownumbers:true,
				           forcePlaceholderSize: true ,
				           'cellEdit':true,
				           viewrecords: true,
				           width: 1200,
				           height: 250,
				           rowNum: 10,
				           pager: "#jqGridPagerSeed",
				           sortorder: "desc",
			});

			$("#jqGridSeed").addRowData(i,jsonData[i]);
			
			$('#jqGridSeed').navGrid('#jqGridPagerSeed',
					// the buttons to appear on the toolbar of the grid
					{edit: true, add: false,del: true, search: true, refresh: true, view: true, position: "left", cloneToTop: false },
					// options for the Edit Dialog
					
					{
						/*afterSubmit: function () {
							  $(this).trigger('reloadGrid');
						},*/
						editCaption: "The Edit Dialog",
						recreateForm: true,
						checkOnUpdate : true,
						checkOnSubmit : true,
						closeAfteredit: true,
						errorTextFormat: function (data) {
							return 'Error: ' + data.responseText
						}
					
					},
					{},
					// options for the Delete Dialogue
					{    
						/*afterSubmit: function () {
							  $(this).trigger('reloadGrid');
						},*/
						closeAfterdel:true,
						recreateForm: true,
						errorTextFormat: function (data) {
							return 'Error: ' + data.responseText
						},

						onSelectRow: function(id) {
							if (id && id !== lastSel) {
								jQuery("#jqGridSeed").saveRow(lastSel, true, 'clientArray');
								jQuery("#jqGridSeed").editRow(id, true);
								
								lastSel = id;
								console.log(id);
							}
						}
						
						
					});
			
		// grid refresh code	
			
				});
		        function validatePositive(value, column) {
		        var rowId =$("#jqGridSeed").jqGrid('getGridParam','selrow');  
	            var rowData = jQuery("#jqGridSeed").getRowData(rowId);
	            var quan = rowData['availbleQuantity']; 	
		        	
                if (value <= quan)
                return [true, ""];	
                else
                return [false, "Return Quantity Must Be Less Than "+quan+ " !!!"];
                }   
       
			}); 
			
}




//Pesticide billing details for sale return
function fetchPesticideDataForSale(){
	
	var input = document.getElementById('pestiBillNo'),
	list = document.getElementById('pestiBillNo_drop'),
	i,bill_no;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			bill_no = list.options[i].getAttribute('data-value');
		}
	}
	
	var params= {};
	
	params["methodName"] = "getAllPesticideBillingDetailsByBillNo";
	
	params["bill_no"]= bill_no;
	
	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
			{ 

		 
		var jsonData = $.parseJSON(data);
		//$("#jqGrid1").jqGrid("clearGridData", true);
		
		$("#jqGridPesti").jqGrid("clearGridData", true).trigger("reloadGrid");

	
		 
		$.each(jsonData,function(i,v)
				{
			$("#jqGridPesti").jqGrid({
			
				datatype:"local",

				colNames: ["pk PestiBill ID","catId","customerName","Adhar No","Product Name","Company","Packing","Batch Number","Sale Price","M.R.P","Available Quantity","Return Quantity","Sale Date","Tax %" ],

				colModel: [
				           { 	
				        	   name: "pkPesticideBillingId",
				        	   hidden:true
				        	   //resizable: true,
				           },
				          
				           { 	
				        	   name: "catId",
				        	   hidden:true
				        	   //resizable: true,
				           },
				           { 	
				        	   name: "customerName",
				        	   hidden:true
				        	   //resizable: true,
				           },
				           {
				        	   name: "aadhar",
				        	   width: 90
				           },
				           
				           {
				        	   name: "barcode",
				        	   width: 90
				           },
				           
				           
				           { 	
				        	   name: "productName",
				        	   width:100,
				        	   //resizable: true,
				           },
				         
				           {
				        	   name: "company",
				        	   width: 80
				           },
				           {
				        	   name: "weight",
				        	   width: 60
				           },
				           {
				        	   name: "batchNo",
				        	   width: 60
				           },
				        
				           {
				        	   name: "salePrice",
				        	   width: 60,
				           },
				       
				           {
				        	   name : 'mrp',
				        	   //formatter: sumFmatter,
				        	   width: 60
				           },
				           
				          /* {
				        	   name : 'salepriceEx',
				        	   //formatter: sumFmatter,
				        	   width: 60
				           },
				           
				           {
				        	   name : 'discount',
				        	   //formatter: sumFmatter,
				        	   width: 60
				           },
				           
				           {
				        	   name : 'discountAmt',
				        	   //formatter: sumFmatter,
				        	   width: 60
				           },
				           
				           {
				        	   name : 'totalEx',
				        	   //formatter: sumFmatter,
				        	   width: 60
				           },
				           */
				           
				           {
				        	   name: "availbleQuantity",
				        	   width: 40,
				        	   
				           },
				           {
				        	   name: "quantity1",
				        	   width: 40,
				        	   editable:true,
				        	  /* editrules:{
		                            custom_func: validatePositive,
		                            custom: true,
		                            number:true,
		                            required: true
		                        }*/
				           },
				          
				           {
				        	   name: "insertDate",
				        	   width:60
				           },
				           {
				        	   name: "taxPercentage",
				        	   width:40
				           },
				           
				          /* {
				        	   name: "Total",
				        	   width:40,
				           }*/
				           
				           ],


				           sortorder : 'desc',
				           
				           multiselect: false,	
				           loadonce: false,
				           rownumbers:true,
				           forcePlaceholderSize: true ,
				           'cellEdit':true,
				           viewrecords: true,
				           width: 1200,
				           height: 250,
				           rowNum: 10,
				           pager: "#jqGridPagerPesti",
				           sortorder: "desc",
			});

			$("#jqGridPesti").addRowData(i,jsonData[i]);
			
			$('#jqGridPesti').navGrid('#jqGridPagerPesti',
					// the buttons to appear on the toolbar of the grid
					{edit: true, add: false,del: true, search: true, refresh: true, view: true, position: "left", cloneToTop: false },
					// options for the Edit Dialog
					
					{
						/*afterSubmit: function () {
							  $(this).trigger('reloadGrid');
						},*/
						editCaption: "The Edit Dialog",
						recreateForm: true,
						checkOnUpdate : true,
						checkOnSubmit : true,
						closeAfteredit: true,
						errorTextFormat: function (data) {
							return 'Error: ' + data.responseText
						}
					
					},
					{},
					// options for the Delete Dialogue
					{    
						/*afterSubmit: function () {
							  $(this).trigger('reloadGrid');
						},*/
						closeAfterdel:true,
						recreateForm: true,
						errorTextFormat: function (data) {
							return 'Error: ' + data.responseText
						},

						onSelectRow: function(id) {
							if (id && id !== lastSel) {
								jQuery("#jqGridPesti").saveRow(lastSel, true, 'clientArray');
								jQuery("#jqGridPesti").editRow(id, true);
								
								lastSel = id;
								console.log(id);
							}
						}
						
						
					});
			
		// grid refresh code	
			
				});
		        function validatePositive(value, column) {
		        var rowId =$("#jqGridPesti").jqGrid('getGridParam','selrow');  
	            var rowData = jQuery("#jqGridPesti").getRowData(rowId);
	            var quan = rowData['availbleQuantity']; 	
		        	
                if (value > quan)
                return [false, "Return Quantity Must Be Less Than "+quan+ " !!!"];
                else
                return [true, ""];
                }   
       
			}); 
			
}

////////////////fetching cash bill number/////////////////////////

function getAllBillCash()
{
	alert("riyu");
	var input = document.getElementById('customerName'),
    list1 = document.getElementById('cash_drop1'),
    i,customerName;

	for (i = 0; i < list1.options.length; ++i) {
    if (list1.options[i].value === input.value) {
    	customerName= list1.options[i].getAttribute('data-value');
    }
	}
	alert("Cash id------------"+customerName);
	
	$("#cash_drop1").empty();
	$("#cash_drop1").append($("<option></option>").attr("value","").text("Select Bill Number"));
	var params = {};
	
	params["customerName"] =customerName;
	
	
	params["methodName"] = "getAllBillCash";

	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
			{
		var count = 1;
		
		var jsonData = $.parseJSON(data);
		//var jsonData = jsonData.list;
		$.each(jsonData,function(i,v)
				{
			$("#cash_drop1").append($("<option></option>").attr("value",(v.billno))); 
			count++;
				});
			}).error(function(jqXHR, textStatus, errorThrown){
				if(textStatus==="timeout") {

				}
			});
}



////////////////credit customer fetching bill number///////////////

function getAllBill()
{
	
	var input = document.getElementById('creditCustomer'),
    list1 = document.getElementById('cust_drop1'),
    i,creditCustomer;

	for (i = 0; i < list1.options.length; ++i) {
    if (list1.options[i].value === input.value) {
    	creditCustomer= list1.options[i].getAttribute('data-value');
    }
	}
	//alert("Credit id------------"+creditCustomer);
	
	$("#creditBillNoDrop").empty();
	$("#creditBillNoDrop").append($("<option></option>").attr("value","").text("Select Bill Number"));
	var params = {};
	
	params["creditCustomer"] =creditCustomer;
	
	
	params["methodName"] = "getAllBillCredit";

	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
			{
		var count = 1;
		
		var jsonData = $.parseJSON(data);
		//var jsonData = jsonData.list;
		$.each(jsonData,function(i,v)
				{
			$("#creditBillNoDrop").append($("<option></option>").attr("value",(v.billno))); 
			count++;
				});
			}).error(function(jqXHR, textStatus, errorThrown){
				if(textStatus==="timeout") {

				}
			});
}


//////////credit billing for sale return/////////////////////////

function fetchDataForSaleCredit(){
	//alert("creditt---------");
	
	/*var input = document.getElementById('priya'),
	list = document.getElementById('creditBillNoDrop'),
	i,priya;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			priya= list.options[i].getAttribute('data-value');
		}
	}*/
	var billno=$('#creditBillNo').val();
	//alert("billno---------"+billno);
	var params= {};
	
	params["methodName"] = "getAllFertiIetmByBillNoCredit";
	
	params["billno"]= billno;
	
	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
			{ 

		 
		var jsonData = $.parseJSON(data);
		//$("#jqGrid1").jqGrid("clearGridData", true);
		
		$("#jqGridCredit").jqGrid("clearGridData", true).trigger("reloadGrid");


		$.each(jsonData,function(i,v)
				{
			$("#jqGridCredit").jqGrid({
			
				datatype:"local",

				colNames: ["pk fertilizerBill ID","Sale Date","fkGoodsReceive","catId","customerName","barcode","Product Name","Company","Packing","Sale Price","M.R.P","Available Quantity","Return Quantity","Tax %","Discount","DiscountAmt","Total"],

				colModel: [
				           { 	
				        	   name: "pkfertilizerBillId",
				        	   hidden:true
				        	   //resizable: true,
				           },
				           
				           {
				        	   name: "insertDate",
				        	   width:60
				           },
				           
				           { 	
				        	   name: "fkGoodsReceive",
				        	   hidden:true
				        	   //resizable: true,
				           },
				           { 	
				        	   name: "catId",
				        	   hidden:true
				        	   //resizable: true,
				           },
				           { 	
				        	   name: "customerName",
				        	   hidden:true
				        	   //resizable: true,
				           },
				           /*{
				        	   name: "aadhar",
				        	   width: 90,
				        	   hidden:true
				        	   
				           },*/
				           
				           
				           { 	
				        	   name: "barcode",
				        	   width: 90,
				        	   hidden:true
				        	   //resizable: true,
				           },
				           
				           { 	
				        	   name: "productName",
				        	   width:100,
				        	   //resizable: true,
				           },
				         
				           {
				        	   name: "company",
				        	   width: 80
				           },
				           {
				        	   name: "weight",
				        	   width: 60
				           },
				        
				           {
				        	   name: "salePrice",
				        	   editable:true,
				        	   width: 60,
				           },
				       
				           {
				        	   name : 'mrp',
				        	   //formatter: sumFmatter,
				        	   editable:true,
				        	   width: 60
				           },
				           
				           
				           /*{
				        	   name : "salepriceEx",
				        	   //formatter: sumFmatter,
				        	   width: 60
				           },
				           */
				           
				           
				           {
				        	   name: "availbleQuantity",
				        	   width: 40,
				        	   
				           },
				           {
				        	   name: "returnquantity",
				        	   width: 40,
				        	   editable:true,
				        	  /* editrules:{
		                            custom_func: validatePositive,
		                            custom: true,
		                            number:true,
		                            required: true
		                        }*/
				           },
				         
				           /*{
				        	   name: "insertDate",
				        	   width:60
				           },*/
				           {
				        	   name: "taxPercentage",
				        	   editable:true,
				        	   width:40,
				           },
				           
				           {
				        	   name : "discount",
				        	   //formatter: sumFmatter,
				        	   editable:true,
				        	   width: 60
				           },
				           
				           {
				        	   name : "discAmt",
				        	   //formatter: sumFmatter,
				        	   editable:true,
				        	   width: 60,
				           },
				           
				           {
				        	   name : "Total",
				        	   //formatter: sumFmatter,
				        	   width: 60
				           }
				           
				           ],


				           sortorder : 'desc',
				           
				           multiselect: false,	
				           loadonce: false,
				           rownumbers:true,
				           forcePlaceholderSize: true ,
				           'cellEdit':true,
				           viewrecords: true,
				           width: 1040,
				           shrinkToFit:true,
				           rowNum: 10,
				           pager: "#jqGridPagerCredit",
				           sortorder: "desc",
			});

			$("#jqGridCredit").addRowData(i,jsonData[i]);
			
			$('#jqGridCredit').navGrid('#jqGridPagerCredit',
					// the buttons to appear on the toolbar of the grid
					{edit: true, add: false,del: true, search: true, refresh: true, view: true, position: "left", cloneToTop: false },
					// options for the Edit Dialog
					
					{
						/*afterSubmit: function () {
							  $(this).trigger('reloadGrid');
						},*/
						editCaption: "The Edit Dialog",
						recreateForm: true,
						checkOnUpdate : true,
						checkOnSubmit : true,
						closeAfteredit: true,
						errorTextFormat: function (data) {
							return 'Error: ' + data.responseText
						}
					
					},
					{},
					// options for the Delete Dialogue
					{    
						/*afterSubmit: function () {
							  $(this).trigger('reloadGrid');
						},*/
						closeAfterdel:true,
						recreateForm: true,
						errorTextFormat: function (data)
						{
							return 'Error: ' + data.responseText
						},

						onSelectRow: function(id)
						{
							if (id && id !== lastSel)
							{
								jQuery("#jqGridCredit").saveRow(lastSel, true, 'clientArray');
								jQuery("#jqGridCredit").editRow(id, true);
								lastSel = id;
								console.log(id);
							}
						}
						
						
					});
			
		// grid refresh code	
			
				});
		        function validatePositive(value, column) {
		        var rowId =$("#jqGridCredit").jqGrid('getGridParam','selrow');  
	            var rowData = jQuery("#jqGridCredit").getRowData(rowId);
	            var quan = rowData['availbleQuantity']; 	
		        	
                if (value > quan)
                return [false, "Return Quantity Must Be Less Than "+quan+ " !!!"];
                else
                return [true, ""];
                }   
       
			}); 	
}

function getAllcustomerName(){
		
	var customerType = $("#customerType").val();
	
		if(customerType == "" || customerType == undefined)
			{
			var msg="Please Select Customer Type ";
			var dialog = bootbox.dialog({
				
			    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
			    closeButton: false
			});
			
			setTimeout(function() {
				dialog.modal('hide');
			}, 1500);				
			return false;

		}
		getAllcustomerName1();
}

function getAllcustomerName1(){
	
	//document.getElementById("save").disabled = true;
	
	$("#billno_drop").empty();
	$("#billNo").append($("<option></option>").attr("value","").text("Select Bill No"));
	
	var params = {};
	var customerType = $("#customerType").val();
		
	if(customerType == "cash")
		{
			params["customerType"] = customerType;
	}
	else{
			params["customerType"] = customerType;
	}
	
	document.getElementById('billNo').value = "";
	
	params["methodName"] = "getAllBillNoforSalereturn";
	
	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
			{
		var count = 1;
		
		var jsonData = $.parseJSON(data);
		
		$.each(jsonData,function(i,v)
				{
			$("#billno_drop").append($("<option></option>").attr("value",(v.BillNo +","+v.customerName))); 
			count++;
			  });
			}).error(function(jqXHR, textStatus, errorThrown){
				if(textStatus==="timeout") {

				}
	});
}

function getProductDetailsByBillNo(){
	
	var params= {};
	var billNo = $('#billNo').val();
	
	var splitText = billNo.split(",");
	
	var billno = splitText[0];
	var custName = splitText[1];
		
	//alert("billno---> "+billno+"  custName----> "+custName);
	
	params["billno"]= billno;
	
	var count=0;
	var newrow;
	var rowId;
	
	params["methodName"] = "getProductDetailsonBillNo";
	
	$.post('/Shop/jsp/utility/controller.jsp',params,function(data){
		var jsonData = $.parseJSON(data);
		
		$("#jqGrid").jqGrid("clearGridData", true).trigger("reloadGrid");

		$.each(jsonData,function(i, v) {
			$("#jqGrid").jqGrid({
				datatype: "local",
				
				colNames:['cat_id','pkBillingId','PkGoodreceiveId','Barcode<br>No','Product<br>Name','Company<br>Name','HSN','Batch No', 'Unit<br>Price',
						  'MRP','Sale<br>Price','Gst%','Discount<br>Amount','Pkg','Unit','Qty','Return<br>Qty','Total','Return<br>Total'],
				
				colModel:[ 
						     {
						    	 name:'cat_id',
						    	 hidden:true,
						    	 align:'center',
						     },		
						     {
						    	 name:'pkBillingId',
						    	 hidden:true,
						    	 align:'center',
						     },	
						     {
						    	 name:'PkGoodreceiveId',
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
								 width:105,
						    	 align:'center',
						    	 hidden:true,
							},	
							
							{	 name:'buyPrice',    //unit price
								 width:100,
						    	 align:'center',
							},	
						
							{	 name:'mrp',
								 width:100,
								 editable: false,
						    	 align:'center',
						    	 hidden:true,
								
							},
							{	 name:'salePrice',
								 width:100,
								 editable: false,
						    	 align:'center',
							},
																		
							{	name:'taxPercentage',   // gst%
								width:80,
								//editable: true,
						    	align:'center',
						    	hidden:false,
								
							},
							
							{	 name:'DiscountAmount',
								 width:100,
								 hidden:true,
						    	 align:'center',
							},
							
							{	 name:'weight',        //packing
								 width:80,
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
								editable: false,
								align:'center',
							},
							{	
								id:'returnQuantity',
								name:'returnQuantity',
								width:100,
								editable: true,
								align:'center',							
							},						
										
							{	name:'alltotalforReturn',    //Total column as per grid
								width:100,
								align:'center',
								//formatter: sumFmatter
							},						
							{	name:'returnTotal',
								width:100,
								hidden:false,
								align:'center',
								//formatter: sumFmatter
							}
							
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

												afterSaveCell : function grossTotal()
											    {
													/*
													 * Calculation
													 * of total
													 * after
													 * editing
													 * quantity
													 */
													
													var rowId = $("#jqGrid").jqGrid('getGridParam','selrow');
													var rowData = jQuery("#jqGrid").getRowData(rowId);
													var tax_percentage= rowData['taxPercentage'];
													var returnQuantity = rowData['returnQuantity'];
													var quantity = rowData['quantity'];
													var buy_price= rowData['salePrice'];
													var returnTotal= rowData['returnTotal'];
													var total = rowData['total'];
													
						
								  if(returnQuantity == "")
						            {
									    returnQuantity = "0";
				                   		var setZero = 0;
				                   		$("#jqGrid").jqGrid("setCell",rowId,"returnQuantity",setZero);
						            }			
									
								   if (returnQuantity == "" || returnQuantity == null)
									{
										alert("Please Enter Return Quantity");
										return false;  
									}
								   
								   if(returnQuantity != "")
									{
									   //var numbers = /^[0-9]+$/; 
									   var numbers = /^[0-9]+\.?[0-9]*$/;
									   if(returnQuantity.match(numbers)) 
									   { 
										
									   }
									   else{
										   alert("Please Enter Number Only");
										   var setZero = 0;
					                   	   $("#jqGrid").jqGrid("setCell",rowId,"returnQuantity",setZero);
									   }
									}
								   
									if (Number(quantity) < Number(returnQuantity)) 
									{
										var setZero = 0;
										alert("Return Quantity Must Less Than Original Quantity");
										/*$.getScript('/Shop/staticContent/js/bootbox.min.js', function()  
												{
											
												var msg="Please Enter Quantity less or Equal to Available Quantity";
												var dialog = bootbox.dialog({
													
													message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
												    closeButton: false
												});
												
												setTimeout(function() {
													dialog.modal('hide');
												}, 1500);
												
												return false;
												
													});*/
										$("#jqGrid").jqGrid("setCell",rowId,"returnQuantity",setZero);
										return false;
									}
																				
								var total=0;
							    total=Number(buy_price)*Number(returnQuantity);
							    
								 $("#jqGrid").jqGrid("setCell", rowId, "returnTotal", total);
								 
								 var checkbuyPrice= /^[0-9]+\.?[0-9]*$/;
								  if(buy_price.match(checkbuyPrice))
							      {
							      	  if(quantity !=0)
							      	  {   
							      		  BpwTax = (buy_price/(1+(tax_percentage/100)));
							      		  taxAmount = (BpwTax*(tax_percentage/100));
							      		  $("#jqGrid").jqGrid("setCell", rowId, "taxAmount",  taxAmount.toFixed(2));
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
								  
								    var TotalReturnAmount = 0;
							        var count = jQuery("#jqGrid").jqGrid('getGridParam', 'records');
							       	var allRowsInGrid1 = $('#jqGrid').getGridParam('data');
						        	var AllRows=JSON.stringify(allRowsInGrid1);
						        	
						        	for (var k = 0; k < count; k++) {
						        		  var Total1 = allRowsInGrid1[k].returnTotal;
						        		  
						        		  if(Total1 == undefined)
						        		  {
						        			  Total1 = 0;
						        		  }
						        		  TotalReturnAmount = +TotalReturnAmount + +Total1;
						        		 
						        	}
						        	
						        	 document.getElementById("grossTotal").value = Math.floor(TotalReturnAmount * 100) / 100;
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

///bill  


function getProductBillNo(){
	
	var params= {};
	var billNo = $('#billNo').val();
	
//	var splitText = billNo.split(",");
	
//	var billno = splitText[0];
//	var custName = splitText[1];
		
	//alert("billno---> "+billno+"  custName----> "+custName);
	
	params["billno"]= billNo;
	
	var count=0;
	var newrow;
	var rowId;
	
	params["methodName"] = "getProductcancelBillNo";
	
	$.post('/Shop/jsp/utility/controller.jsp',params,function(data){
		var jsonData = $.parseJSON(data);
		
		$("#jqGrids").jqGrid("clearGridData", true).trigger("reloadGrid");

		$.each(jsonData,function(i, v) {
			$("#jqGrids").jqGrid({
				datatype: "local",
				
				colNames:['cat_id','pkBillingId','PkGoodreceiveId','Barcode<br>No','Product<br>Name','Company<br>Name','HSN','Batch No', 'Unit<br>Price',
						  'MRP','Sale<br>Price','Gst%','Discount<br>Amount','Pkg','Unit','Qty','Return<br>Qty','Total','Return<br>Total'],
				
				colModel:[ 
						     {
						    	 name:'cat_id',
						    	 hidden:true,
						    	 align:'center',
						     },		
						     {
						    	 name:'pkBillingId',
						    	 hidden:true,
						    	 align:'center',
						     },	
						     {
						    	 name:'PkGoodreceiveId',
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
								 width:105,
						    	 align:'center',
						    	 hidden:true,
							},	
							
							{	 name:'buyPrice',    //unit price
								 width:100,
						    	 align:'center',
							},	
						
							{	 name:'mrp',
								 width:100,
								 editable: false,
						    	 align:'center',
						    	 hidden:true,
								
							},
							{	 name:'salePrice',
								 width:100,
								 editable: false,
						    	 align:'center',
							},
																		
							{	name:'taxPercentage',   // gst%
								width:80,
								//editable: true,
						    	align:'center',
						    	hidden:false,
								
							},
							
							{	 name:'DiscountAmount',
								 width:100,
								 hidden:true,
						    	 align:'center',
							},
							
							{	 name:'weight',        //packing
								 width:80,
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
								editable: false,
								align:'center',
							},
							{	
								id:'returnQuantity',
								name:'returnQuantity',
								width:100,
								editable: true,
								align:'center',							
							},						
										
							{	name:'alltotalforReturn',    //Total column as per grid
								width:100,
								align:'center',
								//formatter: sumFmatter
							},						
							{	name:'returnTotal',
								width:100,
								hidden:false,
								align:'center',
								//formatter: sumFmatter
							}
							
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
												pager : "#jqGridPagers",
												sortorder : "desc",

												afterSaveCell : function grossTotal()
											    {
													/*
													 * Calculation
													 * of total
													 * after
													 * editing
													 * quantity
													 */
													
													var rowId = $("#jqGrids").jqGrid('getGridParam','selrow');
													var rowData = jQuery("#jqGrids").getRowData(rowId);
													var tax_percentage= rowData['taxPercentage'];
													var returnQuantity = rowData['returnQuantity'];
													var quantity = rowData['quantity'];
													var buy_price= rowData['buyPrice'];
													var returnTotal= rowData['returnTotal'];
													var total = rowData['total'];
													
						
								  if(returnQuantity == "")
						            {
									    returnQuantity = "0";
				                   		var setZero = 0;
				                   		$("#jqGrids").jqGrid("setCell",rowId,"returnQuantity",setZero);
						            }			
									
								   if (returnQuantity == "" || returnQuantity == null)
									{
										alert("Please Enter Return Quantity");
										return false;  
									}
								   
								   if(returnQuantity != "")
									{
									   //var numbers = /^[0-9]+$/; 
									   var numbers = /^[0-9]+\.?[0-9]*$/;
									   if(returnQuantity.match(numbers)) 
									   { 
										
									   }
									   else{
										   alert("Please Enter Number Only");
										   var setZero = 0;
					                   	   $("#jqGrids").jqGrid("setCell",rowId,"returnQuantity",setZero);
									   }
									}
								   
									if (Number(quantity) < Number(returnQuantity)) 
									{
										var setZero = 0;
										alert("Return Quantity Must Less Than Original Quantity");
										/*$.getScript('/Shop/staticContent/js/bootbox.min.js', function()  
												{
											
												var msg="Please Enter Quantity less or Equal to Available Quantity";
												var dialog = bootbox.dialog({
													
													message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
												    closeButton: false
												});
												
												setTimeout(function() {
													dialog.modal('hide');
												}, 1500);
												
												return false;
												
													});*/
										$("#jqGrids").jqGrid("setCell",rowId,"returnQuantity",setZero);
										return false;
									}
																				
								var total=0;
							    total=Number(buy_price)*Number(returnQuantity);
							    
								 $("#jqGrids").jqGrid("setCell", rowId, "returnTotal", total);
								 
								 var checkbuyPrice= /^[0-9]+\.?[0-9]*$/;
								  if(buy_price.match(checkbuyPrice))
							      {
							      	  if(quantity !=0)
							      	  {   
							      		  BpwTax = (buy_price/(1+(tax_percentage/100)));
							      		  taxAmount = (BpwTax*(tax_percentage/100));
							      		  $("#jqGrids").jqGrid("setCell", rowId, "taxAmount",  taxAmount.toFixed(2));
							          }
							      	  else
							      	  {
								    	 var setZero = 0;
				                   		 $("#jqGrids").jqGrid("setCell", rowId, "taxAmount",setZero);
							          }
							      }
							      else
								  {
								     var setZero = 0; 
									 $("#jqGrids").jqGrid("setCell", rowId, "taxAmount", setZero);
								  }	
								  
								    var TotalReturnAmount = 0;
							        var count = jQuery("#jqGrids").jqGrid('getGridParam', 'records');
							       	var allRowsInGrid1 = $('#jqGrids').getGridParam('data');
						        	var AllRows=JSON.stringify(allRowsInGrid1);
						        	
						        	for (var k = 0; k < count; k++) {
						        		  var Total1 = allRowsInGrid1[k].returnTotal;
						        		  
						        		  if(Total1 == undefined)
						        		  {
						        			  Total1 = 0;
						        		  }
						        		  TotalReturnAmount = +TotalReturnAmount + +Total1;
						        		 
						        	}
						        	
						        	 document.getElementById("grossTotal").value = Math.floor(TotalReturnAmount * 100) / 100;
							},
												
						pager : "#jqGridPagers",
											});

							     $("#jqGrids").addRowData(i,jsonData[i]);
							     
							     $('#jqGrids').navGrid('#jqGridPagers',
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
											jQuery("#jqGrids").saveRow(lastSel,true,'clientArray');
											jQuery("#jqGrids").editRow(id,true);
											lastSel = id;
											console.log(id);
													}
												}
											});

							// grid refresh code

						});

	});
		
	
	
}

//

function billchallanVal(){

	var billNo = $('#billNo').val();
	/*var billNoo = $('#billNoo').val();*/
		
	/*if((billNo == "" || billNo ==null || billNo==undefined)){
		alert("Please Select Challan No");
		return false;
	}*/
		if(billNo == "")
	{
			var msg="Please Select Challan No ";
			var dialog = bootbox.dialog({
		    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		    closeButton: false
			});
			
			setTimeout(function() {
				dialog.modal('hide');
			}, 1500);
			return false;
		
	}
	
	/*if(document.catd.categoryName.value == "")*/
	/*if((billNo == "" || billNo ==null || billNo==undefined))
	{
		var msg="Please Enter billNo ";
		
		var dialog = bootbox.dialog({
			//title: "Embel Technologies Says :",
		    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		    closeButton: false
		});
		
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		
		return false;
	}	*/

	billchallanVal1();
}
//
function billchallanVal1(){

	var params={};
	
    var billNo = $('#billNo').val();
    
 	params["billno"] = billNo;
  
    
	
    params["methodName"] = "challanreturn";
	
	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
 	    	{
 				/*alert(data);
 				location.reload();*/
 					var msg=data;
				var dialog = bootbox.dialog({
			    message: '<p class="text-center">'+msg.fontcolor("green").fontsize(5)+'</p>',
			    closeButton: false
				});
				
				setTimeout(function() {
					dialog.modal('hide');
					location.reload();
				}, 1500);
	 			document.catd.btn1.disabled = false;
	 			
 				//returntMinusFromStockPurchase();
	//		document.getElementById("save").disabled = false; 				
 	    	}).error(function(jqXHR, textStatus, errorThrown){
 	    		if(textStatus==="timeout") {
 	    			$(loaderObj).hide();
 	    			$(loaderObj).find('#errorDiv').show();
 	    		}
 	    	});
}


function billReturnVal(){


	var billNo = $('#billNo').val();
	var billNoo = $('#billNoo').val();
		
	if((billNo == "" || billNo ==null || billNo==undefined) && (billNoo == "" || billNoo ==null || billNoo==undefined))
		{
		
			var msg="Please Select Any one Bill No";
			var dialog = bootbox.dialog({
		    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		    closeButton: false
			});
			
			setTimeout(function() {
				dialog.modal('hide');
			}, 1500);
			return false;
	}
	
	billReturnVal1();
}

function billReturnVal1(){

//	document.getElementById("save").disabled = true;
	var params={};
	
    var billNo = $('#billNo').val();
    
    var billnoo= $('#billNoo').val();
	
    if(billNo == "" || billNo ==null || billNo==undefined)
    {
	var billNo = billnoo;
    }
    
    else if(billnoo == "" || billnoo ==null || billnoo==undefined)
    {
	var billNo = billNo;
    }
    
	params["billno"] = billNo;
	
    params["methodName"] = "billreturn";
   /* params["methodName"] = "billReturnVal1";*/
	
	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
 	    	{
 				/*alert(data);
 				location.reload();*/
 				//returntMinusFromStockPurchase();
 				var msg=data;
		var dialog = bootbox.dialog({
	    message: '<p class="text-center">'+msg.fontcolor("green").fontsize(5)+'</p>',
	    closeButton: false
		});
		
		setTimeout(function() {
			dialog.modal('hide');
			location.reload();
		}, 1500);
 				
 //		document.getElementById("save").disabled = false; 				
 	    	}
 	    	).error(function(jqXHR, textStatus, errorThrown){
 	    		if(textStatus==="timeout") {
 	    			$(loaderObj).hide();
 	    			$(loaderObj).find('#errorDiv').show();
 	    		}
 	    	});
}