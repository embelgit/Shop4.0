<%@page import="com.Fertilizer.dao.shopDetailsDao"%>
<%@page import="com.Fertilizer.dao.UserDetailsDao"%>
<%@page import="com.Fertilizer.utility.PropertiesHelper"%>
<%@page import="com.Fertilizer.hibernate.UserDetailsBean"%>
<%@page import="com.Fertilizer.helper.UserDetailsHelper"%>
<%@page import="com.Fertilizer.utility.HibernateUtility"%>
<%@page import="com.Fertilizer.hibernate.shopDetailsBean"%>

<%boolean isHome = false;%>

<%@include file="commons/header.jsp"%>

<%
         String name = "";
		if (session != null) {
			
			if (session.getAttribute("user") != null) {
			    name = (String) session.getAttribute("user");
				out.print("Hello, " + name );
				
				
			} else {
				
				response.sendRedirect("/Shop/jsp/login.jsp");
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
<style>
.btn-default,.btn-primary,.btn-success,.btn-info,.btn-warning,.btn-danger
 {
    border-radius:23px;
}
</style>
<meta charset="utf-8">
<head>


<script type="text/javascript" src="/Shop/staticContent/js/accessControl.js"></script>
	<script type="text/javascript">
	
	function openLogin(){
		 window.location = '/Shop/jsp/login.jsp';
	}
	</script>
	</head>
 
 		<div class="row header_margin_top">
			    <div align="center">
			  		<h2 class="form-name style_heading"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("categoryDetails") %> <%}%> <%if(abc.equals("english")){%>Access Control<%}%> </h2>
				</div>
 		</div>

     <div class="row">
		     <div class="col-sm-offset-1 col-md-10">
				  		<hr style="border-top-color:#c1b1b1;">
		     </div>	
    </div>
    
      <div class="container col-sm-offset-2" >
        <form class="form-horizontal" method="post" action="" name="usd">                                                                             <!-- Value of 'name' attribute is used in userDetails.js  -->
          <fieldset>
          		<div class="row form-group">
           	 		<div class="col-md-6">
              			<%@include file="commons/clock.jsp" %>
           		 	</div>
				</div>
		
			 <div class="row form-group">
			    <label class="col-md-2 control-label" for="firstName"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("catName") %> <%}%> <%if(abc.equals("english")){%>Employee Name<%}%><sup>*</sup></label>
           		  	 <div class="col-md-3">
            			<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-user"></i>
							</span>
              				
							<%
							UserDetailsDao cdd11 = new UserDetailsDao();
           						List cList11 =cdd11.getAllUsers();
							
							%>
							<input list="EmpName_drop" id="EmpName" placeholder="Select Employee Name" class="form-control" onchange="getUserDetails()">
						<datalist id="EmpName_drop">
							<%
					           for(int i=0;i<cList11.size();i++){
					        	   UserDetailsBean cat11=(UserDetailsBean)cList11.get(i);
							%>
		
							<option data-value="<%=cat11.getUsrId()%>" value="<%=cat11.getUsrId()%>,<%=cat11.getFirstName()%> <%=cat11.getLastName()%>">
							<%
				      			}
				    		%>
			              	
            			</datalist>
            			</div>
            		</div>

			</div>
			
	
		
			<div class="row form-group">
			    <label class="col-md-2 control-label" for="city"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("catName") %> <%}%> <%if(abc.equals("english")){%>User Name<%}%><sup>*</sup></label>
				   <div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-user"></i>
							</span>
	              			<input id="userName" name="userName " placeholder="User Name" class="form-control input-md" type="text" autofocus onchange="return ChooseContact();" readonly="readonly" >
	            		</div>
					</div>
					
				<label class="col-md-2 control-label" for="pan"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("catName") %> <%}%> <%if(abc.equals("english")){%>Password<%}%><sup>*</sup></label>
           			 <div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-lock"></i>
							</span>
              				<input id="password" name="password" placeholder="Password" class="form-control input-md" type="text" readonly="readonly">
            			</div>
            		</div>
			</div>
			
			
			<div class="row form-group">
            		
            	 <label class="col-md-2 control-label" for="city"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("catName") %> <%}%> <%if(abc.equals("english")){%>Type<%}%><sup>*</sup></label>	
	               <div class="col-md-3">
					<div class="input-group">
						<span class="input-group-addon">
								<i class="glyphicon glyphicon-user"></i>
						</span>
              			 <select class="form-control" id="type">
										<option value="selected">--Select Type--</option>
										<option value="admin">Admin</option>
										<option value="deo">DEO</option>
										<option value="finance">Accountant</option>
										<option value="salesman">Salesman</option>
							</select>
            		</div>
				</div>
				    
				    <label class="col-md-2 control-label" for="shopname"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("catName") %> <%}%> <%if(abc.equals("english")){%>Shop Name<%}%><sup>*</sup></label>
           			 <div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon">
							<i
							class="glyphicon glyphicon-home"></i>
							</span>
							
							<%
									shopDetailsDao dao=new shopDetailsDao();
           							List shoplist =dao.getAllShop(request);
							
							%>
							
              				<input  list="Shop_drop" id="shopname" name="shopname" placeholder="Shop Name" class="form-control input-md" type="text" required="">
            			
            				<datalist id="Shop_drop">
            				<%
					           for(int i=0;i<shoplist.size();i++){
					        	   shopDetailsBean bean=(shopDetailsBean)shoplist.get(i);
							%>
		
							<option data-value="<%=bean.getShopId()%>" value="<%=bean.getShopId()%>,<%=bean.getShopName()%>">
							<%
				      			}
				    		%>
			              	
            			</datalist>
            			
            			
            			</div>
            		</div>
				
			</div>
			
			 <div class="row form-group">

	           <label class="col-md-2 control-label" for="contactNo">Email ID<sup>*</sup></label>  
           	 		<div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-earphone"></i>
							</span>
              				<input id="email" name="email" placeholder="Email ID" class="form-control input-md" type="email">
            			</div>
            		</div>
            	
            	<label class="col-md-2 control-label" for="address1">Email Password<sup>*</sup></label>  
	            <div class="col-md-3">
					<div class="input-group">
						<span class="input-group-addon">
							<i class="glyphicon glyphicon-map-marker"></i>
						</span>
              			<input id="pass" name="pass" placeholder="Password" class="form-control input-md" type="password" >
            		</div>
				</div>
			</div>
			
 			<div class="form-group row">
            	<div class="col-md-10 text-center">
            		 <!--  userDetails() function is implemented in  userDetails.js -->
            		 
            		 <input type="button" id="btn"  style="height: 53px; width: 128; font-size: 25" class="btn btn-large btn-success" name="btn"  onclick="AddAccessControlDetails()" value="Submit">
		             <input type="reset"  id="save" style="height: 53px; width: 128; font-size: 25" class="btn btn-large btn-danger"  name="btn"  onclick="reset()" value="Cancel" >
        	   		 <input type="button" id="btn1" style="height: 53px; width: 128; font-size: 25" class="btn btn-large btn-success" name="btn1" onclick="openLogin()" value="Login">
        	    </div>
          	</div>
		</fieldset>
      </form>
    </div>
     <%
      }else
    
            {
    	       out.println("<span class=\"myspan\">You Can Not view This Page</span>");
    	
            }
    	%>
<jsp:include page="commons/footer.jsp"></jsp:include>