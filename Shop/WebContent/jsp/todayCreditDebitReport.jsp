<% boolean isHome=false;%>
<%@include file="commons/header.jsp"%>

<head>

<script src="/Shop/staticContent/js/jquery-1.12.3.min.js"></script>
<script type="text/javascript" src="/Shop/staticContent/js/selectjj.js"></script>
<script type="text/javascript" src="/Shop/staticContent/js/buttom.js"></script>
<script src="/Shop/staticContent/js/jquery.min.js"></script>
<script src="/Shop/staticContent/js/jquery.jqgrid.min.js"></script>
<script src="/Shop/staticContent/js/jquery.dataTables.js" type="text/javascript"></script>
<script type="text/javascript" src="/Shop/staticContent/js/jqueryUi.js"></script>

<link href="/Shop/staticContent/css/dataTa.css" rel="stylesheet" type="text/css" media="all" />
<link href="/Shop/staticContent/css/dataTables.jqueryui.min.css" rel="stylesheet" type="text/css" media="all">
<link href="/Shop/staticContent/css/select.css" rel="stylesheet" type="text/css" media="all">
<link href="/Shop/staticContent/css/button.css" rel="stylesheet" type="text/css" media="all">
<link rel="stylesheet" href="/Shop/staticContent/css/jquery-ui.min.css">
<link rel="stylesheet" href="/Shop/staticContent/css/ui.jqgrid.min.css">

<link href="/Shop/staticContent/css/jquery.dataTables.tableTools.css" rel="stylesheet" type="text/css" media="all" />
<script src="/Shop/staticContent/js/jquery.dataTables.tableTools.min.js" type="text/javascript"></script>

<script src="/Shop/staticContent/js/cashbankbook.js"></script>

<link rel="stylesheet" href="/Shop/staticContent/css/shopstyle.css">

<style>
/* 
 .btn-default,.btn-primary,.btn-success,.btn-info,.btn-warning,.btn-danger
 {
    border-radius:23px;
}  */

.container-fluid {
	overflow: hidden;
	padding-bottom: 100px;
}

div#example1_wrapper {
    padding-top: 20px;
    padding-bottom: 20px;
}

div#example2_wrapper {
    padding-bottom: 20px;
    padding-top: 20px;
}

</style>

<script type="text/javascript">

$(document).ready(function () {
	
	getYesterdarTotalAmount();
	
	getTodayCreditDebitReport();
	getTodayCreditDebitReport1();
	getTodaySaleTotalAmount();
	
	
	});


</script>
</head>
<body>
 <div class="container-fluid"> 

 <div class="container col-md-offset-1 pb-5" > 
 		
 		<div class="row">
			<div align="center" style="margin-top: 75px">
				  <h2 class="form-name style_heading">Today Credit Debit Reports</h2>
			</div>
				 	
			 <div class="row">
				<div class="col-sm-offset-1 col-md-10">
						<hr style="border-top-color:#c1b1b1;">
				</div>	
			 </div>
		</div>
 	
 
 	           <!-- <div class="col-md-offset-3 col-md-5"> -->
					<div	class="table-responsive">
					<table class="table table-bordered table-striped table-condensed cf" id="example1" class="display	">
						<thead>
							<tr>
							    <th>Name</th>
								<th>Credit</th>
								
							</tr>
						</thead>
						<tfoot>
							<tr>
								<!-- <th colspan="0" style="text-align: right">Total:</th> -->
								<th></th>
								<!-- <th colspan="0" style="text-align: right">Total:</th> -->
								<th></th>
			
			
							</tr>
						</tfoot>
					</table>
					</div>
					
					<!-- </div> -->
					
					
					 <!-- <div class="col-md-5"> -->
					<div	class="table-responsive">
					<table class="table table-bordered table-striped table-condensed cf" id="example2" class="display	">
						<thead>
							<tr>
							    <th>Name</th>
								<th>Debit</th>
								
							</tr>
						</thead>
						<tfoot>
							<tr>
								<!-- <th colspan="0" style="text-align: right">Total:</th> -->
								<th></th>
								<th></th>
			
			
							</tr>
						</tfoot>
					</table>
					</div>
				 <!-- </div>  -->
				
				 
				<div class="row form-group" style="padding-top:4%">
				
				            <label class="col-md-3 control-label" for="village">Yesterday Amount:<sup>*</sup></label>
				           	 	<div class="col-md-3">
									<div class="input-group">
										<span class="input-group-addon">
											Rs
										</span>
				         	   			  <input type="text" readonly="readonly"  name="yesAmt" id="yesAmt" placeholder="YesterDay Amount" class="form-control input-md ac_district"  >
				          		  	</div>
								</div>
								
								
								<label class="col-md-3 control-label" for="village">Today Credit Amount:<sup>*</sup></label>
				           	 	<div class="col-md-3">
									<div class="input-group">
										<span class="input-group-addon">
											Rs
										</span>
				         	   			  <input type="text" readonly="readonly" name="creAmt" id="creAmt" placeholder="Credit Amount" class="form-control input-md ac_district"  >
				         	   			  <input readonly="readonly" id="dupsaletotal" name="dupsaletotal"  class="form-control input-md" type="hidden" >
				          		  	</div>
								</div>
								
 		       </div>
 		       
 		       <div class="row form-group" >
				
				            <label class="col-md-3 control-label" for="village">Today Debit Amount:<sup>*</sup></label>
				           	 	<div class="col-md-3">
									<div class="input-group">
										<span class="input-group-addon">
											Rs
										</span>
				         	   			  <input type="text" readonly="readonly"  name="debAmt" id="debAmt" placeholder="YesterDay Amount" class="form-control input-md ac_district"  >
				         	   			  <input readonly="readonly" id="dupsaletotal1" name="dupsaletotal1"  class="form-control input-md" type="hidden" >
				          		  	</div>
								</div>
								
								
								<label class="col-md-3 control-label" for="village">Today Sale Amount:<sup>*</sup></label>
				           	 	<div class="col-md-3">
									<div class="input-group">
										<span class="input-group-addon">
											Rs
										</span>
				         	   			  <input type="text" readonly="readonly" name="totsaleAmt" id="totsaleAmt" placeholder="Credit Amount" class="form-control input-md ac_district"  >
				          		  	</div>
								</div>
								
 		       </div>
 		
 		
 		<div class="row form-group">
				
				            <label class="col-md-3 control-label" for="village">Today Remaining Amount:<sup>*</sup></label>
				           	 	<div class="col-md-3">
									<div class="input-group">
										<span class="input-group-addon">
											Rs
										</span>
				         	   			  <input type="text" readonly="readonly"  name="remAmt" id="remAmt" placeholder="YesterDay Amount" class="form-control input-md ac_district"  >
				         	   			  
				          		  	</div>
								</div>
 		       </div>
</div>

</div>
</body>

<jsp:include page="commons/footer.jsp"></jsp:include>