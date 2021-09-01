function StockDetailsReportAsPerCompanyNameValidate()
{
	var company_name=$("#company_name").val();
	
	if(company_name != null && company_name != "")
		{
			StockDetailsReportAsPerCompanyName();
		}
		else
		{
			var msg="Please Comapny Name";
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
function StockDetailsReportAsPerCompanyName(){

	var company_name=$("#company_name").val();
	
	var params= {};
	var input1 = document.getElementById('company_name'),
	    list   = document.getElementById('company_drop'),
	    		 i,companyName;
	
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input1.value) {
			companyName = list.options[i].getAttribute('data-value');
		}
	}
	
	params["companyName"]= companyName;
	
	params["methodName"] = "StockDetailsReportAsPerCompanyName";

	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
			{
		$('#companyWiseTable').dataTable().fnClearTable();
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		
		if(catmap == "" || catmap == null )
		{
			alert("NO Company Wise Stock Reports for\nCompany Name = "+company_name);
			return false;
		}
		
		$(document).ready(function() {
		 var total =   $('#companyWiseTable').DataTable( {
			 
			 "bProcessing": true,
			    "sAutoWidth": false,
			    "bDestroy":true,
			    "sPaginationType": "bootstrap", // full_numbers
			    "iDisplayStart ": 10,
			    "iDisplayLength": 10,
			    "bPaginate": false, //hide pagination
			    //"bFilter": false, //hide Search bar
			    "bInfo": true, // hide showing entries
			 
			 fnRowCallback : function(nRow, aData, iDisplayIndex){
	                $("th:first", nRow).html(iDisplayIndex +1);
	               return nRow;
	            },
	            "footerCallback": function ( row, data, start, end, display ) {
		            var api = this.api(), data;
		 
		            // Remove the formatting to get integer data for summation
		            var intVal = function ( i ) {
		                return typeof i === 'string' ?
		                    i.replace(/[\$,]/g, '')*1 :
		                    typeof i === 'number' ?
		                        i : 0;
		            };
		 
		         
		            /*
		             pageTotal = api
		                .column( 3 )
		                .data()
		                .reduce( function (a, b) {
		                    return intVal(a) + intVal(b);
		                }, 0 );
		 
		            // Update footer
		            $( api.column( 3 ).footer() ).html(
		            		
		              parseFloat(pageTotal).toFixed(2)
		               
		            );
		            console.log( pageTotal);
		            */
	            
	        },
    	
	        destroy: true,
	        searching: true,
	        "scrollY": 500,
	        "scrollX": true,
	        "paging":   false,
		      
		columns: [
					{"data": "productName", "width": "5%"},
					{"data": "companyName", "width": "5%"},
					/*{"data": "weight", "width": "5%"},*/
					{"data": "unit" , "width": "5%"},
					/*{"data": "quantity" , "width": "5%"},*/
					{"data": "availableeQuantity" , "width": "5%"},
		            {"data": "shopname" , "width": "5%"},
					/*{"data": "stockInLtr" , "width": "5%"},
					{"data": "totalPiecequantity" , "width": "5%"},*/
		        
		        ],
		      
				dom : 'Bfrtip',
//				buttons : [ 'copy', 'csv', 'excel', 'pdf', 'print' ]

				buttons : [
				           //'print',
				           				           
				           {	extend: 'print',
				        	    orientation: 'landscape',
				        	   	title: 'Stock Report',
				        	   	footer:true,
				        	   	pageSize: 'LEGAL' },
				           
			               { 	extend: 'copyHtml5',
				                orientation: 'landscape',
				                title: 'Stock Report',
				                footer:true,
				                pageSize: 'LEGAL' },

				           { 	extend: 'excelHtml5',
				                orientation: 'landscape', 
				                title: 'Stock Report',
				                messageTop: 'Stock Report',
				                footer:true,
				                pageSize: 'LEGAL' },
				                
				           { 	extend: 'csvHtml5',
				                orientation: 'landscape',
				                title: 'Stock Report',
				                footer:true,
				                pageSize: 'LEGAL' },
				           
				           

						 { extend: 'pdfHtml5',
				                orientation: 'landscape', 
				                title: 'Stock Report',
				                footer:true,
				                pageSize: 'LEGAL' } ]
	        
		    } );
		} );
		
	var mydata = catmap;
	$('#companyWiseTable').dataTable().fnAddData(mydata);
	
		}
	
	);
}

function StockDetailsReportAsPerCatValidate()
{	
	var fk_cat_id = $("#fk_cat_id").val();
		
	if(fk_cat_id != null && fk_cat_id != "")
		{
		 	StockDetailsReportAsPerCat();
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

function StockDetailsReportAsPerCat()
{
	var category = $("#fk_cat_id").val();
	
	var params= {};
	
	var input1 = document.getElementById('fk_cat_id'),
	    list   = document.getElementById('cat_drop'),
	    		 i,fk_cat_id;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input1.value) {
			fk_cat_id = list.options[i].getAttribute('data-value');
		}
	}
	
	params["cat"]= fk_cat_id;
	
	params["methodName"] = "getStockReportAsPerCategory";

	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
			{
		
		$('#stockByCat').dataTable().fnClearTable();
		
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		
		if(catmap == "" || catmap == null )
			{
				alert("NO Category Wise Stock Reports for\nCategory = "+category);
				return false;
			}
			
		
		$(document).ready(function() {
		 var total =   $('#stockByCat').DataTable( {
			 
			 "bProcessing": true,
			    "sAutoWidth": false,
			    "bDestroy":true,
			    "sPaginationType": "bootstrap", // full_numbers
			    "iDisplayStart ": 10,
			    "iDisplayLength": 10,
			    "bPaginate": false, //hide pagination
			    //"bFilter": false, //hide Search bar
			    "bInfo": true, // hide showing entries
			 
			 fnRowCallback : function(nRow, aData, iDisplayIndex){
	                $("th:first", nRow).html(iDisplayIndex +1);
	               return nRow;
	            },
		   		 "footerCallback": function ( row, data, start, end, display ) {
			            var api = this.api(), data;
			 
			            // Remove the formatting to get integer data for summation
			            var intVal = function ( i ) {
			                return typeof i === 'string' ?
			                    i.replace(/[\$,]/g, '')*1 :
			                    typeof i === 'number' ?
			                        i : 0;
			            };
			 
/*
			            pageTotal = api
			                .column( 4 )
			                .data()
			                .reduce( function (a, b) {
			                    return intVal(a) + intVal(b);
			                }, 0 );
			 
			            
			            // Update footer
			            $( api.column( 4 ).footer() ).html(
			            		
			              parseFloat(pageTotal).toFixed(2)
			               
			            );
			            console.log( pageTotal);
			            
			            pageTotal = api
		                .column( 5 )
		                .data()
		                .reduce( function (a, b) {
		                    return intVal(a) + intVal(b);
		                }, 0 );
		 
		            // Update footer
		            $( api.column( 5 ).footer() ).html(
		            		
		              parseFloat(pageTotal).toFixed(2)
		               
		            );
		            console.log( pageTotal);
		            
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
		        },
	    	
		    		        
		        destroy: true,
		        searching: true,
		        "scrollY": 500,
		        "scrollX": true,
		        "paging":   false,
		        

		columns: [
		            {"data": "productName", "width": "5%"},
		            {"data": "companyName", "width": "5%"},
		          /*  {"data": "weight", "width": "5%"},*/
		            {"data": "unit", "width": "5%"},
		           /* {"data": "quantity" , "width": "5%"},*/
		            {"data": "availableeQuantity" , "width": "5%"},
		            {"data": "shopname" , "width": "5%"},
		        ],
		      
				dom : 'Bfrtip',
//				buttons : [ 'copy', 'csv', 'excel', 'pdf', 'print' ]

				buttons : [
				           //'print',
				           				           
				           {	extend: 'print',
				        	    orientation: 'landscape',
				        	   	title: 'Stock Report',
//				        	   	footer:true,
				        	   	pageSize: 'LEGAL' },
				           
			               { 	extend: 'copyHtml5',
				                orientation: 'landscape',
				                title: 'Stock Report',
	//			                footer:true,
				                pageSize: 'LEGAL' },

				           { 	extend: 'excelHtml5',
				                orientation: 'landscape', 
				                title: 'Stock Report',
				                messageTop: 'Stock Report',
		//		                footer:true,
				                pageSize: 'LEGAL' },
				                
				           { 	extend: 'csvHtml5',
				                orientation: 'landscape',
				                title: 'Stock Report',
		//		                footer:true,
				                pageSize: 'LEGAL' },
				           
				           
						 //{ extend: 'copyHtml5', footer: true },
						 //{ extend: 'excelHtml5', footer: true },
						 //{ extend: 'csvHtml5', footer: true },
						 { extend: 'pdfHtml5',
				                orientation: 'landscape', 
				                title: 'Stock Report',
		//		                footer:true,
				                pageSize: 'LEGAL' } ]
		        
		    } );
		} );
		
	var mydata = catmap;
	$('#stockByCat').dataTable().fnAddData(mydata);
	
		}
	

	);

}
function StockDetailsReportAsPerShopValidate()
{
	var fk_shop_id = $("#fk_shop_id").val();
	if(fk_shop_id != null && fk_shop_id!="")
		{
			getShopWiseReport();
		}
	else
		{
			var msg="Plaese Select Shop";
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

function getShopWiseReport()
{
	
	var shopName = $("#fk_shop_id").val();
		var params= {};
	
	var input1 = document.getElementById('fk_shop_id'),
	list = document.getElementById('Shop_drop'),
	i,fk_shop_id;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input1.value) {
			fk_shop_id = list.options[i].getAttribute('data-value');
		}
	}
	
	params["fk_shop_id"]= fk_shop_id;
	
	params["methodName"] = "getStockReportAsPerShop";

	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
			{
		
		$('#stockByGodown').dataTable().fnClearTable();
		
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		
		if(catmap == "" || catmap == null )
		{
			alert("NO Shop Name Wise Stock Reports for\nShop Name = "+shopName);
			return false;
		}
		
		$(document).ready(function() {
		 var total =   $('#stockByGodown').DataTable( {
			 "bProcessing": true,
			    "sAutoWidth": false,
			    "bDestroy":true,
			    "sPaginationType": "bootstrap", // full_numbers
			    "iDisplayStart ": 10,
			    "iDisplayLength": 10,
			    "bPaginate": false, //hide pagination
			    //"bFilter": false, //hide Search bar
			    "bInfo": true, // hide showing entries
			 
			 fnRowCallback : function(nRow, aData, iDisplayIndex){
	                $("th:first", nRow).html(iDisplayIndex +1);
	               return nRow;
	            },
			
	            destroy: true,
		        searching: true,
		        "scrollY": 500,
		        "scrollX": true,
		        "paging":   false,
		        
		      
		columns: [
		          	{"data": "productName" , "width": "5%"},
		            {"data": "companyName", "width": "5%"},
		           /* {"data": "weight", "width": "5%"},*/
		            {"data": "unit", "width": "5%"},
		          /*  {"data": "quantity", "width": "5%"},*/
		            {"data": "availableeQuantity", "width": "5%"},
		            {"data": "shopname" , "width": "5%"},
		           /* {"data": "stockInLtr", "width": "5%"},
		            {"data": "totalPiecequantity", "width": "5%"},*/
		            
		        
		        ],
		      
				dom : 'Bfrtip',
				buttons : [
				           //'print',
				           				           
				           {	extend: 'print',
				        	    orientation: 'landscape',
				        	   	title: 'Stock Report ',
				        	   	footer:true,
				        	   	pageSize: 'LEGAL' },
				           
			               { 	extend: 'copyHtml5',
				                orientation: 'landscape',
				                title: 'Stock Report ',
				                footer:true,
				                pageSize: 'LEGAL' },

				           { 	extend: 'excelHtml5',
				                orientation: 'landscape',
				                title: 'Stock Report ',
				                messageTop: 'Stock Report  ',
				                footer:true,
				                pageSize: 'LEGAL' },
				                
				           { 	extend: 'csvHtml5',
				                orientation: 'landscape',
				                title: 'Stock Report ',
				                footer:true,
				                pageSize: 'LEGAL' },
				                
				                { extend: 'pdfHtml5',
				                orientation: 'landscape',
				                title: 'Stock Report ',
				                footer:true,
				                pageSize: 'LEGAL' } ]
			});
		});
		
	var mydata = catmap;
	$('#stockByGodown').dataTable().fnAddData(mydata);
	
		}
	

	);


}


/*** +++ Fetching product Name+++ *****/
function getProductName(){
		
		$("#proName").empty();
		$("#proName").append($("<option></option>").attr("value","").text("Select Product"));
		var params= {};
		
		params["methodName"] = "getAllProductByCategoriesForStockReport";
				
		$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
				{ var count = 1;
				
			var jsonData = $.parseJSON(data);
			$.each(jsonData,function(i,v)
					{
				$("#proName").append($("<option></option>").attr("value",count).text(v.product + ","+v.manufacturer+","+v.weight+","+v.unitName)); 
					count++;
					});
				}).error(function(jqXHR, textStatus, errorThrown){
					if(textStatus==="timeout") {

					}
				});
		
	
}
function StockDetailsReportAsPerProductNameValidate()
{
	//var fk_cat_id = $("#fk_cat_id").val();
	var proName = $("#proName").val();
	if(proName !=null && proName!="")
		{
			StockDetailsReportAsPerProductName();
		}
		else
		{
			var msg="Please Select Product";
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


function StockDetailsReportAsPerProductName(){
	
	var params= {};
	
	$("#proName option:selected").each(function() {
		   selectedVal = $(this).text();
		});
	
	var splitText = selectedVal.split(",");
	
	var proName = splitText[0];
	var company = splitText[1];
	var weight = splitText[2];
	
	params["proName"]= proName;
	params["company"]= company;
	params["weight"]= weight;
	
	params["methodName"] = "StockDetailsReportAsPerProductName";

	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
			{
		$('#productTable').dataTable().fnClearTable();
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		
		if(catmap == "" || catmap == null)
			{
				alert("NO Product Wise Stock Reports for\nProduct = "+proName);
				return false;
			}
		
		
		$(document).ready(function() {
		 var total =   $('#productTable').DataTable( {
			 
			 "bProcessing": true,
			    "sAutoWidth": false,
			    "bDestroy":true,
			    "sPaginationType": "bootstrap", // full_numbers
			    "iDisplayStart ": 10,
			    "iDisplayLength": 10,
			    "bPaginate": false, //hide pagination
			    //"bFilter": false, //hide Search bar
			    "bInfo": true, // hide showing entries
			 
			 fnRowCallback : function(nRow, aData, iDisplayIndex){
	                $("th:first", nRow).html(iDisplayIndex +1);
	               return nRow;
	            },
	            "footerCallback": function ( row, data, start, end, display ) {
		            var api = this.api(), data;
		 
		            // Remove the formatting to get integer data for summation
		            var intVal = function ( i ) {
		                return typeof i === 'string' ?
		                    i.replace(/[\$,]/g, '')*1 :
		                    typeof i === 'number' ?
		                        i : 0;
		            };
		 
		         
		            /*pageTotal = api
		                .column( 3 )
		                .data()
		                .reduce( function (a, b) {
		                    return intVal(a) + intVal(b);
		                }, 0 );
		 
		            // Update footer
		            $( api.column( 3 ).footer() ).html(
		            		
		              parseFloat(pageTotal).toFixed(2)
		               
		            );
		            console.log( pageTotal);*/
	            
	        },
    	
	        destroy: true,
	        searching: true,
	        "scrollY": 500,
	        "scrollX": true,
	        "paging":   false,
		      
		columns: [
					{"data": "productName", "width": "5%"},
					{"data": "companyName", "width": "5%"},
					/*{"data": "weight", "width": "5%"},*/
					{"data": "unit" , "width": "5%"},
					/*{"data": "quantity" , "width": "5%"},*/
					{"data": "availableeQuantity" , "width": "5%"},
		            {"data": "shopname" , "width": "5%"},
					/*{"data": "stockInLtr" , "width": "5%"},
					{"data": "totalPiecequantity" , "width": "5%"},*/
					
		        
		        ],
		      
		        dom : 'Bfrtip',


				buttons : [
				           //'print',
				           				           
				           {	extend: 'print',
				        	    orientation: 'landscape',
				        	   	title: 'Stock Report',
				        	   	footer:true,
				        	   	pageSize: 'LEGAL' },
				           
			               { 	extend: 'copyHtml5',
				                orientation: 'landscape',
				                title: 'Stock Report',
				                footer:true,
				                pageSize: 'LEGAL' },

				           { 	extend: 'excelHtml5',
				                orientation: 'landscape', 
				                title: 'Stock Report',
				                messageTop: 'Stock Report',
				                footer:true,
				                pageSize: 'LEGAL' },
				                
				           { 	extend: 'csvHtml5',
				                orientation: 'landscape',
				                title: 'Stock Report',
				                footer:true,
				                pageSize: 'LEGAL' },
				           
				           

						 { extend: 'pdfHtml5',
				                orientation: 'landscape', 
				                title: 'Stock Report',
				                footer:true,
				                pageSize: 'LEGAL' } 
				                ]
		        
		    } );
		} );
		
	var mydata = catmap;
	$('#productTable').dataTable().fnAddData(mydata);
	
		}
	
	);
}



/*** +++ Fetching product Name+++ *****/
function getProductNameForStockReport(){
		
		$("#proName").empty();
		$("#proName").append($("<option></option>").attr("value","").text("Select Product"));
		var params= {};
		
		params["methodName"] = "getAllProductByCategoriesForStockReport";
		
		
		$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
				{ var count = 1;
				
			var jsonData = $.parseJSON(data);
			$.each(jsonData,function(i,v)
					{
				$("#proName").append($("<option></option>").attr("value",count).text(v.product + ","+v.manufacturer+","+v.weight+","+v.unitName)); 
					count++;
					});
				}).error(function(jqXHR, textStatus, errorThrown){
					if(textStatus==="timeout") {

					}
				});
		
	
}

//

function StockDetailsReportAsPerCompanyNameValidate()
{
	var company_name=$("#company_name").val();
	
	if(company_name != null && company_name != "")
		{
			StockDetailsReportAsPerCompanyName();
		}
		else
		{
			var msg="Please Comapny Name";
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
function getsale(){
	var params={};
	params["methodName"] = "getsaleamount";

	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
			{
var jsonData = $.parseJSON(data);
		
	if(data.length < 28){
	
	document.getElementById("saleAmount").value = 0;
	getpurchase();
		return false;
	}

		var catmap = jsonData.list;
/*		if(catmap==null || catmap==undefined || catmap==""){
			getpurchase();
		}*/
		$.each(jsonData,function(i,v)
				{
			
	
			document.getElementById("saleAmount").value = v.SalePrice;

			getpurchase();
				});

		
	}).error(function(jqXHR, textStatus, errorThrown){
		if(textStatus==="timeout") {
		}
	});
	

			
}

function getpurchase(){
	var params={};
	params["methodName"] = "getpurchaseamount";

	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
			{
		var jsonData = $.parseJSON(data);
		if(data.length < 28){
			
			document.getElementById("purAmount").value = 0;
			profitloss();
				return false;
			}
		var catmap = jsonData.list;
		/*if(catmap==null || catmap==undefined || catmap==""){
			getpurchasereturn();
		}*/
		$.each(jsonData,function(i,v)
				{
			
	
			document.getElementById("purAmount").value = v.grossTotal;
			profitloss();
				});

		
	}).error(function(jqXHR, textStatus, errorThrown){
		if(textStatus==="timeout") {
		}
	});
		
			
}
function profitloss(){
	
	var pp = document.getElementById("purAmount").value;
	var ss = document.getElementById("saleAmount").value;
	var tt = (ss) - (pp);
	document.getElementById("profitloss").value = tt;
	getpurchasereturn();
}

//
function getpurchasereturn(){
	var params={};
	params["methodName"] = "getpurchasereturnamount";

	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
			{
		var jsonData = $.parseJSON(data);
		if(data.length < 28){
			
			document.getElementById("purreturnAmount").value = 0;
			getsalereturn();
				return false;
			}
		
		var catmap = jsonData.list;
		/*if(catmap==null || catmap==undefined || catmap==""){
			getsalereturn();
		}*/
		
		$.each(jsonData,function(i,v)
				{
			
	
			document.getElementById("purreturnAmount").value = v.grossTotal;
			getsalereturn();
				});

		
	}).error(function(jqXHR, textStatus, errorThrown){
		if(textStatus==="timeout") {
		}
	});
		
			
}
//

function getsalereturn(){
	var params={};
	params["methodName"] = "getsalereturnamount";

	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
			{
		var jsonData = $.parseJSON(data);
		if(data.length < 28){
			
			document.getElementById("salereturnAmount").value = 0;
			getlowstock();
			return false;
			}
		var catmap = jsonData.list;
		
		$.each(jsonData,function(i,v)
				{
			
	
			document.getElementById("salereturnAmount").value = v.grossTotal;
			getlowstock();
				});

		
	}).error(function(jqXHR, textStatus, errorThrown){
		if(textStatus==="timeout") {
		}
	});
		
			
}
//
function getlowstock(){
	var params={};
	params["methodName"] = "getlowstock";

	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
			{
		var jsonData = $.parseJSON(data);
		if(data.length < 28){
			var ss = "No Low Stock Product Available";
//			document.getElementById("lowstock").value = ss;
			$("#lowstock").append($("<option></option>").attr("value","").text(ss));
			}
		var catmap = jsonData.list;
		
		$.each(jsonData,function(i,v)
				{
			
	
//			document.getElementById("lowstock").value = v.productName;
			$("#lowstock").append($("<option></option>").attr("value",v.PkStockId).text(v.productName));
				});

		
	}).error(function(jqXHR, textStatus, errorThrown){
		if(textStatus==="timeout") {
		}
	});
		
			
}