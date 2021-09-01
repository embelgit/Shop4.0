package com.Fertilizer.dao;

import java.sql.Date;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;

import com.Fertilizer.bean.SaleReturnBean;
import com.Fertilizer.hibernate.billcancelbean;
import com.Fertilizer.utility.HibernateUtility;

//////////Sale Return Report Between two dates////////////

public class SaleReturnReportDao {



	public List getSaleReturnReportBetweenTwoDates(
			String fDate, String tDate) {
		HibernateUtility hbu=null;
		Session session=null;
		List<SaleReturnBean> productList=null;
		try
		{
			
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			//Query query=session.createSQLQuery("SELECT product_name,company_name,packing,unit,sale_price_ex_tax,csgst,igst,discount_percent,return_quantity,total FROM salereturn WHERE category='"+cat_id+"' and( insert_date BETWEEN '"+fDate+"' AND '"+tDate+"')");
			
			Query query=session.createSQLQuery("Select product_name,company,weight,sale_price,return_quantity,returnDate,tax_percenntage FROM sale_return WHERE returnDate  BETWEEN '"+fDate+"' AND '"+tDate+"' AND return_quantity > 0");
            
			
			List<Object[]> list = query.list();
			System.out.println("List***********************"+list.size());
			productList= new ArrayList<SaleReturnBean>(0);	
			for (Object[] o : list)
			{
				System.out.println(Arrays.toString(o));

				SaleReturnBean reports = new SaleReturnBean();
				reports.setProductName(o[0].toString());
				reports.setCompany(o[1].toString());
				reports.setWeight(Double.parseDouble(o[2].toString()));
				reports.setSalePrice(Double.parseDouble(o[3].toString()));
				reports.setReturnQuantity(Double.parseDouble(o[4].toString()));
				reports.setReturnDate1(o[5].toString());
				reports.setTaxPercentage(Double.parseDouble(o[6].toString()));
			
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
	
	//
	public List billcnclReportBetweenTwoDates(
			String fDate, String tDate) {
		HibernateUtility hbu=null;
		Session session=null;
		List<billcancelbean> productList=null;
		try
		{
			
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			//Query query=session.createSQLQuery("SELECT product_name,company_name,packing,unit,sale_price_ex_tax,csgst,igst,discount_percent,return_quantity,total FROM salereturn WHERE category='"+cat_id+"' and( insert_date BETWEEN '"+fDate+"' AND '"+tDate+"')");
			
			Query query=session.createSQLQuery("select pk_Bill_Id,bill_no,gross_total,cust_type,bill_Type,saleDate,insert_date from bill_cancel WHERE insert_date BETWEEN '"+fDate+"' AND '"+tDate+"'");
            
			
			List<Object[]> list = query.list();
			System.out.println("List***********************"+list.size());
			productList= new ArrayList<billcancelbean>(0);	
			int s=0;
			for (Object[] o : list)
			{
				s++;
				System.out.println(Arrays.toString(o));
				
				billcancelbean rr = new billcancelbean();
				rr.setPkBillId(Long.parseLong(o[0].toString()));
				rr.setBillNo(Long.parseLong(o[1].toString()));
				rr.setGrossTotal(Double.parseDouble(o[2].toString()));
				rr.setCust_type(o[3].toString());
				rr.setBillType(o[4].toString());
				rr.setSaleDate((Date)o[5]);
				rr.setInsertDate((Date)o[6]);
				rr.setSr(s);
				productList.add(rr);		
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

}
