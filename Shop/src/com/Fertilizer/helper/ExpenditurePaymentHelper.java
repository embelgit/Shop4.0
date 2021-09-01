package com.Fertilizer.helper;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.hibernate.Query;
import org.hibernate.Session;

import com.Fertilizer.bean.CreditDebitReportBean;
import com.Fertilizer.bean.EmployeePaymentDetail;
import com.Fertilizer.bean.ExpenditurePaymentDetail;
import com.Fertilizer.dao.EmployeePaymentDao;
import com.Fertilizer.dao.ExpenditurePaymentDao;
import com.Fertilizer.hibernate.EmployeePaymentBean;
import com.Fertilizer.hibernate.ExpenditurePaymentBean;
import com.Fertilizer.utility.HibernateUtility;

public class ExpenditurePaymentHelper {
	
	Double bal;
	public void regExpensePayment(HttpServletRequest request,
			HttpServletResponse response) {
		
		Long transactionIdExp=0l;
		
		ExpenditurePaymentDao dao11 = new ExpenditurePaymentDao();
		List trIdListExp = dao11.getExpenditureLastTransactionNo();
	
		if(trIdListExp.size()<=0)
		{
			transactionIdExp=1l;
		}
		else
		{
			for (int i = 0; i < trIdListExp.size(); i++) 
			{
				ExpenditurePaymentBean bean=(ExpenditurePaymentBean) trIdListExp.get(i);
				transactionIdExp = bean.getTransNoForExpenditure();
				transactionIdExp++;
			}
		}
		
		String expenseType = request.getParameter("expenseType");
		String expenseName = request.getParameter("expenseName");
		String expCredit = request.getParameter("expCredit");
		String expDebit = request.getParameter("expDebit");
		String contactNumber = request.getParameter("contactNumber");
		String accountantName = request.getParameter("accountantName");
				
		String paymentMode = request.getParameter("paymentMode");
		String chequeNum = request.getParameter("chequeNum");
		String cardNum = request.getParameter("cardNum");
		String accNum = request.getParameter("accNum");
		String bankName = request.getParameter("bankName");
		String nameOnCheck = request.getParameter("nameOnCheck");
		String expDate = request.getParameter("expDate");
		
		ExpenditurePaymentBean bean = new ExpenditurePaymentBean();
		
		HibernateUtility hbu = HibernateUtility.getInstance();
		Session session = hbu.getHibernateSession();
		Query query = session.createSQLQuery("SELECT total_amount ,fk_expense_detail_id from expenditure_payment ORDER BY  pk_expenditure_payment_id  DESC LIMIT 1");
		List<Object[]> list = query.list();
		System.out.println(list.size());
		int listSize = list.size();
		System.out.println("list size in helper --> "+listSize);
		
        String onlyShopName = "";
		
		HttpSession session1 = request.getSession(true);
		
		String username = (String) session1.getAttribute("user");
		String userid = (String) session1.getAttribute("userid");
		String shopid = (String) session1.getAttribute("shopid");
		String shopName = (String) session1.getAttribute("shopName");
		
		String ShopNameWithoutId1 = shopName.substring(4);
		onlyShopName = ShopNameWithoutId1.trim();
		
		bean.setFkshopid(Long.parseLong(shopid));
		bean.setFkuserid(Long.parseLong(userid));
		bean.setUserName(username);
		bean.setShopName(onlyShopName);
	
		bean.setCardNum(Long.parseLong(cardNum));
		bean.setChequeNum(chequeNum);
		bean.setPaymentMode(paymentMode);

		bean.setAccNum(Long.parseLong(accNum));
		bean.setBankName(bankName);
		bean.setNameOnCheck(nameOnCheck);
		
		if(listSize==0){
			
			System.out.println("if block 1");
			if(!"".equals(expCredit))
			{
				bal = Double.parseDouble(expCredit);
				bean.setExpcredit(bal);
				bean.setTotalAmount(bal);
				bean.setExpDebit(0.0);
				System.out.println(expCredit);
			}
			
			else if(!"".equals(expDebit))
					{
				bean.setTotalAmount(Double.parseDouble(expDebit));
				System.out.println(expDebit);
			}
			else
			{
				bean.setTotalAmount(0.0);
			}
			bean.setExpenseType(expenseType);
			bean.setTransNoForExpenditure(transactionIdExp);
			bean.setFkExpDetailId(Long.parseLong(expenseName));
			//bean.setServiceProvider(serviceProvider);
			bean.setAccountantName(accountantName);
			bean.setContactNumber(Long.parseLong(contactNumber));
			
			SimpleDateFormat dateFormat1 = new SimpleDateFormat("yyyy-MM-dd");
			
			Date pDD = null;
			try {
				pDD = dateFormat1.parse(expDate);
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

			
			bean.setInsertDate(pDD);
			System.out.println("set == "+bean.getInsertDate());
			ExpenditurePaymentDao dao = new ExpenditurePaymentDao();
			dao.addExpensePayment(bean);
		}
		
		else if(listSize > 0) {
			
			System.out.println("else block 1");
			
			for (Iterator iterator = list.iterator(); iterator.hasNext();) {
				Object[] objects = (Object[]) iterator.next();
	                
				bal= (Double) objects[0];
				
				System.out.println("balance--------------> "+bal);
			}
		
			if(!"".equals(expCredit)){
				
				System.out.println("Not Equal To expCredit--------> "+expCredit);
				 bal = bal + Double.parseDouble(expCredit);
				 bean.setTotalAmount(bal);
				 bean.setExpcredit(Double.parseDouble(expCredit));
				 bean.setExpDebit(0.0d);
				 /*if("".equals(expDebit)){
					 bean.setExpDebit(0.0d);	 
				 }
				 else{
				 bean.setExpDebit(Double.parseDouble(expDebit));
				 }*/
				 System.out.println(expCredit);
				
			}
			else if(!"".equals(expDebit)){
				
				System.out.println("Not Equal To expDebit--------> "+expDebit);
				bal = bal - Double.parseDouble(expDebit);
				bean.setTotalAmount(bal);
				bean.setExpDebit(Double.parseDouble(expDebit));
				bean.setExpcredit(0.0d);
				/*if("".equals(expCredit)){
				bean.setExpcredit(0.0d);
				}
				else{
					bean.setExpcredit(Double.parseDouble(expCredit));
				}*/
			}
			bean.setExpenseType(expenseType);
			bean.setTransNoForExpenditure(transactionIdExp);
			bean.setFkExpDetailId(Long.parseLong(expenseName));
			//bean.setServiceProvider(serviceProvider);
			bean.setAccountantName(accountantName);
			bean.setContactNumber(Long.parseLong(contactNumber));
			
			/*
			 * SimpleDateFormat dateFormat1 = new SimpleDateFormat("yyyy-MM-dd"); Date
			 * dateobj = new Date(); System.out.println(dateFormat1.format(dateobj));
			 * 
			 * bean.setInsertDate(dateobj);
			 */
			SimpleDateFormat dateFormat1 = new SimpleDateFormat("yyyy-MM-dd");
			Date pDD = null;
			try {
				pDD = dateFormat1.parse(expDate);
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

			
			bean.setInsertDate(pDD);
			System.out.println("set == "+bean.getInsertDate());
			
			ExpenditurePaymentDao dao = new ExpenditurePaymentDao();
			dao.addExpensePayment(bean);
		}		
	}
	public List getExpensePaymentDetailsForSingleDate(
			HttpServletRequest request, HttpServletResponse response) {
		
		String fDate = request.getParameter("fDate");
		System.out.println(fDate+"Single Date");
		
         Map<Long,ExpenditurePaymentDetail> map = new HashMap<Long,ExpenditurePaymentDetail>();
 		
         ExpenditurePaymentDao dao = new ExpenditurePaymentDao();
 		List<ExpenditurePaymentDetail> expList = dao.getExpensePaymentDetailsForSingleDate(fDate);
 		
 		
 		return expList;
	}
	//
	public List getExpensePaymentmode(
			HttpServletRequest request, HttpServletResponse response) {
		
		String paymode = request.getParameter("paymode");
		String startDate = request.getParameter("startDate");
		String endDate = request.getParameter("endDate");
		
		System.out.println(paymode+"  - paymode  Date - "+startDate+" endDate - "+endDate);
		
         Map<Long,ExpenditurePaymentDetail> map = new HashMap<Long,ExpenditurePaymentDetail>();
 		
         ExpenditurePaymentDao dao = new ExpenditurePaymentDao();
 		List<ExpenditurePaymentDetail> expList = dao.getExpensePaymentmode(startDate,endDate,paymode);
 		
 		
 		return expList;
	}
	
	
	public List getExpensePaymentDetailByTwoDate(HttpServletRequest request,
			HttpServletResponse response) {

		String fDate = request.getParameter("fisDate");
        String tDate = request.getParameter("endDate");
		
        Map<Long,ExpenditurePaymentDetail> map = new HashMap<Long,ExpenditurePaymentDetail>();
		
        ExpenditurePaymentDao dao = new ExpenditurePaymentDao();
		List<ExpenditurePaymentDetail> exp1List = dao.getExpensePaymentDetailByTwoDates(fDate,tDate);
		
		
		return exp1List;
	
	
	}
	
	public List getExpensePaymentDetailByTwoDatePerName(HttpServletRequest request,
			HttpServletResponse response) {

		String fDate = request.getParameter("fisDate");
        String tDate = request.getParameter("endDate");
        String expenseName = request.getParameter("expenseName");
		
        Map<Long,ExpenditurePaymentDetail> map = new HashMap<Long,ExpenditurePaymentDetail>();
		
        ExpenditurePaymentDao dao = new ExpenditurePaymentDao();
		List<ExpenditurePaymentDetail> exp1List = dao.getExpensePaymentDetailByTwoDatesPerName(fDate,tDate,expenseName);
				
		return exp1List;
	}
	
	public List getTodayCreditDebitReport(HttpServletRequest request,
			HttpServletResponse response) {
		
        Map<Long,CreditDebitReportBean> map = new HashMap<Long,CreditDebitReportBean>();
		
        ExpenditurePaymentDao dao = new ExpenditurePaymentDao();
		List<CreditDebitReportBean> exp1List = dao.getTodayCreditDebitReport();
		
		
		return exp1List;
	}
	public List getTodayCreditDebitReport1(HttpServletRequest request,
			HttpServletResponse response) {
		// TODO Auto-generated method stub
		 Map<Long,CreditDebitReportBean> map = new HashMap<Long,CreditDebitReportBean>();
			
	        ExpenditurePaymentDao dao = new ExpenditurePaymentDao();
			List<CreditDebitReportBean> exp1List = dao.getTodayCreditDebitReport1();
			
			
			return exp1List;
	}
	
	
	
	public List creditdebitForsingleDate(HttpServletRequest request,
			HttpServletResponse response) {
		// TODO Auto-generated method stub
		 String fDate = request.getParameter("fDate");
		 Map<Long,CreditDebitReportBean> map = new HashMap<Long,CreditDebitReportBean>();
			
	        ExpenditurePaymentDao dao = new ExpenditurePaymentDao();
			List<CreditDebitReportBean> exp1List = dao.creditdebitForsingleDate(fDate);
			
			
			return exp1List;
		
	}
	public List creditdebitForsingleDate1(HttpServletRequest request,
			HttpServletResponse response) {
		// TODO Auto-generated method stub
		String fDate = request.getParameter("fDate");
		 Map<Long,CreditDebitReportBean> map = new HashMap<Long,CreditDebitReportBean>();
			
	        ExpenditurePaymentDao dao = new ExpenditurePaymentDao();
			List<CreditDebitReportBean> exp1List = dao.creditdebitForsingleDate1(fDate);
			
			
			return exp1List;
	}
	public List creditdebitForBetTowDate(HttpServletRequest request,
			HttpServletResponse response) {
		// TODO Auto-generated method stub
		String fDate = request.getParameter("fisDate");
		String nDate = request.getParameter("endDate");
		
		 Map<Long,CreditDebitReportBean> map = new HashMap<Long,CreditDebitReportBean>();
			
	        ExpenditurePaymentDao dao = new ExpenditurePaymentDao();
			List<CreditDebitReportBean> exp1List = dao.creditdebitForBetTowDate(fDate,nDate);
			
			
			return exp1List;
	}
	
	public List creditdebitForBetTowDate1(HttpServletRequest request,
			HttpServletResponse response) {
		// TODO Auto-generated method stub
		String fDate = request.getParameter("fisDate");
		String nDate = request.getParameter("endDate");
		
		 Map<Long,CreditDebitReportBean> map = new HashMap<Long,CreditDebitReportBean>();
			
	        ExpenditurePaymentDao dao = new ExpenditurePaymentDao();
			List<CreditDebitReportBean> exp1List = dao.creditdebitForBetTowDate1(fDate,nDate);
				
			return exp1List;
	}	
	
	public List getExpensePaymentDetailByExpenditureType(HttpServletRequest request,
			HttpServletResponse response) {

        String expenseType = request.getParameter("expenseType");
		
        Map<Long,ExpenditurePaymentDetail> map = new HashMap<Long,ExpenditurePaymentDetail>();
		
        ExpenditurePaymentDao dao = new ExpenditurePaymentDao();
		List<ExpenditurePaymentDetail> exp1List = dao.getExpensePaymentDetailByExpenseType(expenseType);
				
		return exp1List;
	}
}
