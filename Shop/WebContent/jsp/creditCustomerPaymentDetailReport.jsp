<%@page import="com.Fertilizer.bean.CreditCustPaymentDetail"%>
<%@page import="com.Fertilizer.dao.CustomerPaymentDao"%>
<% boolean isHome=false;%>
<%@include file="commons/header.jsp"%>
<%@page import="java.util.List"%>
<%@page import="com.Fertilizer.bean.ProductDetailsForReports"%>
<%@page import="com.Fertilizer.dao.ProductDetailsDao"%>
<%@page import="com.Fertilizer.dao.CategoryDetailsDao"%>
<%@page import="com.Fertilizer.hibernate.CategoryDetailsBean"%>

<head>
<link href="/Shop/WebContent/staticContent/css/dataTa.css" rel="stylesheet" type="text/css" media="all" />
	<link href="/Shop/staticContent/css/dataTables.jqueryui.min.css"  rel="stylesheet" type="text/css" media="all">
	<link rel="stylesheet" href="/Shop/staticContent/css/tabDemo.css">
 	<link rel="stylesheet" href="/Shop/staticContent/css/jquery-ui.min.css">
    <link rel="stylesheet" href="/Shop/staticContent/css/ui.jqgrid.min.css">
    <script type="text/javascript" src="//code.jquery.com/jquery-1.12.4.js"></script> 
 <script type="text/javascript" src="https://cdn.datatables.net/1.10.15/js/jquery.dataTables.min.js"></script>
<script type="text/javascript" src="https://cdn.datatables.net/buttons/1.3.1/js/dataTables.buttons.min.js"></script>
<script type="text/javascript" src="//cdn.datatables.net/buttons/1.3.1/js/buttons.flash.min.js"></script>
<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>
<script type="text/javascript" src="//cdn.rawgit.com/bpampuch/pdfmake/0.1.27/build/pdfmake.min.js"></script>
<script type="text/javascript" src="/Shop/staticContent/js/bootstrap.js"></script>
 <script type="text/javascript" src="/Shop/staticContent/js/bootbox.min.js"></script>
<script type="text/javascript" src="//cdn.rawgit.com/bpampuch/pdfmake/0.1.27/build/vfs_fonts.js"></script>
<script type="text/javascript" src="//cdn.datatables.net/buttons/1.3.1/js/buttons.html5.min.js"></script>
<script type="text/javascript" src="//cdn.datatables.net/buttons/1.3.1/js/buttons.print.min.js"></script>
<link rel="stylesheet" href="https://cdn.datatables.net/1.10.15/css/jquery.dataTables.min.css"> 
<link rel="stylesheet" href="https://cdn.datatables.net/buttons/1.3.1/css/buttons.dataTables.min.css">
    <script src="/Shop/staticContent/js/jquery.min.js"></script>
    <script src="/Shop/staticContent/js/jquery.jqgrid.min.js"></script>
	<script src="/Shop/staticContent/js/jquery.dataTables.js" type="text/javascript"></script>
	<script type="text/javascript" src="/Shop/staticContent/js/jqueryUi.js"></script>


<link rel="stylesheet" href="/Shop/staticContent/css/shopstyle.css">
<style>
.container-fluid {
	overflow: hidden;
}
</style>
</head>

 <div class="container-fluid"> 
 		
 		<div class="row">
			<div align="center" style="margin-top: 75px">
				  <h2 class="form-name style_heading">Credit Customer Payment details</h2>
			</div>
				 	
			 <div class="row" align="center">
				<div class="hr-width">
					<hr class="style-one">
				</div>	
			  </div>
		</div>
   
    <!-------- All Credit Customers ---------->
   
   	<div id="report" align="right">
		<label id="demo"></label>
		<script>
		   var date = new Date();
		   document.getElementById("demo").innerHTML = date.toDateString();
		</script>
	</div>

	<script type="text/javascript"> 
		$(document).ready(function () {
			var table=$("#list").dataTable({
				
				"scrollX": true,
				"scrollY": 300,
				
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

	
	<%
	CustomerPaymentDao dao=new CustomerPaymentDao();
	List Lis1=dao.getCreditCustomerPaymentDetailForReport();
	
	%>
	<div id="demo_jui">
		<table id="list" class="display table-bordered">
			<thead>
				<tr>
					<th>Customer Name</th>
					<th>Bill Number</th>
					<th>Total Amount</th>
					<th>Balance Amount</th>
	                <th>Payment Type</th>
					<th>Payment Amount</th>
					<th>Payment Mode</th>
					<th>Accountantant Name</th>
				</tr>
			</thead>			
			<tbody>
   				<%
					for(int i=0;i<Lis1.size();i++){
						CreditCustPaymentDetail pro = (CreditCustPaymentDetail)Lis1.get(i);
				%>
				<tr>
					<td class="align"><%=pro.getCreditCustomerFirstName()%></td>
					<td class="align"><%=pro.getBillNo()%></td>
					<td class="align"><%=pro.getTotalAmount()%></td>
					<td class="align"><%=pro.getBalanceAmount()%></td>
					<td class="align"><%=pro.getPaymentType()%></td>
					<td class="align"><%=pro.getPaymentAmount()%></td>
					<td class="align"><%=pro.getPaymentMode()%></td>
					<td class="align"><%=pro.getAccountantName()%></td>
					
				</tr>
				<%
					}
				%>
				
			</tbody>
		</table>
	</div>
 </div>
 <jsp:include page="commons/footer.jsp"></jsp:include>