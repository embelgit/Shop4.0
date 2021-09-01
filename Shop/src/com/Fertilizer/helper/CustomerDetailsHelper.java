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
import org.omg.CORBA.Request;

import com.Fertilizer.bean.GetCreditCustomerDetails;
import com.Fertilizer.bean.GetSupplierDetails;
import com.Fertilizer.bean.ProfitAndLoss;
import com.Fertilizer.dao.CustomerDetailsDao;
import com.Fertilizer.dao.SupplierAccountDetailsDao;
import com.Fertilizer.hibernate.CustomerDetailsBean;
import com.Fertilizer.hibernate.cashCustomerHibernate;
import com.Fertilizer.utility.HibernateUtility;

public class CustomerDetailsHelper {
	
	public void customerDetails(HttpServletRequest request, HttpServletResponse response ){

		System.out.println("In helper");
		
		String address = request.getParameter("address");
		String contactNo = request.getParameter("contactNo");
		String emailId = request.getParameter("emailId");
		String firstName = request.getParameter("firstName");
		String lastName = request.getParameter("lastName");
		String middleName = request.getParameter("middleName");
		String zipCode = request.getParameter("zipCode");
		String gstno = request.getParameter("gstno");
		String firmname = request.getParameter("firmname");
		
		CustomerDetailsDao cdo = new CustomerDetailsDao();		
		CustomerDetailsBean cdb = new CustomerDetailsBean();
		
	    cdb.setFirstName(firstName);
		cdb.setLastName(lastName);				
		
		cdb.setFirmname(firmname);
		
		if(!"".equals(contactNo)){
			cdb.setContactNo(Long.parseLong(contactNo));
		} else{
			cdb.setContactNo(Long.parseLong("00"));
		}
		if(!"".equals(zipCode)){
			cdb.setZipCode(Long.parseLong(zipCode));
		} else{
			cdb.setZipCode(Long.parseLong("00"));
		}
		if(!"".equals(emailId)){
			cdb.setEmailId(emailId);
		} else{
			cdb.setEmailId("N/A");
		}
		if(!"".equals(middleName)){
			cdb.setMiddleName(middleName);
		} else{
			cdb.setMiddleName("N/A");
		}
		if(!"".equals(address)){
			cdb.setAddress(address);
		} else{
			cdb.setAddress("N/A");
		}
		if(!"".equals(gstno)){
			cdb.setGstno(gstno);
		} else{
			cdb.setGstno("N/A");
		}
		cdb.setAadhar(0l);	
        String onlyShopName = "";
		
		HttpSession session = request.getSession(true);
		
		String username = (String) session.getAttribute("user");
		String userid = (String) session.getAttribute("userid");
		String shopid = (String) session.getAttribute("shopid");
		String shopName = (String) session.getAttribute("shopName");
		
		String ShopNameWithoutId1 = shopName.substring(4);
		onlyShopName = ShopNameWithoutId1.trim();   
		
		cdb.setFkshopid(Long.parseLong(shopid));
		cdb.setFkuserid(Long.parseLong(userid));
		cdb.setUserName(username);
		cdb.setShopName(onlyShopName);
		
		cdo.valCustomerDetails(cdb);
	}
	
	
	
	public Map getVillage(HttpServletRequest request) 
	{
		String creditCustomerId = request.getParameter("creditCustomerId");
		
		CustomerDetailsDao dao = new CustomerDetailsDao();
		List list = dao.getVillageByCustomerName(creditCustomerId, request);
		Map  map =  new HashMap();
		
		for(int i=0;i<list.size();i++)
		{
			Object[] o = (Object[])list.get(i);
			GetCreditCustomerDetails bean = new GetCreditCustomerDetails();
			bean.setVillage(o[0].toString());
			bean.setFirstName(o[1].toString());
			bean.setContactNo((BigInteger)o[2]);
			bean.setAadhar((BigInteger)o[3]);
			bean.setGstno(o[4].toString());
			bean.setEmail(o[5].toString());
			System.out.println("***************"+o[0]);
			map.put(bean.getVillage(),bean);
		}
		return map;
	}
	public Map getVillage1(HttpServletRequest request) 
	{
		String creditCustomerId = request.getParameter("creditCustomerId");
		
		CustomerDetailsDao dao = new CustomerDetailsDao();
		List list = dao.getVillageByCustomerName1(creditCustomerId, request);
		Map  map =  new HashMap();
		
		for(int i=0;i<list.size();i++)
		{
			Object[] o = (Object[])list.get(i);
			GetCreditCustomerDetails bean = new GetCreditCustomerDetails();
			bean.setVillage(o[0].toString());
			bean.setFirstName(o[1].toString());
			bean.setContactNo((BigInteger)o[2]);
			bean.setAadhar((BigInteger)o[3]);
			bean.setGstno(o[4].toString());
			bean.setEmail(o[5].toString());
			System.out.println("***************"+o[0]);
			map.put(bean.getVillage(),bean);
		}
		return map;
	}
	
public void deleteCustomer(HttpServletRequest request, HttpServletResponse response ) {
		
	String customerId = request.getParameter("customerId");
	   
		CustomerDetailsDao dao = new CustomerDetailsDao();
		dao.deletCustomer(customerId);
		
	}


	public Map getAllBillByCustomers(String fkCustomerId, String catId) {

		CustomerDetailsDao dao = new CustomerDetailsDao();
		List list= dao.getAllBillByCreditCustomer(fkCustomerId,catId);
		Map  map =  new HashMap();
		for(int i=0;i<list.size();i++)
		{
			Object[] o = (Object[])list.get(i);
			GetCreditCustomerDetails bean = new GetCreditCustomerDetails();
			System.out.println(Arrays.toString(o));
						
			double billPaymentPending = Double.parseDouble(o[1].toString());
			if(billPaymentPending > 0)
			{
				bean.setBillNo((BigInteger)o[0]);
			}			
			bean.setInsertDate(o[2].toString());
			System.out.println("***************"+o[0]);
			System.out.println("Bill No for credit customer bill **======** "+bean.getBillNo());
			map.put(bean.getBillNo(),bean);
			
		}
		return map;
	
	}	
	
	
	
	public Map getAllBillByCustomersForReports(String fkCustomerId, String catId) {

		CustomerDetailsDao dao = new CustomerDetailsDao();
		List list= dao.getAllBillByCreditCustomerForReports(fkCustomerId,catId);
		Map  map =  new HashMap();
		for(int i=0;i<list.size();i++)
		{
			Object[] o = (Object[])list.get(i);
			GetCreditCustomerDetails bean = new GetCreditCustomerDetails();
			System.out.println(Arrays.toString(o));
						
			double billPaymentPending = Double.parseDouble(o[1].toString());
			
			bean.setBillNo((BigInteger)o[0]);
						
			bean.setInsertDate(o[2].toString());
			System.out.println("***************"+o[0]);
			System.out.println("Bill No for credi customer bill **======** "+bean.getBillNo());
			map.put(bean.getBillNo(),bean);
			
		}
		return map;
	}	
		
	public Map getTotalAmtByBillNo(String billNo, String catId, String creditCustomer) {

		CustomerDetailsDao dao = new CustomerDetailsDao();
		List list= dao.getTotalAmountByBill(billNo,catId,creditCustomer);
		Map  map =  new HashMap();
		for(int i=0;i<list.size();i++)
		{
			Object[] o = (Object[])list.get(i);
			GetCreditCustomerDetails bean = new GetCreditCustomerDetails();
			System.out.println(Arrays.toString(o));
			String total = o[0].toString();
			Double total1 = Double.valueOf(total);
			System.out.println(total1);
			bean.setTotalAmount(total1);
			//bean.setInsertDate(o[1].toString());
			System.out.println("***************"+o[0]);
			System.out.println("Ih helper method getTotal");
			map.put(bean.getBillNo(),bean);
			
		}
		return map;
	
	
	}


//get remaining balance 

public Map getBalanceAmtByBillNo(String billNo, String creditCustomer, String catId) {

	CustomerDetailsDao dao = new CustomerDetailsDao();
	List list= dao.getRemainingBalanceAmountByBill(billNo,creditCustomer,catId);
	Map  map =  new HashMap();
	System.out.println(list.size()+"LIST SIZE");
	int sic = list.size();
	if(sic==0)
	{
		GetCreditCustomerDetails bean = new GetCreditCustomerDetails();
		Double totalAmt = dao.getTotalAmt(billNo);
		bean.setBalance(totalAmt);
		map.put(bean.getBalance(),bean);
	}
	else {
		for(int i=0;i<list.size();i++)
		{
			Object[] o = (Object[])list.get(i);
			GetCreditCustomerDetails bean = new GetCreditCustomerDetails();
			String newBal = (o[0].toString());
				Double newBal1 = Double.valueOf(newBal);
				System.out.println(newBal1+"NEW BALANCE");
				
					bean.setBalance(newBal1);
				
		
			
			System.out.println("***************"+o[0]);
			map.put(bean.getBalance(),bean);
		}
	}
	
	return map;

}


	// Get Customer Details For edit
	public Map getCreditCustomerDetailsForEdit(HttpServletRequest request) 
	{
		String strcustomerId = request.getParameter("creditCustomer");
		Long customerId = Long.parseLong(strcustomerId);
		
	 	System.out.println("into helper class");
	 	
	 	CustomerDetailsDao dao1 = new CustomerDetailsDao();
		List catList = dao1.getCreditCustomerForEdit(customerId, request);
		
		Map  map =  new HashMap();
		for(int i=0;i<catList.size();i++)
		{
			Object[] o = (Object[])catList.get(i);
			GetCreditCustomerDetails bean = new GetCreditCustomerDetails();
			 bean.setFirstName(o[0].toString());
			 bean.setMiddleName(o[1].toString());
			 bean.setLastName(o[2].toString());
			 bean.setEmail(o[3].toString());
			 bean.setAddress(o[4].toString());
			 bean.setContactNo((BigInteger)o[5]);
			 bean.setZipCode((BigInteger)o[6]);
			 bean.setGstno(o[7].toString());
			 System.out.println("GST-------===========@@@@@@@@@@@   :  "+o[7]);
			
			map.put(bean.getFirstName(),bean);
		}
		System.out.println("out of helper return map : "+map);
		return map;
	
	}


	// Update Customer Details
	public void editCreditCustomer(HttpServletRequest request,
			HttpServletResponse response) 
	{

		System.out.println("in EditEmployee helper");
		
		String strcustomerId = request.getParameter("customerId");
		
		
		String fullName = request.getParameter("fullName");
		String firstName = request.getParameter("firstName");
		String middleName = request.getParameter("middleName");
		String lastName = request.getParameter("lastName");
		
		String address = request.getParameter("address");
		String contactNo = request.getParameter("contactNo");
		String gstNo = request.getParameter("gstNo");
		
		String emailId = request.getParameter("emailId");
		String zipCode = request.getParameter("zipCode");
		
	
		String[] flname = fullName.split(" ");
		String firstName1 = flname[0];
		String lastName2 = flname[1];
	
		CustomerDetailsDao dao = new CustomerDetailsDao();
		List list22 = dao.getAllCustomerDetails();
	
		 for(int i=0;i<list22.size();i++)
		 {
			 CustomerDetailsBean cdb = (CustomerDetailsBean) list22.get(i);
			 
			 Long custPkId = cdb.getCustId();
			 String fName = cdb.getFirstName();
			 String lName = cdb.getLastName();
			 
			 if(custPkId.equals(Long.parseLong(strcustomerId)) && fName.equals(firstName1) && lName.equals(lastName2))
			 {
				 
					HibernateUtility hbu=null;
					Session session = null;
					Transaction transaction = null;
					
					hbu = HibernateUtility.getInstance();
					session = hbu.getHibernateSession();
					transaction = session.beginTransaction();
				 
					//long customerId =Long.parseLong(strcustomerId);
					
					CustomerDetailsBean det = (CustomerDetailsBean) session.get(CustomerDetailsBean.class, custPkId);
					
					det.setFirstName(firstName);
					det.setLastName(lastName);

					if(!"".equals(contactNo)){
						det.setContactNo(Long.parseLong(contactNo));
					} else
					{
						det.setContactNo(Long.parseLong("00"));
					}
						

					if(!"".equals(zipCode)){
							det.setZipCode(Long.parseLong(zipCode));
					} else
					{
						det.setZipCode(Long.parseLong("00"));
					}

						
					if(!"".equals(emailId)){
						det.setEmailId(emailId);
					} else
					{
						det.setEmailId("N/A");
					}
						
					
						
					if(!"".equals(middleName))
					{
						det.setMiddleName(middleName);
					} else
					{
						det.setMiddleName("N/A");
					}
					
			
					
					if(!"".equals(address))
					{
						det.setAddress(address);
					} else
					{
						det.setAddress("N/A");
					}
					
					if(!"".equals(gstNo))
					{
						det.setGstno(gstNo);
					} else
					{
						det.setGstno("N/A");
					}
					
					
					
					session.update(det);
					transaction.commit();
				
					break;
			 }
		 
		 }
		
		

	
		//long customerId = Long.parseLong(customerId);
		
	/*	
		det.setFirstName(firstName);
		det.setMiddleName(middleName);
		det.setLastName(lastName);
		
		det.setAddress(address);
		det.setContactNo(Long.parseLong(contactNo));
		if(aadharNo == null)
		{
			aadharNo = "0";
		}
		det.setAadhar(Long.parseLong(aadharNo));
		det.setEmailId(emailId);
		det.setZipCode(Long.parseLong(zipCode));
  	
	    session.saveOrUpdate(det);
		transaction.commit();
		
		System.out.println("Record updated successfully.");
	
	*/
	}
	
	
	//
	
	public void cashcustomerDetails(HttpServletRequest request, HttpServletResponse response ){

		System.out.println("In helper");
		
		String address = request.getParameter("address");
		String contactNo = request.getParameter("contactNo");
		String emailId = request.getParameter("emailId");
		String firstName = request.getParameter("firstName");
		String lastName = request.getParameter("lastName");
		String middleName = request.getParameter("middleName");
		String zipCode = request.getParameter("zipCode");
		String gstno = request.getParameter("gstno");
		String firmname = request.getParameter("firmname");
		
		CustomerDetailsDao cdo = new CustomerDetailsDao();		
		cashCustomerHibernate cdb = new cashCustomerHibernate();
		
	    cdb.setFirstName(firstName);
		cdb.setLastName(lastName);				
		
		cdb.setFirmname(firmname);
		
		if(!"".equals(contactNo)){
			cdb.setContactNo(Long.parseLong(contactNo));
		} else{
			cdb.setContactNo(Long.parseLong("00"));
		}
		if(!"".equals(zipCode)){
			cdb.setZipCode(Long.parseLong(zipCode));
		} else{
			cdb.setZipCode(Long.parseLong("00"));
		}
		if(!"".equals(emailId)){
			cdb.setEmailId(emailId);
		} else{
			cdb.setEmailId("N/A");
		}
		if(!"".equals(middleName)){
			cdb.setMiddleName(middleName);
		} else{
			cdb.setMiddleName("N/A");
		}
		if(!"".equals(address)){
			cdb.setAddress(address);
		} else{
			cdb.setAddress("N/A");
		}
		if(!"".equals(gstno)){
			cdb.setGstno(gstno);
		} else{
			cdb.setGstno("N/A");
		}
			
		cdb.setAadhar(0l);
        String onlyShopName = "";
		
		HttpSession session = request.getSession(true);
		
		String username = (String) session.getAttribute("user");
		String userid = (String) session.getAttribute("userid");
		String shopid = (String) session.getAttribute("shopid");
		String shopName = (String) session.getAttribute("shopName");
		
		String ShopNameWithoutId1 = shopName.substring(4);
		onlyShopName = ShopNameWithoutId1.trim();   
		
		cdb.setFkshopid(Long.parseLong(shopid));
		cdb.setFkuserid(Long.parseLong(userid));
		cdb.setUserName(username);
		cdb.setShopName(onlyShopName);
		
		cdo.cashCustomerDetails(cdb);
	}
	
	
}
