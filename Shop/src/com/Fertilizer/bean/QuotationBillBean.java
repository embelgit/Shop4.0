package com.Fertilizer.bean;

public class QuotationBillBean 
{
	private String billNoBillig;
	private Long billNo;
	private Long quotationNo;
	
	public Long getBillNo() {
		return billNo;
	}

	public void setBillNo(Long billNo) {
		this.billNo = billNo;
	}

	public String getBillNoBillig() {
		return billNoBillig;
	}

	public void setBillNoBillig(String billNoBillig) {
		this.billNoBillig = billNoBillig;
	}

	public Long getQuotationNo() {
		return quotationNo;
	}

	public void setQuotationNo(Long quotationNo) {
		this.quotationNo = quotationNo;
	}

}
