<%@page import="com.Fertilizer.utility.PropertiesHelper"%>
<%@page import="com.Fertilizer.hibernate.SubCategoryDetailsBean"%>
<%@page import="com.Fertilizer.hibernate.CategoryDetailsBean"%>
<%@page import="com.Fertilizer.dao.CategoryDetailsDao"%>
<%@page import = "java.util.*"%>
<%boolean isHome = false;
%>

<head>
<!-- <link rel="stylesheet" href="/Fertilizer/staticContent/css/bootstrap.min.css"> -->
<meta charset="utf-8">

<script type="text/javascript" src="/Shop/staticContent/js/jquery-1.12.3.min.js"></script>
		<script type="text/javascript"  src="/Shop/staticContent/js/bootstrap.min.js"></script>
		
<link rel="stylesheet" href="/Shop/staticContent/css/bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="/Shop/staticContent/y_css/style.css" />
<script type="text/javascript" src="/Shop/staticContent/js/bootstrap.js"> </script>
<script type="text/javascript" src="/Shop/staticContent/js/bootstrap.min.js"> </script>
<link href="/Shop/staticContent/css/bootstrap.css" rel="stylesheet">
<link href="/Shop/staticContent/css/bootstrap.min.css" rel="stylesheet">
<link href="/Shop/staticContent/css/bootstrap-theme.css" rel="stylesheet">
<link href="/Shop/staticContent/css/bootstrap-theme.min.css" rel="stylesheet">
<link rel="stylesheet" href="/Shop/staticContent/css/bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="/Shop/staticContent/y_css/style.css" />
<script src="/Shop/staticContent/js/vatpercentage.js" type="text/javascript"></script>
<script type="text/javascript" src="/Shop/staticContent/js/productDetail.js"></script>
<script type="text/javascript" src="/Shop/staticContent/js/bootstrap.js"></script>
<script type="text/javascript" src="/Shop/staticContent/js/bootbox.min.js"></script>
<script type="text/javascript" src="/Shop/staticContent/js/categoryDetails.js">
</script>


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

<script type="text/javascript">


function back()
{
	window.close();
}



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
          			if(proName == pro){
          				alert("category already exist...Duplicate Not allowed");
          				location.reload();
          				return false;
          			}
          			<%
          			}
          			%>
          			
          			}
</script>
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

		if(subcatName == subCat && cat == catName){
			alert("subcategory already exist...Duplicate Not allowed");
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
</head>
		 	<div class="row header_margin_top">
			    <div align="center">
			  		<h2 class="form-name style_heading">
			  		<%if(abc.equals("marathi"))
			  			{%><%=PropertiesHelper.marathiProperties.getProperty("categoryDetails") %> 
			  			<%}%> 
			  				<%if(abc.equals("english"))
			  				{%>Category Details<%}%> 
			  		</h2>
			  	</div>
		    </div>
     <div class="row">
		     <div class="col-sm-offset-1 col-md-10">
				  		<hr style="border-top-color:#c1b1b1;">
		     </div>	
    </div>
    
	<!-- <------------------------------------- Category and Sub-Category Button -------------------------------------------> 
	
	 <div class="container col-md-offset-" >
        <div class="row">
            <div class="col-12 col-md-7">
      			<ul class="nav nav-tabs">
	   		       <li class="active" style="padding-left:4%"><a data-toggle="tab" href="#Category1" style="border-radius:23px;height:40px;width:109px"><h4 style="margin-top: inherit;" >Category</h4></a></li>
			       <li><a data-toggle="tab" href="#subCategory1" style="border-radius:23px;height:40px;width:143px"><h4 style="margin-top: 2%;">Sub Category</h4></a></li>
	   	       </ul>
 	        </div>
 	    </div>
 	 </div>
 	 
 	 <!-- <div class="row">
		     <div class="col-sm-offset-1 col-md-10">
				  		<hr style="border-top-color:#c1b1b1;">
		     </div>
		     </div> -->
 	 <div class="tab-content" style="float: left">
 	 
 	 <!------------------------------------------------------- Category by RK --------------------------------------------------------->
 	 
 	 <div id="Category1" class="tab-pane fade in active" style="padding-top:2%">
 	 <form class="form-horizontal" method="post" action="" name="catd">
			 <div class="row form-group" >
           		<label class="col-md-2 col-md-offset-1 control-label" for="categoryName"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("catName") %> <%}%> <%if(abc.equals("english")){%>Category Name<%}%><sup>*</sup></label>  
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
		            <div class="col-md-10 text-center col-md-offset-2">
		           <!--  "catDetails()" function is implemented in categoryDetails.js -->
		           	
		           	<input style=" width: 128px; height: 53px; font-size: 25" type="button" id="save" style="font-size: 25" class="btn btn-success" name="btn1" onclick="catDetails()" value="Submit">
		            <input style=" width: 128px; height: 53px; font-size: 25" type="reset" style="font-size: 25" class="btn  btn-danger" id="save" name="btn" value="Cancel" onclick="back()">
		            

		   </div>
         </div>
         </form>
         </div>
         

         <!----------------------------------- sub category by RK ------------------------------------>
         
         <div id="subCategory1" class="tab-pane" style="padding-top:2%">    
         <form class="form-horizontal" method="post" action="" name="subCat">  
         <div class="row form-group" style="padding-left: 6%;">
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
              					<input id="subcategoryName" name="subcategoryName" placeholder="Sub Category Name" class="form-control input-md" type="text" onchange="checkForDuplicateSubCategoryEntry()">
            			</div>
           		 	</div>
				</div>
				
		 <div class="form-group row" style="padding-top:3%">
		      <div class="col-md-6 text-center col-md-offset-3">
		           <!--  "catDetails()" function is implemented in categoryDetails.js -->
		           	
		           	<input style=" width: 128px; height: 53px; font-size: 25" type="button" id="save1" style="font-size: 25" class="btn btn-success" name="btn" onclick="subcat()" value="Submit">
		            <input style=" width: 128px; height: 53px; font-size: 25" type="reset" style="font-size: 25" class="btn btn-danger" id="save" name="btn" value="Cancel" onclick="back()">
		          
		      </div>
         </div>
         </form>
         </div>
       
     </div>
     </div>
<jsp:include page="commons/footer.jsp"></jsp:include>