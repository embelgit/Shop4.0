package com.Fertilizer.hibernate;

public class CategoryDetailsBean {

				private long catId;
				private String categoryName;
				private Long srNo;
				private String subCategoryName;
				private Long fkshopid;
				private Long fkuserid;
				private String shopName;
				private String userName;
			
				public CategoryDetailsBean(long catId, String categoryName, String subCategoryName,
						              long fkshopid, long fkuserid, String shopName, String userName) {
					super();
					this.catId = catId;
					this.categoryName = categoryName;
					this.subCategoryName = subCategoryName;
					this.fkshopid = fkshopid;
					this.fkuserid = fkuserid;
					this.shopName = shopName;
					this.userName = userName;
				}

				public long getCatId() {
					return catId;
				}

				public void setCatId(long catId) {
					this.catId = catId;
				}

				public String getCategoryName() {
					return categoryName;
				}
			
				public void setCategoryName(String categoryName) {
					this.categoryName = categoryName;
				}

				public String getSubCategoryName() {
					return subCategoryName;
				}

				public void setSubCategoryName(String subCategoryName) {
					this.subCategoryName = subCategoryName;
				}

				public Long getSrNo() {
					return srNo;
				}

				public void setSrNo(Long srNo) {
					this.srNo = srNo;
				}

				public CategoryDetailsBean() {
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
				
}
