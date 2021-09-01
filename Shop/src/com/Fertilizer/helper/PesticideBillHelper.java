package com.Fertilizer.helper;

import java.math.BigInteger;
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
import com.Fertilizer.bean.StockDetail;
import com.Fertilizer.dao.PesticideBillDao;
import com.Fertilizer.dao.SeedPesticideBillDAO;
import com.Fertilizer.hibernate.PesticideBillBean;
import com.Fertilizer.hibernate.SaleReturnBean;
import com.Fertilizer.hibernate.SeedPesticideBillBean;
import com.Fertilizer.hibernate.Stock;
import com.Fertilizer.utility.HibernateUtility;

public class PesticideBillHelper {
	Long customerBill;

	public void addPesticideBilling(HttpServletRequest request, HttpServletResponse response) {

		Long billNoForPdf;

		PesticideBillDao dao = new PesticideBillDao();

		List bill = dao.getPesticideCustomerBill();

		for (int i = 0; i < bill.size(); i++) {
			CustomerBillBean sa = (CustomerBillBean) bill.get(i);
			customerBill = sa.getBillNo();
			System.out.println(customerBill);

			customerBill++;
			System.out.println(customerBill);

		}
		int count = Integer.parseInt(request.getParameter("count"));
		System.out.println(count);

		PesticideBillBean bean = new PesticideBillBean();

		for (int i = 0; i < count; i++) {

			if (customerBill == null) {
				bean.setBillNo(1l);
				billNoForPdf = 1l;
			} else {
				bean.setBillNo(customerBill);
				billNoForPdf = customerBill;
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
			// String batchNum = request.getParameter("batchNum");
			String stock = request.getParameter("stock");

			String SeedcreditCustomerName = request.getParameter("creditCustomerName");

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
			String fkGoodsReceiveId = request.getParameter("PkGoodreceiveId" + i);
			String supplierId = request.getParameter("supplier_id" + i);
			String catId = request.getParameter("cat_id" + i);
			String proName = request.getParameter("itemName" + i);
			String barcode = request.getParameter("barcodeNo" + i);
			String quantity = request.getParameter("quantity" + i);
			String mrp = request.getParameter("mrp" + i);
			String salePrice = request.getParameter("salePrice" + i);
			String totalPerProductInGrid = request.getParameter("total" + i);
			String taxPercentage = request.getParameter("vatPercentage" + i);
			String company = request.getParameter("companyName" + i);
			String weight = request.getParameter("weight" + i);
			String expiry = request.getParameter("expiryDate" + i);
			String batchNum = request.getParameter("batchNumber" + i);

			if (batchNum != null) {
				bean.setBatchNumber(batchNum);
			} else {
				bean.setBatchNumber("N/A");
			}

			if (expiry != null) {
				bean.setExpiryDate(expiry);
			} else {
				bean.setExpiryDate("N/A");
			}

			if (fkGoodsReceiveId != null) {
				bean.setFkGoodsReceive(Long.parseLong(fkGoodsReceiveId));
			} else {
				bean.setFkGoodsReceive(0l);
			}
			if (supplierId != null) {
				bean.setSupplierId(Long.parseLong(supplierId));
			} else {
				bean.setSupplierId(0l);
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
			if (barcode != null) {
				bean.setBarcode(Long.parseLong(barcode));
			} else {
				bean.setBarcode(0l);
			}
			if (quantity != null) {
				bean.setQuantity(Long.parseLong(quantity));
				bean.setQuantityAfterReturn(Long.parseLong(quantity));
			} else {
				bean.setQuantity(0l);
				bean.setQuantityAfterReturn(0l);
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
						bean.setCheckNo(checkNum);
					} else {
						bean.setCheckNo("N/A");
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

			dao.addPesticideBillingInDAO(bean);

			// code for set billno and name in application context for BIll PDF

			HttpSession billNoSession = request.getSession();
			billNoSession.setAttribute("pestiBillNo", billNoForPdf);
			billNoSession.setAttribute("PesticreditCustomerName", SeedcreditCustomerName);

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

				Query query1 = session1.createSQLQuery(
						"select PkStockId , Quantity from stock_detail where ProductName=:product_name AND CompanyName=:company_Name And Weight =:weight AND batch_number=:batchNum");
				query1.setParameter("product_name", proName);
				query1.setParameter("company_Name", company);
				query1.setParameter("weight", weight);
				query1.setParameter("batchNum", batchNum);
				System.out.println("proName in stock update == == == =" + proName);
				System.out.println("company in stock update == == == =" + company);
				System.out.println("weight in stock update == == == =" + weight);
				System.out.println("batchNum in stock update == == == =" + batchNum);

				List<Object[]> list1 = query1.list();
				System.out.println("list size in stock update == == == =" + list1.size());

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

	public Map getAllPesticideBillDetailsByBillNo(String bill_no) {

		// TODO Auto-generated method stub
		PesticideBillDao dao = new PesticideBillDao();
		List list = dao.getAllPestiBilingDetailByBillNo(bill_no);
		System.out.println(list.size());
		Map map1 = new HashMap();

		for (int i = 0; i < list.size(); i++) {
			Object[] o = (Object[]) list.get(i);
			FertiSaleReturn bean = new FertiSaleReturn();
			bean.setPkPesticideBillingId((BigInteger) o[0]);
			bean.setCatId((BigInteger) o[1]);
			bean.setCustomerName(o[2].toString());
			bean.setProductName(o[3].toString());
			bean.setCompany(o[4].toString());
			bean.setWeight(Double.parseDouble(o[5].toString()));
			bean.setBatchNo(o[6].toString());
			bean.setSalePrice(Double.parseDouble(o[7].toString()));
			bean.setMrp(Double.parseDouble(o[8].toString()));
			// bean.setQuantity(0l);
			bean.setAvailbleQuantity((BigInteger) o[9]);
			bean.setTotalInGrid(Double.parseDouble(o[10].toString()));
			bean.setBarcode((BigInteger) o[11]);
			bean.setAadhar((BigInteger) o[12]);
			bean.setInsertDate(o[13].toString());
			bean.setCustomerHiddenName(o[14].toString());
			bean.setTaxPercentage(Double.parseDouble(o[15].toString()));
			// bean.setSalepriceEx(Double.parseDouble(o[16].toString()));
			// bean.setDiscount(Double.parseDouble(o[17].toString()));
			// bean.setDiscAmt(Double.parseDouble(o[18].toString()));
			// bean.setTotalEx(Double.parseDouble(o[19].toString()));
			// bean.setTotal(Double.parseDouble(o[19].toString()));

			/* bean.setFk_unit_id((BigInteger)o[5]); */
			// bean.setQuantity(0l);
			// System.out.println("***************"+o[0]+"\t"+o[5]);
			map1.put(bean.getPkPesticideBillingId(), bean);
		}
		return map1;

	}

	/*
	 * ///credit billing for sale return////////////////
	 * 
	 * public Map getAllCreditBillDetailsByBillNo(String bill_no) {
	 * 
	 * 
	 * // TODO Auto-generated method stub PesticideBillDao dao = new
	 * PesticideBillDao(); List list =
	 * dao.getAllCreditBilingDetailByBillNo(bill_no);
	 * System.out.println(list.size()); Map map1 = new HashMap();
	 * 
	 * for(int i=0;i<list.size();i++) { Object[] o = (Object[])list.get(i);
	 * FertiSaleReturn bean = new FertiSaleReturn();
	 * bean.setPkPesticideBillingId((BigInteger)o[0]);
	 * bean.setCatId((BigInteger)o[1]); bean.setCustomerName(o[2].toString());
	 * bean.setProductName(o[3].toString()); bean.setCompany(o[4].toString());
	 * bean.setWeight(Double.parseDouble(o[5].toString()));
	 * bean.setBatchNo(o[6].toString());
	 * bean.setSalePrice(Double.parseDouble(o[7].toString()));
	 * bean.setMrp(Double.parseDouble(o[8].toString())); //bean.setQuantity(0l);
	 * bean.setAvailbleQuantity((BigInteger)o[9]);
	 * bean.setTotalInGrid(Double.parseDouble(o[10].toString()));
	 * bean.setBarcode((BigInteger)o[11]); bean.setAadhar((BigInteger)o[12]);
	 * bean.setInsertDate(o[13].toString());
	 * bean.setCustomerHiddenName(o[14].toString());
	 * bean.setTaxPercentage(Double.parseDouble(o[15].toString()));
	 * //bean.setSalepriceEx(Double.parseDouble(o[16].toString()));
	 * //bean.setDiscount(Double.parseDouble(o[17].toString()));
	 * //bean.setDiscAmt(Double.parseDouble(o[18].toString()));
	 * //bean.setTotalEx(Double.parseDouble(o[19].toString()));
	 * //bean.setTotal(Double.parseDouble(o[19].toString()));
	 * 
	 * 
	 * 
	 * bean.setFk_unit_id((BigInteger)o[5]); //bean.setQuantity(0l);
	 * //System.out.println("***************"+o[0]+"\t"+o[5]);
	 * map1.put(bean.getPkPesticideBillingId(),bean); } return map1;
	 * 
	 * 
	 * }
	 */

	// pesticide sale return
	public void pesticideSaleReturnAsPerBillNo(HttpServletRequest request, HttpServletResponse response) {

		// TODO Auto-generated method stub
		Integer count = Integer.parseInt(request.getParameter("count"));
		for (int i = 0; i < count; i++) {
			String bill_no = request.getParameter("bill_no");
			String aadhar = request.getParameter("aadhar" + i);
			String customerName = request.getParameter("customerName" + i);
			String saleDate = request.getParameter("insertDate" + i);
			String pkPesticideBillingId = request.getParameter("pkPesticideBillingId" + i);
			String availbleQuantity = request.getParameter("availbleQuantity" + i);
			String productName = request.getParameter("productName" + i);
			String company = request.getParameter("company" + i);
			String weight = request.getParameter("weight" + i);
			String quantity = request.getParameter("quantity1" + i);
			String salePrice = request.getParameter("salePrice" + i);
			String batchNo = request.getParameter("batchNo" + i);
			String taxPercentage = request.getParameter("taxPercentage" + i);
			String mrp = request.getParameter("mrp" + i);
			System.out.println("taxPercentage = =" + taxPercentage);
			System.out.println("currnt qunt : " + availbleQuantity);
			System.out.println("return qunt : " + quantity);
			System.out.println("batchNo =" + batchNo);

			System.out.println("pkPesticideBillingId : " + pkPesticideBillingId);
			System.out.println("productName  : " + productName);
			System.out.println("company =" + company);
			System.out.println("weight =" + weight);
			HibernateUtility hbu = null;
			Session session = null;
			Transaction transaction = null;

			try {
				hbu = HibernateUtility.getInstance();
				session = hbu.getHibernateSession();
				transaction = session.beginTransaction();
				List<Object[]> list = null;
				List<StockDetail> stockList = null;
				List<PesticideBillBean> pestiList = null;
				Double stockQuantity = 0.0;
				String QuantityFromStock = null;
				Double newStockQuantity = 0.0;
				Long pkStockId = 0l;
				List<Object[]> list2 = null;
				Double grossTotal = 0.0;
				Long remainingQuantity = (Long) (Long.parseLong(availbleQuantity) - Long.parseLong(quantity));
				System.out.println("remaining qunt : " + remainingQuantity);
				PesticideBillBean updateStock = (PesticideBillBean) session.get(PesticideBillBean.class,
						new Long(pkPesticideBillingId));
				updateStock.setReturnQuantity(Long.parseLong(quantity));
				updateStock.setQuantityAfterReturn(remainingQuantity);

				// stock update
				Query query = session.createSQLQuery("select Quantity,PkStockId FROM stock_detail WHERE ProductName='"
						+ productName + "' AND CompanyName='" + company + "' and Weight ='" + weight
						+ "' AND batch_number=" + batchNo);

				list = query.list();
				stockList = new ArrayList<StockDetail>();
				for (Object[] objects : list) {
					QuantityFromStock = objects[0].toString();
					stockQuantity = Double.parseDouble(QuantityFromStock);

					String pkstock = objects[1].toString();
					pkStockId = Long.parseLong(pkstock);
				}

				Double q = Double.parseDouble(quantity);
				newStockQuantity = stockQuantity + q;
				Query query1 = session.createSQLQuery(
						"UPDATE stock_detail SET Quantity =" + newStockQuantity + " WHERE PkStockId=" + pkStockId);
				query1.executeUpdate();
				// update gross total in pesticide bill table
				// fetch gross total from pesticide bill

				Query query2 = session
						.createSQLQuery("SELECT gross_total,bill_no FROM pesticide_billing WHERE pk_pesticide_bill_id="
								+ pkPesticideBillingId);
				list2 = query2.list();
				pestiList = new ArrayList<PesticideBillBean>();
				for (Object[] objects : list2) {
					grossTotal = Double.parseDouble(objects[0].toString());

				}

				Double salePriceFromGrid = Double.parseDouble(salePrice);
				Double tax = Double.parseDouble(taxPercentage);
				Double taxAmount = (tax / 100) * salePriceFromGrid;
				Double newSalePrice = salePriceFromGrid + taxAmount;
				Double total = Double.parseDouble(quantity) * newSalePrice;
				Double newGrossTotal = grossTotal - total;
				System.out.println("grossTotal = = =" + grossTotal);
				System.out.println("taxAmount = = =" + taxAmount);
				System.out.println("newSalePrice = = =" + newSalePrice);
				System.out.println("newGrossTotal = = =" + newGrossTotal);
				updateStock.setTotalAfterSaleReturn(newGrossTotal);
				updateStock.setReturnAmount(total);
				session.saveOrUpdate(updateStock);
				// add Sale Return to sale_return table
				SaleReturnBean bean = new SaleReturnBean();
				bean.setBillNo(Long.parseLong(bill_no));
				bean.setAadhar(Long.parseLong(aadhar));
				bean.setCustomerName(customerName);
				bean.setFkPesticideBillId(Long.parseLong(pkPesticideBillingId));
				bean.setProductName(productName);
				bean.setFkCatId(2l);
				bean.setBatchNumber(batchNo);
				bean.setSalePrice(Double.parseDouble(salePrice));
				bean.setMrp(Double.parseDouble(mrp));
				bean.setTaxPercentage(Double.parseDouble(taxPercentage));
				bean.setAvailableQuantity(Double.parseDouble(availbleQuantity));
				bean.setReturnQuantity(Double.parseDouble(quantity));
				bean.setWeight(Double.parseDouble(weight));
				bean.setCompany(company);
				bean.setReturnAmount(total);
				bean.setSaleDate(saleDate);
				bean.setFkFertilizerBillId(0l);
				bean.setFkSeedBillId(0l);
				SimpleDateFormat dateFormat1 = new SimpleDateFormat("yyyy-MM-dd");
				Date dateobj = new Date();
				System.out.println(dateFormat1.format(dateobj));
				bean.setReturnDate(dateobj);

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

}
