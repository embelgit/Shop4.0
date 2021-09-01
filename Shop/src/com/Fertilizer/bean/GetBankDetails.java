package com.Fertilizer.bean;

public class GetBankDetails {
	
	private String bankName;
	private long accountNo;
	private String ifscCode;
	private String branchName;
	private String accountHolderName;
	private long contactNo;
	private String address;
	private long pkbankid;
	
	
	
	public long getPkbankid() {
		return pkbankid;
	}
	public void setPkbankid(long pkbankid) {
		this.pkbankid = pkbankid;
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
	public GetBankDetails(String bankName, long accountNo, String ifscCode, String branchName, String accountHolderName,
			long contactNo, String address) {
		super();
		this.bankName = bankName;
		this.accountNo = accountNo;
		this.ifscCode = ifscCode;
		this.branchName = branchName;
		this.accountHolderName = accountHolderName;
		this.contactNo = contactNo;
		this.address = address;
	}
	public GetBankDetails() {
		super();
		// TODO Auto-generated constructor stub
	}
}
