package com.Fertilizer.hibernate;

public class PartnerDetailsBeanH
{
	private long pkPartnerId;
	private String partnerName;
	private Long contactNo;
	private Long alternateContactNo;
	private String emailId;
	private String city;
	private String address;
	private Long fk_partner_detail_id;
	private Long fkshopid;
	private Long fkuserid;
	private String shopName;
	private String userName;
	
	public long getPkPartnerId() {
		return pkPartnerId;
	}
	public void setPkPartnerId(long pkPartnerId) {
		this.pkPartnerId = pkPartnerId;
	}
	public String getPartnerName() {
		return partnerName;
	}
	public void setPartnerName(String partnerName) {
		this.partnerName = partnerName;
	}
	public Long getContactNo() {
		return contactNo;
	}
	public void setContactNo(Long contactNo) {
		this.contactNo = contactNo;
	}
	public Long getAlternateContactNo() {
		return alternateContactNo;
	}
	public void setAlternateContactNo(Long alternateContactNo) {
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
	
	public Long getFk_partner_detail_id() {
		return fk_partner_detail_id;
	}
	public void setFk_partner_detail_id(Long fk_partner_detail_id) {
		this.fk_partner_detail_id = fk_partner_detail_id;
	}

	public PartnerDetailsBeanH() {
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
	public PartnerDetailsBeanH(long pkPartnerId, String partnerName, Long contactNo, Long alternateContactNo,
			String emailId, String city, String address, Long fk_partner_detail_id, Long fkshopid, Long fkuserid,
			String shopName, String userName) {
		super();
		this.pkPartnerId = pkPartnerId;
		this.partnerName = partnerName;
		this.contactNo = contactNo;
		this.alternateContactNo = alternateContactNo;
		this.emailId = emailId;
		this.city = city;
		this.address = address;
		this.fk_partner_detail_id = fk_partner_detail_id;
		this.fkshopid = fkshopid;
		this.fkuserid = fkuserid;
		this.shopName = shopName;
		this.userName = userName;
	}
	
	
}
