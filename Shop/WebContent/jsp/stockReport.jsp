<%@page import="com.Fertilizer.hibernate.shopDetailsBean"%>
<%@page import="com.Fertilizer.dao.shopDetailsDao"%>
<%@page import="com.Fertilizer.bean.StockDetail"%>
<%@page import="com.Fertilizer.hibernate.Stock"%>
<%@page import="com.Fertilizer.hibernate.GodownEntry"%>
<%@page import="com.Fertilizer.dao.GodownEntryDao"%>
<%@page import="com.Fertilizer.hibernate.CategoryDetailsBean"%>
<%@page import="com.Fertilizer.dao.CategoryDetailsDao"%>
<% boolean isHome=false;%>
<%@include file="commons/header.jsp"%>
<%@page import="java.util.List"%>
<head>
<script src="/Shop/staticContent/js/stockDetails.js"></script>

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
<!-- <script type="text/javascript" src="//code.jquery.com/jquery-1.12.4.js"></script>  -->

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

<link rel="stylesheet" href="/Shop/staticContent/css/shopstyle.css">

<script type="text/javascript">
function openBilling() {
		 window.location = '/Shop/jsp/allBilling.jsp';
}

</script>

<style>
.container-fluid {
	overflow: hidden
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
<<<<<<< HEAD
}

=======
} */

</style>
</head>

<body onload="getProductName()">
<div class="container-fluid">

<div class="container col-md-offset-1" style="float: left"> 


 		
 		<div class="row">
			<div align="center" style="margin-top: 75px">
				  <h2 class="form-name style_heading">Stock Reports</h2>
			</div>
				 	

			 <div class="row" align="center">
				<div class="hr-width">
						<hr class="style-one">

			<!--  <div class="row" align="center">
				<div class="hr-width">
					<hr class="style-one">
>>>>>>> branch 'master' of https://github.com/embelgit/Shop4.0
				</div>	
			</div> -->
		</div>

	<div class="stock-report">
		<ul class="nav nav-tabs">
		    <li class="active"><a data-toggle="tab" href="#cat">Category Wise</a></li>
		    <li><a data-toggle="tab" href="#productName">Product Wise</a></li>
		    <li><a data-toggle="tab" href="#companyName">Company Wise</a></li>
		    <li><a data-toggle="tab" href="#godown">Shop Wise</a></li>
 	 	</ul>
 	 </div>
 
 	<div class="tab-content">
   
<!-------------------------------------------------- CATEGORY WISE Starts Here -------------------------------------------------->
   
   <div id="cat" class="tab-pane fade in active">
    	<div class="row"></div>
 		
 				<form class="form-horizontal" method="post" action="" name="fertiBill">
					<fieldset>
					<div class="shopform-margin">
				        <div class="row" style="margin-top: 20px">
							<div class="form-group">	
								<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
									<label class="control-label" for="fk_cat_id">Product Category<sup>*</sup></label>  
           			 			</div>
           			 			<div class="col-lg-3 col-md-3 col-sm-4">
									<div class="input-group">
										<span class="input-group-addon">
											<i class="glyphicon glyphicon-list-alt"></i>
										</span>
							
							<!-- Following code is to get categories from "categories" table of "fertilizer" DB -->
										<!-- getAllMainCat() is implemented in  CategoryDetailsDao with return type List-->
										<%
										   CategoryDetailsDao cdd = new CategoryDetailsDao();
			           					   List cList =cdd.getAllMainCat(request);
										%>
										<input list="cat_drop" id="fk_cat_id" name="fk_cat_id" class="form-control" placeholder="Product Name">
										<datalist id="cat_drop">
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
							</div>
						</div>
				</div>	
					<div class="row buttons-margin" align="center">
				     	<!-- <div class="input-group">		 -->										  
							<input type="button" id="btn" name="save" class="btn btn-success" onclick="StockDetailsReportAsPerCatValidate()" value="Search"/>
						<!-- </div> -->
					</div>		
			
				<br><br><br>
				<div class="container" align="center">
<!-- 						<div class="table-responsive" align="center" style="padding-top:2%"> -->
						
						<table class= "table table-bordered table-striped table-condensed cf" id="stockByCat" class="display">
						<thead>
							<tr>
								<th>Product Name</th>
								<th>Company Name</th>
								<!-- <th>Packing</th> -->
								<th>Unit</th>
								<!-- <th>Original Quantity</th> -->
								<th>Available Quantity</th>
								<th>Shop Name</th>
							</tr>
						</thead>
						<tfoot>
							
						</tfoot>
					</table>
					<!-- <div class="pagination-page">
                                            <nav aria-label="...">
                                               <ul class="pagination" style=" margin-top:-10px; margin-bottom: 40px;">
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
				
					<div class="row buttons-margin" align="center">
						<input type="button" id="btn" class="btn btn-primary" name="btn" onclick="openBilling()" value="Back ">	
					</div>
				
				
				
    	
    	</div>
    	<%-- <div id="cat" class="tab-pane fade in active" align="center">
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
										<input list="cat_drop" id="fk_cat_id" name="fk_cat_id" class="form-control" placeholder="Product Name">
										<datalist id="cat_drop">
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
				     <div class="col-md-3" style="padding-bottom:4%">
						<div class="input-group">
									<input type="button"  id="btn"  name="save" style=" height: 53px; width: 128px; font-size: 25" class="btn  btn-success " onclick="StockDetailsReportAsPerCatValidate()" value="Search"/>	
									<!-- <input type="button"  id="btn" name="save" class="btn btn-lg btn-success btn-md button_hw button_margin_right" onclick="StockDetailsReportAsPerCat()" value="Search"/> -->
												     									
						</div>
					</div>	
				</div>		
						<table class= "table table-bordered table-striped table-condensed cf" id="stockByCat" class="display" style="padding-top:2%">
						<thead>
							<tr>
								<th>Product Name</th>
								<th>Company Name</th>
								<th>Packing</th>
								<th>Quantity</th>
								<th>Stock Available</th>
								<th>Unit</th>							
							</tr>
						</thead>
						<tfoot>
						<!-- 
							<tr>
								  <th colspan="4" style="text-align: right">Total Quantity:</th>
								<th></th> 
							</tr>
						 -->
						</tfoot>
					</table>
					<div class="row form-group buttons_margin_top " style="padding-top:2%">
								<div align="center">
								<input type="button" id="btn" style=" height: 53px; width: 128px; font-size: 25" class="btn  btn-primary " name="btn" onclick="openBilling()" value="Back ">	
								</div>
					</div>
				</fieldset>
				</form>
    	</div> --%>

<!-------------------------------------------------- CATEGORY WISE Ends Here -------------------------------------------------->
    	
<!-------------------------------------------------- PRODUCT WISE Starts Here -------------------------------------------------->
    	
    	<div id="productName" class="tab-pane">
    	<div class="row"></div>
 		
 				<form class="form-horizontal" method="post" action="" name="fertiBill">
					<fieldset>
					<div class="shopform-margin">
				         <div class="row" style="margin-top: 20px">
							<div class="form-group">
								<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
									<label class="control-label" for="fk_godown_id">Select Product<sup>*</sup></label>  
           			 			</div>
           			 			<div class="col-lg-3 col-md-3 col-sm-8">
									<div class="input-group">
										<span class="input-group-addon">
											<i class="glyphicon glyphicon-list-alt"></i>
										</span>
							<!-- <input list="cat_drop" id="fk_cat_id" name="fk_cat_id" class="form-control">   -->
										<select class="form-control" id="proName" name="proName">
									 	</select>
            						</div>
            					</div> 
							</div>
						</div>
					  	  	<div class="row buttons-margin" align="center">
				   				<input type="button" id="btn" name="save" class="btn btn-success" onclick="StockDetailsReportAsPerProductNameValidate()" value="Search"/>
							</div>		
			<br><br><br>
							<div class="container" align="center">
<!-- 						<div class="table-responsive" align="center" style="padding-top:2%"> -->
						<table class= "table table-bordered table-striped table-condensed cf" id="productTable" class="display">
						<thead>
							<tr>
								<th>Product Name</th>
								<th>Company Name</th>
								<!-- <th>Packing</th> -->
								<th>Unit</th>
								<!-- <th>Original Quantity</th> -->
								<th>Available Quantity</th>
								<th>Shop Name</th>
							</tr>
						</thead>
						<tfoot>
							<!-- <tr>
								  <th colspan="3" style="text-align: right">Total Quantity:</th>
								<th></th> 
							</tr> -->
						</tfoot>
					</table>
					<!-- <div class="pagination-page">
                                            <nav aria-label="...">
                                               <ul class="pagination" style=" margin-top:-10px; margin-bottom: 40px;">
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
					<div class="row buttons-margin" align="center">
						<input type="button" id="btn" class="btn btn-primary" name="btn" onclick="openBilling()" value="Back ">	
					</div>
				    	
    	</div>
<!-------------------------------------------------- PRODUCT WISE Ends Here -------------------------------------------------->    	

<!-------------------------------------------------- COMPANY WISE Starts Here -------------------------------------------------->    	
	    	
    	<div id="companyName" class="tab-pane">
    	<div class="row"></div>
 		
 				<form class="form-horizontal" method="post" action="" name="fertiBill">
					<fieldset>
					<div class="shopform-margin">
					
				        <div class="row" style="margin-top: 20px">
							<div class="form-group">
								<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
									<label class="control-label" for="fk_godown_id">Select Company<sup>*</sup></label>  
    							</div>
           			 			<div class="col-lg-3 col-md-3 col-sm-8">
									<div class="input-group">
										<span class="input-group-addon">
											<i class="glyphicon glyphicon-list-alt"></i>
										</span>
							
							<%
							   CategoryDetailsDao cdDAO = new CategoryDetailsDao();
           						List companyName =cdDAO.getCompanyNames(request);
							
							%>
										<input list="company_drop" id="company_name" name="company_name" placeholder="Select Company"class="form-control" >
											<datalist id="company_drop">
							<%
					           for(int i=0;i<companyName.size();i++){
					        	   Stock com = (Stock)companyName.get(i);
							%>
		
											<option data-value="<%=com.getCompanyName()%>" value="<%=com.getCompanyName()%>">
							<%
				      			}
				    		%>
			              	       			</datalist>
            						</div>
            					</div> 
							</div>
						</div>
					
					<div class="row buttons-margin" align="center">  
				    	<input type="button" id="btn" name="save" class="btn btn-success" onclick="StockDetailsReportAsPerCompanyNameValidate()" value="Search"/>
					</div>	
					
							<br><br><br>
							<div class="container" align="center">
<!-- 						<div class="table-responsive" align="center" style="padding-top:2%">	 -->
						<table class= "table table-bordered table-striped table-condensed cf" id="companyWiseTable" class="display">
						<thead>
							<tr>
								<th>Product Name</th>
								<th>Company Name</th>
								<!-- <th>Packing</th> -->
								<th>Unit</th>
								<!-- <th>Original Quantity</th> -->
								<th>Available Quantity</th>
								<th>Shop Name</th>
							</tr>
						</thead>
						<tfoot>
							<!-- <tr>
								  <th colspan="3" style="text-align: right">Total Quantity:</th>
								<th></th> 
							</tr> -->
						</tfoot>
					</table>
					<!-- <div class="pagination-page">
                                            <nav aria-label="...">
                                               <ul class="pagination" style=" margin-top:-10px; margin-bottom: 40px;">
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
				
					<div class="row buttons-margin" align="center">
						<input type="button" id="btn" class="btn btn-primary" name="btn" onclick="openBilling()" value="Back ">	
					</div>
						   	
    	</div>
<!-------------------------------------------------- COMPANY WISE Ends Here -------------------------------------------------->
    	
<!-------------------------------------------------- Shop WISE Starts Here -------------------------------------------------->
    	<div id="godown" class="tab-pane">
    	<div class="row"></div>
 		
 				<form class="form-horizontal" method="post" action="" name="fertiBill">
					<fieldset>
					<div class="shopform-margin">
				         <div class="row" style="margin-top: 20px">
							<div class="form-group">
								<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">	
									<label class="control-label" for="fk_godown_id">Shop Name<sup>*</sup></label>  
           			 			</div>
           			 			<div class="col-lg-3 col-md-3 col-sm-8">
									<div class="input-group">
										<span class="input-group-addon">
											<i class="glyphicon glyphicon-user"></i>
										</span>
              				
							<!-- Following code is to get categories from "categories" table of "fertilizer" DB -->
							<!-- getAllMainCat() is implemented in  CategoryDetailsDao with return type List-->
							<%
							shopDetailsDao cdd1 = new shopDetailsDao();
           						List cList1 =cdd1.getAllShop(request);
							
							%>
										<input list="Shop_drop" id="fk_shop_id" name="fk_shop_id" placeholder="Shop Name"  class="form-control" >
										<datalist id="Shop_drop">
							<%
					           for(int i=0;i<cList1.size();i++){
					        	   shopDetailsBean sdb=(shopDetailsBean)cList1.get(i);
							%>
		
											<option data-value="<%=sdb.getShopId()%>" value="<%=sdb.getShopName()%>">
							<%
				      			}
				    		%>
			              	
            							</datalist>
            						</div>
            					</div> 
							</div>
						</div>
					  
					<div class="row buttons-margin" align="center">
						<input type="button" id="btn" name="save" class="btn btn-success" onclick="StockDetailsReportAsPerShopValidate()" value="Search"/>
					</div>	
							<br><br><br>
							<div class="container" align="center">
<!-- 						<div class="table-responsive" align="center" >	 -->
						<table class= "table table-bordered table-striped table-condensed cf" id="stockByGodown" class="display">
						<thead>
							<tr>
								<th>Product Name</th>
								<th>Company Name</th>
								<!-- <th>Packing</th> -->
								<th>Unit</th>
								<!-- <th>Original Quantity</th> -->
								<th>Available Quantity</th>
								<th>Shop Name</th>
							</tr>
						</thead>
						
					</table>
					<!-- <div class="pagination-page">
                                            <nav aria-label="...">
                                               <ul class="pagination" style=" margin-top:-10px; margin-bottom: 40px;">
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
					
					<div class="row buttons-margin" align="center">
						<input type="button" id="btn" class="btn btn-primary" name="btn" onclick="openBilling()" value="Back">	
					</div>
			</div>
<!-------------------------------------------------- Shop WISE Ends Here -------------------------------------------------->

    </div>

  </div>
  
  </div>

 </div>
</div>
</body>
<jsp:include page="commons/footer.jsp"></jsp:include>