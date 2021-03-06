package com.Fertilizer.dao;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.jfree.util.Log;

import com.Fertilizer.bean.GetPurchaseOrderDetails;
import com.Fertilizer.bean.PoDetailsForGetPoNumber;
import com.Fertilizer.bean.PurchaseOrderReportBean;
import com.Fertilizer.bean.StockDetail;
import com.Fertilizer.hibernate.CategoryDetailsBean;
import com.Fertilizer.hibernate.ProductDetailsBean;
import com.Fertilizer.hibernate.PurchaseOrderBean;
import com.Fertilizer.hibernate.SupplierDetailsBean;
import com.Fertilizer.utility.HibernateUtility;
import com.itextpdf.text.log.SysoLogger;

public class PurchaseOrderDao {

	public void addPurchaseOrderDetails(PurchaseOrderBean bean) {


		System.out.println("In DAO");
		
		HibernateUtility hbu=null;
		Session session = null;
		Transaction transaction = null;
		
		try{
		 hbu = HibernateUtility.getInstance();
		session = hbu.getHibernateSession();
		 transaction = session.beginTransaction();
	
		 System.out.println("Tx started");
		 
		 //for mapping
		 Long fk_cat_id = bean.getFk_cat_id();
		 Long fk_supplier_id = bean.getSupplier();
		 Long fk_product_id = bean.getProductID();
		
		 SupplierDetailsBean supdetail = (SupplierDetailsBean) session.load(SupplierDetailsBean.class, fk_supplier_id);
		 bean.setSupplierDetailsBean(supdetail);
		 
		 CategoryDetailsBean catdetail = (CategoryDetailsBean) session.load(CategoryDetailsBean.class, fk_cat_id);
		 bean.setCategoryDetailsBean(catdetail);
		
		 ProductDetailsBean proDetail = (ProductDetailsBean) session.load(ProductDetailsBean.class, fk_product_id);
		 bean.setProductDetailsBean(proDetail);
		 
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
			hbu.closeSession(session);
			}
		
		
		}

	public List getPONumber() {
			
		HibernateUtility hbu=null;
		Session session=null;
		List<GetPurchaseOrderDetails> poNumberList=null;
		try
		{
			hbu = HibernateUtility.getInstance();
		 session = hbu.getHibernateSession();
		 Query query = session.createSQLQuery("SELECT po_number , insert_date FROM purchase_order ORDER BY po_number DESC LIMIT 1");
			
			List<Object[]> list = query.list();
			System.out.println(list.size()+"LIST SIZE");
			 poNumberList= new ArrayList<GetPurchaseOrderDetails>(0);
			for (Object[] object : list) {
				System.out.println(Arrays.toString(object)+"PO DETAILS");
				GetPurchaseOrderDetails podetails = new GetPurchaseOrderDetails();
				Long ponumber = Long.parseLong(object[0].toString());
				podetails.setpONumber(Long.parseLong(object[0].toString()));
			   poNumberList.add(podetails);	 
		}}
		catch(RuntimeException e)
		{
			Log.error("Error in getPONumber()", e);	
		}finally
		{if(session!=null){
			hbu.closeSession(session);	
		}
		}
		return poNumberList;	
	
	}
	
	
	
	public List getPONumberForDCUpdate()
	{
		HibernateUtility hbu = null;
		Session session =  null;
		Query query = null;
		List<Object[]> list = null;
		 List<PoDetailsForGetPoNumber> polist = null;
	 try {
			 hbu = HibernateUtility.getInstance();
			 session = hbu.getHibernateSession();
			 query = session.createSQLQuery("SELECT  po_number, DATE(insert_date),product_name from purchase_order group by po_number");
			 list = query.list(); 
			 polist = new ArrayList<PoDetailsForGetPoNumber>(0);
			 for (Object[] object : list) {
					System.out.println(Arrays.toString(object)+"PO DETAILS");
					PoDetailsForGetPoNumber podetails = new PoDetailsForGetPoNumber();
					
					 BigInteger largeValue = new BigInteger(object[0].toString());
					
					   // getting long value from the BigInteger
					   long longValue = largeValue.longValue();
					   podetails.setPonumber(longValue);
					polist.add(podetails);
			 }
			 
		} catch (Exception e) {
			e.printStackTrace();
		}
		 
		 finally
		 {
			 if (session!=null) {
				hbu.closeSession(session);
			}
		 }
				return polist;
		
	}

	public List getPODetails(String poNumber) {
		
		System.out.println("In DAo");
		HibernateUtility hbu=null;
		Session session=null;
		List list=null;
			
			try{
			 hbu=HibernateUtility.getInstance();
			 session=hbu.getHibernateSession();

			Query query=session.createSQLQuery("Select po.fk_product_id, po.dc_number, po.product_name, po.buy_price, po.sale_price, po.weight, po.quantity, po.total_amount from purchase_order po where po.po_number=:poNumber");
			 
			 query.setParameter("poNumber", poNumber);
			 list = query.list();
			 
			System.out.println(list.size()+"*************");
			}catch(RuntimeException e){
				
			Log.error("Error in getPODetails",e);
		}finally{
				if(session!=null){
					
					hbu.closeSession(session);
				}
				
			}
		
		return list;
	}
	
	
	public List<PurchaseOrderReportBean> getPurchaseOrdersForSupplier(String supplierID,String fisDate ,String endDate,String POno) 
	{
		HibernateUtility hbu=null;
		Session session=null;
		List<PurchaseOrderReportBean> poList = null;
		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			
	        Query query = session.createSQLQuery("SELECT supplier_name, booking_no, purchaseDate, product_name, company, unit, quantity, buy_price, cgst, sgst, iGstPercentage, grossTotal  FROM advance_booking WHERE fk_supplier_id ='"+supplierID+"' AND booking_no ='"+POno+"' AND purchaseDate BETWEEN '"+fisDate+"' AND '"+endDate+"'");

	        List<Object[]> list = query.list();
	        poList = new ArrayList<PurchaseOrderReportBean>(0);
	

	for (Object[] object : list) {
		
		
		PurchaseOrderReportBean reports = new PurchaseOrderReportBean();
		  
		  reports.setSupplierName(object[0].toString());
		  reports.setBookingNo(Long.parseLong(object[1].toString()));
		  reports.setPodate(object[2].toString());
		  reports.setProdName(object[3].toString());
		  reports.setCompany(object[4].toString());
		  if(object[5].toString().equals("pcs")) {
			  reports.setUnit("Box/pcs"); 
		  }else {
			  reports.setUnit(object[5].toString()); 
		  }
		  reports.setQuantity1(Double.parseDouble(object[6].toString()));
		  reports.setBuyPrice(Double.parseDouble(object[7].toString()));
		  reports.setCgst(Double.parseDouble(object[8].toString()));
		  reports.setSgst(Double.parseDouble(object[9].toString()));
		  reports.setiGstPercentage(Double.parseDouble(object[10].toString()));
		  reports.setGrosstotal(Double.parseDouble(object[11].toString()));
		  
		  poList.add(reports);
		 		
		}}
		catch(Exception e)
		{
			e.printStackTrace();	
		}
		return poList;	

	}
}
