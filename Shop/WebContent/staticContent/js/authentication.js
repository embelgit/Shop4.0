function getShopNameForLogin()
{
	var uname=$('#uname').val();
		
	$("#shopname_drop").empty();
	$("#shopname_drop").append($("<option></option>").attr("value","").text("Select Shop Name"));
	var params= {};

	params["uname"]= uname;

	params["methodName"] = "getAllShopNameForLogin";
	
	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
			{ var count = 1;

			var jsonData = $.parseJSON(data);
			$.each(jsonData,function(i,v)  
					{
				$("#shopname_drop").append($("<option></option>").attr("value",( v.userId+ ","+v.shopId+","+v.ShopName))); 
				count++;
					});
			}).error(function(jqXHR, textStatus, errorThrown){
				if(textStatus==="timeout") {

				}
			});
}