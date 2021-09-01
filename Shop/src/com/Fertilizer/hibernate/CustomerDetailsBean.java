package com.Fertilizer.hibernate;

import java.io.Serializable;


public class CustomerDetailsBean implements Serializable{

	private long custId;
	private String firstName;
	private String middleName;
	private String lastName;
	private String address;
	private long contactNo;
	private String emailId;
	private long zipCode;
	private Long aadhar;
	private String gstno;
	private Long fkshopid;
	private Long fkuserid;
	private String shopName;
	private String userName;
	private String firmname;
	
	
    public String getFirmname() {
		return firmname;
	}
	public void setFirmname(String firmname) {
		this.firmname = firmname;
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
	public Long getAadhar() {
		return aadhar;
	}
	public void setAadhar(Long aadhar) {
		this.aadhar = aadhar;
	}
	public long getCustId() {
		return custId;
	}
	public void setCustId(long custId) {
		this.custId = custId;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getMiddleName() {
		return middleName;
	}
	public void setMiddleName(String middleName) {
		this.middleName = middleName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public long getContactNo() {
		return contactNo;
	}
	public void setContactNo(long contactNo) {
		this.contactNo = contactNo;
	}
	public String getEmailId() {
		return emailId;
	}
	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}
	public long getZipCode() {
		return zipCode;
	}
	public void setZipCode(long zipCode) {
		this.zipCode = zipCode;
	}	
	public String getGstno() {
		return gstno;
	}
	public void setGstno(String gstno) {
		this.gstno = gstno;
	}
	
	public CustomerDetailsBean(long custId, String firstName, String middleName, String lastName, String address,
			long contactNo, String emailId, long zipCode, Long aadhar, String gstno, Long fkshopid, Long fkuserid,
			String shopName, String userName) {
		super();
		this.custId = custId;
		this.firstName = firstName;
		this.middleName = middleName;
		this.lastName = lastName;
		this.address = address;
		this.contactNo = contactNo;
		this.emailId = emailId;
		this.zipCode = zipCode;
		this.aadhar = aadhar;
		this.gstno = gstno;
		this.fkshopid = fkshopid;
		this.fkuserid = fkuserid;
		this.shopName = shopName;
		this.userName = userName;
	}
	public CustomerDetailsBean() {
		super();
		// TODO Auto-generated constructor stub
	}
	




	
	
	
}
