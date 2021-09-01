package com.Fertilizer.dao;

import java.math.BigInteger;
import java.sql.Date;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.jfree.util.Log;

import com.Fertilizer.bean.GetEmployeeDetails;
import com.Fertilizer.hibernate.CategoryDetailsBean;
import com.Fertilizer.hibernate.Stock;
import com.Fertilizer.hibernate.SubCategoryDetailsBean;
import com.Fertilizer.hibernate.TaxCreationBean;
import com.Fertilizer.hibernate.shopDetailsBean;
import com.Fertilizer.utility.HibernateUtility;

public class shopDetailsDao {

	public void addShop(shopDetailsBean sdb) {
		
			System.out.println("In DAO");
			//MiddlegenTask
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
	
			public List getAllShop(HttpServletRequest request)
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
//					 query = session.createQuery("from shopDetailsBean where shopId = '"+shopid+"'");
					 query = session.createQuery("from shopDetailsBean");
					 list = query.list(); 
					 System.out.println("list -------------------------------  "+list.size());
				} catch (RuntimeException e) {
					Log.error("Error in getAllShops()", e);
				}
				 
				 finally
				 {
					 if (session!=null) {
						hbu.closeSession(session);
					}
				 }
		     		return list;	
			}
			
			//get latest Shop ID number in Shop Details
			public List getShopId() {
				HibernateUtility hbu=null;
				Session session=null;
				List<shopDetailsBean> Txidlist=null;
				try
				{
					hbu = HibernateUtility.getInstance();
					session = hbu.getHibernateSession();
					Query query = session.createSQLQuery("SELECT shop_id , shop_name FROM shop_details ORDER BY shop_id DESC LIMIT 1");

					List<Object[]> list = query.list();
					Txidlist= new ArrayList<shopDetailsBean>(0);
					for (Object[] object : list) {
						
						shopDetailsBean bean=new shopDetailsBean();
						bean.setShopId(Long.parseLong(object[0].toString()));
						bean.setShopName(object[1].toString());
						
						Txidlist.add(bean);	 
					}}
				catch(RuntimeException e)
				{
					Log.error("Error in getShopId()", e);	
				}finally
				{if(session!=null){
					hbu.closeSession(session);	
				}
				}
				return Txidlist;	
			}
			
      //get all  product name from stock_details table
		public List getProductNames()
			{
				HibernateUtility hbu = null;
				Session session =  null;
				Query query = null;
				 List list = null;
				 try {
					 hbu = HibernateUtility.getInstance();
					 session = hbu.getHibernateSession();
					 query = session.createQuery("from Stock");
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
			
//get all  Company Name of products from stock_details table
			
			public List getCompanyNames()
			{
				HibernateUtility hbu = null;
				Session session =  null;
				Query query = null;
				// List list = null;
				 List<Stock> stockList = null;
				 
				 
				 try {
					 hbu = HibernateUtility.getInstance();
					 session = hbu.getHibernateSession();
					 query = session.createSQLQuery("select CompanyName, ProductName from stock_detail group by CompanyName");
					 List<Object[]> list = query.list(); 
					 stockList = new ArrayList<Stock>(0);
					 
					 for (Object[] object : list) {
							System.out.println(Arrays.toString(object));
						 	Stock reports = new Stock();
							reports.setCompanyName(object[0].toString());
							reports.setProductName(object[1].toString());
							stockList.add(reports); 
					
						}
					 
				} catch (RuntimeException e) {
					Log.error("Error in getAllMainCat", e);
				}
				 
				 finally
				 {
					 if (session!=null) {
						hbu.closeSession(session);
					}
				 }
						return stockList;
				
			}
			
			
			public List getShopName()
			{
				System.out.println("IN DAO");
				HibernateUtility hbu = null;
				Session session =  null;
				Query query = null;
				 List list = null;
				 try {
					 hbu = HibernateUtility.getInstance();
					 session = hbu.getHibernateSession();
					 query = session.createSQLQuery("SELECT pk_shop_id,shop_name from shop_details");
					 list = query.list(); 
					 System.out.println("=== list ===="+list.size());
					 System.out.println("List size of product detail = ="+list.size());
					 
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
			
			public List getAllShops()
			{
				HibernateUtility hbu = null;
				Session session =  null;
				Query query = null;
				 List list = null;
			 try {
					 hbu = HibernateUtility.getInstance();
					 session = hbu.getHibernateSession();
					 query = session.createQuery("from shopDetailsBean");
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
			public List getAlluser()
			{
				HibernateUtility hbu = null;
				Session session =  null;
				Query query = null;
				 List list = null;
			 try {
					 hbu = HibernateUtility.getInstance();
					 session = hbu.getHibernateSession();
					 query = session.createQuery("from UserDetailsBean");
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
			
			
			public List getAllShopList()
			{
				HibernateUtility hbu = null;
				Session session =  null;
				Query query = null;
				 List list = null;
			 try {
					 hbu = HibernateUtility.getInstance();
					 session = hbu.getHibernateSession();
					 query = session.createQuery("from shopDetailsBean");
					 list = query.list(); 
				} catch (RuntimeException e) {
					Log.error("Error in shopDetailsBean", e);
				}			 
				 finally
				 {
					 if (session!=null) {
						hbu.closeSession(session);
					}
				 }
						return list;
			}
			
			// Shop list Content
			
			public List getShopList(){
				
				HibernateUtility hbu=null;
				Session session=null;
				List<shopDetailsBean> shopList=null;
			try{	

				hbu = HibernateUtility.getInstance();
				session = hbu.getHibernateSession();

				Query query=session.createSQLQuery("SELECT pk_shop_id, shop_name, contactNo, gstNo, address, Lic_No_wholesale, Lic_No_shop, footer_shop_name from shop_details");
				
				List<Object[]> list = query.list();


				shopList= new ArrayList<shopDetailsBean>(0);


			for (Object[] object : list) {	
				shopDetailsBean reports = new shopDetailsBean();
				
				reports.setShopId(Long.parseLong(object[0].toString()));
				reports.setShopName(object[1].toString());
				reports.setContactNumber(Long.parseLong(object[2].toString()));
				reports.setGstNo(object[3].toString());
				reports.setAddress(object[4].toString());
				reports.setWholesalelicno(object[5].toString());
				reports.setShoplicno(object[6].toString());
				reports.setFootershopname(object[7].toString());
								
				shopList.add(reports);

			}}catch(RuntimeException e){	

			}
			finally{

			hbu.closeSession(session);	
			}
			return shopList;
			}
			
			// fetch shop name on dropdown
		public List getAllMainShop()
		{
			
			HibernateUtility hbu=null;
			Session session=null;
			
			List list=null;
			try{
			 hbu = HibernateUtility.getInstance();
			 session = hbu.getHibernateSession();
			 Query query = session.createQuery("from shopDetailsBean");
			 list = query.list();
			}catch(Exception e){	
				Log.error("Error in getAllMainShop",e);
			}
			finally{
				if(session!=null){
				hbu.closeSession(session);	
			}
			}
			return list;
		}

		public List getAllShopDetailsForEdit(Long shopId) {


			System.out.println("into dao shop : "+shopId);
			HibernateUtility hbu = null;
			Session session =  null;
			Query query = null;
			 List list = null;
			 try {
				 
				 hbu = HibernateUtility.getInstance();
				 session = hbu.getHibernateSession();
				 query = session.createSQLQuery("SELECT shop_name, contactNo, gstNo, address, Lic_No_wholesale, Lic_No_shop, footer_shop_name from shop_details where pk_shop_id="+shopId);
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
			 System.out.println("out of dao - return shop details : "+list);
					return list;

		}
			
}
