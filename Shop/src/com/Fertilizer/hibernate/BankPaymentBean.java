package com.Fertilizer.hibernate;

import java.util.Date;

public class BankPaymentBean {
	
	private Long pkBankPaymentId;
	private Long fkbankdetailId;
	private String bankName;
	private Date insertDate;
	private String reportDate;
	private Long accountNumber;
	private String ifscCode;
	private String accountantName;
	private Long contactNumber;
	private Double creditAmt;
	private Double DebitAmt;
		
	private Long transNoForBank;
	
	private Long fkshopid;
	private Long fkuserid;
	private String shopName;
	private String userName;
	
	private String chequeNum;
	private Long cardNum;
	private Long accNum;
	
	private String paymentMode;
	private String nameOnCheck;

	public String getBankNamepay() {
		return bankNamepay;
	}
	public void setBankNamepay(String bankNamepay) {
		this.bankNamepay = bankNamepay;
	}
	private String bankNamepay;
	
	
	
	public String getReportDate() {
		return reportDate;
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
	public void setReportDate(String reportDate) {
		this.reportDate = reportDate;
	}
	public Long getPkBankPaymentId() {
		return pkBankPaymentId;
	}
	public void setPkBankPaymentId(Long pkBankPaymentId) {
		this.pkBankPaymentId = pkBankPaymentId;
	}
	public Long getFkbankdetailId() {
		return fkbankdetailId;
	}
	public void setFkbankdetailId(Long fkbankdetailId) {
		this.fkbankdetailId = fkbankdetailId;
	}
	public String getBankName() {
		return bankName;
	}
	public void setBankName(String bankName) {
		this.bankName = bankName;
	}
	public Date getInsertDate() {
		return insertDate;
	}
	public void setInsertDate(Date insertDate) {
		this.insertDate = insertDate;
	}
	public Long getAccountNumber() {
		return accountNumber;
	}
	public void setAccountNumber(Long accountNumber) {
		this.accountNumber = accountNumber;
	}
	public String getIfscCode() {
		return ifscCode;
	}
	public void setIfscCode(String ifscCode) {
		this.ifscCode = ifscCode;
	}
	public String getAccountantName() {
		return accountantName;
	}
	public void setAccountantName(String accountantName) {
		this.accountantName = accountantName;
	}
	public Long getContactNumber() {
		return contactNumber;
	}
	public void setContactNumber(Long contactNumber) {
		this.contactNumber = contactNumber;
	}
	public Double getCreditAmt() {
		return creditAmt;
	}
	public void setCreditAmt(Double creditAmt) {
		this.creditAmt = creditAmt;
	}
	public Double getDebitAmt() {
		return DebitAmt;
	}
	public void setDebitAmt(Double debitAmt) {
		DebitAmt = debitAmt;
	}
	public Long getTransNoForBank() {
		return transNoForBank;
	}
	public void setTransNoForBank(Long transNoForBank) {
		this.transNoForBank = transNoForBank;
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
	
	public BankPaymentBean(Long pkBankPaymentId, Long fkbankdetailId, String bankName, Date insertDate,
			Long accountNumber, String ifscCode, String accountantName, Long contactNumber, Double creditAmt,
			Double DebitAmt, Long transNoForBank, Long fkshopid, Long fkuserid, String shopName, String userName,
			String reportDate) {
		super();
		this.pkBankPaymentId = pkBankPaymentId;
		this.fkbankdetailId = fkbankdetailId;
		this.bankName = bankName;
		this.insertDate = insertDate;
		this.accountNumber = accountNumber;
		this.ifscCode = ifscCode;
		this.accountantName = accountantName;
		this.contactNumber = contactNumber;
		this.creditAmt = creditAmt;
		this.DebitAmt = DebitAmt;
		this.transNoForBank = transNoForBank;
		this.fkshopid = fkshopid;
		this.fkuserid = fkuserid;
		this.shopName = shopName;
		this.userName = userName;
		this.reportDate = reportDate;
	}
	public BankPaymentBean() {
		super();
		// TODO Auto-generated constructor stub
	}
}
