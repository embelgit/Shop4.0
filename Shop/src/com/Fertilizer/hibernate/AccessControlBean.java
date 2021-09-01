package com.Fertilizer.hibernate;

public class AccessControlBean {
	
	private Long pk_Access_Control_id;
	private String empName;
	private String userName;
	private String password;
	private String type;
	private String shopName;
	private Long shopId;
	private Long userId;
	
	private String emailID;
	private String email_pass;
		
	
	
	public String getEmailID() {
		return emailID;
	}
	public void setEmailID(String emailID) {
		this.emailID = emailID;
	}
	public String getEmail_pass() {
		return email_pass;
	}
	public void setEmail_pass(String email_pass) {
		this.email_pass = email_pass;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public Long getPk_Access_Control_id() {
		return pk_Access_Control_id;
	}
	public void setPk_Access_Control_id(Long pk_Access_Control_id) {
		this.pk_Access_Control_id = pk_Access_Control_id;
	}
	public String getEmpName() {
		return empName;
	}
	public void setEmpName(String empName) {
		this.empName = empName;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getShopName() {
		return shopName;
	}
	public void setShopName(String shopName) {
		this.shopName = shopName;
	}
	public Long getShopId() {
		return shopId;
	}
	public void setShopId(Long shopId) {
		this.shopId = shopId;
	}
	
}
