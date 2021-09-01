package com.Fertilizer.dao;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.jfree.util.Log;

import com.Fertilizer.bean.CreditCustPaymentDetail;
import com.Fertilizer.bean.ProductDetailsForReports;
import com.Fertilizer.bean.SaleReports;
import com.Fertilizer.bean.SupplierPaymentDetail;
import com.Fertilizer.hibernate.CustomerPaymentBean;
import com.Fertilizer.hibernate.SupplierPaymentBean;
import com.Fertilizer.utility.HibernateUtility;
import com.itextpdf.text.log.SysoLogger;

public class CustomerPaymentDao {

	public void regCustomerPayment(CustomerPaymentBean bean) {


		
		HibernateUtility hbu   = null;
		Session session =null;
		Transaction transaction = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			transaction = session.beginTransaction();
			 session.save(bean);
			 transaction.commit();
			 System.out.println("Successful");
		} catch (RuntimeException e) {
			
			try {
				transaction.rollback();
			} catch (RuntimeException e2) {
				
				Log.error("Error in regCustomerPayment", e2);
			}
		}
		finally
		{
			if (session!=null) {
				hbu.closeSession(session);
			}
		}
		
	
		
	}
	
	
	//All suplier payment in balance areport
			public List getCustomerPaymentDetailForBalnaceReport(){
			    HibernateUtility hbu=null;
			    Session session=null;
			    List<CustomerPaymentBean> productList=null;
			    try
			    {
					hbu = HibernateUtility.getInstance();
					session = hbu.getHibernateSession();
					Query query=session.createSQLQuery("SELECT f.first_name,f.last_name,p.bill_no,p.gross_total,p.bill_payment_pending,p.fk_customer_id FROM fertilizer_billing p left join customer_details f on f.pk_customer_id=p.fk_customer_id group by p.bill_no");
					List<Object[]> list = query.list();
					productList= new ArrayList<CustomerPaymentBean>(0);	
				for (Object[] o : list) {
					System.out.println(Arrays.toString(o));
					
					CustomerPaymentBean reports = new CustomerPaymentBean();
					String custId=(o[5].toString());
					System.out.println("custId"+custId);
					if(custId.equals("0")){
						continue;
					}
					else{
					reports.setFirstName(o[0].toString());
					reports.setLastName(o[1].toString());
					reports.setBill(o[2].toString());
					reports.setTotalAmount(Double.parseDouble(o[3].toString()));
					reports.setBalanceAmount(Double.parseDouble(o[4].toString()));
					
					Double total=Double.parseDouble(o[3].toString());
					Double bal=Double.parseDouble(o[4].toString());
					
					Double paid=total - bal;
					
					reports.setPaidAmount(paid);
					
					productList.add(reports);	
					}
			}}
			catch(Exception e)
			{
				e.printStackTrace();
			}
			 finally
			{
			
			if(session!=null){
				hbu.closeSession(session);	
			}
			}
			return productList;
		}

	
	public List getCreditCustPaymentDetailsForReport(){


		    HibernateUtility hbu=null;
		    Session session=null;
		    List<CreditCustPaymentDetail> creditCustPaymentList=null;
		    try
		    {
				hbu = HibernateUtility.getInstance();
				session = hbu.getHibernateSession();
				Query query=session.createSQLQuery("select first_name, last_name, bill_no, total_amount, balance, credit, payment_mode FROM customer_details RIGHT JOIN credit_customer_payment ON customer_details.pk_customer_id = credit_customer_payment.fk_customer_id WHERE insert_date BETWEEN :stDate AND :edDate;");
				List<Object[]> list = query.list();
			creditCustPaymentList= new ArrayList<CreditCustPaymentDetail>(0);	
			for (Object[] object : list) {
				System.out.println(Arrays.toString(object));
				
				CreditCustPaymentDetail custreports = new CreditCustPaymentDetail();
				custreports.setCreditCustomerFirstName(object[0].toString());
				custreports.setCreditCustomerLastName(object[1].toString());
				custreports.setBillNo((BigInteger)object[2]);
				custreports.setTotalAmount(Double.parseDouble(object[3].toString()));
				custreports.setBalanceAmount(Double.parseDouble(object[4].toString()));
				custreports.setCredit(Double.parseDouble(object[5].toString()));
				custreports.setPaymentMode(object[6].toString());
				
				creditCustPaymentList.add(custreports);		
		}}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		 finally
		{
		
		if(session!=null){
			hbu.closeSession(session);	
		}
		}
		return creditCustPaymentList;
	}


/*To get Details of credit customer Payment between two dates	*/
	
	public List<CreditCustPaymentDetail> getCreditCustomerDetailsDateWise(
			String fDate, String tDate,String fkCustomerId) {

		System.out.println(fDate+"first Date In dao");
		System.out.println(tDate+"Second Date In dao");
		HibernateUtility hbu=null;
		Session session=null;
		List<CreditCustPaymentDetail> custList=null;
		try
		{
			hbu = HibernateUtility.getInstance();
		 session = hbu.getHibernateSession();
		 Query query2 = session.createSQLQuery("select first_name, last_name, bill_no, total_amount, balance, payment, payment_mode,paymentType,insert_date FROM customer_details RIGHT JOIN credit_customer_payment ON customer_details.pk_customer_id = credit_customer_payment.fk_customer_id WHERE insert_date BETWEEN '"+fDate+"' AND '"+tDate+"'AND pk_customer_id='"+fkCustomerId+"'");
			/*query2.setParameter("stDate", fDate);
	        query2.setParameter("edDate", tDate);*/
	        List<Object[]> list = query2.list();
	        custList= new ArrayList<CreditCustPaymentDetail>(0);
			
			
			for (Object[] object : list) {
				
				CreditCustPaymentDetail reports = new CreditCustPaymentDetail();
					
				reports.setCreditCustomerFirstName(object[0].toString());
				reports.setCreditCustomerLastName(object[1].toString());
				reports.setBillNo((BigInteger)object[2]);
				reports.setTotalAmount(Double.parseDouble(object[3].toString()));
				reports.setBalanceAmount(Double.parseDouble(object[4].toString()));
				/*reports.setPaymentAmount(Double.parseDouble(object[5].toString()));*/
			    reports.setPaymentMode(object[6].toString());
			    reports.setPaymentType(object[7].toString());
			    reports.setPaymentDate(object[8].toString());
			    
			    
			    String type=reports.getPaymentType();
			    if(type.equals("credit")){
			    	reports.setCreditPaymentAmount(Double.parseDouble(object[5].toString()));
			    	reports.setDebitPaymentAmount(0.00);
			    }
			    else
			    {
			    	reports.setCreditPaymentAmount(0.00);
			    	reports.setDebitPaymentAmount(Double.parseDouble(object[5].toString()));
			    }
			    reports.setPaymentDate(object[8].toString());
				custList.add(reports); 
		
			}}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		return custList;
		
	
	}

	//
	public List<CreditCustPaymentDetail> getpayDetailsDateWise(
			String fDate, String tDate,String fkCustomerId) {

		System.out.println(fDate+"first Date In dao");
		System.out.println(tDate+"Second Date In dao"+" pay mode  -  "+fkCustomerId);
		HibernateUtility hbu=null;
		Session session=null;
		List<CreditCustPaymentDetail> custList=null;
		try
		{
			hbu = HibernateUtility.getInstance();
		 session = hbu.getHibernateSession();
		 Query query2 = session.createSQLQuery("select first_name, last_name, bill_no, total_amount, balance, payment, payment_mode,paymentType,insert_date FROM customer_details RIGHT JOIN credit_customer_payment ON customer_details.pk_customer_id = credit_customer_payment.fk_customer_id WHERE insert_date BETWEEN '"+fDate+"' AND '"+tDate+"'AND payment_mode='"+fkCustomerId+"'");
			/*query2.setParameter("stDate", fDate);
	        query2.setParameter("edDate", tDate);*/
	        List<Object[]> list = query2.list();
	        custList= new ArrayList<CreditCustPaymentDetail>(0);
			
			
			for (Object[] object : list) {
				
				CreditCustPaymentDetail reports = new CreditCustPaymentDetail();
					
				reports.setCreditCustomerFirstName(object[0].toString());
				reports.setCreditCustomerLastName(object[1].toString());
				reports.setBillNo((BigInteger)object[2]);
				reports.setTotalAmount(Double.parseDouble(object[3].toString()));
				reports.setBalanceAmount(Double.parseDouble(object[4].toString()));
				/*reports.setPaymentAmount(Double.parseDouble(object[5].toString()));*/
			    reports.setPaymentMode(object[6].toString());
			    reports.setPaymentType(object[7].toString());
			    reports.setPaymentDate(object[8].toString());
			    
			    
			    String type=reports.getPaymentType();
			    if(type.equals("credit")){
			    	reports.setCreditPaymentAmount(Double.parseDouble(object[5].toString()));
			    	reports.setDebitPaymentAmount(0.00);
			    }
			    else
			    {
			    	reports.setCreditPaymentAmount(0.00);
			    	reports.setDebitPaymentAmount(Double.parseDouble(object[5].toString()));
			    }
			    reports.setPaymentDate(object[8].toString());
				custList.add(reports); 
		
			}}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		return custList;
		
	
	}

	//for single date
	public List<CreditCustPaymentDetail> getCreditCustPaymentDetailsForSingleDate(
			String fDate) {

		
		HibernateUtility hbu=null;
		Session session=null;
		List<CreditCustPaymentDetail> customerList = null;
		try
		{
				hbu = HibernateUtility.getInstance();
		 session = hbu.getHibernateSession();
		 Query query = session.createSQLQuery("select first_name, last_name, bill_no, total_amount, balance, payment, payment_mode,paymentType,insert_date FROM customer_details RIGHT JOIN credit_customer_payment ON customer_details.pk_customer_id = credit_customer_payment.fk_customer_id WHERE DATE(insert_date)=:isInsertDate ");
			query.setParameter("isInsertDate", fDate);
			List<Object[]> list = query.list();
			customerList = new ArrayList<CreditCustPaymentDetail>(0);
			
			
			for (Object[] object : list) {
				
				CreditCustPaymentDetail reports = new CreditCustPaymentDetail();
					
				reports.setCreditCustomerFirstName(object[0].toString());
				reports.setCreditCustomerLastName(object[1].toString());
				reports.setBillNo((BigInteger)object[2]);
				reports.setTotalAmount(Double.parseDouble(object[3].toString()));
				reports.setBalanceAmount(Double.parseDouble(object[4].toString()));
				/*reports.setPaymentAmount(Double.parseDouble(object[5].toString()));*/
			    reports.setPaymentMode(object[6].toString());	
				reports.setPaymentType(object[7].toString());
				reports.setPaymentDate(object[8].toString());
				
				String type=reports.getPaymentType();
				if(type.equals("credit")){
					 reports.setCreditPaymentAmount(Double.parseDouble(object[5].toString()));
					 reports.setDebitPaymentAmount(0d);
				}
				else{
					 reports.setCreditPaymentAmount(0d);
					 reports.setDebitPaymentAmount(Double.parseDouble(object[5].toString()));
				}
			    customerList.add(reports); 
		
			}}
		catch(Exception e)
		{
			e.printStackTrace();	
		}
		return customerList;	
	
	}


	public List<CreditCustPaymentDetail> getCreditCustPaymentDetailsAsPerBillNum(
			String billNo, String fkCustomerId, String catId) {
	
		HibernateUtility hbu=null;
		Session session=null;
		List<CreditCustPaymentDetail> customerList = null;
		try
		{
		 hbu = HibernateUtility.getInstance();
		 session = hbu.getHibernateSession();
/*		 Query query = session.createSQLQuery("select c.first_name,c.last_name, p.bill_no, p.total_amount, p.balance, p.payment,p.payment_mode,p.paymentType,p.insert_date from credit_customer_payment p LEFT JOIN customer_details c ON c.pk_customer_id=p.fk_customer_id where p.bill_no =:billNo AND p.fk_customer_id =:fkCustomerId AND p.cat_id ="+catId);*/
		 Query query = session.createSQLQuery("select c.first_name,c.last_name, p.bill_no, p.total_amount, p.balance, p.payment,p.payment_mode,p.paymentType,p.insert_date from credit_customer_payment p LEFT JOIN customer_details c ON c.pk_customer_id=p.fk_customer_id where p.bill_no =:billNo AND p.fk_customer_id =:fkCustomerId");
      /* Query query = session.createSQLQuery("select c.first_name,c.last_name, p.bill_no, p.total_amount, p.balance, p.payment,p.payment_mode,p.paymentType,p.insert_date from credit_customer_payment p LEFT JOIN customer_details c ON c.pk_customer_id=p.fk_customer_id where p.bill_no =:billNo AND p.fk_customer_id =:fkCustomerId"); */
			
		 query.setParameter("billNo", billNo);
		 query.setParameter("fkCustomerId", fkCustomerId);
			
		 List<Object[]> list = query.list();
		 customerList = new ArrayList<CreditCustPaymentDetail>(0);
						
			for (Object[] object : list) {
				
				CreditCustPaymentDetail reports = new CreditCustPaymentDetail();
					
				reports.setCreditCustomerFirstName(object[0].toString());
				reports.setCreditCustomerLastName(object[1].toString());
				reports.setBillNo((BigInteger)object[2]);
				reports.setTotalAmount(Double.parseDouble(object[3].toString()));
				reports.setBalanceAmount(Double.parseDouble(object[4].toString()));
				/*reports.setPaymentAmount(Double.parseDouble(object[5].toString()));*/
			    reports.setPaymentMode(object[6].toString());	
				reports.setPaymentType(object[7].toString());
				reports.setPaymentDate(object[8].toString());
				
				String type=reports.getPaymentType();
				if(type.equals("credit")){
					 reports.setCreditPaymentAmount(Double.parseDouble(object[5].toString()));
					 reports.setDebitPaymentAmount(0d);
				}
				else{
					 reports.setCreditPaymentAmount(0d);
					 reports.setDebitPaymentAmount(Double.parseDouble(object[5].toString()));
				}
			    customerList.add(reports); 
		
			}}
		catch(Exception e)
		{
			e.printStackTrace();	
		}
		return customerList;	
	
	
	}


	public List<CreditCustPaymentDetail> getCreditCustPaymentDetailsAsPerName(
			String fkCustomerId) {


		
		HibernateUtility hbu=null;
		Session session=null;
		List<CreditCustPaymentDetail> customerList = null;
		try
		{
				hbu = HibernateUtility.getInstance();
		 session = hbu.getHibernateSession();
		 Query query = session.createSQLQuery("select  c.bill_no, c.total_amount, c.balance, c.payment, c.payment_mode, c.paymentType, c.insert_date, p.first_name, p.last_name FROM  credit_customer_payment c RIGHT JOIN customer_details p ON p.pk_customer_id = c.fk_customer_id WHERE c.fk_customer_id='"+fkCustomerId+"'");
			/*query.setParameter("customer", fkCustomerId);*/
			List<Object[]> list = query.list();
			customerList = new ArrayList<CreditCustPaymentDetail>(0);
			
			
			for (Object[] object : list) {
				
				CreditCustPaymentDetail reports = new CreditCustPaymentDetail();
					
				reports.setCreditCustomerFirstName(object[7].toString());
				reports.setCreditCustomerLastName(object[8].toString());
				reports.setBillNo((BigInteger)object[0]);
				reports.setTotalAmount(Double.parseDouble(object[1].toString()));
				reports.setBalanceAmount(Double.parseDouble(object[2].toString()));
			    reports.setPaymentMode(object[4].toString());	
				reports.setPaymentType(object[5].toString());
				reports.setPaymentDate(object[6].toString());
				
				String type=reports.getPaymentType();
				if(type.equals("credit")){
					 reports.setCreditPaymentAmount(Double.parseDouble(object[3].toString()));
					 reports.setDebitPaymentAmount(0d);
				}
				else{
					 reports.setCreditPaymentAmount(0d);
					 reports.setDebitPaymentAmount(Double.parseDouble(object[3].toString()));
				}
			    customerList.add(reports); 
		
			}}
		catch(Exception e)
		{
			e.printStackTrace();	
		}
		return customerList;	
	
	
		
	}

// Credit customer payment details for report
	public List getCreditCustomerPaymentDetailForReport(){


	    HibernateUtility hbu=null;
	    Session session=null;
	    List<CreditCustPaymentDetail> productList=null;
	    try
	    {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query=session.createSQLQuery("SELECT c.first_name,c.last_name, p.bill_no,p.total_amount,p.balance,p.paymentType,p.payment,p.payment_mode,p.person_name From credit_customer_payment p LEFT JOIN customer_details c on p.fk_customer_id=c.pk_customer_id LEFT JOIN categories cat on p.cat_id=cat.pk_cat_id where p.payment > 0");
			List<Object[]> list = query.list();
			productList= new ArrayList<CreditCustPaymentDetail>(0);	
		for (Object[] o : list) {
			System.out.println(Arrays.toString(o));
			
			CreditCustPaymentDetail reports = new CreditCustPaymentDetail();
			
			reports.setCreditCustomerFirstName(o[0].toString());
			reports.setCreditCustomerLastName(o[1].toString());
			reports.setBillNo((BigInteger)o[2]);
			reports.setTotalAmount(Double.parseDouble(o[3].toString()));
			reports.setBalanceAmount(Double.parseDouble(o[4].toString()));
			reports.setPaymentType(o[5].toString());
			reports.setPaymentAmount(Double.parseDouble(o[6].toString()));
			reports.setPaymentMode(o[7].toString());
			
			if(o[8] == null)
			{
				reports.setAccountantName("N/A");
			}
			else
			{
				reports.setAccountantName(o[8].toString());
			}
			
			productList.add(reports);		
	}}
	catch(Exception e)
	{
		e.printStackTrace();
	}
	 finally
	{
	
	if(session!=null){
		hbu.closeSession(session);	
	}
	}
	return productList;
}
	
	//get latest Customer Payment ID number in Credit Customer Payment Table
			public List getCustPayLastTransactionNo() {
				
				HibernateUtility hbu=null;
				Session session=null;
				List<CustomerPaymentBean> Txidlist=null;
				try
				{
					hbu = HibernateUtility.getInstance();
					session = hbu.getHibernateSession();
					Query query = session.createSQLQuery("SELECT trans_No_Customer, person_name FROM credit_customer_payment ORDER BY trans_No_Customer DESC LIMIT 1");

					List<Object[]> list = query.list();
					Txidlist= new ArrayList<CustomerPaymentBean>(0);
					for (Object[] object : list) {
						
						CustomerPaymentBean bean=new CustomerPaymentBean();
						bean.setTransNoForCustomer(Long.parseLong(object[0].toString()));
						bean.setPersonname(object[1].toString());
						
						Txidlist.add(bean);	 
					}}
				catch(RuntimeException e)
				{
					Log.error("Error in getCustPayLastTransactionNo()", e);	
				}finally
				{if(session!=null){
					hbu.closeSession(session);	
				}
				}
				return Txidlist;	
			}
	
	
}
