package com.Fertilizer.bean;

import java.math.BigDecimal;

public class StockDetail {

	private String productName;
	private BigDecimal stock;
	private String godownName;
	private String categoryName;
	private String batchNo;
	private String companyName;
	private Double weight;
	private Double quantity;
	private String totalKgLtrPieceStock;
	private String unit;
	private String expiryDate;
	private String stockPerEntry;
	private String ExpiryDayeToGo;
	private Double availableeQuantity;
	private String barcodeNo;
	private String salePrice;
	private Double boxqty;
	private String shopname;
	
	
	public String getShopname() {
		return shopname;
	}
	public void setShopname(String shopname) {
		this.shopname = shopname;
	}
	public Double getBoxqty() {
		return boxqty;
	}
	public void setBoxqty(Double boxqty) {
		this.boxqty = boxqty;
	}
	public String getSalePrice() {
		return salePrice;
	}
	public void setSalePrice(String salePrice) {
		this.salePrice = salePrice;
	}
	public String getBarcodeNo() {
		return barcodeNo;
	}
	public void setBarcodeNo(String barcodeNo) {
		this.barcodeNo = barcodeNo;
	}
	public Double getAvailableeQuantity() {
		return availableeQuantity;
	}
	public void setAvailableeQuantity(Double availableeQuantity) {
		this.availableeQuantity = availableeQuantity;
	}
	public String getCompanyName() {
		return companyName;
	}
	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}
	public Double getWeight() {
		return weight;
	}
	public void setWeight(Double weight) {
		this.weight = weight;
	}
	public Double getQuantity() {
		return quantity;
	}
	public void setQuantity(Double quantity) {
		this.quantity = quantity;
	}
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public BigDecimal getStock() {
		return stock;
	}
	public void setStock(BigDecimal stock) {
		this.stock = stock;
	}
	public String getGodownName() {
		return godownName;
	}
	public void setGodownName(String godownName) {
		this.godownName = godownName;
	}
	public String getCategoryName() {
		return categoryName;
	}
	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}
	public String getBatchNo() {
		return batchNo;
	}
	public void setBatchNo(String batchNo) {
		this.batchNo = batchNo;
	}
	
	public String getTotalKgLtrPieceStock() {
		return totalKgLtrPieceStock;
	}
	public void setTotalKgLtrPieceStock(String totalKgLtrPieceStock) {
		this.totalKgLtrPieceStock = totalKgLtrPieceStock;
	}
	public String getUnit() {
		return unit;
	}
	public void setUnit(String unit) {
		this.unit = unit;
	}
	public String getExpiryDate() {
		return expiryDate;
	}
	public void setExpiryDate(String expiryDate) {
		this.expiryDate = expiryDate;
	}
	public String getStockPerEntry() {
		return stockPerEntry;
	}
	public void setStockPerEntry(String stockPerEntry) {
		this.stockPerEntry = stockPerEntry;
	}
	public String getExpiryDayeToGo() {
		return ExpiryDayeToGo;
	}
	public void setExpiryDayeToGo(String expiryDayeToGo) {
		ExpiryDayeToGo = expiryDayeToGo;
	}
}
