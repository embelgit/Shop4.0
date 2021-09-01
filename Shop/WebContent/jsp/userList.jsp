
<%@page import="com.Fertilizer.dao.UserDetailsDao"%>
<%@page import="com.Fertilizer.dao.shopDetailsDao"%>
<%@page import="com.Fertilizer.hibernate.shopDetailsBean"%>
<%@page import="java.util.List"%>
  	<% boolean isHome=false;%>
	<%@include file="commons/header.jsp"%>
	<head>
	
	<link href="/Shop/WebContent/staticContent/css/dataTa.css" rel="stylesheet" type="text/css" media="all" />
	<link href="/Shop/staticContent/css/dataTables.jqueryui.min.css"  rel="stylesheet" type="text/css" media="all">
	<link rel="stylesheet" href="/Shop/staticContent/css/tabDemo.css">
 	<link rel="stylesheet" href="/Shop/staticContent/css/jquery-ui.min.css">
    <link rel="stylesheet" href="/Shop/staticContent/css/ui.jqgrid.min.css">
    
    <script src="/Shop/staticContent/js/jquery.min.js"></script>
    <script src="/Shop/staticContent/js/jquery.jqgrid.min.js"></script>
	<script src="/Shop/staticContent/js/jquery.dataTables.js" type="text/javascript"></script>
	<script type="text/javascript" src="/Shop/staticContent/js/jqueryUi.js"></script>
	
		<title>Credit Customer List</title>
		
  		
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

	

	<script type="text/javascript"> 
		$(document).ready(function () {
	         var table=$("#list").dataTable();
			 var tableTools = new $.fn.dataTable.TableTools(table, {
				 'sSwfPath':'//cdn.datatables.net/tabletools/2.2.4/swf/copy_csv_xls_pdf.swf',
				 	'aButtons':['copy','print','csv',{
					 'sExtends':'xls',
					 'sFileName':'Data.xls',
					 'sButtonText': 'Save to Excel'
						}
					]
				});
					$(tableTools.fnContainer()).insertBefore('#list_wrapper');
			});
	</script>

<body id="dt_example" style="min-height:300px;">
		
		
		
		<div class="row header_margin_top">
				    <div align="center">
				  		<h2 class="form-name style_heading">User List</h2>
				  	</div>
				 	
			     <div class="row">
					     <div class="col-sm-offset-1 col-md-10">
							  		<hr style="border-top-color:#c1b1b1;">
					     </div>	
			   		 </div>
		</div>
			    
	<%
	UserDetailsDao dao=new UserDetailsDao();
	List list14=dao.getUserList();
	%>
	
	<div id="date" style="padding-left: 6%">
		<label id="demo"></label>
		<script>
			var date = new Date();
			document.getElementById("demo").innerHTML = date.toDateString();
		</script>
	</div>

	<div id="demo_jui" style="padding-left: 6%">
		<table id="list" class="display" border="1">
			<thead>
				<tr>
					<th>Sr. No</th>
					<th>First Name</th>
					<th>Last Name</th>
	                <th>Address</th>
	                <th>City</th>
	                <th>Pan No</th>
	                <th>Username</th>
	                <th>Password</th>
	            </tr>
			</thead>
			
			<tbody>
   				<%
					for(int i=0;i<list14.size();i++){
						UserDetailsBean sr=(UserDetailsBean)list14.get(i);
				%>
				
				<tr>
					<td class="align"><%=sr.getUsrId()%></td>
					<td class="align"><%=sr.getFirstName()%></td>
					<td class="align"><%=sr.getLastName()%></td>
					<td class="align"><%=sr.getAddress1()%></td>
					<td class="align"><%=sr.getCity()%></td>
					<td class="align"><%=sr.getPan()%></td>
					<td class="align"><%=sr.getUserName()%></td>
					<td class="align"><%=sr.getPassword()%></td>					
				</tr>
	
				<%
					}
				%>
			</tbody>
		</table>
	</div>
	
	<div class="wrapper" align="center" style="padding-top:2%">
		<input type="button" style="font-size: 25;width: 128px; height: 53px;"  value="Back" id="listBtn" class="btn btn-primary" onclick="Back()" /> 
	</div>
	
</body>
<jsp:include page="commons/footer.jsp"></jsp:include>
</html>

