package com.Fertilizer.dao;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import java.util.Date;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.jfree.util.Log;

import com.Fertilizer.hibernate.CategoryDetailsBean;
import com.Fertilizer.hibernate.ExpenditureDetailsBean;
import com.Fertilizer.utility.HibernateUtility;

public class ExpenditureDetailsDao {

	public void addExpenseDetails(ExpenditureDetailsBean bean) {
		
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

	
	public List getAllExpenseName()
	{
		HibernateUtility hbu = null;
		Session session =  null;
		Query query = null;
		 List list = null;
	 try {
			 hbu = HibernateUtility.getInstance();
			 session = hbu.getHibernateSession();
			 query = session.createQuery("from ExpenditureDetailsBean");
			 list = query.list(); 
		} catch (RuntimeException e) {
			Log.error("Error in getAllExpenseName", e);
		}
		 
		 finally
		 {
			 if (session!=null) {
				hbu.closeSession(session);
			}
		 }
				return list;
		
	}
	
	public List getAllExpenseType()
	{
		HibernateUtility hbu = null;
		Session session =  null;
		Query query = null;
		 List list = null;
	 try {
			 hbu = HibernateUtility.getInstance();
			 session = hbu.getHibernateSession();
			 query = session.createQuery("from ExpenditurePaymentBean group by expenseType");
			 list = query.list(); 
		} catch (RuntimeException e) {
			Log.error("Error in getAllExpenseType", e);
		}
		 
		 finally
		 {
			 if (session!=null) {
				hbu.closeSession(session);
			}
		 }
				return list;
		
	}
		
	// get All expense Names
	public List getAllExpenseNames(HttpServletRequest request)
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
			 query = session.createQuery("from ExpenditureDetailsBean where fkshopid='"+shopid+"'");
			 list = query.list(); 
		} catch (RuntimeException e) {
			Log.error("Error in getAllExpenseNames", e);
		}
		 
		 finally
		 {
			 if (session!=null) {
				hbu.closeSession(session);
			}
		 }
				return list;
		
	}
	
	/* <!-------------- Expenditure List -----------------------> */
	
	public List getExpendDetails(){
		

		
		HibernateUtility hbu=null;
		Session session=null;
		List<ExpenditureDetailsBean>expendList=null;
		Long k = 0l; 
		try{
		hbu = HibernateUtility.getInstance();
		session = hbu.getHibernateSession();

		Query query=session.createSQLQuery("SELECT pk_expense_details_id,expense_name,insert_date,expense_type FROM expenditure_details");
		
		List<Object[]> list = query.list();


		expendList= new ArrayList<ExpenditureDetailsBean>(0);

		 
	for (Object[] o : list)
	{	
		ExpenditureDetailsBean edb = new ExpenditureDetailsBean();
		k++;
		edb.setSrNo(k);
		edb.setPkExpenseDetailsId(Long.parseLong(o[0].toString()));
		edb.setExpenseName(o[1].toString());
		edb.setInsertDate((Date) o[2]);
		if(o[3].toString().equals("direct")){
			edb.setExpenseType("Direct");
		}else{
			edb.setExpenseType("Indirect");
		}
				
		expendList.add(edb);

	}}catch(RuntimeException e){	

	}
	finally{

	hbu.closeSession(session);	
	}
	return expendList;
	
	}
	
	public List getAllExpenseName(String expenseType, HttpServletRequest request)
	{
		System.out.println("IN DAO");
		
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
			 
			 query = session.createSQLQuery("SELECT pk_expense_details_id, expense_name from expenditure_details where expense_type ='"+expenseType+"' and fk_shop_id='"+shopid+"'");
			 list = query.list(); 
					 
		} catch (RuntimeException e) {
			Log.error("Error in getAllExpenseName", e);
		}
		 
		 finally
		 {
			 if (session!=null) {
				hbu.closeSession(session);
			}
		 }
				return list;
		
	}
	
	public List getAllExpenseNameforPayment(String expenseType, HttpServletRequest request)
	{
		System.out.println("IN DAO");
		
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
			 
			 query = session.createSQLQuery("SELECT expense_name, pk_expense_details_id from expenditure_details where expense_type ='"+expenseType+"' and fk_shop_id='"+shopid+"'");
			 list = query.list(); 
//					
		} catch (RuntimeException e) {
			Log.error("Error in getAllExpenseName", e);
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
