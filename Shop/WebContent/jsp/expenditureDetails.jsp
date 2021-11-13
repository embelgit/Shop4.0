<%@page import="com.Fertilizer.hibernate.ExpenditureDetailsBean"%>
<%@page import="com.Fertilizer.dao.ExpenditureDetailsDao"%>
<%boolean isHome = false;
%>
<%@include file="commons/header.jsp"%>
 
<head>
<meta charset="utf-8">
<script type="text/javascript">

function expendList()
{
	 window.location = "expenditureList.jsp";
}
function pay()
{
	 window.location = "allPaymentWithLeftTabs.jsp";
}

function checkForDuplidateExpenseName()
{
<%
ExpenditureDetailsDao dao2 = new ExpenditureDetailsDao();
	List list = dao2.getAllExpenseNames(request);
	%>
	
	<%
	int z = 0;
	for(z=0;z<list.size();z++)
	{
		ExpenditureDetailsBean bean = (ExpenditureDetailsBean)list.get(z);
	%>
	var expense = "<%=bean.getExpenseName()%>";

	if(document.getElementById("expenseName").value == expense )
	{
		var msg="Expenditure Name already exist...Duplicate are Not allowed";
		var dialog = bootbox.dialog({
			message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		    closeButton: false
		});
		
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);

		document.getElementById("expenseName").value = "";
		
		return false;
	}
	<%
	}
	%>
}
</script>
<script type="text/javascript" src="/Shop/staticContent/js/bootstrap.js"></script>
 <script type="text/javascript" src="/Shop/staticContent/js/bootbox.min.js"></script>
<script type="text/javascript" src="/Shop/staticContent/js/expenditureDetails.js"></script>
<style>
.btn-default,.btn-primary,.btn-success,.btn-info,.btn-warning,.btn-danger
 {
    border-radius:23px;
}
</style>
</head>
<div class="row header_margin_top">
			    <div align="center">
			  		<h2 class="form-name style_heading">Expenditure Details</h2>
			  	</div>
			 
    </div>
     <div class="row">
		     <div class="col-sm-offset-1 col-md-10">
				  		<hr style="border-top-color:#c1b1b1;">
		     </div>	
    </div>
	<div class="container col-sm-offset-2" >
        <form class="form-horizontal" method="post" action="" name="expenseDetails"><!-- Value of 'name' attribute is used in customerDetails.js  -->
          <fieldset>
			<div class="row form-group">
           	 		<div class="col-md-6">
              			<%@include file="commons/clock.jsp" %>
           		 	</div>
			</div>
			
			 <div class="row form-group">
           		<label class="col-md-2 control-label" for="expenseType">Expenditure Type<sup>*</sup></label>  
           	 		<div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="	glyphicon glyphicon-list-alt"></i>
							</span>
              				<select class="form-control" id="expensetype" onchange="getAllExpenseName()">
										<option value="select">--Select Expenditure Type--</option>
										<option value="direct">Direct</option>
										<option value="indirect">Indirect</option>
							</select>
            			</div>
           		 	</div>
           		 
           		 </div>
			
			 <div class="row form-group">
           		<label class="col-md-2 control-label" for="expenseName">Expenditure Name<sup>*</sup></label>  
           	 		<div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="	glyphicon glyphicon-list-alt"></i>
							</span>
              										
							<input list="cat_drop" id="expenseName"  class="form-control" placeholder="Expenditure Name"
							       name="expenseName" onchange="checkForDuplidateExpenseName()">
			             	<datalist id="cat_drop"></datalist>
						  			
            			</div>
           		 	</div>
           		 	
           		 	<label class="col-md-2 control-label" for="description">Description</label>  
           	 		<div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="	glyphicon glyphicon-list-alt"></i>
							</span>
              									
							<input type="text" id="description" name="description" class="form-control" placeholder="Description" >
				
            			</div>
           		 	</div>
           		 </div>
           		           		            		 
           		 <div class="form-group row" style="padding-top:2%">
		            <div class="col-md-10 text-center">
		            <input type="button"  id="save" name="btn" style="width: 128px;
    						height: 53px;font-size: 25" class="btn btn-success "onclick="addExpenseDetails()" value="Submit">
		            <input   id="save" name="btn" style="width: 128px;
   							 height: 53px;font-size: 25" class="btn  btn-danger "  type="reset"  onclick="reset()" value="Cancel">
   				    <input   id="save" name="btn" style="width: 128px;
    						height: 53px;font-size: 25" class="btn  btn-primary "  type="button"  onclick="expendList()" value="List">
	           		 	
	        	    <input   id="save" name="btn" style="width: 128px;
    						height: 53px;font-size: 25" class="btn  btn-primary "  type="button"  onclick="pay()" value="Payment">
	           		 	
	           		 	<!-- <button id="save" name="btn" class="btn btn-large btn-success glyphicon glyphicon-save  button-height-width"  onclick="addExpense()"><h4> Submit</h4></button>
              			<button class="btn btn-large btn-danger glyphicon glyphicon-remove-circle  button-height-width" type="reset"  onclick="reset()"><h4> Cancel</h4> </button> -->
	           		 </div>
         		</div>
           	</fieldset>
          </form>
         </div>
         
<jsp:include page="commons/footer.jsp"></jsp:include>