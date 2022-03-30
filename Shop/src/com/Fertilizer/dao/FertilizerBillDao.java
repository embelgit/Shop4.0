package com.Fertilizer.dao;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
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

import com.Fertilizer.bean.CreditCustBillNoAndName;
import com.Fertilizer.bean.CustomerBillBean;
import com.Fertilizer.bean.DayWiseSale;
import com.Fertilizer.bean.GetBillDetails;
import com.Fertilizer.bean.GetCreditCustomerDetails;
import com.Fertilizer.bean.GetProductDetails;
import com.Fertilizer.bean.SaleReports;
import com.Fertilizer.hibernate.CustomerDetailsBean;
import com.Fertilizer.hibernate.CustomerPaymentBean;
import com.Fertilizer.hibernate.ExpenseDetailForBillingAndGoodsReceiveBean;
import com.Fertilizer.hibernate.FertilizerBillBean;
import com.Fertilizer.hibernate.ItemStock;
import com.Fertilizer.hibernate.ItemStockForSeedAndPesti;
import com.Fertilizer.hibernate.NormalCustomerPaymentBean;
import com.Fertilizer.hibernate.ProductDetailsBean;
import com.Fertilizer.hibernate.SaleReturnBean;
import com.Fertilizer.hibernate.billcancelbean;
import com.Fertilizer.utility.HibernateUtility;

public class FertilizerBillDao {

	public void addFertilizerBillingInDAO(FertilizerBillBean bean) {

		System.out.println("In DAO");
		
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
	public void addBillingcancelInDAO(billcancelbean bean) {

		System.out.println("In DAO");
		
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
	
	// get All bill No to sale return
		public List getAllBillNoOnSaleReturn() {
			
			HibernateUtility hbu = null;
			Session session = null;
			Query query = null;
			List<Object[]> list = null;
			List<FertilizerBillBean> billList = null;
			
			try {
				hbu = HibernateUtility.getInstance();
				session = hbu.getHibernateSession();
				//query = session.createQuery("from FertilizerBillBean group by billNo");
				query = session.createSQLQuery("SELECT fb.pk_fertilizer_bill_id, fb.bill_no FROM fertilizer_billing fb WHERE fb.fk_customer_id = 0 AND quantity > 0");
				list = query.list();
				billList = new ArrayList<FertilizerBillBean>(0);
				 
				 for (Object[] objects : list)
				 {					 
					FertilizerBillBean bean = new FertilizerBillBean();
					bean.setBillNo(Long.parseLong(objects[1].toString()));
					billList.add(bean);
				 }
				
				
			} catch (RuntimeException e) {
				Log.error("Error in getAllSupllier", e);
			}

			finally {
				if (session != null) {
					hbu.closeSession(session);
				}
			}
			return billList;
		}
		
		public List getAllSaleEntry() {
			HibernateUtility hbu = null;
			Session session = null;
			Query query = null;
			List list = null;
			try {
				hbu = HibernateUtility.getInstance();
				session = hbu.getHibernateSession();
				query = session.createQuery("from FertilizerBillBean");
				list = query.list();
			} catch (RuntimeException e) {
				Log.error("Error in getAllSupllier", e);
			}

			finally {
				if (session != null) {
					hbu.closeSession(session);
				}
			}
			return list;
		}




		// get all ferti item of sale return
		public List getAllFertiIetmByBillNo(String bill_no) {
			
			HibernateUtility hbu=null;
			Session session=null;
			List list=null;
				
				try{
				 hbu=HibernateUtility.getInstance();
				 session=hbu.getHibernateSession();
				 
				//Query query=session.createSQLQuery("SELECT p.pk_fertilizer_bill_id,p.fk_goods_receive_id ,p.cat_id,p.customer_name,p.product_name,p.company,p.weight,p.sale_price,p.mrp,p.quantity,p.total_per_product,p.barcode,p.aadhar,p.insert_date,p.credit_customer_name,p.tax_percentage,p.Discount_perc,p.Discount_amount,p.total_per_product from fertilizer_billing p WHERE p.bill_no=:bill_no AND quantity > 0");
				 Query query=session.createSQLQuery("SELECT p.pk_fertilizer_bill_id,p.cat_id,p.bill_no,p.customer_name,p.product_name,p.company,p.weight,p.sale_price,p.mrp,p.quantity,p.total_per_product,p.insert_date,p.credit_customer_name,p.tax_percentage,p.Discount_perc,p.Discount_amount from fertilizer_billing p WHERE p.bill_no="+bill_no+"");
				
				 //query.setParameter("bill_no", bill_no);
				 list = query.list();
				 
				//System.out.println(list.size()+" ===List size Sale Return");
				}catch(RuntimeException e){
					
				Log.error("Error in getProductDetails",e);
				}finally{
					if(session!=null){
						
						hbu.closeSession(session);
					}
					
				}
			
			return list;
		}
		
		
		////credit billing for sale return/////////
		
		public List getAllCreditBilingDetailByBillNo(String billno) {
			// TODO Auto-generated method stub
			System.out.println("billNo------"+billno);
			HibernateUtility hbu=null;
			Session session=null;
			List list=null;
				
				try{
				 hbu=HibernateUtility.getInstance();
				 session=hbu.getHibernateSession();
				 
				Query query=session.createSQLQuery("SELECT p.pk_fertilizer_bill_id,p.fk_goods_receive_id ,p.cat_id,p.customer_name,p.product_name,p.company,p.weight,p.sale_price,p.mrp,p.quantity,p.total_per_product,p.barcode,p.aadhar,p.insert_date,p.credit_customer_name,p.tax_percentage,p.Discount_perc,p.Discount_amount,p.total_per_product  from fertilizer_billing p WHERE p.bill_no="+billno);
				//query.setParameter("bill_no", bill_no);
				
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
		
		//////////////fetching bill number for cash customer////////////////
		
		public List getAllBillCash(String customerName)
		{
			System.out.println("IN DAO");
			HibernateUtility hbu = null;
			Session session =  null;
			Query query = null;
			 List list = null;
			System.out.println("IN DAO"+customerName);
			 try {
				 hbu = HibernateUtility.getInstance();
				 session = hbu.getHibernateSession();
				 System.out.println("IN DAO"+customerName);
				 query = session.createSQLQuery("select bill_no,gross_total from fertilizer_billing WHERE fk_customer_id='"+customerName+"' GROUP BY bill_no");
				 list = query.list(); 
				 System.out.println("=== list ===="+list.size());
				 System.out.println("List size of product detail = ="+list.size());
				 /*for (Object[] object : list) {
						System.out.println(Arrays.toString(object));
						SubCategoryDetailsBean reports = new SubCategoryDetailsBean();
						reports.setSubcatId(Long.parseLong(object[0].toString()));
						reports.setSubcategoryName(object[1].toString());
						stockList.add(reports); 
				
					}*/
				 
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
	
		/////////////fetching bill number for credit customer///////////////
		
		public List getAllBillCredit(String creditCustomer)
		{
			System.out.println("IN DAO");
			HibernateUtility hbu = null;
			Session session =  null;
			Query query = null;
			 List list = null;
			System.out.println("IN DAO-------> "+creditCustomer);
			 try {
				 hbu = HibernateUtility.getInstance();
				 session = hbu.getHibernateSession();
				 System.out.println("IN DAO========> "+creditCustomer);
				 //query = session.createSQLQuery("select bill_no,gross_total from fertilizer_billing WHERE fk_customer_id='"+creditCustomer+"' AND quantity>0  GROUP BY bill_no");
				 query = session.createSQLQuery("select bill_no,gross_total from fertilizer_billing WHERE fk_customer_id='"+creditCustomer+"' GROUP BY bill_no");
				 list = query.list(); 
				 System.out.println("=== list ===="+list.size());
				 System.out.println("List size of product detail = ="+list.size());
				 /*for (Object[] object : list) {
						System.out.println(Arrays.toString(object));
						SubCategoryDetailsBean reports = new SubCategoryDetailsBean();
						reports.setSubcatId(Long.parseLong(object[0].toString()));
						reports.setSubcategoryName(object[1].toString());
						stockList.add(reports); 
				
					}*/
				 
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
	
	public List getCustomerBill(){	
		HibernateUtility hbu=null;
		Session session=null;
		List<CustomerBillBean> saleList=null;
		try
		{
			hbu = HibernateUtility.getInstance();
		 session = hbu.getHibernateSession();
		 Query query = session.createSQLQuery("SELECT bill_no , customer_name FROM fertilizer_billing ORDER BY bill_no DESC LIMIT 1");
			
			List<Object[]> list = query.list();
			 saleList= new ArrayList<CustomerBillBean>(0);
			for (Object[] object : list) {
				CustomerBillBean reports = new CustomerBillBean();
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
	
	
	public List getAllClosingReport(){
		   java.util.Date date = new java.util.Date();  
		    DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		    String data = (dateFormat.format(date)); //2014/08/06 15:59:4
		    HibernateUtility hbu=null;
		    Session session=null;
		    List<DayWiseSale> saleList=null;
		    try
		    {
				hbu = HibernateUtility.getInstance();
				session = hbu.getHibernateSession();
		 Query query=session.createSQLQuery("select customerBill, product_name , quantity , sale_price ,gross_total, payment_mode from fertilizer_bill where  insert_date="+data);	
			List<Object[]> list = query.list();
			 saleList= new ArrayList<DayWiseSale>(0);	
			for (Object[] object : list) {
				System.out.println(Arrays.toString(object));
				
				DayWiseSale reports = new DayWiseSale();
				reports.setCustomerBill(Long.parseLong(object[0].toString()));
				reports.setItemName(object[1].toString());
				reports.setQuantity1((BigInteger) object[2]);
				reports.setPrice(Double.parseDouble(object[3].toString()));
			
				reports.setTotAmount(Double.parseDouble(object[4].toString()));
				reports.setPaymentMode(object[5].toString());
				
				saleList.add(reports);		
		}}
		catch(Exception e)
		{
			e.printStackTrace();
		}/*finally
		{if(session!=null){
			hbu.closeSession(session);	
		}
		}*/
		return saleList;
	}
	
	public List getSaleDetailsDateWise(String startDate,String endDate){
		
		HibernateUtility hbu=null;
		Session session=null;
		List<SaleReports> saleList=null;
		try
		{
				hbu = HibernateUtility.getInstance();
		 session = hbu.getHibernateSession();
		 Query query2 = session.createSQLQuery("select DATE(c.insert_date) , c.quantity , c.sale_price ,c.gross_total,c.customerBill,c.expenses from fertilizer_bill c  where c.insert_date BETWEEN :stDate AND :edDate");
			query2.setParameter("stDate", startDate);
	        query2.setParameter("edDate", endDate);
	        List<Object[]> list = query2.list();
			 	saleList= new ArrayList<SaleReports>(0);
			
			
			for (Object[] object : list) {
				
				SaleReports reports = new SaleReports();
				reports.setSoldDate(object[0].toString());
				System.out.println(Arrays.toString(object));
				
				
					reports.setSalePriceforsale((BigDecimal)object[2]);
					reports.setQuantity1((BigInteger)object[1]);
				reports.setTotalAmount(Double.parseDouble(object[3].toString()));
			    reports.setCustomerBill(Integer.parseInt(object[4].toString()));
			    reports.setExpenses((BigDecimal)object[5]);
				saleList.add(reports); 
		}}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		return saleList;
		
	}
	public List getSaleDetailsBySingalDateWise(String isInsertDate){
		
		HibernateUtility hbu=null;
		Session session=null;
		List<SaleReports> saleList=null;
		try
		{
				hbu = HibernateUtility.getInstance();
		 session = hbu.getHibernateSession();
		 Query query = session.createSQLQuery(" select customerBill,  DATE(insert_date) , quantity  ,sale_price , gross_total ,expenses from fertilizer_bill where DATE(insert_date)=:isInsertDate ");
			query.setParameter("isInsertDate", isInsertDate);
			List<Object[]> list = query.list();
			 saleList= new ArrayList<SaleReports>(0);
			
			
			for (Object[] object : list) {
				
			SaleReports reports = new SaleReports();
				reports.setCustomerBill(Integer.parseInt(object[0].toString()));
				reports.setSoldDate(object[1].toString());
				reports.setQuantity1(((BigInteger) object[2]));
				reports.setSalePrice(Double.parseDouble(object[3].toString()));

				reports.setTotalAmount(Double.parseDouble(object[4].toString()));
				reports.setExpenses((BigDecimal)object[5]);
				saleList.add(reports);
		}}
		catch(Exception e)
		{
			e.printStackTrace();	
		}
		return saleList;	
	}
	
	
	//this method is used to get the all bill no of fertilizer and sedds and pesticides 
	

public List getNorCustBillAndClientName()
		{
			HibernateUtility hbu=null;
			Session session=null;
			
			List<GetBillDetails> billList=null;
			 List<Object[]> list = null;
			
			try
			{
					hbu = HibernateUtility.getInstance();
					session = hbu.getHibernateSession();
					Query query=session.createSQLQuery("select bill_no, customer_name from seed_pesticide_billing where customer_name != 'N/A' group by bill_no;");
					list = query.list();
					billList = new ArrayList<GetBillDetails>(0);
					
			 for (Object[] objects : list) {
				 GetBillDetails bean = new GetBillDetails();
				
				bean.setBillNo(Long.parseLong(objects[0].toString()));
				bean.setClientName((String) objects[1]);
				 
				billList.add(bean);
				}
			 }
			catch(RuntimeException  e)
			{
					
			}finally
			{if(session!=null){
				hbu.closeSession(session);	
			}
			}
			return billList;
		}



public List getNorCustBillAndClientNameForPestiBillCopy()
		{
			HibernateUtility hbu=null;
			Session session=null;
			
			List<GetBillDetails> billList=null;
			 List<Object[]> list = null;
			
			try
			{
					hbu = HibernateUtility.getInstance();
					session = hbu.getHibernateSession();
					Query query=session.createSQLQuery("select bill_no, customer_name from pesticide_billing where customer_name != 'N/A' group by bill_no;");
					list = query.list();
					billList = new ArrayList<GetBillDetails>(0);
					
			 for (Object[] objects : list) {
				 GetBillDetails bean = new GetBillDetails();
				
				bean.setBillNo(Long.parseLong(objects[0].toString()));
				bean.setClientName((String) objects[1]);
				 
				billList.add(bean);
				}
			 }
			catch(RuntimeException  e)
			{
					
			}finally
			{if(session!=null){
				hbu.closeSession(session);	
			}
			}
			return billList;
		}


		
		
		//this method is used to get the all bill no of fertilizer and sedds and pesticides 
		



public List getCreditCustBIllAndClientName()
			{
				HibernateUtility hbu=null;
				Session session=null;
				
				List<CreditCustBillNoAndName> billList=null;
				 List<Object[]> list = null;
				 
				 String fname;
					String lname;

					String clientName;
				
				try
				{
						hbu = HibernateUtility.getInstance();
						session = hbu.getHibernateSession();
						Query query=session.createSQLQuery("select seed_pesticide_billing.bill_no, customer_details.first_name, customer_details.last_name from seed_pesticide_billing left join customer_details on seed_pesticide_billing.fk_customer_id = customer_details.pk_customer_id where seed_pesticide_billing.fk_customer_id != 0 OR seed_pesticide_billing.fk_customer_id != null group by bill_no");
						list = query.list();
						billList = new ArrayList<CreditCustBillNoAndName>(0);
						
				 for (Object[] objects : list) {
					 CreditCustBillNoAndName bean = new CreditCustBillNoAndName();
					
					bean.setBillNo(Long.parseLong(objects[0].toString()));
					//bean.setClientName((String) objects[1]);
					
					fname = (String) objects[1];
					lname = (String) objects[2];
					clientName = fname+" "+lname;
					bean.setClientName(clientName);
					
					System.out.println("creit cust Bill No and name++++++"+objects[0].toString()+"++++++++++"+(String) objects[1]);
					 
					billList.add(bean);
					}
				 }
				catch(RuntimeException  e)
				{
						
				}finally
				{if(session!=null){
					hbu.closeSession(session);	
				}
				}
				return billList;
			}



public List getCreditCustBIllAndClientNameFoerPestiBillCopy()
			{
				HibernateUtility hbu=null;
				Session session=null;
				
				List<CreditCustBillNoAndName> billList=null;
				 List<Object[]> list = null;
				 
				 String fname;
					String lname;

					String clientName;
				
				try
				{
						hbu = HibernateUtility.getInstance();
						session = hbu.getHibernateSession();
						Query query=session.createSQLQuery("select p.bill_no, customer_details.first_name, customer_details.last_name from pesticide_billing p left join customer_details on p.fk_customer_id = customer_details.pk_customer_id where p.fk_customer_id != 0 OR p.fk_customer_id != null group by p.bill_no");
						list = query.list();
						billList = new ArrayList<CreditCustBillNoAndName>(0);
						
				 for (Object[] objects : list) {
					 CreditCustBillNoAndName bean = new CreditCustBillNoAndName();
					
					bean.setBillNo(Long.parseLong(objects[0].toString()));
					//bean.setClientName((String) objects[1]);
					
					fname = (String) objects[1];
					lname = (String) objects[2];
					clientName = fname+" "+lname;
					bean.setClientName(clientName);
					
					System.out.println("creit cust Bill No and name++++++"+objects[0].toString()+"++++++++++"+(String) objects[1]);
					 
					billList.add(bean);
					}
				 }
				catch(RuntimeException  e)
				{
						
				}finally
				{if(session!=null){
					hbu.closeSession(session);	
				}
				}
				return billList;
			}

			
			public List getAmountByCreditCustPayment(String startDate, String endDate) {

				HibernateUtility hbu = null;
				Session session = null;
				List<SaleReports> saleList = null;
				try {
					hbu = HibernateUtility.getInstance();
					session = hbu.getHibernateSession();
					// Query query2 =
					// session.createSQLQuery("select DATE(c.insert_date) , c.quantity , c.sale_price ,c.gross_total,c.customerBill,c.expenses from fertilizer_bill c  where c.insert_date BETWEEN :stDate AND :edDate");
					//Query query2 = session.createSQLQuery("select insert_date,bill_no, first_name, credit from credit_customer_payment left join customer_details on credit_customer_payment.fk_customer_id = customer_details.pk_customer_id where insert_date BETWEEN :stDate AND :edDate");
					Query query2 = session.createSQLQuery("select insert_date, bill_no, first_name, SUM(payment), payment_mode from credit_customer_payment left join customer_details on credit_customer_payment.fk_customer_id = customer_details.pk_customer_id where insert_date BETWEEN :stDate AND :edDate");
					query2.setParameter("stDate", startDate);
					query2.setParameter("edDate", endDate);
					List<Object[]> list = query2.list();
					saleList = new ArrayList<SaleReports>(0);

					for (Object[] object : list) {

						SaleReports reports = new SaleReports();
						
						reports.setSoldDate(object[0].toString());
						reports.setCustomerBill(Integer.parseInt(object[1].toString()));
						reports.setCusomerName(object[2].toString());
						reports.setTotalAmount(Double.parseDouble(object[3].toString()));

						saleList.add(reports);
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
				return saleList;

			}
			
			
			// this method is used to get the credit amount by customer billing

			public List getAmountByCustBilling(String startDate, String endDate) {

				HibernateUtility hbu = null;
				Session session = null;
				List<SaleReports> saleList = null;
				try {
					hbu = HibernateUtility.getInstance();
					session = hbu.getHibernateSession();
					// Query query2 =
					// session.createSQLQuery("select DATE(c.insert_date) , c.quantity , c.sale_price ,c.gross_total,c.customerBill,c.expenses from fertilizer_bill c  where c.insert_date BETWEEN :stDate AND :edDate");
					Query query2 = session.createSQLQuery("select date(insert_date), bill_no, customer_name, payment_mode,gross_total from fertilizer_billing where insert_date BETWEEN :stDate AND :edDate && customer_name != 'N/A'");
					query2.setParameter("stDate", startDate);
					query2.setParameter("edDate", endDate);
					List<Object[]> list = query2.list();
					saleList = new ArrayList<SaleReports>(0);

					for (Object[] object : list) {

						SaleReports reports = new SaleReports();
						reports.setSoldDate(object[0].toString());
						reports.setCustomerBill(Integer.parseInt(object[1].toString()));
						reports.setCusomerName(object[2].toString());
						reports.setPaymentMode(object[3].toString());
						reports.setTotalAmount(Double.parseDouble(object[4].toString()));

						saleList.add(reports);
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
				return saleList;

			}
			
			public List getPaidAmountToSupplier(String startDate, String endDate) {

				HibernateUtility hbu = null;
				Session session = null;
				List<SaleReports> saleList = null;
				try {
					hbu = HibernateUtility.getInstance();
					session = hbu.getHibernateSession();
					// Query query2 =
					// session.createSQLQuery("select DATE(c.insert_date) , c.quantity , c.sale_price ,c.gross_total,c.customerBill,c.expenses from fertilizer_bill c  where c.insert_date BETWEEN :stDate AND :edDate");
					//Query query2 = session.createSQLQuery("select insert_date, bill_no, person_name, credit from supplier_payment where insert_date BETWEEN :stDate AND :edDate");
					Query query2 = session.createSQLQuery("select insert_date, bill_no, person_name, SUM(payment) from supplier_payment where insert_date BETWEEN :stDate AND :edDate");
					query2.setParameter("stDate", startDate);
					query2.setParameter("edDate", endDate);
					List<Object[]> list = query2.list();
					saleList = new ArrayList<SaleReports>(0);

					for (Object[] object : list) {

						SaleReports reports = new SaleReports();
						reports.setSoldDate(object[0].toString());
						reports.setBillNo(object[1].toString());
						reports.setCusomerName(object[2].toString());
						reports.setTotalAmount(Double.parseDouble(object[3].toString()));

						saleList.add(reports);
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
				return saleList;

			}
			
			
			public List getPaidAmountToEmployee(String startDate, String endDate) {

				HibernateUtility hbu = null;
				Session session = null;
				List<SaleReports> saleList = null;
				try {
					hbu = HibernateUtility.getInstance();
					session = hbu.getHibernateSession();
					
					String payType= "debit";
					
					Query query2 = session.createSQLQuery("select insert_date, first_name, reason, paymentType,payment from employee_payment left join employee_details on employee_payment.fk_employee_id = employee_details.pk_empoyee_id where insert_date BETWEEN :stDate AND :edDate AND paymentType='"+payType+"' ");
					query2.setParameter("stDate", startDate);
					query2.setParameter("edDate", endDate);
					System.out.println(startDate);
					System.out.println(endDate);
					List<Object[]> list = query2.list();
					saleList = new ArrayList<SaleReports>(0);

					for (Object[] object : list) {

						SaleReports reports = new SaleReports();
						reports.setSoldDate(object[0].toString());
						reports.setCusomerName(object[1].toString());
						reports.setReason(object[2].toString());
						reports.setPaymentMode(object[3].toString());
						reports.setTotalAmount(Double.parseDouble(object[4].toString()));

						saleList.add(reports);
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
				return saleList;

			}
			
			public List getNormalCustFertilizerBillNos()
			{
				HibernateUtility hbu=null;
				Session session=null;
				
				List<GetBillDetails> billList=null;
				 List<Object[]> list = null;
				String s = "Cash";
				try
				{
						hbu = HibernateUtility.getInstance();
						session = hbu.getHibernateSession();
//						Query query=session.createSQLQuery("select bill_no, customer_name from fertilizer_billing where customer_name != 'N/A' group by bill_no;");
						Query query=session.createSQLQuery("select bill_no, customer_name from fertilizer_billing where cust_type = '"+s+"' group by customer_name");
						list = query.list();
						billList = new ArrayList<GetBillDetails>(0);
						
				 for (Object[] objects : list) {
					 GetBillDetails bean = new GetBillDetails();
					
					bean.setBillNo(Long.parseLong(objects[0].toString()));
					bean.setClientName((String) objects[1]);
					 
					billList.add(bean);
					}
				 }
				catch(RuntimeException  e)
				{
						
				}finally
				{if(session!=null){
					hbu.closeSession(session);	
				}
				}
				return billList;
			}
			
			// Get Credit Customer  Fertilizer Bill Nos from Fertilizer_billing table
			
						public List getCreditCustFertilizerBillNos()
						{
							HibernateUtility hbu=null;
							Session session=null;
							
							String fname;
							String lname;

							String clientName;
							
							List<GetBillDetails> billList=null;
							 List<Object[]> list;
							String s = "Credit";
							 
							try
							{
									hbu = HibernateUtility.getInstance();
									session = hbu.getHibernateSession();
									//Query query=session.createSQLQuery("select bill_no, customer_name from fertilizer_billing where customer_name != 'N/A' group by bill_no;");
						//			Query query=session.createSQLQuery("select fertilizer_billing.bill_no, customer_details.first_name, customer_details.last_name from fertilizer_billing left join customer_details on fertilizer_billing.fk_customer_id = customer_details.pk_customer_id where fertilizer_billing.fk_customer_id != 0 OR fertilizer_billing.fk_customer_id != null group by bill_no");
									Query query=session.createSQLQuery("select bill_no, credit_customer_name from fertilizer_billing where cust_type = '"+s+"' group by credit_customer_name");					
									
									list = query.list();
									billList = new ArrayList<GetBillDetails>(0);
									
							 for (Object[] objects : list) {
								 GetBillDetails bean = new GetBillDetails();
								
								bean.setBillNo(Long.parseLong(objects[0].toString()));
//								fname = (String) objects[1];
//								lname = (String) objects[2];
//								clientName = fname+" "+lname;
								bean.setClientName(objects[1].toString());
								 
								billList.add(bean);
								}
							 }
							catch(RuntimeException  e)
							{
									
							}finally
							{if(session!=null){
								hbu.closeSession(session);	
							}
							}
							return billList;
						}
			
						// Tax details as per cat from sale Two Date

						public List<GetProductDetails> getPurchaseDetailsForCategoryBetTwoDate(
								String cat, String fDate, String sDate) {


							HibernateUtility hbu=null;
							Session session=null;
							List<GetProductDetails> saleList=null;
							try
							{
									hbu = HibernateUtility.getInstance();
							 session = hbu.getHibernateSession();
							// Query query = session.createSQLQuery(" SELECT bill_no,product_name, company ,weight,sale_price, mrp,quantity,tax_percentage,total_per_product FROM fertilizer_billing WHERE cat_id =:cat AND tax_percentage>0 AND DATE(insert_date) BETWEEN :fDate AND :sDate UNION SELECT bill_no,product_name, company ,weight,sale_price, mrp,quantity,tax_percentage,total_per_product FROM seed_pesticide_billing WHERE cat_id =:cat AND tax_percentage>0 AND DATE(insert_date) BETWEEN :fDate AND :sDate");
							 Query query = session.createSQLQuery("SELECT bill_no, product_name, company, weight, sale_price, mrp, quantity, tax_percentage, total_per_product, kg, grams, ltr, mili, unit, total_gst_tax_per_product,cust_type,customer_name,credit_customer_name,GST_No FROM fertilizer_billing WHERE cat_id =:cat AND tax_percentage>0 AND DATE(insert_date) BETWEEN :fDate AND :sDate");
							 							 
							 query.setParameter("cat", cat);
								query.setParameter("fDate", fDate);
								query.setParameter("sDate", sDate);
								List<Object[]> list = query.list();
								 saleList= new ArrayList<GetProductDetails>(0);
								
								
								for (Object[] o : list) {
									
									
									
									GetProductDetails reports = new GetProductDetails();
									System.out.println("rslt -  "+Arrays.toString(o));
									reports.setBillNo(Long.parseLong(o[0].toString()));
									reports.setProduct(o[1].toString());
									reports.setManufacturer(o[2].toString());
									reports.setWeight(Double.parseDouble(o[3].toString()));
									reports.setSalePrice(Double.parseDouble(o[4].toString()));
									reports.setMrp(Double.parseDouble(o[5].toString()));
									reports.setQuantity(Double.parseDouble(o[6].toString()));
									reports.setTaxPercentage(Double.parseDouble(o[7].toString()));
									
									String unit = o[13].toString();
									

/*									if(unit.equalsIgnoreCase("p"))
									{
										//reports.setQuantity(Long.parseLong(o[6].toString()));
										reports.setQuantityCCReports(o[6].toString());		
									}
									
									if(unit.equalsIgnoreCase("kg"))
									{
										double kg = Double.parseDouble(o[9].toString());
										double grams = Double.parseDouble(o[10].toString());
										double kgAndGrams = (((kg*1000)+grams)/1000);
										//reports.setQuantity((long) kgAndGrams);
										reports.setQuantityCCReports(Double.toString(kgAndGrams));		
										//System.out.println(unit+" == Assign to ==> "+reports.getQuantityCCReports());
									}
									
									if(unit.equalsIgnoreCase("ltr"))
									{
										double ltr = Double.parseDouble(o[11].toString());
										double mili = Double.parseDouble(o[12].toString());
										double ltrAndMili = (((ltr*1000)+mili)/1000);
										//reports.setQuantity((long)ltrAndMili);
										reports.setQuantityCCReports(Double.toString(ltrAndMili));	
										//System.out.println(unit+" == Assign to ==> "+reports.getQuantityCCReports());
									}
	*/								
									reports.setQuantityCCReports(o[6].toString());		
									reports.setUnitName(unit);
									
									/*reports.setKg(Double.parseDouble(o[9].toString()));
									reports.setGrams(Double.parseDouble(o[10].toString()));
									reports.setLtr(Double.parseDouble(o[11].toString()));
									reports.setMili(Double.parseDouble(o[12].toString()));*/
									
									Double salePrice = Double.parseDouble(o[4].toString());
									Double TaxPercentage = Double.parseDouble(o[7].toString());									
									
									/*Double taxAmountPerunit = (TaxPercentage/100)*salePrice;
									Double newSale = salePrice + taxAmountPerunit;
									Double quantity = Double.parseDouble(o[6].toString());
									Double totalTaxAmount = quantity * taxAmountPerunit;*/
									
									reports.setTaxAmount(Double.parseDouble(o[14].toString()));
									String cc = o[15].toString();
									System.out.println("cust type -  - -  -   "+cc);
									
									if(cc.equals("Cash")) {
										reports.setCustomerName(o[16].toString());
									}
									else {
										reports.setCustomerName(o[17].toString());
									}
									reports.setGstNo(o[18].toString());
									
									saleList.add(reports);
							}}
							catch(Exception e)
							{
								e.printStackTrace();	
							}
							return saleList;	
						
						
						
						}
						
						
						public List<SaleReturnBean> saleReturnReportAsPerBill(
								String bill_no) {
							Double trans;
							Double hamali;
							System.out.println(bill_no+"Category in dao");
							
							HibernateUtility hbu=null;
							Session session=null;
							List<SaleReturnBean> saleList=null;
							try
							{
									hbu = HibernateUtility.getInstance();
							 session = hbu.getHibernateSession();
							 Query query = session.createSQLQuery(" select sr.bill_number,sr.product_name,sr.sale_date,sr.sale_price,sr.availabe_quantity,sr.return_date,sr.return_amount,sr.return_quantity,s.total_after_sale_return from sale_return sr left join fertilizer_billing s on s.bill_no=sr.bill_number where bill_number='"+bill_no+"'");
							 /*query.setParameter("shop", shop);*/	
							/* query.setParameter("fDate", fDate);
								query.setParameter("sDate", sDate);*/
							
								
								List<Object[]> list = query.list();
								 saleList= new ArrayList<SaleReturnBean>(0);
								
								
								for (Object[] object : list) {
									
									SaleReturnBean reports = new SaleReturnBean();
									reports.setBillNo(Long.parseLong(object[0].toString()));
									/*reports.setCusomerName(object[1].toString());*/
									reports.setProductName(object[1].toString());
									reports.setSaleDate(object[2].toString());
									reports.setSalePrice(Double.parseDouble(object[3].toString()));
									reports.setAvailableQuantity(Double.parseDouble(object[4].toString()));
									reports.setReturnDate1(object[5].toString());
									reports.setReturnAmount(Double.parseDouble(object[6].toString()));
									reports.setReturnQuantity(Double.parseDouble(object[7].toString()));
									reports.setTotalAmount(Double.parseDouble(object[8].toString()));
									saleList.add(reports);
							}}
							catch(Exception e)
							{
								e.printStackTrace();	
							}
							return saleList;	
					}	
										
						public void normalCustomerFirstpaymentDAO(NormalCustomerPaymentBean nCPBean) {

							System.out.println("In DAO for normal customer first payment");
							
							HibernateUtility hbu=null;
							Session session = null;
							Transaction transaction = null;
							try{
							 hbu = HibernateUtility.getInstance();
							session = hbu.getHibernateSession();
							 System.out.println("got session ");
							 transaction = session.beginTransaction();
						
							 System.out.println("Tx started");
							session.save(nCPBean);
							System.out.println("normal customer first payment BEFORE COMMIT");
							transaction.commit();
							System.out.println("normal customer first payment AFTER COMMIT");
							System.out.println("Successful 	============ normal customer first payment");
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
						
						public void creditCustomerFirstpaymentDAO(CustomerPaymentBean cPBean) {

							System.out.println("In DAO for normal customer first payment");
							
							HibernateUtility hbu=null;
							Session session = null;
							Transaction transaction = null;
							try{
							 hbu = HibernateUtility.getInstance();
							session = hbu.getHibernateSession();
							 System.out.println("got session ");
							 transaction = session.beginTransaction();
						
							 System.out.println("Tx started");
							session.save(cPBean);
							System.out.println("normal customer first payment BEFORE COMMIT");
							transaction.commit();
							System.out.println("normal customer first payment AFTER COMMIT");
							System.out.println("Successful 	============ normal customer first payment");
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
						
						public Long getCurrentBillNumber(HttpServletRequest request)
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
									Query query=session.createSQLQuery("select bill_no from fertilizer_billing WHERE fk_shop_id ='"+shopid+"' ORDER BY bill_no DESC limit 1");
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
						
						
						public List getCashCustFertilizerBillNos()
						{
							HibernateUtility hbu=null;
							Session session=null;
							
							String customerName;
							
							List<GetBillDetails> cashCustomerbillList=null;
							List<Object[]> list;
							
							try
							{
									hbu = HibernateUtility.getInstance();
									session = hbu.getHibernateSession();
									//Query query=session.createSQLQuery("select bill_no, customer_name from fertilizer_billing where customer_name != 'N/A' group by bill_no;");
									Query query=session.createSQLQuery("select bill_no, customer_name from fertilizer_billing where customer_name != 'N/A' AND customer_name IS NOT NULL group by bill_no");
									list = query.list();
									cashCustomerbillList = new ArrayList<GetBillDetails>(0);
									
									
							 for (Object[] objects : list)
							 {
								
								 GetBillDetails bean = new GetBillDetails();
								
								bean.setBillNo(Long.parseLong(objects[0].toString()));
								customerName = (String) objects[1];
								bean.setClientName(customerName);
								 
								cashCustomerbillList.add(bean);
								}
							 }
							catch(RuntimeException  e)
							{
								System.out.println("getCashCustFertilizerBillNos() === "+e);
							}
							finally
							{if(session!=null){
								hbu.closeSession(session);	
							}
							}
							return cashCustomerbillList;
						}

						public void updateBillingQuantity(double qnt, String pkfertilizerBillId, String barcodeNo)
						{
							HibernateUtility hbu=null;
							Session session=null;
							
							hbu = HibernateUtility.getInstance();
							session = hbu.getHibernateSession();
							Transaction tx=session.beginTransaction();
							
							Query query3 = session.createSQLQuery("UPDATE fertilizer_billing SET quantity='"+qnt+"' WHERE bill_no = '"+pkfertilizerBillId+"' and barcode= '"+barcodeNo+"'");
							
						/*
						 * String hql =
						 * "UPDATE fertilizer_billing set quantity = :quantity WHERE bill_no = :bill_no and barcode = :barcode"
						 * ; Query query3 = session.createQuery(hql); query3.setParameter("quantity",
						 * qnt); query3.setParameter("bill_no", pkfertilizerBillId);
						 * query3.setParameter("barcode", barcodeNo);
						 */
							query3.executeUpdate();							
							tx.commit();							
						}
						
						//getting all bill no from sale return
						public List getAllBillByCustomerSaleReturn(String customerId) {
							
							 HibernateUtility hbu = null ;
					    	 Session session = null;
					    	 List list  = null;
					    	 try {
					    		 hbu = HibernateUtility.getInstance();
					    		 session = hbu.getHibernateSession();
					 			Query query = session.createSQLQuery("SELECT bill_no, customer_name FROM fertilizer_billing where pk_fertilizer_bill_id="+customerId+"");
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
						
						public List getAllCustomerType()
						{
							HibernateUtility hbu = null;
							Session session =  null;
							Query query = null;
							 List list = null;
						 try {
								 hbu = HibernateUtility.getInstance();
								 session = hbu.getHibernateSession();
								 query = session.createQuery("from FertilizerBillBean GROUP BY fkCreditCustomerId");
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
}
