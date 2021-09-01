package com.Fertilizer.bean;

import java.io.Serializable;
import java.util.Date;

public class ChallanBean implements Serializable {
	
	private Long pkfertilizerBillId;
	private String customerName;
	private String customerHiddenName;
	private Long fkCreditCustomerId;
	private String village;
	private Long contact;
	private Long aadhar;
	private Double transExpense;
	private Double hamaliExpense;
	private Double total;
	private Double grossTotal;
	private Double totalAfterSaleReturn;
	private Double returnAmount;
	private Double productRateWithoutTax;
	private String paymentMode;
	private String nameOnCheck;
	private Long checkNo;
	private Long cardNo;
	private Long discount;
	private Double discountAmount;
	private Double taxAmount;
	private String accNo;
	private String gstNo;
	private String bankName;
	private Long fk_shop_id;
	private Long userid;
	private String username;
	private String shopName1;

	
	private Long catId;
	private Long subCatId;
	private Long supplierId;
	private Long fkGoodsReceive;
	private Long barcode;
	private String productName;
	private String company;
	private Double salePrice;
	private Double mrp;
	private Long quantity;
	private Double totalInGrid;
	private Double taxPercentage;
	private Double weight;
	private Long billNo;
	private Date insertDate;
	private String expiryDate;
	private Long pkSeedPesticideBillId;
	private Long returnQuantity;
	private Long quantityAfterReturn;
	private String hsn;
	private Double iGst;
	private Double billPaymentPending;
	private Date saleDate;
	private Double kg;
	private Double grams;
	private Double ltr;
	private Double mili;
	private String unit;
	private Double totaGstTaxPerProduct;
	private Double totaIgstTaxPerProduct;
	private Double iGstTaxAmountPerUnit;
	private Double freeQuantity;
	private String creditcustomerName;
	private Double netpayAmount;
	private Double dicountperProdPerc;
	private Double dicountperProdAmount;
	private Double cgst;
	private Double sgst;
	
	private Double expenseTaxPerc;
	private Double totalAmount;
	private Double discPercentage;
	private Double discAmount;
	private Double hamaliExpenseInclTax;
	private Double hamaliExpenseTaxAmt;
	
	
	public Double getExpenseTaxPerc() {
		return expenseTaxPerc;
	}

	public void setExpenseTaxPerc(Double expenseTaxPerc) {
		this.expenseTaxPerc = expenseTaxPerc;
	}

	public Double getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(Double totalAmount) {
		this.totalAmount = totalAmount;
	}

	public Double getDiscPercentage() {
		return discPercentage;
	}

	public void setDiscPercentage(Double discPercentage) {
		this.discPercentage = discPercentage;
	}

	public Double getDiscAmount() {
		return discAmount;
	}

	public void setDiscAmount(Double discAmount) {
		this.discAmount = discAmount;
	}

	public Double getHamaliExpenseInclTax() {
		return hamaliExpenseInclTax;
	}

	public void setHamaliExpenseInclTax(Double hamaliExpenseInclTax) {
		this.hamaliExpenseInclTax = hamaliExpenseInclTax;
	}

	public Double getHamaliExpenseTaxAmt() {
		return hamaliExpenseTaxAmt;
	}

	public void setHamaliExpenseTaxAmt(Double hamaliExpenseTaxAmt) {
		this.hamaliExpenseTaxAmt = hamaliExpenseTaxAmt;
	}

	public Double getCgst() {
		return cgst;
	}

	public void setCgst(Double cgst) {
		this.cgst = cgst;
	}

	public Double getSgst() {
		return sgst;
	}

	public void setSgst(Double sgst) {
		this.sgst = sgst;
	}

	public Long getUserid() {
		return userid;
	}

	public void setUserid(Long userid) {
		this.userid = userid;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getShopName1() {
		return shopName1;
	}

	public void setShopName1(String shopName1) {
		this.shopName1 = shopName1;
	}

	
	public Double getDicountperProdPerc() {
		return dicountperProdPerc;
	}

	public void setDicountperProdPerc(Double dicountperProdPerc) {
		this.dicountperProdPerc = dicountperProdPerc;
	}

	public Double getDicountperProdAmount() {
		return dicountperProdAmount;
	}

	public void setDicountperProdAmount(Double dicountperProdAmount) {
		this.dicountperProdAmount = dicountperProdAmount;
	}

	public Long getBarcode() {
		return barcode;
	}

	public void setBarcode(Long barcode) {
		this.barcode = barcode;
	}
	
	public Double getNetpayAmount() {
		return netpayAmount;
	}

	public void setNetpayAmount(Double netpayAmount) {
		this.netpayAmount = netpayAmount;
	}

	public String getCreditcustomerName() {
		return creditcustomerName;
	}

	public void setCreditcustomerName(String creditcustomerName) {
		this.creditcustomerName = creditcustomerName;
	}

	public ChallanBean() {
		super();
		// TODO Auto-generated constructor stub
	}

	public ChallanBean(Long pkfertilizerBillId, String customerName, 
			String customerHiddenName, Long fkCreditCustomerId, String village,
			Long contact, Long aadhar, Double transExpense,
			Double hamaliExpense, Double total, Double grossTotal,
			Double totalAfterSaleReturn, Double returnAmount,
			Double productRateWithoutTax, String paymentMode,
			String nameOnCheck, Long checkNo, Long cardNo, Long discount,
			Double discountAmount, Double taxAmount, String accNo,
			String gstNo, String bankName, Long fk_shop_id, Long catId,
			Long subCatId, Long supplierId, Long fkGoodsReceive,
			String productName, String company, Double salePrice, Double mrp,
			Long quantity, Double totalInGrid, Double taxPercentage,
			Double weight, Long billNo, Date insertDate, String expiryDate,
			Long pkSeedPesticideBillId, Long returnQuantity,
			Long quantityAfterReturn, String hsn, Double iGst,
			Double billPaymentPending, Date saleDate, Double kg, Double grams,
			Double ltr, Double mili, String unit, Double totaGstTaxPerProduct,
			Double totaIgstTaxPerProduct, Double iGstTaxAmountPerUnit, Double freeQuantity,
			String creditcustomerName,Double netpayAmount,Long barcode,
			Double dicountperProdPerc,Double dicountperProdAmount, Double expenseTaxPerc,
			Double totalAmount, Double discPercentage, Double discAmount,
			Double hamaliExpenseInclTax, Double hamaliExpenseTaxAmt)
	{
		super();
		
		this.pkfertilizerBillId = pkfertilizerBillId;
		this.customerName = customerName;
		this.customerHiddenName = customerHiddenName;
		this.fkCreditCustomerId = fkCreditCustomerId;
		this.village = village;
		this.contact = contact;
		this.aadhar = aadhar;
		this.transExpense = transExpense;
		this.hamaliExpense = hamaliExpense;
		this.total = total;
		this.grossTotal = grossTotal;
		this.totalAfterSaleReturn = totalAfterSaleReturn;
		this.returnAmount = returnAmount;
		this.productRateWithoutTax = productRateWithoutTax;
		this.paymentMode = paymentMode;
		this.nameOnCheck = nameOnCheck;
		this.checkNo = checkNo;
		this.cardNo = cardNo;
		this.discount = discount;
		this.discountAmount = discountAmount;
		this.taxAmount = taxAmount;
		this.accNo = accNo;
		this.gstNo = gstNo;
		this.bankName = bankName;
		this.fk_shop_id = fk_shop_id;
		this.catId = catId;
		this.subCatId = subCatId;
		this.supplierId = supplierId;
		this.fkGoodsReceive = fkGoodsReceive;
		this.productName = productName;
		this.company = company;
		this.salePrice = salePrice;
		this.mrp = mrp;
		this.quantity = quantity;
		this.totalInGrid = totalInGrid;
		this.taxPercentage = taxPercentage;
		this.weight = weight;
		this.billNo = billNo;
		this.insertDate = insertDate;
		this.expiryDate = expiryDate;
		this.pkSeedPesticideBillId = pkSeedPesticideBillId;
		this.returnQuantity = returnQuantity;
		this.quantityAfterReturn = quantityAfterReturn;
		this.hsn = hsn;
		this.iGst = iGst;
		this.billPaymentPending = billPaymentPending;
		this.saleDate = saleDate;
		this.kg = kg;
		this.grams = grams;
		this.ltr=ltr;
		this.mili=mili;
		this.unit=unit;
		this.totaGstTaxPerProduct=totaGstTaxPerProduct;
		this.totaIgstTaxPerProduct=totaIgstTaxPerProduct;
		this.iGstTaxAmountPerUnit=iGstTaxAmountPerUnit;
		this.freeQuantity = freeQuantity;
		this.creditcustomerName	= creditcustomerName;
		this.netpayAmount = netpayAmount;	
		this.barcode = barcode;	
		this.dicountperProdPerc = dicountperProdPerc;
		this.dicountperProdAmount = dicountperProdAmount;
		this.expenseTaxPerc = expenseTaxPerc;
		this.totalAmount = totalAmount;
		this.discPercentage = discPercentage;
		this.discAmount = discAmount;
		this.hamaliExpenseInclTax = hamaliExpenseInclTax;
		this.hamaliExpenseTaxAmt = hamaliExpenseTaxAmt;
	}

	public Long getSubCatId() {
		return subCatId;
	}

	public void setSubCatId(Long subCatId) {
		this.subCatId = subCatId;
	}

	public Long getQuantityAfterReturn() {
		return quantityAfterReturn;
	}
	public void setQuantityAfterReturn(Long quantityAfterReturn) {
		this.quantityAfterReturn = quantityAfterReturn;
	}
	public Long getReturnQuantity() {
		return returnQuantity;
	}
	public void setReturnQuantity(Long returnQuantity) {
		this.returnQuantity = returnQuantity;
	}
	public Double getReturnAmount() {
		return returnAmount;
	}
	public void setReturnAmount(Double returnAmount) {
		this.returnAmount = returnAmount;
	}
	public Double getTotalAfterSaleReturn() {
		return totalAfterSaleReturn;
	}
	public void setTotalAfterSaleReturn(Double totalAfterSaleReturn) {
		this.totalAfterSaleReturn = totalAfterSaleReturn;
	}
	public Long getPkSeedPesticideBillId() {
		return pkSeedPesticideBillId;
	}
	public void setPkSeedPesticideBillId(Long pkSeedPesticideBillId) {
		this.pkSeedPesticideBillId = pkSeedPesticideBillId;
	}
	public Long getPkfertilizerBillId() {
		return pkfertilizerBillId;
	}
	public void setPkfertilizerBillId(Long pkfertilizerBillId) {
		this.pkfertilizerBillId = pkfertilizerBillId;
	}
	public String getCustomerName() {
		return customerName;
	}
	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}
	public String getCustomerHiddenName() {
		return customerHiddenName;
	}
	public void setCustomerHiddenName(String customerHiddenName) {
		this.customerHiddenName = customerHiddenName;
	}
	public Long getFkCreditCustomerId() {
		return fkCreditCustomerId;
	}
	public void setFkCreditCustomerId(Long fkCreditCustomerId) {
		this.fkCreditCustomerId = fkCreditCustomerId;
	}
	public String getVillage() {
		return village;
	}
	public void setVillage(String village) {
		this.village = village;
	}
	public Long getContact() {
		return contact;
	}
	public void setContact(Long contact) {
		this.contact = contact;
	}
	public Long getAadhar() {
		return aadhar;
	}
	public void setAadhar(Long aadhar) {
		this.aadhar = aadhar;
	}
	public Double getTransExpense() {
		return transExpense;
	}
	public void setTransExpense(Double transExpense) {
		this.transExpense = transExpense;
	}
	public Double getHamaliExpense() {
		return hamaliExpense;
	}
	public void setHamaliExpense(Double hamaliExpense) {
		this.hamaliExpense = hamaliExpense;
	}
	public Double getTotal() {
		return total;
	}
	public void setTotal(Double total) {
		this.total = total;
	}
	public Double getGrossTotal() {
		return grossTotal;
	}
	public void setGrossTotal(Double grossTotal) {
		this.grossTotal = grossTotal;
	}
	public String getPaymentMode() {
		return paymentMode;
	}
	public void setPaymentMode(String paymentMode) {
		this.paymentMode = paymentMode;
	}
	public String getNameOnCheck() {
		return nameOnCheck;
	}
	public void setNameOnCheck(String nameOnCheck) {
		this.nameOnCheck = nameOnCheck;
	}
	public Long getCheckNo() {
		return checkNo;
	}
	public void setCheckNo(Long checkNo) {
		this.checkNo = checkNo;
	}
	public Long getCardNo() {
		return cardNo;
	}
	public void setCardNo(Long cardNo) {
		this.cardNo = cardNo;
	}
	public String getAccNo() {
		return accNo;
	}
	public void setAccNo(String accNo) {
		this.accNo = accNo;
	}
	public String getBankName() {
		return bankName;
	}
	public void setBankName(String bankName) {
		this.bankName = bankName;
	}
	public Long getCatId() {
		return catId;
	}
	public void setCatId(Long catId) {
		this.catId = catId;
	}
	public Long getSupplierId() {
		return supplierId;
	}
	public void setSupplierId(Long supplierId) {
		this.supplierId = supplierId;
	}
	public Long getFkGoodsReceive() {
		return fkGoodsReceive;
	}
	public void setFkGoodsReceive(Long fkGoodsReceive) {
		this.fkGoodsReceive = fkGoodsReceive;
	}
	
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public String getCompany() {
		return company;
	}
	public void setCompany(String company) {
		this.company = company;
	}
	public Double getSalePrice() {
		return salePrice;
	}
	public void setSalePrice(Double salePrice) {
		this.salePrice = salePrice;
	}
	public Double getMrp() {
		return mrp;
	}
	public void setMrp(Double mrp) {
		this.mrp = mrp;
	}
	public Long getQuantity() {
		return quantity;
	}
	public void setQuantity(Long quantity) {
		this.quantity = quantity;
	}
	public Double getTotalInGrid() {
		return totalInGrid;
	}
	public void setTotalInGrid(Double totalInGrid) {
		this.totalInGrid = totalInGrid;
	}
	public Double getTaxPercentage() {
		return taxPercentage;
	}
	public void setTaxPercentage(Double taxPercentage) {
		this.taxPercentage = taxPercentage;
	}
	public Double getWeight() {
		return weight;
	}
	public void setWeight(Double weight) {
		this.weight = weight;
	}
	public Long getBillNo() {
		return billNo;
	}
	public void setBillNo(Long billNo) {
		this.billNo = billNo;
	}
	public Date getInsertDate() {
		return insertDate;
	}
	public void setInsertDate(Date insertDate) {
		this.insertDate = insertDate;
	}
	public String getExpiryDate() {
		return expiryDate;
	}
	public void setExpiryDate(String expiryDate) {
		this.expiryDate = expiryDate;
	}
	public Double getiGst() {
		return iGst;
	}
	public void setiGst(Double iGst) {
		this.iGst = iGst;
	}

	public Long getFk_shop_id() {
		return fk_shop_id;
	}

	public void setFk_shop_id(Long fk_shop_id) {
		this.fk_shop_id = fk_shop_id;
	}

	public Date getSaleDate() {
		return saleDate;
	}

	public void setSaleDate(Date saleDate) {
		this.saleDate = saleDate;
	}

	public String getGstNo() {
		return gstNo;
	}
	public void setGstNo(String gstNo) {
		this.gstNo = gstNo;
	}
	public Long getDiscount() {
		return discount;
	}
	public void setDiscount(Long discount) {
		this.discount = discount;
	}

	public Double getDiscountAmount() {
		return discountAmount;
	}

	public void setDiscountAmount(Double discountAmount) {
		this.discountAmount = discountAmount;
	}

	public Double getTaxAmount() {
		return taxAmount;
	}

	public void setTaxAmount(Double taxAmount) {
		this.taxAmount = taxAmount;
	}


	public Double getProductRateWithoutTax() {
		return productRateWithoutTax;
	}


	public void setProductRateWithoutTax(Double productRateWithoutTax) {
		this.productRateWithoutTax = productRateWithoutTax;
	}

	public String getHsn() {
		return hsn;
	}

	public void setHsn(String hsn) {
		this.hsn = hsn;
	}

	public Double getBillPaymentPending() {
		return billPaymentPending;
	}

	public void setBillPaymentPending(Double billPaymentPending) {
		this.billPaymentPending = billPaymentPending;
	}
	
	public Double getKg() {
		return kg;
	}

	public void setKg(Double kg) {
		this.kg = kg;
	}

	public Double getGrams() {
		return grams;
	}

	public void setGrams(Double grams) {
		this.grams = grams;
	}

	public Double getLtr() {
		return ltr;
	}

	public void setLtr(Double ltr) {
		this.ltr = ltr;
	}

	public Double getMili() {
		return mili;
	}

	public void setMili(Double mili) {
		this.mili = mili;
	}

	public String getUnit() {
		return unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}

	public Double getTotaGstTaxPerProduct() {
		return totaGstTaxPerProduct;
	}

	public void setTotaGstTaxPerProduct(Double totaGstTaxPerProduct) {
		this.totaGstTaxPerProduct = totaGstTaxPerProduct;
	}

	public Double getTotaIgstTaxPerProduct() {
		return totaIgstTaxPerProduct;
	}

	public void setTotaIgstTaxPerProduct(Double totaIgstTaxPerProduct) {
		this.totaIgstTaxPerProduct = totaIgstTaxPerProduct;
	}

	public Double getiGstTaxAmountPerUnit() {
		return iGstTaxAmountPerUnit;
	}

	public void setiGstTaxAmountPerUnit(Double iGstTaxAmountPerUnit) {
		this.iGstTaxAmountPerUnit = iGstTaxAmountPerUnit;
	}

	public Double getFreeQuantity() {
		return freeQuantity;
	}

	public void setFreeQuantity(Double freeQuantity) {
		this.freeQuantity = freeQuantity;
	}
}
