/*+++++++++++++++++ Sale report between for single date as per category +++++++++++++++++++++++++*/

function saleReportForSingleDateAsPerCategory()
{
	//var i1 = document.getElementById('fk_cat_id6');
	if(document.saleReportForm22.fk_cat_id6.value == "")
	{
		var msg="Please Select Product Category"
		var dialog = bootbox.dialog({
	    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
	    closeButton: false
		});			
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		return false;
	}
	//var i2 = document.getElementById('fDate');
	if(document.saleReportForm22.fDate.value == "")
	{
		var msg="Please Select Date"
		var dialog = bootbox.dialog({
	    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
	    closeButton: false
		});			
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		return false;
	}
	saleReportForSingleDateAsPerCat();
}
function saleReportForSingleDateAsPerCat()
{	
	var category = $("#fk_cat_id6").val();
	var date = $("#fDate").val();
	
	var params= {};

	var input1 = document.getElementById('fk_cat_id6'),
	    list   = document.getElementById('cat_drop6'),
	             i,fk_cat_id;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input1.value) {
			fk_cat_id = list.options[i].getAttribute('data-value');
		}
	}
	
	var fk_cat_id = fk_cat_id;
	var fk_cat_idPDFValue = $("#fk_cat_id6").val();
	var fDate = $("#fDate").val(); 
	
	params["cat"]= fk_cat_id;
	params["fDate"]= fDate;
	params["methodName"] = "getSaleDetailsAsPerCategoryForSingleDate";

	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
			{
		
		$('#sale1').dataTable().fnClearTable();
		
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		
		if(catmap == null || catmap == "")
		{
			alert("Sale Reports are Not Available for\nCategory = "+category+"\nDate = "+date);
			return false;
		}
		/*$(document).ready(function() {
		    
		} );
		*/
		
		$(document).ready(function() {
		 var total =   $('#sale1').DataTable( {
			 

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
			                .column( 8 )
			                .data()
			                .reduce( function (a, b) {
			                    return intVal(a) + intVal(b);
			                }, 0 );
			 
			            // Update footer
			            $( api.column( 8 ).footer() ).html(
			            		
			              parseFloat(pageTotal).toFixed(2)
			               
			            );
			            console.log( pageTotal);
		            
		        },
		    
		    	
		    	destroy: true,
		        searching: true,
		        "scrollY": 500,
		        "scrollX": true,
		        "paging":   false,
		        
		      
		columns: [
		          	{"data": "customerBill", "width": "5%"},
		            {"data": "itemName", "width": "5%"},
		            {"data": "soldDate", "width": "5%"},
		            {"data": "SalePrice" , "width": "5%"},	
		            {"data": "quantityCCReports" , "width": "5%"},
		            {"data": "unit" , "width": "5%"},
		            {"data": "taxPerc", "width": "5%"},
		            {"data": "taxAmnt", "width": "5%"},
		          /*  {"data": "discountAmount", "width": "5%"},
		            {"data": "hamaliexpense", "width": "5%"},*/
		            {"data": "totalAmount" , "width": "5%"}
		        ],
		        
		        /*dom: 'Bfrtip',
	            buttons: [
	                'copy', 'csv', 'excel', 'pdf', 'print'
	            ]*/
		        dom : 'Bfrtip',
				buttons : [
				           //'print',
				           				           
				           {	extend: 'print',
				        	    orientation: 'landscape',
				        	   	title: 'Product Category Wise Sale Reports \nProduct Category = '+fk_cat_idPDFValue+'\n Date = '+fDate,
				        	   	footer:true,
				        	   	pageSize: 'LEGAL' },
				           
			               { 	extend: 'copyHtml5',
				                orientation: 'landscape',
				        	   	title: 'Product Category Wise Sale Reports \nProduct Category = '+fk_cat_idPDFValue+'\n Date = '+fDate,
				                footer:true,
				                pageSize: 'LEGAL' },

				           { 	extend: 'excelHtml5',
				                orientation: 'landscape',
				        	   	title: 'Product Category Wise Sale Reports \nProduct Category = '+fk_cat_idPDFValue+'\n Date = '+fDate,
				                messageTop:'Product Category Wise Sale Reports \nProduct Category = '+fk_cat_idPDFValue+'\n Date = '+fDate,
				                footer:true,
				                pageSize: 'LEGAL' },
				                
				           { 	extend: 'csvHtml5',
				                orientation: 'landscape',
				                title: 'Product Category Wise Sale Reports \nProduct Category = '+fk_cat_idPDFValue+'\n Date = '+fDate,
				                footer:true,
				                pageSize: 'LEGAL' },
				           
				           
						 //{ extend: 'copyHtml5', footer: true },
						 //{ extend: 'excelHtml5', footer: true },
						 //{ extend: 'csvHtml5', footer: true },
				                
				                { extend: 'pdfHtml5',
				                orientation: 'landscape',
				        	   	title: 'Product Category Wise Sale Reports \nProduct Category = '+fk_cat_idPDFValue+'\n Date = '+fDate,
				                footer:true,
				                pageSize: 'LEGAL' } ]
		        
		        
		    } );
		
		} );
		
	var mydata = catmap;
	$('#sale1').dataTable().fnAddData(mydata);
	
		}
	

	);

}

/*+++++++++++++++++ Sale report between two dates as per category +++++++++++++++++++++++++*/
function saleReportBetweenTwoDatesAsPerCategory(){
	if(document.saleReportFormRange.fk_cat_id_for_payment_mode_two1.value == "")
	{
		var msg="Please select Category";
		var dialog = bootbox.dialog({
	    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
	    closeButton: false
		});			
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		return false;
	}
	if(document.saleReportFormRange.fisDate.value == "")
	{
		var msg="Please Select Start Date";
		var dialog = bootbox.dialog({
	    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
	    closeButton: false
		});			
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		return false;
	}
	if(document.saleReportFormRange.endDate.value == "")
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
	saleReportBetweenTwoDatesAsPerCat();
}
function saleReportBetweenTwoDatesAsPerCat()
{
	var categoryA = $("#fk_cat_id_for_payment_mode_two1").val();
	var startdateA = $("#fisDate").val();
	var enddateA = 	$("#endDate").val();

	var params= {};

	var input1 = document.getElementById('fk_cat_id_for_payment_mode_two1'),
	list = document.getElementById('cat_drop_For_payment_mode_two1'),
	i,fk_cat_id;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input1.value) {
			fk_cat_id = list.options[i].getAttribute('data-value');
		}
	}
	
	//alert(fk_cat_id);
	var fk_cat_id = fk_cat_id;
	
	var categoryPdfValue = $("#fk_cat_id_for_payment_mode_two1").val();
	var fisDate = $("#fisDate").val(); 
	var endDate = $("#endDate").val();
	
	params["fk_cat_id"]= fk_cat_id;
	params["fisDate"]= fisDate;
	params["endDate"]= endDate;
	params["methodName"] = "getSaleDetailsAsPerCategoryBetweenTwoDates";

	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
			{
		
		$('#saleBetTwoDates').dataTable().fnClearTable();
		
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		
		if(catmap == null || catmap == "")
		{
			alert("Sale Reports are Not Available for\nCategory = "+categoryA+"\nStart Date = "+startdateA+"\nEnd Date = "+enddateA);
			return false;
		}
		
		$(document).ready(function() {
		 var total =   $('#saleBetTwoDates').DataTable( {
			 
		//	 "paging": false,
			 
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
			                .column( 8 )
			                .data()
			                .reduce( function (a, b) {
			                    return intVal(a) + intVal(b);
			                }, 0 );
			 
			            // Update footer
			            $( api.column( 8 ).footer() ).html(
			            		
			              parseFloat(pageTotal).toFixed(2)
			               
			            );
			            console.log( pageTotal);
		            
		        },
		    	    	
		    	destroy: true,
		        searching: true,
		        "scrollY": 400,
		        "scrollX": true,
		        "paging":   false,
		        
		      
		columns: [
		          	{"data": "customerBill", "width": "5%"},
		            {"data": "itemName", "width": "5%"},
		            {"data": "soldDate", "width": "5%"},
		            {"data": "SalePrice" , "width": "5%"},		           
		            {"data": "quantityCCReports" , "width": "5%"},
		            		  
		            {"data": "unit" , "width": "5%"},
		         //   {"data": "taxPerc", "width": "5%"},
		            {"data": "tax", "width": "5%"},
		            {"data": "taxAmnt", "width": "5%"},
/*		            {"data": "discountAmount", "width": "5%"},*/
		            {"data": "totalAmount" , "width": "5%"}
		            
		            
		            
		        ],
/*		        dom: 'Bfrtip',
	            buttons: [
	                'copy', 'csv', 'excel', 'pdf', 'print'
	            ]
*/		        
		        
		        dom : 'Bfrtip',
		        buttons : [
				           //'print',
				           				           
				           {	extend: 'print',
				        	    orientation: 'landscape',
				        	   	title: 'Product Category Wise Sale Reports Between 2 Dates \nProduct Category = '+categoryPdfValue+'\n From = '+fisDate+' to '+endDate,
				        	   	footer:true,
				        	   	pageSize: 'LEGAL' },
				           
			               { 	extend: 'copyHtml5',
				                orientation: 'landscape',
				        	   	title: 'Product Category Wise Sale Reports Between 2 Dates \nProduct Category = '+categoryPdfValue+'\n From = '+fisDate+' to '+endDate,
				                footer:true,
				                pageSize: 'LEGAL' },

				           { 	extend: 'excelHtml5',
				                orientation: 'landscape',
				        	   	title: 'Product Category Wise Sale Reports Between 2 Dates \nProduct Category = '+categoryPdfValue+'\n From = '+fisDate+' to '+endDate,
				                messageTop: 'Product Category Wise Sale Reports Between 2 Dates \nProduct Category = '+categoryPdfValue+'\n From = '+fisDate+' to '+endDate,
				                footer:true,
				                pageSize: 'LEGAL' },
				                
				           { 	extend: 'csvHtml5',
				                orientation: 'landscape',
				        	   	title: 'Product Category Wise Sale Reports Between 2 Dates \nProduct Category = '+categoryPdfValue+'\n From = '+fisDate+' to '+endDate,
				                footer:true,
				                pageSize: 'LEGAL' },
				           
				           
						 //{ extend: 'copyHtml5', footer: true },
						 //{ extend: 'excelHtml5', footer: true },
						 //{ extend: 'csvHtml5', footer: true },
				                
				                { extend: 'pdfHtml5',
				                orientation: 'landscape',
				        	   	title: 'Product Category Wise Sale Reports Between 2 Dates \nProduct Category = '+categoryPdfValue+'\n From = '+fisDate+' to '+endDate,
				                footer:true,
				                pageSize: 'LEGAL' } ]
		        
		        
		        
		    } );
		} );
		
	var mydata = catmap;
	$('#saleBetTwoDates').dataTable().fnAddData(mydata);
	
		}
	

	);


}
//

function allReportBetweenTwoDates(){

	if(document.saleReportFormRange.fisDate.value == "")
	{
		var msg="Please Select Start Date";
		var dialog = bootbox.dialog({
	    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
	    closeButton: false
		});			
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		return false;
	}
	if(document.saleReportFormRange.endDate.value == "")
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
	allReportBetweenTwoDates1();
}

//function allReportBetweenTwoDates1()
function alll()
{
//	var categoryA = $("#fk_cat_id_for_payment_mode_two1").val();
	var startdateA = $("#fisDate").val();
	var enddateA = 	$("#endDate").val();

	var params= {};

	
	//alert(fk_cat_id);
//	var fk_cat_id = fk_cat_id;
	
//	var categoryPdfValue = $("#fk_cat_id_for_payment_mode_two1").val();
	var fisDate = $("#fisDate").val(); 
	var endDate = $("#endDate").val();
	
//	params["fk_cat_id"]= fk_cat_id;
	params["fisDate"]= fisDate;
	params["endDate"]= endDate;
	params["methodName"] = "getallDetailsBetweenTwoDates";

	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
			{
		
		$('#allsaleBetTwoDates').dataTable().fnClearTable();
		
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		
		if(catmap == null || catmap == "")
		{
			alert("Sale Reports are Not Available \nStart Date = "+startdateA+"\nEnd Date = "+enddateA);
			return false;
		}
		
		$(document).ready(function() {
			 var total =   $('#allsaleBetTwoDates').DataTable( {
				 

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
				 
				            pageTotal = api
				                .column( 8 )
				                .data()
				                .reduce( function (a, b) {
				                    return intVal(a) + intVal(b);
				                }, 0 );
				 
				            // Update footer
				            $( api.column( 8 ).footer() ).html(
				            		
				              parseFloat(pageTotal).toFixed(2)
				               
				            );
				            console.log( pageTotal);
			            
			        },
			    	    	
			    	destroy: true,
			        searching: true,
			        "scrollY": 300,
			        "scrollX": true,
			        "paging": false,
		        
		      
		columns: [
		          	{"data": "customerBill", "width": "5%"},
		            {"data": "itemName", "width": "5%"},
		            {"data": "soldDate", "width": "5%"},
		            {"data": "SalePrice" , "width": "5%"},		           
		            {"data": "quantityCCReports" , "width": "5%"},
		            {"data": "unit" , "width": "5%"},
		            {"data": "tax", "width": "5%"},
		            {"data": "taxAmnt", "width": "5%"},
/*		            {"data": "discountAmount", "width": "5%"},*/
		            {"data": "totalAmount" , "width": "5%"},
		        	{"data": "cusomerName", "width": "5%"},
		            {"data": "billingtype" , "width": "5%"}
		        ],
/*		        dom: 'Bfrtip',
	            buttons: [
	                'copy', 'csv', 'excel', 'pdf', 'print'
	            ]
*/		   
		        
		        dom : 'Bfrtip',
		        buttons : [
				           //'print',
				           				           
				           {	extend: 'print',
				        	    orientation: 'landscape',
				        	   	title: 'Product Category Wise Sale Reports Between 2 Dates \nProduct Category = '+categoryPdfValue+'\n From = '+fisDate+' to '+endDate,
				        	   	footer:true,
				        	   	pageSize: 'LEGAL' },
				           
			               { 	extend: 'copyHtml5',
				                orientation: 'landscape',
				        	   	title: 'Product Category Wise Sale Reports Between 2 Dates \nProduct Category = '+categoryPdfValue+'\n From = '+fisDate+' to '+endDate,
				                footer:true,
				                pageSize: 'LEGAL' },

				           { 	extend: 'excelHtml5',
				                orientation: 'landscape',
				        	   	title: 'Product Category Wise Sale Reports Between 2 Dates \nProduct Category = '+categoryPdfValue+'\n From = '+fisDate+' to '+endDate,
				                messageTop: 'Product Category Wise Sale Reports Between 2 Dates \nProduct Category = '+categoryPdfValue+'\n From = '+fisDate+' to '+endDate,
				                footer:true,
				                pageSize: 'LEGAL' },
				                
				           { 	extend: 'csvHtml5',
				                orientation: 'landscape',
				        	   	title: 'Product Category Wise Sale Reports Between 2 Dates \nProduct Category = '+categoryPdfValue+'\n From = '+fisDate+' to '+endDate,
				                footer:true,
				                pageSize: 'LEGAL' },
				           
				           
						 //{ extend: 'copyHtml5', footer: true },
						 //{ extend: 'excelHtml5', footer: true },
						 //{ extend: 'csvHtml5', footer: true },
				                
				                { extend: 'pdfHtml5',
				                orientation: 'landscape',
				        	   	title: 'Product Category Wise Sale Reports Between 2 Dates \nProduct Category = '+categoryPdfValue+'\n From = '+fisDate+' to '+endDate,
				                footer:true,
				                pageSize: 'LEGAL' } ]
		        
		        
		        
		    } );
		} );
		
	var mydata = catmap;
	$('#allsaleBetTwoDates').dataTable().fnAddData(mydata);
	
		}
	

	);


}


//all cust rert
function allReportBetweenTwoDates1()
//function all()
{
	var startdateA = $("#fisDate").val();
	var enddateA = 	$("#endDate").val();

	var params= {};

	
	var fisDate = $("#fisDate").val(); 
	var endDate = $("#endDate").val();
	
	params["fisDate"]= fisDate;
	params["endDate"]= endDate;
	params["methodName"] = "getallDetailsBetweenTwoDates";

	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
			{
		
		$('#allsaleBetTwoDates').dataTable().fnClearTable();
		
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		
		if(catmap == null || catmap == "")
		{
			/*alert("Sale Reports are Not Available");*/
			var msg="Sale Reports are Not Available ";
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
		 var total =   $('#allsaleBetTwoDates').DataTable( {
			 
		//	 "paging": false,
			 
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
			 
			            pageTotal = api
			                .column( 8 )
			                .data()
			                .reduce( function (a, b) {
			                    return intVal(a) + intVal(b);
			                }, 0 );
			 
			            // Update footer
			            $( api.column( 8 ).footer() ).html(
			            		
			              parseFloat(pageTotal).toFixed(2)
			               
			            );
			            console.log( pageTotal);
		            
		        },
		    	    	
		    	destroy: true,
		        searching: true,
		        "scrollY": 300,
		        "scrollX": true,
		        "paging":   false,
		        
		      
		columns: [
		            
		          	{"data": "billNo", "width": "5%"},
		            {"data": "itemName", "width": "5%"},
		            {"data": "soldDate", "width": "5%"},
		            {"data": "SalePrice" , "width": "5%"},		           
		            {"data": "quantityCCReports" , "width": "5%"},
		            {"data": "unit" , "width": "5%"},
		            {"data": "tax", "width": "5%"},
		            {"data": "taxAmnt", "width": "5%"},
/*		            {"data": "discountAmount", "width": "5%"},*/
		            {"data": "totalAmount" , "width": "5%"},
		        	{"data": "cusomerName", "width": "5%"},
		            {"data": "billingtype" , "width": "5%"},
		            {"data": "email" , "width": "5%"}
		            
		        ],
/*		        dom: 'Bfrtip',
	            buttons: [
	                'copy', 'csv', 'excel', 'pdf', 'print'
	            ]
*/		        
		        
		        dom : 'Bfrtip',
		        buttons : [
				           //'print',
				           				           
				           {	extend: 'print',
				        	    orientation: 'landscape',
				        	   	title: 'Product Category Wise Sale Reports Between 2 Dates ',
				        	   	footer:true,
				        	   	pageSize: 'LEGAL' },
				           
			               { 	extend: 'copyHtml5',
				                orientation: 'landscape',
				        	   	title: 'Product Category Wise Sale Reports Between 2 Dates ',
				                footer:true,
				                pageSize: 'LEGAL' },

				           { 	extend: 'excelHtml5',
				                orientation: 'landscape',
				        	   	title: 'Product Category Wise Sale Reports Between 2 Dates ',
				                messageTop: 'Product Category Wise Sale Reports Between 2 Dates ',
				                footer:true,
				                pageSize: 'LEGAL' },
				                
				           { 	extend: 'csvHtml5',
				                orientation: 'landscape',
				        	   	title: 'Product Category Wise Sale Reports Between 2 Dates ',
				                footer:true,
				                pageSize: 'LEGAL' },
				           
				           
						 //{ extend: 'copyHtml5', footer: true },
						 //{ extend: 'excelHtml5', footer: true },
						 //{ extend: 'csvHtml5', footer: true },
				                
				                { extend: 'pdfHtml5',
				                orientation: 'landscape',
				        	   	title: 'Product Category Wise Sale Reports Between 2 Dates ',
				                footer:true,
				                pageSize: 'LEGAL' } ]
		        
		        
		        
		    } );
		} );
		
	var mydata = catmap;
	$('#allsaleBetTwoDates').dataTable().fnAddData(mydata);
	
		}
	

	);


}






/*+++++++++++++++++ Sale report between two dates as per category +++++++++++++++++++++++++*/

/*function saleReportBetweenTwoDatesAsPerShopValidate()
{
	var fkShopId = $("#fk_shop_id").val();
	var fDate = $("#fisDateForPay").val(); 
	var sDate = $("#endDateForPay").val();
	
	if(fkShopId != "")
		{
			if(fDate != "")
				{
					if(sDate != "")
						{
							saleReportBetweenTwoDatesAsPerShop()
						}
					else
						{
							alert("Please Enter Product Category");
						}	
				}
			else
				{
					alert("Please Enter End Date");
				}
		}
	else
		{
			alert("Please Enter Start Date")
		}
}*/

function saleReportBetweenTwoDatesAsPerShopValidate()
{
	var shopName = $("#fkShopId").val();
	var fDate = $("#fisDate1").val();
	var sDate = $("#endDate1").val();
	//var catforpaymentmode  = $("#fk_cat_id_for_payment_mode_two").val();
		
	if(shopName != "")
		{
		if(fDate != "")
			{
			if(sDate != "")
				{
					saleReportBetweenTwoDatesAsPerShop();					
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
				var msg="Please Select Start Date";
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

function saleReportBetweenTwoDatesAsPerShop()
{
	var params= {};

	var input1 = document.getElementById('fkShopId'),
	list = document.getElementById('shp_drop'),
	i,fk_cat_id;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input1.value) {
			fk_shop_id = list.options[i].getAttribute('data-value');
		}
	}
	
	var shopName = $("#fkShopId").val();
	var fk_shop_id = fk_shop_id;
	var fDate = $("#fisDate1").val(); 
	var sDate = $("#endDate1").val();
	
	params["shop"]= fk_shop_id;
	params["fDate"]= fDate;
	params["sDate"]= sDate;
	params["methodName"] = "getSaleDetailsAsPerShopBetweenTwoDates";

	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
			{
		
		$('#saleBetTwoDates1').dataTable().fnClearTable();
		
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		
		if(catmap == null || catmap == "")
		{
			alert("Sale Reports are Not Available for\nShop Name = "+shopName+"\nStart Date = "+fDate+"\nEnd Date = "+sDate);
			return false;
		}
		
		$(document).ready(function() {
		 var total =   $('#saleBetTwoDates1').DataTable( {
			 

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
			 
			      /*      // Total over this page
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
			            
			         // Total over this page
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
			            
			         // Total over this page
			            pageTotal = api
			                .column( 7 )
			                .data()
			                .reduce( function (a, b) {
			                    return intVal(a) + intVal(b);
			                }, 0 );
			 
			            // Update footer
			            $( api.column( 7 ).footer() ).html(
			            		
			              parseFloat(pageTotal).toFixed(2)
			               
			            );
			            console.log( pageTotal);*/
			            
			         // Total over this page
			            pageTotal = api
			                .column( 9 )
			                .data()
			                .reduce( function (a, b) {
			                    return intVal(a) + intVal(b);
			                }, 0 );
			 
			            // Update footer
			            $( api.column( 9 ).footer() ).html(
			            		
			             
			              'Rs'+' '+pageTotal.toFixed(2)
			               
			            );
			            console.log( pageTotal);
		            
		        },
		    	    	
		    	destroy: true,
		        searching: false,
		        "scrollY": 500,
		        "scrollX": false,
		        "paging":   false,
		        
		      
		columns: [
		          	{"data": "customerBill", "width": "5%"},
		            {"data": "itemName", "width": "5%"},
		            {"data": "soldDate", "width": "5%"},
		            {"data": "SalePrice" , "width": "5%"},
		            {"data": "quantityCCReports" , "width": "5%"},
		            {"data": "unit", "width": "5%"},
		            {"data": "tax", "width": "5%"},
		           
		           {"data": "iGSTPerc", "width": "5%"},
		            {"data": "taxAmnt", "width": "5%"},
		            {"data": "totalAmount" , "width": "5%"}
		        ],
		        /*dom: 'Bfrtip',
	            buttons: [
	                'copy', 'csv', 'excel', 'pdf', 'print'*/
		        
		        dom : 'Bfrtip',
		        buttons : [
		           //'print',
		           				           
		           {	extend: 'print',
		        	    orientation: 'landscape',
		        	   	title: 'Shop Wise sale Reports\nShop Name = '+shopName+'\nFrom '+fDate+' To '+sDate,
		        	   	footer:true,
		        	   	pageSize: 'LEGAL' },
		           
		           { 	extend: 'copyHtml5',
		                orientation: 'landscape',
		        	   	title: 'Shop Wise sale Reports\nShop Name = '+shopName+'\nFrom '+fDate+' To '+sDate,
		        	   	footer:true,
		                pageSize: 'LEGAL' },

		           { 	extend: 'excelHtml5',
		                orientation: 'landscape',
		        	   	title: 'Shop Wise sale Reports\nShop Name = '+shopName+'\nFrom '+fDate+' To '+sDate,
		        	   	messageTop:	'Payment Mode Wise Sale Reports\nShop Name = '+shopName+'\nFrom '+fDate+' To '+sDate,
		                footer:true,
		                pageSize: 'LEGAL' },
		                
		           { 	extend: 'csvHtml5',
		                orientation: 'landscape',
		        	   	title: 'Shop Wise sale Reports\nShop Name = '+shopName+'\nFrom '+fDate+' To '+sDate,
		        	   	footer:true,
		                pageSize: 'LEGAL' },
		           
		           
		         //{ extend: 'copyHtml5', footer: true },
		         //{ extend: 'excelHtml5', footer: true },
		         //{ extend: 'csvHtml5', footer: true },
		                
		                { extend: 'pdfHtml5',
		                orientation: 'landscape',
		        	   	title: 'Shop Wise sale Reports\nShop Name = '+shopName+'\nFrom '+fDate+' To '+sDate,
		                footer:true,
		                pageSize: 'LEGAL' } ]
		        
	            
		        
		    } );
		} );
		
	var mydata = catmap;
	$('#saleBetTwoDates1').dataTable().fnAddData(mydata);
	
		}
	

	);


}



/*+++++++++++++++++ Sale retutn report  as per Bill+++++++++++++++++++++++++*/
function saleReturnReportAsPerBill()
{
	var params= {};
	var bill_no = $("#bill_no").val();
	
	if(bill_no == null || bill_no == "" || bill_no == undefined)
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
	
	if(bill_no != "")
{		
	
	params["bill_no"]= bill_no;
	params["methodName"] = "saleReturnReportAsPerBill";

	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
			{
		
		$('#salereturn').dataTable().fnClearTable();
		
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		
		if(catmap == null || catmap == "")
		{
			alert("Sale Return Reports are Not Available for\nBill Number = "+bill_no);
			return false;
		}
		
		$(document).ready(function() {
		 var total =   $('#salereturn').DataTable( {
			 

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
			 
			            
			         // Total over this page
			            pageTotal = api
			                .column( 8 )
			                .data()
			                .reduce( function (a, b) {
			                    return intVal(a) + intVal(b);
			                }, 0 );
			 
			            // Update footer
			            $( api.column( 8 ).footer() ).html(
			            		
			             
			              'Rs'+' '+pageTotal.toFixed(2)
			               
			            );
			            console.log( pageTotal);
		            
		        },
		    	    	
		    	destroy: true,
		        searching: false,
		        
		      
		columns: [
		          	{"data": "BillNo", "width": "5%"},
		            {"data": "productName", "width": "5%"},
		            {"data": "saleDate", "width": "5%"},
		            {"data": "salePrice" , "width": "5%"},
		            {"data": "availableQuantity" , "width": "5%"},
		            {"data": "returnDate1", "width": "5%"},
		            {"data": "ReturnAmount", "width": "5%"},
		            {"data": "returnQuantity", "width": "5%"},
		            {"data": "TotalAmount" , "width": "5%"}
		        ],
		        /*dom: 'Bfrtip',
	            buttons: [
	                'copy', 'csv', 'excel', 'pdf', 'print'
	            ]*/
		        
		        dom : 'Bfrtip',
		        buttons : [
		           //'print',

		          {	extend: 'print',
		        	    orientation: 'landscape',
		        	   	title: 'Sale Return Reports Of Bill No: = '+bill_no,
		        	   	footer:true,
		        	   	pageSize: 'LEGAL' },
		           
		           { 	extend: 'copyHtml5',
		                orientation: 'landscape',
		        	   	title: 'Sale Return Reports Of Bill No: = '+bill_no,
		        	   	footer:true,
		                pageSize: 'LEGAL' },

		           { 	extend: 'excelHtml5',
		                orientation: 'landscape',
		        	   	title: 'Sale Return Reports Of Bill No: = '+bill_no,
		        	   	messageTop:'Sale Return Reports Of Bill No: = '+bill_no,
		                footer:true,
		                pageSize: 'LEGAL' },
		                
		           { 	extend: 'csvHtml5',
		                orientation: 'landscape',
		        	   	title: 'Sale Return Reports Of Bill No: = '+bill_no,
		        	   	footer:true,
		                pageSize: 'LEGAL' },
		           
		           
		         //{ extend: 'copyHtml5', footer: true },
		         //{ extend: 'excelHtml5', footer: true },
		         //{ extend: 'csvHtml5', footer: true },
		                
	                { extend: 'pdfHtml5',
	                orientation: 'landscape',
	        	   	title: 'Sale Return Reports Of Bill No: = '+bill_no,		                
	        	   	footer:true,
	                pageSize: 'LEGAL' } 
		         ]
		    } );
		} );
		
	var mydata = catmap;
	$('#salereturn').dataTable().fnAddData(mydata);
	
		}
	

	);
}
	else
		{
			alert("Please Enter Bill Number");
			return false;
		}
	}


//get All product name as per cat for single date
function getAllProduct(){

		var input1 = document.getElementById('fk_cat_id'),
		list = document.getElementById('cat_drop'),
		i,fk_cat_id;
		for (i = 0; i < list.options.length; ++i) {
			if (list.options[i].value === input1.value) {
				fk_cat_id = list.options[i].getAttribute('data-value');
			}
		}
		
		
	 var fk_cat_id = fk_cat_id;
		$("#proName").empty();
		$("#proName").append($("<option></option>").attr("value","").text("Select product"));
		var params= {};
		
		params["methodName"] = "getAllProductByCategoriesForAdvance";
		
		params["fk_cat_id"]= fk_cat_id;
		
		$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
				{ var count = 1;
				
			var jsonData = $.parseJSON(data);
			$.each(jsonData,function(i,v)
					{
				$("#proName").append($("<option></option>").attr("value",count).text(v.product)); 
				//$("#batchNo").append($("<option></option>").attr("value",v.batchNo).text("Batch No = "+v.batchNo + "  " +" Stock = "+ v.quantityForBatchNo ));
					count++;
					});
				}).error(function(jqXHR, textStatus, errorThrown){
					if(textStatus==="timeout") {

					}
				});
		
	}


//get All product name as per cat for sale report bet two dates
function getAllProductForSale(){

	var input1 = document.getElementById('fk_cat_id_for_sale'),
	list = document.getElementById('cat_drop_For_sale'),
	i,fk_cat_id;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input1.value) {
			fk_cat_id = list.options[i].getAttribute('data-value');
		}
	}
	
	
 var fk_cat_id = fk_cat_id;
	$("#proName1").empty();
	$("#proName1").append($("<option></option>").attr("value","").text("Select product"));
	var params= {};
	
	params["methodName"] = "getAllProductByCategoriesForAdvance";
	
	params["fk_cat_id"]= fk_cat_id;
	
	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
			{ var count = 1;
			
		var jsonData = $.parseJSON(data);
		$.each(jsonData,function(i,v)
				{
			$("#proName1").append($("<option></option>").attr("value",count).text(v.product)); 
				count++;
				});
			}).error(function(jqXHR, textStatus, errorThrown){
				if(textStatus==="timeout") {

				}
			});
	
}


/*+++++++++++++++++ Sale report between for single date as per item wise +++++++++++++++++++++++++*/
function saleReportforSingleDateAsPerProName(){
	if(document.saleReportFormItem.fk_cat_id.value == "")
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
	if(document.saleReportFormItem.proName.value == "")
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
	if(document.saleReportFormItem.fDate1.value == "")
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
	}
	
	saleReportforSingleDateAsPerPro();
}
function saleReportforSingleDateAsPerPro()
{
	var category = $("#fk_cat_id").val();
	var proName = $("#proName").val();
	var fDate1 = $("#fDate1").val();
	

	var params= {};
	
	var input1 = document.getElementById('fk_cat_id'),
	list = document.getElementById('cat_drop'),
	i,fk_cat_id;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input1.value) {
			fk_cat_id = list.options[i].getAttribute('data-value');
		}
	}	
	
	$("#proName option:selected").each(function()
		{
		   selectedVal = $(this).text();
		});
	
	var splitText = selectedVal.split(",");
	
	var proName = splitText[0];
	var fk_cat_id = fk_cat_id;
	var fDate = $('#fDate1').val();
	params["cat"]= fk_cat_id;
	params["product"]= proName;
	params["fDate"]= fDate;
	params["methodName"] = "getSaleDetailsAsPerProductNameForSingleDate";

	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
			{
		
		$('#sale3').dataTable().fnClearTable();
		
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		
		if(catmap == null || catmap == "")
		{
			alert("Sale Reports are Not Available for\nCategory = "+category+"\nproName = "+fDate1+"\nDate = "+fDate1);
			return false;
		}
		
		$(document).ready(function() {
		 var total =   $('#sale3').DataTable( {
			 
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
			                .column( 8 )
			                .data()
			                .reduce( function (a, b) {
			                    return intVal(a) + intVal(b);
			                }, 0 );
			 
			            // Update footer
			            $( api.column( 8 ).footer() ).html(
			            		
			              parseFloat(pageTotal).toFixed(2)
			               
			            );
			            console.log( pageTotal);
		            
		        },
		    
		    	destroy: true,
		        searching: false,
		        "scrollY": true,
		        
		      
		columns: [
		          	{"data": "customerBill", "width": "5%"},
		            {"data": "itemName", "width": "5%"},
		            {"data": "soldDate", "width": "5%"},
		            {"data": "SalePrice" , "width": "5%"},
		            {"data": "quantityCCReports" , "width": "5%"},
		            {"data": "unit" , "width": "5%"},
		            {"data": "taxPerc", "width": "5%"},
		            {"data": "taxAmnt", "width": "5%"},
/*		            {"data": "discountAmount", "width": "5%"},*/
		            {"data": "totalAmount" , "width": "5%"}
		        ],
		        /*dom: 'Bfrtip',
	            buttons: [
	                'copy', 'csv', 'excel', 'pdf', 'print'
	            ]*/
		        
		        dom : 'Bfrtip',
				buttons : [
				           //'print',
				           				           
				           {	extend: 'print',
				        	    orientation: 'landscape',
				        	   	title: 'Product Name Wise Sale Reports  \nProduct Category = '+category+'\n Product Name = '+proName+'\n Date = '+fDate1,
				        	   	footer:true,
				        	   	pageSize: 'LEGAL' },
				           
			               { 	extend: 'copyHtml5',
				                orientation: 'landscape',
				        	   	title: 'Product Name Wise Sale Reports  \nProduct Category = '+category+'\n Product Name = '+proName+'\n Date = '+fDate1,
				                footer:true,
				                pageSize: 'LEGAL' },

				           { 	extend: 'excelHtml5',
				                orientation: 'landscape',
				        	   	title: 'Product Name Wise Sale Reports  \nProduct Category = '+category+'\n Product Name = '+proName+'\n Date = '+fDate1,
				        	   	messageTop: 'Product Name Wise Sale Reports  \nProduct Category = '+category+'\n Product Name = '+proName+'\n Date = '+fDate1,
				                footer:true,
				                pageSize: 'LEGAL' },
				                
				           { 	extend: 'csvHtml5',
				                orientation: 'landscape',
				        	   	title: 'Product Name Wise Sale Reports  \nProduct Category = '+category+'\n Product Name = '+proName+'\n Date = '+fDate1,
				                footer:true,
				                pageSize: 'LEGAL' },
				           
				           
						 //{ extend: 'copyHtml5', footer: true },
						 //{ extend: 'excelHtml5', footer: true },
						 //{ extend: 'csvHtml5', footer: true },
				                
				                { extend: 'pdfHtml5',
				                orientation: 'landscape',
				        	   	title: 'Product Name Wise Sale Reports  \nProduct Category = '+category+'\n Product Name = '+proName+'\n Date = '+fDate1,
				                footer:true,
				                pageSize: 'LEGAL' } ]
		        
		    } );
		} );
		
	var mydata = catmap;
	$('#sale3').dataTable().fnAddData(mydata);
	
		}
	);
}

/*+++++++++++++++++ Sale report between two dates as per item wise +++++++++++++++++++++++++*/
function saleReportforBetweenTwoAsPerProName(){

	if(document.saleReportTwoDates.fk_cat_id_for_sale.value == "")
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
	if(document.saleReportTwoDates.proName1.value == "")
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
	if(document.saleReportTwoDates.fisDateForSale.value == "")
	{
		var msg="Please Select Start Date";
		var dialog = bootbox.dialog({
	    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
	    closeButton: false
		});			
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		return false;
	}
	if(document.saleReportTwoDates.endDateForSale.value == "")
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
	
	saleReportforBetweenTwoAsPerPro();

}

function saleReportforBetweenTwoAsPerPro()
{
	var category = $("#fk_cat_id_for_sale").val();
	var proName = $("#proName1").val();
	var firstdate = $("#fisDateForSale").val();
	var enddate = $("#endDateForSale").val();
	

	var params= {};
	
	var input1 = document.getElementById('fk_cat_id_for_sale'),
	list = document.getElementById('cat_drop_For_sale'),
	i,fk_cat_id;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input1.value) {
			fk_cat_id = list.options[i].getAttribute('data-value');
		}
	}	
	
	$("#proName1 option:selected").each(function() {
		   selectedVal = $(this).text();
		});
	
	var splitText = selectedVal.split(",");
	
	var proName = splitText[0];
	var fk_cat_id = fk_cat_id;
	var fDate = $('#fisDateForSale').val();
	var sDate = $('#endDateForSale').val();
	params["cat"]= fk_cat_id;
	params["product"]= proName;
	params["fDate"]= fDate;
	params["sDate"]= sDate;
	
	params["methodName"] = "getSaleDetailsAsPerProductNameBetweenTwoDates";

	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
{
		
		$('#sale4').dataTable().fnClearTable();
		
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		
		if(catmap == null || catmap == "")
		{
			alert("Sale Reports are Not Available for\nCategory = "+category+"\nProduct Name = "+proName+"\nFirst Date = "+firstdate+"\nEnd Date = "+enddate);
			return false;
		}
		
		$(document).ready(function() {
		 var total =   $('#sale4').DataTable( {
			 

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
			                .column( 8 )
			                .data()
			                .reduce( function (a, b) {
			                    return intVal(a) + intVal(b);
			                }, 0 );
			 
			            // Update footer
			            $( api.column( 8 ).footer() ).html(
			            		
			              parseFloat(pageTotal).toFixed(2)
			               
			            );
			            console.log( pageTotal);
		            
		        },
		    	    	
		    	destroy: true,
		        searching: false,
		        "scrollX": true,
		        
		        
		      
		columns: [
		          	{"data": "customerBill", "width": "5%"},
		            {"data": "itemName", "width": "5%"},
		            {"data": "soldDate", "width": "5%"},
		            {"data": "SalePrice" , "width": "5%"},
		            {"data": "quantityCCReports" , "width": "5%"},
		            {"data": "unit" , "width": "5%"},
		            {"data": "taxPerc", "width": "5%"},
		            {"data": "taxAmnt", "width": "5%"},
/*		            {"data": "discountAmount", "width": "5%"},*/
		            {"data": "totalAmount" , "width": "5%"}
		        ],
/*		        dom: 'Bfrtip',
	            buttons: [
	                'copy', 'csv', 'excel', 'pdf', 'print'
	            ]*/
		        
		        dom : 'Bfrtip',
				buttons : [
				           //'print',
				           				           
				           {	extend: 'print',
				        	    orientation: 'landscape',
				        	   	title: 'Product Name Wise Sale Reports  \nProduct Category = '+category+'\nProduct Name = '+proName+'\nFrom = '+firstdate+' to '+enddate,
				        	   	footer:true,
				        	   	pageSize: 'LEGAL' },
				           
			               { 	extend: 'copyHtml5',
				                orientation: 'landscape',
				        	   	title: 'Product Name Wise Sale Reports  \nProduct Category = '+category+'\nProduct Name = '+proName+'\n From = '+firstdate+' to '+enddate,				                footer:true,
				                pageSize: 'LEGAL' },

				           { 	extend: 'excelHtml5',
				                orientation: 'landscape',
				        	   	title: 'Product Name Wise Sale Reports  \nProduct Category = '+category+'\nProduct Name = '+proName+'\n From = '+firstdate+' to '+enddate,
				        	   	messageTop: 'Product Name Wise Sale Reports  \nProduct Category = '+category+'\nProduct Name = '+proName+'\n From = '+firstdate+' to '+enddate,
				                footer:true,
				                pageSize: 'LEGAL' },
				                
				           { 	extend: 'csvHtml5',
				                orientation: 'landscape',
				        	   	title: 'Product Name Wise Sale Reports  \nProduct Category = '+category+'\nProduct Name = '+proName+'\n From = '+firstdate+' to '+enddate,				                footer:true,
				                pageSize: 'LEGAL' },
				           
				           
						 //{ extend: 'copyHtml5', footer: true },
						 //{ extend: 'excelHtml5', footer: true },
						 //{ extend: 'csvHtml5', footer: true },
				                
				                { extend: 'pdfHtml5',
				                orientation: 'landscape',
				        	   	title: 'Product Name Wise Sale Reports  \nProduct Category = '+category+'\nProduct Name = '+proName+'\n From = '+firstdate+' to '+enddate,
				                footer:true,
				                pageSize: 'LEGAL' } ]
		        
		    } );
		} );
		
	var mydata = catmap;
	$('#sale4').dataTable().fnAddData(mydata);
	
		}
	

	);


}

//GST Summary Report
function gstSummaryReportRange(){

	var params= {};
	var gstFisDate1 = $('#gstFisDate1').val();
	var gstEndDate1 = $('#gstEndDate1').val();

	
	params["gstFisDate1"]= gstFisDate1;
	params["gstEndDate1"]= gstEndDate1;
	
	params["methodName"] = "gstSummaryReportsBetweenTwoDates";

	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
{
		
		$('#gstSummary').dataTable().fnClearTable();
		
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		
		
		
		$(document).ready(function() {
		 var total =   $('#gstSummary').DataTable( {
			 
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
		            
		        },
		    	    	
		    	destroy: true,
		        searching: true,
		        
		      
		columns: [
		          	/*{"data": "customerBill", "width": "5%"},
		            {"data": "soldDate", "width": "5%"},
		            {"data": "itemName", "width": "5%"},
		            {"data": "SalePrice" , "width": "5%"},*/
		            {"data": "quantity3" , "width": "5%"},
		            {"data": "tax", "width": "5%"},
		            {"data": "iGSTPerc", "width": "5%"},
		            {"data": "cgstAmnt", "width": "5%"},
		            {"data": "sgstAmnt" , "width": "5%"},
		            {"data": "igstAmnt", "width": "5%"}
		        ],
		        dom: 'Bfrtip',
	            buttons: [
	                'copy', 'csv', 'excel', 'pdf', 'print'
	            ]
		        
		    } );
		} );
		
	var mydata = catmap;
	$('#gstSummary').dataTable().fnAddData(mydata);
	
		}
	

	);


}

//GST Purchase Summary Report
function gstPurchaseSummaryReportRange(){

	var params= {};
	var gstFisDate1 = $('#gstFisDate1').val();
	var gstEndDate1 = $('#gstEndDate1').val();

	
	params["gstFisDate1"]= gstFisDate1;
	params["gstEndDate1"]= gstEndDate1;
	
	params["methodName"] = "gstPurchaseSummaryReportsBetweenTwoDates";

	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
{
		
		$('#gstPurchaseSummary').dataTable().fnClearTable();
		
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		
		
		
		$(document).ready(function() {
		 var total =   $('#gstPurchaseSummary').DataTable( {
			 
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
		            
		        },
		    	    	
		    	destroy: true,
		        searching: false,
		        
		      
		columns: [
		          	/*{"data": "customerBill", "width": "5%"},
		            {"data": "soldDate", "width": "5%"},
		            {"data": "itemName", "width": "5%"},
		            {"data": "SalePrice" , "width": "5%"},*/
		            {"data": "Qnty" , "width": "5%"},
		            {"data": "tax", "width": "5%"},
		            {"data": "iGSTPerc", "width": "5%"},
		            {"data": "cgstAmnt", "width": "5%"},
		            {"data": "sgstAmnt" , "width": "5%"},
		            {"data": "igstAmnt", "width": "5%"}
		        ],
		        dom: 'Bfrtip',
	            buttons: [
	                'copy', 'csv', 'excel', 'pdf', 'print'
	            ]
		        
		    } );
		} );
		
	var mydata = catmap;
	$('#gstPurchaseSummary').dataTable().fnAddData(mydata);
	
		}
	

	);


}

/*Supplier Wise Sale report*/
function supplierWiseSaleReport(){
	if(document.saleReportSupplier.fkSupplierId.value == "")
	{
		alert("Please Select Supplier");
		return false;
	}
	supplierWiseSale();
}

function supplierWiseSale(){
	var params= {};
	
	var input1 = document.getElementById('fkSupplierId'),
	list = document.getElementById('sup_drop'),
	i,fkSupplierId;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input1.value) {
			fkSupplierId = list.options[i].getAttribute('data-value');
		}
	}
	
	var fkSupplierId = fkSupplierId;
	params["fkSupplierId"]= fkSupplierId;
	
	params["methodName"] = "getSaleDetailsAsPerSupplierName";

	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
{
		
		$('#saleForSupplier').dataTable().fnClearTable();
		
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		
		
		
		$(document).ready(function() {
		 var total =   $('#saleForSupplier').DataTable( {
			 
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
			                .column( 7 )
			                .data()
			                .reduce( function (a, b) {
			                    return intVal(a) + intVal(b);
			                }, 0 );
			 
			            // Update footer
			            $( api.column( 7 ).footer() ).html(
			            		
			              parseFloat(pageTotal).toFixed(2)
			               
			            );
			            console.log( pageTotal);
		            
		        },
		    	    	
		    	destroy: true,
		        searching: false,
		        
		      
		columns: [
		          	{"data": "customerBill", "width": "5%"},
		            {"data": "itemName", "width": "5%"},
		            {"data": "soldDate", "width": "5%"},
		            {"data": "SalePrice" , "width": "5%"},
		            {"data": "quantity1" , "width": "5%"},
		            {"data": "transExpense", "width": "5%"},
		            {"data": "hamaliexpense", "width": "5%"},
		            {"data": "totalAmount" , "width": "5%"}
		        ],
		      
		        
		    } );
		} );
		
	var mydata = catmap;
	$('#saleForSupplier').dataTable().fnAddData(mydata);
	
		}
	
	);

}



/*+++++++++++++++++ Payment Mode Wise +++++++++++++++++++++++++*/
function paymentModeReport(){
	if(document.pay.fk_cat_id_for_payment.value == "")
	{
		alert("Please select Product Category");
		return false;
	}
	
	if(document.pay.paymentModeId.value == "")
	{
		alert("Please select Payment Mode");
		return false;
	}
	
	saleReportAsPerPaymentMode();
}

function saleReportAsPerPaymentMode()
{ 
	var categoryForPaymentMode = $("#fk_cat_id_for_payment").val();
	var paymentMode = $("#paymentModeId").val();
	
	var params= {};
	var input1 = document.getElementById('fk_cat_id_for_payment'),
	list = document.getElementById('cat_drop_For_payment'),
	i,fk_cat_id;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input1.value) {
			fk_cat_id = list.options[i].getAttribute('data-value');
		}
	}
	var paymentMode = $("#paymentModeId").val(); 
	params["fk_cat_id"]= fk_cat_id;
	params["paymentMode"]= paymentMode;
	params["methodName"] = "getSaleDetailsAsPerPaymentMode";

	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
			{
		
		$('#paymentModeSelect').dataTable().fnClearTable();
		
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		
		if(catmap == null || catmap == "")
		{
			alert("Sale Reports are Not Available for\nCategory = "+categoryForPaymentMode+"\nPayment Mode = "+paymentMode);
			return false;
		}
		
		/*$(document).ready(function() {
		    
		} );
		*/
		
		$(document).ready(function() {
		 var total =   $('#paymentModeSelect').DataTable( {
			 
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
			 
			         
			            // Total over this page
			            pageTotal = api
			                .column( 2 )
			                .data()
			                .reduce( function (a, b) {
			                    return intVal(a) + intVal(b);
			                }, 0 );
			 
			            // Update footer
			            $( api.column( 2 ).footer() ).html(
			            		
			              parseFloat(pageTotal).toFixed(2)
			               
			            );
			            console.log( pageTotal);
		            
		        },
		    
		    	
		    	destroy: true,
		        searching: false,
		        
		      
		columns: [
		          	{"data": "customerBill", "width": "5%"},
		            {"data": "cusomerName", "width": "5%"},
		            {"data": "totalAmount" , "width": "5%"}
		        ],
		        /*dom: 'Bfrtip',
	            buttons: [
	                'copy', 'csv', 'excel', 'pdf', 'print'
	            ]*/
		        
		        
	                
			        dom : 'Bfrtip',
					buttons : [
					           //'print',
					           				           
					           {	extend: 'print',
					        	    orientation: 'landscape',
					        	   	title: 'Payment Mode Wise Sale Reports\nProduct Category = '+categoryForPaymentMode+'\nPayment Mode = '+paymentMode,
					        	   	footer:true,
					        	   	pageSize: 'LEGAL' },
					           
				               { 	extend: 'copyHtml5',
					                orientation: 'landscape',
					        	   	title: 'Payment Mode Wise Sale Reports\nProduct Category = '+categoryForPaymentMode+'\nPayment Mode = '+paymentMode,
					        	   	footer:true,
					                pageSize: 'LEGAL' },

					           { 	extend: 'excelHtml5',
					                orientation: 'landscape',
					        	   	title: 'Payment Mode Wise Sale Reports\nProduct Category = '+categoryForPaymentMode+'\nPayment Mode = '+paymentMode,
					        	   	messageTop:'Payment Mode Wise Sale Reports\nProduct Category = '+categoryForPaymentMode+'\nPayment Mode = '+paymentMode,
					                footer:true,
					                pageSize: 'LEGAL' },
					                
					           { 	extend: 'csvHtml5',
					                orientation: 'landscape',
					        	   	title: 'Payment Mode Wise Sale Reports\nProduct Category = '+categoryForPaymentMode+'\nPayment Mode = '+paymentMode,
					        	   	footer:true,
					                pageSize: 'LEGAL' },
					           
					           
							 //{ extend: 'copyHtml5', footer: true },
							 //{ extend: 'excelHtml5', footer: true },
							 //{ extend: 'csvHtml5', footer: true },
					                
					                { extend: 'pdfHtml5',
					                orientation: 'landscape',
					        	   	title: 'Payment Mode Wise Sale Reports\nProduct Category = '+categoryForPaymentMode+'\nPayment Mode = '+paymentMode,
					                footer:true,
					                pageSize: 'LEGAL' } ]
	                
	            
		    } );
		
		} );
		
	var mydata = catmap;
	$('#paymentModeSelect').dataTable().fnAddData(mydata);
	
		}
	

	);

}
/*Payment Mode wise Sale report as per single date */
function paymentModeReportAsPerSingleDate(){
	if(document.datepaymentMode.fDateForPaymentMode.value == "")
	{
		var msg="Please select Date";
		var dialog = bootbox.dialog({
	    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
	    closeButton: false
		});			
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		return false;
	}
	
	if(document.datepaymentMode.paymentModeIdForDate.value == "" || document.datepaymentMode.paymentModeIdForDate.value == "selected")
	{
		var msg="Please select Payment Mode";
		var dialog = bootbox.dialog({
	    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
	    closeButton: false
		});			
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		return false;
	}
	
	singleDatePaymentModeWiseSaleReport();
}

function singleDatePaymentModeWiseSaleReport()
{
	document.getElementById("btn").disabled = true;
	
	var enterdate = $("#fDateForPaymentMode").val();
	var paymentModeIdForDate = $("#paymentModeIdForDate").val();
	
	var params= {};
	/*var input1 = document.getElementById('fk_cat_id_for_payment_mode'),
	list = document.getElementById('cat_drop_For_payment_mode'),
	i,fk_cat_id;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input1.value) {
			fk_cat_id = list.options[i].getAttribute('data-value');
		}
	}*/

	params["enterdate"]= enterdate;
	params["paymentModeIdForDate"]= paymentModeIdForDate;
	params["methodName"] = "getSaleDetailsAsPerPaymentModeForSingleDate";

	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
	{
		$('#SinglePayment').dataTable().fnClearTable();
		
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		
		if(catmap == null || catmap == "")
		{
			//alert("Date And Payment Mode Wise Sale Reports\nDate = "+enterdate+"\nPayment Mode = "+paymentModeIdForDate);
			alert("No Data Available in the table")
			return false;
		}
		
		/*$(document).ready(function() {
		    
		} );
		*/
		
		$(document).ready(function() {
		 var total =   $('#SinglePayment').DataTable( {
			 

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
			 
			            // Total over all pages
			            /* total = api
			                .column( 6 )
			                .data()
			                .reduce( function (a, b) {
			                    return intVal(a) + intVal(b);
			                }, 0 ); 
			 			console.log(total); */
			            // Total over this page
			            //cash total
			            pageTotal = api
			                .column( 1 )
			                .data()
			                .reduce( function (a, b) {
			                    return intVal(a) + intVal(b);
			                }, 0 );
			 
			            // Update footer
			            $( api.column( 1 ).footer() ).html(
			            		
			              parseFloat(pageTotal).toFixed(2)
			               
			            );
			            console.log( pageTotal);
			            //cheque total
			            pageTotal = api
		                .column( 2 )
		                .data()
		                .reduce( function (a, b) {
		                    return intVal(a) + intVal(b);
		                }, 0 );
		 
		            // Update footer
		            $( api.column( 2 ).footer() ).html(
		            		
		              parseFloat(pageTotal).toFixed(2)
		               
		            );
		            console.log( pageTotal);
		            //NEFT total
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
		            
	            //Card Total
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
            
            
		        },
		    
		    	
		    	destroy: true,
		        searching: false,
		        
		        
		columns: [
		          	{"data": "customerBill", "width": "5%"},
		          	{"data": "totalAmount", "width": "5%"},
		            {"data": "cashAmount", "width": "5%"},
		            {"data": "chequeAmount" , "width": "5%"},
		            {"data": "neftAmount", "width": "5%"},
		            {"data": "cardAmount" , "width": "5%"}
		        ],
		    /*    dom: 'Bfrtip',
	            buttons: [
	                'copy', 'csv', 'excel', 'pdf', 'print'
	            ]*/
		        
		        
		        dom : 'Bfrtip',
		        buttons : [
		           //'print',
		           				           
		           {	extend: 'print',
		        	    orientation: 'landscape',
		        	   	title: 'Date And Payment Mode Wise Sale Reports\nDate = '+enterdate+'\nPayment Mode = '+paymentModeIdForDate,
		        	   	footer:true,
		        	   	pageSize: 'LEGAL' },
		           
		           { 	extend: 'copyHtml5',
		                orientation: 'landscape',
		                title: 'Date And Payment Mode Wise Sale Reports\nDate = '+enterdate+'\nPayment Mode = '+paymentModeIdForDate,
		        	   	footer:true,
		                pageSize: 'LEGAL' },

		           { 	extend: 'excelHtml5',
		                orientation: 'landscape',
		                title: 'Date And Payment Mode Wise Sale Reports\nDate = '+enterdate+'\nPayment Mode = '+paymentModeIdForDate,
		        	   	messageTop:'Date And Payment Mode Wise Sale Reports\nDate = '+enterdate+'\nPayment Mode = '+paymentModeIdForDate,
		                footer:true,
		                pageSize: 'LEGAL' },
		                
		           { 	extend: 'csvHtml5',
		                orientation: 'landscape',
		                title: 'Date And Payment Mode Wise Sale Reports\nDate = '+enterdate+'\nPayment Mode = '+paymentModeIdForDate,
		        	   	footer:true,
		                pageSize: 'LEGAL' },
		           
		           
		         //{ extend: 'copyHtml5', footer: true },
		         //{ extend: 'excelHtml5', footer: true },
		         //{ extend: 'csvHtml5', footer: true },
		                
		                { extend: 'pdfHtml5',
		                orientation: 'landscape',
		                title: 'Date And Payment Mode Wise Sale Reports\nDate = '+enterdate+'\nPayment Mode = '+paymentModeIdForDate,
		                footer:true,
		                pageSize: 'LEGAL' } ]
		        
		        
		        
		    } );
		
		} );
		
	var mydata = catmap;
	$('#SinglePayment').dataTable().fnAddData(mydata);
	document.getElementById("btn").disabled = false;
	
		}
	

	);


}


/*Payment Mode wise Sale report for two dates */
function paymentModeReportForTwoDates(){
	if(document.twoDatepaymentMode.fisDateForPay.value == "")
	{
		alert("Please select First Date");
		return false;
	}
	
	if(document.twoDatepaymentMode.endDateForPay.value == "")
	{
		alert("Please select Second Date");
		return false;
	}
	/*if(document.twoDatepaymentMode.fk_cat_id_for_payment_mode_two.value == "")
	{
		alert("Please select Category");
		return false;
	}*/
	twoDatePaymentModeWiseSaleReport();
}

function twoDatePaymentModeWiseSaleReport()
{
	 var startdate = $("#fisDateForPay").val();
	 var enddate = $("#endDateForPay").val();
/*	 var category = $("#fk_cat_id_for_payment_mode_two").val();*/
	 

	var params= {};
	/*var input1 = document.getElementById('fk_cat_id_for_payment_mode_two'),
	list = document.getElementById('cat_drop_For_payment_mode_two'),
	i,fk_cat_id;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input1.value) {
			fk_cat_id = list.options[i].getAttribute('data-value');
		}
	}*/
	var fDateForPaymentMode = $("#fisDateForPay").val(); 
	var secondDateForPaymentMode = $("#endDateForPay").val(); 
	/*params["fk_cat_id"]= fk_cat_id;*/
	params["singleDate"]= fDateForPaymentMode;
	params["secondDate"]= secondDateForPaymentMode;
	params["methodName"] = "getSaleDetailsAsPerPaymentModeForTwoDates";

	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
			{
		
		$('#TwoPayment').dataTable().fnClearTable();
		
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		
		if(catmap == null || catmap <= 0)
		{
			alert("Sale Reports are Not Available for\nStart Date = "+startdate+"\nEnd Date = "+enddate);
			return false;
		}
		
		
		$(document).ready(function() {
		 var total =   $('#TwoPayment').DataTable( {
			 

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
			 
			            // Total over all pages
			            /* total = api
			                .column( 6 )
			                .data()
			                .reduce( function (a, b) {
			                    return intVal(a) + intVal(b);
			                }, 0 ); 
			 			console.log(total); */
			            // Total over this page
			            //cash total
			            pageTotal = api
			                .column( 1 )
			                .data()
			                .reduce( function (a, b) {
			                    return intVal(a) + intVal(b);
			                }, 0 );
			 
			            // Update footersaleReturnTable
			            $( api.column( 1 ).footer() ).html(
			            		
			              parseFloat(pageTotal).toFixed(2)
			               
			            );
			            console.log( pageTotal);
			            //cheque total
			            pageTotal = api
		                .column( 2 )
		                .data()
		                .reduce( function (a, b) {
		                    return intVal(a) + intVal(b);
		                }, 0 );
		 
		            // Update footer
		            $( api.column( 2 ).footer() ).html(
		            		
		              parseFloat(pageTotal).toFixed(2)
		               
		            );
		            console.log( pageTotal);
		            //NEFT total
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
		            
	            //Card Total
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
		        },
		    
		    	
		    	destroy: true,
		        searching: false,
		        
		      
		columns: [
		          	{"data": "customerBill", "width": "5%"},
		            {"data": "cashAmount", "width": "5%"},
		            {"data": "chequeAmount" , "width": "5%"},
		            {"data": "neftAmount", "width": "5%"},
		            {"data": "cardAmount" , "width": "5%"}
		        ],
		        /*dom: 'Bfrtip',
	            buttons: [
	                'copy', 'csv', 'excel', 'pdf', 'print'
	            ]*/
		        
		        dom : 'Bfrtip',
		        buttons : [
		           //'print',
		           				           
		           {	extend: 'print',
		        	    orientation: 'landscape',
		        	   	title: 'Payment Mode Wise Sale Reports\n From '+startdate+' To '+enddate,
		        	   	footer:true,
		        	   	pageSize: 'LEGAL' },
		           
		           { 	extend: 'copyHtml5',
		                orientation: 'landscape',
		        	   	title: 'Payment Mode Wise Sale Reports\n From '+startdate+' To '+enddate,

		        	   	footer:true,
		                pageSize: 'LEGAL' },

		           { 	extend: 'excelHtml5',
		                orientation: 'landscape',
		        	   	title: 'Payment Mode Wise Sale Reports\n From '+startdate+' To '+enddate,
		        	   	messageTop: 'Payment Mode Wise Sale Reports\n From '+startdate+' To '+enddate,

		                footer:true,
		                pageSize: 'LEGAL' },
		                
		           { 	extend: 'csvHtml5',
		                orientation: 'landscape',
		        	   	title: 'Payment Mode Wise Sale Reports\n From '+startdate+' To '+enddate,
		        	   	footer:true,
		                pageSize: 'LEGAL' },
		           
		           
		         //{ extend: 'copyHtml5', footer: true },
		         //{ extend: 'excelHtml5', footer: true },
		         //{ extend: 'csvHtml5', footer: true },
		                
		                { extend: 'pdfHtml5',
		                orientation: 'landscape',
		        	   	title: 'Payment Mode Wise Sale Reports\n From '+startdate+' To '+enddate,

		                footer:true,
		                pageSize: 'LEGAL' } ]
		        
		    } );
		
		} );
		
	var mydata = catmap;
	$('#TwoPayment').dataTable().fnAddData(mydata);
	
		}
	

	);


}

/*GST wise Sale Report*/
function gstWiseSaleReportValidation(){

	if(document.gst.gstFisDate.value == "")
	{
		var msg="Please select start date";
		var dialog = bootbox.dialog({
	    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
	    closeButton: false
		});			
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		return false;
	}
	
	if(document.gst.gstEndDate.value == "")
	{
		var msg="Please select end date";
		var dialog = bootbox.dialog({
	    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
	    closeButton: false
		});			
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		return false;
	}
	if(document.gst.fk_cat_id_for_GST.value == "")
	{
		var msg="Please select Category";
		var dialog = bootbox.dialog({
	    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
	    closeButton: false
		});			
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		return false;
	}
	GSTWiseSaleReport();
}

function GSTWiseSaleReport(){

	var params= {};
	var input1 = document.getElementById('fk_cat_id_for_GST'),
	list = document.getElementById('cat_drop_For_GST'),
	i,fk_cat_id;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input1.value) {
			fk_cat_id = list.options[i].getAttribute('data-value');
		}
	}
	var startDate = $("#gstFisDate").val();
	var endDate = $("#gstEndDate").val();
	var proValue = $("fk_cat_id_for_GST").val();
	
	params["fk_cat_id"]= fk_cat_id;
	params["startDate"]= startDate;
	params["endDate"]= endDate;
	
	params["methodName"] = "getSaleDetailsAsPerGST";

	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
			{
		
		$('#gstSale').dataTable().fnClearTable();
		
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		
		if(catmap == null || catmap <=0)
		{
			var msg="Data is not available From "+startDate+" To "+endDate;
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
		 var total =   $('#gstSale').DataTable( {
			 
			 fnRowCallback : function(nRow, aData, iDisplayIndex){
	                $("th:first", nRow).html(iDisplayIndex +1);
	               return nRow;
	            },
			
/*	        	
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
			           
			            //for item Rate total
			           
			 			pageTotal = api
			                .column( 7 )
			                .data()
			                .reduce( function (a, b) {
			                    return intVal(a) + intVal(b);
			                }, 0 );
			 
			            // Update footer
			            $( api.column( 7 ).footer() ).html(
			            		
			              parseFloat(pageTotal).toFixed(2)
			               
			            );
			            console.log( pageTotal);
		            
			            // Quantity total
			            pageTotal = api
		                .column( 12 )
		                .data()
		                .reduce( function (a, b) {
		                    return intVal(a) + intVal(b);
		                }, 0 );
		 
		            // Update footer
		            $( api.column( 12 ).footer() ).html(
		            		
		              parseFloat(pageTotal).toFixed(2)
		               
		            );
		            console.log( pageTotal);
		            
		            // Quantity total
		            pageTotal = api
	                .column( 13 )
	                .data()
	                .reduce( function (a, b) {
	                    return intVal(a) + intVal(b);
	                }, 0 );
	 
	            // Update footer
	            $( api.column( 13 ).footer() ).html(
	            		
	              parseFloat(pageTotal).toFixed(2)
	               
	            );
	            console.log( pageTotal);
	            
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

// Quantity total
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


},  */  
		    	
				searching: true,
				destroy: true,
				"scrollY":"300px",
				"scrollCollapse": true,
				"paging":false,
		        
		      
		columns: [
			      	{"data": "serialnumber", "width": "5%", "defaultContent": ""},
		            {"data": "saleDate", "width": "5%", "defaultContent": ""},
		            {"data": "cusomerName" , "width": "5%", "defaultContent": ""},
		            {"data": "billNo", "width": "5%", "defaultContent": ""},
		            {"data": "gstNumber", "width": "5%", "defaultContent": ""},
		            {"data": "hsnNumber" , "width": "5%", "defaultContent": ""},
		            {"data": "itemName", "width": "5%", "defaultContent": ""},
		            {"data": "SalePrice", "width": "5%", "defaultContent": ""},
		            {"data": "quantityCCReports", "width": "5%", "defaultContent": ""},
		            {"data": "unit", "width": "5%", "defaultContent": ""},
		            {"data": "totalAmount" , "width": "5%", "defaultContent": ""},
		            {"data": "fivePercentageGST", "width": "5%", "defaultContent": ""},
		            {"data": "twelwePercentageGST", "width": "5%", "defaultContent": ""},
		            {"data": "eighteenPercentageGST" , "width": "5%", "defaultContent": ""},
		            {"data": "twentyEightPercentageGST", "width": "5%", "defaultContent": ""},
		            {"data": "totalTaxAmount" , "width": "5%", "defaultContent": ""},
		            {"data": "netAmount" , "width": "5%", "defaultContent": ""}
		            
		        ],
		        
		        dom : 'Bfrtip',
		        buttons : [

		          {	extend: 'print',
		        	    orientation: 'landscape',
		        	   	title: 'GST Wise Sale Reports\nProduct Category = '+proValue+'\nFrom = '+startDate+' To '+endDate,
		        	   	footer:true,
		        	   	pageSize: 'LEGAL' },
		           
		           { 	extend: 'copyHtml5',
		                orientation: 'landscape',
		        	   	title: 'GST Wise Sale Reports\nProduct Category = '+proValue+'\nFrom = '+startDate+' To '+endDate,
		        	   	footer:true,
		                pageSize: 'LEGAL' },

		           { 	extend: 'excelHtml5',
		                orientation: 'landscape',
		        	   	title: 'GST Wise Sale Reports\nProduct Category = '+proValue+'\nFrom = '+startDate+' To '+endDate,
		        	   	messageTop:'GST Wise Sale Reports\nProduct Category = '+proValue+'\nFrom = '+startDate+' To '+endDate,
		                footer:true,
		                pageSize: 'LEGAL' },
		                
		           { 	extend: 'csvHtml5',
		                orientation: 'landscape',
		        	   	title: 'GST Wise Sale Reports\nProduct Category = '+proValue+'\nFrom = '+startDate+' To '+endDate,
		        	   	footer:true,
		                pageSize: 'LEGAL' },
		           
		           
		         //{ extend: 'copyHtml5', footer: true },
		         //{ extend: 'excelHtml5', footer: true },
		         //{ extend: 'csvHtml5', footer: true },
		                
		                { extend: 'pdfHtml5',
		                orientation: 'landscape',
		        	   	title: 'GST Wise Sale Reports\nProduct Category = '+proValue+'\nFrom = '+startDate+' To '+endDate,
		                footer:true,
		                pageSize: 'LEGAL' } ]
		        
		        
		    } );
		
		} );
		
	var mydata = catmap;
	$('#gstSale').dataTable().fnAddData(mydata);
	
		}
	);
}

/*NON-GST wise Sale Report*/
function nongstWiseSaleReportValidation(){

	if(document.nongst.nongstFisDate.value == "")
	{
		var msg="Please Select Start Date";
		var dialog = bootbox.dialog({
	    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
	    closeButton: false
		});			
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		return false;
	}
	
	if(document.nongst.nongstEndDate.value == "")
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
	if(document.nongst.fk_cat_id_for_nonGST.value == "")
	{
		var msg="Please Select Category";
		var dialog = bootbox.dialog({
	    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
	    closeButton: false
		});			
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		return false;
	}
	nonGSTWiseSaleReport();
}

function nonGSTWiseSaleReport(){


	var params= {};
	var input1 = document.getElementById('fk_cat_id_for_nonGST'),
	list = document.getElementById('cat_drop_For_nonGST'),
	i,fk_cat_id;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input1.value) {
			fk_cat_id = list.options[i].getAttribute('data-value');
		}
	}
	var startDate = $("#nongstFisDate").val();
	var endDate = $("#nongstEndDate").val();
	var proValue = $("fk_cat_id_for_nonGST").val();
	
	params["fk_cat_id"]= fk_cat_id;
	params["startDate"]= startDate;
	params["endDate"]= endDate;
	
	params["methodName"] = "getSaleDetailsAsPernonGST";

	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
			{
		
		//$('#nongstSale').dataTable().fnClearTable();
		
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		
		if(catmap == null || catmap == "")
		{
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
		 var total =   $('#nongstSale').DataTable( {
			 
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
			 
			            // Total over all pages
			           
			            //for item Rate total
			           
		 			pageTotal = api
			                .column(11 )
			                .data()
			                .reduce( function (a, b) {
			                    return intVal(a) + intVal(b);
			                }, 0 );
			 
			            // Update footer
			            $( api.column( 11 ).footer() ).html(
			            		
			              parseFloat(pageTotal).toFixed(2)
			               
			            );
			            //console.log( pageTotal);
		            
			            // Quantity total
			            /*				            pageTotal = api
		                .column( 12 )
		                .data()
		                .reduce( function (a, b) {
		                    return intVal(a) + intVal(b);
		                }, 0 );
		 
		            // Update footer
		            $( api.column( 12 ).footer() ).html(
		            		
		              parseFloat(pageTotal).toFixed(2)
		               
		            );
		            console.log( pageTotal);
		            
		            // Quantity total
		            pageTotal = api
	                .column( 13 )
	                .data()
	                .reduce( function (a, b) {
	                    return intVal(a) + intVal(b);
	                }, 0 );
	 
	            // Update footer
	            $( api.column( 13 ).footer() ).html(
	            		
	              parseFloat(pageTotal).toFixed(2)
	               
	            );
	            console.log( pageTotal);
	            
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

// Quantity total
pageTotal = api
.column( 16 )
.data()
.reduce( function (a, b) {
return intVal(a) + intVal(b);
}, 0 );

// Update footer
$( api.column( 16 ).footer() ).html(

parseFloat(pageTotal).toFixed(2)

);*/
},    
		    	
		    	destroy: true,
		        searching: false,
		        "scrollY": 300,
		        "scrollX": true,
		        "paging":   false,
		        
		      
		columns: [
			      	{"data": "serialnumber", "width": "5%", "defaultContent": ""},
		            {"data": "saleDate", "width": "5%", "defaultContent": ""},
		            {"data": "cusomerName" , "width": "5%", "defaultContent": ""},
		            {"data": "billNo", "width": "5%", "defaultContent": ""},
		            {"data": "gstNumber", "width": "5%", "defaultContent": ""},
		            {"data": "hsnNumber" , "width": "5%", "defaultContent": ""},
		            {"data": "itemName", "width": "5%", "defaultContent": ""},
		            {"data": "SalePrice", "width": "5%", "defaultContent": ""},
		            {"data": "quantityCCReports", "width": "5%", "defaultContent": ""},
		            {"data": "unit", "width": "5%", "defaultContent": ""},
		            {"data": "taxPerc", "width": "5%", "defaultContent": ""},
		            {"data": "totalAmount" , "width": "5%", "defaultContent": ""},
		            /*{"data": "fivePercentageGST", "width": "5%", "defaultContent": ""},
		            {"data": "twelwePercentageGST", "width": "5%", "defaultContent": ""},
		            {"data": "eighteenPercentageGST" , "width": "5%", "defaultContent": ""},
		            {"data": "twentyEightPercentageGST", "width": "5%", "defaultContent": ""},
		            {"data": "totalTaxAmount" , "width": "5%", "defaultContent": ""},
		            {"data": "netAmount" , "width": "5%", "defaultContent": ""}*/
		            
		        ],
		       /* dom: 'Bfrtip',
	            buttons: [
	                'copy', 'csv', 'excel', 'pdf', 'print'
	            ]*/
		        
		        
		        dom : 'Bfrtip',
		        buttons : [
		           //'print',

		          {	extend: 'print',
		        	    orientation: 'landscape',
		        	   	title: 'Non-GST Wise Sale Reports\nProduct Category = '+proValue+'\nFrom = '+startDate+' To '+endDate,
		        	   	footer:true,
		        	   	pageSize: 'LEGAL' },
		           
		           { 	extend: 'copyHtml5',
		                orientation: 'landscape',
		        	   	title: 'Non-GST Wise Sale Reports\nProduct Category = '+proValue+'\nFrom = '+startDate+' To '+endDate,
		        	   	footer:true,
		                pageSize: 'LEGAL' },

		           { 	extend: 'excelHtml5',
		                orientation: 'landscape',
		        	   	title: 'Non-GST Wise Sale Reports\nProduct Category = '+proValue+'\nFrom = '+startDate+' To '+endDate,
		        	   	messageTop:'Non-GST Wise Sale Reports\nProduct Category = '+proValue+'\nFrom = '+startDate+' To '+endDate,
		                footer:true,
		                pageSize: 'LEGAL' },
		                
		           { 	extend: 'csvHtml5',
		                orientation: 'landscape',
		        	   	title: 'Non-GST Wise Sale Reports\nProduct Category = '+proValue+'\nFrom = '+startDate+' To '+endDate,
		        	   	footer:true,
		                pageSize: 'LEGAL' },
		           
		           
		         //{ extend: 'copyHtml5', footer: true },
		         //{ extend: 'excelHtml5', footer: true },
		         //{ extend: 'csvHtml5', footer: true },
		                
		                { extend: 'pdfHtml5',
		                orientation: 'landscape',
		        	   	title: 'Non-GST Wise Sale Reports\nProduct Category = '+proValue+'\nFrom = '+startDate+' To '+endDate,
		                footer:true,
		                pageSize: 'LEGAL' } ]
		        
		        
		    } );
		
		} );
		
	var mydata = catmap;
	$('#nongstSale').dataTable().fnAddData(mydata);
	
		}
	);

}

function creditCustomerSaleReportBillAndNameWiseValidation()
{
	var creditCustBillAndName = document.creditCustomerSaleReportSingleDateForm.creditCustBillId.value;
	var fDateCrteditCustSingleDate = document.creditCustomerSaleReportSingleDateForm.fDateCrteditCustSingleDate.value;
	
	if(creditCustBillAndName == "")
	{
		var msg="Please Select Credit Customer Name";
		var dialog = bootbox.dialog({
	    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
	    closeButton: false
		});			
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		return false;
	}
	
	if(fDateCrteditCustSingleDate == "")
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
	}
	
	creditCustomerSaleReportBillAndNameWise();
}

function creditCustomerSaleReportBillAndNameWise()
{
	var creditCustBillAndName = document.creditCustomerSaleReportSingleDateForm.creditCustBillId.value;
	var splitFields = creditCustBillAndName.split(" ");
	var ccName = splitFields[3]+" "+splitFields[4];
	
	var params= {};

	var input1 = document.getElementById('creditCustBillId'),
	list = document.getElementById('creditCustDrop'),
	i,creditCustBillNo;
	for (i = 0; i < list.options.length; ++i)
	{
		if (list.options[i].value === input1.value)
		{
			creditCustBillNo = list.options[i].getAttribute('data-value');
		}
	}
	
	var creditCustBillNo = creditCustBillNo;
	
	params["creditCustBillNo"]= creditCustBillNo;
	params["methodName"] = "creditCustomerSaleReportBillAndNameWise";

	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
			{
		
		$('#creditCustSaleReportSingledate').dataTable().fnClearTable();
		
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		
		if(catmap == null || catmap == "")
		{
			alert("Sale Reports are Not Available for\nBill no: = "+creditCustBillNo);
			return false;
		}
		$(document).ready(function() {
		    
		} );
		
		
		$(document).ready(function() {
		 var total =   $('#creditCustSaleReportSingledate').DataTable( {
			 

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
				            
				            pageTotal = api
			                .column( 7 )
			                .data()
			                .reduce( function (a, b) {
			                    return intVal(a) + intVal(b);
			                }, 0 );
			 
			            // Update footer
			            $( api.column( 7 ).footer() ).html(
			            		
			              parseFloat(pageTotal).toFixed(2)
			               
			            );
			            console.log( pageTotal);
				            
				            pageTotal = api
			                .column( 8 )
			                .data()
			                .reduce( function (a, b) {
			                    return intVal(a) + intVal(b);
			                }, 0 );
			 
			            // Update footer
			            $( api.column( 8 ).footer() ).html(
			            		
			              parseFloat(pageTotal).toFixed(2)
			               
			            );
			            console.log( pageTotal);
				            
				            
				            pageTotal = api
				                .column( 9 )
				                .data()
				                .reduce( function (a, b) {
				                    return intVal(a) + intVal(b);
				                }, 0 );
				 
				            // Update footer
				            $( api.column( 9 ).footer() ).html(
				            		
				              parseFloat(pageTotal).toFixed(2)
				               
				            );
				            console.log( pageTotal);
				            
				            pageTotal = api
			                .column( 10 )
			                .data()
			                .reduce( function (a, b) {
			                    return intVal(a) + intVal(b);
			                }, 0 );
			 
			            // Update footer
			            $( api.column( 10 ).footer() ).html(
			            		
			              parseFloat(pageTotal).toFixed(2)
			               
			            );
			            console.log( pageTotal);
			            
			            pageTotal = api
		                .column( 11 )
		                .data()
		                .reduce( function (a, b) {
		                    return intVal(a) + intVal(b);
		                }, 0 );
		 
		            // Update footer
		            $( api.column( 11 ).footer() ).html(
		            		
		              parseFloat(pageTotal).toFixed(2)
		               
		            );
		            console.log( pageTotal);
				            
			            },
			    
			    	
			    	destroy: true,
			        searching: true,
			      
			columns: [
			          	{"data": "customerBill", "width": "5%"},
			            {"data": "itemName", "width": "5%"},
			            {"data": "soldDate", "width": "10%"},
			            {"data": "SalePrice" , "width": "5%"},		            
			           /* {"data": "kg" , "width": "5%"},
			            {"data": "grams" , "width": "5%"},
			            {"data": "ltr" , "width": "5%"},
			            {"data": "mili" , "width": "5%"},		*/            
			            {"data": "quantityCCReports" , "width": "5%"},
			            {"data": "unit" , "width": "5%"},	
			            {"data": "tax", "width": "3%"},
			            {"data": "taxAmnt", "width": "5%"},
			            {"data": "discountAmount", "width": "5%"},
			            {"data": "hamaliexpense" , "width": "5%"},
			            {"data": "totalAmount" , "width": "5%"},
			            {"data": "paidAmount" , "width": "5%"}
			        ],
			        
			        /*dom: 'Bfrtip',
		            buttons: [
		                'copy', 'csv', 'excel', 'pdf', 'print'
		            ]*/
			        dom : 'Bfrtip',
					buttons : [
					           //'print',
					           				           
					           {	extend: 'print',
					        	    orientation: 'landscape',
					        	   	title: 'Credit Customer Bill No Wise Sale Reports \nBill No = '+creditCustBillNo+'\nCredit Customer Name = '+ccName,
					        	   	footer:true,
					        	   	pageSize: 'LEGAL' },
					           
				               { 	extend: 'copyHtml5',
					                orientation: 'landscape',
					        	   	title: 'Credit Customer Bill No Wise Sale Reports \nBill No = '+creditCustBillNo+'\nCredit Customer Name = '+ccName,
					                footer:true,
					                pageSize: 'LEGAL' },

					           { 	extend: 'excelHtml5',
					                orientation: 'landscape',
					        	   	title: 'Credit Customer Bill No Wise Sale Reports \nBill No = '+creditCustBillNo+'\nCredit Customer Name = '+ccName,
					                messageTop: 'Credit Customer Bill No Wise Sale Reports \nBill No = '+creditCustBillNo+'\nCredit Customer Name = '+ccName,
					                footer:true,
					                pageSize: 'LEGAL' },
					                
					           { 	extend: 'csvHtml5',
					                orientation: 'landscape',
					        	   	title: 'Credit Customer Bill No Wise Sale Reports \nBill No = '+creditCustBillNo+'\nCredit Customer Name = '+ccName,
					                footer:true,
					                pageSize: 'LEGAL' },
					           
					           
							 //{ extend: 'copyHtml5', footer: true },
							 //{ extend: 'excelHtml5', footer: true },
							 //{ extend: 'csvHtml5', footer: true },
					                
					                { extend: 'pdfHtml5',
					                orientation: 'landscape',
					        	   	title: 'Credit Customer Bill No Wise Sale Reports \nBill No = '+creditCustBillNo+'\nCredit Customer Name = '+ccName,
					                footer:true,
					                pageSize: 'LEGAL' }
					              
					         ],
					         "scrollY": 200,
						        "scrollX": true,
						        "paging":  false,
			    } );
			
			} );
			
		var mydata = catmap;
		$('#creditCustSaleReportSingledate').dataTable().fnAddData(mydata);
		
			}
		

		);
}
	
	function saleGSTReturnReportValidation()
	{
		var saleGstFisDate1 = $('#saleGstFisDate1').val();
		var saleGstEndDate1 = $('#saleGstEndDate1').val();
		
		if(saleGstFisDate1 == "")
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
		if(saleGstEndDate1 == "")
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
		
		saleGSTReturnReport();

	}
	
	function saleGSTReturnReport()
	{

	var params= {};
	var gstFisDate1 = $('#saleGstFisDate1').val();
	var gstEndDate1 = $('#saleGstEndDate1').val();

	
	params["gstFisDate1"]= gstFisDate1;
	params["gstEndDate1"]= gstEndDate1;
	
	params["methodName"] = "saleGSTReturnReport";

	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
{
		
		$('#gstSummary').dataTable().fnClearTable();
		
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		
		if(catmap == null)
		{
			alert("Sale GST Return Report Are Not Available \nFrom = "+gstFisDate1+" To "+gstEndDate1);
		}
		
		$(document).ready(function() {
		 var total =   $('#gstSummary').DataTable( {
			 
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
			            
			            pageTotal = api
		                .column( 1 )
		                .data()
		                .reduce( function (a, b) {
		                    return intVal(a) + intVal(b);
		                }, 0 );
		 
		            // Update footer
		            $( api.column( 1 ).footer() ).html(
		            		
		              parseFloat(pageTotal).toFixed(2)
		               
		            );
		            console.log( pageTotal);
			 
			            pageTotal = api
		                .column( 2 )
		                .data()
		                .reduce( function (a, b) {
		                    return intVal(a) + intVal(b);
		                }, 0 );
		 
		            // Update footer
		            $( api.column( 2 ).footer() ).html(
		            		
		              parseFloat(pageTotal).toFixed(2)
		               
		            );
		            console.log( pageTotal);
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
		            
		        },
		    	    	
		    	destroy: true,
		        searching: true,
		        scrollX: true,
		        scrollY: 300,
		      
		columns: [
		       			
					{"data": "taxPerc" , "width": "5%"},
		            {"data": "totalAmount", "width": "5%"},
		            {"data": "sgstAmnt", "width": "5%"},
		            {"data": "cgstAmnt", "width": "5%"},
		            {"data": "totalTaxAmount" , "width": "5%"}
			
		        ],
		        dom: 'Bfrtip',
	            buttons: [
	            	 {	extend: 'print',
			        	    orientation: 'landscape',
			        	   	title: 'Sale GST Return Reports \nFrom = '+gstFisDate1+' To '+gstEndDate1,
			        	   	footer:true,
			        	   	pageSize: 'LEGAL' },
			           
		               { 	extend: 'copyHtml5',
			                orientation: 'landscape',
			        	   	title: 'Sale GST Return Reports \nFrom = '+gstFisDate1+' To '+gstEndDate1,
			                footer:true,
			                pageSize: 'LEGAL' },

			           { 	extend: 'excelHtml5',
			                orientation: 'landscape',
			        	   	title: 'Sale GST Return Reports \nFrom = '+gstFisDate1+' To '+gstEndDate1,
			                messageTop: 'Sale GST Return Reports \nFrom = '+gstFisDate1+' To '+gstEndDate1,
			                footer:true,
			                pageSize: 'LEGAL' },
			                
			           { 	extend: 'csvHtml5',
			                orientation: 'landscape',
			        	   	title: 'Sale GST Return Reports \nFrom = '+gstFisDate1+' To '+gstEndDate1,
			                footer:true,
			                pageSize: 'LEGAL' },
			           
			           
					 //{ extend: 'copyHtml5', footer: true },
					 //{ extend: 'excelHtml5', footer: true },
					 //{ extend: 'csvHtml5', footer: true },
			                
			                { extend: 'pdfHtml5',
			                orientation: 'landscape',
			        	   	title: 'Sale GST Return Reports \nFrom = '+gstFisDate1+' To '+gstEndDate1,
			                footer:true,
			                pageSize: 'LEGAL' }		              
	            ]
		        
		    } );
		} );
		
	var mydata = catmap;
	$('#gstSummary').dataTable().fnAddData(mydata);
	
		}
	);	
}
	
function billWiseSaleReportGrossTotalValidation()
{
	var fisDateForBillReport = $('#fisDateForBillReport').val();
	var endDateForBillReport = $('#endDateForBillReport').val();
	
	if(fisDateForBillReport == "")
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
	if(endDateForBillReport == "")
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
	billWiseSaleReportForGrossTotal();
}

//CASh CUSTOMER SALE REPORTS

function cashCustomerSaleReportBillAndNameWiseValidation()
{
	var cashCustBillId = $("#cashCustBillId").val();
	
	if(cashCustBillId == "")
	{
		var msg="Please Enter Cash Customer Bill no And Name";
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
	
	cashCustomerSaleReportBillAndNameWise();
}

function cashCustomerSaleReportBillAndNameWise()
{
	var cashCustBillId = $("#cashCustBillId").val();
	var splitFields = cashCustBillId.split(" ");
	var ccName = splitFields[3]+" "+splitFields[4];
	
	var params= {};

	var input1 = document.getElementById('cashCustBillId'),
	list = document.getElementById('cashCustDrop'),
	i,cashCustBillNo;
	for (i = 0; i < list.options.length; ++i)
	{
		if (list.options[i].value === input1.value)
		{
			cashCustBillNo = list.options[i].getAttribute('data-value');
		}
	}
	
	var cashCustBillNo = cashCustBillNo;
	
	params["cashCustBillNo"]= cashCustBillNo;
	params["methodName"] = "cashCustomerSaleReportBillAndNameWise";

	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
	{		
		$('#cashCustSaleReportSingledate').dataTable().fnClearTable();
		
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		
		if(catmap == null || catmap == "")
		{
			alert("Sale Reports are Not Available for\nBill no: = "+cashCustBillNo);
			return false;
		}
		$(document).ready(function() {
		    
		} );
		
		
		$(document).ready(function() {
		 var total =   $('#cashCustSaleReportSingledate').DataTable( {
			 

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
				            
				            pageTotal = api
			                .column( 7 )
			                .data()
			                .reduce( function (a, b) {
			                    return intVal(a) + intVal(b);
			                }, 0 );
			 
			            // Update footer
			            $( api.column( 7 ).footer() ).html(
			            		
			              parseFloat(pageTotal).toFixed(2)
			               
			            );
			            console.log( pageTotal);
				            
				            pageTotal = api
			                .column( 8 )
			                .data()
			                .reduce( function (a, b) {
			                    return intVal(a) + intVal(b);
			                }, 0 );
			 
			            // Update footer
			            $( api.column( 8 ).footer() ).html(
			            		
			              parseFloat(pageTotal).toFixed(2)
			               
			            );
			            console.log( pageTotal);
				            
				            
				            pageTotal = api
				                .column( 9 )
				                .data()
				                .reduce( function (a, b) {
				                    return intVal(a) + intVal(b);
				                }, 0 );
				 
				            // Update footer
				            $( api.column( 9 ).footer() ).html(
				            		
				              parseFloat(pageTotal).toFixed(2)
				               
				            );
				            console.log( pageTotal);
				            
				            pageTotal = api
			                .column( 10 )
			                .data()
			                .reduce( function (a, b) {
			                    return intVal(a) + intVal(b);
			                }, 0 );
			 
			            // Update footer
			            $( api.column( 10 ).footer() ).html(
			            		
			              parseFloat(pageTotal).toFixed(2)
			               
			            );
			            console.log( pageTotal);
			            
			            pageTotal = api
		                .column( 11 )
		                .data()
		                .reduce( function (a, b) {
		                    return intVal(a) + intVal(b);
		                }, 0 );
		 
		            // Update footer
		            $( api.column( 11 ).footer() ).html(
		            		
		              parseFloat(pageTotal).toFixed(2)
		               
		            );
		            console.log( pageTotal);
				            
			            },
			    
			    	
			    	destroy: true,
			        searching: true,
			      
			columns: [
			          	{"data": "customerBill", "width": "5%"},
			            {"data": "itemName", "width": "5%"},
			            {"data": "soldDate", "width": "10%"},
			            {"data": "SalePrice" , "width": "5%"},		            
			           /* {"data": "kg" , "width": "5%"},
			            {"data": "grams" , "width": "5%"},
			            {"data": "ltr" , "width": "5%"},
			            {"data": "mili" , "width": "5%"},		*/            
			            {"data": "quantityCCReports" , "width": "5%"},
			            {"data": "unit" , "width": "5%"},	
			            {"data": "tax", "width": "3%"},
			            {"data": "taxAmnt", "width": "5%"},
			            {"data": "discountAmount", "width": "5%"},
			            {"data": "hamaliexpense" , "width": "5%"},
			            {"data": "totalAmount" , "width": "5%"},
			            {"data": "paidAmount" , "width": "5%"}
			        ],
			        
			        /*dom: 'Bfrtip',
		            buttons: [
		                'copy', 'csv', 'excel', 'pdf', 'print'
		            ]*/
			        dom : 'Bfrtip',
					buttons : [
					           //'print',
					           				           
					           {	extend: 'print',
					        	    orientation: 'landscape',
					        	   	title: 'Credit Customer Bill No Wise Sale Reports \nBill No = '+cashCustBillNo+'\nCredit Customer Name = '+ccName,
					        	   	footer:true,
					        	   	pageSize: 'LEGAL' },
					           
				               { 	extend: 'copyHtml5',
					                orientation: 'landscape',
					        	   	title: 'Credit Customer Bill No Wise Sale Reports \nBill No = '+cashCustBillNo+'\nCredit Customer Name = '+ccName,
					                footer:true,
					                pageSize: 'LEGAL' },

					           { 	extend: 'excelHtml5',
					                orientation: 'landscape',
					        	   	title: 'Credit Customer Bill No Wise Sale Reports \nBill No = '+cashCustBillNo+'\nCredit Customer Name = '+ccName,
					                messageTop: 'Credit Customer Bill No Wise Sale Reports \nBill No = '+cashCustBillNo+'\nCredit Customer Name = '+ccName,
					                footer:true,
					                pageSize: 'LEGAL' },
					                
					           { 	extend: 'csvHtml5',
					                orientation: 'landscape',
					        	   	title: 'Credit Customer Bill No Wise Sale Reports \nBill No = '+cashCustBillNo+'\nCredit Customer Name = '+ccName,
					                footer:true,
					                pageSize: 'LEGAL' },
					           
					           
							 //{ extend: 'copyHtml5', footer: true },
							 //{ extend: 'excelHtml5', footer: true },
							 //{ extend: 'csvHtml5', footer: true },
					                
					                { extend: 'pdfHtml5',
					                orientation: 'landscape',
					        	   	title: 'Credit Customer Bill No Wise Sale Reports \nBill No = '+cashCustBillNo+'\nCredit Customer Name = '+ccName,
					                footer:true,
					                pageSize: 'LEGAL' }
					              
					         ],
					         "scrollY": 200,
						        "scrollX": true,
						        "paging":  false,
			    } );
			
			} );
			
		var mydata = catmap;
		$('#cashCustSaleReportSingledate').dataTable().fnAddData(mydata);
		
			}
		

		);
}



function billWiseSaleReportForGrossTotal()
{
	var params= {};
	var gstFisDate1 = $('#fisDateForBillReport').val();
	var gstEndDate1 = $('#endDateForBillReport').val();

	
	params["gstFisDate1"]= gstFisDate1;
	params["gstEndDate1"]= gstEndDate1;
	
	params["methodName"] = "billWiseSaleReportForGrossTotal";

	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
{
		
		$('#rangeWiseBillReportDataTable').dataTable().fnClearTable();
		
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		
		if(catmap == null)
		{
			alert("Bill Wise Sale Reports are Not Available \nFrom"+gstFisDate1+" To "+gstEndDate1);
		}
		
		$(document).ready(function() {
		 var total =   $('#rangeWiseBillReportDataTable').DataTable( {
			 
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
			            
			         			 
			            pageTotal = api
		                .column( 2 )
		                .data()
		                .reduce( function (a, b) {
		                    return intVal(a) + intVal(b);
		                }, 0 );
		 
		            // Update footer
		            $( api.column( 2 ).footer() ).html(
		            		
		              parseFloat(pageTotal).toFixed(2)
		               
		            );
		            
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
		             
		        },
		        searching: true,
		        destroy: true,
		        "scrollY":"300px",
		        "scrollCollapse": true,
		        "paging":false,
		       		      
		columns: [
		       			
					{"data": "billNo" , "width": "5%"},
					{"data": "name", "width": "5%"},
					{"data": "totalAmount", "width": "5%"},
					{"data": "paidAmount", "width": "5%"},
					{"data": "PaymentPending", "width": "5%"},
					{"data": "saleDate", "width": "5%"},
		        ],
		        dom: 'Bfrtip',
	            buttons: [
	            	 {	extend: 'print',
			        	    orientation: 'landscape',
			        	   	title: 'Bill Wise Sale Reports \nFrom = '+gstFisDate1+' To '+gstEndDate1,
			        	   	footer:true,
			        	   	pageSize: 'LEGAL' },
			           
		               { 	extend: 'copyHtml5',
			                orientation: 'landscape',
			        	   	title: 'Bill Wise Sale Reports \nFrom = '+gstFisDate1+' To '+gstEndDate1,
			                footer:true,
			                pageSize: 'LEGAL' },

			           { 	extend: 'excelHtml5',
			                orientation: 'landscape',
			        	   	title: 'Bill Wise Sale Reports \nFrom = '+gstFisDate1+' To '+gstEndDate1,
			                messageTop: 'Bill Wise Sale Reports \nFrom = '+gstFisDate1+' To '+gstEndDate1,
			                footer:true,
			                pageSize: 'LEGAL' },
			                
			           { 	extend: 'csvHtml5',
			                orientation: 'landscape',
			        	   	title: 'Bill Wise Sale Reports \nFrom = '+gstFisDate1+' To '+gstEndDate1,
			                footer:true,
			                pageSize: 'LEGAL' },
			           
			           
					 //{ extend: 'copyHtml5', footer: true },
					 //{ extend: 'excelHtml5', footer: true },
					 //{ extend: 'csvHtml5', footer: true },
			                
			                { extend: 'pdfHtml5',
			                orientation: 'landscape',
			        	   	title: 'Bill Wise Sale Reports \nFrom = '+gstFisDate1+' To '+gstEndDate1,
			                footer:true,
			                pageSize: 'LEGAL' }		              
	            ]
		        
		    } );
		} );
		
	var mydata = catmap;
	$('#rangeWiseBillReportDataTable').dataTable().fnAddData(mydata);
	
		}
	);	
}


/*Payment Mode wise Sale report for two dates */
function rangeAndPaymentModeWiseValidation()
{
	var fisDateForPay4 = $("#fisDateForPay4").val();
	var endDateForPay4 = $("#endDateForPay4").val();
	var paymentModeId4 = $("#paymentModeId4").val();
	
	
	if(fisDateForPay4 == "")
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
	
	if(endDateForPay4 == "")
	{
		var msg="Please Select Second Date";
		var dialog = bootbox.dialog({
	    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
	    closeButton: false
		});			
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		return false;
	}
	if(paymentModeId4 == "")
	{
		var msg="Please Select Payment Mode";
		var dialog = bootbox.dialog({
	    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
	    closeButton: false
		});			
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		return false;
	}
	rangeAndPaymentModeWise();
}

function rangeAndPaymentModeWise()
{
/*	 var startdate = $("#fisDateForPay").val();
	 var enddate = $("#endDateForPay").val();
	 var category = $("#fk_cat_id_for_payment_mode_two").val();*/
	 
	 var fisDateForPay4 = $("#fisDateForPay4").val();
	 var endDateForPay4 = $("#endDateForPay4").val();
	 var paymentModeId4 = $("#paymentModeId4").val();
	 

	var params= {};
	/*var input1 = document.getElementById('fk_cat_id_for_payment_mode_two'),
	list = document.getElementById('cat_drop_For_payment_mode_two'),
	i,fk_cat_id;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input1.value) {
			fk_cat_id = list.options[i].getAttribute('data-value');
		}
	}*/
	/*var fDateForPaymentMode = $("#fisDateForPay").val(); 
	var secondDateForPaymentMode = $("#endDateForPay").val(); */
	params["fisDateForPay4"]= fisDateForPay4;
	params["endDateForPay4"]= endDateForPay4;
	params["paymentModeId4"]= paymentModeId4;
	params["methodName"] = "getSaleDetailsAsPerPaymentModeForRanges";

	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
			{
		
		$('#rangeWisePaymentTypePaymentModeDataTable').dataTable().fnClearTable();
		
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		
		if(catmap == null || catmap == "")
		{
			//alert(catmap)
			alert("Sale Reports are Not Available for\nPayment Mode = "+paymentModeId4+"\nStart Date = "+fisDateForPay4+"\nEnd Date = "+endDateForPay4);
			return false;
		}
		
		/*$(document).ready(function() {
		    
		} );
		*/
		
		$(document).ready(function() {
		 var total =   $('#rangeWisePaymentTypePaymentModeDataTable').DataTable( {
			 

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
			 
			            // Total over all pages
			            /* total = api
			                .column( 6 )
			                .data()
			                .reduce( function (a, b) {
			                    return intVal(a) + intVal(b);
			                }, 0 ); 
			 			console.log(total); */
			            // Total over this page
			            //cash total
/*			            pageTotal = api
			                .column( 2 )
			                .data()
			                .reduce( function (a, b) {
			                    return intVal(a) + intVal(b);
			                }, 0 );
			 
			            // Update footer
			            $( api.column( 2 ).footer() ).html(
			            		
			              parseFloat(pageTotal).toFixed(2)
			               
			            );
			            console.log( pageTotal);
			            //cheque total
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
		            //NEFT total
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
		            
	            //Card Total
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
            */
		        },
		    
		    	
		    	destroy: true,
		        searching: false,
		        
		        
		      
		columns: [
		          	{"data": "customerBill", "width": "5%"},
		          	{"data": "totalAmount", "width": "5%"},
		            {"data": "cashAmount", "width": "5%"},
		            {"data": "chequeAmount" , "width": "5%"},
		            {"data": "neftAmount", "width": "5%"},
		            {"data": "cardAmount" , "width": "5%"}
		        ],
		        /*dom: 'Bfrtip',
	            buttons: [
	                'copy', 'csv', 'excel', 'pdf', 'print'
	            ]*/
		        
		        dom : 'Bfrtip',
		        buttons : [
		           //'print',
		           				           
		           {	extend: 'print',
		        	    orientation: 'landscape',
		        	   	title: 'Payment Mode Wise Sale Reports\nPayment Mode = '+paymentModeId4+'\nFrom '+fisDateForPay4+' To '+endDateForPay4,
		        	   	footer:true,
		        	   	pageSize: 'LEGAL' },
		           
		           { 	extend: 'copyHtml5',
		                orientation: 'landscape',
		        	   	title: 'Payment Mode Wise Sale Reports\nPayment Mode = '+paymentModeId4+'\nFrom '+fisDateForPay4+' To '+endDateForPay4,

		        	   	footer:true,
		                pageSize: 'LEGAL' },

		           { 	extend: 'excelHtml5',
		                orientation: 'landscape',
		        	   	title: 'Payment Mode Wise Sale Reports\nPayment Mode = '+paymentModeId4+'\nFrom '+fisDateForPay4+' To '+endDateForPay4,
		        	   	messageTop:'Payment Mode Wise Sale Reports\nPayment Mode = '+paymentModeId4+'\nFrom '+fisDateForPay4+' To '+endDateForPay4,

		                footer:true,
		                pageSize: 'LEGAL' },
		                
		           { 	extend: 'csvHtml5',
		                orientation: 'landscape',
		        	   	title: 'Payment Mode Wise Sale Reports\nPayment Mode = '+paymentModeId4+'\nFrom '+fisDateForPay4+' To '+endDateForPay4,
		        	   	footer:true,
		                pageSize: 'LEGAL' },
		           
		           
		         //{ extend: 'copyHtml5', footer: true },
		         //{ extend: 'excelHtml5', footer: true },
		         //{ extend: 'csvHtml5', footer: true },
		                
		                { extend: 'pdfHtml5',
		                orientation: 'landscape',
		        	   	title: 'Payment Mode Wise Sale Reports\nPayment Mode = '+paymentModeId4+'\nFrom '+fisDateForPay4+' To '+endDateForPay4,
		                footer:true,
		                pageSize: 'LEGAL' } ]
		        
		    } );
		
		} );
		
	var mydata = catmap;
	$('#rangeWisePaymentTypePaymentModeDataTable').dataTable().fnAddData(mydata);
	
		}
	);
}


/////////////////Sale Return Reports////////////////////////

function saleReturnReportBetweenTwoDate(){

	var params= {};
	var startDate = $("#StartDate1").val();
	var endDate = $("#EndDate1").val();
	
	if(startDate=="" || startDate==null){
		var msg="Please Enter Start Date";
		var dialog = bootbox.dialog({
	    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
	    closeButton: false
		});			
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);

		//alert("Please enter start date ");
		return false;
	}
	if(endDate=="" || endDate==null){
		var msg="Please Enter End Date";
		var dialog = bootbox.dialog({
	    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
	    closeButton: false
		});			
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		//alert("Please enter end date ");
		return false;
	}
	
	//alert("First Date--------"+startDate);
	//alert("second Date--------"+endDate);
	
	params["fisDate"]= startDate;
	params["endDate"]= endDate;
	
	params["methodName"] = "getSaleReturnReportBetweenTwoDates";

	$.post('/Shop/jsp/utility/controller.jsp', params, function(data) {

		$('#saleReturnTable').dataTable().fnClearTable();

		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		
		if(catmap == "" || catmap == null)
		{
			//alert("NO Purchase Return Report For\nStart Date = "+firstDate+"\nEnd Date = "+secondDate+"\nSupplier Name = "+fkSupplierId_Purchase_Return);
			//alert("NO Purchase Return Report For\nSupplier Name = "+fkSupplierId_Purchase_Return);
			return false;
		}

		$(document).ready(function() {
			 $('#saleReturnTable').DataTable({


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

				columns : [ 
					
					
					{"data": "productName", "width": "5%", "defaultContent":""},
				    {"data": "company", "width": "5%", "defaultContent":""},
				    {"data": "weight", "width": "5%", "defaultContent":""},
				    {"data": "salePrice" , "width": "5%", "defaultContent":""},
				    {"data": "returnQuantity" , "width": "5%", "defaultContent":""},
				    {"data": "returnDate1" , "width": "5%", "defaultContent":""},
				    {"data": "taxPercentage", "width": "5%", "defaultContent":""},
					
					
				],

				//dom : 'Bfrtip',
			    //buttons : [ 'copy', 'csv', 'excel', 'pdf', 'print' ],
				
				
				dom : 'Bfrtip',
				//buttons : [ 'copy', 'csv', 'excel', 'pdf', 'print' ],
				buttons : [
				           //'print',
				           				           
				           {	extend: 'print',
				        	    orientation: 'landscape',
				        	   	//title: 'Purchase Return Wise Purchase Report From '+firstDate+' to '+secondDate+'\n'+'Supplier Name = '+fkSupplierId_Purchase_Return,
				        	   	footer:true,
				        	   	pageSize: 'LEGAL' },
				           
			               { 	extend: 'copyHtml5',
				                orientation: 'landscape',
				        	   	//title: 'Purchase Return Wise Purchase Report From '+firstDate+' to '+secondDate+'\n'+'Supplier Name = '+fkSupplierId_Purchase_Return,
				                footer:true,
				                pageSize: 'LEGAL' },

				           { 	extend: 'excelHtml5',
				                orientation: 'landscape', 
				        	   	//title: 'Purchase Return Wise Purchase Report From '+firstDate+' to '+secondDate+'\n'+'Supplier Name = '+fkSupplierId_Purchase_Return,
				                //messageTop: 'Purchase Return Wise Purchase Report From '+firstDate+' to '+secondDate+'\n'+'Supplier Name = '+fkSupplierId_Purchase_Return,
				                footer:true,
				                pageSize: 'LEGAL' },
				                
				           { 	extend: 'csvHtml5',
				                orientation: 'landscape',
				        	   	//title: 'Purchase Return Wise Purchase Report From '+firstDate+' to '+secondDate+'\n'+'Supplier Name = '+fkSupplierId_Purchase_Return,
				                footer:true,
				                pageSize: 'LEGAL' },
				           
				               
				                
				           
						 //{ extend: 'copyHtml5', footer: true },
						 //{ extend: 'excelHtml5', footer: true },
						 //{ extend: 'csvHtml5', footer: true },
						 { extend: 'pdfHtml5',
				                orientation: 'landscape', 
				        	   	//title: 'Purchase Return Wise Purchase Report From '+firstDate+' to '+secondDate+'\n'+'Supplier Name = '+fkSupplierId_Purchase_Return,
				                //messageTop: 'Purchase Return Wise Purchase Report From '+firstDate+' to '+secondDate+'\n'+'Supplier Name = '+fkSupplierId_Purchase_Return,
				        	   	footer:true,
				                pageSize: 'LEGAL' } ]
				
				
			
			});
		});

		var mydata = catmap;
		$('#saleReturnTable').dataTable().fnAddData(mydata);

	}
);
	
	
}	

//
function billReportBetweenTwoDate(){

	var params= {};
	var startDate = $("#StartDate10").val();
	var endDate = $("#EndDate10").val();

	if(startDate=="" || startDate==null || startDate==undefined){
		var msg="Please Enter Start Date";
		var dialog = bootbox.dialog({
	    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
	    closeButton: false
		});			
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);

		//alert("Please enter start date ");
		return false;
	}
	if(endDate=="" || endDate==null || endDate==undefined){
		var msg="Please Enter End Date";
		var dialog = bootbox.dialog({
	    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
	    closeButton: false
		});			
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		
		//alert("Please enter end date ");
		return false;
	}
	billReportBetweenTwoDate1();
}
function billReportBetweenTwoDate1(){

	var params= {};
	var startDate = $("#StartDate10").val();
	var endDate = $("#EndDate10").val();
	
	//alert("First Date--------"+startDate);
	//alert("second Date--------"+endDate);
	
	params["fisDate"]= startDate;
	params["endDate"]= endDate;
	
	params["methodName"] = "billcnlReportBetweenTwoDates";

	$.post('/Shop/jsp/utility/controller.jsp', params, function(data) {

		$('#billTable').dataTable().fnClearTable();

		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		
		if(catmap == "" || catmap == null)
		{
			//alert("NO Purchase Return Report For\nStart Date = "+firstDate+"\nEnd Date = "+secondDate+"\nSupplier Name = "+fkSupplierId_Purchase_Return);
			//alert("NO Purchase Return Report For\nSupplier Name = "+fkSupplierId_Purchase_Return);
			return false;
		}

		$(document).ready(function() {
			 $('#billTable').DataTable({


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
				"scrollY": 400,
		        "scrollX": true,
		        "paging":   false,

				columns : [ 
					
					
					{"data": "sr", "width": "5%", "defaultContent":""},
				    {"data": "billNo", "width": "5%", "defaultContent":""},
				    {"data": "grossTotal", "width": "5%", "defaultContent":""},
				    {"data": "billType" , "width": "5%", "defaultContent":""},
				    {"data": "cust_type" , "width": "5%", "defaultContent":""},
				    {"data": "saleDate" , "width": "5%", "defaultContent":""},
				    {"data": "insertDate", "width": "5%", "defaultContent":""},
					
					
				],

				//dom : 'Bfrtip',
			    //buttons : [ 'copy', 'csv', 'excel', 'pdf', 'print' ],
				
				
				dom : 'Bfrtip',
				//buttons : [ 'copy', 'csv', 'excel', 'pdf', 'print' ],
				buttons : [
				           //'print',
				           				           
				           {	extend: 'print',
				        	    orientation: 'landscape',
				        	   	//title: 'Purchase Return Wise Purchase Report From '+firstDate+' to '+secondDate+'\n'+'Supplier Name = '+fkSupplierId_Purchase_Return,
				        	   	footer:true,
				        	   	pageSize: 'LEGAL' },
				           
			               { 	extend: 'copyHtml5',
				                orientation: 'landscape',
				        	   	//title: 'Purchase Return Wise Purchase Report From '+firstDate+' to '+secondDate+'\n'+'Supplier Name = '+fkSupplierId_Purchase_Return,
				                footer:true,
				                pageSize: 'LEGAL' },

				           { 	extend: 'excelHtml5',
				                orientation: 'landscape', 
				        	   	//title: 'Purchase Return Wise Purchase Report From '+firstDate+' to '+secondDate+'\n'+'Supplier Name = '+fkSupplierId_Purchase_Return,
				                //messageTop: 'Purchase Return Wise Purchase Report From '+firstDate+' to '+secondDate+'\n'+'Supplier Name = '+fkSupplierId_Purchase_Return,
				                footer:true,
				                pageSize: 'LEGAL' },
				                
				           { 	extend: 'csvHtml5',
				                orientation: 'landscape',
				        	   	//title: 'Purchase Return Wise Purchase Report From '+firstDate+' to '+secondDate+'\n'+'Supplier Name = '+fkSupplierId_Purchase_Return,
				                footer:true,
				                pageSize: 'LEGAL' },
				           
				               
				                
				           
						 //{ extend: 'copyHtml5', footer: true },
						 //{ extend: 'excelHtml5', footer: true },
						 //{ extend: 'csvHtml5', footer: true },
						 { extend: 'pdfHtml5',
				                orientation: 'landscape', 
				        	   	//title: 'Purchase Return Wise Purchase Report From '+firstDate+' to '+secondDate+'\n'+'Supplier Name = '+fkSupplierId_Purchase_Return,
				                //messageTop: 'Purchase Return Wise Purchase Report From '+firstDate+' to '+secondDate+'\n'+'Supplier Name = '+fkSupplierId_Purchase_Return,
				        	   	footer:true,
				                pageSize: 'LEGAL' } ]
				
				
			
			});
		});

		var mydata = catmap;
		$('#billTable').dataTable().fnAddData(mydata);

	}
);
	
	
}	

function allReportForSingleDate()
{

	if(document.saleReportForm22.fDate.value == "")
	{
		var msg="Please Select Date"
		var dialog = bootbox.dialog({
	    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
	    closeButton: false
		});			
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		return false;
	}
	allReportForSingleDate1();
}
function allReportsss()
{	
//	var category = $("#fk_cat_id6").val();
	var date = $("#fDate").val();
	
	var params= {};

/*	var input1 = document.getElementById('fk_cat_id6'),
	    list   = document.getElementById('cat_drop6'),
	             i,fk_cat_id;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input1.value) {
			fk_cat_id = list.options[i].getAttribute('data-value');
		}
	}*/
	
//	var fk_cat_id = fk_cat_id;
//	var fk_cat_idPDFValue = $("#fk_cat_id6").val();
	//var fDate = $("#fDate").val(); 
	
//	params["cat"]= fk_cat_id;
	params["fDate"]= fDate;
	params["methodName"] = "getallcustForSingleDate";

	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
			{
		
		$('#sale1').dataTable().fnClearTable();
		
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		
		if(catmap == null || catmap == "")
		{
			alert("Sale Reports are Not Available for\nCategory = "+category+"\nDate = "+date);
			return false;
		}
		/*$(document).ready(function() {
		    
		} );
		*/
		
		$(document).ready(function() {
		 var total =   $('#sale1').DataTable( {
			 

			    "bProcessing": true,
			    "sAutoWidth": true,
			    "bDestroy":true,
			    "sPaginationType": "bootstrap", // full_numbers
			    "iDisplayStart ": 10,
			    "iDisplayLength": 10,
			    "bPaginate": false, //hide pagination
			    //"bFilter": false, //hide Search bar
			    "bInfo": true, // hide showing entries
			 	"scrollX": true,
			 	"scrollY": 300,
			 
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
			                .column( 8 )
			                .data()
			                .reduce( function (a, b) {
			                    return intVal(a) + intVal(b);
			                }, 0 );
			 
			            // Update footer
			            $( api.column( 8 ).footer() ).html(
			            		
			              parseFloat(pageTotal).toFixed(2)
			               
			            );
			            console.log( pageTotal);
		            
		        },
		    
		    	
		    	destroy: true,
		        searching: false,
		        /*"scrollY": 300,
		        "scrollX": true,*/
		        "paging":   false,
		        
		      
		columns: [
				
		          	{"data": "customerBill", "width": "5%"},
		            {"data": "itemName", "width": "5%"},
		            {"data": "soldDate", "width": "5%"},
		            {"data": "SalePrice" , "width": "5%"},	
		            {"data": "quantityCCReports" , "width": "5%"},
		            {"data": "unit" , "width": "5%"},
		            {"data": "taxPerc", "width": "5%"},
		            {"data": "taxAmnt", "width": "5%"},
		          /*  {"data": "discountAmount", "width": "5%"},
		            {"data": "hamaliexpense", "width": "5%"},*/
		            {"data": "totalAmount" , "width": "5%"},
		        	{"data": "cusomerName", "width": "5%"},
		            {"data": "billingtype" , "width": "5%"},
		            {"data": "email" , "width": "5%"}
		        ],
		        
		        /*dom: 'Bfrtip',
	            buttons: [
	                'copy', 'csv', 'excel', 'pdf', 'print'
	            ]*/
		        dom : 'Bfrtip',
				buttons : [
				           //'print',
				           				           
				           {	extend: 'print',
				        	    orientation: 'landscape',
				        	   	title: 'Product Category Wise Sale Reports \nProduct Category = '+fk_cat_idPDFValue+'\n Date = '+fDate,
				        	   	footer:true,
				        	   	pageSize: 'LEGAL' },
				           
			               { 	extend: 'copyHtml5',
				                orientation: 'landscape',
				        	   	title: 'Product Category Wise Sale Reports \nProduct Category = '+fk_cat_idPDFValue+'\n Date = '+fDate,
				                footer:true,
				                pageSize: 'LEGAL' },

				           { 	extend: 'excelHtml5',
				                orientation: 'landscape',
				        	   	title: 'Product Category Wise Sale Reports \nProduct Category = '+fk_cat_idPDFValue+'\n Date = '+fDate,
				                messageTop:'Product Category Wise Sale Reports \nProduct Category = '+fk_cat_idPDFValue+'\n Date = '+fDate,
				                footer:true,
				                pageSize: 'LEGAL' },
				                
				           { 	extend: 'csvHtml5',
				                orientation: 'landscape',
				                title: 'Product Category Wise Sale Reports \nProduct Category = '+fk_cat_idPDFValue+'\n Date = '+fDate,
				                footer:true,
				                pageSize: 'LEGAL' },
				           
				           
						 //{ extend: 'copyHtml5', footer: true },
						 //{ extend: 'excelHtml5', footer: true },
						 //{ extend: 'csvHtml5', footer: true },
				                
				                { extend: 'pdfHtml5',
				                orientation: 'landscape',
				        	   	title: 'Product Category Wise Sale Reports \nProduct Category = '+fk_cat_idPDFValue+'\n Date = '+fDate,
				                footer:true,
				                pageSize: 'LEGAL' } ]
		        
		        
		    } );
		
		} );
		
	var mydata = catmap;
	$('#sale1').dataTable().fnAddData(mydata);
	
		}
	

	);

}
	
//all cust date wise
function allReportForSingleDate1()
{
	var date = $("#fDate").val();
	
	var params= {};
	
	var fDate = $("#fDate").val(); 
	
	params["fDate"]= fDate;
	params["methodName"] = "getallcustForSingleDate";

	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
			{
		
		$('#sale1').dataTable().fnClearTable();
		
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		
		if(catmap == null || catmap == "")
		{
			alert("Sale Reports are Not Available");
			return false;
		}
		
		$(document).ready(function() {
		 var total =   $('#sale1').DataTable( {
			 
		//	 "paging": false,
			 
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
			 
			            pageTotal = api
			                .column( 8 )
			                .data()
			                .reduce( function (a, b) {
			                    return intVal(a) + intVal(b);
			                }, 0 );
			 
			            // Update footer
			            $( api.column( 8 ).footer() ).html(
			            		
			              parseFloat(pageTotal).toFixed(2)
			               
			            );
			            console.log( pageTotal);
		            
		        },
		    	    	
		    	destroy: true,
		        searching: true,
		        "scrollY": 300,
		        "scrollX": true,
		        "paging":   false,
		        
		      
		columns: [
		            
		          	{"data": "customerBill", "width": "5%"},
		            {"data": "itemName", "width": "5%"},
		            {"data": "soldDate", "width": "5%"},
		            {"data": "SalePrice" , "width": "5%"},		           
		            {"data": "quantityCCReports" , "width": "5%"},
		            {"data": "unit" , "width": "5%"},
		            {"data": "tax", "width": "5%"},
		            {"data": "taxAmnt", "width": "5%"},
		            {"data": "totalAmount" , "width": "5%"},
		        	{"data": "cusomerName", "width": "5%"},
		            {"data": "billingtype" , "width": "5%"},
		            {"data": "email" , "width": "5%"}
		        ],
		        
		        dom : 'Bfrtip',
		        buttons : [
				           //'print',
				           				           
				           {	extend: 'print',
				        	    orientation: 'landscape',
				        	   	title: 'Product Category Wise Sale Reports Between 2 Dates ',
				        	   	footer:true,
				        	   	pageSize: 'LEGAL' },
				           
			               { 	extend: 'copyHtml5',
				                orientation: 'landscape',
				        	   	title: 'Product Category Wise Sale Reports Between 2 Dates ',
				                footer:true,
				                pageSize: 'LEGAL' },

				           { 	extend: 'excelHtml5',
				                orientation: 'landscape',
				        	   	title: 'Product Category Wise Sale Reports Between 2 Dates ',
				                messageTop: 'Product Category Wise Sale Reports Between 2 Dates ',
				                footer:true,
				                pageSize: 'LEGAL' },
				                
				           { 	extend: 'csvHtml5',
				                orientation: 'landscape',
				        	   	title: 'Product Category Wise Sale Reports Between 2 Dates ',
				                footer:true,
				                pageSize: 'LEGAL' },
				           
				           
						 //{ extend: 'copyHtml5', footer: true },
						 //{ extend: 'excelHtml5', footer: true },
						 //{ extend: 'csvHtml5', footer: true },
				                
				                { extend: 'pdfHtml5',
				                orientation: 'landscape',
				        	   	title: 'Product Category Wise Sale Reports Between 2 Dates ',
				                footer:true,
				                pageSize: 'LEGAL' } ]
		        
		        
		        
		    } );
		} );
		
	var mydata = catmap;
	$('#sale1').dataTable().fnAddData(mydata);
	
		}
	

	);


}



//

function packingReportBetweenTwoDates(){

	if(document.saleReportFormRange.fisDate.value == "")
	{
		var msg="Please Select Start Date";
		var dialog = bootbox.dialog({
	    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
	    closeButton: false
		});			
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		return false;
	}
	if(document.saleReportFormRange.endDate.value == "")
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
	packingReportBetweenTwoDates1();
}
function packingReportBetweenTwoDates1()
{
//	var categoryA = $("#fk_cat_id_for_payment_mode_two1").val();
	var startdateA = $("#fisDate").val();
	var enddateA = 	$("#endDate").val();

	var params= {};

	
	//alert(fk_cat_id);
//	var fk_cat_id = fk_cat_id;
	
//	var categoryPdfValue = $("#fk_cat_id_for_payment_mode_two1").val();
	var fisDate = $("#fisDate").val(); 
	var endDate = $("#endDate").val();
	
//	params["fk_cat_id"]= fk_cat_id;
	params["fisDate"]= fisDate;
	params["endDate"]= endDate;
	params["methodName"] = "getpackingBetweenTwoDates";

	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
			{
		
		$('#saleBetTwoDates').dataTable().fnClearTable();
		
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		
		if(catmap == null || catmap == "")
		{
			/*alert("Packing Reports are Not Available for \nStart Date = "+startdateA+"\nEnd Date = "+enddateA);*/
			
			var msg="Packing Reports are Not Available for ";
			var dialog = bootbox.dialog({
		    /*message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',*/
		    message: ("Packing Reports are Not Available for \nStart Date = "+startdateA+"\nEnd Date = "+enddateA),
		    closeButton: false
			});
			
			setTimeout(function() {
				dialog.modal('hide');
			}, 1500);
			return false;
			
			
			
			return false;
		}
		
		$(document).ready(function() {
		 var total =   $('#saleBetTwoDates').DataTable( {
			 
		//	 "paging": false,
			 
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
			 
			            // Total over all pages
			            /* total = api
			                .column( 6 )
			                .data()
			                .reduce( function (a, b) {
			                    return intVal(a) + intVal(b);
			                }, 0 ); 
			 			console.log(total); */
			            // Total over this page
			 /*           pageTotal = api
			                .column( 8 )
			                .data()
			                .reduce( function (a, b) {
			                    return intVal(a) + intVal(b);
			                }, 0 );
			 
			            // Update footer
			            $( api.column( 8 ).footer() ).html(
			            		
			              parseFloat(pageTotal).toFixed(2)
			               
			            );
			            console.log( pageTotal);
		            */
		        },
		    	    	
		    	destroy: true,
		        searching: true,
		        "scrollY": 300,
		        "scrollX": true,
		        "paging":   false,
		        
		      
		columns: [
		          	{"data": "productName", "width": "5%"},
		            {"data": "quantity", "width": "5%"},
		            {"data": "weight", "width": "5%"},
		            {"data": "unit" , "width": "5%"},		           
		            {"data": "date" , "width": "5%"},
		        ],
		        
		        dom : 'Bfrtip',
		        buttons : [
				           //'print',
				           				           
				           {	extend: 'print',
				        	    orientation: 'landscape',
				        	   	title: 'Packing Wise Reports Between 2 Dates \nPacking   From = '+fisDate+' to '+endDate,
				        	   	footer:true,
				        	   	pageSize: 'LEGAL' },
				           
			               { 	extend: 'copyHtml5',
				                orientation: 'landscape',
				        	   	title: 'Packing Wise Reports Between 2 Dates \nPacking  From = '+fisDate+' to '+endDate,
				                footer:true,
				                pageSize: 'LEGAL' },

				           { 	extend: 'excelHtml5',
				                orientation: 'landscape',
				        	   	title: 'Packing Wise Reports Between 2 Dates \nPacking From = '+fisDate+' to '+endDate,
				                messageTop: 'Packing Wise Reports Between 2 Dates \nPacking  From = '+fisDate+' to '+endDate,
				                footer:true,
				                pageSize: 'LEGAL' },
				                
				           { 	extend: 'csvHtml5',
				                orientation: 'landscape',
				        	   	title: 'Packing Wise Reports Between 2 Dates \nPacking From = '+fisDate+' to '+endDate,
				                footer:true,
				                pageSize: 'LEGAL' },
				           
				           
						 //{ extend: 'copyHtml5', footer: true },
						 //{ extend: 'excelHtml5', footer: true },
						 //{ extend: 'csvHtml5', footer: true },
				                
				                { extend: 'pdfHtml5',
				                orientation: 'landscape',
				        	   	title: 'Packing Wise Reports Between 2 Dates \nPacking  From = '+fisDate+' to '+endDate,
				                footer:true,
				                pageSize: 'LEGAL' } ]
		        
		        
		        
		    } );
		} );
		
	var mydata = catmap;
	$('#saleBetTwoDates').dataTable().fnAddData(mydata);
	
		}
	

	);


}

//


function producttxReportBetweenTwoDates(){

	if(document.saleReportFormRange.fisDate.value == "")
	{
		var msg="Please Select Start Date";
		var dialog = bootbox.dialog({
	    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
	    closeButton: false
		});			
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		return false;
	}
	if(document.saleReportFormRange.endDate.value == "")
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
	producttxReportBetweenTwoDates1();
}
function producttxReportBetweenTwoDates1()
{
//	var categoryA = $("#fk_cat_id_for_payment_mode_two1").val();
	var startdateA = $("#fisDate").val();
	var enddateA = 	$("#endDate").val();

	var params= {};

	
	//alert(fk_cat_id);
//	var fk_cat_id = fk_cat_id;
	
//	var categoryPdfValue = $("#fk_cat_id_for_payment_mode_two1").val();
	var fisDate = $("#fisDate").val(); 
	var endDate = $("#endDate").val();
	
//	params["fk_cat_id"]= fk_cat_id;
	params["fisDate"]= fisDate;
	params["endDate"]= endDate;
	params["methodName"] = "producttxBetweenTwoDates";

	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
			{
		
		$('#saleBetTwoDates').dataTable().fnClearTable();
		
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		
		if(catmap == null || catmap == "")
		{
			alert("Packing Reports are Not Available for \nStart Date = "+startdateA+"\nEnd Date = "+enddateA);
			return false;
		}
		
		$(document).ready(function() {
		 var total =   $('#saleBetTwoDates').DataTable( {
			 
		//	 "paging": false,
			 
			    "bProcessing": true,
			    "sAutoWidth": false,
			    "bDestroy":true,
			    "sPaginationType": "bootstrap", // full_numbers
			    "iDisplayStart ": 10,
			    "iDisplayLength": 10,
			    "bPaginate": false, //hide pagination
			    //"bFilter": false, //hide Search bar
			    "bInfo": true, // hide showing entries
			 	"scrollX": true,
			 	"scrollY": 300,
			 
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
			 
			            // Total over all pages
			            /* total = api
			                .column( 6 )
			                .data()
			                .reduce( function (a, b) {
			                    return intVal(a) + intVal(b);
			                }, 0 ); 
			 			console.log(total); */
			            // Total over this page
			 /*           pageTotal = api
			                .column( 8 )
			                .data()
			                .reduce( function (a, b) {
			                    return intVal(a) + intVal(b);
			                }, 0 );
			 
			            // Update footer
			            $( api.column( 8 ).footer() ).html(
			            		
			              parseFloat(pageTotal).toFixed(2)
			               
			            );
			            console.log( pageTotal);
		            */
		        },
		    	    	
		    	destroy: true,
		        searching: true,
		        "scrollY": 400,
		        "scrollX": false,
		        "paging":   false,
		        
		      
		columns: [
			
			
					{"data": "companyName", "width": "5%"},
		          	{"data": "productName", "width": "5%"},
		            {"data": "QuantityTx", "width": "5%"},
		            {"data": "unit" , "width": "5%"},		           
		            {"data": "ware_shopname" , "width": "5%"},		           
		            {"data": "shopnametoTx" , "width": "5%"},
		            {"data": "date" , "width": "5%"},
		        ],
		        
		        dom : 'Bfrtip',
		        buttons : [
				           //'print',
				           				           
				           {	extend: 'print',
				        	    orientation: 'landscape',
				        	   	title: 'Product Transfer Reports Between 2 Dates \n From = '+fisDate+' to '+endDate,
				        	   	footer:true,
				        	   	pageSize: 'LEGAL' },
				           
			               { 	extend: 'copyHtml5',
				                orientation: 'landscape',
				        	   	title: 'Product Transfer Reports Between 2 Dates \n From = '+fisDate+' to '+endDate,
				                footer:true,
				                pageSize: 'LEGAL' },

				           { 	extend: 'excelHtml5',
				                orientation: 'landscape',
				        	   	title: 'Product Transfer Reports Between 2 Dates \n From = '+fisDate+' to '+endDate,
				                messageTop: 'Product Transfer Reports Between 2 Dates \n From = '+fisDate+' to '+endDate,
				                footer:true,
				                pageSize: 'LEGAL' },
				                
				           { 	extend: 'csvHtml5',
				                orientation: 'landscape',
				        	   	title: 'Product Transfer Reports Between 2 Dates \n From = '+fisDate+' to '+endDate,
				                footer:true,
				                pageSize: 'LEGAL' },
				           
				           
						 //{ extend: 'copyHtml5', footer: true },
						 //{ extend: 'excelHtml5', footer: true },
						 //{ extend: 'csvHtml5', footer: true },
				                
				                { extend: 'pdfHtml5',
				                orientation: 'landscape',
				        	   	title: 'Product Transfer Reports Between 2 Dates \n From = '+fisDate+' to '+endDate,
				                footer:true,
				                pageSize: 'LEGAL' } ]
		        
		        
		        
		    } );
		} );
		
	var mydata = catmap;
	$('#saleBetTwoDates').dataTable().fnAddData(mydata);
	
		}
	

	);


}

//

function saleReportBetweenTwoDatesAsPeruser()
{
	var shopName = $("#fkShopIdd").val();
	var fDate = $("#fisDate11").val();
	var sDate = $("#endDate11").val();
	//var catforpaymentmode  = $("#fk_cat_id_for_payment_mode_two").val();
		
	if(shopName != "")
		{
		if(fDate != "")
			{
			if(sDate != "")
				{
				saleReportBetweenTwoDatesAsPeruser1();					
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
				var msg="Please Select Start Date";
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
			var msg="Please Select User Name";
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

function saleReportBetweenTwoDatesAsPeruser1()
{
	var params= {};

	var input1 = document.getElementById('fkShopIdd'),
	list = document.getElementById('shp_dropp'),
	i,fk_cat_id,fk_shop_id;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input1.value) {
			fk_shop_id = list.options[i].getAttribute('data-value');
		}
	}
	
	var shopName = $("#fkShopIdd").val();
//	var fk_shop_id = fk_shop_id;
	var fDate = $("#fisDate11").val(); 
	var sDate = $("#endDate11").val();
	
	params["shop"]= fk_shop_id;
	params["fDate"]= fDate;
	params["sDate"]= sDate;
	params["methodName"] = "getSaleDetailsAsPeruserBetweenTwoDates";

	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
			{
		
		$('#saleBetTwoDates10').dataTable().fnClearTable();
		
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		
		if(catmap == null || catmap == "")
		{
			alert("Sale Reports are Not Available for\nUser Name = "+shopName+"\nStart Date = "+fDate+"\nEnd Date = "+sDate);
			return false;
		}
		
		$(document).ready(function() {
		 var total =   $('#saleBetTwoDates10').DataTable( {
			 

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
			 
			      /*      // Total over this page
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
			            
			         // Total over this page
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
			            
			         // Total over this page
			            pageTotal = api
			                .column( 7 )
			                .data()
			                .reduce( function (a, b) {
			                    return intVal(a) + intVal(b);
			                }, 0 );
			 
			            // Update footer
			            $( api.column( 7 ).footer() ).html(
			            		
			              parseFloat(pageTotal).toFixed(2)
			               
			            );
			            console.log( pageTotal);*/
			            
			         // Total over this page
			            pageTotal = api
			                .column( 8 )
			                .data()
			                .reduce( function (a, b) {
			                    return intVal(a) + intVal(b);
			                }, 0 );
			 
			            // Update footer
			            $( api.column( 8 ).footer() ).html(
			            		
			             
			              'Rs'+' '+pageTotal.toFixed(2)
			               
			            );
			            console.log( pageTotal);
		            
		        },
		    	    	
		    	destroy: true,
		        searching: false,
		        "scrollY": 500,
		        "scrollX": false,
		        "paging":   false,
		        
		      
		columns: [
		          	{"data": "customerBill", "width": "5%"},
		            {"data": "itemName", "width": "5%"},
		            {"data": "soldDate", "width": "5%"},
		            {"data": "SalePrice" , "width": "5%"},
		            {"data": "quantityCCReports" , "width": "5%"},
		            {"data": "unit", "width": "5%"},
//		            {"data": "taxPerc", "width": "5%"},
		            {"data": "tax", "width": "5%"},
		            {"data": "taxAmnt", "width": "5%"},
		            /*{"data": "discountAmount", "width": "5%"},*/
		            {"data": "totalAmount" , "width": "5%"}
		        ],
		        /*dom: 'Bfrtip',
	            buttons: [
	                'copy', 'csv', 'excel', 'pdf', 'print'*/
		        
		        dom : 'Bfrtip',
		        buttons : [
		           //'print',
		           				           
		           {	extend: 'print',
		        	    orientation: 'landscape',
		        	   	title: 'Shop Wise sale Reports\nUser Name = '+shopName+'\nFrom '+fDate+' To '+sDate,
		        	   	footer:true,
		        	   	pageSize: 'LEGAL' },
		           
		           { 	extend: 'copyHtml5',
		                orientation: 'landscape',
		        	   	title: 'Shop Wise sale Reports\nUser Name = '+shopName+'\nFrom '+fDate+' To '+sDate,
		        	   	footer:true,
		                pageSize: 'LEGAL' },

		           { 	extend: 'excelHtml5',
		                orientation: 'landscape',
		        	   	title: 'Shop Wise sale Reports\nUser Name = '+shopName+'\nFrom '+fDate+' To '+sDate,
		        	   	messageTop:	'Payment Mode Wise Sale Reports\nUser Name = '+shopName+'\nFrom '+fDate+' To '+sDate,
		                footer:true,
		                pageSize: 'LEGAL' },
		                
		           { 	extend: 'csvHtml5',
		                orientation: 'landscape',
		        	   	title: 'Shop Wise sale Reports\nUser Name = '+shopName+'\nFrom '+fDate+' To '+sDate,
		        	   	footer:true,
		                pageSize: 'LEGAL' },
		           
		           
		         //{ extend: 'copyHtml5', footer: true },
		         //{ extend: 'excelHtml5', footer: true },
		         //{ extend: 'csvHtml5', footer: true },
		                
		                { extend: 'pdfHtml5',
		                orientation: 'landscape',
		        	   	title: 'Shop Wise sale Reports\nUser Name = '+shopName+'\nFrom '+fDate+' To '+sDate,
		                footer:true,
		                pageSize: 'LEGAL' } ]
		        
	            
		        
		    } );
		} );
		
	var mydata = catmap;
	$('#saleBetTwoDates10').dataTable().fnAddData(mydata);
	
		}
	

	);


}

//


function dayclosurereport()
{

	var params= {};

	params["methodName"] = "dayclosure";

	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
			{
		
		$('#dayclosure').dataTable().fnClearTable();
		
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		
		/*if(catmap == null || catmap == "")
		{
			alert("Packing Reports are Not Available for \nStart Date = "+startdateA+"\nEnd Date = "+enddateA);
			return false;
		}*/
		
		$(document).ready(function() {
		 var total =   $('#dayclosure').DataTable( {
			 
		//	 "paging": false,
			 
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
			 
			            // Total over all pages
			            /* total = api
			                .column( 6 )
			                .data()
			                .reduce( function (a, b) {
			                    return intVal(a) + intVal(b);
			                }, 0 ); 
			 			console.log(total); */
			            // Total over this page
			 /*           pageTotal = api
			                .column( 8 )
			                .data()
			                .reduce( function (a, b) {
			                    return intVal(a) + intVal(b);
			                }, 0 );
			 
			            // Update footer
			            $( api.column( 8 ).footer() ).html(
			            		
			              parseFloat(pageTotal).toFixed(2)
			               
			            );
			            console.log( pageTotal);
		            */
		        },
		    	    	
		    	destroy: true,
		        searching: true,
		        "scrollY": 300,
		        "scrollX": true,
		        "paging":   false,
		        
		      
		columns: [
		          	{"data": "sr", "width": "5%"},
		            {"data": "billNo", "width": "5%"},
		            {"data": "grossTotal", "width": "5%"},
		            {"data": "cust_type" , "width": "5%"},		           
		            {"data": "billType" , "width": "5%"},
		            {"data": "insertDate" , "width": "5%"},
		        ],
		        
		        dom : 'Bfrtip',
		        buttons : [
				           //'print',
				           				           
				           {	extend: 'print',
				        	    orientation: 'landscape',
				        	   	title: 'Day Closure Report',
				        	   	footer:true,
				        	   	pageSize: 'LEGAL' },
				           
			               { 	extend: 'copyHtml5',
				                orientation: 'landscape',
				        	   	title: 'Day Closure Report',
				                footer:true,
				                pageSize: 'LEGAL' },

				           { 	extend: 'excelHtml5',
				                orientation: 'landscape',
				        	   	title: 'Day Closure Report',
				                messageTop: 'Day Closure Report',
				                footer:true,
				                pageSize: 'LEGAL' },
				                
				           { 	extend: 'csvHtml5',
				                orientation: 'landscape',
				        	   	title: 'Day Closure Report',
				                footer:true,
				                pageSize: 'LEGAL' },
				           
				           
						 //{ extend: 'copyHtml5', footer: true },
						 //{ extend: 'excelHtml5', footer: true },
						 //{ extend: 'csvHtml5', footer: true },
				                
				                { extend: 'pdfHtml5',
				                orientation: 'landscape',
				        	   	title: 'Day Closure Report ',
				                footer:true,
				                pageSize: 'LEGAL' } ]
		        
		        
		        
		    } );
		} );
		
	var mydata = catmap;
	$('#dayclosure').dataTable().fnAddData(mydata);
	
		}
	

	);


}