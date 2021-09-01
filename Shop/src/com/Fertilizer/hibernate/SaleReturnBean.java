package com.Fertilizer.hibernate;

import java.io.Serializable;
import java.util.Date;

public class SaleReturnBean implements Serializable{
	
	private Long pkSaleReturnId;
	private Long fkFertilizerBillId;
	private Long fkSeedBillId;
	private Long fkPesticideBillId;
	private String customerName;
	private Long aadhar;
	private String productName;
	private String company;
	private Long fkCatId;
	private Long BillNo;
	private Double weight;
	private Double availableQuantity;
	private Double returnQuantity;
	private Double salePrice;
	private Double mrp;
	private Double taxPercentage;
	private Double ReturnAmount;
	private String saleDate;
	private Date returnDate;
	private String batchNumber;
	private String returnDate1;
	private Double TotalAmount;
	private Double salepriceEx;
	private String custType;
	private Long barcodeNo;
	private String hsn;
	private String batchno;
	private Double buyprice;
	private String unitname;
	private Double previousReturnAmt;
	private Double grosstotal;
	
	private Long fkshopid;
	private Long fkuserid;
	private String shopName;
	private String userName;
	
	
	
	public Long getFkshopid() {
		return fkshopid;
	}
	public void setFkshopid(Long fkshopid) {
		this.fkshopid = fkshopid;
	}
	public Long getFkuserid() {
		return fkuserid;
	}
	public void setFkuserid(Long fkuserid) {
		this.fkuserid = fkuserid;
	}
	public String getShopName() {
		return shopName;
	}
	public void setShopName(String shopName) {
		this.shopName = shopName;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public Double getGrosstotal() {
		return grosstotal;
	}
	public void setGrosstotal(Double grosstotal) {
		this.grosstotal = grosstotal;
	}
	public Double getPreviousReturnAmt() {
		return previousReturnAmt;
	}
	public void setPreviousReturnAmt(Double previousReturnAmt) {
		this.previousReturnAmt = previousReturnAmt;
	}
	public String getUnitname() {
		return unitname;
	}
	public void setUnitname(String unitname) {
		this.unitname = unitname;
	}
	public Double getBuyprice() {
		return buyprice;
	}
	public void setBuyprice(Double buyprice) {
		this.buyprice = buyprice;
	}
	public String getBatchno() {
		return batchno;
	}
	public void setBatchno(String batchno) {
		this.batchno = batchno;
	}
	public String getHsn() {
		return hsn;
	}
	public void setHsn(String hsn) {
		this.hsn = hsn;
	}
	public Long getBarcodeNo() {
		return barcodeNo;
	}
	public void setBarcodeNo(Long barcodeNo) {
		this.barcodeNo = barcodeNo;
	}
	public String getCustType() {
		return custType;
	}
	public void setCustType(String custType) {
		this.custType = custType;
	}
	public Double getSalepriceEx() {
		return salepriceEx;
	}
	public void setSalepriceEx(Double salepriceEx) {
		this.salepriceEx = salepriceEx;
	}
	public String getBatchNumber() {
		return batchNumber;
	}
	public void setBatchNumber(String batchNumber) {
		this.batchNumber = batchNumber;
	}
	public Long getFkSeedBillId() {
		return fkSeedBillId;
	}
	public void setFkSeedBillId(Long fkSeedBillId) {
		this.fkSeedBillId = fkSeedBillId;
	}
	public Long getFkPesticideBillId() {
		return fkPesticideBillId;
	}
	public void setFkPesticideBillId(Long fkPesticideBillId) {
		this.fkPesticideBillId = fkPesticideBillId;
	}
	public String getSaleDate() {
		return saleDate;
	}
	public void setSaleDate(String saleDate) {
		this.saleDate = saleDate;
	}
	public Date getReturnDate() {
		return returnDate;
	}
	public void setReturnDate(Date returnDate) {
		this.returnDate = returnDate;
	}
	public Long getPkSaleReturnId() {
		return pkSaleReturnId;
	}
	public void setPkSaleReturnId(Long pkSaleReturnId) {
		this.pkSaleReturnId = pkSaleReturnId;
	}
	public Long getFkFertilizerBillId() {
		return fkFertilizerBillId;
	}
	public void setFkFertilizerBillId(Long fkFertilizerBillId) {
		this.fkFertilizerBillId = fkFertilizerBillId;
	}
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public Long getFkCatId() {
		return fkCatId;
	}
	public void setFkCatId(Long fkCatId) {
		this.fkCatId = fkCatId;
	}
	public Long getBillNo() {
		return BillNo;
	}
	public void setBillNo(Long billNo) {
		BillNo = billNo;
	}
	public Double getWeight() {
		return weight;
	}
	public void setWeight(Double weight) {
		this.weight = weight;
	}
	public Double getAvailableQuantity() {
		return availableQuantity;
	}
	public void setAvailableQuantity(Double availableQuantity) {
		this.availableQuantity = availableQuantity;
	}
	public Double getReturnQuantity() {
		return returnQuantity;
	}
	public void setReturnQuantity(Double returnQuantity) {
		this.returnQuantity = returnQuantity;
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
	public Double getTaxPercentage() {
		return taxPercentage;
	}
	public void setTaxPercentage(Double taxPercentage) {
		this.taxPercentage = taxPercentage;
	}
	public String getCompany() {
		return company;
	}
	public void setCompany(String company) {
		this.company = company;
	}
	public Double getReturnAmount() {
		return ReturnAmount;
	}
	public void setReturnAmount(Double returnAmount) {
		ReturnAmount = returnAmount;
	}
	public String getCustomerName() {
		return customerName;
	}
	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}
	public Long getAadhar() {
		return aadhar;
	}
	public void setAadhar(Long aadhar) {
		this.aadhar = aadhar;
	}
	public String getReturnDate1() {
		return returnDate1;
	}
	public void setReturnDate1(String returnDate1) {
		this.returnDate1 = returnDate1;
	}
	public Double getTotalAmount() {
		return TotalAmount;
	}
	public void setTotalAmount(Double totalAmount) {
		TotalAmount = totalAmount;
	}	
}
