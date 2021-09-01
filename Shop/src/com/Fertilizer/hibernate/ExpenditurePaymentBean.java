package com.Fertilizer.hibernate;

import java.util.Date;

public class ExpenditurePaymentBean {

	private Long pkExpPaymentId;
	private Long fkExpDetailId;
	private String serviceProvider;
	private Long contactNumber;
	private String accountantName;
	private Double expcredit;
	private Double expDebit;
	private Double totalAmount;
	private Date insertDate;
	private Long transNoForExpenditure;
	
	private Long fkshopid;
	private Long fkuserid;
	private String shopName;
	private String userName;
	private String expenseType;
	
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
	public String getExpenseType() {
		return expenseType;
	}
	public void setExpenseType(String expenseType) {
		this.expenseType = expenseType;
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
	public Long getTransNoForExpenditure() {
		return transNoForExpenditure;
	}
	public void setTransNoForExpenditure(Long transNoForExpenditure) {
		this.transNoForExpenditure = transNoForExpenditure;
	}
	//For Mapping
	private ExpenditureDetailsBean expenditureDetailsBean ;
		
	public ExpenditureDetailsBean getExpenditureDetailsBean() {
		return expenditureDetailsBean;
	}
	public void setExpenditureDetailsBean(
			ExpenditureDetailsBean expenditureDetailsBean) {
		this.expenditureDetailsBean = expenditureDetailsBean;
	}
	public Date getInsertDate() {
		return insertDate;
	}
	public void setInsertDate(Date insertDate) {
		this.insertDate = insertDate;
	}
	public Double getTotalAmount() {
		return totalAmount;
	}
	public void setTotalAmount(Double totalAmount) {
		this.totalAmount = totalAmount;
	}
	public Long getPkExpPaymentId() {
		return pkExpPaymentId;
	}
	public void setPkExpPaymentId(Long pkExpPaymentId) {
		this.pkExpPaymentId = pkExpPaymentId;
	}
	public Long getFkExpDetailId() {
		return fkExpDetailId;
	}
	public void setFkExpDetailId(Long fkExpDetailId) {
		this.fkExpDetailId = fkExpDetailId;
	}
	public String getServiceProvider() {
		return serviceProvider;
	}
	public void setServiceProvider(String serviceProvider) {
		this.serviceProvider = serviceProvider;
	}
	public Long getContactNumber() {
		return contactNumber;
	}
	public void setContactNumber(Long contactNumber) {
		this.contactNumber = contactNumber;
	}
	public String getAccountantName() {
		return accountantName;
	}
	public void setAccountantName(String accountantName) {
		this.accountantName = accountantName;
	}
	public Double getExpcredit() {
		return expcredit;
	}
	public void setExpcredit(Double expcredit) {
		this.expcredit = expcredit;
	}
	public Double getExpDebit() {
		return expDebit;
	}
	public void setExpDebit(Double expDebit) {
		this.expDebit = expDebit;
	}
	
	public ExpenditurePaymentBean(Long pkExpPaymentId, Long fkExpDetailId, String serviceProvider, Long contactNumber,
			String accountantName, Double expcredit, Double expDebit, Double totalAmount, Date insertDate,
			Long transNoForExpenditure, Long fkshopid, Long fkuserid, String shopName, String userName, String expenseType,
			ExpenditureDetailsBean expenditureDetailsBean) {
		super();
		this.pkExpPaymentId = pkExpPaymentId;
		this.fkExpDetailId = fkExpDetailId;
		this.serviceProvider = serviceProvider;
		this.contactNumber = contactNumber;
		this.accountantName = accountantName;
		this.expcredit = expcredit;
		this.expDebit = expDebit;
		this.totalAmount = totalAmount;
		this.insertDate = insertDate;
		this.transNoForExpenditure = transNoForExpenditure;
		this.fkshopid = fkshopid;
		this.fkuserid = fkuserid;
		this.shopName = shopName;
		this.userName = userName;
		this.expenseType = expenseType;
		this.expenditureDetailsBean = expenditureDetailsBean;
	}
	public ExpenditurePaymentBean() {
		super();
		// TODO Auto-generated constructor stub
	}
}
