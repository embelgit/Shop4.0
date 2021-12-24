

<%@page import="com.Fertilizer.hibernate.EmployeeDetailsBean"%>
<%boolean isHome = false;%>
<%@include file="commons/header.jsp"%>
 <%@page import="com.Fertilizer.dao.EmployeeDetailsDao" %>

<%@page import="java.util.List"%>
<head> 
	<meta charset="utf-8">
	<script type="text/javascript" src="/Shop/staticContent/js/bootstrap.js"></script>
 	<script type="text/javascript" src="/Shop/staticContent/js/bootbox.min.js"></script>
	<script type="text/javascript" src="/Shop/staticContent/js/employeeDetails.js"></script>
<link rel="stylesheet" href="/Shop/staticContent/css/shopstyle.css">
	<script type="text/javascript">
          		 function employeelist()
          		 {
          		 	window.location = "employeeList.jsp";
          		 }
          		 function editEmployee() {
          			 window.location = "editEmployeeDetails.jsp";
				}
          		</script>

</head>
<body>
<div class="container-fluid">
  	<div class="row header_margin_top">
			    <div align="center">
			  		<h2 class="form-name style_heading">Employee Details</h2>
			  	</div>
			 
    </div>
    <div class="row" align="center">
	    <div class="hr-width">
	  		<hr class="style-one">
	    </div>	
    </div>
    
    <div class="container">
        <form class="form-horizontal" method="post" action="" name="empd"><!-- Value of 'name' attribute is used in employeeDetails.js  -->
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
           				<label class="control-label" for="firstName">First Name<sup>*</sup></label>  
		           	</div>
		           	<div class="col-lg-3 col-md-3 col-sm-8">
            			<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-user"></i>
							</span>
              				
							<%
							EmployeeDetailsDao cdd = new EmployeeDetailsDao();
           						List cList =cdd.getAllMainEmployee();
							
							%>
							<input list="firstName_drop" id="firstName" placeholder="First Name" class="form-control">
							<datalist id="firstName_drop">
							<%
					           for(int i=0;i<cList.size();i++){
					        	   EmployeeDetailsBean cat=(EmployeeDetailsBean)cList.get(i);
							%>
		
								<option data-value="<%=cat.getEmpId()%>" value="<%=cat.getFirstName()%>">
							<%
				      			}
				    		%>
			              	
            				</datalist>
            			</div>
            		</div>
            	
				<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">
            		<label class="control-label" for="middleName"> Middle Name<sup>*</sup></label>  
            	</div>	
            	<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
            		<div class="input-group">
						<span class="input-group-addon">
							<i class="glyphicon glyphicon-user"></i>
						</span>
              				
							<%
							EmployeeDetailsDao cdd1 = new EmployeeDetailsDao();
           						List cList1 =cdd1.getAllMainEmployee();
							
							%>
							<input list="middleName_drop" id="middleName" placeholder="Middle Name" class="form-control">
							<datalist id="middleName_drop">
							<%
					           for(int i=0;i<cList1.size();i++){
					        	   EmployeeDetailsBean cat1=(EmployeeDetailsBean)cList1.get(i);
							%>
		
								<option data-value="<%=cat1.getEmpId()%>" value="<%=cat1.getMiddleName()%>">
							<%
				      			}
				    		%>
			              	
            				</datalist>
            			</div>
					</div>
				</div>
			</div>
		
			
			<div class="row">
				<div class="form-group">		
					<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
						<label class="control-label" for="lastName">Last Name<sup>*</sup></label>  
           	 		</div>
           	 		<div class="col-lg-3 col-md-3 col-sm-8">
            			<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-user"></i>
							</span>
              				
							<%
							EmployeeDetailsDao cdd11 = new EmployeeDetailsDao();
           						List cList11 =cdd11.getAllMainEmployee();
							
							%>
							<input list="lastName_drop" id="lastName" placeholder="Last Name" class="form-control">
							<datalist id="lastName_drop">
							<%
					           for(int i=0;i<cList11.size();i++){
					        	   EmployeeDetailsBean cat11=(EmployeeDetailsBean)cList11.get(i);
							%>
		
								<option data-value="<%=cat11.getEmpId()%>" value="<%=cat11.getLastName()%>">
							<%
				      			}
				    		%>
			              	
            				</datalist>
            			</div>
            		</div>
					<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">
	           			<label class="control-label" for="joiningDate">Joining Date<sup>*</sup></label>  
           	 		</div>
	           	 	<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-calendar"></i>
							</span>
	              			<input id="joiningDate"  name="joiningDate" placeholder="Joining Date" class="form-control input-md" type="date" >
	            		</div>
	            	</div>
	            </div>
			</div>
           
           <div class="row">
           		<div class="form-group">
           			<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">	
           				<label class="control-label" for="emailId"> Email ID</label>  
           			</div>
	           		<div class="col-lg-3 col-md-3 col-sm-8">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-envelope"></i>
							</span>
	              			<input id="emailId" name="emailId " placeholder="Email ID" class="form-control input-md" type="text">
	            		</div>
					</div>
					<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">
						<label class="control-label" for="salary">Salary<sup>*</sup></label>  
           	 		</div>
           	 		<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
						<div class="input-group">
							<span class="input-group-addon">
								<span class="glyphicon nogyphicon">Rs</span>
							</span>
	              			<input id="salary" name="salary" placeholder="Salary" class="form-control input-md" type="text">
	            		</div>
            		</div>
				</div>
			</div>

			<div class="row">
           		<div class="form-group">
           			<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
           				<label class="control-label" for="contactNo">Contact No.<sup>*</sup></label>  
           	 		</div>
           	 		<div class="col-lg-3 col-md-3 col-sm-8">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-earphone"></i>
							</span>
              				<input id="contactNo" name="contactNo" placeholder="Contact No." class="form-control input-md" type="text" maxlength="10">
            			</div>
            		</div>
			        <div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">   	
			           	<label class="control-label" for="address">Address<sup>*</sup></label>  
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
						<label class="control-label" for="zipCode">Zip code<sup>*</sup></label>  
           			 </div>
           			 <div class="col-lg-3 col-md-3 col-sm-8">
						<div class="input-group">
							<span class="input-group-addon">
								<span class="glyphicon nogyphicon">No</span>
							</span>
              				<input id="zipCode" name="zipCode" placeholder="Zip code" class="form-control input-md" type="text" maxlength="6">
            			</div>
            		</div>
            		<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">
						<label class="control-label" for="adhaarNumber">Adhaar Number<sup>*</sup></label>  
           			</div>
           			<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
						<div class="input-group">
							<span class="input-group-addon">
								<span class="glyphicon nogyphicon">No</span>
							</span>
              				<input id="adhaarNumber" name="adhaarNumber" placeholder="Adhaar Number" class="form-control input-md" type="text" maxlength="12">
            			</div>
            		</div>
            	</div> 
			</div>
		
		</div>	
	</fieldset>
      </form>		
 			
 			<div class="row buttons-margin" align="center">
              	<!--  "employeedetails()" function is implemented in employeeDetails.js  -->
    	         	 <input type="button" id="save" name="btn" class="btn btn-success" onclick="employeedetails()" value="Submit">
	           		 <input id="save" name="btn" class="btn btn-danger" type="reset" onclick="reset()" value="Cancel">
    	          	 <input type="button" value="List" id="listBtn" class="btn btn-primary" onclick="employeelist()" /> 
              	     <input type="button" value="Edit" id="listBtn" class="btn btn-primary" onclick="editEmployee()" /> 
    	          	
    	          	<!-- <button id="save" name="btn" class="btn btn-large btn-success glyphicon glyphicon-save  button-height-width"  onclick="employeedetails()"><h4> Submit</h4></button>
              		<button class="btn btn-large btn-danger glyphicon glyphicon-remove-circle  button-height-width" type="reset"  onclick="reset()"><h4> Cancel</h4> </button> -->
        	</div>

		
    </div>
</div>
</body>   
<jsp:include page="commons/footer.jsp"></jsp:include>