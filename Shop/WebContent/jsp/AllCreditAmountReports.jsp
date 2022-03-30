<% boolean isHome=false;%>
<%@include file="commons/header.jsp"%>
<head>
<script src="/Shop/staticContent/js/customerbillreport.js"></script>

<script src="/Shop/staticContent/js/jquery-1.12.3.min.js"></script>
<script type="text/javascript" src="/Shop/staticContent/js/selectjj.js"></script>
<script type="text/javascript" src="/Shop/staticContent/js/buttom.js"></script>
<script src="/Shop/staticContent/js/jquery.min.js"></script>
<script src="/Shop/staticContent/js/jquery.jqgrid.min.js"></script>
<script src="/Shop/staticContent/js/jquery.dataTables.js" type="text/javascript"></script>
<script type="text/javascript" src="/Shop/staticContent/js/jqueryUi.js"></script>
<script type="text/javascript" src="/Shop/staticContent/js/bootstrap.js"></script>
<script type="text/javascript" src="/Shop/staticContent/js/bootbox.min.js"></script>
<link href="/Shop/WebContent/staticContent/css/dataTa.css" rel="stylesheet" type="text/css" media="all" />
<link href="/Shop/staticContent/css/dataTables.jqueryui.min.css" rel="stylesheet" type="text/css" media="all">
<link href="/Shop/staticContent/css/select.css" rel="stylesheet" type="text/css" media="all">
<link href="/Shop/staticContent/css/button.css" rel="stylesheet" type="text/css" media="all">
<link rel="stylesheet" href="/Shop/staticContent/css/jquery-ui.min.css">
<link rel="stylesheet" href="/Shop/staticContent/css/ui.jqgrid.min.css">

<link rel="stylesheet" href="/Shop/staticContent/css/shopstyle.css">

<style>

 .btn-default,.btn-primary,.btn-success,.btn-info,.btn-warning,.btn-danger
 {
    border-radius:23px;
} 

.container-fluid {
	overflow: hidden;
}


</style>
</head>
<body>

 <div class="container-fluid"> 
<div class="row">
    <div  class="col-md-12">
        <h3>Left Tabs</h3>
        <hr/>
        
	<!-- <div class="col-md-2"> -->
		<div class="gstreturn">
		<!-- <ul class="nav nav-tabs tabs-left" > -->
		 <ul class="nav nav-tabs ">
		    <li class="active"><a data-toggle="tab" href="#credit" >All Credit Amount</a></li>
		    <li><a data-toggle="tab" href="#debit" >All Debit Amount</a></li>
		    
		   
 		 </ul>
 		</div>	
 		

 <div class="container"  align="center"> 
 		
 		<div class="row">
			<div class="col-md-offset-1" align="center" style="margin-top: 75px">
				  <h2 class="form-name style_heading">All Credit/Debit Reports</h2>
			</div>
				 	
			 <div class="row">
				<div class="col-sm-offset-1 col-md-10">
						<hr style="border-top-color:#c1b1b1;">
				</div>	
			  </div>
	</div>
	
 		
 		 
 <div class="tab-content" style="float: left;margin-top:12px;" align="center">
	
    <div id="credit" class="tab-pane fade in active"> 		
		
 	 <ul class="nav nav-tabs">
	    <li class="active"><a data-toggle="tab" href="#home" style=" border-radius:23px;"><h4>Credit By Credit Customer</h4></a></li>
	    <li><a data-toggle="tab" href="#twoDates" style=" border-radius:23px;"> <h4 >Credit By Billilng</h4></a></li>
	     <!-- <li><a data-toggle="tab" href="#twoYears"><h4 style="color:blue">Between Two Years</h4></a></li> -->
 	 </ul>
 
 	<div class="tab-content" style="float: left;margin-top: 12px;">
   
    <!-------- Credit Amount By credit customer ---------->
   
    	<div id="home" class="tab-pane fade in active">
    	<div class="row"></div>
 			<form class="form-horizontal" method="post" action="" name="fertiBill">
					<fieldset>
				         <div class="row form-group" style="margin-top: 30px">
							<label class="col-md-3 control-label" for="customerName"> Start Date:<sup>*</sup></label>  
				           			 <div class="col-md-3">
										<div class="input-group">
											<span class="input-group-addon">
												<i class="glyphicon glyphicon-calendar"></i>
											</span>
				           		 			  <input type="date" id="fisDate" placeholder="Start Date" class="form-control input-md" type="text" >
				           		 		</div>
									</div>
				
				           	 <label class="col-md-2 control-label" for="village">End Date:<sup>*</sup></label>
				           	 	<div class="col-md-3">
									<div class="input-group">
										<span class="input-group-addon">
											<i class="glyphicon glyphicon-calendar"></i>
										</span>
				         	   			  <input type="date" id="endDate" placeholder="End Date" class="form-control input-md ac_district"  type="text">
				          		  	</div>
								</div>
				          </div>
					  
				       <div class="row form-group buttons_margin_top ">
												<div align="center">
												  
												    <input type="button"  id="btn" name="save" class="btn  btn-success "
												    style="height: 38px; width: 121px;font-size: 18"
												    onclick="getCreditAmountByCreditCustValidation()" value="Search"/>
												     									
												</div>
									</div>	
									<div class="table-responsive" style="padding-top:2%">
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="example11" class="display">
						<!-- <table id="example1" class="display"> -->
						<thead>
							<tr>
									<th>Payment Date</th>
									<th>Customer Bill No</th>
									<th>Customer Name</th>
									<th>Total Paid Amount</th>
							</tr>
						</thead>
						<tfoot>
							<tr>
								<th colspan="3" style="text-align: right">Total:</th>
								<th></th>
							</tr>
						</tfoot>
					</table>
					</div>
				</fieldset>
				</form>
 		</div>
 		
 <!-- ---	Credit Amount By custome Normal Custoomer billing	---->
 	<div id="twoDates" class="tab-pane ">
 		<div class="row"></div>
 				<form class="form-horizontal" method="post" action="" name="fertiBill">
					<fieldset>
				         <div class="row form-group" style="margin-top: 30px">
							<label class="col-md-3 control-label" for="customerName"> Start Date:<sup>*</sup></label>  
				           			 <div class="col-md-3">
										<div class="input-group">
											<span class="input-group-addon">
												<i class="glyphicon glyphicon-calendar"></i>
											</span>
				           		 			  <input type="date" id="fisDate2" placeholder="Start Date" class="form-control input-md" type="text" >
				           		 		</div>
									</div>
				
				           	 <label class="col-md-2 control-label" for="village">End Date:<sup>*</sup></label>
				           	 	<div class="col-md-3">
									<div class="input-group">
										<span class="input-group-addon">
											<i class="glyphicon glyphicon-calendar"></i>
										</span>
				         	   			  <input type="date" id="endDate2" placeholder="End Date" class="form-control input-md ac_district"  type="text">
				          		  	</div>
								</div>
				          </div>
					  
				       <div class="row form-group buttons_margin_top ">
												<div align="center">
												  
												    <input type="button"  id="btn" name="save" class="btn btn-success "
												    style="height: 38px; width: 121px;font-size: 18"
												    onclick="getCreditAmountByBillingValidation()" value="Search"/>
												     									
												</div>
									</div>	
									
									<div class="table-responsive" style="padding-top:2%">
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="example" class="display">
						
						<thead>
							<tr>
									<th>Sold Date</th>
									<th>Customer Bill</th>
									<th>Customer Name</th>
									<th>Payment Mode</th>
									<th>Total Amount</th>
							</tr>
						</thead>
						<tfoot>
							<tr>
								<th colspan="4" style="text-align: right">Total:</th>
								<th></th>
							</tr>
						</tfoot>
					</table>
					</div>
				</fieldset>
				</form>
 		</div>
	
 
 	</div>
 	</div> <!-- credit div -->
 	
 		<div id="debit" class="tab-pane"> 
 			
 			 <ul class="nav nav-tabs">
	   			 <li class="active"><a data-toggle="tab" href="#supp" style=" border-radius:23px;"><h4 >Paid Amount To Supplier</h4></a></li>
	   			 <li><a data-toggle="tab" href="#emp" style=" border-radius:23px;"><h4 >Paid Amount To Employee</h4></a></li>
 			 </ul>
 			 
 			 <!-- ooo -->
 			 
 			 <div class="tab-content" style="float: left;margin-top: 12px;">
   
    <!-------- Paid Amout ot supplier Report ---------->
   
    	<div id="supp" class="tab-pane fade in active">
    	<div class="row"></div>
 			<form class="form-horizontal" method="post" action="" name="fertiBill">
					<fieldset>
				         <div class="row form-group" style="margin-top: 30px">
							<label class="col-md-3 control-label" for="customerName"> Start Date:<sup>*</sup></label>  
				           			 <div class="col-md-3">
										<div class="input-group">
											<span class="input-group-addon">
												<i class="glyphicon glyphicon-calendar"></i>
											</span>
				           		 			  <input type="date" id="fisDate3" placeholder="Start Date" class="form-control input-md" type="text" >
				           		 		</div>
									</div>
				
				           	 <label class="col-md-2 control-label" for="village">End Date:<sup>*</sup></label>
				           	 	<div class="col-md-3">
									<div class="input-group">
										<span class="input-group-addon">
											<i class="glyphicon glyphicon-calendar"></i>
										</span>
				         	   			  <input type="date" id="endDate3" placeholder="End Date" class="form-control input-md ac_district"  type="text">
				          		  	</div>
								</div>
				          </div>
					  
				       <div class="row form-group buttons_margin_top ">
												<div align="center">
												  
						<input type="button"  id="btn" name="save" class="btn btn-success "
						style="height: 38px; width: 121px;font-size: 18"
						onclick="getPaidAmountToSupplierValidation()" value="Search"/>
												     									
												</div>
									</div>	
									<div class="table-responsive" style="padding-top:2%">
							<table class="table table-bordered table-striped table-condensed cf"
											id="example3" class="display">
						
						<thead>
							<tr>
									<th>Payment Date</th>
									<th>Supplier Bill No</th>
									<th>Account Holder Name</th>
									<th>Total Paid Amount</th>
							</tr>
						</thead>
						<tfoot>
							<tr>
								<th colspan="3" style="text-align: right">Total:</th>
								<th></th>
							</tr>
						</tfoot>
					</table>
					</div>
				</fieldset>
				</form>
 		</div>
 		
 <!-- ---	Paid Amout ot emp Report	---->
 	<div id="emp" class="tab-pane ">
 		<div class="row"></div>
 				<form class="form-horizontal" method="post" action="" name="fertiBill">
					<fieldset>
				         <div class="row form-group" style="margin-top: 30px">
							<label class="col-md-3 control-label" for="customerName"> Start Date:<sup>*</sup></label>  
				           			 <div class="col-md-3">
										<div class="input-group">
											<span class="input-group-addon">
												<i class="glyphicon glyphicon-calendar"></i>
											</span>
				           		 			  <input type="date" id="fisDate4" placeholder="Start Date" class="form-control input-md" type="text" >
				           		 		</div>
									</div>
				
				           	 <label class="col-md-2 control-label" for="village">End Date:<sup>*</sup></label>
				           	 	<div class="col-md-3">
									<div class="input-group">
										<span class="input-group-addon">
											<i class="glyphicon glyphicon-calendar"></i>
										</span>
				         	   			  <input type="date" id="endDate4" placeholder="End Date" class="form-control input-md ac_district"  type="text">
				          		  	</div>
								</div>
				          </div>
					  
				       <div class="row form-group buttons_margin_top ">
												<div align="center">
												  
												    <input type="button"  id="btn" name="save" class="btn btn-success "
												    style="height: 38px; width: 121px;font-size: 18"
												    onclick="getPaidAmountToEmployeeValidation()" value="Search"/>
												     									
												</div>
									</div>
									
							<div class="table-responsive" style="padding-top:2%">
								<table class="table table-bordered table-striped table-condensed cf"
							id="example4" class="display">	
						
						<thead>
							<tr>
									<th>Payment Date</th>
									<th>Employee Name</th>
									<th>Payment Reason</th>
									<th>Paid Amount</th>
									<!--  <th>Payment Mode</th> -->
							</tr>
						</thead>
						<tfoot>
							<tr>
								<th colspan="3" style="text-align: right">Total:</th>
								<th></th>
							</tr>
						</tfoot>
					</table>
					</div>
				</fieldset>
				</form>
 		</div>
	
 	</div>
 			 
 			 <!-- ooo -->
 				
 			
 		</div>
 	
 	</div> <!-- credit tab content div -->
 	
	</div>
 	</div>
 </div>
 </div>
 </body>
<%@include file="commons/footer.jsp" %>