<%@page import="com.Fertilizer.hibernate.CreditNoteConversionBean"%>
<%@page import="com.Fertilizer.hibernate.creditnotebean"%>
<%@page import="com.Fertilizer.dao.creditnoteDao"%>
<%@page import="com.Fertilizer.hibernate.purchaseReturnBean"%>
<%@page import="com.Fertilizer.dao.purchaseReturnDao"%>
<%@page import="com.Fertilizer.dao.GoodsReceiveDao"%>
<%@page import="com.Fertilizer.hibernate.GoodsReceiveBean"%>
<%@page import="java.util.List" %>
<%@page import="com.Fertilizer.hibernate.SupplierDetailsBean"%>
<%@page import="com.Fertilizer.dao.SupplierDetailsDao"%>

<%boolean isHome = false;%>
<%@include file="commons/header.jsp"%>
<head>
<meta charset="utf-8">

	<!-- The jQuery library is a prerequisite for all jqSuite products -->
    <script type="text/ecmascript" src="Shop/staticContent/js/jquery.min.js"></script> 
    
    <!-- This is the Javascript file of jqGrid -->   
    <script type="text/ecmascript" src="Shop/staticContent/js/trirand/jquery.jqGrid.min.js"></script>
    
    <!-- This is the localization file of the grid controlling messages, labels, etc.
    <!-- We support more than 40 localizations -->
    <script type="text/ecmascript" src="Shop/staticContent/js/grid.locale-en.js"></script>
    
    <!-- A link to a jQuery UI ThemeRoller theme, more than 22 built-in and many more custom -->
    <link rel="stylesheet" type="text/css" media="screen" href="/Shop/staticContent/css/jquery-ui.css" />
    
    <!-- The link to the CSS that the grid needs -->
    <link rel="stylesheet" type="text/css" media="screen" href="/Shop/staticContent/css/trirand/ui.jqgrid.css" />
    
     <script type="text/javascript" src="/Shop/staticContent/js/jquery-1.12.3.min.js"></script>
	 <link rel="stylesheet" href="/Shop/staticContent/css/jquery-ui.min.css">
     <link rel="stylesheet" href="/Shop/staticContent/css/ui.jqgrid.min.css">
    
     <link rel="stylesheet" href="/Shop/staticContent/y_css/jquery-ui.css">
     <link rel="stylesheet" href="/Shop/staticContent/css/ui.jqgrid.css">
     
     <script type="text/javascript" src="/Shop/staticContent/js/jquery.min.js"></script>
     <script type="text/javascript" src="/Shop/staticContent/js/jquery-ui-min.js"></script>
     <script type="text/javascript" src="/Shop/staticContent/js/jquery-ui.js"></script>
     <script type="text/javascript" src="/Shop/staticContent/js/jqueryUi.js"></script>
     <script type="text/javascript" src="/Shop/staticContent/js/jquery.jqgrid.min.js"></script>
     <script type="text/javascript" src="/Shop/staticContent/js/bootstrap.js"></script>
     <script type="text/javascript" src="/Shop/staticContent/js/bootbox.min.js"></script>
    
     <script type="text/javascript" src="/Shop/staticContent/js/purchaseReturn.js"></script>
        
     <script type="text/javascript">
     function cancle(){
    		location.reload()
    	}
    </script>
    <style>
.btn-default,.btn-primary,.btn-success,.btn-info,.btn-warning,.btn-danger
 {
    border-radius:23px;
}


</style>
</head>
 	 <div class="row header_margin_top">
			    <div align="center">
			  		<h2 class="form-name style_heading">Purchase Return</h2>
			  			 		
			  	</div>	 
    </div>
    
     <div class="row">
		     <div class="col-sm-offset-1 col-md-10">
				  		<hr style="border-top-color:#c1b1b1;">
				  		
		     </div>	
    </div>
    <div class="container col-sm-offset-1">
     
        <!---------------------------------------- Purchase Return and Credit Note Conversion Button -------------------------------------->
    
    <div class="row">
	        <div class="col-md-6 col-md-offset-">
                  <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 " >
                
					<ul class="nav nav-tabs">
						<li class="active" style="padding-left:4%;margin-left: -60px;"><a data-toggle="tab" href="#purchaseReturn" style="border-radius:23px;">	<h4>Purchase Return</h4></a></li>
						<li><a data-toggle="tab" href="#creditNoteConversion" style="border-radius:23px;">	<h4>Credit Note Conversion </h4></a></li>
					</ul>
					
				</div>
		   </div>	 
	</div>   
		<div class="tab-content" style="float: left; padding-top:2%">
		
		<!------------------------------------------------------ Purchase Return ------------------------------------------------------->
		
   <div id="purchaseReturn" class="tab-pane fade in active">
   
   						<%
								Long pReturnNo = 1l;
						%>
						<%
						
						    purchaseReturnDao dao = new purchaseReturnDao();
							          List pretNo = dao.getPurchaseReturnId(request);
								

								for (int i = 0; i < pretNo.size(); i++) {
									
									purchaseReturnBean bean = (purchaseReturnBean) pretNo.get(i);
									pReturnNo = bean.getPurchaseReturnNo();
									pReturnNo++;
							 
							}  
						%>
   
   						 <div align="right">
								<h3 style="color: red; position: absolute; right: 125px; top: 175px;">
								P. Return No ::
								<%
									out.println(pReturnNo);
								%>
								</h3>
						</div>
                      
    <form class="form-horizontal" method="post" action="" name="percRet">
    <fieldset>
    						
   <div class="container" style="padding-top:1%;">
			 	
				<div class="row form-group">
           				 <label class="col-md-3 control-label" for="supplier">Supplier Name<sup>*</sup></label>  
          					  <div class="col-md-3">
								<div class="input-group">
									<span class="input-group-addon">
										<i class="	glyphicon glyphicon-user"></i>
									</span>
									
							<!-- Following code is to get Supplier from "supplier_details" table of "fertilizer" DB -->
							<!-- getAllSupllier() is implemented in  SupplierDetailsDao with return type List-->
						
							<%
								SupplierDetailsDao sdd = new SupplierDetailsDao();
           						List sList =sdd.getAllSupplier(request);
							%>
							
							<input list="sup_drop" id="supplier" placeholder="Supplier Name" name="supplier" required="required" class="form-control" onchange="getAllBills()">
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
            
           				    <label class="col-md-2 control-label" for="bill_no"> Bill No<sup>*</sup> </label>  
          					  <div class="col-md-3">
								<div class="input-group">
									<span class="input-group-addon">
										No
									</span>
           		 					
           		 					<select class="form-control input-md" value="Bill Number" required="required" id="bill_no" 
           		 					        name="bill_no" onchange="fetchDataForPurchase()">
           		 					
           		 					</select>
           						 </div>
							</div>
						  </div> 
	
        </div>
        <div class="container">
             <div class="row form-group" style="margin-left: -123px;" >
           		<table id="jqGrid" ></table>
				<div id="jqGridPager"></div>
            </div>
          </div>   
            <div class="form-group row" style="padding-top:2%">
            	<div class="col-md-6 col-md-offset-3 text-center">
            		            		
            		<input type="button" id="btn" style="weight:53px; width:128px;font-size: 25" class="btn btn-success" name="btn"
            			   onclick=" purchaseReturnTable(); returntPurchase(); returntMinusFromStockPurchase();" value="Submit">
            		
		            <input type="button" id="btn1" style="weight:53px; width:128px;font-size: 25" class="btn btn-danger   " name="btn1" value="Cancel" onclick="cancle()">
           		</div>
          	</div>
		</fieldset>
       </form>
    </div>
    
    <!-------------------------------------------------- Credit Note Conversion ------------------------------------------------------->
    
    <div id="creditNoteConversion" class="tab-pane">
    
    		            <%
								Long creditConvTransId = 1l;
						%>
						<%
						
						            creditnoteDao crdao = new creditnoteDao();
							        List cretNo = crdao.getCreditConvReturnId(request);
								

								    for (int i = 0; i < cretNo.size(); i++) {
									
								    CreditNoteConversionBean bean = (CreditNoteConversionBean) cretNo.get(i);
								    creditConvTransId = bean.getTransNoForCreditConversion();
								    creditConvTransId++;
							 
							}  
						%>
    
                        <div align="right">
								<h3 style="color: red; position: absolute; right: 125px; top: 175px;">
								Transaction ID ::
								<%
									out.println(creditConvTransId);
								%>
								</h3>
						</div>
    
    <form class="form-horizontal" method="post" action="" name="creditNote">
          <fieldset>
   <div class="container" style="padding-top:1%;">
			 	
				<div class="row form-group">
           				 <label class="col-md-3 control-label" for="supplier">Supplier Name<sup>*</sup></label>  
          					  <div class="col-md-3">
								<div class="input-group">
									<span class="input-group-addon">
										<i class="	glyphicon glyphicon-user"></i>
									</span>
									
							<!-- Following code is to get Supplier from "supplier_details" table of "fertilizer" DB -->
							<!-- getAllSupllier() is implemented in  SupplierDetailsDao with return type List-->
						
							<%
								SupplierDetailsDao sdd1 = new SupplierDetailsDao();
           						List sList1 =sdd1.getAllSupplier(request);
							%>
							
							<input list="sup_drop11" id="creditConvsupplier" placeholder="Supplier Name" name="creditConvsupplier" required="required" class="form-control" onchange="getAllBillsNoForCreditConver()">
				            <datalist id="sup_drop11">
							<%
					           for(int i=0;i<sList1.size();i++){
					        	   SupplierDetailsBean sup =(SupplierDetailsBean)sList1.get(i);
							%>
							<option data-value="<%=sup.getSupId()%>" value="<%=sup.getDealerName() %>">
							<%
				      			}
				    		%>
						</datalist>           	
					</div>
           		</div>
           				    <label class="col-md-2 control-label" for="bill_no"> Bill No<sup>*</sup> </label>  
          					  <div class="col-md-3">
								<div class="input-group">
									<span class="input-group-addon">
										No
									</span>
									
           		 					<select class="form-control input-md" required="required" id="bill_no1" name="bill_no1" onchange="fetchDataForCreditNoteConversion();getPurchaseReturnTotal();"></select>
           						 </div>
							</div>
						  </div> 
						  <div class="row form-group">
				<label class="col-md-3 control-label" for="Cr_Conversion_No"> Cr.Conversion No<sup>*</sup>
				</label>
				<div class="col-md-3">
					<div class="input-group">
						<span class="input-group-addon"> 
						<i class="	glyphicon glyphicon-hand-right"></i>
						</span>

						<input type="text"  id="Cr_Conversion_No" class="form-control" placeholder="Credit Conversion No"> 
					</div>
				</div>
			</div>
	
        </div>
         <div class="container">
           <div class="row form-group" style="margin-left: -134px;">
			<table id="jqGridCrCon"></table>
			<div id="jqGridPagerCrCon"></div>
		</div>
       </div>
             <label class="col-md-3 col-md-offset-5 control-label" for="bill_no">Total Purchase Return Amt.</label>
		<div class="col-md-3">
			
				<div class="input-group">
						<span class="input-group-addon"> Rs </span> 
						<input id="purchaseReturnAmt" name="purchaseReturnAmt" placeholder="Purchase Return Amount" class="form-control input-md" type="text" readonly="readonly">
				</div>
		</div>
             
             <label class="col-md-3 col-md-offset-5 control-label" for="bill_no" style="padding-top: 17px;"> Total </label>
		<div class="col-md-3" style="padding-top: 8px;">
			
				<div class="input-group">
						<span class="input-group-addon"> Rs </span> 
						<input id="crnotetotal" name="total" placeholder="Total" class="form-control input-md" type="text" readonly="readonly">
				</div>
		</div>
		
		<label class="col-md-8 control-label" for="grossTotal" style="padding-top: 25px;">Gross Total</label>
	<div class="col-md-3" style="padding-top: 8px;">
				
				<div class="input-group">
						<span class="input-group-addon"> Rs </span> 
						<input readonly="readonly" id="CrCongrossTotal" name="grossTotal" placeholder="Gross Total" class="form-control input-md" type="text" style="font-size: 25px;height: 55px;background: #ffe10061;">
				</div>
	</div>
             
            <div class="form-group row" style="padding-top:14%">
            	<div class="col-md-6 col-md-offset-3 text-center">
                    <input type="button" id="btn"  style="weight:53px; width:128px;font-size: 25" class="btn btn-success" name="btn"  value="Print" onclick=" CrNoteConvertionVlidation()" >
            		<input type="button" id="btn1" style="weight:53px; width:128px;font-size: 25" class="btn btn-danger"  name="btn1" value="Cancel" onclick="cancle()">
           		</div>
          	</div>
		</fieldset>
       </form>    
    </div>
    </div>
     </div>
<jsp:include page="commons/footer.jsp"></jsp:include>