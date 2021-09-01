package com.Fertilizer.bean;


public class GetProductDetails {

		private long pkid;
		private String insertDate;
		private String product;
		private String manufacturer;
		private Double buyPrice;
		private Double salePrice;
		private Double mrp;
		private Double creditSalePrice;
		private Double taxPercentage;
		private String taxType;
		private String unitName;
		private Double weight;
		private String cat;
		private Double stock;
		private String batchNum;
		private Long billNo;
		//private Long hsn;
		private String hsn;
		private Double quantity;
		private Double taxAmount;
		private Double quantityDouble;
		private Long fkCatId;
		private Long fkSubCatId;
		private Long fkShopId;
		private String shopName;
		private String catName;
		private String subCatName;
		private Double stockInTotalKgLtrPiece;
		private String quantityCCReports;
		private String expiryDate;
		private Double sale_price_ex_tax;
		private Long barcodeNo;
		private Double sgst;
		private Double cgst;
		private String description;
		private int srno;
		
		private String packtype;
		public long productId;
		
		private String customerName;
		private String creditCustomerName;
		private String gstNo;
		
		
		
		public String getGstNo() {
			return gstNo;
		}
		public void setGstNo(String gstNo) {
			this.gstNo = gstNo;
		}
		public String getCustomerName() {
			return customerName;
		}
		public void setCustomerName(String customerName) {
			this.customerName = customerName;
		}
		public String getCreditCustomerName() {
			return creditCustomerName;
		}
		public void setCreditCustomerName(String creditCustomerName) {
			this.creditCustomerName = creditCustomerName;
		}
		public long getPkid() {
			return pkid;
		}
		public void setPkid(long pkid) {
			this.pkid = pkid;
		}
		public long getProductId() {
			return productId;
		}
		public void setProductId(long productId) {
			this.productId = productId;
		}
		public String getPacktype() {
			return packtype;
		}
		public void setPacktype(String packtype) {
			this.packtype = packtype;
		}
		public int getSrno() {
			return srno;
		}
		public void setSrno(int srno) {
			this.srno = srno;
		}
		public String getDescription() {
			return description;
		}
		public void setDescription(String description) {
			this.description = description;
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
		public Long getBarcodeNo() {
			return barcodeNo;
		}
		public void setBarcodeNo(Long barcodeNo) {
			this.barcodeNo = barcodeNo;
		}
		public Double getQuantityDouble() {
			return quantityDouble;
		}
		public Long getFkCatId() {
			return fkCatId;
		}
		public void setFkCatId(Long fkCatId) {
			this.fkCatId = fkCatId;
		}
		public Long getFkSubCatId() {
			return fkSubCatId;
		}
		public void setFkSubCatId(Long fkSubCatId) {
			this.fkSubCatId = fkSubCatId;
		}
		public void setQuantityDouble(Double quantityDouble) {
			this.quantityDouble = quantityDouble;
		}
		public Double getStock() {
			return stock;
		}
		public void setStock(Double stock) {
			this.stock = stock;
		}
		public String getBatchNum() {
			return batchNum;
		}
		public void setBatchNum(String batchNum) {
			this.batchNum = batchNum;
		}
		public String getCat() {
			return cat;
		}
		public void setCat(String cat) {
			this.cat = cat;
		}
		public Double getWeight() {
			return weight;
		}
		public void setWeight(Double weight) {
			this.weight = weight;
		}
		public String getManufacturer() {
			return manufacturer;
		}
		public void setManufacturer(String manufacturer) {
			this.manufacturer = manufacturer;
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
		public Double getMrp() {
			return mrp;
		}
		public void setMrp(Double mrp) {
			this.mrp = mrp;
		}
		public Double getCreditSalePrice() {
			return creditSalePrice;
		}
		public void setCreditSalePrice(Double creditSalePrice) {
			this.creditSalePrice = creditSalePrice;
		}
		public Double getTaxPercentage() {
			return taxPercentage;
		}
		public void setTaxPercentage(Double taxPercentage) {
			this.taxPercentage = taxPercentage;
		}
		public String getTaxType() {
			return taxType;
		}
		public void setTaxType(String taxType) {
			this.taxType = taxType;
		}
		public String getUnitName() {
			return unitName;
		}
		public void setUnitName(String unitName) {
			this.unitName = unitName;
		}
		public String getInsertDate() {
			return insertDate;
		}
		public void setInsertDate(String insertDate) {
			this.insertDate = insertDate;
		}
		public String getProduct() {
			return product;
		}
		public void setProduct(String product) {
			this.product = product;
		}
		public Long getBillNo() {
			return billNo;
		}
		public void setBillNo(Long billNo) {
			this.billNo = billNo;
		}
		
		

	public Double getQuantity() {
			return quantity;
		}
		public void setQuantity(Double quantity) {
			this.quantity = quantity;
		}
		/*
	 * public Long getQuantity() { return quantity; } public void setQuantity(Long
	 * quantity) { this.quantity = quantity; }
	 */
		public Double getTaxAmount() {
			return taxAmount;
		}
		public void setTaxAmount(Double taxAmount) {
			this.taxAmount = taxAmount;
		}
		
		public String getCatName() {
			return catName;
		}
		public void setCatName(String catName) {
			this.catName = catName;
		}
		public String getSubCatName() {
			return subCatName;
		}
		public void setSubCatName(String subCatName) {
			this.subCatName = subCatName;
		}
		public Long getFkShopId() {
			return fkShopId;
		}
		public void setFkShopId(Long fkShopId) {
			this.fkShopId = fkShopId;
		}
		public String getShopName() {
			return shopName;
		}
		public void setShopName(String shopName) {
			this.shopName = shopName;
		}
		
		public String getHsn() {
			return hsn;
		}
		public void setHsn(String hsn) {
			this.hsn = hsn;
		}		
		public Double getStockInTotalKgLtrPiece() {
			return stockInTotalKgLtrPiece;
		}
		public void setStockInTotalKgLtrPiece(Double stockInTotalKgLtrPiece) {
			this.stockInTotalKgLtrPiece = stockInTotalKgLtrPiece;
		}
		public String getQuantityCCReports() {
			return quantityCCReports;
		}
		public void setQuantityCCReports(String quantityCCReports) {
			this.quantityCCReports = quantityCCReports;
		}
		public String getExpiryDate() {
			return expiryDate;
		}
		public void setExpiryDate(String expiryDate) {
			this.expiryDate = expiryDate;
		}
		public Double getSale_price_ex_tax() {
			return sale_price_ex_tax;
		}
		public void setSale_price_ex_tax(Double sale_price_ex_tax) {
			this.sale_price_ex_tax = sale_price_ex_tax;
		}
		public GetProductDetails(long pkid, String insertDate, String product, String manufacturer, Double buyPrice,
				Double salePrice, Double mrp, Double creditSalePrice, Double taxPercentage, String taxType,
				String unitName, Double weight, String cat, Double stock, String batchNum, Long billNo, String hsn,
				Double quantity, Double taxAmount, Double quantityDouble, Long fkCatId, Long fkSubCatId, Long fkShopId,
				String shopName, String catName, String subCatName, Double stockInTotalKgLtrPiece,
				String quantityCCReports, String expiryDate, Double sale_price_ex_tax, Long barcodeNo, Double sgst,
				Double cgst, String description, int srno, String packtype, long productId, String customerName,
				String creditCustomerName, String gstNo) {
			super();
			this.pkid = pkid;
			this.insertDate = insertDate;
			this.product = product;
			this.manufacturer = manufacturer;
			this.buyPrice = buyPrice;
			this.salePrice = salePrice;
			this.mrp = mrp;
			this.creditSalePrice = creditSalePrice;
			this.taxPercentage = taxPercentage;
			this.taxType = taxType;
			this.unitName = unitName;
			this.weight = weight;
			this.cat = cat;
			this.stock = stock;
			this.batchNum = batchNum;
			this.billNo = billNo;
			this.hsn = hsn;
			this.quantity = quantity;
			this.taxAmount = taxAmount;
			this.quantityDouble = quantityDouble;
			this.fkCatId = fkCatId;
			this.fkSubCatId = fkSubCatId;
			this.fkShopId = fkShopId;
			this.shopName = shopName;
			this.catName = catName;
			this.subCatName = subCatName;
			this.stockInTotalKgLtrPiece = stockInTotalKgLtrPiece;
			this.quantityCCReports = quantityCCReports;
			this.expiryDate = expiryDate;
			this.sale_price_ex_tax = sale_price_ex_tax;
			this.barcodeNo = barcodeNo;
			this.sgst = sgst;
			this.cgst = cgst;
			this.description = description;
			this.srno = srno;
			this.packtype = packtype;
			this.productId = productId;
			this.customerName = customerName;
			this.creditCustomerName = creditCustomerName;
			this.gstNo = gstNo;
		}
		public GetProductDetails() {
			super();
			// TODO Auto-generated constructor stub
		}
				
		/*public Long getHsn() {
			return hsn;
		}
		public void setHsn(Long hsn) {
			this.hsn = hsn;
		}*/
		
		
		
		
		
		
		
}
