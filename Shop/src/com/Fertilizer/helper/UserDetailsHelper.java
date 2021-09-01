package com.Fertilizer.helper;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.hibernate.Session;
import org.hibernate.Transaction;

import com.Fertilizer.dao.UserDetailsDao;
import com.Fertilizer.dao.shopDetailsDao;
import com.Fertilizer.hibernate.UserDetailsBean;
import com.Fertilizer.hibernate.shopDetailsBean;
import com.Fertilizer.utility.HibernateUtility;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class UserDetailsHelper {

	public void userDetails(HttpServletRequest request,
			HttpServletResponse response) {
		
		Long Userid=0l;
		
		UserDetailsDao dao=new UserDetailsDao();
		List listtxid=dao.getUserId();
		
		if(listtxid.size()<=0)
		{
			Userid=1l;
		}
		else
		{
		for (int i = 0; i < listtxid.size(); i++) {
			
			UserDetailsBean bean=(UserDetailsBean) listtxid.get(i);
			Userid=bean.getUsrId();
			Userid++;
			
		}
	}

		String address1 = request.getParameter("address1");
		String contactNo = request.getParameter("contactNo");
		String firstName = request.getParameter("firstName");
		String lastName = request.getParameter("lastName");
		String pan = request.getParameter("pan");
		String city = request.getParameter("city");
		String userName = request.getParameter("userName");
		String password = request.getParameter("password");
		String rePassword = request.getParameter("password2");
		String typeId = request.getParameter("typeId");
		

		
		UserDetailsBean udb = new UserDetailsBean();
		
				

		
				if(!"".equals(contactNo)){
					udb.setContactNo(Long.parseLong(contactNo));
			} else
			{
				udb.setContactNo(Long.parseLong("00"));
			}
		
				udb.setUsrId(Userid);
				udb.setFirstName(firstName);
				udb.setLastName(lastName);
				udb.setAddress1(address1);
				udb.setCity(city);
				udb.setPan(pan);
				udb.setUserName(userName);
				udb.setPassword(password);
				udb.setTypeId(typeId);
				
				if(rePassword == null){
					udb.setRePassword("N/A");
				}
				else{
					udb.setRePassword(rePassword);
				}
				
		
		
		UserDetailsDao udd = new UserDetailsDao();
		udd.addUser(udb);
	}

	
	public List getAlluserName()
	{
		UserDetailsDao dao = new UserDetailsDao();
		return dao.getAllUsers();
	}
	
//////////fetch User details from databasse////////
public Map getUserDetailsForEdit(Long userId) {

	
	System.out.println("into helper class");
	UserDetailsDao dao1 = new UserDetailsDao();
	List catList = dao1.getAllUserDetailsForEdit(userId);
	
	Map  map =  new HashMap();
	for(int i=0;i<catList.size();i++)
	{
		Object[] o = (Object[])catList.get(i);
	
		UserDetailsBean bean = new UserDetailsBean();
		
		bean.setFirstName(o[0].toString());
		bean.setLastName(o[1].toString());
		bean.setContactNo(Long.parseLong(o[2].toString()));
		bean.setAddress1(o[3].toString());
		bean.setUserName(o[4].toString());
		bean.setPassword(o[5].toString());
		bean.setRePassword(o[6].toString());
		bean.setCity(o[7].toString());
		bean.setPan(o[8].toString());
				
		map.put(bean.getFirstName(),bean);
	}
	System.out.println("out of helper return map : "+map);
	return map;
}

//update User details
public void editUserDetail(HttpServletRequest request,
		HttpServletResponse response) {

	
	String UserId = request.getParameter("fkRootUserId");
	
	String firstName = request.getParameter("firstName");
	String lastName = request.getParameter("lastName");
	String address = request.getParameter("address");
	String userName = request.getParameter("userName");
	String passWord = request.getParameter("passWord");
	String repassWord = request.getParameter("repassWord");
	String city = request.getParameter("city");
	String panNo = request.getParameter("panNo");
		
	HibernateUtility hbu=null;
	Session session = null;
	Transaction transaction = null;
	
	 hbu = HibernateUtility.getInstance();
	 session = hbu.getHibernateSession();
	 transaction = session.beginTransaction();

	long UserID =Long.parseLong(UserId);
	UserDetailsBean det = (UserDetailsBean) session.get(UserDetailsBean.class, UserID);
	
	det.setFirstName(firstName);
	det.setLastName(lastName);
	det.setAddress1(address);
	det.setUserName(userName);
	det.setPassword(passWord);
	det.setRePassword(repassWord);
	det.setCity(city);
	det.setPan(panNo);
		
 session.saveOrUpdate(det);
	transaction.commit();
	
	System.out.println("Record Updated successfully.");

}

}
