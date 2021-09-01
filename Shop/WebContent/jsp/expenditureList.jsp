<%@page import="com.Fertilizer.dao.ExpenditureDetailsDao"%>
<%@page import="com.Fertilizer.dao.CategoryDetailsDao"%>
<%@page import="com.Fertilizer.hibernate.ExpenditureDetailsBean"%>
<%@page import="java.util.List"%>
  	<% boolean isHome=false;%>
	<%@include file="commons/header.jsp"%>
	
	<link href="/Shop/WebContent/staticContent/css/dataTa.css" rel="stylesheet" type="text/css" media="all" />
	<link href="/Shop/staticContent/css/dataTables.jqueryui.min.css"  rel="stylesheet" type="text/css" media="all">
	<link rel="stylesheet" href="/Shop/staticContent/css/tabDemo.css">
 	<link rel="stylesheet" href="/Shop/staticContent/css/jquery-ui.min.css">
    <link rel="stylesheet" href="/Shop/staticContent/css/ui.jqgrid.min.css">
    
    <script src="/Shop/staticContent/js/jquery.min.js"></script>
    <script src="/Shop/staticContent/js/jquery.jqgrid.min.js"></script>
	<script src="/Shop/staticContent/js/jquery.dataTables.js" type="text/javascript"></script>
	<script type="text/javascript" src="/Shop/staticContent/js/jqueryUi.js"></script>
		<script type="text/javascript" src="/Shop/staticContent/js/supplier.js"></script>
		<meta name="viewport" content="width=device-width, initial-scale=1">
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
<html>

<head>

<title>Expenditure List</title>
		
<script type="text/javascript">
	function Back()
	{
		window.location = "expenditureDetails.jsp" ;
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
		
		<div class="row">
				    <div align="center" style="margin-top:70px">
				  		<h2 class="form-name style_heading">Expenditure List</h2>
				  	</div>
				 	
			     <div class="row">
					     <div class="col-sm-offset-1 col-md-10">
							  		<hr style="border-top-color:#c1b1b1;">
					     </div>	
			   		 </div>
		</div>
			    
	<%
	
	ExpenditureDetailsDao dao = new ExpenditureDetailsDao();
	List list12=dao.getExpendDetails();

	%>
	<div class="container">
	<div class="row">
	
	<div id="date">
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
					<th>Sr No.</th>
					<th>Expenditure Type</th>
					<th>Expenditure Name</th>
					<th>Entry Date</th>
					<th>Delete Expenditure</th>
				</tr>
			</thead>
			
			<tbody>
   				<%
					for(int i=0;i<list12.size();i++){
						ExpenditureDetailsBean sr=(ExpenditureDetailsBean)list12.get(i);			
				%>
				
				<tr>
				<td class="align"><%=sr.getSrNo()%></td>
				<td class="align"><%=sr.getExpenseType()%></td>
				<td class="align"><%=sr.getExpenseName()%></td>
				<td class="align"><%=sr.getInsertDate()%></td>	
<%-- 				<td class="align"><button id="<%=sr.getPkExpenseDetailsId()%>" onclick="delexpen(this.id);return false;">Delete</button></td> --%>
					<td class="align"><i class="glyphicon glyphicon-trash" style="font-size:27px;margin-left:90px" id="<%=sr.getPkExpenseDetailsId()%>,<%=sr.getExpenseName()%>" onclick="delexpen(this.id);return false;"></i></td>														
				
				</tr>
	
				<%
					}
				%>
			</tbody>
		</table>
	</div>
	</div>
	</div>
	
	
	<div class="wrapper" align="center" style="padding-top:2%">
		<input type="button" style="width: 128px; height: 53px; font-size: 25px" value="Back" id="listBtn" class="btn btn-primary" onclick="Back()" /> 
	</div>
	
</body>
<jsp:include page="commons/footer.jsp"></jsp:include>
</html>