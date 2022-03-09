<%@page import="com.embelSoft.bean.GetVendorDetailsBean"%>
<%@page import="com.embelSoft.dao.VendorDetailsDao"%>
<% boolean isHome=false;%>
<%@include file="commons/header.jsp"%>
<html>
<head>
<script type="text/javascript">
function Back() {
	 window.location = "VendorDetails.jsp";
}
</script> 	
<script>
$(document).ready(function(){
	 vendorList();
});
</script>
	
<!-- For datatable to pdf,print,excel etc conversion to connect offline jars -->
<script type="text/javascript" src="/embelSoft/staticContent/jsForReport/jquery-1.12.4.js"></script> 
<script type="text/javascript" src="/embelSoft/staticContent/jsForReport/jquery.dataTables.min.js"></script>
<script type="text/javascript" src="/embelSoft/staticContent/jsForReport/dataTables.buttons.min.js"></script>
<script type="text/javascript" src="/embelSoft/staticContent/jsForReport/buttons.flash.min.js"></script>
<script type="text/javascript" src="/embelSoft/staticContent/jsForReport/jszip.min.js"></script>
<script type="text/javascript" src="/embelSoft/staticContent/jsForReport/pdfmake.min.js"></script>	
<script type="text/javascript" src="/embelSoft/staticContent/jsForReport/vfs_fonts.js"></script>
<script type="text/javascript" src="/embelSoft/staticContent/jsForReport/buttons.html5.min.js"></script>
<script type="text/javascript" src="/embelSoft/staticContent/jsForReport/buttons.print.min.js"></script>
<link rel="stylesheet" href="/embelSoft/staticContent/cssForReport/jquery.dataTables.min.css"> 
<link rel="stylesheet" href="/embelSoft/staticContent/cssForReport/buttons.dataTables.min.css">

<script src="/embelSoft/staticContent/js/vendorDetails.js"></script>

<link href="/embelSoft/staticContent/css/StyleValidation.css" rel="stylesheet" type="text/css"/>
<script src="sweetalert2.min.js"></script>
<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
<link rel="stylesheet" href="sweetalert2.min.css">

<style type="text/css">
td {
	color:  black;
}
</style>

</head>
<body>
<div class="container" style="min-height:300px;">
	<div class="row header_margin_top">
		<div align="center">
			<h2 class="form-name style_heading" style="margin-top: 80px">Vendor List</h2>
		</div>
	</div>
		<div class="row">
			<div class="form-group" align="right">
			    <div class="col-sm-offset-6 col-md-5 control-label">
						<div id="date">
							<label id="demo"></label>
							<script>
							   var date = new Date();
							   document.getElementById("demo").innerHTML = date.toDateString();
							</script>
						</div>
					</div>
				</div>
	      </div>	

             <div class="row">
			<div class="col-sm-offset-1 col-md-10">
				<hr style="border-top-color: #c1b1b1;">
			</div>
		</div>
			  
	<div id="date">
		<label id="demo"></label>
		<script>
			var date = new Date();
			document.getElementById("demo").innerHTML = date.toDateString();
		</script>
	</div>

	<div id="dataTab">
	<div class="container">
		<div class="table-responsive">
		<table class="table table-bordered table-striped table-condensed cf"
				id="list" class="display"
				 style="border: 2px solid black; border-collapse: collapse;"> 
				
				<thead>
			<tr style="background-color: red;" >
					<th>Sr No</th>
					<th>Vendor Name</th>
					<th>Date</th>
	                <th>Contact Number</th>
	                <th>Email</th>
	                <th>Address</th>
	                <th>State</th>	                
	                <th>Country</th>
					<th>Zip Code</th>
					<th>PAN Number</th>
					<th>CIN Number</th>
					<th>GSTIN Number</th>
					<!-- <th>Action</th> -->
			</tr>
		</thead>
		<tfoot>
		</tfoot>
	</table>
	</div>
	</div>
	</div>
	<div class="wrapper" align="center">
		<input type="button" style=" font-size: 25" value="Back" id="listBtn" class="btn btn-primary btn-lg btnn" onclick="Back()" /> 
	</div>
	
			<script type="text/javascript">

			$(document).ready(function() {
			    $('#list').DataTable( {
			        "paging":   false,
			        "ordering": false,
			        "info":     false
			    } );
			} );
			
		</script>
</div>
</body>
<%@include file="commons/newFooter.jsp" %>
