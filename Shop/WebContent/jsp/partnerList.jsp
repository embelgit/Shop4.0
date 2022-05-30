
<%@page import="com.Fertilizer.bean.PartnerDetailsBean"%>
<%@page import="com.Fertilizer.dao.partnerDetailsDao"%>
<%@page import="com.Fertilizer.bean.GetSupplierDetails"%>
<%@page import="com.Fertilizer.dao.SupplierDetailsDao"%>
<%@page import="java.util.List"%>
  	<%
  		boolean isHome=false;
  	%>
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
<link rel="stylesheet" href="/Shop/staticContent/css/shopstyle.css">	
	
<html>
	<head>
	
		<title>PartNer List</title>
		 		
  		<script type="text/javascript">
  			function Back()
  			{
  				window.location = "partnerDetails.jsp" ;
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
	        	 "search": true, 
	        	/*  "scrollY": 300, */
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
		
		
		<div class="row">
			<div align="center" style="margin-top:70px">
				<h2 class="form-name style_heading">Partner List</h2>
			</div>
			<div class="row" align="center">
			    <div class="hr-width">
			  		<hr class="style-one">
			    </div>	
			</div>
		</div>
			    
	<%
			    		partnerDetailsDao dao=new partnerDetailsDao();
			    		List list12=dao.getPartnerList();
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
					<th>Partner Name</th>
					<th>Contact No</th>
	                <th>Alternate Contact No</th>
	                <th>Email Id</th>	                
					<th>Address</th>
					<th>City</th>
					<th>Delete Partner Details</th>
				</tr>
			</thead>
			
			<tbody>
   				<%
   					for(int i=0;i<list12.size();i++){
   								PartnerDetailsBean sr=(PartnerDetailsBean)list12.get(i);
   				%>
				
				<tr>
					<td class="align"><%=sr.getPartnerName()%></td>
					<td class="align"><%=sr.getContactNo()%></td>
					<td class="align"><%=sr.getAlternateContactNo()%></td>
					<td class="align"><%=sr.getEmailId()%></td>
					<td class="align"><%=sr.getAddress()%></td>
					<td class="align"><%=sr.getCity()%></td>
					<td class="align"><i class="glyphicon glyphicon-trash" id="<%=sr.getPkPartnerId()%>,<%=sr.getPartnerName()%>" onclick="delpartner(this.id);return false;"></i></td>																			
				</tr>
	
				<%
					}
				%>
			</tbody>
		</table>
	</div>
	
	<div class="row buttons-margin" align="center">
		<input type="button" value="Back" id="listBtn" class="btn btn-primary" onclick="Back()" /> 
		<!-- <input type="button" style="width: 200px; height: 65px; font-size: 25px" value="Delete Supplier" id="listBtn2" class="btn btn-large btn-danger button-height-width" onclick="deletSupplier()" /> -->
	</div>
	
</div>
</body>
<jsp:include page="commons/footer.jsp"></jsp:include>
</html>

