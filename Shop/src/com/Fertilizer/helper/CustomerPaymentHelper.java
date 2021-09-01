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
import org.hibernate.Transaction;

import com.Fertilizer.bean.CreditCustPaymentDetail;
import com.Fertilizer.bean.SaleReports;
import com.Fertilizer.dao.CustomerPaymentDao;
import com.Fertilizer.dao.FertilizerBillDao;
import com.Fertilizer.dao.GoodsReceiveDao;
import com.Fertilizer.dao.SupplierPaymentDao;
import com.Fertilizer.hibernate.CustomerPaymentBean;
import com.Fertilizer.hibernate.FertilizerBillBean;
import com.Fertilizer.hibernate.GoodsReceiveBean;
import com.Fertilizer.hibernate.SupplierPaymentBean;
import com.Fertilizer.utility.HibernateUtility;

public class CustomerPaymentHelper {

	Double bal  ;
	
	public void regCreditCustomerCashBank(HttpServletRequest request,
			HttpServletResponse response)
	{
			Long transactionIdCust=0l;
		
			CustomerPaymentDao dao11 = new CustomerPaymentDao();
			List trIdListCust = dao11.getCustPayLastTransactionNo();
		
			if(trIdListCust.size()<=0)
			{
				transactionIdCust=1l;
			}
			else
			{
				for (int i = 0; i < trIdListCust.size(); i++) {
			
					CustomerPaymentBean bean=(CustomerPaymentBean) trIdListCust.get(i);
					transactionIdCust = bean.getTransNoForCustomer();
					transactionIdCust++;
			
				}
			}
		
		System.out.println("In helper");
			
			String customer = request.getParameter("customer");
			String billNo = request.getParameter("billNo");
			String totalAmount = request.getParameter("totalAmount");
			String bankName = request.getParameter("bankName");
			String custPay = request.getParameter("custPay");
			String paymentMode = request.getParameter("paymentMode");
			String chequeNum = request.getParameter("chequeNum");
			String cardNum = request.getParameter("cardNum");
			String accNum = request.getParameter("accNum");
			String personname = request.getParameter("personname");
			String nameOnCheck = request.getParameter("nameOnCheck");
			String paymentType = request.getParameter("paymentType");
			String shopId = request.getParameter("shopId");
			String cusDate = request.getParameter("cusDate");
			String cust = request.getParameter("cust");
			CustomerPaymentBean bean = new CustomerPaymentBean();
			
			bean.setTransNoForCustomer(transactionIdCust);
		//	bean.setCatId(Long.parseLong(catId));
			bean.setCustomer(Long.parseLong(customer));
			bean.setBillNo(Long.parseLong(billNo));
			bean.setShopId(Long.parseLong(shopId));
			bean.setPersonname(personname);			
			System.out.println("paymentMode "+paymentMode);
			bean.setCustomername(cust);
			
			String onlyShopName = "";
			
			HttpSession session11 = request.getSession(true);
			
			String username = (String) session11.getAttribute("user");
			String userid = (String) session11.getAttribute("userid");
			//String shopid = (String) session11.getAttribute("shopid");
			String shopName = (String) session11.getAttribute("shopName");
			
			String ShopNameWithoutId1 = shopName.substring(4);
			onlyShopName = ShopNameWithoutId1.trim();
			
			bean.setFkuserid(Long.parseLong(userid));
			bean.setUserName(username);
			bean.setShopName(onlyShopName);
			
			//payment details
			if(paymentMode==null){
				bean.setPaymentMode("N/A");
			}
			else{
				bean.setPaymentMode(paymentMode);
			}
		 
		    if(paymentMode.equals("cheque1")){
			
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
		else if(paymentMode.equals("card1")){
			
				int cardNumLength = cardNum.length();
				 if(cardNumLength > 0){
						
						bean.setCardNum(Long.parseLong(cardNum));
					}
					else{
						bean.setCardNum(null);
					}
		}
	
		else if(paymentMode.equals("neft1")){
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
		 
			SimpleDateFormat dateFormat1 = new SimpleDateFormat("yyyy-MM-dd");
			Date dateobj = null;
//			System.out.println(dateFormat1.format(dateobj));
		
			try
			{
				dateobj = dateFormat1.parse(cusDate);

			} catch (ParseException e)
			{
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

			bean.setInsertDate(dateobj);
			
			
			HibernateUtility hbu = HibernateUtility.getInstance();
			Session session = hbu.getHibernateSession();
			
			HibernateUtility hbu2 = HibernateUtility.getInstance();
			Session session2 = hbu2.getHibernateSession();
			
			//Query to get latest paid amount
			Query query = session.createSQLQuery("SELECT balance ,bill_no from credit_customer_payment WHERE bill_no =:billNo ORDER BY pk_credit_customer_id  DESC LIMIT 1 ;");
			query.setParameter("billNo",billNo);
			List<Object[]> list = query.list();
			
			System.out.println("Calc total");
			
			for (Iterator iterator = list.iterator(); iterator.hasNext();) {
				Object[] objects = (Object[]) iterator.next();
				String newBal = objects[0].toString();
					//BigDecimal bigDecimal = new BigDecimal(newBal);
	                bal= Double.valueOf(newBal);
				System.out.println(bal+"  bal");
				System.out.println("Calc balance");
			}
		
			if (bal==null) {
				
                Double balance = Double.parseDouble(totalAmount);
				
				if(paymentType.equals("credit"))
				{
					Double newBal = balance - Double.parseDouble(custPay);
					
					Transaction transaction = session.beginTransaction();
					
					bean.setBalance(newBal);
					bean.setPaymentType(paymentType);
					bean.setCredit(Double.parseDouble(custPay));
					
					FertilizerBillDao dao1 = new FertilizerBillDao();
			        List stkList2  = dao1.getAllSaleEntry();
			        
			        System.out.println("List size"+stkList2.size());
			        
			        Query query2 = session2.createQuery("UPDATE FertilizerBillBean set bill_payment_pending = "+newBal+" WHERE bill_no = "+billNo);
			        query2.executeUpdate();
					
			        /*for(int j=0;j<stkList2.size();j++){
			        	
			        FertilizerBillBean st = (FertilizerBillBean)stkList2.get(j);
					Long bill=st.getBillNo();
					String dbBill=bill.toString();
					Long getPkfertilizerBillId=st.getPkfertilizerBillId();
					
					if(billNo.equals(dbBill)){
					
					System.out.println("inside if");
						
					FertilizerBillBean updateStock = (FertilizerBillBean) session.get(FertilizerBillBean.class, new Long(getPkfertilizerBillId));
					updateStock.setBillPaymentPending(newBal);
            		session.saveOrUpdate(updateStock);
            		if(!transaction.wasCommitted())
            		{
            			transaction.commit();
            		}
            		//transaction.commit();
					}
					}*/
				}
				
				else{
					if(paymentType.equals("debit"))
					{
						Double newBal = balance + Double.parseDouble(custPay);
						
						 Transaction transaction = session.beginTransaction();
						
						bean.setBalance(newBal);
						bean.setPaymentType(paymentType);
						bean.setCredit(Double.parseDouble(custPay));
						
						FertilizerBillDao dao1 = new FertilizerBillDao();
				        List stkList2  = dao1.getAllSaleEntry();
				        
				        System.out.println("List size"+stkList2.size());
						
				        Query query2 = session2.createQuery("UPDATE FertilizerBillBean set bill_payment_pending = "+newBal+" WHERE bill_no = "+billNo);
				        query2.executeUpdate();
				        
				       /* for(int j=0;j<stkList2.size();j++){
				        	
				        FertilizerBillBean st = (FertilizerBillBean)stkList2.get(j);
						Long bill=st.getBillNo();
						String dbBill=bill.toString();
						Long getPkfertilizerBillId=st.getPkfertilizerBillId();
						
						if(billNo.equals(dbBill)){
						
						System.out.println("inside if");
							
						FertilizerBillBean updateStock = (FertilizerBillBean) session.get(FertilizerBillBean.class, new Long(getPkfertilizerBillId));
						updateStock.setBillPaymentPending(newBal);
	            		session.saveOrUpdate(updateStock);
	            		if(!transaction.wasCommitted())
	            		{
	            			transaction.commit();
	            		}
	            		//transaction.commit();
						}
						}*/
					}
					else{
					
					bean.setCredit(0.0);
					}
				}
				
				bean.setTotalAmount(Double.parseDouble(totalAmount));
									
				CustomerPaymentDao dao = new CustomerPaymentDao();
				dao.regCustomerPayment(bean);
			}
			
			else{
				
					Double balance = Double.parseDouble(totalAmount);
				
				
				
				if(paymentType.equals("credit"))
				{
					Double newBal = bal - Double.parseDouble(custPay);
					
					 Transaction transaction = session.beginTransaction();
					
					bean.setBalance(newBal);
					bean.setPaymentType(paymentType);
					bean.setCredit(Double.parseDouble(custPay));
					
					FertilizerBillDao dao1 = new FertilizerBillDao();
			        List stkList2  = dao1.getAllSaleEntry();
			        
			        System.out.println("List size"+stkList2.size());
			        
			        
			        Query query2 = session2.createQuery("UPDATE FertilizerBillBean set bill_payment_pending = "+newBal+" WHERE bill_no = "+billNo);
			        query2.executeUpdate();
			        
					
			        /*for(int j=0;j<stkList2.size();j++){
			        	
			        FertilizerBillBean st = (FertilizerBillBean)stkList2.get(j);
					Long bill=st.getBillNo();
					String dbBill=bill.toString();
					Long getPkfertilizerBillId=st.getPkfertilizerBillId();
					
					
					if(billNo.equals(dbBill)){
					
					System.out.println("inside if");
						
					FertilizerBillBean updateStock = (FertilizerBillBean) session.get(FertilizerBillBean.class, new Long(getPkfertilizerBillId));
					updateStock.setBillPaymentPending(newBal); 
            		session.saveOrUpdate(updateStock);
            		
            		if(!transaction.wasCommitted())
            		{
            			transaction.commit();
            		}
            		
            	//	transaction.commit();
					}
					}*/
				}
				
				else{
					if(paymentType.equals("debit"))
					{
						Double newBal = bal + Double.parseDouble(custPay);
						
						 Transaction transaction = session.beginTransaction();
						/*System.out.println("debit balance = "+supPay);
						System.out.println("current balace = "+balance);
						System.out.println("debit balance = " +newBal);*/
						bean.setBalance(newBal);
						bean.setPaymentType(paymentType);
						bean.setCredit(Double.parseDouble(custPay));
						
						FertilizerBillDao dao1 = new FertilizerBillDao();
				        List stkList2  = dao1.getAllSaleEntry();
				        
				        System.out.println("List size"+stkList2.size());
				        
				        Query query2 = session2.createQuery("UPDATE FertilizerBillBean set bill_payment_pending = "+newBal+" WHERE bill_no = "+billNo);
				        query2.executeUpdate();
						
				       /* for(int j=0;j<stkList2.size();j++){
				        	
				        FertilizerBillBean st = (FertilizerBillBean)stkList2.get(j);
						Long bill=st.getBillNo();
						String dbBill=bill.toString();
						Long getPkfertilizerBillId=st.getPkfertilizerBillId();
						
						
						if(billNo.equals(dbBill)){
						
						System.out.println("inside if");
							
						FertilizerBillBean updateStock = (FertilizerBillBean) session.get(FertilizerBillBean.class, new Long(getPkfertilizerBillId));
						updateStock.setBillPaymentPending(newBal);	            		 
	            		session.saveOrUpdate(updateStock);
	            		if(!transaction.wasCommitted())
	            		{
	            			transaction.commit();
	            		}
	            		//transaction.commit();
						}
						}*/
					}
					else{
					
					bean.setCredit(0.0);
					}
				}

				bean.setTotalAmount(Double.parseDouble(totalAmount));
								
				HttpSession shopIdSession = request.getSession();
				shopIdSession.setAttribute("shopId", shopId);
												
				CustomerPaymentDao dao = new CustomerPaymentDao();
				dao.regCustomerPayment(bean);	
			}
	}
	
	public List getCustDetailsByDate(HttpServletRequest request,
			HttpServletResponse response) {
		
		String fDate = request.getParameter("fisDate");
        String tDate = request.getParameter("endDate");
        String fkCustomerId = request.getParameter("fkCustomerId");
		
        Map<Long,CreditCustPaymentDetail> map = new HashMap<Long,CreditCustPaymentDetail>();
		
        CustomerPaymentDao dao = new CustomerPaymentDao();
		List<CreditCustPaymentDetail> custList = dao.getCreditCustomerDetailsDateWise(fDate,tDate,fkCustomerId);
		
		
		return custList;
	}
	//
	public List getpayDetailsByDate(HttpServletRequest request,
			HttpServletResponse response) {
		
		String fDate = request.getParameter("fisDate");
        String tDate = request.getParameter("endDate");
        String fkCustomerId = request.getParameter("fkCustomerId");
		
        Map<Long,CreditCustPaymentDetail> map = new HashMap<Long,CreditCustPaymentDetail>();
		
        CustomerPaymentDao dao = new CustomerPaymentDao();
		List<CreditCustPaymentDetail> custList = dao.getpayDetailsDateWise(fDate,tDate,fkCustomerId);
		
		
		return custList;
	}
	
	public List getCustPaymentDetailsBySingleDate(HttpServletRequest request,
			HttpServletResponse response) {
	
			String fDate = request.getParameter("fDate");
			
	         Map<Long,CreditCustPaymentDetail> map = new HashMap<Long,CreditCustPaymentDetail>();
	 		
	         CustomerPaymentDao dao = new CustomerPaymentDao();
	 		List<CreditCustPaymentDetail> cust1List = dao.getCreditCustPaymentDetailsForSingleDate(fDate);
	 		
	 		
	 		return cust1List;
	}
	public List getCustPaymentDetailsByBill(HttpServletRequest request,
			HttpServletResponse response) {

		
		String billNo = request.getParameter("billNo");
		String fkCustomerId = request.getParameter("fkCustomerId");
		String catId = request.getParameter("cat");
		
         Map<Long,CreditCustPaymentDetail> map = new HashMap<Long,CreditCustPaymentDetail>();
 		
         CustomerPaymentDao dao = new CustomerPaymentDao();
 		List<CreditCustPaymentDetail> cust1List = dao.getCreditCustPaymentDetailsAsPerBillNum(billNo,fkCustomerId,catId);
 		
 		
 		return cust1List;

	}
	public List getCustPaymentDetailsByNames(HttpServletRequest request,
			HttpServletResponse response) {
		String fkCustomerId = request.getParameter("fkCustomerId");
		
        Map<Long,CreditCustPaymentDetail> map = new HashMap<Long,CreditCustPaymentDetail>();
		
        CustomerPaymentDao dao = new CustomerPaymentDao();
		List<CreditCustPaymentDetail> cust1List = dao.getCreditCustPaymentDetailsAsPerName(fkCustomerId);
		
		
		return cust1List;
	}

}
