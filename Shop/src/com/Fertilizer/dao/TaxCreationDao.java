package com.Fertilizer.dao;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.jfree.util.Log;

import com.Fertilizer.bean.GetTaxDetails;
import com.Fertilizer.hibernate.TaxCreationBean;
import com.Fertilizer.utility.HibernateUtility;

public class TaxCreationDao {

	public void valTaxCreation(TaxCreationBean tcb) {

				System.out.println("In DAO");
				
				HibernateUtility hbu=null;
				Session session=null;
				Transaction transaction=null;
				try{
				hbu = HibernateUtility.getInstance();
				session = hbu.getHibernateSession();
				 System.out.println("got session ");
				 transaction = session.beginTransaction();
			
				 System.out.println("Tx started");
				session.save(tcb);
				transaction.commit();
				System.out.println("Successful");
				}
				
				catch(RuntimeException e){
					try{
						transaction.rollback();
					}catch(RuntimeException rbe)
					{
						Log.error("Error in tax creation",rbe);
					}	
				}
				finally
				{
					if (session!=null) {
						hbu.closeSession(session);
					}
				}
			}
			
			
			public List getAllMainTax(HttpServletRequest request)
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
					 query = session.createQuery("from TaxCreationBean where fkshopid='"+shopid+"'");
					 list = query.list(); 
				} catch (RuntimeException e) {
					Log.error("Error in getAllMainTax", e);
				}
				 
				 finally
				 {
					 if (session!=null) {
						hbu.closeSession(session);
					}
				 }
						return list;
				
			}
	
			
			
			//Tax details for Tax list
			public List getTaxDetails(){
				
				HibernateUtility hbu=null;
				Session session=null;
				List<GetTaxDetails> taxList=null;
			try{	

				hbu = HibernateUtility.getInstance();
				session = hbu.getHibernateSession();

				Query query=session.createSQLQuery("SELECT tax_name, percentage, cgst, sgst from tax_details");
				//Query query = session.createQuery("from PurchaseBill2");
				List<Object[]> list = query.list();


				taxList= new ArrayList<GetTaxDetails>(0);


			for (Object[] o : list) {	
				GetTaxDetails p = new GetTaxDetails();
				p.setTaxType(o[0].toString());
				p.setTaxPercentage(Double.parseDouble(o[1].toString()));
				p.setCgst(Double.parseDouble(o[2].toString()));
				p.setSgst(Double.parseDouble(o[3].toString()));
				
				taxList.add(p);

			}}catch(RuntimeException e){	

			}
			finally{

			hbu.closeSession(session);	
			}
			return taxList;
			}

			// get All Tax Names
			public List<TaxCreationBean> getAllTax(HttpServletRequest request)
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
					 query = session.createQuery("from TaxCreationBean where fkshopid='"+shopid+"'");
					 list = query.list(); 
				} catch (RuntimeException e) {
					Log.error("Error in getAllTax", e);
				}
				 
				 finally
				 {
					 if (session!=null) {
						hbu.closeSession(session);
					}
				 }
						return list;
			}	
			
			public List<TaxCreationBean> getAllTaxList(HttpServletRequest request)
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
					 query = session.createQuery("from TaxCreationBean where fkshopid='"+shopid+"'");
					 list = query.list(); 
				}catch (RuntimeException e) {
					Log.error("Error in TaxCreationBean", e);
				}
				finally
				{
					 if (session!=null) {
						hbu.closeSession(session);
					}
				}
						return list;
			}
			
			//fetch data for tax detail edit
			public List getAllTaxDetailsForEdit(Long taxId, HttpServletRequest request) 
			{
				System.out.println("into dao tax : "+taxId);
				
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
					 query = session.createSQLQuery("select tax_name, sgst, cgst, percentage from tax_details where pk_tax_id='"+taxId+"' and fk_shop_id = '"+shopid+"'");
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
				 System.out.println("out of dao - return tax List : "+list);
						return list;
			}
			
}	
