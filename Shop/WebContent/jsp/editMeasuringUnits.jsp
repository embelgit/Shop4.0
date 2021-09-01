
<%@page import="com.Fertilizer.hibernate.MeasuringUnitsBean"%>
<%@page import="com.Fertilizer.dao.MeasuringUnitsDao"%>

<%boolean isHome = false;
%>
<%@include file="commons/header.jsp"%>
 
<head>
<meta charset="utf-8">
<%--
<script type="text/javascript">
          		 function checkForDuplicateUnitEntry()
          		{   
          			<%
          				MeasuringUnitsDao dao2 = new MeasuringUnitsDao();
          				List list = dao2.getAllUnits();
          			%>
          			
          			<%
          				int z = 0;
          				for(z=0;z<list.size();z++)
          				{
          					MeasuringUnitsBean bean = (MeasuringUnitsBean)list.get(z);
          			%>
          				var Unit = "<%=bean.getUnitName()%>";
          	
          				if(document.getElementById("unitName").value == Unit )
              			{
          					var msg="unit Name already exist...Duplicate are Not allowed";
          					var dialog = bootbox.dialog({
          						//title: "Embel Technologies Says :",
          					    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
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
 --%>
          		<script type="text/javascript">
					function back()
					{
						window.location = "measuringUnits.jsp";
					}

          		</script>
          		
<script type="text/javascript" src="/Shop/staticContent/js/bootstrap.js"></script>
<script type="text/javascript" src="/Shop/staticContent/js/bootbox.min.js"></script>
          		
<script type="text/javascript" src="/Shop/staticContent/js/units.js"></script>
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
        <form class="form-horizontal" method="post" action="" name="munits"><!-- Value of 'name' attribute is used in customerDetails.js  -->
          <fieldset>
			<div class="row form-group">
           	 		<div class="col-md-6">
              			<%@include file="commons/clock.jsp" %>
           		 	</div>
			</div>
			 <div class="row form-group">
           		<label class="col-md-2 control-label" for="unitName">SI Unit<sup>*</sup></label>  
           	 		<div class="col-md-3">
            			<div class="input-group">
							<span class="input-group-addon">
								<i class="	glyphicon glyphicon-list-alt"></i>
							</span>
              				
							<%
								MeasuringUnitsDao dao = new MeasuringUnitsDao();
           						List taxPerList =dao.getAllUnits(request);
							
							%>
							<input list="unitName_drop" id="unitName" name="unitName" placeholder="Unit Name" class="form-control" onchange="getUnitDetails()" style="text-transform: lowercase;">
							<datalist id="unitName_drop">
							<%
					           for(int i=0;i<taxPerList.size();i++){
					        	   MeasuringUnitsBean bean =(MeasuringUnitsBean)taxPerList.get(i);
							%>
		
							<option data-value="<%=bean.getPkUnitId()%>"
									 value="<%=bean.getUnitName()%>">
							<%
				      			}
				    		%>
			              	
            			</datalist>
            			</div>
           		 	</div>

           		 </div>
           		 
           		 
           	<div class="row form-group">
           		<label class="col-md-2 control-label" for="unitName">New SI Unit<sup>*</sup></label>  
           	 		<div class="col-md-3">
            			<div class="input-group">
							<span class="input-group-addon">
								<i class="	glyphicon glyphicon-list-alt"></i>
							</span>
              				
							
							<input id="unitName2" name="unitName2" placeholder="New SI Unit" class="form-control" style="text-transform: lowercase;">
							
							
            			</div>
           		 	</div>
           		 	
           		 	<label class="col-md-3 control-label" for="unitDescription">New SI Unit Description<sup>*</sup></label>  
           	 		<div class="col-md-3">
            			<div class="input-group">
							<span class="input-group-addon">
								<i class="	glyphicon glyphicon-list-alt"></i>
							</span>
              				
              				<input id="unitDescription" name="unitDescription" placeholder="New SI Unit Description" class="form-control">
								
			    			</div>
           		 	</div>
           		 </div>
           		 
           		 
           		 
           		 <div class="form-group row">
		            <div class="col-md-6 text-center col-md-offset-2" style="padding-top:2%">
			       	           		   		 
		           		 <input style="width: 128px;height: 53px;font-size: 25" type="button" id="save"    name="btn"  class="btn btn-success" value="Update" onclick="updateMeasuringUnit()" >
		           		 <input style="width: 128px;height: 53px;font-size: 25" type="reset"  id="save"    name="btn"  class="btn  btn-danger" value="Cancel" onclick="reset()" >
		           		 <input style="width: 128px;height: 53px;font-size: 25" type="button" id="listBtn" name="btn"  class="btn btn-primary" value="Back"   onclick="back()" /> 
	              		  
	           		</div>
         		</div>
           	</fieldset>
          </form>
         </div>
       <%@include file="commons/footer.jsp" %>