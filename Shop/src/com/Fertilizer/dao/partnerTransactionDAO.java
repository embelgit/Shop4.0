package com.Fertilizer.dao;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.jfree.util.Log;

import com.Fertilizer.bean.ExpenditurePaymentDetail;
import com.Fertilizer.bean.PartnerDetailsBean;
import com.Fertilizer.bean.PartnerTransactionsBean;
import com.Fertilizer.hibernate.ExpenditureDetailsBean;
import com.Fertilizer.hibernate.ExpenditurePaymentBean;
import com.Fertilizer.hibernate.PartnerTransactionBeanH;
import com.Fertilizer.utility.HibernateUtility;

public class partnerTransactionDAO
{
	public void addPartnerTransactionPayment(PartnerTransactionBeanH bean)
	{
		System.out.println("In DAO");
		
		HibernateUtility hbu=null;
		Session session = null;
		Transaction transaction = null;
		
		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			transaction = session.beginTransaction();
		
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
			if (session!=null) {
				hbu.closeSession(session);
			}		
		}		
	}
	
	public List<PartnerTransactionsBean> getPartnersTransactionsAsPerName(String partnerId)
	{
		HibernateUtility hbu=null;
		Session session=null;
		List<PartnerTransactionsBean> ptTList=null;
		try
		{
			 hbu = HibernateUtility.getInstance();
			 session = hbu.getHibernateSession();
			 Query query2 = session.createSQLQuery("select pd.partnerName, pt.total_amount, pt.credit, pt.debit, pt.insert_date,payment_mode FROM partnertransactions pt JOIN partnerdetails pd ON pt.fk_partner_detail_id = pd.pkPartnerId WHERE pt.fk_partner_detail_id = "+partnerId);
			/*query2.setParameter("stDate", fDate);
	        query2.setParameter("edDate", tDate);*/
	        List<Object[]> list = query2.list();
	        ptTList = new ArrayList<PartnerTransactionsBean>(0);
			
			for (Object[] object : list)
			{					
				PartnerTransactionsBean reports = new PartnerTransactionsBean();
				System.out.println("rpt - "+Arrays.toString(object));
				reports.setPartnersName(object[0].toString());
				reports.setTotalAmount(object[1].toString());
				reports.setCreditPT(object[2].toString());
				reports.setDebitPT(object[3].toString());
				reports.setInsertDatePT(object[4].toString());
				reports.setPaymentMode(object[5].toString());
				ptTList.add(reports); 
		
			}}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		System.out.println(Arrays.toString(ptTList.toArray()));
		
		return ptTList;	
	}
}
