<%@page import="com.Fertilizer.dao.UserDetailsDao"%>
<%@page import="com.Fertilizer.utility.PropertiesHelper"%>
<%@page import="com.Fertilizer.hibernate.UserDetailsBean"%>
<%@page import="com.Fertilizer.helper.UserDetailsHelper"%>
<%@page import="com.Fertilizer.utility.HibernateUtility"%>
<%boolean isHome = false;%>
<%@include file="commons/header.jsp"%>
<head>
<%
         String name = "";
		if (session != null) {
			
			if (session.getAttribute("user") != null) {
			    name = (String) session.getAttribute("user");
				out.print("Hello, " + name );
				
				
			} else {
				
				response.sendRedirect("/Fertilizer/jsp/login.jsp");
			     out.println("Please Login ");
			}
		}
	%>
	<%
	
	   HibernateUtility hbu=HibernateUtility.getInstance();
	   Session session1=hbu.getHibernateSession();
	   
	   org.hibernate.Query query = session1.createQuery("from UserDetailsBean where userName =:name");
	   query.setParameter("name", name);
	   UserDetailsBean userDetail = (UserDetailsBean) query.uniqueResult();
	   String type = userDetail.getTypeId();
	   
	   
	%>
	<%
    
      if(type.equals("admin")){
    	  
     %>
<script type="text/javascript">
	    function ChooseContact(){
			//document.getElementById("buyPrice")(data.options[data.selectedIndex].getAttribute("myid"));
			//document.cat.categoryName.value == (data.options[data.selectedIndex].getAttribute("value"));
	
	        <%
	        UserDetailsHelper usrHelper = new UserDetailsHelper();
		   		List usrList = usrHelper.getAlluserName();
			%>
	
			<%
				for(int i=0;i<usrList.size();i++){
					UserDetailsBean usr = (UserDetailsBean)usrList.get(i);
    		%>

    		var value ="<%=usr.getUserName()%>";
				if(document.getElementById("userName").value == value)
					{
					    document.getElementById("btn").disabled = true;	
						alert("User Name Not Available..Plz Try Another Name!!!");
				        location.reload();
					}
   			<%
				}
    		%>
		}
	</script>


  	 <script type="text/javascript" src="/Shop/staticContent/js/bootstrap.js"></script>
   	 <script type="text/javascript" src="/Shop/staticContent/js/bootbox.min.js"></script>
     <script type="text/javascript" src="/Shop/staticContent/js/userDetails.js"></script>

	<script type="text/javascript">
          		 function userlist()
          		 {
          		 	window.location = "userList.jsp";
          		 }
          		 function editUser() {
          			 window.location = "editUserDetails.jsp";
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
			  		<h2 class="form-name style_heading">User Details</h2>
			  	</div>
			  	<div>
			  	
			  	       <%
								Long Userid = 1l;
						%>
						<%
						
							UserDetailsDao dao=new UserDetailsDao();
							List listtxid=dao.getUserId();
								

								for (int i = 0; i < listtxid.size(); i++) {
									
									UserDetailsBean bean=(UserDetailsBean) listtxid.get(i);
									Userid=bean.getUsrId();
									Userid++;
							 
							}  
						%>
						
						<div align="right">
								<h3 style="color: red; padding-right: 138px;">
								User ID ::
								<%
									out.println(Userid);
								%>
								</h3>
						</div>
				
					</div>
			 
    </div>
     <div class="row">
		     <div class="col-sm-offset-1 col-md-10">
				  		<hr style="border-top-color:#c1b1b1;">
		     </div>	
    </div>
      <div class="container col-sm-offset-2" >
        <form class="form-horizontal" method="post" action="" name="usd"><!-- Value of 'name' attribute is used in userDetails.js  -->
          <fieldset>
          		<div class="row form-group">
           	 		<div class="col-md-6">
              			<%@include file="commons/clock.jsp" %>
           		 	</div>
				</div>
			 <div class="row form-group">
           		<label class="col-md-2 control-label" for="firstName">First Name<sup>*</sup></label>  
		           	 <div class="col-md-3">
            			<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-user"></i>
							</span>
              				
							<%
							UserDetailsDao cdd11 = new UserDetailsDao();
           						List cList11 =cdd11.getAllUsers();
							
							%>
							<input list="firstName_drop" id="firstName" placeholder="First Name" class="form-control">
				<datalist id="firstName_drop">
							<%
					           for(int i=0;i<cList11.size();i++){
					        	   UserDetailsBean cat11=(UserDetailsBean)cList11.get(i);
							%>
		
							<option data-value="<%=cat11.getUsrId()%>" value="<%=cat11.getFirstName()%>">
							<%
				      			}
				    		%>
			              	
            			</datalist>
            			</div>
            		</div>

				<label class="col-md-2 control-label" for="lastName">Last Name<sup>*</sup></label>  
           	 		<div class="col-md-3">
            			<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-user"></i>
							</span>
              				
							<%
							UserDetailsDao cdd1 = new UserDetailsDao();
           						List cList1 =cdd1.getAllUsers();
							
							%>
							<input list="lastName_drop" id="lastName" placeholder="Last Name" class="form-control">
				<datalist id="lastName_drop">
							<%
					           for(int i=0;i<cList1.size();i++){
					        	   UserDetailsBean cat1=(UserDetailsBean)cList1.get(i);
							%>
		
							<option data-value="<%=cat1.getUsrId()%>" value="<%=cat1.getLastName()%>">
							<%
				      			}
				    		%>
			              	
            			</datalist>
            			</div>
            		</div>
				
            	<!-- <label class="col-md-2 control-label" for="middleName"> Middle Name<sup>*</sup></label>  
            		<div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-user"></i>
							</span>
              					<input id="middleName" name="middleName" placeholder="Middle Name" class="form-control input-md" type="text" >
            			</div>
					</div> -->
			</div>
			
			 <div class="row form-group">

	           <label class="col-md-2 control-label" for="contactNo">Contact No.<sup>*</sup></label>  
           	 		<div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-earphone"></i>
							</span>
              				<input id="contactNo" name="contactNo" placeholder="10 digit Contact No." class="form-control input-md" type="text" maxlength="10">
            			</div>
            		</div>
            	
            	<label class="col-md-2 control-label" for="address1">Address <sup>*</sup></label>  
	            <div class="col-md-3">
					<div class="input-group">
						<span class="input-group-addon">
							<i class="glyphicon glyphicon-map-marker"></i>
						</span>
              			<input id="address1" name="address1 " placeholder="Address Line 1" class="form-control input-md" type="text" >
            		</div>
				</div>
			</div>
		
		
			<div class="row form-group">
				
				<label class="col-md-2 control-label" for="city">User Name<sup>*</sup></label>  
		            <div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-user"></i>
							</span>
	              			<input id="userName" name="userName " placeholder="User Name" class="form-control input-md" type="text" autofocus onchange="return ChooseContact();" >
	            		</div>
					</div>
				
				<label class="col-md-2 control-label" for="pan">Password<sup>*</sup></label>  
           			 <div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon">
							<i class="glyphicon glyphicon-hand-right"></i>
							</span>
              				<input id="password" name="password" placeholder="Password" class="form-control input-md" type="text" >
            			</div>
            		</div>
			
			</div>
		
			
			<div class="row form-group">
			<label class="col-md-2 control-label" for="pan">Re-Password<sup>*</sup></label>  
           			 <div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon">
						<i class="glyphicon glyphicon-hand-right"></i>
							</span>
              				<input id="password2" name="password2" placeholder="Re-Enter Password" class="form-control input-md" type="text" autofocus  onchange="validatePassword()">
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
				<label class="col-md-2 control-label" for="pan">PAN No.<sup>*</sup></label>  
           			 <div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon">
							No
							</span>
              				<input id="pan" name="pan" placeholder="PAN Number" class="form-control input-md" type="text" required="">
            			</div>
            		</div>
            		
                 <!--  <label class="col-md-2 control-label" for="city">Type :<sup>*</sup></label>  
	               <div class="col-md-3">
					<div class="input-group">
						<span class="input-group-addon">
							<i class="glyphicon glyphicon-user"></i>
						</span>
              			 <select class="form-control" id="typeId">
										<option value="selected">--Select Type--</option>
										<option value="admin">Admin</option>
										<option value="account">Account</option>
										<option value="salesman">Salesman</option>
							</select>
            		</div>
				</div> -->
			
			</div>
			
			
			 
 			<div class="form-group row" style="padding-top:2%">
            	<div class="col-md-10 text-center">
            		 <!--  userDetails() function is implemented in  userDetails.js -->
            		 
            		 <input style="font-size: 25;width: 128px; height: 53px;" type="button" id="btn"      class="btn btn-success" name="btn" onclick="return regUserDetails();" value="Submit"/>
		             <input style="font-size: 25;width: 128px; height: 53px;" type="reset"  id="save"     class="btn btn-danger"  name="btn" onclick="reset()" value="Cancel"/>
            	     <input style="font-size: 25;width: 128px; height: 53px;" type="button" id="listBtn"  class="btn btn-primary" name="btn" onclick="userlist()" value="List"/>
            	     <input style="font-size: 25;width: 128px; height: 53px;" type="button" id="listBtn1" class="btn btn-primary" name="btn" onclick="editUser()" value="Edit" />
            	
        	    </div>
          	</div>
		</fieldset>
      </form>
    </div>
    
   <%--  <%@include file="commons/newFooter.jsp" %> --%>
    
     <%
      }else
    
            {
    	 
    	  out.println("<span class=\"myspan\">You Can Not view This Page</span>");
    	
          }
    
    	%>
    
<jsp:include page="commons/footer.jsp"></jsp:include>