package com.Fertilizer.bean;

public class PartnerDetailsBean
{
	private String pkPartnerId;
	private String partnerName;
	private String contactNo;
	private String alternateContactNo;
	private String emailId;
	private String city;
	private String address;
	private Long transactionIdPT;
	
	public String getPkPartnerId() {
		return pkPartnerId;
	}
	public void setPkPartnerId(String pkPartnerId) {
		this.pkPartnerId = pkPartnerId;
	}
	public String getPartnerName() {
		return partnerName;
	}
	public void setPartnerName(String partnerName) {
		this.partnerName = partnerName;
	}
	public String getContactNo() {
		return contactNo;
	}
	public void setContactNo(String contactNo) {
		this.contactNo = contactNo;
	}
	public String getAlternateContactNo() {
		return alternateContactNo;
	}
	public void setAlternateContactNo(String alternateContactNo) {
		this.alternateContactNo = alternateContactNo;
	}
	public String getEmailId() {
		return emailId;
	}
	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public Long getTransactionIdPT() {
		return transactionIdPT;
	}
	public void setTransactionIdPT(Long transactionIdPT) {
		this.transactionIdPT = transactionIdPT;
	}
}
