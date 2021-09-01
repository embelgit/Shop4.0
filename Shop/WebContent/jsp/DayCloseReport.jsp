
<%@page import="com.Fertilizer.bean.DayWiseSale"%>
<%@page import="com.Fertilizer.dao.FertilizerBillDao"%>
<%@page import="java.util.List"%>

<% boolean isHome=false;%>
<%@include file="commons/header.jsp"%>
	
	
<html>
	<head>
		<script type="text/javascript" src="/Shop/staticContent/js/selectjj.js"></script>
		<script type="text/javascript" src="/Shop/staticContent/js/buttom.js"></script>
		<link rel="stylesheet" href="/Shop/staticContent/css/jquery-ui.min.css">
	    <link rel="stylesheet" href="/Shop/staticContent/css/ui.jqgrid.min.css">
	    <script src="/Shop/staticContent/js/jquery.min.js"></script>
	    <script src="/Shop/staticContent/js/jquery.jqgrid.min.js"></script>
		<script src="/Shop/staticContent/js/jquery.dataTables.js" type="text/javascript"></script>
		<script type="text/javascript" src="/Shop/staticContent/js/jqueryUi.js"></script>
		
		<link href="/Shop/WebContent/staticContent/css/dataTa.css" rel="stylesheet" type="text/css" media="all" />
		<link href="/Shop/staticContent/css/dataTables.jqueryui.min.css"  rel="stylesheet" type="text/css" media="all">
		<link href="/Shop/staticContent/css/select.css"  rel="stylesheet" type="text/css" media="all">
		<link href="/Shop/staticContent/css/button.css"  rel="stylesheet" type="text/css" media="all">
	</head>
	<div class="row header_margin_top">
			    <div align="center">
			  		<h2 class="form-name style_heading">Day Close Report</h2>
			  	</div>
			 
    </div>
     <div class="row">
		     <div class="col-sm-offset-1 col-md-10">
				  		<hr style="border-top-color:#c1b1b1;">
		     </div>	
    </div>
	<div id="report">
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
				
				 "footerCallback": function ( row, data, start, end, display ) {
			            var api = this.api(), data;
			 
			            // Remove the formatting to get integer data for summation
			            var intVal = function ( i ) {
			                return typeof i === 'string' ?
			                    i.replace(/[\$,]/g, '')*1 :
			                    typeof i === 'number' ?
			                        i : 0;
			            };
			 
			            // Total over all pages
			            total = api
			                .column( 4 )
			                .data()
			                .reduce( function (a, b) {
			                    return intVal(a) + intVal(b);
			                }, 0 ); 
			 			console.log(total); 
			            // Total over this page
			            /* pageTotal = api
			                .column( 4, { page: 'current'} )
			                .data()
			                .reduce( function (a, b) {
			                    return intVal(a) + intVal(b);
			                }, 0 ); */
			 
			            // Update footer
			            $( api.column( 4 ).footer() ).html(
			                'Rs'+' '+total
			            );
			            console.log( total);
			            
			            // Total over this page       
			            /* pageTotal1 = api
		                .column( 5, { page: 'current'} )
		                .data()
		                .reduce( function (a, b) {
		                    return intVal(a) + intVal(b);
		                }, 0 ); */
		 
		               /*  newtotal = api
		                .column( 5 )
		                .data()
		                .reduce( function (a, b) {
		                    return intVal(a) + intVal(b);
		                }, 0 ); 
		 			console.log(total); 
		            // Update footer
		            $( api.column( 5 ).footer() ).html(
		                'Rs'+' '+newtotal
		            );
		            console.log( newtotal);
			             */
			            
			            
			        }
			
			
			
				
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

<body id="dt_example">
	<%
	FertilizerBillDao dao=new FertilizerBillDao();
	List Lis1=dao.getAllClosingReport();
	
	%>
	<div id="demo_jui">
		<table id="list" class="display" border="1">
			<thead>
				<tr>
					<th>Customer Bill </th>
	                <th>Item Name</th>
					<th>Quantity</th>
					<th>Sale Price</th>
					<th>TotalAmount </th>
					<th>Payment Mode</th>	
				
					
				</tr>
			</thead>
			<tfoot>
            <tr>
                <th colspan="4" style="text-align:right">Total:</th>
                <th></th>
              
               
            </tr>
        </tfoot>
			
			<tbody>
   				<%
					for(int i=0;i<Lis1.size();i++){
					DayWiseSale catB=(DayWiseSale)Lis1.get(i);
					
				%>
				
				<tr>
					<td class="align"><%=catB.getCustomerBill()%></td>
					<td class="align"><%=catB.getItemName()%></td>
					<td class="align"><%=catB.getQuantity1()%></td>
					<td class="align"><%=catB.getPrice()%></td>
					<td class="align"><%=catB.getTotAmount()%></td>
					<td class="align"><%=catB.getPaymentMode()%></td>
				</tr>
	
				<%
					}
				%>
				
			</tbody>
		</table>
	</div>
</body>
<jsp:include page="commons/footer.jsp"></jsp:include>
</html>
