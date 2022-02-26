<% boolean isHome=false;%>
<%@include file="commons/header.jsp"%>

<%@page import="com.Fertilizer.dao.SupplierDetailsDao"%>
 <%@page import="com.Fertilizer.hibernate.SupplierDetailsBean"%>
  <%@page import="com.Fertilizer.dao.TaxCreationDao"%>
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

<!-- For datatable to pdf,print,excel etc conversion -->
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




<link href="/Shop/WebContent/staticContent/css/dataTa.css" rel="stylesheet" type="text/css" media="all" />
	<link href="/Shop/staticContent/css/dataTables.jqueryui.min.css"  rel="stylesheet" type="text/css" media="all">
	<link rel="stylesheet" href="/Shop/staticContent/css/tabDemo.css">
 	<link rel="stylesheet" href="/Shop/staticContent/css/jquery-ui.min.css">
    <link rel="stylesheet" href="/Shop/staticContent/css/ui.jqgrid.min.css">
    
    <script src="/Shop/staticContent/js/jquery.min.js"></script>
    <script src="/Shop/staticContent/js/jquery.jqgrid.min.js"></script>
	<script src="/Shop/staticContent/js/jquery.dataTables.js" type="text/javascript"></script>
	<script type="text/javascript" src="/Shop/staticContent/js/jqueryUi.js"></script>	

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
.dataTables_scrollFoot.ui-state-default {
    width: 100% !important;
}
</style>
</head>
<script src="/Shop/staticContent/js/saleReports.js"></script>
<script src="/Shop/staticContent/js/podetails.js"></script>

	function callSupplier()
	{
		<%
			SupplierDetailsDao sdd = new SupplierDetailsDao();
			List sList =sdd.getAllSupplier(request);
		%>
	}


<body>
<div class="container-fluid" > 
	<div class="row" style="min-height:300px;">
    	<div  class="col-md-12">
       <!--  <h3>Left Tabs</h3>
        <hr/> -->
        	<div class="gstreturn">
            	<ul class="nav nav-tabs">
                	<li class="active"><a href="#saleGSTReturnReport" data-toggle="tab">Sale GST Return</a></li>
                	<li><a href="#purchaseGSTReturnReport" data-toggle="tab">Purchase GST Return</a></li>
           		</ul>
        	</div>
			
			<div class="">
					<!-- Tab panes -->
					<div class="tab-content">

 <div class=""> 
 		
 		<div class="row">
<!-- 			<div align="center" style="margin-top: 0px"> -->
			<div align="center">
				  <h2 class="form-name style_heading">GST Return</h2>
			</div>
				 	
			 <div class="row" align="center">
				<div class="hr-width">
					<hr class="style-one">
				</div>	
			 </div>
		</div>	 
		
		<div class="gstrange">
		 	 <ul class="nav nav-tabs">
			   <!-- <li><a data-toggle="tab" href="#purchaseGSTReturnReport"><h4 style="color:blue">Datewise</h4></a></li> -->
			 	<li class="active"><a data-toggle="tab" href="#saleGSTReturnReport">Range</a></li>
			     <!-- <li><a data-toggle="tab" href="#twoYears"><h4 style="color:blue">Between Two Years</h4></a></li> -->
		 	 </ul>
		</div>
 
 	<div class="tab-content">
   
     
<!-------------------------------------------------- SALE GST RETURN REPORTS BETWEEN TEWO DATES Starts Here -------------------------------------------------->
 																			
 	<div id="saleGSTReturnReport" class="tab-pane fade in active">
 		<div class="row"></div>
 				 <form class="form-horizontal" method="post" action="" name="saleGstReturn">
					<fieldset>
					
			<div class="shopform-margin">
				<div class="row">
					<div class="form-group">
						<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
							<label class="control-label" for=""> Start Date:<sup>*</sup></label>  
				        </div>   	
				        <div class="col-lg-3 col-md-3 col-sm-8">
							<div class="input-group">
								<span class="input-group-addon">
									<i class="glyphicon glyphicon-calendar"></i>
								</span>
				        	  	<input type="date" id="saleGstFisDate1" placeholder="Start Date" class="form-control input-md" type="text" >
				           	</div>
						</div>
						<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">
				           	 <label class="control-label" for="">End Date:<sup>*</sup></label>
				        </div>
				        <div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
							<div class="input-group">
								<span class="input-group-addon">
									<i class="glyphicon glyphicon-calendar"></i>
								</span>
				        	 	<input type="date" id="saleGstEndDate1" placeholder="End Date" class="form-control input-md ac_district"  type="text">
				          	</div>
						</div>
 				    </div>
 				</div>
 			</div>
 			    
 				<div class="row buttons-margin" align="center"> 
								<!-- <input type="button" style="align:center"  id="btn" name="save" class="btn btn-lg btn-success btn-md button_hw button_margin_right" onclick="gstSummaryReportRange();gstPurchaseSummaryReportRange()" value="Search"/> -->
					<input type="button" id="btn" name="save" class="btn btn-success" onclick="saleGSTReturnReportValidation()" value="Search"/>
				</div>
				
										
					
					<div class="row" align="center">
						<h2  class="form-name style_heading">Sale</h2> 
			 		</div>
			 		
			 		<div id="demo_jui">
					<table class= "table table-bordered table-striped table-condensed cf" id="gstSummary" class="display " >
						<thead>
								<tr>
								<!-- <th>Bill No.</th>
								<th>date</th>
								<th>Item Name</th>
								<th>Item Rate</th> -->
								<th>Tax %</th>
								<th>Taxable value</th>
								<th>Central Tax Amount</th>
								<th>State Tax Amount</th>
								<th>Total tax Amount</th>
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
 		</div>

<!-------------------------------------------------- SALE GST RETURN REPORTS BETWEEN TWO DATES Ends Here -------------------------------------------------->

<!-------------------------------------------------- PURCHASE GST RETURN REPORTS BETWEEN TEWO DATES Starts Here -------------------------------------------------->
					
<!-- 	<div id="purchaseGSTReturnReport" class="tab-pane fade in active"> -->
	<div id="purchaseGSTReturnReport" class="tab-pane">
 		<div class="row"></div>
 				 <form class="form-horizontal" method="post" action="" name="purchaseGstReturn">
					<fieldset>
					
		<div class="shopform-margin">									
			<div class="row">
        		<div class="form-group">
        			<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
        				<label class="control-label" for="supplier">Supplier Name<sup>*</sup></label>  
          			</div>	
          			<div class="col-lg-3 col-md-3 col-sm-8">
						<div class="input-group" id="goodrrrr">
							<span class="input-group-addon">
								<i class="	glyphicon glyphicon-user"></i>
							</span>
									
							
										
							<!-- Following code is to get Supplier from "supplier_details" table of "fertilizer" DB -->
							<!-- getAllSupllier() is implemented in  SupplierDetailsDao with return type List-->
						
							<%
								/* SupplierDetailsDao sdd = new SupplierDetailsDao();
           						List sList =sdd.getAllSupplier(); */
							
							%>
							
							<input list="sup_drop" id="supplier" class="form-control" onclick="callSupplier();" placeholder="Select Supplier Name">
				            <datalist id="sup_drop">
							
							<%
					           for(int i=0;i<sList.size();i++)
					           {
					        	   SupplierDetailsBean sup =(SupplierDetailsBean)sList.get(i);
							%>
		
								<option data-value="<%=sup.getSupId()%>" value="<%=sup.getDealerName() %>">
							<%
				      			}
				    		%>
							</datalist>
						</div>
					</div>
					<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">
						<label class="control-label" for=""> Start Date:<sup>*</sup></label>  
				    </div>
				    <div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-calendar"></i>
							</span>
				           	<input type="date" id="purchaseGstFisDate1" placeholder="Start Date" class="form-control input-md" type="text" >
				        </div>
					</div>
               	</div>
			</div>		
					
					
			<div class="row">
				<div class="form-group">			
					<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
				    	<label class="control-label" for="">End Date:<sup>*</sup></label>
				    </div>    
				    <div class="col-lg-3 col-md-3 col-sm-8">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-calendar"></i>
							</span>
				    	  	<input type="date" id="purchaseGstEndDate1" placeholder="End Date" class="form-control input-md ac_district"  type="text">
				        </div>
					</div>
				 </div>
			</div>
		
		</div>
			
 			<div class="row buttons-margin" align="center"> 
								<!-- <input type="button" style="align:center"  id="btn" name="save" class="btn btn-lg btn-success btn-md button_hw button_margin_right" onclick="gstSummaryReportRange();gstPurchaseSummaryReportRange()" value="Search"/> -->
				<input type="button" id="btn" name="save" class="btn btn-success" onclick="purchaseGSTReturnReportValidation()" value="Search"/>
			</div>
					
					<!-- <div class="col-md-10" align="center">
			 		<h3 align="center" class="form-name style_heading">Purchase</h3> 
					<table class= "table table-bordered table-striped table-condensed cf" id="purchaseGSTReturnReport" class="display table table-boardered"" style=" border: 2px solid black;border-collapse: collapse;">
						<thead> -->
						
					<div class="row" align="center">
						<h2  class="form-name style_heading">Purchase</h2>
			 		</div>
			 		
			 		<div id="demo_jui">
					<table class= "table table-bordered table-striped table-condensed cf" id="purchaseGSTReturnReportDataTableId" class="display" >
						<thead>
							<tr>
								<th>GST Tax %</th>
								<th>IGST Tax %</th>
								<th>Taxable value</th>
								<th>Central Tax Amount</th>
								<th>State Tax Amount</th>
								<th>Total GST tax Amount</th>
								<th>Total IGST tax Amount</th>
								<th>Supplier Name</th>
							</tr>
						</thead>
						 <tfoot>
							<tr>
								<th colspan="2" style="text-align: right">Total Rs:</th>
								<th></th><th></th><th></th><th></th><th></th><th></th>
							</tr>
						</tfoot> 
					</table>
					</div>
					
			
				</fieldset>
				</form>
					</div>
<!-------------------------------------------------- PURCHASE GST RETURN REPORTS BETWEEN TEWO DATES Ends Here --------------------------------------------------> 		
 		
<!--  <!------ Yearly ------>
 		
 		
 		</div>
 	
 		</div>
 		
 		
 	</div>
 </div>
 
		</div> 
	</div>
</div>
 <jsp:include page="commons/footer.jsp"></jsp:include>
 