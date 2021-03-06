package com.Fertilizer.bean;

import java.math.BigDecimal;
import java.math.BigInteger;

public class GetTaxDetails {
	
	private BigInteger txId;
	private String taxType;
	private Double taxPercentage;
	private Double cgst;
	private Double sgst;
	
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
	public BigInteger getTxId() {
		return txId;
	}
	public void setTxId(BigInteger txId) {
		this.txId = txId;
	}
	public String getTaxType() {
		return taxType;
	}
	public void setTaxType(String taxType) {
		this.taxType = taxType;
	}
	public Double getTaxPercentage() {
		return taxPercentage;
	}
	public void setTaxPercentage(Double taxPercentage) {
		this.taxPercentage = taxPercentage;
	}

	
	
}
