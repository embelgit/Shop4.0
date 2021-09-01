package com.Fertilizer.dao;

import java.math.BigInteger;



import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.http.HttpRequest;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.jfree.util.Log;

import com.Fertilizer.bean.CustomerBean;
import com.Fertilizer.bean.ExpenditurePaymentDetail;
import com.Fertilizer.bean.GetEmployeeDetails;
import com.Fertilizer.bean.GetProductDetails;
import com.Fertilizer.bean.ProductDetailsForReports;
import com.Fertilizer.hibernate.BankPaymentBean;
import com.Fertilizer.hibernate.CategoryDetailsBean;
import com.Fertilizer.hibernate.CustomerDetailsBean;
import com.Fertilizer.hibernate.CustomerPaymentBean;
import com.Fertilizer.hibernate.EmployeePaymentBean;
import com.Fertilizer.hibernate.ExpenditurePaymentBean;
import com.Fertilizer.hibernate.MeasuringUnitsBean;
import com.Fertilizer.hibernate.PackingHibernate;
import com.Fertilizer.hibernate.PartnerTransactionBeanH;
import com.Fertilizer.hibernate.ProductDetailsBean;
import com.Fertilizer.hibernate.Stock;
import com.Fertilizer.hibernate.SubCategoryDetailsBean;
import com.Fertilizer.hibernate.SupplierDetailsBean;
import com.Fertilizer.hibernate.SupplierPaymentBean;
import com.Fertilizer.hibernate.TaxCreationBean;
import com.Fertilizer.hibernate.creditnotebean;
import com.Fertilizer.hibernate.productTransferHibernate;
import com.Fertilizer.utility.HibernateUtility;
import com.itextpdf.text.log.SysoLogger;


public class ProductDetailsDao {
/////Search list for buy and sale report///////////

public List prodReportList()
{
		HibernateUtility hbu=null;
		Session session=null;
		List<ProductDetailsBean > empList=null;
	try{	

		hbu = HibernateUtility.getInstance();
		session = hbu.getHibernateSession();

		Query query=session.createSQLQuery("Select p.pk_product_id, p.product_name, p.buy_price, p.sale_price, p.weight, p.mrp from product_details p where p.product_name=:productId");
		List<Object[]> list = query.list();
		
		empList= new ArrayList<ProductDetailsBean >(0);
	
		System.out.println("-------------------  size ------------------------------------  ::::  "+list.size());
		
	for (Object[] o : list) 
	{
		ProductDetailsBean reports = new ProductDetailsBean ();

		reports.setProductName(o[0].toString());
		reports.setManufacturingCompany(o[1].toString());
		reports.setBuyPrice(Double.parseDouble(o[2].toString()));
		reports.setSalePrice(Double.parseDouble(o[3].toString()));
		
		empList.add(reports);
	
	
	}
	}catch(RuntimeException e){	
	
		}
		finally{
	
		hbu.closeSession(session);	
		}
	return empList;
}

public List<ProductDetailsBean> getAllMainProdInfo(HttpServletRequest request)
{
	HttpSession usersession = request.getSession(true);
	String userid = (String)usersession.getAttribute("userid");
	String shopid = (String)usersession.getAttribute("shopid");

	HibernateUtility hbu = null;
	Session session = null;
	Query query = null;
	List<Object[]> list = null;
	List<ProductDetailsBean> itemList = null;
	
	hbu = HibernateUtility.getInstance();
	session = hbu.getHibernateSession();
	
	//query = session.createSQLQuery("SELECT p.pk_product_id, p.fk_cat_id, p.fk_subCat_id, c.cat_name, sc.sub_cat_name, p.product_name, p.weight from product_details p LEFT JOIN categories c ON p.fk_cat_id = c.pk_cat_id JOIN sub_categories sc ON p.fk_subCat_id = sc.pk_subcat_id GROUP BY p.product_name, c.cat_name, sc.sub_cat_name");
//	query = session.createSQLQuery("SELECT p.pk_product_id, p.fk_cat_id, p.fk_subCat_id, c.cat_name, sc.sub_cat_name, p.product_name, p.weight from product_details p LEFT JOIN categories c ON p.fk_cat_id = c.pk_cat_id JOIN sub_categories sc ON p.fk_subCat_id = sc.pk_subcat_id WHERE p.fk_shop_id = '"+shopid+"'");
	
//	query = session.createSQLQuery("SELECT p.productId, p.FkCatId, p.FkSubCatId, c.cat_name, sc.sub_cat_name, p.ProductName, p.Weight,p.packing_type from stock_detail p LEFT JOIN categories c ON p.FkCatId = c.pk_cat_id JOIN sub_categories sc ON p.FkSubCatId = sc.pk_subcat_id WHERE p.fk_shop_id = '"+shopid+"'");
	query = session.createSQLQuery("SELECT p.pk_product_id, p.fk_cat_id, p.fk_subCat_id, c.cat_name, sc.sub_cat_name, p.product_name, p.weight from product_details p LEFT JOIN categories c ON p.fk_cat_id = c.pk_cat_id JOIN sub_categories sc ON p.fk_subCat_id = sc.pk_subcat_id WHERE p.fk_shop_id = '"+shopid+"'");
	
	list = query.list();
	
	System.out.println("Item List1111111111111111111111111" + list);

	itemList = new ArrayList<ProductDetailsBean>(0);
	for (Object[] o : list) {

		ProductDetailsBean bean = new ProductDetailsBean();
		
		bean.setProdctId(Long.parseLong(o[0].toString()));
		bean.setFk_cat_id(Long.parseLong(o[1].toString()));
		bean.setFk_subCat_id(Long.parseLong(o[2].toString()));
		bean.setCatname(o[3].toString());
		bean.setSubcatname(o[4].toString());
		bean.setProductName(o[5].toString());
		bean.setWeight(Double.parseDouble(o[6].toString()));
		bean.setPack_type("unpacked");
		//System.out.println("Packing Weight =======>"+bean.getWeight());
			
		itemList.add(bean) ;

	}

	hbu.closeSession(session);
	return itemList;
}	

//
public List<ProductDetailsBean> getAllMainProdInfoforpack(HttpServletRequest request)
{
	HttpSession usersession = request.getSession(true);
	String userid = (String)usersession.getAttribute("userid");
	String shopid = (String)usersession.getAttribute("shopid");
	String pack = "unpacked";
	HibernateUtility hbu = null;
	Session session = null;
	Query query = null;
	List<Object[]> list = null;
	List<ProductDetailsBean> itemList = null;
	
	hbu = HibernateUtility.getInstance();
	session = hbu.getHibernateSession();
	
	//query = session.createSQLQuery("SELECT p.pk_product_id, p.fk_cat_id, p.fk_subCat_id, c.cat_name, sc.sub_cat_name, p.product_name, p.weight from product_details p LEFT JOIN categories c ON p.fk_cat_id = c.pk_cat_id JOIN sub_categories sc ON p.fk_subCat_id = sc.pk_subcat_id GROUP BY p.product_name, c.cat_name, sc.sub_cat_name");
//	query = session.createSQLQuery("SELECT p.pk_product_id, p.fk_cat_id, p.fk_subCat_id, c.cat_name, sc.sub_cat_name, p.product_name, p.weight from product_details p LEFT JOIN categories c ON p.fk_cat_id = c.pk_cat_id JOIN sub_categories sc ON p.fk_subCat_id = sc.pk_subcat_id WHERE p.fk_shop_id = '"+shopid+"'");
	
	query = session.createSQLQuery("SELECT p.productId, p.FkCatId, p.FkSubCatId, c.cat_name, sc.sub_cat_name, p.ProductName, p.Weight,p.packing_type from stock_detail p LEFT JOIN categories c ON p.FkCatId = c.pk_cat_id JOIN sub_categories sc ON p.FkSubCatId = sc.pk_subcat_id WHERE p.packing_type = '"+pack+"' AND p.fk_shop_id = '"+shopid+"'");
	list = query.list();
	
	System.out.println("Item List1111111111111111111111111" + list);

	itemList = new ArrayList<ProductDetailsBean>(0);
	for (Object[] o : list) {

		ProductDetailsBean bean = new ProductDetailsBean();
		
		bean.setProdctId(Long.parseLong(o[0].toString()));
		bean.setFk_cat_id(Long.parseLong(o[1].toString()));
		bean.setFk_subCat_id(Long.parseLong(o[2].toString()));
		bean.setCatname(o[3].toString());
		bean.setSubcatname(o[4].toString());
		bean.setProductName(o[5].toString());
		bean.setWeight(Double.parseDouble(o[6].toString()));
		bean.setPack_type(o[7].toString());
		//System.out.println("Packing Weight =======>"+bean.getWeight());
			
		itemList.add(bean) ;

	}

	hbu.closeSession(session);
	return itemList;
}	

	public void ProductDetailsDao (ProductDetailsBean pdb) {

			System.out.println("In DAO");
			
			HibernateUtility hbu=null;
			Session session = null;
			Transaction transaction = null;
			
			try{
			 hbu = HibernateUtility.getInstance();
			 session = hbu.getHibernateSession();
			 transaction = session.beginTransaction();
		
			 System.out.println("Tx started");
			 
			pdb.setStatus(1l);
			session.save(pdb);
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

	
	public List getAllProductBySuppliers(String supplierId) {
		
		HibernateUtility hbu = null ;
    	 Session session = null;
    	 List list  = null;
    	 try {
    		 hbu = HibernateUtility.getInstance();
    		 session = hbu.getHibernateSession();
 			Query query = session.createSQLQuery("select p.product_name,p.insert_date from product_details p where p.fk_supplier_id="+supplierId);
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


	public List getProductDetails(String productId) {
		HibernateUtility hbu=null;
		Session session=null;
		List list=null;
			
			try{
			 hbu=HibernateUtility.getInstance();
			 session=hbu.getHibernateSession();

			Query query=session.createSQLQuery("Select p.pk_product_id, p.product_name, p.buy_price, p.sale_price, p.weight, p.mrp from product_details p where p.product_name=:productId");
			 
			 System.out.println(productId+"product id in goods receive dao");
			 query.setParameter("productId", productId);
			 list = query.list();
			 
			System.out.println(list.size()+"*************");
			}catch(RuntimeException e){
				
			Log.error("Error in getProductDetails",e);
		}finally{
				if(session!=null){
					
					hbu.closeSession(session);
				}
				
			}
		
		return list;
	}

	public List getProductDetailsforbill(String productId) {
		HibernateUtility hbu=null;
		Session session=null;
		List list=null;
			
			try{
			 hbu=HibernateUtility.getInstance();
			 session=hbu.getHibernateSession();

			//Query query=session.createSQLQuery("Select p.pk_product_id, p.product_name, p.buy_price, p.sale_price, p.weight from product_details p where p.product_name=:productId");
			 
			 Query query=session.createSQLQuery("SELECT p.pk_product_id , p.product_name ,p.buy_price ,p.sale_price ,p.weight ,g.batch_no ,DATE(g.expiry_date),p.tax_percentage FROM goods_receive g LEFT JOIN product_details p ON g.fk_product_id = p.pk_product_id WHERE p.pk_product_id =:productId");
			 
			 query.setParameter("productId", productId);
			 list = query.list();
			 
			System.out.println(list.size()+"*************");
			}catch(RuntimeException e){
				
			Log.error("Error in getProductDetails",e);
		}finally{
				if(session!=null){
					
					hbu.closeSession(session);
				}
				
			}
		
		return list;
	}
	
	
public void deleteProduct(String delProName) {
		
		HibernateUtility hbu = null ;
		 Session session = null;
		 List list  = null;
		 try {
			 hbu = HibernateUtility.getInstance();
			 session = hbu.getHibernateSession();
				Query query = session.createSQLQuery("delete from product_details where pk_product_id="+delProName);
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
	public List getProductDetailsByBatchNo(String batchNo) {
		HibernateUtility hbu=null;
		Session session=null;
		List list=null;
			
			try{
			 hbu=HibernateUtility.getInstance();
			 session=hbu.getHibernateSession();

			//Query query=session.createSQLQuery("Select p.pk_product_id, p.product_name, p.buy_price, p.sale_price, p.weight from product_details p where p.product_name=:productId");
			 
			// Query query=session.createSQLQuery("SELECT p.pk_product_id , p.product_name ,p.buy_price ,p.sale_price ,p.weight ,g.batch_no ,DATE(g.expiry_date) FROM goods_receive g LEFT JOIN product_details p ON g.fk_product_id = p.pk_product_id WHERE p.pk_product_id =:productId");
			 Query query = session.createSQLQuery("select p.pk_product_id , p.product_name ,p.buy_price , p.sale_price , p.weight ,g.batch_no ,g.expiry_date, g.tax_percentage from goods_receive g LEFT JOIN product_details p ON g.fk_product_id = p.pk_product_id WHERE g.batch_no =:batchNo group by g.batch_no");
			 query.setParameter("batchNo", batchNo);
			 list = query.list();
			 
			System.out.println(list.size()+"*************");
			}catch(RuntimeException e){
				
			Log.error("Error in getProductDetails",e);
		}finally{
				if(session!=null){
					
					hbu.closeSession(session);
				}
				
			}
		
		return list;
	}
	
	
	
	
	public List getProductDetailsforseedANdPestisidebill(String productId) {
		HibernateUtility hbu=null;
		Session session=null;
		List list=null;
			
			try{
			 hbu=HibernateUtility.getInstance();
			 session=hbu.getHibernateSession();

			 
			 Query query=session.createSQLQuery("SELECT i.batchNo ,p.pk_product_id , i.stock from product_details p LEFT JOIN item_stockforpestiandseed i ON p.pk_product_id = i.fk_product_id WHERE p.pk_product_id =:productId AND i.stock>0");
			 
			 query.setParameter("productId", productId);
			 list = query.list();
			 
			System.out.println(list.size()+"*************");
			}catch(RuntimeException e){
				
			Log.error("Error in getProductDetails",e);
		}finally{
				if(session!=null){
					
					hbu.closeSession(session);
				}
				
			}
		
		return list;
	}
	
	public List getAllProductBySCategoryAndBySuppliers(String category) {
		
		HibernateUtility hbu = null ;
    	 Session session = null;
    	 List list  = null;
    	 try {
    		 hbu = HibernateUtility.getInstance();
    		 session = hbu.getHibernateSession();
/* 			Query query = session.createSQLQuery("select p.product_name,p.insert_date from product_details p where p.fk_supplier_id="+supplierId );*/
 			System.out.println("category === == ="+category);
 			Query query = session.createSQLQuery("select p.product_name,p.insert_date,p.manufacturing_company,p.weight, s.unit_name from product_details p RIGHT JOIN sold_units s ON p.fk_unit_id=s.pk_unit_id where  p.fk_cat_id="+category);
 			
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
	//
	public List getAllPono(String category) {
		
		HibernateUtility hbu = null ;
    	 Session session = null;
    	 List list  = null;
    	 try {
    		 hbu = HibernateUtility.getInstance();
    		 session = hbu.getHibernateSession();
/* 			Query query = session.createSQLQuery("select p.product_name,p.insert_date from product_details p where p.fk_supplier_id="+supplierId );*/
 			System.out.println("category === == ="+category);
 			Query query = session.createSQLQuery("SELECT pk_adv_book_id,booking_no,supplier_name from advance_booking WHERE fk_supplier_id='"+category+"' GROUP BY booking_no");
 			
 			list = query.list();
 			System.out.println("query size -  "+query.list().size());
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
	
	
	
	public List getAllProductForBilling()
	{
		HibernateUtility hbu = null;
		Session session =  null;
		Query query = null;
		 List list = null;
	 try {
			 hbu = HibernateUtility.getInstance();
			 session = hbu.getHibernateSession();
			 Long categoryId = 1l;
			 query = session.createQuery("from ProductDetailsBean where fk_cat_id =:categoryId and status="+2);
			 query.setParameter("categoryId", categoryId);
			 list = query.list(); 
		} catch (Exception e) {
			Log.error("Error in getAllProductForBilling", e);
		}
		 
		 finally
		 {
			 if (session!=null) {
				hbu.closeSession(session);
			}
		 }
				return list;
		
	}
	
	public List getAllProductForEdit(HttpServletRequest request)
	{
		HttpSession usersession = request.getSession(true);
		String userid = (String)usersession.getAttribute("userid");
		String shopid = (String)usersession.getAttribute("shopid");
		
		HibernateUtility hbu = null;
		Session session =  null;
		Query query = null;
		List list = null;
		 
	    try
	    {
			 hbu = HibernateUtility.getInstance();
			 session = hbu.getHibernateSession();
			 Long categoryId = 1l;
			 query = session.createQuery("from ProductDetailsBean where fk_shop_id ='"+shopid+"'");
			// query.setParameter("categoryId", categoryId);
			 list = query.list(); 
		} catch (Exception e) {
			Log.error("Error in getAllProductForBilling", e);
		}
		 
		 finally
		 {
			 if (session!=null) {
				hbu.closeSession(session);
			}
		 }
				return list;
		
	}
	
	public List getAllProductForBillingforPestiSideAndSeed()
	{
		HibernateUtility hbu = null;
		Session session =  null;
		Query query = null;
		 List list = null;
	 try {
			 hbu = HibernateUtility.getInstance();
			 session = hbu.getHibernateSession();
			 Long categoryId = 2l;
			 Long categoryId2 = 3l;
			 query = session.createQuery("from ProductDetailsBean where fk_cat_id =:categoryId OR fk_cat_id =:categoryId2 and status="+2);
			 query.setParameter("categoryId", categoryId);
			 query.setParameter("categoryId2", categoryId2);
			 list = query.list(); 
		} catch (Exception e) {
			Log.error("Error in getAllProductForBilling", e);
		}
		 
		 finally
		 {
			 if (session!=null) {
				hbu.closeSession(session);
			}
		 }
				return list;
		
	}
	
	
	public List getProductDetailsForReport(){


	    HibernateUtility hbu=null;
	    Session session=null;
	    List<ProductDetailsForReports> productList=null;
	    try
	    {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query=session.createSQLQuery("select p.product_name, p.manufacturing_company, g.buy_price, g.sale_price FROM product_details p RIGHT JOIN goods_receive g ON p.pk_product_id = g.fk_product_id;");
			List<Object[]> list = query.list();
			productList= new ArrayList<ProductDetailsForReports>(0);	
		for (Object[] object : list) {
			System.out.println(Arrays.toString(object));
			
			ProductDetailsForReports reports = new ProductDetailsForReports();
			
			reports.setProductName(object[0].toString());
			reports.setManufacturingCompany(object[1].toString());
			reports.setBuyPrice(Double.parseDouble(object[2].toString()));
			reports.setSalePrice(Double.parseDouble(object[3].toString()));
			
			
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


	public List<ProductDetailsForReports> getProductDetailForReportAsPerCat(String cat) 
	{
		
		HibernateUtility hbu=null;
		Session session=null;
		List<ProductDetailsForReports> product1List = null;
		try
		{
				hbu = HibernateUtility.getInstance();
		 session = hbu.getHibernateSession();
		 Query query = session.createSQLQuery("select p.product_name, p.manufacturing_company, g.buy_price, g.sale_price FROM product_details p RIGHT JOIN goods_receive g ON p.pk_product_id = g.fk_product_id WHERE g.fkCategoryId ="+cat);
			/*query.setParameter("category", cat);*/
			List<Object[]> list = query.list();
			product1List = new ArrayList<ProductDetailsForReports>(0);
			
			
			for (Object[] object : list) {
				
				ProductDetailsForReports reports1 = new ProductDetailsForReports();
					
				reports1.setProductName(object[0].toString());
				reports1.setManufacturingCompany(object[1].toString());
				reports1.setBuyPrice(Double.parseDouble(object[2].toString()));
				reports1.setSalePrice(Double.parseDouble(object[3].toString()));
				
				
				product1List.add(reports1); 
		
			}}
		catch(Exception e)
		{
			e.printStackTrace();	
		}
		return product1List;	
		
	
		
	}
	
	
	
public List getAllProductByGodown(String godownId) {
		
		HibernateUtility hbu = null ;
    	 Session session = null;
    	 List list  = null;
    	 try {
    		 hbu = HibernateUtility.getInstance();
    		 session = hbu.getHibernateSession();
/* 			Query query = session.createSQLQuery("select p.product_name,p.insert_date from product_details p where p.fk_supplier_id="+supplierId );*/
 			
 			Query query = session.createSQLQuery("select p.product_name,p.insert_date from product_details p left join goods_receive g ON p.pk_product_id = g.fk_product_id   where  g.fkgodownid= "+godownId);
 			
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
	
public List getProductDetailsGodowm(String productId) {
	HibernateUtility hbu=null;
	Session session=null;
	List list=null;
		
		try{
		 hbu=HibernateUtility.getInstance();
		 session=hbu.getHibernateSession();

		Query query=session.createSQLQuery("Select p.pk_product_id, p.product_name, p.buy_price, p.sale_price, p.weight ,g.batch_no ,g.expiry_date from product_details p left join goods_receive g ON g.fk_product_id=p.pk_product_id where p.product_name=:productId");
		 
		 
		 query.setParameter("productId", productId);
		 list = query.list();
		 
		System.out.println(list.size()+"*************");
		}catch(RuntimeException e){
			
		Log.error("Error in getProductDetails",e);
	}finally{
			if(session!=null){
				
				hbu.closeSession(session);
			}
			
		}
	
	return list;
}


public List getProductDetailsforbillAsPerBarcode(String barcodeNum) {

	HibernateUtility hbu=null;
	Session session=null;
	List list=null;
		
		try{
		 hbu=HibernateUtility.getInstance();
		 session=hbu.getHibernateSession();

		//Query query=session.createSQLQuery("Select p.pk_product_id, p.product_name, p.buy_price, p.sale_price, p.weight from product_details p where p.product_name=:productId");
		 
		 Query query=session.createSQLQuery("SELECT p.pk_product_id , p.product_name ,p.buy_price ,p.sale_price ,p.weight ,g.batch_no ,DATE(g.expiry_date) FROM product_details p  LEFT JOIN barcode_details b ON b.fk_product_id = p.pk_product_id LEFT JOIN goods_receive g ON g.fk_product_id=p.pk_product_id WHERE b.barcode_number =:barcodeNum");
		 
		 query.setParameter("barcodeNum", barcodeNum);
		 list = query.list();
		 
		System.out.println(list.size()+"*************");
		}catch(RuntimeException e){
			
		Log.error("Error in getProductDetailsforbillAsPerBarcode",e);
	}finally{
			if(session!=null){
				
				hbu.closeSession(session);
			}
			
		}
	
	return list;

}


public List getProductDetailsforseedANdPestisidebillAsPerBarcodeNum(
		String barcode) {

	HibernateUtility hbu=null;
	Session session=null;
	List list=null;
		
		try{
		 hbu=HibernateUtility.getInstance();
		 session=hbu.getHibernateSession();

		 
		 Query query=session.createSQLQuery("SELECT i.batchNo ,p.pk_product_id , i.stock from product_details p LEFT JOIN item_stockforpestiandseed i ON p.pk_product_id = i.fk_product_id WHERE p.pk_product_id =:productId");
		 
		 query.setParameter("barcode", barcode);
		 list = query.list();
		 
		System.out.println(list.size()+"*************");
		}catch(RuntimeException e){
			
		Log.error("Error in getProductDetails",e);
	}finally{
			if(session!=null){
				
				hbu.closeSession(session);
			}
			
		}
	
	return list;

}


public List getAllEmployeeDetailsForEdit(Long productID2, HttpServletRequest request) 
{
	HttpSession usersession = request.getSession(true);
	String userid = (String)usersession.getAttribute("userid");
	String shopid = (String)usersession.getAttribute("shopid");
		
	System.out.println("into dao product : "+productID2);
	HibernateUtility hbu = null;
	Session session =  null;
	Query query = null;
	 List list = null;
	 try {
		 hbu = HibernateUtility.getInstance();
		 session = hbu.getHibernateSession();
		 query = session.createSQLQuery("SELECT p.manufacturing_company, p.tax_percentage, t.tax_name, s.unit_name, p.buy_price, p.mrp, p.sale_price, p.credit_customer_sale_price, p.weight, p.hsn, p.sale_price_ex_tax, p.product_name, p.description FROM product_details p LEFT JOIN sold_units s on s.pk_unit_id =p.fk_unit_id LEFT JOIN tax_details t on t.pk_tax_id = p.fk_tax_id WHERE p.pk_product_id = '"+productID2+"' AND p.fk_shop_id = '"+shopid+"'");
		 list = query.list(); 
	} catch (RuntimeException e)
	{
		e.printStackTrace();
	}
	 
	 finally
	 {
		 if (session!=null) {
			hbu.closeSession(session);
		}
	 }
	 System.out.println("out of dao - return product List : "+list);
			return list;
}
	
public List getProductList(){
	
	HibernateUtility hbu=null;
	Session session=null;
	List<GetProductDetails> productList=null;
try{	

	hbu = HibernateUtility.getInstance();
	session = hbu.getHibernateSession();

	//Query query=session.createSQLQuery("SELECT p.product_name, c.cat_name , p.manufacturing_company, p.tax_percentage, t.tax_name, s.unit_name, p.buy_price, p.mrp, p.sale_price, p.weight FROM product_details p LEFT JOIN sold_units s on s.pk_unit_id =p.fk_unit_id LEFT JOIN tax_details t on t.pk_tax_id = p.fk_tax_id LEFT JOIN categories c on c.pk_cat_id = p.fk_cat_id;");
	Query query=session.createSQLQuery("SELECT p.product_name, c.cat_name ,sc.sub_cat_name, p.manufacturing_company, p.tax_percentage, t.tax_name, s.unit_name, p.buy_price, p.description, p.sale_price, p.weight, p.sgst, p.cgst,p.pk_product_id FROM product_details p LEFT JOIN sold_units s on s.pk_unit_id =p.fk_unit_id LEFT JOIN tax_details t on t.pk_tax_id = p.fk_tax_id LEFT JOIN categories c on c.pk_cat_id = p.fk_cat_id LEFT JOIN sub_categories sc on sc.pk_subcat_id = p.fk_subCat_id;");
	//Query query = session.createQuery("from PurchaseBill2");
	List<Object[]> list = query.list();


	productList= new ArrayList<GetProductDetails>(0);
int sr=0;

for (Object[] object : list) {	
	GetProductDetails p = new GetProductDetails();
	sr++;
	p.setSrno(sr);
	p.setProduct(object[0].toString());
	p.setCat(object[1].toString());
	p.setSubCatName(object[2].toString());
	p.setManufacturer(object[3].toString());
	p.setTaxPercentage(Double.parseDouble(object[4].toString()));
	p.setTaxType(object[5].toString());
	
//	if(object[6].toString().equals("pcs")) {
//		p.setUnitName("Box/pcs");
//	}else {
		p.setUnitName(object[6].toString());
//	}
	p.setBuyPrice(Double.parseDouble(object[7].toString()));
	p.setDescription(object[8].toString());
    p.setSalePrice(Double.parseDouble(object[9].toString())); 
    p.setWeight(Double.parseDouble(object[10].toString()));
    p.setSgst(Double.parseDouble(object[11].toString()));
    p.setCgst(Double.parseDouble(object[12].toString()));
    p.setPkid(Long.parseLong(object[13].toString()));
	
	productList.add(p);

}}catch(RuntimeException e){	

}
finally{

hbu.closeSession(session);	
}
return productList;
}
//


public List getsupppaymentList(){
	
	HibernateUtility hbu=null;
	Session session=null;
	List<SupplierPaymentBean> productList=null;
try{	

	hbu = HibernateUtility.getInstance();
	session = hbu.getHibernateSession();

	//Query query=session.createSQLQuery("SELECT p.product_name, c.cat_name , p.manufacturing_company, p.tax_percentage, t.tax_name, s.unit_name, p.buy_price, p.mrp, p.sale_price, p.weight FROM product_details p LEFT JOIN sold_units s on s.pk_unit_id =p.fk_unit_id LEFT JOIN tax_details t on t.pk_tax_id = p.fk_tax_id LEFT JOIN categories c on c.pk_cat_id = p.fk_cat_id;");
	Query query=session.createSQLQuery("select pk_supplier_payment_id,bill_no,supplierName,total_amount,payment,balance,insert_date,shop_name from supplier_payment");
	//Query query = session.createQuery("from PurchaseBill2");
	List<Object[]> list = query.list();


	productList= new ArrayList<SupplierPaymentBean>(0);
int sr=0;

for (Object[] object : list) {	
	SupplierPaymentBean p = new SupplierPaymentBean();
	sr++;
	p.setPkSupPaymentId(Long.parseLong((object[0].toString())));
	p.setBillNo(object[1].toString());
	p.setSupplierName(object[2].toString());
	p.setTotalAmount(Double.parseDouble(object[3].toString()));
	p.setCredit(Double.parseDouble(object[4].toString()));
	p.setBalance(Double.parseDouble(object[5].toString()));
	p.setInsertDate((Date)object[6]);
	p.setShopName(object[7].toString());
	
	productList.add(p);

}}catch(RuntimeException e){	

}
finally{

hbu.closeSession(session);	
}
return productList;
}

//
public List getcustpaymentList(){
	
	HibernateUtility hbu=null;
	Session session=null;
	List<CustomerPaymentBean> productList=null;
try{	

	hbu = HibernateUtility.getInstance();
	session = hbu.getHibernateSession();

	//Query query=session.createSQLQuery("SELECT p.product_name, c.cat_name , p.manufacturing_company, p.tax_percentage, t.tax_name, s.unit_name, p.buy_price, p.mrp, p.sale_price, p.weight FROM product_details p LEFT JOIN sold_units s on s.pk_unit_id =p.fk_unit_id LEFT JOIN tax_details t on t.pk_tax_id = p.fk_tax_id LEFT JOIN categories c on c.pk_cat_id = p.fk_cat_id;");
	Query query=session.createSQLQuery("select pk_credit_customer_id,bill_no,customername,total_amount,payment,balance,insert_date,shop_name from credit_customer_payment WHERE payment > 0");
	//Query query = session.createQuery("from PurchaseBill2");
	List<Object[]> list = query.list();


	productList= new ArrayList<CustomerPaymentBean>(0);
int sr=0;

for (Object[] object : list) {	
	CustomerPaymentBean p = new CustomerPaymentBean();
	sr++;
System.out.println("rslt - "+Arrays.toString(object));
	p.setPkCustPaymentId(Long.parseLong((object[0].toString())));
	p.setBillNo(Long.parseLong(object[1].toString()));
	System.out.println("bills set - "+p.getBillNo());
	p.setCustomername(object[2].toString());
	p.setTotalAmount(Double.parseDouble(object[3].toString()));
	p.setCredit(Double.parseDouble(object[4].toString()));
	p.setBalance(Double.parseDouble(object[5].toString()));
	p.setInsertDate((Date)object[6]);
	p.setShopName(object[7].toString());
	
	productList.add(p);

}}catch(RuntimeException e){	

}
finally{

hbu.closeSession(session);	
}
return productList;
}
//

public List getemppaymentList(){
	
	HibernateUtility hbu=null;
	Session session=null;
	List<EmployeePaymentBean> productList=null;
try{	

	hbu = HibernateUtility.getInstance();
	session = hbu.getHibernateSession();

	//Query query=session.createSQLQuery("SELECT p.product_name, c.cat_name , p.manufacturing_company, p.tax_percentage, t.tax_name, s.unit_name, p.buy_price, p.mrp, p.sale_price, p.weight FROM product_details p LEFT JOIN sold_units s on s.pk_unit_id =p.fk_unit_id LEFT JOIN tax_details t on t.pk_tax_id = p.fk_tax_id LEFT JOIN categories c on c.pk_cat_id = p.fk_cat_id;");
	Query query=session.createSQLQuery("SELECT pk_employee_payment_id,employeeName,reason,paymentType,payment_mode,payment,insert_date,shop_name from employee_payment");
	//Query query = session.createQuery("from PurchaseBill2");
	List<Object[]> list = query.list();


	productList= new ArrayList<EmployeePaymentBean>(0);
int sr=0;

for (Object[] object : list) {	
	EmployeePaymentBean p = new EmployeePaymentBean();
	sr++;
System.out.println("rslt - "+Arrays.toString(object));
	p.setPkEmployeePaymentId(Long.parseLong((object[0].toString())));
	p.setEmployeeName((object[1].toString()));
//	System.out.println("bills set - "+p.getBillNo());
	p.setReason(object[2].toString());
	p.setPaymentType((object[3].toString()));
	p.setPaymentMode((object[4].toString()));

	p.setCredit(Double.parseDouble(object[5].toString()));
	p.setInsertDate((Date)object[6]);
	p.setShopName(object[7].toString());
	
	productList.add(p);

}}catch(RuntimeException e){	

}
finally{

hbu.closeSession(session);	
}
return productList;
}
//
public List getexpenpaymentList(){
	
	HibernateUtility hbu=null;
	Session session=null;
	List<ExpenditurePaymentBean> productList=null;
try{	

	hbu = HibernateUtility.getInstance();
	session = hbu.getHibernateSession();

	//Query query=session.createSQLQuery("SELECT p.product_name, c.cat_name , p.manufacturing_company, p.tax_percentage, t.tax_name, s.unit_name, p.buy_price, p.mrp, p.sale_price, p.weight FROM product_details p LEFT JOIN sold_units s on s.pk_unit_id =p.fk_unit_id LEFT JOIN tax_details t on t.pk_tax_id = p.fk_tax_id LEFT JOIN categories c on c.pk_cat_id = p.fk_cat_id;");
	Query query=session.createSQLQuery("SELECT pk_expenditure_payment_id,expense_type,accountant_name,payment_mode,total_amount, insert_date,shop_name from expenditure_payment");
	//Query query = session.createQuery("from PurchaseBill2");
	List<Object[]> list = query.list();


	productList= new ArrayList<ExpenditurePaymentBean>(0);
int sr=0;

for (Object[] object : list) {	
	ExpenditurePaymentBean p = new ExpenditurePaymentBean();
	sr++;
System.out.println("rslt - "+Arrays.toString(object));
	p.setPkExpPaymentId(Long.parseLong((object[0].toString())));
	p.setExpenseType((object[1].toString()));
//	System.out.println("bills set - "+p.getBillNo());
	p.setAccountantName(object[2].toString());
	p.setPaymentMode((object[3].toString()));

	p.setTotalAmount(Double.parseDouble(object[4].toString()));
	p.setInsertDate((Date)object[5]);
	p.setShopName(object[6].toString());
	
	productList.add(p);

}}catch(RuntimeException e){	

}
finally{

hbu.closeSession(session);	
}
return productList;
}
//

public List getbankpaymentList(){
	
	HibernateUtility hbu=null;
	Session session=null;
	List<BankPaymentBean> productList=null;
try{	

	hbu = HibernateUtility.getInstance();
	session = hbu.getHibernateSession();

	//Query query=session.createSQLQuery("SELECT p.product_name, c.cat_name , p.manufacturing_company, p.tax_percentage, t.tax_name, s.unit_name, p.buy_price, p.mrp, p.sale_price, p.weight FROM product_details p LEFT JOIN sold_units s on s.pk_unit_id =p.fk_unit_id LEFT JOIN tax_details t on t.pk_tax_id = p.fk_tax_id LEFT JOIN categories c on c.pk_cat_id = p.fk_cat_id;");
	Query query=session.createSQLQuery("select pk_bank_payment_id,bank_name,account_number,accountant_name,payment_mode,credit_amt,debit_amt,contact_number,insert_date,shop_name from bank_payment");
	//Query query = session.createQuery("from PurchaseBill2");
	List<Object[]> list = query.list();


	productList= new ArrayList<BankPaymentBean>(0);
int sr=0;

for (Object[] object : list) {	
	BankPaymentBean p = new BankPaymentBean();
	sr++;
System.out.println("rslt - "+Arrays.toString(object));
	p.setPkBankPaymentId(Long.parseLong((object[0].toString())));
	p.setBankName((object[1].toString()));
//	System.out.println("bills set - "+p.getBillNo());
	p.setAccountNumber(Long.parseLong(object[2].toString()));
	p.setAccountantName((object[3].toString()));
	p.setPaymentMode((object[4].toString()));

	p.setCreditAmt(Double.parseDouble(object[5].toString()));
	p.setDebitAmt(Double.parseDouble(object[6].toString()));
	p.setContactNumber(Long.parseLong(object[7].toString()));
	p.setInsertDate((Date)object[8]);
	p.setShopName(object[9].toString());
	
	productList.add(p);

}}catch(RuntimeException e){	

}
finally{

hbu.closeSession(session);	
}
return productList;
}
//

public List getcreditpaymentList(){
	
	HibernateUtility hbu=null;
	Session session=null;
	List<creditnotebean> productList=null;
try{	

	hbu = HibernateUtility.getInstance();
	session = hbu.getHibernateSession();

	//Query query=session.createSQLQuery("SELECT p.product_name, c.cat_name , p.manufacturing_company, p.tax_percentage, t.tax_name, s.unit_name, p.buy_price, p.mrp, p.sale_price, p.weight FROM product_details p LEFT JOIN sold_units s on s.pk_unit_id =p.fk_unit_id LEFT JOIN tax_details t on t.pk_tax_id = p.fk_tax_id LEFT JOIN categories c on c.pk_cat_id = p.fk_cat_id;");
	Query query=session.createSQLQuery("select pk_creditnote_id,party_name,payment_mode,amount,insert_date,shop_name from creditnotegeneration");
	//Query query = session.createQuery("from PurchaseBill2");
	List<Object[]> list = query.list();


	productList= new ArrayList<creditnotebean>(0);
int sr=0;

for (Object[] object : list) {	
	creditnotebean p = new creditnotebean();
	sr++;
System.out.println("rslt - "+Arrays.toString(object));
	p.setPk_creditnote_id(Long.parseLong((object[0].toString())));
	p.setPartyname((object[1].toString()));
	p.setPaymentMode((object[2].toString()));
	p.setAmount(Double.parseDouble(object[3].toString()));
	p.setInsertDate((Date)object[4]);
	p.setShopName(object[5].toString());
	
	productList.add(p);

}}catch(RuntimeException e){	

}
finally{

hbu.closeSession(session);	
}
return productList;
}

//
public List getpartpaymentList(){
	
	HibernateUtility hbu=null;
	Session session=null;
	List<PartnerTransactionBeanH> productList=null;
try{	

	hbu = HibernateUtility.getInstance();
	session = hbu.getHibernateSession();

	//Query query=session.createSQLQuery("SELECT p.product_name, c.cat_name , p.manufacturing_company, p.tax_percentage, t.tax_name, s.unit_name, p.buy_price, p.mrp, p.sale_price, p.weight FROM product_details p LEFT JOIN sold_units s on s.pk_unit_id =p.fk_unit_id LEFT JOIN tax_details t on t.pk_tax_id = p.fk_tax_id LEFT JOIN categories c on c.pk_cat_id = p.fk_cat_id;");
	Query query=session.createSQLQuery("select pk_partner_Transactions_id,accountant_name,payment_mode,total_amount,insert_date,shop_name,credit,debit,partnerName from partnertransactions");
	//Query query = session.createQuery("from PurchaseBill2");
	List<Object[]> list = query.list();


	productList= new ArrayList<PartnerTransactionBeanH>(0);
int sr=0;

for (Object[] object : list) {	
	PartnerTransactionBeanH p = new PartnerTransactionBeanH();
	sr++;
System.out.println("rslt - "+Arrays.toString(object));
	p.setPk_partner_Transactions_id(Long.parseLong((object[0].toString())));
	p.setAccountantName(object[1].toString());
	p.setPaymentMode((object[2].toString()));

	p.setTotalAmount(Double.parseDouble(object[3].toString()));
	p.setInsertDatePT((Date)object[4]);
	p.setShopName(object[5].toString());
	p.setCreditPT(Double.parseDouble(object[6].toString()));
	p.setDebitPT(Double.parseDouble(object[7].toString()));
	p.setPartnerName(object[8].toString());
	productList.add(p);

}}catch(RuntimeException e){	

}
finally{

hbu.closeSession(session);	
}
return productList;
}


public List getPackingList(){
	
	HibernateUtility hbu=null;
	Session session=null;
	List<PackingHibernate> productList=null;
try{	

	hbu = HibernateUtility.getInstance();
	session = hbu.getHibernateSession();

	//Query query=session.createSQLQuery("SELECT p.product_name, c.cat_name , p.manufacturing_company, p.tax_percentage, t.tax_name, s.unit_name, p.buy_price, p.mrp, p.sale_price, p.weight FROM product_details p LEFT JOIN sold_units s on s.pk_unit_id =p.fk_unit_id LEFT JOIN tax_details t on t.pk_tax_id = p.fk_tax_id LEFT JOIN categories c on c.pk_cat_id = p.fk_cat_id;");
	Query query=session.createSQLQuery("select pk_pack_id,ProductName,Weight,unit,Quantity from packing");
	//Query query = session.createQuery("from PurchaseBill2");
	List<Object[]> list = query.list();


	productList= new ArrayList<PackingHibernate>(0);
int sr=0;

for (Object[] object : list) {	
	PackingHibernate p = new PackingHibernate();
	sr++;
	p.setSr(sr);
	p.setPkpaackid(Long.parseLong(object[0].toString()));
	p.setProductName(object[1].toString());
	p.setWeight(Double.parseDouble(object[2].toString()));
	p.setUnit(object[3].toString());
	p.setQuantity(Double.parseDouble(object[4].toString()));
	
	
	productList.add(p);

}}catch(RuntimeException e){	

}
finally{

hbu.closeSession(session);	
}
return productList;
}

//
public List getProducttxList(){
	
	HibernateUtility hbu=null;
	Session session=null;
	List<productTransferHibernate> productList=null;
try{	

	hbu = HibernateUtility.getInstance();
	session = hbu.getHibernateSession();

	//Query query=session.createSQLQuery("SELECT p.product_name, c.cat_name , p.manufacturing_company, p.tax_percentage, t.tax_name, s.unit_name, p.buy_price, p.mrp, p.sale_price, p.weight FROM product_details p LEFT JOIN sold_units s on s.pk_unit_id =p.fk_unit_id LEFT JOIN tax_details t on t.pk_tax_id = p.fk_tax_id LEFT JOIN categories c on c.pk_cat_id = p.fk_cat_id;");
	Query query=session.createSQLQuery("select pk_productTx_id,productName,companyName,QuantityTx,unit,shopnametoTx,date from producttransfer");
	//Query query = session.createQuery("from PurchaseBill2");
	List<Object[]> list = query.list();


	productList= new ArrayList<productTransferHibernate>(0);
int sr=0;

for (Object[] object : list) {	
	productTransferHibernate p = new productTransferHibernate();
	sr++;
	p.setSr(sr);
	p.setPkproductTxid(Long.parseLong(object[0].toString()));
	p.setProductName(object[1].toString());
	p.setCompanyName(object[2].toString());
	p.setQuantityTx(Double.parseDouble(object[3].toString()));
	p.setUnit(object[4].toString());
	p.setShopnametoTx(object[5].toString());
	p.setDate((Date)object[6]);
	
	productList.add(p);

}}catch(RuntimeException e){	

}
finally{

hbu.closeSession(session);	
}
return productList;
}


public List getProductDetailsForTaxGridInGoodsReceive(String proName, String fk_cat_id, String fk_subCat_id, String packweight,String productId,HttpServletRequest request) 
{	
	HttpSession usersession = request.getSession(true);
	String userid = (String)usersession.getAttribute("userid");
	String shopid = (String)usersession.getAttribute("shopid");
	System.out.println("packweight - "+packweight+" , productId - "+productId+" , proName- "+proName+" fk_cat_id - "+fk_cat_id+" , fk_subCat_id - "+fk_subCat_id);
	HibernateUtility hbu=null;
	Session session=null;
	List list = null;
		
	try{
		 String sqlQuery = "";
		 hbu=HibernateUtility.getInstance();
		 session=hbu.getHibernateSession();		 
		 
		 sqlQuery=("SELECT p.pk_product_id, p.product_name, p.manufacturing_company, p.hsn, p.weight, p.buyunit,  p.fk_cat_id, p.fk_subCat_id, p.buy_price, p.sale_price, p.mrp, p.tax_percentage, t.tax_name, p.sale_price_ex_tax, p.sgst, p.cgst, sc.sub_cat_name,p.unitvalue,p.saleunit from product_details p LEFT JOIN tax_details t ON fk_tax_id = t.pk_tax_id LEFT JOIN sold_units su on p.fk_unit_id = su.pk_unit_id LEFT JOIN sub_categories sc on p.fk_subCat_id = sc.pk_subcat_id where p.product_name='"+proName+"' AND p.fk_cat_id='"+fk_cat_id+"' AND p.fk_subCat_id='"+fk_subCat_id+"' AND p.weight='"+packweight+"' AND p.fk_shop_id='"+shopid+"' AND p.pk_product_id = '"+productId+"'GROUP BY p.manufacturing_company");
		
         //Query query=session.createSQLQuery("SELECT p.pk_product_id, p.product_name, p.weight, p.manufacturing_company, p.fk_cat_id, p.hsn, p.fk_subCat_id, su.unit_name, ct.cat_name, sc.sub_cat_name from product_details p LEFT JOIN sold_units su on p.fk_unit_id = su.pk_unit_id LEFT JOIN sub_categories sc on sc.pk_subcat_id = p.fk_subCat_idLEFT JOIN categories ct on ct.pk_cat_id = p.fk_cat_id where p.product_name=:proName AND p.fk_cat_id= :fk_cat_id AND p.fk_subCat_id= :fk_subCat_id AND p.weight= :packweight GROUP BY p.manufacturing_company");
		 Query query = session.createSQLQuery(sqlQuery);
		 //query.setParameter("proName", proName);
		 //query.setParameter("fk_cat_id", fk_cat_id);
		 //query.setParameter("fk_subCat_id", fk_subCat_id);
		 //query.setParameter("packweight", packweight);
		 list = query.list();
		 
		 		 
		System.out.println(list.size()+"*************");
		}catch(RuntimeException e){
			
		Log.error("Error in getProductDetailsForTaxGridInGoodsReceive",e);
	   }finally{
	 		if(session!=null){
				 
				hbu.closeSession(session);
			}			
		}
	
	return list;
}
//
public List getProductTx(String proName, String fk_cat_id, String fk_subCat_id, String productId,String shop_id,String pack,String packweight,HttpServletRequest request) 
{	
	HttpSession usersession = request.getSession(true);
	String userid = (String)usersession.getAttribute("userid");
	String shopid = (String)usersession.getAttribute("shopid");
	
	HibernateUtility hbu=null;
	Session session=null;
	List list = null;
System.out.println("weight - "+packweight);		
	try{
		 String sqlQuery = "";
		 hbu=HibernateUtility.getInstance();
		 session=hbu.getHibernateSession();		 
		 
		 sqlQuery=("select PkStockId,FkCatId,FkSubCatId,fk_shop_id ,ProductName,CompanyName,avail_Quantity,unit,shop_name,productId,packing_type,Weight from stock_detail WHERE FkCatId ='"+fk_cat_id+"' AND FkSubCatId='"+fk_subCat_id+"' AND productId='"+productId+"' AND ProductName='"+proName+"' AND packing_type = '"+pack+"' AND Weight = '"+packweight+"' AND fk_shop_id = '"+shop_id+"'");
		

		 Query query = session.createSQLQuery(sqlQuery);

		 list = query.list();
		 
		 		 
		System.out.println(list.size()+"*************");
		}catch(RuntimeException e){
			
		Log.error("Error in getProductDetailsForTaxGridInGoodsReceive",e);
	   }finally{
	 		if(session!=null){
				 
				hbu.closeSession(session);
			}			
		}
	
	return list;
}

//
public List getProductstock(String proName, String fk_cat_id, String fk_subCat_id, String productId,String shop_id,HttpServletRequest request) 
{	
	HttpSession usersession = request.getSession(true);
	String userid = (String)usersession.getAttribute("userid");
	String shopid = (String)usersession.getAttribute("shopid");
	String tt = "unpacked";
	HibernateUtility hbu=null;
	Session session=null;
	List list = null;
		
	try{
		 String sqlQuery = "";
		 hbu=HibernateUtility.getInstance();
		 session=hbu.getHibernateSession();		 
		 
		 sqlQuery=("select PkStockId,FkCatId,FkSubCatId,fk_shop_id ,ProductName,CompanyName,avail_Quantity,unit,shop_name,productId from stock_detail WHERE FkCatId ='"+fk_cat_id+"' AND FkSubCatId='"+fk_subCat_id+"' AND productId='"+productId+"' AND ProductName='"+proName+"' AND fk_shop_id = '"+shop_id+"' AND packing_type='"+tt+"'");
		

		 Query query = session.createSQLQuery(sqlQuery);

		 list = query.list();
		 
		 		 
		System.out.println(list.size()+"*************");
		}catch(RuntimeException e){
			
		Log.error("Error in getProductDetailsForTaxGridInGoodsReceive",e);
	   }finally{
	 		if(session!=null){
				 
				hbu.closeSession(session);
			}			
		}
	
	return list;
}

public List getProductDetailsForTaxGridInGoodsReceiveForAB(String booking, HttpServletRequest request) 
{
	HttpSession usersession = request.getSession(true);
	String userid = (String)usersession.getAttribute("userid");
	String shopid = (String)usersession.getAttribute("shopid");
	
	HibernateUtility hbu=null;
	Session session=null;
	List list = null;
		
	try{
		 String sqlQuery = "";
		 hbu=HibernateUtility.getInstance();
		 session=hbu.getHibernateSession();
		 
		 
			 System.out.println("Bookin No-----> "+booking);
			 
			    //sqlQuery=("SELECT ab.fk_product_id, ab.product_name, ab.company, ab.hsn, ab.packing, ab.unit, ab.fk_cat_id, ab.fk_subcat_id, ab.quantity, ab.pk_adv_book_id, ab.booking_no from advance_booking ab where ab.booking_no="+booking+" AND ab.purchaseBillNo IS NULL;");
			    sqlQuery=("SELECT p.fk_product_id, p.product_name, p.company, p.hsn, p.packing, p.unit,  p.fk_cat_id, p.fk_subcat_id, p.buy_price, p.sgst, p.cgst, sc.sub_cat_name, p.discount_amount, p.discount_percentage, p.booking_no, p.quantity, p.pk_adv_book_id, p.buy_price_excl_tax, p.iGstPercentage, p.total_amt_per_prod, p.total_excl_amt,ps.buyunit,ps.saleunit,ps.unitvalue from advance_booking p LEFT JOIN sub_categories sc on p.fk_subCat_id = sc.pk_subcat_id LEFT JOIN product_details ps ON p.fk_product_id=ps.pk_product_id where p.booking_no = "+booking+" AND p.fk_shop_id = '"+shopid+"' AND p.purchaseBillNo = 0 ");
			   
			    
//				 sqlQuery=("SELECT p.pk_product_id, p.product_name, p.manufacturing_company, p.hsn, p.weight, p.buyunit,  p.fk_cat_id, p.fk_subCat_id, p.buy_price, p.sale_price, p.mrp, p.tax_percentage, t.tax_name, p.sale_price_ex_tax, p.sgst, p.cgst, sc.sub_cat_name,p.unitvalue,p.saleunit from product_details p LEFT JOIN tax_details t ON fk_tax_id = t.pk_tax_id LEFT JOIN sold_units su on p.fk_unit_id = su.pk_unit_id LEFT JOIN sub_categories sc on p.fk_subCat_id = sc.pk_subcat_id where p.product_name='"+proName+"' AND p.fk_cat_id='"+fk_cat_id+"' AND p.fk_subCat_id='"+fk_subCat_id+"' AND p.weight='"+packweight+"' AND p.fk_shop_id='"+shopid+"' GROUP BY p.manufacturing_company");			    
			    Query query = session.createSQLQuery(sqlQuery);
			    list = query.list();
			    System.out.println("List Size----> "+list.size());
		 
		 		 
		System.out.println(list.size()+"*************");
		}catch(RuntimeException e){
			
		Log.error("Error in getProductDetailsForTaxGridInGoodsReceive",e);
	   }finally{
	 		if(session!=null){
				 
				hbu.closeSession(session);
			}		
		}
	
	return list;
}












public List getProductDetailsForadvanceBooking(String proName, String fk_cat_id, String fk_subCat_id, String packweight, HttpServletRequest request)
{
	HttpSession usersession = request.getSession(true);
	String userid = (String)usersession.getAttribute("userid");
	String shopid = (String)usersession.getAttribute("shopid");
	
	HibernateUtility hbu=null;
	Session session=null;
	List list=null;
		
	try{
		 hbu=HibernateUtility.getInstance();
		 session=hbu.getHibernateSession();
		
	     Query query=session.createSQLQuery("SELECT p.pk_product_id, p.product_name, p.manufacturing_company, p.hsn, p.weight, su.unit_name, p.fk_cat_id, p.fk_subCat_id, p.buy_price, p.sale_price, p.mrp, p.tax_percentage, t.tax_name, p.sale_price_ex_tax, p.sgst, p.cgst, sc.sub_cat_name from product_details p LEFT JOIN tax_details t ON fk_tax_id = t.pk_tax_id LEFT JOIN sold_units su on p.fk_unit_id = su.pk_unit_id LEFT JOIN sub_categories sc on p.fk_subCat_id = sc.pk_subcat_id where p.product_name='"+proName+"' AND p.fk_cat_id='"+fk_cat_id+"' AND p.fk_subCat_id='"+fk_subCat_id+"' AND p.weight='"+packweight+"' AND p.fk_shop_id='"+shopid+"' GROUP BY p.manufacturing_company");
		 
		 //query.setParameter("proName", proName);
		 //query.setParameter("fk_cat_id", fk_cat_id);
		 //query.setParameter("fk_subCat_id", fk_subCat_id);
		 //query.setParameter("packweight", packweight);
		 
		 list = query.list();
		 
		System.out.println(list.size()+"*************");
		}catch(RuntimeException e){
			
		Log.error("Error in getProductDetails",e);
	}finally{
			if(session!=null){
				 
				hbu.closeSession(session);
			}
			
		}
	
	return list;
}

public List getAllProductBySCategoryAndBySuppliersForGoodsReceive(String category,
		String supplier) {

	
	HibernateUtility hbu = null ;
	 Session session = null;
	 List list  = null;
	 try {
		 hbu = HibernateUtility.getInstance();
		 session = hbu.getHibernateSession();
/* 			Query query = session.createSQLQuery("select p.product_name,p.insert_date from product_details p where p.fk_supplier_id="+supplierId );*/
			
			Query query = session.createSQLQuery("SELECT p.product_name, p.insert_date from purchase_order p WHERE p.fk_cat_id =:category AND p.fk_supplier_id=:supplier");
			query.setParameter("category", category);
			query.setParameter("supplier", supplier);
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


public List getAdvanceBookedProductDetailsForGoodsReceive(String productId2, String category, String supplier) {

	HibernateUtility hbu=null;
	Session session=null;
	List list=null;
		
		try{
		 hbu=HibernateUtility.getInstance();
		 session=hbu.getHibernateSession();

		Query query=session.createSQLQuery("SELECT p.fk_product_id ,p.product_name,p.buy_price,p.sale_price,p.weight,p.mrp from purchase_order p WHERE p.product_name=:productId AND  p.fk_cat_id =:category AND p.fk_supplier_id =:supplier ");
		 
		
		 query.setParameter("productId", productId2);
		 query.setParameter("category", category);
		 query.setParameter("supplier", supplier);
		
		 list = query.list();
		 
		System.out.println(list.size()+"===List size");
		}catch(RuntimeException e){
			
		Log.error("Error in getProductDetails",e);
	}finally{
			if(session!=null){
				
				hbu.closeSession(session);
			}
			
		}
	
	return list;

}


public List getAdvanceBookedProductDetailsForGoodsReceiveWithTax(
		String productId3, String category, String supplier) {


	HibernateUtility hbu=null;
	Session session=null;
	List list=null;
		
		try{
		 hbu=HibernateUtility.getInstance();
		 session=hbu.getHibernateSession();

		Query query=session.createSQLQuery("SELECT p.fk_product_id ,p.product_name,p.buy_price,p.sale_price,p.weight,p.tax_percentage,p.mrp from purchase_order p WHERE p.product_name=:productId AND  p.fk_cat_id =:category AND p.fk_supplier_id =:supplier ");
		 
		
		 query.setParameter("productId", productId3);
		 query.setParameter("category", category);
		 query.setParameter("supplier", supplier);
		
		 System.out.println("product id =="+productId3);
		System.out.println("category id =="+category);
		System.out.println("supplier id =="+supplier);
		 
		 list = query.list();
		 
		System.out.println(list.size()+"===List size");
		}catch(RuntimeException e){
			
		Log.error("Error in getProductDetails",e);
	}finally{
			if(session!=null){
				
				hbu.closeSession(session);
			}
			
		}
	
	return list;


}


public List getpreviousDetsil(String productId2) {
	HibernateUtility hbu=null;
	Session session=null;
	List list=null;
		
		try{
		 hbu=HibernateUtility.getInstance();
		 session=hbu.getHibernateSession();

		Query query=session.createSQLQuery("Select p.insert_date, p.product_name, p.buy_price, p.sale_price, p.weight, p.mrp from product_details p where p.product_name=:productId ORDER BY pk_product_id DESC LIMIT 1");
		 
		 System.out.println(productId2+"product id in goods receive dao");
		 query.setParameter("productId", productId2);
		 list = query.list();
		 
		System.out.println(list.size()+"*************");
		}catch(RuntimeException e){
			
		Log.error("Error in getProductDetails",e);
	}finally{
			if(session!=null){
				
				hbu.closeSession(session);
			}
			
		}
	
	return list;
}

//to get stock Update
public List getAllStockEntry() {
	// TODO Auto-generated method stub
	System.out.println("IN DAO");
	HibernateUtility hbu=null;
	Session session=null;
	List list=null;
	try{
	 hbu = HibernateUtility.getInstance();
	 session = hbu.getHibernateSession();
	 Query query = session.createQuery("from ProductDetailsBean");
	 list = query.list();
	}
		catch(Exception e){	
			e.printStackTrace();
	}
		finally
		{
				if(session!=null){
				hbu.closeSession(session);
			}
		}
	
return list;
}


public List getProductDetailsForAdvanceBook(String proName) {

	HibernateUtility hbu=null;
	Session session=null;
	List list=null;
		
		try{
		 hbu=HibernateUtility.getInstance();
		 session=hbu.getHibernateSession();

		Query query=session.createSQLQuery("Select p.pk_product_id, p.product_name, p.buy_price, p.sale_price, p.weight, p.mrp, p.manufacturing_company, s.unit_name,p.fk_cat_id  from product_details p RIGHT JOIN sold_units s ON p.fk_unit_id = s.pk_unit_id where p.product_name=:proName");
		 
		 System.out.println(proName+"proName in goods receive dao");
		/* System.out.println(fk_subCat_id+"weight in goods receive dao");
		 System.out.println(fk_cat_id+"company in goods receive dao");*/
		
		 query.setParameter("proName", proName);
		/* query.setParameter("fk_cat_id", fk_cat_id);
		 query.setParameter("fk_subCat_id", fk_subCat_id);*/
		 
		 list = query.list();
		 
		System.out.println(list.size()+"*************");
		}catch(RuntimeException e){
			
		Log.error("Error in getProductDetails",e);
	}finally{
			if(session!=null){
				
				hbu.closeSession(session);
			}
			
		}
	
	return list;

}


public List getAllProductBySCategoryAndBySuppliersForGoodsReceiveNew(
		String category, String supplier) {


	
	HibernateUtility hbu = null ;
	 Session session = null;
	 List list  = null;
	 try {
		 hbu = HibernateUtility.getInstance();
		 session = hbu.getHibernateSession();
/* 			Query query = session.createSQLQuery("select p.product_name,p.insert_date from product_details p where p.fk_supplier_id="+supplierId );*/
			
			Query query = session.createSQLQuery("SELECT p.product_name, p.insert_date,p.manufacturer, p.weight, p.unit_name  from purchase_order  p WHERE p.fk_cat_id =:category AND p.fk_supplier_id=:supplier");
			query.setParameter("category", category);
			query.setParameter("supplier", supplier);
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


public List getAdvanceBookedProductDetailsForGoodsReceiveNew(String proName,
		String category, String supplier, String company, String weight) {


	HibernateUtility hbu=null;
	Session session=null;
	List list=null;
		
		try{
		 hbu=HibernateUtility.getInstance();
		 session=hbu.getHibernateSession();

		Query query=session.createSQLQuery("SELECT p.fk_product_id ,p.product_name,p.buy_price,p.sale_price,p.weight,p.mrp,p.manufacturer,p.quantity from purchase_order p WHERE p.product_name=:proName AND  p.fk_cat_id =:category AND p.fk_supplier_id =:supplier AND p.manufacturer =:company AND p.weight=:weight ");
		 
		
		 query.setParameter("proName", proName);
		 query.setParameter("category", category);
		 query.setParameter("supplier", supplier);
		 query.setParameter("company", company);
		 query.setParameter("weight", weight);
		 list = query.list();
		 
		System.out.println(list.size()+"===List size");
		}catch(RuntimeException e){
			
		Log.error("Error in getProductDetails",e);
	}finally{
			if(session!=null){
				
				hbu.closeSession(session);
			}
			
		}
	
	return list;


}


public List getAdvanceBookedProductDetailsForGoodsReceiveWithTaxNew(
		String proName, String category, String supplier, String company,
		String weight) {

		HibernateUtility hbu=null;
		Session session=null;
		List list=null;
			
		try{
		 hbu=HibernateUtility.getInstance();
		 session=hbu.getHibernateSession();
		 System.out.println("proName =="+proName);
			System.out.println("category id =="+category);
			System.out.println("supplier id =="+supplier);
			System.out.println("company =="+company);
			System.out.println("weight =="+weight);
			
		Query query=session.createSQLQuery("SELECT p.fk_product_id ,p.product_name,p.buy_price,p.sale_price,p.weight,d.tax_percentage,p.mrp,p.manufacturer from purchase_order p RIGHT JOIN product_details d on p.fk_product_id = d.pk_product_id WHERE p.product_name=:proName AND  p.fk_cat_id =:category AND p.fk_supplier_id =:supplier AND p.weight=:weight AND p.manufacturer=:company");
		 
		
		 query.setParameter("proName", proName);
		 query.setParameter("category", category);
		 query.setParameter("supplier", supplier);
		 query.setParameter("company", company);
		 query.setParameter("weight", weight);
		
		
		 
		 list = query.list();
		 
		System.out.println(list.size()+"===List size");
		}catch(RuntimeException e){
			
		Log.error("Error in getProductDetails",e);
	}finally{
			if(session!=null){
				
				hbu.closeSession(session);
			}
			
		}
	
	return list;
}
/*public List getAllProductBySCategoryForFertilizerBill(String shopId)
{
	HibernateUtility hbu = null ;
	 Session session = null;
	 List list  = null;
	 try {
		 hbu = HibernateUtility.getInstance();
		 session = hbu.getHibernateSession();
 			Query query = session.createSQLQuery("select p.product_name,p.insert_date from product_details p where p.fk_supplier_id="+supplierId );
			Query query = session.createSQLQuery("SELECT s.ProductName,s.CompanyName,s.Weight, s.Quantity,s.FkCatId,s.FkSubCatId,c.cat_name,sc.sub_cat_name,s.fk_shop_id,sn.shop_name FROM stock_detail s left join categories c on s.FkCatId=c.pk_cat_id left join sub_categories sc on s.FkSubCatId=sc.pk_subcat_id left join shop_details sn on s.fk_shop_id=sn.pk_shop_id where Quantity>0");
			Query query = session.createSQLQuery("SELECT s.ProductName,s.CompanyName,s.Weight, s.Quantity,s.FkCatId,s.FkSubCatId,c.cat_name,sc.sub_cat_name,s.fk_shop_id,sn.shop_name, s.total_kg_ltr_piece_stock, s.unit FROM stock_detail s left join categories c on s.FkCatId=c.pk_cat_id left join sub_categories sc on s.FkSubCatId=sc.pk_subcat_id left join shop_details sn on s.fk_shop_id=sn.pk_shop_id where Quantity>0 and sn.pk_shop_id=sn.pk_shop_id");
			Query query = session.createSQLQuery("SELECT s.ProductName,s.CompanyName,s.Weight, s.Quantity,s.FkCatId,s.FkSubCatId,c.cat_name,sc.sub_cat_name,s.fk_shop_id, sn.shop_name, s.total_kg_ltr_piece_stock, s.unit, gr.expiry_date FROM stock_detail s left join categories c on s.FkCatId=c.pk_cat_id left join sub_categories sc on s.FkSubCatId=sc.pk_subcat_id left join shop_details sn on s.fk_shop_id=sn.pk_shop_id left join goods_receive gr on s.productId=gr.fk_product_id where s.Quantity>0 AND gr.stockPerEntry > 0 AND sn.pk_shop_id = "+shopId+" AND gr.expiry_date >= DATE(NOW()) OR ISNULL(gr.expiry_date) GROUP BY gr.company_Name, gr.product_name, gr.expiry_date, gr.fkCategoryId, gr.fk_subCat_id");
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

}*/

public List getAllProductBySCategoryForFertilizerBill(HttpServletRequest request, HttpServletResponse response)
{	
	
	 HttpSession session1 = request.getSession(); 
	 String shopId = (String)session1.getAttribute("shopId");
		 System.out.println("shop id - - "+shopId);
	 HibernateUtility hbu = null;
	 Session session = null;
	 List<GetProductDetails> productList  = null;
	 
	 try
	 {		 
		 int count = 1;
		 hbu = HibernateUtility.getInstance();
		 session = hbu.getHibernateSession(); 
//   		 Query query = session.createSQLQuery("SELECT s.ProductName, s.CompanyName, s.Weight, s.total_kg_ltr_piece_stock, s.FkCatId, s.FkSubCatId, c.cat_name, sc.sub_cat_name, acd.shop_id, acd.shop_name, s.unit, gr.expiry_date, gr.barcodeNo,s.packing_type,s.productId FROM stock_detail s LEFT JOIN categories c ON s.FkCatId = c.pk_cat_id LEFT JOIN sub_categories sc ON s.FkSubCatId = sc.pk_subcat_id LEFT JOIN access_control_details acd ON s.fk_shop_id = acd.pk_access_id LEFT JOIN goods_receive gr ON s.productId = gr.fk_product_id WHERE s.avail_Quantity > 0 AND gr.stockPerEntry > 0 AND acd.shop_id = '"+shopId+"' AND (gr.expiry_date >= DATE(NOW()) OR ISNULL(gr.expiry_date)) GROUP BY gr.company_Name, gr.product_name, gr.expiry_date, gr.fkCategoryId, gr.fk_subCat_id");
		 	Query query = session.createSQLQuery("SELECT s.ProductName, s.CompanyName, s.Weight, s.total_kg_ltr_piece_stock, s.FkCatId, s.FkSubCatId, c.cat_name, sc.sub_cat_name, acd.shop_id, acd.shop_name, s.unit, gr.expiry_date, gr.barcodeNo,s.packing_type,s.productId FROM stock_detail s LEFT JOIN categories c ON s.FkCatId = c.pk_cat_id LEFT JOIN sub_categories sc ON s.FkSubCatId = sc.pk_subcat_id LEFT JOIN access_control_details acd ON s.fk_shop_id = acd.pk_access_id LEFT JOIN goods_receive gr ON s.productId = gr.fk_product_id WHERE s.avail_Quantity > 0 AND gr.stockPerEntry > 0 AND acd.shop_id = '"+shopId+"' AND (gr.expiry_date >= DATE(NOW()) OR ISNULL(gr.expiry_date)) GROUP BY gr.company_Name, gr.product_name, gr.expiry_date, gr.fkCategoryId, gr.fk_subCat_id");
   		 List<Object[]> list = query.list();
   		 
   		 productList = new ArrayList<GetProductDetails>(0);
			/*for(int i=0;i<list.size();i++)
			{*/
   		 for(Object[] o: list)
   		 { 
				 //Object[] o =(Object[])list.get(i); 
				GetProductDetails bean = new GetProductDetails();
				
				System.out.println("claan rslt - "+Arrays.toString(o));
				
				bean.setProduct(o[0].toString());
				bean.setManufacturer(o[1].toString());
				bean.setWeight(Double.parseDouble(o[2].toString()));
				bean.setQuantityDouble(Double.parseDouble(o[3].toString()));			 
				bean.setFkCatId(Long.parseLong(o[4].toString()));
				bean.setFkSubCatId(Long.parseLong(o[5].toString()));
				bean.setCatName(o[6].toString());
				bean.setSubCatName(o[7].toString());
				bean.setFkShopId(Long.parseLong(o[8].toString()));                                    
				bean.setShopName(o[9].toString());				
				bean.setUnitName(o[10].toString());
				
				//bean.setStockInTotalKgLtrPiece(Double.parseDouble(o[10].toString()));
								
				if(o[11] == null)
				{
					bean.setExpiryDate("N/A");
				}
				else
				{	
					 String pattern = "dd-MM-yyyy";
					 SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
					 Date expDate = (Date)o[11];
					 String expirydate = simpleDateFormat.format(expDate);
					 bean.setExpiryDate(expirydate);
				}
				System.out.println("ssss` `````````````  "+bean.getExpiryDate() );
				bean.setBarcodeNo(Long.parseLong(o[12].toString()));
				bean.setPacktype(o[13].toString());
				bean.setProductId(Long.parseLong(o[14].toString()));
				/*
				 * String purchaseDate=request.getParameter("purchaseDate"+i);
				 * System.out.println("purchaseDate-----------"+purchaseDate);
				 * 
				 * 
				 * SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd"); Date
				 * purchaseDate1= null;
				 * 
				 * try { purchaseDate1 = format.parse(purchaseDate);
				 * bean.setPurchaseDate(purchaseDate1); } catch (ParseException e1) { // TODO
				 * Auto-generated catch block e1.printStackTrace(); }
				 */
				  
				//bean.setTotalAmount((Double)o[1]);
				System.out.println("*************** "+o[0]);
				
				System.out.println(bean.getProduct());
				
				productList.add(bean);
				count++;
			}			
			
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
		return productList;
}

//
public List getAllProductByStock(HttpServletRequest request,
		  HttpServletResponse response)
{	
	
	 HttpSession session1 = request.getSession(); 
	 String shopId = (String)session1.getAttribute("shopId");
		 
	 HibernateUtility hbu = null;
	 Session session = null;
	 List<Stock> productList  = null;
	 
	 try
	 {		 
		 int count = 1;
		 hbu = HibernateUtility.getInstance();
		 session = hbu.getHibernateSession(); 
 //		 Query query = session.createSQLQuery("SELECT s.ProductName, s.CompanyName, s.Weight, s.total_kg_ltr_piece_stock, s.FkCatId, s.FkSubCatId, c.cat_name, sc.sub_cat_name, acd.shop_id, acd.shop_name, s.unit, gr.expiry_date, gr.barcodeNo FROM stock_detail s LEFT JOIN categories c ON s.FkCatId = c.pk_cat_id LEFT JOIN sub_categories sc ON s.FkSubCatId = sc.pk_subcat_id LEFT JOIN access_control_details acd ON s.fk_shop_id = acd.pk_access_id LEFT JOIN goods_receive gr ON s.productId = gr.fk_product_id WHERE s.avail_Quantity > 0 AND gr.stockPerEntry > 0 AND acd.shop_id = '"+shopId+"' AND (gr.expiry_date >= DATE(NOW()) OR ISNULL(gr.expiry_date)) GROUP BY gr.company_Name, gr.product_name, gr.expiry_date, gr.fkCategoryId, gr.fk_subCat_id");
		 Query query = session.createSQLQuery("select PkStockId,FkCatId,FkSubCatId,productId,ProductName,CompanyName,Weight,avail_Quantity,unit,UpdateDate,packing_type from stock_detail where fk_shop_id = '"+shopId+"'"); 		 
 		 List<Object[]> list = query.list();
 		 
 		 productList = new ArrayList<Stock>(0);
			/*for(int i=0;i<list.size();i++)
			{*/
 		 Long bb = 0001l;
 		 for(Object[] o: list)
 		 { 
				 //Object[] o =(Object[])list.get(i); 
//				GetProductDetails bean = new GetProductDetails();
 			 	Stock bean = new Stock();	
				System.out.println("drp down rslt - -  "+Arrays.toString(o));
				
				bean.setPkStockId(Long.parseLong(o[0].toString()));
				bean.setCatID(Long.parseLong(o[1].toString()));
				bean.setSubCatId(Long.parseLong(o[2].toString()));
				bean.setProductId(Long.parseLong(o[3].toString()));
				bean.setProductName(o[4].toString());
				bean.setCompanyName(o[5].toString());
				bean.setWeight(Double.parseDouble(o[6].toString()));
				bean.setQuantity(Double.parseDouble(o[7].toString()));
				bean.setUnit((o[8].toString()));
				bean.setUpdateDate((Date)o[9]);
				bean.setPack_type(o[10].toString());
				bean.setBarcodeNo(bb);
								
/*				if(o[11] == null)
				{
					bean.setExpiryDate("N/A");
				}
				else
				{	
					 String pattern = "dd-MM-yyyy";
					 SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
					 Date expDate = (Date)o[11];
					 String expirydate = simpleDateFormat.format(expDate);
					 bean.setExpiryDate(expirydate);
				}
				System.out.println("ssss` `````````````  "+bean.getExpiryDate() );
				bean.setBarcodeNo(Long.parseLong(o[12].toString()));
	*/			
				  
				System.out.println("*************** "+o[0]);
				
				System.out.println(bean.getPkStockId());
				
				productList.add(bean);
				count++;
			}			
			
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
		return productList;
}

public List getAllProductBySCategoryForSeedAndPesticideBill(String category1) {

	HibernateUtility hbu = null ;
	 Session session = null;
	 List list  = null;
	 try {
		 hbu = HibernateUtility.getInstance();
		 session = hbu.getHibernateSession();
			Query query = session.createSQLQuery("select product_name, manufacturing_company, weight, s.unit_name FROM product_details LEFT JOIN sold_units s ON fk_unit_id = s.pk_unit_id WHERE fk_cat_id =:category1");
			 query.setParameter("category1", category1);
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


public List getAllBatchAndStockForSeedAndPesticideBill(String proName,
		String company, String weight) {

	HibernateUtility hbu = null ;
	 Session session = null;
	 List list  = null;
	 try {
		 hbu = HibernateUtility.getInstance();
		 session = hbu.getHibernateSession();
			Query query = session.createSQLQuery("select batch_number, Quantity from stock_detail WHERE ProductName =:proName AND CompanyName =:company AND Weight=:weight AND Quantity>0");
			 query.setParameter("proName", proName);
			 query.setParameter("company", company);
			 query.setParameter("weight", weight);
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


public List getAllProductBySCategoryForStockReport(HttpServletRequest request) 
{
	HttpSession usersession = request.getSession(true);
	String userid = (String)usersession.getAttribute("userid");
	String shopid = (String)usersession.getAttribute("shopid");

	HibernateUtility hbu = null ;
	 Session session = null;
	 List list  = null;
	 try {
		 hbu = HibernateUtility.getInstance();
		 session = hbu.getHibernateSession();
			Query query = session.createSQLQuery("select pd.product_name, pd.manufacturing_company, pd.weight, s.unit_name FROM product_details pd LEFT JOIN sold_units s ON pd.fk_unit_id = s.pk_unit_id WHERE pd.fk_shop_id='"+shopid+"' GROUP BY pd.product_name");
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

public List getAllProductDetails(HttpServletRequest request)
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
		 query = session.createQuery("from ProductDetailsBean where fk_shop_id='"+shopid+"' group by manufacturing_company");
//		 query = session.createQuery("from ProductDetailsBean");
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


public List getAllSubCategory(String fk_cat_id, HttpServletRequest request)
{
	System.out.println("IN DAO");
	
	HttpSession usersession = request.getSession(true);
	String userid = (String)usersession.getAttribute("userid");
	String shopid = (String)usersession.getAttribute("shopid");
	
	HibernateUtility hbu = null;
	Session session =  null;
	Query query = null;
	List list = null;
	System.out.println("IN DAO"+fk_cat_id);
	 try {
		 hbu = HibernateUtility.getInstance();
		 session = hbu.getHibernateSession();
		 System.out.println("IN DAO"+fk_cat_id);
		 query = session.createSQLQuery("SELECT pk_subcat_id,sub_cat_name from sub_categories where fk_cat_id='"+fk_cat_id+"' and fk_shop_id='"+shopid+"'");
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
public List getAllbill(String date, HttpServletRequest request)
{
	System.out.println("IN DAO");
	
	HttpSession usersession = request.getSession(true);
	String userid = (String)usersession.getAttribute("userid");
	String shopid = (String)usersession.getAttribute("shopid");
	
	HibernateUtility hbu = null;
	Session session =  null;
	Query query = null;
	List list = null;
//	System.out.println("IN DAO"+fk_cat_id);
	 try {
		 hbu = HibernateUtility.getInstance();
		 session = hbu.getHibernateSession();
		 System.out.println("IN DAO - "+date);
		 query = session.createSQLQuery("select bill_no, customer_name,insert_date from fertilizer_billing where customer_name = '"+date+"' group by bill_no;");
		 list = query.list(); 
	System.out.println("list size - - "+query.list().size());
	
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
public List getAllcreditbill(String date, HttpServletRequest request)
{
	System.out.println("IN DAO");
	
	HttpSession usersession = request.getSession(true);
	String userid = (String)usersession.getAttribute("userid");
	String shopid = (String)usersession.getAttribute("shopid");
	
	HibernateUtility hbu = null;
	Session session =  null;
	Query query = null;
	List list = null;
	System.out.println("IN DAO name - "+date);
	 try {
		 hbu = HibernateUtility.getInstance();
		 session = hbu.getHibernateSession();
		 System.out.println("IN DAO - "+date);
		 query = session.createSQLQuery("select bill_no, credit_customer_name,insert_date from fertilizer_billing where credit_customer_name= '"+date+"' group by bill_no;");
		 
//	 query=session.createSQLQuery("select fertilizer_billing.bill_no, customer_details.first_name, customer_details.last_name from fertilizer_billing left join customer_details on fertilizer_billing.fk_customer_id = customer_details.pk_customer_id where fertilizer_billing.insert_date= '"+date+"' AND fertilizer_billing.fk_shop_id = '"+shopid+"' AND fertilizer_billing.fk_customer_id != 0 OR fertilizer_billing.fk_customer_id != null group by fertilizer_billing.bill_no");
			
		 list = query.list(); 
	System.out.println("list size - - "+query.list().size());
	
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
public List getProductDetails()
{
	HibernateUtility hbu = null;
	Session session =  null;
	Query query = null;
	// List list = null;
	 List<GetProductDetails> stockList = null;
	 
	 
	 try {
		 hbu = HibernateUtility.getInstance();
		 session = hbu.getHibernateSession();
		 query = session.createSQLQuery("SELECT product_name, manufacturing_company, weight from product_details");
		 List<Object[]> list = query.list(); 
		 stockList = new ArrayList<GetProductDetails>(0);
		 System.out.println("List size of product detail = ="+list.size());
		 for (Object[] object : list) {
				//System.out.println(Arrays.toString(object));
				GetProductDetails reports = new GetProductDetails();
				reports.setProduct(object[0].toString());
				reports.setManufacturer(object[1].toString());
				reports.setWeight(Double.parseDouble(object[2].toString()));
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
public List getAllProduct()
{
		HibernateUtility hbu = null;
		Session session =  null;
		Query query = null;
		 List<ProductDetailsBean> list = null;
		 try {
			 hbu = HibernateUtility.getInstance();
			 session = hbu.getHibernateSession();
			query = session.createQuery("from ProductDetailsBean");
			 /*query = session.createQuery("from CustomerDetailsBean");*/
			 list = query.list(); 
		} catch (Exception e) {
			Log.error("Error in getAllPriduct", e);
		}
		 
		 finally
		 {
			 if (session!=null) {
				hbu.closeSession(session);
			}
		 }
			
				return list;
	}

        //GET CGST SGST Percentage
		public List getCSGstPercentage(String taxid) {
			HibernateUtility hbu=null;
			Session session=null;
			List list=null;

			try{
				hbu=HibernateUtility.getInstance();
				session=hbu.getHibernateSession();

				Query query=session.createSQLQuery("SELECT cgst,sgst,percentage from tax_details WHERE pk_tax_id='"+taxid+"'");

				list = query.list();

				System.out.println(list.size()+"===List size");
			}catch(RuntimeException e){

				Log.error("Error in getting Details",e);
			}finally{
				if(session!=null){

					hbu.closeSession(session);
				}
			}
			return list;
		}
//
		public void delproduct(String pkid) {
			
			System.out.println("In DAO  "+pkid);
			//MiddlegenTask
			HibernateUtility hbu = null ;
			 Session session = null;
			 List list  = null;
			 Transaction tx = null;

			 try {
				 hbu = HibernateUtility.getInstance();
				 session = hbu.getHibernateSession();
				 tx = session.beginTransaction();
				 
					Query query2 = session.createSQLQuery("DELETE from Stock_Detail where productId = '"+pkid+"'");
					int seletedRecords2 = query2.executeUpdate();
					System.out.println("Number of stock deleted == + = - "+seletedRecords2);
					
					Query query1 = session.createSQLQuery("DELETE from goods_receive WHERE fk_product_id ='"+pkid+"'");
					int seletedRecords1 = query1.executeUpdate();
					System.out.println("Number of goodreceive deleted == + = - "+seletedRecords1);
									
					
					Query query4 = session.createSQLQuery("DELETE from product_details where pk_product_id = '"+pkid+"'");
					int seletedRecords4 = query4.executeUpdate();
					System.out.println("Number of product deleted == + = - "+seletedRecords4);
					
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
		
		public void delsupp(String pkid) {
			
			System.out.println("In DAO  "+pkid);
			//MiddlegenTask
			HibernateUtility hbu = null ;
			 Session session = null;
			 List list  = null;
			 Transaction tx = null;

			 try {
				 hbu = HibernateUtility.getInstance();
				 session = hbu.getHibernateSession();
				 tx = session.beginTransaction();
				 
					Query query2 = session.createSQLQuery("DELETE from supplier_payment where fk_supplier_id = '"+pkid+"'");
					int seletedRecords2 = query2.executeUpdate();
					System.out.println("Number of supp pay deleted == + = - "+seletedRecords2);
					
					Query query1 = session.createSQLQuery("DELETE from supplier_details WHERE pk_supplier_id ='"+pkid+"'");
					int seletedRecords1 = query1.executeUpdate();
					System.out.println("Number of supp detail deleted == + = - "+seletedRecords1);
														
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
		
		public void delcust(String pkid) {
			
			System.out.println("In DAO  "+pkid);
			//MiddlegenTask
			HibernateUtility hbu = null ;
			 Session session = null;
			 List list  = null;
			 Transaction tx = null;
//
			 try {
				 hbu = HibernateUtility.getInstance();
				 session = hbu.getHibernateSession();
				 tx = session.beginTransaction();
				 
					Query query2 = session.createSQLQuery("DELETE from credit_customer_payment where fk_customer_id = '"+pkid+"'");
					int seletedRecords2 = query2.executeUpdate();
					System.out.println("Number of supp pay deleted == + = - "+seletedRecords2);
					
					Query query1 = session.createSQLQuery("DELETE from customer_details WHERE pk_customer_id ='"+pkid+"'");
					int seletedRecords1 = query1.executeUpdate();
					System.out.println("Number of supp detail deleted == + = - "+seletedRecords1);
														
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
		public void delexp(String pkid) {
			
			System.out.println("In DAO  "+pkid);
			//MiddlegenTask
			HibernateUtility hbu = null ;
			 Session session = null;
			 List list  = null;
			 Transaction tx = null;

			 try {
				 hbu = HibernateUtility.getInstance();
				 session = hbu.getHibernateSession();
				 tx = session.beginTransaction();
				 
					Query query2 = session.createSQLQuery("DELETE from expenditure_payment where fk_expense_detail_id = '"+pkid+"'");
					int seletedRecords2 = query2.executeUpdate();
					System.out.println("Number of supp pay deleted == + = - "+seletedRecords2);
					
					Query query1 = session.createSQLQuery("DELETE from expenditure_details WHERE pk_expense_details_id ='"+pkid+"'");
					int seletedRecords1 = query1.executeUpdate();
					System.out.println("Number of supp detail deleted == + = - "+seletedRecords1);
														
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
		public void delbank(String pkid) {
			
			System.out.println("In DAO  "+pkid);
			//MiddlegenTask
			HibernateUtility hbu = null ;
			 Session session = null;
			 List list  = null;
			 Transaction tx = null;

			 try {
				 hbu = HibernateUtility.getInstance();
				 session = hbu.getHibernateSession();
				 tx = session.beginTransaction();
				 
					Query query2 = session.createSQLQuery("DELETE from bank_payment where fk_bank_detail_id = '"+pkid+"'");
					int seletedRecords2 = query2.executeUpdate();
					System.out.println("Number of supp pay deleted == + = - "+seletedRecords2);
					
					Query query1 = session.createSQLQuery("DELETE from bank_details WHERE pk_bank_details_id ='"+pkid+"'");
					int seletedRecords1 = query1.executeUpdate();
					System.out.println("Number of supp detail deleted == + = - "+seletedRecords1);
														
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
		public void delpartner(String pkid) {
			
			System.out.println("In DAO  "+pkid);
			//MiddlegenTask
			HibernateUtility hbu = null ;
			 Session session = null;
			 List list  = null;
			 Transaction tx = null;

			 try {
				 hbu = HibernateUtility.getInstance();
				 session = hbu.getHibernateSession();
				 tx = session.beginTransaction();
				 
					
					Query query1 = session.createSQLQuery("DELETE from partnerDetails WHERE pkPartnerId ='"+pkid+"'");
					int seletedRecords1 = query1.executeUpdate();
					System.out.println("Number of supp detail deleted == + = - "+seletedRecords1);
														
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
}
