<%@page import="com.Fertilizer.hibernate.BankPaymentBean"%>
<%@page import="com.Fertilizer.dao.BankPaymentDao"%>
<%@page import="com.Fertilizer.hibernate.PartnerTransactionBeanH"%>
<%@page import="com.Fertilizer.hibernate.PartnerDetailsBeanH"%>
<%@page import="com.Fertilizer.bean.PartnerDetailsBean"%>
<%@page import="com.Fertilizer.dao.partnerDetailsDao"%>
<%@page import="com.Fertilizer.hibernate.ExpenditurePaymentBean"%>
<%@page import="com.Fertilizer.dao.creditnoteDao"%>
<%@page import="com.Fertilizer.hibernate.EmployeePaymentBean"%>
<%@page import="com.Fertilizer.dao.EmployeePaymentDao"%>
<%@page import="com.Fertilizer.hibernate.CustomerPaymentBean"%>
<%@page import="com.Fertilizer.dao.CustomerPaymentDao"%>
<%@page import="com.Fertilizer.hibernate.SupplierPaymentBean"%>
<%@page import="com.Fertilizer.dao.SupplierPaymentDao"%>
<%@page import="com.Fertilizer.hibernate.CategoryDetailsBean"%>
<%@page import="com.Fertilizer.dao.CategoryDetailsDao"%>
<%@page import="java.util.List"%>
<%@page import="com.Fertilizer.hibernate.SupplierDetailsBean"%>
<%@page import="com.Fertilizer.dao.SupplierDetailsDao"%>
<%@page import="com.Fertilizer.dao.CustomerDetailsDao" %>
<%@page import="com.Fertilizer.hibernate.CustomerDetailsBean" %>
<%@page import="com.Fertilizer.dao.EmployeeDetailsDao" %>
<%@page import="com.Fertilizer.hibernate.EmployeeDetailsBean" %>
<%@page import="com.Fertilizer.dao.ExpenditureDetailsDao"%>
<%@page import="com.Fertilizer.hibernate.ExpenditureDetailsBean" %>
<%@page import="com.Fertilizer.hibernate.creditnotebean"%>
<%@page import="com.Fertilizer.hibernate.BankDetailsBean"%>
<%@page import="com.Fertilizer.dao.BankPaymentDao"%>
<%@page import="com.Fertilizer.dao.ExpenditurePaymentDao"%>
<%@page import="java.text.SimpleDateFormat"%> 
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Date"%>

<%
	boolean isHome=false;
%>
<%@include file="commons/header.jsp"%>

<head>

	    <link rel="stylesheet" href="/Shop/staticContent/css/tabDemo.css">
	    <script type="text/javascript" src="/Shop/staticContent/js/jquery-1.12.3.min.js"></script>
		<script type="text/javascript"  src="/Shop/staticContent/js/bootstrap.min.js"></script>	
		<link rel="stylesheet" href="/Shop/staticContent/css/bootstrap.min.css">
	    <script type="text/javascript" src="/Shop/staticContent/js/bootstrap.js"></script>
	    <script type="text/javascript" src="/Shop/staticContent/js/bootbox.min.js"></script>
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
		
	    <script src="/Shop/staticContent/js/cashbankbook.js"></script>
	    <script src="/Shop/staticContent/js/creditnotegeneration.js"></script>
<link rel="stylesheet" href="/Shop/staticContent/css/shopstyle.css">	    
<style>
.container-fluid {
	overflow: hidden;
}
h4 {
	margin-top: 0px;
	margin-bottom: 0px;
}
</style>

<script type="text/javascript">
function suplist(){
	window.location = "supplierpaymentlist.jsp";
}
function custlist(){
	window.location = "custpaymentlist.jsp";
}
function emplist(){
	window.location = "emppaymentlist.jsp";
}
function expenlist(){
	window.location = "expenpaymentlist.jsp";
}
function partnerlist(){
	window.location = "partnerpaymentlist.jsp";
}
function banklist(){
	window.location = "bankpaymentlist.jsp";
}
function creditlist(){
	window.location = "creditpaymentlist.jsp";
}
</script>

</head>
 <!-- <script type="text/javascript">
			function changeTotalAmtAndBalanceAmt()
			{
				var totalAmt = document.getElementById('totalAmount');
			    var balanceAmt = document.getElementById('balanceAmount');			    
				totalAmt = "Total Amount";
				balanceAmt = "Balance Amount";
			}
</script> -->

		<%
			        HttpSession session1 = request.getSession();
				  	String shop1234 = (String) session1.getAttribute("shopName");
				  	String shopN = shop1234.substring(1);
				  	String shopId = String.valueOf(shop1234.charAt(0));
				  	System.out.println("This is shop id === "+shopId);
				  	String shopName1 = shopN.trim();
			  		HttpSession session2 = request.getSession();
				  	session2.setAttribute("shopId", shopId);
		%>
        
        <%
                	String salary = "";
       				String pattern = "yyyy-MM-dd";
	  				SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);

	  				String todayDate = simpleDateFormat.format(new Date());
	  				System.out.println(todayDate);
        %>
        
<body>
	<div class="container-fluid">
	
<div class="" style="min-height:300px;">
    <div  class="">
        <!-- <h3>Left Tabs</h3>
        <hr/> -->
        <div class="cashbooktabs">
            <!-- required for floating -->
            <!-- Nav tabs -->
            <ul class="nav nav-tabs ">
                <li class="active"><a href="#home" data-toggle="tab">Supplier Transaction</a></li>
                <li><a href="#profile" data-toggle="tab">Customer Transaction</a></li>
                <li><a href="#messages" data-toggle="tab">Employee Transaction</a></li>
                <li><a href="#settings" data-toggle="tab">Expenditure Transaction</a></li>
                <li><a href="#partnerCashbook" data-toggle="tab">Partner Transaction</a></li>
                <li><a href="#bankCashbook" data-toggle="tab">Bank Transaction</a></li>
                <li><a href="#creditnotegeneration" data-toggle="tab">Credit Note Generation</a></li>
            </ul>
        </div>
        

        
        <input id="shopId" name="shopId" type="hidden" value="<%=shopId%>" readonly="readonly"/>
        
        <div class="">
            <!-- Tab panes -->
    <div class="tab-content">
    
<!------------------------------------------------- SUPPLIER PAYMENT Starts Here ------------------------------------------------->    	
    	<div class="tab-pane active" id="home">
       		<form class="form-horizontal" method="post" action="" name="spmt">
         		<div class="row">
			    	<div align="center">			    	
			  			<h2 class="form-name style_heading">Supplier Payment</h2>
			  		</div>
			  		
                     <%
 				     	        Long transactionIdSupp = 1l;
 				     		     
 				     			SupplierPaymentDao dao = new SupplierPaymentDao();
 				     			List trIdListSupp = dao.getLastTransactionNoforSupplier();
 				     			for(int i=0;i<trIdListSupp.size();i++)
 				     			{
 				     				SupplierPaymentBean st = (SupplierPaymentBean)trIdListSupp.get(i);
 				     				transactionIdSupp = st.getTransNoForSupplier();
 				     				transactionIdSupp++;
 				     			}
 				     %> 
	  		
			  		<div align="right">
						<h3 class="cashbooktransaction">
								Transaction ID ::
								<%
									out.println(transactionIdSupp);
								%>
						</h3>
					</div>
			
			    <div class="row" align="center">
					<div class="hr-width">
						<hr class="style-one">
					</div>	
			   	</div>
		    </div>
		    
		   <div class="shopform-margin"> 
		    <div class="row">
           		<div class="form-group">
           			<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
           				<label class="control-label" for="supplier">Supplier Name<sup>*</sup></label>  
          			</div>
          			<div class="col-lg-3 col-md-3 col-sm-8">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-user"></i>
							</span>
						
							<%
								SupplierDetailsDao sdd = new SupplierDetailsDao();
								List sList =sdd.getAllSupplier(request);
							%>
							
							<input list="sup_drop" id="supplier" onchange="bill.getAllBills()" placeholder="Select Supplier Name" class="form-control">
							<datalist id="sup_drop">
							
							<%
								for(int i=0;i<sList.size();i++){
								SupplierDetailsBean sup =(SupplierDetailsBean)sList.get(i);
							%>
		
								<option data-value="<%=sup.getSupId()%>" value="<%=sup.getDealerName()%>">
							<%
								}
							%>
							</datalist> 
						</div>
       				</div>
        	       <%-- <div class="row form-group">
           				 <label class="col-md-2 col-sm-offset-1 control-label" for="supplier">Supplier Name<sup>*</sup></label>  
          					  <div class="col-md-3">
								<div class="input-group">
									<span class="input-group-addon">
										<i class="	glyphicon glyphicon-hand-right"></i>
									</span>
									
							
										
							<!-- Following code is to get Supplier from "supplier_details" table of "fertilizer" DB -->
							<!-- getAllSupllier() is implemented in  SupplierDetailsDao with return type List-->
						
						
						<%
			SupplierDetailsDao sdd = new SupplierDetailsDao();
		
			Long TransNumber = fdao.getCurrentTransNumber();
			if(TransNumber == null)
			{
				TransNumber = 1l;
			}
			else
			{
				TransNumber+=1;
			}
		
			System.out.println("CUSTOMER TRANSACTION NUMBER JSP =====>  "+TransNumber);
		%>
						
							<%
								SupplierDetailsDao sdd = new SupplierDetailsDao();
           						List sList =sdd.getAllSupplier();
							
							%>
							
							<input list="sup_drop" id="supplier" onchange="bill.getAllBills()" class="form-control">
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
           		</div> --%>
 					
 					<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">           
           				<label class="control-label" for="bill_no">Bill No<sup>*</sup></label>  
          			</div>
          			<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
						<div class="input-group">
							<span class="input-group-addon">
								<span class="glyphicon nogyphicon">No</span>
							</span>
           		 			<select class="form-control input-md" id='billNo' name="billNo" onchange="bill.getTotalAmtByBills()"></select>
           				</div>
					</div>
				</div>
			</div> 
					
			<div class="row">
				<div class="form-group">
           			<div class="col-lg-offset-6 col-md-offset-6 col-lg-2 col-md-2 col-sm-4">
           				<label class="control-label" for="totalAmt"> Total Amount</label>  
           			</div>
           			<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
						<div class="input-group">
							<span class="input-group-addon">
								<span class="glyphicon nogyphicon">Rs</span>
							</span>
           				  	<input readonly="readonly" id="totalAmount" name="totalAmount" class="form-control" placeholder="Total Amount">
           				 </div>
					</div>
				</div>
			</div>	
						  
			<div class="row">
				<div class="form-group">
					<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
						<label class="control-label" for="personname">Accountant Name</label>  
			        </div>   		 
			        <div class="col-lg-3 col-md-3 col-sm-8">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-user"></i>
							</span>
									<%
								SupplierDetailsDao sdd1 = new SupplierDetailsDao();
								List sList1 =sdd1.getAllaccount(request);
							%>
							
							<input list="personname_drop" id="personname"  placeholder="Select Accountant Name" class="form-control">
							<datalist id="personname_drop">
							
							<%
								for(int i=0;i<sList1.size();i++){
									EmployeeDetailsBean sup =(EmployeeDetailsBean)sList1.get(i);
							%>
		
								<option data-value="<%=sup.getEmpId()%>" value="<%=sup.getFirstName()%>  <%=sup.getMiddleName()%>  <%=sup.getLastName()%>">
							<%
								}
							%>
							</datalist> 
									
<!-- 			           		   <input id="personname" name="personname" placeholder="Accountant Name" class="form-control input-md" type="text"> -->
			           	</div>
					</div>
					<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">
						<label class="control-label" for="balanceAmt"> Balance Amount</label>  
           			</div>
           			<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
						<div class="input-group">
							<span class="input-group-addon">
								<span class="glyphicon nogyphicon">Rs</span>
							</span>
           				  	<input readonly="readonly" id="balanceAmount" name="balanceAmount" class="form-control" placeholder="Balance Amount">
           				</div>
					</div>
		  		</div>				
	       	</div>

	 		<div class="row">
				<div class="form-group">
					<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
						<label class="control-label" for="paymentMode"> Payment Mode</label>  
	           		</div>
	           		<div class="col-lg-3 col-md-3 col-sm-8">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-usd"></i>
							</span>
	           				<select class="form-control" id="paymentMode">
                                   <!-- <option value="selected">-Select Type-</option> -->
								<option value="cash">Cash</option>
								<option value="cheque">Cheque</option>
								<option value="card">Card</option>
								<option value="neft">NEFT</option>
								<option value = "UPI Payment">UPI Payment</option>
							</select>	
	           			</div>
					</div>
					<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">
						<label class="control-label" for="saleDate">Sale Date</label>  
          			</div>
          			<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-calendar"></i>
							</span>									
	              		  	<input type="date" id="supDate" name="supDate" value="<%=todayDate%>" placeholder="Date" class="form-control input-md">
						</div>
					</div>
	
	<script>
		
		$(document).ready(function(){
	  		 $("#paymentMode").change(function(){
	       	$(this).find("option:selected").each(function(){
	           	if($(this).attr("value")=="cheque"){
	           	
	           	$("#cheque_no").show(); 
	           	
	           	$("#neft_acc_no").hide(); 
	           	$("#card_no").hide();
	           	}
	          	 else if($(this).attr("value")=="card"){
	           	
	          		$("#card_no").show(); 	
	          		
	          		$("#neft_acc_no").hide(); 
	        		$("#cheque_no").hide();
	           }
	          	 else if($(this).attr("value")=="neft"){
	                	
	           		$("#neft_acc_no").show(); 	
	           		
	           		$("#card_no").hide(); 
	        		$("#cheque_no").hide();
	            }
	          	 else if($(this).attr("value")=="cash"){
	             	
	            		$("#neft_acc_no").hide(); 
	            		$("#cheque_no").hide();
	            		$("#card_no").hide(); 
	             }
	           	
	          	else if($(this).attr("value")=="selected"){
	             	
	        		$("#neft_acc_no").hide(); 
	        		$("#cheque_no").hide();
	        		$("#card_no").hide(); 
	         }
	          
	       });
	   }).change();
		});	
		</script>
				
							<!-- <label class="col-md-3 control-label" for="credit">Credit<sup>*</sup></label>  
           						 <div class="col-md-3">
										<div class="input-group">
											<span class="input-group-addon">
												Rs
											</span>
           									   <input id="credit" name="credit" placeholder="Credit Amount" class="form-control input-md" type="text" onchange="" >
           							 </div>
								</div>	 -->
						
				</div>
			</div>  
						          
			<div class="row">
				<div class="form-group">
					<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
						<label class="control-label" for="paymentMode"> Payment Type</label>  
	           		</div>
	           		<div class="col-lg-3 col-md-3 col-sm-8">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-usd"></i>
							</span>
	           				<select class=" form-control" id="paymentType">
								<!-- <option value="selected">-Select Type--</option> -->
								<option value="credit">Credit - To Receive</option>
								<option value="debit">Debit - To Pay</option>
							</select>	
	           			</div>
					</div>
					<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">	
						<label class="control-label" for="balanceAmt"> Paid Amount <sup>*</sup></label>
					</div>	
					<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
						<div class="input-group">
							<span class="input-group-addon">
								<span class="glyphicon nogyphicon">Rs</span>
							</span>
	        			  	<input  id="supPay" name="supPay" class="form-control" placeholder="Enter Amount">
	        			</div>
					</div>
			    </div>	          
		    </div>
		    	
		    	<div class="row">

         				<div id="cheque_no">
         					<!-- <div class="col-md-2">										
							<label class="control-label" style="align:">Cheque No.:</label>
						</div> -->
							<div class="form-group">
								<div class="col-lg-offset-3 col-lg-3 col-md-offset-4 col-md-3 col-sm-offset-4 col-sm-8">	
									<div class="input-group">
										<span class="input-group-addon">
											<span class="glyphicon nogyphicon">Rs</span>
										</span>
										<input class="form-control" type="text" name="chequeNum" id="chequeNum" placeholder="Cheque No." />  
									</div>
								</div>
							</div>
						<!-- <div class="col-md-1">
							<label class="control-label">Date:</label>
						</div>
						<div class="col-md-3 first">	
							<input class="form-control" type="text" name="cdate" id="chequedate" placeholder="yyyy-mm-dd" />  
						</div> -->
						<!-- <div class="col-md-2">
							<label class="control-label">Name:</label>
						</div> -->
							<div class="form-group">
								<div class="col-lg-offset-3 col-lg-3 col-md-offset-4 col-md-3 col-sm-offset-4 col-sm-8">	
									<div class="input-group">
						     			<span class="input-group-addon">
											<i class="glyphicon glyphicon-user"></i>
						    			</span>
										<input class="form-control" type="text" name="nameOnCheck" id="nameOnCheck" placeholder="Name On check" />  
									</div>
								</div>
							</div>
						</div>
											
						<div id="card_no">
						<!-- <div class="col-md-2 ">
							<label class="control-label">Card No:</label>
						</div> -->
							<div class="form-group">
								<div class="col-lg-offset-3 col-lg-3 col-md-offset-4 col-md-3 col-sm-offset-4 col-sm-8">	
									<input class="form-control" type="text" name="cardNum" id="cardNum" placeholder="Card No." />  
								</div>
							</div>
						</div>
											
					<div id="neft_acc_no">
						<!-- <div class="col-md-2 ">
							<label class="control-label">Account No:</label>
						</div> -->
						<div class="form-group">
							<div class="col-lg-offset-3 col-lg-3 col-md-offset-4 col-md-3 col-sm-offset-4 col-sm-8">	
								<div class="input-group">
									<span class="input-group-addon">
										<span class="glyphicon nogyphicon">Rs</span>
									</span>
									<input class="form-control" type="text" name="accNum" id="accNum" placeholder="Account No." />  
								</div>
							</div>
						</div>
						<!-- <div class="col-md-2 ">
							<label class="control-label">Bank Name</label>
						</div> -->
						<div class="form-group">	
							<div class="col-lg-offset-3 col-lg-3 col-md-offset-4 col-md-3 col-sm-offset-4 col-sm-8">	
								<div class="input-group">
				                	<span class="input-group-addon">
						            	<i class="glyphicon glyphicon-home"></i>
				                	</span>
									<input class="form-control" type="text" name="bankName" id="bankName" placeholder="Name Of Bank" />  
								</div>
							</div>
						</div>
					</div>
				</div>
		
			</div>	
			          
			<div class="row buttons-margin" align="center">
			  	<input type="button" id="btn1111" name="btn1" class="btn btn-success" onclick="supplierPayment(); return false;" value="Submit">
		        <input type="reset" id="btn1" class="btn btn-danger" name="btn1" value="Cancel">
			 	<input type="button" value="List" id="listBtn" class="btn btn-primary" onclick="suplist()" />  
			</div>       	    
	</form>
  </div>
<!------------------------------------------------- SUPPLIER PAYMENT Ends Here ------------------------------------------------->


<!------------------------------------------------- CUSTOMER PAYMENT Starts Here ------------------------------------------------->         
                
     <div class="tab-pane" id="profile">
			<form class="form-horizontal" method="post" action="" name="cust">
	         	<div class="row">
				    <div align="center">
				  		<h2 class="form-name style_heading">Credit Customer Payment</h2>
				  	</div>
				 	
				 	<%
					 		Long transactionIdCust = 1l;
		 					CustomerPaymentDao data2 = new CustomerPaymentDao();
		 					List trIdListCust = data2.getCustPayLastTransactionNo();
		 					for(int i=0;i<trIdListCust.size();i++)
		 					{
		 						CustomerPaymentBean st = (CustomerPaymentBean)trIdListCust.get(i); 
		 						transactionIdCust = st.getTransNoForCustomer();
		 						transactionIdCust++;
		 						System.out.println("transactionIdCust ====> 12313213 "+transactionIdCust);
		 					}
				 	%>
				 	
				 	<div align="right">
						<h3 class="cashbooktransaction">
								Transaction ID ::
								<%
									out.println(transactionIdCust);
								%>
						</h3>
					</div>
				 	
				    <div class="row" align="center">
						<div class="hr-width">
					 		<hr class="style-one">
						</div>	
				   	</div>
			    </div>
			    
         <div class="shopform-margin">	       
			<div class="row">
           		<div class="form-group">
           			<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
           				 <label class="control-label" for="customerName">Customer Name<sup>*</sup></label>  
          			</div>
          			<div class="col-lg-3 col-md-3 col-sm-8">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-user"></i>
							</span>
						
							<%
								CustomerDetailsDao cdd = new CustomerDetailsDao();
								List cList =cdd.getAllCustomer(request);
							%>
						 	<input list="cust_drop" id="creditCustomer" placeholder="Select Customer Name" class="form-control" onchange="getBillByCustomer()">
							<datalist id="cust_drop">
									<!-- <input list="cust_drop" id="creditCustomer" class="form-control"> -->
							<%
								for(int i=0;i<cList.size();i++){
								CustomerDetailsBean cust =(CustomerDetailsBean)cList.get(i);
							%>
								<option data-value="<%=cust.getCustId()%>">
							<%=cust.getFirstName()%> <%=cust.getLastName()%></option>
							<%
								}
							%>
							</datalist> 
						</div>
       				</div>
       
          <%--  <label class="col-md-2 control-label" for="fk_cat_id0"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("productCat") %> <%}%> <%if(abc.equals("english")){%>Product Category<%}%><sup>*</sup></label>  
          			 <div class="col-md-3">
					<div class="input-group">
						<span class="input-group-addon">
							<i class="	glyphicon glyphicon-hand-right"></i>
						</span>
             				
						<!-- Following code is to get categories from "categories" table of "fertilizer" DB -->
						<!-- getAllMainCat() is implemented in  CategoryDetailsDao with return type List-->
						<%
						   CategoryDetailsDao cdd0 = new CategoryDetailsDao();
          						List cList0 =cdd0.getAllMainCat();
						
						%>
						<input list="cat_drop0" id="fk_cat_id0"  class="form-control" onchange="getBillByCustomer()">
			<datalist id="cat_drop0">
						<%
				           for(int i=0;i<cList0.size();i++){
				        	   CategoryDetailsBean cat0=(CategoryDetailsBean)cList0.get(i);
						%>
	
						<option data-value="<%=cat0.getCatId()%>" value="<%=cat0.getCategoryName()%>">
						<%
			      			}
			    		%>
		              	
           			</datalist>
           			</div>
           		</div> --%>
           			<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">
           		 		<label class="control-label" for="bill_no"> Bill No<sup>*</sup> </label>  
          			</div>
          			<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
						<div class="input-group">
							<span class="input-group-addon">
								<span class="glyphicon nogyphicon">No</span>
							</span>
           		 			<select class="form-control input-md" id='billNo1' name="billNo" onchange="getTotalAmountByBill()">
									</select>
           				</div>
					</div>
           		</div>
           	</div> 
						  
			<div class="row">
				<div class="form-group">
					<div class="col-lg-offset-6 col-md-offset-6 col-lg-2 col-md-2 col-sm-4">
						<label class="control-label" for="totalAmt">Total Amount</label>  
           			</div>
           			<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
						<div class="input-group">
							<span class="input-group-addon">
								<span class="glyphicon nogyphicon">Rs</span>
							</span>
           				    <input readonly="readonly" id="totalAmount1" name="totalAmount" class="form-control" placeholder="Total Amount">
           				</div>
					</div>
            	</div>
            </div>
						  
		<div class="row">
			<div class="form-group">			
				<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
					<label class="control-label" for="personname">Accountant Name</label>  
			    </div>
			    <div class="col-lg-3 col-md-3 col-sm-8">
					<div class="input-group">
						<span class="input-group-addon">
							<i class="glyphicon glyphicon-user"></i>
						</span>
									
						<%
								SupplierDetailsDao sdd2 = new SupplierDetailsDao();
								List sList2 =sdd2.getAllaccount(request);
							%>
							
						<input list="personname_drop1" id="personname1"  placeholder="Select Accountant Name" class="form-control">
						<datalist id="personname_drop1">
							
							<%
								for(int i=0;i<sList2.size();i++){
									EmployeeDetailsBean sup =(EmployeeDetailsBean)sList2.get(i);
							%>
		
							<option data-value="<%=sup.getEmpId()%>" value="<%=sup.getFirstName()%>  <%=sup.getMiddleName()%>  <%=sup.getLastName()%>">
							<%
								}
							%>
						</datalist> 
						
<!-- 			           		   <input id="personname1" name="personname" placeholder="Accountant Name" class="form-control input-md" type="text" > -->
			        </div>
				</div>   
				<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">
					<label class="control-label" for="balanceAmt"> Balance Amount</label>  
           		</div>
           		<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
					<div class="input-group">
						<span class="input-group-addon">
							<span class="glyphicon nogyphicon">Rs</span>
						</span>
           			 	<input readonly="readonly" id="balanceAmount1" name="balanceAmount" class="form-control" placeholder="Balance Amount">
           			</div>
				</div>
          	</div>
        </div>
        
       	<div class="row">
			<div class="form-group">	
				<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
					<label class="control-label" for="paymentMode"> Payment Mode</label>  
	           	</div>	
	           	<div class="col-lg-3 col-md-3 col-sm-8">
					<div class="input-group">
						<span class="input-group-addon">
							<i class="glyphicon glyphicon-usd"></i>
						</span>
	           			<select class="form-control" id="paymentMode1">
<!-- 							<option value="selected">-Select Type--</option> -->
							<option value="cash">Cash</option>
							<option value="cheque">Cheque</option>
							<option value="card">Card</option>
							<option value="neft">NEFT</option>
							<option value="UPI Payment">UPI Payment</option>
						</select>	
	           		</div>
				</div>
				<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">		
					<label class="control-label" for="saleDate">Payment Date</label>  
          		</div>	
          		<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
					<div class="input-group">
						<span class="input-group-addon">
							<i class="glyphicon glyphicon-calendar"></i>
						</span>									
	            	  	<input type="date" id="cusDate" name="cusDate" value="<%=todayDate%>" placeholder="Date" class="form-control input-md">
					</div>
				</div>					
	 <script>
		
		$(document).ready(function(){
	  		 $("#paymentMode1").change(function(){
	       	$(this).find("option:selected").each(function(){
	           	if($(this).attr("value")=="cheque"){
	           	
	           	$("#cheque_no1").show(); 
	           	
	           	$("#neft_acc_no1").hide(); 
	           	$("#card_no1").hide();
	           	}
	          	 else if($(this).attr("value")=="card"){
	           	
	          		$("#card_no1").show(); 	
	          		
	          		$("#neft_acc_no1").hide(); 
	        		$("#cheque_no1").hide();
	           }
	          	 else if($(this).attr("value")=="neft"){
	                	
	           		$("#neft_acc_no1").show(); 	
	           		
	           		$("#card_no1").hide(); 
	        		$("#cheque_no1").hide();
	            }
	          	 else if($(this).attr("value")=="cash"){
	             	
	            		$("#neft_acc_no1").hide(); 
	            		$("#cheque_no1").hide();
	            		$("#card_no1").hide(); 
	             }
	           	
	          	else if($(this).attr("value")=="selected"){
	             	
	        		$("#neft_acc_no1").hide(); 
	        		$("#cheque_no1").hide();
	        		$("#card_no1").hide(); 
	         }
	          
	       });
	   }).change();
		});	
		</script>
			</div>				
		</div>	          
			  
	
		<div class="row">
			<div class="form-group">	
				<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
					<label class="control-label" for="paymentMode"> Payment Type</label>  
	           	</div>	
	           	<div class="col-lg-3 col-md-3 col-sm-8">
					<div class="input-group">
						<span class="input-group-addon">
							<i class="glyphicon glyphicon-usd"></i>
						</span>
	           			<select class="form-control" id="paymentType1">
					<!--			<option value="selected">-Select Type--</option> -->
							<option value="credit">Credit - To Receive</option>
							<option value="debit">Debit - To Pay</option>
						</select>	
	           		</div>
				</div>
				<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">		
					<label class="control-label" for="balanceAmt"> Paid Amount<sup>*</sup></label>
				</div>	
				<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
		           	<div class="input-group">
			        	<span class="input-group-addon">
				       		<span class="glyphicon nogyphicon">Rs</span>
			            </span>
           			    <input id="custPay" name="custPay" class="form-control" placeholder="Enter Amount">
           		  	</div>
				</div>
			</div> 
		</div>
		
			<div class="row">
					<div id="cheque_no1" >
            							<!-- <div class="col-md-2">										
										<label class="control-label" style="align:">Cheque No.:</label>
									</div> -->
						<div class="form-group">				
							<div class="col-lg-offset-3 col-lg-3 col-md-offset-4 col-md-3 col-sm-offset-4 col-sm-8">	
								<div class="input-group">
									<span class="input-group-addon">
										<span class="glyphicon nogyphicon">No</span>
									</span>
									<input class="form-control" type="text" name="chequeNum" id="chequeNum1" placeholder="Cheque No." />  
								</div>
							</div>
						</div>		
									
									<!-- <div class="col-md-2">
										<label class="control-label">Name:</label>
									</div> -->
						<div class="form-group">
							<div class="col-lg-offset-3 col-lg-3 col-md-offset-4 col-md-3 col-sm-offset-4 col-sm-8">	
								<div class="input-group">
									<span class="input-group-addon">
										<i class="glyphicon glyphicon-user"></i>
									</span>
									<input class="form-control" type="text" name="nameOnCheck" id="nameOnCheck1" placeholder="Name On check" />  
								</div>
							</div>
						</div>
					</div>	
					
					<div id="card_no1">
												<!-- <div class="col-md-2 ">
													<label class="control-label">Card No:</label>
												</div> -->
						<div class="form-group">	
							<div class="col-lg-offset-3 col-lg-3 col-md-offset-4 col-md-3 col-sm-offset-4 col-sm-8">
								<input class="form-control" type="text" name="cardNum" id="cardNum1" placeholder="Card No." />  
							</div>
						</div>						
					</div>
					
					<div id="neft_acc_no1">
												<!-- <div class="col-md-2 ">
													<label class="control-label">Account No:</label>
												</div> -->
						<div class="form-group">
							<div class="col-lg-offset-3 col-lg-3 col-md-offset-4 col-md-3 col-sm-offset-4 col-sm-8">	
								<div class="input-group">
									<span class="input-group-addon">
										<span class="glyphicon nogyphicon">No</span>
									</span>
									<input class="form-control" type="text" name="accNum" id="accNum1" placeholder="Account No." />  
								</div>
							</div>
						</div>
												<!-- <div class="col-md-2 ">
													<label class="control-label">Bank Name</label>
												</div> -->
						<div class="form-group">
							<div class="col-lg-offset-3 col-lg-3 col-md-offset-4 col-md-3 col-sm-offset-4 col-sm-8">	
								<div class="input-group">
									<span class="input-group-addon">
										<i class="glyphicon glyphicon-home"></i>
									</span>
									<input class="form-control" type="text" name="bankName" id="bankName1" placeholder="Name Of Bank" />  
								</div>
							</div>
						</div>	
					</div>
			</div>
		</div>	          
			          
			     <div class="row buttons-margin" align="center">
			            
			           	 	<!-- <button id="btn2" name="btn2" class="btn btn-large btn-success glyphicon glyphicon-save  button-height-width"
			           	 	onclick="customerPaymentValidation(); return false;"><h4> Submit</h4></button>
              				<button class="btn btn-large btn-danger glyphicon glyphicon-remove-circle  button-height-width" type="reset"
              				onclick="reset()"><h4> Cancel</h4> </button> -->
			       	<input type="button" id="btn2" name="btn2" class="btn btn-success" onclick="customerPaymentValidation(); return false;" value="Submit">
		            <input type="reset" id="btn2" class="btn btn-danger" name="btn2" value="Cancel">
		      		<input type="button" value="List" id="listBtn" class="btn btn-primary" onclick="custlist()"/> 
				</div>       	    
			 
			 </form>
	</div>
<!------------------------------------------------- CUSTOMER PAYMENT Ends Here ------------------------------------------------->

<!------------------------------------------------- EMPLOYEE PAYMENT Starts Here ------------------------------------------------->	

           <div class="tab-pane" id="messages">
           		<form class="form-horizontal" method="post" action="" name="emp">
   	    	 <div class="row">
			    <div align="center">
			  		<h2 class="form-name style_heading">Employee Payment</h2>
			  	</div>
			 	
			 	<%
			 				 		Long transactionIdEmp = 1l;
			 				 				EmployeePaymentDao data3 = new EmployeePaymentDao();
			 				 				List trIdListEmp  = data3.getEmpLastTransactionNo();
			 				 				for(int i=0;i<trIdListEmp.size();i++)
			 				 				{
			 				 					EmployeePaymentBean st = (EmployeePaymentBean)trIdListEmp.get(i);
			 				 					transactionIdEmp = st.getTransNoForEmployee();
			 				 					transactionIdEmp++;
			 				 				}
			 				 	%>
			 	
			 	    <div align="right">
						<h3 class="cashbooktransaction">
								Transaction ID ::
								<%
									out.println(transactionIdEmp);
								%>
						</h3>
					</div>
			 	
			 	
				    <div class="row" align="center">
						<div class="hr-width">
							<hr class="style-one">
						</div>	
				   	</div>
		    
		    </div>
		    
		    <script>
		    </script>
		    
		<div class="shopform-margin">		    
    	     	<div class="row">
					<div class="form-group"> 				   	     	
           				<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
           				 	<label class="control-label" for="employeename">Employee Name<sup>*</sup></label>  
          				</div>	  
          				<div class="col-lg-3 col-md-3 col-sm-8">
							<div class="input-group">
								<span class="input-group-addon">
									<i class="glyphicon glyphicon-user"></i>
								</span>
							
							 <%
								EmployeeDetailsDao eedd = new EmployeeDetailsDao();
							    List mList =eedd.getAllMainEmployee();
							 %>
								<input list="emp_drop" id="employee" placeholder="Select Employee Name" class="form-control" onchange="getEmployeeDetails()"/>
				      			<datalist id="emp_drop">
							
							<%
								for(int i=0;i<mList.size();i++){
					               EmployeeDetailsBean detailsBean =(EmployeeDetailsBean)mList.get(i);
							       salary = detailsBean.getSalary().toString();
							%>
		
									<option data-value="<%=detailsBean.getEmpId()%>" ><%=detailsBean.getFirstName()%> <%=detailsBean.getLastName()%></option>
							<%
								}
							%>
								</datalist> 
							</div>
           				</div>
            			<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">
           					<label class="control-label" for="personName">Accountant Name</label>  
	          			</div>
	          			<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
							<div class="input-group">
								<span class="input-group-addon">
									<i class="glyphicon glyphicon-user"></i>
								</span>
							<%
								SupplierDetailsDao sdd3 = new SupplierDetailsDao();
								List sList3 =sdd3.getAllaccount(request);
							%>
							
								<input list="personname_drop2" id="personName2"  placeholder="Select Accountant Name" class="form-control">
								<datalist id="personname_drop2">
							
							<%
								for(int i=0;i<sList3.size();i++){
									EmployeeDetailsBean sup =(EmployeeDetailsBean)sList3.get(i);
							%>
		
									<option data-value="<%=sup.getEmpId()%>" value="<%=sup.getFirstName()%>  <%=sup.getMiddleName()%>  <%=sup.getLastName()%>">
							<%
								}
							%>
								</datalist> 
						
	        <!--    		 						  <input id="personName2" name="personName2" placeholder="Accountant Name" class="form-control input-md" type="text"> -->
	           				</div>
						</div>
           			</div>	 
				</div>
         	 
         	  	<div class="row">
	           		<div class="form-group">											
						<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
							<label class="control-label" for="reason2">Reason</label>  
	          			</div>	
	          			<div class="col-lg-3 col-md-3 col-sm-8">
							<div class="input-group">
								<span class="input-group-addon">
									<i class="glyphicon glyphicon-list-alt"></i>
								</span>
	           		 		  	<input id="reason2" name="reason2" placeholder="Reason" class="form-control input-md" type="text">
	           				</div>
						</div>
						<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">							
							<label class="control-label" for="paymentMode"> Payment Mode</label>  
	           		    </div>   
	           		    <div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
							<div class="input-group">
								<span class="input-group-addon">
									<i class="glyphicon glyphicon-usd"></i>
								</span>
	           					<select class="form-control" id="paymentMode2">
<!-- 										<option value="selected">-Select Type--</option> -->
									<option value="cash">Cash</option>
									<option value="cheque">Cheque</option>
									<option value="card">Card</option>
									<option value="neft">NEFT</option>
									<option value="UPI Payment">UPI Payment</option>
								</select>	
	           				</div>
						</div>
					</div>
				</div>   	
	 <script>
		
		$(document).ready(function(){
	  		 $("#paymentMode2").change(function(){
	       	$(this).find("option:selected").each(function(){
	           	if($(this).attr("value")=="cheque"){
	           	
	           	$("#cheque_no2").show(); 
	           	
	           	$("#neft_acc_no2").hide(); 
	           	$("#card_no2").hide();
	           	}
	          	 else if($(this).attr("value")=="card"){
	           	
	          		$("#card_no2").show(); 	
	          		
	          		$("#neft_acc_no2").hide(); 
	        		$("#cheque_no2").hide();
	           }
	          	 else if($(this).attr("value")=="neft"){
	                	
	           		$("#neft_acc_no2").show(); 	
	           		
	           		$("#card_no2").hide(); 
	        		$("#cheque_no2").hide();
	            }
	          	 else if($(this).attr("value")=="cash"){
	             	
	            		$("#neft_acc_no2").hide(); 
	            		$("#cheque_no2").hide();
	            		$("#card_no2").hide(); 
	             }
	           	
	          	else if($(this).attr("value")=="selected"){
	             	
	        		$("#neft_acc_no2").hide(); 
	        		$("#cheque_no2").hide();
	        		$("#card_no2").hide(); 
	         }
	          
	       });
	   }).change();
		});	
		</script>
          	
		<div class="row">
			<div class="form-group">
				<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">				
					<label class="control-label" for="paymentMode">Payment Type</label>  
	           	</div>	
	           	<div class="col-lg-3 col-md-3 col-sm-8">
					<div class="input-group">
						<span class="input-group-addon">
							<i class="glyphicon glyphicon-usd"></i>
						</span>
	           			<select class="form-control" id="paymentType2">
							<option value="credit">Credit - To Receive </option>
							<option value="debit">Debit - To Pay</option>
						</select>	
	           		</div>
				</div>
				<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">		
					<label class="control-label" for="balanceAmt"> Paid Amount <sup>*</sup></label>
	            </div>    
	            <div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
		            <div class="input-group">
			            <span class="input-group-addon">
			               	<span class="glyphicon nogyphicon">Rs</span>
			            </span>
           		   	  	<input  id="empPay" name="empPay" class="form-control" value="" placeholder="Enter Amount">
           			</div>
				</div>
		  	</div> 				  
		</div>

        <div class="row">
          	<div class="form-group">
          		<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
          			<label class="control-label" for="saleDate">Payment Date</label>  
          		</div>
          		<div class="col-lg-3 col-md-3 col-sm-8">
					<div class="input-group">
						<span class="input-group-addon">
							<i class="glyphicon glyphicon-calendar"></i>
						</span>									
	            	    <input type="date" id="empDate" name="empDate" value="<%=todayDate%>" placeholder="Date" class="form-control input-md">
					</div>
				</div>
			</div>
		</div>
          
          	<div class="row">
				<div id="cheque_no2" >
            						<!-- <div class="col-md-2">										
										<label class="control-label" style="align:">Cheque No.:</label>
									</div> -->
					<div class="form-group">						
						<div class="col-lg-offset-8 col-lg-3 col-md-offset-7 col-md-3 col-sm-offset-4 col-sm-8">	
							<div class="input-group">
								<span class="input-group-addon">
									<span class="glyphicon nogyphicon">No</span>
								</span>
								<input class="form-control" type="text" name="chequeNum" id="chequeNum2" placeholder="Cheque No." />  
							</div>
						</div>
					</div>		
									<!-- <div class="col-md-1">
										<label class="control-label">Date:</label>
									</div>
									<div class="col-md-3 first">	
										<input class="form-control" type="text" name="cdate" id="chequedate" placeholder="yyyy-mm-dd" />  
									</div> -->
									<!-- <div class="col-md-2">
										<label class="control-label">Name:</label>
									</div> -->
					<div class="form-group">
						<div class="col-lg-offset-8 col-lg-3 col-md-offset-7 col-md-3 col-sm-offset-4 col-sm-8">	
							<div class="input-group">
								<span class="input-group-addon">
									<i class="glyphicon glyphicon-user"></i>
								</span>
								<input class="form-control" type="text" name="nameOnCheck" id="nameOnCheck2" placeholder="Name On check" />  
							</div>
						</div>
					</div>
				</div>
											
				<div id="card_no2">
					<div class="form-group">
												<!-- <div class="col-md-2 ">
													<label class="control-label">Card No:</label>
												</div> -->
						<div class="col-lg-offset-8 col-lg-3 col-md-offset-7 col-md-3 col-sm-offset-4 col-sm-8">	
							<div class="input-group">
								<span class="input-group-addon">
									<span class="glyphicon nogyphicon">No</span>
								</span>
								<input class="form-control" type="text" name="cardNum" id="cardNum2" placeholder="Card No." />  
							</div>
						</div>
					</div>
				</div>
											
				<div id="neft_acc_no2">
												<!-- <div class="col-md-2 ">
													<label class="control-label">Account No:</label>
												</div> -->
					<div class="form-group">
						<div class="col-lg-offset-8 col-lg-3 col-md-offset-7 col-md-3 col-sm-offset-4 col-sm-8">	
							<div class="input-group">
								<span class="input-group-addon">
									<span class="glyphicon nogyphicon">No</span>
								</span>
								<input class="form-control" type="text" name="accNum" id="accNum2" placeholder="Account No." />  
							</div>
						</div>
					</div>							<!-- <div class="col-md-2 ">
													<label class="control-label">Bank Name</label>
												</div> -->
					<div class="form-group">		
						<div class="col-lg-offset-8 col-lg-3 col-md-offset-7 col-md-3 col-sm-offset-4 col-sm-8">	
							<div class="input-group">
								<span class="input-group-addon">
									<i class="glyphicon glyphicon-user"></i>
								</span>
								<input class="form-control" type="text" name="bankName" id="bankName2" placeholder="Name Of Bank" />  
							</div>
						</div>
					</div>
				</div>
         	</div>
         	
        </div>
         
         <div class="row buttons-margin" align="center">
              	<!-- <button id="btn3" name="btn3" class="btn btn-large btn-success glyphicon glyphicon-save  button-height-width"  onclick="EmployeeValidation(); return false;"><h4> Submit</h4></button>
              	<button class="btn btn-large btn-danger glyphicon glyphicon-remove-circle  button-height-width" type="reset"  onclick="reset()"><h4> Cancel</h4> </button> -->
            
            <input type="button" id="btn3" name="btn3" class="btn btn-success" onclick="EmployeeValidation(); return false;" value="Submit">
		    <input type="reset" id="btn2" class="btn btn-danger" name="btn2" value="Cancel">
		   	<input type="button" value="List" id="listBtn" class="btn btn-primary" onclick="emplist()" />  
        </div>       	    
 	 </form> 
 </div>
<!------------------------------------------------- EMPLOYEE PAYMENT Ends Here ------------------------------------------------->

<!------------------------------------------------- Credit Note Generation PAYMENT Starts Here ------------------------------------------------->          
         
           <div class="tab-pane" id="creditnotegeneration">
					<form class="form-horizontal" method="post" action="" name="creditnote">
					
						<div class="row">
							<div align="center">
							
								<h2 class="form-name style_heading">Credit Note Generation</h2>
								
							</div>
							
							<%
															Long Txid = 1l;
																				creditnoteDao data5 = new creditnoteDao();
																				List trIdListCreGen  = data5.getCreditNoteTxid();
																				for(int i=0;i<trIdListCreGen.size();i++)
																				{
																					creditnotebean st = (creditnotebean)trIdListCreGen.get(i);
																					Txid = st.getTxId();
																					Txid++;
																				}
														%>
							
							<div align="right">
								<h3 class="cashbooktransaction">
								Transaction ID ::
								<%
									out.println(Txid);
								%>
								</h3>
						  	</div>
							
					  </div>
							
							
							<div class="row" align="center">
								<div class="hr-width">
									<hr class="style-one">
								</div>
							</div>
				
			<div class="shopform-margin">					
				<div class="row">
					<div class="form-group">
						<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
							<label class="control-label" for="partyname">Party Name<sup>*</sup></label>
						</div>
						<div class="col-lg-3 col-md-3 col-sm-8">
							<div class="input-group">
								<span class="input-group-addon">
									<i class="glyphicon glyphicon-user"></i>
								</span>
								<input id="partyname" name="partyname" placeholder="Party Name" class="form-control input-md" type="text">
							</div>
						</div>
						<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">	
							<label class="control-label" for="description">Description</label>
						</div>
						<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
							<div class="input-group">
								<span class="input-group-addon">
									<i class="glyphicon glyphicon-list-alt"></i>
								</span>
								<input id="description" name="description" placeholder="Description" class="form-control input-md" type="text">
							</div>
						</div>
					</div>
				</div>

				<div class="row">
					<div class="form-group">
						<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
							<label class="control-label" for="amount"> Amount <sup>*</sup></label>
						</div>
						<div class="col-lg-3 col-md-3 col-sm-8">
							<div class="input-group">
								<span class="input-group-addon">
									<span class="glyphicon nogyphicon">Rs</span>
								</span>
								<input type="text" id="amount" name="amount" placeholder="Amount" class="form-control input-md">
							</div>
						</div>
						<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">
							<label class="control-label" for="paymentMode"> Payment Mode</label>  
	           		    </div>
	           		    <div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
							<div class="input-group">
								<span class="input-group-addon">
									<i class="glyphicon glyphicon-usd"></i>
								</span>
	           					<select class="form-control" id="paymentMode6">
<!-- 										<option value="selected">-Select Type--</option> -->
									<option value="cash">Cash</option>
									<option value="cheque">Cheque</option>
									<option value="card">Card</option>
									<option value="neft">NEFT</option>
									<option value="UPI Payment">UPI Payment</option>
								</select>	
	           				</div>
						</div>
				 	</div> 
			 	</div>
			 	
			 	<div class="row">
			 		<div class="form-group">
			 			<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
			 				<label class="control-label" for="saleDate">Payment Date</label>  
          				</div>
          				<div class="col-lg-3 col-md-3 col-sm-8">
							<div class="input-group">
								<span class="input-group-addon">
									<i class="glyphicon glyphicon-calendar"></i>
								</span>									
	              			  	<input type="date" id="creditDate" name="creditDate" value="<%=todayDate%>" placeholder="Date" class="form-control input-md">
							</div>
						</div>
					</div>
				</div>
							  	
	 <script>
		
		$(document).ready(function(){
	  		 $("#paymentMode6").change(function(){
	       	$(this).find("option:selected").each(function(){
	           	if($(this).attr("value")=="cheque"){
	           	
	           	$("#cheque_no6").show(); 
	           	
	           	$("#neft_acc_no6").hide(); 
	           	$("#card_no6").hide();
	           	}
	          	 else if($(this).attr("value")=="card"){
	           	
	          		$("#card_no6").show(); 	
	          		
	          		$("#neft_acc_no6").hide(); 
	        		$("#cheque_no6").hide();
	           }
	          	 else if($(this).attr("value")=="neft"){
	                	
	           		$("#neft_acc_no6").show(); 	
	           		
	           		$("#card_no6").hide(); 
	        		$("#cheque_no6").hide();
	            }
	          	 else if($(this).attr("value")=="cash"){
	             	
	            		$("#neft_acc_no6").hide(); 
	            		$("#cheque_no6").hide();
	            		$("#card_no6").hide(); 
	             }
	           	
	          	else if($(this).attr("value")=="selected"){
	             	
	        		$("#neft_acc_no6").hide(); 
	        		$("#cheque_no6").hide();
	        		$("#card_no6").hide(); 
	         }
	          
	       });
	   }).change();
		});	
		</script>
          
			<div class="row">
				<div id="cheque_no6" >							
					<div class="form-group">
						<div class="col-lg-offset-8 col-lg-3 col-md-offset-7 col-md-3 col-sm-offset-4 col-sm-8">	
							<div class="input-group">
								<span class="input-group-addon">
									<span class="glyphicon nogyphicon">No</span>
								</span>
								<input class="form-control" type="text" name="chequeNum6" id="chequeNum6" placeholder="Cheque No." />  
							</div>
						</div>
					</div>
					<div class="form-group">			
						<div class="col-lg-offset-8 col-lg-3 col-md-offset-7 col-md-3 col-sm-offset-4 col-sm-8">	
							<div class="input-group">
								<span class="input-group-addon">
									<i class="glyphicon glyphicon-user"></i>
								</span>
								<input class="form-control" type="text" name="nameOnCheck6" id="nameOnCheck6" placeholder="Name On check" />  
							</div>
						</div>
					</div>
				</div>							
				
				<div id="card_no6">
												<!-- <div class="col-md-2 ">
													<label class="control-label">Card No:</label>
												</div> -->
					<div class="form-group">
						<div class="col-lg-offset-8 col-lg-3 col-md-offset-7 col-md-3 col-sm-offset-4 col-sm-8">	
							<div class="input-group">
								<span class="input-group-addon">
									<span class="glyphicon nogyphicon">No</span>
								</span>
								<input class="form-control" type="text" name="cardNum6" id="cardNum6" placeholder="Card No." />  
							</div>
						</div>
					</div>
				</div>							
				
				<div id="neft_acc_no6">
					<div class="form-group">
						<div class="col-lg-offset-8 col-lg-3 col-md-offset-7 col-md-3 col-sm-offset-4 col-sm-8">	
							<div class="input-group">
								<span class="input-group-addon">
									<span class="glyphicon nogyphicon">No</span>
								</span>
								<input class="form-control" type="text" name="accNum6" id="accNum6" placeholder="Account No." />  
							</div>
						</div>
					</div>
					<div class="form-group">							
						<div class="col-lg-offset-8 col-lg-3 col-md-offset-7 col-md-3 col-sm-offset-4 col-sm-8">	
							<div class="input-group">
								<span class="input-group-addon">
									<i class="glyphicon glyphicon-user"></i>
								</span>
								<input class="form-control" type="text" name="bankName6" id="bankName6" placeholder="Name Of Bank" />  
							</div>
						</div>
					</div>
				</div>
			</div>
        
        </div>  

						<div class="row buttons-margin" align="center">
							<input type="button" id="save" name="btn4" class="btn btn-success" onclick="creditnotegeneration(); return false;" value="Print">
							<input type="reset" id="btn2" class="btn btn-danger" name="btn4" value="Cancel">
							<input type="button" value="List" id="listBtn" class="btn btn-primary" onclick="creditlist()" />                       	     	    							   
						</div>
					</form>
				</div>  
<!------------------------------------------------- Credit Note Generation PAYMENT Ends Here ------------------------------------------------->           

<!------------------------------------------------- EXPENDITURE PAYMENT Starts Here ------------------------------------------------->          
               
       <div class="tab-pane" id="settings">
		<form class="form-horizontal" method="post" action="" name="exp">
			<div class="row">
			    <div align="center">
			  		<h2 class="form-name style_heading">Expenditure Payment</h2>
			  	</div>
			  	
			  	<%
			  				  		Long transactionIdExp = 1l;
			  				  		  	    ExpenditurePaymentDao data4 = new ExpenditurePaymentDao();
			  				  				List trIdListExp  = data4.getExpenditureLastTransactionNo();
			  				  				for(int i=0;i<trIdListExp.size();i++)
			  				  				{
			  				  					ExpenditurePaymentBean st = (ExpenditurePaymentBean)trIdListExp.get(i);
			  				  					transactionIdExp = st.getTransNoForExpenditure();
			  				  					transactionIdExp++;
			  				  				}
			  				  	%>
			  	
			 				<div align="right">
								<h3 class="cashbooktransaction">
								Transaction ID ::
								<%
									out.println(transactionIdExp);
								%>
								</h3>
							</div>
							
					    <div class="row" align="center">
							<div class="hr-width">
								<hr class="style-one">
							</div>	
					   	</div>
		    </div>
		 
		 <div class="shopform-margin">   
		    <div class="row">
           		<div class="form-group">
           			<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">	
           				<label class="control-label" for="expenseType">Expenditure Type<sup>*</sup></label>  
           	 		</div>
           	 		<div class="col-lg-3 col-md-3 col-sm-8">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-list-alt"></i>
							</span>
              				<select class="form-control" id="expensetype" onchange="getAllExpenseNameForPayment()">
								<option value="select">Select Expense Type</option>
								<option value="direct">Direct</option>
								<option value="indirect">Indirect</option>
							</select>
            			</div>
           		 	</div>
           		 	<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">	
           		 		<label class="control-label" for="saleDate">Payment Date</label>  
          			</div>		  
          			<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-calendar"></i>
							</span>									
	              		  	<input type="date" id="expDate" name="expDate" value="<%=todayDate%>" placeholder="Date" class="form-control input-md">
						</div>
					</div>
				</div>
			</div>
				
			<div class="row">
           		<div class="form-group">
           			<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
           				<label class="control-label" for="expenditureName">Expenditure Name<sup>*</sup></label>  
           	 	    </div>
           	 	    <div class="col-lg-3 col-md-3 col-sm-8">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="	glyphicon glyphicon-list-alt"></i>
							</span>
							<select id="expenseName" placeholder="Select Expenditure Name" class="form-control"></select>		
										
<!-- 							<input list="exp_drop" id="expenseName" placeholder="Select Expenditure Name" class="form-control">
							<datalist id="exp_drop"></datalist> -->
								         	
						</div>
           			</div>
           	 		<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">
           	 			<label class="control-label" for="contactNumber">Contact Number</label>  
           			</div>
           			<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-earphone"></i>
							</span>
             				<input id="contactNumber" name="contactNumber" placeholder="Contact Number" class="form-control input-md" type="text" maxlength="10" >
           				 </div>
					</div>
				</div>
			</div>
			
			<div class="row">
				<div class="form-group">
					<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
						<label class="control-label" for="personName">Accountant Name</label>  
	          		</div>
	          		<div class="col-lg-3 col-md-3 col-sm-8">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-user"></i>
							</span>
							
						<%
								SupplierDetailsDao sdd4 = new SupplierDetailsDao();
								List sList4 =sdd4.getAllaccount(request);
							%>
							
							<input list="accountantName_drop7" id="accountantName"  placeholder="Select Accountant Name" class="form-control">
							<datalist id="accountantName_drop7">
							
							<%
								for(int i=0;i<sList4.size();i++){
									EmployeeDetailsBean sup =(EmployeeDetailsBean)sList4.get(i);
							%>
		
								<option data-value="<%=sup.getEmpId()%>" value="<%=sup.getFirstName()%>  <%=sup.getMiddleName()%>  <%=sup.getLastName()%>">
							<%
								}
							%>
							</datalist> 
<!-- 	           		 			<input id="accountantName" name="personName" placeholder="Accountant Name" class="form-control input-md" type="text"> -->
	           			</div>
					</div>
					<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">
						<label class="control-label" for="paymentMode4"> Payment Type</label>  
	           		</div>
	           		<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-usd"></i>
							</span>
	           				<select class="form-control" id="paymentType3">
<!-- 								<option value="selected">-Select Type--</option> -->
								<option value="credit">Credit - To Receive</option>
								<option value="debit">Debit - To Pay</option>
							</select>	
	           			</div>
					</div>
				</div>
			</div>
								
		<script>
		$(document).ready(function(){
	  		 $("#paymentType3").change(function(){
	       	$(this).find("option:selected").each(function(){
	           	if($(this).attr("value")=="credit"){
	           	
	           	$("#credit").show(); 
	           	
	           	$("#debit").hide(); 
	           	}
	          	else if($(this).attr("value")=="debit"){
	           	
	          		$("#credit").hide(); 
		           	
		           	$("#debit").show();
	           }
	          	 else if($(this).attr("value")=="selected"){
	          		$("#credit").hide(); 
		           	
		           	$("#debit").hide();
	            }
	       });
	   }).change();
		});	
		</script>	
					
					
			<div id="credit" class="row">	
				<div class="form-group">
					<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
						<label class="control-label" for="expCredit">Credit Amount<sup>*</sup></label>  
           			</div>
           			<div class="col-lg-3 col-md-3 col-sm-8">
						<div class="input-group">
							<span class="input-group-addon">
								<span class="glyphicon nogyphicon">Rs</span>
							</span>
             				<input id="expCredit" name="expCredit" placeholder="Credit Amount" class="form-control input-md" type="text" >
           				 </div>
					</div>
				</div>
			</div>	
				
			<div id="debit" class="row">	
				<div class="form-group">
					<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
						<label class="control-label" for="expDebit">Debit Amount<sup>*</sup></label>  
           			</div>
           			<div class="col-lg-3 col-md-3 col-sm-8">
						<div class="input-group">
							<span class="input-group-addon">
								<span class="glyphicon nogyphicon">Rs</span>
							</span>
             				<input id="expDebit" name="expDebit" placeholder="Debit Amount" class="form-control input-md" type="text" >
           				 </div>
					</div>
				</div>		
			</div>	
			
			<div class="row">	
				<div class="form-group">
					<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
						<label class="control-label" for="paymentMode"> Payment Mode</label>  
	           		</div>    
	           		<div class="col-lg-3 col-md-3 col-sm-8">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-usd"></i>
							</span>
	           				<select class="form-control" id="paymentMode7">
<!-- 									<option value="selected">-Select Type--</option> -->
								<option value="cash">Cash</option>
								<option value="cheque">Cheque</option>
								<option value="card">Card</option>
								<option value="neft">NEFT</option>
								<option value="UPI Payment">UPI Payment</option>
							</select>	
	           			</div>
					</div>
				</div>
			</div>   	
	 <script>
		
		$(document).ready(function(){
	  		 $("#paymentMode7").change(function(){
	       	$(this).find("option:selected").each(function(){
	           	if($(this).attr("value")=="cheque"){
	           	
	           	$("#cheque_no7").show(); 
	           	
	           	$("#neft_acc_no7").hide(); 
	           	$("#card_no7").hide();
	           	}
	          	 else if($(this).attr("value")=="card"){
	           	
	          		$("#card_no7").show(); 	
	          		
	          		$("#neft_acc_no7").hide(); 
	        		$("#cheque_no7").hide();
	           }
	          	 else if($(this).attr("value")=="neft"){
	                	
	           		$("#neft_acc_no7").show(); 	
	           		
	           		$("#card_no7").hide(); 
	        		$("#cheque_no7").hide();
	            }
	          	 else if($(this).attr("value")=="cash"){
	             	
	            		$("#neft_acc_no7").hide(); 
	            		$("#cheque_no7").hide();
	            		$("#card_no7").hide(); 
	             }
	           	
	          	else if($(this).attr("value")=="selected"){
	             	
	        		$("#neft_acc_no7").hide(); 
	        		$("#cheque_no7").hide();
	        		$("#card_no7").hide(); 
	         }
	          
	       });
	   }).change();
		});	
		</script>
          
			<div class="row">
				<div id="cheque_no7">							
					<div class="form-group">
						<div class="col-lg-offset-3 col-lg-3 col-md-offset-4 col-md-3 col-sm-offset-4 col-sm-8">	
							<div class="input-group">
								<span class="input-group-addon">
									<span class="glyphicon nogyphicon">No</span>
								</span>
								<input class="form-control" type="text" name="chequeNum7" id="chequeNum7" placeholder="Cheque No." />  
							</div>
						</div>
					</div>	
					<div class="form-group">	
						<div class="col-lg-offset-3 col-lg-3 col-md-offset-4 col-md-3 col-sm-offset-4 col-sm-8">	
							<div class="input-group">
								<span class="input-group-addon">
									<i class="glyphicon glyphicon-user"></i>
								</span>
								<input class="form-control" type="text" name="nameOnCheck7" id="nameOnCheck7" placeholder="Name On check" />  
							</div>
						</div>
					</div>
				</div>							
				
				<div id="card_no7">
												<!-- <div class="col-md-2 ">
													<label class="control-label">Card No:</label>
												</div> -->
					<div class="form-group">
						<div class="col-lg-offset-3 col-lg-3 col-md-offset-4 col-md-3 col-sm-offset-4 col-sm-8">	
							<div class="input-group">
								<span class="input-group-addon">
									<span class="glyphicon nogyphicon">No</span>
								</span>
								<input class="form-control" type="text" name="cardNum7" id="cardNum7" placeholder="Card No." />  
							</div>
						</div>
					</div>
				</div>							
				
				<div id="neft_acc_no7">
					<div class="form-group">
						<div class="col-lg-offset-3 col-lg-3 col-md-offset-4 col-md-3 col-sm-offset-4 col-sm-8">	
							<div class="input-group">
								<span class="input-group-addon">
									<span class="glyphicon nogyphicon">No</span>
								</span>
								<input class="form-control" type="text" name="accNum7" id="accNum7" placeholder="Account No." />  
							</div>
						</div>
					</div>							
					<div class="form-group">
						<div class="col-lg-offset-3 col-lg-3 col-md-offset-4 col-md-3 col-sm-offset-4 col-sm-8">	
							<div class="input-group">
								<span class="input-group-addon">
									<i class="glyphicon glyphicon-user"></i>
								</span>
								<input class="form-control" type="text" name="bankName7" id="bankName7" placeholder="Name Of Bank" />  
							</div>
						</div>
					</div>
				</div>
			</div>	
		
		</div>
				
		<div class="row buttons-margin" align="center">
            
             	<!-- <button id="save" name="btn4" class="btn btn-large btn-success glyphicon glyphicon-save  button-height-width"  onclick="expensePaymentValidation(); return false;"><h4> Submit</h4></button>
              	<button class="btn btn-large btn-danger glyphicon glyphicon-remove-circle  button-height-width" type="reset"  onclick="reset()"><h4> Cancel</h4> </button> -->

            <input type="button" id="expSave" name="btn4" class="btn btn-success" onclick="expensePaymentValidation()" value="Submit">
            <input type="reset" id="btn2" class="btn btn-danger" name="btn4" value="Cancel">
 		   	<input type="button" value="List" id="listBtn" class="btn btn-primary" onclick="expenlist()" />             
<!--             <input type="button" id="save" name="btn4" style="font-size: 25" class="btn btn-large btn-success button-height-width"  onclick="expensePaymentValidation(); return false;" value="Submit"> -->
		</div> 
			
     </form>
	</div>
<!------------------------------------------------- EXPENDITURE PAYMENT Ends Here ------------------------------------------------->	

<!------------------------------------------------- PARTNER PAYMENT Starts Here ------------------------------------------------->	
	           
       <div class="tab-pane" id="partnerCashbook">
		<form class="form-horizontal" method="post" action="" name="patnr">
			<div class="row">
			    <div align="center">
			  		<h2 class="form-name style_heading">Partner Payment</h2>
			  	</div>
			  	
			  	<%
			  		Long transactionIdPT = 1l;
	  		  	    partnerDetailsDao pdd = new partnerDetailsDao();
	  				List trIdListPT  = pdd.getPartnerTransactionLastTransactionNo();
	  				for(int i=0;i<trIdListPT.size();i++)
	  				{
		  				PartnerTransactionBeanH st = (PartnerTransactionBeanH)trIdListPT.get(i);
	  					transactionIdPT = st.getTransactoin_No_partner_Transactions();
	  					transactionIdPT++;
	  				}
			  	%>
			  	
			 	<div align="right">
					<h3 class="cashbooktransaction">
								Transaction ID ::
								<%
									out.println(transactionIdPT);
								%>
					</h3>
				</div>
		    <div class="row" align="center">
				<div class="hr-width">
					<hr class="style-one">
				</div>	
		   	</div>
		    </div>
			
		<div class="shopform-margin">			 
			<div class="row">
           		<div class="form-group">
           			<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
           				<label class="control-label" for="partnerName">Partner Name<sup>*</sup></label>  
           	 	    </div>
           	 	    <div class="col-lg-3 col-md-3 col-sm-8">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-list-alt"></i>
							</span>
										
							<!-- Following code is to get expense name from "expenditure_details" table of "fertilizer" DB -->
							<!-- getAllExpenseName() is implemented in  SupplierDetailsDao with return type List-->
						
							<%
								partnerDetailsDao pdd2 = new partnerDetailsDao();
           						List ptList = pdd2.getAllPartnerName();		 					
							%>
							
							<input list="partner_drop" id="partnerName" placeholder="Select Partner Name" class="form-control">
							<datalist id="partner_drop">
							
							<%
					           for(int i=0;i<ptList.size();i++){
					        	   PartnerDetailsBeanH ptbean = (PartnerDetailsBeanH)ptList.get(i);
							%>		
								<option data-value="<%=ptbean.getPkPartnerId()%>" value="<%=ptbean.getPartnerName()%>">
							<%
				      			}
				    		%>
							</datalist>
						</div>
           			</div>
           	 		<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">	
           	 			<label class="control-label" for="accountantNamePT">Accountant Name</label>  
	          		</div>
	          		<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-user"></i>
							</span>
							
							<%
								SupplierDetailsDao sdd5 = new SupplierDetailsDao();
								List sList5 =sdd5.getAllaccount(request);
							%>
							
							<input list="accountantNamePT_drop4" id="accountantNamePT"  placeholder="Select Accountant Name" class="form-control">
							<datalist id="accountantNamePT_drop4">
							
							<%
								for(int i=0;i<sList5.size();i++){
									EmployeeDetailsBean sup =(EmployeeDetailsBean)sList5.get(i);
							%>
		
								<option data-value="<%=sup.getEmpId()%>" value="<%=sup.getFirstName()%>  <%=sup.getMiddleName()%>  <%=sup.getLastName()%>">
							<%
								}
							%>
							</datalist> 
<!-- 	           		 			<input id="accountantNamePT" name="accountantNamePT" placeholder="Accountant Name" class="form-control input-md" type="text"> -->
	           			</div>
					</div>
				</div>
			</div>
			
			<div class="row">
				<div class="form-group">	
					<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
						<label class="control-label" for="paymentTypePT">Payment Type</label>  
	           		</div>
	           		<div class="col-lg-3 col-md-3 col-sm-8">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-usd"></i>
							</span>
	           				<select class="form-control" id="paymentTypePT">
<!-- 										<option value="selected">-Select Type--</option> -->
								<option value="creditPT">Credit</option>
								<option value="debitPT">Debit</option>
							</select>	
	           			</div>
					</div>
				
						
					<div id="creditPT" class="">	
						
							<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">		
								<label class="control-label" for="creditAmtPT">Credit Amount<sup>*</sup></label>  
           			 		</div>
           			 		<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
								<div class="input-group">
									<span class="input-group-addon">
										<span class="glyphicon nogyphicon">Rs</span>
									</span>
             					 	<input id="creditAmtPT" name="creditAmtPT" placeholder="Credit Amount" class="form-control input-md" type="text" >
           				 		</div>
							</div>
						
					</div>
					
					<div id="debitPT" class="">	
							
							<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">	
								<label class="control-label" for="debitAmtPT">Debit Amount<sup>*</sup></label>  
           			 		</div>
           			 		<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
								<div class="input-group">
									<span class="input-group-addon">
										<span class="glyphicon nogyphicon">Rs</span>
									</span>
             						<input id="debitAmtPT" name="debitAmtPT" placeholder="Debit Amount" class="form-control input-md" type="text" >
           				 		</div>
							</div>
						
					</div>
				</div>
			</div>
								
		<script>
		$(document).ready(function(){
	  		 $("#paymentTypePT").change(function(){
	       	$(this).find("option:selected").each(function(){
	           	if($(this).attr("value")=="creditPT"){
	           	
	           	$("#creditPT").show(); 
	           	
	           	$("#debitPT").hide(); 
	           	}
	          	else if($(this).attr("value")=="debitPT"){
	           	
	          		$("#creditPT").hide(); 
		           	
		           	$("#debitPT").show();
	           }
	          	 else if($(this).attr("value")=="selected"){
	          		$("#creditPT").hide(); 
		           	
		           	$("#debitPT").hide();
	            }
	       });
	   }).change();
		});	
		</script>
				
				
				
				<div class="row">	
					<div class="form-group">
						<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
							<label class="control-label" for="paymentMode"> Payment Mode</label>  
	           		    </div>
	           		    <div class="col-lg-3 col-md-3 col-sm-8">
							<div class="input-group">
								<span class="input-group-addon">
									<i class="glyphicon glyphicon-usd"></i>
								</span>
	           					<select class="form-control" id="paymentMode8">
<!-- 										<option value="selected">-Select Type--</option> -->
									<option value="cash">Cash</option>
									<option value="cheque">Cheque</option>
									<option value="card">Card</option>
									<option value="neft">NEFT</option>
									<option value="UPI Payment">UPI Payment</option>
								</select>	
	           				</div>
						</div>
						<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">
							 <label class="control-label" for="saleDate">Payment Date</label>  
          				</div>
          				<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
							<div class="input-group">
								<span class="input-group-addon">
									<i class="	glyphicon glyphicon-calendar"></i>
								</span>									
	              			  	<input type="date" id="partDate" name="partDate" value="<%=todayDate%>" placeholder="Date" class="form-control input-md">
							</div>
						</div>
				 	</div>
				 </div>   	
	 <script>
		
		$(document).ready(function(){
	  		 $("#paymentMode8").change(function(){
	       	$(this).find("option:selected").each(function(){
	           	if($(this).attr("value")=="cheque"){
	           	
	           	$("#cheque_no8").show(); 
	           	
	           	$("#neft_acc_no8").hide(); 
	           	$("#card_no8").hide();
	           	}
	          	 else if($(this).attr("value")=="card"){
	           	
	          		$("#card_no8").show(); 	
	          		
	          		$("#neft_acc_no8").hide(); 
	        		$("#cheque_no8").hide();
	           }
	          	 else if($(this).attr("value")=="neft"){
	                	
	           		$("#neft_acc_no8").show(); 	
	           		
	           		$("#card_no8").hide(); 
	        		$("#cheque_no8").hide();
	            }
	          	 else if($(this).attr("value")=="cash"){
	             	
	            		$("#neft_acc_no8").hide(); 
	            		$("#cheque_no8").hide();
	            		$("#card_no8").hide(); 
	             }
	           	
	          	else if($(this).attr("value")=="selected"){
	             	
	        		$("#neft_acc_no8").hide(); 
	        		$("#cheque_no8").hide();
	        		$("#card_no8").hide(); 
	         }
	          
	       });
	   }).change();
		});	
		</script>
          
			<div class="row">
				<div id="cheque_no8" >							
					<div class="form-group">
						<div class="col-lg-offset-3 col-lg-3 col-md-offset-4 col-md-3 col-sm-offset-4 col-sm-8">	
							<div class="input-group">
								<span class="input-group-addon">
									<span class="glyphicon nogyphicon">No</span>
								</span>
								<input class="form-control" type="text" name="chequeNum8" id="chequeNum8" placeholder="Cheque No." />  
							</div>
						</div>
					</div>			
					<div class="form-group">
						<div class="col-lg-offset-3 col-lg-3 col-md-offset-4 col-md-3 col-sm-offset-4 col-sm-8">	
							<div class="input-group">
								<span class="input-group-addon">
									<i class="glyphicon glyphicon-user"></i>
								</span>
								<input class="form-control" type="text" name="nameOnCheck8" id="nameOnCheck8" placeholder="Name On check" />  
							</div>
						</div>
					</div>
				</div>							
				
				<div id="card_no8">
												<!-- <div class="col-md-2 ">
													<label class="control-label">Card No:</label>
												</div> -->
					<div class="form-group">
						<div class="col-lg-offset-3 col-lg-3 col-md-offset-4 col-md-3 col-sm-offset-4 col-sm-8">	
							<div class="input-group">
								<span class="input-group-addon">
									<span class="glyphicon nogyphicon">No</span>
								</span>
								<input class="form-control" type="text" name="cardNum8" id="cardNum8" placeholder="Card No." />  
							</div>
						</div>
					</div>							
				</div>
											
				<div id="neft_acc_no8">
					<div class="form-group">
						<div class="col-lg-offset-3 col-lg-3 col-md-offset-4 col-md-3 col-sm-offset-4 col-sm-8">	
							<div class="input-group">
								<span class="input-group-addon">
									<span class="glyphicon nogyphicon">No</span>
								</span>
								<input class="form-control" type="text" name="accNum8" id="accNum8" placeholder="Account No." />  
							</div>
						</div>
					</div>							
					<div class="form-group">	
						<div class="col-lg-offset-3 col-lg-3 col-md-offset-4 col-md-3 col-sm-offset-4 col-sm-8">	
							<div class="input-group">
								<span class="input-group-addon">
									<i class="glyphicon glyphicon-user"></i>
								</span>
								<input class="form-control" type="text" name="bankName8" id="bankName8" placeholder="Name Of Bank" />  
							</div>
						</div>
					</div>
				</div>
			</div>	
		
		</div>
				
		<div class="row buttons-margin" align="center">
            
             	<!-- <button id="save" name="btn4" class="btn btn-large btn-success glyphicon glyphicon-save  button-height-width"  onclick="expensePaymentValidation(); return false;"><h4> Submit</h4></button>
              	<button class="btn btn-large btn-danger glyphicon glyphicon-remove-circle  button-height-width" type="reset"  onclick="reset()"><h4> Cancel</h4> </button> -->

            <input type="button" id="savePT" name="savePT" class="btn btn-success" onclick="addPartnerTransactionsV()" value="Submit">
            <input type="reset" id="cancelPT" name="cancelPT" class="btn btn-danger" name="btn4" value="Cancel">
      		<input type="button" value="List" id="listBtn" class="btn btn-primary" onclick="partnerlist()" />                       
            
<!--             <input type="button" id="save" name="btn4" style="font-size: 25" class="btn btn-large btn-success button-height-width"  onclick="expensePaymentValidation(); return false;" value="Submit"> -->
		</div> 
			
     </form>
	</div>
<!------------------------------------------------- PARTNER PAYMENT Ends Here ------------------------------------------------->

<!------------------------------------------------- BANK PAYMENT Starts Here ------------------------------------------------->	
    
     <div class="tab-pane" id="bankCashbook">
		<form class="form-horizontal" method="post" action="" name="bankTr">
			<div class="row">
			    <div align="center">
			  		<h2 class="form-name style_heading">Bank Payment</h2>
			  	</div>
			  	
			  	<%
			  		Long transactionIdBT = 1l;
	  		  	    BankPaymentDao bpd = new BankPaymentDao();
	  				List trIdListBT  = bpd.getBankTransactionLastTransactionNo();
	  				for(int i=0;i<trIdListBT.size();i++)
	  				{
		  				BankPaymentBean st = (BankPaymentBean)trIdListBT.get(i);
		  				transactionIdBT = st.getTransNoForBank();
		  				transactionIdBT++;
	  				}
			  	%>
			  	
			 	<div align="right">
					<h3 class="cashbooktransaction">
								Transaction ID ::
								<%
									out.println(transactionIdBT);
								%>
					</h3>
				</div>
		    
			    <div class="row" align="center">
				    <div class="hr-width">
				 		<hr class="style-one">
				     </div>	
			   	</div>
		    </div>
		
		<div class="shopform-margin">	
			<div class="row">
           		<div class="form-group">
           			<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
           				<label class="control-label" for="bankNameBT">Bank Name<sup>*</sup></label>  
           	 	    </div>
           	 	    <div class="col-lg-3 col-md-3 col-sm-8">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-list-alt"></i>
							</span>
							<%
								BankPaymentDao bpd1 = new BankPaymentDao();
           						List bpdList = bpd1.getAllBankName();		 					
							%>
							
							<input list="bankBT_drop" id="bankNameBT" placeholder="Select Bank Name" class="form-control" onchange="getBankAccNoandIFScode()">
			            	<datalist id="bankBT_drop">
							
							<%
					           for(int i=0;i<bpdList.size();i++){
					        	   BankDetailsBean btbean = (BankDetailsBean)bpdList.get(i);
							%>		
								<option data-value="<%=btbean.getPkbankdetailsID()%>" value="<%=btbean.getBankName()%>">
							<%
				      			}
				    		%>
							</datalist>
						</div>
           			</div>
           	 		<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">
           	 			<label class="control-label" for="bankTransDate">Date</label>  
	          		</div>
	          		<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-calendar"></i>
							</span>
	              	        <input type="date" id="bankTransDate" name="bankTransDate" value="<%=todayDate%>" class="form-control">
						</div>
					</div>
				</div>
			</div>
			
			<div class="row">
           		<div class="form-group">
           			<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
           				<label class="control-label" for="accNumber">Account Number</label>  
           	 	   	</div>
           	 	   	<div class="col-lg-3 col-md-3 col-sm-8">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-list-alt"></i>
							</span>											
							<input type="text" id="accNumber" name="accNumber" placeholder="Account Number" class="form-control" readonly="readonly">
				        </div>
           			</div>
           			<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">
           				<label class="control-label" for="ifscode">IFSC Code</label>  
	          		</div>
	          		<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-list-alt"></i>
							</span>											
							<input type="text" id="ifscode" name="ifscode" placeholder="IFSC Code" class="form-control" readonly="readonly">
				        </div>
					</div>
				</div>
			</div>
			
			<div class="row">
           		<div class="form-group">
           			<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
           				<label class="control-label" for="acctantName">Accountant Name</label>  
           	 	   	</div>
           	 	   	<div class="col-lg-3 col-md-3 col-sm-8">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-user"></i>
							</span>											
																					<%
								SupplierDetailsDao sdd6 = new SupplierDetailsDao();
								List sList6 =sdd6.getAllaccount(request);
							%>
							
							<input list="acctantName_drop5" id="acctantName"  placeholder="Select Accountant Name" class="form-control">
							<datalist id="acctantName_drop5">
							
							<%
								for(int i=0;i<sList6.size();i++){
									EmployeeDetailsBean sup =(EmployeeDetailsBean)sList6.get(i);
							%>
		
								<option data-value="<%=sup.getEmpId()%>" value="<%=sup.getFirstName()%>  <%=sup.getMiddleName()%>  <%=sup.getLastName()%>">
							<%
								}
							%>
							</datalist>
<!-- 						<input type="text" id="acctantName" name="acctantName" placeholder="Accountant Name" class="form-control"> -->
				        
						</div>
           			</div>
           			<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">
           	 			<label class="control-label" for="contactNo">Contact No</label>  
	          		</div>
	          		<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-list-alt"></i>
							</span>											
							<input type="text" id="contactNo" name="contactNo" placeholder="Contact No" maxlength="10" class="form-control">
				        </div>
					</div>
				</div>
			</div>
			
			<div class="row">
				<div class="form-group">	
					<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
						<label class="control-label" for="paymentTypeBT">Payment Type</label>  
	           		</div>
	           		<div class="col-lg-3 col-md-3 col-sm-8">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-usd"></i>
							</span>
	           				<select class="form-control" id="paymentTypeBT">
								    <!-- <option value="selected">--Select Type--</option> --> 
								<option value="creditBT">Credit</option>
								<option value="debitBT">Debit</option>
							</select>	
	           			</div>
					</div>
						
					<div id="creditBT" class="">	
						<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">
							<label class="control-label" for="creditAmtBT">Credit Amount<sup>*</sup></label>  
           				</div>
           				<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
							<div class="input-group">
								<span class="input-group-addon">
									<span class="glyphicon nogyphicon">Rs</span>
								</span>
             					<input id="creditAmtBT" name="creditAmtBT" placeholder="Credit Amount" class="form-control input-md" type="text" >
           				 	</div>
						</div>
					</div>
					
					<div id="debitBT" class="">	
						<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">
							<label class="control-label" for="debitAmtBT">Debit Amount<sup>*</sup></label>  
           			 	</div>
           			 	<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
							<div class="input-group">
								<span class="input-group-addon">
									<span class="glyphicon nogyphicon">Rs</span>
								</span>
             					<input id="debitAmtBT" name="debitAmtBT" placeholder="Debit Amount" class="form-control input-md" type="text" >
           				 	</div>
						</div>
					</div>
				</div>
			</div>
								
		<script>
		$(document).ready(function(){
	  		 $("#paymentTypeBT").change(function(){
	       	$(this).find("option:selected").each(function(){
	           	if($(this).attr("value")=="creditBT"){
	           	
	           	$("#creditBT").show(); 
	           	
	           	$("#debitBT").hide(); 
	           	}
	          	else if($(this).attr("value")=="debitBT"){
	           	
	          		$("#creditBT").hide(); 
		           	
		           	$("#debitBT").show();
	           }
	          	 else if($(this).attr("value")=="selected"){
	          		$("#creditBT").hide(); 
		           	
		           	$("#debitBT").hide();
	            }
	       });
	   }).change();
		});	
		</script>
				
				
			<div class="row">	
				<div class="form-group">
					<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
						<label class="control-label" for="paymentMode"> Payment Mode</label>  
	           		</div>
	           		<div class="col-lg-3 col-md-3 col-sm-8">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-usd"></i>
							</span>
	           				<select class="form-control" id="paymentMode9">
<!-- 										<option value="selected">-Select Type--</option> -->
								<option value="cash">Cash</option>
								<option value="cheque">Cheque</option>
								<option value="card">Card</option>
								<option value="neft">NEFT</option>
								<option value="UPI Payment">UPI Payment</option>
							</select>	
	           			</div>
					</div>
				</div>
			</div>
			   	
	 <script>
		
		$(document).ready(function(){
	  		 $("#paymentMode9").change(function(){
	       	$(this).find("option:selected").each(function(){
	           	if($(this).attr("value")=="cheque"){
	           	
	           	$("#cheque_no9").show(); 
	           	
	           	$("#neft_acc_no9").hide(); 
	           	$("#card_no9").hide();
	           	}
	          	 else if($(this).attr("value")=="card"){
	           	
	          		$("#card_no9").show(); 	
	          		
	          		$("#neft_acc_no9").hide(); 
	        		$("#cheque_no9").hide();
	           }
	          	 else if($(this).attr("value")=="neft"){
	                	
	           		$("#neft_acc_no9").show(); 	
	           		
	           		$("#card_no9").hide(); 
	        		$("#cheque_no9").hide();
	            }
	          	 else if($(this).attr("value")=="cash"){
	             	
	            		$("#neft_acc_no9").hide(); 
	            		$("#cheque_no9").hide();
	            		$("#card_no9").hide(); 
	             }
	           	
	          	else if($(this).attr("value")=="selected"){
	             	
	        		$("#neft_acc_no9").hide(); 
	        		$("#cheque_no9").hide();
	        		$("#card_no9").hide(); 
	         }
	          
	       });
	   }).change();
		});	
		</script>
          
			<div class="row">
				<div id="cheque_no9" >							
					<div class="form-group">
						<div class="col-lg-offset-3 col-lg-3 col-md-offset-4 col-md-3 col-sm-offset-4 col-sm-8">	
							<div class="input-group">
								<span class="input-group-addon">
									<span class="glyphicon nogyphicon">No</span>
								</span>
								<input class="form-control" type="text" name="chequeNum9" id="chequeNum9" placeholder="Cheque No." />  
							</div>
						</div>
					</div>			
					<div class="form-group">
						<div class="col-lg-offset-3 col-lg-3 col-md-offset-4 col-md-3 col-sm-offset-4 col-sm-8">	
							<div class="input-group">
								<span class="input-group-addon">
									<i class="glyphicon glyphicon-user"></i>
								</span>
								<input class="form-control" type="text" name="nameOnCheck9" id="nameOnCheck9" placeholder="Name On check" />  
							</div>
						</div>
					</div>
				</div>							
				
				<div id="card_no9">
												<!-- <div class="col-md-2 ">
													<label class="control-label">Card No:</label>
												</div> -->
					<div class="form-group">
						<div class="col-lg-offset-3 col-lg-3 col-md-offset-4 col-md-3 col-sm-offset-4 col-sm-8">	
							<div class="input-group">
								<span class="input-group-addon">
									<span class="glyphicon nogyphicon">No</span>
								</span>
								<input class="form-control" type="text" name="cardNum9" id="cardNum9" placeholder="Card No." />  
							</div>
						</div>
					</div>
				</div>
											
				<div id="neft_acc_no9">
					<div class="form-group">							
						<div class="col-lg-offset-3 col-lg-3 col-md-offset-4 col-md-3 col-sm-offset-4 col-sm-8">	
							<div class="input-group">
								<span class="input-group-addon">
									<span class="glyphicon nogyphicon">No</span>
								</span>
								<input class="form-control" type="text" name="accNum9" id="accNum9" placeholder="Account No." />  
							</div>
						</div>
					</div>							
					
					<div class="form-group">	
						<div class="col-lg-offset-3 col-lg-3 col-md-offset-4 col-md-3 col-sm-offset-4 col-sm-8">	
							<div class="input-group">
								<span class="input-group-addon">
									<i class="glyphicon glyphicon-user"></i>
								</span>
								<input class="form-control" type="text" name="bankName9" id="bankName9" placeholder="Name Of Bank" />  
							</div>
						</div>
					</div>
				</div>
			</div>
		
		</div>						
								
		<div class="row buttons-margin" align="center">
            <input type="button" id="saveBT" name="saveBT" class="btn btn-success" onclick="addBankTransactionsV()" value="Submit">
	        <input type="reset" id="cancelBT" name="cancelBT" class="btn btn-danger" name="btn4" value="Cancel">
			<input type="button" value="List" id="listBtn" class="btn btn-primary" onclick="banklist()" />                       	     	    
        </div> 
			
     </form>
	</div>
<!------------------------------------------------- BANK PAYMENT Ends Here ------------------------------------------------->     
          
   </div>
  </div>
 </div>
</div>

	</div>
</body>
<jsp:include page="commons/footer.jsp"></jsp:include>