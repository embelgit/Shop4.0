package com.Fertilizer.hibernate;
import java.io.Serializable;
import java.util.Date;

public class EmployeePaymentBean implements Serializable{

			private Date insertDate;
			private Long pkEmployeePaymentId;
			private Double credit;
			private String personName;
			private String reason;
			private Long fk_employee_id;
			
			private String chequeNum;
			private Long cardNum;
			private Long accNum;
			
			private String paymentMode;
			private String nameOnCheck;
			private String bankName;
			private String paymentType;
			private Long transNoForEmployee;
			private String employeeName;
			
			private Long fkshopid;
			private Long fkuserid;
			private String shopName;
			private String userName;

			
			
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
			public String getEmployeeName() {
				return employeeName;
			}
			public void setEmployeeName(String employeeName) {
				this.employeeName = employeeName;
			}
			public Long getTransNoForEmployee() {
				return transNoForEmployee;
			}
			public void setTransNoForEmployee(Long transNoForEmployee) {
				this.transNoForEmployee = transNoForEmployee;
			}
			public Date getInsertDate() {
				return insertDate;
			}
			public void setInsertDate(Date insertDate) {
				this.insertDate = insertDate;
			}
			public Long getPkEmployeePaymentId() {
				return pkEmployeePaymentId;
			}
			public void setPkEmployeePaymentId(Long pkEmployeePaymentId) {
				this.pkEmployeePaymentId = pkEmployeePaymentId;
			}
			public Double getCredit() {
				return credit;
			}
			public void setCredit(Double credit) {
				this.credit = credit;
			}
			public String getPersonName() {
				return personName;
			}
			public void setPersonName(String personName) {
				this.personName = personName;
			}
			public String getReason() {
				return reason;
			}
			public void setReason(String reason) {
				this.reason = reason;
			}
			public Long getFk_employee_id() {
				return fk_employee_id;
			}
			public void setFk_employee_id(Long fk_employee_id) {
				this.fk_employee_id = fk_employee_id;
			}
			public String getChequeNum() {
				return chequeNum;
			}
			public void setChequeNum(String chequeNum) {
				this.chequeNum = chequeNum;
			}
			public Long getCardNum() {
				return cardNum;
			}
			public void setCardNum(Long cardNum) {
				this.cardNum = cardNum;
			}
			public Long getAccNum() {
				return accNum;
			}
			public void setAccNum(Long accNum) {
				this.accNum = accNum;
			}
			public String getPaymentMode() {
				return paymentMode;
			}
			public void setPaymentMode(String paymentMode) {
				this.paymentMode = paymentMode;
			}
			public String getNameOnCheck() {
				return nameOnCheck;
			}
			public void setNameOnCheck(String nameOnCheck) {
				this.nameOnCheck = nameOnCheck;
			}
			public String getBankName() {
				return bankName;
			}
			public void setBankName(String bankName) {
				this.bankName = bankName;
			}
			
			public EmployeePaymentBean(Date insertDate, Long pkEmployeePaymentId, Double credit, String personName,
					String reason, Long fk_employee_id, String chequeNum, Long cardNum, Long accNum, String paymentMode,
					String nameOnCheck, String bankName, String paymentType, Long transNoForEmployee,
					String employeeName, Long fkshopid, Long fkuserid, String shopName, String userName) {
				super();
				this.insertDate = insertDate;
				this.pkEmployeePaymentId = pkEmployeePaymentId;
				this.credit = credit;
				this.personName = personName;
				this.reason = reason;
				this.fk_employee_id = fk_employee_id;
				this.chequeNum = chequeNum;
				this.cardNum = cardNum;
				this.accNum = accNum;
				this.paymentMode = paymentMode;
				this.nameOnCheck = nameOnCheck;
				this.bankName = bankName;
				this.paymentType = paymentType;
				this.transNoForEmployee = transNoForEmployee;
				this.employeeName = employeeName;
				this.fkshopid = fkshopid;
				this.fkuserid = fkuserid;
				this.shopName = shopName;
				this.userName = userName;
			}
			public EmployeePaymentBean() {
				super();
				// TODO Auto-generated constructor stub
			}
			public String getPaymentType() {
				return paymentType;
			}
			public void setPaymentType(String paymentType) {
				this.paymentType = paymentType;
			}
			
			
			
}
