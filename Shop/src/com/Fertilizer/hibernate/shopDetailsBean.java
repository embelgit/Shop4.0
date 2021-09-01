package com.Fertilizer.hibernate;

public class shopDetailsBean
{
				private long shopId;
				private String shopName;
				private Long contactNumber;
				private String gstNo;
				private String address;
				private String wholesalelicno;
				private String shoplicno;
				private String footershopname;
								
				public shopDetailsBean() {
					super();
					// TODO Auto-generated constructor stub
				}
				
				public shopDetailsBean(long shopId, String shopName, Long contactNumber, String gstNo,
						String address) {
					super();
					this.shopId = shopId;
					this.shopName = shopName;
					this.contactNumber = contactNumber;
					this.gstNo = gstNo;
					this.address = address;
				}

				public long getShopId() {
					return shopId;
				}
				public void setShopId(long shopId) {
					this.shopId = shopId;
				}
				public String getShopName() {
					return shopName;
				}
				public void setShopName(String shopName) {
					this.shopName = shopName;
				}

				public Long getContactNumber() {
					return contactNumber;
				}

				public void setContactNumber(Long contactNumber) {
					this.contactNumber = contactNumber;
				}

				public String getGstNo() {
					return gstNo;
				}

				public void setGstNo(String gstNo) {
					this.gstNo = gstNo;
				}

				public String getAddress() {
					return address;
				}

				public void setAddress(String address) {
					this.address = address;
				}

				public String getWholesalelicno() {
					return wholesalelicno;
				}

				public void setWholesalelicno(String wholesalelicno) {
					this.wholesalelicno = wholesalelicno;
				}

				public String getShoplicno() {
					return shoplicno;
				}

				public void setShoplicno(String shoplicno) {
					this.shoplicno = shoplicno;
				}

				public String getFootershopname() {
					return footershopname;
				}

				public void setFootershopname(String footershopname) {
					this.footershopname = footershopname;
				}
				
				
					
}


				