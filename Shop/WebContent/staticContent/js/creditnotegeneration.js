function creditnotegeneration()
{		
	if(document.creditnote.partyname.value != "")
	{
		    var letterNumber = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/;
			if(document.creditnote.partyname.value.match(letterNumber))
			{	}
			else {
				
				var msg="Please Enter Alphabet Only in Party Name";
				
				var dialog = bootbox.dialog({
					
				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
				    closeButton: false
				});
				
				setTimeout(function() {
					dialog.modal('hide');
				}, 1500);
				
				return false;
			}
		
		/*if(document.creditnote.description.value!= "")
		{*/
			if(document.creditnote.amount.value!= "")			
			{
				var letterNumber = /^[-+]?[0-9]+$/;
				if(document.creditnote.amount.value.match(letterNumber))
				{	}
				else {
					
					var msg="Please Enter Number Only in Amount";
					
					var dialog = bootbox.dialog({
						
					    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
					    closeButton: false
					});
					
					setTimeout(function() {
						dialog.modal('hide');
					}, 1500);
					
					return false;
			   }
				
				creditnote();
			}
			else
			{
				var msg="Please Enter Amount";
				
				var dialog = bootbox.dialog({
					
				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
				    closeButton: false
				});
				
				setTimeout(function() {
					dialog.modal('hide');
				}, 1500);
				
				return false;
			}
	//	}
	/*	else
		{
			var msg="Please Enter Description";
			
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
	else
	{
		var msg="Please Enter Party Name";
		
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

function creditnote()
{
	document.getElementById("save").disabled = true;
	var partyname = $('#partyname').val();
	var description = $('#description').val();
	var amount = $('#amount').val();

	var paymentMode = $('#paymentMode6').val();
	var chequeNum = $('#chequeNum6').val();
	var nameOnCheck = $('#nameOnCheck6').val();
	var bankName = $('#bankName6').val();
	var cardNum = $('#cardNum6').val();
	var accNum = $('#accNum6').val();
	var creditDate = $('#creditDate').val();
	
	var params = {};

	if(partyname==undefined || partyname== null || partyname == "" )
	{
		partyname="N/A";
	}
	if(description==undefined || description== null || description== "" )
	{
		description="N/A";
	}
	if(amount==undefined || amount== null || amount == "" )
	{
		amount=0;
	}
	//
	
	if(paymentMode==undefined || paymentMode== null || paymentMode == "" )
	{
		paymentMode="NA";
	}
	if(chequeNum==undefined || chequeNum== null || chequeNum== "" )
	{
		chequeNum=0;
	}
	if(nameOnCheck==undefined || nameOnCheck== null || nameOnCheck == "" )
	{
		nameOnCheck="NA";
	}
	if(bankName==undefined || bankName== null || bankName == "" )
	{
		bankName="NA";
	}
	if(cardNum==undefined || cardNum== null || cardNum == "" )
	{
		cardNum=0;
	}
	if(accNum==undefined || accNum== null || accNum== "" )
	{
		accNum=0;
	}
	
//
	params["partyname"] =partyname;
	params["description"] =description;
	params["amount"] =amount;
	
	params["paymentMode"] = paymentMode;
	params["chequeNum"] = chequeNum;
	params["nameOnCheck"] = nameOnCheck;
	params["bankName"] = bankName;
	params["cardNum"] = cardNum;
	params["accNum"] = accNum;
	params["creditDate"] = creditDate;
	
	params["methodName"] = "creditnotegeneration";
	
	$.post('/Shop/jsp/utility/controller.jsp',params,function(data){
		//alert(data);
		if(document.creditnote)
		{
			window.open("CreditNoteGenerationPDF.jsp");
			document.getElementById("save").disabled = false;
			//window.location.reload();
			
			
		}	
	}
	).error(function(jqXHR, textStatus, errorThrown){
		if(textStatus==="timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});
}