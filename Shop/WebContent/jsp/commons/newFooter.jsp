<!-- Meghraj ShortCuts upto line 162 -->


<!-- <html>
<head>
	<link href="/Fertilizer/staticContent/css/bootstrap.css" rel="stylesheet">
	<link href="/Fertilizer/staticContent/css/bootstrap.min.css" rel="stylesheet">
	<script type="text/javascript" src="/Fertilizer/staticContent/js/bootstrap.js"> </script>
	<script type="text/javascript" src="/Fertilizer/staticContent/js/bootstrap.min.js"> </script>
	
	<style>
		.gradient {
   			 position: relative;
		}
		.gradient:after {
		    color:#000;
		    position: absolute;
		    top: 0;
		    left: 0;
		    z-index: -1;
		}
		.gradient h2 {
		    color: #117FB2;
		    -webkit-mask-box-image: -webkit-gradient(linear,
                left top, left bottom,
                color-stop(20%,rgba(0,0,0,1)),
                color-stop(100%,rgba(0,0,0,0)));
		}
	</style>
	
	<script type="text/javascript">
	
		function FertilizerBill(){
			window.location.href = "allBilling.jsp";
		}
		
		function seddAndPestiBill(){
			window.location.href = "seedAndPestiBill.jsp";
		}
		
		
		
		function customerEntry(){
			window.location.href = "customer_detail.jsp";
		}
		
		function categoryEntry(){
			window.location.href = "categoryDetails.jsp";	
		}
		
		function productEntry(){
			window.location.href = "product_detail.jsp";
		}
		
		function supplierEntry(){
			window.location.href = "supplierdetails.jsp";			
		}
		
		function godownEntry(){
			window.location.href = "godownDetails.jsp";
		}
		
		function expeditureEntry(){
			window.location.href = "expenditureDetails.jsp";
		}
		
		function advanceBooking(){
			window.location.href = "purchaseOrderDetails.jsp";
		}
		
		function goodReceive(){
			window.location.href = "goodsReceive.jsp";
		}
		
		function purchaseReturn(){
			window.location.href = "purchase_return.jsp";
		}
		
		function stockReport(){
			window.location.href = "stockReport.jsp";
		}
		
		function purchaseReport(){
			window.location.href = "purchaseReports.jsp";
		}
		
		function cashbookReport(){
			 window.location.href = "cashBookReports.jsp";
		}
		
		function creditDebitReport(){
			window.location.href = "AllCreditAmountReports.jsp";
		}
		
		function fertilizerBillCopy(){
			window.location.href = "SeedAndPesticideBillCOPY.jsp";
		}
		
		function seedAndPestiBillCopy(){
			window.location.href = "SeedAndPesticideBillCOPY.jsp";
		}
		
	</script>
	
</head>
<body>
	<div class="fluid-container">
	<div class="row footer navbar-fixed-bottom" style="background-color:#8c7674;">
	
		<div class="col-md-12">
			<div class="" align="center">
				<h4 class="gradient" align="center" style="color:white;">&copy Embel Technologies Pvt.Ltd</h4>
			</div>
		</div>
	
		<div class="col-md-12">
			<div class="table-responsive">
			  <marquee onmouseover="this.stop()" onmouseout="this.start()" scrollamount="4">			
			   <table class="table">
				<tbody>
					<tr>
						<div class="btn-group">
						
						    billing module
							<td><button type="button" class="btn btn-primary" onclick="FertilizerBill()">Fertilizer Bill<br/>Ctrl + F</button></td>
							<td><button type="button" class="btn btn-primary" onclick="seddAndPestiBill()">Seed & Pesticide Bill<br/>Ctrl + S</button></td>
							
							Master module
							<td><button type="button" class="btn btn-primary" onclick="customerEntry()">Customer Entry<br/>Alt + C</button></td>
							<td><button type="button" class="btn btn-primary" onclick="categoryEntry()">Category Entry<br/>Ctrl + Alt + T</button></td>
							<td><button type="button" class="btn btn-primary" onclick="productEntry()">Product Entry<br/>Alt + P</button></td>
							<td><button type="button" class="btn btn-primary" onclick="supplierEntry()">Supplier Entry<br/>Alt + S</button></td>
							<td><button type="button" class="btn btn-primary" onclick="godownEntry()">Godown Entry<br/>Alt + G</button></td>
							<td><button type="button" class="btn btn-primary" onclick="expeditureEntry()">Expenditure Entry<br/>Ctrl + Alt + E</button></td>
							<td><button type="button" class="btn btn-primary">Expence Entry<br/>Alt + E</button></td>
							
							purchase module
							<td><button type="button" class="btn btn-primary" onclick="advanceBooking()">Advance Booking<br/>Ctrl + A</button></td>
							<td><button type="button" class="btn btn-primary" onclick="goodReceive()">Goods Receive<br/>Ctrl + G</button></td>
							<td><button type="button" class="btn btn-primary" onclick="purchaseReturn()">Purchase Return<br/>Ctrl + R</button></td>
							
							stock module
							<td><button type="button" class="btn btn-primary" onclick="stockReport()">Stock Report<br/>Ctrl + Alt + S</button></td>
							<td><button type="button" class="btn btn-primary" onclick="purchaseReport()">Purchase Report<br/>Ctrl + Alt + P</button></td>
							<td><button type="button" class="btn btn-primary" onclick="cashbookReport()">CashBook Report<br/>Ctrl + Alt + C</button></td>
							<td><button type="button" class="btn btn-primary" onclick="creditDebitReport()">Credit/Debit Report<br/>Ctrl + Alt + M</button></td>
							
							bill copy module
							<td><button type="button" class="btn btn-primary" onclick="FertilizerBillCOPY.jsp">Fertilizer Bill Copy<br/>Ctrl + Shift + F</button></td>
							<td><button type="button" class="btn btn-primary" onclick="seedAndPestiBillCopy()">Seed & Pesticide Bill Copy<br/>Ctrl + Shift + S</button></td>
						
						</div>
					</tr>
				</tbody>
			  </table>
			</marquee>
		</div>
	  </div>
	 </div>
</div>
</body>
</html>  -->


<%-- 
<%@page import="java.util.List"%>
<%@page import="com.Fertilizer.bean.GoodsReceiveDetail"%>
<%@page import="com.Fertilizer.dao.GoodsReceiveDao"%>
<head>
<style>

a
{
	text-decoration: none;
	color: #111b47;
}

a:hover
{
	border-bottom: 1px dashed #ED971F;
	color: #ED971F;
}

/**** slider ****/

/* #slider, ul
{
	height: 60px;
}
 */
 
 table {
    border-collapse: collapse;
}

table, th, td {
    border: 1px solid black;
    
}
 /* for verticle scrolling */
 .ScrollStyle
{
    max-height: 150px;
    overflow-y: scroll;
}
#slider
{
	/* margin: auto; */
	margin-left: 30px;
	overflow: hidden;
	padding: 60px;
	border: 1px solid rgba(0, 0, 0, 0.15);
	margin-top: 50px;
	border-radius: 10px;
	box-shadow: 2px 2px 14px rgba(0, 0, 0, 0.25);
	position: relative;
	 width: 600px;
}

#slider li
{
	float: left;
	position: relative;
	width: 600px; 
	display: inline-block;
	height: 200px;
}

#slider ul
{
	list-style: none;
	position: absolute;
	left: 0px;
	top: 0px;
	width: 9000px;
	transition: left .3s linear;
	-moz-transition: left .3s linear;
	-o-transition: left .3s linear;
	-webkit-transition: left .3s linear;
	margin-left: -25px;
  font-family: century gothic;
  color: #666;
}

/*** Content ***/

.slider-container
{
	margin: 0 auto;
	padding: 0;
	 width: 550px;
  min-height: 180px;
  border-bottom: 1px solid #ccc;
   max-height: 150px;
    overflow-y: scroll;
}

.slider-container h4
{
 	color: #0A7FAD;
  text-shadow: -1px 0px 0px rgba(0, 0, 0, 0.50);
}

.slider-container  p
{
	margin: 10px 25px;
	font-weight: semi-bold;
	line-height: 150%;
	text-align: justify;
}

/*** target hooks ****/

@-webkit-keyframes slide-animation {
	0% {opacity:0;}
	2% {opacity:1;}
	20% {left:0px; opacity:1;}
	22.5% {opacity:0.6;}
	25% {left:-600px; opacity:1;}
	45% {left:-600px; opacity:1;}
	47.5% {opacity:0.6;}
	50% {left:-1200px; opacity:1;}
	70% {left:-1200px; opacity:1;}
	72.5% {opacity:0.6;}
	75% {left:-1800px; opacity:1;}
	95% {opacity:1;}
	98% {left:-1800px; opacity:0;} 
	100% {left:0px; opacity:0;}
}

#slider ul
{
	-webkit-animation: slide-animation 25s infinite;
}

/* use to paused the content on mouse over */

#slider ul:hover
{
	-moz-animation-play-state: paused;
	-webkit-animation-play-state: paused;
}

</style>
</head>
<div class="row form-group">
<div id="slider" class="col-md-5">
 
<ul>
	<li>
	<div class="slider-container">
    <h4>Fertilizer</h4>
		<%
										GoodsReceiveDao productForNotificationForferti2 = new GoodsReceiveDao();
			           						List<GoodsReceiveDetail> notificationProducts3 =productForNotificationForferti2.getAllFertilizerForStockNotification();
										
										%>
										
										<table>
											<tr>
											<th>Product Name</th>
											<th>Company Name</th>
											<th>Weight</th>
											<th>Stock</th>
											</tr>
										<%
								           for(int i=0;i<notificationProducts3.size();i++){
								        	   GoodsReceiveDetail goodsForNotificationFerti =(GoodsReceiveDetail)notificationProducts3.get(i);
										%>
										<tr>
										<td><%=goodsForNotificationFerti.getProductName()%></td>
										<td><%=goodsForNotificationFerti.getCompany()%></td>
										<td><%=goodsForNotificationFerti.getWeight()%></td>
										<td><%=goodsForNotificationFerti.getStock() %></td>
										<%
										}
							    		%>
							    		
							    		</tr>
							    		</table>
	</div>
	</li>
		<li>
		<div class="slider-container">
       <h4>Seed</h4>
		<%
										GoodsReceiveDao productForNotificationForSeed = new GoodsReceiveDao();
			           						List<GoodsReceiveDetail> notificationProducts1 =productForNotificationForSeed.getAllSeedAndPestiForStockNotification();
										
										%>
										
										<table>
											<tr>
											<th>Product Name</th>
											<th>Company Name</th>
											<th>Weight</th>
											<th>Batch Number</th>
											<th>Stock</th>
											
											</tr>
										<%
								           for(int i=0;i<notificationProducts1.size();i++){
								        	   GoodsReceiveDetail goodsForNotification1 =(GoodsReceiveDetail)notificationProducts1.get(i);
										%>
										<tr>
										<td><%=goodsForNotification1.getProductName()%></td>
										<td><%=goodsForNotification1.getCompany()%></td>
										<td><%=goodsForNotification1.getWeight()%></td>
										<td><%=goodsForNotification1.getBatchNumber() %></td>
										<td><%=goodsForNotification1.getStock() %></td>
										
										<%
										}
							    		%>
							    		
							    		</tr>
							    		</table>
	</div>
	</li>
		<li>
		<div class="slider-container">
       <h4>Pesticide</h4>
		<%
										GoodsReceiveDao productForNotificationForferti = new GoodsReceiveDao();
			           						List<GoodsReceiveDetail> notificationProducts2 =productForNotificationForferti.getPestiStockForStockNotification();
										
										%>
										
										<table>
											<tr>
											<th>Product Name</th>
											<th>Company Name</th>
											<th>Weight</th>
											<th>Batch Number</th>
											<th>Stock</th>
											</tr>
										<%
								           for(int i=0;i<notificationProducts2.size();i++){
								        	   GoodsReceiveDetail goodsForNotification2 =(GoodsReceiveDetail)notificationProducts2.get(i);
										%>
										<tr>
										<td><%=goodsForNotification2.getProductName()%></td>
										<td><%=goodsForNotification2.getCompany()%></td>
										<td><%=goodsForNotification2.getWeight()%></td>
										<td><%=goodsForNotification2.getBatchNumber() %></td>
										<td><%=goodsForNotification2.getStock() %></td>
										<%
										}
							    		%>
							    		</tr>
							    		</table>
	</div>
	</li>
		
</ul>
</div>


<div id="slider" class="col-md-offset-1 col-md-5 ">
 
<ul>
	<li>
	<div class="slider-container">
    <h4>Fertilizer</h4>
		<%
										GoodsReceiveDao productForNotificationForferti0 = new GoodsReceiveDao();
			           						List<GoodsReceiveDetail> notificationProducts0 =productForNotificationForferti0.getAllFertilizerForStockNotification();
										
										%>
										
										<table>
											<tr>
											<th>Product Name</th>
											<th>Company Name</th>
											<th>Weight</th>
											<th>Stock</th>
											</tr>
										<%
								           for(int i=0;i<notificationProducts0.size();i++){
								        	   GoodsReceiveDetail goodsForNotificationFerti0 =(GoodsReceiveDetail)notificationProducts0.get(i);
										%>
										<tr>
										<td><%=goodsForNotificationFerti0.getProductName()%></td>
										<td><%=goodsForNotificationFerti0.getCompany()%></td>
										<td><%=goodsForNotificationFerti0.getWeight()%></td>
										<td><%=goodsForNotificationFerti0.getStock() %></td>
										<%
										}
							    		%>
							    		
							    		</tr>
							    		</table>
	</div>
	</li>
		<li>
		<div class="slider-container">
       <h4>Seed</h4>
		<%
										GoodsReceiveDao productForNotificationForSeed8 = new GoodsReceiveDao();
			           						List<GoodsReceiveDetail> notificationProducts8 =productForNotificationForSeed8.getAllSeedAndPestiForStockNotification();
										
										%>
										
										<table>
											<tr>
											<th>Product Name</th>
											<th>Company Name</th>
											<th>Weight</th>
											<th>Batch Number</th>
											<th>Stock</th>
											
											</tr>
										<%
								           for(int i=0;i<notificationProducts8.size();i++){
								        	   GoodsReceiveDetail goodsForNotification8 =(GoodsReceiveDetail)notificationProducts8.get(i);
										%>
										<tr>
										<td><%=goodsForNotification8.getProductName()%></td>
										<td><%=goodsForNotification8.getCompany()%></td>
										<td><%=goodsForNotification8.getWeight()%></td>
										<td><%=goodsForNotification8.getBatchNumber() %></td>
										<td><%=goodsForNotification8.getStock() %></td>
										
										<%
										}
							    		%>
							    		
							    		</tr>
							    		</table>
	</div>
	</li>
		<li>
		<div class="slider-container">
       <h4>Pesticide</h4>
		<%
										GoodsReceiveDao productForNotificationForferti6 = new GoodsReceiveDao();
			           						List<GoodsReceiveDetail> notificationProducts6 =productForNotificationForferti6.getPestiStockForStockNotification();
										
										%>
										
										<table>
											<tr>
											<th>Product Name</th>
											<th>Company Name</th>
											<th>Weight</th>
											<th>Batch Number</th>
											<th>Stock</th>
											</tr>
										<%
								           for(int i=0;i<notificationProducts6.size();i++){
								        	   GoodsReceiveDetail goodsForNotification6 =(GoodsReceiveDetail)notificationProducts6.get(i);
										%>
										<tr>
										<td><%=goodsForNotification6.getProductName()%></td>
										<td><%=goodsForNotification6.getCompany()%></td>
										<td><%=goodsForNotification6.getWeight()%></td>
										<td><%=goodsForNotification6.getBatchNumber() %></td>
										<td><%=goodsForNotification6.getStock() %></td>
										<%
										}
							    		%>
							    		</tr>
							    		</table>
	</div>
	</li>
		<li>
		<div class="slider-container">
      <h4>branch</h4>
		<p>EC</p>
	</div>
	</li>
</ul>
</div>



</div> --%>
