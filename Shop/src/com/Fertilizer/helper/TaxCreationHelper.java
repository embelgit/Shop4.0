package com.Fertilizer.helper;

import java.math.BigInteger;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.hibernate.Session;
import org.hibernate.Transaction;

import com.Fertilizer.bean.GetCreditCustomerDetails;
import com.Fertilizer.bean.GetProductDetails;
import com.Fertilizer.bean.GetTaxDetails;
import com.Fertilizer.dao.CustomerDetailsDao;
import com.Fertilizer.dao.ProductDetailsDao;
import com.Fertilizer.dao.TaxCreationDao;
import com.Fertilizer.hibernate.Stock;
import com.Fertilizer.hibernate.TaxCreationBean;
import com.Fertilizer.utility.HibernateUtility;

public class TaxCreationHelper {

	public void taxCreationDetails(HttpServletRequest request,
			HttpServletResponse response) {
			
		System.out.println("In helper");
		
		String taxType = request.getParameter("taxType");
		String taxPercentage = request.getParameter("taxPercentage");
		String cgst = request.getParameter("cgst");
		String sgst = request.getParameter("sgst");
		
		TaxCreationDao tco = new TaxCreationDao();
		TaxCreationBean tcb = new TaxCreationBean();
		
		tcb.setTaxType(taxType);
				
		if(!"".equals(taxPercentage)){
				tcb.setTaxPercentage(Double.parseDouble(taxPercentage));
		} 
		else
		{
			tcb.setTaxPercentage(Double.parseDouble("00"));
		}
		
		
	  if(!"".equals(cgst))
	  { 
		  tcb.setCgst(Double.parseDouble(cgst)); 
	  } 
	  else 
	  {
		  tcb.setCgst(Double.parseDouble("00")); 
	  }
	  
	  if(!"".equals(sgst))
	  {
		  tcb.setSgst(Double.parseDouble(sgst)); 
	  } else {
		  tcb.setSgst(Double.parseDouble("00")); 
	  }
	  String onlyShopName = "";
		
		HttpSession session = request.getSession(true);
		
		String username = (String) session.getAttribute("user");
		String userid = (String) session.getAttribute("userid");
		String shopid = (String) session.getAttribute("shopid");
		String shopName = (String) session.getAttribute("shopName");
		
		String ShopNameWithoutId1 = shopName.substring(4);
		onlyShopName = ShopNameWithoutId1.trim();
		
		tcb.setFkshopid(Long.parseLong(shopid));
		tcb.setFkuserid(Long.parseLong(userid));
		tcb.setShopName(onlyShopName);
		tcb.setUserName(username);
	  
		tco.valTaxCreation(tcb);
		
	}
// Edit Tax
	public void edittaxCreation(HttpServletRequest request,
			HttpServletResponse response) {
		// TODO Auto-generated method stub
		
        String taxType = request.getParameter("taxType1");
        String taxName = request.getParameter("taxName");
		String taxPercentage = request.getParameter("taxPercentage");
		String sgst = request.getParameter("sgst");
		String cgst = request.getParameter("cgst");
		
		Long txId = Long.parseLong(taxType);
		
		 HibernateUtility hbu = HibernateUtility.getInstance();
		 Session session = hbu.getHibernateSession();
		 Transaction transaction = session.beginTransaction();
		 
		 DateFormat df = new SimpleDateFormat("dd/MM/yyyy");
		 Date date2 = new Date();
	
		 TaxCreationBean updateTax = (TaxCreationBean) session.get(TaxCreationBean.class, new Long(txId));
		
		 updateTax.setTaxPercentage(Double.parseDouble(taxPercentage));
		 updateTax.setTaxType(taxName);
		 updateTax.setSgst(Double.parseDouble(sgst));
		 updateTax.setCgst(Double.parseDouble(cgst));
		 
		session.saveOrUpdate(updateTax);
		transaction.commit();
	}
	
// fetch Data for Tax Edit
	public Map getTaxDetailsForEdit(HttpServletRequest request) {

		String taxID = request.getParameter("taxID");
		Long taxId = Long.parseLong(taxID);
		
		TaxCreationDao dao1 = new TaxCreationDao();
		List catList = dao1.getAllTaxDetailsForEdit(taxId, request);

		Map map = new HashMap();
		for (int i = 0; i < catList.size(); i++) {
			Object[] o = (Object[]) catList.get(i);

			GetTaxDetails bean = new GetTaxDetails();
			
			bean.setTaxType(o[0].toString());
			bean.setSgst(Double.parseDouble(o[1].toString()));
			bean.setCgst(Double.parseDouble(o[2].toString()));
			bean.setTaxPercentage(Double.parseDouble(o[3].toString()));
						
			map.put(bean.getTxId(), bean);
		}
		System.out.println("out of helper return map : " + map);
		return map;

	}

}
