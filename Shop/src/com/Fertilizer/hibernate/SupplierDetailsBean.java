package com.Fertilizer.hibernate;

public class SupplierDetailsBean {

	private long supId;
	private long fk_good_rec_id;
	private String dealerName;
	private String personName;
	private String city;
	private long contactNo;
	private long landline;
	private String emailId;
	private String tinNo;
	private String address;
	private long billnumber;
	private String productName;
	private Long fkshopid;
	private Long fkuserid;
	private String shopName;
	private String userName;
	
	private String upi_id;
	
	private String accNo;
	private String accName;
	private String ifsc;
	private Double opening_bal;
	
	
	
	public Double getOpening_bal() {
		return opening_bal;
	}
	public void setOpening_bal(Double opening_bal) {
		this.opening_bal = opening_bal;
	}
	public String getUpi_id() {
		return upi_id;
	}
	public void setUpi_id(String upi_id) {
		this.upi_id = upi_id;
	}
	public String getAccNo() {
		return accNo;
	}
	public void setAccNo(String accNo) {
		this.accNo = accNo;
	}
	public String getAccName() {
		return accName;
	}
	public void setAccName(String accName) {
		this.accName = accName;
	}
	public String getIfsc() {
		return ifsc;
	}
	public void setIfsc(String ifsc) {
		this.ifsc = ifsc;
	}
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public long getBillnumber() {
		return billnumber;
	}
	public void setBillnumber(long billnumber) {
		this.billnumber = billnumber;
	}
	public long getFk_good_rec_id() {
		return fk_good_rec_id;
	}
	public void setFk_good_rec_id(long fk_good_rec_id) {
		this.fk_good_rec_id = fk_good_rec_id;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public long getSupId() {
		return supId;
	}
	public void setSupId(long supId) {
		this.supId = supId;
	}
	public String getDealerName() {
		return dealerName;
	}
	public void setDealerName(String dealerName) {
		this.dealerName = dealerName;
	}
	public String getPersonName() {
		return personName;
	}
	public void setPersonName(String personName) {
		this.personName = personName;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public long getContactNo() {
		return contactNo;
	}
	public void setContactNo(long contactNo) {
		this.contactNo = contactNo;
	}
	public long getLandline() {
		return landline;
	}
	public void setLandline(long landline) {
		this.landline = landline;
	}
	public String getEmailId() {
		return emailId;
	}
	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}
	public String getTinNo() {
		return tinNo;
	}
	public void setTinNo(String tinNo) {
		this.tinNo = tinNo;
	} 
	
	public SupplierDetailsBean() {
		super();
		// TODO Auto-generated constructor stub
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
	public SupplierDetailsBean(long supId, long fk_good_rec_id, String dealerName, String personName, String city,
			long contactNo, long landline, String emailId, String tinNo, String address, long billnumber,
			String productName, Long fkshopid, Long fkuserid, String shopName, String userName) {
		super();
		this.supId = supId;
		this.fk_good_rec_id = fk_good_rec_id;
		this.dealerName = dealerName;
		this.personName = personName;
		this.city = city;
		this.contactNo = contactNo;
		this.landline = landline;
		this.emailId = emailId;
		this.tinNo = tinNo;
		this.address = address;
		this.billnumber = billnumber;
		this.productName = productName;
		this.fkshopid = fkshopid;
		this.fkuserid = fkuserid;
		this.shopName = shopName;
		this.userName = userName;
	}
	
		
	}
