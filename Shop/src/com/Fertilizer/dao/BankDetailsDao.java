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

import com.Fertilizer.bean.GetBankDetails;
import com.Fertilizer.bean.GetCreditCustomerDetails;
import com.Fertilizer.bean.PartnerDetailsBean;
import com.Fertilizer.hibernate.BankDetailsBean;
import com.Fertilizer.hibernate.CustomerDetailsBean;
import com.Fertilizer.utility.HibernateUtility;

public class BankDetailsDao {
	
	public void valBankDetails(BankDetailsBean cdb){
		System.out.println("In DAO");
		
		HibernateUtility hbu=null;
		Session session = null;
		Transaction transaction = null;
		try{
		 hbu = HibernateUtility.getInstance();
		session = hbu.getHibernateSession();
		 System.out.println("got session ");
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
	//hbu.closeSession(session);
	}

public List getBankDetailsList()
{		
	HibernateUtility hbu=null;
	Session session=null;
	List<GetBankDetails> bankList=null;
	try{
		hbu = HibernateUtility.getInstance();
		session = hbu.getHibernateSession();

		Query query=session.createSQLQuery("SELECT bank_name, account_no, branch_name, ifsc_code, account_holder_name, contact_no, address,pk_bank_details_id FROM bank_details");
		//Query query = session.createQuery("from PurchaseBill2");
		List<Object[]> list = query.list();

		bankList= new ArrayList<GetBankDetails>(0);

		for (Object[] object : list) {	
			GetBankDetails bean = new GetBankDetails();
		
			bean.setBankName(object[0].toString());
			bean.setAccountNo(Long.parseLong(object[1].toString()));
			bean.setBranchName(object[2].toString());
			bean.setIfscCode(object[3].toString());
			bean.setAccountHolderName(object[4].toString());
			bean.setContactNo(Long.parseLong(object[5].toString()));
			bean.setAddress(object[6].toString());
			bean.setPkbankid(Long.parseLong(object[7].toString()));		
		bankList.add(bean);

	}}catch(RuntimeException e){
		e.printStackTrace();
	}
	finally{

	hbu.closeSession(session);	
	}
	return bankList;
	}

	public List getaccNoandifscbybankname(String bankNameId, HttpServletRequest request)
	{
		HttpSession usersession = request.getSession(true);
		String userid = (String)usersession.getAttribute("userid");
		String shopid = (String)usersession.getAttribute("shopid");
		
		 HibernateUtility hbu = null ;
		 Session session = null;
		 List list  = null;
		 try 
		 {
			 hbu = HibernateUtility.getInstance();
			 session = hbu.getHibernateSession();
			 Query query = session.createSQLQuery("SELECT account_no, ifsc_code FROM bank_details WHERE pk_bank_details_id ='"+bankNameId+"' and fk_shop_id ='"+shopid+"'");
		     list = query.list();
		
	     } catch (Exception e) {
	    	 e.printStackTrace();
	    	 // TODO: handle exception
	     }
		 finally
		 {
			 if (session!=null) {
				hbu.closeSession(session);
			}
		 }
			return list;
	}
	
public List getBankNameList()
{		
		HibernateUtility hbu=null;
		Session session=null;
		List<BankDetailsBean> bankList=null;
		try{	

			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();

			Query query=session.createSQLQuery("SELECT pk_bank_details_id, bank_name from bank_details");
			
			List<Object[]> list = query.list();

			bankList= new ArrayList<BankDetailsBean>(0);


			for (Object[] object : list) {	
				BankDetailsBean reports = new BankDetailsBean();
				
				reports.setPkbankdetailsID(Long.parseLong(object[0].toString()));
				reports.setBankName(object[1].toString());
				
				bankList.add(reports);

			}}catch(RuntimeException e){	

			}
		finally{

			hbu.closeSession(session);	
		}
		return bankList;
	}
}
