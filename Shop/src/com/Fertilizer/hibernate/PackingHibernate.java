package com.Fertilizer.hibernate;

import java.util.Date;

public class PackingHibernate {

	
	private Long pkpaackid;
	
	private long catID;
	private long subCatId;
	private String productName;
	private double weight;
	private double quantity;
	private Date date;
	private long productId;
	private long fk_shop_id;
	private Long fkuserid;
	private String shopName;
	private String userName;
//	private Double packweight;
	private String unit;
//	private double packquantityKG;

	private int sr;
	
	
	public int getSr() {
		return sr;
	}
	public void setSr(int sr) {
		this.sr = sr;
	}
	public Long getPkpaackid() {
		return pkpaackid;
	}
	public void setPkpaackid(Long pkpaackid) {
		this.pkpaackid = pkpaackid;
	}
	public long getCatID() {
		return catID;
	}
	public void setCatID(long catID) {
		this.catID = catID;
	}
	public long getSubCatId() {
		return subCatId;
	}
	public void setSubCatId(long subCatId) {
		this.subCatId = subCatId;
	}
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public double getWeight() {
		return weight;
	}
	public void setWeight(double weight) {
		this.weight = weight;
	}
	public double getQuantity() {
		return quantity;
	}
	public void setQuantity(double quantity) {
		this.quantity = quantity;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public long getProductId() {
		return productId;
	}
	public void setProductId(long productId) {
		this.productId = productId;
	}
	public long getFk_shop_id() {
		return fk_shop_id;
	}
	public void setFk_shop_id(long fk_shop_id) {
		this.fk_shop_id = fk_shop_id;
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
	public String getUnit() {
		return unit;
	}
	public void setUnit(String unit) {
		this.unit = unit;
	}
	
	
	
}
