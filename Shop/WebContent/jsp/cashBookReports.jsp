<%@page import="com.Fertilizer.hibernate.ExpenditurePaymentBean"%>
<%@page import="com.Fertilizer.bean.PartnerDetailsBean"%>
<%@page import="com.Fertilizer.dao.partnerDetailsDao"%>
<%@page import="com.Fertilizer.hibernate.EmployeeDetailsBean"%>
<%@page import="com.Fertilizer.dao.EmployeeDetailsDao"%>
<%@page import="com.Fertilizer.hibernate.ExpenditureDetailsBean"%>
<%@page import="com.Fertilizer.dao.ExpenditureDetailsDao"%>
<%@page import="com.Fertilizer.bean.CreditCustPaymentDetail"%>
<%@page import="com.Fertilizer.dao.CustomerPaymentDao"%>
<%@page import="com.Fertilizer.dao.SupplierPaymentDao"%>
<%@page import="com.Fertilizer.bean.SupplierPaymentDetail"%>
<%@page import="com.Fertilizer.hibernate.CategoryDetailsBean"%>
<%@page import="com.Fertilizer.dao.CategoryDetailsDao"%>
<%@page import="com.Fertilizer.hibernate.CustomerDetailsBean"%>
<%@page import="com.Fertilizer.dao.CustomerDetailsDao"%>
<%@page import="com.Fertilizer.hibernate.SupplierDetailsBean"%>
<%@page import="com.Fertilizer.dao.SupplierDetailsDao"%>
<%@page import="com.Fertilizer.dao.BankDetailsDao"%>
<%@page import="com.Fertilizer.hibernate.BankDetailsBean"%>
<%
	boolean isHome = false;
%>
<%@include file="commons/header.jsp"%>
<%@page import="java.util.List"%>

<!-- 	 <link href="/Fertilizer/WebContent/staticContent/css/dataTa.css" rel="stylesheet" type="text/css" media="all" />
	<link href="/Fertilizer/staticContent/css/dataTables.jqueryui.min.css"  rel="stylesheet" type="text/css" media="all">
	<link rel="stylesheet" href="/Fertilizer/staticContent/css/tabDemo.css">
 	<link rel="stylesheet" href="/Fertilizer/staticContent/css/jquery-ui.min.css">
    <link rel="stylesheet" href="/Fertilizer/staticContent/css/ui.jqgrid.min.css">
    
    <script src="/Fertilizer/staticContent/js/jquery.min.js"></script>
    <script src="/Fertilizer/staticContent/js/jquery.jqgrid.min.js"></script>
	<script src="/Fertilizer/staticContent/js/jquery.dataTables.js" type="text/javascript"></script>
	<script type="text/javascript" src="/Fertilizer/staticContent/js/jqueryUi.js"></script>  -->
<head>

<script src="/Shop/staticContent/js/jquery-1.12.3.min.js"></script>
<script type="text/javascript" src="/Shop/staticContent/js/selectjj.js"></script>
<script type="text/javascript" src="/Shop/staticContent/js/buttom.js"></script>
<script src="/Shop/staticContent/js/jquery.min.js"></script>
<script src="/Shop/staticContent/js/jquery.jqgrid.min.js"></script>
<script src="/Shop/staticContent/js/jquery.dataTables.js"
	type="text/javascript"></script>
<script type="text/javascript" src="/Shop/staticContent/js/jqueryUi.js"></script>

<link href="/Shop/WebContent/staticContent/css/dataTa.css"
	rel="stylesheet" type="text/css" media="all" />
<link href="/Shop/staticContent/css/dataTables.jqueryui.min.css"
	rel="stylesheet" type="text/css" media="all">
<link href="/Shop/staticContent/css/select.css" rel="stylesheet"
	type="text/css" media="all">
<link href="/Shop/staticContent/css/button.css" rel="stylesheet"
	type="text/css" media="all">
<link rel="stylesheet" href="/Shop/staticContent/css/jquery-ui.min.css">
<link rel="stylesheet" href="/Shop/staticContent/css/ui.jqgrid.min.css">
<script type="text/javascript" src="/Shop/staticContent/js/bootstrap.js"></script>
<script type="text/javascript"
	src="/Shop/staticContent/js/bootbox.min.js"></script>
<!-- For datatable to pdf,print,excel etc conversion -->
<script type="text/javascript" src="//code.jquery.com/jquery-1.12.4.js"></script>
<script type="text/javascript"
	src="https://cdn.datatables.net/1.10.15/js/jquery.dataTables.min.js"></script>
<script type="text/javascript"
	src="https://cdn.datatables.net/buttons/1.3.1/js/dataTables.buttons.min.js"></script>
<script type="text/javascript"
	src="//cdn.datatables.net/buttons/1.3.1/js/buttons.flash.min.js"></script>
<script type="text/javascript"
	src="//cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>
<script type="text/javascript"
	src="//cdn.rawgit.com/bpampuch/pdfmake/0.1.27/build/pdfmake.min.js"></script>

<script type="text/javascript"
	src="//cdn.rawgit.com/bpampuch/pdfmake/0.1.27/build/vfs_fonts.js"></script>
<script type="text/javascript"
	src="//cdn.datatables.net/buttons/1.3.1/js/buttons.html5.min.js"></script>
<script type="text/javascript"
	src="//cdn.datatables.net/buttons/1.3.1/js/buttons.print.min.js"></script>
<link rel="stylesheet"
	href="https://cdn.datatables.net/1.10.15/css/jquery.dataTables.min.css">
<link rel="stylesheet"
	href="https://cdn.datatables.net/buttons/1.3.1/css/buttons.dataTables.min.css">
<script src="/Shop/staticContent/js/cashbankbook.js"></script>
<style>
.btn-default, .btn-primary, .btn-success, .btn-info, .btn-warning,
	.btn-danger {
	border-radius: 23px;
}

.pagination {
    float: right !important;
}
.pagination a{
   color: #333333;
   font-size: 15px;
   font-weight: 600;
}
.pagination a:hover{
   color: #00000;
}
.pagination span{
    font-weight: 700;
    font-size: 16px;
}
</style>
</head>

<div class="row" style="min-height: 300px;">
	<div class="col-md-12">
		<h3>Left Tabs</h3>
		<hr />
		<div class="col-md-2">
			<ul class="nav nav-tabs tabs-left">
				<li class="active"><a href="#home" data-toggle="tab"
					style="border-radius: 23px;">Supplier Payment Reports</a></li>
				<li><a href="#profile" data-toggle="tab"
					style="border-radius: 23px;">Customer Payment Reports</a></li>
				<li><a href="#messages" data-toggle="tab"
					style="border-radius: 23px;">Employee Payment Reports</a></li>
				<li><a href="#settings" data-toggle="tab"
					style="border-radius: 23px;">Expenditure Payment Reports</a></li>
				<li><a href="#PartnersTransaction" data-toggle="tab"
					style="border-radius: 23px;">Partners Payment Reports</a></li>
				<li><a href="#BankTransaction" data-toggle="tab"
					style="border-radius: 23px;">Bank Payment Reports</a></li>
			</ul>
		</div>
		<div class="col-xs-9">
			<!-- Tab panes -->
			<div class="tab-content">

				<!---------- 	supplier Payment reports -------------->

				<div class="tab-pane active" id="home">
					<div class="row">
						<div align="center">
							<h2 class="form-name style_heading">Supplier Payment Reports</h2>
						</div>

						<div class="row">
							<div class="col-sm-offset-1 col-md-10">
								<hr style="border-top-color: #c1b1b1;">
							</div>
						</div>
					</div>

					<ul class="nav nav-tabs">
						<li class="active"><a data-toggle="tab" href="#AllSupplier"
							style="border-radius: 23px;"><h4>All Supplier's</h4></a></li>
						<li><a data-toggle="tab" href="#supplierNAme"
							style="border-radius: 23px;"><h4>Supplier Name Wise</h4></a></li>
						<li><a data-toggle="tab" href="#supplierBillWise"
							style="border-radius: 23px;"><h4>Bill Number Wise</h4></a></li>
						<li><a data-toggle="tab" href="#supplierSingleDate"
							style="border-radius: 23px;"><h4>Datewise</h4></a></li>
						<li><a data-toggle="tab" href="#supplierBetweenTwoDate"
							style="border-radius: 23px;"><h4>Range</h4></a></li>
						<li><a data-toggle="tab" href="#supplierpaymentmode"
							style="border-radius: 23px;"><h4>Payment Mode</h4></a></li>
					</ul>

					<div class="tab-content" style="float: left">
					
	<!--------------------------------------------------------------- ALL Supplier -------------------------------------------------------->
	
						<div id="AllSupplier" class="tab-pane fade in active"
							style="padding-top: 3%">
							<div id="report" style="text-align: center">
								<label id="demo"></label>
								<script>
									var date = new Date();
									document.getElementById("demo").innerHTML = date
											.toDateString();
								</script>
							</div>

							<script type="text/javascript">
								$(document)
										.ready(
												function() {
													var table = $("#list")
															.dataTable(
																	{

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

																		destroy : true,
																		searching : true,
																		"scrollY" : 300,
																		"scrollX" : true,
																		"paging" : false,

																		"footerCallback" : function(
																				row,
																				data,
																				start,
																				end,
																				display) {
																			var api = this
																					.api(), data;

																			// Remove the formatting to get integer data for summation
																			var intVal = function(
																					i) {
																				return typeof i === 'string' ? i
																						.replace(
																								/[\$,]/g,
																								'') * 1
																						: typeof i === 'number' ? i
																								: 0;
																			};
																			/*			 
																			 // Total over all pages
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
																			 */
																			total = api
																					.column(
																							5)
																					.data()
																					.reduce(
																							function(
																									a,
																									b) {
																								return intVal(a)
																										+ intVal(b);
																							},
																							0);
																			console
																					.log(total);

																			// Update footer
																			$(
																					api
																							.column(
																									5)
																							.footer())
																					.html(
																							'Rs'
																									+ ' '
																									+ total);
																			console
																					.log(total);

																			total = api
																					.column(
																							6)
																					.data()
																					.reduce(
																							function(
																									a,
																									b) {
																								return intVal(a)
																										+ intVal(b);
																							},
																							0);
																			console
																					.log(total);

																			// Update footer
																			$(
																					api
																							.column(
																									6)
																							.footer())
																					.html(
																							'Rs'
																									+ ' '
																									+ total);
																			console
																					.log(total);
																			/*
																			 total = api
																			 .column( 7 )
																			 .data()
																			 .reduce( function (a, b) {
																			 return intVal(a) + intVal(b);
																			 }, 0 ); 
																			 console.log(total); 
																			
																			
																			 // Update footer
																			 $( api.column( 7 ).footer() ).html(
																			 'Rs'+' '+total
																			 );
																			 console.log( total);
																			 */
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
								SupplierPaymentDao dao = new SupplierPaymentDao();
								List Lis1 = dao.getSupplierPaymentDetailForReport();
							%>
							<!-- <div id="demo_jui" style="text-align: center" > -->
								<div id="demo_jui" align="center">
<!-- 													<div class="container"> -->
							<!-- <div class="table-responsive" style="padding-top: 2%"> -->
								<table
									class="table table-bordered table-striped table-condensed cf"  style="text-align: center; align-content: center;" class="display" border="1">
									<thead>
										<tr>
											<th>Supplier Name</th>
											<th>Bill Number</th>
											<th>Payment Mode</th>
											<th>Accountant Name</th>
											<th>Total Amount</th>
											<th>Credit Amount</th>
											<th>Debit Amount</th>
											<th>Balance Amount</th>
										</tr>
									</thead>
<!-- 									<tfoot>
										<tr>
											<th colspan="5" style="text-align: right">Total:</th>
											<th></th>
											<th></th>
											<th></th>
										</tr>
									</tfoot> -->

									<tbody>
										<%
											for (int i = 0; i < Lis1.size(); i++) {
												SupplierPaymentDetail pro = (SupplierPaymentDetail) Lis1.get(i);
										%>
										<tr>
											<td class="align"><%=pro.getSupplierName()%></td>
											<td class="align"><%=pro.getBill()%></td>
											<td class="align"><%=pro.getPaymentMode()%></td>
											<td class="align"><%=pro.getAccountantName()%></td>
											<td class="align"><%=pro.getTotalAmount()%></td>
											<td class="align"><%=pro.getCreditAmount()%></td>
											<td class="align"><%=pro.getDebitAmount()%></td>
											<td class="align"><%=pro.getBalanceAmount()%></td>
										</tr>
										<%
											}
										%>

									</tbody>
								</table>
							</div>
						</div>

			<!--------------------------------------------- Supplier Name Wise -------------------------------------------------->
						
						<div id="supplierNAme" class="tab-pane ">
							<!-- div class="row">
								<div class="col-sm-offset-1 col-md-10">
									<hr style="border-top-color: #c1b1b1;">
								</div>
							</div> -->
							<form class="form-horizontal" method="post" action=""
								name="supReportBill">
								<fieldset>

									<div class="row form-group" style="padding-top: 30px">

										<label class="col-md-2 col-md-offset-3 control-label"
											for="supplier">Supplier Name</label>
										<div class="col-md-3">
											<div class="input-group">
												<span class="input-group-addon"> <i
													class="	glyphicon glyphicon-user"></i>
												</span>



												<!-- Following code is to get Supplier from "supplier_details" table of "fertilizer" DB -->
												<!-- getAllSupllier() is implemented in  SupplierDetailsDao with return type List-->

												<%
													SupplierDetailsDao sdd88 = new SupplierDetailsDao();
													List sList88 = sdd88.getAllSupplier(request);
												%>

												<input list="sup_drop7" id="supplier7" class="form-control"
													placeholder="Supplier Name">
												<datalist id="sup_drop7">

													<%
														for (int i = 0; i < sList88.size(); i++) {
															SupplierDetailsBean sup88 = (SupplierDetailsBean) sList88.get(i);
													%>

													<option data-value="<%=sup88.getSupId()%>"
														value="<%=sup88.getDealerName()%>">
														<%
															}
														%>
													
												</datalist>
											</div>
										</div>
									</div>
									<div class="row" style="padding-top: 2%">
										<div class="col-md-3 col-md-offset-5 ">
											<div class="input-group">
												<input type="button" id="btn" name="save"
													class="btn  btn-success "
													style="height: 38px; width: 121px; font-size: 18"
													onclick="getSupNameWiseReportValidation()" value="Search" />
											</div>
										</div>
									</div>
 							<div class="container"> 
<!-- 								<div class="table-responsive" align="center" style="padding-top:2%"> -->
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="supplierNameWiseTable" class="display">
											<thead>
												<tr>
													<th>Supplier Name</th>
													<th>Bill Number</th>
													<th>Payment Mode</th>
													<th>Accountant Name</th>
													<th>Payment Date</th>
													<th>Total Amount</th>
													<th>Credit Amount</th>
													<th>Debit Amount</th>
													<th>Balance Amount</th>
												</tr>
											</thead>
											<tfoot>
												<tr>
													<th colspan="6" style="text-align: right">Total:</th>
													<th></th>
													<th></th>
 													 <th></th> 

												</tr>
											</tfoot>
										</table>
										<div class="pagination-page">
                                            <nav aria-label="...">
                                               <ul class="pagination" style="/* margin-top:-10px; */ margin-bottom: 40px;">
                                                   <li class="page-item disabled">
                                                        <a class="page-link" href="#">Previous</a>
                                                   </li>
                                                <!-- <li class="page-item"><a class="page-link" href="#">1</a></li> -->
                                                   <li class="page-item">
                                                        <span class="page-link">
                                                                1
                                                       <span class="sr-only">(current)</span>
                                                       </span>
                                                   </li>
                                                <!--  <li class="page-item"><a class="page-link" href="#">3</a></li> -->
                                                   <li class="page-item">
                                                        <a class="page-link" href="#">Next</a>
                                                   </li>
                                               </ul>
                                           </nav>
                                       </div>
									</div>
								</fieldset>
							</form>
						</div>
						
		<!-------------------------------------------------------- Bill number wise ----------------------------------------------------------------->
						
						<div id="supplierBillWise" class="tab-pane ">
							<!-- <div class="row">
								<div class="col-sm-offset-1 col-md-10">
									<hr style="border-top-color: #c1b1b1;">
								</div>
							</div> -->
							<form class="form-horizontal" method="post" action=""
								name="supReportBill">
								<fieldset>

									<div class="row form-group" style="padding-top: 30px">
										<label class="col-md-3 control-label" for="supplier">Supplier
											Name</label>
										<div class="col-md-3">
											<div class="input-group">
												<span class="input-group-addon"> <i
													class="	glyphicon glyphicon-user"></i>
												</span>

												<!-- Following code is to get Supplier from "supplier_details" table of "fertilizer" DB -->
												<!-- getAllSupllier() is implemented in  SupplierDetailsDao with return type List-->

												<%
													SupplierDetailsDao sdd = new SupplierDetailsDao();
													List sList = sdd.getAllSupplier(request);
												%>

												<input list="sup_drop" id="supplier"
													placeholder="supplier name"
													onchange="bill.getAllSupplierBillsForReports();"
													class="form-control">
												<datalist id="sup_drop">

													<%
														for (int i = 0; i < sList.size(); i++) {
															SupplierDetailsBean sup = (SupplierDetailsBean) sList.get(i);
													%>

													<option data-value="<%=sup.getSupId()%>"
														value="<%=sup.getDealerName()%>">
														<%
															}
														%>
													
												</datalist>
											</div>
										</div>

										<label class="col-md-2 control-label" for="bill_no">
											Bill No </label>
										<div class="col-md-3">
											<div class="input-group">
												<span class="input-group-addon"> No </span> <select
													class="form-control input-md" id='billNo' name="billNo">
												</select>
											</div>
										</div>
									</div>
									<div class="row form-group" style="padding-top: 2%">
										<div class="col-md-3 col-md-offset-5">
											<div class="input-group">
												<input type="button" id="btn" name="save"
													class="btn btn-success "
													style="height: 38px; width: 121px; font-size: 18"
													onclick="getBillWiseReportvalidation()" value="Search" />
											</div>
										</div>
									</div>
																<div class="container">
<!-- 									<div class="table-responsive" style="Padding-top: 2%"> -->
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="supplierBillWiseData" class="display">
											<thead>
												<tr>
													<th>Supplier Name</th>
													<th>Bill Number</th>
													<th>Payment Mode</th>
													<th>Accountant Name</th>
													<th>Payment Date</th>
													<th>Total Amount</th>
													<th>Credit Amount</th>
													<th>Debit Amount</th>
													<th>Balance Amount</th>
												</tr>
											</thead>
											<tfoot>
<!-- 												<tr>
													<th colspan="5" style="text-align: right">Total:</th>
													<th></th>
													<th></th>
													<th></th>
													<th></th> 
												</tr> -->
											</tfoot>
										</table>
										<div class="pagination-page">
                                            <nav aria-label="...">
                                               <ul class="pagination" style="margin-top:-10px; margin-bottom: 40px;">
                                                   <li class="page-item disabled">
                                                        <a class="page-link" href="#">Previous</a>
                                                   </li>
                                                <!-- <li class="page-item"><a class="page-link" href="#">1</a></li> -->
                                                   <li class="page-item">
                                                        <span class="page-link">
                                                                1
                                                       <span class="sr-only">(current)</span>
                                                       </span>
                                                   </li>
                                                <!--  <li class="page-item"><a class="page-link" href="#">3</a></li> -->
                                                   <li class="page-item">
                                                        <a class="page-link" href="#">Next</a>
                                                   </li>
                                               </ul>
                                           </nav>
                                       </div>
									</div>
								</fieldset>
							</form>

						</div>


		<!---------------------------------------------------------- Date Wise ----------------------------------------------------------->
		
						<div id="supplierSingleDate" class="tab-pane">
							<!-- <div class="row">
								<div class="col-sm-offset-1 col-md-10">
									<hr style="border-top-color: #c1b1b1;">
								</div>
							</div> -->
							<form class="form-horizontal" method="post" action=""
								name="supReport">
								<fieldset>

									<div class="row form-group" style="padding-top: 30px">
										<label class="col-md-2  col-md-offset-3 control-label" for="">
											Enter Date:<sup>*</sup>
										</label>
										<div class="col-md-3">
											<div class="input-group">
												<span class="input-group-addon"> <i
													class="glyphicon glyphicon-calendar"></i>
												</span> <input type="date" id="fDate11" placeholder="Start Date"
													class="form-control input-md" type="text">
											</div>
										</div>
									</div>

									<div class="row" style="padding-top: 2%">
										<div class="col-md-3 col-md-offset-5">
											<div class="input-group">
												<input type="button" id="btn" name="save"
													class="btn btn-success "
													style="height: 38px; width: 121px; font-size: 18"
													onclick="supplierReportForSingleDate()" value="Search" />
											</div>
										</div>
									</div>
									<div class="container">
<!-- 									<div class="table-responsive" style="Padding-top: 3%"> -->
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="supplierSingleDatetable" class="display">
											<thead>
												<tr>
													<th>Supplier Name</th>
													<th>Bill Number</th>
													<th>Payment Mode</th>
													<th>Accountant Name</th>
													<th>Payment Date</th>
													<th>Total Amount</th>
													<th>Credit Amount</th>
													<th>Debit Amount</th>
													<th>Balance Amount</th>
												</tr>
											</thead>
<!-- 											<tfoot>
												<tr>
													<th colspan="6" style="text-align: right">Total:</th>
													<th></th>
													<th></th>
													<th></th>
												</tr>
											</tfoot> -->
										</table>
										<div class="pagination-page">
                                            <nav aria-label="...">
                                               <ul class="pagination" style="margin-top:-10px; margin-bottom: 40px;">
                                                   <li class="page-item disabled">
                                                        <a class="page-link" href="#">Previous</a>
                                                   </li>
                                                <!-- <li class="page-item"><a class="page-link" href="#">1</a></li> -->
                                                   <li class="page-item">
                                                        <span class="page-link">
                                                                1
                                                       <span class="sr-only">(current)</span>
                                                       </span>
                                                   </li>
                                                <!--  <li class="page-item"><a class="page-link" href="#">3</a></li> -->
                                                   <li class="page-item">
                                                        <a class="page-link" href="#">Next</a>
                                                   </li>
                                               </ul>
                                           </nav>
                                       </div>
									</div>
								</fieldset>
							</form>

						</div>

		<!------------------------------------------------ Range Wise Between Two Dates  ---------------------------------------------->
		
						<div id="supplierBetweenTwoDate" class="tab-pane fade">

							<!-- <div class="row">
								<div class="col-sm-offset-1 col-md-10">
									<hr style="border-top-color: #c1b1b1;">
								</div>
							</div>
 -->

							<form class="form-horizontal" method="post" action=""
								name="supReport1">
								<fieldset>
									<div class="row form-group" style="padding-top: 30px">
										<label class="col-md-3 control-label" for="supplier">Supplier
											Name</label>
										<div class="col-md-3">
											<div class="input-group">
												<span class="input-group-addon"> <i
													class="	glyphicon glyphicon-user"></i>
												</span>



												<!-- Following code is to get Supplier from "supplier_details" table of "fertilizer" DB -->
												<!-- getAllSupllier() is implemented in  SupplierDetailsDao with return type List-->

												<%
													SupplierDetailsDao sdd8 = new SupplierDetailsDao();
													List sList8 = sdd8.getAllSupplier(request);
												%>

												<input list="sup_drop8" id="supplier8" class="form-control"	placeholder="Selcet Supplier Name">
												<datalist id="sup_drop8">

													<%
														for (int i = 0; i < sList88.size(); i++) {
															SupplierDetailsBean sup88 = (SupplierDetailsBean) sList88.get(i);
													%>

													<option data-value="<%=sup88.getSupId()%>"
														value="<%=sup88.getDealerName()%>">
														<%
															}
														%>
													
												</datalist>
											</div>
										</div>
									</div>
									<div class="row form-group">
										<label class="col-md-3 control-label" for="startDate">
											Start Date:<sup>*</sup>
										</label>
										<div class="col-md-3">
											<div class="input-group">
												<span class="input-group-addon"> <i
													class="glyphicon glyphicon-calendar"></i>
												</span> <input type="date" id="fisDate1" placeholder="Start Date"
													class="form-control input-md" type="text">
											</div>
										</div>

										<label class="col-md-2 control-label" for="endDate">End
											Date:<sup>*</sup>
										</label>
										<div class="col-md-3">
											<div class="input-group">
												<span class="input-group-addon"> <i
													class="glyphicon glyphicon-calendar"></i>
												</span> <input type="date" id="endDate1" placeholder="End Date"
													class="form-control input-md ac_district" type="text">
											</div>
										</div>
									</div>

									<div class="row form-group buttons_margin_top ">
										<div align="center">

											<input type="button" id="btn" name="save"
												class="btn btn-success"
												style="height: 38px; width: 121px; font-size: 18"
												onclick="getSupplierDetailsBetweenTwoDatesValidation()"
												value="Search" />

										</div>
									</div>
									<div class="container">
<!-- 									<div class="table-responsive" style="padding-top: 2%"> -->
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="supplierBetweenTwoDatestable" class="display">
											<thead>
												<tr>
													<th>Supplier Name</th>
													<th>Bill Number</th>
													<th>Payment Mode</th>
													<th>Accountant Name</th>
													<th>Payment Date</th>
													<th>Total Amount</th>
													<th>Credit Amount</th>
													<th>Debit Amount</th>
													<th>Balance Amount</th>
												</tr>
											</thead>
											<tfoot>
												<tr>
													<th colspan="6" style="text-align: right">Total:</th>
													<th></th>
													<th></th>
													<th></th>


												</tr>
											</tfoot>
										</table>
										<div class="pagination-page">
                                            <nav aria-label="...">
                                               <ul class="pagination" style="margin-top:-10px; margin-bottom: 40px;">
                                                   <li class="page-item disabled">
                                                        <a class="page-link" href="#">Previous</a>
                                                   </li>
                                                <!-- <li class="page-item"><a class="page-link" href="#">1</a></li> -->
                                                   <li class="page-item">
                                                        <span class="page-link">
                                                                1
                                                       <span class="sr-only">(current)</span>
                                                       </span>
                                                   </li>
                                                <!--  <li class="page-item"><a class="page-link" href="#">3</a></li> -->
                                                   <li class="page-item">
                                                        <a class="page-link" href="#">Next</a>
                                                   </li>
                                               </ul>
                                           </nav>
                                       </div>
									</div>
								</fieldset>
							</form>


						</div>
						
						<!-- payment mode -->
												<div id="supplierpaymentmode" class="tab-pane fade">


							<form class="form-horizontal" method="post" action=""
								name="supReport10">
								<fieldset>
									
									<div class="row form-group" style="padding-top: 30px">
										<label class="col-md-3 control-label" for="customerName">Payment
											Mode</label>
										<div class="col-md-3">
											<div class="input-group">
												<span class="input-group-addon"> <i
													class="glyphicon glyphicon-user"></i>
												</span>

												<select class="form-control" id="paymentMode1">
										<option value="cash">Cash</option>
										<option value="cheque">Cheque</option>
										<option value="card">Card</option>
										<option value="neft">NEFT</option>
										<option value="UPI Payment">UPI Payment</option>
												</select>	
											</div>
										</div>
									</div>
									<div class="row form-group">
										<label class="col-md-3 control-label" for="startDate1">
											Start Date:<sup>*</sup>
										</label>
										<div class="col-md-3">
											<div class="input-group">
												<span class="input-group-addon"> <i
													class="glyphicon glyphicon-calendar"></i>
												</span> <input type="date" id="payfisDate1" placeholder="Start Date"
													class="form-control input-md" type="text">
											</div>
										</div>

										<label class="col-md-2 control-label" for="village">End
											Date:<sup>*</sup>
										</label>
										<div class="col-md-3">
											<div class="input-group">
												<span class="input-group-addon"> <i
													class="glyphicon glyphicon-calendar"></i>
												</span> <input type="date" id="payendDate1" placeholder="End Date"
													class="form-control input-md ac_district" type="text">
											</div>
										</div>
									</div>

									<div class="row form-group buttons_margin_top ">
										<div align="center">

											<input type="button" id="btn" name="save"
												class="btn btn-success"
												style="height: 38px; width: 121px; font-size: 18"
												onclick="getSupplierDetailspaymode()"
												value="Search" />

										</div>
									</div>
													<div class="container">
<!-- 									<div class="table-responsive" style="padding-top: 2%"> -->
										<table
											class="table table-bordered table-striped table-condensed  cf"
											id="supplierpaymodetable" class="display">
											<thead>
												<tr>
													<th>Supplier Name</th>
													<th>Bill Number</th>
													<th>Payment Mode</th>
													<th>Accountant Name</th>
													<th>Payment Date</th>
													<th>Total Amount</th>
													<th>Credit Amount</th>
													<th>Debit Amount</th>
													<th>Balance Amount</th>
												</tr>
											</thead>
											<tfoot>
												<tr>
													<th colspan="6" style="text-align: right">Total:</th>
													<th></th>
													<th></th>
													<th></th>


												</tr>
											</tfoot>
										</table>
										<div class="pagination-page">
                                            <nav aria-label="...">
                                               <ul class="pagination" style="margin-top:-10px; margin-bottom: 40px;">
                                                   <li class="page-item disabled">
                                                        <a class="page-link" href="#">Previous</a>
                                                   </li>
                                                <!-- <li class="page-item"><a class="page-link" href="#">1</a></li> -->
                                                   <li class="page-item">
                                                        <span class="page-link">
                                                                1
                                                       <span class="sr-only">(current)</span>
                                                       </span>
                                                   </li>
                                                <!--  <li class="page-item"><a class="page-link" href="#">3</a></li> -->
                                                   <li class="page-item">
                                                        <a class="page-link" href="#">Next</a>
                                                   </li>
                                               </ul>
                                           </nav>
                                       </div>
									</div>
								</fieldset>
							</form>


						</div>
						
						
					</div>

				</div>


				<!------------------------------------------------ Customer Payment Reports ----------------------------------------------->

				<div class="tab-pane" id="profile">
					<div class="row">
						<div align="center">
							<h2 class="form-name style_heading">Credit Customer Payment
								Reports</h2>
						</div>

						<div class="row">
							<div class="col-sm-offset-1 col-md-10">
								<hr style="border-top-color: #c1b1b1;">
							</div>
						</div>
					</div>

					<ul class="nav nav-tabs">
						<!--  <li class="active"><a data-toggle="tab" href="#AllCustomer"><h4 style="color:blue">All Customer's</h4></a></li> -->
						<li class="active"><a data-toggle="tab"
							href="#customerNameWise" style="border-radius: 23px;"><h4>Customer
									Name wise</h4></a></li>
						<li><a data-toggle="tab" href="#customerBillWise"
							style="border-radius: 23px;"><h4>Bill Number Wise</h4></a></li>
						<li><a data-toggle="tab" href="#customerSingleDate"
							style="border-radius: 23px;"><h4>Datewise</h4></a></li>
						<li><a data-toggle="tab" href="#customerBetweenTwoDate"
							style="border-radius: 23px;"><h4>Range</h4></a></li>
					<li><a data-toggle="tab" href="#paymentBetweenTwoDate"
							style="border-radius: 23px;"><h4>Payment Mode</h4></a></li>
					</ul>

					<div class="tab-content" style="float: left">

						<%-- <div id="AllCustomer" class="tab-pane fade in active">
    	<div id="report" style="text-align: center">
		<label id="demo1" ></label>
		<script>
		   var date = new Date();
		   document.getElementById("demo1").innerHTML = date.toDateString();
		</script>
	</div>

	<script type="text/javascript"> 
		$(document).ready(function () {
			var table=$("#Customerlist").dataTable({
				
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
			/* var tableTools = new $.fn.dataTable.TableTools(table, {
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
	CustomerPaymentDao custdao =new CustomerPaymentDao();
	List ListCust=custdao.getCreditCustomerPaymentDetailForReport();
	
	%>
	<div id="demo_jui1" style="text-align: center">
		<table id="Customerlist" class="display" border="1">
			<thead>
				<tr>
					<th>Customer First Name</th>
					<th>Customer Last Name</th>
	                <th>Category Name</th>
					<th>Bill Number</th>
					<th>Total Amount</th>
					<th>Balance Amount</th>
	                <th>Payment Type</th>
					<th>Payment Amount</th>
					<th>Payment Mode</th>
					<th>Accountantant Name</th>
				</tr>
			</thead>
			<!-- <tfoot>
							<tr>
								<th colspan="4" style="text-align: right">Total:</th>
								<th></th><th></th>
				
				
							</tr>
						</tfoot> -->
			
			<tbody>
   				<%
					for(int i=0;i<ListCust.size();i++){
						CreditCustPaymentDetail pro = (CreditCustPaymentDetail)ListCust.get(i);
				%>
				<tr>
					<td class="align"><%=pro.getCreditCustomerFirstName()%></td>
					<td class="align"><%=pro.getCreditCustomerLastName()%></td>
					<td class="align"><%=pro.getCatName()%></td>
					<td class="align"><%=pro.getBillNo()%></td>
					<td class="align"><%=pro.getTotalAmount()%></td>
					<td class="align"><%=pro.getBalanceAmount()%></td>
					<td class="align"><%=pro.getPaymentType()%></td>
					<td class="align"><%=pro.getPaymentAmount()%></td>
					<td class="align"><%=pro.getPaymentMode()%></td>
					<td class="align"><%=pro.getAccountantName()%></td>
					
				</tr>
				<%
					}
				%>
				
			</tbody>
		</table>
	</div>
 </div> --%>


						<!-- 	Customer Name wise -->
						<div id="customerNameWise" class="tab-pane fade in active">
							<!-- <div class="row">
								<div class="col-sm-offset-1 col-md-10">
									<hr style="border-top-color: #c1b1b1;">
								</div>
							</div> -->
							<form class="form-horizontal" method="post" action=""
								name="supReportBill">
								<fieldset>
									<div class="row form-group" style="padding-top: 30px">
										<label class="col-md-2 col-md-offset-3 control-label"
											for="customerName">Customer Name</label>
										<div class="col-md-3">
											<div class="input-group">
												<span class="input-group-addon"> <i
													class="glyphicon glyphicon-user"></i>
												</span>

												<%
													CustomerDetailsDao custdao1 = new CustomerDetailsDao();
													List custList2 = custdao1.getAllCustomer(request);
												%>
												<input list="cust_drop5" id="creditCustomer5"
													placeholder="Customer Name" class="form-control">
												<datalist id="cust_drop5">

													<%
														for (int i = 0; i < custList2.size(); i++) {
															CustomerDetailsBean cust2 = (CustomerDetailsBean) custList2.get(i);
													%>

													<option data-value="<%=cust2.getCustId()%>"><%=cust2.getFirstName()%>
														<%=cust2.getLastName()%>
													</option>
													<%
														}
													%>
												</datalist>
											</div>
										</div>
									</div>
									<div class="row" style="padding-top: 2%">
										<div class="col-md-3 col-md-offset-5">
											<div class="input-group">
												<input type="button" id="btn" name="save"
													class="btn  btn-success "
													style="height: 38px; width: 121px; font-size: 18"
													onclick="getCreditCustomerReportNameWiseValidation()"
													value="Search" />
											</div>
										</div>
									</div>
									<div class="table-responsive" style="padding-top: 3%">
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="customerNameWiseData2" class="display">
											<thead>
												<tr>
													<th>First Name</th>
													<th>Last Name</th>
													<th>Bill Number</th>
													<th>Payment Date</th>
													<th>Payment Mode</th>
													<th>Total Amount</th>
													<th>Credit Amount</th>
													<th>Debit Amount</th>
													<th>Balance Amount</th>
												</tr>
											</thead>
											<tfoot>
												<tr>
													<th colspan="5" style="text-align: right">Total Rs:</th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
												</tr>
											</tfoot>
										</table>
										<div class="pagination-page">
                                            <nav aria-label="...">
                                               <ul class="pagination" style="margin-top:-10px; margin-bottom: 40px;">
                                                   <li class="page-item disabled">
                                                        <a class="page-link" href="#">Previous</a>
                                                   </li>
                                                <!-- <li class="page-item"><a class="page-link" href="#">1</a></li> -->
                                                   <li class="page-item">
                                                        <span class="page-link">
                                                                1
                                                       <span class="sr-only">(current)</span>
                                                       </span>
                                                   </li>
                                                <!--  <li class="page-item"><a class="page-link" href="#">3</a></li> -->
                                                   <li class="page-item">
                                                        <a class="page-link" href="#">Next</a>
                                                   </li>
                                               </ul>
                                           </nav>
                                       </div>
									</div>
								</fieldset>
							</form>
						</div>


						<!-- Customer Bill number wise -->
						<div id="customerBillWise" class="tab-pane">
							<!-- <div class="row">
								<div class="col-sm-offset-1 col-md-10">
									<hr style="border-top-color: #c1b1b1;">
								</div>
							</div> -->
							<form class="form-horizontal" method="post" action=""
								name="supReportBill">
								<fieldset>

									<div class="row form-group" style="padding-top: 30px">
										<label class="col-md-3 control-label" for="customerName">Customer
											Name</label>
										<div class="col-md-3">
											<div class="input-group">
												<span class="input-group-addon"> <i
													class="glyphicon glyphicon-user"></i>
												</span>

												<%
													CustomerDetailsDao cdd = new CustomerDetailsDao();
													List cList = cdd.getAllCustomer(request);
												%>
												<input list="cust_drop" id="creditCustomer"
													class="form-control" placeholder="Customer Name"
													onchange="getBillByCustomerForReport()">
												<datalist id="cust_drop">

													<%
														for (int i = 0; i < cList.size(); i++) {
															CustomerDetailsBean cust = (CustomerDetailsBean) cList.get(i);
													%>

													<option data-value="<%=cust.getCustId()%>"><%=cust.getCustId()%>
														<%=cust.getFirstName()%>
														<%=cust.getLastName()%>
													</option>
													<%
														}
													%>
												</datalist>
											</div>
										</div>


										<!-- PRODUCT CATEGORY CODE GOES HERE [[[[Credit Customer Payment Reports ---- Bill Number Wise ----- Product Category   -->


										<label class="col-md-2 control-label" for="bill_no">
											Bill No </label>
										<div class="col-md-3">
											<div class="input-group">
												<span class="input-group-addon"> No </span> <select
													class="form-control input-md" id='billNo1' name="billNo">
												</select>
											</div>
										</div>

										<div class="row ">
											<div class="col-md-3  col-md-offset-5"
												style="padding-top: 3%">
												<div class="input-group">
													<input type="button" id="btn" name="save"
														class="btn  btn-success "
														style="height: 38px; width: 121px; font-size: 18"
														onclick="getBillWiseCreditReportValidation()"
														value="Search" />
												</div>
											</div>
										</div>
										<div class="table-responsive" style="padding-top: 3%">
											<table
												class="table table-bordered table-striped table-condensed cf"
												id="customerNameWiseData" class="display">
												<thead>
													<tr>
														<th>First Name</th>
														<th>Last Name</th>
														<th>Bill Number</th>
														<th>Payment Date</th>
														<th>Payment Mode</th>
														<th>Total Amount</th>
														<th>Credit Amount</th>
														<th>Debit Amount</th>
														<th>Balance Amount</th>
													</tr>
												</thead>
												<tfoot>
													<tr>
														<th colspan="6" style="text-align: right">Total:</th>
														<th></th>
														<th></th>
														<th></th>
													</tr>
												</tfoot>
											</table>
											<div class="pagination-page">
                                            <nav aria-label="...">
                                               <ul class="pagination" style="margin-top:-10px; margin-bottom: 40px;">
                                                   <li class="page-item disabled">
                                                        <a class="page-link" href="#">Previous</a>
                                                   </li>
                                                <!-- <li class="page-item"><a class="page-link" href="#">1</a></li> -->
                                                   <li class="page-item">
                                                        <span class="page-link">
                                                                1
                                                       <span class="sr-only">(current)</span>
                                                       </span>
                                                   </li>
                                                <!--  <li class="page-item"><a class="page-link" href="#">3</a></li> -->
                                                   <li class="page-item">
                                                        <a class="page-link" href="#">Next</a>
                                                   </li>
                                               </ul>
                                           </nav>
                                       </div>
										</div>
								</fieldset>
							</form>

						</div>


						<!--    for single date -->
						<div id="customerSingleDate" class="tab-pane">
							<!-- <div class="row">
								<div class="col-sm-offset-1 col-md-10">
									<hr style="border-top-color: #c1b1b1;">
								</div>
							</div> -->
							<form class="form-horizontal" method="post" action=""
								name="custReport">
								<fieldset>

									<div class="row form-group" style="padding-top: 30px">
										<label class="col-md-2 col-md-offset-3 control-label" for="">
											Enter Date:<sup>*</sup>
										</label>
										<div class="col-md-3">
											<div class="input-group">
												<span class="input-group-addon"> <i
													class="glyphicon glyphicon-calendar"></i>
												</span> <input type="date" id="fDate1" placeholder="Start Date"
													class="form-control input-md" type="text">
											</div>
										</div>
									</div>

									<div class="row" style="padding-top: 2%">
										<div class="col-md-3 col-md-offset-5">
											<div class="input-group">
												<input type="button" id="btn" name="save"
													style="height: 38px; width: 121px; font-size: 18"
													class="btn  btn-success "
													onclick="creditCustReportForSingleDateValidate()"
													value="Search" />
											</div>
										</div>
									</div>
									<div class="table-responsive" style="padding-top: 3%">
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="customerSingleDatetable" class="display">
											<thead>
												<tr>
													<th>First Name</th>
													<th>Last Name</th>
													<th>Bill Number</th>
													<th>Payment Date</th>
													<th>Payment Mode</th>
													<th>Total Amount</th>
													<th>Credit Amount</th>
													<th>Debit Amount</th>
													<th>Balance Amount</th>
												</tr>
											</thead>
											<tfoot>
												<tr>
													<th colspan="6" style="text-align: right">Total:</th>
													<th></th>
													<th></th>
													<th></th>


												</tr>
											</tfoot>
										</table>
										<div class="pagination-page">
                                            <nav aria-label="...">
                                               <ul class="pagination" style="margin-top:-10px; margin-bottom: 40px;">
                                                   <li class="page-item disabled">
                                                        <a class="page-link" href="#">Previous</a>
                                                   </li>
                                                <!-- <li class="page-item"><a class="page-link" href="#">1</a></li> -->
                                                   <li class="page-item">
                                                        <span class="page-link">
                                                                1
                                                       <span class="sr-only">(current)</span>
                                                       </span>
                                                   </li>
                                                <!--  <li class="page-item"><a class="page-link" href="#">3</a></li> -->
                                                   <li class="page-item">
                                                        <a class="page-link" href="#">Next</a>
                                                   </li>
                                               </ul>
                                           </nav>
                                       </div>
									</div>
								</fieldset>
							</form>

						</div>

						<!------ 	Between Two Dates  ----->
						<div id="customerBetweenTwoDate" class="tab-pane fade">

							<!-- <div class="row">
								<div class="col-sm-offset-1 col-md-10">
									<hr style="border-top-color: #c1b1b1;">
								</div>
							</div> -->


							<form class="form-horizontal" method="post" action=""
								name="custReport1">
								<fieldset>
									<div class="row form-group" style="padding-top: 30px">
										<label class="col-md-3 control-label" for="customerName">Customer
											Name</label>
										<div class="col-md-3">
											<div class="input-group">
												<span class="input-group-addon"> <i
													class="glyphicon glyphicon-user"></i>
												</span>

												<%
													CustomerDetailsDao custdao2 = new CustomerDetailsDao();
													List custList3 = custdao2.getAllCustomer(request);
												%>
												<input list="cust_drop6" id="creditCustomer6"
													placeholder="Customer Name" class="form-control">
												<datalist id="cust_drop6">

													<%
														for (int i = 0; i < custList3.size(); i++) {
															CustomerDetailsBean cust2 = (CustomerDetailsBean) custList3.get(i);
													%>

													<option data-value="<%=cust2.getCustId()%>"><%=cust2.getFirstName()%>
														<%=cust2.getLastName()%>
													</option>
													<%
														}
													%>
												</datalist>
											</div>
										</div>
									</div>
									<div class="row form-group">
										<label class="col-md-3 control-label" for="startDate">
											Start Date:<sup>*</sup>
										</label>
										<div class="col-md-3">
											<div class="input-group">
												<span class="input-group-addon"> <i
													class="glyphicon glyphicon-calendar"></i>
												</span> <input type="date" id="fisDate" placeholder="Start Date"
													class="form-control input-md" type="text">
											</div>
										</div>

										<label class="col-md-2 control-label" for="village">End
											Date:<sup>*</sup>
										</label>
										<div class="col-md-3">
											<div class="input-group">
												<span class="input-group-addon"> <i
													class="glyphicon glyphicon-calendar"></i>
												</span> <input type="date" id="endDate" placeholder="End Date"
													class="form-control input-md ac_district" type="text">
											</div>
										</div>
									</div>

									<div class="row form-group " style="padding-top: 2%">
										<div align="center">

											<input type="button" id="btn" name="save"
												class="btn  btn-success "
												style="height: 38px; width: 121px; font-size: 18"
												onclick="getCreditCustomerDetailsBetweenTwoDatesValidate()"
												value="Search" />

										</div>
									</div>
									<div class="table-responsive" style="padding-top: 2%">
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="customerBetweenTwoDates" class="display">
											<thead>
												<tr>
													<th>First Name</th>
													<th>Last Name</th>
													<th>Bill Number</th>
													<th>Payment Date</th>
													<th>Payment Mode</th>
													<th>Total Amount</th>
													<th>Credit Amount</th>
													<th>Debit Amount</th>
													<th>Balance Amount</th>
												</tr>
											</thead>
											<tfoot>
												<tr>
													<th colspan="6" style="text-align: right">Total:</th>
													<th></th>
													<th></th>
													<th></th>


												</tr>
											</tfoot>
										</table>
										<div class="pagination-page">
                                            <nav aria-label="...">
                                               <ul class="pagination" style="margin-top:-10px; margin-bottom: 40px;">
                                                   <li class="page-item disabled">
                                                        <a class="page-link" href="#">Previous</a>
                                                   </li>
                                                <!-- <li class="page-item"><a class="page-link" href="#">1</a></li> -->
                                                   <li class="page-item">
                                                        <span class="page-link">
                                                                1
                                                       <span class="sr-only">(current)</span>
                                                       </span>
                                                   </li>
                                                <!--  <li class="page-item"><a class="page-link" href="#">3</a></li> -->
                                                   <li class="page-item">
                                                        <a class="page-link" href="#">Next</a>
                                                   </li>
                                               </ul>
                                           </nav>
                                       </div>
									</div>
								</fieldset>
							</form>


						</div>
						
						<!-- payment mode -->
						
												<div id="paymentBetweenTwoDate" class="tab-pane fade">

							<!-- <div class="row">
								<div class="col-sm-offset-1 col-md-10">
									<hr style="border-top-color: #c1b1b1;">
								</div>
							</div> -->


							<form class="form-horizontal" method="post" action=""
								name="custReport1">
								<fieldset>
									<div class="row form-group" style="padding-top: 30px">
										<label class="col-md-3 control-label" for="customerName">Payment
											Mode</label>
										<div class="col-md-3">
											<div class="input-group">
												<span class="input-group-addon"> <i
													class="glyphicon glyphicon-user"></i>
												</span>

												<select class="form-control" id="paymentMode">
										<option value="cash">Cash</option>
										<option value="cheque">Cheque</option>
										<option value="card">Card</option>
										<option value="neft">NEFT</option>
																<option value="UPI Payment">UPI Payment</option>				
												</select>	
											</div>
										</div>
									</div>
									<div class="row form-group">
										<label class="col-md-3 control-label" for="startDate">
											Start Date:<sup>*</sup>
										</label>
										<div class="col-md-3">
											<div class="input-group">
												<span class="input-group-addon"> <i
													class="glyphicon glyphicon-calendar"></i>
												</span> <input type="date" id="payfisDate" placeholder="Start Date"
													class="form-control input-md" type="text">
											</div>
										</div>

										<label class="col-md-2 control-label" for="village">End
											Date:<sup>*</sup>
										</label>
										<div class="col-md-3">
											<div class="input-group">
												<span class="input-group-addon"> <i
													class="glyphicon glyphicon-calendar"></i>
												</span> <input type="date" id="payendDate" placeholder="End Date"
													class="form-control input-md ac_district" type="text">
											</div>
										</div>
									</div>

									<div class="row form-group " style="padding-top: 2%">
										<div align="center">

											<input type="button" id="btn" name="save"
												class="btn  btn-success "
												style="height: 38px; width: 121px; font-size: 18"
												onclick="getpayDetailsBetweenTwoDatesValidate()"
												value="Search" />

										</div>
									</div>
									<div class="table-responsive" style="padding-top: 2%">
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="paymentBetweenTwoDates" class="display">
											<thead>
												<tr>
													<th>First Name</th>
													<th>Last Name</th>
													<th>Bill Number</th>
													<th>Payment Date</th>
													<th>Payment Mode</th>
													<th>Total Amount</th>
													<th>Credit Amount</th>
													<th>Debit Amount</th>
													<th>Balance Amount</th>
												</tr>
											</thead>
											<tfoot>
												<tr>
													<th colspan="6" style="text-align: right">Total:</th>
													<th></th>
													<th></th>
													<th></th>


												</tr>
											</tfoot>
										</table>
										<div class="pagination-page">
                                            <nav aria-label="...">
                                               <ul class="pagination" style="margin-top:-10px; margin-bottom: 40px;">
                                                   <li class="page-item disabled">
                                                        <a class="page-link" href="#">Previous</a>
                                                   </li>
                                                <!-- <li class="page-item"><a class="page-link" href="#">1</a></li> -->
                                                   <li class="page-item">
                                                        <span class="page-link">
                                                                1
                                                       <span class="sr-only">(current)</span>
                                                       </span>
                                                   </li>
                                                <!--  <li class="page-item"><a class="page-link" href="#">3</a></li> -->
                                                   <li class="page-item">
                                                        <a class="page-link" href="#">Next</a>
                                                   </li>
                                               </ul>
                                           </nav>
                                       </div>
									</div>
								</fieldset>
							</form>


						</div>
						
					</div>

				</div>

				<!----- 	Employee Payment reports ------>
				<div class="tab-pane" id="messages">
					<div class="row">
						<div align="center">
							<h2 class="form-name style_heading">Employee Payment Reports</h2>
						</div>

						<div class="row">
							<div class="col-sm-offset-1 col-md-10">
								<hr style="border-top-color: #c1b1b1;">
							</div>
						</div>
					</div>

					<ul class="nav nav-tabs">
						<li class="active"><a data-toggle="tab"
							href="#employeeSingleDate" style="border-radius: 23px;"><h4>Datewise</h4></a></li>
						<li><a data-toggle="tab" href="#empBetweenTwoDate"
							style="border-radius: 23px;"><h4>Range</h4></a></li>
				<li><a data-toggle="tab" href="#emppaymode"
							style="border-radius: 23px;"><h4>Payment Mode</h4></a></li>

					</ul>

					<div class="tab-content" style="float: left">

						<!--    for single date -->
						<div id="employeeSingleDate" class="tab-pane fade in active">
							<!-- <div class="row">
								<div class="col-sm-offset-1 col-md-10">
									<hr style="border-top-color: #c1b1b1;">
								</div>
							</div> -->
							<form class="form-horizontal" method="post" action=""
								name="empReport">
								<fieldset>

									<div class="row form-group" style="padding-top: 30px">
										<label class="col-md-2  col-md-offset-3 control-label" for="">
											Enter Date:<sup>*</sup>
										</label>
										<div class="col-md-3">
											<div class="input-group">
												<span class="input-group-addon"> <i
													class="glyphicon glyphicon-calendar"></i>
												</span> <input type="date" id="fDate2" placeholder="Start Date"
													class="form-control input-md" type="text">
											</div>
										</div>
									</div>

									<div class="row" style="padding-top: 2%">
										<div class="col-md-3 col-md-offset-5">
											<div class="input-group">
												<input type="button" id="btn" name="save"
													class="btn btn-success " style="height: 38px; width: 121px; font-size: 18"
													onclick="employeePaymentReportForSingleDateValidate()"
													value="Search" />
											</div>
										</div>
									</div>
									<div class="table-responsive" style="padding-top: 3%">
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="employeeSingleDatetable" class="display">
											<thead>
												<tr>
													<th>First Name</th>
													<th>Last Name</th>
													<th>Payment Date</th>
													<th>Payment Mode</th>
													<th>Accountant Name</th>
													<th>Reason</th>
													<th>Credit Amount</th>
													<th>Dedit Amount</th>

												</tr>
											</thead>
											<tfoot>
												<tr>
													<th colspan="6" style="text-align: right">Total:</th>
													<th></th>
													<th></th>


												</tr>
											</tfoot>
										</table>
										<div class="pagination-page">
                                            <nav aria-label="...">
                                               <ul class="pagination" style="margin-top:-10px; margin-bottom: 40px;">
                                                   <li class="page-item disabled">
                                                        <a class="page-link" href="#">Previous</a>
                                                   </li>
                                                <!-- <li class="page-item"><a class="page-link" href="#">1</a></li> -->
                                                   <li class="page-item">
                                                        <span class="page-link">
                                                                1
                                                       <span class="sr-only">(current)</span>
                                                       </span>
                                                   </li>
                                                <!--  <li class="page-item"><a class="page-link" href="#">3</a></li> -->
                                                   <li class="page-item">
                                                        <a class="page-link" href="#">Next</a>
                                                   </li>
                                               </ul>
                                           </nav>
                                       </div>
									</div>
								</fieldset>
							</form>
						</div>


						<!-------- 	Between Two Days	 -------->
						<div id="empBetweenTwoDate" class="tab-pane">

							<!-- <div class="row">
								<div class="col-sm-offset-1 col-md-10">
									<hr style="border-top-color: #c1b1b1;">
								</div>
							</div> -->


							<form class="form-horizontal" method="post" action=""
								name="empReport1">
								<fieldset>
									<div class="row form-group" style="padding-top: 30px">
										<label class="col-md-3 control-label" for="customerName">Employee
											Name:<sup>*</sup>
										</label>
										<div class="col-md-3">
											<div class="input-group">
												<span class="input-group-addon"> <i
													class="glyphicon glyphicon-user"></i>
												</span>

												<%
													EmployeeDetailsDao emp = new EmployeeDetailsDao();
													List emp1 = emp.getAllMainEmployee();
												%>
												<input list="emp_drop" id="emp" class="form-control"
													placeholder="Employee Name">
												<datalist id="emp_drop">

													<%
														for (int i = 0; i < emp1.size(); i++) {
															EmployeeDetailsBean emp2 = (EmployeeDetailsBean) emp1.get(i);
													%>

													<option data-value="<%=emp2.getEmpId()%>"><%=emp2.getFirstName()%>
														<%=emp2.getLastName()%>
													</option>
													<%
														}
													%>
												</datalist>
											</div>
										</div>
									</div>
									<div class="row form-group">
										<label class="col-md-3 control-label" for="startDate">
											Start Date:<sup>*</sup>
										</label>
										<div class="col-md-3">
											<div class="input-group">
												<span class="input-group-addon"> <i
													class="glyphicon glyphicon-calendar"></i>
												</span> <input type="date" id="fisDate2" placeholder="Start Date"
													class="form-control input-md" type="text">
											</div>
										</div>

										<label class="col-md-2 control-label" for="village">End
											Date:<sup>*</sup>
										</label>
										<div class="col-md-3">
											<div class="input-group">
												<span class="input-group-addon"> <i
													class="glyphicon glyphicon-calendar"></i>
												</span> <input type="date" id="endDate2" placeholder="End Date"
													class="form-control input-md ac_district" type="text">
											</div>
										</div>
									</div>

									<div class="row form-group buttons_margin_top ">
										<div align="center">

											<input type="button" id="btn" name="save"
												class="btn btn-success "
												style="height: 38px; width: 121px; font-size: 18"
												onclick="getEmpPaymentDetailsBetTwoDaysValidate()"
												value="Search" />

										</div>
									</div>
									<div class="table-responsive" style="padding-top: 2%">
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="empBetweenTwoDates" class="display">
											<thead>
												<tr>
													<th>First Name</th>
													<th>Last Name</th>
													<th>Payment Date</th>
													<th>Payment Mode</th>
													<th>Accountant Name</th>
													<th>Reason</th>
													<th>Credit Amount</th>
													<th>Dedit Amount</th>
												</tr>
											</thead>
											<tfoot>
												<tr>
													<th colspan="6" style="text-align: right">Total:</th>
													<th></th>
													<th></th>


												</tr>
											</tfoot>
										</table>
										<div class="pagination-page">
                                            <nav aria-label="...">
                                               <ul class="pagination" style="margin-top:-10px; margin-bottom: 40px;">
                                                   <li class="page-item disabled">
                                                        <a class="page-link" href="#">Previous</a>
                                                   </li>
                                                <!-- <li class="page-item"><a class="page-link" href="#">1</a></li> -->
                                                   <li class="page-item">
                                                        <span class="page-link">
                                                                1
                                                       <span class="sr-only">(current)</span>
                                                       </span>
                                                   </li>
                                                <!--  <li class="page-item"><a class="page-link" href="#">3</a></li> -->
                                                   <li class="page-item">
                                                        <a class="page-link" href="#">Next</a>
                                                   </li>
                                               </ul>
                                           </nav>
                                       </div>
									</div>
								</fieldset>
							</form>
						</div>
						
						<!-- payment mode -->
												<div id="emppaymode" class="tab-pane">



							<form class="form-horizontal" method="post" action=""
								name="empReport10">
								<fieldset>
								<div class="row form-group" style="padding-top: 30px">
										<label class="col-md-3 control-label" for="customerName">Payment
											Mode</label>
										<div class="col-md-3">
											<div class="input-group">
												<span class="input-group-addon"> <i
													class="glyphicon glyphicon-user"></i>
												</span>

												<select class="form-control" id="paymentMode2">
										<option value="cash">Cash</option>
										<option value="cheque">Cheque</option>
										<option value="card">Card</option>
										<option value="neft">NEFT</option>
																<option value="UPI Payment">UPI Payment</option>				
												</select>	
											</div>
										</div>
									</div>
									<div class="row form-group">
										<label class="col-md-3 control-label" for="startDate">
											Start Date:<sup>*</sup>
										</label>
										<div class="col-md-3">
											<div class="input-group">
												<span class="input-group-addon"> <i
													class="glyphicon glyphicon-calendar"></i>
												</span> <input type="date" id="payfisDate2" placeholder="Start Date"
													class="form-control input-md" type="text">
											</div>
										</div>

										<label class="col-md-2 control-label" for="village">End
											Date:<sup>*</sup>
										</label>
										<div class="col-md-3">
											<div class="input-group">
												<span class="input-group-addon"> <i
													class="glyphicon glyphicon-calendar"></i>
												</span> <input type="date" id="payendDate2" placeholder="End Date"
													class="form-control input-md ac_district" type="text">
											</div>
										</div>
									</div>

									<div class="row form-group buttons_margin_top ">
										<div align="center">

											<input type="button" id="btn" name="save"
												class="btn btn-success "
												style="height: 38px; width: 121px; font-size: 18"
												onclick="getEmpPaymentmodeValidate()"
												value="Search" />

										</div>
									</div>
									<div class="table-responsive" style="padding-top: 2%">
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="emppaymodes" class="display">
											<thead>
												<tr>
													<th>First Name</th>
													<th>Last Name</th>
													<th>Payment Date</th>
													<th>Payment Mode</th>
													<th>Accountant Name</th>
													<th>Reason</th>
													<th>Credit Amount</th>
													<th>Dedit Amount</th>
												</tr>
											</thead>
											<tfoot>
												<tr>
													<th colspan="6" style="text-align: right">Total:</th>
													<th></th>
													<th></th>


												</tr>
											</tfoot>
										</table>
										<div class="pagination-page">
                                            <nav aria-label="...">
                                               <ul class="pagination" style="margin-top:-10px; margin-bottom: 40px;">
                                                   <li class="page-item disabled">
                                                        <a class="page-link" href="#">Previous</a>
                                                   </li>
                                                <!-- <li class="page-item"><a class="page-link" href="#">1</a></li> -->
                                                   <li class="page-item">
                                                        <span class="page-link">
                                                                1
                                                       <span class="sr-only">(current)</span>
                                                       </span>
                                                   </li>
                                                <!--  <li class="page-item"><a class="page-link" href="#">3</a></li> -->
                                                   <li class="page-item">
                                                        <a class="page-link" href="#">Next</a>
                                                   </li>
                                               </ul>
                                           </nav>
                                       </div>
									</div>
								</fieldset>
							</form>
						</div>
						
					</div>
				</div>

				<!---------- Expenditure Payment Reports ------->

				<div class="tab-pane" id="settings">
					<div class="row">
						<div align="center">
							<h2 class="form-name style_heading">Expenditure Payment
								Reports</h2>
						</div>

						<div class="row">
							<div class="col-sm-offset-1 col-md-10">
								<hr style="border-top-color: #c1b1b1;">
							</div>
						</div>
					</div>

					<ul class="nav nav-tabs">
						<li class="active"><a data-toggle="tab"
							href="#expenseSingleDate" style="border-radius: 23px;"><h4>Datewise</h4></a></li>
						<li><a data-toggle="tab" href="#expenseBetweenTwoDate"
							style="border-radius: 23px;"><h4>Range</h4></a></li>
						<li><a data-toggle="tab" href="#expenseBetweenTwoDateAsPerExpense"
							style="border-radius: 23px;"><h4>Expenditure Name Wise</h4></a></li>
						<li><a data-toggle="tab" href="#expenseBetweenType"
							style="border-radius: 23px;"><h4>Expenditure Type Wise</h4></a></li>
						<li><a data-toggle="tab" href="#paymodeType"
							style="border-radius: 23px;"><h4>Payment Mode</h4></a></li>
					</ul>

					<div class="tab-content" style="float: left">

						<!-------------------------------------- DateWise ------------------------------------->

						<div id="expenseSingleDate" class="tab-pane fade in active">
							<!-- <div class="row">
								<div class="col-sm-offset-1 col-md-10">
									<hr style="border-top-color: #c1b1b1;">
								</div>
							</div> -->
							<form class="form-horizontal" method="post" action=""
								name="expnsReport">
								<fieldset>

									<div class="row form-group" style="padding-top: 30px">
										<label class="col-md-2 col-md-offset-3 control-label" for="">
											Enter Date:<sup>*</sup>
										</label>
										<div class="col-md-3">
											<div class="input-group">
												<span class="input-group-addon"> <i
													class="glyphicon glyphicon-calendar"></i>
												</span> <input type="date" id="fDate4" placeholder="Start Date"
													class="form-control input-md" type="text">
											</div>
										</div>
									</div>

									<div class="row" style="padding-top: 2%">
										<div class="col-md-3 col-md-offset-5">
											<div class="input-group">
												<input type="button" id="btn" name="save"
													style="height: 38px; width: 121px; font-size: 18"
													class="btn  btn-success "
													onclick="expensePaymentReportForSingleDateValidate()"
													value="Search" />
											</div>
										</div>
									</div>
									<div class="table-responsive" style="padding-top: 3%">
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="expenseSingleDatetable" class="display">
											<thead>
												<tr>
													<th>Expense Name</th>
													<!-- <th>Service Provider</th> -->
													<th>Accountant Name</th>
													<th>Payment Date</th>
													<th>Credit Amount</th>
													<th>Debit Amount</th>
													<th>Payment Mode</th> 

												</tr>
											</thead>
											<tfoot>
												<tr>
													<th colspan="3" style="text-align: right">Total:</th>
													<th></th>
													<th></th>
													<th></th>
												</tr>
											</tfoot>
										</table>
										<div class="pagination-page">
                                            <nav aria-label="...">
                                               <ul class="pagination" style="margin-top:-10px; margin-bottom: 40px;">
                                                   <li class="page-item disabled">
                                                        <a class="page-link" href="#">Previous</a>
                                                   </li>
                                                <!-- <li class="page-item"><a class="page-link" href="#">1</a></li> -->
                                                   <li class="page-item">
                                                        <span class="page-link">
                                                                1
                                                       <span class="sr-only">(current)</span>
                                                       </span>
                                                   </li>
                                                <!--  <li class="page-item"><a class="page-link" href="#">3</a></li> -->
                                                   <li class="page-item">
                                                        <a class="page-link" href="#">Next</a>
                                                   </li>
                                               </ul>
                                           </nav>
                                       </div>
									</div>
								</fieldset>
							</form>
						</div>

					<!-------------------------------------- RangeWise ------------------------------------->

						<div id="expenseBetweenTwoDate" class="tab-pane">



							<form class="form-horizontal" method="post" action=""
								name="expReport1">
								<fieldset>
									<div class="row form-group" style="padding-top: 30px">
										<label class="col-md-3 control-label" for="startDate">
											Start Date:<sup>*</sup>
										</label>
										<div class="col-md-3">
											<div class="input-group">
												<span class="input-group-addon"> <i
													class="glyphicon glyphicon-calendar"></i>
												</span> <input type="date" id="fisDate4" placeholder="Start Date"
													class="form-control input-md" type="text">
											</div>
										</div>

										<label class="col-md-2 control-label" for="endDate">End
											Date:<sup>*</sup>
										</label>
										<div class="col-md-3">
											<div class="input-group">
												<span class="input-group-addon"> <i
													class="glyphicon glyphicon-calendar"></i>
												</span> <input type="date" id="endDate4" placeholder="End Date"
													class="form-control input-md ac_district" type="text">
											</div>
										</div>
									</div>

									<div class="row form-group" style="padding-top: 2%">
										<div align="center">

											<input type="button" id="btn" name="save"
												style="height: 38px; width: 121px; font-size: 18"
												class="btn  btn-success "
												onclick="getExpensePaymentDetailsBetTwoDaysValidate()"
												value="Search" />

									.	</div>
									</div>
									<div class="table-responsive" style="padding-top: 3%">
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="expenseBetweenTwoDates" class="display">
											<thead>
												<tr>
													<th>Expense Name</th>
													<!-- <th>Service Provider</th> -->
													<th>Accountant Name</th>
													<th>Payment Date</th>
													<th>Credit Amount</th>
													<th>Debit Amount</th>
													 <th>Payment Mode</th>     
													<!--    <th>Total Amount</th>     -->
												</tr>
											</thead>
											<tfoot>
												<tr>
													<th colspan="3" style="text-align: right">Total:</th>
													<th></th>
													<th></th>
													<th></th>
													<!--   <th></th>   -->


												</tr>
											</tfoot>
										</table>
										<div class="pagination-page">
                                            <nav aria-label="...">
                                               <ul class="pagination" style="margin-top:-10px; margin-bottom: 40px;">
                                                   <li class="page-item disabled">
                                                        <a class="page-link" href="#">Previous</a>
                                                   </li>
                                                <!-- <li class="page-item"><a class="page-link" href="#">1</a></li> -->
                                                   <li class="page-item">
                                                        <span class="page-link">
                                                                1
                                                       <span class="sr-only">(current)</span>
                                                       </span>
                                                   </li>
                                                <!--  <li class="page-item"><a class="page-link" href="#">3</a></li> -->
                                                   <li class="page-item">
                                                        <a class="page-link" href="#">Next</a>
                                                   </li>
                                               </ul>
                                           </nav>
                                       </div>
										</div>
								</fieldset>
							</form>
						</div>


						<!------------------------------------ Expenditure Name Between Two Dates ------------------------------->

						<div id="expenseBetweenTwoDateAsPerExpense" class="tab-pane">
							<!-- <div class="row">
								<div class="col-sm-offset-1 col-md-10">
									<hr style="border-top-color: #c1b1b1;">
								</div>
							</div> -->


							<form class="form-horizontal" method="post" action=""
								name="expReport1">
								<fieldset>
									<div class="row form-group" style="padding-top: 30px">
										<label class="col-md-3 control-label"
											for="firstDateForExpenseName"> Start Date:<sup>*</sup></label>
										<div class="col-md-3">
											<div class="input-group">
												<span class="input-group-addon"> <i
													class="glyphicon glyphicon-calendar"></i>
												</span> <input type="date" id="firstDateForExpenseName"
													placeholder="Start Date" class="form-control input-md"
													type="text">
											</div>
										</div>

										<label class="col-md-2 control-label"
											for="endDateForExpenseName">End Date:<sup>*</sup></label>
										<div class="col-md-3">
											<div class="input-group">
												<span class="input-group-addon"> <i
													class="glyphicon glyphicon-calendar"></i>
												</span> <input type="date" id="endDateForExpenseName"
													placeholder="End Date"
													class="form-control input-md ac_district" type="text">
											</div>
										</div>
									</div>

									<div class="row form-group">
										<label class="col-md-3 control-label" for="expenditureName">Expenditure
											Name<sup>*</sup>
										</label>
										<div class="col-md-3">
											<div class="input-group">
												<span class="input-group-addon"> <i
													class="	glyphicon glyphicon-list-alt"></i>
												</span>

												<!-- Following code is to get expense name from "expenditure_details" table of "fertilizer" DB -->
												<!-- getAllExpenseName() is implemented in  SupplierDetailsDao with return type List-->

												<%
													ExpenditureDetailsDao exdd = new ExpenditureDetailsDao();
													List exList = exdd.getAllExpenseName();
												%>

												<input list="exp_drop" id="expenseName" class="form-control"
													placeholder="Expenditure Name">
												<datalist id="exp_drop">

													<%
														for (int i = 0; i < exList.size(); i++) {
															ExpenditureDetailsBean expbean = (ExpenditureDetailsBean) exList.get(i);
													%>

													<option data-value="<%=expbean.getPkExpenseDetailsId()%>"
														value="<%=expbean.getExpenseName()%>">
														<%
															}
														%>
													
												</datalist>
											</div>
										</div>
									</div>
									<div class="row" style="padding-top: 2%">
										<div class="col-md-3 col-md-offset-5">
											<input type="button" id="btn" name="save"
												style="height: 38px; width: 121px; font-size: 18"
												class="btn  btn-success "
												onclick="expenseReportAsPerExpenditureNameValidate()"
												value="Search" />
										</div>

									</div>
									<div class="table-responsive" style="padding-top: 3%">
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="expenseBetweenTwoDatesAsPerSelectedName" class="display">
											<thead>
												<tr>
													<th>Expense Name</th>
													<!-- <th>Service Provider</th> -->
													<th>Accountant Name</th>
													<th>Payment Date</th>
													<th>Credit Amount</th>
													<th>Debit Amount</th>
													<th>Payment Mode</th>			
													<!-- 	<th>Total Amount</th> -->

												</tr>
											</thead>
											<tfoot>
												<tr>
													<th colspan="3" style="text-align: right">Total:</th>
													<th></th>
													<th></th>
												<th></th>	
													<!-- <th></th>  -->


												</tr>
											</tfoot>
										</table>
										<div class="pagination-page">
                                            <nav aria-label="...">
                                               <ul class="pagination" style="margin-top:-10px; margin-bottom: 40px;">
                                                   <li class="page-item disabled">
                                                        <a class="page-link" href="#">Previous</a>
                                                   </li>
                                                <!-- <li class="page-item"><a class="page-link" href="#">1</a></li> -->
                                                   <li class="page-item">
                                                        <span class="page-link">
                                                                1
                                                       <span class="sr-only">(current)</span>
                                                       </span>
                                                   </li>
                                                <!--  <li class="page-item"><a class="page-link" href="#">3</a></li> -->
                                                   <li class="page-item">
                                                        <a class="page-link" href="#">Next</a>
                                                   </li>
                                               </ul>
                                           </nav>
                                       </div>
									</div>
								</fieldset>
							</form>
						</div>
						
						<!------------------------------------ Expenditure Type Wise ------------------------------->

						<div id="expenseBetweenType" class="tab-pane">
							<!-- <div class="row">
								<div class="col-sm-offset-1 col-md-10">
									<hr style="border-top-color: #c1b1b1;">
								</div>
							</div> -->

							<form class="form-horizontal" method="post" action=""
								  name="expReport1">
								<fieldset>
									
									<div class="row form-group" style="padding-top: 30px">
										<label class="col-md-3 control-label" for="expenditureType">Expenditure
											Type<sup>*</sup>
										</label>
										<div class="col-md-3">
											<div class="input-group">
												<span class="input-group-addon"> <i
													class="	glyphicon glyphicon-list-alt"></i>
												</span>

												<!-- Following code is to get expense name from "expenditure_details" table of "fertilizer" DB -->
												<!-- getAllExpenseName() is implemented in  SupplierDetailsDao with return type List-->

												<%
													ExpenditureDetailsDao exdd1 = new ExpenditureDetailsDao();
													List exList1 = exdd1.getAllExpenseType();
												%>

												<input list="expType_drop" id="expenseType" class="form-control"
													placeholder="Expenditure Type">
												<datalist id="expType_drop">

													<%
														for (int i = 0; i < exList1.size(); i++) {
															ExpenditurePaymentBean expbean1 = (ExpenditurePaymentBean) exList1.get(i);
															
															if(expbean1.getExpenseType().equalsIgnoreCase("direct")){
																expbean1.setExpenseType("Direct");
															}else{
																expbean1.setExpenseType("Indirect");
															}
													%>

													<option data-value="<%=expbean1.getFkExpDetailId()%>"
														value="<%=expbean1.getExpenseType()%>">
														<%
															}
														%>
													
												</datalist>
											</div>
										</div>
									</div>
									<div class="row" style="padding-top: 2%">
										<div class="col-md-3 col-md-offset-5">
											<input type="button" id="btn" name="save"
												style="height: 38px; width: 121px; font-size: 18"
												class="btn  btn-success "
												onclick="expenseReportAsPerExpenditureTypeValidate()"
												value="Search" />
										</div>

									</div>
									<div class="table-responsive" style="padding-top: 3%">
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="expenseBetweenTypeTable" class="display">
											<thead>
												<tr>
													<th>Expense Name</th>
													<!-- <th>Service Provider</th> -->
													<th>Accountant Name</th>
													<th>Payment Date</th>
													<th>Credit Amount</th>
													<th>Debit Amount</th>
													<th>Payment Mode</th> 
													<!-- 	<th>Total Amount</th> -->

												</tr>
											</thead>
											<tfoot>
												<tr>
													<th colspan="3" style="text-align: right">Total:</th>
													<th></th>
														<th></th>
													<th></th>
													<!-- <th></th>  -->


												</tr>
											</tfoot>
										</table>
										<div class="pagination-page">
                                            <nav aria-label="...">
                                               <ul class="pagination" style="margin-top:-10px; margin-bottom: 40px;">
                                                   <li class="page-item disabled">
                                                        <a class="page-link" href="#">Previous</a>
                                                   </li>
                                                <!-- <li class="page-item"><a class="page-link" href="#">1</a></li> -->
                                                   <li class="page-item">
                                                        <span class="page-link">
                                                                1
                                                       <span class="sr-only">(current)</span>
                                                       </span>
                                                   </li>
                                                <!--  <li class="page-item"><a class="page-link" href="#">3</a></li> -->
                                                   <li class="page-item">
                                                        <a class="page-link" href="#">Next</a>
                                                   </li>
                                               </ul>
                                           </nav>
                                       </div>
									</div>
								</fieldset>
							</form>
						</div>
						
						<!-- pay moed -->
						
												<div id="paymodeType" class="tab-pane">
							<!-- <div class="row">
								<div class="col-sm-offset-1 col-md-10">
									<hr style="border-top-color: #c1b1b1;">
								</div>
							</div> -->
							<form class="form-horizontal" method="post" action=""
								name="expnspayReport">
								<fieldset>

																	<div class="row form-group" style="padding-top: 30px">
										<label class="col-md-3 control-label" for="customerName">Payment
											Mode</label>
										<div class="col-md-3">
											<div class="input-group">
												<span class="input-group-addon"> <i
													class="glyphicon glyphicon-user"></i>
												</span>

												<select class="form-control" id="paymentMode3">
										<option value="cash">Cash</option>
										<option value="cheque">Cheque</option>
										<option value="card">Card</option>
										<option value="neft">NEFT</option>
																<option value="UPI Payment">UPI Payment</option>				
												</select>	
											</div>
										</div>
									</div>
									<div class="row form-group">
										<label class="col-md-3 control-label" for="startDate">
											Start Date:<sup>*</sup>
										</label>
										<div class="col-md-3">
											<div class="input-group">
												<span class="input-group-addon"> <i
													class="glyphicon glyphicon-calendar"></i>
												</span> <input type="date" id="payfisDate3" placeholder="Start Date"
													class="form-control input-md" type="text">
											</div>
										</div>

										<label class="col-md-2 control-label" for="village">End
											Date:<sup>*</sup>
										</label>
										<div class="col-md-3">
											<div class="input-group">
												<span class="input-group-addon"> <i
													class="glyphicon glyphicon-calendar"></i>
												</span> <input type="date" id="payendDate3" placeholder="End Date"
													class="form-control input-md ac_district" type="text">
											</div>
										</div>
									</div>

									<div class="row" style="padding-top: 2%">
										<div class="col-md-3 col-md-offset-5">
											<div class="input-group">
												<input type="button" id="btn" name="save"
													style="height: 38px; width: 121px; font-size: 18"
													class="btn  btn-success "
													onclick="expensePaymentReportpaymode()"
													value="Search" />
											</div>
										</div>
									</div>
									<div class="table-responsive" style="padding-top: 3%">
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="expensepaymode" class="display">
											<thead>
												<tr>
													<th>Expense Name</th>
													<!-- <th>Service Provider</th> -->
													<th>Accountant Name</th>
													<th>Payment Date</th>
													<th>Credit Amount</th>
													<th>Debit Amount</th>
													<th>Payment Mode</th> 

												</tr>
											</thead>
											<tfoot>
												<tr>
													<th colspan="3" style="text-align: right">Total:</th>
													<th></th>
													<th></th>
													<th></th>
												</tr>
											</tfoot>
										</table>
										<div class="pagination-page">
                                            <nav aria-label="...">
                                               <ul class="pagination" style="margin-top:-10px; margin-bottom: 40px;">
                                                   <li class="page-item disabled">
                                                        <a class="page-link" href="#">Previous</a>
                                                   </li>
                                                <!-- <li class="page-item"><a class="page-link" href="#">1</a></li> -->
                                                   <li class="page-item">
                                                        <span class="page-link">
                                                                1
                                                       <span class="sr-only">(current)</span>
                                                       </span>
                                                   </li>
                                                <!--  <li class="page-item"><a class="page-link" href="#">3</a></li> -->
                                                   <li class="page-item">
                                                        <a class="page-link" href="#">Next</a>
                                                   </li>
                                               </ul>
                                           </nav>
                                       </div>
									</div>
								</fieldset>
							</form>
						</div>
						
						
					</div>
				</div>
							
<!-------------------------------------------------------- Partner Transaction Report ----------------------------------------->

				<div class="tab-pane" id="PartnersTransaction">
					<div class="row">
						<div align="center">
							<h2 class="form-name style_heading">Partner Payment Reports</h2>
						</div>

						<div class="row">
							<div class="col-sm-offset-1 col-md-10">
								<hr style="border-top-color: #c1b1b1;">
							</div>
						</div>
					</div>

					<ul class="nav nav-tabs">
						<li class="active"><a data-toggle="tab" href="#partnerWiseReport" style="border-radius: 23px;"><h4>Partner Wise Report</h4></a></li>
					</ul>

					<div class="tab-content" style="float: left">

						<!--    for single date -->

						<div id="partnerWiseReport" class="tab-pane fade in active">
							<!-- <div class="row">
								<div class="col-sm-offset-1 col-md-10">
									<hr style="border-top-color: #c1b1b1;">
								</div>
							</div> -->
							<form class="form-horizontal" method="post" action=""
								name="expnsReport">
								<fieldset>

									<div class="row form-group">
										<label class="col-md-3 control-label" for="expenditureName">Partner Name<sup>*</sup>
										</label>
										<div class="col-md-3">
											<div class="input-group">
												<span class="input-group-addon"> <i
													class="	glyphicon glyphicon-list-alt"></i>
												</span>

												<!-- Following code is to get expense name from "expenditure_details" table of "fertilizer" DB -->
												<!-- getAllExpenseName() is implemented in  SupplierDetailsDao with return type List-->

												<%
													partnerDetailsDao pdd = new partnerDetailsDao();
													List pdList = pdd.getPartnerList();
												%>

												<input list="pt_drop" id="partnersName" class="form-control"
													placeholder="Partner Name">
												<datalist id="pt_drop">

													<%
														for (int i = 0; i < pdList.size(); i++) {
															PartnerDetailsBean pdbean = (PartnerDetailsBean) pdList.get(i);
													%>

													<option data-value="<%=pdbean.getPkPartnerId()%>" value="<%=pdbean.getPartnerName()%>">
														<%
															}
														%>
													
												</datalist>
											</div>
										</div>
									</div>

									<div class="row" style="padding-top: 2%">
										<div class="col-md-3 col-md-offset-5">
											<div class="input-group">
												<input type="button" id="btn" name="save"
													style="height: 38px; width: 121px; font-size: 18"
													class="btn  btn-success "
													onclick="partnerWiseReport()"
													value="Search" />
											</div>
										</div>
									</div>
									<div class="table-responsive" style="padding-top: 3%">
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="partnerWiseReportDataTable" class="display">
											<thead>
												<tr>
													<th>Partner Name</th>
													<th>Total Amount</th>
													<th>Credit Amount</th>
													<th>Debit Amount</th>

													<th>Date</th>
													<th>Payment Mode</th>
												</tr>
											</thead>
											<tfoot>
												<tr>
													<th colspan="2" style="text-align: right">Total:</th>
													<th></th>
													<th></th>
													
													<th></th>
													<th></th>
												</tr>
											</tfoot>
										</table>
										<div class="pagination-page">
                                            <nav aria-label="...">
                                               <ul class="pagination" style="margin-top:-10px; margin-bottom: 40px;">
                                                   <li class="page-item disabled">
                                                        <a class="page-link" href="#">Previous</a>
                                                   </li>
                                                <!-- <li class="page-item"><a class="page-link" href="#">1</a></li> -->
                                                   <li class="page-item">
                                                        <span class="page-link">
                                                                1
                                                       <span class="sr-only">(current)</span>
                                                       </span>
                                                   </li>
                                                <!--  <li class="page-item"><a class="page-link" href="#">3</a></li> -->
                                                   <li class="page-item">
                                                        <a class="page-link" href="#">Next</a>
                                                   </li>
                                               </ul>
                                           </nav>
                                       </div>
									</div>
								</fieldset>
							</form>
						</div>
					</div>
				</div>
<!-------------------------------------------------------- Bank Transaction Report ----------------------------------------->
				
				<div class="tab-pane" id="BankTransaction">
					<div class="row">
						<div align="center">
							<h2 class="form-name style_heading">Bank Payment Reports</h2>
						</div>

						<div class="row">
							<div class="col-sm-offset-1 col-md-10">
								<hr style="border-top-color: #c1b1b1;">
							</div>
						</div>
					</div>

					<ul class="nav nav-tabs">
						<li class="active"><a data-toggle="tab" href="#bankWiseReport" style="border-radius: 23px;"><h4>Bank Name Wise Report</h4></a></li>
					</ul>

					<div class="tab-content" style="float: left">

						<!--    for single date -->

						<div id="bankWiseReport" class="tab-pane fade in active">
							<!-- <div class="row">
								<div class="col-sm-offset-1 col-md-10">
									<hr style="border-top-color: #c1b1b1;">
								</div>
							</div> -->
							<form class="form-horizontal" method="post" action="" name="bankReport">
								<fieldset>

									<div class="row form-group">
										<label class="col-md-3 control-label" for="bankName">Bank Name<sup>*</sup>
										</label>
										<div class="col-md-3">
											<div class="input-group">
												<span class="input-group-addon"> <i
													class="	glyphicon glyphicon-list-alt"></i>
												</span>

												<%
													BankDetailsDao bdd = new BankDetailsDao();
													List bdList = bdd.getBankNameList();
												%>

												<input list="bank_drop" id="bankName" class="form-control" placeholder="Bank Name">
												<datalist id="bank_drop">

													<%
														for (int i = 0; i < bdList.size(); i++) {
															BankDetailsBean bdbean = (BankDetailsBean) bdList.get(i);
													%>

													<option data-value="<%=bdbean.getPkbankdetailsID()%>" value="<%=bdbean.getBankName()%>">
														<%
															}
														%>
													
												</datalist>
											</div>
										</div>
									</div>

									<div class="row" style="padding-top: 2%">
										<div class="col-md-3 col-md-offset-5">
											<div class="input-group">
												<input type="button" id="btn" name="save"
													style="height: 38px; width: 121px; font-size: 18"
													class="btn  btn-success "
													onclick="bankNameWiseReport()"
													value="Search" />
											</div>
										</div>
									</div>
									<div class="table-responsive" style="padding-top: 3%">
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="bankWiseReportDataTable" class="display">
											<thead>
												<tr>
													<th>Bank Name</th>
													<th>Account No</th>
													<th>Credit Amount</th>
													<th>Debit Amount</th>
													<th>Payment Mode</th>
													<th>Date</th>
												</tr>
											</thead>
											<tfoot>
												<tr>
													<th colspan="2" style="text-align: right">Total:</th>
													<th></th>
													<th></th>
																										<th></th>
													<th></th>
												</tr>
											</tfoot>
										</table>
										<div class="pagination-page">
                                            <nav aria-label="...">
                                               <ul class="pagination" style="margin-top:-10px; margin-bottom: 40px;">
                                                   <li class="page-item disabled">
                                                        <a class="page-link" href="#">Previous</a>
                                                   </li>
                                                <!-- <li class="page-item"><a class="page-link" href="#">1</a></li> -->
                                                   <li class="page-item">
                                                        <span class="page-link">
                                                                1
                                                       <span class="sr-only">(current)</span>
                                                       </span>
                                                   </li>
                                                <!--  <li class="page-item"><a class="page-link" href="#">3</a></li> -->
                                                   <li class="page-item">
                                                        <a class="page-link" href="#">Next</a>
                                                   </li>
                                               </ul>
                                           </nav>
                                       </div>
									</div>
								</fieldset>
							</form>
						</div>
					</div>
				</div>
				
<!-------------------------------------------------------- /Bank Transaction Report ----------------------------------------->
				
			</div>
		</div>
	</div>
</div>

<jsp:include page="commons/footer.jsp"></jsp:include>



