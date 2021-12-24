<% boolean isHome=false;%>
<%@include file="commons/header.jsp"%>
<head>
 <meta charset="utf-8">
  <script type="text/javascript" src="/Shop/staticContent/js/bootstrap.js"></script>
 <script type="text/javascript" src="/Shop/staticContent/js/bootbox.min.js"></script>
 <script type="text/javascript" src="/Shop/staticContent/js/partnerDetails.js"></script>
 <link rel="stylesheet" href="/Shop/staticContent/css/shopstyle.css">
 <script type="text/javascript">
 	
function partnerlist()
{
	window.location = "partnerList.jsp";
}
function editPartner()
{
	window.location = "editpartnerDetails.jsp";
}
</script>          		
 
</head>
<body>
<div class="container-fluid">
   <div class="row header_margin_top">
			    <div align="center">
			  		<h2 class="form-name style_heading"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("supplierdetails") %> <%}%> <%if(abc.equals("english")){%>Partner Details<%}%></h2>
			  	</div>
			 
    </div>
    <div class="row" align="center">
		<div class="hr-width">
			<hr class="style-one">
		</div>	
    </div>
      
      <div class="container" >
        <form class="form-horizontal" method="post" action="" name="partnm">
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
            			<label class="control-label" for="partnerName"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("dealerName") %> <%}%> <%if(abc.equals("english")){%>Partner Name<%}%><sup>*</sup></label>  
            		</div>	
            		<div class="col-lg-3 col-md-3 col-sm-8">
            			<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-user"></i>
							</span>
							 <input type="text" id="partnerName" name="partnerName" placeholder="Partner Name" class="form-control input-md ">
				   		</div>
            		</div>
            		<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">	
            			<label class="control-label" for="contactNo"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("contactNumber") %> <%}%> <%if(abc.equals("english")){%>Contact Number<%}%></label>
            		</div>
            		<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
    					<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-phone"></i>
							</span>
             				<input id="contactNo" type="text" maxlength="10" name="contactNo" placeholder="Contact Number" class="form-control input-md ">
           				</div>
					</div>            
          		</div>
         	</div>
          	
        <div class="row">
            <div class="form-group">
                <div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">	
              		<label class="control-label" for="landline"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("AlternateNumber") %> <%}%> <%if(abc.equals("english")){%>Alternate Number<%}%></label>
            	</div>	
            	<div class="col-lg-3 col-md-3 col-sm-8">
					<div class="input-group">
						<span class="input-group-addon">
							<i class="glyphicon glyphicon-earphone"></i>
						</span>
              			<input id="alternateNo" name="alternateNo" placeholder="Alternate No" class="form-control input-md " maxlength="10" type="text"  >
            		</div> 
            	</div>
            	<div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">	
            		<label class="control-label" for="emailId"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("email") %> <%}%> <%if(abc.equals("english")){%>Email Id<%}%></label>
            	</div>
            	<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
					<div class="input-group">
						<span class="input-group-addon">
							<i class="glyphicon glyphicon-envelope"></i>
						</span>
              			<input id="emailId" name="emailId" placeholder="Email ID" class="form-control input-md " type="text">
            		</div>
            	</div>
            </div>		
        </div>

        
        <div class="row">
            <div class="form-group">
	            <div class="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-4">	
	            	<label class="control-label" for="city"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("city") %> <%}%> <%if(abc.equals("english")){%>City<%}%></label>
	           	</div>	
	           	<div class="col-lg-3 col-md-3 col-sm-8">
					<div class="input-group">
						<span class="input-group-addon">
							<i class="glyphicon glyphicon-map-marker"></i>
						</span>
	 			        <input id="city" name="city" placeholder="City" class="form-control input-md " type="text">
	            	</div>
				</div>
	            <div class="col-lg-2 col-md-2 col-sm-4 formspacelabel">
	            	<label class="control-label" for="address"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("address") %> <%}%> <%if(abc.equals("english")){%>Address<%}%></label>
	           	</div>	
           		<div class="col-lg-3 col-md-3 col-sm-8 formspaceinput">
					<div class="input-group">
						<span class="input-group-addon">
							<i class="glyphicon glyphicon-map-marker"></i>
						</span>
 			            <input id="address" name="address" placeholder="Address" class="form-control input-md " type="text">
            		</div>
				</div>
         	</div>
         </div>
	
	</div>
</fieldset>
</form>
          <div class="row buttons-margin" align="center">                 
                <input type="button" value="Submit" id="save" name="btn" class="btn btn-large btn-success" onclick="partnerDetailsV()" /> 
                <input type="button" value="Cancel" id="save" name="btn" class="btn btn-large btn-danger" onclick="reset()" /> 
                <input type="button" value="List" id="listBtn" class="btn btn-primary" onclick="partnerlist()" /> 
              	<input type="button" value="Edit" id="listBtn" class="btn btn-primary" onclick="editPartner()" />
              	
           </div>
          </div>
        
    </div>
</body>   
<jsp:include page="commons/footer.jsp"></jsp:include>