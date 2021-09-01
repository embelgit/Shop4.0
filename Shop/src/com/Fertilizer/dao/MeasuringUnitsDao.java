package com.Fertilizer.dao;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.jfree.util.Log;

import com.Fertilizer.bean.MeasuringUnitBean;
import com.Fertilizer.hibernate.MeasuringUnitsBean;
import com.Fertilizer.utility.HibernateUtility;

public class MeasuringUnitsDao
{	
	public void addUnit(MeasuringUnitsBean bean)
	{
		HibernateUtility hbu=null;
		Session session = null;
		Transaction transaction = null;
		
		try{
		 hbu = HibernateUtility.getInstance();
		session = hbu.getHibernateSession();
		 transaction = session.beginTransaction();
	
		 System.out.println("Tx started");
		session.save(bean);
		transaction.commit();
		System.out.println("Successful");
		}
		catch(RuntimeException e){
			try{
				transaction.rollback();
			}catch(RuntimeException rbe)
			{
				Log.error("Couldn't roll back tranaction",rbe);
			}	
		}finally{
		hbu.closeSession(session);
		}	
	}
	
	
	public List<MeasuringUnitsBean> getAllUnits(HttpServletRequest request)
	{
		HttpSession usersession = request.getSession(true);
		String userid = (String)usersession.getAttribute("userid");
		String shopid = (String)usersession.getAttribute("shopid");
		
		HibernateUtility hbu = null;
		Session session =  null;
		Query query = null;
		 List list = null;
	 try {
			 hbu = HibernateUtility.getInstance();
			 session = hbu.getHibernateSession();
			 query = session.createQuery("from MeasuringUnitsBean where fkshopid='"+shopid+"'");
			 list = query.list(); 
			 
			 
		} catch (RuntimeException e) {
			Log.error("Error in getAllUnits", e);
		}
		 
		 finally
		 {
			 if (session!=null) {
				hbu.closeSession(session);
			}
		 }
				return list;
	}	
	
	

	public List getUnitList()
	{
		
		HibernateUtility hbu=null;
		Session session=null;
		List<MeasuringUnitBean> unitList=null;
	try{	

		hbu = HibernateUtility.getInstance();
		session = hbu.getHibernateSession();

		Query query=session.createSQLQuery("SELECT unit_name, unit_description from shop.sold_units");
		//Query query = session.createQuery("from PurchaseBill2");
		List<Object[]> list = query.list();


		unitList= new ArrayList<MeasuringUnitBean>(0);


	for (Object[] o : list) 
	{
		
		MeasuringUnitBean p = new MeasuringUnitBean();
		p.setUnitname(o[0].toString());
		p.setUnitDescription(o[1].toString());
		
		unitList.add(p);
	}
	
	}
	catch(RuntimeException e){	

	}
	finally{

	hbu.closeSession(session);	
	}
	return unitList;
	}
	
	
	
	public List<MeasuringUnitBean> getUnitForEdit(Long unitId, HttpServletRequest request) 
	{
		System.out.println(unitId + "    -----------   unitId dao");
		
		HttpSession usersession = request.getSession(true);
		String userid = (String)usersession.getAttribute("userid");
		String shopid = (String)usersession.getAttribute("shopid");
		
		HibernateUtility hbu = null;
		Session session = null;
		List<MeasuringUnitBean> unitList = null;
		
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
		
			Query query2 = session.createSQLQuery("SELECT unit_name, unit_description from shop.sold_units where pk_unit_id= '"+unitId+"' and fk_shop_id='"+shopid+"'");
			//query2.setParameter("unitId", unitId);
			
			
			List<Object[]> list = query2.list();
			unitList = new ArrayList<MeasuringUnitBean>(0);

			System.out.println("Size in DAO   : =====================  : "+list.size());
			
			for (Object[] object : list) {

				MeasuringUnitBean reports = new MeasuringUnitBean();

				reports.setUnitDescription(object[0].toString());
				reports.setUnitDescription(object[1].toString());

				unitList.add(reports);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return unitList;

	}
	


	public List getAllUnit(){
		
		HibernateUtility hbu=null;
		Session session=null;
		List unitList=null;
	try{	
	
		hbu = HibernateUtility.getInstance();
		session = hbu.getHibernateSession();
	
		Query query=session.createQuery("From MeasuringUnitsBean");
		unitList = query.list();

		}catch(RuntimeException e){	
	
		}
		finally{
	
		hbu.closeSession(session);	
		}
	
	return unitList;
	}

	
	
}
