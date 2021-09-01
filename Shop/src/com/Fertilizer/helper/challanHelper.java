package com.Fertilizer.helper;

import java.math.BigInteger;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
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

import com.Fertilizer.bean.ChallanBean;
import com.Fertilizer.bean.CustomerBillBean;
import com.Fertilizer.bean.GetCreditCustomerDetails;
import com.Fertilizer.bean.challanBillBean;
import com.Fertilizer.dao.CustomerDetailsDao;
import com.Fertilizer.dao.EditGoodsReceiveDao;
import com.Fertilizer.dao.FertilizerBillDao;
import com.Fertilizer.dao.challanDao;
import com.Fertilizer.hibernate.CustomerPaymentBean;
import com.Fertilizer.hibernate.EditGoodsReceiveBean;
import com.Fertilizer.hibernate.FertilizerBillBean;
import com.Fertilizer.hibernate.GoodsReceiveBean;
import com.Fertilizer.hibernate.NormalCustomerPaymentBean;
import com.Fertilizer.hibernate.Stock;
import com.Fertilizer.hibernate.challanBeanH;
import com.Fertilizer.utility.HibernateUtility;

public class challanHelper
{	
	Long customerBill;

	public void challanBilling(HttpServletRequest request, HttpServletResponse response)throws Exception
	{
		System.out.println("*********************************************** CHALLAN HELPER *************************************************************");
		
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

	//FertilizerBillDao dao = new FertilizerBillDao();
		challanDao dao = new challanDao();

		List bill = dao.getChallanBill();

		for (int i = 0; i < bill.size(); i++) {
			challanBillBean sa = (challanBillBean) bill.get(i);
			customerBill = sa.getBillNo();
			//System.out.println(customerBill);

			customerBill++;
			//System.out.println(customerBill);
		}
		Integer count = Integer.parseInt(request.getParameter("count"));
		System.out.println(count);

		challanBeanH bean = new challanBeanH();

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
			String hamaliExpense = request.getParameter("hamaliExpense");
			String hamaliExpenseWithourGST = request.getParameter("hamaliExpenseWithourGST");
			String totalAll = request.getParameter("totalAll");
			String challanNo = request.getParameter("challanNo");
			String gstForExpense1 = request.getParameter("gstForExpense1");
			String hamaliExpence1 = request.getParameter("hamaliExpence1");
			String email = request.getParameter("email");			
			
			grossTotal = request.getParameter("grossTotal");
			fkCustomerId = request.getParameter("fkCreditCustomerID");
			customerHiddenName = request.getParameter("creditCustomerHiddenName");
			fk_shop_id = request.getParameter("fk_shop_id");
			
			String discount = request.getParameter("discount");
			String discountAmount = request.getParameter("discountAmount");
			
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
			
			if (challanNo != null) {
				bean.setChallanNo(Long.parseLong(challanNo));
			} else {
				bean.setChallanNo(0l);
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
			if (contactNum != "") {
				bean.setContact(Long.parseLong(contactNum));
			} else {
				bean.setContact(0l);
			}
			System.out.println("email -  "+email);
			bean.setEmail(email);
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
			if (gstForExpense1 != "") {
				bean.setGstExpensePerc(Double.parseDouble(gstForExpense1));
			} else {
				bean.setGstExpensePerc(0.0);
			}
			if (hamaliExpence1 != "") {
				bean.setHamaliExpenseTaxAmt(Double.parseDouble(hamaliExpence1));
			} else {
				bean.setHamaliExpenseTaxAmt(0.0);
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
			if (totalAll != "") {
				bean.setTotal(Double.parseDouble(totalAll));
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
			String productPkId = request.getParameter("productPkId" + i);
			String unitPkId = request.getParameter("unitPkId" + i);
			String taxPkId = request.getParameter("taxPkId" + i);			
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
			String noOfboxes = request.getParameter("noOfboxes"+i);	
			String TotalEx = request.getParameter("TotalEx"+i);	
		
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
			
			bean.setUnit(unitName);
			bean.setKg(0.0);
			bean.setLtr(0.0);
			bean.setGrams(0.0);
			bean.setMili(0.0);
			bean.setFreeQuantity(Double.parseDouble(quantity));
			bean.setQuantity(Long.parseLong(quantity));
			
			Double userEnteredQuantity = Double.parseDouble(quantity);
			
			
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
			
			if(TotalEx != "") {
				bean.setTotalExclTax(Double.parseDouble(TotalEx));
			} else {
				bean.setTotalExclTax(0d);
			}

			if (catId != null) {
				bean.setCatId(Long.parseLong(catId));
			} else {
				bean.setCatId(0l);
			}
			
			if(noOfboxes != null) {
				bean.setNoOfboxes(Double.parseDouble(noOfboxes));
			} else {
				bean.setNoOfboxes(0d);
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
			
			bean.setFk_product_Pk_Id(Long.parseLong(productPkId));
			bean.setFk_subCat_id(Long.parseLong(sub_cat_id));
			bean.setFk_unit_Pk_Id(Long.parseLong(unitPkId));
			bean.setFk_tax_Id(Long.parseLong(taxPkId));
			
			/*
			 * String challanNo = request.getParameter("challanNo");
			 * bean.setChallanNo(Long.parseLong(challanNo));
			 */
			
			dao.addChallanBillingInDAO(bean);
			System.out.println("**************************************** //challan helper *********************************************");
             
			// code for set billno and name in application context for BIll PDF
            String onlyShopName = "";
			HttpSession billNoSession = request.getSession(true);
			
			String shopName = (String)billNoSession.getAttribute("shopName");
			String ShopNameWithoutId = shopName.substring(4);
            onlyShopName = ShopNameWithoutId.trim();
			billNoSession.setAttribute("fertilizerBillNo", billNoForPdf);
			billNoSession.setAttribute("onlyShopName", onlyShopName);

			System.out.println("---------Bill No for pdf in session::" + billNoForPdf + "----------------");
			System.out.println("---------shopName for pdf in session::" + onlyShopName + "----------------");
			
			
		
				 /*****************************************************************************************
								update dupQuantity from good receive table
				*****************************************************************************************/
				
				
				System.out.println("================================ GOOD RECEIVE dupQuantity ============================= ");
				
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

				Query query1 = session1.createSQLQuery("select PkStockId, avail_Quantity, weight, total_kg_ltr_piece_stock from stock_detail where ProductName='"	+ proName + "' AND CompanyName='" + company + "' AND FkCatId='" + catId + "'");
				System.out.println("catId in stock=" + catId);
				System.out.println("sub_cat_id in stock=" + sub_cat_id);
				List<Object[]> list1 = query1.list();

				for (Object[] object : list1)
				{
					PkStockId = Long.parseLong(object[0].toString());
					quantity1 = Double.parseDouble(object[1].toString());
					System.out.println("stock quantity-----> "+quantity1);
					
					packingWeight = Double.parseDouble(object[2].toString());
					existedTotalKgLtrPieceStock = Double.parseDouble(object[3].toString());

					Stock Stock = (Stock)session1.load(Stock.class, new Long(PkStockId));
					
					if (unitName.equalsIgnoreCase("kg"))
					{
						Double newUpdatedQuantityUsingKg;
						Double quty = Double.parseDouble(quantity);
						/*Double userInputkgInGrams = kgLtrForCal * 1000;
						Double userInputtotalGrams = userInputkgInGrams + gramsMiliForCal;
						Double userInputTotalKg = userInputtotalGrams/1000;*/
						Double updateTotalKg = quantity1 - quty;
						System.out.println("after minus quantity-----> "+updateTotalKg);
						newUpdatedQuantityUsingKg = updateTotalKg / packingWeight;				
						Stock.setQuantity(updateTotalKg);
						Stock.setTotalKgLtrPieceQuantity(updateTotalKg);					
					}
					if (unitName.equalsIgnoreCase("ltr"))
					{
						Double quty = Double.parseDouble(quantity);
						Double newUpdatedQuantityUsingLtr;
					/*	Double userInputkgInLtr = kgLtrForCal * 1000;
						Double userInputtotalMili = userInputkgInLtr + gramsMiliForCal;
						Double userInputTotalLtr = userInputtotalMili/1000;*/	
						
						Double updateTotalLtr = quantity1 - quty;						
						newUpdatedQuantityUsingLtr = updateTotalLtr / packingWeight;				
						Stock.setQuantity(updateTotalLtr);
						Stock.setTotalKgLtrPieceQuantity(updateTotalLtr);					

					}
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

			/*
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

				//dao.normalCustomerFirstpaymentDAO(nCPBean);
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
			//dao.creditCustomerFirstpaymentDAO(cPBean);
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
	
	
	
public Map getChallanNoByCustomerHelper(String creditCustomerId)
{		
		challanDao dao = new challanDao();
		challanBillBean bean = new challanBillBean();
		List list = dao.getChallanNoByCustomerDao(creditCustomerId);
		List list2 = null;
		Map  map =  new HashMap();
		Long cNo = (long) 0;
		int listS = list.size(); 
		System.out.println("CHALLAN LIST "+ listS);
		if(listS > 0)
		{			
			for(int i=0;i<list.size();i++)
			{
				Object[] o = (Object[])list.get(i);
				cNo = Long.parseLong(o[2].toString());

				bean.setChallanNo(cNo);
			}
		}
		else if(listS == 0)
		{
			list2 = dao.getChallanNoByCustomerWhenNullDao();
			if(list2.size() > 0)
			{
				for(int i=0;i<list2.size();i++)
				{
					Object[] o2 = (Object[])list2.get(i);
					cNo = (Long.parseLong(o2[2].toString()) + 1);
					bean.setChallanNo(cNo);
				}
			}
			else
			{		
				bean.setChallanNo(cNo + 1);
			}
		}
		else if(list2 == null)
		{
			bean.setChallanNo(cNo + 1);
		}
		
		
		System.out.println("cNo ===> "+cNo);
		map.put(bean.getChallanNo(),bean);
		
		return map;
	}
	
public Map getChallanBillDetailsForEditCreditBillingNonGrid(String challanNo) {
	
	
	challanDao dao=new challanDao();
	List list1 = dao.EditChallanBillDetailsNonGrid(challanNo);
	
	System.out.println(list1.size());

	Map map1 = new HashMap();

	if( list1 != null && list1.size() > 0)
	{
		for (int i = 0; i < list1.size(); i++) {
			Object[] o = (Object[]) list1.get(i);
			
			ChallanBean bean = new ChallanBean();

			bean.setExpenseTaxPerc(Double.parseDouble(o[0].toString()));
			bean.setTotalAmount(Double.parseDouble(o[1].toString()));
			bean.setDiscPercentage(Double.parseDouble(o[2].toString()));
			bean.setDiscAmount(Double.parseDouble(o[3].toString()));
			Double hamaliExpenseExclTax = Double.parseDouble(o[4].toString()) - Double.parseDouble(o[5].toString());
			bean.setHamaliExpenseInclTax(hamaliExpenseExclTax);
			bean.setHamaliExpenseTaxAmt(Double.parseDouble(o[5].toString()));
			bean.setGrossTotal(Double.parseDouble(o[6].toString()));
			//bean.setTransExpenseTaxAmt(Double.parseDouble(o[7].toString()));
			
			
			map1.put(bean.getGrossTotal(), bean);
		}
	}
	return map1;
}
	
}
