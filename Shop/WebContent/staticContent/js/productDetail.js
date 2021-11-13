
/*function salePriceCompaireWithMRP(){
	var salePrice=$('#salePrice').val();
	var mrp = $('#mrp').val();

	if(Number(salePrice)>Number(mrp)){
		alert("Sale Price Should be less than MRP");
		document.prd.salePrice.value = null;
	}
}	
//Credit sale price compare with MRP
function creditSalePriceCompaireWithMRP(){
	var salePrice=$('#creditSalePrice').val();
	var mrp = $('#mrp').val();

	if(Number(salePrice)>Number(mrp)){
		alert("Credit Sale Price Should Be Less Than MRP");
		document.prd.creditSalePrice.value = null;
	}
}

*/
////////search list in buy and sale/////////
/*function prodReports() {
	var params = {};

	params["methodName"] = "prodReportList";
	$
			.post(
					'/shop/jsp/utility/controller.jsp',
					params,
				function(data) {

						$('#prodReports').dataTable().fnClearTable();

						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;

						$(document)
								.ready(
										function() {
											$('#prodReports')
													.DataTable(
															{

																"bPaginate" : false,

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

																},

																destroy : true,
																searching : true,
																columns : [

																		{
																			"data" : "firstName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "lastName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "contactNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "emailId",
																			"width" : "5%",
																			"defaultContent" : ""
																		},

																],

																dom : 'Bfrtip',
																buttons : [
																		{
																			extend : 'copyHtml5',
																			footer : true
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function() {
																				return "Member Details List";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});

						var mydata = catmap;
						$('#prodReports').dataTable().fnAddData(mydata);
					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();
				}
			});

}
*/

function calculateTax()
{
	var cgst=$('#cgst').val();
	var sgst=$('#sgst').val();

	var csgst=+cgst+ +sgst;
	
	document.getElementById('taxPercentage').value=csgst;

}

function getcsgst(){
	
	var params= {};
	var ak = document.getElementById('fk_tax_id');
	var taxid=ak.options[ak.selectedIndex].value;


	$("#cgst").append($("<input/>").attr("value","").text());
	$("#sgst").append($("<input/>").attr("value","").text());

	params["taxid"]= taxid;
	params["methodName"] = "getCSGstPercentage";

	$.post('/Shop/jsp/utility/controller.jsp',params,function(data){

		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		$.each(jsonData,function(i,v)
				{
			document.getElementById("cgst").value = v.cgst;
			document.getElementById("sgst").value = v.sgst;
			
				});
	}).error(function(jqXHR, textStatus, errorThrown){
		if(textStatus==="timeout") {

		}
	});

}

//sale price compare with MRP
function salePriceCompaireWithMRP()
{
	var salePrice=$('#salePrice').val();
	var mrp = $('#mrp').val();
	
	if(salePrice>mrp)
	{
		alert("Sale Price Should be less than MRP")
	}
}	

function productDetails()
{
	var productUnit = $("#fk_unit_id").val();
	
	if(document.prd.fk_cat_id.value == "")
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
	
	if(document.prd.subCat.value == "")
	{
		var msg="Please Select Product Sub Category";
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
	if(document.prd.buyPrice.value == "")
	{
			var msg="Enter Buy Price(Incl Tax)";
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
	if(document.prd.productName.value == "")
	{
			var msg="Enter Product Name";
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
	
	
	
	if(document.prd.spwithoutgst.value == "")
	{
			var msg="Enter S.P(Excl Tax)";
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
	
	//var letterNumber = /^[a-zA-Z0-9\\.;,:()' ]{0,100}$/;
	//if(document.prd.productName.value.match(letterNumber))
	//{ 
	if(document.prd.mrp.value == "" )
	{
		var msg="Please Enter M.R.P";
		var dialog = bootbox.dialog({
			
		    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		    closeButton: false
		});
		
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		
    	return false;
	}else{
		
		//var checkmrp=  /^[-+]?[0-9]+\.[0-9]+$/;  with decimal point 
		var checkmrp = /^[0-9]+\.?[0-9]*$/;
		if(document.prd.mrp.value.match(checkmrp))
		{
			
		}
		else{
			
			var msg="Please Enter Valid M.R.P";
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
	if(document.prd.taxPercentage.value == "" )
	{
		var msg="Please Select Tax Type";
		var dialog = bootbox.dialog({
			
		    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		    closeButton: false
		});
		
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		
    	return false;
	}
		if(document.prd.manufacturingCompany.value == "")
		{
			var msg="Enter Manufacturing Company";
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
		
		
		/*if(document.prd.hsn.value == "")
		{
			var msg="Enter HSN Code";
			var dialog = bootbox.dialog({
				
			    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
			    closeButton: false
			});
			
			setTimeout(function() {
				dialog.modal('hide');
			}, 1500);
			
			return false;
		}*/	
			
		/*if(productUnit == "" )
		{
			var msg="Please Select Buy Unit";
			var dialog = bootbox.dialog({
				
			    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
			    closeButton: false
			});
			
			setTimeout(function() {
				dialog.modal('hide');
			}, 1500);
			
	    	return false;
		}*/
		
		/*if(document.prd.saleunit.value == "" )
		{
			var msg="Please Select Sale Unit";
			var dialog = bootbox.dialog({
				
			    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
			    closeButton: false
			});
			
			setTimeout(function() {
				dialog.modal('hide');
			}, 1500);
			
	    	return false;
		}*/
		/*if(document.prd.unitvalue.value == "" )
		{
			var msg="Please Enter Sale Unit Conversion";
			var dialog = bootbox.dialog({
				
			    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
			    closeButton: false
			});
			
			setTimeout(function() {
				dialog.modal('hide');
			}, 1500);
			
	    	return false;
		}*/
		
			
		

		/*if(document.prd.weight.value == "")
		{
				var msg="Please Select Packing";
				var dialog = bootbox.dialog({
					
				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
				    closeButton: false
				});
				
				setTimeout(function() {
					dialog.modal('hide');
				}, 1500);									
			 
				return false;
		}
		
	 	else if(document.prd.weight.value != "" && Number(document.prd.weight.value) > 0 )
		{
	 		var checkFreePacking = /^[0-9]+\.?[0-9]*$/;
	 		if(document.prd.weight.value.match(checkFreePacking))
	 		{*/
	 		   /* if(document.prd.fk_tax_id.value == "0" && document.prd.fk_tax_id.value == "")
				{
					var msg="Please Select Tax Type";
					var dialog = bootbox.dialog({
						
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
	 			var msg="Please Enter Valid Packing";
				var dialog = bootbox.dialog({
					
				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
				    closeButton: false
				});
				
				setTimeout(function() {
					dialog.modal('hide');
				}, 1500);									
			 
				return false;
	 		}
		}*/
				 	/*else
				 	{
				 		var msg="Please Enter Valid Packing";
						var dialog = bootbox.dialog({
							
						    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
						    closeButton: false
						});
						
						setTimeout(function() {
							dialog.modal('hide');
						}, 1500);									
					 
						return false;
    				}*/
				 				 
				 if(document.prd.fk_shop_id.value == "")
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
				 
				        prdctDetails();
		     // }
}
function prdctDetails()
{
		var params= {};
	
		var input1 = document.getElementById('fk_cat_id'),
		    list   = document.getElementById('cat_drop'),
		             i,fk_cat_id;
		
		for (i = 0; i < list.options.length; ++i) {
			if (list.options[i].value === input1.value) {
				fk_cat_id = list.options[i].getAttribute('data-value');
			}
		}
		
		var input1 = document.getElementById('fk_unit_id'),
		    list   = document.getElementById('unit_drop'),
		             i,fk_unit_id;
		
		for (i = 0; i < list.options.length; ++i) {
			if (list.options[i].value === input1.value) {
				fk_unit_id = list.options[i].getAttribute('data-value');
			}
		}
				
		var subCat=$('#subCat').val();
		var splitvar=subCat.split(",");
		var subcatId= splitvar[0];
		
		var productName=$('#productName').val();         
		var manufacturingCompany=$('#manufacturingCompany').val();
		
		var weight=$('#weight').val();
		var fk_tax_id=$('#fk_tax_id').val();
		var buyunit=$('#fk_unit_id').val();
		var saleunit=$('#saleunit').val();
		var unitvalue=$('#unitvalue').val();
		
		var mrp=$('#mrp').val();
		var buyPrice=$('#buyPrice').val();
		var salePrice=$('#salePrice').val();		
		var spwithoutgst=$('#spwithoutgst').val();
		var dis=$('#dis').val();
		var hsn=$('#hsn').val();
		var taxPercentage = $('#taxPercentage').val();
		var sgst = $('#sgst').val();
		var cgst = $('#cgst').val();		
		var description = $('#description').val();		
		

		
		if(fk_tax_id=="" || fk_tax_id==null || fk_tax_id==undefined)
		{
			fk_tax_id=0;
		}
		if(mrp=="" || mrp==null || mrp==undefined)
		{
			mrp = 0;
		}
		if(buyPrice=="" || buyPrice==null || buyPrice==undefined)
		{
			buyPrice=0;
		}
		if(salePrice=="" || salePrice==null || salePrice==undefined)
		{
			salePrice = 0;
		}
		if(spwithoutgst=="" || spwithoutgst==null || spwithoutgst==undefined)
		{
			spwithoutgst = 0;
		}
		
		if(taxPercentage=="" || taxPercentage==null || taxPercentage==undefined)
		{
			taxPercentage = 0;
		}
		if(sgst=="" || sgst==null || sgst==undefined)
		{
			sgst = 0;
		}
		if(cgst=="" || cgst==null || cgst==undefined)
		{
			cgst = 0;
		}
		if(dis=="" || dis==null || dis==undefined)
		{
			dis = 0;
		}
		
		var salePrice1 = salePrice - dis;
		
//		alert("salePrice - "+salePrice+" dis - "+dis+" aftr dis = "+salePrice1);
		
		if(manufacturingCompany=="" || manufacturingCompany==null || manufacturingCompany==undefined)
		{
			manufacturingCompany="NA";
		}
		if(buyunit=="" || buyunit==null || buyunit==undefined)
		{
			buyunit = "Pieces";
		}
		if(saleunit=="" || saleunit==null || saleunit==undefined)
		{
			saleunit = buyunit;
		}
		
		if(fk_unit_id=="" || fk_unit_id==null || fk_unit_id==undefined)
		{
			fk_unit_id = 1;
		}
		
		if(unitvalue=="" || unitvalue==null || unitvalue==undefined)
		{
			unitvalue = 1;
		}
		if(weight=="" || weight==null || weight==undefined){
			weight=1;
		}
		
		params["fk_cat_id"]   = fk_cat_id;
		params["fk_unit_id"]  = fk_unit_id;
		params["subcatId"] = subcatId;
		params["productName"] = productName;
		params["weight"] = weight;
		params["manufacturingCompany"] = manufacturingCompany;
		params["fk_tax_id"] = fk_tax_id;
		params["taxPercentage"] = taxPercentage;
		params["mrp"] = mrp;
		params["buyPrice"] = buyPrice;
		params["salePrice"] = salePrice1;
		params["spwithoutgst"] = spwithoutgst;
		params["hsn"] = hsn;
		params["sgst"] = sgst;
		params["cgst"] = cgst;
		params["description"] = description;
		params["buyunit"]   = buyunit;				
		params["saleunit"]   = saleunit;
		params["unitvalue"]   = unitvalue;
		
		params["methodName"] = "proDetails";
	
		$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
		{
	        var msg="Data Added Sucessfully";
			var dialog = bootbox.dialog({
		    message: '<p class="text-center">'+msg.fontcolor("green").fontsize(5)+'</p>',
		    closeButton: false
			});
			
			setTimeout(function() {
				dialog.modal('hide');
				location.reload();
			}, 1500);	
	 				document.prd.save1.disabled =false;
	 			
	     	}).error(function(jqXHR, textStatus, errorThrown){
	 	    		if(textStatus==="timeout") {
	 	    			$(loaderObj).hide();
	 	    			$(loaderObj).find('#errorDiv').show();
	 	    		}
	  });	
}

//Product Details For popUp Window
function productDetails1(){
	
	var fk_unit_id=$('#fk_unit_id').val();
		
	if(document.prd.fk_cat_id1.value == "")
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
	if(document.prd.subCat1.value == "")
	{
		var msg="Please Select Product Sub Category";
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
	if(document.prd.productName.value == "")
	{
			var msg="Enter Product Name";
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
	/*if(document.prd.buyPrice.value == "")
	{
		var msg="Please Enter Buy Price";
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
	if(document.prd.salePrice.value == "")
	{
		var msg="Please Enter Sale Price";
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
			 
	var letterNumber = /^[a-zA-Z0-9\\.;,:()' ]{0,100}$/;
	//if(document.prd.productName.value.match(letterNumber))
	//{   
		if(document.prd.manufacturingCompany.value == "")
		{
			var msg="Enter Manufacturing Company";
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
		
		if(document.prd.hsn.value == "")
		{
			var msg="Enter HSN Code";
			var dialog = bootbox.dialog({
				
			    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
			    closeButton: false
			});
			
			setTimeout(function() {
				dialog.modal('hide');
			}, 1500);
			
			return false;
		}	
			
		if(fk_unit_id == "" )
		{
			var msg="Please Enter Unit";
			var dialog = bootbox.dialog({
				
			    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
			    closeButton: false
			});
			
			setTimeout(function() {
				dialog.modal('hide');
			}, 1500);
			
	    	return false;
		}
		
		if(document.prd.mrp.value == "" )
		{
			var msg="Please Enter M.R.P";
			var dialog = bootbox.dialog({
				
			    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
			    closeButton: false
			});
			
			setTimeout(function() {
				dialog.modal('hide');
			}, 1500);
			
	    	return false;
		}else{
			
			//var checkmrp=  /^[-+]?[0-9]+\.[0-9]+$/;  with decimal point 
			var checkmrp = /^[0-9]+\.?[0-9]*$/;
			if(document.prd.mrp.value.match(checkmrp))
			{
				
			}
			else{
				
				var msg="Please Enter Valid M.R.P";
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
			
		if(document.prd.taxPercentage.value == "" )
		{
			var msg="Please Select Tax Type";
			var dialog = bootbox.dialog({
				
			    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
			    closeButton: false
			});
			
			setTimeout(function() {
				dialog.modal('hide');
			}, 1500);
			
	    	return false;
		}

		if(document.prd.weight.value == "")
		{
				var msg="Please Select Packing";
				var dialog = bootbox.dialog({
					
				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
				    closeButton: false
				});
				
				setTimeout(function() {
					dialog.modal('hide');
				}, 1500);									
			 
				return false;
		}
		
	 	else if(document.prd.weight.value != "" && Number(document.prd.weight.value) > 0 )
		{
	 		var checkFreePacking = /^[0-9]+\.?[0-9]*$/;
	 		if(document.prd.weight.value.match(checkFreePacking))
	 		{
	 		    if(document.prd.fk_tax_id.value == "0" && document.prd.fk_tax_id.value == "")
				{
					var msg="Please Select Tax Type";
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
	 			var msg="Please Enter Valid Packing";
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
				 		var msg="Please Enter Valid Packing";
						var dialog = bootbox.dialog({
							
						    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
						    closeButton: false
						});
						
						setTimeout(function() {
							dialog.modal('hide');
						}, 1500);									
					 
						return false;
    				}
				 				 
				 if(document.prd.fk_shop_id.value == "")
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
					}*/
				 
				        prdctDetails1();
		      //}
}

function prdctDetails1(){
	
	var params= {};

	var input1 = document.getElementById('fk_cat_id1'),
	    list   = document.getElementById('cat_drop1'),
	             i,fk_cat_id;
	
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input1.value) {
			fk_cat_id = list.options[i].getAttribute('data-value');
		}
	}
	
	var input1 = document.getElementById('fk_unit_id'),
	    list   = document.getElementById('unit_drop'),
	             i,fk_unit_id;
	
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input1.value) {
			fk_unit_id = list.options[i].getAttribute('data-value');
		}
	}
			
	var subCat=$('#subCat1').val();
	var splitvar=subCat.split(",");
	var subcatId= splitvar[0];
		
	var productName=$('#productName').val();         
	var manufacturingCompany=$('#manufacturingCompany').val();
	var weight=$('#weight').val();
	var fk_tax_id=$('#fk_tax_id').val();
	var mrp=$('#mrp').val();
	var buyPrice=$('#buyPrice').val();
	var salePrice=$('#salePrice').val();
	var spwithoutgst=$('#spwithoutgst').val();
	var hsn=$('#hsn').val();
	var taxPercentage = $('#taxPercentage').val();
	var sgst = $('#sgst').val();
	var cgst = $('#cgst').val();	
	var description = $('#description').val();
	var buyunit=$('#fk_unit_id').val();
	var saleunit=$('#saleunit').val();
	var unitvalue=$('#unitvalue').val();
	
	if(fk_tax_id=="" || fk_tax_id==null || fk_tax_id==undefined)
	{
		fk_tax_id=0;
	}
	if(mrp=="" || mrp==null || mrp==undefined)
	{
		mrp = 0;
	}
	if(buyPrice=="" || buyPrice==null || buyPrice==undefined)
	{
		buyPrice=0;
	}
	if(salePrice=="" || salePrice==null || salePrice==undefined)
	{
		salePrice = 0;
	}
	if(spwithoutgst=="" || spwithoutgst==null || spwithoutgst==undefined)
	{
		spwithoutgst = 0;
	}
	
	if(taxPercentage=="" || taxPercentage==null || taxPercentage==undefined)
	{
		taxPercentage = 0;
	}
	if(sgst=="" || sgst==null || sgst==undefined)
	{
		sgst = 0;
	}
	if(cgst=="" || cgst==null || cgst==undefined)
	{
		cgst = 0;
	}
	/*if(dis=="" || dis==null || dis==undefined)
	{
		dis = 0;
	}
	
	var salePrice1 = salePrice - dis;*/
	
//	alert("salePrice - "+salePrice+" dis - "+dis+" aftr dis = "+salePrice1);
	
	if(manufacturingCompany=="" || manufacturingCompany==null || manufacturingCompany==undefined)
	{
		manufacturingCompany="NA";
	}
	if(buyunit=="" || buyunit==null || buyunit==undefined)
	{
		buyunit = "Pieces";
	}
	if(saleunit=="" || saleunit==null || saleunit==undefined)
	{
		saleunit = buyunit;
	}
	
	if(fk_unit_id=="" || fk_unit_id==null || fk_unit_id==undefined)
	{
		fk_unit_id = 1;
	}
	
	if(unitvalue=="" || unitvalue==null || unitvalue==undefined)
	{
		unitvalue = 1;
	}
	if(weight=="" || weight==null || weight==undefined){
		weight=1;
	}
	
	params["fk_cat_id"]   = fk_cat_id;
	params["fk_unit_id"]  = fk_unit_id;
	params["subcatId"] = subcatId;
	params["productName"] = productName;
	params["weight"] = weight;
	params["manufacturingCompany"] = manufacturingCompany;
	params["fk_tax_id"] = fk_tax_id;
	params["taxPercentage"] = taxPercentage;
	params["mrp"] = mrp;
	params["buyPrice"] = buyPrice;
	params["salePrice"] = salePrice;
	params["spwithoutgst"] = spwithoutgst;
	params["hsn"] = hsn;
	params["sgst"] = sgst;
	params["cgst"] = cgst;
	params["description"] = description;
	params["saleunit"] = saleunit;
	params["buyunit"] = buyunit;
	
	params["unitvalue"] = unitvalue;
	
	params["methodName"] = "proDetails";

	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
	{
        var msg="Data Added Sucessfully";
		var dialog = bootbox.dialog({
	    message: '<p class="text-center">'+msg.fontcolor("green").fontsize(5)+'</p>',
	    closeButton: false
		});
		
		setTimeout(function() {
			dialog.modal('hide');
			location.reload();
	//		$("")
	//		$('#productrefresh').load(document.URL +  ' #productrefresh');
		}, 1500);	
 				document.prd.save1.disabled =false;
 			
     	}).error(function(jqXHR, textStatus, errorThrown){
 	    		if(textStatus==="timeout") {
 	    			$(loaderObj).hide();
 	    			$(loaderObj).find('#errorDiv').show();
 	    		}
  });	
}

function reset()
{
   document.prd.reset();
}


/******************* For reports ***************/

 function getProductDetailAsperCategory(){
	
	
	var params= {};
	
	var input1 = document.getElementById('fk_cat_id'),
	list = document.getElementById('cat_drop'),
	i,fk_cat_id;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input1.value) {
			fk_cat_id = list.options[i].getAttribute('data-value');
		}
	}
		
	params["cat"]= fk_cat_id;
	params["methodName"] = "getProductDetailForReportAsPerCat";

	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
			{
	
	$('#example1').dataTable().fnClearTable();
	
	var jsonData = $.parseJSON(data);
	var catmap = jsonData.list;
	
	
	
	$(document).ready(function() {
	 var total =   $('#example1').DataTable( {
		 
		 fnRowCallback : function(nRow, aData, iDisplayIndex){
                $("th:first", nRow).html(iDisplayIndex +1);
               return nRow;
            },
		
	/*"footerCallback": function ( row, data, start, end, display ) {
	            var api = this.api(), data;
	 
	            // Remove the formatting to get integer data for summation
	            var intVal = function ( i ) {
	                return typeof i === 'string' ?
	                    i.replace(/[\$,]/g, '')*1 :
	                    typeof i === 'number' ?
	                        i : 0;
	            };
	 
	            // Total over all pages
	             total = api
	                .column( 7 )
	                .data()
	                .reduce( function (a, b) {
	                    return intVal(a) + intVal(b);
	                }, 0 ); 
	 			console.log(total); 
	            // Total over this page
	            pageTotal = api
	                .column( 5 )
	                .data()
	                .reduce( function (a, b) {
	                    return intVal(a) + intVal(b);
	                }, 0 );
	 
	         
	            // Update footer
	            $( api.column( 7 ).footer() ).html(
	              //  'Rs'+' '+pageTotal.toFixed(2)
	            		 str = pageTotal.toFixed(0)
	            );
	            console.log( pageTotal);
	            
	            // Total over this page       
	         		         
	            
	            
	        },*/
	    	
	    	
	    	destroy: true,
	        searching: false,
	        
	      
	columns: [
	            
	            {"data": "productName", "width": "5%"},
				{"data": "ManufacturingCompany", "width": "5%"},
				{"data": "buyPrice" , "width": "5%"},
				{"data": "salePrice" , "width": "5%"}
	        ],
	      
	        
	    } );
	} );
	
var mydata = catmap;
$('#example1').dataTable().fnAddData(mydata);

	}

);
	
	
	
}
 
/****************** For Edit Product Details ********************/
 
 function getAllProductDetails(){
	 var params= {};
	 var input1 = document.getElementById('fk_product_id'),
		 list   = document.getElementById('pro_drop'),
		 		  i,fk_product_id;
	 
		for (i = 0; i < list.options.length; ++i) {
			if (list.options[i].value === input1.value) {
				fk_product_id = list.options[i].getAttribute('data-value');
			}
		}
	    
		$("#productname1").append($("<input/>").attr("value","").text());
		$("#manufacturingCompany").append($("<input/>").attr("value","").text());
		$("#weight").append($("<input/>").attr("value","").text());
		$("#fk_unit_id").append($("<input/>").attr("value","").text());
		$("#existedTax").append($("<input/>").attr("value","").text());
		$("#existedTaxPercentage").append($("<input/>").attr("value","").text());
		$("#existedHsn").append($("<input/>").attr("value","").text());
		$("#salePrice").append($("<input/>").attr("value","").text());
		$("#mrp").append($("<input/>").attr("value","").text());
		$("#buyPrice").append($("<input/>").attr("value","").text());
		$("#sale_price_ex_tax").append($("<input/>").attr("value","").text());
		$("#description").append($("<input/>").attr("value","").text());
		
		//$("#creditSalePrice").append($("<input/>").attr("value","").text());
		
		params["productId"]= fk_product_id;
		
		params["methodName"] = "getProuctDetailsToEdit";
		
		$.post('/Shop/jsp/utility/controller.jsp',params,function(data){
			
			var jsonData = $.parseJSON(data);
			var catmap = jsonData.list;
			$.each(jsonData,function(i,v)
					{
				      document.getElementById("productname1").value = v.product;
					  document.getElementById("manufacturingCompany").value = v.manufacturer;
				      document.getElementById("weight").value = v.weight;
				      document.getElementById("fk_unit_id").value = v.unitName;
				      document.getElementById("existedTax").value = v.taxType;
				      document.getElementById("existedTaxPercentage").value = v.taxPercentage;
				      document.getElementById("existedHsn").value = v.hsn;
				      document.getElementById("salePrice").value = v.salePrice;
				      document.getElementById("mrp").value = v.mrp;
				      document.getElementById("buyPrice").value = v.buyPrice;
				      document.getElementById("spwithoutgst").value = v.sale_price_ex_tax;
				      document.getElementById("description").value = v.description;
			      
					});
				}).error(function(jqXHR, textStatus, errorThrown){
					if(textStatus==="timeout") {

					}
				});
		
 }
 
 // update/edit product details
 function updateProductDetails(){
	 
	 var productUnit = $("#fk_unit_id").val();
	 
			if(document.prd1.fk_product_id.value == "")
			{
				var msg="Please Select Product Name";
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
			
			if(document.prd1.productname1.value == "")
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
			
			if(document.prd1.buyPrice.value == "")
			{
				var msg="Please Enter Buy Price";
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
			
			if(document.prd1.salePrice.value == "")
			{
				var msg="Please Enter Sale Price";
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

					if(document.prd1.manufacturingCompany.value == "")
					{
						var msg="Please Enter Manufacturing Company";
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
					var letterNumber = /^[a-zA-Z ]+$/;
					//if(document.prd1.manufacturingCompany.value.match(letterNumber))
					//{
						
						if ( document.prd1.weight.value == "" )
		        		{
							var msg="Please Enter Weight";
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
						
		        			 var letterNumber = /^[0-9]+$/;
		        			 if(document.prd1.weight.value.match(letterNumber))
		        			 {
		        				 
		        				 if(productUnit == "")
		        				{
		        					 var msg="Please Select Unit";
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
		        				 if(document.prd1.fk_tax_id.value == "" || document.prd1.fk_tax_id.value == "selected" )
		        					{
		        					 var msg="Please Select New Tax Type";
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
		        				 if(document.prd1.taxPercentage.value == "")
		        					{
		        					 var msg="Please Enter New Tax Percentage";
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
		        				 var letterNumber = /^[0-9]+([.][0-9]+)?$/;
		   	        			 if(document.prd1.taxPercentage.value.match(letterNumber))
		   	        			 {
										addEditedProductDetails();
							     }
							     else
								 {
										var msg="Enter Numbers Only in Tax Percentage field..!!";
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
							}
			   	        			 			   	        			 
        			 else
						{
								var msg="Enter Numbers Only in Weight field..!!";
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
						//}
				/*else
			     	{
						var msg="Enter Alphabates Only in Manufacturing company field..!!";
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
				}
 
 function calculateTax()
 {
 	var cgst=$('#cgst').val();
 	var sgst=$('#sgst').val();

 	var csgst=+cgst+ +sgst;
 	
 	document.getElementById('taxPercentage').value=csgst;

 }
											
 function addEditedProductDetails(){
	 
		document.prd1.btn.disabled = true;
		
		 var input1 = document.getElementById('fk_product_id'),
			list = document.getElementById('pro_drop'),
			i,fk_product_id;
			for (i = 0; i < list.options.length; ++i) {
				if (list.options[i].value === input1.value) {
					fk_product_id = list.options[i].getAttribute('data-value');
				}
			}
		
			 var input1 = document.getElementById('fk_unit_id'),
				list = document.getElementById('unit_drop'),
				i,fk_unit_id;
				for (i = 0; i < list.options.length; ++i) {
					if (list.options[i].value === input1.value) {
						fk_unit_id = list.options[i].getAttribute('data-value');
					}
				}
				
				
		//var customerId = document.getElementById("customerId").value;
		var productname1=$('#productname1').val();
		var manufacturingCompany = $('#manufacturingCompany').val();
		var weight = $('#weight').val();
		var fk_tax_id = $('#fk_tax_id').val();				
		var taxPercentage = $('#taxPercentage').val();
		var buyPrice = $('#buyPrice').val();
		var mrp = $('#mrp').val();
		var salePrice = $('#salePrice').val();
		var spwithoutgst=$('#spwithoutgst').val();
		var existedTax = $('#existedTax').val();
		var existedTaxPercentage = $('#existedTaxPercentage').val();
		var existedHsn = $('#existedHsn').val();
		var newHsn = $('#newHsn').val();
		var sgst = $('#sgst').val();
		var cgst = $('#cgst').val();
		var description = $('#description').val();
		
		/*if(newHsn == "" || newHsn == " " || newHsn == undefined || newHsn == null )
		{
			newHsn = "N/A";
		}*/
				
		//For Stock unit Updation
		var unitName = $("#fk_unit_id").val();
		var productName = $("#fk_product_id").val();
	
		var params = {};
		params["productname1"] = productname1;
		params["productId"] = fk_product_id;
		params["unitId"] = fk_unit_id;
		params["manufacturingCompany"] = manufacturingCompany;	
		params["weight"] = weight;
		params["fk_tax_id"] = fk_tax_id;
		params["taxPercentage"] = taxPercentage;
		params["buyPrice"] =buyPrice;
		params["mrp"] = mrp;
		params["salePrice"] = salePrice;
		//params["creditSalePrice"] = creditSalePrice;
		params["spwithoutgst"] = spwithoutgst;
		params["existedTaxPercentage"] = existedTaxPercentage;
		params["existedTax"] = existedTax;
		params["existedHsn"] = existedHsn;
		params["newHsn"] = newHsn;
		params["unitName"] = unitName;
		params["cgst"] = cgst;
		params["sgst"] = sgst;
		params["description"] = description;
		
		params["methodName"] = "updateProductDetails";

				$.post('/Shop/jsp/utility/controller.jsp',params,function(data){
					
			        var msg="Data Added Sucessfully";
					var dialog = bootbox.dialog({
				    message: '<p class="text-center">'+msg.fontcolor("green").fontsize(5)+'</p>',
				    closeButton: false
					});
					
					setTimeout(function() {
						dialog.modal('hide');
						location.reload();
					}, 1500);	
	 				//alert(data);
	 				//location.reload();
	 				document.prd1.save.disabled = false;
	 			}
	 	    	).error(function(jqXHR, textStatus, errorThrown){
	 	    		
	 	       		if(textStatus==="timeout") {
	 	    			$(loaderObj).hide();
	 	    			$(loaderObj).find('#errorDiv').show();
	 	    		}
	 	    	});	
 }
 
function getAllSubCat(){
	 
	var input = document.getElementById('fk_cat_id'),
    list1 = document.getElementById('cat_drop'),
            i,fk_cat_id;

	for (i = 0; i < list1.options.length; ++i) {
    if (list1.options[i].value === input.value) {
    	fk_cat_id = list1.options[i].getAttribute('data-value');
    }
	}
	
	$("#subcategory_drop").empty();
	$("#subcategory_drop").append($("<option></option>").attr("value","").text("Select Sub Category"));
	var params = {};
	
	params["fk_cat_id"] =fk_cat_id;
	
	
	params["methodName"] = "getSubCategoryDetails";

	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
			{
		var count = 1;
		
		var jsonData = $.parseJSON(data);
		//var jsonData = jsonData.list;
		$.each(jsonData,function(i,v)
				{
			$("#subcategory_drop").append($("<option></option>").attr("value",(v.subcatId + ","+v.subcategoryName))); 
			count++;
				});
			}).error(function(jqXHR, textStatus, errorThrown){
				if(textStatus==="timeout") {

				}
			});
}

function getAllSubCat1(){
			
			var input = document.getElementById('fk_cat_id1'),
		    list1 = document.getElementById('cat_drop1'),
		    i,fk_cat_id;

			for (i = 0; i < list1.options.length; ++i) {
		    if (list1.options[i].value === input.value) {
		    	fk_cat_id = list1.options[i].getAttribute('data-value');
		    }
			}
			
			$("#subCat").empty();
			$("#subCat").append($("<option></option>").attr("value","").text("Select Sub Category"));
			var params = {};
			
			params["fk_cat_id"] =fk_cat_id;
			
			
			params["methodName"] = "getSubCategoryDetails";

			$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
					{
				var count = 1;
				
				var jsonData = $.parseJSON(data);
				//var jsonData = jsonData.list;
				$.each(jsonData,function(i,v)
						{
					$("#subcategory_drop1").append($("<option></option>").attr("value",(v.subcatId + ","+v.subcategoryName)));
					count++;
						});
					}).error(function(jqXHR, textStatus, errorThrown){
						if(textStatus==="timeout") {

						}
					});
		}




function getAllShopName(){
	/*var input = document.getElementById('fk_shop_id'),
    list1 = document.getElementById('cat_drop'),
     i,shopName;

	for (i = 0; i < list1.options.length; ++i) {
    if (list1.options[i].value === input.value) {
    	shopName = list1.options[i].getAttribute('data-value');
    }
	}*/
			
			
			$("#shopName").empty();
			$("#shopName").append($("<option></option>").attr("value","").text("Select Shop Name"));
			var params = {};
			
			
			params["methodName"] = "getShopDetails";

			$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
					{
				var count = 1;
				
				var jsonData = $.parseJSON(data);
				//var jsonData = jsonData.list;
				$.each(jsonData,function(i,v)
						{
					$("#shopName").append($("<option></option>").attr("value",count).text(v.shopName+","+v.shopId));
					count++;
						});
					}).error(function(jqXHR, textStatus, errorThrown){
						if(textStatus==="timeout") {

						}
					});			
}
 


function del(id){
	
	var splitText = id.split(",");
	
	var id = splitText[0];
	var name= splitText[1];
//	alert(id+" & "+name);
	
//	  var txt;
	  var r = confirm("Do You want to delete "+name);
	  if (r == true) {
	 //   txt = "Would You like to delete?";
	  
	  
	  
//	  document.getElementById("demo").innerHTML = txt;
	
	var params = {};
		
	params["pkid"] = id;
	
	params["methodName"] = "delproduct";
	
	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
		 	{
					alert(data);
					location.reload();
	
	//	 				document.getElementById("save").disabled=false; 
		 				 			}
		 	    	).error(function(jqXHR, textStatus, errorThrown){
		 	    		if(textStatus==="timeout") {
		 	    			$(loaderObj).hide();
		 	    			$(loaderObj).find('#errorDiv').show();
		 	    		}
	
		 	    	});
	
	  
} else {
  //  txt = "No";
    return false;
  }
	  }