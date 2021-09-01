package com.Fertilizer.helper;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.Fertilizer.bean.CustomerBean;
import com.Fertilizer.bean.GetPurchaseProduct;
import com.Fertilizer.dao.GoodsReceiveDao;
import com.Fertilizer.dao.ProductDetailsDao;
import com.Fertilizer.dao.SaleReturnDao;
import com.Fertilizer.hibernate.FertilizerBillBean;
import com.Fertilizer.hibernate.SaleReturnBean;
import com.Fertilizer.hibernate.SubCategoryDetailsBean;

public class SaleReturnHelper {
	
	public Map getAllbillNowithCustName(HttpServletRequest request) 
	{
		String customerType = request.getParameter("customerType");

		int count = 1;
		System.out.println("IN HELPER");
		System.out.println("customerType <=== == ===> " + customerType);

		SaleReturnBean scdb = new SaleReturnBean();

		scdb.setCustType(customerType);

		SaleReturnDao cdd = new SaleReturnDao();
		List list = cdd.getAllbillNo(customerType, request);

		System.out.println("list ======" + list.size());
		Map map = new HashMap();
		
		for (int i = 0; i < list.size(); i++) {
		
			Object[] o = (Object[]) list.get(i);
			
			SaleReturnBean bean = new SaleReturnBean();
		
			bean.setBillNo(Long.parseLong(o[0].toString()));
			bean.setCustomerName(o[1].toString());
			
			map.put(count, bean);
			count++;
		}
		return map;
	
}

	public Map getProductDetailsForBillNo(HttpServletRequest request, HttpServletResponse response)throws Exception
	{		
		String billno = request.getParameter("billno");
			
		//Map<Long,CustomerBean> map = new HashMap<Long,CustomerBean>();
		
		SaleReturnDao dao = new SaleReturnDao();
		List catList = dao.getAllProductDetailsForSaleReturnAsPerBillNo(billno, request);
								
		Map  map1 =  new HashMap();
		
		for(int i=0;i<catList.size();i++)
		{
			Object[] objects = (Object[])catList.get(i);
			
			   CustomerBean bean = new CustomerBean();
			 
			 bean.setBarcodeNo(Long.parseLong(objects[0].toString()));
			 bean.setBillno(Long.parseLong(objects[1].toString()));
			 bean.setItemName(objects[2].toString());
			 bean.setCompanyName(objects[3].toString());
			 bean.setHsn(objects[4].toString());
			 bean.setBatchNumber(objects[5].toString());
			 bean.setBuyPrice(Double.parseDouble(objects[6].toString()));
			 bean.setMrp(Double.parseDouble(objects[7].toString()));
			 bean.setSalePrice(Double.parseDouble(objects[8].toString()));
			 bean.setTaxPercentage(Double.parseDouble(objects[9].toString()));
			 bean.setDiscountAmt(Double.parseDouble(objects[10].toString()));
			 bean.setWeight(Double.parseDouble(objects[11].toString()));   //weight = packing
			 bean.setUnitName(objects[12].toString());
			 bean.setQuantity(Double.parseDouble(objects[13].toString()));
			 bean.setPkBillingId(Long.parseLong(objects[14].toString()));
			 bean.setPkGoodreceiveId(Long.parseLong(objects[15].toString()));
			 bean.setReturnQuantity(0.0);
			 Double buyprice = bean.getBuyPrice();
			 Double qty = bean.getQuantity();
			 Double totalamt = buyprice * qty;
			 bean.setAlltotalforReturn(totalamt);
			 bean.setReturnTotal(0.0);
			 
			map1.put(bean.getPkBillingId(),bean);
		}
		return map1;
}

	
	//bill
	
	public Map getProductcancelBillNo(HttpServletRequest request, HttpServletResponse response)throws Exception
	{		
		String billno = request.getParameter("billno");
			
		//Map<Long,CustomerBean> map = new HashMap<Long,CustomerBean>();
		
		SaleReturnDao dao = new SaleReturnDao();
		List catList = dao.getAllProductcancelBillNo(billno, request);
								
		Map  map1 =  new HashMap();
		
		for(int i=0;i<catList.size();i++)
		{
			Object[] objects = (Object[])catList.get(i);
			
			   CustomerBean bean = new CustomerBean();
			 
			 bean.setBarcodeNo(Long.parseLong(objects[0].toString()));
			 bean.setBillno(Long.parseLong(objects[1].toString()));
			 bean.setItemName(objects[2].toString());
			 bean.setCompanyName(objects[3].toString());
			 bean.setHsn(objects[4].toString());
			 bean.setBatchNumber(objects[5].toString());
			 bean.setBuyPrice(Double.parseDouble(objects[6].toString()));
			 bean.setMrp(Double.parseDouble(objects[7].toString()));
			 bean.setSalePrice(Double.parseDouble(objects[8].toString()));
			 bean.setTaxPercentage(Double.parseDouble(objects[9].toString()));
			 bean.setDiscountAmt(Double.parseDouble(objects[10].toString()));
			 bean.setWeight(Double.parseDouble(objects[11].toString()));   //weight = packing
			 bean.setUnitName(objects[12].toString());
			 bean.setQuantity(Double.parseDouble(objects[13].toString()));
			 bean.setPkBillingId(Long.parseLong(objects[14].toString()));
			 bean.setPkGoodreceiveId(Long.parseLong(objects[15].toString()));
			 bean.setReturnQuantity(Double.parseDouble(objects[13].toString()));
			 Double buyprice = bean.getBuyPrice();
			 Double qty = bean.getQuantity();
			 Double totalamt = buyprice * qty;
			 bean.setAlltotalforReturn(totalamt);
			 bean.setReturnTotal(0.0);
			 
			map1.put(bean.getPkBillingId(),bean);
		}
		return map1;
}
	
}
