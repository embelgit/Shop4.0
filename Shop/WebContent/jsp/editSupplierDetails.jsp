<%@page import="com.Fertilizer.hibernate.SupplierDetailsBean"%>
<%@page import="com.Fertilizer.dao.SupplierDetailsDao"%>
<% boolean isHome=false;%>
<%@include file="commons/header.jsp"%>
<head>
 <meta charset="utf-8">
   <script type="text/javascript" src="/Shop/staticContent/js/bootstrap.js"></script>
 <script type="text/javascript" src="/Shop/staticContent/js/bootbox.min.js"></script>
 <script type="text/javascript" src="/Shop/staticContent/js/supplierDetailsUnused.js"></script>
 <script type="text/javascript">
  			function Back()
  			{
  				window.location = "supplierdetails.jsp" ;
  			}
  			
  			
  		</script>
<link rel="stylesheet" href="/Shop/staticContent/css/shopstyle.css">
</head>
<body>
<div class="container-fluid">
   <div class="row header_margin_top">
			    <div align="center">
			  		<h2 class="form-name style_heading"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("supplierdetails") %> <%}%> <%if(abc.equals("english")){%>Edit Supplier  Details<%}%></h2>
			  	</div>
			 
    </div>
    <div class="row" align="center">
		<div class="hr-width">
			<hr class="style-one">
		</div>	
    </div>
    
      <div class="container">
        <form class="form-horizontal" method="post" action="" name="spld1"><!-- Value of 'name' attribute is used in  supplierDetails.js  -->
          <fieldset>
          		<div class="shopform-margin">	 	
          	 		<div class="row">
           				<div class="form-group">	
           					<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4"> 			
           				 		<label class="control-label" for="supplier">Supplier Name</label>  
          					</div>
          					<div class="col-lg-3 col-md-3 col-sm-8">
								<div class="input-group">
									<span class="input-group-addon">
										<i class="	glyphicon glyphicon-user"></i>
									</span>
									
							
										
							<!-- Following code is to get Supplier from "supplier_details" table of "fertilizer" DB -->
							<!-- getAllSupllier() is implemented in  SupplierDetailsDao with return type List-->
						
							<%
								SupplierDetailsDao sdd = new SupplierDetailsDao();
           						List sList =sdd.getAllSupplier(request);
							
							%>
							
									<input list="sup_drop" id="supplier" placeholder="Select Supplier Name" onchange="getSupplierDetails()" class="form-control">
									<datalist id="sup_drop">
							
							<%
					           for(int i=0;i<sList.size();i++){
					        	   SupplierDetailsBean sup =(SupplierDetailsBean)sList.get(i);
							%>
		
										<option data-value="<%=sup.getSupId()%>" value="<%=sup.getDealerName() %>">
							<%
				      			}
				    		%>
									</datalist>           	
								</div>
           					</div>
           					<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">	
           						<label class="control-label" for="dealerName"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("dealerName") %> <%}%> <%if(abc.equals("english")){%>Supplier Name<%}%><sup>*</sup></label>  
            				</div>
            				<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
								<div class="input-group">
									<span class="input-group-addon">
										<i class="glyphicon glyphicon-user"></i>
									</span>
              						<input id="dealerName" name="dealerName" placeholder="Supplier Name" class="form-control input-md" type="text">
            					</div>
            				</div>
           				</div>
           			</div>
           	
           	<div class="row">
           		<div class="form-group">            		
            		<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
            			<label class="control-label" for="personName"> Person Name</label>  
            		</div>
            		<div class="col-lg-3 col-md-3 col-sm-8">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-user"></i>
							</span>
	           		   		<input id="personName" name="personName" placeholder="Person Name" class="form-control input-md" type="text" >
	           		 	</div>
					</div>
					<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">
						<label class="control-label" for="contactNo"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("contactNumber") %> <%}%> <%if(abc.equals("english")){%>Contact Number<%}%></label>
            		</div>
            		<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
    					<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-phone"></i>
							</span>
             				 <input id="contactNo" maxlength="10" name="contactNo" placeholder="Contact Number" class="form-control input-md " type="text"  >
           				</div>
					</div>
          		</div>
          	</div>
         
          	<div class="row">
          		<div class="form-group">  	
                	<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
                	   	<label class="control-label" for="landline"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("landlineNumber") %> <%}%> <%if(abc.equals("english")){%>Alternate Number<%}%></label>
            		</div>
            		<div class="col-lg-3 col-md-3 col-sm-8">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-earphone"></i>
							</span>
              				<input id="landline" name="landline" placeholder="Alternate No" class="form-control input-md " type="text"  >
            			</div> 
            		</div>
            		<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">	
            			<label class="control-label" for="emailId"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("email") %> <%}%> <%if(abc.equals("english")){%>Email Id<%}%></label>
	            	</div>
	            	<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-envelope"></i>
							</span>
	              			<input id="emailId" name="emailId" placeholder="Email ID" class="form-control input-md " type="text">
	            		</div>
	            	</div>
          		</div>
          	</div>
        
        <div class="row">          
			<div class="form-group">
           		<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
           			<label class="control-label" for="city"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("city") %> <%}%> <%if(abc.equals("english")){%>City<%}%></label>
           		</div>
           		<div class="col-lg-3 col-md-3 col-sm-8">
					<div class="input-group">
						<span class="input-group-addon">
							<i class="glyphicon glyphicon-map-marker"></i>
						</span>
 			            <input id="city" name="city" placeholder="City" class="form-control input-md " type="text">
            		</div>
				</div>
        		<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">
        			<label class="control-label" for="tinNo"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("tin") %> <%}%> <%if(abc.equals("english")){%>GST No<%}%></label>
            	</div>	
            	<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
		  			<div class="input-group">
						<span class="input-group-addon">
							<span class="glyphicon nogyphicon">No</span>
						</span>
              			<input id="tinNo" name="tinNo" placeholder="GST No" class="form-control input-md "  type="text">
           			</div>
           		 </div>
        	</div>
        </div>

		<div class="row">
			<div class="form-group">
	            <div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">	
	           		<label class="control-label" for="address"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("address") %> <%}%> <%if(abc.equals("english")){%>Address<%}%></label>
	           	</div>	
	           	<div class="col-lg-3 col-md-3 col-sm-8">
					<div class="input-group">
						<span class="input-group-addon">
							<i class="glyphicon glyphicon-map-marker"></i>
						</span>
	 			           <input id="address" name="address" placeholder="Address" class="form-control input-md " type="text">
	            	</div>
				</div>
			</div>
        </div>
     	
     	</div>
     </fieldset>
         </form>      	
          <div class="row buttons-margin" align="center">
              	<input type="button" id="save" name="btn" class="btn btn-large btn-success button-height-width" value="Update" onclick="updateSupplierDetails()"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("Update") %> <%}%> <%if(abc.equals("english")){%><%}%>
              	<button class="btn btn-large btn-danger button-height-width" type="reset"  onclick="reset()"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("cancel") %> <%}%> <%if(abc.equals("english")){%>Cancel<%}%>  </button>
            	<input type="button" value="Back" id="listBtn" class="btn btn-primary" onclick="Back()" /> 
            
          </div>
          
          
        </div>
</div>
</body>
<jsp:include page="commons/footer.jsp"></jsp:include>