package com.Fertilizer.helper;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
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
import com.Fertilizer.bean.CustomerBillBean;
import com.Fertilizer.bean.FertiSaleReturn;
import com.Fertilizer.bean.GetProductDetails;
import com.Fertilizer.bean.GetSupplierDetails;
import com.Fertilizer.bean.SaleReports;
import com.Fertilizer.bean.StockDetail;
import com.Fertilizer.dao.FertilizerBillDao;
import com.Fertilizer.dao.GoodsReceiveDao;
import com.Fertilizer.dao.ProductDetailsDao;
import com.Fertilizer.dao.SaleReturnDao;
import com.Fertilizer.dao.SupplierAccountDetailsDao;
import com.Fertilizer.dao.productTransferDao;
import com.Fertilizer.hibernate.CustomerPaymentBean;
import com.Fertilizer.hibernate.FertilizerBillBean;
import com.Fertilizer.hibernate.GoodsReceiveBean;
import com.Fertilizer.hibernate.NormalCustomerPaymentBean;
import com.Fertilizer.hibernate.SaleReturnBean;
import com.Fertilizer.hibernate.Stock;
import com.Fertilizer.hibernate.SubCategoryDetailsBean;
import com.Fertilizer.hibernate.billcancelbean;
import com.Fertilizer.utility.HibernateUtility;

//import jdk.nashorn.internal.runtime.Undefined;

public class FertilizerBillHelper
{
	Long customerBill;

	public void fertilizerBilling(HttpServletRequest request, HttpServletResponse response)throws Exception
	{
		String customerType = request.getParameter("customerType");
		
		String grossTotal = "";
		String firstPaidAmtCreditCustomer = "";
		String paymentMode = "";
		String checkNum = "";
		String nameOnCheck = "";
		String cardNo = "";
		String accNo = "";
		String bankName = "";
		String customerHiddenName = "";
		String customerName = "";
		Date dateobj = null;
		java.sql.Date sqlDate = null;
		String fkCustomerId = "";
		String fk_shop_id = "";
		
		Long billNoForPdf;

		FertilizerBillDao dao = new FertilizerBillDao();

		List bill = dao.getCustomerBill();

		for (int i = 0; i < bill.size(); i++) {
			CustomerBillBean sa = (CustomerBillBean) bill.get(i);
			customerBill = sa.getBillNo();
			//System.out.println(customerBill);

			customerBill++;
			//System.out.println(customerBill);
		}
		Integer count = Integer.parseInt(request.getParameter("count"));
		System.out.println(count);

		FertilizerBillBean bean = new FertilizerBillBean();

		for (int i = 0; i < count; i++) {

			if (customerBill == null) {
				bean.setBillNo(1l);
				billNoForPdf = 1l;
			} else {
				bean.setBillNo(customerBill);
				billNoForPdf = customerBill;
			}

			// Out Of Grid Content
			customerName = request.getParameter("customerName");
			String firmName = request.getParameter("firmName");			
			String village1 = request.getParameter("village");
			String contactNum = request.getParameter("contactNo");
			String saleDate = request.getParameter("saleDate");
			String gstNo = request.getParameter("gstNo");
			String hamaliExpense = request.getParameter("hamaliExpense");
			String hamaliExpenseWithourGST = request.getParameter("hamaliExpenseWithourGST");
			String total = request.getParameter("total");
			String description = request.getParameter("description");
			String type = request.getParameter("type");
			grossTotal = request.getParameter("grossTotal");
			fkCustomerId = request.getParameter("fkCreditCustomerID");
			customerHiddenName = request.getParameter("creditCustomerHiddenName");
			fk_shop_id = request.getParameter("fk_shop_id");
			System.out.println("fk_shop_id -   "+fk_shop_id);
			String discount = request.getParameter("discount");
			String discountAmount = request.getParameter("discountAmount");
			System.out.println("``````````` in helper vill  "+village1);
			String email = request.getParameter("email");
			String address = request.getParameter("address");
			if (customerType.equals("CREDITCUSTOMER")) 
			{
				firstPaidAmtCreditCustomer = request.getParameter("firstPaidAmtCreditCustomer");
				//System.out.println("CREDIT FIRST PAYMENT ======= " + firstPaidAmtCreditCustomer);
				
				
				if (firstPaidAmtCreditCustomer.equals("") || firstPaidAmtCreditCustomer == null) 
				{
					firstPaidAmtCreditCustomer = "0";
					bean.setNetpayAmount(0.0);
				}
				else {
					bean.setNetpayAmount(Double.parseDouble(firstPaidAmtCreditCustomer));
				}
			}

			String creditCustomerName = request.getParameter("creditCustomerName");

			if (fkCustomerId != null) {
				bean.setFkCreditCustomerId(Long.parseLong(fkCustomerId));
			} else {
				bean.setFkCreditCustomerId(0l);
			}
			
			if (description != "") {
				bean.setDescription(description);
			} else {
				bean.setDescription("N/A");
			}
			bean.setFirmName(firmName);
			
			System.out.println("email - "+email);
			bean.setEmail(email);
			
			if (creditCustomerName != null) {
				bean.setCustomerHiddenName(creditCustomerName);
			} else {
				bean.setCustomerHiddenName("N/A");
			}

			if (gstNo == null||gstNo == " "||gstNo=="undefined"||gstNo=="") {
				
				bean.setGstNo("N/A");
			} else {
				bean.setGstNo(gstNo);
			}

			if (customerName != null) {
				bean.setCustomerName(customerName);
			} else {
				bean.setCustomerName("N/A");
			}
			
			bean.setVillage(village1);
			bean.setContact(Long.parseLong(contactNum));
			/*
			 * if (village1 != null) { bean.setVillage(village1); } else {
			 * bean.setVillage("N/A"); }
			 */
			/*
			 * if (contactNum != "") { bean.setContact(Long.parseLong(contactNum)); } else {
			 * bean.setContact(0l); }
			 */
			if (discount != "") {
				bean.setDiscount(Double.parseDouble(discount));
			} else {
				bean.setDiscount(0.0);
			}
			if (discountAmount != "") {
				bean.setDiscountAmount(Double.parseDouble(discountAmount));
			} else {
				bean.setDiscountAmount(0.0);
			}
			String onlyShopName1 = "";

			HttpSession session = request.getSession(true);

			String username = (String) session.getAttribute("user");
			String userid = (String) session.getAttribute("userid");
			String shopid = (String) session.getAttribute("shopid");
			String shopName1 = (String) session.getAttribute("shopName");
			
			String ShopNameWithoutId1 = shopName1.substring(4);
			onlyShopName1 = ShopNameWithoutId1.trim();
		
			if (shopid != null) {
				bean.setFk_shop_id(Long.parseLong(shopid));
			} else {
				bean.setFk_shop_id(0l);
			}
			
			System.out.println("`````````` ``````````` `````````` ``````````` ````````````````` fk_shop_id -     "+fk_shop_id+"  shop id  -   "+shopid);
			if (userid != null) {
				bean.setUserid(Long.parseLong(userid));
			} else {
				bean.setUserid(0l);
			}
			
			if (onlyShopName1 != null) {
				bean.setShopName1(onlyShopName1);
			} else {
				bean.setShopName1("N/A");
			}
			
			if (username != null) {
				bean.setUsername(username);
			} else {
				bean.setUsername("N/A");
			}
			/*
			 * if(transExpense !=""){ Double totalExpense=0d;
			 * totalExpense=(Double.parseDouble(transExpenseWithoutGST)) +
			 * (Double.parseDouble(transExpense));
			 * bean.setTransExpense(totalExpense); } else{
			 * bean.setTransExpense(0.0); }
			 */
			if (hamaliExpense != "") {
				Double totalExpense = 0d;
				totalExpense = (Double.parseDouble(hamaliExpenseWithourGST)) + (Double.parseDouble(hamaliExpense));
				bean.setHamaliExpense(totalExpense);
			} else {
				bean.setHamaliExpense(0.0);
			}
			if (total != null) {
				bean.setTotal(Double.parseDouble(total));
			} else {
				bean.setTotal(0.0);
			}

			SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
			// String pDate = request.getParameter("pDate");
			Date saleDateq = null;

			try
			{
				saleDateq = dateFormat.parse(saleDate);
				System.out.println("in try block to format Date ================== " + saleDateq);
				sqlDate = new java.sql.Date(saleDateq.getTime());

			} catch (ParseException e)
			{
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			bean.setSaleDate(sqlDate);

			if (grossTotal != null) {
				bean.setGrossTotal(Double.parseDouble(grossTotal));

				if (customerType.equals("NORMALCUSTOMER")) {
					bean.setBillPaymentPending(0.0);
				} else if (customerType.equals("CREDITCUSTOMER")) {
					bean.setBillPaymentPending(
							Double.parseDouble(grossTotal) - Double.parseDouble(firstPaidAmtCreditCustomer));

					System.out.println("Pending Balance ================= "
							+ (Double.parseDouble(grossTotal) - Double.parseDouble(firstPaidAmtCreditCustomer)));
				}

			}
			else
			{
				bean.setGrossTotal(0.0);
				bean.setBillPaymentPending(0.0);
			}
			
			if(firstPaidAmtCreditCustomer == "" || Double.parseDouble(firstPaidAmtCreditCustomer) == 0.0)
			{
				bean.setPaymentMode("Selected");
			}			
			bean.setCust_type(type);
			System.out.println("type set - "+bean.getCust_type());
			
			// Grid Content
			String catId = request.getParameter("cat_id" + i);
			String barcodeNo = request.getParameter("barcodeNo" + i);
			String sub_cat_id = request.getParameter("sub_cat_id" + i);
			String hsn = request.getParameter("hsn" + i);
			String proName = request.getParameter("itemName" + i);
			String quantity = request.getParameter("quantity" + i);
			System.out.println("<------------------Quantity ---------------> "+quantity);
			String mrp = request.getParameter("mrp" + i);
			String salePrice = request.getParameter("salePrice" + i);
			String DiscountperProd = request.getParameter("DiscountperProd" + i);
			String DiscountAmountperProd = request.getParameter("DiscountAmountperProd" + i);
			String totalPerProductInGrid = request.getParameter("total" + i);
			double sgst = Double.parseDouble(request.getParameter("sgst" + i));
			double cgst = Double.parseDouble(request.getParameter("cgst" + i));
			double Gst  = sgst + cgst;
			
			String igst = request.getParameter("igst" + i);
			    if (igst == null)
			    {
				igst = "0";
			    }
			String company = request.getParameter("companyName" + i);
			String weight = request.getParameter("weight" + i);
			String unitName = request.getParameter("unitName" + i);
			String freeQuantity = request.getParameter("freeQuantity" + i);
			String tempExpiryDate = request.getParameter("expiryDate"+i);
			String PkGoodreceiveId = request.getParameter("PkGoodreceiveId"+i);	
			String productPkId = request.getParameter("productPkId"+i);	
			String chaalanNo = request.getParameter("chaalanNo"+i);	
		
			String barcode_id = request.getParameter("barcode_id"+i);	
			
			//bean.setBarcode(Long.parseLong(barcodeNo));
			if(!"".equals(barcode_id)) {
			bean.setBarcode_id(barcode_id);
			}
			else {
				bean.setBarcode_id("0");
			}
			
			  if (barcodeNo != null) 
			  { 
				bean.setBarcode(Long.parseLong(barcodeNo));
			}
			  else
			  {}
			  //System.out.println("Barcode Number Helper------>"+bean.getBarcode());
			if(freeQuantity == null || freeQuantity.equalsIgnoreCase(""))
			{
				freeQuantity = "0";
			}
			System.out.println("FREE QUANTITY === "+freeQuantity);
			
			
			Double userEnteredQuantity = Double.parseDouble(quantity);
			
			
			if(unitName.equalsIgnoreCase("kg"))
			{
				System.out.println("UNIT NAME ENTERED ::::::: ===========> "+unitName);
			
				if(userEnteredQuantity >= 1)
				{
					double totalGrams = userEnteredQuantity*1000;
					int kg = (int)totalGrams/1000;
					double grams = totalGrams%1000;
					System.out.println("user Input Kg ===== " + kg);
					System.out.println("user Input Grams ===== " + grams);

					bean.setKg((double)kg);
					bean.setGrams(grams);
					bean.setLtr(0.0);
					bean.setMili(0.0);
//					bean.setQuantity(0l);
					bean.setQuantity(Double.parseDouble(quantity));
					bean.setUnit(unitName);
					bean.setFreeQuantity(0.0);	
				}
				else if(userEnteredQuantity < 1)
				{
					double grams = userEnteredQuantity*1000;
					bean.setKg(0.0);
					bean.setGrams(grams);
					bean.setLtr(0.0);
					bean.setMili(0.0);
					bean.setQuantity(Double.parseDouble(quantity));
					bean.setUnit(unitName);
					bean.setFreeQuantity(0.0);	
				}
			}

			if (unitName.equalsIgnoreCase("ltr"))
			{	
				System.out.println("UNIT NAME ENTERED ::::::: ===========> "+unitName);
				if(userEnteredQuantity >= 1)
				{
					double totalMili = userEnteredQuantity*1000;
					int ltr = (int)totalMili/1000;
					double mili = totalMili%1000;

					//System.out.println("user Input Kg ===== " + ltr);
					//System.out.println("user Input Grams ===== " + mili);

					bean.setLtr((double)ltr);
					bean.setMili(mili);
					bean.setKg(0.0);
					bean.setGrams(0.0);
					bean.setQuantity(Double.parseDouble(quantity));
					bean.setUnit(unitName);
					bean.setFreeQuantity(0.0);	
				}
				else if(userEnteredQuantity < 1)
				{
					double mili = userEnteredQuantity*1000;
					bean.setKg(0.0);
					bean.setGrams(0.0);
					bean.setLtr(0.0);
					bean.setMili(mili);
					bean.setQuantity(Double.parseDouble(quantity));
					bean.setUnit(unitName);
					bean.setFreeQuantity(0.0);	
				}
			}
			
			if (unitName.equalsIgnoreCase("pcs"))
			{
				
				System.out.println("UNIT NAME ENTERED ::::::: ===========> "+unitName);
				
				if (quantity == null || quantity == "")
				{
					bean.setQuantity(0d);
				} else {
					bean.setQuantity(Double.parseDouble(quantity));
				}
				bean.setUnit(unitName);
				bean.setKg(0.0);
				bean.setLtr(0.0);
				bean.setGrams(0.0);
				bean.setMili(0.0);
				bean.setFreeQuantity(Double.parseDouble(freeQuantity));
			}
			if (unitName.equalsIgnoreCase("grams"))
			{
				
				System.out.println("UNIT NAME ENTERED ::::::: ===========> "+unitName);
				
				if (quantity == null || quantity == "")
				{
					bean.setQuantity(0d);
				} else {
					bean.setQuantity(Double.parseDouble(quantity));
				}
				bean.setUnit(unitName);
				bean.setKg(0.0);
				bean.setLtr(0.0);
//				bean.setGrams(0.0);
				bean.setGrams(Double.parseDouble(quantity));
				bean.setMili(0.0);
				bean.setFreeQuantity(Double.parseDouble(freeQuantity));
			}
			
			if (unitName.equalsIgnoreCase("millilitre"))
			{
				
				System.out.println("UNIT NAME ENTERED ::::::: ===========> "+unitName);
				
				if (quantity == null || quantity == "")
				{
					bean.setQuantity(0d);
				} else {
					bean.setQuantity(Double.parseDouble(quantity));
				}
				bean.setUnit(unitName);
				bean.setKg(0.0);
				bean.setLtr(0.0);
				bean.setGrams(0.0);
				bean.setMili(Double.parseDouble(quantity));
				bean.setFreeQuantity(Double.parseDouble(freeQuantity));
			}
			
			System.out.println("IN HELPER== == =" + Gst);
			//System.out.println("IN HELPER== == =" + igst);

			if (quantity == null || quantity == "")
			{
				bean.setQuantity(0d);
			} else {
				bean.setQuantity(Double.parseDouble(quantity));
			}
			
			bean.setUnit(unitName);
			bean.setKg(Double.parseDouble(quantity));
			bean.setLtr(Double.parseDouble(quantity));
//			bean.setGrams(0.0);
			bean.setGrams(Double.parseDouble(quantity));
			bean.setMili(0.0);
			bean.setFreeQuantity(Double.parseDouble(freeQuantity));
			
			if (productPkId != null) {
				bean.setFkproductID(Long.parseLong(productPkId));
			} else {
				bean.setFkproductID(0l);
			}
			
			if (catId != null) {
				bean.setCatId(Long.parseLong(catId));
			} else {
				bean.setCatId(0l);
			}
			
			if (proName != null) {
				bean.setProductName(proName);
			} else {
				bean.setProductName("N/A");
			}
		
			if (DiscountperProd != null ) {
				bean.setDicountperProdPerc(Double.parseDouble(DiscountperProd));
			} else {
				bean.setDicountperProdPerc(0.0);
			}
			
			if (DiscountAmountperProd != null ) {
				bean.setDicountperProdAmount(Double.parseDouble(DiscountAmountperProd));
			} else {
				bean.setDicountperProdAmount(0.0);
			}

			if (mrp != null || mrp.equalsIgnoreCase("")) {
				bean.setMrp(Double.parseDouble(mrp));
			} else {
				bean.setMrp(0.0);
			}
			if (salePrice != null) {
				bean.setSalePrice(Double.parseDouble(salePrice));
			} else {
				bean.setSalePrice(0.0);
			}
			if (totalPerProductInGrid != null) {
				bean.setTotalInGrid(Double.parseDouble(totalPerProductInGrid));
			} else {
				bean.setTotalInGrid(0.0);
			}
			if (Gst != 0) {
				bean.setTaxPercentage((Gst));
			} else {
				bean.setTaxPercentage(0.0);
			}
			if (cgst != 0) {
				bean.setCgst((cgst));
			} else {
				bean.setCgst(0.0);
			}
			if (sgst != 0) {
				bean.setSgst((sgst));
			} else {
				bean.setSgst(0.0);
			}
			if (igst != "") {
				bean.setiGst(Double.parseDouble(igst));
			} else {
				bean.setiGst(0.0);
			}
			if (company != null) {
				bean.setCompany(company);
			} else {
				bean.setCompany("N/A");
			}
			if (weight != null) {
				bean.setWeight(Double.parseDouble(weight));
			} else {
				bean.setWeight(0.0);
			}

			if (hsn != null) {
				bean.setHsn(hsn);
			} else {
				bean.setHsn("N/A");
			}
			bean.setBillType("GST");
			/*
			 * if (igst != null) { bean.setiGst(Double.parseDouble(igst)); } else {
			 * bean.setiGst(0.0); }
			 */

			Double CGST = Double.parseDouble(request.getParameter("cgst" + i));
			Double SGST = Double.parseDouble(request.getParameter("sgst" + i));
			Double GST = CGST + SGST;
			
			Double IGST = Double.parseDouble(igst);
			
			System.out.println("499 GST ==========> " + GST);
			System.out.println("500 IGST ==========> " + IGST);
			Double taxAmount = 0d;
			//Double taxAmount1 = 0d;
			Double priceWithoutTax = 0d;

			if (GST != 0) {
				System.out.println("In GST");
				Double taxPerc = (Gst);
				Double taxAmnt = Double.parseDouble(salePrice);
				taxAmount = (taxAmnt /(1+(taxPerc / 100)));
		        //taxAmount = (taxAmnt * (taxPerc / 100));
				System.out.println("tax" + taxAmount);
				Double newSale = Double.parseDouble(request.getParameter("salePrice" + i));
				priceWithoutTax = newSale - taxAmount;
				
				bean.setTaxAmount(priceWithoutTax);
				bean.setProductRateWithoutTax(taxAmount);
				
				System.out.println("2amnt" + priceWithoutTax);
			
	//			if (unitName.equalsIgnoreCase("pcs")) {
					Double taxAmountperQtyKgLtr = ((taxPerc / 100) * taxAmnt);
					Double totalGstTaxPerProduct = (taxAmountperQtyKgLtr * Double.parseDouble(quantity));
					bean.setTotaGstTaxPerProduct(totalGstTaxPerProduct);
					if (IGST == 0) {
						bean.setTotaIgstTaxPerProduct(0.0);
					}
	//			}

				// =============kg and ltr here==========

				/*if (unitName.equalsIgnoreCase("kg") || unitName.equalsIgnoreCase("ltr") || unitName.equalsIgnoreCase("grams") || unitName.equalsIgnoreCase("millilitre")) {
					Double taxAmountperQtyKgLtr = ((taxPerc / 100) * Double.parseDouble(totalPerProductInGrid));
					bean.setTotaGstTaxPerProduct(taxAmountperQtyKgLtr);
					if (IGST == 0) {
						bean.setTotaIgstTaxPerProduct(0.0);
					}
				}*/
			}

			if (GST == 0 && IGST == 0) {
				Double newSale = Double.parseDouble(request.getParameter("salePrice" + i));
				bean.setProductRateWithoutTax(newSale);
				bean.setTaxAmount(0.0);
				bean.setTotaGstTaxPerProduct(0.0);
				bean.setTotaIgstTaxPerProduct(0.0);
				bean.setiGstTaxAmountPerUnit(0.0);
			}

			if (IGST != 0) {
				System.out.println("In IGST");
				Double taxPerc = Double.parseDouble(igst);
				Double taxAmnt = Double.parseDouble(salePrice);
				taxAmount = (taxAmnt /(1+(taxPerc / 100)));
				//taxAmount = (taxAmnt * (taxPerc / 100));
				//bean.setiGstTaxAmountPerUnit(taxAmount);
				System.out.println("tax" + taxAmount);
				Double newSale = Double.parseDouble(request.getParameter("salePrice" + i));
				priceWithoutTax = newSale - taxAmount;
				// Double taxAmount1=(priceWithoutTax*(taxPerc/100));
				// priceWithoutTax=newSale - taxAmount1 ;
				bean.setProductRateWithoutTax(taxAmount);
				// System.out.println("2tax"+taxAmount1);
				bean.setTaxAmount(priceWithoutTax);
				bean.setiGstTaxAmountPerUnit(priceWithoutTax);

		//		if (unitName.equalsIgnoreCase("pcs")) {
					Double taxAmountperQtyKgLtr = ((taxPerc / 100) * taxAmnt);
					Double totalIgstTaxPerProduct = (taxAmountperQtyKgLtr * Double.parseDouble(quantity));
					bean.setTotaIgstTaxPerProduct(totalIgstTaxPerProduct);
					if (GST == 0) {
						bean.setTotaGstTaxPerProduct(0.0);
					}
		//		}

				// =============kg and ltr here==========
/*
				if (unitName.equalsIgnoreCase("kg") || unitName.equalsIgnoreCase("ltr") || unitName.equalsIgnoreCase("grams") || unitName.equalsIgnoreCase("millilitre")) {
					Double taxAmountperQtyKgLtr = ((taxPerc / 100) * Double.parseDouble(totalPerProductInGrid));
					bean.setTotaIgstTaxPerProduct(taxAmountperQtyKgLtr);
					if (GST == 0) {
						bean.setTotaGstTaxPerProduct(0.0);
					}
				}*/

			}
			if (GST == 0 && IGST == 0) {
				Double newSale = Double.parseDouble(request.getParameter("salePrice" + i));
				bean.setProductRateWithoutTax(newSale);
				bean.setTaxAmount(0.0);
				bean.setTotaIgstTaxPerProduct(0.0);
				bean.setTotaGstTaxPerProduct(0.0);
				bean.setiGstTaxAmountPerUnit(0.0);
			}

			// payment mode
			paymentMode = request.getParameter("paymentMode");
			checkNum = request.getParameter("chequeNum");
			nameOnCheck = request.getParameter("nameOnCheck");
			cardNo = request.getParameter("cardNum");
			accNo = request.getParameter("accNum");
			bankName = request.getParameter("bankName");
			System.out.println("CREDIT CUST PAYMENT DETAILS ::::::::: "+paymentMode+" "+checkNum+" "+nameOnCheck+" "+cardNo+" "+accNo+" "+accNo+" "+bankName);
			if (customerHiddenName == null) {
				System.out.println("paymentMode is " + paymentMode);
				if (paymentMode == null) {
					bean.setPaymentMode("N/A");
				} else {
					bean.setPaymentMode(paymentMode);
				}

				if (paymentMode.equals("cheque")) {
					if (checkNum != null) {
						bean.setCheckNo(Long.parseLong(checkNum));
					} else {
						bean.setCheckNo(0l);
					}
					if (nameOnCheck != null) {
						bean.setNameOnCheck(nameOnCheck);
					} else {
						bean.setNameOnCheck("N/A");
					}

				}

				else if (paymentMode.equals("card")) {
					if (cardNo != null) {
						bean.setCardNo(Long.parseLong(cardNo));
					} else {
						bean.setCardNo(0l);
					}
				}

				else if (paymentMode.equals("neft")) {

					if (accNo != null) {
						bean.setAccNo(accNo);
					} else {
						bean.setAccNo("N/A");
					}
					if (bankName != null) {
						bean.setBankName(bankName);
					} else {
						bean.setBankName("N/A");
					}
				}
			}
			SimpleDateFormat dateFormat1 = new SimpleDateFormat("yyyy-MM-dd");
			dateobj = new Date();
			System.out.println(dateFormat1.format(dateobj));

			bean.setInsertDate(dateobj);
			dao.addFertilizerBillingInDAO(bean);
             
			// code for set billno and name in application context for BIll PDF
            String onlyShopName = "";
			HttpSession billNoSession = request.getSession(true);
			
			String shopName = (String)billNoSession.getAttribute("shopName");
			String ShopNameWithoutId = shopName.substring(4);
            onlyShopName = ShopNameWithoutId.trim();
			billNoSession.setAttribute("fertilizerBillNo", billNoForPdf);
			billNoSession.setAttribute("onlyShopName", onlyShopName);
			billNoSession.setAttribute("email", email);
			billNoSession.setAttribute("Address", address);
			billNoSession.setAttribute("Address1", village1);
			
			System.out.println("---------Bill No for pdf in session::" + billNoForPdf + "----------------");
			System.out.println("---------shopName for pdf in session::" + onlyShopName + "----------------");
			System.out.println("---------email for pdf in session::" + email + "----------------");
			
		
				 /*****************************************************************************************
								update dupQuantity from good receive table
				*****************************************************************************************/
				
				
				System.out.println("================================ GOOD RECEIVE dupQuantity ============================= ");
				
				
				if(Long.parseLong(chaalanNo) > 0)
				{}
				else if(chaalanNo == null || chaalanNo.equals("0") || chaalanNo == "" || chaalanNo.equals(" ") || chaalanNo.isEmpty())
				{
				
				HibernateUtility hbu3 = null;
				Session session3 = null;
				Transaction transaction3 = null;
				
				try {
					Long PkGoodRecId;
					Double dupQuantity;
					Double newQuantity=0.0;
					
				
					hbu3 = HibernateUtility.getInstance();
					session3 = hbu3.getHibernateSession();
					transaction3 = session3.beginTransaction();
				
					Query query3 = session3.createSQLQuery("select dupQuantity, total_amount, pk_goods_receive_id from goods_receive where pk_goods_receive_id ='"+PkGoodreceiveId+"'");
				
					List<Object[]> list3 = query3.list();
				
					for (Object[] object : list3)
					{
						dupQuantity = Double.parseDouble(object[0].toString());
						PkGoodRecId = Long.parseLong(object[2].toString());
						Double quty = Double.parseDouble(quantity);
				
						GoodsReceiveBean goodRec = (GoodsReceiveBean)session3.load(GoodsReceiveBean.class, new Long(PkGoodRecId));
				
						newQuantity = dupQuantity - quty;
				
						goodRec.setDupQuantity(newQuantity);
												
						System.out.println("===================== UPDATING Good Rec dupQuantity ====================");
						session3.saveOrUpdate(goodRec);
						transaction3.commit();
						System.out.println("Success ");
					}
				
				}
				
				catch (RuntimeException e) 
				{
					try 
					{
						System.out.println("========IN CATCH TRY BLOCK OF STOCK UPDATE=========");
						transaction3.rollback();
						}
					catch (RuntimeException rbe) 
					{
						System.out.println("==========CATCH BLOCK OF STOCK UPDATE=========");
						Log.error("Couldn't roll back tranaction", rbe);
					}
				} finally {
				hbu3.closeSession(session3);
				}
	
			
			 /*****************************************************************************************
			  							stock minus from stock detail table
			 *****************************************************************************************/
			

			System.out.println("================================ STOCK MINUS ============================= ");
			
			HibernateUtility hbu1 = null;
			Session session1 = null;
			Transaction transaction1 = null;

			try {
				Long PkStockId;
				Double quantity1;
				Double packingWeight;
				Double existedTotalKgLtrPieceStock;

				hbu1 = HibernateUtility.getInstance();
				session1 = hbu1.getHibernateSession();
				transaction1 = session1.beginTransaction();

				Query query1 = session1.createSQLQuery("select PkStockId, avail_Quantity, weight, total_kg_ltr_piece_stock from stock_detail where ProductName='"+proName+"' AND CompanyName='"+company+"' AND FkCatId='" +catId+"' AND productId = '"+productPkId+"' AND weight = '"+weight+"' AND fk_shop_id = '"+shopid+"'");
				System.out.println("catId in stock=" + catId);
				System.out.println("sub_cat_id in stock=" + sub_cat_id);
				List<Object[]> list1 = query1.list();

				for (Object[] object : list1)
				{
					PkStockId = Long.parseLong(object[0].toString());
					quantity1 = Double.parseDouble(object[1].toString());
					packingWeight = Double.parseDouble(object[2].toString());
					existedTotalKgLtrPieceStock = Double.parseDouble(object[3].toString());

					Stock Stock = (Stock)session1.load(Stock.class, new Long(PkStockId));
					
			//		if (unitName.equalsIgnoreCase("kg"))
			//		{
			//			Double newUpdatedQuantityUsingKg;
			//			Double quty = Double.parseDouble(quantity);
						/*Double userInputkgInGrams = kgLtrForCal * 1000;
						Double userInputtotalGrams = userInputkgInGrams + gramsMiliForCal;
						Double userInputTotalKg = userInputtotalGrams/1000;*/
			//			Double updateTotalKg = quantity1 - quty;
			//			newUpdatedQuantityUsingKg = updateTotalKg / packingWeight;				
			//			Stock.setQuantity(updateTotalKg);
			//			Stock.setTotalKgLtrPieceQuantity(updateTotalKg);					
			//		}
				
				
				//	if (unitName.equalsIgnoreCase("ltr"))
				//	{
				//		Double quty = Double.parseDouble(quantity);
				//		Double newUpdatedQuantityUsingLtr;
					/*	Double userInputkgInLtr = kgLtrForCal * 1000;
						Double userInputtotalMili = userInputkgInLtr + gramsMiliForCal;
						Double userInputTotalLtr = userInputtotalMili/1000;*/	
						
				//		Double updateTotalLtr = quantity1 - quty;						
				//		newUpdatedQuantityUsingLtr = updateTotalLtr / packingWeight;				
				//		Stock.setQuantity(updateTotalLtr);
				//		Stock.setTotalKgLtrPieceQuantity(updateTotalLtr);					

				//	}
					/*
					
					if (unitName.equalsIgnoreCase("pcs"))
					{
						double totalQty = 0.0;
						Double quty = Double.parseDouble(quantity);
						if(quantity != null || quantity != "")
						{
							totalQty = Double.parseDouble(freeQuantity) + Double.parseDouble(quantity);							
							
							Double updateTotalQuantity = quantity1 - quty;
							System.out.println("New Updated Quantity  ======  " + updateTotalQuantity);
							Stock.setTotalKgLtrPieceQuantity(updateTotalQuantity);
							Double updateQuantity = updateTotalQuantity / packingWeight;
							Stock.setQuantity(updateTotalQuantity);
						}						
					}*/
					/*
					if (unitName.equalsIgnoreCase("grams"))
					{
						double totalQty = 0.0;
						Double quty = Double.parseDouble(quantity);
						if(quantity != null || quantity != "")
						{
							totalQty = Double.parseDouble(freeQuantity) + Double.parseDouble(quantity);							
							
							Double updateTotalQuantity = quantity1 - quty;
							System.out.println("New Updated Quantity  ======  " + updateTotalQuantity);
							Stock.setTotalKgLtrPieceQuantity(updateTotalQuantity);
							Double updateQuantity = updateTotalQuantity / packingWeight;
							Stock.setQuantity(updateTotalQuantity);
						}						
					}*/
/*
					if (unitName.equalsIgnoreCase("millilitre"))
					{
						double totalQty = 0.0;
						Double quty = Double.parseDouble(quantity);
						if(quantity != null || quantity != "")
						{
							totalQty = Double.parseDouble(freeQuantity) + Double.parseDouble(quantity);							
							
							Double updateTotalQuantity = quantity1 - quty;
							System.out.println("New Updated Quantity  ======  " + updateTotalQuantity);
							Stock.setTotalKgLtrPieceQuantity(updateTotalQuantity);
							Double updateQuantity = updateTotalQuantity / packingWeight;
							Stock.setQuantity(updateTotalQuantity);
						}						
					}
					*/
					
					Double newUpdatedQuantityUsingKg;
					Double quty = Double.parseDouble(quantity);
					Double updateTotalKg = quantity1 - quty;
					newUpdatedQuantityUsingKg = updateTotalKg / packingWeight;				
					Stock.setQuantity(updateTotalKg);
					Stock.setTotalKgLtrPieceQuantity(updateTotalKg);					
					
					System.out.println("===================== UPDATING STOCK ====================");
					session1.saveOrUpdate(Stock);
					transaction1.commit();
					System.out.println("Success ");
				}

			}

			catch (RuntimeException e) {
				try {
					System.out.println("========IN CATCH TRY BLOCK OF STOCK UPDATE=========");
					transaction1.rollback();
				} catch (RuntimeException rbe) {
					System.out.println("==========CATCH BLOCK OF STOCK UPDATE=========");
					Log.error("Couldn't roll back tranaction", rbe);
				}
			} finally {
				hbu1.closeSession(session1);
		}	

			
			/*****************************************************************************************
			===========START=============== perStockEntry minus from GOOD RECEIVE table
*****************************************************************************************/

System.out.println("tempExpiryDate 000000000000000000000000000000000 "+tempExpiryDate);

if(tempExpiryDate.equalsIgnoreCase("N/A") || tempExpiryDate == null || tempExpiryDate.equalsIgnoreCase("undefined") || tempExpiryDate.equalsIgnoreCase(""))
{}
else
{
	System.out.println("================================ perStockEntry MINUS ============================= ");
	HibernateUtility hbu2 = null;
	Session session2 = null;
	Transaction transaction2 = null;
	
	try
	{
		 System.out.println("============ perStockEntry MINUS IN TRY BLOCK ==============");
		 
		 hbu2 = HibernateUtility.getInstance();
		 session2 = hbu2.getHibernateSession();
		 transaction2 = session2.beginTransaction();
		 
		 List<Object[]> list2 = null;
				
			 DateFormat df = new SimpleDateFormat("dd-MM-yyyy");
			 Date tempExpiryDateToDate = new Date();
			 tempExpiryDateToDate = df.parse(tempExpiryDate);
			 DateFormat df1 = new SimpleDateFormat("yyyy-MM-dd");
			 String expiryDate  = df1.format(tempExpiryDateToDate);
			 
			 System.out.println("proName == "+proName);
			 System.out.println("company == "+company);
			 System.out.println("catId == "+catId);
			 System.out.println("expiryDate == "+expiryDate);
			 
			//PERSTOCKENTRY
			Query query2 = session2.createSQLQuery("select pk_goods_receive_id, stockPerEntry from goods_receive where product_name='"+proName+"' AND company_Name='"+company+"' AND fkCategoryId='"+catId+"' AND expiry_date = '"+expiryDate+"'");
			System.out.println("catId in stock=" + catId);
			System.out.println("sub_cat_id in stock=" + sub_cat_id);
			list2 = query2.list();
		
		Long pk_goods_receive_id;
		Double existedTotalstockPerEntry;
	
		for (Object[] object : list2)
		{
			pk_goods_receive_id = Long.parseLong(object[0].toString());
			existedTotalstockPerEntry = Double.parseDouble(object[1].toString());
			
			System.out.println("produt ID == "+pk_goods_receive_id);
			System.out.println("existedTotalstockPerEntry == "+existedTotalstockPerEntry);
			
			GoodsReceiveBean GoodsReceiveBean = (GoodsReceiveBean)session2.load(GoodsReceiveBean.class, new Long(pk_goods_receive_id));
		
			double totalQty = Double.parseDouble(freeQuantity) + Double.parseDouble(quantity);
			
			Double updatenewStockPerEntry = existedTotalstockPerEntry - totalQty;		
			GoodsReceiveBean.setStockPerEntry(updatenewStockPerEntry);
			
			System.out.println("before update of good receive ====");
			System.out.println("===================== UPDATING perStockEntry ====================");
			session2.saveOrUpdate(GoodsReceiveBean);
			transaction2.commit();
			System.out.println("Success ");
		}
	
	}
	
	catch (RuntimeException e)
	{
		try
		{
			System.out.println("========IN CATCH BLOCK OF perStockEntry UPDATE========= line no = 779");
			transaction2.rollback();
		}
		catch (RuntimeException rbe)
		{
			System.out.println("==========CATCH BLOCK OF perStockEntry UPDATE========= line no = 784");
			Log.error("Couldn't roll back tranaction", rbe);
		}
	}
	finally
	{
		hbu2.closeSession(session2);
	}
}

		}		/*
			 * System.out.
			 * println("================================ CreditCustomerPaymentUpdate ============================= "
			 * ); HibernateUtility hbu2=null; Session session2=null; Transaction
			 * transaction2 = null;
			 * 
			 * if(customerName == null || customerName.equals("N/A")) { try{
			 * 
			 * hbu2 = HibernateUtility.getInstance(); session2 =
			 * hbu2.getHibernateSession(); transaction2 =
			 * session1.beginTransaction();
			 * 
			 * CustomerPaymentBean cpb = new CustomerPaymentBean();
			 * cpb.setPaidAmount(0.0); cpb.setBillNo(customerBill); System.out.
			 * println("BIILING BILL NO SET FOR CREDITCUSTOMER PAYMENT ###################### "
			 * +cpb.getBillNo()); System.out.
			 * println("Normal Customer Name from Billing ==================> "
			 * +customerName);
			 * 
			 * session2.save(cpb); transaction2.commit();
			 * System.out.println("Success "); } catch(RuntimeException e) { try
			 * { transaction2.rollback(); } catch(RuntimeException rbe) {
			 * Log.error("Couldn't roll back tranaction",rbe); } }finally{
			 * hbu2.closeSession(session2); } }
			 */
		}

		/*****************************
		 * ====START==== FIRST PAYMENT WHILE BILLING FOR CREDIT CUST AND NORMAL
		 * CUST
		 ********************/
		
	try
	{
		if (customerType.equals("NORMALCUSTOMER"))
		{
			System.out.println(customerType + "   ================");
			System.out.println("In HELPER for normal customer first payment");

			NormalCustomerPaymentBean nCPBean = new NormalCustomerPaymentBean();
			if (customerBill == null) {
				nCPBean.setBillNo(1l);
			}
			else
			{
				nCPBean.setBillNo(customerBill);
			}

			System.out.println("CREDIT CUSTOMER FIRST PAYMENT -=-=--=-==-=-==-=- BILL NUMBER ::::::::: " + nCPBean.getBillNo());
			nCPBean.setTotalAmount(Double.parseDouble(grossTotal));
			nCPBean.setBalance(0.0);
			nCPBean.setPaymentType("credit");
			nCPBean.setCredit(Double.parseDouble(grossTotal));

			if (customerHiddenName == null) {
				System.out.println("paymentMode is " + paymentMode);
				if (paymentMode == null) {
					nCPBean.setPaymentMode("N/A");
				} else {
					nCPBean.setPaymentMode(paymentMode);
				}

				if (paymentMode.equals("cheque")) {
					if (checkNum != null) {
						nCPBean.setChequeNum(checkNum);
					} else {
						nCPBean.setChequeNum("0");
					}
					if (nameOnCheck != null) {
						nCPBean.setNameOnCheck(nameOnCheck);
					} else {
						nCPBean.setNameOnCheck("N/A");
					}

				}

				else if (paymentMode.equals("card")) {
					if (cardNo != null) {
						nCPBean.setCardNum(Long.parseLong(cardNo));
					} else {
						nCPBean.setCardNum(0l);
					}
				}

				else if (paymentMode.equals("neft")) {

					if (accNo != null) {
						nCPBean.setAccNum(Long.parseLong(accNo.toString()));
					} else {
						nCPBean.setAccNum(0l);
					}
					if (bankName != null) {
						nCPBean.setBankName(bankName);
					} else {
						nCPBean.setBankName("N/A");
					}

				}

				nCPBean.setPersonname(customerName);
				nCPBean.setInsertDate(dateobj);
				nCPBean.setBillDate(sqlDate);
				nCPBean.setShopId(Long.parseLong(fk_shop_id));

				dao.normalCustomerFirstpaymentDAO(nCPBean);
			}
		}
		else if (customerType.equals("CREDITCUSTOMER"))
		{
			System.out.println(customerType + "   ================");
			System.out.println("In HELPER for normal customer first payment");

			CustomerPaymentBean cPBean = new CustomerPaymentBean();
			if (customerBill == null) {
				cPBean.setBillNo(1l);
			}
			else
			{
				cPBean.setBillNo(customerBill);
			}
			

			System.out.println("CREDIT CUSTOMER FIRST PAYMENT -=-=--=-==-=-==-=- BILL NUMBER ::::::::: " + cPBean.getBillNo());
			cPBean.setTotalAmount(Double.parseDouble(grossTotal));
			cPBean.setBalance(Double.parseDouble(grossTotal) - Double.parseDouble(firstPaidAmtCreditCustomer));
			cPBean.setPaymentType("credit");
			cPBean.setCustomer(Long.parseLong(fkCustomerId));
			cPBean.setCredit(Double.parseDouble(firstPaidAmtCreditCustomer));
			cPBean.setShopId(Long.parseLong(fk_shop_id));

			if(firstPaidAmtCreditCustomer == "" || Double.parseDouble(firstPaidAmtCreditCustomer) == 0.0)
			{
				cPBean.setPaymentMode("selected");
			}
			else if (customerHiddenName != null)
			{
				System.out.println("paymentMode is *******************>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> " + paymentMode);
				if (paymentMode == null)
				{
					cPBean.setPaymentMode("N/A");
				}
				
				if (paymentMode.equals("cash1"))
				{
					cPBean.setPaymentMode("cash");
				}
				
				if (paymentMode.equals("cheque1"))
				{
					cPBean.setPaymentMode("cheque");
					
					if (checkNum != null) {
						cPBean.setChequeNum(checkNum);

						System.out.println("CHEQUE NUMBER --------------- "+cPBean.getChequeNum());
					}
					else
					{
						cPBean.setChequeNum("0");
					}
					
					if (nameOnCheck != null) {
						cPBean.setNameOnCheck(nameOnCheck);
						System.out.println("CHEQUE Nmae --------------- "+cPBean.getNameOnCheck());
					}
					else
					{
						cPBean.setNameOnCheck("N/A");
					}
				}
				else if (paymentMode.equals("card1"))
				{
					cPBean.setPaymentMode("card");
					
					if (cardNo != null) {
						cPBean.setCardNum(Long.parseLong(cardNo));
						System.out.println("card number --------------- "+cPBean.getCardNum());
					} else {
						cPBean.setCardNum(0l);
					}
				}

				else if (paymentMode.equals("neft1"))
				{
					cPBean.setPaymentMode("neft");

					if (accNo != null) {
						cPBean.setAccNum(Long.parseLong(accNo.toString()));
						System.out.println("ACCOUNT number --------------- "+cPBean.getAccNum());
					} else {
						cPBean.setAccNum(0l);
					}
					if (bankName != null) {
						cPBean.setBankName(bankName);
						System.out.println("BANK NAME --------------- "+cPBean.getBankName());
					} else {
						cPBean.setBankName("N/A");
					}
				}
			}			
			cPBean.setInsertDate(dateobj);
			dao.creditCustomerFirstpaymentDAO(cPBean);
		}
	}
	catch (RuntimeException e)
	{
		try
		{
			System.out.println("========IN CATCH BLOCK OF perStockEntry UPDATE========= line no = 1004");
		}
		catch (RuntimeException rbe)
		{
			System.out.println("==========CATCH BLOCK OF perStockEntry UPDATE========= line no = 1008");
			Log.error("Couldn't roll back tranaction", rbe);
		}
	}
}

	public List getSaleDetailsBYDate(HttpServletRequest request, HttpServletResponse response) {
		String fDate = request.getParameter("fisDate");
		String tDate = request.getParameter("endDate");

		Map<Long, SaleReports> map = new HashMap<Long, SaleReports>();

		FertilizerBillDao dao = new FertilizerBillDao();
		List<SaleReports> saleList = dao.getSaleDetailsDateWise(fDate, tDate);

		return saleList;
	}

	public List getSaleDetailsBYSingalDate(HttpServletRequest request, HttpServletResponse response) {
		String fDate = request.getParameter("fDate");
		System.out.println(fDate + "vxvdfvdf");

		Map<Long, SaleReports> map = new HashMap<Long, SaleReports>();

		FertilizerBillDao dao = new FertilizerBillDao();
		List<SaleReports> saleList = dao.getSaleDetailsBySingalDateWise(fDate);

		return saleList;
	}

	public void billGeneration(HttpServletRequest request, HttpServletResponse response) {
		String billNo = request.getParameter("billNo");
		System.out.println("----------------Bill No before session create::" + billNo);
		HttpSession session3 = request.getSession();
		Long billNo2 = Long.parseLong(billNo);
		session3.setAttribute("BillNoForCopy", billNo2);
		System.out.println("----------------Bill No before session create::" + session3.getAttribute("BillNoForCopy"));

	}

	public void CreditCustmerBillCOPY(HttpServletRequest request, HttpServletResponse response) {
		String billNo = request.getParameter("creditCustbillNo");
		System.out.println("----------------Credit cust Bill No before session create::" + billNo);
		HttpSession session3 = request.getSession();
		Long billNo2 = Long.parseLong(billNo);
		session3.setAttribute("CrditCustBillNo", billNo2);
		System.out.println(
				"----------------Credit cust Bill No before session create::" + session3.getAttribute("BillNoForCopy"));

	}

	public List getCreditAmountByCreditCust(HttpServletRequest request, HttpServletResponse response) {
		String fDate = request.getParameter("fisDate");
		String tDate = request.getParameter("endDate");

		Map<Long, SaleReports> map = new HashMap<Long, SaleReports>();

		FertilizerBillDao dao = new FertilizerBillDao();
		List<SaleReports> saleList = dao.getAmountByCreditCustPayment(fDate, tDate);

		return saleList;
	}

	public List getAllCreditAmtFromBilling(HttpServletRequest request, HttpServletResponse response) {
		String fDate = request.getParameter("fisDate");
		String tDate = request.getParameter("endDate");

		Map<Long, SaleReports> map = new HashMap<Long, SaleReports>();

		FertilizerBillDao dao = new FertilizerBillDao();
		List<SaleReports> saleList = dao.getAmountByCustBilling(fDate, tDate);

		return saleList;
	}

	public List getPaidAmountToSupplier(HttpServletRequest request, HttpServletResponse response) {
		String fDate = request.getParameter("fisDate");
		String tDate = request.getParameter("endDate");

		Map<Long, SaleReports> map = new HashMap<Long, SaleReports>();

		FertilizerBillDao dao = new FertilizerBillDao();
		List<SaleReports> saleList = dao.getPaidAmountToSupplier(fDate, tDate);

		return saleList;
	}

	public List getPaidAmountToEmployee(HttpServletRequest request, HttpServletResponse response) {
		String fDate = request.getParameter("fisDate");
		String tDate = request.getParameter("endDate");

		Map<Long, SaleReports> map = new HashMap<Long, SaleReports>();

		FertilizerBillDao dao = new FertilizerBillDao();
		List<SaleReports> saleList = dao.getPaidAmountToEmployee(fDate, tDate);

		return saleList;
	}

	public void fertilizerBilling_28_5_17(HttpServletRequest request, HttpServletResponse response) {

		FertilizerBillDao dao = new FertilizerBillDao();

		List bill = dao.getCustomerBill();

		for (int i = 0; i < bill.size(); i++) {
			CustomerBillBean sa = (CustomerBillBean) bill.get(i);
			customerBill = sa.getBillNo();
			System.out.println(customerBill);

			customerBill++;
			System.out.println(customerBill);

		}
		Integer count = Integer.parseInt(request.getParameter("count"));
		System.out.println(count);

		FertilizerBillBean bean = new FertilizerBillBean();

		for (int i = 0; i < count; i++) {

			if (customerBill == null) {
				bean.setBillNo(1l);
			} else {
				bean.setBillNo(customerBill);
			}

			// Out Of Grid Content
			String customerName = request.getParameter("customerName");
			String village = request.getParameter("village");
			String contactNum = request.getParameter("contactNo");
			String aadhar = request.getParameter("aadhar");
			String transExpense = request.getParameter("transExpense");
			String hamaliExpense = request.getParameter("hamaliExpense");
			String total = request.getParameter("total");
			String grossTotal = request.getParameter("grossTotal");
			String fkCustomerId = request.getParameter("fkCreditCustomerID");
			String customerHiddenName = request.getParameter("creditCustomerHiddenName");

			if (fkCustomerId != null) {
				bean.setFkCreditCustomerId(Long.parseLong(fkCustomerId));
			} else {
				bean.setFkCreditCustomerId(0l);
			}

			if (customerHiddenName != null) {
				bean.setCustomerHiddenName(customerHiddenName);
			} else {
				bean.setCustomerHiddenName("N/A");
			}

			if (customerName != null) {
				bean.setCustomerName(customerName);
			} else {
				bean.setCustomerName("N/A");
			}
			if (village != null) {
				bean.setVillage(village);
			} else {
				bean.setVillage("N/A");
			}
			if (contactNum != null) {
				bean.setContact(Long.parseLong(contactNum));
			} else {
				bean.setContact(0l);
			}
			if (aadhar != null) {
				bean.setAadhar(Long.parseLong(aadhar));
			} else {
				bean.setAadhar(0l);
			}
			if (transExpense != null) {
				bean.setTransExpense(Double.parseDouble(transExpense));
			} else {
				bean.setTransExpense(0.0);
			}
			if (hamaliExpense != null) {
				bean.setHamaliExpense(Double.parseDouble(hamaliExpense));
			} else {
				bean.setHamaliExpense(0.0);
			}
			if (total != null) {
				bean.setTotal(Double.parseDouble(total));
			} else {
				bean.setTotal(0.0);
			}
			if (grossTotal != null) {
				bean.setGrossTotal(Double.parseDouble(grossTotal));
			} else {
				bean.setGrossTotal(0.0);
			}

			// Grid Content
			String proName = request.getParameter("itemName" + i);
			String quantity = request.getParameter("quantity" + i);
			String mrp = request.getParameter("mrp" + i);
			String salePrice = request.getParameter("salePrice" + i);
			String totalPerProductInGrid = request.getParameter("total" + i);
			String taxPercentage = request.getParameter("vatPercentage" + i);
			String company = request.getParameter("companyName" + i);
			String weight = request.getParameter("weight" + i);

			if (proName != null) {
				bean.setProductName(proName);
			} else {
				bean.setProductName("N/A");
			}

			if (quantity != null) {
				bean.setQuantity(Double.parseDouble(quantity));
			} else {
				bean.setQuantity(0d);
			}
			if (mrp != null) {
				bean.setMrp(Double.parseDouble(mrp));
			} else {
				bean.setMrp(0.0);
			}
			if (salePrice != null) {
				bean.setSalePrice(Double.parseDouble(salePrice));
			} else {
				bean.setSalePrice(0.0);
			}
			if (totalPerProductInGrid != null) {
				bean.setTotalInGrid(Double.parseDouble(totalPerProductInGrid));
			} else {
				bean.setTotalInGrid(0.0);
			}
			if (taxPercentage != null) {
				bean.setTaxPercentage(Double.parseDouble(taxPercentage));
			} else {
				bean.setTaxPercentage(0.0);
			}
			if (company != null) {
				bean.setCompany(company);
			} else {
				bean.setCompany("N/A");
			}
			if (weight != null) {
				bean.setWeight(Double.parseDouble(weight));
			} else {
				bean.setWeight(0.0);
			}

			// payment mode
			String paymentMode = request.getParameter("paymentMode");
			String checkNum = request.getParameter("chequeNum");
			String nameOnCheck = request.getParameter("nameOnCheck");
			String cardNo = request.getParameter("cardNum");
			String accNo = request.getParameter("accNum");
			String bankName = request.getParameter("bankName");

			if (customerHiddenName == null) {
				System.out.println("paymentMode is " + paymentMode);
				if (paymentMode == null) {
					bean.setPaymentMode("N/A");
				} else {
					bean.setPaymentMode(paymentMode);
				}

				if (paymentMode.equals("cheque")) {
					if (checkNum != null) {
						bean.setCheckNo(Long.parseLong(checkNum));
					} else {
						bean.setCheckNo(0l);
					}
					if (nameOnCheck != null) {
						bean.setNameOnCheck(nameOnCheck);
					} else {
						bean.setNameOnCheck("N/A");
					}

				}

				else if (paymentMode.equals("card")) {
					if (cardNo != null) {
						bean.setCardNo(Long.parseLong(cardNo));
					} else {
						bean.setCardNo(0l);
					}
				}

				else if (paymentMode.equals("neft")) {

					if (accNo != null) {
						bean.setAccNo(accNo);
					} else {
						bean.setAccNo("N/A");
					}
					if (bankName != null) {
						bean.setBankName(bankName);
					} else {
						bean.setBankName("N/A");
					}
				}
			}

			SimpleDateFormat dateFormat1 = new SimpleDateFormat("yyyy-MM-dd");
			Date dateobj = new Date();
			System.out.println(dateFormat1.format(dateobj));

			bean.setInsertDate(dateobj);

			dao.addFertilizerBillingInDAO(bean);

			/*
			 * // update (minus stock from good receive) HibernateUtility hbu =
			 * HibernateUtility.getInstance(); Session session =
			 * hbu.getHibernateSession(); Transaction transaction =
			 * session.beginTransaction(); try { String pkGoodsReceiveId =
			 * request.getParameter("PkGoodreceiveId"+i);
			 * System.out.println(pkGoodsReceiveId+"pkGoodsReceiveId in helper"
			 * ); Query query = session.
			 * createSQLQuery("select quantity , dupQuantity from goods_receive where pk_goods_receive_id ="
			 * +pkGoodsReceiveId); // query.setParameter("pkGoodsReceiveId",
			 * pkGoodsReceiveId);
			 * 
			 * List<Object[]> list = query.list();
			 * 
			 * for (Object[] object : list) {
			 * System.out.println(Arrays.toString(object)); Double orgQuantity =
			 * Double.parseDouble(object[0].toString()); Double dupquantity =
			 * Double.parseDouble(object[1].toString());
			 * System.out.println("orgQuantity " +orgQuantity);
			 * System.out.println("dupquantity " +dupquantity);
			 * 
			 * Double updatequantity = (double)(dupquantity -
			 * Double.parseDouble(quantity));
			 * System.out.println("after minus qunt : "+ quantity);
			 * GoodsReceiveBean updateStock = (GoodsReceiveBean)
			 * session.get(GoodsReceiveBean.class, new Long(pkGoodsReceiveId));
			 * 
			 * updateStock.setDupQuantity(updatequantity);
			 * 
			 * session.saveOrUpdate(updateStock); transaction.commit(); } }
			 * catch(RuntimeException e){ try{ transaction.rollback();
			 * }catch(RuntimeException rbe) {
			 * Log.error("Couldn't roll back tranaction",rbe); } }finally{
			 * hbu.closeSession(session); }
			 */

			// stock minus from stock detail table
			HibernateUtility hbu1 = null;
			Session session1 = null;
			Transaction transaction1 = null;

			try {
				Long PkStockId;
				Double quantity1;
				hbu1 = HibernateUtility.getInstance();
				session1 = hbu1.getHibernateSession();
				transaction1 = session1.beginTransaction();

				Query query1 = session1.createSQLQuery("select PkStockId , Quantity from stock_detail where ProductName=:product_name AND CompanyName=:company_Name And Weight =:weight");
				query1.setParameter("product_name", proName);
				query1.setParameter("company_Name", company);
				query1.setParameter("weight", weight);

				List<Object[]> list1 = query1.list();

				for (Object[] object : list1) {
					System.out.println(Arrays.toString(object));
					PkStockId = Long.parseLong(object[0].toString());
					quantity1 = Double.parseDouble(object[1].toString());
					System.out.println("PkStockId " + PkStockId);
					System.out.println("quantity " + quantity);

					Double updatequnty = (double) (quantity1 - Double.parseDouble(quantity));
					System.out.println("updatequnty " + updatequnty);

					Stock Stock = (Stock) session1.load(Stock.class, new Long(PkStockId));

					Stock.setQuantity(updatequnty);

					session1.saveOrUpdate(Stock);
					transaction1.commit();
					System.out.println("Success ");
				}

			} catch (RuntimeException e) {
				try {
					transaction1.rollback();
				} catch (RuntimeException rbe) {
					Log.error("Couldn't roll back tranaction", rbe);
				}
			} finally {
				hbu1.closeSession(session1);
			}

		}

	}

	public void normalCustFerilizerBillCopy(HttpServletRequest request, HttpServletResponse response) {
		String billNo = request.getParameter("billNo");
		System.out.println("----------------Bill No before session create::" + billNo);
		String onlyShopName = "";
		HttpSession session3 = request.getSession();
		Long billNo2 = Long.parseLong(billNo);
		
		  String shopName = (String)session3.getAttribute("shopName"); String
		  ShopNameWithoutId = shopName.substring(4); 
		  onlyShopName = ShopNameWithoutId.trim();
		         
//		session3.setAttribute("NormalCustFertilizerBillNo", billNo2);
		  session3.setAttribute("fertilizerBillNo",billNo2);
		session3.setAttribute("onlyShopName", onlyShopName);
		System.out.println("----------------Bill No after session create::"
				+ session3.getAttribute("fertilizerBillNo"));
		System.out.println("-----ShopName-------Helper------> "+onlyShopName);

	}

	public void fertilizerCreditCustmerBillCOPY(HttpServletRequest request, HttpServletResponse response) {
		String billNo = request.getParameter("creditCustbillNo");
		System.out.println("----------------Credit cust Bill No before session create::" + billNo);
		String onlyShopName = "";
		HttpSession session3 = request.getSession();
		Long billNo2 = Long.parseLong(billNo);
		
		  String shopName = (String)session3.getAttribute("shopName"); String
		  ShopNameWithoutId = shopName.substring(4); 
		  onlyShopName = ShopNameWithoutId.trim();
		  
//		session3.setAttribute("FertilizerCrditCustBillNo", billNo2);
			session3.setAttribute("fertilizerBillNo", billNo2);	
		  session3.setAttribute("onlyShopName", onlyShopName);
		System.out.println("----------------Credit cust Bill No before session create::"+ session3.getAttribute("fertilizerBillNo"));

	}

	public List getTaxDetailsAsPerCategoryFromSaleBetTwoDate(HttpServletRequest request, HttpServletResponse response) {

		String cat = request.getParameter("cat");
		String fDate = request.getParameter("fDate");
		String sDate = request.getParameter("sDate");
		System.out.println(cat + "Category in Helper");
		System.out.println(fDate + "fDate in Helper");
		System.out.println(sDate + "sDate in Helper");

		Map<Long, GetProductDetails> map = new HashMap<Long, GetProductDetails>();

		FertilizerBillDao dao = new FertilizerBillDao();
		List<GetProductDetails> expList = dao.getPurchaseDetailsForCategoryBetTwoDate(cat, fDate, sDate);

		return expList;

	}

	public Map getAllFertiIetmByBillNo(String bill_no) {
		
		FertilizerBillDao dao = new FertilizerBillDao();
		List list = dao.getAllFertiIetmByBillNo(bill_no);
		
		//System.out.println("Sale Return List in helper--------> "+list.size());
		Map map1 = new HashMap();

		for (int i = 0; i < list.size(); i++) {
			Object[] o = (Object[]) list.get(i);
			FertiSaleReturn bean = new FertiSaleReturn();

			bean.setPkfertilizerBillId((BigInteger) o[0]);
			//bean.setFkGoodsReceive((BigInteger) o[1]);
			bean.setCatId((BigInteger) o[1]);
			bean.setBillno((BigInteger) o[2]);
			bean.setCustomerName(o[3].toString());
			bean.setProductName(o[4].toString());
			bean.setCompany(o[5].toString());
			bean.setWeight(Double.parseDouble(o[6].toString()));
			bean.setSalePrice(Double.parseDouble(o[7].toString()));
			bean.setMrp(Double.parseDouble(o[8].toString()));
			// bean.setQuantity(0l);
			bean.setAvailbleQuantity((BigInteger)o[9]);
			bean.setTotalInGrid(Double.parseDouble(o[10].toString()));
			//bean.setBarcode((BigInteger)o[11]);
			//bean.setAadhar((BigInteger) o[12]);
			bean.setInsertDate(o[11].toString());
			bean.setCustomerHiddenName(o[12].toString());
			bean.setTaxPercentage(Double.parseDouble(o[13].toString()));
			//bean.setSalepriceEx(Double.parseDouble(o[16].toString()));
			bean.setDiscount(Double.parseDouble(o[14].toString()));
			bean.setDiscAmt(Double.parseDouble(o[15].toString()));
			//bean.setTotal(Double.parseDouble(o[18].toString()));
			//bean.setReturnquantity("0");
			
			
			/* bean.setFk_unit_id((BigInteger)o[5]); */
			// bean.setQuantity(0l);
			// System.out.println("***************"+o[0]+"\t"+o[5]);
			map1.put(bean.getPkfertilizerBillId(), bean);
		}
		return map1;
	}

	//////////credit billing of sale return//////////////
	public Map getAllCreditBillDetailsByBillNo(String billno) {
		// TODO Auto-generated method stub
		FertilizerBillDao dao = new FertilizerBillDao();
		List list = dao.getAllCreditBilingDetailByBillNo(billno);
		//System.out.println(list.size());
		Map map1 = new HashMap();

		for(int i = 0; i < list.size(); i++) {
			Object[] o = (Object[]) list.get(i);
			FertiSaleReturn bean = new FertiSaleReturn();

			bean.setPkfertilizerBillId((BigInteger) o[0]);
			bean.setFkGoodsReceive((BigInteger)o[1]);
			bean.setCatId((BigInteger) o[2]);
			bean.setCustomerName(o[3].toString());
			bean.setProductName(o[4].toString());
			bean.setCompany(o[5].toString());
			bean.setWeight(Double.parseDouble(o[6].toString()));
			bean.setSalePrice(Double.parseDouble(o[7].toString()));
			bean.setMrp(Double.parseDouble(o[8].toString()));
			// bean.setQuantity(0l);
			bean.setAvailbleQuantity((BigInteger)o[9]);
			bean.setTotalInGrid(Double.parseDouble(o[10].toString()));
			bean.setBarcode((BigInteger)o[11]);
			bean.setAadhar((BigInteger) o[12]);
			bean.setInsertDate(o[13].toString());
			bean.setCustomerHiddenName(o[14].toString());
			bean.setTaxPercentage(Double.parseDouble(o[15].toString()));
			bean.setDiscount(Double.parseDouble(o[16].toString()));
			bean.setDiscAmt(Double.parseDouble(o[17].toString()));
			bean.setTotal(Double.parseDouble(o[18].toString()));
			bean.setReturnquantity("0");
			
			
			//bean.setSalepriceEx(Double.parseDouble(o[16].toString()));
			/* bean.setFk_unit_id((BigInteger)o[5]); */
			// bean.setQuantity(0l);
			// System.out.println("***************"+o[0]+"\t"+o[5]);
			
			  System.out.println("Fertilizer id***************"+o[0]);
			  System.out.println("GoodReceive***************"+o[1]);
			  System.out.println("cat id***************"+o[2]);
			  System.out.println("customer Name***************"+o[3]);
			  System.out.println("product name***************"+o[4]);
			  System.out.println("company***************"+o[5]);
			  System.out.println("weight***************"+o[6]);
			  System.out.println("sale price***************"+o[7]);
			  System.out.println("mrp***************"+o[8]);
			  System.out.println("available quantity***************"+o[9]);
			  System.out.println("total in grid***************"+o[10]);
			  System.out.println("barcode***************"+o[11]);
			  System.out.println("adhar***************"+o[12]);
			  System.out.println("Insert date***************"+o[13]);
			  System.out.println("customer hidden Name***************"+o[14]);
			  System.out.println("TaxPercentage***************"+o[15]);
			  
			
			
			map1.put(bean.getPkfertilizerBillId(), bean);
		}
		return map1;
	}
	
	/////////////cash billing for fetching bill number//////////
	
	
	public Map getAllBillCash(String customerName) {

		int count = 1;
		System.out.println("IN HELPER");
	

		System.out.println("=== == ===" + customerName);

		FertiSaleReturn bean = new FertiSaleReturn();

		//bean.setCreditCustomer(Long.parseLong(creditCustomer));

		FertilizerBillDao dao = new FertilizerBillDao();
		List list =dao.getAllBillCash(customerName);

		System.out.println("list ======" + list.size());
		Map map = new HashMap();
		for (int i = 0; i < list.size(); i++) {
			System.out.println("IN HELPER");
			Object[] o = (Object[]) list.get(i);
			FertiSaleReturn bean1 = new FertiSaleReturn();
			System.out.println(Arrays.toString(o));
			bean1.setBillno((BigInteger) o[0]);
		    bean1.setGrossTotal(Double.parseDouble(o[1].toString()));
		    System.out.println("***************" + o[0]);
			map.put(count, bean1);
			count++;
		}
		return map;
	
}

	/////////////fetching bill number for credit cust////////////////
	
	public Map getAllBillCredit(String creditCustomer) {

		int count = 1;
		System.out.println("IN HELPER");
	

		System.out.println("=== == ===" + creditCustomer);

		FertiSaleReturn bean = new FertiSaleReturn();

		//bean.setCreditCustomer(Long.parseLong(creditCustomer));

		FertilizerBillDao dao = new FertilizerBillDao();
		List list =dao.getAllBillCredit(creditCustomer);

		System.out.println("list ======" + list.size());
		Map map = new HashMap();
		
		for (int i = 0; i < list.size(); i++) {
			
			System.out.println("IN HELPER");
			Object[] o = (Object[]) list.get(i);
			
			FertiSaleReturn bean1 = new FertiSaleReturn();
			System.out.println(Arrays.toString(o));
			
			bean1.setBillno((BigInteger) o[0]);
		    bean1.setGrossTotal(Double.parseDouble(o[1].toString()));
		    
		    System.out.println("***************" + o[0]);
		    
			map.put(count, bean1);
			count++;
		}
		return map;
	
}

	public void saleReturnAsPerBillNo(HttpServletRequest request, HttpServletResponse response) throws ParseException {

		// TODO Auto-generated method stub
		Integer count = Integer.parseInt(request.getParameter("count"));
		for (int i = 0; i < count; i++)
		{
			String billno = request.getParameter("billno");
			String custName = request.getParameter("custName");
			String grossTotal = request.getParameter("grossTotal");
			
			String pkBillingId = request.getParameter("pkBillingId" + i);
			String PkGoodreceiveId = request.getParameter("PkGoodreceiveId" + i);
			String barcodeNo = request.getParameter("barcodeNo" + i);
			String itemName = request.getParameter("itemName" + i);
			String companyName = request.getParameter("companyName" + i);
			String hsn = request.getParameter("hsn" + i);
			String batchNumber = request.getParameter("batchNumber" + i);
			String buyPrice = request.getParameter("buyPrice" + i);
			String mrp = request.getParameter("mrp" + i);
			String salePrice = request.getParameter("salePrice" + i);
			String taxPercentage = request.getParameter("taxPercentage" + i);
			String weight = request.getParameter("weight" + i);                   //packing
			String unitName = request.getParameter("unitName" + i); 
			String quantity = request.getParameter("quantity" + i);
			String returnQuantity = request.getParameter("returnQuantity" + i);
			String alltotalforReturn = request.getParameter("alltotalforReturn" + i);
			String returnTotal = request.getParameter("returnTotal" + i);
						
			HibernateUtility hbu = null;
			Session session = null;
			Transaction transaction = null;

			try
			{
				Double grossTotal1 = 0.0;
				Double grossTotal2 = 0.0;
				Double stockQuantity = 0.0;
				String QuantityFromStock = null;
				Double newStockQuantity = 0.0;
				Long pkStockId = 0l;
				Double QuantityFromgoodRec = 0.0;
				
				hbu = HibernateUtility.getInstance();
				session = hbu.getHibernateSession();
				transaction = session.beginTransaction();
				
				List<Object[]> list = null;
				List<Object[]> list2 = null;
				List<StockDetail> stockList = null;
				List<FertilizerBillBean> fertiList = null;
				List<GoodsReceiveBean> goodsReceiveList = null;
				
				Long remainingQuantity = (Long) (Long.parseLong(quantity) - Long.parseLong(returnQuantity));
				Double remainingQuantitya = (Double) (Double.parseDouble(quantity) - Double.parseDouble(returnQuantity));
				
				FertilizerBillBean updateStock = (FertilizerBillBean) session.get(FertilizerBillBean.class,	new Long(pkBillingId));
				updateStock.setReturnQuantity(Long.parseLong(returnQuantity));
				updateStock.setQuantityAfterReturn(remainingQuantity);
				updateStock.setQuantity(remainingQuantitya);
				
				// update Sale Return Gross total 
				
				Query query5 = session.createSQLQuery("select gross_total, bill_no from fertilizer_billing WHERE pk_fertilizer_bill_id=" +pkBillingId);
				list = query5.list();
				fertiList = new ArrayList<FertilizerBillBean>();
				for (Object[] objects : list) {
					
					 grossTotal2 =Double.parseDouble(objects[0].toString()); 
					
				}
				Double newSaleRetgrossTotal = grossTotal2 - Double.parseDouble(grossTotal);
				
				// update stock
				Query query = session.createSQLQuery("Select avail_Quantity,PkStockId FROM stock_detail WHERE ProductName='"
													  + itemName + "' AND CompanyName='" + companyName + "' and Weight =" + weight);

				list = query.list();
				stockList = new ArrayList<StockDetail>();
				for (Object[] objects : list) {
					
					QuantityFromStock = objects[0].toString();
					stockQuantity = Double.parseDouble(QuantityFromStock);

					String pkstock = objects[1].toString();
					pkStockId = Long.parseLong(pkstock);
				}

				Double q = Double.parseDouble(returnQuantity);
				newStockQuantity = stockQuantity + q;
				
				Query query1 = session.createSQLQuery("UPDATE stock_detail SET avail_Quantity =" + newStockQuantity + ", total_kg_ltr_piece_stock=" + newStockQuantity + "  WHERE PkStockId=" + pkStockId);
				query1.executeUpdate();

				// Update fertilizer bill table
				
				Query query2 = session.createSQLQuery("SELECT gross_total,bill_no, quantity FROM fertilizer_billing WHERE pk_fertilizer_bill_id="+ pkBillingId);
				list2 = query2.list();
				
				fertiList = new ArrayList<FertilizerBillBean>();
				for (Object[] objects : list2)
				{
					grossTotal1 = Double.parseDouble(objects[0].toString());
				}

				Double salePriceFromGrid = Double.parseDouble(salePrice);
				Double tax = Double.parseDouble(taxPercentage);
				
				Double newSalePrice = salePriceFromGrid;
				Double qnt = (Double.parseDouble(quantity) - Double.parseDouble(returnQuantity));
				//System.out.println("Quantity---------------"+qnt );
				FertilizerBillDao fbd = new FertilizerBillDao();
				fbd.updateBillingQuantity(qnt, billno, barcodeNo);
				
				Double total = qnt * salePriceFromGrid;
				Double returnamnt = Double.parseDouble(quantity) * salePriceFromGrid;
				Double newGrossTotal = grossTotal1 - total;
				
				updateStock.setTotalAfterSaleReturn(total);
				updateStock.setReturnAmount(returnamnt);
				updateStock.setGrossTotal(newSaleRetgrossTotal);
				session.saveOrUpdate(updateStock);
				
				//update goodsReceive
				
				Query query3 = session.createSQLQuery("SELECT dupQuantity,bill_number,gross_total FROM goods_receive WHERE pk_goods_receive_id ="+ PkGoodreceiveId);
				
				
				  list = query3.list(); 
				  goodsReceiveList= new ArrayList<GoodsReceiveBean>(); 
				  
				  for(Object[] objects : list) 
				  { 
					   QuantityFromgoodRec = Double.parseDouble(objects[0].toString());
				      //stockQuantity = (QuantityFromgoodRec);
				  
				  //String pkstock = objects[1].toString();
				 // pkStockId = Long.parseLong(pkstock);
				  }
				  
				  Double q1 = Double.parseDouble(returnQuantity);
				  newStockQuantity = QuantityFromgoodRec + q;
				  Query query4 = session.createSQLQuery("UPDATE goods_receive SET dupQuantity =" + newStockQuantity + " WHERE pk_goods_receive_id=" + PkGoodreceiveId);
				  query4.executeUpdate();
				 
				
			
				// add Sale Return to sale_return table
				SaleReturnBean bean = new SaleReturnBean();
				
				String pattern = "yyyy-MM-dd";
			  	SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
			  	String todayDate = simpleDateFormat.format(new Date());
			    Date date1=new SimpleDateFormat(pattern).parse(todayDate); 
			  	System.out.println(todayDate);
				
				bean.setBillNo(Long.parseLong(billno));
				bean.setCustomerName(custName);
				bean.setReturnDate(date1);
				
				bean.setFkFertilizerBillId(Long.parseLong(pkBillingId));
				bean.setBarcodeNo(Long.parseLong(barcodeNo));
				bean.setProductName(itemName);
				bean.setCompany(companyName);
				bean.setHsn(hsn);
				if(batchNumber.equals("")) {
					bean.setBatchno("N/A");
				}else {
					bean.setBatchno(batchNumber);
				}
				bean.setBuyprice(Double.parseDouble(buyPrice));
				bean.setMrp(Double.parseDouble(mrp));
				bean.setSalePrice(Double.parseDouble(salePrice));
				bean.setTaxPercentage(Double.parseDouble(taxPercentage));
				bean.setWeight(Double.parseDouble(weight));    // packing
				bean.setUnitname(unitName);
				bean.setAvailableQuantity(Double.parseDouble(quantity));
				bean.setReturnQuantity(Double.parseDouble(returnQuantity));
				bean.setReturnAmount(Double.parseDouble(returnTotal));
				if(returnQuantity.equals("0")) {
					bean.setPreviousReturnAmt(0.0);
				}else {
					bean.setPreviousReturnAmt(Double.parseDouble(alltotalforReturn));
				}
				if(returnTotal.equals("0")) {
					bean.setGrosstotal(0.0);
				}else {
					bean.setGrosstotal(Double.parseDouble(grossTotal));
				}
				
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

	/*
	 * public void saleReturnAsPerBillNo(HttpServletRequest request,
	 * HttpServletResponse response) {
	 * 
	 * System.out.
	 * println("======FertilizerBillHelper.java saleReturnAsPerBillNo()======");
	 * //String bill_no; Double returnamnt = null; Long remainingQuantity =
	 * null; Double newSalePrice = null; Double total = null; Date dateobj =
	 * null; Double FBillOldReturnAmt = null; Long FBillOldReturnQuantity =
	 * null; // TODO Auto-generated method stub Integer count =
	 * Integer.parseInt(request.getParameter("count")); for(int i =0 ; i
	 * <count;i++) { String bill_no = request.getParameter("bill_no"); //bill_no
	 * = request.getParameter("bill_no"); String pkfertilizerBillId =
	 * request.getParameter("pkfertilizerBillId"+i);
	 * System.out.println("ln 1073 ==== BILL NO for Sale Returns =====> "
	 * +bill_no);
	 * System.out.println("ln 1073 ==== CUSTOMER ID for Sale Returns =====> "
	 * +pkfertilizerBillId); String availbleQuantity =
	 * request.getParameter("availbleQuantity"+i); String productName =
	 * request.getParameter("productName"+i); String company =
	 * request.getParameter("company"+i); String weight =
	 * request.getParameter("weight"+i); String quantity =
	 * request.getParameter("quantity1"+i); String salePrice =
	 * request.getParameter("salePrice"+i); String mrp =
	 * request.getParameter("mrp"+i); String taxPercentage =
	 * request.getParameter("taxPercentage"+i); String aadhar =
	 * request.getParameter("aadhar"+i); String customerName =
	 * request.getParameter("customerName"+i); String saleDate =
	 * request.getParameter("insertDate"+i);
	 * System.out.println("currnt qunt : "+ availbleQuantity);
	 * System.out.println("return qunt : "+ quantity);
	 * System.out.println("pkfertilizerBillId  : "+ pkfertilizerBillId);
	 * 
	 * HibernateUtility hbu=null; Session session = null; Transaction
	 * transaction = null;
	 * 
	 * try{ Double grossTotal=0.0; Double stockQuantity =0.0; String
	 * QuantityFromStock=null; Double newStockQuantity = 0.0; Long pkStockId =
	 * 0l; hbu = HibernateUtility.getInstance(); session =
	 * hbu.getHibernateSession(); transaction = session.beginTransaction();
	 * List<Object[]> list = null; List<Object[]> list2 = null;
	 * List<StockDetail> stockList = null; List<FertilizerBillBean> fertiList =
	 * null; remainingQuantity = (Long)(Long.parseLong(availbleQuantity) -
	 * Long.parseLong(quantity)); System.out.println("remaining qunt : "+
	 * remainingQuantity);
	 * 
	 * //FERTILIZER_BILLING BEAN STARTED FertilizerBillBean updateStock =
	 * (FertilizerBillBean) session.get(FertilizerBillBean.class, new
	 * Long(pkfertilizerBillId));
	 * updateStock.setReturnQuantity(Long.parseLong(quantity));
	 * updateStock.setQuantityAfterReturn(remainingQuantity);
	 * 
	 * 
	 * //update stock Query query = session.
	 * createSQLQuery("select Quantity,PkStockId FROM stock_detail WHERE ProductName='"
	 * +productName+"' AND CompanyName='"+company+"' and Weight ="+weight);
	 * 
	 * list = query.list(); stockList = new ArrayList<StockDetail>(); for
	 * (Object[] objects : list) { QuantityFromStock = objects[0].toString();
	 * stockQuantity = Double.parseDouble(QuantityFromStock);
	 * 
	 * String pkstock = objects[1].toString(); pkStockId =
	 * Long.parseLong(pkstock); }
	 * 
	 * Double q = Double.parseDouble(quantity); newStockQuantity = stockQuantity
	 * + q ; Query query1 =
	 * session.createSQLQuery("UPDATE stock_detail SET Quantity ="
	 * +newStockQuantity+" WHERE PkStockId="+pkStockId); query1.executeUpdate();
	 * 
	 * //Update fertilizer bill table //fetch gross total as per bill
	 * number(fkFertilizerBillId)
	 * 
	 * Query query2 = session.
	 * createSQLQuery("SELECT gross_total, return_amount, return_quantity, bill_no FROM fertilizer_billing WHERE pk_fertilizer_bill_id="
	 * +pkfertilizerBillId); list2 = query2.list(); fertiList = new
	 * ArrayList<FertilizerBillBean>(); for (Object[] objects : list2) {
	 * grossTotal = Double.parseDouble(objects[0].toString()); FBillOldReturnAmt
	 * = Double.parseDouble(objects[1].toString()); FBillOldReturnQuantity =
	 * Long.parseLong(objects[2].toString()); }
	 * 
	 * Double salePriceFromGrid = Double.parseDouble(salePrice); Double tax =
	 * Double.parseDouble(taxPercentage); Double taxAmount = salePriceFromGrid;
	 * newSalePrice = salePriceFromGrid ; Double
	 * qnt=(Double.parseDouble(availbleQuantity)-Double.parseDouble(quantity));
	 * System.out.
	 * println("ln no 1185 FertilizerBillingHelper ==== newSalePrice ===> "
	 * +newSalePrice); total = qnt * salePriceFromGrid;
	 * System.out.println("ln no 1151 FertilizerBillingHelper ==== Total ===> "
	 * +total); returnamnt = Double.parseDouble(quantity)*salePriceFromGrid;
	 * System.out.
	 * println("ln no 1189 FertilizerBillingHelper ==== Return amount ===> "
	 * +returnamnt); Double newGrossTotal = grossTotal - total; System.out.
	 * println("ln no 1191 FertilizerBillingHelper ==== new Gross Total ===> "
	 * +newGrossTotal); System.out.println("grossTotal = = ="+grossTotal);
	 * System.out.println("newSalePrice = = ="+newSalePrice);
	 * System.out.println("newGrossTotal = = ="+newGrossTotal);
	 * 
	 * System.out.
	 * println("ln 1209 updateStock.setTotalAfterSaleReturn(total);================== "
	 * +total); updateStock.setTotalAfterSaleReturn(total); System.out.
	 * println("ln 1211 updateStock.setTotalAfterSaleReturn(total);================== "
	 * +total); updateStock.setReturnAmount(total);
	 * //updateStock.setReturnAmount(FBillOldReturnAmt+returnamnt);
	 * //updateStock.setReturnQuantity(Long.parseLong(quantity+
	 * FBillOldReturnQuantity));
	 * 
	 * 
	 * session.saveOrUpdate(updateStock); transaction.commit();
	 * 
	 * } catch(RuntimeException e) { //CATCH 1 System.out.println("CATCH 1");
	 * try { transaction.rollback();
	 * 
	 * }catch(RuntimeException rbe) {
	 * Log.error("Couldn't roll back tranaction",rbe); } }finally{
	 * hbu.closeSession(session); }
	 * 
	 * 
	 * HibernateUtility hbu2=null; Session session2 = null; Transaction
	 * transaction2 = null;
	 * 
	 * hbu2 = HibernateUtility.getInstance(); session2 =
	 * hbu2.getHibernateSession(); transaction2 = session2.beginTransaction();
	 * 
	 * try{
	 * 
	 * 
	 * //add Sale Return to sale_return table SaleReturnBean bean = new
	 * SaleReturnBean(); bean.setBillNo(Long.parseLong(bill_no));
	 * bean.setAadhar(0l); bean.setCustomerName(customerName);
	 * bean.setFkFertilizerBillId(Long.parseLong(pkfertilizerBillId));
	 * bean.setProductName(productName); bean.setFkCatId(1l);
	 * bean.setSalePrice(Double.parseDouble(salePrice));
	 * bean.setMrp(Double.parseDouble(mrp));
	 * bean.setTaxPercentage(Double.parseDouble(taxPercentage));
	 * bean.setAvailableQuantity(Double.parseDouble(availbleQuantity));
	 * bean.setReturnQuantity(Double.parseDouble(quantity));
	 * bean.setWeight(Double.parseDouble(weight)); bean.setCompany(company);
	 * bean.setReturnAmount(returnamnt); bean.setSaleDate(saleDate);
	 * bean.setFkPesticideBillId(0l); bean.setFkSeedBillId(0l);
	 * bean.setBatchNumber("N/A"); SimpleDateFormat dateFormat1 = new
	 * SimpleDateFormat("yyyy-MM-dd"); dateobj = new Date();
	 * System.out.println(dateFormat1.format(dateobj));
	 * bean.setReturnDate(dateobj);
	 * 
	 * session2.save(bean); transaction2.commit(); }catch(RuntimeException e) {
	 * //CATCH 2 System.out.println("CATCH 1"); try{
	 * System.out.println("=== TRY 2 === || TRANSACTION ROLLBACK");
	 * transaction.rollback(); }catch(RuntimeException rbe) {
	 * Log.error("Couldn't roll back tranaction",rbe); } }finally{
	 * hbu.closeSession(session2); }
	 * 
	 * 
	 * 
	 * HibernateUtility hbu3=null; Session session3 = null; Transaction
	 * transaction3 = null;
	 * 
	 * hbu3 = HibernateUtility.getInstance(); session3 =
	 * hbu3.getHibernateSession(); transaction3 = session3.beginTransaction();
	 * 
	 * 
	 * try {
	 * 
	 * Query query3 = session.
	 * createSQLQuery("SELECT cat_id, bill_no, gross_total FROM fertilizer_billing WHERE bill_no="
	 * +bill_no); List<Object[]> list3 = null; List<FertilizerBillBean>
	 * fertiList3 = null; list3 = query3.list(); Long catId = null; Long
	 * grossTotalFB = null; fertiList3 = new ArrayList<FertilizerBillBean>();
	 * for (Object[] objects : list3) { catId =
	 * Long.parseLong(objects[0].toString()); grossTotalFB =
	 * Long.parseLong(objects[2].toString()); }
	 * 
	 * 
	 * 
	 * 
	 * Query query4 = session.
	 * createSQLQuery("SELECT balance, total_amount FROM credit_customer_payment WHERE bill_no = "
	 * +bill_no+" ORDER BY pk_credit_customer_id  DESC LIMIT 1 ;");
	 * List<Object[]> list4 = null; List<CustomerPaymentBean> custPay = null;
	 * list4 = query4.list(); double custPaybalance = 0; double
	 * custPayTotalAmount = 0; custPay = new ArrayList<CustomerPaymentBean>();
	 * for (Object[] objects : list4) { custPaybalance =
	 * Double.parseDouble(objects[0].toString()); custPayTotalAmount =
	 * Double.parseDouble(objects[1].toString()); }
	 * 
	 * 
	 * 
	 * double creditCustPaybalance = grossTotalFB-(); double
	 * creditCustPayTotalAmount = 0;
	 * 
	 * 
	 * double creditcustPaybalance = remainingQuantity*newSalePrice; //double
	 * newCustPayTotalAmount = custPayTotalAmount - total; //System.out.
	 * println("ln 1220 newCustPayTotalAmount remainingquantity*newsaleprice ====> "
	 * +newCustPayTotalAmount); System.out.
	 * println("ln 1221 balance remainingquantity*newsaleprice ====> "
	 * +creditcustPaybalance); CustomerPaymentBean cpbean = new
	 * CustomerPaymentBean(); cpbean.setBillNo(Long.parseLong(bill_no));
	 * 
	 * cpbean.setBalance(custPaybalance); cpbean.setTotalAmount(total);
	 * 
	 * cpbean.setPersonname(customerName); cpbean.setInsertDate(dateobj);
	 * cpbean.setCatId(catId);
	 * 
	 * cpbean.setPaidAmount(0.0);
	 * 
	 * session3.save(cpbean); transaction3.commit(); } catch(RuntimeException e)
	 * { //CATCH 3 System.out.println("CATCH 3"); try{
	 * System.out.println("=== TRY 3 === || TRANSACTION ROLLBACK");
	 * transaction.rollback(); }catch(RuntimeException rbe) {
	 * Log.error("Couldn't roll back tranaction",rbe); } }finally{
	 * hbu.closeSession(session3); }
	 * 
	 * 
	 * } }
	 */

	void CreditCustomerBalanceUpdateForFirstSaleReturnBeforePayment() {

	}

	public List saleReturnReportAsPerBill(HttpServletRequest request, HttpServletResponse response) {

		String bill_no = request.getParameter("bill_no");
		String fDate = request.getParameter("fDate");
		String sDate = request.getParameter("sDate");
		System.out.println(bill_no + "Category in Helper");
		System.out.println(fDate + "fDate in Helper");
		System.out.println(sDate + "sDate in Helper");

		Map<Long, SaleReports> map = new HashMap<Long, SaleReports>();

		FertilizerBillDao dao = new FertilizerBillDao();
		List<SaleReturnBean> expList = dao.saleReturnReportAsPerBill(bill_no);

		return expList;
	}

	public Map getAllBillByCustomerSaleReturn(String customerId) {

		FertilizerBillDao dao = new FertilizerBillDao();
		List list= dao.getAllBillByCustomerSaleReturn(customerId);
		
		Map  map =  new HashMap();
		for(int i=0;i<list.size();i++)
		{
			Object[] o = (Object[])list.get(i);
			GetSupplierDetails bean = new GetSupplierDetails();
			//System.out.println(Arrays.toString(o));
			
			bean.setBillNo(o[0].toString());
			bean.setCustomerName(o[1].toString());
			//Double billPaymnetPending = Double.parseDouble(o[2].toString());
			//bean.setInsertDate(o[1].toString());
			//bean.setTotalAmount((Double)o[1]);
			//System.out.println("BILL NUMBER WHERE BILL PAYMENT PENDING > 0.000 ============> "+ o[0].toString());
			
			
			//System.out.println("***************"+o[0]);
			map.put(bean.getBillNo(),bean);
			
		}
		return map;
	}


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
	 * 
	 * 
	 * 
	 * map.put(count,bean); count++; } return map; }
	 */
	
	/*----------------------------Add Non GST Billing DATA into Database-----------------------------------*/
	
	public void addnonGSTBilling(HttpServletRequest request, HttpServletResponse response)throws Exception
	{
		String customerType = request.getParameter("customerType");
		
		String grossTotal = "";
		String firstPaidAmtCreditCustomer = "";
		String paymentMode = "";
		String checkNum = "";
		String nameOnCheck = "";
		String cardNo = "";
		String accNo = "";
		String bankName = "";
		String customerHiddenName = "";
		String customerName = "";
		Date dateobj = null;
		java.sql.Date sqlDate = null;
		String fkCustomerId = "";
		String fk_shop_id = "";
		
		Long billNoForPdf;

		FertilizerBillDao dao = new FertilizerBillDao();

		List bill = dao.getCustomerBill();

		for (int i = 0; i < bill.size(); i++) {
			CustomerBillBean sa = (CustomerBillBean) bill.get(i);
			customerBill = sa.getBillNo();
			//System.out.println(customerBill);

			customerBill++;
			//System.out.println(customerBill);
		}
		Integer count = Integer.parseInt(request.getParameter("count"));
		System.out.println(count);

		FertilizerBillBean bean = new FertilizerBillBean();

		for (int i = 0; i < count; i++) {

			if (customerBill == null) {
				bean.setBillNo(1l);
				billNoForPdf = 1l;
			} else {
				bean.setBillNo(customerBill);
				billNoForPdf = customerBill;
			}

			// Out Of Grid Content
			customerName = request.getParameter("customerName");
			String village = request.getParameter("village");
			String contactNum = request.getParameter("contactNo");
			String saleDate = request.getParameter("saleDate");
			String gstNo = request.getParameter("gstNo");
			//String hamaliExpense = request.getParameter("hamaliExpense");
			String hamaliExpenseWithourGST = request.getParameter("hamaliExpenseWithourGST");
			String total = request.getParameter("total");
						
			grossTotal = request.getParameter("grossTotal");
			fkCustomerId = request.getParameter("fkCreditCustomerID");
			customerHiddenName = request.getParameter("creditCustomerHiddenName");
			fk_shop_id = request.getParameter("fk_shop_id");
			
			String discount = request.getParameter("discount");
			String discountAmount = request.getParameter("discountAmount");
			String billtype = request.getParameter("billtype");
			String description = request.getParameter("description");
			String type = request.getParameter("type");
			String fkcustid = request.getParameter("fkcustid");
			
			String email = request.getParameter("email");
			String firmName = request.getParameter("firmName");
			
			System.out.println("type - "+type+"  firm - - "+firmName);
			
			

			
			if(type.equals("Cash")) {
				
				bean.setFkCreditCustomerId(0l);
				bean.setCustomerHiddenName("N/A");
				bean.setBillPaymentPending(0d);
				bean.setCustomerName(customerName);
				System.out.println("````````````````````  if cash set cust - "+bean.getCustomerName()+" , id -  "+bean.getFkCreditCustomerId()+" , credit cust - "+bean.getCustomerHiddenName());
			}
			
			if(type.equals("Credit")) {
				
				if((fkcustid.equals("")) || (fkcustid.equals(null)) || (fkcustid.equals("undefined"))) {
					bean.setFkCreditCustomerId(0l);
				}
				else {

					bean.setFkCreditCustomerId(Long.parseLong(fkcustid));
				}

				bean.setCustomerHiddenName(customerName);
				bean.setCustomerName("N/A");
				bean.setBillPaymentPending(Double.parseDouble(grossTotal));
				
				bean.setEmail(email);
				System.out.println("email -  "+email);
				System.out.println("Pending Balance ================= "+ (Double.parseDouble(grossTotal)));
				System.out.println("````````````````````  if credit set  cust - "+bean.getCustomerName()+" , id -  "+bean.getFkCreditCustomerId()+" , credit cust - "+bean.getCustomerHiddenName());
			System.out.println("bean.set  Bill  PaymentPending - - -     ````````````   "+bean.getBillPaymentPending());
			
			}
			
			if (customerType.equals("CREDITCUSTOMER")) 
			{
				firstPaidAmtCreditCustomer = request.getParameter("firstPaidAmtCreditCustomer");
				//System.out.println("CREDIT FIRST PAYMENT ======= " + firstPaidAmtCreditCustomer);
				
				
				if (firstPaidAmtCreditCustomer.equals("") || firstPaidAmtCreditCustomer == null) 
				{
					firstPaidAmtCreditCustomer = "0";
					bean.setNetpayAmount(0.0);
				}
				else {
					bean.setNetpayAmount(Double.parseDouble(firstPaidAmtCreditCustomer));
				}
			}

			String creditCustomerName = request.getParameter("creditCustomerName");

			if (billtype != "") {
				bean.setBillType(billtype);
			} else {
				bean.setBillType("N/A");
			}
			if (description != "") {
				bean.setDescription(description);
			} else {
				bean.setDescription("N/A");
			}
			
			bean.setFirmName(firmName);

			if (gstNo != "") {
				bean.setGstNo(gstNo);
			} else {
				bean.setGstNo("N/A");
			}

			
			if (village != "") {
				bean.setVillage(village);
			} else {
				bean.setVillage("N/A");
			}
			if (contactNum != "") {
				bean.setContact(Long.parseLong(contactNum));
			} else {
				bean.setContact(0l);
			}
			if (discount != null) {
				bean.setDiscount(Double.parseDouble(discount));
			} else {
				bean.setDiscount(0.0);
			}
			if (discountAmount != null) {
				bean.setDiscountAmount(Double.parseDouble(discountAmount));
			} else {
				bean.setDiscountAmount(0.0);
			}
			String onlyShopName1 = "";

			HttpSession session = request.getSession(true);

			String username = (String) session.getAttribute("user");
			String userid = (String) session.getAttribute("userid");
			String shopid = (String) session.getAttribute("shopid");
			String shopName1 = (String) session.getAttribute("shopName");
			
			String ShopNameWithoutId1 = shopName1.substring(4);
			onlyShopName1 = ShopNameWithoutId1.trim();
		
			if (shopid != null) {
				bean.setFk_shop_id(Long.parseLong(shopid));
			} else {
				bean.setFk_shop_id(0l);
			}
			
			if (userid != null) {
				bean.setUserid(Long.parseLong(userid));
			} else {
				bean.setUserid(0l);
			}
			
			if (onlyShopName1 != "") {
				bean.setShopName1(onlyShopName1);
			} else {
				bean.setShopName1("N/A");
			}
			
			if (username != "") {
				bean.setUsername(username);
			} else {
				bean.setUsername("N/A");
			}
			/*
			 * if(transExpense !=""){ Double totalExpense=0d;
			 * totalExpense=(Double.parseDouble(transExpenseWithoutGST)) +
			 * (Double.parseDouble(transExpense));
			 * bean.setTransExpense(totalExpense); } else{
			 * bean.setTransExpense(0.0); }
			 */
			if (hamaliExpenseWithourGST != "") {
				Double totalExpense = 0d;
				totalExpense = (Double.parseDouble(hamaliExpenseWithourGST)) ;
				bean.setHamaliExpense(totalExpense);
			} else {
				bean.setHamaliExpense(0.0);
			}
			if (total != null) {
				bean.setTotal(Double.parseDouble(total));
			} else {
				bean.setTotal(0.0);
			}
				
			bean.setCust_type(type);
			System.out.println("type set -  "+bean.getCust_type());
			SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
			// String pDate = request.getParameter("pDate");
			Date saleDateq = null;

			try
			{
				saleDateq = dateFormat.parse(saleDate);
				System.out.println("in try block to format Date ================== " + saleDateq);
				sqlDate = new java.sql.Date(saleDateq.getTime());

			} catch (ParseException e)
			{
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			bean.setSaleDate(sqlDate);

			if (grossTotal != null) {
				bean.setGrossTotal(Double.parseDouble(grossTotal));

				if (customerType.equals("NORMALCUSTOMER")) {
//					bean.setBillPaymentPending(0.0);
				} else if (customerType.equals("CREDITCUSTOMER")) {
					/*
					 * bean.setBillPaymentPending( Double.parseDouble(grossTotal) -
					 * Double.parseDouble(firstPaidAmtCreditCustomer));
					 * 
					 * System.out.println("Pending Balance ================= " +
					 * (Double.parseDouble(grossTotal) -
					 * Double.parseDouble(firstPaidAmtCreditCustomer)));
					 */
				}

			}
			else
			{
				bean.setGrossTotal(0.0);
				bean.setBillPaymentPending(0.0);
			}
			
			if(firstPaidAmtCreditCustomer == "" || Double.parseDouble(firstPaidAmtCreditCustomer) == 0.0)
			{
				bean.setPaymentMode("Selected");
			}			

			// Grid Content
			String catId = request.getParameter("cat_id" + i);
			String barcodeNo = request.getParameter("barcodeNo" + i);
			String sub_cat_id = request.getParameter("sub_cat_id" + i);
			String hsn = request.getParameter("hsn" + i);
			String proName = request.getParameter("itemName" + i);
			String quantity = request.getParameter("quantity" + i);
			System.out.println("<------------------Quantity ---------------> "+quantity);
			String mrp = request.getParameter("mrp" + i);
			String salePrice = request.getParameter("salePrice" + i);
			String DiscountperProd = request.getParameter("DiscountperProd" + i);
			String DiscountAmountperProd = request.getParameter("DiscountAmountperProd" + i);
			String totalPerProductInGrid = request.getParameter("total" + i);
			double sgst = Double.parseDouble(request.getParameter("sgst" + i));
			double cgst = Double.parseDouble(request.getParameter("cgst" + i));
			double Gst  = sgst + cgst;
			
			String igst = request.getParameter("igst" + i);
			    if (igst == null)
			    {
				igst = "0";
			    }
			String company = request.getParameter("companyName" + i);
			String weight = request.getParameter("weight" + i);
			String unitName = request.getParameter("unitName" + i);
			String freeQuantity = request.getParameter("freeQuantity" + i);
			String tempExpiryDate = request.getParameter("expiryDate"+i);
			String PkGoodreceiveId = request.getParameter("PkGoodreceiveId"+i);	
			String productPkId = request.getParameter("productPkId"+i);	
			String chaalanNo = request.getParameter("chaalanNo"+i);	
		
			String barcode_id = request.getParameter("barcode_id"+i);	
			
			//bean.setBarcode(Long.parseLong(barcodeNo));
			
			if(!"".equals(barcode_id)) {
				bean.setBarcode_id(barcode_id);
			}
			else {
				bean.setBarcode_id("0");
			}
			
			  if (barcodeNo != null) 
			  { 
				bean.setBarcode(Long.parseLong(barcodeNo));
			}
			  else
			  {}
			  //System.out.println("Barcode Number Helper------>"+bean.getBarcode());
			if(freeQuantity == null || freeQuantity.equalsIgnoreCase(""))
			{
				freeQuantity = "0";
			}
			System.out.println("FREE QUANTITY === "+freeQuantity);
			
			
			Double userEnteredQuantity = Double.parseDouble(quantity);
			
			
			if(unitName.equalsIgnoreCase("kg"))
			{
				System.out.println("UNIT NAME ENTERED ::::::: ===========> "+unitName);
			
				if(userEnteredQuantity >= 1)
				{
					double totalGrams = userEnteredQuantity*1000;
					int kg = (int)totalGrams/1000;
					double grams = totalGrams%1000;
					System.out.println("user Input Kg ===== " + kg);
					System.out.println("user Input Grams ===== " + grams);

					bean.setKg((double)kg);
					bean.setGrams(grams);
					bean.setLtr(0.0);
					bean.setMili(0.0);
					bean.setQuantity(Double.parseDouble(quantity));
					bean.setUnit(unitName);
					bean.setFreeQuantity(0.0);	
				}
				else if(userEnteredQuantity < 1)
				{
					double grams = userEnteredQuantity*1000;
					bean.setKg(0.0);
					bean.setGrams(grams);
					bean.setLtr(0.0);
					bean.setMili(0.0);
					bean.setQuantity(Double.parseDouble(quantity));
					bean.setUnit(unitName);
					bean.setFreeQuantity(0.0);	
				}
			}

			if (unitName.equalsIgnoreCase("ltr"))
			{	
				System.out.println("UNIT NAME ENTERED ::::::: ===========> "+unitName);
				if(userEnteredQuantity >= 1)
				{
					double totalMili = userEnteredQuantity*1000;
					int ltr = (int)totalMili/1000;
					double mili = totalMili%1000;

					//System.out.println("user Input Kg ===== " + ltr);
					//System.out.println("user Input Grams ===== " + mili);

					bean.setLtr((double)ltr);
					bean.setMili(mili);
					bean.setKg(0.0);
					bean.setGrams(0.0);
					bean.setQuantity(Double.parseDouble(quantity));
					bean.setUnit(unitName);
					bean.setFreeQuantity(0.0);	
				}
				else if(userEnteredQuantity < 1)
				{
					double mili = userEnteredQuantity*1000;
					bean.setKg(0.0);
					bean.setGrams(0.0);
					bean.setLtr(0.0);
					bean.setMili(mili);
					bean.setQuantity(Double.parseDouble(quantity));
					bean.setUnit(unitName);
					bean.setFreeQuantity(0.0);	
				}
			}
			
			if (unitName.equalsIgnoreCase("pcs"))
			{
				
				System.out.println("UNIT NAME ENTERED ::::::: ===========> "+unitName);
				
				if (quantity == null || quantity == "")
				{
					bean.setQuantity(0d);
				} else {
					bean.setQuantity(Double.parseDouble(quantity));
				}
				bean.setUnit(unitName);
				bean.setKg(0.0);
				bean.setLtr(0.0);
				bean.setGrams(0.0);
				bean.setMili(0.0);
				bean.setFreeQuantity(Double.parseDouble(freeQuantity));
			}
			if (unitName.equalsIgnoreCase("grams"))
			{
				
				System.out.println("UNIT NAME ENTERED ::::::: ===========> "+unitName);
				
				if (quantity == null || quantity == "")
				{
					bean.setQuantity(0d);
				} else {
					bean.setQuantity(Double.parseDouble(quantity));
				}
				bean.setUnit(unitName);
				bean.setKg(0.0);
				bean.setLtr(0.0);
				bean.setGrams(Double.parseDouble(quantity));
				bean.setMili(0.0);
				bean.setFreeQuantity(Double.parseDouble(freeQuantity));
			}
			
			if (unitName.equalsIgnoreCase("millilitre"))
			{
				
				System.out.println("UNIT NAME ENTERED ::::::: ===========> "+unitName);
				
				if (quantity == null || quantity == "")
				{
					bean.setQuantity(0d);
				} else {
					bean.setQuantity(Double.parseDouble(quantity));
				}
				bean.setUnit(unitName);
				bean.setKg(0.0);
				bean.setLtr(0.0);
				bean.setGrams(0.0);
				bean.setMili(Double.parseDouble(quantity));
				bean.setFreeQuantity(Double.parseDouble(freeQuantity));
			}
			
			System.out.println("IN HELPER== == =" + Gst);
			//System.out.println("IN HELPER== == =" + igst);
	//		bean.setUnit(unitName);
			bean.setKg(Double.parseDouble(quantity));
			bean.setGrams(Double.parseDouble(quantity));
			bean.setLtr(Double.parseDouble(quantity));
			bean.setMili(Double.parseDouble(quantity));
			bean.setQuantity(Double.parseDouble(quantity));
			bean.setUnit(unitName);
			bean.setFreeQuantity(Double.parseDouble(freeQuantity));	
			
			if (productPkId != null) {
				bean.setFkproductID(Long.parseLong(productPkId));
			} else {
				bean.setFkproductID(0l);
			}
			
			if (catId != null) {
				bean.setCatId(Long.parseLong(catId));
			} else {
				bean.setCatId(0l);
			}
			
			if (proName != null) {
				bean.setProductName(proName);
			} else {
				bean.setProductName("N/A");
			}
		
			if (DiscountperProd != null ) {
				bean.setDicountperProdPerc(Double.parseDouble(DiscountperProd));
			} else {
				bean.setDicountperProdPerc(0.0);
			}
			
			if (DiscountAmountperProd != null ) {
				bean.setDicountperProdAmount(Double.parseDouble(DiscountAmountperProd));
			} else {
				bean.setDicountperProdAmount(0.0);
			}

			if (mrp != null || mrp.equalsIgnoreCase("")) {
				bean.setMrp(Double.parseDouble(mrp));
			} else {
				bean.setMrp(0.0);
			}
			if (salePrice != null) {
				bean.setSalePrice(Double.parseDouble(salePrice));
			} else {
				bean.setSalePrice(0.0);
			}
			if (totalPerProductInGrid != null) {
				bean.setTotalInGrid(Double.parseDouble(totalPerProductInGrid));
			} else {
				bean.setTotalInGrid(0.0);
			}
			if (Gst != 0) {
				bean.setTaxPercentage((Gst));
			} else {
				bean.setTaxPercentage(0.0);
			}
			if (cgst != 0) {
				bean.setCgst((cgst));
			} else {
				bean.setCgst(0.0);
			}
			if (sgst != 0) {
				bean.setSgst((sgst));
			} else {
				bean.setSgst(0.0);
			}
			if (igst != "") {
				bean.setiGst(Double.parseDouble(igst));
			} else {
				bean.setiGst(0.0);
			}
			if (company != null) {
				bean.setCompany(company);
			} else {
				bean.setCompany("N/A");
			}
			if (weight != null) {
				bean.setWeight(Double.parseDouble(weight));
			} else {
				bean.setWeight(0.0);
			}

			if (hsn != null) {
				bean.setHsn(hsn);
			} else {
				bean.setHsn("N/A");
			}
			/*
			 * if (igst != null) { bean.setiGst(Double.parseDouble(igst)); } else {
			 * bean.setiGst(0.0); }
			 */

			Double CGST = Double.parseDouble(request.getParameter("cgst" + i));
			Double SGST = Double.parseDouble(request.getParameter("sgst" + i));
			Double GST = CGST + SGST;
			
			Double IGST = Double.parseDouble(igst);
			
			System.out.println("499 GST ==========> " + GST);
			System.out.println("500 IGST ==========> " + IGST);
			Double taxAmount = 0d;
			//Double taxAmount1 = 0d;
			Double priceWithoutTax = 0d;

			if (GST != 0) {
				System.out.println("In GST");
				Double taxPerc = (Gst);
				Double taxAmnt = Double.parseDouble(salePrice);
				taxAmount = (taxAmnt /(1+(taxPerc / 100)));
		        //taxAmount = (taxAmnt * (taxPerc / 100));
				System.out.println("tax" + taxAmount);
				Double newSale = Double.parseDouble(request.getParameter("salePrice" + i));
				priceWithoutTax = newSale - taxAmount;
				
				bean.setTaxAmount(priceWithoutTax);
				bean.setProductRateWithoutTax(taxAmount);
				
				System.out.println("2amnt" + priceWithoutTax);
			
//				if (unitName.equalsIgnoreCase("pcs")) {
					Double taxAmountperQtyKgLtr = ((taxPerc / 100) * taxAmnt);
					Double totalGstTaxPerProduct = (taxAmountperQtyKgLtr * Double.parseDouble(quantity));
					bean.setTotaGstTaxPerProduct(totalGstTaxPerProduct);
					if (IGST == 0) {
						bean.setTotaIgstTaxPerProduct(0.0);
					}
//				}

				// =============kg and ltr here==========
/*
				if (unitName.equalsIgnoreCase("kg") || unitName.equalsIgnoreCase("ltr") || unitName.equalsIgnoreCase("grams") || unitName.equalsIgnoreCase("millilitre")) {
					Double taxAmountperQtyKgLtr = ((taxPerc / 100) * Double.parseDouble(totalPerProductInGrid));
					bean.setTotaGstTaxPerProduct(taxAmountperQtyKgLtr);
					if (IGST == 0) {
						bean.setTotaIgstTaxPerProduct(0.0);
					}
				}*/
			}

			if (GST == 0 && IGST == 0) {
				Double newSale = Double.parseDouble(request.getParameter("salePrice" + i));
				bean.setProductRateWithoutTax(newSale);
				bean.setTaxAmount(0.0);
				bean.setTotaGstTaxPerProduct(0.0);
				bean.setTotaIgstTaxPerProduct(0.0);
				bean.setiGstTaxAmountPerUnit(0.0);
			}

			if (IGST != 0) {
				System.out.println("In IGST");
				Double taxPerc = Double.parseDouble(igst);
				Double taxAmnt = Double.parseDouble(salePrice);
				taxAmount = (taxAmnt /(1+(taxPerc / 100)));
				//taxAmount = (taxAmnt * (taxPerc / 100));
				//bean.setiGstTaxAmountPerUnit(taxAmount);
				System.out.println("tax" + taxAmount);
				Double newSale = Double.parseDouble(request.getParameter("salePrice" + i));
				priceWithoutTax = newSale - taxAmount;
				// Double taxAmount1=(priceWithoutTax*(taxPerc/100));
				// priceWithoutTax=newSale - taxAmount1 ;
				bean.setProductRateWithoutTax(taxAmount);
				// System.out.println("2tax"+taxAmount1);
				bean.setTaxAmount(priceWithoutTax);
				bean.setiGstTaxAmountPerUnit(priceWithoutTax);

//				if (unitName.equalsIgnoreCase("pcs")) {
					Double taxAmountperQtyKgLtr = ((taxPerc / 100) * taxAmnt);
					Double totalIgstTaxPerProduct = (taxAmountperQtyKgLtr * Double.parseDouble(quantity));
					bean.setTotaIgstTaxPerProduct(totalIgstTaxPerProduct);
					if (GST == 0) {
						bean.setTotaGstTaxPerProduct(0.0);
					}
//				}

				// =============kg and ltr here==========
/*
				if (unitName.equalsIgnoreCase("kg") || unitName.equalsIgnoreCase("ltr") || unitName.equalsIgnoreCase("grams") || unitName.equalsIgnoreCase("millilitre")) {
					Double taxAmountperQtyKgLtr = ((taxPerc / 100) * Double.parseDouble(totalPerProductInGrid));
					bean.setTotaIgstTaxPerProduct(taxAmountperQtyKgLtr);
					if (GST == 0) {
						bean.setTotaGstTaxPerProduct(0.0);
					}
				}*/

			}
			if (GST == 0 && IGST == 0) {
				Double newSale = Double.parseDouble(request.getParameter("salePrice" + i));
				bean.setProductRateWithoutTax(newSale);
				bean.setTaxAmount(0.0);
				bean.setTotaIgstTaxPerProduct(0.0);
				bean.setTotaGstTaxPerProduct(0.0);
				bean.setiGstTaxAmountPerUnit(0.0);
			}

			// payment mode
			paymentMode = request.getParameter("paymentMode");
			checkNum = request.getParameter("chequeNum");
			nameOnCheck = request.getParameter("nameOnCheck");
			cardNo = request.getParameter("cardNum");
			accNo = request.getParameter("accNum");
			bankName = request.getParameter("bankName");
			System.out.println("CREDIT CUST PAYMENT DETAILS ::::::::: "+paymentMode+" "+checkNum+" "+nameOnCheck+" "+cardNo+" "+accNo+" "+accNo+" "+bankName);
			if (customerHiddenName == null) {
				System.out.println("paymentMode is " + paymentMode);
				if (paymentMode == null) {
					bean.setPaymentMode("N/A");
				} else {
					bean.setPaymentMode(paymentMode);
				}

				if (paymentMode.equals("cheque")) {
					if (checkNum != null) {
						bean.setCheckNo(Long.parseLong(checkNum));
					} else {
						bean.setCheckNo(0l);
					}
					if (nameOnCheck != null) {
						bean.setNameOnCheck(nameOnCheck);
					} else {
						bean.setNameOnCheck("N/A");
					}

				}

				else if (paymentMode.equals("card")) {
					if (cardNo != null) {
						bean.setCardNo(Long.parseLong(cardNo));
					} else {
						bean.setCardNo(0l);
					}
				}

				else if (paymentMode.equals("neft")) {

					if (accNo != null) {
						bean.setAccNo(accNo);
					} else {
						bean.setAccNo("N/A");
					}
					if (bankName != null) {
						bean.setBankName(bankName);
					} else {
						bean.setBankName("N/A");
					}
				}
			}
			SimpleDateFormat dateFormat1 = new SimpleDateFormat("yyyy-MM-dd");
			dateobj = new Date();
			System.out.println(dateFormat1.format(dateobj));

			bean.setInsertDate(dateobj);
			dao.addFertilizerBillingInDAO(bean);
             
			// code for set billno and name in application context for BIll PDF
            String onlyShopName = "";
			HttpSession billNoSession = request.getSession(true);
			
			String shopName = (String)billNoSession.getAttribute("shopName");
			String ShopNameWithoutId = shopName.substring(4);
            onlyShopName = ShopNameWithoutId.trim();
			billNoSession.setAttribute("fertilizerBillNo", billNoForPdf);
			billNoSession.setAttribute("onlyShopName", onlyShopName);
			billNoSession.setAttribute("email", email);
			billNoSession.setAttribute("Address", village);
			billNoSession.setAttribute("Address1", village);
			System.out.println("---------Bill No for pdf in session::" + billNoForPdf + "----------------");
			System.out.println("---------shopName for pdf in session::" + onlyShopName + "----------------");
			System.out.println("---------email for pdf in session::" + email + "----------------");
			
		
				 /*****************************************************************************************
								update dupQuantity from good receive table
				*****************************************************************************************/
				
				
				System.out.println("================================ GOOD RECEIVE dupQuantity ============================= ");
				
				
				if(Long.parseLong(chaalanNo) > 0)
				{}
				else if(chaalanNo == null || chaalanNo.equals("0") || chaalanNo == "" || chaalanNo.equals(" ") || chaalanNo.isEmpty())
				{
				
				HibernateUtility hbu3 = null;
				Session session3 = null;
				Transaction transaction3 = null;
				
				try {
					Long PkGoodRecId;
					Double dupQuantity;
					Double newQuantity=0.0;
					
				
					hbu3 = HibernateUtility.getInstance();
					session3 = hbu3.getHibernateSession();
					transaction3 = session3.beginTransaction();
				
					Query query3 = session3.createSQLQuery("select dupQuantity, total_amount, pk_goods_receive_id from goods_receive where pk_goods_receive_id ='"+PkGoodreceiveId+"'");
				
					List<Object[]> list3 = query3.list();
				
					for (Object[] object : list3)
					{
						dupQuantity = Double.parseDouble(object[0].toString());
						PkGoodRecId = Long.parseLong(object[2].toString());
						Double quty = Double.parseDouble(quantity);
				
						GoodsReceiveBean goodRec = (GoodsReceiveBean)session3.load(GoodsReceiveBean.class, new Long(PkGoodRecId));
				
						newQuantity = dupQuantity - quty;
				
						goodRec.setDupQuantity(newQuantity);
												
						System.out.println("===================== UPDATING Good Rec dupQuantity ====================");
						session3.saveOrUpdate(goodRec);
						transaction3.commit();
						System.out.println("Success ");
					}
				
				}
				
				catch (RuntimeException e) 
				{
					try 
					{
						System.out.println("========IN CATCH TRY BLOCK OF STOCK UPDATE=========");
						transaction3.rollback();
						}
					catch (RuntimeException rbe) 
					{
						System.out.println("==========CATCH BLOCK OF STOCK UPDATE=========");
						Log.error("Couldn't roll back tranaction", rbe);
					}
				} finally {
				hbu3.closeSession(session3);
				}
	
			
			 /*****************************************************************************************
			  							stock minus from stock detail table
			 *****************************************************************************************/
			

			System.out.println("================================ STOCK MINUS ============================= ");
			
			HibernateUtility hbu1 = null;
			Session session1 = null;
			Transaction transaction1 = null;

			try {
				Long PkStockId;
				Double quantity1;
				Double packingWeight;
				Double existedTotalKgLtrPieceStock;

				hbu1 = HibernateUtility.getInstance();
				session1 = hbu1.getHibernateSession();
				transaction1 = session1.beginTransaction();

				Query query1 = session1.createSQLQuery("select PkStockId, avail_Quantity, weight, total_kg_ltr_piece_stock from stock_detail where ProductName='"	+ proName + "' AND CompanyName='" + company + "' AND FkCatId='" + catId + "' AND productId = '"+productPkId+"' AND weight = '"+weight+"' AND fk_shop_id = '"+shopid+"'");
				System.out.println("catId in stock=" + catId);
				System.out.println("sub_cat_id in stock=" + sub_cat_id);
				List<Object[]> list1 = query1.list();

				for (Object[] object : list1)
				{
					PkStockId = Long.parseLong(object[0].toString());
					quantity1 = Double.parseDouble(object[1].toString());
					packingWeight = Double.parseDouble(object[2].toString());
					existedTotalKgLtrPieceStock = Double.parseDouble(object[3].toString());

					Stock Stock = (Stock)session1.load(Stock.class, new Long(PkStockId));
					
//					if (unitName.equalsIgnoreCase("kg"))
//					{
//						Double newUpdatedQuantityUsingKg;
//						Double quty = Double.parseDouble(quantity);
						/*Double userInputkgInGrams = kgLtrForCal * 1000;
						Double userInputtotalGrams = userInputkgInGrams + gramsMiliForCal;
						Double userInputTotalKg = userInputtotalGrams/1000;*/
//						Double updateTotalKg = quantity1 - quty;
//						newUpdatedQuantityUsingKg = updateTotalKg / packingWeight;				
//						Stock.setQuantity(updateTotalKg);
//						Stock.setTotalKgLtrPieceQuantity(updateTotalKg);					
//					}
	//				if (unitName.equalsIgnoreCase("ltr"))
	//				{
	//					Double quty = Double.parseDouble(quantity);
	//					Double newUpdatedQuantityUsingLtr;
					/*	Double userInputkgInLtr = kgLtrForCal * 1000;
						Double userInputtotalMili = userInputkgInLtr + gramsMiliForCal;
						Double userInputTotalLtr = userInputtotalMili/1000;*/	
						
	//					Double updateTotalLtr = quantity1 - quty;						
	//					newUpdatedQuantityUsingLtr = updateTotalLtr / packingWeight;				
	//					Stock.setQuantity(updateTotalLtr);
	//					Stock.setTotalKgLtrPieceQuantity(updateTotalLtr);					

	//				}
					
		//			if (unitName.equalsIgnoreCase("millilitre"))
		//			{
		//				Double quty = Double.parseDouble(quantity);
		//				Double newUpdatedQuantityUsingLtr;
					/*	Double userInputkgInLtr = kgLtrForCal * 1000;
						Double userInputtotalMili = userInputkgInLtr + gramsMiliForCal;
						Double userInputTotalLtr = userInputtotalMili/1000;*/	
						
		//				Double updateTotalLtr = quantity1 - quty;						
		//				newUpdatedQuantityUsingLtr = updateTotalLtr / packingWeight;				
		//				Stock.setQuantity(updateTotalLtr);
		//				Stock.setTotalKgLtrPieceQuantity(updateTotalLtr);					

		//			}
	/*				
					if (unitName.equalsIgnoreCase("pcs"))
					{
						double totalQty = 0.0;
						Double quty = Double.parseDouble(quantity);
						if(quantity != null || quantity != "")
						{
							totalQty = Double.parseDouble(freeQuantity) + Double.parseDouble(quantity);							
							
							Double updateTotalQuantity = quantity1 - quty;
							System.out.println("New Updated Quantity  ======  " + updateTotalQuantity);
							Stock.setTotalKgLtrPieceQuantity(updateTotalQuantity);
							Double updateQuantity = updateTotalQuantity / packingWeight;
							Stock.setQuantity(updateTotalQuantity);
						}						
					}
					if (unitName.equalsIgnoreCase("grams"))
					{
						double totalQty = 0.0;
						Double quty = Double.parseDouble(quantity);
						if(quantity != null || quantity != "")
						{
							totalQty = Double.parseDouble(freeQuantity) + Double.parseDouble(quantity);							
							
							Double updateTotalQuantity = quantity1 - quty;
							System.out.println("New Updated Quantity  ======  " + updateTotalQuantity);
							Stock.setTotalKgLtrPieceQuantity(updateTotalQuantity);
							Double updateQuantity = updateTotalQuantity / packingWeight;
							Stock.setQuantity(updateTotalQuantity);
						}						
					}
*/
					Double newUpdatedQuantityUsingKg;
					Double quty = Double.parseDouble(quantity);
					/*Double userInputkgInGrams = kgLtrForCal * 1000;
					Double userInputtotalGrams = userInputkgInGrams + gramsMiliForCal;
					Double userInputTotalKg = userInputtotalGrams/1000;*/
					Double updateTotalKg = quantity1 - quty;
					newUpdatedQuantityUsingKg = updateTotalKg / packingWeight;				
					Stock.setQuantity(updateTotalKg);
					Stock.setTotalKgLtrPieceQuantity(updateTotalKg);					
					
					System.out.println("===================== UPDATING STOCK ====================");
					session1.saveOrUpdate(Stock);
					transaction1.commit();
					System.out.println("Success ");
				}

			}

			catch (RuntimeException e) {
				try {
					System.out.println("========IN CATCH TRY BLOCK OF STOCK UPDATE=========");
					transaction1.rollback();
				} catch (RuntimeException rbe) {
					System.out.println("==========CATCH BLOCK OF STOCK UPDATE=========");
					Log.error("Couldn't roll back tranaction", rbe);
				}
			} finally {
				hbu1.closeSession(session1);
		}

			
			/*****************************************************************************************
			===========START=============== perStockEntry minus from GOOD RECEIVE table
*****************************************************************************************/

System.out.println("tempExpiryDate 000000000000000000000000000000000 "+tempExpiryDate);

if(tempExpiryDate.equalsIgnoreCase("N/A") || tempExpiryDate == null || tempExpiryDate.equalsIgnoreCase("undefined") || tempExpiryDate.equalsIgnoreCase(""))
{}
else
{
	System.out.println("================================ perStockEntry MINUS ============================= ");
	HibernateUtility hbu2 = null;
	Session session2 = null;
	Transaction transaction2 = null;
	
	try
	{
		 System.out.println("============ perStockEntry MINUS IN TRY BLOCK ==============");
		 
		 hbu2 = HibernateUtility.getInstance();
		 session2 = hbu2.getHibernateSession();
		 transaction2 = session2.beginTransaction();
		 
		 List<Object[]> list2 = null;
				
			 DateFormat df = new SimpleDateFormat("dd-MM-yyyy");
			 Date tempExpiryDateToDate = new Date();
			 tempExpiryDateToDate = df.parse(tempExpiryDate);
			 DateFormat df1 = new SimpleDateFormat("yyyy-MM-dd");
			 String expiryDate  = df1.format(tempExpiryDateToDate);
			 
			 System.out.println("proName == "+proName);
			 System.out.println("company == "+company);
			 System.out.println("catId == "+catId);
			 System.out.println("expiryDate == "+expiryDate);
			 
			//PERSTOCKENTRY
			Query query2 = session2.createSQLQuery("select pk_goods_receive_id, stockPerEntry from goods_receive where product_name='"+proName+"' AND company_Name='"+company+"' AND fkCategoryId='"+catId+"' AND expiry_date = '"+expiryDate+"'");
			System.out.println("catId in stock=" + catId);
			System.out.println("sub_cat_id in stock=" + sub_cat_id);
			list2 = query2.list();
		
		Long pk_goods_receive_id;
		Double existedTotalstockPerEntry;
	
		for (Object[] object : list2)
		{
			pk_goods_receive_id = Long.parseLong(object[0].toString());
			existedTotalstockPerEntry = Double.parseDouble(object[1].toString());
			
			System.out.println("produt ID == "+pk_goods_receive_id);
			System.out.println("existedTotalstockPerEntry == "+existedTotalstockPerEntry);
			
			GoodsReceiveBean GoodsReceiveBean = (GoodsReceiveBean)session2.load(GoodsReceiveBean.class, new Long(pk_goods_receive_id));
		
			double totalQty = Double.parseDouble(freeQuantity) + Double.parseDouble(quantity);
			
			Double updatenewStockPerEntry = existedTotalstockPerEntry - totalQty;		
			GoodsReceiveBean.setStockPerEntry(updatenewStockPerEntry);
			
			System.out.println("before update of good receive ====");
			System.out.println("===================== UPDATING perStockEntry ====================");
			session2.saveOrUpdate(GoodsReceiveBean);
			transaction2.commit();
			System.out.println("Success ");
		}
	
	}
	
	catch (RuntimeException e)
	{
		try
		{
			System.out.println("========IN CATCH BLOCK OF perStockEntry UPDATE========= line no = 779");
			transaction2.rollback();
		}
		catch (RuntimeException rbe)
		{
			System.out.println("==========CATCH BLOCK OF perStockEntry UPDATE========= line no = 784");
			Log.error("Couldn't roll back tranaction", rbe);
		}
	}
	finally
	{
		hbu2.closeSession(session2);
	}
}

		}		/*
			 * System.out.
			 * println("================================ CreditCustomerPaymentUpdate ============================= "
			 * ); HibernateUtility hbu2=null; Session session2=null; Transaction
			 * transaction2 = null;
			 * 
			 * if(customerName == null || customerName.equals("N/A")) { try{
			 * 
			 * hbu2 = HibernateUtility.getInstance(); session2 =
			 * hbu2.getHibernateSession(); transaction2 =
			 * session1.beginTransaction();
			 * 
			 * CustomerPaymentBean cpb = new CustomerPaymentBean();
			 * cpb.setPaidAmount(0.0); cpb.setBillNo(customerBill); System.out.
			 * println("BIILING BILL NO SET FOR CREDITCUSTOMER PAYMENT ###################### "
			 * +cpb.getBillNo()); System.out.
			 * println("Normal Customer Name from Billing ==================> "
			 * +customerName);
			 * 
			 * session2.save(cpb); transaction2.commit();
			 * System.out.println("Success "); } catch(RuntimeException e) { try
			 * { transaction2.rollback(); } catch(RuntimeException rbe) {
			 * Log.error("Couldn't roll back tranaction",rbe); } }finally{
			 * hbu2.closeSession(session2); } }
			 */
		}

		/*****************************
		 * ====START==== FIRST PAYMENT WHILE BILLING FOR CREDIT CUST AND NORMAL
		 * CUST
		 ********************/
		
	try
	{
		if (customerType.equals("NORMALCUSTOMER"))
		{
			System.out.println(customerType + "   ================");
			System.out.println("In HELPER for normal customer first payment");

			NormalCustomerPaymentBean nCPBean = new NormalCustomerPaymentBean();
			if (customerBill == null) {
				nCPBean.setBillNo(1l);
			}
			else
			{
				nCPBean.setBillNo(customerBill);
			}

			System.out.println("CREDIT CUSTOMER FIRST PAYMENT -=-=--=-==-=-==-=- BILL NUMBER ::::::::: " + nCPBean.getBillNo());
			nCPBean.setTotalAmount(Double.parseDouble(grossTotal));
			nCPBean.setBalance(0.0);
			nCPBean.setPaymentType("credit");
			nCPBean.setCredit(Double.parseDouble(grossTotal));

			if (customerHiddenName == null) {
				System.out.println("paymentMode is " + paymentMode);
				if (paymentMode == null) {
					nCPBean.setPaymentMode("N/A");
				} else {
					nCPBean.setPaymentMode(paymentMode);
				}

				if (paymentMode.equals("cheque")) {
					if (checkNum != null) {
						nCPBean.setChequeNum(checkNum);
					} else {
						nCPBean.setChequeNum("0");
					}
					if (nameOnCheck != null) {
						nCPBean.setNameOnCheck(nameOnCheck);
					} else {
						nCPBean.setNameOnCheck("N/A");
					}

				}

				else if (paymentMode.equals("card")) {
					if (cardNo != null) {
						nCPBean.setCardNum(Long.parseLong(cardNo));
					} else {
						nCPBean.setCardNum(0l);
					}
				}

				else if (paymentMode.equals("neft")) {

					if (accNo != null) {
						nCPBean.setAccNum(Long.parseLong(accNo.toString()));
					} else {
						nCPBean.setAccNum(0l);
					}
					if (bankName != null) {
						nCPBean.setBankName(bankName);
					} else {
						nCPBean.setBankName("N/A");
					}

				}

				nCPBean.setPersonname(customerName);
				nCPBean.setInsertDate(dateobj);
				nCPBean.setBillDate(sqlDate);
				nCPBean.setShopId(Long.parseLong(fk_shop_id));

				dao.normalCustomerFirstpaymentDAO(nCPBean);
			}
		}
		else if (customerType.equals("CREDITCUSTOMER"))
		{
			System.out.println(customerType + "   ================");
			System.out.println("In HELPER for normal customer first payment");

			CustomerPaymentBean cPBean = new CustomerPaymentBean();
			if (customerBill == null) {
				cPBean.setBillNo(1l);
			}
			else
			{
				cPBean.setBillNo(customerBill);
			}
			

			System.out.println("CREDIT CUSTOMER FIRST PAYMENT -=-=--=-==-=-==-=- BILL NUMBER ::::::::: " + cPBean.getBillNo());
			cPBean.setTotalAmount(Double.parseDouble(grossTotal));
			cPBean.setBalance(Double.parseDouble(grossTotal) - Double.parseDouble(firstPaidAmtCreditCustomer));
			cPBean.setPaymentType("credit");
			cPBean.setCustomer(Long.parseLong(fkCustomerId));
			cPBean.setCredit(Double.parseDouble(firstPaidAmtCreditCustomer));
			cPBean.setShopId(Long.parseLong(fk_shop_id));

			if(firstPaidAmtCreditCustomer == "" || Double.parseDouble(firstPaidAmtCreditCustomer) == 0.0)
			{
				cPBean.setPaymentMode("selected");
			}
			else if (customerHiddenName != null)
			{
				System.out.println("paymentMode is *******************>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> " + paymentMode);
				if (paymentMode == null)
				{
					cPBean.setPaymentMode("N/A");
				}
				
				if (paymentMode.equals("cash1"))
				{
					cPBean.setPaymentMode("cash");
				}
				
				if (paymentMode.equals("cheque1"))
				{
					cPBean.setPaymentMode("cheque");
					
					if (checkNum != null) {
						cPBean.setChequeNum(checkNum);

						System.out.println("CHEQUE NUMBER --------------- "+cPBean.getChequeNum());
					}
					else
					{
						cPBean.setChequeNum("0");
					}
					
					if (nameOnCheck != null) {
						cPBean.setNameOnCheck(nameOnCheck);
						System.out.println("CHEQUE Nmae --------------- "+cPBean.getNameOnCheck());
					}
					else
					{
						cPBean.setNameOnCheck("N/A");
					}
				}
				else if (paymentMode.equals("card1"))
				{
					cPBean.setPaymentMode("card");
					
					if (cardNo != null) {
						cPBean.setCardNum(Long.parseLong(cardNo));
						System.out.println("card number --------------- "+cPBean.getCardNum());
					} else {
						cPBean.setCardNum(0l);
					}
				}

				else if (paymentMode.equals("neft1"))
				{
					cPBean.setPaymentMode("neft");

					if (accNo != null) {
						cPBean.setAccNum(Long.parseLong(accNo.toString()));
						System.out.println("ACCOUNT number --------------- "+cPBean.getAccNum());
					} else {
						cPBean.setAccNum(0l);
					}
					if (bankName != null) {
						cPBean.setBankName(bankName);
						System.out.println("BANK NAME --------------- "+cPBean.getBankName());
					} else {
						cPBean.setBankName("N/A");
					}
				}
			}			
			cPBean.setInsertDate(dateobj);
			dao.creditCustomerFirstpaymentDAO(cPBean);
		}
	}
	catch (RuntimeException e)
	{
		try
		{
			System.out.println("========IN CATCH BLOCK OF perStockEntry UPDATE========= line no = 1004");
		}
		catch (RuntimeException rbe)
		{
			System.out.println("==========CATCH BLOCK OF perStockEntry UPDATE========= line no = 1008");
			Log.error("Couldn't roll back tranaction", rbe);
		}
	}
  }
	
	
	//bill return
	
	public void billReturnAsPerBillNo(HttpServletRequest request, HttpServletResponse response) throws ParseException {

		// TODO Auto-generated method stub


		String billno = request.getParameter("billno");
		
		HttpSession session1 = request.getSession(true);
		String onlyShopName1="";
		String username = (String) session1.getAttribute("user");
		String userid = (String) session1.getAttribute("userid");
		String shopid = (String) session1.getAttribute("shopid");
		String shopName = (String) session1.getAttribute("shopName");
		
		String ShopNameWithoutId1 = shopName.substring(4);
		onlyShopName1 = ShopNameWithoutId1.trim();
		
		productTransferDao dao11 = new productTransferDao();
        List stkList1  = dao11.getAllbilling1(shopid,billno);
		System.out.println(" stkList1 size  - " +stkList1.size());
        for(int i=0;i<stkList1.size();i++){
        	
        	com.Fertilizer.hibernate.FertilizerBillBean st = (com.Fertilizer.hibernate.FertilizerBillBean)stkList1.get(i);
        	
        	String billtype = st.getBillType();
        	String cust = st.getCust_type();
        	Double gross = st.getGrossTotal();
        	Date sale = st.getSaleDate();
System.out.println("bil ytpe - "+billtype+" cust - "+cust+" gross -  "+gross+" sale =  "+sale);
			billcancelbean bb = new billcancelbean();
			SimpleDateFormat dateFormat1 = new SimpleDateFormat("yyyy-MM-dd");
			Date dateobj = new Date();
			System.out.println(dateFormat1.format(dateobj)+" dateobj - "+dateobj);
				bb.setInsertDate(dateobj);
				bb.setGrossTotal(gross);
				bb.setBillType(billtype);
				bb.setCust_type(cust);
				bb.setSaleDate(sale);
				bb.setFk_shop_id(Long.parseLong(shopid));
				bb.setUserid(Long.parseLong(userid));
				bb.setShopName(onlyShopName1);
				bb.setUsername(username);
				bb.setBillNo(Long.parseLong(billno));
			
			FertilizerBillDao dd = new FertilizerBillDao();
			dd.addBillingcancelInDAO(bb);
        }
        
		productTransferDao dao1 = new productTransferDao();
        List stkList2  = dao1.getAllbilling(shopid,billno);
		

        
        for(int j=0;j<stkList2.size();j++){
        //	System.out.println("hi this is 2");
        	
        	com.Fertilizer.hibernate.FertilizerBillBean st = (com.Fertilizer.hibernate.FertilizerBillBean)stkList2.get(j);
        
        	Long proid = st.getFkproductID();
        	Long catid = st.getCatId();
        	String unit = st.getUnit();
        	Double wt = st.getWeight();
        	String product = st.getProductName();
        	Double quan = st.getQuantity();
        	
        	System.out.println(" fertilizer bill data -  catid -  "+catid+" , unit -  "+unit+" , proid - "+proid+" , product -  "+product+"  , weight - "+wt+" quan -  "+quan);
        	
        	//get stock
    		productTransferDao dao10 = new productTransferDao();
            List stkList3  = dao10.getAllStock10(shopid);
        	
        	
            for(int k=0;k<stkList3.size();k++){
                //	System.out.println("hi this is 2");
                	
                	com.Fertilizer.hibernate.Stock sd = (com.Fertilizer.hibernate.Stock)stkList3.get(k);
                	Long catid1 = sd.getCatID();
                   	String unit1 = st.getUnit();
                	Long subcatid1 = sd.getSubCatId();
                	Long proid1 = sd.getProductId();
                	String proname = sd.getProductName();
                 	Double wt1 = st.getWeight();
                 	
         System.out.println(" Stock table data -  catid -  "+catid1+" , subcatid -  "+subcatid1+" , proid - "+proid1+" , product -  "+proname+"  , weight - "+wt1+" unit - "+unit);           
                	
                	if(catid.equals(catid1) && unit.equals(unit1) && proid.equals(proid1)  && product.equals(proname) && wt.equals(wt1)){
               		 Double qunty = sd.getQuantity();
               		 Long pkid = sd.getPkStockId();
               		 
              System.out.println("in if condititon -   quantity -   "+qunty+" pkid - "+pkid); 		 
               		 
               		 Double updatequnty = (double) (qunty + quan);
               		 System.out.println("for loop stock update Quantity----------   -  "+updatequnty+"  qunty from stock =   "+qunty+"  plus quanty from fertilizer - "+quan);
               				 
         
               		 
               		 HibernateUtility hbu = HibernateUtility.getInstance();
               		 Session session = hbu.getHibernateSession();
               		 Transaction transaction = session.beginTransaction();
               		 
               		 Stock updateStock = (Stock) session.get(Stock.class, new Long(pkid));
               		 
              		 updateStock.setQuantity(updatequnty);
               		 updateStock.setTotalKgLtrPieceQuantity(updatequnty);

               		 
               		session.saveOrUpdate(updateStock);
               		System.out.println(" ````````````` ````````````` stock updated !!");
               		transaction.commit();
               		break;
               	}
                 	
                	
            }           
        }
        
        
		SaleReturnDao dao = new SaleReturnDao();
         dao.deletebill(shopid,billno);
        


	}
	
	public void cancelchallan(HttpServletRequest request, HttpServletResponse response) throws ParseException {

		// TODO Auto-generated method stub


		String billno = request.getParameter("billno");
		
		HttpSession session1 = request.getSession(true);
		String onlyShopName1="";
		String username = (String) session1.getAttribute("user");
		String userid = (String) session1.getAttribute("userid");
		String shopid = (String) session1.getAttribute("shopid");
		String shopName = (String) session1.getAttribute("shopName");
		
		String ShopNameWithoutId1 = shopName.substring(4);
		onlyShopName1 = ShopNameWithoutId1.trim();
		
		SaleReturnDao dao = new SaleReturnDao();
        dao.deletechallan(shopid,billno);
        
	}
}











