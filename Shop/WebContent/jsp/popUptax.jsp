<%@page import="com.Fertilizer.hibernate.TaxCreationBean"%>
<%@page import="com.Fertilizer.dao.TaxCreationDao"%>
<%@page import="java.util.*" %>
<%boolean isHome = false;%>

<head>
<meta charset="utf-8">
<title>Tax Creation</title>
<link rel="stylesheet" type="text/css" href="/Shop/staticContent/y_css/style.css" />
  		 
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
<script type="text/javascript" src="/Shop/staticContent/js/bootbox.min.js"></script>

<script type="text/javascript" src="/Shop/staticContent/js/taxCreation.js"></script>
<script type="text/javascript">
		function back(){
			
			window.close();
		}
		function checkForDuplicateTaxTypeEntry(){
  			<%
  			TaxCreationDao dao2 = new TaxCreationDao();
  			List list = dao2.getAllTaxList(request);
  			%>
  			
  			<%
  			int z = 0;
  			for(z=0;z<list.size();z++){
  				TaxCreationBean bean = (TaxCreationBean)list.get(z);
  			%>
  			var taxType = "<%=bean.getTaxType()%>";
  	
  			if(document.getElementById("taxType").value == taxType ){
  				alert("Tax Type already exist...Duplicate Not allowed");
  				location.reload();
  				return false;
  			}
  			<%
  			}
  			%>
  			
  			}
	 
	 
</script>
<style>
.btn-default,.btn-primary,.btn-success,.btn-info,.btn-warning,.btn-danger
 {
    border-radius:23px;
}
</style>
</head>
 <div class="row header_margin_top">
			    <div align="center">
			  		<h2 class="form-name style_heading">Tax Details</h2>
			  	</div>
			 
    </div>
     <div class="row">
		     <div class="col-sm-offset-1 col-md-10">
				  		<hr style="border-top-color:#c1b1b1;">
		     </div>	
    </div>
<div class="container col-sm-offset-1" >
        <form class="form-horizontal" method="post" action="" name="txc"><!-- Value of 'name' attribute is used in  taxCreation.js  -->
          <fieldset>
          		<div class="row form-group">
           	 		<div class="col-md-6">
              			<%@include file="commons/clock.jsp" %>
           		 	</div>
				</div>
				 <div class="row form-group">
           				<label class="col-md-2 control-label" for="taxType">Tax Type<sup>*</sup></label>  
		           	 <div class="col-md-3">
            			<div class="input-group">
							<span class="input-group-addon">
								<i class="	glyphicon glyphicon-hand-right"></i>
							</span>
              				
							<!-- Following code is to get categories from "categories" table of "fertilizer" DB -->
							<!-- getAllMainCat() is implemented in  CategoryDetailsDao with return type List-->
							<%
							TaxCreationDao cdd = new TaxCreationDao();
           						List cList =cdd.getAllTax(request);
							
							%>
							<input list="cat_drop" id="taxType" onchange="checkForDuplicateTaxTypeEntry()" placeholder="Tax Type" class="form-control">
				<datalist id="cat_drop">
							<%
					           for(int i=0;i<cList.size();i++){
					        	   TaxCreationBean cat=(TaxCreationBean)cList.get(i);
							%>
		
							<option data-value="<%=cat.getTxId()%>" value="<%=cat.getTaxType()%>">
							<%
				      			}
				    		%>
			              	
            			</datalist>
            			</div>
            		</div>

            	<label class="col-md-3 control-label" for="taxPercentage">Tax Percentage<sup>*</sup></label>  
            		<div class="col-md-3">
            			<div class="input-group">
							<span class="input-group-addon">
								%
							</span>
              				
							<!-- Following code is to get categories from "categories" table of "fertilizer" DB -->
							<!-- getAllMainCat() is implemented in  CategoryDetailsDao with return type List-->
							<%
							TaxCreationDao dao = new TaxCreationDao();
           						List taxPerList =dao.getAllTax(request);
							
							%>
							<input list="tax_per_drop" id="taxPercentage"  class="form-control" placeholder="Tax Percentage">
				          <datalist id="tax_per_drop">
							<%
					           for(int i=0;i<taxPerList.size();i++){
					        	   TaxCreationBean bean =(TaxCreationBean)taxPerList.get(i);
							%>
		
							<option data-value="<%=bean.getTxId()%>" value="<%=bean.getTaxPercentage()%>">
							<%
				      			}
				    		%>
			              	
            			</datalist>
            			</div>
					</div>
				</div>
				<div class="form-group row" style="padding-top:2%">
           		<div class="col-md-6 text-center col-md-offset-3">
           			 
					<input type="button" id="save"  name="btn" style="width: 128px;height: 53px;font-size: 25" class="btn btn-success"  onclick="return addtax()" value="Submit">
					<input type="reset"  id="reset" name="btn" style="width: 128px;height: 53px;font-size: 25" class="btn btn-danger"   onclick="back()" value="Cancel">
					
            	</div>
          		</div>
			</fieldset>
		</form>
	</div>
	
<jsp:include page="commons/footer.jsp"></jsp:include>