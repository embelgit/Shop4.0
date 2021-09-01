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

import com.Fertilizer.bean.GetSupplierDetails;
import com.Fertilizer.bean.SupplierTransactionBean;
import com.Fertilizer.hibernate.SupplierDetailsBean;
import com.Fertilizer.utility.HibernateUtility;

public class SupplierDetailsDao {

	public void valSupplierDetails(SupplierDetailsBean sdb) {
		
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

	
	
	public List getAllSupplier(HttpServletRequest request)
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
			 query = session.createQuery("from SupplierDetailsBean where fkshopid='"+shopid+"'");
			 list = query.list(); 
		} catch (RuntimeException e) {
			Log.error("Error in getAllSupllier", e);
		}
		 
		 finally
		 {
			 if (session!=null) {
				hbu.closeSession(session);
			}
		 }
				return list;
		
	}
	//
	
	public List getAllaccount(HttpServletRequest request)
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
			 query = session.createQuery("from EmployeeDetailsBean");
			 list = query.list(); 
			 System.out.println("emp  query size - "+query.list().size());
		} catch (RuntimeException e) {
			Log.error("Error in getAllSupllier", e);
		}
		 
		 finally
		 {
			 if (session!=null) {
				hbu.closeSession(session);
			}
		 }
				return list;
		
	}
	////////Transaction Id Generation for supplier payment////////////
	
	public Long getCurrentTransNumber()
	{
		HibernateUtility hbu=null;
		Session session=null;
		
		String TransNo;
		
		List<SupplierTransactionBean> SupplierTransactionBean =null;
		List<BigInteger> list = null;
		
		try
		{
				hbu = HibernateUtility.getInstance();
				session = hbu.getHibernateSession();
				Query query=session.createSQLQuery("select bill_no from supplier_payment ORDER BY bill_no DESC limit 1");
				list = query.list();
				if(list.size() == 0)
				{
					list.add(BigInteger.ZERO);
				}									
		}
		catch(RuntimeException  e)
		{
			System.out.println("getCurrentTransNumber === "+e);
		}
		finally
		{
			if(session!=null)
			{
				hbu.closeSession(session);	
			}
		}
		
		return (list.get(0).longValue());
	}

	public void deleteSupplier(String supplier) {
		
		HibernateUtility hbu = null ;
		 Session session = null;
		 List list  = null;
		 try {
			 hbu = HibernateUtility.getInstance();
			 session = hbu.getHibernateSession();
				Query query = session.createSQLQuery("delete from supplier_details where pk_supplier_id="+supplier);
				int seletedRecords = query.executeUpdate();
				System.out.println("Number of credit Cusr deleted == + ="+seletedRecords);
				//list = query.list();
				
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
		
	}

	public List getAllSupplierSetailsForEdit(Long supplierID, HttpServletRequest request) 
	{
		HttpSession usersession = request.getSession(true);
		String userid = (String)usersession.getAttribute("userid");
		String shopid = (String)usersession.getAttribute("shopid");

		System.out.println("into dao supplier : "+supplierID);
		HibernateUtility hbu = null;
		Session session =  null;
		Query query = null;
		List list = null;
		 try {
			 hbu = HibernateUtility.getInstance();
			 session = hbu.getHibernateSession();
			 query = session.createSQLQuery("select supplier_name,city, contact_no, alternate_no, contact_person_name,tin_no, address, email_id from supplier_details WHERE pk_supplier_id = '"+supplierID+"' AND fk_shop_id = '"+shopid+"'");
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
		 System.out.println("out of dao - return credit customer List : "+list);
				return list;
	}
	
	public List getSupplierList(){
		
		HibernateUtility hbu=null;
		Session session=null;
		List<GetSupplierDetails> supList=null;
	try{	

		hbu = HibernateUtility.getInstance();
		session = hbu.getHibernateSession();

		Query query=session.createSQLQuery("SELECT supplier_name, city, contact_no, alternate_no, email_id, contact_person_name, tin_no, address,pk_supplier_id from supplier_details;");
		//Query query = session.createQuery("from PurchaseBill2");
		List<Object[]> list = query.list();


		supList= new ArrayList<GetSupplierDetails>(0);


	for (Object[] object : list) {	
		GetSupplierDetails reports = new GetSupplierDetails();
		reports.setDealerName(object[0].toString());
		reports.setCity(object[1].toString());
		reports.setContactNo((BigInteger)object[2]);
		reports.setLandline((BigInteger)object[3]);
		reports.setEmail(object[4].toString());
		reports.setPersonName(object[5].toString());
		reports.setTin(object[6].toString());
		reports.setAddress(object[7].toString());
		reports.setPksuppID(Long.parseLong(object[8].toString()));
		
		supList.add(reports);

	}}catch(RuntimeException e){	

	}
	finally{

	hbu.closeSession(session);	
	}
	return supList;
	}
	
	
	public List getAllSupplierList()
	{
		HibernateUtility hbu = null;
		Session session =  null;
		Query query = null;
		 List list = null;
	 try {
			 hbu = HibernateUtility.getInstance();
			 session = hbu.getHibernateSession();
			 query = session.createQuery("from SupplierDetailsBean");
			 list = query.list(); 
		} catch (RuntimeException e) {
			Log.error("Error in SupplierDetailsBean", e);
		}			 
		 finally
		 {
			 if (session!=null) {
				hbu.closeSession(session);
			}
		 }
				return list;
	}	
	
	public List getmailIDbySupplierName(String supplierID, HttpServletRequest request)
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
			 Query query = session.createSQLQuery("SELECT email_id, pk_supplier_id FROM supplier_details WHERE pk_supplier_id ='"+supplierID+"' and fk_shop_id ='"+shopid+"'");
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
}
