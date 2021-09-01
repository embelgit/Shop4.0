package com.Fertilizer.hibernate;

import java.io.Serializable;
import java.util.Date;

public class CustomerPaymentBean implements Serializable{

	private Long pkCustPaymentId;
	private Long catId;
	private Long customer;
	private Long billNo;
	private String chequeNum;
	private String firstName;
	private String bill;
	private String lastName;
	private Long cardNum;
	private Long accNum;
	private Long regNumber;
	private long shopId;
	private String paymentMode;
	private String nameOnCheck;
	private String bankName;
	private String personname;
	
	private Double totalAmount;
	private Double paidAmount;
	
	private Date billDate;
	private Long transNoForCustomer;
	private String customername;
	private Double balance;
	private Double credit;
	private String paymentType;
	
	private Date insertDate;
	
	private Long fkshopid;
	private Long fkuserid;
	private String shopName;
	private String userName;
	
	
	
	public String getCustomername() {
		return customername;
	}

	public void setCustomername(String customername) {
		this.customername = customername;
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

	public Long getTransNoForCustomer() {
		return transNoForCustomer;
	}

	public void setTransNoForCustomer(Long transNoForCustomer) {
		this.transNoForCustomer = transNoForCustomer;
	}

	public String getBill() {
		return bill;
	}

	public void setBill(String bill) {
		this.bill = bill;
	}

	public Double getPaidAmount() {
		return paidAmount;
	}

	public void setPaidAmount(Double paidAmount) {
		this.paidAmount = paidAmount;
	}

	private Double balanceAmount;
	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public Double getBalanceAmount() {
		return balanceAmount;
	}

	public void setBalanceAmount(Double balanceAmount) {
		this.balanceAmount = balanceAmount;
	}
		
	public Long getCatId() {
		return catId;
	}

	public void setCatId(Long catId) {
		this.catId = catId;
	}

	public Long getPkCustPaymentId() {
		return pkCustPaymentId;
	}

	public void setPkCustPaymentId(Long pkCustPaymentId) {
		this.pkCustPaymentId = pkCustPaymentId;
	}

	public Long getCustomer() {
		return customer;
	}

	public void setCustomer(Long customer) {
		this.customer = customer;
	}

	public Long getBillNo() {
		return billNo;
	}

	public void setBillNo(Long billNo) {
		this.billNo = billNo;
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

	public Long getRegNumber() {
		return regNumber;
	}

	public void setRegNumber(Long regNumber) {
		this.regNumber = regNumber;
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

	public String getPersonname() {
		return personname;
	}

	public void setPersonname(String personname) {
		this.personname = personname;
	}

	public Double getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(Double totalAmount) {
		this.totalAmount = totalAmount;
	}

	public Double getBalance() {
		return balance;
	}

	public void setBalance(Double balance) {
		this.balance = balance;
	}

	public Double getCredit() {
		return credit;
	}

	public void setCredit(Double credit) {
		this.credit = credit;
	}

	public Date getInsertDate() {
		return insertDate;
	}

	public void setInsertDate(Date insertDate) {
		this.insertDate = insertDate;
	}

	public String getPaymentType() {
		return paymentType;
	}

	public void setPaymentType(String paymentType) {
		this.paymentType = paymentType;
	}

	public Date getBillDate() {
		return billDate;
	}

	public void setBillDate(Date billDate) {
		this.billDate = billDate;
	}

	public long getShopId() {
		return shopId;
	}

	public void setShopId(long shopId) {
		this.shopId = shopId;
	}
	
	public CustomerPaymentBean(Long pkCustPaymentId, Long catId, Long customer, Long billNo, String chequeNum,
			String firstName, String bill, String lastName, Long cardNum, Long accNum, Long regNumber, long shopId,
			String paymentMode, String nameOnCheck, String bankName, String personname, Double totalAmount,
			Double paidAmount, Date billDate, Long transNoForCustomer, Double balance, Double credit,
			String paymentType, Date insertDate, Long fkshopid, Long fkuserid, String shopName, String userName,
			Double balanceAmount) {
		super();
		this.pkCustPaymentId = pkCustPaymentId;
		this.catId = catId;
		this.customer = customer;
		this.billNo = billNo;
		this.chequeNum = chequeNum;
		this.firstName = firstName;
		this.bill = bill;
		this.lastName = lastName;
		this.cardNum = cardNum;
		this.accNum = accNum;
		this.regNumber = regNumber;
		this.shopId = shopId;
		this.paymentMode = paymentMode;
		this.nameOnCheck = nameOnCheck;
		this.bankName = bankName;
		this.personname = personname;
		this.totalAmount = totalAmount;
		this.paidAmount = paidAmount;
		this.billDate = billDate;
		this.transNoForCustomer = transNoForCustomer;
		this.balance = balance;
		this.credit = credit;
		this.paymentType = paymentType;
		this.insertDate = insertDate;
		this.fkshopid = fkshopid;
		this.fkuserid = fkuserid;
		this.shopName = shopName;
		this.userName = userName;
		this.balanceAmount = balanceAmount;
	}

	public CustomerPaymentBean() {
		super();
		// TODO Auto-generated constructor stub
	}
}
