
<%@page import="com.Fertilizer.hibernate.CustomerDetailsBean"%>
<%@page import="com.Fertilizer.dao.CustomerDetailsDao"%>
<%@page import="com.Fertilizer.utility.PropertiesHelper"%>
<%@page import="com.Fertilizer.utility.HibernateUtility"%>
<%@page import=" java.util.*"%>
<%boolean isHome = false;
%>
 
<head>
<meta charset="utf-8">
<script type="text/javascript" src="/Shop/staticContent/js/jquery-1.12.3.min.js"></script>
<script type="text/javascript"  src="/Shop/staticContent/js/bootstrap.min.js"></script>
<link rel="stylesheet" href="/Shop/staticContent/css/bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="/Shop/staticContent/y_css/style.css" />
<script type="text/javascript" src="/Shop/staticContent/js/bootstrap.js"></script>
<script type="text/javascript" src="/Shop/staticContent/js/bootbox.min.js"></script>
<script type="text/javascript" src="/Shop/staticContent/js/customerDetails.js"></script>

<script type="text/javascript">
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

function cancle(){
	
	window.close();
}     		 
</script>
          		
  <style>
.btn-default,.btn-primary,.btn-success,.btn-info,.btn-warning,.btn-danger
 {
    border-radius:23px;
}
</style>
</head>

<!-- <div class="row header_margin_top"> -->
<div class="row">
			    <div align="center">
			  		<h2 class="form-name style_heading"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("customerdetails") %> <%}%> 
			  		<%if(abc.equals("english")){%>Customer Details <%}%> </h2>
			  	</div>			 
    </div>    
     <div class="row">
		     <div class="col-sm-offset-1 col-md-10">
				  		<hr style="border-top-color:#c1b1b1;">
		     </div>	
    </div>
	<div class="container col-sm-offset-1" >
        <form class="form-horizontal" method="post" action="" name="cstd" id="cstd"><!-- Value of 'name' attribute is used in customerDetails.js  -->
          <fieldset>
			<div class="row form-group">
           	 		<div class="col-md-6">
              			<%@include file="commons/clock.jsp" %>
           		 	</div>
			</div>
			 <div class="row form-group">
           		<label class="col-md-2 control-label" for="firstName"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("firstName") %> <%}%>
           		 <%if(abc.equals("english")){%>First Name<%}%><sup>*</sup></label>  
           	 		<div class="col-md-3">
            			<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-user"></i>
							</span>
							<%
							CustomerDetailsDao dao1 = new CustomerDetailsDao();
           						List unitList =dao1.getAllCustomer(request);
							%>
							<input list="firstName_drop" id="firstName" placeholder="First Name" class="form-control">
						<datalist id="firstName_drop">
							<%
					           for(int i=0;i<unitList.size();i++){
					        	   CustomerDetailsBean bean1 =(CustomerDetailsBean)unitList.get(i);
							%>
						<option data-value="<%=bean1.getCustId()%>" value="<%=bean1.getFirstName()%>">
							<%
				      			}
				    		%>    	
            			</datalist>
            			</div>
           		 	</div>
           		 	
           		 <label class="col-md-2 control-label" for="address"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("address") %> <%}%> 
           		 <%if(abc.equals("english")){%>Address<%}%></label>  
	            	<div class="col-md-3 ">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-map-marker"></i>
							</span>
	              				<input id="address" name="address " placeholder="Address" class="form-control input-md" type="text" >
	            	   </div>
					</div>
					</div>
					</fieldset>
					</form>
					</div>
					
           			 <!-- <input type="hidden" id="middleName" value="" class="form-control"/>  -->
           
           	 <%-- 	<label class="col-md-2 control-label" for="middleName"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("middleName") %> <%}%> <%if(abc.equals("english")){%>Middle Name <%}%> </label>  
           			 <div class="col-md-3">
           				 <div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-user"></i></span>
							<%
							CustomerDetailsDao dao2 = new CustomerDetailsDao();
           						List middleList =dao2.getAllCustomer();
							%>
							<input list="middleName_drop" id="middleName"  class="form-control">
						<datalist id="middleName_drop">
							<%
					           for(int i=0;i<middleList.size();i++){
					        	   CustomerDetailsBean bean2 =(CustomerDetailsBean)middleList.get(i);
							%>
		
							<option data-value="<%=bean2.getCustId()%>" value="<%=bean2.getMiddleName()%>">
							<%
				      			}
				    		%>
			              	
            			</datalist>
            			</div>
           				 
					</div> --%>
		
			<!-- <input type="hidden" id="lastName" value="" class="form-control"/>  -->
			 
			<div class="container col-sm-offset-1" >
			<form class="form-horizontal" method="post" action="" name="cstd" id="cstd2">
			<fieldset>
			 <div class="row form-group"> 
			  
				<%-- <label class="col-md-2 control-label" for="lastName"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("lastName") %> <%}%> <%if(abc.equals("english")){%>Last Name<%}%><sup>*</sup></label>  
           	 		<div class="col-md-3">
           				  <div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-user"></i></span>
							<%
								CustomerDetailsDao dao3 = new CustomerDetailsDao();
           						List lastList =dao3.getAllCustomer();
							%>
							<input list="lastName_drop" id="lastName"  class="form-control">
						<datalist id="lastName_drop">
							<%
					           for(int i=0;i<lastList.size();i++){
					        	   CustomerDetailsBean bean3 =(CustomerDetailsBean)lastList.get(i);
							%>
		
							<option data-value="<%=bean3.getCustId()%>" value="<%=bean3.getLastName()%>">
							<%
				      			}
				    		%>
			              	
            			</datalist>
            			</div>
           			 </div> --%>
        
				 <label class="col-md-2 control-label" for="lastName"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("lastName") %> <%}%> 
				 <%if(abc.equals("english")){%>Last Name<%}%><sup>*</sup></label>  
           	 		<div class="col-md-3">
           				  <div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-user"></i></span>
           		 	
           		 	<input id="lastName" name="LastName" placeholder="LastName" class="form-control input-md" >
           		 	</div>
           			 </div>
           			 	  
				<label class="col-md-2 control-label" for="contactNo"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("contactNumber") %> <%}%> 
				<%if(abc.equals("english")){%>Contact No.<%}%></label>  
           	 		<div class="col-md-3 ">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-earphone"></i>
							</span>
              					<input id="contactNo" name="contactNo" placeholder="10 Digit Contact No." class="form-control input-md" type="text" maxlength="10" >
           				 </div>
           			</div>
           		</div>
           			   </fieldset>
           			   </form>
           			   </div>
           	
			<%-- <div class="row form-group">
				<label class="col-md-2 control-label" for="contactNo"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("contactNumber") %> <%}%> <%if(abc.equals("english")){%>Contact No.<%}%></label>  
           	 		<div class="col-md-3 ">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-earphone"></i>
							</span>
              					<input id="contactNo" name="contactNo" placeholder="10 Digit Contact No." class="form-control input-md" type="number" >
           				 </div>
           			</div> --%>
           			<div class="container col-sm-offset-1" >
           			<form class="form-horizontal" method="post" action="" name="cstd" id="cstd3">
			        <fieldset>
			  
           			 <div class="row form-group">
           			<label class="col-md-2 control-label" for="gstno"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("gst number") %> <%}%> 
           			<%if(abc.equals("english")){%>GST No.<%}%></label>  
	            	<div class="col-md-3 ">
						<div class="input-group">
							<span class="input-group-addon">
								No
							</span>
	              				<input id="gstno" name="gstno " placeholder="GST Number" class="form-control input-md" type="text" >
	            		</div>
					</div>
					
				 <label class="col-md-2 control-label" for="emailId"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("email") %> 
				 <%}%> <%if(abc.equals("english")){%>Email ID<%}%> </label>  
            	<div class="col-md-3 ">
					<div class="input-group">
						<span class="input-group-addon">
							<i class="glyphicon glyphicon-envelope"></i>
						</span>
             				 <input id="emailId" name="emailId " placeholder="Email ID" class="form-control input-md" type="text">
            		</div>
				</div>
				</div>
			    </fieldset>
			    </form>
				</div>
            	
            	<%-- <label class="col-md-2 control-label" for="aadharNo"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("aadhar") %> <%}%> <%if(abc.equals("english")){%>Aadhar No.<%}%><sup>*</sup></label>  
           	 		<div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon">
								No.
							</span>
              				<input id="aadharNo" name="aadharNo" placeholder="12 Digit Aadhar No." class="form-control input-md" type="text" >
            			</div>
            		</div> --%>
            
			<%-- <div class="row form-group">
				 <label class="col-md-2 control-label" for="emailId"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("email") %> <%}%> <%if(abc.equals("english")){%>Email ID<%}%> </label>  
            	<div class="col-md-3 ">
					<div class="input-group">
						<span class="input-group-addon">
							<i class="glyphicon glyphicon-envelope"></i>
						</span>
             				 <input id="emailId" name="emailId " placeholder="Email ID" class="form-control input-md" type="text">
            		</div>
				</div> --%>
				<div class="container col-sm-offset-1" >
				<form class="form-horizontal" method="post" action="" name="cstd" id="cstd4">
			        <fieldset>
				 <div class="row form-group">
				<label class="col-md-2 control-label" for="zipCode"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("pinCode") %> <%}%> 
				<%if(abc.equals("english")){%>Zip Code<%}%></label>  
           		 <div class="col-md-3">
					<div class="input-group">
						<span class="input-group-addon">
							No
						</span>
              				<input id="zipCode" name="zipCode" placeholder="6 Digit Zip code" class="form-control input-md" type="number">
            		</div>
            	</div>
            	</div>
				</fieldset>
				</form>
			</div>	
			
 		<div class="form-group row">
            <div class="col-md-6 text-center col-md-offset-3">
            <!--  "customerDetails()" function is implemented in customerDetails.js  -->
				<%-- <button id="save" name="btn" class="btn btn-large btn-success glyphicon glyphicon-save  button-height-width"  onclick="customerDetails()"><h4><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("submit") %> <%}%> <%if(abc.equals("english")){%>Submit<%}%> </h4></button>
              	<button class="btn btn-large btn-danger  button-height-width" type="reset"  onclick="reset()"><h4><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("cancel") %> <%}%> <%if(abc.equals("english")){%>Cancel<%}%> </h4> </button> --%>
              	              	
              	<input type="button" id="save1" name="btn" style="font-size: 25;width: 128px; height: 53px;" class="btn btn-large btn-success button-height-width" onclick="customerDetails()" value="Submit">
              	<input type="reset"  id="save"  name="btn" style="font-size: 25;width: 128px; height: 53px;" class="btn btn-large btn-danger  button-height-width" onclick="cancle()" value="Cancel">              	
             		            
            </div>
         </div>
     
     <jsp:include page="commons/footer.jsp"></jsp:include>