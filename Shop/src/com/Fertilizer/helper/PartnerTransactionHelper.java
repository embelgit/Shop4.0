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
import com.Fertilizer.dao.ExpenditurePaymentDao;
import com.Fertilizer.dao.partnerDetailsDao;
import com.Fertilizer.dao.partnerTransactionDAO;
import com.Fertilizer.hibernate.ExpenditurePaymentBean;
import com.Fertilizer.hibernate.PartnerDetailsBeanH;
import com.Fertilizer.hibernate.PartnerTransactionBeanH;
import com.Fertilizer.utility.HibernateUtility;

public class PartnerTransactionHelper
{
	Double bal;
	
	public void regPartnerPayment(HttpServletRequest request, HttpServletResponse response)
	{
		Long transactionIdPT=0l;
		
		partnerDetailsDao dao11 = new partnerDetailsDao();
		List trIdListPT = dao11.getPartnerTransactionLastTransactionNo();
	
		if(trIdListPT.size()<=0)
		{
			transactionIdPT=1l;
		}
		else
		{
			for (int i = 0; i < trIdListPT.size(); i++)
			{
			
				PartnerTransactionBeanH bean=(PartnerTransactionBeanH) trIdListPT.get(i);
				transactionIdPT = bean.getTransactoin_No_partner_Transactions();
				transactionIdPT++;			
			}
		}
		
		String fkRootPartnerId = request.getParameter("fkRootPartnerId");
		String paymentTypePT = request.getParameter("paymentTypePT");
		String creditAmtPT = request.getParameter("creditAmtPT");
		String debitAmtPT = request.getParameter("debitAmtPT");
		String accountantNamePT = request.getParameter("accountantNamePT");
		String partnerName = request.getParameter("partnerName");
		String paymentMode = request.getParameter("paymentMode");
		String chequeNum = request.getParameter("chequeNum");
		String cardNum = request.getParameter("cardNum");
		String accNum = request.getParameter("accNum");
		String bankName = request.getParameter("bankName");
		String nameOnCheck = request.getParameter("nameOnCheck");
		String partDate = request.getParameter("partDate");
		System.out.println("name - "+partnerName);
		PartnerTransactionBeanH bean = new PartnerTransactionBeanH();
		
		HibernateUtility hbu = HibernateUtility.getInstance();
		Session session = hbu.getHibernateSession();
		Query query = session.createSQLQuery("SELECT pt. total_amount, pt.fk_partner_detail_id from partnertransactions pt ORDER BY pk_partner_Transactions_id DESC LIMIT 1");
		List<Object[]> list = query.list();
		System.out.println(list.size());
		int listSize = list.size();
		
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
		bean.setPartnerName(partnerName);
		bean.setCardNum(Long.parseLong(cardNum));
		bean.setChequeNum(chequeNum);
		bean.setPaymentMode(paymentMode);

		bean.setAccNum(Long.parseLong(accNum));
		bean.setBankName(bankName);
		bean.setNameOnCheck(nameOnCheck);
		System.out.println("name set - "+bean.getPartnerName());
		if(listSize==0){
			System.out.println("if block 1");
			if(!"".equals(creditAmtPT))
			{
				bal = Double.parseDouble(creditAmtPT);
				bean.setCreditPT(bal);
				bean.setTotalAmount(bal);
				bean.setDebitPT(0.0);
				System.out.println(creditAmtPT);
			}
			
			else if(!"".equals(debitAmtPT))
					{
				bean.setTotalAmount(Double.parseDouble(debitAmtPT));
				System.out.println(debitAmtPT);
			}
			else
			{
				bean.setTotalAmount(0.0);
			}
			
			bean.setTransactoin_No_partner_Transactions(transactionIdPT);
			bean.setFk_partner_detail_id(Long.parseLong(fkRootPartnerId));
			//bean.setServiceProvider(serviceProvider);
			bean.setAccountantName(accountantNamePT);
			
			SimpleDateFormat dateFormat1 = new SimpleDateFormat("yyyy-MM-dd");
			Date pDD = null;
			try {
				pDD = dateFormat1.parse(partDate);
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			bean.setInsertDatePT(pDD);
			System.out.println("settt ============= "+bean.getInsertDatePT());
			partnerTransactionDAO dao = new partnerTransactionDAO();
			dao.addPartnerTransactionPayment(bean);
		}
		
		else if(listSize > 0) {
			System.out.println("else block 1");
			
			for (Iterator iterator = list.iterator(); iterator.hasNext();) {
				Object[] objects = (Object[]) iterator.next();
	                
				bal= (Double) objects[0];
				
				System.out.println("balance"+bal);
				
			}
			
			
			if(!"".equals(creditAmtPT)){
				
				 bal = bal + Double.parseDouble(creditAmtPT);
				 bean.setTotalAmount(bal);
				 bean.setCreditPT(Double.parseDouble(creditAmtPT));
				 if("".equals(debitAmtPT)){
					 bean.setDebitPT(0.0d);	 
				 }
				 else{
				 bean.setDebitPT(Double.parseDouble(debitAmtPT));
				 }
				 System.out.println(creditAmtPT);
				
			}
			else if(!"".equals(debitAmtPT)){
				bal = bal - Double.parseDouble(debitAmtPT);
				bean.setTotalAmount(bal);
				bean.setDebitPT(Double.parseDouble(debitAmtPT));
				if("".equals(creditAmtPT)){
				bean.setCreditPT(0.0d);
				}
				else{
					bean.setCreditPT(Double.parseDouble(creditAmtPT));
				}
			}
			
			bean.setTransactoin_No_partner_Transactions(transactionIdPT);
			bean.setFk_partner_detail_id(Long.parseLong(fkRootPartnerId));
			//bean.setServiceProvider(serviceProvider);
			bean.setAccountantName(accountantNamePT);
			
			SimpleDateFormat dateFormat1 = new SimpleDateFormat("yyyy-MM-dd");
			Date pDDa = null;
			try {
				pDDa = dateFormat1.parse(partDate);
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			bean.setInsertDatePT(pDDa);
//			bean.setInsertDatePT(dateobj);
			partnerTransactionDAO dao = new partnerTransactionDAO();
			dao.addPartnerTransactionPayment(bean);
		}
	}
	
	public List getPartnersTransactionsPerName(HttpServletRequest request, HttpServletResponse response)
	{
        String partnerId = request.getParameter("partnerId");
		
        Map<Long,ExpenditurePaymentDetail> map = new HashMap<Long,ExpenditurePaymentDetail>();
		
        partnerTransactionDAO dao = new partnerTransactionDAO();
		List<PartnerTransactionsBean> exp1List = dao.getPartnersTransactionsAsPerName(partnerId);
		
		return exp1List;
	
	}
		
}
