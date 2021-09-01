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
import com.Fertilizer.bean.challanBillBean;
import com.Fertilizer.hibernate.FertilizerBillBean;
import com.Fertilizer.hibernate.challanBeanH;
import com.Fertilizer.utility.HibernateUtility;

public class challanDao
{
	public void addChallanBillingInDAO(challanBeanH bean)
	{
		System.out.println("******************************************************* CHALLAN DAO **********************************************");
		
		HibernateUtility hbu=null;
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
		catch(RuntimeException e){
			try
			{
				e.printStackTrace();
				transaction.rollback();
			}catch(RuntimeException rbe)
			{
				Log.error("Couldn't roll back tranaction",rbe);
			}	
		}finally{
		hbu.closeSession(session);
		}
		
		System.out.println("******************************************************* //CHALLAN DAO ******************************************************");
	}
	
	public List getChallanBill(){	
		HibernateUtility hbu=null;
		Session session=null;
		List<challanBillBean> saleList=null;
		try
		{
			hbu = HibernateUtility.getInstance();
		 session = hbu.getHibernateSession();
		 Query query = session.createSQLQuery("SELECT bill_no, customer_name FROM challan ORDER BY bill_no DESC LIMIT 1");
			
			List<Object[]> list = query.list();
			 saleList= new ArrayList<challanBillBean>(0);
			for (Object[] object : list) {
				challanBillBean reports = new challanBillBean();
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
	
	public Long getCurrentChallanBillNumber(HttpServletRequest request)
	{
		HttpSession usersession = request.getSession(true);
		String userid = (String)usersession.getAttribute("userid");
		String shopid = (String)usersession.getAttribute("shopid");
		
		HibernateUtility hbu=null;
		Session session=null;
		
		String billNo;
		
		List<CustomerBillBean> customerBillNumber=null;
		List<BigInteger> list = null;
		
		try
		{
				hbu = HibernateUtility.getInstance();
				session = hbu.getHibernateSession();
				Query query=session.createSQLQuery("select bill_no from challan WHERE fk_shop_id = '"+shopid+"' ORDER BY bill_no DESC limit 1");
				list = query.list();
				if(list.size() == 0)
				{
					list.add(BigInteger.ZERO);
				}									
		}
		catch(RuntimeException  e)
		{
			System.out.println("getCurrentBillNumber === "+e);
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
	
	
public List getChallanNoByCustomerDao(String creditCustomerId) {
		
		HibernateUtility hbu = null ;
    	 Session session = null;
    	 List list  = null;
    	 try {
    		 hbu = HibernateUtility.getInstance();
    		 session = hbu.getHibernateSession();
 			Query query = session.createSQLQuery("select c.pk_fertilizer_bill_id, c.bill_no, c.challanNo from challan c where c.fk_customer_id = "+creditCustomerId+" ORDER BY c.pk_fertilizer_bill_id DESC limit 1");
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
	

public List getChallanNoByCustomerWhenNullDao() {
	
	HibernateUtility hbu = null ;
	 Session session = null;
	 List list  = null;
	 try {
		 hbu = HibernateUtility.getInstance();
		 session = hbu.getHibernateSession();
			Query query = session.createSQLQuery("select c.pk_fertilizer_bill_id, c.bill_no, c.challanNo from challan c ORDER BY c.pk_fertilizer_bill_id DESC limit 1");
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

public List EditChallanBillDetailsNonGrid(String challanNo) {
	
	HibernateUtility hbu=null;
	Session session=null;
	List list = null;
	
	try{
		 String sqlQuery = "";
		 hbu=HibernateUtility.getInstance();
		 session=hbu.getHibernateSession();		 
		 
		 Query query = session.createSQLQuery("SELECT gst_expense_percentage, total_all_product, Discount_perc, Discount_amount, hamali_expense, hamali_expense_Tax_Amt, gross_total FROM challan WHERE challanNo = '"+challanNo+"' limit 1");
		
		 list = query.list();
		 System.out.println(list.size()+"*************");
		}catch(RuntimeException e){
			
		Log.error("Error in getAllchallanBillDetailsForEdit",e);
	   }finally{
	 		if(session!=null){
				 
				hbu.closeSession(session);
			}			
		}
	
	return list;
}
	

}
