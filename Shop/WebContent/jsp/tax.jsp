<%@page import="com.Fertilizer.hibernate.TaxCreationBean"%>
<%@page import="com.Fertilizer.dao.TaxCreationDao"%>
<%boolean isHome = false;%>
<%@include file="commons/header.jsp"%>
<head>
<meta charset="utf-8">
<title>Tax Creation</title>
<script type="text/javascript" src="/Shop/staticContent/js/bootstrap.js"></script>
<script type="text/javascript" src="/Shop/staticContent/js/bootbox.min.js"></script>
<script type="text/javascript" src="/Shop/staticContent/js/taxCreation.js"></script>
<script type="text/javascript">
function taxlist()
	 {
	
	 	 window.location = "taxList.jsp";

	 }
	 function editTax()
	 {
		 window.location = "TaxEdit.jsp";
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

		if(document.getElementById("taxType").value == taxType )
	 	{
			var msg="Tax Type already exist...Duplicate Not allowed";
			var dialog = bootbox.dialog({
			//title: "Embel Technologies Says :",
		    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
		    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		    closeButton: false
		});
		
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);

		document.getElementById("taxType").value = "";

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
		     <div class="col-sm-offset-2 col-md-10">
				  		<hr style="border-top-color:#c1b1b1;">
		     </div>	
    </div>
<div class="container col-sm-offset-2" >
        <form class="form-horizontal" method="post" action="" name="txc"><!-- Value of 'name' attribute is used in  taxCreation.js  -->
          <fieldset>
          		<div class="row form-group">
           	 		<div class="col-md-6">
              			<%@include file="commons/clock.jsp" %>
           		 	</div>
				</div>
				 <div class="row form-group">
           				<label class="col-md-2 control-label" for="taxType">Tax Name<sup>*</sup></label>  
		           	 <div class="col-md-3">
            			<div class="input-group">
							<span class="input-group-addon">
								<i class="	glyphicon glyphicon-list-alt"></i>
							</span>
              				
							<!-- Following code is to get categories from "categories" table of "fertilizer" DB -->
							<!-- getAllMainCat() is implemented in  CategoryDetailsDao with return type List-->
							<%
							TaxCreationDao cdd = new TaxCreationDao();
           						List cList =cdd.getAllTax(request);
							
							%>
							<input list="tax_drop" id="taxType" onkeypress="return disableSpaceKey()" placeholder="Tax Name" onchange="checkForDuplicateTaxTypeEntry()" class="form-control">
							<datalist id="tax_drop">
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
            		
            		<label class="col-md-2 control-label" for="taxPercentage">SGST<sup>*</sup></label>  
            		<div class="col-md-3">
            			<div class="input-group">
							<span class="input-group-addon">
								%
							</span>
              											
							<input type="text" id="sgst" placeholder="SGST" class="form-control" onchange="calculateTax()">
							
            			</div>
					</div>

            	
				</div>
				
				<div class="row form-group">
           				<label class="col-md-2 control-label" for="taxType">CGST<sup>*</sup></label>  
		           	 <div class="col-md-3">
            			<div class="input-group">
							<span class="input-group-addon">
								%
							</span>
              											
							<input type="text" id="cgst" placeholder="CGST" class="form-control" onchange="calculateTax()">
							
            			</div>
            		</div>

            	<label class="col-md-2 control-label" for="taxPercentage">GST %<sup>*</sup></label>  
            		<div class="col-md-3">
            			<div class="input-group">
							<span class="input-group-addon">
								%
							</span>
							<%
							TaxCreationDao dao = new TaxCreationDao();
           						List taxPerList =dao.getAllTax(request);
							
							%>
							<input list="tax_per_drop" id="taxPercentage" placeholder="GST %" class="form-control">
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
           			<div class="col-12 col-sm-6 col-md-6 text-center col-md-offset-2">
           			
						<input style="height: 53px; width: 128;font-size: 25" type="button" id="save"    class="btn  btn-success" name="btn"  onclick=" return addtax() " value="Submit">
						<input style="height: 53px; width: 128;font-size: 25" type="reset"  id="reset"   class="btn  btn-danger"  name="btn"   onclick="reset()" value="Cancel">
						<input style="height: 53px; width: 128;font-size: 25" type="button" id="listBtn" class="btn btn-primary" onclick="taxlist()" value="List" /> 
	              		<input style="height: 53px; width: 128;font-size: 25" type="button" id="listBtn" class="btn btn-primary" onclick="editTax()" value="Edit" /> 

            		</div>
          		</div>
			</fieldset>
		</form>
	</div>
	
<jsp:include page="commons/footer.jsp"></jsp:include>