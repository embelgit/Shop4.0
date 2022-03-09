<%@page import="com.Fertilizer.hibernate.AdvanceBookingBean"%>
<%@page import="com.Fertilizer.dao.AdvanceBookinhDao"%>
<%@page import="com.Fertilizer.helper.ProductDetailsHelper"%>
<%@page import="com.Fertilizer.helper.CategoryDetailsHelper"%>
<%@page import="java.util.Date"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="com.Fertilizer.hibernate.ExpenseDetailForBillingAndGoodsReceiveBean"%>
<%@page import="com.Fertilizer.dao.ExpenseDetailForBillingAndGoodsReceiveDao"%>
<%@page import="com.Fertilizer.hibernate.GodownEntry"%>
<%@page import="com.Fertilizer.hibernate.GoodsReceiveBean"%>
<%@page import="com.Fertilizer.hibernate.MeasuringUnitsBean"%>
<%@page import="com.Fertilizer.hibernate.SubCategoryDetailsBean"%>
<%@page import="com.Fertilizer.dao.GodownEntryDao"%>
<%@page import="com.Fertilizer.hibernate.CategoryDetailsBean"%>
<%@page import="com.Fertilizer.dao.CategoryDetailsDao"%>
<%@page import="com.Fertilizer.dao.GoodsReceiveDao"%>
<%@page import="com.Fertilizer.dao.MeasuringUnitsDao"%>
<%@page import="com.Fertilizer.hibernate.shopDetailsBean"%>

<% boolean isHome=false;%>
<%@page import="com.Fertilizer.dao.SupplierDetailsDao"%>
<%@page import="com.Fertilizer.hibernate.SupplierDetailsBean"%>
<%@page import="com.Fertilizer.dao.TaxCreationDao"%>
<%@page import="com.Fertilizer.hibernate.TaxCreationBean"%>
<%@page import="java.text.SimpleDateFormat"%> 
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Date"%>
  
<%@include file="commons/header.jsp"%>
<head>
 <meta charset="utf-8">
  	  <script type="text/javascript" src="/Shop/staticContent/js/jquery-1.12.3.min.js"></script>
     
  
	 <link rel="stylesheet" href="/Shop/staticContent/css/jquery-ui.min.css">
     <link rel="stylesheet" href="/Shop/staticContent/css/ui.jqgrid.min.css">
     <link rel="stylesheet" href="/Shop/staticContent/y_css/jquery-ui.css">
	 <link rel="stylesheet" href="/Shop/staticContent/css/ui.jqgrid.css">
	 
  	<script type="text/javascript" src="/Shop/staticContent/js/jquery.min.js"></script>
  	<script type="text/javascript" src="/Shop/staticContent/js/jquery.min.js"></script>
    <script type="text/javascript" src="/Shop/staticContent/js/bootstrap.js"></script>
   	<script type="text/javascript" src="/Shop/staticContent/js/bootbox.min.js"></script>
   
    <script type="text/javascript" src="/Shop/staticContent/js/jquery-ui.min.js"></script>
    <script type="text/javascript" src="/Shop/staticContent/js/jquery-ui.js"></script>
    <script type="text/javascript" src="/Shop/staticContent/js/jqueryUi.js"></script>
    <script type="text/javascript" src="/Shop/staticContent/js/jquery.jqgrid.min.js"></script>
    
    <script type="text/javascript" src="/Shop/staticContent/js/producttransfer.js"></script>
    <script type="text/javascript" src="/Shop/staticContent/js/categoryDetails.js"></script>
<link rel="stylesheet" href="/Shop/staticContent/css/shopstyle.css">     
<script type="text/javascript">
function mypopup(url)
{
    width ='1050px';
    height = '600px';
    mywindow = window.open(url, "Title","location=0,status=1,scrollbars=1,resizable=1,menubar=0,toolbar=no,width=" + width + ",height=" + height);
    mywindow.moveTo(140, 50);
    mywindow.focus();
} 
</script>
 
 
<script type="text/javascript">

	function supplierDetailsDivAction(a)
	{	
		if(a==1){
			$( "#supplierDetailsDiv" ).dialog({height: 500, width:1000}); 	
	    }else{
	    	$( "#supplierDetailsDiv" ).dialog('close');
	    }
		$('#supplierfresh').load(document.URL +  ' #supplierfresh');
	}
	
	function productDetailsDivAction(a)
	{	
		if(a==1){
			$( "#productDetailsDiv" ).dialog({height: 650, width:1100}); 	
	    }else{
	    	$( "#productDetailsDiv" ).dialog('close');
	    }
		$('#productrefresh').load(document.URL +  ' #productrefresh');
	}
	
	function catDetailsDivAction(a)
	{	
		if(a==1){
			$( "#catDetailsDiv" ).dialog({height: 420, width:1000}); 	
	    }else{
	    	$( "#catDetailsDiv" ).dialog('close');
	    }
		$('#categoryrefresh').load(document.URL +  ' #categoryrefresh');
	}
	
	function subcatDetailsDivAction(a)
	{	
		if(a==1){
			$( "#subCategoryDiv" ).dialog({height: 420, width:1000});   	
	    }else{
	    	$( "#subCategoryDiv" ).dialog('close');  
	    }		
		$('#subcategoryrefresh').load(document.URL +  ' #subcategoryrefresh');
	}
	
</script>
 <script type="text/javascript">
 <!-- ================= Checking Adv Booking No =================== -->
 function checkBookingno()
 {
	    <%
	    AdvanceBookinhDao dao22 = new AdvanceBookinhDao();
	 	List list22 = dao22.getAllBookinNo(request);
	 	%>
	 	<%
		
		for(int y=0;y<list22.size();y++)
		{
			AdvanceBookingBean bean = (AdvanceBookingBean)list22.get(y);
		%>
		var bookinNo = "<%=bean.getBookingNo()%>";

		if(document.getElementById("booking").value == bookinNo )
		{
			continue;
		}else{
			var msg="Invalid Booking Number";
			var dialog = bootbox.dialog({
				message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
			    closeButton: false
			});
			
			setTimeout(function() {
				dialog.modal('hide');
			}, 1500);

			document.getElementById("booking").value = "";
			
			return false;
		}
		<%
		}
		%>
 }
</script>
<script type="text/javascript">
<!-- ================= Sale Price With Tax =================== -->
function salePriceWithTax()
{
	var  taxpercentage=document.getElementById("taxPercentage").value;
	var  spwithoutgst=document.getElementById("spwithoutgst").value;
	//var  mrp=document.getElementById("mrp").value;
	var  buyPrice=document.getElementById("buyPrice").value;
	
    if(salePrice ==""){
		
		return false;
	}else{				
		if(Number(spwithoutgst) >= Number(buyPrice)){
			var rate = (spwithoutgst*(1+(taxpercentage/100)));
			document.getElementById("salePrice").value = Math.round(rate * 100) / 100;
		}else{
			alert("Enter Sale Price Greater than Buy Price")
			document.getElementById("spwithoutgst").value="";
			document.getElementById("salePrice").value="";
		}
	}
}
</script>
 <script type="text/javascript">
<!-- ================= Sale Price Without Tax =================== -->
function salePriceWithoutTax()
{
	var  taxpercentage=document.getElementById("taxPercentage").value;
	var  spwithoutgst=document.getElementById("spwithoutgst").value;
	//var  mrp=document.getElementById("mrp").value;
	var  buyPrice=document.getElementById("buyPrice").value;
	
	if(taxpercentage==""){
		//alert("Select Tax Type");
		return false;
	} /* else if(mrp==""){
		alert("Enter MRP");
		return false;
	} */ else if(salePrice ==""){
		//alert("Enter MRP");
		return false;
	}else{				
		if(Number(spwithoutgst) >= Number(buyPrice)){
			var rate = (spwithoutgst*(1+(taxpercentage/100)));
			 document.getElementById("salePrice").value = Math.round(rate * 100) / 100;
			 
		}else{
			alert("Enter Sale Price less than Buy Price")
			document.getElementById("spwithoutgst").value="";
			document.getElementById("salePrice").value="";
		}
	}
}
</script>
<script type="text/javascript">
<!-- ================= Check Buy price less than MRP =================== -->
function buyPriceChecklessthanmrp()
{
	var  mrp=document.getElementById("mrp").value;
	var  buyPrice=document.getElementById("buyPrice").value;
	
	if(buyPrice=="")
	{
		return false;
	}else{
		if(Number(mrp) >= Number(buyPrice)){
			
			document.getElementById("buyPrice").value = buyPrice;
		}else{
			alert("Enter Buy Price less than MRP")
			document.getElementById("buyPrice").value="";
		}
	}
}
</script>
<script type="text/javascript">
<!-- ================= Check Duplicate Category =================== -->
function checkForDuplicateCategoryEntry(){
	<%
	CategoryDetailsDao dao4 = new CategoryDetailsDao();
	List list12 = dao4.getAllMainCat(request);
	%>
	
	<%
	for(int q=0;q<list12.size();q++){
		CategoryDetailsBean bean = (CategoryDetailsBean)list12.get(q);
	%>
	var pro = "<%=bean.getCategoryName()%>";
	var proName=document.getElementById("categoryName").value;
	if(proName == pro)
	{
		var msg="Category already exist...Duplicate Not allowed";
		var dialog = bootbox.dialog({
			
		    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
		    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		    closeButton: false
		});
		
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);

		document.getElementById("categoryName").value = "";
		
		return false;
	}
	<%
	}
	%>
	
	}
</script>
<script type="text/javascript">
<!-- ================= Check Duplicate Sub-Category =================== -->
function checkForDuplicateSubCategoryEntry(){
	
		<%
		    CategoryDetailsDao dao11 = new CategoryDetailsDao();
			List list1 = dao11.getSubCategoryName(request);
		%>
		<%
		  int x = 0;
		  for (x = 0; x < list1.size(); x++) {
			  SubCategoryDetailsBean bean = (SubCategoryDetailsBean) list1.get(x);
	    %>
		var subCat = "<%=bean.getSubcategoryName()%>";
		var cat = "<%=bean.getCategoryName()%>";
		var subcatName=document.getElementById("subcategoryName").value;
		var catName=document.getElementById("fk_cat_id").value;

		if(subcatName == subCat && cat == catName)
		{
			var msg="Sub-Category already exist...Duplicate Not allowed";
			var dialog = bootbox.dialog({
				
			    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
			    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
			    closeButton: false
			});
			
			setTimeout(function() {
				dialog.modal('hide');
			}, 1500);

			document.getElementById("fk_cat_id1").value = "";
			document.getElementById("subcategoryName").value = "";

			return false;
		   }
		<%
		}
		%>
	}
</script>
<script type="text/javascript">
<!-- Following code is used to show tax percentage in % field with the help of  "myid" and "taxPercentage"-->
	function ChooseContact(data)
		{
			document.getElementById("taxPercentage").value=(data.options[data.selectedIndex].getAttribute("myid"));
		}
</script> 
   
<script type="text/javascript">
function mypopup()
{
	window.location = "popUpcategoryDetails.jsp";
}
function editgoodreceive(){
	
	window.location = "editgoodsReceive.jsp";
}
function clearGridSelect()
{
	document.getElementById("proName").value = "";	
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

<script type="text/javascript">

function GrossTotalWithoutExpense(){
	
	var transExpence = document.getElementById("transExpence3").value;
	var hamaliExpence = document.getElementById("hamaliExpence3").value;
	var totalWithExpense = document.getElementById("total").value;

	if(hamaliExpence == "0" && transExpence == "0")
	{
		document.getElementById("grossTotal").value = Number(totalWithExpense).toFixed(2);
	}
}	  
	
function transExpenseAddingToGrossTotal(){
	
	var transExpence = document.getElementById("transExpence3").value;
	var hamaliExpence = document.getElementById("hamaliExpence3").value;
	var hamali = document.getElementById("hamaliExpence3").value;
	var trans = document.getElementById("transExpence").value;
	var discamnt = document.getElementById("discountAmount").value;
	
	if(discamnt == "")
	{
		discamnt = 0;
	}
	if(hamaliExpence == "")
	{
		hamaliExpence = 0;
	}
	var discount = $('#discount').val();
	var teg = 0;
	var totalTransExpense = Number(transExpence) + Number(trans);
	var totalHamaliExpense = Number(hamaliExpence) + Number(hamali);
	
		if(transExpence != "0" && transExpence != "")
		{
			/* var checkTransExpence = /^[0-9]+$/; */
			var checkTransExpence = /^[0-9]+\.?[0-9]*$/;  
		    if(transExpence.match(checkTransExpence))
	   	    {}
			 else
				 {
				 	var msg="Please Enter Valid Transport Expense";
					var dialog = bootbox.dialog({
						message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
					    closeButton: false
					});
					
					setTimeout(function() {
						dialog.modal('hide');
					}, 1500);

					document.getElementById("discount").value = "";
					document.getElementById("discountAmount").value = "";
					document.getElementById("transExpence3").value = "";
					document.getElementById("hamaliExpence3").value = "";
					document.getElementById("transExpence").value = "";
					document.getElementById("hamaliExpence").value = "";
					var total = document.getElementById("total").value;
					document.getElementById("grossTotal").value = Number(total).toFixed(2);			
					
					return false;
				 }
			 
			var perc = document.getElementById("gstForExpense2").value;
			if(perc != "0" && perc != "")
			{
				teg=(transExpence*(perc/100));
				document.getElementById("transExpence").value = teg.toFixed(2);	
				var total = document.getElementById("total").value;
				var totalWithExpense = ((Number(total) + Number(teg) + Number(transExpence) + Number(totalHamaliExpense)) - Number(discamnt));
				document.getElementById("grossTotal").value = Number(totalWithExpense).toFixed(2);
			}
			else
			{	
				var total = document.getElementById("total").value;
				var totalWithExpense = ((Number(total) + Number(totalTransExpense) + Number(totalHamaliExpense)) - Number(discamnt));
				document.getElementById("grossTotal").value = Number(totalWithExpense).toFixed(2);
			}
		}	
		
		if(transExpence == "" || Number(transExpence) == 0)
		{
			document.getElementById("transExpence").value = 0;
			
			var total = document.getElementById("total").value;
			var hamali = document.getElementById("hamaliExpence").value;
			var trans = document.getElementById("transExpence").value;
			var hamaliTotal = Number(total) - Number(discamnt);
			var totalWithExpense =Number(hamaliTotal) + Number(hamali) + Number(hamaliExpence) ;
			document.getElementById("grossTotal").value = Number(totalWithExpense).toFixed(2);
		}	
	}
	
function discountCalculation()
{
	var discount = $('#discount').val();
	var discountAmount = document.getElementById("discountAmount").value;
	var total = document.getElementById("total").value;
	
	if(discount == "")
	{
		discountAmount = 0;
		document.getElementById("discountAmount").value = "";
				
 		var gTotal = document.getElementById("grossTotal").value;
		var hamaliExpence = document.getElementById("hamaliExpence3").value;
		var hamali = document.getElementById("hamaliExpence").value;
		var totalHamali = Number(hamaliExpence) + Number(hamali);
		if(totalHamali == "")
		{
			totalHamali = 0;
		}		
		var transExpence = document.getElementById("transExpence3").value;
		var trans = document.getElementById("transExpence").value;
		var totalTrans = Number(transExpence) + Number(trans);
		if(totalTrans == "")
		{
			totalTrans = 0;
		}

		var totalminusDiscount = (((Number(total) + Number(totalHamali) + Number(totalTrans))) - Number(discountAmount));
		document.getElementById("grossTotal").value = Number(totalminusDiscount).toFixed(2);
	}
	else if(discount != "")
	{		
		var checkDiscount = /^[0-9]+$/;
	    if(discount.match(checkDiscount))
   	    {
	   	    if(discount >= Number(100))
	    	{
		    	var msg="Discount Value Must Be less Than 100%";
				var dialog = bootbox.dialog({
					 message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
				    closeButton: false
				});
				
				setTimeout(function() {
					dialog.modal('hide');
				}, 1500);
	
				document.getElementById("discount").value = "";
				document.getElementById("discountAmount").value = "";
				document.getElementById("transExpence3").value = "";
				document.getElementById("hamaliExpence3").value = "";
				document.getElementById("transExpence").value = "";
				document.getElementById("hamaliExpence").value = "";
				document.getElementById("grossTotal").value = Number(total).toFixed(2);		
				
				return false;
			}
		}
		 else
			 {
			 	var msg="Please Enter Valid Discount";
				var dialog = bootbox.dialog({
					message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
				    closeButton: false
				});
				
				setTimeout(function() {
					dialog.modal('hide');
				}, 1500);

				document.getElementById("discount").value = "";
				document.getElementById("discountAmount").value = "";
				document.getElementById("transExpence3").value = "";
				document.getElementById("hamaliExpence3").value = "";
				document.getElementById("transExpence").value = "";
				document.getElementById("hamaliExpence").value = "";
				var total = document.getElementById("total").value;
				document.getElementById("grossTotal").value = Number(total).toFixed(2);		
				
				return false;
			 }
		 
		var hamaliExpence = document.getElementById("hamaliExpence3").value;
		var hamali = document.getElementById("hamaliExpence").value;
		var totalHamali = Number(hamaliExpence) + Number(hamali);
		if(totalHamali == "")
		{
			totalHamali = 0;
		}		
		var transExpence = document.getElementById("transExpence3").value;
		var trans = document.getElementById("transExpence").value;
		var totalTrans = Number(transExpence) + Number(trans);
		if(totalTrans == "")
		{
			totalTrans = 0;
		}
		
		var discountAmount = ((discount/100)*Number(total));
		var totalminusDiscount = (((Number(total) + Number(totalHamali) + Number(totalTrans))) - Number(discountAmount));
		document.getElementById("discountAmount").value = discountAmount.toFixed(2);
		document.getElementById("grossTotal").value = Number(totalminusDiscount).toFixed(2);
	}
}

function hamaliExpenseAddingToGross()
{	
	var hamaliExpence = document.getElementById("hamaliExpence3").value;
	var hamali = document.getElementById("hamaliExpence").value;
	//Gross total calculation

	var transExpence = document.getElementById("transExpence3").value;
	var trans = document.getElementById("transExpence").value;
	var discamnt = document.getElementById("discountAmount").value;
	
	if(discamnt == "")
	{
		discamnt = 0;
	}
	if(transExpence == "")
	{
		hamaliExpence = 0;
	}

	var discount = $('#discount').val();
	var teg = 0;
	var totalTransExpense = Number(transExpence) + Number(trans);
	var totalHamaliExpense = Number(hamaliExpence) + Number(hamali);
	
	/* if(discount == ""){ */
		
		if(hamaliExpence != "0" || hamaliExpence != "" )
		{
			 var checkTransExpence = /^[0-9]+\.?[0-9]*$/;  
		  // var checkTransExpence = ^\d{0,2}(\.\d{1,2})?$; 
		
		    if(hamaliExpence.match(checkTransExpence))
	   	    {}
			 else
				 {
				 	var msg="Please Enter Valid Labour Expence";
					var dialog = bootbox.dialog({
						message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
					    closeButton: false
					});
					
					setTimeout(function() {
						dialog.modal('hide');
					}, 1500);

					document.getElementById("discount").value = "";
					document.getElementById("discountAmount").value = "";
					document.getElementById("transExpence3").value = "";
					document.getElementById("hamaliExpence3").value = "";
					document.getElementById("transExpence").value = "";
					document.getElementById("hamaliExpence").value = "";
					var total = document.getElementById("total").value;
					document.getElementById("grossTotal").value = Number(total).toFixed(2);			
					
					return false;
				 }
			 
		    var perc = document.getElementById("gstForExpense2").value;
			if(perc != "0" && perc != "")
			{
				teg=(hamaliExpence*(perc/100));
				document.getElementById("hamaliExpence").value = teg.toFixed(2);	
				var total = document.getElementById("total").value;
				var totalWithExpense = ((Number(total) + Number(teg) + Number(hamaliExpence) + Number(totalTransExpense)) - Number(discamnt));
				document.getElementById("grossTotal").value = Number(totalWithExpense).toFixed(2);
			}
			else
			{	
				var total = document.getElementById("total").value;
				var totalWithExpense = ((Number(total) + Number(totalTransExpense) + Number(totalHamaliExpense)) - Number(discamnt));
				document.getElementById("grossTotal").value = Number(totalWithExpense).toFixed(2);
			}
		}

		if(hamaliExpence == "")
		{
			document.getElementById("hamaliExpence").value = 0;
			
			var total = document.getElementById("total").value;
			var trans = document.getElementById("transExpence").value;
			var hamali = document.getElementById("hamaliExpence").value;
			var totalWithExpense = Number(total) - Number(discamnt);
			var totalWithExpense1 = Number(totalWithExpense)+Number(trans) + Number(transExpence);
			document.getElementById("grossTotal").value = Number(totalWithExpense1).toFixed(2);
		}
	}
	

	function changeExtraValuesDisTransHamaliToZero()
	{
		document.getElementById("discount").value = "";
		document.getElementById("discountAmount").value = "";
		document.getElementById("transExpence3").value = "";
		document.getElementById("hamaliExpence3").value = "";
		document.getElementById("transExpence").value = "";
		document.getElementById("hamaliExpence").value = "";
		var total = document.getElementById("total").value;
		document.getElementById("grossTotal").value = Number(total).toFixed(2);	
	}
	/* to refresh field*/
	
	function callSupplier()
	{
		<%
			SupplierDetailsDao sdd = new SupplierDetailsDao();
			List sList =sdd.getAllSupplier(request);
		%>
	}
		
	 function checkForDuplicateBillNoEntry(){
			<%
			GoodsReceiveDao dao2 = new GoodsReceiveDao();
			List list = dao2.getAllBillNoList(request);
			%>
			
			<%
			for(int z=0;z<list.size();z++){
				GoodsReceiveBean bean = (GoodsReceiveBean)list.get(z);
			%>
			var billNo = "<%=bean.getBillNum()%>";
	
			if(document.getElementById("billNum").value == billNo )
	  		{
				var msg="Bill Number already exist...Duplicate Not allowed";
				var dialog = bootbox.dialog({
					//title: "Embel Technologies Says :",
				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
				    closeButton: false
				});
				
				setTimeout(function() {
					dialog.modal('hide');
				}, 1500);

				document.getElementById("billNum").value = "";

				return false;
			}
			<%
			}
			%>
			
			}
</script>
 <script type="text/javascript">
	 function productlist()
	 {
		 window.location = "productTxList.jsp";
	 }
</script>

</head>
<body>
<div class="container-fluid">
<div class="row header_margin_top">
			    <div align="center">
			  		<h2 class="form-name style_heading">Transfer to Store</h2>
			  	</div>			 
    </div>
   
    <div class="row" align="center">
	    <div class="hr-width">
	  		<hr class="style-one">
	    </div>	
    </div>     
  
	  <div class="">
	  <div class="container"> 
        <form class="form-horizontal" method="post" action="" name="goodsReceiveForm" id="goodsReceiveForm">
         	<fieldset>
         	<div class="shopform-margin">
          <!-- Value of 'name' attribute is used in  supplierDetails.js  --><fieldset>
       			<div class="row form-group">
           	 		<div class="col-md-6">
              			<%@include file="commons/clock.jsp" %>
           		 	</div>
				</div>
				
        	      
							
			<div class="row">
				<div class="form-group">
				   <div id="productrefresh">
		        		<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">								  
					  		<label class="control-label" for="proName">All Product Name<sup>*</sup></label>  
          				</div>
          				<div class="col-lg-3 col-md-3 col-sm-8">
							<div class="input-group">
								<span class="input-group-addon">
									<i class="	glyphicon glyphicon-list-alt"></i>
								</span>
											
									<%
							   ProductDetailsHelper cdh = new ProductDetailsHelper();
           					   List pdList =cdh.getAllMainProdInfo(request);
							
							%>
							<input list="product_drop1" id="proName1" placeholder="All Product Name" class="form-control" onchange="producttxDetailInGrid()">
						    <datalist id="product_drop1">
							<%
					           for(int i=0;i<pdList.size();i++){
					        	   ProductDetailsBean cat=(ProductDetailsBean)pdList.get(i);
							%>		
							<option data-value="<%=cat.getCatname()%>"
							        value="<%=cat.getCatname()%> :::>>> <%=cat.getSubcatname()%> :::>>> <%=cat.getProductName()%> :::>>> <%=cat.getWeight()%> :::>>> <%=cat.getPack_type()%>"
						            myvalue ="<%=cat.getProductName()%>"
						            myvalue1="<%=cat.getFk_cat_id()%>"
									myvalue2="<%=cat.getFk_subCat_id()%>"
									myvalue3="<%=cat.getProdctId()%>"
									myvalue4="<%=cat.getWeight()%>"
									myvalue5="<%=cat.getProductName()%>"
									myvalue6="<%=cat.getPack_type()%>"
							>
							<%
				      			}
				    		%>
			             
            			   </datalist>						
						</div>
					</div>
			    </div>	
			    <div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">
			        <label class="control-label" for="creditSalePrice"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("shopName") %> <%}%> <%if(abc.equals("english")){%>Shop Name<%}%><sup>*</sup></label>  
       			</div>
       			<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
					<div class="input-group">
						<span class="input-group-addon">
							<i class="	glyphicon glyphicon-user"></i>
						</span>
														
												<%
							    CategoryDetailsDao cdd = new CategoryDetailsDao();
           						List cList =cdd.getAllshop(request);
							
							%>
							<input list="shopName" id="shopName_id" placeholder="Shop Name"  class="form-control"
								   onchange="getAllSubCat()">
						<datalist id="shopName">
							<%
					           for(int i=0;i<cList.size();i++){
					        	   shopDetailsBean cat=(shopDetailsBean)cList.get(i);
							%>		
							<option data-value="<%=cat.getShopId()%>" value="<%=cat.getShopName()%>">
							<%
				      			}
				    		%>
			             
            			</datalist>		
														
														
				<%-- <input type="text" id="shopId" name="shopId" value="<%=shopName1%>" readonly="readonly" list="shop_drop1" class="form-control" >
				<input type="hidden" id="shopName" name="shopName" value="<%=shopId%>" readonly="readonly" class="form-control"> --%>
			             							
        			</div>
			  </div>
			    
			</div>
		</div>	
							
			
				<div class="row form-group" style="display: none;">
				   <div id="productrefresh">
			
		  <label class="col-md-2 control-label" for="creditSalePrice"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("shopName") %> <%}%> <%if(abc.equals("english")){%>Shop Name<%}%><sup>*</sup></label>  
       			<div class="col-md-3">
					<div class="input-group">
						<span class="input-group-addon">
							<i class="	glyphicon glyphicon-user"></i>
						</span>
														
				<input type="text" id="fk_shop_id" name="fk_shop_id"  value="<%=shopName1%>" readonly="readonly" list="shopNameList" class="form-control" >	
													
        			</div>
			  </div>
			    
			    <label class="col-md-3 control-label" for="creditSalePrice"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("shopName") %> <%}%> <%if(abc.equals("english")){%>Shop ID<%}%><sup>*</sup></label>  
       			<div class="col-md-3">
					<div class="input-group">
						<span class="input-group-addon">
							<i class="glyphicon glyphicon-user"></i>
						</span>
														
				<input type="text" id="shop_id" name="shop_id"  value="<%=shopId%>" readonly="readonly" list="shopidList" class="form-control" >	
													
        			</div>
			  </div>
			  
			</div>		</div>	
					
	<div class="row" style="margin-left: -170px;" >
		<div class="table-responsive " style="width:1350px;" > 
			<table id="jqGrid" ></table>
			<div id="jqGridPager"></div>
		</div>
	</div>
			       <!-- don't delete following row --> 
					<div class="row row form-group">
					
					</div>
		
		</div>					
	</fieldset>
	</form>
		
			<div class="row buttons-margin" align="center">
													<!-- good receive -->	
		        <!-- <input type="button" class="btn btn-large btn-success button-height-width" id="save" name="btn" value="Submit" onclick="addproducttx1()"> -->
		        <input type="button" class="btn btn-large btn-success button-height-width" id="save" name="btn" value="Submit" onclick="addproducttx()">
		        
		        <input type="button" class="btn btn-large btn-danger button-height-width" id="save" name="btn" value="Cancel" onclick="location.reload()">
				<input type="button" value=" List" id="listBtn" class="btn btn-primary" onclick="productlist()" /> 
		    </div> 
	
	</div>
</div>
	
<!-- ==================================================== SUPPLIER DETAILS POP UP ============================================================== -->
 
 

 <!-- ==================================================== END SUPPLIER DETAILS POP UP ============================================================== -->
 
 <!-- ==================================================== CATEGORY DETAILS POP UP ================================================================== -->
						
	<!-- ==================================================== END CATEGORY DETAILS POP UP ============================================================== -->	
 
<!-- ==================================================== SUB-CATEGORY DETAILS POP UP ============================================================== -->	
	


<!-- ================================================== END SUB-CATEGORY DETAILS POP UP =========================================================== -->
  
<!-- ==================================================== PRODUCT DETAILS POP UP =================================================================== -->
	

				
 <!-- ==================================================== END PRODUCT DETAILS POP UP ============================================================== -->	

</div>
<jsp:include page="commons/footer.jsp"></jsp:include>


<script>
function customerDetailsPopup() {
	 var myWindow = window.open("/Shop/jsp/Popup_Product_Details.jsp", "_blank", "toolbar=no,scrollbars=no,resizable=no,top=70,left=150,width=1000,height=500");
}
</script>
</body>