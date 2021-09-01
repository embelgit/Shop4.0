package com.Fertilizer.dao;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;


import org.jfree.util.Log;

import com.Fertilizer.bean.CustomerBean;
import com.Fertilizer.hibernate.FertilizerBillBean;
import com.Fertilizer.utility.HibernateUtility;

public class SaleReturnDao {
	
	public List getAllbillNo(String customerType, HttpServletRequest request)
	{
		HttpSession usersession = request.getSession(true);
		String userid = (String)usersession.getAttribute("userid");
		String shopid = (String)usersession.getAttribute("shopid");
		
		System.out.println("IN DAO");
		HibernateUtility hbu = null;
		Session session =  null;
		Query query = null;
		 List list = null;
		System.out.println("IN DAO"+customerType);
		 try {
			 hbu = HibernateUtility.getInstance();
			 session = hbu.getHibernateSession();
			 
			 System.out.println("IN DAO"+customerType);
			 if(customerType.equals("cash"))
			 {
				 	query = session.createSQLQuery("select bill_no, customer_name from fertilizer_billing WHERE fk_customer_id = 0 and quantity > 0 and fk_shop_id = '"+shopid+"' Group by bill_no");
			 }else {
				    query = session.createSQLQuery("select bill_no, credit_customer_name from fertilizer_billing WHERE fk_customer_id > 0 and quantity > 0 and fk_shop_id = '"+shopid+"' Group by bill_no"); 
			 }
			 list = query.list(); 
			
			 
		} catch (RuntimeException e) {
			Log.error("Error in getAllMainCat", e);
		}
		 
		 finally
		 {
			 if (session!=null) {
				hbu.closeSession(session);
			}
		 }
				return list;
		
	}
	
	
	public List getAllProductDetailsForSaleReturnAsPerBillNo(String billno, HttpServletRequest request)throws Exception
	{
		HttpSession usersession = request.getSession(true);
		String userid = (String)usersession.getAttribute("userid");
		String shopid = (String)usersession.getAttribute("shopid");
		
	  	HibernateUtility hbu = null;
		Session session = null;
		List<Object[]> list = null;
		
		try
		{				
		 String sqlQuery = "";
		 hbu = HibernateUtility.getInstance();
		 session = hbu.getHibernateSession();
		 
		 	sqlQuery = "Select fb.barcode, fb.bill_no, fb.product_name, fb.company, fb.hsn, gr.batch_no, gr.buy_price, fb.mrp, fb.sale_price, gr.tax_percentage, fb.Discount_amount, gr.weight, gr.unit, fb.quantity, fb.pk_fertilizer_bill_id, gr.pk_goods_receive_id from fertilizer_billing fb join goods_receive gr on fb.barcode=gr.barcodeNo where bill_no ='"+billno+"' and fb.fk_shop_id ='"+shopid+"'";
			 		 
		 	Query query = session.createSQLQuery(sqlQuery);
		 
			list = query.list();
		}
		catch(RuntimeException e)
		{
			Log.error("Error in getAllItemDetails(String key)", e);	
		}finally
		{if(session!=null){
			hbu.closeSession(session);	
		}
		}
		System.out.println(list);
		return list;		
	}
	
	//
	
	public List getAllProductcancelBillNo(String billno, HttpServletRequest request)throws Exception
	{
		HttpSession usersession = request.getSession(true);
		String userid = (String)usersession.getAttribute("userid");
		String shopid = (String)usersession.getAttribute("shopid");
		
	  	HibernateUtility hbu = null;
		Session session = null;
		List<Object[]> list = null;
		
		try
		{				
		 String sqlQuery = "";
		 hbu = HibernateUtility.getInstance();
		 session = hbu.getHibernateSession();
		 
		 	sqlQuery = "Select fb.barcode, fb.bill_no, fb.product_name, fb.company, fb.hsn, gr.batch_no, gr.buy_price, fb.mrp, fb.sale_price, gr.tax_percentage, fb.Discount_amount, gr.weight, gr.unit, fb.quantity, fb.pk_fertilizer_bill_id, gr.pk_goods_receive_id from fertilizer_billing fb join goods_receive gr on fb.barcode=gr.barcodeNo where bill_no ='"+billno+"' and fb.fk_shop_id ='"+shopid+"'";
			 		 
		 	Query query = session.createSQLQuery(sqlQuery);
		 
			list = query.list();
		}
		catch(RuntimeException e)
		{
			Log.error("Error in getAllItemDetails(String key)", e);	
		}finally
		{if(session!=null){
			hbu.closeSession(session);	
		}
		}
		System.out.println(list);
		return list;		
	}

	
	//delete bill
	
public void deletebill(String shopid,String billno) {
		
	Transaction tx = null;
		HibernateUtility hbu = null ;
		 Session session = null;
		 List list  = null;
		 System.out.println("``````````` `````````````` in  deleing bill no  -  "+billno+"  , "+shopid);
		 try {
			 hbu = HibernateUtility.getInstance();
			 session = hbu.getHibernateSession();
			tx = session.beginTransaction();	
			 Query query = session.createSQLQuery("DELETE from fertilizer_billing WHERE bill_no = '"+billno+"' AND fk_shop_id = '"+shopid+"'");
				int seletedRecords = query.executeUpdate();
				
				System.out.println("Number of credit Cusr deleted == + =   "+seletedRecords);
				//list = query.list();
				tx.commit();
				
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
	
//
public void deletechallan(String shopid,String billno) {
	
	Transaction tx = null;
		HibernateUtility hbu = null ;
		 Session session = null;
		 List list  = null;
		 System.out.println("``````````` `````````````` in  deleing bill no  -  "+billno+"  , "+shopid);
		 try {
			 hbu = HibernateUtility.getInstance();
			 session = hbu.getHibernateSession();
			tx = session.beginTransaction();	
			 Query query = session.createSQLQuery("DELETE from challan WHERE bill_no = '"+billno+"' AND fk_shop_id = '"+shopid+"'");
				int seletedRecords = query.executeUpdate();
				
				System.out.println("Number of credit Cusr deleted == + =   "+seletedRecords);
				//list = query.list();
				tx.commit();
				
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
}
