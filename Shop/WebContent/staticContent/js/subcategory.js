
function categoryd(){
	
	if ( document.subcat.fkRootcatId.value == "" )
    {
        
 	       alert("Please Select Category Name.");
          return false;
     }

    
   
     if ( document.subcat.subcatName.value == "" )
  	   {
	    
     	     alert("Please Enter Sub Category Name.");
	         return false;
	    }
     
     
     var letterNumber = /^[a-zA-Z0-9]*$/;

	    if(document.subcat.subcatName.value.match(letterNumber))   
	    {  
	       
	    	subcate();
    
    
	    }  
	     else  
	      {   
	       
	    	 alert( "Enter Alphabets only.");
	         return false;   
	      }  
	    
	    
}


function subcate(){
	
	        document.subcat.btn.disabled = true;
	      
	
			var subcatName= $('#subcatName').val();
			var activeYn = $('#activeYn').val();
			var isLeafCatId=$('#isLeafCatId').val();
			var isrootCat =$('#isrootCat').val();
		    var input = document.getElementById('fkRootcatId'),
		        list = document.getElementById('fkRootcatId_drop'),
		        i,fkRootcatId;
		    for (i = 0; i < list.options.length; ++i) {
		        if (list.options[i].value === input.value) {
		        	fkRootcatId = list.options[i].getAttribute('data-value');
		        }
		    }
		    		    
		    
			var params= {};
			
			params ["subcatName"] = subcatName;
			params ["activeYn"] = activeYn;
			params ["isLeafCatId"] = isLeafCatId;
			params ["isrootCat"] = isrootCat;
			params ["fkRootcatId"] = fkRootcatId;
			
			
			params["methodName"] = "regSubCategory";
	    	
	    	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
	    	    	{
	    				 alert(data);
	    				 if(document.getElementById) 
	    			 	 {
	    					 document.subcat.reset();
	    				 }
	    				 document.subcat.btn.disabled = false;
	    				 
	    			}
	    	    	).error(function(jqXHR, textStatus, errorThrown){
	    	    		if(textStatus==="timeout") {
	    	    			$(loaderObj).hide();
	    	    			$(loaderObj).find('#errorDiv').show();
	    	    		}
	    	    	});
	    	
	    }

//////////subcategory  edit//////////


function subcategoryd(){
	
	/*if ( document.subcat.fk_cat_id.value == "" )
    {
   	      alert("Please Select Category Name.");
          return false;
    }*/
    
    	if(document.subcat.fk_cat_id.value == "")
	{
		var msg="Please Select Category Name.";
		
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
    
    
    
    

   /* if ( document.subcat.subCat.value == "" )
    {
         alert("Please Enter Sub Category Name.");
         return false;
    }*/
    	if(document.subcat.subCat.value == "")
	{
		var msg="Please Enter Sub Category Name.";
		
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
    
    
  /*  if ( document.subcat.subcatname.value == "" )
  	{
  	     alert("Please Enter New Sub Category Name.");
         return false;
	}
	*/
		if(document.subcat.subcatname.value == "")
	{
		var msg="Please Enter New Sub Category Name.";
		
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
	
     
    /*var letterNumber =  /^[A-Za-z\d\s]+$/;
	if(document.subcat.subcatname.value.match(letterNumber))   
	{  
	     updateSubCategoryDetails();
    }  
    else  
	{   	       
	  	 alert( "Please Enter only Alphabets and Numbers in Category name");
	     return false;   
    }  */
	 updateSubCategoryDetails();
}

function updateSubCategoryDetails()
{

	var params= {};
	var CatName= $('#fk_cat_id').val();        //category id
		
	var input = document.getElementById('fk_cat_id'),
		list1 = document.getElementById('cat_drop'),
				i,fk_cat_id;

	for (i = 0; i < list1.options.length; ++i) {
		if (list1.options[i].value === input.value) {
			catId = list1.options[i].getAttribute('data-value');
		}
	}
	var subCat= $('#subCat').val();           //sub category = name and id
	var subcatId=subCat.split(",")[0];        //sub category id
	var subcatNameOld=subCat.split(",")[1];   //sub category name
	
	var subcatname= $('#subcatname').val();   //new sub category name
	
	params["catId"] = catId;                   //category id
	
	params["subcatId"] = subcatId;             //sub category id
	params["subcatNameOld"] = subcatNameOld;   //sub category name
	
	params["subcatname"] = subcatname;         //new sub category name
	
	params["methodName"] = "updateSubCatDetails";
	
	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
		 	{
					/*alert(data);
					location.reload();*/
		
					/*var dialog = bootbox.dialog({
				    message: '<p class="text-center">'+msg.fontcolor("green").fontsize(5)+'</p>',
				    closeButton: false
					});
					
					setTimeout(function() {
						dialog.modal('hide');
						location.reload();
					}, 1500);*/
					
					
		var msg=data;
		
		var dialog = bootbox.dialog({
	    message: '<p class="text-center">'+msg.fontcolor("green").fontsize(5)+'</p>',
	    closeButton: false
		});
		
		setTimeout(function() {
			dialog.modal('hide');
			location.reload();
		}, 1500);
		
		
		 				/*document.getElementById("save").disabled=false; */
		 				 			}
		 	    	).error(function(jqXHR, textStatus, errorThrown){
		 	    		if(textStatus==="timeout") {
		 	    			$(loaderObj).hide();
		 	    			$(loaderObj).find('#errorDiv').show();
		 	    		}
		 	    		/*//document.munits.btn.disabled =false;
		 				document.getElementById("save").disabled=false;*/
		 	    	});
}			
			