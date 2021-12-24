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
	<script type="text/javascript" src="/Shop/staticContent/js/bootstrap.js"></script>
	<script type="text/javascript" src="/Shop/staticContent/js/bootbox.min.js"></script>
	<script type="text/javascript">
	
  			function Back()
  			{
  				window.location = "shopdetails.jsp" ;
  			}
  			
  			
  		</script>
<link rel="stylesheet" href="/Shop/staticContent/css/shopstyle.css"> 		
</head>
<body>
<div class="container-fluid">

  	<div class="row header_margin_top">
			    <div align="center">
			  		<h2 class="form-name style_heading">Edit Shop Details</h2>
			  	</div>
			 
    </div>
	<div class="row" align="center">
		<div class="hr-width">
			<hr class="style-one">
		</div>	
    </div>
      <div class="container">
        <form class="form-horizontal" method="post" action="" name="shop1">
          <fieldset>
       		<div class="shopform-margin">
       			<div class="row">
    	     		<div class="form-group">
           					<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
           				 		<label class="control-label" for="shop">Shop Name</label>  
          					</div>
          					<div class="col-lg-3 col-md-3 col-sm-8">
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
           					<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">
           						<label class="control-label" for="shopName">Shop Name<sup>*</sup></label>  
		           	 		</div>
		           	 		<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
								<div class="input-group">
									<span class="input-group-addon">
										<i class="glyphicon glyphicon-list-alt"></i>
									</span>
              						<input id="shopName" name="shopName" placeholder="Shop Name" class="form-control input-md" type="text" >
            					</div>
            				</div>	
           			</div>
           		</div>
       		
       		<div class="row">
           		<div class="form-group">	
					<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
						<label class="control-label" for="contactNumber"> Contact Number<sup>*</sup></label>  
            		</div>
            		<div class="col-lg-3 col-md-3 col-sm-8">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-earphone"></i>
							</span>
              					<input id="contactNumber" name="contactNumber" placeholder="Contact Number" class="form-control input-md" type="text" maxlength="10">
            			</div>
					</div>
					<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">
						<label class="control-label" for="gstNo">GST No<sup>*</sup></label>  
           	 		</div>
           	 		<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
						<div class="input-group">
							<span class="input-group-addon">
								<span class="glyphicon nogyphicon">No</span>
							</span>
              				<input id="gstNo" name="gstNo" placeholder="GST No" class="form-control input-md" type="text" >
            			</div>
            		</div>	
				</div>
			</div>
			
			<div class="row">
				<div class="form-group">
				<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
					<label class="control-label" for="address">Address<sup>*</sup></label>  
           	 	</div>
           	 	<div class="col-lg-3 col-md-3 col-sm-8">
					<div class="input-group">
						<span class="input-group-addon">
							<i class="glyphicon glyphicon-map-marker"></i>
						</span>
              			<input id="address"  name="address" placeholder="Address" class="form-control input-md" type="text" >
            		</div>
            	</div>
            	<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">
            		<label class="control-label" for="wholesaleNo">Wholesale Lic No</label>  
           		</div>
           		<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
					<div class="input-group">
						<span class="input-group-addon">
							<span class="glyphicon nogyphicon">No</span>
						</span>
              			<input id="wholesaleNo" name="wholesaleNo " placeholder="Wholesale Lic No" class="form-control input-md" type="text" >
            		</div>
				</div>            	
            	</div>
			</div>
           
           <div class="row">
           		<div class="form-group">
           		<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">	
           			<label class="control-label" for="shopLicNo">Shop Lic No</label>  
           	 	</div>
           	 	<div class="col-lg-3 col-md-3 col-sm-8">
					<div class="input-group">
						<span class="input-group-addon">
							<span class="glyphicon nogyphicon">No</span>
						</span>
              			<input id="shopLicNo" name="shopLicNo" placeholder="Shop Lic No" class="form-control input-md" type="text" >
            		</div>
            	</div>
            	<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">
            		<label class="control-label" for="footername">Footer Shop Name<sup>*</sup></label>  
           	 	</div>
           	 		<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-list-alt"></i>
							</span>
              				<input id="footername" name="footername" placeholder="Footer Shop Name" class="form-control input-md" type="text" >
            			</div>
            		</div>            	
            	</div>
			</div>

		</div>
	</fieldset>
      </form>
											
 			<div class="row buttons-margin" align="center">
            	<input type="button" id="save" class="btn btn-large btn-success" name="btn1" onclick="updateshopDetails()" value="Submit">
		        <input type="reset" id="save1" class="btn btn-large btn-danger" name="btn2" onclick="reset()" value="Cancel">
		     	<input type="button" id="listBtn" class="btn btn-primary" name="btn3" onclick="Back()" value="Back" />
		    </div>


		
    </div>

</div>
</body>
    
<jsp:include page="commons/footer.jsp"></jsp:include>