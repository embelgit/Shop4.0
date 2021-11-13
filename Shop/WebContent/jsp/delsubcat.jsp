<%@page import="com.Fertilizer.hibernate.SubCategoryDetailsBean"%>
<%@page import="com.Fertilizer.hibernate.CategoryDetailsBean"%>
<%@page import="com.Fertilizer.dao.CategoryDetailsDao"%>
<%boolean isHome = false;
%>
<%@include file="commons/header.jsp"%>
 
<head>
<!-- <link rel="stylesheet" href="/Fertilizer/staticContent/css/bootstrap.min.css">  comment-->
<meta charset="utf-8">
<script type="text/javascript" src="/Shop/staticContent/js/bootstrap.js"></script>
<script type="text/javascript" src="/Shop/staticContent/js/bootbox.min.js"></script>
<script type="text/javascript" src="/Shop/staticContent/js/categoryDetails.js"></script>
<script>
function catlist1()
{
	 window.location = "catlist1.jsp";
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

<!--  <script type="text/javascript">
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



</style>-->
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
			  		<h2 class="form-name style_heading"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("categoryDetails") %> <%}%> <%if(abc.equals("english")){%>Delete Sub-Category<%}%> </h2>
			  	</div>
           </div>
        
     <div class="row">
		     <div class="col-sm-offset-1 col-md-10">
				  		<hr style="border-top-color:#c1b1b1;">
		     </div>	
    </div>
    
	<div class="container col-sm-offset-1">
	
	<!-- <------------------------------------- Category and Sub-Category Button ------------------------------------------->
	
	    

         

         <!----------------------------------------- Sub-Category ---------------------------------------------------->
      
        
         <form class="form-horizontal" method="post" action="" name="subCat">  
         <div class="row form-group">
           		<label class="col-md-6  control-label" for="categoryName"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("catName") %> <%}%> <%if(abc.equals("english")){%>Select Subcategory<%}%><sup>*</sup></label>  
           	 		<div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-list-alt"></i>
							</span>
							<%
							   CategoryDetailsDao cdd = new CategoryDetailsDao();
           						List cList =cdd.getAllMainCatsub(request);
							
							%>
							<input list="subcat_drop" id="fk_subcat_id"  class="form-control" placeholder="Sub-Category Name" >
				<datalist id="subcat_drop">
							<%
					           for(int i=0;i<cList.size();i++){
					        	   SubCategoryDetailsBean cat=(SubCategoryDetailsBean)cList.get(i);
							%>
		
							<option data-value="<%=cat.getSubcatId()%>" r ,vvalue="<%=cat.getSubcategoryName()%>">
							<%
				      			}
				    		%>
			              	
            			</datalist>
				</div>
				</div>
			
				
           		
				</div>
				
				<div class="form-group row " style="padding-top:2%">
		            <div class="col-md-10 col-md-offset-1 text-center">

		           	
		           	<input style=" height: 53px; width: 128px; font-size: 25" type="button" id="save1"  class="btn  btn-success button-height-width" name="btn" onclick="delsubcat()" value="Delete">
		       
		            <input style=" height: 53px; width: 128px; font-size: 25" type="button"   class="btn  btn-primary button-height-width" name="btn" onclick="catlist1()" value="Back">
		
		     
		

		     </div>
         </div>
         </form>
         </div>
       
    
<jsp:include page="commons/footer.jsp"></jsp:include>