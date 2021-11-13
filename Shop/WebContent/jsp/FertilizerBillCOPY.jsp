<%@page import="com.Fertilizer.bean.GetBillDetails"%>
<%@page import="com.Fertilizer.bean.CreditCustBillNoAndName"%>
<%@page import="com.Fertilizer.dao.FertilizerBillDao"%>

<% boolean isHome=false;%>
<%@include file="commons/header.jsp"%>
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
<style>
.btn-default,.btn-primary,.btn-success,.btn-info,.btn-warning,.btn-danger
 {
    border-radius:23px;
}
</style>
</head>
<!--  <div class="container" style="float: left" align="center">  -->

 <div class="container" style="float: none"> 
 		
 		<div class="row" align="center">
			<div style="margin-top: 75px; float: none;">
				  <!-- <h2 class="form-name style_heading" style="float: none;" align="center">Customer Bill Copy</h2> -->
				  <h2 class="form-name style_heading" align="center">Customer Bill Copy</h2>
			</div>
				 	
			 <div class="row">
				<div class="col-sm-offset-2 col-md-10">
						<hr style="border-top-color:#c1b1b1;">
				</div>	
			  </div>
		</div>
		
	<!--------------------------------------------- Normal Customer and Credit Customer Button -------------------------------------------->
		
			 <ul class="nav nav-tabs" >
			 	<li class="active"><a data-toggle="tab" href="#NomCust" style=" border-radius:23px;"><h4>Normal Customer Bill Copy</h4></a></li>
	    		<li><a data-toggle="tab" href="#creditCustomer" style=" border-radius:23px;"><h4>Credit Customer Bill Copy</h4></a></li>
 	 		</ul>
 	 		
 	 		<!-- <div class="tab-content" style="float: left"> -->
 	 		
 	 		<div class="tab-content" style="float: none;" align="center">
 	 		
 	 		
 	 		
 	<!------------------------------------------------------ Normal Cutomer Bill COPY ----------------------------------------------->
 	 		
 	 			<div id="NomCust" class="tab-pane fade in active" align="center">
 					<form action="" method="post" name="genIn">
 						<%
							FertilizerBillDao fd = new FertilizerBillDao();
							List list = fd.getNormalCustFertilizerBillNos();
						%>
						
					<div class="row form-group" style="margin-top: 20px">
						<label class="col-md-2 control-label" for="">Select Customer:<sup>*</sup>
						</label>
						
						<div class="col-md-3">
							<div class="input-group">
								<span class="input-group-addon"> <i
									class="glyphicon glyphicon-calendar"></i>
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
									<label class="col-md-4 control-label"> Bill Number :<sup>*</sup></label> 
								<!-- </div>	 -->
								<div class="col-md-3">
								<div class="input-group">
										<span class="input-group-addon">
										No
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
								 <div class="row" >
								 <div class="col-md-2 col-md-offset-5" style="padding-top:5%">
										<input type="button" onclick="normalCustFertilzerBillCOPYValidate()" 
										       name="btn" id="btn" class="btn btn-success" 
											   style=" height: 53px; width: 128px; font-size: 25" value="Print" />
									</div>				
								
							</div>
							
						
 					</form>
 				</div>
 				
 				
 <!------------------------------------------------------- Credit Customer Bill COPY --------------------------------------------------------->
 	 		
 	 			
 	 			<div id="creditCustomer" class="tab-pane">
 					<form action="" method="post" name="genIn">
 						<%
							FertilizerBillDao ccfd = new FertilizerBillDao();
							List cclist = ccfd.getCreditCustFertilizerBillNos();
						%> 
						
					<div class="row form-group" style="margin-top: 20px">
						<label class="col-md-2 control-label" for="">Select Credit Customer:<sup>*</sup>
						</label>
						
						<div class="col-md-3">
							<div class="input-group">
								<span class="input-group-addon"> <i
									class="glyphicon glyphicon-calendar"></i>
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
									<label class=" col-md-4 control-label"> Bill Number :<sup>*</sup></label> 
					<!-- 			</div> -->	
								<div class="col-md-3">
									<div class="input-group">
										<span class="input-group-addon">
											No
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
								 <div class="row" >									
									 <div class="col-md-2 col-md-offset-5" style="padding-top:5%" >
										<input type="button" onclick="creditCustFertilzerBillCOPYValidate()"
										name="btn" id="btn"	style=" height: 53px; width: 128px; font-size: 25" 
										class="btn btn-success" value="Print"/>
									</div>	
									
								</div>						
 					</form>
 					
 				</div> 	
 				<br/>
 				<hr style="color: black"/>
 				<jsp:include page="commons/footer.jsp"></jsp:include> 		
 	 		</div>
 	  </div> 	  