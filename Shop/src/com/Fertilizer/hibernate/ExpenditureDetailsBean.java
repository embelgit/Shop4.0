package com.Fertilizer.hibernate;

import java.io.Serializable;
import java.util.Date;

public class ExpenditureDetailsBean implements Serializable{

	private Long pkExpenseDetailsId;
	private String expenseName;
	private String decription;
	private Date insertDate;
	private Long srNo;
	private Long fkshopid;
	private Long fkuserid;
	private String shopName;
	private String userName;
	private String expenseType;

	
	public String getExpenseType() {
		return expenseType;
	}
	public void setExpenseType(String expenseType) {
		this.expenseType = expenseType;
	}
	public String getDecription() {
		return decription;
	}
	public void setDecription(String decription) {
		this.decription = decription;
	}
	public Long getSrNo() {
		return srNo;
	}
	public void setSrNo(Long srNo) {
		this.srNo = srNo;
	}
	public Date getInsertDate() {
		return insertDate;
	}
	public void setInsertDate(Date insertDate) {
		this.insertDate = insertDate;
	}
	public Long getPkExpenseDetailsId() {
		return pkExpenseDetailsId;
	}
	public void setPkExpenseDetailsId(Long pkExpenseDetailsId) {
		this.pkExpenseDetailsId = pkExpenseDetailsId;
	}
	public String getExpenseName() {
		return expenseName;
	}
	public void setExpenseName(String expenseName) {
		this.expenseName = expenseName;
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
	public ExpenditureDetailsBean(Long pkExpenseDetailsId, String expenseName, String decription, Date insertDate,
			Long srNo, Long fkshopid, Long fkuserid, String shopName, String userName, String expenseType) {
		super();
		this.pkExpenseDetailsId = pkExpenseDetailsId;
		this.expenseName = expenseName;
		this.decription = decription;
		this.insertDate = insertDate;
		this.srNo = srNo;
		this.fkshopid = fkshopid;
		this.fkuserid = fkuserid;
		this.shopName = shopName;
		this.userName = userName;
		this.expenseType = expenseType;
	}
	public ExpenditureDetailsBean() {
		super();
		// TODO Auto-generated constructor stub
	}

	
	
}
