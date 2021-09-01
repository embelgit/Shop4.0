<%@page import="com.Fertilizer.dao.UserDetailsDao"%>
<%@page import="com.Fertilizer.hibernate.shopDetailsBean"%>


<%boolean isHome = false;%>
<%@include file="commons/header.jsp"%>
 <%@page import="com.Fertilizer.dao.EmployeeDetailsDao" %>

<%@page import="java.util.List"%>
<head> 
	<meta charset="utf-8">
	<script type="text/javascript" src="/Shop/staticContent/js/bootstrap.js"></script>
   	 <script type="text/javascript" src="/Shop/staticContent/js/bootbox.min.js"></script>
	<script type="text/javascript" src="/Shop/staticContent/js/userDetails.js"></script>
	
	<script type="text/javascript">
	
  			function Back()
  			{
  				window.location = "userDetails.jsp" ;
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
			  		<h2 class="form-name style_heading">Edit User Details</h2>
			  	</div>
			 
    </div>
     <div class="row">
		     <div class="col-sm-offset-1 col-md-10">
				  		<hr style="border-top-color:#c1b1b1;">
		     </div>	
    </div>
      <div class="container col-sm-offset-2" >
        <form class="form-horizontal" method="post" action="" name="user1">
          <fieldset>
       			 <div class="row form-group">
    	     	
           				 <label class="col-md-2 control-label" for="user">User Name</label>  
          					  <div class="col-md-3">
								<div class="input-group">
									<span class="input-group-addon">
										<i class="glyphicon glyphicon-list-alt"></i>
									</span>
							
							 <%
								UserDetailsDao eedd = new UserDetailsDao();
           						List mList =eedd.getAllMainUser();
							%>
						<input list="user_drop" id="user" placeholder="Select User Name" class="form-control" onchange="getUserDetails()" autofocus="">
				<datalist id="user_drop">
							
							<%
					           for(int i=0;i<mList.size();i++){
					        	   UserDetailsBean detailsBean =(UserDetailsBean)mList.get(i);
							%>
		
						<option data-value="<%=detailsBean.getUsrId()%>"><%=detailsBean.getFirstName()%> <%=detailsBean.getLastName()%> </option>
							<%
				      			}
				    		%>
						</datalist> 
					</div>
           		</div>	
           		</div>
       		<div class="row form-group">
           		<label class="col-md-2 control-label" for="firstName">First Name<sup>*</sup></label>  
		           	 <div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-user"></i>
							</span>
              				<input id="firstName" name="firstName" placeholder="First Name" class="form-control input-md" type="text" >
            			</div>
            		</div>

            	<label class="col-md-2 control-label" for="lastName">Last Name<sup>*</sup></label>  
            		<div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-user"></i>
							</span>
              					<input id="lastName" name="lastName" placeholder="Last Name" class="form-control input-md" type="text">
            			</div>
					</div>
			</div>
			
			 <div class="row form-group">
				<label class="col-md-2 control-label" for="contactNumber">Contact No<sup>*</sup></label>  
           	 		<div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon">
								No
							</span>
              				<input id="contactNumber" name="contactNumber" placeholder="Contact No" class="form-control input-md" type="text" maxlength="10" >
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
           	<label class="col-md-2 control-label" for="userName">Username</label>  
           		<div class="col-md-3">
					<div class="input-group">
						<span class="input-group-addon">
								<i class="glyphicon glyphicon-user"></i>
						</span>
              			<input id="userName" name="userName " placeholder="Username" class="form-control input-md" type="text" >
            		</div>
				</div>
			
			<label class="col-md-2 control-label" for="passWord">Password</label>  
           	 	<div class="col-md-3">
					<div class="input-group">
						<span class="input-group-addon">
							<i class="glyphicon glyphicon-hand-right"></i>
						</span>
              			<input id="passWord" name="passWord" placeholder="Password" class="form-control input-md" type="text" >
            		</div>
            	</div>
			</div>

			<div class="row form-group">
           		<label class="col-md-2 control-label" for="repassWord">Re-Password<sup>*</sup></label>  
           	 		<div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-hand-right"></i>
							</span>
              				<input id="repassWord" name="repassWord" placeholder="Re-Password" class="form-control input-md" type="text" autofocus onchange="validatePassword1()">
            			</div>
            		</div> 
            		
            		<label class="col-md-2 control-label" for="city">City<sup>*</sup></label>  
           	 		<div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-map-marker"></i>
							</span>
              				<input id="city" name="city" placeholder="City" class="form-control input-md" type="text" >
            			</div>
            		</div>           
			</div>
			
			<div class="row form-group">
           		<label class="col-md-2 control-label" for="panNo">PAN No<sup>*</sup></label>  
           	 		<div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon">
								No
							</span>
              				<input id="panNo" name="panNo" placeholder="PAN Number" class="form-control input-md" type="text" >
            			</div>
            		</div>             		         
			</div>
								
 			<div class="form-group row" style="padding-top:2%">
            	<div class="col-md-10 text-center">
            	
            	  	<input style="height: 53px; width: 128; font-size: 25" type="button" id="save"    class="btn btn-large btn-success" name="btn1" onclick="updateuserDetails()" value="Submit">
		            <input style="height: 53px; width: 128; font-size: 25" type="reset"  id="save1"   class="btn btn-large btn-danger"  name="btn2" onclick="reset()" value="Cancel">
		     	    <input style="height: 53px; width: 128; font-size: 25" type="button" id="listBtn" class="btn btn-primary"           name="btn3" onclick="Back()" value="Back" />
		     	                	
            	</div>
          	</div>


		</fieldset>
      </form>
    </div>
    
<jsp:include page="commons/footer.jsp"></jsp:include>