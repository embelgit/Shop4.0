
<%@page import="com.Fertilizer.dao.TaxCreationDao"%>
<%@page import="com.Fertilizer.bean.GetTaxDetails"%>
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
	
	
	
<html>
	<head>
	
		<title>Tax List</title>
		
  		
  		<script type="text/javascript">
  			function Back()
  			{
  				window.location = "tax.jsp" ;
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
				  		<h2 class="form-name style_heading">Tax List</h2>
				  	</div>
				 	
			     <div class="row">
					     <div class="col-sm-offset-1 col-md-10">
							  		<hr style="border-top-color:#c1b1b1;">
					     </div>	
			   		 </div>
		</div>
			    
	<%
	TaxCreationDao dao=new TaxCreationDao();
	List list12=dao.getTaxDetails();
	%>
	<div class="container">
	<div class="row">
	
	<div id="date" style="padding-top:2%">
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
					
	                <th>Tax</th>	                
					<th>CGST %</th>
					<th>SGST %</th>
					<th>Tax Percentage</th>
					
				</tr>
			</thead>
			
			<tbody>
   				<%
					for(int i=0;i<list12.size();i++){
						GetTaxDetails sr=(GetTaxDetails)list12.get(i);
				%>
				
				<tr>
					
					<td class="align"><%=sr.getTaxType()%></td>
					<td class="align"><%=sr.getCgst()%></td>
					<td class="align"><%=sr.getSgst() %></td>
					<td class="align"><%=sr.getTaxPercentage()%></td>
					
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
		<input type="button" style="height: 53px; width: 128; font-size: 25px" value="Back" id="listBtn" class="btn btn-primary" onclick="Back()" /> 
	</div>
	
</body>
<jsp:include page="commons/footer.jsp"></jsp:include>
</html>