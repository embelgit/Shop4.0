<%@page import="com.Fertilizer.helper.ProductDetailsHelper"%>
<%@page import="com.Fertilizer.bean.GetProductDetails"%>
<%@page import="com.itextpdf.text.log.SysoLogger"%>
<%@page import="com.Fertilizer.hibernate.FertilizerBillBean"%>
<%@page import="com.Fertilizer.hibernate.Stock"%>
<%@page import="com.Fertilizer.hibernate.cashCustomerHibernate"%>

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
			FertilizerBillDao fdao = new FertilizerBillDao();
		
			Long billNumber = fdao.getCurrentBillNumber(request);
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

	  	
	  	<script type="text/javascript">
	    function cancle(){
    		location.reload()

    		}
	  	function openStockReport() {
	  		 window.location = '/Shop/jsp/allstockreport.jsp';
		}
	  	 function pay()
	  	 {
	  	 	 window.location = "allPaymentWithLeftTabs.jsp";
	  	 }

	  	</script>
	  	
	  	
	  	<script type="text/javascript">
	 /*  	Calculations for cash */
	 
		function GrossTotalWithoutExpense(){
			/* var transExpence = document.getElementById("transExpence2").value; */
			var hamaliExpence = document.getElementById("hamaliExpence2").value;
			var totalWithExpense = document.getElementById("totalWithExpense").value;

			if(hamaliExpence == "0" ){
				document.getElementById("grossTotal").value = totalWithExpense.toFixed(2);
				}

			}	 

		//DISCOUNT CALCULATION FOR CASH CUSTOMER===============
		function discountCalculation()
		{
			var total = document.getElementById("totalWithExpense").value;
			var discountAmount = document.getElementById("discountAmount").value;
			var discount = $('#discount').val();
			
			if(discountAmount == "")
			{
				//document.getElementById("discount").value = "";
				discountAmount = 0;
				var hamaliExpence = document.getElementById("hamaliExpence2").value;			
				var hamali = document.getElementById("hamaliExpence").value;
				var totalHamali = Number(hamaliExpence) + Number(hamali);
				if(hamaliExpence == "")
				{
					totalHamali = 0;
				}

				var totalminusDiscount = ((Number(total) + Number(totalHamali)) - Number(discountAmount));								
				document.getElementById("grossTotal").value = totalminusDiscount;
				document.getElementById("discountAmount").value = 0.0;
				document.getElementById("discount").value = 0.0;
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

	    				document.getElementById("hamaliExpence2").value = "";
						document.getElementById("hamaliExpence").value = "";
	    				document.getElementById("discountAmount").value = "";
	    				document.getElementById("discount").value = "";
						var total = document.getElementById("totalWithExpense").value;
	    				document.getElementById("grossTotal").value = total.toFixed(2);
	    				
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

    				document.getElementById("hamaliExpence2").value = "";
					document.getElementById("hamaliExpence").value = "";
    				document.getElementById("discountAmount").value = "";
    				document.getElementById("discount").value = "";
					var total = document.getElementById("totalWithExpense").value;
    				document.getElementById("grossTotal").value = total.toFixed(2);
    				
    				return false;
		       	}

	       	 var hamaliAmoount = document.getElementById("hamaliExpence2").value;
   			 var hamalitaxAmt = document.getElementById("hamaliExpence").value;
   			 if(hamaliAmoount == "" || hamaliAmoount == "0")
 			 {
   				hamaliAmoount = 0;
   			 }
   			 if(hamalitaxAmt == "" || hamalitaxAmt == "0")
			 {
   				hamalitaxAmt = 0;
  			 }
				
			//var discountAmount = ((discount/100)*Number(total));
			var discount = ((100*Number(discountAmount))/Number(total));
			var totalminusDiscount = ((Number(total) - discountAmount)+(Number(hamaliAmoount)+Number(hamalitaxAmt)));
			
			document.getElementById("discount").value = discount.toFixed(2);
			document.getElementById("grossTotal").value = totalminusDiscount.toFixed(2);
			}
		}
	 
		function transExpenseAddingToGrossTotal()
		{		
			var transExpence = document.getElementById("transExpence2").value;
			var hamaliExpence = document.getElementById("hamaliExpence2").value;
			
		if(transExpence != "0")
		{
				var total = document.getElementById("totalWithExpense").value;
				var perc = document.getElementById("gstForExpense").value;
				var teg=(transExpence*(perc/100));
				document.getElementById("transExpence").value = teg;
				var totalWithExpense = Number(total) + Number(teg)+ Number(transExpence);
				document.getElementById("grossTotal").value = totalWithExpense.toFixed(2);
			}	
		
			if(transExpence == "0"){
				var total = document.getElementById("totalWithExpense").value;
				var hamaliTotal = Number(total) + Number(hamaliExpence);
				var totalWithExpense = Number(transExpence) + Number(hamaliTotal);
				document.getElementById("grossTotal").value = totalWithExpense.toFixed(2);
			}	
		}
		
		function hamaliExpenseAddingToGross()
		{		
			var hamaliExpence = document.getElementById("hamaliExpence2").value;			
			var hamali = document.getElementById("hamaliExpence").value;
			//Gross total calculation
			var discount = $('#discount').val();
			var discamnt = document.getElementById("discountAmount").value;
				
				if(hamaliExpence != "")
				{
					
					 var checkExpense= /^[0-9]+\.?[0-9]*$/;  
					
		       	    if(hamaliExpence.match(checkExpense))
		       	    {}
		       	    else
			       	{
		       	    	var msg="Please Enter Valid Hamali Expense";
						var dialog = bootbox.dialog({
							//title: "Embel Technologies Says :",
						   /* message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',*/
						    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
						    closeButton: false
						});
						
						setTimeout(function() {
							dialog.modal('hide');
						}, 1500);

						
						document.getElementById("hamaliExpence2").value = "";
						document.getElementById("hamaliExpence").value = "";
	    				document.getElementById("discountAmount").value = "";
	    				document.getElementById("discount").value = "";
						var total = document.getElementById("totalWithExpense").value;
	    				document.getElementById("grossTotal").value = total.toFixed(2);
						
						return false;
			       	}

    				var disAmt = document.getElementById("discountAmount").value;
					if(disAmt == "")
					{
						disAmt = 0;
					}
					
					var total = document.getElementById("totalWithExpense").value;
					var perc = document.getElementById("gstForExpense").value;
					var teg = 0;
					if(perc == "" || perc == "0")
					{
						document.getElementById("hamaliExpence").value = 0;
					}
					else
					{
						teg=(hamaliExpence*(perc/100));
						document.getElementById("hamaliExpence").value = teg.toFixed(2);						
					}

					var totalWithExpense =((Number(total) + Number(teg)+Number(hamaliExpence))-Number(disAmt));
					document.getElementById("grossTotal").value = totalWithExpense.toFixed(2);
				}	
				
				if(hamaliExpence == "")
				{
					var total = document.getElementById("totalWithExpense").value;
					var hamali = document.getElementById("hamaliExpence").value;
					var totalWithExpense = Number(total) - Number(discamnt);
					var totalWithExpense1 = Number(totalWithExpense)+Number(hamali);
					document.getElementById("grossTotal").value = totalWithExpense1.toFixed(2);
				}
			}

		function changeDisAndHamaliCash()
	    {
				document.getElementById("discount").value = 0;
				document.getElementById("discountAmount").value = 0;
				document.getElementById("hamaliExpence2").value = 0;
				document.getElementById("hamaliExpence").value = 0;

			var total = document.getElementById("totalWithExpense").value;
			document.getElementById("grossTotal").value = total;				
		}
			/*---------------------------------------------------  CALCULATIONS FOR CREDIT     -------------------------------------------*/
			function GrossTotalWithoutExpenseForCredit()
			{
				var totalWithExpense1 = document.getElementById("totalWithExpense1").value;
				document.getElementById("grossTotal1").value = totalWithExpense1.toFixed(2);
				document.getElementById("discount1").value = 0;
				document.getElementById("discountAmount1").value = 0;
				document.getElementById("hamaliExpence3").value = 0;
				document.getElementById("hamaliExpence1").value = 0;
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
	
			function transExpenseAddingToGrossTotalForCredit(){
			
			var transExpence = document.getElementById("transExpence3").value;
			var hamaliExpence = document.getElementById("hamaliExpence3").value;

			if(transExpence != "0"){
				var total = document.getElementById("totalWithExpense1").value;
				var perc = document.getElementById("gstForExpense1").value;
				var teg=(transExpence*(perc/100));
				document.getElementById("transExpence1").value = teg;
				var totalWithExpense = Number(total) + Number(teg)+ Number(transExpence);
				document.getElementById("grossTotal1").value = totalWithExpense.toFixed(2);
			}	
		
			if(transExpence == "0"){
				var total = document.getElementById("totalWithExpense1").value;
				var hamaliTotal = Number(total) + Number(hamaliExpence);
				var totalWithExpense = Number(transExpence) + Number(hamaliTotal);
				document.getElementById("grossTotal1").value = totalWithExpense.toFixed(2);
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
								//title: "Embel Technologies Says :",
							   /* message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',*/
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
		    				
		    				/* var total = document.getElementById("grossTotal1").value;
							var perc = document.getElementById("gstForExpense1").value;
							var teg=(hamaliExpence*(perc/100));
							document.getElementById("hamaliExpence1").value = teg;
							var totalWithExpense = Number(total) + Number(teg)+Number(hamaliExpence);
							document.getElementById("grossTotal1").value = totalWithExpense;
 */
							//alert(totalminusHamali);
							
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

			function changeDisAndHamaliCredit()
		    {
				document.getElementById("discount1").value = 0;
				document.getElementById("discountAmount1").value = 0;
				document.getElementById("hamaliExpence3").value = 0;
				document.getElementById("hamaliExpence1").value = 0;

				var total = document.getElementById("totalWithExpense1").value;
				document.getElementById("grossTotal1").value = total;
				
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

<script>
function clearGridSelect()
{
	document.getElementById("productIdCash").value = "";
	document.getElementById("productIdCredit").value = "";
}
</script>

<script type="text/javascript">
function calrtn(){
	
	var gs = 	document.getElementById("grossTotal").value;
	var amt = document.getElementById("amtrx").value;
	
	var tot = amt - gs;
	
	document.getElementById("chnge").value = tot;

}
</script>

<script type="text/javascript">
function calrtn1(){
	
	var gs = 	document.getElementById("grossTotal1").value;
	var amt = document.getElementById("amtrx1").value;
	
	var tot = amt - gs;
	
	document.getElementById("chnge1").value = tot;

}
</script>

<style>
.container-fluid {
	overflow: hidden;
}

/* .btn-mm {
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
 */
 
.gstradio input[type="radio"] {
	position: absolute;
	visibility: hidden;
}
.gstradio input[type="radio"]:checked + div {
    background: #f39c30;
    border: none;
}
.gstradio label {
    display: inline-block;
    max-width: 100%;
    margin: 4px 8px;
    font-weight: 700;
    font-size: 18px;
    text-transform: uppercase;
}
.gstcashradio {
    padding: 15px;
    border-radius: 10px;
    color: #fff;
    background: #f79d2ead;
    width: 150px;
    text-align: center;
}

</style>
</head>
	
 <body onload="pageLoad();getProductName();getProductNameForCredit();"> 
<!-- <body onload="pageLoad();"> -->
<div class="container-fluid">
<br>
	<div class="row">
		<div class="col-10 col-md-6 col-lg-6 col-lg-offset-3">
			<div class="row header_margin_top">
			    <div align="center">
					<h2 class="form-name style_heading">GST Billing</h2>  		
			  	</div>
    		</div>
    	</div>
    </div>
 	
 	<div align="right">
 		<h3 class="billnumber">Bill Number : <%=billNumber%></h3>
    </div>
    
    <div class="row" align="center">
	    <div class="hr-width">
			<hr class="style-one">
	    </div>	
    </div>
    
<!-------------------------------------------------- Cash and Credit Button Starts Here --------------------------------------------------> 
				
	<div class="container" id="my_styles" >
		<div class="gstradio" align="center">
   			 <label>
       		    <input type="radio" checked name="customertype" id="customertype" checked="checked"
					   onclick="openCashCustomerBilling()" > 
                <div class="gstcashradio"><span>Cash</span></div>
             </label>
             <label>
        		<input type="radio" name="customertype" id="customertype"
					   onclick="openCreditCustomerBilling()"> 
                <div class="gstcashradio"><span>Credit</span></div>
             </label>
       </div>		
	 </div>
<!-------------------------------------------------- Cash and Credit Button Ends Here -------------------------------------------------->
	              	
<!-------------------------------------------------- CODE FOR CASH CUSTOMER Starts Here -------------------------------------------------->
		
     <div id="CashCustDetail" style="padding-top:2%">
       	<form class="form-horizontal" method="post" action="" name="fertiBill">
			<fieldset>
		<div class="shopform-margin">

        <div class="row">
			<div class="form-group">
				<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
					<label class="control-label" for="customerName">Firm Name</label>  
           		</div>
           		<div class="col-lg-3 col-md-3 col-sm-8">
					<div class="input-group">
						<span class="input-group-addon">
							<i class="glyphicon glyphicon-user"></i>
						</span>
<!--            		 			  <input id="customerName" name="customerName" placeholder="Cash Customer Name" class="form-control input-md" type="text" > -->
           		 								<%
							CustomerDetailsDao daoaa = new CustomerDetailsDao();
           						List cust11 = daoaa.getAllcashCustomer(request);
							%>
						<input type="text" id="firmName" list="firmName_drop1" placeholder="Firm Name" class="form-control" >
				            <!-- onchange="custDetail.getVillageName()" custDetail.getContactNo();custDetail.getName() -->
				        <datalist id="firmName_drop1">
							<%
					           for(int i=0;i<cust11.size();i++){
					        	   cashCustomerHibernate bean =(cashCustomerHibernate)cust11.get(i);
							%>
							<option data-value="<%=bean.getCustId()%>"><%=bean.getFirmname()%></option>
							<%
				      			}
				    		%>
						</datalist>         		 	
           		 	</div>
				</div>
			</div>
		</div>
				
        <div class="row">
			<div class="form-group">
				<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
					<label class="control-label" for="customerName">Customer Name</label>  
           		</div>	 
           		<div class="col-lg-3 col-md-3 col-sm-8">
					<div class="input-group">
						<span class="input-group-addon">
							<i class="glyphicon glyphicon-user"></i>
						</span>
<!--            		 			  <input id="customerName" name="customerName" placeholder="Cash Customer Name" class="form-control input-md" type="text" > -->
           		 								<%
							CustomerDetailsDao daoa = new CustomerDetailsDao();
           						List cust1 = daoa.getAllcashCustomer(request);
							%>
						<input type="text" id="customerName" list="customerName_drop1" placeholder="Cash Customer Name" class="form-control" onchange="getVillageNamecash1()">
						                                                                                                      <!-- onchange="custDetail.getVillageName()" custDetail.getContactNo();custDetail.getName() -->
				        <datalist id="customerName_drop1">
							<%
					           for(int i=0;i<cust1.size();i++){
					        	   cashCustomerHibernate bean =(cashCustomerHibernate)cust1.get(i);
							%>
							<option data-value="<%=bean.getCustId()%>"><%=bean.getFirstName()%> <%=bean.getLastName()%></option>
							<%
				      			}
				    		%>
						</datalist>
           			</div>
				</div>
				<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">	
						<label class="control-label" for="village">Address </label>
           	 	</div>
           	 	<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
					<div class="input-group">
						<span class="input-group-addon">
							<i class="glyphicon glyphicon-map-marker"></i>
						</span>
         	   		  	<input id="village" name="village" placeholder="Address" class="form-control input-md ac_district"  type="text">
          		  	</div>
				</div>
          	</div>
        </div> 
	  
	  	<div class="row form-group" style="display:none;">
			<label class="col-md-3 control-label">Type<sup>*</sup></label>  
        		 <div class="col-md-3">
					<div class="input-group">
						<span class="input-group-addon">
							<i class="glyphicon glyphicon-user"></i>
						</span>
           			    <input id="type" name="type" placeholder="type" value="Cash" class="form-control input-md" type="text" >
           		 	</div>
				 </div>
		</div>
	  
	<div class="row">
		<div class="form-group">
			<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
				<label class="control-label" for="creditCustomerName"> Shop Name</label>  
           	</div>	
           	<div class="col-lg-3 col-md-3 col-sm-8">
				<div class="input-group">
					<span class="input-group-addon">
						<i class="glyphicon glyphicon-user"></i>
					</span>
									
							<%
								shopDetailsDao dao1 = new shopDetailsDao();
           						List shop =dao1.getAllShop(request);
							
							%>
					<input id="shopId" name="shopId" value="<%=shopId%>" type="hidden" class="form-control" >
					<input type="text" id="shopName" name="shopName" value="<%=shopName1%>" readonly="readonly" list="shop_drop1" class="form-control">
				    <datalist id="shop_drop1">
							
							<%
					           for(int i=0;i<shop.size();i++){
					        	   shopDetailsBean bean =(shopDetailsBean)shop.get(i);
							%>
						<option data-value="<%=bean.getShopId()%>" value="<%=bean.getShopName() %>" >
							<%
				      			}
				    		%>
					</datalist>
				</div>
			</div>
			<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">
           	 	<label class="control-label" for="gstNo">GST No</label>
           	</div> 	
           	<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
				<div class="input-group">
					<span class="input-group-addon">
						<span class="glyphicon nogyphicon">No</span>
					</span>
         	      	<input id="gstNo" name="gstNo"  placeholder="GST No" class="form-control input-md ac_district"  type="text">
          		</div>
			</div>
        </div>
   </div>
         
	    <div class="row">
			<div class="form-group">	
				<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
					<label class="control-label" for="contactNo">Contact No.</label>  
           	 	</div>	
           	 	<div class="col-lg-3 col-md-3 col-sm-8">
					<div class="input-group">
						<span class="input-group-addon">
							<i class="glyphicon glyphicon-earphone"></i>
						</span>
              			<input id="contactNo2" name="contactNo2" placeholder="Contact No" class="form-control input-md" type="text" maxlength="10">
            		</div>
            	</div>
				<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">
					<label class="control-label" for="saleDate">Sale Date</label>  
          		</div>	
          		<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
					<div class="input-group">
						<span class="input-group-addon">
							<i class="	glyphicon glyphicon-calendar"></i>
						</span>									
	            	    <input type="date" id="saleDate" name="saleDate" value="<%=todayDate%>" placeholder="sale Date" class="form-control input-md">
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
						 <input type="text" id="barcodeNo" name="barcodeNo" placeholder="Enter Barcode No" class="form-control input-md" onchange="getProductDetailsByProductName()">
							 <!-- getProductDetailsByBarcodeNo() -->            				
					</div>
        		</div>  
        		<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">	
        			<label class="control-label" for="email">Email ID</label>  
          		</div>	
          		<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
					<div class="input-group">
						<span class="input-group-addon">
							<i class="	glyphicon glyphicon-calendar"></i>
						</span>									
	            	    <input type="text" id="email" name="email" placeholder="Email ID" class="form-control input-md">
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
									
							<%-- <%
							    ProductDetailsDao cdd = new ProductDetailsDao();
           						List pList = cdd.getAllProductBySCategoryForFertilizerBill(request, response);
								
							%> --%>
							<%
							    ProductDetailsDao cdd = new ProductDetailsDao();
           						List pList = cdd.getAllProductByStock(request, response);
								
							%>
							
						<input list="product_dropCash" id="productIdCash" placeholder="Product Name" class="form-control" onchange="getProductDetailsByProductName(),clearGridSelect()" >
				            <datalist id="product_dropCash">
							<%-- <%
					           for(int i=0;i<pList.size();i++)
					           {
					        	    GetProductDetails gpd=(GetProductDetails)pList.get(i);
					        	   
					         %> --%>
					         <%
					           for(int i=0;i<pList.size();i++)
					           {
					        	    Stock gpd=(Stock)pList.get(i);
					        	   
					         %>
	<%-- 							<option data-value="" value="<%=gpd.getProduct()%> => <%=gpd.getBarcodeNo()%> => <%=gpd.getManufacturer()%> => Stock => <%=gpd.getQuantityDouble()%> => <%=gpd.getWeight()%> => <%=gpd.getUnitName() %>  => <%=gpd.getFkSubCatId()%> => <%=gpd.getFkCatId()%> => <%=gpd.getExpiryDate()%>"> --%>
							
									<option data-value="" value="<%=gpd.getProductName()%> => <%=gpd.getBarcodeNo()%> => <%=gpd.getCompanyName()%> => Stock => <%=gpd.getQuantity()%> => <%=gpd.getWeight()%> => <%=gpd.getUnit() %>  => <%=gpd.getSubCatId()%> => <%=gpd.getCatID()%> => <%=gpd.getUpdateDate()%> => <%=gpd.getPack_type()%> => <%=gpd.getProductId()%>">						
							
							
								<%-- <option data-value="" value="<%=gpd.getProduct()%> => <%=gpd.getExpiryDate()%> => <%=gpd.getWeight()%> => <%=gpd.getUnitName()%> => <%=gpd.getCatName()%> => <%=gpd.getManufacturer()%> =>  <%=gpd.getQuantityDouble()%> => <%=gpd.getSubCatName()%> => <%=gpd.getFkSubCatId()%> => <%=gpd.getStockInTotalKgLtrPiece()%> => <%=gpd.getUnitName()%> => <%=gpd.getFkCatId()%>"> --%>
							<%
				      			}
				    		%>
			              	
            			</datalist>
									
						<!-- <select class="form-control" id="proName" name="proName" onchange="getProductDetailsByProductName()"></select> -->
            		</div>
            	</div>
        	</div>
       	</div>  
        	          
          <div class="table-responsive row" align="center" style="margin-left: 1px">
				<table id="list4" ></table>
				<div id="jqGridPager"></div>
		  </div>

          <div class="row form-group" >
          
          </div>
          
    <div class="row">
		<div class="form-group">
			<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
	        	<label class="control-label" for="paymentMode">Payment Mode</label>  
	        </div>
	        <div class="col-lg-3 col-md-3 col-sm-8">
				<div class="input-group">
					<span class="input-group-addon">
						<i class="glyphicon glyphicon-usd"></i>
					</span>
	        		<select class="form-control" id="paymentMode">
	        			<option value="cash">Cash</option>
						<option value="UPI Payment">UPI Payment</option>
						<option value="cheque">Cheque</option>
						<option value="card">Card</option>
						<option value="neft">NEFT</option>
					</select>	
	        	</div>
			</div>
	 <!-- <script>
		
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
		</script>	 -->
		</div>				
	</div>  
        <!--   	<div class="row form-group" >

            					<div id="cheque_no" >
            																
									<div class="col-md-3 col-md-offset-3 first">	
										<input class="form-control" type="text" name="chequeNum" id="chequeNum" placeholder="Cheque No." />  
									</div>
								
									<div class="col-md-3 col-md-offset-2 first">	
										<input class="form-control" type="text" name="nameOnCheck" id="nameOnCheck" placeholder="Name On check" />  
									</div>
								</div>
											
											<div id="card_no" class="form-group">
												
												<div class="col-md-3 col-md-offset-3 first">	
													<input class="form-control" type="text" name="cardNum" id="cardNum" placeholder="Card No." />  
												</div>
												
											</div>
											
											<div id="neft_acc_no" class="form-group">
												
												<div class="col-md-3 col-md-offset-3 first">	
													<input class="form-control" type="text" name="accNum" id="accNum" placeholder="Account No." />  
												</div>
												
												<div class="col-md-3 col-md-offset-2 first">	
													<input class="form-control" type="text" name="bankName" id="bankName" placeholder="Name Of Bank" />  
												</div>
												</div>
											</div> -->
          
         <div class="row">
         	<div class="form-group">
         		<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
         			<label class="control-label"  for="gstForExpence" ><b>GST for Expense</b></label>  
			    </div>
			    <div class="col-lg-3 col-md-3 col-sm-8">
					<div class="input-group">
						<span class="input-group-addon">
							<span class="glyphicon percentage">%</span>
						</span>
						<select class="form-control" id="gstForExpense" onchange="changeDisAndHamaliCash()">
							<option value="0">--Select Type--</option>
							<option value="5">5 %</option>
							<option value="12">12 %</option>
							<option value="18">18 %</option>
							<option value="28">28 %</option>
						</select>
	            	</div> 
	            </div>
          	    <div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">	
          	    	<label class="control-label" for="total"><b>Total</b></label>  
			    </div>    
			    <div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
					<div class="input-group">
						<span class="input-group-addon">
							<span class="glyphicon nogyphicon">Rs</span>
						</span>
	            		<input id="totalWithExpense" placeholder="Total" readonly="readonly" class="form-control input-md" type="text" onchange="changeDisAndHamali();">
	            	</div>
	            </div>
          	</div>
        </div>
          	
        <div class="row">
        	<div class="form-group">  		 
          		 <div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">	
          		 	<label class="control-label" for="total"><b>Remark</b></label>  
			     </div>      	 
			     <div class="col-lg-3 col-md-3 col-sm-8">
					<div class="input-group">
						<textarea id="description" name="description" class="form-control" placeholder="Enter Description" rows="3"></textarea>
	            	</div>
	            </div>
	        </div>
	    </div>
	            
	    <div class="row">
	       <div class="form-group">     
	           <div class="col-lg-offset-5 col-md-offset-5 col-lg-2 col-md-2 col-sm-4">	
	           		<label class="control-label" for="discount">Discount</label>  
			   </div>   	 
			   <div class="col-lg-2 col-md-2 col-sm-4">
					<div class="input-group">
						<span class="input-group-addon">
							<span class="glyphicon nogyphicon">Rs</span>
						</span>
	            		<input id="discountAmount" name="discountAmount" placeholder="Disc Amt" class="form-control input-md" type="text" onchange="discountCalculation()">
	            	</div>
	            </div>
	            <label class="control-label" for="discount" ><b></b></label>  
			    <div class="col-lg-2 col-md-2 col-sm-4">
					<div class="input-group">
						<span class="input-group-addon">
							<span class="glyphicon percentage">%</span>
						</span>
	            		<input id="discount" name="discount" placeholder="Disc %" class="form-control input-md" type="text" readonly="readonly"/>
	            	</div>
	            </div>
	        </div>
	    </div>						
					
		<div class="row">
			<div class="form-group">			
				<div class="col-lg-offset-5 col-md-offset-5 col-lg-2 col-md-2 col-sm-4">
					<label class="control-label" for="hamaliExpence">Labour Expenses</label>  
			    </div>    
			    <div class="col-lg-2 col-md-2 col-sm-4">
					<div class="input-group"> 
						<span class="input-group-addon">
							<span class="glyphicon nogyphicon">Rs</span>
						</span>
	            		<input id="hamaliExpence2" name="hamaliExpence2" placeholder="Lab Exp" class="form-control input-md" type="text" onchange="hamaliExpenseAddingToGross()"/>
	            	</div>
	            </div>
	            <label class="control-label" for="hamaliExpence" ><b></b></label>  
			    <div class="col-lg-2 col-md-2 col-sm-4">
					<div class="input-group">
						<span class="input-group-addon">
							<span class="glyphicon nogyphicon">Rs</span>
						</span>
	            		<input id="hamaliExpence" name="hamaliExpence" placeholder="GST Amt" class="form-control input-md" type="text" readonly="readonly">
	            	</div>
	            </div>
	        </div>
	     </div>
                  	
          	<div class="row">
          		<div class="form-group">	
					<div class="col-lg-offset-5 col-md-offset-5 col-lg-2 col-md-2 col-sm-4">
						<label class="control-label" for="grossTotal">Gross Total</label>  
			        </div>   	
			        <div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
						<div class="input-group">
							<span class="input-group-addon">
								<span class="glyphicon nogyphicon">Rs</span>
							</span>
	              			<input readonly="readonly" id="grossTotal" name="grossTotal" placeholder="Gross Total" class="form-control input-md" type="text">
	            		</div>
	            	</div>
            	</div>
            </div>
     	
     	    <div class="row">
				<div class="form-group">
					<div class="col-lg-offset-5 col-md-offset-5 col-lg-2 col-md-2 col-sm-4">	
						<label class="control-label">Amount Received</label>  
			        </div>   	
			        <div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
						<div class="input-group">
							<span class="input-group-addon">
								<span class="glyphicon nogyphicon">Rs</span>
							</span>
	              			<input id="amtrx" name="amtrx" placeholder="Amount Received" class="form-control input-md" type="text" onkeyup="calrtn();">
	            		</div>
	            	</div>
	            </div>
	        </div>
	        
	        <div class="row">
            	<div class="form-group">
            		<div class="col-lg-offset-5 col-md-offset-5 col-lg-2 col-md-2 col-sm-4">	
            			<label class="control-label">Change Return</label>  
			        </div>   	
			        <div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
						<div class="input-group">
							<span class="input-group-addon">
								<span class="glyphicon nogyphicon">Rs</span>
							</span>
	              			<input readonly="readonly" id="chnge" name="chnge" placeholder="Change Return" class="form-control input-md" type="text" style="font-size: 15px;  height: 55px;">
	            		</div>
	            	</div>
            	</div>
            </div>
     	
     	</div>
     	</fieldset>
				</form>
     	
     		<div class="row buttons-margin" align="center">
				<input type="button" id="billingCashbtn" class="btn gstbilling btn-large btn-success button-height-width" name="billingCashbtn" onclick="fertilizerBill()" value="Save&Print Bill">
           		<input type="reset" class="btn gstbilling btn-large btn-danger button-height-width" id="save" name="btn" onclick="cancle()" value="Cancel">
				<input type="button" id="btn" class="btn gstbilling btn-large btn-success button-height-width" name="btn" onclick="openStockReport()" value="Stock ">	
		 	    <input id="save" name="btn" class="btn gstbilling btn-primary" type="button" onclick="pay()" value="Payment">        		            				
			</div>	
			
			
       </div>
 <!-------------------------------------------------- CODE FOR CASH CUSTOMER Ends Here -------------------------------------------------->
               
 <!-------------------------------------------------- CODE FOR CREDIT CUSTOMER Starts Here -------------------------------------------------->
           
       <div id="CreditCustDetail" style="padding-top:2%">
       		<form class="form-horizontal" method="post" action="" name="creditFertiBill1">
			<fieldset>
			  <div class="shopform-margin">        
			<div class="row">
				<div class="form-group">
					<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
						<label class="control-label" for="customerName">Firm Name</label>  
           			</div>
           			<div class="col-lg-3 col-md-3 col-sm-8">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-user"></i>
							</span>
<!--            		 			  <input id="customerName" name="customerName" placeholder="Cash Customer Name" class="form-control input-md" type="text" > -->
           		 								<%
           		 							CustomerDetailsDao daoa2 = new CustomerDetailsDao();
           		           						List custs11 = daoa2.getAllCustomer(request);
							%>
							<input type="text" id="CfirmName" list="CfirmName_drop1" placeholder="Firm Name" class="form-control">
					   <!-- onchange="custDetail.getVillageName()" custDetail.getContactNo();custDetail.getName() -->
				     	    <datalist id="CfirmName_drop1">
							<%
					           for(int i=0;i<custs11.size();i++){
					        	   CustomerDetailsBean bean =(CustomerDetailsBean)custs11.get(i);
							%>
								<option data-value="<%=bean.getCustId()%>"><%=bean.getFirmname()%></option>
							<%
				      			}
				    		%>
							</datalist>          		 	
           		 		</div>
					</div>
				</div>
			</div> 
				     
	 	 <div class="row">
			<div class="form-group">
				<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
					<label class="control-label" for="creditCustomerName"> Customer Name</label>  
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
							<input type="text" id="creditCustomer" list="cust_drop1" placeholder="Credit Customer Name" class="form-control" onchange="custDetail.getVillageName()" >
							                                                                                                      <!--  custDetail.getContactNo();custDetail.getName() -->
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
					<label class="control-label" for="village1">Address</label>
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
                 
        <div class="row form-group" style="display:none;">
			<label class="col-md-3 control-label">Type<sup>*</sup></label>  
         		<div class="col-md-3">
					<div class="input-group">
						<span class="input-group-addon">
							<i class="glyphicon glyphicon-user"></i>
						</span>
           			    <input id="type1" name="type1" value="Credit" class="form-control input-md" type="text" >
           		 	</div>
				</div>
		</div>
                 
        <div class="row">
			<div class="form-group">	
				<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">	
					<label class="control-label" for="creditCustomerName"> Shop Name</label>  
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
					    <input type="text" id="barcodeNo1" name="barcodeNo1" placeholder="Enter Barcode No" class="form-control input-md" onchange="getProductDetailsByProductNameForCredit()">
						<!-- getProductDetailsByBarcodeNo1() -->
					</div>
        		</div>  
        		<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">	  
        			<label class="control-label" for="saleDate">Challan No</label>  
          		</div>			 
          		<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
					<div class="input-group">
						<span class="input-group-addon">
							<span class="glyphicon nogyphicon">No</span>
						</span>
	              	    <input type="text" id="challanNo" name="challanNo" placeholder="Ch. No" class="form-control input-md" onchange="getProductDetailsBynonGridDataForchallan();getProductDetailsByProductNameForchallan()">
					</div>
				</div>          
        	</div>
        </div>
	 	
	 	<div class="row">
        	<div class="form-group">
        	    <div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
        	      	<label class="control-label" for="productName">Product Name<sup>*</sup></label>  
           		</div>	
           		<div class="col-lg-8 col-md-8 col-sm-8">
					<div class="input-group">
						<span class="input-group-addon">
							<i class="	glyphicon glyphicon-list-alt"></i>
						</span>
            						<!-- <select class="form-control" id="proName2" name="proName2" onchange="getProductDetailsByProductNameForCredit()"></select> -->
            			<input list="product_dropCredit" id="productIdCredit" placeholder="Product Name" class="form-control" onchange="getProductDetailsByProductNameForCredit(),clearGridSelect()">
						<datalist id="product_dropCredit">
							<%-- <%
					           for(int i=0;i<pList.size();i++)
					           {
					        	   GetProductDetails gpd2=(GetProductDetails)pList.get(i);
					        	  /*  if(gpd2.getQuantityDouble()>0)
					        	   { */
							%> --%>
							
							
							<%
					           for(int i=0;i<pList.size();i++)
					           {
					        	    Stock gpd=(Stock)pList.get(i);
					        	   
					         %>
	<%-- 							<option data-value="" value="<%=gpd.getProduct()%> => <%=gpd.getBarcodeNo()%> => <%=gpd.getManufacturer()%> => Stock => <%=gpd.getQuantityDouble()%> => <%=gpd.getWeight()%> => <%=gpd.getUnitName() %>  => <%=gpd.getFkSubCatId()%> => <%=gpd.getFkCatId()%> => <%=gpd.getExpiryDate()%>"> --%>
							
							<option data-value="" value="<%=gpd.getProductName()%> => <%=gpd.getBarcodeNo()%> => <%=gpd.getCompanyName()%> => Stock => <%=gpd.getQuantity()%> => <%=gpd.getWeight()%> => <%=gpd.getUnit() %>  => <%=gpd.getSubCatId()%> => <%=gpd.getCatID()%> => <%=gpd.getUpdateDate()%> => <%=gpd.getPack_type()%> => <%=gpd.getProductId()%>">						
							
							
									
<%-- 	main							<option data-value="" value="<%=gpd2.getProduct()%> => <%=gpd2.getBarcodeNo()%> => <%=gpd2.getManufacturer()%> => Stock => <%=gpd2.getQuantityDouble()%> => <%=gpd2.getWeight()%> => <%=gpd2.getUnitName() %>  => <%=gpd2.getFkSubCatId()%> => <%=gpd2.getFkCatId()%> => <%=gpd2.getExpiryDate()%>"> --%>
	
	
								<%-- <option data-value="" value="<%=gpd2.getProduct()%> => <%=gpd2.getExpiryDate()%> => <%=gpd2.getWeight()%> => <%=gpd2.getManufacturer()%> => Stock= <%=gpd2.getQuantityDouble()%>   <%=gpd2.getUnitName() %> => <%=gpd2.getFkSubCatId()%> => <%=gpd2.getFkCatId()%>"> --%>
							<%
				      			//}
					           }
				    		%>			              	
            			</datalist>
            		</div>
            	</div>
            </div>
       </div> 
           			
         <div class="table-responsive row" style="margin-left: 1px" >
				<table id="credit" ></table>
				<div id="jqGridPager1"></div>
			<!-- </div> -->
		</div>
	
          <div class="row form-group" >
          
          </div>
          
         <div class="row">
	 		<div class="form-group">
	 			<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
	 				<label class="control-label" for="email1">Email ID</label>  
          		</div>	
          		<div class="col-lg-3 col-md-3 col-sm-8">
					<div class="input-group">
						<span class="input-group-addon">
							<i class="glyphicon glyphicon-calendar"></i>
						</span>									
	            	    <input type="text" id="email1" name="email1" placeholder="Email ID" class="form-control input-md">
					</div>
				</div>
			</div>
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
							<option value="UPI Payment">UPI Payment</option>											
							<option value="cheque1">Cheque</option>
							<option value="card1">Card</option>
							<option value="neft1">NEFT</option>
						</select>	
	           		</div>
				</div>			    	
	 <!-- <script>
		
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
		</script>	 -->
		</div>
	</div>
      	<!-- <div class="row form-group" >

        	<div id="cheque_no1" >
        																
				<div class="col-md-3 col-md-offset-3 first">	
						<input class="form-control" type="text" name="chequeNum" id="chequeNum" placeholder="Cheque No." />  
					</div>
		
					<div class="col-md-3 col-md-offset-2 first">	
						<input class="form-control" type="text" name="nameOnCheck" id="nameOnCheck" placeholder="Name On check" />  
					</div>
				</div>
							
				<div id="card_no1" class="form-group">
					
					<div class="col-md-3 col-md-offset-3 first">	
						<input class="form-control" type="text" name="cardNum" id="cardNum" placeholder="Card No." />  
					</div>
				</div>
							
				<div id="neft_acc_no1" class="form-group">
					
					<div class="col-md-3 col-md-offset-3 first">	
						<input class="form-control" type="text" name="accNum" id="accNum" placeholder="Account No." />  
					</div>
					
					<div class="col-md-3 col-md-offset-2 first">	
						<input class="form-control" type="text" name="bankName" id="bankName" placeholder="Name Of Bank" />  
					</div>
				</div>
			</div> -->
       
         <div class="row">
         	<div class="form-group">
         		<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">	
         			<label class="control-label" for="gstForExpence"><b>GST for Expense</b></label>  
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
         	    	<label class="control-label" style="display:none" for="customerNameHidden">Customer Name</label>  
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
  					<label class="control-label" for="total"><b>Total</b></label>  
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
  				<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
  					<label class="control-label" for="total"><b>Remark</b></label>  
			    </div>    
			    <div class="col-lg-3 col-md-3 col-sm-8">
					<div class="input-group">
					<!-- <input id="totalWithExpense" placeholder="Remark" class="form-control input-md" type="text" onchange="changeDisAndHamali();"> -->
	            		<textarea id="description1" name="description1" class="form-control" placeholder="Enter Description" rows="3" cols="30"></textarea>
	            	</div>
	            </div>
			</div>
		</div>
		
		<div class="row">
			<div class="form-group">	
				<div class="col-lg-offset-5 col-md-offset-5 col-lg-2 col-md-2 col-sm-4">
					<label class="control-label" for="discount"><b>Discount</b></label>  
			    </div>    
			    <div class="col-lg-2 col-md-2 col-sm-4">
					<div class="input-group">
						<span class="input-group-addon">
							<span class="glyphicon nogyphicon">Rs</span>
						</span>
	            		<input id="discountAmount1" name="discountAmount" placeholder="Disc Amt" class="form-control input-md" type="text" onchange="discountCalculationForCredit()">
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
	          		<label class="control-label" for="hamaliExpence"><b>Labour Expenses</b></label>  
			    </div>	
			    <div class="col-lg-2 col-md-2 col-sm-4">
					<div class="input-group">
						<span class="input-group-addon">
							<span class="glyphicon nogyphicon">Rs</span>
						</span>
	            		<input id="hamaliExpence3" name="hamaliExpence" placeholder="Lab Exp" class="form-control input-md" type="text"  onchange="hamaliExpenseAddingToGrossForCredit()">
	            	</div>
	            </div>
				<label class="control-label" for="hamaliExpence"><b></b></label>  
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
			    <div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
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
	 		 	
	 	<div class="row">
			<div class="form-group">
				<div class="col-lg-offset-5 col-md-offset-5 col-lg-2 col-md-2 col-sm-4">
					<label class="control-label"><h4><b>Amount Received</b></h4></label>  
			    </div>    
			    <div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
					<div class="input-group">
						<span class="input-group-addon">
							<span class="glyphicon nogyphicon">Rs</span>
						</span>
	            		<input id="amtrx1" name="amtrx1" placeholder="Amount Received" class="form-control input-md" type="text" style="font-size: 15px;  height: 55px;" onkeyup="calrtn1();">
	            	</div>
	            </div>
	        </div>
	     </div>
	     
	     <div class="row">
	     	<div class="form-group">
				<div class="col-lg-offset-5 col-md-offset-5 col-lg-2 col-md-2 col-sm-4">	     	
            		<label class="control-label"><h4><b>Change Return</b></h4></label>  
			    </div>
			    <div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
					<div class="input-group">
						<span class="input-group-addon">
							<span class="glyphicon nogyphicon">Rs</span>
						</span>
	            		<input readonly="readonly" id="chnge1" name="chnge1" placeholder="Change Return" class="form-control input-md" type="text" style="font-size: 15px;  height: 55px;">
	            	</div>
	            </div>
            </div>
        </div>
     
     </div>	
     </fieldset>	 		
	 	</form>	
	 		 	
		<div class="row buttons-margin" align="center">
			<input type="button" id="billingCreditBtn" class="btn gstbilling btn-large btn-success button-height-width" name="billingCreditBtn" onclick="fertilizerBillForCreditCustomer()" value="Save&Print Bill">
		    <input type="reset" id="save" class="btn gstbilling btn-large btn-danger button-height-width" name="btn" onclick="cancle()" value="Cancel">	  
			<input type="button" id="btn" class="btn gstbilling btn-large btn-success button-height-width" name="btn" onclick="openStockReport()" value="Stock ">		  				 	
     		<input id="save" name="btn" class="btn gstbilling btn-primary" type="button" onclick="pay()" value="Payment">        		            				         			 
		</div>	
	 	
	 		
	 </div>
<!-------------------------------------------------- CODE FOR CREDIT CUSTOMER Ends Here -------------------------------------------------->
	 
<!-- ====================================================== CUSTOMER DETAILS POP UP ================================================================ -->

<div id="customerDetailsDiv" class="tab-pane fade in active" style="padding-top:0%; display: none;">
    <form class="form-horizontal" method="post" action="" name="cstd" id="cstd">    <!-- Value of 'name' attribute is used in customerDetails.js  -->
        <div class="row">
			<div align="center">
				<h2 class="form-name style_heading">Customer Details</h2>
			</div>
	    </div>
         	 <div class="row form-group" style="padding-top:6%">
           		<label class="col-md-2 control-label" for="firstName"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("firstName") %> <%}%> <%if(abc.equals("english")){%>First Name<%}%></label>  
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
           		<label class="col-md-2 control-label" for="lastName"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("lastName") %> <%}%> <%if(abc.equals("english")){%>Last Name<%}%></label>  
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
				<label class="col-md-2 control-label" for="firmname"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("firmName") %> <%}%> <%if(abc.equals("english")){%>Firm Name<%}%></label>  
           	 		<div class="col-md-3 ">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-earphone"></i>
							</span>
              					<input id="firmname" name="firmname" placeholder="Firm Name" class="form-control input-md" type="text" >
           				 </div>
           			</div></div>
			
			<div class="row form-group">
				<label class="col-md-2 control-label" for="contactNo"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("contactNumber") %> <%}%> <%if(abc.equals("english")){%>Contact No.<%}%></label>  
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
<jsp:include page="commons/footer.jsp"></jsp:include>