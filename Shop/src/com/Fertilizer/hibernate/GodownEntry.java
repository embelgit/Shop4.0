package com.Fertilizer.hibernate;

public class GodownEntry {

	private Long PkGodownId;
	private String godownName;
	
	public GodownEntry() {
		super();
		// TODO Auto-generated constructor stub
	}
	public GodownEntry(Long pkGodownId, String godownName) {
		super();
		PkGodownId = pkGodownId;
		this.godownName = godownName;
	}
	public Long getPkGodownId() {
		return PkGodownId;
	}
	public void setPkGodownId(Long pkGodownId) {
		PkGodownId = pkGodownId;
	}
	public String getGodownName() {
		return godownName;
	}
	public void setGodownName(String godownName) {
		this.godownName = godownName;
	}
	
	
}
