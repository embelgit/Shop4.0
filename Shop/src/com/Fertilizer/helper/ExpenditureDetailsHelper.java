package com.Fertilizer.helper;

import java.math.BigInteger;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.Fertilizer.bean.GetCreditCustomerDetails;
import com.Fertilizer.dao.CustomerDetailsDao;
import com.Fertilizer.dao.ExpenditureDetailsDao;
import com.Fertilizer.dao.ProductDetailsDao;
import com.Fertilizer.hibernate.ExpenditureDetailsBean;
import com.Fertilizer.hibernate.SubCategoryDetailsBean;

public class ExpenditureDetailsHelper {

	public void expenseDetails(HttpServletRequest request,
			HttpServletResponse response) {

		String expenseName = request.getParameter("expenseName");
		String description = request.getParameter("description");
		String expenseType = request.getParameter("expenseType");
		
		ExpenditureDetailsDao dao = new ExpenditureDetailsDao();
		ExpenditureDetailsBean bean = new ExpenditureDetailsBean();
		
		bean.setExpenseName(expenseName);
		bean.setDecription(description);
		bean.setExpenseType(expenseType);
		
		SimpleDateFormat dateFormat1 = new SimpleDateFormat("yyyy-MM-dd");
		Date dateobj = new Date();
		System.out.println(dateFormat1.format(dateobj));
		
		bean.setInsertDate(dateobj);
		
        String onlyShopName = "";
		
		HttpSession session = request.getSession(true);
		
		String username = (String) session.getAttribute("user");
		String userid = (String) session.getAttribute("userid");
		String shopid = (String) session.getAttribute("shopid");
		String shopName = (String) session.getAttribute("shopName");
		
		String ShopNameWithoutId1 = shopName.substring(4);
		onlyShopName = ShopNameWithoutId1.trim();
		
		bean.setFkshopid(Long.parseLong(shopid));
		bean.setFkuserid(Long.parseLong(userid));
		bean.setUserName(username);
		bean.setShopName(onlyShopName);
		
		dao.addExpenseDetails(bean);
	}
	
	public Map getExpenditureNames(HttpServletRequest request) {

		int count = 1;
		System.out.println("IN HELPER");
		
		String expenseType = request.getParameter("expenseType");
		
		ExpenditureDetailsBean scdb = new ExpenditureDetailsBean();

		ExpenditureDetailsDao cdd = new ExpenditureDetailsDao();
		List list = cdd.getAllExpenseName(expenseType, request);

		System.out.println("list ======" + list.size());
		Map map = new HashMap();
		for (int i = 0; i < list.size(); i++) {
			
			Object[] o = (Object[]) list.get(i);
			
			System.out.println(Arrays.toString(o));
			
			scdb.setPkExpenseDetailsId(Long.parseLong(o[0].toString()));
			scdb.setExpenseName(o[1].toString());
			
			System.out.println("***************" + o[0]);
			map.put(count, scdb);
			count++;
		}
		return map;
}

	public Map getExpenditureNamesforPayment(HttpServletRequest request)
	{
		System.out.println("IN HELPER");
		
		String expenseType = request.getParameter("expenseType");
		System.out.println("in helper  ` expenseType -    "+expenseType);

		
		ExpenditureDetailsDao cdd = new ExpenditureDetailsDao();
		List list = cdd.getAllExpenseNameforPayment(expenseType, request);
		
		System.out.println("list ======" + list.size());
		Map map = new HashMap();

		for(int i=0;i<list.size();i++)
		{
			Object[] o = (Object[])list.get(i);
			ExpenditureDetailsBean bean = new ExpenditureDetailsBean();
			
			System.out.println("reslt - -   "+Arrays.toString(o));
						
			bean.setExpenseName(o[0].toString());
			bean.setPkExpenseDetailsId(Long.parseLong(o[1].toString()));
						
			System.out.println("***************"+o[0]);
			
			map.put(bean.getExpenseName(),bean);
			
		}
		return map;
	
	}
	
}
