package com.Fertilizer.bean;

import java.util.Date;

public class PartnerTransactionsBean
{
	private String partnersName;	
	private String pk_partner_Transactions_id;
	private String fk_partner_detail_id;
	private String accountantName;
	private String creditPT;
	private String debitPT;
	private String totalAmount;
	private String insertDatePT;
	private String transactoin_No_partner_Transactions;
	private String paymentMode;
	
	
	public String getPaymentMode() {
		return paymentMode;
	}
	public void setPaymentMode(String paymentMode) {
		this.paymentMode = paymentMode;
	}
	public String getPk_partner_Transactions_id() {
		return pk_partner_Transactions_id;
	}
	public void setPk_partner_Transactions_id(String pk_partner_Transactions_id) {
		this.pk_partner_Transactions_id = pk_partner_Transactions_id;
	}
	public String getFk_partner_detail_id() {
		return fk_partner_detail_id;
	}
	public void setFk_partner_detail_id(String fk_partner_detail_id) {
		this.fk_partner_detail_id = fk_partner_detail_id;
	}
	public String getAccountantName() {
		return accountantName;
	}
	public void setAccountantName(String accountantName) {
		this.accountantName = accountantName;
	}
	public String getCreditPT() {
		return creditPT;
	}
	public void setCreditPT(String creditPT) {
		this.creditPT = creditPT;
	}
	public String getDebitPT() {
		return debitPT;
	}
	public void setDebitPT(String debitPT) {
		this.debitPT = debitPT;
	}
	public String getTotalAmount() {
		return totalAmount;
	}
	public void setTotalAmount(String totalAmount) {
		this.totalAmount = totalAmount;
	}
	public String getInsertDatePT() {
		return insertDatePT;
	}
	public void setInsertDatePT(String insertDatePT) {
		this.insertDatePT = insertDatePT;
	}
	public String getTransactoin_No_partner_Transactions() {
		return transactoin_No_partner_Transactions;
	}
	public void setTransactoin_No_partner_Transactions(String transactoin_No_partner_Transactions) {
		this.transactoin_No_partner_Transactions = transactoin_No_partner_Transactions;
	}
	public String getPartnersName() {
		return partnersName;
	}
	public void setPartnersName(String partnersName) {
		this.partnersName = partnersName;
	}
}
