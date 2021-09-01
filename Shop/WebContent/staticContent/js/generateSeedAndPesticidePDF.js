function normalCustFertilzerBillCOPYValidate()
{
	var BillNo = $("#BillNo").val();
	
	if(BillNo == "")
	{		
		alert("Please Enter Normal Customer Bill Number");
		return false;
	}
	else
	{
		normalCustFertilzerBillCOPY();
	}
}


function normalCustFertilzerBillCOPY()
{
	document.getElementById("btn").disabled = true;

	var input = document.getElementById('BillNo'), list = document
			.getElementById('seedBillNo'), i, billNo;
	
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			billNo = list.options[i].getAttribute('data-value');
		}
	}
	
	var subCat=$('#BillNo').val();
	var splitvar=subCat.split(" - ");
	var subcatId= splitvar[0];
	
	var params = {};
	params["billNo"] = subcatId;
//alert("bill - "+subcatId)
	params["methodName"] = "NormalCustFertilizerBillCOPY";

	$.post('/Shop/jsp/utility/controller.jsp', params,
			function(data) {
				location.reload(true);
//				window.open("COPYnormalCustomerBillPdf.jsp");
//				window.open("billcopypdf1.jsp");
				window.open("AutoBillpdf.jsp");
				
				//window.open("newPDF.jsp");
				document.getElementById("btn").disabled = false;
			}).error(function(jqXHR, textStatus, errorThrown) {
		if (textStatus === "timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});

}

function creditCustFertilzerBillCOPYValidate()
{
	var CreditBillNo = $("#CreditBillNo").val();
	
	if(CreditBillNo == "")
		{
			alert("Please Enter Credit Customer Bill Number");
			return false;
		}
	else
		{
			creditCustFertilzerBillCOPY();
		}
}

function creditCustFertilzerBillCOPY()
{
	document.getElementById("btn").disabled = true;

	var input = document.getElementById('CreditBillNo'), list = document
			.getElementById('creditCustBillNo'), i, billNo;
	
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			billNo = list.options[i].getAttribute('data-value');
		}
	}
	
	var subCat=$('#CreditBillNo').val();
	var splitvar=subCat.split(" - ");
	var subcatId= splitvar[0];
	
	
	var params = {};
	params["creditCustbillNo"] = subcatId;
//	params["creditCustbillNo"] = billNo;

	params["methodName"] = "creditCustFertilzerBillCOPY";

	$.post('/Shop/jsp/utility/controller.jsp', params,
			function(data)
			{
				location.reload();
				/* location.reload(true);*/
	//			window.open("COPYCreditCustomerBillPdf.jsp");
//				window.open("creditbillcopy.jsp");
				window.open("AutoBillpdf.jsp");
				//window.open("newPDF.jsp");
				document.getElementById("btn").disabled = false;
			}).error(function(jqXHR, textStatus, errorThrown) {
		if (textStatus === "timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});

}





function billGeneration() {
	// document.genIn.btn.disabled = true;

	var input = document.getElementById('BillNo'), list = document
			.getElementById('seedBillNo'), i, billNo;
	
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			billNo = list.options[i].getAttribute('data-value');
		}
	}
	var params = {};
	params["billNo"] = billNo;

	params["methodName"] = "billGeneration";

	$.post('/Shop/jsp/utility/controller.jsp', params,
			function(data) {
				location.reload(true);
				window.open("COPY_SeedPesticide_normalCustomerBillPdf.jsp");
			}).error(function(jqXHR, textStatus, errorThrown) {
		if (textStatus === "timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});

}


function billGenerationForNormalPesti() {
	// document.genIn.btn.disabled = true;

	var input = document.getElementById('BillNo'), list = document
			.getElementById('seedBillNo'), i, billNo;
	
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			billNo = list.options[i].getAttribute('data-value');
		}
	}
	var params = {};
	params["billNo"] = billNo;

	params["methodName"] = "billGeneration";

	$.post('/Shop/jsp/utility/controller.jsp', params,
			function(data) {
				location.reload(true);
				window.open("COPY_Pesticide_normal_customer_PDF.jsp");
			}).error(function(jqXHR, textStatus, errorThrown) {
		if (textStatus === "timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});

}


function CreditCustBillGeneration() {
	// document.genIn.btn.disabled = true;

	var input = document.getElementById('CreditBillNo'), list = document
			.getElementById('creditCustBillNo'), i, billNo;
	
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			billNo = list.options[i].getAttribute('data-value');
		}
	}
	var params = {};
	params["creditCustbillNo"] = billNo;

	params["methodName"] = "CreditCustmerBillCOPY";

	$.post('/Shop/jsp/utility/controller.jsp', params,
			function(data) {
				location.reload(true);
				window.open("COPY_SeddPesticide_Credit_CustomerBillPdf.jsp");
			}).error(function(jqXHR, textStatus, errorThrown) {
		if (textStatus === "timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});

}



function CreditCustBillGenerationForPesticide() {
	// document.genIn.btn.disabled = true;

	var input = document.getElementById('CreditBillNo'), list = document
			.getElementById('creditCustBillNo'), i, billNo;
	
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			billNo = list.options[i].getAttribute('data-value');
		}
	}
	var params = {};
	params["creditCustbillNo"] = billNo;

	params["methodName"] = "CreditCustmerBillCOPY";

	$.post('/Shop/jsp/utility/controller.jsp', params,
			function(data) {
				location.reload(true);
				window.open("COPY_Pesticide_Credit_cust_Bill_PDF.jsp");
			}).error(function(jqXHR, textStatus, errorThrown) {
		if (textStatus === "timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});

}

//

function getAllbill(){
	 

	var date = $('#fDate').val();
//	alert(date);
	$("#seedBillNo").empty();
	$("#seedBillNo").append($("<option></option>").attr("value","").text("Select Bill No"));
	var params = {};
	
	params["date"] =date;
	
	
	params["methodName"] = "getbillcopybill";

	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
			{
		var count = 1;
		
		var jsonData = $.parseJSON(data);

		$.each(jsonData,function(i,v)
				{
			$("#seedBillNo").append($("<option></option>").attr("value",(v.billNo + " - "+v.date))); 
			count++;
				});
			}).error(function(jqXHR, textStatus, errorThrown){
				if(textStatus==="timeout") {

				}
			});
}

//

function getAllcreditbill(){
	 

		var date = $('#cDate').val();
//		alert(date);
		$("#creditCustBillNo").empty();
		$("#creditCustBillNo").append($("<option></option>").attr("value","").text("Select Bill No"));
		var params = {};
		
		params["date"] =date;
		
		
		params["methodName"] = "getbillcopycreditbill";

		$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
				{
			var count = 1;
			
			var jsonData = $.parseJSON(data);

			$.each(jsonData,function(i,v)
					{
				$("#creditCustBillNo").append($("<option></option>").attr("value",(v.billNo + " - "+v.date))); 
				count++;
					});
				}).error(function(jqXHR, textStatus, errorThrown){
					if(textStatus==="timeout") {

					}
				});
	}