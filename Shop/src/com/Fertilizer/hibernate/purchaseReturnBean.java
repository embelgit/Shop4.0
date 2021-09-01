package com.Fertilizer.hibernate;
  
import java.util.Date;
  
public class purchaseReturnBean {
  
  private Long purchase_return_pk;
  private Long fk_supplier_id;
  private Long pkPOId; 
  private String supplier;
  private Long dcNum ;
  private Double weightAftShortMinus; 
  private Double tax_percentage; 
  private Double taxAmount; 
  private String productName; 
  private Double dupQuantity1; 
  private Double buyPrice ; 
  private Double salePrice ; 
  private Double weight ; 
  private Double totalAmount; 
  private Double quantity ; 
  private Date expiryDate;
      
  //purchase Return
  private String product_name; 
  private Double buy_price; 
  private Double sale_price; 
  private String catName;
  private String company_Name; 
  private Double return_quanty; 
  private Double price; 
  private Double conversiontotal; 
  private Long purchaseReturnNo;
  private String status; 
  private Long fkshopid;
  private Long fkuserid;
  private String shopName;
  private String userName;
  
  private String batch_no;
  private Date insertDate; 
  private Long fkCategoryId; 
  private Long fk_subCat_id; 
  private Long fk_shop_id; 
  private Date purchaseDate; 
  private String billType; 
  private Double mrp; 
  private String category_name;
  private Long fkProductId;
  private Long prodctId;
  private Long pkGoodReceiveId;
  
  private String billNum; 
  private Long barcodeNo; 
  private String companyName; 
  private Double dupQuantity; 
  private Double returnAmount;
  private Double total; 
  private Double iGstPercentage; 
  private Double billPaymentPending; 
  private String unit; 
  private double totalIgstAmount;
  private String batchNo; 
  private Double stockPerEntry; 
   
  
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
public String getStatus() {
	return status;
}
public void setStatus(String status) {
	this.status = status;
}
public Long getPurchaseReturnNo() {
	return purchaseReturnNo;
}
public void setPurchaseReturnNo(Long purchaseReturnNo) {
	this.purchaseReturnNo = purchaseReturnNo;
}
public Double getConversiontotal() {
	return conversiontotal;
}
public void setConversiontotal(Double conversiontotal) {
	this.conversiontotal = conversiontotal;
}
public Double getPrice() {
	return price;
}
public void setPrice(Double price) {
	this.price = price;
}
public Double getReturn_quanty() {
	return return_quanty;
}
public void setReturn_quanty(Double return_quanty) {
	this.return_quanty = return_quanty;
}
public Double getDupQuantity1() {
	return dupQuantity1;
}
public void setDupQuantity1(Double dupQuantity1) {
	this.dupQuantity1 = dupQuantity1;
}
public Long getPkGoodReceiveId() {
	return pkGoodReceiveId;
}
public void setPkGoodReceiveId(Long pkGoodReceiveId) {
	this.pkGoodReceiveId = pkGoodReceiveId;
}
public Long getProdctId() {
	return prodctId;
  }
public void setProdctId(Long prodctId) {
	this.prodctId = prodctId;
  }  
public String getProduct_name() {
	return product_name;
}
public void setProduct_name(String product_name) {
	this.product_name = product_name;
}
public Double getBuy_price() {
	return buy_price;
}
public void setBuy_price(Double buy_price) {
	this.buy_price = buy_price;
}
public Double getSale_price() {
	return sale_price;
}
public void setSale_price(Double sale_price) {
	this.sale_price = sale_price;
}
public String getCatName() {
	return catName;
}
public void setCatName(String catName) {
	this.catName = catName;
}
public String getCompany_Name() {
	return company_Name;
}
public void setCompany_Name(String company_Name) {
	this.company_Name = company_Name;
}
public String getBatch_no() {
	return batch_no;
}
public void setBatch_no(String batch_no) {
	this.batch_no = batch_no;
}
public Long getPkPOId(){ 
	  return pkPOId; 
} 
 public void setPkPOId(Long pkPOId){ 
	  this.pkPOId = pkPOId;  
} 
public String getSupplier() {
	return supplier;
}
public void setSupplier(String supplier) {
	this.supplier = supplier;
}
public Long getDcNum(){ 
	return dcNum;   
} 
  public void setDcNum(Long dcNum) 
  { 
	  this.dcNum = dcNum; 
	  
  } 
  public Double getWeightAftShortMinus() 
  { 
	  return weightAftShortMinus; 
	  
  } 
  public void setWeightAftShortMinus(Double weightAftShortMinus) 
  { 
	  this.weightAftShortMinus= weightAftShortMinus; 
	  
  } 
  
  public Double getTax_percentage() {
	return tax_percentage;
}
public void setTax_percentage(Double tax_percentage) {
	this.tax_percentage = tax_percentage;
}
public Double getTaxAmount() 
  { 
	  return taxAmount; 
	  
  } 
  public void setTaxAmount(Double taxAmount) 
  { 
	  this.taxAmount =taxAmount; 
	  
  } 
  public String getProductName() 
  { 
	  return productName; 
	  
  } 
  public void setProductName(String productName) 
  { 
	  this.productName = productName; 
	  
  }
  public Double getBuyPrice() 
  { 
	  return buyPrice; 
	  
  } 
  public void setBuyPrice(Double buyPrice) 
  { 
	  this.buyPrice = buyPrice; 
	  
  } 
  public Double getSalePrice() 
  { 
	  return salePrice; 
	  
  } 
  public void setSalePrice(Double salePrice) 
  { 
	  this.salePrice = salePrice; 
	  
  } 
  public Double getWeight() 
  { 
	  return weight; 
	  
  } 
  public void setWeight(Double weight) 
  { 
	  this.weight = weight; 
	  
  }
  public Double getTotalAmount() 
  { 
	  
	  return totalAmount; 
	  
  } public void setTotalAmount(Double totalAmount) 
  { 
	  this.totalAmount = totalAmount; 
	  
  } 
  public Double getQuantity() 
  { 
	  return quantity; 
	  
  } 
  public void setQuantity(Double quantity) 
  { 
	  this.quantity = quantity; 
	  
  } 
  public Date getExpiryDate() 
  { 
	  return expiryDate;
	  
  } 
  public void setExpiryDate(Date expiryDate) 
  { 
	  this.expiryDate =expiryDate;
	  
  } 
  public Date getInsertDate() 
  { 
	  return insertDate; 
	  
  } 
  public void setInsertDate(Date insertDate) 
  { 
	  this.insertDate = insertDate; 
	  
  } 
  public Long getFkCategoryId()
  { 
	  return fkCategoryId; 
	  
  } 
  public void setFkCategoryId(Long fkCategoryId) 
  { 
	  this.fkCategoryId = fkCategoryId; 
	  
  } 
  public Long getFk_subCat_id() 
  { 
	  return fk_subCat_id; 
	  
  } 
  public void setFk_subCat_id(Long fk_subCat_id) 
  { 
	  this.fk_subCat_id = fk_subCat_id; 
	  
  } 
  public Long getFk_shop_id() 
  { 
	  return fk_shop_id; 
	  
  } 
  public void setFk_shop_id(Long fk_shop_id) 
  { 
	  this.fk_shop_id = fk_shop_id; 
	  
  } 
  public Date getPurchaseDate() 
  {
  return purchaseDate; 
  }
  
  public void setPurchaseDate(Date purchaseDate) 
  {
  this.purchaseDate = purchaseDate; 
  } 
  
  public String getBillType() 
  { 
	  return billType; 
	  
  } 
  
  public void setBillType(String billType) 
  { 
	  this.billType =billType; 
	  
  } 
  public Double getMrp() 
  { 
	  return mrp; 
	  
  } 
  public void setMrp(Double mrp) 
  { 
	  this.mrp = mrp; 
	  
  } 
 
  public String getBillNum() 
  { 
	  return billNum; 
	  
  } 
  public void setBillNum(String billNum) 
  { 
	  this.billNum = billNum; 
	  
  } 
  public Long getBarcodeNo() 
  { 
	  return barcodeNo; 
	  
  } 
  
  public void setBarcodeNo(Long barcodeNo)
  { 
	  this.barcodeNo = barcodeNo; 
	  
  } 
  public String getCompanyName() 
  { 
	  return companyName; 
	  
  } 
  public void setCompanyName(String companyName) 
  {
  this.companyName = companyName; 
  } 
  
  public Double getDupQuantity() 
  { 
	  return dupQuantity;
	  
  } 
  public void setDupQuantity(Double dupQuantity) 
  {
  this.dupQuantity = dupQuantity; 
  } 
  
  public Double getReturnAmount() 
  { 
	  return returnAmount; 
	  
  } 
  public void setReturnAmount(Double returnAmount) 
  {
  this.returnAmount = returnAmount; 
  } 
  
  public Double getTotal() 
  { 
	  return total;
   
  } 
  
  public void setTotal(Double total) 
  { 
	  this.total = total; 
	  
  } 
  public Double getiGstPercentage() 
  { 
	  return iGstPercentage; 
	  
  } 
  public void setiGstPercentage(Double iGstPercentage) 
  { 
	  this.iGstPercentage =iGstPercentage; 
	  
  } 
  public Double getBillPaymentPending() 
  { 
	  return billPaymentPending; 
	  
  } 
  public void setBillPaymentPending(Double billPaymentPending) 
  { 
	  this.billPaymentPending = billPaymentPending; 
	  
  } 
  public String getUnit() 
  { 
	  return unit; 
	  
  } 
  public void setUnit(String unit) 
  {
  this.unit = unit; 
  } 
  public double getTotalIgstAmount() 
  { 
	  return totalIgstAmount; 
	  
  } 
  public void setTotalIgstAmount(double totalIgstAmount) 
  {
  this.totalIgstAmount = totalIgstAmount; 
  } 
  public String getBatchNo() 
  { 
	  return batchNo; 
	  
  } 
  public void setBatchNo(String batchNo) 
  { 
	  this.batchNo = batchNo; 
	  
  }
  public Double getStockPerEntry() 
  { 
	  return stockPerEntry; 
	  
  } 
  public void setStockPerEntry(Double stockPerEntry) 
  { 
	  this.stockPerEntry = stockPerEntry;
  }
public Long getFkProductId() {
	return fkProductId;
}
public void setFkProductId(Long fkProductId) {
	this.fkProductId = fkProductId;
}
public Long getPurchase_return_pk() {
	return purchase_return_pk;
}
public void setPurchase_return_pk(Long purchase_return_pk) {
	this.purchase_return_pk = purchase_return_pk;
}
public Long getFk_supplier_id() {
	return fk_supplier_id;
}
public void setFk_supplier_id(Long fk_supplier_id) {
	this.fk_supplier_id = fk_supplier_id;
}
public String getCategory_name() {
	return category_name;
}
public void setCategory_name(String category_name) {
	this.category_name = category_name;
}

  
  
  }
