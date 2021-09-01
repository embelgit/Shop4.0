package com.Fertilizer.helper;

import java.math.BigDecimal;
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

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.jfree.util.Log;

import com.Fertilizer.bean.GetProductDetailPO;
import com.Fertilizer.bean.StockDetail;
import com.Fertilizer.dao.AdvanceBookinhDao;
import com.Fertilizer.dao.EditGoodsReceiveDao;
import com.Fertilizer.dao.FertilizerBillDao;
import com.Fertilizer.dao.SupplierPaymentDao;
import com.Fertilizer.hibernate.AdvanceBookingBean;
import com.Fertilizer.hibernate.EditGoodsReceiveBean;
import com.Fertilizer.hibernate.FertilizerBillBean;
import com.Fertilizer.hibernate.GoodsReceiveBean;
import com.Fertilizer.hibernate.SaleReturnBean;
import com.Fertilizer.hibernate.SupplierPaymentBean;
import com.Fertilizer.utility.HibernateUtility;

public class AdvanceBookingHelper {
	
	public void advacnesBooking(HttpServletRequest request, 
			HttpServletResponse response) throws ParseException {
		
        Long advbookingId=0l;
		
		AdvanceBookinhDao dao11 = new AdvanceBookinhDao();
		List bookingIdList = dao11.getLastBookingNoforSupplier(request);
		
		if(bookingIdList.size()<=0)
		{
			advbookingId=1l;
		}
		else
		{
		for (int i = 0; i < bookingIdList.size(); i++) {
			
			AdvanceBookingBean bean=(AdvanceBookingBean) bookingIdList.get(i);
			advbookingId = bean.getBookingNo();
			advbookingId++;
			
		}
	}

		// TODO Auto-generated method stub
		Integer count = Integer.parseInt(request.getParameter("count"));
		for (int i = 0; i < count; i++)
		{
			String supplierId = request.getParameter("supplierId");
			String supplierName = request.getParameter("supplierName");
			String mailid = request.getParameter("mailid");
			String totalqty = request.getParameter("totalqty");
			String podate = request.getParameter("podate");
			
			String catID = request.getParameter("catID" + i);
			String productID = request.getParameter("productID" + i);
			String prodName = request.getParameter("prodName" + i);
			String catName = request.getParameter("catName" + i);
			String subCatName = request.getParameter("subCatName" + i);
			String company = request.getParameter("company" + i);
			String hsn = request.getParameter("hsn" + i);
			String packing = request.getParameter("packing" + i);
			String unit = request.getParameter("unit" + i);
			String quantity = request.getParameter("quantity" + i);
			String Total = request.getParameter("Total" + i);          // total quantity per product
			String subcatID = request.getParameter("subcatID" + i); 
			String buyPrice = request.getParameter("buyPrice" + i); 
			String buyPriceEx = request.getParameter("buyPriceEx" + i); 
			String Discount = request.getParameter("Discount" + i); 
			String DiscountAmount = request.getParameter("DiscountAmount" + i); 
			String TotalExTax = request.getParameter("TotalExTax" + i); 
			String sgst = request.getParameter("sgst" + i); 
			String cgst = request.getParameter("cgst" + i); 
			String igst1 = request.getParameter("igst1" + i); 
			 						
			HibernateUtility hbu = null;
			Session session = null;
			Transaction transaction = null;

			try
			{
				hbu = HibernateUtility.getInstance();
				session = hbu.getHibernateSession();
				transaction = session.beginTransaction();
			
				AdvanceBookingBean bean = new AdvanceBookingBean();
				
				bean.setSupplierID(Long.parseLong(supplierId));
				bean.setSupplierName(supplierName);
				bean.setEmailID(mailid);
				bean.setTotalQty(Double.parseDouble(totalqty));
				SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
				Date newDate = null;
				try {
						newDate = format.parse(podate);
					} 
				catch (ParseException e1) {
					e1.printStackTrace();
				}
				bean.setPodate(newDate);
				
				bean.setCatID(Long.parseLong(catID));
				bean.setProdID(Long.parseLong(productID));
				bean.setProdName(prodName);
				bean.setCatName(catName);
				bean.setSubcatName(subCatName);
				bean.setCompany(company);
				bean.setHsnNO(hsn);
				bean.setPacking(Double.parseDouble(packing));
				bean.setUnit(unit);
				bean.setQuantity(Long.parseLong(quantity));
				bean.setTotalQtyperProd(Double.parseDouble(Total));
				bean.setSubcatID(Long.parseLong(subcatID));
				bean.setBookingNo(advbookingId);
				bean.setBuyPrice(Double.parseDouble(buyPrice));
				bean.setBuyPriceEx(Double.parseDouble(buyPriceEx));
				bean.setDiscount(Double.parseDouble(Discount));
				bean.setDiscountAmount(Double.parseDouble(DiscountAmount));
				bean.setTotalExTax(Double.parseDouble(TotalExTax));
				bean.setCgst(Double.parseDouble(cgst));
				bean.setSgst(Double.parseDouble(sgst));
				bean.setiGstPercentage(Double.parseDouble(igst1));
				bean.setPurchaseBillNo("0");
				
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
				bean.setShopName(onlyShopName);
				bean.setUserName(username);
				
				session.save(bean);
				transaction.commit();
				
				HttpSession billNoSession = request.getSession(true);
				billNoSession.setAttribute("advbookingId", advbookingId);
				
			} catch (RuntimeException e) {
				try {
					transaction.rollback();
				} catch (RuntimeException rbe) {
					Log.error("Couldn't roll back tranaction", rbe);
				}
			} finally {
				hbu.closeSession(session);
			}

		}

	}
	
public Map getBillDetailsForEditGoodReceiveNonGrid(HttpServletRequest request) 
{
	String booking = request.getParameter("booking");
		
		AdvanceBookinhDao dao=new AdvanceBookinhDao();
		List list1 = dao.EditPurchaseOrderBillDetailsNonGrid(booking, request);
		
		System.out.println(list1.size());
	
		Map map1 = new HashMap();

		if( list1 != null && list1.size() > 0)
		{
			for (int i = 0; i < list1.size(); i++) {
				Object[] o = (Object[]) list1.get(i);
				
				GetProductDetailPO bean = new GetProductDetailPO();
				
				bean.setPkbookingId(Long.parseLong(o[0].toString()));
				bean.setGrossTotal(Double.parseDouble(o[1].toString()));
				
				map1.put(bean.getGrossTotal(), bean);
			}
		}
		return map1;
	}

}
