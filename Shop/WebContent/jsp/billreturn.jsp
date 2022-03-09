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
	  		<h2 class="form-name style_heading">Bill Cancel</h2>
	  	</div>
	</div>
	
	<div class="row" align="center">
		<div class="hr-width">
			<hr class="style-one">
		</div>	
    </div>
    
  	<div style="float: none;"></div>

                                           
	<div id="home">
         	 <div class="container">
<!--   		 <form class="form-horizontal" method="post" action="">
         	 <fieldset> -->

                 <div class="row form-group">
           	 		<div class="col-md-6">
              			<%@include file="commons/clock.jsp" %>
           		 	</div>
				</div>
				
           </div>
           <!-- </fieldset>
           </form> -->
           <!-- </div> -->
           
				<!------------------------------------------------ Sale Return -------------------------------------------------->
				
<div id="CashCustDetail">
  
     <form class="form-horizontal" method="post" action="" name="fertiBill">
			<fieldset>
				<div class="shopform-margin">
			<div class="row">
				<div class="form-group">
					<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
						<label class="control-label" for="customerType">All Bill No<sup>*</sup></label>  
           			</div>
           			<div class="col-lg-3 col-md-3 col-sm-8">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-user"></i>
							</span>
							
							<%
							CustomerDetailsDao dao = new CustomerDetailsDao();
           						List cust = dao.getAllbills(request);
							%>
							<input type="text" id="billNo" list="billno_drop" placeholder="Select Bill No" class="form-control">
							                                                                                     
							                                                                                     <!-- onchange="getProductBillNo()"  -->
							                                                                                                     
				         	<datalist id="billno_drop">
							<%
					           for(int i=0;i<cust.size();i++){
					        	   FertilizerBillBean bean =(FertilizerBillBean)cust.get(i);
							%>
								<option data-value="<%=bean.getBillNo()%>"><%=bean.getBillNo()%></option>
							<%
				      			}
				    		%>
							</datalist>

           		 		</div>
					</div>	
				
                 <!-- <div class="row form-group"> -->
           			<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">	
           				<label class="control-label" for="billNo">Today's Bill No <sup>*</sup></label>  
            		</div>
            		<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
						<div class="input-group " ">
							<span class="input-group-addon">
								<span class="glyphicon nogyphicon">No</span>
							</span>
													
					
												<%
							CustomerDetailsDao daoo = new CustomerDetailsDao();
           						List custt = daoo.getAllbilltoday(request);
							%>
							<input type="text" id="billNoo" list="billno_dropp" placeholder="Select Bill No" class="form-control">
							                                                                                     
							                                                                                     <!-- onchange="getProductBillNo()"  -->
							                                                                                                     
				    	     <datalist id="billno_dropp">
							<%
					           for(int i=0;i<custt.size();i++){
					        	   FertilizerBillBean bean =(FertilizerBillBean)custt.get(i);
							%>
								<option data-value="<%=bean.getBillNo()%>"><%=bean.getBillNo()%></option>
							<%
				      			}
				    		%>
							</datalist>
							
            			</div>
            		</div>
         		 </div>
         	</div>
         	 
         	 </div>
		  	</fieldset>
         		  </form>	
         		  
         		<div class="row buttons-margin" align="center">
            		<input type="button" id="save" name="save" class="btn btn-success" value="Submit" onclick="billReturnVal()">
			    	<input type="button" id="btn1" name="btn1" class="btn btn-danger" value="Cancel" onclick="cancle()">
	          	</div>         
	          	
         		 <!--  </div>  -->
         		  
         		  </div>
         		  </div>
         		  
         	<!--------------------------------------------- Credit customer ------------------------------------------------------>
         		  
</div>
	</body>
	
<jsp:include page="commons/footer.jsp"></jsp:include>