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
<!-- <script src="/Shop/staticContent/js/jquery-1.12.3.min.js"></script>
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
<link rel="stylesheet" href="/Shop/staticContent/css/ui.jqgrid.min.css"> -->

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

<script type="text/javascript" src="/Shop/staticContent/js/bootbox.min.js"></script>
<script type="text/javascript" src="/Shop/staticContent/js/bootstrap.js"></script>

<!-- <link rel="stylesheet" href="https://code.jquery.com/jquery-3.5.1.js">
<link rel="stylesheet" href="https://cdn.datatables.net/1.10.23/js/jquery.dataTables.min.js">  -->


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
<script type="text/javascript" src="/Shop/staticContent/js/goodsReceive.js"></script>
 <script type="text/javascript" src="/Shop/staticContent/js/podetails.js"></script>
 <script type="text/javascript" src="/Shop/staticContent/js/purchaseReturn.js"></script>


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
/* .pagination {
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
} */


</style>
</head>
<body>

 <div class="container-fluid"> 
 		
 		<div class="row">
			<div align="center" style="margin-top: 75px">
				  <h2 class="form-name style_heading">Purchase Reports</h2>
			</div>
				 	
			 <div class="row" align="center">
				<div class="hr-width">
					<hr class="style-one">
				</div>	
			 </div>
		</div>
	
	<div class="reppurchase">
		<ul class="nav nav-tabs">
	    	<li class="active"><a data-toggle="tab" href="#home">Datewise</a></li>
		    <li><a data-toggle="tab" href="#twoDates">Range Wise</a></li>
		    <li><a data-toggle="tab" href="#pro">Product Detail Wise</a></li>
		    <li><a data-toggle="tab" href="#sup">Supplier Name Wise</a></li>
		    <li><a data-toggle="tab" href="#shp">Shop Name Wise</a></li>
		    <!-- <li><a data-toggle="tab" href="#cat"><h4 style="color:blue">Category Wise</h4></a></li> -->
		    <li><a data-toggle="tab" href="#gst">GST Wise</a></li>
		    <li><a data-toggle="tab" href="#rangeWise2Dates">Bill Wise</a></li>
	 	    <li><a data-toggle="tab" href="#purchaseReturn">Purchase Return</a></li> 
	 	    <li><a data-toggle="tab" href="#purchaseOrder">Purchase Order</a></li> 
 		</ul>
 	</div>
 
 	<div class="tab-content">
 
<!-------------------------------------------------- Date Wise Starts Here -------------------------------------------------->   
  
    	<div id="home" class="tab-pane fade in active">
 <!--    	<script>
    	$('#purchase1').DataTable( {
    buttons: [
        {
            extend: 'pdf',
            text: 'Save current page',
            exportOptions: {
                modifier: {
                    page: 'current'
                }
            }
        }
    ]
} );
</script> -->
    	<div class="row"></div>
    	
 			<form class="form-horizontal" method="post" action="" name="">
 			
				<fieldset>
				<div class="shopform-margin">    
				<div class="row">
					<div class="form-group">		
						<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
							<label class="control-label" for="">Enter Date:<sup>*</sup></label>
						</div>
						<div class="col-lg-3 col-md-3 col-sm-8">
							<div class="input-group">
								<span class="input-group-addon">
									<i class="glyphicon glyphicon-calendar"></i>
								</span>
								<input type="date" id="fDate" name="fDate" placeholder="Start Date" class="form-control" type="text">
							</div>
						</div>
					</div>
				</div>
				</div>
				   
				<div class="row buttons-margin" align="center">
					<input type="button" id="btn" name="save" class="btn btn-success"
									   onclick="purchaseReportForSingleDateValidate()" value="Search" />
				</div>
					
					<div class="">
					<div class="" style="padding-top:2%">
					<table class="table table-bordered table-striped table-condensed  cf" id="purchase1" class="display " >
						<thead>
							<tr >
								<th>Bill Number</th>
								<th>Purchase Date</th>
								<th>Product Name</th>
								<th> Company Name</th>
								<!-- <th>DC No</th> -->
								<th>Batch No</th> 
								<th>Barcode No</th>
								<th>Buy Price</th>
								<th>Sale Price</th>
								<th>MRP</th>
								<th>Packing</th>
								<th>Unit</th>
								<th>Quantity</th>
								<th>Tax %</th>
								<th>Discount %</th>
								<th>Tax<br>Amount</th>
								<th>Discount<br>Amount per<br>Product</th>
								<th>Total Amount</th>
							</tr>
						</thead>
						<tfoot>
							<tr>
								<th colspan="12" style="text-align: right">Total Rs:</th>
								<th></th>
								<th></th>
								<th></th>
								<th></th>
								<th></th>	
							</tr>
						</tfoot>
						
					</table>
					<!-- <div class="pagination">
					<div id="listingTable"></div>
                     <a href="#" id="prev" style="padding: 0 17px;">Prev</a>
                     <span id="page">1</span>
                     <a href="#" id="next" style="padding: 0 17px;">Next</a>
                    </div>  -->
                    <!-- <div class="pagination-page" >
                    <nav aria-label="...">
                        <ul class="pagination" style="margin-top: -10px;">
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
				</fieldset>
			</form>
 		</div>
<!-------------------------------------------------- Date Wise Ends Here --------------------------------------------------> 	
	
<!-------------------------------------------------- Range Wise Starts Here -------------------------------------------------->
 		<div id="twoDates" class="tab-pane" class="table-responsive">
 		<div class="row"></div>
 				<form class="form-horizontal" method="post" action="" name="fertiBill">
					<fieldset>
					<div class="shopform-margin">	
				        <div class="row">
							<div class="form-group">
								<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
									<label class="control-label" for=""> Start Purchase Date:<sup>*</sup></label>  
				           		</div>
				           		<div class="col-lg-3 col-md-3 col-sm-8">
									<div class="input-group">
										<span class="input-group-addon">
											<i class="glyphicon glyphicon-calendar"></i>
										</span>
				           			  	<input type="date" id="fisDate2" placeholder="Start Date" class="form-control input-md" type="text" >
				           		 	</div>
								</div>
								<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">
								  	 <label class="control-label" for="">End Purchase Date:<sup>*</sup></label>
				           	 	</div>
				           	 	<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
									<div class="input-group">
										<span class="input-group-addon">
											<i class="glyphicon glyphicon-calendar"></i>
										</span>
				         	   			 <input type="date" id="endDate2" placeholder="End Date" class="form-control input-md ac_district"  type="text">
				          		  	</div>
								</div>
				          	</div>
					  	</div>
				   	</div>
				      		
				      	<div class="row buttons-margin" align="center">
							<input type="button" id="btn" name="save" class="btn btn-success" onclick="purchaseReportBetweenTwoDatesValidate()" value="Search"/>
						</div >	
						
					<div class="">
						<table class="table table-bordered table-striped table-condensed  cf" id="purchaseRange" class="display" 
						>
						<thead>
							<tr>
								<th>Bill Number</th>
								<th>Purchase Date</th>
								<th>Product Name</th>
								<th>Company Name</th>
								<!-- <th>DC No</th> -->
								<th>Batch No</th> 
								<th>Barcode No</th>
								<th>Buy Price</th>
								<th>Sale Price</th>
								<th>MRP</th>
								<th>Packing</th>
								<th>Unit</th>
								<th>Quantity</th>
								<th>Tax %</th>
								<th>Discount %</th>
								<th>Tax<br>Amount</th>	
								<th>Discount<br>Amount per<br>Product</th>							
								<th>Total Amount</th>
							</tr>
						</thead>
						<tfoot>
							<tr>
								<th colspan="14" style="text-align: right">Total Rs:</th>
								<th></th>	
								<th></th>
								<th></th>	
								
							</tr>
						</tfoot>
					</table>
					<!--  <div class="pagination-page" >
                    <nav aria-label="...">
                        <ul class="pagination" style="margin-top: -10px;">
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
				</fieldset>
				</form>
 		</div>
<!-------------------------------------------------- Range Wise Ends Here --------------------------------------------------> 		
 		
			<!----------------------------------	Between Two Dates	------------------------------------->
 		
 		<div id="GSTSummary" class="tab-pane" class="table-responsive">
 		<div class="row"></div>
 				<form class="form-horizontal" method="post" action="" name="fertiBill">
					<fieldset>
				         <div class="row">
							<div class="form-group">	
								<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
									<label class="control-label" for=""> Start Purchase Date:<sup>*</sup></label>  
				           		</div>
				           		<div class="col-lg-3 col-md-3 col-sm-8">
									<div class="input-group">
										<span class="input-group-addon">
											<i class="glyphicon glyphicon-calendar"></i>
										</span>
				           			  	<input type="date" id="fisDate3" placeholder="Start Date" class="form-control input-md" type="text" >
				           		 	</div>
								</div>
								<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">
				           	 		<label class="control-label" for="">End Purchase Date:<sup>*</sup></label>
				           	 	</div>
				           	 	<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
									<div class="input-group">
										<span class="input-group-addon">
											<i class="glyphicon glyphicon-calendar"></i>
										</span>
				         	   			<input type="date" id="endDate3" placeholder="End Date" class="form-control input-md ac_district"  type="text">
				          		  	</div>
								</div>
				          	</div>
					  	</div>
					  	
				      	<div class="row buttons-margin" align="center">
							<input type="button" id="btn" name="save" class="btn btn-success" onclick="GSTSummaryReportBetweenTwoDates()" value="Search"/>
						</div>
							
						<table class="table table-bordered table-striped table-condensed cf" id="GSTSummaryRange" class="display"
						 >
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
					 <!-- <div class="pagination-page">
					  style="margin-top:-10px;
                    <nav aria-label="...">
                        <ul class="pagination">
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
				</fieldset>
				</form>
 		</div> 		
 		
<!-------------------------------------------------- Product Detail Wise Starts Here -------------------------------------------------->
 		<div id="pro" class="tab-pane">
 				<div class="row"></div>
 		
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
							   CategoryDetailsDao cdd9 = new CategoryDetailsDao();
           						List cList9 =cdd9.getAllMainCat(request);
							
							%>
									<input list="cat_drop" id="fk_cat_id" name="fk_cat_id" class="form-control" placeholder="Product Category"
								   onchange="pro.getAllProduct()">
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
							<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">
					 			<label class="control-label" for="product">Product Name<sup>*</sup></label>  
          					</div>
          					<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
								<div class="input-group">
									<span class="input-group-addon">
										<i class="	glyphicon glyphicon-list-alt"></i>
									</span>
									<select class="form-control" id="proName" name="proName">
									</select>  
									 
									
									<!-- input list="product_drop" class="form-control" id='proName' name="proName">
								<datalist id="product_drop"></datalist>
								 -->
								
								</div>
							</div> 
						</div>	
					</div>
				</div>
					
					<div class="row buttons-margin" align="center">
						<input type="button" id="btn" name="save" class="btn btn-success"
										onclick="purchaseReportAsPerProductNameValidate()" value="Search"/>
					</div>
					
						<div class="">
						<div id="demo_jui" style="padding-top:2%">
						<table class="table table-bordered table-striped table-condensed  cf" id="purchaseAsPerProduct11"
						 class="display"  >
						<thead>
							<tr>
								<th>Bill Number</th>
								<th>Product Name</th>
								<th>Purchase Date</th>
								<th>Buy Price</th>
								<th>Sale Price</th>
								<th>Packing</th>
								<th>Unit</th>
								<th>Quantity</th>
								<th>Tax %</th>
								<th>Discount %</th>
								<th>Tax <br> Amount</th>
								<th>Disc Amt per Product</th>
								<th>Total Amount</th>
							</tr>
						</thead>
						
<!-- 						<tfoot>
							<tr>
								<th colspan="14" style="text-align: right">Total Rs:</th>
								<th></th>
								<th></th>
								<th></th>
							</tr>
						</tfoot>						 -->
					</table>
					 <!-- <div class="pagination-page" >
                    <nav aria-label="...">
                        <ul class="pagination" style="margin-top:-10px;">
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
				</fieldset>
				</form>
 		
 		</div>
<!-------------------------------------------------- Product Details Wise Ends Here -------------------------------------------------->
 		
<!-------------------------------------------------- Supplier Name Wise Starts Here -------------------------------------------------->	
 		<div id="sup" class="tab-pane ">
 			<div class="row"></div>
 		
 				<form class="form-horizontal" method="post" action="" name="fertiBill">
					<fieldset>
				    <div class="shopform-margin">    
				        <div class="row">
							<div class="form-group">
								<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
									<label class="control-label" for="supplier">Supplier Name<sup>*</sup></label>  
		          				</div>	
		          				<div class="col-lg-3 col-md-3 col-sm-8">
									<div class="input-group">
										<span class="input-group-addon">
											<i class="glyphicon glyphicon-user"></i>
										</span>
											
									
												
									<!-- Following code is to get Supplier from "supplier_details" table of "fertilizer" DB -->
									<!-- getAllSupllier() is implemented in  SupplierDetailsDao with return type List-->
								
									<%
										SupplierDetailsDao sdd = new SupplierDetailsDao();
		           						List sList =sdd.getAllSupplier(request);
									
									%>
									
										<input list="sup_drop" id="fkSupplierId" name="fkSupplierId" placeholder="Supplier Name" class="form-control">
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
		           			</div>
		           		</div>
					</div>
					
					 <div class="row buttons-margin" align="center">
				     	<input type="button" id="btn" name="save" class="btn btn-success"
								       onclick="supplierWisePurchaseReportValidate()" value="Search"/>
					 </div>	
					
						<div class="">
						<div id="demo_jui" style="padding-top:3%">	
						<table class="table table-bordered table-striped table-condensed cf" id="purchase3" class="display" row="10">
						<thead>
							<tr>
								<th>Supplier</th>
								<th>Bill Number</th>
								<th>Purchase Date</th>
								<th>Product Name</th>
								<th>Company Name</th>
								<!-- <th>DC No</th> -->
								 <th>Batch No</th> 
								<th>Barcode No</th>
								<th>Buy Price</th>
								<th>Sale Price</th>
								<th>MRP</th>
								<th>Packing</th>
								<th>Unit</th>
								<th>Quantity</th>
								<th>tax %</th>
								<th>Discount %</th>
								<th>Tax <br> Amount</th>
								<th>Discount<br>Amount per<br>Product</th>								
								<th>Total Amount</th>								
							</tr>
						</thead>
						<tfoot>
							<tr>
								<th colspan="13" style="text-align: right">Total Rs:</th>
								<th></th>
								<th></th>
								<th></th>
								<th></th>
								<th></th>
							</tr>
						</tfoot>
					</table>
					</div>
					</div>
					 <!-- <div class="pagination-page">
                    <nav aria-label="...">
                        <ul class="pagination" style="margin-top:10px;margin-right: 35px;">
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
					
				</fieldset>
				</form>
 		
 		</div>
<!-------------------------------------------------- Supplier Name Wise Ends Here --------------------------------------------------> 	
	
<!-------------------------------------------------- Shop Name Wise Starts Here -------------------------------------------------->		
 		
 		<div id="shp" class="tab-pane ">
 			<div class="row"></div>
 		
 				<form class="form-horizontal" method="post" action="" name="fertiBill">
					<fieldset>
				<div class="shopform-margin">
					<div class="row">
						<div class="form-group">
							<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
								<label class="control-label" for=""> Start Purchase Date:<sup>*</sup></label>  
				           	</div>
				           	<div class="col-lg-3 col-md-3 col-sm-8">
								<div class="input-group">
									<span class="input-group-addon">
										<i class="glyphicon glyphicon-calendar"></i>
									</span>
				           		  	<input type="date" id="fisDate9" placeholder="Start Date" class="form-control input-md" type="text" >
				           		 </div>
							</div>
				           	<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">
				           		<label class="control-label" for="">End Purchase Date:<sup>*</sup></label>
				           	</div>
				           	<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
								<div class="input-group">
									<span class="input-group-addon">
										<i class="glyphicon glyphicon-calendar"></i>
									</span>
				         		  	<input type="date" id="endDate9" placeholder="End Date" class="form-control input-md ac_district"  type="text">
				          		</div>
							</div>
				        </div>
				    </div>
				    
				    <div class="row">
						<div class="form-group">
							<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
								<label class="control-label" for="shop">Shop Name<sup>*</sup></label>  
		          			</div>
		          			<div class="col-lg-3 col-md-3 col-sm-8">
								<div class="input-group">
									<span class="input-group-addon">
										<i class="glyphicon glyphicon-user"></i>
									</span>
											
									
												
									<!-- Following code is to get Supplier from "supplier_details" table of "fertilizer" DB -->
									<!-- getAllSupllier() is implemented in  SupplierDetailsDao with return type List-->
								
									<%
									shopDetailsDao shdd = new shopDetailsDao();
		           						List spList =shdd.getAllShops();
									
									%>
									
									<input list="shp_drop" id="fkShopId"  class="form-control" placeholder="Shop Name">
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
						</div>
					</div>
				
				</div>
					  
					<div class="row buttons-margin" align="center">
				    	<input type="button" id="btn" name="save" class="btn btn-success"
								onclick="shopWisePurchaseReportValidate()" value="Search"/>
					</div>	
				
				<div class="container">
				<div class="" style="padding-top:3%">	
						<table class= "table table-bordered table-striped table-condensed cf" id="purchase4" class="display"
						 >
						<thead>
							<tr>
								<th>Supplier</th>
								<th>Bill Number</th>
								<th>Purchase Date</th>
								<th>Product Name</th>
								<th>Company Name</th>
								<!-- <th>DC No</th> -->
								 <th>Batch No</th> 
								<th>Barcode No</th>
								<th>Buy Price</th>
								<th>Sale Price</th>
								<th>MRP</th>
								<th>Packing</th>
								<th>Unit.</th>
								<th>Quantity</th>
								<th>Tax %</th>
								<th>Tax <br> Amount</th>
								<th>Discount<br>Amount per<br>Product</th>								
								<th>Total Amount</th>								
							</tr>
						</thead>
						<tfoot>
							<tr>
								<th colspan="14" style="text-align: right">Total:</th>
								<th></th>
								<th></th>
								<th></th>
							</tr>
						</tfoot>
					</table>
					 <!-- <div class="pagination-page" >
                    <nav aria-label="...">
                        <ul class="pagination" style="margin-top:-10px;">
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
				</fieldset>
				</form>
 		
 		</div>
<!-------------------------------------------------- Shop Name Wise Ends Here --------------------------------------------------> 		
 		
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
 		
<!-------------------------------------------------- Gst Wise Starts Here -------------------------------------------------->

 		<div id="gst" class="tab-pane ">
 		<div class="row"></div>
 		
 		<form class="form-horizontal" method="post" action="" name="gstRepo">
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
				        	  	<input type="date" id="gstFisDate" placeholder="Start Date" class="form-control input-md" type="text" >
				           	</div>
						</div>
						<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">
				           	<label class="control-label" for="" >End Date:<sup>*</sup></label>
				        </div>
				        <div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
							<div class="input-group">
								<span class="input-group-addon">
									<i class="glyphicon glyphicon-calendar"></i>
								</span>
				        	  	<input type="date" id="gstEndDate" placeholder="End Date" class="form-control input-md ac_district"  type="text">
				          	</div>
						</div>
					</div>
				</div>
			
			</div>
								 
				<div class="row buttons-margin" align="center">
					<input type="button" id="gstBtn" name="save" class="btn btn-success"
										onclick="purchaseReportAsPerGSTValidate()" value="Search"/>
				</div>
					  
				      		 	
				
				<!-- <div class="table-responsive"> -->
				<div class="container">
				<div class="" style="padding-top:2%">
					<table class="table table-bordered table-striped table-condensed cf" id="gstPurchaseReportTable"
					 >
						<thead>
								<tr>
								<th>Sr No</th>
								<th>date</th>
								<th>Name Of Supplier</th>
								<th>Bill No.</th>
								<th>GST No</th>
								<th>HSN No</th>
								<th>Item Description</th>
								<th>weight</th>
								<th>Unit</th>								
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
								<th>Discount<br>Amount per<br>Product</th>
								<th>Total Amount including Tax</th>
								
							</tr>
						</thead>
	
						<tfoot>
							<tr>
								<th colspan="12" style="text-align: right">Total Rs:</th>
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
					 </div>
					 <!-- <div class="pagination-page" id="gstPurchaseReportTable">
                    <nav aria-label="...">
                        <ul class="pagination" style="margin-top: 10px;margin-right: 41px;">
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
					
				<!-- </div> -->
				</fieldset>
				</form>
 	</div>
<!-------------------------------------------------- Gst Wise Ends Here -------------------------------------------------->


<!-------------------------------------------------- Bill Wise Starts Here --------------------------------------------------> 	
			 	
			 	<div id="rangeWise2Dates" class="tab-pane ">
 		<div class="row"></div>
 		
 		<form class="form-horizontal" method="post" action="" name="rangeWise2DatesForm">
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
				           	  	<input type="date" id="FirstDate7" placeholder="Start Date" class="form-control input-md" type="text" >
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
				        	  	<input type="date" id="EndDate7" placeholder="End Date" class="form-control input-md ac_district" type="text">
				          	</div>
						</div>
					</div>
				</div>
			</div>
								
				<div class="row buttons-margin" align="center">
					<input type="button" id="gstBtn" name="save" class="btn btn-success"
										       onclick="rangeWiseBillPaidUnpaid()" value="Search"/>
				</div>
				
				<!-- <div class="table-responsive"> -->
				<div class="" style="padding-top:3%">
					<table class= "table table-bordered table-striped table-condensed cf" id="rangeWiseBillReportTable"
					 >
						<thead>
								<tr>
								<th>Purchase Bill No</th>
								<th>Supplier Name</th>
								<th>Total Amount</th>
								<th>Paid Amount</th>
								<th>Balance Amount</th>
								<th>Other Expenses</th>	
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
					<!--  <div class="pagination-page">
                    <nav aria-label="...">
                        <ul class="pagination" style="margin-top: -12px;margin-right: 17px;">
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
				<!-- </div> -->
				</fieldset>
				</form>
 	</div>
<!-------------------------------------------------- Bill Wise Ends Here --------------------------------------------------> 
 				 	
<!-------------------------------------------------- Purchase Return Starts Here -------------------------------------------------->
 						
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
				          </div>  -->
						
						
				<div class="shopform-margin">	
				   	<div class="row">
						<div class="form-group">
							<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
								<label class="control-label" for="supplier">Supplier Name<sup>*</sup></label>  
		          			</div>
		          			<div class="col-lg-3 col-md-3 col-sm-8">
								<div class="input-group">
									<span class="input-group-addon">
										<i class="glyphicon glyphicon-user"></i>
									</span>
											
									
												
									<!-- Following code is to get Supplier from "supplier_details" table of "fertilizer" DB -->
									<!-- getAllSupllier() is implemented in  SupplierDetailsDao with return type List-->
								
									<%
										SupplierDetailsDao supDao = new SupplierDetailsDao();
		           						List suplierList =supDao.getAllSupplier(request);
									
									%>
									
									<input list="sup_drop_Purchase_return" id="pr_fk_Supplier_Id" placeholder="Supplier Name" class="form-control">
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
						</div>
					</div>
				</div>
					  
					<div class="row buttons-margin" align="center">												  
						<input type="button" id="btn" name="save" class="btn btn-success"
							onclick="supplierWisePurchaseReturnReportValidate()" value="Search"/>
					</div>
			
				 	<div class="">
				     <div id="demo_jui" style="padding-top:3%">	
						<table class="table table-bordered table-striped table-condensed cf" id="purchaseReturnTable" class="display">
						<thead>
							<tr>
								<th>Supplier</th>
								<th>Bill Number</th>
								<th>Purchase Date</th>
								<th>Product Name</th>
								<th>Company Name</th>
								<!-- <th>DC No</th> -->
								<th>taxPercentage</th>
								 <th>Batch No</th> 
								<th>Barcode No</th>
								<th>Buy Price</th>
								<th>Sale Price</th>
								<!-- <th>MRP</th> -->
								<th>Tax Amount</th>
								<th>Packing</th>
								<th>Quantity</th>
								<th>Return Quantity</th>
								<th>Available Quantity</th>
															
							</tr>
						</thead>
						<tfoot>
							<tr>
								<!-- <th colspan="7" style="text-align: right">Total:</th>
								<th></th> -->
							</tr>
						</tfoot>
					</table>
					</div>
					 <!-- <div class="pagination-page" >
                    <nav aria-label="...">
                        <ul class="pagination" style="margin-top: -10px;">
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
				</fieldset>
				</form>
 			</div>
<!-------------------------------------------------- Purchase Return Ends Here -------------------------------------------------->
 			
 <!-------------------------------------------------- Purchase Order Starts Here -------------------------------------------------->
 
 <div id="purchaseOrder" class="tab-pane">
 			<div class="row"></div>
 		
 				<form class="form-horizontal" method="post" action="" name="fertiBill">
					<fieldset>
				<div class="shopform-margin">	
				    <div class="row">
						<div class="form-group">
							<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
								<label class="control-label" for=""> Start PO Date:<sup>*</sup></label>  
				           	</div>
				           	<div class="col-lg-3 col-md-3 col-sm-8">
								<div class="input-group">
									<span class="input-group-addon">
										<i class="glyphicon glyphicon-calendar"></i>
									</span>
				           		  	<input type="date" id="fisDatePO" placeholder="Start Date" class="form-control input-md" type="text" >
				           		 </div>
							</div>
							<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">
				           		<label class="control-label" for="">End PO Date:<sup>*</sup></label>
				           	</div>
				           	<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
								<div class="input-group">
									<span class="input-group-addon">
										<i class="glyphicon glyphicon-calendar"></i>
									</span>
				         	   	  	<input type="date" id="endDatePO" placeholder="End Date" class="form-control input-md ac_district"  type="text">
				          		</div>
							</div>
				         </div>
				     </div>
				      
				     <div class="row">
						 <div class="form-group">
						 	<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
								<label class="control-label" for="supplier">Supplier Name<sup>*</sup></label>  
		          			</div>
		          			<div class="col-lg-3 col-md-3 col-sm-8">
								<div class="input-group">
									<span class="input-group-addon">
										<i class="glyphicon glyphicon-user"></i>
									</span>
										
									<%
										SupplierDetailsDao sdd1 = new SupplierDetailsDao();
		           						List sList1 =sdd1.getAllSupplier(request);
									
									%>
									
									<input list="sup_dropPO" id="fkSupplierIdPO" name="fkSupplierId" placeholder="Supplier Name" class="form-control" onchange="getAllPo();">
									<datalist id="sup_dropPO">
									
									<%
							           for(int i=0;i<sList.size();i++){
							        	   SupplierDetailsBean sup =(SupplierDetailsBean)sList1.get(i);
									%>
				
										<option data-value="<%=sup.getSupId()%>" value="<%=sup.getDealerName() %>">
									<%
						      			}
						    		%>
									</datalist>           	
								</div>
		           			</div> 
		           			<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">
		           		 		<label class="control-label" for=""> PO No :<sup>*</sup></label>
				           	</div>
				           	<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
								<div class="input-group">
									<span class="input-group-addon">
										<i class="glyphicon glyphicon-calendar"></i>
									</span>
<!-- 				         	   			  <input type="text" id="POno" placeholder="select PO no." class="form-control input-md ac_district"> -->
									<select id="POno" name="POno" class="form-control input-md ac_district">
									</select>
				          		</div>
							</div>
		           		</div>
		           	</div>
				</div>
					  
					<div class="row buttons-margin" align="center">
						<input type="button"  id="btn" name="save" class="btn btn-success"
								onclick="purchaseOrderReportValidate()" value="Search"/>
					</div>
			
				 	<div class="">
				     <div id="demo_jui" style="padding-top:3%">	
						<table class="table table-bordered table-striped table-condensed cf" id="purchaseOrderTable" class="display">
						<thead>
							<tr>
								<th>Supplier Name</th>
								<th>PO Number</th>
								<th>Purchase Date</th>
								<th>Product Name</th>
								<th>Company Name</th>
								<!-- <th>DC No</th> -->
								<th>Unit</th>
								<th>Quantity</th> 
								<th>Buy Price</th>
								<th>CGST</th>
								<!-- <th>MRP</th> -->
								<th>SGST</th>
								<th>IGST</th>
								<th>Total</th>
																							
							</tr>
						</thead>
						<tfoot>
							<tr>
								<!-- <th colspan="7" style="text-align: right">Total:</th>
								<th></th> -->
							</tr>
						</tfoot>
					</table>
					</div>
					<!--  <div class="pagination-page">
                    <nav aria-label="...">
                        <ul class="pagination" style="margin-top: -10px;margin-right: 36px;">
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
				</fieldset>
				</form>
 			</div>
<!-------------------------------------------------- Purchase Order Ends Here --------------------------------------------------> 			
 			
 	
 </div>
</div>

 <!-- <script>
 var current_page = 1;
 var records_per_page = 2;

 var objJson = [
	 { adName: "AdName 1"},
	    { adName: "AdName 2"},
	    { adName: "AdName 3"},
	    { adName: "AdName 4"},
	    { adName: "AdName 5"},
	    { adName: "AdName 6"},
	    { adName: "AdName 7"},
	    { adName: "AdName 8"},
	    { adName: "AdName 9"},
	    { adName: "AdName 10"}
    
 ]; // Can be obtained from another source, such as your objJson variable

 function prevPage()
 {
     if (current_page > 1) {
         current_page--;
         changePage(current_page);
     }
 }

 function nextPage()
 {
     if (current_page < numPages()) {
         current_page++;
         changePage(current_page);
     }
 }

 function changePage(page)
 {
     var btn_next = document.getElementById("btn_next");
     var btn_prev = document.getElementById("btn_prev");
     var listing_table = document.getElementById("listingTable");
     var page_span = document.getElementById("page");

     // Validate page
     if (page < 1) page = 1;
     if (page > numPages()) page = numPages();

     listing_table.innerHTML = "";

     for (var i = (page-1) * records_per_page; i < (page * records_per_page); i++) {
         listing_table.innerHTML += objJson[i].adName + "<br>";
     }
     page_span.innerHTML = page;

     if (page == 1) {
         btn_prev.style.visibility = "hidden";
     } else {
         btn_prev.style.visibility = "visible";
     }

     if (page == numPages()) {
         btn_next.style.visibility = "hidden";
     } else {
         btn_next.style.visibility = "visible";
     }
 }

 function numPages()
 {
     return Math.ceil(objJson.length / records_per_page);
 }

 window.onload = function() {
     changePage(1);
 };
</script>   -->
</body>
  
<jsp:include page="commons/footer.jsp"></jsp:include>
