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

import com.Fertilizer.bean.ExpenditurePaymentDetail;
import com.Fertilizer.bean.PartnerTransactionsBean;
import com.Fertilizer.dao.BankPaymentDao;
import com.Fertilizer.dao.ExpenditurePaymentDao;
import com.Fertilizer.dao.partnerTransactionDAO;
import com.Fertilizer.hibernate.BankPaymentBean;
import com.Fertilizer.hibernate.ExpenditurePaymentBean;
import com.Fertilizer.utility.HibernateUtility;

public class BankPaymentHelper {
	
	public void regBankPayment(HttpServletRequest request,
			HttpServletResponse response) {
		
		Long transactionIdBT=0l;
		
		BankPaymentDao bkdao = new BankPaymentDao();
		List trIdListBT = bkdao.getBankTransactionLastTransactionNo();
	
		if(trIdListBT.size()<=0)
		{
			transactionIdBT=1l;
		}
		else
		{
			for (int i = 0; i < trIdListBT.size(); i++) 
			{
				BankPaymentBean bean=(BankPaymentBean) trIdListBT.get(i);
				transactionIdBT = bean.getTransNoForBank();
				transactionIdBT++;
			}
		}
		
		String bankNameId = request.getParameter("bankNameId");
		String bankNameBT = request.getParameter("bankNameBT");
		String bankTransDate = request.getParameter("bankTransDate");
		String accNumber = request.getParameter("accNumber");
		String ifscode = request.getParameter("ifscode");
		String acctantName = request.getParameter("acctantName");
		String contactNo = request.getParameter("contactNo");
		String creditAmtBT = request.getParameter("creditAmtBT");
		String debitAmtBT = request.getParameter("debitAmtBT");
		
		String paymentMode = request.getParameter("paymentMode");
		String chequeNum = request.getParameter("chequeNum");
		String cardNum = request.getParameter("cardNum");
		String accNum = request.getParameter("accNum");
		String bankName = request.getParameter("bankName");
		String nameOnCheck = request.getParameter("nameOnCheck");
		
		BankPaymentBean bean = new BankPaymentBean();
		
        String onlyShopName = "";
		
		HttpSession session1 = request.getSession(true);
		
		String username = (String) session1.getAttribute("user");
		String userid = (String) session1.getAttribute("userid");
		String shopid = (String) session1.getAttribute("shopid");
		String shopName = (String) session1.getAttribute("shopName");
		
		String ShopNameWithoutId1 = shopName.substring(4);
		onlyShopName = ShopNameWithoutId1.trim();
		
		bean.setTransNoForBank(transactionIdBT);
		bean.setFkshopid(Long.parseLong(shopid));
		bean.setFkuserid(Long.parseLong(userid));
		bean.setUserName(username);
		bean.setShopName(onlyShopName);
		
		bean.setFkbankdetailId(Long.parseLong(bankNameId));
		bean.setBankName(bankNameBT);
		
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		Date newDate = null;
		try {
				newDate = format.parse(bankTransDate);
			} 
		catch (ParseException e1) {
			e1.printStackTrace();
		}
		bean.setInsertDate(newDate);
		
		bean.setAccountNumber(Long.parseLong(accNumber));
		bean.setIfscCode(ifscode);
		bean.setAccountantName(acctantName);
		bean.setContactNumber(Long.parseLong(contactNo));
				
		if(!"".equals(creditAmtBT))
		{
			bean.setCreditAmt(Double.parseDouble(creditAmtBT));
		}else{
			bean.setCreditAmt(0.0);
		}
		if(!"".equals(debitAmtBT)){
			bean.setDebitAmt(Double.parseDouble(debitAmtBT));
		}
		else{
			bean.setDebitAmt(0.0);
		}
		
		bean.setCardNum(Long.parseLong(cardNum));
		bean.setChequeNum(chequeNum);
		bean.setPaymentMode(paymentMode);

		bean.setAccNum(Long.parseLong(accNum));
		bean.setBankNamepay(bankName);
		bean.setNameOnCheck(nameOnCheck);
		
		
		BankPaymentDao dao = new BankPaymentDao();
		dao.addBankPayment(bean);			
	}
	
	public List getBankTransactionsPerbank(HttpServletRequest request, HttpServletResponse response)
	{
        String bankId = request.getParameter("bankId");
		
        Map<Long,BankPaymentBean> map = new HashMap<Long,BankPaymentBean>();
		
        BankPaymentDao dao = new BankPaymentDao();
		List<BankPaymentBean> bankList = dao.getBankTransactionsAsPerName(bankId);
		
		return bankList;
	
	}

}
