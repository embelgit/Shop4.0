package com.Fertilizer.hibernate;

import java.util.Date;


public class Stock {

	
	public long PkStockId;
	public long catID;
	public long subCatId;
	public long fk_shop_id;
	public String productName;
	public String companyName;
	public double weight;
	private double quantity;
	//private String batchNum;
	private java.util.Date UpdateDate;
	private Double totalKgLtrPieceQuantity;
	public String unit;
	public long productId;
	private Long fkuserid;
	private String shopName;
	private String userName;
	private Long barcodeNo;
	private Double QuantityTx;
	
	private String pack_type;
//	private Double packquantity;
//	private String packunit;
	
	
	
	public Long getBarcodeNo() {
		return barcodeNo;
	}

	public void setBarcodeNo(Long barcodeNo) {
		this.barcodeNo = barcodeNo;
	}

	public Stock() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public Stock(long pkStockId, long catID, long subCatId, long fk_shop_id, String productName, String companyName,
			double weight, double quantity, Date updateDate, Double totalKgLtrPieceQuantity, String unit,
			long productId, Long fkuserid, String shopName, String userName,Double QuantityTx,String pack_type) {
		super();
		PkStockId = pkStockId;
		this.catID = catID;
		this.subCatId = subCatId;
		this.fk_shop_id = fk_shop_id;
		this.productName = productName;
		this.companyName = companyName;
		this.weight = weight;
		this.quantity = quantity;
		UpdateDate = updateDate;
		this.totalKgLtrPieceQuantity = totalKgLtrPieceQuantity;
		this.unit = unit;
		this.productId = productId;
		this.fkuserid = fkuserid;
		this.shopName = shopName;
		this.userName = userName;
		this.QuantityTx = QuantityTx;

		this.pack_type = pack_type;
	}

	
	
	/*public String getBatchNum() {
		return batchNum;
	}


	public void setBatchNum(String batchNum) {
		this.batchNum = batchNum;
	}
*/

	public String getPack_type() {
		return pack_type;
	}

	public void setPack_type(String pack_type) {
		this.pack_type = pack_type;
	}



	public Double getQuantityTx() {
		return QuantityTx;
	}

	public void setQuantityTx(Double quantityTx) {
		QuantityTx = quantityTx;
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

	public long getPkStockId() {
		return PkStockId;
	}

	public void setPkStockId(long pkStockId) {
		PkStockId = pkStockId;
	}

	public long getCatID() {
		return catID;
	}

	public void setCatID(long catID) {
		this.catID = catID;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
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

	public java.util.Date getUpdateDate() {
		return UpdateDate;
	}

	public void setUpdateDate(java.util.Date updateDate) {
		UpdateDate = updateDate;
	}
	
	public long getSubCatId() {
		return subCatId;
	}


	public void setSubCatId(long subCatId) {
		this.subCatId = subCatId;
	}

	public long getFk_shop_id() {
		return fk_shop_id;
	}

	public void setFk_shop_id(long fk_shop_id) {
		this.fk_shop_id = fk_shop_id;
	}

	public Double getTotalKgLtrPieceQuantity() {
		return totalKgLtrPieceQuantity;
	}

	public void setTotalKgLtrPieceQuantity(Double totalKgLtrPieceQuantity) {
		this.totalKgLtrPieceQuantity = totalKgLtrPieceQuantity;
	}

	public String getUnit() {
		return unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}

	public long getProductId() {
		return productId;
	}

	public void setProductId(long productId) {
		this.productId = productId;
	}
		
}
