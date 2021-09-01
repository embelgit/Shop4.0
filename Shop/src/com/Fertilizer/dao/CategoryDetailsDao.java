package com.Fertilizer.dao;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.jfree.util.Log;

import com.Fertilizer.bean.GetTaxDetails;
import com.Fertilizer.hibernate.CategoryDetailsBean;
import com.Fertilizer.hibernate.Stock;
import com.Fertilizer.hibernate.SubCategoryDetailsBean;
import com.Fertilizer.hibernate.TaxCreationBean;
import com.Fertilizer.utility.HibernateUtility;

public class CategoryDetailsDao {

	public void addCategory(CategoryDetailsBean cdb) {
		
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
	}
	
	//
	public void delCategory(String catid) {
		
		System.out.println("In DAO  "+catid);
		//MiddlegenTask
		HibernateUtility hbu = null ;
		 Session session = null;
		 List list  = null;
		 Transaction tx = null;

		 try {
			 hbu = HibernateUtility.getInstance();
			 session = hbu.getHibernateSession();
			 tx = session.beginTransaction();
			 
				Query query2 = session.createSQLQuery("DELETE from Stock_Detail where FkCatId = '"+catid+"'");
				int seletedRecords2 = query2.executeUpdate();
				System.out.println("Number of stock deleted == + = - "+seletedRecords2);
				
				Query query1 = session.createSQLQuery("DELETE from goods_receive WHERE fkCategoryId ='"+catid+"'");
				int seletedRecords1 = query1.executeUpdate();
				System.out.println("Number of goodreceive deleted == + = - "+seletedRecords1);
								
				
				Query query4 = session.createSQLQuery("DELETE from product_details where fk_cat_id = '"+catid+"'");
				int seletedRecords4 = query4.executeUpdate();
				System.out.println("Number of product deleted == + = - "+seletedRecords4);
				
				Query query3 = session.createSQLQuery("delete from sub_categories where fk_cat_id ='"+catid+"'");
				int seletedRecords3 = query3.executeUpdate();
				System.out.println("Number of subcat deleted == + = - "+seletedRecords3);
				
				Query query5 = session.createSQLQuery("delete from categories where pk_cat_id ='"+catid+"'");
				int seletedRecords5 = query5.executeUpdate();
				System.out.println("Number of cat deleted == + = - "+seletedRecords5);
				tx.commit();

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

//
	public void delsubCategory(String catid) {
		
		System.out.println("In DAO  "+catid);
		//MiddlegenTask
		HibernateUtility hbu = null ;
		 Session session = null;
		 List list  = null;
		 Transaction tx = null;

		 try {
			 hbu = HibernateUtility.getInstance();
			 session = hbu.getHibernateSession();
			 tx = session.beginTransaction();
			 
				Query query2 = session.createSQLQuery("DELETE from Stock_Detail where FkSubCatId = '"+catid+"'");
				int seletedRecords2 = query2.executeUpdate();
				System.out.println("Number of stock deleted == + = - "+seletedRecords2);
				
				Query query1 = session.createSQLQuery("DELETE from goods_receive WHERE fk_subCat_id ='"+catid+"'");
				int seletedRecords1 = query1.executeUpdate();
				System.out.println("Number of goodreceive deleted == + = - "+seletedRecords1);
								
				
				Query query4 = session.createSQLQuery("DELETE from product_details where fk_subCat_id = '"+catid+"'");
				int seletedRecords4 = query4.executeUpdate();
				System.out.println("Number of product deleted == + = - "+seletedRecords4);
				
				Query query3 = session.createSQLQuery("delete from sub_categories where pk_subcat_id ='"+catid+"'");
				int seletedRecords3 = query3.executeUpdate();
				System.out.println("Number of subcat deleted == + = - "+seletedRecords3);
				
			/*
			 * Query query5 =
			 * session.createSQLQuery("delete from categories where pk_cat_id ='"+catid+"'")
			 * ; int seletedRecords5 = query5.executeUpdate();
			 * System.out.println("Number of cat deleted == + = - "+seletedRecords5);
			 */
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
	

	public void addSubCategory(SubCategoryDetailsBean scdb) {
		
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
		 Long fkCatd =  scdb.getFk_cat_id();
		 CategoryDetailsBean catDetails = (CategoryDetailsBean) session.load(CategoryDetailsBean.class, fkCatd);
		 scdb.setCategoryDetailsBean(catDetails);
		 
		session.save(scdb);
		
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
	
	//getting all product categories for cashbook --> credit customer payment
			public List<CategoryDetailsBean> getAllMainCat(HttpServletRequest request)
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
					 query = session.createQuery("from CategoryDetailsBean where fkshopid='"+shopid+"'");
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
			//
			public List<CategoryDetailsBean> getAllMainCatsub(HttpServletRequest request)
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
					 query = session.createQuery("from SubCategoryDetailsBean where fkshopid='"+shopid+"'");
					 list = query.list(); 
					 System.out.println("query -  "+query.list().size());
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
			
		//
			public List<CategoryDetailsBean> getAllshop(HttpServletRequest request)
			{
				HttpSession usersession = request.getSession(true);
				String userid = (String)usersession.getAttribute("userid");
				String shopid = (String)usersession.getAttribute("shopid");
				System.out.println("`````````````````````````````````````````` shopid - "+shopid);
				HibernateUtility hbu = null;
				Session session =  null;
				Query query = null;
				 List list = null;
				 try {
					 hbu = HibernateUtility.getInstance();
					 session = hbu.getHibernateSession();
					 query = session.createQuery("from shopDetailsBean where shopId !='"+shopid+"'");
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
			
			public List getCompanyNames(HttpServletRequest request)
			{
				HttpSession usersession = request.getSession(true);
				String userid = (String)usersession.getAttribute("userid");
				String shopid = (String)usersession.getAttribute("shopid");
				
				HibernateUtility hbu = null;
				Session session =  null;
				Query query = null;
				// List list = null;
				 List<Stock> stockList = null;
				 
				 
				 try {
					 hbu = HibernateUtility.getInstance();
					 session = hbu.getHibernateSession();
					 query = session.createSQLQuery("select CompanyName, ProductName from stock_detail where fk_shop_id = '"+shopid+"' group by CompanyName");
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
			
			public List getSubCategoryName(HttpServletRequest request)
			{
				HttpSession usersession = request.getSession(true);
				String userid = (String)usersession.getAttribute("userid");
				String shopid = (String)usersession.getAttribute("shopid");
				
				HibernateUtility hbu=null;
				Session session=null;
				
				List<SubCategoryDetailsBean> itemlist=null;
				 List<Object[]> list = null;
				
				try
				{
						hbu = HibernateUtility.getInstance();
						session = hbu.getHibernateSession();
						//Query query=session.createQuery("select invoiceNo , toPay  from ProfarmaDetail  group by invoiceNo order by invoiceNo DESC");
						Query query=session.createSQLQuery("select s.pk_subcat_id,s.sub_cat_name,c.cat_name from sub_categories s LEFT Join categories c on c.pk_cat_id=s.fk_cat_id where s.fk_shop_id ='"+shopid+"' ");
					
						list = query.list();
						itemlist = new ArrayList<SubCategoryDetailsBean>(0);
						
				 for (Object[] objects : list) {
					 SubCategoryDetailsBean bean = new SubCategoryDetailsBean();
					
					bean.setSubcatId(Long.parseLong(objects[0].toString()));;
					bean.setSubcategoryName((String)objects[1]);
					bean.setCategoryName(((String)objects[2]));
					 
					itemlist.add(bean);
					}
				 }
				catch(RuntimeException  e)
				{
						
				}finally
				{if(session!=null){
					hbu.closeSession(session);	
				}
				}
				return itemlist;
			}
			
	
			///////////////category list////////////
			
public List getCatDetails(){
				
				HibernateUtility hbu=null;
				Session session=null;
				List<CategoryDetailsBean>catList=null;
				Long k = 0l; 
				try{
				hbu = HibernateUtility.getInstance();
				session = hbu.getHibernateSession();

				Query query=session.createSQLQuery("SELECT pk_cat_id,cat_name from categories");
				//Query query = session.createQuery("from PurchaseBill2");
				List<Object[]> list = query.list();


				catList= new ArrayList<CategoryDetailsBean>(0);


			for (Object[] o : list)
			{	
				CategoryDetailsBean p = new CategoryDetailsBean();
				k++;
				p.setCatId(Long.parseLong(o[0].toString()));
				p.setCategoryName(o[1].toString());
				p.setSrNo(k);
				
				catList.add(p);

			}}catch(RuntimeException e){	

			}
			finally{

			hbu.closeSession(session);	
			}
			return catList;
			}
	////////subcategory list//////////		
	
public List getsubCatDetails(){
	
	HibernateUtility hbu=null;
	Session session=null;
	List<SubCategoryDetailsBean>catList=null;
	Long k = 0l; 
	try{
	hbu = HibernateUtility.getInstance();
	session = hbu.getHibernateSession();

	Query query=session.createSQLQuery("SELECT c.cat_name,s.sub_cat_name,s.pk_subcat_id from categories c LEFT JOIN sub_categories s on c.pk_cat_id=s.fk_cat_id");
	
	List<Object[]> list = query.list();
    
     System.out.println("size------------"+list.size());
	 catList= new ArrayList<SubCategoryDetailsBean>(0);


 for(Object[] o : list)
{	
//	CategoryDetailsBean p = new CategoryDetailsBean();
	SubCategoryDetailsBean p = new SubCategoryDetailsBean();
	System.out.println("result - "+Arrays.toString(o));
	k++;
	p.setCategoryName(o[0].toString());
	if(o[1]==null)
	{
		
	p.setSubcategoryName("NA");
		
	}
	else
	{
		p.setSubcategoryName(o[1].toString());
	}
	//p.setSubCategoryName(o[1].toString());
    p.setSubcatId(Long.parseLong(o[2].toString()));
	p.setSrNo(k);
	catList.add(p);

}}
	catch(RuntimeException e){	

}
finally{

hbu.closeSession(session);	
}
return catList;
}
		
			
}
