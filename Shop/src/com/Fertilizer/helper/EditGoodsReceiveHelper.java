package com.Fertilizer.helper;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.Fertilizer.bean.GetProductDetailPO;
import com.Fertilizer.dao.EditGoodsReceiveDao;
import com.Fertilizer.dao.GoodsReceiveDao;
import com.Fertilizer.dao.ProductDetailsDao;
import com.Fertilizer.hibernate.EditGoodsReceiveBean;
import com.Fertilizer.hibernate.GoodsReceiveBean;
import com.Fertilizer.hibernate.Stock;
import com.Fertilizer.hibernate.SupplierDetailsBean;
import com.Fertilizer.utility.HibernateUtility;
import com.itextpdf.text.log.SysoCounter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.jfree.util.Log;

public class EditGoodsReceiveHelper {
	
	public Map getAllBillDetailsForEditGoodsReceive(HttpServletRequest request)
	{
		String billNum = request.getParameter("billNum");
		String supplier = request.getParameter("supplier");
		
		EditGoodsReceiveDao dao=new EditGoodsReceiveDao();
		List list1 = dao.getAllBillDetailsForEdit(billNum, supplier, request);
		
		System.out.println(list1.size());
	
		Map map1 = new HashMap();

		if( list1 != null && list1.size() > 0)
		{
			for (int i = 0; i < list1.size(); i++) {
				Object[] o = (Object[]) list1.get(i);
				EditGoodsReceiveBean bean = new EditGoodsReceiveBean();

				bean.setProductID((BigInteger) o[0]);
				bean.setProductName((String) o[1]);
				bean.setManufacturer((String) o[2]);
				bean.setHsn((String) o[3]);
				bean.setWeight((BigDecimal) o[4]);
		//		if(o[5].equals("pcs")) {
		//			bean.setUnitName("Box/pcs");
		//		}else {
					bean.setUnitName((String) o[5]);
		//		}
				bean.setCatIDforVAt((BigInteger) o[6]);
				bean.setSubCatId((BigInteger) o[7]);
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
				bean.setSgst(Double.parseDouble(o[14].toString()));
				bean.setCgst(Double.parseDouble(o[15].toString()));
				bean.setSubCatName(o[16].toString());
				bean.setIgst1(Double.parseDouble(o[17].toString()));
				bean.setDiscount(Double.parseDouble(o[18].toString()));
				bean.setDiscountAmount(Double.parseDouble(o[19].toString()));
				bean.setTotalExTax(Double.parseDouble(o[20].toString()));
				bean.setQuantity(Double.parseDouble(o[21].toString()));
				bean.setTotal(Double.parseDouble(o[22].toString()));
				bean.setBuyPriceEx(o[23].toString());
				bean.setPk_goods_rec_id(Long.parseLong(o[24].toString()));
				
				bean.setUnitvalue(Double.parseDouble(o[25].toString()));
				bean.setSaleunit(o[26].toString());
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
				
				
				bean.setDcNum(BigDecimal.ZERO);
				BigDecimal w = bean.getWeight();
				bean.setWeightAftShortMinus(w);
							
				map1.put(bean.getProductID(), bean);
			}
		}
		return map1;
	}

public Map getBillDetailsForEditGoodReceiveNonGrid(HttpServletRequest request) 
{
	String billNum = request.getParameter("billNum");
	String supplier = request.getParameter("fk_sup_id");
			
	EditGoodsReceiveDao dao=new EditGoodsReceiveDao();
	List list1 = dao.EditGoodReceiveBillDetailsNonGrid(billNum, supplier, request);
	
	System.out.println(list1.size());

	Map map1 = new HashMap();

	if( list1 != null && list1.size() > 0)
	{
		for (int i = 0; i < list1.size(); i++) {
			Object[] o = (Object[]) list1.get(i);
			
			EditGoodsReceiveBean bean = new EditGoodsReceiveBean();

			bean.setExpenseTaxPerc(Double.parseDouble(o[0].toString()));
			Double totaAmt = (Double.parseDouble(o[1].toString())) + (Double.parseDouble(o[3].toString()));
			System.out.println("totaAmt--------------------> "+totaAmt);
			bean.setTotalAmount(totaAmt);
			bean.setDiscPercentage(Double.parseDouble(o[2].toString()));
			bean.setDiscAmount(Double.parseDouble(o[3].toString()));
			Double transExpenseExclTax = Double.parseDouble(o[4].toString()) - Double.parseDouble(o[7].toString());
			System.out.println("transExpenseExclTax--------------------> "+transExpenseExclTax);
			bean.setTransExpenseInclTax(transExpenseExclTax);
			Double hamaliExpenseExclTax = Double.parseDouble(o[5].toString()) - Double.parseDouble(o[8].toString());
			bean.setHamaliExpenseInclTax(hamaliExpenseExclTax);
			bean.setGrossTotal(Double.parseDouble(o[6].toString()));
			bean.setTransExpenseTaxAmt(Double.parseDouble(o[7].toString()));
			bean.setHamaliExpenseTaxAmt(Double.parseDouble(o[8].toString()));
			
			map1.put(bean.getGrossTotal(), bean);
		}
	}
	return map1;
	}

	public void UpdateGoodReceiveBill(HttpServletRequest request,
			HttpServletResponse response) throws ParseException {
		
       Integer count = Integer.parseInt(request.getParameter("count"));
       System.out.println("count - "+count);
     	for (int i = 0; i < count; i++) {
			
			//Grid Data
			String catIDforVAt = request.getParameter("catIDforVAt" + i);
			String productID = request.getParameter("productID" + i);
			String productName = request.getParameter("productName" + i);
			String companyName = request.getParameter("companyName" + i);
			String buyPrice = request.getParameter("buyPrice" + i);
			String buyPriceEx = request.getParameter("buyPriceEx" + i);
			
			String fk_cat_id  = request.getParameter("fk_cat_id");
			System.out.println("fk_cat_id - "+fk_cat_id);
			String fk_shop_id  = request.getParameter("fk_shop_id");
			String catName = request.getParameter("catName");
			System.out.println("fk_shop_id -  "+fk_shop_id+"  catname - "+catName); 
			String salePrice = request.getParameter("salePrice" + i);
			String mrp = request.getParameter("mrp" + i);
			String weight = request.getParameter("weight" + i);
			String quantity = request.getParameter("quantity" + i);
			String subCatId = request.getParameter("subCatId" + i);
			String unitName = request.getParameter("unitName" + i);
			
			String batchNo = request.getParameter("batchNo" + i);
			String expiryDate = request.getParameter("expiryDate" + i);
			String sgst = request.getParameter("sgst" + i);
			String cgst = request.getParameter("cgst" + i);
			String igst1 = request.getParameter("igst1" + i);
			Double gst = Double.parseDouble(cgst)+Double.parseDouble(sgst);
			

			
			String unitvalue = request.getParameter("unitvalue" + i);
			String saleunit = request.getParameter("saleunit" + i);
			Double quan = Double.parseDouble(quantity) * Double.parseDouble(unitvalue);
			System.out.println("quantity "+quantity+" unitvalye -  "+unitvalue+" = quan -  "+quan);
			
			String advancebookingId = request.getParameter("advancebookingId" + i);
			String Discount = request.getParameter("Discount" + i);
			String DiscountAmount = request.getParameter("DiscountAmount" + i);
			String TotalExTax = request.getParameter("TotalExTax" + i);
			String Total = request.getParameter("Total" + i);
			String pk_goods_rec_id = request.getParameter("pk_goods_rec_id" + i);
			System.out.println("pk_goods_rec_id - -    "+pk_goods_rec_id+"  i -  "+i);
			//Non Grid Data
			String supplier = request.getParameter("supplier");
			String billNum = request.getParameter("billNum");
			String gstForExpense2 = request.getParameter("gstForExpense2");
			String total = request.getParameter("total");
			String discount = request.getParameter("discount");
			String discountAmount = request.getParameter("discountAmount");
			String transExpence3 = request.getParameter("transExpence3");         // Incl tax
			String transExpence = request.getParameter("transExpence");
			String hamaliExpence3 = request.getParameter("hamaliExpence3");       //  Incl tax
			String hamaliExpence = request.getParameter("hamaliExpence");
			String grossTotal = request.getParameter("grossTotal");
			HttpSession session2 = request.getSession(true);
			
			String username = (String) session2.getAttribute("user");
			String userid = (String) session2.getAttribute("userid");
			String shopid = (String) session2.getAttribute("shopid");
			String shopName = (String) session2.getAttribute("shopName");
			/*---------------------- Code For Update GoodReceive ---------------------------------*/
			System.out.println("if pk id ==0  "+pk_goods_rec_id.equals("0"));
			if((pk_goods_rec_id.equals("0"))) {
				
				
				  GoodsReceiveBean updateGR = new GoodsReceiveBean();
				  updateGR.setUnit(unitName);
				  updateGR.setBuyPrice(Double.parseDouble(buyPrice));
				  updateGR.setBuyPriceEx(Double.parseDouble(buyPriceEx)); 
				  updateGR.setSalePrice(Double.parseDouble(salePrice)); 
				  updateGR.setMrp(Double.parseDouble(mrp));
				  updateGR.setWeight(Double.parseDouble(weight));
				  updateGR.setQuantity(Double.parseDouble(quantity));
				  updateGR.setDupQuantity(Double.parseDouble(quantity));
				  updateGR.setSgst(Double.parseDouble(sgst));
				  updateGR.setCgst(Double.parseDouble(cgst));
				  updateGR.setTaxPercentage(gst);
				  updateGR.setiGstPercentage(Double.parseDouble(igst1));
				  updateGR.setDiscPercPerProduct(Double.parseDouble(Discount));
				  updateGR.setDiscAmtPerProduct(Double.parseDouble(DiscountAmount));
				  updateGR.setTotalExclTaxperProduct(Double.parseDouble(TotalExTax));
				  updateGR.setPerProductTotal(Double.parseDouble(Total));
				  
				  updateGR.setExpenseTaxPerc(new Integer(gstForExpense2));
				  
				  if (productID == null) {	
						updateGR.setPkPOId(0l);
					}
					else {
						updateGR.setPkPOId(Long.parseLong(productID));
					}
				  
					if(companyName==null){
						updateGR.setCompanyName("NA");
					}
					else{
						updateGR.setCompanyName(companyName);
					}
					
					productName = request.getParameter("productName"+i);
					if(productName==null){
						updateGR.setProductName("NA");
					}
					else{
						updateGR.setProductName(productName);
					}
				  
					updateGR.setSupplier(Long.parseLong(supplier));
					System.out.println("fk sipp id -  "+updateGR.getSupplier());
//					updateGR.setTotalAmount(Double.parseDouble(total) - Double.parseDouble(discountAmount));
					//bean.setFkCategoryId(Long.parseLong(fk_cat_id));
					//System.out.println(fk_cat_id);

					updateGR.setFk_subCat_id(Long.parseLong(subCatId));
					System.out.println("subCatId-  "+subCatId+" , &  set "+updateGR.getFk_subCat_id());
					
//					updateGR.setFkCategoryId(Long.parseLong(fk_cat_id));
					updateGR.setFkCategoryId(Long.parseLong(catIDforVAt));
					
					System.out.println("set fk categoryy - "+updateGR.getFkCategoryId());
					updateGR.setFk_shop_id(Long.parseLong(fk_shop_id));
				/*
				 * SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd"); Date newDate =
				 * null; try { newDate = format.parse(purchaseDate); } catch (ParseException e1)
				 * { e1.printStackTrace(); } updateGR.setPurchaseDate(newDate);
				 */
					Date date = new Date();
					updateGR.setInsertDate(date);		
					updateGR.setPurchaseDate(date);

					
					String ShopNameWithoutId1 = shopName.substring(4);
					String onlyShopName = ShopNameWithoutId1.trim();
					updateGR.setBatchNo("NA");
					updateGR.setFkuserid(Long.parseLong(userid));
					updateGR.setUserName(username);
					updateGR.setShopName(onlyShopName);
					updateGR.setExpenses(0d);
					updateGR.setBookingID(0l);
					updateGR.setStockPerEntry(1d);
					updateGR.setBarcode_id("0000");
					updateGR.setBarcodeNo(0l);
				  //updateGR.setGrossTotal(Double.parseDouble(grossTotal));
				  
					if(buyPriceEx == null || buyPriceEx.equalsIgnoreCase("") || buyPriceEx.isEmpty())
					{
						updateGR.setBuyPriceEx(0.0);	
					}else {
						updateGR.setBuyPriceEx(Double.parseDouble(buyPriceEx));
					}
					
					if(Discount == null || Discount.equalsIgnoreCase("") || Discount.isEmpty())
					{
						Discount = "0.0";			
					}else {
						updateGR.setDiscPercPerProduct(Double.parseDouble(Discount));
					}
					if(DiscountAmount == null || DiscountAmount.equalsIgnoreCase("") || DiscountAmount.isEmpty())
					{
						updateGR.setDiscAmtPerProduct(0.0);	
					}else {
						updateGR.setDiscAmtPerProduct(Double.parseDouble(DiscountAmount));
					}
					
					
					if(cgst == null || cgst.equalsIgnoreCase("") || cgst.isEmpty())
					{
						cgst = "0.0";			
					}else {
						updateGR.setCgst(Double.parseDouble(cgst));
					}
					if(sgst == null || sgst.equalsIgnoreCase("") || sgst.isEmpty())
					{
						sgst = "0.0";			
					}else {
						updateGR.setSgst(Double.parseDouble(sgst));
					}

					String unit = request.getParameter("unitName"+i);
					updateGR.setBarcodeNo(0l);
				if (productID == null) {	
					break;
				}
				else {
					updateGR.setPkPOId(Long.parseLong(productID));
				}
				
				companyName = request.getParameter("companyName"+i);
				if(companyName==null){
					break;
				}
				else{
					updateGR.setCompanyName(companyName);
				}
				
				productName = request.getParameter("productName"+i);
				if(productName==null){
					break;
				}
				else{
					updateGR.setProductName(productName);
				}
				
//				String buyPrice = request.getParameter("buyPrice"+i);
				
	
				String quantity1= request.getParameter("quantity"+i);
				
				if(weight==null){
					break;
				}
				else{
					updateGR.setWeight(Double.parseDouble(weight));
				}
				

					

				updateGR.setQuantity(Double.parseDouble(quantity));
				updateGR.setDupQuantity(Double.parseDouble(quantity));

				  
				  
				  
				  /////////////////////////////////////
				  if(discount == "") {
					  updateGR.setDiscount(0.0);
				  }else {
					  updateGR.setDiscount(Double.parseDouble(discount));
				  }
				 if(discountAmount == "") {
					 updateGR.setDiscountAmount(0.0);
					 updateGR.setTotalAmount(Double.parseDouble(total));
					 updateGR.setBillPaymentPending(Double.parseDouble(total));
				 }else {
					 updateGR.setDiscountAmount(Double.parseDouble(discountAmount));
					 Double totAmtafterDisc = Double.parseDouble(total) - Double.parseDouble(discountAmount);
					 updateGR.setTotalAmount(totAmtafterDisc);
					 updateGR.setBillPaymentPending(Double.parseDouble(total) - Double.parseDouble(discountAmount));
				 }
				 if(transExpence3 == "") {
					 updateGR.setTransExpenseIncTax(0.0);
				 }else {
					 Double transInclTax = Double.parseDouble(transExpence3) + Double.parseDouble(transExpence);
					 updateGR.setTransExpenseIncTax(transInclTax);
				 }
				 if(transExpence == "") {
					 updateGR.setTransExpenceTaxAmt(0.0); 
				 }else {
					 updateGR.setTransExpenceTaxAmt(Double.parseDouble(transExpence)); 
				 }
				 if(hamaliExpence3 == "") {
					 updateGR.setHamaliExpenseIncTax(0.0);
				 }else {
					 Double hamaliInclTax = Double.parseDouble(hamaliExpence3) + Double.parseDouble(hamaliExpence);
					 updateGR.setHamaliExpenseIncTax(hamaliInclTax);
				 }
				 if(hamaliExpence == "") {
					 updateGR.setHamaliExpenceTaxAmt(0.0);
				 }else {
					 updateGR.setHamaliExpenceTaxAmt(Double.parseDouble(hamaliExpence));
				 }
				 
				    Double gstPerc = gst;
					Double igstPerc = Double.parseDouble(igst1);
					Double tota = Double.parseDouble(buyPrice) * Double.parseDouble(quantity);
					
					if(gstPerc == 0.0 && igstPerc == 0.0)
					{
						updateGR.setTaxAmount(0.0);
					}
					if(gstPerc != 0.0)
					{
						Double gsttaxAmnt= ((gstPerc/100)*(tota));
						updateGR.setTaxAmount(gsttaxAmnt);
						
						tota = tota-gsttaxAmnt;
					}
					else if(igstPerc != 0.0)
					{
						Double igsttaxAmnt=((igstPerc/100)*(tota));
						updateGR.setTaxAmount(igsttaxAmnt);
					
						tota = tota-igsttaxAmnt;
					}
					 if(grossTotal != null){
						  updateGR.setGrossTotal(Double.parseDouble(grossTotal));
						  }
						else{
							updateGR.setGrossTotal(0.0);
							updateGR.setBillPaymentPending(0.0);
						}
				
						if(billNum == null){
							updateGR.setBillNum("N/A");
						}
						else{
							updateGR.setBillNum(billNum);
						}
					
						updateGR.setSupplier(Long.parseLong(supplier));
						
			System.out.println("supp -  "+updateGR.getSupplier()+" bill - "+updateGR.getBillNum());
			
			GoodsReceiveDao dao = new GoodsReceiveDao();
			dao.editGoodsReceive(updateGR);
			}
			else {
	
			HibernateUtility hbu = null;
			Session session = null;
			Transaction transaction = null;
			
			
			   hbu = HibernateUtility.getInstance(); 
			   session = hbu.getHibernateSession();
			   transaction = session.beginTransaction();
			  
			  GoodsReceiveBean updateGR = (GoodsReceiveBean) session.get(GoodsReceiveBean.class,new Long(pk_goods_rec_id));
			  
			  updateGR.setBuyPrice(Double.parseDouble(buyPrice));
			  updateGR.setBuyPriceEx(Double.parseDouble(buyPriceEx)); 
			  updateGR.setSalePrice(Double.parseDouble(salePrice)); 
			  updateGR.setMrp(Double.parseDouble(mrp));
			  updateGR.setWeight(Double.parseDouble(weight));
			  updateGR.setQuantity(Double.parseDouble(quantity));
			  updateGR.setDupQuantity(Double.parseDouble(quantity));
			  updateGR.setSgst(Double.parseDouble(sgst));
			  updateGR.setCgst(Double.parseDouble(cgst));
			  updateGR.setTaxPercentage(gst);
			  updateGR.setiGstPercentage(Double.parseDouble(igst1));
			  updateGR.setDiscPercPerProduct(Double.parseDouble(Discount));
			  updateGR.setDiscAmtPerProduct(Double.parseDouble(DiscountAmount));
			  updateGR.setTotalExclTaxperProduct(Double.parseDouble(TotalExTax));
			  updateGR.setPerProductTotal(Double.parseDouble(Total));
			  
			  updateGR.setExpenseTaxPerc(new Integer(gstForExpense2));
			  
			 
			  //updateGR.setGrossTotal(Double.parseDouble(grossTotal));
			  
			  if(discount == "") {
				  updateGR.setDiscount(0.0);
			  }else {
				  updateGR.setDiscount(Double.parseDouble(discount));
			  }
			 if(discountAmount == "") {
				 updateGR.setDiscountAmount(0.0);
				 updateGR.setTotalAmount(Double.parseDouble(total));
				 updateGR.setBillPaymentPending(Double.parseDouble(total));
			 }else {
				 updateGR.setDiscountAmount(Double.parseDouble(discountAmount));
				 Double totAmtafterDisc = Double.parseDouble(total) - Double.parseDouble(discountAmount);
				 updateGR.setTotalAmount(totAmtafterDisc);
				 updateGR.setBillPaymentPending(Double.parseDouble(total) - Double.parseDouble(discountAmount));
			 }
			 if(transExpence3 == "") {
				 updateGR.setTransExpenseIncTax(0.0);
			 }else {
				 Double transInclTax = Double.parseDouble(transExpence3) + Double.parseDouble(transExpence);
				 updateGR.setTransExpenseIncTax(transInclTax);
			 }
			 if(transExpence == "") {
				 updateGR.setTransExpenceTaxAmt(0.0); 
			 }else {
				 updateGR.setTransExpenceTaxAmt(Double.parseDouble(transExpence)); 
			 }
			 if(hamaliExpence3 == "") {
				 updateGR.setHamaliExpenseIncTax(0.0);
			 }else {
				 Double hamaliInclTax = Double.parseDouble(hamaliExpence3) + Double.parseDouble(hamaliExpence);
				 updateGR.setHamaliExpenseIncTax(hamaliInclTax);
			 }
			 if(hamaliExpence == "") {
				 updateGR.setHamaliExpenceTaxAmt(0.0);
			 }else {
				 updateGR.setHamaliExpenceTaxAmt(Double.parseDouble(hamaliExpence));
			 }
			 
			    Double gstPerc = gst;
				Double igstPerc = Double.parseDouble(igst1);
				Double tota = Double.parseDouble(buyPrice) * Double.parseDouble(quantity);
				
				if(gstPerc == 0.0 && igstPerc == 0.0)
				{
					updateGR.setTaxAmount(0.0);
				}
				if(gstPerc != 0.0)
				{
					Double gsttaxAmnt= ((gstPerc/100)*(tota));
					updateGR.setTaxAmount(gsttaxAmnt);
					
					tota = tota-gsttaxAmnt;
				}
				else if(igstPerc != 0.0)
				{
					Double igsttaxAmnt=((igstPerc/100)*(tota));
					updateGR.setTaxAmount(igsttaxAmnt);
				
					tota = tota-igsttaxAmnt;
				}
				 if(grossTotal != null){
					  updateGR.setGrossTotal(Double.parseDouble(grossTotal));
					  }
					else{
						updateGR.setGrossTotal(0.0);
						updateGR.setBillPaymentPending(0.0);
					}
			 
			    session.saveOrUpdate(updateGR);
				transaction.commit();
			}
				// For Stock Details Change
				
				System.out.println("<================================ STOCK UPDATE AFTER EDIT GOODS RECEIVE ===============================>");
				
				HibernateUtility hbu1 = null;
				Session session1 = null;
				Transaction transaction1 = null;
				
				try {
					 
					Long pk_product_id;
					Long stock_id;
					Double avaQty;
					Double totalboxQty;
				 					
					hbu1 = HibernateUtility.getInstance();
					session1 = hbu1.getHibernateSession();
					transaction1 = session1.beginTransaction();
					
					Query query1 = session1.createSQLQuery("SELECT productId, PkStockId, avail_Quantity, total_kg_ltr_piece_stock from stock_detail where productId = '" + productID + "' AND Weight = '"+weight+"' fk_shop_id = '"+shopid+"'");

					List<Object[]> list1 = query1.list();
					
					for (Object[] object : list1)
					{
						pk_product_id = Long.parseLong(object[0].toString());
						stock_id = Long.parseLong(object[1].toString());
						avaQty = Double.parseDouble(object[2].toString());
						totalboxQty = Double.parseDouble(object[3].toString());
						
						Stock Stock = (Stock)session1.get(Stock.class, new Long(pk_product_id));
										
						Stock.setQuantity((quan));
						Stock.setTotalKgLtrPieceQuantity((quan));
					
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
		
	}
	
	public Map getallbillnumber(HttpServletRequest request) 
	{
		String fk_supp_id = request.getParameter("fk_supp_id");

		int count = 1;
		System.out.println("Supplier ID === == ===> " + fk_supp_id);

		EditGoodsReceiveDao cdd = new EditGoodsReceiveDao();
		List list = cdd.getAllbillnumber(fk_supp_id, request);

		System.out.println("list ======" + list.size());
		Map map = new HashMap();
		for (int i = 0; i < list.size(); i++) {
			
			System.out.println("IN HELPER");
			Object[] o = (Object[]) list.get(i);
			EditGoodsReceiveBean bean = new EditGoodsReceiveBean();
			
			bean.setBillNumber1(o[0].toString());
			//bean.setBillNumber(Long.parseLong(o[0].toString()));
		    bean.setProductName(o[1].toString());
			System.out.println("***************" + o[0]);
			map.put(count, bean);
			count++;
		}
		return map;
	}


}
