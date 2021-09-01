
<%@page import="com.itextpdf.text.log.SysoLogger"%>
<%@page import="com.Fertilizer.hibernate.PartnerTransactionBeanH"%>
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
	<script type="text/javascript" src="/Shop/staticContent/js/productDetail.js"></script>
	
<html>
	<head>

		<title>Partner Payment List</title>
		
  		
  		<script type="text/javascript">
  			function Back()
  			{
  				window.location = "allPaymentWithLeftTabs.jsp" ;
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
		$(document).ready(function () 
		{
	         var table=$("#list").dataTable({


				    "bProcessing": true,
				    "sAutoWidth": false,
				    "bDestroy":true,
				    "sPaginationType": "bootstrap", // full_numbers
				    "iDisplayStart ": 10,
				    "iDisplayLength": 10,
				    "bPaginate": false, //hide pagination
				    //"bFilter": false, //hide Search bar
				    "bInfo": false, // hide showing entries
	    		         
	    		     });
	        
	         
			 var tableTools = new $.fn.dataTable.TableTools(table,{				 
				 'sSwfPath':'//cdn.datatables.net/tabletools/2.2.4/swf/copy_csv_xls_pdf.swf',				 
				 	'aButtons':['copy','print','csv',
					 {
						 'sExtends':'xls',
						 'sFileName':'Data.xls',
						 'sButtonText': 'Save to Excel'
					 }
					],				
			});
				$(tableTools.fnContainer()).insertBefore('#list_wrapper');
		});
	</script>

<body id="dt_example">
		<div class="row" style="margin-top:70px">
				    <div align="center">
				  		<h2 class="form-name style_heading " >Partner Payment List</h2>
				  	</div>
				 	
			     <div class="row">
					     <div class="col-sm-offset-1 col-md-10">
							  		<hr style="border-top-color:#c1b1b1;">
					     </div>	
			   		 </div>
		</div>
			    
	<%
	ProductDetailsDao dao=new ProductDetailsDao();
	List list12=dao.getpartpaymentList();
	%>
	<div class="container-fluid" style="margin: 0 15px;">
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

					<th>Partner Name</th>
					<th>Accountant Name</th>
	                <th>Payment Mode</th>
	                <th>Credit Amount</th> 
					<th>Debit Amount</th> 
	                <th>Insert date</th> 
	                <th>Shop Name</th>
				</tr>
			</thead>
			
			<tbody>
   				<%
						for(int i=0;i<list12.size();i++){
							PartnerTransactionBeanH sr=(PartnerTransactionBeanH)list12.get(i);
				%>
				
				<tr>
					<td class="align"><%=sr.getPartnerName()%></td>
					<td class="align"><%=sr.getAccountantName()%></td>
				    <td class="align"><%=sr.getPaymentMode()%></td> 
					<td class="align"><%=sr.getCreditPT()%></td>
					<td class="align"><%=sr.getDebitPT()%></td>
					<td class="align"><%=sr.getInsertDatePT()%></td>
					<td class="align"><%=sr.getShopName()%></td> 
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

