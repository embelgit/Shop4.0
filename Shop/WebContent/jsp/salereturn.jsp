<%@page import="com.Fertilizer.dao.PesticideBillDao"%>
<%@page import="com.Fertilizer.hibernate.PesticideBillBean"%>
<%@page import="com.Fertilizer.hibernate.SeedPesticideBillBean"%>
<%@page import="com.Fertilizer.dao.SeedPesticideBillDAO"%>
<%@page import="com.Fertilizer.dao.FertilizerBillDao"%>
 <%@page import="com.Fertilizer.hibernate.FertilizerBillBean"%>
 <%@page import="com.Fertilizer.dao.CustomerDetailsDao"%>
 <%@page import="com.Fertilizer.hibernate.CustomerDetailsBean"%>
 <%@page import="java.util.Date"%>
 <%@page import="java.text.SimpleDateFormat"%>
 
 <%@page import="java.util.List" %>


<% boolean isHome=false;%>
<%@include file="commons/header.jsp"%>
<head>
<meta charset="utf-8">

       <script type="text/javascript" src="/Shop/staticContent/js/jquery-1.12.3.min.js"></script>
     <!--  <script type="text/javascript" src="/Shop/staticContent/js/jquery-1.11.1.min.js"></script> -->
	 <link rel="stylesheet" href="/Shop/staticContent/css/jquery-ui.min.css">
     <link rel="stylesheet" href="/Shop/staticContent/css/ui.jqgrid.min.css">
    
     
     <link rel="stylesheet" href="/Shop/staticContent/y_css/jquery-ui.css">
     <link rel="stylesheet" href="/Shop/staticContent/css/ui.jqgrid.css">
     <script type="text/javascript" src="/Shop/staticContent/js/jquery.min.js"></script>
     <!-- <script type="text/javascript" src="/Shop/staticContent/js/jquery-ui-min.js"></script> -->
     
      <script type="text/javascript" src="/Shop/staticContent/js/jquery-ui.min.js"></script>
     <script type="text/javascript" src="/Shop/staticContent/js/jquery-ui.js"></script>
     <script type="text/javascript" src="/Shop/staticContent/js/jqueryUi.js"></script>
     <script type="text/javascript" src="/Shop/staticContent/js/jquery.jqgrid.min.js"></script>
     
     <script type="text/javascript" src="/Shop/staticContent/js/bootstrap.js"></script>
<script type="text/javascript" src="/Shop/staticContent/js/bootbox.min.js"></script>
    
     <script type="text/javascript" src="/Shop/staticContent/js/fertiSaleReturn.js"></script>
     
 <link rel="stylesheet" href="/Shop/staticContent/css/shopstyle.css">   
     
     <script type="text/javascript">
     function cancle(){
 		location.reload()

 		}
     
      function pageLoad(){	
    		$("#CashCustDetail").show();
    		$("#CreditCustDetail").hide(); 	
    }
     
    /*  $('#bill_no').on('change','input', function() { 
    	 fetchDataForSale();  // get the current value of the input field.
    	}); */
     
     function openCashCustomerBilling() {
    		$("#CashCustDetail").show();
    		$("#CreditCustDetail").hide();
    		location.reload();
    	}
     
     function openCreditCustomerBilling() {
    		$("#CreditCustDetail").show();
    		$("#CashCustDetail").hide();
    	}
     
    /*  $(document).on('change', 'input', function(){
    	 getAllSaleReturnBills();
    	}); */
     
     /* $(document).on('change', 'select', function(){
    	 fetchDataForSale();
    	}); */
     
     </script>
     
     <%
	  		HttpSession session1 = request.getSession();
		  	String shop1234 = (String) session1.getAttribute("shopName");
		  	
		  	String shopN = shop1234.substring(4);
		  	String shopId = String.valueOf(shop1234.charAt(0));
		  	System.out.println("This is shop id === "+shopId);
		  	String shopName1 = shopN.trim();
	  		HttpSession session2 = request.getSession();
		  	session2.setAttribute("shopId", shopId);
		  	
		  	String pattern = "yyyy-MM-dd";
		  	SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);

		  	String todayDate = simpleDateFormat.format(new Date());
		  	System.out.println(todayDate);
	  	%>
<style>
.container-fluid {
	overflow: hidden;
}
</style>     

</head>
<body onload="pageLoad();">
<div class="container-fluid">
	
	<div class="row header_margin_top">
		<div align="center">
			<h2 class="form-name style_heading">Sale Return</h2>
		</div>
	</div>
    
    <div class="row" align="center">
		<div class="hr-width">
			<hr class="style-one">
		</div>	
    </div>
    
  	<div style="float: none;"></div>

                                           
	<div id="home">
  		 <form class="form-horizontal" method="post" action="">
         	 <fieldset>
         	 <div class="container">
             	<div class="row form-group">
           	 		<div class="col-md-6">
              			<%@include file="commons/clock.jsp" %>
           		 	</div>
				</div>
				
		 <!----------------------------------------- Cash and Credit Button --------------------------------------------> 		
				
		<!--  <div class="container-fluid col-md-offset-3">   
            <div class="row" style="padding-left:2%">
                    <div class="col-md-4">
                    <div class="col-6 col-sm-6 col-md-12 col-lg-12 col-xl-12" style="background-color:">
					<ul  class="nav nav-tabs">
						<li class="active" style="padding-left:2%"><a data-toggle="tab" id="customertype" onclick="openCashCustomerBilling()" href="#supplierSingleDate">
						<h4> Cash </h4></a></li>
						<li><a data-toggle="tab" href="#supplierBetweenTwoDate" id="customertype" onclick="openCreditCustomerBilling()">
						<h4> Credit </h4></a></li>

					</ul>
					</div>
					</div>
					</div>   --> 
				
		<!--  <div class="container col-md-offset-4 "  >
	        <input type="button" id="customertype" style="font-size:16; width:79px; height:30px" class="btn  btn-default " name="customertype" value="Cash" href="#supplierSingleDate"  onclick="openCashCustomerBilling()" >
		    <input type="button" id="customertype" style="font-size:16; width:79px; height:30px" class="btn  btn-default " name="customertype" value="Credit"  href="#supplierBetweenTwoDate" onclick="openCreditCustomerBilling()">
		</div>  -->
				 <!-- <div class="row form-group">
         		<div class="col-md-3 control-label">
         		<label  for="customertype" style="float:right">Customer Type<sup>*</sup></label>
         		</div>	
         			<div class="col-md-3">
						<div class="col-xs-6 ">									
						<input type="radio" name="customertype" id="customertype" checked="checked" onclick="openCashCustomerBilling()" style=" width:  20px; height:  20px; ">
							<label class="radio-inline" style=" MARGIN-TOP: -15PX; FONT-WEIGHT: 700;padding: 0px;">
								Cash
							</label>
						</div>	
      					<div class="col-xs-6 col-md-ffset-1 ">	
						<input  type="radio" name="customertype" id="customertype" onclick="openCreditCustomerBilling()" style=" width:  20px; height:  20px;">
							<label class="radio-inline" style=" MARGIN-TOP: -15PX; FONT-WEIGHT: 700;padding: 0px;">
								Credit
							</label>									     				
						</div>
              		</div>
           </div> -->
           
           </div>
           </fieldset>
           </form>
           </div>
           
				<!------------------------------------------------ Sale Return -------------------------------------------------->
				
<div id="CashCustDetail" style="padding-top:2%">
  
     <form class="form-horizontal" method="post" action="" name="fertiBill">
			<!-- <fieldset> -->
			<div class="shopform-margin">	
			<div class="row">
				<div class="form-group">
					<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
						<label class="control-label" for="customerType">Customer Type<sup>*</sup></label>  
           			</div>
           			<div class="col-lg-3 col-md-3 col-sm-8">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-user"></i>
							</span>
							<select class="form-control" id="customerType" onchange="getAllcustomerName()">
								<option value="selected">--Select Customer Type--</option>
								<option value="cash">Cash</option>
								<option value="credit">Credit</option>
							</select> 
           		 		</div>
					</div>	
					<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">
                 		<label class="control-label" for="billNo">Bill No <sup>*</sup></label>  
            		</div>	
            		<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
						<div class="input-group">
							<span class="input-group-addon">
								<span class="glyphicon nogyphicon">No</span>
							</span>
							<input list="billno_drop"  placeholder="Select Bill No" class="form-control input-md"
								       id='billNo' name="billNo" onchange="getProductDetailsByBillNo()">
						    <datalist id="billno_drop"></datalist>
						</div>
            		</div>
         		 </div>
         	</div>
         	 
         		<div class="table-responsive row" align="center" style="margin-left: 20px;" >
				   <table id="jqGrid"></table>
				   <div id="jqGridPager"></div>
		  		</div>
		  		
            <div class="row">
				<div class="form-group">	
					<div class="col-lg-offset-6 col-md-offset-6 col-lg-2 col-md-2 col-sm-4">
						<label class="control-label" for="grossTotal">Gross Total</label>  
			        </div>   	
			        <div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
						<div class="input-group">
							<span class="input-group-addon">
								<span class="glyphicon nogyphicon">Rs</span>
							</span>
	              			<input readonly="readonly" id="grossTotal" name="grossTotal" placeholder="Gross Total" class="form-control input-md" type="text" style="font-size: 25px;  height: 55px;">
	            		</div>
	            	</div>
            	</div>
         	</div>
         	
         </div>
         <!--  </fieldset> -->
         		  </form>
         		  
         		<div class="row buttons-margin" align="center">
            		<input type="button" id="save" name="save" class="btn btn-success" value="Submit" onclick="saleReturnVal()">
			        <input type="button" id="btn1" name="btn1" class="btn btn-danger" value="Cancel" onclick="cancle()">
	          	</div>         
         		 
         		  </div> 
         		 
         		  </div>
         		  
         	<!--------------------------------------------- Credit customer ------------------------------------------------------>
         		  
    <%--  <div id="CreditCustDetail" style="padding-top:2%">
       	<form class="form-horizontal" method="post" action="" name="creditFertiBill1">
			<fieldset>
         		  
         <div class="row form-group">
			<label class="col-md-3 control-label" for="creditCustomerName"> Customer Name <sup>*</sup></label>  
           			 <div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-user"></i>
							</span> 
			      
							<%
							    CustomerDetailsDao dao = new CustomerDetailsDao();
           						List cust =dao.getAllCustomer();
							
							%>
							
							<input type="text" id="creditCustomer" list="cust_drop1" placeholder="Credit Customer Name" class="form-control" onchange="getAllBill()">
							<datalist id="cust_drop1">
							
							<%
					           for(int i=0;i<cust.size();i++){
					        	   CustomerDetailsBean bean =(CustomerDetailsBean)cust.get(i);
							%>
							<option data-value="<%=bean.getCustId()%>"><%=bean.getFirstName() %> <%=bean.getLastName() %> </option>
							
							<%
				      			}
				    		%> 
						</datalist>
						
						</div>
					</div>
         		           		  
         		   <div class="row form-group">
           			 <label class="col-md-2 control-label" for="billNo">Bill No</label>  
            			<div class="col-md-3">
							<div class="input-group " ">
								<span class="input-group-addon">
									No
								</span>
						
              					<input  list="creditBillNoDrop"  id="creditBillNo" class="form-control" placeholder="Select Credit Bill No" onchange="fetchDataForSaleCredit()" >
				                <datalist id="creditBillNoDrop" style="overflow-x: hidden; overflow: scroll; width: 100%; height:500px">
						
					        	</datalist> 
            				</div>
            			</div>
         		  </div>
         		
           <div class="row form-group" style="padding-left: 50px;padding-top:2%" align="center">
           		<table id="jqGridCredit" ></table>
				<div id="jqGridPagerCredit"></div>
            </div>
           		<div class="form-group row" style="padding-top:2%">
            		<div class="col-md-6 col-md-offset-3 text-center" >
              			 <input type="button" id="save" name="save" style=" height: 53px; width: 128px; font-size: 25"class="btn btn-success " onclick="saleReturn1()" value="Submit">
		            	 <input type="button" id="btn1" style=" height: 53px; width: 128px; font-size: 25" class="btn  btn-danger   " name="btn1" value="Cancel" onclick="cancle()">
          	  		</div>
         		 </div>       	    
         	 </fieldset>
          </form>
          </div> --%>	
          
</div>		
</body>	
<jsp:include page="commons/footer.jsp"></jsp:include>