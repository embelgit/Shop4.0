package com.Fertilizer.dao;
				
import java.math.BigDecimal;
import java.math.BigInteger;
import java.math.RoundingMode;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
				import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
				import javax.servlet.http.HttpServletRequestWrapper;
				import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.hibernate.Query;
				import org.hibernate.Session;
				import org.hibernate.Transaction;
				import org.jfree.util.Log;
				
				import com.Fertilizer.bean.BillBean;
				import com.Fertilizer.bean.CustomerBean;
				import com.Fertilizer.bean.GoodsReceiveDetail;
				import com.Fertilizer.bean.ProductDetailsForReports;
				import com.Fertilizer.bean.ProfitAndLoss;
				import com.Fertilizer.bean.PurchaseDetailsFromGoodsReceive;
				import com.Fertilizer.bean.SaleReports;
				import com.Fertilizer.bean.StockDetail;
import com.Fertilizer.bean.purchaseReturnBean;
import com.Fertilizer.hibernate.CategoryDetailsBean;
				import com.Fertilizer.hibernate.FertilizerBillBean;
				import com.Fertilizer.hibernate.GodownEntry;
				import com.Fertilizer.hibernate.GoodsReceiveBean;
import com.Fertilizer.hibernate.PackingHibernate;
import com.Fertilizer.hibernate.ProductDetailsBean;
import com.Fertilizer.hibernate.Stock;
import com.Fertilizer.hibernate.SupplierDetailsBean;
import com.Fertilizer.hibernate.productTransferHibernate;
import com.Fertilizer.utility.HibernateUtility;
import com.itextpdf.text.pdf.PdfStructTreeController.returnType;
				
public class GoodsReceiveDao {


public void addGoodsReceive(GoodsReceiveBean bean) 
{
	System.out.println("IN DAO");
	HibernateUtility hbu=null;
	Session session = null;
	Transaction transaction = null;
	
	try
	{
		hbu = HibernateUtility.getInstance();
		session = hbu.getHibernateSession();
		transaction = session.beginTransaction();
		
		Long fk_supplier_id = bean.getSupplier();
		Long fk_product_id = bean.getPkPOId();
		Long fkCategoryId = bean.getFkCategoryId();
		Long bar = bean.getBarcodeNo();
		
		SupplierDetailsBean supdetail = (SupplierDetailsBean) session.load(SupplierDetailsBean.class, fk_supplier_id);
		bean.setSupplierDetailsBean(supdetail);
									
		CategoryDetailsBean categoryDetailsBean = (CategoryDetailsBean) session.load(CategoryDetailsBean.class, fkCategoryId);
		bean.setCategoryDetailsBean(categoryDetailsBean);
		
		ProductDetailsBean proDetail = (ProductDetailsBean) session.load(ProductDetailsBean.class, fk_product_id);
		bean.setProductDetailsBean(proDetail);
		
		System.out.println("Tx started");
		
		session.save(bean);
		transaction.commit();
		System.out.println("Successful");
		
//		printBarcode(request,response);
	}
	catch(RuntimeException e){
		try{
			transaction.rollback();
		}catch(RuntimeException rbe){
			Log.error("Couldn't roll back tranaction",rbe);
		}	
	}finally{
		hbu.closeSession(session);
	}
}

//
public void editGoodsReceive(GoodsReceiveBean updateGR) 
{
	System.out.println("IN DAO");
	HibernateUtility hbu=null;
	Session session = null;
	Transaction transaction = null;
	
	try
	{
		hbu = HibernateUtility.getInstance();
		session = hbu.getHibernateSession();
		transaction = session.beginTransaction();
		
		Long fk_supplier_id = updateGR.getSupplier();
		Long fk_product_id = updateGR.getPkPOId();
		Long fkCategoryId = updateGR.getFkCategoryId();
			System.out.println("in dao - - fk_supplier_id - "+fk_supplier_id+" , fk_product_id - "+fk_product_id+"  , fkCategoryId -  "+fkCategoryId);
		SupplierDetailsBean supdetail = (SupplierDetailsBean) session.load(SupplierDetailsBean.class, fk_supplier_id);
		updateGR.setSupplierDetailsBean(supdetail);
									
		CategoryDetailsBean categoryDetailsBean = (CategoryDetailsBean) session.load(CategoryDetailsBean.class, fkCategoryId);
		updateGR.setCategoryDetailsBean(categoryDetailsBean);
		
		ProductDetailsBean proDetail = (ProductDetailsBean) session.load(ProductDetailsBean.class, fk_product_id);
		updateGR.setProductDetailsBean(proDetail);
		
		System.out.println("Tx started");
		
		session.save(updateGR);
		transaction.commit();
		System.out.println("Successful");
	}
	catch(RuntimeException e){
		try{
			transaction.rollback();
		}catch(RuntimeException rbe){
			Log.error("Couldn't roll back tranaction",rbe);
		}	
	}finally{
		hbu.closeSession(session);
	}
}

public List<CustomerBean> getAllItemDetails(String key){
	
	HibernateUtility hbu=null;
	Session session=null;
	List<CustomerBean> itemlist=null;
	try
	{		
		System.out.println("shreemant");
		hbu = HibernateUtility.getInstance();
	    session = hbu.getHibernateSession();
	    
	    String sqlQuery = "SELECT pk_goods_receive_id , fk_supplier_id, fkCategoryId, product_name , sale_price, weight, dupQuantity, mrp, company_Name, barcodeNo, tax_percentage,batch_no FROM goods_receive WHERE barcodeNo ="+key;
	
	    Query query=session.createSQLQuery(sqlQuery);
		List<Object[]> list = query.list();
	
		 itemlist = new ArrayList<CustomerBean>(0);
	     for (Object[] objects : list) 
	     {
			 System.out.println(Arrays.toString(objects));
			 CustomerBean bean = new CustomerBean();
			 System.out.println("itemlist");
			 bean.setPkGoodreceiveId(Long.parseLong(objects[0].toString()));
			 bean.setSupplier_id(Long.parseLong(objects[1].toString()));
			 bean.setCat_id(Long.parseLong(objects[2].toString()));
			 bean.setItemName(objects[3].toString());
			 bean.setSalePrice(Double.parseDouble(objects[4].toString()));
			 bean.setWeight(Double.parseDouble(objects[5].toString()));
			 bean.setQuantity(0d);
			 bean.setMrp(Double.parseDouble(objects[7].toString()));
			 bean.setCompanyName(objects[8].toString());
			 bean.setBarcodeNo(Long.parseLong(objects[9].toString()));
			 bean.setVatPercentage(Double.parseDouble(objects[10].toString()));
			 bean.setUnitName("Kg");
			 bean.setBatchNumber(objects[11].toString());
			 System.out.println("itemlist");
			
			 itemlist.add(bean);	
	     }
     }
     catch(RuntimeException e)
     {
    	 Log.error("Error in getAllItemDetails(String key)", e);	
	 }finally{
		 if(session!=null)
		 {
			hbu.closeSession(session);	
		 }
	 }
		
	 return itemlist;
		
		
}
	
	//seed billing by barcode
public List<CustomerBean> getPesticideDetailByBarocde(String key){
	
	HibernateUtility hbu=null;
	Session session=null;
	List<CustomerBean> itemlist=null;
	try
	{
		
			hbu = HibernateUtility.getInstance();
	 session = hbu.getHibernateSession();
	 String sqlQuery = "SELECT pk_goods_receive_id , fk_supplier_id, fkCategoryId, product_name , sale_price, weight, dupQuantity, mrp, company_Name, barcodeNo, tax_percentage,batch_no FROM goods_receive WHERE barcodeNo ="+key;

 Query query=session.createSQLQuery(sqlQuery);
	List<Object[]> list = query.list();

	 itemlist = new ArrayList<CustomerBean>(0);
     for (Object[] objects : list) {
	 System.out.println(Arrays.toString(objects));
	 CustomerBean bean = new CustomerBean();
	 System.out.println("itemlist");
 bean.setPkGoodreceiveId(Long.parseLong(objects[0].toString()));
 bean.setSupplier_id(Long.parseLong(objects[1].toString()));
 bean.setCat_id(Long.parseLong(objects[2].toString()));
 bean.setItemName(objects[3].toString());
 bean.setSalePrice(Double.parseDouble(objects[4].toString()));
 bean.setWeight(Double.parseDouble(objects[5].toString()));
 bean.setQuantity(0d);
 bean.setMrp(Double.parseDouble(objects[7].toString()));
 bean.setCompanyName(objects[8].toString());
 bean.setBarcodeNo(Long.parseLong(objects[9].toString()));
 bean.setVatPercentage(Double.parseDouble(objects[10].toString()));
 bean.setUnitName("Ml");
 bean.setBatchNumber(objects[11].toString());
 System.out.println("itemlist");
	
	itemlist.add(bean);
	
     }
}
catch(RuntimeException e)
{
	Log.error("Error in getAllItemDetails(String key)", e);	
		}finally
		{if(session!=null){
			hbu.closeSession(session);	
		}
		}
		
		return itemlist;
		
		
}
	
	
	//to get barcode no in goodrecive
public List getLastBarcodeNo(){
		
		
		HibernateUtility hbu=null;
		Session session=null;
		List<BillBean> saleList=null;
		try
		{
			hbu = HibernateUtility.getInstance();
		 session = hbu.getHibernateSession();
		 Query query = session.createSQLQuery("SELECT pk_goods_receive_id , barcodeNo FROM goods_receive ORDER BY barcodeNo DESC LIMIT 1");
		
		List<Object[]> list = query.list();
		 saleList= new ArrayList<BillBean>(0);
		for (Object[] object : list) {
			System.out.println(Arrays.toString(object));
			BillBean reports = new BillBean();
			reports.setBarcodeNo(Long.parseLong(object[1].toString()));
			saleList.add(reports);	 
	}}
	catch(Exception e)
	{
		e.printStackTrace();	
	}finally
	{if(session!=null){
		session.close();	
	}
	}
	return saleList;	
	
	
}


public void updateProductStatus(Long prodctId ){
	System.out.println(prodctId+"PRODUCT ID");
HibernateUtility hbu=null;
Session session = null;
Transaction transaction = null;
Long status = 2l;
try{
	hbu = HibernateUtility.getInstance();
	session = hbu.getHibernateSession();
	transaction = session.beginTransaction();
	String hql = "UPDATE product_details set status ="+status +" WHERE pk_product_id =:prodctId";
Query query = session.createSQLQuery(hql);
query.setParameter("prodctId", prodctId);
int result = query.executeUpdate();
System.out.println("Rows affected: " + result);


transaction.commit();
System.out.println("Updated Successfully");
	}catch (Exception e) {
		if (transaction!=null) transaction.rollback();
		e.printStackTrace(); 
	}finally {
		session.close(); 
	}
}


public List getAllDcNumbersBySuppliers(String supplierId) {

	HibernateUtility hbu = null ;
	Session session = null;
	List list  = null;
	try {
		hbu = HibernateUtility.getInstance();
		session = hbu.getHibernateSession();
		Query query = session.createSQLQuery("select p.dc_number,p.insert_date from purchase_order p where p.fk_supplier_id="+supplierId);
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

public List getPODetailsForGoodsReceive(String dcNum, String supplier) {


	HibernateUtility hbu = null ;
	Session session = null;
	List list  = null;
	try {
		hbu = HibernateUtility.getInstance();
		session = hbu.getHibernateSession();

		Query query = session.createSQLQuery("select  p.fk_product_id, p.product_name, p.buy_price, p.sale_price, p.quantity, p.weight from purchase_order p where p.fk_supplier_id= " + supplier+"  "+" and"+ "  "+ "  p.dc_number= "+dcNum);

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

//////////////purchase between two dates///////////

public List<PurchaseDetailsFromGoodsReceive> getPurchaseReportsBetweenTwoDates(
			String fDate, String tDate) {
		
	Integer dbBillNo;
	Integer cmpBillNo;
	Integer billCount = 1;


		System.out.println(fDate+"first Date In dao");
System.out.println(tDate+"Second Date In dao");
HibernateUtility hbu=null;
Session session=null;

HibernateUtility hbu2=null;
Session session2=null;

NumberFormat formatter = new DecimalFormat("#0.00");

List<PurchaseDetailsFromGoodsReceive> purchaseList=null;
try
{		
	
 hbu = HibernateUtility.getInstance();
 session = hbu.getHibernateSession();
 Query query = session.createSQLQuery("select gr.bill_number, gr.purchaseDate, gr.product_name, gr.company_Name, gr.batch_no, gr.barcodeNo, gr.buy_price, gr.sale_price, gr.mrp, gr.weight, abs(gr.quantity), gr.tax_percentage, gr.iGstPercentage, gr.Tax_Amount, gr.Per_Product_Total + gr.Tax_Amount, gr.discount_amount, su.unit_name,gr.discount_percentage from goods_receive gr join product_details pd on gr.fk_product_id=pd.pk_product_id join sold_units su on pd.fk_unit_id = su.pk_unit_id where purchaseDate between '" + fDate +"' and '"+tDate+"'");

List<Object[]> list = query.list();
purchaseList= new ArrayList<PurchaseDetailsFromGoodsReceive>(0);


for (Object[] object : list)
{					
	PurchaseDetailsFromGoodsReceive reports = new PurchaseDetailsFromGoodsReceive();
	
	dbBillNo = Integer.parseInt(object[0].toString());
	
	hbu2 = HibernateUtility.getInstance();
	 session2 = hbu2.getHibernateSession();
	 Query query2 = session2.createSQLQuery("select bill_number, COUNT(bill_number) from goods_receive where bill_number = "+dbBillNo+" GROUP BY bill_number");			 
 List<Object[]> templist = query2.list();
 for (Object[] object2 : templist)
 {
	 cmpBillNo = Integer.parseInt(object2[0].toString());
	 billCount = Integer.parseInt(object2[1].toString());
 }
 
 Double discountAmount = Double.parseDouble(object[15].toString());
 Double perProductDiscount = discountAmount/billCount;
 reports.setDiscountAmount(formatter.format(perProductDiscount).toString());



reports.setBillNo(object[0].toString());
reports.setPurchaseDate(object[1].toString());
reports.setProductName(object[2].toString());
reports.setCompanyName(object[3].toString());
//reports.setDcNo(object[4].toString());
reports.setBatchNo(object[4].toString());
reports.setBarcodeNo(object[5].toString());
reports.setBuyPrice(Double.parseDouble(object[6].toString()));
reports.setSalePrice(Double.parseDouble(object[7].toString()));
reports.setMrp(Double.parseDouble(object[8].toString()));
reports.setWeight(Double.parseDouble(object[9].toString()));
reports.setQuantity2(Double.parseDouble(object[10].toString()));
double gstPerc = Double.parseDouble(object[11].toString());
double iGstPerc = Double.parseDouble(object[12].toString());
if(gstPerc == 0 && iGstPerc == 0)
{
	reports.setTaxPercentage(0.0);
}
else if(gstPerc>0 && iGstPerc == 0)
{
	reports.setTaxPercentage(gstPerc);
}
else if(iGstPerc > 0 && gstPerc == 0)
{
	reports.setTaxPercentage(iGstPerc);
}


reports.setTaxAmount(Double.parseDouble(object[13].toString()));
Double totalAmount = (Double.parseDouble(object[14].toString())/*- perProductDiscount*/);
				String reportTotalAmount = formatter.format(totalAmount);				
				reports.setTotalAmount(Double.parseDouble(reportTotalAmount));
				reports.setUnitName(object[16].toString());
				reports.setDiscountPercentage(Double.parseDouble(object[17].toString()));

				Double totalAmt = Double.parseDouble(reportTotalAmount);
				Double disPer = Double.parseDouble(object[17].toString());
				
				Double disAmt =  (totalAmt)*(disPer)/100;
				reports.setDiscountAmount(disAmt.toString());
				
				purchaseList.add(reports); 
		
			}}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		return purchaseList;
		
		
	}



public List<PurchaseDetailsFromGoodsReceive> GSTSummaryReportBetweenTwoDates(
		String fDate, String tDate) {

	System.out.println(fDate+"first Date In dao");
System.out.println(tDate+"Second Date In dao");
HibernateUtility hbu=null;
Session session=null;
List<PurchaseDetailsFromGoodsReceive> purchaseList=null;
try
{
	hbu = HibernateUtility.getInstance();
 session = hbu.getHibernateSession();
 Query query2 = session.createSQLQuery("select bill_number, purchaseDate, product_name, company_Name,  dc_number, batch_no, barcodeNo, buy_price, sale_price, mrp, weight, abs(quantity), Per_Product_Total,tax_percentage,iGstPercentage from goods_receive where purchaseDate between '"+fDate+"' and '"+tDate+"'");

List<Object[]> list = query2.list();
purchaseList= new ArrayList<PurchaseDetailsFromGoodsReceive>(0);


for (Object[] object : list) {
		
	PurchaseDetailsFromGoodsReceive reports = new PurchaseDetailsFromGoodsReceive();
	
	reports.setBillNo(object[0].toString());
	reports.setPurchaseDate(object[1].toString());
	reports.setProductName(object[2].toString());
	reports.setCompanyName(object[3].toString());
	reports.setDcNo(object[4].toString());
	//reports.setBatchNo(object[5].toString());
reports.setBarcodeNo(object[6].toString());
reports.setBuyPrice(Double.parseDouble(object[7].toString()));
reports.setSalePrice(Double.parseDouble(object[8].toString()));
reports.setMrp(Double.parseDouble(object[9].toString()));
reports.setWeight(Double.parseDouble(object[10].toString()));
reports.setQuantity2(Double.parseDouble(object[11].toString()));
reports.setTotalAmount(Double.parseDouble(object[12].toString()));
reports.setTaxPercentage(Double.parseDouble(object[13].toString()));
reports.setIgstPercentage(Double.parseDouble(object[14].toString()));

Double gstPerc=reports.getTaxPercentage();
Double igstPerc=reports.getIgstPercentage();
Double Amount=reports.getBuyPrice();
Double Qnty=reports.getQuantity2();

DecimalFormat df=new DecimalFormat("#0.00");
			
			if(gstPerc != 0.0){
				Double txAmnt=(Amount*Qnty);
				Double txAmnt2=(txAmnt*(gstPerc/100));
				reports.setSgstAmount(Double.parseDouble(df.format(txAmnt2/2)));
				reports.setCgstAmount(Double.parseDouble(df.format(txAmnt2/2)));
				reports.setIgstAmount(0.0);
			}
			else{
				Double txAmnt=(Amount*Qnty);
				Double txAmnt2=(txAmnt*(igstPerc/100));
				reports.setSgstAmount(0.0);
				reports.setCgstAmount(0.0);
				reports.setIgstAmount(Double.parseDouble(df.format(txAmnt2)));
				
			}
			
			purchaseList.add(reports); 
	
		}}
	catch(Exception e)
	{
		e.printStackTrace();
	}
	return purchaseList;
	
	
}

/*Upcoming expiry Date seed products*/
public List upcomingExpirySeedProducts(){
	HibernateUtility hbu=null;
	Session session=null;
	List<GoodsReceiveDetail> expiryList=null;
	try
	{
		hbu = HibernateUtility.getInstance();
	 session = hbu.getHibernateSession();
	 
	 SimpleDateFormat dateFormat1 = new SimpleDateFormat("yyyyMMdd");
	Date dateobj = new Date();
	String todayDate = dateFormat1.format(dateobj);
 
 Query query2 = session.createSQLQuery("SELECT product_name, company_Name, weight, batch_no,expiry_date,dupQuantity FROM goods_receive WHERE fkCategoryId=3 AND DATEDIFF(expiry_date,"+todayDate+")<=10 AND DATEDIFF(expiry_date,"+todayDate+")>0");

List<Object[]> list = query2.list();
System.out.println("Expiry List size = ="+list.size());
        expiryList= new ArrayList<GoodsReceiveDetail>(0);
		
		
		for (Object[] o : list) {
				
			GoodsReceiveDetail reports = new GoodsReceiveDetail();
			reports.setProductName(o[0].toString());
			reports.setCompany(o[1].toString());
			reports.setWeight(o[2].toString());
			reports.setBatchNumber(o[3].toString());
			reports.setExpiryDate(o[4].toString());
			reports.setStock(o[5].toString());
			expiryList.add(reports); 
	
		}}
	catch(Exception e)
	{
		e.printStackTrace();
	}
	return expiryList;
	
}


/*Upcoming expiry Date pesticide products*/
public List upcomingExpiryPesticideProducts(){
	HibernateUtility hbu=null;
	Session session=null;
	List<GoodsReceiveDetail> expiryList=null;
	try
	{
		hbu = HibernateUtility.getInstance();
	 session = hbu.getHibernateSession();
	 
	 SimpleDateFormat dateFormat1 = new SimpleDateFormat("yyyyMMdd");
	Date dateobj = new Date();
	String todayDate = dateFormat1.format(dateobj);
 
 Query query2 = session.createSQLQuery("SELECT product_name, company_Name, weight, batch_no,expiry_date,dupQuantity FROM goods_receive WHERE fkCategoryId=2 AND DATEDIFF(expiry_date,"+todayDate+")<=10 AND DATEDIFF(expiry_date,"+todayDate+")>0");

List<Object[]> list = query2.list();
System.out.println("Expiry List size = ="+list.size());
        expiryList= new ArrayList<GoodsReceiveDetail>(0);
		
		
		for (Object[] o : list) {
				
			GoodsReceiveDetail reports = new GoodsReceiveDetail();
			reports.setProductName(o[0].toString());
			reports.setCompany(o[1].toString());
			reports.setWeight(o[2].toString());
			reports.setBatchNumber(o[3].toString());
			reports.setExpiryDate(o[4].toString());
			reports.setStock(o[5].toString());
			expiryList.add(reports); 
	
		}}
	catch(Exception e)
	{
		e.printStackTrace();
	}
	return expiryList;
	
}


public List getAllProductForNotification()
{
	List<GoodsReceiveDetail> List = new ArrayList<GoodsReceiveDetail> ();
	String JDBC_DRIVER = "com.mysql.jdbc.Driver";  
String DB_URL = "jdbc:mysql://localhost:3306/fertilizer";

SimpleDateFormat dateFormat1 = new SimpleDateFormat("yyyyMMdd");
Date dateobj = new Date();
String todayDate = dateFormat1.format(dateobj);
//Class.forName("com.mysql.jdbc.Driver");

  Connection conn = null;
  PreparedStatement  stmt = null;
   try{
      //STEP 2: Register JDBC driver
  Class.forName("com.mysql.jdbc.Driver");

  //STEP 3: Open a connection
  System.out.println("Connecting to database...");
  conn = DriverManager.getConnection(DB_URL,"root","root");

  //STEP 4: Execute a query
  System.out.println("Creating statement...");
  String sql;
  sql = "SELECT g.product_name, g.batch_no, g.expiry_date,i.stock FROM goods_receive g RIGHT JOIN item_stockforpestiandseed i ON g.batch_no = i.batchNo WHERE g.fkCategoryId in (2,3) AND DATEDIFF(g.expiry_date,"+todayDate+")<=10 AND DATEDIFF(g.expiry_date,"+todayDate+")>0";
  stmt = conn.prepareStatement(sql);
//  stmt.setString(1,todayDate);
  //stmt.setString(2,todayDate);
  ResultSet rs = stmt.executeQuery(sql);

 // List<GoodsReceiveDetail> List = new ArrayList<GoodsReceiveDetail> ();
  //STEP 5: Extract data from result set
  while(rs.next()){
	  GoodsReceiveDetail reports = new GoodsReceiveDetail();
		reports.setProductName(rs.getString(1));
		reports.setBatchNumber(rs.getString(2));
		reports.setExpiryDate(rs.getString(3).toString());
		reports.setStock(rs.getString(4).toString());
		
		List.add(reports); 

  }
  //STEP 6: Clean-up environment
      rs.close();
      stmt.close();
      conn.close();
   }catch(SQLException se){
      //Handle errors for JDBC
      se.printStackTrace();
   }catch(Exception e){
      //Handle errors for Class.forName
      e.printStackTrace();
   }finally{
      //finally block used to close resources
  try{
     if(stmt!=null)
        stmt.close();
  }catch(SQLException se2){
  }// nothing we can do
  try{
     if(conn!=null)
        conn.close();
  }catch(SQLException se){
     se.printStackTrace();
  }//end finally try
   }//end try
   System.out.println("Goodbye!");
   return List;
/*HibernateUtility hbu = null;
	Session session =  null;
	Query query = null;
	List<GoodsReceiveDetail> productList = null;
 try {
		 hbu = HibernateUtility.getInstance();
		 
		 session = hbu.getHibernateSession();
		
		 Date dateobj = new Date();
		 SimpleDateFormat dateFormat1 = new SimpleDateFormat("yyyyMMdd");
			
			String todayDate = dateFormat1.format(dateobj);
			
		 System.out.println(dateobj+"in dao");
		// query = session.createSQLQuery("SELECT g.product_name, g.batch_no, g.expiry_date,s.supplier_name FROM goods_receive g RIGHT JOIN supplier_details s ON g.fk_supplier_id = s.pk_supplier_id WHERE g.fkCategoryId in (2,3);");
		 query = session.createSQLQuery("SELECT g.product_name, g.batch_no, g.expiry_date,i.stock FROM goods_receive g RIGHT JOIN item_stockforpestiandseed i ON g.batch_no = i.batchNo WHERE g.fkCategoryId in (2,3) AND DATEDIFF(g.expiry_date,"+todayDate+")<=10 AND DATEDIFF(g.expiry_date,"+todayDate+")>0;");
		
			System.out.println(dateFormat1.format(dateobj));
			
		 
		 List<Object[]> List = query.list();
			productList = new ArrayList<GoodsReceiveDetail>(0);
			
			System.out.println(List.size()+"List Size");
			
			for (Object[] object : List) {
				
				GoodsReceiveDetail reports = new GoodsReceiveDetail();
				reports.setProductName(object[0].toString());
				reports.setBatchNumber(object[1].toString());
				reports.setExpiryDate(object[2].toString());
				reports.setStock(object[3].toString());
				
				
				productList.add(reports); 
				System.out.println(reports);
		
			}
	} catch (Exception e) {
		Log.error("Error in getAllProductForBilling", e);
	}
	 
	 finally
	 {
		 if (session!=null) {
			hbu.closeSession(session);
		}
	 }
			return productList;
	*/
}

/*	Seed stock less than 10 for Notification*/
public List getAllSeedAndPestiForStockNotification()
{
	HibernateUtility hbu = null;
	Session session =  null;
	Query query = null;
	List<GoodsReceiveDetail> productList = null;
 try {
		 hbu = HibernateUtility.getInstance();
		 session = hbu.getHibernateSession();
		 query = session.createSQLQuery("select ProductName, CompanyName, Weight,batch_number,Quantity from stock_detail WHERE Quantity < 10 AND FkCatId= 3");

	
 
 List<Object[]> List = query.list();
	productList = new ArrayList<GoodsReceiveDetail>(0);
	
	System.out.println(List.size()+"List Size");
		
		for (Object[] object : List) {
			
			GoodsReceiveDetail reports = new GoodsReceiveDetail();
			reports.setProductName(object[0].toString());
			reports.setCompany(object[1].toString());
			reports.setWeight(object[2].toString());
			reports.setBatchNumber(object[3].toString());
			reports.setStock(object[4].toString());
			productList.add(reports); 
			System.out.println(reports);
	
		}
} catch (Exception e) {
	Log.error("Error in getAllProductForBilling", e);
	}
	 
	 finally
	 {
		 if (session!=null) {
			hbu.closeSession(session);
		}
	 }
			return productList;
	
}


/*	Pesticide stock less than 10 for notification*/
public List getPestiStockForStockNotification()
{
	HibernateUtility hbu = null;
	Session session =  null;
	Query query = null;
	List<GoodsReceiveDetail> productList = null;
 try {
		 hbu = HibernateUtility.getInstance();
		 session = hbu.getHibernateSession();
		 query = session.createSQLQuery("select ProductName, CompanyName, Weight,batch_number,Quantity from stock_detail WHERE Quantity < 10 AND FkCatId= 2");

	
 
 List<Object[]> List = query.list();
	productList = new ArrayList<GoodsReceiveDetail>(0);
	
	System.out.println(List.size()+"List Size");
		
		for (Object[] object : List) {
			
			GoodsReceiveDetail reports = new GoodsReceiveDetail();
			reports.setProductName(object[0].toString());
			reports.setCompany(object[1].toString());
			reports.setWeight(object[2].toString());
			reports.setBatchNumber(object[3].toString());
			reports.setStock(object[4].toString());
			
			
			
			productList.add(reports); 
			System.out.println(reports);
	
		}
} catch (Exception e) {
	Log.error("Error in getAllProductForBilling", e);
	}
	 
	 finally
	 {
		 if (session!=null) {
			hbu.closeSession(session);
		}
	 }
			return productList;
	
}





public List getAllFertilizerForStockNotification()
{
	HibernateUtility hbu = null;
	Session session =  null;
	Query query = null;
	List<GoodsReceiveDetail> productList = null;
 try {
		 hbu = HibernateUtility.getInstance();
		 session = hbu.getHibernateSession();
		 query = session.createSQLQuery("select ProductName, CompanyName, Weight,Quantity from stock_detail WHERE Quantity < 10 AND FkCatId= 1");

	
 
 List<Object[]> List = query.list();
	productList = new ArrayList<GoodsReceiveDetail>(0);
	
	System.out.println(List.size()+"List Size");
		
		for (Object[] object : List) {
			
			GoodsReceiveDetail reports = new GoodsReceiveDetail();
			reports.setProductName(object[0].toString());
			reports.setCompany(object[1].toString());
			reports.setWeight(object[2].toString());
			reports.setStock(object[4].toString());
			productList.add(reports); 
			System.out.println(reports);
	
		}
} catch (Exception e) {
	Log.error("Error in getAllProductForBilling", e);
	}
	 
	 finally
	 {
		 if (session!=null) {
			hbu.closeSession(session);
		}
	 }
			return productList;
	
}




public List<StockDetail> getStockReportAsPerShop(String fk_shop_id,HttpServletRequest request) {
	
	HttpSession usersession = request.getSession(true);
	String userid = (String)usersession.getAttribute("userid");
	String shopid = (String)usersession.getAttribute("shopid");
	String usertype = (String)usersession.getAttribute("usertype");
	
	HibernateUtility hbu=null;
	Session session=null;
	List<StockDetail> stockList = null;
	Query query = null;
	String ss = "admin";
	
	try
	{
		hbu = HibernateUtility.getInstance();
		session = hbu.getHibernateSession();
		//Query query = session.createSQLQuery("SELECT ProductName, CompanyName, weight, quantity, stock_in_kg AS demo, unit FROM stock_detail WHERE fk_shop_id = '"+fk_shop_id+"'"+" AND stock_in_kg !=0 UNION ALL SELECT ProductName, CompanyName, weight, quantity, Stock_in_ltr AS demo, unit FROM stock_detail WHERE fk_shop_id = '"+fk_shop_id+"'"+" AND Stock_in_ltr !=0 UNION ALL SELECT ProductName, CompanyName, weight, quantity, total_piece_quantity AS demo, unit FROM stock_detail WHERE fk_shop_id = '"+fk_shop_id+"'"+" AND total_piece_quantity !=0");

 query = session.createSQLQuery("SELECT sd.ProductName, sd.CompanyName, sd.weight, gr.quantity, sd.avail_Quantity, su.unit_name,sd.shop_name FROM stock_detail sd join product_details pd on sd.productId = pd.pk_product_id join sold_units su on pd.fk_unit_id = su.pk_unit_id join goods_receive gr on gr.fk_product_id = sd.productId WHERE sd.ProductName = pd.product_name and sd.CompanyName = pd.manufacturing_company and sd.Weight = pd.weight AND sd.fk_shop_id = '"+fk_shop_id+"' GROUP BY pd.product_name");

List<Object[]> list = query.list();
stockList = new ArrayList<StockDetail>(0);


for (Object[] object : list) {
	
	StockDetail reports = new StockDetail();
	
	reports.setProductName(object[0].toString());
	reports.setCompanyName(object[1].toString());
	reports.setWeight((Double)object[2]);
	reports.setQuantity((Double)object[3]);	
	reports.setAvailableeQuantity((Double)object[4]);		
	reports.setUnit(object[5].toString());
	reports.setShopname(object[6].toString());
			stockList.add(reports); 
	
		}}
	catch(Exception e)
	{
		e.printStackTrace();	
	}
	return stockList;	
	



}




public List getAllBillNo()
{
	HibernateUtility hbu = null;
	Session session =  null;
	Query query = null;
	 List list = null;
 try {
		 hbu = HibernateUtility.getInstance();
		 session = hbu.getHibernateSession();
		 query = session.createQuery("from GoodsReceiveBean group by billNum");
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


// get All Purchase Item Name In Purchase Return Form
public List getAllIetmByBillNo(String bill_no, String supplier, HttpServletRequest request) 
{
	HttpSession usersession = request.getSession(true);
	String userid = (String)usersession.getAttribute("userid");
	String shopid = (String)usersession.getAttribute("shopid");
	
	HibernateUtility hbu=null;
	Session session=null;
	List list=null;
	
	try
	{
	 hbu=HibernateUtility.getInstance();
	 session=hbu.getHibernateSession();
	 
	 //Query query=session.createSQLQuery("SELECT p.pk_goods_receive_id ,s.supplier_name,p.dc_number,p.product_name,p.buy_price,p.sale_price,p.weight,p.quantity,p.batch_no,p.fkCategoryId,p.purchaseDate,p.mrp,p.tax_percentage,p.barcodeNo,p.company_Name,p.dupQuantity,c.cat_name,p.fk_product_id from goods_receive p left JOIN supplier_details s on p.fk_supplier_id = s.pk_supplier_id left JOIN categories c on p.fkCategoryId = c.pk_cat_id WHERE p.bill_number=:bill_no AND p.fk_supplier_id=:supplier AND dupQuantity>0");
	 Query query=session.createSQLQuery("SELECT p.pk_goods_receive_id ,s.supplier_name,p.product_name,p.buy_price,p.sale_price,p.weight,p.quantity,p.batch_no,p.fkCategoryId,p.purchaseDate,p.mrp,p.tax_percentage,p.barcodeNo,p.company_Name, sd.avail_Quantity, c.cat_name, p.fk_product_id,ps.saleunit,ps.unitvalue, sd.PkStockId FROM goods_receive p LEFT JOIN supplier_details s ON p.fk_supplier_id = s.pk_supplier_id LEFT JOIN categories c ON p.fkCategoryId = c.pk_cat_id LEFT JOIN stock_detail sd ON sd.productId = p.fk_product_id LEFT JOIN product_details ps ON sd.productId=ps.pk_product_id WHERE p.bill_number='"+bill_no+"' AND p.fk_supplier_id='"+supplier+"' AND p.fk_shop_id ='"+shopid+"' AND dupQuantity > 0");

	 //query.setParameter("bill_no", bill_no);
	 //query.setParameter("supplier", supplier);

	 list = query.list();
 
	 System.out.println("List size====> "+list.size());
	}catch(RuntimeException e){
	
		Log.error("Error in getAllIetmByBillNo",e);
	}finally{
		if(session!=null){
			
			hbu.closeSession(session);
		}
			
	}
	
	return list;
}

// get All Purchase Item Name In credit note conversion Form
public List getAllIetmBySupplierForCreditNoteConversion(String bill_no1, String supplier, HttpServletRequest request) 
{		
	System.out.println("pr get grid DAO");
	
	HttpSession usersession = request.getSession(true);
	String userid = (String)usersession.getAttribute("userid");
	String shopid = (String)usersession.getAttribute("shopid");
	
	String status = "False";
	HibernateUtility hbu=null;
	Session session=null;
	List list=null;
		
	 try{
	 hbu=HibernateUtility.getInstance();
	 session=hbu.getHibernateSession();
	 
	 Query query=session.createSQLQuery("SELECT p.pk_purchase_return_id, s.supplier_name, p.product_name, p.buy_price, p.sale_price, p.weight, p.quantity, p.batch_no, p.fk_cat_id, p.purchase_date, p.mrp, p.tax_percentage, p.barcode_no, p.company_name, p.return_quantity, c.cat_name, p.fk_product_id, p.tax_amount, p.total, gr.pk_goods_receive_id  FROM purchase_return p LEFT JOIN supplier_details s on p.fk_supplier_id = s.pk_supplier_id LEFT JOIN categories c on p.fk_cat_id = c.pk_cat_id LEFT JOIN goods_receive gr on gr.fk_product_id = p.fk_product_id WHERE p.bill_no='"+bill_no1+"' AND p.fk_supplier_id='"+supplier+"' AND p.return_status = '"+status+"' AND p.fk_shop_id ='"+shopid+"' AND p.return_quantity > 0");
	 list = query.list();
	 
	System.out.println(list.size()+"===List size");
	}catch(RuntimeException e){
		
	Log.error("Error in getAllIetmBySupplierForCreditNoteConversion()",e);
	}finally{
		if(session!=null){		
			hbu.closeSession(session);
	    }	
	}		
	return list;
}

public List<CustomerBean> getAllProductDetailsForFrtiBillAsPerProductName(
		String proName, String company, String weight) {

	
	HibernateUtility hbu=null;
	Session session=null;
	List<CustomerBean> itemlist=null;
	try
	{
		
		    System.out.println("shreemant");
		hbu = HibernateUtility.getInstance();
 session = hbu.getHibernateSession();
 String sqlQuery = "SELECT pk_goods_receive_id , fk_supplier_id, fkCategoryId, product_name , sale_price, weight, dupQuantity, mrp, company_Name, barcodeNo, tax_percentage FROM goods_receive WHERE product_name =:proName AND company_Name =:company AND weight =:weight";

 Query query=session.createSQLQuery(sqlQuery);
 query.setParameter("proName", proName);
 query.setParameter("company", company);
 query.setParameter("weight", weight);
List<Object[]> list = query.list();

 itemlist = new ArrayList<CustomerBean>(0);
 for (Object[] objects : list) {
 System.out.println(Arrays.toString(objects));
 CustomerBean bean = new CustomerBean();
 System.out.println("itemlist");
 bean.setPkGoodreceiveId(Long.parseLong(objects[0].toString()));
 bean.setSupplier_id(Long.parseLong(objects[1].toString()));
 bean.setCat_id(Long.parseLong(objects[2].toString()));
 bean.setItemName(objects[3].toString());
 bean.setSalePrice(Double.parseDouble(objects[4].toString()));
 bean.setWeight(Double.parseDouble(objects[5].toString()));
 bean.setQuantity(Double.parseDouble(objects[6].toString()));
 bean.setMrp(Double.parseDouble(objects[7].toString()));
 bean.setCompanyName(objects[8].toString());
 bean.setBarcodeNo(Long.parseLong(objects[9].toString()));
 bean.setVatPercentage(Double.parseDouble(objects[10].toString()));
 
 System.out.println("itemlist");
	
	itemlist.add(bean);
	
     }
}
catch(RuntimeException e)
{
	Log.error("Error in getAllItemDetails(String key)", e);	
	}finally
	{if(session!=null){
		hbu.closeSession(session);	
	}
	}
	
	return itemlist;
	
	

}



/*	public List<CustomerBean> getAllProductDetailsForFrtiBillAsPerProductName(
			String proName, String company, String weight) {

		
		HibernateUtility hbu=null;
		Session session=null;
		List<CustomerBean> itemlist=null;
		try
		{
			
			    System.out.println("shreemant");
				hbu = HibernateUtility.getInstance();
		 session = hbu.getHibernateSession();
		 String sqlQuery = "SELECT pk_goods_receive_id , fk_supplier_id, fkCategoryId, product_name , sale_price, weight, dupQuantity, mrp, company_Name, barcodeNo, tax_percentage FROM goods_receive WHERE product_name =:proName AND company_Name =:company AND weight =:weight";
		
		 Query query=session.createSQLQuery(sqlQuery);
		 query.setParameter("proName", proName);
		 query.setParameter("company", company);
		 query.setParameter("weight", weight);
			List<Object[]> list = query.list();
	
			 itemlist = new ArrayList<CustomerBean>(0);
		     for (Object[] objects : list) {
			 System.out.println(Arrays.toString(objects));
			 CustomerBean bean = new CustomerBean();
			 System.out.println("itemlist");
			 bean.setPkGoodreceiveId(Long.parseLong(objects[0].toString()));
			 bean.setSupplier_id(Long.parseLong(objects[1].toString()));
			 bean.setCat_id(Long.parseLong(objects[2].toString()));
			 bean.setItemName(objects[3].toString());
			 bean.setSalePrice(Double.parseDouble(objects[4].toString()));
			 bean.setWeight(Double.parseDouble(objects[5].toString()));
			 bean.setQuantity(Double.parseDouble(objects[6].toString()));
			 bean.setMrp(Double.parseDouble(objects[7].toString()));
			 bean.setCompanyName(objects[8].toString());
			 bean.setBarcodeNo(Long.parseLong(objects[9].toString()));
			 bean.setVatPercentage(Double.parseDouble(objects[10].toString()));
			 
			 System.out.println("itemlist");
			
			itemlist.add(bean);
			
		     }
		}
		catch(RuntimeException e)
		{
			Log.error("Error in getAllItemDetails(String key)", e);	
		}finally
		{if(session!=null){
			hbu.closeSession(session);	
		}
		}
		
		return itemlist;
		
		

	}
	*/



//fetching product detail as per batch for seed pesti bill
public List<CustomerBean> getAllProductDetailsForSeedBillAsPerBatchAndStock(
		String batchNum, String stock) {
	
	HibernateUtility hbu=null;
	Session session=null;
	List<CustomerBean> itemlist=null;
	try
	{
		
		    System.out.println("shreemant");
		hbu = HibernateUtility.getInstance();
 session = hbu.getHibernateSession();
 String sqlQuery = "SELECT pk_goods_receive_id , fk_supplier_id, fkCategoryId, product_name , sale_price, weight, dupQuantity, mrp, company_Name, barcodeNo, tax_percentage, expiry_date FROM goods_receive WHERE batch_no=:batchNum";

 Query query=session.createSQLQuery(sqlQuery);
 query.setParameter("batchNum", batchNum);
 query.setParameter("stock", stock);
 System.out.println("batchNum in dao = ="+batchNum);
 System.out.println("stock in dao = ="+stock);

List<Object[]> list = query.list();

 itemlist = new ArrayList<CustomerBean>(0);
 for (Object[] objects : list) {
 System.out.println(Arrays.toString(objects));
 CustomerBean bean = new CustomerBean();
 System.out.println("itemlist");
 bean.setPkGoodreceiveId(Long.parseLong(objects[0].toString()));
 bean.setSupplier_id(Long.parseLong(objects[1].toString()));
 bean.setCat_id(Long.parseLong(objects[2].toString()));
 bean.setItemName(objects[3].toString());
 bean.setSalePrice(Double.parseDouble(objects[4].toString()));
 bean.setWeight(Double.parseDouble(objects[5].toString()));
 bean.setQuantity(Double.parseDouble(objects[6].toString()));
 bean.setMrp(Double.parseDouble(objects[7].toString()));
 bean.setCompanyName(objects[8].toString());
 bean.setBarcodeNo(Long.parseLong(objects[9].toString()));
 bean.setVatPercentage(Double.parseDouble(objects[10].toString()));
 bean.setExpiryDate(objects[11].toString());
 System.out.println("itemlist");
	
	itemlist.add(bean);
	
     }
}
catch(RuntimeException e)
{
	Log.error("Error in getAllItemDetails(String key)", e);	
	}finally
	{if(session!=null){
		hbu.closeSession(session);	
	}
	}							
	return itemlist;						
}

public Map getAllProductDetailsForFrtiBillAsPerProductName1(String proName, String company, String weight, String batchNum, String catId, String subCatId, String ShopId, String tempExpiryDate, String barcode, String barcodeNo,String packed,String proid,HttpServletRequest request)throws Exception
{	
	HttpSession usersession = request.getSession(true);
	String userid = (String)usersession.getAttribute("userid");
	String shopid = (String)usersession.getAttribute("shopid");
	
  	HibernateUtility hbu=null;
	Session session=null;
	//List<CustomerBean> itemlist=null;
    List<Object[]> list = null;
    List<CustomerBean> itemlist=null;
    Map map1 = new HashMap();
    System.out.println("barcodeNo ==       "+barcodeNo);
    System.out.println("Product Name Barcode ==        "+proName);

    try
	{				
	 String sqlQuery = "";
	 hbu = HibernateUtility.getInstance();
	 session = hbu.getHibernateSession();

	 if(barcodeNo == null || barcodeNo == "" || barcodeNo.isEmpty())
	 {									 
		 System.out.println("barcodeNo ===> "+barcodeNo);
//		 sqlQuery = "SELECT p.product_name, g.weight, p.manufacturing_company,g.tax_percentage,s.unit_name,p.fk_cat_id,p.fk_subCat_id,p.hsn,t.tax_name,p.sale_price_ex_tax, sd.total_kg_ltr_piece_stock, g.iGstPercentage, g.expiry_date, g.stockPerEntry, g.batch_no, g.barcodeNo, p.mrp, p.sale_price, g.pk_goods_receive_id, p.sgst, p.cgst, p.pk_product_id, s.pk_unit_id, t.pk_tax_id,g.barcode_ID FROM product_details p LEFT JOIN sold_units s ON fk_unit_id = s.pk_unit_id LEFT JOIN tax_details t ON fk_tax_id = t.pk_tax_id left join goods_receive g on g.fk_product_id=p.pk_product_id LEFT JOIN stock_detail sd on p.product_name = sd.ProductName WHERE g.barcodeNo ='"+barcode+"' AND g.fk_shop_id ='"+shopid+"'";

		 //sqlQuery = "SELECT p.product_name, g.weight, p.manufacturing_company,g.tax_percentage,s.unit_name,p.fk_cat_id,p.fk_subCat_id,p.hsn,t.tax_name,p.sale_price_ex_tax, sd.total_kg_ltr_piece_stock, g.iGstPercentage, g.expiry_date, g.stockPerEntry, g.batch_no, g.barcodeNo, p.mrp, p.sale_price, g.pk_goods_receive_id, p.sgst, p.cgst, p.pk_product_id, s.pk_unit_id, t.pk_tax_id,g.barcode_ID FROM product_details p LEFT JOIN sold_units s ON fk_unit_id = s.pk_unit_id LEFT JOIN tax_details t ON fk_tax_id = t.pk_tax_id left join goods_receive g on g.fk_product_id=p.pk_product_id LEFT JOIN stock_detail sd on p.product_name = sd.ProductName WHERE g.barcodeNo ='"+barcode+"' AND sd.fk_shop_id ='"+shopid+"'";
	
		 
		 //sqlQuery = "SELECT p.product_name, g.weight, p.manufacturing_company,g.tax_percentage,s.unit_name,p.fk_cat_id,p.fk_subCat_id,p.hsn,t.tax_name,p.sale_price_ex_tax, sd.total_kg_ltr_piece_stock, g.iGstPercentage, g.expiry_date, g.stockPerEntry, g.batch_no, g.barcodeNo, p.mrp, p.sale_price, g.pk_goods_receive_id, p.sgst, p.cgst, p.pk_product_id, s.pk_unit_id, t.pk_tax_id,g.barcode_ID FROM product_details p LEFT JOIN sold_units s ON fk_unit_id = s.pk_unit_id LEFT JOIN tax_details t ON fk_tax_id = t.pk_tax_id left join goods_receive g on g.fk_product_id=p.pk_product_id LEFT JOIN stock_detail sd on p.product_name = sd.ProductName WHERE  sd.fk_shop_id ='"+shopid+"'";
		   sqlQuery = "SELECT sd.ProductName, sd.Weight, sd.CompanyName,g.tax_percentage,sd.unit,sd.FkCatId,sd.FkSubCatId,p.hsn,t.tax_name,p.sale_price_ex_tax, sd.total_kg_ltr_piece_stock, g.iGstPercentage, g.expiry_date, g.stockPerEntry, g.batch_no, g.barcodeNo, p.mrp, p.sale_price, g.pk_goods_receive_id, p.sgst, p.cgst, p.pk_product_id, s.pk_unit_id, t.pk_tax_id,g.barcode_ID,sd.packing_type,sc.sub_cat_name  FROM product_details p LEFT JOIN sold_units s ON fk_unit_id = s.pk_unit_id LEFT JOIN tax_details t ON fk_tax_id = t.pk_tax_id left join goods_receive g on g.fk_product_id=p.pk_product_id LEFT JOIN stock_detail sd on p.product_name = sd.ProductName LEFT JOIN sub_categories sc ON sd.FkSubCatId=sc.pk_subcat_id WHERE  sd.fk_shop_id ='"+shopid+"' AND sd.ProductName='"+proName+"' AND sd.Weight='"+weight+"' AND sd.packing_type = '"+packed+"' AND p.pk_product_id= '"+proid+"'  AND g.quantity >0 "; 
	 
	 
	 }
	
	 else if(barcode == null || barcode == "" || barcode.isEmpty())
	 {
		 System.out.println("Product Name Barcode ===> "+barcode);
//		 sqlQuery = "SELECT p.product_name, g.weight, p.manufacturing_company,g.tax_percentage,s.unit_name,p.fk_cat_id,p.fk_subCat_id,p.hsn,t.tax_name,p.sale_price_ex_tax, sd.total_kg_ltr_piece_stock, g.iGstPercentage, g.expiry_date, g.stockPerEntry, g.batch_no, g.barcodeNo, p.mrp, p.sale_price, g.pk_goods_receive_id, p.sgst, p.cgst, p.pk_product_id, s.pk_unit_id, t.pk_tax_id,g.barcode_ID FROM product_details p LEFT JOIN sold_units s ON fk_unit_id = s.pk_unit_id LEFT JOIN tax_details t ON fk_tax_id = t.pk_tax_id left join goods_receive g on g.fk_product_id=p.pk_product_id LEFT JOIN stock_detail sd on p.product_name = sd.ProductName WHERE g.barcodeNo ='"+barcodeNo+"' AND g.fk_shop_id ='"+shopid+"'";
	
		 
		 
//--		 sqlQuery = "SELECT sd.ProductName, sd.Weight, sd.CompanyName,g.tax_percentage,sd.unit,sd.FkCatId,sd.FkSubCatId,p.hsn,t.tax_name,p.sale_price_ex_tax, sd.total_kg_ltr_piece_stock, g.iGstPercentage, g.expiry_date, g.stockPerEntry, g.batch_no, g.barcodeNo, p.mrp, p.sale_price, g.pk_goods_receive_id, p.sgst, p.cgst, p.pk_product_id, s.pk_unit_id, t.pk_tax_id,g.barcode_ID,sd.packing_type,sc.sub_cat_name  FROM product_details p LEFT JOIN sold_units s ON fk_unit_id = s.pk_unit_id LEFT JOIN tax_details t ON fk_tax_id = t.pk_tax_id left join goods_receive g on g.fk_product_id=p.pk_product_id LEFT JOIN stock_detail sd on p.product_name = sd.ProductName LEFT JOIN sub_categories sc ON sd.FkSubCatId=sc.pk_subcat_id WHERE g.barcodeNo ='"+barcodeNo+"' AND sd.fk_shop_id ='"+shopid+"'  AND sd.ProductName='"+proName+"' AND sd.Weight='"+weight+"' AND sd.packing_type = '"+packed+"' AND p.pk_product_id= '"+proid+"'";
		 sqlQuery = "SELECT sd.ProductName, sd.Weight, sd.CompanyName,g.tax_percentage,sd.unit,sd.FkCatId,sd.FkSubCatId,p.hsn,t.tax_name,p.sale_price_ex_tax, sd.total_kg_ltr_piece_stock, g.iGstPercentage, g.expiry_date, g.stockPerEntry, g.batch_no, g.barcodeNo, p.mrp, p.sale_price, g.pk_goods_receive_id, p.sgst, p.cgst, p.pk_product_id, s.pk_unit_id, t.pk_tax_id,g.barcode_ID,sd.packing_type,sc.sub_cat_name  FROM product_details p LEFT JOIN sold_units s ON fk_unit_id = s.pk_unit_id LEFT JOIN tax_details t ON fk_tax_id = t.pk_tax_id left join goods_receive g on g.fk_product_id=p.pk_product_id LEFT JOIN stock_detail sd on p.product_name = sd.ProductName LEFT JOIN sub_categories sc ON sd.FkSubCatId=sc.pk_subcat_id WHERE g.barcodeNo ='"+barcodeNo+"' AND sd.fk_shop_id ='"+shopid+"' AND g.quantity >0"; 
		 	Query query = session.createSQLQuery(sqlQuery);
			 
			list = query.list();
			System.out.println("query size - "+query.list().size());
			if(query.list().size()==0) {
				 sqlQuery = "SELECT sd.ProductName, sd.Weight, sd.CompanyName,g.tax_percentage,sd.unit,sd.FkCatId,sd.FkSubCatId,p.hsn,t.tax_name,p.sale_price_ex_tax, sd.total_kg_ltr_piece_stock, g.iGstPercentage, g.expiry_date, g.stockPerEntry, g.batch_no, g.barcodeNo, p.mrp, p.sale_price, g.pk_goods_receive_id, p.sgst, p.cgst, p.pk_product_id, s.pk_unit_id, t.pk_tax_id,g.barcode_ID,sd.packing_type,sc.sub_cat_name  FROM product_details p LEFT JOIN sold_units s ON fk_unit_id = s.pk_unit_id LEFT JOIN tax_details t ON fk_tax_id = t.pk_tax_id left join goods_receive g on g.fk_product_id=p.pk_product_id LEFT JOIN stock_detail sd on p.product_name = sd.ProductName LEFT JOIN sub_categories sc ON sd.FkSubCatId=sc.pk_subcat_id WHERE g.barcode_ID ='"+barcodeNo+"' AND sd.fk_shop_id ='"+shopid+"' AND g.quantity >0"; 

			}
	 
	 }
	 
	/*	
		 if(tempExpiryDate.equalsIgnoreCase("N/A"))
		 {
			 sqlQuery = "SELECT p.product_name, p.weight, p.manufacturing_company,p.tax_percentage,s.unit_name,p.fk_cat_id,p.fk_subCat_id,p.hsn,t.tax_name,g.sale_price, sd.total_kg_ltr_piece_stock, g.sale_price, g.iGstPercentage, g.expiry_date, g.stockPerEntry, g.batch_no, g.barcodeNo, g.mrp FROM product_details p LEFT JOIN sold_units s ON fk_unit_id = s.pk_unit_id LEFT JOIN tax_details t ON fk_tax_id = t.pk_tax_id left join goods_receive g on g.fk_product_id=p.pk_product_id LEFT JOIN stock_detail sd on p.product_name = sd.ProductName WHERE p.product_name ='"+proName+"' AND p.manufacturing_company ='"+company+"' AND p.weight ='"+weight+"' AND p.fk_cat_id ='"+catId+"' AND p.fk_subCat_id ='"+subCatId+"' AND g.barcodeNo ='"+barcode+"' AND ISNULL(g.expiry_date)";
		 }
		 else
		 {
			 System.out.println("Expiry Date ----------> "+tempExpiryDate);
			 String pattern = "yyyy-MM-dd";
			 SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
			 Date date1 = new SimpleDateFormat("dd-MM-yyyy").parse(tempExpiryDate);
			 String expiryDate = simpleDateFormat.format(date1);
			 System.out.println(expiryDate);
			 
			 sqlQuery = "SELECT p.product_name, p.weight, p.manufacturing_company,p.tax_percentage,s.unit_name,p.fk_cat_id,p.fk_subCat_id,p.hsn,t.tax_name,g.sale_price,sd.total_kg_ltr_piece_stock, g.sale_price, g.iGstPercentage, g.expiry_date, g.stockPerEntry, g.batch_no, g.barcodeNo, g.mrp FROM product_details p LEFT JOIN sold_units s ON fk_unit_id = s.pk_unit_id LEFT JOIN tax_details t ON fk_tax_id = t.pk_tax_id LEFT JOIN goods_receive g ON g.fk_product_id=p.pk_product_id LEFT JOIN stock_detail sd ON p.product_name = sd.ProductName WHERE p.product_name ='"+proName+"' AND p.manufacturing_company ='"+company+"' AND p.weight ='"+weight+"' AND p.fk_cat_id ='"+catId+"' AND p.fk_subCat_id ='"+subCatId+"' AND g.barcodeNo ='"+barcode+"' OR g.expiry_date = '"+expiryDate+"'";
		 }
	*/	 
	 	Query query = session.createSQLQuery(sqlQuery);
	 
		list = query.list();
		
		System.out.println("List Size --> "+list.size());
		
		 itemlist = new ArrayList<CustomerBean>(0);
	     for (Object[] objects : list) 
	     {
		
		 CustomerBean bean = new CustomerBean();
										 System.out.println("rslt - -  "+Arrays.toString(objects));
		 bean.setItemName(objects[0].toString());
		 bean.setWeight(Double.parseDouble(objects[1].toString()));
		 bean.setCompanyName(objects[2].toString());
		 bean.setTaxPercentage(Double.parseDouble(objects[3].toString()));
		 
		 bean.setUnitName(objects[4].toString());
	 
	 bean.setCat_id(Long.parseLong(objects[5].toString()));
	 bean.setSub_cat_id(Long.parseLong(objects[6].toString()));
	 bean.setHsn(objects[7].toString());
	 bean.setTaxName(objects[8].toString());
	 bean.setSalePriceEx(objects[9].toString());
	 String sp = objects[9].toString();
	 Double spp = Double.parseDouble(sp);
	 Double q = 1d;
	 Double tot = spp*q;
	 bean.setTotalKgLtrPiece(Double.parseDouble(objects[10].toString()));
	 bean.setIgst(Double.parseDouble(objects[11].toString()));
	 if(objects[12] == null)
	 {
		 bean.setExpiryDate("N/A");
	 }else{
		 String pattern = "dd-MM-yyyy";
		 SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
		 Date expDate = (Date)objects[12];
		 String expirydate = simpleDateFormat.format(expDate);			 
		 bean.setExpiryDate(expirydate);
	 }
	 bean.setStockPerEntry(Double.parseDouble(objects[13].toString()));
	 bean.setBatchNumber(objects[14].toString());
	 bean.setBarcodeNo(Long.parseLong(objects[15].toString()));
	 bean.setMrp(Double.parseDouble(objects[16].toString()));
	 bean.setSp(Double.parseDouble(objects[17].toString()));
	 bean.setPkGoodreceiveId(Long.parseLong(objects[18].toString()));
	 bean.setSgst(Double.parseDouble(objects[19].toString()));
	 bean.setCgst(Double.parseDouble(objects[20].toString()));
	 bean.setQuantity(1d);
	 bean.setProductPkId(Long.parseLong(objects[21].toString()));
	 bean.setUnitPkId(Long.parseLong(objects[22].toString()));
	 bean.setTaxPkId(Long.parseLong(objects[23].toString()));
	 bean.setBarcode_id(objects[24].toString());
	 bean.setPacktype(objects[25].toString());
	 bean.setSubcat(objects[26].toString());
	 bean.setChaalanNo(0l);
		System.out.println("`     ````````barcode id if chalan is not there  -  -  "+bean.getBarcode_id());
	/* if(challanNo == null || challanNo == "" || challanNo.isEmpty())
	 {
		 bean.setQuantity(0.0);
		 bean.setNoOfboxes(0.0);
		 bean.setSgst(Double.parseDouble(objects[19].toString()));
		 bean.setCgst(Double.parseDouble(objects[20].toString()));
		 bean.setPkId(Long.parseLong("0"));
	 }
	 else
	 {
		 bean.setSgst(0.0);
		 bean.setCgst(0.0);
		 bean.setQuantity(Double.parseDouble(objects[21].toString()));
		 bean.setPkId(Long.parseLong(objects[22].toString()));
		 bean.setNoOfboxes(Double.parseDouble(objects[23].toString()));
	 }
	*/ 
	 bean.setDiscount(0.0);
	 bean.setDiscountAmount(0.0);
//	 bean.setTotalEx("0");
	 String tot1 = String.valueOf(tot);
	 bean.setTotalEx(tot1);
//	 bean.setTotalEx((objects[17].toString())); 
	 
	 bean.setFreeQuantity(0.0);
	 bean.setSalePrice(0d);
//	 bean.setNoOfboxes(0d);
	 bean.setNoOfboxes(1d); 
	 bean.setTotalQty(0d);
//	 bean.setTotal(0d);	 
//	 bean.setTotal(tot);
	 bean.setTotal(Double.parseDouble(objects[17].toString()));
	 
	 //bean.setLength(0d);
	 //bean.setTableSize(0d);
	// bean.setSqPerfeet(0d);
	 
	/*
	 * String tax=bean.getTaxName(); double taxperc=bean.getVatPercentage(); double
	 * igstTaxPercentage=bean.getIgst(); String taxperc1 =(String.valueOf(taxperc));
	 * 
	 * String combinepercentage = tax+taxperc1;
	 * 
	 * 
	 * if(combinepercentage.equals("GST0.0") || combinepercentage.equals("GST5.0")
	 * || combinepercentage.equals("GST12.0") || combinepercentage.equals("GST18.0")
	 * || combinepercentage.equals("GST28.0")){ bean.setGst(taxperc);
	 * bean.setIgst(0.0);
	 * 
	 * } else{ bean.setGst(0.0); bean.setIgst(igstTaxPercentage); }
	 */
	  
	//								itemlist.add(bean);
		map1.put(bean.getPkId(), bean);
	     }
}
catch(RuntimeException e)
{
	Log.error("Error in getAllItemDetails(String key)", e);	
}finally
{if(session!=null){
	hbu.closeSession(session);	
}
}
	return map1;
}

 public Map getProductByChallanNo(String challanNo, HttpServletRequest request)
 {
	HttpSession usersession = request.getSession(true);
	String userid = (String)usersession.getAttribute("userid");
	String shopid = (String)usersession.getAttribute("shopid");
	 	
	HibernateUtility hbu=null;
	Session session=null;
	//List<CustomerBean> itemlist=null;
	List<Object[]> list = null;
	List<CustomerBean> itemlist=null;
	 System.out.println("challanNo == "+challanNo);
	 Map map1 = new HashMap();
	 
	 
	try
	{				
	 String sqlQuery = "";
	 hbu = HibernateUtility.getInstance();
	 session = hbu.getHibernateSession();
			 
//	 sqlQuery = "select c.product_name, c.weight, c.company,c.tax_percentage,c.unit,c.cat_id,sb.pk_subcat_id,c.hsn, td.tax_name, c.Without_Tax_Rate, sd.total_kg_ltr_piece_stock, c.igstPercentage, g.expiry_date, g.stockPerEntry, g.batch_no, g.barcodeNo, g.mrp, g.sale_price, g.pk_goods_receive_id, c.sgst, c.cgst, c.quantity, c.pk_fertilizer_bill_id, c.no_of_boxes, c.challanNo, c.total_excl_Tax, c.discount_per_product_perc, c.discount_per_product_amount,g.barcode_ID from challan c JOIN sub_categories sb ON c.fk_subCat_id = sb.pk_subcat_id JOIN tax_details td ON c.fk_tax_Id = td.pk_tax_id JOIN stock_detail sd ON c.fk_product_Pk_Id = sd.productId JOIN goods_receive g ON c.barcode = g.barcodeNo where challanNo = '"+challanNo+"' AND c.fk_shop_id = '"+shopid+"'";

	 
	 
//   sqlQuery = "SELECT sd.ProductName, sd.Weight, sd.CompanyName,g.tax_percentage,sd.unit,sd.FkCatId,sd.FkSubCatId,p.hsn,t.tax_name,p.sale_price_ex_tax, sd.total_kg_ltr_piece_stock, g.iGstPercentage, g.expiry_date, g.stockPerEntry, g.batch_no, g.barcodeNo, p.mrp, p.sale_price, g.pk_goods_receive_id, p.sgst, p.cgst, p.pk_product_id, s.pk_unit_id, t.pk_tax_id,g.barcode_ID,sd.packing_type,sc.sub_cat_name  FROM product_details p LEFT JOIN sold_units s ON fk_unit_id = s.pk_unit_id LEFT JOIN tax_details t ON fk_tax_id = t.pk_tax_id left join goods_receive g on g.fk_product_id=p.pk_product_id LEFT JOIN stock_detail sd on p.product_name = sd.ProductName LEFT JOIN sub_categories sc ON sd.FkSubCatId=sc.pk_subcat_id WHERE  sd.fk_shop_id ='"+shopid+"' AND sd.ProductName='"+proName+"' AND sd.Weight='"+weight+"' AND sd.packing_type = '"+packed+"' AND p.pk_product_id= '"+proid+"'"; 	 
	 sqlQuery = "select c.product_name, c.weight, c.company,c.tax_percentage,c.unit,c.cat_id,sb.pk_subcat_id,c.hsn, td.tax_name, c.Without_Tax_Rate, sd.total_kg_ltr_piece_stock, c.igstPercentage, g.expiry_date, g.stockPerEntry, g.batch_no, g.barcodeNo, g.mrp, g.sale_price, g.pk_goods_receive_id, c.sgst, c.cgst, c.quantity, c.pk_fertilizer_bill_id, c.no_of_boxes, c.challanNo, c.total_excl_Tax, c.discount_per_product_perc, c.discount_per_product_amount,g.barcode_ID from challan c JOIN sub_categories sb ON c.fk_subCat_id = sb.pk_subcat_id JOIN tax_details td ON c.fk_tax_Id = td.pk_tax_id JOIN stock_detail sd ON c.fk_product_Pk_Id = sd.productId JOIN goods_receive g ON c.barcode = g.barcodeNo where challanNo = '"+challanNo+"' AND sd.fk_shop_id = '"+shopid+"' AND g.quantity >0";	
	
//	 sqlQuery = "SELECT sd.ProductName, sd.Weight, sd.CompanyName,g.tax_percentage,sd.unit,sd.FkCatId,sd.FkSubCatId,p.hsn,t.tax_name,p.sale_price_ex_tax, sd.total_kg_ltr_piece_stock, g.iGstPercentage, g.expiry_date, g.stockPerEntry, g.batch_no, g.barcodeNo, p.mrp, p.sale_price, g.pk_goods_receive_id, p.sgst, p.cgst, p.pk_product_id, s.pk_unit_id, t.pk_tax_id,g.barcode_ID,sd.packing_type,sc.sub_cat_name  FROM product_details p LEFT JOIN sold_units s ON fk_unit_id = s.pk_unit_id LEFT JOIN tax_details t ON fk_tax_id = t.pk_tax_id left join goods_receive g on g.fk_product_id=p.pk_product_id LEFT JOIN stock_detail sd on p.product_name = sd.ProductName LEFT JOIN sub_categories sc ON sd.FkSubCatId=sc.pk_subcat_id WHERE g.barcodeNo ='"+barcodeNo+"' AND sd.fk_shop_id ='"+shopid+"'"; 
	 
	 Query query = session.createSQLQuery(sqlQuery);
	 
		list = query.list();
		
		System.out.println(list.size());
		
		 itemlist = new ArrayList<CustomerBean>(0);
	     for (Object[] objects : list) 
	     {
		
		 CustomerBean bean = new CustomerBean();
										 
		 bean.setItemName(objects[0].toString());
		 bean.setWeight(Double.parseDouble(objects[1].toString()));
		 bean.setCompanyName(objects[2].toString());
		 bean.setTaxPercentage(Double.parseDouble(objects[3].toString()));
		 System.out.println("unit name--->"+objects[4].toString());

		 bean.setUnitName(objects[4].toString());
	 
	 bean.setCat_id(Long.parseLong(objects[5].toString()));
	 bean.setSub_cat_id(Long.parseLong(objects[6].toString()));
	 bean.setHsn(objects[7].toString());
	 bean.setTaxName(objects[8].toString());
	 bean.setSalePriceEx(objects[9].toString());
	 bean.setTotalKgLtrPiece(Double.parseDouble(objects[10].toString()));
	 bean.setIgst(Double.parseDouble(objects[11].toString()));
	 if(objects[12] == null)
	 {
		 bean.setExpiryDate("N/A");
	 }else{
		 String pattern = "dd-MM-yyyy";
		 SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
		 Date expDate = (Date)objects[12];
		 String expirydate = simpleDateFormat.format(expDate);			 
		 bean.setExpiryDate(expirydate);
	 }
	 bean.setStockPerEntry(Double.parseDouble(objects[13].toString()));
	 bean.setBatchNumber(objects[14].toString());
	 bean.setBarcodeNo(Long.parseLong(objects[15].toString()));
	 bean.setMrp(Double.parseDouble(objects[16].toString()));
	 bean.setSp(Double.parseDouble(objects[17].toString()));
	 bean.setPkGoodreceiveId(Long.parseLong(objects[18].toString()));
	 bean.setSgst(Double.parseDouble(objects[19].toString()));
	 bean.setCgst(Double.parseDouble(objects[20].toString()));
	 						 							
	// bean.setSgst(0.0);
	// bean.setCgst(0.0);
		 bean.setQuantity(Double.parseDouble(objects[21].toString()));
		 bean.setPkId(Long.parseLong(objects[22].toString()));
		 bean.setQuantity(Double.parseDouble(objects[23].toString()));
		 bean.setChaalanNo(Long.parseLong(objects[24].toString()));
		 bean.setTotalEx(objects[25].toString());
		 bean.setDiscount(Double.parseDouble(objects[26].toString()));
		 bean.setDiscountAmount(Double.parseDouble(objects[27].toString()));
		 bean.setBarcode_id(objects[28].toString());
		 bean.setTotal((Double.parseDouble(objects[17].toString())) * (Double.parseDouble(objects[21].toString())));
		System.out.println("`     ````````barcode id if chalan -  "+bean.getBarcode_id());
		 bean.setFreeQuantity(0.0);
		 bean.setSalePrice(0d);
	   //bean.setNoOfboxes(0d);
	   //bean.setTotalQty(0d);
						 
		 map1.put(bean.getPkId(), bean);
	 
	
	     }
	}
	catch(RuntimeException e)
	{
		Log.error("Error in getAllItemDetails(String key)", e);	
	}finally
	{if(session!=null){
		hbu.closeSession(session);	
	}
	}
	//	System.out.println("product list size by challan   DAO   ==>     "+itemlist.size());
							
	return map1;
	//return list;
				
}	
		
public Map getProductByChallanNofornonGST(String challanNo, HttpServletRequest request)
{
	HttpSession usersession = request.getSession(true);
	String userid = (String)usersession.getAttribute("userid");
	String shopid = (String)usersession.getAttribute("shopid");
		
  	HibernateUtility hbu=null;
	Session session=null;
	//List<CustomerBean> itemlist=null;
	List<Object[]> list = null;
	List<CustomerBean> itemlist=null;
	 System.out.println("challanNo == "+challanNo);
	 Map map1 = new HashMap();
	 
	 
	try
	{				
	 String sqlQuery = "";
	 hbu = HibernateUtility.getInstance();
	 session = hbu.getHibernateSession();
			 
//	 sqlQuery = "select c.product_name, c.weight, c.company,c.tax_percentage,c.unit,c.cat_id,sb.pk_subcat_id,c.hsn, td.tax_name, c.Without_Tax_Rate, sd.total_kg_ltr_piece_stock, c.igstPercentage, g.expiry_date, g.stockPerEntry, g.batch_no, g.barcodeNo, g.mrp, g.sale_price, g.pk_goods_receive_id, c.sgst, c.cgst, c.quantity, c.pk_fertilizer_bill_id, c.no_of_boxes, c.challanNo, c.total_excl_Tax,g.barcode_ID from challan c JOIN sub_categories sb ON c.fk_subCat_id = sb.pk_subcat_id JOIN tax_details td ON c.fk_tax_Id = td.pk_tax_id JOIN stock_detail sd ON c.fk_product_Pk_Id = sd.productId JOIN goods_receive g ON c.barcode = g.barcodeNo where challanNo = '"+challanNo+"' c.fk_shop_id = '"+shopid+"'";
	 sqlQuery = "select c.product_name, c.weight, c.company,c.tax_percentage,c.unit,c.cat_id,sb.pk_subcat_id,c.hsn, td.tax_name, c.Without_Tax_Rate, sd.total_kg_ltr_piece_stock, c.igstPercentage, g.expiry_date, g.stockPerEntry, g.batch_no, g.barcodeNo, g.mrp, g.sale_price, g.pk_goods_receive_id, c.sgst, c.cgst, c.quantity, c.pk_fertilizer_bill_id, c.no_of_boxes, c.challanNo, c.total_excl_Tax,g.barcode_ID from challan c JOIN sub_categories sb ON c.fk_subCat_id = sb.pk_subcat_id JOIN tax_details td ON c.fk_tax_Id = td.pk_tax_id JOIN stock_detail sd ON c.fk_product_Pk_Id = sd.productId JOIN goods_receive g ON c.barcode = g.barcodeNo where challanNo = '"+challanNo+"' sd.fk_shop_id = '"+shopid+"' AND g.quantity >0";	
	 Query query = session.createSQLQuery(sqlQuery);
	 
	list = query.list();
	
	System.out.println(list.size());
	
	 itemlist = new ArrayList<CustomerBean>(0);
     for (Object[] objects : list) 
	 {	
		 CustomerBean bean = new CustomerBean();
										 
		 bean.setItemName(objects[0].toString());
		 bean.setWeight(Double.parseDouble(objects[1].toString()));
		 bean.setCompanyName(objects[2].toString());
		 bean.setTaxPercentage(Double.parseDouble(objects[3].toString()));
		 System.out.println("unit name---> "+objects[4].toString());

		 bean.setUnitName(objects[4].toString());
		 
		 bean.setCat_id(Long.parseLong(objects[5].toString()));
		 bean.setSub_cat_id(Long.parseLong(objects[6].toString()));
		 bean.setHsn(objects[7].toString());
		 bean.setTaxName(objects[8].toString());
		 bean.setSalePriceEx(objects[9].toString());
		 bean.setTotalKgLtrPiece(Double.parseDouble(objects[10].toString()));
		 //bean.setIgst(Double.parseDouble(objects[11].toString()));
		 if(objects[12] == null)
		 {
			 bean.setExpiryDate("N/A");
		 }else{
			 String pattern = "dd-MM-yyyy";
			 SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
			 Date expDate = (Date)objects[12];
			 String expirydate = simpleDateFormat.format(expDate);			 
			 bean.setExpiryDate(expirydate);
		 }
		 bean.setStockPerEntry(Double.parseDouble(objects[13].toString()));
		 bean.setBatchNumber(objects[14].toString());
		 bean.setBarcodeNo(Long.parseLong(objects[15].toString()));
		 bean.setMrp(Double.parseDouble(objects[16].toString()));
		 bean.setSp(Double.parseDouble(objects[17].toString()));
		 bean.setPkGoodreceiveId(Long.parseLong(objects[18].toString()));
		 //bean.setSgst(Double.parseDouble(objects[19].toString()));
		// bean.setCgst(Double.parseDouble(objects[20].toString()));
		 						 							
		 bean.setSgst(0.0);
		 bean.setCgst(0.0);
		 bean.setIgst(0.0);
		 bean.setQuantity(Double.parseDouble(objects[21].toString()));
		 bean.setPkId(Long.parseLong(objects[22].toString()));
		 bean.setQuantity(Double.parseDouble(objects[23].toString()));
		 bean.setChaalanNo(Long.parseLong(objects[24].toString()));
		 bean.setTotalEx(objects[25].toString());
		 bean.setBarcode_id(objects[26].toString());
		 bean.setTotal((Double.parseDouble(objects[17].toString())) * (Double.parseDouble(objects[21].toString())));
		
		 bean.setDiscount(0.0);
		 bean.setDiscountAmount(0.0);
		 //bean.setTotalEx("0");
		 //bean.setQuantity(0.0);
		 bean.setFreeQuantity(0.0);
		 bean.setSalePrice(0d);
		 bean.setNoOfboxes(0d);
		 //bean.setTotalQty(0d);
		
		/*
		 * String tax=bean.getTaxName(); double taxperc=bean.getVatPercentage(); double
		 * igstTaxPercentage=bean.getIgst(); String taxperc1 =(String.valueOf(taxperc));
		 * 
		 * String combinepercentage = tax+taxperc1;
		 * 
		 * 
		 * if(combinepercentage.equals("GST0.0") || combinepercentage.equals("GST5.0")
		 * || combinepercentage.equals("GST12.0") || combinepercentage.equals("GST18.0")
		 * || combinepercentage.equals("GST28.0")){ bean.setGst(taxperc);
		 * bean.setIgst(0.0);
		 * 
		 * } else{ bean.setGst(0.0); bean.setIgst(igstTaxPercentage); }
		*/ 
			  			
			 map1.put(bean.getPkId(), bean);
		 
		
	     }
	}
	catch(RuntimeException e)
	{
		Log.error("Error in getAllItemDetails(String key)", e);	
	}finally
	{if(session!=null){
		hbu.closeSession(session);	
	}
	}
	//	System.out.println("product list size by challan   DAO   ==>     "+itemlist.size());
							
	return map1;
	//return list;
			
}
		
public Map getAllProductDetailsFornonGSTBillAsPerProductName(String proName, String company, String weight, String batchNum, String catId, String subCatId, String ShopId, String tempExpiryDate, String barcode, String barcodeNo,String packed,String proid,HttpServletRequest request)throws Exception
{
	HttpSession usersession = request.getSession(true);
	String userid = (String)usersession.getAttribute("userid");
	String shopid = (String)usersession.getAttribute("shopid");
	
	HibernateUtility hbu=null;
	Session session=null;
	//List<CustomerBean> itemlist=null;
	List<Object[]> list = null;
	List<CustomerBean> itemlist=null;
	Map map1 = new HashMap();
	 System.out.println("barcodeNo == "+barcodeNo);
	 System.out.println("barcode == "+barcode);
	
	try
	{				
	 String sqlQuery = "";
	 hbu = HibernateUtility.getInstance();
	 session = hbu.getHibernateSession();
	 
	 if(barcodeNo == null || barcodeNo == "" || barcodeNo.isEmpty())
	 {									 
		 System.out.println("barcodeNo ===> "+barcodeNo);
//	sqlQuery = "SELECT p.product_name, g.weight, p.manufacturing_company,g.tax_percentage,s.unit_name,p.fk_cat_id,p.fk_subCat_id,p.hsn,t.tax_name,p.sale_price_ex_tax, sd.total_kg_ltr_piece_stock, g.iGstPercentage, g.expiry_date, g.stockPerEntry, g.batch_no, g.barcodeNo, p.mrp, p.sale_price, g.pk_goods_receive_id, p.sgst, p.cgst, p.pk_product_id, s.pk_unit_id, t.pk_tax_id,g.barcode_ID FROM product_details p LEFT JOIN sold_units s ON fk_unit_id = s.pk_unit_id LEFT JOIN tax_details t ON fk_tax_id = t.pk_tax_id left join goods_receive g on g.fk_product_id=p.pk_product_id LEFT JOIN stock_detail sd on p.product_name = sd.ProductName WHERE g.barcodeNo ='"+barcode+"' AND g.fk_shop_id ='"+shopid+"'";
			sqlQuery = "SELECT sd.ProductName, sd.Weight, sd.CompanyName,g.tax_percentage,sd.unit,sd.FkCatId,sd.FkSubCatId,p.hsn,t.tax_name,p.sale_price_ex_tax, sd.total_kg_ltr_piece_stock, g.iGstPercentage, g.expiry_date, g.stockPerEntry, g.batch_no, g.barcodeNo, p.mrp, p.sale_price, g.pk_goods_receive_id, p.sgst, p.cgst, p.pk_product_id, s.pk_unit_id, t.pk_tax_id,g.barcode_ID,sc.sub_cat_name,sd.packing_type FROM product_details p LEFT JOIN sold_units s ON fk_unit_id = s.pk_unit_id LEFT JOIN tax_details t ON fk_tax_id = t.pk_tax_id left join goods_receive g on g.fk_product_id=p.pk_product_id LEFT JOIN stock_detail sd on p.product_name = sd.ProductName LEFT JOIN sub_categories sc ON sd.FkSubCatId=sc.pk_subcat_id WHERE sd.fk_shop_id ='"+shopid+"' AND sd.ProductName='"+proName+"' AND sd.Weight='"+weight+"' AND sd.packing_type = '"+packed+"' AND p.pk_product_id='"+proid+"'AND g.quantity >0";
	 }
	 else if(barcode == null || barcode == "" || barcode.isEmpty())
	 {
		 System.out.println("barcode ===> "+barcode);
//	 sqlQuery = "SELECT p.product_name, g.weight, p.manufacturing_company,g.tax_percentage,s.unit_name,p.fk_cat_id,p.fk_subCat_id,p.hsn,t.tax_name,p.sale_price_ex_tax, sd.total_kg_ltr_piece_stock, g.iGstPercentage, g.expiry_date, g.stockPerEntry, g.batch_no, g.barcodeNo, p.mrp, p.sale_price, g.pk_goods_receive_id, p.sgst, p.cgst, p.pk_product_id, s.pk_unit_id, t.pk_tax_id,g.barcode_ID FROM product_details p LEFT JOIN sold_units s ON fk_unit_id = s.pk_unit_id LEFT JOIN tax_details t ON fk_tax_id = t.pk_tax_id left join goods_receive g on g.fk_product_id=p.pk_product_id LEFT JOIN stock_detail sd on p.product_name = sd.ProductName WHERE g.barcodeNo ='"+barcodeNo+"' AND g.fk_shop_id ='"+shopid+"'";
		 sqlQuery = "SELECT sd.ProductName, sd.Weight, sd.CompanyName,g.tax_percentage,sd.unit,sd.FkCatId,sd.FkSubCatId,p.hsn,t.tax_name,p.sale_price_ex_tax, sd.total_kg_ltr_piece_stock, g.iGstPercentage, g.expiry_date, g.stockPerEntry, g.batch_no, g.barcodeNo, p.mrp, p.sale_price, g.pk_goods_receive_id, p.sgst, p.cgst, p.pk_product_id, s.pk_unit_id, t.pk_tax_id,g.barcode_ID,sc.sub_cat_name,sd.packing_type FROM product_details p LEFT JOIN sold_units s ON fk_unit_id = s.pk_unit_id LEFT JOIN tax_details t ON fk_tax_id = t.pk_tax_id left join goods_receive g on g.fk_product_id=p.pk_product_id LEFT JOIN stock_detail sd on p.product_name = sd.ProductName LEFT JOIN sub_categories sc ON sd.FkSubCatId=sc.pk_subcat_id WHERE g.barcodeNo ='"+barcodeNo+"' AND sd.fk_shop_id ='"+shopid+"' AND g.quantity >0";	 
	 }
	 
	/*	
		 if(tempExpiryDate.equalsIgnoreCase("N/A"))
		 {
			 sqlQuery = "SELECT p.product_name, p.weight, p.manufacturing_company,p.tax_percentage,s.unit_name,p.fk_cat_id,p.fk_subCat_id,p.hsn,t.tax_name,g.sale_price, sd.total_kg_ltr_piece_stock, g.sale_price, g.iGstPercentage, g.expiry_date, g.stockPerEntry, g.batch_no, g.barcodeNo, g.mrp FROM product_details p LEFT JOIN sold_units s ON fk_unit_id = s.pk_unit_id LEFT JOIN tax_details t ON fk_tax_id = t.pk_tax_id left join goods_receive g on g.fk_product_id=p.pk_product_id LEFT JOIN stock_detail sd on p.product_name = sd.ProductName WHERE p.product_name ='"+proName+"' AND p.manufacturing_company ='"+company+"' AND p.weight ='"+weight+"' AND p.fk_cat_id ='"+catId+"' AND p.fk_subCat_id ='"+subCatId+"' AND g.barcodeNo ='"+barcode+"' AND ISNULL(g.expiry_date)";
		 }
		 else
		 {
			 System.out.println("Expiry Date ----------> "+tempExpiryDate);
			 String pattern = "yyyy-MM-dd";
			 SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
			 Date date1 = new SimpleDateFormat("dd-MM-yyyy").parse(tempExpiryDate);
			 String expiryDate = simpleDateFormat.format(date1);
			 System.out.println(expiryDate);
			 
			 sqlQuery = "SELECT p.product_name, p.weight, p.manufacturing_company,p.tax_percentage,s.unit_name,p.fk_cat_id,p.fk_subCat_id,p.hsn,t.tax_name,g.sale_price,sd.total_kg_ltr_piece_stock, g.sale_price, g.iGstPercentage, g.expiry_date, g.stockPerEntry, g.batch_no, g.barcodeNo, g.mrp FROM product_details p LEFT JOIN sold_units s ON fk_unit_id = s.pk_unit_id LEFT JOIN tax_details t ON fk_tax_id = t.pk_tax_id LEFT JOIN goods_receive g ON g.fk_product_id=p.pk_product_id LEFT JOIN stock_detail sd ON p.product_name = sd.ProductName WHERE p.product_name ='"+proName+"' AND p.manufacturing_company ='"+company+"' AND p.weight ='"+weight+"' AND p.fk_cat_id ='"+catId+"' AND p.fk_subCat_id ='"+subCatId+"' AND g.barcodeNo ='"+barcode+"' OR g.expiry_date = '"+expiryDate+"'";
		 }
	*/	 
	 	Query query = session.createSQLQuery(sqlQuery);
	 
		list = query.list();
		
		System.out.println(list.size());
		
		 itemlist = new ArrayList<CustomerBean>(0);
	     for (Object[] objects : list) 
	     {
		
		 CustomerBean bean = new CustomerBean();
									System.out.println("rssltt -  "+Arrays.toString(objects));	 
		 bean.setItemName(objects[0].toString());
		 bean.setWeight(Double.parseDouble(objects[1].toString()));
		 bean.setCompanyName(objects[2].toString());
		 bean.setTaxPercentage(Double.parseDouble(objects[3].toString()));
		 System.out.println("unit name--->"+objects[4].toString());

		 bean.setUnitName(objects[4].toString());
	 
	 bean.setCat_id(Long.parseLong(objects[5].toString()));
	 bean.setSub_cat_id(Long.parseLong(objects[6].toString()));
	 bean.setHsn(objects[7].toString());
	 bean.setTaxName(objects[8].toString());
	 bean.setSalePriceEx(objects[9].toString());
	 bean.setSp(Double.parseDouble(objects[9].toString()));
	 String sp = objects[9].toString();
	 Double spp = Double.parseDouble(sp);
	 Double op = 1d;
	 Double tot = spp*op;
	 
	 bean.setTotalKgLtrPiece(Double.parseDouble(objects[10].toString()));
	// bean.setIgst(Double.parseDouble(objects[11].toString()));
	 if(objects[12] == null)
	 {
		 bean.setExpiryDate("N/A");
	 }else{
		 String pattern = "dd-MM-yyyy";
		 SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
		 Date expDate = (Date)objects[12];
		 String expirydate = simpleDateFormat.format(expDate);			 
		 bean.setExpiryDate(expirydate);
	 }
	 bean.setStockPerEntry(Double.parseDouble(objects[13].toString()));
	 bean.setBatchNumber(objects[14].toString());
	 bean.setBarcodeNo(Long.parseLong(objects[15].toString()));
	 bean.setMrp(Double.parseDouble(objects[16].toString()));
//	 bean.setSp(Double.parseDouble(objects[17].toString()));
	 bean.setPkGoodreceiveId(Long.parseLong(objects[18].toString()));
	 //bean.setSgst(Double.parseDouble(objects[19].toString()));
	 //bean.setCgst(Double.parseDouble(objects[20].toString()));
	 bean.setSgst(0.0);
	 bean.setCgst(0.0);
	 bean.setIgst(0.0);
//	 bean.setQuantity(0.0);
	 bean.setQuantity(1d);
	 bean.setProductPkId(Long.parseLong(objects[21].toString()));
	 bean.setUnitPkId(Long.parseLong(objects[22].toString()));
	 bean.setTaxPkId(Long.parseLong(objects[23].toString()));
	 bean.setBarcode_id(objects[24].toString());
	 bean.setSubcat(objects[25].toString());
	 bean.setPacktype(objects[26].toString());
	 bean.setChaalanNo(0l);
	 
	/* if(challanNo == null || challanNo == "" || challanNo.isEmpty())
	 {
		 bean.setQuantity(0.0);
		 bean.setNoOfboxes(0.0);
		 bean.setSgst(Double.parseDouble(objects[19].toString()));
		 bean.setCgst(Double.parseDouble(objects[20].toString()));
		 bean.setPkId(Long.parseLong("0"));
	 }
	 else
	 {
		 bean.setSgst(0.0);
		 bean.setCgst(0.0);
		 bean.setQuantity(Double.parseDouble(objects[21].toString()));
		 bean.setPkId(Long.parseLong(objects[22].toString()));
		 bean.setNoOfboxes(Double.parseDouble(objects[23].toString()));
	 }
	*/ 
	 bean.setFreeQuantity(0.0);
	 bean.setSalePrice(0d);
//	 bean.setNoOfboxes(0d);
	 bean.setNoOfboxes(1d);	
	 bean.setTotalQty(0d);
	 bean.setLength(0d);
	 bean.setTableSize(0d);
	 bean.setSqPerfeet(0d);
//	 bean.setTotal(0d);
	 bean.setTotal(tot);	
	 
	/*
	 * String tax=bean.getTaxName(); double taxperc=bean.getVatPercentage(); double
	 * igstTaxPercentage=bean.getIgst(); String taxperc1 =(String.valueOf(taxperc));
	 * 
	 * String combinepercentage = tax+taxperc1;
	 * 
	 * 
	 * if(combinepercentage.equals("GST0.0") || combinepercentage.equals("GST5.0")
	 * || combinepercentage.equals("GST12.0") || combinepercentage.equals("GST18.0")
	 * || combinepercentage.equals("GST28.0")){ bean.setGst(taxperc);
	 * bean.setIgst(0.0);
	 * 
	 * } else{ bean.setGst(0.0); bean.setIgst(igstTaxPercentage); }
	 */
	  
	//								itemlist.add(bean);
		map1.put(bean.getPkId(), bean);
	     }
	}
	catch(RuntimeException e)
	{
		Log.error("Error in getAllItemDetails(String key)", e);	
	}finally
	{if(session!=null){
		hbu.closeSession(session);	
	}
	}
	//System.out.println(itemlist);
	//return map1;		
	
		return map1;
}


			
// Get Details By Barcode Number
public List<CustomerBean> getAllProductDetailsForFrtiBillAsPerBarcodeNo(String barcodeNo)throws Exception
{			
	System.out.println("In DAO Barcode No : "+barcodeNo);
HibernateUtility hbu=null;
Session session=null;
List<CustomerBean> itemlist=null;
try
{				
 String sqlQuery = "";
			 hbu = HibernateUtility.getInstance();
			 session = hbu.getHibernateSession();
 
				// sqlQuery = "SELECT p.product_name, p.weight, p.manufacturing_company,p.tax_percentage,s.unit_name,p.fk_cat_id,p.fk_subCat_id,p.hsn,t.tax_name,g.sale_price, sd.total_kg_ltr_piece_stock, g.sale_price, g.iGstPercentage, g.expiry_date, g.stockPerEntry, g.batch_no, g.barcodeNo,p.mrp,p.sale_price_ex_tax FROM product_details p LEFT JOIN sold_units s ON fk_unit_id = s.pk_unit_id LEFT JOIN tax_details t ON fk_tax_id = t.pk_tax_id left join goods_receive g on g.fk_product_id=p.pk_product_id LEFT JOIN stock_detail sd on p.product_name = sd.ProductName WHERE g.barcodeNo ='"+barcodeNo+"'";
 sqlQuery = "SELECT p.product_name, p.weight, p.manufacturing_company,p.tax_percentage,s.unit_name,p.fk_cat_id,p.fk_subCat_id,p.hsn,t.tax_name,g.sale_price, sd.total_kg_ltr_piece_stock, g.sale_price, g.iGstPercentage, g.expiry_date, g.stockPerEntry, g.batch_no, g.barcodeNo,p.mrp,p.sale_price_ex_tax FROM product_details p LEFT JOIN sold_units s ON fk_unit_id = s.pk_unit_id LEFT JOIN tax_details t ON fk_tax_id = t.pk_tax_id left join goods_receive g on g.fk_product_id=p.pk_product_id LEFT JOIN stock_detail sd on p.product_name = sd.ProductName WHERE g.barcodeNo ='"+barcodeNo+"'";
	 
	
 	Query query=session.createSQLQuery(sqlQuery);
  
	List<Object[]> list = query.list();

	
	System.out.println("list size== === ="+list.size());

 itemlist = new ArrayList<CustomerBean>(0);
 for (Object[] objects : list)
 {
	 System.out.println(Arrays.toString(objects));
	 CustomerBean bean = new CustomerBean();
	 System.out.println("itemlist");
 
 bean.setItemName(objects[0].toString());
 bean.setSalePrice(0d);
 bean.setWeight(Double.parseDouble(objects[1].toString()));
 
 bean.setMrp(0d);
 bean.setCompanyName(objects[2].toString());
 bean.setVatPercentage(Double.parseDouble(objects[3].toString()));
 bean.setUnitName(objects[4].toString());
 bean.setCat_id(Long.parseLong(objects[5].toString()));
 bean.setSub_cat_id(Long.parseLong(objects[6].toString()));
 bean.setHsn(objects[7].toString());
 bean.setTaxName(objects[8].toString());
 bean.setTotalKgLtrPiece(Double.parseDouble(objects[10].toString()));
 bean.setSalePrice(Double.parseDouble(objects[11].toString()));
 bean.setIgst(Double.parseDouble(objects[12].toString()));
 				 
 if(objects[13] == null)
 {
	 bean.setExpiryDate("N/A");
 }
 else
 {
	 String pattern = "dd-MM-yyyy";
	 SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
	 Date expDate = (Date)objects[13];
	 String expirydate = simpleDateFormat.format(expDate);			 
	 bean.setExpiryDate(expirydate);
 }
 
 bean.setStockPerEntry(Double.parseDouble(objects[14].toString()));
 bean.setBatchNumber(objects[15].toString());
 bean.setBarcodeNo(Long.parseLong(objects[16].toString()));
 bean.setMrp(Double.parseDouble(objects[17].toString()));
 bean.setSalePriceEx(objects[18].toString());
 
  
 
  String tax=bean.getTaxName();
  System.out.println(tax);
  double taxperc=bean.getVatPercentage();
  double igstTaxPercentage=bean.getIgst();
  
  if(tax.equals("GST0") || tax.equals("GST5") || tax.equals("GST12") || tax.equals("GST18") || tax.equals("GST28")){
	  bean.setGst(taxperc);
	  bean.setIgst(0.0);
	  	
  }
  else{
	  bean.setGst(0.0);
	  bean.setIgst(igstTaxPercentage);
  }
  
  
 System.out.println("Cat id in dao"+Long.parseLong(objects[5].toString()));
 System.out.println("subCat id in dao"+Long.parseLong(objects[6].toString()));
 /*bean.setBatchNumber(batchNum);*/
 System.out.println("itemlist");
		itemlist.add(bean);
	
     }
}

catch(RuntimeException e)
{
	Log.error("Error in getAllItemDetails(String key)", e);	
	}
	finally
	{if(session!=null){
		hbu.closeSession(session);	
	}
	}
	System.out.println(itemlist);
	return itemlist;
	
	


}


public List<CustomerBean> getAllProductDetailsForSeedBillAsPerProductName1(
		String proName, String company, String weight, String batchNum) {



	
	HibernateUtility hbu=null;
	Session session=null;
	List<CustomerBean> itemlist=null;
	try
	{
		
		    System.out.println("shreemant");
		hbu = HibernateUtility.getInstance();
 session = hbu.getHibernateSession();
 String sqlQuery = "SELECT product_name, sale_price, weight, mrp, manufacturing_company, tax_percentage, s.unit_name,fk_cat_id FROM product_details LEFT JOIN sold_units s ON fk_unit_id = s.pk_unit_id  WHERE product_name =:proName AND manufacturing_company =:company AND weight =:weight";

 Query query=session.createSQLQuery(sqlQuery);
 query.setParameter("proName", proName);
 query.setParameter("company", company);
 query.setParameter("weight", weight);
List<Object[]> list = query.list();

 itemlist = new ArrayList<CustomerBean>(0);
 for (Object[] objects : list) {
 System.out.println(Arrays.toString(objects));
 CustomerBean bean = new CustomerBean();
 System.out.println("itemlist");

 bean.setItemName(objects[0].toString());
 bean.setSalePrice(Double.parseDouble(objects[1].toString()));
 bean.setWeight(Double.parseDouble(objects[2].toString()));
 bean.setMrp(Double.parseDouble(objects[3].toString()));
 bean.setCompanyName(objects[4].toString());
 bean.setVatPercentage(Double.parseDouble(objects[5].toString()));
 bean.setUnitName(objects[6].toString());
 bean.setCat_id(Long.parseLong(objects[7].toString()));
 bean.setBatchNumber(batchNum);
 System.out.println("itemlist");
	
	itemlist.add(bean);
	
     }
}
catch(RuntimeException e)
{
	Log.error("Error in getAllItemDetails(String key)", e);	
	}finally
	{if(session!=null){
		hbu.closeSession(session);	
	}
	}
	
	return itemlist;
}


public List<StockDetail> getStockDetailsForReportAsPerCategory(String cat, HttpServletRequest request)
{
	HttpSession usersession = request.getSession(true);
	String userid = (String)usersession.getAttribute("userid");
	String shopid = (String)usersession.getAttribute("shopid");
	String usertype = (String)usersession.getAttribute("usertype");
	
	HibernateUtility hbu=null;
	Session session=null;
	List<StockDetail> stockList = null;
	Query query = null;
	String ss = "admin";
	
	try
	{
		hbu = HibernateUtility.getInstance();
		session = hbu.getHibernateSession();
		int catageory = Integer.parseInt(cat);
										
		String q= "0";
	if(usertype.equals(ss)) {
query = session.createSQLQuery("SELECT pd.product_name, pd.manufacturing_company, pd.weight, gr.quantity, sd.avail_Quantity, su.unit_name,sd.shop_name FROM stock_detail sd join product_details pd on sd.productId = pd.pk_product_id join sold_units su on pd.fk_unit_id = su.pk_unit_id join goods_receive gr on gr.fk_product_id = sd.productId WHERE sd.FkCatId ='"+cat+"' GROUP BY pd.product_name");		
	}	
	else {
 query = session.createSQLQuery("SELECT pd.product_name, pd.manufacturing_company, pd.weight, gr.quantity, sd.avail_Quantity, su.unit_name,sd.shop_name FROM stock_detail sd join product_details pd on sd.productId = pd.pk_product_id join sold_units su on pd.fk_unit_id = su.pk_unit_id join goods_receive gr on gr.fk_product_id = sd.productId WHERE sd.FkCatId ='"+cat+"' AND sd.fk_shop_id ='"+shopid+"' GROUP BY pd.product_name");
	}
List<Object[]> list = query.list();
stockList = new ArrayList<StockDetail>(0);

for (Object[] object : list)
{									
	StockDetail reports = new StockDetail();
	
	reports.setProductName(object[0].toString());
	reports.setCompanyName(object[1].toString());
	reports.setWeight(Double.parseDouble(object[2].toString()));
													
	if(object[3] == null || object[3].toString().isEmpty() || object[3].toString().equalsIgnoreCase(""))
{
	reports.setQuantity(0.0);
}
else
{
	reports.setQuantity((Double)object[3]);
}
reports.setAvailableeQuantity(Double.parseDouble(object[4].toString()));
//if(object[5].toString().equals("pcs")) {
//reports.setUnit("Box/pcs");
//		}else {
			reports.setUnit(object[5].toString());
//		}
	reports.setShopname(object[6].toString());	
		
		stockList.add(reports); 
	}								
}
catch(Exception e)
{				
	e.printStackTrace();	
}
//System.out.println("@@@@@@@@@@@ DAO Stock Report List :: "+stockList);
	return stockList;	
}


public List<StockDetail> getStockDetailsAsPerProductName(String proName) {

	HibernateUtility hbu=null;
	Session session=null;
	List<StockDetail> stockList = null;
	try
	{
		hbu = HibernateUtility.getInstance();
		session = hbu.getHibernateSession();
		Query query = session.createSQLQuery("SELECT ProductName, CompanyName, weight, quantity from stock_detail where quantity>=0 AND ProductName ='" + proName +"'");
		List<Object[]> list = query.list();
		stockList = new ArrayList<StockDetail>(0);
		
		
		for (Object[] object : list) {
			
			StockDetail reports = new StockDetail();
			
			reports.setProductName(object[0].toString());
			reports.setCompanyName(object[1].toString());
			reports.setWeight((Double)object[2]);
			reports.setQuantity((Double)object[3]);
			
			stockList.add(reports); 
	
		}}
	catch(Exception e)
	{
		e.printStackTrace();	
	}
	return stockList;	

}

public List<StockDetail> getStockDetailsAsPerCompanyName(String companyName, HttpServletRequest request) 
{
	HttpSession usersession = request.getSession(true);
	String userid = (String)usersession.getAttribute("userid");
	String shopid = (String)usersession.getAttribute("shopid");
	String usertype = (String)usersession.getAttribute("usertype");
	
	HibernateUtility hbu=null;
	Session session=null;
	List<StockDetail> stockList = null;
	Query query = null;
	String ss = "admin";
	
	try
	{
		hbu = HibernateUtility.getInstance();
		session = hbu.getHibernateSession();
		//Query query = session.createSQLQuery("SELECT ProductName, CompanyName, weight, quantity, stock_in_kg AS demo, unit FROM stock_detail WHERE CompanyName ='" + companyName +"'"+"AND stock_in_kg !=0 UNION ALL SELECT ProductName, CompanyName, weight, quantity, Stock_in_ltr AS demo, unit FROM stock_detail WHERE CompanyName ='" + companyName +"'"+"AND Stock_in_ltr !=0 UNION ALL SELECT ProductName, CompanyName, weight, quantity, total_piece_quantity AS demo, unit FROM stock_detail WHERE CompanyName ='" + companyName +"'"+"AND total_piece_quantity !=0");
       if(usertype.equals(ss)) {
   		query = session.createSQLQuery("SELECT sd.ProductName, sd.CompanyName, sd.weight, gr.quantity, sd.avail_Quantity, su.unit_name,sd.shop_name FROM stock_detail sd join product_details pd on sd.productId = pd.pk_product_id join sold_units su on pd.fk_unit_id = su.pk_unit_id join goods_receive gr on gr.fk_product_id = sd.productId WHERE sd.ProductName = pd.product_name AND sd.CompanyName = pd.manufacturing_company and sd.Weight = pd.weight AND CompanyName = '"+companyName+"' GROUP BY pd.product_name");    	   
       }
       else {
		query = session.createSQLQuery("SELECT sd.ProductName, sd.CompanyName, sd.weight, gr.quantity, sd.avail_Quantity, su.unit_name,sd.shop_name FROM stock_detail sd join product_details pd on sd.productId = pd.pk_product_id join sold_units su on pd.fk_unit_id = su.pk_unit_id join goods_receive gr on gr.fk_product_id = sd.productId WHERE sd.ProductName = pd.product_name AND sd.CompanyName = pd.manufacturing_company and sd.Weight = pd.weight AND CompanyName = '"+companyName+"' AND sd.fk_shop_id = '"+shopid+"' GROUP BY pd.product_name");
       }
List<Object[]> list = query.list();
stockList = new ArrayList<StockDetail>(0);


for (Object[] object : list) {
	
	StockDetail reports = new StockDetail();
	
	reports.setProductName(object[0].toString());
	reports.setCompanyName(object[1].toString());
	reports.setWeight((Double)object[2]);
	reports.setQuantity((Double)object[3]);	
	reports.setAvailableeQuantity((Double)object[4]);
//	if(object[5].toString().equals("pcs")) {
//				reports.setUnit("Box/pcs");
//			}else {
				reports.setUnit(object[5].toString());
//			}
	reports.setShopname(object[6].toString());		
			
			stockList.add(reports); 
	
		}}
	catch(Exception e)
	{
		e.printStackTrace();	
	}
	return stockList;	

}
//

public List<SaleReports> getsaleamt(LocalDate frstday,LocalDate lstday, HttpServletRequest request) 
{
	HttpSession usersession = request.getSession(true);
	String userid = (String)usersession.getAttribute("userid");
	String shopid = (String)usersession.getAttribute("shopid");
	String usertype = (String)usersession.getAttribute("usertype");
	
	HibernateUtility hbu=null;
	Session session=null;
	List<SaleReports> stockList = null;
	try
	{
		hbu = HibernateUtility.getInstance();
		session = hbu.getHibernateSession();
		//Query query = session.createSQLQuery("SELECT ProductName, CompanyName, weight, quantity, stock_in_kg AS demo, unit FROM stock_detail WHERE CompanyName ='" + companyName +"'"+"AND stock_in_kg !=0 UNION ALL SELECT ProductName, CompanyName, weight, quantity, Stock_in_ltr AS demo, unit FROM stock_detail WHERE CompanyName ='" + companyName +"'"+"AND Stock_in_ltr !=0 UNION ALL SELECT ProductName, CompanyName, weight, quantity, total_piece_quantity AS demo, unit FROM stock_detail WHERE CompanyName ='" + companyName +"'"+"AND total_piece_quantity !=0");
        Query query = session.createSQLQuery("select pk_fertilizer_bill_id,gross_total,bill_no from fertilizer_billing WHERE saleDate BETWEEN '"+frstday+"' AND '"+lstday+"' GROUP BY bill_no");

List<Object[]> list = query.list();
stockList = new ArrayList<SaleReports>(0);
Double w=0d;
int i=0;
SaleReports reports = new SaleReports();
for (Object[] object : list) {
	

	
		String b= object[1].toString();
			
		Double aa = Double.parseDouble(b);
			
		w=w+aa;
System.out.println("b - - - -------   "+b);
System.out.println("aa - - -   "+aa);
System.out.println("w - - - -  "+w);
i++;
System.out.println("i - - "+i);
//		stockList.add(reports); 
	
		}
reports.setSalePrice(w);
System.out.println("set sale  -  "+reports.getSalePrice());
stockList.add(reports);
}
	catch(Exception e)
	{
		e.printStackTrace();	
	}
	return stockList;	

}
//
public List<GoodsReceiveBean> getpuramt(LocalDate frstday,LocalDate lstday, HttpServletRequest request) 
{
	HttpSession usersession = request.getSession(true);
	String userid = (String)usersession.getAttribute("userid");
	String shopid = (String)usersession.getAttribute("shopid");

	HibernateUtility hbu=null;
	Session session=null;
	List<GoodsReceiveBean> stockList = null;
	try
	{
		hbu = HibernateUtility.getInstance();
		session = hbu.getHibernateSession();
		//Query query = session.createSQLQuery("SELECT ProductName, CompanyName, weight, quantity, stock_in_kg AS demo, unit FROM stock_detail WHERE CompanyName ='" + companyName +"'"+"AND stock_in_kg !=0 UNION ALL SELECT ProductName, CompanyName, weight, quantity, Stock_in_ltr AS demo, unit FROM stock_detail WHERE CompanyName ='" + companyName +"'"+"AND Stock_in_ltr !=0 UNION ALL SELECT ProductName, CompanyName, weight, quantity, total_piece_quantity AS demo, unit FROM stock_detail WHERE CompanyName ='" + companyName +"'"+"AND total_piece_quantity !=0");
        Query query = session.createSQLQuery("select pk_goods_receive_id,gross_total,bill_number,fk_supplier_id from goods_receive WHERE insertDate BETWEEN '"+frstday+"' AND '"+lstday+"' GROUP BY bill_number");

List<Object[]> list = query.list();
stockList = new ArrayList<GoodsReceiveBean>(0);
Double w=0d;
int i=0;
GoodsReceiveBean reports = new GoodsReceiveBean();
for (Object[] object : list) {
	

	
		String b= object[1].toString();
			
		Double aa = Double.parseDouble(b);
			
		w=w+aa;
System.out.println("b - - - -------   "+b);
System.out.println("aa - - -   "+aa);
System.out.println("w - - - -  "+w);
i++;
System.out.println("i - - "+i);
//		stockList.add(reports); 
	
		}
reports.setGrossTotal(w);
System.out.println("set purchase  -  "+reports.getGrossTotal());
stockList.add(reports);
}
	catch(Exception e)
	{
		e.printStackTrace();	
	}
	return stockList;	

}
//
public List<GoodsReceiveBean> getpurchsereturn(LocalDate frstday,LocalDate lstday, HttpServletRequest request) 
{
	HttpSession usersession = request.getSession(true);
	String userid = (String)usersession.getAttribute("userid");
	String shopid = (String)usersession.getAttribute("shopid");

	HibernateUtility hbu=null;
	Session session=null;
	List<GoodsReceiveBean> stockList = null;
	try
	{
		hbu = HibernateUtility.getInstance();
		session = hbu.getHibernateSession();
		//Query query = session.createSQLQuery("SELECT ProductName, CompanyName, weight, quantity, stock_in_kg AS demo, unit FROM stock_detail WHERE CompanyName ='" + companyName +"'"+"AND stock_in_kg !=0 UNION ALL SELECT ProductName, CompanyName, weight, quantity, Stock_in_ltr AS demo, unit FROM stock_detail WHERE CompanyName ='" + companyName +"'"+"AND Stock_in_ltr !=0 UNION ALL SELECT ProductName, CompanyName, weight, quantity, total_piece_quantity AS demo, unit FROM stock_detail WHERE CompanyName ='" + companyName +"'"+"AND total_piece_quantity !=0");
        Query query = session.createSQLQuery("select pk_purchase_return_id,SUM(total) from purchase_return WHERE purchase_date BETWEEN '"+frstday+"' AND '"+lstday+"'");

List<Object[]> list = query.list();
stockList = new ArrayList<GoodsReceiveBean>(0);
Double w=0d;
int i=0;

for (Object[] object : list) {
	GoodsReceiveBean reports = new GoodsReceiveBean();	

	String ss = object[1].toString();
	System.out.println("ss - "+ss);
	if(ss.equals(null))
	{
		
		reports.setGrossTotal(0d);
		System.out.println("set purchase return -  "+reports.getGrossTotal());	
		stockList.add(reports);
	}
	else {
		reports.setGrossTotal(Double.parseDouble(object[1].toString()));
	System.out.println("set purchase return -  "+reports.getGrossTotal());	
	stockList.add(reports);
	}
	/*
				 * String b= object[1].toString();
				 * 
				 * Double aa = Double.parseDouble(b);
				 * 
				 * w=w+aa; System.out.println("b - - - -------   "+b);
				 * System.out.println("aa - - -   "+aa); System.out.println("w - - - -  "+w);
				 * i++; System.out.println("i - - "+i);
				 */
//		stockList.add(reports); 
	
		}


}
	catch(Exception e)
	{
		e.printStackTrace();	
	}
	return stockList;	

}
//

public List<GoodsReceiveBean> getsalereturn(LocalDate frstday,LocalDate lstday, HttpServletRequest request) 
{
	HttpSession usersession = request.getSession(true);
	String userid = (String)usersession.getAttribute("userid");
	String shopid = (String)usersession.getAttribute("shopid");

	HibernateUtility hbu=null;
	Session session=null;
	List<GoodsReceiveBean> stockList = null;
	try
	{
		hbu = HibernateUtility.getInstance();
		session = hbu.getHibernateSession();
		//Query query = session.createSQLQuery("SELECT ProductName, CompanyName, weight, quantity, stock_in_kg AS demo, unit FROM stock_detail WHERE CompanyName ='" + companyName +"'"+"AND stock_in_kg !=0 UNION ALL SELECT ProductName, CompanyName, weight, quantity, Stock_in_ltr AS demo, unit FROM stock_detail WHERE CompanyName ='" + companyName +"'"+"AND Stock_in_ltr !=0 UNION ALL SELECT ProductName, CompanyName, weight, quantity, total_piece_quantity AS demo, unit FROM stock_detail WHERE CompanyName ='" + companyName +"'"+"AND total_piece_quantity !=0");
        Query query = session.createSQLQuery("select pk_sale_return_id,sum(return_amount) from sale_return WHERE returnDate BETWEEN '"+frstday+"' AND '"+lstday+"'");

List<Object[]> list = query.list();
stockList = new ArrayList<GoodsReceiveBean>(0);
Double w=0d;
int i=0;

for (Object[] object : list) {
	GoodsReceiveBean reports = new GoodsReceiveBean();	

	reports.setGrossTotal(Double.parseDouble(object[1].toString()));
	System.out.println("set sale return  -  "+reports.getGrossTotal());	
	stockList.add(reports);
	
		}


}
	catch(Exception e)
	{
		e.printStackTrace();	
	}
	return stockList;	

}
//

public List<Stock> getslowstock(LocalDate frstday,LocalDate lstday, HttpServletRequest request) 
{
	HttpSession usersession = request.getSession(true);
	String userid = (String)usersession.getAttribute("userid");
	String shopid = (String)usersession.getAttribute("shopid");

	HibernateUtility hbu=null;
	Session session=null;
	List<Stock> stockList = null;
	try
	{
		hbu = HibernateUtility.getInstance();
		session = hbu.getHibernateSession();
		//Query query = session.createSQLQuery("SELECT ProductName, CompanyName, weight, quantity, stock_in_kg AS demo, unit FROM stock_detail WHERE CompanyName ='" + companyName +"'"+"AND stock_in_kg !=0 UNION ALL SELECT ProductName, CompanyName, weight, quantity, Stock_in_ltr AS demo, unit FROM stock_detail WHERE CompanyName ='" + companyName +"'"+"AND Stock_in_ltr !=0 UNION ALL SELECT ProductName, CompanyName, weight, quantity, total_piece_quantity AS demo, unit FROM stock_detail WHERE CompanyName ='" + companyName +"'"+"AND total_piece_quantity !=0");
        Query query = session.createSQLQuery("select pkStockId,ProductName from stock_detail where avail_Quantity < 10");

List<Object[]> list = query.list();
stockList = new ArrayList<Stock>(0);
Double w=0d;
int i=0;

for (Object[] object : list) {
	Stock reports = new Stock();	

	String aa = object[1].toString();
	reports.setPkStockId(Long.parseLong(object[0].toString()));
	reports.setProductName(object[1].toString());
	//	reports.setGrossTotal(Double.parseDouble(object[1].toString()));
//	System.out.println("set sale return  -  "+reports.getGrossTotal());	
	stockList.add(reports);
	
		}


}
	catch(Exception e)
	{
		e.printStackTrace();	
	}
	return stockList;	

}

/*     GETTING PURCHASE REPORT FOR USING ONLY SINGLE DATE     */
public List<PurchaseDetailsFromGoodsReceive> getPurchaseDetailsForSingleDateFromGoodsReceive(String fDate) {
		
	Integer dbBillNo;
	Integer cmpBillNo;
	Integer billCount = 1;
	
		HibernateUtility hbu=null;
		Session session=null;
		List<PurchaseDetailsFromGoodsReceive> purchaseList = null;
		
		HibernateUtility hbu2=null;
		Session session2=null;
		
		NumberFormat formatter = new DecimalFormat("#0.00");

try
{
 hbu = HibernateUtility.getInstance();
 session = hbu.getHibernateSession();
 Query query = session.createSQLQuery("select gr.bill_number, gr.purchaseDate, gr.product_name, gr.company_Name, gr.batch_no, gr.barcodeNo, gr.buy_price, gr.sale_price, gr.mrp, gr.weight, abs(gr.quantity), gr.tax_percentage, gr.iGstPercentage, gr.Tax_Amount, gr.Per_Product_Total + gr.Tax_Amount, gr.discount_amount, su.unit_name ,gr.discount_percentage from goods_receive gr join product_details pd on gr.fk_product_id=pd.pk_product_id join sold_units su on pd.fk_unit_id = su.pk_unit_id where purchaseDate ='" + fDate +"'");
   //query.setParameter("isInsertDate", fDate);
 List<Object[]> list = query.list();
 System.out.println("Size of list ==> GoodsReceiveDao.getPurchaseDetailsForSingleDateFromGoodsReceive =====> "+list.size());
 purchaseList = new ArrayList<PurchaseDetailsFromGoodsReceive>(0);
	
	
	
	for (Object[] object : list)
	{
		PurchaseDetailsFromGoodsReceive reports = new PurchaseDetailsFromGoodsReceive();
		
		dbBillNo = Integer.parseInt(object[0].toString());
		
		hbu2 = HibernateUtility.getInstance();
		 session2 = hbu2.getHibernateSession();
		 Query query2 = session2.createSQLQuery("select bill_number, COUNT(bill_number) from goods_receive where bill_number = "+dbBillNo+" GROUP BY bill_number");			 
 List<Object[]> templist = query2.list();
 for (Object[] object2 : templist)
 {
	 cmpBillNo = Integer.parseInt(object2[0].toString());
	 billCount = Integer.parseInt(object2[1].toString());
 }
 
 Double discountAmount = Double.parseDouble(object[15].toString());
 Double perProductDiscount = discountAmount/billCount;

 //reports.setDiscountAmount(formatter.format(Double.toString(perProductDiscount)));

reports.setBillNo(object[0].toString());
reports.setPurchaseDate(object[1].toString());
reports.setProductName(object[2].toString());
reports.setCompanyName(object[3].toString());
//reports.setDcNo(object[4].toString());
 reports.setBatchNo(object[4].toString());
reports.setBarcodeNo(object[5].toString());
reports.setBuyPrice(Double.parseDouble(object[6].toString()));
reports.setSalePrice(Double.parseDouble(object[7].toString()));
reports.setMrp(Double.parseDouble(object[8].toString()));
reports.setWeight(Double.parseDouble(object[9].toString()));
reports.setQuantity2(Double.parseDouble(object[10].toString()));
double gstPerc = Double.parseDouble(object[11].toString());
double iGstPerc = Double.parseDouble(object[12].toString());
if(gstPerc == 0 && iGstPerc == 0)
{
	reports.setTaxPercentage(0.0);
}
else if(gstPerc>0 && iGstPerc == 0)
{
	reports.setTaxPercentage(gstPerc);
}
else if(iGstPerc > 0 && gstPerc == 0)
{
	reports.setTaxPercentage(iGstPerc);
}

reports.setTaxAmount(Double.parseDouble(object[13].toString()));
Double totalAmount = Double.parseDouble(object[14].toString())/*- perProductDiscount*/;
				String reportTotalAmount = formatter.format(totalAmount);
				reports.setTotalAmount(Double.parseDouble(reportTotalAmount));
				reports.setUnitName(object[16].toString());
				reports.setDiscountPercentage(Double.parseDouble(object[17].toString()));
				
				Double totalAmt = Double.parseDouble(reportTotalAmount);
				Double disPer = Double.parseDouble(object[17].toString());
				
				
				Double disAmt =  (totalAmt)*(disPer)/100;
				
				
				reports.setDiscountAmount(disAmt.toString());
				purchaseList.add(reports); 
		
			}
			}
		catch(Exception e)
		{
			e.printStackTrace();	
		}
		return purchaseList;	
		
	
		
	}



public List<PurchaseDetailsFromGoodsReceive> getPurchaseDetailsAsPerProduct(
		String cat, String product, String company, String weight) {

	Integer dbBillNo;
	Integer cmpBillNo;
	Integer billCount = 1;
	
	HibernateUtility hbu=null;
	Session session=null;
	
	HibernateUtility hbu2=null;
	Session session2=null;
	
	NumberFormat formatter = new DecimalFormat("#0.00");

List<PurchaseDetailsFromGoodsReceive> purchaseList = null;
try
{
	System.out.println("Product name in dao = = = "+product);
System.out.println("company name in dao = = = "+company);
System.out.println("weight in dao = = = "+weight);

hbu = HibernateUtility.getInstance();
session = hbu.getHibernateSession();
//Query query = session.createSQLQuery("select gr.bill_number, gr.product_name, gr.buy_price, gr.sale_price, gr.purchaseDate, gr.quantity, gr.weight, gr.tax_percentage, gr.iGstPercentage, gr.Tax_Amount, (gr.Per_Product_Total+gr.Tax_Amount), gr.discount_amount, su.unit_name,gr.discount_percentage FROM goods_receive RIGHT JOIN supplier_details ON goods_receive.fk_supplier_id = supplier_details.pk_supplier_id join goods_receive gr join product_details pd on gr.fk_product_id=pd.pk_product_id join sold_units su on pd.fk_unit_id = su.pk_unit_id WHERE goods_receive.product_name ='"+product+"' And goods_receive.company_Name ='"+company+"' AND goods_receive.weight ="+weight);
Query query = session.createSQLQuery("SELECT gr.bill_number,gr.product_name,gr.buy_price,gr.sale_price,gr.purchaseDate,gr.quantity,gr.weight,gr.tax_percentage,gr.iGstPercentage,gr.Tax_Amount,gr.total_amount,gr.discount_amount,gr.unit,gr.discount_percentage FROM goods_receive gr WHERE product_name='"+product+"' AND company_Name='"+company+"' AND weight='"+weight+"'");
List<Object[]> list = query.list();
purchaseList = new ArrayList<PurchaseDetailsFromGoodsReceive>(0);		

for (Object[] object : list)
{
	PurchaseDetailsFromGoodsReceive reports = new PurchaseDetailsFromGoodsReceive();
	
	dbBillNo = Integer.parseInt(object[0].toString());
	
	 hbu2 = HibernateUtility.getInstance();
	 session2 = hbu2.getHibernateSession();
	 Query query2 = session2.createSQLQuery("select bill_number, COUNT(bill_number) from goods_receive where bill_number = "+dbBillNo+" GROUP BY bill_number");			 
 List<Object[]> templist = query2.list();
 for (Object[] object2 : templist)
 {
	 cmpBillNo = Integer.parseInt(object2[0].toString());
	 billCount = Integer.parseInt(object2[1].toString());
 }
 
 Double discountAmount = Double.parseDouble(object[11].toString());
 Double perProductDiscount = discountAmount/billCount;
// reports.setDiscountAmount((perProductDiscount).toString());

//PurchaseDetailsFromGoodsReceive reports = new PurchaseDetailsFromGoodsReceive();

reports.setBillNo(object[0].toString());
reports.setProductName(object[1].toString());
reports.setBuyPrice(Double.parseDouble(object[2].toString()));
reports.setSalePrice(Double.parseDouble(object[3].toString()));
reports.setPurchaseDate(object[4].toString());
reports.setQuantity2(Double.parseDouble(object[5].toString()));
reports.setWeight(Double.parseDouble(object[6].toString()));

double gstPerc = Double.parseDouble(object[7].toString());
double iGstPerc = Double.parseDouble(object[8].toString());
if(gstPerc == 0 && iGstPerc == 0)
{
	reports.setTaxPercentage(0.0);
}
else if(gstPerc>0 && iGstPerc == 0)
{
	reports.setTaxPercentage(gstPerc);
}
else if(iGstPerc > 0 && gstPerc == 0)
{
	reports.setTaxPercentage(iGstPerc);
}			

reports.setTaxAmount(Double.parseDouble(object[9].toString()));

Double totalAmount = (Double.parseDouble(object[10].toString()) /*- perProductDiscount*/);
String reportTotalAmount = formatter.format(totalAmount);				
reports.setTotalAmount(Double.parseDouble(reportTotalAmount));
reports .setDiscountAmount(object[11].toString());
reports.setUnitName(object[12].toString());
reports.setDiscountPercentage(Double.parseDouble(object[13].toString()));

System.out.println("Discount %%%%  ------------------^^^^^^^^^^^^^^^^^^^^^^^^^^^^^   :"+object[13].toString());
							 
			Double totalAmt = Double.parseDouble(reportTotalAmount);
			Double disPer = Double.parseDouble(object[13].toString());
										
			Double disAmt =  (totalAmt)*(disPer)/100;
										
			reports.setDiscountAmount(disAmt.toString());
						
			purchaseList.add(reports); 
	
		}}
	catch(Exception e)
	{
		e.printStackTrace();	
	}
	return purchaseList;	
	
}


//////////////PURCHASE REPORT OF SUPPLIER///////////		


public List<PurchaseDetailsFromGoodsReceive> getPurchaseDetailsForSupplier(
			String supplier) {
	
	Integer dbBillNo;
	Integer cmpBillNo;
	Integer billCount = 1;
		
		HibernateUtility hbu=null;
		Session session=null;
		List<PurchaseDetailsFromGoodsReceive> purchaseList = null;
		
		HibernateUtility hbu2=null;
		Session session2=null;
				
		NumberFormat formatter = new DecimalFormat("#0.00");

try
{
	hbu = HibernateUtility.getInstance();
	session = hbu.getHibernateSession();
	Query query = session.createSQLQuery("select gr.bill_number, gr.purchaseDate, gr.product_name, gr.company_Name, gr.batch_no, gr.barcodeNo, gr.buy_price, gr.sale_price, gr.mrp, gr.weight, abs(gr.quantity), gr.tax_percentage, gr.iGstPercentage, gr.Tax_Amount, (gr.Per_Product_Total+gr.Tax_Amount), sd.supplier_name, gr.discount_amount, su.unit_name,gr.discount_percentage from goods_receive gr left join supplier_details sd on gr.fk_supplier_id = sd.pk_supplier_id join  product_details pd on gr.fk_product_id=pd.pk_product_id join sold_units su on pd.fk_unit_id = su.pk_unit_id where fk_supplier_id = " + supplier);
//query.setParameter("fksupplier", supplier);
List<Object[]> list = query.list();
purchaseList = new ArrayList<PurchaseDetailsFromGoodsReceive>(0);


for (Object[] object : list) {
	
	PurchaseDetailsFromGoodsReceive reports = new PurchaseDetailsFromGoodsReceive();
	
	dbBillNo = Integer.parseInt(object[0].toString());
	
	hbu2 = HibernateUtility.getInstance();
	 session2 = hbu2.getHibernateSession();
	 Query query2 = session2.createSQLQuery("select bill_number, COUNT(bill_number) from goods_receive where bill_number = "+dbBillNo+" GROUP BY bill_number");			 
 List<Object[]> templist = query2.list();
 for (Object[] object2 : templist)
 {
	 cmpBillNo = Integer.parseInt(object2[0].toString());
	 billCount = Integer.parseInt(object2[1].toString());
 }
 
 Double discountAmount = Double.parseDouble(object[16].toString());
 Double perProductDiscount = discountAmount/billCount;
 reports.setDiscountAmount(formatter.format(perProductDiscount).toString());

reports.setBillNo(object[0].toString());
reports.setPurchaseDate(object[1].toString());
reports.setProductName(object[2].toString());
reports.setCompanyName(object[3].toString());
//reports.setDcNo(object[4].toString());
reports.setBatchNo(object[4].toString());
reports.setBarcodeNo(object[5].toString());
reports.setBuyPrice(Double.parseDouble(object[6].toString()));
reports.setSalePrice(Double.parseDouble(object[7].toString()));
reports.setMrp(Double.parseDouble(object[8].toString()));
reports.setWeight(Double.parseDouble(object[9].toString()));				
reports.setQuantity2(Double.parseDouble(object[10].toString()));
double gstPerc = Double.parseDouble(object[11].toString());
double iGstPerc = Double.parseDouble(object[12].toString());
if(gstPerc == 0 && iGstPerc == 0)
{
	reports.setTaxPercentage(0.0);
}
else if(gstPerc>0 && iGstPerc == 0)
{
	reports.setTaxPercentage(gstPerc);
}
else if(iGstPerc > 0 && gstPerc == 0)
{
	reports.setTaxPercentage(iGstPerc);
}


reports.setTaxAmount(Double.parseDouble(object[13].toString()));

Double totalAmount = (Double.parseDouble(object[14].toString())/* - perProductDiscount*/);
String reportTotalAmount = formatter.format(totalAmount);				
reports.setTotalAmount(Double.parseDouble(reportTotalAmount));								
//reports.setTotalAmount(Double.parseDouble(object[12].toString()));
			reports.setSupplier(object[15].toString());
			reports.setUnitName(object[17].toString());
			

			reports.setDiscountPercentage(Double.parseDouble(object[18].toString()));
			Double totalAmt = Double.parseDouble(reportTotalAmount);
			Double disPer = Double.parseDouble(object[18].toString());
			
			
			Double disAmt =  (totalAmt)*(disPer)/100;
			
			
			reports.setDiscountAmount(disAmt.toString());
			
			
			purchaseList.add(reports); 
	
		}}
	catch(Exception e)
	{
		e.printStackTrace();	
	}
	return purchaseList;	
	
}
///////////purchase report of shopname wise//////////
public List<PurchaseDetailsFromGoodsReceive> getPurchaseDetailsForShop(
		String shop,String fisDate ,String endDate )
{
	Integer dbBillNo;
	Integer cmpBillNo;
	Integer billCount = 1;
	
	HibernateUtility hbu=null;
	Session session=null;
	List<PurchaseDetailsFromGoodsReceive> purchaseList = null;
	
	HibernateUtility hbu2=null;
	Session session2=null;
	
	NumberFormat formatter = new DecimalFormat("#0.00");

try
{
	hbu = HibernateUtility.getInstance();
	session = hbu.getHibernateSession();
	Query query = session.createSQLQuery("select gr.bill_number, purchaseDate, gr.product_name, gr.company_Name,gr.batch_no, gr.barcodeNo, gr.buy_price, gr.sale_price, gr.mrp, gr.weight, abs(gr.quantity), gr.tax_percentage, gr.iGstPercentage, gr.Tax_Amount, (gr.Per_Product_Total+gr.Tax_Amount), sd.supplier_name, gr.discount_amount, su.unit_name from goods_receive gr left join supplier_details sd on gr.fk_supplier_id = sd.pk_supplier_id JOIN product_details pd on gr.fk_product_id=pd.pk_product_id join sold_units su on pd.fk_unit_id = su.pk_unit_id where gr.fk_shop_id = " + shop+" AND purchaseDate BETWEEN '"+fisDate+"' AND '"+endDate+"'");
//query.setParameter("fksupplier", supplier);
List<Object[]> list = query.list();
purchaseList = new ArrayList<PurchaseDetailsFromGoodsReceive>(0);


for (Object[] object : list) {
	
	PurchaseDetailsFromGoodsReceive reports = new PurchaseDetailsFromGoodsReceive();
	
	
	
	dbBillNo = Integer.parseInt(object[0].toString());
	
	hbu2 = HibernateUtility.getInstance();
	 session2 = hbu2.getHibernateSession();
	 Query query2 = session2.createSQLQuery("select bill_number, COUNT(bill_number) from goods_receive where bill_number = "+dbBillNo+" GROUP BY bill_number");			 
 List<Object[]> templist = query2.list();
 for (Object[] object2 : templist)
 {
	 cmpBillNo = Integer.parseInt(object2[0].toString());
	 billCount = Integer.parseInt(object2[1].toString());
 }
 
 Double discountAmount = Double.parseDouble(object[16].toString());
 Double perProductDiscount = discountAmount/billCount;
 reports.setDiscountAmount(Double.toString(perProductDiscount));


reports.setBillNo(object[0].toString());
reports.setPurchaseDate(object[1].toString());
reports.setProductName(object[2].toString());
reports.setCompanyName(object[3].toString());
//reports.setDcNo(object[4].toString());
reports.setBatchNo(object[4].toString());
reports.setBarcodeNo(object[5].toString());
reports.setBuyPrice(Double.parseDouble(object[6].toString()));
reports.setSalePrice(Double.parseDouble(object[7].toString()));
reports.setMrp(Double.parseDouble(object[8].toString()));
reports.setWeight(Double.parseDouble(object[9].toString()));
reports.setQuantity2(Double.parseDouble(object[10].toString()));
double gstPerc = Double.parseDouble(object[11].toString());
double iGstPerc = Double.parseDouble(object[12].toString());
if(gstPerc == 0 && iGstPerc == 0)
{
	reports.setTaxPercentage(0.0);
}
else if(gstPerc>0 && iGstPerc == 0)
{
	reports.setTaxPercentage(gstPerc);
}
else if(iGstPerc > 0 && gstPerc == 0)
{
	reports.setTaxPercentage(iGstPerc);
}
reports.setTaxAmount(Double.parseDouble(object[13].toString()));
Double totalAmount = (Double.parseDouble(object[14].toString())/* - perProductDiscount*/);
			String reportTotalAmount = formatter.format(totalAmount);				
			reports.setTotalAmount(Double.parseDouble(reportTotalAmount));
			reports.setSupplier(object[15].toString());
			reports.setUnitName(object[17].toString());
			
			purchaseList.add(reports); 
	
		}}
	catch(Exception e)
	{
		e.printStackTrace();	
	}
	return purchaseList;	
	
}



public List<PurchaseDetailsFromGoodsReceive> getPurchaseDetailsForCategory(
			String cat) {

	
		HibernateUtility hbu=null;
		Session session=null;
		List<PurchaseDetailsFromGoodsReceive> purchaseList = null;
		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createSQLQuery("select bill_number, purchaseDate, product_name, company_Name,  dc_number, batch_no, barcodeNo, buy_price, sale_price, mrp, weight, abs(quantity), Per_Product_Total from goods_receive where goods_receive.fkCategoryId ="+cat);
			List<Object[]> list = query.list();
			purchaseList = new ArrayList<PurchaseDetailsFromGoodsReceive>(0);
		
			for (Object[] object : list) {
				
				PurchaseDetailsFromGoodsReceive reports = new PurchaseDetailsFromGoodsReceive();
				
				reports.setBillNo(object[0].toString());
				reports.setPurchaseDate(object[1].toString());
				reports.setProductName(object[2].toString());
				reports.setCompanyName(object[3].toString());
				reports.setDcNo(object[4].toString());
				reports.setBatchNo(object[5].toString());
				reports.setBarcodeNo(object[6].toString());
				reports.setBuyPrice(Double.parseDouble(object[7].toString()));
				reports.setSalePrice(Double.parseDouble(object[8].toString()));
				reports.setMrp(Double.parseDouble(object[9].toString()));
				reports.setWeight(Double.parseDouble(object[10].toString()));
				reports.setQuantity2(Double.parseDouble(object[11].toString()));
				reports.setTotalAmount(Double.parseDouble(object[12].toString()));
				
				purchaseList.add(reports); 
		
			}}
		catch(Exception e)
		{
			e.printStackTrace();	
		}
		return purchaseList;	
		
	
	}


public List<SaleReports> getSaleDetailsAsPerCategoryForSingleDate(String cat, String fDate)
{
	Double trans;
	Double hamali;
	Integer cmpBillNo = 0;
	int billCount = 0;
	double perProducthamaliExp= 0.0;
	
	HibernateUtility hbu=null;
	Session session=null;
	
	HibernateUtility hbu2=null;
	Session session2=null;
	
	List<SaleReports> saleList=null;
	
	System.out.println("Good Receive Dao from Sale Report------------          >   "+cat+" "+fDate);

try
{	
	 hbu = HibernateUtility.getInstance();
	 session = hbu.getHibernateSession();
	 Query query = session.createSQLQuery("SELECT bill_no, product_name, DATE(insert_date), sale_price, quantity, Discount_amount, Tax_amount, total_per_product, tax_percentage, igstPercentage, kg, grams, ltr, mili, total_gst_tax_per_product, hamali_expense, unit, cat_id FROM fertilizer_billing WHERE cat_id ='"+cat+"' AND DATE(insert_date)='"+fDate+"'");
System.out.println("size  - "+query.list().size());
// query.setParameter("fDate", fDate);
// query.setParameter("cat", cat);
	 
	 List<Object[]> list = query.list();
	 System.out.println("list size - "+query.list().size());
	 saleList= new ArrayList<SaleReports>(0);
 
	for (Object[] object : list)
	{
		 SaleReports reports = new SaleReports();
		System.out.println("rslt - "+Arrays.toString(object));
		 Integer billNo =  Integer.parseInt(object[0].toString());
		
		 hbu2 = HibernateUtility.getInstance();
		 session2 = hbu2.getHibernateSession();
		 
		 Query query2 = session2.createSQLQuery("select bill_no, COUNT(bill_no) from fertilizer_billing where bill_no = "+billNo+" GROUP BY bill_no");			 
 
 List<Object[]> templist = query2.list();
 
 for (Object[] object2 : templist)
 {
///		System.out.println("rslt - "+Arrays.toString(object));
	 cmpBillNo = Integer.parseInt(object2[0].toString());
	 billCount = Integer.parseInt(object2[1].toString());
 }
 
 Double hamali1 = (Double.parseDouble(object[15].toString()));
	if(hamali1 != null)
	{
//		System.out.println("rslt - "+Arrays.toString(object));
		System.out.println("COUNT ==== "+billCount);

if(hamali1 > 0)
{
	hamali = (Double.parseDouble(object[15].toString()));
	perProducthamaliExp = hamali/billCount;
	//reports.setHamaliexpense(BigDecimal.valueOf(perProducthamaliExp));
}
else
{
	double hamaliExpForZero = 0.0;
	//reports.setHamaliexpense(BigDecimal.valueOf(hamaliExpForZero));
	}
}

Double disValue = Double.parseDouble(object[5].toString());

if(disValue > 0 && disValue != null)
{
	double perProductDiscount = disValue/billCount;
	//reports.setDiscountAmount(perProductDiscount);
}
else
{
	double perProductDiscountvalue = 0.0;
	//reports.setHamaliexpense(BigDecimal.valueOf(perProductDiscountvalue));
		}
	
String unit = object[16].toString();
reports.setUnit(unit);
reports.setQuantityCCReports(object[4].toString());		
System.out.println("qnty - "+reports.getQuantityCCReports());
if(unit.equalsIgnoreCase("pcs"))
{
//	reports.setQuantityCCReports(object[4].toString());			
}

if(unit.equalsIgnoreCase("kg"))
{
	double kg = Double.parseDouble(object[10].toString());
	double grams = Double.parseDouble(object[11].toString());
	double kgAndGrams = (((kg*1000)+grams)/1000);
//	reports.setQuantityCCReports(Double.toString(kgAndGrams));
	//System.out.println(unit+" == Assign to ==> "+reports.getQuantityCCReports());
}

if(unit.equalsIgnoreCase("ltr"))
{
	double ltr = Double.parseDouble(object[12].toString());
	double mili = Double.parseDouble(object[13].toString());
	double ltrAndMili = (((ltr*1000)+mili)/1000);
//	reports.setQuantityCCReports(Double.toString(ltrAndMili));
	//System.out.println(unit+" == Assign to ==> "+reports.getQuantityCCReports());
}			
	reports.setCustomerBill(Integer.parseInt(object[0].toString()));
	reports.setItemName(object[1].toString());
	reports.setSoldDate(object[2].toString());
	reports.setSalePrice(Double.parseDouble(object[3].toString()));
	//reports.setQuantity1(((BigInteger) object[4]));

//reports.setTaxAmnt(Double.parseDouble(object[6].toString()));
reports.setTax(Double.parseDouble(object[8].toString()));
//reports.setiGSTPerc(Double.parseDouble(object[9].toString()));

reports.setTaxAmnt(Double.parseDouble(object[14].toString()));

Double trans1 = (Double.parseDouble(object[5].toString()));
if(trans1 != null){
	trans = (Double.parseDouble(object[5].toString()));
}else{
	trans = 0.0;
}

/*Double hamali1 = (Double.parseDouble(object[15].toString()));
if(hamali1 != null){
	hamali = (Double.parseDouble(object[15].toString()));
	reports.setHamaliexpense(BigDecimal.valueOf(hamali));
}else{
	reports.setHamaliexpense(BigDecimal.ZERO);
}*/

Double totalWithoutExpense = (Double.parseDouble(object[7].toString()));
Double Discount =reports.getDiscountAmount();
Double TaxAmnt =reports.getTaxAmnt();
//Double total = ((totalWithoutExpense - disValue) + TaxAmnt + perProducthamaliExp);
//reports.setTotalAmount((double)Math.round(total*100)/100);
			reports.setTotalAmount(totalWithoutExpense);
			Double tax=reports.getTax();
			Double igst=reports.getiGSTPerc();
			System.out.println("tax - "+tax+" igst - "+igst);
/*			if(tax.equals(0.0)){
				reports.setTaxPerc(igst);
			}
			else{
				reports.setTaxPerc(tax);
			}*/
			reports.setTaxPerc(tax);
			System.out.println("taxperc - "+reports.getTaxPerc());
			saleList.add(reports);
	}}
	catch(Exception e)
	{
		e.printStackTrace();	
	}
	return saleList;	

}

//
public List<SaleReports> getallForSingleDate(String fDate)
{
	Double trans;
	Double hamali;
	Integer cmpBillNo = 0;
	int billCount = 0;
	double perProducthamaliExp= 0.0;
	
	HibernateUtility hbu=null;
	Session session=null;
	
	HibernateUtility hbu2=null;
	Session session2=null;
	
	List<SaleReports> saleList=null;
	
	System.out.println("Good Receive Dao from Sale Report------------> "+fDate);

try
{	
	 hbu = HibernateUtility.getInstance();
	 session = hbu.getHibernateSession();
	 Query query = session.createSQLQuery("SELECT bill_no, product_name, DATE(insert_date), sale_price, quantity, Discount_amount, Tax_amount, total_per_product, tax_percentage, igstPercentage, kg, grams, ltr, mili, total_gst_tax_per_product, hamali_expense, unit, cat_id,customer_name,bill_Type,email FROM fertilizer_billing WHERE  DATE(insert_date)='"+fDate+"'");

// query.setParameter("fDate", fDate);
// query.setParameter("cat", cat);
	 
	 List<Object[]> list = query.list();
	 
	 saleList= new ArrayList<SaleReports>(0);
 
	for (Object[] object : list)
	{
		 SaleReports reports = new SaleReports();
		 System.out.println("rslt - "+Arrays.toString(object));
		 Integer billNo =  Integer.parseInt(object[0].toString());
		
		 hbu2 = HibernateUtility.getInstance();
		 session2 = hbu2.getHibernateSession();
		 
		 Query query2 = session2.createSQLQuery("select bill_no, COUNT(bill_no) from fertilizer_billing where bill_no = "+billNo+" GROUP BY bill_no");			 
 
 List<Object[]> templist = query2.list();
 
 for (Object[] object2 : templist)
 {
	 cmpBillNo = Integer.parseInt(object2[0].toString());
	 billCount = Integer.parseInt(object2[1].toString());
 }
 
 Double hamali1 = (Double.parseDouble(object[15].toString()));
	if(hamali1 != null)
	{
		System.out.println("COUNT ==== "+billCount);

if(hamali1 > 0)
{
	hamali = (Double.parseDouble(object[15].toString()));
	perProducthamaliExp = hamali/billCount;
	//reports.setHamaliexpense(BigDecimal.valueOf(perProducthamaliExp));
}
else
{
	double hamaliExpForZero = 0.0;
	//reports.setHamaliexpense(BigDecimal.valueOf(hamaliExpForZero));
	}
}

Double disValue = Double.parseDouble(object[5].toString());

if(disValue > 0 && disValue != null)
{
	double perProductDiscount = disValue/billCount;
	//reports.setDiscountAmount(perProductDiscount);
}
else
{
	double perProductDiscountvalue = 0.0;
	//reports.setHamaliexpense(BigDecimal.valueOf(perProductDiscountvalue));
		}
	
String unit = object[16].toString();
reports.setUnit(unit);
reports.setQuantityCCReports(object[4].toString());			
if(unit.equalsIgnoreCase("pcs"))
{
//	reports.setQuantityCCReports(object[4].toString());			
}

if(unit.equalsIgnoreCase("kg"))
{
	double kg = Double.parseDouble(object[10].toString());
	double grams = Double.parseDouble(object[11].toString());
	double kgAndGrams = (((kg*1000)+grams)/1000);
//	reports.setQuantityCCReports(Double.toString(kgAndGrams));
	//System.out.println(unit+" == Assign to ==> "+reports.getQuantityCCReports());
}

if(unit.equalsIgnoreCase("ltr"))
{
	double ltr = Double.parseDouble(object[12].toString());
	double mili = Double.parseDouble(object[13].toString());
	double ltrAndMili = (((ltr*1000)+mili)/1000);
//	reports.setQuantityCCReports(Double.toString(ltrAndMili));
	//System.out.println(unit+" == Assign to ==> "+reports.getQuantityCCReports());
}			
	reports.setCustomerBill(Integer.parseInt(object[0].toString()));
	reports.setItemName(object[1].toString());
	reports.setSoldDate(object[2].toString());
	reports.setSalePrice(Double.parseDouble(object[3].toString()));
	//reports.setQuantity1(((BigInteger) object[4]));

//reports.setTaxAmnt(Double.parseDouble(object[6].toString()));
reports.setTax(Double.parseDouble(object[8].toString()));
//reports.setiGSTPerc(Double.parseDouble(object[9].toString()));

reports.setTaxAmnt(Double.parseDouble(object[14].toString()));

Double trans1 = (Double.parseDouble(object[5].toString()));
if(trans1 != null){
	trans = (Double.parseDouble(object[5].toString()));
}else{
	trans = 0.0;
}

Double totalWithoutExpense = (Double.parseDouble(object[7].toString()));
Double Discount =reports.getDiscountAmount();
Double TaxAmnt =reports.getTaxAmnt();

reports.setCusomerName((object[18].toString()));
reports.setBillingtype((object[19].toString()));
/*if(object[20]==null)
{
	reports.setEmail("N/A");	
}
else {*/
	reports.setEmail(object[20].toString());
//}

//Double total = ((totalWithoutExpense - disValue) + TaxAmnt + perProducthamaliExp);
//reports.setTotalAmount((double)Math.round(total*100)/100);
			reports.setTotalAmount(totalWithoutExpense);
			Double tax=reports.getTax();
			Double igst=reports.getiGSTPerc();
			reports.setTaxPerc(tax);
			/*
				 * if(tax == 0.00){ reports.setTaxPerc(igst); } else{ reports.setTaxPerc(tax); }
				 */
			saleList.add(reports);
	}}
	catch(Exception e)
	{
		e.printStackTrace();	
	}
	return saleList;	

}


public List<SaleReports> getSaleDetailsAsPerCategoryBetweeenTwoDates(
		String cat, String fDate, String sDate) {
	Double trans;
	Double hamali;
	System.out.println(cat+"Category in dao");
System.out.println(fDate+"                 fDate in dao");
System.out.println(sDate+"			sDate in dao");
HibernateUtility hbu=null;
Session session=null;
List<SaleReports> saleList=null;
try
{
 hbu = HibernateUtility.getInstance();
 session = hbu.getHibernateSession();
/*	 Query query = session.createSQLQuery(" SELECT bill_no,product_name, DATE(insert_date), Without_Tax_Rate, quantity, Discount_amount, Tax_amount, total_per_product,tax_percentage,igstPercentage FROM fertilizer_billing WHERE cat_id =:cat AND DATE(insert_date) BETWEEN '"+fDate+"' AND '"+sDate+"'");*/
 Query query = session.createSQLQuery("SELECT bill_no, product_name, DATE(insert_date), sale_price, quantity, Discount_amount, Tax_amount, total_per_product, tax_percentage, igstPercentage, kg, grams, ltr, mili, total_gst_tax_per_product, unit FROM fertilizer_billing WHERE cat_id ='"+cat+"' AND DATE(insert_date) BETWEEN '"+fDate+"' AND '"+sDate+"'");
// query.setParameter("cat", cat);	 
/* query.setParameter("fDate", fDate);
	query.setParameter("sDate", sDate);*/

System.out.println(cat+"   Category in dao");
System.out.println(fDate+" fDate in dao");
System.out.println(sDate+" sDate in dao");
System.out.println("qry - "+query.list().size());
List<Object[]> list = query.list();
 saleList= new ArrayList<SaleReports>(0);


for (Object[] object : list) {
	
SaleReports reports = new SaleReports();
System.out.println("rslr -  "+Arrays.toString(object));
String unit = object[15].toString();
reports.setUnit(unit);
//System.out.println("UNIT FOR CREDIT CUSTOMER SALE REPORTS ==========>                "+unit);

if(unit.equalsIgnoreCase("pcs"))
{
//	reports.setQuantityCCReports(object[4].toString());
//	System.out.println(unit+" == Assign to ==> "+reports.getQuantityCCReports());
}

if(unit.equalsIgnoreCase("kg"))
{
	double kg = Double.parseDouble(object[10].toString());
	double grams = Double.parseDouble(object[11].toString());
	double kgAndGrams = (((kg*1000)+grams)/1000);
//	reports.setQuantityCCReports(Double.toString(kgAndGrams));
//	System.out.println(unit+" == Assign to ==> "+reports.getQuantityCCReports());
}

if(unit.equalsIgnoreCase("ltr"))
{
	double ltr = Double.parseDouble(object[12].toString());
	double mili = Double.parseDouble(object[13].toString());
	double ltrAndMili = (((ltr*1000)+mili)/1000);
//	reports.setQuantityCCReports(Double.toString(ltrAndMili));

}			

reports.setQuantityCCReports(object[4].toString());
//System.out.println(unit+" == Assign to ==> "+reports.getQuantityCCReports());
reports.setCustomerBill(Integer.parseInt(object[0].toString()));
	/*reports.setCusomerName(object[1].toString());*/
reports.setItemName(object[1].toString());
reports.setSoldDate(object[2].toString());
reports.setSalePrice(Double.parseDouble(object[3].toString()));
//reports.setQuantity1(((BigInteger) object[4]));
//reports.setDiscountAmount(Double.parseDouble(object[5].toString()));
//reports.setTaxAmnt(Double.parseDouble(object[6].toString()));
reports.setTax(Double.parseDouble(object[8].toString()));
//reports.setiGSTPerc(Double.parseDouble(object[9].toString()));			
/*reports.setKg((object[10].toString()));
reports.setGrams((object[11].toString()));
reports.setLtr((object[12].toString()));
reports.setMili((object[13].toString()));*/
if(object[14] == null)
{
	reports.setTaxAmnt(0.0);
}
else
{
	reports.setTaxAmnt(Double.parseDouble(object[14].toString()));
}

//System.out.println("setTaxAmnt ==== "+reports.getTaxAmnt());
//System.out.println("Total Tax Amount ==== "+reports.getTaxAmnt());			

Double trans1 = (Double.parseDouble(object[6].toString()));
if(trans1 != null){
	trans = (Double.parseDouble(object[6].toString()));
}else{
	trans = 0.0;
}

Double hamali1 = (Double.parseDouble(object[7].toString()));
if(hamali1 != null){
	hamali = (Double.parseDouble(object[7].toString()));
}else{
	 hamali = 0.0;
}

Double totalWithoutExpense = (Double.parseDouble(object[7].toString()));
Double Discount =reports.getDiscountAmount();
Double TaxAmnt =reports.getTaxAmnt();
//Double total = totalWithoutExpense - Discount + TaxAmnt;
//reports.setTotalAmount((double)Math.round(total*100)/100);
			reports.setTotalAmount(totalWithoutExpense);
			Double tax=reports.getTax();
			Double igst=reports.getiGSTPerc();
			if(tax == 0.00){
				reports.setTaxPerc(igst);
			}
			else{
				reports.setTaxPerc(tax);
			}
			saleList.add(reports);
	}}
	catch(Exception e)
	{
		e.printStackTrace();	
	}
	return saleList;	


}


//
public List<SaleReports> getallSaleDetailBetweeenTwoDates(
		String fDate, String sDate) {
	Double trans;
	Double hamali;
//	System.out.println(cat+"Category in dao");
System.out.println(fDate+"fDate in dao");
System.out.println(sDate+"sDate in dao");
HibernateUtility hbu=null;
Session session=null;
List<SaleReports> saleList=null;
try
{
 hbu = HibernateUtility.getInstance();
 session = hbu.getHibernateSession();
/*	 Query query = session.createSQLQuery(" SELECT bill_no,product_name, DATE(insert_date), Without_Tax_Rate, quantity, Discount_amount, Tax_amount, total_per_product,tax_percentage,igstPercentage FROM fertilizer_billing WHERE cat_id =:cat AND DATE(insert_date) BETWEEN '"+fDate+"' AND '"+sDate+"'");*/
 Query query = session.createSQLQuery("SELECT bill_no, product_name, DATE(insert_date), sale_price, quantity, Discount_amount, Tax_amount, total_per_product, tax_percentage, igstPercentage, kg, grams, ltr, mili, total_gst_tax_per_product, unit,customer_name,bill_Type,email  FROM fertilizer_billing WHERE DATE(insert_date) BETWEEN '"+fDate+"' AND '"+sDate+"'");
// query.setParameter("cat", cat);	 
/* query.setParameter("fDate", fDate);
	query.setParameter("sDate", sDate);*/

//System.out.println(cat+"Category in dao");
System.out.println(fDate+"fDate in dao");
System.out.println(sDate+"sDate in dao");

List<Object[]> list = query.list();
 saleList= new ArrayList<SaleReports>(0);


for (Object[] object : list) {
	
SaleReports reports = new SaleReports();
System.out.println("rslt - "+Arrays.toString(object));
reports.setBillNo(object[0].toString());
System.out.println("bill no - "+reports.getBillNo());
String unit = object[15].toString();
reports.setUnit(unit);
System.out.println("UNIT FOR CREDIT CUSTOMER SALE REPORTS ==========> "+unit);

reports.setQuantityCCReports(object[4].toString());

/*
if(unit.equalsIgnoreCase("pcs"))
{
//	reports.setQuantityCCReports(object[4].toString());
	System.out.println(unit+" == Assign to ==> "+reports.getQuantityCCReports());
}

if(unit.equalsIgnoreCase("kg"))
{
	double kg = Double.parseDouble(object[10].toString());
	double grams = Double.parseDouble(object[11].toString());
	double kgAndGrams = (((kg*1000)+grams)/1000);
//	reports.setQuantityCCReports(Double.toString(kgAndGrams));
	System.out.println(unit+" == Assign to ==> "+reports.getQuantityCCReports());
}

if(unit.equalsIgnoreCase("ltr"))
{
	double ltr = Double.parseDouble(object[12].toString());
	double mili = Double.parseDouble(object[13].toString());
	double ltrAndMili = (((ltr*1000)+mili)/1000);
//	reports.setQuantityCCReports(Double.toString(ltrAndMili));
	System.out.println(unit+" == Assign to ==> "+reports.getQuantityCCReports());
}			*/


	reports.setCustomerBill(Integer.parseInt(object[0].toString()));
	/*reports.setCusomerName(object[1].toString());*/
reports.setItemName(object[1].toString());
reports.setSoldDate(object[2].toString());
reports.setSalePrice(Double.parseDouble(object[3].toString()));
//reports.setQuantity1(((BigInteger) object[4]));
//reports.setDiscountAmount(Double.parseDouble(object[5].toString()));
//reports.setTaxAmnt(Double.parseDouble(object[6].toString()));
reports.setTax(Double.parseDouble(object[8].toString()));
//reports.setiGSTPerc(Double.parseDouble(object[9].toString()));			
/*reports.setKg((object[10].toString()));
reports.setGrams((object[11].toString()));
reports.setLtr((object[12].toString()));
reports.setMili((object[13].toString()));*/
if(object[14] == null)
{
	reports.setTaxAmnt(0.0);
}
else
{
	reports.setTaxAmnt(Double.parseDouble(object[14].toString()));
}

System.out.println("setTaxAmnt ==== "+reports.getTaxAmnt());
System.out.println("Total Tax Amount ==== "+reports.getTaxAmnt());			

Double trans1 = (Double.parseDouble(object[6].toString()));
if(trans1 != null){
	trans = (Double.parseDouble(object[6].toString()));
}else{
	trans = 0.0;
}

Double hamali1 = (Double.parseDouble(object[7].toString()));
if(hamali1 != null){
	hamali = (Double.parseDouble(object[7].toString()));
}else{
	 hamali = 0.0;
}

Double totalWithoutExpense = (Double.parseDouble(object[7].toString()));
Double Discount =reports.getDiscountAmount();
Double TaxAmnt =reports.getTaxAmnt();

reports.setCusomerName(object[16].toString());
reports.setBillingtype(object[17].toString());

if(object[18]==null)
{
	reports.setEmail("N/A");	
}
else {
	reports.setEmail(object[18].toString());
}
//reports.setEmail(object[18].toString());
//Double total = totalWithoutExpense - Discount + TaxAmnt;
//reports.setTotalAmount((double)Math.round(total*100)/100);
//			reports.setTotalAmount(totalWithoutExpense);
			reports.setTotalAmount(Double.parseDouble(object[7].toString()));
			
			Double tax=reports.getTax();
			Double igst=reports.getiGSTPerc();
//			reports.setTaxPerc(tax);
			reports.setTaxPerc(Double.parseDouble(object[8].toString()));
			
			/*
				 * if(tax == 0.00){ reports.setTaxPerc(igst); } else{ reports.setTaxPerc(tax); }
				 */
			saleList.add(reports);
	}}
	catch(Exception e)
	{
		e.printStackTrace();	
	}
	return saleList;	


}


public List<SaleReports> getSaleDetailsAsPerShopBetweeenTwoDates(
		String shop, String fDate, String sDate) {
	Double trans;
	Double hamali;
	System.out.println(shop+"Category in dao");
System.out.println(fDate+"fDate in dao");
System.out.println(sDate+"sDate in dao");
HibernateUtility hbu=null;
Session session=null;
List<SaleReports> saleList=null;
try
{
		hbu = HibernateUtility.getInstance();
 session = hbu.getHibernateSession();
 /*Query query = session.createSQLQuery(" SELECT bill_no,product_name, DATE(insert_date), Without_Tax_Rate, quantity, Discount_amount, Tax_amount, total_per_product,tax_percentage,igstPercentage FROM fertilizer_billing WHERE fk_shop_id ='"+shop+"' AND DATE(insert_date) BETWEEN '"+fDate+"' AND '"+sDate+"'");*/
 Query query = session.createSQLQuery(" SELECT bill_no,product_name, DATE(insert_date), sale_price, quantity, Discount_amount, Tax_amount, total_per_product,tax_percentage,igstPercentage, kg, grams, ltr, mili,total_gst_tax_per_product, unit FROM fertilizer_billing WHERE fk_shop_id ='"+shop+"' AND DATE(insert_date) BETWEEN '"+fDate+"' AND '"+sDate+"'");
 
 /*query.setParameter("shop", shop);*/	
/* query.setParameter("fDate", fDate);
	query.setParameter("sDate", sDate);*/

System.out.println(shop+"Category in dao");
System.out.println(fDate+"fDate in dao");
System.out.println(sDate+"sDate in dao");

List<Object[]> list = query.list();
 saleList= new ArrayList<SaleReports>(0);


for (Object[] object : list) {
	
	SaleReports reports = new SaleReports();
	
	String unit = object[15].toString();
	reports.setUnit(unit);
	System.out.println("UNIT FOR CREDIT CUSTOMER SALE REPORTS ==========> "+unit);

if(unit.equalsIgnoreCase("pcs"))
{
	
}

else if(unit.equalsIgnoreCase("kg"))
{
	double kg = Double.parseDouble(object[10].toString());
	double grams = Double.parseDouble(object[11].toString());
	double kgAndGrams = (((kg*1000)+grams)/1000);
	reports.setQuantityCCReports(Double.toString(kgAndGrams));
	System.out.println(unit+" == Assign to ==> "+reports.getQuantityCCReports());
}

else if(unit.equalsIgnoreCase("ltr"))
{
	double ltr = Double.parseDouble(object[12].toString());
	double mili = Double.parseDouble(object[13].toString());
	double ltrAndMili = (((ltr*1000)+mili)/1000);
	reports.setQuantityCCReports(Double.toString(ltrAndMili));
	System.out.println(unit+" == Assign to ==> "+reports.getQuantityCCReports());
}
else {
	reports.setQuantityCCReports(object[4].toString());
	System.out.println(unit+" == Assign to ==> "+reports.getQuantityCCReports());
}

reports.setCustomerBill(Integer.parseInt(object[0].toString()));
/*reports.setCusomerName(object[1].toString());*/
reports.setItemName(object[1].toString());
reports.setSoldDate(object[2].toString());
reports.setSalePrice(Double.parseDouble(object[3].toString()));
reports.setDiscountAmount(Double.parseDouble(object[5].toString()));
//reports.setTaxAmnt(Double.parseDouble(object[6].toString()));
reports.setTax(Double.parseDouble(object[8].toString()));
reports.setiGSTPerc(Double.parseDouble(object[9].toString()));
reports.setTaxAmnt(Double.parseDouble(object[14].toString()));

Double trans1 = (Double.parseDouble(object[6].toString()));
if(trans1 != null){
	trans = (Double.parseDouble(object[6].toString()));
}else{
	trans = 0.0;
}

Double hamali1 = (Double.parseDouble(object[7].toString()));
if(hamali1 != null){
	hamali = (Double.parseDouble(object[7].toString()));
}else{
	 hamali = 0.0;
}

Double totalWithoutExpense = (Double.parseDouble(object[7].toString()));
Double Discount =reports.getDiscountAmount();
Double TaxAmnt =reports.getTaxAmnt();
//Double tempTotal = (totalWithoutExpense - Discount + TaxAmnt);
//Double total = Math.round(tempTotal*100) / 100.0;
//reports.setTotalAmount(total);
reports.setTotalAmount(totalWithoutExpense);
System.out.println("==============    "+reports.getTotalAmount()+"   ==============");
			Double tax=reports.getTax();
			Double igst=reports.getiGSTPerc();
				/*
				 * if(tax == 0.00){ reports.setTaxPerc(igst); } else{ reports.setTaxPerc(tax); }
				 */
			saleList.add(reports);
	}}
	catch(Exception e)
	{
		e.printStackTrace();	
	}
	return saleList;	


}

//
public List<SaleReports> getSaleDetailsAsPeruserBetweeenTwoDates(
		String shop, String fDate, String sDate) {
	Double trans;
	Double hamali;
	System.out.println("````````````````` user id -   "+shop+"   , Category in dao");
System.out.println(fDate+"fDate in dao");
System.out.println(sDate+"sDate in dao");
HibernateUtility hbu=null;
Session session=null;
List<SaleReports> saleList=null;
try
{
		hbu = HibernateUtility.getInstance();
 session = hbu.getHibernateSession();
 /*Query query = session.createSQLQuery(" SELECT bill_no,product_name, DATE(insert_date), Without_Tax_Rate, quantity, Discount_amount, Tax_amount, total_per_product,tax_percentage,igstPercentage FROM fertilizer_billing WHERE fk_shop_id ='"+shop+"' AND DATE(insert_date) BETWEEN '"+fDate+"' AND '"+sDate+"'");*/
 Query query = session.createSQLQuery(" SELECT bill_no,product_name, DATE(insert_date), sale_price, quantity, Discount_amount, Tax_amount, total_per_product,tax_percentage,igstPercentage, kg, grams, ltr, mili,total_gst_tax_per_product, unit FROM fertilizer_billing WHERE user_id ='"+shop+"' AND DATE(insert_date) BETWEEN '"+fDate+"' AND '"+sDate+"'");
 
 /*query.setParameter("shop", shop);*/	
/* query.setParameter("fDate", fDate);
	query.setParameter("sDate", sDate);*/

System.out.println(shop+" - usr id	aCategory in dao");
System.out.println(fDate+"fDate in dao");
System.out.println(sDate+"sDate in dao");

List<Object[]> list = query.list();
 saleList= new ArrayList<SaleReports>(0);


for (Object[] object : list) {
	
	SaleReports reports = new SaleReports();
	
	String unit = object[15].toString();
	reports.setUnit(unit);
	System.out.println("UNIT FOR CREDIT CUSTOMER SALE REPORTS ==========> "+unit);

if(unit.equalsIgnoreCase("pcs"))
{
	reports.setQuantityCCReports(object[4].toString());
	System.out.println(unit+" == Assign to ==> "+reports.getQuantityCCReports());
}

else if(unit.equalsIgnoreCase("kg"))
{
	double kg = Double.parseDouble(object[10].toString());
	double grams = Double.parseDouble(object[11].toString());
	double kgAndGrams = (((kg*1000)+grams)/1000);
	reports.setQuantityCCReports(Double.toString(kgAndGrams));
	System.out.println(unit+" == Assign to ==> "+reports.getQuantityCCReports());
}

else if(unit.equalsIgnoreCase("ltr"))
{
	double ltr = Double.parseDouble(object[12].toString());
	double mili = Double.parseDouble(object[13].toString());
	double ltrAndMili = (((ltr*1000)+mili)/1000);
	reports.setQuantityCCReports(Double.toString(ltrAndMili));
	System.out.println(unit+" == Assign to ==> "+reports.getQuantityCCReports());
}
else {
	reports.setQuantityCCReports(object[4].toString());
	System.out.println(unit+" == Assign to ==> "+reports.getQuantityCCReports());
}

reports.setCustomerBill(Integer.parseInt(object[0].toString()));
/*reports.setCusomerName(object[1].toString());*/
reports.setItemName(object[1].toString());
reports.setSoldDate(object[2].toString());
reports.setSalePrice(Double.parseDouble(object[3].toString()));
reports.setDiscountAmount(Double.parseDouble(object[5].toString()));
//reports.setTaxAmnt(Double.parseDouble(object[6].toString()));
reports.setTax(Double.parseDouble(object[8].toString()));
//reports.setiGSTPerc(Double.parseDouble(object[9].toString()));
reports.setTaxAmnt(Double.parseDouble(object[14].toString()));

Double trans1 = (Double.parseDouble(object[6].toString()));
if(trans1 != null){
	trans = (Double.parseDouble(object[6].toString()));
}else{
	trans = 0.0;
}

Double hamali1 = (Double.parseDouble(object[7].toString()));
if(hamali1 != null){
	hamali = (Double.parseDouble(object[7].toString()));
}else{
	 hamali = 0.0;
}

Double totalWithoutExpense = (Double.parseDouble(object[7].toString()));
Double Discount =reports.getDiscountAmount();
Double TaxAmnt =reports.getTaxAmnt();
//Double tempTotal = (totalWithoutExpense - Discount + TaxAmnt);
//Double total = Math.round(tempTotal*100) / 100.0;
//reports.setTotalAmount(total);
reports.setTotalAmount(totalWithoutExpense);
System.out.println("==============    "+reports.getTotalAmount()+"   ==============");
			Double tax=reports.getTax();
			Double igst=reports.getiGSTPerc();
			if(tax == 0.00){
				reports.setTaxPerc(igst);
			}
			else{
				reports.setTaxPerc(tax);
			}
			saleList.add(reports);
	}}
	catch(Exception e)
	{
		e.printStackTrace();	
	}
	return saleList;	


}



public List<SaleReports> getSaleDetailsAsPerProductNameForSingleDate(
		String cat, String fDate, String productName) {
	Double trans;
	Double hamali;
	System.out.println(cat+"Category in dao");
System.out.println(fDate+"fDate in dao");
System.out.println(productName+"productName in dao");
HibernateUtility hbu=null;
Session session=null;
List<SaleReports> saleList=null;
try
{
		hbu = HibernateUtility.getInstance();
 session = hbu.getHibernateSession();
 /*Query query = session.createSQLQuery(" SELECT bill_no,product_name, DATE(insert_date), Without_Tax_Rate, quantity, Discount_amount, Tax_amount, total_per_product,tax_percentage,igstPercentage FROM fertilizer_billing WHERE cat_id =:cat AND product_name=:productName AND DATE(insert_date) =:fDate");*/
 Query query = session.createSQLQuery(" SELECT bill_no,product_name, DATE(insert_date), sale_price, quantity, Discount_amount, Tax_amount, total_per_product,tax_percentage,igstPercentage, kg, grams, ltr, mili, total_gst_tax_per_product, unit FROM fertilizer_billing WHERE cat_id =:cat AND product_name=:productName AND DATE(insert_date) =:fDate");
 query.setParameter("cat", cat);
 query.setParameter("productName", productName);
 query.setParameter("fDate", fDate);
/* query.setParameter("fDate", fDate);
	query.setParameter("sDate", sDate);*/

System.out.println(cat+"Category in dao");
System.out.println(fDate+"fDate in dao");
System.out.println(productName+"productName in dao");

List<Object[]> list = query.list();
 saleList= new ArrayList<SaleReports>(0);


for (Object[] object : list) {
	
	SaleReports reports = new SaleReports();
	
	String unit = object[15].toString();
	reports.setUnit(unit);
	System.out.println("UNIT FOR CREDIT CUSTOMER SALE REPORTS ==========> "+unit);
	reports.setQuantityCCReports(object[4].toString());
if(unit.equalsIgnoreCase("pcs"))
{
//	reports.setQuantityCCReports(object[4].toString());
//	System.out.println(unit+" == Assign to ==> "+reports.getQuantityCCReports());
}

if(unit.equalsIgnoreCase("kg"))
{
	double kg = Double.parseDouble(object[10].toString());
	double grams = Double.parseDouble(object[11].toString());
	double kgAndGrams = (((kg*1000)+grams)/1000);
//	reports.setQuantityCCReports(Double.toString(kgAndGrams));
	System.out.println(unit+" == Assign to ==> "+reports.getQuantityCCReports());
}

if(unit.equalsIgnoreCase("ltr"))
{
	double ltr = Double.parseDouble(object[12].toString());
	double mili = Double.parseDouble(object[13].toString());
	double ltrAndMili = (((ltr*1000)+mili)/1000);
//	reports.setQuantityCCReports(Double.toString(ltrAndMili));
	System.out.println(unit+" == Assign to ==> "+reports.getQuantityCCReports());
}

reports.setCustomerBill(Integer.parseInt(object[0].toString()));
/*reports.setCusomerName(object[1].toString());*/
reports.setItemName(object[1].toString());
reports.setSoldDate(object[2].toString());
reports.setSalePrice(Double.parseDouble(object[3].toString()));
//reports.setQuantity1(((BigInteger) object[4]));
reports.setDiscountAmount(Double.parseDouble(object[5].toString()));
//reports.setTaxAmnt(Double.parseDouble(object[6].toString()));
reports.setTax(Double.parseDouble(object[8].toString()));
//reports.setiGSTPerc(Double.parseDouble(object[9].toString()));
reports.setTaxAmnt(Double.parseDouble(object[14].toString()));

Double trans1 = (Double.parseDouble(object[6].toString()));
if(trans1 != null){
	trans = (Double.parseDouble(object[6].toString()));
}else{
	trans = 0.0;
}

Double hamali1 = (Double.parseDouble(object[7].toString()));
if(hamali1 != null){
	hamali = (Double.parseDouble(object[7].toString()));
}else{
	 hamali = 0.0;
}

Double totalWithoutExpense = (Double.parseDouble(object[7].toString()));
Double Discount =reports.getDiscountAmount();
Double TaxAmnt =reports.getTaxAmnt();
//Double total = totalWithoutExpense - Discount + TaxAmnt;
//reports.setTotalAmount(total);
			reports.setTotalAmount(totalWithoutExpense);
			Double tax=reports.getTax();
			Double igst=reports.getiGSTPerc();
			reports.setTaxPerc(tax);
			/*
				 * if(tax == 0.00){ reports.setTaxPerc(igst); } else{ reports.setTaxPerc(tax); }
				 */
			saleList.add(reports);
	}}
	catch(Exception e)
	{
		e.printStackTrace();	
	}
	return saleList;	

}


public List<SaleReports> getSaleDetailsAsPerProductNamesBetweeenTwoDates(
		String cat, String fDate, String sDate, String product) {

	Double trans;
	Double hamali;
	System.out.println(cat+"					Category in dao");
System.out.println(fDate+"			fDate in dao");
System.out.println(product+"			productName in dao");
HibernateUtility hbu=null;
Session session=null;
List<SaleReports> saleList=null;
try
{
		hbu = HibernateUtility.getInstance();
 session = hbu.getHibernateSession();
 /*Query query = session.createSQLQuery(" SELECT bill_no,product_name, DATE(insert_date), Without_Tax_Rate, quantity, Discount_amount, Tax_amount, total_per_product,tax_percentage,igstPercentage FROM fertilizer_billing WHERE cat_id =:cat AND product_name=:productName AND DATE(insert_date) BETWEEN '"+fDate+"' AND '"+sDate+"'");*/
 Query query = session.createSQLQuery(" SELECT bill_no,product_name, DATE(insert_date), sale_price, quantity, Discount_amount, Tax_amount, total_per_product,tax_percentage,igstPercentage, kg, grams, ltr, mili, total_gst_tax_per_product, unit FROM fertilizer_billing WHERE cat_id ='"+cat+"' AND product_name='"+product+"' AND DATE(insert_date) BETWEEN '"+fDate+"' AND '"+sDate+"'");
 //query.setParameter("cat", cat);
 //query.setParameter("productName", product);
 
/* query.setParameter("fDate", fDate);
	query.setParameter("sDate", sDate);*/

System.out.println(cat+"					Category in dao");
System.out.println(fDate+"					fDate in dao");
System.out.println(product+"				productName in dao");

List<Object[]> list = query.list();
 saleList= new ArrayList<SaleReports>(0);


for (Object[] object : list) {
	
	SaleReports reports = new SaleReports();
	System.out.println("rslt - - -    "+Arrays.toString(object));
	String unit = object[15].toString();
	reports.setUnit(unit);
	System.out.println("UNIT FOR CREDIT CUSTOMER SALE REPORTS ==========> "+unit);
	reports.setQuantityCCReports(object[4].toString());
if(unit.equalsIgnoreCase("pcs"))
{
//	reports.setQuantityCCReports(object[4].toString());
	System.out.println(unit+" == Assign to ==> "+reports.getQuantityCCReports());
}

if(unit.equalsIgnoreCase("kg"))
{
	double kg = Double.parseDouble(object[10].toString());
	double grams = Double.parseDouble(object[11].toString());
	double kgAndGrams = (((kg*1000)+grams)/1000);
//	reports.setQuantityCCReports(Double.toString(kgAndGrams));
	System.out.println(unit+" == Assign to ==> "+reports.getQuantityCCReports());
}

if(unit.equalsIgnoreCase("ltr"))
{
	double ltr = Double.parseDouble(object[12].toString());
	double mili = Double.parseDouble(object[13].toString());
	double ltrAndMili = (((ltr*1000)+mili)/1000);
//	reports.setQuantityCCReports(Double.toString(ltrAndMili));
	System.out.println(unit+" == Assign to ==> "+reports.getQuantityCCReports());
}


reports.setCustomerBill(Integer.parseInt(object[0].toString()));
/*reports.setCusomerName(object[1].toString());*/
reports.setItemName(object[1].toString());
reports.setSoldDate(object[2].toString());
reports.setSalePrice(Double.parseDouble(object[3].toString()));
//reports.setQuantity1(((BigInteger) object[4]));


reports.setDiscountAmount(Double.parseDouble(object[5].toString()));
//reports.setTaxAmnt(Double.parseDouble(object[6].toString()));
reports.setTax(Double.parseDouble(object[8].toString()));
//reports.setiGSTPerc(Double.parseDouble(object[9].toString()));
reports.setKg((object[10].toString()));
reports.setGrams((object[11].toString()));
reports.setLtr((object[12].toString()));
reports.setMili((object[13].toString()));
reports.setTaxAmnt(Double.parseDouble(object[14].toString()));

Double trans1 = (Double.parseDouble(object[6].toString()));
if(trans1 != null){
	trans = (Double.parseDouble(object[6].toString()));
}else{
	trans = 0.0;
}

Double hamali1 = (Double.parseDouble(object[7].toString()));
if(hamali1 != null){
	hamali = (Double.parseDouble(object[7].toString()));
}else{
	 hamali = 0.0;
}

Double totalWithoutExpense = (Double.parseDouble(object[7].toString()));
Double Discount =reports.getDiscountAmount();
Double TaxAmnt =reports.getTaxAmnt();
//Double total = totalWithoutExpense - Discount + TaxAmnt;
//reports.setTotalAmount(total);
			reports.setTotalAmount(totalWithoutExpense);
			Double tax=reports.getTax();
			Double igst=reports.getiGSTPerc();
			reports.setTaxPerc(tax);
				/*
				 * if(tax == 0.00){ reports.setTaxPerc(igst); } else{ reports.setTaxPerc(tax); }
				 */
			saleList.add(reports);
	}}
	catch(Exception e)
	{
		e.printStackTrace();	
	}
	return saleList;	


}

public List<SaleReports> gstSummaryReportsBetweenTwoDates(String fDate, String sDate) {

	Double trans;
	Double hamali;
	System.out.println(fDate+"fDate in dao");
HibernateUtility hbu=null;
Session session=null;
List<SaleReports> saleList=null;
try
{
		hbu = HibernateUtility.getInstance();
 session = hbu.getHibernateSession();
 Query query = session.createSQLQuery(" SELECT bill_no,product_name, DATE(insert_date), sale_price,sum(quantity), Discount_amount,sum(Tax_amount) , total_per_product,tax_percentage,igstPercentage FROM fertilizer_billing WHERE DATE(insert_date) BETWEEN '"+fDate+"' AND '"+sDate+"' group by tax_percentage,igstPercentage");
 
/* query.setParameter("fDate", fDate);
	query.setParameter("sDate", sDate);*/
		
List<Object[]> list = query.list();
 saleList= new ArrayList<SaleReports>(0);


for (Object[] object : list) {
	
	SaleReports reports = new SaleReports();
	reports.setCustomerBill(Integer.parseInt(object[0].toString()));
	/*reports.setCusomerName(object[1].toString());*/
			reports.setItemName(object[1].toString());
			reports.setSoldDate(object[2].toString());
			reports.setSalePrice(Double.parseDouble(object[3].toString()));
			reports.setQuantity3(((BigDecimal) object[4]));
			reports.setTax(Double.parseDouble(object[8].toString()));
			reports.setiGSTPerc(Double.parseDouble(object[9].toString()));
			
			Double gstPerc=reports.getTax();
			Double igstPerc=reports.getiGSTPerc();
			if(gstPerc != 0.00){
			reports.setTaxAmnt(Double.parseDouble(object[6].toString()));
			Double taxAmnt=reports.getTaxAmnt();
			Double sgstAmnt=taxAmnt/2;
			reports.setSgstAmnt(sgstAmnt);
			reports.setCgstAmnt(sgstAmnt);
			reports.setIgstAmnt(0.0);
			}
			else if(igstPerc != 0.00){
				reports.setTaxAmnt(Double.parseDouble(object[6].toString()));
				Double taxAmnt=reports.getTaxAmnt();
				reports.setIgstAmnt(taxAmnt);
				reports.setSgstAmnt(0.0);
				reports.setCgstAmnt(0.0);
				
			}
			else{
				continue;
			}
			
			saleList.add(reports);
	}}
	catch(Exception e)
	{
		e.printStackTrace();	
	}
	return saleList;	


}

public List<SaleReports> gstPurchaseSummaryReportsBetweenTwoDates(String fDate, String sDate) {

	Double trans;
	Double hamali;
	System.out.println(fDate+"fDate in dao");
HibernateUtility hbu=null;
Session session=null;
List<SaleReports> saleList=null;
try
{
		hbu = HibernateUtility.getInstance();
 session = hbu.getHibernateSession();
 Query query = session.createSQLQuery(" SELECT bill_number,product_name, DATE(purchaseDate), sale_price,sum(quantity), Discount_amount,sum(Tax_amount) , Per_Product_Total,tax_percentage,igstPercentage FROM goods_receive WHERE DATE(purchaseDate) BETWEEN '"+fDate+"' AND '"+sDate+"' group by tax_percentage,igstPercentage");
 
/* query.setParameter("fDate", fDate);
	query.setParameter("sDate", sDate);*/
		
List<Object[]> list = query.list();
 saleList= new ArrayList<SaleReports>(0);


for (Object[] object : list) {
	
	SaleReports reports = new SaleReports();
	reports.setCustomerBill(Integer.parseInt(object[0].toString()));
	/*reports.setCusomerName(object[1].toString());*/
			reports.setItemName(object[1].toString());
			reports.setSoldDate(object[2].toString());
			reports.setSalePrice(Double.parseDouble(object[3].toString()));
			reports.setQnty((object[4]).toString());
			reports.setTax(Double.parseDouble(object[8].toString()));
			reports.setiGSTPerc(Double.parseDouble(object[9].toString()));
			
			Double gstPerc=reports.getTax();
			Double igstPerc=reports.getiGSTPerc();
			if(gstPerc != 0.00){
			reports.setTaxAmnt(Double.parseDouble(object[6].toString()));
			Double taxAmnt=reports.getTaxAmnt();
			Double sgstAmnt=taxAmnt/2;
			reports.setSgstAmnt(sgstAmnt);
			reports.setCgstAmnt(sgstAmnt);
			reports.setIgstAmnt(0.0);
			}
			else if(igstPerc != 0.00){
				reports.setTaxAmnt(Double.parseDouble(object[6].toString()));
				Double taxAmnt=reports.getTaxAmnt();
				reports.setIgstAmnt(taxAmnt);
				reports.setSgstAmnt(0.0);
				reports.setCgstAmnt(0.0);
				
			}
			else{
				continue;
			}
			
			saleList.add(reports);
	}}
	catch(Exception e)
	{
		e.printStackTrace();	
	}
	return saleList;	


}


public List<SaleReports> getSaleDetailsAsPerSupplierName(String fkSupplierId) {

	Double trans;
	Double hamali;
	HibernateUtility hbu=null;
	Session session=null;
	List<SaleReports> saleList=null;
	try
	{
			hbu = HibernateUtility.getInstance();
	 session = hbu.getHibernateSession();
	 Query query = session.createSQLQuery(" SELECT bill_no,product_name, DATE(insert_date), Without_Tax_Rate, quantity, transportation_expense, hamali_expense, total_per_product FROM fertilizer_billing WHERE supplier_id=:fkSupplierId UNION SELECT bill_no, product_name,DATE(insert_date), sale_price, quantity, transportation_expense, hamali_expense, total_per_product FROM seed_pesticide_billing WHERE supplier_id=:fkSupplierId");
query.setParameter("fkSupplierId", fkSupplierId);
		List<Object[]> list = query.list();
		 saleList= new ArrayList<SaleReports>(0);
		
		
		for (Object[] object : list) {
			
		SaleReports reports = new SaleReports();
			reports.setCustomerBill(Integer.parseInt(object[0].toString()));
			reports.setItemName(object[1].toString());
			reports.setSoldDate(object[2].toString());
			reports.setSalePrice(Double.parseDouble(object[3].toString()));
			reports.setQuantity1(((BigInteger) object[4]));
			reports.setTransExpense(((BigDecimal) object[5]));
			reports.setHamaliexpense(((BigDecimal) object[6]));
			Double trans1 = (Double.parseDouble(object[5].toString()));
			if(trans1 != null){
				trans = (Double.parseDouble(object[5].toString()));
			}else{
				trans = 0.0;
			}
			
			Double hamali1 = (Double.parseDouble(object[6].toString()));
			if(hamali1 != null){
				hamali = (Double.parseDouble(object[6].toString()));
			}else{
				 hamali = 0.0;
			}
			
			Double totalWithoutExpense = (Double.parseDouble(object[7].toString()));
			Double total = totalWithoutExpense + hamali + trans;
			reports.setTotalAmount(total);
			saleList.add(reports);
	}}
	catch(Exception e)
	{
		e.printStackTrace();	
	}
	return saleList;	
	
}


public List<PurchaseDetailsFromGoodsReceive> geTaxDetailsAsPerCategoryForSingleDate(
		String cat, String fDate, String sDate) {


	
	HibernateUtility hbu=null;
	Session session=null;
	List<PurchaseDetailsFromGoodsReceive> purchaseList = null;
	try
	{
		hbu = HibernateUtility.getInstance();
		session = hbu.getHibernateSession();
		Query query = session.createSQLQuery("SELECT supplier_name, tin_no, bill_number, product_name, company_Name, weight,buy_price,mrp, tax_percentage, quantity FROM goods_receive RIGHT JOIN supplier_details on fk_supplier_id=pk_supplier_id WHERE fkCategoryId =:cat AND DATE(insertDate) BETWEEN :fDate AND :sDate UNION SELECT supplier_name, tin_no, bill_number, product_name, company_Name, weight,buy_price,mrp, tax_percentage, quantity FROM goods_receive RIGHT JOIN supplier_details on fk_supplier_id=pk_supplier_id WHERE fkCategoryId =:cat AND DATE(insertDate) BETWEEN :fDate AND :sDate");
 query.setParameter("cat", cat);
 query.setParameter("fDate", fDate);
 query.setParameter("sDate", sDate);
 

List<Object[]> list = query.list();
purchaseList = new ArrayList<PurchaseDetailsFromGoodsReceive>(0);

for (Object[] o : list) {
	
	PurchaseDetailsFromGoodsReceive reports = new PurchaseDetailsFromGoodsReceive();
	
	reports.setSupplier(o[0].toString());
	reports.setTinNo(o[1].toString());
	reports.setBillNo(o[2].toString());
	reports.setProductName(o[3].toString());
	reports.setCompanyName(o[4].toString());
	reports.setWeight(Double.parseDouble(o[5].toString()));
	reports.setBuyPrice(Double.parseDouble(o[6].toString()));
	reports.setMrp(Double.parseDouble(o[7].toString()));
	reports.setTaxPercentage(Double.parseDouble(o[8].toString()));
	reports.setQuantity2(Double.parseDouble(o[9].toString()));
	//tax Amount calculation as per quantity
			Double quantity = Double.parseDouble(o[9].toString());
			Double taxPercentage = Double.parseDouble(o[8].toString());
			Double buyPrice = Double.parseDouble(o[6].toString());
			Double taxAmt = (taxPercentage/100)*buyPrice;
			Double newBuyPrice = buyPrice + taxAmt;
			Double totalTaxAmt = quantity *taxAmt ;
			
			reports.setTaxAmount(totalTaxAmt);
			purchaseList.add(reports); 
	
		}}
	catch(Exception e)
	{
		e.printStackTrace();	
	}
	return purchaseList;	

}


public List<StockDetail> getStockDetailsAsPerProductName(String proName, String weight, String company, HttpServletRequest request) 
{
	HttpSession usersession = request.getSession(true);
	String userid = (String)usersession.getAttribute("userid");
	String shopid = (String)usersession.getAttribute("shopid");
	String usertype = (String)usersession.getAttribute("usertype");
	
	HibernateUtility hbu=null;
	Session session=null;
	List<StockDetail> stockList = null;
	Query query = null;
	String ss = "admin";
	
	try
	{
		hbu = HibernateUtility.getInstance();
		session = hbu.getHibernateSession();
		
		if(usertype.equals(ss)) {
			 query = session.createSQLQuery("SELECT sd.ProductName, sd.CompanyName, sd.weight, gr.quantity, sd.avail_Quantity, su.unit_name,sd.shop_name FROM stock_detail sd join product_details pd on sd.productId = pd.pk_product_id join sold_units su on pd.fk_unit_id = su.pk_unit_id join goods_receive gr on gr.fk_product_id = sd.productId WHERE sd.ProductName = pd.product_name and sd.CompanyName = pd.manufacturing_company and sd.Weight = pd.weight AND sd.ProductName = '"+proName+"' AND sd.CompanyName = '"+company+"' AND sd.Weight= '"+weight+"' GROUP BY pd.product_name");		
		}
		else {
			 query = session.createSQLQuery("SELECT sd.ProductName, sd.CompanyName, sd.weight, gr.quantity, sd.avail_Quantity, su.unit_name,sd.shop_name FROM stock_detail sd join product_details pd on sd.productId = pd.pk_product_id join sold_units su on pd.fk_unit_id = su.pk_unit_id join goods_receive gr on gr.fk_product_id = sd.productId WHERE sd.ProductName = pd.product_name and sd.CompanyName = pd.manufacturing_company and sd.Weight = pd.weight AND sd.ProductName = '"+proName+"' AND sd.CompanyName = '"+company+"' AND sd.Weight= '"+weight+"' AND sd.fk_shop_id = '"+shopid+"' GROUP BY pd.product_name");
		}
		
List<Object[]> list = query.list();
stockList = new ArrayList<StockDetail>(0);
for (Object[] object : list) {
	
	StockDetail reports = new StockDetail();
	
	reports.setProductName(object[0].toString());
	reports.setCompanyName(object[1].toString());
	reports.setWeight((Double)object[2]);
	reports.setQuantity((Double)object[3]);	
	reports.setAvailableeQuantity((Double)object[4]);		
//	if(object[5].toString().equals("pcs")) {
//reports.setUnit("Box/pcs");
//			}else {
				reports.setUnit(object[5].toString());
//			}
	reports.setShopname(object[6].toString());		
		
			stockList.add(reports); 
	
		}}
	catch(Exception e)
	{
		e.printStackTrace();	
	}
	return stockList;	

}


//sale detail as per payment mode
public List<SaleReports> getSaleDetailsAsPerPaymentMode(String paymentMode, String fk_cat_id) {

	Double trans;
	Double hamali;
	HibernateUtility hbu=null;
	Session session=null;
	List<SaleReports> saleList=null;
	try
	{
			hbu = HibernateUtility.getInstance();
	 session = hbu.getHibernateSession();
	 Query query = session.createSQLQuery("SELECT bill_no,customer_name,gross_total from fertilizer_billing where cat_id='"+fk_cat_id+"' AND payment_mode ='"+paymentMode+"' AND fk_customer_id= 0 GROUP BY bill_no UNION SELECT bill_no,customer_name,gross_total from seed_pesticide_billing where cat_id='"+fk_cat_id+"' AND payment_mode ='"+paymentMode+"' AND fk_customer_id= 0 GROUP BY bill_no  UNION SELECT bill_no,customer_name,gross_total from pesticide_billing where cat_id='"+fk_cat_id+"' AND payment_mode ='"+paymentMode+"' AND fk_customer_id= 0 GROUP BY bill_no;");
//query.setParameter("paymentMode", paymentMode);
		List<Object[]> list = query.list();
		 saleList= new ArrayList<SaleReports>(0);
		for (Object[] object : list) {
			
		SaleReports reports = new SaleReports();
			reports.setCustomerBill(Integer.parseInt(object[0].toString()));
			reports.setCusomerName(object[1].toString());
			reports.setTotalAmount(Double.parseDouble(object[2].toString()));
			saleList.add(reports);
	}}
	catch(Exception e)
	{
		e.printStackTrace();	
	}
	return saleList;	


}



public List<SaleReports> getSaleDetailsAsPerPaymentModeForSingleDate(
		String singleDate, String paymentModeIdForDate) {
	Double trans;
	Double hamali;
	HibernateUtility hbu=null;
	Session session=null;
	List<SaleReports> saleList=null;
	try
	{
		hbu = HibernateUtility.getInstance();
		session = hbu.getHibernateSession();
		
		Query query = session.createSQLQuery("SELECT bill_no, payment_mode, total_per_product, gross_total FROM fertilizer_billing WHERE payment_mode = '"+paymentModeIdForDate+"' AND gross_total > 0.0 AND DATE(insert_date) = '"+singleDate+"'");
//query.setParameter("paymentMode", paymentMode);
List<Object[]> list = query.list();
 saleList= new ArrayList<SaleReports>(0);
for (Object[] object : list) {
SaleReports reports = new SaleReports();
String mode = object[1].toString();
System.out.println(mode+"PAYMENT MODE");

reports.setCustomerBill(Integer.parseInt(object[0].toString()));
reports.setTotalAmount(Double.parseDouble(object[2].toString()));

if(mode.equals("cash"))
{
	if(Double.parseDouble(object[3].toString()) > 0.0)
	{
		reports.setCashAmount(Double.parseDouble(object[3].toString()));
		reports.setChequeAmount(0.0);
		reports.setCardAmount(0.0);
		reports.setNeftAmount(0.0);
	}
}
else if(mode.equals("cheque"))
{
	if(Double.parseDouble(object[3].toString()) > 0.0)
	{
		reports.setChequeAmount(Double.parseDouble(object[3].toString()));
		reports.setCardAmount(0.0);
		reports.setNeftAmount(0.0);
		reports.setCashAmount(0.0);
	}
	
}
else if(mode.equals("card"))
{
	if(Double.parseDouble(object[3].toString()) > 0.0)
	{
		reports.setCardAmount(Double.parseDouble(object[3].toString()));
		reports.setNeftAmount(0.0);
		reports.setCashAmount(0.0);
		reports.setChequeAmount(0.0);
	}
}
else if(mode.equals("neft"))
{
	if(Double.parseDouble(object[3].toString()) > 0.0)
	{
		reports.setNeftAmount(Double.parseDouble(object[3].toString()));
		reports.setCashAmount(0.0);
		reports.setChequeAmount(0.0);
		reports.setCardAmount(0.0);
	}
}
/*delete below if block if code Payment Mode Wise Reports => Datewise didn't work*/
/*else if(mode.equals("selected")){
	reports.setNeftAmount(0.0);
	reports.setCashAmount(0.0);
	reports.setChequeAmount(0.0);
	reports.setCardAmount(0.0);
}*/
			
			saleList.add(reports);
		}
		
}
	catch(Exception e)
	{
		e.printStackTrace();	
	}
	return saleList;	

}

public List<SaleReports> getSaleDetailsAsGST(String cat,String fDate,String sDate) {
	Double trans;
	Double hamali;
	System.out.println(cat+"Category in dao");
System.out.println(fDate+"fDate in dao");
System.out.println(sDate+"sDate in dao");
HibernateUtility hbu=null;
Session session=null;
List<SaleReports> saleList=null;
String status = "GST";
try
{
	Long k = 0l;
 hbu = HibernateUtility.getInstance();
 session = hbu.getHibernateSession();
 
 NumberFormat formatter = new DecimalFormat("#0.00");
 
 /*Query query = session.createSQLQuery(" SELECT f.insert_date, f.customer_name, f.product_name,f.Without_Tax_Rate,f.quantity,f.tax_percentage,f.gross_total,f.bill_no,f.igstPercentage,f.hsn FROM fertilizer_billing f  WHERE cat_id ='"+cat+"'AND insert_date BETWEEN '"+fDate+"' AND '"+sDate+"'");*/
 Query query = session.createSQLQuery(" SELECT f.insert_date, f.customer_name, f.product_name, f.sale_price, f.quantity,f.tax_percentage,f.gross_total,f.bill_no,f.igstPercentage,f.hsn, f.kg, f.grams, f.ltr, f.mili, f.total_per_product, f.total_gst_tax_per_product, f.total_igst_tax_per_product, f.unit FROM fertilizer_billing f  WHERE cat_id ='"+cat+"' AND f.bill_Type = '"+status+"' AND f.tax_percentage > 0 OR f.igstPercentage > 0 AND insert_date BETWEEN '"+fDate+"' AND '"+sDate+"'");
 /* query.setParameter("cat", cat);	
query.setParameter("fDate", fDate);
query.setParameter("sDate", sDate);*/

System.out.println(cat+"Category in dao");
System.out.println(fDate+"fDate in dao");
System.out.println(sDate+"sDate in dao");

List<Object[]> list = query.list();
 saleList= new ArrayList<SaleReports>(0);
for (Object[] o : list)
{
  SaleReports reports = new SaleReports();
  k++;
	String tax = o[5].toString();
	//String igstTax = o[8].toString();			

String unit = o[17].toString();
if(unit.equalsIgnoreCase("pcs")) {
reports.setUnit("Box");
}else {
	reports.setUnit(unit);
}

System.out.println("UNIT FOR CREDIT CUSTOMER SALE REPORTS ==========> "+unit);

if(unit.equalsIgnoreCase("pcs"))
{
	reports.setQuantityCCReports(o[4].toString());
	System.out.println(unit+" == Assign to ==> "+reports.getQuantityCCReports());
}

else if(unit.equalsIgnoreCase("kg"))
{
	double kg = Double.parseDouble(o[10].toString());
	double grams = Double.parseDouble(o[11].toString());
	double kgAndGrams = (((kg*1000)+grams)/1000);
	reports.setQuantityCCReports(Double.toString(kgAndGrams));
	System.out.println(unit+" == Assign to ==> "+reports.getQuantityCCReports());
}

else if(unit.equalsIgnoreCase("ltr"))
{
	double ltr = Double.parseDouble(o[12].toString());
	double mili = Double.parseDouble(o[13].toString());
	double ltrAndMili = (((ltr*1000)+mili)/1000);
	reports.setQuantityCCReports(Double.toString(ltrAndMili));
	System.out.println(unit+" == Assign to ==> "+reports.getQuantityCCReports());
}
else {
	reports.setQuantityCCReports(o[4].toString());
	System.out.println(unit+" == Assign to ==> "+reports.getQuantityCCReports());
}

System.out.println("tax = = ="+tax);
reports.setSerialnumber(k);
reports.setSaleDate(o[0].toString());
reports.setCusomerName(o[1].toString());
reports.setBillNo(o[7].toString());
reports.setItemName(o[2].toString());
reports.setSalePrice(Double.parseDouble(o[3].toString()));
//reports.setQuantity1((BigInteger)o[4]);
reports.setGstNumber("N/A");
reports.setHsnNumber((o[9].toString()));
/*	reports.setKg((o[10].toString()));
	reports.setGrams((o[11].toString()));
	reports.setLtr((o[12].toString()));
	reports.setMili((o[13].toString()));*/
double totalPerProcudt = (Double.parseDouble(o[14].toString()));
double totalTaxPerProcudt = (Double.parseDouble(o[15].toString()));
double totalIgstTaxPerProcudt = (Double.parseDouble(o[16].toString()));

Double sp = Double.parseDouble(o[3].toString());
Double qunti = Double.parseDouble(o[4].toString());
Double total = sp * qunti;
reports.setTotalAmount(total);

if(tax.equals("5.00")){
Double tx = Double.parseDouble(tax);
Double taxAmt = (tx/100)*(sp);
double saleReportTaxAmt = Double.parseDouble(formatter.format(taxAmt));		
Double totalTaxAmount = qunti * taxAmt;
Double newSalePrice = sp + taxAmt;
Double totalAmount = qunti * newSalePrice;
/*reports.setFivePercentageGST(taxAmt);*/
reports.setFivePercentageGST(saleReportTaxAmt);				

reports.setTwelwePercentageGST(0.0);
reports.setEighteenPercentageGST(0.0);
reports.setTwentyEightPercentageGST(0.0);
reports.setTotalTaxAmount(totalTaxPerProcudt); 
reports.setNetAmount(totalPerProcudt);
System.out.println("5 % GST Amount"+taxAmt);
}
else if(tax.equals("12.00")){
Double tx = Double.parseDouble(tax);
Double taxAmt = (tx/100)*(sp);
double saleReportTaxAmt = Double.parseDouble(formatter.format(taxAmt));
Double totalTaxAmount = qunti * taxAmt;
Double newSalePrice = sp + taxAmt;
Double totalAmount = qunti * newSalePrice;
reports.setFivePercentageGST(0.0);
/*reports.setTwelwePercentageGST(taxAmt);*/
reports.setTwelwePercentageGST(saleReportTaxAmt);
reports.setEighteenPercentageGST(0.0);
reports.setTwentyEightPercentageGST(0.0);
reports.setTotalTaxAmount(totalTaxPerProcudt); 
reports.setNetAmount(totalPerProcudt);
System.out.println("12 % GST Amount"+taxAmt);
	
}
else if(tax.equals("18.00")){
Double tx = Double.parseDouble(tax);
Double taxAmt = (tx/100)*(sp);
double saleReportTaxAmt = Double.parseDouble(formatter.format(taxAmt));
Double totalTaxAmount = qunti * taxAmt;
Double newSalePrice = sp + taxAmt;
Double totalAmount = qunti * newSalePrice;
reports.setFivePercentageGST(0.0);
reports.setTwelwePercentageGST(0.0);
/*reports.setEighteenPercentageGST(taxAmt);*/
reports.setEighteenPercentageGST(saleReportTaxAmt);
reports.setTwentyEightPercentageGST(0.0);
reports.setTotalTaxAmount(totalTaxPerProcudt); 
reports.setNetAmount(totalPerProcudt);
System.out.println("18 % GST Amount"+taxAmt);
}
else if(tax.equals("28.00")){
Double tx = Double.parseDouble(tax);
Double taxAmt = (tx/100)*(sp);
double saleReportTaxAmt = Double.parseDouble(formatter.format(taxAmt));
Double totalTaxAmount = qunti * taxAmt;
Double newSalePrice = sp + taxAmt;
Double totalAmount = qunti * newSalePrice;
reports.setFivePercentageGST(0.0);
reports.setTwelwePercentageGST(0.0);
reports.setEighteenPercentageGST(0.0);
/*reports.setTwentyEightPercentageGST(taxAmt);*/
reports.setTwentyEightPercentageGST(saleReportTaxAmt);
reports.setTotalTaxAmount(totalTaxPerProcudt); 
reports.setNetAmount(totalPerProcudt);
System.out.println("28 % GST Amount"+taxAmt);
}

/*
 * else if(igstTax.equals("5.00")){ Double igstTx = Double.parseDouble(igstTax);
 * Double taxAmt = (igstTx/100)*(sp); Double totalTaxAmount = qunti * taxAmt;
 * Double newSalePrice = sp + taxAmt; Double totalAmount = qunti * newSalePrice;
 * reports.setiGSTFivePercentage(taxAmt); reports.setiGSTTwelwePercentage(0.0);
 * reports.setiGSTEighteenPercentage(0.0);
 * reports.setiGSTTwentyeightPercentage(0.0);
 * reports.setTotalTaxAmount(totalIgstTaxPerProcudt);
 * reports.setNetAmount(totalPerProcudt);
 * System.out.println("5 % GST Amount"+taxAmt); } else
 * if(igstTax.equals("12.00")){ Double igstTx = Double.parseDouble(igstTax);
 * Double taxAmt = (igstTx/100)*(sp); Double totalTaxAmount = qunti * taxAmt;
 * Double newSalePrice = sp + taxAmt; Double totalAmount = qunti * newSalePrice;
 * reports.setiGSTFivePercentage(0.0); reports.setiGSTTwelwePercentage(taxAmt);
 * reports.setiGSTEighteenPercentage(0.0);
 * reports.setiGSTTwentyeightPercentage(0.0);
 * reports.setTotalTaxAmount(totalIgstTaxPerProcudt);
 * reports.setNetAmount(totalPerProcudt);
 * System.out.println("12 % GST Amount"+taxAmt);
 * 
 * } else if(igstTax.equals("18.00")){ Double igstTx =
 * Double.parseDouble(igstTax); Double taxAmt = (igstTx/100)*(sp); Double
 * totalTaxAmount = qunti * taxAmt; Double newSalePrice = sp + taxAmt; Double
 * totalAmount = qunti * newSalePrice; reports.setiGSTFivePercentage(0.0);
 * reports.setiGSTTwelwePercentage(0.0);
 * reports.setiGSTEighteenPercentage(taxAmt);
 * reports.setiGSTTwentyeightPercentage(0.0);
 * reports.setTotalTaxAmount(totalIgstTaxPerProcudt);
 * reports.setNetAmount(totalPerProcudt);
 * System.out.println("18 % GST Amount"+taxAmt); } else
 * if(igstTax.equals("28.00")){ Double igstTx = Double.parseDouble(igstTax);
 * Double taxAmt = (igstTx/100)*(sp); Double totalTaxAmount = qunti * taxAmt;
 * Double newSalePrice = sp + taxAmt; Double totalAmount = qunti * newSalePrice;
 * reports.setiGSTFivePercentage(0.0); reports.setiGSTTwelwePercentage(0.0);
 * reports.setiGSTEighteenPercentage(0.0);
 * reports.setiGSTTwentyeightPercentage(taxAmt);
 * reports.setTotalTaxAmount(totalIgstTaxPerProcudt);
 * reports.setNetAmount(totalPerProcudt);
 * System.out.println("28 % GST Amount"+taxAmt); }
 */
			
			saleList.add(reports);
		}
		
}
	catch(Exception e)
	{
		e.printStackTrace();	
	}
	return saleList;	

}

public List<SaleReports> getSaleDetailsAsNonGST(String cat,String fDate,String sDate) {
	Double trans;
	Double hamali;
	
	HibernateUtility hbu=null;
	Session session=null;
	List<SaleReports> saleList=null;
	String status = "NoGST";
try
{
	Long k = 0l;
 hbu = HibernateUtility.getInstance();
 session = hbu.getHibernateSession();
 
 NumberFormat formatter = new DecimalFormat("#0.00");
 
 Query query = session.createSQLQuery(" SELECT f.insert_date, f.customer_name, f.bill_no, f.hsn, f.product_name, f.sale_price, f.quantity, f.unit, f.tax_percentage FROM fertilizer_billing f WHERE cat_id ='"+cat+"' AND f.bill_Type = '"+status+"' AND insert_date BETWEEN '"+fDate+"' AND '"+sDate+"'");

List<Object[]> list = query.list();
saleList= new ArrayList<SaleReports>(0);
for (Object[] o : list)
{
  SaleReports reports = new SaleReports();
  k++;
    reports.setSerialnumber(k);
    reports.setSaleDate(o[0].toString());
	reports.setCusomerName(o[1].toString());
	reports.setBillNo(o[2].toString());
	reports.setGstNumber("N/A");
reports.setHsnNumber((o[3].toString()));
reports.setItemName(o[4].toString());
reports.setSalePrice(Double.parseDouble(o[5].toString()));
reports.setQuantityCCReports(o[6].toString());
String unit = o[7].toString();
if(unit.equalsIgnoreCase("pcs")) {
reports.setUnit("Box");
					}else {
						reports.setUnit(unit);
					}
					reports.setTaxPerc(Double.parseDouble(o[8].toString()));
				
					Double sp = Double.parseDouble(o[5].toString());
					Double qunti = Double.parseDouble(o[6].toString());
					Double total = sp * qunti;
					reports.setTotalAmount(total);
		
					saleList.add(reports);
				}
				
		}
			catch(Exception e)
			{
				e.printStackTrace();	
			}
			return saleList;	
		
}
		
		public List getgoodsReceiveForGSTReport(){
			HibernateUtility hbu=null;
			Session session=null;
			List<SaleReports> saleList=null;
			try
			{
				Long k = 0l;
				hbu = HibernateUtility.getInstance();
				session = hbu.getHibernateSession();
				
				Query query = session.createSQLQuery("SELECT purchaseDate,s.supplier_name,product_name,buy_price,quantity,tax_percentage,bill_number FROM goods_receive LEFT JOIN supplier_details s on s.pk_supplier_id = fk_supplier_id");
//query.setParameter("paymentMode", paymentMode);
List<Object[]> list = query.list();
 saleList= new ArrayList<SaleReports>(0);
for (Object[] o : list) {
SaleReports reports = new SaleReports();
k++;
	String tax = o[5].toString();
	System.out.println("tax = = ="+tax);
reports.setSerialnumber(k);
reports.setSaleDate(o[0].toString());
reports.setSupplierName(o[1].toString());
reports.setBillNo((o[6].toString()));
reports.setItemName(o[2].toString());
reports.setBuyPrice(Double.parseDouble(o[3].toString()));
reports.setQuanti(Double.parseDouble(o[4].toString()));
reports.setGstNumber("N/A");
reports.setHsnNumber("N/A");
Double sp = Double.parseDouble(o[3].toString());
Double qunti = Double.parseDouble(o[4].toString());
Double total = sp * qunti;
reports.setTotalAmount(total);
if(tax.equals("5")){
Double tx = Double.parseDouble(tax);
Double taxAmt = (tx/100)*(sp);
Double totalTaxAmount = qunti * taxAmt;
Double newSalePrice = sp + taxAmt;
Double totalAmount = qunti * newSalePrice;
reports.setFivePercentageGST(taxAmt);
reports.setTwelwePercentageGST(0.0);
reports.setEighteenPercentageGST(0.0);
reports.setTwentyEightPercentageGST(0.0);
reports.setTotalTaxAmount(totalTaxAmount); 
reports.setNetAmount(totalAmount);
System.out.println("5 % GST Amount"+taxAmt);
}
else if(tax.equals("12")){
Double tx = Double.parseDouble(tax);
Double taxAmt = (tx/100)*(sp);
Double totalTaxAmount = qunti * taxAmt;
Double newSalePrice = sp + taxAmt;
Double totalAmount = qunti * newSalePrice;
reports.setFivePercentageGST(0.0);
reports.setTwelwePercentageGST(taxAmt);
reports.setEighteenPercentageGST(0.0);
reports.setTwentyEightPercentageGST(0.0);
reports.setTotalTaxAmount(totalTaxAmount); 
reports.setNetAmount(totalAmount);
System.out.println("12 % GST Amount"+taxAmt);
	
}
else if(tax.equals("18")){
Double tx = Double.parseDouble(tax);
Double taxAmt = (tx/100)*(sp);
Double totalTaxAmount = qunti * taxAmt;
Double newSalePrice = sp + taxAmt;
Double totalAmount = qunti * newSalePrice;
reports.setFivePercentageGST(0.0);
reports.setTwelwePercentageGST(0.0);
reports.setEighteenPercentageGST(taxAmt);
reports.setTwentyEightPercentageGST(0.0);
reports.setTotalTaxAmount(totalTaxAmount); 
reports.setNetAmount(totalAmount);
System.out.println("18 % GST Amount"+taxAmt);
}
else if(tax.equals("28")){
Double tx = Double.parseDouble(tax);
Double taxAmt = (tx/100)*(sp);
Double totalTaxAmount = qunti * taxAmt;
Double newSalePrice = sp + taxAmt;
Double totalAmount = qunti * newSalePrice;
reports.setFivePercentageGST(0.0);
reports.setTwelwePercentageGST(0.0);
reports.setEighteenPercentageGST(0.0);
reports.setTwentyEightPercentageGST(taxAmt);
reports.setTotalTaxAmount(totalTaxAmount); 
reports.setNetAmount(totalAmount);
System.out.println("28 % GST Amount"+taxAmt);
			}
			
			
			saleList.add(reports);
		}
		
}
	catch(Exception e)
	{
		e.printStackTrace();	
	}
	return saleList;	

}



/*public List<SaleReports> getSaleDetailsAsPerPaymentModeForTwoDate(String singleDate, String fk_cat_id, String secondDate)*/
public List<SaleReports> getSaleDetailsAsPerPaymentModeForTwoDate(String singleDate, String secondDate)
{
	Double trans;
	Double hamali;
	HibernateUtility hbu=null;
	Session session=null;
	HibernateUtility hbu2=null;
	Session session2=null;
	List<SaleReports> saleList=null;
	try
	{
		hbu = HibernateUtility.getInstance();
		session = hbu.getHibernateSession();
		
		hbu2 = HibernateUtility.getInstance();
		session2 = hbu.getHibernateSession();
		
/*		Query query = session.createSQLQuery("SELECT bill_no, gross_total,payment_mode FROM fertilizer_billing WHERE cat_id='"+fk_cat_id+"' AND DATE(insert_date) BETWEEN '"+singleDate+"' AND '"+secondDate+"'");*/
Query query = session.createSQLQuery("SELECT bill_no, payment_mode, total_amount, payment FROM credit_customer_payment ccp WHERE DATE(insert_date) BETWEEN '"+singleDate+"' AND '"+secondDate+"' ORDER BY bill_no");
//query.setParameter("paymentMode", paymentMode);
List<Object[]> list = query.list();
 saleList= new ArrayList<SaleReports>(0);
for (Object[] object : list) 
{
	SaleReports reports = new SaleReports();
	String mode = object[1].toString();
	Long BillNum = Long.parseLong((object[0].toString()));
	
	int billCount = 0;
	
	Query query2 = session2.createSQLQuery("select bill_no, COUNT(bill_no) from credit_customer_payment ccp where bill_no = "+BillNum);
List<Integer> list2 = query.list();
System.out.println(list2.size());
if(list2.size() > 0)
{

	billCount =	list2.get(0).intValue();  
}						

reports.setCustomerBill(Integer.parseInt(object[0].toString()));

for(int i = 0; i<=billCount; i++)
{

	if(mode == null)
	{
		reports.setCashAmount(0.0);
		reports.setChequeAmount(0.0);
		reports.setCardAmount(0.0);
		reports.setNeftAmount(0.0);
	}
	
	if(mode.equals("cash")){
reports.setCashAmount(Double.parseDouble(object[3].toString()));
/*reports.setChequeAmount(0.0);
reports.setCardAmount(0.0);
reports.setNeftAmount(0.0);*/
}
else if(mode.equals("cheque")){
reports.setChequeAmount(Double.parseDouble(object[3].toString()));
/*reports.setCardAmount(0.0);
reports.setNeftAmount(0.0);
reports.setCashAmount(0.0);*/
	
}
else if(mode.equals("card")){
reports.setCardAmount(Double.parseDouble(object[3].toString()));
/*reports.setNeftAmount(0.0);
reports.setCashAmount(0.0);
reports.setChequeAmount(0.0);*/
}
else if(mode.equals("neft")){
reports.setNeftAmount(Double.parseDouble(object[3].toString()));
/*reports.setCashAmount(0.0);
reports.setChequeAmount(0.0);
reports.setCardAmount(0.0);*/
}
else if(mode.equals("selected"))
				{
					reports.setNeftAmount(0.0);
					reports.setCashAmount(0.0);
					reports.setChequeAmount(0.0);
					reports.setCardAmount(0.0);
				}
			}
			
			saleList.add(reports);
		}
		
}
	catch(Exception e)
	{
		e.printStackTrace();	
	}
	return saleList;
}




public List<SaleReports> getSaleDetailsAsPerPaymentModeForRangesDao(
		String fisDateForPay4, String endDateForPay4, String paymentModeId4) {

	Double trans;
	Double hamali;
	HibernateUtility hbu=null;
	Session session=null;

	List<SaleReports> saleList=null;

	try
	{
		hbu = HibernateUtility.getInstance();
		session = hbu.getHibernateSession();
		
Query query = session.createSQLQuery("SELECT bill_no, payment_mode, total_per_product, SUM(gross_total) FROM fertilizer_billing WHERE payment_mode = '"+paymentModeId4+"' AND gross_total > 0.0 AND DATE(insert_date) BETWEEN '"+fisDateForPay4+"' AND '"+endDateForPay4+"' GROUP BY bill_no");
//query.setParameter("paymentMode", paymentMode);
List<Object[]> list = query.list();
 saleList= new ArrayList<SaleReports>(0);
for (Object[] object : list) {
SaleReports reports = new SaleReports();

reports.setCustomerBill(Integer.parseInt(object[0].toString()));
String mode = object[1].toString();		

if(mode.equals("cash"))
{
	if(Double.parseDouble(object[3].toString()) > 0.0)
	{
		reports.setTotalAmount(Double.parseDouble(object[2].toString()));
		reports.setCashAmount(Double.parseDouble(object[3].toString()));
		reports.setChequeAmount(0.0);
		reports.setCardAmount(0.0);
		reports.setNeftAmount(0.0);
	}
}
else if(mode.equals("cheque"))
{
	if(Double.parseDouble(object[3].toString()) > 0.0)
	{
		reports.setTotalAmount(Double.parseDouble(object[2].toString()));
		reports.setChequeAmount(Double.parseDouble(object[3].toString()));
		reports.setCardAmount(0.0);
		reports.setNeftAmount(0.0);
		reports.setCashAmount(0.0);
	}
	
}
else if(mode.equals("card"))
{
	if(Double.parseDouble(object[3].toString()) > 0.0)
	{
		reports.setTotalAmount(Double.parseDouble(object[2].toString()));
		reports.setCardAmount(Double.parseDouble(object[3].toString()));
		reports.setNeftAmount(0.0);
		reports.setCashAmount(0.0);
		reports.setChequeAmount(0.0);
	}
}
else if(mode.equals("neft"))
		{
			if(Double.parseDouble(object[3].toString()) > 0.0)
			{
				reports.setTotalAmount(Double.parseDouble(object[2].toString()));
				reports.setNeftAmount(Double.parseDouble(object[3].toString()));
				reports.setCashAmount(0.0);
				reports.setChequeAmount(0.0);
				reports.setCardAmount(0.0);
			}
		}
		
		saleList.add(reports);
	}
		
}
	catch(Exception e)
	{
		e.printStackTrace();	
	}
	return saleList;
}



public List getAllSubCategory(String fk_cat_id)
{
	System.out.println("IN DAO");
HibernateUtility hbu = null;
Session session =  null;
Query query = null;
 List list = null;
System.out.println("IN DAO"+fk_cat_id);
 try {
	 hbu = HibernateUtility.getInstance();
	 session = hbu.getHibernateSession();
	 System.out.println("IN DAO"+fk_cat_id);
 query = session.createSQLQuery("SELECT pk_subcat_id,sub_cat_name from sub_categories where fk_cat_id="+fk_cat_id);
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

public List getProductName(String fk_cat_id,String fk_subCat_id, HttpServletRequest request)
{
	HttpSession usersession = request.getSession(true);
	String userid = (String)usersession.getAttribute("userid");
String shopid = (String)usersession.getAttribute("shopid");

System.out.println("IN DAO");
HibernateUtility hbu = null;
Session session =  null;
Query query = null;
 List list = null;
System.out.println("IN DAO"+fk_cat_id);
 try {
	 hbu = HibernateUtility.getInstance();
	 session = hbu.getHibernateSession();
	 System.out.println("IN DAO---> "+fk_cat_id);
 
 query = session.createSQLQuery("SELECT pd.pk_product_id, pd.product_name, pd.weight, su.unit_name, pd.manufacturing_company from product_details pd JOIN sold_units su where fk_cat_id = '"+fk_cat_id+"' and fk_subCat_id='"+fk_subCat_id+"' and pd.fk_shop_id='"+shopid+"' and pd.fk_unit_id = su.pk_unit_id");
 list = query.list(); 
 
 System.out.println("IN DAO"+fk_subCat_id);
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

public List getPurchaseReportsASPerGST(
		String fDate, String tDate)
{
	
	Integer dbBillNo;
	Integer cmpBillNo;
	Integer billCount = 1;
	
	HibernateUtility hbu=null;
	Session session=null;
	List<SaleReports> purchaseList=null;
	
	HibernateUtility hbu2=null;
	Session session2=null;
	
	try
	{
		Long k = 0l;
		hbu = HibernateUtility.getInstance();
		session = hbu.getHibernateSession();
		NumberFormat formatter = new DecimalFormat("#0.00");

Query query = session.createSQLQuery("SELECT g.purchaseDate, s.supplier_name, g.product_name, g.buy_price, g.quantity, g.tax_percentage, g.bill_number, g.iGstPercentage, p.hsn, s.tin_no, g.Per_Product_Total, discount_amount, su.unit_name, g.weight FROM goods_receive g LEFT JOIN product_details p on p.pk_product_id = fk_product_id LEFT JOIN supplier_details s on s.pk_supplier_id = fk_supplier_id JOIN sold_units su on p.fk_unit_id = su.pk_unit_id WHERE purchaseDate between '" + fDate +"' and '"+tDate+"'");
//query.setParameter("paymentMode", paymentMode);
List<Object[]> list = query.list();
purchaseList= new ArrayList<SaleReports>(0);
for (Object[] o : list)
{
SaleReports reports = new SaleReports();
k++;



dbBillNo = Integer.parseInt(o[6].toString());

hbu2 = HibernateUtility.getInstance();
 session2 = hbu2.getHibernateSession();
 Query query2 = session2.createSQLQuery("select bill_number, COUNT(bill_number) from goods_receive where bill_number = "+dbBillNo+" GROUP BY bill_number");			 
 List<Object[]> templist = query2.list();
 for (Object[] object2 : templist)
 {
	 cmpBillNo = Integer.parseInt(object2[0].toString());
	 billCount = Integer.parseInt(object2[1].toString());
 }
 
 Double discountAmount = Double.parseDouble(o[11].toString());
 Double perProductDiscount = discountAmount/billCount;
 reports.setDiscountAmount111(formatter.format(perProductDiscount).toString());

 reports.setUnit(o[12].toString());
 reports.setWeight(o[13].toString());


	String tax = o[5].toString();
	String igstTax = o[7].toString();
	
	System.out.println("tax = = ="+tax);
reports.setSerialnumber(k);
reports.setSaleDate(o[0].toString());
reports.setSupplierName(o[1].toString());
reports.setBillNo(o[6].toString());
reports.setItemName(o[2].toString());
reports.setBuyPrice(Double.parseDouble(o[3].toString()));
reports.setQuanti(Double.parseDouble(o[4].toString()));
reports.setGstNumber(o[9].toString());
reports.setHsnNumber(o[8].toString());
Double sp = Double.parseDouble(o[3].toString());
Double qunti = Double.parseDouble(o[4].toString());
Double total = sp * qunti;
//reports.setTotalAmount(total);
double buyPriceWithoutTax = Double.parseDouble(o[10].toString());
reports.setTotalAmount(buyPriceWithoutTax);
System.out.println("igstTax = = ="+igstTax);

if((tax.equals("0")) && (igstTax.equals("0")))
 {
	System.out.println("ln no ==== 3114 GST TAX ========>  "+tax);
System.out.println("ln no ==== 3115 IGST TAX ========>  "+igstTax);


Double tx = Double.parseDouble(igstTax);
Double taxAmt = (tx/100)*(sp);
Double totalTaxAmount = qunti * taxAmt;
Double newSalePrice = sp + taxAmt;
Double totalAmount = qunti * newSalePrice;

reports.setiGSTFivePercentage(0.0);
reports.setiGSTTwelwePercentage(0.0);
reports.setiGSTEighteenPercentage(0.0);
reports.setiGSTTwentyeightPercentage(0.0);

reports.setTotalTaxAmount(totalTaxAmount); 
//reports.setNetAmount(totalAmount);
Double totalAmountForFormatter = ((buyPriceWithoutTax+(taxAmt*qunti))-perProductDiscount);
String reportTotalAmount = formatter.format(totalAmount); 
reports.setNetAmount(Double.parseDouble(reportTotalAmount));
System.out.println("0 % igstTax Amount"+taxAmt);
	
	reports.setFivePercentageGST(0.0);
	reports.setTwelwePercentageGST(0.0);
	reports.setEighteenPercentageGST(0.0);
	reports.setTwentyEightPercentageGST(0.0);
 }			


else if(igstTax.equals("5")){
Double tx = Double.parseDouble(igstTax);
Double taxAmt = (tx/100)*(sp);
Double totalTaxAmount = qunti * taxAmt;
Double newSalePrice = sp + taxAmt;
Double totalAmount = qunti * newSalePrice;				

double reportTaxAmt = Double.parseDouble(formatter.format(taxAmt));				
System.out.println("TAX AMOUNT ============================================ "+reportTaxAmt);
double reportTotalTaxAmount = Double.parseDouble(formatter.format(totalTaxAmount));
double netAmount = ((buyPriceWithoutTax+(taxAmt*qunti))-perProductDiscount);
double reportNetAmount = Double.parseDouble(formatter.format(netAmount));

reports.setiGSTFivePercentage(reportTaxAmt);
reports.setiGSTTwelwePercentage(0.0);
reports.setiGSTEighteenPercentage(0.0);
reports.setiGSTTwentyeightPercentage(0.0);

reports.setTotalTaxAmount(reportTotalTaxAmount); 
//reports.setNetAmount(totalAmount);
Double totalAmountForFormatter = ((buyPriceWithoutTax+(taxAmt*qunti))-perProductDiscount);
String reportTotalAmount = formatter.format(totalAmount); 
reports.setNetAmount(Double.parseDouble(reportTotalAmount));
System.out.println("5 % igstTax Amount"+taxAmt);
	
	reports.setFivePercentageGST(0.0);
	reports.setTwelwePercentageGST(0.0);
	reports.setEighteenPercentageGST(0.0);
	reports.setTwentyEightPercentageGST(0.0);
	
}
else if(igstTax.equals("12")){
Double tx = Double.parseDouble(igstTax);
Double taxAmt = (tx/100)*(sp);
Double totalTaxAmount = qunti * taxAmt;
Double newSalePrice = sp + taxAmt;
Double totalAmount = qunti * newSalePrice;


double reportTaxAmt = Double.parseDouble(formatter.format(taxAmt));				
System.out.println("TAX AMOUNT ============================================ "+reportTaxAmt);
double reportTotalTaxAmount = Double.parseDouble(formatter.format(totalTaxAmount));
double netAmount = ((buyPriceWithoutTax+(taxAmt*qunti))-perProductDiscount);
double reportNetAmount = Double.parseDouble(formatter.format(netAmount));


reports.setiGSTFivePercentage(0.0);
reports.setiGSTTwelwePercentage(reportTaxAmt);
reports.setiGSTEighteenPercentage(0.0);
reports.setiGSTTwentyeightPercentage(0.0);
reports.setTotalTaxAmount(reportTotalTaxAmount); 
//reports.setNetAmount(totalAmount);
Double totalAmountForFormatter = ((buyPriceWithoutTax+(taxAmt*qunti))-perProductDiscount);
String reportTotalAmount = formatter.format(totalAmount); 
reports.setNetAmount(Double.parseDouble(reportTotalAmount));
System.out.println("12 % iGST Amount"+taxAmt);
	
	reports.setFivePercentageGST(0.0);
	reports.setTwelwePercentageGST(0.0);
	reports.setEighteenPercentageGST(0.0);
	reports.setTwentyEightPercentageGST(0.0);
	
}
else if(igstTax.equals("18")){
Double tx = Double.parseDouble(igstTax);
Double taxAmt = (tx/100)*(sp);	
Double newSalePrice = sp + taxAmt;
Double totalAmount = qunti * newSalePrice;

double reportTaxAmt = Double.parseDouble(formatter.format(taxAmt));				
System.out.println("TAX AMOUNT ============================================ "+reportTaxAmt);
Double totalTaxAmount = qunti * taxAmt;
double reportTotalTaxAmount = Double.parseDouble(formatter.format(totalTaxAmount));
double netAmount = ((buyPriceWithoutTax+(taxAmt*qunti))-perProductDiscount);
double reportNetAmount = Double.parseDouble(formatter.format(netAmount));

reports.setiGSTFivePercentage(0.0);
reports.setiGSTTwelwePercentage(0.0);
reports.setiGSTEighteenPercentage(reportTaxAmt);
reports.setiGSTTwentyeightPercentage(0.0);
reports.setTotalTaxAmount(reportTotalTaxAmount); 
//reports.setNetAmount(totalAmount);
	Double totalAmountForFormatter = ((buyPriceWithoutTax+(taxAmt*qunti))-perProductDiscount);
	String reportTotalAmount = formatter.format(totalAmount); 
	reports.setNetAmount(Double.parseDouble(reportTotalAmount));
	
	reports.setFivePercentageGST(0.0);
	reports.setTwelwePercentageGST(0.0);
	reports.setEighteenPercentageGST(0.0);
	reports.setTwentyEightPercentageGST(0.0);
}
else if(igstTax.equals("28")){
Double tx = Double.parseDouble(igstTax);
Double taxAmt = (tx/100)*(sp);
Double totalTaxAmount = qunti * taxAmt;
Double newSalePrice = sp + taxAmt;
Double totalAmount = qunti * newSalePrice;


double reportTaxAmt = Double.parseDouble(formatter.format(taxAmt));				
System.out.println("TAX AMOUNT ============================================ "+reportTaxAmt);
double reportTotalTaxAmount = Double.parseDouble(formatter.format(totalTaxAmount));
double netAmount = ((buyPriceWithoutTax+(taxAmt*qunti))-perProductDiscount);
double reportNetAmount = Double.parseDouble(formatter.format(netAmount));


reports.setiGSTFivePercentage(0.0);
reports.setiGSTTwelwePercentage(0.0);
reports.setiGSTEighteenPercentage(0.0);
reports.setiGSTTwentyeightPercentage(reportTaxAmt);
reports.setTotalTaxAmount(reportTotalTaxAmount); 
//reports.setNetAmount(totalAmount);
Double totalAmountForFormatter = ((buyPriceWithoutTax+(taxAmt*qunti))-perProductDiscount);
String reportTotalAmount = formatter.format(totalAmount); 
reports.setNetAmount(Double.parseDouble(reportTotalAmount));
System.out.println("28 % iGST Amount"+taxAmt);
System.out.println("28 % iGST totalTaxAmount"+totalTaxAmount);

reports.setFivePercentageGST(0.0);
reports.setTwelwePercentageGST(0.0);
reports.setEighteenPercentageGST(0.0);
reports.setTwentyEightPercentageGST(0.0);
}


/*			}
		else if(igstPercent !=5 || igstPercent !=12 || igstPercent !=18 || igstPercent !=28){

			*/

	
else if(tax.equals("5")){
Double tx = Double.parseDouble(tax);
Double taxAmt = (tx/100)*(sp);
Double roundedTaxAmt = (double )Math.round(taxAmt);
Double totalTaxAmount = qunti * taxAmt;
Double newSalePrice = sp + taxAmt;
Double totalAmount = qunti * newSalePrice;	


double reportTaxAmt = Double.parseDouble(formatter.format(taxAmt));				
System.out.println("TAX AMOUNT ============================================ "+reportTaxAmt);
double reportTotalTaxAmount = Double.parseDouble(formatter.format(totalTaxAmount));
double netAmount = ((buyPriceWithoutTax+(taxAmt*qunti))-perProductDiscount);
double reportNetAmount = Double.parseDouble(formatter.format(netAmount));

reports.setFivePercentageGST(roundedTaxAmt);
reports.setTwelwePercentageGST(0.0);
reports.setEighteenPercentageGST(0.0);
reports.setTwentyEightPercentageGST(0.0);
reports.setTotalTaxAmount((double)Math.round(totalTaxAmount)); 
//reports.setNetAmount(totalAmount);
Double totalAmountForFormatter = ((buyPriceWithoutTax+(taxAmt*qunti))-perProductDiscount);
String reportTotalAmount = formatter.format(totalAmount); 
reports.setNetAmount(Double.parseDouble(reportTotalAmount));
System.out.println("5 % GST Amount"+roundedTaxAmt);
	
	
	reports.setiGSTFivePercentage(0.0);
	reports.setiGSTTwelwePercentage(0.0);
	reports.setiGSTEighteenPercentage(0.0);
	reports.setiGSTTwentyeightPercentage(0.0);
}
else if(tax.equals("12")){
Double tx = Double.parseDouble(tax);
Double taxAmt = (tx/100)*(sp);
Double roundedTaxAmt = (double )Math.round(taxAmt);
Double totalTaxAmount = qunti * taxAmt;
Double newSalePrice = sp + taxAmt;
Double totalAmount = qunti * newSalePrice;


double reportTaxAmt = Double.parseDouble(formatter.format(taxAmt));				
System.out.println("TAX AMOUNT ============================================ "+reportTaxAmt);
double reportTotalTaxAmount = Double.parseDouble(formatter.format(totalTaxAmount));
double netAmount = ((buyPriceWithoutTax+(taxAmt*qunti))-perProductDiscount);
double reportNetAmount = Double.parseDouble(formatter.format(netAmount));


reports.setFivePercentageGST(0.0);
reports.setTwelwePercentageGST(roundedTaxAmt);
reports.setEighteenPercentageGST(0.0);
reports.setTwentyEightPercentageGST(0.0);
reports.setTotalTaxAmount((double)Math.round(totalTaxAmount)); 
//reports.setNetAmount(totalAmount);
Double totalAmountForFormatter = ((buyPriceWithoutTax+(taxAmt*qunti))-perProductDiscount);
String reportTotalAmount = formatter.format(totalAmount); 
reports.setNetAmount(Double.parseDouble(reportTotalAmount));
System.out.println("12 % GST Amount"+roundedTaxAmt);
	
	reports.setiGSTFivePercentage(0.0);
	reports.setiGSTTwelwePercentage(0.0);
	reports.setiGSTEighteenPercentage(0.0);
	reports.setiGSTTwentyeightPercentage(0.0);
	
}
else if(tax.equals("18")){
Double tx = Double.parseDouble(tax);
Double taxAmt = (tx/100)*(sp);
Double roundedTaxAmt = (double )Math.round(taxAmt);
Double totalTaxAmount = qunti * taxAmt;
Double newSalePrice = sp + taxAmt;
Double totalAmount = qunti * newSalePrice;

double reportTaxAmt = Double.parseDouble(formatter.format(taxAmt));				
System.out.println("TAX AMOUNT ============================================ "+reportTaxAmt);
double reportTotalTaxAmount = Double.parseDouble(formatter.format(totalTaxAmount));
double netAmount = ((buyPriceWithoutTax+(taxAmt*qunti))-perProductDiscount);
double reportNetAmount = Double.parseDouble(formatter.format(netAmount));

reports.setFivePercentageGST(0.0);
reports.setTwelwePercentageGST(0.0);
reports.setEighteenPercentageGST(roundedTaxAmt);
reports.setTwentyEightPercentageGST(0.0);
reports.setTotalTaxAmount((double)Math.round(totalTaxAmount)); 
//reports.setNetAmount(totalAmount);
Double totalAmountForFormatter = ((buyPriceWithoutTax+(taxAmt*qunti))-perProductDiscount);
String reportTotalAmount = formatter.format(totalAmount); 
reports.setNetAmount(Double.parseDouble(reportTotalAmount));
System.out.println("18 % GST Amount"+roundedTaxAmt);
	
	reports.setiGSTFivePercentage(0.0);
	reports.setiGSTTwelwePercentage(0.0);
	reports.setiGSTEighteenPercentage(0.0);
	reports.setiGSTTwentyeightPercentage(0.0);
}
else if(tax.equals("28")){
Double tx = Double.parseDouble(tax);
Double taxAmt = (tx/100)*(sp);
Double roundedTaxAmt = (double )Math.round(taxAmt);
Double totalTaxAmount = qunti * taxAmt;
Double newSalePrice = sp + taxAmt;
Double totalAmount = qunti * newSalePrice;

double reportTaxAmt = Double.parseDouble(formatter.format(taxAmt));				
System.out.println("TAX AMOUNT ============================================ "+reportTaxAmt);
double reportTotalTaxAmount = Double.parseDouble(formatter.format(totalTaxAmount));
double netAmount = ((buyPriceWithoutTax+(taxAmt*qunti))-perProductDiscount);
double reportNetAmount = Double.parseDouble(formatter.format(netAmount));

reports.setFivePercentageGST(0.0);
reports.setTwelwePercentageGST(0.0);
reports.setEighteenPercentageGST(0.0);
reports.setTwentyEightPercentageGST(roundedTaxAmt);
reports.setTotalTaxAmount((double)Math.round(totalTaxAmount)); 
//reports.setNetAmount(totalAmount);
Double totalAmountForFormatter = ((buyPriceWithoutTax+(taxAmt*qunti))-perProductDiscount);
String reportTotalAmount = formatter.format(totalAmount); 
reports.setNetAmount(Double.parseDouble(reportTotalAmount));
System.out.println("28 % GST Amount"+roundedTaxAmt);
			
			reports.setiGSTFivePercentage(0.0);
			reports.setiGSTTwelwePercentage(0.0);
			reports.setiGSTEighteenPercentage(0.0);
			reports.setiGSTTwentyeightPercentage(0.0);
			}			
			
		purchaseList.add(reports);
		}
		
}
	catch(Exception e)
	{
		e.printStackTrace();	
	}
	return purchaseList;	


}

//////purchase reports for purchase return////

//public List<PurchaseDetailsFromGoodsReceive> getPurchaseReturnDetailsForSupplier(String supplier,String firstDate,String secondDate) 

public List<PurchaseDetailsFromGoodsReceive> getPurchaseReturnDetailsForSupplier(String supplier) 
{
	HibernateUtility hbu=null;
	Session session=null;
	List<PurchaseDetailsFromGoodsReceive> purchaseList = null;
	List supId2 = null;
	Long supId=null;
	try
	{
		hbu = HibernateUtility.getInstance();
		session = hbu.getHibernateSession();
	
		//Query query2=session.createSQLQuery("select pk_supplier_id from supplier_details where supplier_name = '"+supplier+"'");
Query query = session.createSQLQuery("select gd.bill_number, gd.purchaseDate, gd.product_name, gd.company_Name,gd.tax_percentage, gd.batch_no, gd.barcodeNo, gd.buy_price, gd.sale_price,gd.Tax_Amount,gd.weight, gd.quantity, purchase_return.total, supplier_details.supplier_name, gd.dupQuantity from goods_receive gd left join supplier_details on gd.fk_supplier_id = supplier_details.pk_supplier_id left join  purchase_return on purchase_return.fk_product_id = gd.fk_product_id where gd.fk_supplier_id = '"+supplier+"' And purchase_return.total > 0 GROUP BY gd.product_name");
System.out.println("supplier=-----"+supplier);
//query.setParameter("fksupplier", supplier);
List<Object[]> list = query.list();
System.out.println("Query size----------"+list.size());
purchaseList = new ArrayList<PurchaseDetailsFromGoodsReceive>(0);



/*
 * List<Long> tempSupId = query2.list();
 * System.out.println("3140 tempSupId ====> "+tempSupId); Long supId=null;
 */
/*
 * Iterator itr2=tempSupId.iterator(); while(itr2.hasNext()) {
 * supId=Long.parseLong(itr2.next().toString()); System.out.println(supId);
 * //Double.parseDouble(object[14].toString()); }
 */


//Query query = session.createSQLQuery("select bill_number, purchaseDate, product_name, company_Name,  dc_number, batch_no, barcodeNo, buy_price, sale_price, mrp, weight, abs(quantity), total_amount, supplier_details.supplier_name, dupQuantity from goods_receive  left join supplier_details on goods_receive.fk_supplier_id = supplier_details.pk_supplier_id where goods_receive.fk_supplier_id = '"+supId+"' And goods_receive.return_amount >0");

//Query query = session.createSQLQuery("select bill_number, purchaseDate, product_name, company_Name,  dc_number, batch_no, barcodeNo, buy_price, sale_price, mrp, weight, abs(quantity), total_amount, supplier_details.supplier_name, dupQuantity from goods_receive  left join supplier_details on goods_receive.fk_supplier_id = supplier_details.pk_supplier_id where goods_receive.fk_supplier_id = '"+supId+"' And goods_receive.return_amount >0 And purchaseDate Between '"+firstDate+"' And '"+secondDate+"'");
//Query query = session.createSQLQuery("select bill_number, purchaseDate, product_name, company_Name,  dc_number, batch_no, barcodeNo, buy_price, sale_price, mrp, weight, abs(quantity), total_amount, supplier_details.supplier_name, dupQuantity from goods_receive  left join supplier_details on goods_receive.fk_supplier_id = supplier_details.pk_supplier_id where goods_receive.fk_supplier_id = '"+ supplier+"' And goods_receive.return_amount >0");
//query.setParameter("fksupplier", supplier);
//List<Object[]> list = query.list();
//purchaseList = new ArrayList<PurchaseDetailsFromGoodsReceive>(0);

//just to print list if its get fetched
/*Iterator itr=purchaseList.iterator();
while(itr.hasNext())
{
	System.out.println("GoodsReceiveDao class method => getPurchaseReturnDetailsForSupplier ==> purchaseList"+itr.next());
}		*/

for (Object[] object : list)
{			
	PurchaseDetailsFromGoodsReceive reports = new PurchaseDetailsFromGoodsReceive();
	Double quantityAfterReturn = Double.parseDouble(object[14].toString());
	Double originalQuantity = Double.parseDouble(object[11].toString());
	Double returnQuantity = originalQuantity - quantityAfterReturn;
	System.out.println("originalQuantity = = = = "+originalQuantity);
System.out.println("returnQuantity = = = = "+returnQuantity);
System.out.println("quantityAfterReturn = = = = "+quantityAfterReturn);

reports.setBillNo(object[0].toString());
reports.setPurchaseDate(object[1].toString());
reports.setProductName(object[2].toString());
reports.setCompanyName(object[3].toString());
reports.setTaxPercentage(Double.parseDouble(object[4].toString()));
//reports.setDcNo(object[4].toString());
reports.setBatchNo(object[5].toString());
reports.setBarcodeNo(object[6].toString());
reports.setBuyPrice(Double.parseDouble(object[7].toString()));
reports.setSalePrice(Double.parseDouble(object[8].toString()));
//reports.setMrp(Double.parseDouble(object[9].toString()));
			reports.setTaxAmount(Double.parseDouble(object[9].toString()));
			reports.setWeight(Double.parseDouble(object[10].toString()));
			reports.setQuantity2(Double.parseDouble(object[11].toString()));
			reports.setTotalAmount(Double.parseDouble(object[12].toString()));
			reports.setSupplier(object[13].toString());
			reports.setReturnQuantity(returnQuantity);
			reports.setRemainingQuantity(quantityAfterReturn);
			purchaseList.add(reports); 
	
		}}
	catch(Exception e)
	{
		e.printStackTrace();	
	}
	return purchaseList;	

}

public List getAllPurschaseEntry()
{
	HibernateUtility hbu=null;
	Session session=null;
	List list=null;
	try{
	 hbu = HibernateUtility.getInstance();
	 session = hbu.getHibernateSession();
	 Query query = session.createQuery("from GoodsReceiveBean");
 list = query.list();
 System.out.println("List size in dao"+list.size());
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

public List<SaleReports> creditCustomerSaleReportBillAndNameWise(String creditCustBillNo )
{
	BigDecimal tempPaidAmount = new BigDecimal(0.0);
	Double trans;
	Double hamali;
	System.out.println("Credit Customer Bill no for Reports          "+creditCustBillNo);

HibernateUtility hbu=null;
Session session=null;

HibernateUtility hbu2=null;
Session session2=null;

List<SaleReports> saleList=null;
try
{
	hbu2 = HibernateUtility.getInstance();
	session2 = hbu2.getHibernateSession();
	
	Query query2 = session2.createSQLQuery("select (fb.gross_total - fb.bill_payment_pending) from fertilizer_billing fb where fb.bill_no = "+creditCustBillNo+" limit 1");
List<BigDecimal> PaidAmtlist = query2.list();
System.out.println("query 2 Size ==================> "+PaidAmtlist.size());
System.out.println("query 2 result value ==================> "+PaidAmtlist.get(0));
tempPaidAmount = PaidAmtlist.get(0);
		
System.out.println("BILLING PAID AMOUNT ==========> "+tempPaidAmount);
		
hbu = HibernateUtility.getInstance();
session = hbu.getHibernateSession();
/*Query query = session.createSQLQuery(" SELECT bill_no,product_name, DATE(insert_date), Without_Tax_Rate, quantity, Discount_amount, Tax_amount, total_per_product,tax_percentage,igstPercentage FROM fertilizer_billing WHERE fk_shop_id ='"+shop+"' AND DATE(insert_date) BETWEEN '"+fDate+"' AND '"+sDate+"'");*/
//	Query query = session.createSQLQuery("SELECT fb.bill_no, fb.product_name, fb.insert_date, fb.sale_price, fb.quantity, fb.Discount_amount, fb.Tax_amount, fb.total_per_product, fb.tax_percentage, fb.igstPercentage, fb.kg, fb.grams, fb.ltr, fb.mili, fb.total_gst_tax_per_product, fb.unit, fb.hamali_expense, SUM(cp.payment) AS paid_bill from fertilizer_billing fb JOIN credit_customer_payment cp on fb.bill_no = cp.bill_no WHERE fb.bill_no = '"+creditCustBillNo+"' GROUP BY fb.product_name, fb.company, fb.weight");
 
	Query query = session.createSQLQuery("SELECT fb.bill_no, fb.product_name, fb.insert_date, fb.sale_price, fb.quantity+fb.freeQuantity, fb.Discount_amount, fb.Tax_amount, fb.total_per_product, fb.tax_percentage, fb.igstPercentage, fb.kg, fb.grams, fb.ltr, fb.mili, fb.total_gst_tax_per_product, fb.unit, fb.hamali_expense from fertilizer_billing fb WHERE fb.bill_no = '"+creditCustBillNo+"'");
 /*query.setParameter("shop", shop);*/	
/* query.setParameter("fDate", fDate);
	query.setParameter("sDate", sDate);*/
	
 System.out.println(creditCustBillNo+"Credit Customer Bill no for Reports");

List<Object[]> list = query.list();
int totalItems = list.size();
System.out.println("creditCustomerSaleReportBillAndNameWise listSize ============ "+list.size());
 saleList= new ArrayList<SaleReports>(0);


for (Object[] object : list) {
	
	SaleReports reports = new SaleReports();
	
	String unit = object[15].toString();
	System.out.println("UNIT FOR CREDIT CUSTOMER SALE REPORTS ==========> "+unit);

if(unit.equalsIgnoreCase("pcs"))
{
	reports.setQuantityCCReports(object[4].toString());
	System.out.println(unit+" == Assign to ==> "+reports.getQuantityCCReports());
}

else if(unit.equalsIgnoreCase("kg"))
{
	double kg = Double.parseDouble(object[10].toString());
	double grams = Double.parseDouble(object[11].toString());
	double kgAndGrams = (((kg*1000)+grams)/1000);
	reports.setQuantityCCReports(Double.toString(kgAndGrams));
	System.out.println(unit+" == Assign to ==> "+reports.getQuantityCCReports());
}

else if(unit.equalsIgnoreCase("ltr"))
{
	double ltr = Double.parseDouble(object[12].toString());
	double mili = Double.parseDouble(object[13].toString());
	double ltrAndMili = (((ltr*1000)+mili)/1000);
	reports.setQuantityCCReports(Double.toString(ltrAndMili));
	System.out.println(unit+" == Assign to ==> "+reports.getQuantityCCReports());
}			
else {
	reports.setQuantityCCReports(object[4].toString());
	System.out.println(unit+" == Assign to ==> "+reports.getQuantityCCReports());
}
reports.setCustomerBill(Integer.parseInt(object[0].toString()));
System.out.println("Bill Number of cc ========= "+reports.getCustomerBill());
reports.setItemName(object[1].toString());
System.out.println("itemName of cc ========= "+reports.getItemName());
reports.setSoldDate(object[2].toString());
System.out.println("sold date of cc ========= "+reports.getSoldDate());
reports.setSalePrice(Double.parseDouble(object[3].toString()));
reports.setDiscountAmount(Double.parseDouble(object[5].toString()));
reports.setTax(Double.parseDouble(object[8].toString()));
//reports.setiGSTPerc(Double.parseDouble(object[9].toString()));
reports.setTaxAmnt(Double.parseDouble(object[14].toString()));

Double trans1 = (Double.parseDouble(object[6].toString()));
if(trans1 != null){
	trans = (Double.parseDouble(object[6].toString()));
}else{
	trans = 0.0;
}

Double hamali1 = (Double.parseDouble(object[7].toString()));
if(hamali1 != null){
	hamali = (Double.parseDouble(object[7].toString()));
}else{
	 hamali = 0.0;
}

Double totalWithoutExpense = (Double.parseDouble(object[7].toString()));
Double totalDiscount =reports.getDiscountAmount();
double discountPerProduct = totalDiscount/totalItems;
String dis= String.format ("%,.2f", discountPerProduct);
/*			reports.setDiscountAmount(discountPerProduct);*/
reports.setDiscountAmount(Double.parseDouble(dis));
Double TaxAmnt =reports.getTaxAmnt();
//	Double tempTotal = (totalWithoutExpense - Discount + TaxAmnt);

double hamaliExpense = Double.parseDouble(object[16].toString());
double hamaliExpensePerProduct = hamaliExpense/totalItems;
reports.setHamaliexpense(BigDecimal.valueOf(hamaliExpensePerProduct).setScale(2, RoundingMode.HALF_UP));

Double tempTotal = ((totalWithoutExpense - discountPerProduct)+hamaliExpensePerProduct);
/*Double tempTotal = (totalWithoutExpense + TaxAmnt);*/
Double total = Math.round(tempTotal*100)/100.0;
reports.setTotalAmount(total);
/*System.out.println("==============    "+reports.getTotalAmount()+"   ==============");
System.out.println("==============Discount per Product==    "+discountPerProduct+"   ==============");*/
Double tax=reports.getTax();
Double igst=reports.getiGSTPerc();
reports.setUnit(unit);

//	double paidAmount = Double.parseDouble(object[17].toString());
double paidAmount = tempPaidAmount.doubleValue();
double paidAmountPerProduct = paidAmount/totalItems;
reports.setPaidAmount(String.format ("%,.2f", paidAmountPerProduct));
			
			if(tax == 0.00){
				reports.setTaxPerc(igst);
			}
			else{
				reports.setTaxPerc(tax);
			}
			saleList.add(reports);			
	}}
	catch(Exception e)
	{
		e.printStackTrace();	
	}
	return saleList;	
}

public List<SaleReports> saleGstReturnReportsBetweenTwoDates(String fDate, String sDate) {

	Double trans;
	Double hamali;
	System.out.println(fDate+"fDate in dao");
HibernateUtility hbu=null;
Session session=null;
List<SaleReports> saleList=null;
String status = "GST";
try
{
 hbu = HibernateUtility.getInstance();
 session = hbu.getHibernateSession();
 
//	 Query query = session.createSQLQuery("SELECT bill_no,product_name, DATE(insert_date), sale_price,sum(quantity), Discount_amount,sum(Tax_amount) , total_per_product,tax_percentage,igstPercentage FROM fertilizer_billing WHERE DATE(insert_date) BETWEEN '"+fDate+"' AND '"+sDate+"' group by tax_percentage,igstPercentage");
 Query query = session.createSQLQuery("select fb.tax_percentage, SUM(fb.total_per_product), SUM(fb.total_gst_tax_per_product) from fertilizer_billing fb where fb.insert_date between '"+fDate+"' AND +'"+sDate+"' AND fb.bill_Type = '"+status+"' AND fb.tax_percentage > 0 OR fb.igstPercentage > 0 GROUP BY fb.tax_percentage");
/* query.setParameter("fDate", fDate);
	query.setParameter("sDate", sDate);*/
		
List<Object[]> list = query.list();
saleList= new ArrayList<SaleReports>(0);


for (Object[] object : list) {
	
/*	SaleReports reports = new SaleReports();
	reports.setCustomerBill(Integer.parseInt(object[0].toString()));
	reports.setCusomerName(object[1].toString());
	reports.setItemName(object[1].toString());
	reports.setSoldDate(object[2].toString());
	reports.setSalePrice(Double.parseDouble(object[3].toString()));
	reports.setQuantity3(((BigDecimal) object[4]));
	reports.setTax(Double.parseDouble(object[8].toString()));
	reports.setiGSTPerc(Double.parseDouble(object[9].toString()));
	
	Double gstPerc=reports.getTax();
	Double igstPerc=reports.getiGSTPerc();
	if(gstPerc != 0.00){
	reports.setTaxAmnt(Double.parseDouble(object[6].toString()));
	Double taxAmnt=reports.getTaxAmnt();
	Double sgstAmnt=taxAmnt/2;
	reports.setSgstAmnt(sgstAmnt);
	reports.setCgstAmnt(sgstAmnt);
	reports.setIgstAmnt(0.0);
	}
	else if(igstPerc != 0.00){
		reports.setTaxAmnt(Double.parseDouble(object[6].toString()));
		Double taxAmnt=reports.getTaxAmnt();
		reports.setIgstAmnt(taxAmnt);
		reports.setSgstAmnt(0.0);
		reports.setCgstAmnt(0.0);
		
	}
	else{
		continue;
	}*/
			SaleReports reports = new SaleReports();
			reports.setTaxPerc(Double.parseDouble(object[0].toString()));
			reports.setTotalAmount(Double.parseDouble(object[1].toString()));
			double totalTaxAmountasPertaxPerc = Double.parseDouble(object[2].toString());
			double halfSgstCgst = totalTaxAmountasPertaxPerc/2;
			reports.setSgstAmnt(halfSgstCgst);
			reports.setCgstAmnt(halfSgstCgst);
			reports.setTotalTaxAmount(totalTaxAmountasPertaxPerc);
			
			
			saleList.add(reports);
	}}
	catch(Exception e)
	{
		e.printStackTrace();	
	}
	return saleList;	


}


public List<SaleReports> purchaseGstReturnReportsBetweenTwoDates(String supplierId,String fDate, String sDate) {

	Double trans;
	Double hamali;
	System.out.println(fDate+"fDate in dao");
HibernateUtility hbu=null;
Session session=null;
List<SaleReports> saleList=null;
try
{
	hbu = HibernateUtility.getInstance();
 session = hbu.getHibernateSession();
//	 Query query = session.createSQLQuery("SELECT bill_no,product_name, DATE(insert_date), sale_price,sum(quantity), Discount_amount,sum(Tax_amount) , total_per_product,tax_percentage,igstPercentage FROM fertilizer_billing WHERE DATE(insert_date) BETWEEN '"+fDate+"' AND '"+sDate+"' group by tax_percentage,igstPercentage");
 /*Query query = session.createSQLQuery("SELECT tax_percentage,iGstPercentage, sum(Per_Product_Total), sum(Tax_Amount) from goods_receive WHERE insertDate BETWEEN '"+fDate+"' AND '"+sDate+"' GROUP BY tax_percentage,iGstPercentage");*/

 
 Query query = session.createSQLQuery("SELECT g.tax_percentage,g.iGstPercentage, sum(Per_Product_Total),sum(Tax_Amount), sup.supplier_name from goods_receive g LEFT JOIN supplier_details sup ON g.fk_supplier_id=sup.pk_supplier_id  WHERE insertDate BETWEEN '"+fDate+"' AND '"+sDate+"' AND fk_supplier_id='"+supplierId+"' AND g.tax_percentage > 0 OR g.iGstPercentage > 0 GROUP BY tax_percentage,iGstPercentage");
List<Object[]> list = query.list();
 saleList= new ArrayList<SaleReports>(0);


for (Object[] object : list) {


	SaleReports reports = new SaleReports();
	
	reports.setTaxPerc(Double.parseDouble(object[0].toString()));
	reports.setIgstPerc(object[1].toString());
	
	reports.setTotalAmount(Double.parseDouble(object[2].toString()));	
	double totalTaxAmountasPertaxPerc = Double.parseDouble(object[3].toString());
	double halfSgstCgst = totalTaxAmountasPertaxPerc/2;
	
	
	if(Double.parseDouble(object[0].toString()) == 0 || object[1].toString().equalsIgnoreCase("0"))
{
	reports.setSgstAmnt(0.0);
	reports.setCgstAmnt(0.0);
	reports.setTotalTaxAmount(0.0);
	reports.setIgstAmnt(0.0);
}



if(Double.parseDouble(object[1].toString()) > 0)
{
	reports.setSgstAmnt(0.0);
	reports.setCgstAmnt(0.0);
	reports.setTotalTaxAmount(0.0);
	
	reports.setIgstAmnt(Double.parseDouble(object[3].toString()));
}
else
{			
	reports.setIgstAmnt(0.0);
	reports.setTotalTaxAmount(totalTaxAmountasPertaxPerc);
	reports.setSgstAmnt(halfSgstCgst);
	reports.setCgstAmnt(halfSgstCgst);
}

reports.setSupplierName(object[4].toString());

saleList.add(reports);
System.out.println("INSIDE OF FOR LOOP ===> "+reports.getTaxPerc()+" "+reports.getIgstPerc()+" "+reports.getTotalAmount()+" "+reports.getIgstAmnt()+" "+reports.getTotalTaxAmount());
			
	 }
		System.out.println(Arrays.toString(saleList.toArray()));
	}
	catch(Exception e)
	{
		e.printStackTrace();	
	}
	return saleList;	
}

public List<SaleReports> billWiseSaleReportForGrossTotalDao(String fDate, String sDate) {

	Double trans;
	Double hamali;
	System.out.println(fDate+"fDate in dao");
System.out.println(sDate+"sDate in dao");
HibernateUtility hbu=null;
Session session=null;
List<SaleReports> saleList=null;
try
{
		hbu = HibernateUtility.getInstance();
 session = hbu.getHibernateSession();
//	 Query query = session.createSQLQuery("SELECT bill_no,product_name, DATE(insert_date), sale_price,sum(quantity), Discount_amount,sum(Tax_amount) , total_per_product,tax_percentage,igstPercentage FROM fertilizer_billing WHERE DATE(insert_date) BETWEEN '"+fDate+"' AND '"+sDate+"' group by tax_percentage,igstPercentage");
 Query query = session.createSQLQuery("select fb.bill_no, fb.customer_name, fb.gross_total, cd.first_name, cd.last_name, fb.bill_payment_pending,fb.insert_date from fertilizer_billing fb left JOIN customer_details cd ON fb.fk_customer_id = cd.pk_customer_id where fb.insert_date between '"+fDate+"' AND '"+sDate+"' GROUP BY bill_no");
/* query.setParameter("fDate", fDate);
	query.setParameter("sDate", sDate);*/
	
List<Object[]> list = query.list();
saleList= new ArrayList<SaleReports>(0);


for (Object[] object : list) {
	
	String ccFirstName = "";
String cclaststName = "";

SaleReports reports = new SaleReports();

reports.setBillNo(object[0].toString());
String name = object[1].toString();			
reports.setTotalAmount(Double.parseDouble(object[2].toString()));			
double paidAmount = (Double.parseDouble(object[2].toString()) - Double.parseDouble(object[5].toString()));			
reports.setPaidAmount(String.valueOf(paidAmount));
reports.setPaymentPending(object[5].toString());
reports.setSaleDate(object[6].toString());
if(object[3] != null && object[4] != null)
{
	ccFirstName = object[3].toString();
	cclaststName = object[4].toString();
}

if(name.equalsIgnoreCase("N/A"))
			{
				reports.setName(ccFirstName);
			}
			else
			{
				reports.setName(name);
			}
			
			saleList.add(reports);
	}}
	catch(Exception e)
	{
		e.printStackTrace();	
	}
	return saleList;	
}


public static List<StockDetail> lowStockReport(HttpServletRequest request)
{
	HttpSession usersession = request.getSession(true);
	String userid = (String)usersession.getAttribute("userid");
	String shopid = (String)usersession.getAttribute("shopid");
	String usertype = (String)usersession.getAttribute("usertype");
	
	HibernateUtility hbu=null;
	Session session=null;
	List<StockDetail> stockList = null;
	Query query = null;
	String ss = "admin";
	try
	{
		hbu = HibernateUtility.getInstance();
		session = hbu.getHibernateSession();
		//Query query = session.createSQLQuery("SELECT ProductName, CompanyName, weight, quantity, stock_in_kg AS demo, unit FROM stock_detail WHERE CompanyName ='" + companyName +"'"+"AND stock_in_kg !=0 UNION ALL SELECT ProductName, CompanyName, weight, quantity, Stock_in_ltr AS demo, unit FROM stock_detail WHERE CompanyName ='" + companyName +"'"+"AND Stock_in_ltr !=0 UNION ALL SELECT ProductName, CompanyName, weight, quantity, total_piece_quantity AS demo, unit FROM stock_detail WHERE CompanyName ='" + companyName +"'"+"AND total_piece_quantity !=0");
		
		if(usertype.equals(ss)) {
	 query = session.createSQLQuery("SELECT sd.ProductName, sd.CompanyName, sd.weight, gd.quantity, sd.avail_Quantity, su.unit_name,sd.shop_name FROM stock_detail sd join product_details pd on sd.productId = pd.pk_product_id join sold_units su on pd.fk_unit_id = su.pk_unit_id join goods_receive gd on gd.fk_product_id = sd.productId WHERE sd.ProductName = pd.product_name and sd.Weight = pd.weight and sd.avail_Quantity < 10  GROUP BY gd.fk_product_id");			
	System.out.println("in if ");
		}
		else {
	 query = session.createSQLQuery("SELECT sd.ProductName, sd.CompanyName, sd.weight, gd.quantity, sd.avail_Quantity, su.unit_name,sd.shop_name FROM stock_detail sd join product_details pd on sd.productId = pd.pk_product_id join sold_units su on pd.fk_unit_id = su.pk_unit_id join goods_receive gd on gd.fk_product_id = sd.productId WHERE sd.ProductName = pd.product_name and sd.Weight = pd.weight and sd.avail_Quantity < 10 AND sd.fk_shop_id = '"+shopid+"' GROUP BY gd.fk_product_id");
		System.out.println("in else ");	
		}
		List<Object[]> list = query.list();
		stockList = new ArrayList<StockDetail>(0);
		
		for (Object[] object : list) 
		{			
			StockDetail reports = new StockDetail();
			
			reports.setProductName(object[0].toString());
			reports.setCompanyName(object[1].toString());
			/*reports.setWeight((Double)object[2]);
			reports.setQuantity((Double)object[3]);*/
			reports.setAvailableeQuantity((Double)object[4]);	
			reports.setUnit(object[5].toString());
			reports.setShopname(object[6].toString());
		
		stockList.add(reports); 
		}}
	catch(Exception e)
	{
		e.printStackTrace();	
	}
	return stockList;	

}

public List<SaleReports> cashCustomerSaleReportBillAndNameWise(String cashCustBillNo )
{
	System.out.println("********************** CASH CUSTOMER REPORTS **************************");

Double trans;
Double hamali;
System.out.println("Cash Customer Bill no for Reports          "+cashCustBillNo);

HibernateUtility hbu=null;
Session session=null;

HibernateUtility hbu2=null;
Session session2=null;

List<SaleReports> saleList=null;
try
{
			
	hbu = HibernateUtility.getInstance();
	session = hbu.getHibernateSession();
	/*Query query = session.createSQLQuery(" SELECT bill_no,product_name, DATE(insert_date), Without_Tax_Rate, quantity, Discount_amount, Tax_amount, total_per_product,tax_percentage,igstPercentage FROM fertilizer_billing WHERE fk_shop_id ='"+shop+"' AND DATE(insert_date) BETWEEN '"+fDate+"' AND '"+sDate+"'");*/
//	Query query = session.createSQLQuery("SELECT fb.bill_no, fb.product_name, fb.insert_date, fb.sale_price, fb.quantity, fb.Discount_amount, fb.Tax_amount, fb.total_per_product, fb.tax_percentage, fb.igstPercentage, fb.kg, fb.grams, fb.ltr, fb.mili, fb.total_gst_tax_per_product, fb.unit, fb.hamali_expense, SUM(cp.payment) AS paid_bill from fertilizer_billing fb JOIN credit_customer_payment cp on fb.bill_no = cp.bill_no WHERE fb.bill_no = '"+creditCustBillNo+"' GROUP BY fb.product_name, fb.company, fb.weight");
 
	Query query = session.createSQLQuery("SELECT fb.bill_no, fb.product_name, fb.insert_date, fb.sale_price, fb.quantity, fb.Discount_amount, fb.Tax_amount, fb.total_per_product, fb.tax_percentage, fb.igstPercentage, fb.kg, fb.grams, fb.ltr, fb.mili, fb.total_gst_tax_per_product, fb.unit, fb.hamali_expense, fb.gross_total from fertilizer_billing fb WHERE fb.bill_no = '"+cashCustBillNo+"' GROUP BY fb.product_name, fb.company, fb.weight");
 /*query.setParameter("shop", shop);*/	
/* query.setParameter("fDate", fDate);
	query.setParameter("sDate", sDate);*/
	
 System.out.println(cashCustBillNo+"Credit Customer Bill no for Reports");

List<Object[]> list = query.list();
int totalItems = list.size();
System.out.println("creditCustomerSaleReportBillAndNameWise listSize ============ "+list.size());
 saleList= new ArrayList<SaleReports>(0);


for (Object[] object : list)
{			
	SaleReports reports = new SaleReports();
	
	String unit = object[15].toString();
	System.out.println("UNIT FOR CREDIT CUSTOMER SALE REPORTS ==========> "+unit);

if(unit.equalsIgnoreCase("pcs"))
{
	reports.setQuantityCCReports(object[4].toString());
	System.out.println(unit+" == Assign to ==> "+reports.getQuantityCCReports());
}

else if(unit.equalsIgnoreCase("kg"))
{
	double kg = Double.parseDouble(object[10].toString());
	double grams = Double.parseDouble(object[11].toString());
	double kgAndGrams = (((kg*1000)+grams)/1000);
	reports.setQuantityCCReports(Double.toString(kgAndGrams));
	System.out.println(unit+" == Assign to ==> "+reports.getQuantityCCReports());
}

else if(unit.equalsIgnoreCase("ltr"))
{
	double ltr = Double.parseDouble(object[12].toString());
	double mili = Double.parseDouble(object[13].toString());
	double ltrAndMili = (((ltr*1000)+mili)/1000);
	reports.setQuantityCCReports(Double.toString(ltrAndMili));
	System.out.println(unit+" == Assign to ==> "+reports.getQuantityCCReports());
}	
else {
	reports.setQuantityCCReports(object[4].toString());
	System.out.println(unit+" == Assign to ==> "+reports.getQuantityCCReports());
}

reports.setCustomerBill(Integer.parseInt(object[0].toString()));
System.out.println("Bill Number of cc ========= "+reports.getCustomerBill());
reports.setItemName(object[1].toString());
System.out.println("itemName of cc ========= "+reports.getItemName());
reports.setSoldDate(object[2].toString());
System.out.println("sold date of cc ========= "+reports.getSoldDate());
reports.setSalePrice(Double.parseDouble(object[3].toString()));
reports.setDiscountAmount(Double.parseDouble(object[5].toString()));
reports.setTax(Double.parseDouble(object[8].toString()));
//reports.setiGSTPerc(Double.parseDouble(object[9].toString()));
reports.setTaxAmnt(Double.parseDouble(object[14].toString()));

Double trans1 = (Double.parseDouble(object[6].toString()));
if(trans1 != null){
	trans = (Double.parseDouble(object[6].toString()));
}else{
	trans = 0.0;
}

Double hamali1 = (Double.parseDouble(object[7].toString()));
if(hamali1 != null){
	hamali = (Double.parseDouble(object[7].toString()));
}else{
	 hamali = 0.0;
}

Double totalWithoutExpense = (Double.parseDouble(object[7].toString()));
Double totalDiscount =reports.getDiscountAmount();
double discountPerProduct = totalDiscount/totalItems;
String dis= String.format ("%,.2f", discountPerProduct);
/*			reports.setDiscountAmount(discountPerProduct);*/
reports.setDiscountAmount(Double.parseDouble(dis));
Double TaxAmnt =reports.getTaxAmnt();
//	Double tempTotal = (totalWithoutExpense - Discount + TaxAmnt);

double hamaliExpense = Double.parseDouble(object[16].toString());
double grossTotal = Double.parseDouble(object[17].toString());
double hamaliExpensePerProduct = hamaliExpense/totalItems;
reports.setHamaliexpense(BigDecimal.valueOf(hamaliExpensePerProduct).setScale(2, RoundingMode.HALF_UP));

Double tempTotal = ((totalWithoutExpense - discountPerProduct)+hamaliExpensePerProduct);
/*Double tempTotal = (totalWithoutExpense + TaxAmnt);*/
Double total = Math.round(tempTotal*100)/100.0;
reports.setTotalAmount(total);
/*System.out.println("==============    "+reports.getTotalAmount()+"   ==============");
System.out.println("==============Discount per Product==    "+discountPerProduct+"   ==============");*/
Double tax=reports.getTax();
Double igst=reports.getiGSTPerc();
reports.setUnit(unit);

double paidAmountPerProduct = grossTotal/totalItems;
reports.setPaidAmount(String.format ("%,.2f", paidAmountPerProduct));
			
				/*
				 * if(tax == 0.00){ reports.setTaxPerc(igst); } else{ reports.setTaxPerc(tax); }
				 */
			saleList.add(reports);			
	}}
	catch(Exception e)
	{
		e.printStackTrace();	
	}
	return saleList;	
}

public List<PurchaseDetailsFromGoodsReceive> rangeWiseBillPaidUnpaidDao(
		String fisDate ,String endDate )
{
	Integer dbBillNo;
	Integer cmpBillNo;
	Integer billCount = 1;
	
	HibernateUtility hbu=null;
	Session session=null;
	List<PurchaseDetailsFromGoodsReceive> purchaseList = null;
	
	HibernateUtility hbu2=null;
	Session session2=null;
	
	NumberFormat formatter = new DecimalFormat("#0.00");

try
{
	hbu = HibernateUtility.getInstance();
	session = hbu.getHibernateSession();
	Query query = session.createSQLQuery("select bill_number, supplier_details.supplier_name, total_amount, (total_amount-bill_payment_pending) as payment, bill_payment_pending, (transExpenseIncTax+hamaliExpenseIncTax) as otherExpense from goods_receive  left join supplier_details on goods_receive.fk_supplier_id = supplier_details.pk_supplier_id where purchaseDate BETWEEN '"+fisDate+"' AND '"+endDate+"' UNION select bill_number, supplier_details.supplier_name, total_amount, (total_amount-bill_payment_pending) as payment, bill_payment_pending, (transExpenseIncTax+hamaliExpenseIncTax) as otherExpense from goods_receive  left join supplier_details on goods_receive.fk_supplier_id = supplier_details.pk_supplier_id where purchaseDate BETWEEN '"+fisDate+"' AND '"+endDate+"'");
//query.setParameter("fksupplier", supplier);
		List<Object[]> list = query.list();
		purchaseList = new ArrayList<PurchaseDetailsFromGoodsReceive>(0);
		
		
		
		for (Object[] object : list)
		{			
			PurchaseDetailsFromGoodsReceive reports = new PurchaseDetailsFromGoodsReceive();
			
			reports.setBillNo(object[0].toString());
			reports.setSupplier(object[1].toString());
			reports.setTotalAmount(Double.parseDouble(object[2].toString()));
			reports.setPayment(object[3].toString());
			reports.setBillPaymentPending(object[4].toString());
			reports.setExpense(Double.parseDouble(object[5].toString()));			
			
			purchaseList.add(reports); 	
		}
	}
	catch(Exception e)
	{
		e.printStackTrace();	
	}
	return purchaseList;	
	
}

public List getProfitAndLosstBetweenTwoDatesDao(String startDate, String endDate)
{
	HibernateUtility hbu = null;
	Session session =  null;
	Query query = null;
	List list = null;
	try
	{
		 hbu = HibernateUtility.getInstance();
		 session = hbu.getHibernateSession();
//		 query = session.createSQLQuery("select pk_goods_receive_id, (SUM(gr.Per_Product_Total+gr.Tax_Amount) - gr.discount_amount), SUM(DISTINCT gr.expenses) from goods_receive gr where gr.insertDate BETWEEN '"+startDate+"' AND '"+endDate+"' GROUP BY gr.bill_number AND gr.fk_supplier_id;");
		 query = session.createSQLQuery("select pk_goods_receive_id, (SUM(gr.Per_Product_Total+gr.Tax_Amount) - gr.discount_amount), SUM(DISTINCT gr.expenses) from goods_receive gr where gr.insertDate BETWEEN '"+startDate+"' AND '"+endDate+"'");
		 
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
 System.out.println("out of dao - return credit customer List : "+list);
	 return list;
}

public List getProfitAndLosstBetweenTwoDatesOExpenseDao(String startDate, String endDate)
{
	HibernateUtility hbu = null;
	Session session =  null;
	Query query = null;
	List list = null;
	try
	{
		 hbu = HibernateUtility.getInstance();
		 session = hbu.getHibernateSession();
		 query = session.createSQLQuery("select ep.pk_expenditure_payment_id, (SUM(ep.credit)-SUM(ep.debit)) from expenditure_payment ep where ep.insert_date BETWEEN '"+startDate+"' AND '"+endDate+"'");
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
 System.out.println("out of dao - return credit customer List : "+list);
	 return list;
}

public List getProfitAndLosstBetweenTwoDatesSaleAmountDao(String startDate, String endDate)
{
	HibernateUtility hbu = null;
	Session session =  null;
	Query query = null;
	List list = null;
	try
	{
		 hbu = HibernateUtility.getInstance();
		 session = hbu.getHibernateSession();
		 query = session.createSQLQuery("select fb.pk_fertilizer_bill_id, (SUM(fb.total_per_product)-SUM(fb.Discount_amount)) from fertilizer_billing fb where fb.insert_date BETWEEN '"+startDate+"' AND '"+endDate+"'");
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
 System.out.println("out of dao - return credit customer List : "+list);
	 return list;
}

public static List<StockDetail> expiryDateWiselowStockReport()
{
	HibernateUtility hbu=null;
	Session session=null;
	List<StockDetail> stockList = null;
	try
	{	
		Date date = new Date();
		DateFormat df1 = new SimpleDateFormat("yyyy-MM-dd");
String checkDate = df1.format(date);
System.out.println("PRATIK CHECK DATE FROM EXPIRY DATE =-=-=-=-==- "+checkDate);
 
 
hbu = HibernateUtility.getInstance();
session = hbu.getHibernateSession();
Query query = session.createSQLQuery("SELECT gr.product_name, gr.company_Name, gr.weight, gr.stockPerEntry, su.unit_name, gr.expiry_date, DATEDIFF(gr.expiry_date, '"+checkDate+"') FROM goods_receive gr join product_details pd on gr.fk_product_id = pd.pk_product_id join sold_units su on pd.fk_unit_id = su.pk_unit_id WHERE gr.product_name = pd.product_name and gr.weight = pd.weight AND expiry_date IS NOT NULL ORDER BY gr.expiry_date");
				
				List<Object[]> list = query.list();
				stockList = new ArrayList<StockDetail>(0);
				
				for (Object[] object : list) 
				{			
					
					System.out.println(Arrays.toString(object));
					StockDetail reports = new StockDetail();			
					reports.setProductName(object[0].toString());
					reports.setCompanyName(object[1].toString());
					reports.setWeight(Double.parseDouble(object[2].toString()));
					reports.setStockPerEntry(object[3].toString());
					reports.setUnit(object[4].toString());
					reports.setExpiryDate(object[5].toString());
					reports.setExpiryDayeToGo(object[6].toString());
					
					stockList.add(reports); 
				}
			}
			catch(Exception e)
			{
				e.printStackTrace();	
			}
			return stockList;
		}
	
		
public static List<StockDetail> AllStockReport(HttpServletRequest request) 
{
	HttpSession usersession = request.getSession(true);
	String userid = (String)usersession.getAttribute("userid");
	String shopid = (String)usersession.getAttribute("shopid");
	String usertype = (String)usersession.getAttribute("usertype");
	
	HibernateUtility hbu=null;
	Session session=null;
	List<StockDetail> stockList = null;
	Query query = null;
	String ss = "admin";
	try
	{
		hbu = HibernateUtility.getInstance();
		session = hbu.getHibernateSession();
		
	//Query query = session.createSQLQuery("SELECT gd.barcodeNo, sd.ProductName, sd.CompanyName, sd.weight, sd.unit, gd.sale_price, SUM(gd.quantity), sd.avail_Quantity FROM stock_detail sd join product_details pd on sd.productId = pd.pk_product_id join goods_receive gd on gd.fk_product_id = sd.productId WHERE sd.ProductName = pd.product_name and sd.Weight = pd.weight and sd.avail_Quantity > 0 GROUP BY gd.fk_product_id");
	if(usertype.equals(ss)) {
		 query = session.createSQLQuery("SELECT gd.barcodeNo, sd.ProductName, sd.CompanyName, sd.weight, sd.unit, gd.sale_price, gd.quantity, sd.avail_Quantity,sd.shop_name FROM stock_detail sd join product_details pd on sd.productId = pd.pk_product_id join goods_receive gd on gd.fk_product_id = sd.productId WHERE sd.ProductName = pd.product_name and sd.Weight = gd.weight and sd.avail_Quantity > 0 GROUP BY gd.product_name");
	System.out.println("when admin login");
	}
	else {	
		 query = session.createSQLQuery("SELECT gd.barcodeNo, sd.ProductName, sd.CompanyName, sd.weight, sd.unit, gd.sale_price, gd.quantity, sd.avail_Quantity,sd.shop_name FROM stock_detail sd join product_details pd on sd.productId = pd.pk_product_id join goods_receive gd on gd.fk_product_id = sd.productId WHERE sd.ProductName = pd.product_name and sd.Weight = gd.weight and sd.avail_Quantity > 0 and sd.fk_shop_id = '"+shopid+"' GROUP BY gd.product_name");
			System.out.println("when user login");
	}
		List<Object[]> list = query.list();
	stockList = new ArrayList<StockDetail>(0);

for (Object[] object : list) 
{			
	
	StockDetail reports = new StockDetail();
	System.out.println("result - "+Arrays.toString(object));
	reports.setBarcodeNo(object[0].toString());
	reports.setProductName(object[1].toString());
	reports.setCompanyName(object[2].toString());
	//reports.setWeight((Double)object[3]);
//if(object[4].equals("pcs")) {
//reports.setUnit("Box/pcs");
//}else {
	reports.setUnit(object[4].toString());
//}
	reports.setSalePrice(object[5].toString());
//reports.setQuantity((Double)object[6] / (Double)object[3]);
//			reports.setAvailableeQuantity((Double)object[7] / (Double)object[3]);	
	reports.setAvailableeQuantity(Double.parseDouble(object[7].toString()));		
			reports.setShopname(object[8].toString());				
			stockList.add(reports); 
	
		}
}
	catch(Exception e)
	{
		e.printStackTrace();	
	}
	return stockList;	

}

public static List<GoodsReceiveBean> AllBuyandSaleReport() {
	
	HibernateUtility hbu=null;
	Session session=null;
	List<GoodsReceiveBean> buySaleList = null;
	try
	{
		hbu = HibernateUtility.getInstance();
		session = hbu.getHibernateSession();
		
		Query query = session.createSQLQuery("SELECT gd.product_name, gd.company_Name, gd.buy_price, fb.sale_price FROM goods_receive gd join fertilizer_billing fb on fb.product_name = gd.product_name GROUP BY product_name");
		List<Object[]> list = query.list();
		buySaleList = new ArrayList<GoodsReceiveBean>(0);
		
		for (Object[] object : list) 
		{			
			
			GoodsReceiveBean reports = new GoodsReceiveBean();
			
			reports.setProductName(object[0].toString());
			reports.setCompanyName(object[1].toString());
			reports.setBuyPrice(Double.parseDouble(object[2].toString()));
			reports.setSalePrice(Double.parseDouble(object[3].toString()));
												
			buySaleList.add(reports); 
	
		}}
	catch(Exception e)
	{
		e.printStackTrace();	
	}
	return buySaleList;	

}

public List getAllBillNoList(HttpServletRequest request)
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
		 query = session.createQuery("from GoodsReceiveBean where fk_shop_id='"+shopid+"'");
	 list = query.list(); 
	 
 } catch (RuntimeException e) {
	Log.error("Error in GoodsReceiveBean", e);
			}
			 
			 finally
			 {
				 if (session!=null) {
					hbu.closeSession(session);
				}
			 }
					return list;
		}

public List getPONumberbySupplierName(String supplierID, HttpServletRequest request)
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
		 Query query = session.createSQLQuery("SELECT booking_no, fk_supplier_id FROM advance_booking WHERE fk_supplier_id='"+supplierID+"' AND fk_shop_id ='"+shopid+"' AND purchaseBillNo = 0 GROUP BY booking_no");
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
//supplier gst no for goodrecive

public List getgstNumberbySupplierName(String supplierID, HttpServletRequest request)
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
		 Query query = session.createSQLQuery("SELECT tin_no,pk_supplier_id FROM supplier_details WHERE pk_supplier_id='"+supplierID+"' AND fk_shop_id ='"+shopid+"'  GROUP BY pk_supplier_id");
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
public List<PackingHibernate> getpackingBetweeenTwoDates(String fDate, String sDate,String shopid) {
	Double trans;
	Double hamali;
//	System.out.println(cat+"Category in dao");
System.out.println(fDate+"fDate in dao");
System.out.println(sDate+"sDate in dao");
HibernateUtility hbu=null;
Session session=null;
List<PackingHibernate> saleList=null;
try
{
 hbu = HibernateUtility.getInstance();
 session = hbu.getHibernateSession();

 Query query = session.createSQLQuery("select pk_pack_id,ProductName,Quantity,Weight,unit, date from packing WHERE date BETWEEN '"+fDate+"' AND '"+sDate+"' AND fk_shop_id = '"+shopid+"'");

 System.out.println(fDate+"fDate in dao");
System.out.println(sDate+"sDate in dao");

List<Object[]> list = query.list();
 saleList= new ArrayList<PackingHibernate>(0);


for (Object[] o : list) {
	
	PackingHibernate rs = new PackingHibernate();

	rs.setPkpaackid(Long.parseLong(o[0].toString()));
	rs.setProductName(o[1].toString());
	rs.setQuantity(Double.parseDouble(o[2].toString()));
	rs.setWeight(Double.parseDouble(o[3].toString()));
	rs.setUnit(o[4].toString());
	rs.setDate((Date)o[5]);
	saleList.add(rs);
	}}
	catch(Exception e)
	{
		e.printStackTrace();	
	}
	return saleList;	


}
//

public List<FertilizerBillBean> dayclosure(HttpServletRequest request) {
	Double trans;
	Double hamali;
	HttpSession session1 = request.getSession(true);
	
	String username = (String) session1.getAttribute("user");
	String userid = (String) session1.getAttribute("userid");
	String shopid = (String) session1.getAttribute("shopid");
	String shopName = (String) session1.getAttribute("shopName");
	 DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		Date dateobj = new Date();
		System.out.println(df.format(dateobj));
		String newDate = df.format(dateobj);					
//	System.out.println(cat+"Category in dao");
System.out.println(newDate +"      fDate in dao   day closure");
//System.out.println(sDate+"sDate in dao");
HibernateUtility hbu=null;
Session session=null;
List<FertilizerBillBean> saleList=null;
try
{
 hbu = HibernateUtility.getInstance();
 session = hbu.getHibernateSession();

 Query query = session.createSQLQuery("select pk_fertilizer_bill_id,customer_name,bill_no,gross_total,bill_Type,cust_type,insert_date from fertilizer_billing WHERE insert_date ='"+newDate+"' AND fk_shop_id='"+shopid+"' GROUP BY bill_no");

 System.out.println(newDate+"  sfDate in dao");
//System.out.println(sDate+"sDate in dao");

List<Object[]> list = query.list();
 saleList= new ArrayList<FertilizerBillBean>(0);
int srr=0;

for (Object[] o : list) {
	srr++;
	FertilizerBillBean rs = new FertilizerBillBean();

	rs.setPkfertilizerBillId(Long.parseLong(o[0].toString()));
	rs.setCustomerName(o[1].toString());
	rs.setBillNo(Long.parseLong(o[2].toString()));
	rs.setGrossTotal((Double.parseDouble(o[3].toString())));
	rs.setBillType((o[4].toString()));
	rs.setCust_type(o[5].toString());
	rs.setInsertDate((Date)o[6]);
	rs.setSr(srr);
	saleList.add(rs);
	}}
	catch(Exception e)
	{
		e.printStackTrace();	
	}
	return saleList;	


}
//
public List<productTransferHibernate> producttxBetweeenTwoDates(String fDate, String sDate) {
	Double trans;
	Double hamali;
//	System.out.println(cat+"Category in dao");
System.out.println(fDate+"fDate in dao");
System.out.println(sDate+"sDate in dao");
HibernateUtility hbu=null;
Session session=null;
List<productTransferHibernate> saleList=null;
try
{
 hbu = HibernateUtility.getInstance();
 session = hbu.getHibernateSession();

 Query query = session.createSQLQuery("select pk_productTx_id,companyName,productName,QuantityTx,unit,warehouse_shopname,shopnametoTx,date from producttransfer WHERE date BETWEEN '"+fDate+"' AND '"+sDate+"'");

 System.out.println(fDate+"fDate in dao");
System.out.println(sDate+"sDate in dao");

List<Object[]> list = query.list();
 saleList= new ArrayList<productTransferHibernate>(0);


for (Object[] o : list) {
	
	productTransferHibernate rs = new productTransferHibernate();

	rs.setPkproductTxid(Long.parseLong(o[0].toString()));
	rs.setCompanyName(o[1].toString());
	rs.setProductName(o[2].toString());
	rs.setQuantityTx(Double.parseDouble(o[3].toString()));
	rs.setUnit(o[4].toString());
	rs.setWare_shopname(o[5].toString());
	rs.setShopnametoTx(o[6].toString());
	rs.setDate((Date)o[7]);
	saleList.add(rs);
	}}
	catch(Exception e)
	{
		e.printStackTrace();	
	}
	return saleList;	


}


public List getAllGoods(String shopid)
{
	System.out.println("fkshopIdTx - "+shopid);
	HibernateUtility hbu=null;
	Session session=null;
	List list=null;
	try{
	 hbu = HibernateUtility.getInstance();
	 session = hbu.getHibernateSession();
	 Query query = session.createQuery("from GoodsReceiveBean where fk_shop_id ='"+shopid+"'");
	 
	 list = query.list();
	System.out.println("GoodsReceiveBean query list - "+query.list().size());
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



}
