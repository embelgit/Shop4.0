package com.Fertilizer.dao;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.jfree.util.Log;

import com.Fertilizer.hibernate.AdvanceBookingBean;
import com.Fertilizer.hibernate.SupplierPaymentBean;
import com.Fertilizer.utility.HibernateUtility;

public class AdvanceBookinhDao {

	//get latest Advance Booking ID number in Advance Booking Table
	public List getLastBookingNoforSupplier(HttpServletRequest request)
	{
		HttpSession usersession = request.getSession(true);
		String userid = (String)usersession.getAttribute("userid");
		String shopid = (String)usersession.getAttribute("shopid");
		
		HibernateUtility hbu=null;
		Session session=null;
		List<AdvanceBookingBean> Txidlist=null;
		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createSQLQuery("SELECT booking_no, supplier_name FROM advance_booking WHERE fk_shop_id = '"+shopid+"' ORDER BY booking_no DESC LIMIT 1");

			List<Object[]> list = query.list();
			Txidlist= new ArrayList<AdvanceBookingBean>(0);
			for (Object[] object : list) {
				
				AdvanceBookingBean bean=new AdvanceBookingBean();
				bean.setBookingNo(Long.parseLong(object[0].toString()));
				bean.setSupplierName(object[1].toString());
				
				Txidlist.add(bean);	 
			}}
		catch(RuntimeException e)
		{
			Log.error("Error in getLastBookingNoforSupplier()", e);	
		}finally
		{if(session!=null){
			hbu.closeSession(session);	
		}
		}
		return Txidlist;	
	}
			
	public List getAllBookinNo(HttpServletRequest request)
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
			 query = session.createQuery("from AdvanceBookingBean where fkshopid='"+shopid+"'");
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
			
	public void updatePurchaseBillNoInAdBooking(String billNum ,String bookingId)
	{
		HibernateUtility hbu = null;
		Session session =  null;
		Query query = null;

	 try {
			 hbu = HibernateUtility.getInstance();
			 session = hbu.getHibernateSession();
			 Transaction tx =  session.beginTransaction();
			 query = session.createSQLQuery("UPDATE advance_booking set purchaseBillNo = '"+billNum+"' where booking_no = "+bookingId);
			 query.executeUpdate();
			 tx.commit();
		} catch (RuntimeException e) {
			Log.error("Error in getAllUnits", e);
		  }
		 finally
		 {
			 if (session!=null) {
				hbu.closeSession(session);
			 }
	     }
    }
	
    public List EditPurchaseOrderBillDetailsNonGrid(String booking, HttpServletRequest request) 
    {
    	HttpSession usersession = request.getSession(true);
    	String userid = (String)usersession.getAttribute("userid");
    	String shopid = (String)usersession.getAttribute("shopid");
    	
		HibernateUtility hbu=null;
		Session session=null;
		List list = null;
		
		try{
			 String sqlQuery = "";
			 hbu=HibernateUtility.getInstance();
			 session=hbu.getHibernateSession();		 
			 
			 Query query = session.createSQLQuery("select booking_no, grossTotal from advance_booking where booking_no = '"+booking+"' and fk_shop_id = '"+shopid+"' limit 1");
			 list = query.list();
			 System.out.println(list.size()+"*************");
			}catch(RuntimeException e){
				
			Log.error("Error in getAllPurchaseOrderDetailsForEdit",e);
		   }finally{
		 		if(session!=null){
					 
					hbu.closeSession(session);
				}			
			}
		
		return list;
	}
}
