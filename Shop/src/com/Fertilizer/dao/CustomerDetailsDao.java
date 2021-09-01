package com.Fertilizer.dao;

import java.math.BigInteger;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.jfree.util.Log;

import com.Fertilizer.bean.GetCreditCustomerDetails;
import com.Fertilizer.hibernate.CustomerDetailsBean;
import com.Fertilizer.hibernate.EmployeeDetailsBean;
import com.Fertilizer.hibernate.FertilizerBillBean;
import com.Fertilizer.hibernate.cashCustomerHibernate;
import com.Fertilizer.utility.HibernateUtility;

public class CustomerDetailsDao {

	public void valCustomerDetails(CustomerDetailsBean cdb){
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
	//hbu.closeSession(session);
	}
	
	//
	
	public void cashCustomerDetails(cashCustomerHibernate cdb){
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
	
	//getting all customer details in cashbook --> customer payment
	public List<CustomerDetailsBean> getAllCustomer(HttpServletRequest request)
	{
		HttpSession usersession = request.getSession(true);
		String userid = (String)usersession.getAttribute("userid");
		String shopid = (String)usersession.getAttribute("shopid");
		
		HibernateUtility hbu = null;
		Session session =  null;
		Query query = null;
		 List<CustomerDetailsBean> list = null;
		 try {
			 hbu = HibernateUtility.getInstance();
			 session = hbu.getHibernateSession();
			 
//			query = session.createQuery("from CustomerDetailsBean where fkshopid='"+shopid+"'");
			query = session.createQuery("from CustomerDetailsBean where fkshopid='"+shopid+"'");
			 
			 list = query.list(); 
			 
			 
			 System.out.println("SIZE---------------::::  :"+list.size());
			 
		} catch (Exception e) {
			Log.error("Error in getAllCustomer", e);
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
	
	public List<CustomerDetailsBean> getAllcashCustomer(HttpServletRequest request)
	{
		HttpSession usersession = request.getSession(true);
		String userid = (String)usersession.getAttribute("userid");
		String shopid = (String)usersession.getAttribute("shopid");
		
		HibernateUtility hbu = null;
		Session session =  null;
		Query query = null;
		 List<CustomerDetailsBean> list = null;
		 try {
			 hbu = HibernateUtility.getInstance();
			 session = hbu.getHibernateSession();
			 
//			query = session.createQuery("from CustomerDetailsBean where fkshopid='"+shopid+"'");
			query = session.createQuery("from cashCustomerHibernate where fkshopid='"+shopid+"'");
			 
			 list = query.list(); 
			 
			 
			 System.out.println("SIZE---------------::::  :"+list.size());
			 
		} catch (Exception e) {
			Log.error("Error in getAllCustomer", e);
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
	
	public List<FertilizerBillBean> getAllbills(HttpServletRequest request)
	{
		HttpSession usersession = request.getSession(true);
		String userid = (String)usersession.getAttribute("userid");
		String shopid = (String)usersession.getAttribute("shopid");
		
		HibernateUtility hbu = null;
		Session session =  null;
		Query query = null;
		 List<FertilizerBillBean> list = null;
		 try {
			 hbu = HibernateUtility.getInstance();
			 session = hbu.getHibernateSession();
			 
//			query = session.createQuery("from CustomerDetailsBean where fkshopid='"+shopid+"'");
			query = session.createQuery("from FertilizerBillBean where fk_shop_id ='"+shopid+"' GROUP BY billNo");
			 
			 list = query.list(); 
			 
			 
			 System.out.println("SIZE---------------::::  :"+list.size());
			 
		} catch (Exception e) {
			Log.error("Error in getAllCustomer", e);
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
	public List<FertilizerBillBean> getAllchallan(HttpServletRequest request)
	{
		HttpSession usersession = request.getSession(true);
		String userid = (String)usersession.getAttribute("userid");
		String shopid = (String)usersession.getAttribute("shopid");
		
		HibernateUtility hbu = null;
		Session session =  null;
		Query query = null;
		 List<FertilizerBillBean> list = null;
		 try {
			 hbu = HibernateUtility.getInstance();
			 session = hbu.getHibernateSession();
			 
			query = session.createQuery("from challanBeanH where fk_shop_id ='"+shopid+"' GROUP BY billNo");
			 
			 list = query.list(); 
			 
			 
			 System.out.println("SIZE---------------::::  :"+list.size());
			 
		} catch (Exception e) {
			Log.error("Error in getAllCustomer", e);
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
	public List<FertilizerBillBean> getAllbilltoday(HttpServletRequest request)
	{
		HttpSession usersession = request.getSession(true);
		String userid = (String)usersession.getAttribute("userid");
		String shopid = (String)usersession.getAttribute("shopid");
		

		
	  	String pattern = "yyyy-MM-dd";
	  	SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
	  	String todayDate = simpleDateFormat.format(new Date());
	  	System.out.println(todayDate);
	  	
		System.out.println("` ` ` ` ````   date todayDate -   "+todayDate);
		HibernateUtility hbu = null;
		Session session =  null;
		Query query = null;
		 List<FertilizerBillBean> list = null;
		 try {
			 hbu = HibernateUtility.getInstance();
			 session = hbu.getHibernateSession();
			 
//			query = session.createQuery("from CustomerDetailsBean where fkshopid='"+shopid+"'");
			query = session.createQuery("from FertilizerBillBean where fk_shop_id ='"+shopid+"' AND insertDate = '"+todayDate+"' GROUP BY billNo");
			 
			 list = query.list(); 
			 
			 
			 System.out.println("SIZE---------------::::  :"+list.size());
			 
		} catch (Exception e) {
			Log.error("Error in getAllCustomer", e);
		}
		 
		 finally
		 {
			 if (session!=null) {
				hbu.closeSession(session);
			}
		 }
			
				return list;
		
	}
	
	public List getAllCustomerBill()
	{
		HibernateUtility hbu = null;
		Session session =  null;
		Query query = null;
		 List list = null;
	 try {
			 hbu = HibernateUtility.getInstance();
			 session = hbu.getHibernateSession();
			 query = session.createQuery("from FertilizerBillBean");
			 list = query.list(); 
		} catch (RuntimeException e) {
			Log.error("Error in getAllCustomerBill", e);
		}
		 
		 finally
		 {
			 if (session!=null) {
				hbu.closeSession(session);
			}
		 }
				return list;
		
	}
	
public List getVillageByCustomerName(String creditCustomerId, HttpServletRequest request)
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
		 Query query = session.createSQLQuery("select c.address , c.first_name, c.contact_no, c.aadhar_no, gst_number,email_id from customer_details c where c.pk_customer_id ='"+creditCustomerId+"' and fk_shop_id ='"+shopid+"'");
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


public List getVillageByCustomerName1(String creditCustomerId, HttpServletRequest request)
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
		 Query query = session.createSQLQuery("select c.address , c.first_name, c.contact_no, c.aadhar_no, gst_number,email_id from cash_customer_details c where c.pk_customer_id ='"+creditCustomerId+"' and fk_shop_id ='"+shopid+"'");
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
public void deletCustomer(String customerId) {
	
	HibernateUtility hbu = null ;
	 Session session = null;
	 List list  = null;
	 try {
		 hbu = HibernateUtility.getInstance();
		 session = hbu.getHibernateSession();
			Query query = session.createSQLQuery("delete from customer_details where pk_customer_id="+customerId);
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



public List getAllBillByCreditCustomer(String fkCustomerId, String catId) {

	
	 HibernateUtility hbu = null ;
	 Session session = null;
	 List list  = null;
	 try {
		 hbu = HibernateUtility.getInstance();
		 session = hbu.getHibernateSession();
		//Query query = session.createSQLQuery("select f.bill_no, f.insert_date from fertilizer_billing f where f.fk_customer_id='"+fkCustomerId+"' AND f.cat_id ='"+catId+"' UNION select s.bill_no, s.insert_date from seed_pesticide_billing s where s.fk_customer_id='"+fkCustomerId+"' AND s.cat_id ='"+catId+"' UNION select p.bill_no, p.insert_date from pesticide_billing p where p.fk_customer_id='"+fkCustomerId+"' AND p.cat_id ="+catId);
		 //Query query = session.createSQLQuery("select f.bill_no, f.insert_date from fertilizer_billing f where f.fk_customer_id='"+fkCustomerId+"' UNION  select s.bill_no, s.insert_date from seed_pesticide_billing s where s.fk_customer_id='"+fkCustomerId+"' UNION select p.bill_no, p.insert_date from pesticide_billing p where p.fk_customer_id='"+fkCustomerId+"'"); 
		
		 Query query = session.createSQLQuery("select f.bill_no, f.bill_payment_pending, f.insert_date from fertilizer_billing f where f.fk_customer_id='"+fkCustomerId+"' and bill_payment_pending > 0 group by bill_no");
		 	 
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


public List getAllBillByCreditCustomerForReports(String fkCustomerId, String catId) {

	
	 HibernateUtility hbu = null ;
	 Session session = null;
	 List list  = null;
	 try {
		 hbu = HibernateUtility.getInstance();
		 session = hbu.getHibernateSession();
		//Query query = session.createSQLQuery("select f.bill_no, f.insert_date from fertilizer_billing f where f.fk_customer_id='"+fkCustomerId+"' AND f.cat_id ='"+catId+"' UNION select s.bill_no, s.insert_date from seed_pesticide_billing s where s.fk_customer_id='"+fkCustomerId+"' AND s.cat_id ='"+catId+"' UNION select p.bill_no, p.insert_date from pesticide_billing p where p.fk_customer_id='"+fkCustomerId+"' AND p.cat_id ="+catId);
		 //Query query = session.createSQLQuery("select f.bill_no, f.insert_date from fertilizer_billing f where f.fk_customer_id='"+fkCustomerId+"' UNION  select s.bill_no, s.insert_date from seed_pesticide_billing s where s.fk_customer_id='"+fkCustomerId+"' UNION select p.bill_no, p.insert_date from pesticide_billing p where p.fk_customer_id='"+fkCustomerId+"'"); 
		
		 Query query = session.createSQLQuery("select f.bill_no, f.bill_payment_pending, f.insert_date from fertilizer_billing f where f.fk_customer_id='"+fkCustomerId+"' group by bill_no");
		 	 
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




public List getTotalAmountByBill(String billNo, String catId, String creditCustomer)
{
	 HibernateUtility hbu = null ;
	 Session session = null;
	 List list  = null;
	 
	 try 
	 {
		 hbu = HibernateUtility.getInstance();
		 session = hbu.getHibernateSession();
		// Query query = session.createSQLQuery("select f.gross_total, f.insert_date, f.total_after_sale_return from fertilizer_billing f where f.bill_no='"+billNo+"'AND f.fk_customer_id='"+creditCustomer+"' AND f.cat_id='"+catId+"' UNION select s.gross_total, s.insert_date, s.total_after_sale_return from seed_pesticide_billing s where s.bill_no='"+billNo+"'AND s.fk_customer_id='"+creditCustomer+"' AND s.cat_id='"+catId+"' UNION select p.gross_total, p.insert_date, p.total_after_sale_return from pesticide_billing p where p.bill_no='"+billNo+"'AND p.fk_customer_id='"+creditCustomer+"' AND p.cat_id="+catId);
		 
		 /*Query query = session.createSQLQuery("select f.gross_total, f.total_after_sale_return, f.insert_date from fertilizer_billing f where f.bill_no='"+billNo+"'AND f.fk_customer_id='"+creditCustomer+"' AND f.cat_id='"+catId+"' UNION select s.gross_total, s.insert_date from seed_pesticide_billing s where s.bill_no='"+billNo+"'AND s.fk_customer_id='"+creditCustomer+"' AND s.cat_id='"+catId+"' UNION select p.gross_total, p.insert_date from pesticide_billing p where p.bill_no='"+billNo+"'AND p.fk_customer_id='"+creditCustomer+"' AND p.cat_id="+catId);*/
		 /*Query query = session.createSQLQuery("select f.gross_total, f.total_after_sale_return, f.insert_date from fertilizer_billing f where f.bill_no='"+billNo+"'AND f.fk_customer_id='"+creditCustomer+"' AND f.cat_id='"+catId+"'");
		 */
		 
		 /*Query query = session.createSQLQuery("SELECT ccp.total_amount, ccp.balance, ccp.bill_no, fb.return_quantity, fb.return_amount from credit_customer_payment ccp JOIN fertilizer_billing fb on ccp.bill_no = '"+billNo+"' WHERE fb.bill_no = 113 AND fb.cat_id='"+catId+"' AND fb.fk_customer_id=+'"+creditCustomer+"'");
		 */
		 /*
		 Query query = session.createSQLQuery("select f.gross_total, f.insert_date, f.total_after_sale_return from fertilizer_billing f where f.bill_no='"+billNo+"' AND f.fk_customer_id='"+creditCustomer+"' AND f.cat_id='"+catId+"'");
		 */
		 Query query = session.createSQLQuery("select f.gross_total, f.insert_date, f.total_after_sale_return from fertilizer_billing f where f.bill_no='"+billNo+"' AND f.fk_customer_id='"+creditCustomer+"' UNION select s.gross_total, s.insert_date, s.total_after_sale_return from seed_pesticide_billing s where s.bill_no='"+billNo+"' AND s.fk_customer_id='"+creditCustomer+"' UNION select p.gross_total, p.insert_date, p.total_after_sale_return from pesticide_billing p where p.bill_no='"+billNo+"' AND p.fk_customer_id='"+creditCustomer+"'");
		 
		 
		System.out.println("In dao get total");
		list = query.list();
		System.out.println("List size in DAO of total = == ="+list.size());	
				
		
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

/*
public List getTotalAmountByBillForFirstTime(String billNo, String catId, String creditCustomer)
{
	HibernateUtility hbu = null ;
	Session session = null;
	List list  = null;
	
	try 
	 {
		 hbu = HibernateUtility.getInstance();
		 session = hbu.getHibernateSession();
	
		 Query query2 = session.createSQLQuery("select gross_total, bill_payment_pending from fertilizer_billing where bill_no = "+billNo);
		 System.out.println("In dao get total getting grosstotal and bill payment pending for cashbook customer payment");
		 list = query2.list();
		 System.out.println("List size in DAO of total = == ="+list.size());

	 }
	catch (Exception e) {
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

*/
public List getRemainingBalanceAmountByBill(String billNo, String creditCustomer, String catId) {
	
	 HibernateUtility hbu = null ;
	 Session session = null;
	 List list  = null;
	 try
	 {
		 hbu = HibernateUtility.getInstance();
		 session = hbu.getHibernateSession();
		// Query query = session.createSQLQuery("SELECT balance ,bill_no from credit_customer_payment WHERE bill_no ='"+billNo+"' AND cat_id='"+catId+"' AND fk_customer_id='"+creditCustomer+"' ORDER BY  pk_credit_customer_id  DESC LIMIT 1 ;");
		 /*Query query = session.createSQLQuery("SELECT ccp.balance ,ccp.bill_no, fb.return_quantity, fb.return_amount from credit_customer_payment ccp JOIN fertilizer_billing fb on ccp.bill_no = fb.bill_no  WHERE fb.bill_no = '"+billNo+"' AND fb.cat_id ='"+catId+"'AND fb.fk_customer_id = "+"'creditCustomer'");
		 */
		/*
		 Query query = session.createSQLQuery("SELECT ccp.balance, ccp.total_amount, ccp.bill_no, fb.return_amount, fb.return_quantity, fb.gross_total, fb.bill_payment_pending from credit_customer_payment ccp JOIN fertilizer_billing fb on ccp.bill_no = '"+billNo+"' WHERE fb.bill_no = '"+billNo+"' AND fb.cat_id='"+catId+"' AND fb.fk_customer_id=+'"+creditCustomer+"' ORDER BY  pk_credit_customer_id  DESC LIMIT 1");
		 */
		 Query query = session.createSQLQuery("SELECT balance ,bill_no from credit_customer_payment WHERE bill_no ='"+billNo+"' AND fk_customer_id='"+creditCustomer+"' ORDER BY  pk_credit_customer_id  DESC LIMIT 1 ;");	 
		 
		 
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


/*public List getRemainingBalanceAmountByBillForFirstTime(String billNo, String creditCustomer, String catId) 

{
	 HibernateUtility hbu = null ;
	 Session session = null;
	 List list2  = null;
	 
	 try
	 {
		 hbu = HibernateUtility.getInstance();
		 session = hbu.getHibernateSession();
		 /*Query query = session.createSQLQuery("SELECT balance ,bill_no from credit_customer_payment WHERE bill_no ='"+billNo+"' AND cat_id='"+catId+"' AND fk_customer_id='"+creditCustomer+"' ORDER BY  pk_credit_customer_id  DESC LIMIT 1 ;");*/
		 /*Query query = session.createSQLQuery("SELECT ccp.balance ,ccp.bill_no, fb.return_quantity, fb.return_amount from credit_customer_payment ccp JOIN fertilizer_billing fb on ccp.bill_no = fb.bill_no  WHERE fb.bill_no = '"+billNo+"' AND fb.cat_id ='"+catId+"'AND fb.fk_customer_id = "+"'creditCustomer'");
		 */
/*
		Query query = session.createSQLQuery("select bill_payment_pending, return_quantity from fertilizer_billing where bill_no = "+billNo);
		list2 = query.list();
		
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
		return list2;
	 
	 
}
*/

public Double getTotalAmt(String billNo) {
	
	HibernateUtility hbu = null ;
	 Session session = null;
	 List<Object[]> list  = null;
	 Double totalAmount = null;
	 List<GetCreditCustomerDetails> itemlist = null;
	 try {
		 hbu = HibernateUtility.getInstance();
		 session = hbu.getHibernateSession();
			Query query = session.createSQLQuery("select f.gross_total, f.insert_date from fertilizer_billing f where f.bill_no="+billNo);
			
			//Query query = session.createSQLQuery("SELECT balance, insert_date from credit_customer_payment where bill_no = '"+billNo);
		 
		 
		 list = query.list();
			 itemlist = new ArrayList<GetCreditCustomerDetails>(0);
			 
			 for (Object[] objects : list)
			 {
				 
				GetCreditCustomerDetails bean = new GetCreditCustomerDetails();
				 
				String newBal = (objects[0].toString());
				totalAmount = Double.valueOf(newBal);
				
				
				System.out.println("ln no 259 Customer details DAO  Reaining Balance === > "+totalAmount);
			
				itemlist.add(bean);
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
		return totalAmount;
	
}


// get Customer Details For edit
public List getCreditCustomerForEdit(Long customerId, HttpServletRequest request) 
{
	HttpSession usersession = request.getSession(true);
	String userid = (String)usersession.getAttribute("userid");
	String shopid = (String)usersession.getAttribute("shopid");

	System.out.println("into dao Credit Customer : "+customerId);
	HibernateUtility hbu = null;
	Session session =  null;
	Query query = null;
	List list = null;
	 try {
		 hbu = HibernateUtility.getInstance();
		 session = hbu.getHibernateSession();
		 query = session.createSQLQuery("SELECT c.first_name, c.middle_name, c.last_name, c.email_id, c.address, c.contact_no, c.pin_code, c.gst_number FROM customer_details c where c.pk_customer_id='"+customerId+"' AND c.fk_shop_id='"+shopid+"'");
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
	 System.out.println("out of dao - return credit customer List : "+list);
			return list;

}

	
		public List getAllCustomerDetails()
		{
			
			HibernateUtility hbu=null;
			Session session=null;
			List custList=null;
			
			try{	
				
				hbu = HibernateUtility.getInstance();
				session = hbu.getHibernateSession();
			
				Query query=session.createQuery("From CustomerDetailsBean");
				custList = query.list();
		
				}catch(RuntimeException e){	
			
				}
				finally{
			
				hbu.closeSession(session);	
				}
			
			return custList;
			}
			
		





public List getCreditCustomerList(){
	
	HibernateUtility hbu=null;
	Session session=null;
	List<GetCreditCustomerDetails> custList=null;
try{	

	hbu = HibernateUtility.getInstance();
	session = hbu.getHibernateSession();

	Query query=session.createSQLQuery("SELECT first_name, middle_name, last_name, email_id, address, contact_no, pin_code, aadhar_no, gst_number,pk_customer_id,firmname FROM customer_details");
	//Query query = session.createQuery("from PurchaseBill2");
	List<Object[]> list = query.list();

	System.out.println("list sizxe - "+query.list().size());
	custList= new ArrayList<GetCreditCustomerDetails>(0);


for (Object[] object : list) {	
	GetCreditCustomerDetails reports = new GetCreditCustomerDetails();
	System.out.println("result - "+Arrays.toString(object));	
	reports.setFirstName(object[0].toString());
	reports.setMiddleName(object[1].toString());
	reports.setLastName(object[2].toString());
	reports.setAddress(object[4].toString());
	reports.setEmail(object[3].toString());
	reports.setContactNo((BigInteger)object[5]);
	reports.setZipCode((BigInteger)object[6]);
	reports.setAadhar((BigInteger)object[7]);	
	String gstCheck = object[8].toString();
	if(gstCheck.isEmpty() || gstCheck == null || gstCheck == "")
	{
		reports.setGstno("N/A");
	}
	else
	{
		reports.setGstno(object[8].toString());
	}
	
	reports.setPksuppid(Long.parseLong(object[9].toString()));
	System.out.println("CUSTMOR GST NO =====> "+reports.getGstno());
	reports.setFirmname(object[10].toString());
	custList.add(reports);

}}catch(RuntimeException e){	

}
finally{

hbu.closeSession(session);	
}
return custList;
}

//

public List getCashCustomerList(){
	
	HibernateUtility hbu=null;
	Session session=null;
	List<cashCustomerHibernate> custList=null;
try{	

	hbu = HibernateUtility.getInstance();
	session = hbu.getHibernateSession();

	Query query=session.createSQLQuery("SELECT first_name, middle_name, last_name, email_id, address, contact_no, pin_code, gst_number,pk_customer_id,firmname FROM cash_customer_details");
	//Query query = session.createQuery("from PurchaseBill2");
	List<Object[]> list = query.list();


	custList= new ArrayList<cashCustomerHibernate>(0);


for (Object[] object : list) {	
	cashCustomerHibernate reports = new cashCustomerHibernate();
	
	reports.setFirstName(object[0].toString());
	reports.setMiddleName(object[1].toString());
	reports.setLastName(object[2].toString());
	reports.setAddress(object[4].toString());
	reports.setEmailId(object[3].toString());
	reports.setContactNo(Long.parseLong(object[5].toString()));
	reports.setZipCode(Long.parseLong(object[6].toString()));

		reports.setGstno(object[7].toString());
//	}
	
//	reports.set(Long.parseLong(object[9].toString()));
	System.out.println("CUSTMOR GST NO =====> "+reports.getGstno());
	reports.setFirmname(object[9].toString());
	custList.add(reports);

}}catch(RuntimeException e){	

}
finally{

hbu.closeSession(session);	
}
return custList;
}



}
