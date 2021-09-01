<%@page import="com.Fertilizer.dao.TaxCreationDao"%>
<%@page import="com.Fertilizer.hibernate.TaxCreationBean"%>
<%@page import="java.util.List"%>

<%boolean isHome = false;%>
<%@include file="commons/header.jsp"%>
<head>
<meta charset="utf-8">
<title>Tax Creation</title>
<script type="text/javascript" src="/Shop/staticContent/js/taxCreation.js"></script>

<script type="text/javascript">
				function ChooseContact(data)
				{
					document.getElementById("taxPercentage").value=(data.options[data.selectedIndex].getAttribute("myid"));
				}
				function backToTaxEntry()
				{
					window.location = "tax.jsp";
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
			  		<h2 class="form-name style_heading">Edit Tax Details</h2>
			  	</div>
			 
    </div>
     <div class="row">
		     <div class="col-sm-offset-1 col-md-10">
				  		<hr style="border-top-color:#c1b1b1;">
		     </div>	
    </div>
<div class="container col-sm-offset-" >
        <form class="form-horizontal" method="post" action="" name="txc"><!-- Value of 'name' attribute is used in  taxCreation.js  -->
          <fieldset>
          		<div class="row form-group">
           	 		<div class="col-md-6">
              			<%@include file="commons/clock.jsp" %>
           		 	</div>
				</div>
				 <div class="row form-group">
           				<label class="col-md-3 control-label" for="taxType">Tax Type<sup>*</sup></label>  
		           	 <div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="	glyphicon glyphicon-list-alt"></i>
							</span>
							<%
							TaxCreationDao cdd = new TaxCreationDao();
           						List cList =cdd.getAllTax(request);
							
							%>
							<input list="tax_drop1" id="taxType1" placeholder="Tax Type"  class="form-control" onchange="fetchtaxdetailsforedit()">
						<datalist id="tax_drop1">
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
					<label class="col-md-2 control-label" for="taxType">New Tax Name<sup>*</sup></label>  
		           	 <div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="	glyphicon glyphicon-list-alt"></i>
							</span>
							 <input id="taxName" name="taxName" placeholder="New Tax Name" class="form-control input-md" type="text" >
            			</div>
            		</div>
            	</div>
            	
            	<div class="row form-group">
            	  <label class="col-md-3 control-label" for="taxPercentage">SGST<sup>*</sup></label>  
            		<div class="col-md-3">
            			<div class="input-group">
							<span class="input-group-addon">
								%
							</span>
              											
							<input type="text" id="sgst" placeholder="SGST" class="form-control" onchange="calculateTax()">
							
            			</div>
					</div>
            	            	
           		   <label class="col-md-2 control-label" for="taxType">CGST<sup>*</sup></label>  
		           	 <div class="col-md-3">
            			<div class="input-group">
							<span class="input-group-addon">
								%
							</span>
              											
							<input type="text" id="cgst" placeholder="CGST" class="form-control" onchange="calculateTax()">
							
            			</div>
            		</div>
				</div>
            	
				 <div class="row form-group">
				 <label class="col-md-3 control-label" for="taxPercentage">New Tax Percentage<sup>*</sup></label>  
            		<div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon">
								%
							</span>
              					 <input type="text"  name="taxPercentage" id="taxPercentage" class="form-control" placeholder="New Tax Percentage">	
            			</div>
					</div>
				 </div>
				<div class="form-group row">
           			<div class="col-md-6 text-center col-md-offset-3" style="padding-top:2%">
           			 <!--  txCreation() function is implemented in  taxCreation.js -->
					<input type="button" id="save2" name="btn"  style="height: 53px; width: 128;font-size: 25" class="btn btn-success" onclick="editTax()" value="Update">
					<input type="reset"  id="reset" name="btn1" style="height: 53px; width: 128;font-size: 25" class="btn  btn-danger" onclick="reset()" value="Cancel">
					<input type="button" id="back"  name="btn"  style="height: 53px; width: 128;font-size: 25" class="btn btn-primary" onclick="backToTaxEntry()" value="Back">

         <!--<button id="save" name="btn" class="btn btn-large btn-success glyphicon glyphicon-save  button-height-width"  onclick="addTax()"><h4> Submit</h4></button>
              	<button class="btn btn-large btn-danger glyphicon glyphicon-remove-circle  button-height-width" type="reset"  onclick="reset()"><h4> Cancel</h4> </button> -->
            		</div>
          		</div>
			</fieldset>
		</form>
	</div>
	
<jsp:include page="commons/footer.jsp"></jsp:include>