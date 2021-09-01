
<% boolean isHome=false;%>
<%@include file="commons/header.jsp"%>
<%@page import="java.util.List"%>
<head>
<script src="/Shop/staticContent/js/jquery-1.12.3.min.js"></script>
<script type="text/javascript" src="/Shop/staticContent/js/selectjj.js"></script>
<script type="text/javascript" src="/Shop/staticContent/js/buttom.js"></script>
<script src="/Shop/staticContent/js/jquery.min.js"></script>
<script src="/Shop/staticContent/js/jquery.jqgrid.min.js"></script>
<script src="/Shop/staticContent/js/jquery.dataTables.js" type="text/javascript"></script>
<script type="text/javascript" src="/Shop/staticContent/js/jqueryUi.js"></script>

<link href="/Shop/WebContent/staticContent/css/dataTa.css" rel="stylesheet" type="text/css" media="all" />
<link href="/Shop/staticContent/css/dataTables.jqueryui.min.css" rel="stylesheet" type="text/css" media="all">
<link href="/Shop/staticContent/css/select.css" rel="stylesheet" type="text/css" media="all">
<link href="/Shop/staticContent/css/button.css" rel="stylesheet" type="text/css" media="all">
<link rel="stylesheet" href="/Shop/staticContent/css/jquery-ui.min.css">
<link rel="stylesheet" href="/Shop/staticContent/css/ui.jqgrid.min.css">

	<script type="text/javascript"> 
		$(document).ready(function () {
			var table=$("#list").dataTable({
				
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
			            total = api
			                .column( 5 )
			                .data()
			                .reduce( function (a, b) {
			                    return intVal(a) + intVal(b);
			                }, 0 ); 
			 			console.log(total); 
			 			
			 		
			            // Update footer
			            $( api.column( 5 ).footer() ).html(
			                'Rs'+' '+total
			            );
			            console.log( total);
			            
			    }
			
			
			
				
			});
			var tableTools = new $.fn.dataTable.TableTools(table, {
				'sSwfPath':'//cdn.datatables.net/tabletools/2.2.4/swf/copy_csv_xls_pdf.swf',
					'aButtons':['copy','print','csv',{
					'sExtends':'xls',
					'sFileName':'Data.xls',
					'sButtonText': 'Save to Excel'
						}
					]
      			});
	 				$(tableTools.fnContainer()).insertBefore('#list_wrapper');
			});
		
		
	/* 	for pesticide */
	
			$(document).ready(function () {
			var table=$("#list1").dataTable({
				
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
			            total = api
			                .column( 5 )
			                .data()
			                .reduce( function (a, b) {
			                    return intVal(a) + intVal(b);
			                }, 0 ); 
			 			console.log(total); 
			 			
			 		
			            // Update footer
			            $( api.column( 5 ).footer() ).html(
			                'Rs'+' '+total
			            );
			            console.log( total);
			            
			    }
			
			
			
				
			});
			var tableTools = new $.fn.dataTable.TableTools(table, {
				'sSwfPath':'//cdn.datatables.net/tabletools/2.2.4/swf/copy_csv_xls_pdf.swf',
					'aButtons':['copy','print','csv',{
					'sExtends':'xls',
					'sFileName':'Data.xls',
					'sButtonText': 'Save to Excel'
						}
					]
      			});
	 				$(tableTools.fnContainer()).insertBefore('#list_wrapper');
			});
	</script>

</head>

 <div class="container col-md-offset-1" style="float: left"> 
 		
 		<div class="row">
			<div align="center" style="margin-top: 75px">
				  <h2 class="form-name style_heading">Purchase Reports</h2>
			</div>
		<div class="row " id="report" style="text-align: center">
		<label id="demo" class="col-md-offset-7"></label>
		<script>
		   var date = new Date();
		   document.getElementById("demo").innerHTML = date.toDateString();
		</script>
	</div>	
			 <div class="row">
				<div class="col-sm-offset-1 col-md-10">
						<hr style="border-top-color:#c1b1b1;">
				</div>	
			  </div>
		</div>

		<ul class="nav nav-tabs">
	    	<li class="active"><a data-toggle="tab" href="#home"><h4 style="color:blue">Seed</h4></a></li>
	   		<li><a data-toggle="tab" href="#pesti"><h4 style="color:blue">Pesticide</h4></a></li>
 	 	</ul>
 
 	<div class="tab-content" style="float: left">
 <!-- 	SEED -->
 		<div id="home" class="tab-pane fade in active">
 								<%
													GoodsReceiveDao productForNotification = new GoodsReceiveDao();
						           						List<GoodsReceiveDetail> notificationProducts =productForNotification.upcomingExpirySeedProducts();
													
													%>
													<div id="demo_jui" style="text-align: center">
													<table id="list" class="display" border="1">
														<thead>
														<tr>
														<th>Product Name</th>
														<th>Manufacturer Name</th>
														<th>Weight</th>
														<th>Batch Number</th>
														<th>Expiry Date</th>
														<th>Stock</th>
														</tr>
														</thead>
													<tbody>
													<%
											           for(int i=0;i<notificationProducts.size();i++){
											        	   GoodsReceiveDetail goodsForNotification =(GoodsReceiveDetail)notificationProducts.get(i);
													%>
													<tr>
													<td><%=goodsForNotification.getProductName()%></td>
													<td><%=goodsForNotification.getCompany() %></td>
													<td><%=goodsForNotification.getWeight() %></td>
													<td><%=goodsForNotification.getBatchNumber() %></td>
													<td><%=goodsForNotification.getExpiryDate() %></td>
													<td><%=goodsForNotification.getStock() %></td>
													<%
													}
										    		%>
										    		
										    		</tr>
										    		</tbody>
										    		</table>
										    		</div>
 	
 	
 		</div>
 		
<!--  		Pesticide -->
 		<div id="pesti" class="tab-pane">
 	
 			
 		<%
													GoodsReceiveDao productForNotification1 = new GoodsReceiveDao();
						           						List<GoodsReceiveDetail> notificationProducts1 =productForNotification1.upcomingExpiryPesticideProducts();
													
													%>
													
													<div id="demo_jui" style="text-align: center">
													<table id="list1" class="display" border="1">
														<thead>
														<tr>
														<th>Product Name</th>
														<th>Manufacturer Name</th>
														<th>Weight</th>
														<th>Batch Number</th>
														<th>Expiry Date</th>
														<th>Stock</th>
														</tr>
														</thead>
													<tbody>
													<%
											           for(int i=0;i<notificationProducts1.size();i++){
											        	   GoodsReceiveDetail goodsForNotification1 =(GoodsReceiveDetail)notificationProducts1.get(i);
													%>
													<tr>
													<td><%=goodsForNotification1.getProductName()%></td>
													<td><%=goodsForNotification1.getCompany() %></td>
													<td><%=goodsForNotification1.getWeight() %></td>
													<td><%=goodsForNotification1.getBatchNumber() %></td>
													<td><%=goodsForNotification1.getExpiryDate() %></td>
													<td><%=goodsForNotification1.getStock() %></td>
													<%
													}
										    		%>
										    		</tr>
										    		</tbody>
										    		</table>
										    		</div>
 		
 		</div>
 		
 	</div>
 </div>
 <jsp:include page="commons/footer.jsp"></jsp:include>