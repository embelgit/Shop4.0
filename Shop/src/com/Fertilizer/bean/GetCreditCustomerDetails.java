package com.Fertilizer.bean;

import java.math.BigDecimal;
import java.math.BigInteger;


public class GetCreditCustomerDetails {

	private String village;
	private String firstName;
	private String lastName;
	private String middleName;
	private String address;
	private String email;
	private BigInteger zipCode;
	private BigInteger contactNo;
	private String insertDate;
	private BigInteger billNo;
	private Double totalAmount;
	private Double balance; 
	private BigInteger aadhar;
	private String gstno;
	
	private long pksuppid;
	private String firmname;
	
	
	
	public String getFirmname() {
		return firmname;
	}
	public void setFirmname(String firmname) {
		this.firmname = firmname;
	}
	public long getPksuppid() {
		return pksuppid;
	}
	public void setPksuppid(long pksuppid) {
		this.pksuppid = pksuppid;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getMiddleName() {
		return middleName;
	}
	public void setMiddleName(String middleName) {
		this.middleName = middleName;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public BigInteger getZipCode() {
		return zipCode;
	}
	public void setZipCode(BigInteger zipCode) {
		this.zipCode = zipCode;
	}
	public Double getBalance() {
		return balance;
	}
	public void setBalance(Double balance) {
		this.balance = balance;
	}
	public String getVillage() {
		return village;
	}
	public void setVillage(String village) {
		this.village = village;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public BigInteger getContactNo() {
		return contactNo;
	}
	public void setContactNo(BigInteger contactNo) {
		this.contactNo = contactNo;
	}
	
	public BigInteger getBillNo() {
		return billNo;
	}
	public void setBillNo(BigInteger billNo) {
		this.billNo = billNo;
	}
	public String getInsertDate() {
		return insertDate;
	}
	public void setInsertDate(String insertDate) {
		this.insertDate = insertDate;
	}
	public Double getTotalAmount() {
		return totalAmount;
	}
	public void setTotalAmount(Double totalAmount) {
		this.totalAmount = totalAmount;
	}
	public BigInteger getAadhar() {
		return aadhar;
	}
	public void setAadhar(BigInteger aadhar) {
		this.aadhar = aadhar;
	}
	public String getGstno() {
		return gstno;
	}
	public void setGstno(String gstno) {
		this.gstno = gstno;
	}	
}
