
<%@page import="com.Fertilizer.hibernate.MeasuringUnitsBean"%>
<%@page import="com.Fertilizer.dao.MeasuringUnitsDao"%>
<%@page import="com.Fertilizer.utility.PropertiesHelper"%>
<%@page import="java.util.*" %>

<%boolean isHome = false;
%>

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
 
<head>
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
          					alert("Unit Name already exist...Duplicate are Not allowed");
      					    location.reload();
          					return false;
          				}
          			<%
          			}
          			%>
          		} 
          		
          		function back()
          		{
          			window.close();
          		}
          		</script>
          		
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

          		
<script type="text/javascript" src="/Shop/staticContent/js/units.js"></script>

<script type="text/javascript">

function addMeasuringUnit1()
{
	document.munits.save.disabled = true;
	addMeasuringUnit();
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
	<div class="container col-sm-offset-1" >
        <form class="form-horizontal" method="post" action="" name="munits">                     <!-- Value of 'name' attribute is used in customerDetails.js  -->
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
								<i class="	glyphicon glyphicon-hand-right"></i>
							</span>
              				
							<%
								MeasuringUnitsDao dao = new MeasuringUnitsDao();
           						List taxPerList =dao.getAllUnits(request);
							
							%>
							<input list="unitName_drop" id="unitName" name="unitName" placeholder="SI Unit" class="form-control" onchange="checkForDuplicateUnitEntry()" >
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
           		 	
           		 	<label class="col-md-3 control-label" for="unitDescription">SI Unit Description<sup>*</sup></label>  
           	 		<div class="col-md-3">
            			<div class="input-group">
							<span class="input-group-addon">
								<i class="	glyphicon glyphicon-hand-right"></i>
							</span>
              				
							<%
							MeasuringUnitsDao dao1 = new MeasuringUnitsDao();
           					List unitList =dao1.getAllUnits(request);
							
							%>
							<input list="unitName_drop1" id="unitDescription" placeholder="SI Unit Description" name="unitDescription" class="form-control">
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
           		 </div>
           		 <div class="form-group row" style="padding-top:2%">
		            <div class="col-md-6 text-center col-md-offset-3">
		            <!--  "customerDetails()" function is implemented in customerDetails.js  -->
	           		   		 
	           		 <input type="button" id="save" name="save" style="width: 128px;height: 53px;font-size: 25" class="btn  btn-success" onclick="addMeasuringUnit1()" value="Submit">
	           		 <input type="reset"  id="save" name="btn"  style="width: 128px;height: 53px;font-size: 25" class="btn  btn-danger"  onclick="back()" value="Cancel">
	           		 <!-- <input type="button" id="save" name="btn"  style="width: 128px;height: 53px;font-size: 25" class="btn btn-primary"  onclick="back()" value="Back"> -->
	           		 
	           		<!--  <button id="save" name="btn" class="btn btn-large btn-success glyphicon glyphicon-save  button-height-width"  onclick="addUnit()"><h4> Submit</h4></button>
              	<button class="btn btn-large btn-danger glyphicon glyphicon-remove-circle  button-height-width" type="reset"  onclick="reset()"><h4> Cancel</h4> </button> -->
	           		 
	           		 </div>
         		</div>
           	</fieldset>
          </form>
         </div>
       <%@include file="commons/footer.jsp" %>