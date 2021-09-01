package com.Fertilizer.hibernate;

import java.util.Date;

public class productTransferHibernate {
	
	
	private Long pkproductTxid;
	
	private Long StockId;
	
	private Long subCategoryId;
	private Long categoryID ;

				
	private Long productId;
	
	private String productName;
	
	private Double QuantityTx;
	private String companyName;
	private String unit;
	private String ware_shopname;
	private Long wareshop_id;
	private Double stock;

	private String shopnametoTx;
	private Long shop_idtoTx;
	
	private Long fkuserid;
	private String userName;
	
	private Date date;
	
	private int sr;
	
	
	
	public int getSr() {
		return sr;
	}
	public void setSr(int sr) {
		this.sr = sr;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public Long getFkuserid() {
		return fkuserid;
	}
	public void setFkuserid(Long fkuserid) {
		this.fkuserid = fkuserid;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public Long getPkproductTxid() {
		return pkproductTxid;
	}
	public void setPkproductTxid(Long pkproductTxid) {
		this.pkproductTxid = pkproductTxid;
	}
	public Long getStockId() {
		return StockId;
	}
	public void setStockId(Long stockId) {
		StockId = stockId;
	}
	public Long getSubCategoryId() {
		return subCategoryId;
	}
	public void setSubCategoryId(Long subCategoryId) {
		this.subCategoryId = subCategoryId;
	}
	public Long getCategoryID() {
		return categoryID;
	}
	public void setCategoryID(Long categoryID) {
		this.categoryID = categoryID;
	}
	public Long getProductId() {
		return productId;
	}
	public void setProductId(Long productId) {
		this.productId = productId;
	}
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public Double getQuantityTx() {
		return QuantityTx;
	}
	public void setQuantityTx(Double quantityTx) {
		QuantityTx = quantityTx;
	}
	public String getCompanyName() {
		return companyName;
	}
	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}
	public String getUnit() {
		return unit;
	}
	public void setUnit(String unit) {
		this.unit = unit;
	}
	public String getWare_shopname() {
		return ware_shopname;
	}
	public void setWare_shopname(String ware_shopname) {
		this.ware_shopname = ware_shopname;
	}
	public Long getWareshop_id() {
		return wareshop_id;
	}
	public void setWareshop_id(Long wareshop_id) {
		this.wareshop_id = wareshop_id;
	}
	public Double getStock() {
		return stock;
	}
	public void setStock(Double stock) {
		this.stock = stock;
	}
	public String getShopnametoTx() {
		return shopnametoTx;
	}
	public void setShopnametoTx(String shopnametoTx) {
		this.shopnametoTx = shopnametoTx;
	}
	public Long getShop_idtoTx() {
		return shop_idtoTx;
	}
	public void setShop_idtoTx(Long shop_idtoTx) {
		this.shop_idtoTx = shop_idtoTx;
	}
	
	
	
}
