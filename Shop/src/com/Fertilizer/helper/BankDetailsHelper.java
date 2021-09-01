package com.Fertilizer.helper;

import java.math.BigInteger;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.Fertilizer.bean.GetBankDetails;
import com.Fertilizer.bean.GetCreditCustomerDetails;
import com.Fertilizer.dao.BankDetailsDao;
import com.Fertilizer.dao.CustomerDetailsDao;
import com.Fertilizer.hibernate.BankDetailsBean;
import com.Fertilizer.hibernate.CustomerDetailsBean;

public class BankDetailsHelper {
	
	public void bankDetailsAdd(HttpServletRequest request, HttpServletResponse response ){

		System.out.println("In helper");
		
		String bankName = request.getParameter("bankName");
		String accountNo = request.getParameter("accountNo");
		String ifscCode = request.getParameter("ifscCode");
		String branchName = request.getParameter("branchName");
		String accountHolderName = request.getParameter("accountHolderName");
		String contactNo = request.getParameter("contactNo");
		String address = request.getParameter("address");
				
		BankDetailsDao cdo = new BankDetailsDao();		
		BankDetailsBean bean = new BankDetailsBean();
		
		bean.setBankName(bankName);
		bean.setAccountNo(Long.parseLong(accountNo));
		bean.setIfscCode(ifscCode);
		bean.setBranchName(branchName);
		bean.setAccountHolderName(accountHolderName);
		bean.setContactNo(Long.parseLong(contactNo));
		bean.setAddress(address);
			
        String onlyShopName = "";
		
		HttpSession session = request.getSession(true);
		
		String username = (String) session.getAttribute("user");
		String userid = (String) session.getAttribute("userid");
		String shopid = (String) session.getAttribute("shopid");
		String shopName = (String) session.getAttribute("shopName");
		
		String ShopNameWithoutId1 = shopName.substring(4);
		onlyShopName = ShopNameWithoutId1.trim();   
		
		bean.setFkshopid(Long.parseLong(shopid));
		bean.setFkuserid(Long.parseLong(userid));
		bean.setUserName(username);
		bean.setShopName(onlyShopName);
		
		cdo.valBankDetails(bean);
	}
	
	public Map getaccountnoandifsc(HttpServletRequest request) 
	{
		String bankNameId = request.getParameter("bankNameId");
		
		BankDetailsDao dao = new BankDetailsDao();
		List list = dao.getaccNoandifscbybankname(bankNameId, request);
		Map  map =  new HashMap();
		
		for(int i=0;i<list.size();i++)
		{
			Object[] o = (Object[])list.get(i);
			GetBankDetails bean = new GetBankDetails();
			bean.setAccountNo(Long.parseLong(o[0].toString()));
			bean.setIfscCode(o[1].toString());
			
			System.out.println("***************"+o[0]);
			map.put(bean.getAccountNo(),bean);
		}
		return map;
	}

}
