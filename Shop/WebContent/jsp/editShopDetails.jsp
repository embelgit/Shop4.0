<%@page import="com.Fertilizer.hibernate.shopDetailsBean"%>
<%@page import="com.Fertilizer.dao.shopDetailsDao"%>
<%@page import="com.Fertilizer.hibernate.EmployeeDetailsBean"%>
<%boolean isHome = false;%>
<%@include file="commons/header.jsp"%>
 <%@page import="com.Fertilizer.dao.EmployeeDetailsDao" %>

<%@page import="java.util.List"%>
<head> 
	<meta charset="utf-8">
	<script type="text/javascript" src="/Shop/staticContent/js/shopdetails.js"></script>
	<script type="text/javascript">
	
  			function Back()
  			{
  				window.location = "shopdetails.jsp" ;
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
			  		<h2 class="form-name style_heading">Edit Shop Details</h2>
			  	</div>
			 
    </div>
     <div class="row">
		     <div class="col-sm-offset-1 col-md-10">
				  		<hr style="border-top-color:#c1b1b1;">
		     </div>	
    </div>
      <div class="container col-sm-offset-2" >
        <form class="form-horizontal" method="post" action="" name="shop1">
          <fieldset>
       			 <div class="row form-group">
    	     	
           				 <label class="col-md-2 control-label" for="shop">Shop Name</label>  
          					  <div class="col-md-3">
								<div class="input-group">
									<span class="input-group-addon">
										<i class="glyphicon glyphicon-list-alt"></i>
									</span>
							
							 <%
								shopDetailsDao eedd = new shopDetailsDao();
           						List mList =eedd.getAllMainShop();
							
							%>
						<input list="shop_drop" id="shop" placeholder="Select Shop Name" class="form-control" onchange="getShopDetails()">
				<datalist id="shop_drop">
							
							<%
					           for(int i=0;i<mList.size();i++){
					        	   shopDetailsBean detailsBean =(shopDetailsBean)mList.get(i);
							%>
		
						<option data-value="<%=detailsBean.getShopId()%>"><%=detailsBean.getShopName()%> </option>
							<%
				      			}
				    		%>
						</datalist> 
					</div>
           		</div>	
           		</div>
       		<div class="row form-group">
           		<label class="col-md-2 control-label" for="shopName">Shop Name<sup>*</sup></label>  
		           	 <div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-list-alt"></i>
							</span>
              				<input id="shopName" name="shopName" placeholder="Shop Name" class="form-control input-md" type="text" >
            			</div>
            		</div>

            	<label class="col-md-2 control-label" for="contactNumber"> Contact Number<sup>*</sup></label>  
            		<div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-earphone"></i>
							</span>
              					<input id="contactNumber" name="contactNumber" placeholder="Contact Number" class="form-control input-md" type="text" maxlength="10">
            			</div>
					</div>
			</div>
			
			 <div class="row form-group">
				<label class="col-md-2 control-label" for="gstNo">GST No<sup>*</sup></label>  
           	 		<div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon">
								No
							</span>
              				<input id="gstNo" name="gstNo" placeholder="GST No" class="form-control input-md" type="text" >
            			</div>
            		</div>
	
	           <label class="col-md-2 control-label" for="address">Address<sup>*</sup></label>  
           	 	<div class="col-md-3">
					<div class="input-group">
						<span class="input-group-addon">
							<i class="glyphicon glyphicon-map-marker"></i>
						</span>
              			<input id="address"  name="address" placeholder="Address" class="form-control input-md" type="text" >
            		</div>
            	</div>
			</div>
           
           <div class="row form-group">
           	<label class="col-md-2 control-label" for="wholesaleNo">Wholesale Lic No</label>  
           		<div class="col-md-3">
					<div class="input-group">
						<span class="input-group-addon">
							No
						</span>
              			<input id="wholesaleNo" name="wholesaleNo " placeholder="Wholesale Lic No" class="form-control input-md" type="text" >
            		</div>
				</div>
			
			<label class="col-md-2 control-label" for="shopLicNo">Shop Lic No</label>  
           	 	<div class="col-md-3">
					<div class="input-group">
						<span class="input-group-addon">
							No
						</span>
              			<input id="shopLicNo" name="shopLicNo" placeholder="Shop Lic No" class="form-control input-md" type="text" >
            		</div>
            	</div>
			</div>

			<div class="row form-group">
           		<label class="col-md-2 control-label" for="footername">Footer Shop Name<sup>*</sup></label>  
           	 		<div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-list-alt"></i>
							</span>
              				<input id="footername" name="footername" placeholder="Footer Shop Name" class="form-control input-md" type="text" >
            			</div>
            		</div>          
			</div>
								
 			<div class="form-group row" style="padding-top:2%">
            	<div class="col-md-10 text-center">
            	
            	  	<input style="height: 53px; width: 128; font-size: 25" type="button" id="save"    class="btn btn-large btn-success" name="btn1" onclick="updateshopDetails()" value="Submit">
		            <input style="height: 53px; width: 128; font-size: 25" type="reset"  id="save1"   class="btn btn-large btn-danger"  name="btn2" onclick="reset()" value="Cancel">
		     	    <input style="height: 53px; width: 128; font-size: 25" type="button" id="listBtn" class="btn btn-primary"           name="btn3" onclick="Back()" value="Back" />
		     	                	
            	</div>
          	</div>


		</fieldset>
      </form>
    </div>
    
<jsp:include page="commons/footer.jsp"></jsp:include>