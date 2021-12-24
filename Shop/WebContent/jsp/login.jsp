<!DOCTYPE html>

<%@page import="com.Fertilizer.hibernate.shopDetailsBean"%>
<%@page import="java.util.List"%>
<%@page import="com.Fertilizer.dao.shopDetailsDao"%>
<%@page import="com.Fertilizer.utility.HibernateUtility"%>
<%@page import="com.itextpdf.text.log.SysoLogger"%>
<%@page import="com.Fertilizer.utility.PropertiesHelper"%>
<%@page contentType="text/html; charset=utf-8" language="java" %>



<%-- <%
   String abc = "english";
%> --%>

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


<head>
	<!-- <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta name="description" content="" /> -->
	
	<meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Page</title>
   
    <!-- <title>Login Page</title> -->
    
    
     <script type="text/javascript" src="/Shop/staticContent/js/jquery-1.12.3.min.js"></script>
     <!--  <script type="text/javascript" src="/Shop/staticContent/js/jquery-1.11.1.min.js"></script> -->
	 <link rel="stylesheet" href="/Shop/staticContent/css/jquery-ui.min.css">
     <link rel="stylesheet" href="/Shop/staticContent/css/ui.jqgrid.min.css">
        
     <link rel="stylesheet" href="/Shop/staticContent/y_css/jquery-ui.css">
     <link rel="stylesheet" href="/Shop/staticContent/css/ui.jqgrid.css">
     <script type="text/javascript" src="/Shop/staticContent/js/jquery.min.js"></script>
     <!-- <script type="text/javascript" src="/Shop/staticContent/js/jquery-ui-min.js"></script> -->
     
     <script type="text/javascript" src="/Shop/staticContent/js/jquery-ui.min.js"></script>
     <script type="text/javascript" src="/Shop/staticContent/js/jquery-ui.js"></script>
     <script type="text/javascript" src="/Shop/staticContent/js/jqueryUi.js"></script>
     <script type="text/javascript" src="/Shop/staticContent/js/jquery.jqgrid.min.js"></script>
    
	<script src="/Shop/staticContent/js/jquery-1.12.3.min.js"></script>
	<script src="/Shop/staticContent/js/logout.js"></script>
	<script src="/Shop/staticContent/js/authentication.js"></script>


    <!-- Bootstrap Core CSS -->
    <link href="/Shop/staticContent/css/bootstrap.min.css" rel="stylesheet">

    <!-- MetisMenu CSS -->
    <link href="/Shop/staticContent/css/metisMenu.min.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link href="/Shop/staticContent/css/sb-admin-2.css" rel="stylesheet">

    <!-- Custom Fonts -->
    <link href="/Shop/staticContent/css/font-awesome.min.css" rel="stylesheet" type="text/css">

    <!-- jQuery -->
    <script src="/Shop/staticContent/js/jquery.min.js"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="/Shop/staticContent/js/bootstrap.min.js"></script>

    <!-- Metis Menu Plugin JavaScript -->
    <script src="/Shop/staticContent/js/metisMenu.min.js"></script>

    <!-- Custom Theme JavaScript -->
    <script src="/Shop/staticContent/js/sb-admin-2.js"></script>
	
	<link href="/Shop/staticContent/css/login.css" rel="stylesheet" type="text/css">
<style>

</style>
</head>

<body class="login-background">
	<div class="container">
		<div class="row">
        	<div class="login-form">
            	<div class="col-lg-4 col-lg-offset-1 col-md-6 col-md-offset-1 col-sm-offset-3 col-sm-6  my-auto">
                	<div class="login-panel panel panel-default">
                    	<div class="panel-heading">
                        	<h3 class="panel-title" style="font-weight: bold;"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("please") %> :<%}%> <%if(abc.equals("english")){%>Please Login<%}%></h3>
          				</div>
                    	<div class="panel-body">
                        	<form action="Login" method="post" id="loginId">
                            	<div>
	                                <div class="form-group">
										<label><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("user_name")%>:<%}%> <%if(abc.equals("english")){%>User Name :<%}%></label>
	                                    <input class="form-control" placeholder="Username" name="uname" id="uname" type="text" autofocus onchange="getShopNameForLogin()">
	                                </div>
	                                <div class="form-group">
										<label><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("password")%>:<%}%> <%if(abc.equals("english")){%>Password :<%}%></label>
	                                    <input class="form-control" placeholder="Password" name="pass" id="pass" type="password">
	                                </div>
                               		<div class="form-group">
										<label><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("user_name")%>:<%}%> <%if(abc.equals("english")){%>Shop Name :<%}%></label>
                             <%-- <%
								shopDetailsDao dao1 = new shopDetailsDao();
           						List shop = dao1.getAllShop();
							  %> --%>
							
							    		<input id="shopName" name="shopName" list="shopname_drop" placeholder="Shop Name" class="form-control">
							    		<datalist id="shopname_drop"></datalist>
							<%-- <select id="shopName" style="width: 100%;background: #faffbd;color: black;" class="form-control">
							<%
					           for(int i=0;i<shop.size();i++)
					           {
					        	   shopDetailsBean bean =(shopDetailsBean)shop.get(i);
							%>
								<option ><%=bean.getShopId()%>  <%=bean.getShopName()%></option>
							<%
				      			}
				    		%>
						    </select> --%>
								</div>							
                             </div>
                              
                                <!-- Change this to a button or input when using this as a form -->
	                                <div class="wrapper">
		                                <button type="button" onclick="login()" class="btn btn-md btn-lg btn-success"><%if(abc.equals("marathi")){%> <%=PropertiesHelper.marathiProperties.getProperty("login")%><%}%> <%if(abc.equals("english")){%>Login<%}%></button>
		                                <button type="reset"  class="btn btn-md btn-lg btn-danger"><%if(abc.equals("marathi")){%> <%=PropertiesHelper.marathiProperties.getProperty("Reset")%><%}%> <%if(abc.equals("english")){%>Reset<%}%></button>
		                            </div>
	                            <!-- <div class="form-group">
	                            <a href="/Fertilizer/jsp/userDetails.jsp">New User Registration</a>
	                            </div>  -->
                            </form>
                            </div>
                        	
                    </div>
                </div>
            
        
            
	            <div class="col-lg-4 col-lg-offset-1 col-md-6 col-md-offset-1 col-sm-6 col-sm-offset-3 my-auto">	 
	            	<div class="form-group">           	
	            		<!-- <label>Select language:</label> -->	            	
	            		<select class="selectpicker form-control" id="language" name="language" data-style="btn-primary" onchange="language()">
		            	    <option value="select">Select Language</option>
		 					<option value="marathi">Marathi</option>
		 					<option value="english">English</option>
						</select>
					</div>	            	
	            </div>
	        
	         
    		</div>
    	</div>
    
    	
	</div>
    
</body>

</html>