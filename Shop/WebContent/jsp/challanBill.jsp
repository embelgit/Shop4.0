<%@page import="com.Fertilizer.dao.challanDao"%>
<%@page import="com.Fertilizer.helper.ProductDetailsHelper"%>
<%@page import="com.Fertilizer.bean.GetProductDetails"%>
<%@page import="com.itextpdf.text.log.SysoLogger"%>
<%@page import="com.Fertilizer.hibernate.FertilizerBillBean"%>
<%@page import="java.util.Date"%>
<%@page import="org.apache.commons.beanutils.BeanAccessLanguageException"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="com.Fertilizer.hibernate.shopDetailsBean"%>
<%@page import="com.Fertilizer.dao.shopDetailsDao"%>
<%@page import="com.Fertilizer.hibernate.ExpenseDetailForBillingAndGoodsReceiveBean"%>
<%@page import="com.Fertilizer.dao.ExpenseDetailForBillingAndGoodsReceiveDao"%>
<% boolean isHome=false;%>
<%@include file="commons/header.jsp"%>
<%@page import="com.Fertilizer.dao.CustomerDetailsDao"%>
<%@page import="com.Fertilizer.dao.FertilizerBillDao"%>
<%@page import="com.Fertilizer.hibernate.CustomerDetailsBean"%>
<%@page import="java.util.List"%>
<%@page import="com.Fertilizer.dao.ProductDetailsDao"%>
<%@page import="com.Fertilizer.hibernate.ProductDetailsBean"%>
<%@page import="com.Fertilizer.dao.TaxCreationDao"%>
<%@page import="com.Fertilizer.hibernate.TaxCreationBean"%>
<%@page import="com.Fertilizer.bean.CustomerBillBean"%>
<%@page import="java.util.List"%>
<%@page import="java.text.SimpleDateFormat"%>   
                                         
	<head>
 	 <meta charset="utf-8">
	 <script type="text/javascript" src="/Shop/staticContent/js/jquery-1.12.3.min.js"></script>
	 <link rel="stylesheet" href="/Shop/staticContent/css/jquery-ui.min.css">
     <link rel="stylesheet" href="/Shop/staticContent/css/ui.jqgrid.min.css">
     <link rel="stylesheet" href="/Shop/staticContent/y_css/jquery-ui.css">
     <link rel="stylesheet" href="/Shop/staticContent/css/ui.jqgrid.css">
     <script type="text/javascript" src="/Shop/staticContent/js/jquery.min.js"></script>
   	 <script type="text/javascript" src="/Shop/staticContent/js/bootstrap.js"></script>
   	 <script type="text/javascript" src="/Shop/staticContent/js/bootbox.min.js"></script>
   	<!--  <script type="text/javascript" src="/Shop/staticContent/js/jquery-ui-min.js"></script> -->
   	 <script type="text/javascript" src="/Shop/staticContent/js/jquery-ui.min.js"></script>
     <script type="text/javascript" src="/Shop/staticContent/js/jquery-ui.js"></script>
     <script type="text/javascript" src="/Shop/staticContent/js/jqueryUi.js"></script>
     <script type="text/javascript" src="/Shop/staticContent/js/jquery.jqgrid.min.js"></script>
     
	 <script type="text/javascript" src="/Shop/staticContent/js/fertilizerBill.js"></script>
	 <script type="text/javascript" src="/Shop/staticContent/js/customerDetails.js"></script>
<link rel="stylesheet" href="/Shop/staticContent/css/shopstyle.css">
<script type="text/javascript">
    function mypopup(url)
    {
        /* width = window.screen.width;
        height = window.screen.height; */
        width ='1050px';
        height = '600px';
        mywindow = window.open(url, "Title","location=0,status=1,scrollbars=1,resizable=1,menubar=0,toolbar=no,width="+ width + ",height=" + height);
        mywindow.moveTo(140, 50);
        mywindow.focus();
    }
</script>

<script type="text/javascript">
    function customerDetailsDivAction(a)
	{	
		if(a==1){
			$( "#customerDetailsDiv" ).dialog({height: 480, width:1000}); 	
	    }else{
	    	$( "#customerDetailsDiv" ).dialog('close');
	    }
		$('#customerfresh').load(document.URL +  ' #customerfresh');
	}
</script>
<script type="text/javascript">
function cancle(){
	location.reload()
}
function changeDisAndHamaliCredit()
 {
	document.getElementById("discount1").value = 0;
	document.getElementById("discountAmount1").value = 0;
	document.getElementById("hamaliExpence3").value = 0;
	document.getElementById("hamaliExpence1").value = 0;

	var total = document.getElementById("totalWithExpense1").value;
	document.getElementById("grossTotal1").value = total;
}	

function discountCalculationForCredit()
{
	var total = document.getElementById("totalWithExpense1").value;
	var discountAmount = document.getElementById("discountAmount1").value;
	var discount = $('#discount1').val();

	if(discountAmount == "")
	{
		//document.getElementById("discountAmount1").value = "";
		discountAmount = 0;
		var hamaliExpence = document.getElementById("hamaliExpence3").value;
		var hamali = document.getElementById("hamaliExpence1").value;
		var totalHamali = Number(hamaliExpence) + Number(hamali);
		if(hamaliExpence == "")
		{
			totalHamali = 0;
		}

		var totalminusDiscount = ((Number(total) + Number(totalHamali)) - Number(discountAmount));								
		document.getElementById("grossTotal1").value = totalminusDiscount;
		document.getElementById("discountAmount1").value = 0.0;
		document.getElementById("discount1").value = 0.0;
	}
	if(discountAmount != "")
	{
   	    //var checkDiscount = /^[0-9]+$/;
   	    //var checkDiscountAmt = /^[-+]?[0-9]+\.[0-9]+$/; 
   	    var checkDiscountAmt = /^[0-9]+\.?[0-9]*$/;
   	    if(discountAmount.match(checkDiscountAmt))
   	    {
       	    if(Number(discountAmount) >= Number(total))
       	    {
       	    	var msg="Discount Amount Must be Less than Total Amount";
				var dialog = bootbox.dialog({
					message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
				    closeButton: false
				});
				
				setTimeout(function() {
					dialog.modal('hide');
				}, 1500);

					document.getElementById("discount1").value = "";
					document.getElementById("discountAmount1").value = "";
					document.getElementById("hamaliExpence3").value = "";
					document.getElementById("hamaliExpence1").value = "";
					var total = document.getElementById("totalWithExpense1").value;
					document.getElementById("grossTotal1").value = total.toFixed(2);

				return false;
       	    }
       	}
   	    else
       	{
   	    	var msg="Please Enter Valid Discount Amount";
			var dialog = bootbox.dialog({
				message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
			    closeButton: false
			});
			
			setTimeout(function() {
				dialog.modal('hide');
			}, 1500);

			document.getElementById("discount1").value = "";
			document.getElementById("discountAmount1").value = "";
			document.getElementById("hamaliExpence3").value = "";
			document.getElementById("hamaliExpence1").value = "";
			var total = document.getElementById("totalWithExpense1").value;
			document.getElementById("grossTotal1").value = total.toFixed(2);
			
			return false;
   	   }

		 //var discountAmount = ((discount/100)*Number(total));
		 var discount = ((100*Number(discountAmount))/Number(total));
   	     var totalminusDiscount = Number(total) - discountAmount;
       					
	document.getElementById("discount1").value = discount.toFixed(2);
	document.getElementById("grossTotal1").value = totalminusDiscount.toFixed(2);
	}
} 

function hamaliExpenseAddingToGrossForCredit()
{
	var hamaliExpence = document.getElementById("hamaliExpence3").value;
	var hamali = document.getElementById("hamaliExpence1").value;
	//Gross total calculation
	var discount = $('#discount1').val();
	var discamnt = document.getElementById("discountAmount1").value;
	
	if(hamaliExpence != "")
		{
			var checkExpense = /^[0-9]+$/;
       	    if(hamaliExpence.match(checkExpense))
       	    {}
       	    else
	       	{
       	    	var msg="Please Enter Valid Hamali Expense";
				var dialog = bootbox.dialog({
					message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
				    closeButton: false
				});
				
				setTimeout(function() {
					dialog.modal('hide');
				}, 1500);

				document.getElementById("discount1").value = "";
   				document.getElementById("discountAmount1").value = "";
   				document.getElementById("hamaliExpence3").value = "";
   				document.getElementById("hamaliExpence1").value = "";
  				
				var total = document.getElementById("totalWithExpense1").value;
				document.getElementById("grossTotal1").value = total.toFixed(2);
  				
				return false;
	       	}
		   
       	    var perc = document.getElementById("gstForExpense1").value;
			if((hamaliExpence == "0" || hamaliExpence == "") && perc == "")
			{
				var total = document.getElementById("totalWithExpense1").value;
				document.getElementById("hamaliExpence1").value= total.toFixed(2);
			}
			var teg = 0;
			if(perc == "" || perc =="0")
			{
				document.getElementById("hamaliExpence1").value = 0;				
			}
			else
			{
				teg=(hamaliExpence*(perc/100));
				document.getElementById("hamaliExpence1").value = teg.toFixed(2);
			}					

			var total = document.getElementById("totalWithExpense1").value;
			var totalWithExpense = (Number(total) + (Number(teg)+Number(hamaliExpence)) - Number(discamnt));
			document.getElementById("grossTotal1").value = totalWithExpense;
		}	
		if(hamaliExpence == "")
		{
			var total = document.getElementById("totalWithExpense1").value;
			var hamali = document.getElementById("hamaliExpence1").value;
			var totalWithExpense = Number(total) - Number(discamnt);
			var totalWithExpense1 = Number(totalWithExpense)+Number(hamali);
			document.getElementById("grossTotal1").value = totalWithExpense1.toFixed(2);
		}			
}	
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

		<%
			challanDao fdao = new challanDao();
		
			Long billNumber = fdao.getCurrentChallanBillNumber(request);
			if(billNumber == null)
			{
				billNumber = 0l;
			}
			else
			{
				billNumber+=1;
			}
		
			System.out.println("CUSTOMER BILL NUMBER JSP =====>  "+billNumber);
		%>


<%-- <%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%> --%>

<style>
.container-fluid {
	overflow: hidden;
}
.btn-mm {
    transition: all 0.2s ease;
    background-color: white ;
    border: 2px solid !important;
    box-shadow: 0 3px  !important;
    border-radius: 23px;
    font-size:16;
     width:79px;
      height:30px;
   
     
}
input[type="radio"] {
     position: absolute;
  visibility: hidden;
}
input[type="radio"] + div {
    position: relative;
}
input[type="radio"]:checked + div {
  background-color: #ffa500;
}
input[type="radio"]:checked + div>span {
  color: white;
}
input[type="radio"] + div>span {
position: relative;
top: 25%;}


</style>
</head>


</head>
<body>
<div class="container-fluid">



<div class="row">
	<div class="row header_margin_top">
	    <div align="center">
			<h2 class="form-name style_heading">Challan</h2>  		
	  	</div>
    </div>
</div>
	
	<div align="right">
 		<h3 class="challanshopid">Challan No : <%=billNumber%></h3>
    </div>
    
    <div class="row" align="center">
		<div class="hr-width">
			<hr class="style-one">
		</div>	
    </div>
    
 <!----------------------------------------------------------- CODE FOR CREDIT CUSTOMER ---------------------------------------------------------->
           
       <div id="CreditCustDetail">
       	<form class="form-horizontal" method="post" action="" name="creditFertiBill1">
			<fieldset>
			 <div class="shopform-margin">               
	 	<div class="row">
			<div class="form-group">
				<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
					<label class="control-label" for="creditCustomerName"> Customer Name<sup>*</sup></label>  
			    </div>  
			    <div id="customerfresh">
           			<div class="col-lg-3 col-md-3 col-sm-8">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-user"></i>
							</span>
							<%
							CustomerDetailsDao dao = new CustomerDetailsDao();
           						List cust = dao.getAllCustomer(request);
							%>
							<input type="text" id="creditCustomer" list="cust_drop1" placeholder="Credit Customer Name" class="form-control" onchange="custDetail.getVillageName();custDetail.getContactNo();custDetail.getName(); getChallanNo();" >
				         	<datalist id="cust_drop1">
							<%
					           for(int i=0;i<cust.size();i++){
					        	   CustomerDetailsBean bean =(CustomerDetailsBean)cust.get(i);
							%>
								<option data-value="<%=bean.getCustId()%>"><%=bean.getFirstName()%> <%=bean.getLastName()%></option>
							<%
				      			}
				    		%>
							</datalist>
							<span class="input-group-addon">
								<button type="button" onclick="customerDetailsDivAction(1)">
									<span class="glyphicon glyphicon-plus"  style="color: #393836;"></span>
								</button>
							</span>
						</div>
					</div>
				</div>
				<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">
					<label class="control-label" for="village1">Address </label>
           	 	</div>
           	 	<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
					<div class="input-group">
						<span class="input-group-addon">
							<i class="glyphicon glyphicon-map-marker"></i>
						</span>
         	   			<input id="village1" name="village1" placeholder="Address" class="form-control input-md ac_district"  type="text">
          		  	</div>
				</div>
         	</div>
         </div>
                 
        <div class="row">
        	<div class="form-group">
				<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
					<label class="control-label" for="creditCustomerName">Shop Name</label>  
           		</div>	
           		<div class="col-lg-3 col-md-3 col-sm-8">
					<div class="input-group">
						<span class="input-group-addon">
							<i class="glyphicon glyphicon-user"></i>
						</span>
						
							<%
								shopDetailsDao dao2 = new shopDetailsDao();
           						List shop1 =dao2.getAllShop(request);
							%>
							
							<input type="text" id="shopName2" list="shop_drop2" value="<%=shopName1%>" readonly="readonly" class="form-control" >
							<datalist id="shop_drop2">
							
							<%
					           for(int i=0;i<shop1.size();i++){
					        	   shopDetailsBean bean =(shopDetailsBean)shop1.get(i);
							%>
								<option data-value="<%=bean.getShopId()%>" value="<%=bean.getShopName() %>" >
							<%
				      			}
				    		%>
							</datalist>
						</div>
				</div>
				<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">
           	 		<label class="control-label" for="village1">GST No</label>
           	 	</div>
           	 	<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
					<div class="input-group">
						<span class="input-group-addon">
							<span class="glyphicon nogyphicon">No</span>
						</span>
         	   			<input id="gstNo2" name="gstNo2"  placeholder="GST No" class="form-control input-md ac_district"  type="text">
          		  	</div>
				</div>
         	</div>
         </div>   
         
            <div class="row">
            	<div class="form-group">
					<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
						<label class="control-label" for="contactNo1">Contact No.</label>  
           	 		</div>
           	 		<div class="col-lg-3 col-md-3 col-sm-8">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-earphone"></i>
							</span>
              				<input id="contactNo1" name="contactNo1" placeholder="Contact No" class="form-control input-md" type="text" maxlength="10">
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
	              		    <input type="date" id="saleDate2" name="saleDate2" value="<%=todayDate%>" placeholder="sale Date" class="form-control input-md">
						</div>
					</div>          
	 			</div>
	 		</div>
	 	
	 	   	<div class="row">
	 	   		<div class="form-group">
              		<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">	
              			<label class="control-label" for="productName">Barcode No:</label>  
					</div>
            		<div class="col-lg-3 col-md-3 col-sm-8">
						<div class="input-group">
							<span class="input-group-addon">
								<span class="glyphicon nogyphicon">No</span>
							</span>
					     	<input type="text" id="barcodeNo1" name="barcodeNo1" placeholder="Enter Barcode No" class="form-control input-md" onchange="getProductDetailsForChallan()">
									<!-- getProductDetailsByBarcodeNo1() -->
						</div>
        			</div>  
        			<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">
        	  		   	<label class="control-label" for="productName">Challan No:</label>  
					</div>
            		<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
						<div class="input-group">
							<span class="input-group-addon">
								<span class="glyphicon nogyphicon">No</span>
							</span>
							<input type="text" id="challanNoC" name="challanNoC" placeholder="Challan Number" class="form-control input-md" readonly="readonly"">
						</div>
        			 </div>  
        	  	</div>
        	</div>
	 	
	 		<div class="row">
	 			<div class="form-group">
              		<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
              			<label class="control-label" for="productName">Product Name<sup>*</sup></label>  
           			</div>
           			<div class="col-lg-3 col-md-3 col-sm-8">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="	glyphicon glyphicon-list-alt"></i>
							</span>
									
									<%
							    ProductDetailsDao cdd = new ProductDetailsDao();
           						List pList = cdd.getAllProductBySCategoryForFertilizerBill(request, response);
								
							%>
									
            						<!-- <select class="form-control" id="proName2" name="proName2" onchange="getProductDetailsByProductNameForCredit()"></select> -->
            				<input list="product_dropCredit" id="productIdCredit" placeholder="Product Name" class="form-control" onchange="getProductDetailsForChallan(),clearGridSelect()">
						 	<datalist id="product_dropCredit">
							<%
					           for(int i=0;i<pList.size();i++)
					           {
					        	   GetProductDetails gpd2=(GetProductDetails)pList.get(i);
					        	  /*  if(gpd2.getQuantityDouble()>0)
					        	   { */
							%>		
								<option data-value="" value="<%=gpd2.getProduct()%> => <%=gpd2.getBarcodeNo()%> => <%=gpd2.getManufacturer()%> => Stock => <%=gpd2.getQuantityDouble()%> => <%=gpd2.getWeight()%> => <%=gpd2.getUnitName() %>  => <%=gpd2.getFkSubCatId()%> => <%=gpd2.getFkCatId()%> => <%=gpd2.getExpiryDate()%> => <%=gpd2.getPacktype()%> => <%=gpd2.getProductId()%>">
								<%-- <option data-value="" value="<%=gpd2.getProduct()%> => <%=gpd2.getExpiryDate()%> => <%=gpd2.getWeight()%> => <%=gpd2.getManufacturer()%> => Stock= <%=gpd2.getQuantityDouble()%>   <%=gpd2.getUnitName() %> => <%=gpd2.getFkSubCatId()%> => <%=gpd2.getFkCatId()%>"> --%>
							<%
				      			//}
					           }
				    		%>			              	
            				</datalist>
            			</div>
            		</div>
            		<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">	
            			<label class="control-label" for="productName">Email ID:</label>  
					</div>
            		<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
						<div class="input-group">
							<span class="input-group-addon">
								<span class="glyphicon nogyphicon">No</span>
							</span>
							<input type="text" id="email" name="email" placeholder="Enter Email" class="form-control input-md">
						</div>
        			 </div>
            	</div>		
        	</div> 
           			
         <div class="table-responsive row" align="center" style="margin-left: 30px; width:1340px" >
				<table id="credit" ></table>
				<div id="jqGridPager1"></div>
			<!-- </div> -->
		</div>
	
          <div class="row form-group" >
          
          </div>
          
         <div class="row">
			<div class="form-group">	
				<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
	        		<label class="control-label" for="paymentModeCredit">Payment Mode</label>  
	        	</div>
	        	<div class="col-lg-3 col-md-3 col-sm-8">
					<div class="input-group">
						<span class="input-group-addon">
							<i class="glyphicon glyphicon-usd"></i>
						</span>
	           			<select class="form-control" id="paymentModeCredit">
							<option value="cash1">Cash</option>
							<option value="cheque1">Cheque</option>
							<option value="card1">Card</option>
							<option value="neft1">NEFT</option>
						</select>	
	           		</div>
				</div>			    	
	 <script>
		
		$(document).ready(function(){
	  		 $("#paymentModeCredit").change(function(){
	       	$(this).find("option:selected").each(function()
	    	{
	           	if($(this).attr("value")=="cheque1"){
	           	
	           	$("#cheque_no1").show(); 
	           	$("#neft_acc_no1").hide(); 
	           	$("#card_no1").hide();
	           	}
	          	 else if($(this).attr("value")=="card1"){
	           	
	          		$("#card_no1").show(); 	          		
	          		$("#neft_acc_no1").hide(); 
	        		$("#cheque_no1").hide();
	           }
	          	 else if($(this).attr("value")=="neft1"){
	                	
	           		$("#neft_acc_no1").show(); 	
	           		$("#card_no1").hide(); 
	        		$("#cheque_no1").hide();
	            }
	          	 else if($(this).attr("value")=="cash1"){
	             	
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

        	<div id="cheque_no1" >
        		<div class="form-group">
	        		<div class="col-lg-offset-3 col-lg-3 col-md-offset-4 col-md-4 col-sm-offset-4 col-sm-8 first">	
						<input class="form-control" type="text" name="chequeNum" id="chequeNum" placeholder="Cheque No." />  
					</div>
				</div>
				<div class="form-group">
					<div class="col-lg-offset-3 col-lg-3 col-md-offset-4 col-md-4 col-sm-offset-4 col-sm-8 first">	
						<input class="form-control" type="text" name="nameOnCheck" id="nameOnCheck" placeholder="Name On check" />  
					</div>
				</div>
			</div>
							
				<div id="card_no1" class="form-group">
					
					<div class="col-lg-offset-3 col-lg-3 col-md-offset-4 col-md-4 col-sm-offset-4 col-sm-8 first">	
						<input class="form-control" type="text" name="cardNum" id="cardNum" placeholder="Card No." />  
					</div>
				</div>
							
				<div id="neft_acc_no1">
					<div class="form-group">
						<div class="col-lg-offset-3 col-lg-3 col-md-offset-4 col-md-4 col-sm-offset-4 col-sm-8 first">	
							<input class="form-control" type="text" name="accNum" id="accNum" placeholder="Account No." />  
						</div>
					</div>
					<div class="form-group">						
						<div class="col-lg-offset-3 col-lg-3 col-md-offset-4 col-md-4 col-sm-offset-4 col-sm-8 first">	
							<input class="form-control" type="text" name="bankName" id="bankName" placeholder="Name Of Bank" />  
						</div>
					</div>
				</div>
		</div>
       
        <div class="row">
         	<div class="form-group">
         		<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
         			<label class="control-label"  for="gstForExpence" ><b>GST for Expense :</b></label>  
			    </div>    
			    <div class="col-lg-3 col-md-3 col-sm-8">
					<div class="input-group">
						<span class="input-group-addon">
							<span class="glyphicon percentage">%</span>
						</span>
						<select class="form-control" id="gstForExpense1"  onchange="changeDisAndHamaliCredit()">
							<option value="0">--Select Type--</option>
							<option value="5">5 %</option>
							<option value="12">12 %</option>
							<option value="18">18 %</option>
							<option value="28">28 %</option>
						</select>
	            	</div>
	            </div>
         	    <div class="">	
         	    	<label class="col-md-3 control-label" style="display:none" for="customerNameHidden">Customer Name</label>  
           	 	</div>	
           	 	<div class="col-md-3" style="display:none">
					<div class="input-group">
						<span class="input-group-addon">
							<i class="glyphicon glyphicon-user"></i>
						</span>
              			<input  id="customerNameHidden" name="customerNameHidden"  class="form-control input-md" type="text" >
            		</div>
            	</div>  
           	   	<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">
           	   		<label class="control-label"  for="total" ><b>Total</b></label>  
			    </div>
			    <div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
					<div class="input-group">
						<span class="input-group-addon">
							<span class="glyphicon nogyphicon">Rs</span>
						</span>
	              		<input id="totalWithExpense1" class="form-control input-md" placeholder="Total" type="text" readonly="readonly" ondragover="GrossTotalWithoutExpenseForCredit()" onchange="callFunction()">
	            	</div>
	            </div>
          	</div>
         </div>
          	       	
  		<div class="row">
  			<div class="form-group">
  				<div class="col-lg-offset-5 col-md-offset-5 col-lg-2 col-md-2 col-sm-4">
					<label class="control-label" for="discount" ><b>Discount</b></label>  
			   	</div>
			   	<div class="col-lg-2 col-md-2 col-sm-4">
					<div class="input-group">
						<span class="input-group-addon">
							<span class="glyphicon nogyphicon">Rs</span>
						</span>
	        			<input id="discountAmount1" name="discountAmount" placeholder="Disc Amt"  class="form-control input-md" type="text" onchange="discountCalculationForCredit()">
	        		</div>
	        	</div>
	        	<label class="control-label" for="discount"><b></b></label>  
			       	 <div class="col-lg-2 col-md-2 col-sm-4">
						<div class="input-group">
							<span class="input-group-addon">
								<span class="glyphicon percentage">%</span>
							</span>
	           				<input id="discount1" name="discount" placeholder="Disc %" class="form-control input-md" type="text" readonly="readonly"/>
	           			</div>
	           	</div>
	         </div>
	     </div>
	            	
		<div class="row">
			<div class="form-group">			 
				<div class="col-lg-offset-5 col-md-offset-5 col-lg-2 col-md-2 col-sm-4">	 
					 <label class="control-label" for="hamaliExpence"><b>Labour Expenses </b></label>  
			    </div>  	 
			    <div class="col-lg-2 col-md-2 col-sm-4">
					<div class="input-group">
						<span class="input-group-addon">
							<span class="glyphicon nogyphicon">Rs</span>
						</span>
	            		<input id="hamaliExpence3" name="hamaliExpence" placeholder="Lab Exp"class="form-control input-md" type="text"  onchange="hamaliExpenseAddingToGrossForCredit()">
	            	</div>
	            </div>
				<label class="control-label" for="hamaliExpence" ><b></b></label>  
			    <div class="col-lg-2 col-md-2 col-sm-4">
					<div class="input-group">
						<span class="input-group-addon">
							<span class="glyphicon nogyphicon">Rs</span>
						</span>
	            		<input id="hamaliExpence1" name="hamaliExpence" placeholder="GST Amt" class="form-control input-md" type="text" readonly="readonly">
	            	</div>
	            </div>
			</div>
        </div>
          	
          	<div class="row">
          		<div class="form-group">	
					<div class="col-lg-offset-5 col-md-offset-5 col-lg-2 col-md-2 col-sm-4">
						<label class="control-label" for="grossTotal1"><h4><b>Gross Total</b></h4></label>
					</div>  
			        <div class="colcol-lg-3 col-md-3 col-sm-8 formspaceinput">
						<div class="input-group">
							<span class="input-group-addon">
								<span class="glyphicon nogyphicon">Rs</span>
							</span>
	              			<input readonly="readonly" id="grossTotal1" name="grossTotal1" placeholder="Gross Total" class="form-control input-md"  type="text" style="font-size: 25px;  height: 55px;" >
	            		</div>
	            	</div>
					<!-- <label class="col-md-offset-6 col-md-2 control-label"  for="firstPaidAmtCreditCustomer"><h4><b>Net Pay Amount</b></h4></label> -->  
			           	 <div class="col-md-3">
	            			<div class="input-group">
								<!-- <span class="input-group-addon">
									Rs
								</span> -->
	              				<input id="firstPaidAmtCreditCustomer" name="firstPaidAmtCreditCustomer" placeholder="Pay Amount" class="form-control input-md"  type="hidden" style="font-size: 25px;  height: 55px;" >
	            			</div>
	            		</div>	            			
            	</div>
            </div>
            
	 	</div>
	 	</fieldset>	 		
	 	</form>	 	
		<div class="row buttons-margin" align="center">
			<input type="button" id="billingCreditBtn" class="btn btn-large btn-success button-height-width" name="billingCreditBtn" onclick="challanBillingV()" value="Print Bill">
		    <input type="reset" id="save" class="btn btn-large btn-danger  button-height-width" name="btn" onclick="cancle()" value="Cancel">	  
					<!-- <input type="button" id="btn" style="font-size: 25;width: 128px; height: 53px;" class="btn btn-large btn-success button-height-width" name="btn" onclick="openStockReport()" value="Stock "> -->		  				 	
        </div>	
	 		
	 </div>
	 
<!-- ====================================================== CUSTOMER DETAILS POP UP ================================================================ -->

<div id="customerDetailsDiv" class="tab-pane fade in active" style="padding-top:0%; display: none;">
    <form class="form-horizontal" method="post" action="" name="cstd" id="cstd">    <!-- Value of 'name' attribute is used in customerDetails.js  -->
        <div class="row">
			<div align="center">
				<h2 class="form-name style_heading">Customer Details</h2>
			</div>
	    </div>
         	 <div class="row form-group" style="padding-top:6%">
           		<label class="col-md-2 control-label" for="firstName"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("firstName") %> <%}%> <%if(abc.equals("english")){%>First Name<%}%><sup>*</sup></label>  
           	 		<div class="col-md-3">
            			<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-user"></i>
							</span>
							<input type="text" id="firstName"  class="form-control" placeholder="Enter First Name">
						</div>
           		 	</div>
           		 	
           		 <label class="col-md-2 control-label" for="middleName"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("middleName") %> <%}%> <%if(abc.equals("english")){%>Middle Name<%}%></label>  
	            	<div class="col-md-3 ">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-user"></i>
							</span>
	              				<input id="middleName" name="middleName" placeholder="Enter Middle Name" class="form-control input-md" type="text" >
	            		</div>
					</div>
				</div>
			
			 <div class="row form-group">
           		<label class="col-md-2 control-label" for="lastName"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("lastName") %> <%}%> <%if(abc.equals("english")){%>Last Name<%}%><sup>*</sup></label>  
           	 		<div class="col-md-3">
            			<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-user"></i>
							</span>
							<input type="text" id="lastName"  class="form-control" placeholder="Enter Last Name">
						</div>
           		 	</div>
           		 	
           		 <label class="col-md-2 control-label" for="address"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("address") %> <%}%> <%if(abc.equals("english")){%>Address<%}%></label>  
	            	<div class="col-md-3 ">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-map-marker"></i>
							</span>
	              				<input id="address" name="address " placeholder="Address" class="form-control input-md" type="text" >
	            		</div>
					</div>
				</div>
			
			<div class="row form-group">
				<label class="col-md-2 control-label" for="contactNo"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("contactNumber") %> <%}%> <%if(abc.equals("english")){%>Contact No.<%}%><sup>*</sup></label>  
           	 		<div class="col-md-3 ">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-earphone"></i>
							</span>
              					<input id="contactNo" name="contactNo" maxlength="10" placeholder="10 Digit Contact No." class="form-control input-md" type="text" >
           				 </div>
           			</div>
           			
           			<label class="col-md-2 control-label" for="gstno"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("gst number") %> <%}%> <%if(abc.equals("english")){%>GST No.<%}%></label>  
	            	<div class="col-md-3 ">
						<div class="input-group">
							<span class="input-group-addon">
								No
							</span>
	              				<input id="gstno" name="gstno " placeholder="GST Number" class="form-control input-md" type="text" >
	            		</div>
					</div>
              </div>

			<div class="row form-group">
				 <label class="col-md-2 control-label" for="emailId"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("email") %> <%}%> <%if(abc.equals("english")){%>Email ID<%}%> </label>  
            	<div class="col-md-3 ">
					<div class="input-group">
						<span class="input-group-addon">
							<i class="glyphicon glyphicon-envelope"></i>
						</span>
             				 <input id="emailId" name="emailId " placeholder="Email ID" class="form-control input-md" type="text">
            		</div>
				</div>
				
				<label class="col-md-2 control-label" for="zipCode"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("pinCode") %> <%}%> <%if(abc.equals("english")){%>Zip Code<%}%></label>  
           		 <div class="col-md-3">
					<div class="input-group">
						<span class="input-group-addon">
							No
						</span>
              				<input id="zipCode" name="zipCode" placeholder="6 Digit Zip code" class="form-control input-md" type="text" maxlength="6">
            		</div>
            	</div>
			</div>
 		
 		<div class="form-group row" style="padding-top:4%">
            <div class="col-md-6 text-center col-md-offset-3">
                <input style="height: 53px; width: 128px; font-size: 25" type="button" id="save1" name="btn" class="btn btn-success" value="Submit" onclick="customerDetails();">
				<input style="height: 53px; width: 128px; font-size: 25" type="reset"  id="save"  name="btn" class="btn btn-danger"  value="Cancel" onclick="reset()">  
		    </div>
        </div>
  </form>
</div>

<!-- ====================================================== END CUSTOMER DETAILS POP UP ================================================================ -->	

</div>
</body>
</html>