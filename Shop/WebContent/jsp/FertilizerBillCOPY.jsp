<%@page import="com.Fertilizer.bean.GetBillDetails"%>
<%@page import="com.Fertilizer.bean.CreditCustBillNoAndName"%>
<%@page import="com.Fertilizer.dao.FertilizerBillDao"%>

<% boolean isHome=false;%>
<%@include file="commons/headerNew.jsp"%>
<head>
<script src="/Shop/staticContent/js/generateSeedAndPesticidePDF.js"></script>

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

<script type="text/javascript" src="/Shop/staticContent/js/bootstrap.js"></script>
<script type="text/javascript" src="/Shop/staticContent/js/bootbox.min.js"></script>
<link rel="stylesheet" href="/Shop/staticContent/css/shopstyle.css">
</head>
<!--  <div class="container" style="float: left" align="center">  -->

 <div class="container"> 
 		
 		<div class="row" align="center">
			<div style="margin-top: 75px; float: none;">
				  <!-- <h2 class="form-name style_heading" style="float: none;" align="center">Customer Bill Copy</h2> -->
				  <h2 class="form-name style_heading" align="center">Customer Bill Copy</h2>
			</div>
				 	
			<div class="row" align="center">
				<div class="hr-width">
					<hr class="style-one">
				</div>	
			</div>
		</div>
		
<!------------------------------------------------- Normal Customer and Credit Customer Button Starts Here ------------------------------------------------->
		<div class="customerbillcopy">
			<ul class="nav nav-tabs" >
			 	<li class="active"><a data-toggle="tab" href="#NomCust">Normal Customer Bill Copy</a></li>
	    		<li><a data-toggle="tab" href="#creditCustomer">Credit Customer Bill Copy</a></li>
 	 		</ul>
 	 	</div>	
 	 		<!-- <div class="tab-content" style="float: left"> -->
 	 		
 	 		<div class="tab-content">
 	 		
<!------------------------------------------------- Normal Customer and Credit Customer Button Ends Here -------------------------------------------------> 	 		
 	 		
<!------------------------------------------------- Normal Customer Bill Copy Starts Here ------------------------------------------------->
 	 		
 	 			<div id="NomCust" class="tab-pane fade in active">
 					<form action="" method="post" name="genIn">
 					<fieldset>
 						<%
							FertilizerBillDao fd = new FertilizerBillDao();
							List list = fd.getNormalCustFertilizerBillNos();
						%>
					<div class="shopform-margin">	
					<div class="row">
						<div class="form-group">
							<div class="2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
								<label class="control-label" for="">Select Customer:<sup>*</sup></label>
							</div>
							<div class="col-lg-3 col-md-3 col-sm-8">
								<div class="input-group">
									<span class="input-group-addon">
										<i class="glyphicon glyphicon-calendar"></i>
									</span>
									<input list="fDateNo" id="fDate" class="form-control" onchange="getAllbill();" placeholder="Select Customer">
										<datalist id="fDateNo">
 									<%
					               		for(int i=0;i<list.size();i++){
					               			GetBillDetails billList=(GetBillDetails)list.get(i);
									%>
											<option data-value="<%=billList.getBillNo()%>" value="<%=billList.getClientName()%>" >
									<%
										}
									%> 
										</datalist>
									
<!-- 								 <input type="date" id="fDate" name="fDate" placeholder="Start Date"  class="form-control " type="text" onchange="getAllbill();"> -->
								</div>
							</div>
						<!-- </div> -->
						
						
<!-- 						<div class="row form-group" style="margin-top: 30px;" align="center"> -->
							
								<!-- <div class="col-md-5 col-md-offset-3"> -->
							<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">	
								<label class="control-label">Bill Number :<sup>*</sup></label> 
							</div>
								<!-- </div>	 -->
							<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
								<div class="input-group">
									<span class="input-group-addon">
										<span class="glyphicon nogyphicon">No</span>
									</span>
										
<!-- 								<input list="subcategory_drop"  placeholder="Product Sub-Category" class="form-control input-md"
								id='subCat' name="subCat">
							<datalist id="subcategory_drop"></datalist>		 -->
										
									<input list="seedBillNo" id="BillNo" class="form-control" placeholder="Bill No">
									<datalist id="seedBillNo"></datalist>
<%-- 									<%
					               		for(int i=0;i<list.size();i++){
					               			GetBillDetails billList=(GetBillDetails)list.get(i);
									%>
									<option data-value="<%=billList.getBillNo()%>" value="<%=billList.getBillNo()%>    <%=billList.getClientName()%>" >
									<%
										}
									%> --%>
									
									
								 </div>		
							 </div>
						</div>
					</div>	
					
					</div>
					</fieldset>
				</form>		
								<div class="row buttons-margin" align="center">
								 	<input type="button" onclick="normalCustFertilzerBillCOPYValidate()" name="btn" id="btn" class="btn btn-success" value="Print" />
								</div>
							
						
 					
 				</div>
<!------------------------------------------------- Normal Customer Bill Copy Ends Here -------------------------------------------------> 				
 				
<!------------------------------------------------- Credit Customer Bill Copy Starts Here ------------------------------------------------->
 	  	 	<div id="creditCustomer" class="tab-pane">
 				<form action="" method="post" name="genIn">
 					<fieldset>
 					<div class="shopform-margin">
 						<%
							FertilizerBillDao ccfd = new FertilizerBillDao();
							List cclist = ccfd.getCreditCustFertilizerBillNos();
						%> 
						
					<div class="row">
						<div class="form-group">
							<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
								<label class="control-label" for="">Select Credit Customer:<sup>*</sup></label>
							</div>
							<div class="ccol-lg-3 col-md-3 col-sm-8">
								<div class="input-group">
									<span class="input-group-addon">
										<i class="glyphicon glyphicon-calendar"></i>
									</span>
									<input list="cDateNo" id="cDate" class="form-control" placeholder="Select Customer" onchange="getAllcreditbill();">
									<datalist id="cDateNo">
 									<%
					               		for(int i=0;i<cclist.size();i++){
					               			GetBillDetails billList=(GetBillDetails)cclist.get(i);
									%>
										<option data-value="<%=billList.getBillNo()%>" value="<%=billList.getClientName()%>" >
									<%
										}
									%> 
									</datalist>
								
<!-- 								 <input type="date" id="cDate" name="cDate" placeholder="Start Date"  class="form-control " type="text" onchange="getAllcreditbill();"> -->
								</div>
							</div>
						
<!-- 						<div class="row" style="margin-top: 30px;"> -->
					<!-- 			<div class="col-md-3 col-md-offset-3"> -->
							<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">	
								<label class="control-label"> Bill Number :<sup>*</sup></label> 
							</div>
					<!-- 			</div> -->	
							<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
								<div class="input-group">
									<span class="input-group-addon">
										<span class="glyphicon nogyphicon">No</span>
									</span>
									<input list="creditCustBillNo" id="CreditBillNo" placeholder="Bill No" class="form-control">
									<datalist id="creditCustBillNo"></datalist>
<%-- 									 <%
					               		for(int i=0;i<cclist.size();i++){
					               			GetBillDetails ccbillList=(GetBillDetails)cclist.get(i);
									%> 
									<option data-value="<%=ccbillList.getBillNo()%>" value="<%=ccbillList.getBillNo()%>   <%=ccbillList.getClientName()%>" >
									<%
										}
									%> 
									</datalist> --%>
									
								 </div>
							</div>
						 </div>
					</div>
				
				</div>
				</fieldset>
			</form>		
								<div class="row buttons-margin" align="center">									
									 <input type="button" onclick="creditCustFertilzerBillCOPYValidate()" name="btn" id="btn" class="btn btn-success" value="Print"/>
								</div>						
 					
 					
 				</div> 
<!------------------------------------------------- Credit Customer Bill Copy Ends Here -------------------------------------------------> 				
 					
 				<br/>
 				<!-- <hr style="color: black"/> -->
 				<jsp:include page="commons/footer.jsp"></jsp:include> 		
 	 		</div>
 	  </div> 	  