package com.Fertilizer.hibernate;

import java.util.Date;

public class creditnotebean {


	private Long pk_creditnote_id;
	private Long txId;
	private String partyname;
	private String description;
	private Double amount;
	private Date insertDate;
	
	private Long fkshopid;
	private Long fkuserid;
	private String shopName;
	private String userName;

	private String chequeNum;
	private Long cardNum;
	private Long accNum;
	
	private String paymentMode;
	private String nameOnCheck;
	private String bankName;
	
	
	
	public String getChequeNum() {
		return chequeNum;
	}
	public void setChequeNum(String chequeNum) {
		this.chequeNum = chequeNum;
	}
	public Long getCardNum() {
		return cardNum;
	}
	public void setCardNum(Long cardNum) {
		this.cardNum = cardNum;
	}
	public Long getAccNum() {
		return accNum;
	}
	public void setAccNum(Long accNum) {
		this.accNum = accNum;
	}
	public String getPaymentMode() {
		return paymentMode;
	}
	public void setPaymentMode(String paymentMode) {
		this.paymentMode = paymentMode;
	}
	public String getNameOnCheck() {
		return nameOnCheck;
	}
	public void setNameOnCheck(String nameOnCheck) {
		this.nameOnCheck = nameOnCheck;
	}
	public String getBankName() {
		return bankName;
	}
	public void setBankName(String bankName) {
		this.bankName = bankName;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
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
	public Long getPk_creditnote_id() {
		return pk_creditnote_id;
	}
	public void setPk_creditnote_id(Long pk_creditnote_id) {
		this.pk_creditnote_id = pk_creditnote_id;
	}
	public Long getTxId() {
		return txId;
	}
	public void setTxId(Long txId) {
		this.txId = txId;
	}
	public String getPartyname() {
		return partyname;
	}
	public void setPartyname(String partyname) {
		this.partyname = partyname;
	}
	public String getdescription() {
		return description;
	}
	public void setdescription(String  description) {
		this.description = description;
	}
	public Double getAmount() {
		return amount;
	}
	public void setAmount(Double amount) {
		this.amount = amount;
	}
	public Date getInsertDate() {
		return insertDate;
	}
	public void setInsertDate(Date insertDate) {
		this.insertDate = insertDate;
	}
	public creditnotebean() {
		super();
		// TODO Auto-generated constructor stub
	}
}
