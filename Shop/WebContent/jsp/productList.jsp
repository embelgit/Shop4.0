
<%@page import="com.itextpdf.text.log.SysoLogger"%>
<%@page import="com.Fertilizer.bean.GetProductDetails"%>
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

		<title>Supplier List</title>
		
  		
  		<script type="text/javascript">
  			function Back()
  			{
  				window.location = "product_detail.jsp" ;
  			}
  			/* function deletProduct()
    		 {
    		 window.location = "DeletProduct.jsp";
    		 } */
  			
  			
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


				    /* "bProcessing": true,
				    "sAutoWidth": false,
				    "bDestroy":true,
				    "sPaginationType": "bootstrap", 
				    "iDisplayStart ": 10,
				    "iDisplayLength": 10,
				    "bInfo": false, 
				    "bPaginate": false,  */
				 // full_numbers
				    //hide pagination
				    //"bFilter": false, //hide Search bar
				    // hide showing entries
				    
				    
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
				<h2 class="form-name style_heading">Product List</h2>
			</div>
				 	
		  	<div class="row" align="center">
			     <div class="hr-width">
			  		<hr class="style-one">
			     </div>	
			</div>
		</div>
			    
	<%
	ProductDetailsDao dao=new ProductDetailsDao();
	List list12=dao.getProductList();
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
				<th>Sr No.</th>
					<th>Product Name</th>
					<th>Category</th>
					<th>Sub Category</th>
	                <th>Mfg. Company</th>
	                <th>Description</th> 
	                <th>Buy price</th> 
	                <th>GST Name</th>
	                <th>SGST</th>     
	                <th>CGST</th>           
					<th>GST %</th>
					<th>Packing</th> 
					<th>Unit</th>
					<th>Sale Price</th>
					<th>Delete Product</th> 					 
					<!-- <th>Credit Customer Sale Price</th> -->
					
					
				</tr>
			</thead>
			
			<tbody>
   				<%
						for(int i=0;i<list12.size();i++){
						GetProductDetails sr=(GetProductDetails)list12.get(i);
						System.out.println(sr.getProduct()+" "+sr.getCat()+" "+sr.getManufacturer()+" "+sr.getTaxType()+" "+sr.getTaxPercentage()+" "+sr.getBuyPrice()+" "+sr.getWeight()+" "+sr.getSubCatName());
				%>
				
				<tr>
					<td class="align"><%=sr.getSrno()%></td>
					<td class="align"><%=sr.getProduct()%></td>
					<td class="align"><%=sr.getCat()%></td>
				    <td class="align"><%=sr.getSubCatName()%></td> 
					<td class="align"><%=sr.getManufacturer()%></td>
					<td class="align"><%=sr.getDescription()%></td>
					<td class="align"><%=sr.getBuyPrice()%></td> 
					<td class="align"><%=sr.getTaxType()%></td>
					<td class="align"><%=sr.getSgst()%></td>
					<td class="align"><%=sr.getCgst()%></td>
					<td class="align"><%=sr.getTaxPercentage()%></td>
				    <td class="align"><%=sr.getWeight()%></td>   
					<td class="align"><%=sr.getUnitName()%></td>
				    <td class="align"><%=sr.getSalePrice()%></td>  
<%-- 					<td class="align"><button id="<%=sr.getPkid()%>" value="<%=sr.getPkid()%>"  name="<%=sr.getPkid()%>" onclick="del(this.id);return false;">Delete</button></td> --%>
	<!-- 			<i class="material-icons" style="font-size:36px">delete</i> -->
					<td class="align"><i class="glyphicon glyphicon-trash" id="<%=sr.getPkid()%>,<%=sr.getProduct()%>" onclick="del(this.id);return false;"></i></td>
					<%-- <td class="align"><%=sr.getCreditSalePrice()%></td> --%>
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
		<!-- <input type="button" style="width: 200px; height: 65px; font-size: 25px" value="Delete Product" id="listBtn2" class="btn btn-large btn-danger button-height-width" onclick="deletProduct()" /> -->
	</div>
	
	</div>
</body>
<jsp:include page="commons/footer.jsp"></jsp:include>
</html>

