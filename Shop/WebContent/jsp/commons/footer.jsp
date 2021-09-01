<!-- 	
<footer style="position: relative;">
	<nav class="navbar navbar-inverse" style="min-height: 18px;">
		<div class="container-fluid">
			<div class="navbar-header">
				<div >
              <p style="font-size:12px">@COPYRIGHT ADITY BIRLACAPITAL</p>
				</div>			
			</div>
		</div>
	</nav>
</footer> -->


	<%@page import="java.util.Calendar"%>
<%
		int year = Calendar.getInstance().get(Calendar.YEAR);
	%>

<style>
.footer 
{
   position: fixed;
   left: 0;
   Z-INDEX: 999;
   bottom: 0;
   width: 100%;
   /* background-color: #B4041B; */
   background-color: #393836;;
   /* color: white; */
   color: white;
    font-size: 0px; 
   text-align: center;   
}
</style>

</head>
<body>

<div class="footer " >
 <%-- <h4>Copyright © <%=year%><!-- <a  href="http://www.embel.co.in" class="foot" style="color: white;"> --> Embel Technology Pvt. Ltd.</a></h4> --%>
  <h4>Copyright © <%=year%> Embel Technology Pvt. Ltd.</h4>
  <!-- <b style=" font-size: 15px">ctrl+s Supplier Details &emsp;&emsp; ctrl+b Billing &emsp;&emsp; ctrl+g Good Receive &emsp;&emsp; alt+s Stock Reports</b> -->
</div>

</body>
</html> 