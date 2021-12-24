<%@page import="com.Fertilizer.hibernate.CategoryDetailsBean"%>
<%@page import="com.Fertilizer.dao.CategoryDetailsDao"%>
<%@page import="com.Fertilizer.hibernate.SubCategoryDetailsBean"%>

<%boolean isHome = false;
%>
<%@include file="commons/header.jsp"%>
 
<head>
<meta charset="utf-8">

          		<script type="text/javascript">
					function back()
					{
						window.location = "categoryDetails.jsp";
					}

          		</script>
          		
<script type="text/javascript" src="/Shop/staticContent/js/bootstrap.js"></script>
<script type="text/javascript" src="/Shop/staticContent/js/bootbox.min.js"></script>
          		
<script type="text/javascript" src="/Shop/staticContent/js/subcategory.js"></script>
<script type="text/javascript" src="/Shop/staticContent/js/productDetail.js"></script>
<link rel="stylesheet" href="/Shop/staticContent/css/shopstyle.css">

</head>
<body>
<div class="container-fluid">
	<div class="row header_margin_top">
		<div align="center">
			<h2 class="form-name style_heading">Edit SubCategory Details</h2>
		</div>
	</div>
    
    <div class="row" align="center">
		<div class="hr-width">
			<hr class="style-one">
		</div>	
    </div>
    
	<div class="container">
        <form class="form-horizontal" method="post" action="" name="subcat">       <!-- Value of 'name' attribute is used in customerDetails.js  -->
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
           		<label class="control-label" for="categoryName">
           		<%if(abc.equals("marathi"))
           		{%><%=PropertiesHelper.marathiProperties.getProperty("catName") %> 
           		<%}%>
           		 <%if(abc.equals("english"))
           			 
           		 {%>Category Name<%}%>
           		 
           		 <sup>*</sup></label>  
           		 </div>
           	 		<div class="col-lg-3 col-md-3 col-sm-8">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-list-alt"></i>
							</span>
							<%
							    CategoryDetailsDao cdd = new CategoryDetailsDao();
           						List cList =cdd.getAllMainCat(request);
							
							%>
							<input list="cat_drop" id="fk_cat_id" name="fk_cat_id"  class="form-control" onchange="getAllSubCat()" placeholder="Category Name" >
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
				<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">
				<label class="control-label" for="categoryName">
				<%if(abc.equals("marathi"))
				{%><%=PropertiesHelper.marathiProperties.getProperty("fk_cat_id") %> 
				<%}%>
				 <%if(abc.equals("english"))
					 
				 {%>Sub Category Name<%}%><sup>*</sup></label>
				 </div>
					<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
						<div class="input-group">
							<span class="input-group-addon">
							 <i class="glyphicon glyphicon-list-alt"></i>
							</span> 
							<input list="subcategory_drop" id="subCat" placeholder="Select Sub-Category" class="form-control input-md" name="subCat">
							<datalist id="subcategory_drop"></datalist>

						</div>
					</div>
					
					
					</div>
           		 </div>
            <div class="row">
           		 <%-- <label class=" col-md-3  control-label" for="categoryName"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("catName") %> <%}%> <%if(abc.equals("english")){%>Sub Category Name<%}%><sup>*</sup></label> --%>  
           	 		
           		 	<!-- <div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="	glyphicon glyphicon-hand-right"></i>
							</span> <input list="subcategory_drop" name="subcat1" class="form-control input-md"
								id='subCat' name="subCat">
							<datalist id="subcategory_drop"></datalist>

						</div>
					</div> -->
           		 	
           		 	<div class="form-group">
           		<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
           		<label class="control-label" for="unitName">New SubCategory Name<sup>*</sup></label>  
           	 		</div>
           	 		<div class="col-lg-3 col-md-3 col-sm-8">
            			<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-list-alt"></i>
							</span>
              			
							<input id="subcatname" name="subcatname" class="form-control" placeholder="Enter New Sub-Category" >
							
            			</div>
           		 	</div>
           		 </div> 
           	 </div>
        
        </div>
          	</fieldset>
          </form>   		 
           		 <div class="row" style="padding-top:2%" align="center">
		            
		            <!--  "customerDetails()" function is implemented in customerDetails.js  -->
	           		   		 
	           		 <input type="button" id="save" name="btn" class="btn btn-success" onclick="subcategoryd()" value="Update">
	           		 <input id="save" name="btn" class="btn btn-danger" type="reset"  onclick="reset()" value="Cancel">
	           		 <input type="button" value="Back" id="listBtn" class="btn btn-primary" onclick="back()" /> 
           		
	           		<!--  <button id="save" name="btn" class="btn btn-large btn-success glyphicon glyphicon-save  button-height-width"  onclick="addUnit()"><h4> Submit</h4></button>
              	          <button class="btn btn-large btn-danger glyphicon glyphicon-remove-circle  button-height-width" type="reset"  onclick="reset()"><h4> Cancel</h4> </button> -->
	           	   
         		</div>
         
         </div>
</div>
</body>
       <%@include file="commons/footer.jsp" %>