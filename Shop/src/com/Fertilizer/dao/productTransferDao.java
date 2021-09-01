package com.Fertilizer.dao;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.Fertilizer.utility.HibernateUtility;

public class productTransferDao {

	
	
	public List getAllStock1(String fkshopIdTx)
	{
		System.out.println("fkshopIdTx - "+fkshopIdTx);
		HibernateUtility hbu=null;
		Session session=null;
		List list=null;
		try{
		 hbu = HibernateUtility.getInstance();
		 session = hbu.getHibernateSession();
		 Query query = session.createQuery("from Stock where fk_shop_id ='"+fkshopIdTx+"'");
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
	
	//bill cncel
	
	public List getAllbilling(String shopid,String billno)
	{
		System.out.println("fkshopIdTx - "+shopid+" , "+billno);
		HibernateUtility hbu=null;
		Session session=null;
		List list=null;
		try{
		 hbu = HibernateUtility.getInstance();
		 session = hbu.getHibernateSession();
		 Query query = session.createQuery("from FertilizerBillBean where fk_shop_id ='"+shopid+"' AND billNo = '"+billno+"'");
		 list = query.list();
		 System.out.println("fertilier query list size -  "+query.list().size());
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
	
	public List getAllbilling1(String shopid,String billno)
	{
		System.out.println("fkshopIdTx - "+shopid+" , "+billno);
		HibernateUtility hbu=null;
		Session session=null;
		List list=null;
		try{
		 hbu = HibernateUtility.getInstance();
		 session = hbu.getHibernateSession();
		 Query query = session.createQuery("from FertilizerBillBean where fk_shop_id ='"+shopid+"' AND billNo = '"+billno+"' GROUP BY billNo");
		 list = query.list();
		 System.out.println("fertilier query list size -  "+query.list().size());
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
	//
	public List getAllStock10(String fkshopIdTx)
	{
		System.out.println("fkshopIdTx - "+fkshopIdTx);
		HibernateUtility hbu=null;
		Session session=null;
		List list=null;
		try{
		 hbu = HibernateUtility.getInstance();
		 session = hbu.getHibernateSession();
		 Query query = session.createQuery("from Stock where fk_shop_id ='"+fkshopIdTx+"'");
		 
		 list = query.list();
		System.out.println("stock query list - "+query.list().size());
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
	
	//
	
	public List getAllStock10(String fkshopIdTx, String type)
	{
		System.out.println("fkshopIdTx - "+fkshopIdTx);
		HibernateUtility hbu=null;
		Session session=null;
		List list=null;
		try{
		 hbu = HibernateUtility.getInstance();
		 session = hbu.getHibernateSession();
		 Query query = session.createQuery("from Stock where fk_shop_id ='"+fkshopIdTx+"' AND pack_type = '"+type+"'");
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
	
	//
	public List getAllStock2(String fk_shop_id)
	{
		System.out.println("fk_shop_id   - "+fk_shop_id);
		HibernateUtility hbu=null;
		Session session=null;
		List list=null;
		try{
		 hbu = HibernateUtility.getInstance();
		 session = hbu.getHibernateSession();
		 Query query = session.createQuery("from Stock where fk_shop_id ='"+fk_shop_id+"'");
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
	
	//
	public List getAllStocks(String fk_shop_id)
	{
		System.out.println("fk_shop_id   - "+fk_shop_id);
		String tt = "unpacked";
		HibernateUtility hbu=null;
		Session session=null;
		List list=null;
		try{
		 hbu = HibernateUtility.getInstance();
		 session = hbu.getHibernateSession();
		 Query query = session.createQuery("from Stock where fk_shop_id ='"+fk_shop_id+"'");
		 System.out.println("stk minus - sze  "+query.list().size());
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
	
	
	
	public void registerStock(com.Fertilizer.hibernate.Stock newEntry) {
		
		HibernateUtility hbu=null;
		Session session=null;
		Transaction transaction=null;
		
		try{
		 hbu = HibernateUtility.getInstance();
		 session = hbu.getHibernateSession();
		 transaction = session.beginTransaction();
		 
		 DateFormat df = new SimpleDateFormat("dd/MM/yyyy");
		 Date date = new Date();
		
		 newEntry.setUpdateDate(date);
		
		session.save(newEntry);
		transaction.commit();
		}
		
		catch(RuntimeException e){
			try{
				transaction.rollback();
			}catch(Exception rbe)
			{
				rbe.printStackTrace();
			}	
		}finally{
		hbu.closeSession(session);
		}
		
	}
	//
	
	public void registerpack(com.Fertilizer.hibernate.PackingHibernate newEntry) {
		
		HibernateUtility hbu=null;
		Session session=null;
		Transaction transaction=null;
		
		try{
		 hbu = HibernateUtility.getInstance();
		 session = hbu.getHibernateSession();
		 transaction = session.beginTransaction();
		 
		 DateFormat df = new SimpleDateFormat("dd/MM/yyyy");
		 Date date = new Date();
		
	//	 newEntry.setUpdateDate(date);
		
		session.save(newEntry);
		transaction.commit();
		System.out.println("ob j saved```````````` ````````` ``````````` ");
		}
		
		catch(RuntimeException e){
			try{
				transaction.rollback();
			}catch(Exception rbe)
			{
				rbe.printStackTrace();
			}	
		}finally{
		hbu.closeSession(session);
		}
		
	}
	
	public void registerproduct(com.Fertilizer.hibernate.productTransferHibernate bean) {
		
		HibernateUtility hbu=null;
		Session session=null;
		Transaction transaction=null;
		
		try{
		 hbu = HibernateUtility.getInstance();
		 session = hbu.getHibernateSession();
		 transaction = session.beginTransaction();
		 
		 DateFormat df = new SimpleDateFormat("dd/MM/yyyy");
		 Date date = new Date();
		
		 bean.setDate(date);
		
		session.save(bean);
		transaction.commit();
		}
		
		catch(RuntimeException e){
			try{
				transaction.rollback();
			}catch(Exception rbe)
			{
				rbe.printStackTrace();
			}	
		}finally{
		hbu.closeSession(session);
		}
		
	}
}






