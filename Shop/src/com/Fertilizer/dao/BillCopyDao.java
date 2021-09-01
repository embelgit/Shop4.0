package com.Fertilizer.dao;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.jfree.util.Log;

import com.Fertilizer.hibernate.BillCopyBean;
import com.Fertilizer.utility.HibernateUtility;

public class BillCopyDao
{
public List getAllBillNo()
{
	HibernateUtility hbu = null;
	Session session =  null;
	Query query = null;
	 List list = null;
 try 
 	{
		 hbu = HibernateUtility.getInstance();
		 session = hbu.getHibernateSession();
		 /*query = session.createQuery("SELECT bill_no, customer_name, credit_customer_name FROM fertilizer_billing");*/
		 query = session.createQuery("from FertilizerBillBean");
		 list = query.list(); 
	}
	catch (RuntimeException e)
 	{
		Log.error("Error in getAllBillNo", e);
 	}	 
	 finally
	 {
		 if (session!=null) {
			hbu.closeSession(session);
		}
	 }
			return list;
}
}	