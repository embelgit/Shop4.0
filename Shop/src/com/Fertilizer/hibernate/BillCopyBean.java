package com.Fertilizer.hibernate;

public class BillCopyBean
{
	private Long billno;
	private Long billnoId;

	public Long getBillno() {
		return billno;
	}

	public void setBillno(Long billno) {
		this.billno = billno;
	}

	public Long getBillnoId() {
		return billnoId;
	}

	public void setBillnoId(Long billnoId) {
		this.billnoId = billnoId;
	}

	public BillCopyBean(Long billno, Long billnoId) {
		super();
		this.billno = billno;
		this.billnoId = billnoId;
	}

	public BillCopyBean() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Override
	public String toString() {
		return "BillCopyBean [billno=" + billno + ", billnoId=" + billnoId
				+ ", getBillno()=" + getBillno() + ", getBillnoId()="
				+ getBillnoId() + ", getClass()=" + getClass()
				+ ", hashCode()=" + hashCode() + ", toString()="
				+ super.toString() + "]";
	}
}
