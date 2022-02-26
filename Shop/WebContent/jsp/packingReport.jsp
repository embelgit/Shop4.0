
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


<!-- <script src="/Shop/staticContent/js/jquery-1.12.3.min.js"></script>
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
<script type="text/javascript"	src="/Shop/staticContent/js/bootbox.min.js"></script> -->

<!-- For datatable to pdf,print,excel etc conversion -->

<!-- <script type="text/javascript" 
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
	href="https://cdn.datatables.net/buttons/1.3.1/css/buttons.dataTables.min.css"> -->


<link href="/Shop/WebContent/staticContent/css/dataTa.css" rel="stylesheet" type="text/css" media="all" />
	<link href="/Shop/staticContent/css/dataTables.jqueryui.min.css"  rel="stylesheet" type="text/css" media="all">
	<link rel="stylesheet" href="/Shop/staticContent/css/tabDemo.css">
 	<link rel="stylesheet" href="/Shop/staticContent/css/jquery-ui.min.css">
    <link rel="stylesheet" href="/Shop/staticContent/css/ui.jqgrid.min.css">
    
    <script src="/Shop/staticContent/js/jquery.min.js"></script>
    <script src="/Shop/staticContent/js/jquery.jqgrid.min.js"></script>
	<script src="/Shop/staticContent/js/jquery.dataTables.js" type="text/javascript"></script>
	<script type="text/javascript" src="/Shop/staticContent/js/jqueryUi.js"></script>
	<script type="text/javascript" src="/Shop/staticContent/js/categoryDetails.js"></script>
	
<link rel="stylesheet" href="/Shop/staticContent/css/shopstyle.css">

<script src="/Shop/staticContent/js/saleReports.js">
	function cancle() {
		location.reload()
	}
</script>
<style>
.container-fluid {
	overflow: hidden;
}
/* .pagination {
    float: right !important;
    margin-top: -11px;
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
} */

</style>
</head>
<body>
	<div class="container-fluid">

				<div class="tab-pane active" id="home">
					<div class="row">
						<div align="center" style="padding-top: 2%;">
							<h2 class="form-name style_heading">Packing Reports</h2>
						</div>

						<div class="row" align="center">
							<div class="hr-width">
								<hr class="style-one">
							</div>
						</div>
					</div>
		
						<!-------------------------------------- 	Between Two Dates  -------------------------------------------->
						
						<div id="supplierBetweenTwoDate">

							<form class="form-horizontal" method="post" action="" name="saleReportFormRange">
								<fieldset>
									<div class="shopform-margin">
									
									<div class="row form-group" style="margin-top: 30px">

									<div class="row">
										<div class="form-group">
											<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
												<label class="control-label" for="customerName">Start Date:<sup>*</sup></label>
											</div>
											<div class="col-lg-3 col-md-3 col-sm-8">
												<div class="input-group">
													<span class="input-group-addon">
														<i class="glyphicon glyphicon-calendar"></i>
													</span> 
													<input type="date" id="fisDate" placeholder="Start Date" class="form-control input-md" type="text">
												</div>
											</div>
											<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">
												<label class="control-label" for="endDate">End Date:<sup>*</sup></label>
											</div>
											<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
												<div class="input-group">
													<span class="input-group-addon">
														<i class="glyphicon glyphicon-calendar"></i>
													</span> 
													<input type="date" id="endDate" placeholder="End Date" class="form-control input-md ac_district" type="text">
												</div>
											</div>
										</div>
									</div>
									
								</div>	
							</div>
								</fieldset>
							</form>
							
									<div class="row buttons-margin" align="center">
										<input type="button" id="btn" name="save" class="btn btn-success" onclick="packingReportBetweenTwoDates()" value="Search" />
									</div>
								
									<div class="prodsearmargin" id="demo_jui" style="padding-top: 2%">
<!-- 									<div class="table-responsive" style="padding-top:2%"> -->
										<table class="table table-bordered table-striped table-condensed cf"
											id="saleBetTwoDates" class="display">
											<thead>
												<tr>
													<th>Product Name</th>
													<th>Quantity</th>
													<th>Weight</th>
													<th>Unit</th>
													<th>Date</th>
												</tr>
											</thead>
										</table>
									<!-- </div> -->
									
									<!-- <div class="pagination-page">
                                            <nav aria-label="...">
                                               <ul class="pagination" style="margin-top:-10px; margin-bottom: 40px;">
                                                   <li class="page-item disabled">
                                                        <a class="page-link" href="#">Previous</a>
                                                   </li>
                                                <li class="page-item"><a class="page-link" href="#">1</a></li>
                                                   <li class="page-item">
                                                        <span class="page-link">
                                                                1
                                                       <span class="sr-only">(current)</span>
                                                       </span>
                                                   </li>
                                                 <li class="page-item"><a class="page-link" href="#">3</a></li>
                                                   <li class="page-item">
                                                        <a class="page-link" href="#">Next</a>
                                                   </li>
                                               </ul>
                                           </nav>
                                       </div> -->
                                       
									</div>
									</div>
									
								
						</div>
					

	</div>
</body>
</html>