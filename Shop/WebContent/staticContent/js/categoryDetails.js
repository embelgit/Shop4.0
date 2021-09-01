//function to checkForDuplicateCategoryEntry
function checkForDuplicateCategoryEntry(){
          			
	var input = document.getElementById('categoryName'),
	     list = document.getElementById('cat_drop2'),
	     	i,categoryName;
		 		for (i = 0; i < list.options.length; ++i) {
				     if (list.options[i].value === input.value) {
				    	 categoryName = list.options[i].getAttribute('value');
				     }
		 		}
	
		

		 		if(document.getElementById("categoryName").value == categoryName)
		{
			var msg="Category already exist...Duplicate Not allowed";
		     alert(msg);
		var dialog = bootbox.dialog({
			//title: "Embel Technologies Says :",
		    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
		    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		    closeButton: false
		});
		
		setTimeout(function() {
			dialog.modal('hide');
			
		}, 1500);

		document.getElementById("categoryName").value = "";
		
		//document.setElementById("categoryName").value ="";
			return false;
		}
	
		}
	
//function checkForDuplicateCategoryEntry
function checkForDuplicateSubCategoryEntry(){
		
	var cat = document.getElementById('fk_cat_id3');
	var subCat = document.getElementById('cat_drop4');
	     	i,subCat;
		 		for (i = 0; i < list.options.length; ++i) {
				     if (list.options[i].value === input.value) {
				    	 subCat = list.options[i].getAttribute('value');
				     }
		 		}
	
		

		 		/*var subCat = "<%=bean.getSubcategoryName()%>";
				var cat = "<%=bean.getCategoryName()%>";*/
		 		
				var subcatName=document.getElementById("subcategoryName").value;
				var catName=document.getElementById("fk_cat_id3").value;

				if(subcatName == subCat && cat == catName){
					alert("subcategory already exist...Duplicate Not allowed");
					location.reload();
					return false;
				}
	
		}
	
	
function reset()
{
document.catd.reset();	
}

function catDetails(){
		

	
	if(document.catd.categoryName.value == "")
	{
		var msg="Please Enter Category Name";
		
		var dialog = bootbox.dialog({
			//title: "Embel Technologies Says :",
		    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		    closeButton: false
		});
		
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		
		return false;
	}	

	
	//var letterNumber = /^[a-zA-Z, ]+$/;
	//var letterNumber = /^[a-zA-Z0-9]*$/;
	//var letterNumber = /^[a-zA-Z0-9%*#]*$/;
	//var letterNumber =  /^[A-Za-z]+$/;
	//var letterNumber =  /^[0-9a-zA-Z]+$/;
	/*var letterNumber =  /^[A-Za-z\d\s]+$/;
	if(document.catd.categoryName.value.match(letterNumber))
	{
		categoryDetails();
	}
	
	else
	{
		var msg="Please Enter only Alphabets and Numbers in Category name";
		var dialog = bootbox.dialog({
			//title: "Embel Technologies Says :",
		    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		    closeButton: false
		});
		
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		
		return false;
	}*/
	categoryDetails();
}

function categoryDetails()
{	
	document.catd.btn1.disabled = true;
	
		var categoryName = $('#categoryName').val();
		/*var subCategoryName = $('#subCategoryName').val();*/

		var params = {};
		
		params["categoryName"] = categoryName;
		/*params["subCategoryName"] =subCategoryName;*/
		
		
		params["methodName"] = "categoryDetails";
	
	 	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
	 	{
				var msg=data;
				var dialog = bootbox.dialog({
			    message: '<p class="text-center">'+msg.fontcolor("green").fontsize(5)+'</p>',
			    closeButton: false
				});
				
				setTimeout(function() {
					dialog.modal('hide');
					location.reload();
				}, 1500);
				
	 			document.catd.btn1.disabled = false;
	 			
	 	}).error(function(jqXHR, textStatus, errorThrown){
	 	    		if(textStatus==="timeout") {
	 	    			$(loaderObj).hide();
	 	    			$(loaderObj).find('#errorDiv').show();
	 	    		}
	 	    	});		
}

/*data added into database*/
function subcat()
{
	document.subCat.save.disabled =true;
	if(document.subCat.fk_cat_id.value == "")
	{
		var msg="Please Enter Category Name";
		var dialog = bootbox.dialog({
			//title: "Embel Technologies Says :",
		    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
		    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		    closeButton: false
		});
		
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		
		return false;
	}	
	else if(document.subCat.subcategoryName.value == "")
	{
		var msg="Please Enter Sub Category Name";
		var dialog = bootbox.dialog({
			//title: "Embel Technologies Says :",
		    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
		    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		    closeButton: false
		});
		
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		
		return false;
	}	
	//var letterNumber = /^[a-zA-Z, ]+$/;
	//var letterNumber = /^[a-zA-Z0-9]*$/;
	/*var letterNumber = /^(?:[A-Za-z]+)(?:[A-Za-z0-9 _]*)$/;
	if(document.subCat.subcategoryName.value.match(letterNumber))
	{
		subCategoryDetails();
	}
	else
	{
		var msg="Please Enter Valid Sub Category name";
		var dialog = bootbox.dialog({
			//title: "Embel Technologies Says :",
		    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
		    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		    closeButton: false
		});
		
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		
		return false;
		
		
		alert("Enter Alphabates Only in Sub Category name field");
		return false;
	}	*/
	subCategoryDetails();
}

function subCategoryDetails(){
	 
	document.subCat.save.disabled =true;
	
	var input = document.getElementById('fk_cat_id'),
    list1 = document.getElementById('cat_drop'),
    i,fk_cat_id;

	for (i = 0; i < list1.options.length; ++i) {
    if (list1.options[i].value === input.value) {
    	fk_cat_id = list1.options[i].getAttribute('data-value');
    }
	}
	//var fk_cat_id = $('#fk_cat_id').val();
	var subcategoryName = $('#subcategoryName').val();
	
	var params = {};
	
	params["fk_cat_id"] =fk_cat_id;
	params["subcategoryName"] =subcategoryName;
	
	
	params["methodName"] = "subCategoryDetails";

	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
	{
		var msg=data;
		var dialog = bootbox.dialog({
	    message: '<p class="text-center">'+msg.fontcolor("green").fontsize(5)+'</p>',
	    closeButton: false
		});
		
		setTimeout(function() {
			dialog.modal('hide');
			location.reload();
		}, 1500);
		document.catd.btn.disabled =false;
	}).error(function(jqXHR, textStatus, errorThrown){
			if(textStatus==="timeout") {
				$(loaderObj).hide();
				$(loaderObj).find('#errorDiv').show();
			}
		});
	}

/*sub category method for pop-up window (for Product Details--sub category details)*/
function subcat1()
{
	document.subCat.save1.disabled =true;
	if(document.subCat.fk_cat_id1.value == "")
	{
		var msg="Please Enter Category Name";
		var dialog = bootbox.dialog({
			//title: "Embel Technologies Says :",
		    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
		    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		    closeButton: false
		});
		
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		
		return false;
	}	
	else if(document.subCat.subcategoryName.value == "")
	{
		var msg="Please Enter Sub Category Name";
		var dialog = bootbox.dialog({
			//title: "Embel Technologies Says :",
		    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
		    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		    closeButton: false
		});
		
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		
		return false;
	}	
	//var letterNumber = /^[a-zA-Z, ]+$/;
	//var letterNumber = /^[a-zA-Z0-9]*$/;
	/*var letterNumber = /^(?:[A-Za-z]+)(?:[A-Za-z0-9 _]*)$/;
	if(document.subCat.subcategoryName.value.match(letterNumber))
	{  }
	else
	{
		var msg="Please Enter Valid Sub Category name";
		var dialog = bootbox.dialog({
			//title: "Embel Technologies Says :",
		    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
		    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		    closeButton: false
		});
		
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		
		return false;
	}*/	
	subCategoryDetails1();
}

function subCategoryDetails1(){
	 
	document.subCat.save1.disabled =true;
	
	var input = document.getElementById('fk_cat_id1'),
    list1 = document.getElementById('cat_drop'),
    i,fk_cat_id;

	for (i = 0; i < list1.options.length; ++i) {
    if (list1.options[i].value === input.value) {
    	fk_cat_id = list1.options[i].getAttribute('data-value');
    }
	}
	//var fk_cat_id = $('#fk_cat_id').val();
	var subcategoryName = $('#subcategoryName').val();
	
	var params = {};
	
	params["fk_cat_id"] =fk_cat_id;
	params["subcategoryName"] =subcategoryName;
	
	
	params["methodName"] = "subCategoryDetails";

	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
	{
		var msg=data;
		var dialog = bootbox.dialog({
	    message: '<p class="text-center">'+msg.fontcolor("green").fontsize(5)+'</p>',
	    closeButton: false
		});
		
		setTimeout(function() {
			dialog.modal('hide');
			location.reload();
		}, 1500);
		document.catd.btn.disabled =false;
	}).error(function(jqXHR, textStatus, errorThrown){
			if(textStatus==="timeout") {
				$(loaderObj).hide();
				$(loaderObj).find('#errorDiv').show();
			}
		});
	}

/*sub category method for pop-up window (for Good Receive--sub category details)*/
function subcat11()
{
	document.subCat.save11.disabled =true;
	if(document.subCat.fk_cat_id11.value == "")
	{
		var msg="Please Enter Category Name";
		var dialog = bootbox.dialog({
			//title: "Embel Technologies Says :",
		    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
		    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		    closeButton: false
		});
		
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		
		return false;
	}	
	else if(document.subCat.subcategoryName.value == "")
	{
		var msg="Please Enter Sub Category Name";
		var dialog = bootbox.dialog({
			//title: "Embel Technologies Says :",
		    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
		    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		    closeButton: false
		});
		
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		
		return false;
	}	
	//var letterNumber = /^[a-zA-Z, ]+$/;
	//var letterNumber = /^[a-zA-Z0-9]*$/;
	/*var letterNumber = /^(?:[A-Za-z]+)(?:[A-Za-z0-9 _]*)$/;
	if(document.subCat.subcategoryName.value.match(letterNumber))
	{
		subCategoryDetails11();
	}
	else
	{
		var msg="Please Enter Valid Sub Category name";
		var dialog = bootbox.dialog({
			//title: "Embel Technologies Says :",
		    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
		    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		    closeButton: false
		});
		
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		
		return false;
		
	}*/	
	subCategoryDetails11();
}

function subCategoryDetails11(){
	 
	document.subCat.save11.disabled =true;
	
	var input = document.getElementById('fk_cat_id11'),
    list1 = document.getElementById('cat_drop11'),
    i,fk_cat_id;

	for (i = 0; i < list1.options.length; ++i) {
    if (list1.options[i].value === input.value) {
    	fk_cat_id = list1.options[i].getAttribute('data-value');
    }
	}
	//var fk_cat_id = $('#fk_cat_id').val();
	var subcategoryName = $('#subcategoryName').val();
	
	var params = {};
	
	params["fk_cat_id"] =fk_cat_id;
	params["subcategoryName"] =subcategoryName;
	
	
	params["methodName"] = "subCategoryDetails";

	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
	{
		var msg=data;
		var dialog = bootbox.dialog({
	    message: '<p class="text-center">'+msg.fontcolor("green").fontsize(5)+'</p>',
	    closeButton: false
		});
		
		setTimeout(function() {
			dialog.modal('hide');
			location.reload();
		}, 1500);
		document.catd.btn.disabled =false;
	}).error(function(jqXHR, textStatus, errorThrown){
			if(textStatus==="timeout") {
				$(loaderObj).hide();
				$(loaderObj).find('#errorDiv').show();
			}
		});
	}

function reset1()
{
   document.catd.reset();	
}

function catlist1()
{

	 window.location ="catlist1.jsp";

}



////////category details edit/////////////
     function EditcatDetails(){
    	 document.catd.save.disabled =true;
		
		if (document.catd.categoryName.value == "" )
		 {
			alert("Please Enter Category Name");
			return false;
		 }
		//var letterNumber = /^[a-zA-Z0-9]*$/;
		
		 if ( document.catd.catname.value == "" )
		 {
		      alert("Please Enter NewCategory Name");
		      return false;
		 }
			
		/* var letterNumber = /^[A-Za-z\d\s]+$/;
		 if(document.catd.catname.value.match(letterNumber) )
		 {
			 updateCategoryDetails();
		 }

		 else
		 {
			   var msg="Please Enter only Alphabets and Numbers in Category name";
				var dialog = bootbox.dialog({
					//title: "Embel Technologies Says :",
				    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
				    closeButton: false
				});
				
				setTimeout(function() {
					dialog.modal('hide');
				}, 1500);
				
				return false;
		 }*/
		 updateCategoryDetails();
	}



function updateCategoryDetails()
{
	var params= {};
	var oldCatName= $('#fk_cat_id').val();
	
	var input1 = document.getElementById('fk_cat_id'),
		list   = document.getElementById('cat_drop'),
				 i,fkEmployeeid;

	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input1.value) {
			catId = list.options[i].getAttribute('data-value');
		}
	}
	
	var catname= $('#catname').val();
    //alert("cat id-----"+oldCatName);
    //alert("cat name-----"+catname);
    //alert("Id-----------"+catId)
	
	params["catId"] = catId;
	
	params["oldCatName"] = oldCatName;
	params["catname"] = catname;
	
	params["methodName"] = "updateCatDetails";
	
	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
		 	{
					alert(data);
					location.reload();

					document.getElementById("save").disabled=false; 
		 				 			}
		 	    	).error(function(jqXHR, textStatus, errorThrown){
		 	    		if(textStatus==="timeout") {
		 	    			$(loaderObj).hide();
		 	    			$(loaderObj).find('#errorDiv').show();
		 	    		}
		 	    	});	
}

function delcat1(id){
	
var splitText = id.split(",");
	
	var id = splitText[0];
	var name= splitText[1];
	
	  var r = confirm("Do You want to delete "+name);
	  if (r == true) {
		  


	var params={};
	
		
	params["catId"] = id;
	
	params["methodName"] = "delCatDetails";
	
	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
		 	{
					alert(data);
					location.reload();
	
	//	 				document.getElementById("save").disabled=false; 
		 				 			}
		 	    	).error(function(jqXHR, textStatus, errorThrown){
		 	    		if(textStatus==="timeout") {
		 	    			$(loaderObj).hide();
		 	    			$(loaderObj).find('#errorDiv').show();
		 	    		}
	
		 	    	});
	  }	
}

//

	function delsubcat1(id){
		
		var splitText = id.split(",");
		
		var id = splitText[0];
		var name= splitText[1];
		
		  var r = confirm("Do You want to delete "+name);
		  if (r == true) {
		
	var params={};
	
	params["catId"] = id;
	
	params["methodName"] = "delsubCatDetails";
	
	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
		 	{
					alert(data);
					location.reload();
		 				 			}
		 	    	).error(function(jqXHR, textStatus, errorThrown){
		 	    		if(textStatus==="timeout") {
		 	    			$(loaderObj).hide();
		 	    			$(loaderObj).find('#errorDiv').show();
		 	    		}
	
		 	    	});
		  }	
}