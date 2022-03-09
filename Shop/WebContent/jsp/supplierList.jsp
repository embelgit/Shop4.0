
<%@page import="com.Fertilizer.bean.GetSupplierDetails"%>
<%@page import="com.Fertilizer.dao.SupplierDetailsDao"%>
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

		<link rel="stylesheet" href="/Shop/staticContent/css/shopstyle.css">
	

<link rel="stylesheet" href="/Shop/staticContent/css/shopstyle.css">	

	
<html>
	<head>
	
		<title>Supplier List</title>
		 		
  		<script type="text/javascript">
  			function Back()
  			{
  				window.location = "supplierdetails.jsp" ;
  			}
  			function deletSupplier()
    		 {
    		 window.location = "DeletSupplier.jsp";
    		 }
  			
  		</script>
		
<!-- <style>
.btn-default,.btn-primary,.btn-success,.btn-info,.btn-warning,.btn-danger
 {
    border-radius:23px;
=======
<style>
.container-fluid {
	overflow: hidden;
>>>>>>> branch 'master' of https://github.com/embelgit/Shop4.0
}
<<<<<<< HEAD


</style> -->
<style>
.container-fluid {
	overflow: hidden;
}
=======
>>>>>>> branch 'master' of https://github.com/embelgit/Shop4.0
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

		<!-- <div class="container-fluid"> -->	
		

	<div class="container-fluid">		

		<div class="row" align="center">
				    <!-- <div align="center" style="margin-top:70px">
				  		<h2 class="form-name style_heading">Supplier List</h2>
				  	</div> -->
		
		<div class="row">
		    <div align="center" style="margin-top:70px">
		  		<h2 class="form-name style_heading">Supplier List</h2>
		  	</div>


			     <div class="row" >
					     <div class="hr-width">
							  		<hr class="style-one">
					     </div>	
			   		 </div>

	    <!--  <div class="row" align="center">
		     <div class="hr-width">
		  		<hr class="style-one">
		     </div>	
		 </div> --> 

		</div>
			    
	<%
	SupplierDetailsDao dao=new SupplierDetailsDao();
	List list12=dao.getSupplierList();
	%>
	

	<div id="date"align="right" >

	<div id="date" align="right">

		<label id="demo"></label>
		<script>
			var date = new Date();
			document.getElementById("demo").innerHTML = date.toDateString();
		</script>
	</div>
<!-- <div class="container"> -->
	<div id="demo_jui">
		<table id="list" class="display" border="1">
			<thead>
				<tr>
					<th>Supplier Name</th>
					<th>Contact Person Name</th>
	                <th>City</th>
	                <th>Contact No</th>
	                <th>Alternate No</th>
	                <th>Email Id</th>	                
					<th>Address</th>
					<th>Gst No</th>
					<th>Delete Supplier</th>
					
				</tr>
			</thead>
			
			<tbody>
   				<%
					for(int i=0;i<list12.size();i++){
						GetSupplierDetails sr=(GetSupplierDetails)list12.get(i);
				%>
				
				<tr>
					<td class="align"><%=sr.getDealerName()%></td>
					<td class="align"><%=sr.getPersonName()%></td>
					<td class="align"><%=sr.getCity()%></td>
					<td class="align"><%=sr.getContactNo()%></td>
					<td class="align"><%=sr.getLandline()%></td>
					<td class="align"><%=sr.getEmail()%></td>
					<td class="align"><%=sr.getAddress()%></td>
					<td class="align"><%=sr.getTin()%></td>
<%-- 					<td class="align"><button id="<%=sr.getPksuppID()%>" onclick="del(this.id);return false;">Delete</button></td> --%>
					<td class="align"><i class="glyphicon glyphicon-trash" id="<%=sr.getPksuppID()%>,<%=sr.getDealerName()%>" onclick="del(this.id);return false;"></i></td>					
				</tr>
	
				<%
					}
				%>
			</tbody>
		</table>
	</div>

	<!-- </div>  -->
 	<div class="row buttons-margin" align="center">
		<input type="button" value="Back" id="listBtn" class="btn btn-primary" onclick="Back()" /> 
		<!-- <input type="button" style="width: 200px; height: 65px; font-size: 25px" value="Delete Supplier" id="listBtn2" class="btn btn-large btn-danger button-height-width" onclick="deletSupplier()" /> -->
			</div> 
	
	<!-- <div class="row buttons-margin" align="center">
		<input type="button" value="Back" id="listBtn" class="btn btn-primary" onclick="Back()" /> 
		<input type="button" style="width: 200px; height: 65px; font-size: 25px" value="Delete Supplier" id="listBtn2" class="btn btn-large btn-danger button-height-width" onclick="deletSupplier()" />
	</div> -->
	
	</div>
	<!-- </div> -->
	</div>
</body>
<jsp:include page="commons/footer.jsp"></jsp:include>
</html>

