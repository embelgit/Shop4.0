package com.Fertilizer.bean;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.Date;

public class GetProductDetailPO {

			private BigInteger productID;
			private BigInteger SupplierId;
			private String productName;
			private BigDecimal buyPrice;
			private BigDecimal salePrice;
			private String salepriceEx;
			private String buyPriceEx;
			private Double quantity;
			private BigDecimal weight;
			private String batchNo;
			private String expireDate;
			private BigDecimal quantityForBatchNo;
			private BigDecimal mrp;
			private BigDecimal taxPercentage;
			private Date date;
			private String manufacturer;
			private String unitName;
			private String catId;
			private String taxName;
			private BigInteger catIDforVAt;
			private String hsn;
			private BigDecimal gst;
			private BigDecimal igst;
			private BigDecimal dcNum; 
			private BigDecimal weightAftShortMinus;
			private BigInteger subCatId;
			private Double cgst;
			private Double sgst;
			private Double igst1;
			private Double packing;
			private Long pkbookingId;
			private Long advancebookingId;
			private String subCatName;
			private BigDecimal Discount;
			private BigDecimal DiscountAmount;
			private Double TotalExTax;		
			private Double Total;	
			private Double grossTotal;
			
			private String unitdesc;
			private Double unitvalue;
			
			
			
			public String getUnitdesc() {
				return unitdesc;
			}
			public void setUnitdesc(String unitdesc) {
				this.unitdesc = unitdesc;
			}
			public Double getUnitvalue() {
				return unitvalue;
			}
			public void setUnitvalue(Double unitvalue) {
				this.unitvalue = unitvalue;
			}
			public Double getGrossTotal() {
				return grossTotal;
			}
			public void setGrossTotal(Double grossTotal) {
				this.grossTotal = grossTotal;
			}
			public Double getTotal() {
				return Total;
			}
			public void setTotal(Double total) {
				Total = total;
			}
			public Double getTotalExTax() {
				return TotalExTax;
			}
			public void setTotalExTax(Double totalExTax) {
				TotalExTax = totalExTax;
			}
			public BigDecimal getDiscount() {
				return Discount;
			}
			public void setDiscount(BigDecimal discount) {
				Discount = discount;
			}
			public BigDecimal getDiscountAmount() {
				return DiscountAmount;
			}
			public void setDiscountAmount(BigDecimal discountAmount) {
				DiscountAmount = discountAmount;
			}
			public String getSubCatName() {
				return subCatName;
			}
			public void setSubCatName(String subCatName) {
				this.subCatName = subCatName;
			}
			public Long getAdvancebookingId() {
				return advancebookingId;
			}
			public void setAdvancebookingId(Long advancebookingId) {
				this.advancebookingId = advancebookingId;
			}
			public Long getPkbookingId() {
				return pkbookingId;
			}
			public void setPkbookingId(Long pkbookingId) {
				this.pkbookingId = pkbookingId;
			}
			public Double getPacking() {
				return packing;
			}
			public void setPacking(Double packing) {
				this.packing = packing;
			}
			public String getBuyPriceEx() {
				return buyPriceEx;
			}
			public void setBuyPriceEx(String buyPriceEx) {
				this.buyPriceEx = buyPriceEx;
			}
			public Double getIgst1() {
				return igst1;
			}
			public void setIgst1(Double igst1) {
				this.igst1 = igst1;
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
			public String getBatchNo() {
				return batchNo;
			}
			public BigInteger getCatIDforVAt() {
				return catIDforVAt;
			}
			public void setCatIDforVAt(BigInteger catIDforVAt) {
				this.catIDforVAt = catIDforVAt;
			}
			public String getUnitName() {
				return unitName;
			}
			public void setUnitName(String unitName) {
				this.unitName = unitName;
			}
			public BigDecimal getMrp() {
				return mrp;
			}
			public void setMrp(BigDecimal mrp) {
				this.mrp = mrp;
			}
			
			public BigDecimal getGst() {
				return gst;
			}
			public void setGst(BigDecimal gst) {
				this.gst = gst;
			}
			public BigDecimal getIgst() {
				return igst;
			}
			public void setIgst(BigDecimal igst) {
				this.igst = igst;
			}
			public void setBatchNo(String batchNo) {
				this.batchNo = batchNo;
			}
			public String getExpireDate() {
				return expireDate;
			}
			public void setExpireDate(String expireDate) {
				this.expireDate = expireDate;
			}
			public BigDecimal getWeight() {
				return weight;
			}
			public void setWeight(BigDecimal weight) {
				this.weight = weight;
			}
			public BigInteger getProductID() {
				return productID;
			}
			public void setProductID(BigInteger productID) {
				this.productID = productID;
			}
			public BigInteger getSupplierId() {
				return SupplierId;
			}
			public void setSupplierId(BigInteger supplierId) {
				SupplierId = supplierId;
			}
			public String getProductName() {
				return productName;
			}
			public void setProductName(String productName) {
				this.productName = productName;
			}
			public BigDecimal getBuyPrice() {
				return buyPrice;
			}
			public void setBuyPrice(BigDecimal buyPrice) {
				this.buyPrice = buyPrice;
			}
			public BigDecimal getSalePrice() {
				return salePrice;
			}
			public void setSalePrice(BigDecimal salePrice) {
				this.salePrice = salePrice;
			}
			
			public String getSalepriceEx() {
				return salepriceEx;
			}
			public void setSalepriceEx(String salepriceEx) {
				this.salepriceEx = salepriceEx;
			}
			public Double getQuantity() {
				return quantity;
			}
			public void setQuantity(Double quantity) {
				this.quantity = quantity;
			}
			public BigDecimal getQuantityForBatchNo() {
				return quantityForBatchNo;
			}
			public void setQuantityForBatchNo(BigDecimal quantityForBatchNo) {
				this.quantityForBatchNo = quantityForBatchNo;
			}
			public Date getDate() {
				return date;
			}
			public void setDate(Date date) {
				this.date = date;
			}
			public String getManufacturer() {
				return manufacturer;
			}
			public void setManufacturer(String manufacturer) {
				this.manufacturer = manufacturer;
			}
			public String getCatId() {
				return catId;
			}
			public void setCatId(String catId) {
				this.catId = catId;
			}
			public String getHsn() {
				return hsn;
			}
			public void setHsn(String hsn) {
				this.hsn = hsn;
			}
			public String getTaxName() {
				return taxName;
			}
			public void setTaxName(String taxName) {
				this.taxName = taxName;
			}
			public BigDecimal getTaxPercentage() {
				return taxPercentage;
			}
			public void setTaxPercentage(BigDecimal taxPercentage) {
				this.taxPercentage = taxPercentage;
			}
			public BigDecimal getDcNum() {
				return dcNum;
			}
			public void setDcNum(BigDecimal dcNum) {
				this.dcNum = dcNum;
			}
			public BigDecimal getWeightAftShortMinus() {
				return weightAftShortMinus;
			}
			public void setWeightAftShortMinus(BigDecimal weightAftShortMinus) {
				this.weightAftShortMinus = weightAftShortMinus;
			}
			public BigInteger getSubCatId() {
				return subCatId;
			}
			public void setSubCatId(BigInteger subCatId) {
				this.subCatId = subCatId;
			}
			
			
			
			
}
