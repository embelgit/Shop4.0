package com.Fertilizer.helper;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.Fertilizer.bean.EmployeePaymentDetail;
import com.Fertilizer.bean.SupplierPaymentDetail;
import com.Fertilizer.dao.CustomerPaymentDao;
import com.Fertilizer.dao.EmployeePaymentDao;
import com.Fertilizer.dao.SupplierPaymentDao;
import com.Fertilizer.hibernate.CustomerPaymentBean;
import com.Fertilizer.hibernate.EmployeePaymentBean;

public class EmployeePaymentHelper {

	public void regEmployeePayment(HttpServletRequest request,
			HttpServletResponse response) {
		
		Long transactionIdEmp=0l;
		
		EmployeePaymentDao dao11 = new EmployeePaymentDao();
		List trIdListEmp = dao11.getEmpLastTransactionNo();
	
		if(trIdListEmp.size() <= 0)
		{
			transactionIdEmp=1l;
		}
		else
		{
			for (int i = 0; i < trIdListEmp.size(); i++)
			{
				EmployeePaymentBean bean=(EmployeePaymentBean) trIdListEmp.get(i);
				transactionIdEmp = bean.getTransNoForEmployee();
				transactionIdEmp++;
			}
		}
		
		System.out.println("IN helper");
	
		String employee = request.getParameter("employee");
		String employeename = request.getParameter("employeename");
		String empPay = request.getParameter("empPay");
		String personName = request.getParameter("personName");
		String reason = request.getParameter("reason");
		String paymentMode = request.getParameter("paymentMode");
		String chequeNum = request.getParameter("chequeNum");
		String cardNum = request.getParameter("cardNum");
		String accNum = request.getParameter("accNum");
		String bankName = request.getParameter("bankName");
		String nameOnCheck = request.getParameter("nameOnCheck");
		String paymentType = request.getParameter("paymentType");
		String empDate = request.getParameter("empDate");
		System.out.println("empDate - "+empDate);
		EmployeePaymentBean bean = new EmployeePaymentBean();
		
		bean.setTransNoForEmployee(transactionIdEmp);
		bean.setFk_employee_id(Long.parseLong(employee));
		bean.setEmployeeName(employeename);
		bean.setPaymentType(paymentType);
		bean.setCredit(Double.parseDouble(empPay));
		bean.setPersonName(personName);
		bean.setReason(reason);
		
		SimpleDateFormat dateFormat1 = new SimpleDateFormat("yyyy-MM-dd");
		
		Date pDD = null;
		try {
			pDD = dateFormat1.parse(empDate);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	//	bean.setPurchaseDate(pDD);
	
		bean.setInsertDate(pDD);
		System.out.println("set = "+bean.getInsertDate());
		//payment details
		if(paymentMode==null){
			bean.setPaymentMode("N/A");
		}
		else{
			bean.setPaymentMode(paymentMode);
		}
	 
	if(paymentMode.equals("cheque2")){
		
		 if(chequeNum==null){
				bean.setChequeNum("N/A");
			}
			else{
				bean.setChequeNum(chequeNum);
			}
		 
		 if(nameOnCheck==null){
				bean.setNameOnCheck("N/A");
			}
			else{
				bean.setNameOnCheck(nameOnCheck);
			}
		 }
	else if(paymentMode.equals("card2")){
		
			int cardNumLength = cardNum.length();
			 if(cardNumLength > 0){
					
					bean.setCardNum(Long.parseLong(cardNum));
				}
				else{
					bean.setCardNum(null);
				}
	}

	else if(paymentMode.equals("neft2")){
		 if(bankName==null){
				bean.setBankName("N/A");
			}
			else{
				bean.setBankName(bankName);
			}
		 
	 int accNumLength = accNum.length();
	 if(accNumLength > 0){
		 bean.setAccNum(Long.parseLong(accNum));	
		
		}
		else{
			 bean.setAccNum(null);
		}
	 }
	
		String onlyShopName1 = "";
		
		HttpSession session = request.getSession(true);
		
		String username = (String) session.getAttribute("user");
		String userid = (String) session.getAttribute("userid");
		String shopid = (String) session.getAttribute("shopid");
		String shopName1 = (String) session.getAttribute("shopName");
		
		String ShopNameWithoutId11 = shopName1.substring(4);
		onlyShopName1 = ShopNameWithoutId11.trim();
		
		bean.setFkshopid(Long.parseLong(shopid));
		bean.setFkuserid(Long.parseLong(userid));
		bean.setUserName(username);
		bean.setShopName(onlyShopName1);
	
		EmployeePaymentDao dao = new EmployeePaymentDao();
		dao.regEmpPayment(bean);
		
		HttpSession transactionIDsession = request.getSession(true);
        String shopName = (String) transactionIDsession.getAttribute("shopName");
		
		String ShopNameWithoutId1 = shopName.substring(4);
		String onlyShopName = ShopNameWithoutId1.trim();
		
		transactionIDsession.setAttribute("transactionIdEmp", transactionIdEmp);
		transactionIDsession.setAttribute("onlyShopName", onlyShopName);
		
	}

	public List getEmployeePaymentDetailsForSingleDate(
			HttpServletRequest request, HttpServletResponse response) {
		
		String fDate = request.getParameter("fDate");
		System.out.println(fDate+"Single Date");
		
         Map<Long,EmployeePaymentDetail> map = new HashMap<Long,EmployeePaymentDetail>();
 		
         EmployeePaymentDao dao = new EmployeePaymentDao();
 		List<EmployeePaymentDetail> empList = dao.getempPaymentDetailsForSingleDate(fDate);
 		
 		
 		return empList;
	}

	public List getEmpPaymentByTwoDate(HttpServletRequest request,
			HttpServletResponse response) {
		
		String fDate = request.getParameter("fisDate");
        String tDate = request.getParameter("endDate");
        String fkEmployeeId = request.getParameter("fkEmployeeId");
		
        Map<Long,EmployeePaymentDetail> map = new HashMap<Long,EmployeePaymentDetail>();
		
        EmployeePaymentDao dao = new EmployeePaymentDao();
		List<EmployeePaymentDetail> emp1List = dao.getEmployeePaymentDetailsDateWise(fDate,tDate,fkEmployeeId);
		
		
		return emp1List;
	
	
	}
//
	public List getEmpPaymentmode(HttpServletRequest request,
			HttpServletResponse response) {
		
		String fDate = request.getParameter("fisDate");
        String tDate = request.getParameter("endDate");
        String paymode = request.getParameter("paymode");
		
        Map<Long,EmployeePaymentDetail> map = new HashMap<Long,EmployeePaymentDetail>();
		
        EmployeePaymentDao dao = new EmployeePaymentDao();
		List<EmployeePaymentDetail> emp1List = dao.getEmployeePaymentmodeWise(fDate,tDate,paymode);
		
		
		return emp1List;
	
	
	}
	
}
