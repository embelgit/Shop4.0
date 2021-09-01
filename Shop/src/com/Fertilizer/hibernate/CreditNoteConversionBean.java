package com.Fertilizer.hibernate;

import java.util.Date;

public class CreditNoteConversionBean {

	private Long pk_cr_conversion_no;
	private Long fk_supplier_id;
	private Long bill_no;
	private String crConversionNo;
	private Double crcongrosstotal;
	
	private Long fkProductId;
	private Long fkcategoryId;
	private String supplierName;
	private String productName;
	private String categoryName;
	private String companyName;
	private String batchno;
	private Double weight;
	private Double buy_price;
	private Double sale_price;
	private Double mrp;
	private Double taxpercentage;
	private Long quantity;
	private Long retunQuantity;
	private Double price;
	private Double conversiontotal;
	private Long barcodeNo;
	private Date purchaseDate;
	
	private Long userId;
	private String username;
	private Long shopId;
	private String shopName;
	private Long transNoForCreditConversion;
	private Long fkGoodRecId;
	private Long pkPurchasereturnId;
	
	public Long getPkPurchasereturnId() {
		return pkPurchasereturnId;
	}
	public void setPkPurchasereturnId(Long pkPurchasereturnId) {
		this.pkPurchasereturnId = pkPurchasereturnId;
	}
	public Long getFkGoodRecId() {
		return fkGoodRecId;
	}
	public void setFkGoodRecId(Long fkGoodRecId) {
		this.fkGoodRecId = fkGoodRecId;
	}
	public Long getTransNoForCreditConversion() {
		return transNoForCreditConversion;
	}
	public void setTransNoForCreditConversion(Long transNoForCreditConversion) {
		this.transNoForCreditConversion = transNoForCreditConversion;
	}
	public CreditNoteConversionBean() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Long getPk_cr_conversion_no() {
		return pk_cr_conversion_no;
	}
	public void setPk_cr_conversion_no(Long pk_cr_conversion_no) {
		this.pk_cr_conversion_no = pk_cr_conversion_no;
	}
	public Long getFk_supplier_id() {
		return fk_supplier_id;
	}
	public void setFk_supplier_id(Long fk_supplier_id) {
		this.fk_supplier_id = fk_supplier_id;
	}
	public Long getBill_no() {
		return bill_no;
	}
	public void setBill_no(Long bill_no) {
		this.bill_no = bill_no;
	}
	public String getCrConversionNo() {
		return crConversionNo;
	}
	public void setCrConversionNo(String crConversionNo) {
		this.crConversionNo = crConversionNo;
	}
	public Double getCrcongrosstotal() {
		return crcongrosstotal;
	}
	public void setCrcongrosstotal(Double crcongrosstotal) {
		this.crcongrosstotal = crcongrosstotal;
	}
	public Long getFkProductId() {
		return fkProductId;
	}
	public void setFkProductId(Long fkProductId) {
		this.fkProductId = fkProductId;
	}
	public Long getFkcategoryId() {
		return fkcategoryId;
	}
	public void setFkcategoryId(Long fkcategoryId) {
		this.fkcategoryId = fkcategoryId;
	}
	public String getSupplierName() {
		return supplierName;
	}
	public void setSupplierName(String supplierName) {
		this.supplierName = supplierName;
	}
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public String getCategoryName() {
		return categoryName;
	}
	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}
	public String getCompanyName() {
		return companyName;
	}
	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}
	public String getBatchno() {
		return batchno;
	}
	public void setBatchno(String batchno) {
		this.batchno = batchno;
	}
	public Double getWeight() {
		return weight;
	}
	public void setWeight(Double weight) {
		this.weight = weight;
	}
	public Double getBuy_price() {
		return buy_price;
	}
	public void setBuy_price(Double buy_price) {
		this.buy_price = buy_price;
	}
	public Double getSale_price() {
		return sale_price;
	}
	public void setSale_price(Double sale_price) {
		this.sale_price = sale_price;
	}
	public Double getMrp() {
		return mrp;
	}
	public void setMrp(Double mrp) {
		this.mrp = mrp;
	}
	public Double getTaxpercentage() {
		return taxpercentage;
	}
	public void setTaxpercentage(Double taxpercentage) {
		this.taxpercentage = taxpercentage;
	}
	public Long getQuantity() {
		return quantity;
	}
	public void setQuantity(Long quantity) {
		this.quantity = quantity;
	}
	public Long getRetunQuantity() {
		return retunQuantity;
	}
	public void setRetunQuantity(Long retunQuantity) {
		this.retunQuantity = retunQuantity;
	}
	public Double getPrice() {
		return price;
	}
	public void setPrice(Double price) {
		this.price = price;
	}
	public Double getConversiontotal() {
		return conversiontotal;
	}
	public void setConversiontotal(Double conversiontotal) {
		this.conversiontotal = conversiontotal;
	}
	public Long getBarcodeNo() {
		return barcodeNo;
	}
	public void setBarcodeNo(Long barcodeNo) {
		this.barcodeNo = barcodeNo;
	}
	public Date getPurchaseDate() {
		return purchaseDate;
	}
	public void setPurchaseDate(Date purchaseDate) {
		this.purchaseDate = purchaseDate;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public Long getShopId() {
		return shopId;
	}
	public void setShopId(Long shopId) {
		this.shopId = shopId;
	}
	public String getShopName() {
		return shopName;
	}
	public void setShopName(String shopName) {
		this.shopName = shopName;
	}
	@Override
	public String toString() {
		return "CreditNoteConversionBean [pk_cr_conversion_no=" + pk_cr_conversion_no + ", fk_supplier_id="
				+ fk_supplier_id + ", bill_no=" + bill_no + ", crConversionNo=" + crConversionNo + ", crcongrosstotal="
				+ crcongrosstotal + ", fkProductId=" + fkProductId + ", fkcategoryId=" + fkcategoryId
				+ ", supplierName=" + supplierName + ", productName=" + productName + ", categoryName=" + categoryName
				+ ", companyName=" + companyName + ", batchno=" + batchno + ", weight=" + weight + ", buy_price="
				+ buy_price + ", sale_price=" + sale_price + ", mrp=" + mrp + ", taxpercentage=" + taxpercentage
				+ ", quantity=" + quantity + ", retunQuantity=" + retunQuantity + ", price=" + price
				+ ", conversiontotal=" + conversiontotal + ", barcodeNo=" + barcodeNo + ", purchaseDate=" + purchaseDate
				+ ", userId=" + userId + ", username=" + username + ", shopId=" + shopId + ", shopName=" + shopName
				+ "]";
	}
	public CreditNoteConversionBean(Long pk_cr_conversion_no, Long fk_supplier_id, Long bill_no, String crConversionNo,
			Double crcongrosstotal, Long fkProductId, Long fkcategoryId, String supplierName, String productName,
			String categoryName, String companyName, String batchno, Double weight, Double buy_price, Double sale_price,
			Double mrp, Double taxpercentage, Long quantity, Long retunQuantity, Double price, Double conversiontotal,
			Long barcodeNo, Date purchaseDate, Long userId, String username, Long shopId, String shopName) {
		super();
		this.pk_cr_conversion_no = pk_cr_conversion_no;
		this.fk_supplier_id = fk_supplier_id;
		this.bill_no = bill_no;
		this.crConversionNo = crConversionNo;
		this.crcongrosstotal = crcongrosstotal;
		this.fkProductId = fkProductId;
		this.fkcategoryId = fkcategoryId;
		this.supplierName = supplierName;
		this.productName = productName;
		this.categoryName = categoryName;
		this.companyName = companyName;
		this.batchno = batchno;
		this.weight = weight;
		this.buy_price = buy_price;
		this.sale_price = sale_price;
		this.mrp = mrp;
		this.taxpercentage = taxpercentage;
		this.quantity = quantity;
		this.retunQuantity = retunQuantity;
		this.price = price;
		this.conversiontotal = conversiontotal;
		this.barcodeNo = barcodeNo;
		this.purchaseDate = purchaseDate;
		this.userId = userId;
		this.username = username;
		this.shopId = shopId;
		this.shopName = shopName;
	}
	
	
	
}
