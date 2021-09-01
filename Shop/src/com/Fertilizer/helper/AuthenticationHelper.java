package com.Fertilizer.helper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.Fertilizer.dao.AuthenticationDao;
import com.Fertilizer.hibernate.AuthenticationBean;
import com.Fertilizer.hibernate.SaleReturnBean;

public class AuthenticationHelper {

	
	public Map getShopNameForLogin(HttpServletRequest request, HttpServletResponse response ) {
		int count = 1;
		
		String uname = request.getParameter("uname");
		System.out.println("uname in getshop -  "+uname);
		AuthenticationDao dao=new AuthenticationDao();
		List list= dao.getAllShopNameForLogin(uname);

		Map  map =  new HashMap();
		for(int i=0;i<list.size();i++)
		{
			Object[] o = (Object[])list.get(i);
			
			AuthenticationBean bean=new AuthenticationBean();
			
			bean.setShopId(Long.parseLong(o[0].toString()));
			bean.setShopName(o[1].toString());
			bean.setUserId(Long.parseLong(o[2].toString()));
			bean.setUserName(o[3].toString());

			System.out.println("***************"+o[0]);

			map.put(count,bean);
			count++;
		}
		return map;
	}
	
	
}
