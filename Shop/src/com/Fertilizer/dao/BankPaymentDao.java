package com.Fertilizer.dao;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.jfree.util.Log;

import com.Fertilizer.bean.PartnerTransactionsBean;
import com.Fertilizer.hibernate.BankDetailsBean;
import com.Fertilizer.hibernate.BankPaymentBean;
import com.Fertilizer.hibernate.CategoryDetailsBean;
import com.Fertilizer.hibernate.PartnerTransactionBeanH;
import com.Fertilizer.utility.HibernateUtility;

public class BankPaymentDao {
	
	public List getAllBankName()
	{
		HibernateUtility hbu = null;
		Session session =  null;
		Query query = null;
		 List list = null;
		 
	 try {
			 hbu = HibernateUtility.getInstance();
			 session = hbu.getHibernateSession();
			 query = session.createQuery("from BankDetailsBean");
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
	
	public void addBankPayment(BankPaymentBean cdb) {
		
		System.out.println("In DAO");
		//MiddlegenTask
		HibernateUtility hbu=null;
		Session session = null;
		Transaction transaction = null;
		try{
		 hbu = HibernateUtility.getInstance();
		session = hbu.getHibernateSession();
		 transaction = session.beginTransaction();
	
		 System.out.println("Tx started");
		session.save(cdb);
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
	
	//get latest Bank Payment ID number in Bank Payment Table
	public List getBankTransactionLastTransactionNo() {
		
		HibernateUtility hbu=null;
		Session session=null;
		List<BankPaymentBean> Txidlist=null;
		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createSQLQuery("SELECT trans_No_Bank, pk_bank_payment_id FROM bank_payment ORDER BY trans_No_Bank DESC LIMIT 1");

			List<Object[]> list = query.list();
			Txidlist= new ArrayList<BankPaymentBean>(0);
			for (Object[] object : list) {
				
				BankPaymentBean bean=new BankPaymentBean();
				bean.setTransNoForBank(Long.parseLong(object[0].toString()));
				
				Txidlist.add(bean);	 
			}}
		catch(RuntimeException e)
		{
			Log.error("Error in getBankTransactionLastTransactionNo()", e);	
		}finally
		{if(session!=null){
			hbu.closeSession(session);	
		}
		}
		return Txidlist;	
	}
	
	public List<BankPaymentBean> getBankTransactionsAsPerName(String bankId)
	{
		HibernateUtility hbu=null;
		Session session=null;
		List<BankPaymentBean> bkList=null;
		try
		{
			 hbu = HibernateUtility.getInstance();
			 session = hbu.getHibernateSession();
			 
			 Query query2 = session.createSQLQuery("SELECT bank_name, account_number, credit_amt, debit_amt, insert_date,payment_mode FROM bank_payment WHERE fk_bank_detail_id ="+bankId);
			
	        List<Object[]> list = query2.list();
	        bkList = new ArrayList<BankPaymentBean>(0);
			
			for (Object[] object : list)
			{					
				BankPaymentBean reports = new BankPaymentBean();
				System.out.println("rslt - "+Arrays.toString(object));
				reports.setBankName(object[0].toString());
				reports.setAccountNumber(Long.parseLong(object[1].toString()));
				reports.setCreditAmt(Double.parseDouble(object[2].toString()));
				reports.setDebitAmt(Double.parseDouble(object[3].toString()));
				reports.setReportDate(object[4].toString());
				reports.setPaymentMode(object[5].toString());
				bkList.add(reports); 
		
			}}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		System.out.println(Arrays.toString(bkList.toArray()));
		
		return bkList;	
	}

}
