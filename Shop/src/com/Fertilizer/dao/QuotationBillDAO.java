package com.Fertilizer.dao;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.jfree.util.Log;

import com.Fertilizer.bean.CustomerBillBean;
import com.Fertilizer.bean.QuotationBillBean;
import com.Fertilizer.hibernate.FertilizerBillBean;
import com.Fertilizer.hibernate.PartnerTransactionBeanH;
import com.Fertilizer.hibernate.QuotationBillBeanH;
import com.Fertilizer.utility.HibernateUtility;

public class QuotationBillDAO
{
	public void addQuotationBillInDAO(QuotationBillBeanH bean) {

		System.out.println("In DAO");
		
		HibernateUtility hbu = null;
		Session session = null;
		Transaction transaction = null;
		try{
		 hbu = HibernateUtility.getInstance();
		 session = hbu.getHibernateSession();
		 System.out.println("got session ");
		 transaction = session.beginTransaction();
	
		 System.out.println("Tx started");
		session.save(bean);
		transaction.commit();
		System.out.println("Successful");
		}
		catch(RuntimeException e)
		{
		try{
			transaction.rollback();
			}catch(RuntimeException rbe)
			{
				Log.error("Couldn't roll back tranaction",rbe);
			}	
		}
		finally
		{
			hbu.closeSession(session);
		}	
	}
	
	public List getQuotationLastNo(){	
		HibernateUtility hbu=null;
		Session session=null;
		List<QuotationBillBean> saleList=null;
		try
		{
			hbu = HibernateUtility.getInstance();
		 session = hbu.getHibernateSession();
		 Query query = session.createSQLQuery("SELECT q.quotation_no, q.customer_name FROM quotation q ORDER BY quotation_no DESC LIMIT 1");
			
			List<Object[]> list = query.list();
			 saleList= new ArrayList<QuotationBillBean>(0);
			for (Object[] object : list) {
				QuotationBillBean reports = new QuotationBillBean();
				reports.setBillNo(Long.parseLong(object[0].toString()));
				saleList.add(reports);	 
		}}
		catch(RuntimeException e)
		{
			Log.error("Error in getCustomerBill()", e);	
		}finally
		{if(session!=null){
			hbu.closeSession(session);	
		}
		}
		return saleList;
		}
	
	public List getCurrentQuotationNumber(HttpServletRequest request)
	{
		HttpSession usersession = request.getSession(true);
		String userid = (String)usersession.getAttribute("userid");
		String shopid = (String)usersession.getAttribute("shopid");
		
		HibernateUtility hbu=null;
		Session session=null;
		List<QuotationBillBean> Txidlist=null;
		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createSQLQuery("SELECT q.quotation_no, q.customer_name FROM quotation q WHERE q.fk_shop_id = '"+shopid+"' ORDER BY quotation_no DESC LIMIT 1");
	
			List<Object[]> list = query.list();
			Txidlist= new ArrayList<QuotationBillBean>(0);
			for (Object[] object : list)
			{				
				QuotationBillBean bean=new QuotationBillBean();
				bean.setQuotationNo(Long.parseLong(object[0].toString()));
				Txidlist.add(bean);
			}
		}
		catch(RuntimeException e)
		{
			Log.error("Error in getPartnerTransactionLastTransactionNo()", e);	
		}
		finally
		{
			if(session!=null)
			{
				hbu.closeSession(session);	
			}
		}
		return Txidlist;
	}
}
