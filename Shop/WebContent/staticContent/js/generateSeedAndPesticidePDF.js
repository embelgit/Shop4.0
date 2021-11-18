function normalCustFertilzerBillCOPYValidate()
{
	var BillNo = $("#BillNo").val();
	var fDate = $("#fDate").val();
	
	if(fDate == "")
	{		
		var msg="Please Enter Normal Customer Name";
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
	if(BillNo == "")
	{		
		var msg="Please Enter Normal Customer Bill Number";
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
//				window.open("AutoBillpdf.jsp");
				
				//window.open("newPDF.jsp");
				window.open("NewPdf1.jsp");
				//window.open("TrinityEnterprisesBillPdf.jsp");
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
	var cDate = $("#cDate").val();
	
	if(cDate == "")
	{		
		var msg="Please Enter Credit Customer Name";
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
	if(CreditBillNo == "")
	{		
		var msg="Please Enter Credit Customer Bill Number";
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
			//	window.open("AutoBillpdf.jsp");
				//window.open("newPDF.jsp");
				window.open("NewPdf1.jsp");
				//window.open("TrinityEnterprisesBillPdf.jsp");
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