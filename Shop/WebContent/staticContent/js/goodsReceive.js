/*productDetailInGrid()*//*function addGoodsRecieve(){

 //document.getElementById("btn").disabled = true;
 var params = {};


 var input = document.getElementById('fk_godown_id'),
 list1 = document.getElementById('godown_drop'),
 i,fk_godown_id;

 for (i = 0; i < list1.options.length; ++i) {
 if (list1.options[i].value === input.value) {
 fk_godown_id = list1.options[i].getAttribute('data-value');
 }
 }


 var input = document.getElementById('fkExpenseDescriptionId'),
 list1 = document.getElementById('exp_drop'),
 i,fk_expense_id;

 for (i = 0; i < list1.options.length; ++i) {
 if (list1.options[i].value === input.value) {
 fk_expense_id = list1.options[i].getAttribute('data-value');
 }
 }

 //var fkExpenseId = fk_expense_id;

 var input = document.getElementById('supplier'),
 list = document.getElementById('sup_drop'),
 i,supplier;

 for (i = 0; i < list.options.length; ++i) {
 if (list.options[i].value === input.value) {
 supplier = list.options[i].getAttribute('data-value');
 }
 }


 var supplier = supplier;

 var input1 = document.getElementById('fk_cat_id'),
 list = document.getElementById('cat_drop'),
 i,fk_cat_id;
 for (i = 0; i < list.options.length; ++i) {
 if (list.options[i].value === input1.value) {
 fk_cat_id = list.options[i].getAttribute('data-value');
 }
 }

 var catName = document.getElementById("fk_cat_id").value;
 var dcNum = $('#dcNum').val();
 //var expenses = $('#extraExpence').val();
 var grossTotal = $('#grossTotal').val();
 var count = jQuery("#jqGrid").jqGrid('getGridParam', 'records');
 var allRowsInGrid = $('#jqGrid').getGridParam('data');//to get all rows of grid
 var AllRows=JSON.stringify(allRowsInGrid);
 for (var i = 0; i < count; i++) {

 var productID = allRowsInGrid[i].productID;
 params["productID"+i] = productID;

 var companyName = allRowsInGrid[i].manufacturer;
 params["companyName"+i] = companyName;

 var productName = allRowsInGrid[i].productName;
 params["productName"+i] = productName;

 var buyPrice = allRowsInGrid[i].buyPrice;
 params["buyPrice"+i] = buyPrice;

 var salePrice = allRowsInGrid[i].salePrice;
 params["salePrice"+i] = salePrice;

 var weight = allRowsInGrid[i].weight;
 params["weight"+i] = weight;

 var quantity = allRowsInGrid[i].quantity;
 params["quantity"+i] = quantity;

 var batchNo = allRowsInGrid[i].batchNo;
 params["batchNo"+i] = batchNo;

 var expiryDate = allRowsInGrid[i].expiryDate;
 params["expiryDate"+i] = expiryDate;

 var taxPercentage = allRowsInGrid[i].taxPercentage;
 params["taxPercentage"+i] = taxPercentage;

 var mrp = allRowsInGrid[i].mrp;
 params["mrp"+i] = mrp;

 }

 //var catName = $('#catName').val();
 var purchaseDate = $('#purchaseDate').val();
 //var billtype = $('#billtype').val();
 //var expensesDescription = $('#expensesDescription').val();
 var discount = $('#discount').val();
 var discountAmount = $('#discountAmount').val();
 var billNum = $('#billNum').val();
 var transExpence = $('#transExpence').val();
 var hamaliExpence = $('#hamaliExpence').val();


 $("#proName option:selected").each(function() {
 selectedVal = $(this).text();
 });

 var splitText = selectedVal.split(",");

 var proName = splitText[0];
 var company = splitText[1];
 var weight = splitText[2];


 params["company"]= company;


 params["catName"] = catName;
 params["dueDate"] = dueDate;
 params["purchaseDate"] = purchaseDate;
 //params["billtype"] = billtype;
 params["fk_godown_id"] = fk_godown_id;
 params["billNum"] = billNum;
 params["fk_cat_id"] = fk_cat_id;
 params["supplier"] = supplier;
 params["dcNum"] = dcNum;
 params["count"] = count;
 params["discount"] = discount;
 params["discountAmount"] = discountAmount;
 //	params["fkExpenseId"] = fkExpenseId;
 params["transExpence"] = transExpence;
 params["hamaliExpence"] = hamaliExpence;
 params["grossTotal"] = grossTotal;

 params["methodName"] = "addingGoodsReceive";

 $.post('/Fertilizer/jsp/utility/controller.jsp',params,function(data)
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
}*/

function goodReceiveDate()
{
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1;
	var yyyy = today.getFullYear();
	
	if(dd<10){
        dd='0'+dd
    } 
    if(mm<10){
        mm='0'+mm
    } 
	today = yyyy+'-'+mm+'-'+dd;
	document.getElementById("purchaseDate").value = today;
}


//Add goods receive
function addingGoodsReceive()
{
	/*document.getElementById("btn").disable = true;*/
	
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
	if (document.goodsReceiveForm.billNum.value == "")
	{
		var msg="Please Enter Bill Number";
		var dialog = bootbox.dialog({
					  
		    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		    closeButton: false
		});
		
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		return false;
	}
	var letterNumber = /^[a-zA-Z0-9/\, ]+$/;
	if (document.goodsReceiveForm.billNum.value.match(letterNumber)) {
		if (document.goodsReceiveForm.fk_cat_id.value == "")
		{
			var msg="Please Select Product Category";
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
		if (document.goodsReceiveForm.subCat.value == "") {			
			
			var msg="Please Select Sub Category Name";
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
		
		if (document.goodsReceiveForm.proName.value == "")
		{
			var msg="Please Select Product Name";
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
		
		
		


						/*
		 * if(document.goodsReceiveForm.dcNum.value == "") { alert("Please Enter
		 * DC Number"); return false; }
		 */
		if (document.goodsReceiveForm.purchaseDate.value == "") {
			
			var msg="Please Select purchase Date";
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
		if (document.goodsReceiveForm.shopName.value == "") {
						
			var msg="Please Select shop Name";
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
		
		addGoodsRecieve();
	} 
}

function addGoodsRecieve()
{
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

	var supplier = supplier;

	var input1 = document.getElementById('fk_cat_id'), 
	    list = document.getElementById('cat_drop'), 
	           i, fk_cat_id;
	
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input1.value) {
			fk_cat_id = list.options[i].getAttribute('data-value');
		}
	}

	var catName = document.getElementById('fk_cat_id').value;
	productId = $('#subCat').val();

	var splitText = productId.split(",");

	var fk_subCat_id = splitText[1];
	
	productId = $('#shopName').val();
		
	var splitTextforUnit = productId.split(",");
	
	var pName = splitTextforUnit[0];
	var unitName = splitTextforUnit[1];
	params["unitName"] = unitName;
		
	var shopName = $("#shopName").val();
	var fk_shop_id  = shopName.charAt(0);	

	var expenses = $('#extraExpence').val();
	var grossTotal = $('#grossTotal').val();
	
	var count = jQuery("#jqGrid").jqGrid('getGridParam', 'records');
	var allRowsInGrid = $('#jqGrid').getGridParam('data');// to get all rows of grid
	var AllRows = JSON.stringify(allRowsInGrid);
	for (var i = 0; i < count; i++)
	{
		var catIDforVAt = allRowsInGrid[i].catIDforVAt;
		params["catIDforVAt" + i] = catIDforVAt;
		
		var productID = allRowsInGrid[i].productID;
		params["productID" + i] = productID;
	
		var barcode_id = allRowsInGrid[i].barcode_id;
		if(barcode_id==null || barcode_id=="" || barcode_id==undefined){
			barcode_id="0000";
		}
		params["barcode_id" + i] = barcode_id;
		
		var productName = allRowsInGrid[i].productName;
		params["productName" + i] = productName;

		var companyName = allRowsInGrid[i].manufacturer;
		params["companyName" + i] = companyName;

		var buyPrice = allRowsInGrid[i].buyPrice;
		
		if(buyPrice == ""||buyPrice == null ||buyPrice == undefined)
		{			
			var msg="Enter Buy Price<br>For Product => "+(i+1)+" "+productName;;
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
		else if(buyPrice != '' || buyPrice != null || buyPrice != undefined)
		{
			var checkNum = /^[0-9]+\.?[0-9]*$/;
			
			if(String(buyPrice).match(checkNum))
			
			{	
				params["buyPrice" + i] = buyPrice;
			}
			else
			{				
				var msg="Please Enter Valid Buy Price<br>For Product => "+(i+1)+" "+productName;;
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
		
		var salePrice = allRowsInGrid[i].salePrice;
		var mrp = allRowsInGrid[i].mrp;
		
		/*if(mrp == undefined || mrp == "" || mrp == null)
		{
				mrp=0;
				params["mrp" + i] = mrp;
		}*/
		/*else if (mrp != undefined || mrp != '' || mrp != null || mrp !='0' )
		{
			var numbers = /^[0-9]+\.?[0-9]*$/;
			if(String(mrp).match(numbers))
			{
				if(Number(salePrice) > Number(mrp))
				{
					var msg="MRP Price Per Unit Must be Greater Than Sale Price Per Unit<br>For Product => "+(count)+" "+productName+"<br>saleprice = "+salePrice+"Mrp = "+mrp;
					var dialog = bootbox.dialog({
						
					    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
					    closeButton: true
					});
					
					setTimeout(function() {
						dialog.modal('hide');
					}, 4000);				
					document.getElementById("save").disabled = false;
					return false;
				}
				else
				{
					params["mrp" + i] = mrp;
				}
			}
			else
			{
				var msg="Please Enter Valid MRP Price Per Unit<br>For Product => "+(count+1)+" "+productName;;
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

		}		*/
			
		if(salePrice == undefined || salePrice == "" || salePrice == null)
		{
			salePrice = 0;
			params["salePrice" + i] = salePrice;
			
		}
		else if(salePrice != undefined || salePrice == '' || salePrice != null)
		{
			var numbers = /^[0-9]+\.?[0-9]*$/;
			if(String(salePrice).match(numbers))
			{	
				params["salePrice" + i] = salePrice;
			}
			else
			{
				var msg="Please Enter Valid Sale Price<br>For Product => "+(count+1)+" "+productName;;
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
				
		var weight = allRowsInGrid[i].weight;
		params["weight" + i] = weight;                     // packing
	
		var quantity = allRowsInGrid[i].quantity;
		if(quantity == undefined || quantity == 0 || quantity == null || quantity == '')
		{			
			var msg="Please Enter Quantity<br>For Product => "+(count+1)+" "+productName;;
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
			if(String(quantity).match(numbers))
			{
				params["quantity" + i] = quantity;				
			}
			else
			{
				var msg="Please Enter Valid Quantity<br>For Product => "+(count+1)+" "+productName;;
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
		
		var subCatId = allRowsInGrid[i].subCatId;
		params["subCatId" + i] = subCatId;
		
		var unitName = allRowsInGrid[i].unitName;

			params["unitName"+i] = unitName;

		var batchNo = allRowsInGrid[i].batchNo;
		params["batchNo" + i] = batchNo;
		
		var expiryDate = allRowsInGrid[i].expiryDate;
		params["expiryDate" + i] = expiryDate;
		
		/*var expiryDate = allRowsInGrid[i].expiryDate;
		if(expiryDate == undefined || expiryDate == null || expiryDate == '')
		{			
			var msg="Please Enter Expiry Date<br>For Product => "+(count+1)+" "+productName;;
			var dialog = bootbox.dialog({
				//title: "Embel Technologies Says :",
			    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
			    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
			    closeButton: false
			});
			
			setTimeout(function() {
				dialog.modal('hide');
			}, 1500);				
			document.getElementById("save").disabled = false;
			return false;
		}else{
		//alert("expiryDate ------"+expiryDate);
		params["expiryDate" + i] = expiryDate;
		}*/
				
		var sgst = allRowsInGrid[i].sgst;
				
		if (sgst == undefined || sgst == null || sgst == "")
		{
			params["sgst" + i] = 0;
		} 
		else if (sgst != undefined || sgst != null || sgst != "")
		{
			//var checkGst = /^[0-9]+$/;
			var checkGst = /^[0-9]+\.?[0-9]*$/;
			if(String(sgst).match(checkGst))
			{
				params["sgst" + i] = sgst;
			}
			else
			{
				var msg="Please Enter Valid SGST% Values<br>For Product => "+i+" "+productName;;
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
		
		var cgst = allRowsInGrid[i].cgst;
		
		if (cgst == undefined || cgst == null || cgst == "")
		{
			params["cgst" + i] = 0;
		} 
		else if (cgst != undefined || cgst != null || cgst != "")
		{
			//var checkGst = /^[0-9]+$/;
			var checkGst = /^[0-9]+\.?[0-9]*$/;
			if(String(cgst).match(checkGst))
			{
				params["cgst" + i] = cgst;
			}
			else
			{
				var msg="Please Enter Valid CGST% Values<br>For Product => "+i+" "+productName;;
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
		
		var igst1 = allRowsInGrid[i].igst1;
		
		if (igst1 == undefined || igst1 == null || igst1 == "")
		{
			params["igst1" + i] = 0;
		}
		else if (igst1 != undefined || igst1 != null || igst1 != "")
		{
			//var checkIgst = /^[0-9]+$/;
			var checkIgst = /^[0-9]+\.?[0-9]*$/;
			if(String(igst1).match(checkIgst))
			{
				params["igst1" + i] = igst1;
			}
			else
			{
				var msg="Please Enter Valid IGST% Values<br>For Product => "+i+" "+productName;;
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
		
		if((cgst == "" && sgst == "" && igst1 == "") || (cgst == 0 && sgst== 0 && igst1 == 0))
		{
			cgst = 0;
			sgst = 0;
			igst1 = 0;
			params["cgst" + i] = cgst;
			params["sgst" + i] = sgst;
			params["igst1" + i] = igst1;
		}
		else if((cgst == "" && sgst == "" && igst1 == "") || (cgst > Number(0) && sgst > Number(0) && igst1 > Number(0)))
		{
			var msg="Please Enter Either SGST% & CGST% OR IGST% Values<br>For Product => "+i+" "+productName;
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
		
		var advancebookingId = allRowsInGrid[i].advancebookingId; 
		params["advancebookingId" + i] = advancebookingId;

		/*var weightAftShortMinus = allRowsInGrid[i].weightAftShortMinus;
		params["weightAftShortMinus" + i] = weightAftShortMinus;*/
				
		var Discount = allRowsInGrid[i].Discount;
		params["Discount" + i] = Discount;                           // Disc perc% per product
		
		var DiscountAmount = allRowsInGrid[i].DiscountAmount;
		params["DiscountAmount" + i] = DiscountAmount;               // Disc Amt per product 
		
		var TotalExTax = allRowsInGrid[i].TotalExTax;
		params["TotalExTax" + i] = TotalExTax;                       // Total Excl tax per product
	
		var buyPriceEx = allRowsInGrid[i].buyPriceEx;
		params["buyPriceEx" + i] = buyPriceEx;       
		
		var Total = allRowsInGrid[i].Total;
		params["Total" + i] = Total;
		
		var unitvalue = allRowsInGrid[i].unitvalue;
		params["unitvalue" + i] = unitvalue;
		
		var unitdesc = allRowsInGrid[i].unitdesc;
		params["unitdesc" + i] = unitdesc;

	}

	var total = $('#total').val();
	
	var extraExpenseGSTperc = $("#gstForExpense2").val();
	if(extraExpenseGSTperc == 'selected' || extraExpenseGSTperc == '' || extraExpenseGSTperc == null)
	{
		extraExpenseGSTperc = 0;
	}
	var transExpence = $('#transExpence3').val();
	var transExpenceTaxAmt = $("#transExpence").val();
	var hamaliExpence = $('#hamaliExpence3').val();
	var hamaliExpenceTaxAmt = $("#hamaliExpence").val();
	
	var totalTransportExpense = Number(transExpence) + Number(transExpenceTaxAmt);
	var totalhamaliExpence = Number(hamaliExpence) + Number(hamaliExpenceTaxAmt);
		
	var purchaseDate = $('#purchaseDate').val();
	var discount = $('#discount').val();
	var discountAmount = $('#discountAmount').val();
	var billNum = $('#billNum').val();
	var gstno = $('#gstno').val();
	params["gstno"] = gstno;
	params["catName"] = catName;
	params["purchaseDate"] = purchaseDate;
	params["billNum"] = billNum;
	params["fk_cat_id"] = fk_cat_id;
	params["fk_subCat_id"] = fk_subCat_id;
	params["fk_shop_id"] = fk_shop_id;
	params["supplier"] = supplier;
	params["count"] = count;
	params["total"] = total;
	params["discount"] = discount;
	params["discountAmount"] = discountAmount;
	params["transExpence"] = transExpence;
	params["hamaliExpence"] = hamaliExpence;
	params["grossTotal"] = grossTotal;
	params["totalTransportExpense"] = totalTransportExpense;
	params["totalhamaliExpence"] = totalhamaliExpence;
	params["extraExpenseGSTperc"] = extraExpenseGSTperc;
	params["expiryDate"] = expiryDate;
	params["transExpenceTaxAmt"] = transExpenceTaxAmt;
	params["hamaliExpenceTaxAmt"] = hamaliExpenceTaxAmt;
	
	params["methodName"] = "addingGoodsReceive";

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
		
		window.open("purchasePDF.jsp");		
		
//		printbarcode(); 916726388
	}).error(function(jqXHR, textStatus, errorThrown) {
		if (textStatus === "timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});

}

function addBookedGoodsReceive() {
	if (document.advanceGoodsReceive.supplier1.value == "") {
		alert("Please select Supplier Name");
		return false;
	}
	if (document.advanceGoodsReceive.billNum1.value == "") {
		alert("Please Enter Bill Number");
		return false;
	}
	if (document.advanceGoodsReceive.fk_cat_id1.value == "") {
		alert("Please Select Product Category");
		return false;
	}
	if (document.advanceGoodsReceive.proName1.value == "") {
		alert("Please Select Product Name");
		return false;
	}
	if (document.advanceGoodsReceive.dcNum1.value == "") {
		alert("Please Enter DC Number");
		return false;
	}
	if (document.advanceGoodsReceive.purchaseDate1.value == "") {
		alert("Please Select purchase Date");
		return false;
	}
	if (document.advanceGoodsReceive.fk_godown_id1.value == "") {
		alert("Please Select Godown");
		return false;
	}
	if (document.advanceGoodsReceive.discount1.value == "") {
		alert("Please Enter Discount in % ");
		return false;
	}
	if (document.advanceGoodsReceive.transExpence1.value == "") {
		alert("Please Enter Transportation Expense ");
		return false;
	}
	if (document.advanceGoodsReceive.hamaliExpence1.value == "") {
		alert("Please Enter Hamali Expense ");
		return false;
	}
	if (document.advanceGoodsReceive.dueDate1.value == "") {
		alert("Please Select Payment Due Date ");
		return false;
	}

	addbookedGoodReceive();

}

function addbookedGoodReceive() {

	document.getElementById("btn1").disabled = true;
	var params = {};

	var input = document.getElementById('fk_godown_id1'), list1 = document
			.getElementById('godown_drop1'), i, fk_godown_id;

	for (i = 0; i < list1.options.length; ++i) {
		if (list1.options[i].value === input.value) {
			fk_godown_id = list1.options[i].getAttribute('data-value');
		}
	}

	/*
	 * var input = document.getElementById('fkExpenseDescriptionId1'), list1 =
	 * document.getElementById('exp_drop1'), i,fk_expense_id;
	 * 
	 * for (i = 0; i < list1.options.length; ++i) { if (list1.options[i].value
	 * === input.value) { fk_expense_id =
	 * list1.options[i].getAttribute('data-value'); } }
	 */
	// var fkExpenseId = fk_expense_id;
	var input = document.getElementById('supplier1'), list = document
			.getElementById('sup_drop1'), i, supplier;

	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			supplier = list.options[i].getAttribute('data-value');
		}
	}

	var supplier = supplier;

	var input1 = document.getElementById('fk_cat_id1'), list = document
			.getElementById('cat_drop1'), i, fk_cat_id;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input1.value) {
			fk_cat_id = list.options[i].getAttribute('data-value');
		}
	}

	var catName = document.getElementById('fk_cat_id1').value;
	var dcNum = $('#dcNum1').val();
	var expenses = $('#extraExpence1').val();
	var grossTotal = $('#grossTotal1').val();
	var count = jQuery("#jqGrid1").jqGrid('getGridParam', 'records');
	var allRowsInGrid = $('#jqGrid1').getGridParam('data');// to get all rows
															// of grid
	var AllRows = JSON.stringify(allRowsInGrid);
	for (var i = 0; i < count; i++) {

		var productID = allRowsInGrid[i].productID;
		params["productID" + i] = productID;

		var productName = allRowsInGrid[i].productName;
		params["productName" + i] = productName;

		var companyName = allRowsInGrid[i].manufacturer;
		params["companyName" + i] = companyName;

		var buyPrice = allRowsInGrid[i].buyPrice;
		params["buyPrice" + i] = buyPrice;

		var salePrice = allRowsInGrid[i].salePrice;
		params["salePrice" + i] = salePrice;

		var weight = allRowsInGrid[i].weight;
		params["weight" + i] = weight;

		var quantity = allRowsInGrid[i].quantity;
		params["quantity" + i] = quantity;

		var batchNo = allRowsInGrid[i].batchNo;
		params["batchNo" + i] = batchNo;

		var expiryDate = allRowsInGrid[i].expiryDate;
		params["expiryDate" + i] = expiryDate;

		var taxPercentage = allRowsInGrid[i].taxPercentage;
		params["taxPercentage" + i] = taxPercentage;

		var mrp = allRowsInGrid[i].mrp;
		params["mrp" + i] = mrp;

	}

	var transExpence = $('#transExpence1').val();
	var hamaliExpence = $('#hamaliExpence1').val();
	var dueDate = $('#dueDate1').val();
	var purchaseDate = $('#purchaseDate1').val();
	var billtype = $('#billtype1').val();
	/* var expensesDescription = $('#expensesDescription1').val(); */
	var discount = $('#discount1').val();
	var discountAmount = $('#discountAmount1').val();
	var billNum = $('#billNum1').val();

	params["catName"] = catName;
	params["dueDate"] = dueDate;
	params["purchaseDate"] = purchaseDate;
	/* params["billtype"] = billtype; */
	params["fk_godown_id"] = fk_godown_id;
	params["billNum"] = billNum;
	params["fk_cat_id"] = fk_cat_id;
	params["supplier"] = supplier;
	params["dcNum"] = dcNum;
	params["count"] = count;
	params["discount"] = discount;
	params["discountAmount"] = discountAmount;
	params["transExpence"] = transExpence;
	params["hamaliExpence"] = hamaliExpence;
	params["grossTotal"] = grossTotal;

	params["methodName"] = "addingGoodsReceive";

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

/** ******************Purchase Reports ************ */

/** ******* SINGLE DATE WISE ******** */

function purchaseReportForSingleDateValidate()
{
	var fDate = $("#fDate").val();
	
	if ( fDate != "" )
		
	{
		purchaseReportForSingleDate();
	}
	else
		
	 {
		/*var msg="Please Enter Date ";*/
		var msg="Data is not available ";
		
		
		var dialog = bootbox.dialog({
			
		    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		    closeButton: false
		});
		
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		
     return false;
	 }
	
	
	/*if(fDate != null && fDate != "")
		{
			purchaseReportForSingleDate();
		}
		else
		{
			var msg="Please Select Date";
			var dialog = bootbox.dialog({
		    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		    closeButton: false
			});			
			setTimeout(function() {
				dialog.modal('hide');
			}, 1500);
			return false;
		}*/
}

function purchaseReportForSingleDate()
{
	var params = {};
	var fDate = $("#fDate").val();
    //alert("date----------"+fDate);
	params["fDate"] = fDate;

	params["methodName"] = "getPurchaseDetailsForSingleDate";

	$.post('/Shop/jsp/utility/controller.jsp', params, function(data)
	{		
		$('#purchase1').dataTable().fnClearTable();

		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		
		if(catmap == "" || catmap == null)
		{
			//alert("No date Wise Purchase Reports for\nDate = "+fDate);
			/*var msg="Data is not available";*/
			var msg="Please Enter Date";
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
			var total = $('#purchase1').DataTable({
				
				
				
				
				/*$('#example').dataTable( {
					  "searching": false
					} );*/
				"bProcessing": true,
			    "sAutoWidth": false,
			    "bDestroy":true,
			    "sPaginationType": "bootstrap",
			    // full_numbers
			    "iDisplayStart ": 10,
			    "iDisplayLength": 10,
			    "bPaginate": false, 
			    //hide pagination
			    //"bFilter": false, //hide Search bar
			    "bInfo": true,
			    // hide showing entries
				
				/*dom : 'Bfrtip',
				buttons : [ 'copy', ' csv', ' excel', 'pdf', 'print' ],*/

				fnRowCallback : function(nRow, aData, iDisplayIndex) {
					$("th:first", nRow).html(iDisplayIndex + 1);
					return nRow;
				},

				/*
				 * "footerCallback": function ( row, data, start, end, display ) {
				 * var api = this.api(), data;
				 *  // Remove the formatting to get integer data for summation
				 * var intVal = function ( i ) { return typeof i === 'string' ?
				 * i.replace(/[\$,]/g, '')*1 : typeof i === 'number' ? i : 0; };
				 *  // Total over all pages total = api .column( 7 ) .data()
				 * .reduce( function (a, b) { return intVal(a) + intVal(b); }, 0 );
				 * console.log(total); // Total over this page pageTotal = api
				 * .column( 5 ) .data() .reduce( function (a, b) { return
				 * intVal(a) + intVal(b); }, 0 );
				 * 
				 *  // Update footer $( api.column( 7 ).footer() ).html( //
				 * 'Rs'+' '+pageTotal.toFixed(2) str = pageTotal.toFixed(0) );
				 * console.log( pageTotal);
				 *  // Total over this page
				 * 
				 * 
				 *  },
				 */
				
				//for Total Rs:
				
				
				
				
				 "footerCallback": function ( row, data, start, end, display ) {
			            var api = this.api(), data;
			 
			            // Remove the formatting to get integer data for summation
			            
			            
			            
			            var intVal = function ( i ) 
			            {
			                return typeof i === 'string' ?
			                    i.replace(/[\$,]/g, '')*1 :
			                    typeof i === 'number' ?
			                        i : 0;
			            };
				
				
				
				
				
				
				
			 
			            // Total over all pages
	/*		          
			            pageTotal = api
			                .column( 6 )
			                .data()
			                .reduce( function (a, b) {
			                    return intVal(a) + intVal(b);
			                }, 0 );
			 
			            // Update footer
			            $( api.column( 6 ).footer() ).html(
			            		
			              parseFloat(pageTotal).toFixed(2)
			               
			            );
			            console.log( pageTotal);
		*/	            
				
				
				
			
			      pageTotal = api .column( 12 ).data() .reduce( function (a, b) 
			      {
		                    
			        return intVal(a) + intVal(b);
		          }, 0 );
		 
		            // Update footer
		         $( api.column( 12 ).footer() ).html(
		            		
		           parseFloat(pageTotal).toFixed(2)
		               
		         );
		         console.log( pageTotal);
		            
		            
		            
		         pageTotal = api.column( 13 ).data().reduce( function (a, b) 
		         {
	                return intVal(a) + intVal(b);
	              }, 0 );
	 
	            // Update footer
	            $( api.column( 13 ).footer() ).html(
	            		
	              parseFloat(pageTotal).toFixed(2)
	               
	            );
	            console.log( pageTotal);
	            
	            
	            pageTotal = api .column( 14 ).data() .reduce( function (a, b) 
	            {
                    return intVal(a) + intVal(b);
                }, 0 );
 
            // Update footer
                $( api.column( 14 ).footer() ).html(
            		
                parseFloat(pageTotal).toFixed(2)
               
                );
                console.log( pageTotal);
            
		            
		        pageTotal = api.column( 15 ).data().reduce( function (a, b) 
		    		 
		         {
	                    return intVal(a) + intVal(b);
	              }, 0 );
	 
	            // Update footer
	            $( api.column( 15 ).footer() ).html(
	            		
	              parseFloat(pageTotal).toFixed(2)
	               
	            );
	            console.log( pageTotal);
				 
				 
				 pageTotal = api.column( 16 ).data().reduce( function (a, b)
				{
	                    return intVal(a) + intVal(b);
	                }, 0 );
	 
	            // Update footer
	            $( api.column( 16 ).footer()).html(
	            		
	              parseFloat(pageTotal).toFixed(2)
	               
	            );
	            console.log( pageTotal);
				 },

	 
					
				destroy : true,
				searching : true,
				"scrollY": 300,
		        "scrollX": true,
		        "paging":   false,

				columns : [ {
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
				},*/ 
				
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
				}, {
					"data" : "mrp",
					"width" : "5%"
				}, {
					"data" : "weight",
					"width" : "5%"
				},
				{
					"data" : "unitName",
					"width" : "5%"
				},
				{
					"data" : "quantity2",
					"width" : "5%"
				},				
				{
					"data" : "taxPercentage",
					"width" : "5%"
				},	
			
				{
					"data" : "discountPercentage",
					"width" : "5%"
				},
				
				{
					"data" : "taxAmount",
					"width" : "5%"
				},
				{
					"data" : "discountAmount",
					"width" : "5%"
				},
				{
					"data" : "totalAmount",
					"width" : "5%"
				} ],
				dom : 'Bfrtip',
				buttons : [
				           //'print',
				           				           
				           {	extend: 'print',
				        	    orientation: 'landscape',
				        	   	title: 'Date Wise Purchase Report '+fDate,
				        	   	footer:true,
				        	   	pageSize: 'LEGAL' },
				           
			               { 	extend: 'copyHtml5',
				                orientation: 'landscape',
				                title: 'Date Wise Purchase Report '+fDate,
				                footer:true,
				                pageSize: 'LEGAL' },

				           { 	extend: 'excelHtml5',
				                orientation: 'landscape',
				                title: 'Date Wise Purchase Report '+fDate,
				                messageTop: 'Date Wise Purchase Report '+fDate,
				                footer:true,
				                pageSize: 'LEGAL' },
				                
				           { 	extend: 'csvHtml5',
				                orientation: 'landscape',
				                title: 'Date Wise Purchase Report '+fDate,
				                footer:true,
				                pageSize: 'LEGAL' },
				           
				           
						 //{ extend: 'copyHtml5', footer: true },
						 //{ extend: 'excelHtml5', footer: true },
						 //{ extend: 'csvHtml5', footer: true },
				                
				                { extend: 'pdfHtml5',
				                orientation: 'landscape',
				                title: 'Date Wise Purchase Report '+fDate,
				                footer:true,
				                pageSize: 'LEGAL' } ]
			});
		});

		var mydata = catmap;
		$('#purchase1').dataTable().fnAddData(mydata);

	}

	);

}

/** ************* BETWEEN TWO DATES ********** */

function purchaseReportBetweenTwoDatesValidate()
{
	var fisDate2=$("#fisDate2").val();
	var endDate2=$("#endDate2").val();
	//alert("First date-----------"+fisDate2);
	//alert("End date-----------"+endDate2);
	
	if(fisDate2 != null && fisDate2 != "")
		{
			if(endDate2 != null && endDate2 != "")
				{
					purchaseReportBetweenTwoDates();
				}
			else
				{
					var msg="Please Select End Date";
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
			var msg="Please Select First Date";
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

function purchaseReportBetweenTwoDates() {

	var params = {};
	var startDate = $("#fisDate2").val();
	var endDate = $("#endDate2").val();
	
	//alert("First date-----------"+startDate);
	//alert("End date-----------"+endDate);

	params["fisDate"] = startDate;
	params["endDate"] = endDate;
	params["methodName"] = "getPurchaseReportBetweenTwoDates";

	$.post('/Shop/jsp/utility/controller.jsp', params, function(data) {
		$('#purchaseRange').dataTable().fnClearTable();

		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		
		if(catmap == "" || catmap == null)
		{
			//alert("No Range Wise Purchase Reports for\nStart Date = "+startDate+"\nEnd Date = "+endDate);
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
			var total = $('#purchaseRange').DataTable({
				
			    "bProcessing": true,
			    "sAutoWidth": false,
			    "bDestroy":true,
			    "sPaginationType": "bootstrap", // full_numbers
			    "iDisplayStart ": 10,
			    "iDisplayLength": 10,
			    "bPaginate": false, //hide pagination
			    //"bFilter": false, //hide Search bar
			    "bInfo": true, // hide showing entries
				
				/*dom : 'Bfrtip',
				buttons : [ 'copy', ' csv', ' excel', 'pdf', 'print' ],*/

				fnRowCallback : function(nRow, aData, iDisplayIndex) {
					$("th:first", nRow).html(iDisplayIndex + 1);
					return nRow;
				},

				/*
				 * "footerCallback": function ( row, data, start, end, display ) {
				 * var api = this.api(), data;
				 *  // Remove the formatting to get integer data for summation
				 * var intVal = function ( i ) { return typeof i === 'string' ?
				 * i.replace(/[\$,]/g, '')*1 : typeof i === 'number' ? i : 0; };
				 *  // Total over all pages total = api .column( 7 ) .data()
				 * .reduce( function (a, b) { return intVal(a) + intVal(b); }, 0 );
				 * console.log(total); // Total over this page pageTotal = api
				 * .column( 5 ) .data() .reduce( function (a, b) { return
				 * intVal(a) + intVal(b); }, 0 );
				 * 
				 *  // Update footer $( api.column( 7 ).footer() ).html( //
				 * 'Rs'+' '+pageTotal.toFixed(2) str = pageTotal.toFixed(0) );
				 * console.log( pageTotal);
				 *  // Total over this page
				 * 
				 * 
				 *  },
				 */
				
				//for Total Rs:
				
				 "footerCallback": function ( row, data, start, end, display ) {
			            var api = this.api(), data;
			 
			            // Remove the formatting to get integer data for summation
			            var intVal = function ( i ) {
			                return typeof i === 'string' ?
			                    i.replace(/[\$,]/g, '')*1 :
			                    typeof i === 'number' ?
			                        i : 0;
			            };
			 
			            // Total over all pages
			            /* total = api
			                .column( 6 )
			                .data()
			                .reduce( function (a, b) {
			                    return intVal(a) + intVal(b);
			                }, 0 ); 
			 			console.log(total); */
			            // Total over this page
			            pageTotal = api .column( 14 ) .data().reduce( function (a, b) {
			                  return intVal(a) + intVal(b);
			                }, 0 );
			 
			            // Update footer
			            $( api.column( 14 ).footer() ).html(
			            		
			              parseFloat(pageTotal).toFixed(2)
			               
			            );
			            console.log( pageTotal);
			            
			            pageTotal = api.column( 15 ) .data().reduce( function (a, b) {
		                    return intVal(a) + intVal(b);
		                }, 0 );
		 
		            // Update footer
		                $( api.column( 15 ).footer() ).html(
		            		
		                parseFloat(pageTotal).toFixed(2)
		               
		                 );
		               console.log( pageTotal);
		            
		               pageTotal = api.column( 16 ).data().reduce( function (a, b) {
	                    return intVal(a) + intVal(b);
	                }, 0 );
	 
	            // Update footer
	                   $( api.column( 16 ).footer() ).html(
	            		
	                   parseFloat(pageTotal).toFixed(2)
	               
	                  );
	            console.log( pageTotal);
	            
	            
	               },


				destroy : true,
				searching : true,
				"scrollY": false,
		        "scrollX": true,
		        "paging":   false,

				columns : [ {
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
				},/* {
					"data" : "dcNo",
					"width" : "5%"
				},*/
				{
					"data" : "batchNo",
					"width" : "5%"
				}, {
					"data" : "barcodeNo",
					"width" : "5%"
				}, {
					"data" : "buyPrice",
					"width" : "5%"
				}, {
					"data" : "salePrice",
					"width" : "5%"
				}, {
					"data" : "mrp",
					"width" : "5%"
				}, {
					"data" : "weight",
					"width" : "5%"
				},
				{
					"data" : "unitName",
					"width" : "5%"
				}, 
				{
					"data" : "quantity2",
					"width" : "5%"
				}, 
				
				{
					"data" : "taxPercentage",
					"width" : "5%"
				},
				
				{
					"data" : "discountPercentage",
					"width" : "5%"
				},
				
				{
					"data" : "taxAmount",
					"width" : "5%"
				},
				{
					"data" : "discountAmount",
					"width" : "5%"
				},				
				{
					"data" : "totalAmount",
					"width" : "5%"
				} ],
				dom : 'Bfrtip',
//				buttons : [ 'copy', 'csv', 'excel', 'pdf', 'print' ]

				buttons : [
				           //'print',
				           				           
				           {	extend: 'print',
				        	    orientation: 'landscape',
				        	   	title: 'Date Range Wise Purchase Report From '+startDate+' to '+endDate,
				        	   	footer:true,
				        	   	pageSize: 'LEGAL' },
				           
			               { 	extend: 'copyHtml5',
				                orientation: 'landscape',
				                title: 'Date Range Wise Purchase Report From '+startDate+' to '+endDate,
				                footer:true,
				                pageSize: 'LEGAL' },

				           { 	extend: 'excelHtml5',
				                orientation: 'landscape', 
				                title: 'Date Range Wise Purchase Report From '+startDate+' to '+endDate,
				                messageTop: 'Date Range Wise Purchase Report From '+startDate+' to '+endDate,
				                footer:true,
				                pageSize: 'LEGAL' },
				                
				           { 	extend: 'csvHtml5',
				                orientation: 'landscape',
				                title: 'Date Range Wise Purchase Report From '+startDate+' to '+endDate,
				                footer:true,
				                pageSize: 'LEGAL' },
				           
				           
						 //{ extend: 'copyHtml5', footer: true },
						 //{ extend: 'excelHtml5', footer: true },
						 //{ extend: 'csvHtml5', footer: true },
						 { extend: 'pdfHtml5',
				                orientation: 'landscape', 
				                title: 'Date Range Wise Purchase Report From '+startDate+' to '+endDate,
				                footer:true,
				                pageSize: 'LEGAL' } ]
			});
		});

		var mydata = catmap;
		$('#purchaseRange').dataTable().fnAddData(mydata);

	}

	);
}

/** ************* Between Two Dates ********** */

function GSTSummaryReportBetweenTwoDates() {

	var params = {};
	var fisDate3 = $("#fisDate3").val();
	var endDate3 = $("#endDate3").val();

	params["fisDate3"] = fisDate3;
	params["endDate3"] = endDate3;
	params["methodName"] = "GSTSummaryReportBetweenTwoDates";

	$.post('/Shop/jsp/utility/controller.jsp', params, function(data) {
		$('#GSTSummaryRange').dataTable().fnClearTable();

		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;

		$(document).ready(function() {
			var total = $('#GSTSummaryRange').DataTable({
				dom : 'Bfrtip',
				buttons : [ 'copy', ' csv', ' excel', 'pdf', 'print' ],

				fnRowCallback : function(nRow, aData, iDisplayIndex) {
					$("th:first", nRow).html(iDisplayIndex + 1);
					return nRow;
				},

				/*
				 * "footerCallback": function ( row, data, start, end, display ) {
				 * var api = this.api(), data;
				 *  // Remove the formatting to get integer data for summation
				 * var intVal = function ( i ) { return typeof i === 'string' ?
				 * i.replace(/[\$,]/g, '')*1 : typeof i === 'number' ? i : 0; };
				 *  // Total over all pages total = api .column( 7 ) .data()
				 * .reduce( function (a, b) { return intVal(a) + intVal(b); }, 0 );
				 * console.log(total); // Total over this page pageTotal = api
				 * .column( 5 ) .data() .reduce( function (a, b) { return
				 * intVal(a) + intVal(b); }, 0 );
				 * 
				 *  // Update footer $( api.column( 7 ).footer() ).html( //
				 * 'Rs'+' '+pageTotal.toFixed(2) str = pageTotal.toFixed(0) );
				 * console.log( pageTotal);
				 *  // Total over this page
				 * 
				 * 
				 *  },
				 */

				destroy : true,
				searching : true,

				columns : [ {
					"data" : "billNo",
					"width" : "5%"
				}, {
					"data" : "purchaseDate",
					"width" : "5%"
				}, {
					"data" : "productName",
					"width" : "5%"
				}, {
					"data" : "quantity2",
					"width" : "5%"
				},/* {
					"data" : "batchNo",
					"width" : "5%"
				},*/ {
					"data" : "buyPrice",
					"width" : "5%"
				}, {
					"data" : "taxPercentage",
					"width" : "5%"
				}, {
					"data" : "igstPercentage",
					"width" : "5%"
				}, {
					"data" : "cgstAmount",
					"width" : "5%"
				}, {
					"data" : "sgstAmount",
					"width" : "5%"
				}, {
					"data" : "igstAmount",
					"width" : "5%"
				} ],
				dom : 'Bfrtip',
				buttons : [ 'copy', 'csv', 'excel', 'pdf', 'print' ]

			});
		});

		var mydata = catmap;
		$('#GSTSummaryRange').dataTable().fnAddData(mydata);

	}

	);

}

/* Supplier wise purchase report */

function supplierWisePurchaseReportValidate() 
{
	var fkSupplierId=$("#fkSupplierId").val();
	if(fkSupplierId != null && fkSupplierId != "")
	{
		supplierWisePurchaseReport();
	}
	else
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
	
	/*if(fkSupplierId == "")
	{ 
       var msg="Please Select Category Name.";
		
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
	
	supplierWisePurchaseReport();*/
	
	
	
}

function supplierWisePurchaseReport()
{	
	var SupplierName = $("#fkSupplierId").val();

     //alert("Supplier Name:---------"+SupplierName);
	var params = {};

	var input11 = document.getElementById('fkSupplierId'), list1 = document
			.getElementById('sup_drop'), i, fk_supplier_id;
	for (i = 0; i < list1.options.length; ++i) {
		if (list1.options[i].value === input11.value) {
			fk_supplier_id = list1.options[i].getAttribute('data-value');
		}
	}

	params["supplier"] = fk_supplier_id;

	params["methodName"] = "getPurchaseDetailsAsPerSupplier";

	$.post('/Shop/jsp/utility/controller.jsp', params, function(data) {

		$('#purchase3').dataTable().fnClearTable();

		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		
		if(catmap == "" || catmap == null)
		{
			alert("No Supplier Name Wise Purchase Reports for\nSupplier Name = "+SupplierName);
			return false;
		}

		$(document).ready(function() {
			var total = $('#purchase3').DataTable({

			    "bProcessing": true,
			    "sAutoWidth": false,
			    "bDestroy":true,
			    "sPaginationType": "bootstrap", // full_numbers
			    "iDisplayStart ": 10,
			    "iDisplayLength": 10,
			    "bPaginate": false, //hide pagination
			    //"bFilter": false, //hide Search bar
			    "bInfo": true, // hide showing entries
				
				fnRowCallback : function(nRow, aData, iDisplayIndex) {
					$("th:first", nRow).html(iDisplayIndex + 1);
					return nRow;
				},
				
				//for Total Rs:
				
				 "footerCallback": function ( row, data, start, end, display ) {
			            var api = this.api(), data;
			 
			            // Remove the formatting to get integer data for summation
			            var intVal = function ( i ) {
			                return typeof i === 'string' ?
			                    i.replace(/[\$,]/g, '')*1 :
			                    typeof i === 'number' ?
			                        i : 0;
			            };
			            
			            
			            pageTotal = api.column( 13 ).data().reduce( function (a, b) {
							return intVal(a) + intVal(b);
						}, 0 );


						// Update footer
						$( api.column( 13 ).footer() ).html(
								str = pageTotal.toFixed(0)
						);
						console.log( pageTotal);
						 pageTotal = api.column( 14 ).data().reduce( function (a, b) {
								return intVal(a) + intVal(b);
							}, 0 );


							// Update footer
							$( api.column( 14 ).footer() ).html(
									str = pageTotal.toFixed(0)
							);
							console.log( pageTotal);
				 
							 pageTotal = api.column( 15 ).data().reduce( function (a, b) {
									return intVal(a) + intVal(b);
								}, 0 );


								// Update footer
								$( api.column( 15 ).footer() ).html(
										str = pageTotal.toFixed(0)
								);
								console.log( pageTotal);
								
								 pageTotal = api.column( 17 ).data().reduce( function (a, b) {
										return intVal(a) + intVal(b);
									}, 0 );


									// Update footer
									$( api.column( 17 ).footer() ).html(
											str = pageTotal.toFixed(0)
									);
									console.log( pageTotal);
						 
					 
			 
			 /*           // Total over all pages
			            total = api
			                .column( 13 )
			                .data()
			                .reduce( function (a, b) {
			                    return intVal(a) + intVal(b);
			                }, 0 ); 
			 			console.log(total); 
			            // Total over this page
			            pageTotal = api
			                .column( 14 )
			                .data()
			                .reduce( function (a, b) {
			                    return intVal(a) + intVal(b);
			                }, 0 );
			 
			            // Update footer
			            $( api.column( 14 ).footer() ).html(
			            		
			              parseFloat(pageTotal).toFixed(2)
			               
			            );
			            console.log( pageTotal);
			            
			            pageTotal = api
		                .column( 15 )
		                .data()
		                .reduce( function (a, b) {
		                    return intVal(a) + intVal(b);
		                }, 0 );
		 
		            // Update footer
		            $( api.column( 15 ).footer() ).html(
		            		
		              parseFloat(pageTotal).toFixed(2)
		               
		            );
		            console.log( pageTotal);
		            
		            pageTotal = api
	                .column( 16 )
	                .data()
	                .reduce( function (a, b) {
	                    return intVal(a) + intVal(b);
	                }, 0 );
	 
	            // Update footer
	            $( api.column( 16 ).footer() ).html(
	            		
	              parseFloat(pageTotal).toFixed(2)
	               
	            );
	            console.log( pageTotal);*/
				 },

				destroy : true,
				searching : true,
				"scrollY": false,
		        "paging":   false,
		        "scrollX": true,
		       
		        
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
				}, /*{
					"data" : "dcNo",
					"width" : "5%"
				},*/ {
					"data" : "batchNo",
					"width" : "5%"
				}, {
					"data" : "barcodeNo",
					"width" : "5%"
				}, {
					"data" : "buyPrice",
					"width" : "5%"
				}, {
					"data" : "salePrice",
					"width" : "5%"
				}, {
					"data" : "mrp",
					"width" : "5%"
				}, {
					"data" : "weight",
					"width" : "5%"
				}, 
				{
					"data" : "unitName",
					"width" : "5%"
				},
				{
					"data" : "quantity2",
					"width" : "5%"
				},
				
				{
					"data" : "taxPercentage",
					"width" : "5%"
				},
				
				{
					"data" : "discountPercentage",
					"width" : "5%"
				},
				{
					"data" : "taxAmount",
					"width" : "5%"
				},
				{
					"data" : "discountAmount",
					"width" : "5%"
				},
				 {
					"data" : "totalAmount",
					"width" : "5%"
				}
				],

				
				
				dom : 'Bfrtip',
				//buttons : [ 'copy', 'csv', 'excel', 'pdf', 'print' ],

				buttons : [
				           //'print',
				           				           
				           {	extend: 'print',
				        	    orientation: 'landscape',
				                title: 'Purchase Report Supplier Name Wise\nSupplier Name = '+SupplierName,
				        	   	footer:true,
				        	   	pageSize: 'LEGAL' },
				           
			               { 	extend: 'copyHtml5',
				                orientation: 'landscape',
				                title: 'Purchase Report Supplier Name Wise\nSupplier Name = '+SupplierName,
				                footer:true,
				                pageSize: 'LEGAL' },

				           { 	extend: 'excelHtml5',
				                orientation: 'landscape', 
				                title: 'Purchase Report Supplier Name Wise\nSupplier Name = '+SupplierName,
				                footer:true,
				                pageSize: 'LEGAL' },
				                
				           { 	extend: 'csvHtml5',
				                orientation: 'landscape',
				                title: 'Purchase Report Supplier Name Wise\nSupplier Name = '+SupplierName,
				                footer:true,
				                pageSize: 'LEGAL' },
				           
				           
						 //{ extend: 'copyHtml5', footer: true },
						 //{ extend: 'excelHtml5', footer: true },
						 //{ extend: 'csvHtml5', footer: true },
						 { 		extend: 'pdfHtml5',
				                orientation: 'landscape',
				                title: 'Purchase Report Supplier Name Wise\nSupplier Name = '+SupplierName,
				                footer:true,
				                pageSize: 'LEGAL' } ],
				 

			});
		});

		var mydata = catmap;
		$('#purchase3').dataTable().fnAddData(mydata);

	}

	);

}

/* Shop wise purchase report */

function shopWisePurchaseReportValidate()
{
	var fisDate3 = $("#fisDate9").val();
	var endDate3 = $("#endDate9").val();
	var shopName = $("#fkShopId").val(); 
	
	if(fisDate3 != null && fisDate3 != "")
		{
			if(endDate3 != null && endDate3 != "")
				{
					if(shopName != null && shopName != "")
						{
							shopWisePurchaseReport();
						}
					else
						{
							var msg="Please Select Shop Name";
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
					var msg="Please Enter End Purchase Date";
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
			var msg="Please Enter Start Purchase Date";
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

function shopWisePurchaseReport()
{
	var params = {};
	var fisDate3 = $("#fisDate9").val();
	var endDate3 = $("#endDate9").val();
	var shopName = $("#fkShopId").val(); 
	
	var input11 = document.getElementById('fkShopId'), list1 = document
			.getElementById('shp_drop'), i, fk_supplier_id;
	for (i = 0; i < list1.options.length; ++i) {
		if (list1.options[i].value === input11.value) {
			fk_shop_id = list1.options[i].getAttribute('data-value');
		}
	}

	params["shop"] = fk_shop_id;
	params["fisDate3"] = fisDate3;
	params["endDate3"] = endDate3;

	params["methodName"] = "getPurchaseDetailsAsPerShop";

	$.post('/Shop/jsp/utility/controller.jsp', params, function(data) {

		$('#purchase4').dataTable().fnClearTable();

		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		
		if(catmap == "" || catmap == null)
		{
			alert("No Shop Name Wise Purchase Reports for\nStart Date = "+fisDate3+"\nEnd Date = "+endDate3+"\nShop Name = "+shopName);
			return false;
		}

		$(document).ready(function() {
			var total = $('#purchase4').DataTable({

			    "bProcessing": true,
			    "sAutoWidth": false,
			    "bDestroy":true,
			    "sPaginationType": "bootstrap", // full_numbers
			    "iDisplayStart ": 10,
			    "iDisplayLength": 10,
			    "bPaginate": false, //hide pagination
			    //"bFilter": false, //hide Search bar
			    "bInfo": true, // hide showing entries
				
				fnRowCallback : function(nRow, aData, iDisplayIndex) {
					$("th:first", nRow).html(iDisplayIndex + 1);
					return nRow;
				},
				
				//for Total Rs:
				
				 "footerCallback": function ( row, data, start, end, display ) {
			            var api = this.api(), data;
			 
			            // Remove the formatting to get integer data for summation
			            var intVal = function ( i ) {
			                return typeof i === 'string' ?
			                    i.replace(/[\$,]/g, '')*1 :
			                    typeof i === 'number' ?
			                        i : 0;
			            };
			 
			            // Total over all pages
			            /* total = api
			                .column( 6 )
			                .data()
			                .reduce( function (a, b) {
			                    return intVal(a) + intVal(b);
			                }, 0 ); 
			 			console.log(total); */
			            // Total over this page
			            pageTotal = api
			                .column( 14 )
			                .data()
			                .reduce( function (a, b) {
			                    return intVal(a) + intVal(b);
			                }, 0 );
			 
			            // Update footer
			            $( api.column( 14 ).footer() ).html(
			            		
			              parseFloat(pageTotal).toFixed(2)
			               
			            );
			            console.log( pageTotal);
			            
			         // Total over this page
			            pageTotal = api
			                .column( 15 )
			                .data()
			                .reduce( function (a, b) {
			                    return intVal(a) + intVal(b);
			                }, 0 );
			 
			            // Update footer
			            $( api.column( 15 ).footer() ).html(
			            		
			              parseFloat(pageTotal).toFixed(2)
			               
			            );
			            console.log( pageTotal);
			            pageTotal = api
		                .column( 16 )
		                .data()
		                .reduce( function (a, b) {
		                    return intVal(a) + intVal(b);
		                }, 0 );
		 
		            // Update footer
		            $( api.column( 16 ).footer() ).html(
		            		
		              parseFloat(pageTotal).toFixed(2)
		               
		            );
		            console.log( pageTotal);
				 },

				
				
				

				destroy : true,
				searching : true,
			/*	"scrollY": 300,*/
				"scrollY": false,
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
				},/* {
					"data" : "dcNo",
					"width" : "5%"
				},*/ {
					"data" : "batchNo",
					"width" : "5%"
				}, {
					"data" : "barcodeNo",
					"width" : "5%"
				}, {
					"data" : "buyPrice",
					"width" : "5%"
				}, {
					"data" : "salePrice",
					"width" : "5%"
				}, {
					"data" : "mrp",
					"width" : "5%"
				}, {
					"data" : "weight",
					"width" : "5%"
				},
				{
					"data" : "unitName",
					"width" : "5%"
				},
				{
					"data" : "quantity2",
					"width" : "5%"
				}, 				
				{
					"data" : "taxPercentage",
					"width" : "5%"
				},				
				{
					"data" : "taxAmount",
					"width" : "5%"
				},
				{
					"data" : "discountAmount",
					"width" : "5%"
				},
				{
					"data" : "totalAmount",
					"width" : "5%"
				} ],
				
				
				dom : 'Bfrtip',
				//buttons : [ 'copy', 'csv', 'excel', 'pdf', 'print' ],

				buttons : [
				           //'print',
				           				           
				           {	extend: 'print',
				        	    orientation: 'landscape',
				                title: 'Purchase Report Shop Name Wise\nShop Name = '+shopName,
				        	   	footer:true,
				        	   	pageSize: 'LEGAL' },
				           
			               { 	extend: 'copyHtml5',
				                orientation: 'landscape',
				                title: 'Purchase Report Shop Name Wise\nShop Name = '+shopName,
				                footer:true,
				                pageSize: 'LEGAL' },

				           { 	extend: 'excelHtml5',
				                orientation: 'landscape',
				                title: 'Purchase Report Shop Name Wise\nShop Name = '+shopName,
				                footer:true,
				                pageSize: 'LEGAL' },
				                
				           { 	extend: 'csvHtml5',
				                orientation: 'landscape',
				                title: 'Purchase Report Shop Name Wise\nShop Name = '+shopName,
				                footer:true,
				                pageSize: 'LEGAL' },
				           
				           
						 //{ extend: 'copyHtml5', footer: true },
						 //{ extend: 'excelHtml5', footer: true },
						 //{ extend: 'csvHtml5', footer: true },
						 { 		extend: 'pdfHtml5',
				                orientation: 'landscape', 
				                title: 'Purchase Report Shop Name Wise\nShop Name = '+shopName,
				                footer:true,
				                pageSize: 'LEGAL' } ]
				
				

			});
		});

		var mydata = catmap;
		$('#purchase4').dataTable().fnAddData(mydata);
	}

	);

}

/* product wise Purchase report */

/* product wise Purchase report */

function purchaseReportAsPerProductNameValidate()
{
	var fk_cat_id = $("#fk_cat_id").val();
	var proName = $("#proName").val();
	//alert("product Name--------"+proName);
	
	if(fk_cat_id != null && fk_cat_id!="")
		{
			if(proName != null && proName != "")
				{
					purchaseReportAsPerProductName();
				}
			else
				{
					var msg="Please Select Product Name";
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
			var msg="Please Select Product Category";
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

function purchaseReportAsPerProductName()
{
	var productcategory = $("#fk_cat_id").val();
				
	var category = $("#fk_cat_id").val();
				var params = {};

				var input1 = document.getElementById('fk_cat_id'), 
					list = document.getElementById('cat_drop'),
					       i, fk_cat_id;
				
				for (i = 0; i < list.options.length; ++i) {
					if (list.options[i].value === input1.value) {
						fk_cat_id = list.options[i].getAttribute('data-value');
					}
				}

				var product=$('#proName').val();
				
				//alert("Product--------"+product);
				var proName=product.split(",")[0];
				var company=product.split(",")[1];
				var weight=product.split(",")[2];
				
				params["cat"] = fk_cat_id;
				params["proName"] = proName;
				params["company"] = company;
				params["weight"] = weight;

				params["methodName"] = "getPurchaseDetailsAsPerProduct";

				$.post('/Shop/jsp/utility/controller.jsp', params, function(data) {

					$('#purchaseAsPerProduct11').dataTable().fnClearTable();
										
					var jsonData = $.parseJSON(data);
					var catmap = jsonData.list;
					
					if(catmap == "" || catmap == null)
					{
						alert("No Product Details Wise Purchase Reports for\nCartegory = "+category+"\nProduct Name = "+proName);
						
						
						
						/*var msg=msg;
						var dialog = bootbox.dialog({
						message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
						closeButton: false
						});			
						setTimeout(function() {
							dialog.modal('hide');
						}, 1500);
						*/
						return false;
					}
					
					console.log(catmap);

					
					$(document).ready(function(catmap) {
						var total = $('#purchaseAsPerProduct11').DataTable({


						    "bProcessing": true,
						    "sAutoWidth": false,
						    "bDestroy":true,
						    "sPaginationType": "bootstrap", // full_numbers
						    "iDisplayStart ": 10,
						    "iDisplayLength": 10,
						    "bPaginate": false, //hide pagination
						    //"bFilter": false, //hide Search bar
						    "bInfo": true, // hide showing entries
							
							//dom : 'Bfrtip',
							//buttons : [ 'copy', ' csv', ' excel', 'pdf', 'print' ],

							fnRowCallback : function(nRow, aData, iDisplayIndex) {
								$("th:first", nRow).html(iDisplayIndex + 1);
								return nRow;
							},		
							
			/*
				 * "footerCallback": function ( row, data, start, end, display ) {
				 * var api = this.api(), data;
				 *  // Remove the formatting to get integer data for summation
				 * var intVal = function ( i ) { return typeof i === 'string' ?
				 * i.replace(/[\$,]/g, '')*1 : typeof i === 'number' ? i : 0; };
				 *  // Total over all pages total = api .column( 8 ) .data()
				 * .reduce( function (a, b) { return intVal(a) + intVal(b); }, 0 );
				 * console.log(total); // Total over this page pageTotal = api
				 * .column( 5 ) .data() .reduce( function (a, b) { return
				 * intVal(a) + intVal(b); }, 0 );
				 * 
				 *  // Update footer $( api.column( 8 ).footer() ).html( //
				 * 'Rs'+' '+pageTotal.toFixed(2) str = pageTotal.toFixed(0) );
				 * console.log( pageTotal);
				 *  // Total over this page
				 * 
				 * 
				 *  },
				 * 
				 */
							
							//for Total Rs:
							
							 "footerCallback": function ( row, data, start, end, display ) 
							 {
						            var api = this.api(), data;
						 
						            // Remove the formatting to get integer data for summation
						            var intVal = function ( i ) 
						            {
						                return typeof i === 'string' ?
						                    i.replace(/[\$,]/g, '')*1 :
						                    typeof i === 'number' ?
						                        i : 0;
						            };
						 
						            // Total over all pages
						             total = api .column( 9 ).data().reduce( function (a, b) 
						            {
						                    
						            	 return intVal(a) + intVal(b);
						             }, 0 ); 
						 			console.log(total);
						 			 // Total over this page
						 			$(api.column(9).footer()).html(parseFloat(total).toFixed(2)
											);console.log(total);
						 			
						         // Total over all pages
						             total = api
						                .column( 10 )
						                .data()
						                .reduce( function (a, b) {
						                    return intVal(a) + intVal(b);
						                }, 0 ); 
						 			console.log(total); 
						            // Total over this page
						 			$(api.column(10).footer()).html(
						 					parseFloat(total).toFixed(2)
											);console.log(total);
						            
						            total = api
					                .column( 11 )
					                .data()
					                .reduce( function (a, b) {
					                    return intVal(a) + intVal(b);
					                }, 0 ); 
					 			console.log(total); 
					            // Total over this page
					 			$(api.column(11).footer()).html(
					 					parseFloat(total).toFixed(2)
										);console.log(total);
						           
							 },
							
							
							
							destroy: true,
							searching: true,
							"scrollY": false,
					        "scrollX": true,
					        "paging":   false,
							

							columns: [
							          {"data": "billNo", "width": "5%", "defaultContent": ""},
							          {"data": "productName" , "width": "5%", "defaultContent": ""},
							          {"data": "purchaseDate" , "width": "5%", "defaultContent": ""},
							          {"data": "buyPrice" , "width": "5%", "defaultContent": ""},
							          {"data": "salePrice" , "width": "5%", "defaultContent": ""},
							          {"data": "weight" , "width": "5%", "defaultContent": ""},
							          {"data": "unitName" , "width": "5%", "defaultContent": ""},
							          {"data": "quantity2" , "width": "5%", "defaultContent": ""},
									  {"data" : "taxPercentage", "width" : "5%", "defaultContent": ""},
									  {"data" : "discountPercentage", "width" : "5%", "defaultContent": ""},
									  {"data" : "taxAmount","width" : "5%", "defaultContent": ""},
									  {"data" : "discountAmount","width" : "5%", "defaultContent": ""},
							          {"data": "totalAmount", "width": "5%", "defaultContent": ""}
							          ],
				
				dom : 'Bfrtip',
				//buttons : [ 'copy', 'csv', 'excel', 'pdf', 'print' ],

				buttons : [
				           //'print',
				           				           
				           {	extend: 'print',
				        	    orientation: 'landscape',
				                title: 'Product Details Wise Purchase Report \nProduct Category = '+productcategory+'\nProduct Name = '+proName+'\nCompany = '+company,
				        	   	footer:true,
				        	   	pageSize: 'LEGAL' },
				           
			               { 	extend: 'copyHtml5',
				                orientation: 'landscape',
				                title: 'Product Details Wise Purchase Report\nProduct Category = '+productcategory+'\nProduct Name = '+proName+'\nCompany = '+company,
				                footer:true,
				                pageSize: 'LEGAL' },

				           { 	extend: 'excelHtml5',
				                orientation: 'landscape', 
				                title: 'Product Details Wise Purchase Report\nProduct Category = '+productcategory+'\nProduct Name = '+proName+'\nCompany = '+company,
				                footer:true,
				                pageSize: 'LEGAL' },
				                
				           { 	extend: 'csvHtml5',
				                orientation: 'landscape',
				                title: 'Product Details Wise Purchase Report\nProduct Category = '+productcategory+'\nProduct Name = '+proName+'\nCompany = '+company,
				                footer:true,
				                pageSize: 'LEGAL' },
				           
				           
						 //{ extend: 'copyHtml5', footer: true },
						 //{ extend: 'excelHtml5', footer: true },
						 //{ extend: 'csvHtml5', footer: true },
						 { 		extend: 'pdfHtml5',
				                orientation: 'landscape', 
				                title: 'Product Details Wise Purchase Report\nProduct Category = '+productcategory+'\nProduct Name = '+proName+'\nCompany = '+company,
				                footer:true,
				                pageSize: 'LEGAL' } ]
			});
		});

		var mydata = catmap;
		$('#purchaseAsPerProduct11').dataTable().fnAddData(mydata);

	}

	);

}

/* Category Wise Purchase report */

function purchaseReportAsPerCat() {

	var params = {};

	var input1 = document.getElementById('fk_cat_id6'), list = document
			.getElementById('cat_drop6'), i, fk_cat_id;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input1.value) {
			fk_cat_id = list.options[i].getAttribute('data-value');
		}
	}

	var fk_cat_id = fk_cat_id;
	params["cat"] = fk_cat_id;
	params["methodName"] = "getPurchaseDetailsAsPerCategory";

	$.post('/Shop/jsp/utility/controller.jsp', params, function(data) {

		$('#purchase4').dataTable().fnClearTable();

		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;

		$(document).ready(function() {
			var total = $('#purchase4').DataTable({

				fnRowCallback : function(nRow, aData, iDisplayIndex) {
					$("th:first", nRow).html(iDisplayIndex + 1);
					return nRow;
				},

				destroy : true,
				searching : false,

				columns : [

				{
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
				}, {
					"data" : "dcNo",
					"width" : "5%"
				}, {
					"data" : "batchNo",
					"width" : "5%"
				}, {
					"data" : "barcodeNo",
					"width" : "5%"
				}, {
					"data" : "buyPrice",
					"width" : "5%"
				}, {
					"data" : "salePrice",
					"width" : "5%"
				}, {
					"data" : "mrp",
					"width" : "5%"
				}, {
					"data" : "weight",
					"width" : "5%"
				}, {
					"data" : "quantity",
					"width" : "5%"
				}, {
					"data" : "totalAmount",
					"width" : "5%"
				} ],

			});
		});

		var mydata = catmap;
		$('#purchase4').dataTable().fnAddData(mydata);

	}

	);

}

// sub category dropdown by rk
function getAllSubCat()
{
	var input = document.getElementById('fk_cat_id'), 
		list1 = document.getElementById('cat_drop'), 
				i, fk_cat_id;

	for (i = 0; i < list1.options.length; ++i) {
		if (list1.options[i].value === input.value) {
			fk_cat_id = list1.options[i].getAttribute('data-value');
		}
	}

	$("#subCat").empty();
	$("#subCat").append($("<option></option>").attr("value", "").text("Select Sub Category"));
	
	var params = {};

	params["fk_cat_id"] = fk_cat_id;

	params["methodName"] = "getSubCategoryDetails";

	$.post('/Shop/jsp/utility/controller.jsp',
			params,
			function(data) {
				var count = 1;

				var jsonData = $.parseJSON(data);
				// var jsonData = jsonData.list;
				$.each(jsonData, function(i, v) {
					$("#subCat").append($("<option></option>").attr("value", count).text(v.subcategoryName + "," + v.subcatId));
					count++;
				});
			}).error(function(jqXHR, textStatus, errorThrown) {
		if (textStatus === "timeout") {

		}
	});
}

// Product name dropdown
function getProductName() {

	var input = document.getElementById('fk_cat_id'), list1 = document
			.getElementById('cat_drop'), i, fk_cat_id;

	for (i = 0; i < list1.options.length; ++i) {
		if (list1.options[i].value === input.value) {
			fk_cat_id = list1.options[i].getAttribute('data-value');
		}
	}

	productId = $('#subCat').val();
	
	var splitText = productId.split(",");

	var fk_subCat_id = splitText[0];
	
	$("#proName").empty();
	$("#proName").append($("<option></option>").attr("value", "").text("Select Product Name"));
	
	var params = {};

	params["fk_cat_id"] = fk_cat_id;
	params["fk_subCat_id"] = fk_subCat_id;
	
	$("#product_drop").empty();
	$("#product_drop").append($("<option></option>").attr("value","").text("Select Bill No"));
	
	params["methodName"] = "getProductNameDetails";

	$.post('/Shop/jsp/utility/controller.jsp',params,function(data) {
				var count = 1;

				var jsonData = $.parseJSON(data);
				//alert(jsonData);
				// var jsonData = jsonData.list;
				$.each(jsonData, function(i, v) {
					$("#product_drop").append(
					$("<option></option>").attr("value",v.productName+","+v.weight+","+v.prodctId+","+v.unitName+","+v.manufacturingCompany));
					count++;
				});
			}).error(function(jqXHR, textStatus, errorThrown) {
		if (textStatus === "timeout") {

		}
	});
}

function getAllShopName() {

	$("#shopName").empty();
	$("#shopName").append(
			$("<option></option>").attr("value", "").text("Select Shop Name"));
	var params = {};

	params["methodName"] = "getShopDetails";

	$.post(
			'/Shop/jsp/utility/controller.jsp',
			params,
			function(data) {
				var count = 1;

				var jsonData = $.parseJSON(data);
				// var jsonData = jsonData.list;
				$.each(jsonData, function(i, v) {
					$("#shopName").append(
							$("<option></option>").attr("value", count).text(
									v.shopName + "," + v.shopId));
					count++;
				});
			}).error(function(jqXHR, textStatus, errorThrown) {
		if (textStatus === "timeout") {

		}
	});
}

/* GST purchase Report */

function purchaseReportAsPerGSTValidate()
{
	var startDate = $("#gstFisDate").val();
	var endDate = $("#gstEndDate").val();
	
	if(startDate != null && startDate != "")
		{
			if(endDate != null && endDate != "")
				{
					purchaseReportAsPerGST();
				}
			else
				{
					var msg="Please Enter End Date";
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
			var msg="Please Enter Start Date";
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

function purchaseReportAsPerGST() {

	var params = {};
	
	var startDate = $("#gstFisDate").val();
	var endDate = $("#gstEndDate").val();	
	
	params["gstFisDate"] = startDate;
	params["gstEndDate"] = endDate;
	params["methodName"] = "getGSTPurchaseReport";

	$.post(	'/Shop/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#gstPurchaseReportTable').dataTable().fnClearTable();

						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;
						
						if(catmap == "" || catmap == null)
						{
							//alert("No GST Wise Purchase Reports for\nStart Date = "+startDate+"\nEnd Date = "+endDate);
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

						$(document)
								.ready(
										function() {
											var total = $(
													'#gstPurchaseReportTable')
													.DataTable(
															{


															    "bProcessing": true,
															    "sAutoWidth": false,
															    "bDestroy":true,
															    "sPaginationType": "bootstrap", // full_numbers
															    "iDisplayStart ": 10,
															    "iDisplayLength": 10,
															    "bPaginate": false, //hide pagination
															    //"bFilter": false, //hide Search bar
															    "bInfo": true, // hide showing entries
																
																
																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	// Total
																	// over all
																	// pages
						/*													total = api
																			.column(
																					6)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);
																	console
																			.log(total);
																	// Total
																	// over this
																	// page
																	// for item
																	// Rate
																	// total
																	pageTotal = api.column(7)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							7)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Quantity
																	// total
																	pageTotal = api
																			.column(
																					8)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							8)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Quantity
																	// total
																	pageTotal = api
																			.column(
																					9)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							9)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);
*/
																	pageTotal = api
																			.column(
																					12)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							12)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Quantity
																	// total
																	pageTotal = api
																			.column(
																					13)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							13)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Quantity
																	// total
																	pageTotal = api
																			.column(
																					14)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							14)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	pageTotal = api
																			.column(
																					15)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							15)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Quantity
																	// total
																	pageTotal = api
																			.column(
																					16)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							16)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Quantity
																	// total
																	pageTotal = api
																			.column(
																					17)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							17)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	pageTotal = api
																			.column(
																					18)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							18)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Quantity
																	// total
																	pageTotal = api
																			.column(
																					19)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							19)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																			
																			
																	console
																			.log(pageTotal);

																	// Quantity
																	// total
																	pageTotal = api
																			.column(
																					20)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							20)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Quantity
																	// total
																	pageTotal = api
																			.column(
																					21)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							21)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);
																	
																	
																	pageTotal = api
																	.column(
																			22)
																	.data()
																	.reduce(
																			function(
																					a,
																					b) {
																				return intVal(a)
																						+ intVal(b);
																			},
																			0);

															// Update
															// footer
															$(
																	api
																			.column(
																					22)
																			.footer())
																	.html(

																			parseFloat(
																					pageTotal)
																					.toFixed(
																							2)

																	);
															console
																	.log(pageTotal);
																			

																},

																destroy : true,
																searching : true,
																 "scrollY": false,
															        "scrollX": true,
															        "paging":   false,

																columns : [
																		{
																			"data" : "serialnumber",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "saleDate",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "supplierName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "gstNumber",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "hsnNumber",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "weight",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "unit",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "buyPrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "quanti",
																			"width" : "5%",
																			"defaultContent" : ""
																		},

																		{
																			"data" : "totalAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "fivePercentageGST",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "twelwePercentageGST",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "eighteenPercentageGST",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "twentyEightPercentageGST",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "iGSTFivePercentage",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "iGSTTwelwePercentage",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "iGSTEighteenPercentage",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "iGSTTwentyeightPercentage",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "totalTaxAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "discountAmount111",
																			"width" : "5%"
																		},																		
																		{
																			"data" : "netAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		} ],

/*																dom : 'Bfrtip',
																buttons : [
																           'print',
																		 { extend: 'copyHtml5', footer: true },
																		 { extend: 'excelHtml5', footer: true },
																		 { extend: 'csvHtml5', footer: true },
																		 { extend: 'pdfHtml5',
																                orientation: 'landscape',
																                footer:true,
																                pageSize: 'LEGAL' } ],
*/																                
																                
																                
		            
		            
					dom : 'Bfrtip',
					//buttons : [ 'copy', 'csv', 'excel', 'pdf', 'print' ],
		
					buttons : [
					           //'print',
					           				           
					           {	extend: 'print',
					        	    orientation: 'landscape',
					                title: 'Purchase Report GST Wise From '+startDate+' To '+endDate,
					        	   	footer:true,
					        	   	pageSize: 'LEGAL' },
					           
				               { 	extend: 'copyHtml5',
					                orientation: 'landscape',
					                title: 'Purchase Report GST Wise From '+startDate+' To '+endDate,
					                footer:true,
					                pageSize: 'LEGAL' },
		
					           { 	extend: 'excelHtml5',
					                orientation: 'landscape', 
					                title: 'Purchase Report GST Wise From '+startDate+' To '+endDate,
					                footer:true,
					                pageSize: 'LEGAL' },
					                
					           { 	extend: 'csvHtml5',
					                orientation: 'landscape',
					                title: 'Purchase Report GST Wise From '+startDate+' To '+endDate,
					                footer:true,
					                pageSize: 'LEGAL' },
					           
					           
							 //{ extend: 'copyHtml5', footer: true },
							 //{ extend: 'excelHtml5', footer: true },
							 //{ extend: 'csvHtml5', footer: true },
							 { 		extend: 'pdfHtml5',
					                orientation: 'landscape', 
					                title: 'Purchase Report GST Wise From '+startDate+' To '+endDate,
					                footer:true,
					                pageSize: 'LEGAL' } ],										                
																                
							});
					});

						var mydata = catmap;
						$('#gstPurchaseReportTable').dataTable().fnAddData(
								mydata);

					}

			);

}
					/*---------------------------- Purchase Return ----------------------*/


/*function supplierWisePurchaseReturnReportValidate()
{
	var purchaseReturnFisDate = $("#purchaseReturnFisDate").val();
	var purchaseReturnEndDate = $("#purchaseReturnEndDate").val();
	var fkSupplierId_Purchase_Return = $("#fkSupplierId_Purchase_Return").val();
	
	if(purchaseReturnFisDate != null && purchaseReturnFisDate !="")
		{
			if(purchaseReturnEndDate != null && purchaseReturnEndDate !="")
			{
				if(fkSupplierId_Purchase_Return != null && fkSupplierId_Purchase_Return != "")
				{
					supplierWisePurchaseReturnReport();
				}
				else
				{
					alert("Please Select Supplier Name");
				}
			}
			else
				{
					alert("Please Enter End Date");
				}
			}
		else
		{
			alert("Please Enter Start Date");
		}
}

function supplierWisePurchaseReturnReport() {
	var params = {};

	
	
	var input11 = document.getElementById('supplierWisePurchaseReturnReport'),
	list1 = document.getElementById('sup_drop_Purchase_return'), i, fk_supplier_id_purchase_return;
	for (i = 0; i < list1.options.length; ++i)
	{
		if (list1.options[i].value === input11.value)
		{
			fk_supplier_id_purchase_return = list1.options[i]
					.getAttribute('data-value');
		}
	}
	
	

	var firstDate = $("#purchaseReturnFisDate").val();
	var secondDate = $("#purchaseReturnEndDate").val();
	var fkSupplierId_Purchase_Return = $("#fkSupplierId_Purchase_Return").val();

	//params["supplier"] = fk_supplier_id_purchase_return;
	params["firstDate"] = firstDate;
	params["secondDate"] = secondDate;
	params["supplier"] = fkSupplierId_Purchase_Return;
	
	params["methodName"] = "getPurchaseReturnDetailsAsPerSupplierBetweenTwoDate";

	$.post('/Shop/jsp/utility/controller.jsp', params, function(data) {

		$('#purchaseReturnTable').dataTable().fnClearTable();

		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		
		if(catmap == "" || catmap == null)
		{
			alert("NO Purchase Return Report For\nStart Date = "+firstDate+"\nEnd Date = "+secondDate+"\nSupplier Name = "+fkSupplierId_Purchase_Return);
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
			    "bInfo": true, // hide showing entries
				
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
				}, {
					"data" : "dcNo",
					"width" : "5%"
				}, {
					"data" : "batchNo",
					"width" : "5%"
				}, {
					"data" : "barcodeNo",
					"width" : "5%"
				}, {
					"data" : "buyPrice",
					"width" : "5%"
				}, {
					"data" : "salePrice",
					"width" : "5%"
				}, {
					"data" : "mrp",
					"width" : "5%"
				}, {
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
				        	   	title: 'Purchase Return Wise Purchase Report From '+firstDate+' to '+secondDate+'\n'+'Supplier Name = '+fkSupplierId_Purchase_Return,
				        	   	footer:true,
				        	   	pageSize: 'LEGAL' },
				           
			               { 	extend: 'copyHtml5',
				                orientation: 'landscape',
				        	   	title: 'Purchase Return Wise Purchase Report From '+firstDate+' to '+secondDate+'\n'+'Supplier Name = '+fkSupplierId_Purchase_Return,
				                footer:true,
				                pageSize: 'LEGAL' },

				           { 	extend: 'excelHtml5',
				                orientation: 'landscape', 
				        	   	title: 'Purchase Return Wise Purchase Report From '+firstDate+' to '+secondDate+'\n'+'Supplier Name = '+fkSupplierId_Purchase_Return,
				                messageTop: 'Purchase Return Wise Purchase Report From '+firstDate+' to '+secondDate+'\n'+'Supplier Name = '+fkSupplierId_Purchase_Return,
				                footer:true,
				                pageSize: 'LEGAL' },
				                
				           { 	extend: 'csvHtml5',
				                orientation: 'landscape',
				        	   	title: 'Purchase Return Wise Purchase Report From '+firstDate+' to '+secondDate+'\n'+'Supplier Name = '+fkSupplierId_Purchase_Return,
				                footer:true,
				                pageSize: 'LEGAL' },
				           
				           
						 //{ extend: 'copyHtml5', footer: true },
						 //{ extend: 'excelHtml5', footer: true },
						 //{ extend: 'csvHtml5', footer: true },
						 { extend: 'pdfHtml5',
				                orientation: 'landscape', 
				        	   	title: 'Purchase Return Wise Purchase Report From '+firstDate+' to '+secondDate+'\n'+'Supplier Name = '+fkSupplierId_Purchase_Return,
				                messageTop: 'Purchase Return Wise Purchase Report From '+firstDate+' to '+secondDate+'\n'+'Supplier Name = '+fkSupplierId_Purchase_Return,
				        	   	footer:true,
				                pageSize: 'LEGAL' } ]
				
				
				
			});
		});

		var mydata = catmap;
		$('#purchaseReturnTable').dataTable().fnAddData(mydata);

	}
);
	
	
}	*/
	
	function rangeWiseBillPaidUnpaid()
	{
		var FirstDate7 = $("#FirstDate7").val();
		var EndDate7 = $("#EndDate7").val();
		
		if(FirstDate7 == "")
		{
			var msg="Please Enter Start Date";
			var dialog = bootbox.dialog({
		    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		    closeButton: false
			});			
			setTimeout(function() {
				dialog.modal('hide');
			}, 1500);
			return false;
		}
		
		if(EndDate7 == "")
		{
			var msg="Please Enter End Date";
			var dialog = bootbox.dialog({
		    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		    closeButton: false
			});			
			setTimeout(function() {
				dialog.modal('hide');
			}, 1500);
			return false;
		}
		
		var params = {};
				
		params["FirstDate7"] = FirstDate7;
		params["EndDate7"] = EndDate7;

		params["methodName"] = "rangeWiseBillPaidUnpaidCntrl";

		$.post('/Shop/jsp/utility/controller.jsp', params, function(data) {

			$('#rangeWiseBillReportTable').dataTable().fnClearTable();

			var jsonData = $.parseJSON(data);
			var catmap = jsonData.list;
			
			if(catmap == "" || catmap == null)
			{
				alert("Bill Wise Purchase Reports for\nStart Date = "+FirstDate7+"\nEnd Date = "+EndDate7);
				return false;
			}

			$(document).ready(function() {
				var total = $('#rangeWiseBillReportTable').DataTable({

				    "bProcessing": true,
				    "sAutoWidth": false,
				    "bDestroy":true,
				    "sPaginationType": "bootstrap", // full_numbers
				    "iDisplayStart ": 10,
				    "iDisplayLength": 10,
				    "bPaginate": false, //hide pagination
				    //"bFilter": false, //hide Search bar
				    "bInfo": true, // hide showing entries
					
					fnRowCallback : function(nRow, aData, iDisplayIndex) {
						$("th:first", nRow).html(iDisplayIndex + 1);
						return nRow;
					},
					
					//for Total Rs:
					
					 "footerCallback": function ( row, data, start, end, display ) {
				            var api = this.api(), data;
				 
				            // Remove the formatting to get integer data for summation
				            var intVal = function ( i ) {
				                return typeof i === 'string' ?
				                    i.replace(/[\$,]/g, '')*1 :
				                    typeof i === 'number' ?
				                        i : 0;
				            };
				 
				            // Total over all pages
				            /* total = api
				                .column( 6 )
				                .data()
				                .reduce( function (a, b) {
				                    return intVal(a) + intVal(b);
				                }, 0 ); 
				 			console.log(total); */
				            // Total over this page
				            pageTotal = api.column( 2 ).data().reduce( function (a, b) { ////2/
				                    return intVal(a) + intVal(b);
				                }, 0 );
				 
				            // Update footer
				            $( api.column( 1 ).footer() ).html(    /////////2//////////
				            		
				              parseFloat(pageTotal).toFixed(2)
				               
				            );
				            console.log( pageTotal);
				            
				         // Total over this page
				            pageTotal = api .column( 3 ).data()
				                .reduce( function (a, b) {
				                    return intVal(a) + intVal(b);
				                }, 0 );
				 
				            // Update footer
				            $( api.column( 2 ).footer() ).html(   ///////////3/////////				            		
				              parseFloat(pageTotal).toFixed(2)
				               
				              );
				            console.log( pageTotal);
				            pageTotal = api.column( 4 ).data().reduce( function (a, b) {
			                    return intVal(a) + intVal(b);
			                }, 0 );
			 
			            // Update footer
			               $( api.column( 3 ).footer() ).html(   /////////4/////////
			            		
			                parseFloat(pageTotal).toFixed(2)
			               
			                 );
			                console.log( pageTotal);
			            
			                pageTotal = api.column( 5 ).data()
		                     .reduce( function (a, b) {
		                      return intVal(a) + intVal(b);
		                      }, 0 );
		 
		            // Update footer
		                      $( api.column( 5 ).footer() ).html(
		            		
		                      parseFloat(pageTotal).toFixed(2)
		               
		                        );
		                       console.log( pageTotal);
			            
					 },
					destroy : true,
					searching : true,
					"scrollY": 300,
			        "scrollX": true,
			        "paging":   false,

					columns : [ 
						{"data" : "billNo", "width" : "5%"},
						{"data" : "supplier",	"width" : "5%"},
						{"data" : "totalAmount", "width" : "5%"},
						{"data" : "payment", "width" : "5%" },
						{"data" : "billPaymentPending", "width" : "5%"	},
						{"data" : "expense", "width" : "5%" }
						],
					
					
					dom : 'Bfrtip',
					//buttons : [ 'copy', 'csv', 'excel', 'pdf', 'print' ],

				/*	buttons : [
					           //'print',
					           				           
					           {	extend: 'print',
					        	    orientation: 'landscape',
					                title: 'Purchase Report Shop Name Wise\nShop Name = '+shopName,
					        	   	footer:true,
					        	   	pageSize: 'LEGAL' },
					           
				               { 	extend: 'copyHtml5',
					                orientation: 'landscape',
					                title: 'Purchase Report Shop Name Wise\nShop Name = '+shopName,
					                footer:true,
					                pageSize: 'LEGAL' },

					           { 	extend: 'excelHtml5',
					                orientation: 'landscape',
					                title: 'Purchase Report Shop Name Wise\nShop Name = '+shopName,
					                footer:true,
					                pageSize: 'LEGAL' },
					                
					           { 	extend: 'csvHtml5',
					                orientation: 'landscape',
					                title: 'Purchase Report Shop Name Wise\nShop Name = '+shopName,
					                footer:true,
					                pageSize: 'LEGAL' },
					           
					           
							 //{ extend: 'copyHtml5', footer: true },
							 //{ extend: 'excelHtml5', footer: true },
							 //{ extend: 'csvHtml5', footer: true },
							 { 		extend: 'pdfHtml5',
					                orientation: 'landscape', 
					                title: 'Purchase Report Shop Name Wise\nShop Name = '+shopName,
					                footer:true,
					                pageSize: 'LEGAL' } ]*/
					
					
				
				});
			});

			var mydata = catmap;
			$('#rangeWiseBillReportTable').dataTable().fnAddData(mydata);
		}

		);
	}

	function getPOnumber()
	{		
		var input = document.getElementById('supplier'),
		list = document.getElementById('sup_drop'),
			   i,supplierID;

		for (i = 0; i < list.options.length; ++i) {
			if (list.options[i].value === input.value) {
				supplierID = list.options[i].getAttribute('data-value');
			}
		}
		
		var supplierID = supplierID;
				
		$("#booking").empty();
		$("#booking").append($("<option></option>").attr("value","").text("Select PO No"));
		//$("#booking_drop").append($("<input/>").attr("value","").text());
		
		var params= {};
		params["supplierID"]= supplierID;  

		params["methodName"] = "getPOnumberbySupplierName";

		$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
		{
			var count = 1;
			//alert("data---->"+data);
			var jsonData = $.parseJSON(data);
			//var list123 = jsonData.list;
			
			$.each(jsonData,function(i,v)
			{				
				$("#booking").append($("<option></option>").attr("value", v.bookingNo).text(v.bookingNo));
				count++;
				  //$("#booking_drop").append($("<option></option>").attr("value", i).text(v.bookingNo));
						//document.getElementById("booking").value = v.bookingNo;
					});
		}).error(function(jqXHR, textStatus, errorThrown){
				if(textStatus==="timeout") {

				}
		});
	}
		
	function getgstnumber()
	{		
		var input = document.getElementById('supplier'),
		list = document.getElementById('sup_drop'),
			   i,supplierID;

		for (i = 0; i < list.options.length; ++i) {
			if (list.options[i].value === input.value) {
				supplierID = list.options[i].getAttribute('data-value');
			}
		}
		
		var supplierID = supplierID;
				
	/*	$("#gstno").empty();
		$("#gstno").append($("<option></option>").attr("value","").text("Enter Gst No"));
		//$("#booking_drop").append($("<input/>").attr("value","").text());
*/		
		$("#gstno").append($("<input/>").attr("value","").text());
		var params= {};
		params["supplierID"]= supplierID;  

		params["methodName"] = "getgstnumberbySupplierName";

		$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
		{
			var count = 1;
			//alert("data---->"+data);
			var jsonData = $.parseJSON(data);
			//var list123 = jsonData.list;
			
			$.each(jsonData,function(i,v)
			{				
				/*$("#gstno").append($("<option></option>").attr("value", v.gstno).text(v.gstno));
				count++;*/
				  //$("#booking_drop").append($("<option></option>").attr("value", i).text(v.bookingNo));
						//document.getElementById("booking").value = v.bookingNo;
				document.getElementById("gstno").value = v.gstno;		
			});
		}).error(function(jqXHR, textStatus, errorThrown){
				if(textStatus==="timeout") {

				}
		});

}
	