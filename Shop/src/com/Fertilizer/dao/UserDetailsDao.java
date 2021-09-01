package com.Fertilizer.dao;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.jfree.util.Log;

import com.Fertilizer.hibernate.UserDetailsBean;
import com.Fertilizer.hibernate.shopDetailsBean;
import com.Fertilizer.utility.HibernateUtility;

public class UserDetailsDao {

	public void addUser(UserDetailsBean udb) {

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
		session.save(udb);
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

	//get latest User ID number in User Details
	public List getUserId() {
		HibernateUtility hbu=null;
		Session session=null;
		List<UserDetailsBean> Txidlist=null;
		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createSQLQuery("SELECT user_id , first_name, last_name FROM user_details ORDER BY user_id DESC LIMIT 1");

			List<Object[]> list = query.list();
			Txidlist= new ArrayList<UserDetailsBean>(0);
			for (Object[] object : list) {
				
				UserDetailsBean bean=new UserDetailsBean();
				bean.setUsrId(Long.parseLong(object[0].toString()));
				bean.setFirstName(object[1].toString());
				bean.setLastName(object[2].toString());
				
				Txidlist.add(bean);	 
			}}
		catch(RuntimeException e)
		{
			Log.error("Error in getUserId()", e);	
		}finally
		{if(session!=null){
			hbu.closeSession(session);	
		}
		}
		return Txidlist;	
	}
	
	
	public List getAllUsers()
	{
		
		HibernateUtility hbu=null;
		Session session=null;
		
		List list=null;
		try{
		 hbu = HibernateUtility.getInstance();
		 session = hbu.getHibernateSession();
		 Query query = session.createQuery("from UserDetailsBean");
		 list = query.list();
		}catch(Exception e){	
			Log.error("Error in getAllUsers()",e);
		}
		finally{
			if(session!=null){
			hbu.closeSession(session);	
		}
		}
		return list;
	}
	
	// User list Content
	
	public List getUserList(){
		
		HibernateUtility hbu=null;
		Session session=null;
		List<UserDetailsBean> userList=null;
	try{	

		hbu = HibernateUtility.getInstance();
		session = hbu.getHibernateSession();

		Query query=session.createSQLQuery("SELECT pk_user_id, first_name, last_name, address_line1, city, pan_no, user_name, `password` from user_details");
		
		List<Object[]> list = query.list();
		userList= new ArrayList<UserDetailsBean>(0);

	for (Object[] object : list) {	
		
		UserDetailsBean reports = new UserDetailsBean();
		
		reports.setUsrId(Long.parseLong(object[0].toString()));
		reports.setFirstName(object[1].toString());
		reports.setLastName(object[2].toString());
		reports.setAddress1(object[3].toString());
		reports.setCity(object[4].toString());
		reports.setPan(object[5].toString());
		reports.setUserName(object[6].toString());
		reports.setPassword(object[7].toString());
								
		userList.add(reports);

	}}catch(RuntimeException e){	

	}
	finally{

	hbu.closeSession(session);	
	}
	return userList;
	}
	
	// fetch User name on dropdown
	public List getAllMainUser()
	{
		
		HibernateUtility hbu=null;
		Session session=null;
		
		List list=null;
		try{
		 hbu = HibernateUtility.getInstance();
		 session = hbu.getHibernateSession();
		 Query query = session.createQuery("from UserDetailsBean");
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
	
	public List getAllUserDetailsForEdit(Long userId) {


		System.out.println("into dao shop : "+userId);
		HibernateUtility hbu = null;
		Session session =  null;
		Query query = null;
		 List list = null;
		 try {
			 
			 hbu = HibernateUtility.getInstance();
			 session = hbu.getHibernateSession();
			 query = session.createSQLQuery("SELECT first_name, last_name, mobile_no, address_line1, user_name,`password`, re_password, city, pan_no from user_details WHERE pk_user_id = "+userId);
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
