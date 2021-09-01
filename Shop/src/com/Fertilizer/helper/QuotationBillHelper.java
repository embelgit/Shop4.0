package com.Fertilizer.helper;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.http.client.methods.HttpOptions;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.jfree.util.Log;

import com.Fertilizer.bean.CustomerBillBean;
import com.Fertilizer.bean.QuotationBillBean;
import com.Fertilizer.dao.FertilizerBillDao;
import com.Fertilizer.dao.QuotationBillDAO;
import com.Fertilizer.hibernate.CustomerPaymentBean;
import com.Fertilizer.hibernate.FertilizerBillBean;
import com.Fertilizer.hibernate.GoodsReceiveBean;
import com.Fertilizer.hibernate.NormalCustomerPaymentBean;
import com.Fertilizer.hibernate.QuotationBillBeanH;
import com.Fertilizer.hibernate.Stock;
import com.Fertilizer.utility.HibernateUtility;

public class QuotationBillHelper
{	
	Long customerBill;
	Long quotationNoForPdf;
	
	public void registerQuotationBill(HttpServletRequest request, HttpServletResponse response)throws Exception
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

		QuotationBillDAO dao = new QuotationBillDAO();

		List bill = dao.getQuotationLastNo();

		for (int i = 0; i < bill.size(); i++)
		{
			QuotationBillBean sa = (QuotationBillBean) bill.get(i);
			customerBill = sa.getBillNo();
			//System.out.println(customerBill);

			customerBill++;
			//System.out.println(customerBill);
		}
		Integer count = Integer.parseInt(request.getParameter("count"));
		System.out.println(count);

		QuotationBillBeanH bean = new QuotationBillBeanH();

		for (int i = 0; i < count; i++) {

			if (customerBill == null) {
				bean.setQuotation_no(1l);
				quotationNoForPdf = 1l;
			} else {
				bean.setQuotation_no(customerBill);
				quotationNoForPdf = customerBill;
			}

			// Out Of Grid Content
			customerName = request.getParameter("customerName");
			String village = request.getParameter("village");
			String contactNum = request.getParameter("contactNo");
			String saleDate = request.getParameter("saleDate");
			String gstNo = request.getParameter("gstNo");
			String hamaliExpense = request.getParameter("hamaliExpense");
			String hamaliExpenseWithourGST = request.getParameter("hamaliExpenseWithourGST");
			String total = request.getParameter("total");
						
			grossTotal = request.getParameter("grossTotal");
			fkCustomerId = request.getParameter("fkCreditCustomerID");
			customerHiddenName = request.getParameter("creditCustomerHiddenName");
			fk_shop_id = request.getParameter("fk_shop_id");
			
			String discount = request.getParameter("discount");
			String discountAmount = request.getParameter("discountAmount");
			String email = request.getParameter("email");
			System.out.println("email -  - "+email);
			
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
			
			if (creditCustomerName != null) {
				bean.setCustomerHiddenName(creditCustomerName);
			} else {
				bean.setCustomerHiddenName("N/A");
			}

			if (gstNo != null) {
				bean.setGstNo(gstNo);
			} else {
				bean.setGstNo("N/A");
			}

			bean.setEmail(email);
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

			// Grid Content
			String catId = request.getParameter("cat_id" + i);
			String barcodeNo = request.getParameter("barcodeNo" + i);
			String sub_cat_id = request.getParameter("sub_cat_id" + i);
			String hsn = request.getParameter("hsn" + i);
			String proName = request.getParameter("itemName" + i);
			String quantity = request.getParameter("quantity" + i);
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
		
			//bean.setBarcode(Long.parseLong(barcodeNo));
			
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
			
			System.out.println("quantity ===> "+quantity);
			
			Double userEnteredQuantity = Double.parseDouble(quantity);
			
			bean.setUnit(unitName);
			bean.setKg(0.0);
			bean.setLtr(0.0);
			bean.setGrams(0.0);
			bean.setMili(0.0);
			bean.setFreeQuantity(Double.parseDouble(quantity));
			bean.setQuantity(Long.parseLong(quantity));
			
		/*	if(unitName.equalsIgnoreCase("kg"))
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
					bean.setQuantity(0l);
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
					bean.setQuantity(0l);
					bean.setUnit(unitName);
					bean.setFreeQuantity(0.0);	
				}
			}*/

		/*	if (unitName.equalsIgnoreCase("ltr"))
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
					bean.setQuantity(0l);
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
					bean.setQuantity(0l);
					bean.setUnit(unitName);
					bean.setFreeQuantity(0.0);	
				}
			}*/
			
		/*	if (unitName.equalsIgnoreCase("pcs"))
			{
				
				System.out.println("UNIT NAME ENTERED ::::::: ===========> "+unitName);
				
				if (quantity == null || quantity == "")
				{
					bean.setQuantity(0l);
				} else {
					bean.setQuantity(Long.parseLong(quantity));
				}
				bean.setUnit(unitName);
				bean.setKg(0.0);
				bean.setLtr(0.0);
				bean.setGrams(0.0);
				bean.setMili(0.0);
				bean.setFreeQuantity(Double.parseDouble(freeQuantity));
			}*/
		/*	if (unitName.equalsIgnoreCase("grams"))
			{
				
				System.out.println("UNIT NAME ENTERED ::::::: ===========> "+unitName);
				
				if (quantity == null || quantity == "")
				{
					bean.setQuantity(0l);
				} else {
					bean.setQuantity(Long.parseLong(quantity));
				}
				bean.setUnit(unitName);
				bean.setKg(0.0);
				bean.setLtr(0.0);
				bean.setGrams(0.0);
				bean.setMili(0.0);
				bean.setFreeQuantity(Double.parseDouble(freeQuantity));
			}*/
			
			System.out.println("IN HELPER== == =" + Gst);
			//System.out.println("IN HELPER== == =" + igst);

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
			
				if (unitName.equalsIgnoreCase("pcs")) {
					Double taxAmountperQtyKgLtr = ((taxPerc / 100) * taxAmnt);
					Double totalGstTaxPerProduct = (taxAmountperQtyKgLtr * Double.parseDouble(quantity));
					bean.setTotaGstTaxPerProduct(totalGstTaxPerProduct);
					if (IGST == 0) {
						bean.setTotaIgstTaxPerProduct(0.0);
					}
				}

				// =============kg and ltr here==========

				if (unitName.equalsIgnoreCase("kg") || unitName.equalsIgnoreCase("ltr") || unitName.equalsIgnoreCase("grams")) {
					Double taxAmountperQtyKgLtr = ((taxPerc / 100) * Double.parseDouble(totalPerProductInGrid));
					bean.setTotaGstTaxPerProduct(taxAmountperQtyKgLtr);
					if (IGST == 0) {
						bean.setTotaIgstTaxPerProduct(0.0);
					}
				}
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

				if (unitName.equalsIgnoreCase("pcs")) {
					Double taxAmountperQtyKgLtr = ((taxPerc / 100) * taxAmnt);
					Double totalIgstTaxPerProduct = (taxAmountperQtyKgLtr * Double.parseDouble(quantity));
					bean.setTotaIgstTaxPerProduct(totalIgstTaxPerProduct);
					if (GST == 0) {
						bean.setTotaGstTaxPerProduct(0.0);
					}
				}

				// =============kg and ltr here==========

				if (unitName.equalsIgnoreCase("kg") || unitName.equalsIgnoreCase("ltr") || unitName.equalsIgnoreCase("grams")) {
					Double taxAmountperQtyKgLtr = ((taxPerc / 100) * Double.parseDouble(totalPerProductInGrid));
					bean.setTotaIgstTaxPerProduct(taxAmountperQtyKgLtr);
					if (GST == 0) {
						bean.setTotaGstTaxPerProduct(0.0);
					}
				}

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
			dao.addQuotationBillInDAO(bean);
             
			// code for set billno and name in application context for BIll PDF
            String onlyShopName = "";
			HttpSession billNoSession = request.getSession(true);
			
			String shopName = (String)billNoSession.getAttribute("shopName");
			String ShopNameWithoutId = shopName.substring(4);
            onlyShopName = ShopNameWithoutId.trim();
			billNoSession.setAttribute("quotationNoForPdf", quotationNoForPdf);
			billNoSession.setAttribute("onlyShopName", onlyShopName);

			System.out.println("---------Bill No for pdf in session::" + quotationNoForPdf + "----------------");
			System.out.println("---------shopName for pdf in session::" + onlyShopName + "----------------");		
		}		
	}
}
