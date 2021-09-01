package com.Fertilizer.hibernate;

public class BankDetailsBean {
	
	private long pkbankdetailsID;
	private String bankName;
	private long accountNo;
	private String ifscCode;
	private String branchName;
	private String accountHolderName;
	private long contactNo;
	private String address;
	private Long fkshopid;
	private Long fkuserid;
	private String shopName;
	private String userName;
	
	public long getPkbankdetailsID() {
		return pkbankdetailsID;
	}
	public void setPkbankdetailsID(long pkbankdetailsID) {
		this.pkbankdetailsID = pkbankdetailsID;
	}
	public String getBankName() {
		return bankName;
	}
	public void setBankName(String bankName) {
		this.bankName = bankName;
	}
	public long getAccountNo() {
		return accountNo;
	}
	public void setAccountNo(long accountNo) {
		this.accountNo = accountNo;
	}
	public String getIfscCode() {
		return ifscCode;
	}
	public void setIfscCode(String ifscCode) {
		this.ifscCode = ifscCode;
	}
	public String getBranchName() {
		return branchName;
	}
	public void setBranchName(String branchName) {
		this.branchName = branchName;
	}
	public String getAccountHolderName() {
		return accountHolderName;
	}
	public void setAccountHolderName(String accountHolderName) {
		this.accountHolderName = accountHolderName;
	}
	public long getContactNo() {
		return contactNo;
	}
	public void setContactNo(long contactNo) {
		this.contactNo = contactNo;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
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
	public BankDetailsBean(long pkbankdetailsID, String bankName, long accountNo, String ifscCode, String branchName,
			String accountHolderName, long contactNo, String address, Long fkshopid, Long fkuserid, String shopName,
			String userName) {
		super();
		this.pkbankdetailsID = pkbankdetailsID;
		this.bankName = bankName;
		this.accountNo = accountNo;
		this.ifscCode = ifscCode;
		this.branchName = branchName;
		this.accountHolderName = accountHolderName;
		this.contactNo = contactNo;
		this.address = address;
		this.fkshopid = fkshopid;
		this.fkuserid = fkuserid;
		this.shopName = shopName;
		this.userName = userName;
	}
	public BankDetailsBean() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	

}
