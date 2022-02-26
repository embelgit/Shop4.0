
<%@page import="com.Fertilizer.bean.GetEmployeeDetails"%>
<%@page import="com.Fertilizer.dao.EmployeeDetailsDao"%>
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
<link rel="stylesheet" href="/Shop/staticContent/css/shopstyle.css">	
	
	

	
		<title>Credit Customer List</title>
		
  		
  		<script type="text/javascript">
  			function Back()
  			{
  				window.location = "employee_detail.jsp" ;
  			}
  			
  			
  		</script>
		
<style>
.container-fluid {
	overflow: hidden;
}
</style>
	</head>

	

	<script type="text/javascript"> 
		$(document).ready(function () {
	         var table=$("#list").dataTable({
	        	 "scrollX": true,
	        	 "scrollY": 300,
	         });
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
	<div class="container-fluid">			
		
		<div class="row header_margin_top">
		    <div align="center">
		  		<h2 class="form-name style_heading">Employee List</h2>
		  	</div>
		    <div class="row" align="center">
			    <div class="hr-width">
			  		<hr class="style-one">
			    </div>	
			</div>
		</div>
			    
	<%
	EmployeeDetailsDao dao=new EmployeeDetailsDao();
	List list12=dao.getEmployeeList();
	%>
	
	<div id="date" align="right">
		<label id="demo"></label>
		<script>
			var date = new Date();
			document.getElementById("demo").innerHTML = date.toDateString();
		</script>
	</div>

	<div id="demo_jui">
		<table id="list" class="display" border="1">
			<thead>
				<tr>
					<th>First Name</th>
					<th>Middle Name</th>
	                <th>Last Name</th>
	                <th>Joining Date</th>
	                <th>Email Id</th>
	                <th>Salary</th>	                
	                <th>Contact No</th>
					<th>Address</th>
					<th>Pin Code</th>
					<th>Aadhar Number</th>
					
					
				</tr>
			</thead>
			
			<tbody>
   				<%
					for(int i=0;i<list12.size();i++){
						GetEmployeeDetails sr=(GetEmployeeDetails)list12.get(i);
				%>
				
				<tr>
					<td class="align"><%=sr.getFirstName()%></td>
					<td class="align"><%=sr.getMiddleName()%></td>
					<td class="align"><%=sr.getLastName()%></td>
					<td class="align"><%=sr.getJoiningDate()%></td>
					<td class="align"><%=sr.getEmail()%></td>
					<td class="align"><%=sr.getSalary()%></td>
					<td class="align"><%=sr.getContactNo()%></td>
					<td class="align"><%=sr.getAddresst()%></td>
					<td class="align"><%=sr.getZipCode()%></td>
					<td class="align"><%=sr.getAdhaarNumber()%></td>
					
				</tr>
	
				<%
					}
				%>
			</tbody>
		</table>
	</div>
	
	<div class="row buttons-margin" align="center">
		<input type="button" value="Back" id="listBtn" class="btn btn-primary" onclick="Back()" /> 
	</div>
	
	</div>
</body>
<jsp:include page="commons/footer.jsp"></jsp:include>
</html>

