package com.Fertilizer.hibernate;

import java.io.Serializable;
import java.util.Date;

public class MeasuringUnitsBean implements Serializable {
	
			private Long pkUnitId;
			private String unitName;
			private Date insertDate;
			private String unitDescription;		
			private Long fkshopid;
			private Long fkuserid;
			private String shopName;
			private String userName;
			private Double unitvalue;
			
			public MeasuringUnitsBean(Long pkUnitId, String unitName, Date insertDate, String unitDescription,
					Long fkshopid, Long fkuserid, String shopName, String userName,Double unitvalue) {
				super();
				this.pkUnitId = pkUnitId;
				this.unitName = unitName;
				this.insertDate = insertDate;
				this.unitDescription = unitDescription;
				this.fkshopid = fkshopid;
				this.fkuserid = fkuserid;
				this.shopName = shopName;
				this.userName = userName;
				this.unitvalue = unitvalue;
			}
			
			
			public Double getUnitvalue() {
				return unitvalue;
			}


			public void setUnitvalue(Double unitvalue) {
				this.unitvalue = unitvalue;
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
			public String getUnitDescription() {
				return unitDescription;
			}
			public void setUnitDescription(String unitDescription) {
				this.unitDescription = unitDescription;
			}
			public Date getInsertDate() {
				return insertDate;
			}
			public void setInsertDate(Date insertDate) {
				this.insertDate = insertDate;
			}
			public Long getPkUnitId() {
				return pkUnitId;
			}
			public void setPkUnitId(Long pkUnitId) {
				this.pkUnitId = pkUnitId;
			}
			public String getUnitName() {
				return unitName;
			}
			public void setUnitName(String unitName) {
				this.unitName = unitName;
			}
			
			public MeasuringUnitsBean() {
				super();
			}
			
			
	
	
}

