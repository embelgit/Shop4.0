package com.Fertilizer.hibernate;

import java.util.Date;

public class PartnerTransactionBeanH {
	
	private Long pk_partner_Transactions_id;
	private Long fk_partner_detail_id;
	private String accountantName;
	private Double creditPT;
	private Double debitPT;
	private Double totalAmount;
	private Date insertDatePT;
	private Long transactoin_No_partner_Transactions;
	private String partnerName;
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
	
	
	
	public String getPartnerName() {
		return partnerName;
	}
	public void setPartnerName(String partnerName) {
		this.partnerName = partnerName;
	}
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
	public Long getPk_partner_Transactions_id() {
		return pk_partner_Transactions_id;
	}
	public void setPk_partner_Transactions_id(Long pk_partner_Transactions_id) {
		this.pk_partner_Transactions_id = pk_partner_Transactions_id;
	}
	public Long getFk_partner_detail_id() {
		return fk_partner_detail_id;
	}
	public void setFk_partner_detail_id(Long fk_partner_detail_id) {
		this.fk_partner_detail_id = fk_partner_detail_id;
	}
	public String getAccountantName() {
		return accountantName;
	}
	public void setAccountantName(String accountantName)
	{
		this.accountantName = accountantName;
	}
	public Double getCreditPT() {
		return creditPT;
	}
	public void setCreditPT(Double creditPT) {
		this.creditPT = creditPT;
	}
	public Double getDebitPT() {
		return debitPT;
	}
	public void setDebitPT(Double debitPT) {
		this.debitPT = debitPT;
	}
	public Double getTotalAmount() {
		return totalAmount;
	}
	public void setTotalAmount(Double totalAmount) {
		this.totalAmount = totalAmount;
	}
	public Date getInsertDatePT() {
		return insertDatePT;
	}
	public void setInsertDatePT(Date insertDatePT) {
		this.insertDatePT = insertDatePT;
	}
	public Long getTransactoin_No_partner_Transactions() {
		return transactoin_No_partner_Transactions;
	}
	public void setTransactoin_No_partner_Transactions(Long transactoin_No_partner_Transactions) {
		this.transactoin_No_partner_Transactions = transactoin_No_partner_Transactions;
	}
	public PartnerTransactionBeanH(Long pk_partner_Transactions_id, Long fk_partner_detail_id, String accountantName,
			Double creditPT, Double debitPT, Double totalAmount, Date insertDatePT,
			Long transactoin_No_partner_Transactions, Long fkshopid, Long fkuserid, String shopName, String userName) {
		super();
		this.pk_partner_Transactions_id = pk_partner_Transactions_id;
		this.fk_partner_detail_id = fk_partner_detail_id;
		this.accountantName = accountantName;
		this.creditPT = creditPT;
		this.debitPT = debitPT;
		this.totalAmount = totalAmount;
		this.insertDatePT = insertDatePT;
		this.transactoin_No_partner_Transactions = transactoin_No_partner_Transactions;
		this.fkshopid = fkshopid;
		this.fkuserid = fkuserid;
		this.shopName = shopName;
		this.userName = userName;
	}
	public PartnerTransactionBeanH() {
		super();
		// TODO Auto-generated constructor stub
	}
	
}
