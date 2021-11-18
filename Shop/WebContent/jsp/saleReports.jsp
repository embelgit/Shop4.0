
<%@page import="com.Fertilizer.bean.GetBillDetails"%>
<%@page import="com.Fertilizer.hibernate.FertilizerBillBean"%>
<%@page import="com.Fertilizer.dao.FertilizerBillDao"%>
<%@page import="com.Fertilizer.hibernate.shopDetailsBean"%>
<%@page import="com.Fertilizer.dao.shopDetailsDao"%>
<%@page import="com.Fertilizer.hibernate.SupplierDetailsBean"%>
<%@page import="com.Fertilizer.dao.SupplierDetailsDao"%>
<%@page import="com.Fertilizer.hibernate.CategoryDetailsBean"%>
<%@page import="com.Fertilizer.dao.CategoryDetailsDao"%>
<%@page import="com.Fertilizer.bean.SaleReturnBean"%>
<%@page import="com.Fertilizer.dao.SaleReturnReportDao"%>

<%
	boolean isHome = false;
%>
<%@include file="commons/header.jsp"%>
<head>


<script src="/Shop/staticContent/js/jquery-1.12.3.min.js"></script>
<script type="text/javascript" src="/Shop/staticContent/js/selectjj.js"></script>
<script type="text/javascript" src="/Shop/staticContent/js/buttom.js"></script>
<script src="/Shop/staticContent/js/jquery.min.js"></script>
<script src="/Shop/staticContent/js/jquery.jqgrid.min.js"></script>
<script type="text/javascript" src="/Shop/staticContent/js/bootstrap.js"></script>
<script type="text/javascript" src="/Shop/staticContent/js/bootbox.min.js"></script>
<script src="/Shop/staticContent/js/jquery.dataTables.js" type="text/javascript"></script>
<script type="text/javascript" src="/Shop/staticContent/js/jqueryUi.js"></script>

<link href="/Shop/staticContent/css/dataTa.css" rel="stylesheet" type="text/css" media="all" />
<link href="/Shop/staticContent/css/dataTables.jqueryui.min.css" rel="stylesheet" type="text/css" media="all">
<link href="/Shop/staticContent/css/select.css" rel="stylesheet" type="text/css" media="all">
<link href="/Shop/staticContent/css/button.css" rel="stylesheet" type="text/css" media="all">
<link rel="stylesheet" href="/Shop/staticContent/css/jquery-ui.min.css">
<link rel="stylesheet" href="/Shop/staticContent/css/ui.jqgrid.min.css">
<script type="text/javascript" src="/Shop/staticContent/js/bootstrap.js"></script>
<script type="text/javascript"	src="/Shop/staticContent/js/bootbox.min.js"></script>

<!-- For datatable to pdf,print,excel etc conversion -->

<script type="text/javascript" 
    src="https://code.jquery.com/jquery-1.12.4.js"></script>
<script type="text/javascript"
	src="https://cdn.datatables.net/1.10.15/js/jquery.dataTables.min.js"></script>
<script type="text/javascript"
	src="https://cdn.datatables.net/buttons/1.3.1/js/dataTables.buttons.min.js"></script>
<script type="text/javascript"
	src="https://cdn.datatables.net/buttons/1.3.1/js/buttons.flash.min.js"></script>
<script type="text/javascript"
	src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>
<script type="text/javascript"
	src="https://cdn.rawgit.com/bpampuch/pdfmake/0.1.27/build/pdfmake.min.js"></script>

<script type="text/javascript"
	src="https://cdn.rawgit.com/bpampuch/pdfmake/0.1.27/build/vfs_fonts.js"></script>
<script type="text/javascript"
	src="https://cdn.datatables.net/buttons/1.3.1/js/buttons.html5.min.js"></script>
<script type="text/javascript"
	src="https://cdn.datatables.net/buttons/1.3.1/js/buttons.print.min.js"></script>
<link rel="stylesheet"
	href="https://cdn.datatables.net/1.10.15/css/jquery.dataTables.min.css">
<link rel="stylesheet"
	href="https://cdn.datatables.net/buttons/1.3.1/css/buttons.dataTables.min.css">

<script type="text/javascript" src="//code.jquery.com/jquery-1.12.4.js"></script> 
 <script type="text/javascript" src="https://cdn.datatables.net/1.10.15/js/jquery.dataTables.min.js"></script>
<script type="text/javascript" src="https://cdn.datatables.net/buttons/1.3.1/js/dataTables.buttons.min.js"></script>
<script type="text/javascript" src="//cdn.datatables.net/buttons/1.3.1/js/buttons.flash.min.js"></script>
<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>
<script type="text/javascript" src="//cdn.rawgit.com/bpampuch/pdfmake/0.1.27/build/pdfmake.min.js"></script>
 <script type="text/javascript" src="/Shop/staticContent/js/bootstrap.js"></script>
 <script type="text/javascript" src="/Shop/staticContent/js/bootbox.min.js"></script>
<script type="text/javascript" src="//cdn.rawgit.com/bpampuch/pdfmake/0.1.27/build/vfs_fonts.js"></script>
<script type="text/javascript" src="//cdn.datatables.net/buttons/1.3.1/js/buttons.html5.min.js"></script>
<script type="text/javascript" src="//cdn.datatables.net/buttons/1.3.1/js/buttons.print.min.js"></script>
<link rel="stylesheet" href="https://cdn.datatables.net/1.10.15/css/jquery.dataTables.min.css"> 
<link rel="stylesheet" href="https://cdn.datatables.net/buttons/1.3.1/css/buttons.dataTables.min.css">

<script src="/Shop/staticContent/js/saleReports.js">
	function cancle() {
		location.reload()
	}
</script>
<style>
.btn-default,.btn-primary,.btn-success,.btn-info,.btn-warning,.btn-danger
 {
    border-radius:23px;
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
				<li class="active"><a href="#home" data-toggle="tab" style=" border-radius:23px;">Category Wise Sale Reports</a></li>
				<li><a href="#profile" data-toggle="tab" style=" border-radius:23px;">Product Name Wise Sale Reports</a></li>
				<li><a href="#payment" data-toggle="tab" style=" border-radius:23px;">Payment Mode Wise Sale Reports</a></li>
				<li><a href="#shopWise" data-toggle="tab" style=" border-radius:23px;">Shop Wise Sale Reports</a></li>
				<li><a href="#userWise" data-toggle="tab" style=" border-radius:23px;">User Wise Sale Reports</a></li>
				<li><a href="#GSTWise" data-toggle="tab" style=" border-radius:23px;">GST Wise Reports</a></li>
				<li><a href="#nonGSTWise" data-toggle="tab" style=" border-radius:23px;">Non-GST Wise Reports</a></li>
		     	<li><a href="#rangeWiseBillReport" data-toggle="tab" style=" border-radius:23px;">Bill Number Wise Report</a></li>
				<li><a href="#cashCustomerSaleReport" data-toggle="tab" style=" border-radius:23px;">Cash Customer Sale Report</a></li>
				<li><a href="#creditCustomerSaleReport" data-toggle="tab" style=" border-radius:23px;">Credit Customer Sale Report</a></li>
				<li><a href="#saleReturnReport" data-toggle="tab" style=" border-radius:23px;"> Sale Return Report</a></li>
		     	<li><a href="#billcancelReport" data-toggle="tab" style=" border-radius:23px;">Bill Cancel Report</a></li>
           </ul>
		</div>
		<div class="col-xs-9">
			<!-- Tab panes -->
			<div class="tab-content">

				<!----------------------------------- 	CategoryWise Sale reports --------------------------------------->

				<div class="tab-pane active" id="home">
					<div class="row">
						<div align="center">
							<h2 class="form-name style_heading">Category Wise Sale Reports</h2>
						</div>

						<div class="row">
							<div class="col-sm-offset-1 col-md-10">
								<hr style="border-top-color: #c1b1b1;">
							</div>
						</div>
					</div>

					<ul class="nav nav-tabs">
						<li class="active"><a data-toggle="tab"	href="#supplierSingleDate" style=" border-radius:23px;">
							<h4 >Datewise</h4></a></li>
						<li><a data-toggle="tab" href="#supplierBetweenTwoDate" style=" border-radius:23px;">
						    <h4	>Range</h4></a></li>
					</ul>

					<div class="tab-content" style="float: left">

	<!--    for single date -->
	<!-- <script type="text/javascript"> 
		$(document).ready(function () {
	         var table=$("#sale1").dataTable();
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
	   </script> -->
<!-- <script type="text/javascript">
	 $(document).ready(function() {
		    $('#sale1').DataTable( {
		        dom: 'Bfrtip',
		        buttons: [
		            'copy', 'csv', 'excel', 'pdf', 'print'
		        ]
		    } );
		} );</script> -->
						<div id="supplierSingleDate" class="tab-pane active">
							<!-- <div class="row">
								<div class="col-sm-offset-1 col-md-10">
									<hr style="border-top-color: #c1b1b1;">
								</div>
							</div> -->
							<form class="form-horizontal" method="post" action="" name="saleReportForm22">
								<fieldset>
									<div class="row form-group" style="margin-top: 30px">
										<!-- <label class="col-md-2 col-sm-offset-0 control-label" for="fk_cat_id">Product Category<sup>*</sup></label> -->
										<label class="col-md-3 control-label" for="fk_cat_id">Product Category<sup>*</sup>
										</label>
										<div class="col-md-3">
											<div class="input-group">
												<span class="input-group-addon"> <i
													class="	glyphicon glyphicon-list-alt"></i>
												</span>

												<!-- Following code is to get categories from "categories" table of "fertilizer" DB -->
												<!-- getAllMainCat() is implemented in  CategoryDetailsDao with return type List-->
												<%
													CategoryDetailsDao cdd = new CategoryDetailsDao();
													List cList = cdd.getAllMainCat(request);
												%>
												<input list="cat_drop6" id="fk_cat_id6" class="form-control" placeholder="Product Category">
												<datalist id="cat_drop6">
													<%
														for (int i = 0; i < cList.size(); i++) {
															CategoryDetailsBean cat = (CategoryDetailsBean) cList.get(i);
													%>

													<option data-value="<%=cat.getCatId()%>"
														value="<%=cat.getCategoryName()%>">
														<%
															}
														%>
													
												</datalist>
											</div>
										</div>

										<label class="col-md-3 control-label" for=""> Enter	Date:
										</label>
										<div class="col-md-3">
											<div class="input-group">
												<span class="input-group-addon"> <i
													class="glyphicon glyphicon-calendar"></i>
												</span>
												 <input type="date" id="fDate" placeholder="Start Date"	class="form-control input-md" type="text">
											</div>
										</div>
									</div>
									<div class="row form-group" style="padding-top:2%">
										<div class="col-md-2 col-md-offset-5">
											<div class="input-group">
												<div align="center">
													<input type="button" id="btn" name="save" class="btn  btn-success " style="height: 38px; width: 121px;font-size: 18" onclick="saleReportForSingleDateAsPerCategory()" value="Search" />
												</div>
											</div>
										</div>
									</div>
							<div class="container">
<!-- 									<div class="table-responsive" style="padding-top:2%"> -->
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="sale1" class="display">
											
											<thead>
												<tr>
													<th>Customer Bill No</th>
													<th>Product Name</th>
													<th>Sold Date</th>
													<th>Sale Price</th>
													<th>Qty</th>
													<th>Unit</th>
													<th>Tax Percentage</th>
													<th>Tax Amount</th>
											   <!-- <th>Discount Amount</th>
								                    <th>Hamali Expense</th> -->
													<th>Total Amount Inc. Tax</th>
												</tr>
											</thead>
											<tfoot>
												<tr>
													<th colspan="8" style="text-align: right">Total Rs:</th>
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
                                       <br>
                                       <br>
									</div>
								</fieldset>
							</form>
						</div>

						<!-------------------------------------- 	Between Two Dates  -------------------------------------------->
						
						<div id="supplierBetweenTwoDate" class="tab-pane fade">

							<!-- <div class="row">
								<div class="col-sm-offset-1 col-md-10">
									<hr style="border-top-color: #c1b1b1;">
								</div>
							</div> -->


							<form class="form-horizontal" method="post" action=""
								name="saleReportFormRange">
								<fieldset>
									<div class="row form-group" style="margin-top: 30px">
										<label class="col-md-3   control-label"
											for="fk_cat_id_for_payment_mode_two">Product Category<sup>*</sup></label>
										<div class="col-md-3">
											<div class="input-group ">

												<span class="input-group-addon"> <i
													class="	glyphicon glyphicon-list-alt"></i>
												</span>

												<!-- Following code is to get categories from "categories" table of "fertilizer" DB -->
												<!-- getAllMainCat() is implemented in  CategoryDetailsDao with return type List-->
												<%
													CategoryDetailsDao paymentModecatdao2 = new CategoryDetailsDao();
													List catListPayment2 = paymentModecatdao2.getAllMainCat(request);
												%>
												<input list="cat_drop_For_payment_mode_two1" placeholder="Product Category"
													id="fk_cat_id_for_payment_mode_two1" class="form-control">
												<datalist id="cat_drop_For_payment_mode_two1">
													<%
														for (int i = 0; i < catListPayment2.size(); i++) {
															CategoryDetailsBean catPaymentbean1 = (CategoryDetailsBean) catListPayment2.get(i);
													%>

													<option data-value="<%=catPaymentbean1.getCatId()%>"
														value="<%=catPaymentbean1.getCategoryName()%>">
														<%
															}
														%>
													
												</datalist>
											</div>
										</div>
									</div>
									<div class="row form-group" >
										<label class="col-md-3 control-label" for="customerName">
											Start Date:<sup>*</sup>
										</label>
										<div class="col-md-3">
											<div class="input-group">
												<span class="input-group-addon"> <i
													class="glyphicon glyphicon-calendar"></i>
												</span> 
												<input type="date" id="fisDate" placeholder="Start Date"
													class="form-control input-md" type="text">
											</div>
										</div>

										<label class="col-md-2 control-label" for="endDate">End	Date:<sup>*</sup>
										</label>
										<div class="col-md-3">
											<div class="input-group">
												<span class="input-group-addon"> <i
													class="glyphicon glyphicon-calendar"></i>
												</span> 
												<input type="date" id="endDate" placeholder="End Date"
													class="form-control input-md ac_district" type="text">
											</div>
										</div>
									</div>

									<div class="row form-group" style="padding-top:2%">
										<div class="col-md-2 col-md-offset-5">
											<div class="input-group">
												<input type="button" id="btn" name="save" class="btn  btn-success " style="height: 38px; width: 121px;font-size: 18"
													   onclick="saleReportBetweenTwoDatesAsPerCategory()"
													value="Search" />
											</div>
										</div>
									</div>
									<div class="container">
									<!-- <div class="table-responsive" style="padding-top:2%"> -->
									
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="saleBetTwoDates" class="display">
											
											<thead>
												<tr>
													<th>Customer Bill No</th>
													<th>Product Name</th>
													<th>Sold Date</th>
													<th>Sale Price</th>
													<th>qty</th>
													<th>Unit</th>
													<th>Tax Percentage</th>
													<th>Tax Amount</th>

													<th>Total Amount Inc. Tax</th>
												</tr>
													<!-- 	<th>Discount Amount</th> -->
											</thead>

											<tfoot>
												<tr>
													<th colspan="8" style="text-align: right">Total Rs:</th>
													<th></th>
												</tr>
											</tfoot>
										</table>
									<!-- </div> -->
									<div class="pagination-page">
                                            <nav aria-label="...">
                                               <ul class="pagination" style="margin-top: 10px; margin-bottom: 40px;">
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


				<!--------------------------------------------- Product Wise Reports --------------------------------------------->

				<div class="tab-pane" id="profile">
					<div class="row">
						<div align="center">
							<h2 class="form-name style_heading">Product Name Wise Sale
								Reports</h2>
						</div>

						<div class="row">
							<div class="col-sm-offset-1 col-md-10">
								<hr style="border-top-color: #c1b1b1;">
							</div>
						</div>
					</div>

					<ul class="nav nav-tabs">
						<li class="active"><a data-toggle="tab"	href="#customerSingleDate" style=" border-radius:23px;">
							<h4>Datewise</h4></a></li>
						<li><a data-toggle="tab" href="#customerBetweenTwoDate" style=" border-radius:23px;">
							<h4 >Range</h4></a></li>

					</ul>

					<div class="tab-content" style="float: left">

						<!--    for single date -->
						<div id="customerSingleDate" class="tab-pane active">
							<!-- <div class="row">
								<div class="col-sm-offset-1 col-md-10">
									<hr style="border-top-color: #c1b1b1;">
								</div>
							</div> -->
							<form class="form-horizontal" method="post" action=""
								name="saleReportFormItem">
								<fieldset>
									<div class="row form-group" style="margin-top: 30px">
										<label class="col-md-3  control-label"
											for="fk_cat_id">Product Category<sup>*</sup></label>
										<div class="col-md-3">
											<div class="input-group">
												<span class="input-group-addon"> 
													<i class="	glyphicon glyphicon-list-alt"></i>
												</span>

												<!-- Following code is to get categories from "categories" table of "fertilizer" DB -->
												<!-- getAllMainCat() is implemented in  CategoryDetailsDao with return type List-->
												<%
													CategoryDetailsDao cdd9 = new CategoryDetailsDao();
													List cList9 = cdd9.getAllMainCat(request);
												%>
												<input list="cat_drop" id="fk_cat_id" name="fk_cat_id" placeholder="Product Category"
													class="form-control" onchange="getAllProduct()">
												<datalist id="cat_drop">
													<%
														for (int i = 0; i < cList9.size(); i++) {
															CategoryDetailsBean cat9 = (CategoryDetailsBean) cList9.get(i);
													%>

													<option data-value="<%=cat9.getCatId()%>"
														value="<%=cat9.getCategoryName()%>">
														<%
															}
														%>
													
												</datalist>
											</div>
										</div>

										<label class="col-md-2 control-label" for="product">Product	Name<sup>*</sup>
										</label>
										<div class="col-md-3">
											<div class="input-group">
												<span class="input-group-addon"> <i
													class="	glyphicon glyphicon-list-alt"></i>
												</span> <select class="form-control" id="proName" name="proName" placeholder="Product	Name">
												</select>

											</div>
										</div>
									</div>
									<div class="row form-group">
										<label class="col-md-3 control-label"> Enter Date:<sup>*</sup>
										</label>
										<div class="col-md-3">
											<div class="input-group">
												<span class="input-group-addon"> <i
													class="glyphicon glyphicon-calendar"></i>
												</span> <input type="date" id="fDate1" name="fDate1"
													placeholder="Start Date" class="form-control input-md"
													type="text">
											</div>
										</div>
									</div>
											
											<div class="row" style="padding-top:2%;padding-bottom:1%">
										<div class="col-md-3 col-md-offset-5">
											<div class="input-group">
												<input type="button" id="btn" name="save"
													class="btn  btn-success " style="height: 38px; width: 121px;font-size: 18"
													onclick="saleReportforSingleDateAsPerProName()"
													value="Search" />
											</div>
										</div>
									</div>
									<div class="container">
<!-- 									<div class="table-responsive" style="padding-top:2%"> -->
										<table class="table table-bordered table-striped table-condensed cf"
											id="sale3" class="display">
											<thead>
												<tr>
													<th>Customer Bill No</th>
													<th>Product Name</th>
													<th>Sold Date</th>
													<th>Sale Price</th>
													<th>qty</th>
													<th>Unit</th>
													<th>Tax Percentage</th>
													<th>Tax Amount</th>
													<!-- <th>Discount Amount</th> -->
													<th>Total Amount Inc. Tax</th>
												</tr>
											</thead>
											<tfoot>
												<tr>
													<th colspan="8" style="text-align: right">Total Rs:</th>
													<th></th>


												</tr>
											</tfoot>
										</table>
										<div class="pagination-page">
                                            <nav aria-label="...">
                                               <ul class="pagination" style="margin-top: 10px; margin-bottom: 40px;">
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




				<!----------------------------------------- Between Two Dates ------------------------------------------------>
				
						<div id="customerBetweenTwoDate" class="tab-pane fade">

							<!-- <div class="row">
								<div class="col-sm-offset-1 col-md-10">
									<hr style="border-top-color: #c1b1b1;">
								</div>
							</div> -->

							<form class="form-horizontal" method="post" action=""
								name="saleReportTwoDates">
								<fieldset>
									<div class="row form-group" style="margin-top: 30px">
										<label class="col-md-3 control-label" >Product Category<sup>*</sup>
										</label>
										<div class="col-md-3">
											<div class="input-group">
												<span class="input-group-addon"> 
												<i class="glyphicon glyphicon-list-alt"></i>
												</span>

												<!-- Following code is to get categories from "categories" table of "fertilizer" DB -->
												<!-- getAllMainCat() is implemented in  CategoryDetailsDao with return type List-->
												<%
													CategoryDetailsDao cdao = new CategoryDetailsDao();
													List catList = cdao.getAllMainCat(request);
												%>
												<input list="cat_drop_For_sale" id="fk_cat_id_for_sale" placeholder="Product Category" 
													class="form-control" onchange="getAllProductForSale()">
												<datalist id="cat_drop_For_sale">
													<%
														for (int i = 0; i < catList.size(); i++) {
															CategoryDetailsBean catB = (CategoryDetailsBean) catList.get(i);
													%>

													<option data-value="<%=catB.getCatId()%>"
														value="<%=catB.getCategoryName()%>">
														<%
															}
														%>
													
												</datalist>
											</div>
										</div>

										<label class="col-md-3 control-label" for="product">Product	Name<sup>*</sup>
										</label>
										<div class="col-md-3">
											<div class="input-group">
												<span class="input-group-addon"> <i
													class="	glyphicon glyphicon-list-alt"></i>
												</span> <select class="form-control" id='proName1' name="proName1" placeholder="Product	Name">
												</select>

											</div>
										</div>
									</div>
									<div class="row form-group" style="margin-top: 18px">
										<label class="col-md-3 control-label" for="customerName">Start Date:<sup>*</sup>
										</label>
										<div class="col-md-3">
											<div class="input-group">
												<span class="input-group-addon"> 
												<i class="glyphicon glyphicon-calendar"></i>
												</span> 
												<input type="date" id="fisDateForSale" placeholder="Start Date" class="form-control input-md" type="text">
											</div>
										</div>

										<label class="col-md-3 control-label" for="village">End	Date:<sup>*</sup>
										</label>
										<div class="col-md-3">
											<div class="input-group">
												<span class="input-group-addon"> <i
													class="glyphicon glyphicon-calendar"></i>
												</span> <input type="date" id="endDateForSale"
													placeholder="End Date"
													class="form-control input-md ac_district" type="text">
											</div>
										</div>
									</div>

									<div class="row form-group buttons_margin_top ">
										<div align="center">

											<input type="button" id="btn" name="save"
												class="btn  btn-success " style="height: 38px; width: 121px;font-size: 18"
												onclick="saleReportforBetweenTwoAsPerProName()"
												value="Search" />

										</div>
									</div>
									<div class="container">
<!-- 									<div class="table-responsive" style="padding-top:2%"> -->
									<table
										class="table table-bordered table-striped table-condensed cf"
										id="sale4" class="display"
										>
										<thead>
											<tr>
												<th>Customer Bill No</th>
												<th>Product Name</th>
												<th>Sold Date</th>
												<th>Sale Price</th>
												<th>Qty</th>
												<th>Unit</th>
												<th>Tax Percentage</th>
												<th>Tax Amount</th>
												<!-- <th>Discount Amount</th> -->
												<th>Total Amount Inc. Tax</th>
											</tr>
										</thead>
										<tfoot>
											<tr>
												<th colspan="8" style="text-align: right">Total Rs:</th>
												<th></th>
											</tr>
										</tfoot>
									</table>
									<div class="pagination-page">
                                            <nav aria-label="...">
                                               <ul class="pagination" style="margin-top: 10px; margin-bottom: 40px;">
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

				<!----------------------------------------- Payment Mode Wise ----------------------------------------------------->
				
				<div class="tab-pane" id="payment">
					<div class="row">
						<div align="center">
							<h2 class="form-name style_heading">Payment Mode Wise Reports</h2>
						</div>

						<div class="row">
							<div class="col-sm-offset-1 col-md-10">
								<hr style="border-top-color: #c1b1b1;">
							</div>
						</div>
					</div>

					<ul class="nav nav-tabs">
						<!-- 	<li class="active"><a data-toggle="tab" href="#catWisePaymentMode"><h4 style="color:blue">Category Wise</h4></a></li> -->
						<li class="active"><a data-toggle="tab"	href="#dateWisePaymentMode" style=" border-radius:23px;" >
							<h4>DateWise</h4></a></li>
						<!--   	<li><a data-toggle="tab" href="#rangeWisePaymentMode"><h4 style="color:blue">Range and Category Wise</h4></a></li> -->
						<li><a data-toggle="tab" href="#rangeWisePaymentTypePaymentMode" style=" border-radius:23px;">
						    <h4 >Range and Payment Mode Wise</h4></a></li>

					</ul>

					<div class="tab-content" style="float: left">
						<!--  Category Wise -->
						<%--   <div id="catWisePaymentMode" class="tab-pane">
		 		<form class="form-horizontal" method="post" action="" name="pay">
				<fieldset>
				  <div class="row form-group" style="margin-top: 18px">
					 <label class="col-md-2  control-label" for="fk_cat_id_for_payment">Product Category<sup>*</sup></label>
					 <div class="col-md-3">
					 <div class="input-group ">
					 
							<span class="input-group-addon">
								<i class="	glyphicon glyphicon-hand-right"></i>
							</span>
              				
							<!-- Following code is to get categories from "categories" table of "fertilizer" DB -->
							<!-- getAllMainCat() is implemented in  CategoryDetailsDao with return type List-->
							<%
							   CategoryDetailsDao catdao = new CategoryDetailsDao();
           						List catListPay =catdao.getAllMainCat();
							
							%>
							<input list="cat_drop_For_payment" id="fk_cat_id_for_payment"  class="form-control" >
				<datalist id="cat_drop_For_payment">
							<%
					           for(int i=0;i<catListPay.size();i++){
					        	   CategoryDetailsBean catPaybean =(CategoryDetailsBean)catListPay.get(i);
							%>
		
							<option data-value="<%=catPaybean.getCatId()%>" value="<%=catPaybean.getCategoryName()%>">
							<%
				      			}
				    		%>
			              	
            			</datalist>
            			</div>
					 </div>
					  <div class="col-md-2 control-label">
	           				<label for="paymentMode"> Payment Mode<sup>*</sup></label>  
	           		</div>
	           		
	           		<div class="col-md-3">
							<div class="input-group">
								<span class="input-group-addon">
										<i class="glyphicon glyphicon-usd"></i>
								</span>
	           					<select class="form-control" id="paymentModeId">
										<option value="selected">-Select Type--</option>
										<option value="cash">Cash</option>
										<option value="cheque">Cheque</option>
										<option value="card">Card</option>
										<option value="neft">NEFT</option>
								</select>	
	           				</div>
						</div>
						</div>	
					<div class="row form-group">
				     <div class="col-md-3 Col-md-offset-1">
						<div class="input-group">
												  
								<input type="button"  id="btn" name="save" class="btn btn-lg btn-success btn-md button_hw button_margin_right"
								onclick="paymentModeReport()" value="Search"/>
												     									
						</div>
					</div>	
					</div>
					<div	class="table-responsive">
					<table class= "table table-bordered table-striped table-condensed cf" id="paymentModeSelect" class="display" style=" border: 2px solid black;border-collapse: collapse;">
						<thead>
								<tr>
								<th>Customer Bill No</th>
								<th>Customer Name</th>
								<th>Total Amount</th>
							</tr>
						</thead>
						<tfoot>
							<tr>
								<th colspan="2" style="text-align: right">Total Rs:</th>
								<th></th>
			
							</tr>
						</tfoot>
					</table>
				</div>
				</fieldset>
			</form>
			</div> --%>

						<!----------------------------------------------- Date wise ---------------------------------------->

						<div id="dateWisePaymentMode"
							class="tab-pane active col-md-offset-0">
							<form class="form-horizontal" method="post" action=""
								name="datepaymentMode">
								<fieldset>
									<div class="row form-group" style="margin-top: 30px">
									<label class="col-md-3 control-label"> Enter Date:<sup>*</sup>
									</label>
									<div class="col-md-3">
										<div class="input-group">
											<span class="input-group-addon"> <i
												class="glyphicon glyphicon-calendar"></i>
											</span> <input type="date" id="fDateForPaymentMode"
												placeholder="Start Date" class="form-control input-md"
												type="text">
										</div>
									</div>

									<div class="col-md-2 control-label">
										<label for="paymentMode"> Payment Mode<sup>*</sup></label>
									</div>

									<div class="col-md-3">
										<div class="input-group">
											<span class="input-group-addon"> <i
												class="glyphicon glyphicon-usd"></i>
											</span> <select class="form-control" id="paymentModeIdForDate">
												<option value="selected">-Select Type--</option>
												<option value="cash">Cash</option>
												<option value="cheque">Cheque</option>
												<option value="card">Card</option>
												<option value="neft">NEFT</option>
											</select>

											<%--  <div class="input-group ">
					 
							<span class="input-group-addon">
								<i class="	glyphicon glyphicon-hand-right"></i>
							</span>
              				
							<!-- Following code is to get categories from "categories" table of "fertilizer" DB -->
							<!-- getAllMainCat() is implemented in  CategoryDetailsDao with return type List-->
							<%
							   CategoryDetailsDao paymentModecatdao = new CategoryDetailsDao();
           						List catListPayment =paymentModecatdao.getAllMainCat();
							
							%>
							<input list="cat_drop_For_payment_mode" id="fk_cat_id_for_payment_mode"  class="form-control" >
				<datalist id="cat_drop_For_payment_mode">
							<%
					           for(int i=0;i<catListPayment.size();i++){
					        	   CategoryDetailsBean catPaymentbean =(CategoryDetailsBean)catListPayment.get(i);
							%>
		
							<option data-value="<%=catPaymentbean.getCatId()%>" value="<%=catPaymentbean.getCategoryName()%>">
							<%
				      			}
				    		%>
            			</datalist>
            			</div> --%>
										</div>
									</div>
									</div>

									<div class="row form-group" style="padding-top:2%">
										<div class="col-md-2 col-md-offset-5">
											<div class="input-group">
												<input type="button" id="btn" name="save"
													class="btn  btn-success" style="height: 38px; width: 121px;font-size: 18"
													onclick="paymentModeReportAsPerSingleDate()" value="Search" />
											</div>
										</div>
									</div>
									<div class="container">
									<div class="table-responsive" style="padding-top:2%">
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="SinglePayment" class="display"
											>
											<thead>
												<tr>
													<th>Customer Bill No</th>
													<th>Total Amount</th>
													<th>Cash Payment Amount</th>
													<th>Cheque Payment Amount</th>
													<th>NEFT Payment Amount</th>
													<th>Card Payment Amount</th>
												</tr>
											</thead>
											<tfoot>
												<tr>
													<th colspan="1" style="text-align: right">Total Rs:</th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>

												</tr>
											</tfoot>
										</table>
									</div>
									
									<div class="pagination-page">
                                            <nav aria-label="...">
                                               <ul class="pagination" style="margin-top: 10px; margin-bottom: 40px;">
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

						<!--========================================== RANGE ==================================================-->

						<%-- <div id="rangeWisePaymentMode" class="tab-pane">
			<form class="form-horizontal" method="post" action="" name="twoDatepaymentMode">
					<fieldset>
					<div class="row form-group" style="margin-top: 18px">
	           		 
							<label class="col-md-2 control-label" for="customerName"> Start Date:<sup>*</sup></label>  
				           			 <div class="col-md-3">
										<div class="input-group">
											<span class="input-group-addon">
												<i class="glyphicon glyphicon-user"></i>
											</span>
				           		 			  <input type="date" id="fisDateForPay" placeholder="Start Date" class="form-control input-md" type="text" >
				           		 		</div>
									</div>
				
				           	 <label class="col-md-2 control-label" for="village">End Date:<sup>*</sup></label>
				           	 	<div class="col-md-3">
									<div class="input-group">
										<span class="input-group-addon">
											<i class="glyphicon glyphicon-map-marker"></i>
										</span>
				         	   			  <input type="date" id="endDateForPay" placeholder="End Date" class="form-control input-md ac_district"  type="text">
				          		  	</div>
								</div>
				          </div>
					<div class="row form-group" >
						<!-- <label class="col-md-2  control-label" for="fk_cat_id_for_payment_mode_two">Product Category<sup>*</sup></label> -->
					 <div class="col-md-3">
		
		 			 <div class="input-group ">
					 
							<span class="input-group-addon">
								<i class="	glyphicon glyphicon-hand-right"></i>
							</span>
              				
							<!-- Following code is to get categories from "categories" table of "fertilizer" DB -->
							<!-- getAllMainCat() is implemented in  CategoryDetailsDao with return type List-->
							<%
							   CategoryDetailsDao paymentModecatdao1 = new CategoryDetailsDao();
           						List catListPayment1 =paymentModecatdao1.getAllMainCat();
							
							%>
							<input list="cat_drop_For_payment_mode_two" id="fk_cat_id_for_payment_mode_two" name="fk_cat_id_for_payment_mode_two" class="form-control" >
				<datalist id="cat_drop_For_payment_mode_two">
							<%
					           for(int i=0;i<catListPayment1.size();i++){
					        	   CategoryDetailsBean catPaymentbean1 =(CategoryDetailsBean)catListPayment1.get(i);
							%>
		
							<option data-value="<%=catPaymentbean1.getCatId()%>" value="<%=catPaymentbean1.getCategoryName()%>">
							<%
				      			}
				    		%>
            			</datalist>
            			</div>
					 </div>
					
				     <div class="col-md-3 Col-md-offset-1">
						<div class="input-group">
								<!-- <input type="button"  id="btn" name="save" class="btn btn-lg btn-success btn-md button_hw button_margin_right"
								onclick="saleReportBetweenTwoDatesAsPerShopValidate()" value="Search"/> -->
								<input type="button"  id="btn" name="save" class="btn btn-lg btn-success btn-md button_hw button_margin_right"
								onclick="paymentModeReportForTwoDates()" value="Search"/>
						</div>
					</div>	
					</div>
				<div class="table-responsive">
					<table class= "table table-bordered table-striped table-condensed cf" id="TwoPayment" class="display" style=" border: 2px solid black;border-collapse: collapse;">
						<thead>
								<tr>
								<th>Customer Bill No</th>
								<th>Cash Payment Amount</th>
								<th>Cheque Payment Amount</th>
								<th>NEFT Payment Amount</th>
								<th>Card Payment Amount</th>
							</tr>
						</thead>
						<tfoot>
							<tr>
								<th colspan="1" style="text-align: right">Total Rs:</th>
								<th></th><th></th><th></th><th></th>
			
							</tr>
						</tfoot>
					</table>
				</div>
		
		</fieldset>
		</form>
		</div> --%>


						<!--========================================== RANGE WISE PAYMENT TYPE AND PAYMENT MODE  ==================================================-->

						<div id="rangeWisePaymentTypePaymentMode" class="tab-pane">
							<form class="form-horizontal" method="post" action=""
								name="rangeWisePaymentTypePaymentMode">
								<fieldset>
									<div class="row form-group" style="margin-top: 30px">

										<label class="col-md-3 control-label" for="customerName">Start Date:<sup>*</sup>
										</label>
										<div class="col-md-3">
											<div class="input-group">
												<span class="input-group-addon"> 
												<i class="glyphicon glyphicon-calendar"></i>
												</span> 
												<input type="date" id="fisDateForPay4" placeholder="Start Date" class="form-control input-md" type="text">
											</div>
										</div>

										<label class="col-md-2 control-label" for="village">End	Date:<sup>*</sup>
										</label>
										<div class="col-md-3">
											<div class="input-group">
												<span class="input-group-addon"> 
													<i class="glyphicon glyphicon-calendar"></i>
												</span> 
												<input type="date" id="endDateForPay4" placeholder="End Date" class="form-control input-md ac_district" type="text">
											</div>
										</div>
									</div>
									<div class="row form-group">
										<div class="col-md-3 control-label">
											<label for="paymentModeId4"> Payment Mode<sup>*</sup></label>
										</div>

										<div class="col-md-3">
											<div class="input-group">
												<span class="input-group-addon"> <i
													class="glyphicon glyphicon-usd"></i>
												</span> <select class="form-control" id="paymentModeId4">
													<option value="">-Select Type--</option>
													<option value="cash">Cash</option>
													<option value="cheque">Cheque</option>
													<option value="card">Card</option>
													<option value="neft">NEFT</option>
												</select>
											</div>
										</div>
										</div>
										<div class="row" style="padding-top:2%">
										<div class="col-md-3 Col-md-offset-5">
											<div class="input-group">
												<!-- <input type="button"  id="btn" name="save" class="btn btn-lg btn-success btn-md button_hw button_margin_right"
								onclick="saleReportBetweenTwoDatesAsPerShopValidate()" value="Search"/> -->
												<input type="button" id="btn" name="save"
													class="btn  btn-success " style="height: 38px; width: 121px;font-size: 18"
													onclick="rangeAndPaymentModeWiseValidation()"
													value="Search" />
											</div>
										</div>
									</div>
									<div class="container">
									<div class="table-responsive" style="padding-top:3%">
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="rangeWisePaymentTypePaymentModeDataTable" class="display"
											>
											<thead>
												<tr>
													<th>Customer Bill No</th>
													<th>Total Amount</th>
													<th>Cash Payment Amount</th>
													<th>Cheque Payment Amount</th>
													<th>NEFT Payment Amount</th>
													<th>Card Payment Amount</th>
												</tr>
											</thead>
											<tfoot>
												<tr>
													<th colspan="2" style="text-align: right">Total Rs:</th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>

												</tr>
											</tfoot>
										</table>
									</div>
									<div class="pagination-page">
                                            <nav aria-label="...">
                                               <ul class="pagination" style="margin-top: 10px; margin-bottom: 40px;">
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

				<!--------------------------------------------- ShopWise Sale reports -------------------------------------------------->

				<div class="tab-pane" id="shopWise">
					<div class="row">
						<div align="center">
							<h2 class="form-name style_heading">ShopWise Sale Reports</h2>
						</div>

						<div class="row">
							<div class="col-sm-offset-1 col-md-10">
								<hr style="border-top-color: #c1b1b1;">
							</div>
						</div>
					</div>

					<ul class="nav nav-tabs">
						<!-- < li class="active"><a data-toggle="tab" href="#supplierSingleDate"><h4 style="color:blue">Datewise</h4></a></li> -->
						<li class="active"><a data-toggle="tab"
							href="#shopBetweenTwoDate" style=" border-radius:23px;"><h4>Range</h4></a></li>

					</ul>

					<div class="tab-content" style="float: left">

						<!--    for single date -->
						<!-- <script type="text/javascript"> 
		$(document).ready(function () {
	         var table=$("#sale1").dataTable();
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
	 </script> -->
						<!-- 	 <script type="text/javascript">
	 $(document).ready(function() {
		    $('#sale1').DataTable( {
		        dom: 'Bfrtip',
		        buttons: [
		            'copy', 'csv', 'excel', 'pdf', 'print'
		        ]
		    } );
		} );</script> -->
						<%-- 	<div id="supplierSingleDate" class="tab-pane active">
		        <div class="row">
					<div class="col-sm-offset-1 col-md-10">
						<hr style="border-top-color: #c1b1b1;">
					</div>
				</div>
		 	<form class="form-horizontal" method="post" action="" name="saleReportForm">
				<fieldset>
				<div class="row form-group" style="margin-top: 18px">
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
					
						<label class="col-md-3 control-label" for="">
							Enter Date:<sup>*</sup>
						</label>
						<div class="col-md-3">
							<div class="input-group">
								<span class="input-group-addon"> <i
									class="glyphicon glyphicon-user"></i>
								</span> <input type="date" id="fDate" placeholder="Start Date"
									class="form-control input-md" type="text">
							</div>
						</div>
			</div>
					<div class="row form-group">
						<div class="col-md-3 col-md-offset-3">
							<div class="input-group">
							<div align="center">
								<input type="button" id="btn" name="save" class="btn btn-lg btn-success btn-md button_hw button_margin_right"
								onclick="saleReportForSingleDateAsPerCategory()" value="Search" />
							</div>
							</div>
							</div>
						</div>
					
					<div	class="table-responsive">
					<table id="sale1" class="display" style=" border: 2px solid black;border-collapse: collapse;">
						<thead>
							<tr>
								<th>Customer Bill No</th>
								<th>Product Name</th>
								<th>Sold Date</th>
								<th>Sale Price</th>
								<th>Quantity</th>
								<th>Transport Expenses</th>
								<th>Hamali Expenses</th>
								<th>Total Amount</th>
							</tr>
						</thead>
						<tfoot>
							 <tr>
								<th colspan="7" style="text-align: right">Total Rs:</th>
								<th></th>
							</tr> 
						</tfoot>
					</table>
				</div>
				</fieldset>
			</form>
       </div> --%>

						<!------================================ SALE REPORTS Between Two Dates AS PER SHOP ================================----->
						<div id="#shopBetweenTwoDate" class="tab-pane active">

							<!-- <div class="row">
								<div class="col-sm-offset-1 col-md-10">
									<hr style="border-top-color: #c1b1b1;">
								</div>
							</div> -->


							<form class="form-horizontal" method="post" action=""
								name="saleReportForm1">
								<fieldset>
									<div class="row form-group" style="margin-top: 20px">
										<label class="col-md-3 control-label" for="fk_shop_id">Shop	Name<sup>*</sup>
										</label>
										<div class="col-md-3">
											<div class="input-group">
												<span class="input-group-addon"> <i
													class="	glyphicon glyphicon-user"></i>
												</span>

												<!-- Following code is to get categories from "categories" table of "fertilizer" DB -->
												<!-- getAllMainCat() is implemented in  CategoryDetailsDao with return type List-->
												<%
													shopDetailsDao shdd = new shopDetailsDao();
													List spList = shdd.getAllShops();
												%>

												<input list="shp_drop" id="fkShopId" class="form-control" placeholder="Shop Name">
												<datalist id="shp_drop">

													<%
														for (int i = 0; i < spList.size(); i++) {
															shopDetailsBean shp = (shopDetailsBean) spList.get(i);
													%>

													<option data-value="<%=shp.getShopId()%>"
														value="<%=shp.getShopName()%>">
														<%
															}
														%>
													
												</datalist>
											</div>
										</div>
									</div>
									<div class="row form-group">
										<label class="col-md-3 control-label" for="customerName">Start Date:<sup>*</sup>
										</label>
										<div class="col-md-3">
											<div class="input-group">
												<span class="input-group-addon"> 
													<i class="glyphicon glyphicon-calendar"></i>
												</span> 
												<input type="date" id="fisDate1" placeholder="Start Date" class="form-control input-md" type="text">
											</div>
										</div>

										<label class="col-md-3 control-label" for="endDate">End	Date:<sup>*</sup>
										</label>
										<div class="col-md-3">
											<div class="input-group">
												<span class="input-group-addon">
												 	<i	class="glyphicon glyphicon-calendar"></i>
												</span> 
												<input type="date" id="endDate1" placeholder="End Date"	class="form-control input-md ac_district" type="text">
											</div>
										</div>
									</div>

									<div class="row form-group" style="padding-top:2%">
										<div class="col-md-3 col-md-offset-5">
											<div class="input-group">
												<!-- 								<input type="button" id="btn2" name="save"
									class="btn btn-lg btn-success btn-md button_hw button_margin_right"
									onclick="saleReportBetweenTwoDatesAsPerShop()" value="Search" /> -->

												<input type="button" id="btn2" name="save"
													class="btn  btn-success " style="height: 38px; width: 121px;font-size: 18"
													onclick="saleReportBetweenTwoDatesAsPerShopValidate()"
													value="Search" />

											</div>
										</div>
									</div>
									<div class="container">
<!-- 									<div class="table-responsive" style="padding-top:2%"> -->
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="saleBetTwoDates1" class="display"
											>
											<thead>
												<tr>
													<th>Customer Bill No</th>
													<th>Product Name</th>
													<th>Sold Date</th>
													<th>Sale Price</th>
													<th>Qty</th>
													<th>Unit</th>
													<th>Tax Percentage</th>
													<th>Igst Percentage</th>
													<th>Tax Amount</th>
													<!-- <th>Discount Amount</th> -->
													<th>Total Amount Inc. tax</th>
												</tr>

											</thead>

											<tfoot>
												<tr>
													<th colspan="9" style="text-align: right">Total</th>
													<th></th>
												</tr>
											</tfoot>
										</table>
										<div class="pagination-page">
                                            <nav aria-label="...">
                                               <ul class="pagination" style="margin-top: 10px;margin-right: 20px;">
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

<!-- -------------------------------------------user wise ---------------------------  -->

				<div class="tab-pane" id="userWise">
					<div class="row">
						<div align="center">
							<h2 class="form-name style_heading">User Wise Sale Reports</h2>
						</div>

						<div class="row">
							<div class="col-sm-offset-1 col-md-10">
								<hr style="border-top-color: #c1b1b1;">
							</div>
						</div>
					</div>

					<ul class="nav nav-tabs">
						<!-- < li class="active"><a data-toggle="tab" href="#supplierSingleDate"><h4 style="color:blue">Datewise</h4></a></li> -->
						<li class="active"><a data-toggle="tab"
							href="#shopBetweenTwoDate" style=" border-radius:23px;"><h4>Range</h4></a></li>

					</ul>

					<div class="tab-content" style="float: left">

						<div id="#shopBetweenTwoDate" class="tab-pane active">



							<form class="form-horizontal" method="post" action=""
								name="saleReportForm1">
								<fieldset>
									<div class="row form-group" style="margin-top: 20px">
										<label class="col-md-3 control-label" for="fk_shop_id">User	Name<sup>*</sup>
										</label>
										<div class="col-md-3">
											<div class="input-group">
												<span class="input-group-addon"> <i
													class="	glyphicon glyphicon-user"></i>
												</span>

												<%
													shopDetailsDao shddd = new shopDetailsDao();
													List spListt = shddd.getAlluser();
												%>

												<input list="shp_dropp" id="fkShopIdd" class="form-control" placeholder="User Name">
												<datalist id="shp_dropp">

													<%
														for (int i = 0; i < spListt.size(); i++) {
															UserDetailsBean shp = (UserDetailsBean) spListt.get(i);
													%>

													<option data-value="<%=shp.getUsrId()%>"
														value="<%=shp.getUserName()%>">
														<%
															}
														%>
													
												</datalist>
											</div>
										</div>
									</div>
									<div class="row form-group">
										<label class="col-md-3 control-label" for="customerName">Start Date:<sup>*</sup>
										</label>
										<div class="col-md-3">
											<div class="input-group">
												<span class="input-group-addon"> 
													<i class="glyphicon glyphicon-calendar"></i>
												</span> 
												<input type="date" id="fisDate11" placeholder="Start Date" class="form-control input-md" type="text">
											</div>
										</div>

										<label class="col-md-3 control-label" for="endDate">End	Date:<sup>*</sup>
										</label>
										<div class="col-md-3">
											<div class="input-group">
												<span class="input-group-addon">
												 	<i	class="glyphicon glyphicon-calendar"></i>
												</span> 
												<input type="date" id="endDate11" placeholder="End Date"	class="form-control input-md ac_district" type="text">
											</div>
										</div>
									</div>

									<div class="row form-group" style="padding-top:2%">
										<div class="col-md-3 col-md-offset-5">
											<div class="input-group">
												<!-- 								<input type="button" id="btn2" name="save"
									class="btn btn-lg btn-success btn-md button_hw button_margin_right"
									onclick="saleReportBetweenTwoDatesAsPerShop()" value="Search" /> -->

												<input type="button" id="btn2" name="save"
													class="btn  btn-success " style="height: 38px; width: 121px;font-size: 18"
													onclick="saleReportBetweenTwoDatesAsPeruser()"
													value="Search" />

											</div>
										</div>
									</div>
									<div class="container">
<!-- 									<div class="table-responsive" style="padding-top:2%"> -->
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="saleBetTwoDates10" class="display"
											>
											<thead>
												<tr>
													<th>Customer Bill No</th>
													<th>Product Name</th>
													<th>Sold Date</th>
													<th>Sale Price</th>
													<th>Qty</th>
													<th>Unit</th>
													<th>Tax Percentage</th>
													<th>Tax Amount</th>
													<!-- <th>Discount Amount</th> -->
													<th>Total Amount Inc. tax</th>
												</tr>

											</thead>

											<tfoot>
												<tr>
													<th colspan="8" style="text-align: right">Total</th>
													<th></th>
												</tr>
											</tfoot>
										</table>
										<div class="pagination-page">
                                            <nav aria-label="...">
                                               <ul class="pagination" style="margin-top: 10px; margin-bottom: 40px;margin-right: 15px;">
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



		<!----------------------------------------------------  GST wise ------------------------------------------------------------>
		
				<div class="tab-pane" id="GSTWise">
					<div class="row">
						<div align="center">
							<h2 class="form-name style_heading">GST Wise Sale Reports</h2>
						</div>

						<div class="row">
							<div class="col-sm-offset-1 col-md-10">
								<hr style="border-top-color: #c1b1b1;">
							</div>
						</div> 
					</div>

					<form class="form-horizontal" method="post" action="" name="gst">
						<fieldset>

							<div class="row form-group" style="margin-top: 30px">
								<label class="col-md-3 control-label" for=""> Start	Date:<sup>*</sup>
								</label>
								<div class="col-md-3">
									<div class="input-group">
										<span class="input-group-addon">
										 	<i class="glyphicon glyphicon-calendar"></i>
										</span> 
										<input type="date" id="gstFisDate" placeholder="Start Date"	class="form-control input-md" type="text">
									</div>
								</div>

								<label class="col-md-2 control-label" for="">End Date:<sup>*</sup></label>
								<div class="col-md-3">
									<div class="input-group">
										<span class="input-group-addon"> 
											<i class="glyphicon glyphicon-calendar"></i>
										</span> 
										<input type="date" id="gstEndDate" placeholder="End Date" class="form-control input-md ac_district" type="text">
									</div>
								</div>
							</div>


							<div class="row form-group" >
								<label class="col-md-3  control-label"
									for="fk_cat_id_for_payment_mode">Product Category<sup>*</sup></label>
								<div class="col-md-3">
									<div class="input-group ">
										<span class="input-group-addon"> <i
											class="	glyphicon glyphicon-list-alt"></i>
										</span>

										<!-- Following code is to get categories from "categories" table of "fertilizer" DB -->
										<!-- getAllMainCat() is implemented in  CategoryDetailsDao with return type List-->
										<%
											CategoryDetailsDao GSTcatdao = new CategoryDetailsDao();
											List catListGST = GSTcatdao.getAllMainCat(request);
										%>
										<input list="cat_drop_For_GST" id="fk_cat_id_for_GST" class="form-control" placeholder="Product Category">
										<datalist id="cat_drop_For_GST">
											<%
												for (int i = 0; i < catListGST.size(); i++) {
													CategoryDetailsBean catGSTbean = (CategoryDetailsBean) catListGST.get(i);
											%>

											<option data-value="<%=catGSTbean.getCatId()%>"
												value="<%=catGSTbean.getCategoryName()%>">
												<%
													}
												%>
											
										</datalist>
									</div>
								</div>
								</div>
								
								<div class="row" style="padding-top:2%;padding-bottom:1%">
								<div class="col-md-3 Col-md-offset-5">
									<div class="input-group">
										<input type="button" id="btn" name="save"
											class="btn  btn-success " style="height: 38px; width: 121px;font-size: 18"
											onclick="gstWiseSaleReportValidation()" value="Search" />
									</div>
								</div>
							</div>
							<div class= "container">
							<div class="table-responsive" style="padding-top:2%">
								<table
									class="table table-bordered table-striped table-condensed cf"
									id="gstSale" class="display table table-boardered"
									 >
									<thead>
										<tr>
											<th>Sr No</th>
											<th>Date</th>
											<th>Name Of Customer</th>
											<th>Bill No.</th>
											<th>GST No</th>
											<th>HSN No</th>
											<th>Product Name</th>
											<th>Item Rate</th>
											<th>Quantity</th>
											<th>unit</th>
											<th>Amount</th>
											<th>CGST & SGST 5% Amount</th>
											<th>CGST & SGST 12% Amount</th>
											<th>CGST & SGST 18% Amount</th>
											<th>CGST & SGST 28% Amount</th>
											<th>Total Tax Amount</th>
											<th>Total Amount including Tax</th>

										</tr>
									</thead>
									<tfoot>
										<tr>
											<th colspan="5" style="text-align: right">Total Rs:</th>
											<th></th>
											<th></th>
											<th></th>
											<th></th>
											<th></th>
											<th></th>
											<th></th>
											<th></th>
											<th></th>
											<th></th>
											<th></th>
											<th></th>
										</tr>
									</tfoot>
								</table>
							</div>
							<div class="pagination-page">
                                            <nav aria-label="...">
                                               <ul class="pagination" style="margin-top: 10px; margin-bottom: 40px;margin-right: 15px;">
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
				<!-- </div>
</div> -->

<!---------------------------------------------------- non-GST wise ------------------------------------------------------------>
		
				<div class="tab-pane" id="nonGSTWise">
					<div class="row">
						<div align="center">
							<h2 class="form-name style_heading">Non-GST Wise Sale Reports</h2>
						</div>

						<div class="row">
							<div class="col-sm-offset-1 col-md-10">
								<hr style="border-top-color: #c1b1b1;">
							</div>
						</div> 
					</div>

					<form class="form-horizontal" method="post" action="" name="nongst">
						<fieldset>

							<div class="row form-group" style="margin-top: 30px">
								<label class="col-md-3 control-label" for=""> Start	Date:<sup>*</sup>
								</label>
								<div class="col-md-3">
									<div class="input-group">
										<span class="input-group-addon">
										 	<i class="glyphicon glyphicon-calendar"></i>
										</span> 
										<input type="date" id="nongstFisDate" placeholder="Start Date"	class="form-control input-md" >
									</div>
								</div>

								<label class="col-md-2 control-label" for="">End Date:<sup>*</sup></label>
								<div class="col-md-3">
									<div class="input-group">
										<span class="input-group-addon"> 
											<i class="glyphicon glyphicon-calendar"></i>
										</span> 
										<input type="date" id="nongstEndDate" placeholder="End Date" class="form-control input-md ac_district">
									</div>
								</div>
							</div>


							<div class="row form-group" >
								<label class="col-md-3  control-label"
									for="fk_cat_id_for_payment_mode">Product Category<sup>*</sup></label>
								<div class="col-md-3">
									<div class="input-group ">
										<span class="input-group-addon"> <i
											class="	glyphicon glyphicon-list-alt"></i>
										</span>

										<!-- Following code is to get categories from "categories" table of "fertilizer" DB -->
										<!-- getAllMainCat() is implemented in  CategoryDetailsDao with return type List-->
										<%
											CategoryDetailsDao GSTcatdao1 = new CategoryDetailsDao();
											List catListGST1 = GSTcatdao1.getAllMainCat(request);
										%>
										<input list="cat_drop_For_nonGST" id="fk_cat_id_for_nonGST" class="form-control" placeholder="Product Category">
										<datalist id="cat_drop_For_nonGST">
											<%
												for (int i = 0; i < catListGST1.size(); i++) {
													CategoryDetailsBean catGSTbean = (CategoryDetailsBean) catListGST.get(i);
											%>

											<option data-value="<%=catGSTbean.getCatId()%>"
												value="<%=catGSTbean.getCategoryName()%>">
												<%
													}
												%>
											
										</datalist>
									</div>
								</div>
								</div>
								
								<div class="row" style="padding-top:2%;padding-bottom:1%">
								<div class="col-md-3 Col-md-offset-5">
									<div class="input-group">
										<input type="button" id="btn" name="save" class="btn  btn-success " style="height: 38px; width: 121px;
										       font-size: 18" onclick="nongstWiseSaleReportValidation()" value="Search" />
									</div>
								</div>
							</div>
							<div class="container">
							<div class="table-responsive" style="padding-top:2%">
								<table class="table table-bordered table-striped table-condensed cf"
									id="nongstSale" class="display table table-boardered">
									<thead>
										<tr>
											<th>Sr No</th>
											<th>Date</th>
											<th>Name Of Customer</th>
											<th>Bill No.</th>
											<th>GST No</th>
											<th>HSN No</th>
											<th>Product Name</th>
											<th>Item Rate</th>
											<th>Quantity</th>
											<th>Unit</th>
											<th>Tax %</th>
											<th>Amount</th>
										</tr>
									</thead>
									<tfoot>
										<tr>
											<th colspan="11" style="text-align: right">Total Rs:</th>
											<th></th>
									 	</tr>
									</tfoot>
								</table>
							</div>
							<div class="pagination-page">
                                            <nav aria-label="...">
                                               <ul class="pagination" style="margin-top: 10px; margin-bottom: 40px; margin-right: 25px;">
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


	<!---------------------------------------------------------- Sale return ----------------------------------------------------------->

				<div class="tab-pane" id="saleReturn">
					<div class="row">
						<div align="center">
							<h2 class="form-name style_heading">Sale Return Reports</h2>
						</div>

						<div class="row">
							<div class="col-sm-offset-1 col-md-10">
								<hr style="border-top-color: #c1b1b1;">
							</div>
						</div>
					</div>

					<ul class="nav nav-tabs">
						<!-- < li class="active"><a data-toggle="tab" href="#supplierSingleDate"><h4 style="color:blue">Datewise</h4></a></li> -->
						<li class="active"><a data-toggle="tab" href="#saleReturn1">
						<h4>Bill Wise</h4></a></li>

					</ul>

					<div class="tab-content" style="float: left">


		<!-------------------------------------------- 	Between Two Dates  -------------------------------------------------->
		
						<div id="#saleReturn1" class="tab-pane active">

							< <div class="row">
								<div class="col-sm-offset-1 col-md-10">
									<hr style="border-top-color: #c1b1b1;">
								</div>
							</div> 


							<form class="form-horizontal" method="post" action=""
								name="saleReturnForm1">
								<fieldset>
									<div class="row form-group">
										<label class="col-md-2 control-label" for="billNo">Bill	No</label>
										<div class="col-md-3">
											<div class="input-group "">
												<span class="input-group-addon"> <i
													class="glyphicon glyphicon-hand-right"></i>
												</span>

												<%
													FertilizerBillDao sdd = new FertilizerBillDao();
													List pList = sdd.getAllBillNoOnSaleReturn();
												%>
												<input list="bill_no_drop" id="bill_no" class="form-control">
												<datalist id="bill_no_drop"
													style="overflow-x: hidden; overflow: scroll; width: 100%; height: 500px">

													<%
														for (int i = 0; i < pList.size(); i++) {
															FertilizerBillBean sup = (FertilizerBillBean) pList.get(i);
													%>

													<option data-value="<%=sup.getBillNo()%>"
														value="<%=sup.getBillNo()%> ">
														<%
															}
														%>
													
												</datalist>
											</div>
										</div>
									</div>
									<div class="form-group row" style="padding-top:2%">
										<div class="col-md-10 text-center">
											<!-- <button id="save" name="save" class="btn btn-large btn-success" onclick="saleReturn()"> Submit</button>
              			<button class="btn btn-large btn-danger" type="reset"> Cancel </button>
              			 -->
											<input type="button" id="save" name="save"
												style="height: 38px; width: 121px;font-size: 18"
												class="btn btn-large btn-success button-height-width"
												onclick="saleReturnReportAsPerBill()" value="Submit">
										</div>
									</div>
									<div class="container">
									<div class="table-responsive" style="padding-top:2%">
										<table class="table table-bordered table-striped table-condensed cf"
											id="salereturn" class="display"
											>
											<thead>
												<tr>
													<th>Bill No</th>
													<th>Product Name</th>
													<th>Sold Date</th>
													<th>Sale Price</th>
													<th>Quantity</th>
													<th>Return Date</th>
													<th>Return Amount</th>
													<th>Return Quantity</th>
													<th>Total Amount</th>
												</tr>

											</thead>

											<tfoot>
												<tr>
													<th colspan="8" style="text-align: right">Total</th>
													<th></th>
												</tr>
											</tfoot>
										</table>
									</div>
									<div class="pagination-page">
                                            <nav aria-label="...">
                                               <ul class="pagination" style="margin-top: 10px; margin-bottom: 40px;">
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



		<!-- ========================================= BILL WISE SALE REPORTS ============================================= -->
				
				<div class="tab-pane" id="rangeWiseBillReport">
					<div class="row">
						<div align="center">
							<h2 class="form-name style_heading">Bill Wise Sale Reports</h2>
						</div>

						 <div class="row">
							<div class="col-sm-offset-0 col-md-10">
								<hr style="border-top-color: #c1b1b1;">
							</div>
						</div> 
					</div>

					<div id="rangeWiseBillReport" class="tab-pane">
						<form class="form-horizontal" method="post" action=""
							name="rangeWiseBillReportFormName">
							<fieldset>
								<div class="row form-group" style="margin-top: 30px">

									<label class="col-md-2 control-label" for="fisDateForPay"> Start Date:<sup>*</sup>
									</label>
									<div class="col-md-3">
										<div class="input-group">
											<span class="input-group-addon"> 
												<i class="glyphicon glyphicon-calendar"></i>
											</span> 
											<input type="date" id="fisDateForBillReport" placeholder="Start Date" class="form-control input-md"	type="text">
										</div>
									</div>

									<label class="col-md-3 control-label" for="endDateForPay">End Date:<sup>*</sup>
									</label>
									<div class="col-md-3">
										<div class="input-group">
											<span class="input-group-addon"> 
												<i class="glyphicon glyphicon-calendar"></i>
											</span> 
											<input type="date" id="endDateForBillReport" placeholder="End Date" class="form-control input-md ac_district" type="text">
										</div>
									</div>
									<div class="col-md-2 col-md-offset-5 text-center" style="padding-top:2%">
										<input type="button" id="save" name="save"
											style="height: 38px; width: 121px;font-size: 18"
											class="btn  btn-success "
											onclick="billWiseSaleReportGrossTotalValidation()"
											value="Submit">
									</div>
								</div>
								<div class="form-group row"></div>
                                <div class="container">
								<div class="table-responsive" style="padding-top:1%">
									<table
										class="table table-bordered table-striped table-condensed cf"
										id="rangeWiseBillReportDataTable" class="display"
										>
										<thead>
											<tr>
												<th>Customer Bill No</th>
												<th>Customer Name</th>
												<th>Total Amount</th>
												<th>Paid Amount</th>
												<th>Balance Amount</th>
												<th>Date</th>
											</tr>
										</thead>
										<tfoot>
											<tr>
												<th colspan="2" style="text-align: right">Total Rs:</th>
												<th></th>
												<th></th>
												<th></th>
												<th></th>
											</tr>
										</tfoot>
									</table>
								</div>
								<div class="pagination-page">
                                            <nav aria-label="...">
                                               <ul class="pagination" style="margin-top: 10px; margin-bottom: 40px;margin-right: 25px;">
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




				<!-- ===================== ALL CREDIT CUSTOMER BILL REPORTS ================================ -->


				<!--  <div class="tab-pane active" id="creditCustomerSaleReport"> -->
				<div class="tab-pane" id="creditCustomerSaleReport">
					<div class="row">
						<div align="center">
							<h2 class="form-name style_heading">Credit Customer Sale
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
							href="#creditCustomerSaleReportsSingleDateWise" style=" border-radius:23px;"><h4>Bill No. and Name Wise</h4></a></li>
						<!--    <li><a data-toggle="tab" href="#creditCustomerSaleReportsDateRangeWise"><h4 style="color:blue">Range</h4></a></li> -->

					</ul>

					<div class="tab-content" style="float: left">


						<div id="creditCustomerSaleReportsSingleDateWise"
							class="tab-pane active">
							<!--  <div class="row">
								<div class="col-sm-offset-1 col-md-10">
									<hr style="border-top-color: #c1b1b1;">
								</div>
							</div>  -->
							<form class="form-horizontal" method="post" action=""
								name="creditCustomerSaleReportSingleDateForm"
								id="creditCustomerSaleReportSingleDateForm">
								<%
									FertilizerBillDao ccfd = new FertilizerBillDao();
									List cclist = ccfd.getCreditCustFertilizerBillNos();
								%>
								<fieldset>
									<div class="row form-group" style="margin-top: 30px">
										<!-- <label class="col-md-2 col-sm-offset-0 control-label" for="fk_cat_id">Product Category<sup>*</sup></label> -->
										<label class="col-md-3 control-label" for="creditCustBillId">Credit
											Customer Name<sup>*</sup>
										</label>
										<div class="col-md-3">
											<div class="input-group">
												<span class="input-group-addon"> <i
													class="	glyphicon glyphicon-user"></i>
												</span>

												<!-- Following code is to get categories from "categories" table of "fertilizer" DB -->
												<!-- getAllMainCat() is implemented in  CategoryDetailsDao with return type List-->
												<%
													/* CategoryDetailsDao cdd = new CategoryDetailsDao();
													List cList =cdd.getAllMainCat(); */
												%>
												<input list="creditCustDrop" id="creditCustBillId" placeholder="Credit Customer Name"
													class="form-control">
												<datalist id="creditCustDrop">
													<%
														for (int i = 0; i < cclist.size(); i++) {
															GetBillDetails ccbillList = (GetBillDetails) cclist.get(i);
													%>
													<option data-value="<%=ccbillList.getBillNo()%>"
														value="<%=ccbillList.getBillNo()%>   <%=ccbillList.getClientName()%>">
														<%
															}
														%>
													
												</datalist>
											</div>
										</div>

										 <label class="col-md-2 control-label" for="fDateCrteditCustSingleDate">
							Enter Date:<sup>*</sup>
						</label>
						<div class="col-md-3">
							<div class="input-group">
								<span class="input-group-addon"> <i
									class="glyphicon glyphicon-calendar"></i>
								</span> <input type="date" id="fDateCrteditCustSingleDate" placeholder="Start Date"
									class="form-control input-md" type="text">
							</div>
						</div> 
										</div> 
											<div class="row form-group"style="padding-top:2%"> 
										<div class="col-md-3 col-md-offset-5">
											<div class="input-group">
												<div align="center">
													<input type="button" id="CreditCustbtn1"
														name="CreditCustbtn1" style="height: 38px; width: 121px;font-size: 18"
														class="btn btn-success "
														onclick="creditCustomerSaleReportBillAndNameWiseValidation()"
														value="Search" />
												</div>
											</div>
										</div>
									</div>
                                    <div class="container">
									<div class=" table-responsive " style="padding-top:2%">
										<table class="table table-bordered table-striped table-condensed cf" id="creditCustSaleReportSingledate"
											class="display " 
											>
											<thead>
												<tr>
													<th>Customer Bill No</th>
													<th>Product Name</th>
													<th>Sold Date</th>
													<th>Sale Price</th>
													<th>Qty</th>
													<th>Unit</th>
													<th>Tax%</th>
													<th>Tax Amount</th>
													<th>Discount Amount</th>
													<th>Hamali Expense</th>
													<th>Total Amount<br>(Incl. Tax)
													</th>
													<th>Paid Amount</th>
												</tr>
											</thead>
											<tfoot>
												<tr>
													<th colspan="7" style="text-align: right">Total Rs:</th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
												</tr>
											</tfoot>
										</table>
									</div>
									<div class="pagination-page">
                                            <nav aria-label="...">
                                               <ul class="pagination" style="margin-top: 10px; margin-bottom: 40px;">
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



				<!-- CASH CUSTOMER SALE REPORTS <--
													
		    <!--  <div class="tab-pane active" id="creditCustomerSaleReport"> -->
				<div class="tab-pane" id="cashCustomerSaleReport">
					<div class="row">
						<div align="center">
							<h2 class="form-name style_heading">Cash Customer Sale
								Reports</h2>
						</div>

						< <div class="row">
							<div class="col-sm-offset-1 col-md-10">
								<hr style="border-top-color: #c1b1b1;">
							</div>
						</div> 
					</div>

					<ul class="nav nav-tabs">
						<li class="active"><a data-toggle="tab"
							href="#cashCustomerSaleReportsSingleDateWise" style=" border-radius:23px;"><h4
									>Bill No and Name Wise</h4></a></li>
						<!--    <li><a data-toggle="tab" href="#creditCustomerSaleReportsDateRangeWise"><h4 style="color:blue">Range</h4></a></li> -->

					</ul>

					<div class="tab-content" style="float: left">

						<div id="cashCustomerSaleReportsSingleDateWise"
							class="tab-pane active">
							<!-- <div class="row">
								<div class="col-sm-offset-1 col-md-10">
									<hr style="border-top-color: #c1b1b1;">
								</div>
							</div> -->
							<form class="form-horizontal" method="post" action=""
								name="cashCustomerSaleReportSingleDateForm"
								id="cashCustomerSaleReportSingleDateForm">
								<%
									FertilizerBillDao cashcfd = new FertilizerBillDao();
									List cashclist = cashcfd.getCashCustFertilizerBillNos();
								%>
								<fieldset>
									<div class="row form-group" style="margin-top: 20px">
										<!-- <label class="col-md-2 col-sm-offset-0 control-label" for="fk_cat_id">Product Category<sup>*</sup></label> -->
										<label class="col-md-3 col-md-offset-3 control-label" for="cashCustBillId">Cash
											Customer Name<sup>*</sup>
										</label>
										<div class="col-md-3">
											<div class="input-group">
												<span class="input-group-addon"> <i
													class="	glyphicon glyphicon-hand-right"></i>
												</span>

												<!-- Following code is to get categories from "categories" table of "fertilizer" DB -->
												<!-- getAllMainCat() is implemented in  CategoryDetailsDao with return type List-->
												<%
													/* CategoryDetailsDao cdd = new CategoryDetailsDao();
													List cList =cdd.getAllMainCat(); */
												%>
												<input list="cashCustDrop" id="cashCustBillId" placeholder="Customer Name"
													class="form-control">
												<datalist id="cashCustDrop">
													<%
														for (int i = 0; i < cashclist.size(); i++) {
															GetBillDetails cashcbillList = (GetBillDetails) cashclist.get(i);
													%>
													<option data-value="<%=cashcbillList.getBillNo()%>"
														value="<%=cashcbillList.getBillNo()%>   <%=cashcbillList.getClientName()%>">
														<%
															}
														%>
													
												</datalist>
											</div>
										</div>
										</div>

										<!-- <label class="col-md-3 control-label" for="fDateCrteditCustSingleDate">
							Enter Date:<sup>*</sup>
						</label>
						<div class="col-md-3">
							<div class="input-group">
								<span class="input-group-addon"> <i
									class="glyphicon glyphicon-user"></i>
								</span> <input type="date" id="fDateCrteditCustSingleDate" placeholder="Start Date"
									class="form-control input-md" type="text">
							</div>
						</div> -->
										<!-- </div> -->
												<div class="row form-group" style="padding-top:2%"> 
										<div class="col-md-3 col-md-offset-5 ">
											<div class="input-group">
												<div align="center">
													<input type="button" id="cashCustbtn1" name="cashCustbtn1"
														class="btn  btn-success "  
														onclick="cashCustomerSaleReportBillAndNameWiseValidation()"
														value="Search" style="height: 38px; width: 121px;font-size: 18"/>
												</div>
											</div>
										</div>
									</div>
                                    <div class="container">
									<div class="table-responsive" style="padding-top:2%">
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="cashCustSaleReportSingledate" class="display"
											>
											<thead>
												<tr>
													<th>Customer Bill No</th>
													<th>Product Name</th>
													<th>Sold Date</th>
													<th>Sale Price</th>
													<th>Qty</th>
													<th>Unit</th>
													<th>Tax%</th>
													<th>Tax Amount</th>
													<th>Discount Amount</th>
													<th>Hamali Expense</th>
													<th>Total Amount<br>(Incl. Tax)
													</th>
													<th>Paid Amount</th>
												</tr>
											</thead>
											<tfoot>
												<tr>
													<th colspan="7" style="text-align: right">Total Rs:</th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
												</tr>
											</tfoot>
										</table>
									</div>
									<div class="pagination-page">
                                            <nav aria-label="...">
                                               <ul class="pagination" style="margin-top: 10px; margin-bottom: 40px;margin-right: 15px;">
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


				<!--  ///////////////////Sale Return Reports///////////////// -->

				<div class="tab-pane" id="saleReturnReport">
					<div class="row">
						<div align="center">
							<h2 class="form-name style_heading">Sale Return Reports</h2>
						</div>

						<div class="row">
							<div class="col-sm-offset-1 col-md-10">
								<hr style="border-top-color: #c1b1b1;">
							</div>
						</div>
					</div>
							<div class="tab-content" style="float: left">
							
							<div id="saleReturnReport" class="tab-pane active">
					<form class="form-horizontal" method="post" action=""
						name="saleReportForm">

						
							<ul class="nav nav-tabs" style="margin-top: -41px;">
								<li class="active"><a data-toggle="tab"
									href="#saleReturnReport" style=" border-radius:23px;"><h4>Range
											Wise</h4></a></li>
							</ul>


<!-- 							<div class="tab-content" style="float: left">
							
							<div id="saleReturnReport" class="tab-pane active"> -->
							<!-- <div class="row">
								<div class="col-sm-offset-1 col-md-10">
									<hr style="border-top-color: #c1b1b1;">
								</div>
							</div> -->
							<fieldset>
								<div class="row form-group" style="margin-top:30px">
									<label class="col-md-2 control-label" for=""> Start	Date:<sup>*</sup>
									</label>
									<div class="col-md-3">
										<div class="input-group">
											<span class="input-group-addon"> 
												<i class="glyphicon glyphicon-calendar"></i>
											</span> 
											<input type="date" id="StartDate1" placeholder="Start Date"	class="form-control input-md" type="text">
										</div>
									</div>

									<label class="col-md-2 control-label" for="">End Date:<sup>*</sup></label>
									<div class="col-md-3">
										<div class="input-group">
											<span class="input-group-addon"> 
												<i class="glyphicon glyphicon-calendar"></i>
											</span> 
											<input type="date" id="EndDate1" placeholder="End Date"	class="form-control input-md ac_district" type="text">
										</div>
									</div>
								</div>
								
								<div class="row" style="padding-top:2%; padding-bottom:2%">
								<div class="col-md-3 col-md-offset-5">
									<div class="input-group">
										<input type="button" id="btn" name="save"
											class="btn  btn-success " style="height: 38px; width: 121px;font-size: 18"
											onclick="saleReturnReportBetweenTwoDate()" value="Search" />
									</div>
								</div>

							</div>

                               
                           <div class="container">
							<div class="table-responsive" style="padding-top:1%">
								<table class="table table-bordered table-striped table-condensed cf" id="saleReturnTable" class="display"
									>
									<thead>
										<tr>
											<th>Product Name</th>
											<th>Company</th>
											<th>packing</th>
											<th>sale Price</th>
											<th>Return Qty</th>
											<th>Return Date</th>
											<th>Tax percentage</th>

										</tr>
									</thead>
									<tfoot>

										<!-- <th colspan="7" style="text-align: right">Total Rs:</th> -->


									</tfoot>
								</table>

							</div>
							<div class="pagination-page">
                                            <nav aria-label="...">
                                               <ul class="pagination" style="margin-top: 10px; margin-bottom: 40px;">
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
				</div></div>
				<!-- bill cancel -->
				
<!-- 								<div class="tab-pane" id="billcancelReport">
					<div class="row">
						<div align="center">
							<h2 class="form-name style_heading">Bill Cancel Reports</h2>
						</div>

						<div class="row">
							<div class="col-sm-offset-1 col-md-10">
								<hr style="border-top-color: #c1b1b1;">
							</div>
						</div>
					</div>

					<form class="form-horizontal" method="post" action="" name="billReportForm">

						
							<ul class="nav nav-tabs" style="margin-top: -41px;">
								<li class="active"><a data-toggle="tab"
									href="#billcancelReport" style=" border-radius:23px;"><h4>Range
											Wise</h4></a></li>
							</ul>


							<div class="tab-content" style="float: left">
							
							<div id="billcancelReport" class="tab-pane active">
							
							<fieldset>
								<div class="row form-group" style="margin-top:30px">
									<label class="col-md-2 control-label" for=""> Start	Date:<sup>*</sup>
									</label>
									<div class="col-md-3">
										<div class="input-group">
											<span class="input-group-addon"> 
												<i class="glyphicon glyphicon-calendar"></i>
											</span> 
											<input type="date" id="StartDate10" placeholder="Start Date"	class="form-control input-md" type="text">
										</div>
									</div>

									<label class="col-md-2 control-label" for="">End Date:<sup>*</sup></label>
									<div class="col-md-3">
										<div class="input-group">
											<span class="input-group-addon"> 
												<i class="glyphicon glyphicon-calendar"></i>
											</span> 
											<input type="date" id="EndDate10" placeholder="End Date"	class="form-control input-md ac_district" type="text">
										</div>
									</div>
								</div>
								
								<div class="row" style="padding-top:2%; padding-bottom:2%">
								<div class="col-md-3 col-md-offset-5">
									<div class="input-group">
										<input type="button" id="btn" name="save"
											class="btn  btn-success " style="height: 38px; width: 121px;font-size: 18"
											onclick="billReportBetweenTwoDate()" value="Search" />
									</div>
								</div>

							</div>

                               

							<div class="table-responsive" style="padding-top:1%">
								<table class="table table-bordered table-striped table-condensed cf" id="billTable" class="display"
									>
									<thead>
										<tr>
											<th>Sr no</th>
											<th>Bill No</th>
											<th>Bill Amount</th>
											<th>Bill Type</th>
											<th>Customer Type</th>
											<th>Bill Date</th>
											<th>Bill Cancel Date</th>


										</tr>
									</thead>
									<tfoot>


									</tfoot>
								</table>

							</div>
						</fieldset>
						</form>
				</div>  -->
				
				<!--mm  -->
				
						<!-- ========================================= BILL WISE SALE REPORTS ============================================= -->
				
				<div class="tab-pane" id="billcancelReport">
					<div class="row">
						<div align="center">
							<h2 class="form-name style_heading">Bill Cancel Reports</h2>
						</div>

						 <div class="row">
							<div class="col-sm-offset-0 col-md-10">
								<hr style="border-top-color: #c1b1b1;">
							</div>
						</div> 
					</div>

					<div id="billcancelReport" class="tab-pane">
						<form class="form-horizontal" method="post" action=""
							name="rangeWiseBillcnclReportFormName">
							<fieldset>
								<div class="row form-group" style="margin-top: 30px">

									<label class="col-md-2 control-label" for="fisDateForPay"> Start Date:<sup>*</sup>
									</label>
									<div class="col-md-3">
										<div class="input-group">
											<span class="input-group-addon"> 
												<i class="glyphicon glyphicon-calendar"></i>
											</span> 
											<input type="date" id="StartDate10" placeholder="Start Date" class="form-control input-md"	type="text">
										</div>
									</div>

									<label class="col-md-3 control-label" for="endDateForPay">End Date:<sup>*</sup>
									</label>
									<div class="col-md-3">
										<div class="input-group">
											<span class="input-group-addon"> 
												<i class="glyphicon glyphicon-calendar"></i>
											</span> 
											<input type="date" id="EndDate10" placeholder="End Date" class="form-control input-md ac_district" type="text">
										</div>
									</div>
									<div class="col-md-2 col-md-offset-5 text-center" style="padding-top:2%">
										<input type="button" id="save" name="save"
											style="height: 38px; width: 121px;font-size: 18"
											class="btn  btn-success "
											onclick="billReportBetweenTwoDate()"
											value="Submit">
									</div>
								</div>
								<div class="form-group row"></div>
                                <div class="container">
								<div class="table-responsive" style="padding-top:1%">
									<table
										class="table table-bordered table-striped table-condensed cf"
										id="billTable" class="display"
										>
										<thead>
											<tr>
											<th>Sr no</th>
											<th>Bill No</th>
											<th>Bill Amount</th>
											<th>Bill Type</th>
											<th>Customer Type</th>
											<th>Bill Date</th>
											<th>Bill Cancel Date</th>
											</tr>
										</thead>
										
									</table>
								</div>
								<div class="pagination-page">
                                            <nav aria-label="...">
                                               <ul class="pagination" style="margin-top: 10px; margin-bottom: 40px;margin-right:15px">
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
				
				
				<!-- alll -->
				
				
				
				
				
				</div>
				</div>
				</div>
				</div>
			
			<jsp:include page="commons/footer.jsp"></jsp:include>