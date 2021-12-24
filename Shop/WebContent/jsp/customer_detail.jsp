
<%@page import="com.Fertilizer.hibernate.CustomerDetailsBean"%>
<%@page import="com.Fertilizer.dao.CustomerDetailsDao"%>
<%boolean isHome = false;
%>
<%@include file="commons/header.jsp"%>
 
<head>
<meta charset="utf-8">
<script type="text/javascript" src="/Shop/staticContent/js/bootstrap.js"></script>
<script type="text/javascript" src="/Shop/staticContent/js/bootbox.min.js"></script>
 
<script type="text/javascript" src="/Shop/staticContent/js/customerDetails.js"></script>
<link rel="stylesheet" href="/Shop/staticContent/css/shopstyle.css">		
<script type="text/javascript">
 function Customerlist()
 {
 	 window.location = "creditCustomerList.jsp";
 }
 function editCustomer()
 {
	 window.location = "editCreditCustomerDetails.jsp";
 }
 function pay()
 {
 	 window.location = "allPaymentWithLeftTabs.jsp";
 }

</script>
</head>
<body>
<div class="container-fluid">
<div class="row header_margin_top">
    <div align="center">
  		<h2 class="form-name style_heading"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("customerdetails") %> <%}%> <%if(abc.equals("english")){%>Credit Customer Details <%}%> </h2>
  	</div>
</div>
     <div class="row" align="center">
	     <div class="hr-width">
			  <hr class="style-one">
	     </div>	
    </div>
	<div class="container">
        <form class="form-horizontal" method="post" action="" name="cstd" id="cstd">    <!-- Value of 'name' attribute is used in customerDetails.js  -->
          <fieldset>
          <div class="shopform-margin">
			<div class="row form-group">
           	 		<div class="col-md-6">
              			<%@include file="commons/clock.jsp" %>
           		 	</div>
			</div>
			 <div class="row">
			 	 <div class="form-group">	
           			<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
           				<label class="control-label" for="firstName"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("firstName") %> <%}%> <%if(abc.equals("english")){%>First Name<%}%><sup>*</sup></label>  
           	 		</div>
           	 		<div class="col-lg-3 col-md-3 col-sm-8">
            			<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-user"></i>
							</span>
							<input type="text" id="firstName"  class="form-control" placeholder="Enter First Name">
						</div>
           		 	</div>
           		 	<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">
           		 		<label class="control-label" for="middleName"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("middleName") %> <%}%> <%if(abc.equals("english")){%>Middle Name<%}%></label>  
	            	</div>
	            	<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-user"></i>
							</span>
	              				<input id="middleName" name="middleName" placeholder="Enter Middle Name" class="form-control input-md" type="text" >
	            		</div>
					</div>
				</div>
			</div>
			
			 <div class="row">
           		<div class="form-group">	
           			<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
           				<label class="control-label" for="lastName"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("lastName") %> <%}%> <%if(abc.equals("english")){%>Last Name<%}%><sup>*</sup></label>  
           	 		</div>
           	 		<div class="col-lg-3 col-md-3 col-sm-8">
            			<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-user"></i>
							</span>
							<input type="text" id="lastName"  class="form-control" placeholder="Enter Last Name">
						</div>
           		 	</div>
           		 	<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">
           		 		<label class="control-label" for="address"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("address") %> <%}%> <%if(abc.equals("english")){%>Address<%}%></label>  
	            	</div>
	            	<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-map-marker"></i>
							</span>
	              			<input id="address" name="address " placeholder="Address" class="form-control input-md" type="text" >
	            		</div>
					</div>
				</div>
			</div>
						
			<div class="row">
				<div class="form-group">
					<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">	
						<label class="control-label" for="firmname"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("firmname") %> <%}%> <%if(abc.equals("english")){%>Firm Name<%}%> </label>  
            		</div>
            		<div class="col-lg-3 col-md-3 col-sm-8">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-user"></i>
							</span>
             				<input id="firmname" name="firmname " placeholder="Firm Name" class="form-control input-md" type="text">
            			</div>
					</div>
					<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">	
						<label class="control-label" for="contactNo"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("contactNumber") %> <%}%> <%if(abc.equals("english")){%>Contact No.<%}%><sup>*</sup></label>  
           	 		</div>
           	 		<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-earphone"></i>
							</span>
              				<input id="contactNo" name="contactNo" maxlength="10" placeholder="10 Digit Contact No." class="form-control input-md" type="text" >
           				 </div>
           			</div>
				</div>
			</div>
			
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
              	</div>
			</div>
			
			<div class="row">
				<div class="form-group">
					 <div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
					 	<label class="control-label" for="zipCode"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("pinCode") %> <%}%> <%if(abc.equals("english")){%>Zip Code<%}%></label>  
	           		 </div>
	           		 <div class="col-lg-3 col-md-3 col-sm-8">
						<div class="input-group">
							<span class="input-group-addon">
								<span class="glyphicon nogyphicon">No</span>
							</span>
	              			<input id="zipCode" name="zipCode" placeholder="6 Digit Zip code" class="form-control input-md" type="text" maxlength="6">
	            		</div>
	            	</div>
	            </div>
			</div>
 		
 		</div>
 	</fieldset>
  </form>	
 		
 		<div class="row buttons-margin" align="center">                                	
        	<input type="button" id="save1" name="btn" class="btn btn-large btn-success button-height-width" onclick="customerDetails()" value="Submit">
            <input type="button" id="save" name="btn" class="btn btn-large btn-danger  button-height-width" type="reset"  onclick="reset()" value="Cancel">
            <input type="button" value="List" id="listBtn" class="btn btn-primary" onclick="Customerlist()" /> 
            <input type="button" value="Edit" id="listBtn" class="btn btn-primary" onclick="editCustomer()" /> 
   	        <input id="save" name="btn" class="btn btn-primary" type="button" onclick="pay()" value="Payment">        		            
        </div>
	
</div>
</div>
</body>    
<jsp:include page="commons/footer.jsp"></jsp:include>