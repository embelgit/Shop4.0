package com.Fertilizer.bean;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.Date;

public class GetProductDetailforGoodRec {
	
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
	private Double Discount;
	private Double DiscountAmount;
	private Double TotalExTax;
	
	private String unitdesc;
	private Double unitvalue;
	private String barcode_id;
	
	
	
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
	public GetProductDetailforGoodRec() {
		super();
		// TODO Auto-generated constructor stub
	}
	public GetProductDetailforGoodRec(BigInteger productID, BigInteger supplierId, String productName,
			BigDecimal buyPrice, BigDecimal salePrice, String salepriceEx, String buyPriceEx, Double quantity,
			BigDecimal weight, String batchNo, String expireDate, BigDecimal quantityForBatchNo, BigDecimal mrp,
			BigDecimal taxPercentage, Date date, String manufacturer, String unitName, String catId, String taxName,
			BigInteger catIDforVAt, String hsn, BigDecimal gst, BigDecimal igst, BigDecimal dcNum,
			BigDecimal weightAftShortMinus, BigInteger subCatId, Double cgst, Double sgst, Double igst1, Double packing,
			Long pkbookingId, Long advancebookingId, String subCatName, Double Discount, Double DiscountAmount, Double TotalExTax, String barcode_id,String unitdesc,Double unitvalue) {
		super();
		this.productID = productID;
		SupplierId = supplierId;
		this.productName = productName;
		this.buyPrice = buyPrice;
		this.salePrice = salePrice;
		this.salepriceEx = salepriceEx;
		this.buyPriceEx = buyPriceEx;
		this.quantity = quantity;
		this.weight = weight;
		this.batchNo = batchNo;
		this.expireDate = expireDate;
		this.quantityForBatchNo = quantityForBatchNo;
		this.mrp = mrp;
		this.taxPercentage = taxPercentage;
		this.date = date;
		this.manufacturer = manufacturer;
		this.unitName = unitName;
		this.catId = catId;
		this.taxName = taxName;
		this.catIDforVAt = catIDforVAt;
		this.hsn = hsn;
		this.gst = gst;
		this.igst = igst;
		this.dcNum = dcNum;
		this.weightAftShortMinus = weightAftShortMinus;
		this.subCatId = subCatId;
		this.cgst = cgst;
		this.sgst = sgst;
		this.igst1 = igst1;
		this.packing = packing;
		this.pkbookingId = pkbookingId;
		this.advancebookingId = advancebookingId;
		this.subCatName = subCatName;
		this.Discount = Discount;
		this.DiscountAmount = DiscountAmount;
		this.TotalExTax = TotalExTax;
		this.barcode_id=barcode_id;
		this.unitdesc = unitdesc;
		this.unitvalue = unitvalue;
	}
	
	
	public String getBarcode_id() {
		return barcode_id;
	}
	public void setBarcode_id(String barcode_id) {
		this.barcode_id = barcode_id;
	}
	public Double getTotalExTax() {
		return TotalExTax;
	}
	public void setTotalExTax(Double totalExTax) {
		TotalExTax = totalExTax;
	}
	public Double getDiscount() {
		return Discount;
	}
	public void setDiscount(Double discount) {
		Discount = discount;
	}
	public Double getDiscountAmount() {
		return DiscountAmount;
	}
	public void setDiscountAmount(Double discountAmount) {
		DiscountAmount = discountAmount;
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
	public String getBuyPriceEx() {
		return buyPriceEx;
	}
	public void setBuyPriceEx(String buyPriceEx) {
		this.buyPriceEx = buyPriceEx;
	}
	public Double getQuantity() {
		return quantity;
	}
	public void setQuantity(Double quantity) {
		this.quantity = quantity;
	}
	public BigDecimal getWeight() {
		return weight;
	}
	public void setWeight(BigDecimal weight) {
		this.weight = weight;
	}
	public String getBatchNo() {
		return batchNo;
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
	public BigDecimal getQuantityForBatchNo() {
		return quantityForBatchNo;
	}
	public void setQuantityForBatchNo(BigDecimal quantityForBatchNo) {
		this.quantityForBatchNo = quantityForBatchNo;
	}
	public BigDecimal getMrp() {
		return mrp;
	}
	public void setMrp(BigDecimal mrp) {
		this.mrp = mrp;
	}
	public BigDecimal getTaxPercentage() {
		return taxPercentage;
	}
	public void setTaxPercentage(BigDecimal taxPercentage) {
		this.taxPercentage = taxPercentage;
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
	public String getUnitName() {
		return unitName;
	}
	public void setUnitName(String unitName) {
		this.unitName = unitName;
	}
	public String getCatId() {
		return catId;
	}
	public void setCatId(String catId) {
		this.catId = catId;
	}
	public String getTaxName() {
		return taxName;
	}
	public void setTaxName(String taxName) {
		this.taxName = taxName;
	}
	public BigInteger getCatIDforVAt() {
		return catIDforVAt;
	}
	public void setCatIDforVAt(BigInteger catIDforVAt) {
		this.catIDforVAt = catIDforVAt;
	}
	public String getHsn() {
		return hsn;
	}
	public void setHsn(String hsn) {
		this.hsn = hsn;
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
	public Double getCgst() {
		return cgst;
	}
	public void setCgst(Double cgst) {
		this.cgst = cgst;
	}
	public Double getSgst() {
		return sgst;
	}
	public void setSgst(Double sgst) {
		this.sgst = sgst;
	}
	public Double getIgst1() {
		return igst1;
	}
	public void setIgst1(Double igst1) {
		this.igst1 = igst1;
	}
	public Double getPacking() {
		return packing;
	}
	public void setPacking(Double packing) {
		this.packing = packing;
	}
	public Long getPkbookingId() {
		return pkbookingId;
	}
	public void setPkbookingId(Long pkbookingId) {
		this.pkbookingId = pkbookingId;
	}
	public Long getAdvancebookingId() {
		return advancebookingId;
	}
	public void setAdvancebookingId(Long advancebookingId) {
		this.advancebookingId = advancebookingId;
	}
	public String getSubCatName() {
		return subCatName;
	}
	public void setSubCatName(String subCatName) {
		this.subCatName = subCatName;
	}

}
