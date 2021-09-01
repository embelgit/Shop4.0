package com.Fertilizer.hibernate;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Set;

import org.apache.commons.lang.builder.ToStringBuilder;


/** @author Hibernate CodeGenerator */
public class ItemStockForSeedAndPesti implements Serializable {

    /** identifier field */
    private Long pkItemStockId;

    /** persistent field */
    private Long stock;
    
    private String batchNo;

    /** persistent field */
    private Long fkProductId;
    private Long fkCatId;
    private Long fkGodwonId;
 
    /** persistent field */
    private ProductDetailsBean productDetailsBean;
    private GodownEntry godownEntry;
    private CategoryDetailsBean categoryDetailsBean;

    
    


	public ItemStockForSeedAndPesti(Long pkItemStockId, Long stock,
			String batchNo, Long fkProductId, Long fkCatId, Long fkGodwonId,
			ProductDetailsBean productDetailsBean, GodownEntry godownEntry,
			CategoryDetailsBean categoryDetailsBean) {
		super();
		this.pkItemStockId = pkItemStockId;
		this.stock = stock;
		this.batchNo = batchNo;
		this.fkProductId = fkProductId;
		this.fkCatId = fkCatId;
		this.fkGodwonId = fkGodwonId;
		this.productDetailsBean = productDetailsBean;
		this.godownEntry = godownEntry;
		this.categoryDetailsBean = categoryDetailsBean;
	}


	public ItemStockForSeedAndPesti() {
		super();
		// TODO Auto-generated constructor stub
	}


	public Long getFkCatId() {
		return fkCatId;
	}


	public void setFkCatId(Long fkCatId) {
		this.fkCatId = fkCatId;
	}


	public Long getFkGodwonId() {
		return fkGodwonId;
	}


	public void setFkGodwonId(Long fkGodwonId) {
		this.fkGodwonId = fkGodwonId;
	}


	public GodownEntry getGodownEntry() {
		return godownEntry;
	}


	public void setGodownEntry(GodownEntry godownEntry) {
		this.godownEntry = godownEntry;
	}


	public CategoryDetailsBean getCategoryDetailsBean() {
		return categoryDetailsBean;
	}


	public void setCategoryDetailsBean(CategoryDetailsBean categoryDetailsBean) {
		this.categoryDetailsBean = categoryDetailsBean;
	}


	public Long getPkItemStockId() {
		return pkItemStockId;
	}


	public void setPkItemStockId(Long pkItemStockId) {
		this.pkItemStockId = pkItemStockId;
	}


	public Long getStock() {
		return stock;
	}


	public void setStock(Long stock) {
		this.stock = stock;
	}


	public String getBatchNo() {
		return batchNo;
	}


	public void setBatchNo(String batchNo) {
		this.batchNo = batchNo;
	}


	public Long getFkProductId() {
		return fkProductId;
	}


	public void setFkProductId(Long fkProductId) {
		this.fkProductId = fkProductId;
	}


	public ProductDetailsBean getProductDetailsBean() {
		return productDetailsBean;
	}


	public void setProductDetailsBean(ProductDetailsBean productDetailsBean) {
		this.productDetailsBean = productDetailsBean;
	}


	
}
