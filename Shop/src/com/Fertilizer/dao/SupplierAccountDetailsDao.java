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

import com.Fertilizer.bean.GetSupplierDetails;
import com.Fertilizer.hibernate.CashBankBookDataDateWise;
import com.Fertilizer.hibernate.SupplierAccountDetailsBean;
import com.Fertilizer.hibernate.SupplierDetailsBean;
import com.Fertilizer.utility.HibernateUtility;

public class SupplierAccountDetailsDao {

			public void supplierAccount(SupplierAccountDetailsBean sadb) {
		
				System.out.println("In DAO");
				
				HibernateUtility hbu=null;
				Session session = null;
				Transaction transaction = null;
				
				try{
				 hbu = HibernateUtility.getInstance();
				session = hbu.getHibernateSession();
				 transaction = session.beginTransaction();
			
				 System.out.println("Tx started");
				 
				 Long fkSupplierId = sadb.getFk_supplier_id();
				 SupplierDetailsBean detail = (SupplierDetailsBean) session.load(SupplierDetailsBean.class, fkSupplierId);
					System.out.println(detail);
					sadb.setSupplierDetailsBean(detail);
				session.save(sadb);
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

			
			//getting all bill no from goodsreceives table in cashbook ---> credit customer payment
			public List getAllBillBySuppliers(String supplierId, HttpServletRequest request) 
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
		 			Query query = session.createSQLQuery("select s.bill_number,s.insertDate, s.bill_payment_pending from goods_receive s where s.fk_supplier_id='"+supplierId+"' and s.fk_shop_id = '"+shopid+"' and bill_payment_pending > 0  AND dupQuantity > 0");
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
			
			//credit note conversion
			public List getAllBillBySuppliersforCreditConver(String supplierId, HttpServletRequest request) 
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
		    	   //Query query = session.createSQLQuery("select s.bill_number,s.insertDate, s.bill_payment_pending from goods_receive s where s.fk_supplier_id="+supplierId+" and bill_payment_pending > 0  AND dupQuantity > 0");
		 			 Query query = session.createSQLQuery("select bill_no, purchase_date from purchase_return  where fk_supplier_id = "+supplierId+" AND fk_shop_id ='"+shopid+"' AND return_quantity > 0 AND return_status = 'False'");
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



			//getting all bill no from goodsreceives table in cashbook ---> credit customer payment
			public List getAllBillBySuppliersForReportsDao(String supplierId) {
				
				 HibernateUtility hbu = null ;
		    	 Session session = null;
		    	 List list  = null;
		    	 try {
		    		 hbu = HibernateUtility.getInstance();
		    		 session = hbu.getHibernateSession();
		 			Query query = session.createSQLQuery("select s.bill_number,s.insertDate, s.bill_payment_pending from goods_receive s where s.fk_supplier_id="+supplierId+" GROUP BY bill_number");
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
			
			
			

			public List getTotalAmtByBillNoForCustomer(String billNo, String supplierId) {
				
				HibernateUtility hbu = null ;
		    	 Session session = null;
		    	 List list  = null;
		    	 try {
		    		 hbu = HibernateUtility.getInstance();
		    		 session = hbu.getHibernateSession();
		 			//Query query = session.createSQLQuery("select SUM(s.gross_total),s.total_amount from goods_receive s where s.bill_number=:billNo And s.fk_supplier_id=:supplierId");
		    		 //Query query = session.createSQLQuery("select (SUM(s.Per_Product_Total+s.Tax_Amount) - s.discount_amount),s.total_amount from goods_receive s where s.bill_number=:billNo And s.fk_supplier_id=:supplierId");
		    		 Query query = session.createSQLQuery("select gross_total,s.total_amount from goods_receive s where s.bill_number=:billNo And s.fk_supplier_id=:supplierId GROUP BY bill_number");
		    		 query.setParameter("billNo",billNo);
		 			query.setParameter("supplierId",supplierId);
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



			public List getbalanceAmtByBillNo(String billNo,String supplier) {
				HibernateUtility hbu = null ;
		    	 Session session = null;
		    	 List list  = null;
		    	 try {
		    		 hbu = HibernateUtility.getInstance();
		    		 session = hbu.getHibernateSession();
		    		 Query query = session.createSQLQuery("SELECT balance , total_amount from supplier_payment WHERE bill_no =:billNo AND fk_supplier_id =:supplier ORDER BY pk_supplier_payment_id DESC LIMIT 1");
		 			query.setParameter("billNo",billNo);
		 			query.setParameter("supplier",supplier);
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
		
	public Double getTotalAmt(String billNo, String supplier) {
				
				HibernateUtility hbu = null ;
		    	 Session session = null;
		    	 List<Object[]> list  = null;
		    	 Double totalAmt = null;
		    	 List<GetSupplierDetails> itemlist = null;
		    	 try {
		    		 hbu = HibernateUtility.getInstance();
		    		 session = hbu.getHibernateSession();
		 			//Query query = session.createSQLQuery("select SUM(s.gross_total),s.total_amount from goods_receive s where s.bill_number=:billNo And s.fk_supplier_id=:supplier");
			 		//Query query = session.createSQLQuery("select (SUM(s.Per_Product_Total + s.Tax_Amount) - s.discount_amount),s.total_amount from goods_receive s where s.bill_number=:billNo And s.fk_supplier_id=:supplier"); 
		    		 Query query = session.createSQLQuery("select gross_total,s.total_amount from goods_receive s where s.bill_number=:billNo And s.fk_supplier_id=:supplier GROUP BY bill_number");
		    		 query.setParameter("billNo",billNo);
		 			 query.setParameter("supplier",supplier);
		 			 list = query.list();
		 			 itemlist = new ArrayList<GetSupplierDetails>(0);
		 			 
		 			 for (Object[] objects : list) {
		 				 
		 				GetSupplierDetails bean = new GetSupplierDetails();
		 				 
		 				String newBal = (objects[0].toString());
		 				totalAmt = Double.valueOf(newBal);
						
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
					return totalAmt;
		    	
			}



	public List getYesterdarTotalAmount() {
		// TODO Auto-generated method stub
		 HibernateUtility hbu = null ;
    	 Session session = null;
    	 List list  = null;
    	 try {
    		 hbu = HibernateUtility.getInstance();
    		 session = hbu.getHibernateSession();
 			Query query = session.createSQLQuery("SELECT onDate , totalAmount FROM cashbankbooktable ORDER BY pkLastCashId DESC LIMIT 1");
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



	public List getYesterdaySuppCredit(String yesterday) {
		// TODO Auto-generated method stub
		return null;
	}



	public void registeryesterdayTotal(CashBankBookDataDateWise cs) {
		// TODO Auto-generated method stub
		
		HibernateUtility hbu=null;
		Session session = null;
		Transaction transaction = null;
		
		try{
		 hbu = HibernateUtility.getInstance();
		session = hbu.getHibernateSession();
		 transaction = session.beginTransaction();
	
		 System.out.println("Tx started");
		 
		
		session.save(cs);
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



	public List getDiffBetDates() {
		// TODO Auto-generated method stub
		
		SimpleDateFormat dateFormat1 = new SimpleDateFormat("yyyyMMdd");
		Date dateobj = new Date();
		String todayDate = dateFormat1.format(dateobj);
		
		 HibernateUtility hbu = null ;
    	 Session session = null;
    	 List list  = null;
    	 try {
    		 hbu = HibernateUtility.getInstance();
    		 session = hbu.getHibernateSession();
 			Query query = session.createQuery("SELECT date , totalAmount FROM CashBankBookDataDateWise ORDER BY date DESC LIMIT 1");
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



	public List getTodaySaleTotalAmount() {
		// TODO Auto-generated method stub
		 HibernateUtility hbu = null ;
    	 Session session = null;
    	 List list  = null;
    	 
    	   SimpleDateFormat dateFormat1 = new SimpleDateFormat("yyyy-MM-dd");
			Date date1 = new Date();
			String date = (dateFormat1.format(date1));
    	 
    	 try {
    		 hbu = HibernateUtility.getInstance();
    		 session = hbu.getHibernateSession();
    		/*Query query = session.createSQLQuery("select DISTINCT COUNT(DISTINCT bill_no), sum(DISTINCT  gross_total) from fertilizer_billing where insert_date=:date");*/
    		 Query query = session.createSQLQuery("select DISTINCT COUNT(DISTINCT bill_no), sum(DISTINCT  gross_total) from fertilizer_billing where insert_date=:date");
    		 query.setParameter("date",date);
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



	public List getTodaySaleTotalAmount1() {
		// TODO Auto-generated method stub
		HibernateUtility hbu = null ;
   	 Session session = null;
   	 List list  = null;
   	 
   	   SimpleDateFormat dateFormat1 = new SimpleDateFormat("yyyy-MM-dd");
			Date date1 = new Date();
			String date = (dateFormat1.format(date1));
   	 
   	 try {
   		 hbu = HibernateUtility.getInstance();
   		 session = hbu.getHibernateSession();
   		Query query = session.createSQLQuery("select DISTINCT COUNT(DISTINCT bill_no), sum(DISTINCT  gross_total) from seed_pesticide_billing where insert_date=:date");
   		query.setParameter("date",date);
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

}
