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
import com.Fertilizer.bean.SupplierPaymentDetail;
import com.Fertilizer.dao.CustomerPaymentDao;
import com.Fertilizer.dao.GoodsReceiveDao;
import com.Fertilizer.dao.SupplierPaymentDao;
import com.Fertilizer.dao.purchaseReturnDao;
import com.Fertilizer.hibernate.GoodsReceiveBean;
import com.Fertilizer.hibernate.SupplierPaymentBean;
import com.Fertilizer.hibernate.UserDetailsBean;
import com.Fertilizer.utility.HibernateUtility;

public class SupplierCashBankHelper {

	Double bal  ;
	
	public void regSupplierCashBank(HttpServletRequest request,
		                        	HttpServletResponse response) {
				
		Long transactionIdSupp = 0l;
		
		SupplierPaymentDao dao11 = new SupplierPaymentDao();
		List trIdListSupp = dao11.getLastTransactionNoforSupplier();
	
		if(trIdListSupp.size() <= 0)
		{		
			transactionIdSupp=1l;
		}
		else
		{
			for (int i = 0; i < trIdListSupp.size(); i++)
			{			
				SupplierPaymentBean bean=(SupplierPaymentBean) trIdListSupp.get(i);
				transactionIdSupp = bean.getTransNoForSupplier();
				transactionIdSupp++;
			}
		}
		
		    System.out.println("In helper");
			
			String supplier = request.getParameter("supplier");
			System.out.println("Supplier Id *******************======**************** "+supplier);
			
			String suppliername = request.getParameter("suppliername");
			String billNo = request.getParameter("billNo");
			String totalAmount = request.getParameter("totalAmount");
			String bankName = request.getParameter("bankName");
			String paymentType = request.getParameter("paymentType");
			String paymentMode = request.getParameter("paymentMode");
			String chequeNum = request.getParameter("chequeNum");
			String cardNum = request.getParameter("cardNum");
			String accNum = request.getParameter("accNum");
			String personname = request.getParameter("personname");
			String nameOnCheck = request.getParameter("nameOnCheck");
			String supPay = request.getParameter("supPay");
			String supDate = request.getParameter("supDate");
			
			SupplierPaymentBean bean = new SupplierPaymentBean();
			
			bean.setSupplierName(suppliername);
			bean.setTransNoForSupplier(transactionIdSupp);
			bean.setSupplier(Long.parseLong(supplier));
			bean.setBillNo((billNo));
			
			
			HttpSession session13 = request.getSession(true);
			
			String username1 = (String) session13.getAttribute("user");
			String userid1 = (String) session13.getAttribute("userid");
			String shopid1 = (String) session13.getAttribute("shopid");
			String shopName1 = (String) session13.getAttribute("shopName");
			
			session13.setAttribute("shopid", shopid1);
//			session13.setAttribute("shopName", shopName1);
			
			if(personname==""){
				bean.setPersonname("N/A");
			}
			else{
				bean.setPersonname(personname);
			}
			System.out.println("personname set -  "+bean.getPersonname());
			System.out.println("paymentMode "+paymentMode);
			
			//payment details
			if(paymentMode==null){
				bean.setPaymentMode("N/A");
			}
			else{
				bean.setPaymentMode(paymentMode);
			}
		 
		if(paymentMode.equals("cheque")){
			
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
		     else if(paymentMode.equals("card")){
			
				int cardNumLength = cardNum.length();
				if(cardNumLength > 0){
					bean.setCardNum(Long.parseLong(cardNum));
				}
				else{
					bean.setCardNum(null);
				}
		    }
	
		   else if(paymentMode.equals("neft")){
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
	//		System.out.println(dateFormat1.format(dateobj));
			try
			{
				dateobj = dateFormat1.parse(supDate);
			//	saleDateq = dateFormat.parse(supDate);
			//	System.out.println("in try block to format Date ================== " + saleDateq);
			//	sqlDate = new java.sql.Date(saleDateq.getTime());

			} catch (ParseException e)
			{
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

			bean.setInsertDate(dateobj);
			System.out.println("dateobj -set =  "+bean.getInsertDate());			
			HibernateUtility hbu = HibernateUtility.getInstance();
			Session session = hbu.getHibernateSession();
			
			HibernateUtility hbu2 = HibernateUtility.getInstance();
			Session session2 = hbu2.getHibernateSession();
			
			//Query to get latest paid amount
			Query query = session.createSQLQuery("SELECT balance, bill_no from supplier_payment WHERE bill_no =:billNo AND fk_supplier_id =:supplier ORDER BY pk_supplier_payment_id  DESC LIMIT 1 ;");
			query.setParameter("billNo",billNo);
			query.setParameter("supplier",supplier);
			List<Object[]> list = query.list();
			
			for (Iterator iterator = list.iterator(); iterator.hasNext();) {
				Object[] objects = (Object[]) iterator.next();
				String newBal = objects[0].toString();
					//BigDecimal bigDecimal = new BigDecimal(newBal);
	                bal= Double.valueOf(newBal);
				System.out.println(bal);
			}
					
			if (bal==null) {
				
				Double balance = Double.parseDouble(totalAmount);
				
				if(paymentType.equals("credit"))
				{
					Double newBal = balance - Double.parseDouble(supPay);
					
					// Transaction transaction = session.beginTransaction();
					
					bean.setBalance(newBal);
					bean.setPaymentType(paymentType);
					bean.setCredit(Double.parseDouble(supPay));
					
					GoodsReceiveDao dao1 = new GoodsReceiveDao();
			        List stkList2  = dao1.getAllPurschaseEntry();
			        
			        System.out.println("List size : "+stkList2.size());
					
			       // Query query2 = session2.createQuery("UPDATE GoodsReceiveBean set bill_payment_pending = "+newBal+" WHERE bill_number = "+billNo);
			        Query query2 = session2.createQuery("UPDATE GoodsReceiveBean set bill_payment_pending = "+newBal+" WHERE bill_number = '"+billNo+"' AND fk_supplier_id = "+supplier);
			        query2.executeUpdate();
			        
			       /* for(int j=0;j<stkList2.size();j++){
			        	
			        GoodsReceiveBean st = (GoodsReceiveBean)stkList2.get(j);
					String bill=st.getBillNum();
					Long pk_goods_receive_id=st.getPkGoodsReceiveId();
					
					if(billNo.equals(bill)){
					
					System.out.println("inside if");
						
					GoodsReceiveBean updateStock = (GoodsReceiveBean) session.get(GoodsReceiveBean.class, new Long(pk_goods_receive_id));
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
						Double newBal = balance + Double.parseDouble(supPay);
						
						// Transaction transaction = session.beginTransaction();
						
						bean.setBalance(newBal);
						bean.setPaymentType(paymentType);
						bean.setCredit(Double.parseDouble(supPay));
						
						
						GoodsReceiveDao dao1 = new GoodsReceiveDao();
				        List stkList2  = dao1.getAllPurschaseEntry();
				        
				        System.out.println("List size"+stkList2.size());
				        
				        Query query2 = session2.createQuery("UPDATE GoodsReceiveBean set bill_payment_pending = "+newBal+" WHERE bill_number = "+billNo+" AND fk_supplier_id = "+supplier);
				        query2.executeUpdate();
						
				        /*for(int j=0;j<stkList2.size();j++){
				        	
				        GoodsReceiveBean st = (GoodsReceiveBean)stkList2.get(j);
						String bill=st.getBillNum();
						Long pk_goods_receive_id=st.getPkGoodsReceiveId();
						
						if(billNo.equals(bill)){
						
						System.out.println("inside if");
							
						GoodsReceiveBean updateStock = (GoodsReceiveBean) session.get(GoodsReceiveBean.class, new Long(pk_goods_receive_id));
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
					
					bean.setCredit(0.0);
					}
				}
				
				bean.setTotalAmount(Double.parseDouble(totalAmount));
				
                String onlyShopName = "";
				
				HttpSession session11 = request.getSession(true);
				
				String username = (String) session11.getAttribute("user");
				String userid = (String) session11.getAttribute("userid");
				String shopid = (String) session11.getAttribute("shopid");
				String shopName = (String) session11.getAttribute("shopName");
				
				String ShopNameWithoutId1 = shopName.substring(4);
				onlyShopName = ShopNameWithoutId1.trim();
				
				bean.setFkshopid(Long.parseLong(shopid));
				bean.setFkuserid(Long.parseLong(userid));
				bean.setUserName(username);
				bean.setShopName(onlyShopName);
					
		    	SupplierPaymentDao dao = new SupplierPaymentDao();
			    dao.regSupPayment(bean);
			}
		  /* *********************************** WHEN BALANCE AMOUNT != NULL ****************************** */
			else{
				
				Double balance = Double.parseDouble(totalAmount);
				
				Transaction transaction = session.beginTransaction();
				
				if(paymentType.equals("credit"))
				{
					Double newBal = bal - Double.parseDouble(supPay);
					
					bean.setBalance(newBal);
					bean.setPaymentType(paymentType);
					bean.setCredit(Double.parseDouble(supPay));
										
					GoodsReceiveDao dao1 = new GoodsReceiveDao();
			        List stkList2  = dao1.getAllPurschaseEntry();
			        
			        System.out.println("List size : "+stkList2.size());
			        
			        Query query2 = session2.createQuery("UPDATE GoodsReceiveBean set bill_payment_pending = "+newBal+" WHERE bill_number = "+billNo+" AND fk_supplier_id = "+supplier);
			        query2.executeUpdate();
					
			        /*for(int j=0;j<stkList2.size();j++){
			        	
			        GoodsReceiveBean st = (GoodsReceiveBean)stkList2.get(j);
					String bill=st.getBillNum();
					Long pk_goods_receive_id=st.getPkGoodsReceiveId();
					
					if(billNo.equals(bill)){
					
					System.out.println("inside if");
						
					GoodsReceiveBean updateStock = (GoodsReceiveBean) session.get(GoodsReceiveBean.class, new Long(pk_goods_receive_id));
					updateStock.setBillPaymentPending(newBal);
            		 
            		session.saveOrUpdate(updateStock);
            		
            		if(!transaction.wasCommitted())
            		{
            			transaction.commit();
            		}
            		
            		// transaction.commit();
					}
					}*/
				}
				
				else{
					if(paymentType.equals("debit"))
					{
						Double newBal = bal + Double.parseDouble(supPay);
						
						bean.setBalance(newBal);
						bean.setPaymentType(paymentType);
						bean.setCredit(Double.parseDouble(supPay));
												
						GoodsReceiveDao dao1 = new GoodsReceiveDao();
				        List stkList2  = dao1.getAllPurschaseEntry();
				        
				        System.out.println("List size : "+stkList2.size());
				        
				        Query query2 = session2.createQuery("UPDATE GoodsReceiveBean set bill_payment_pending = "+newBal+" WHERE bill_number = "+billNo+" AND fk_supplier_id = "+supplier);
				        query2.executeUpdate();
						
				        /*for(int j=0;j<stkList2.size();j++){
				        	
				        GoodsReceiveBean st = (GoodsReceiveBean)stkList2.get(j);
						String bill=st.getBillNum();
						Long pk_goods_receive_id=st.getPkGoodsReceiveId();
						
						if(billNo.equals(bill)){
						
						System.out.println("inside if");
							
						GoodsReceiveBean updateStock = (GoodsReceiveBean) session.get(GoodsReceiveBean.class, new Long(pk_goods_receive_id));
						updateStock.setBillPaymentPending(newBal);
	            		 
	            		session.saveOrUpdate(updateStock);
	            		transaction.commit();
						}
						}*/
					}
					else{
					
					bean.setCredit(0.0);
					}
				}

				bean.setTotalAmount(Double.parseDouble(totalAmount));
				
				String onlyShopName = "";
				
				HttpSession session11 = request.getSession(true);
				
				String username = (String) session11.getAttribute("user");
				String userid = (String) session11.getAttribute("userid");
				String shopid = (String) session11.getAttribute("shopid");
				String shopName = (String) session11.getAttribute("shopName");
				
				String ShopNameWithoutId1 = shopName.substring(4);
				onlyShopName = ShopNameWithoutId1.trim();
				
				bean.setFkshopid(Long.parseLong(shopid));
				bean.setFkuserid(Long.parseLong(userid));
				bean.setUserName(username);
				bean.setShopName(onlyShopName);
				
				SupplierPaymentDao dao = new SupplierPaymentDao();
				dao.regSupPayment(bean);
				
			}
			
			HttpSession transactionIDsession = request.getSession(true);
			transactionIDsession.setAttribute("transactionIdSupp", transactionIdSupp);
			
		}

	public List getSupplierPaymentDetailsBySingleDate(
			HttpServletRequest request, HttpServletResponse response) {
		String fDate = request.getParameter("fDate");
		System.out.println(fDate+"Single Date");
		
         Map<Long,SupplierPaymentDetail> map = new HashMap<Long,SupplierPaymentDetail>();
 		
         SupplierPaymentDao dao = new SupplierPaymentDao();
 		List<SupplierPaymentDetail> supList = dao.getCreditCustPaymentDetailsForSingleDate(fDate);
 		
 		
 		return supList;

	}

	public List getSupplierPaymentByTwoDate(HttpServletRequest request,
			HttpServletResponse response) {

		
		String fDate = request.getParameter("fisDate");
        String tDate = request.getParameter("endDate");
        String fkSupplierId = request.getParameter("fkSupplierId");
		
        Map<Long,SupplierPaymentDetail> map = new HashMap<Long,SupplierPaymentDetail>();
		
        SupplierPaymentDao dao = new SupplierPaymentDao();
		List<SupplierPaymentDetail> sup1List = dao.getSupplierDetailsDateWise(fDate,tDate,fkSupplierId);
		
		
		return sup1List;
	
	}

	//
	public List getSupplierPaymentmode(HttpServletRequest request,
			HttpServletResponse response) {

		
		String fDate = request.getParameter("fisDate");
        String tDate = request.getParameter("endDate");
        String paymentMode = request.getParameter("paymentMode");
		
        Map<Long,SupplierPaymentDetail> map = new HashMap<Long,SupplierPaymentDetail>();
		
        SupplierPaymentDao dao = new SupplierPaymentDao();
		List<SupplierPaymentDetail> sup1List = dao.getSupplierDetailspaymode(fDate,tDate,paymentMode);
		
		
		return sup1List;
	
	}
	
	public List getSupplierPaymentDetailsByBillNumber(
			HttpServletRequest request, HttpServletResponse response) {

		String billNo = request.getParameter("billNo");
		String fkSupplierId = request.getParameter("fkSupplierId");
		
         Map<Long,SupplierPaymentDetail> map = new HashMap<Long,SupplierPaymentDetail>();
 		
         SupplierPaymentDao dao = new SupplierPaymentDao();
 		List<SupplierPaymentDetail> supList = dao.getCreditCustPaymentDetailsAsBill(billNo,fkSupplierId);
 		
 		
 		return supList;

	
	}

	public List getSupplierPaymentDetailsByNames(HttpServletRequest request,
			HttpServletResponse response) {
		String fkSupplierId = request.getParameter("fkSupplierId");
		
        Map<Long,SupplierPaymentDetail> map = new HashMap<Long,SupplierPaymentDetail>();
		
        SupplierPaymentDao dao = new SupplierPaymentDao();
		List<SupplierPaymentDetail> supList = dao.getCreditCustPaymentDetailsAsBill(fkSupplierId);
		
		
		return supList;
	}
		
	
	}


