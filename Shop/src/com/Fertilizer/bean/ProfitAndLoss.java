package com.Fertilizer.bean;

public class ProfitAndLoss
{
	private String id;
	private String expensesAmount;
	private String transAndLabourexpenses;
	private String otherExpenses;
	private String saleAmount;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getExpensesAmount()
	{
		return expensesAmount;
	}
	public void setExpensesAmount(String expensesAmount)
	{
		this.expensesAmount = expensesAmount;
	}
	public String getTransAndLabourexpenses() {
		return transAndLabourexpenses;
	}
	public void setTransAndLabourexpenses(String transAndLabourexpenses) {
		this.transAndLabourexpenses = transAndLabourexpenses;
	}
	public String getOtherExpenses() {
		return otherExpenses;
	}
	public void setOtherExpenses(String otherExpenses) {
		this.otherExpenses = otherExpenses;
	}
	public String getSaleAmount() {
		return saleAmount;
	}
	public void setSaleAmount(String saleAmount) {
		this.saleAmount = saleAmount;
	}
}