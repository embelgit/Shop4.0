package com.Fertilizer.dao;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;

import com.Fertilizer.utility.HibernateUtility;

public class AuthenticationDao {

	
	public List getAllShopNameForLogin(String uname) {

		HibernateUtility hbu = null ;
		Session session = null;
		List list  = null;
		System.out.println("uname----------->Dao----------> "+uname);
	
				try {
						hbu = HibernateUtility.getInstance();
						session = hbu.getHibernateSession();
						System.out.println("uname === == = "+uname);
						Query query = session.createSQLQuery("SELECT shop_id,shop_name,user_id,username from access_control_details WHERE username='"+uname+"'");

						list = query.list();
						System.out.println("List Size----------->Dao----------> "+list.size());
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
}
