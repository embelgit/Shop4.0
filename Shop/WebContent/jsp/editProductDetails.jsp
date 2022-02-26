 <%@page import="com.Fertilizer.dao.TaxCreationDao"%>
<%@page import="com.Fertilizer.hibernate.TaxCreationBean"%>
 <%@page import="com.Fertilizer.dao.CategoryDetailsDao"%>
 <%@page import="com.Fertilizer.dao.SupplierDetailsDao"%>
 <%@page import="com.Fertilizer.hibernate.SupplierDetailsBean"%>
 <%@page import="com.Fertilizer.hibernate.CategoryDetailsBean"%>
 <%@page import="com.Fertilizer.dao.MeasuringUnitsDao"%>
 <%@page import="com.Fertilizer.hibernate.MeasuringUnitsBean"%>
<%@page import="java.util.List"%>

 

<%boolean isHome = false;%>
<%@include file="commons/header.jsp"%>
<head>
<script type="text/javascript" src="/Shop/staticContent/js/vatpercentage.js" ></script>
<script type="text/javascript" src="/Shop/staticContent/js/bootstrap.js"></script>
<script type="text/javascript" src="/Shop/staticContent/js/bootbox.min.js"></script>
<script type="text/javascript" src="/Shop/staticContent/js/productDetail.js"></script>
<link rel="stylesheet" href="/Shop/staticContent/css/shopstyle.css">
  <script type="text/javascript">
  			function Back()
  			{
  				window.location = "product_detail.jsp" ;
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
			////sale price  without tax////////////
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

function salePriceWithoutTax11()
{
	var  mrp=document.getElementById("mrp").value;
	var  buyPrice=document.getElementById("buyPrice").value;
	
	if(buyPrice=="")
	{
		return false;
	}
	else{
		
		if(Number(mrp) >= Number(buyPrice))
		{
			//var rate = (salePrice/(1+(taxpercentage/100)));
			document.getElementById("buyPrice").value = buyPrice;
			
		}
		else
		{
			alert("Enter Buy Price less than MRP")
			document.getElementById("buyPrice").value="";
			
		}
		
	}
}
</script>
</head>
<body>
<div class="container-fluid">
<div class="row header_margin_top">
			    <div align="center">
			  		<h2 class="form-name style_heading"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("productDetails") %> <%}%> 
			  		<%if(abc.equals("english")){%>Edit Product Details<%}%></h2>
			  	</div>
			 
    </div>
 
 	<div class="row" align="center">
		<div class="hr-width">
			<hr class="style-one">
		</div>	
    </div>
    
 	<div class="container">
        <form class="form-horizontal" method="post" action="" name="prd1">                             <!-- Value of 'name' attribute is used in  productDetail.js  -->
          <fieldset>
           <div class="shopform-margin">
			 	<div class="row">
			 		<div class="form-group">
						<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
							<label class="control-label" for="fk_product_id">Product Name<sup>*</sup></label>  
           			 	</div>
           			 	<div class="col-lg-3 col-md-3 col-sm-8">
							<div class="input-group">
								<span class="input-group-addon">
									<i class="glyphicon glyphicon-list-alt"></i>
								</span>
              											
							<%
								ProductDetailsDao cdd = new ProductDetailsDao();
           						List cList =cdd.getAllProductForEdit(request);							
							%>
								<input list="pro_drop" id="fk_product_id" class="form-control" placeholder="Select Product Name" onchange="getAllProductDetails()">
								<datalist id="pro_drop">
							<%
					           for(int i=0;i<cList.size();i++){
					        	   ProductDetailsBean cat=(ProductDetailsBean)cList.get(i);
							%>
		
									<option data-value="<%=cat.getProdctId()%>" value="<%=cat.getProductName()%> <%=cat.getWeight()%>">
							<%
				      			}
				    		%>
			              	
            					</datalist>
            				</div>
            			</div>          
			    		<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">	
			    			<label class="control-label" for="productName"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("company") %> <%}%> 
            		<%if(abc.equals("english")){%>New Product Name<%}%><sup>*</sup></label>  
			           	 </div>
			           	 <div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
							<div class="input-group">
								<span class="input-group-addon">
									<i class="	glyphicon glyphicon-list-alt"></i>
								</span>
			              		<!-- <input id="productName" name="productName" placeholder="productName" class="form-control input-md" type="text" > -->
			              		 <input id="productname1" name="productname1" placeholder="Product Name" class="form-control input-md" type="text">
			              	</div>
			            </div>
			     	</div>
				</div> 	
			 	
			<div class="row">
				<div class="form-group"> 						 
					<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
						<label class="control-label" for="manufacturingCompany"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("company") %> <%}%> 
						 <%if(abc.equals("english")){%>Manufacturing company<%}%><sup>*</sup></label>  
			        </div>
			        <div class="col-lg-3 col-md-3 col-sm-8">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="	glyphicon glyphicon-list-alt"></i>
							</span>
			           		<input id="manufacturingCompany" name="manufacturingCompany" placeholder="Manufacturing company" class="form-control input-md" type="text" >
			           	</div>
			        </div>
			        <div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">
			        	<label class="control-label" for="weight"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("weight") %> <%}%>
             				<%if(abc.equals("english")){%>Packing<%}%><sup>*</sup></label>  
            		</div>
            		<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-hand-right"></i>
							</span>
             			 	<input id="weight" name="weight" placeholder="Packing" class="form-control input-md" type="text" readonly="readonly">
            			</div>
					</div>
			    </div>
			 </div>
           
		<%--
		
		<div class="row form-group">
            <label class="col-md-2 control-label" for="weight"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("weight") %> <%}%> <%if(abc.equals("english")){%>Weight<%}%><sup>*</sup></label>  
            	<div class="col-md-3">
					<div class="input-group">
						<span class="input-group-addon">
							No
						</span>
             			 <input id="weight" name="weight" placeholder="Weight" class="form-control input-md" type="text" >
            		</div>
				</div>
				
				<label class="col-md-2 control-label" for="Unit"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("unit") %> <%}%> <%if(abc.equals("english")){%>Unit<%}%><sup>*</sup></label>  
            				<div class="col-md-3">
								<div class="input-group">
									<span class="input-group-addon">
										<i class="	glyphicon glyphicon-hand-right"></i>
									</span>
									
							
										
							<!-- Following code is to get all measuring units from "sold_units" table of "fertilizer" DB -->
							<!-- getAllUnits() is implemented in  MeasuringUnitsDao with return type List-->
						
							<%
							MeasuringUnitsDao dao = new MeasuringUnitsDao();
           						List uList = dao.getAllUnits();
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
					</div>
           		</div>
			</div>
			
			--%>
			
		<div class="row">
        	<div class="form-group">    
				<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
					<label class="control-label" for="Unit"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("unit") %> <%}%> 
						<%if(abc.equals("english")){%>Unit<%}%><sup>*</sup></label>  
            	</div>	
            	<div class="col-lg-3 col-md-3 col-sm-8">
					<div class="input-group">
						<span class="input-group-addon">
							<i class="	glyphicon glyphicon-hand-right"></i>
						</span>
									
							
										
							<!-- Following code is to get all measuring units from "sold_units" table of "fertilizer" DB -->
							<!-- getAllUnits() is implemented in  MeasuringUnitsDao with return type List-->
						
							<%
								MeasuringUnitsDao dao = new MeasuringUnitsDao();
	           					List uList = dao.getAllUnits(request);
								
						           for(int i=0;i<uList.size();i++){
						        	   MeasuringUnitsBean bean =(MeasuringUnitsBean)uList.get(i);
						        	   
						        	   if(bean.getUnitName().equalsIgnoreCase("pcs"))
										{
											bean.setUnitName("Box/pcs");
										}
							%>
							
							<input list="unit_drop" id="fk_unit_id"  placeholder="Unit"  class="form-control">
				        	<datalist id="unit_drop">
						
								<option data-value="<%=bean.getPkUnitId()%>" 
							        value="<%=bean.getUnitName() %>">
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
				 		<label class="control-label" for="existedTax">Existing Tax Name <sup>*</sup></label>  
	            	</div>
	            	<div class="col-lg-3 col-md-3 col-sm-8">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="	glyphicon glyphicon-list-alt"></i>
							</span>
	             			<input readonly="readonly" id="existedTax" name="existedTax"  placeholder="Existed Tax"  class="form-control input-md" type="text" >
	            		</div>
					</div>					
					<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">
						<label class="control-label" for="existedTaxPercentage">Existing GST</label>
					</div>	
					<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
						<div class="input-group">
							<span class="input-group-addon">
								<span class="glyphicon percentage">%</span>
							</span>
	             		 	<input readonly="readonly" id="existedTaxPercentage"   placeholder="Existed GST %" name="existedTaxPercentage"  class="form-control input-md" type="text" >
	            		</div>
	            	</div>
				</div>
			</div>
			<%-- <div>
			
			<label class="col-md-2 control-label" for="productName"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("company") %> <%}%> <%if(abc.equals("english")){%>New Product Name<%}%><sup>*</sup></label>  
			           	 <div class="col-md-3">
							<div class="input-group">
								<span class="input-group-addon">
									<i class="	glyphicon glyphicon-font"></i>
								</span>
			              		<input id="productName" name="productName" placeholder="productName" class="form-control input-md" type="text" >
			            	</div>
			            </div>
			
			</div>
		 --%>
			
			<!-- Following code is used to show tax percentage in % field with the help of  "myid" and "taxPercentage"-->
			<script type="text/javascript">
				function ChooseContact(data)
					{
						document.getElementById("taxPercentage").value=(data.options[data.selectedIndex].getAttribute("myid"));
					}
			</script> 
			
		
			
		<div class="row">
         	<div class="form-group">	
         		<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">	
         			<label class="control-label" for="fk_tax_id">New Tax Name<sup>*</sup></label>
         		</div>
         		<div class="col-lg-3 col-md-3 col-sm-8">
					<div class="input-group">
						<span class="input-group-addon">
							<i class="	glyphicon glyphicon-list-alt"></i>
						</span>
						
						<!-- Following code is to get Supplier from "supplier_details" table of "fertilizer" DB -->
							<!-- getAllMainTax() is implemented in  TaxCreationDao with return type List-->
					
					
						<%
							TaxCreationDao tcd = new TaxCreationDao();
							List tList = tcd.getAllMainTax(request);
		            	%>
              			<select class="form-control input-md" autofocus name="fk_tax_id" id="fk_tax_id" onChange="ChooseContact(this);salePriceWithoutTax();getcsgst()" >
			              	<option value="selected">--Select Tax--</option>
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
         		<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">	
         			<label class="control-label" for="existedTaxPercentage">New GST</label>
         	 	</div>
         	 	<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
					<div class="input-group">
						<span class="input-group-addon">
							<span class="glyphicon percentage">%</span>
						</span>
           		 		<input id="taxPercentage" name="taxPercentage" placeholder="GST %" readonly="readonly" class="form-control input-md" type="text" >
           			</div>
				</div>
			</div>
		</div> 
		
		
		<div class="row">
			<div class="form-group">
				<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
  					<label class="control-label" for="sgst"> 
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
 %><sup>*</sup>
</label>
				</div>
				<div class="col-lg-3 col-md-3 col-sm-8">
					<div class="input-group">
						<span class="input-group-addon">
							 <span class="glyphicon percentage">%</span>
						</span>
						<input id="sgst" name="sgst" placeholder="SGST %" class="form-control input-md" type="text" onchange="calculateTax()">
					</div>
				</div>
				
				<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">
	<label class="control-label" for="cgst"> <%
 	if (abc.equals("marathi")) {
 %><%=PropertiesHelper.marathiProperties.getProperty("cgst")%>
						<%
							}
						%> <%
 	if (abc.equals("english")) {
 %>CGST<%
 	}
 %><sup>*</sup>
					</label>
				</div>
				<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
					<div class="input-group">
						<span class="input-group-addon">
							<span class="glyphicon percentage">%</span>
						</span>
						<input id="cgst" name="cgst" placeholder="CGST %" class="form-control input-md" type="text" onchange="calculateTax()">
					</div>
				</div>
			</div>
		</div>
		
		
		<div class="row">
			<div class="form-group">
				<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
					<label class="control-label" for="mrp">
						<%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("") %>
						<%}%> <%if(abc.equals("english")){%>M.R.P <sub>*</sub><%}%>
					</label>
				</div>				
				<div class="col-lg-3 col-md-3 col-sm-8">
					<div class="input-group">
						<span class="input-group-addon">
							 <span class="glyphicon nogyphicon">Rs</span>
						</span>
						<input id="mrp" name="mrp" placeholder="MRP" class="form-control input-md" type="text" onblur="salePriceWithoutTax()" readonly="readonly">
					</div>
				</div>
				<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">	
					<label class="control-label" for="buyPrice">
						<%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("buyPrice") %>
						<%}%> <%if(abc.equals("english")){%>Buy Price(Incl Tax)<sup>*</sup><%}%>
					</label>
				</div>				
				<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
					<div class="input-group">
						<span class="input-group-addon">
							 <span class="glyphicon nogyphicon">Rs</span>
						</span>
						<input id="buyPrice" name="buyPrice" placeholder="Buy Price(Incl Tax)" class="form-control input-md" type="text" > <!-- onchange="salePriceWithoutTax11()" -->
					</div>
				</div>
			</div>
		</div>
		
		<div class="row">
			<div class="form-group"> 
		        <div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
		        	<label class="control-label" for="spwithoutgst">
					<%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("spwithoutgst") %>
					<%}%> <%if(abc.equals("english")){%>S.P(Excl Tax)<sub>*</sub><%}%>
					</label>
				</div>
				<div class="col-lg-3 col-md-3 col-sm-8">
					<div class="input-group">
						<span class="input-group-addon">
							 <span class="glyphicon nogyphicon">Rs</span>
						</span>
						<input id="spwithoutgst" name="spwithoutgst" placeholder="Sale Price(Excl Tax)" class="form-control input-md"
							type="text" onchange="salePriceWithTax()">
							<!-- onchange="salePriceWithoutTax();salePriceWithTax()" -->
					</div>
				</div>
				<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">
					<label class="control-label" for="salePrice">
					<%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("salePrice") %>
					<%}%> <%if(abc.equals("english")){%>Sale Price/Unit(Incl Tax)<sub>*</sub><%}%>
					</label>
				</div>
				<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
					<div class="input-group">
						<span class="input-group-addon">
							 <span class="glyphicon nogyphicon">Rs</span>
						</span>
						<input id="salePrice" name="salePrice" placeholder="Sale Price per Unit(Incl Tax)" class="form-control input-md" type="text"
							onchange="salePriceWithoutTax()" readonly="readonly">
					</div>
				</div> 
			</div>	
		</div>
			
		<div class="row">
			<div class="form-group">
				<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
					<label class="control-label" for="existedTax">Existed HSN</label>  
	            </div>	
	            <div class="col-lg-3 col-md-3 col-sm-8">
					<div class="input-group">
						<span class="input-group-addon">
							<span class="glyphicon nogyphicon">No</span>
						</span>
	            		<input readonly="readonly" id="existedHsn" name="existedHsn" placeholder="Existed HSN No" class="form-control input-md" type="text" >
	            	</div>
				</div>
				<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">	
					<label class="control-label" for="existedTaxPercentage">New HSN<sup>*</sup></label>
				</div>
				<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
					<div class="input-group">
						<span class="input-group-addon">
							<span class="glyphicon nogyphicon">No</span>
						</span>
	            	 	<input id="newHsn" name="newHsn" placeholder="New HSN No" class="form-control input-md" type="text" >
	            	</div>
	            </div>
			</div>
		</div>
	
	<div class="row">
		<div class="form-group">	
			<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
				<label class="control-label" for="productdescription">
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
 			</div>
			<div class="col-lg-3 col-md-3 col-sm-8">
				<div class="input-group">
					<span class="input-group-addon">
						<i class="glyphicon glyphicon-list-alt"></i>
					</span>				
					<input type="text" placeholder="Description" id="description" class="form-control">
				</div>
			</div> 
		</div>
	</div>   	

</div>
</fieldset>
       </form>	
	</div>
		
		<div class="row buttons-margin" align="center">            
           		<input type="button" value="Update" id="save" name="btn" class="btn btn-success"onclick="updateProductDetails()" /> 
             	<input type="reset" value="Cancel" id="save" name="btn" class="btn btn-danger" onclick="reset()" /> 
           		<input type="button" value="Back" id="listBtn" name="btn" class="btn btn-primary" onclick="Back()" />            
          </div>
		
     
 
 </div>
 </body>
<jsp:include page="commons/footer.jsp"></jsp:include>