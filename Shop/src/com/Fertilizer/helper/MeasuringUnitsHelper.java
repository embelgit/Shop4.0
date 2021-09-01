package com.Fertilizer.helper;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.Fertilizer.bean.MeasuringUnitBean;
import com.Fertilizer.dao.MeasuringUnitsDao;
import com.Fertilizer.hibernate.MeasuringUnitsBean;


import org.hibernate.Session;
import org.hibernate.Transaction;
import com.Fertilizer.utility.HibernateUtility;


public class MeasuringUnitsHelper {

	public void unitDetails(HttpServletRequest request,
			HttpServletResponse response) {

		String unitName = request.getParameter("unitName");
		String unitDescription = request.getParameter("unitDescription");
		String unitvalue = request.getParameter("unitvalue");
		
		MeasuringUnitsDao dao = new MeasuringUnitsDao();
		MeasuringUnitsBean bean = new MeasuringUnitsBean();
		
		bean.setUnitName(unitName);
		bean.setUnitDescription(unitDescription);
		bean.setUnitvalue(Double.parseDouble(unitvalue));
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
			bean.setShopName(onlyShopName);
			bean.setUserName(username);
		
		
		dao.addUnit(bean);
	}
	
	
	
	//employee Detailas for edit
	public List getUnitDetails(HttpServletRequest request)
	{
		String unitId2 = request.getParameter("unitId");
		Long unitId = Long.parseLong(unitId2);
		
		Map<Long, MeasuringUnitBean> map = new HashMap<Long, MeasuringUnitBean>();

		MeasuringUnitsDao dao = new MeasuringUnitsDao();
		List<MeasuringUnitBean> exp1List = dao.getUnitForEdit(unitId, request);

		System.out.println("Size in Helper------ : "+exp1List.size());
		
		return exp1List;

	}
	
	//update Unit
	public void editUnit(HttpServletRequest request,HttpServletResponse response) 
	{
		
        String unitId2 = request.getParameter("unitId");
        String oldUnitName = request.getParameter("oldUnitName");
       
        String unitName2 = request.getParameter("unitName2");
		String unitDescription = request.getParameter("unitDescription");

		
			 Long unitId = Long.parseLong(unitId2);
			
			 HibernateUtility hbu = HibernateUtility.getInstance();
			 Session session = hbu.getHibernateSession();
			 Transaction transaction = session.beginTransaction();

			 MeasuringUnitsBean updateUnit = (MeasuringUnitsBean) session.get(MeasuringUnitsBean.class, new Long(unitId));
			 
			 updateUnit.setUnitName(unitName2);
			 updateUnit.setUnitDescription(unitDescription);
			 
			 session.saveOrUpdate(updateUnit);
			 transaction.commit();
		
	}

	
	
	
}
