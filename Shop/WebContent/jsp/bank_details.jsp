<%@page import="com.Fertilizer.hibernate.CustomerDetailsBean"%>
<%@page import="com.Fertilizer.dao.CustomerDetailsDao"%>
<%boolean isHome = false;
%>
<%@include file="commons/header.jsp"%>
 
<head>
<meta charset="utf-8">
 <script type="text/javascript" src="/Shop/staticContent/js/bootstrap.js"></script>
 <script type="text/javascript" src="/Shop/staticContent/js/bootbox.min.js"></script>
 
 <script type="text/javascript" src="/Shop/staticContent/js/bankDetails.js"></script>
<link rel="stylesheet" href="/Shop/staticContent/css/shopstyle.css">		
<script type="text/javascript">
 function BankList()
 {
 	 window.location = "bankDetailsList.jsp";
 }
 /* function editCustomer()
 {
	 window.location = "editCreditCustomerDetails.jsp";
 } */
</script>
</head>
<body>
<div class="container-fluid">
<div class="row header_margin_top">
    <div align="center">
  		<h2 class="form-name style_heading"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("bankdetails") %> <%}%> <%if(abc.equals("english")){%>Bank Details <%}%> </h2>
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
	           			<label class="control-label" for="bankName"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("bankName") %> <%}%> <%if(abc.equals("english")){%>Bank Name<%}%><sup>*</sup></label>  
	           	 	</div>	
           	 		<div class="col-lg-3 col-md-3 col-sm-8">
            			<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-list-alt"></i>
							</span>
							<input type="text" id="bankName" name="bankName" class="form-control" placeholder="Enter Bank Name">
						</div>
           		 	</div>           		 	
           		 	<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">
           		 		<label class="control-label" for="accountNo"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("accountNo") %> <%}%> <%if(abc.equals("english")){%>Account Number<%}%><sup>*</sup></label>  
	            	</div>
	            	<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
						<div class="input-group">
							<span class="input-group-addon">
								<span class="glyphicon nogyphicon">No</span>
							</span>
	              			<input type="text" id="accountNo" name="accountNo" class="form-control input-md" placeholder="Enter Account No">
	            		</div>
					</div>
				</div>
			</div>
			
			<div class="row">
	           	<div class="form-group">	
	           		<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
	           			<label class="control-label" for="ifscCode"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("ifscCode") %> <%}%> <%if(abc.equals("english")){%>IFSC Code<%}%></label>  
	           	 	</div>	
	           	 	<div class="col-lg-3 col-md-3 col-sm-8">
	            		<div class="input-group">
							<span class="input-group-addon">
								<span class="glyphicon nogyphicon">No</span>
							</span>
							<input type="text" id="ifscCode" name="ifscCode" class="form-control" placeholder="Enter IFSC Code">
						</div>
	           		</div>
	           		<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel"> 	
	           			<label class="control-label" for="branchName"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("branchName") %> <%}%> <%if(abc.equals("english")){%>Branch Name<%}%></label>  
		            </div>	
		            <div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-list-alt"></i>
							</span>
		            		<input id="branchName" name="branchName" placeholder="Branch Name" class="form-control input-md" type="text" >
		            	</div>
					</div>
				</div>
			</div>
			
			<div class="row">
				<div class="form-group">
					<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
						<label class="control-label" for="accountHolderName"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("accountHolderName") %> <%}%> <%if(abc.equals("english")){%>Account Holder Name<%}%></label>  
           	 		</div>
           	 		<div class="col-lg-3 col-md-3 col-sm-8">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-user"></i>
							</span>
              					<input id="accountHolderName" name="accountHolderName"  placeholder="Account Holder Name" class="form-control input-md" type="text" >
           				 </div>
           			</div>
           			<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">
           				<label class="control-label" for="contactNo"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("contactNo") %> <%}%> <%if(abc.equals("english")){%>Contact No.<%}%></label>  
					</div>	            	
	            	<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-earphone"></i>
							</span>
	              				<input id="contactNo" name="contactNo" placeholder="Contact Number" maxlength="10" class="form-control input-md" type="text" >
	            		</div>
					</div>
              	</div>
            </div>
              

			<div class="row">
				<div class="form-group">
					<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
						<label class="control-label" for="address"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("address") %> <%}%> <%if(abc.equals("english")){%>Address<%}%> </label>  
	            	</div>
	            	<div class="col-lg-3 col-md-3 col-sm-8">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-map-marker"></i>
							</span>
	             			<input id="address" name="address" placeholder="Address" class="form-control input-md" type="text">
	            		</div>
					</div>           	
				</div>	 
			</div>
 		
 			</div>
 		</fieldset>
  </form>
 		
 		<div class="row buttons-margin" align="center">        
        	<input type="button" id="save1" name="btn" class="btn btn-large btn-success button-height-width" onclick="bankDetailsValidate()" value="Submit">
            <input type="button" id="listBtn" value="List" class="btn btn-primary" onclick="BankList()" />
            <input type="button" id="save" name="btn" class="btn btn-large btn-danger button-height-width" type="reset" onclick="reset()" value="Cancel">
              	<!-- <input style=" height: 53px; width: 128px;font-size: 25" type="button" value="Edit" id="listBtn" class="btn btn-primary" onclick="editCustomer()" /> --> 
        </div>
	
	
</div>
</div>
</body>    
<jsp:include page="commons/footer.jsp"></jsp:include>