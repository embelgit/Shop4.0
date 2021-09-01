package com.Fertilizer.helper;

import java.math.BigInteger;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.hibernate.Session;
import org.hibernate.Transaction;

import com.Fertilizer.bean.GetBankDetails;
import com.Fertilizer.bean.GetSupplierDetails;
import com.Fertilizer.dao.BankDetailsDao;
import com.Fertilizer.dao.CustomerDetailsDao;
import com.Fertilizer.dao.SupplierDetailsDao;
import com.Fertilizer.hibernate.CustomerDetailsBean;
import com.Fertilizer.hibernate.SubCategoryDetailsBean;
import com.Fertilizer.hibernate.SupplierDetailsBean;
import com.Fertilizer.utility.HibernateUtility;

public class SupplierDetailsHelper {

	public void supplierDetails(HttpServletRequest request,
			HttpServletResponse response) {

		System.out.println("In helper");
		
		String city = request.getParameter("city");
		String contactNo = request.getParameter("contactNo");
		String emailId = request.getParameter("emailId");
		String dealerName = request.getParameter("dealerName");
		String personName = request.getParameter("personName");
		String tinNo = request.getParameter("tinNo");
		String landline = request.getParameter("landline");
		String address = request.getParameter("address");
		
		String accNo = request.getParameter("accNo");
		String accName = request.getParameter("accName");
		String ifsc = request.getParameter("ifsc");
		String upi_id = request.getParameter("upi_id");
		String openbal = request.getParameter("openbal");
		
		SupplierDetailsDao sdo = new SupplierDetailsDao();
		SupplierDetailsBean sdb = new SupplierDetailsBean();
		

			sdb.setUpi_id(upi_id);
			sdb.setOpening_bal(Double.parseDouble(openbal));
			if(!"".equals(contactNo)){
					sdb.setContactNo(Long.parseLong(contactNo));
			} else
			{
				sdb.setContactNo(Long.parseLong("00"));
			}
				
				if(!"".equals(landline)){
					sdb.setLandline(Long.parseLong(landline));
			} else
			{
				sdb.setLandline(Long.parseLong("00"));
			}
						
				if(!"".equals(emailId)){
					sdb.setEmailId(emailId);
			} else
			{
				sdb.setEmailId("N/A");
			}
				
				if(!"".equals(tinNo)){
					sdb.setTinNo((tinNo));
			} else
			{
				sdb.setTinNo("N/A");
			}
				if(!"".equals(address)){
					sdb.setAddress(address);
			} else
			{
				sdb.setAddress("N/A");
			}
				sdb.setAccName(accName);
				sdb.setAccNo(accNo);
				sdb.setIfsc(ifsc);
				
			sdb.setPersonName(personName);
			sdb.setDealerName(dealerName);
			sdb.setCity(city);
			
		    String onlyShopName = "";
			
			HttpSession session = request.getSession(true);
			
			String username = (String) session.getAttribute("user");
			String userid = (String) session.getAttribute("userid");
			String shopid = (String) session.getAttribute("shopid");
			String shopName = (String) session.getAttribute("shopName");
			
			String ShopNameWithoutId1 = shopName.substring(4);
			onlyShopName = ShopNameWithoutId1.trim();
			
			sdb.setFkshopid(Long.parseLong(shopid));
			sdb.setFkuserid(Long.parseLong(userid));
			sdb.setShopName(onlyShopName);
			sdb.setUserName(username);
			
			sdo.valSupplierDetails(sdb);
	}

	public Map getSupplierDetailsForEdit(HttpServletRequest request) {
		
	 	System.out.println("into helper class");
	 	
	 	String supplierID = request.getParameter("SupplierId");
		Long supplierId = Long.parseLong(supplierID);
		
	 	SupplierDetailsDao dao1 = new SupplierDetailsDao();
		List catList = dao1.getAllSupplierSetailsForEdit(supplierId, request);
		
		Map  map =  new HashMap();
		for(int i=0;i<catList.size();i++)
		{
			Object[] o = (Object[])catList.get(i);
		
			GetSupplierDetails bean = new GetSupplierDetails();
			bean.setDealerName(o[0].toString());
			bean.setCity(o[1].toString());
			bean.setContactNo((BigInteger)o[2]);
			bean.setLandline((BigInteger)o[3]);
			bean.setPersonName(o[4].toString());
			bean.setTin(o[5].toString());
			bean.setAddress(o[6].toString());
			bean.setEmail(o[7].toString());
			map.put(bean.getDealerName(),bean);
		}
		System.out.println("out of helper return map : "+map);
		return map;
	}

	public void editSupplierDetail(HttpServletRequest request,
			HttpServletResponse response) {
	
		String supplierId = request.getParameter("supplierId");
		
		String dealerName = request.getParameter("dealerName");
		String personName = request.getParameter("personName");
		String contactNo = request.getParameter("contactNo");
		
		String landline = request.getParameter("landline");
		String emailId = request.getParameter("emailId");
		String city = request.getParameter("city");
		
		String tinNo = request.getParameter("tinNo");
		String address = request.getParameter("address");
		
		HibernateUtility hbu=null;
		Session session = null;
		Transaction transaction = null;
		
		 hbu = HibernateUtility.getInstance();
		session = hbu.getHibernateSession();
		 transaction = session.beginTransaction();
	
		//long customerId = Long.parseLong(customerId);
		long supplierID =Long.parseLong(supplierId);
		SupplierDetailsBean det = (SupplierDetailsBean) session.get(SupplierDetailsBean.class, supplierID);
		
		
	
		if(!"".equals(address)){
			det.setAddress(address);
		} else
	{
			det.setAddress("N/A");
	}
		
		if(!"".equals(dealerName)){
			det.setDealerName(dealerName);
		} else
	{
			det.setDealerName("N/A");
	}
		
		
		if(!"".equals(contactNo)){
			det.setContactNo(Long.parseLong(contactNo));
		} else
	{
		det.setContactNo(Long.parseLong("0"));
	}
	
		if(!"".equals(landline)){
			det.setLandline(Long.parseLong(landline));
	} else
	{
		det.setLandline(Long.parseLong("0"));
	}
	
		if(!"".equals(personName)){
			det.setPersonName(personName);
		} else
		{
			det.setPersonName("N/A");
		}
		if(!"".equals(city)){
			det.setCity(city);
		} else
		{
			det.setCity("N/A");
		}
		if(!"".equals(emailId)){
			det.setEmailId(emailId);	
		} else
		{
			det.setEmailId("N/A");
		}
		
		if(!"".equals(tinNo)){
			det.setTinNo(tinNo);	
		} else
		{
			det.setTinNo("N/A");
		}
		
		
		
		
		
		
	    session.saveOrUpdate(det);
		transaction.commit();
		
		System.out.println("Record updated successfully.");
	}

	public void deleteSupplier(HttpServletRequest request, HttpServletResponse response ) 
	{	
		String supplier = request.getParameter("supplier");
		   
		SupplierDetailsDao dao2 = new SupplierDetailsDao();
		dao2.deleteSupplier(supplier);
	}
	
	public Map getmailID(HttpServletRequest request) 
	{
		String supplierID = request.getParameter("supplierID");
		
		SupplierDetailsDao dao = new SupplierDetailsDao();
		List list = dao.getmailIDbySupplierName(supplierID, request);
		Map  map =  new HashMap();
		
		for(int i=0;i<list.size();i++)
		{
			Object[] o = (Object[])list.get(i);
			GetSupplierDetails bean = new GetSupplierDetails();
			bean.setEmail(o[0].toString());
			bean.setPksuppID(Long.parseLong(o[1].toString()));
			
			System.out.println("***************"+o[0]);
			map.put(bean.getPksuppID(),bean);
		}
		return map;
	}
}
