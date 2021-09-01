<%@page import="com.Fertilizer.hibernate.SupplierDetailsBean"%>
<%@page import="com.Fertilizer.dao.SupplierDetailsDao"%>
<% boolean isHome=false;%>
<%@include file="commons/header.jsp"%>
<head>
 <meta charset="utf-8">
  <script type="text/javascript" src="/Shop/staticContent/js/bootstrap.js"></script>
 <script type="text/javascript" src="/Shop/staticContent/js/bootbox.min.js"></script>
 <script type="text/javascript" src="/Shop/staticContent/js/supplierDetailsUnused.js"></script>
 <script type="text/javascript">
 
 function checkForDuplicateSupplierEntry(){
		<%
		SupplierDetailsDao dao2 = new SupplierDetailsDao();
		List list = dao2.getAllSupplierList();
		%>
		
		<%
		int z = 0;
		for(z=0;z<list.size();z++){
			SupplierDetailsBean bean = (SupplierDetailsBean)list.get(z);
		%>
		var supplierName = "<%=bean.getDealerName()%>";

		if(document.getElementById("dealerName").value == supplierName ){
			alert("Supplier Name already exist...Duplicate Not allowed");
			location.reload();
			return false;
		}
		<%
		}
		%>
		
		}
 	
          		 function supplierlist()
          		 {
          		 window.location = "supplierList.jsp";
          		 }
          		 function editSupplier() {
          			 window.location = "editSupplierDetails.jsp";
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
			  		<h2 class="form-name style_heading"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("supplierdetails") %> <%}%> <%if(abc.equals("english")){%>Supplier  Details<%}%></h2>
			  	</div>
			 
    </div>
     <div class="row">
		     <div class="col-sm-offset-1 col-md-10">
				  		<hr style="border-top-color:#c1b1b1;">
		     </div>	
    </div>
      <div class="container col-sm-offset-1" >
        <form class="form-horizontal" method="post" action="" name="spld"><!-- Value of 'name' attribute is used in  supplierDetails.js  -->
          <fieldset>
       			<div class="row form-group">
           	 		<div class="col-md-6">
              			<%@include file="commons/clock.jsp" %>
           		 	</div>
				</div>
        	<div class="row form-group">
            	<label class="col-md-2 control-label" for="dealerName"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("dealerName") %> <%}%> <%if(abc.equals("english")){%>Supplier Name<%}%><sup>*</sup></label>  
            		<div class="col-md-3">
            				<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-user"></i>
							</span>
              				
							<%
							SupplierDetailsDao productdao1 = new SupplierDetailsDao();
           						List productList1 =productdao1.getAllSupplier(request);
							
							%>
							<input list="dealerName_drop" id="dealerName" placeholder="Supplier Name" name="dealerName" onchange="checkForDuplicateSupplierEntry()"  class="form-control">
				<datalist id="dealerName_drop">
							<%
					           for(int i=0;i<productList1.size();i++){
					        	   SupplierDetailsBean productbean1 =(SupplierDetailsBean)productList1.get(i);
							%>
		
							<option data-value="<%=productbean1.getSupId()%>" value="<%=productbean1.getDealerName()%>">
							<%
				      			}
				    		%>
			              	
            			</datalist>
            			</div>
            		</div>

            <label class="col-md-2 control-label" for="personName"> Person Name</label>  
            	<div class="col-md-3">
           		 	<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-user"></i>
							</span>
              				
							<%
							SupplierDetailsDao persondao1 = new SupplierDetailsDao();
           						List personList1 =persondao1.getAllSupplier(request);
							
							%>
							<input list="personName_drop" id="personName" placeholder="Person Name" class="form-control">
				<datalist id="personName_drop">
							<%
					           for(int i=0;i<personList1.size();i++){
					        	   SupplierDetailsBean personBean =(SupplierDetailsBean)personList1.get(i);
							%>
		
							<option data-value="<%=personBean.getSupId()%>" value="<%=personBean.getPersonName()%>">
							<%
				      			}
				    		%>
			              	
            			</datalist>
            			</div>
				</div>
          </div>
         
          <div class="row form-group">
            	<label class="col-md-2 control-label" for="contactNo"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("contactNumber") %> <%}%> <%if(abc.equals("english")){%>Contact Number<%}%></label>
            		<div class="col-md-3">
    					<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-phone"></i>
							</span>
             				 <input id="contactNo" type="text" maxlength="10" name="contactNo" placeholder="Contact Number" class="form-control input-md ">
           				</div>
					</div>
            
              	<label class="col-md-2 control-label" for="landline"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("landlineNumber") %> <%}%> <%if(abc.equals("english")){%>Alternate Number<%}%></label>
            		<div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-earphone"></i>
							</span>
              				<input id="landline" name="landline" placeholder="Alternate No" class="form-control input-md " maxlength="10" type="text"  >
            			</div> 
            		</div>
          	</div>

        
          <div class="row form-group">
            <label class="col-md-2 control-label" for="emailId"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("email") %> <%}%> <%if(abc.equals("english")){%>Email Id<%}%></label>
            	<div class="col-md-3">
					<div class="input-group">
						<span class="input-group-addon">
							<i class="glyphicon glyphicon-envelope"></i>
						</span>
              			<input id="emailId" name="emailId" placeholder="Email ID" class="form-control input-md " type="text">
            		</div>
            	</div>

           <label class="col-md-2 control-label" for="city"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("city") %> <%}%> <%if(abc.equals("english")){%>City<%}%></label>
           		<div class="col-md-3">
					<div class="input-group">
						<span class="input-group-addon">
							<i class="glyphicon glyphicon-map-marker"></i>
						</span>
 			            <input id="city" name="city" placeholder="City" class="form-control input-md " type="text">
            		</div>
				</div>
          </div>

			<div class="row form-group">
            	<label class="col-md-2 control-label" for="tinNo"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("tin") %> <%}%> <%if(abc.equals("english")){%>GST No<%}%></label>
            		<div class="col-md-3">
		  				<div class="input-group">
							<span class="input-group-addon">
								No
							</span>
              				<input id="tinNo" name="tinNo" placeholder="GST No" class="form-control input-md "  type="text">
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


					<div class="row form-group">
            	<label class="col-md-2 control-label" for="tinNo"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("tin") %> <%}%> <%if(abc.equals("english")){%>Account No<%}%></label>
            		<div class="col-md-3">
		  				<div class="input-group">
							<span class="input-group-addon">
								No
							</span>
              				<input id="accNo" name="accNo" placeholder="Acc No" class="form-control input-md "  type="text">
           				</div>
           			 </div>
           			 <label class="col-md-2 control-label" for="address"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("address") %> <%}%> <%if(abc.equals("english")){%>Account Name<%}%></label>
           		<div class="col-md-3">
					<div class="input-group">
						<span class="input-group-addon">
No
						</span>
 			            <input id="accName" name="accName" placeholder="Acc Name" class="form-control input-md " type="text">
            		</div>
				</div>
          	</div>

<div class="row form-group">
            	<label class="col-md-2 control-label" for="tinNo"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("tin") %> <%}%> <%if(abc.equals("english")){%>IFSC No<%}%></label>
            		<div class="col-md-3">
		  				<div class="input-group">
							<span class="input-group-addon">
								No
							</span>
              				<input id="ifsc" name="ifsc" placeholder="ifsc No" class="form-control input-md "  type="text">
           				</div>
           			 </div>
           			 
           			 <label class="col-md-2 control-label" for="upi"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("address") %> <%}%> <%if(abc.equals("english")){%>UPI ID<%}%></label>
           		<div class="col-md-3">
					<div class="input-group">
							<span class="input-group-addon">
								No
							</span>
 			            <input id="upi_id" name="upi_id" placeholder="UPI ID" class="form-control input-md " type="text">
            		</div>
				</div>
           			</div>

<div class="row form-group">
            	<label class="col-md-2 control-label" for="tinNo"><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("tin") %> <%}%> <%if(abc.equals("english")){%>Opening Balance<%}%></label>
            		<div class="col-md-3">
		  				<div class="input-group">
							<span class="input-group-addon">
								No
							</span>
              				<input id="openbal" name="openbal" placeholder="Opening Balance" class="form-control input-md "  type="text">
           				</div>
           			 </div></div>
          <div class="form-group row">
            <div class="col-md-9 text-center col-md-offset-1" style="padding-top:2%">
       <!--  supplierDetail() function is implemented in  supplierDetails.js -->
                <input style=" height: 53px; width: 128px; font-size: 25" type="button" value="Submit" id="save" name="btn" class="btn btn-large btn-success" onclick="supplierValidate()" /> 
                <input style=" height: 53px; width: 128px; font-size: 25" type="button" value="Cancel" id="save" name="btn" class="btn btn-large btn-danger" onclick="reset()" /> 
                <input style=" height: 53px; width: 128px; font-size: 25" type="button" value="List"  id="listBtn" class="btn btn-primary" onclick="supplierlist()" /> 
              	<input style=" height: 53px; width: 128px; font-size: 25" type="button" value="Edit"   id="listBtn" class="btn btn-primary" onclick="editSupplier()" />
              	
              	<%-- <button id="save" name="btn" class="btn btn-large btn-success glyphicon glyphicon-save  button-height-width"  onclick="supplierDetail()"><h4><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("submit") %> <%}%> <%if(abc.equals("english")){%>Submit<%}%> </h4></button>
              	<button class="btn btn-large btn-danger glyphicon glyphicon-remove-circle  button-height-width" type="reset"  onclick="reset()"><h4><%if(abc.equals("marathi")){%><%=PropertiesHelper.marathiProperties.getProperty("cancel") %> <%}%> <%if(abc.equals("english")){%>Cancel<%}%> </h4> </button> --%>
            	 
            </div>
          </div>
         </fieldset>
       </form>
    </div>
    
<jsp:include page="commons/footer.jsp"></jsp:include>