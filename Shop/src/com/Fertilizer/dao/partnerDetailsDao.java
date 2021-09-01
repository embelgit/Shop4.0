package com.Fertilizer.dao;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.jfree.util.Log;

import com.Fertilizer.bean.GetSupplierDetails;
import com.Fertilizer.bean.PartnerDetailsBean;
import com.Fertilizer.hibernate.ExpenditurePaymentBean;
import com.Fertilizer.hibernate.PartnerDetailsBeanH;
import com.Fertilizer.hibernate.PartnerTransactionBeanH;
import com.Fertilizer.utility.HibernateUtility;

public class partnerDetailsDao
{
	public void registerPartner(PartnerDetailsBeanH sdb)
	{	
		System.out.println("In DAO");
		
		HibernateUtility hbu=null;
		Session session = null;
		Transaction transaction = null;
		try{
				 hbu = HibernateUtility.getInstance();
				 session = hbu.getHibernateSession();
				 transaction = session.beginTransaction();
	
				 System.out.println("Tx started");
				session.save(sdb);
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
	
public List getPartnerList(){
		
		HibernateUtility hbu=null;
		Session session=null;
		List<PartnerDetailsBean> partnerList=null;
	try{	

		hbu = HibernateUtility.getInstance();
		session = hbu.getHibernateSession();

		Query query=session.createSQLQuery("SELECT pd.partnerName, pd.city, pd.contactNo, pd.alternateContactNo, pd.emailId, pd.address, pd.pkPartnerId from partnerdetails pd;");
		//Query query = session.createQuery("from PurchaseBill2");
		List<Object[]> list = query.list();
		System.out.println("pntr list size - "+query.list().size());
		partnerList= new ArrayList<PartnerDetailsBean>(0);


	for (Object[] object : list) {	
		PartnerDetailsBean reports = new PartnerDetailsBean();
		System.out.println("rslt - "+Arrays.toString(object));
		reports.setPartnerName(object[0].toString());
		reports.setCity(object[1].toString());
		reports.setContactNo(object[2].toString());
		reports.setAlternateContactNo(object[3].toString());
		reports.setEmailId(object[4].toString());
		reports.setAddress(object[5].toString());
		reports.setPkPartnerId(object[6].toString());
		
		
		partnerList.add(reports);

	}}catch(RuntimeException e){	

	}
	finally{

	hbu.closeSession(session);	
	}
	return partnerList;
	}
	
//get latest Employee Payment ID number in Employee Payment Table
public List getPartnerTransactionLastTransactionNo() {
	
	HibernateUtility hbu=null;
	Session session=null;
	List<PartnerTransactionBeanH> Txidlist=null;
	try
	{
		hbu = HibernateUtility.getInstance();
		session = hbu.getHibernateSession();
		Query query = session.createSQLQuery("SELECT pt.transactoin_No_partner_Transactions, pt.pk_partner_Transactions_id FROM partnertransactions pt ORDER BY pt.transactoin_No_partner_Transactions DESC LIMIT 1");

		List<Object[]> list = query.list();
		Txidlist= new ArrayList<PartnerTransactionBeanH>(0);
		for (Object[] object : list) {
			
			PartnerTransactionBeanH bean=new PartnerTransactionBeanH();
			bean.setTransactoin_No_partner_Transactions(Long.parseLong(object[0].toString()));
			
			Txidlist.add(bean);	 
		}}
	catch(RuntimeException e)
	{
		Log.error("Error in getPartnerTransactionLastTransactionNo()", e);	
	}finally
	{if(session!=null){
		hbu.closeSession(session);	
	}
	}
	return Txidlist;	
}

	public List getAllPartnerName()
	{
		HibernateUtility hbu = null;
		Session session =  null;
		Query query = null;
		 List list = null;
	 try {
			 hbu = HibernateUtility.getInstance();
			 session = hbu.getHibernateSession();
			 query = session.createQuery("from PartnerDetailsBeanH");
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
	
	public List getAllPartner(HttpServletRequest request)
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
			 query = session.createQuery("from PartnerDetailsBeanH where fkshopid='"+shopid+"'");
			 list = query.list(); 
		} catch (RuntimeException e) {
			Log.error("Error in getAllPartner", e);
		}
		 
		 finally
		 {
			 if (session!=null) {
				hbu.closeSession(session);
			}
		 }
				return list;
	}
	
	
	public List getAllPartnerDetailsForEdit(Long partnerID, HttpServletRequest request) 
	{
		HttpSession usersession = request.getSession(true);
		String userid = (String)usersession.getAttribute("userid");
		String shopid = (String)usersession.getAttribute("shopid");

		System.out.println("into dao partner : "+partnerID);
		HibernateUtility hbu = null;
		Session session =  null;
		Query query = null;
		 List list = null;
		 try {
			 hbu = HibernateUtility.getInstance();
			 session = hbu.getHibernateSession();
			 query = session.createSQLQuery("SELECT partnerName, contactNo, alternateContactNo, emailId, city, address from partnerdetails WHERE pkPartnerId = '"+partnerID+"' AND fk_shop_id = '"+shopid+"'");
			 list = query.list(); 
		} catch (RuntimeException e) {
			e.printStackTrace();
		}
		 
		 finally
		 {
			 if (session!=null) {
				hbu.closeSession(session);
			}
		 }
		 System.out.println("out of dao - return partner List : "+list);
				return list;
	}
	
	
}