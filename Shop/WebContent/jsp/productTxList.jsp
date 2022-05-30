
<%@page import="com.itextpdf.text.log.SysoLogger"%>
<%@page import="com.Fertilizer.hibernate.productTransferHibernate"%>
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
<link rel="stylesheet" href="/Shop/staticContent/css/shopstyle.css">	
<html>
	<head>

		<title>Product Transfer List</title>
		
  		
  		<script type="text/javascript">
  			function Back()
  			{
  				window.location = "product_transfer.jsp" ;
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
					"search": true,
					/* "scrollY": 300, */
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
				  		<h2 class="form-name style_heading " >Product Transfer List</h2>
				  	</div>
				 	
			     <div class="row">
					     <div class="col-sm-offset-1 col-md-10">
							  		<hr style="border-top-color:#c1b1b1;">
					     </div>	
			   		 </div>
		</div>
			    
	<%
	ProductDetailsDao dao=new ProductDetailsDao();
	List list12=dao.getProducttxList();
	%>
	<div class="container">
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
				<th>Sr No.</th>
					<th>Product Name</th>
					<th>Company Name</th>
					<th>Quantity Transfer</th>
					<th>Unit</th>
					<th>Shop Name</th>
					<th>Date</th>
				</tr>
			</thead>
			
			<tbody>
   				<%
						for(int i=0;i<list12.size();i++){
							productTransferHibernate sr=(productTransferHibernate)list12.get(i);
/* 						System.out.println(sr.getProduct()+" "+sr.getCat()+" "+sr.getManufacturer()+" "+sr.getTaxType()+" "+sr.getTaxPercentage()+" "+sr.getBuyPrice()+" "+sr.getWeight()+" "+sr.getSubCatName()); */
				%>
				
				<tr>
					<td class="align"><%=sr.getSr()%></td>
					<td class="align"><%=sr.getProductName()%></td>
					<td class="align"><%=sr.getCompanyName()%></td>
					<td class="align"><%=sr.getQuantityTx()%></td>
				    <td class="align"><%=sr.getUnit()%></td> 
					<td class="align"><%=sr.getShopnametoTx()%></td>
				    <td class="align"><%=sr.getDate()%></td> 
					 
					
				</tr>
	
				<%
					}
				%>
			</tbody>
		</table>
	</div>
	</div>
	</div>
	
	<div class="row buttons-margin" align="center">
		<input type="button" value="Back" id="listBtn" class="btn btn-primary" onclick="Back()" /> 
		<!-- <input type="button" style="width: 200px; height: 65px; font-size: 25px" value="Delete Product" id="listBtn2" class="btn btn-large btn-danger button-height-width" onclick="deletProduct()" /> -->
	</div>
	
	</div>
</body>
<jsp:include page="commons/footer.jsp"></jsp:include>
</html>

