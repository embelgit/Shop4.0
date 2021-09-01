<% boolean isHome=false;%>
<%@include file="commons/header.jsp"%>
<head>
 <meta charset="utf-8">
  <script type="text/javascript" src="/Shop/staticContent/js/bootstrap.js"></script>
 <script type="text/javascript" src="/Shop/staticContent/js/bootbox.min.js"></script>
 <script type="text/javascript" src="/Shop/staticContent/js/partnerDetails.js"></script>
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
          		
 <style>
	.btn-default,.btn-primary,.btn-success,.btn-info,.btn-warning,.btn-danger
 	{
    	border-radius:23px;
	}
</style>
</head>
   <div class="row header_margin_top">
			    <div align="center">
			  		<h2 class="form-name style_heading"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("supplierdetails") %> <%}%> <%if(abc.equals("english")){%>Partner Details<%}%></h2>
			  	</div>
			 
    </div>
     <div class="row">
		     <div class="col-sm-offset-1 col-md-10">
				  		<hr style="border-top-color:#c1b1b1;">
		     </div>	
    </div>
      <div class="container col-sm-offset-1" >
        <form class="form-horizontal" method="post" action="" name="partnm">
          <fieldset>
       			<div class="row form-group">
           	 		<div class="col-md-6">
              			<%@include file="commons/clock.jsp" %>
           		 	</div>
				</div>
        	<div class="row form-group">
            	<label class="col-md-2 control-label" for="partnerName"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("dealerName") %> <%}%> <%if(abc.equals("english")){%>Partner Name<%}%><sup>*</sup></label>  
            		<div class="col-md-3">
            				<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-user"></i>
							</span>
							 <input type="text" id="partnerName" name="partnerName" placeholder="Partner Name" class="form-control input-md ">
				   			</div>
            		</div>
            		
            		<label class="col-md-2 control-label" for="contactNo"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("contactNumber") %> <%}%> <%if(abc.equals("english")){%>Contact Number<%}%></label>
            		<div class="col-md-3">
    					<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-phone"></i>
							</span>
             				 <input id="contactNo" type="text" maxlength="10" name="contactNo" placeholder="Contact Number" class="form-control input-md ">
           				</div>
					</div>            
          </div>
         
          <div class="row form-group">
            	
            
              	<label class="col-md-2 control-label" for="landline"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("AlternateNumber") %> <%}%> <%if(abc.equals("english")){%>Alternate Number<%}%></label>
            		<div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-earphone"></i>
							</span>
              				<input id="alternateNo" name="alternateNo" placeholder="Alternate No" class="form-control input-md " maxlength="10" type="text"  >
            			</div> 
            		</div>
            		
            	<label class="col-md-2 control-label" for="emailId"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("email") %> <%}%> <%if(abc.equals("english")){%>Email Id<%}%></label>
            	<div class="col-md-3">
					<div class="input-group">
						<span class="input-group-addon">
							<i class="glyphicon glyphicon-envelope"></i>
						</span>
              			<input id="emailId" name="emailId" placeholder="Email ID" class="form-control input-md " type="text">
            		</div>
            	</div>
            		
          	</div>

        
          <div class="row form-group">
            

           <label class="col-md-2 control-label" for="city"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("city") %> <%}%> <%if(abc.equals("english")){%>City<%}%></label>
           		<div class="col-md-3">
					<div class="input-group">
						<span class="input-group-addon">
							<i class="glyphicon glyphicon-map-marker"></i>
						</span>
 			            <input id="city" name="city" placeholder="City" class="form-control input-md " type="text">
            		</div>
				</div>
          
            	
           	 <label class="col-md-2 control-label" for="address"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("address") %> <%}%> <%if(abc.equals("english")){%>Address<%}%></label>
           		<div class="col-md-3">
					<div class="input-group">
						<span class="input-group-addon">
						<i class="glyphicon glyphicon-map-marker"></i>
						</span>
 			            <input id="address" name="address" placeholder="Address" class="form-control input-md " type="text">
            		</div>
				</div>
          	</div>

          <div class="form-group row">
            <div class="col-md-9 text-center col-md-offset-1" style="padding-top:2%">
       
                <input style=" height: 53px; width: 128px; font-size: 25" type="button" value="Submit" id="save" name="btn" class="btn btn-large btn-success" onclick="partnerDetailsV()" /> 
                <input style=" height: 53px; width: 128px; font-size: 25" type="button" value="Cancel" id="save" name="btn" class="btn btn-large btn-danger" onclick="reset()" /> 
                <input style=" height: 53px; width: 128px; font-size: 25" type="button" value="List"  id="listBtn" class="btn btn-primary" onclick="partnerlist()" /> 
              	<input style=" height: 53px; width: 128px; font-size: 25" type="button" value="Edit"   id="listBtn" class="btn btn-primary" onclick="editPartner()" />
              	
            </div>
          </div>
         </fieldset>
       </form>
    </div>
    
<jsp:include page="commons/footer.jsp"></jsp:include>