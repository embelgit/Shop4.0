package com.Fertilizer.dao;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.Hibernate;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.jfree.util.Log;

import com.Fertilizer.hibernate.CreditNoteConversionBean;
import com.Fertilizer.hibernate.creditnotebean;
import com.Fertilizer.hibernate.purchaseReturnBean;
import com.Fertilizer.utility.HibernateUtility;
	


public class creditnoteDao {

	public void insertCreditNote(creditnotebean bean){
		System.out.println("In DAO");

		HibernateUtility hbu=null;
		Session session = null;
		Transaction transaction = null;
		try{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			System.out.println("got session ");
			transaction = session.beginTransaction();

			System.out.println("Transation started");
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
			if(session!=null){
				hbu.closeSession(session);	
			}
		}
//		hbu.closeSession(session);
	}
	
	
	
	//get latest Transaction number in supplier_payment
	
	  public List getCreditNoteTxid() 
	  { 
	  HibernateUtility hbu=null; Session
	  session=null; List<creditnotebean> Txidlist=null; 
	  try 
	  { 
	
				  hbu =HibernateUtility.getInstance(); 
				  session = hbu.getHibernateSession(); 
				  Query  query = session.
	  
	  createSQLQuery("SELECT transaction_no,party_name FROM creditnotegeneration ORDER BY transaction_no DESC LIMIT 1");
	 
	  
	  List<Object[]> list = query.list(); 
		Txidlist= new ArrayList<creditnotebean>(0); 
	  for (Object[] object : list) {
	 
	  creditnotebean bean=new creditnotebean();
	  bean.setTxId(Long.parseLong(object[0].toString()));
	  bean.setPartyname(object[1].toString()); 
	  Txidlist.add(bean); 
	  }
	  }
	  catch(RuntimeException e) 
	  { Log.error("Error in getCustomerBill()", e);
	  }
	  finally {if(session!=null){ hbu.closeSession(session); } } return Txidlist;
	  }
	  
	//get latest Credit Conversion transaction ID number in Credit Note Conversion Table
		public List getCreditConvReturnId(HttpServletRequest request) 
		{
			HttpSession usersession = request.getSession(true);
			String userid = (String)usersession.getAttribute("userid");
			String shopid = (String)usersession.getAttribute("shopid");
			
			HibernateUtility hbu=null;
			Session session=null;
			List<CreditNoteConversionBean> Txidlist=null;
			try
			{
				hbu = HibernateUtility.getInstance();
				session = hbu.getHibernateSession();
				Query query = session.createSQLQuery("SELECT trans_No_Credit_Conversion, supplier_name FROM creditnoteconversion WHERE shop_id ='"+shopid+"' ORDER BY trans_No_Credit_Conversion DESC LIMIT 1");

				List<Object[]> list = query.list();
				Txidlist= new ArrayList<CreditNoteConversionBean>(0);
				for (Object[] object : list) {
					
					CreditNoteConversionBean bean=new CreditNoteConversionBean();
					bean.setTransNoForCreditConversion(Long.parseLong(object[0].toString()));
					bean.setSupplierName(object[1].toString());
					
					Txidlist.add(bean);	 
				}}
			catch(RuntimeException e)
			{
				Log.error("Error in getCreditConvReturnId()", e);	
			}finally
			{
				if(session!=null){
				hbu.closeSession(session);	
			}
			}
			return Txidlist;	
		}

}
