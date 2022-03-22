package com.Fertilizer.helper;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.velocity.runtime.directive.Parse;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.jfree.util.Log;

import com.Fertilizer.hibernate.CreditNoteConversionBean;
import com.Fertilizer.hibernate.FertilizerBillBean;
import com.Fertilizer.hibernate.GoodsReceiveBean;
import com.Fertilizer.hibernate.Stock;
import com.Fertilizer.hibernate.UserDetailsBean;
import com.Fertilizer.hibernate.purchaseReturnBean;
import com.Fertilizer.utility.HibernateUtility;
import com.Fertilizer.dao.UserDetailsDao;
import com.Fertilizer.dao.creditnoteDao;
import com.Fertilizer.dao.purchaseReturnDao;

public class PurchaseReturnHelper {

	public void insertPurchaseReturn(HttpServletRequest request, HttpServletResponse response) throws ParseException {
		// SimpleDateFormat dateFormat1 = new SimpleDateFormat("yyyy-MM-dd");

		Integer count = Integer.parseInt(request.getParameter("count"));
		int flag = 0;

		Long pReturnNo = 0l;

		purchaseReturnDao dao1 = new purchaseReturnDao();
		List pretNo = dao1.getPurchaseReturnId(request);

		if (pretNo.size() <= 0) {
			pReturnNo = 1l;
		} else {
			for (int i = 0; i < pretNo.size(); i++) {

				purchaseReturnBean bean = (purchaseReturnBean) pretNo.get(i);
				pReturnNo = bean.getPurchaseReturnNo();
				pReturnNo++;

			}
		}

		for (int i = 0; i < count; i++) {

			String fk_supplier_id = request.getParameter("fk_supplier_id");
			String bill_no = request.getParameter("bill_no");
			String supplierName = request.getParameter("supplierName");
			String product_name = request.getParameter("product_name" + i);
			String company_Name = request.getParameter("company_Name" + i);
			String catName = request.getParameter("catName" + i);
			String pkPOId = request.getParameter("pkPOId" + i);
			String fkCategoryId = request.getParameter("fkCategoryId" + i);
			String batch_no = request.getParameter("batch_no" + i);
			String weight = request.getParameter("weight" + i);
			String buy_price = request.getParameter("buy_price" + i);
			String sale_price = request.getParameter("sale_price" + i);
			String mrp = request.getParameter("mrp" + i);
			String tax_percentage = request.getParameter("tax_percentage" + i);
			String dupQuantity1 = request.getParameter("dupQuantity1" + i);
			String dupQuantity = request.getParameter("dupQuantity" + i);
			String taxAmount = request.getParameter("taxAmount" + i);
			String total = request.getParameter("total" + i);
			String barcodeNo = request.getParameter("barcodeNo" + i);
			//String status ="Done";
			
			String pk_goods_receive_id = request.getParameter("pk_goods_receive_id" + i);
			String PkStockId = request.getParameter("PkStockId" + i);
			
			purchaseReturnDao dao = new purchaseReturnDao();
			purchaseReturnBean bean = new purchaseReturnBean();

			bean.setStatus("False");
			bean.setPurchaseReturnNo(pReturnNo);
			bean.setFk_supplier_id(Long.parseLong(fk_supplier_id));
			bean.setSupplier(supplierName);
			bean.setBillNum(bill_no);

			bean.setProduct_name(product_name);
			bean.setCompany_Name(company_Name);
			bean.setCatName(catName);
			bean.setPkPOId(Long.parseLong(pkPOId));
			bean.setFkCategoryId(Long.parseLong(fkCategoryId));
			bean.setBatch_no(batch_no);
			bean.setWeight(Double.parseDouble(weight));
			bean.setBuy_price(Double.parseDouble(buy_price));
			bean.setSale_price(Double.parseDouble(sale_price));
			bean.setMrp(Double.parseDouble(mrp));
			bean.setTax_percentage(Double.parseDouble(tax_percentage));
			bean.setDupQuantity1(Double.parseDouble(dupQuantity1));

			if (dupQuantity == "0") {
				bean.setDupQuantity(0d);

			} else {
				bean.setDupQuantity(Double.parseDouble(dupQuantity));
			}

			bean.setTaxAmount(Double.parseDouble(taxAmount));
			bean.setTotal(Double.parseDouble(total));
			bean.setBarcodeNo(Long.parseLong(barcodeNo));

			String purchaseDate = request.getParameter("purchaseDate" + i);
			System.out.println("purchaseDate-----------" + purchaseDate);

			SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
			Date purchaseDate1 = null;

			try {
				purchaseDate1 = format.parse(purchaseDate);
				bean.setPurchaseDate(purchaseDate1);
			} catch (ParseException e1) {
				e1.printStackTrace();
			}
			
/*------------------------------------------------- After Purchase Return change the Quantity in Good recieve -----------------------------------------------*/
			
			HibernateUtility hbu4 = null;
			Session session4 = null;
			Transaction transaction4 = null;
			
			try{
				hbu4 = HibernateUtility.getInstance();
				session4 = hbu4.getHibernateSession();
				transaction4 = session4.beginTransaction();
				
				Long pk_goods_receive_id1 = Long.parseLong(pk_goods_receive_id);
							
				GoodsReceiveBean updateqty = (GoodsReceiveBean) session4.get(GoodsReceiveBean.class, new Long(pk_goods_receive_id1));
   		        
				Double qty = updateqty.getQuantity();
				
					Double updatedQty = qty - Double.parseDouble(dupQuantity);
					System.out.println("Quantity in Good Recieve After Purchase Return :: "+updatedQty);
					updateqty.setQuantity(updatedQty);
				
   		        session4.saveOrUpdate(updateqty);
   		        transaction4.commit();					

			
/*------------------------------------------------- After Purchase Return change the Quantity in Stocks -----------------------------------------------*/
	
				Long PkStockId1 = Long.parseLong(PkStockId);
							
				Stock updatestck = (Stock) session4.get(Stock.class, new Long(PkStockId1));
   		        
				Double stock = updatestck.getQuantity();
				
					Double updatedStock = stock - Double.parseDouble(dupQuantity);
					System.out.println("Avail Quantity in Stock After Purchase Return :: "+updatedStock);
					updatestck.setQuantity(updatedStock);
				
   		        session4.saveOrUpdate(updatestck);
   		        transaction4.commit();					
   		}
			
		catch(RuntimeException e){
			try{
				transaction4.rollback();
			}catch(RuntimeException rbe)
			{
				Log.error("Couldn't roll back tranaction",rbe);
			}	
		}finally{
			hbu4.closeSession(session4);
		}
			
			

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
			bean.setShopName(onlyShopName);
			bean.setUserName(username);
			
			if (Double.parseDouble(dupQuantity) > 0) {
				dao.insertPurchaseReturn(bean);
			}
		}

	}

	// get purchae return total from purchase return table
	public Map getPurchaseReturnTotalAmount(HttpServletRequest request, HttpServletResponse response) 
	{
		String fk_suppier_id = request.getParameter("supplier");
		String bill_no1 = request.getParameter("bill_no1");

		purchaseReturnDao dao = new purchaseReturnDao();

		List list = dao.getPurchaseReturnTotal(fk_suppier_id, bill_no1, request);
		Map map = new HashMap();

		for (int i = 0; i < list.size(); i++) {
			Object[] o = (Object[]) list.get(i);

			purchaseReturnBean bean = new purchaseReturnBean();

			Double grossTotal = Double.parseDouble(o[0].toString());
			double grosstotalroundoff = Math.round(grossTotal * 100.0) / 100.0;

			bean.setBuy_price(Double.parseDouble(o[0].toString()));
			bean.setSupplier(o[1].toString());

			System.out.println("***************" + o[0]);
			map.put(bean.getBuy_price(), bean);
		}
		return map;
	}

	// insert data into database credit note conversion
	public void insertCreditNoteConversion(HttpServletRequest request, HttpServletResponse response)
			throws ParseException {

		SimpleDateFormat dateFormat1 = new SimpleDateFormat("MM-dd-yyyy");
		int i = 0;
		Integer count = Integer.parseInt(request.getParameter("count"));

		Long creditConvTransId = 0l;

		creditnoteDao crdao = new creditnoteDao();
		List cretNo = crdao.getCreditConvReturnId(request);

		if (cretNo.size() <= 0) {
			creditConvTransId = 1l;
		} else {
			for (int p = 0; p < cretNo.size(); p++) {

				CreditNoteConversionBean bean = (CreditNoteConversionBean) cretNo.get(p);
				creditConvTransId = bean.getTransNoForCreditConversion();
				creditConvTransId++;

			}
		}

		for (i = 0; i < count; i++) {

			String fk_sup_id = request.getParameter("fk_sup_id");
			String bill_no1 = request.getParameter("bill_no1");
			String Cr_Conversion_No = request.getParameter("Cr_Conversion_No");
			String CrCongrossTotal = request.getParameter("CrCongrossTotal");
			String purchaseReturnAmt = request.getParameter("purchaseReturnAmt");

			String prodctId = request.getParameter("prodctId" + i);
			String fkCategoryId = request.getParameter("fkCategoryId" + i);
			String supplier = request.getParameter("supplier" + i);
			String product_name = request.getParameter("product_name" + i);
			String category_name = request.getParameter("category_name" + i);
			String company_Name = request.getParameter("company_Name" + i);
			String batch_no = request.getParameter("batch_no" + i);
			String weight = request.getParameter("weight" + i);
			String buy_price = request.getParameter("buy_price" + i);
			String sale_price = request.getParameter("sale_price" + i);
			String mrp = request.getParameter("mrp" + i);
			String tax_percentage = request.getParameter("tax_percentage" + i);
			String quantity = request.getParameter("quantity" + i);
			String return_quanty = request.getParameter("return_quanty" + i);
			String price = request.getParameter("price" + i);
			String conversiontotal = request.getParameter("conversiontotal" + i);
			String barcodeNo = request.getParameter("barcodeNo" + i);
			String pkGoodReceiveId = request.getParameter("pkGoodReceiveId" + i);
			String purchase_return_pk = request.getParameter("purchase_return_pk" + i);
			

			Double Crtotal = Double.parseDouble(CrCongrossTotal);
			Double Purchtotal = Double.parseDouble(purchaseReturnAmt);
			Double TotalDiff = Purchtotal - Crtotal;

			System.out.println("Total Differnce=============" + TotalDiff);
		
			CreditNoteConversionBean bean = new CreditNoteConversionBean();

			bean.setTransNoForCreditConversion(creditConvTransId);
			bean.setFk_supplier_id(Long.parseLong(fk_sup_id));
			bean.setFkProductId(Long.parseLong(prodctId));
			bean.setFkcategoryId(Long.parseLong(fkCategoryId));
			bean.setBill_no(Long.parseLong(bill_no1));
			bean.setCrConversionNo(Cr_Conversion_No);
			bean.setSupplierName(supplier);
			bean.setProductName(product_name);
			bean.setCategoryName(category_name);
			bean.setCompanyName(company_Name);
			bean.setBatchno(batch_no);
			bean.setWeight(Double.parseDouble(weight));
			bean.setBuy_price(Double.parseDouble(buy_price));
			bean.setSale_price(Double.parseDouble(sale_price));
			bean.setMrp(Double.parseDouble(mrp));
			bean.setTaxpercentage(Double.parseDouble(tax_percentage));
			bean.setQuantity(Long.parseLong(quantity));
			bean.setRetunQuantity(Long.parseLong(return_quanty));
			bean.setBarcodeNo(Long.parseLong(barcodeNo));
			bean.setCrcongrosstotal(Crtotal);
			bean.setFkGoodRecId(Long.parseLong(pkGoodReceiveId));
			bean.setPkPurchasereturnId(Long.parseLong(purchase_return_pk));

			if (price != null) {
				bean.setPrice(Double.parseDouble(price));
			} else {
				bean.setPrice(0.00);
			}
			bean.setRetunQuantity(Long.parseLong(return_quanty));
			if (conversiontotal != null) {
				bean.setConversiontotal(Double.parseDouble(conversiontotal));
			} else {
				bean.setConversiontotal(0.00);
			}

			/*
			 * SimpleDateFormat dateFormat2 = new SimpleDateFormat("yyyy-MM-dd");
			 * 
			 * try { Date purchasedate = dateFormat2.parse(purchaseDate);
			 * bean.setPurchaseDate(purchasedate); } catch (ParseException e) {
			 * e.printStackTrace(); }
			 */

			String onlyShopName = "";

			HttpSession session = request.getSession(true);

			String username = (String) session.getAttribute("user");
			String userid = (String) session.getAttribute("userid");
			String shopid = (String) session.getAttribute("shopid");
			String shopName = (String) session.getAttribute("shopName");
			session.setAttribute("bill_no1", bill_no1);
			
			String ShopNameWithoutId = shopName.substring(4);
			onlyShopName = ShopNameWithoutId.trim();

			System.out.println("shop name------> " + onlyShopName);

			bean.setUserId(Long.parseLong(userid));
			bean.setUsername(username);
			bean.setShopId(Long.parseLong(shopid));
			bean.setShopName(onlyShopName);

			purchaseReturnDao dao = new purchaseReturnDao();
			dao.insertCreditNoteConversion(bean);
			
/*------------------------------------------------- After Purchase Return change the status -----------------------------------------------*/
			
			HibernateUtility hbu4 = null;
			Session session4 = null;
			Transaction transaction4 = null;
			
			try{
				hbu4 = HibernateUtility.getInstance();
				session4 = hbu4.getHibernateSession();
				transaction4 = session4.beginTransaction();
				//List<Object[]> list2  = null;
				//List<purchaseReturnBean> goodsList = null;
							
				purchaseReturnBean updateStatus = (purchaseReturnBean) session4.get(purchaseReturnBean.class, new Long(purchase_return_pk));
   		        
				updateStatus.setStatus("True");
   		        session4.saveOrUpdate(updateStatus);
   		        transaction4.commit();					
   		}
		catch(RuntimeException e){
			try{
				transaction4.rollback();
			}catch(RuntimeException rbe)
			{
				Log.error("Couldn't roll back tranaction",rbe);
			}	
		}finally{
			hbu4.closeSession(session4);
		}	
			
			
/*--------------------------------------------- After Purchase Return Good Receive Gross Total Change-----------------------------------------------*/
			
			HibernateUtility hbu1 = null;
			Session session1 = null;
			Transaction transaction1 = null;
			
			try{
				hbu1 = HibernateUtility.getInstance();
				session1 = hbu1.getHibernateSession();
				transaction1 = session1.beginTransaction();
				List<Object[]> list2  = null;
				List<GoodsReceiveBean> goodsList = null;
				Double grossTotal = 0.0;
			
   		        GoodsReceiveBean updateStock = (GoodsReceiveBean) session1.get(GoodsReceiveBean.class, new Long(pkGoodReceiveId));
   		        
       		    Query query2 = session1.createSQLQuery("SELECT gross_total, bill_number from goods_receive where fk_supplier_id='"+fk_sup_id+"' AND bill_number='"+bill_no1+"' AND fk_product_id='"+prodctId+"'");
 		        list2 = query2.list();
 		        goodsList = new ArrayList<GoodsReceiveBean>();
 		        for (Object[] objects : list2) 
 		        {
 					 grossTotal = Double.parseDouble(objects[0].toString());
 					 
 					
 				 }
 		       System.out.println("Good Receive Gross Total from Database =========================> "+grossTotal);
 		       
		        Double newGrossTotal = grossTotal - Double.parseDouble(conversiontotal);
		        System.out.println("Conversion New Gross Total from UI=========================> "+conversiontotal);
		        System.out.println("Good Receive New Gross Total =========================> "+newGrossTotal);
		       
   		        //updateStock.setReturnAmount(total);
   		        updateStock.setGrossTotal(newGrossTotal);
   		        session1.saveOrUpdate(updateStock);
   		        transaction1.commit();					
   		}
		catch(RuntimeException e){
			try{
				transaction1.rollback();
			}catch(RuntimeException rbe)
			{
				Log.error("Couldn't roll back tranaction",rbe);
			}	
		}finally{
			hbu1.closeSession(session1);
		}		
		}
	}

}
