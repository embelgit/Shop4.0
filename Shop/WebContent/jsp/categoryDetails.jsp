<%@page import="com.Fertilizer.hibernate.SubCategoryDetailsBean"%>
<%@page import="com.Fertilizer.hibernate.CategoryDetailsBean"%>
<%@page import="com.Fertilizer.dao.CategoryDetailsDao"%>
<%boolean isHome = false;
%>
<%@include file="commons/header.jsp"%>
 
<head>
<!-- <link rel="stylesheet" href="/Fertilizer/staticContent/css/bootstrap.min.css"> -->
<meta charset="utf-8">
<script type="text/javascript" src="/Shop/staticContent/js/bootstrap.js"></script>
<script type="text/javascript" src="/Shop/staticContent/js/bootbox.min.js"></script>
<script type="text/javascript" src="/Shop/staticContent/js/categoryDetails.js"></script>
<script>
function catlist()
{
	 window.location = "catlist.jsp";
}

function editcat()
{
	 window.location = "CatEdit.jsp";
}

function editSubcat()
{
	 window.location = "EditSubcat.jsp";
}


</script>

<script type="text/javascript">
function checkForDuplicateCategoryEntry(){
          			<%
          			CategoryDetailsDao dao = new CategoryDetailsDao();
          			List list = dao.getAllMainCat(request);
          			%>
          			
          			<%
          			int z = 0;
          			for(z=0;z<list.size();z++){
          				CategoryDetailsBean bean = (CategoryDetailsBean)list.get(z);
          			%>
          			var pro = "<%=bean.getCategoryName()%>";
          			var proName=document.getElementById("categoryName").value;
          			
          			if(proName.toLowerCase() == pro){
          				alert("category already exist...Duplicate Not allowed");
          				location.reload();
          				return false;
          			}
          			<%
          			}
          			%>
          			
          			}
</script>
<style>
.btn-default,.btn-primary,.btn-success,.btn-info,.btn-warning,.btn-danger
 {
    border-radius:23px;
}



</style>
<script type="text/javascript">	
 
function checkForDuplicateSubCategoryEntry(){
		<%
		CategoryDetailsDao dao2 = new CategoryDetailsDao();
		List list1 = dao2.getSubCategoryName(request);
		%>
		
		<%
		int x = 0;
		for(x=0;x<list1.size();x++){
			SubCategoryDetailsBean bean = (SubCategoryDetailsBean)list1.get(x);
		%>
		var subCat = "<%=bean.getSubcategoryName()%>";
		var cat = "<%=bean.getCategoryName()%>";
		var subcatName=document.getElementById("subcategoryName").value;
		var catName=document.getElementById("fk_cat_id").value;

		if(subcatName.toLowerCase()== subCat && cat == catName){
			alert("subcategory already exist...Duplicate Not allowed");
			location.reload();
			return false;
		}
		<%
		}
		%>
		
		}
</script>

</head>
		 	<div class="row header_margin_top">
			    <div align="center">
			  		<h2 class="form-name style_heading"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("categoryDetails") %> <%}%> <%if(abc.equals("english")){%>Category Details<%}%> </h2>
			  	</div>
           </div>
        
     <div class="row">
		     <div class="col-sm-offset-1 col-md-10">
				  		<hr style="border-top-color:#c1b1b1;">
		     </div>	
    </div>
    
	<div class="container col-sm-offset-1">
	
	<!-- <------------------------------------- Category and Sub-Category Button ------------------------------------------->
	
	    <div class="row">
	        <div class="col-md-4 col-md-offset-">
                  <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 " >
					<ul class="nav nav-tabs ">
						<li class="active" style="padding-left:4%"><a data-toggle="tab" href="#Category1" style="border-radius:23px;">
								<h4>Category</h4></a></li>
						<li><a data-toggle="tab" href="#subCategory1" style="border-radius:23px;">
								<h4>Sub Category </h4></a></li>
					</ul>
				</div>
		   </div>
		</div>    
 	<!--  <div class="row">
		     <div class="col-sm-offset-1 col-md-10">
				  		<hr style="border-top-color:#c1b1b1;">
		     </div>
		     </div> -->
 	 <div class="tab-content" style="float: left; padding-top:2%">
 	 
 	                    <!----------------------------------- Category ----------------------------------------->
 	 
 	 <div id="Category1" class="tab-pane fade in active">
 	 <form class="form-horizontal" method="post" action="" name="catd">
			 <div class="row form-group" >
           		<label class="col-md-3  control-label" for="categoryName"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("catName") %> <%}%> <%if(abc.equals("english")){%>Category Name<%}%><sup>*</sup></label>  
           	 		<div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-list-alt"></i>
							</span>
              					<input id="categoryName"  name="categoryName" placeholder="Category Name" class="form-control input-md" type="text" onchange="checkForDuplicateCategoryEntry()" style="text-transform: none;">
            			</div>
           		 	</div>
				</div>
				
				<div class="form-group row" style="padding-top:2%">
		            <div class="col-md-9 col-md-offset-1 text-center">
		           <!--  "catDetails()" function is implemented in categoryDetails.js -->
		           	
		           	<input style=" height: 53px; width: 128px; font-size: 25" type="button" id="save"  class="btn btn-large btn-success button-height-width" name="btn1" onclick="catDetails()" value="Submit">
		            <input style=" height: 53px; width: 128px; font-size: 25" type="reset"  class="btn btn-large btn-danger  button-height-width" id="save" name="btn" value="Cancel" onclick="reset()">
		            <input style=" height: 53px; width: 128px; font-size: 25" type="button"  class="btn btn-large btn-primary button-height-width" name="btn" onclick="catlist()" value="List">
		            <input style=" height: 53px; width: 128px; font-size: 25" type="button" value="Edit" id="listBtn" class="btn btn-primary" onclick="editcat()" /> 
		     
		       <%--  <button id="save" name="btn" class="btn btn-large btn-success glyphicon glyphicon-save  button-height-width"  onclick="catDetails()"><h4><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("submit") %> <%}%> <%if(abc.equals("english")){%>Submit<%}%></h4></button>
              	<button class="btn btn-large btn-danger glyphicon glyphicon-remove-circle  button-height-width" type="reset"  onclick="reset()"><h4><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("cancel") %> <%}%> <%if(abc.equals("english")){%>Cancel<%}%> </h4> </button>
 --%>

		   </div>
         </div>
         </form>
         </div>
         

         <!----------------------------------------- Sub-Category ---------------------------------------------------->
      
         <div id="subCategory1" class="tab-pane">    
         <form class="form-horizontal" method="post" action="" name="subCat">  
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
							<input list="cat_drop" id="fk_cat_id"  class="form-control" placeholder="Category Name" >
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
			
				
           		<label class=" col-md-3  control-label" for="categoryName"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("catName") %> <%}%> <%if(abc.equals("english")){%>Sub Category Name<%}%><sup>*</sup></label>  
           	 		<div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-list-alt"></i>
							</span>
              					<input id="subcategoryName" name="subcategoryName" placeholder="Sub Category Name" class="form-control input-md" type="text" onchange="checkForDuplicateSubCategoryEntry()" style="text-transform:none;">
            			</div>
           		 	</div>
				</div>
				
				<div class="form-group row " style="padding-top:2%">
		            <div class="col-md-9 col-md-offset-1 text-center">
		           <!--  "catDetails()" function is implemented in categoryDetails.js -->
		           	
		           	<input style=" height: 53px; width: 128px; font-size: 25" type="button" id="save1"  class="btn  btn-success button-height-width" name="btn" onclick="subcat()" value="Submit">
		            <input style=" height: 53px; width: 128px; font-size: 25" type="reset"  class="btn  btn-danger  button-height-width" id="save" name="btn" value="Cancel" onclick="reset()">
		            <input style=" height: 53px; width: 128px; font-size: 25" type="button"   class="btn  btn-primary button-height-width" name="btn" onclick="catlist1()" value="List">
		             <input style=" height: 53px; width: 128px; font-size: 25" type="button" value="Edit" id="listBtn" class="btn btn-primary" onclick="editSubcat()" />  
		     
		       <%--  <button id="save" name="btn" class="btn btn-large btn-success glyphicon glyphicon-save  button-height-width"  onclick="catDetails()"><h4><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("submit") %> <%}%> <%if(abc.equals("english")){%>Submit<%}%></h4></button>
              	<button class="btn btn-large btn-danger glyphicon glyphicon-remove-circle  button-height-width" type="reset"  onclick="reset()"><h4><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("cancel") %> <%}%> <%if(abc.equals("english")){%>Cancel<%}%> </h4> </button>
 --%>

		     </div>
         </div>
         </form>
         </div>
       
     </div>
     </div>
<jsp:include page="commons/footer.jsp"></jsp:include>