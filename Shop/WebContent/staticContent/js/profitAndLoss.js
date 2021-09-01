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

function profitAndLossBetweenTwoDatesValidate()
{
	var fisDate2=$("#fisDate2").val();
	var endDate2=$("#endDate2").val();
	
	if(fisDate2 != null && fisDate2 != "")
		{
			if(endDate2 != null && endDate2 != "")
				{
					profitAndLossBetweenTwoDatesPTandLE();
					profitAndLossBetweenTwoDatesOExpense();
					profitAndLossBetweenTwoDatesSaleAmount();
				}
			else
				{
					document.getElementById("purchaseAmount").value = "";
					document.getElementById("tAndLExpense").value = "";
					document.getElementById("otherExpense").value = "";
					document.getElementById("totalSaleAmount").value = "";
					msg = "Please Select End Date";
					customAlert(msg)
					return false;
				}
		}
	else
		{
			document.getElementById("purchaseAmount").value = "";
			document.getElementById("tAndLExpense").value = "";
			document.getElementById("otherExpense").value = "";
			document.getElementById("totalSaleAmount").value = "";
			msg = "Please Select Start Date";
			customAlert(msg)
			return false
		}
}
function profitAndLossBetweenTwoDatesPTandLE()
{
	
	document.getElementById("purchaseAmount").value = "";
	document.getElementById("tAndLExpense").value = "";
	
	var params = {};
	var startDate = $("#fisDate2").val();
	var endDate = $("#endDate2").val();
	
	params["fisDate"] = startDate;
	params["endDate"] = endDate;
	params["methodName"] = "getProfitAndLosstBetweenTwoDates";	
	
	$.post('/Shop/jsp/utility/controller.jsp', params, function(data)
	{
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		$.each(jsonData,function(i,v)
		{
			document.getElementById("purchaseAmount").value = v.expensesAmount;
			document.getElementById("tAndLExpense").value = v.transAndLabourexpenses;
		});
	});
}
function profitAndLossBetweenTwoDatesOExpense()
{	
	document.getElementById("otherExpense").value = "";
	
	var params = {};
	var startDate = $("#fisDate2").val();
	var endDate = $("#endDate2").val();
	
	params["fisDate"] = startDate;
	params["endDate"] = endDate;
	params["methodName"] = "getProfitAndLosstBetweenTwoDatesOExpense";	
	
	$.post('/Shop/jsp/utility/controller.jsp', params, function(data)
	{
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		$.each(jsonData,function(i,v)
		{
			document.getElementById("otherExpense").value = v.otherExpenses;
		});
	});
}

function profitAndLossBetweenTwoDatesSaleAmount()
{	
	document.getElementById("totalSaleAmount").value = "";
	
	var params = {};
	var startDate = $("#fisDate2").val();
	var endDate = $("#endDate2").val();
	
	params["fisDate"] = startDate;
	params["endDate"] = endDate;
	params["methodName"] = "getProfitAndLosstBetweenTwoDatesSaleAmount";	
	
	$.post('/Shop/jsp/utility/controller.jsp', params, function(data)
	{
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		$.each(jsonData,function(i,v)
		{
			document.getElementById("totalSaleAmount").value = v.saleAmount;
		});
	});
}
