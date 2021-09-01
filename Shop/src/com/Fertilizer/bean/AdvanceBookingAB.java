package com.Fertilizer.bean;

import java.math.BigDecimal;
import java.math.BigInteger;

public class AdvanceBookingAB {
	
	private BigInteger productID;
	private BigInteger catID;
	private BigInteger subcatID;
	private String prodName;
	private BigDecimal packing;
	private String company;
	private String hsn;
	private String unit;
	private String catName;
	private String subCatName;
	private String quantity;
	private String Total;
	private BigDecimal buyPrice;
	private String buyPriceEx;
	private BigDecimal salePrice;
	private BigDecimal mrp;
	private BigDecimal taxPercentage;
	private String taxName;
	private String salepriceEx;
	private Double cgst;
	private Double sgst;
	private Double igst1;
	private Double Discount;
	private Double DiscountAmount;
	
	public AdvanceBookingAB(BigInteger productID, BigInteger catID, BigInteger subcatID, String prodName,
			BigDecimal packing, String company, String hsn, String unit, String catName, String subCatName,
			String quantity, String total, BigDecimal buyPrice, String buyPriceEx, BigDecimal salePrice, BigDecimal mrp,
			BigDecimal taxPercentage, String taxName, String salepriceEx, Double cgst, Double sgst, Double igst1, Double Discount, Double DiscountAmount) {
		super();
		this.productID = productID;
		this.catID = catID;
		this.subcatID = subcatID;
		this.prodName = prodName;
		this.packing = packing;
		this.company = company;
		this.hsn = hsn;
		this.unit = unit;
		this.catName = catName;
		this.subCatName = subCatName;
		this.quantity = quantity;
		Total = total;
		this.buyPrice = buyPrice;
		this.buyPriceEx = buyPriceEx;
		this.salePrice = salePrice;
		this.mrp = mrp;
		this.taxPercentage = taxPercentage;
		this.taxName = taxName;
		this.salepriceEx = salepriceEx;
		this.cgst = cgst;
		this.sgst = sgst;
		this.igst1 = igst1;
		this.Discount = Discount;
		this.DiscountAmount = DiscountAmount;
	}

	
	public Double getIgst1() {
		return igst1;
	}
	public void setIgst1(Double igst1) {
		this.igst1 = igst1;
	}
	public Double getDiscount() {
		return Discount;
	}
	public void setDiscount(Double discount) {
		Discount = discount;
	}
	public Double getDiscountAmount() {
		return DiscountAmount;
	}
	public void setDiscountAmount(Double discountAmount) {
		DiscountAmount = discountAmount;
	}
	public BigInteger getProductID() {
		return productID;
	}
	public void setProductID(BigInteger productID) {
		this.productID = productID;
	}
	public BigInteger getCatID() {
		return catID;
	}
	public void setCatID(BigInteger catID) {
		this.catID = catID;
	}
	public BigInteger getSubcatID() {
		return subcatID;
	}
	public void setSubcatID(BigInteger subcatID) {
		this.subcatID = subcatID;
	}
	public String getProdName() {
		return prodName;
	}
	public void setProdName(String prodName) {
		this.prodName = prodName;
	}
	public BigDecimal getPacking() {
		return packing;
	}
	public void setPacking(BigDecimal packing) {
		this.packing = packing;
	}
	public String getCompany() {
		return company;
	}
	public void setCompany(String company) {
		this.company = company;
	}
	public String getHsn() {
		return hsn;
	}
	public void setHsn(String hsn) {
		this.hsn = hsn;
	}
	public String getUnit() {
		return unit;
	}
	public void setUnit(String unit) {
		this.unit = unit;
	}
	public String getCatName() {
		return catName;
	}
	public void setCatName(String catName) {
		this.catName = catName;
	}
	public String getSubCatName() {
		return subCatName;
	}
	public void setSubCatName(String subCatName) {
		this.subCatName = subCatName;
	}
	public String getQuantity() {
		return quantity;
	}
	public void setQuantity(String quantity) {
		this.quantity = quantity;
	}
	public String getTotal() {
		return Total;
	}
	public void setTotal(String total) {
		Total = total;
	}
	public BigDecimal getBuyPrice() {
		return buyPrice;
	}
	public void setBuyPrice(BigDecimal buyPrice) {
		this.buyPrice = buyPrice;
	}
	public String getBuyPriceEx() {
		return buyPriceEx;
	}
	public void setBuyPriceEx(String buyPriceEx) {
		this.buyPriceEx = buyPriceEx;
	}
	public BigDecimal getSalePrice() {
		return salePrice;
	}
	public void setSalePrice(BigDecimal salePrice) {
		this.salePrice = salePrice;
	}
	public BigDecimal getMrp() {
		return mrp;
	}
	public void setMrp(BigDecimal mrp) {
		this.mrp = mrp;
	}
	public BigDecimal getTaxPercentage() {
		return taxPercentage;
	}
	public void setTaxPercentage(BigDecimal taxPercentage) {
		this.taxPercentage = taxPercentage;
	}
	public String getTaxName() {
		return taxName;
	}
	public void setTaxName(String taxName) {
		this.taxName = taxName;
	}
	public String getSalepriceEx() {
		return salepriceEx;
	}
	public void setSalepriceEx(String salepriceEx) {
		this.salepriceEx = salepriceEx;
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
	public AdvanceBookingAB() {
		super();
		// TODO Auto-generated constructor stub
	}
	
}
