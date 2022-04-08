package com.Fertilizer.helper;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.InputStreamReader;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
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

import com.Fertilizer.bean.Barcode_PDF;
import com.Fertilizer.bean.BillBean;
import com.Fertilizer.bean.CustomerBean;
import com.Fertilizer.bean.GetPODetailsForDcUpdate;
import com.Fertilizer.bean.GetPODetailsForGoodsReceive;
import com.Fertilizer.bean.GetProductDetails;
import com.Fertilizer.bean.GetPurchaseProduct;
import com.Fertilizer.bean.GetSupplierDetails;
import com.Fertilizer.bean.ProfitAndLoss;
import com.Fertilizer.bean.PurchaseDetailsFromGoodsReceive;
import com.Fertilizer.bean.PurchaseStockMinus;
import com.Fertilizer.bean.SaleReports;
import com.Fertilizer.bean.StockDetail;

import com.Fertilizer.dao.AdvanceBookinhDao;
import com.Fertilizer.dao.CustomerDetailsDao;
import com.Fertilizer.dao.GoodsReceiveDao;
import com.Fertilizer.dao.ProductDetailsDao;
import com.Fertilizer.dao.StockDao;
import com.Fertilizer.dao.SupplierDetailsDao;
import com.Fertilizer.hibernate.FertilizerBillBean;
import com.Fertilizer.hibernate.GoodsReceiveBean;
import com.Fertilizer.hibernate.PackingHibernate;
import com.Fertilizer.hibernate.ProductDetailsBean;
import com.Fertilizer.hibernate.Stock;
import com.Fertilizer.hibernate.SubCategoryDetailsBean;
import com.Fertilizer.hibernate.productTransferHibernate;
import com.Fertilizer.hibernate.purchaseReturnBean;
import com.Fertilizer.utility.HibernateUtility;
import com.itextpdf.text.log.SysoLogger;

public class GoodsReceiveHelper
{		
	Long barcodeNo;
	String catName;
	String productName;
	String companyName;
	Long PkStockId;
	Double interGST;
	Double taxPercentage;
	
	public void goodsReceived(HttpServletRequest request,
			HttpServletResponse response) throws ParseException {
		
		String extraExpenseGSTperc = request.getParameter("extraExpenseGSTperc");
		String totalTransportExpense = request.getParameter("totalTransportExpense");
		String totalhamaliExpence = request.getParameter("totalhamaliExpence");
		
		
		if(extraExpenseGSTperc == null || extraExpenseGSTperc.equals("") || extraExpenseGSTperc.isEmpty())
		{
			extraExpenseGSTperc = "0";
		}
		if(totalTransportExpense == null || totalTransportExpense.equals("") || totalTransportExpense.isEmpty())
		{
			totalTransportExpense = "0.0";
		}
		if(totalhamaliExpence == null || totalhamaliExpence.equals("") || totalhamaliExpence.isEmpty())
		{
			totalhamaliExpence = "0.0";
		}
		
		
		System.out.println("IN HELPER");
		GoodsReceiveDao dao = new GoodsReceiveDao();
		
		Integer count = Integer.parseInt(request.getParameter("count"));
		System.out.println(count);
		
		GoodsReceiveBean bean = new GoodsReceiveBean();
		
	for(int i =0 ; i<count;i++)
	{
		HttpSession session3 = request.getSession();
		GoodsReceiveDao data = new GoodsReceiveDao();
		List stkList  = data.getLastBarcodeNo();
		
		for(int j=0;j<stkList.size();j++)
		{			
			BillBean st = (BillBean)stkList.get(j);
			barcodeNo = st.getBarcodeNo();
			barcodeNo++;
		}
		
			String catIDforVAt = request.getParameter("catIDforVAt"+i);
			
			String supplier  = request.getParameter("supplier");
			String fk_cat_id  = request.getParameter("fk_cat_id");
			String fk_subCat_id  = request.getParameter("subCatId"+i);
			String fk_shop_id  = request.getParameter("fk_shop_id");
			catName = request.getParameter("catName");
			String unitName = request.getParameter("unitName"+i);
			String transExpence  = request.getParameter("transExpence");
			String total = request.getParameter("total");
			String purchaseDate = request.getParameter("purchaseDate");
			String transExpenceTaxAmt = request.getParameter("transExpenceTaxAmt");
			String hamaliExpenceTaxAmt = request.getParameter("hamaliExpenceTaxAmt");
			String gstno = request.getParameter("gstno");				
			String productID = request.getParameter("productID"+i);
			System.out.println(" --------------------------------------------  productID -  "+productID);
			String barcode_id = request.getParameter("barcode_id"+i);
			System.out.println("` `````````````` ```    barcode_id - -   "+barcode_id);
			
			String mrp = request.getParameter("mrp"+i);
			String cgst = request.getParameter("cgst"+i);
			String sgst = request.getParameter("sgst"+i);
			String igst = request.getParameter("igst1"+i);
			String expiryDate = request.getParameter("expiryDate"+i);
			String Total = request.getParameter("Total"+i);
			String bookingId = request.getParameter("advancebookingId"+i);
			String Discount = request.getParameter("Discount"+i);                        // Discount % per Product
			String DiscountAmount = request.getParameter("DiscountAmount"+i);            // Discount Amt per Product
			String TotalExTaxPerProduct = request.getParameter("TotalExTax"+i);          // Total Excl Tax per Product
			String buyPriceEx = request.getParameter("buyPriceEx"+i); 
						
			Double csgst = Double.parseDouble(cgst) + Double.parseDouble(sgst);
			String gst = Double.toString(csgst);
			
			if(gstno == null || gstno.equalsIgnoreCase("") || gstno.isEmpty())
			{
				bean.setGstno("N/A");
				
			}else {
				bean.setGstno(gstno);
			}
			if(transExpenceTaxAmt == null || transExpenceTaxAmt.equalsIgnoreCase("") || transExpenceTaxAmt.isEmpty())
			{
				bean.setTransExpenceTaxAmt(0.0);
				
			}else {
				bean.setTransExpenceTaxAmt(Double.parseDouble(transExpenceTaxAmt));
			}
			if(hamaliExpenceTaxAmt == null || hamaliExpenceTaxAmt.equalsIgnoreCase("") || hamaliExpenceTaxAmt.isEmpty())
			{
				bean.setHamaliExpenceTaxAmt(0.0);			
			}else {
				bean.setHamaliExpenceTaxAmt(Double.parseDouble(hamaliExpenceTaxAmt));
			}
			if(buyPriceEx == null || buyPriceEx.equalsIgnoreCase("") || buyPriceEx.isEmpty())
			{
				bean.setBuyPriceEx(0.0);	
			}else {
				bean.setBuyPriceEx(Double.parseDouble(buyPriceEx));
			}
			if(TotalExTaxPerProduct == null || TotalExTaxPerProduct.equalsIgnoreCase("") || TotalExTaxPerProduct.isEmpty())
			{
				bean.setTotalExclTaxperProduct(0.0);		
			}else {
				bean.setTotalExclTaxperProduct(Double.parseDouble(TotalExTaxPerProduct));
			}
			if(Discount == null || Discount.equalsIgnoreCase("") || Discount.isEmpty())
			{
				Discount = "0.0";			
			}else {
				bean.setDiscPercPerProduct(Double.parseDouble(Discount));
			}
			if(DiscountAmount == null || DiscountAmount.equalsIgnoreCase("") || DiscountAmount.isEmpty())
			{
				bean.setDiscAmtPerProduct(0.0);	
			}else {
				bean.setDiscAmtPerProduct(Double.parseDouble(DiscountAmount));
			}
			if(igst == null || igst.equalsIgnoreCase("") || igst.isEmpty())
			{
				igst = "0.0";			
			}else {
				bean.setiGstPercentage(Double.parseDouble(igst));
			}
			if(igst == null || igst.equalsIgnoreCase("") || igst.isEmpty())
			{
				igst = "0.0";			
			}else {
				bean.setiGstPercentage(Double.parseDouble(igst));
			}
			if(gst == null || gst.equalsIgnoreCase("") || gst.isEmpty())
			{
				gst = "0.0";
			}else {
				bean.setTaxPercentage(Double.parseDouble(gst));
			}
			if(cgst == null || cgst.equalsIgnoreCase("") || cgst.isEmpty())
			{
				cgst = "0.0";			
			}else {
				bean.setCgst(Double.parseDouble(cgst));
			}
			if(sgst == null || sgst.equalsIgnoreCase("") || sgst.isEmpty())
			{
				sgst = "0.0";			
			}else {
				bean.setSgst(Double.parseDouble(sgst));
			}
			if(bookingId == null || bookingId.equalsIgnoreCase("") || bookingId.isEmpty())
			{
				bookingId = "0.0";			
			}else {
				bean.setBookingID(Long.parseLong(bookingId));
			}
			String unit = request.getParameter("unitName"+i);
						
			String unitvalue = request.getParameter("unitvalue"+i);
			String unitdesc = request.getParameter("unitdesc"+i);			
			
			System.out.println(" ````` ``````` `````  unitvalue -   "+unitvalue+"  unitdesc -  "+unitdesc);
			
			bean.setBarcode_id(barcode_id);
			System.out.println("`````````````  `````````  barcode_id set"+bean.getBarcode_id());
			
		if (productID == null) {	
			break;
		}
		else {
			bean.setPkPOId(Long.parseLong(productID));
		}
		
		companyName = request.getParameter("companyName"+i);
		if(companyName==null){
			break;
		}
		else{
			bean.setCompanyName(companyName);
		}
		
		productName = request.getParameter("productName"+i);
		if(productName==null){
			break;
		}
		else{
			bean.setProductName(productName);
		}
		
		String buyPrice = request.getParameter("buyPrice"+i);
		if(buyPrice==null){
			break;
		}
		else{
			bean.setBuyPrice(Double.parseDouble(buyPrice));
		}
		
		String salePrice = request.getParameter("salePrice"+i);		
		if(salePrice == null || salePrice == "" || salePrice.isEmpty()){
			salePrice = "0";
		}
		else{
			bean.setSalePrice(Double.parseDouble(salePrice));
		}
				
		String weight = request.getParameter("weight"+i);
		String quantity1= request.getParameter("quantity"+i);
		
		if(weight==null){
			break;
		}
		else{
			bean.setWeight(Double.parseDouble(weight));
		}
		
		Double qty = Double.valueOf(weight) * Double.valueOf(quantity1);
//		Double qty = Double.valueOf(quantity1);
		String quantity = String.valueOf(qty);
			
		if(quantity==""){
			break;
		}
		else{
			
//			bean.setQuantity(Double.parseDouble(quantity));
//			bean.setDupQuantity(Double.parseDouble(quantity));
			bean.setQuantity(Double.parseDouble(quantity1));
			bean.setDupQuantity(Double.parseDouble(quantity1));
	
		}
		
			/*
			 * String weightAftShortMinus = request.getParameter("weightAftShortMinus"+i);
			 * if(weightAftShortMinus==null){ bean.setWeightAftShortMinus(0.0); } else{
			 * bean.setWeightAftShortMinus(Double.parseDouble(weightAftShortMinus)); }
			 */
			
		String batchNo = request.getParameter("batchNo"+i);
		if( batchNo == null || batchNo.isEmpty() || batchNo.equalsIgnoreCase(""))
		{
			bean.setBatchNo("N/A");
		}
		else
		{
			bean.setBatchNo(batchNo);
		}
		
		if(expiryDate == null || expiryDate.equalsIgnoreCase("") || expiryDate.isEmpty())
		{
			/*if(weightAftShortMinus != null || weightAftShortMinus.isEmpty() || weightAftShortMinus.equalsIgnoreCase(""))
			{*/
				bean.setStockPerEntry(1.0);
			//}
		}
		else
		{
				/*
				 * if(weightAftShortMinus != null || weightAftShortMinus.isEmpty() ||
				 * weightAftShortMinus.equalsIgnoreCase("")) {
				 */
		//		bean.setStockPerEntry(Double.parseDouble(quantity)*Double.parseDouble(weight));
				bean.setStockPerEntry(Double.parseDouble(quantity));
				//}
		}
				
		String discount = request.getParameter("discount");
		if(discount == "" || discount.isEmpty() || discount == null)
		{
			discount = "0";
		}
		
		String discountAmount = request.getParameter("discountAmount");
		if(discountAmount == "" || discountAmount.isEmpty() || discountAmount == null)
		{
			discountAmount = "0";
		}
		
		String billNum = request.getParameter("billNum");		
		
		Date date = new Date();
		bean.setInsertDate(date);		
		
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		Date newDate = null;
		try {
				newDate = format.parse(purchaseDate);
			} 
		catch (ParseException e1) {
			e1.printStackTrace();
		}
		bean.setPurchaseDate(newDate);
		
		if(expiryDate == null || expiryDate.equalsIgnoreCase("") || expiryDate.isEmpty())
		{
			bean.setExpiryDate(null);
		}
		else
			{
				/*
				 * Date newExpiryDate = null; System.out.println(expiryDate); try { String
				 * expiryDate1 = expiryDate; System.out.println(expiryDate1); DateFormat df =
				 * new SimpleDateFormat("dd/MM/yyyy");
				 * 
				 * newExpiryDate = df.parse(expiryDate1); DateFormat df1 = new
				 * SimpleDateFormat("yyyy/MM/dd");
				 * System.out.println(df1.format(newExpiryDate)); Date checkDate =
				 * newExpiryDate; System.out.
				 * println("STRING CONVERTED TO DATE ==============!@@!#!$@#!@!!$@@$!#@$@@# "
				 * +checkDate); } catch (ParseException e1) { // TODO Auto-generated catch block
				 * e1.printStackTrace(); } bean.setExpiryDate(newExpiryDate);
				 */
			
				SimpleDateFormat format1 = new SimpleDateFormat("yyyy-MM-dd");
				Date expiryDate1= null;
				
				try {
					expiryDate1 = format1.parse(expiryDate);
					bean.setExpiryDate(expiryDate1);
				}
				catch (ParseException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
			}		
		
		if(mrp == null){
			bean.setMrp(0.0);
		}else{
			bean.setMrp(Double.parseDouble(mrp));
		}
		
			/*
			 * Double tax = Double.parseDouble(gst); if(tax == null || tax == 0.0) {
			 * bean.setTaxPercentage(0.0); } else { bean.setTaxPercentage(tax); }
			 */
		
			/*
			 * Double igstx=Double.parseDouble(igst); if(igstx == null || igstx == 0.0){
			 * bean.setiGstPercentage(0.0); } else{ bean.setiGstPercentage(igstx); }
			 */
		
		
		String gross = request.getParameter("grossTotal");
		if(gross != null){
			bean.setGrossTotal(Double.parseDouble(gross));
			bean.setBillPaymentPending(Double.parseDouble(total) - Double.parseDouble(discountAmount));
		}
		else{
			bean.setGrossTotal(0.0);
			bean.setBillPaymentPending(0.0);
		}
		

		/*SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		//String pDate = request.getParameter("pDate");
		Date purchaseDateq = null;
		try {
			purchaseDateq = dateFormat.parse(purchaseDate);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		bean.setPurchaseDate(purchaseDateq);
		*/
		session3.setAttribute("barcodeNo", barcodeNo);
		
		if(barcodeNo == null){
			bean.setBarcodeNo(1000l);
			}
			else
			{
				bean.setBarcodeNo(barcodeNo);	
			}
		//String pDate = request.getParameter("pDate");
		/*Date dueDateq = null;
		try {
			dueDateq = dateFormat.parse(dueDate);
		} catch (ParseException e) {
			// TODO Auto-generated catch bloc
			e.printStackTrace();
		}*/
		int quant = qty.intValue();
		
		try{
			for (int x = 0; x < quant; x++ ){
			FileInputStream fstream = new FileInputStream("D:/barcose/input.prn");

			BufferedReader br = new BufferedReader(new InputStreamReader(fstream));
			FileWriter fw = new FileWriter("D:/barcose/Output.prn");

			BufferedWriter bw = new BufferedWriter(fw);
			String strLine;
			String str1;
			while ((strLine = br.readLine()) != null) {

				if (strLine.equals("~product")) 
				{
					str1 = br.readLine();
					strLine = str1 +"\"" +productName+ "\"";
				}
				else if(strLine.equals("~company"))
		         {
					str1=br.readLine();
		            strLine = str1 +"\"" +companyName+ "\"";
		               
		         }
				else if(strLine.equals("~quanti"))
		         {
					str1=br.readLine();
		            strLine = str1 +"\"" +quantity+ "\"";
		               
		         }
				else if(strLine.equals("~bar"))
		         {
					str1=br.readLine();
		            strLine = str1 + "\"" +barcodeNo+ "\"";
		         }
				
				bw.write(strLine + "\r\n");
			}

			bw.close();
			// Close the input stream
			br.close();
			/*List cmdAndArgs = Arrays.asList("cmd", "D:", "cd barcose",
					"printbatch.bat");*/
			//System.out.println("hello Shreeemant::");
			//File dir = new File("D:/barcose");
			
		/*	List cmdAndArgs = Arrays.asList("cmd", "/d", "printbatch.bat");
	        File dir = new File("D:/barcose");*/
	        
	        List cmdAndArgs = Arrays.asList("cmd", "/c", "printbatch.bat");
			File dir = new File("C:/barcose");


			ProcessBuilder pb = new ProcessBuilder(cmdAndArgs);
			pb.directory(dir);
			Process p = pb.start();
			}
		}catch(Exception e){
			
		}
		
//--------------------------------------------------------------------------------------------------------------		
	String aaa = bean.getBarcode_id();
	System.out.println("````` ````````````````````` ```````````````` barcode id is - - -  "+aaa);
		if(aaa.equals("0000")) 
		{
			System.out.println("````` ````````````````````` ````````````````if barcode id not entered - - -  "+aaa);
		String data6 = String.valueOf(salePrice);
		String xyz = "";
		String adc = "";
		String[] Shreemant = data6.split("");
		for (int a = 0; a < Shreemant.length; a++) {
			System.out.println("shreemant :: " + Shreemant[a]);
			String abc = Shreemant[a];
			if (abc.equals("1")) {
				adc = "N";
				
			}
			if (abc.equals("2")) {
				adc = "A";
			}
			if (abc.equals("3")) {
				adc = "G";
			}
			if (abc.equals("4")) {
				adc = "P";
			}
			if (abc.equals("5")) {
				adc = "U";
			}
			if (abc.equals("6")) {
				adc = "R";
			}
			if (abc.equals("7")) {
				adc = "C";
			}
			if (abc.equals("8")) {
				adc = "I";
			}
			if (abc.equals("9")) {
				adc = "T";
			}
			if (abc.equals("0")) {
				adc = "Y";
			}
			xyz = xyz.concat(adc);
			System.out.println("` ` `` ` ` ` `````````````````````````````````````````````xyz  :: " + xyz);
		}

		try {
			FileInputStream fstream = new FileInputStream("C:/barcose/input.prn");

			BufferedReader br = new BufferedReader(new InputStreamReader(fstream));
			FileWriter fw = new FileWriter("C:/barcose/Output.txt");

			BufferedWriter bw = new BufferedWriter(fw);
			String strLine;
			String str1;
			while ((strLine = br.readLine()) != null)
			{
				if (strLine.equals("@shopName")) {
					str1 = br.readLine();
					strLine = str1 + "\"Embel Shop\"";
				}
				else if (strLine.equals("@product"))
				{
					str1 = br.readLine();
					strLine = str1 + "\"" + productName + "\"";
				}
				else if (strLine.equals("@quanti"))
				{
					str1 = br.readLine();
					strLine = str1 + "\"" + quantity + "\"";
				}
				else if (strLine.equals("@catName"))
				{
					str1 = br.readLine();
					strLine = str1 + "\""  + "\"";
				}
				else if (strLine.equals("@subCatName"))
				{
					str1 = br.readLine();
					strLine = str1 + "\"" + "\"";
				}					
				else if (strLine.equals("@barv"))
				{
					str1 = br.readLine();
					//strLine = str1 + "\"" + "!105" + barcodeNo + "\"";
					strLine = str1 + "\"" + "!105" + barcodeNo + "\"";
				}
				else if (strLine.equals("@bar"))
				{
					str1 = br.readLine();
					strLine = str1 + "\"" + barcodeNo + "\"";
				}
				else if (strLine.equals("@company"))
				{
					str1 = br.readLine();
					strLine = str1 + "\"" + companyName + "\"";
				}
				else if (strLine.equals("@total"))
				{
					str1 = br.readLine();
					strLine = str1 + "\"" + xyz + "\"";
				}
				else if (strLine.equals("@quantityForNumberOfPrint"))
				{
					str1 = br.readLine();
					strLine = str1 + quantity;
				}
					/*
					 * else if (strLine.equals("@size")) { str1 = br.readLine(); strLine = str1 +
					 * "\"" + size + "\""; }
					 */
				else if (strLine.equals("@company"))
				{
					str1 = br.readLine();
					strLine = str1 + "\"" + companyName + "\"";
				}					
				else if (strLine.equals("@saleprice"))
				{
					str1 = br.readLine();
					strLine = str1 + "\"" +""+salePrice + "\"";
				}
				
				System.out.println("xyz is " + xyz);
//				System.out.println("catName is " + subCatName);
				System.out.println("Barcode is ++++++++++" + barcodeNo);
				System.out.println("itemName is *********" + productName);
				System.out.println("Sale Price is //////" + salePrice);
//				System.out.println("size is " + size);

				System.out.println("` ` ` ` ` `` ` ` ````    strLine -  -  - -  - -  -   "+strLine);
				bw.write(strLine + "\r\n");
				}

			bw.close();
			// Close the input stream
			br.close();
		
			List cmdAndArgs = Arrays.asList("cmd", "/c", "printbatch.bat");
			File dir = new File("C:/barcose");

			ProcessBuilder pb = new ProcessBuilder(cmdAndArgs);
			pb.directory(dir);
			Process p = pb.start();
		} catch (Exception e) {

		}
		}
//===================================================================	
		
		if(billNum == null){
			bean.setBillNum("N/A");
		}
		else{
			bean.setBillNum(billNum);
		}
		session3.setAttribute("billNum", billNum);
		
		if(discount == ""){
			bean.setDiscount(0.0);
		}
		else{
			bean.setDiscount(Double.parseDouble(discount));
		}
		
		if(discountAmount == ""){
			bean.setDiscountAmount(0.0);
		}
		else{
			bean.setDiscountAmount(Double.parseDouble(discountAmount));
		}
		
		/*if(transExpence == ""){
			bean.setExpenses(0.0);
		}
		else{
			bean.setExpenses(Double.parseDouble(transExpence));
		}*/
		bean.setSupplier(Long.parseLong(supplier));
		bean.setTotalAmount(Double.parseDouble(total) - Double.parseDouble(discountAmount));
		//bean.setFkCategoryId(Long.parseLong(fk_cat_id));
		//System.out.println(fk_cat_id);
		bean.setFk_subCat_id(Long.parseLong(fk_subCat_id));
		bean.setFk_shop_id(Long.parseLong(fk_shop_id));
		/*bean.setFkGodownId(Long.parseLong(fk_godown_id));*/
		Long newIdForUpdate = Long.parseLong(productID);
		
		Double bp = bean.getBuyPrice();
		Double qnt = bean.getQuantity();
		Double tota = bp*qnt;
		
		Double gstPerc = Double.parseDouble(gst);
		Double igstPerc = Double.parseDouble(igst);
		
		if(gstPerc == 0.0 && igstPerc == 0.0)
		{
			System.out.println("========================GST=0 & IGST=0 TAX AMNOUNT CALCULATION======================");
			bean.setTaxAmount(0.0);
			System.out.println("========================GST=0 & IGST=0 TAX AMNOUNT CALCULATION======================");
		}
		
		if(gstPerc != 0.0)
		{
			System.out.println("========================GST TAX AMNOUNT CALCULATION======================");
			Double gsttaxAmnt=((gstPerc/100)*(tota));
			bean.setTaxAmount(gsttaxAmnt);
			System.out.println("gst per @@@@@@@ "+gstPerc);
			System.out.println("gst amount @@@@@@@ "+gsttaxAmnt);
			//bean.setTotalIgstAmount(0.0);
			
			tota = tota-gsttaxAmnt;
			System.out.println("========================GST TAX AMNOUNT CALCULATION======================");
		}
		else if(igstPerc != 0.0)
		{
			System.out.println("========================I-GST TAX AMNOUNT CALCULATION======================");
			Double igsttaxAmnt=((igstPerc/100)*(tota));
			bean.setTaxAmount(igsttaxAmnt);
			//bean.setTaxAmount(0.0);
			System.out.println("gst per @@@@@@@ "+igstPerc);
			System.out.println("gst amount @@@@@@@ "+igsttaxAmnt);
			tota = tota-igsttaxAmnt;
			System.out.println("========================I-GST TAX AMNOUNT CALCULATION======================");
		}
				
		bean.setPerProductTotal(Double.parseDouble(Total));
		
		bean.setUnit(unit);
		
		if(totalTransportExpense != null || totalTransportExpense.equals(""))
		{
			bean.setTransExpenseIncTax(Double.parseDouble(totalTransportExpense));
			System.out.println(bean.getTransExpenseIncTax()+" **************** ");
		}
		else
		{
			bean.setTransExpenseIncTax(0.0);
		}
		
		if(totalhamaliExpence != null || totalhamaliExpence.equals(""))
		{
			bean.setHamaliExpenseIncTax(Double.parseDouble(totalhamaliExpence));
			System.out.println(bean.getHamaliExpenseIncTax()+" **************** ");
		}
		else
		{
			bean.setHamaliExpenseIncTax(0.0);
		}
		
		if(extraExpenseGSTperc != null || extraExpenseGSTperc.equals(""))
		{
			bean.setExpenseTaxPerc(Integer.parseInt(extraExpenseGSTperc));
			System.out.println(bean.getExpenseTaxPerc()+" **************** ");
		}
		else
		{
			bean.setExpenseTaxPerc(0);
		}
		
		bean.setExpenses(Double.parseDouble(totalTransportExpense) + Double.parseDouble(totalhamaliExpence));
		bean.setFkCategoryId(Long.parseLong(catIDforVAt));
		//bean.setReturnAmount(0d);
		//bean.setTotalAfterReturn(0d);
		
		dao.updateProductStatus(newIdForUpdate);
		
        String onlyShopName = "";
		
		HttpSession session1 = request.getSession(true);
		
		String username = (String) session1.getAttribute("user");
		String userid = (String) session1.getAttribute("userid");
		//String shopid = (String) session1.getAttribute("shopid");
		String shopName = (String) session1.getAttribute("shopName");
		
		String ShopNameWithoutId1 = shopName.substring(4);
		onlyShopName = ShopNameWithoutId1.trim();
		
		bean.setFkuserid(Long.parseLong(userid));
		bean.setUserName(username);
		bean.setShopName(onlyShopName);
		System.out.println("===============================  shopName  "+shopName+" ,  onlyShopName  "+onlyShopName);
		dao.addGoodsReceive(bean);
		
		AdvanceBookinhDao abd = new AdvanceBookinhDao();
		abd.updatePurchaseBillNoInAdBooking(billNum, bookingId);
		
		Long bl = bean.getBarcodeNo();

		String bb = String.valueOf(bl);
		String sss = "Bill no. "+billNum+" & Product - "+productName;

		Double qq = Double.parseDouble(quantity);
		Long qa = Math.round(qq);
		String qss = String.valueOf(qa);
		int qw = Integer.parseInt(qss);
		System.out.println("``````````````` ``````` qq  - "+qq+" qa - "+qa+"  qss - "+qss+"  qw -  "+qw);
		System.out.println("concat sss -  -   "+sss);
		System.out.println("barocde no long is - - -   "+bl+"  in string -  "+bb+" quant -  "+qq);
		
		com.Fertilizer.bean.Barcode_PDF pf = new Barcode_PDF();
		pf.createPDF(sss,bb,qw);
		
		
		HttpSession billNoSession = request.getSession(true);
		billNoSession.setAttribute("fertilizerBillNo", billNum);
		billNoSession.setAttribute("gstno", gstno);
		/*****************************************************STOCK ENTRY WHENEVER GOOD RECEIVED*********************************************/
		
		StockDao dao1 = new StockDao();
        List stkList2  = dao1.getAllStockEntry();
        
        Double unitvalue1 = Double.parseDouble(unitvalue);       
    //    Double qu = Double.parseDouble(quantity1);
        Double qu = (qty);
		Double quan =   (qu) * (unitvalue1);      
        /*If Stock Is Empty */ 
        if(stkList2.size() == 0)
        {
        	System.out.println("1ST IF().....\nWhen Stock Details List ======= 0"+stkList2.size());
        	
        	Stock newEntry = new Stock();
			
        	newEntry.setCatID(Long.parseLong(catIDforVAt));
			//newEntry.setCatID(Long.parseLong(fk_cat_id));
			newEntry.setSubCatId(Long.parseLong(fk_subCat_id));
			newEntry.setFk_shop_id(Long.parseLong(fk_shop_id));
			
			newEntry.setFkuserid(Long.parseLong(userid));
			newEntry.setShopName(onlyShopName);
			newEntry.setUserName(username);
			//System.out.println(fk_shop_id);
			newEntry.setPack_type("unpacked");
			newEntry.setProductName(productName);
			newEntry.setCompanyName(companyName);
			newEntry.setWeight(Double.parseDouble(weight));
//			newEntry.setQuantity(Double.parseDouble(quantity));
			

			newEntry.setQuantity((quan));
			newEntry.setUnit(unitdesc);			
			//Double weightForConversionStock = Double.parseDouble(weight);
			Double quantityForConversionStock = (quan);
			
			newEntry.setTotalKgLtrPieceQuantity(quantityForConversionStock);
//			newEntry.setUnit(unit);

			
        	newEntry.setProductId(Long.parseLong(productID));
			
/*			if(unitName.equalsIgnoreCase("pcs"))
			{
				//Double totalPieceQuantity = weightForConversionStock*quantityForConversionStock;
				newEntry.setTotalKgLtrPieceQuantity(quantityForConversionStock);
				newEntry.setUnit(unit);
	        	newEntry.setProductId(Long.parseLong(productID));
			}
			
			if(unitName.equalsIgnoreCase("kg"))
			{	
				//Double newstockInKg = weightForConversionStock*quantityForConversionStock;
				newEntry.setTotalKgLtrPieceQuantity(quantityForConversionStock);
				newEntry.setUnit(unit);
	        	newEntry.setProductId(Long.parseLong(productID));
			}
			
			if(unitName.equalsIgnoreCase("ltr"))
			{
				//Double newstockInLtr = weightForConversionStock*quantityForConversionStock;
				newEntry.setTotalKgLtrPieceQuantity(quantityForConversionStock);
				newEntry.setUnit(unit);
	        	newEntry.setProductId(Long.parseLong(productID));
			}
			
			if(unitName.equalsIgnoreCase("grams"))
			{
				//Double newstockInGm = weightForConversionStock*quantityForConversionStock;
				newEntry.setTotalKgLtrPieceQuantity(quantityForConversionStock);
				newEntry.setUnit(unit);
	        	newEntry.setProductId(Long.parseLong(productID));
			}
			if(unitName.equalsIgnoreCase("millilitre"))
			{
				//Double newstockInGm = weightForConversionStock*quantityForConversionStock;
				newEntry.setTotalKgLtrPieceQuantity(quantityForConversionStock);
				newEntry.setUnit(unit);
	        	newEntry.setProductId(Long.parseLong(productID));
			}
	*/
			/*if(batchNo != null){
			newEntry.setBatchNum(batchNo);
			}else{
				newEntry.setBatchNum("N/A");
			}*/
			
			StockDao dao2 = new StockDao();
			dao2.registerStock(newEntry);	
        	
        }
        
        /*To Update Stock Table If It is Not Empty */
        
        else
        {
        	//System.out.println("if stock details table is NOT EMPTY ======= >Stock List = "+stkList2.size());
		    	   for(int j=0;j<stkList2.size();j++)
		    	   {
		             	System.out.println("1ST IF's ELSE().....\nwhen Stockdetails is GREATER THAN 0 =====> "+stkList2.size());
		             	Stock st = (Stock)stkList2.get(j);
		             	String itemName = st.getProductName();
		             	Long catId = st.getCatID();
		             	Long subCatId=st.getSubCatId();
		             	Long shopId=st.getFk_shop_id();
		             	String company = st.getCompanyName();
		             	Double wight = st.getWeight();
		             	Long PkStockId = st.getPkStockId();
		             	Double oldTotalKgLtrQuantity = st.getTotalKgLtrPieceQuantity();
		             	Long proid = st.getProductId();
		    	  System.out.println( " .......................... ...........   in stock update  - - - -- - - - - -  - -      "+(productName.equals(itemName) && company.equals(companyName) && wight==Double.parseDouble(weight) && catId== Long.parseLong(catIDforVAt) && subCatId==Long.parseLong(fk_subCat_id) && shopId==Long.parseLong(fk_shop_id) && proid==Long.parseLong(productID)));
		    	   /*if(productName.equals(itemName) && company.equals(companyName) && wight==Double.parseDouble(weight) && catId== Long.parseLong(fk_cat_id) && subCatId==Long.parseLong(fk_subCat_id) && shopId==Long.parseLong(fk_shop_id))*/
		           if(productName.equals(itemName) && company.equals(companyName) && wight==Double.parseDouble(weight) && catId== Long.parseLong(catIDforVAt) && subCatId==Long.parseLong(fk_subCat_id) && shopId==Long.parseLong(fk_shop_id) && proid==Long.parseLong(productID))   	
		    	   {
		    		 System.out.println("IF INSIDE ELSE BLOCK ==== CONDITION TRUE ===== inside If");
            		 System.out.println("product id - -  "+proid);
            		 HibernateUtility hbu = HibernateUtility.getInstance();
            		 Session session = hbu.getHibernateSession();
            		 Transaction transaction = session.beginTransaction();
            		 
            		 Stock updateStock = (Stock) session.get(Stock.class, new Long(PkStockId));
            		 
            		 updateStock.setFkuserid(Long.parseLong(userid));
            		 updateStock.setShopName(onlyShopName);
            		 updateStock.setUserName(username);
            		 
/*	    		   if(unitName.equalsIgnoreCase("pcs"))
	    		   {
	    		   		 Double qunty = st.getQuantity();
	            		 Double updatequnty = (double) (qunty + Double.parseDouble(quantity));
	            		 updateStock.setQuantity(updatequnty);

		     			 Double quantityForConversionStock = Double.parseDouble(quantity);     						

		     			 System.out.println("IF INSIDE IF BLOCKWEIGHT*QUANTITY =====> "+quantityForConversionStock);
		     			 Double updateTotalPieceQuantity = (oldTotalKgLtrQuantity + quantityForConversionStock);
			       		 updateStock.setTotalKgLtrPieceQuantity(updateTotalPieceQuantity);
			       		 updateStock.setUnit(unit);

			       	}
	    		   if(unitName.equalsIgnoreCase("kg"))
	    		   {

	    				 Double quantityForConversionStock = Double.parseDouble(quantity);   

		     			 Double updateStockKg = (oldTotalKgLtrQuantity + quantityForConversionStock);

	        			 updateStock.setQuantity(updateStockKg);
	        			 updateStock.setUnit(unit);
	        			 updateStock.setTotalKgLtrPieceQuantity(updateStockKg);
	    		   }        		 
	     			
	    		   if(unitName.equalsIgnoreCase("ltr"))
	    		   {

	    				 Double quantityForConversionStock = Double.parseDouble(quantity);

		      		 	 Double updateStockLtr = (oldTotalKgLtrQuantity + quantityForConversionStock);

	        			 updateStock.setQuantity(updateStockLtr);
	        			 updateStock.setUnit(unit);
	        			 updateStock.setTotalKgLtrPieceQuantity(updateStockLtr);
	      			}
	    		   
	    		   if(unitName.equalsIgnoreCase("grams"))
	    		   {

	    				 Double quantityForConversionStock = Double.parseDouble(quantity);

		      		 	 Double updateStockGm = (oldTotalKgLtrQuantity + quantityForConversionStock);

	        			 updateStock.setQuantity(updateStockGm);
	        			 updateStock.setUnit(unit);
	        			 updateStock.setTotalKgLtrPieceQuantity(updateStockGm);
			       	}
	      			
	    		   if(unitName.equalsIgnoreCase("millilitre"))
	    		   {

	    				 Double quantityForConversionStock = Double.parseDouble(quantity);

		      		 	 Double updateStockGm = (oldTotalKgLtrQuantity + quantityForConversionStock);

	        			 updateStock.setQuantity(updateStockGm);
	        			 updateStock.setUnit(unit);
	        			 updateStock.setTotalKgLtrPieceQuantity(updateStockGm);
			       	}
	*/            		 
        			 
    		   		 Double qunty = st.getQuantity();
           // 		 Double updatequnty = (double) (qunty + Double.parseDouble(quantity));
    		   		Double updatequnty = (double) (qunty + quan);
            		 updateStock.setQuantity(updatequnty);

//	     			 Double quantityForConversionStock = Double.parseDouble(quantity);     						
            		 Double quantityForConversionStock = (quan);     					
            		 
	     	//		 System.out.println("IF INSIDE IF BLOCKWEIGHT*QUANTITY =====> "+quantityForConversionStock);
	     			 Double updateTotalPieceQuantity = (oldTotalKgLtrQuantity + quantityForConversionStock);
		       		 updateStock.setTotalKgLtrPieceQuantity(updateTotalPieceQuantity);
		       		 updateStock.setUnit(unitdesc);
		       		 
        			 
            		 DateFormat df = new SimpleDateFormat("dd/MM/yyyy");
            		 Date date2 = new Date();
            	     
            		 updateStock.setUpdateDate(date2);
            		 session.saveOrUpdate(updateStock);
            		 transaction.commit();
            		 
            		 System.out.println("IF INSIDE ELSE IF BLOCK.....VALUE OF J ===================>"+j);
            		break;
		            	}
		            	else
		            	{
		            		//ItemName is Not Exists
		            		if(j+1 == stkList2.size())
		            		{
		            		System.out.println("IF INSIDE ELSE IF ELSE BLOCK VALUE OF J+1 ===================>"+j);
		            			
		            			Stock newEntry = new Stock();
		            			newEntry.setCatID(Long.parseLong(catIDforVAt));
		            			//newEntry.setCatID(Long.parseLong(fk_cat_id));
		            			newEntry.setSubCatId(Long.parseLong(fk_subCat_id));
		            			newEntry.setFk_shop_id(Long.parseLong(fk_shop_id));
		            			
		            			newEntry.setFkuserid(Long.parseLong(userid));
		            			newEntry.setShopName(onlyShopName);
		            			newEntry.setUserName(username);
		            			newEntry.setPack_type("unpacked");
		            			newEntry.setProductName(productName);
		            			newEntry.setCompanyName(companyName);
		            			newEntry.setWeight(Double.parseDouble(weight));
		            			
		            	//		newEntry.setQuantity(Double.parseDouble(quantity));
		            		
		            			newEntry.setQuantity((quan));
		            			newEntry.setUnit(unitdesc);			
		            			
		            			
		            			Double weightForConversionStock = Double.parseDouble(weight);
//		         				Double quantityForConversionStock = Double.parseDouble(quantity);
	
		         				Double quantityForConversionStock = (quan);
		         				
		         	/*			if(unitName.equalsIgnoreCase("pcs"))
		         				{
			            			//Double totalPieceQuantity = weightForConversionStock*quantityForConversionStock;
			            			//Double updateQuantityPiece = totalPieceQuantity/Double.parseDouble(weight);
		         					
		    	        			newEntry.setQuantity(quantityForConversionStock);		    	        			 
			            			newEntry.setTotalKgLtrPieceQuantity(quantityForConversionStock);
			    		       		newEntry.setUnit(unit);
			    		       		newEntry.setProductId(Long.parseLong(productID));
		         				}
		         				
		         				if(unitName.equalsIgnoreCase("kg"))
		         				{
			         				// Double newstockInKg = weightForConversionStock*quantityForConversionStock;
			    	     		 	// Double updateQuantityKg = newstockInKg/Double.parseDouble(weight);
		         					
		    	        			 newEntry.setQuantity(quantityForConversionStock);
		    	        			 newEntry.setTotalKgLtrPieceQuantity(quantityForConversionStock);
		    	        			 newEntry.setUnit(unit);
		    	     				 newEntry.setProductId(Long.parseLong(productID));
		         				}
		    	        		if(unitName.equalsIgnoreCase("ltr"))
		    	        		{
			    	      			 //Double newstockInLtr = weightForConversionStock*quantityForConversionStock;
			    	      			 //Double updateQauantityLtr = newstockInLtr/Double.parseDouble(weight);
			    	      			 
		    	      				 newEntry.setQuantity(quantityForConversionStock);
		    	      				 newEntry.setTotalKgLtrPieceQuantity(quantityForConversionStock);
		    	      				 newEntry.setUnit(unit);
		    	      				 newEntry.setProductId(Long.parseLong(productID));
		    	      			}
		    	        		if(unitName.equalsIgnoreCase("grams"))
		    	        		{
			    	      			 //Double newstockInGm = weightForConversionStock*quantityForConversionStock;
			    	      			// Double updateQauantityGm = newstockInGm/Double.parseDouble(weight);
			    	      			 
		    	      				 newEntry.setQuantity(quantityForConversionStock);
		    	      				 newEntry.setTotalKgLtrPieceQuantity(quantityForConversionStock);
		    	      				 newEntry.setUnit(unit);
		    	      				 newEntry.setProductId(Long.parseLong(productID));
		    	      			}
		    	        		if(unitName.equalsIgnoreCase("millilitre"))
		    	        		{
			    	      			 //Double newstockInGm = weightForConversionStock*quantityForConversionStock;
			    	      			// Double updateQauantityGm = newstockInGm/Double.parseDouble(weight);
			    	      			 
		    	      				 newEntry.setQuantity(quantityForConversionStock);
		    	      				 newEntry.setTotalKgLtrPieceQuantity(quantityForConversionStock);
		    	      				 newEntry.setUnit(unit);
		    	      				 newEntry.setProductId(Long.parseLong(productID));
		    	      			}
		    	      */  		
	    	        			 newEntry.setQuantity(quantityForConversionStock);
	    	        			 newEntry.setTotalKgLtrPieceQuantity(quantityForConversionStock);
	    	        	//		 newEntry.setUnit(unit);
	    	     				 newEntry.setProductId(Long.parseLong(productID));
	    	     				 
	    	     				 
		            			//newEntry.setBatchNum("N/A");
		            			StockDao dao2 = new StockDao();
		            			dao2.registerStock(newEntry);
		            		}
		            	}
		        		
		        	}
        		}
        }
	}
	
	public Map getAllDcNumbers(String supplierId) {
		GoodsReceiveDao dao = new GoodsReceiveDao();
		List list= dao.getAllDcNumbersBySuppliers(supplierId);
		Map  map =  new HashMap();
		for(int i=0;i<list.size();i++)
		{
			Object[] o = (Object[])list.get(i);
			GetPODetailsForGoodsReceive bean = new GetPODetailsForGoodsReceive();
			System.out.println(Arrays.toString(o));
			bean.setDcNum(o[0].toString());
			bean.setInsertDate(o[1].toString());
			//bean.setTotalAmount((Double)o[1]);
			System.out.println("***************"+o[0]);
			map.put(bean.getDcNum(),bean);
			
		}
		return map;
	}

	public Map getPODetails(String dcNum, String supplier) {
		System.out.println("In Helper");
		GoodsReceiveDao dao = new GoodsReceiveDao();
		List list = dao.getPODetailsForGoodsReceive(dcNum,supplier);
		System.out.println(list.size());
		Map  map1 =  new HashMap();
		
		for(int i=0;i<list.size();i++)
		{
			Object[] o = (Object[])list.get(i);
			GetPODetailsForDcUpdate bean = new GetPODetailsForDcUpdate();
			
			
			bean.setPkPOId((BigInteger)o[0]);
			bean.setProductName((String)o[1]);
			bean.setBuyPrice((BigDecimal)o[2]);
			bean.setSalePrice((BigDecimal)o[3]);
			bean.setQuantity((BigInteger)o[4]);
			bean.setWeight((BigDecimal)o[5]);
			/*bean.setTotalAmount((BigDecimal)o[6]);*/
			map1.put(bean.getPkPOId(),bean);
		}
		return map1;
	
	
	}
	
/*	public List getPurchaseDetailsForSingleDate(HttpServletRequest request,
			HttpServletResponse response) {
		
		String fDate = request.getParameter("fDate");
		System.out.println(fDate+"Single Date");
		
         Map<Long,PurchaseDetailsFromGoodsReceive> map = new HashMap<Long,PurchaseDetailsFromGoodsReceive>();
 		
         GoodsReceiveDao dao = new GoodsReceiveDao();
 		List<PurchaseDetailsFromGoodsReceive> expList = dao.getPurchaseDetailsForSingleDateFromGoodsReceive(fDate);
 		
 		return expList;
		
	}*/

	public List getPurchaseDetailByTwoDate(HttpServletRequest request,
			HttpServletResponse response) {


		String fDate = request.getParameter("fisDate");
        String tDate = request.getParameter("endDate");
		
        Map<Long,PurchaseDetailsFromGoodsReceive> map = new HashMap<Long,PurchaseDetailsFromGoodsReceive>();
		
        GoodsReceiveDao dao = new GoodsReceiveDao();
		List<PurchaseDetailsFromGoodsReceive> exp1List = dao.getPurchaseReportsBetweenTwoDates(fDate,tDate);
		
		return exp1List;
	
	}
	
	public List GSTSummaryReportBetweenTwoDates(HttpServletRequest request,
			HttpServletResponse response) {


		String fDate = request.getParameter("fisDate3");
        String tDate = request.getParameter("endDate3");
		
        Map<Long,PurchaseDetailsFromGoodsReceive> map = new HashMap<Long,PurchaseDetailsFromGoodsReceive>();
		
        GoodsReceiveDao dao = new GoodsReceiveDao();
		List<PurchaseDetailsFromGoodsReceive> exp1List = dao.GSTSummaryReportBetweenTwoDates(fDate,tDate);
		
		return exp1List;
	
	}

	public List getStockReportAsPerShop(HttpServletRequest request,
			HttpServletResponse response) {
	
		String fk_shop_id = request.getParameter("fk_shop_id");
		
         Map<Long,StockDetail> map = new HashMap<Long,StockDetail>();
 		
         GoodsReceiveDao dao = new GoodsReceiveDao();
 		List<StockDetail> stockList = dao.getStockReportAsPerShop(fk_shop_id,request);
 			
 		return stockList;
	}

	public CustomerBean getDetailsById(HttpServletRequest request,
			HttpServletResponse response) {
		
		String key=request.getParameter("key");
		System.out.println(key+"barcode");
		Map<Long,CustomerBean> map = new HashMap<Long,CustomerBean>();
		
		GoodsReceiveDao dao = new GoodsReceiveDao();
		List<CustomerBean> catList = dao.getAllItemDetails(key);
		
		CustomerBean cs = null;
		if(catList!= null && catList.size() > 0 )
		{	
			cs = (CustomerBean)catList.get(0); 
		}
		return cs;
	}
	
	public CustomerBean getPesticideDetailsByBarcode(HttpServletRequest request,
			HttpServletResponse response) {
		
		String key=request.getParameter("key");
		System.out.println(key+"barcode");
		Map<Long,CustomerBean> map = new HashMap<Long,CustomerBean>();
		
		GoodsReceiveDao dao = new GoodsReceiveDao();
		List<CustomerBean> catList = dao.getPesticideDetailByBarocde(key);
		
		CustomerBean cs = null;
		if(catList!= null && catList.size() > 0 )
		{	
			cs = (CustomerBean)catList.get(0); 
		}
		return cs;
	}
	
	// get purchase Item By Bill NoWise
		public Map getAllIetmByBillNo(HttpServletRequest request) 
		{
			String bill_no = request.getParameter("bill_no");
			String supplier = request.getParameter("supplier");		
						
		    GoodsReceiveDao dao = new GoodsReceiveDao();
			List list = dao.getAllIetmByBillNo(bill_no,supplier,request);
			
			System.out.println(list.size());
			Map  map1 =  new HashMap();
			
			for(int i=0;i<list.size();i++)
			{
				Object[] o = (Object[])list.get(i);
				GetPurchaseProduct bean = new GetPurchaseProduct();
									
				bean.setPk_goods_receive_id((BigInteger)o[0]);
				bean.setSupplier_name((String)o[1]);
				//bean.setDc_number((BigInteger)o[2]);
				bean.setProduct_name((String)o[2]);
				bean.setBuy_price((BigDecimal)o[3]);
				bean.setSale_price((BigDecimal)o[4]);
				bean.setWeight((BigDecimal)o[5]);
				bean.setDupQuantity1((Double)o[6]);
				bean.setBatch_no((String)o[7]);
				bean.setFkCategoryId((BigInteger)o[8]);
				bean.setPurchaseDate1(o[9].toString());
				bean.setMrp((BigDecimal)o[10]);
				bean.setTax_percentage((BigDecimal)o[11]);
				bean.setBarcodeNo((BigInteger)o[12]);
				bean.setCompany_Name((String)o[13]);
				bean.setAvailable_quanty((Double)o[14]);
				bean.setCatName((String)o[15]);
				bean.setPkPOId(Long.parseLong(o[16].toString()));
				bean.setSaleunit(o[17].toString());
				bean.setUnitvalue(Double.parseDouble(o[18].toString()));
				bean.setPkStockId(Long.parseLong(o[19].toString()));
				bean.setDupQuantity(0d);
				bean.setTaxAmount(0d);
				bean.setTotal(0d);
				
				map1.put(bean.getPk_goods_receive_id(),bean);
			}
			return map1;
		}

// get purchase Item By Bill No Wise for credit note conversion
public Map getAllIetmBySupplierForCreditNoteConversion(HttpServletRequest request) 
{
	System.out.println("pr get grid helper");
	
	String bill_no1 = request.getParameter("bill_no1");
	String supplier = request.getParameter("supplier");
	
    GoodsReceiveDao dao = new GoodsReceiveDao();
	List list = dao.getAllIetmBySupplierForCreditNoteConversion(bill_no1,supplier,request);
	
	System.out.println(list.size());
	Map  map1 =  new HashMap();
	
	for(int i=0;i<list.size();i++)
	{
		Object[] o = (Object[])list.get(i);
		
		purchaseReturnBean bean = new purchaseReturnBean();
									
		bean.setPurchase_return_pk(Long.parseLong(o[0].toString()));
		bean.setSupplier((String)o[1]);
		bean.setProduct_name((String)o[2]);
		bean.setBuy_price((Double)o[3]);
		bean.setSale_price((Double)o[4]);
		bean.setWeight((Double)o[5]);
		bean.setQuantity((Double)o[6]);
		bean.setBatch_no((String)o[7]);
		bean.setFkCategoryId(Long.parseLong(o[8].toString()));
		bean.setPurchaseDate((Date) o[9]);
		bean.setMrp((Double)o[10]);
		bean.setTax_percentage((Double)o[11]);
		bean.setBarcodeNo(Long.parseLong(o[12].toString()));
		bean.setCompany_Name((String) o[13]);
		bean.setReturn_quanty((Double) o[14]);
        bean.setCategory_name((String) o[15]);
        bean.setProdctId(Long.parseLong(o[16].toString()));
        bean.setTaxAmount((Double) o[17] );
        bean.setTotal((Double) o[18]);
        bean.setPkGoodReceiveId(Long.parseLong(o[19].toString()));
        bean.setPrice(0.0);
        bean.setConversiontotal(0.0);
     							
		System.out.println("pk-iD ----------"+o[16].toString());

		map1.put(bean.getPurchase_return_pk(),bean);
	}
	return map1;
}
	//to purchase Return
		
		/////to update in goodsReceive table/////
		public void returntPurchase(HttpServletRequest request,
				HttpServletResponse response) {
			System.out.println("GoodsReceiveHelper returntPurchase()");
			// TODO Auto-generated method stub
			Integer count = Integer.parseInt(request.getParameter("count"));
			for(int i =0 ; i <count;i++)
			{
				String pkGoodsReceiveId = request.getParameter("pk_goods_receive_id"+i);
				String dupQuantity = request.getParameter("dupQuantity"+i);                // Return Quantity
				String product_name = request.getParameter("product_name"+i);
				String company_Name = request.getParameter("company_Name"+i);
				String weight = request.getParameter("weight"+i);
				String duplicateQuantity = request.getParameter("duplicateQuantity"+i);    // Original Quantity
				String tax_percentage = request.getParameter("tax_percentage"+i);
				String buy_price = request.getParameter("buy_price"+i);
				String available_quanty = request.getParameter("available_quanty"+i);      // Available Quantity
				String pkPOId = request.getParameter("pkPOId"+i);   	                   // product ID
				String total1 = request.getParameter("total"+i); 
				
				HibernateUtility hbu=null;
				Session session = null;
				Transaction transaction = null;
				
				try{
					hbu = HibernateUtility.getInstance();
					session = hbu.getHibernateSession();
					transaction = session.beginTransaction();
					List<Object[]> list2  = null;
					List<GoodsReceiveBean> goodsList = null;
					Double grossTotal = 0.0;
					
					Double quantity = (double)(Double.parseDouble(available_quanty) - Double.parseDouble(dupQuantity));
					System.out.println("after minus qunt : "+ quantity);
       		        GoodsReceiveBean updateStock = (GoodsReceiveBean) session.get(GoodsReceiveBean.class, new Long(pkGoodsReceiveId));
       		        // updateStock.setQuantity(quantity);
       		        updateStock.setDupQuantity(quantity);
       		        //session.saveOrUpdate(updateStock);
       		        
	       		    Query query2 = session.createSQLQuery("SELECT gross_total,bill_number FROM goods_receive WHERE pk_goods_receive_id="+pkGoodsReceiveId);
	 		        list2 = query2.list();
	 		        goodsList = new ArrayList<GoodsReceiveBean>();
	 		        for (Object[] objects : list2) 
	 		        {
	 					 grossTotal = Double.parseDouble(objects[0].toString());
	 					
	 				 }
	 		        Double buyPrice = Double.parseDouble(buy_price);
			        Double taxPercentage = Double.parseDouble(tax_percentage);
			        Double taxAmount = (taxPercentage/100)*buyPrice;
			        Double newBuyPrice = buyPrice + taxAmount;
			        Double total = Double.parseDouble(dupQuantity) * newBuyPrice;
			        Double newGrossTotal = grossTotal - total;
			       
       		        updateStock.setReturnAmount(total);
       		        updateStock.setTotalAfterReturn(newGrossTotal);
       		        session.saveOrUpdate(updateStock);
       		        transaction.commit();					
       		}
			catch(RuntimeException e){
				try{
					transaction.rollback();
				}catch(RuntimeException rbe)
				{
					Log.error("Couldn't roll back tranaction",rbe);
				}	
			}finally{
				hbu.closeSession(session);
			}				
			}		
		}

		public void returntMinusFromStockPurchase(HttpServletRequest request,
				HttpServletResponse response) {
			// TODO Auto-generated method stub
			Integer count = Integer.parseInt(request.getParameter("count"));
			for(int i =0 ; i <count;i++)
			{
				String pkGoodsReceiveId = request.getParameter("pk_goods_receive_id"+i);
				String dupQuantity = request.getParameter("dupQuantity"+i);
				String product_name = request.getParameter("product_name"+i);
				String company_Name = request.getParameter("company_Name"+i);
				String weight = request.getParameter("weight"+i);
				
				String unitvalue = request.getParameter("unitvalue"+i);
				String saleunit = request.getParameter("saleunit"+i);
				
				Double quan = Double.parseDouble(unitvalue) * Double.parseDouble(dupQuantity);
				
				HibernateUtility hbu1=null;
				Session session1=null;
				Transaction transaction1 = null;
				
				try
				{ 
				 Long PkStockId;
				 Double quantity;
				 hbu1 = HibernateUtility.getInstance();
				 session1 = hbu1.getHibernateSession();
				 transaction1 = session1.beginTransaction();
				
        		 Query query = session1.createSQLQuery("select PkStockId , avail_Quantity from stock_detail where ProductName=:product_name AND CompanyName=:company_Name And Weight =:weight");
        		 query.setParameter("product_name", product_name);
        		 query.setParameter("company_Name", company_Name);
        		 query.setParameter("weight", weight);
        		 
        		 List<Object[]> list = query.list();
    			 
    			  for (Object[] object : list) {
    			 // System.out.println(Arrays.toString(object));  
    			  PkStockId = Long.parseLong(object[0].toString());
    			  quantity = Double.parseDouble(object[1].toString());
    			 // System.out.println("PkStockId " +PkStockId);
    			 // System.out.println("quantity " +quantity);
    			  
//    			  Double updatequnty = (double) (quantity - Double.parseDouble(dupQuantity));
    			  Double updatequnty = (double) (quantity - (quan));
    			  
    			  System.out.println("updatequnty  " +updatequnty);
          		
         	     Stock Stock = (Stock) session1.load(Stock.class, new Long(PkStockId));
         	     
         	     Stock.setQuantity(updatequnty);
         	     Stock.setTotalKgLtrPieceQuantity(updatequnty);
         		 
         		 session1.saveOrUpdate(Stock);
         	     transaction1.commit();
         	    System.out.println("Success ");	 
    		   }
					
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
		
/*		//fetching pro details from goods receive for ferti bill
				public CustomerBean getDetailsByProNameForzFertiBill(
						HttpServletRequest request, HttpServletResponse response) {

					
					String proName =request.getParameter("proName");
					String company =request.getParameter("company");
					String weight =request.getParameter("weight");
					
					System.out.println(proName+"pro name in gr helper");
					
					Map<Long,CustomerBean> map = new HashMap<Long,CustomerBean>();
					
					GoodsReceiveDao dao = new GoodsReceiveDao();
					List<CustomerBean> catList = dao.getAllProductDetailsForFrtiBillAsPerProductName(proName,company,weight);
					
					CustomerBean cs = null;
					if(catList!= null && catList.size() > 0 )
					{	
						cs = (CustomerBean)catList.get(0); 
					}
					return cs;
				
				}*/
		 
			//fetching pro details from goods receive for ferti bill
				public CustomerBean getDetailsByProNameForzFertiBill(
						HttpServletRequest request, HttpServletResponse response) {

					
					String proName =request.getParameter("proName");
					String company =request.getParameter("company");
					String weight =request.getParameter("weight");
					
					System.out.println(proName+"pro name in gr helper");
					
					Map<Long,CustomerBean> map = new HashMap<Long,CustomerBean>();
					
					GoodsReceiveDao dao = new GoodsReceiveDao();
					List<CustomerBean> catList = dao.getAllProductDetailsForFrtiBillAsPerProductName(proName,company,weight);
					
					CustomerBean cs = null;
					if(catList!= null && catList.size() > 0 )
					{	
						cs = (CustomerBean)catList.get(0); 
					}
					return cs;	
				}
				
				//fetching product detail as per batch for seed bill
				public CustomerBean getDetailsByBatchNadStockForSeedBill(
						HttpServletRequest request, HttpServletResponse response) {
					
					String batchNum =request.getParameter("batchNum");
					String stock =request.getParameter("stock");
					System.out.println(" batchNum=== == =in helper"+batchNum);
					System.out.println(" stock=== == =in helper"+stock);
					Map<Long,CustomerBean> map = new HashMap<Long,CustomerBean>();
					
					GoodsReceiveDao dao = new GoodsReceiveDao();
					List<CustomerBean> catList = dao.getAllProductDetailsForSeedBillAsPerBatchAndStock(batchNum,stock);
					
					CustomerBean cs = null;
					if(catList!= null && catList.size() > 0 )
					{	
						cs = (CustomerBean)catList.get(0); 
					}
					return cs;
			}
				
			public Map getProductDetailsForFertiBill(HttpServletRequest request, HttpServletResponse response)throws Exception
			{		
				CustomerBean cs = null;
				List<CustomerBean> catList = null;
				List<Object[]> list = null;
				 Map map1 = new HashMap();
				
				String barcodeNo = request.getParameter("barcodeNo");
				String challanNo = request.getParameter("challanNo");
				String proName =request.getParameter("proName");
				String barcode = request.getParameter("barcode");
				String company =request.getParameter("company");
				String weight =request.getParameter("weight");
				String batchNum = request.getParameter("batchNum");
				String catId = request.getParameter("catId");
				String subCatId = request.getParameter("subCatId");
				String shopId = request.getParameter("shopId");
				String expiryDate = request.getParameter("expiryDate");
				String packed = request.getParameter("packed");
				String proid = request.getParameter("proid");
				
				System.out.println("1111``````````` `````````````````   "+barcodeNo+proName+barcode+company+weight+batchNum+" & "+catId+subCatId+" -< "+shopId+expiryDate);
				System.out.println("```````````````` ````````` pack -  "+packed);
				System.out.println("```````````````` ````````` challanNo -  "+challanNo+"  , barcodeNo -  "+barcodeNo);
				Map<Long,CustomerBean> map = new HashMap<Long,CustomerBean>();
				
				GoodsReceiveDao dao = new GoodsReceiveDao();
				
				if(challanNo == null || challanNo.equalsIgnoreCase("") || challanNo.equalsIgnoreCase("undefined") || challanNo.isEmpty() )
				{					
					map1  = dao.getAllProductDetailsForFrtiBillAsPerProductName1(proName, company, weight, batchNum, catId, subCatId, shopId, expiryDate, barcode, barcodeNo,packed,proid,request);
				}
				else
				{	
					map1  = dao.getProductByChallanNo(challanNo, request);
				}
				
				return map1;
			}
			
			public Map getProductDetailsFornonGSTBill(HttpServletRequest request, HttpServletResponse response)throws Exception
			{		
				CustomerBean cs = null;
				List<CustomerBean> catList = null;
				List<Object[]> list = null;
				 Map map1 = new HashMap();
				
				String barcodeNo = request.getParameter("barcodeNo");
				String challanNo = request.getParameter("challanNo");
				String proName =request.getParameter("proName");
				String barcode = request.getParameter("barcode");
				String company =request.getParameter("company");
				String weight =request.getParameter("weight");
				String batchNum = request.getParameter("batchNum");
				String catId = request.getParameter("catId");
				String subCatId = request.getParameter("subCatId");
				String shopId = request.getParameter("shopId");
				String expiryDate = request.getParameter("expiryDate");
				String packed = request.getParameter("packed");
				String proid = request.getParameter("proid");
				
				Map<Long,CustomerBean> map = new HashMap<Long,CustomerBean>();
				
				GoodsReceiveDao dao = new GoodsReceiveDao();
				
				if(challanNo == null || challanNo.equalsIgnoreCase("") || challanNo.equalsIgnoreCase("undefined") || challanNo.isEmpty() )
				{					
					map1  = dao.getAllProductDetailsFornonGSTBillAsPerProductName(proName, company, weight, batchNum, catId, subCatId, shopId, expiryDate, barcode, barcodeNo,packed,proid, request);
				}
				else
				{	
					map1  = dao.getProductByChallanNofornonGST(challanNo, request);
				}
				
				return map1;
			}
				
				// Get Details by Product Name
				public CustomerBean getProductDetailsByBarcodeForFertiBill(String barcodeNo)throws Exception
				{					
					System.out.println("IN HELPER Barcode No   : "+barcodeNo);
					Map<Long,CustomerBean> map = new HashMap<Long,CustomerBean>();
					
					GoodsReceiveDao dao = new GoodsReceiveDao();
					List<CustomerBean> catList = dao.getAllProductDetailsForFrtiBillAsPerBarcodeNo(barcodeNo);
					
					CustomerBean cs = null;
					if(catList!= null && catList.size() > 0)
					{	
						cs = (CustomerBean)catList.get(0); 
					}
					System.out.println(cs);
					return cs;
			}

				public CustomerBean getProductDetailsForSeedBill(
						HttpServletRequest request, HttpServletResponse response) {
					
					String proName =request.getParameter("proName");
					String company =request.getParameter("company");
					String weight =request.getParameter("weight");
					String batchNum = request.getParameter("batchNum");
					
					System.out.println(proName+"----> Product Name in gr helper");
					
					Map<Long,CustomerBean> map = new HashMap<Long,CustomerBean>();
					
					GoodsReceiveDao dao = new GoodsReceiveDao();
					List<CustomerBean> catList = dao.getAllProductDetailsForSeedBillAsPerProductName1(proName,company,weight,batchNum);
					
					CustomerBean cs = null;
					if(catList!= null && catList.size() > 0 )
					{	
						cs = (CustomerBean)catList.get(0); 
					}
					return cs;		
			}
				
				public List getSaleDetailsAsPerCategoryForSingleDate(
						HttpServletRequest request, HttpServletResponse response) {
					
					String cat = request.getParameter("cat");
					String fDate = request.getParameter("fDate");
					System.out.println(cat+" - - - - - - - - - Category in Helper");
					
			         Map<Long,SaleReports> map = new HashMap<Long,SaleReports>();
			 		
			         GoodsReceiveDao dao = new GoodsReceiveDao();
			 		List<SaleReports> expList = dao.getSaleDetailsAsPerCategoryForSingleDate(cat,fDate);
			 		
			 		return expList;
				}
//
				public List getallForSingleDate(
						HttpServletRequest request, HttpServletResponse response) {
					
//					String cat = request.getParameter("cat");
					String fDate = request.getParameter("fDate");
					System.out.println("Category in Helper");
					
			         Map<Long,SaleReports> map = new HashMap<Long,SaleReports>();
			 		
			         GoodsReceiveDao dao = new GoodsReceiveDao();
			 		List<SaleReports> expList = dao.getallForSingleDate(fDate);
			 		
			 		return expList;
				}
				
				public List getSaleDetailsPerPaymentMode(HttpServletRequest request, HttpServletResponse response) {
					
					String paymentMode = request.getParameter("paymentMode");
					String fk_cat_id = request.getParameter("fk_cat_id");
					System.out.println(paymentMode+"paymentMode in Helper");
					System.out.println(fk_cat_id+"fk_cat_id in Helper");
			         Map<Long,SaleReports> map = new HashMap<Long,SaleReports>();
			 		
			         GoodsReceiveDao dao = new GoodsReceiveDao();
			 		List<SaleReports> expList = dao.getSaleDetailsAsPerPaymentMode(paymentMode,fk_cat_id);
			 		return expList;
				}

				public List getSaleDetailsPerPaymentModeGorSingleDate(HttpServletRequest request, HttpServletResponse response) {
					
					String singleDate = request.getParameter("enterdate");
					String paymentModeIdForDate = request.getParameter("paymentModeIdForDate");
					System.out.println(singleDate+"singleDate in Helper");
			         Map<Long,SaleReports> map = new HashMap<Long,SaleReports>();
			 		
			         GoodsReceiveDao dao = new GoodsReceiveDao();
			 		List<SaleReports> expList = dao.getSaleDetailsAsPerPaymentModeForSingleDate(singleDate,paymentModeIdForDate);
			 		return expList;
				}
						
            	public List getSaleDetailsPerGSTPercentage(HttpServletRequest request, HttpServletResponse response) {
					
				    String cat = request.getParameter("fk_cat_id");
					String fDate = request.getParameter("startDate");
					String sDate = request.getParameter("endDate");
					String prodName = request.getParameter("prodName");
			        Map<Long,SaleReports> map = new HashMap<Long,SaleReports>();
			 		
			        GoodsReceiveDao dao = new GoodsReceiveDao();
			 		List<SaleReports> expList = dao.getSaleDetailsAsGST(cat,fDate,sDate,prodName);
			 		return expList;
				}
            	
            	public List getSaleDetailsPernonGSTPercentage(HttpServletRequest request, HttpServletResponse response) {
					
    				String cat = request.getParameter("fk_cat_id");
    				String fDate = request.getParameter("startDate");
    				String sDate = request.getParameter("endDate");
    			    Map<Long,SaleReports> map = new HashMap<Long,SaleReports>();
    			 		
    			    GoodsReceiveDao dao = new GoodsReceiveDao();
    			 	List<SaleReports> expList = dao.getSaleDetailsAsNonGST(cat,fDate,sDate);
    			 	return expList;
    			}
				
				public List getSaleDetailsAsPerCategoryBetTwoDates(
						HttpServletRequest request, HttpServletResponse response) {

					System.out.println("in helper ----------------------------------------------------------------------");
					String cat = request.getParameter("fk_cat_id");
					String fDate = request.getParameter("fisDate");
					String sDate = request.getParameter("endDate");
					System.out.println(cat+"Category in Helper");
					System.out.println(fDate+" - -  fDate in Helper");
					System.out.println(sDate+" - -  sDate in Helper");
					
			         Map<Long,SaleReports> map = new HashMap<Long,SaleReports>();
			 		
			         GoodsReceiveDao dao = new GoodsReceiveDao();
			 		List<SaleReports> expList = dao.getSaleDetailsAsPerCategoryBetweeenTwoDates(cat,fDate,sDate);
			 		return expList;
				}
				//
				public List getallSaleDetailBetTwoDates(
						HttpServletRequest request, HttpServletResponse response) {

					
//					String cat = request.getParameter("fk_cat_id");
					String fDate = request.getParameter("fisDate");
					String sDate = request.getParameter("endDate");
//					System.out.println(cat+"Category in Helper");
					System.out.println(fDate+"fDate in Helper");
					System.out.println(sDate+"sDate in Helper");
					
			         Map<Long,SaleReports> map = new HashMap<Long,SaleReports>();
			 		
			         GoodsReceiveDao dao = new GoodsReceiveDao();
			 		List<SaleReports> expList = dao.getallSaleDetailBetweeenTwoDates(fDate,sDate);
			 		return expList;
				}
				//
				public List getpackingBetTwoDates(HttpServletRequest request, HttpServletResponse response) {

					HttpSession session1 = request.getSession(true);
					
					String username = (String) session1.getAttribute("user");
					String userid = (String) session1.getAttribute("userid");
					String shopid = (String) session1.getAttribute("shopid");
					String shopName = (String) session1.getAttribute("shopName");
					
//					String cat = request.getParameter("fk_cat_id");
					String fDate = request.getParameter("fisDate");
					String sDate = request.getParameter("endDate");
//					System.out.println(cat+"Category in Helper");
					System.out.println(fDate+"fDate in Helper");
					System.out.println(sDate+"sDate in Helper");
					
			         Map<Long,PackingHibernate> map = new HashMap<Long,PackingHibernate>();
			 		
			         GoodsReceiveDao dao = new GoodsReceiveDao();
			 		List<PackingHibernate> expList = dao.getpackingBetweeenTwoDates(fDate,sDate,shopid);
			 		return expList;
				}
				//
	/*
	 * public List dayclosure(HttpServletRequest request, HttpServletResponse
	 * response) {
	 * 
	 * HttpSession session1 = request.getSession(true);
	 * 
	 * String username = (String) session1.getAttribute("user"); String userid =
	 * (String) session1.getAttribute("userid"); String shopid = (String)
	 * session1.getAttribute("shopid"); String shopName = (String)
	 * session1.getAttribute("shopName"); DateFormat df = new
	 * SimpleDateFormat("yyyy-MM-dd"); Date dateobj = new Date();
	 * System.out.println(df.format(dateobj)); String newDate = df.format(dateobj);
	 * 
	 * Map<Long,FertilizerBillBean> map = new HashMap<Long,FertilizerBillBean>();
	 * 
	 * GoodsReceiveDao dao = new GoodsReceiveDao(); // List<FertilizerBillBean>
	 * expList = dao.dayclosure(newDate,shopid); // return expList; }
	 */
				//
				
				public List producttxBetTwoDates(HttpServletRequest request, HttpServletResponse response) {

					
//					String cat = request.getParameter("fk_cat_id");
					String fDate = request.getParameter("fisDate");
					String sDate = request.getParameter("endDate");
//					System.out.println(cat+"Category in Helper");
					System.out.println(fDate+"fDate in Helper");
					System.out.println(sDate+"sDate in Helper");
					
			         Map<Long,productTransferHibernate> map = new HashMap<Long,productTransferHibernate>();
			 		
			         GoodsReceiveDao dao = new GoodsReceiveDao();
			 		List<productTransferHibernate> expList = dao.producttxBetweeenTwoDates(fDate,sDate);
			 		return expList;
				}
				
				public List getSaleDetailsAsPerShopBetTwoDates(
						HttpServletRequest request, HttpServletResponse response) {
					
					String shop = request.getParameter("shop");
					String fDate = request.getParameter("fDate");
					String sDate = request.getParameter("sDate");
					System.out.println(shop+"Category in Helper");
					System.out.println(fDate+"fDate in Helper");
					System.out.println(sDate+"sDate in Helper");
					
			         Map<Long,SaleReports> map = new HashMap<Long,SaleReports>();
			 		
			         GoodsReceiveDao dao = new GoodsReceiveDao();
			 		List<SaleReports> expList = dao.getSaleDetailsAsPerShopBetweeenTwoDates(shop,fDate,sDate);
			 	
			 		return expList;
				}
//
				public List getSaleDetailsAsPeruserBetTwoDates(
						HttpServletRequest request, HttpServletResponse response) {
					
					String shop = request.getParameter("shop");
					String fDate = request.getParameter("fDate");
					String sDate = request.getParameter("sDate");
					System.out.println(shop+"Category in Helper");
					System.out.println(fDate+"fDate in Helper");
					System.out.println(sDate+"sDate in Helper");
					
			         Map<Long,SaleReports> map = new HashMap<Long,SaleReports>();
			 		
			         GoodsReceiveDao dao = new GoodsReceiveDao();
			 		List<SaleReports> expList = dao.getSaleDetailsAsPeruserBetweeenTwoDates(shop,fDate,sDate);
			 	
			 		return expList;
				}
				
				public List getSaleDetailsAsPerProNameForSingleDate(
						HttpServletRequest request, HttpServletResponse response) {

					String cat = request.getParameter("cat");
					String productName = request.getParameter("product");
					String fDate = request.getParameter("fDate");
					System.out.println(cat+"Category in Helper");
					
			         Map<Long,SaleReports> map = new HashMap<Long,SaleReports>();
			 		
			         GoodsReceiveDao dao = new GoodsReceiveDao();
			 		List<SaleReports> expList = dao.getSaleDetailsAsPerProductNameForSingleDate(cat,fDate,productName);
			 		
			 		return expList;
				}
				
				public List getStockDetailsAsPerCategory(HttpServletRequest request, HttpServletResponse response) {

					String cat = request.getParameter("cat");
					System.out.println(cat+"Category in Helper");
					
			         Map<Long,StockDetail> map = new HashMap<Long,StockDetail>();
			 		
			         GoodsReceiveDao dao = new GoodsReceiveDao();
			 		 List<StockDetail> stockList = dao.getStockDetailsForReportAsPerCategory(cat, request);
			 		
			 		System.out.println("@@@ stock report Helper :: "+ stockList);
			 		
			 		return stockList;
				}
				
				public List getStockDetailsAsCompanyName(HttpServletRequest request,HttpServletResponse response) 
				{
					String companyName = request.getParameter("companyName");
					
			         Map<Long,StockDetail> map = new HashMap<Long,StockDetail>();
			 		
			         GoodsReceiveDao dao = new GoodsReceiveDao();
			 		List<StockDetail> stockList = dao.getStockDetailsAsPerCompanyName(companyName, request);
			 		
			 		return stockList;
				
				}
		//
				public List getsaleamount(HttpServletRequest request,HttpServletResponse response) 
				{
				    LocalDate todaydate = LocalDate.now();
				    LocalDate frstday = todaydate.withDayOfMonth(1);
				    LocalDate lstday = todaydate.withDayOfMonth(todaydate.lengthOfMonth());
				    System.out.println(frstday+" & "+lstday);
				    
			         Map<Long,SaleReports> map = new HashMap<Long,SaleReports>();
			 		
			         GoodsReceiveDao dao = new GoodsReceiveDao();
			 		List<SaleReports> stockList = dao.getsaleamt(frstday,lstday, request);
			 		
			 		return stockList;
				
				}
				//
				public List getpurchase(HttpServletRequest request,HttpServletResponse response) 
				{
				    LocalDate todaydate = LocalDate.now();
				    LocalDate frstday = todaydate.withDayOfMonth(1);
				    LocalDate lstday = todaydate.withDayOfMonth(todaydate.lengthOfMonth());
				    System.out.println(frstday+" & "+lstday);
				    
			         Map<Long,GoodsReceiveBean> map = new HashMap<Long,GoodsReceiveBean>();
			 		
			         GoodsReceiveDao dao = new GoodsReceiveDao();
			 		List<GoodsReceiveBean> stockList = dao.getpuramt(frstday,lstday, request);
			 		
			 		return stockList;
				
				}
				//
				public List getpurchasereturnamount(HttpServletRequest request,HttpServletResponse response) 
				{
				    LocalDate todaydate = LocalDate.now();
				    LocalDate frstday = todaydate.withDayOfMonth(1);
				    LocalDate lstday = todaydate.withDayOfMonth(todaydate.lengthOfMonth());
				    System.out.println(frstday+" & "+lstday);
				    
			         Map<Long,GoodsReceiveBean> map = new HashMap<Long,GoodsReceiveBean>();
			 		
			         GoodsReceiveDao dao = new GoodsReceiveDao();
			 		List<GoodsReceiveBean> stockList = dao.getpurchsereturn(frstday,lstday, request);
			 		
			 		return stockList;
				
				}
				//
				public List getsalereturnamount(HttpServletRequest request,HttpServletResponse response) 
				{
				    LocalDate todaydate = LocalDate.now();
				    LocalDate frstday = todaydate.withDayOfMonth(1);
				    LocalDate lstday = todaydate.withDayOfMonth(todaydate.lengthOfMonth());
				    System.out.println(frstday+" & "+lstday);
				    
			         Map<Long,GoodsReceiveBean> map = new HashMap<Long,GoodsReceiveBean>();
			 		
			         GoodsReceiveDao dao = new GoodsReceiveDao();
			 		List<GoodsReceiveBean> stockList = dao.getsalereturn(frstday,lstday, request);
			 		
			 		return stockList;
				
				}
				//
				public List getlowstock(HttpServletRequest request,HttpServletResponse response) 
				{
				    LocalDate todaydate = LocalDate.now();
				    LocalDate frstday = todaydate.withDayOfMonth(1);
				    LocalDate lstday = todaydate.withDayOfMonth(todaydate.lengthOfMonth());
				    System.out.println(frstday+" & "+lstday);
				    
			         Map<Long,Stock> map = new HashMap<Long,Stock>();
			 		
			         GoodsReceiveDao dao = new GoodsReceiveDao();
			 		List<Stock> stockList = dao.getslowstock(frstday,lstday, request);
			 		
			 		return stockList;
				
				}
				public List getPurchaseDetailsForSingleDate(HttpServletRequest request,
						HttpServletResponse response) {
					
					String fDate = request.getParameter("fDate");
					System.out.println(fDate+"Single Date");
					
			        Map<Long,PurchaseDetailsFromGoodsReceive> map = new HashMap<Long,PurchaseDetailsFromGoodsReceive>();
			 		
			        GoodsReceiveDao dao = new GoodsReceiveDao();
			 		List<PurchaseDetailsFromGoodsReceive> expList = dao.getPurchaseDetailsForSingleDateFromGoodsReceive(fDate);
			 		
			 		return expList;
					
				}
				

				public List getPurchaseDetailsAsPerProduct(HttpServletRequest request,
						HttpServletResponse response) {
					
					String cat = request.getParameter("cat");
					String productName = request.getParameter("proName");
					String company = request.getParameter("company");
					String weight = request.getParameter("weight");
				
					System.out.println(cat+"Category in Helper");
					//System.out.println(product+"product in Helper");
					System.out.println(cat+" "+productName+" "+company+" "+weight);
					
			         Map<Long,PurchaseDetailsFromGoodsReceive> map = new HashMap<Long,PurchaseDetailsFromGoodsReceive>();
			 		
			         GoodsReceiveDao dao = new GoodsReceiveDao();
			 		List<PurchaseDetailsFromGoodsReceive> expList = dao.getPurchaseDetailsAsPerProduct(cat,productName,company,weight);
			 					 		
			 		return expList;
				
				}
//////purchase report for supplier//////////
public List getPurchaseDetailsAsPerSupplierName(HttpServletRequest request,
		HttpServletResponse response) {
	
	String supplier = request.getParameter("supplier");
	System.out.println(supplier+"Supplier in Helper");
	
     Map<Long,PurchaseDetailsFromGoodsReceive> map = new HashMap<Long,PurchaseDetailsFromGoodsReceive>();
		
     GoodsReceiveDao dao = new GoodsReceiveDao();
		List<PurchaseDetailsFromGoodsReceive> expList = dao.getPurchaseDetailsForSupplier(supplier);
		
		return expList;
}

public List getPurchaseDetailsAsPerShopName(HttpServletRequest request,
		HttpServletResponse response) {
	
	String shop = request.getParameter("shop");
	String fisDate = request.getParameter("fisDate3");
	String endDate = request.getParameter("endDate3");
	System.out.println(shop+"Supplier in Helper");
	
	
	
     Map<Long,PurchaseDetailsFromGoodsReceive> map = new HashMap<Long,PurchaseDetailsFromGoodsReceive>();
		
     GoodsReceiveDao dao = new GoodsReceiveDao();
		List<PurchaseDetailsFromGoodsReceive> expList = dao.getPurchaseDetailsForShop(shop,fisDate,endDate);
		
		
		return expList;

}


public List getPurchaseDetailsAsPerCategory(HttpServletRequest request,
		HttpServletResponse response) {
	
	String cat = request.getParameter("cat");
	System.out.println(cat+"Category in Helper");
	
     Map<Long,PurchaseDetailsFromGoodsReceive> map = new HashMap<Long,PurchaseDetailsFromGoodsReceive>();
		
     GoodsReceiveDao dao = new GoodsReceiveDao();
		List<PurchaseDetailsFromGoodsReceive> expList = dao.getPurchaseDetailsForCategory(cat);
		
		
		return expList;


}


public List getSaleDetailsAsPerProductNameBetTwoDates(
		HttpServletRequest request, HttpServletResponse response) {


	
	String cat = request.getParameter("cat");
	String fDate = request.getParameter("fDate");
	String sDate = request.getParameter("sDate");
	String product = request.getParameter("product");
	System.out.println("in helper ````````````````````````````````````````````````````````");
	System.out.println(cat+"		Category in Helper");
	System.out.println(fDate+"		fDate in Helper");
	System.out.println(sDate+"		sDate in Helper");
	
     Map<Long,SaleReports> map = new HashMap<Long,SaleReports>();
		
     GoodsReceiveDao dao = new GoodsReceiveDao();
		List<SaleReports> expList = dao.getSaleDetailsAsPerProductNamesBetweeenTwoDates(cat,fDate,sDate,product);
		
		
		return expList;


}

//GST Sale Summary 
public List gstSummaryReportsBetweenTwoDates(
		HttpServletRequest request, HttpServletResponse response) {


	
	String fDate = request.getParameter("gstFisDate1");
	String sDate = request.getParameter("gstEndDate1");
	
	System.out.println(fDate+"fDate in Helper");
	System.out.println(sDate+"sDate in Helper");
	
     Map<Long,SaleReports> map = new HashMap<Long,SaleReports>();
		
     GoodsReceiveDao dao = new GoodsReceiveDao();
		List<SaleReports> expList = dao.gstSummaryReportsBetweenTwoDates(fDate,sDate);	
		
		return expList;
}

//GST Purchase Summary 
public List gstPurchaseSummaryReportsBetweenTwoDates(
		HttpServletRequest request, HttpServletResponse response) {


	
	String fDate = request.getParameter("gstFisDate1");
	String sDate = request.getParameter("gstEndDate1");
	
	System.out.println(fDate+"fDate in Helper");
	System.out.println(sDate+"sDate in Helper");
	
     Map<Long,SaleReports> map = new HashMap<Long,SaleReports>();
		
     GoodsReceiveDao dao = new GoodsReceiveDao();
		List<SaleReports> expList = dao.gstPurchaseSummaryReportsBetweenTwoDates(fDate,sDate);
		
		
		return expList;
}

public List getSaleDetailsAsPerSup(HttpServletRequest request,
		HttpServletResponse response) {

	String fkSupplierId = request.getParameter("fkSupplierId");
	System.out.println(fkSupplierId+"fkSupplierId in Helper");
	
     Map<Long,SaleReports> map = new HashMap<Long,SaleReports>();
		
     GoodsReceiveDao dao = new GoodsReceiveDao();
		List<SaleReports> expList = dao.getSaleDetailsAsPerSupplierName(fkSupplierId);
		
		return expList;

}


public List getTaxDetailsFromPurchaseForSingleDateAsPerCategory(
		HttpServletRequest request, HttpServletResponse response) {

	
	String cat = request.getParameter("cat");
	String fDate = request.getParameter("fDate");
	String sDate = request.getParameter("sDate");
	System.out.println(cat+"Category in Helper");
	System.out.println(fDate+"fDate in Helper");
     Map<Long,PurchaseDetailsFromGoodsReceive> map = new HashMap<Long,PurchaseDetailsFromGoodsReceive>();
		
     GoodsReceiveDao dao = new GoodsReceiveDao();
		List<PurchaseDetailsFromGoodsReceive> expList = dao.geTaxDetailsAsPerCategoryForSingleDate(cat,fDate,sDate);
		return expList;

}

public List getStockDetailsAsProductName(HttpServletRequest request,HttpServletResponse response) {
	
	String proName = request.getParameter("proName");
	String company = request.getParameter("company");
	String weight = request.getParameter("weight");
     
	Map<Long,StockDetail> map = new HashMap<Long,StockDetail>();
		
    GoodsReceiveDao dao = new GoodsReceiveDao();
	List<StockDetail> stockList = dao.getStockDetailsAsPerProductName(proName,weight,company,request);
		
	return stockList;
}

public List getSaleDetailsPerPaymentModeForTwoDate(HttpServletRequest request,
		HttpServletResponse response) {

	String singleDate = request.getParameter("singleDate");
	String secondDate = request.getParameter("secondDate");
	/*String fk_cat_id = request.getParameter("fk_cat_id");*/
	System.out.println(singleDate+"singleDate in Helper");
	/*System.out.println(fk_cat_id+"fk_cat_id in Helper");*/
     Map<Long,SaleReports> map = new HashMap<Long,SaleReports>();
		
     GoodsReceiveDao dao = new GoodsReceiveDao();
/*		List<SaleReports> expList = dao.getSaleDetailsAsPerPaymentModeForTwoDate(singleDate,fk_cat_id,secondDate);*/
		List<SaleReports> expList = dao.getSaleDetailsAsPerPaymentModeForTwoDate(singleDate,secondDate);
		return expList;

}


public List getSaleDetailsAsPerPaymentModeForRangesHelper(HttpServletRequest request,
		HttpServletResponse response) {

	String fisDateForPay4 = request.getParameter("fisDateForPay4");
	String endDateForPay4 = request.getParameter("endDateForPay4");
	String paymentModeId4 = request.getParameter("paymentModeId4");
	System.out.println(fisDateForPay4+"singleDate in Helper");
	System.out.println(endDateForPay4+"fk_cat_id in Helper");
     Map<Long,SaleReports> map = new HashMap<Long,SaleReports>();
		
     GoodsReceiveDao dao = new GoodsReceiveDao();
		List<SaleReports> expList = dao.getSaleDetailsAsPerPaymentModeForRangesDao(fisDateForPay4,endDateForPay4,paymentModeId4);
		return expList;

}

public Map getSubCatDetails(HttpServletRequest request) 
{
	String fk_cat_id = request.getParameter("fk_cat_id");
    
	int count=0;
	System.out.println("IN HELPER");
		
	ProductDetailsDao cdd = new ProductDetailsDao();
	List list=cdd.getAllSubCategory(fk_cat_id, request);
	
	System.out.println("list ======"+list.size());
	Map  map =  new HashMap();
	for(int i=0;i<list.size();i++)
	{
		System.out.println("IN HELPER");
		Object[] o = (Object[])list.get(i);
		SubCategoryDetailsBean bean = new SubCategoryDetailsBean();
		System.out.println(Arrays.toString(o));
		bean.setSubcatId(Long.parseLong(o[0].toString()));
		bean.setSubcategoryName(o[1].toString());
		//bean.setTotalAmount((Double)o[1]);
		System.out.println("***************"+o[0]);
		map.put(count,bean);
		count++;
	}
	return map;

}

public Map getProNameDetails(HttpServletRequest request) 
{
	String fk_cat_id = request.getParameter("fk_cat_id");
	String fk_subCat_id = request.getParameter("fk_subCat_id");
    
	int count=0;
	System.out.println("IN HELPER");
	GoodsReceiveDao cdd = new GoodsReceiveDao();
	List list=cdd.getProductName(fk_cat_id,fk_subCat_id,request);
	
	System.out.println("list ======"+list.size());
	Map  map =  new HashMap();
	for(int i=0;i<list.size();i++)
	{
		System.out.println("IN HELPER");
		Object[] o = (Object[])list.get(i);
		ProductDetailsBean bean = new ProductDetailsBean();
		System.out.println(Arrays.toString(o));
		bean.setProdctId(Long.parseLong(o[0].toString()));
		bean.setProductName(o[1].toString());
		bean.setWeight(Double.parseDouble(o[2].toString()));
		bean.setUnitName(o[3].toString());
		bean.setManufacturingCompany(o[4].toString());
		//bean.setTotalAmount((Double)o[1]);
		
		
		System.out.println("*product id***************"+o[0]);
		System.out.println("**product name**************"+o[1]);
		System.out.println("*weight**************"+o[2]);
		System.out.println("**unit name*************"+o[3]);
		
		
		map.put(count,bean);
		count++;
	}
	return map;

}

public List getPurchaseDetailByGST(HttpServletRequest request,
		HttpServletResponse response) {
	String fDate = request.getParameter("gstFisDate");
    String tDate = request.getParameter("gstEndDate");
	
    Map<Long,PurchaseDetailsFromGoodsReceive> map = new HashMap<Long,PurchaseDetailsFromGoodsReceive>();
	
    GoodsReceiveDao dao = new GoodsReceiveDao();
	List<PurchaseDetailsFromGoodsReceive> exp1List = dao.getPurchaseReportsASPerGST(fDate,tDate);
	
	return exp1List;


}

public List getPurchaseReturnDetailsAsPerSupplierName(
		HttpServletRequest request, HttpServletResponse response) {
	String supplier = request.getParameter("supplier");
	//String firstDate = request.getParameter("firstDate");
	//String secondDate = request.getParameter("secondDate");
	
	System.out.println(supplier+"= = = Supplier in Helper");
	
    Map<Long,PurchaseDetailsFromGoodsReceive> map = new HashMap<Long,PurchaseDetailsFromGoodsReceive>();
		
    GoodsReceiveDao dao = new GoodsReceiveDao();
	//List<PurchaseDetailsFromGoodsReceive> expList = dao.getPurchaseReturnDetailsForSupplier(supplier,firstDate,secondDate);
	List<PurchaseDetailsFromGoodsReceive> expList = dao.getPurchaseReturnDetailsForSupplier(supplier);
		
		
	return expList;
}

public List creditCustomerSaleReportBillAndNameWise(HttpServletRequest request, HttpServletResponse response)
{
	
	String creditCustBillNo = request.getParameter("creditCustBillNo");
	//System.out.println("bill_no From Helper === "+creditCustBillNo);
    Map<Long,SaleReports> map = new HashMap<Long,SaleReports>();
		
    GoodsReceiveDao dao = new GoodsReceiveDao();
    List<SaleReports> creditCustSaleReports = dao.creditCustomerSaleReportBillAndNameWise(creditCustBillNo);
    return creditCustSaleReports;
	
}

//GST Sale Summary 
public List saleGstReturnReportsBetweenTwoDates(
		HttpServletRequest request, HttpServletResponse response) {


	
	String fDate = request.getParameter("gstFisDate1");
	String sDate = request.getParameter("gstEndDate1");
	
	System.out.println(fDate+"fDate in Helper");
	System.out.println(sDate+"sDate in Helper");
	
   Map<Long,SaleReports> map = new HashMap<Long,SaleReports>();
		
   GoodsReceiveDao dao = new GoodsReceiveDao();
		List<SaleReports> expList = dao.saleGstReturnReportsBetweenTwoDates(fDate,sDate);	
		
		return expList;
}

public List purchaseGstReturnReportsBetweenTwoDates(
		HttpServletRequest request, HttpServletResponse response)
{


	System.out.println("helper called");
	
	String supplierId = request.getParameter("supplierId");
	String fDate = request.getParameter("gstFisDate1");
	String sDate = request.getParameter("gstEndDate1");
	
	System.out.println(fDate+"fDate in Helper");
	System.out.println(sDate+"sDate in Helper");
	
   Map<Long,SaleReports> map = new HashMap<Long,SaleReports>();
		
   GoodsReceiveDao dao = new GoodsReceiveDao();
		List<SaleReports> expList = dao.purchaseGstReturnReportsBetweenTwoDates(supplierId,fDate,sDate);	
		
		return expList;
}


public List billWiseSaleReportForGrossTotalHelper(
		HttpServletRequest request, HttpServletResponse response) {


	
	String fDate = request.getParameter("gstFisDate1");
	String sDate = request.getParameter("gstEndDate1");
	
	System.out.println(fDate+"fDate in Helper");
	System.out.println(sDate+"sDate in Helper");
	
   Map<Long,SaleReports> map = new HashMap<Long,SaleReports>();
		
   GoodsReceiveDao dao = new GoodsReceiveDao();
		List<SaleReports> expList = dao.billWiseSaleReportForGrossTotalDao(fDate,sDate);	
		
		return expList;
}

public List cashCustomerSaleReportBillAndNameWise(HttpServletRequest request, HttpServletResponse response)
{
	
	String creditCustBillNo = request.getParameter("cashCustBillNo");
	//System.out.println("bill_no From Helper === "+creditCustBillNo);
    Map<Long,SaleReports> map = new HashMap<Long,SaleReports>();
    
    GoodsReceiveDao dao = new GoodsReceiveDao();
    List<SaleReports> creditCustSaleReports = dao.cashCustomerSaleReportBillAndNameWise(creditCustBillNo);
    return creditCustSaleReports;
	
}

public List rangeWiseBillPaidUnpaidHelper(HttpServletRequest request,
		HttpServletResponse response) {
	
	String FirstDate7 = request.getParameter("FirstDate7");
	String EndDate7 = request.getParameter("EndDate7");	
	
	
     Map<Long,PurchaseDetailsFromGoodsReceive> map = new HashMap<Long,PurchaseDetailsFromGoodsReceive>();
		
     GoodsReceiveDao dao = new GoodsReceiveDao();
		List<PurchaseDetailsFromGoodsReceive> expList = dao.rangeWiseBillPaidUnpaidDao(FirstDate7, EndDate7);
		
		return expList;
}

public Map getProfitAndLosstBetweenTwoDatesHelper(String startDate, String endDate)
{	
 	System.out.println("into helper class");
 	GoodsReceiveDao dao1 = new GoodsReceiveDao();
	List catList = dao1.getProfitAndLosstBetweenTwoDatesDao(startDate, endDate);
	
	Map  map =  new HashMap();
	for(int i=0;i<catList.size();i++)
	{
		Object[] o = (Object[])catList.get(i);
		ProfitAndLoss bean = new ProfitAndLoss();
		
		bean.setId(o[0].toString());
		if(o[1] == null)
		{
			bean.setExpensesAmount("0.00");
		}
		else
		{
			bean.setExpensesAmount(o[1].toString());
		}

		if(o[2] == null)
		{
			bean.setTransAndLabourexpenses("0.00");
		}
		else
		{
			bean.setTransAndLabourexpenses(o[2].toString());
		}
		System.out.println("`````````````````````` ```` ```` bean.getExpensesAmount() -   "+bean.getExpensesAmount()+"  , bean.getTransAndLabourexpenses() -  "+bean.getTransAndLabourexpenses());
		map.put(bean.getId(),bean);
	}
	System.out.println("out of helper return map : "+map);
	return map;
}

public Map getProfitAndLosstBetweenTwoDatesOExpenseHelper(String startDate, String endDate)
{	
 	System.out.println("into helper class");
 	GoodsReceiveDao dao1 = new GoodsReceiveDao();
	List catList = dao1.getProfitAndLosstBetweenTwoDatesOExpenseDao(startDate, endDate);
	
	Map  map =  new HashMap();
	for(int i=0;i<catList.size();i++)
	{
		Object[] o = (Object[])catList.get(i);
		ProfitAndLoss bean = new ProfitAndLoss();
		
		bean.setId(o[0].toString());
		if(o[0] == null)
		{}

		if(o[1] == null)
		{
			bean.setOtherExpenses("0.00");
		}
		else
		{
			bean.setOtherExpenses(o[1].toString());
		}
		
		map.put(bean.getId(),bean);
	}
	System.out.println("out of helper return map : "+map);
	return map;
}

public Map getProfitAndLosstBetweenTwoDatesSaleAmountHelper(String startDate, String endDate)
{	
 	System.out.println("into helper class");
 	GoodsReceiveDao dao1 = new GoodsReceiveDao();
	List catList = dao1.getProfitAndLosstBetweenTwoDatesSaleAmountDao(startDate, endDate);
	
	Map  map =  new HashMap();
	for(int i=0;i<catList.size();i++)
	{
		Object[] o = (Object[])catList.get(i);
		ProfitAndLoss bean = new ProfitAndLoss();
		
		bean.setId(o[0].toString());
		if(o[0] == null)
		{}

		if(o[1] == null)
		{
			bean.setSaleAmount("0.00");
		}
		else
		{
			bean.setSaleAmount(o[1].toString());
		}
		System.out.println("sale amt - -   get =  "+bean.getSaleAmount());
		map.put(bean.getId(),bean);
	}
	System.out.println("out of helper return map : "+map);
	return map;
}

public Map getPOnumber(HttpServletRequest request) 
{
	String supplierID = request.getParameter("supplierID");
	
	GoodsReceiveDao dao = new GoodsReceiveDao();
	List list = dao.getPONumberbySupplierName(supplierID, request);
	Map  map =  new HashMap();
	
	for(int i=0;i<list.size();i++)
	{
		Object[] o = (Object[])list.get(i);
		GetPODetailsForGoodsReceive bean = new GetPODetailsForGoodsReceive();
		System.out.println("reslt -  "+Arrays.toString(o));
		bean.setBookingNo(Long.parseLong(o[0].toString()));
		bean.setFksuppID(Long.parseLong(o[1].toString()));
		
		System.out.println("***************"+o[0]);
		map.put(bean.getBookingNo(),bean);
	}
	return map;
}



//-----------------------gst no
public Map getgstnumber(HttpServletRequest request) 
{
	String supplierID = request.getParameter("supplierID");
	
	GoodsReceiveDao dao = new GoodsReceiveDao();
	List list = dao.getgstNumberbySupplierName(supplierID, request);
	Map  map =  new HashMap();
	
	for(int i=0;i<list.size();i++)
	{
		Object[] o = (Object[])list.get(i);
		GetPODetailsForGoodsReceive bean = new GetPODetailsForGoodsReceive();
		System.out.println("reslt -  "+Arrays.toString(o));
		bean.setGstno((o[0].toString()));;
		bean.setFksuppID(Long.parseLong(o[1].toString()));
		
		System.out.println("***************"+o[0]);
		map.put(bean.getGstno(),bean);
	}
	return map;
}
// print barcode
public void printBarcode(HttpServletRequest request, HttpServletResponse response)
{
	// TODO Auto-generated method stub
	String barcodeId = request.getParameter("barcodeId");
	System.out.println("barcode No is***************************" + barcodeId);
	String quantity = request.getParameter("quantity");
	long bar = Long.parseLong(barcodeId);
	System.out.println("id is++++++++++++++++++++++++++++++++++++" + bar);

	HibernateUtility hbu = HibernateUtility.getInstance();
	Session session1 = hbu.getHibernateSession();
	/*org.hibernate.Query query = session1.createQuery("from GoodReceive where barcodeNo=:bar");
	query.setParameter("bar", bar);*/
	
	String itemName = "";
	String subCatName = "";
	String salePrice = "";
//	String style = "";
//	String size = "";
	String company = "";
//	String quantity = "";
	
	String barcode = "";
	
//	Query query2 = session1.createSQLQuery("select gr.ItemName, sb.subcat_name, gr.SalePrice, gr.style, gr.size, gr.BarcodeNo from goodreceive gr join sub_categories sb on gr.fkSubCatId=sb.pk_subcat_id where gr.BarcodeNo = "+bar);
	
	Query query2 = session1.createSQLQuery("select gr.product_name, sb.sub_cat_name, gr.sale_price, gr.company_Name, gr.quantity, gr.BarcodeNo from goods_receive gr join sub_categories sb on gr.fk_subCat_id=sb.pk_subcat_id where gr.BarcodeNo=1000 = '"+bar+"'");
	List<Object[]> list = null;
	list = query2.list();
	for (Object[] objects : list)
	{
		itemName = objects[0].toString();
		subCatName = objects[1].toString();
		salePrice = objects[2].toString();
		if(objects[3] == null)
		{
			System.out.println("N/A");
		}
		else
		{
			company = objects[3].toString();
		}
//		size = objects[4].toString();
		barcode = objects[5].toString();
	}

	/*GoodReceive uniqueResult = (GoodReceive) query.uniqueResult();
	String itemName = uniqueResult.getItemName();
	System.out.println("hi this is vikas" + itemName);
	String catName = uniqueResult.getCatName();
	System.out.println("category" + catName);
	Double buyPrice = uniqueResult.getBuyPrice();
	System.out.println("name" + buyPrice);
	Double actualprice = uniqueResult.getSalePrice();
	System.out.println("aPrice" + actualprice);
	String size = uniqueResult.getSize();
	System.out.println(" " + size);
	String purcode = uniqueResult.getPurcode();
	System.out.println(" "+purcode);
	
	String supcode = uniqueResult.getSupCode();
	System.out.println(" "+supcode);*/

	String data6 = String.valueOf(salePrice);
	String xyz = "";
	String adc = "";
	String[] Shreemant = data6.split("");
	for (int a = 0; a < Shreemant.length; a++) {
		System.out.println("shreemant :: " + Shreemant[a]);
		String abc = Shreemant[a];
		if (abc.equals("1")) {
			adc = "N";
		}
		if (abc.equals("2")) {
			adc = "A";
		}
		if (abc.equals("3")) {
			adc = "G";
		}
		if (abc.equals("4")) {
			adc = "P";
		}
		if (abc.equals("5")) {
			adc = "U";
		}
		if (abc.equals("6")) {
			adc = "R";
		}
		if (abc.equals("7")) {
			adc = "C";
		}
		if (abc.equals("8")) {
			adc = "I";
		}
		if (abc.equals("9")) {
			adc = "T";
		}
		if (abc.equals("0")) {
			adc = "Y";
		}
		xyz = xyz.concat(adc);
	}

	try {
		FileInputStream fstream = new FileInputStream("C:/barcose/input.prn");

		BufferedReader br = new BufferedReader(new InputStreamReader(fstream));
		FileWriter fw = new FileWriter("C:/barcose/Output.txt");

		BufferedWriter bw = new BufferedWriter(fw);
		String strLine;
		String str1;
		while ((strLine = br.readLine()) != null)
		{
			if (strLine.equals("@shopName")) {
				str1 = br.readLine();
				strLine = str1 + "\"Style me\"";
			}
			else if (strLine.equals("@product"))
			{
				str1 = br.readLine();
				strLine = str1 + "\"" + itemName + "\"";
			}
			else if (strLine.equals("@quanti"))
			{
				str1 = br.readLine();
				strLine = str1 + "\"" + quantity + "\"";
			}
			else if (strLine.equals("@catName"))
			{
				str1 = br.readLine();
				strLine = str1 + "\"" + subCatName + "\"";
			}
			else if (strLine.equals("@subCatName"))
			{
				str1 = br.readLine();
				strLine = str1 + "\"" + subCatName + "\"";
			}					
			else if (strLine.equals("@barv"))
			{
				str1 = br.readLine();
				//strLine = str1 + "\"" + "!105" + barcodeNo + "\"";
				strLine = str1 + "\"" + "!105" + barcodeId + "\"";
			}
			else if (strLine.equals("@bar"))
			{
				str1 = br.readLine();
				strLine = str1 + "\"" + barcodeId + "\"";
			}
			else if (strLine.equals("@company"))
			{
				str1 = br.readLine();
				strLine = str1 + "\"" + subCatName + "\"";
			}
			else if (strLine.equals("@total"))
			{
				str1 = br.readLine();
				strLine = str1 + "\"" + xyz + "\"";
			}
			else if (strLine.equals("@quantityForNumberOfPrint"))
			{
				str1 = br.readLine();
				strLine = str1 + quantity;
			}
				/*
				 * else if (strLine.equals("@size")) { str1 = br.readLine(); strLine = str1 +
				 * "\"" + size + "\""; }
				 */
			else if (strLine.equals("@company"))
			{
				str1 = br.readLine();
				strLine = str1 + "\"" + company + "\"";
			}					
			else if (strLine.equals("@saleprice"))
			{
				str1 = br.readLine();
				strLine = str1 + "\"" +""+salePrice + "\"";
			}
			/*if (strLine.equals("@product"))
			{
				str1 = br.readLine();
				strLine = str1 + "\"" + itemName + "\"";
			}
			else if (strLine.equals("@quanti"))
			{
				str1 = br.readLine();
				strLine = str1 + "\"" + itemName + "\"";
			}
			else if (strLine.equals("@catName"))
			{
				str1 = br.readLine();
				strLine = str1 + "\"" + itemName + "\"";

			}
			else if (strLine.equals("@barv"))
			{
				str1 = br.readLine();
				strLine = str1 + "\"" + "!105" + bar + "\"";

			}
			else if (strLine.equals("@bar"))
			{
				str1 = br.readLine();
				strLine = str1 + "\"" + bar + "\"";

			}
			else if (strLine.equals("@company"))
			{
				str1 = br.readLine();
				strLine = str1 + "\"" + subCatName + "\"";
			}
			else if (strLine.equals("@total"))
			{
				str1 = br.readLine();
				strLine = str1 + "\"" + xyz + "\"";
			}
			else if (strLine.equals("@quantityForNumberOfPrint"))
			{
				str1 = br.readLine();
				strLine = str1 + quantity;
			}
			else if (strLine.equals("@size"))
			{
				str1 = br.readLine();
				strLine = str1 + "\"" + size + "\"";
			}
			else if (strLine.equals("@saleprice"))
			{
				str1 = br.readLine();
				strLine = str1 + "\"" + "Rs " + salePrice + "\"";
			}*/
			
			System.out.println("xyz is " + xyz);
			System.out.println("catName is " + subCatName);
			System.out.println("Barcode is ++++++++++" + bar);
			System.out.println("itemName is *********" + itemName);
			System.out.println("Sale Price is //////" + salePrice);
//			System.out.println("size is " + size);

			System.out.println(strLine);
			bw.write(strLine + "\r\n");
			}

		bw.close();
		// Close the input stream
		br.close();

		List cmdAndArgs = Arrays.asList("cmd", "/c", "printbatch.bat");
		File dir = new File("C:/barcose");

		ProcessBuilder pb = new ProcessBuilder(cmdAndArgs);
		pb.directory(dir);
		Process p = pb.start();
		/* } */
	} catch (Exception e) {

	}
}
}
