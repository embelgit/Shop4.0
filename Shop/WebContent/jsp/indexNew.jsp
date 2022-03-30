<%@page import="com.Fertilizer.dao.GoodsReceiveDao"%>
<%@page import="com.Fertilizer.hibernate.shopDetailsBean"%>
<%@page import="com.Fertilizer.dao.shopDetailsDao"%>
<%@page import="com.Fertilizer.bean.StockDetail"%>
<%@page import="com.Fertilizer.hibernate.Stock"%>
<%@page import="com.Fertilizer.hibernate.GodownEntry"%>
<%@page import="com.Fertilizer.dao.GodownEntryDao"%>
<%@page import="com.Fertilizer.hibernate.CategoryDetailsBean"%>
<%@page import="com.Fertilizer.dao.CategoryDetailsDao"%>
<%@page import="java.util.List"%>
<%boolean isHome=false;%>

<%@include file="commons/headerNew.jsp"%> 
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


<script src="/Shop/staticContent/js/jquery-1.12.3.min.js"></script>
<!-- <script type="text/javascript" src="/Shop/staticContent/js/selectjj.js"></script>
<script type="text/javascript" src="/Shop/staticContent/js/buttom.js"></script> -->
<script src="/Shop/staticContent/js/jquery.min.js"></script>
<script type="text/javascript" src="/Shop/staticContent/js/jquery.min.js"></script>
<!-- <script type="text/javascript" src="/Shop/staticContent/js/bootstrap.js"></script>
<script type="text/javascript" src="/Shop/staticContent/js/bootbox.min.js"></script> -->
<!-- <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet" /> -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>


<!--<script type="text/javascript" src="/Shop/staticContent/js/jqueryUi.js"></script>-->
<script src="/Shop/staticContent/js/jquery.dataTables.js" type="text/javascript"></script>
<!--  <link href="/Shop/WebContent/staticContent/css/dataTa.css" rel="stylesheet" type="text/css" media="all" />-->
<link href="/Shop/staticContent/css/dataTables.jqueryui.min.css" rel="stylesheet" type="text/css" media="all">
<link href="/Shop/staticContent/css/select.css" rel="stylesheet" type="text/css" media="all">
<link href="/Shop/staticContent/css/button.css" rel="stylesheet" type="text/css" media="all">
 <link rel="stylesheet" href="/Shop/staticContent/css/jquery-ui.min.css">
<link rel="stylesheet" href="/Shop/staticContent/css/ui.jqgrid.min.css">

<!-- For datatable to pdf,print,excel etc conversion -->
<script type="text/javascript" src="//code.jquery.com/jquery-1.12.4.js"></script> 
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


  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="X-UA-Comoatible" content="IE=edge">
  <title>Admin | Home </title>
  <!-- <link rel="stylesheet" type="text/css" href="/Shop/staticContent/css/bootstrap.css">
  <link rel="stylesheet" type="text/css" href="/Shop/staticContent/css/style.css">
  <link rel="stylesheet" type="text/css" href="/Shop/staticContent/css/fonts.css"> -->

<script type="text/javascript" >
jQuery(document).ready( function() {
	getsale();
	return false;
	}); 
	

</script>

</head>
<body>
      <%
	  		HttpSession session1 = request.getSession();
		  	String shop1234 = (String) session1.getAttribute("shopName");
		  	
		  	String shopN = shop1234.substring(4);
		  	String shopId = String.valueOf(shop1234.charAt(0));
		  	System.out.println("This is shop id === "+shopId);
		  	String shopName1 = shopN.trim();
	  		HttpSession session2 = request.getSession();
		  	session2.setAttribute("shopId", shopId);
			
				         if (session.getAttribute("user") != null)
				         {
						     name1 = (String) session.getAttribute("user");
						     shopName = (String) session.getAttribute("shopName");	
						     
			            	 System.out.println("=============================== "+shopName);
				             HibernateUtility hbu1=HibernateUtility.getInstance();
				             Session session3=hbu1.getHibernateSession();
				             
				             String ShopNameWithoutId = shopName.substring(4);
				             onlyShopName = ShopNameWithoutId.trim();
				   
				             org.hibernate.Query query1 = session3.createQuery("from AccessControlBean where userName =:usr");
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
	           %>
  
    <!-- Bootstrap CSS-->
    <link rel="stylesheet" href="/Shop/staticContent/vendor/bootstrap/css/bootstrap.min.css">
    <!-- Font Awesome CSS-->
    <link rel="stylesheet" href="/Shop/staticContent/vendor/font-awesome/css/font-awesome.min.css">
    <!-- Fontastic Custom icon font-->
    <link rel="stylesheet" href="/Shop/staticContent/css/fontastic.css">
    <!-- Google fonts - Roboto -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700">
    <!-- jQuery Circle-->
    <link rel="stylesheet" href="/Shop/staticContent/css/grasp_mobile_progress_circle-1.0.0.min.css">
    <!-- Custom Scrollbar-->
    <link rel="stylesheet" href="/Shop/staticContent/vendor/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css">
    <!-- theme stylesheet-->
    <link rel="stylesheet" href="/Shop/staticContent/css/style.default.css" id="theme-stylesheet">
    <!-- Custom stylesheet - for your changes-->
    <link rel="stylesheet" href="/Shop/staticContent/css/custom.css">
    <link rel="stylesheet" href="/Shop/staticContent/icons-reference/styles.css">
    <!-- Favicon-->
    <link rel="shortcut icon" href="img/favicon.ico">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootbox.js/4.4.0/bootbox.min.js"></script>
     <script src="https://cdnjs.cloudflare.com/ajax/libs/bootbox.js/4.4.0/bootbox.min.js"></script> 
     
    <!-- Tweaks for older IEs--><!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
        <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script><![endif]-->
  </head>
  <body >
  
 
    <!-- Side Navbar -->
    <nav class="side-navbar">
      <div class="side-navbar-wrapper">
        <!-- Sidebar Header    -->
        <div class="sidenav-header d-flex align-items-center justify-content-center">
          <!-- User Info-->
          <div class="sidenav-header-inner text-center"><img src="/Shop/staticContent/images/download.png" alt="person" class="img-fluid rounded-circle">
            <h2 class="h2">Pratik</h2><span>Developer</span>
          </div>
          <!-- Small Brand information, appears on minimized sidebar-->
          <div class="sidenav-header-logo"><a href="index.html" class="brand-small text-center"> <strong>E</strong><strong class="text-primary">B</strong></a></div>
        </div>
        <!-- Sidebar Navigation Menus-->
        <div class="main-menu">
         <!--  <h1 class="sidenav-heading">Main</h1> -->
          <ul id="side-main-menu" class="side-menu list-unstyled"> 
          
 			<%
    			  if(type1.equals("admin")){
    	  
     		 %>                          
            <li>
            <a href="allBilling.jsp"> <i class="" aria-hidden="true"></i>
            <span class="hidden-sm hidden-xs">Home</span>  </a>
            </li>
            
            <%} %>
            
            <%
    			  if(type1.equals("account") || type1.equals("admin") || type1.equals("salesman")){
    	  
     		 %>
            <li>
            <a href="indexNew.jsp"> <i class="" aria-hidden="true"></i>
            <span class="hidden-sm hidden-xs"> Dashboard</span> </a>
            </li>
            <li class="link"><a href="purchaseReports.jsp"> <i class=""></i>
            <span class="hidden-sm hidden-xs">Purchase Reports</span>
                  <span class="label label-success pull-right hidden-sm hidden-xs"></span>  </a>
                   <ul id="collapse-post" class="collapse collapseable">
                  <li>
                    <a href="reports.html">
                      Report 1                      
                    </a>
                  </li>
                  <li>
                    <a href="reports.html">
                      Report 2                      
                    </a>
                  </li>
                  <li>
                    <a href="reports.html">
                      Report 3                       
                    </a>
                  </li>
                  <li>
                    <a href="reports.html">
                       Report 4                       
                    </a>
                  </li>
                </ul>
                </li>
            <li><a href="saleReports.jsp"> <i class=""></i> 
            <span class="hidden-sm hidden-xs">Sales Reports</span>
                  <span class="label label-success pull-right hidden-sm hidden-xs"></span></a>
            </li>
           
           <%} %>
           
          </ul>
        </div>
       
      </div>
    </nav>
    <div class="page">
      <!-- navbar-->
      <header class="header">
        <nav class="navbar">
          <div class="container-fluid">
            <div class="navbar-holder d-flex align-items-center justify-content-between">
              <div class="navbar-header"><a href="indexNew.jsp" class="navbar-brand">
                  <div class="brand-text d-none d-md-inline-block"><span>Shop Name: </span>
                  <input type="text" readonly="readonly" value="<%=shopName1%>" id="staticShopName" style="font-size: 15px; text-align: center; height: 35px; color: #000000; width: 223px; background-color: #ffffff;"/></div></a></div>
                 
              <ul class="nav-menu list-unstyled d-flex flex-md-row align-items-md-center">
             
               
                <!-- Languages dropdown    -->
               <!--  <li class="nav-item dropdown"><a id="languages" rel="nofollow" data-target="#" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="nav-link language dropdown-toggle"><img src="img/flags/16/GB.png" alt="English"><span class="d-none d-sm-inline-block">English</span></a>
                  <ul aria-labelledby="languages" class="dropdown-menu">
                    <li><a rel="nofollow" href="#" class="dropdown-item"> <img src="img/flags/16/DE.png" alt="English" class="mr-2"><span>German</span></a></li>
                    <li><a rel="nofollow" href="#" class="dropdown-item"> <img src="img/flags/16/FR.png" alt="English" class="mr-2"><span>French</span></a></li>
                  </ul>
                </li> -->
                <!-- date and time -->
                <li class="nav-item">
                <ul><span id="demo" style="color:white"></span></ul> 
                </li>
                <!-- Log out-->
                <li class="nav-item"><a href="login.jsp" class="nav-link logout"> 
                <span class="d-none d-sm-inline-block">Logout</span><i class="fa fa-sign-out"></i></a></li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <!-- Counts Section -->
      <section class="dashboard-counts section-padding">
        <div class="container-fluid">
          <div class="row">
          
         <!--   <center><img alt="" src="/Shop/staticContent/images/embellogo.png" width="900" height="500"></center> -->
            <!-- Count item widget-->
            <div class="col-xl-2 col-md-4 col-6">
              <div class="wrapper count-title d-flex">
                <div class="icon"><i class="icon-user"></i></div>
                <div class="name"><strong class="text-uppercase">Sale Amount</strong><span>Present Month</span>
                  <div class="count-number">
		<th><input style="background: #f0f0f0; border: 2px;font-size:25px;width: 150px;" id="saleAmount" type="text" readonly="readonly"/></th>
				</div>
                </div>
              </div>
            </div>
            <!-- Count item widget-->
            <div class="col-xl-2 col-md-4 col-6">
              <div class="wrapper count-title d-flex">
                <div class="icon"><i class="icon-padnote"></i></div>
                <div class="name"><strong class="text-uppercase">Sales Return Amount</strong><span>Present Month</span>
                  <div class="count-number">
            		<th><input style="background: #f0f0f0; border: 2px;font-size:25px;width: 150px;" id="salereturnAmount" type="text" readonly="readonly"/></th>
                  </div>
                </div>
              </div>
            </div>
            <!-- Count item widget-->
            <div class="col-xl-2 col-md-4 col-6">
              <div class="wrapper count-title d-flex">
                <div class="icon"><i class="icon-check"></i></div>
                <div class="name"><strong class="text-uppercase">Purchase    Amount</strong><span>Present Month</span>
                  <div class="count-number">
                 		<th><input style="background: #f0f0f0; border: 2px;font-size:25px;width: 150px;" id="purAmount" type="text" readonly="readonly"/></th>
				</div>
                </div>
              </div>
            </div>
            <!-- Count item widget-->
            <div class="col-xl-2 col-md-4 col-6">
              <div class="wrapper count-title d-flex">
                <div class="icon"><i class="icon-bill"></i></div>
                <div class="name"><strong class="text-uppercase">Purchase Return Amount</strong><span>Present Month</span>
                  <div class="count-number">
                 		<th><input style="background: #f0f0f0; border: 2px;font-size:25px;width: 150px;" id="purreturnAmount" type="text" readonly="readonly"/></th>
				</div>
                </div>
              </div>
            </div>
            <!-- Count item widget-->
             <div class="col-xl-2 col-md-4 col-6">
              <div class="wrapper count-title d-flex">
                <div class="icon"><i class="icon-list"></i></div>
                <div class="name"><strong class="text-uppercase">Profit/Loss Amount</strong><span>Present Month</span>
                  <div class="count-number">
        		<th><input style="background: #f0f0f0; border: 2px;font-size:25px;width: 150px;" id="profitloss" type="text" readonly="readonly"/></th>	
				</div>
                </div>
              </div>
            </div> 
<!--             Count item widget -->
           <div class="col-xl-2 col-md-4 col-6">
              <div class="wrapper count-title d-flex">
                <div class="icon"><i class="icon-list-1"></i></div>
                <div class="name"><strong class="text-uppercase">Low Stock </strong><span>Present Month</span>
                  <div class="count-number">
<!--            		<th><input style="background: #f0f0f0; border: 2px;font-size:25px;width: 150px;" id="lowstock" type="text" readonly="readonly"/></th>	  -->
<select id="lowstock" input style="background: #f0f0f0; border: 2px;font-size:25px;width: 150px;">
</select>
                  </div>
                </div>
              </div>
            </div> 
          </div>
        </div>
      </section>
      <!-- Header Section-->
       <section class="dashboard-header section-padding">
        <div class="container-fluid">
          <div class="row d-flex align-items-md-stretch">
            To Do List
            <div class="col-lg-3 col-md-6">
              <div class="card to-do">
                <h2 class="display h4">To do List</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                <ul class="check-lists list-unstyled">
                  <li class="d-flex align-items-center"> 
                    <input type="checkbox" id="list-1" name="list-1" class="form-control-custom">
                    <label for="list-1">Similique sunt in culpa qui officia</label>
                  </li>
                  <li class="d-flex align-items-center"> 
                    <input type="checkbox" id="list-2" name="list-2" class="form-control-custom">
                    <label for="list-2">Ed ut perspiciatis unde omnis iste</label>
                  </li>
                  <li class="d-flex align-items-center"> 
                    <input type="checkbox" id="list-3" name="list-3" class="form-control-custom">
                    <label for="list-3">At vero eos et accusamus et iusto </label>
                  </li>
                  <li class="d-flex align-items-center"> 
                    <input type="checkbox" id="list-4" name="list-4" class="form-control-custom">
                    <label for="list-4">Explicabo Nemo ipsam voluptatem</label>
                  </li>
                  <li class="d-flex align-items-center"> 
                    <input type="checkbox" id="list-5" name="list-5" class="form-control-custom">
                    <label for="list-5">Similique sunt in culpa qui officia</label>
                  </li>
                  <li class="d-flex align-items-center"> 
                    <input type="checkbox" id="list-6" name="list-6" class="form-control-custom">
                    <label for="list-6">At vero eos et accusamus et iusto </label>
                  </li>
                  <li class="d-flex align-items-center"> 
                    <input type="checkbox" id="list-7" name="list-7" class="form-control-custom">
                    <label for="list-7">Similique sunt in culpa qui officia</label>
                  </li>
                  <li class="d-flex align-items-center"> 
                    <input type="checkbox" id="list-8" name="list-8" class="form-control-custom">
                    <label for="list-8">Ed ut perspiciatis unde omnis iste</label>
                  </li>
                </ul>
              </div>
            </div>
            Pie Chart
            <div class="col-lg-3 col-md-6">
              <div class="card project-progress">
                <h2 class="display h4">Project Beta progress</h2>
                <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                <div class="pie-chart">
                  <canvas id="pieChart" width="300" height="300"> </canvas>
                </div>
              </div>
            </div>
           
            <div class="col-lg-6 col-md-12 flex-lg-last flex-md-first align-self-baseline">
             Line Chart
              <div class="card sales-report">
                <h2 class="display h4">Sales marketing report</h2>
                <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor amet officiis</p>
                <div class="line-chart">
                  <canvas id="lineCahrt"></canvas>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> 
      <!-- Statistics Section-->
      <section class="statistics">
        <div class="container-fluid">
          <div class="row d-flex">
            <div class="col-lg-4">
              <!-- Income-->
              <div class="card income text-center">
                <div class="icon"><i class="icon-line-chart"></i></div>
                <div class="number">126,418</div><strong class="text-primary">All Income</strong>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do.</p>
              </div>
            </div>
            <div class="col-lg-4">
              <!-- Monthly Usage-->
              <div class="card data-usage">
                <h2 class="display h4">Monthly Usage</h2>
                <div class="row d-flex align-items-center">
                  <div class="col-sm-6">
                    <div id="progress-circle" class="d-flex align-items-center justify-content-center"></div>
                  </div>
                  <div class="col-sm-6"><strong class="text-primary">80.56 Gb</strong><small>Current Plan</small><span>100 Gb Monthly</span></div>
                </div>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
              </div>
            </div>
            <div class="col-lg-4">
              <!-- User Actibity-->
              <div class="card user-activity">
                <h2 class="display h4">User Activity</h2>
                <div class="number">210</div>
                <h3 class="h4 display">Social Users</h3>
                <div class="progress">
                  <div role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" class="progress-bar progress-bar bg-primary"></div>
                </div>
                <div class="page-statistics d-flex justify-content-between">
                  <div class="page-statistics-left"><span>Pages Visits</span><strong>230</strong></div>
                  <div class="page-statistics-right"><span>New Visits</span><strong>73.4%</strong></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

       <footer class="main-footer">
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-6">
              <p>Coypright &copy;2020 EMBEL TECHNOLOGIES PVT. LTD. </p>
             
            </div>
           <!--  <div class="col-sm-6 text-right">
              <p>Design by <a href="https://bootstrapious.com/p/bootstrap-4-dashboard" class="external">Bootstrapious</a></p>
              Please do not remove the backlink to us unless you support further theme's development at https://bootstrapious.com/donate. It is part of the license conditions and it helps me to run Bootstrapious. Thank you for understanding :)
            </div> -->
          </div>
        </div>
      </footer>
    </div>
    <!-- JavaScript files-->
    <script src="/Shop/staticContent/vendor/jquery/jquery.min.js"></script>
    <script src="/Shop/staticContent/vendor/popper.js/umd/popper.min.js"> </script>
    <script src="/Shop/staticContent/vendor/bootstrap/js/bootstrap.min.js"></script>
    <script src="/Shop/staticContent/js/grasp_mobile_progress_circle-1.0.0.min.js"></script>
    <!-- <script src="/Shop/staticContent/vendor/jquery.cookie/jquery.cookie.js"> </script> -->
    <script src="/Shop/staticContent/vendor/chart.js/Chart.min.js"></script>
    <script src="/Shop/staticContent/vendor/jquery-validation/jquery.validate.min.js"></script>
    <script src="/Shop/staticContent/vendor/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js"></script>
    <script src="/Shop/staticContent/js/charts-home.js"></script>
    <!-- Main File-->
    <script src="/Shop/staticContent/js/front.js"></script>
  
  

 <!--  <script src="/Shop/staticContent/js/jquery.js"></script>
  <script src="/Shop/staticContent/js/bootstrap.js"></script>
 -->
  <!-- <script src="/Shop/staticContent/js/default.js"></script>
  <script src="/Shop/staticContent/js/charts.js"></script> 
   <script src="/Shop/staticContent/js/exporting.js"></script> -->

 <script>
function openCity(evt, statsType) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(statsType).style.display = "block";
    evt.currentTarget.className += " active";
}
</script>

<script type="text/javascript">
  var $length1 = $('#sales');
  var lengthMax1 = parseInt($length1.attr('data-max'), 10);
  var current1 = 0;

 var updateLength1 = function() {
  current1 += 100;
  $length1.html(current1 );
  updateTick1();
 };

 var updateTick1 = function(){
  if (current1 < lengthMax1){
   requestAnimationFrame(updateLength1);
  } 
  else{
    $length1.html('<i class="fa">&#xf156;</i>' +lengthMax1)
  }
 };

 updateLength1();

</script>

<script type="text/javascript">

  var $length = $('#purchase');
  var lengthMax = parseInt($length.attr('data-max'), 10);
  var current = 0;

 var updateLength = function() {
  current += 100;
  $length.html(current );
  updateTick();
 };

 var updateTick = function(){
  if (current < lengthMax){
   requestAnimationFrame(updateLength);
  } 
  else{
    $length.html('<i class="fa">&#xf156;</i>' +lengthMax)
  }
 };

 updateLength();

</script>

<script>
function myFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";

        }
    }
}
</script>
</body>
<script type="text/javascript">
<%
	GoodsReceiveDao gDao=new GoodsReceiveDao();
	List Lis1 = gDao.lowStockReport(request);
	int listSize = Lis1.size();
	System.out.println("list Size ==== "+listSize);	
	if(listSize  > 0)
	{ %>		
		bootbox.confirm({ 
        title: '',
        'top': '50%',
        message: 'LOW STOCK...!!!',
        buttons: {
            confirm: {
        	      label: 'Show <br> Low Stock',
        	    },
        	    cancel: {
        	        label: 'No',
        	      }
        },
        callback: function(result) {
        if (result) {
          window.location.href = 'lowStockReport.jsp';
        }
      }
    });
		setTimeout(function() {
			dialog.modal('hide');
		}, 5000);
<%	} %>
</script>
 
 <script>
 var today = new Date();
 var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
 var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
 var dateTime = date+' '+time;
 document.getElementById("demo").innerHTML = dateTime;
</script>


 <%--  <div class="container-fluid display-table">
    <div class="row display-table-row">
      <!-- Side menu -->
      <div class="col-md-2 col-sm-1 hidden-xs display-table-cell valign-top border-bottom" id="side-menu">
          <h1 class="hidden-xs hidden-sm">Admin</h1>
          <ul>
            <li class="link">
              <a href="allBilling.jsp">
                <span class="glyphicon glyphicon-user" aria-hidden="true"></span>
                <span class="hidden-sm hidden-xs">Home</span>
              </a>
              </li>
            <li class="link active">
              <a href="index.html">
                <span class="glyphicon glyphicon-th" aria-hidden="true"></span>
                <span class="hidden-sm hidden-xs"> Dashboard</span>
              </a>
            </li>

             <li class="link"> 
                <a href="purchaseReports.jsp">
                  <span class="glyphicon glyphicon-file" aria-hidden="true"></span>
                  <span class="hidden-sm hidden-xs">Purchase Reports</span>
                  <span class="label label-success pull-right hidden-sm hidden-xs"></span>
                </a>
                <ul id="collapse-post" class="collapse collapseable">
                  <li>
                    <a href="reports.html">
                      Report 1                      
                    </a>
                  </li>
                  <li>
                    <a href="reports.html">
                      Report 2                      
                    </a>
                  </li>
                  <li>
                    <a href="reports.html">
                      Report 3                       
                    </a>
                  </li>
                  <li>
                    <a href="reports.html">
                       Report 4                       
                    </a>
                  </li>
                </ul>
            </li>
              
          <li class="link">
                <a href="saleReports.jsp" >
                  <span class="glyphicon glyphicon-file" aria-hidden="true"></span>
                  <span class="hidden-sm hidden-xs">Sales Reports</span>
                  <span class="label label-success pull-right hidden-sm hidden-xs"></span>
                </a>
                <ul id="collapse-sales" class="collapse collapseable">
                  <li>
                    <a href="reports.html">
                      Report 1                      
                    </a>
                  </li>
                  <li>
                    <a href="reports.html">
                      Report 2                      
                    </a>
                  </li>
                  <li>
                    <a href="reports.html">
                      Report 3                       
                    </a>
                  </li>
                  <li>
                    <a href="reports.html">
                       Report 4                       
                    </a>
                  </li>
                </ul>
            </li>
              
          </ul>
      </div>
      <!-- main content -->
      <div class="col-md-10 col-sm-11 display-table-cell valign-top box">
        <div class="row">
          <header id="nav-header" class="clearfix">
             <div class="col-md-5">
              <nav class="navbar-default pull-left">
                <button type="button" class="navbar-toggle collapsed" data-toggle="offcanvas" data-target="#side-menu">
                  <span class="sr-only">Toggle Navigation</span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                </button>
              </nav> 
               <h4 id="main-head" class="col-md-12" style="font-family: "ubantu;"><span class="sub-head"><i>Created By</i></span> <strong>EMBEL TECHNOLOGIES PVT LTD</strong></h4>
             </div>
             <div class="col-md-7">
               <ul class="pull-right">
                 <li id="welcome" class="hidden-xs">  
                  <input type="text" class="hidden-sm hidden-xs" id="header-feild-search"placeholder="search for something">
                 </li>
                <!--  <li class="fixed-width">
                    <a href="#" ><span class="glyphicon glyphicon-envelope area-hidden="true"></span>
                    <span class="label label-message">3</span>
                    </a>
                  </li> -->
                 <li ><a href="#" class="logout"><span class="glyphicon glyphicon-log-out" area-hidden="true"></span></a>LogOut</li>
               </ul>
             </div>
          </header> 
        </div>
        

        <div class="col-md-8">
          <div class="row">
            <section id="stats" class="clearfix">
              <div class="tab panel-header">
                <button class="tablinks active" onclick="openCity(event, 'Graph')">Graph</button>
                <button class="tablinks" href="#myChart1"onclick="openCity(event, 'Pie-Chart')">Bar-Graph</button>
              </div>
                    
              <div class="panel-content">

              <div id="Graph" class="tabcontent">
               <div id="container" style="min-width: 310px; height: 400px; margin: 0 auto"></div>
              </div>

              <div id="Pie-Chart" class="tabcontent">
               
<div id="container1" style="min-width: 310px; height: 400px; max-width: 600px; margin: 0 auto"></div>
              </div>
            </section>

          </div>
        </div>
        <div class="col-md-4">
          <div class="row clearfix">
            <div class="panel list-search">
              <input type="text" id="myInput" onkeyup="myFunction()" placeholder="Search for names.." title="Type in a name">

                <ul id="myUL" class="clearfix">
                  <li><a href="#">Adele</a></li>
                  <li><a href="#">Agnes</a></li>

                  <li><a href="#">Billy</a></li>
                  <li><a href="#">Bob</a></li>

                  <li><a href="#">Calvin</a></li>
                  <li><a href="#">Christina</a></li>
                  <li><a href="#">Cindy</a></li>
                  <li><a href="#">Cavin</a></li>
                </ul>
            </div>
          </div>
        </div>    
        <div class="col-md-6 ">
          <div class="row clearfix">
            <aside id="daily-stats">
              <div class="panel panel-left">
                <div class="panel-heading">
                  <h4 class="panel-title">Today's Sale</h4>
                </div>
                <div class="panel-body">
                   <span class="glyphicon glyphicon-stats"></span>
                  <span><strong id="sales" data-max="10000"></strong></span>
                </div>
              </div>
            </aside> 
          </div>  
        </div>
         <div class="col-md-6 ">
          <div class="row clearfix">
            <aside id="daily-stats">
              <div class="panel panel-right">
                <div class="panel-heading">
                  <h4 class="panel-title">Today's Purchase</h4>
                </div>
                <div class="panel-body">
                   <span class="glyphicon glyphicon-stats"></span>
                  <span><strong id="purchase" data-max="14400"></strong></span>
                </div>
              </div>
            </aside> 
          </div>  
        </div>
        
          <div class="col-md-6">
                        <div class="card ">
                            <div class="header">
                                <h4 class="title">Tasks</h4>
                                <p class="category">Backend development</p>
                            </div>
                            <div class="content">
                                <div class="table-full-width">
                                    <table class="table">
                                        <tbody>
                                            <tr>
                                                <td>
                          <div class="checkbox">
                                <input id="checkbox1" type="checkbox">
                                <label for="checkbox1"></label>
                              </div>
                                                </td>
                                                <td>Sign contract for "What are conference organizers afraid of?"</td>
                                                <td class="td-actions text-right">
                                                    <button type="button" rel="tooltip" title="Edit Task" class="btn btn-info btn-simple btn-xs">
                                                        <i class="fa fa-edit"></i>
                                                    </button>
                                                    <button type="button" rel="tooltip" title="Remove" class="btn btn-danger btn-simple btn-xs">
                                                        <i class="fa fa-times"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                          <div class="checkbox">
                                <input id="checkbox2" type="checkbox" checked>
                                <label for="checkbox2"></label>
                              </div>
                                                </td>
                                                <td>Lines From Great Russian Literature? Or E-mails From My Boss?</td>
                                                <td class="td-actions text-right">
                                                    <button type="button" rel="tooltip" title="Edit Task" class="btn btn-info btn-simple btn-xs">
                                                        <i class="fa fa-edit"></i>
                                                    </button>
                                                    <button type="button" rel="tooltip" title="Remove" class="btn btn-danger btn-simple btn-xs">
                                                        <i class="fa fa-times"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                          <div class="checkbox">
                                <input id="checkbox3" type="checkbox">
                                <label for="checkbox3"></label>
                              </div>
                                                </td>
                                                <td>Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit
                        </td>
                                                <td class="td-actions text-right">
                                                    <button type="button" rel="tooltip" title="Edit Task" class="btn btn-info btn-simple btn-xs">
                                                        <i class="fa fa-edit"></i>
                                                    </button>
                                                    <button type="button" rel="tooltip" title="Remove" class="btn btn-danger btn-simple btn-xs">
                                                        <i class="fa fa-times"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                          <div class="checkbox">
                                <input id="checkbox4" type="checkbox" checked>
                                <label for="checkbox4"></label>
                              </div>
                                                </td>
                                                <td>Create 4 Invisible User Experiences you Never Knew About</td>
                                                <td class="td-actions text-right">
                                                    <button type="button" rel="tooltip" title="Edit Task" class="btn btn-info btn-simple btn-xs">
                                                        <i class="fa fa-edit"></i>
                                                    </button>
                                                    <button type="button" rel="tooltip" title="Remove" class="btn btn-danger btn-simple btn-xs">
                                                        <i class="fa fa-times"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                          <div class="checkbox">
                                <input id="checkbox5" type="checkbox">
                                <label for="checkbox5"></label>
                              </div>
                                                </td>
                                                <td>Read "Following makes Medium better"</td>
                                                <td class="td-actions text-right">
                                                    <button type="button" rel="tooltip" title="Edit Task" class="btn btn-info btn-simple btn-xs">
                                                        <i class="fa fa-edit"></i>
                                                    </button>
                                                    <button type="button" rel="tooltip" title="Remove" class="btn btn-danger btn-simple btn-xs">
                                                        <i class="fa fa-times"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                          <div class="checkbox">
                                <input id="checkbox6" type="checkbox" checked>
                                <label for="checkbox6"></label>
                              </div>
                                                </td>
                                                <td>Unfollow 5 enemies from twitter</td>
                                                <td class="td-actions text-right">
                                                    <button type="button" rel="tooltip" title="Edit Task" class="btn btn-info btn-simple btn-xs">
                                                        <i class="fa fa-edit"></i>
                                                    </button>
                                                    <button type="button" rel="tooltip" title="Remove" class="btn btn-danger btn-simple btn-xs">
                                                        <i class="fa fa-times"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div class="footer">
                                    <hr>
                                    <div class="stats">
                                        <i class="fa fa-history"></i> Updated 3 minutes ago
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

 

           

            <div class="row">
             <footer id="admin-footer" class="clearfix col-md-12">
                <div class="pull-left"><b>copyright</b> &copy; 2017 </div>
                <div class="pull-right"> Admin system</div>
              </footer>
            
            </div>
      </div>  
    </div>
  </div>



  <script src="/Shop/staticContent/js/jquery.js"></script>
  <script src="/Shop/staticContent/js/bootstrap.js"></script>

  <script src="/Shop/staticContent/js/default.js"></script>
  <script src="/Shop/staticContent/js/charts.js"></script>
  
<script src="/Shop/staticContent/js/exporting.js"></script>
  <script>
function openCity(evt, statsType) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(statsType).style.display = "block";
    evt.currentTarget.className += " active";
}
</script>

<script type="text/javascript">
  var $length1 = $('#sales');
  var lengthMax1 = parseInt($length1.attr('data-max'), 10);
  var current1 = 0;

 var updateLength1 = function() {
  current1 += 100;
  $length1.html(current1 );
  updateTick1();
 };

 var updateTick1 = function(){
  if (current1 < lengthMax1){
   requestAnimationFrame(updateLength1);
  } 
  else{
    $length1.html('<i class="fa">&#xf156;</i>' +lengthMax1)
  }
 };

 updateLength1();

</script>

<script type="text/javascript">

  var $length = $('#purchase');
  var lengthMax = parseInt($length.attr('data-max'), 10);
  var current = 0;

 var updateLength = function() {
  current += 100;
  $length.html(current );
  updateTick();
 };

 var updateTick = function(){
  if (current < lengthMax){
   requestAnimationFrame(updateLength);
  } 
  else{
    $length.html('<i class="fa">&#xf156;</i>' +lengthMax)
  }
 };

 updateLength();

</script>

<script>
function myFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";

        }
    }
}
</script>
</body>
<script type="text/javascript">
<%
	GoodsReceiveDao gDao=new GoodsReceiveDao();
	List Lis1 = gDao.lowStockReport();
	int listSize = Lis1.size();
	System.out.println("list Size ==== "+listSize);	
	if(listSize  > 0)
	{ %>		
		bootbox.confirm({ 
        title: '',
        'top': '50%',
        message: 'LOW STOCK...!!!',
        buttons: {
            confirm: {
        	      label: 'Show <br> Low Stock',
        	    },
        	    cancel: {
        	        label: 'No',
        	      }
        },
        callback: function(result) {
        if (result) {
          window.location.href = 'lowStockReport.jsp';
        }
      }
    });
		setTimeout(function() {
			dialog.modal('hide');
		}, 5000);
<%	} %>
</script>
<jsp:include page="commons/footer.jsp"></jsp:include> --%>