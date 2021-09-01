<%@page import="com.Fertilizer.hibernate.CustomerPaymentBean"%>
<%@page import="com.Fertilizer.dao.CustomerPaymentDao"%>
<%@page import="com.Fertilizer.dao.SupplierPaymentDao"%>
<%@page import="com.Fertilizer.bean.SupplierPaymentDetail"%>
<%@page import="com.Fertilizer.hibernate.shopDetailsBean"%>
<%@page import="com.Fertilizer.dao.shopDetailsDao"%>
<%@page import="com.Fertilizer.bean.SaleReports"%>
<%@page import="com.Fertilizer.hibernate.CategoryDetailsBean"%>
<%@page import="com.Fertilizer.dao.CategoryDetailsDao"%>
<%@page import="com.Fertilizer.hibernate.SupplierDetailsBean"%>
<%@page import="com.Fertilizer.dao.SupplierDetailsDao"%>
<% boolean isHome=false;%>
<%@include file="commons/header.jsp"%>
<%@page import="java.util.List"%>
<head>
<script src="/Shop/staticContent/js/jquery-1.12.3.min.js"></script>
<script type="text/javascript" src="/Shop/staticContent/js/selectjj.js"></script>
<script type="text/javascript" src="/Shop/staticContent/js/buttom.js"></script>
<script src="/Shop/staticContent/js/jquery.min.js"></script>
<script src="/Shop/staticContent/js/jquery.jqgrid.min.js"></script>
<script type="text/javascript" src="/Shop/staticContent/js/jqueryUi.js"></script>
<script src="/Shop/staticContent/js/jquery.dataTables.js" type="text/javascript"></script>
<link href="/Shop/WebContent/staticContent/css/dataTa.css" rel="stylesheet" type="text/css" media="all" />
<link href="/Shop/staticContent/css/dataTables.jqueryui.min.css" rel="stylesheet" type="text/css" media="all">
<link href="/Shop/staticContent/css/select.css" rel="stylesheet" type="text/css" media="all">
<link href="/Shop/staticContent/css/button.css" rel="stylesheet" type="text/css" media="all">
<link rel="stylesheet" href="/Shop/staticContent/css/jquery-ui.min.css">
<link rel="stylesheet" href="/Shop/staticContent/css/ui.jqgrid.min.css">

<!-- For datatable to pdf,print,excel etc conversion -->
<script type="text/javascript" src="//code.jquery.com/jquery-1.12.4.js"></script> 
 <script type="text/javascript" src="https://cdn.datatables.net/1.10.15/js/jquery.dataTables.min.js"></script>
<script type="text/javascript" src="https://cdn.datatables.net/buttons/1.3.1/js/dataTables.buttons.min.js"></script>
<script type="text/javascript" src="//cdn.datatables.net/buttons/1.3.1/js/buttons.flash.min.js"></script>
<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>
<script type="text/javascript" src="//cdn.rawgit.com/bpampuch/pdfmake/0.1.27/build/pdfmake.min.js"></script>

<script type="text/javascript" src="//cdn.rawgit.com/bpampuch/pdfmake/0.1.27/build/vfs_fonts.js"></script>
<script type="text/javascript" src="//cdn.datatables.net/buttons/1.3.1/js/buttons.html5.min.js"></script>
<script type="text/javascript" src="//cdn.datatables.net/buttons/1.3.1/js/buttons.print.min.js"></script>
<link rel="stylesheet" href="https://cdn.datatables.net/1.10.15/css/jquery.dataTables.min.css"> 
<link rel="stylesheet" href="https://cdn.datatables.net/buttons/1.3.1/css/buttons.dataTables.min.css">




<!-- For datatable to pdf,print,excel etc conversion -->
<!--  <script src="/Fertilizer/staticContent/js/jquery-1.12.3.min.js"></script>
 <script type="text/javascript" src="/Fertilizer/staticContent/datatable_To_Other_File/jquery.dataTables.min.js"></script>
<script type="text/javascript" src="/Fertilizer/staticContent/datatable_To_Other_File/dataTables.buttons.min.js"></script>
<script type="text/javascript" src="/Fertilizer/staticContent/datatable_To_Other_File/buttons.flash.min.js"></script>
<script type="text/javascript" src="/Fertilizer/staticContent/datatable_To_Other_File/jszip.min.js"></script>
<script type="text/javascript" src="/Fertilizer/staticContent/datatable_To_Other_File/pdfmake.min.js"></script>

<script type="text/javascript" src="/Fertilizer/staticContent/datatable_To_Other_File/vfs_fonts.js"></script>
<script type="text/javascript" src="/Fertilizer/staticContent/datatable_To_Other_File/buttons.html5.min.js"></script>
<script type="text/javascript" src="/Fertilizer/staticContent/datatable_To_Other_File/buttons.print.min.js"></script>
<link rel="stylesheet" href="/Fertilizer/staticContent/datatable_To_Other_File/jquery.dataTables.min.css"> 
<link rel="stylesheet" href="/Fertilizer/staticContent/datatable_To_Other_File/buttons.dataTables.min.css">  -->
<script src="/Shop/staticContent/js/goodsReceive.js"></script>
   <script type="text/javascript" src="/Shop/staticContent/js/podetails.js"></script>
</head>


 <div class="container col-md-offset-1" style="float: left"> 
 		
 		<div class="row">
			<div align="center" style="margin-top: 75px">
				  <h2 class="form-name style_heading">Balnace Reports</h2>
			</div>
				 	
			 <div class="row">
				<div class="col-sm-offset-1 col-md-10">
						<hr style="border-top-color:#c1b1b1;">
				</div>	
			  </div>
		</div>

		<ul class="nav nav-tabs">
	    <li class="active"><a data-toggle="tab" href="#home"><h4 style="color:blue">All Supplier</h4></a></li>
	    <li><a data-toggle="tab" href="#twoDates"><h4 style="color:blue">All Customers</h4></a></li>
 	 </ul>
 
 	<div class="tab-content" style="float: left">
   
    <!-------- Single Date ---------->
   
    	<div id="home" class="tab-pane fade in active">
    	<div id="report" style="text-align: center">
		<label id="demo" ></label>
		<script>
		   var date = new Date();
		   document.getElementById("demo").innerHTML = date.toDateString();
		</script>
	</div>

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
			                .column( 2 )
			                .data()
			                .reduce( function (a, b) {
			                    return intVal(a) + intVal(b);
			                }, 0 ); 
			 			console.log(total); 
			 			
			 		
			            // Update footer
			            $( api.column( 2 ).footer() ).html(
			                'Rs'+' '+total.toFixed(2)
			            );
			            console.log( total);

			            total = api
		                .column( 3 )
		                .data()
		                .reduce( function (a, b) {
		                    return intVal(a) + intVal(b);
		                }, 0 ); 
		 			console.log(total); 
		 			
		 		
		            // Update footer
		            $( api.column( 3 ).footer() ).html(
		                'Rs'+' '+total.toFixed(2)
		            );
		            console.log( total);

		            total = api
	                .column( 4 )
	                .data()
	                .reduce( function (a, b) {
	                    return intVal(a) + intVal(b);
	                }, 0 ); 
	 			console.log(total); 
	 			
	 		
	            // Update footer
	            $( api.column( 4 ).footer() ).html(
	                'Rs'+' '+total.toFixed(2)
	            );
	            console.log( total);

	            /* total = api
                .column( 7 )
                .data()
                .reduce( function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0 ); 
 			console.log(total); 
 			
 		
            // Update footer
            $( api.column( 7 ).footer() ).html(
                'Rs'+' '+total
            );*/
            console.log( total);
			    } 
			
			});
			
		/* 	 var tableTools = new $.fn.dataTable.TableTools(table, {
					'sSwfPath':'//cdn.datatables.net/tabletools/2.2.4/swf/copy_csv_xls_pdf.swf',
						'aButtons':['copy','print','csv',{
						'sExtends':'xls',
						'sFileName':'Data.xls',
						'sButtonText': 'Save to Excel'
							}
						]
	      			}); */
			
	 			/* 	$(tableTools.fnContainer()).insertBefore('#list_wrapper'); */
			});
	</script>

	
	<%
	SupplierPaymentDao dao=new SupplierPaymentDao();
	List Lis1=dao.getSupplierPaymentDetailForBalnaceReport();
	
	%>
	<div id="demo_jui" style="text-align: center">
		<table class= "table table-bordered table-striped table-condensed cf" id="list" class="display" border="1">
			<thead>
				<tr>
	                <th>Supplier Name</th>
					<th>Bill Number</th>
					<th>Total Amount</th>
					<th>Paid Amount</th>
					<th>Balance Amount</th>
				</tr>
			</thead>
			<tfoot>
            <tr>
									<th colspan="2" style="text-align: right">Total:</th>
									<th></th><th></th><th></th>
			</tr>
        </tfoot>
			
			<tbody>
   				<%
					for(int i=0;i<Lis1.size();i++){
						SupplierPaymentDetail pro = (SupplierPaymentDetail)Lis1.get(i);
				%>
				<tr>
					<td class="align"><%=pro.getSupplierName()%></td>
					<td class="align"><%=pro.getBill()%></td>
					<td class="align"><%=pro.getTotalAmount()%></td>
					<td class="align"><%=pro.getPaidAmount()%></td>
					<td class="align"><%=pro.getBalanceAmount()%></td>
				</tr>
				<%
					}
				%>
				
			</tbody>
		</table>
	</div>
     </div>
 		
 <!-- ---	Between Two Dates	---- -->
 		<div id="twoDates" class="tab-pane " class="table-responsive">
 		<div id="report" style="text-align: center">
		<label id="demo" ></label>
		<script>
		   var date = new Date();
		   document.getElementById("demo").innerHTML = date.toDateString();
		</script>
	</div>

	<script type="text/javascript"> 
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
			                .column( 3 )
			                .data()
			                .reduce( function (a, b) {
			                    return intVal(a) + intVal(b);
			                }, 0 ); 
			 			console.log(total); 
			 			
			 		
			            // Update footer
			            $( api.column( 3 ).footer() ).html(
			                'Rs'+' '+total
			            );
			            console.log( total);

			            total = api
		                .column( 4 )
		                .data()
		                .reduce( function (a, b) {
		                    return intVal(a) + intVal(b);
		                }, 0 ); 
		 			console.log(total); 
		 			
		 		
		            // Update footer
		            $( api.column( 4 ).footer() ).html(
		                'Rs'+' '+total
		            );
		            console.log( total);

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

	            /* total = api
                .column( 7 )
                .data()
                .reduce( function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0 ); 
 			console.log(total); 
 			
 		
            // Update footer
            $( api.column( 7 ).footer() ).html(
                'Rs'+' '+total
            );*/
            console.log( total);
			    } 
			
			});
			
		/* 	 var tableTools = new $.fn.dataTable.TableTools(table, {
					'sSwfPath':'//cdn.datatables.net/tabletools/2.2.4/swf/copy_csv_xls_pdf.swf',
						'aButtons':['copy','print','csv',{
						'sExtends':'xls',
						'sFileName':'Data.xls',
						'sButtonText': 'Save to Excel'
							}
						]
	      			}); */
			
	 			/* 	$(tableTools.fnContainer()).insertBefore('#list_wrapper'); */
			});
	</script>

	
	<%
	CustomerPaymentDao dao1=new CustomerPaymentDao();
	List List2=dao1.getCustomerPaymentDetailForBalnaceReport();
	
	%>
	<div id="demo_jui" style="text-align: center">
		<table class= "table table-bordered table-striped table-condensed cf" id="list1" class="display" border="1">
			<thead>
				<tr>
	                <th>First Name</th>
	                 <th>Last Name</th>
					<th>Bill Number</th>
					<th>Total Amount</th>
					<th>Paid Amount</th>
					<th>Balance Amount</th>
				</tr>
			</thead>
			<tfoot>
            <tr>
									<th colspan="3" style="text-align: right">Total:</th>
									<th></th><th></th><th></th>
			</tr>
        </tfoot>
			
			<tbody>
   				<%
					for(int i=0;i<List2.size();i++){
						CustomerPaymentBean pro = (CustomerPaymentBean)List2.get(i);
				%>
				<tr>
					<td class="align"><%=pro.getFirstName()%></td>
					<td class="align"><%=pro.getLastName()%></td>
					<td class="align"><%=pro.getBill()%></td>
					<td class="align"><%=pro.getTotalAmount()%></td>
					<td class="align"><%=pro.getPaidAmount()%></td>
					<td class="align"><%=pro.getBalanceAmount()%></td>
				</tr>
				<%
					}
				%>
				
			</tbody>
		</table>
	</div>
 	</div>	
 		
<!-- ---	Between Two Dates	---- -->
 		<div id="GSTSummary" class="tab-pane " class="table-responsive">
 		<div class="row"></div>
 				<form class="form-horizontal" method="post" action="" name="fertiBill">
					<fieldset>
				         <div class="row form-group" style="margin-top: 20px">
							<label class="col-md-2 control-label" for=""> Start Purchase Date:<sup>*</sup></label>  
				           			 <div class="col-md-3">
										<div class="input-group">
											<span class="input-group-addon">
												<i class="glyphicon glyphicon-user"></i>
											</span>
				           		 			  <input type="date" id="fisDate3" placeholder="Start Date" class="form-control input-md" type="text" >
				           		 		</div>
									</div>
				
				           	 <label class="col-md-2 control-label" for="">End Purchase Date:<sup>*</sup></label>
				           	 	<div class="col-md-3">
									<div class="input-group">
										<span class="input-group-addon">
											<i class="glyphicon glyphicon-map-marker"></i>
										</span>
				         	   			  <input type="date" id="endDate3" placeholder="End Date" class="form-control input-md ac_district"  type="text">
				          		  	</div>
								</div>
				          </div>
					  
				      		 <div class="row form-group buttons_margin_top ">
									<div align="center">
												  
										<input type="button"  id="btn" name="save" class="btn btn-lg btn-success btn-md button_hw button_margin_right"onclick="GSTSummaryReportBetweenTwoDates()" value="Search"/>
												     									
									</div>
							</div >	
						<table class= "table table-bordered table-striped table-condensed cf" id="GSTSummaryRange" class="display">
						<thead>
							<tr>
								<th>Bill Number</th>
								<th>Purchase Date</th>
								<th>Product Name</th>
								<th>Quantity</th>
								<th>Sale Price</th>
								<th>GST %</th>
								<th>IGST %</th>
								<th>CGST Amount</th>
								<th>SGST Amount</th>
								<th>IGsT Amount</th>
							</tr>
						</thead>
						<tfoot>
							<tr>
								<!-- <th colspan="7" style="text-align: right">Total:</th>
								<th></th> -->
							</tr>
						</tfoot>
					</table>
				</fieldset>
				</form>
 		</div> 		
 		
<!------  	Product wise ------->
 		<div id="pro" class="tab-pane ">
 				<div class="row"></div>
 		
 				<form class="form-horizontal" method="post" action="" name="fertiBill">
					<fieldset>
				         <div class="row form-group" style="margin-top: 20px">
								<label class="col-md-2 control-label" for="fk_cat_id">Product Category<sup>*</sup></label>  
           			 <div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="	glyphicon glyphicon-hand-right"></i>
							</span>
              				
							<!-- Following code is to get categories from "categories" table of "fertilizer" DB -->
							<!-- getAllMainCat() is implemented in  CategoryDetailsDao with return type List-->
							<%
							   CategoryDetailsDao cdd9 = new CategoryDetailsDao();
           						List cList9 =cdd9.getAllMainCat(request);
							
							%>
							<input list="cat_drop" id="fk_cat_id"  class="form-control" onchange="pro.getAllProduct()">
				<datalist id="cat_drop">
							<%
					           for(int i=0;i<cList9.size();i++){
					        	   CategoryDetailsBean cat9=(CategoryDetailsBean)cList9.get(i);
							%>
		
							<option data-value="<%=cat9.getCatId()%>" value="<%=cat9.getCategoryName()%>">
							<%
				      			}
				    		%>
			              	
            			</datalist>
            			</div>
            		</div>
					
					<label class="col-md-2 control-label" for="product">Product Name<sup>*</sup></label>  
          					  <div class="col-md-3">
								<div class="input-group">
									<span class="input-group-addon">
										<i class="	glyphicon glyphicon-hand-right"></i>
									</span>
									<select class="form-control" id='proName'  name="proName">
									</select>
										
								</div>
							</div>
					  </div>
					   <div class="row form-group">
						     <div class="col-md-3 col-md-offset-4">
								<div class="input-group">
														  
										<input type="button"  id="btn" name="save" class="btn btn-lg btn-success btn-md button_hw button_margin_right" onclick="purchaseReportAsPerProductName()" value="Search"/>
														     									
								</div>
							</div>	
						</div>
						<table class= "table table-bordered table-striped table-condensed cf" id="purchaseAsPerProduct" class="display">
						<thead>
							<tr>
								<th>Bill Number</th>
								<th>Product Name</th>
								<th>Purchase Date</th>
								<th>Buy Price</th>
								<th>Sale Price</th>
								<th>Packing</th>
								<th>Quantity</th>
								<th>Extra Expenses</th>
								<th>Total Amount</th>
							</tr>
						</thead>
						
					</table>
				</fieldset>
				</form>
 		
 		</div>
 		
 <!-- 		Supplier Wise  --> 		
 		<div id="sup" class="tab-pane ">
 			<div class="row"></div>
 		
 				<form class="form-horizontal" method="post" action="" name="fertiBill">
					<fieldset>
				         <div class="row form-group" style="margin-top: 20px">
									<label class="col-md-2 control-label" for="supplier">Supplier Name<sup>*</sup></label>  
		          					  <div class="col-md-3">
										<div class="input-group">
											<span class="input-group-addon">
												<i class="	glyphicon glyphicon-hand-right"></i>
											</span>
											
									
												
									<!-- Following code is to get Supplier from "supplier_details" table of "fertilizer" DB -->
									<!-- getAllSupllier() is implemented in  SupplierDetailsDao with return type List-->
								
									<%
										SupplierDetailsDao sdd = new SupplierDetailsDao();
		           						List sList =sdd.getAllSupplier(request);
									
									%>
									
									<input list="sup_drop" id="fkSupplierId"  class="form-control">
						<datalist id="sup_drop">
									
									<%
							           for(int i=0;i<sList.size();i++){
							        	   SupplierDetailsBean sup =(SupplierDetailsBean)sList.get(i);
									%>
				
									<option data-value="<%=sup.getSupId()%>" value="<%=sup.getDealerName() %>">
									<%
						      			}
						    		%>
								</datalist>           	
							</div>
		           		</div> 
			
					  
				     <div class="col-md-3">
						<div class="input-group">
												  
								<input type="button"  id="btn" name="save" class="btn btn-lg btn-success btn-md button_hw button_margin_right" onclick="supplierWisePurchaseReport()" value="Search"/>
												     									
						</div>
					</div>	
				</div>		
						<table class= "table table-bordered table-striped table-condensed cf" id="purchase3" class="display">
						<thead>
							<tr>
								<th>Supplier</th>
								<th>Bill Number</th>
								<th>Purchase Date</th>
								<th>Product Name</th>
								<th>Company Name</th>
								<th>DC No</th>
								<!-- <th>Batch No</th> -->
								<th>Barcode No</th>
								<th>Buy Price</th>
								<th>Sale Price</th>
								<th>MRP</th>
								<th>Packing</th>
								<th>Quantity</th>
								<th>Total Amount</th>								
							</tr>
						</thead>
						<tfoot>
							<tr>
								<!-- <th colspan="7" style="text-align: right">Total:</th>
								<th></th> -->
							</tr>
						</tfoot>
					</table>
				</fieldset>
				</form>
 		
 		</div>
 		
 		<!-- 		Shop Wise  --> 		
 		<div id="shp" class="tab-pane ">
 			<div class="row"></div>
 		
 				<form class="form-horizontal" method="post" action="" name="fertiBill">
					<fieldset>
					<div class="row form-group" style="margin-top: 20px">
							<label class="col-md-2 control-label" for=""> Start Purchase Date:<sup>*</sup></label>  
				           			 <div class="col-md-3">
										<div class="input-group">
											<span class="input-group-addon">
												<i class="glyphicon glyphicon-user"></i>
											</span>
				           		 			  <input type="date" id="fisDate9" placeholder="Start Date" class="form-control input-md" type="text" >
				           		 		</div>
									</div>
				
				           	 <label class="col-md-2 control-label" for="">End Purchase Date:<sup>*</sup></label>
				           	 	<div class="col-md-3">
									<div class="input-group">
										<span class="input-group-addon">
											<i class="glyphicon glyphicon-map-marker"></i>
										</span>
				         	   			  <input type="date" id="endDate9" placeholder="End Date" class="form-control input-md ac_district"  type="text">
				          		  	</div>
								</div>
				          </div>
				         <div class="row form-group" style="margin-top: 20px">
									<label class="col-md-2 control-label" for="shop">Shop Name<sup>*</sup></label>  
		          					  <div class="col-md-3">
										<div class="input-group">
											<span class="input-group-addon">
												<i class="	glyphicon glyphicon-hand-right"></i>
											</span>
											
									
												
									<!-- Following code is to get Supplier from "supplier_details" table of "fertilizer" DB -->
									<!-- getAllSupllier() is implemented in  SupplierDetailsDao with return type List-->
								
									<%
									shopDetailsDao shdd = new shopDetailsDao();
		           						List spList =shdd.getAllShops();
									
									%>
									
									<input list="shp_drop" id="fkShopId"  class="form-control">
						<datalist id="shp_drop">
									
									<%
							           for(int i=0;i<spList.size();i++){
							        	   shopDetailsBean shp =(shopDetailsBean)spList.get(i);
									%>
				
									<option data-value="<%=shp.getShopId()%>" value="<%=shp.getShopName() %>">
									<%
						      			}
						    		%>
								</datalist>           	
							</div>
		           		</div> 
			
					  
				     <div class="col-md-3">
						<div class="input-group">
												  
								<input type="button"  id="btn" name="save" class="btn btn-lg btn-success btn-md button_hw button_margin_right" onclick="shopWisePurchaseReport()" value="Search"/>
												     									
						</div>
					</div>	
				</div>		
						<table class= "table table-bordered table-striped table-condensed cf" id="purchase4" class="display">
						<thead>
							<tr>
								<th>Supplier</th>
								<th>Bill Number</th>
								<th>Purchase Date</th>
								<th>Product Name</th>
								<th>Company Name</th>
								<th>DC No</th>
								<!-- <th>Batch No</th> -->
								<th>Barcode No</th>
								<th>Buy Price</th>
								<th>Sale Price</th>
								<th>MRP</th>
								<th>Packing</th>
								<th>Quantity</th>
								<th>Total Amount</th>								
							</tr>
						</thead>
						<tfoot>
							<tr>
								<!-- <th colspan="7" style="text-align: right">Total:</th>
								<th></th> -->
							</tr>
						</tfoot>
					</table>
				</fieldset>
				</form>
 		
 		</div>
 		
 		
 <!-- 		shop Wise -->
<%--  
 		 <div id="cat" class="tab-pane ">
 			<div class="row"></div>
 		
 				<form class="form-horizontal" method="post" action="" name="fertiBill">
					<fieldset>
				         <div class="row form-group" style="margin-top: 20px">
								<label class="col-md-2 control-label" for="fk_cat_id">Product Category<sup>*</sup></label>  
			           			 <div class="col-md-3">
									<div class="input-group">
										<span class="input-group-addon">
											<i class="	glyphicon glyphicon-hand-right"></i>
										</span>
			              				
										<!-- Following code is to get categories from "categories" table of "fertilizer" DB -->
										<!-- getAllMainCat() is implemented in  CategoryDetailsDao with return type List-->
										<%
										   CategoryDetailsDao cdd = new CategoryDetailsDao();
			           						List cList =cdd.getAllMainCat();
										
										%>
										<input list="cat_drop6" id="fk_cat_id6"  class="form-control">
							<datalist id="cat_drop6">
										<%
								           for(int i=0;i<cList.size();i++){
								        	   CategoryDetailsBean cat=(CategoryDetailsBean)cList.get(i);
										%>
					
										<option data-value="<%=cat.getCatId()%>" value="<%=cat.getCategoryName()%>">
										<%
							      			}
							    		%>
						              	
			            			</datalist>
			            			</div>
            					</div> 
			
					  
				     <div class="col-md-3">
						<div class="input-group">
												  
								<input type="button"  id="btn" name="save" class="btn btn-lg btn-success btn-md button_hw button_margin_right"onclick="purchaseReportAsPerCat()" value="Search"/>
												     									
						</div>
					</div>	
				</div>		
						<table id="purchase4" class="display">
						<thead>
							<tr>
								<th>Bill Number</th>
								<th>Purchase Date</th>
								<th>Product Name</th>
								<th>Company Name</th>
								<th>DC No</th>
								<th>Batch No</th>
								<th>Barcode No</th>
								<th>Buy Price</th>
								<th>Sale Price</th>
								<th>MRP</th>
								<th>Packing</th>
								<th>Quantity</th>
								<th>Total Amount</th>
							</tr>
						</thead>
						<tfoot>
							<tr>
								 <!-- <th colspan="7" style="text-align: right">Total:</th>
								<th></th> --> 
							</tr>
						</tfoot>
					</table>
				</fieldset>
				</form>
 		</div>		 --%>
 		
 		<!-- GST wise -->
 		<div id="gst" class="tab-pane ">
 		<div class="row"></div>
 		
 		<form class="form-horizontal" method="post" action="" name="gstRepo">
				<fieldset>
				
				<div class="row form-group" style="margin-top: 20px">
							<label class="col-md-2 control-label" for=""> Start Date:<sup>*</sup></label>  
				           			 <div class="col-md-3">
										<div class="input-group">
											<span class="input-group-addon">
												<i class="glyphicon glyphicon-user"></i>
											</span>
				           		 			  <input type="date" id="gstFisDate" placeholder="Start Date" class="form-control input-md" type="text" >
				           		 		</div>
									</div>
				
				           	 <label class="col-md-2 control-label" for="">End Date:<sup>*</sup></label>
				           	 	<div class="col-md-3">
									<div class="input-group">
										<span class="input-group-addon">
											<i class="glyphicon glyphicon-map-marker"></i>
										</span>
				         	   			  <input type="date" id="gstEndDate" placeholder="End Date" class="form-control input-md ac_district"  type="text">
				          		  	</div>
								</div>
				          </div>
					  
				      		 <div class="row form-group buttons_margin_top ">
									<div align="center">
												  
										<input type="button"  id="gstBtn" name="save" class="btn btn-lg btn-success btn-md button_hw button_margin_right"onclick="purchaseReportAsPerGST()" value="Search"/>
												     									
									</div>
							</div>	
				
				<!-- <div class="table-responsive"> -->
				<div class="table-responsive">
					<table class= "table table-bordered table-striped table-condensed cf" id="gstPurchaseReportTable" class="table table-boardered" style=" border: 2px solid black;border-collapse: collapse;">
						<thead>
								<tr>
								<th>Sr No</th>
								<th>date</th>
								<th>Name Of Supplier</th>
								<th>Bill No.</th>
								<th>GST No</th>
								<th>HSN No</th>
								<th>Item Description</th>
								<th>Item Rate</th>
								<th>Quantity</th>
								<th>Amount</th>
								<th >GST& SGST 5% Amount</th>
								<th >GST& SGST 12% Amount</th>
								<th >GST& SGST 18% Amount</th>
								<th >GST& SGST 28% Amount</th>
								<th >IGST 5% Amount</th>
								<th >IGST 12% Amount</th>
								<th >IGST 18% Amount</th>
								<th >IGST 28% Amount</th>
								<th>Total Tax Amount</th>
								<th>Total Amount including Tax</th>
								
							</tr>
						</thead>
	
						<tfoot>
							<tr>
								<th colspan="7" style="text-align: right">Total Rs:</th>
								<th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th>
			
							</tr>
						</tfoot>
					</table>
					</div>
				<!-- </div> -->
				</fieldset>
				</form>
 	</div>
 	
 	 <!-- 	Purchase Return  --> 		
 		<div id="purchaseReturn" class="tab-pane ">
 			<div class="row"></div>
 		
 				<form class="form-horizontal" method="post" action="" name="fertiBill">
					<fieldset>
						<!-- <div class="row form-group" style="margin-top: 20px">
							<label class="col-md-2 control-label" for=""> Start Date:<sup>*</sup></label>  
				           			 <div class="col-md-3">
										<div class="input-group">
											<span class="input-group-addon">
												<i class="glyphicon glyphicon-user"></i>
											</span>
				           		 			  <input type="date" id="purchaseReturnFisDate" placeholder="Start Date" class="form-control input-md" type="text" >
				           		 		</div>
									</div>
				
				           	 <label class="col-md-2 control-label" for="">End Date:<sup>*</sup></label>
				           	 	<div class="col-md-3">
									<div class="input-group">
										<span class="input-group-addon">
											<i class="glyphicon glyphicon-map-marker"></i>
										</span>
				         	   			  <input type="date" id="purchaseReturnEndDate" placeholder="End Date" class="form-control input-md ac_district"  type="text">
				          		  	</div>
								</div>
				          </div> -->
					
				         <div class="row form-group" >
									<label class="col-md-2 control-label" for="supplier">Supplier Name<sup>*</sup></label>  
		          					  <div class="col-md-3">
										<div class="input-group">
											<span class="input-group-addon">
												<i class="	glyphicon glyphicon-hand-right"></i>
											</span>
											
									
												
									<!-- Following code is to get Supplier from "supplier_details" table of "fertilizer" DB -->
									<!-- getAllSupllier() is implemented in  SupplierDetailsDao with return type List-->
								
									<%
										SupplierDetailsDao supDao = new SupplierDetailsDao();
		           						List suplierList =supDao.getAllSupplier(request);
									
									%>
									
									<input list="sup_drop_Purchase_return" id="fkSupplierId_Purchase_Return"  class="form-control">
						<datalist id="sup_drop_Purchase_return">
									
									<%
							           for(int i=0;i<suplierList.size();i++){
							        	   SupplierDetailsBean supBean =(SupplierDetailsBean)suplierList.get(i);
									%>
				
									<option data-value="<%=supBean.getSupId()%>" value="<%=supBean.getDealerName() %>">
									<%
						      			}
						    		%>
								</datalist>           	
							</div>
		           		</div> 
			
					  
				     <div class="col-md-3">
						<div class="input-group">
												  
								<input type="button"  id="btn" name="save" class="btn btn-lg btn-success btn-md button_hw button_margin_right" onclick="supplierWisePurchaseReturnReport()" value="Search"/>
												     									
						</div>
					</div>	
				</div>		
						<table class= "table table-bordered table-striped table-condensed cf" id="purchaseReturnTable" class="display">
						<thead>
							<tr>
								<th>Supplier</th>
								<th>Bill Number</th>
								<th>Purchase Date</th>
								<th>Product Name</th>
								<th>Company Name</th>
								<th>DC No</th>
								<!-- <th>Batch No</th> -->
								<th>Barcode No</th>
								<th>Buy Price</th>
								<th>Sale Price</th>
								<th>MRP</th>
								<th>Packing</th>
								<th>Quantity</th>
								<th>Return Quantity</th>
								<th>Quantity After Return</th>
															
							</tr>
						</thead>
						<tfoot>
							<tr>
								<!-- <th colspan="7" style="text-align: right">Total:</th>
								<th></th> -->
							</tr>
						</tfoot>
					</table>
				</fieldset>
				</form>
 		
 		</div>
 	
 </div>
</div>
<jsp:include page="commons/footer.jsp"></jsp:include>

