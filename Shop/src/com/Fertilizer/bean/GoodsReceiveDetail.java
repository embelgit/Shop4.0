package com.Fertilizer.bean;

public class GoodsReceiveDetail {

	private String productName;
	private String stock;
	private String expiryDate;
	private String batchNumber;
	private String company;
	private String weight;
	private long goodsInKg;
	private long goodsInGrams;
		
	public String getCompany() {
		return company;
	}
	public void setCompany(String company) {
		this.company = company;
	}
	public String getWeight() {
		return weight;
	}
	public void setWeight(String weight) {
		this.weight = weight;
	}
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public String getStock() {
		return stock;
	}
	public void setStock(String stock) {
		this.stock = stock;
	}
	public String getExpiryDate() {
		return expiryDate;
	}
	public void setExpiryDate(String expiryDate) {
		this.expiryDate = expiryDate;
	}
	public String getBatchNumber() {
		return batchNumber;
	}
	public void setBatchNumber(String batchNumber) {
		this.batchNumber = batchNumber;
	}
	public long getGoodsInKg() {
		return goodsInKg;
	}
	public void setGoodsInKg(long goodsInKg) {
		this.goodsInKg = goodsInKg;
	}
	public long getGoodsInGrams() {
		return goodsInGrams;
	}
	public void setGoodsInGrams(long goodsInGrams) {
		this.goodsInGrams = goodsInGrams;
	}
	
}
