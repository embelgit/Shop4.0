package com.Fertilizer.helper;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.InputStreamReader;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang.StringUtils;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.jfree.util.Log;

import com.Fertilizer.bean.AdvanceBookingAB;
import com.Fertilizer.bean.GetBarcode;
import com.Fertilizer.bean.GetBillDetails;
import com.Fertilizer.bean.GetEmployeeDetails;
import com.Fertilizer.bean.GetProductDetailPO;
import com.Fertilizer.bean.GetProductDetailforGoodRec;
import com.Fertilizer.bean.GetProductDetails;
import com.Fertilizer.bean.ProductDetailsForReports;
import com.Fertilizer.bean.StockDetail;
import com.Fertilizer.dao.BarcodeDetailDao;
import com.Fertilizer.dao.CategoryDetailsDao;
import com.Fertilizer.dao.EmployeeDetailsDao;
import com.Fertilizer.dao.ProductDetailsDao;
import com.Fertilizer.dao.SupplierDetailsDao;
import com.Fertilizer.hibernate.AdvanceBookingBean;
import com.Fertilizer.hibernate.BarcodeDetailsBean;
import com.Fertilizer.hibernate.EmployeeDetailsBean;
import com.Fertilizer.hibernate.ProductDetailsBean;
import com.Fertilizer.hibernate.Stock;
import com.Fertilizer.hibernate.SubCategoryDetailsBean;
import com.Fertilizer.hibernate.SupplierDetailsBean;
import com.Fertilizer.hibernate.TaxCreationBean;
import com.Fertilizer.utility.HibernateUtility;

public class ProductDetailsHelper {

	Long barcodeNo;
	BigInteger productId;
		
	public List<ProductDetailsBean> getAllMainProdInfo(HttpServletRequest request) {
		
		ProductDetailsDao dow = new ProductDetailsDao();
		List<ProductDetailsBean> list = dow.getAllMainProdInfo(request);
		
		System.out.println("Product List size in helper " + list.size());
		return list;
	}
	//
	public List<ProductDetailsBean> getAllMainProdInfopack(HttpServletRequest request) {
		
		ProductDetailsDao dow = new ProductDetailsDao();
		List<ProductDetailsBean> list = dow.getAllMainProdInfoforpack(request);
		
		System.out.println("Product List size in helper " + list.size());
		return list;
	}
	
	
	public void productDetails(HttpServletRequest request, HttpServletResponse response) {

		System.out.println("=====================In helper");

		String fk_cat_id = request.getParameter("fk_cat_id");
		String fk_unit_id = request.getParameter("fk_unit_id");
		String subcatId = request.getParameter("subcatId");
		String productName = request.getParameter("productName");
		String weight = request.getParameter("weight");
		String manufacturingCompany = request.getParameter("manufacturingCompany");
		String fk_tax_id = request.getParameter("fk_tax_id");
		String taxPercentage = request.getParameter("taxPercentage");
		String mrp = request.getParameter("mrp");
		String salePrice = request.getParameter("salePrice");
		String buyPrice = request.getParameter("buyPrice");
		String spwithoutgst= request.getParameter("spwithoutgst");
		String hsn = request.getParameter("hsn");
		String sgst = request.getParameter("sgst");
		String cgst = request.getParameter("cgst");
		String description = request.getParameter("description");
					
		String buyunit = request.getParameter("buyunit");
		String saleunit = request.getParameter("saleunit");
		String unitvalue = request.getParameter("unitvalue");
		
		ProductDetailsBean bean=new ProductDetailsBean();
		
		bean.setFk_cat_id(Long.parseLong(fk_cat_id));
		bean.setFk_subCat_id(Long.parseLong(subcatId));
		System.out.println("subcat - - ` ` ` ` ````   "+bean.getFk_subCat_id());
		bean.setBuyunit(buyunit);
		bean.setSaleunit(saleunit);
		bean.setUnitvalue(Double.parseDouble(unitvalue));
		
		bean.setProductName(productName);
		bean.setManufacturingCompany(manufacturingCompany);
		bean.setFk_unit_id(Long.parseLong(fk_unit_id));
		bean.setWeight(Double.parseDouble(weight));
		bean.setTaxPercentage(Double.parseDouble(taxPercentage));
		bean.setMrp(Double.parseDouble(mrp));
		bean.setBuyPrice(Double.parseDouble(buyPrice));
		bean.setSalePrice(Double.parseDouble(salePrice));
		bean.setSale_price_ex_tax(Double.parseDouble(spwithoutgst));
		if (hsn != "") {
			bean.setHsn(hsn);
		} else {
			bean.setHsn("N/A");
		}
		//bean.setFk_shop_id(Long.parseLong(fk_shop_id));
		bean.setFkTaxId(Long.parseLong(fk_tax_id));
		bean.setCgst(Double.parseDouble(cgst));
		bean.setSgst(Double.parseDouble(sgst));
		
		String onlyShopName = "";
		
		HttpSession session = request.getSession(true);
		
		String username = (String) session.getAttribute("user");
		String userid = (String) session.getAttribute("userid");
		String shopid = (String) session.getAttribute("shopid");
		String shopName = (String) session.getAttribute("shopName");
		
		String ShopNameWithoutId1 = shopName.substring(4);
		onlyShopName = ShopNameWithoutId1.trim();
		
		if (username != "") {
			bean.setUsername(username);
		} else {
			bean.setUsername("N/A");
		}
		
		if (onlyShopName != "") {
			bean.setShopname(onlyShopName);
		} else {
			bean.setShopname("N/A");
		}
		
		if (userid != null) {
			bean.setUserid(Long.parseLong(userid));
		} else {
			bean.setUserid(0l);
		}
		
		if (shopid != null) {
			bean.setFk_shop_id(Long.parseLong(shopid));
		} else {
			bean.setFk_shop_id(0l);
		}
		
		if (description != "") {
			bean.setDescription(description);
		} else {
			bean.setDescription("N/A");
		}
		
		ProductDetailsDao pd = new ProductDetailsDao();
		pd.ProductDetailsDao(bean);
		
	}

	public Map getAllProduct(String supplierId) {

		ProductDetailsDao dao = new ProductDetailsDao();
		List list = dao.getAllProductBySuppliers(supplierId);
		Map map = new HashMap();
		for (int i = 0; i < list.size(); i++) {
			Object[] o = (Object[]) list.get(i);
			GetProductDetails bean = new GetProductDetails();
			System.out.println(Arrays.toString(o));
			bean.setProduct(o[0].toString());
			;
			bean.setInsertDate(o[1].toString());
			// bean.setTotalAmount((Double)o[1]);
			System.out.println("***************" + o[0]);
			map.put(bean.getProduct(), bean);

		}
		return map;
	}

	public Map getAllProductByCatAndBySup(String category) {

		ProductDetailsDao dao = new ProductDetailsDao();
		List list = dao.getAllProductBySCategoryAndBySuppliers(category);

		Map map = new HashMap();
		for (int i = 0; i < list.size(); i++) {
			Object[] o = (Object[]) list.get(i);
			GetProductDetails bean = new GetProductDetails();
			System.out.println(Arrays.toString(o));
			bean.setProduct(o[0].toString());
			;
			bean.setInsertDate(o[1].toString());
			bean.setManufacturer(o[2].toString());
			bean.setWeight(Double.parseDouble(o[3].toString()));
			// bean.setTotalAmount((Double)o[1]);
			System.out.println("***************" + o[0]);
			map.put(bean.getProduct(), bean);

		}
		return map;
	}

	public Map getAllProductByCatForadvance(String category) {
		int count = 1;
		ProductDetailsDao dao = new ProductDetailsDao();
		List list = dao.getAllProductBySCategoryAndBySuppliers(category);

		Map map = new HashMap();
		for (int i = 0; i < list.size(); i++) {
			Object[] o = (Object[]) list.get(i);
			GetProductDetails bean = new GetProductDetails();
			System.out.println(Arrays.toString(o));
			bean.setProduct(o[0].toString());
			
			System.out.println("product name"+o[0]);
			//bean.setInsertDate(o[1].toString());
			if(o[1]==null)
			{
				bean.setInsertDate("N/A");
				
			}
			else
			{
				bean.setInsertDate(o[1].toString());	
			}
			bean.setManufacturer(o[2].toString());
			bean.setWeight(Double.parseDouble(o[3].toString()));
			bean.setUnitName(o[4].toString());
			// bean.setTotalAmount((Double)o[1]);
			System.out.println("***************" + o[0]);
			map.put(count, bean);
			count++;
		}
		return map;
	}
//
	
	public Map getAllPo(String category) {
		int count = 1;
		ProductDetailsDao dao = new ProductDetailsDao();
		List list = dao.getAllPono(category);

		Map map = new HashMap();
		for (int i = 0; i < list.size(); i++) {
			Object[] o = (Object[]) list.get(i);
			AdvanceBookingBean bean = new AdvanceBookingBean();
			System.out.println(Arrays.toString(o));
			bean.setPk_Adv_Booking_id(Long.parseLong(o[0].toString()));
			bean.setBookingNo(Long.parseLong(o[1].toString()));


			System.out.println("***************" + bean.getPk_Adv_Booking_id()+" book -  "+bean.getBookingNo());
			map.put(count, bean);
			count++;
		}
		return map;
	}
	
	public Map getProductDetailsForPO(String productId) {

		ProductDetailsDao dao = new ProductDetailsDao();
		List list = dao.getProductDetails(productId);
		System.out.println(list.size());
		Map map1 = new HashMap();

		for (int i = 0; i < list.size(); i++) {
			Object[] o = (Object[]) list.get(i);
			GetProductDetailPO bean = new GetProductDetailPO();

			bean.setProductID((BigInteger) o[0]);
			bean.setProductName((String) o[1]);
			bean.setBuyPrice((BigDecimal) o[2]);
			bean.setSalePrice((BigDecimal) o[3]);
			bean.setWeight((BigDecimal) o[4]);
			bean.setMrp((BigDecimal) o[5]);
			/* bean.setFk_unit_id((BigInteger)o[5]); */
			bean.setQuantity(0d);
			// System.out.println("***************"+o[0]+"\t"+o[5]);
			map1.put(bean.getProductID(), bean);
		}
		return map1;

	}

	public Map getProductDetailsForGoodsReceiveForTax(HttpServletRequest request)
	{
		String proName = request.getParameter("proName");
		String fk_cat_id = request.getParameter("fk_cat_id");
		String fk_subCat_id = request.getParameter("fk_subCat_id");
		String packweight = request.getParameter("packweight");
		String booking = request.getParameter("booking");
		String productId = request.getParameter("productId");
		System.out.println("packweight - "+packweight+" , productId - "+productId);
		ProductDetailsDao dao = new ProductDetailsDao();
		List list1 = null;
		List list2 = null;
		if(booking == null || booking.isEmpty())
		{
			list1 = dao.getProductDetailsForTaxGridInGoodsReceive(proName, fk_cat_id, fk_subCat_id, packweight,productId, request);
			System.out.println(list1.size());
		}
		else if(booking != null)
		{
			list2 = dao.getProductDetailsForTaxGridInGoodsReceiveForAB(booking, request);
			System.out.println(list2.size());
		}

		Map map1 = new HashMap();

		if( list1 != null && list1.size() > 0)
		{
			for (int i = 0; i < list1.size(); i++) {
				Object[] o = (Object[]) list1.get(i);
				GetProductDetailforGoodRec bean = new GetProductDetailforGoodRec();

				bean.setProductID((BigInteger) o[0]);
				bean.setProductName((String) o[1]);
				bean.setManufacturer((String) o[2]);
				bean.setHsn((String) o[3]);
				bean.setWeight((BigDecimal) o[4]);
				bean.setUnitName((String) o[5]);

				bean.setCatIDforVAt((BigInteger) o[6]);
				bean.setSubCatId((BigInteger) o[7]);
			bean.setBuyPrice((BigDecimal) o[8]);
			//	bean.setBuyPrice((BigDecimal) o[10]);
				bean.setSalePrice((BigDecimal) o[9]);
				bean.setMrp((BigDecimal) o[10]);
				bean.setTaxPercentage((BigDecimal) o[11]);
				bean.setTaxName((String) o[12]);
				if (o[13] == null || o[13].toString().equalsIgnoreCase("")) {
					bean.setSalepriceEx("0");
				} else {
					bean.setSalepriceEx(o[13].toString());
				}
				bean.setSgst(Double.parseDouble(o[14].toString()));
				bean.setCgst(Double.parseDouble(o[15].toString()));
				bean.setSubCatName(o[16].toString());
				
				bean.setUnitvalue(Double.parseDouble(o[17].toString()));
				bean.setUnitdesc(o[18].toString());
				bean.setTotalExTax(0.0);
				bean.setDiscount(0.0);
				bean.setDiscountAmount(0.0);
				bean.setIgst1(0d);
				bean.setBuyPriceEx("0");
				bean.setAdvancebookingId(0l);
				
				String tax = bean.getTaxName();
				BigDecimal taxperc = bean.getTaxPercentage();
				
				if (tax.equalsIgnoreCase("GST0") || tax.equalsIgnoreCase("GST5") || tax.equalsIgnoreCase("GST12")
						|| tax.equalsIgnoreCase("GST18") || tax.equalsIgnoreCase("GST28")) {
					
					bean.setGst(taxperc);
					bean.setIgst(BigDecimal.ZERO);
				} else {
					bean.setGst(BigDecimal.ZERO);
					bean.setIgst(taxperc);
				}
				
				bean.setQuantity(0d);
				bean.setDcNum(BigDecimal.ZERO);
				BigDecimal w = bean.getWeight();
				bean.setWeightAftShortMinus(w);
							
				map1.put(bean.getProductID(), bean);
			}
		}
		else if(list2 != null && list2.size() > 0)
		{
			for (int i = 0; i < list2.size(); i++) {
				Object[] o = (Object[]) list2.get(i);
				GetProductDetailPO bean = new GetProductDetailPO();
System.out.println("rslt po -  "+Arrays.toString(o));
				bean.setProductID((BigInteger) o[0]);
				bean.setProductName((String) o[1]);
				bean.setManufacturer((String) o[2]);
				bean.setHsn((String) o[3]);
				bean.setWeight(BigDecimal.valueOf(Double.parseDouble(o[4].toString())));

	
				bean.setCatIDforVAt((BigInteger) o[6]);
				bean.setSubCatId((BigInteger) o[7]);
				bean.setBuyPrice((BigDecimal) o[8]);
				bean.setSgst((Double) o[9]);
				bean.setCgst((Double) o[10]);
				bean.setSubCatName((String) o[11]);
				
				bean.setDiscountAmount(BigDecimal.valueOf(Double.parseDouble(o[12].toString())));
				bean.setDiscount(BigDecimal.valueOf(Double.parseDouble(o[13].toString())));
				
				bean.setAdvancebookingId(Long.parseLong(o[14].toString()));
				bean.setQuantity(Double.parseDouble(o[15].toString()));
				bean.setPkbookingId(Long.parseLong(o[16].toString()));
				bean.setBuyPriceEx(o[17].toString());
				bean.setIgst1(Double.parseDouble(o[18].toString()));
				bean.setTotal(Double.parseDouble(o[19].toString()));
				bean.setTotalExTax(Double.parseDouble(o[20].toString()));
								
				bean.setUnitName(o[21].toString());
			
				bean.setUnitvalue(Double.parseDouble(o[23].toString()));
				bean.setUnitdesc(o[22].toString());
				
				map1.put(bean.getPkbookingId(), bean);
		}
	}
				return map1;

	}
//
	
	public Map getProducttx(HttpServletRequest request)
	{
		String proName = request.getParameter("proName");
		String fk_cat_id = request.getParameter("fk_cat_id");
		String fk_subCat_id = request.getParameter("fk_subCat_id");
		String shop_id = request.getParameter("shop_id");
		String productId = request.getParameter("productId");
		String pack = request.getParameter("pack");
		String packweight = request.getParameter("packweight");
		
		ProductDetailsDao dao = new ProductDetailsDao();
		List list1 = null;
		List list2 = null;
System.out.println("productId "+productId+" , proName-  "+proName+" , fk_cat_id  "+fk_cat_id+" fk_subCat_id -  "+fk_subCat_id+" shop_id - "+shop_id+" , pack = "+pack+" , weight - "+packweight);
		
		list1 = dao.getProductTx(proName, fk_cat_id, fk_subCat_id, productId, shop_id,pack,packweight,request);
			System.out.println(list1.size());



		Map map1 = new HashMap();


			for (int i = 0; i < list1.size(); i++) {
				Object[] o = (Object[]) list1.get(i);
				Stock bean = new Stock();
System.out.println("fetch for grid  - "+Arrays.toString(o));
				bean.setPkStockId(Long.parseLong(o[0].toString()));
				bean.setCatID(Long.parseLong(o[1].toString()));
				bean.setSubCatId(Long.parseLong(o[2].toString()));
				bean.setFk_shop_id(Long.parseLong(o[3].toString()));

				bean.setProductName(o[4].toString());

				bean.setCompanyName(o[5].toString());
				bean.setQuantity(Double.parseDouble(o[6].toString()));
				bean.setUnit(o[7].toString());
				bean.setShopName(o[8].toString());
				bean.setProductId(Long.parseLong(o[9].toString()));
				bean.setQuantityTx(0d);
				bean.setPack_type(o[10].toString());
				bean.setWeight(Double.parseDouble(o[11].toString()));
				map1.put(bean.getPkStockId(), bean);
			}
		
	
				return map1;

	}
	
	//
	public Map getProductstock(HttpServletRequest request)
	{
		String proName = request.getParameter("proName");
		String fk_cat_id = request.getParameter("fk_cat_id");
		String fk_subCat_id = request.getParameter("fk_subCat_id");
	//	String shop_id = request.getParameter("shop_id");
		String productId = request.getParameter("productId");

		HttpSession session1 = request.getSession(true);
		
		String shop_id = (String) session1.getAttribute("shopid");
	//	String shopName = (String) session1.getAttribute("shopName");
		
		ProductDetailsDao dao = new ProductDetailsDao();
		List list1 = null;
		List list2 = null;
System.out.println("productId "+productId+" , proName-  "+proName+" , fk_cat_id  "+fk_cat_id+" fk_subCat_id -  "+fk_subCat_id+" shop_id - "+shop_id);
		
		list1 = dao.getProductstock(proName, fk_cat_id, fk_subCat_id, productId, shop_id,request);
			System.out.println(list1.size());



		Map map1 = new HashMap();


			for (int i = 0; i < list1.size(); i++) {
				Object[] o = (Object[]) list1.get(i);
				Stock bean = new Stock();

				bean.setPkStockId(Long.parseLong(o[0].toString()));
				bean.setCatID(Long.parseLong(o[1].toString()));
				bean.setSubCatId(Long.parseLong(o[2].toString()));
				bean.setFk_shop_id(Long.parseLong(o[3].toString()));

				bean.setProductName(o[4].toString());

				bean.setCompanyName(o[5].toString());
				bean.setQuantity(Double.parseDouble(o[6].toString()));
				bean.setUnit(o[7].toString());
				bean.setShopName(o[8].toString());
				bean.setProductId(Long.parseLong(o[9].toString()));
				bean.setQuantityTx(0d);
				map1.put(bean.getPkStockId(), bean);
			}
		
	
				return map1;

	}
	
	
	/*-----fetch data from database into grid-----*/
	public Map getProductDetailsForAdvanceBooking1(HttpServletRequest request) 
	{
		String proName = request.getParameter("proName");
		String fk_cat_id = request.getParameter("fk_cat_id");
		String fk_subCat_id = request.getParameter("fk_subCat_id");
		String packweight = request.getParameter("packweight");

		ProductDetailsDao dao = new ProductDetailsDao();
		
		List list = dao.getProductDetailsForadvanceBooking(proName, fk_cat_id, fk_subCat_id, packweight, request);
		
		Map map1 = new HashMap();

		for (int i = 0; i < list.size(); i++) {
			Object[] o = (Object[]) list.get(i);
			
			AdvanceBookingAB bean = new AdvanceBookingAB();

			bean.setProductID((BigInteger) o[0]);
			bean.setProdName((String) o[1]);
			bean.setCompany((String) o[2]);
			bean.setHsn((String) o[3]);
			bean.setPacking((BigDecimal) o[4]);
			if(o[5].equals("pcs")) {
				bean.setUnit("Box/pcs");
			}else {
				bean.setUnit((String) o[5]);
			}
			bean.setCatID((BigInteger) o[6]);
			bean.setSubcatID((BigInteger) o[7]);
			bean.setBuyPrice((BigDecimal) o[8]);
			bean.setSalePrice((BigDecimal) o[9]);
			bean.setMrp((BigDecimal) o[10]);
			bean.setTaxPercentage((BigDecimal) o[11]);
			bean.setTaxName((String) o[12]);
			if (o[13] == null || o[13].toString().equalsIgnoreCase("")) {
				bean.setSalepriceEx("0");
			} else {
				bean.setSalepriceEx(o[13].toString());
			}
			bean.setSgst((Double) o[14]);
			bean.setCgst((Double) o[15]);
			bean.setSubCatName((String) o[16]);

			bean.setBuyPriceEx("0");
			bean.setQuantity("0");
			bean.setTotal("0");
			bean.setDiscount(0.0);
			bean.setDiscountAmount(0.0);
			bean.setIgst1(0.0);
									
			map1.put(bean.getProductID(), bean);
		}
		return map1;

	}
	
	public Map getProductDetailsforbill(String productId) {

		ProductDetailsDao dao = new ProductDetailsDao();
		List list = dao.getProductDetailsforbill(productId);
		System.out.println(list.size());
		Map map1 = new HashMap();

		for (int i = 0; i < list.size(); i++) {
			Object[] o = (Object[]) list.get(i);
			GetProductDetailPO bean = new GetProductDetailPO();

			bean.setProductID((BigInteger) o[0]);
			bean.setProductName((String) o[1]);
			bean.setBuyPrice((BigDecimal) o[2]);
			bean.setSalePrice((BigDecimal) o[3]);
			bean.setWeight((BigDecimal) o[4]);
			/* bean.setFk_unit_id((BigInteger)o[5]); */
			// bean.setBatchNo((BigInteger)o[5]);
			String batchNo = (String) o[5];
			if (batchNo != null) {

				bean.setBatchNo(batchNo);
			} else {
				bean.setBatchNo(batchNo);
			}
			java.sql.Date expiryDate = (java.sql.Date) o[6];

			if (expiryDate == null) {

				bean.setExpireDate("N/A");
			} else {

				bean.setExpireDate(o[6].toString());

			}

			bean.setTaxPercentage((BigDecimal) o[7]);
			bean.setQuantity(1d);
			// System.out.println("***************"+o[0]+"\t"+o[5]);
			map1.put(bean.getProductID(), bean);
		}
		return map1;

	}

	public Map getProductDetailsforseedANdPestisidebill(String productId) {

		ProductDetailsDao dao = new ProductDetailsDao();
		List list = dao.getProductDetailsforseedANdPestisidebill(productId);
		System.out.println(list.size());
		Map map1 = new HashMap();

		for (int i = 0; i < list.size(); i++) {
			Object[] o = (Object[]) list.get(i);
			System.out.println(Arrays.toString(o));
			GetProductDetailPO bean = new GetProductDetailPO();

			String batchNo = (String) o[0];

			bean.setBatchNo(batchNo);

			bean.setProductID((BigInteger) o[1]);
			bean.setQuantityForBatchNo((BigDecimal) o[2]);
			// bean.setQuantity(1l);
			// System.out.println("***************"+o[0]+"\t"+o[5]);
			map1.put(bean.getBatchNo(), bean);
		}
		return map1;

	}

	public Map getProductDetailsByBatchNo(String batchNo1) {

		ProductDetailsDao dao = new ProductDetailsDao();
		List list = dao.getProductDetailsByBatchNo(batchNo1);
		System.out.println(list.size());
		Map map1 = new HashMap();

		for (int i = 0; i < list.size(); i++) {
			Object[] o = (Object[]) list.get(i);
			GetProductDetailPO bean = new GetProductDetailPO();

			bean.setProductID((BigInteger) o[0]);
			bean.setProductName((String) o[1]);
			bean.setBuyPrice((BigDecimal) o[2]);
			bean.setSalePrice((BigDecimal) o[3]);
			bean.setWeight((BigDecimal) o[4]);
			/* bean.setFk_unit_id((BigInteger)o[5]); */
			// bean.setBatchNo((BigInteger)o[5]);
			String batchNo = (String) o[5];

			if (batchNo != null) {

				bean.setBatchNo(batchNo);
			} else {
				bean.setBatchNo(batchNo);
			}
			java.sql.Date expiryDate = (java.sql.Date) o[6];

			if (expiryDate == null) {

				bean.setExpireDate("N/A");
			} else {

				bean.setExpireDate(o[6].toString());

			}
			bean.setTaxPercentage((BigDecimal) o[7]);
			bean.setQuantity(1d);
			System.out.println("***************" + o[0] + "\t" + o[5]);
			map1.put(bean.getBatchNo(), bean);
		}
		return map1;

	}
	/*
	 * public Map getProductDetailsPO(String itemName) {
	 * 
	 * ProductDetailsDao dao = new ProductDetailsDao(); List list =
	 * dao.getProductDetails(itemName); System.out.println(list.size()); Map map1 =
	 * new HashMap(); for(int i=0;i<list.size();i++) { Object[] o =
	 * (Object[])list.get(i); PoItemDisplayBean bean = new PoItemDisplayBean();
	 * 
	 * bean.setItemID((BigInteger)o[0]); bean.setColor((String)o[1]);
	 * bean.setItemName((String)o[2]);
	 * bean.setBuyPriceForItemNAme((BigDecimal)o[3]); bean.setSize((String)o[4]);
	 * bean.setQuantity(1l); bean.setModel((String)o[5]);
	 * bean.setVatPec((Double)o[6]);
	 * //System.out.println("***************"+o[0]+"\t"+o[5]);
	 * map1.put(bean.getItemID(),bean); } return map1; }
	 */

	public List getProductDetailForReportAsPerCategory(HttpServletRequest request, HttpServletResponse response) {

		String cat = request.getParameter("cat");
		System.out.println(cat + "Selected Category");

		Map<Long, ProductDetailsForReports> map = new HashMap<Long, ProductDetailsForReports>();

		ProductDetailsDao dao = new ProductDetailsDao();
		List<ProductDetailsForReports> productList = dao.getProductDetailForReportAsPerCat(cat);

		return productList;

	}

	public Map getAllProductByGodown(String fk_godown_id) {
		ProductDetailsDao dao = new ProductDetailsDao();
		List list = dao.getAllProductByGodown(fk_godown_id);
		Map map = new HashMap();
		for (int i = 0; i < list.size(); i++) {
			Object[] o = (Object[]) list.get(i);
			GetProductDetails bean = new GetProductDetails();
			System.out.println(Arrays.toString(o));
			bean.setProduct(o[0].toString());
			;
			bean.setInsertDate(o[1].toString());
			// bean.setTotalAmount((Double)o[1]);
			System.out.println("***************" + o[0]);
			map.put(bean.getProduct(), bean);

		}
		return map;
	}

	public Map getProductDetailsGodowm(String productId) {

		ProductDetailsDao dao = new ProductDetailsDao();
		List list = dao.getProductDetailsGodowm(productId);
		System.out.println(list.size());
		Map map1 = new HashMap();

		for (int i = 0; i < list.size(); i++) {
			Object[] o = (Object[]) list.get(i);
			GetProductDetailPO bean = new GetProductDetailPO();

			bean.setProductID((BigInteger) o[0]);
			bean.setProductName((String) o[1]);
			bean.setBuyPrice((BigDecimal) o[2]);
			bean.setSalePrice((BigDecimal) o[3]);
			bean.setWeight((BigDecimal) o[4]);
			/* bean.setFk_unit_id((BigInteger)o[5]); */
			bean.setQuantity(1d);
			String batchNo = (String) o[5];
			if (batchNo.equals("")) {
				bean.setBatchNo("0");
			} else {
				bean.setBatchNo(batchNo);
			}
			java.sql.Date expiryDate = (java.sql.Date) o[6];

			if (expiryDate == null) {

				bean.setExpireDate("N/A");
			} else {

				bean.setExpireDate(o[6].toString());

			}
			// System.out.println("***************"+o[0]+"\t"+o[5]);
			map1.put(bean.getProductID(), bean);
		}
		return map1;

	}

	public Map getProductDetailsforbillByBarcode(String barcode) {

		ProductDetailsDao dao = new ProductDetailsDao();
		List list = dao.getProductDetailsforbillAsPerBarcode(barcode);
		System.out.println(list.size());
		Map map1 = new HashMap();

		for (int i = 0; i < list.size(); i++) {
			Object[] o = (Object[]) list.get(i);
			GetProductDetailPO bean = new GetProductDetailPO();

			bean.setProductID((BigInteger) o[0]);
			bean.setProductName((String) o[1]);
			bean.setBuyPrice((BigDecimal) o[2]);
			bean.setSalePrice((BigDecimal) o[3]);
			bean.setWeight((BigDecimal) o[4]);
			/* bean.setFk_unit_id((BigInteger)o[5]); */
			// bean.setBatchNo((BigInteger)o[5]);
			String batchNo = (String) o[5];
			if (batchNo != null) {

				bean.setBatchNo(batchNo);
			} else {
				bean.setBatchNo(batchNo);
			}
			java.sql.Date expiryDate = (java.sql.Date) o[6];

			if (expiryDate == null) {

				bean.setExpireDate("N/A");
			} else {

				bean.setExpireDate(o[6].toString());

			}
			bean.setQuantity(1d);
			// System.out.println("***************"+o[0]+"\t"+o[5]);
			map1.put(bean.getProductID(), bean);
		}
		return map1;

	}

	public Map getProductDetailsforseedANdPestisidebillAsPerBarcode(String barcode) {

		ProductDetailsDao dao = new ProductDetailsDao();
		List list = dao.getProductDetailsforseedANdPestisidebillAsPerBarcodeNum(barcode);
		System.out.println(list.size());
		Map map1 = new HashMap();

		for (int i = 0; i < list.size(); i++) {
			Object[] o = (Object[]) list.get(i);
			System.out.println(Arrays.toString(o));
			GetProductDetailPO bean = new GetProductDetailPO();

			String batchNo = (String) o[0];

			bean.setBatchNo(batchNo);

			bean.setProductID((BigInteger) o[1]);
			bean.setQuantityForBatchNo((BigDecimal) o[2]);
			// bean.setQuantity(1l);
			// System.out.println("***************"+o[0]+"\t"+o[5]);
			map1.put(bean.getBatchNo(), bean);
		}
		return map1;

	}

	public Map getProductDetailsForEdit(HttpServletRequest request) {
		
		String productId = request.getParameter("productId");
		Long productID = Long.parseLong(productId);

		ProductDetailsDao dao1 = new ProductDetailsDao();
		List catList = dao1.getAllEmployeeDetailsForEdit(productID, request);

		Map map = new HashMap();
		for (int i = 0; i < catList.size(); i++) {
			Object[] o = (Object[]) catList.get(i);

			GetProductDetails bean = new GetProductDetails();
			
			bean.setManufacturer(o[0].toString());
			bean.setTaxPercentage(Double.parseDouble(o[1].toString()));
			bean.setTaxType(o[2].toString());
			if(o[3].toString().equals("pcs")) {
				bean.setUnitName("Box/pcs");
			}else {
				bean.setUnitName(o[3].toString());
			}
			
			bean.setBuyPrice(Double.parseDouble(o[4].toString()));
			bean.setMrp(Double.parseDouble(o[5].toString()));
			bean.setSalePrice(Double.parseDouble(o[6].toString()));
			 
			/* bean.setCreditSalePrice(Double.parseDouble(o[7].toString())); */
			bean.setWeight(Double.parseDouble(o[8].toString()));
			// bean.setHsn(Long.parseLong(o[9].toString()));
			bean.setHsn(o[9].toString());
			bean.setSale_price_ex_tax(Double.parseDouble(o[10].toString()));
			bean.setProduct(o[11].toString());
			bean.setDescription(o[12].toString());
			
			map.put(bean.getManufacturer(), bean);
		}
		System.out.println("out of helper return map : " + map);
		return map;

	}

	public void editProductDetail(HttpServletRequest request, HttpServletResponse response) {

		String productId = request.getParameter("productId");
		String productname1 = request.getParameter("productname1");
		String unitId = request.getParameter("unitId");
        String manufacturingCompany = request.getParameter("manufacturingCompany");
       	String weight = request.getParameter("weight");
		String fk_tax_id = request.getParameter("fk_tax_id");
		String taxPercentage = request.getParameter("taxPercentage");
		String buyPrice = request.getParameter("buyPrice"); 
		String mrp =request.getParameter("mrp"); 
		String salePrice =request.getParameter("salePrice"); 
		String spwithoutgst = request.getParameter("spwithoutgst");
		String existedTax = request.getParameter("existedTax");
		String existedTaxPercentage = request.getParameter("existedTaxPercentage");
		String newHsn = request.getParameter("newHsn");
		String existedHsn = request.getParameter("existedHsn");
		String sgst = request.getParameter("sgst");
		String cgst = request.getParameter("cgst");
		String description = request.getParameter("description");
		
		HibernateUtility hbu = null;
		Session session = null;
		Transaction transaction = null;

		hbu = HibernateUtility.getInstance();
		session = hbu.getHibernateSession();
		transaction = session.beginTransaction();

		long productID = Long.parseLong(productId);
		
		ProductDetailsBean det = (ProductDetailsBean) session.get(ProductDetailsBean.class, productID);
		
		det.setProductName(productname1);
	    det.setExistedhsn(existedHsn);
		det.setSale_price_ex_tax(Double.parseDouble(spwithoutgst));
		
		  if(buyPrice == null) 
		  { 
			 det.setBuyPrice(Double.parseDouble("0"));  
		  } else
		  { 
			  det.setBuyPrice(Double.parseDouble(buyPrice)); 
		  }
		 		
		  if(salePrice == null) 
		  { 
			  det.setSalePrice(Double.parseDouble("0")); 
		  } 
		  else 
		  {
		  det.setSalePrice(Double.parseDouble(salePrice)); 
		  }
		 		
		  if(mrp == null)
		  { 
			  det.setMrp(Double.parseDouble("0")); 
		  }
		  else 
		  {
			  det.setMrp(Double.parseDouble(mrp)); 
		  }
		  
		  if(sgst == null)
		  { 
			  det.setSgst(Double.parseDouble("0")); 
		  }
		  else 
		  {
			  det.setSgst(Double.parseDouble(sgst)); 
		  }
		  
		  if(cgst == null)
		  { 
			  det.setCgst(Double.parseDouble("0")); 
		  }
		  else 
		  {
			  det.setCgst(Double.parseDouble(cgst)); 
		  }
		 		 
		if (taxPercentage == null) {

			det.setTaxPercentage(Double.parseDouble(existedTaxPercentage));
		} else {
			det.setTaxPercentage(Double.parseDouble(taxPercentage));
		}

		if (fk_tax_id == null) {
			det.setFkTaxId(Long.parseLong(existedTax));
			System.out.println("LN 802 WHEN TAX ID = NULL TX ID USING GETTER ===========> " + det.getFkTaxId());
		} else {
			det.setFkTaxId(Long.parseLong(fk_tax_id));
			System.out.println("LN 805 WHEN TAX ID = ISNOTNULL TX ID USING GETTER ===========> " + det.getFkTaxId());
		}

		if (weight == null) 
		{
			det.setWeight(Double.parseDouble(("0")));
		} else {
			det.setWeight(Double.parseDouble(weight));
		}

		 if(manufacturingCompany == "")
		 { 
			 det.setManufacturingCompany("N/A"); 
		 } else {
			 det.setManufacturingCompany(manufacturingCompany); 
		 }
		 
		if (unitId == null) {
			det.setFk_unit_id(Long.parseLong(("N/A")));
		} else {
			det.setFk_unit_id(Long.parseLong(unitId));
		}

		if (newHsn == "") {
			det.setHsn(existedHsn);
		} else {
			det.setHsn((newHsn));
		}
		if (description == "") {
			det.setDescription("N/A");
		} else {
			det.setDescription(description);
		}
		
      
		session.saveOrUpdate(det);
		transaction.commit();

		System.out.println("Record updated successfully.");
		
		// For Stock Details Change
		
		System.out.println("<================================ STOCK UPDATE AFTER EDIT PRODUCT DETAIL ===============================>");
		
		HibernateUtility hbu1 = null;
		Session session1 = null;
		Transaction transaction1 = null;
		
		try {
			 
			Long pk_product_id;
			String productName;
			String companyName;
			String unitName;
			
			hbu1 = HibernateUtility.getInstance();
			session1 = hbu1.getHibernateSession();
			transaction1 = session1.beginTransaction();
			//System.out.println("For Query Product ID-------> "+productId);
			Query query1 = session1.createSQLQuery("select pd.pk_product_id, pd.product_name, pd.manufacturing_company, su.unit_name from product_details pd join sold_units su on su.pk_unit_id = pd.fk_unit_id where pd.pk_product_id = '" + productId + "'");

			List<Object[]> list1 = query1.list();
			
			for (Object[] object : list1)
			{
				pk_product_id = Long.parseLong(object[0].toString());
				productName = (object[1].toString());
				companyName = (object[2].toString());
				unitName = (object[3].toString());
				
				Stock Stock = (Stock)session1.get(Stock.class, new Long(pk_product_id));
								
				Stock.setProductName(productName);
				Stock.setCompanyName(companyName);
				Stock.setUnit(unitName);
				
				System.out.println("===================== UPDATING STOCK ====================");
				session1.saveOrUpdate(Stock);
				transaction1.commit();
				System.out.println("Successfully Update Stock");
		    }
			
		}
		catch (RuntimeException e) {
			try {
				
				transaction1.rollback();
				
			} catch (RuntimeException rbe) {
				
				Log.error("Couldn't roll back tranaction", rbe);
			}
		}
		finally {
			hbu1.closeSession(session1);
	}

}
	
	public Map getAllProductByCatAndBySupForGoodsReceive(String category, String supplier) {

		ProductDetailsDao dao = new ProductDetailsDao();
		List list = dao.getAllProductBySCategoryAndBySuppliersForGoodsReceive(category, supplier);
		Map map = new HashMap();
		for (int i = 0; i < list.size(); i++) {
			Object[] o = (Object[]) list.get(i);
			GetProductDetails bean = new GetProductDetails();
			System.out.println(Arrays.toString(o));
			bean.setProduct(o[0].toString());
			;
			bean.setInsertDate(o[1].toString());
			// bean.setTotalAmount((Double)o[1]);
			System.out.println("***************" + o[0]);
			map.put(bean.getProduct(), bean);

		}
		return map;

	}

	public Map getBookedProductDetails(String productId2, String supplier, String category) {
		ProductDetailsDao dao = new ProductDetailsDao();
		List list = dao.getAdvanceBookedProductDetailsForGoodsReceive(productId2, category, supplier);
		System.out.println(list.size());
		Map map1 = new HashMap();

		for (int i = 0; i < list.size(); i++) {
			Object[] o = (Object[]) list.get(i);
			GetProductDetailPO bean = new GetProductDetailPO();

			bean.setProductID((BigInteger) o[0]);
			bean.setProductName((String) o[1]);
			bean.setBuyPrice((BigDecimal) o[2]);
			bean.setSalePrice((BigDecimal) o[3]);
			bean.setWeight((BigDecimal) o[4]);
			bean.setMrp((BigDecimal) o[5]);
			/* bean.setFk_unit_id((BigInteger)o[5]); */
			bean.setQuantity(0d);
			// System.out.println("***************"+o[0]+"\t"+o[5]);
			map1.put(bean.getProductID(), bean);
		}
		return map1;

	}

	public Map getBookedProductDetailsWithTax(String productId3, String supplier, String category) {

		ProductDetailsDao dao = new ProductDetailsDao();
		List list = dao.getAdvanceBookedProductDetailsForGoodsReceiveWithTax(productId3, category, supplier);
		System.out.println(list.size());
		Map map1 = new HashMap();

		for (int i = 0; i < list.size(); i++) {
			Object[] o = (Object[]) list.get(i);
			GetProductDetailPO bean = new GetProductDetailPO();

			bean.setProductID((BigInteger) o[0]);
			bean.setProductName((String) o[1]);
			bean.setBuyPrice((BigDecimal) o[2]);
			bean.setSalePrice((BigDecimal) o[3]);
			bean.setWeight((BigDecimal) o[4]);
			bean.setTaxPercentage((BigDecimal) o[5]);
			bean.setMrp((BigDecimal) o[6]);
			/* bean.setFk_unit_id((BigInteger)o[5]); */
			bean.setQuantity(0d);
			// System.out.println("***************"+o[0]+"\t"+o[5]);
			map1.put(bean.getProductID(), bean);
		}
		return map1;

	}

	public Map getpreviousDetsil(String productId2) {
		// TODO Auto-generated method stub
		ProductDetailsDao dao = new ProductDetailsDao();
		List list = dao.getpreviousDetsil(productId2);
		System.out.println(list.size());
		Map map1 = new HashMap();

		for (int i = 0; i < list.size(); i++) {
			Object[] o = (Object[]) list.get(i);
			GetProductDetailPO bean = new GetProductDetailPO();

			bean.setDate((Date) o[0]);
			bean.setProductName((String) o[1]);
			bean.setBuyPrice((BigDecimal) o[2]);
			bean.setSalePrice((BigDecimal) o[3]);
			bean.setWeight((BigDecimal) o[4]);
			bean.setMrp((BigDecimal) o[5]);
			/* bean.setFk_unit_id((BigInteger)o[5]); */
			bean.setQuantity(0d);
			// System.out.println("***************"+o[0]+"\t"+o[5]);
			map1.put(bean.getProductID(), bean);
		}
		return map1;
	}

	public Map getProductDetailsForAdvanceBooking(String proName) {

		ProductDetailsDao dao = new ProductDetailsDao();
		List list = dao.getProductDetailsForAdvanceBook(proName);
		System.out.println(list.size());
		Map map1 = new HashMap();

		for (int i = 0; i < list.size(); i++) {
			Object[] o = (Object[]) list.get(i);
			GetProductDetailPO bean = new GetProductDetailPO();

			bean.setProductID((BigInteger) o[0]);
			bean.setProductName((String) o[1]);
			bean.setBuyPrice((BigDecimal) o[2]);
			bean.setSalePrice((BigDecimal) o[3]);
			bean.setWeight((BigDecimal) o[4]);
			bean.setMrp((BigDecimal) o[5]);
			bean.setManufacturer(o[6].toString());
			bean.setUnitName(o[7].toString());
			bean.setCatId(o[8].toString());
			/* bean.setFk_unit_id((BigInteger)o[5]); */
			bean.setQuantity(0d);
			System.out.println("***************" + o[0] + "\t" + o[5]);
			map1.put(bean.getProductID(), bean);
		}
		return map1;

	}

	public Map getAllProductByCatAndBySupForGoodsReceiveNew(String category, String supplier) {
		int count = 1;
		ProductDetailsDao dao = new ProductDetailsDao();
		List list = dao.getAllProductBySCategoryAndBySuppliersForGoodsReceiveNew(category, supplier);
		Map map = new HashMap();
		for (int i = 0; i < list.size(); i++) {
			Object[] o = (Object[]) list.get(i);
			GetProductDetails bean = new GetProductDetails();
			System.out.println(Arrays.toString(o));
			bean.setProduct(o[0].toString());
			;
			bean.setInsertDate(o[1].toString());
			bean.setManufacturer(o[2].toString());
			bean.setWeight(Double.parseDouble(o[3].toString()));
			bean.setUnitName(o[4].toString());
			// bean.setTotalAmount((Double)o[1]);
			System.out.println("***************" + o[0]);
			map.put(count, bean);
			count++;
		}
		return map;

	}

	public Map getBookedProductDetailsNew(String proName, String supplier, String category, String company,
			String weight) {

		ProductDetailsDao dao = new ProductDetailsDao();
		List list = dao.getAdvanceBookedProductDetailsForGoodsReceiveNew(proName, category, supplier, company, weight);
		System.out.println(list.size());
		Map map1 = new HashMap();

		for (int i = 0; i < list.size(); i++) {
			Object[] o = (Object[]) list.get(i);
			GetProductDetailPO bean = new GetProductDetailPO();

			bean.setProductID((BigInteger) o[0]);
			bean.setProductName((String) o[1]);
			bean.setBuyPrice((BigDecimal) o[2]);
			bean.setSalePrice((BigDecimal) o[3]);
			bean.setWeight((BigDecimal) o[4]);
			bean.setMrp((BigDecimal) o[5]);
			bean.setManufacturer((String) o[6]);
			/* bean.setFk_unit_id((BigInteger)o[5]); */
			bean.setQuantity(Double.parseDouble(o[7].toString()));
			// System.out.println("***************"+o[0]+"\t"+o[5]);
			map1.put(bean.getProductID(), bean);
		}
		return map1;

	}

	public Map getBookedProductDetailsWithTax(String proName, String supplier, String category, String company,
			String weight) {

		ProductDetailsDao dao = new ProductDetailsDao();
		List list = dao.getAdvanceBookedProductDetailsForGoodsReceiveWithTaxNew(proName, category, supplier, company,
				weight);
		System.out.println(list.size());
		Map map1 = new HashMap();

		for (int i = 0; i < list.size(); i++) {
			Object[] o = (Object[]) list.get(i);
			GetProductDetailPO bean = new GetProductDetailPO();

			bean.setProductID((BigInteger) o[0]);
			bean.setProductName((String) o[1]);
			bean.setBuyPrice((BigDecimal) o[2]);
			bean.setSalePrice((BigDecimal) o[3]);
			bean.setWeight((BigDecimal) o[4]);
			bean.setTaxPercentage((BigDecimal) o[5]);
			bean.setMrp((BigDecimal) o[6]);
			bean.setManufacturer((String) o[7]);
			/* bean.setFk_unit_id((BigInteger)o[5]); */
			bean.setQuantity(0d);
			// System.out.println("***************"+o[0]+"\t"+o[5]);
			map1.put(bean.getProductID(), bean);
		}
		return map1;

	}
	
	///////product drop in billing/////////
	
	/*
	 * public Map getAllProductByCatForFertiBill(String category) {
	 * 
	 * int count = 1; ProductDetailsDao dao = new ProductDetailsDao(); List list=
	 * dao.getAllProductBySCategoryForFertilizerBill(category );
	 * 
	 * Map map = new HashMap(); for(int i=0;i<list.size();i++) { Object[] o =
	 * (Object[])list.get(i);
	 * 
	 * ProductStockDetailsBean bean=new ProductStockDetailsBean();
	 * bean.setProduct_name(o[0].toString()); bean.setCompanyname(o[1].toString());
	 * bean.setPacking(Double.parseDouble(o[2].toString()));
	 * bean.setQuantity(Long.parseLong(o[3].toString()));
	 * //bean.setExpiryDate((Date)o[4]);
	  
	 * map.put(count,bean); count++; } return map; }
	 */
		
	  public Map getAllProductByCatForFertiBill(HttpServletRequest request, HttpServletResponse response) 
	  {
	  
	  int count = 1; 
	  String shopId = request.getParameter("shopId");
	  
	  ProductDetailsDao dao = new ProductDetailsDao();
	  List list = dao.getAllProductBySCategoryForFertilizerBill(request,response);
	  Map map = new HashMap();
	  /*
		 * Map map = new HashMap(); for(int i=0;i<list.size();i++) {
		 * 
		 * // Object[] o : list; // Object[] o =(Object[])list.get(i); Object[] o =
		 * (Object[]) list.get(i); GetProductDetails bean = new GetProductDetails();
		 * 
		 * //System.out.println(Arrays.toString(o)); bean.setProduct(o[0].toString());
		 * bean.setManufacturer(o[1].toString());
		 * bean.setWeight(Double.parseDouble(o[2].toString()));
		 * bean.setQuantityDouble(Double.parseDouble(o[3].toString()));
		 * bean.setFkCatId(Long.parseLong(o[4].toString()));
		 * bean.setFkSubCatId(Long.parseLong(o[5].toString()));
		 * bean.setCatName(o[6].toString()); bean.setSubCatName(o[7].toString());
		 * bean.setFkShopId(Long.parseLong(o[8].toString()));
		 * bean.setShopName(o[9].toString());
		 * bean.setStockInTotalKgLtrPiece(Double.parseDouble(o[10].toString()));
		 * bean.setUnitName(o[11].toString());
		 * 
		 * if(o[12] == null) { bean.setExpiryDate("N/A"); } else { String pattern =
		 * "dd-MM-yyyy"; SimpleDateFormat simpleDateFormat = new
		 * SimpleDateFormat(pattern); Date expDate = (Date)o[12]; String expirydate =
		 * simpleDateFormat.format(expDate); bean.setExpiryDate(expirydate); }
		 * 
		 * //bean.setTotalAmount((Double)o[1]);
		 * System.out.println("***************"+o[0]); map.put(count,bean); count++; }
		 */
	  
	  return map;
	  
	  }
		
	/*
	 * public List getAllProductByCatForFertiBill(HttpServletRequest request, HttpServletResponse response) {
	 * 
	 * int count = 1; String shopId = request.getParameter("shopId");
	 * 
	 * ProductDetailsDao dao = new ProductDetailsDao(); List list=
	 * dao.getAllProductBySCategoryForFertilizerBill(request, response);
	 * 
	 * List map = new ArrayList<>(); for(int i=0;i<list.size();i++) { Object[] o =
	 * (Object[])list.get(i); GetProductDetails bean = new GetProductDetails();
	 * System.out.println(Arrays.toString(o)); bean.setProduct(o[0].toString());;
	 * bean.setManufacturer(o[1].toString());
	 * bean.setWeight(Double.parseDouble(o[2].toString()));
	 * bean.setQuantityDouble(Double.parseDouble(o[3].toString()));
	 * bean.setFkCatId(Long.parseLong(o[4].toString()));
	 * bean.setFkSubCatId(Long.parseLong(o[5].toString()));
	 * bean.setCatName(o[6].toString()); bean.setSubCatName(o[7].toString());
	 * bean.setFkShopId(Long.parseLong(o[8].toString()));
	 * bean.setShopName(o[9].toString());
	 * bean.setStockInTotalKgLtrPiece(Double.parseDouble(o[10].toString()));
	 * bean.setUnitName(o[11].toString()); if(o[12] == null) {
	 * bean.setExpiryDate("N/A"); } else { String pattern = "dd-MM-yyyy";
	 * SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern); Date
	 * expDate = (Date)o[12]; String expirydate = simpleDateFormat.format(expDate);
	 * bean.setExpiryDate(expirydate); }
	 * 
	 * //bean.setTotalAmount((Double)o[1]);
	 * System.out.println("***************"+o[0]); map.add(bean); count++; } return
	 * map;
	 * 
	 * }
	 */
	 
	public Map getAllProductByCatForSeedAndPestiBill(String category1) {

		int count = 1;
		ProductDetailsDao dao = new ProductDetailsDao();
		List list = dao.getAllProductBySCategoryForSeedAndPesticideBill(category1);

		Map map = new HashMap();
		for (int i = 0; i < list.size(); i++) {
			Object[] o = (Object[]) list.get(i);
			GetProductDetails bean = new GetProductDetails();
			System.out.println(Arrays.toString(o));
			bean.setProduct(o[0].toString());
			;
			bean.setManufacturer(o[1].toString());
			bean.setWeight(Double.parseDouble(o[2].toString()));
			bean.setUnitName(o[3].toString());
			// bean.setTotalAmount((Double)o[1]);
			System.out.println("***************" + o[0]);
			map.put(count, bean);
			count++;
		}
		return map;

	}

	
	/*
	 * public Map getAllProductByCatForSeedAndPestiBill(String category1, String
	 * category2) {
	 * 
	 * 
	 * int count = 1; ProductDetailsDao dao = new ProductDetailsDao(); List list=
	 * dao.getAllProductBySCategoryForSeedAndPesticideBill(category1,category2);
	 * 
	 * Map map = new HashMap(); for(int i=0;i<list.size();i++) { Object[] o =
	 * (Object[])list.get(i); GetProductDetails bean = new GetProductDetails();
	 * System.out.println(Arrays.toString(o)); bean.setProduct(o[0].toString());;
	 * bean.setManufacturer(o[1].toString());
	 * bean.setWeight(Double.parseDouble(o[2].toString()));
	 * //bean.setTotalAmount((Double)o[1]);
	 * System.out.println("***************"+o[0]); map.put(count,bean); count++; }
	 * return map;
	 * 
	 * 
	 * }
	 */

	public Map getAllBatchNumAndStockForSeedBilling(String proName, String company, String weight) {

		int count = 1;
		ProductDetailsDao dao = new ProductDetailsDao();
		List list = dao.getAllBatchAndStockForSeedAndPesticideBill(proName, company, weight);

		Map map = new HashMap();
		for (int i = 0; i < list.size(); i++) {
			Object[] o = (Object[]) list.get(i);
			GetProductDetails bean = new GetProductDetails();
			System.out.println(Arrays.toString(o));
			bean.setBatchNum(o[0].toString());
			bean.setStock(Double.parseDouble(o[1].toString()));
			System.out.println("***************" + o[0]);
			map.put(count, bean);
			count++;
		}
		return map;

	}

	public Map getAllProductByCatForStockReport(HttpServletRequest request) {
		int count = 1;
		ProductDetailsDao dao = new ProductDetailsDao();
		List list = dao.getAllProductBySCategoryForStockReport(request);

		Map map = new HashMap();
		for (int i = 0; i < list.size(); i++) {
			Object[] o = (Object[]) list.get(i);
			GetProductDetails bean = new GetProductDetails();
			System.out.println(Arrays.toString(o));
			bean.setProduct(o[0].toString());
			;
			bean.setManufacturer(o[1].toString());
			bean.setWeight(Double.parseDouble(o[2].toString()));
			bean.setUnitName(o[3].toString());
						
			// bean.setTotalAmount((Double)o[1]);
			System.out.println("***************" + o[0]);
			map.put(count, bean);
			count++;
		}
		return map;
	}

	public void deleteProduct(HttpServletRequest request, HttpServletResponse response) {

		String delProName = request.getParameter("delProName");

		ProductDetailsDao dao2 = new ProductDetailsDao();
		dao2.deleteProduct(delProName);

	}

	public Map getSubCatDetails(HttpServletRequest request) {

		int count = 1;
		System.out.println("IN HELPER");
		
		String fk_cat_id = request.getParameter("fk_cat_id");
		SubCategoryDetailsBean scdb = new SubCategoryDetailsBean();

		scdb.setFk_cat_id(Long.parseLong(fk_cat_id));

		ProductDetailsDao cdd = new ProductDetailsDao();
		List list = cdd.getAllSubCategory(fk_cat_id, request);

		
		System.out.println("list ======  in helper - " + list.size());
/*		if(list.size()==0) {
			
			Map map = new HashMap();
//			for (int i = 0; i < list.size(); i++) {
				System.out.println("IN HELPER");
//				Object[] o = (Object[]) list.get(i);
				SubCategoryDetailsBean bean = new SubCategoryDetailsBean();
				System.out.println("if list ==0 ");
				bean.setSubcatId(0l);
				bean.setSubcategoryName("Products");

				System.out.println("*************** - " + bean.getSubcatId()+" "+bean.getSubcategoryName());
				map.put(count, bean);
				count++;
//			}
			return map;
			
		}
		else {*/
			Map map = new HashMap();
		for (int i = 0; i < list.size(); i++) {
			System.out.println("IN HELPER");
			Object[] o = (Object[]) list.get(i);
			SubCategoryDetailsBean bean = new SubCategoryDetailsBean();
			System.out.println(Arrays.toString(o));
			bean.setSubcatId(Long.parseLong(o[0].toString()));
			bean.setSubcategoryName(o[1].toString());
			// bean.setTotalAmount((Double)o[1]);
			System.out.println("***************" + o[0]);
			map.put(count, bean);
			count++;
		}
		return map;
//		}
}

	//
	public Map getbillDetails(HttpServletRequest request) {

		int count = 1;
		System.out.println("IN HELPER");
		
		String date = request.getParameter("date");

		ProductDetailsDao cdd = new ProductDetailsDao();
		List list = cdd.getAllbill(date, request);

		
		System.out.println("list ======  in helper - " + list.size());
			Map map = new HashMap();
		for (int i = 0; i < list.size(); i++) {
	
			System.out.println("IN HELPER");
			
			Object[] o = (Object[]) list.get(i);
			
			GetBillDetails bean = new GetBillDetails();
			System.out.println(Arrays.toString(o));
			
			bean.setBillNo(Long.parseLong(o[0].toString()));
			bean.setClientName((String) o[1]);
			bean.setDate((Date)o[2]); 
			System.out.println("***************" + o[0]);
			map.put(count, bean);
			count++;
		}
		return map;

}
	
//
	public Map getcreditbillDetails(HttpServletRequest request) {

		int count = 1;
		System.out.println("IN HELPER");
		
		String date = request.getParameter("date");
		System.out.println("name "+date);
		ProductDetailsDao cdd = new ProductDetailsDao();
		List list = cdd.getAllcreditbill(date, request);

		
		System.out.println("list ======  in helper - " + list.size());
			Map map = new HashMap();
		for (int i = 0; i < list.size(); i++) {
	
			System.out.println("IN HELPER");
			
			Object[] o = (Object[]) list.get(i);
			
			GetBillDetails bean = new GetBillDetails();
			System.out.println(Arrays.toString(o));
			
			bean.setBillNo(Long.parseLong(o[0].toString()));
			bean.setClientName((String) o[1]);
			bean.setDate((Date)o[2]); 
			System.out.println("***************" + o[0]);
			map.put(count, bean);
			count++;
		}
		return map;

}
	
	
	
	    //GET CGST SGST Percentage
		public Map getCSGstPercentage( HttpServletRequest request,HttpServletResponse response) {


			//HttpSession usersession = request.getSession(true);
			//String userid = (String)usersession.getAttribute("userid");
			//String shopid = (String)usersession.getAttribute("shopid");
			String taxid = request.getParameter("taxid");
			
			ProductDetailsDao dao=new ProductDetailsDao();
			List list = dao.getCSGstPercentage(taxid);
			
			
			System.out.println(list.size());
			Map map1 = new HashMap();
			
			TaxCreationBean bean=new TaxCreationBean();
			
			for (int i = 0; i < list.size(); i++) {
				Object[] o = (Object[]) list.get(i);
				
				bean.setCgst(Double.parseDouble(o[0].toString()));
				bean.setSgst(Double.parseDouble(o[1].toString()));
				
			
				map1.put(bean.getCgst(), bean);
			}
		return map1;
	}
		
		public void delproduct(HttpServletRequest request,HttpServletResponse response) 
		{
			
	        String pkid= request.getParameter("pkid");
	       		
			System.out.println("catID - -   "+pkid);
	    		ProductDetailsDao cdd = new ProductDetailsDao();
	    		cdd.delproduct(pkid);
		}
		
		public void delsupp(HttpServletRequest request,HttpServletResponse response) 
		{
			
	        String pkid= request.getParameter("pkid");
	       		
			System.out.println("catID - -   "+pkid);
	    		ProductDetailsDao cdd = new ProductDetailsDao();
	    		cdd.delsupp(pkid);
		}
		
		public void delcust(HttpServletRequest request,HttpServletResponse response) 
		{
			
	        String pkid= request.getParameter("pkid");
	       		
			System.out.println("catID - -   "+pkid);
	    		ProductDetailsDao cdd = new ProductDetailsDao();
	    		cdd.delcust(pkid);
		}
		public void delexp(HttpServletRequest request,HttpServletResponse response) 
		{
			
	        String pkid= request.getParameter("pkid");
	       		
			System.out.println("catID - -   "+pkid);
	    		ProductDetailsDao cdd = new ProductDetailsDao();
	    		cdd.delexp(pkid);
		}
		//
		public void delbank(HttpServletRequest request,HttpServletResponse response) 
		{
			
	        String pkid= request.getParameter("pkid");
	       		
			System.out.println("catID - -   "+pkid);
	    		ProductDetailsDao cdd = new ProductDetailsDao();
	    		cdd.delbank(pkid);
		}
		//
		public void delpartner(HttpServletRequest request,HttpServletResponse response) 
		{
			
	        String pkid= request.getParameter("pkid");
	       		
			System.out.println("catID - -   "+pkid);
	    		ProductDetailsDao cdd = new ProductDetailsDao();
	    		cdd.delpartner(pkid);
		}
		
}
