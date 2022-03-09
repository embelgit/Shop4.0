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
<%@page import="com.Fertilizer.dao.AdvanceBookinhDao"%>
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
    
    <script type="text/javascript" src="/Shop/staticContent/js/goodsreceiveFetchProduct.js"></script>
    <script type="text/javascript" src="/Shop/staticContent/js/goodsReceive.js"></script>
    <script type="text/javascript" src="/Shop/staticContent/js/supplierDetailsUnused.js"></script>
    <script type="text/javascript" src="/Shop/staticContent/js/productDetail.js"></script>
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
	var profiles = {
		windowCenter : {
			height : 550,
			width : 660,
			status : 1,
			center : 1
		},
	};
	$(function() {
		$(".popupwindow").popupwindow(profiles);
	});
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

<!-- function clearGridSelect()
{
	document.getElementById("proName").value = "";	
}-->
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
				 	var msg="Please Enter Valid Transport Expence";
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
		
</script>
<style>
.container-fluid {
	overflow: hidden;
}
</style>
</head>
<body>
<div class="container-fluid">

<div class="row header_margin_top">
    <div align="center">
  		<h2 class="form-name style_heading">Purchase Order</h2>
  	</div>			 
</div>
    
             <%
				 	Long advbookingId = 1l;
		     
				    AdvanceBookinhDao dao = new AdvanceBookinhDao();
					List bookingIdList = dao.getLastBookingNoforSupplier(request);
					
					for(int i=0;i<bookingIdList.size();i++)
					{
						AdvanceBookingBean abb = (AdvanceBookingBean)bookingIdList.get(i);
						advbookingId = abb.getBookingNo();
						advbookingId++;
					}       
		     %> 
					  		
		   <div align="right">
				<h3 class="userid">
							PO No ::
								<%
									out.println(advbookingId);
								%>
				</h3>
			</div>
   
	<div class="row" align="center">
		<div class="hr-width">
			<hr class="style-one">
		</div>	
    </div>     
  
	  <div class="">
	  <div class=""> 
        <form class="form-horizontal" method="post" action="" name="goodsReceiveForm" id="goodsReceiveForm">
          <!-- Value of 'name' attribute is used in  supplierDetails.js  --><fieldset>
       		<fieldset>
       		<div class="shopform-margin">	
       			
       			<div class="row form-group">
           	 		<div class="col-md-6">
              			<%@include file="commons/clock.jsp" %>
           		 	</div>
				</div>
				
        	       	<div class="row">
        	       		<div class="form-group">
        	       			<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
        	       				<label class="control-label" for="supplier">Supplier Name<sup>*</sup></label> 
	                      	</div>
	                      	<div id="supplierfresh">
          					  	<div class="col-lg-3 col-md-3 col-sm-8">
									<div class="input-group" id="goodrrrr">
										<span class="input-group-addon">
											<i class="glyphicon glyphicon-user"></i>
										</span>
										<input list="sup_drop" id="supplier" placeholder="Supplier Name" class="form-control" onclick="<!-- autoRefresh_div(); -->callSupplier()" onchange="getSuppliermailID()">
				            			<datalist id="sup_drop">
							
							<%
					           for(int i=0;i<sList.size();i++)
					           {
					        	   SupplierDetailsBean sup =(SupplierDetailsBean)sList.get(i);
							%>
		
											<option data-value="<%=sup.getSupId()%>" value="<%=sup.getDealerName() %>">
							<%
				      			}
				    		%>
										</datalist>
										<span class="input-group-addon">
											<button type="button" onclick="supplierDetailsDivAction(1)">
												<span class="glyphicon glyphicon-plus"  style="color: #393836;"></span>
											</button>
										</span>
									</div>
								</div>
							</div>
           					<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">
        	      				<label class="control-label" for="billNum" ><b>Supplier Email Id:</b></label>  
			           	 	</div>
			           	 	<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
								<div class="input-group">
									<span class="input-group-addon">
										<i class="glyphicon glyphicon-envelope"></i>
									</span>
	              					<input id="mailid" name="mailid" placeholder="Enter Mail ID" class="form-control input-md" type="text">
	            				</div>
	            			</div>
            			</div>
            		</div>
		
					<div class="row">
						<div class="form-group">
		 					<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
		 						<label class="control-label" for="fk_cat_id">Product Category</label>  
		       				</div>
		       				<div id="categoryrefresh">
           			 			<div class="col-lg-3 col-md-3 col-sm-8">
									<div class="input-group">
										<span class="input-group-addon">
											<i class="	glyphicon glyphicon-list-alt"></i>
										</span>
              				
							<%
							    CategoryDetailsDao cdd = new CategoryDetailsDao();
           						List cList =cdd.getAllMainCat(request);
							
							%>
										<input list="cat_drop" id="fk_cat_id" placeholder="Product Category"  class="form-control" onchange="getAllSubCat()">
										<datalist id="cat_drop">
							<%
					           for(int i=0;i<cList.size();i++){
					        	   CategoryDetailsBean cat=(CategoryDetailsBean)cList.get(i);
							%>		
											<option data-value="<%=cat.getCatId()%>" value="<%=cat.getCategoryName()%>">
							<%
				      			}
				    		%>
			             
            							</datalist>
             			     			<span class="input-group-addon">
											<button type="button" onclick="catDetailsDivAction(1)">
												 <span class="glyphicon glyphicon-plus"  style="color: #393836;"></span>
											</button>
					     				</span>
            						</div>
            					</div>
            				</div>
							<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">
		        				<label class="control-label" for="subCat">
		        <%if(abc.equals("marathi"))
		        {%>
		       		 <%=PropertiesHelper.marathiProperties.getProperty("productCat") %>
		        <%}%> 
		        <%if(abc.equals("english"))
		        {%>
		        Product Sub-Category
		        <%}%></label>
		        			</div>  
		         			<div id="subcategoryrefresh">
           			 			<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
									<div class="input-group">
										<span class="input-group-addon">
											<i class="glyphicon glyphicon-list-alt"></i>
										</span>
							<!-- 	<select class="form-control input-md" id='subCat'  name="subCat"  onchange="getProductName()" onchange="Location.reload()"></select> -->	
							 			<input list="subcategory_drop" class="form-control input-md" placeholder=" Product Sub-Category"
								    			id="subCat" name="subCat"  onchange="getProductName()" onchange="Location.reload()">
										<datalist id="subcategory_drop">
										</datalist>		
							 			<span class="input-group-addon">
											<button type="button" onclick="subcatDetailsDivAction(1)">
										 		<span class="glyphicon glyphicon-plus"  style="color: #393836;"></span>
											</button>
					     				</span>					
               						</div>
              					</div>
         					</div>
           				</div>
           			</div>
							
				<div class="row">
				   	<div class="form-group">		
				   		<div id="productrefresh">
				   			<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">	
								<label class="control-label" for="proName">Product Name</label>  
					        </div>
					        <div class="col-lg-3 col-md-3 col-sm-8">
								<div class="input-group">
									<span class="input-group-addon">
										<i class="glyphicon glyphicon-list-alt"></i>
									</span>																		
									<input list="product_drop" class="form-control input-md" id="proName" placeholder=" Product Name" name="proName"   
									       onchange="advBookingproductDetailInGrid();">
									<datalist id="product_drop"></datalist>
									<span class="input-group-addon">
									    <button type="button" onclick="productDetailsDivAction(1);">
										    <span class="glyphicon glyphicon-plus" style="color: #393836;"></span>
									    </button>
							       	</span>
								</div>
							</div>
						  	<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">
						  		<label class="control-label" for="proName">All Product Name<sup>*</sup></label>  
          					</div>  
          					<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
								<div class="input-group">
									<span class="input-group-addon">
										<i class="glyphicon glyphicon-list-alt"></i>
									</span>
											
									<%
							   ProductDetailsHelper cdh = new ProductDetailsHelper();
           					   List pdList =cdh.getAllMainProdInfo(request);
							
							%>
								<input list="product_drop1" id="proName1" placeholder="All Product Name" class="form-control" onchange="advBookingproductDetailInGrid()">
						    	<datalist id="product_drop1">
							<%
					           for(int i=0;i<pdList.size();i++){
					        	   ProductDetailsBean cat=(ProductDetailsBean)pdList.get(i);
							%>		
									<option data-value="<%=cat.getCatname()%>"
							        value="<%=cat.getCatname()%> :::>>> <%=cat.getSubcatname()%> :::>>> <%=cat.getProductName()%> :::>>> <%=cat.getWeight()%>"
						            myvalue ="<%=cat.getProductName()%>"
						            myvalue1="<%=cat.getFk_cat_id()%>"
									myvalue2="<%=cat.getFk_subCat_id()%>"
									myvalue3="<%=cat.getProdctId()%>"
									myvalue4="<%=cat.getWeight()%>"
									myvalue5="<%=cat.getProductName()%>"
							>
							<%
				      			}
				    		%>
			             
            			   		</datalist>						
							</div>
						</div>
			    	</div>	
				</div>
			</div>				
					
									
	<div class="row" style="margin-left: -170px;" >
		<div class="table-responsive " style="width:1300px" > 
			<table id="jqGrid" ></table>
			<div id="jqGridPager"></div>
		</div>
	</div>
			       <!-- don't delete following row --> 
					<div class="row row form-group">
					
					</div>
					
				<div class="row">
					<div class="form-group">
						<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
							<label class="control-label"  for="total" >Gross Total</label>  
			           	</div> 
			           	<div class="col-lg-3 col-md-3 col-sm-8">
							<div class="input-group">
								<span class="input-group-addon">
									<span class="glyphicon nogyphicon">No</span>
								</span>
	              				<input readonly="readonly" id="total" name="total" placeholder="Gross Total"  class="form-control input-md" type="text">
	              			</div>
	            		</div>
	            	</div>
	            </div>	
	            	
	            		<div class="col-md-3">
							<div class="input-group">
								<input id="podate" value="<%=todayDate%>" name="podate" class="form-control input-md" type="hidden">
	              			</div>
	            		</div>
			
			</div>
		</fieldset>
	</form>
											
			<div class="row buttons-margin" align='center'>
		         <input type="button" class="btn btn-success" id="save" name="btn" value="Submit" onclick="addingAdvanvceBooking()">
		         <input type="button" class="btn btn-danger" id="save" name="btn" value="Cancel" onclick="location.reload()">
		    </div> 
		
		
	</div>
</div>
	
<!-- ==================================================== SUPPLIER DETAILS POP UP ============================================================== -->
 
 <div id="supplierDetailsDiv" class="tab-pane fade in active" style="padding-top:0%; display: none;">
	 <form class="form-horizontal" method="post" action="" name="spld" style="padding-top:2%">
      <div class="row">
		<div align="center">
			<h2 class="form-name style_heading">Supplier Details</h2>
		</div>
	</div>
    		<div class="row form-group" style="padding-top:4%">
				<label class="col-md-3  control-label" for="dealerName">Supplier Name<sup>*</sup></label>
				<div class="col-md-3">
					<div class="input-group">
						<span class="input-group-addon"> 
						      <i class="glyphicon glyphicon-user"></i>
						</span>
						 <input list="dealerName_drop" id="dealerName"  placeholder="Supplier Name" class="form-control">
						<datalist id="dealerName_drop">
													
						</datalist>
					</div>
				</div>

				<label class="col-md-2 control-label" for="personName">Person Name</label>
				<div class="col-md-3">
					<div class="input-group">
						<span class="input-group-addon"> 
						     <i class="glyphicon glyphicon-user"></i>
						</span>
						<input list="personName_drop" id="personName"  placeholder="Person Name" class="form-control">
						<datalist id="personName_drop">
								
						</datalist>
					</div>
				</div>
			</div>

			<div class="row form-group">
				<label class="col-md-3 control-label" for="contactNo"> Contact Number</label>
				<div class="col-md-3">
					<div class="input-group">
						<span class="input-group-addon">
						     <i class="glyphicon glyphicon-phone"></i>
						</span> 
						<input id="contactNo" maxlength="10" name="contactNo" placeholder="Contact Number" class="form-control input-md " type="text">
					</div>
				</div>

				<label class="col-md-2 control-label" for="alternatenum"> Alternate Number</label>
				<div class="col-md-3">
					<div class="input-group">
						<span class="input-group-addon"> 
							<i class="glyphicon glyphicon-earphone"></i>
						</span> 
						<input id="landline" name="landline" placeholder="Alternate No" class="form-control input-md " type="text" maxlength="10">
					</div>
				</div>
			</div>

			<div class="row form-group">
				<label class="col-md-3 control-label" for="emailId">Email Id</label>
				<div class="col-md-3">
					<div class="input-group">
						<span class="input-group-addon"> 
						     <i class="glyphicon glyphicon-envelope"></i>
						</span> 
						<input id="emailId" name="emailId" placeholder="Email ID" class="form-control input-md " type="text">
					</div>
				</div>

				<label class="col-md-2 control-label" for="city">City</label>
				<div class="col-md-3">
					<div class="input-group">
						<span class="input-group-addon">
						     <i class="glyphicon glyphicon-map-marker"></i>
						</span> 
						<input id="city" name="city" placeholder="city" class="form-control input-md " type="text">
					</div>
				</div>
			</div>

			<div class="row form-group">
				<label class="col-md-3 control-label" for="tinNo">GST No</label>
				<div class="col-md-3">
					<div class="input-group">
						<span class="input-group-addon">
						     <i class="glyphicon glyphicon-font"></i>
						</span> 
						<input id="tinNo" name="tinNo" placeholder="GST No" class="form-control input-md " type="text">
					</div>
				</div>
			
				<label class="col-md-2 control-label" for="address">Address</label>
				<div class="col-md-3">
					<div class="input-group">
						<span class="input-group-addon"> 
						   <i class="glyphicon glyphicon-map-marker"></i>
						</span> 
						<input id="address" name="address" placeholder="Address" class="form-control input-md " type="text">
					</div>
				</div>
			</div>

			<div class="form-group row" style="padding-top:2%">
				<div class="col-md-6 col-md-offset-3 text-center">
					 <input style="height: 53px; width: 128px; font-size: 25" type="button" id="save"  name="btn" class="btn btn-success " value="Submit" onclick="supplierValidate();">
					 <input style="height: 53px; width: 128px; font-size: 25" type="reset"  id="save1" name="btn" class="btn btn-danger"   value="Cancel" onclick="reset()">
				</div>
			</div>
	</form>
  </div>

 <!-- ==================================================== END SUPPLIER DETAILS POP UP ============================================================== -->
 
 <!-- ==================================================== CATEGORY DETAILS POP UP ================================================================== -->
						
	<div id="catDetailsDiv" class="tab-pane fade in active" style="padding-top:2%; display: none;">
	<form class="form-horizontal" method="post" action="" name="catd">
	<div class="row" >
			<div align="center">
				<h2 class="form-name style_heading">Category Details</h2>
			</div>
		</div>
			 <div class="row form-group" style="padding-top:4%" >
           		<label class="col-md-3 col-md-offset-2 control-label" for="categoryName"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("catName") %> <%}%> <%if(abc.equals("english")){%>Category Name<%}%><sup>*</sup></label>  
           	 		<div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-list-alt"></i>
							</span>
              					<input id="categoryName" name="categoryName" placeholder="Category Name" class="form-control input-md" type="text" onchange="checkForDuplicateCategoryEntry()">
            			</div>
           		 	</div>
				</div>
				
			 <div class="form-group row" style="padding-top:3%">
		         <div class="col-md-6 text-center col-md-offset-3">
		           
		           	<input style=" width: 128px; height: 53px; font-size: 25" type="button" id="save" class="btn btn-success" name="btn1" value="Submit" onclick="catDetails()">
		            <input style=" width: 128px; height: 53px; font-size: 25" type="reset"  id="save" class="btn  btn-danger" name="btn"  value="Cancel" onclick="reset()">

		        </div>
          </div>
       </form>
     </div>
					
<!-- ==================================================== END CATEGORY DETAILS POP UP ============================================================== -->	
 
<!-- ==================================================== SUB-CATEGORY DETAILS POP UP ============================================================== -->	
	
	 <div id="subCategoryDiv" class="tab-pane fade in active" style="padding-top:2%; display: none;">    
         <form class="form-horizontal" method="post" action="" name="subCat">  
         <div class="row" >
			<div align="center">
				<h2 class="form-name style_heading">Sub Category Details</h2>
			</div>
		</div>
         <div class="row form-group" style="padding-top:6%;">
           		<label class="col-md-2  control-label" for="categoryName"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("catName") %> <%}%> <%if(abc.equals("english")){%>Category Name<%}%><sup>*</sup></label>  
           	 		<div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-list-alt"></i>
							</span>
							<%
							   CategoryDetailsDao cdd1 = new CategoryDetailsDao();
           						List cList1 =cdd1.getAllMainCat(request);
							
							%>
							<input list="cat_drop11" id="fk_cat_id11"  class="form-control" placeholder="Category Name" >
			        	<datalist id="cat_drop11">
							<%
					           for(int i=0;i<cList.size();i++){
					        	   CategoryDetailsBean cat = (CategoryDetailsBean)cList1.get(i);
							%>
		
							<option data-value="<%=cat.getCatId()%>" value="<%=cat.getCategoryName()%>">
							<%
				      			}
				    		%>
			              	
            			</datalist>
				</div>
				</div>
							
           		<label class=" col-md-2  control-label" for="categoryName"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("catName") %> <%}%> <%if(abc.equals("english")){%>Sub Category Name<%}%><sup>*</sup></label>  
           	 		<div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-list-alt"></i>
							</span>
              					<input id="subcategoryName" name="subcategoryName" placeholder="Sub Category Name" class="form-control input-md" type="text" onchange="checkForDuplicateSubCategoryEntry()">
            			</div>
           		 	</div>
				</div>
				
		 <div class="form-group row" style="padding-top:3%">
		      <div class="col-md-6 text-center col-md-offset-3">
		           <!--  "catDetails()" function is implemented in categoryDetails.js -->
		           	
		           	<input style=" width: 128px; height: 53px; font-size: 25" type="button" id="save11" class="btn btn-success" name="btn" onclick="subcat11()" value="Submit">
		            <input style=" width: 128px; height: 53px; font-size: 25" type="reset"  id="save11" class="btn  btn-danger" name="btn" onclick="reset()" value="Cancel" >
		            
		      </div>
         </div>
         </form>
      </div>

<!-- ================================================== END SUB-CATEGORY DETAILS POP UP =========================================================== -->
  
<!-- ==================================================== PRODUCT DETAILS POP UP =================================================================== -->
	
	<div id="productDetailsDiv" class="tab-pane fade in active" style="padding-top:0%; display: none;">
		 <form class="form-horizontal" method="post" action="" name="prd" id="prd" > 
   		  <div class="row">
				<div align="center">
				<h2 class="form-name style_heading">Product Details</h2>
				</div>
		 </div>
    <div class="row form-group" style="padding-top:4%">
	    <label class="col-md-2 control-label" for="fk_cat_id">
		<%
			if (abc.equals("marathi")) {
		%><%=PropertiesHelper.marathiProperties.getProperty("productCat")%>
		<%
			}
		%> <%
 	if (abc.equals("english")) {
   %>Product Category<%
 	}
   %><sup>*</sup>
					</label>
				
						<div class="col-sm-3">
							<%
								CategoryDetailsDao cdd22 = new CategoryDetailsDao();
								List cList22 = cdd22.getAllMainCat(request);
							%>
							<div class="input-group">
							<span class="input-group-addon">
							 <i class="	glyphicon glyphicon-list-alt"></i>
							</span>
							<input list="cat_drop1" id="fk_cat_id1" placeholder="Product Category" class="form-control input-md"
								   onchange="getAllSubCat1()" width="100%" autofocus>
							<datalist id="cat_drop1">
								<%
									for (int i = 0; i < cList22.size(); i++) {
										CategoryDetailsBean cat = (CategoryDetailsBean) cList22.get(i);
								%>

								<option data-value="<%=cat.getCatId()%>"
									value="<%=cat.getCategoryName()%>">
									<%
										}
									%>
								
							</datalist>
						</div>
					</div>
										
					<label class="col-md-3 control-label" for="subCat">
						<%
							if (abc.equals("marathi")) {
						%><%=PropertiesHelper.marathiProperties.getProperty("productCat")%>
						<%
							}
											%> <%
					 	if (abc.equals("english")) {
					 %>Product Subcategory<%
					 	}
					 %><sup>*</sup>
					</label>
				
					<div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon">
							<i class="	glyphicon glyphicon-list-alt"></i>
							</span> 
							<input list="subcategory_drop1"  placeholder="Product Sub-Category" class="form-control input-md"
								   id='subCat1' name="subCat">
							<datalist id="subcategory_drop1"></datalist> 
						</div>
					</div>
				</div>
				
				<div class="row form-group">
				
					<label class="col-md-2 control-label" for="productName">
						<%
							if (abc.equals("marathi")) {
						%><%=PropertiesHelper.marathiProperties.getProperty("productName")%>
						<%
							}
						%> <%
 	if (abc.equals("english")) {
 %>Product Name<%
 	}
 %><sup>*</sup>
					</label>
					<div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon"> 
							<i class="	glyphicon glyphicon-list-alt"></i>
							</span>
							<input list="productName_drop" id="productName" placeholder="Product Name" 
							       class="form-control" onblur="checkForDuplicateProductEntry()">
						</div>
					</div>
					
					

					<label class="col-md-3 control-label" for="manufacturingCompany">
						<%
							if (abc.equals("marathi")) {
						%><%=PropertiesHelper.marathiProperties.getProperty("company")%>
						<%
							}
						%> <%
 	if (abc.equals("english")) {
 %>Manufacturing Company<%
 	}
 %><sup>*</sup>
					</label>
					<div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon">
							<i class="	glyphicon glyphicon-list-alt"></i>
							</span>
							<input list="manufacturingCompany_drop" placeholder="Manufacturing Company" id="manufacturingCompany"
								   class="form-control" onblur="checkForDuplicateProductEntry()">
						</div>
					</div>
				</div>
				
				
				
				<div class="row form-group">			
  <label class="col-md-2 control-label" for="weight">
<%if (abc.equals("marathi")) {%><%=PropertiesHelper.marathiProperties.getProperty("weight")%><%
	}%> <%	if (abc.equals("english")) {
            %>Packing<%
      } %>
 </label>
		   <div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon"> <i
							class="	glyphicon glyphicon-hand-right"></i>
						</span>

							<%
								ProductDetailsDao productdao2 = new ProductDetailsDao();
								List productList2 = productdao2.getAllProductDetails(request);
							%>
							<input list="weight_drop" id="weight" class="form-control" value = "1" onblur="checkForDuplicateProductEntry()" 
							readonly="readonly">
							<datalist id="weight_drop">
								<%
									for (int i = 0; i < productList2.size(); i++) {
										ProductDetailsBean productbean2 = (ProductDetailsBean) productList2.get(i);
								%>
								<option data-value="<%=productbean2.getProdctId()%>"<%=productbean2.getWeight()%>>
									<%
										}
									%>
							</datalist>
						</div>
					</div>
		   
<label class="col-md-3 control-label" for="Unit">
	<%if (abc.equals("marathi")) {%><%=PropertiesHelper.marathiProperties.getProperty("unit")%><%
	}%> <% if (abc.equals("english")) {
      %>Unit<%
   	} %>
 	</label>
					<div class="col-md-3">
					<div class="input-group">
						<span class="input-group-addon"> <i
							class="	glyphicon glyphicon-hand-right"></i>
						</span>
						<%
							MeasuringUnitsDao mdao = new MeasuringUnitsDao();
							List uList = mdao.getAllUnits(request);
						
								for (int i = 0; i < uList.size(); i++) {
									MeasuringUnitsBean bean = (MeasuringUnitsBean) uList.get(i);
									
									if(bean.getUnitName().equalsIgnoreCase("pcs"))
									{
										bean.setUnitName("Box");
									}	
						%>
						<input list="unit_drop" id="fk_unit_id" placeholder="Unit" class="form-control"	style="width: 199px;">
						<datalist id="unit_drop">

							
							<option data-value="<%=bean.getPkUnitId()%>"
							     	value=<%=bean.getUnitName()%>>
								<%
									}
								%>
							</datalist>
					</div>
				</div>

				</div>
				
				<%-- 
				
				<div class="row form-group">
					<!-- <label class="col-md-2 control-label" style="text-align: right"	for="fk_tax_id">Tax Name<sup>*</sup></label> -->
					<label class="col-md-2 control-label" style="margin-left: -5px;" for="fk_tax_id">Tax Name<sup>*</sup></label>
					<div class="col-md-3" style="width: 292px;">
						<div class="input-group" style="width: 100%;">
							 <span class="input-group-addon"> 
								<i class="	glyphicon glyphicon-list-alt"></i>
							</span>

							<%
								TaxCreationDao tcd = new TaxCreationDao();
								List tList = tcd.getAllMainTax(request);
							%>
							
							<select class="form-control input-md" autofocus name="fk_tax_id" id="fk_tax_id" 
								onChange="ChooseContact(this);salePriceWithoutTax();getcsgst();" style="width: 199px;">
								<option value="1">--Select Tax--</option>
								<%
									for (int i = 0; i < tList.size(); i++) {
										TaxCreationBean tax = (TaxCreationBean) tList.get(i);
								%>

								<option value="<%=tax.getTxId()%>"
								    	myid="<%=tax.getTaxPercentage()%>"><%=tax.getTaxType()%>
								</option>
								<%
									}
								%>
						  </select>
						</div>
					</div> 
			
					 <label class="col-md-2 control-label" 
						for="weight"> GST</label> 
					
					<div class="col-md-3" style="width: 263px;">
						<div class="input-group" style="margin-left: 45px;">
							<span class="input-group-addon"> % </span> <input
								id="taxPercentage" name="taxPercentage"
								placeholder="GST %" class="form-control input-md"
								type="text" readonly="readonly">
						</div>
					</div>
				</div> 
				
				 --%>
				
				
				
				
				
				<div class="row form-group">
  <label class="col-md-2 control-label" for="fk_tax_id"> 
  Tax Name<sup>*</sup>
</label>

					<div class="col-md-3">
						<div class="input-group">
						
						<span class="input-group-addon"> 
								<i class="	glyphicon glyphicon-list-alt"></i>
							</span>

							<%
								TaxCreationDao tcd = new TaxCreationDao();
								List tList = tcd.getAllMainTax(request);
							%>
							
							<select class="form-control input-md" autofocus name="fk_tax_id" id="fk_tax_id" 
								onChange="ChooseContact(this);salePriceWithoutTax();getcsgst();" style="width: 199px;">
								<option value="1">--Select Tax--</option>
								<%
									for (int i = 0; i < tList.size(); i++) {
										TaxCreationBean tax = (TaxCreationBean) tList.get(i);
								%>

								<option value="<%=tax.getTxId()%>"
								    	myid="<%=tax.getTaxPercentage()%>"><%=tax.getTaxType()%>
								</option>
								<%
									}
								%>
						  </select> 
								
						</div>
					</div>

	<label class="col-md-3 control-label" for="weight"> GST

					</label>

					<div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon"> % </span> <input id="taxPercentage"
								name="taxPercentage" placeholder="GST %" class="form-control input-md" 
								type="text" readonly="readonly" >
						</div>
					</div>
</div>
				
				
				
				
				
	
<div class="row form-group">
  <label class="col-md-2 control-label" for="sgst"> 
  <%
 	if (abc.equals("marathi")) {
  %>
 <%=PropertiesHelper.marathiProperties.getProperty("sgst")%>
 <%
	}
 %> 
 <%
   if (abc.equals("english")) {
   %>SGST<%
 	}
 %>
</label>

					<div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon"> % </span> <input id="sgst"
								name="sgst" placeholder="SGST %" class="form-control input-md"
								type="text" readonly="readonly">
						</div>
					</div>

	<label class="col-md-3 control-label" for="cgst"> <%
 	if (abc.equals("marathi")) {
 %><%=PropertiesHelper.marathiProperties.getProperty("cgst")%>
						<%
							}
						%> <%
 	if (abc.equals("english")) {
 %>CGST<%
 	}
 %>
					</label>

					<div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon"> % </span> <input id="cgst"
								name="cgst" placeholder="CGST %" class="form-control input-md" 
								type="text" readonly="readonly" >
						</div>
					</div>


</div>

<div class="row form-group">
  <label class="col-md-2 control-label" for="mrp"> 
  <%
 	if (abc.equals("marathi")) {
  %>
 <%=PropertiesHelper.marathiProperties.getProperty("")%>
 <%
	}
 %> 
 <%
   if (abc.equals("english")) {
   %>M.R.P<%
 	}
 %>
					</label>

					<div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon"> Rs </span> <input id="mrp"
								name="mrp" value="0" class="form-control input-md"
								type="text" onblur="salePriceWithoutTax()" readonly="readonly">
						</div>
					</div>


	<label class="col-md-3 control-label" for="buyPrice"> <%
 	if (abc.equals("marathi")) {
 %><%=PropertiesHelper.marathiProperties.getProperty("buyPrice")%>
<%	} %> <%
 	if (abc.equals("english")) {
 %>Buy Price(Incl Tax)<%
 	} %><sup>*</sup>
	</label>

					<div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon"> Rs </span> <input id="buyPrice"
								name="buyPrice" placeholder="Buy Price(Incl Tax)"
								class="form-control input-md" type="text">  <!-- onchange="buyPriceChecklessthanmrp()" -->
						</div>
					</div>


				</div>

				<div class="row form-group">
	<label class="col-md-2 control-label" for="spwithoutgst"> <%
 	if (abc.equals("marathi")) {
 %><%=PropertiesHelper.marathiProperties.getProperty("spwithoutgst")%>
	<%	}%> <%
 	if (abc.equals("english")) {
 %>S.P(Excl Tax)<%	}%><sup>*</sup>
 </label>
					<div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon"> Rs </span> <input
								id="spwithoutgst" name="spwithoutgst"
								placeholder="Sale Price(Excl Tax)"
								class="form-control input-md" type="text" onchange="salePriceWithTax()">
								 <!-- onchange="salePriceWithoutTax();salePriceWithTax()" -->
						</div>
					</div>

     
     <label class="col-md-3 control-label" for="salePrice"> <%
 	if (abc.equals("marathi")) {
 %><%=PropertiesHelper.marathiProperties.getProperty("salePrice")%>
	<% } %> <%
 	if (abc.equals("english")) {
 %>Sale Price/Unit(Incl Tax)<% } %><sup>*</sup>
	</label>
	                <div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon"> Rs </span> <input id="salePrice" 
								name="salePrice" placeholder="Sale Price/Unit(Incl Tax)"
								class="form-control input-md" type="text"
								onchange="salePriceWithoutTax()" readonly="readonly">
						</div>
					</div>
	
     				
				</div>


				<%-- <div class="row form-group">
					<label class="col-md-2 control-label" style="text-align: right;"
						for="hsn">
						<%
							if (abc.equals("marathi")) {
						%><%=PropertiesHelper.marathiProperties.getProperty("salePrice")%>
						<%
							}
						%> <%
 	if (abc.equals("english")) {
 %>HSN code<%
 	}
 %>
					</label>
					<div class="col-md-3" style="width: 292px;">
						<div class="input-group">
							<span class="input-group-addon"> No </span> 
							<input id="hsn" name="hsn" placeholder="HSN Code"
								class="form-control input-md" type="text" style="width: 196px;">
						</div>
					</div>
					
					<label class="col-md-2 control-label" style="margin-left: 70px;" for="creditSalePrice">
						<%
							if (abc.equals("marathi")) {
						%><%=PropertiesHelper.marathiProperties.getProperty("shopName")%>
						<%
							}
						%> <%
 	if (abc.equals("english")) {
 %>Shop Name<%
 	}
 %>
					</label>
					<div class="col-md-3" style="width: 273px;">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="	glyphicon glyphicon-user"></i>
							</span>
						<input type="text" id="fk_shop_id" name="fk_shop_id"  value="<%=shopName1%>" readonly="readonly" list="shopNameList" class="form-control" >
						</div>
					</div>
    			</div> --%>
    			
    			
<div class="row form-group">
  <label class="col-md-2 control-label" for="hsn"> 
<%
							if (abc.equals("marathi")) {
						%><%=PropertiesHelper.marathiProperties.getProperty("salePrice")%>
						<%
							}
						%> <%
 	if (abc.equals("english")) {
 %>HSN code<%
 	}
 %>
					</label>

					<div class="col-md-3" >
						<div class="input-group">
							<span class="input-group-addon"> No </span> 
							<input id="hsn" name="hsn" placeholder="HSN Code"
								class="form-control input-md" type="text" >
						</div>
					</div>


	<label class="col-md-3 control-label" for="creditSalePrice">
	<%
							if (abc.equals("marathi")) {
						%><%=PropertiesHelper.marathiProperties.getProperty("shopName")%>
						<%
							}
						%> <%
 	if (abc.equals("english")) {
 %>Shop Name <%
 	}
 %>
	</label>

					<div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon"> 
							<i class="	glyphicon glyphicon-user"></i>
							</span>
						<input type="text" id="fk_shop_id" name="fk_shop_id"  value="<%=shopName1%>" readonly="readonly" list="shopNameList" 
						class="form-control input-md" >
						</div>
					</div>
				</div>
    			
    			
    <div class="row form-group">
<label class="col-md-2 control-label" for="productdescription">
	<%
		if (abc.equals("marathi")) {
	%><%=PropertiesHelper.marathiProperties.getProperty("description")%>
	<%
		}
	%> <%
 if (abc.equals("english")) {
 %>Description<%
 	}
 %>	</label>
					<div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon">
							<i class="	glyphicon glyphicon-list-alt"></i>
							</span>
						
							<input type="text" placeholder="Description" id="description" class="form-control">
							
						</div>
					</div> 
					</div>   			
    			
				<div class="form-group row" style="padding-top:2%">
					<div align="center">
						 <input style="height: 53px; width: 128px; font-size: 25" type="button" id="save1"  name="save1" class="btn btn-success " value="Submit" onclick="productDetails1()">
					     <input style="height: 53px; width: 128px; font-size: 25" type="reset"  id="save2"  name="save2" class="btn btn-danger"   value="Cancel" onclick="reset()">
			    	</div>
			  </div>
           
		</form>
    </div>
				
 <!-- ==================================================== END PRODUCT DETAILS POP UP ============================================================== -->	

</div>
<jsp:include page="commons/footer.jsp"></jsp:include>


<script>
function customerDetailsPopup() {
	 var myWindow = window.open("/Shop/jsp/Popup_Product_Details.jsp", "_blank", "toolbar=no,scrollbars=no,resizable=no,top=70,left=150,width=1000,height=500");
}
</script>
</body>