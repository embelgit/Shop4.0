<%@page import="com.Fertilizer.hibernate.shopDetailsBean"%>
<%@page import="com.Fertilizer.dao.shopDetailsDao"%>
<%@page import="com.Fertilizer.bean.StockDetail"%>
<%@page import="com.Fertilizer.hibernate.Stock"%>
<%@page import="com.Fertilizer.hibernate.GodownEntry"%>
<%@page import="com.Fertilizer.dao.GodownEntryDao"%>
<%@page import="com.Fertilizer.hibernate.CategoryDetailsBean"%>
<%@page import="com.Fertilizer.dao.CategoryDetailsDao"%>
<% boolean isHome=false;%>
<%@include file="commons/header.jsp"%>
<%@page import="java.util.List"%>
<head>
<script src="/Shop/staticContent/js/stockDetails.js"></script>
<!-- <script src="/Shop/staticContent/js/jquery-1.12.3.min.js"></script>
<script type="text/javascript" src="/Shop/staticContent/js/selectjj.js"></script>
<script type="text/javascript" src="/Shop/staticContent/js/buttom.js"></script>
<script src="/Shop/staticContent/js/jquery.min.js"></script>
<script src="/Shop/staticContent/js/jquery.jqgrid.min.js"></script>
<script src="/Shop/staticContent/js/jquery.dataTables.js" type="text/javascript"></script>
<script type="text/javascript" src="/Shop/staticContent/js/jqueryUi.js"></script>

<link href="/Shop/WebContent/staticContent/css/dataTa.css" rel="stylesheet" type="text/css" media="all" />
<link href="/Shop/staticContent/css/dataTables.jqueryui.min.css" rel="stylesheet" type="text/css" media="all">
<link href="/Shop/staticContent/css/select.css" rel="stylesheet" type="text/css" media="all">
<link href="/Shop/staticContent/css/button.css" rel="stylesheet" type="text/css" media="all">
<link rel="stylesheet" href="/Shop/staticContent/css/jquery-ui.min.css">
<link rel="stylesheet" href="/Shop/staticContent/css/ui.jqgrid.min.css"> -->


<!-- <script src="/Shop/staticContent/js/jquery-1.12.3.min.js"></script>
<script type="text/javascript" src="/Shop/staticContent/js/selectjj.js"></script>
<script type="text/javascript" src="/Shop/staticContent/js/buttom.js"></script>
<script src="/Shop/staticContent/js/jquery.min.js"></script>
<script src="/Shop/staticContent/js/jquery.jqgrid.min.js"></script>
<script type="text/javascript" src="/Shop/staticContent/js/jqueryUi.js"></script>
<script src="/Shop/staticContent/js/jquery.dataTables.js" type="text/javascript"></script>
<link href="/Shop/WebContent/staticContent/css/dataTa.css" rel="stylesheet" type="text/css" media="all" />
<link href="/Shop/staticContent/css/dataTables.jqueryui.min.css" rel="stylesheet" type="text/css" media="all">
<link href="/Shop/staticContent/css/select.css" rel="stylesheet" type="text/css" media="all">
<link href="/Shop/staticContent/css/button.css" rel="stylesheet" type="text/css" media="all">
<link rel="stylesheet" href="/Shop/staticContent/css/jquery-ui.min.css">
<link rel="stylesheet" href="/Shop/staticContent/css/ui.jqgrid.min.css"> -->

<!-- For datatable to pdf,print,excel etc conversion -->
<!-- <script type="text/javascript" src="//code.jquery.com/jquery-1.12.4.js"></script> 
 <script type="text/javascript" src="https://cdn.datatables.net/1.10.15/js/jquery.dataTables.min.js"></script>
<script type="text/javascript" src="https://cdn.datatables.net/buttons/1.3.1/js/dataTables.buttons.min.js"></script>
<script type="text/javascript" src="//cdn.datatables.net/buttons/1.3.1/js/buttons.flash.min.js"></script>
<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>
<script type="text/javascript" src="//cdn.rawgit.com/bpampuch/pdfmake/0.1.27/build/pdfmake.min.js"></script>

<script type="text/javascript" src="//cdn.rawgit.com/bpampuch/pdfmake/0.1.27/build/vfs_fonts.js"></script>
<script type="text/javascript" src="//cdn.datatables.net/buttons/1.3.1/js/buttons.html5.min.js"></script>
<script type="text/javascript" src="//cdn.datatables.net/buttons/1.3.1/js/buttons.print.min.js"></script>
<link rel="stylesheet" href="https://cdn.datatables.net/1.10.15/css/jquery.dataTables.min.css"> 
<link rel="stylesheet" href="https://cdn.datatables.net/buttons/1.3.1/css/buttons.dataTables.min.css">
<<<<<<< HEAD


<style>
.btn-default,.btn-primary,.btn-success,.btn-info,.btn-warning,.btn-danger
 {
    border-radius:23px;
}

<link rel="stylesheet" href="/Shop/staticContent/css/shopstyle.css"> -->


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
<style>
.container-fluid {
	overflow: hidden;
}
.pagination {
    float: right !important;
}
.pagination a{
   color: #333333;
   font-size: 15px;
   font-weight: 600;
}
.pagination a:hover{
   color: #00000;
}
.pagination span{
    font-weight: 700;
    font-size: 16px;
}
</style>
</head>
<script type="text/javascript">
function openBilling() {
		 window.location = '/Shop/jsp/allBilling.jsp';
}

</script>
<body>
<br/>
<br/>
<br/>
<br/>
<br/>
<div class="container-fluid" align="center"> 		
 	<div class="row">
		<div align="le">
			<h2 class="form-name style_heading">Low Stock Reports</h2>
		</div>
				  	
		<div class="row" align="center">
		    <div class="hr-width">
		  		<hr class="style-one">
		    </div>	
		</div>
	
	</div>
 		
 		
 		  <div id="lowStockReport" align="center">
    	<div id="lowStock" align="right">
		<label id="demo"></label>
		<script>
		   var date = new Date();
		   document.getElementById("demo").innerHTML = date.toDateString();
		</script>
	</div>

	<script type="text/javascript"> 
		$(document).ready(function () {
			var table=$("#list").dataTable({
				
				 fnRowCallback : function(nRow, aData, iDisplayIndex){
		                $("th:first", nRow).html(iDisplayIndex +1);
		               return nRow;
		            },

		            destroy: true,
			        searching: false,
			        "scrollY": 300,
			        "scrollX": true,
			        /* "paging":   false, */
			        
				
				  "footerCallback": function ( row, data, start, end, display ) {
			            var api = this.api(), data;
			 
			            // Remove the formatting to get integer data for summation
			            var intVal = function ( i ) {
			                return typeof i === 'string' ?
			                    i.replace(/[\$,]/g, '')*1 :
			                    typeof i === 'number' ?
			                        i : 0;
			            };
/*			 
			            // Total over all pages
			            total = api
			                .column( 4 )
			                .data()
			                .reduce( function (a, b) {
			                    return intVal(a) + intVal(b);
			                }, 0 ); 
			 			console.log(total); 
			 			
			 		
			            // Update footer
			            $( api.column( 4 ).footer() ).html(
			                'Rs'+' '+total
			            );
			            console.log( total);


			            total = api
		                .column( 5 )
		                .data()
		                .reduce( function (a, b) {
		                    return intVal(a) + intVal(b);
		                }, 0 ); 
		 			console.log(total); 
		 			
		 		
		            // Update footer
		            $( api.column( 5 ).footer() ).html(
		                'Rs'+' '+total
		            );
		            console.log( total);

		            total = api
	                .column( 6 )
	                .data()
	                .reduce( function (a, b) {
	                    return intVal(a) + intVal(b);
	                }, 0 ); 
	 			console.log(total); 
	 			
	 		
	            // Update footer
	            $( api.column( 6 ).footer() ).html(
	                'Rs'+' '+total
	            );
	            
	            console.log( total);

	            total = api
                .column( 7 )
                .data()
                .reduce( function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0 ); 
 			console.log(total); 
 			
 		
            // Update footer
            $( api.column( 7 ).footer() ).html(
                'Rs'+' '+total
            );
            console.log( total);
*/		            
			    }
			 
			});

			
			
		/* 	 var tableTools = new $.fn.dataTable.TableTools(table, {
					'sSwfPath':'//cdn.datatables.net/tabletools/2.2.4/swf/copy_csv_xls_pdf.swf',
						'aButtons':['copy','print','csv',{
						'sExtends':'xls',
						'sFileName':'Data.xls',
						'sButtonText': 'Save to Excel'
							}
						]
	      			}); */
			
	 			/* 	$(tableTools.fnContainer()).insertBefore('#list_wrapper'); */
			});
	</script>
		
	<%
		GoodsReceiveDao gDao=new GoodsReceiveDao();
		List Lis1 = gDao.lowStockReport(request);	
	%>
	<br/>
	<div id="demo_jui" align="center">
		<table class="table table-bordered table-striped table-condensed cf" style="text-align: center;align-content: center;" id="list" class="display" border="1">
			<thead>
				<tr>
	               <th>Product Name</th>
				   <th>Company Name</th>
				   <!-- <th>Packing</th> -->
				   <!-- <th>Quantity</th> -->
				   <th>Unit</th>
				   <th>Available Quantity</th>
				   <th>Shop Name</th>
				</tr>
			</thead>			
			<tbody>
   				<%
					for(int i=0;i<Lis1.size();i++){
					StockDetail sdBean = (StockDetail)Lis1.get(i);
				%>
				<tr>
					<td class="align"><%=sdBean.getProductName()%></td>
					<td class="align"><%=sdBean.getCompanyName()%></td>
					<%-- <td class="align"><%=sdBean.getWeight()%></td>
					<td class="align"><%=sdBean.getQuantity()%></td> --%>
					<td class="align"><%=sdBean.getUnit()%></td>
					<td class="align"><%=sdBean.getAvailableeQuantity()%></td>
					<td class="align"><%=sdBean.getShopname()%></td>
				</tr>
				<%
					}
				%>				
			</tbody>
		</table>
		                            <!--  <div class="pagination-page">
                                            <nav aria-label="...">
                                               <ul class="pagination" style="margin-top:-10px; margin-bottom: 40px;">
                                                   <li class="page-item disabled">
                                                        <a class="page-link" href="#">Previous</a>
                                                   </li>
                                                <li class="page-item"><a class="page-link" href="#">1</a></li>
                                                   <li class="page-item">
                                                        <span class="page-link">
                                                                1
                                                       <span class="sr-only">(current)</span>
                                                       </span>
                                                   </li>
                                                 <li class="page-item"><a class="page-link" href="#">3</a></li>
                                                   <li class="page-item">
                                                        <a class="page-link" href="#">Next</a>
                                                   </li>
                                               </ul>
                                           </nav>
                                       </div> -->
									</div>
									
		<div class="row buttons-margin" align="center">
			<input type="button" id="btn" class="btn btn-primary" name="btn" onclick="openBilling()" value="Back">	
		</div>
	
	</div>
    </div>
   
</body>
<jsp:include page="commons/footer.jsp"></jsp:include>