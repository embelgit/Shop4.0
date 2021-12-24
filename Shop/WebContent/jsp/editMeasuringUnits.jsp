
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
<link rel="stylesheet" href="/Shop/staticContent/css/shopstyle.css">
</head>
<body>
<div class="container-fluid">
<div class="row header_margin_top">
			    <div align="center">
			  		<h2 class="form-name style_heading">Measuring Units</h2>
			  	</div>
			 
    </div>
    
    <div class="row" align="center">
		<div class="hr-width">
			<hr class="style-one">
		</div>	
    </div>
	
	<div class="container">
        <form class="form-horizontal" method="post" action="" name="munits"><!-- Value of 'name' attribute is used in customerDetails.js  -->
          <fieldset>
          <div class="shopform-margin">
			<div class="row form-group">
           	 		<div class="col-md-6">
              			<%@include file="commons/clock.jsp" %>
           		 	</div>
			</div>
			 <div class="row">
           		<div class="form-group">
           			<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
           				<label class="control-label" for="unitName">SI Unit<sup>*</sup></label>  
           	 		</div>
           	 		<div class="col-lg-3 col-md-3 col-sm-8">
            			<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-list-alt"></i>
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
           		 	
           		 	<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">
	           			<label class="control-label" for="unitName">New SI Unit</label>  
	           	 	</div>	
           	 		<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
            			<div class="input-group">
							<span class="input-group-addon">
								<i class="	glyphicon glyphicon-list-alt"></i>
							</span>
              				
							
							<input id="unitName2" name="unitName2" placeholder="New SI Unit" class="form-control" style="text-transform: lowercase;">
							
							
            			</div>
           		 	</div>
           		 </div>
       		 </div>
           		 
           		 
           	<div class="row">
	           	<div class="form-group">	           		
           		 	<div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">
           		 		<label class="control-label" for="unitDescription">New SI Unit Description</label>  
           	 		</div>
           	 		<div class="col-lg-3 col-md-3 col-sm-8">
            			<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-list-alt"></i>
							</span>
              				
              				<input id="unitDescription" name="unitDescription" placeholder="New SI Unit Description" class="form-control">
								
			    			</div>
           		 	</div>
           		 </div>
           		 </div>
           		 
           		 </div>
           	</fieldset>
          </form>	 
           		 
           		 <div class="row buttons-margin" align="center">		       	           		   		 
		           	<input type="button" id="save" name="btn" class="btn btn-success" value="Update" onclick="updateMeasuringUnit()">
		           	<input type="reset" id="save" name="btn" class="btn btn-danger" value="Cancel" onclick="reset()">
		           	<input type="button" id="listBtn" name="btn" class="btn btn-primary" value="Back" onclick="back()"/> 
	        	</div>
           	
         </div>
</div>
</body>
       <%@include file="commons/footer.jsp" %>