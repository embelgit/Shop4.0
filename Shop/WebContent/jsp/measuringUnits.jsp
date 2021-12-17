
<%@page import="com.Fertilizer.hibernate.MeasuringUnitsBean"%>
<%@page import="com.Fertilizer.dao.MeasuringUnitsDao"%>

<%boolean isHome = false;
%>
<%@include file="commons/header.jsp"%>
 
<head>
<script type="text/javascript" src="/Shop/staticContent/js/bootbox.min.js"></script>
<script type="text/javascript" src="/Shop/staticContent/js/jquery-1.12.3.min.js"></script>
		
<link rel="stylesheet" href="/Shop/staticContent/css/bootstrap.min.css">
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

<meta charset="utf-8">
<script type="text/javascript">
          		function checkForDuplicateUnitEntry()
          		{   
          			<%
          				MeasuringUnitsDao dao2 = new MeasuringUnitsDao();
          				List list = dao2.getAllUnits(request);
          			%>
          			
          			<%
          				for(int z=0;z<list.size();z++)
          				{
          					MeasuringUnitsBean bean = (MeasuringUnitsBean)list.get(z);
          			%>
          				var Unit = "<%=bean.getUnitName()%>";
          	
          				if(document.getElementById("unitName").value == Unit )
              			{  
          					var msg="Unit Name already exist. !! Duplicates are Not allowed.";
          					var dialog = bootbox.dialog({
          					    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
          					    closeButton: false
          					});
          					
          					setTimeout(function() {
          						dialog.modal('hide');
          					}, 2000);

          					document.getElementById("unitName").value = "";

          					return false;
          				}
          			<%
          			}
          			%>
          		}          		
          		</script>
          		
          		<script>
	          		function unitlist()
	          		{
		        		window.location="measuringUnitList.jsp";  		
	              	}
          		</script>
          		
          		<script type="text/javascript">
					function editUnit()
					{
						window.location="editMeasuringUnits.jsp";
					}
					function addMeasuringUnit1()
					{
						document.munits.save.disabled = true;
						addMeasuringUnit();
					}
					
          		</script>
          		      		
<script type="text/javascript" src="/Shop/staticContent/js/bootstrap.js"></script>
<script type="text/javascript" src="/Shop/staticContent/js/bootbox.min.js"></script>
          		
<script type="text/javascript" src="/Shop/staticContent/js/units.js"></script>

<!-- 	<script>
		
		$(document).ready(function(){
	  		 $("#unitName").change(function(){
	       	$(this).find("option:selected").each(function(){
	           	if($(this).attr("value")=="cheque"){
	           	
	           	$("#cheque_no").show(); 
	           	
	           	$("#neft_acc_no").hide(); 
	           	$("#card_no").hide();
	           	}
	          	 else if($(this).attr("value")=="card"){
	           	
	          		$("#card_no").show(); 	
	          		
	          		$("#neft_acc_no").hide(); 
	        		$("#cheque_no").hide();
	           }
	          	 else if($(this).attr("value")=="neft"){
	                	
	           		$("#neft_acc_no").show(); 	
	           		
	           		$("#card_no").hide(); 
	        		$("#cheque_no").hide();
	            }
	          	 else if($(this).attr("value")=="cash"){
	             	
	            		$("#neft_acc_no").hide(); 
	            		$("#cheque_no").hide();
	            		$("#card_no").hide(); 
	             }
	           	
	          	else if($(this).attr("value")=="selected"){
	             	
	        		$("#neft_acc_no").hide(); 
	        		$("#cheque_no").hide();
	        		$("#card_no").hide(); 
	         }
	          
	       });
	   }).change();
		});	
		</script>
 -->

<script>
function uvalue(){
	
	var un = document.getElementById("unitName").value;
	var ud = document.getElementById("unitDescription").value;

	if(un==ud){
			document.getElementById("unitvalue").value = 1;
	}
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
			  		<h2 class="form-name style_heading">Measuring Units</h2>
			  	</div>
			 
    </div>
     <div class="row">
		     <div class="col-sm-offset-1 col-md-10">
				  		<hr style="border-top-color:#c1b1b1;">
		     </div>	
    </div>
	<div class="container col-sm-offset-2" >
        <form class="form-horizontal" method="post" action="" name="munits">               <!-- Value of 'name' attribute is used in customerDetails.js  -->
          <fieldset>
			<div class="row form-group">
           	 		<div class="col-md-6">
              			<%@include file="commons/clock.jsp" %>
           		 	</div>
			</div>
	<%-- 		 <div class="row form-group">
           		<label class="col-md-1 control-label" for="unitName">SI Unit<sup>*</sup></label>  
           	 		<div class="col-md-3">
            			<div class="input-group">
							<span class="input-group-addon">
								<i class="	glyphicon glyphicon-list-alt"></i>
							</span>
              				
							<%
								MeasuringUnitsDao dao = new MeasuringUnitsDao();
           						List taxPerList =dao.getAllUnits(request);
							
							%>
							<input list="unitName_drop" id="unitName" name="unitName" placeholder="Unit Name" class="form-control" onchange="checkForDuplicateUnitEntry()" >
				<datalist id="unitName_drop">
							<%
					           for(int i=0;i<taxPerList.size();i++){
					        	   MeasuringUnitsBean bean =(MeasuringUnitsBean)taxPerList.get(i);
							%>
		
							<option data-value="<%=bean.getPkUnitId()%>" value="<%=bean.getUnitName()%>">
							<%
				      			}
				    		%>
			              	
            			</datalist>
            			</div>
           		 	</div>
           		 	
           		 	<label class="col-md-2 control-label" for="unitDescription">SI Unit Description<sup>*</sup></label>  
           	 		<div class="col-md-3">
            			<div class="input-group">
							<span class="input-group-addon">
								<i class="	glyphicon glyphicon-list-alt"></i>
							</span>
              				
							<%
							MeasuringUnitsDao dao1 = new MeasuringUnitsDao();
           					List unitList =dao1.getAllUnits(request);
							
							%>
							<input list="unitName_drop1" id="unitDescription" name="unitDescription" placeholder="Unit Description" class="form-control">
				<datalist id="unitName_drop1">
							<%
					           for(int i=0;i<unitList.size();i++){
					        	   MeasuringUnitsBean bean1 =(MeasuringUnitsBean)unitList.get(i);
							%>
		
							<option data-value="<%=bean1.getPkUnitId()%>" value="<%=bean1.getUnitDescription()%>">
							<%
				      			}
				    		%>
			              	
            			</datalist>
            			</div>
           		 	</div>
           		 </div> --%>
           		  
           		 
            	<div class="row form-group">
           		<label class="col-md-2 control-label" for="unitName">Primary Unit<sup>*</sup></label>  
           	 		<div class="col-md-3">
            			<div class="input-group">
							<span class="input-group-addon">
								<i class="	glyphicon glyphicon-list-alt"></i>
							</span>
              				
							
<!-- 							<input list="unitName_drop" id="unitName" name="unitName" placeholder="Unit Name" class="form-control" onchange="checkForDuplicateUnitEntry()" > -->
				<select placeholder="Unit Name" class="form-control" id="unitName" onchange="checkForDuplicateUnitEntry()">
				<option value="">Select Primary Unit</option>
				<option value="Bags">Bags</option>
				<option value="Bottles">Bottles</option>
				<option value="Box">Box</option>
				<option value="Bundles">Bundles</option>
				<option value="Cans">Cans</option>
				<option value="Cartons">Cartons</option>
				<option value="Dozens">Dozens</option>
				<option value="Grams">Grams</option>
				<option value="Kilograms">Kilograms</option>
				<option value="Litre">Litre</option>				
				
				<option value="Meters">Meters</option>
				<option value="Milliliter">Milliliter</option>
				<option value="Numbers">Numbers</option>
				<option value="Packs">Packs</option>
				<option value="Pairs">Pairs</option>
				<option value="Pieces">Pieces</option>
				<option value="Quintal">Quintal</option>
				<option value="Rolls">Rolls</option>
				<option value="Feet">Feet</option>
				<option value="Square Feet">Square Feet</option>
				<option value="Square Meters">Square Meters</option>				
				<option value="Barrel">Barrel</option>
				<option value="Tin">Tin</option>
				<option value="Tablets">Tablets</option>
				</select>
            			</div>
           		 	</div>
           		 	<div style="display: none;">
           		 	<label class="col-md-2 control-label" for="unitDescription">Secondary Unit<sup>*</sup></label>  
           	 		<div class="col-md-3">
            			<div class="input-group">
							<span class="input-group-addon">
								<i class="	glyphicon glyphicon-list-alt"></i>
							</span>
              				<select id="unitDescription" name="unitDescription" placeholder="Secondary Unit" class="form-control" onchange="uvalue()">
								<option value="">Select Secondary Unit</option>
				<option value="Bags">Bags</option>
				<option value="Bottles">Bottles</option>
				<option value="Box">Box</option>
				<option value="Bundles">Bundles</option>
				<option value="Cans">Cans</option>
				<option value="Cartons">Cartons</option>
				<option value="Dozens">Dozens</option>
				<option value="Grams">Grams</option>
				<option value="Kilograms">Kilograms</option>
				<option value="Litre">Litre</option>				
				
				<option value="Meters">Meters</option>
				<option value="Milliliter">Milliliter</option>
				<option value="Numbers">Numbers</option>
				<option value="Packs">Packs</option>
				<option value="Pairs">Pairs</option>
				<option value="Pieces">Pieces</option>
				<option value="Quintal">Quintal</option>
				<option value="Rolls">Rolls</option>
				<option value="Feet">Feet</option>
				<option value="Square Feet">Square Feet</option>
				<option value="Square Meters">Square Meters</option>				
				<option value="Tablets">Tablets</option>			
				</select>						
<!-- 							<input list="unitName_drop1" id="unitDescription" name="unitDescription" placeholder="Unit Description" class="form-control"> -->
				
           		 	</div>
           		 </div></div>
           		 </div>
            		 
           		 
           		 <div class="row form-group" style="display: none;">
           		<label class="col-md-2 control-label" for="unitName">1 Primary Unit<sup>*</sup></label>  
           	 		<div class="col-md-3">
            			<div class="input-group">
							<span class="input-group-addon">
								<i class="	glyphicon glyphicon-list-alt"></i>
							</span>
  				<input type="text" id="1unit" name="1unit" value="1" class="form-control" readonly="readonly" >
							
            			</div>
           		 	</div>
           		 	
           		 	
           		 	<label class="col-md-2 control-label" for="unitDescription">=     Secondary Unit<sup>*</sup></label>  
           	 		<div class="col-md-3">
            			<div class="input-group">
							<span class="input-group-addon">
								<i class="	glyphicon glyphicon-list-alt"></i>
							</span>
              				
							<input type="text" id="unitvalue" name="unitvalue" value="1" placeholder="Unit Conversion" class="form-control" >
            			</div>
           		 	</div>
           		 </div>
           	
           		 <div class="form-group row">
		            <div class="col-md-6 text-center col-md-offset-2" style="padding-top:2%" >
		            <!--  "customerDetails()" function is implemented in customerDetails.js  -->
	           		   		 
	           		 <input type="button" id="save"    style="font-size: 25;width: 128px;height: 53px;" class="btn btn-success" name="save" onclick="addMeasuringUnit1()" value="Submit">
	           		 <input type="reset"  id="reset"   style="font-size: 25;width: 128px;height: 53px;" class="btn  btn-danger" name="btn" onclick="reset()" value="Cancel">
	           		 <input type="button" id="listBtn" style="font-size: 25;width: 128px;height: 53px;" class="btn btn-primary" onclick="unitlist()" value="List" /> 
              		 <input type="button" id="listBtn" style="font-size: 25;width: 128px;height: 53px;" class="btn btn-primary" onclick="editUnit()" value="Edit" />
              		
              		
	           		<!--  <button id="save" name="btn" class="btn btn-large btn-success glyphicon glyphicon-save  button-height-width"  onclick="addUnit()"><h4> Submit</h4></button>
              	<button class="btn btn-large btn-danger glyphicon glyphicon-remove-circle  button-height-width" type="reset"  onclick="reset()"><h4> Cancel</h4> </button> -->
	           		 
	           		 </div>
         		</div>
           	</fieldset>
          </form>
         </div>
       <%@include file="commons/footer.jsp" %>