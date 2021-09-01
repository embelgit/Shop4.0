
  package com.Fertilizer.bean;
  
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
  private String product_name; 
  private Double buy_price; 
  private Double sale_price; 
  private Double weight ;
  private Long fkProductId;
  private Double totalAmount; 
  private Double dupQuantity1; 
  private Date expiryDate;
  private Date insertDate; 
  private Long fkCategoryId; 
  private Long fk_subCat_id; 
  private Long fk_shop_id; 
  private Date purchaseDate; 
  private String billType; 
  private Double mrp; 
  private String catName;
  private Long dupQuantity;
  private Long fk_product_id;
  private Long prodctId; 
  private String billNum; 
  private Long barcodeNo; 
  private String company_Name; 
  //private Double dupQuantity; 
  private Double returnAmount;
  private Double total; 
  private Double iGstPercentage; 
  private Double billPaymentPending; 
  private String unit; 
  private double totalIgstAmount;
  private String batch_no; 
  private Double stockPerEntry; 
  public Long getFkProductId() {
		return fkProductId;
	}
	public void setFkProductId(Long fkProductId) {
		this.fkProductId = fkProductId;
	}
	public Long getFk_product_id() {
		return fk_product_id;
	}
	public void setFk_product_id(Long fk_product_id) {
		this.fk_product_id = fk_product_id;
	}
  
 public Long getProdctId() {
  return prodctId;
  }
  public void setProdctId(Long prodctId) {
  this.prodctId = prodctId;
   }
  
public Long getPkPOId() { return pkPOId; } public void setPkPOId(Long pkPOId)
{ 
	this.pkPOId = pkPOId;
	  
 }
	 
  public String getSupplier() 
  {
  return supplier; 
  
  } 
  public void setSupplier(String supplier) 
  { 
	  this.supplier =supplier; 
	  
  } 
  public Long getDcNum() 
  { 
	  
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
  public Double gettax_percentage() 
  { 
	  return tax_percentage; 
	  
  } 
  public void settax_percentage(Double tax_percentage) 
  {
  this.tax_percentage= tax_percentage; 
  } 
  public Double getTaxAmount() 
  { 
	  return taxAmount; 
	  
  } 
  public void setTaxAmount(Double taxAmount) 
  { 
	  this.taxAmount =taxAmount; 
	  
  } 
  public String getproduct_name() 
  { 
	  return product_name; 
	  
  } 
  public void setproduct_name(String product_name) 
  { 
	  this.product_name= product_name; 
	  
  }
  public Double getbuy_price() 
  { 
	  return buy_price; 
	  
  } 
  public void setbuy_price(Double buy_price) 
  { 
	  this.buy_price= buy_price; 
	  
  } 
  public Double getsale_price() 
  { 
	  return sale_price; 
	  
  } 
  public void setsale_price(Double sale_price) 
  { 
	  this.sale_price= sale_price; 
	  
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
  public Double getdupQuantity1() 
  { 
	  return dupQuantity1; 
	  
  } 
  public void setdupQuantity1(Double dupQuantity1) 
  { 
	  this.dupQuantity1= dupQuantity1; 
	  
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
  public String getcompany_Name() 
  { 
	  return company_Name; 
	  
  } 
  public void setcompany_Name(String company_Name) 
  {
  this.company_Name= company_Name; 
  } 
  
	/*
	 * public Double getDupQuantity() { return dupQuantity;
	 * 
	 * } public void setDupQuantity(Double dupQuantity) { this.dupQuantity =
	 * dupQuantity; }
	 */
  
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
  public String getbatch_no() 
  { 
	  return batch_no; 
	  
  } 
  public void setbatch_no(String batch_no) 
  { 
	  this.batch_no= batch_no; 
	  
  }
  public Double getStockPerEntry() 
  { 
	  return stockPerEntry; 
	  
  } 
  public void setStockPerEntry(Double stockPerEntry) 
  { 
	  this.stockPerEntry = stockPerEntry;
  }
public Long getfk_product_id() {
	return fk_product_id;
}
public void setfk_product_id(Long fk_product_id) {
	this.fk_product_id= fk_product_id;
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
public String getcatName() {
	return catName;
}
public void setcatName(String catName) {
	this.catName= catName;
}
public Long getdupQuantity() {
	return dupQuantity;
}
public void setdupQuantity(Long dupQuantity) {
	this.dupQuantity= dupQuantity;
}
  
  
  }
