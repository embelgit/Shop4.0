<%@page import="com.Fertilizer.hibernate.CustomerDetailsBean"%>
<%@page import="com.Fertilizer.dao.CustomerDetailsDao"%>
<%boolean isHome = false;
%>
<%@include file="commons/header.jsp"%>
<head>

	 <script type="text/javascript" src="/Shop/staticContent/js/jquery-1.12.3.min.js"></script>
	 <link rel="stylesheet" href="/Shop/staticContent/css/jquery-ui.min.css">
     <link rel="stylesheet" href="/Shop/staticContent/css/ui.jqgrid.min.css">
     <link rel="stylesheet" href="/Shop/staticContent/y_css/jquery-ui.css">
     <link rel="stylesheet" href="/Shop/staticContent/css/ui.jqgrid.css">
     <script type="text/javascript" src="/Shop/staticContent/js/jquery.min.js"></script>
   	 <script type="text/javascript" src="/Shop/staticContent/js/bootstrap.js"></script>
   	 <script type="text/javascript" src="/Shop/staticContent/js/bootbox.min.js"></script>
   	<!--  <script type="text/javascript" src="/Shop/staticContent/js/jquery-ui-min.js"></script> -->
   	 <script type="text/javascript" src="/Shop/staticContent/js/jquery-ui.min.js"></script>
     <script type="text/javascript" src="/Shop/staticContent/js/jquery-ui.js"></script>
     <script type="text/javascript" src="/Shop/staticContent/js/jqueryUi.js"></script>
     <script type="text/javascript" src="/Shop/staticContent/js/jquery.jqgrid.min.js"></script>


<script type="text/javascript" src="/Shop/staticContent/js/customerDetails.js"></script>
<link rel="stylesheet" href="/Shop/staticContent/css/shopstyle.css"> 

 	<script type="text/javascript">
  			function Back()
  			{
  				window.location = "customer_detail.jsp" ;
  			}
  			
  			
  		</script>

</head>
<body>
<div class="container-fluid">
<div class="row header_margin_top">
			    <div align="center">
			  		<h2 class="form-name style_heading"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("customerdetails") %> <%}%> <%if(abc.equals("english")){%>Edit Credit Customer Details <%}%> </h2>
			  	</div>
			 
    </div>
    <div class="row" align="center">
		<div class="hr-width">
			<hr class="style-one">
		</div>	
    </div>
	<div class="container">
		<!-- <form class="form-horizontal" method="post" action="" name="cstd1">Value of 'name' attribute is used in customerDetails.js  -->
		<form class="form-horizontal" action="" name="cstd1"><!-- Value of 'name' attribute is used in customerDetails.js  -->
          <fieldset>
				    <div class="row">
				    	<div class="form-group">
           				 	<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
           				 		<label class="control-label" for="customerName">Customer Name:<sup>*</sup></label>  
          					 </div>
          					 <div class="col-lg-3 col-md-3 col-sm-8">
								<div class="input-group">
									<span class="input-group-addon">
										<i class="glyphicon glyphicon-user"></i>
									</span>
						
							<%
								CustomerDetailsDao cdd = new CustomerDetailsDao();
           						List cList =cdd.getAllCustomer(request);
							
							%>
									<input list="cust_drop" id="creditCustomer"  placeholder="Select Customer Name" onchange="getCustomerDetails()" class="form-control">
									<datalist id="cust_drop">
							
							<%
					           for(int i=0;i<cList.size();i++){
					        	   CustomerDetailsBean cust =(CustomerDetailsBean)cList.get(i);
							%>
		
										<option data-value="<%=cust.getCustId()%>">
								<%=cust.getFirstName()%> <%=cust.getLastName()%></option>
								
								
							<%
				      			}
				    		%>
									</datalist> 
								</div>
       						</div>
       						<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">
       							<label class="control-label" for="firstName"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("firstName") %> <%}%> <%if(abc.equals("english")){%>First Name<%}%></label>  
           	 				</div>
           	 				<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
            					<div class="input-group">
									<span class="input-group-addon">
										<i class="glyphicon glyphicon-user"></i>
									</span>
									<input type="text" id="firstName" class="form-control" placeholder="Enter First Name">
								</div>
           		 			</div>	
       				</div>
				</div>


			<div class="row">
           		<div class="form-group">
	           		<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">		
	           			<label class="control-label" for="middleName"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("middleName") %> <%}%> <%if(abc.equals("english")){%>Middle Name<%}%></label>  
		            </div>	
		            <div class="col-lg-3 col-md-3 col-sm-8">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-user"></i>
							</span>
		            		<input id="middleName" name="middleName" placeholder="Enter Middle Name" class="form-control input-md" type="text" >
		            	</div>
					</div>
					<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">	
						<label class="control-label" for="lastName"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("lastName") %> <%}%> <%if(abc.equals("english")){%>Last Name<%}%></label>  
	           	 	</div>	
	           	 	<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
	            		<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-user"></i>
							</span>
							<input type="text" id="lastName"  class="form-control" placeholder="Enter Last Name">
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
	              			<input id="address" name="address " placeholder="Address" class="form-control input-md" type="text" >
	            		</div>
					</div>
					<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">
						<label class="control-label" for="contactNo"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("contactNumber") %> <%}%> <%if(abc.equals("english")){%>Contact No.<%}%></label>  
           	 		</div>
           	 		<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-earphone"></i>
							</span>
              				<input id="contactNo" name="contactNo" maxlength="10" placeholder="Contact No." class="form-control input-md" type="text" >
           				</div>
           			</div>
				</div>
			</div>


			
<%-- 			<div class="row form-group">
           		<label class="col-md-2 control-label" for="firstName"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("Name") %> <%}%> <%if(abc.equals("english")){%>Name<%}%><sup>*</sup></label>  
           	 		<div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-user"></i>
							</span>
              					<input id="firstName" name="firstName" placeholder="Name" class="form-control input-md" type="text">
            			</div>
           		 	</div>
           		 	
           		 					<label class="col-md-2 control-label" for="address"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("address") %> <%}%> <%if(abc.equals("english")){%>Address<%}%></label>  
	            	<div class="col-md-3 ">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-map-marker"></i>
							</span>
	              				<input id="address" name="address " placeholder="Address" class="form-control input-md" type="text" >
	            		</div>
					</div>

           
           	 	<label class="col-md-2 control-label" for="middleName"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("middleName") %> <%}%> <%if(abc.equals("english")){%>Middle Name <%}%></label>  
           			 <div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-user"></i>
							</span>
             					 <input id="middleName" name="middleName" placeholder="Middle Name" class="form-control input-md" type="text" >
           				 </div>
					</div>
			</div> --%>
			
			
				<%-- <label class="col-md-2 control-label" for="lastName"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("lastName") %> <%}%> <%if(abc.equals("english")){%>Last Name<%}%><sup>*</sup></label>  
           	 		<div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-user"></i>
							</span>
              					<input id="lastName" name="lastName" placeholder="Last Name" class="form-control input-md" type="text" >
           				 </div>
           			 </div> --%>
				
			
			<div class="row">
				<div class="form-group">
					<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
						<label class="control-label" for="gstno"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("gst number") %> <%}%> <%if(abc.equals("english")){%>GST No.<%}%></label>  
	            	</div>
	            	<div class="col-lg-3 col-md-3 col-sm-8">
						<div class="input-group">
							<span class="input-group-addon">
								<span class="glyphicon nogyphicon">No</span>
							</span>
	              			<input id="gstno" name="gstno " placeholder="GST Number" class="form-control input-md" type="text" >
	            		</div>
					</div>
					<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">
						<label class="control-label" for="emailId"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("email") %> <%}%> <%if(abc.equals("english")){%>Email ID<%}%> </label>  
            		</div>
            		<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-envelope"></i>
							</span>
	             			<input id="emailId" name="emailId " placeholder="Email ID" class="form-control input-md" type="text">
	            		</div>
					</div>
            	
            	<%-- <label class="col-md-2 control-label" for="aadharNo"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("aadhar") %> <%}%> <%if(abc.equals("english")){%>Aadhar No.<%}%><sup>*</sup></label>  
           	 		<div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon">
								No.
							</span>
              				<input id="aadharNo" name="aadharNo" placeholder="Aadhar No." class="form-control input-md" type="text" >
            			</div>
            		</div> --%>
            	</div>
			</div>

			<div class="row">
				<div class="form-group">
					<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
						<label class="control-label" for="zipCode"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("pinCode") %> <%}%> <%if(abc.equals("english")){%>Zip code<%}%></label>  
	           		</div>
	           		<div class="col-lg-3 col-md-3 col-sm-8">
						<div class="input-group">
							<span class="input-group-addon">
								<span class="glyphicon nogyphicon">No</span>
							</span>
	              			<input id="zipCode" name="zipCode" placeholder="Zip code" maxlength="6" class="form-control input-md" type="text" >
	            		</div>
	            	</div>
	            </div>
			</div>
		
			</fieldset>
		</form>
			
			<div class="row buttons-margin" align="center">           		
				<button id="updtbtn" name="updtbtn" class="btn btn-large btn-success" onclick="updateCustomerDetailsValidation()"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("submit") %> <%}%> <%if(abc.equals("english")){%>Update<%}%></button>
              	<button class="btn btn-large btn-danger" type="reset" onclick="reset()"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("cancel") %> <%}%> <%if(abc.equals("english")){%>Cancel<%}%></button>
				<input type="button" value="Back" id="listBtn" class="btn btn-primary" onclick="Back()" /> 			
			</div>
			
		
	</div>
	
</div>
</body>
<jsp:include page="commons/footer.jsp"></jsp:include>