<%@page import="com.Fertilizer.hibernate.shopDetailsBean"%>
<%@page import="com.Fertilizer.utility.PropertiesHelper"%>
<%@page import="com.Fertilizer.dao.shopDetailsDao"%>
<%@page import="com.Fertilizer.hibernate.CategoryDetailsBean"%>
<%@page import="com.Fertilizer.dao.CategoryDetailsDao"%>
<%boolean isHome = false;
%>
 
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
 
<head>
<!-- <link rel="stylesheet" href="/Fertilizer/staticContent/css/bootstrap.min.css"> -->
<meta charset="utf-8">

<link href="/Shop/staticContent/css/bootstrap.css" rel="stylesheet">
<link href="/Shop/staticContent/css/bootstrap.min.css" rel="stylesheet">
<link href="/Shop/staticContent/css/bootstrap-theme.css" rel="stylesheet">
<link href="/Shop/staticContent/css/bootstrap-theme.min.css" rel="stylesheet">
<!-- Font awesome (social icon) -->
<link href="/Shop/staticContent/css/font-awesome.css" rel="stylesheet">
<link href="/Shop/staticContent/css/font-awesome.min.css" rel="stylesheet">

<script type="text/javascript" src="/Shop/staticContent/js/bootstrap.js"> </script>
<script type="text/javascript" src="/Shop/staticContent/js/bootstrap.min.js"> </script>
<script type="text/javascript" src="/Shop/staticContent/js/jquery.min.js"> </script>
 <script type="text/javascript" src="/Shop/staticContent/js/bootstrap.js"></script>
 <script type="text/javascript" src="/Shop/staticContent/js/bootbox.min.js"></script>

<script type="text/javascript" src="/Shop/staticContent/js/shopdetails.js"></script>

<%-- <script>
function checkForDuplicateShopEntry(){
		<%
		shopDetailsDao dao2 = new shopDetailsDao();
		List list = dao2.getAllShopList();
		%>
		
		<%
		int z = 0;
		for(z=0;z<list.size();z++){
			shopDetailsBean bean = (shopDetailsBean)list.get(z);
		%>
		var shopname= "<%=bean.getShopName()%>";

		if(document.getElementById("shopName").value == shopname ){
			alert("Shop Name already exist...Duplicate Not allowed");
			location.reload();
			return false;
		}
		<%
		}
		%>
		
		}

</script> --%>


</head>
		 	<div class="row header_margin_top">
			    <div align="center">
			  		<h2 class="form-name style_heading"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("categoryDetails") %> <%}%> <%if(abc.equals("english")){%>Shop Details<%}%> </h2>
			  	</div>
			 
    </div>
     <div class="row">
		     <div class="col-sm-offset-1 col-md-10">
				  		<hr style="border-top-color:#c1b1b1;">
		     </div>	
    </div>
    
	<%-- <div class="container col-sm-offset-2" >
         <!-- Value of 'name' attribute is used in categoryDetails.js  -->
			<div class="row form-group">
           	 		<div class="col-md-6">
              			<%@include file="commons/clock.jsp" %>
           		 	</div>
			</div> --%>
			<!-- -- tabs by RK  -->
		<!-- <ul class="nav nav-tabs" style="background-color: white;">
	    <li class="active"><a data-toggle="tab" href="#Category1"><h4 style="color:blue">Category</h4></a></li>
	     <li><a data-toggle="tab" href="#subCategory1"><h4 style="color:blue">Sub Category</h4></a></li>
	    
 	 </ul> -->
 	<!--  <div class="row">
		     <div class="col-sm-offset-1 col-md-10">
				  		<hr style="border-top-color:#c1b1b1;">
		     </div>
		     </div>
 	 <div class="tab-content" style="float: left"> -->
 	 
 	 <!-- ----- Shop by RK -->
 	 <div id="shopDetail">
 	 <form class="form-horizontal" method="post" action="" name="catd">
			 <div class="row form-group" >
           		<label class="col-md-3 col-sm-offset-0 control-label" for="categoryName"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("catName") %> <%}%> <%if(abc.equals("english")){%>Shop Name<%}%><sup>*</sup></label>  
           	 		<div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-list-alt"></i>
							</span>
              					<input id="shopName" name="shopName" placeholder="shop Name" class="form-control input-md" type="text" >
            			</div>
            			</div>
            			
            	<label class="col-md-2 col-sm-offset-0  control-label" for="categoryName"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("catName") %> <%}%> <%if(abc.equals("english")){%>Contact Number<%}%><sup>*</sup></label>  
           	 		<div class="col-md-3">
            			<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-list-alt"></i>
							</span>
              					<input id="contactNumber" name="contactNumber" placeholder="Contact Number" class="form-control input-md" type="text" >
            			</div>
            			
           		 	</div>
				</div>
				
				 <div class="row form-group" >
           		<label class="col-md-3 col-sm-offset-0 control-label" for="categoryName"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("catName") %> <%}%> <%if(abc.equals("english")){%>GST No<%}%><sup>*</sup></label>  
           	 		<div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-list-alt"></i>
							</span>
              					<input id="gstNo" name="gstNo" placeholder="GST Number" class="form-control input-md" type="text" >
            			</div>
            			</div>
            			
            	<label class="col-md-2 col-sm-offset-0  control-label" for="categoryName"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("catName") %> <%}%> <%if(abc.equals("english")){%>Address<%}%><sup>*</sup></label>  
           	 		<div class="col-md-3">
            			<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-list-alt"></i>
							</span>
              					<!-- <input id="address" name="address" placeholder="Address" class="form-control input-md" type="text"> -->
             					<textarea id="address" name="address" placeholder="Address" class="form-control input-md" maxlength="500"></textarea>
            			</div>            			
           		 	</div>
				</div>
				
				
				
				<div class="form-group row">
		            <div class="col-md-10 col-sm-offset-1 text-center">
		           <!--  "catDetails()" function is implemented in categoryDetails.js -->
		           	
		           	<input style=" height: 65px; width: 180; font-size: 25" type="button"
		           	id="save" style="font-size: 25" class="btn btn-large btn-success button-height-width" name="btn"
		           	onclick="shopDetails()" value="Submit">
		            <input style=" height: 65px; width: 180; font-size: 25" type="reset" style="font-size: 25" class="btn btn-large btn-danger  button-height-width" id="save" name="btn" value="Cancel" onclick="reset()">
		     
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