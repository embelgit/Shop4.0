<%@page import="com.Fertilizer.hibernate.shopDetailsBean"%>
<%@page import="com.Fertilizer.dao.shopDetailsDao"%>
<%@page import="com.Fertilizer.utility.PropertiesHelper"%>
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
 <%@page import="com.Fertilizer.hibernate.ProductDetailsBean"%>
<%@page import="java.util.List"%>

 

<%boolean isHome = false;%>
<head>

<script type="text/javascript" src="/Shop/staticContent/js/jquery-1.12.3.min.js"></script>
<script type="text/javascript"  src="/Shop/staticContent/js/bootstrap.min.js"></script>
<link rel="stylesheet" href="/Shop/staticContent/css/bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="/Shop/staticContent/y_css/style.css" />
<script src="/Shop/staticContent/js/vatpercentage.js" type="text/javascript"></script>
<script type="text/javascript" src="/Shop/staticContent/js/bootstrap.js"></script>
<script type="text/javascript" src="/Shop/staticContent/js/bootbox.min.js"></script>
<script type="text/javascript" src="/Shop/staticContent/js/productDetail.js"></script>

<% 
   String abc = "english";
   if (session != null) {
   
   if (session.getAttribute("lan") != null) {
	   abc = (String) session.getAttribute("lan");
   }}
   else{
	   abc="english";
   }
 %>

            <%
	  		HttpSession session1 = request.getSession();
		  	String shop1234 = (String) session1.getAttribute("shopName");
		  	
		  	String shopN = shop1234.substring(4);
		  	String shopId = String.valueOf(shop1234.charAt(0));
		  	System.out.println("This is sjop id === "+shopId);
		  	String shopName1 = shopN.trim();
	  		HttpSession session2 = request.getSession();
		  	session2.setAttribute("shopId", shopId);
		  	%>

<script type="text/javascript">
          		function checkForDuplicateProductEntry(){
          			<%
          			ProductDetailsDao dao = new ProductDetailsDao();
          			List list = dao.getProductDetails();
          			%>
          			
          			<%
          			int z = 0;
          			for(z=0;z<list.size();z++){
          			GetProductDetails bean = (GetProductDetails)list.get(z);
          			%>
          			var pro = "<%=bean.getProduct()%>";
          			var company = "<%=bean.getManufacturer()%>";
          			var weight = "<%=bean.getWeight()%>";
          			if(document.getElementById("productName").value ==pro && document.getElementById("manufacturingCompany").value ==company && document.getElementById("weight").value ==weight ){
          				alert("product already exist...Duplicate Not allowed");
          				location.reload();
          				return false;
          			}
          			<%
          			}
          			%>
          			
          			}
          		function back(){
          			
          			window.close();
          		}
          		</script>

			<script type="text/javascript">
		///sale price  without tax////////////
		function salePriceWithoutTax()
		{
			var  taxpercentage=document.getElementById("taxPercentage").value;
			var  salePrice=document.getElementById("salePrice").value;
			var  mrp=document.getElementById("mrp").value;
			//var  buyPrice=document.getElementById("buyPrice").value;
			
			if(taxpercentage=="")
			{
				//alert("select Tax percentage");
				return false;
			}
			else if(mrp=="")
			{
				///alert("Enter MRP");
				return false;
			}
			else if(salePrice=="")
			{
				alert("Enter MRP");
				return false;
			}
			else
			{
				if(Number(mrp)>=Number(salePrice))
				{
					var rate=(salePrice/(1+(taxpercentage/100)));
					document.getElementById("spwithoutgst").value=Math.round(rate * 100) / 100;
					
				}
				else
				{
					alert("Enter Sale Price less than MRP")
					document.getElementById("salePrice").value="";
					
				}
				
			}			
		}
		
</script>
		
		<style>
.btn-default,.btn-primary,.btn-success,.btn-info,.btn-warning,.btn-danger
 {
    border-radius:23px;
}


</style>	
</head>
 <div class="row">
			    <div align="center">
			  		<h2 class="form-name style_heading"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("productDetails") %> <%}%> <%if(abc.equals("english")){%>Product Details<%}%></h2>
			  	</div>
			 
    </div>
 
 	 <div class="row">
		     <div class="col-sm-offset-1 col-md-10">
				  		<hr style="border-top-color:#c1b1b1;">
		     </div>	
    </div>
 	<div class="container col-sm-offset-">
        <form class="form-horizontal" method="post" action="" name="prd" id="prd" ><!-- Value of 'name' attribute is used in  productDetail.js  -->
          <fieldset>
			 	<div class="row form-group">
           	 		<div class="col-md-6">
              			<%@include file="commons/clock.jsp" %>
           		 	</div>
				</div>
			 <div class="row form-group">
           		<label class="col-md-3 control-label" for="fk_cat_id"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("productCat") %> <%}%> <%if(abc.equals("english")){%>Product Category<%}%><sup>*</sup></label>  
           			 <div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="	glyphicon glyphicon-list-alt"></i>
							</span>
              				
							<!-- Following code is to get categories from "categories" table of "fertilizer" DB -->
							<!-- getAllMainCat() is implemented in  CategoryDetailsDao with return type List-->
							<%
							   CategoryDetailsDao cdd = new CategoryDetailsDao();
           						List cList =cdd.getAllMainCat(request);
							
							%>
							<input list="cat_drop" id="fk_cat_id" placeholder="Product Category" class="form-control" onchange="getAllSubCat()">
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
            			</div>
           </div>
            		<label class="col-md-3 control-label" for="subCat"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("productCat") %> <%}%> 
            		<%if(abc.equals("english")){%>Product Subcategory<%}%><sup>*</sup></label>  
           			 <div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="	glyphicon glyphicon-list-alt"></i>
							</span>
							
							<input list="subcategory_drop" class="form-control input-md" placeholder="Product Sub-Category"
								id='subCat' name="subCat" onchange="getAllShopName()">
							<datalist id="subcategory_drop"></datalist>
							
					<!-- <select class="form-control input-md" id='subCat'  name="subCat" onchange="getAllShopName()">
					</select> -->
               		</div>
              	</div>
              	</div>
          <div class="row form-group">
            <label class="col-md-3 control-label" for="productName"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("productName") %> <%}%>
             <%if(abc.equals("english")){%>Product Name<%}%> <sup>*</sup></label>  
            	<div class="col-md-3">
            		<div class="input-group">
							<span class="input-group-addon">
								<i class="	glyphicon glyphicon-list-alt"></i>
							</span>
              				
							<%-- <%
							ProductDetailsDao productdao = new ProductDetailsDao();
           						List productList =productdao.getAllProductDetails();
							
							%> --%>
							<input list="productName_drop" id="productName" placeholder="Product Name"  class="form-control" onblur="checkForDuplicateProductEntry()">
				            <%-- <datalist id="productName_drop">
							<%
					           for(int i=0;i<productList.size();i++){
					        	   ProductDetailsBean productbean =(ProductDetailsBean)productList.get(i);
							%>
		
							<option data-value="<%=productbean.getProdctId()%>" value="<%=productbean.getProductName()%>">
							<%
				      			}
				    		%>
			              	
            			</datalist> --%>
            			</div>
				</div>
			 
           	<label class="col-md-3 control-label" for="manufacturingCompany"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("company") %> 
           	<%}%> <%if(abc.equals("english")){%>Manufacturing Company<%}%><sup>*</sup></label>  
           	 <div class="col-md-3">
            	<div class="input-group">
							<span class="input-group-addon">
								<i class="	glyphicon glyphicon-list-alt"></i>
							</span>
              				
							<%-- <%
								ProductDetailsDao productdao1 = new ProductDetailsDao();
           						List productList1 =productdao1.getAllProductDetails();
							
							%> --%>
							<input list="manufacturingCompany_drop" id="manufacturingCompany" placeholder="Manufacturing Company" class="form-control" onblur="checkForDuplicateProductEntry()">
							<%-- <datalist id="manufacturingCompany_drop">
							<%
					           for(int i=0;i<productList1.size();i++){
					        	   ProductDetailsBean productbean1 =(ProductDetailsBean)productList1.get(i);
							%>
		
							<option data-value="<%=productbean1.getProdctId()%>" value="<%=productbean1.getManufacturingCompany()%>">
							<%
				      			}
				    		%>
			              	
            			</datalist> --%>
            			</div>
            </div>
		</div>
		
		<label class="col-md-3 control-label" for="Unit"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("unit") %> <%}%>
		 <%if(abc.equals("english")){%>Unit<%}%><sup>*</sup></label>  
            <div class="col-md-3">
				<div class="input-group" style="margin-left: -7px;">
					<span class="input-group-addon">
						<i class="	glyphicon glyphicon-list-alt"></i>
					</span>
						<!-- Following code is to get all measuring units from "sold_units" table of "fertilizer" DB -->
						<!-- getAllUnits() is implemented in  MeasuringUnitsDao with return type List-->
					
						<%
							MeasuringUnitsDao mdao = new MeasuringUnitsDao();
          					List uList = mdao.getAllUnits(request);
						%>
						
						<!-- <input list="unit_drop" id="fk_unit_id" onchange="findselected()"   class="form-control">
			<datalist id="unit_drop" > -->
			
			<input list="unit_drop" id="fk_unit_id" style="width: 100%;" class="form-control" placeholder="Unit">
			<datalist id="unit_drop" >
						
						<%
				           for(int i=0;i<uList.size();i++){
				        	   MeasuringUnitsBean bean =(MeasuringUnitsBean)uList.get(i);
						%>
	
						<option data-value="<%=bean.getPkUnitId()%>" value="<%=bean.getUnitName() %>">
						<%
			      			}
			    		%>
					</datalist>           	
				</div>
				</div>
				
		<!-- <script type="text/javascript">
			function findselected()
			{
			    var unit = document.getElementById('fk_unit_id');
			    var weight = document.getElementById('weight');
			    if(unit.value == "kg" || unit.value == "ltr")
			    	{
			    		weight.disabled = false;
			    	}
			    	else
			    	{
			    		weight.value = 0;
			    		weight.disabled = true;
			    	}
			}

</script> -->
				
				
				
	           	
		<div class="row form-group">
            <label class="col-md-3 control-label" for="weight"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("weight") %> <%}%> 
            <%if(abc.equals("english")){%>Packing<%}%><sup>*</sup></label>  
            	<div class="col-md-3">
            		<div class="input-group">
							<span class="input-group-addon">
								No
							</span>
              				
							<%-- <%
								ProductDetailsDao productdao2 = new ProductDetailsDao();
           						List productList2 =productdao2.getAllProductDetails();
							
							%> --%>
							<input list="weight_drop" id="weight"  class="form-control" placeholder="Packing" onblur="checkForDuplicateProductEntry()">
				            <%-- <datalist id="weight_drop">
							<%
					           for(int i=0;i<productList2.size();i++){
					        	   ProductDetailsBean productbean2 =(ProductDetailsBean)productList2.get(i);
							%>
		
							<option data-value="<%=productbean2.getProdctId()%>" value="<%=productbean2.getWeight()%>">
							<%
				      			}
				    		%>
			              </datalist> --%>
            			</div>
				</div>
				

				<%-- <label class="col-md-2 control-label" for="Unit"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("unit") %> <%}%> <%if(abc.equals("english")){%>Unit<%}%><sup>*</sup></label>  
            				<div class="col-md-3">
								<div class="input-group">
									<span class="input-group-addon">
										<i class="	glyphicon glyphicon-hand-right"></i>
									</span>
									
							
										
							<!-- Following code is to get all measuring units from "sold_units" table of "fertilizer" DB -->
							<!-- getAllUnits() is implemented in  MeasuringUnitsDao with return type List-->
						
							<%
							MeasuringUnitsDao mdao = new MeasuringUnitsDao();
           						List uList = mdao.getAllUnits();
							%>
							
							<input list="unit_drop" id="fk_unit_id"  class="form-control">
				<datalist id="unit_drop">
							
							<%
					           for(int i=0;i<uList.size();i++){
					        	   MeasuringUnitsBean bean =(MeasuringUnitsBean)uList.get(i);
							%>
		
							<option data-value="<%=bean.getPkUnitId()%>" value="<%=bean.getUnitName() %>">
							<%
				      			}
				    		%>
						</datalist>           	
					</div> --%>
           		</div>
           		
		<div class="row form-group">
         	<label class="col-md-3 control-label" style="text-align:right" for="fk_tax_id">Tax Type<sup>*</sup></label>
         		<div class="col-md-3">
					<div class="input-group" style="width: 100%">
						<span class="input-group-addon">
							<i class="	glyphicon glyphicon-list-alt"></i>
						</span>
						
						<!-- Following code is to get Supplier from "supplier_details" table of "fertilizer" DB -->
							<!-- getAllMainTax() is implemented in  TaxCreationDao with return type List-->
					
					
						<%
							TaxCreationDao tcd = new TaxCreationDao();
							List tList = tcd.getAllMainTax(request);
		            	%>
              			<select class="form-control input-md" autofocus name="fk_tax_id" id="fk_tax_id" placeholder="Select Gst" onChange="ChooseContact(this)" >
			              	<!-- <option value="selected">--Select Tax--</option> -->
			              	<option value="1">--Select Tax--</option>
							<%
					           for(int i=0;i<tList.size();i++){
					        	   TaxCreationBean tax=(TaxCreationBean)tList.get(i);
							%>
		
						<option value="<%=tax.getTxId()%>" myid="<%=tax.getTaxPercentage()%>"><%=tax.getTaxType() %> </option>
							<%
				      			}
				    		%>
			              	
            			</select> 
            		</div>
            	</div>   
            	<label class="col-md-3 control-label" for="weight"> <sup></sup></label>
         		
         	 <div class="col-md-3">
				<div class="input-group">
						<span class="input-group-addon">
							%
						</span>
           		 	<input id="taxPercentage" name="taxPercentage" placeholder="Tax Percentage" class="form-control input-md" type="text" >
           		</div>
			</div>
		</div> 
	
	
	<div class="row form-group">

				<label class="col-md-3 control-label" for="mrp">
					<%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("") %>
					<%}%> <%if(abc.equals("english")){%>M.R.P<%}%>
				</label>
				
				<div class="col-md-3">
					<div class="input-group">
						<span class="input-group-addon"> Rs </span> <input id="mrp"
							name="mrp" placeholder="MRP" class="form-control input-md"
							type="text" onblur="salePriceWithoutTax()">
					</div>
				</div>
	
	
	<label class="col-md-3 control-label" for="buyPrice">
					<%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("buyPrice") %>
					<%}%> <%if(abc.equals("english")){%>Buy Price<%}%>
				</label>
				
				<div class="col-md-3">
					<div class="input-group">
						<span class="input-group-addon"> Rs </span> <input id="buyPrice"
							name="buyPrice" placeholder="Buy Price"
							class="form-control input-md" type="text">
					</div>
				</div>
				</div>
	
	 <div class="row form-group">
				<label class="col-md-3 control-label" for="salePrice">
					<%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("salePrice") %>
					<%}%> <%if(abc.equals("english")){%>Sale Price<%}%>
				</label>
				
				<div class="col-md-3">
					<div class="input-group">
						<span class="input-group-addon"> Rs </span> <input id="salePrice"
							name="salePrice" placeholder="Sale Price"
							class="form-control input-md" type="text"
							onchange="salePriceWithoutTax()">
					</div>
				</div> 
				
				<label class="col-md-3 control-label" for="spwithoutgst">
					<%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("spwithoutgst") %>
					<%}%> <%if(abc.equals("english")){%>S.P Ex Tax<%}%>
				</label>
				<div class="col-md-3">
					<div class="input-group">
						<span class="input-group-addon"> Rs </span> <input
							id="spwithoutgst" name="spwithoutgst"
							placeholder="Sale price without GST" class="form-control input-md"
							type="text" onchange="salePriceWithoutTax()" readonly="readonly">
					</div>
				</div>
			</div>
	
		<%-- <div class="row form-group">
			<label class="col-md-2 control-label" for="buyPrice"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("buyPrice") %> <%}%> <%if(abc.equals("english")){%>Buy Price<%}%><sup>*</sup></label>  
           		<div class="col-md-3">
					<div class="input-group">
						<span class="input-group-addon">
						Rs
						</span>
              			<input id="buyPrice" name="buyPrice" placeholder="Buy Price" class="form-control input-md" type="text" >
            		</div>
				</div>
            	
            	<label class="col-md-2 control-label" for="mrp"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("") %> <%}%> <%if(abc.equals("english")){%>M.R.P<%}%><sup>*</sup></label>  
           		<div class="col-md-3">
					<div class="input-group">
						<span class="input-group-addon">
						Rs
						</span>
              			<input id="mrp" name="mrp" placeholder="MRP" class="form-control input-md" type="text" >
            		</div>
				</div>
            	
		</div> --%>
		<div class="row form-group">
		<label class="col-md-3 control-label"  style="text-align:right;" for="hsn"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("salePrice") %> <%}%> <%if(abc.equals("english")){%>HSN code<%}%></label>  
           		<div class="col-md-3">
					<div class="input-group">
						<span class="input-group-addon">
						No
						</span>
              			<input id="hsn" name="hsn" placeholder="HSN Number" class="form-control input-md" type="text">
            		</div>
				</div>
		<%-- <label class="col-md-2 control-label" for="salePrice"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("salePrice") %> <%}%> <%if(abc.equals("english")){%>Sale Price<%}%><sup>*</sup></label>  
           		<div class="col-md-3">
					<div class="input-group">
						<span class="input-group-addon">
						Rs
						</span>
              			<input id="salePrice" name="salePrice" placeholder="Sale Price" class="form-control input-md" type="text" onkeyup="salePriceCompaireWithMRP()">
            		</div>
				</div> --%>
			<label class="col-md-3 control-label"  style="text-align: right;" for="creditSalePrice"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("shopName") %> <%}%> <%if(abc.equals("english")){%>Shop Name<%}%><sup>*</sup></label>  
           		<!-- <div class="col-md-3">
					<div class="input-group">
						<span class="input-group-addon">
						<i class="	glyphicon glyphicon-hand-right"></i>
						</span>
              			<select class="form-control input-md" id='shopName'  name="shopName">
					</select>
            		</div>
				</div> -->
				<div class="col-md-3 ">
					<div class="input-group">
						<span class="input-group-addon">
						<i class="	glyphicon glyphicon-user"></i>
						</span>
									
					     	<%-- <%
							shopDetailsDao sd = new shopDetailsDao();
							List tList22 =sd.getAllShop();
							%> --%>
							<input type="text" id="fk_shop_id" name="fk_shop_id"  value="<%=shopName1%>" readonly="readonly" list="shopNameList" class="form-control">
							<%-- <input list="shopNameList" id="fk_shop_id" class="form-control">
							<datalist id="shopNameList">
								<%
									for (int i = 0; i < tList22.size(); i++) {
										shopDetailsBean sup = (shopDetailsBean) tList22.get(i);
								%>

								<option data-value="<%=sup.getShopId()%> " value="<%=sup.getShopName()%>">

									<%
										}
									%>
								
							</datalist> --%>
						
						
						
						
						<%-- <%
						shopDetailsDao sd = new shopDetailsDao();
						List tList =sd.getAllShop();
						
						 %>
						  --%>
              		<!-- 	<select class="form-control input-md" id='shopName' name="shopName" id="fk_shop_id" onchange="getShopName()">//////
					</select> -->
					<%-- <%
					           for(int i=0;i<tList.size();i++){
					        	   TaxCreationBean tax=(TaxCreationBean)tList.get(i);
							%>
		
						<option value="<%=tax.getTxId()%>" myid="<%=tax.getTaxPercentage()%>"><%=tax.getTaxType() %> </option>
							<%
				      			}
				    		%>
					 --%>
					
					
					<!-- <span class="input-group-addon">
									<button type="button" onclick="mypopup('popUpShopDetails.jsp')">
										 <span class="glyphicon glyphicon-plus"  style="color: #0078ae;"></span>
									</button>
									</span> -->
            		</div>
            		</div>
			</div>
		<!-- <div class="row form-group">
		
		</div> -->
		
		<div class="form-group row" style="padding-top:2%">
            <div align="center">
             	<input style=" height: 53px; width: 128px; font-size: 25" type="button" id="save1" name="save1" value="Submit" class="btn  btn-success " onclick="productDetails()"/> 
             	<input style=" height: 53px; width: 128px; font-size: 25" class="btn  btn-danger " type="reset" id="save" name="btn" value="Cancel" onclick="back()" /> 
            </div>
          </div>
          </fieldset>
          </form> 		
 </div>
				
		
			
			<!-- Following code is used to show tax percentage in % field with the help of  "myid" and "taxPercentage"-->
			<script type="text/javascript">
				function ChooseContact(data)
					{
						
						document.getElementById("taxPercentage").value=(data.options[data.selectedIndex].getAttribute("myid"));
					}
			</script> 
			
		
			
		</fieldset>
       </form>
     </div>
 
<jsp:include page="commons/footer.jsp"></jsp:include>