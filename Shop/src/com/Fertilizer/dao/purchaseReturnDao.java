package com.Fertilizer.dao;

import org.hibernate.Session;
import org.hibernate.Transaction;
import org.jfree.util.Log;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.Query;

import com.Fertilizer.hibernate.CreditNoteConversionBean;
import com.Fertilizer.hibernate.UserDetailsBean;
import com.Fertilizer.hibernate.purchaseReturnBean;
import com.Fertilizer.utility.HibernateUtility;

public class purchaseReturnDao {

	public void insertPurchaseReturn(purchaseReturnBean bean)
	{
		System.out.println("In DAO");

		HibernateUtility hbu=null;
		Session session = null;
		Transaction transaction = null;
		try{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			System.out.println("got session");
		
			transaction = session.beginTransaction();
			System.out.println("got session1111111111 ");

			System.out.println("Tx started");
			session.save(bean);
			System.out.println("Beannnnnnnn");
			transaction.commit();
			System.out.println("Successful");
			System.out.println("Successfullyyyyyyyy");	
		}
		catch(RuntimeException e){
			try{
				e.printStackTrace();
				transaction.rollback();
			}catch(RuntimeException rbe)
			{
				Log.error("Couldn't roll back tranaction",rbe);
			}	
		}finally{
			hbu.closeSession(session);
		}
	}

	
	//get purchase return total from purchase return table
			public List getPurchaseReturnTotal(String fk_suppier_id,String bill_no1, HttpServletRequest request) 
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
					
					Query query = session.createSQLQuery("SELECT SUM(total), supplier_name from purchase_return WHERE fk_supplier_id= '"+fk_suppier_id+"' AND bill_no= '"+bill_no1+"' AND fk_shop_id = '"+shopid+"' LIMIT 1");
					list = query.list();

				} catch (Exception e) {
					e.printStackTrace();
				}

				finally
				{
					if (session!=null) {
						hbu.closeSession(session);
					}
				}
				return list;
			}
			
			
			//add data into database credit note conversion
			public void insertCreditNoteConversion(CreditNoteConversionBean bean)
			{
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

			
			
//get latest Purchase Return ID number in Purchase Return Table
public List getPurchaseReturnId(HttpServletRequest request) 
{
	HttpSession usersession = request.getSession(true);
	String userid = (String)usersession.getAttribute("userid");
	String shopid = (String)usersession.getAttribute("shopid");
	
	HibernateUtility hbu=null;
	Session session=null;
	List<purchaseReturnBean> Txidlist=null;
	try
	{
		hbu = HibernateUtility.getInstance();
		session = hbu.getHibernateSession();
		Query query = session.createSQLQuery("SELECT purchase_return_No, supplier_name FROM purchase_return WHERE fk_shop_id ='"+shopid+"' ORDER BY purchase_return_No DESC LIMIT 1");

		List<Object[]> list = query.list();
		Txidlist= new ArrayList<purchaseReturnBean>(0);
		for (Object[] object : list) 
		{			
			purchaseReturnBean bean=new purchaseReturnBean();
			bean.setPurchaseReturnNo(Long.parseLong(object[0].toString()));
			bean.setSupplier(object[1].toString());
			
			Txidlist.add(bean);	 
		}
	}
	catch(RuntimeException e)
	{
		Log.error("Error in getPurchaseReturnId()", e);	
	}finally
	{if(session!=null){
		hbu.closeSession(session);	
	}
	}
	return Txidlist;	
}
			
			
}

