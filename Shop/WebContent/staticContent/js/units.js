function addMeasuringUnit1()
{	
	document.munits.save.disabled =false;
	
//	var checkUnitName = document.munits.unitName.value;
	
	if (document.munits.unitName.value == "")
	{
		
		var msg="Please Select Unit";
		//alert(msg);
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
	if (document.munits.unitDescription.value == "")
	{
		
		var msg="Please Select Secondary Unit";
		//alert(msg);
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
	
	if (document.munits.unitvalue.value == "")
	{
		
		var msg="Please Enter Secondary Unit Value";
		//alert(msg);
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
	*/
/*	if(checkUnitName != "")
	{
		var unitName = document.munits.unitName.value;
		//var pcs = "pcs";
		//var kg = "kg";
		//var ltr = "ltr";
		var checkUnitName = unitName.toUpperCase();
		//var comparePcs = pcs.toUpperCase();
		//var compareKg = kg.toUpperCase();
		//var compareLtr = ltr.toUpperCase();
		
		if(checkUnitName == comparePcs || checkUnitName == compareKg || checkUnitName == compareLtr)
		{
			var letterNumber = /^[a-zA-Z, ]+$/;
			 if(document.munits.unitName.value.match(letterNumber) )
			 {
				 if ( document.munits.unitDescription.value == "" )
				 {
					 var msg="Please Enter SI Unit Description";
					 //alert(msg);
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
				 var letterNumber = /^[a-zA-Z, ]+$/; 
				 if(document.munits.unitDescription.value.match(letterNumber) )
				 {
					 addUnit()
				 }
				 else
				{
				 	var msg="Enter Alphabates  in SI unit Description Field";
				 	//alert(msg);
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
			}
			 else
				{
				 	var msg="Enter Alphabates  in Unit Name  Field";
				 	//alert(msg);
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
				}*/
		/*}
		else
		{
			var msg="Allowed SI Units Are<br>pcs = piece<br>kg = kilogram<br>ltr = liter";
			alert("Allowed SI Units Are pcs = piece  kg = kilogram  ltr = liter")
			location.reload();
			var dialog = bootbox.dialog({
				//title: "Embel Technologies Says :",
			    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
			    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
			    closeButton: false
			});
			
			setTimeout(function() {
				dialog.modal('hide');
			}, 2000);
			
			if(document.munits)
				{
					//location.reload();
					document.munits.reset();
				}	
			return false;
		}*/
//	}
		
	/* var letterNumber = /^[a-zA-Z, ]+$/;
	 if(document.munits.unitName.value.match(letterNumber) )
	 {
		 if ( document.munits.unitDescription.value == "" )
		 {
			 alert("Please Enter SI Unit Description");
			 return false;
		 }
		 var letterNumber = /^[a-zA-Z, ]+$/; 
		 if(document.munits.unitDescription.value.match(letterNumber) )
		 {
			 addUnit()
		 }
		 else
		{
				alert("Enter Alphabates  in SI unit Description Field.");
				return false;
		}
	}*/
	 
/*	 else
		{
			alert("Enter Alphabates  in Unit Name  Field..!!");
			return false;
		}*/

	addUnit();
	}


function addUnit(){
	
	document.munits.save.disabled =true;
	
	var unitName = $('#unitName').val();
//	unitName = unitName.toLowerCase();
//	var unitDescription = $('#unitDescription').val();
	var unitDescription = unitName
	var unitvalue = $('#unitvalue').val();
	var params = {};
	
	params["unitName"] = unitName;
	params["unitDescription"] = unitDescription;
	params["unitvalue"]  = unitvalue;
	
	params["methodName"] = "measuringUnits";

	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
 	{        
		
		
			var msg=data;
			alert(data);
			/*var dialog = bootbox.dialog({
		    message: '<p class="text-center">'+msg.fontcolor("green").fontsize(5)+'</p>',
		    closeButton: false
			});
			
			setTimeout(function() {
				dialog.modal('hide');
				location.reload();
			}, 1500);*/
			location.reload();
 				document.getElementById("save").disabled=false; 
			//document.munits.save.disabled =false;
 				 			}
 	    	).error(function(jqXHR, textStatus, errorThrown){
 	    		if(textStatus==="timeout") {
 	    			$(loaderObj).hide();
 	    			$(loaderObj).find('#errorDiv').show();
 	    		}
 	    		
 	    		//document.munits.save.disabled =false;
 				//document.getElementById("save").disabled=false;
 	    	});
}

function reset()
{
document.munits.reset();	
}


function getUnitDetails()
{
	$("#unitName2").append($("<input/>").attr("value","").text());
	$("#unitDescription").append($("<input/>").attr("value","").text());

	var params= {};
	var unitName= $('#unitName').val();
	
	var input1 = document.getElementById('unitName'),
	list = document.getElementById('unitName_drop'),
	i,fkEmployeeid;

	for (i = 0; i < list.options.length; ++i) {
	if (list.options[i].value === input1.value) {
		unitId = list.options[i].getAttribute('data-value');
		}
	}
	
	params["unitName"] = unitName;
	params["unitId"] = unitId;
	
	params["methodName"] = "getUnitDetailsForEdit";
	
	$.post('/Shop/jsp/utility/controller.jsp',params,function(data){
		
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		
		$.each(jsonData,function(i,v)
		{
	
		  document.getElementById("unitName2").value =unitName;
	      document.getElementById("unitDescription").value = v.unitDescription;
      
		});
		}).error(function(jqXHR, textStatus, errorThrown){
			if(textStatus==="timeout") {

			}
		});
}


function updateMeasuringUnit()
{

	var params= {};
	var oldUnitName= $('#unitName').val();
	
	var input1 = document.getElementById('unitName'),
	list = document.getElementById('unitName_drop'),
	i,fkEmployeeid;

	for (i = 0; i < list.options.length; ++i) {
	if (list.options[i].value === input1.value) {
		unitId = list.options[i].getAttribute('data-value');
		}
	}
	
	var unitName2= $('#unitName2').val();
	var unitDescription= $('#unitDescription').val();
	
	params["unitId"] = unitId;
	
	params["oldUnitName"] = oldUnitName;
	params["unitName2"] = unitName2;
	params["unitDescription"] = unitDescription;
	
	params["methodName"] = "updateUnitDetails";
	
	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
		 	{
					var msg=data;
					alert(msg);
					var dialog = bootbox.dialog({
				    message: '<p class="text-center">'+msg.fontcolor("green").fontsize(5)+'</p>',
				    closeButton: false
					});
					
					setTimeout(function() {
						dialog.modal('hide');
						location.reload();
					}, 1500);
		 				document.getElementById("save").disabled=false; 
		 				 			}
		 	    	).error(function(jqXHR, textStatus, errorThrown){
		 	    		if(textStatus==="timeout") {
		 	    			$(loaderObj).hide();
		 	    			$(loaderObj).find('#errorDiv').show();
		 	    		}
		 	    		/*//document.munits.btn.disabled =false;
		 				document.getElementById("save").disabled=false;*/
		 	    	});
	
}




