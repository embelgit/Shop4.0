<%@page import="com.Fertilizer.hibernate.SubCategoryDetailsBean"%>
<%@page import="com.Fertilizer.bean.GetProductDetails"%>
<%@page import="com.Fertilizer.dao.TaxCreationDao"%>
<%@page import="com.Fertilizer.hibernate.TaxCreationBean"%>
<%@page import="com.Fertilizer.dao.CategoryDetailsDao"%>
<%@page import="com.Fertilizer.dao.ProductDetailsDao"%>
<%@page import="com.Fertilizer.dao.SupplierDetailsDao"%>
<%@page import="com.Fertilizer.hibernate.SupplierDetailsBean"%>
<%@page import="com.Fertilizer.hibernate.CategoryDetailsBean"%>
<%@page import="com.Fertilizer.dao.MeasuringUnitsDao"%>
<%@page import="com.Fertilizer.hibernate.MeasuringUnitsBean"%>
<%@page import="java.util.List"%>
<%@page import="com.Fertilizer.hibernate.TaxCreationBean"%>
<%@page import="com.Fertilizer.dao.TaxCreationDao"%>
<%@page import="com.Fertilizer.dao.shopDetailsDao"%>
<%@page import="com.Fertilizer.hibernate.shopDetailsBean"%>
<%@page import="java.util.*"%>
<%
	boolean isHome = false;
%>
<%@include file="commons/header.jsp"%>

<head>

<script type="text/javascript" src="/Shop/staticContent/js/jquery.min.js"></script>
<script type="text/javascript" src="/Shop/staticContent/js/jquery-ui.min.js"></script>

<link rel="stylesheet" href="/Shop/staticContent/css/ui.jqgrid.min.css">
<link rel="stylesheet" href="/Shop/staticContent/css/ui.jqgrid.css">
<link rel="stylesheet" href="/Shop/staticContent/y_css/jquery-ui.css">

<script type="text/javascript" src="/Shop/staticContent/js/bootbox.min.js"></script>
<script type="text/javascript" src="/Shop/staticContent/js/bootstrap.js"></script>
<script type="text/javascript" src="/Shop/staticContent/js/jquery.popupwindow.js"></script>

<script type="text/javascript" src="/Shop/staticContent/js/vatpercentage.js"></script>
<script type="text/javascript" src="/Shop/staticContent/js/productDetail.js"></script>
<script type="text/javascript" src="/Shop/staticContent/js/categoryDetails.js"></script>
<script type="text/javascript" src="/Shop/staticContent/js/units.js"></script>
<script type="text/javascript" src="/Shop/staticContent/js/taxCreation.js"></script>

<script type="text/javascript">
function mypopup(url)
{
    /* width = window.screen.width;
    height = window.screen.height; */
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
	
	function munitDetailsDivAction(a)
	{	
		if(a==1){
			$( "#measuringunitDiv" ).dialog({height: 420, width:1000});   	
	    }else{
	    	$( "#measuringunitDiv" ).dialog('close');  
	    }		
		$('#measuringunitfresh').load(document.URL +  ' #measuringunitfresh');
	}
	
	function taxtypeDetailsDivAction(a)
	{	
		if(a==1){
			$( "#taxtypeDiv" ).dialog({height: 480, width:1000});   	
	    }else{
	    	$( "#taxtypeDiv" ).dialog('close');  
	    }		
		$('#taxtypefresh').load(document.URL +  ' #taxtypefresh');
	}
	
</script>

<script type="text/javascript">

function addMeasuringUnit1()
{
	document.munits.save.disabled = true;
	addMeasuringUnit();
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
		  	
	  	%>
<script type="text/javascript">
<!-- ================= Check Duplicate Product =================== -->
function checkForDuplicateProductEntry(){
	
    var prodName = document.getElementById("productName").value;
	
	<%
		  ProductDetailsDao dao = new ProductDetailsDao();
 		  List list = dao.getProductDetails();
%>
<% 
   for (int z = 0; z < list.size(); z++) {
	GetProductDetails bean = (GetProductDetails) list.get(z);
%>
		var pro = "<%=bean.getProduct()%>";
		var company = "<%=bean.getManufacturer()%>";
		var weight = "<%=bean.getWeight()%>";
		          					
		if(prodName == pro && manucomp == company && packing == weight ){
			alert("Product Already Exist...Duplicate Not Allowed");
			location.reload();
			return false;
		}
	<%}%>
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
<!-- ================= Check Duplicate Unit =================== -->
function checkForDuplicateUnitEntry()
{   
	<%
		MeasuringUnitsDao dao3 = new MeasuringUnitsDao();
		List list2 = dao3.getAllUnits(request);
	%>
	
	<%
		for(int p=0;p<list2.size();p++)
		{
			MeasuringUnitsBean bean = (MeasuringUnitsBean)list2.get(p);
	%>
		var Unit = "<%=bean.getUnitName()%>";

		if(document.getElementById("unitName").value == Unit )
  		{
			var msg="Unit Name already exist...Duplicate are Not allowed";
			var dialog = bootbox.dialog({
				
			    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
			    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
			    closeButton: false
			});
			
			setTimeout(function() {
				dialog.modal('hide');
			}, 1500);

			document.getElementById("unitName").value = "";
			
			return false;
		}
	<%
	}
	%>
} 
</script>
<script type="text/javascript">
<!-- ================= Check Duplicate Tax Type =================== -->
function checkForDuplicateTaxTypeEntry(){
	<%
	TaxCreationDao dao2 = new TaxCreationDao();
	List list11 = dao2.getAllTaxList(request);
	%>
	
	<%
	int z = 0;
	for(z=0;z<list11.size();z++){
		TaxCreationBean bean = (TaxCreationBean)list11.get(z);
	%>
	var taxType = "<%=bean.getTaxType()%>";

	if(document.getElementById("taxType").value == taxType )
 		{
		var msg="Tax Type already exist...Duplicate Not allowed";
		var dialog = bootbox.dialog({
			
		    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
		    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		    closeButton: false
		});
		
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);

		document.getElementById("taxType").value = "";

		return false;
	}
	<%
	}
	%>
}	

function checkForDuplicateTaxTypeEntryforPopUp(){
	<%
	TaxCreationDao dao222 = new TaxCreationDao();
	List list111 = dao222.getAllTaxList(request);
	%>
	
	<%
	int y = 0;
	for(y=0;y<list111.size();y++){
		TaxCreationBean bean = (TaxCreationBean)list111.get(y);
	%>
	var taxType = "<%=bean.getTaxType()%>";

	if(document.getElementById("taxType1").value == taxType )
 		{
		var msg="Tax Type already exist...Duplicate Not allowed";
		var dialog = bootbox.dialog({
			
		    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
		    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		    closeButton: false
		});
		
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);

		document.getElementById("taxType1").value = "";

		return false;
	}
	<%
	}
	%>
}	
</script>
<script type="text/javascript">
function back()
{
	window.close();
}
</script>
 <script type="text/javascript">
	 function productlist()
	 {
		 window.location = "productList.jsp";
	 }
	 function editProduct() {
		 window.location = "editProductDetails.jsp";
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
		
		var rate = (spwithoutgst*(1+(taxpercentage/100)));
		document.getElementById("salePrice").value = Math.round(rate * 100) / 100;
		
		if(Number(spwithoutgst) >= Number(buyPrice)){
//			var rate = (spwithoutgst*(1+(taxpercentage/100)));
//			document.getElementById("salePrice").value = Math.round(rate * 100) / 100;
		}else{
		//	alert("Enter Sale Price Greater than Buy Price")
		//	document.getElementById("spwithoutgst").value="";
		//	document.getElementById("salePrice").value="";
		}
	}
}
</script>

<script type="text/javascript">
<!-- ================= Sale Price With Tax =================== -->
function buyPriceWithTax()
{
	var  taxpercentage=document.getElementById("taxPercentage").value;
	var  spwithoutgst=document.getElementById("buyPrice").value;
	//var  mrp=document.getElementById("mrp").value;
	var  buyPrice=document.getElementById("buyPrice").value;
	
    if(salePrice ==""){
		
		return false;
	}else{				
		
		var rate = (spwithoutgst*(1+(taxpercentage/100)));
		document.getElementById("bptax").value = Math.round(rate * 100) / 100;
		
		if(Number(spwithoutgst) >= Number(buyPrice)){
//			var rate = (spwithoutgst*(1+(taxpercentage/100)));
//			document.getElementById("salePrice").value = Math.round(rate * 100) / 100;
		}else{
		//	alert("Enter Sale Price Greater than Buy Price")
		//	document.getElementById("spwithoutgst").value="";
		//	document.getElementById("salePrice").value="";
		}
	}
}
</script>

<script>
function mrpTax(){
	var  taxpercentage=document.getElementById("taxPercentage").value;
	var  mrp=document.getElementById("mrp").value;
	var  buyPrice=document.getElementById("buyPrice").value;
	if(taxpercentage=="" || taxpercentage==null){
		taxpercentage=0;
	}
	
  BpwTax = (mrp/(1+(taxpercentage/100)));
		var  buyPrice=document.getElementById("buyPrice").value = BpwTax.toFixed(2);
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
<!-- Following code is used to show tax percentage in % field with the help of  "myid" and "taxPercentage"-->
function ChooseContact(data)
	{
		document.getElementById("taxPercentage").value=(data.options[data.selectedIndex].getAttribute("myid"));
	}
</script>

<script>
function uvalue(){
	
	var un = document.getElementById("fk_unit_id").value;
	var ud = document.getElementById("saleunit").value;

	if(un==ud){
			document.getElementById("unitvalue").value = 1;
	}
	if(un!=ud){
	//	document.getElementById("weight").value = 1;
	}
}
</script>

<script type="text/javascript">
function caldis(){
	
	var gs = 	document.getElementById("dis").value;
	var amt = document.getElementById("salePrice").value;
	if(amt=="" || amt==null){
		alert("please enter saleprice first");
		return
	}
	else{
	var tot = amt - gs;
	
	document.getElementById("salePrice").value = tot;
	}
}
</script>
</head>

<body>
<div class="container-fluid">

	<div class="row header_margin_top">
		<div align="center">
			<h2 class="form-name style_heading">
				<%
					if (abc.equals("marathi")) {
				%><%=PropertiesHelper.marathiProperties.getProperty("productDetails")%>
				<%
					}
				%>
				<%
					if (abc.equals("english")) {
				%>Product Details<%
					}
				%>
			</h2>
		</div>

	</div>

	<div class="row" align="center">
		<div class="hr-width">
			<hr class="style-one">
		</div>
	</div>
	<div class="container">
		<form class="form-horizontal" method="post" action="prds" name="prd" id="prd">
			<!-- Value of 'name' attribute is used in  productDetail.js  -->
			<fieldset>
				<div class="row form-group">
					<div class="col-md-6">
						<%@include file="commons/clock.jsp"%>
					</div>
</div>
<div class="row form-group">
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
					<div id="categoryrefresh">
						<div class="col-sm-3">
							

							<!-- Following code is to get categories from "categories" table of "fertilizer" DB -->
							<!-- getAllMainCat() is implemented in  CategoryDetailsDao with return type List-->
							<%
								CategoryDetailsDao cdd = new CategoryDetailsDao();
								List cList = cdd.getAllMainCat(request);
							%>
							<div class="input-group">
							<span class="input-group-addon">
							 <i class="	glyphicon glyphicon-list-alt"></i>
							</span>
							<input list="cat_drop" id="fk_cat_id" placeholder="Product Category" class="form-control"
								   onchange="getAllSubCat()" width="100%" autofocus>
							<datalist id="cat_drop">
								<%
									for (int i = 0; i < cList.size(); i++) {
										CategoryDetailsBean cat = (CategoryDetailsBean) cList.get(i);
								%>

								<option data-value="<%=cat.getCatId()%>"
								    	value="<%=cat.getCategoryName()%>">
									<%
										}
									%>
								
							</datalist>
							<span class="input-group-addon">
								<button type="button" onclick="catDetailsDivAction(1);">
									<span class="glyphicon glyphicon-plus" style="color: #393836;"></span>
								</button>
							</span>
						</div>
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
				<div id="subcategoryrefresh">
					<div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon">
							<i class="	glyphicon glyphicon-list-alt"></i>
							</span> 
							
							<input list="subcategory_drop"  placeholder="Product Sub-Category" class="form-control input-md"
								id='subCat' name="subCat">
							<datalist id="subcategory_drop"></datalist>

							<span class="input-group-addon">
								<button type="button" onclick="subcatDetailsDivAction(1)">
									<span class="glyphicon glyphicon-plus" style="color: #393836;"></span>
								</button>
							</span> 
						</div>
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
 %> <sup>*</sup>
					</label>
					<div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon"> 
							<i class="	glyphicon glyphicon-list-alt"></i>
							</span>
							<input list="productName_drop" id="productName" placeholder="Product Name" 
							       class="form-control" onchange="checkForDuplicateProductEntry()"> 
							
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

							<%-- <%
								ProductDetailsDao productdao1 = new ProductDetailsDao();
								List productList1 = productdao1.getAllProductDetails();
							%> --%>
							<input list="manufacturingCompany_drop" placeholder="- Company" id="manufacturingCompany"
								   class="form-control" onblur="checkForDuplicateProductEntry()" onchange="checkForDuplicateProductEntry();">
							<%-- <datalist id="manufacturingCompany_drop">
								<%
									for (int i = 0; i < productList1.size(); i++) {
										ProductDetailsBean productbean1 = (ProductDetailsBean) productList1.get(i);
								%>

								<option data-value="<%=productbean1.getProdctId()%>"
									value="<%=productbean1.getManufacturingCompany()%>">
									<%
										}
									%>
								
							</datalist> --%>
						</div>
					</div>
				</div>

<label class="col-md-2 control-label" style="margin-left: -3px;" for="weight">
<%
	if (abc.equals("marathi")) {%><%=PropertiesHelper.marathiProperties.getProperty("weight")%><%}%> <%
 	if (abc.equals("english")) {
 %>Weight<%
 	}
 %>
</label>
				<div class="col-md-3">
						<div class="input-group" style="margin-left: -8px;">
							<span class="input-group-addon"> <i
							class="	glyphicon glyphicon-hand-right"></i>
						</span>

							<input type="text" id="weight" name="weight" placeholder="Weight" class="form-control" value="1" readonly="readonly" onchange="checkForDuplicateProductEntry()" >
<%-- 							<%
								ProductDetailsDao productdao2 = new ProductDetailsDao();
								List productList2 = productdao2.getAllProductDetails(request);
							%>
							<input list="weight_drop" id="weight" class="form-control" value = "1"
							       onblur="checkForDuplicateProductEntry()" readonly="readonly">
							<datalist id="weight_drop">
								<%
									for (int i = 0; i < productList2.size(); i++) {
										ProductDetailsBean productbean2 = (ProductDetailsBean) productList2.get(i);
								%>

								<option data-value="<%=productbean2.getProdctId()%>"
									<%=productbean2.getWeight()%>>
									<%
										}
									%>
								
							</datalist> --%>
						</div>
					</div>

<div class="row form-group">

<label class="col-md-3 control-label" style="margin-left: 0px;" for="Unit">
<%
	if (abc.equals("marathi")) {%><%=PropertiesHelper.marathiProperties.getProperty("unit")%><%	}%> <%
 	if (abc.equals("english")) {
 %>Buy Unit<%
 	}
 %>
</label>
			<div id="measuringunitfresh">
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
								
							/*	if(bean.getUnitName().equalsIgnoreCase("pcs"))
								{
									bean.setUnitName("Box/pcs");
								}	*/
								
						%>
						<input list="unit_drop" id="fk_unit_id" placeholder="Unit" class="form-control"	style="width: 223px;">
						<datalist id="unit_drop">

 							<option data-value="<%=bean.getPkUnitId()%>"
							     	value=<%=bean.getUnitName()%>>
								<%
									}
								%>
							
						</datalist>

						<!-- <span class="input-group-addon">
							<button type="button" onclick="munitDetailsDivAction(1)">
								<span class="glyphicon glyphicon-plus" style="color: #393836;"></span>
							</button>
						</span> -->


					</div>
				</div>
			</div>
		</div>

<div class="row form-group">
<label class="col-md-2 control-label" for="unitDescription">Sale Unit</label>  
           	 		<div class="col-md-3">
            			<div class="input-group">
							<span class="input-group-addon">
								<i class="	glyphicon glyphicon-list-alt"></i>
							</span>
              				<select id="saleunit" name="saleunit" placeholder="Secondary Unit" class="form-control" onchange="uvalue()">
								<option value="">Select Sale Unit</option>
				<option value="Bags">Bags</option>
				<option value="Bottles">Bottles</option>
				<option value="Box">Box</option>
				<option value="Bundles">Bundles</option>
				<option value="Cans">Cans</option>
				<option value="Cartons">Cartons</option>
				<option value="Dozens">Dozens</option>
				<option value="Grams">Grams</option>
				<option value="Kilograms">Kilograms</option>
				<option value="Litre">Litre</option>				
				
				<option value="Meters">Meters</option>
				<option value="Millitre">Millitre</option>
				<option value="Numbers">Numbers</option>
				<option value="Packs">Packs</option>
				<option value="Pairs">Pairs</option>
				<option value="Pieces">Pieces</option>
				<option value="Quintal">Quintal</option>
				<option value="Rolls">Rolls</option>
				<option value="Feet">Feet</option>
				<option value="Square Feet">Square Feet</option>
				<option value="Square Meters">Square Meters</option>
				<option value="Barrel">Barrel</option>
				<option value="Tin">Tin</option>								
				<option value="Tablets">Tablets</option>			
				</select>						
				
           		 	</div>
           		 </div>
           		 </div>
            	

<div class="row form-group">
           		<label class="col-md-2 control-label" for="unitName">1 Buy Unit</label>  
           	 		<div class="col-md-3">
            			<div class="input-group">
							<span class="input-group-addon">
								<i class="	glyphicon glyphicon-list-alt"></i>
							</span>
  				<input type="text" id="1unit" name="1unit" value="1" class="form-control" readonly="readonly" >
							
            			</div>
           		 	</div>
           		 	
           		 	
           		 	<label class="col-md-3 control-label" for="unitDescription">Sale Unit</label>  
           	 		<div class="col-md-3">
            			<div class="input-group">
							<span class="input-group-addon">
								<i class="	glyphicon glyphicon-list-alt"></i>
							</span>
              				
							<input type="text" id="unitvalue" name="unitvalue" value="1" placeholder="Unit Conversion" class="form-control" >
            			</div>
           		 	</div>
           		 </div>
           	

				<div class="row form-group">
					<label class="col-md-2 control-label" style="text-align: right"	for="fk_tax_id">Tax Name:<sup>*</sup></label>
					<div id="taxtypefresh">
					<div class="col-md-3" style="width: 286px;">
						<div class="input-group" style="width: 100%;">
							<span class="input-group-addon"> 
								<i class="	glyphicon glyphicon-list-alt"></i>
							</span>

							<%
								TaxCreationDao tcd = new TaxCreationDao();
								List tList = tcd.getAllMainTax(request);
							%>
							
							<select class="form-control input-md" autofocus name="fk_tax_id" id="fk_tax_id" 
								onChange="ChooseContact(this);salePriceWithoutTax();getcsgst()" style="width: 180px;">
								
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

							</select> <span class="input-group-addon">
								<button type="button" id="popup" onclick="taxtypeDetailsDivAction(1)">
									<span class="glyphicon glyphicon-plus" style="color: #393836;"></span>
								</button>
							</span>
						</div>
					</div>
					</div>
					<label class="col-md-3 control-label" style="margin-left: 8px;" for="weight"> GST <sup></sup></label>

					<div class="col-md-3" style="width: 292px;">
						<div class="input-group">
							<span class="input-group-addon"> % </span> <input
								id="taxPercentage" name="taxPercentage"
								placeholder="GST %" class="form-control input-md"
								type="text" readonly="readonly">
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
								type="text">
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
								type="text"  >
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
								type="text">
						</div>
					</div>


	<label class="col-md-3 control-label" for="buyPrice"> <%
 	if (abc.equals("marathi")) {
 %><%=PropertiesHelper.marathiProperties.getProperty("buyPrice")%>
						<%
							}
						%> <%
 	if (abc.equals("english")) {
 %>Buy Price(Incl Tax)<%
 	}
 %><sup>*</sup>
					</label>

					<div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon"> Rs </span> <input id="buyPrice"
								name="buyPrice" placeholder="Buy Price"
								class="form-control input-md" type="text" value="0"  onchange="buyPriceWithTax()" onchange="buyPriceChecklessthanmrp()" >
						</div>
					</div>


				</div>

<div class="row form-group">
<label class="col-md-2 control-label" style="text-align: right" for="dis">
<%
	if (abc.equals("marathi")) {%><%=PropertiesHelper.marathiProperties.getProperty("discount")%><%}%> <%
 	if (abc.equals("english")) {
 %>Discount<%
 	}
 %>
</label>
				<div class="col-md-3">
						<div class="input-group" >
							<span class="input-group-addon"> <i
							class="	glyphicon glyphicon-hand-right"></i>
						</span>

<!-- 							<input type="text" id="bptax" name="bptax" placeholder="Buy Price Incl Tax" class="form-control" readonly="readonly"> -->
							<input type="text" id="dis" name="dis" placeholder="Discount" value="0" class="form-control" >

						</div>
					</div>
					
<%-- <label class="col-md-3 control-label" style="text-align: right" for="dis">
<%
	if (abc.equals("marathi")) {%><%=PropertiesHelper.marathiProperties.getProperty("discount")%><%}%> <%
 	if (abc.equals("english")) {
 %>Discount<%
 	}
 %>
</label>
				<div class="col-md-3">
						<div class="input-group" >
							<span class="input-group-addon"> <i
							class="	glyphicon glyphicon-hand-right"></i>
						</span>

							<input type="text" id="dis" name="dis" placeholder="Discount" value="0" class="form-control" >

						</div>
					</div> --%>
</div>


<div class="row form-group">
<label class="col-md-2 control-label" for="spwithoutgst"> 
<%if (abc.equals("marathi")) {
 %><%=PropertiesHelper.marathiProperties.getProperty("spwithoutgst")%><%}%> <%
 	if (abc.equals("english")) {
 %>S.P(Excl Tax)<%
 	}
 %><sup>*</sup>
</label>
					<div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon"> Rs </span> <input
								id="spwithoutgst" name="spwithoutgst"
								placeholder="Sale Price"
								class="form-control input-md" type="text" onkeyup="salePriceWithTax()">   
								<%-- <!-- onchange="salePriceWithoutTax();salePriceWithTax()" --> --%>
						</div>
					</div>

<label class="col-md-3 control-label" for="salePrice"> <%
 	if (abc.equals("marathi")) {
 %><%=PropertiesHelper.marathiProperties.getProperty("salePrice")%><%}%><%
 	if (abc.equals("english")) {
 %>Sale Price/Unit(Incl Tax)<%
 	}
 %><sup>*</sup>
</label>
					<div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon"> Rs </span> <input id="salePrice" 
								name="salePrice" placeholder="Sale Price per Unit(Incl Tax)"
								class="form-control input-md" type="text"
								onchange="salePriceWithoutTax()" readonly="readonly">
						</div>
					</div>
					
</div>


				<div class="row form-group">
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
								class="form-control input-md" type="text">
						</div>
					</div>
					
					<label class="col-md-3 control-label" style="text-align: right;"
						for="creditSalePrice">
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
					<div class="col-md-3" style="width: 294px;">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="	glyphicon glyphicon-user"></i>
							</span>
						<input type="text" id="fk_shop_id" name="fk_shop_id"  value="<%=shopName1%>" readonly="readonly" list="shopNameList" class="form-control" >
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
					
					
					
					
	<label class="col-md-3 control-label" for="productdescription" style="text-align: right;">
	<%
		if (abc.equals("marathi")) {
	%><%=PropertiesHelper.marathiProperties.getProperty("description")%>
	<%
		}
	%> <%
 if (abc.equals("english")) {
 %>Image<%
 	}
 %>	</label>
					<div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon">
							<i class="	glyphicon glyphicon-list-alt"></i>
							</span>
						
							<input type="file" placeholder="Image" id="imagee" class="form-control">
							
						</div>
					</div> 
					</div>   			
    			
				<div class="form-group row" style="padding-top:2%">
					<div align="center">
					
						<input style="height: 53px; width: 128; font-size: 25" type="button" value="Submit" id="save1"   class="btn btn-large btn-success" name="save1" onclick="productDetails()" /> 
						<input style="height: 53px; width: 128; font-size: 25" type="reset"  value="Cancel" id="save"    class="btn btn-large btn-danger"  name="btn" onclick="reset()" /> 
						<input style="height: 53px; width: 128; font-size: 25" type="button" value=" List"  id="listBtn" class="btn btn-primary" onclick="productlist()" /> 
						<input style="height: 53px; width: 128; font-size: 25" type="button" value="Edit"   id="listBtn" class="btn btn-primary" onclick="editProduct()" />
					</div>
				</div>
            </fieldset>
		</form>
	</div>
	
<!-- ==================================================== CATEGORY DETAILS POP UP ============================================================== -->
						
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
							<input list="cat_drop" id="fk_cat_id1"  class="form-control" placeholder="Category Name" >
			        	<datalist id="cat_drop">
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
		           	
		           	<input style=" width: 128px; height: 53px; font-size: 25" type="button" id="save1" class="btn btn-success" name="btn" onclick="subcat1()" value="Submit">
		            <input style=" width: 128px; height: 53px; font-size: 25" type="reset"  id="save1" class="btn  btn-danger" name="btn" onclick="reset()" value="Cancel" >
		            
		      </div>
         </div>
         </form>
      </div>

<!-- ================================================== END SUB-CATEGORY DETAILS POP UP =========================================================== -->

<!-- ==================================================== UNITS DETAILS POP UP ============================================================== -->

 <div id="measuringunitDiv" class="tab-pane fade in active" style="padding-top:2%; display: none;">  
   <form class="form-horizontal" method="post" action="" name="munits">
    <div class="row">
		<div align="center">
			 <h2 class="form-name style_heading">Measuring Units</h2>
		</div>
    </div>
     	 <div class="row form-group" style="padding-top:4%;">
           		<label class="col-md-2 control-label" for="unitName">SI Unit<sup>*</sup></label>  
           	 		<div class="col-md-3">
            			<div class="input-group">
							<span class="input-group-addon">
								<i class="	glyphicon glyphicon-hand-right"></i>
							</span>
              				
							<%
								MeasuringUnitsDao dao1 = new MeasuringUnitsDao();
           						List taxPerList =dao1.getAllUnits(request);
							
							%>
							<input list="unitName_drop" id="unitName" name="unitName" placeholder="SI Unit" class="form-control" onchange="checkForDuplicateUnitEntry()" >
				            <datalist id="unitName_drop">
							<%
					           for(int i=0;i<taxPerList.size();i++){
					        	   MeasuringUnitsBean bean =(MeasuringUnitsBean)taxPerList.get(i);
							%>
		
							<option data-value="<%=bean.getPkUnitId()%>" value="<%=bean.getUnitName()%>">
							<%
				      			}
				    		%>
			              	
            		     	</datalist>
            			</div>
           		 	</div>
           		 	
           		 	<label class="col-md-3 control-label" for="unitDescription">SI Unit Description<sup>*</sup></label>  
           	 		<div class="col-md-3">
            			<div class="input-group">
							<span class="input-group-addon">
								<i class="	glyphicon glyphicon-hand-right"></i>
							</span>
              				
							<%
							MeasuringUnitsDao dao5 = new MeasuringUnitsDao();
           					List unitList =dao5.getAllUnits(request);
							
							%>
							<input list="unitName_drop1" id="unitDescription" placeholder="SI Unit Description" name="unitDescription" class="form-control">
				<datalist id="unitName_drop1">
							<%
					           for(int i=0;i<unitList.size();i++){
					        	   MeasuringUnitsBean bean1 =(MeasuringUnitsBean)unitList.get(i);
							%>
		
							<option data-value="<%=bean1.getPkUnitId()%>" value="<%=bean1.getUnitDescription()%>">
							<%
				      			}
				    		%>
			              	
            			</datalist>
            			</div>
           		 	</div>
           		 </div>
           		 <div class="form-group row" style="padding-top:2%">
		            <div class="col-md-6 text-center col-md-offset-3">
		           	           		   		 
	           		 <input type="button" id="save" name="btn" style="width: 128px;height: 53px;font-size: 25" class="btn btn-success" onclick="addMeasuringUnit1()" value="Submit">
	           		 <input type="reset"  id="save" name="btn" style="width: 128px;height: 53px;font-size: 25" class="btn btn-danger"  onclick="reset()" value="Cancel">
	           		 	           		 
	           		 </div>
         		</div>
          </form>
         </div>

<!-- ==================================================== END UNITS DETAILS POP UP ============================================================== -->

<!-- ==================================================== TAX DETAILS POP UP ==================================================================== -->

<div id="taxtypeDiv" class="tab-pane fade in active" style="padding-top:2%; display: none;">  
 <form class="form-horizontal" method="post" action="" name="txc">
<div class="row">
	 <div align="center">
		<h2 class="form-name style_heading">Tax Details</h2>
	</div>		 
</div>
          		 <div class="row form-group" style="padding-top:4%;">
           				<label class="col-md-2 control-label" for="taxType">Tax Name<sup>*</sup></label>  
		           	 <div class="col-md-3">
            			<div class="input-group">
							<span class="input-group-addon">
								<i class="	glyphicon glyphicon-list-alt"></i>
							</span>
              				
							<%
							TaxCreationDao tcd1 = new TaxCreationDao();
           						List tcList =tcd1.getAllTax(request);
							
							%>
							<input list="tax_drop" id="taxType1" onkeypress="return disableSpaceKey()" placeholder="Tax Name" onchange="checkForDuplicateTaxTypeEntryforPopUp()" class="form-control">
							<datalist id="tax_drop">
							<%
					           for(int i=0;i<tcList.size();i++){
					        	   TaxCreationBean tax=(TaxCreationBean)tcList.get(i);
							%>
		
							<option data-value="<%=tax.getTxId()%>" value="<%=tax.getTaxType()%>">
							<%
				      			}
				    		%>
			              	
            			</datalist>
            			</div>
            		</div>
            		
            		<label class="col-md-2 control-label" for="sgst">SGST<sup>*</sup></label>  
            		<div class="col-md-3">
            			<div class="input-group">
							<span class="input-group-addon">
								%
							</span>
              											
							<input type="text" id="sgst1" placeholder="SGST" class="form-control" onchange="calculateTax1()">
							
            			</div>
					</div>
			
				<div class="row form-group" style="padding-top:6%;">
           				<label class="col-md-2 control-label" for="cgst">CGST<sup>*</sup></label>  
		           	 <div class="col-md-3" style="padding-left: 24px;">
            			<div class="input-group">
							<span class="input-group-addon">
								%
							</span>
              											
							<input type="text" id="cgst1" placeholder="CGST" class="form-control" onchange="calculateTax1()">
							
            			</div>
            		</div>

            	<label class="col-md-2 control-label" for="taxPercentage">GST %<sup>*</sup></label>  
            		<div class="col-md-3" style="width: 24%;">
            			<div class="input-group">
							<span class="input-group-addon">
								%
							</span>
							<%
							TaxCreationDao dao6 = new TaxCreationDao();
           						List taxPerList1 =dao6.getAllTax(request);
							
							%>
							<input list="tax_per_drop" id="taxPercentage1" placeholder="GST %" class="form-control">
							<datalist id="tax_per_drop">
							<%
					           for(int i=0;i<taxPerList1.size();i++){
					        	   TaxCreationBean bean =(TaxCreationBean)taxPerList1.get(i);
							%>
		
							<option data-value="<%=bean.getTxId()%>" value="<%=bean.getTaxPercentage()%>">
							<%
				      			}
				    		%>
			              	
            			</datalist>
            			</div>
					</div>
				</div>
			</div>
				
			<div class="form-group row" style="padding-top:2%">
				 <div class="col-md-6 text-center col-md-offset-3">
           		          			          		   		 
	           		 <input type="button" id="save12" name="btn12" style="width: 128px;height: 53px;font-size: 25" class="btn btn-success" onclick="addtax1()" value="Submit">
	           		 <input type="reset"  id="save12" name="btn12" style="width: 128px;height: 53px;font-size: 25" class="btn btn-danger"  onclick="reset()" value="Cancel">
	           		 
	           	</div>
          	</div>
			
		</form>
	</div>

<!-- ==================================================== END Tax DETAILS POP UP ================================================================ -->
	
<jsp:include page="commons/footer.jsp"></jsp:include>
</div>
</body>