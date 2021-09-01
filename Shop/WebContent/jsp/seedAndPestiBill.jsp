 <%@page
	import="com.Fertilizer.hibernate.ExpenseDetailForBillingAndGoodsReceiveBean"%>
<%@page
	import="com.Fertilizer.dao.ExpenseDetailForBillingAndGoodsReceiveDao"%>
<% boolean isHome=false;%>
<%@include file="commons/header.jsp"%>
<%@page import="com.Fertilizer.dao.CustomerDetailsDao"%>
<%@page import="com.Fertilizer.dao.SeedPesticideBillDAO"%>
<%@page import="com.Fertilizer.hibernate.CustomerDetailsBean"%>
<%@page import="java.util.List"%>
<%@page import="com.Fertilizer.dao.ProductDetailsDao"%>
<%@page import="com.Fertilizer.hibernate.ProductDetailsBean"%>
<%@page import="com.Fertilizer.dao.TaxCreationDao"%>
<%@page import="com.Fertilizer.hibernate.TaxCreationBean"%>
<%@page import="com.Fertilizer.bean.CustomerBillBean"%>
<head>
<meta charset="utf-8">


<script type="text/javascript"
	src="/Shop/staticContent/js/jquery-1.12.3.min.js"></script>
<link rel="stylesheet"
	href="/Shop/staticContent/css/jquery-ui.min.css">
<link rel="stylesheet"
	href="/Shop/staticContent/css/ui.jqgrid.min.css">
<link rel="stylesheet"
	href="/Shop/staticContent/y_css/jquery-ui.css">
<link rel="stylesheet"
	href="/Shop/staticContent/css/ui.jqgrid.css">
<script type="text/javascript"
	src="/Shop/staticContent/js/jquery.min.js"></script>
<script type="text/javascript"
	src="/Shop/staticContent/js/jquery-ui-min.js"></script>
<script type="text/javascript"
	src="/Shop/staticContent/js/jquery-ui.js"></script>
<script type="text/javascript"
	src="/Shop/staticContent/js/jqueryUi.js"></script>
<script type="text/javascript"
	src="/Shop/staticContent/js/jquery.jqgrid.min.js"></script>


<script type="text/javascript"
	src="/Shop/staticContent/js/seedandpestiBill.js"></script>

<script type="text/javascript">
	  	function openStockReport() {
	  		 window.location = '/Shop/jsp/stockReport.jsp';
		}
	  	</script>
<script>
	 /*  	Calculations for cash */
		function transExpenseAddingToGrossTotal(){
			
			var transExpence = document.getElementById("transExpence").value;
			var hamaliExpence = document.getElementById("hamaliExpence").value;
	
		if(hamaliExpence == ""){
				var total = document.getElementById("totalWithExpense").value;
				var totalWithExpense = Number(total) + Number(transExpence);
				document.getElementById("grossTotal").value = totalWithExpense;
			}	
		
			if(hamaliExpence != ""){
				var total = document.getElementById("totalWithExpense").value;
				var hamaliTotal = Number(total) + Number(hamaliExpence);
				var totalWithExpense = Number(transExpence) + Number(hamaliTotal);
				document.getElementById("grossTotal").value = totalWithExpense;
			}	
		}

		function hamaliExpenseAddingToGross(){
			var hamaliExpence = document.getElementById("hamaliExpence").value;
			var transExpence = document.getElementById("transExpence").value;
		
			if(transExpence == ""){
				var total = document.getElementById("totalWithExpense").value;
				var totalWithExpense = Number(total) + Number(hamaliExpence);
				document.getElementById("grossTotal").value = totalWithExpense;
			}
			if(transExpence != ""){
				var total = document.getElementById("totalWithExpense").value;
				var totalWithExpense = Number(total) + Number(transExpence);
				var totalWithExpense1 = Number(totalWithExpense) + Number(hamaliExpence);
				document.getElementById("grossTotal").value = totalWithExpense1;
			}
	
		}
	
		
	/* 	Calculations for Credit */
			function transExpenseAddingToGrossTotalForCredit(){
			
			var transExpence = document.getElementById("transExpence1").value;
			var hamaliExpence = document.getElementById("hamaliExpence1").value;
	
		if(hamaliExpence == ""){
				var total = document.getElementById("totalWithExpense1").value;
				var totalWithExpense = Number(total) + Number(transExpence);
				document.getElementById("grossTotal1").value = totalWithExpense;
			}	
		
			if(hamaliExpence != ""){
				var total = document.getElementById("totalWithExpense1").value;
				var hamaliTotal = Number(total) + Number(hamaliExpence);
				var totalWithExpense = Number(transExpence) + Number(hamaliTotal);
				document.getElementById("grossTotal1").value = totalWithExpense;
			}	
	
	
		}

		function hamaliExpenseAddingToGrossForCredit(){
			var hamaliExpence = document.getElementById("hamaliExpence1").value;
			var transExpence = document.getElementById("transExpence1").value;
		
			if(transExpence == ""){
				var total = document.getElementById("totalWithExpense1").value;
				var totalWithExpense = Number(total) + Number(hamaliExpence);
				document.getElementById("grossTotal1").value = totalWithExpense;
			}
			if(transExpence != ""){
				var total = document.getElementById("totalWithExpense1").value;
				var totalWithExpense = Number(total) + Number(transExpence);
				var totalWithExpense1 = Number(totalWithExpense) + Number(hamaliExpence);
				document.getElementById("grossTotal1").value = totalWithExpense1;
			}
	
		}

</script>
<script type="text/javascript">
function pageLoad(){
	$("#CashCustDetail").show();
	$("#CreditCustDetail").hide(); 
}
function openCashCustomerBilling() {
	$("#CashCustDetail").show();
	$("#CreditCustDetail").hide(); 
	location.reload();
}
function openCreditCustomerBilling() {
	$("#CreditCustDetail").show();
	$("#CashCustDetail").hide();
}
</script>
</head>

<%
        Long customerBill = 1l;
	 %>
	 <%
       SeedPesticideBillDAO dao1 = new SeedPesticideBillDAO();

       List bill = dao1.getSeedPesticideCustomerBill();

       for(int i=0;i<bill.size();i++){
       CustomerBillBean sa=(CustomerBillBean)bill.get(i);
       customerBill= sa.getBillNo();

       customerBill++;

       }
       %>      




<body
	onload="pageLoad();garProductNameForCash();garProductNameForCredit()">
	<div class="row header_margin_top">
		<div align="center">
			<h2 class="form-name style_heading">Seed Billing</h2>
		</div>
		
			 <div align="right" style="margin-right: 150px;">
			  		<h3 style="color: red;">Bill No :: <%out.println(customerBill); %></h3>
                 </div>
         
	</div>
	<div class="row">
		<div class="col-sm-offset-1 col-md-10">
			<hr style="border-top-color: #c1b1b1;">
		</div>
	</div>


	<div class="container col-sm-offset-1 ">

		<div class="row form-group col-sm-offset-1">

			<label class="col-md-2 control-label" for="customertype">Customer
				Type<sup>*</sup>
			</label>
			<div class="col-md-3">
				<div class="col-xs-6 ">
					<label class="radio-inline"> <input type="radio"
						name="customertype" id="customertype" checked="checked"
						onclick="openCashCustomerBilling()">Cash
					</label>
				</div>
				<div class="col-xs-6 col-md-ffset-1 ">
					<label class="radio-inline"> <input type="radio"
						name="customertype" id="customertype"
						onclick="openCreditCustomerBilling()">Credit
					</label>
				</div>
			</div>
		</div>

		<!------------------			Code for Cash customers ------------------>

		<div id="CashCustDetail">

			<form class="form-horizontal" method="post" action=""
				name="pestiBill">
				<fieldset>
					<!-- 			  <div class="row form-group">
         		<label class="col-md-3 control-label" for="billType">Bill Type<sup>*</sup></label>
         			<div class="col-md-3">
						<div class="col-xs-6 ">	
							<label class="radio-inline">						
								<input type="radio" name="customertype" id="retailforSeed" checked="checked" onchange="hidePercentageBox()" >Retail
							</label>
						</div>	
      					<div class="col-xs-6 col-md-ffset-1 ">	
							<label class="radio-inline">						
								<input  type="radio" name="customertype" id="vatforSeed" onchange="showPercentageBox()" >Vat
							</label>
						</div>	
              		</div> 
              </div> -->

					<div class="row form-group">
						<label class="col-md-3 control-label" for="customerName">
							Customer Name<sup>*</sup>
						</label>
						<div class="col-md-3">
							<div class="input-group">
								<span class="input-group-addon"> <i
									class="glyphicon glyphicon-user"></i>
								</span> <input id="customerName" name="customerName"
									placeholder="Customer Name" class="form-control input-md"
									type="text">
							</div>
						</div>

						<label class="col-md-2 control-label" for="village">Village/City<sup>*</sup></label>
						<div class="col-md-3">
							<div class="input-group">
								<span class="input-group-addon"> <i
									class="glyphicon glyphicon-map-marker"></i>
								</span> <input id="village" name="village" placeholder="Village"
									class="form-control input-md ac_district" type="text">
							</div>
						</div>
					</div>

					<div class="row form-group">
						<label class="col-md-3 control-label" for="contactNo">Contact
							No.<sup>*</sup>
						</label>
						<div class="col-md-3">
							<div class="input-group">
								<span class="input-group-addon"> <i
									class="glyphicon glyphicon-earphone"></i>
								</span> <input id="contactNo" name="contactNo"
									placeholder="Contact No." class="form-control input-md"
									type="text">
							</div>
						</div>

						<label class="col-md-2 control-label" for="aadharNo">Aadhar
							No.<sup>*</sup>
						</label>
						<div class="col-md-3">
							<div class="input-group">
								<span class="input-group-addon"> No. </span> <input
									id="aadharNo" name="aadharNo" placeholder="Aadhar No."
									class="form-control input-md" type="text">
							</div>
						</div>

					</div>

					<div class="row form-group">
						<label class="col-md-3 control-label" for="productName">Product
							Name<sup>*</sup>
						</label>
						<div class="col-md-8">
							<div class="input-group">
								<span class="input-group-addon"> <i
									class="	glyphicon glyphicon-hand-right"></i>
								</span> <select class="form-control" id='proName' name="proName"
									onchange="getBatchNumberAndStock()">
								</select>

							</div>
						</div>

					

					</div>
					<div class="row form-group">
						<label class="col-md-3 control-label" for="batchNo">Batch
							no.<sup>*</sup></label>
						<div class="col-md-8">
							<div class="input-group">
								<span class="input-group-addon"> <i
									class="	glyphicon glyphicon-hand-right"></i>
								</span> <select class="form-control" id="batchNo" name="batchNo"
									onchange="getProductDetailForSeedBill()">
								</select>
							</div>
						</div>
					</div>
				<div class="row form-group">
				<label class="col-md-3 control-label"  for="barcode" ><b>Barcode</b><sup>*</sup></label>  
							           	 <div class="col-md-3">
											<div class="input-group">
												<span class="input-group-addon">
													No.
												</span>
					              				<input id="seedBarcode" name="barcode" placeholder="Barcode" class="form-control input-md" type="text" onchange="getSeedProDetailAsPerBarcode()">
					            			</div>
					            		</div> 
				</div>

					<!-- 	<div style='position:absolute; top:440px; left:108px; '> -->
					<table id="credit"></table>
					<div id="jqGridPager"></div>
					<!-- </div> -->
					<div class="row form-group"></div>

					<div class="row form-group">
						<div class="col-md-3 control-label">
							<label for="paymentMode"> Payment Mode<sup>*</sup></label>
						</div>

						<div class="col-md-3">
							<div class="input-group">
								<span class="input-group-addon"> <i
									class="glyphicon glyphicon-usd"></i>
								</span> <select class="form-control" id="paymentMode">
									<option value="selected">-Select Type--</option>
									<option value="cash">Cash</option>
									<option value="cheque">Cheque</option>
									<option value="card">Card</option>
									<option value="neft">NEFT</option>
								</select>
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


					</div>

					<div class="row form-group">

						<div id="cheque_no">
							<!-- <div class="col-md-1">										
										<label class="control-label">Cheque No.:</label>
									</div> -->

							<div class="col-md-3 col-md-offset-3  first">
								<input class="form-control" type="text" name="chequeNum"
									id="chequeNum" placeholder="Cheque No." /><sup>*</sup>
							</div>

							<!-- <div class="col-md-1">
										<label class="control-label">Date:</label>
									</div>
									<div class="col-md-3 first">	
										<input class="form-control" type="text" name="cdate" id="chequedate" placeholder="yyyy-mm-dd" />  
									</div> -->
							<!-- <div class="col-md-1">
										<label class="control-label">Name:</label>
									</div> -->
							<div class="col-md-3 col-md-offset-2  first">
								<input class="form-control" type="text" name="nameOnCheck"
									id="nameOnCheck" placeholder="Name On check" /><sup>*</sup>
							</div>
						</div>

						<div id="card_no" class="form-group">
							<!-- <div class="col-md-2">
													<label class="control-label">Card No:</label>
												</div> -->
							<div class="col-md-3 col-md-offset-3  first">
								<input class="form-control" type="text" name="cardNum"
									id="cardNum" placeholder="Card No." /><sup>*</sup>
							</div>

						</div>

						<div id="neft_acc_no" class="form-group">
							<!-- <div class="col-md-2 ">
													<label class="control-label">Account No:</label>
												</div> -->
							<div class="col-md-3 col-md-offset-3  first">
								<input class="form-control" type="text" name="accNum"
									id="accNum" placeholder="Account No." /><sup>*</sup>
							</div>
							<!-- <div class="col-md-1 ">
													<label class="control-label">Bank Name</label>
												</div> -->
							<div class="col-md-3 col-md-offset-2  first">
								<input class="form-control" type="text" name="bankName"
									id="bankName" placeholder="Name Of Bank" /><sup>*</sup>
							</div>
						</div>
					</div>


					<div class="row form-group">
						<label class="col-md-2 col-md-offset-6 control-label" for="total"><b>Total</b></label>
						<div class="col-md-3">
							<div class="input-group">
								<span class="input-group-addon"> Rs </span> <input
									id="totalWithExpense" readonly="readonly"
									class="form-control input-md" type="text">
							</div>
						</div>
					</div>
					<div class="row form-group">
						<label class="col-md-3 col-md-offset-5 control-label"
							for="transExpence"><b>Transportation Expenses</b><sup>*</sup></label>
						<div class="col-md-3">
							<div class="input-group">
								<span class="input-group-addon"> Rs </span> <input
									id="transExpence" name="transExpence"
									placeholder="Transportation Expenses"
									class="form-control input-md" type="text"
									onchange="transExpenseAddingToGrossTotal()">
							</div>
						</div>
					</div>
					<div class="row form-group">
						<label class="col-md-2 col-md-offset-6 control-label"
							for="hamaliExpence"><b>Hamali Expenses</b><sup>*</sup></label>
						<div class="col-md-3">
							<div class="input-group">
								<span class="input-group-addon"> Rs </span> <input
									id="hamaliExpence" name="hamaliExpence"
									placeholder="Hamali Expenses" class="form-control input-md"
									type="text" onchange="hamaliExpenseAddingToGross()">
							</div>
						</div>
					</div>


					<div class="row form-group">
						<label class="col-md-offset-6 col-md-2 control-label"
							for="grossTotal"><h4>
								<b>Gross Total</b>
							</h4></label>
						<div class="col-md-3">
							<div class="input-group">
								<span class="input-group-addon"> Rs </span> <input
									readonly="readonly" id="grossTotal" name="grossTotal"
									placeholder="Gross Total" class="form-control input-md"
									type="text" style="font-size: 25px; height: 55px;">
							</div>
						</div>
					</div>

					<div class="form-group row">
						<div class="col-md-10 text-center">
							<input type="button" name="btn1" style="font-size: 25"
								class="btn btn-large btn-success button-height-width"
								onclick="addSeedAndPestiBill()" value="Submit"> <input
								type="reset" style="font-size: 25"
								class="btn btn-large btn-danger  button-height-width" id="save"
								value="Cancel" onclick="reset()"> <input type="button"
								id="btn" style="font-size: 25"
								class="btn btn-large btn-success button-height-width" name="btn"
								onclick="openStockReport()" value="Stock Report">

						</div>
					</div>
				</fieldset>
			</form>
		</div>



		<!------------------			Code for Credit customers ------------------>

		<div id="CreditCustDetail">
			<form class="form-horizontal" method="post" action=""
				name="pestiBillforCredit">
				<fieldset>
					<!-- 		  <div class="row form-group">
         		<label class="col-md-3 control-label" for="billType">Bill Type<sup>*</sup></label>
         			<div class="col-md-3">
						<div class="col-xs-6 ">	
							<label class="radio-inline">						
								<input type="radio" name="customertype" id="retailforSeedCredit" checked="checked" onchange="hidePercentageBox1()" >Retail
							</label>
						</div>	
      					<div class="col-xs-6 col-md-ffset-1 ">	
							<label class="radio-inline">						
								<input  type="radio"  name="customertype" id="vatforSeedCredit" onchange="showPercentageBox1()"  >Vat
							</label>
						</div>	
              		</div> 
              </div>	 -->

					<div class="row form-group">
						<label class="col-md-3 control-label" for="creditCustomerName">
							Customer Name<sup>*</sup>
						</label>
						<div class="col-md-3">
							<div class="input-group">
								<span class="input-group-addon"> <i
									class="glyphicon glyphicon-user"></i>
								</span>


								<!-- Following code is to get customers from "customer_details" table of "fertilizer" DB -->
								<!-- getAllCustomer() is implemented in  CustomerDetailsDao with return type List-->

								<%
							CustomerDetailsDao dao = new CustomerDetailsDao();
           						List cust =dao.getAllCustomer(request);
							
							%>

								<input type="text" id="creditCustomer" list="cust_drop1"
									class="form-control"
									onchange="custDetail.getAadhar();custDetail.getVillageName();custDetail.getContactNo();custDetail.getName()">
								<datalist id="cust_drop1">

									<%
					           for(int i=0;i<cust.size();i++){
					        	   CustomerDetailsBean bean =(CustomerDetailsBean)cust.get(i);
							%>
									<option data-value="<%=bean.getCustId()%>"><%=bean.getFirstName() %>
										<%=bean.getLastName() %>
									</option>
									<%
				      			}
				    		%>
								</datalist>
							</div>
						</div>

						<label class="col-md-2 control-label" for="village1">Village/City<sup>*</sup></label>
						<div class="col-md-3">
							<div class="input-group">
								<span class="input-group-addon"> <i
									class="glyphicon glyphicon-map-marker"></i>
								</span> <input id="village1" name="village1"
									class="form-control input-md ac_district" type="text">
							</div>
						</div>
					</div>

					<div class="row form-group">
						<label class="col-md-3 control-label" for="contactNo1">Contact
							No.<sup>*</sup>
						</label>
						<div class="col-md-3">
							<div class="input-group">
								<span class="input-group-addon"> <i
									class="glyphicon glyphicon-earphone"></i>
								</span> <input id="contactNo1" name="contactNo1"
									class="form-control input-md" type="text">
							</div>
						</div>

						<label class="col-md-2 control-label" for="aadharNo1">Aadhar
							No.<sup>*</sup>
						</label>
						<div class="col-md-3">
							<div class="input-group">
								<span class="input-group-addon"> No. </span> <input
									id="aadharNo1" name="aadharNo1" placeholder="Aadhar No."
									class="form-control input-md" type="text">
							</div>
						</div>

					</div>

					<div class="row form-group">
						<label class="col-md-3 control-label" for="productName">Product
							Name<sup>*</sup>
						</label>
						<div class="col-md-8">
							<div class="input-group">
								<span class="input-group-addon"> <i
									class="	glyphicon glyphicon-hand-right"></i>
								</span> <select class="form-control" id='proName1' name="proName"
									onchange="getBatchNumberAndStock1()">
								</select>
							</div>
						</div>
					</div>
					<!--             <div class="row form-group">
            		<label class="col-md-2 control-label" for="batchNo1">Batch no.</label>  
           			 <div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="	glyphicon glyphicon-hand-right"></i>
							</span>
           		 		<select class="form-control" id="batchNo1"  name="batchNo" onchange="gridForCredit()" >
									</select>
           		 		</div>
					</div>
        	  </div>   -->

					<div class="row form-group">
						<label class="col-md-3 control-label" for="batchNo1">Batch
							no.<sup>*</sup></label>
						<div class="col-md-8">
							<div class="input-group">
								<span class="input-group-addon"> <i
									class="	glyphicon glyphicon-hand-right"></i>
								</span> <select class="form-control" id="batchNo1" name="batchNo1"
									onchange="gridForCredit();">
								</select>
							</div>
						</div>
					</div>
					
					<div class="row form-group">
				<label class="col-md-3 control-label"  for="barcode" ><b>Barcode</b><sup>*</sup></label>  
							           	 <div class="col-md-3">
											<div class="input-group">
												<span class="input-group-addon">
													No.
												</span>
					              				<input id="seedCreditBarcode" name="barcode" placeholder="Barcode" class="form-control input-md" type="text" onchange="getSeedProDetailAsPerBarcodeForCredit()">
					            			</div>
					            		</div> 
				</div>
        <script type="text/javascript">
   
         $('#batchNo1').on('change','select', function() { 
        	 gridForCredit();  // get the current value of the input field.
    	});
     </script>


					<!-- 	<div style='position:absolute; top:440px; left:108px; '> -->
					<table id="credit1"></table>
					<div id="jqGridPager"></div>
					<!-- </div> -->
					<div class="row form-group"></div>
					<!-- Customer first name is hidden	 -->
					<div class="row form-group">
						<label class="col-md-3 control-label" style="display: none"
							for="customerNameHidden">Customer Name</label>
						<div class="col-md-3" style="display: none">
							<div class="input-group">
								<span class="input-group-addon"> <i
									class="glyphicon glyphicon-user"></i>
								</span> <input id="customerNameHidden" name="customerNameHidden"
									class="form-control input-md" type="text">
							</div>
						</div>

						<label class="col-md-2 col-md-offset-6 control-label" for="total"><b>Total</b></label>
						<div class="col-md-3">
							<div class="input-group">
								<span class="input-group-addon"> Rs </span> <input
									id="totalWithExpense1" readonly="readonly"
									class="form-control input-md" type="text">
							</div>
						</div>
					</div>

					<div class="row form-group">
						<label class="col-md-3 col-md-offset-5 control-label"
							for="transExpence"><b>Transportation Expenses</b><sup>*</sup></label>
						<div class="col-md-3">
							<div class="input-group">
								<span class="input-group-addon"> Rs </span> <input
									id="transExpence1" name="transExpence"
									placeholder="Transportation Expenses"
									class="form-control input-md" type="text"
									onchange="transExpenseAddingToGrossTotalForCredit()">
							</div>
						</div>
					</div>
					<div class="row form-group">
						<label class="col-md-2 col-md-offset-6 control-label"
							for="hamaliExpence"><b>Hamali Expenses</b><sup>*</sup></label>
						<div class="col-md-3">
							<div class="input-group">
								<span class="input-group-addon"> Rs </span> <input
									id="hamaliExpence1" name="hamaliExpence"
									placeholder="Hamali Expenses" class="form-control input-md"
									type="text" onchange="hamaliExpenseAddingToGrossForCredit()">
							</div>
						</div>
					</div>



					<!-- 	 To show and hide percentage Box -->
					<%-- 		<script >
			function taxPercentageBox(){
				$("#vatId2").hide();
			}
			
			function hidePercentageBox1(){
				$("#vatId2").hide();
			}
			
			function showPercentageBox1(){
				$("#vatId2").show();
			}
			</script>
           	<div id="vatId2" class="row form-group" >
					<label class=" col-md-3 control-label"  for="grossTotal"><b>Tax %</b></label>  
			           	 
							<%
							TaxCreationDao taxdao2 = new TaxCreationDao();
		           						List taxlist2 =taxdao2.getAllMainTax();
						
					           for(int i=0;i<taxlist2.size();i++){
					        	   TaxCreationBean taxBean2 =(TaxCreationBean)taxlist2.get(i);
							%>
						<div class="col-md-3">
							<div class="input-group">
								<span class="input-group-addon">
									%
								</span>
	              				<input type="text" value="<%=taxBean2.getTaxPercentage()%>" id="taxPercentage1" style="height:30;width: 175px">
							<%
				      			}
				    		%>
			          
	            			</div>
	            		</div>
	            		
	            <label class=" col-md-2 control-label"  for="taxAmount" ><b>Tax Amount</b><sup>*</sup></label>  
			           	 <div class="col-md-3">
							<div class="input-group">
								<span class="input-group-addon">
									Rs
								</span>
	              				<input id="taxAmount1" readonly="readonly" class="form-control input-md" type="text">
	            			</div>
	            		</div>
            	</div> --%>

					<div class="row form-group">
						<label class="col-md-offset-6 col-md-2 control-label"
							for="grossTotal1"><h4>
								<b>Gross Total</b>
							</h4></label>
						<div class="col-md-3">
							<div class="input-group">
								<span class="input-group-addon"> Rs </span> <input
									readonly="readonly" id="grossTotal1" name="grossTotal"
									placeholder="Gross Total" class="form-control input-md"
									type="text" style="font-size: 25px; height: 55px;">
							</div>
						</div>
					</div>

					<div class="form-group row">
						<div class="col-md-10 text-center">

							<input type="button" id="save" name="custbtn"
								style="font-size: 25"
								class="btn btn-large btn-success button-height-width"
								onclick="addBillForCreditCustomer()" value="Submit"> <input
								type="reset" name="btn" style="font-size: 25"
								class="btn btn-large btn-danger  button-height-width" id="save"
								value="Cancel" onclick="reset()"> <input type="button"
								id="btn" style="font-size: 25"
								class="btn btn-large btn-success button-height-width" name="btn"
								onclick="openStockReport()" value="Stock Report">
						</div>
					</div>
				</fieldset>
			</form>
		</div>


	</div>
</body>
<jsp:include page="commons/footer.jsp"></jsp:include>