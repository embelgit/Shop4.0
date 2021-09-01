<%@page import="com.Fertilizer.utility.PropertiesHelper"%>
<%@page import="com.Fertilizer.hibernate.AccessControlBean"%>
<%@page import="com.Fertilizer.hibernate.UserDetailsBean"%>
<%@page import="com.Fertilizer.utility.HibernateUtility"%>

<%@ page contentType="text/html; charset=utf-8" language="java" %>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />


<meta name="description" content="" />
                 <%  String type1= "";
                     String type2= "";
                     String name1 = "";
                     String shopName = "";
                     String onlyShopName = "";
                     
		             if (session != null)
		             {			
				         if (session.getAttribute("user") != null)
				         {
						     name1 = (String) session.getAttribute("user");
						     shopName = (String) session.getAttribute("shopName");	
						     
			            	 System.out.println("====================header ===========  "+shopName);
			            	 
				             HibernateUtility hbu1=HibernateUtility.getInstance();
				             Session session2=hbu1.getHibernateSession();
				             
				             String ShopNameWithoutId = shopName.substring(4);
				             onlyShopName = ShopNameWithoutId.trim();
				   
				             org.hibernate.Query query1 = session2.createQuery("from AccessControlBean where userName =:usr");
				             query1.setParameter("usr", name1);
				             AccessControlBean userDetail1 = (AccessControlBean) query1.uniqueResult();
				             type1 = userDetail1.getType();
				             type2 = userDetail1.getType();
				     	}
					    else
				        {
					    	response.sendRedirect("/Shop/jsp/login.jsp");
					     	out.println("Please Login ");
				        }
		           	}
		            else
		            {
					     response.sendRedirect("/Shop/jsp/login.jsp");
					     out.println("Please Login ");
				    }
	           %>


<!-- To toggle between marathi and english version -->

<% 
   String abc = "english";
   if (session != null) {
   
   if (session.getAttribute("lan") != null) {
	   abc = (String) session.getAttribute("lan");
   }}
   else{
	   abc="english";
   }
 %>



<% String  contextPath=request.getContextPath(); %>
<%-- <% String path="";if(isHome)path="jsp\\"; %> --%>
<% String path="";if(isHome)path="jsp\\"; %>
<%@page import="org.hibernate.Session"%>

<%@page import="com.Fertilizer.dao.GoodsReceiveDao"%>
<%@page import="com.Fertilizer.bean.GoodsReceiveDetail"%>
<%@page import="java.util.List"%>
<%@page import="com.Fertilizer.hibernate.ProductDetailsBean"%>
<%@page import="com.Fertilizer.dao.ProductDetailsDao"%>



<html>
	<head>
	
	
	
		<meta name="viewport" content="width=device-width , initial-scale=1">
 		<title><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("Embel") %> <%}%> <%if(abc.equals("english")){%>Embel Technologies Pvt Ltd.<%}%></title>
		<script src="/Shop/staticContent/js/logout.js"></script>
		
		<script type="text/javascript" src="/Shop/staticContent/js/jquery-1.12.3.min.js"></script>
		<script type="text/javascript"  src="/Shop/staticContent/js/bootstrap.min.js"></script>
		
		<link rel="stylesheet" href="/Shop/staticContent/css/bootstrap.min.css">
 		<link rel="stylesheet" type="text/css" href="/Shop/staticContent/y_css/style.css" />
  		 
  		 <!----------------------- Offline glyphicons used for footer.jsp-------------------------------------------------------- -->
  		 
<link href="/Shop/staticContent/css/bootstrap.css" rel="stylesheet">
<link href="/Shop/staticContent/css/bootstrap.min.css" rel="stylesheet">
<link href="/Shop/staticContent/css/bootstrap-theme.css" rel="stylesheet">
<link href="/Shop/staticContent/css/bootstrap-theme.min.css" rel="stylesheet">
<!-- Font awesome (social icon) -->
<link href="/Shop/staticContent/css/font-awesome.css" rel="stylesheet">
<link href="/Shop/staticContent/css/font-awesome.min.css" rel="stylesheet">

<script type="text/javascript" src="/Shop/staticContent/js/bootstrap.js"> </script>
<script type="text/javascript" src="/Shop/staticContent/js/bootstrap.min.js"> </script>
<script type="text/javascript" src="/Shop/staticContent/js/jquery.min.js"> </script>

<!-- this js file is used to shortcut  -->

<script type="text/javascript" src="/Shop/staticContent/js/shortcut.js"> </script>

<link href="/Shop/staticContent/fonts/glyphicons-halflings-regular.eot" >
<link href="/Shop/staticContent/fonts/glyphicons-halflings-regular.svg" >
<link href="/Shop/staticContent/fonts/glyphicons-halflings-regular.ttf" >
<link href="/Shop/staticContent/fonts/glyphicons-halflings-regular.woff" >
<link href="/Shop/staticContent/fonts/glyphicons-halflings-regular.woff2" >

<!-- Font awesome (social icon) -->
<link href="/Shop/staticContent/fonts/fontawesome-webfont.eot" >
<link href="/Shop/staticContent/fonts/fontawesome-webfont.svg" >
<link href="/Shop/staticContent/fonts/fontawesome-webfont.ttf" >
<link href="/Shop/staticContent/fonts/fontawesome-webfont.woff" >
<link href="/Shop/staticContent/fonts/fontawesome-webfont.woff2" >
<link href="/Shop/staticContent/fonts/FontAwesome.otf" >

		<!------------------------------------------ Shortcut.jsp styles -------------------------------------------------->

<script type="text/javascript" src="/Shop/staticContent/js/bootstrap.js"> </script>
<script type="text/javascript" src="/Shop/staticContent/js/bootstrap.min.js"> </script>
<link href="/Shop/staticContent/css/bootstrap.css" rel="stylesheet">
<link href="/Shop/staticContent/css/bootstrap.min.css" rel="stylesheet">
<link href="/Shop/staticContent/css/bootstrap-theme.css" rel="stylesheet">
<link href="/Shop/staticContent/css/bootstrap-theme.min.css" rel="stylesheet">


<!-- All shortcut key's code here -->

<script type="text/javascript">

	/* Master Moudule keys */
	
	//Customer Entry
/* 	shortcut.add("alt+c", function() {
	    window.location.href = "customer_detail.jsp";
	});
	
	//Category Entry
	shortcut.add("ctrl+alt+t", function() {
	    window.location.href = "categoryDetails.jsp";
	});
	
	//product Entry
	shortcut.add("alt+p", function() {
	    window.location.href = "product_detail.jsp";
	});
	*/
	//supplier Entry
	shortcut.add("ctrl+s", function() {
	    window.location.href = "supplierdetails.jsp";
	});
	/*
	//godown Entry
	shortcut.add("alt+g", function() {
	    window.location.href = "godownDetails.jsp";
	});
	
	//expenditure Entry
	shortcut.add("ctrl+alt+e", function() {
	    window.location.href = "expenditureDetails.jsp";
	});
	
	//expence Entry
	shortcut.add("alt+e", function() {
	    window.location.href = "expenseDetailsForBillingAndGoodsReceive.jsp";
	});
	
	//tax Entry
	shortcut.add("alt+t", function() {
	    window.location.href = "tax.jsp";
	});
	
	//measuringUnits Entry
	shortcut.add("alt+m", function() {
	    window.location.href = "measuringUnits.jsp";
	});
	
	/* BIlling Moudle keys */
	
	//Fertilizer Bill 
	 shortcut.add("ctrl+b", function() {
	    window.location.href = "allBilling.jsp";
	});
	/*
	//seed Bill 
	shortcut.add("ctrl+s", function() {
	    window.location.href = "seedAndPestiBill.jsp";
	});
	
	
	/* Purchase moudle keys */
	
	//advance booking
	/* shortcut.add("ctrl+a", function() {
	    window.location.href = "purchaseOrderDetails.jsp";
	});
	*/
	//good receive 
	shortcut.add("ctrl+g", function() {
	    window.location.href = "goodsReceive.jsp";
	});
	/*
	//purchase return
	shortcut.add("ctrl+r", function() {
	    window.location.href = "purchase_return.jsp";
	});
	 */ 
	
	/* Report mouble keys */
	
	// stock report
	 shortcut.add("alt+s", function() {
	    window.location.href = "stockReport.jsp";
	});
	/*
	
	// purchase report
	shortcut.add("ctrl+alt+p", function() {
	    window.location.href = "purchaseReports.jsp";
	});
	
	// cashBook report
	shortcut.add("ctrl+alt+c", function() {
	    window.location.href = "cashBookReports.jsp";
	});
	
	// All credit/debit report
	shortcut.add("ctrl+alt+m", function() {
	    window.location.href = "AllCreditAmountReports.jsp";
	});
	 */
	
	/* Bill Copy Mouble keys */
	
	//Fertilizer bill 
/*	shortcut.add("ctrl+shift+f", function() {
	    window.location.href = "FertilizerBillCOPY.jsp";
	});
	
	//seed bill copy
	shortcut.add("ctrl+shift+s", function() {
	    window.location.href = "SeedAndPesticideBillCOPY.jsp";
	});	 */
	
</script>


 
<!--  for notification Expiry alert -->
<!-- <link rel="stylesheet" href="/Fertilizer/staticContent/css/notofication.css"> -->
 
 <!-------------------------------- header style -------------------------------------------------------------------------------------------------------->	
 
<!-- <link rel="stylesheet" href="http://netdna.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"> -->
<script src="/Shop/staticContent/y_js/prefixfree.min.js"></script>
<script src="/Shop/SMT/staticContent/y_js/modernizr.min.js"></script>
<style>
@import url(http://fonts.googleapis.com/css?family=roboto:400,400italic,600,700,800);

*,
html,
body,
div,
dl,
dt,
dd,
ul,
ol,
li,
h1,
h2,
h3,
h4,
h5,
h6,
pre,
form,
label,
fieldset,
input,
p,
blockquote,
th,
td {
  margin: 0;
  padding: 0;
}

article,
aside,
figure,
footer,
header,
hgroup,
nav,
section { display: block; }

* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

html { -webkit-font-smoothing: antialiased; }

a {
  color: #BA0707;
  text-decoration: none;
}

a:hover { color: #BA0707; }

body {
  
  color: #E95546;
  font: 14px "roboto", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  line-height: 1;
  width: 100%;
}

nav {
  display: block;
  background:#393836;
}

.menu { display: block; }

.menu li {
  display: inline-block;
  position: relative;
  z-index: 100;
}

.menu li:first-child { margin-left: 0; }

.menu li a {
  font-weight: 600;
  text-decoration: none;
  padding: 15px 15px;
  display: block;
  color: #fff;
  transition: all 0.2s ease-in-out 0s;
}

.menu li a:hover,
.menu li:hover>a {
  color: #fff;
  background: cadetblue;
}

.menu ul {
  visibility: hidden;
  opacity: 0;
  margin: 0;
  padding: 0;
  width: 170px;
  position: absolute;
  left: 0px;
  background: #fff;
  z-index: 99;
  transform: translate(0, 20px);
  transition: all 0.2s ease-out;
}

.menu ul:after {
  bottom: 100%;
  left: 20%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
  border-color: rgba(255, 255, 255, 0);
  border-bottom-color: #fff;
  border-width: 6px;
  margin-left: -6px;
}

.menu ul li {
  display: block;
  float: none;
  background: none;
  margin: 0;
  padding: 0;
}

.menu ul li a {
      font-size: 15px;
    font-weight: bold;
    display: block;
    color: #ffffff;
    background: #393836;
}

.menu ul li a:hover,
.menu ul li:hover>a {
  background:  #ff9514;
  color: #fff;
}

.menu li:hover>ul {
  visibility: visible;
  opacity: 1;
  transform: translate(0, 0);
}

.menu ul ul {
  left: 169px;
  top: 0px;
  visibility: hidden;
  opacity: 0;
  transform: translate(20px, 20px);
  transition: all 0.2s ease-out;
}

.menu ul ul:after {
  left: -6px;
  top: 10%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
  border-color: rgba(255, 255, 255, 0);
  border-right-color: #fff;
  border-width: 6px;
  margin-top: -6px;
}

.menu li>ul ul:hover {
  visibility: visible;
  opacity: 1;
  transform: translate(0, 0);
}

.responsive-menu {
  display: none;
  width: 100%;
  padding: 20px 15px;
  background: #E95546;
  color: #fff;
  text-transform: uppercase;
  font-weight: 600;
}

.responsive-menu:hover {
  background: #E95546;
  color: #fff;
  text-decoration: none;
}

a.homer
 /* { background: #ab8da0; } */
 @media (min-width: 768px) and (max-width: 979px) {

.mainWrap { width: 768px; }

.menu ul { top: 37px; }

.menu li a { font-size: 12px; }

a.homer { background: #E95546; }
}
 @media (max-width: 767px) {

.mainWrap {
  width: auto;
  padding: 50px 20px;
}

.menu { display: none; }

.responsive-menu { display: block; }

nav {
  margin: 0;
  background: none;
}

.menu li {
  display: block;
  margin: 0;
}

.menu li a {
  background: #fff;
  color: #797979;
}

.menu li a:hover,
.menu li:hover>a {
  background: #8c7674;
  color: #fff;
}

.menu ul {
  visibility: hidden;
  opacity: 0;
  top: 0;
  left: 0;
  width: 100%;
  transform: initial;
}

.menu li:hover>ul {
  visibility: visible;
  opacity: 1;
  position: relative;
  transform: initial;
}

.menu ul ul {
  left: 0;
  transform: initial;
}

.menu li>ul ul:hover { transform: initial; }
}
</style>
</head>
            	
<body style="margin-bottom:125px;height: 981px;">
<img alt="" src="/Shop/staticContent/images/company-logo.png" style="width: 400px;height: auto;position: fixed;right: 8px;top: 46%;left: 39%;opacity: 0.1;z-index: -1;"/>
<nav class="navbar navbar-fixed-top"> 
<a id="resp-menu" class="responsive-menu" href="#"><i class="fa fa-reorder"></i><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("menu") %> <%}%> <%if(abc.equals("english")){%>Menu<%}%>  </a>
  <ul class="menu">
    <li><a class="homer" href="<%=path%>indexNew.jsp"><i class="fa fa-home"></i><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("home") %> <%}%> <%if(abc.equals("english")){%>HOME<%}%></a>
     
    </li>
      <%
    			  if(type1.equals("account") || type1.equals("admin")){
    	  
      %>	
    <li><a href="<%=path%>categoryDetails.jsp" ><i class="fa fa-address-book-o"></i><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("master") %> <%}%> <%if(abc.equals("english")){%>Master<%}%></a>
      <ul class="sub-menu">
      
      			<li><a href="<%=path%>categoryDetails.jsp"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("measuringUnits") %> <%}%> <%if(abc.equals("english")){%>Category<%}%></a></li>
      			<li><a href="<%=path%>tax.jsp"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("taxDetails") %> <%}%> <%if(abc.equals("english")){%>Tax Details<%}%></a></li>
      			<li><a href="<%=path%>measuringUnits.jsp"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("measuringUnits") %> <%}%> <%if(abc.equals("english")){%>Measuring Units<%}%></a></li>
      			<li><a href="<%=path%>product_detail.jsp" accesskey="q"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("productDetails") %> <%}%> <%if(abc.equals("english")){%>Product Details<%}%></a></li>
      			<li><a href="<%=path%>supplierdetails.jsp" accesskey="r"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("supplierdetails") %> <%}%> <%if(abc.equals("english")){%>Supplier Details<%}%></a></li>
      			<li><a href="<%=path%>cashcustomerdetail.jsp" accesskey="r"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("cashdetails") %> <%}%> <%if(abc.equals("english")){%>Cash Customer Details<%}%></a></li>
       			<li><a href="<%=path%>customer_detail.jsp" accesskey="t"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("customerdetails") %> <%}%> <%if(abc.equals("english")){%>Credit Customer Details<%}%></a></li>
				<li><a href="<%=path%>expenditureDetails.jsp"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("expenditureDetails") %> <%}%> <%if(abc.equals("english")){%>Expenditure Details<%}%></a></li>
				<li><a href="<%=path%>partnerDetails.jsp"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("partnerDetails") %> <%}%> <%if(abc.equals("english")){%>Partner Details<%}%></a></li>
				<li><a href="<%=path%>bank_details.jsp"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("bankDetails") %> <%}%> <%if(abc.equals("english")){%>Bank Details<%}%></a></li>
				
				<%-- <li><a href="<%=path%>categoryDetails.jsp" accesskey="y" ><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("categoryDetails") %> <%}%> <%if(abc.equals("english")){%>Category Entry<%}%></a></li> --%>	
				<%-- <li><a href="<%=path%>godownDetails.jsp"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("godownDetails") %> <%}%> <%if(abc.equals("english")){%>Godown Entry<%}%></a></li> --%>
				<%-- <li><a href="<%=path%>expenseDetailsForBillingAndGoodsReceive.jsp"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("expenditureDetails") %> <%}%> <%if(abc.equals("english")){%>Expense Details For Blling<%}%></a></li> --%>
				<%-- <li><a href="<%=path%>TaxEdit.jsp">Edit Tax Details</a></li> --%>
				
				
        
      </ul>
    </li>
    <%}%>
       <% if(type1.equals("admin")){ %>
     <li><a  href="<%=path%>goodsReceive.jsp"><i class="fa fa-user-secret"></i><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("purchase") %> <%}%> <%if(abc.equals("english")){%>Purchase<%}%> </a>
     			 <ul class="sub-menu">
        						<%-- <li><a href="<%=path%>purchaseOrderDetails.jsp"  accesskey="n"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("advanceBooking") %> <%}%> <%if(abc.equals("english")){%>Advance Booking <%}%></a></li> --%>
								<%-- <li><a href="<%=path%>updateDCNumber.jsp"  >Update DC Number </a></li> --%>
								<li><a href="<%=path%>advanceBooking.jsp"  ><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("purchaseOrder") %> <%}%> <%if(abc.equals("english")){%> Purchase Order <%}%></a></li>
								<li><a href="<%=path%>goodsReceive.jsp"  ><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("goodsReceive") %> <%}%> <%if(abc.equals("english")){%> Goods Receive <%}%></a></li>	
								<li><a href="<%=path%>packing.jsp"  ><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("packing") %> <%}%> <%if(abc.equals("english")){%> Packing<%}%></a></li>
						        <li><a href="<%=path%>product_transfer.jsp" ><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("productTransfer") %> <%}%> <%if(abc.equals("english")){%>Transfer to Store<%}%></a></li>	
						        <li><a href="<%=path%>purchase_return.jsp" ><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("purchaseReturn") %> <%}%> <%if(abc.equals("english")){%> Purchase Return <%}%></a></li>	


				 </ul>
		</li>
	<%}%>
     <%-- <li><a  href="<%=path%>packing.jsp"><i class="fa fa-user-secret"></i><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("packing") %> <%}%> <%if(abc.equals("english")){%>Packing<%}%> </a>
     			 <ul class="sub-menu">


				 </ul>
		</li> --%>
    <% if(type1.equals("salesman")|| type1.equals("admin") || type1.equals("account") ){ %>	
    <li><a href="<%=path%>allBilling.jsp" accesskey="b" ><i class="fa fa-sitemap"></i><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("billing") %> <%}%> <%if(abc.equals("english")){%>Billing<%}%> </a>
      <ul class="sub-menu">
       <li><a href="<%=path%>allBilling.jsp"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("fertiBill") %> <%}%> <%if(abc.equals("english")){%>GST Billing<%}%></a> </li>
       <li><a href="<%=path%>NonGSTBilling.jsp"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("NonfertiBill") %> <%}%> <%if(abc.equals("english")){%>Non-GST Billing<%}%></a> </li>
       <li><a href="<%=path%>quotationBilling.jsp"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("quotationBill") %> <%}%> <%if(abc.equals("english")){%>Quotation<%}%></a></li>
       <li><a href="<%=path%>challanBill.jsp"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("challanBill") %> <%}%> <%if(abc.equals("english")){%>Challan<%}%></a> </li>
       <li><a href="<%=path%>salereturn.jsp"  ><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("saleReturn") %> <%}%> <%if(abc.equals("english")){%>Sale Return<%}%></a></li>
       <li><a href="<%=path%>billreturn.jsp"  ><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("billReturn") %> <%}%> <%if(abc.equals("english")){%>Bill Cancel<%}%></a></li>    
    <li><a href="<%=path%>challancancel.jsp"  ><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("billReturn") %> <%}%> <%if(abc.equals("english")){%>Challan Cancel<%}%></a></li>        
     </ul>
    </li>
    <%}%>
 <%--    <% if(type1.equals("admin")){ %>
     <li><a  href="#"><i class="fa fa-user-secret"></i><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("purchase") %> <%}%> <%if(abc.equals("english")){%>Purchase<%}%> </a>
     			 <ul class="sub-menu">
        						<li><a href="<%=path%>purchaseOrderDetails.jsp"  accesskey="n"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("advanceBooking") %> <%}%> <%if(abc.equals("english")){%>Advance Booking <%}%></a></li>
								<li><a href="<%=path%>updateDCNumber.jsp"  >Update DC Number </a></li>
								<li><a href="<%=path%>goodsReceive.jsp"  ><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("goodsReceive") %> <%}%> <%if(abc.equals("english")){%>Goods Receive  <%}%></a></li>	
								<li><a href="<%=path%>purchase_return.jsp" ><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("purchaseReturn") %> <%}%> <%if(abc.equals("english")){%>Purchase return<%}%></a></li>	
							</ul>
		</li>
	<%}%>	 --%>
	 <% if(type1.equals("admin") || type1.equals("account")){ %>	  
		  <li><a  href="<%=path%>allstockreport.jsp"><i class="fa fa-user-secret"></i>Stock </a>
     			 <ul class="sub-menu">
     						    <li><a href="<%=path%>allstockreport.jsp"  accesskey="n">All Stock</a></li>
        						<li><a href="<%=path%>stockReport.jsp"  accesskey="n">Stock Reports</a></li>
        						<li><a href="<%=path%>lowStockReport.jsp"  accesskey="n">Low Stock Reports</a></li>
								<%-- <li><a href="<%=path%>ExpiryDateWiseStockReport.jsp"  accesskey="n">Expiry Date Wise</a></li> --%>
        						<%-- <li><a href="<%=path%>DayCloseReport.jsp"  accesskey="n">Day Close Report</a></li> --%>
							</ul>
		</li>
    <%}%>
    <% if(type1.equals("admin") || type1.equals("account")){ %>
    <li><a  href="<%=path%>allPaymentWithLeftTabs.jsp" accesskey="p"><i class="fa fa-edit"></i><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("cashBook") %> <%}%> <%if(abc.equals("english")){%>CashBook<%}%> </a>
      
    </li>
    <%}%>
   		<%-- <li><a  href="#"><i class="fa fa-shopping-cart"></i><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("account") %> <%}%> <%if(abc.equals("english")){%>Account<%}%> </a>
      		<ul class="sub-menu">
           
						<li><a href="<%=path%>supplierAccountDetails.jsp"  accesskey="n"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("supplierAccountDetail") %> <%}%> <%if(abc.equals("english")){%>Supplier Account Details<%}%></a></li>
			 </ul>
        </li> --%>
        <% if(type1.equals("admin") || type1.equals("account")){ %>
        <li><a  href="<%=path%>purchaseReports.jsp"><i class="fa fa-bar-chart"></i><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("reports") %> <%}%> <%if(abc.equals("english")){%>Reports<%}%> </a>
      <ul class="sub-menu">
      				<li><a><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("purchase and sale") %> <%}%> <%if(abc.equals("english")){%>Purchase And Sale<%}%> </a>
							 <ul class="sub-menu">	
								<li><a href="<%=path%>purchaseReports.jsp"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("purchase") %> <%}%> <%if(abc.equals("english")){%>Purchase <%}%></a></li>
								<li><a href="<%=path%>saleReports.jsp"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("sale") %> <%}%> <%if(abc.equals("english")){%>Sale<%}%></a></li>
								<li><a href="<%=path%>profitAndLoss.jsp"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("profit and loss") %> <%}%> <%if(abc.equals("english")){%>Profit & Loss<%}%></a></li>
								<li><a href="<%=path%>allcustreport.jsp"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("All Customer Report") %> <%}%> <%if(abc.equals("english")){%>All Customer Report<%}%></a></li>	
								
						<li><a href="<%=path%>packingReport.jsp"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("Packing Report") %> <%}%> <%if(abc.equals("english")){%>Packing Report<%}%></a></li>	
						<li><a href="<%=path%>productTransferReport.jsp"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("Product Transfer Report") %> <%}%> <%if(abc.equals("english")){%>Product Transfer Report<%}%></a></li>	
																								
							</ul>
					</li>
					
										<li><a href="<%=path%>dayclosurereport.jsp"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("Day Closure Report") %> <%}%> <%if(abc.equals("english")){%>Day Closure Report <%}%></a></li>			
								<li><a href="<%=path%>cashBookReports.jsp"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("cashBook") %> <%}%> <%if(abc.equals("english")){%>CashBook<%}%></a></li>
								<%-- <li><a href="<%=path%>gstSummaryReport.jsp">GST Summary Report</a></li> --%>
					<li><a><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("all tax reports") %> <%}%> <%if(abc.equals("english")){%>All Tax Reports<%}%> </a>
							<ul class="sub-menu">
								<li><a href="<%=path%>gstReports.jsp">GST Report</a></li>
								<li><a href="<%=path%>vatReport.jsp">Tax Reports For Sale And Purchase</a></li>
							</ul>
				    </li>							
							<%--<li><a href="<%=path%>BalanceReport.jsp">Balance Report</a></li> --%>
								<li><a href="<%=path%>creditCustomerPaymentDetailReport.jsp">Credit Customer Payment details</a></li>
								<li><a href="<%=path%>supplierPaymentDetailReport.jsp">Supplier Payment details</a></li>
								<li><a href="<%=path%>productBuyAndSalePriceReport.jsp"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("buyAndSalePrice") %> <%}%> <%if(abc.equals("english")){%>Buy And sale Price<%}%></a></li>
					<li><a><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("All Credit/Debit") %> <%}%> <%if(abc.equals("english")){%>All Credit/Debit<%}%> </a>
								<ul class="sub-menu">
								<li><a href="<%=path%>AllCreditAmountReports.jsp">All Credit/Debit</a></li>
								<li><a href="<%=path%>todayCreditDebitReport.jsp">Today Credit/Debit</a></li>
								<li><a href="<%=path%>dayWiseCreditDebit.jsp">Credit/Debit Reports</a></li>
								</ul>
								</li>
						   <%-- <li><a href="<%=path%>upcomimgExpiryDateProductList.jsp">Upcoming Expiry Products</a></li> --%>
							
      </ul>
    </li>
    <%}%>
     <%-- <% if(type1.equals("salesman")|| type1.equals("admin") || type1.equals("account") ){ %>
     <li><a  href="#"><i class="fa fa-address-book-o"></i> Bill Copy</a>
      <ul class="sub-menu">
								<li><a href="<%=path%>FertilizerBillCOPY.jsp">Fertilizer Bill</a></li>
								<li><a href="<%=path%>SeedAndPesticideBillCOPY.jsp">Seed Bill</a></li>
								<li><a href="<%=path%>pesticideBillPDFCopy.jsp">Pesticide Bill</a></li>
      </ul>
    </li>
   <%}%> --%>
   
    <li>
		<a  href="<%=path%>FertilizerBillCOPY.jsp" accesskey="n" ><i class="fa fa-edit"></i><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("billcopy") %> <%}%> <%if(abc.equals("english")){%>Bill Copy<%}%></a>
    </li>
   
    <% if(type1.equals("admin")){ %>
    <li><a  href="<%=path%>employee_detail.jsp"><i class="	fa fa-address-book-o"></i><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("HR") %> <%}%> <%if(abc.equals("english")){%>HR<%}%> </a>
      						<ul class="sub-menu">
        						<li><a href="<%=path%>employee_detail.jsp" accesskey="w"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("employeeDetails") %> <%}%> <%if(abc.equals("english")){%>Employee Details <%}%></a></li>
								<li><a href="<%=path%>userDetails.jsp"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("userDetails") %> <%}%> <%if(abc.equals("english")){%>User Details<%}%></a></li>
							    <li><a href="<%=path%>shopdetails.jsp"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("shopDetails") %> <%}%> <%if(abc.equals("english")){%>Shop Details<%}%></a></li>
							    <li><a href="<%=path%>accessControl.jsp"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("accessControl") %> <%}%> <%if(abc.equals("english")){%>Access Control<%}%></a></li>
							</ul>
        
    </li>
 
    
   <%--  <li>
		<a  href="<%=path%>notification.jsp" accesskey="n" ><i class="fa fa-edit"></i><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("notifications") %> <%}%> <%if(abc.equals("english")){%>Notifications<%}%></a>
    </li> --%>
    
	<%}%>
     
   <li>
     <label style="color: white" for="staticShopName">Shop Name : </label>
    </li>
    <li>
		<input type="text" readonly="readonly" value="<%=onlyShopName%>" id="staticShopName" style="font-size: 15px; text-align: center; height: 35px;color: #000000;width: 223px;"/><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("") %> <%}%> <%if(abc.equals("english")){%><%}%>
    </li>
    <li>     
		<button onclick="Logout()" style="height: 35px;width: 85px;background: #ffa500;border: 2px solid #ffffff;color: white;"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("logout") %> <%}%> <%if(abc.equals("english")){%>Log Out<%}%></button>
   </li>
      	<!--  <li><a  href="#"><i class="	fa fa-address-book-o"></i> Graphs</a>
      						<ul class="sub-menu">
        												<li><a href="#">Purchase</a></li>
														<li><a href="#">Sale</a></li>
														<li><a href="#">Stock</a></li>
														<li><a href="#">Other</a></li>
							</ul>
    		</li> -->
      	  
  </ul>
  
</nav>


<script src="/Shop/staticContent/y_js/jquery-2.1.3.min.js"></script> 
<script>
$(document).ready(function(){ 
	var touch 	= $('#resp-menu');
	var menu 	= $('.menu');
 
	$(touch).on('click', function(e) {
		e.preventDefault();
		menu.slideToggle();
	});
	
	$(window).resize(function(){
		var w = $(window).width();
		if(w > 767 && menu.is(':hidden')) {
			menu.removeAttr('style');
		}
	});
	
});
</script>
<script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-36251023-1']);
  _gaq.push(['_setDomainName', 'jqueryscript.net']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script>

<!-- header end -->
 