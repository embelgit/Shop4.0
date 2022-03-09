<%@page import="com.Fertilizer.hibernate.CategoryDetailsBean"%>
<%@page import="com.Fertilizer.dao.CategoryDetailsDao"%>
<%@page import="com.Fertilizer.dao.SupplierDetailsDao"%>
<% boolean isHome=false;%>
<%@include file="commons/header.jsp"%>
<%@page import="java.util.List"%>
<head>
   <script type="text/javascript" src="/Shop/staticContent/js/taxCreation.js"></script>

<!-- <script src="/Shop/staticContent/js/jquery-1.12.3.min.js"></script>
<script type="text/javascript" src="/Shop/staticContent/js/selectjj.js"></script>
<script type="text/javascript" src="/Shop/staticContent/js/buttom.js"></script>
<script src="/Shop/staticContent/js/jquery.min.js"></script>
<script src="/Shop/staticContent/js/jquery.jqgrid.min.js"></script>
<script src="/Shop/staticContent/js/jquery.dataTables.js" type="text/javascript"></script>
<script type="text/javascript" src="/Shop/staticContent/js/jqueryUi.js"></script>
<script type="text/javascript" src="/Shop/staticContent/js/bootstrap.js"></script>
<script type="text/javascript" src="/Shop/staticContent/js/bootbox.min.js"></script>
<script type="text/javascript" src="//code.jquery.com/jquery-1.12.4.js"></script> 
 <script type="text/javascript" src="https://cdn.datatables.net/1.10.15/js/jquery.dataTables.min.js"></script>
<script type="text/javascript" src="https://cdn.datatables.net/buttons/1.3.1/js/dataTables.buttons.min.js"></script>
<script type="text/javascript" src="//cdn.datatables.net/buttons/1.3.1/js/buttons.flash.min.js"></script>
<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>
<script type="text/javascript" src="//cdn.rawgit.com/bpampuch/pdfmake/0.1.27/build/pdfmake.min.js"></script>

<script type="text/javascript" src="//cdn.rawgit.com/bpampuch/pdfmake/0.1.27/build/vfs_fonts.js"></script>
<script type="text/javascript" src="//cdn.datatables.net/buttons/1.3.1/js/buttons.html5.min.js"></script>
<script type="text/javascript" src="//cdn.datatables.net/buttons/1.3.1/js/buttons.print.min.js"></script>

<link href="/Shop/WebContent/staticContent/css/dataTa.css" rel="stylesheet" type="text/css" media="all" />
<link href="/Shop/staticContent/css/dataTables.jqueryui.min.css" rel="stylesheet" type="text/css" media="all">
<link href="/Shop/staticContent/css/select.css" rel="stylesheet" type="text/css" media="all">
<link href="/Shop/staticContent/css/button.css" rel="stylesheet" type="text/css" media="all">
<link rel="stylesheet" href="/Shop/staticContent/css/jquery-ui.min.css">
<link rel="stylesheet" href="/Shop/staticContent/css/ui.jqgrid.min.css"> -->


<link href="/Shop/WebContent/staticContent/css/dataTa.css" rel="stylesheet" type="text/css" media="all" />
	<link href="/Shop/staticContent/css/dataTables.jqueryui.min.css"  rel="stylesheet" type="text/css" media="all">
	<link rel="stylesheet" href="/Shop/staticContent/css/tabDemo.css">
 	<link rel="stylesheet" href="/Shop/staticContent/css/jquery-ui.min.css">
    <link rel="stylesheet" href="/Shop/staticContent/css/ui.jqgrid.min.css">
    
    <script src="/Shop/staticContent/js/jquery.min.js"></script>
    <script src="/Shop/staticContent/js/jquery.jqgrid.min.js"></script>
	<script src="/Shop/staticContent/js/jquery.dataTables.js" type="text/javascript"></script>
	<script type="text/javascript" src="/Shop/staticContent/js/jqueryUi.js"></script>
	
	<script type="text/javascript" src="/Shop/staticContent/js/bootstrap.js"></script>
<script type="text/javascript" src="/Shop/staticContent/js/bootbox.min.js"></script>

<link rel="stylesheet" href="/Shop/staticContent/css/shopstyle.css">
<style>
.container-fluid {
	overflow: hidden;
}
table.table.table-bordered.table-striped.table-condensed.cf.dataTable {
    width: 100% !important;
}
.dataTables_scrollFootInner {
    width: 100% !important;
}
table#purchaseTaxSingle {
    width: 100% !important;
}
.dataTables_scrollHeadInner {
    width: 100% !important;
}
</style>
</head>
<body>
<div class="container-fluid" > 
<div class="row" style="min-height:300px;">

 <div class=""> 
 		
 		<div class="row">
			<div align="center" style="margin-top: 75px">
				  <h2 class="form-name style_heading">Tax Reports</h2>
			</div>
				 	
			<div class="row" align="center">
				<div class="hr-width">
					<hr class="style-one">
				</div>	
			</div>
			 
		</div>
		
		<div class="tax-reports">
			<ul class="nav nav-tabs">
				<li class="active"><a data-toggle="tab" href="#sale">Sale</a></li>
				<li><a data-toggle="tab" href="#purchase">Purchase</a></li>
	 		</ul>
	 	</div>
 		
 		<div class="tab-content">

<!-------------------------------------------------- Tax report from sale Starts Here -------------------------------------------------->
 		<div id="sale" class="tab-pane fade in active">
<%--  <!-- 			<ul class="nav nav-tabs">
			   	<li class="active"><a data-toggle="tab" href="#singleSale"><h4 style="color:blue">Single Date</h4></a></li>
			    <li><a data-toggle="tab" href="#twoSale"><h4 style="color:blue">Between Two Dates</h4></a></li>
 			</ul>
 		<div class="tab-content" style="float: left">
 		<div id="singleSale" class="tab-pane fade in active"> -->
		<form class="form-horizontal" method="post" action="" name="fertiBill">
					<fieldset>
				         <div class="row form-group" style="margin-top: 20px">
								<label class="col-md-3 control-label" for="fk_cat_id">Product Category<sup>*</sup></label>  
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
										<input list="cat_drop_for_sale" id="fk_cat_id_for_sale"  class="form-control">
							<datalist id="cat_drop_for_sale">
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
		
						<label class="col-md-3 control-label" >
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
				     <div class="col-md-3 col-md-offset-4">
						<div class="input-group">
												  
								<input type="button"  id="btn" name="save" class="btn btn-lg btn-success btn-md button_hw button_margin_right"onclick="taxReportForSale()" value="Search"/>
												     									
						</div>
					</div>	
				</div>
				
					<table id="saleTax" class="display">
						<thead>
							<tr>
							<th>Bill Number</th>
								<th>Product Name</th>
								<th>Company Name</th>
								<th>Weight</th>
								<th>Sale Price</th>
								<th>MRP</th>
								<th>Tax Percentage</th>
								<th>Quantity</th>
								<th>Tax Amount</th>
							</tr>
						</thead>
						<tfoot>
							<tr>
								  <th colspan="8" style="text-align: right">Total Rs:</th>
								<th></th> 
							</tr>
						</tfoot>
					</table>
		</fieldset>	
	</form>
	</div>
	
<!-- 	Between Two dates -->
	<div id="twoSale" class="tab-pane"> --%>
	<form class="form-horizontal" method="post" action="" name="fertiBill">
					<fieldset>
					<div class="shopform-margin">
				        <div class="row">
							<div class="form-group">
								<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
									<label class="control-label" for="fk_cat_id">Product Category<sup>*</sup></label>  
			           			</div>
			           			<div class="col-lg-3 col-md-3 col-sm-8">
									<div class="input-group">
										<span class="input-group-addon">
											<i class="	glyphicon glyphicon-list-alt"></i>
										</span>
			              				
										<!-- Following code is to get categories from "categories" table of "fertilizer" DB -->
										<!-- getAllMainCat() is implemented in  CategoryDetailsDao with return type List-->
										<%
										   CategoryDetailsDao cddTwo = new CategoryDetailsDao();
			           						List twoList =cddTwo.getAllMainCat(request);
										
										%>
										<input list="cat_drop_for_sale_Two" id="fk_cat_id_for_sale_Two" placeholder="Product Category"  class="form-control">
										<datalist id="cat_drop_for_sale_Two">
										<%
								           for(int i=0;i<twoList.size();i++){
								        	   CategoryDetailsBean catTwo =(CategoryDetailsBean)twoList.get(i);
										%>
					
											<option data-value="<%=catTwo.getCatId()%>" value="<%=catTwo.getCategoryName()%>">
										<%
							      			}
							    		%>
						              	</datalist>
			            			</div>
            					</div>
            					<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">
									<label class="control-label">First Date:<sup>*</sup></label>
								</div>
								<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
									<div class="input-group">
										<span class="input-group-addon">
											<i class="glyphicon glyphicon-calendar"></i>
										</span>
										<input type="date" id="fDateTwo" placeholder="Start Date" class="form-control input-md" type="text">
									</div>
								</div> 
            				</div>
            			</div>
            			
					<div class="row">
						<div class="form-group">							
							<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
								<label class="control-label">Second Date:<sup>*</sup></label>
							</div>
							<div class="col-lg-3 col-md-3 col-sm-8">
								<div class="input-group">
									<span class="input-group-addon">
										<i class="glyphicon glyphicon-calendar"></i>
									</span>
									<input type="date" id="sDateTwo" placeholder="Start Date" class="form-control input-md" type="text">
								</div>
							</div>
					  	</div>
					 </div>
				
				</div>
				    
				    <div class="row buttons-margin" align="center">
				     	<input type="button" id="btn" name="save" class="btn btn-success" onclick="taxFromSaleBetweenTwoDateValidation()" value="Search"/>
					</div>
				
				<div id="demo_jui" style="padding-top:2%">
					<table class="table table-bordered table-striped table-condensed cf" id="saleTaxTwo" class="display">
					<!-- <table id="saleTaxTwo" class="display" style=" text-align: center;"> -->
						<thead>
							<tr>
								<th>Bill Number</th>
								<th>Customer Name</th>							
								<th>Product Name</th>
								<th>Company Name</th>
								<th>GST No</th>
								<th>Weight</th>
								<th>Sale Price</th>
								<th>MRP</th>
								<th>Tax %</th>								
								<!-- <th>kg</th>
								<th>gm</th>
								<th>ltr</th>
								<th>ml</th>		 -->		
								<th>Quantity</th>
								<th>Unit</th>
								<th>Tax Amount</th>
							</tr>
						</thead>
						<tfoot>
							<tr>
								  <th colspan="9" style="text-align: right">Total Rs:</th>
								<th colspan="3"></th>
								
							</tr>
						</tfoot>
					</table>
					</div>
								
		</fieldset>	
	</form>	
	</div>
<!-------------------------------------------------- Tax report from sale Ends Here -------------------------------------------------->

<!-------------------------------------------------- Tax percentage from purchase Starts Here -------------------------------------------------->
	<div id="purchase" class="tab-pane">

		<form class="form-horizontal" method="post" action="" name="fertiBill">
					<fieldset>
					<div class="shopform-margin">
				        <div class="row">
							<div class="form-group">		
								<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
									<label class="control-label" for="fk_cat_id">Product Category<sup>*</sup></label>  
			           			</div>
			           			<div class="col-lg-3 col-md-3 col-sm-8">
									<div class="input-group">
										<span class="input-group-addon">
											<i class="glyphicon glyphicon-list-alt"></i>
										</span>
			              				
										<!-- Following code is to get categories from "categories" table of "fertilizer" DB -->
										<!-- getAllMainCat() is implemented in  CategoryDetailsDao with return type List-->
										<%
										   CategoryDetailsDao catDao = new CategoryDetailsDao();
			           						List catList =catDao.getAllMainCat(request);
										
										%>
										<input list="cat_drop_for_purchase" id="fk_cat_id_for_purchase" placeholder="Product Category" class="form-control">
										<datalist id="cat_drop_for_purchase">
										<%
								           for(int i=0;i<catList.size();i++){
								        	   CategoryDetailsBean catBean =(CategoryDetailsBean)catList.get(i);
										%>
					
											<option data-value="<%=catBean.getCatId()%>" value="<%=catBean.getCategoryName()%>">
										<%
							      			}
							    		%>
						              	
			            				</datalist>
			            			</div>
            					</div>
            					<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">
									<label class="control-label">First Date:<sup>*</sup></label>
								</div>
								<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
									<div class="input-group">
										<span class="input-group-addon">
											<i class="glyphicon glyphicon-calendar"></i>
										</span>
										<input type="date" id="fDatePurchase" placeholder="Start Date" class="form-control input-md" type="text">
									</div>
								</div>
            				</div>
            			</div>
            			 
						<div class="row">
							<div class="form-group">								
								<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">	
									<label class="control-label">Second Date:<sup>*</sup></label>
								</div>
								<div class="col-lg-3 col-md-3 col-sm-8">
									<div class="input-group">
										<span class="input-group-addon">
											<i class="glyphicon glyphicon-calendar"></i>
										</span>
										<input type="date" id="sDatePurchase" placeholder="Start Date" class="form-control input-md" type="text">
									</div>
								</div>
					  		</div>
					  	</div>
				
				</div>
					  
					  	<div class="row buttons-margin" align="center">
				   			<input type="button" id="btn" name="save" class="btn btn-success" onclick="taxReportForPurchaseSingleDateValidation()" value="Search"/>												     									
						</div>
				
				<div id="demo_jui" style="padding-top:2%">
					<table class="table table-bordered table-striped table-condensed cf" id="purchaseTaxSingle" class="display" >
					
						<thead>
							<tr>
								<th>Supplier Name</th>
								<th>Gst No</th>
								<th>Bill Number</th>
								<th>Product Name</th>
								<th>Company Name</th>
								<th>Weight</th>
								<th>Buy Price</th>
								<th>MRP</th>
								<th>Tax %</th>
								<th>Quantity</th>
								<th>Tax Amount</th>
							</tr>
						</thead>
						<tfoot>
							<tr>
							<th colspan="10" style="text-align: right">Total Rs:</th>
								<th></th>
							</tr>
						</tfoot>
					</table>
					</div>
			
				
		</fieldset>	
	</form>
	</div>
<!-------------------------------------------------- Tax percentage from purchase Ends Here -------------------------------------------------->	
	
	</div>
</div>
<jsp:include page="commons/footer.jsp"></jsp:include>
</div>
</div>