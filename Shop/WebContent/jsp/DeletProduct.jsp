<%@page import="com.Fertilizer.hibernate.CustomerDetailsBean"%>
<%@page import="com.Fertilizer.dao.CustomerDetailsDao"%>
<%@page import="com.Fertilizer.hibernate.GodownEntry"%>
<%@page import="com.Fertilizer.dao.GodownEntryDao"%>
<%boolean isHome = false;
%>
<%@include file="commons/header.jsp"%>
 
<head>

<script>
function backToProductList()
{
	window.location = "productList.jsp";
}

</script>
<!-- <link rel="stylesheet" href="/Fertilizer/staticContent/css/bootstrap.min.css"> -->
<meta charset="utf-8">
<script type="text/javascript" src="/Shop/staticContent/js/DelProduct.js"></script>
</head>
		 	<div class="row header_margin_top">
			    <div align="center">
			  		<h2 class="form-name style_heading"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("godownDetails") %> <%}%> <%if(abc.equals("english")){%>Delete Product<%}%> </h2>
			  	</div>
			 
    </div>
     <div class="row">
		     <div class="col-sm-offset-1 col-md-10">
				  		<hr style="border-top-color:#c1b1b1;">
		     </div>	
    </div>
	<div class="container col-sm-offset-2" >
        <form class="form-horizontal" method="post" action="" name="delPro"> <!-- Value of 'name' attribute is used in categoryDetails.js  -->
          <fieldset>
			<div class="row form-group">
           	 		<div class="col-md-6">
              			<%@include file="commons/clock.jsp" %>
           		 	</div>
			</div>
			 <div class="row form-group">
           		<label class="col-md-offset-2  col-md-2  control-label" for="godown"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("godownName") %> <%}%> <%if(abc.equals("english")){%>Product Name<%}%><sup>*</sup></label>  
           	 		<div class="col-md-3">
            			<div class="input-group">
							<span class="input-group-addon">
								<i class="	glyphicon glyphicon-hand-right"></i>
							</span>
              				
							<%
							ProductDetailsDao dao1 = new ProductDetailsDao();
           						List unitList =dao1.getAllProduct();
							
							%>
							<input list="proName_drop1" id="delProName"  class="form-control">
				<datalist id="proName_drop1">
							<%
					           for(int i=0;i<unitList.size();i++){
					        	   ProductDetailsBean bean1 =(ProductDetailsBean)unitList.get(i);
							%>
		
							<option data-value="<%=bean1.getProdctId()%>" value="<%=bean1.getProductName()%>">
							<%
				      			}
				    		%>
			              	
            			</datalist>
            			</div>
           		 	</div>
				</div>
				
				<div class="form-group row">
		            <div class="col-md-10 text-center">
		           <!--  "catDetails()" function is implemented in categoryDetails.js -->
       <input type="button"  id="btn" name="btn" style="font-size: 25" class="btn btn-large btn-success button-height-width"  onclick="delProduct()" value="Submit">
       <input type="button" id="save" name="btn" style="font-size: 25" class="btn btn-large btn-danger glyphicon-remove-circle  button-height-width" type="reset"  onclick="reset()" value="Cancel">
       <input type="button" id="save" name="btn" style="font-size: 25" class="btn btn-large btn btn-primary button-height-width" onclick="backToProductList()" value="Back">
              	
              	<%-- <button id="save" name="btn" class="btn btn-large btn-success glyphicon glyphicon-save  button-height-width"  onclick="GoDetails()"><h4><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("submit") %> <%}%> <%if(abc.equals("english")){%>Submit<%}%> </h4></button>
              	<button class="btn btn-large btn-danger glyphicon glyphicon-remove-circle  button-height-width" type="reset"  onclick="reset()"><h4> Cancel</h4> </button> --%>


		            </div>
         </div>
		</fieldset>
       </form>
     </div>
     
     <jsp:include page="commons/footer.jsp"></jsp:include>