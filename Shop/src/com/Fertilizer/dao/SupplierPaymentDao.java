package com.Fertilizer.dao;

import java.math.BigInteger;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.jfree.util.Log;

import com.Fertilizer.bean.CreditCustPaymentDetail;
import com.Fertilizer.bean.SupplierPaymentDetail;
import com.Fertilizer.hibernate.SupplierPaymentBean;
import com.Fertilizer.hibernate.purchaseReturnBean;
import com.Fertilizer.utility.HibernateUtility;


public class SupplierPaymentDao {

	//1.
	//Inserting supplire data in table
	public void regSupPayment(SupplierPaymentBean bean) {
		
		HibernateUtility hbu = null;
		Session session = null;
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
				
				Log.error("Error in regSupPayment", e2);
			}
		}
		finally
		{
			System.out.println("SESSION IS NULL >>>>>>>>>>>>>>>>>>>>>>>>>> 2");
			if (session!=null) {
				hbu.closeSession(session);
			}
		}
		
	}
	
	//2.
	//Supplier Payment details for single date
	public List<SupplierPaymentDetail> getCreditCustPaymentDetailsForSingleDate(
			String fDate) {
		
		HibernateUtility hbu=null;
		Session session=null;
		List<SupplierPaymentDetail> supplierList = null;
		try
		{
				hbu = HibernateUtility.getInstance();
		 session = hbu.getHibernateSession();
		 Query query = session.createSQLQuery("select supplier_name, bill_no, total_amount, balance, payment, payment_mode,person_name,paymentType,insert_date FROM supplier_details RIGHT JOIN supplier_payment ON supplier_details.pk_supplier_id = supplier_payment.fk_supplier_id WHERE DATE(insert_date)=:isInsertDate ");
			query.setParameter("isInsertDate", fDate);
			List<Object[]> list = query.list();
			supplierList = new ArrayList<SupplierPaymentDetail>(0);
			
			
			for (Object[] object : list) {
				
				SupplierPaymentDetail reports = new SupplierPaymentDetail();
				String paymentType = object[7].toString();
				reports.setSupplierName(object[0].toString());
		//		reports.setBillNo((BigInteger)object[1]);
				reports.setBill(object[1].toString());
				reports.setTotalAmount(Double.parseDouble(object[2].toString()));
				reports.setBalanceAmount(Double.parseDouble(object[3].toString()));
				//reports.setPaymentAmount(Double.parseDouble(object[4].toString()));
				 if(paymentType.equals("credit")){
				    	reports.setCreditAmount(Double.parseDouble(object[4].toString()));
				    	reports.setDebitAmount(0.0);
				    }
				    else if(paymentType.equals("debit")){
				    	reports.setDebitAmount(Double.parseDouble(object[4].toString()));
				    	reports.setCreditAmount(0.0);
				    }
			    reports.setPaymentMode(object[5].toString());
			    reports.setAccountantName(object[6].toString());
				//reports.setPaymentType(object[7].toString());
			    reports.setPaymentDate(object[8].toString());
			    supplierList.add(reports); 
		
			}}
		catch(Exception e)
		{
			e.printStackTrace();	
		}
		return supplierList;	
	
	
		
	}

	//3.
	//Supplier Payment Details between two dates
	public List<SupplierPaymentDetail> getSupplierDetailsDateWise(String fDate,
			String tDate,String fkSupplierId) {


		System.out.println(fDate+"first Date In dao");
		System.out.println(tDate+"Second Date In dao");
		System.out.println(fkSupplierId+"fkSupplierId  In dao");
		HibernateUtility hbu=null;
		Session session=null;
		List<SupplierPaymentDetail> sup1List=null;
		try
		{
			hbu = HibernateUtility.getInstance();
		 session = hbu.getHibernateSession();
		 Query query2 = session.createSQLQuery("select s.supplier_name, p.bill_no, p.total_amount, p.balance, p.payment, p.payment_mode,p.person_name,p.paymentType,p.insert_date FROM  supplier_payment p RIGHT JOIN supplier_details s ON s.pk_supplier_id = p.fk_supplier_id WHERE p.fk_supplier_id='"+fkSupplierId+"'AND p.insert_date BETWEEN '"+fDate+"' AND '"+tDate+"'");
			/*query2.setParameter("fDate", fDate);
	        query2.setParameter("edDate", tDate);
	        query2.setParameter("fkSupplierId", fkSupplierId);*/
	        List<Object[]> list = query2.list();
	        sup1List= new ArrayList<SupplierPaymentDetail>(0);
	        System.out.println("IN DAO"+list);
			
			
			for (Object[] object : list) {
				
				SupplierPaymentDetail reports = new SupplierPaymentDetail();
				String paymentType = object[7].toString();
				reports.setSupplierName(object[0].toString());
			//	reports.setBillNo((BigInteger)object[1]);
				reports.setBill(object[1].toString());
				reports.setTotalAmount(Double.parseDouble(object[2].toString()));
				reports.setBalanceAmount(Double.parseDouble(object[3].toString()));
				//reports.setPaymentAmount(Double.parseDouble(object[4].toString()));
				if(paymentType.equals("credit")){
			    	reports.setCreditAmount(Double.parseDouble(object[4].toString()));
			    	reports.setDebitAmount(0.0);
			    }
			    else if(paymentType.equals("debit")){
			    	reports.setDebitAmount(Double.parseDouble(object[4].toString()));
			    	reports.setCreditAmount(0.0);
			    }
			    reports.setPaymentMode(object[5].toString());
			    reports.setAccountantName(object[6].toString());
				//reports.setPaymentType(object[7].toString());
			    reports.setPaymentDate(object[8].toString());
			    sup1List.add(reports); 
		
			}}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		return sup1List;
		
	
	
	}
	
	//
	public List<SupplierPaymentDetail> getSupplierDetailspaymode(String fDate,
			String tDate,String paymentMode) {


		System.out.println(fDate+"  first Date In dao");
		System.out.println(tDate+"  Second Date In dao");
		System.out.println(paymentMode+"  paymentMode  In dao");
		HibernateUtility hbu=null;
		Session session=null;
		List<SupplierPaymentDetail> sup1List=null;
		try
		{
			hbu = HibernateUtility.getInstance();
		 session = hbu.getHibernateSession();
		 Query query2 = session.createSQLQuery("select s.supplier_name, p.bill_no, p.total_amount, p.balance, p.payment, p.payment_mode,p.person_name,p.paymentType,p.insert_date FROM  supplier_payment p RIGHT JOIN supplier_details s ON s.pk_supplier_id = p.fk_supplier_id WHERE p.payment_mode='"+paymentMode+"'AND p.insert_date BETWEEN '"+fDate+"' AND '"+tDate+"'");
			/*query2.setParameter("fDate", fDate);
	        query2.setParameter("edDate", tDate);
	        query2.setParameter("fkSupplierId", fkSupplierId);*/
	        List<Object[]> list = query2.list();
	        sup1List= new ArrayList<SupplierPaymentDetail>(0);
	        System.out.println("IN DAO -  "+list);
			
			
			for (Object[] object : list) {
				
				SupplierPaymentDetail reports = new SupplierPaymentDetail();
		        System.out.println("IN rslt - "+ Arrays.toString(object));
				
				String paymentType = object[7].toString();
				reports.setSupplierName(object[0].toString());
			//	reports.setBillNo((BigInteger)object[1]);
				reports.setBill(object[1].toString());
				reports.setTotalAmount(Double.parseDouble(object[2].toString()));
				reports.setBalanceAmount(Double.parseDouble(object[3].toString()));
				//reports.setPaymentAmount(Double.parseDouble(object[4].toString()));
				if(paymentType.equals("credit")){
			    	reports.setCreditAmount(Double.parseDouble(object[4].toString()));
			    	reports.setDebitAmount(0.0);
			    }
			    else if(paymentType.equals("debit")){
			    	reports.setDebitAmount(Double.parseDouble(object[4].toString()));
			    	reports.setCreditAmount(0.0);
			    }
			    reports.setPaymentMode(object[5].toString());
			    reports.setAccountantName(object[6].toString());
				//reports.setPaymentType(object[7].toString());
			    reports.setPaymentDate(object[8].toString());
			    sup1List.add(reports); 
		
			}}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		return sup1List;
		
	
	
	}
	
	
	
	//3.
	public List<SupplierPaymentDetail> getCreditCustPaymentDetailsAsBill(
			String billNo, String fkSupplierId) {

		
		HibernateUtility hbu=null;
		Session session=null;
		List<SupplierPaymentDetail> supplierList = null;
		try
		{
				hbu = HibernateUtility.getInstance();
		 session = hbu.getHibernateSession();
		 Query query = session.createSQLQuery("select s.supplier_name, p.bill_no, p.total_amount, p.balance, p.payment, p.payment_mode, p.person_name , p.paymentType,p.insert_date FROM supplier_details s RIGHT JOIN supplier_payment p ON s.pk_supplier_id = p.fk_supplier_id WHERE p.bill_no =:billNumber And p.fk_supplier_id=:fkSupplierId");
			query.setParameter("billNumber", billNo);
			query.setParameter("fkSupplierId", fkSupplierId);
			
			
			List<Object[]> list = query.list();
			supplierList = new ArrayList<SupplierPaymentDetail>(0);
			System.out.println("query.list() size  - "+query.list().size());
			
			for (Object[] object : list) {
				
				SupplierPaymentDetail reports = new SupplierPaymentDetail();
				String paymentType = object[7].toString();
				
				reports.setSupplierName(object[0].toString());
//				reports.setBillNo((BigInteger)object[1]);
				reports.setBill(object[1].toString());
				reports.setTotalAmount(Double.parseDouble(object[2].toString()));
				reports.setBalanceAmount(Double.parseDouble(object[3].toString()));
				 if(paymentType.equals("credit")){
				    	reports.setCreditAmount(Double.parseDouble(object[4].toString()));
				    	reports.setDebitAmount(0.0);
				    }
				    else if(paymentType.equals("debit")){
				    	reports.setDebitAmount(Double.parseDouble(object[4].toString()));
				    	reports.setCreditAmount(0.0);
				    }
				//reports.setPaymentAmount(Double.parseDouble(object[4].toString()));
			    reports.setPaymentMode(object[5].toString());
			    reports.setAccountantName(object[6].toString());
			    reports.setPaymentDate(object[8].toString());
			   // reports.setPaymentType(object[7].toString());
				
			    supplierList.add(reports); 
		
			}}
		catch(Exception e)
		{
			e.printStackTrace();	
		}
		return supplierList;	
	
	
		
	
	}

	//4.
	public List<SupplierPaymentDetail> getCreditCustPaymentDetailsAsBill(
			String fkSupplierId) {

		
		HibernateUtility hbu=null;
		Session session=null;
		List<SupplierPaymentDetail> supplierList = null;
		try
		{
				hbu = HibernateUtility.getInstance();
		 session = hbu.getHibernateSession();
		 Query query = session.createSQLQuery("select supplier_name, bill_no, total_amount, balance, paymentType,payment_mode,person_name, payment,insert_date FROM supplier_details RIGHT JOIN supplier_payment ON supplier_details.pk_supplier_id = supplier_payment.fk_supplier_id WHERE supplier_payment.fk_supplier_id=:fkSupplierId");
			query.setParameter("fkSupplierId", fkSupplierId);
			List<Object[]> list = query.list();
			supplierList = new ArrayList<SupplierPaymentDetail>(0);
			
			
			for (Object[] object : list) {
				System.out.println("}}{{}}{{}}}{{"+object[8].toString());
				
				SupplierPaymentDetail reports = new SupplierPaymentDetail();
				String paymentType = object[4].toString();
				
				reports.setSupplierName(object[0].toString());
//				String aa = object[1].toString();
				reports.setBill(object[1].toString());
				reports.setTotalAmount(Double.parseDouble(object[2].toString()));
				reports.setBalanceAmount(Double.parseDouble(object[3].toString()));
				//reports.setPaymentType(object[4].toString());
			    reports.setPaymentMode(object[5].toString());
			    reports.setAccountantName(object[6].toString());
			    if(paymentType.equals("credit")){
			    	reports.setCreditAmount(Double.parseDouble(object[7].toString()));
			    	reports.setDebitAmount(0.0);
			    }
			    else if(paymentType.equals("debit")){
			    	reports.setDebitAmount(Double.parseDouble(object[7].toString()));
			    	reports.setCreditAmount(0.0);
			    }
				//reports.setPaymentAmount(Double.parseDouble(object[7].toString()));
			    reports.setPaymentDate(object[8].toString());
			    supplierList.add(reports); 
		
			}}
		catch(Exception e)
		{
			e.printStackTrace();	
		}
		return supplierList;	
	
	
		
	
	}
	
	//5.
	// Supplier payment details for report
		public List getSupplierPaymentDetailForReport(){
		    HibernateUtility hbu=null;
		    Session session=null;
		    List<SupplierPaymentDetail> productList=null;
		    try
		    {
				hbu = HibernateUtility.getInstance();
				session = hbu.getHibernateSession();
				Query query=session.createSQLQuery("SELECT s.supplier_name,p.bill_no,p.total_amount,p.balance,p.paymentType,p.payment,p.payment_mode,"
						+ "p.person_name FROM supplier_payment p LEFT JOIN supplier_details s ON p.fk_supplier_id = s.pk_supplier_id");
				List<Object[]> list = query.list();
				productList= new ArrayList<SupplierPaymentDetail>(0);	
			for (Object[] o : list) {
				System.out.println(Arrays.toString(o));
				
				SupplierPaymentDetail reports = new SupplierPaymentDetail();
				String paymentType = o[4].toString();
				reports.setSupplierName(o[0].toString());
				
			//	reports.setBillNo((BigInteger)o[1]);
				reports.setBill(o[1].toString());
				reports.setTotalAmount(Double.parseDouble(o[2].toString()));
				reports.setBalanceAmount(Double.parseDouble(o[3].toString()));
				reports.setPaymentType(o[4].toString());
				reports.setPaymentAmount(Double.parseDouble(o[5].toString()));
				 if(paymentType.equals("credit")){
				    	reports.setCreditAmount(Double.parseDouble(o[5].toString()));
				    	reports.setDebitAmount(0.0);
				    }
				    else if(paymentType.equals("debit")){
				    	reports.setDebitAmount(Double.parseDouble(o[5].toString()));
				    	reports.setCreditAmount(0.0);
				    }
				reports.setPaymentMode(o[6].toString());
				reports.setAccountantName(o[7].toString());
				
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
		 //6.
		//All suplier payment in balance areport
		public List getSupplierPaymentDetailForBalnaceReport(){
		    HibernateUtility hbu=null;
		    Session session=null;
		    List<SupplierPaymentDetail> productList=null;
		    try
		    {
				hbu = HibernateUtility.getInstance();
				session = hbu.getHibernateSession();
				Query query=session.createSQLQuery("SELECT s.supplier_name,p.bill_number,p.gross_total,p.bill_payment_pending FROM goods_receive p LEFT JOIN supplier_details s ON p.fk_supplier_id = s.pk_supplier_id group by p.bill_number UNION SELECT s.supplier_name,p.bill_number,p.gross_total,p.bill_payment_pending FROM goods_receive p LEFT JOIN supplier_details s ON p.fk_supplier_id = s.pk_supplier_id");
				List<Object[]> list = query.list();
				productList= new ArrayList<SupplierPaymentDetail>(0);	
			for (Object[] o : list) {
				System.out.println(Arrays.toString(o));
				
				SupplierPaymentDetail reports = new SupplierPaymentDetail();
				reports.setSupplierName(o[0].toString());
				reports.setBill(o[1].toString());
				reports.setTotalAmount(Double.parseDouble(o[2].toString()));
				reports.setBalanceAmount(Double.parseDouble(o[3].toString()));
				
				Double total=Double.parseDouble(o[2].toString());
				Double bal=Double.parseDouble(o[3].toString());
				
				Double paid=total - bal;
				
				reports.setPaidAmount(paid);
				
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
		
		 //7.
		// Payment Due Date Details for Report
		public List getPurchaseDueDatesDetailsForReport(){

		    HibernateUtility hbu=null;
		    Session session=null;
		    List<SupplierPaymentDetail> productList=null;
		    try
		    {
				 SimpleDateFormat dateFormat1 = new SimpleDateFormat("yyyyMMdd");
					Date dateobj = new Date();
					String todayDate = dateFormat1.format(dateobj);
				hbu = HibernateUtility.getInstance();
				session = hbu.getHibernateSession();
				Query query=session.createSQLQuery("SELECT s.supplier_name, gross_total,purchaseDate,dueDate FROM goods_receive LEFT JOIN supplier_details s on s.pk_supplier_id = fk_supplier_id WHERE DATEDIFF(dueDate,'"+todayDate+"')<=5 AND DATEDIFF(dueDate,'"+todayDate+"')>0");
				List<Object[]> list = query.list();
				productList= new ArrayList<SupplierPaymentDetail>(0);	
			for (Object[] o : list) {
				System.out.println(Arrays.toString(o));
				
				SupplierPaymentDetail reports = new SupplierPaymentDetail();
				reports.setSupplierName(o[0].toString());
				reports.setTotalAmount(Double.parseDouble(o[1].toString()));
				reports.setPaymentDate(o[2].toString());
				reports.setDueDate(o[3].toString());
				
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
 
		//get latest Supplier Payment ID number in Supplier Payment Table
		public List getLastTransactionNoforSupplier()
		{			
			HibernateUtility hbu=null;
			Session session=null;
			List<SupplierPaymentBean> Txidlist=null;
			try
			{
				hbu = HibernateUtility.getInstance();
				session = hbu.getHibernateSession();
				Query query = session.createSQLQuery("SELECT trans_No_Supplier, person_name FROM supplier_payment ORDER BY trans_No_Supplier DESC LIMIT 1");

				List<Object[]> list = query.list();
				Txidlist= new ArrayList<SupplierPaymentBean>(0);
				for (Object[] object : list)
				{					
					SupplierPaymentBean bean=new SupplierPaymentBean();
					bean.setTransNoForSupplier(Long.parseLong(object[0].toString()));
					bean.setPersonname(object[1].toString());					
					Txidlist.add(bean);	 
				}}
			catch(RuntimeException e)
			{
				Log.error("Error in getLastTransactionNoforSupplier()", e);	
			}finally
			{if(session!=null){
				hbu.closeSession(session);	
			}
			}
			return Txidlist;	
		}
		
		
}
