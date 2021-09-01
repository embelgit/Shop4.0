<%@page import="com.Fertilizer.hibernate.SubCategoryDetailsBean"%>
<%@page import="com.Fertilizer.bean.GetProductDetails"%>
<%@page import="com.Fertilizer.dao.TaxCreationDao"%>
<%@page import="com.Fertilizer.hibernate.TaxCreationBean"%>
<%@page import="com.Fertilizer.dao.CategoryDetailsDao"%>
<%@page import="com.Fertilizer.dao.ProductDetailsDao"%>
<%@page import="com.Fertilizer.dao.SupplierDetailsDao"%>
<%@page import="com.Fertilizer.hibernate.SupplierDetailsBean"%>
<%@page import="com.Fertilizer.hibernate.CategoryDetailsBean"%>
<%@page import="com.Fertilizer.dao.MeasuringUnitsDao"%>
<%@page import="com.Fertilizer.hibernate.MeasuringUnitsBean"%>
<%@page import="java.util.List"%>
<%@page import="com.Fertilizer.hibernate.TaxCreationBean"%>
<%@page import="com.Fertilizer.dao.TaxCreationDao"%>
<%@page import="com.Fertilizer.dao.shopDetailsDao"%>
<%@page import="com.Fertilizer.hibernate.shopDetailsBean"%>
<%@page import="com.Fertilizer.hibernate.AdvanceBookingBean"%>
<%@page import="com.Fertilizer.dao.AdvanceBookinhDao"%>
<%@page import="com.Fertilizer.helper.ProductDetailsHelper"%>
<%@page import="com.Fertilizer.helper.CategoryDetailsHelper"%>

<%@page import="java.util.*"%>
<%
	boolean isHome = false;
%>
  
<%@include file="commons/header.jsp"%>


<head>

 <meta charset="utf-8">
  	  <script type="text/javascript" src="/Shop/staticContent/js/jquery-1.12.3.min.js"></script>
     
  
	 <link rel="stylesheet" href="/Shop/staticContent/css/jquery-ui.min.css">
     <link rel="stylesheet" href="/Shop/staticContent/css/ui.jqgrid.min.css">
     <link rel="stylesheet" href="/Shop/staticContent/y_css/jquery-ui.css">
	 <link rel="stylesheet" href="/Shop/staticContent/css/ui.jqgrid.css">
	 
  	<script type="text/javascript" src="/Shop/staticContent/js/jquery.min.js"></script>
  	<script type="text/javascript" src="/Shop/staticContent/js/jquery.min.js"></script>
    <script type="text/javascript" src="/Shop/staticContent/js/bootstrap.js"></script>
   	<script type="text/javascript" src="/Shop/staticContent/js/bootbox.min.js"></script>
   
    <script type="text/javascript" src="/Shop/staticContent/js/jquery-ui.min.js"></script>
    <script type="text/javascript" src="/Shop/staticContent/js/jquery-ui.js"></script>
    <script type="text/javascript" src="/Shop/staticContent/js/jqueryUi.js"></script>
    <script type="text/javascript" src="/Shop/staticContent/js/jquery.jqgrid.min.js"></script>

<script type="text/javascript" src="/Shop/staticContent/js/producttransfer.js"></script>

<script type="text/javascript">
function mypopup(url)
{
    width ='1050px';
    height = '600px';
    mywindow = window.open(url, "Title","location=0,status=1,scrollbars=1,resizable=1,menubar=0,toolbar=no,width=" + width + ",height=" + height);
    mywindow.moveTo(140, 50);
    mywindow.focus();
} 
</script>
 
 <script type="text/javascript">
	var profiles = {
		windowCenter : {
			height : 550,
			width : 660,
			status : 1,
			center : 1
		},
	};
	$(function() {
		$(".popupwindow").popupwindow(profiles);
	});
</script>

<script>

function getpack(){
	

	var wt = document.getElementById("weight").value;
	var type = document.getElementById("packunit").value;
	var pck = document.getElementById("packing").value;
    
	var unt = document.getElementById("unit").value;
	var stck = document.getElementById("stock").value;
	var wtt=0;
	var qq = 0;
	if(type=='Millitre' || type=='Grams'){
		wtt = (wt)/1000; 
		 qq = wtt*pck;
	}
	else{
		 qq = wt*pck;		
	}

	if(+qq > +stck){
		alert("Please pack quantity less than "+stck);
		return false;
	}
	else{
	document.getElementById("packquan").value = qq;
	}
	
}


</script>

 <script type="text/javascript">
	 function productlist()
	 {
		 window.location = "packingList.jsp";
	 }
</script>

<style>
.btn-default,.btn-primary,.btn-success,.btn-info,.btn-warning,.btn-danger
 {
    border-radius:23px;
}
</style>

</head>

<body onload="getProductName();">
<div class="row header_margin_top">
	<div align="center">
		<h2 class="form-name style_heading">Packing</h2>
	</div>

</div>
<div class="row">
	<div class="col-sm-offset-1 col-md-10">
		<hr style="border-top-color: #c1b1b1;">
	</div>
</div>

<!-- <div class="container col-sm-offset-2" 	style ="padding-right: 128px"  > -->

	  <div class="">
	  <div class="col-md-10 col-md-offset-1"> 
	<form class="form-horizontal" method="post" action="" name="pk">
		<fieldset>
			<div class="row form-group">
				<div class="col-md-6">
					<%@include file="commons/clock.jsp"%>
				</div>
			</div>
			
			
 	       <div class="row form-group">
                 <div id="productrefresh">
		        										  
					  <label class="col-md-2 control-label" for="proName">All Product Name<sup>*</sup></label>  
          					  <div class="col-md-8">
								<div class="input-group">
									<span class="input-group-addon">
										<i class="	glyphicon glyphicon-list-alt"></i>
									</span>
											
									<%
								ProductDetailsHelper cdh = new ProductDetailsHelper();
           					   List pdList =cdh.getAllMainProdInfopack(request);
							  
							
							%>
							<input list="product_drop1" id="proName1" placeholder="All Product Name" class="form-control" onchange="productDetailstock()">
						    <datalist id="product_drop1">
							<%
					           for(int i=0;i<pdList.size();i++){
					        	   ProductDetailsBean cat=(ProductDetailsBean)pdList.get(i);
							%>		
							<option data-value="<%=cat.getCatname()%>"
							        value="<%=cat.getCatname()%> :::>>> <%=cat.getSubcatname()%> :::>>> <%=cat.getProductName()%> :::>>> <%=cat.getWeight()%>"
						            myvalue ="<%=cat.getProductName()%>"
						            myvalue1="<%=cat.getFk_cat_id()%>"
									myvalue2="<%=cat.getFk_subCat_id()%>"
									myvalue3="<%=cat.getProdctId()%>"
									myvalue4="<%=cat.getWeight()%>"
									myvalue5="<%=cat.getProductName()%>"
							>
							<%
				      			}
				    		%>
			             
            			   </datalist>						
						</div>
					</div>
			    </div>
        	  </div> 

		 <div class="row form-group">
					  <label class="col-md-2 control-label" for="proName">Weight<sup>*</sup></label>  
           			 <div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="	glyphicon glyphicon-hand-right"></i>
							</span>

				<input type="text" id="weight"  class="form-control" placeholder="Weight">		
						
						
            			</div>
           </div>
  					  <label class="col-md-2 control-label" for="proName">Packing Unit<sup>*</sup></label>  
           			 <div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="	glyphicon glyphicon-hand-right"></i>
							</span>
						
						<select class="form-control" id="packunit">
				<option value="Grams">Grams</option>
				<option value="Kilograms">Kilograms</option>
				<option value="Litre">Litre</option>				
				<option value="Millitre">Millitre</option>
											
						</select>
            			</div>
           </div>
              	
          </div>
          
          <div class="row form-group">
					  <label class="col-md-2 control-label" for="proName">Packing Quantity<sup>*</sup></label>  
           			 <div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="	glyphicon glyphicon-hand-right"></i>
							</span>
							
						<input type="text" id="packing" placeholder="Quantity to pack" class="form-control" onchange="getpack()">
				 	
               		</div>
              	</div>
              	 <label class="col-md-2 control-label" for="proName">Packed Kg<sup>*</sup></label>  
           			 <div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="	glyphicon glyphicon-hand-right"></i>
							</span>
							
						<input type="text" id="packquan" placeholder="Quantity to pack" class="form-control" readonly="readonly">
				 	
               		</div>
              	</div>
				
           </div>
              	
              	
           		 <div class="row form-group" style="display: none;">
					  <label class="col-md-2 control-label" for="proName">Stock<sup>*</sup></label>  
           			 <div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="	glyphicon glyphicon-hand-right"></i>
							</span>
							
						<input readonly="readonly" type="text" id="stock"  class="form-control">
				 	
               		</div>
              	</div>
              	
              	<label class="col-md-2 control-label">pkID<sup>*</sup></label>  
           			 <div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="	glyphicon glyphicon-hand-right"></i>
							</span>
							
						<input readonly="readonly" type="text" id="pkid"  class="form-control">
				 	
               		</div>
              	</div>
          </div>
          
          <div class="row form-group" style="display: none;">
					  <label class="col-md-2 control-label" for="proName">Unit<sup>*</sup></label>  
           			 <div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="	glyphicon glyphicon-hand-right"></i>
							</span>
							
						<input readonly="readonly" type="text" id="unit"  class="form-control">
				 	
               		</div>
              	</div></div>
              	
                     					
           			
				<!-- <div class="form-group row">
					<div class="col-md-10 text-center">
						<input type="button" id="save" name="btn" style="font-size: 25px; width: 130px; height: 60px; padding-top: 0px;"
							class="btn btn-large btn-success glyphicon glyphicon-save  button-height-width"
							onclick="addpacking()" value="Submit"> 
							
						<input id="save"name="btn" style="font-size: 25px;width: 130px;height: 60px; padding-top: 0px;"
							class="btn btn-large btn-danger glyphicon glyphicon-remove-circle  button-height-width"
							type="reset" onclick="reset()" value="Cancel">
					</div>
				</div> -->
		
		
				<div class="row form-group">
				<div align="center" style="padding-right: 120px;padding-top: 25px;">
					
					<input type="button" id="billingCreditBtn" style="font-size: 25;width: 128px; height: 53px;" class="btn btn-large btn-success button-height-width" name="btn" onclick="addpacking()" value="Submit">
		           	<input type="reset"  id="save" style="font-size: 25;width: 128px; height: 53px;" class="btn btn-large btn-danger  button-height-width" name="btn" type="reset" onclick="reset()" value="Cancel">	  
					<input style="height: 53px; width: 128; font-size: 25" type="button" value=" List"  id="listBtn" class="btn btn-primary" onclick="productlist()" /> 
              			 
				</div>
			</div>	
		
		
		
		</fieldset>
	</form>
</div></div>


<jsp:include page="commons/footer.jsp"></jsp:include>
</body>