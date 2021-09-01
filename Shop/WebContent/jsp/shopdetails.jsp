<%@page import="com.Fertilizer.hibernate.shopDetailsBean"%>
<%@page import="com.Fertilizer.dao.shopDetailsDao"%>
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

<script type="text/javascript">
          		 function shoplist()
          		 {
          		 	window.location = "shopList.jsp";
          		 }
          		 function editShop() {
          			 window.location = "editShopDetails.jsp";
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
			  		<h2 class="form-name style_heading"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("categoryDetails") %> <%}%> <%if(abc.equals("english")){%>Shop Details<%}%> </h2>
			  	</div>
			  	
			  	            <%
								Long shopid = 1l;
						     %>
						    <%
							shopDetailsDao dao=new shopDetailsDao();
							List listtxid=dao.getShopId();
								

								for (int i = 0; i < listtxid.size(); i++) {
									
									shopDetailsBean bean=(shopDetailsBean) listtxid.get(i);
									shopid=bean.getShopId();
									shopid++;
							 
							} 
						%>
			  	
			 			<div align="right">
								<h3 style="color: red; padding-right: 138px;">
									Shop ID ::
								<%
									out.println(shopid);
								%>
								</h3>
						</div>
    </div>
     <div class="row">
		     <div class="col-sm-offset-1 col-md-10">
				  		<hr style="border-top-color:#c1b1b1;">
		     </div>	
    </div>
    <div>
</div>
 	 
 	 <!--------------------------------------------------------- Shop by RK -------------------------------------------------------------->
 	 
 	 <div id="shopDetail">
 	 <form class="form-horizontal" method="post" action="" name="catd">
			 <div class="row form-group" >
           		<label class="col-md-3 col-sm-offset-0 control-label" for="categoryName"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("catName") %> <%}%> <%if(abc.equals("english")){%>Shop Name<%}%><sup>*</sup></label>  
           	 		<div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-list-alt"></i>
							</span>
              					<input id="shopName" name="shopName" placeholder="Shop Name" class="form-control input-md" type="text" autofocus >
            			</div>
            			</div>
            			
            	<label class="col-md-2 col-sm-offset-0  control-label" for="categoryName"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("catName") %> <%}%> <%if(abc.equals("english")){%>Contact Number<%}%><sup>*</sup></label>  
           	 		<div class="col-md-3">
            			<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-earphone"></i>
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
								No
							</span>
              					<input id="gstNo" name="gstNo" placeholder="GST Number" class="form-control input-md" type="text" >
            			</div>
            			</div>
            			
            	<label class="col-md-2 col-sm-offset-0  control-label" for="categoryName"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("catName") %> <%}%> <%if(abc.equals("english")){%>Address<%}%><sup>*</sup></label>  
           	 		<div class="col-md-3">
            			<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-map-marker"></i>
							</span>
              					<input id="address" name="address" placeholder="Address" class="form-control input-md" type="text">
            			</div>            			
           		 	</div>
				</div>
				
				<div class="row form-group" >
           		<label class="col-md-3 col-sm-offset-0 control-label" for="categoryName"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("catName") %> <%}%> <%if(abc.equals("english")){%>Wholesale Lic No<%}%><sup>*</sup></label>  
           	 		<div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon">
								No
							</span>
              					<input id="wholesalelicno" name="wholesalelicno" placeholder="Wholesale Lic No" class="form-control input-md" type="text" >
            			</div>
            			</div>
            			
            	<label class="col-md-2 col-sm-offset-0  control-label" for="categoryName"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("catName") %> <%}%> <%if(abc.equals("english")){%>Shop Lic No<%}%><sup>*</sup></label>  
           	 		<div class="col-md-3">
            			<div class="input-group">
							<span class="input-group-addon">
								No
							</span>
              					<input id="shoplicno" name="shoplicno" placeholder="Shop Lic No" class="form-control input-md" type="text">
             					<!-- <textarea id="address" name="address" placeholder="Address" class="form-control input-md" maxlength="500"></textarea> -->
            			</div>            			
           		 	</div>
				</div>
				
				<div class="row form-group" >
           		<label class="col-md-3 col-sm-offset-0 control-label" for="categoryName"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("catName") %> <%}%> <%if(abc.equals("english")){%>Footer Shop Name<%}%><sup>*</sup></label>  
           	 		<div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-list-alt"></i>
							</span>
              					<input id="footershopname" name="footershopname" placeholder="Footer Shop Name" class="form-control input-md" type="text" >
            			</div>
            			</div>
            			
            	<%-- <label class="col-md-2 col-sm-offset-0  control-label" for="categoryName"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("catName") %> <%}%> <%if(abc.equals("english")){%>Shop Lic No<%}%><sup>*</sup></label>  
           	 		<div class="col-md-3">
            			<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-list-alt"></i>
							</span>
              					<input id="shoplicno" name="shoplicno" placeholder="Shop Lic No" class="form-control input-md" type="text">
             					<!-- <textarea id="address" name="address" placeholder="Address" class="form-control input-md" maxlength="500"></textarea> -->
            			</div>            			
           		 	</div> --%>
				</div>
				
				
				<div class="form-group row" style="padding-top:2%">
		            <div class="col-md-10 col-sm-offset-1 text-center">
		          		           	 
		           	<input style="height: 53px; width: 128; font-size: 25" type="button" id="save"     class="btn btn-large btn-success" name="btn" onclick="shopDetails()" value="Submit">
		            <input style="height: 53px; width: 128; font-size: 25" type="reset"  id="save1"    class="btn btn-large btn-danger"  name="btn" onclick="reset()" value="Cancel">
		     	    <input style="height: 53px; width: 128; font-size: 25" type="button" id="listBtn"  class="btn btn-primary"           name="btn" onclick="shoplist()" value="List" />
		     	    <input style="height: 53px; width: 128; font-size: 25" type="button" id="listBtn1" class="btn btn-primary"           name="btn" onclick="editShop()" value="Edit" />
		     	   
		     	   </div>
              </div>
         </form>
         </div>
       
     </div>
     </div>
<jsp:include page="commons/footer.jsp"></jsp:include>