package com.Fertilizer.hibernate;

import java.io.Serializable;
import java.util.Date;

public class ProductDetailsBean implements Serializable {

				private Long prodctId;
				private Long fk_cat_id;
				
				private Long fk_supplier_id;
				private Long fk_unit_id;
				private Long poNumber;
				private String productName;
				private String manufacturingCompany;
				private Long fk_subCat_id;
								
				private Double buyPrice;
				private Double salePrice;
				/*private Double creditSalePrice;*/
				private Double weight;
				private Date insertDate;
				private Long status;
				private Long fkTaxId;
				private Double taxPercentage;
				private Double mrp;
				private Double sale_price_ex_tax;
				private String hsn;
				private String existedhsn;
				private String catname;
				private String subcatname;
				private Double sgst;
				private Double cgst;
				private Long fk_shop_id;
				private Long userid;
				private String shopname;
				private String username;
				private String description;
				private String buyunit;
				private String saleunit;
				private Double unitvalue;
				private String pack_type;
				
				//for mapping 
				private CategoryDetailsBean categoryDetailsBean;
				private SupplierDetailsBean supplierDetailsBean;
				private MeasuringUnitsBean MeasuringUnitsBean;
				private TaxCreationBean taxCreationBean;
				private String unitName;
				
				private Double stockAvailQuantity;
				private Double goodRecieveQuantity;
				
				
				public ProductDetailsBean() {
					super();
				}


				public ProductDetailsBean(Long prodctId, Long fk_cat_id, Long fk_supplier_id, Long fk_unit_id,
						Long poNumber, String productName, String manufacturingCompany, Long fk_subCat_id,
						Double buyPrice, Double salePrice, Double weight, Date insertDate, Long status, Long fkTaxId,
						Double taxPercentage, Double mrp, Double sale_price_ex_tax, String hsn, String existedhsn,
						String catname, String subcatname, Double sgst, Double cgst, Long fk_shop_id, Long userid,
						String shopname, String username, String description, String buyunit, String saleunit,
						Double unitvalue, String pack_type, CategoryDetailsBean categoryDetailsBean,
						SupplierDetailsBean supplierDetailsBean,
						com.Fertilizer.hibernate.MeasuringUnitsBean measuringUnitsBean, TaxCreationBean taxCreationBean,
						String unitName, Double stockAvailQuantity, Double goodRecieveQuantity) {
					super();
					this.prodctId = prodctId;
					this.fk_cat_id = fk_cat_id;
					this.fk_supplier_id = fk_supplier_id;
					this.fk_unit_id = fk_unit_id;
					this.poNumber = poNumber;
					this.productName = productName;
					this.manufacturingCompany = manufacturingCompany;
					this.fk_subCat_id = fk_subCat_id;
					this.buyPrice = buyPrice;
					this.salePrice = salePrice;
					this.weight = weight;
					this.insertDate = insertDate;
					this.status = status;
					this.fkTaxId = fkTaxId;
					this.taxPercentage = taxPercentage;
					this.mrp = mrp;
					this.sale_price_ex_tax = sale_price_ex_tax;
					this.hsn = hsn;
					this.existedhsn = existedhsn;
					this.catname = catname;
					this.subcatname = subcatname;
					this.sgst = sgst;
					this.cgst = cgst;
					this.fk_shop_id = fk_shop_id;
					this.userid = userid;
					this.shopname = shopname;
					this.username = username;
					this.description = description;
					this.buyunit = buyunit;
					this.saleunit = saleunit;
					this.unitvalue = unitvalue;
					this.pack_type = pack_type;
					this.categoryDetailsBean = categoryDetailsBean;
					this.supplierDetailsBean = supplierDetailsBean;
					MeasuringUnitsBean = measuringUnitsBean;
					this.taxCreationBean = taxCreationBean;
					this.unitName = unitName;
					this.stockAvailQuantity = stockAvailQuantity;
					this.goodRecieveQuantity = goodRecieveQuantity;
				}


				public Long getProdctId() {
					return prodctId;
				}


				public void setProdctId(Long prodctId) {
					this.prodctId = prodctId;
				}


				public Long getFk_cat_id() {
					return fk_cat_id;
				}


				public void setFk_cat_id(Long fk_cat_id) {
					this.fk_cat_id = fk_cat_id;
				}


				public Long getFk_supplier_id() {
					return fk_supplier_id;
				}


				public void setFk_supplier_id(Long fk_supplier_id) {
					this.fk_supplier_id = fk_supplier_id;
				}


				public Long getFk_unit_id() {
					return fk_unit_id;
				}


				public void setFk_unit_id(Long fk_unit_id) {
					this.fk_unit_id = fk_unit_id;
				}


				public Long getPoNumber() {
					return poNumber;
				}


				public void setPoNumber(Long poNumber) {
					this.poNumber = poNumber;
				}


				public String getProductName() {
					return productName;
				}


				public void setProductName(String productName) {
					this.productName = productName;
				}


				public String getManufacturingCompany() {
					return manufacturingCompany;
				}


				public void setManufacturingCompany(String manufacturingCompany) {
					this.manufacturingCompany = manufacturingCompany;
				}


				public Long getFk_subCat_id() {
					return fk_subCat_id;
				}


				public void setFk_subCat_id(Long fk_subCat_id) {
					this.fk_subCat_id = fk_subCat_id;
				}


				public Double getBuyPrice() {
					return buyPrice;
				}


				public void setBuyPrice(Double buyPrice) {
					this.buyPrice = buyPrice;
				}


				public Double getSalePrice() {
					return salePrice;
				}


				public void setSalePrice(Double salePrice) {
					this.salePrice = salePrice;
				}


				public Double getWeight() {
					return weight;
				}


				public void setWeight(Double weight) {
					this.weight = weight;
				}


				public Date getInsertDate() {
					return insertDate;
				}


				public void setInsertDate(Date insertDate) {
					this.insertDate = insertDate;
				}


				public Long getStatus() {
					return status;
				}


				public void setStatus(Long status) {
					this.status = status;
				}


				public Long getFkTaxId() {
					return fkTaxId;
				}


				public void setFkTaxId(Long fkTaxId) {
					this.fkTaxId = fkTaxId;
				}


				public Double getTaxPercentage() {
					return taxPercentage;
				}


				public void setTaxPercentage(Double taxPercentage) {
					this.taxPercentage = taxPercentage;
				}


				public Double getMrp() {
					return mrp;
				}


				public void setMrp(Double mrp) {
					this.mrp = mrp;
				}


				public Double getSale_price_ex_tax() {
					return sale_price_ex_tax;
				}


				public void setSale_price_ex_tax(Double sale_price_ex_tax) {
					this.sale_price_ex_tax = sale_price_ex_tax;
				}


				public String getHsn() {
					return hsn;
				}


				public void setHsn(String hsn) {
					this.hsn = hsn;
				}


				public String getExistedhsn() {
					return existedhsn;
				}


				public void setExistedhsn(String existedhsn) {
					this.existedhsn = existedhsn;
				}


				public String getCatname() {
					return catname;
				}


				public void setCatname(String catname) {
					this.catname = catname;
				}


				public String getSubcatname() {
					return subcatname;
				}


				public void setSubcatname(String subcatname) {
					this.subcatname = subcatname;
				}


				public Double getSgst() {
					return sgst;
				}


				public void setSgst(Double sgst) {
					this.sgst = sgst;
				}


				public Double getCgst() {
					return cgst;
				}


				public void setCgst(Double cgst) {
					this.cgst = cgst;
				}


				public Long getFk_shop_id() {
					return fk_shop_id;
				}


				public void setFk_shop_id(Long fk_shop_id) {
					this.fk_shop_id = fk_shop_id;
				}


				public Long getUserid() {
					return userid;
				}


				public void setUserid(Long userid) {
					this.userid = userid;
				}


				public String getShopname() {
					return shopname;
				}


				public void setShopname(String shopname) {
					this.shopname = shopname;
				}


				public String getUsername() {
					return username;
				}


				public void setUsername(String username) {
					this.username = username;
				}


				public String getDescription() {
					return description;
				}


				public void setDescription(String description) {
					this.description = description;
				}


				public String getBuyunit() {
					return buyunit;
				}


				public void setBuyunit(String buyunit) {
					this.buyunit = buyunit;
				}


				public String getSaleunit() {
					return saleunit;
				}


				public void setSaleunit(String saleunit) {
					this.saleunit = saleunit;
				}


				public Double getUnitvalue() {
					return unitvalue;
				}


				public void setUnitvalue(Double unitvalue) {
					this.unitvalue = unitvalue;
				}


				public String getPack_type() {
					return pack_type;
				}


				public void setPack_type(String pack_type) {
					this.pack_type = pack_type;
				}


				public CategoryDetailsBean getCategoryDetailsBean() {
					return categoryDetailsBean;
				}


				public void setCategoryDetailsBean(CategoryDetailsBean categoryDetailsBean) {
					this.categoryDetailsBean = categoryDetailsBean;
				}


				public SupplierDetailsBean getSupplierDetailsBean() {
					return supplierDetailsBean;
				}


				public void setSupplierDetailsBean(SupplierDetailsBean supplierDetailsBean) {
					this.supplierDetailsBean = supplierDetailsBean;
				}


				public MeasuringUnitsBean getMeasuringUnitsBean() {
					return MeasuringUnitsBean;
				}


				public void setMeasuringUnitsBean(MeasuringUnitsBean measuringUnitsBean) {
					MeasuringUnitsBean = measuringUnitsBean;
				}


				public TaxCreationBean getTaxCreationBean() {
					return taxCreationBean;
				}


				public void setTaxCreationBean(TaxCreationBean taxCreationBean) {
					this.taxCreationBean = taxCreationBean;
				}


				public String getUnitName() {
					return unitName;
				}


				public void setUnitName(String unitName) {
					this.unitName = unitName;
				}


				public Double getStockAvailQuantity() {
					return stockAvailQuantity;
				}


				public void setStockAvailQuantity(Double stockAvailQuantity) {
					this.stockAvailQuantity = stockAvailQuantity;
				}


				public Double getGoodRecieveQuantity() {
					return goodRecieveQuantity;
				}


				public void setGoodRecieveQuantity(Double goodRecieveQuantity) {
					this.goodRecieveQuantity = goodRecieveQuantity;
				}


				@Override
				public String toString() {
					return "ProductDetailsBean [prodctId=" + prodctId + ", fk_cat_id=" + fk_cat_id + ", fk_supplier_id="
							+ fk_supplier_id + ", fk_unit_id=" + fk_unit_id + ", poNumber=" + poNumber
							+ ", productName=" + productName + ", manufacturingCompany=" + manufacturingCompany
							+ ", fk_subCat_id=" + fk_subCat_id + ", buyPrice=" + buyPrice + ", salePrice=" + salePrice
							+ ", weight=" + weight + ", insertDate=" + insertDate + ", status=" + status + ", fkTaxId="
							+ fkTaxId + ", taxPercentage=" + taxPercentage + ", mrp=" + mrp + ", sale_price_ex_tax="
							+ sale_price_ex_tax + ", hsn=" + hsn + ", existedhsn=" + existedhsn + ", catname=" + catname
							+ ", subcatname=" + subcatname + ", sgst=" + sgst + ", cgst=" + cgst + ", fk_shop_id="
							+ fk_shop_id + ", userid=" + userid + ", shopname=" + shopname + ", username=" + username
							+ ", description=" + description + ", buyunit=" + buyunit + ", saleunit=" + saleunit
							+ ", unitvalue=" + unitvalue + ", pack_type=" + pack_type + ", categoryDetailsBean="
							+ categoryDetailsBean + ", supplierDetailsBean=" + supplierDetailsBean
							+ ", MeasuringUnitsBean=" + MeasuringUnitsBean + ", taxCreationBean=" + taxCreationBean
							+ ", unitName=" + unitName + ", stockAvailQuantity=" + stockAvailQuantity
							+ ", goodRecieveQuantity=" + goodRecieveQuantity + "]";
				}
				
				
								
				
}