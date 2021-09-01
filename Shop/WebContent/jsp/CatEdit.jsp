
<%@page import="com.Fertilizer.hibernate.CategoryDetailsBean"%>
<%@page import="com.Fertilizer.dao.CategoryDetailsDao"%>

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
          		
<script type="text/javascript" src="/Shop/staticContent/js/categoryDetails.js"></script>

<style>
.btn-default,.btn-primary,.btn-success,.btn-info,.btn-warning,.btn-danger
 {
    border-radius:23px;
}


</style>
</head>
<div class="row header_margin_top">
			    <div align="center">
			  		<h2 class="form-name style_heading">Edit Category Details</h2>
			  	</div>
			 
    </div>
     <div class="row">
		     <div class="col-sm-offset-1 col-md-10">
				  		<hr style="border-top-color:#c1b1b1;">
		     </div>	
    </div>
	<div class="container col-sm-offset-1" >
        <form class="form-horizontal" method="post" action="" name="catd"><!-- Value of 'name' attribute is used in customerDetails.js  -->
          <fieldset>
			<div class="row form-group">
           	 		<div class="col-md-6">
              			<%@include file="commons/clock.jsp" %>
           		 	</div>
			</div>
			 <div class="row form-group">
           		<label class="col-md-2  control-label" for="categoryName"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("catName") %> <%}%> <%if(abc.equals("english")){%>Category Name<%}%><sup>*</sup></label>  
           	 		<div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-list-alt"></i>
							</span>
							<%
							   CategoryDetailsDao cdd = new CategoryDetailsDao();
           					   List cList =cdd.getAllMainCat(request);
							
							%>
							<input list="cat_drop" id="fk_cat_id" name="categoryName"  class="form-control" placeholder="Category Name" >
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
 	
           		<label class="col-md-3 control-label" for="unitName">New Category Name<sup>*</sup></label>  
           	 		<div class="col-md-3">
            			<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-list-alt"></i>
							</span>
              									
							<input id="catname" name="catname" placeholder="New Category Name" class="form-control">
												
            			</div>
           		 	</div>
         		 </div>
       
           		 <div class="form-group row" style="padding-top:3%">
		            <div class="col-md-6 text-center col-md-offset-3">
		            <!--  "customerDetails()" function is implemented in customerDetails.js  -->
	           		   		 
	           		 <input type="button" id="save" name="save" style="font-size: 25;height: 53px; width: 128;" class="btn  btn-success " onclick="EditcatDetails()" value="Update">
	           		 <input id="reset" name="reset" style="font-size: 25;height: 53px; width: 128;" class="btn  btn-danger " type="reset"  onclick="reset()" value="Cancel">
	           		 <input style=" font-size: 25;height: 53px; width: 128;" type="button" value="Back" id="listBtn" class="btn btn-primary" onclick="back()" /> 
           		
	           		<!--  <button id="save" name="btn" class="btn btn-large btn-success glyphicon glyphicon-save  button-height-width"  onclick="addUnit()"><h4> Submit</h4></button>
              	<button class="btn btn-large btn-danger glyphicon glyphicon-remove-circle  button-height-width" type="reset"  onclick="reset()"><h4> Cancel</h4> </button> -->
	           		 
	           		 </div>
         		</div>
           	</fieldset>
          </form>
         </div>
       <%@include file="commons/footer.jsp" %>