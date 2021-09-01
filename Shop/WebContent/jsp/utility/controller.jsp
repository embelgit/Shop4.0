
<%@page import="com.itextpdf.text.log.SysoCounter"%>
<jsp:directive.page import="java.lang.reflect.Method"/>


<%!	
	public String execute (HttpServletRequest request, HttpServletResponse response)
    {
		
        String action = request.getParameter("methodName");
        System.out.println("METHOD NAME in controller.jsp  = >>>> "+action);
        String value = "";
		
        if (action != null && !action.equals (""))
        {
       // 	System.out.println("in         if (action != null && !action.equals)   ");
            try
            {
            	System.out.println("in try block ");
				String packageName = "com.Fertilizer.utility";
            	String className = "Controller";
				String methodName = "";
				
	        	System.out.println("");
				 
				String actionName [] = action.split("\\.");
	    //    	System.out.println("actionName -  "+actionName.hashCode()+" size - "+actionName.length+" actionName -  "+actionName.toString());
				if(actionName.length > 1)
				{
		 //       	System.out.println("in if when actionName > 1");
					className = actionName[0];
					methodName = actionName[1];
		        	System.out.println("in if className - "+className+"  methodName - "+methodName);
				}
				else
				{
		  //      	System.out.println("in else condition");
					methodName = actionName[0];		
		        	System.out.println("in else methodName - "+methodName);
				}
				
				Class ajaxClass = Class.forName(packageName+"."+className);
				Object ajaxInstance = ajaxClass.newInstance();
				            
                Class[] parameterTypes = {HttpServletRequest.class, HttpServletResponse.class};
                
                Method method = ajaxClass.getMethod (methodName, parameterTypes);
                Object arguments[] = {request, response};
                
                
                value = (String)method.invoke (ajaxInstance, arguments);
                
                
               
            }
            catch (Exception e)
            {
				e.printStackTrace();
            }
        }
        return value;
    }
%>
<%
response.setHeader("Cache-Control","no-store"); //HTTP 1.1
response.setHeader("Pragma","no-cache"); //HTTP 1.0
response.setDateHeader ("Expires", 0); //prevents caching at the proxy server
%>

<%=execute(request,response)%>