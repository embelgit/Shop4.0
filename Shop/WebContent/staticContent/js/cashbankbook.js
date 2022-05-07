//Adding supplier Payment
function supplierPayment() {
	
	
	var supplier = $("#supplier").val();
	var billNo = $("#billNo").val();
	var balanceAmount = $("#balanceAmount").val();
	var supPay = $("#supPay").val();
	var paymentType = $('#paymentType').val();
	var paymentMode = $('#paymentMode').val();
	
	if (document.spmt.supplier.value == "") {
		var msg = "Please Select Supplier Name";
		var dialog = bootbox.dialog({
			message : '<p class="text-center">'
					+ msg.fontcolor("red").fontsize(5) + '</p>',
			closeButton : false
		});
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		return false;
	}

	if (document.spmt.billNo.value == "") {
		var msg = "Please Select Bill Number";
		var dialog = bootbox.dialog({
			message : '<p class="text-center">'
					+ msg.fontcolor("red").fontsize(5) + '</p>',
			closeButton : false
		});
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		return false;
	}

	if (supPay != "" || supPay != undefined || supPay != null) {
		var checkSupPay = /^[0-9]+\.?[0-9]*$/;
		if (supPay.match(checkSupPay)) {
		} else {
			var msg = "Please Enter valid Amount";
			var dialog = bootbox.dialog({
				message : '<p class="text-center">'
						+ msg.fontcolor("red").fontsize(5) + '</p>',
				closeButton : false
			});
			setTimeout(function() {
				dialog.modal('hide');
			}, 1500);
			return false;
		}
	}

	// document.write(balanceAmount+" "+supPay+" "+paymentType+" "+paymentMode);

	if (+supPay > +balanceAmount) {
		var msg = "Supplier Payment Amount Should Be Less Than Balance Amount";
		var dialog = bootbox.dialog({
			message : '<p class="text-center">'
					+ msg.fontcolor("red").fontsize(5) + '</p>',
			closeButton : false
		});

		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		return false;
	}

	
	if (document.spmt.paymentMode.value != "selected") {
		if (document.spmt.paymentType.value != "selected") {
		} else {
			var msg = "Please Select Payment Type";
			var dialog = bootbox.dialog({
				message : '<p class="text-center">'
						+ msg.fontcolor("red").fontsize(5) + '</p>',
				closeButton : false
			});
			setTimeout(function() {
				dialog.modal('hide');
			}, 1500);
			return false;
		}
	} else {
		var msg = "Please Select Payment Mode";
		var dialog = bootbox.dialog({
			message : '<p class="text-center">'
					+ msg.fontcolor("red").fontsize(5) + '</p>',
			closeButton : false
		});
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		return false;
	}

	if (document.spmt.supPay.value == "")

	{
		var msg = "Please Enter Supplier Payment  Amount";
		var dialog = bootbox.dialog({
			message : '<p class="text-center">'
					+ msg.fontcolor("red").fontsize(5) + '</p>',
			closeButton : false
		});
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		return false;
	}

	var letterNumber = /^[0-9]+([.][0-9]+)?$/;
	if (document.spmt.supPay.value.match(letterNumber)) {
		sup();
	}
}

function sup() {

	document.getElementById("btn1").disabled = true;

	var billNo = $('#billNo').val();
	
	var supplier = $('#supplier').val();
	var splitText = supplier.split(",");
	var suppliername = splitText[0];
	
	var totalAmount = $('#totalAmount').val();
	var paymentType = $('#paymentType').val();
	var paymentMode = $('#paymentMode').val();
	var chequeNum = $('#chequeNum').val();
	var nameOnCheck = $('#nameOnCheck').val();
	var bankName = $('#bankName').val();
	var cardNum = $('#cardNum').val();
	var accNum = $('#accNum').val();
	var personname = $('#personname').val();
	var supPay = $('#supPay').val();
	var supDate = $('#supDate').val();
	
	var input = document.getElementById('supplier'), list = document
			.getElementById('sup_drop'), i, fkRootsupId;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			fkRootsupId = list.options[i].getAttribute('data-value');
		}
	}
	
	var params = {};

	params["supplier"] = fkRootsupId;
	params["suppliername"] = suppliername;
	params["billNo"] = billNo;
	params["totalAmount"] = totalAmount;
	params["paymentType"] = paymentType;
	params["paymentMode"] = paymentMode;
	params["chequeNum"] = chequeNum;
	params["nameOnCheck"] = nameOnCheck;

	params["bankName"] = bankName;
	params["cardNum"] = cardNum;
	params["accNum"] = accNum;
	params["personname"] = personname;
	params["supPay"] = supPay;
	params["supDate"] = supDate;
	
	params["methodName"] = "regSupCashBook";

	$.post('/Shop/jsp/utility/controller.jsp',params,function(data) {
		
		window.open("SupplierPaymentReceipt.jsp");
		location.reload();
		document.getElementById("btn1111").disabled = false;	
		
	 }).error(function(jqXHR, textStatus, errorThrown){
 	    		if(textStatus==="timeout") {
 	    			$(loaderObj).hide();
 	    			$(loaderObj).find('#errorDiv').show();
 	    		}
 	    	});
}

/*
 * Name : Sonal Bharti Date : 06/10/2021 Method Name :
 * customerPaymentValidation() Reason : Credit Customer Validation in cashBook
 */

function customerPaymentValidation() {
	var creditCustomer = $("#creditCustomer").val();
	// var fk_cat_id0 = $("#fk_cat_id0").val();
	var creditCustBillNo = $("#billNo1").val();
	var creditCustAccName = $("#personname1").val();
	var creditCustPaymentMode = $("#paymentMode1").val();
	var creditCustPaymentType = $("#paymentType1").val();
	var creditCustBalanceAmt = $("#balanceAmount1").val();
	var creditCustCreditAmt = $("#custPay").val();

	if (creditCustomer != null && creditCustomer != "") {
		/*
		 * if(fk_cat_id0 != null && fk_cat_id0 != "") {
		 */
		if (creditCustBillNo != null && creditCustBillNo != "") {// &&
			// creditCustBillNo
			// != "none"
			/*
			 * var onlyAlfabet = /^[a-zA-Z ]*$/; if
			 * (creditCustAccName.match(onlyAlfabet) && creditCustAccName != "" &&
			 * creditCustAccName != " " && creditCustAccName != null) {
			 */

			/*
			 * var creditAmtRegExp = /^[0-9]+([.][0-9]+)?$/; if
			 * (creditCustCreditAmt != null && creditCustCreditAmt != "" &&
			 * creditCustCreditAmt != " ") {
			 * 
			 * if (creditCustCreditAmt.match(creditAmtRegExp)) {
			 * 
			 * if (Number(creditCustCreditAmt) <= Number(creditCustBalanceAmt)) {
			 * 
			 * if (Number(creditCustCreditAmt) > 0) {
			 */

			if (creditCustPaymentMode != "selected"
					&& creditCustPaymentMode != ""
					&& creditCustPaymentMode != " ") {
				if (creditCustPaymentType != "selected"
						&& creditCustPaymentType != ""
						&& creditCustPaymentType != " ") {
					var creditAmtRegExp = /^[0-9]+([.][0-9]+)?$/;
					if (creditCustCreditAmt != null
							&& creditCustCreditAmt != ""
							&& creditCustCreditAmt != 0) {
						if (creditCustCreditAmt.match(creditAmtRegExp)) {
							/*
							 * if(creditCustCreditAmt<=creditCustBalanceAmt) {
							 */
							customerPayment();
							/*
							 * } else { alert("Entered Amount Should Be Less
							 * Than OR Equal to Balance Amount"); }
							 */
						} else {
							var msg = "Please Enter Only Number In The Amount";
							var dialog = bootbox.dialog({
								message : '<p class="text-center">'
										+ msg.fontcolor("red").fontsize(5)
										+ '</p>',
								closeButton : false
							});
							setTimeout(function() {
								dialog.modal('hide');
							}, 1500);
							return false;
						}
					} else {
						var msg = "Please Enter Amount";
						var dialog = bootbox
								.dialog({
									message : '<p class="text-center">'
											+ msg.fontcolor("red").fontsize(5)
											+ '</p>',
									closeButton : false
								});
						setTimeout(function() {
							dialog.modal('hide');
						}, 1500);
						return false;
					}
				} else {
					var msg = "Please Select Payment Type";
					var dialog = bootbox.dialog({
						message : '<p class="text-center">'
								+ msg.fontcolor("red").fontsize(5) + '</p>',
						closeButton : false
					});
					setTimeout(function() {
						dialog.modal('hide');
					}, 1500);
					return false;
				}
			} else {
				var msg = "Please Select Payment Mode";
				var dialog = bootbox.dialog({
					message : '<p class="text-center">'
							+ msg.fontcolor("red").fontsize(5) + '</p>',
					closeButton : false
				});
				setTimeout(function() {
					dialog.modal('hide');
				}, 1500);
				return false;
			}
			/*
			 * } else { alert("Credit Amount Should be grater than 1"); }
			 *  } else { alert("Credit Amount Should not grater than Balance
			 * Amount"); }
			 *  } else { alert("Please Enter valid Credit Amount"); }
			 *  } else { alert("Please Enter Credit Amount"); }
			 */
			/*
			 * } else { alert("Enter Account Hoder Name without Any Number and
			 * Special symbols"); }
			 */
		} else {
			var msg = "please Select Bill Number";
			var dialog = bootbox.dialog({
				message : '<p class="text-center">'
						+ msg.fontcolor("red").fontsize(5) + '</p>',
				closeButton : false
			});
			setTimeout(function() {
				dialog.modal('hide');
			}, 1500);
			return false;
		}
	} else {
		var msg = "please Select Customer Name";
		var dialog = bootbox.dialog({
			message : '<p class="text-center">'
					+ msg.fontcolor("red").fontsize(5) + '</p>',
			closeButton : false
		});
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		return false;
	}
}

// Adding Credit Customer Payment
function customerPayment() {
	document.getElementById("btn2").disabled = true;

	// validation of balance amount with credit amount
	var balanceAmount = $("#balanceAmount1").val();
	var credit = $("#credit1").val();

	var billNo = $('#billNo1').val();
	var totalAmount = $('#totalAmount1').val();

	var balanceAmount = $("#balanceAmount1").val();
	var custPay = $('#custPay').val();
	var paymentMode = $('#paymentMode1').val();

	if (Number(custPay) > Number(balanceAmount)) {
		alert(paymentMode + " Amount Should Be Less Than Balance Amount");
		document.getElementById("btn2").disabled = false;
		return false;
	}

	var chequeNum = $('#chequeNum1').val();
	var nameOnCheck = $('#nameOnCheck1').val();
	var bankName = $('#bankName1').val();
	var cardNum = $('#cardNum1').val();
	var accNum = $('#accNum1').val();
	var personname = $('#personname1').val();
	var paymentType = $('#paymentType1').val();
	var shopId = $("#shopId").val();
	var cusDate = $("#cusDate").val();
	var cust = $("#creditCustomer").val();
	
	var input = document.getElementById('creditCustomer'), list = document
			.getElementById('cust_drop'), i, fkRootCustId;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			fkRootCustId = list.options[i].getAttribute('data-value');
		}
	}

	/*
	 * var input = document.getElementById('fk_cat_id0'), list =
	 * document.getElementById('cat_drop0'), i,cat;
	 * 
	 * for (i = 0; i < list.options.length; ++i) { if (list.options[i].value ===
	 * input.value) { cat = list.options[i].getAttribute('data-value'); } }
	 */

	var params = {};

	params["customer"] = fkRootCustId;
	params["cust"] = cust;
	// params ["catId"] = cat;
	params["billNo"] = billNo;
	params["totalAmount"] = totalAmount;
	params["custPay"] = custPay;
	params["paymentMode"] = paymentMode;
	params["chequeNum"] = chequeNum;
	params["nameOnCheck"] = nameOnCheck;
	params["bankName"] = bankName;
	params["cardNum"] = cardNum;
	params["accNum"] = accNum;
	params["personname"] = personname;
	params["paymentType"] = paymentType;
	params["shopId"] = shopId;
	params["cusDate"] = cusDate;
	
	params["methodName"] = "regCreditCustCashBook";

	$.post(
			'/Shop/jsp/utility/controller.jsp',
			params,
			function(data) {
				var msg = data;
				var dialog = bootbox.dialog({
					message : '<p class="text-center">'
							+ msg.fontcolor("green").fontsize(5) + '</p>',
					closeButton : false
				});

				setTimeout(function() {
					dialog.modal('hide');
					location.reload();
				}, 1500);
				window.open("creditNoteForCustomerPDF.jsp");
				document.getElementById("btn2").disabled = false;
			}).error(function(jqXHR, textStatus, errorThrown) {
		if (textStatus === "timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});

}

/*
 * Name : Sonal Bharti Date :07/10/2021 Method Name : EmployeeValidation()
 * Reason : Employee Details Validation in cashBook
 */

function EmployeeValidation() {
	
	var empName = $("#employee").val();
	var empCreditAmt = $("#empPay").val();
	var empAccName = $("#personName2").val();
	var empPaymentReason = $("#reason2").val();
	var empPaymentMode = $("#paymentMode2").val();
	var paymentType2 = $("#paymentType2").val();
	var empPay = $("#empPay").val();

	if (empPay != "" && empPay != null && empPay != " ") {
		var checkEmpPay = /^[0-9]+\.?[0-9]*$/;
		if (empPay.match(checkEmpPay)) {
		} else {
			var msg = "Please Enter Valid Amount";
			var dialog = bootbox.dialog({
				message : '<p class="text-center">'
						+ msg.fontcolor("red").fontsize(5) + '</p>',
				closeButton : false
			});
			setTimeout(function() {
				dialog.modal('hide');
			}, 1500);
			return false;
		}
	}
	
	if(document.emp.personName2.value!= "")			
	{
		var letterNumber = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/;
		if(document.emp.personName2.value.match(letterNumber))
		{	}
		else {
			
			var msg="Please Enter Alphabet Only in Accountant Name";
			
			var dialog = bootbox.dialog({
				
			    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
			    closeButton: false
			});
			
			setTimeout(function() {
				dialog.modal('hide');
			}, 1500);
			
			return false;
	   }
	}
/*	else{
		
		var msg="Please Enter Accountant Name";
		
		var dialog = bootbox.dialog({
			
		    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		    closeButton: false
		});
		
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		
		return false;
	}*/
	
	if (empName != null && empName != "") {
		/*
		 * var creditAmtRegExp = /^[0-9]+([.][0-9]+)?$/; if (empCreditAmt !=
		 * null && empCreditAmt != "" && empCreditAmt != " ") { if
		 * (empCreditAmt.match(creditAmtRegExp)) { if (Number(empCreditAmt) > 0) {
		 * var onlyAlfabet = /^[a-zA-Z ]*$/; if (empAccName.match(onlyAlfabet) &&
		 * empAccName != "" && empAccName != " " && empAccName != null) {
		 */
/*		if (empPaymentReason != "" && empPaymentReason != " "
				&& empPaymentReason != null) {*/
			if (empPaymentMode != "selected" && empPaymentMode != ""
					&& empPaymentMode != " ") {
				if (paymentType2 != "selected" && paymentType2 != ""
						&& paymentType2 != " " && paymentType2 != "selected") {
					if (empPay != null && empPay != "") {
						
						emplyeePayment();
						
					} else {
						var msg = "Please Enter Amount";
						var dialog = bootbox
								.dialog({
									message : '<p class="text-center">'
											+ msg.fontcolor("red").fontsize(5)
											+ '</p>',
									closeButton : false
								});
						setTimeout(function() {
							dialog.modal('hide');
						}, 1500);
						return false;
					}
				} else {
					var msg = "Select Payment Type Credit or Debit";
					var dialog = bootbox.dialog({
						message : '<p class="text-center">'
								+ msg.fontcolor("red").fontsize(5) + '</p>',
						closeButton : false
					});
					setTimeout(function() {
						dialog.modal('hide');
					}, 1500);
					return false;
				}
			} else {
				var msg = "Select Payment Mode";
				var dialog = bootbox.dialog({
					message : '<p class="text-center">'
							+ msg.fontcolor("red").fontsize(5) + '</p>',
					closeButton : false
				});
				setTimeout(function() {
					dialog.modal('hide');
				}, 1500);
				return false;
			}
/*		} else {
			var msg = "Enter Payment Reason";
			var dialog = bootbox.dialog({
				message : '<p class="text-center">'
						+ msg.fontcolor("red").fontsize(5) + '</p>',
				closeButton : false
			});
			setTimeout(function() {
				dialog.modal('hide');
			}, 1500);
			return false;
		}*/
	}
	/*
	 * else { alert("Enter Account Hoder Name without Any Number"); } } else {
	 * alert("Credit Amount should be grater than 1"); } } else { alert("Please
	 * Enter valid Credit Amount"); } } else { alert("Please Enter Credit
	 * Amount"); } }
	 */
	else {
		var msg = "Select Employee Name";
		var dialog = bootbox.dialog({
			message : '<p class="text-center">'
					+ msg.fontcolor("red").fontsize(5) + '</p>',
			closeButton : false
		});
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		return false;
	}
	
}

// Adding Employee Payment
function emplyeePayment() {

	document.getElementById("btn3").disabled = true;

	var employeename = $('#employee').val();
	var empPay = $('#empPay').val();
	var personName = $('#personName2').val();
	var reason = $('#reason2').val();
	var paymentMode = $('#paymentMode2').val();
	var chequeNum = $('#chequeNum2').val();
	var nameOnCheck = $('#nameOnCheck2').val();
	var bankName = $('#bankName2').val();
	var cardNum = $('#cardNum2').val();
	var accNum = $('#accNum2').val();
	var paymentType = $('#paymentType2').val();
	var empDate = $('#empDate').val();
	if(personName=="" || personName==null || personName==undefined){
		personName="NA"
	}
	if(reason=="" || reason==null || reason==undefined){
		reason="NA"
	}
	
	
	var input = document.getElementById('employee'), 
	    list = document.getElementById('emp_drop'),
	           i, fkRootempId;
	
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			fkRootempId = list.options[i].getAttribute('data-value');
		}
	}

	var params = {};

	params["employee"] = fkRootempId;
	params["employeename"] = employeename;
	params["empPay"] = empPay;
	params["personName"] = personName;
	params["reason"] = reason;

	params["paymentMode"] = paymentMode;
	params["chequeNum"] = chequeNum;
	params["nameOnCheck"] = nameOnCheck;
	params["bankName"] = bankName;
	params["cardNum"] = cardNum;
	params["accNum"] = accNum;
	params["paymentType"] = paymentType;
	params["empDate"] = empDate;
	
	params["methodName"] = "regEmpCashBook";

	$.post('/Shop/jsp/utility/controller.jsp',params,function(data) {
		
		window.open("EmployeePaymentReceipt.jsp");
		location.reload();
		document.getElementById("btn3").disabled = false;	
		
	 }).error(function(jqXHR, textStatus, errorThrown){
 	    		if(textStatus==="timeout") {
 	    			$(loaderObj).hide();
 	    			$(loaderObj).find('#errorDiv').show();
 	    		}
 	  });

}

function expensePaymentValidation() {

	var expenseType = $("#expensetype").val();
	var expenseName = $("#expenseName").val();
	// var serviceProvider = $("#serviceProvider").val();
	var contactNumber = $("#contactNumber").val();
	var paymentType3 = $("#paymentType3").val();
	var expCredit = $("#expCredit").val();
	var expDebit = $("#expDebit").val();
	var accountantName = $("#accountantName").val();

	// document.write(expCredit+" "+expDebit);
	if (expenseType == "select") 
	{				
		var msg = "Please Select Expenditure Type";
		var dialog = bootbox.dialog({
			message : '<p class="text-center">'
					+ msg.fontcolor("red").fontsize(5) + '</p>',
			closeButton : false
		});
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		return false;
	}

	if (expCredit != "" && expCredit != null && expCredit != " ") {
		var checkExpCredit = /^[0-9]+\.?[0-9]*$/;
		if (expCredit.match(checkExpCredit)) {
		} else {
			var msg = "Please Enter Valid Credit Amount";
			var dialog = bootbox.dialog({
				message : '<p class="text-center">'
						+ msg.fontcolor("red").fontsize(5) + '</p>',
				closeButton : false
			});
			setTimeout(function() {
				dialog.modal('hide');
			}, 1500);
			return false;
		}
	}

	if (expenseName != null && expenseName != "" && expenseName != " ") {
		/*
		 * if (serviceProvider != null && serviceProvider != "" &&
		 * serviceProvider != " ") {
		 */
/*		if (contactNumber != null && contactNumber != ""
				&& contactNumber != " ") {*/
			var phoneno = /^\d{10}$/;
//			if (contactNumber.match(phoneno)) {
/*				if (accountantName != null && accountantName != ""
						&& accountantName != " ") {*/
					var onlyAlfabet = /^[a-zA-Z ]*$/;
					if (accountantName.match(onlyAlfabet)) {
						if (accountantName.match(onlyAlfabet)) {
							if (document.exp.paymentType3.value != "selected") {
								if (paymentType3 == "credit") {
									if (expCredit != "" && expCredit != null && expCredit != " ") {
										addExpense();
									} else {
										var msg = "Please Enter Credit Amount";
										var dialog = bootbox.dialog({
											message : '<p class="text-center">'
													+ msg.fontcolor("red")
															.fontsize(5)
													+ '</p>',
											closeButton : false
										});
										setTimeout(function() {
											dialog.modal('hide');
										}, 1500);
										return false;
									}
								}
								if (paymentType3 == "debit") {
									if (expDebit != "" && expDebit != null
											&& expDebit != " ") {
										addExpense();
									} else {
										var msg = "Please Enter Debit Amount";
										var dialog = bootbox.dialog({
											message : '<p class="text-center">'
													+ msg.fontcolor("red")
															.fontsize(5)
													+ '</p>',
											closeButton : false
										});
										setTimeout(function() {
											dialog.modal('hide');
										}, 1500);
										return false;
									}
								}
							} else {
								var msg = "Please Select Payment Type";
								var dialog = bootbox.dialog({
									message : '<p class="text-center">'
											+ msg.fontcolor("red").fontsize(5)
											+ '</p>',
									closeButton : false
								});
								setTimeout(function() {
									dialog.modal('hide');
								}, 1500);
								return false;
							}

						} else {
							var msg = "Enter Accountant Name without Any Number and Special symbols";
							var dialog = bootbox.dialog({
								message : '<p class="text-center">'
										+ msg.fontcolor("red").fontsize(5)
										+ '</p>',
								closeButton : false
							});
							setTimeout(function() {
								dialog.modal('hide');
							}, 1500);
							return false;
						}
					} else {
						var msg = "Enter Accountant Name without Any Number and Special symbols";
						var dialog = bootbox
								.dialog({
									message : '<p class="text-center">'
											+ msg.fontcolor("red").fontsize(5)
											+ '</p>',
									closeButton : false
								});
						setTimeout(function() {
							dialog.modal('hide');
						}, 1500);
						return false;
					}
			/*	} else {
					var msg = "Enter Accountant Name";
					var dialog = bootbox.dialog({
						message : '<p class="text-center">'
								+ msg.fontcolor("red").fontsize(5) + '</p>',
						closeButton : false
					});
					setTimeout(function() {
						dialog.modal('hide');
					}, 1500);
					return false;
				}*/

			/*} else {
				var msg = "Contact No Must be 10 digits only ";
				var dialog = bootbox.dialog({
					message : '<p class="text-center">'
							+ msg.fontcolor("red").fontsize(5) + '</p>',
					closeButton : false
				});
				setTimeout(function() {
					dialog.modal('hide');
				}, 1500);
				return false;
			}*/
/*		} else {
			var msg = "Enter Contact Number";
			var dialog = bootbox.dialog({
				message : '<p class="text-center">'
						+ msg.fontcolor("red").fontsize(5) + '</p>',
				closeButton : false
			});
			setTimeout(function() {
				dialog.modal('hide');
			}, 1500);
			return false;
		}*/
	} /*
		 * else { alert("Enter Service Provider"); } }
		 */else {
		var msg = "Please Select Expenditure Name";
		var dialog = bootbox.dialog({
			message : '<p class="text-center">'
					+ msg.fontcolor("red").fontsize(5) + '</p>',
			closeButton : false
		});
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		return false;
	}
}

/** ******************Adding Expenditure Payment*************** */

function addExpense() {

	/* document.exp.btn4.disabled = true; */
	document.getElementById('expSave').disabled = true;

	// var serviceProvider = $('#serviceProvider').val();
	var expenseType = $("#expensetype").val();
	var expCredit = $('#expCredit').val();
	var expDebit = $('#expDebit').val();
	var contactNumber = $('#contactNumber').val();
	var accountantName = $('#accountantName').val();
		
	var expenseName = $('#expenseName').val();
	var splitvar = expenseName.split(",");
	var fkRootexpId= splitvar[0];

	var paymentMode = $('#paymentMode7').val();
	var chequeNum = $('#chequeNum7').val();
	var nameOnCheck = $('#nameOnCheck7').val();
	var bankName = $('#bankName7').val();
	var cardNum = $('#cardNum7').val();
	var accNum = $('#accNum7').val();
	var expDate = $('#expDate').val();
	
	if(accountantName==undefined || accountantName== null || accountantName == "" )
	{
		accountantName="NA";
	}
	if(contactNumber==undefined || contactNumber== null || contactNumber== "" )
	{
		contactNumber=0;
	}
	
	if(paymentMode==undefined || paymentMode== null || paymentMode == "" )
	{
		paymentMode="NA";
	}
	if(chequeNum==undefined || chequeNum== null || chequeNum== "" )
	{
		chequeNum=0;
	}
	if(nameOnCheck==undefined || nameOnCheck== null || nameOnCheck == "" )
	{
		nameOnCheck="NA";
	}
	if(bankName==undefined || bankName== null || bankName == "" )
	{
		bankName="NA";
	}
	if(cardNum==undefined || cardNum== null || cardNum == "" )
	{
		cardNum=0;
	}
	if(accNum==undefined || accNum== null || accNum== "" )
	{
		accNum=0;
	}
	
	/*var input = document.getElementById('expenseName'), 
	    list = document.getElementById('exp_drop'), 
	           i, fkRootexpId;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			fkRootexpId = list.options[i].getAttribute('data-value');
		}
	}*/

	var params = {};

	params["expenseType"] = expenseType;
	params["expenseName"] = fkRootexpId;
	
	params["expCredit"] = expCredit;
	params["expDebit"] = expDebit;
	params["contactNumber"] = contactNumber;
	params["accountantName"] = accountantName;

	params["paymentMode"] = paymentMode;
	params["chequeNum"] = chequeNum;
	params["nameOnCheck"] = nameOnCheck;
	params["bankName"] = bankName;
	params["cardNum"] = cardNum;
	params["accNum"] = accNum;
	params["expDate"] = expDate;
	
	params["methodName"] = "regExpenseCashBook";

	$.post('/Shop/jsp/utility/controller.jsp',params,function(data) {
				if (document.exp) {
					var msg = data;
					var dialog = bootbox.dialog({
						message : '<p class="text-center">'
								+ msg.fontcolor("green").fontsize(5) + '</p>',
						closeButton : false
					});

					setTimeout(function() {
						dialog.modal('hide');
						location.reload();
					}, 1500);
					document.getElementById('expSave').disabled = true;
				}
				// document.exp.btn4.disabled =false;
			}).error(function(jqXHR, textStatus, errorThrown) {
		if (textStatus === "timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});
}

/*
 * Following BillHelper() function is to get Bill no , total amount and balamce
 * amount after selecting supplier in Supplier Payment
 */
var bill = new BillHelper();
function BillHelper() {
	this.getAllBills = getAllBills;
	this.getTotalAmtByBills = getTotalAmtByBills;
	this.getRemainingBalaneByBills = getRemainingBalaneByBills;
	this.getAllSupplierBillsForReports = getAllSupplierBillsForReports;
	function getAllBills() {

		var input = document.getElementById('supplier'), list = document
				.getElementById('sup_drop'), i, supplier;

		for (i = 0; i < list.options.length; ++i) {
			if (list.options[i].value === input.value) {
				supplier = list.options[i].getAttribute('data-value');
			}
		}

		var supplier = supplier;
		$("#billNo").empty();
		$("#billNo").append($("<option></option>").attr("value", "").text("Select Bill No"));

		$("#totalAmount").empty();
		$("#totalAmount").append($("value", "").text("Total Amount"));

		$("#balanceAmount").empty();
		$("#balanceAmount").append($("value", "").text("Balance Amount"));

		var params = {};

		params["methodName"] = "getAllBillBySuppliers";

		params["supplier"] = supplier;

		$.post('/Shop/jsp/utility/controller.jsp', params, function(data) {
			var jsonData = $.parseJSON(data);
			// var jsonData = jsonData.list;
			$.each(jsonData,function(i, v) {
				
						$("#billNo").append($("<option></option>").attr("value", i).text(v.billNo));

					});
		})

	}

	function getAllSupplierBillsForReports() {

		var input = document.getElementById('supplier'), list = document
				.getElementById('sup_drop'), i, supplier;

		for (i = 0; i < list.options.length; ++i) {
			if (list.options[i].value === input.value) {
				supplier = list.options[i].getAttribute('data-value');
			}
		}

		var supplier = supplier;
		$("#billNo").empty();
		$("#billNo").append($("<option></option>").attr("value", "").text("Select Bill No"));

		$("#totalAmount").empty();
		$("#totalAmount").append($("value", "").text("Total Amount"));

		$("#balanceAmount").empty();
		$("#balanceAmount").append($("value", "").text("Balance Amount"));

		var params = {};

		params["methodName"] = "getAllBillBySuppliersForReports";

		params["supplier"] = supplier;

		$.post('/Shop/jsp/utility/controller.jsp', params, function(data) {
			var jsonData = $.parseJSON(data);
			// var jsonData = jsonData.list;
			$.each(jsonData,function(i, v) {
				
						$("#billNo").append($("<option></option>").attr("value", i).text(v.billNo));

					});
		})

	}

	function getTotalAmtByBills() {
		var input = document.getElementById('supplier'), 
		    list = document.getElementById('sup_drop'),
		           i, supplier;

		for (i = 0; i < list.options.length; ++i) {
			if (list.options[i].value === input.value) {
				supplier = list.options[i].getAttribute('data-value');
			}
		}

		var billNo = $("#billNo").val();
		$("#totalAmount").empty();
		$("#totalAmount").append($("<input/>").attr("value", "").text());
		var params = {};
		
		params["billNo"] = billNo;
		params["supplier"] = supplier;
		
		params["methodName"] = "getTotalAmtByBillNo";
		
		$.post('/Shop/jsp/utility/controller.jsp', params, function(data) {
			var jsonData = $.parseJSON(data);
			// var jsonData = jsonData.list;
			$.each(jsonData, function(i, v) {
				document.getElementById("totalAmount").value = v.totalAmt;

			});
		})

		getRemainingBalaneByBills()
	}

	function getRemainingBalaneByBills() {
		
		var input = document.getElementById('supplier'), list = document
				.getElementById('sup_drop'), i, supplier;

		for (i = 0; i < list.options.length; ++i) {
			if (list.options[i].value === input.value) {
				supplier = list.options[i].getAttribute('data-value');
			}
		}

		var billNo = $("#billNo").val();
		var totalAmount = $("totalAmount").val();

		$("#balanceAmount").empty();
		$("#balanceAmount").append($("<input/>").attr("value", "").text());

		var params = {};

		params["billNo"] = billNo;
		params["supplier"] = supplier;
		params["totalAmount"] = totalAmount;
		
		params["methodName"] = "getBalanceAmtByBillNo";

		$.post('/Shop/jsp/utility/controller.jsp', params, function(data) {
			var jsonData = $.parseJSON(data);
			
			$.each(jsonData, function(i, v) {

				document.getElementById("balanceAmount").value = v.balance;
			});
		})
	}
}

function getBillByCustomer() {
	var input = document.getElementById('creditCustomer'), list = document
			.getElementById('cust_drop'), i, creditCustomer;

	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			creditCustomer = list.options[i].getAttribute('data-value');
		}
	}
	var custName = $("#creditCustomer").val();

	/*
	 * var input = document.getElementById('fk_cat_id0'), list =
	 * document.getElementById('cat_drop0'), i,cat;
	 */

	/*
	 * for (i = 0; i < list.options.length; ++i) { if (list.options[i].value ===
	 * input.value) { cat = list.options[i].getAttribute('data-value'); } }
	 */

	var creditCustomer = creditCustomer;
	$("#billNo1").empty();
	$("#billNo1").append($("<option></option>").attr("value", "").text("Select Bill No"));
	
	var params = {};

	params["methodName"] = "getAllBillByCustomer";

	params["creditCustomer"] = creditCustomer;
	// params["cat"]= cat;

	$.post('/Shop/jsp/utility/controller.jsp', params, function(data) {
		var jsonData = $.parseJSON(data);
		// var jsonData = jsonData.list;
		$.each(jsonData, function(i, v) {
			
			$("#billNo1").append($("<option></option>").attr("value", i).text(v.billNo));

		});
	})
}

function getBillByCustomerForReport() {
	var input = document.getElementById('creditCustomer'), list = document
			.getElementById('cust_drop'), i, creditCustomer;

	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			creditCustomer = list.options[i].getAttribute('data-value');
		}
	}
	/*
	 * var input = document.getElementById('fk_cat_id0'), list =
	 * document.getElementById('cat_drop0'), i,cat;
	 * 
	 * for (i = 0; i < list.options.length; ++i) { if (list.options[i].value ===
	 * input.value) { cat = list.options[i].getAttribute('data-value'); } }
	 */
	var creditCustomer = creditCustomer;
	$("#billNo1").empty();
	$("#billNo1").append(
			$("<option></option>").attr("value", "").text("Select bill"));
	var params = {};

	params["methodName"] = "getAllBillByCustomerForReports";

	params["creditCustomer"] = creditCustomer;
	// params["cat"]= cat;

	$.post('/Shop/jsp/utility/controller.jsp', params, function(data) {
		var jsonData = $.parseJSON(data);
		// var jsonData = jsonData.list;
		$.each(jsonData, function(i, v) {
			$("#billNo1").append(
					$("<option></option>").attr("value", i).text(v.billNo));

		});
	})
}

function getCreditCustomerBillDetails() {

	this.getBillByCustomer = getBillByCustomer;
	this.getTotalAmountByBill = getTotalAmountByBill;

}

function getTotalAmountByBill() {
	var input = document.getElementById('creditCustomer'), list = document
			.getElementById('cust_drop'), i, creditCustomer;

	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			creditCustomer = list.options[i].getAttribute('data-value');
		}
	}

	/*
	 * var input = document.getElementById('fk_cat_id0'), list =
	 * document.getElementById('cat_drop0'), i,cat;
	 * 
	 * for (i = 0; i < list.options.length; ++i) { if (list.options[i].value ===
	 * input.value) { cat = list.options[i].getAttribute('data-value'); } }
	 */

	var billNo1 = $("#billNo1").val();

	$("#totalAmount1").empty();
	$("#totalAmount1").append($("<input/>").attr("value", "").text());

	var params = {};

	params["methodName"] = "getTotalAmtByBillNoForCreditCustomer";

	params["billNo1"] = billNo1;
	// params["cat"]= cat;
	params["creditCustomer"] = creditCustomer;

	$.post('/Shop/jsp/utility/controller.jsp', params, function(data) {
		var jsonData = $.parseJSON(data);
		// var jsonData = jsonData.list;
		$.each(jsonData, function(i, v) {
			document.getElementById("totalAmount1").value = v.totalAmount;

		});
	})

	balaceAmountbyBillNoForCreditPayment();
}

function balaceAmountbyBillNoForCreditPayment() {
	var input = document.getElementById('creditCustomer'), list = document
			.getElementById('cust_drop'), i, creditCustomer;

	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			creditCustomer = list.options[i].getAttribute('data-value');
		}
	}

	/*
	 * var input = document.getElementById('fk_cat_id0'), list =
	 * document.getElementById('cat_drop0'), i,cat;
	 * 
	 * for (i = 0; i < list.options.length; ++i) { if (list.options[i].value ===
	 * input.value) { cat = list.options[i].getAttribute('data-value'); } }
	 */

	var billNo1 = $("#billNo1").val();
	$("#balanceAmount1").empty();
	$("#balanceAmount1").append($("<input/>").attr("value", "").text());

	var params = {};

	params["methodName"] = "getBalanceAmtByBillNoForCreditCustomer";

	params["billNo1"] = billNo1;
	// params["cat"]= cat;
	params["creditCustomer"] = creditCustomer;

	$.post('/Shop/jsp/utility/controller.jsp', params, function(data) {
		var jsonData = $.parseJSON(data);
		// var jsonData = jsonData.list;

		$.each(jsonData, function(i, v) {

			document.getElementById("balanceAmount1").value = v.balance;
		});
	})

}
// remove below comment if code didn't work

var custBill = new getCreditCustomerBillDetails();

/** ************* For Reports ******************** */
/** ************** Supplier Payment ************ */
/** ********** for single date ************* */

function supplierReportForSingleDate() {

	var fDate = $("#fDate11").val();

	if (fDate == "") {
		var msg = "Please Enter Date";
		var dialog = bootbox.dialog({
			message : '<p class="text-center">'
					+ msg.fontcolor("red").fontsize(5) + '</p>',
			closeButton : false
		});
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		return false;
	}

	var params = {};

	params["fDate"] = fDate;

	params["methodName"] = "getSupplierPaymentDetailsForSingleDate";

	$
			.post(
					'/Shop/jsp/utility/controller.jsp',
					params,
					function(data) {
						// To clear table
						$('#supplierSingleDatetable').dataTable()
								.fnClearTable();

						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;

						if (catmap == null || catmap == "") {
							alert("Date Wise Supplier Payment Reports are Not Available for\nDate = "
									+ fDate);
							return false;
						}

						$(document)
								.ready(
										function() {
											var total = $(
													'#supplierSingleDatetable')
													.DataTable(
															{

																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	/*
																	 * // Total
																	 * over this
																	 * page
																	 * 
																	 * pageTotal =
																	 * api
																	 * .column(
																	 * 5 )
																	 * .data()
																	 * .reduce(
																	 * function
																	 * (a, b) {
																	 * return
																	 * intVal(a) +
																	 * intVal(b); },
																	 * 0 );
																	 * 
																	 *  //
																	 * Update
																	 * footer $(
																	 * api.column(
																	 * 5
																	 * ).footer()
																	 * ).html( //
																	 * 'Rs'+'
																	 * '+pageTotal.toFixed(2)
																	 * str =
																	 * pageTotal.toFixed(0) );
																	 * console.log(
																	 * pageTotal);
																	 */
																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					6)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							6)
																					.footer())
																			.html(
																					// 'Rs'+'
																					// '+pageTotal.toFixed(2)
																					str = pageTotal
																							.toFixed(0));
																	console
																			.log(pageTotal);

																	pageTotal = api
																			.column(
																					7)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							7)
																					.footer())
																			.html(
																					// 'Rs'+'
																					// '+pageTotal.toFixed(2)
																					str = pageTotal
																							.toFixed(0));
																	console
																			.log(pageTotal);
																	/*
																	 * pageTotal =
																	 * api
																	 * .column(
																	 * 8 )
																	 * .data()
																	 * .reduce(
																	 * function
																	 * (a, b) {
																	 * return
																	 * intVal(a) +
																	 * intVal(b); },
																	 * 0 );
																	 * 
																	 *  //
																	 * Update
																	 * footer $(
																	 * api.column(
																	 * 8
																	 * ).footer()
																	 * ).html( //
																	 * 'Rs'+'
																	 * '+pageTotal.toFixed(2)
																	 * str =
																	 * pageTotal.toFixed(0) );
																	 * console.log(
																	 * pageTotal);
																	 *  // Total
																	 * over this
																	 * page
																	 */

																},

																destroy : true,
																searching : true,
																"scrollY" : 300,
																"scrollX" : true,
																"paging" : false,

																columns : [
																		{
																			"data" : "supplierName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "bill",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "paymentMode",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "accountantName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "paymentDate",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "totalAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "creditAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "debitAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "balanceAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		}, ],
																/*
																 * dom:
																 * 'Bfrtip',
																 * buttons: [
																 * 'copy',
																 * 'csv',
																 * 'excel',
																 * 'pdf',
																 * 'print' ]
																 */

																dom : 'Bfrtip',
																buttons : [
																		// 'print',

																		{
																			extend : 'print',
																			orientation : 'landscape',
																			title : 'Date Wise Supplier Payment Reports \nDate = '
																					+ fDate,
																			footer : true,
																			pageSize : 'LEGAL'
																		},

																		{
																			extend : 'copyHtml5',
																			orientation : 'landscape',
																			title : 'Date Wise Supplier Payment Reports \nDate = '
																					+ fDate,
																			footer : true,
																			pageSize : 'LEGAL'
																		},

																		{
																			extend : 'excelHtml5',
																			orientation : 'landscape',
																			title : 'Date Wise Supplier Payment Reports \nDate = '
																					+ fDate,
																			messageTop : 'Date Wise Supplier Payment Reports \nDate = '
																					+ fDate,
																			footer : true,
																			pageSize : 'LEGAL'
																		},

																		{
																			extend : 'csvHtml5',
																			orientation : 'landscape',
																			title : 'Date Wise Supplier Payment Reports \nDate = '
																					+ fDate,
																			footer : true,
																			pageSize : 'LEGAL'
																		},

																		// {
																		// extend:
																		// 'copyHtml5',
																		// footer:
																		// true
																		// },
																		// {
																		// extend:
																		// 'excelHtml5',
																		// footer:
																		// true
																		// },
																		// {
																		// extend:
																		// 'csvHtml5',
																		// footer:
																		// true
																		// },

																		{
																			extend : 'pdfHtml5',
																			orientation : 'landscape',
																			title : 'Date Wise Supplier Payment Reports \nDate = '
																					+ fDate,
																			footer : true,
																			pageSize : 'LEGAL'
																		} ]

															});
										});

						var mydata = catmap;
						$('#supplierSingleDatetable').dataTable().fnAddData(
								mydata);

					});
}

/** ******* Between two dates for supplier ************** */

function getSupplierDetailsBetweenTwoDatesValidation() {
	var SupplierName = $("#supplier8").val();
	var StartDate = $("#fisDate1").val();
	var EndDate = $("#endDate1").val();

	if (SupplierName != "") {
		if (StartDate != "") {
			if (EndDate != "") {
				getSupplierDetailsBetweenTwoDates();
			} else {
				var msg = "Please Enter End date";
				var dialog = bootbox.dialog({
					message : '<p class="text-center">'
							+ msg.fontcolor("red").fontsize(5) + '</p>',
					closeButton : false
				});
				setTimeout(function() {
					dialog.modal('hide');
				}, 1500);
				return false;
			}
		} else {
			var msg = "Please Enter Start date";
			var dialog = bootbox.dialog({
				message : '<p class="text-center">'
						+ msg.fontcolor("red").fontsize(5) + '</p>',
				closeButton : false
			});
			setTimeout(function() {
				dialog.modal('hide');
			}, 1500);
			return false;
		}
	} else {
		var msg = "Please Enter Supplier Name";
		var dialog = bootbox.dialog({
			message : '<p class="text-center">'
					+ msg.fontcolor("red").fontsize(5) + '</p>',
			closeButton : false
		});
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		return false;
	}
}

function getSupplierDetailsBetweenTwoDates() {

	var SupplierName = $("#supplier8").val();

	var params = {};
	var startDate = $("#fisDate1").val();
	var endDate = $("#endDate1").val();
	var input = document.getElementById('supplier8'), list = document
			.getElementById('sup_drop8'), i, supplier;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			supplier = list.options[i].getAttribute('data-value');
		}
	}
	var fkSupplierId = supplier;

	params["fisDate"] = startDate;
	params["endDate"] = endDate;
	params["fkSupplierId"] = fkSupplierId;
	// alert(fkSupplierId);
	params["methodName"] = "getSupplierPaymentReportBetweenTwoDates";

	$
			.post(
					'/Shop/jsp/utility/controller.jsp',
					params,
					function(data) {
						// To clear table
						$('#supplierBetweenTwoDatestable').dataTable()
								.fnClearTable();

						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;

						if (catmap == null || catmap == "") {
							alert("Range Wise Supplier Payemnt Reports are Not Available for\nSupplier Name = "
									+ SupplierName
									+ "\nStart Date = "
									+ startDate + "\nEnd Date " + endDate);
							return false;
						}

						$(document)
								.ready(
										function() {
											$('#supplierBetweenTwoDatestable')
													.DataTable(
															{
																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	/*
																	 * // Total
																	 * over this
																	 * page
																	 * 
																	 * pageTotal =
																	 * api
																	 * .column(
																	 * 5 )
																	 * .data()
																	 * .reduce(
																	 * function
																	 * (a, b) {
																	 * return
																	 * intVal(a) +
																	 * intVal(b); },
																	 * 0 );
																	 * 
																	 *  //
																	 * Update
																	 * footer $(
																	 * api.column(
																	 * 5
																	 * ).footer()
																	 * ).html( //
																	 * 'Rs'+'
																	 * '+pageTotal.toFixed(2)
																	 * str =
																	 * pageTotal.toFixed(0) );
																	 * console.log(
																	 * pageTotal);
																	 */
																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					6)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							6)
																					.footer())
																			.html(
																					// 'Rs'+'
																					// '+pageTotal.toFixed(2)
																					str = pageTotal
																							.toFixed(0));
																	console
																			.log(pageTotal);

																	pageTotal = api
																			.column(
																					7)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							7)
																					.footer())
																			.html(
																					// 'Rs'+'
																					// '+pageTotal.toFixed(2)
																					str = pageTotal
																							.toFixed(0));
																	console
																			.log(pageTotal);
																	/*
																	 * pageTotal =
																	 * api
																	 * .column(
																	 * 8 )
																	 * .data()
																	 * .reduce(
																	 * function
																	 * (a, b) {
																	 * return
																	 * intVal(a) +
																	 * intVal(b); },
																	 * 0 );
																	 * 
																	 *  //
																	 * Update
																	 * footer $(
																	 * api.column(
																	 * 8
																	 * ).footer()
																	 * ).html( //
																	 * 'Rs'+'
																	 * '+pageTotal.toFixed(2)
																	 * str =
																	 * pageTotal.toFixed(0) );
																	 * console.log(
																	 * pageTotal);
																	 *  // Total
																	 * over this
																	 * page
																	 * 
																	 */
																},

																destroy : true,
																searching : true,
																"scrollY" : 300,
																"scrollX" : true,
																"paging" : false,

																columns : [

																		{
																			"data" : "supplierName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "bill",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "paymentMode",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "accountantName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "paymentDate",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "totalAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "creditAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "debitAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "balanceAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		}, ],
																/*
																 * dom:
																 * 'Bfrtip',
																 * buttons: [
																 * 'copy',
																 * 'csv',
																 * 'excel',
																 * 'pdf',
																 * 'print' ]
																 */
																dom : 'Bfrtip',
																buttons : [
																		// 'print',

																		{
																			extend : 'print',
																			orientation : 'landscape',
																			title : 'Date Range Wise Supplier Payment Reports \nSupplier Name = '
																					+ SupplierName
																					+ "\nFrom "
																					+ startDate
																					+ " To "
																					+ endDate,
																			footer : true,
																			pageSize : 'LEGAL'
																		},

																		{
																			extend : 'copyHtml5',
																			orientation : 'landscape',
																			title : 'Date Range Wise Supplier Payment Reports \nSupplier Name = '
																					+ SupplierName
																					+ "\nFrom "
																					+ startDate
																					+ " To "
																					+ endDate,
																			footer : true,
																			pageSize : 'LEGAL'
																		},

																		{
																			extend : 'excelHtml5',
																			orientation : 'landscape',
																			title : 'Date Range Wise Supplier Payment Reports \nSupplier Name = '
																					+ SupplierName
																					+ "\nFrom "
																					+ startDate
																					+ " To "
																					+ endDate,
																			messageTop : 'Date Range Wise Supplier Payment Reports \nSupplier Name = '
																					+ SupplierName
																					+ "\nFrom "
																					+ startDate
																					+ " To "
																					+ endDate,
																			footer : true,
																			pageSize : 'LEGAL'
																		},

																		{
																			extend : 'csvHtml5',
																			orientation : 'landscape',
																			title : 'Date Range Wise Supplier Payment Reports \nSupplier Name = '
																					+ SupplierName
																					+ "\nFrom "
																					+ startDate
																					+ " To "
																					+ endDate,
																			footer : true,
																			pageSize : 'LEGAL'
																		},

																		// {
																		// extend:
																		// 'copyHtml5',
																		// footer:
																		// true
																		// },
																		// {
																		// extend:
																		// 'excelHtml5',
																		// footer:
																		// true
																		// },
																		// {
																		// extend:
																		// 'csvHtml5',
																		// footer:
																		// true
																		// },

																		{
																			extend : 'pdfHtml5',
																			orientation : 'landscape',
																			title : 'Date Range Wise Supplier Payment Reports \nSupplier Name = '
																					+ SupplierName
																					+ "\nFrom "
																					+ startDate
																					+ " To "
																					+ endDate,
																			footer : true,
																			pageSize : 'LEGAL'
																		} ]

															});
										});

						var mydata = catmap;
						$('#supplierBetweenTwoDatestable').dataTable()
								.fnAddData(mydata);

					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});

}

/* Bill number Wise supplier payment report */

function getBillWiseReportvalidation() {
	var supplierName = $("#supplier").val();
	var billNo = $("#billNo").val();

	if (supplierName != "") {
		if (billNo == "" || billNo == null) {
			var msg = "Please Select Bill No";
			var dialog = bootbox.dialog({
				message : '<p class="text-center">'
						+ msg.fontcolor("red").fontsize(5) + '</p>',
				closeButton : false
			});
			setTimeout(function() {
				dialog.modal('hide');
			}, 1500);
			return false;
		} else {
			getBillWiseReport();
		}
	} else {
		var msg = "Please Select Supplier Name";
		var dialog = bootbox.dialog({
			message : '<p class="text-center">'
					+ msg.fontcolor("red").fontsize(5) + '</p>',
			closeButton : false
		});
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		return false;
	}

}

function getBillWiseReport() {

	var supplierName = $("#supplier").val();
	var billNo = $("#billNo").val();

	var input = document.getElementById('supplier'), list = document
			.getElementById('sup_drop'), i, supplier;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			supplier = list.options[i].getAttribute('data-value');
		}
	}
	var fkSupplierId = supplier;

	var params = {};
	var billNo = $("#billNo").val();

	params["fkSupplierId"] = fkSupplierId;
	params["billNo"] = billNo;

	params["methodName"] = "getSupplierPaymentDetailsAsPerBillNumber";

	$
			.post(
					'/Shop/jsp/utility/controller.jsp',
					params,
					function(data) {

						// To clear table
						$('#supplierBillWiseData').dataTable().fnClearTable();

						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;

						if (catmap == null || catmap == "") {
							alert("Bill Number Wise Supplier Payment Reports are Not Available for\nSupplier Name = "
									+ supplierName + "\nBill No = " + billNo);
							return false;
						}

						$(document)
								.ready(
										function() {
											var total = $(
													'#supplierBillWiseData')
													.DataTable(
															{

																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	/*
																	 * // Total
																	 * over this
																	 * page
																	 * 
																	 * pageTotal =
																	 * api
																	 * .column(
																	 * 5 )
																	 * .data()
																	 * .reduce(
																	 * function
																	 * (a, b) {
																	 * return
																	 * intVal(a) +
																	 * intVal(b); },
																	 * 0 );
																	 * 
																	 *  //
																	 * Update
																	 * footer $(
																	 * api.column(
																	 * 5
																	 * ).footer()
																	 * ).html( //
																	 * 'Rs'+'
																	 * '+pageTotal.toFixed(2)
																	 * str =
																	 * pageTotal.toFixed(0) );
																	 * console.log(
																	 * pageTotal);
																	 */
																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					6)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column()
																					.footer())
																			.html(
																					// 'Rs'+'
																					// '+pageTotal.toFixed(2)
																					str = pageTotal
																							.toFixed(0));
																	console
																			.log(pageTotal);

																	pageTotal = api
																			.column(
																					7)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							7)
																					.footer())
																			.html(
																					// 'Rs'+'
																					// '+pageTotal.toFixed(2)
																					str = pageTotal
																							.toFixed(0));
																	console
																			.log(pageTotal);
																	/*
																	 * pageTotal =
																	 * api
																	 * .column(
																	 * 8 )
																	 * .data()
																	 * .reduce(
																	 * function
																	 * (a, b) {
																	 * return
																	 * intVal(a) +
																	 * intVal(b); },
																	 * 0 );
																	 * 
																	 *  //
																	 * Update
																	 * footer $(
																	 * api.column(
																	 * 8
																	 * ).footer()
																	 * ).html( //
																	 * 'Rs'+'
																	 * '+pageTotal.toFixed(2)
																	 * str =
																	 * pageTotal.toFixed(0) );
																	 * console.log(
																	 * pageTotal);
																	 *  // Total
																	 * over this
																	 * page
																	 * 
																	 */
																},

																destroy : true,
																searching : true,
																"scrollY" : 300,
																"scrollX" : true,
																"paging" : false,

																columns : [
																		{
																			"data" : "supplierName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "bill",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "paymentMode",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "accountantName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "paymentDate",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "totalAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "creditAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "debitAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "balanceAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		}, ],
																/*
																 * dom:
																 * 'Bfrtip',
																 * buttons: [
																 * 'copy',
																 * 'csv',
																 * 'excel',
																 * 'pdf',
																 * 'print' ]
																 */

																dom : 'Bfrtip',
																buttons : [
																		// 'print',

																		{
																			extend : 'print',
																			orientation : 'landscape',
																			title : 'Bill Number Wise Wise Supplier Payment Reports \nSupplier Name = '
																					+ supplierName
																					+ "\nBill No = "
																					+ billNo,
																			footer : true,
																			pageSize : 'LEGAL'
																		},

																		{
																			extend : 'copyHtml5',
																			orientation : 'landscape',
																			title : 'Bill Number Wise Wise Supplier Payment Reports \nSupplier Name = '
																					+ supplierName
																					+ "\nBill No = "
																					+ billNo,
																			footer : true,
																			pageSize : 'LEGAL'
																		},

																		{
																			extend : 'excelHtml5',
																			orientation : 'landscape',
																			title : 'Bill Number Wise Wise Supplier Payment Reports \nSupplier Name = '
																					+ supplierName
																					+ "\nBill No = "
																					+ billNo,
																			messageTop : 'Bill Number Wise Wise Supplier Payment Reports \nSupplier Name = '
																					+ supplierName
																					+ "\nBill No = "
																					+ billNo,
																			footer : true,
																			pageSize : 'LEGAL'
																		},

																		{
																			extend : 'csvHtml5',
																			orientation : 'landscape',
																			title : 'Bill Number Wise Wise Supplier Payment Reports \nSupplier Name = '
																					+ supplierName
																					+ "\nBill No = "
																					+ billNo,
																			footer : true,
																			pageSize : 'LEGAL'
																		},

																		// {
																		// extend:
																		// 'copyHtml5',
																		// footer:
																		// true
																		// },
																		// {
																		// extend:
																		// 'excelHtml5',
																		// footer:
																		// true
																		// },
																		// {
																		// extend:
																		// 'csvHtml5',
																		// footer:
																		// true
																		// },

																		{
																			extend : 'pdfHtml5',
																			orientation : 'landscape',
																			title : 'Bill Number Wise Wise Supplier Payment Reports \nSupplier Name = '
																					+ supplierName
																					+ "\nBill No = "
																					+ billNo,
																			footer : true,
																			pageSize : 'LEGAL'
																		} ]

															});
										});

						var mydata = catmap;
						$('#supplierBillWiseData').dataTable()
								.fnAddData(mydata);

					});

}

/* Supplier Name wise */

function getSupNameWiseReportValidation() {
	var supplierName = $("#supplier7").val();
	if (supplierName != "") {
		getSupNameWiseReport();
	} else {
		var msg = "Please select Supplier Name";
		var dialog = bootbox.dialog({
			message : '<p class="text-center">'
					+ msg.fontcolor("red").fontsize(5) + '</p>',
			closeButton : false
		});
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		return false;
	}
}

function getSupNameWiseReport() {

	var supplierName = $("#supplier7").val();

	var input = document.getElementById('supplier7'), list = document
			.getElementById('sup_drop7'), i, supplier;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			supplier = list.options[i].getAttribute('data-value');
		}
	}
	var fkSupplierId = supplier;

	var params = {};

	params["fkSupplierId"] = fkSupplierId;

	params["methodName"] = "getSupplierPaymentDetailsAsPerName";

	$.post('/Shop/jsp/utility/controller.jsp',params,function(data) {

						// To clear table
						$('#supplierNameWiseTable').dataTable().fnClearTable();

						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;

						if (catmap == null || catmap == "") {
							alert("Name Wise Supplier Payment Reports are Not Available for\nSupplier Name = "+ supplierName);
							return false;
						}

        	$(document).ready(function() {
		
		        var total = $('#supplierNameWiseTable').DataTable({

				    "bProcessing": true,
				    "sAutoWidth": false,
				    "bDestroy":true,
				    "sPaginationType": "bootstrap", // full_numbers
				    "iDisplayStart ": 10,
				    "iDisplayLength": 10,
				    "bPaginate": false, //hide pagination
				    //"bFilter": false, //hide Search bar
				    "bInfo": false, // hide showing entries
				    
				    
											fnRowCallback : function(
													nRow,
													aData,
													iDisplayIndex) {
												$(
														"th:first",
														nRow)
														.html(
																iDisplayIndex + 1);
												return nRow;
											},

											"footerCallback" : function(
													row,
													data,
													start,
													end,
													display) {
												var api = this
														.api(), data;

												var intVal = function(
														i) {
													return typeof i === 'string' ? i
															.replace(
																	/[\$,]/g,
																	'') * 1
															: typeof i === 'number' ? i
																	: 0;
												};

										/*		pageTotal = api
														.column(
																5)
														.data()
														.reduce(
																function(
																		a,
																		b) {
																	return intVal(a)
																			+ intVal(b);
																},
																0);*/

												// Update
												// footer
									/*			$(
														api
																.column(
																		5)
																.footer())
														.html(
																// 'Rs'+'
																// '+pageTotal.toFixed(2)
																str = pageTotal
																		.toFixed(0));
												console
														.log(pageTotal);*/

												pageTotal = api.column(6).data().reduce(
																function(a,b) {
																	return intVal(a)+ intVal(b);
																},
																0);

												// Update
												// footer
												$(
														api
																.column(
																		6)
																.footer())
														.html(
																// 'Rs'+'
																// '+pageTotal.toFixed(2)
																str = pageTotal
																		.toFixed(0));
												console.log(pageTotal);
												
											},

											destroy : true,
											searching : true,
											"scrollY" : false,
											"scrollX" : true,
											"paging" : false,

											columns : [
													{
														"data" : "supplierName",
														"width" : "5%",
														"defaultContent" : ""
													},
													{
													//	"data" : "billNo",
														"data" : "bill",
														"width" : "5%",
														"defaultContent" : ""
													},
													{
														"data" : "paymentMode",
														"width" : "5%",
														"defaultContent" : ""
													},
													{
														"data" : "accountantName",
														"width" : "5%",
														"defaultContent" : ""
													},
													{
														"data" : "paymentDate",
														"width" : "5%",
														"defaultContent" : ""
													},
													{
														"data" : "totalAmount",
														"width" : "5%",
														"defaultContent" : ""
													},
													{
														"data" : "creditAmount",
														"width" : "5%",
														"defaultContent" : ""
													},
													{
														"data" : "debitAmount",
														"width" : "5%",
														"defaultContent" : ""
													},
													{
														"data" : "balanceAmount",
														"width" : "5%",
														"defaultContent" : ""
													}, ],


											dom : 'Bfrtip',
											buttons : [
												
													{
														extend : 'print',
														orientation : 'landscape',
														title : 'Supplier Name Wise Supplier Payment Reports \nSupplier Name = '
																+ supplierName,
														footer : true,
														pageSize : 'LEGAL'
													},

													{
														extend : 'copyHtml5',
														orientation : 'landscape',
														title : 'Supplier Name Wise Supplier Payment Reports \nSupplier Name = '
																+ supplierName,
														footer : true,
														pageSize : 'LEGAL'
													},

													{
														extend : 'excelHtml5',
														orientation : 'landscape',
														title : 'Supplier Name Wise Supplier Payment Reports \nSupplier Name = '
																+ supplierName,
														messageTop : 'Supplier Name Wise Supplier Payment Reports \nSupplier Name = '
																+ supplierName,
														footer : true,
														pageSize : 'LEGAL'
													},

													{
														extend : 'csvHtml5',
														orientation : 'landscape',
														title : 'Supplier Name Wise Supplier Payment Reports \nSupplier Name = '
																+ supplierName,
														footer : true,
														pageSize : 'LEGAL'
													},

													{
														extend : 'pdfHtml5',
														orientation : 'landscape',
														title : 'Supplier Name Wise Supplier Payment Reports \nSupplier Name = '
																+ supplierName,
														footer : true,
														pageSize : 'LEGAL'
													} ]

										});
					});

						var mydata = catmap;
						$('#supplierNameWiseTable').dataTable().fnAddData(
								mydata);

					});

}

/** ******** Credit Customer Reports ******************** */

/* ++++++ Customer Name wise +++++ */

function getCreditCustomerReportNameWiseValidation() {
	var customername = $("#creditCustomer5").val();
	if (customername != "") {
		getCreditCustomerReportNameWise();
	} else {
		var msg = "Please Select Customer Name";
		var dialog = bootbox.dialog({
			message : '<p class="text-center">'
					+ msg.fontcolor("red").fontsize(5) + '</p>',
			closeButton : false
		});
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		return false;
	}
}

function getCreditCustomerReportNameWise() {

	var customername = $("#creditCustomer5").val();

	var input = document.getElementById('creditCustomer5'), list = document
			.getElementById('cust_drop5'), i, customer;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			customer = list.options[i].getAttribute('data-value');
		}
	}
	var fkCustomerId = customer;

	var params = {};

	params["fkCustomerId"] = fkCustomerId;

	params["methodName"] = "getCustomerReportByName";

	$
			.post(
					'/Shop/jsp/utility/controller.jsp',
					params,
					function(data) {

						// To clear table
						$('#customerNameWiseData2').dataTable().fnClearTable();

						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;

						if (catmap == null || catmap == "") {
							alert("Credit Customer Wise Payment Reports are Not Available for\nCustomer Name = "
									+ customername);
							return false;
						}

						$(document)
								.ready(
										function() {
											var total = $(
													'#customerNameWiseData2')
													.DataTable(
															{

																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};
																	/*
																	 * // Total
																	 * over this
																	 * page
																	 * 
																	 * pageTotal =
																	 * api
																	 * .column(
																	 * 5 )
																	 * .data()
																	 * .reduce(
																	 * function
																	 * (a, b) {
																	 * return
																	 * intVal(a) +
																	 * intVal(b); },
																	 * 0 );
																	 * 
																	 *  //
																	 * Update
																	 * footer $(
																	 * api.column(
																	 * 5
																	 * ).footer()
																	 * ).html( //
																	 * 'Rs'+'
																	 * '+pageTotal.toFixed(2)
																	 * str =
																	 * pageTotal.toFixed(0) );
																	 * console.log(
																	 * pageTotal);
																	 *  // Total
																	 * over this
																	 * page
																	 */
																	pageTotal = api
																			.column(
																					5)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							5)
																					.footer())
																			.html(
																					// 'Rs'+'
																					// '+pageTotal.toFixed(2)
																					str = pageTotal
																							.toFixed(0));
																	console
																			.log(pageTotal);

																	pageTotal = api
																			.column(
																					7)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							7)
																					.footer())
																			.html(
																					// 'Rs'+'
																					// '+pageTotal.toFixed(2)
																					str = pageTotal
																							.toFixed(0));
																	console
																			.log(pageTotal);
																	/*
																	 * pageTotal =
																	 * api
																	 * .column(
																	 * 8 )
																	 * .data()
																	 * .reduce(
																	 * function
																	 * (a, b) {
																	 * return
																	 * intVal(a) +
																	 * intVal(b); },
																	 * 0 );
																	 * 
																	 *  //
																	 * Update
																	 * footer $(
																	 * api.column(
																	 * 8
																	 * ).footer()
																	 * ).html( //
																	 * 'Rs'+'
																	 * '+pageTotal.toFixed(2)
																	 * str =
																	 * pageTotal.toFixed(0) );
																	 * console.log(
																	 * pageTotal);
																	 *  // Total
																	 * over this
																	 * page
																	 */

																},

																destroy : true,
																searching : true,
																"scrollY" : 300,
																"scrollX" : true,
																"paging" : false,

																columns : [
																		{
																			"data" : "creditCustomerFirstName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "creditCustomerLastName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "paymentDate",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "paymentMode",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "totalAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "creditPaymentAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "debitPaymentAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "balanceAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},

																],
																/*
																 * dom:
																 * 'Bfrtip',
																 * buttons: [
																 * 'copy',
																 * 'csv',
																 * 'excel',
																 * 'pdf',
																 * 'print' ]
																 */

																dom : 'Bfrtip',
																buttons : [
																		// 'print',

																		{
																			extend : 'print',
																			orientation : 'landscape',
																			title : 'Customer Name Wise Customer Payment Reports \nCustomer Name = '
																					+ customername,
																			footer : true,
																			pageSize : 'LEGAL'
																		},

																		{
																			extend : 'copyHtml5',
																			orientation : 'landscape',
																			title : 'Customer Name Wise Customer Payment Reports \nCustomer Name = '
																					+ customername,
																			footer : true,
																			pageSize : 'LEGAL'
																		},

																		{
																			extend : 'excelHtml5',
																			orientation : 'landscape',
																			title : 'Customer Name Wise Customer Payment Reports \nCustomer Name = '
																					+ customername,
																			messageTop : 'Customer Name Wise Customer Payment Reports \nCustomer Name = '
																					+ customername,
																			footer : true,
																			pageSize : 'LEGAL'
																		},

																		{
																			extend : 'csvHtml5',
																			orientation : 'landscape',
																			title : 'Customer Name Wise Customer Payment Reports \nCustomer Name = '
																					+ customername,
																			footer : true,
																			pageSize : 'LEGAL'
																		},

																		// {
																		// extend:
																		// 'copyHtml5',
																		// footer:
																		// true
																		// },
																		// {
																		// extend:
																		// 'excelHtml5',
																		// footer:
																		// true
																		// },
																		// {
																		// extend:
																		// 'csvHtml5',
																		// footer:
																		// true
																		// },

																		{
																			extend : 'pdfHtml5',
																			orientation : 'landscape',
																			title : 'Customer Name Wise Customer Payment Reports \nCustomer Name = '
																					+ customername,
																			footer : true,
																			pageSize : 'LEGAL'
																		} ]

															});
										});

						var mydata = catmap;
						$('#customerNameWiseData2').dataTable().fnAddData(
								mydata);

					});

}

/* Bill Wise */

function getBillWiseCreditReportValidation() {
	var customerName = $("#creditCustomer").val();
	// var category = $("#fk_cat_id0").val();
	var billNo = $("#billNo1").val();

	if (customerName != "") {
		/*
		 * if(category != "") {
		 */
		if (billNo == "" || billNo == null) {
			var msg = "Please Enter Bill No";
			var dialog = bootbox.dialog({
				message : '<p class="text-center">'
						+ msg.fontcolor("red").fontsize(5) + '</p>',
				closeButton : false
			});
			setTimeout(function() {
				dialog.modal('hide');
			}, 1500);
			return false;
		} else {
			getBillWiseCreditReport()
		}
		/*
		 * } else { alert("Please Enter Category"); }
		 */
	} else {
		
		var msg = "Select customerName";
		var dialog = bootbox.dialog({
			message : '<p class="text-center">'
					+ msg.fontcolor("red").fontsize(5) + '</p>',
			closeButton : false
		});
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		return false;
		
		
		/*alert("Please Enter Customer Name");*/
	}
}

function getBillWiseCreditReport() {

	var customerName = $("#creditCustomer").val();
	var category = $("#fk_cat_id0").val();
	var billNo = $("#billNo1").val();

	var input = document.getElementById('creditCustomer'), 
		list = document.getElementById('cust_drop'), 
		       i, creditCustomer;
	
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			creditCustomer = list.options[i].getAttribute('data-value');
		}
	}

	var fkCustomerId = creditCustomer;
	var params = {};
	
	var billNo = $("#billNo1").val();

	params["billNo"] = billNo;
	params["fkCustomerId"] = fkCustomerId;
	// params["cat"]= cat;
	params["methodName"] = "getCreditCustPaymentDetailsForBillNo";

	$.post('/Shop/jsp/utility/controller.jsp',params,function(data) {
						// To clear table
						$('#customerNameWiseData').dataTable().fnClearTable();

						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;

						if (catmap == "" || catmap == null) {
							alert("Bill Number Wise Customer Payment Reports\nCustomer Name = "
									+ customerName + "\nBill No = " + billNo);

						}

						$(document).ready(function() {
							
							var total = $('#customerNameWiseData').DataTable({

																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	// Total
																	// over all
																	// pages
																	/*
																	 * total =
																	 * api
																	 * .column(
																	 * 6 )
																	 * .data()
																	 * .reduce(
																	 * function
																	 * (a, b) {
																	 * return
																	 * intVal(a) +
																	 * intVal(b); },
																	 * 0 );
																	 * console.log(total);
																	 */
																	// Total
																	// over this
																	// page
																	/*
																	 * pageTotal =
																	 * api
																	 * .column(
																	 * 5 )
																	 * .data()
																	 * .reduce(
																	 * function
																	 * (a, b) {
																	 * return
																	 * intVal(a) +
																	 * intVal(b); },
																	 * 0 );
																	 * 
																	 *  //
																	 * Update
																	 * footer $(
																	 * api.column(
																	 * 5
																	 * ).footer()
																	 * ).html( //
																	 * 'Rs'+'
																	 * '+pageTotal.toFixed(2)
																	 * str =
																	 * pageTotal.toFixed(0) );
																	 * console.log(
																	 * pageTotal);
																	 */
																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					6)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							6)
																					.footer())
																			.html(
																					// 'Rs'+'
																					// '+pageTotal.toFixed(2)
																					str = pageTotal
																							.toFixed(0));
																	console
																			.log(pageTotal);

																	pageTotal = api
																			.column(
																					7)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							7)
																					.footer())
																			.html(
																					// 'Rs'+'
																					// '+pageTotal.toFixed(2)
																					str = pageTotal
																							.toFixed(0));
																	console
																			.log(pageTotal);
																	/*
																	 * pageTotal =
																	 * api
																	 * .column(
																	 * 8 )
																	 * .data()
																	 * .reduce(
																	 * function
																	 * (a, b) {
																	 * return
																	 * intVal(a) +
																	 * intVal(b); },
																	 * 0 );
																	 * 
																	 *  //
																	 * Update
																	 * footer $(
																	 * api.column(
																	 * 8
																	 * ).footer()
																	 * ).html( //
																	 * 'Rs'+'
																	 * '+pageTotal.toFixed(2)
																	 * str =
																	 * pageTotal.toFixed(0) );
																	 * console.log(
																	 * pageTotal);
																	 *  // Total
																	 * over this
																	 * page
																	 */

																},

																destroy : true,
																searching : true,
																"scrollY" : false,
																"scrollX" : true,
																"paging" : false,

																columns : [
																		{
																			"data" : "creditCustomerFirstName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "creditCustomerLastName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "paymentDate",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "paymentMode",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "totalAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "creditPaymentAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "debitPaymentAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "balanceAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		}, ],
																dom : 'Bfrtip',
																buttons : [
																		'copy',
																		'csv',
																		'excel',
																		'pdf',
																		'print' ]

															});
										});

						var mydata = catmap;
						$('#customerNameWiseData').dataTable()
								.fnAddData(mydata);

					}

			);

}

/** ******** for single date ******** */

function creditCustReportForSingleDateValidate() {
	var enterDate = $("#fDate1").val();
	if (enterDate == "") {
		var msg = "Please Enter Date";
		var dialog = bootbox.dialog({
			message : '<p class="text-center">'
					+ msg.fontcolor("red").fontsize(5) + '</p>',
			closeButton : false
		});
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		return false;
	} else {
		creditCustReportForSingleDate();
	}
}

function creditCustReportForSingleDate() {

	var params = {};
	var fDate = $("#fDate1").val();

	params["fDate"] = fDate;

	params["methodName"] = "getCreditCustPaymentDetailsForSingleDate";

	$
			.post(
					'/Shop/jsp/utility/controller.jsp',
					params,
					function(data) {
						// To clear table
						$('#customerSingleDatetable').dataTable()
								.fnClearTable();

						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;

						if (catmap == null || catmap == "") {
							alert("Customer Payment Reports Are Not Available for\nDate = "
									+ fDate);
							return false;
						}

						$(document)
								.ready(
										function() {
											var total = $(
													'#customerSingleDatetable')
													.DataTable(
															{

																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	// Total
																	// over all
																	// pages
																	/*
																	 * total =
																	 * api
																	 * .column(
																	 * 6 )
																	 * .data()
																	 * .reduce(
																	 * function
																	 * (a, b) {
																	 * return
																	 * intVal(a) +
																	 * intVal(b); },
																	 * 0 );
																	 * console.log(total);
																	 */
																	// Total
																	// over this
																	// page
																	/*
																	 * pageTotal =
																	 * api
																	 * .column(
																	 * 5 )
																	 * .data()
																	 * .reduce(
																	 * function
																	 * (a, b) {
																	 * return
																	 * intVal(a) +
																	 * intVal(b); },
																	 * 0 );
																	 * 
																	 *  //
																	 * Update
																	 * footer $(
																	 * api.column(
																	 * 5
																	 * ).footer()
																	 * ).html( //
																	 * 'Rs'+'
																	 * '+pageTotal.toFixed(2)
																	 * str =
																	 * pageTotal.toFixed(0) );
																	 * console.log(
																	 * pageTotal);
																	 */
																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					6)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							6)
																					.footer())
																			.html(
																					// 'Rs'+'
																					// '+pageTotal.toFixed(2)
																					str = pageTotal
																							.toFixed(0));
																	console
																			.log(pageTotal);

																	pageTotal = api
																			.column(
																					7)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							7)
																					.footer())
																			.html(
																					// 'Rs'+'
																					// '+pageTotal.toFixed(2)
																					str = pageTotal
																							.toFixed(0));
																	console
																			.log(pageTotal);
																	/*
																	 * pageTotal =
																	 * api
																	 * .column(
																	 * 8 )
																	 * .data()
																	 * .reduce(
																	 * function
																	 * (a, b) {
																	 * return
																	 * intVal(a) +
																	 * intVal(b); },
																	 * 0 );
																	 * 
																	 *  //
																	 * Update
																	 * footer $(
																	 * api.column(
																	 * 8
																	 * ).footer()
																	 * ).html( //
																	 * 'Rs'+'
																	 * '+pageTotal.toFixed(2)
																	 * str =
																	 * pageTotal.toFixed(0) );
																	 * console.log(
																	 * pageTotal);
																	 *  // Total
																	 * over this
																	 * page
																	 */

																},

																destroy : true,
																searching : true,
																"scrollY" : 300,
																"scrollX" : true,
																"paging" : false,

																columns : [
																		{
																			"data" : "creditCustomerFirstName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "creditCustomerLastName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "paymentDate",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "paymentMode",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "totalAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "creditPaymentAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "debitPaymentAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "balanceAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		}, ],
																dom : 'Bfrtip',
																buttons : [
																		'copy',
																		'csv',
																		'excel',
																		'pdf',
																		'print' ]

															});
										});

						var mydata = catmap;
						$('#customerSingleDatetable').dataTable().fnAddData(
								mydata);

					}

			);

}

/** *************** Between two dates ************ */

function getCreditCustomerDetailsBetweenTwoDatesValidate() {
	var customername = $("#creditCustomer6").val();
	var firstdate = $("#fisDate").val();
	var secondDate = $("#endDate").val();

	if (customername != "") {
		if (firstdate != "") {
			if (secondDate != "") {
				getCreditCustomerDetailsBetweenTwoDates();
			} else {
				var msg = "Please enter End Date";
				var dialog = bootbox.dialog({
					message : '<p class="text-center">'
							+ msg.fontcolor("red").fontsize(5) + '</p>',
					closeButton : false
				});
				setTimeout(function() {
					dialog.modal('hide');
				}, 1500);
				return false;
			}
		} else {
			var msg = "Please enter Start Date";
			var dialog = bootbox.dialog({
				message : '<p class="text-center">'
						+ msg.fontcolor("red").fontsize(5) + '</p>',
				closeButton : false
			});
			setTimeout(function() {
				dialog.modal('hide');
			}, 1500);
			return false;
		}
	} else {
		var msg = "Please enter Customer Name";
		var dialog = bootbox.dialog({
			message : '<p class="text-center">'
					+ msg.fontcolor("red").fontsize(5) + '</p>',
			closeButton : false
		});
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		return false;
	}

}

function getCreditCustomerDetailsBetweenTwoDates() {
	var params = {};

	var customername = $("#creditCustomer6").val();
	var startDate = $("#fisDate").val();
	var endDate = $("#endDate").val();

	var input = document.getElementById('creditCustomer6'), list = document
			.getElementById('cust_drop6'), i, customer;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			customer = list.options[i].getAttribute('data-value');
		}
	}
	var fkCustomerId = customer;

	params["fisDate"] = startDate;
	params["endDate"] = endDate;
	params["fkCustomerId"] = fkCustomerId;
	params["methodName"] = "getCustomerReportBetweenTwoDates";

	$
			.post(
					'/Shop/jsp/utility/controller.jsp',
					params,
					function(data) {
						// To clear table
						$('#customerBetweenTwoDates').dataTable()
								.fnClearTable();

						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;

						if (catmap == null || catmap == "") {
							alert("Credit Customer Reports are Not Available for\nCustomer Name = "
									+ customername
									+ "\nStart Date = "
									+ startDate + "\nEnd Date = " + endDate);
							return false;
						}

						$(document)
								.ready(
										function() {
											$('#customerBetweenTwoDates')
													.DataTable(
															{
																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	// Total
																	// over all
																	// pages
																	/*
																	 * total =
																	 * api
																	 * .column(
																	 * 6 )
																	 * .data()
																	 * .reduce(
																	 * function
																	 * (a, b) {
																	 * return
																	 * intVal(a) +
																	 * intVal(b); },
																	 * 0 );
																	 * console.log(total);
																	 */
																	// Total
																	// over this
																	// page
																	/*
																	 * pageTotal =
																	 * api
																	 * .column(
																	 * 5 )
																	 * .data()
																	 * .reduce(
																	 * function
																	 * (a, b) {
																	 * return
																	 * intVal(a) +
																	 * intVal(b); },
																	 * 0 );
																	 * 
																	 *  //
																	 * Update
																	 * footer $(
																	 * api.column(
																	 * 5
																	 * ).footer()
																	 * ).html( //
																	 * 'Rs'+'
																	 * '+pageTotal.toFixed(2)
																	 * str =
																	 * pageTotal.toFixed(0) );
																	 * console.log(
																	 * pageTotal);
																	 */
																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					6)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							6)
																					.footer())
																			.html(
																					// 'Rs'+'
																					// '+pageTotal.toFixed(2)
																					str = pageTotal
																							.toFixed(0));
																	console
																			.log(pageTotal);

																	pageTotal = api
																			.column(
																					7)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							7)
																					.footer())
																			.html(
																					// 'Rs'+'
																					// '+pageTotal.toFixed(2)
																					str = pageTotal
																							.toFixed(0));
																	console
																			.log(pageTotal);
																	/*
																	 * pageTotal =
																	 * api
																	 * .column(
																	 * 8 )
																	 * .data()
																	 * .reduce(
																	 * function
																	 * (a, b) {
																	 * return
																	 * intVal(a) +
																	 * intVal(b); },
																	 * 0 );
																	 * 
																	 *  //
																	 * Update
																	 * footer $(
																	 * api.column(
																	 * 8
																	 * ).footer()
																	 * ).html( //
																	 * 'Rs'+'
																	 * '+pageTotal.toFixed(2)
																	 * str =
																	 * pageTotal.toFixed(0) );
																	 * console.log(
																	 * pageTotal);
																	 *  // Total
																	 * over this
																	 * page
																	 */

																},

																destroy : true,
																searching : true,
																"scrollY" : 300,
																"scrollX" : true,
																"paging" : false,

																columns : [

																		{
																			"data" : "creditCustomerFirstName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "creditCustomerLastName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "paymentDate",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "paymentMode",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "totalAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "creditPaymentAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "debitPaymentAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "balanceAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		}, ],
																/*
																 * dom:
																 * 'Bfrtip',
																 * buttons: [
																 * 'copy',
																 * 'csv',
																 * 'excel',
																 * 'pdf',
																 * 'print' ]
																 */

																dom : 'Bfrtip',
																buttons : [
																		// 'print',

																		{
																			extend : 'print',
																			orientation : 'landscape',
																			title : 'Range Wise Customer Payment Reports \nCustomer Name = '
																					+ customername
																					+ "\nStart date = "
																					+ startDate
																					+ "\nEnd Date = "
																					+ endDate,
																			footer : true,
																			pageSize : 'LEGAL'
																		},

																		{
																			extend : 'copyHtml5',
																			orientation : 'landscape',
																			title : 'Range Wise Customer Payment Reports \nCustomer Name = '
																					+ customername
																					+ "\nStart date = "
																					+ startDate
																					+ "\nEnd Date = "
																					+ endDate,
																			footer : true,
																			pageSize : 'LEGAL'
																		},

																		{
																			extend : 'excelHtml5',
																			orientation : 'landscape',
																			title : 'Range Wise Customer Payment Reports \nCustomer Name = '
																					+ customername
																					+ "\nStart date = "
																					+ startDate
																					+ "\nEnd Date = "
																					+ endDate,
																			messageTop : 'Range Wise Customer Payment Reports \nCustomer Name = '
																					+ customername
																					+ "\nStart date = "
																					+ startDate
																					+ "\nEnd Date = "
																					+ endDate,
																			footer : true,
																			pageSize : 'LEGAL'
																		},

																		{
																			extend : 'csvHtml5',
																			orientation : 'landscape',
																			title : 'Range Wise Customer Payment Reports \nCustomer Name = '
																					+ customername
																					+ "\nStart date = "
																					+ startDate
																					+ "\nEnd Date = "
																					+ endDate,
																			footer : true,
																			pageSize : 'LEGAL'
																		},

																		// {
																		// extend:
																		// 'copyHtml5',
																		// footer:
																		// true
																		// },
																		// {
																		// extend:
																		// 'excelHtml5',
																		// footer:
																		// true
																		// },
																		// {
																		// extend:
																		// 'csvHtml5',
																		// footer:
																		// true
																		// },

																		{
																			extend : 'pdfHtml5',
																			orientation : 'landscape',
																			title : 'Range Wise Customer Payment Reports \nCustomer Name = '
																					+ customername
																					+ "\nStart date = "
																					+ startDate
																					+ "\nEnd Date = "
																					+ endDate,
																			footer : true,
																			pageSize : 'LEGAL'
																		} ]

															});
										});

						var mydata = catmap;
						$('#customerBetweenTwoDates').dataTable().fnAddData(
								mydata);

					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});
}

//-------------------------


function getpayDetailsBetweenTwoDatesValidate() {
	var customername = $("#paymentMode").val();
	var firstdate = $("#payfisDate").val();
	var secondDate = $("#payendDate").val();

	if (customername != "") {
		if (firstdate != "") {
			if (secondDate != "") {
				getpayDetailsBetweenTwoDates();
			} else {
				var msg = "Please enter End Date";
				var dialog = bootbox.dialog({
					message : '<p class="text-center">'
							+ msg.fontcolor("red").fontsize(5) + '</p>',
					closeButton : false
				});
				setTimeout(function() {
					dialog.modal('hide');
				}, 1500);
				return false;
			}
		} else {
			var msg = "Please enter Start Date";
			var dialog = bootbox.dialog({
				message : '<p class="text-center">'
						+ msg.fontcolor("red").fontsize(5) + '</p>',
				closeButton : false
			});
			setTimeout(function() {
				dialog.modal('hide');
			}, 1500);
			return false;
		}
	} else {
		var msg = "Please Select Payment mode";
		var dialog = bootbox.dialog({
			message : '<p class="text-center">'
					+ msg.fontcolor("red").fontsize(5) + '</p>',
			closeButton : false
		});
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		return false;
	}

}

function getpayDetailsBetweenTwoDates() {
	var params = {};

	var customername = $("#paymentMode").val();
	var startDate = $("#payfisDate").val();
	var endDate = $("#payendDate").val();

	params["fisDate"] = startDate;
	params["endDate"] = endDate;
	params["fkCustomerId"] = customername;
	params["methodName"] = "getpayReportBetweenTwoDates";

	$
			.post(
					'/Shop/jsp/utility/controller.jsp',
					params,
					function(data) {
						// To clear table
						$('#paymentBetweenTwoDates').dataTable()
								.fnClearTable();

						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;

						if (catmap == null || catmap == "") {
							alert("Payment Mode Reports are Not Available for\nPayment = "
									+ customername
									+ "\nStart Date = "
									+ startDate + "\nEnd Date = " + endDate);
							return false;
						}

						$(document)
								.ready(
										function() {
											$('#paymentBetweenTwoDates')
													.DataTable(
															{
																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	// Total
																	// over all
																	// pages
																	/*
																	 * total =
																	 * api
																	 * .column(
																	 * 6 )
																	 * .data()
																	 * .reduce(
																	 * function
																	 * (a, b) {
																	 * return
																	 * intVal(a) +
																	 * intVal(b); },
																	 * 0 );
																	 * console.log(total);
																	 */
																	// Total
																	// over this
																	// page
																	/*
																	 * pageTotal =
																	 * api
																	 * .column(
																	 * 5 )
																	 * .data()
																	 * .reduce(
																	 * function
																	 * (a, b) {
																	 * return
																	 * intVal(a) +
																	 * intVal(b); },
																	 * 0 );
																	 * 
																	 *  //
																	 * Update
																	 * footer $(
																	 * api.column(
																	 * 5
																	 * ).footer()
																	 * ).html( //
																	 * 'Rs'+'
																	 * '+pageTotal.toFixed(2)
																	 * str =
																	 * pageTotal.toFixed(0) );
																	 * console.log(
																	 * pageTotal);
																	 */
																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					6)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							6)
																					.footer())
																			.html(
																					// 'Rs'+'
																					// '+pageTotal.toFixed(2)
																					str = pageTotal
																							.toFixed(0));
																	console
																			.log(pageTotal);

																	pageTotal = api
																			.column(
																					7)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							7)
																					.footer())
																			.html(
																					// 'Rs'+'
																					// '+pageTotal.toFixed(2)
																					str = pageTotal
																							.toFixed(0));
																	console
																			.log(pageTotal);
																	/*
																	 * pageTotal =
																	 * api
																	 * .column(
																	 * 8 )
																	 * .data()
																	 * .reduce(
																	 * function
																	 * (a, b) {
																	 * return
																	 * intVal(a) +
																	 * intVal(b); },
																	 * 0 );
																	 * 
																	 *  //
																	 * Update
																	 * footer $(
																	 * api.column(
																	 * 8
																	 * ).footer()
																	 * ).html( //
																	 * 'Rs'+'
																	 * '+pageTotal.toFixed(2)
																	 * str =
																	 * pageTotal.toFixed(0) );
																	 * console.log(
																	 * pageTotal);
																	 *  // Total
																	 * over this
																	 * page
																	 */

																},

																destroy : true,
																searching : true,
																"scrollY" : 300,
																"scrollX" : true,
																"paging" : false,

																columns : [

																		{
																			"data" : "creditCustomerFirstName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "creditCustomerLastName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "paymentDate",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "paymentMode",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "totalAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "creditPaymentAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "debitPaymentAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "balanceAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		}, ],
																/*
																 * dom:
																 * 'Bfrtip',
																 * buttons: [
																 * 'copy',
																 * 'csv',
																 * 'excel',
																 * 'pdf',
																 * 'print' ]
																 */

																dom : 'Bfrtip',
																buttons : [
																		// 'print',

																		{
																			extend : 'print',
																			orientation : 'landscape',
																			title : 'Range Wise  Payment Reports \nCustomer Name = '
																					+ customername
																					+ "\nStart date = "
																					+ startDate
																					+ "\nEnd Date = "
																					+ endDate,
																			footer : true,
																			pageSize : 'LEGAL'
																		},

																		{
																			extend : 'copyHtml5',
																			orientation : 'landscape',
																			title : 'Range Wise  Payment Reports \nCustomer Name = '
																					+ customername
																					+ "\nStart date = "
																					+ startDate
																					+ "\nEnd Date = "
																					+ endDate,
																			footer : true,
																			pageSize : 'LEGAL'
																		},

																		{
																			extend : 'excelHtml5',
																			orientation : 'landscape',
																			title : 'Range Wise  Payment Reports \nCustomer Name = '
																					+ customername
																					+ "\nStart date = "
																					+ startDate
																					+ "\nEnd Date = "
																					+ endDate,
																			messageTop : 'Range Wise  Payment Reports \nCustomer Name = '
																					+ customername
																					+ "\nStart date = "
																					+ startDate
																					+ "\nEnd Date = "
																					+ endDate,
																			footer : true,
																			pageSize : 'LEGAL'
																		},

																		{
																			extend : 'csvHtml5',
																			orientation : 'landscape',
																			title : 'Range Wise Payment Reports \nCustomer Name = '
																					+ customername
																					+ "\nStart date = "
																					+ startDate
																					+ "\nEnd Date = "
																					+ endDate,
																			footer : true,
																			pageSize : 'LEGAL'
																		},

																		// {
																		// extend:
																		// 'copyHtml5',
																		// footer:
																		// true
																		// },
																		// {
																		// extend:
																		// 'excelHtml5',
																		// footer:
																		// true
																		// },
																		// {
																		// extend:
																		// 'csvHtml5',
																		// footer:
																		// true
																		// },

																		{
																			extend : 'pdfHtml5',
																			orientation : 'landscape',
																			title : 'Range Wise Payment Mode Reports \Payment Mode = '
																					+ customername
																					+ "\nStart date = "
																					+ startDate
																					+ "\nEnd Date = "
																					+ endDate,
																			footer : true,
																			pageSize : 'LEGAL'
																		} ]

															});
										});

						var mydata = catmap;
						$('#paymentBetweenTwoDates').dataTable().fnAddData(
								mydata);

					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});
}

/** ********** Employee Payment Report ************* */
/** ********* For single Date ******** */

function employeePaymentReportForSingleDateValidate() {
	var enterDate = $("#fDate2").val();
	if (enterDate != "") {
		employeePaymentReportForSingleDate();
	} else {
		var msg = "Please Enter Date";
		var dialog = bootbox.dialog({
			message : '<p class="text-center">'
					+ msg.fontcolor("red").fontsize(5) + '</p>',
			closeButton : false
		});
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		return false;
	}
}

function employeePaymentReportForSingleDate() {

	var params = {};

	var fDate = $("#fDate2").val();

	params["fDate"] = fDate;

	params["methodName"] = "getEmpPaymentDetailsForSingleDate";

	$
			.post(
					'/Shop/jsp/utility/controller.jsp',
					params,
					function(data) {
						// To clear table
						$('#employeeSingleDatetable').dataTable()
								.fnClearTable();

						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;

						if (catmap == null || catmap == "") {
							alert("Employee Payment Reports are Not Available for\nDate = "
									+ fDate);
							return false;
						}

						$(document)
								.ready(
										function() {
											var total = $(
													'#employeeSingleDatetable')
													.DataTable(
															{

																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	// Total
																	// over all
																	// pages
																	/*
																	 * total =
																	 * api
																	 * .column(
																	 * 6 )
																	 * .data()
																	 * .reduce(
																	 * function
																	 * (a, b) {
																	 * return
																	 * intVal(a) +
																	 * intVal(b); },
																	 * 0 );
																	 * console.log(total);
																	 */
																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					6)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							6)
																					.footer())
																			.html(
																					// 'Rs'+'
																					// '+pageTotal.toFixed(2)
																					str = pageTotal
																							.toFixed(0));
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					7)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							7)
																					.footer())
																			.html(
																					// 'Rs'+'
																					// '+pageTotal.toFixed(2)
																					str = pageTotal
																							.toFixed(0));
																	console
																			.log(pageTotal);
																	// Total
																	// over this
																	// page

																},

																destroy : true,
																searching : true,
																"scrollY" : 300,
																"scrollX" : true,
																"paging" : false,

																columns : [
																		{
																			"data" : "firstName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "lastName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "insertDate",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "paymentMode",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "accountantName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "reason",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "creditPaymentAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "debitPaymentAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		}, ],
																/*
																 * dom:
																 * 'Bfrtip',
																 * buttons: [
																 * 'copy',
																 * 'csv',
																 * 'excel',
																 * 'pdf',
																 * 'print' ]
																 */

																dom : 'Bfrtip',
																buttons : [
																		// 'print',

																		{
																			extend : 'print',
																			orientation : 'landscape',
																			title : 'Date Wise Employee Payment Reports \nDate = '
																					+ fDate,
																			footer : true,
																			pageSize : 'LEGAL'
																		},

																		{
																			extend : 'copyHtml5',
																			orientation : 'landscape',
																			title : 'Date Wise Employee Payment Reports \nDate = '
																					+ fDate,
																			footer : true,
																			pageSize : 'LEGAL'
																		},

																		{
																			extend : 'excelHtml5',
																			orientation : 'landscape',
																			title : 'Date Wise Employee Payment Reports \nDate = '
																					+ fDate,
																			title : 'Date Wise Employee Payment Reports \nDate = '
																					+ fDate,
																			footer : true,
																			pageSize : 'LEGAL'
																		},

																		{
																			extend : 'csvHtml5',
																			orientation : 'landscape',
																			title : 'Date Wise Employee Payment Reports \nDate = '
																					+ fDate,
																			footer : true,
																			pageSize : 'LEGAL'
																		},

																		// {
																		// extend:
																		// 'copyHtml5',
																		// footer:
																		// true
																		// },
																		// {
																		// extend:
																		// 'excelHtml5',
																		// footer:
																		// true
																		// },
																		// {
																		// extend:
																		// 'csvHtml5',
																		// footer:
																		// true
																		// },

																		{
																			extend : 'pdfHtml5',
																			orientation : 'landscape',
																			title : 'Date Wise Employee Payment Reports \nDate = '
																					+ fDate,
																			footer : true,
																			pageSize : 'LEGAL'
																		} ]

															});
										});

						var mydata = catmap;
						$('#employeeSingleDatetable').dataTable().fnAddData(
								mydata);

					}

			);

}

/** **** Between Two dates ********* */

function getEmpPaymentDetailsBetTwoDaysValidate() {
	var customerName = $("#emp").val();
	var startDate = $("#fisDate2").val();
	var endDate = $("#endDate2").val();

	if (customerName != "") {
		if (startDate != "") {
			if (endDate != "") {
				getEmpPaymentDetailsBetTwoDays();
			} else {
				var msg = "Please Enter End Date";
				var dialog = bootbox.dialog({
					message : '<p class="text-center">'
							+ msg.fontcolor("red").fontsize(5) + '</p>',
					closeButton : false
				});
				setTimeout(function() {
					dialog.modal('hide');
				}, 1500);
				return false;
			}
		} else {
			var msg = "Please Enter Start Date";
			var dialog = bootbox.dialog({
				message : '<p class="text-center">'
						+ msg.fontcolor("red").fontsize(5) + '</p>',
				closeButton : false
			});
			setTimeout(function() {
				dialog.modal('hide');
			}, 1500);
			return false;

		}
	} else {
		var msg = "Please Enter Customer Name";
		var dialog = bootbox.dialog({
			message : '<p class="text-center">'
					+ msg.fontcolor("red").fontsize(5) + '</p>',
			closeButton : false
		});
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		return false;
	}

}

function getEmpPaymentDetailsBetTwoDays() {

	var params = {};

	var customerName = $("#emp").val();
	var startDate = $("#fisDate2").val();
	var endDate = $("#endDate2").val();

	var input = document.getElementById('emp'), list = document
			.getElementById('emp_drop'), i, supplier;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			Employee = list.options[i].getAttribute('data-value');
		}
	}
	var fkEmployeeId = Employee;

	params["fisDate"] = startDate;
	params["endDate"] = endDate;
	params["fkEmployeeId"] = fkEmployeeId;
	params["methodName"] = "getEmployeeReportBetweenTwoDates";

	$
			.post(
					'/Shop/jsp/utility/controller.jsp',
					params,
					function(data) {
						// To clear table
						$('#empBetweenTwoDates').dataTable().fnClearTable();

						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;

						if (catmap == null || catmap == "") {
							alert("Employee payment Reports are Not Available for\nCustomer Name = "
									+ customerName
									+ "\nStart Date = "
									+ startDate + "\nEnd Date = " + endDate);
							return false;
						}

						$(document)
								.ready(
										function() {
											$('#empBetweenTwoDates')
													.DataTable(
															{
																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					6)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							6)
																					.footer())
																			.html(
																					// 'Rs'+'
																					// '+pageTotal.toFixed(2)
																					str = pageTotal
																							.toFixed(0));
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					7)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							7)
																					.footer())
																			.html(
																					// 'Rs'+'
																					// '+pageTotal.toFixed(2)
																					str = pageTotal
																							.toFixed(0));
																	console
																			.log(pageTotal);
																	// Total
																	// over this
																	// page

																},

																destroy : true,
																searching : true,
																"scrollY" : 300,
																"scrollX" : true,
																"paging" : false,

																columns : [

																		{
																			"data" : "firstName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "lastName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "insertDate",
																			"width" : "5%"
																		},
																		{
																			"data" : "paymentMode",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "accountantName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "reason",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "creditPaymentAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "debitPaymentAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		}, ],
																/*
																 * dom:
																 * 'Bfrtip',
																 * buttons: [
																 * 'copy',
																 * 'csv',
																 * 'excel',
																 * 'pdf',
																 * 'print' ]
																 */
																dom : 'Bfrtip',
																buttons : [
																		// 'print',

																		{
																			extend : 'print',
																			orientation : 'landscape',
																			title : 'Date Range Wise Supplier Payment Reports \nCustomer Name = '
																					+ customerName
																					+ "\nFrom "
																					+ startDate
																					+ " To "
																					+ endDate,
																			footer : true,
																			pageSize : 'LEGAL'
																		},

																		{
																			extend : 'copyHtml5',
																			orientation : 'landscape',
																			title : 'Date Range Wise Supplier Payment Reports \nCustomer Name = '
																					+ customerName
																					+ "\nFrom "
																					+ startDate
																					+ " To "
																					+ endDate,
																			footer : true,
																			pageSize : 'LEGAL'
																		},

																		{
																			extend : 'excelHtml5',
																			orientation : 'landscape',
																			title : 'Date Range Wise Supplier Payment Reports \nCustomer Name = '
																					+ customerName
																					+ "\nFrom "
																					+ startDate
																					+ " To "
																					+ endDate,
																			messageTop : 'Date Range Wise Supplier Payment Reports \nCustomer Name = '
																					+ customerName
																					+ "\nFrom "
																					+ startDate
																					+ " To "
																					+ endDate,
																			footer : true,
																			pageSize : 'LEGAL'
																		},

																		{
																			extend : 'csvHtml5',
																			orientation : 'landscape',
																			title : 'Date Range Wise Supplier Payment Reports \nCustomer Name = '
																					+ customerName
																					+ "\nFrom "
																					+ startDate
																					+ " To "
																					+ endDate,
																			footer : true,
																			pageSize : 'LEGAL'
																		},

																		// {
																		// extend:
																		// 'copyHtml5',
																		// footer:
																		// true
																		// },
																		// {
																		// extend:
																		// 'excelHtml5',
																		// footer:
																		// true
																		// },
																		// {
																		// extend:
																		// 'csvHtml5',
																		// footer:
																		// true
																		// },

																		{
																			extend : 'pdfHtml5',
																			orientation : 'landscape',
																			title : 'Date Range Wise Supplier Payment Reports \nCustomer Name = '
																					+ customerName
																					+ "\nFrom "
																					+ startDate
																					+ " To "
																					+ endDate,
																			footer : true,
																			pageSize : 'LEGAL'
																		} ]

															});
										});

						var mydata = catmap;
						$('#empBetweenTwoDates').dataTable().fnAddData(mydata);

					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});

}

/** ********* Expense Payment Reports ************ */
/** ****** For single date ******** */

function expensePaymentReportForSingleDateValidate() {
	var fDate = $("#fDate4").val();
	if (fDate != "") {
		expensePaymentReportForSingleDate();
	} else {
		var msg = "Please Enter Date";
		var dialog = bootbox.dialog({
			message : '<p class="text-center">'
					+ msg.fontcolor("red").fontsize(5) + '</p>',
			closeButton : false
		});
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		return false;
	}
}

function expensePaymentReportForSingleDate() {

	var params = {};
	var fDate = $("#fDate4").val();

	params["fDate"] = fDate;

	params["methodName"] = "getExpensePaymentDetailsForSingleDate";

	$.post('/Shop/jsp/utility/controller.jsp',params,function(data) {
						// To clear table
						$('#expenseSingleDatetable').dataTable().fnClearTable();

						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;

						if (catmap == null || catmap == "") {
							alert("Expenditure Reports are Not Available for\nDate = "
									+ fDate);
							return false;
						}

						$(document)
								.ready(
										function() {
											var total = $(
													'#expenseSingleDatetable')
													.DataTable(
															{

																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};
																	pageTotal = api
																			.column(
																					3)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							3)
																					.footer())
																			.html(

																					'Rs'
																							+ ' '
																							+ parseFloat(
																									pageTotal)
																									.toFixed(
																											2)

																			);
																	console
																			.log(pageTotal);
																	pageTotal = api
																			.column(
																					4)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							4)
																					.footer())
																			.html(

																					'Rs'
																							+ ' '
																							+ parseFloat(
																									pageTotal)
																									.toFixed(
																											2)

																			);

																	/*
																	 * console.log(
																	 * pageTotal);
																	 * pageTotal =
																	 * api
																	 * .column(
																	 * 5 )
																	 * .data()
																	 * .reduce(
																	 * function
																	 * (a, b) {
																	 * return
																	 * intVal(a) +
																	 * intVal(b); },
																	 * 0 );
																	 *  //
																	 * Update
																	 * footer $(
																	 * api.column(
																	 * 5
																	 * ).footer()
																	 * ).html(
																	 * 
																	 * 'Rs'+'
																	 * '+parseFloat(pageTotal).toFixed(2)
																	 *  );
																	 * console.log(
																	 * pageTotal);
																	 */

																},

																destroy : true,
																searching : true,
																"scrollY" : 300,
																"scrollX" : true,
																"paging" : false,

																columns : [
																		{
																			"data" : "expenseName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		/*
																		 * {"data":
																		 * "serviceProviderName",
																		 * "width":
																		 * "5%",
																		 * "defaultContent":
																		 * ""},
																		 */
																		{
																			"data" : "accountantName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "insertDate",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "credit",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "debit",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "paymentMode",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																/*
																 * {"data":
																 * "totalAmount" ,
																 * "width":
																 * "5%",
																 * "defaultContent":
																 * ""},
																 */

																],
																/*
																 * dom:
																 * 'Bfrtip',
																 * buttons: [
																 * 'copy',
																 * 'csv',
																 * 'excel',
																 * 'pdf',
																 * 'print' ]
																 */

																dom : 'Bfrtip',
																buttons : [
																		// 'print',

																		{
																			extend : 'print',
																			orientation : 'landscape',
																			title : 'Date Wise Expenditure Payment Reports \nDate = '
																					+ fDate,
																			footer : true,
																			pageSize : 'LEGAL'
																		},

																		{
																			extend : 'copyHtml5',
																			orientation : 'landscape',
																			title : 'Date Wise Expenditure Payment Reports \nDate = '
																					+ fDate,
																			footer : true,
																			pageSize : 'LEGAL'
																		},

																		{
																			extend : 'excelHtml5',
																			orientation : 'landscape',
																			title : 'Date Wise Expenditure Payment Reports \nDate = '
																					+ fDate,
																			messageTop : 'Date Wise Expenditure Payment Reports \nDate = '
																					+ fDate,
																			footer : true,
																			pageSize : 'LEGAL'
																		},

																		{
																			extend : 'csvHtml5',
																			orientation : 'landscape',
																			title : 'Date Wise Expenditure Payment Reports \nDate = '
																					+ fDate,
																			footer : true,
																			pageSize : 'LEGAL'
																		},

																		// {
																		// extend:
																		// 'copyHtml5',
																		// footer:
																		// true
																		// },
																		// {
																		// extend:
																		// 'excelHtml5',
																		// footer:
																		// true
																		// },
																		// {
																		// extend:
																		// 'csvHtml5',
																		// footer:
																		// true
																		// },

																		{
																			extend : 'pdfHtml5',
																			orientation : 'landscape',
																			title : 'Date Wise Expenditure Payment Reports \nDate = '
																					+ fDate,
																			footer : true,
																			pageSize : 'LEGAL'
																		} ]

															});
										});

						var mydata = catmap;
						$('#expenseSingleDatetable').dataTable().fnAddData(mydata);

					});

}

/** ********** Between Two Dates ************ */

function getExpensePaymentDetailsBetTwoDaysValidate() {
	var startDate = $("#fisDate4").val();
	var endDate = $("#endDate4").val();

	if (startDate != "") {
		if (endDate != "") {
			getExpensePaymentDetailsBetTwoDays()
		} else {
			var msg = "Please Enter end Date";
			var dialog = bootbox.dialog({
				message : '<p class="text-center">'
						+ msg.fontcolor("red").fontsize(5) + '</p>',
				closeButton : false
			});
			setTimeout(function() {
				dialog.modal('hide');
			}, 1500);
			return false;
		}
	} else {
		var msg = "Please Enter Start Date";
		var dialog = bootbox.dialog({
			message : '<p class="text-center">'
					+ msg.fontcolor("red").fontsize(5) + '</p>',
			closeButton : false
		});
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		return false;
	}
}

function getExpensePaymentDetailsBetTwoDays() {
	var params = {};
	var startDate = $("#fisDate4").val();
	var endDate = $("#endDate4").val();

	params["fisDate"] = startDate;
	params["endDate"] = endDate;
	params["methodName"] = "getExpenditurePaymentReportBetweenTwoDates";

	$
			.post(
					'/Shop/jsp/utility/controller.jsp',
					params,
					function(data) {
						// To clear Table
						$('#expenseBetweenTwoDates').dataTable().fnClearTable();

						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;

						if (catmap == null || catmap == "") {
							alert("Expenditure Payment Reports are Not Available for\nStart Date = "
									+ startDate + "\nEnd Date = " + endDate);
							return false;
						}

						$(document)
								.ready(
										function() {
											$('#expenseBetweenTwoDates')
													.DataTable(
															{
																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	pageTotal = api
																			.column(
																					3)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							3)
																					.footer())
																			.html(

																					'Rs'
																							+ ' '
																							+ parseFloat(
																									pageTotal)
																									.toFixed(
																											2)

																			);
																	console
																			.log(pageTotal);
																	pageTotal = api
																			.column(
																					4)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							4)
																					.footer())
																			.html(

																					'Rs'
																							+ ' '
																							+ parseFloat(
																									pageTotal)
																									.toFixed(
																											2)

																			);
																	/*
																	 * console.log(
																	 * pageTotal);
																	 * pageTotal =
																	 * api
																	 * .column(
																	 * 5 )
																	 * .data()
																	 * .reduce(
																	 * function
																	 * (a, b) {
																	 * return
																	 * intVal(a) +
																	 * intVal(b); },
																	 * 0 );
																	 *  //
																	 * Update
																	 * footer $(
																	 * api.column(
																	 * 5
																	 * ).footer()
																	 * ).html(
																	 * 
																	 * 'Rs'+'
																	 * '+parseFloat(pageTotal).toFixed(2)
																	 *  );
																	 * 
																	 */
																	console
																			.log(pageTotal);

																},

																destroy : true,
																searching : true,
																"scrollY" : 300,
																"scrollX" : true,
																"paging" : false,

																columns : [

																		{
																			"data" : "expenseName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		/*
																		 * {"data":
																		 * "serviceProviderName",
																		 * "width":
																		 * "5%",
																		 * "defaultContent":
																		 * ""},
																		 */
																		{
																			"data" : "accountantName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "insertDate",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "credit",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "debit",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "paymentMode",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																// {"data":
																// "totalAmount"
																// , "width":
																// "5%",
																// "defaultContent":
																// ""},

																],
																/*
																 * dom:
																 * 'Bfrtip',
																 * buttons: [
																 * 'copy',
																 * 'csv',
																 * 'excel',
																 * 'pdf',
																 * 'print' ]
																 */

																dom : 'Bfrtip',
																buttons : [
																		// 'print',

																		{
																			extend : 'print',
																			orientation : 'landscape',
																			title : 'Range Wise Expenditure Payment Reports\nStart Date = '
																					+ startDate
																					+ "\nEnd Date"
																					+ endDate,
																			footer : true,
																			pageSize : 'LEGAL',

																		},

																		{
																			extend : 'copyHtml5',
																			orientation : 'landscape',
																			title : 'Range Wise Expenditure Payment Reports\nStart Date = '
																					+ startDate
																					+ "\nEnd Date"
																					+ endDate,
																			footer : true,
																			pageSize : 'LEGAL'
																		},

																		{
																			extend : 'excelHtml5',
																			orientation : 'landscape',
																			title : 'Range Wise Expenditure Payment Reports\nStart Date = '
																					+ startDate
																					+ "\nEnd Date"
																					+ endDate,
																			messageTop : 'Range Wise Expenditure Payment Reports\nStart Date = '
																					+ startDate
																					+ "\nEnd Date"
																					+ endDate,
																			footer : true,
																			pageSize : 'LEGAL'
																		},

																		{
																			extend : 'csvHtml5',
																			orientation : 'landscape',
																			title : 'Range Wise Expenditure Payment Reports\nStart Date = '
																					+ startDate
																					+ "\nEnd Date"
																					+ endDate,
																			footer : true,
																			pageSize : 'LEGAL'
																		},

																		// {
																		// extend:
																		// 'copyHtml5',
																		// footer:
																		// true
																		// },
																		// {
																		// extend:
																		// 'excelHtml5',
																		// footer:
																		// true
																		// },
																		// {
																		// extend:
																		// 'csvHtml5',
																		// footer:
																		// true
																		// },

																		{
																			extend : 'pdfHtml5',
																			orientation : 'landscape',
																			title : 'Range Wise Expenditure Payment Reports\nStart Date = '
																					+ startDate
																					+ "\nEnd Date"
																					+ endDate,
																			footer : true,
																			pageSize : 'LEGAL',
																		} ]

															});
										});

						var mydata = catmap;
						$('#expenseBetweenTwoDates').dataTable().fnAddData(
								mydata);

					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});

}

function expenseReportAsPerExpenditureNameValidate() {
	var startDate = $("#firstDateForExpenseName").val();
	var endDate = $("#endDateForExpenseName").val();
	var expenseName = $("#expenseName").val();

	if (startDate != "") {
		if (endDate != "") {
			if (expenseName != "") {
				expenseReportAsPerExpenditureName();
			} else {
				var msg = "Please Enter Expenditure Date";
				var dialog = bootbox.dialog({
					message : '<p class="text-center">'
							+ msg.fontcolor("red").fontsize(5) + '</p>',
					closeButton : false
				});
				setTimeout(function() {
					dialog.modal('hide');
				}, 1500);
				return false;
			}
		} else {
			var msg = "Please Enter End Name";
			var dialog = bootbox.dialog({
				message : '<p class="text-center">'
						+ msg.fontcolor("red").fontsize(5) + '</p>',
				closeButton : false
			});
			setTimeout(function() {
				dialog.modal('hide');
			}, 1500);
			return false;
		}
	} else {
		var msg = "Please Enter Start Date";
		var dialog = bootbox.dialog({
			message : '<p class="text-center">'
					+ msg.fontcolor("red").fontsize(5) + '</p>',
			closeButton : false
		});
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		return false;
	}
}

function expenseReportAsPerExpenditureName() {

	var params = {};
	var startDate = $("#firstDateForExpenseName").val();
	var endDate = $("#endDateForExpenseName").val();
	var expenseName = $("#expenseName").val();

	var input = document.getElementById('expenseName'), 
	    list = document.getElementById('exp_drop'), i, expenseName;

	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			expenseName = list.options[i].getAttribute('data-value');
		}
	}

	params["expenseName"] = expenseName;
	params["fisDate"] = startDate;
	params["endDate"] = endDate;
	params["methodName"] = "getExpenditurePaymentReportBetweenTwoDatesAsPerExpName";

	$.post('/Shop/jsp/utility/controller.jsp',params,function(data) {
						// To clear Table
		               $('#expenseBetweenTwoDatesAsPerSelectedName').dataTable().fnClearTable();

						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;
						
						if (catmap == "" || catmap == null) {
							alert("No Expendiure Name Wise Expenditure Payment Reports \nStart date = "
									+ startDate
									+ "\nEnd Date = "
									+ endDate
									+ "\nExpenditure Name = " + expenseName);
							return false;
						}

						$(document).ready(function() {
							$('#expenseBetweenTwoDatesAsPerSelectedName')
							.DataTable(
									{
										fnRowCallback : function(
												nRow,
												aData,
												iDisplayIndex) {
											$(
													"th:first",
													nRow)
													.html(
															iDisplayIndex + 1);
											return nRow;
										},

										"footerCallback" : function(
												row,
												data,
												start,
												end,
												display) {
											var api = this
													.api(), data;

											// Remove
											// the
											// formatting
											// to get
											// integer
											// data for
											// summation
											var intVal = function(
													i) {
												return typeof i === 'string' ? i
														.replace(
																/[\$,]/g,
																'') * 1
														: typeof i === 'number' ? i
																: 0;
											};

											pageTotal = api
													.column(
															3)
													.data()
													.reduce(
															function(
																	a,
																	b) {
																return intVal(a)
																		+ intVal(b);
															},
															0);

											// Update
											// footer
											$(
													api
															.column(
																	3)
															.footer())
													.html(

															'Rs'
																	+ ' '
																	+ parseFloat(
																			pageTotal)
																			.toFixed(
																					2)

													);
											console
													.log(pageTotal);
											pageTotal = api
													.column(
															4)
													.data()
													.reduce(
															function(
																	a,
																	b) {
																return intVal(a)
																		+ intVal(b);
															},
															0);

											// Update
											// footer
											$(
													api
															.column(
																	4)
															.footer())
													.html(

															'Rs'
																	+ ' '
																	+ parseFloat(
																			pageTotal)
																			.toFixed(
																					2)

													);
											/*
											 * console.log(
											 * pageTotal);
											 * pageTotal =
											 * api
											 * .column(
											 * 5 )
											 * .data()
											 * .reduce(
											 * function
											 * (a, b) {
											 * return
											 * intVal(a) +
											 * intVal(b); },
											 * 0 );
											 *  //
											 * Update
											 * footer $(
											 * api.column(
											 * 5
											 * ).footer()
											 * ).html(
											 * 
											 * 'Rs'+'
											 * '+parseFloat(pageTotal).toFixed(2)
											 *  );
											 * 
											 */
											console
													.log(pageTotal);

										},

										destroy : true,
										searching : true,
										"scrollY" : 300,
										"scrollX" : true,
										"paging" : false,

										columns : [

												{
													"data" : "expenseName",
													"width" : "5%",
													"defaultContent" : ""
												},
												/*
												 * {"data":
												 * "serviceProviderName",
												 * "width":
												 * "5%",
												 * "defaultContent":
												 * ""},
												 */
												{
													"data" : "accountantName",
													"width" : "5%",
													"defaultContent" : ""
												},
												{
													"data" : "insertDate",
													"width" : "5%",
													"defaultContent" : ""
												},
												{
													"data" : "credit",
													"width" : "5%",
													"defaultContent" : ""
												},
												{
													"data" : "debit",
													"width" : "5%",
													"defaultContent" : ""
												},
												{
													"data" : "paymentMode",
													"width" : "5%",
													"defaultContent" : ""
												},
										// {"data":
										// "totalAmount"
										// , "width":
										// "5%",
										// "defaultContent":
										// ""},

										],
										/*
										 * dom:
										 * 'Bfrtip',
										 * buttons: [
										 * 'copy',
										 * 'csv',
										 * 'excel',
										 * 'pdf',
										 * 'print' ]
										 */

										dom : 'Bfrtip',
										buttons : [
												// 'print',

												{
													extend : 'print',
													orientation : 'landscape',
													title : 'Expenditure Name Wise Expenditure Payment Reports\nStart Date = '
															+ startDate
															+ "\nEnd Date"
															+ endDate
															+ "\nExpenditure Name = " 
															+ expenseName,
													footer : true,
													pageSize : 'LEGAL',

												},

												{
													extend : 'copyHtml5',
													orientation : 'landscape',
													title : 'Expenditure Name Wise Expenditure Payment Reports\nStart Date = '
															+ startDate
															+ "\nEnd Date"
															+ endDate
															+ "\nExpenditure Name = " 
															+ expenseName,
													footer : true,
													pageSize : 'LEGAL'
												},

												{
													extend : 'excelHtml5',
													orientation : 'landscape',
													title : 'Expenditure Name Wise Expenditure Payment Reports\nStart Date = '
															+ startDate
															+ "\nEnd Date"
															+ endDate
															+ "\nExpenditure Name = " 
															+ expenseName,
													messageTop : 'Expenditure Name Wise Expenditure Payment Reports\nStart Date = '
															+ startDate
															+ "\nEnd Date"
															+ endDate
															+ "\nExpenditure Name = " 
															+ expenseName,
													footer : true,
													pageSize : 'LEGAL'
												},

												{
													extend : 'csvHtml5',
													orientation : 'landscape',
													title : 'Expenditure Name Wise Expenditure Payment Reports\nStart Date = '
															+ startDate
															+ "\nEnd Date"
															+ endDate
															+ "\nExpenditure Name = " 
															+ expenseName,
													footer : true,
													pageSize : 'LEGAL'
												},

												{
													extend : 'pdfHtml5',
													orientation : 'landscape',
													title : 'Expenditure Name Wise Expenditure Payment Reports\nStart Date = '
															+ startDate
															+ "\nEnd Date"
															+ endDate
															+ "\nExpenditure Name = " 
															+ expenseName,
													footer : true,
													pageSize : 'LEGAL',
												} ]

									});
				});

						var mydata = catmap;
						$('#expenseBetweenTwoDatesAsPerSelectedName').dataTable().fnAddData(mydata);
			});

}
/* get taday credit and debit report */
function getTodayCreditDebitReport() {

	var params = {};

	params["methodName"] = "getTodayCreditDebitReport";

	$
			.post(
					'/Shop/jsp/utility/controller.jsp',
					params,
					function(data) {
						// To clear Table
						$('#example1').dataTable().fnClearTable();

						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;

						$(document)
								.ready(
										function() {
											$('#example1')
													.DataTable(
															{
																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	// Total
																	// over all
																	// pages
																	/*
																	 * total =
																	 * api
																	 * .column(
																	 * 6 )
																	 * .data()
																	 * .reduce(
																	 * function
																	 * (a, b) {
																	 * return
																	 * intVal(a) +
																	 * intVal(b); },
																	 * 0 );
																	 * console.log(total);
																	 */
																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					1)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							1)
																					.footer())
																			.html(

																					'Rs'
																							+ ' '
																							+ parseFloat(
																									pageTotal)
																									.toFixed(
																											2)

																			);
																	console
																			.log(pageTotal);

																	var abc = pageTotal;

																	document
																			.getElementById('creAmt').value = abc;

																},

																destroy : true,
																searching : false,

																columns : [

																		{
																			"data" : "name",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "credit",
																			"width" : "5%",
																			"defaultContent" : ""
																		},

																]
															});
										});

						var mydata = catmap;
						$('#example1').dataTable().fnAddData(mydata);

					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});

}

/* get taday credit and debit report */
function getTodayCreditDebitReport1() {

	var params = {};

	params["methodName"] = "getTodayCreditDebitReport1";

	$
			.post(
					'/Shop/jsp/utility/controller.jsp',
					params,
					function(data) {
						// To clear Table
						$('#example2').dataTable().fnClearTable();

						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;

						$(document)
								.ready(
										function() {
											$('#example2')
													.DataTable(
															{
																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	// Total
																	// over all
																	// pages
																	/*
																	 * total =
																	 * api
																	 * .column(
																	 * 6 )
																	 * .data()
																	 * .reduce(
																	 * function
																	 * (a, b) {
																	 * return
																	 * intVal(a) +
																	 * intVal(b); },
																	 * 0 );
																	 * console.log(total);
																	 */
																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					1)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							1)
																					.footer())
																			.html(

																					'Rs'
																							+ ' '
																							+ parseFloat(
																									pageTotal)
																									.toFixed(
																											2)

																			);
																	console
																			.log(pageTotal);

																	var xyz = pageTotal;

																	document
																			.getElementById('debAmt').value = xyz;

																},

																destroy : true,
																searching : false,

																columns : [
																		{
																			"data" : "name",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "debit",
																			"width" : "5%",
																			"defaultContent" : ""
																		},

																]
															});
										});

						var mydata = catmap;
						$('#example2').dataTable().fnAddData(mydata);

					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});

}

function customAlert(msg) {
	var msg = msg;
	var dialog = bootbox.dialog({
		message : '<p class="text-center">' + msg.fontcolor("red").fontsize(5)
				+ '</p>',
		closeButton : false
	});
	setTimeout(function() {
		dialog.modal('hide');
	}, 1500);
}

function customAlert(msg) {
	var msg = msg;
	var dialog = bootbox.dialog({
		message : '<p class="text-center">' + msg.fontcolor("red").fontsize(5)
				+ '</p>',
		closeButton : false
	});
	setTimeout(function() {
		dialog.modal('hide');
	}, 1500);
}

/* get taday credit and debit report */
function creditdebitForsingleDate() {

	var params = {};
	var fDate = $("#fDate").val();

	if (fDate == null || fDate == "") {
		msg = "Please Select Date";
		customAlert(msg);
		return false;
	}

	params["fDate"] = fDate;
	params["methodName"] = "creditdebitForsingleDate";

	$
			.post(
					'/Shop/jsp/utility/controller.jsp',
					params,
					function(data) {
						// To clear Table
						$('#example3').dataTable().fnClearTable();

						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;

						if (catmap == null || catmap == ""
								|| catmap == undefined) {
						}

						$(document)
								.ready(
										function() {
											$('#example3')
													.DataTable(
															{
																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	// Total
																	// over all
																	// pages
																	/*
																	 * total =
																	 * api
																	 * .column(
																	 * 6 )
																	 * .data()
																	 * .reduce(
																	 * function
																	 * (a, b) {
																	 * return
																	 * intVal(a) +
																	 * intVal(b); },
																	 * 0 );
																	 * console.log(total);
																	 */
																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					1)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							1)
																					.footer())
																			.html(

																					'Rs'
																							+ ' '
																							+ parseFloat(
																									pageTotal)
																									.toFixed(
																											2)

																			);
																	console
																			.log(pageTotal);
																},

																destroy : true,
																searching : false,

																columns : [

																		{
																			"data" : "name",
																			"width" : "5%"
																		},
																		{
																			"data" : "credit",
																			"width" : "5%"
																		},

																]
															});
										});

						if (catmap == null || catmap == ""
								|| catmap == undefined) {
						} else {
							var mydata = catmap;
						}

						$('#example3').dataTable().fnAddData(mydata);

					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});

}

/* get taday credit and debit report */
function creditdebitForsingleDate1() {

	var params = {};
	var fDate = $("#fDate").val();

	if (fDate == null || fDate == "") {
		return false;
	}

	params["fDate"] = fDate;
	params["methodName"] = "creditdebitForsingleDate1";

	$
			.post(
					'/Shop/jsp/utility/controller.jsp',
					params,
					function(data) {
						// To clear Table
						$('#example4').dataTable().fnClearTable();

						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;

						if (catmap == null || catmap == ""
								|| catmap == undefined) {
						}

						$(document)
								.ready(
										function() {
											$('#example4')
													.DataTable(
															{
																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	// Total
																	// over all
																	// pages
																	/*
																	 * total =
																	 * api
																	 * .column(
																	 * 6 )
																	 * .data()
																	 * .reduce(
																	 * function
																	 * (a, b) {
																	 * return
																	 * intVal(a) +
																	 * intVal(b); },
																	 * 0 );
																	 * console.log(total);
																	 */
																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					1)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							1)
																					.footer())
																			.html(

																					'Rs'
																							+ ' '
																							+ parseFloat(
																									pageTotal)
																									.toFixed(
																											2)

																			);
																	console
																			.log(pageTotal);

																},

																destroy : true,
																searching : false,

																columns : [

																		{
																			"data" : "name",
																			"width" : "5%"
																		},
																		{
																			"data" : "debit",
																			"width" : "5%"
																		},

																]
															});
										});

						if (catmap == null || catmap == ""
								|| catmap == undefined) {
						} else {
							var mydata = catmap;
						}

						$('#example4').dataTable().fnAddData(mydata);

					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});

}

function creditdebitForBetTowDate() {

	var params = {};
	var fisDate = $("#fisDate").val();
	var endDate = $("#endDate").val();

	if (fisDate == "" || fisDate == "") {
		msg = "Please Select First Date";
		customAlert(msg);
		return false;
	}

	if (endDate == "" || endDate == "") {
		msg = "Please Select First Date";
		customAlert(msg);
		return false;
	}

	params["fisDate"] = fisDate;
	params["endDate"] = endDate;

	params["methodName"] = "creditdebitForBetTowDate";

	$.post('/Shop/jsp/utility/controller.jsp',params,function(data) {
						// To clear Table
						$('#example5').dataTable().fnClearTable();

						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;

						if (catmap == null || catmap == ""
								|| catmap == undefined) {
						}

						$(document).ready(function() {$('#example5').DataTable(
															{
																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	// Total
																	// over all
																	// pages
																	/*
																	 * total =
																	 * api
																	 * .column(
																	 * 6 )
																	 * .data()
																	 * .reduce(
																	 * function
																	 * (a, b) {
																	 * return
																	 * intVal(a) +
																	 * intVal(b); },
																	 * 0 );
																	 * console.log(total);
																	 */
																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					1)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							1)
																					.footer())
																			.html(

																					'Rs'
																							+ ' '
																							+ parseFloat(
																									pageTotal)
																									.toFixed(
																											2)

																			);
																	console
																			.log(pageTotal);
																},

																destroy : true,
																searching : false,

																columns : [

																		{
																			"data" : "name",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "credit",
																			"width" : "5%",
																			"defaultContent" : ""
																		},

																]
															});
										});

						if (catmap == null || catmap == ""
								|| catmap == undefined) {
						}
						{
							var mydata = catmap;
						}

						$('#example5').dataTable().fnAddData(mydata);

					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});
}

/* get taday credit and debit report */
function creditdebitForBetTowDate1() {

	var params = {};
	var fisDate = $("#fisDate").val();
	var endDate = $("#endDate").val();

	if (fisDate == "" || fisDate == "") {
		return false;
	}

	if (endDate == "" || endDate == "") {
		return false;
	}

	params["fisDate"] = fisDate;
	params["endDate"] = endDate;
	params["methodName"] = "creditdebitForBetTowDate1";

	$.post('/Shop/jsp/utility/controller.jsp',
					params,
					function(data) {
						// To clear Table
						$('#example6').dataTable().fnClearTable();

						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;
						if (catmap == null || catmap == ""
								|| catmap == undefined) {
						}

						$(document)
								.ready(
										function() {
											$('#example6')
													.DataTable(
															{
																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	// Total
																	// over all
																	// pages
																	/*
																	 * total =
																	 * api
																	 * .column(
																	 * 6 )
																	 * .data()
																	 * .reduce(
																	 * function
																	 * (a, b) {
																	 * return
																	 * intVal(a) +
																	 * intVal(b); },
																	 * 0 );
																	 * console.log(total);
																	 */
																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					1)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							1)
																					.footer())
																			.html(

																					'Rs'
																							+ ' '
																							+ parseFloat(
																									pageTotal)
																									.toFixed(
																											2)

																			);
																	console
																			.log(pageTotal);
																},

																destroy : true,
																searching : false,

																columns : [

																		{
																			"data" : "name",
																			"width" : "5%"
																		},
																		{
																			"data" : "debit",
																			"width" : "5%"
																		},

																]
															});
										});

						if (catmap == null || catmap == ""
								|| catmap == undefined) {
						} else {
							var mydata = catmap;
						}

						$('#example6').dataTable().fnAddData(mydata);

					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});

}

function getYesterdarTotalAmount() {

	var params = {};

	params["methodName"] = "getYesterdarTotalAmount";

	$("#yesAmt").append($("<input/>").attr("value", "").text());
	$.post('/Shop/jsp/utility/controller.jsp', params, function(data) {
		var jsonData = $.parseJSON(data);
		// var jsonData = jsonData.list;
		$.each(jsonData, function(i, v) {
			document.getElementById("yesAmt").value = parseFloat(v.totalAmount)
					.toFixed(2);

		});
	})

}

function getTodaySaleTotalAmount() {

	var params = {};

	params["methodName"] = "getTodaySaleTotalAmount";

	$("#dupsaletotal").append($("<input/>").attr("value", "").text());
	$.post('/Shop/jsp/utility/controller.jsp', params, function(data) {
		var jsonData = $.parseJSON(data);
		// var jsonData = jsonData.list;
		$.each(jsonData, function(i, v) {
			document.getElementById("dupsaletotal").value = v.totalAmount;
			getTodaySaleTotalAmount1();

		});
	})

}

function getTodaySaleTotalAmount1() {

	var params = {};

	params["methodName"] = "getTodaySaleTotalAmount1";

	$("#dupsaletotal1").append($("<input/>").attr("value", "").text());
	$.post('/Shop/jsp/utility/controller.jsp', params, function(data) {
		var jsonData = $.parseJSON(data);
		// var jsonData = jsonData.list;
		$.each(jsonData, function(i, v) {
			document.getElementById("dupsaletotal1").value = v.totalAmount;
			var asd = document.getElementById("dupsaletotal").value;
			var grossSaleTotal = +asd + +v.totalAmount;
			document.getElementById("totsaleAmt").value = grossSaleTotal;

			shreeDemo();

		});
	})

}

function getEmployeeDetails() {
	var params = {};

	var input = document.getElementById('employee'), list = document
			.getElementById('emp_drop'), i, fkRootEmpId;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			fkRootEmpId = list.options[i].getAttribute('data-value');
		}
	}

	$("#salary").append($("<input/>").attr("value", "").text());

	params["EmpId"] = fkRootEmpId;

	params["methodName"] = "getEmployeeDetailsToEdit";

	$.post('/Shop/jsp/utility/controller.jsp', params, function(data) {

		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		$.each(jsonData, function(i, v) {
			document.getElementById("empPay").value = v.salary;
			document.getElementById("reason2").value = "Salary";
		});
	}).error(function(jqXHR, textStatus, errorThrown) {
		if (textStatus === "timeout") {

		}
	});
}

function shreeDemo() {

	var yesterdayAmt = document.getElementById("yesAmt").value;
	var todayCreditAmt = document.getElementById("creAmt").value;
	var todayDebitAmt = document.getElementById("debAmt").value;
	var todaySaleAmt = document.getElementById("totsaleAmt").value;

	var grossSaleTotal = (+yesterdayAmt + +todayDebitAmt + +todaySaleAmt)
			- (+todayCreditAmt);

	document.getElementById("remAmt").value = grossSaleTotal;
}


function addPartnerTransactionsV() 
{
	if (document.patnr.partnerName.value == "") {
		var msg = "Please Select Partner Name";
		var dialog = bootbox.dialog({
			message : '<p class="text-center">'
					+ msg.fontcolor("red").fontsize(5) + '</p>',
			closeButton : false
		});
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		return false;
	}
	
	/*if (document.patnr.accountantNamePT.value == "") {
		var msg = "Please Enter Accountant Name";
		var dialog = bootbox.dialog({
			message : '<p class="text-center">'
					+ msg.fontcolor("red").fontsize(5) + '</p>',
			closeButton : false
		});
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		return false;
	}*/
	if (document.patnr.creditAmtPT.value == "" && document.patnr.debitAmtPT.value == "") {
		var msg = "Please Enter Amount";
		var dialog = bootbox.dialog({
			message : '<p class="text-center">'
					+ msg.fontcolor("red").fontsize(5) + '</p>',
			closeButton : false
		});
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		return false;
	}
	addPartnerTransactions()
}

function addPartnerTransactions()
{
	/* document.exp.btn4.disabled = true; */
	document.getElementById('savePT').disabled = true;

	var input = document.getElementById('partnerName'), 
	list = document.getElementById('partner_drop'), i, fkRootPartnerId;
	for (i = 0; i < list.options.length; ++i)
	{
		if (list.options[i].value === input.value)
		{
			fkRootPartnerId = list.options[i].getAttribute('data-value');
		}
	}
	
	var partnerName = $("#partnerName").val();
	var creditAmtPT = $('#creditAmtPT').val();
	var debitAmtPT = $('#debitAmtPT').val();
	var paymentTypePT = $('#paymentTypePT').val();	
	var accountantNamePT = $("#accountantNamePT").val();

	var paymentMode = $('#paymentMode8').val();
	var chequeNum = $('#chequeNum8').val();
	var nameOnCheck = $('#nameOnCheck8').val();
	var bankName = $('#bankName8').val();
	var cardNum = $('#cardNum8').val();
	var accNum = $('#accNum8').val();
	var partDate = $('#partDate').val();
	
	if(accountantNamePT==undefined || accountantNamePT== null || accountantNamePT == "" )
	{
		accountantNamePT="NA";
	}
	
	if(paymentMode==undefined || paymentMode== null || paymentMode == "" )
	{
		paymentMode="NA";
	}
	if(chequeNum==undefined || chequeNum== null || chequeNum== "" )
	{
		chequeNum=0;
	}
	if(nameOnCheck==undefined || nameOnCheck== null || nameOnCheck == "" )
	{
		nameOnCheck="NA";
	}
	if(bankName==undefined || bankName== null || bankName == "" )
	{
		bankName="NA";
	}
	if(cardNum==undefined || cardNum== null || cardNum == "" )
	{
		cardNum=0;
	}
	if(accNum==undefined || accNum== null || accNum== "" )
	{
		accNum=0;
	}
	
	var params = {};

	params["fkRootPartnerId"] = fkRootPartnerId;
	params["paymentTypePT"] = paymentTypePT;
	params["creditAmtPT"] = creditAmtPT;
	params["debitAmtPT"] = debitAmtPT;
	params["accountantNamePT"] = accountantNamePT;
	params["partnerName"] = partnerName;
	params["paymentMode"] = paymentMode;
	params["chequeNum"] = chequeNum;
	params["nameOnCheck"] = nameOnCheck;
	params["bankName"] = bankName;
	params["cardNum"] = cardNum;
	params["accNum"] = accNum;
	params["partDate"] = partDate;
	
	params["methodName"] = "regPartnerCashBook";

	$.post('/Shop/jsp/utility/controller.jsp',
			params,
			function(data) {
					var msg = data;
					var dialog = bootbox.dialog({
						message : '<p class="text-center">'
								+ msg.fontcolor("green").fontsize(5) + '</p>',
						closeButton : false
					});

					setTimeout(function() {
						dialog.modal('hide');
						location.reload();
					}, 1500);
					document.getElementById('savePT').disabled = true;
				
				// document.exp.btn4.disabled =false;
			}).error(function(jqXHR, textStatus, errorThrown) {
		if (textStatus === "timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});
}


function partnerWiseReport()
{
	var params = {};
	
	var input = document.getElementById('partnersName'), 
	    list = document.getElementById('pt_drop'), i, partnerId;

	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			partnerId = list.options[i].getAttribute('data-value');
		}
	}

	params["partnerId"] = partnerId;
	params["methodName"] = "getPartnersTransactionAsPerExpName";

	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
			{
						// To clear Table
		$('#partnerWiseReportDataTable').dataTable().fnClearTable();

						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;

						if (catmap == "" || catmap == null)
						{
							var msg="Transaction is Not Available For this Partner Name";
							var dialog = bootbox.dialog({
						    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
						    closeButton: false
							});			
							setTimeout(function() {
								dialog.modal('hide');
							}, 1500);
							//alert("Select Partner Name");
							return false;
						}

						$(document)
								.ready(
										function() {
											$('#partnerWiseReportDataTable')
													.DataTable(
															{
																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	pageTotal = api
																			.column(2)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(api.column(2)
																					.footer())
																			.html(

																					'Rs'
																							+ ' '
																							+ parseFloat(
																									pageTotal)
																									.toFixed(
																											2)

																			);
																	console
																			.log(pageTotal);
																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(3)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(api.column(3)
																					.footer())
																			.html(

																					'Rs'
																							+ ' '
																							+ parseFloat(
																									pageTotal)
																									.toFixed(
																											2)

																			);
																	console
																	.log(pageTotal);
																},

																destroy : true,
																searching : true,
																"scrollY" : false,
																"scrollX" : false,
																"paging" : false,

																columns : [

																		{
																			"data" : "partnersName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "totalAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "creditPT",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "debitPT",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		
																		{
																			"data" : "insertDatePT",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "paymentMode",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																// {"data":
																// "totalAmount"
																// , "width":
																// "5%",
																// "defaultContent":
																// ""},

																],
																/*
																 * dom:
																 * 'Bfrtip',
																 * buttons: [
																 * 'copy',
																 * 'csv',
																 * 'excel',
																 * 'pdf',
																 * 'print' ]
																 */

																dom : 'Bfrtip',
																buttons : [
																		// 'print',

																		{
																			extend : 'print',
																			orientation : 'landscape',
																			title : "getPartnersTransactionAsPerExpName",
																			footer : true,
																			pageSize : 'LEGAL'
																		},
																		{
																			extend : 'copyHtml5',
																			orientation : 'landscape',
																			title : "getPartnersTransactionAsPerExpName",
																			footer : true,
																			pageSize : 'LEGAL'
																		},
																		{
																			extend : 'excelHtml5',
																			orientation : 'landscape',
																			title : "getPartnersTransactionAsPerExpName",
																			//messageTop : "",
																			footer : true,
																			pageSize : 'LEGAL'
																		},
																		{
																			extend : 'csvHtml5',
																			orientation : 'landscape',
																			title : "getPartnersTransactionAsPerExpName",
																			footer : true,
																			pageSize : 'LEGAL'
																		},
																		{
																			extend : 'pdfHtml5',
																			orientation : 'landscape',
																			title : "getPartnersTransactionAsPerExpName",
																			footer : true,
																			pageSize : 'LEGAL'
																		} ]

															});
										});

						var mydata = catmap;
						$('#partnerWiseReportDataTable').dataTable().fnAddData(mydata);

					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});
}
 
function getAllExpenseNameForPayment(){
	 
	var expenseType = $('#expensetype').val();
	
	$("#expenseName").empty();
	$("#expenseName").append($("<option></option>").attr("value","").text("Enter Expense Name"));
	
	var params = {};
	
	params["expenseType"] = expenseType;
	
	params["methodName"] = "getExpenseNameForPayment";

	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
	{
		var count = 1;
		
		var jsonData = $.parseJSON(data);
		//var jsonData = jsonData.list;
		$.each(jsonData,function(i,v)
		{
			$("#expenseName").append($("<option></option>").attr("value",v.pkExpenseDetailsId).text(v.expenseName)); 
	//		$("#billNo").append($("<option></option>").attr("value", i).text(v.billNo));
			count++;
				});
			}).error(function(jqXHR, textStatus, errorThrown){
				if(textStatus==="timeout") {

				}
			});
}

function expenseReportAsPerExpenditureTypeValidate() {
	
	var expenseType = $("#expenseType").val();

	if (expenseType == "") 
	{
		var msg = "Please Select Expenditure Type";
		var dialog = bootbox.dialog({
		message : '<p class="text-center">'
				+ msg.fontcolor("red").fontsize(5) + '</p>',
		closeButton : false
		});
		setTimeout(function() {
		dialog.modal('hide');
		}, 1500);
		return false;
	}
	expenseReportAsPerExpenditureType();
}

function expenseReportAsPerExpenditureType()
{	
	var expType = $("#expenseType").val();
	
	if(expType == "Direct"){
		var	expenseType = "direct";
	}else{
		var	expenseType = "indirect";
	}
	
	var params = {};
	
	params["expenseType"] = expenseType;
	
	params["methodName"] = "getExpenditurePaymentReportAsPerExpenditureType";

	$.post('/Shop/jsp/utility/controller.jsp',params,function(data) {
						// To clear Table
		               $('#expenseBetweenTypeTable').dataTable().fnClearTable();

						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;
						
						if (catmap == "" || catmap == null) {
							alert("No Expendiure Type Wise Expenditure Payment Reports \nExpenditure Type = "
									+ expenseType);
								return false;
						}

						$(document).ready(function() {
							$('#expenseBetweenTypeTable')
							.DataTable(
									{
										fnRowCallback : function(
												nRow,
												aData,
												iDisplayIndex) {
											$(
													"th:first",
													nRow)
													.html(
															iDisplayIndex + 1);
											return nRow;
										},

										"footerCallback" : function(
												row,
												data,
												start,
												end,
												display) {
											var api = this
													.api(), data;

											// Remove
											// the
											// formatting
											// to get
											// integer
											// data for
											// summation
											var intVal = function(
													i) {
												return typeof i === 'string' ? i
														.replace(
																/[\$,]/g,
																'') * 1
														: typeof i === 'number' ? i
																: 0;
											};

											pageTotal = api
													.column(
															3)
													.data()
													.reduce(
															function(
																	a,
																	b) {
																return intVal(a)
																		+ intVal(b);
															},
															0);

											// Update
											// footer
											$(
													api
															.column(
																	3)
															.footer())
													.html(

															'Rs'
																	+ ' '
																	+ parseFloat(
																			pageTotal)
																			.toFixed(
																					2)

													);
											console
													.log(pageTotal);
											pageTotal = api
													.column(
															4)
													.data()
													.reduce(
															function(
																	a,
																	b) {
																return intVal(a)
																		+ intVal(b);
															},
															0);

											// Update
											// footer
											$(
													api
															.column(
																	4)
															.footer())
													.html(

															'Rs'
																	+ ' '
																	+ parseFloat(
																			pageTotal)
																			.toFixed(
																					2)

													);
											/*
											 * console.log(
											 * pageTotal);
											 * pageTotal =
											 * api
											 * .column(
											 * 5 )
											 * .data()
											 * .reduce(
											 * function
											 * (a, b) {
											 * return
											 * intVal(a) +
											 * intVal(b); },
											 * 0 );
											 *  //
											 * Update
											 * footer $(
											 * api.column(
											 * 5
											 * ).footer()
											 * ).html(
											 * 
											 * 'Rs'+'
											 * '+parseFloat(pageTotal).toFixed(2)
											 *  );
											 * 
											 */
											console
													.log(pageTotal);

										},

										destroy : true,
										searching : true,
										"scrollY" : 300,
										"scrollX" : true,
										"paging" : false,

										columns : [

												{
													"data" : "expenseName",
													"width" : "5%",
													"defaultContent" : ""
												},
												/*
												 * {"data":
												 * "serviceProviderName",
												 * "width":
												 * "5%",
												 * "defaultContent":
												 * ""},
												 */
												{
													"data" : "accountantName",
													"width" : "5%",
													"defaultContent" : ""
												},
												{
													"data" : "insertDate",
													"width" : "5%",
													"defaultContent" : ""
												},
												{
													"data" : "credit",
													"width" : "5%",
													"defaultContent" : ""
												},
												{
													"data" : "debit",
													"width" : "5%",
													"defaultContent" : ""
												},
												{
													"data" : "paymentMode",
													"width" : "5%",
													"defaultContent" : ""
												},
										// {"data":
										// "totalAmount"
										// , "width":
										// "5%",
										// "defaultContent":
										// ""},

										],
										/*
										 * dom:
										 * 'Bfrtip',
										 * buttons: [
										 * 'copy',
										 * 'csv',
										 * 'excel',
										 * 'pdf',
										 * 'print' ]
										 */

										dom : 'Bfrtip',
										buttons : [
												// 'print',

												{
													extend : 'print',
													orientation : 'landscape',
													title : 'Expenditure Type Wise Expenditure Payment Reports\nExpenditure Type = '
															+ expenseType,
													footer : true,
													pageSize : 'LEGAL',

												},

												{
													extend : 'copyHtml5',
													orientation : 'landscape',
													title : 'Expenditure Type Wise Expenditure Payment Reports\nExpenditure Type = '
															+ expenseType,
													footer : true,
													pageSize : 'LEGAL'
												},

												{
													extend : 'excelHtml5',
													orientation : 'landscape',
													title : 'Expenditure Type Wise Expenditure Payment Reports\nExpenditure Type = '
															+ expenseType,															
													messageTop : 'Expenditure Type Wise Expenditure Payment Reports\nExpenditure Type = '
															+ expenseType,															
													footer : true,
													pageSize : 'LEGAL'
												},

												{
													extend : 'csvHtml5',
													orientation : 'landscape',
													title : 'Expenditure Type Wise Expenditure Payment Reports\nExpenditure Type = '
															+ expenseType,															
													footer : true,
													pageSize : 'LEGAL'
												},

												{
													extend : 'pdfHtml5',
													orientation : 'landscape',
													title : 'Expenditure Type Wise Expenditure Payment Reports\nExpenditure Type = '
															+ expenseType,															
													footer : true,
													pageSize : 'LEGAL',
												} ]

									});
				});

						var mydata = catmap;
						$('#expenseBetweenTypeTable').dataTable().fnAddData(mydata);
			});

}

function getBankAccNoandIFScode()
{		
	var input = document.getElementById('bankNameBT'),
		list = document.getElementById('bankBT_drop'),
			   i,bankNameDet;

	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			bankNameDet = list.options[i].getAttribute('data-value');
		}
	}
		
	var bankNameId = bankNameDet;
	
	$("#accNumber").empty();
	$("#accNumber").append($("<input/>").attr("value","").text());
	$("#ifscode").empty();
	$("#ifscode").append($("<input/>").attr("value","").text());
	
	var params= {};
	params["bankNameId"]= bankNameId;  
	
	params["methodName"] = "getBankAccountNumberAndIFSCcode";
	
	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
			{
		var jsonData = $.parseJSON(data);
		//var jsonData = jsonData.list;
		$.each(jsonData,function(i,v)
		{
			document.getElementById("accNumber").value = v.accountNo;
			document.getElementById("ifscode").value = v.ifscCode;
		});
		}).error(function(jqXHR, textStatus, errorThrown){
				if(textStatus==="timeout") {

				}
			});
}

function addBankTransactionsV() 
{
	var creditAmtBT = $("#creditAmtBT").val();
	var debitAmtBT = $("#debitAmtBT").val();
	
	if (document.bankTr.bankNameBT.value == "") {
		var msg = "Please Select Bank Name";
		var dialog = bootbox.dialog({
			message : '<p class="text-center">'
					+ msg.fontcolor("red").fontsize(5) + '</p>',
			closeButton : false
		});
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		return false;
	}
	
/*	if (document.bankTr.acctantName.value == "") {
		var msg = "Please Enter Accountant Name";
		var dialog = bootbox.dialog({
			message : '<p class="text-center">'
					+ msg.fontcolor("red").fontsize(5) + '</p>',
			closeButton : false
		});
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		return false;
	}*/
	
	if (creditAmtBT == "" && debitAmtBT == "") {
		
		var msg = "Please Enter Amount";
		var dialog = bootbox.dialog({
			message : '<p class="text-center">'
					+ msg.fontcolor("red").fontsize(5) + '</p>',
			closeButton : false
		});
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		return false;
	}
	addBankTransactions()
}
 
function addBankTransactions()
{	
	document.getElementById('saveBT').disabled = true;
	
	var input = document.getElementById('bankNameBT'), 
    list = document.getElementById('bankBT_drop'), 
           i, bankNameId;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			bankNameId = list.options[i].getAttribute('data-value');
		}
	}
	
    var bankNameBT = $("#bankNameBT").val();
	var bankTransDate = $('#bankTransDate').val();
	var accNumber = $('#accNumber').val();
	var ifscode = $('#ifscode').val();
	var acctantName = $('#acctantName').val();
	var contactNo = $('#contactNo').val();
	var creditAmtBT = $('#creditAmtBT').val();
	var debitAmtBT = $('#debitAmtBT').val();
	
	var paymentMode = $('#paymentMode9').val();
	var chequeNum = $('#chequeNum9').val();
	var nameOnCheck = $('#nameOnCheck9').val();
	var bankName = $('#bankName9').val();
	var cardNum = $('#cardNum9').val();
	var accNum = $('#accNum9').val();
	
	if(acctantName==undefined || acctantName== null || acctantName == "" )
	{
		acctantName="NA";
	}
	if(paymentMode==undefined || paymentMode== null || paymentMode == "" )
	{
		paymentMode="NA";
	}
	if(chequeNum==undefined || chequeNum== null || chequeNum== "" )
	{
		chequeNum=0;
	}
	if(nameOnCheck==undefined || nameOnCheck== null || nameOnCheck == "" )
	{
		nameOnCheck="NA";
	}
	if(bankName==undefined || bankName== null || bankName == "" )
	{
		bankName="NA";
	}
	if(cardNum==undefined || cardNum== null || cardNum == "" )
	{
		cardNum=0;
	}
	if(contactNo==undefined || contactNo== null || contactNo == "")
	{
		contactNo=0;
	}
	if(accNum==undefined || accNum== null || accNum== "" )
	{
		accNum=0;
	}
	
	var params = {};

	params["bankNameId"] = bankNameId;
	params["bankNameBT"] = bankNameBT;
	params["bankTransDate"] = bankTransDate;	
	params["accNumber"] = accNumber;
	params["ifscode"] = ifscode;
	params["acctantName"] = acctantName;
	params["contactNo"] = contactNo;
	params["creditAmtBT"] = creditAmtBT;
	params["debitAmtBT"] = debitAmtBT;
	
	params["paymentMode"] = paymentMode;
	params["chequeNum"] = chequeNum;
	params["nameOnCheck"] = nameOnCheck;
	params["bankName"] = bankName;
	params["cardNum"] = cardNum;
	params["accNum"] = accNum;
	
	/*regExpenseCashBook*/
	params["methodName"] = "addBankPaymentCashBook";

	$.post('/Shop/jsp/utility/controller.jsp',params,function(data) {
				if (document.exp) {
					var msg = data;
					var dialog = bootbox.dialog({
						message : '<p class="text-center">'
								+ msg.fontcolor("green").fontsize(5) + '</p>',
						closeButton : false
					});

					setTimeout(function() {
						dialog.modal('hide');
						location.reload();
					}, 1500);
					document.getElementById('saveBT').disabled = true;
				}
				// document.exp.btn4.disabled =false;
			}).error(function(jqXHR, textStatus, errorThrown) {
		if (textStatus === "timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});
}

function bankNameWiseReport1() {
	var bankName = $("#bankName").val();
	if (bankName != "") {
		bankNameWiseReport();
	} else {
		var msg = "Please Select Bank Name";
		var dialog = bootbox.dialog({
			message : '<p class="text-center">'
					+ msg.fontcolor("red").fontsize(5) + '</p>',
			closeButton : false
		});
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		return false;
	}
}

function bankNameWiseReport()
{
	var params = {};
	
	var input = document.getElementById('bankName'), 
	    list = document.getElementById('bank_drop'), 
	          i, bankId;

	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			bankId = list.options[i].getAttribute('data-value');
		}
	}

	params["bankId"] = bankId;
	
	params["methodName"] = "getBankTransactionAsPerbankName";

	$.post('/Shop/jsp/utility/controller.jsp',params,function(data)
			{
						// To clear Table
						$('#bankWiseReportDataTable').dataTable().fnClearTable();

						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;

						if (catmap == "" || catmap == null)
						{
							alert("No Data  Available for\nBank Name = "
									+ bankName);
							return false;
						}

						$(document)
								.ready(
										function() {
											$('#bankWiseReportDataTable')
													.DataTable(
															{
																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	pageTotal = api
																			.column(2)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(api.column(2)
																					.footer())
																			.html(

																					'Rs'
																							+ ' '
																							+ parseFloat(
																									pageTotal)
																									.toFixed(
																											2)

																			);
																	console
																			.log(pageTotal);
																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(3)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(api.column(3)
																					.footer())
																			.html(

																					'Rs'
																							+ ' '
																							+ parseFloat(
																									pageTotal)
																									.toFixed(
																											2)

																			);
																	console
																	.log(pageTotal);
																},

																destroy : true,
																searching : true,
																"scrollY" : true,
																"scrollX" : true,
																"paging" : false,

																columns : [

																		{
																			"data" : "bankName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "accountNumber",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "creditAmt",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "DebitAmt",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "paymentMode",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		
																		{
																			"data" : "reportDate",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																// {"data":
																// "totalAmount"
																// , "width":
																// "5%",
																// "defaultContent":
																// ""},

																],
																/*
																 * dom:
																 * 'Bfrtip',
																 * buttons: [
																 * 'copy',
																 * 'csv',
																 * 'excel',
																 * 'pdf',
																 * 'print' ]
																 */

																dom : 'Bfrtip',
																buttons : [
																		// 'print',

																		{
																			extend : 'print',
																			orientation : 'landscape',
																			title : "",
																			footer : true,
																			pageSize : 'LEGAL'
																		},
																		{
																			extend : 'copyHtml5',
																			orientation : 'landscape',
																			title : "",
																			footer : true,
																			pageSize : 'LEGAL'
																		},
																		{
																			extend : 'excelHtml5',
																			orientation : 'landscape',
																			title : "",
																			messageTop : "",
																			footer : true,
																			pageSize : 'LEGAL'
																		},
																		{
																			extend : 'csvHtml5',
																			orientation : 'landscape',
																			title : "",
																			footer : true,
																			pageSize : 'LEGAL'
																		},
																		{
																			extend : 'pdfHtml5',
																			orientation : 'landscape',
																			title : "",
																			footer : true,
																			pageSize : 'LEGAL'
																		} ]

															});
										});

						var mydata = catmap;
						$('#bankWiseReportDataTable').dataTable().fnAddData(mydata);

					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});
}

//

function getSupplierDetailspaymode() {
	var SupplierName = $("#paymentMode1").val();
	var StartDate = $("#payfisDate1").val();
	var EndDate = $("#payendDate1").val();

	if (SupplierName != "") {
		if (StartDate != "") {
			if (EndDate != "") {
				getSupplierDetailspaymode1();
			} else {
				var msg = "Please Enter End date";
				var dialog = bootbox.dialog({
					message : '<p class="text-center">'
							+ msg.fontcolor("red").fontsize(5) + '</p>',
					closeButton : false
				});
				setTimeout(function() {
					dialog.modal('hide');
				}, 1500);
				return false;
			}
		} else {
			var msg = "Please Enter Start date";
			var dialog = bootbox.dialog({
				message : '<p class="text-center">'
						+ msg.fontcolor("red").fontsize(5) + '</p>',
				closeButton : false
			});
			setTimeout(function() {
				dialog.modal('hide');
			}, 1500);
			return false;
		}
	} else {
		var msg = "Please Enter Payment Mode";
		var dialog = bootbox.dialog({
			message : '<p class="text-center">'
					+ msg.fontcolor("red").fontsize(5) + '</p>',
			closeButton : false
		});
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		return false;
	}
}

function getSupplierDetailspaymode1() {

	var paymentMode1 = $("#paymentMode1").val();

	var params = {};
	var startDate = $("#payfisDate1").val();
	var endDate = $("#payendDate1").val();



	params["fisDate"] = startDate;
	params["endDate"] = endDate;
	params["paymentMode"] = paymentMode1;

	params["methodName"] = "getSupplierPaymentmodeReport";

	$
			.post(
					'/Shop/jsp/utility/controller.jsp',
					params,
					function(data) {
						// To clear table
						$('#supplierpaymodetable').dataTable()
								.fnClearTable();

						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;

						if (catmap == null || catmap == "") {
							alert("Payment Mode Wise Supplier Payemnt Reports are Not Available for\nPayment Mode = "
									+ paymentMode1
									+ "\nStart Date = "
									+ startDate + "\nEnd Date " + endDate);
							return false;
						}

						$(document)
								.ready(
										function() {
											$('#supplierpaymodetable')
													.DataTable(
															{
																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	pageTotal = api
																			.column(
																					6)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							6)
																					.footer())
																			.html(
																					// 'Rs'+'
																					// '+pageTotal.toFixed(2)
																					str = pageTotal
																							.toFixed(0));
																	console
																			.log(pageTotal);

																	pageTotal = api
																			.column(
																					7)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	$(
																			api
																					.column(
																							7)
																					.footer())
																			.html(
																					// 'Rs'+'
																					// '+pageTotal.toFixed(2)
																					str = pageTotal
																							.toFixed(0));
																	console
																			.log(pageTotal);
																	
																},

																destroy : true,
																searching : true,
																"scrollY" : 300,
																"scrollX" : true,
																"paging" : false,

																columns : [

																		{
																			"data" : "supplierName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "bill",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "paymentMode",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "accountantName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "paymentDate",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "totalAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "creditAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "debitAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "balanceAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		}, ],
																dom : 'Bfrtip',
																buttons : [
																		// 'print',

																		{
																			extend : 'print',
																			orientation : 'landscape',
																			title : 'Payment mode Wise Supplier Payment Reports \nPayment mode = '
																					+ paymentMode1
																					+ "\nFrom "
																					+ startDate
																					+ " To "
																					+ endDate,
																			footer : true,
																			pageSize : 'LEGAL'
																		},

																		{
																			extend : 'copyHtml5',
																			orientation : 'landscape',
																			title : 'Payment mode Wise Supplier Payment Reports \nPayment mode = '
																					+ paymentMode1
																					+ "\nFrom "
																					+ startDate
																					+ " To "
																					+ endDate,
																			footer : true,
																			pageSize : 'LEGAL'
																		},

																		{
																			extend : 'excelHtml5',
																			orientation : 'landscape',
																			title : 'Payment mode Wise Supplier Payment Reports \nPayment mode = '
																					+ paymentMode1
																					+ "\nFrom "
																					+ startDate
																					+ " To "
																					+ endDate,
																			messageTop : 'Payment mode Wise Supplier Payment Reports \nPayment mode = '
																					+ paymentMode1
																					+ "\nFrom "
																					+ startDate
																					+ " To "
																					+ endDate,
																			footer : true,
																			pageSize : 'LEGAL'
																		},

																		{
																			extend : 'csvHtml5',
																			orientation : 'landscape',
																			title : 'Payment mode Wise Supplier Payment Reports \nPayment mode = '
																					+ paymentMode1
																					+ "\nFrom "
																					+ startDate
																					+ " To "
																					+ endDate,
																			footer : true,
																			pageSize : 'LEGAL'
																		},


																		{
																			extend : 'pdfHtml5',
																			orientation : 'landscape',
																			title : 'Payment mode Wise Supplier Payment Reports \nPayment mode = '
																					+ paymentMode1
																					+ "\nFrom "
																					+ startDate
																					+ " To "
																					+ endDate,
																			footer : true,
																			pageSize : 'LEGAL'
																		} ]

															});
										});

						var mydata = catmap;
						$('#supplierpaymodetable').dataTable()
								.fnAddData(mydata);

					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});

}


///empo


function getEmpPaymentmodeValidate() {
	var customerName = $("#paymentMode2").val();
	var startDate = $("#payfisDate2").val();
	var endDate = $("#payendDate2").val();

	if (customerName != "") {
		if (startDate != "") {
			if (endDate != "") {
				getEmpPaymentmodeValidate1();
			} else {
				var msg = "Please Enter End Date";
				var dialog = bootbox.dialog({
					message : '<p class="text-center">'
							+ msg.fontcolor("red").fontsize(5) + '</p>',
					closeButton : false
				});
				setTimeout(function() {
					dialog.modal('hide');
				}, 1500);
				return false;
			}
		} else {
			var msg = "Please Enter Start Date";
			var dialog = bootbox.dialog({
				message : '<p class="text-center">'
						+ msg.fontcolor("red").fontsize(5) + '</p>',
				closeButton : false
			});
			setTimeout(function() {
				dialog.modal('hide');
			}, 1500);
			return false;

		}
	} else {
		var msg = "Please select payment mode";
		var dialog = bootbox.dialog({
			message : '<p class="text-center">'
					+ msg.fontcolor("red").fontsize(5) + '</p>',
			closeButton : false
		});
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		return false;
	}

}

function getEmpPaymentmodeValidate1() {

	var params = {};

	var customerName = $("#paymentMode2").val();
	var startDate = $("#payfisDate2").val();
	var endDate = $("#payendDate2").val();


	params["fisDate"] = startDate;
	params["endDate"] = endDate;
	params["paymode"] = customerName;
	params["methodName"] = "getEmployeeReportpaymode";

	$
			.post(
					'/Shop/jsp/utility/controller.jsp',
					params,
					function(data) {
						// To clear table
						$('#emppaymodes').dataTable().fnClearTable();

						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;

						if (catmap == null || catmap == "") {
							alert("Employee payment Reports are Not Available for\nPayment mode = "
									+ customerName
									+ "\nStart Date = "
									+ startDate + "\nEnd Date = " + endDate);
							return false;
						}

						$(document)
								.ready(
										function() {
											$('#emppaymodes')
													.DataTable(
															{
																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					6)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							6)
																					.footer())
																			.html(
																					// 'Rs'+'
																					// '+pageTotal.toFixed(2)
																					str = pageTotal
																							.toFixed(0));
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					7)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							7)
																					.footer())
																			.html(
																					// 'Rs'+'
																					// '+pageTotal.toFixed(2)
																					str = pageTotal
																							.toFixed(0));
																	console
																			.log(pageTotal);
																	// Total
																	// over this
																	// page

																},

																destroy : true,
																searching : true,
																"scrollY" : 300,
																"scrollX" : true,
																"paging" : false,

																columns : [

																		{
																			"data" : "firstName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "lastName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "insertDate",
																			"width" : "5%"
																		},
																		{
																			"data" : "paymentMode",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "accountantName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "reason",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "creditPaymentAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "debitPaymentAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		}, ],
																/*
																 * dom:
																 * 'Bfrtip',
																 * buttons: [
																 * 'copy',
																 * 'csv',
																 * 'excel',
																 * 'pdf',
																 * 'print' ]
																 */
																dom : 'Bfrtip',
																buttons : [
																		// 'print',

																		{
																			extend : 'print',
																			orientation : 'landscape',
																			title : 'Payment mode Wise Supplier Payment Reports \npayment mode = '
																					+ customerName
																					+ "\nFrom "
																					+ startDate
																					+ " To "
																					+ endDate,
																			footer : true,
																			pageSize : 'LEGAL'
																		},

																		{
																			extend : 'copyHtml5',
																			orientation : 'landscape',
																			title : 'Payment mode Wise Supplier Payment Reports \npayment mode = '
																					+ customerName
																					+ "\nFrom "
																					+ startDate
																					+ " To "
																					+ endDate,
																			footer : true,
																			pageSize : 'LEGAL'
																		},

																		{
																			extend : 'excelHtml5',
																			orientation : 'landscape',
																			title : 'Payment mode Wise Supplier Payment Reports \npayment mode = '
																					+ customerName
																					+ "\nFrom "
																					+ startDate
																					+ " To "
																					+ endDate,
																			messageTop : 'Payment mode Wise Supplier Payment Reports \npayment mode = '
																					+ customerName
																					+ "\nFrom "
																					+ startDate
																					+ " To "
																					+ endDate,
																			footer : true,
																			pageSize : 'LEGAL'
																		},

																		{
																			extend : 'csvHtml5',
																			orientation : 'landscape',
																			title : 'Payment mode Wise Supplier Payment Reports \npayment mode = '
																					+ customerName
																					+ "\nFrom "
																					+ startDate
																					+ " To "
																					+ endDate,
																			footer : true,
																			pageSize : 'LEGAL'
																		},

																		// {
																		// extend:
																		// 'copyHtml5',
																		// footer:
																		// true
																		// },
																		// {
																		// extend:
																		// 'excelHtml5',
																		// footer:
																		// true
																		// },
																		// {
																		// extend:
																		// 'csvHtml5',
																		// footer:
																		// true
																		// },

																		{
																			extend : 'pdfHtml5',
																			orientation : 'landscape',
																			title : 'Payment mode Wise Supplier Payment Reports \npayment mode = '
																					+ customerName
																					+ "\nFrom "
																					+ startDate
																					+ " To "
																					+ endDate,
																			footer : true,
																			pageSize : 'LEGAL'
																		} ]

															});
										});

						var mydata = catmap;
						$('#emppaymodes').dataTable().fnAddData(mydata);

					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});

}

//


function expensePaymentReportpaymode() {

	
	
	var customerName = $("#paymentMode3").val();
	var startDate = $("#payfisDate3").val();
	var endDate = $("#payendDate3").val();

	if (customerName != "") {
		if (startDate != "") {
			if (endDate != "") {
				expensePaymentReportpaymode1();
			} else {
				var msg = "Please Enter End Date";
				var dialog = bootbox.dialog({
					message : '<p class="text-center">'
							+ msg.fontcolor("red").fontsize(5) + '</p>',
					closeButton : false
				});
				setTimeout(function() {
					dialog.modal('hide');
				}, 1500);
				return false;
			}
		} else {
			var msg = "Please Enter Start Date";
			var dialog = bootbox.dialog({
				message : '<p class="text-center">'
						+ msg.fontcolor("red").fontsize(5) + '</p>',
				closeButton : false
			});
			setTimeout(function() {
				dialog.modal('hide');
			}, 1500);
			return false;

		}
	} else {
		var msg = "Please select payment mode";
		var dialog = bootbox.dialog({
			message : '<p class="text-center">'
					+ msg.fontcolor("red").fontsize(5) + '</p>',
			closeButton : false
		});
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		return false;
	}
}

function expensePaymentReportpaymode1() {

	var params = {};
	var paymode = $("#paymentMode3").val();
	var startDate = $("#payfisDate3").val();
	var endDate = $("#payendDate3").val();
	
	
	params["paymode"] = paymode;
	params["startDate"] = startDate;
	params["endDate"] = endDate;
	
	params["methodName"] = "getExpensePaymentmode";

	$.post('/Shop/jsp/utility/controller.jsp',params,function(data) {
						// To clear table
						$('#expensepaymode').dataTable().fnClearTable();

						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;

						if (catmap == null || catmap == "") {
							alert("Expenditure Reports are Not Available ");
							return false;
						}

						$(document)
								.ready(
										function() {
											var total = $(
													'#expensepaymode')
													.DataTable(
															{

																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};
																	pageTotal = api
																			.column(
																					3)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							3)
																					.footer())
																			.html(

																					'Rs'
																							+ ' '
																							+ parseFloat(
																									pageTotal)
																									.toFixed(
																											2)

																			);
																	console
																			.log(pageTotal);
																	pageTotal = api
																			.column(
																					4)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							4)
																					.footer())
																			.html(

																					'Rs'
																							+ ' '
																							+ parseFloat(
																									pageTotal)
																									.toFixed(
																											2)

																			);

																	/*
																	 * console.log(
																	 * pageTotal);
																	 * pageTotal =
																	 * api
																	 * .column(
																	 * 5 )
																	 * .data()
																	 * .reduce(
																	 * function
																	 * (a, b) {
																	 * return
																	 * intVal(a) +
																	 * intVal(b); },
																	 * 0 );
																	 *  //
																	 * Update
																	 * footer $(
																	 * api.column(
																	 * 5
																	 * ).footer()
																	 * ).html(
																	 * 
																	 * 'Rs'+'
																	 * '+parseFloat(pageTotal).toFixed(2)
																	 *  );
																	 * console.log(
																	 * pageTotal);
																	 */

																},

																destroy : true,
																searching : true,
																"scrollY" : 300,
																"scrollX" : true,
																"paging" : false,

																columns : [
																		{
																			"data" : "expenseName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		/*
																		 * {"data":
																		 * "serviceProviderName",
																		 * "width":
																		 * "5%",
																		 * "defaultContent":
																		 * ""},
																		 */
																		{
																			"data" : "accountantName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "insertDate",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "credit",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "debit",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "paymentMode",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																/*
																 * {"data":
																 * "totalAmount" ,
																 * "width":
																 * "5%",
																 * "defaultContent":
																 * ""},
																 */

																],
																/*
																 * dom:
																 * 'Bfrtip',
																 * buttons: [
																 * 'copy',
																 * 'csv',
																 * 'excel',
																 * 'pdf',
																 * 'print' ]
																 */

																dom : 'Bfrtip',
																buttons : [
																		// 'print',

																		{
																			extend : 'print',
																			orientation : 'landscape',
																			title : 'Date Wise Expenditure Payment Reports \nDate = '
																					+ fDate,
																			footer : true,
																			pageSize : 'LEGAL'
																		},

																		{
																			extend : 'copyHtml5',
																			orientation : 'landscape',
																			title : 'Date Wise Expenditure Payment Reports \nDate = '
																					+ fDate,
																			footer : true,
																			pageSize : 'LEGAL'
																		},

																		{
																			extend : 'excelHtml5',
																			orientation : 'landscape',
																			title : 'Date Wise Expenditure Payment Reports \nDate = '
																					+ fDate,
																			messageTop : 'Date Wise Expenditure Payment Reports \nDate = '
																					+ fDate,
																			footer : true,
																			pageSize : 'LEGAL'
																		},

																		{
																			extend : 'csvHtml5',
																			orientation : 'landscape',
																			title : 'Date Wise Expenditure Payment Reports \nDate = '
																					+ fDate,
																			footer : true,
																			pageSize : 'LEGAL'
																		},

															
																		{
																			extend : 'pdfHtml5',
																			orientation : 'landscape',
																			title : 'Date Wise Expenditure Payment Reports \nDate = '
																					+ fDate,
																			footer : true,
																			pageSize : 'LEGAL'
																		} ]

															});
										});

						var mydata = catmap;
						$('#expensepaymode').dataTable().fnAddData(mydata);

					});

}