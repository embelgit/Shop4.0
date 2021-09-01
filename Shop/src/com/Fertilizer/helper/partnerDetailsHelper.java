package com.Fertilizer.helper;

import java.math.BigInteger;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.hibernate.Session;
import org.hibernate.Transaction;

import com.Fertilizer.bean.GetSupplierDetails;
import com.Fertilizer.bean.PartnerDetailsBean;
import com.Fertilizer.dao.SupplierDetailsDao;
import com.Fertilizer.dao.partnerDetailsDao;
import com.Fertilizer.hibernate.SupplierDetailsBean;
import com.Fertilizer.utility.HibernateUtility;
import com.Fertilizer.hibernate.PartnerDetailsBeanH;

public class partnerDetailsHelper
{	
	public void partnerDetails(HttpServletRequest request,
			HttpServletResponse response) {

		System.out.println("In helper");
		
		String city = request.getParameter("city");
		String contactNo = request.getParameter("contactNo");
		String emailId = request.getParameter("emailId");
		String partnerName = request.getParameter("partnerName");
		String alternateNo = request.getParameter("alternateNo");
		String address = request.getParameter("address");
		
		partnerDetailsDao sdo = new partnerDetailsDao();
		PartnerDetailsBeanH pdb = new PartnerDetailsBeanH();
		
		pdb.setPartnerName(partnerName);
		
		if(!"".equals(contactNo)){
				pdb.setContactNo(Long.parseLong(contactNo));
		} else{
			pdb.setContactNo(Long.parseLong("00"));
		}
		if(!"".equals(alternateNo)){
				pdb.setAlternateContactNo(Long.parseLong(alternateNo));
		} else{
			pdb.setAlternateContactNo(Long.parseLong("00"));
		}			
		if(!"".equals(emailId)){
				pdb.setEmailId(emailId);
		} else {
			pdb.setEmailId("N/A");
		}			
		if(!"".equals(city)){
			pdb.setCity(city);
		} else{
			pdb.setCity("N/A");
		}
		if(!"".equals(address)){
			pdb.setAddress(address);
		} else{
			pdb.setAddress("N/A");
		}
	
		pdb.setCity(city);
		
        String onlyShopName = "";
		
		HttpSession session = request.getSession(true);
		
		String username = (String) session.getAttribute("user");
		String userid = (String) session.getAttribute("userid");
		String shopid = (String) session.getAttribute("shopid");
		String shopName = (String) session.getAttribute("shopName");
		
		String ShopNameWithoutId1 = shopName.substring(4);
		onlyShopName = ShopNameWithoutId1.trim();
		
		pdb.setFkshopid(Long.parseLong(shopid));
		pdb.setFkuserid(Long.parseLong(userid));
		pdb.setUserName(username);
		pdb.setShopName(onlyShopName);
	
	    sdo.registerPartner(pdb);
	}
	
public Map getPartnerDetailsForEdit(HttpServletRequest request) {
		
	String partnerID = request.getParameter("PartnerId");
	Long partnerId = Long.parseLong(partnerID);
	
 	System.out.println("into helper class");
 	partnerDetailsDao dao1 = new partnerDetailsDao();
	List catList = dao1.getAllPartnerDetailsForEdit(partnerId, request);
	
	Map  map =  new HashMap();
	for(int i=0;i<catList.size();i++)
	{
		Object[] o = (Object[])catList.get(i);
	
		PartnerDetailsBean bean = new PartnerDetailsBean();
		
		bean.setPartnerName(o[0].toString());
		bean.setContactNo(o[1].toString());
		bean.setAlternateContactNo(o[2].toString());
		bean.setEmailId(o[3].toString());
		bean.setCity(o[4].toString());
		bean.setAddress(o[5].toString());
		
		map.put(bean.getPartnerName(),bean);
	}
	System.out.println("out of helper return map : "+map);
	return map;
}

public void editPartnerDetail(HttpServletRequest request,
		HttpServletResponse response) {

	String partnerId = request.getParameter("partnerId");
	
	String partnerName = request.getParameter("partnerName");
	String contactNo = request.getParameter("contactNo");
	String alternateNo = request.getParameter("alternateNo");
	
	String emailId = request.getParameter("emailId");
	String city = request.getParameter("city");
	String address = request.getParameter("address");
	
	HibernateUtility hbu=null;
	Session session = null;
	Transaction transaction = null;
	
	 hbu = HibernateUtility.getInstance();
	session = hbu.getHibernateSession();
	 transaction = session.beginTransaction();

	//long customerId = Long.parseLong(customerId);
	long partnerID =Long.parseLong(partnerId);
	PartnerDetailsBeanH det = (PartnerDetailsBeanH) session.get(PartnerDetailsBeanH.class, partnerID);
	
	det.setPartnerName(partnerName);
	det.setContactNo(Long.parseLong(contactNo));
	det.setAlternateContactNo(Long.parseLong(alternateNo));
	det.setEmailId(emailId);
	det.setCity(city);
	det.setAddress(address);
	
    session.saveOrUpdate(det);
	transaction.commit();
	
	System.out.println("Record updated successfully.");
 }

}
