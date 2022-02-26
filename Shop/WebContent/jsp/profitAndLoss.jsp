<%@page import="com.Fertilizer.hibernate.shopDetailsBean"%>
<%@page import="com.Fertilizer.dao.shopDetailsDao"%>
<%@page import="com.Fertilizer.bean.SaleReports"%>
<%@page import="com.Fertilizer.hibernate.CategoryDetailsBean"%>
<%@page import="com.Fertilizer.dao.CategoryDetailsDao"%>
<%@page import="com.Fertilizer.hibernate.SupplierDetailsBean"%>
<%@page import="com.Fertilizer.dao.SupplierDetailsDao"%>
<%@page import="com.Fertilizer.bean.ProfitAndLoss"%>
<%@page import="com.Fertilizer.bean.ProfitAndLoss"%>
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
<script type="text/javascript" src="/Shop/staticContent/js/bootstrap.js"></script>
<script type="text/javascript" src="/Shop/staticContent/js/bootbox.min.js"></script>
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
<script src="/Shop/staticContent/js/profitAndLoss.js"></script>

<link rel="stylesheet" href="/Shop/staticContent/css/shopstyle.css">
<style>
.container-fluid {
	overflow: hidden;
}
</style>
</head>

<script type="text/javascript">
</script>
<div class="container-fluid"> 
 		
 		<div class="row">
			<div align="center" style="margin-top: 75px">
				  <h2 class="form-name style_heading">Profit & Loss Reports</h2>
			</div>
				 	
			 <div class="row" align="center">
				<div class="hr-width">
					<hr class="style-one">
				</div>	
			 </div>
		</div>
		 
<!--  	<div class="tab-content" style="float: left"> -->
 		
<!---------------------------- 2.BETWEEN TWO DATE	------------------------------>
 		
	<div id="twoDates" class="tab-pane " class="table-responsive">
 		<div class="row"></div>
 			<form class="form-horizontal" method="post" action="" name="fertiBill">
				<fieldset>
			    <div class="shopform-margin">    
			        <div class="row">
						<div class="form-group">
							<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
								<label class="control-label" for="">Start Date:<sup>*</sup></label>  
				           	</div>
				           	<div class="col-lg-3 col-md-3 col-sm-8">
								<div class="input-group">
									<span class="input-group-addon">
										<i class="glyphicon glyphicon-calendar"></i>
									</span>
				           		  	<input type="date" name="fisDate2" id="fisDate2" placeholder="Start Date" class="form-control input-md" type="text" >
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
				         	   	  	<input type="date" name="endDate2" id="endDate2" placeholder="End Date" class="form-control input-md ac_district"  type="text">
				          		</div>
							</div>
				     	</div>
					</div>  
			</div>
				      	
				    <div class="row buttons-margin" align="center">
						<input type="button" id="btn" name="save" class="btn btn-success" onclick="profitAndLossBetweenTwoDatesValidate()" value="Search"/>
					</div >	
							
						<!-- <table class= "table table-bordered table-striped table-condensed cf" id="profitAndLossBetweenTwoDates" class="display"> -->
					
					<div class="table-responsive" style="padding-top:2%">
						<table class="table table-bordered table-striped table-condensed cf" class="display">
						<thead>
							<tr style="">
								<th style="color: black; text-align: center">Expense Name</th>
								<th style="color: black; text-align: center">Amount (Rs.)</th>
							</tr>
							<tr>
								<th style="text-align: center">Purchase</th>
								<th><input style="background: #f0f0f0; border: 2px;" id="purchaseAmount" type="text" readonly="readonly"/></th>
							</tr>
							<tr>
								<th style="text-align: center">Transport and Labour Expanse</th>
								<th><input style="background: #f0f0f0; border: 2px;" id="tAndLExpense" type="text" readonly="readonly"/></th>
							</tr>
							<tr>
								<th style="text-align: center">Other Expenses</th>
								<th><input style="background: #f0f0f0; border: 2px;" id="otherExpense" type="text" readonly="readonly"/></th>
							</tr>
						</thead>
						<thead>
							<tr>
								<th style="color: black;text-align: center">Sale</th>
								<th></th>
							</tr>
							<tr>
								<th style="text-align: center">Total sale</th>
								<th><input style="background: #f0f0f0; border: 2px;" id="totalSaleAmount" type="text" readonly="readonly"/></th>
							</tr>
						</thead>
						<tfoot>
							<tr>
							</tr>
						</tfoot>
					</table>
					</div>
				</fieldset>
				</form>
 		</div>
</div>

<jsp:include page="commons/footer.jsp"></jsp:include>
