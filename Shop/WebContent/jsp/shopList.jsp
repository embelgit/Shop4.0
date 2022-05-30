
<%@page import="com.Fertilizer.dao.shopDetailsDao"%>
<%@page import="com.Fertilizer.hibernate.shopDetailsBean"%>
<%@page import="com.Fertilizer.dao.shopDetailsDao"%>
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
  				window.location = "shopdetails.jsp" ;
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
	        	 /* "scrollY": 300, */
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
				<h2 class="form-name style_heading">Shop List</h2>
			</div>
			<div class="row" align="center">
			    <div class="hr-width">
			  		<hr class="style-one">
			    </div>	
			</div>
		</div>
			    
	<%
	shopDetailsDao dao=new shopDetailsDao();
	List list13=dao.getShopList();
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
					<th>Sr. No</th>
					<th>Shop Name</th>
					<th>Contact No</th>
	                <th>GST No</th>
	                <th>Address</th>
	                <th>Wholesale Lic No</th>
	                <th>Shop Lic No</th>
	                <th>Footer Shop Name</th>	                					
				</tr>
			</thead>
			
			<tbody>
   				<%
					for(int i=0;i<list13.size();i++){
						shopDetailsBean sr=(shopDetailsBean)list13.get(i);
				%>
				
				<tr>
					<td class="align"><%=sr.getShopId()%></td>
					<td class="align"><%=sr.getShopName()%></td>
					<td class="align"><%=sr.getContactNumber()%></td>
					<td class="align"><%=sr.getGstNo()%></td>
					<td class="align"><%=sr.getAddress()%></td>
					<td class="align"><%=sr.getWholesalelicno()%></td>
					<td class="align"><%=sr.getShoplicno()%></td>
					<td class="align"><%=sr.getFootershopname()%></td>
					
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

