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
/* .btn-default,.btn-primary,.btn-success,.btn-info,.btn-warning,.btn-danger
 {
    border-radius:23px;
} */

.container-fluid {
	overflow: hidden;
}

</style>
</head>
<script src="/Shop/staticContent/js/cashbankbook.js"></script>
<body>
 <div class="container-fluid"> 
 <div class="container col-md-offset-1" style="float: left"> 
 		
 		<div class="row">
			<div align="center" style="margin-top: 75px">
				  <h2 class="form-name style_heading">Credit Debit Reports</h2>
			</div>
				 	
			 <div class="row">
				<div class="col-sm-offset-1 col-md-10">
						<hr style="border-top-color:#c1b1b1;">
				</div>	
			  </div>
		</div>
 	 <ul class="nav nav-tabs">
	    <li class="active"><a data-toggle="tab" href="#home" style=" border-radius:23px;"><h4>Datewise</h4></a></li>
	    <li><a data-toggle="tab" href="#twoDates" style=" border-radius:23px;"><h4>Range</h4></a></li>
	     <!-- <li><a data-toggle="tab" href="#twoYears"><h4 style="color:blue">Between Two Years</h4></a></li> -->
 	 </ul>
 
 	<div class="tab-content" style="float: left">
   
    <!-------- Single Date ---------->
   
    	<div id="home" class="tab-pane fade in active">
    	<div class="row"></div>
 			<form class="form-horizontal" method="post" action="" name="">
				<fieldset>
					<div class="row form-group" style="margin-top: 20px">
						<label class="col-md-2 col-md-offset-3 control-label" for="">
							Enter Date:<sup>*</sup>
						</label>
						<div class="col-md-3">
							<div class="input-group">
								<span class="input-group-addon"> <i
									class="glyphicon glyphicon-calendar"></i>
								</span> <input type="date" id="fDate" placeholder="Start Date"
									class="form-control input-md" type="text">
							</div>
						</div>
					</div>
				
					<div class="row" style="padding-top:2%">
						<div class="col-md-2 col-md-offset-5">
							<div class="input-group">
								<input type="button" id="btn" name="save"
									class="btn btn-success" style="height: 38px; width: 121px;font-size: 18"
									onclick="creditdebitForsingleDate(); creditdebitForsingleDate1();" value="Search" />
							</div>
						</div>
					</div>
					<div class="table-responsive" style="padding-top:3%">
					<div class="col-md-offset-3 col-md-5">
					<table id="example3" class="display	">
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
			                    <th></th>
			
							</tr>
						</tfoot>
					</table>
					</div>
					
					<div class="col-md-5">
					<table id="example4" class="display	">
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
				</div>
				</fieldset>
			</form>
 		</div>
 		
 <!-- ---	Between Two Dates	---- -->
 	<div id="twoDates" class="tab-pane ">
 		<div class="row"></div>
 				<form class="form-horizontal" method="post" action="" >
					<fieldset>
				         <div class="row form-group" style="margin-top: 20px">
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
												  
												    <input type="button"  id="btn" name="save"   style="height: 38px; width: 121px;font-size: 18"
												     class="btn btn-success " onclick="creditdebitForBetTowDate(); creditdebitForBetTowDate1();" value="Search"/>
												     									
												</div>
									</div>	
						<div	class="table-responsive" style="padding-top:3%">
					<div class="col-md-offset-3 col-md-5">
					<table id="example5" class="display	">
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
			                    <th></th>
			
							</tr>
						</tfoot>
					</table>
					</div>
					
					<div class="col-md-5">
					<table id="example6" class="display	">
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
				</div>
				</fieldset>
				</form>
 		</div>
 		
<!--  <!------ Yearly ------>
 		
 		
 	</div>
 </div>
 
 </div>
 
 </body>
<jsp:include page="commons/footer.jsp"></jsp:include>