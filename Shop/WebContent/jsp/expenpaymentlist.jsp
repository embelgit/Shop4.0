
<%@page import="com.itextpdf.text.log.SysoLogger"%>
<%@page import="com.Fertilizer.hibernate.ExpenditurePaymentBean"%>
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
<link rel="stylesheet" href="/Shop/staticContent/css/shopstyle.css">	
<html>
	<head>

		<title>Employee Payment List</title>
		
  		
  		<script type="text/javascript">
  			function Back()
  			{
  				window.location = "allPaymentWithLeftTabs.jsp" ;
  			}
  		</script>
<style>
.container-fluid {
	overflow: hidden;
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
	    		     "scrollX": true,
	    		     "scrollY": 300,
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
	<div class="container-fluid">
		<div class="row" style="margin-top:70px">
			<div align="center">
				<h2 class="form-name style_heading">Expenditure Payment List</h2>
			</div>
			 	
			<div class="row" align="center">
			    <div class="hr-width">
			 		<hr class="style-one">
			    </div>	
			</div>
		</div>
			    
	<%
	ProductDetailsDao dao=new ProductDetailsDao();
	List list12=dao.getexpenpaymentList();
	%>
	
	 <div class="row">
	
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

					<th>Expenses Type</th>
					<th>Accountant Name</th>
	                <th>Payment Mode</th>
	                <th>Payment Amount</th> 
	                <th>Insert date</th> 
	                <th>Shop Name</th>
				</tr>
			</thead>
			
			<tbody>
   				<%
						for(int i=0;i<list12.size();i++){
							ExpenditurePaymentBean sr=(ExpenditurePaymentBean)list12.get(i);
				%>
				
				<tr>
					<td class="align"><%=sr.getExpenseType()%></td>
					<td class="align"><%=sr.getAccountantName()%></td>
				    <td class="align"><%=sr.getPaymentMode()%></td> 
					<td class="align"><%=sr.getTotalAmount()%></td>
					<td class="align"><%=sr.getInsertDate()%></td>
					<td class="align"><%=sr.getShopName()%></td> 
				</tr>
	
				<%
					}
				%>
			</tbody>
		</table>
	</div>
	</div>
	
	<div class="row buttons-margin" align="center">
		<input type="button" value="Back" id="listBtn" class="btn btn-primary" onclick="Back()" /> 
	</div>
	
	</div>
</body>
<jsp:include page="commons/footer.jsp"></jsp:include>
</html>

