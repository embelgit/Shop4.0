package com.Fertilizer.hibernate;

public class SubCategoryDetailsBean {
	
	private Long fk_cat_id;
	private Long subcatId;
	private String subcategoryName;
	private String categoryName;
	private Long fkshopid;
	private Long fkuserid;
	private String shopName;
	private String userName;
	
	private Long srNo;
	
	//for mapping
	private CategoryDetailsBean categoryDetailsBean;
	
	public SubCategoryDetailsBean() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public SubCategoryDetailsBean(Long fk_cat_id, Long subcatId,
			String subcategoryName, String categoryName, Long fkshopid,
			Long fkuserid, String shopName, String userName,
			CategoryDetailsBean categoryDetailsBean) {
		super();
		this.fk_cat_id = fk_cat_id;
		this.subcatId = subcatId;
		this.subcategoryName = subcategoryName;
		this.categoryName = categoryName;
		this.fkshopid = fkshopid;
		this.fkuserid = fkuserid;
		this.shopName = shopName;
		this.userName = userName;
		this.categoryDetailsBean = categoryDetailsBean;
	}

	public CategoryDetailsBean getCategoryDetailsBean() {
		return categoryDetailsBean;
	}
	public void setCategoryDetailsBean(CategoryDetailsBean categoryDetailsBean) {
		this.categoryDetailsBean = categoryDetailsBean;
	}
	public Long getSubcatId() {
		return subcatId;
	}
	public void setSubcatId(Long subcatId) {
		this.subcatId = subcatId;
	}

	public Long getFk_cat_id() {
		return fk_cat_id;
	}

	
	public Long getSrNo() {
		return srNo;
	}

	public void setSrNo(Long srNo) {
		this.srNo = srNo;
	}

	public void setFk_cat_id(Long fk_cat_id) {
		this.fk_cat_id = fk_cat_id;
	}

	public String getSubcategoryName() {
		return subcategoryName;
	}

	public void setSubcategoryName(String subcategoryName) {
		this.subcategoryName = subcategoryName;
	}
	public String getCategoryName() {
		return categoryName;
	}
	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
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
	
}
