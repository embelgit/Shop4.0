package com.Fertilizer.hibernate;

import java.io.Serializable;

public class TaxCreationBean implements Serializable{
	
	private long txId;
	private String taxType;
	private double taxPercentage;
	private double sgst;
	private double cgst;
	private Long fkshopid;
	private Long fkuserid;
	private String shopName;
	private String userName;
	
	public double getSgst() {
		return sgst;
	}
	public void setSgst(double sgst) {
		this.sgst = sgst;
	}
	public double getCgst() {
		return cgst;
	}
	public void setCgst(double cgst) {
		this.cgst = cgst;
	}	
	public long getTxId() {
		return txId;
	}
	public void setTxId(long txId) {
		this.txId = txId;
	}
	public String getTaxType() {
		return taxType;
	}
	public void setTaxType(String taxType) {
		this.taxType = taxType;
	}
	public double getTaxPercentage() {
		return taxPercentage;
	}
	public void setTaxPercentage(double taxPercentage) {
		this.taxPercentage = taxPercentage;
	}
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
	public TaxCreationBean(long txId, String taxType, double taxPercentage, double sgst, 
			         double cgst, long fkshopid, long fkuserid, String shopName, String userName) {
		super();
		this.txId = txId;
		this.taxType = taxType;
		this.taxPercentage = taxPercentage;
		this.cgst = cgst;
		this.sgst = sgst;
		this.fkshopid = fkshopid;
		this.fkuserid = fkuserid;
		this.shopName = shopName;
		this.userName = userName;
	}
	
	public TaxCreationBean() {
		super();
	}
	
}
