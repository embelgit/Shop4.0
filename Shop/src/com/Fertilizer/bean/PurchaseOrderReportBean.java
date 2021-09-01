package com.Fertilizer.bean;

import java.util.Date;

public class PurchaseOrderReportBean {
	
	private Long pk_po_id;
	private Long supplierID;
	private Long catID;
	private Long subcatID;
	private Long prodID;
	private String supplierName;
	private String emailID;
	private String prodName;
	private String catName;
	private String subcatName;
	private String company;
	private String hsnNO;
	private Double packing;
	private String unit;
	private Long quantity;
	private Double totalQtyperProd;
	private Double totalQty;
	private Long bookingNo;
	private String purchaseBillNo;
	private Double buyPrice ;
	private Double TotalExTax ;
	private Double discount;
	private Double discountAmount;
	private Double buyPriceEx ;
	private Double cgst;
	private Double sgst;
	private Double iGstPercentage;
	private String podate;
	private Double grosstotal;
	private Double quantity1;
	
	
	public PurchaseOrderReportBean() {
		super();
		// TODO Auto-generated constructor stub
	}
	public PurchaseOrderReportBean(Long pk_po_id, Long supplierID, Long catID, Long subcatID, Long prodID,
			String supplierName, String emailID, String prodName, String catName, String subcatName, String company,
			String hsnNO, Double packing, String unit, Long quantity, Double totalQtyperProd, Double totalQty,
			Long bookingNo, String purchaseBillNo, Double buyPrice, Double totalExTax, Double discount,
			Double discountAmount, Double buyPriceEx, Double cgst, Double sgst, Double iGstPercentage, String podate, 
			Double grosstotal, Double quantity1) {
		super();
		this.pk_po_id = pk_po_id;
		this.supplierID = supplierID;
		this.catID = catID;
		this.subcatID = subcatID;
		this.prodID = prodID;
		this.supplierName = supplierName;
		this.emailID = emailID;
		this.prodName = prodName;
		this.catName = catName;
		this.subcatName = subcatName;
		this.company = company;
		this.hsnNO = hsnNO;
		this.packing = packing;
		this.unit = unit;
		this.quantity = quantity;
		this.totalQtyperProd = totalQtyperProd;
		this.totalQty = totalQty;
		this.bookingNo = bookingNo;
		this.purchaseBillNo = purchaseBillNo;
		this.buyPrice = buyPrice;
		TotalExTax = totalExTax;
		this.discount = discount;
		this.discountAmount = discountAmount;
		this.buyPriceEx = buyPriceEx;
		this.cgst = cgst;
		this.sgst = sgst;
		this.iGstPercentage = iGstPercentage;
		this.podate = podate;
		this.grosstotal = grosstotal;
		this.quantity1 = quantity1;
	}
	
	public Double getQuantity1() {
		return quantity1;
	}
	public void setQuantity1(Double quantity1) {
		this.quantity1 = quantity1;
	}
	public Double getGrosstotal() {
		return grosstotal;
	}
	public void setGrosstotal(Double grosstotal) {
		this.grosstotal = grosstotal;
	}
	public String getPodate() {
		return podate;
	}
	public void setPodate(String podate) {
		this.podate = podate;
	}
	public Long getPk_po_id() {
		return pk_po_id;
	}
	public void setPk_po_id(Long pk_po_id) {
		this.pk_po_id = pk_po_id;
	}
	public Long getSupplierID() {
		return supplierID;
	}
	public void setSupplierID(Long supplierID) {
		this.supplierID = supplierID;
	}
	public Long getCatID() {
		return catID;
	}
	public void setCatID(Long catID) {
		this.catID = catID;
	}
	public Long getSubcatID() {
		return subcatID;
	}
	public void setSubcatID(Long subcatID) {
		this.subcatID = subcatID;
	}
	public Long getProdID() {
		return prodID;
	}
	public void setProdID(Long prodID) {
		this.prodID = prodID;
	}
	public String getSupplierName() {
		return supplierName;
	}
	public void setSupplierName(String supplierName) {
		this.supplierName = supplierName;
	}
	public String getEmailID() {
		return emailID;
	}
	public void setEmailID(String emailID) {
		this.emailID = emailID;
	}
	public String getProdName() {
		return prodName;
	}
	public void setProdName(String prodName) {
		this.prodName = prodName;
	}
	public String getCatName() {
		return catName;
	}
	public void setCatName(String catName) {
		this.catName = catName;
	}
	public String getSubcatName() {
		return subcatName;
	}
	public void setSubcatName(String subcatName) {
		this.subcatName = subcatName;
	}
	public String getCompany() {
		return company;
	}
	public void setCompany(String company) {
		this.company = company;
	}
	public String getHsnNO() {
		return hsnNO;
	}
	public void setHsnNO(String hsnNO) {
		this.hsnNO = hsnNO;
	}
	public Double getPacking() {
		return packing;
	}
	public void setPacking(Double packing) {
		this.packing = packing;
	}
	public String getUnit() {
		return unit;
	}
	public void setUnit(String unit) {
		this.unit = unit;
	}
	public Long getQuantity() {
		return quantity;
	}
	public void setQuantity(Long quantity) {
		this.quantity = quantity;
	}
	public Double getTotalQtyperProd() {
		return totalQtyperProd;
	}
	public void setTotalQtyperProd(Double totalQtyperProd) {
		this.totalQtyperProd = totalQtyperProd;
	}
	public Double getTotalQty() {
		return totalQty;
	}
	public void setTotalQty(Double totalQty) {
		this.totalQty = totalQty;
	}
	public Long getBookingNo() {
		return bookingNo;
	}
	public void setBookingNo(Long bookingNo) {
		this.bookingNo = bookingNo;
	}
	public String getPurchaseBillNo() {
		return purchaseBillNo;
	}
	public void setPurchaseBillNo(String purchaseBillNo) {
		this.purchaseBillNo = purchaseBillNo;
	}
	public Double getBuyPrice() {
		return buyPrice;
	}
	public void setBuyPrice(Double buyPrice) {
		this.buyPrice = buyPrice;
	}
	public Double getTotalExTax() {
		return TotalExTax;
	}
	public void setTotalExTax(Double totalExTax) {
		TotalExTax = totalExTax;
	}
	public Double getDiscount() {
		return discount;
	}
	public void setDiscount(Double discount) {
		this.discount = discount;
	}
	public Double getDiscountAmount() {
		return discountAmount;
	}
	public void setDiscountAmount(Double discountAmount) {
		this.discountAmount = discountAmount;
	}
	public Double getBuyPriceEx() {
		return buyPriceEx;
	}
	public void setBuyPriceEx(Double buyPriceEx) {
		this.buyPriceEx = buyPriceEx;
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
	public Double getiGstPercentage() {
		return iGstPercentage;
	}
	public void setiGstPercentage(Double iGstPercentage) {
		this.iGstPercentage = iGstPercentage;
	}
	
	
	
}
