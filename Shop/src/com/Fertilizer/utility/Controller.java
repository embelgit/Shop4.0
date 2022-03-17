package com.Fertilizer.utility;

import java.awt.Event;
import java.io.IOException;
import java.io.PrintWriter;
import java.math.BigDecimal;
import java.text.ParseException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSessionEvent;

import com.Fertilizer.bean.CustomerBean;
import com.Fertilizer.helper.AccessControlHelper;
import com.Fertilizer.helper.AdvanceBookingHelper;
import com.Fertilizer.helper.AuthenticationHelper;
import com.Fertilizer.helper.BankDetailsHelper;
import com.Fertilizer.helper.BankPaymentHelper;
import com.Fertilizer.helper.CategoryDetailsHelper;
import com.Fertilizer.helper.CreditnoteGenHelper;
import com.Fertilizer.helper.CustomerDetailsHelper;
import com.Fertilizer.helper.CustomerPaymentHelper;
import com.Fertilizer.helper.DailySaleHelper;
import com.Fertilizer.helper.EditGoodsReceiveHelper;
import com.Fertilizer.helper.EmployeeDetailsHelper;
import com.Fertilizer.helper.EmployeePaymentHelper;
import com.Fertilizer.helper.ExpenditureDetailsHelper;
import com.Fertilizer.helper.ExpenditurePaymentHelper;
import com.Fertilizer.helper.ExpenseDetailForBillingAndGoodsReceiveHelper;
import com.Fertilizer.helper.FertilizerBillHelper;
import com.Fertilizer.helper.GodownDetailsHelper;
import com.Fertilizer.helper.GoodsReceiveHelper;
import com.Fertilizer.helper.ItemStockHelper;
import com.Fertilizer.helper.LoginController;
import com.Fertilizer.helper.LogoutController;
import com.Fertilizer.helper.MeasuringUnitsHelper;
import com.Fertilizer.helper.PartnerTransactionHelper;
import com.Fertilizer.helper.PesticideBillHelper;
import com.Fertilizer.helper.ProductDetailsHelper;
import com.Fertilizer.helper.PurchaseOrderHelper;
import com.Fertilizer.helper.PurchaseReturnHelper;
import com.Fertilizer.helper.QuotationBillHelper;
import com.Fertilizer.helper.SaleReturnHelper;
import com.Fertilizer.helper.SaleReturnReportHelper;
import com.Fertilizer.helper.SeedPesticideBillHelper;
import com.Fertilizer.helper.SupplierAccountDetailsHelper;
import com.Fertilizer.helper.SupplierCashBankHelper;
import com.Fertilizer.helper.SupplierDetailsHelper;
import com.Fertilizer.helper.TaxCreationHelper;
import com.Fertilizer.helper.UpdateDcNumberHelper;
import com.Fertilizer.helper.UserDetailsHelper;
import com.Fertilizer.helper.challanHelper;
import com.Fertilizer.helper.partnerDetailsHelper;
import com.Fertilizer.helper.productTransferHelper;
import com.Fertilizer.helper.shopDetailHelper;
import com.Fertilizer.hibernate.FertilizerBillBean;
import com.Fertilizer.hibernate.GoodsReceiveBean;
import com.Fertilizer.helper.GoodsReceiveHelper;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public class Controller {

	private String toJson(Object data) {
		Gson gson = new GsonBuilder().setPrettyPrinting().disableHtmlEscaping()
				.create();
		return gson.toJson(data);
	}

	// For login
	public String login(HttpServletRequest request, HttpServletResponse response )
			throws IOException {
		LoginController helper = new LoginController();
		helper.loginUser(request, response);
		return toJson("Data Added Successsfully");
	}

	//get All Shop Name For Login
		public String getAllShopNameForLogin(HttpServletRequest request, HttpServletResponse response) 
		{
			AuthenticationHelper helper=new AuthenticationHelper();
			Map items = helper.getShopNameForLogin(request,response);
			String xyz = toJson(items);
			System.out.println("In controller == =  =  " + xyz);
			return xyz;
		}
	
	// For language
	public String language(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		LoginController helper = new LoginController();
		helper.language(request, response);
		return toJson("Data Added Successsfully");
	}

	// for logout
	public String logout(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		LogoutController helper = new LogoutController();
		helper.logoutUser(request, response);
		return toJson("Data Added Successsfully");
	}
	
	//Access Control Data
	public String getUserDetailsToAccessControl(HttpServletRequest request,
			HttpServletResponse response) {
		
		AccessControlHelper helper =new AccessControlHelper();
		Map map = helper.getUserDetailsForAccessControl(request,response);
		String xyz = toJson(map);
		System.out.println(xyz);
		System.out.println("going out of controller");
		return xyz;
	}
	
	//Add Access Control Details
	public String AddAccessControl(HttpServletRequest request,
		HttpServletResponse response) {
		System.out.println("IN CONTROLLER");
		AccessControlHelper helper=new AccessControlHelper();
		helper.AccessControlDetails(request, response);
		return toJson("Data Added Successfully");
	}

	// Register Employee Details
	public String regDetails(HttpServletRequest request,
			HttpServletResponse response) {
		EmployeeDetailsHelper edh = new EmployeeDetailsHelper();
		boolean b = edh.employeeDetails(request, response);
		if(b){
			return toJson("Data Added Successfully");
		}else{
			return toJson("Data is not added successfully !");
		}	
	}

	// Register Customer Details
	public String customerDetails(HttpServletRequest request,
			HttpServletResponse response) {
		System.out.println("IN CONTROLLER");
		CustomerDetailsHelper cdh = new CustomerDetailsHelper();
		cdh.customerDetails(request, response);
		return toJson("Data Added Successfully");
	}
	
	public String cashcustomerDetails(HttpServletRequest request,
			HttpServletResponse response) {
		System.out.println("IN CONTROLLER");
		CustomerDetailsHelper cdh = new CustomerDetailsHelper();
		cdh.cashcustomerDetails(request, response);
		return toJson("Data Added Successfully");
	}

	// Register Measuring Units
	public String measuringUnits(HttpServletRequest request,
			HttpServletResponse response) {
		System.out.println("IN CONTROLLER");
		MeasuringUnitsHelper mdh = new MeasuringUnitsHelper();
		mdh.unitDetails(request, response);
		return toJson("Data Added Successfully");
	}

	// Register Supplier Details
	public String supplierDetails(HttpServletRequest request,
			HttpServletResponse response) {
		System.out.println("IN CONTROLLER");
		SupplierDetailsHelper sdh = new SupplierDetailsHelper();
		sdh.supplierDetails(request, response);
		return toJson("Data Added Successfully");
	}

	// Register Expense Details
	public String addExpenseDetails(HttpServletRequest request,
			HttpServletResponse response) {
		System.out.println("IN CONTROLLER");
		ExpenditureDetailsHelper exdh = new ExpenditureDetailsHelper();
		exdh.expenseDetails(request, response);
		return toJson("Data Added Successfully");
	}

	// Register Expense Details for billing
	public String addExpenseDetailsForBilling(HttpServletRequest request,
			HttpServletResponse response) {
		System.out.println("IN CONTROLLER");
		ExpenseDetailForBillingAndGoodsReceiveHelper exdh = new ExpenseDetailForBillingAndGoodsReceiveHelper();
		exdh.expenseDetails(request, response);
		return toJson("Data Added Successfully");
	}

	// Register New Tax
	public String taxCreation(HttpServletRequest request,
			HttpServletResponse response) {
		System.out.println("IN CONTROLLER");
		TaxCreationHelper tch = new TaxCreationHelper();
		tch.taxCreationDetails(request, response);
		return toJson("Data Added Successfully");

	}

	// Register User Details
	public String regUserDetails(HttpServletRequest request,
			HttpServletResponse response) {
		System.out.println("IN CONTROLLER");
		UserDetailsHelper udh = new UserDetailsHelper();
		udh.userDetails(request, response);
		return toJson("Data Added Successfully");
	}

	// Register product details
	public String proDetails(HttpServletRequest request, HttpServletResponse response) 
	{
		System.out.println("IN CONTROLLER --------------------------");
		ProductDetailsHelper pdh = new ProductDetailsHelper();
		pdh.productDetails(request, response);
		return toJson("Data Added Successfully");
	}

	// Register Category details
	public String categoryDetails(HttpServletRequest request,
			HttpServletResponse response) {
		System.out.println("IN CONTROLLER");
		CategoryDetailsHelper catdh = new CategoryDetailsHelper();
		catdh.catDetails(request, response);
		return toJson("Data Added Successfully");
	}
	
	// Register Category details by RK
		public String subCategoryDetails(HttpServletRequest request,
				HttpServletResponse response) {
			
			System.out.println("IN CONTROLLER");
			CategoryDetailsHelper catdh = new CategoryDetailsHelper();
			catdh.subCatDetails(request, response);
			return toJson("Data Added Successfully");
		}
		
		//shop details by RK
		public String shopDetails(HttpServletRequest request,
				HttpServletResponse response) {
			
			System.out.println("IN CONTROLLER");
			shopDetailHelper sdh = new shopDetailHelper();
			sdh.shopDetails(request, response);
			return toJson("Data Added Successfully");
		}
		
	  ////search list in buy sale report//////////////
	 /* public String getAllStudentList(HttpServletRequest request,
	 * HttpServletResponse response) { StudentDetailsHelper helper = new
	 * StudentDetailsHelper(); List categories = helper.getAllStudent(request,
	 * response); Map<String, List> returnMap = new HashMap<String, List>();
	 * returnMap.put("list", categories); return toJson(returnMap); } */
	 
	// Register Supplier Account details
	public String suppAccountDetails(HttpServletRequest request,
			HttpServletResponse response) {
		System.out.println("IN CONTROLLER");
		SupplierAccountDetailsHelper sadh = new SupplierAccountDetailsHelper();
		sadh.suppAccDetails(request, response);
		return toJson("Data Added Successfully");
	}

	//get purchae return total from purchase return table
		public String getpurchaseRetunTotal(HttpServletRequest request,
				HttpServletResponse response) {

			PurchaseReturnHelper helper=new PurchaseReturnHelper();
			Map map = helper.getPurchaseReturnTotalAmount(request,response);
			String xyz = toJson(map);
			System.out.println(xyz);
			return xyz;
		}
	
	/* Add Godown Details */
	public String godownDetailsFir(HttpServletRequest request,
			HttpServletResponse response) {
		System.out.println("IN CONTROLLER");
		GodownDetailsHelper catdh = new GodownDetailsHelper();
		catdh.godownDetail(request, response);
		return toJson("Data Added Successfully");
	}
    //fetch supplier data for credit note conversion
	public String getAllBillBySuppliersforCreditConver(HttpServletRequest request,
			HttpServletResponse response) {
		
		System.out.println("IN CONTROLLER");
	
		SupplierAccountDetailsHelper helper = new SupplierAccountDetailsHelper();
		Map map = helper.getAllBillBySuppliersforCreditConver(request);
		String xyz = toJson(map);
		System.out.println(xyz);
		return xyz;
	}
	
	// fetching Bill number as per Supplier Name in Supplier Payment from
	// Supplier Account details
	public String getAllBillBySuppliers(HttpServletRequest request,
			HttpServletResponse response) {
		
		System.out.println("IN CONTROLLER");
		
		SupplierAccountDetailsHelper helper = new SupplierAccountDetailsHelper();
		Map map = helper.getAllBillBySuppliers(request);
		String xyz = toJson(map);
		System.out.println(xyz);
		return xyz;
	}
	
	// fetching Bill number as per Customer Name in Customer Payment from
	public String getAllBillByCustomerSaleReturn(HttpServletRequest request,
			HttpServletResponse response) {
		String customerId = request.getParameter("customerName");

		FertilizerBillHelper helper = new FertilizerBillHelper();
		Map map = helper.getAllBillByCustomerSaleReturn(customerId);
		String xyz = toJson(map);
		System.out.println(xyz);
		return xyz;
	}
	
	public String getAllBillBySuppliersForReports(HttpServletRequest request,
			HttpServletResponse response) {
		String supplierId = request.getParameter("supplier");

		SupplierAccountDetailsHelper helper = new SupplierAccountDetailsHelper();
		Map map = helper.getAllBillBySuppliersForReportsHelper(supplierId);
		String xyz = toJson(map);
		System.out.println(xyz);
		return xyz;
	}
	

	// fetching Bill number as per customer Name in customer Payment
	public String getAllBillByCustomer(HttpServletRequest request,
			HttpServletResponse response) {
		String fkCustomerId = request.getParameter("creditCustomer");
		String catId = request.getParameter("cat");
		CustomerDetailsHelper helper = new CustomerDetailsHelper();
		Map map = helper.getAllBillByCustomers(fkCustomerId,catId);
		String xyz = toJson(map);
		System.out.println(xyz);
		return xyz;
	}
	
	
	// fetching Bill number as per customer Name in customer Payment
		public String getAllBillByCustomerForReports(HttpServletRequest request,
				HttpServletResponse response) {
			String fkCustomerId = request.getParameter("creditCustomer");
			String catId = request.getParameter("cat");
			CustomerDetailsHelper helper = new CustomerDetailsHelper();
			Map map = helper.getAllBillByCustomersForReports(fkCustomerId,catId);
			String xyz = toJson(map);
			System.out.println(xyz);
			return xyz;
		}
		
	// Getting Total amount as per Bill number in Customer Payment from
	// fertilizer bill table
	public String getTotalAmtByBillNoForCreditCustomer(
			HttpServletRequest request, HttpServletResponse response) {
		String billNo = request.getParameter("billNo1");
		String catId = request.getParameter("cat");
		String creditCustomer = request.getParameter("creditCustomer");
		CustomerDetailsHelper helper = new CustomerDetailsHelper();
		Map map = helper.getTotalAmtByBillNo(billNo,catId,creditCustomer);
		String xyz = toJson(map);
		System.out.println(xyz);
		return xyz;
	}

	// fetching balance amount as per Bill number in Customer Payment from
	// Customer Payment table
	public String getBalanceAmtByBillNoForCreditCustomer(
			HttpServletRequest request, HttpServletResponse response) {
		System.out.println("In controller balance");
		String billNo = request.getParameter("billNo1");
		String catId = request.getParameter("cat");
		String creditCustomer = request.getParameter("creditCustomer");
		CustomerDetailsHelper helper = new CustomerDetailsHelper();
		Map map = helper.getBalanceAmtByBillNo(billNo,creditCustomer,catId);
		String xyz = toJson(map);
		System.out.println(xyz);
		return xyz;
	}

	// fetching product name as per Supplier Name in purchase order details from
	// product details
	public String getAllProductBySuppliers(HttpServletRequest request,
			HttpServletResponse response) {
		String supplierId = request.getParameter("supplier");

		ProductDetailsHelper helper = new ProductDetailsHelper();
		Map map = helper.getAllProduct(supplierId);
		String xyz = toJson(map);
		System.out.println(xyz);
		return xyz;
	}

	// Getting Total amount as per Bill number in Supplier Payment from goods
	// receive table
	public String getTotalAmtByBillNo(HttpServletRequest request,
			HttpServletResponse response) {
		String billNo = request.getParameter("billNo");
		String supplierId = request.getParameter("supplier");
		SupplierAccountDetailsHelper helper = new SupplierAccountDetailsHelper();
		Map map = helper.getTotalAmtByBillNo(billNo, supplierId);
		String xyz = toJson(map);
		System.out.println(xyz);
		return xyz;
	}

	// Getting Remaining balance amount as per Bill number in Supplier Payment
	// from Supplier Payment details table
	public String getBalanceAmtByBillNo(HttpServletRequest request,
			HttpServletResponse response) {
		String billNo = request.getParameter("billNo");
		String supplier = request.getParameter("supplier");
		String totalAmount = request.getParameter("totalAmount");
		SupplierAccountDetailsHelper helper = new SupplierAccountDetailsHelper();
		Map map = helper.getRemainingAmtByBillNo(billNo, supplier, totalAmount);
		String xyz = toJson(map);
		System.out.println(xyz);
		return xyz;
	}

	// Registering Supplier Payment
	public String regSupCashBook(HttpServletRequest request,
			HttpServletResponse response) {
		System.out.println("In controller");
		SupplierCashBankHelper helper = new SupplierCashBankHelper();
		helper.regSupplierCashBank(request, response);
		return toJson("Data Added Successfully");
	}

	// Registering Credit Customer Payment
	public String regCreditCustCashBook(HttpServletRequest request,HttpServletResponse response)
	{
		System.out.println("In controller");
		CustomerPaymentHelper helper = new CustomerPaymentHelper();
		helper.regCreditCustomerCashBank(request, response);
		return toJson("Data Added Successfully");
	}

	// Registering Employee Payment
	public String regEmpCashBook(HttpServletRequest request,
			HttpServletResponse response) {
		System.out.println("IN CONTROLLER");
		EmployeePaymentHelper helper = new EmployeePaymentHelper();
		helper.regEmployeePayment(request, response);
		return toJson("Data Added Successfully");
	}
     
///////Adding purchase return data in database/////////////
	
	
	public String PurchaseReturn(HttpServletRequest request,
			HttpServletResponse response) throws ParseException {
		System.out.println("IN CONTROLLER");
		PurchaseReturnHelper helper = new PurchaseReturnHelper();
		helper.insertPurchaseReturn(request, response);
		return toJson("Data Added Successfully");
	}
	
	// Add Entry in Credit note conversion table
		public String insertCreditNoteConversion(HttpServletRequest request,
				HttpServletResponse response) throws ParseException {
			System.out.println("IN CONTROLLER");
			PurchaseReturnHelper helper = new PurchaseReturnHelper();
			helper.insertCreditNoteConversion(request, response);
			return toJson("Data Added Successfully");
		}

	
	// To Purchase Return
	public String returntPurchase(HttpServletRequest request,
			HttpServletResponse response) {
		System.out.println("IN CONTROLLER");
		GoodsReceiveHelper helper = new GoodsReceiveHelper();
		helper.returntPurchase(request, response);
		return toJson("Data UpDated Successfully");
	}

	// To Purchase returntMinusFromStockPurchase
	public String returntMinusFromStockPurchase(HttpServletRequest request,
			HttpServletResponse response) {
		System.out.println("IN CONTROLLER");
		GoodsReceiveHelper helper = new GoodsReceiveHelper();
		helper.returntMinusFromStockPurchase(request, response);
		return toJson("Data UpDated Successfully");
	}

	// Registering Expenditure Payment
	public String regExpenseCashBook(HttpServletRequest request,
			HttpServletResponse response) {
		System.out.println("IN CONTROLLER");
		ExpenditurePaymentHelper helper = new ExpenditurePaymentHelper();
		helper.regExpensePayment(request, response);
		return toJson("Data Added Successfully");
	}

	// Get product detail for goods recive
	public String getProductDetailsPO(HttpServletRequest request,
			HttpServletResponse response) {
		String productId = request.getParameter("productId");
		ProductDetailsHelper helper = new ProductDetailsHelper();
		Map items = helper.getProductDetailsForPO(productId);
		String xyz = toJson(items);
		System.out.println(xyz);
		return xyz;
	}

	// Get product detail for advance booking
	/*
	 * public String getProductDetailsForAdvanceBook(HttpServletRequest request,
	 * HttpServletResponse response) {
	 * 
	 * String proName = request.getParameter("proName");
	 * 
	 * ProductDetailsHelper helper = new ProductDetailsHelper(); Map items =
	 * helper.getProductDetailsForAdvanceBooking(proName); String xyz =
	 * toJson(items); System.out.println(xyz); return xyz; }
	 */

	// Get previous product detail for goods recive
	public String getpreviousDetsil(HttpServletRequest request,
			HttpServletResponse response) {
		String productId = request.getParameter("productId");
		ProductDetailsHelper helper = new ProductDetailsHelper();
		Map items = helper.getpreviousDetsil(productId);
		String xyz = toJson(items);
		System.out.println(xyz);
		return xyz;
	}

	// Get advance booked product detail for goods receive
	public String getbookedProductDetailsForGoodsReceive(
			HttpServletRequest request, HttpServletResponse response) {
		String productId = request.getParameter("productId");
		String category = request.getParameter("fk_cat_id");
		String supplier = request.getParameter("fk_sup_id");
		ProductDetailsHelper helper = new ProductDetailsHelper();
		Map items = helper.getBookedProductDetails(productId, supplier,
				category);
		String xyz = toJson(items);
		System.out.println(xyz);
		return xyz;
	}

	// Get advance booked product detail for goods receive new
	public String getbookedProductDetailsForGoodsReceiveNew(
			HttpServletRequest request, HttpServletResponse response) {
		String proName = request.getParameter("proName");
		String company = request.getParameter("company");
		String weight = request.getParameter("weight");
		String category = request.getParameter("fk_cat_id");
		String supplier = request.getParameter("fk_sup_id");
		ProductDetailsHelper helper = new ProductDetailsHelper();
		Map items = helper.getBookedProductDetailsNew(proName, supplier,
				category, company, weight);
		String xyz = toJson(items);
		System.out.println(xyz);
		return xyz;
	}

	// Get advance booked product detail for goods receive with tax from
	// purchase order table
	public String getProductDetailsForGoodsReceiveForBookedWithTax(
			HttpServletRequest request, HttpServletResponse response) {
		String productId = request.getParameter("productId");
		String category = request.getParameter("fk_cat_id");
		String supplier = request.getParameter("fk_sup_id");
		ProductDetailsHelper helper = new ProductDetailsHelper();
		Map items = helper.getBookedProductDetailsWithTax(productId, supplier,
				category);
		String xyz = toJson(items);
		System.out.println(xyz);
		return xyz;
	}

	// Get advance booked product detail for goods receive with tax from
	// purchase order table
	public String getProductDetailsForGoodsReceiveForBookedWithTaxNew(
			HttpServletRequest request, HttpServletResponse response) {
		String proName = request.getParameter("proName");
		String company = request.getParameter("company");
		String weight = request.getParameter("weight");

		String category = request.getParameter("fk_cat_id");
		String supplier = request.getParameter("fk_sup_id");
		ProductDetailsHelper helper = new ProductDetailsHelper();
		Map items = helper.getBookedProductDetailsWithTax(proName, supplier, category, company, weight);
		String xyz = toJson(items);
		System.out.println(xyz);
		return xyz;
	}
	
	// Get all purchase by bill no on credit note conversion
		public String getAllIetmBySupplierForCreditNoteConversion(HttpServletRequest request,
				HttpServletResponse response) {
			
			System.out.println("IN CONTROLLER");
						
			GoodsReceiveHelper helper = new GoodsReceiveHelper();
			Map items = helper.getAllIetmBySupplierForCreditNoteConversion(request);
			
			String xyz = toJson(items);
			System.out.println(xyz);
			return xyz;
		}

	// Get all purchase by bill no on purchase return form
	public String getAllIetmByBillNo(HttpServletRequest request,
			HttpServletResponse response) {
		
		System.out.println("IN CONTROLLER");
		
		GoodsReceiveHelper helper = new GoodsReceiveHelper();
		Map items = helper.getAllIetmByBillNo(request);
		String xyz = toJson(items);
		System.out.println(xyz);
		return xyz;
	}
	
	// Get product detail for goods receive for tax
	public String getProductDetailsForGoodsReceiveForTax(HttpServletRequest request, HttpServletResponse response)
	{		
		System.out.println("IN CONTROLLER");
						
		ProductDetailsHelper helper = new ProductDetailsHelper();
		Map items = helper.getProductDetailsForGoodsReceiveForTax(request);
		String xyz = toJson(items);
		System.out.println("Value of map item which we have sent to Json "+xyz);
		return xyz;
	}
	//
	public String getProductDetailstx(HttpServletRequest request, HttpServletResponse response)
	{		
		System.out.println("IN CONTROLLER");
						
		ProductDetailsHelper helper = new ProductDetailsHelper();
		Map items = helper.getProducttx(request);
		String xyz = toJson(items);
		System.out.println("Value of map item which we have sent to Json  "+xyz);
		return xyz;
	}
	//
	public String getProductstock(HttpServletRequest request, HttpServletResponse response)
	{		
		System.out.println("IN CONTROLLER");
						
		ProductDetailsHelper helper = new ProductDetailsHelper();
		Map items = helper.getProductstock(request);
		String xyz = toJson(items);
		System.out.println("Value of map item which we have sent to Json  "+xyz);
		return xyz;
	}
	
	// Get product detail for advance booking
		public String getProductDetailsForAdvanceBooking(
				HttpServletRequest request, HttpServletResponse response) {
								
			ProductDetailsHelper helper = new ProductDetailsHelper();
			Map items = helper.getProductDetailsForAdvanceBooking1(request);
			String xyz = toJson(items);
			System.out.println("Value of map item which we have sent to Json "+xyz);
			return xyz;
		}

	// To fetch project details as per product id
	public String getProductDetailsforbill(HttpServletRequest request,
			HttpServletResponse response) {
		String productId = request.getParameter("productId");
		ProductDetailsHelper helper = new ProductDetailsHelper();
		Map items = helper.getProductDetailsforbill(productId);
		String xyz = toJson(items);
		System.out.println(xyz);
		return xyz;
	}

	// Controller For SeedAND Pestiside GetProductDetails Batch No
	public String getProductDetailsforseedANdPestisidebill(
			HttpServletRequest request, HttpServletResponse response) {
		String productId = request.getParameter("productId");
		ProductDetailsHelper helper = new ProductDetailsHelper();
		Map items = helper.getProductDetailsforseedANdPestisidebill(productId);
		String xyz = toJson(items);
		System.out.println(xyz);
		return xyz;
	}

	// To get seed and pesticide batch number As per Barcode
	public String getBatchNumforseedANdPestisidebillByBarcode(
			HttpServletRequest request, HttpServletResponse response) {
		String barcode = request.getParameter("barcode");
		ProductDetailsHelper helper = new ProductDetailsHelper();
		Map items = helper
				.getProductDetailsforseedANdPestisidebillAsPerBarcode(barcode);
		String xyz = toJson(items);
		System.out.println(xyz);
		return xyz;
	}

	// get all product details as per category and supplier
	public String getAllProductByCategories(HttpServletRequest request,
			HttpServletResponse response) {
		String category = request.getParameter("fk_cat_id");
		ProductDetailsHelper helper = new ProductDetailsHelper();
		Map items = helper.getAllProductByCatAndBySup(category);
		String xyz = toJson(items);
		System.out.println("In controller == =  =" + xyz);
		return xyz;
	}

	// get all product details as per category for advance booking
	public String getAllProductByCategoriesForAdvance(
			HttpServletRequest request, HttpServletResponse response) {
		String category = request.getParameter("fk_cat_id");
		ProductDetailsHelper helper = new ProductDetailsHelper();
		Map items = helper.getAllProductByCatForadvance(category);
		String xyz = toJson(items);
		System.out.println("In controller == =  =" + xyz);
		return xyz;
	}
//
	public String getAllPoForAdvance(
			HttpServletRequest request, HttpServletResponse response) {
		String category = request.getParameter("fk_cat_id");
		ProductDetailsHelper helper = new ProductDetailsHelper();
		Map items = helper.getAllPo(category);
		String xyz = toJson(items);
		System.out.println("In controller == =  =" + xyz);
		return xyz;
	}
	
	// get all product details as per category and supplier for Advance booked
	// goods receive
	public String getAllProductByCategoriesAndBySupplierForBookedGoodsReceive(
			HttpServletRequest request, HttpServletResponse response) {
		String category = request.getParameter("fk_cat_id");
		String supplier = request.getParameter("fk_sup_id");
		ProductDetailsHelper helper = new ProductDetailsHelper();
		Map items = helper.getAllProductByCatAndBySupForGoodsReceive(category,
				supplier);
		String xyz = toJson(items);
		System.out.println(xyz);
		return xyz;
	}

	// get all product details as per category and supplier for Advance booked
	// goods receive new
	public String getAllProductByCategoriesAndBySupplierForBookedGoodsReceiveNew(
			HttpServletRequest request, HttpServletResponse response) {
		String category = request.getParameter("fk_cat_id");
		String supplier = request.getParameter("fk_sup_id");
		ProductDetailsHelper helper = new ProductDetailsHelper();
		Map items = helper.getAllProductByCatAndBySupForGoodsReceiveNew(
				category, supplier);
		String xyz = toJson(items);
		System.out.println(xyz);
		return xyz;
	}

	// Register purchase order details
	public String addPurchaseOrderDetails(HttpServletRequest request,
			HttpServletResponse response) {
		System.out.println("IN CONTROLLER");
		PurchaseOrderHelper poh = new PurchaseOrderHelper();
		poh.pODetails(request, response);
		return toJson("Data Added Successfully");
	}

	// Get PO detail for Update DC Number
	public String getPurchaseOrderDetails(HttpServletRequest request,
			HttpServletResponse response) {
		System.out.println("In Controller");
		String poNumber = request.getParameter("poNumber");
		PurchaseOrderHelper helper = new PurchaseOrderHelper();
		Map items = helper.getPODetailsForDcUpdate(poNumber);
		String xyz = toJson(items);
		System.out.println(xyz);
		return xyz;
	}

	// Update DC number
	public String updateDCNumber(HttpServletRequest request,
			HttpServletResponse response) {
		System.out.println("IN CONTROLLER");
		UpdateDcNumberHelper helper = new UpdateDcNumberHelper();
		helper.updateDC(request, response);
		return toJson("Data Added Successfully");
	}

	// fetching Dc Number as per Supplier Name in goodsReceive
	public String getAllDcNumberBySupplierForGoodsReceive(
			HttpServletRequest request, HttpServletResponse response) {
		String supplierId = request.getParameter("supplier");

		GoodsReceiveHelper helper = new GoodsReceiveHelper();
		Map map = helper.getAllDcNumbers(supplierId);
		String xyz = toJson(map);
		System.out.println(xyz);
		return xyz;
	}

	// Get PO detail for Goods Receive
	public String getPODetailsForGoodsReceive(HttpServletRequest request,
			HttpServletResponse response) {
		System.out.println("In Controller");
		String dcNum = request.getParameter("dcNum");
		String supplier = request.getParameter("supplier");
		GoodsReceiveHelper helper = new GoodsReceiveHelper();
		Map items = helper.getPODetails(dcNum, supplier);
		String xyz = toJson(items);
		items.put("offer", xyz);
		System.out.println(xyz);
		return xyz;
	}

	// Adding Goods Receive
	public String addingGoodsReceive(HttpServletRequest request,
			HttpServletResponse response) throws ParseException {
		System.out.println("IN CONTROLLER");
		GoodsReceiveHelper helper = new GoodsReceiveHelper();
		helper.goodsReceived(request, response);
		return toJson("Data Added Successfully");
	}
	//
	public String addingproductTx(HttpServletRequest request,
			HttpServletResponse response) throws ParseException {
		System.out.println("IN CONTROLLER");
		productTransferHelper helper = new productTransferHelper();
		helper.addproducttx(request, response);
		return toJson("Data Added Successfully");
	}
	//
	public String addpacking(HttpServletRequest request,
			HttpServletResponse response) throws ParseException {
		System.out.println("IN CONTROLLER");
		productTransferHelper helper = new productTransferHelper();
		helper.addpacking(request, response);
		return toJson("Data Added Successfully");
	}
	
	// Adding Advance Booking
		public String addingAdvanceBooking(HttpServletRequest request,
				HttpServletResponse response) throws ParseException {
			System.out.println("IN CONTROLLER");
			AdvanceBookingHelper helper = new AdvanceBookingHelper();
			helper.advacnesBooking(request, response);
			return toJson("Data Added Successfully");
		}

	// Getting village/city as per customer in credit customer bill from
	// customer details table
	public String getVillageNameAndContactNoAndFirstNameByCustomer(HttpServletRequest request, HttpServletResponse response) {
		
		System.out.println("IN CONTROLLER");
		
		CustomerDetailsHelper helper = new CustomerDetailsHelper();
		Map map = helper.getVillage(request);
		String xyz = toJson(map);
		System.out.println(xyz);
		return xyz;
	}
	
public String getVillageNameAndContactNoAndFirstNameByCustomer1(HttpServletRequest request, HttpServletResponse response) {
		
		System.out.println("IN CONTROLLER");
		
		CustomerDetailsHelper helper = new CustomerDetailsHelper();
		Map map = helper.getVillage1(request);
		String xyz = toJson(map);
		System.out.println(xyz);
		return xyz;
	}

	//sub category drop down
	public String getSubCategoryDetails(HttpServletRequest request,
			HttpServletResponse response) {
		System.out.println("IN CONTROLLER");
		
		ProductDetailsHelper catdh = new ProductDetailsHelper();
		Map map=catdh.getSubCatDetails(request);
		String xyz = toJson(map);
		System.out.println(xyz);
		return xyz;
	}

	//
	public String getbillcopybill(HttpServletRequest request,HttpServletResponse response) {
		System.out.println("IN CONTROLLER getting bills");
		
		ProductDetailsHelper catdh = new ProductDetailsHelper();
		Map map=catdh.getbillDetails(request);
		String xyz = toJson(map);
		System.out.println(xyz);
		return xyz;
	}
	
	//
	public String getbillcopycreditbill(HttpServletRequest request,HttpServletResponse response) {
		System.out.println("IN CONTROLLER getting bills");
		
		ProductDetailsHelper catdh = new ProductDetailsHelper();
		Map map=catdh.getcreditbillDetails(request);
		String xyz = toJson(map);
		System.out.println(xyz);
		return xyz;
	}
	
	//sub shop name drop down
	public String getShopDetails(HttpServletRequest request,
			HttpServletResponse response) {
		System.out.println("IN CONTROLLER");
		shopDetailHelper sndh = new shopDetailHelper();
		Map map=sndh.getShopDetails();
		String xyz = toJson(map);
		System.out.println(xyz);
		return xyz;
	}
	
	//sub category drop down
	public String getSubCategoryDetails1(HttpServletRequest request,
			HttpServletResponse response) {
		System.out.println("IN CONTROLLER");
		
		GoodsReceiveHelper catdh = new GoodsReceiveHelper();
		Map map=catdh.getSubCatDetails(request);
		
		String xyz = toJson(map);
		System.out.println(xyz);
		return xyz;
	}
	
	public String getProductNameDetails(HttpServletRequest request, HttpServletResponse response) {
		
		System.out.println("IN CONTROLLER");
		System.out.println("IN product detail CONTROLLER");
		
		GoodsReceiveHelper pndh = new GoodsReceiveHelper();
		Map map=pndh.getProNameDetails(request);
		String xyz = toJson(map);
		System.out.println(xyz);
		return xyz;
	}

	/*
	 * //Adding fertilizer bill public String
	 * addingFertilizerBill(HttpServletRequest request , HttpServletResponse
	 * response) throws ParseException { System.out.println("IN CONTROLLER");
	 * FertilizerBillHelper helper = new FertilizerBillHelper();
	 * helper.fertilizerBill(request, response); return
	 * toJson("Data Added Successfully"); }
	 */
	/*
	 * public String addingCreditCustomerFertilizerBill(HttpServletRequest
	 * request , HttpServletResponse response) throws ParseException {
	 * System.out.println("IN CONTROLLER"); FertilizerBillHelper helper = new
	 * FertilizerBillHelper(); helper.fertilizerBillForCreditCustomer(request,
	 * response); return toJson("Data Added Successfully"); }
	 */

	// to fetch project detail as per batch no.
	public String getProductDetailsByBatchNo(HttpServletRequest request,
			HttpServletResponse response) {
		String batchNo = request.getParameter("batchNo");
		System.out.println(batchNo + "In Controller");
		ProductDetailsHelper helper = new ProductDetailsHelper();
		Map items = helper.getProductDetailsByBatchNo(batchNo);
		String xyz = toJson(items);
		System.out.println(xyz);
		return xyz;
	}

	// current stock report
	public String getAllCurrentStockReport(HttpServletRequest request,
			HttpServletResponse response) {
		ItemStockHelper helper = new ItemStockHelper();
		List stockList = helper.getCurrentStockBYColor();

		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", stockList);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);

	}

	// sale report between two days
	public String getSaleReportBetweenTwoDates(HttpServletRequest request,
			HttpServletResponse response) {
		FertilizerBillHelper helper = new FertilizerBillHelper();
		List categories = helper.getSaleDetailsBYDate(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	// sale details as per single date
	public String getSaleDetailsBYSingalDate(HttpServletRequest request,
			HttpServletResponse response) {
		FertilizerBillHelper helper = new FertilizerBillHelper();
		List categories = helper.getSaleDetailsBYSingalDate(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	// Credit Customer payment as per single date
	public String getCreditCustPaymentDetailsForSingleDate(
			HttpServletRequest request, HttpServletResponse response) {
		CustomerPaymentHelper helper = new CustomerPaymentHelper();
		List categories = helper.getCustPaymentDetailsBySingleDate(request,
				response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	// Credit Customer payment as per bill number
	public String getCreditCustPaymentDetailsForBillNo(
			HttpServletRequest request, HttpServletResponse response) {
		CustomerPaymentHelper helper = new CustomerPaymentHelper();
		List categories = helper.getCustPaymentDetailsByBill(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	// Credit Customer payment as per Name
	public String getCustomerReportByName(HttpServletRequest request,
			HttpServletResponse response) {
		CustomerPaymentHelper helper = new CustomerPaymentHelper();
		List categories = helper
				.getCustPaymentDetailsByNames(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	// Credit Customer payment report between two days
	public String getCustomerReportBetweenTwoDates(HttpServletRequest request,
			HttpServletResponse response) {
		CustomerPaymentHelper helper = new CustomerPaymentHelper();
		List categories = helper.getCustDetailsByDate(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}
//
	
	public String getpayReportBetweenTwoDates(HttpServletRequest request,
			HttpServletResponse response) {
		CustomerPaymentHelper helper = new CustomerPaymentHelper();
		List categories = helper.getpayDetailsByDate(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}
	
	// Supplier payment as per single date
	public String getSupplierPaymentDetailsForSingleDate(
			HttpServletRequest request, HttpServletResponse response) {
		SupplierCashBankHelper helper = new SupplierCashBankHelper();
		List categories = helper.getSupplierPaymentDetailsBySingleDate(request,
				response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	// Supplier payment as per bill number
	public String getSupplierPaymentDetailsAsPerBillNumber(
			HttpServletRequest request, HttpServletResponse response) {
		SupplierCashBankHelper helper = new SupplierCashBankHelper();
		List categories = helper.getSupplierPaymentDetailsByBillNumber(request,
				response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	// Supplier payment as per name
	public String getSupplierPaymentDetailsAsPerName(
			HttpServletRequest request, HttpServletResponse response) {
		SupplierCashBankHelper helper = new SupplierCashBankHelper();
		List categories = helper.getSupplierPaymentDetailsByNames(request,
				response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	// Supplier payment report between two days
	public String getSupplierPaymentReportBetweenTwoDates(
			HttpServletRequest request, HttpServletResponse response) {
		SupplierCashBankHelper helper = new SupplierCashBankHelper();
		List categories = helper.getSupplierPaymentByTwoDate(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}
//
	public String getSupplierPaymentmodeReport(
			HttpServletRequest request, HttpServletResponse response) {
		SupplierCashBankHelper helper = new SupplierCashBankHelper();
		List categories = helper.getSupplierPaymentmode(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}
	
	
	// Employee payment as per single date
	public String getEmpPaymentDetailsForSingleDate(HttpServletRequest request,
			HttpServletResponse response) {
		EmployeePaymentHelper helper = new EmployeePaymentHelper();
		List categories = helper.getEmployeePaymentDetailsForSingleDate(
				request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	// Employee payment report between two days
	public String getEmployeeReportBetweenTwoDates(HttpServletRequest request,
			HttpServletResponse response) {
		EmployeePaymentHelper helper = new EmployeePaymentHelper();
		List categories = helper.getEmpPaymentByTwoDate(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	//
	public String getEmployeeReportpaymode(HttpServletRequest request,
			HttpServletResponse response) {
		EmployeePaymentHelper helper = new EmployeePaymentHelper();
		List categories = helper.getEmpPaymentmode(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}
	
	
	// Expenditure payment report as per single date
	public String getExpensePaymentDetailsForSingleDate(
			HttpServletRequest request, HttpServletResponse response) {
		ExpenditurePaymentHelper helper = new ExpenditurePaymentHelper();
		List categories = helper.getExpensePaymentDetailsForSingleDate(request,
				response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}
//
	public String getExpensePaymentmode(
			HttpServletRequest request, HttpServletResponse response) {
		ExpenditurePaymentHelper helper = new ExpenditurePaymentHelper();
		List categories = helper.getExpensePaymentmode(request,
				response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}
	
	
	// Expenditure payment report between two days
	public String getExpenditurePaymentReportBetweenTwoDates(
			HttpServletRequest request, HttpServletResponse response) {
		ExpenditurePaymentHelper helper = new ExpenditurePaymentHelper();
		List categories = helper.getExpensePaymentDetailByTwoDate(request,
				response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}
	
	// Expenditure payment report between two days as per name
	public String getExpenditurePaymentReportBetweenTwoDatesAsPerExpName(
			HttpServletRequest request, HttpServletResponse response) {
		ExpenditurePaymentHelper helper = new ExpenditurePaymentHelper();
		List categories = helper.getExpensePaymentDetailByTwoDatePerName(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$=====> " + returnMap);
		return toJson(returnMap);
	}

	// Product detail report as per Category
	public String getProductDetailForReportAsPerCat(HttpServletRequest request,
			HttpServletResponse response) {
		ProductDetailsHelper helper = new ProductDetailsHelper();
		List categories = helper.getProductDetailForReportAsPerCategory(
				request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("productlist", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	/*
	 * // Purchase report as per single date public String
	 * getPurchaseDetailsForSingleDate(HttpServletRequest request,
	 * HttpServletResponse response) { GoodsReceiveHelper helper = new
	 * GoodsReceiveHelper(); List categories =
	 * helper.getPurchaseDetailsForSingleDate(request, response); Map<String,
	 * List> returnMap = new HashMap<String, List>(); returnMap.put("list",
	 * categories); System.out.println("$$$$$$$$$$$$$$$$" + returnMap); return
	 * toJson(returnMap); }
	 */

	// Sale report as per Category between two dates
	public String getSaleDetailsAsPerCategoryBetweenTwoDates(
			HttpServletRequest request, HttpServletResponse response) {
		GoodsReceiveHelper helper = new GoodsReceiveHelper();
		List categories = helper.getSaleDetailsAsPerCategoryBetTwoDates(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}
//
	public String getallDetailsBetweenTwoDates(
			HttpServletRequest request, HttpServletResponse response) {
		GoodsReceiveHelper helper = new GoodsReceiveHelper();
		List categories = helper.getallSaleDetailBetTwoDates(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$  " + returnMap);
		return toJson(returnMap);
	}
	//
	public String getpackingBetweenTwoDates(
		HttpServletRequest request, HttpServletResponse response) {
		GoodsReceiveHelper helper = new GoodsReceiveHelper();
		List categories = helper.getpackingBetTwoDates(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}
	//
	/*public String dayclosure(HttpServletRequest request, HttpServletResponse response) {
		GoodsReceiveHelper helper = new GoodsReceiveHelper();
		List categories = helper.dayclosure(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}*/
	//
	
	public String producttxBetweenTwoDates(
			HttpServletRequest request, HttpServletResponse response) {
		GoodsReceiveHelper helper = new GoodsReceiveHelper();
		List categories = helper.producttxBetTwoDates(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}
	
	// Sale report as per Shop between two dates
	public String getSaleDetailsAsPerShopBetweenTwoDates(
			HttpServletRequest request, HttpServletResponse response) {
		GoodsReceiveHelper helper = new GoodsReceiveHelper();
		List categories = helper.getSaleDetailsAsPerShopBetTwoDates(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}
	
	//
	public String getSaleDetailsAsPeruserBetweenTwoDates(
			HttpServletRequest request, HttpServletResponse response) {
		GoodsReceiveHelper helper = new GoodsReceiveHelper();
		List categories = helper.getSaleDetailsAsPeruserBetTwoDates(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}
	
	// Sale Retun report as per Bill
		public String saleReturnReportAsPerBill(
				HttpServletRequest request, HttpServletResponse response) {
			FertilizerBillHelper helper = new FertilizerBillHelper();
			List categories = helper.saleReturnReportAsPerBill(
					request, response);
			Map<String, List> returnMap = new HashMap<String, List>();
			returnMap.put("list", categories);
			System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
			return toJson(returnMap);
		}
	
	// Sale report as per Category for single date
	public String getSaleDetailsAsPerCategoryForSingleDate(
			HttpServletRequest request, HttpServletResponse response) {
		GoodsReceiveHelper helper = new GoodsReceiveHelper();
		List categories = helper.getSaleDetailsAsPerCategoryForSingleDate(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}
	//
	public String getallcustForSingleDate(
			HttpServletRequest request, HttpServletResponse response) {
		GoodsReceiveHelper helper = new GoodsReceiveHelper();
		List categories = helper.getallForSingleDate(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}
	
	// Sale report as per Payment Mode
	public String getSaleDetailsAsPerPaymentMode(
			HttpServletRequest request, HttpServletResponse response) {
		GoodsReceiveHelper helper = new GoodsReceiveHelper();
		List categories = helper.getSaleDetailsPerPaymentMode(
				request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	// Sale report as per Single date Payment Mode
	public String getSaleDetailsAsPerPaymentModeForSingleDate(
			HttpServletRequest request, HttpServletResponse response) {
		GoodsReceiveHelper helper = new GoodsReceiveHelper();
		List categories = helper.getSaleDetailsPerPaymentModeGorSingleDate(
				request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}
	
	// Sale report as per Two Dates for Payment Mode
	public String getSaleDetailsAsPerPaymentModeForRanges
	(
			HttpServletRequest request, HttpServletResponse response) {
		GoodsReceiveHelper helper = new GoodsReceiveHelper();
		List categories = helper.getSaleDetailsAsPerPaymentModeForRangesHelper(
				request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}
	
	public String getSaleDetailsAsPerPaymentModeForTwoDates(
			HttpServletRequest request, HttpServletResponse response) {
		GoodsReceiveHelper helper = new GoodsReceiveHelper();
		List categories = helper.getSaleDetailsPerPaymentModeForTwoDate(
				request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	
	
	// Sale report as per GST
	public String getSaleDetailsAsPerGST(HttpServletRequest request, HttpServletResponse response) {
		GoodsReceiveHelper helper = new GoodsReceiveHelper();
		List categories = helper.getSaleDetailsPerGSTPercentage(request, response);
		System.out.println("List categories Size ==> Controller.getSaleDetailsAsPerGST ====> "+categories.size());
		if(categories.size()>0){
			Map<String, List> returnMap = new HashMap<String, List>();
			returnMap.put("list", categories);
			System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
			return toJson(returnMap);
		}else{
			return toJson("No Data Available");
		}
		
	}
	
	// Sale report as per NON-GST
		public String getSaleDetailsAsPernonGST(HttpServletRequest request, HttpServletResponse response) {
			GoodsReceiveHelper helper = new GoodsReceiveHelper();
			List categories = helper.getSaleDetailsPernonGSTPercentage(request, response);
			System.out.println("List categories Size ==> Controller.getSaleDetailsAsPerNonGST ====> "+categories.size());
			if(categories.size()>0){
				Map<String, List> returnMap = new HashMap<String, List>();
				returnMap.put("list", categories);
				System.out.println("$$$$$$$$$$$$$$$$----> " + returnMap);
				return toJson(returnMap);
			}else{
				return toJson("No Data Available");
			}
			
		}
	
	// Sale report as per Product name for single date
	public String getSaleDetailsAsPerProductNameForSingleDate(
			HttpServletRequest request, HttpServletResponse response) {
		GoodsReceiveHelper helper = new GoodsReceiveHelper();
		List categories = helper.getSaleDetailsAsPerProNameForSingleDate(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}
	// Sale report as per Supplier Name
		public String getSaleDetailsAsPerSupplierName(
				HttpServletRequest request, HttpServletResponse response) {
			GoodsReceiveHelper helper = new GoodsReceiveHelper();
			List categories = helper.getSaleDetailsAsPerSup(
					request, response);
			Map<String, List> returnMap = new HashMap<String, List>();
			returnMap.put("list", categories);
			System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
			return toJson(returnMap);
		}

		// Sale report as per Product name between two dates
		public String getSaleDetailsAsPerProductNameBetweenTwoDates(
				HttpServletRequest request, HttpServletResponse response) {
			GoodsReceiveHelper helper = new GoodsReceiveHelper();
			List categories = helper.getSaleDetailsAsPerProductNameBetTwoDates(
					request, response);
			Map<String, List> returnMap = new HashMap<String, List>();
			returnMap.put("list", categories);
			System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
			return toJson(returnMap);
		}
		
		
		// GST sale Summary Report between two dates
				public String gstSummaryReportsBetweenTwoDates(
						HttpServletRequest request, HttpServletResponse response) {
					GoodsReceiveHelper helper = new GoodsReceiveHelper();
					List categories = helper.gstSummaryReportsBetweenTwoDates(
							request, response);
					Map<String, List> returnMap = new HashMap<String, List>();
					returnMap.put("list", categories);
					System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
					return toJson(returnMap);
				}
				
				// GST Purchase Summary Report between two dates
				public String gstPurchaseSummaryReportsBetweenTwoDates(
						HttpServletRequest request, HttpServletResponse response) {
					GoodsReceiveHelper helper = new GoodsReceiveHelper();
					List categories = helper.gstPurchaseSummaryReportsBetweenTwoDates(
							request, response);
					Map<String, List> returnMap = new HashMap<String, List>();
					returnMap.put("list", categories);
					System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
					return toJson(returnMap);
				}
	/*
	 * //Stock report as per Category public String
	 * getStockReportAsPerCategory(HttpServletRequest request ,
	 * HttpServletResponse response) { GoodsReceiveHelper helper = new
	 * GoodsReceiveHelper(); List categories =
	 * helper.getStockDetailsAsPerCategory(request, response); Map<String,List>
	 * returnMap = new HashMap<String,List>(); returnMap.put("list",categories);
	 * System.out.println("$$$$$$$$$$$$$$$$"+returnMap); return
	 * toJson(returnMap); }
	 */

	// Stock report as per Godown
	public String getStockReportAsPerShop(HttpServletRequest request,
			HttpServletResponse response) {
		GoodsReceiveHelper helper = new GoodsReceiveHelper();
		List categories = helper.getStockReportAsPerShop(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	// To fetch project details as per product id
	public String getProductDetailsforbillAsPerBarcode(
			HttpServletRequest request, HttpServletResponse response) {
		String barcode = request.getParameter("barcode");
		ProductDetailsHelper helper = new ProductDetailsHelper();
		Map items = helper.getProductDetailsforbillByBarcode(barcode);
		String xyz = toJson(items);
		System.out.println(xyz);
		return xyz;
	}

	/* Add Godown Details by Anil */

	public String getAllProductByGodown(HttpServletRequest request,
			HttpServletResponse response) {
		String fk_godown_id = request.getParameter("fk_godown_id");
		ProductDetailsHelper helper = new ProductDetailsHelper();
		Map items = helper.getAllProductByGodown(fk_godown_id);
		String xyz = toJson(items);
		System.out.println(xyz);
		return xyz;
	}

	public String getProductDetailsGodowm(HttpServletRequest request,
			HttpServletResponse response) {
		String productId = request.getParameter("productId");
		ProductDetailsHelper helper = new ProductDetailsHelper();
		Map items = helper.getProductDetailsGodowm(productId);
		String xyz = toJson(items);
		System.out.println(xyz);
		return xyz;
	}

	// Graph CODE

	public String getAllDay(HttpServletRequest request,
			HttpServletResponse response) {
		DailySaleHelper helper = new DailySaleHelper();
		List dayrecord = helper.getDay();
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", dayrecord);
		System.out.println("@@@@@@@@@@@@@@@@@@@@@@@" + returnMap);
		return toJson(returnMap);
	}

	public String getAllWeek(HttpServletRequest request,
			HttpServletResponse response) {

		DailySaleHelper helper = new DailySaleHelper();
		List weekrecord = helper.getWeek();
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", weekrecord);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	public String getAllMonth(HttpServletRequest request,
			HttpServletResponse response) {
		DailySaleHelper helper = new DailySaleHelper();
		List weekrecord = helper.getMonth();
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", weekrecord);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	// Fetching Credit Customer Details To Edit
	public String getCreditCustomerDetailsToEdit(HttpServletRequest request,
			HttpServletResponse response) {
		
		System.out.println("in controller customerId");
		
		CustomerDetailsHelper helper = new CustomerDetailsHelper();
		Map map = helper.getCreditCustomerDetailsForEdit(request);
		
		Map<String, List> returnMap = new HashMap<String, List>();
		String xyz = toJson(map);
		System.out.println(xyz);
		System.out.println("going out of controller");
		return xyz;
	}

	// update credit customer details
	public String updateCreditCustomerDetails(HttpServletRequest request,
			HttpServletResponse response) {
		System.out.println("In controller UpdateCreditCustomer");
		CustomerDetailsHelper helper = new CustomerDetailsHelper();
		helper.editCreditCustomer(request, response);
		System.out.println("In controller Updateemployee");
		return toJson("Data Updated Successfully");

	}

	// Fetching Supplier Details To Edit
	public String getSupplierDetailsToEdit(HttpServletRequest request,
			HttpServletResponse response) {
		
		System.out.println("in controller customerId");
		SupplierDetailsHelper helper = new SupplierDetailsHelper();
		Map map = helper.getSupplierDetailsForEdit(request);
		
		Map<String, List> returnMap = new HashMap<String, List>();
		String xyz = toJson(map);
		System.out.println(xyz);
		System.out.println("going out of controller");
		return xyz;
	}

	// update Supplier details
	public String updateSupplierDetails(HttpServletRequest request,
			HttpServletResponse response) {
		System.out.println("In controller update Supplier Details");
		SupplierDetailsHelper helper = new SupplierDetailsHelper();
		helper.editSupplierDetail(request, response);
		System.out.println("In controller Updateemployee");
		return toJson("Data Updated Successfully");
	}

	// Fetching Employee Details To Edit
	public String getEmployeeDetailsToEdit(HttpServletRequest request,
			HttpServletResponse response) {
		String empID = request.getParameter("EmpId");
		Long empId = Long.parseLong(empID);
		System.out.println("in controller customerId : " + empId);
		EmployeeDetailsHelper helper = new EmployeeDetailsHelper();
		Map map = helper.getEmployeeDetailsForEdit(empId);
		Map<String, List> returnMap = new HashMap<String, List>();
		String xyz = toJson(map);
		System.out.println(xyz);
		System.out.println("going out of controller");
		return xyz;
	}

	
	// update Employee details
	public String updateEmployeeDetails(HttpServletRequest request,
			HttpServletResponse response) {
		System.out.println("In controller update Supplier Details");
		EmployeeDetailsHelper helper = new EmployeeDetailsHelper();
		helper.editEmployeeDetail(request, response);
		System.out.println("In controller Updateemployee");
		return toJson("Data Updated Successfully");
	}
	
	// update Shop details
		public String updateShopDetails(HttpServletRequest request,
				HttpServletResponse response) {
			System.out.println("In controller update Shop Details");
			shopDetailHelper helper = new shopDetailHelper();
			helper.editShopDetail(request, response);
			System.out.println("In controller Update Shop");
			return toJson("Data Updated Successfully");
		}
		
		// update User details
		public String updateUserDetails(HttpServletRequest request,
				HttpServletResponse response) {
			System.out.println("In controller update Shop Details");
			UserDetailsHelper helper = new UserDetailsHelper();
			helper.editUserDetail(request, response);
			System.out.println("In controller Update User");
			return toJson("Data Updated Successfully");
		}

	// Fetching Shop Details To Edit
		public String getShopDetailsToEdit(HttpServletRequest request,
				HttpServletResponse response) {
			
			String shopID = request.getParameter("ShopId");
			Long shopId = Long.parseLong(shopID);
			
			System.out.println("in controller shopId : " + shopId);
			
			shopDetailHelper helper = new shopDetailHelper();
			Map map = helper.getShopDetailsForEdit(shopId);
			Map<String, List> returnMap = new HashMap<String, List>();
			String xyz = toJson(map);
			
			System.out.println(xyz);
			System.out.println("going out of controller");
			
			return xyz;
		}
		
// Fetching User Details To Edit
	public String getUserDetailsToEdit(HttpServletRequest request,
			HttpServletResponse response) {
		
		String userID = request.getParameter("UserId");
		Long userId = Long.parseLong(userID);
		
		System.out.println("in controller shopId : " + userId);
		
		UserDetailsHelper helper = new UserDetailsHelper();
		Map map = helper.getUserDetailsForEdit(userId);
		Map<String, List> returnMap = new HashMap<String, List>();
		String xyz = toJson(map);
		
		System.out.println(xyz);
		System.out.println("going out of controller");
		
		return xyz;
	}

	// Fetching Product Details To Edit
	public String getProuctDetailsToEdit(HttpServletRequest request,
			HttpServletResponse response) {
			
		System.out.println("in controller product");
		
		ProductDetailsHelper helper = new ProductDetailsHelper();
		Map map = helper.getProductDetailsForEdit(request);
		Map<String, List> returnMap = new HashMap<String, List>();
		String xyz = toJson(map);
		
		System.out.println(xyz);
		System.out.println("going out of controller");
		
		return xyz;
	}

	// update product details
	public String updateProductDetails(HttpServletRequest request,
			HttpServletResponse response) {
		System.out.println("In controller update Supplier Details");
		ProductDetailsHelper helper = new ProductDetailsHelper();
		helper.editProductDetail(request, response);
		System.out.println("In controller Updateemployee");
		return toJson("Data Updated Successfully");

	}
	
	/* Bill copy Generation */
	public String billGeneration(HttpServletRequest request, HttpServletResponse response) throws IOException {
		System.out.println("Start In regProfarmaDetail Controller");
		FertilizerBillHelper helper = new FertilizerBillHelper();
		helper.billGeneration(request, response);
		System.out.println("Start In regProfarmaDetail Controller");
		return toJson("Data Added Successsfully");
	}

/* Bill copy of credit customer */
	public String CreditCustmerBillCOPY(HttpServletRequest request, HttpServletResponse response) throws IOException {
		System.out.println("Start In regProfarmaDetail Controller");
		FertilizerBillHelper helper = new FertilizerBillHelper();
		helper.CreditCustmerBillCOPY(request, response);
		System.out.println("Start In regProfarmaDetail Controller");
		return toJson("Data Added Successsfully");
	}

	// all Credit amount form credit Cust payment
	public String getCreditAmountByCreditCust(HttpServletRequest request,
			HttpServletResponse response) {
		FertilizerBillHelper helper = new FertilizerBillHelper();
		List categories = helper.getCreditAmountByCreditCust(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	// all Credit amount form sale billing
	public String getCreditAmountByBilling(HttpServletRequest request,
			HttpServletResponse response) {
		FertilizerBillHelper helper = new FertilizerBillHelper();
		List categories = helper.getAllCreditAmtFromBilling(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	public String getPaidAmountToSupplier(HttpServletRequest request,
			HttpServletResponse response) {
		FertilizerBillHelper helper = new FertilizerBillHelper();
		List categories = helper.getPaidAmountToSupplier(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	public String getPaidAmountToEmployee(HttpServletRequest request,
			HttpServletResponse response) {
		FertilizerBillHelper helper = new FertilizerBillHelper();
		List categories = helper.getPaidAmountToEmployee(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	//fetch fertilizer product as per barcode from goods receive for billing
	public String fetchCust(HttpServletRequest request,
			HttpServletResponse response) {

		GoodsReceiveHelper helper = new GoodsReceiveHelper();
		CustomerBean customer = helper.getDetailsById(request, response);
		Map<String, CustomerBean> returnMap = new HashMap<String, CustomerBean>();
		returnMap.put("offer", customer);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	//fetch Pesticide product as per barcode from goods receive for billing
	public String getPesticideDetailsAsPerBarcode(HttpServletRequest request,
			HttpServletResponse response) {

		GoodsReceiveHelper helper = new GoodsReceiveHelper();
		CustomerBean customer = helper.getPesticideDetailsByBarcode(request, response);
		Map<String, CustomerBean> returnMap = new HashMap<String, CustomerBean>();
		returnMap.put("offer", customer);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}
	
	// fetching product details from goods receive for fertilizer bill
	public String fetchDetailsAsPerProductNameInFertiBill(
			HttpServletRequest request, HttpServletResponse response) {
		
		System.out.println("In controller for goods fetch for bill");
		
		GoodsReceiveHelper helper = new GoodsReceiveHelper();
		CustomerBean customer = helper.getDetailsByProNameForzFertiBill(
				request, response);
		Map<String, CustomerBean> returnMap = new HashMap<String, CustomerBean>();
		returnMap.put("offer", customer);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	// fetching product details from goods receive for fertilizer bill for Cash
	public String getProductDetails1(HttpServletRequest request,
			HttpServletResponse response) throws Exception{
		
		System.out.println("In controller for goods fetch for bill 222222222222");
		
		GoodsReceiveHelper helper = new GoodsReceiveHelper();		
		Map items = helper.getProductDetailsForFertiBill(request, response);
		String xyz = toJson(items);		
		System.out.println("$$$$$$$$$$$$$$$$" + xyz);
		return xyz;
	}
	
	// fetching product details from goods receive for NON GST bill for Cash
		public String getProductDetailsfornonGstbill(HttpServletRequest request,
				HttpServletResponse response) throws Exception{
			System.out.println("In controller for goods fetch for bill 222222222222");
			GoodsReceiveHelper helper = new GoodsReceiveHelper();		
			Map items = helper.getProductDetailsFornonGSTBill(request, response);
			String xyz = toJson(items);		
			System.out.println("$$$$$$$$$$$$$$$$" + xyz);
			return xyz;
		}

	// fetching product details from goods receive for fertilizer bill for Credit
	public String getProductDetails2(HttpServletRequest request,
			HttpServletResponse response)throws Exception {
		
		System.out.println("In controller for goods fetch for bill 222222222222");
		GoodsReceiveHelper helper = new GoodsReceiveHelper();		
		Map items = helper.getProductDetailsForFertiBill(request, response);
		String xyz = toJson(items);		
		System.out.println("$$$$$$$$$$$$$$$$" + xyz);
		return xyz;		
		
		/*
		System.out.println("In controller for goods fetch for bill 222222222222");
		GoodsReceiveHelper helper = new GoodsReceiveHelper();
		CustomerBean customer = helper.getProductDetailsForFertiBill(request, response);
		Map<String, CustomerBean> returnMap = new HashMap<String, CustomerBean>();
		returnMap.put("offer", customer);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
		*/
	}
	
	// fetching product details from goods receive for seed bill
	public String getProductDetailsforSeed(HttpServletRequest request,
			HttpServletResponse response) {
		System.out.println("In controller for goods fetch for bill");
		GoodsReceiveHelper helper = new GoodsReceiveHelper();
		CustomerBean customer = helper.getProductDetailsForSeedBill(request,
				response);
		Map<String, CustomerBean> returnMap = new HashMap<String, CustomerBean>();
		returnMap.put("offer", customer);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	/*
	 * //fetching product details from goods receive for fertilizer bill public
	 * String fetchDetailsAsPerProductNameInFertiBill(HttpServletRequest request
	 * , HttpServletResponse response){
	 * System.out.println("In controller for goods fetch for bill");
	 * GoodsReceiveHelper helper=new GoodsReceiveHelper(); CustomerBean customer
	 * = helper.getDetailsByProNameForzFertiBill(request,response);
	 * Map<String,CustomerBean> returnMap = new HashMap<String,CustomerBean>();
	 * returnMap.put("offer",customer);
	 * System.out.println("$$$$$$$$$$$$$$$$"+returnMap); return
	 * toJson(returnMap); }
	 */

	// Adding fertilizer bill
	public String addingFertilizerBill(HttpServletRequest request,
			HttpServletResponse response) throws ParseException, Exception {
		System.out.println("IN CONTROLLER");
		FertilizerBillHelper helper = new FertilizerBillHelper();
		helper.fertilizerBilling(request, response);
		return toJson("Data Added Successfully");
	}
	public String addingFertilizerBill_28_5_17(HttpServletRequest request,
			HttpServletResponse response) throws ParseException {
		System.out.println("IN CONTROLLER");
		FertilizerBillHelper helper = new FertilizerBillHelper();
		helper.fertilizerBilling_28_5_17(request, response);
		return toJson("Data Added Successfully");
	}

	 // get fertilizer product as per category for fertilizer bill
	  public String getAllProductByCategoriesForFertiBill( HttpServletRequest
		     request, HttpServletResponse response){ 
		 
	   //String category =request.getParameter("fk_cat_id"); 
	   ProductDetailsHelper helper = new ProductDetailsHelper();
	   Map items =helper.getAllProductByCatForFertiBill(request, response);
	   String xyz =toJson(items);
	   System.out.println("In controller == =  =" + xyz); return xyz;
	  }
	 
	/*
	 * public String getAllProductByCategoriesForFertiBill( HttpServletRequest
	 * request, HttpServletResponse response) { //String category =
	 * request.getParameter("fk_cat_id"); ProductDetailsHelper helper = new
	 * ProductDetailsHelper(); List items =
	 * helper.getAllProductByCatForFertiBill(request, response); String xyz =
	 * toJson(items); System.out.println("In controller == =  =" + xyz); return xyz;
	 * }
	 */

	// Get all purchase by bill no on purchase return form
	public String getAllFertiIetmByBillNo(HttpServletRequest request,
			HttpServletResponse response) {
		String bill_no = request.getParameter("bill_no");
		//String customerName = request.getParameter("customerName");
		
		FertilizerBillHelper helper = new FertilizerBillHelper();
		Map items = helper.getAllFertiIetmByBillNo(bill_no);
		String xyz = toJson(items);
		System.out.println(xyz);
		return xyz;
	}
				
	//////credit billing for sale return////////////
	public String getAllFertiIetmByBillNoCredit(HttpServletRequest request,
			HttpServletResponse response) {
		
		System.out.println("In controller of credit");
		String billno= request.getParameter("billno");
		FertilizerBillHelper helper = new FertilizerBillHelper();
		Map items = helper.getAllCreditBillDetailsByBillNo(billno);
		String xyz = toJson(items);
		System.out.println(xyz);
		return xyz;
	}
				
	///////credit billing for fetching bill number//////////
	public String getAllBillCredit(HttpServletRequest request,
			HttpServletResponse response) {
		System.out.println("IN CONTROLLER");
		String creditCustomer= request.getParameter("creditCustomer");
		FertilizerBillHelper helper = new FertilizerBillHelper();
		Map map=helper.getAllBillCredit(creditCustomer);
		String xyz = toJson(map);
		System.out.println(xyz);
		return xyz;
	}
				
	///////////cash billing for fetching bill number////////////		
	public String getAllBillCash(HttpServletRequest request,
			HttpServletResponse response) {
		System.out.println("IN CONTROLLER");
		String customerName= request.getParameter("customerName");
		FertilizerBillHelper helper = new FertilizerBillHelper();
		Map map=helper.getAllBillCash(customerName);
		String xyz = toJson(map);
		System.out.println(xyz);
		return xyz;
	}	
				
	// Seed Billing details for sale return
	public String getAllSeedBillinfDetailsByBillNo(HttpServletRequest request,
			HttpServletResponse response) {
		String bill_no = request.getParameter("bill_no");
		SeedPesticideBillHelper helper = new SeedPesticideBillHelper();
		Map items = helper.getAllSeedDetailsByBillNo(bill_no);
		String xyz = toJson(items);
		System.out.println(xyz);
		return xyz;
	}

	// Pesticide Billing details for sale return
	public String getAllPesticideBillingDetailsByBillNo(HttpServletRequest request,
			HttpServletResponse response) {
		String bill_no = request.getParameter("bill_no");
		PesticideBillHelper helper = new PesticideBillHelper();
		Map items = helper.getAllPesticideBillDetailsByBillNo(bill_no);
		String xyz = toJson(items);
		System.out.println(xyz);
		return xyz;
	}
	/*
	 * //credit billing for sale return
	 * 
	 * public String getAllFertiIetmByBillNoCredit(HttpServletRequest request,
	 * HttpServletResponse response) { String bill_no =
	 * request.getParameter("bill_no"); PesticideBillHelper helper = new
	 * PesticideBillHelper(); Map items =
	 * helper.getAllCreditBillDetailsByBillNo(bill_no); String xyz = toJson(items);
	 * System.out.println(xyz); return xyz; }
	 */
				
				
	// get product name as per category for stock report
	public String getAllProductByCategoriesForStockReport(
			HttpServletRequest request, HttpServletResponse response) {
		ProductDetailsHelper helper = new ProductDetailsHelper();
		Map items = helper.getAllProductByCatForStockReport(request);
		String xyz = toJson(items);
		System.out.println("In controller == =  =" + xyz);
		return xyz;
	}
		
	// fetching product detail as per batch for seed pesti bill
	public String fetchProductDetailAsPerBatchNumberAndStockForSeedPestiBilling(
			HttpServletRequest request, HttpServletResponse response) {
		System.out.println("In controller for goods fetch for bill");
		GoodsReceiveHelper helper = new GoodsReceiveHelper();
		CustomerBean customer = helper.getDetailsByBatchNadStockForSeedBill(
				request, response);
		Map<String, CustomerBean> returnMap = new HashMap<String, CustomerBean>();
		returnMap.put("offer", customer);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	// Adding seed bill
	public String addingSeedAndPesticideBill(HttpServletRequest request,
			HttpServletResponse response) throws ParseException {
		System.out.println("IN CONTROLLER");
		SeedPesticideBillHelper helper = new SeedPesticideBillHelper();
		helper.seedAndPesticideBillingBilling(request, response);
		return toJson("Data Added Successfully");
	}
	
	// Adding pesticide bill
	public String addingPesticideBill(HttpServletRequest request,
			HttpServletResponse response) throws ParseException {
		System.out.println("IN CONTROLLER");
		PesticideBillHelper helper = new PesticideBillHelper();
		helper.addPesticideBilling(request, response);
		return toJson("Data Added Successfully");
	}

	// get Seed or Pesticide product as per category for Seed or Pesticide bill
	public String getAllProductByCategoriesForSeedAndPestiBill(
			HttpServletRequest request, HttpServletResponse response) {
		String category1 = request.getParameter("fk_cat_id1");
		ProductDetailsHelper helper = new ProductDetailsHelper();
		Map items = helper.getAllProductByCatForSeedAndPestiBill(category1);
		String xyz = toJson(items);
		System.out.println("In controller == =  =" + xyz);
		return xyz;
	}

	// get batch num and stock as per product for Seed or Pesticide bill
	public String fetchBatchNumberAndStockForSeedPestiBilling(
			HttpServletRequest request, HttpServletResponse response) {
		String proName = request.getParameter("proName");
		String Company = request.getParameter("company");
		String weight = request.getParameter("weight");
		ProductDetailsHelper helper = new ProductDetailsHelper();
		Map items = helper.getAllBatchNumAndStockForSeedBilling(proName,
				Company, weight);
		String xyz = toJson(items);
		System.out.println("In controller == =  =" + xyz);
		return xyz;
	}

	/*
	 * //get Seed or Pesticide product as per category for Seed or Pesticide
	 * bill public String
	 * getAllProductByCategoriesForSeedAndPestiBill(HttpServletRequest request ,
	 * HttpServletResponse response) { String category1 =
	 * request.getParameter("fk_cat_id1"); String category2 =
	 * request.getParameter("fk_cat_id2"); ProductDetailsHelper helper = new
	 * ProductDetailsHelper(); Map items =
	 * helper.getAllProductByCatForSeedAndPestiBill(category1,category2); String
	 * xyz= toJson(items); System.out.println("In controller == =  ="+xyz);
	 * return xyz; }
	 */

	// get taday credit and debit report
	public String getTodayCreditDebitReport(HttpServletRequest request,
			HttpServletResponse response) {
		ExpenditurePaymentHelper helper = new ExpenditurePaymentHelper();
		List categories = helper.getTodayCreditDebitReport(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	// get taday credit and debit report
	public String getTodayCreditDebitReport1(HttpServletRequest request,
			HttpServletResponse response) {
		ExpenditurePaymentHelper helper = new ExpenditurePaymentHelper();
		List categories = helper.getTodayCreditDebitReport1(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	// get single credit and debit report
	public String creditdebitForsingleDate(HttpServletRequest request,
			HttpServletResponse response) {
		ExpenditurePaymentHelper helper = new ExpenditurePaymentHelper();
		List categories = helper.creditdebitForsingleDate(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	// get single credit and debit report
	public String creditdebitForsingleDate1(HttpServletRequest request,
			HttpServletResponse response) {
		ExpenditurePaymentHelper helper = new ExpenditurePaymentHelper();
		List categories = helper.creditdebitForsingleDate1(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	// get two credit and debit report
	public String creditdebitForBetTowDate(HttpServletRequest request,
			HttpServletResponse response) {
		ExpenditurePaymentHelper helper = new ExpenditurePaymentHelper();
		List categories = helper.creditdebitForBetTowDate(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	public String creditdebitForBetTowDate1(HttpServletRequest request,
			HttpServletResponse response) {
		ExpenditurePaymentHelper helper = new ExpenditurePaymentHelper();
		List categories = helper.creditdebitForBetTowDate1(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	/* Bill copy Generation */
	public String NormalCustFertilizerBillCOPY(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		System.out.println("Start In regProfarmaDetail Controller");
		FertilizerBillHelper helper = new FertilizerBillHelper();
		helper.normalCustFerilizerBillCopy(request, response);
		System.out.println("Start In regProfarmaDetail Controller");
		return toJson("Data Added Successsfully");
	}

	// To Sale Return for billing
	public String returnSale(HttpServletRequest request,
			HttpServletResponse response) throws ParseException {
		System.out.println("IN CONTROLLER");
		FertilizerBillHelper helper = new FertilizerBillHelper();
		helper.saleReturnAsPerBillNo(request, response);
		return toJson("Data UpDated Successfully");
	}
//
	public String billreturn(HttpServletRequest request,
			HttpServletResponse response) throws ParseException {
		System.out.println("IN CONTROLLER");
		FertilizerBillHelper helper = new FertilizerBillHelper();
		helper.billReturnAsPerBillNo(request, response);
		return toJson("Bill Deleted Successfully");
	}
	//
	public String challanreturn(HttpServletRequest request,
			HttpServletResponse response) throws ParseException {
		System.out.println("IN CONTROLLER");
		FertilizerBillHelper helper = new FertilizerBillHelper();
		helper.cancelchallan(request, response);
		return toJson("Challan Deleted Successfully");
	}
	
	// To Sale Return for Seed
	public String seedSaleReturn(HttpServletRequest request,
			HttpServletResponse response) {
		System.out.println("IN CONTROLLER");
		SeedPesticideBillHelper helper = new SeedPesticideBillHelper();
		helper.seedSaleReturnAsPerBillNo(request, response);
		return toJson("Data UpDated Successfully");
	}

	// To Sale Return for Pesticide
	public String pesticideSaleReturn(HttpServletRequest request,
			HttpServletResponse response) {
		System.out.println("IN CONTROLLER");
		PesticideBillHelper helper = new PesticideBillHelper();
		helper.pesticideSaleReturnAsPerBillNo(request, response);
		return toJson("Data UpDated Successfully");
	}

			
	/* Fertilizer Bill copy of credit customer */
	public String creditCustFertilzerBillCOPY(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		System.out.println("Start In regProfarmaDetail Controller");
		FertilizerBillHelper helper = new FertilizerBillHelper();
		helper.fertilizerCreditCustmerBillCOPY(request, response);
		System.out.println("Start In regProfarmaDetail Controller");
		return toJson("Data Added Successsfully");
	}

	// Stock report as per Category
	public String getStockReportAsPerCategory(HttpServletRequest request, HttpServletResponse response) {
		
		GoodsReceiveHelper helper = new GoodsReceiveHelper();
		List categories = helper.getStockDetailsAsPerCategory(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	// Stock report as per ProductName
	public String StockDetailsReportAsPerProductName(
			HttpServletRequest request, HttpServletResponse response) {
		GoodsReceiveHelper helper = new GoodsReceiveHelper();
		List categories = helper.getStockDetailsAsProductName(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	// Stock report as per selected company name
	public String StockDetailsReportAsPerCompanyName(
			HttpServletRequest request, HttpServletResponse response) {
		GoodsReceiveHelper helper = new GoodsReceiveHelper();
		List categories = helper.getStockDetailsAsCompanyName(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}
	//
	public String getsaleamount(HttpServletRequest request, HttpServletResponse response) {
		GoodsReceiveHelper helper = new GoodsReceiveHelper();
		List categories = helper.getsaleamount(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
//		returnMap.put("list", categories);
//		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		String xyz = toJson(categories);
		System.out.println("data: - "+xyz);
		System.out.println("going out of controller");
		return xyz;
//		return toJson(returnMap);
		
//		Map<String, List> returnMap = new HashMap<String, List>();
//		String xyz = toJson(list);
//		System.out.println("data: - "+xyz);
//		System.out.println("going out of controller");
//		return xyz;
	}
	public String getpurchaseamount(HttpServletRequest request, HttpServletResponse response) {
		GoodsReceiveHelper helper = new GoodsReceiveHelper();
		List categories = helper.getpurchase(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();

		String xyz = toJson(categories);
		System.out.println("data: - "+xyz);
		System.out.println("going out of controller");
		return xyz;

	}
	//
	public String getpurchasereturnamount(HttpServletRequest request, HttpServletResponse response) {
		GoodsReceiveHelper helper = new GoodsReceiveHelper();
		List categories = helper.getpurchasereturnamount(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();

		String xyz = toJson(categories);
		System.out.println("data: - "+xyz);
		System.out.println("going out of controller");
		return xyz;

	}
	//
	public String getsalereturnamount(HttpServletRequest request, HttpServletResponse response) {
		GoodsReceiveHelper helper = new GoodsReceiveHelper();
		List categories = helper.getsalereturnamount(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();

		String xyz = toJson(categories);
		System.out.println("data: - "+xyz);
		System.out.println("going out of controller");
		return xyz;

	}
	//
	public String getlowstock(HttpServletRequest request, HttpServletResponse response) {
		GoodsReceiveHelper helper = new GoodsReceiveHelper();
		List categories = helper.getlowstock(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();

		String xyz = toJson(categories);
		System.out.println("data: - "+xyz);
		System.out.println("going out of controller");
		return xyz;

	}
	// Delete customer
	public String deletCustomer(HttpServletRequest request, HttpServletResponse response) 
	{
		CustomerDetailsHelper helper = new CustomerDetailsHelper();
	    helper.deleteCustomer(request, response);
	  /*Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);*/
		String data="Customer Deleted Successfully";
		return data;
	}
		
   // Delete supplier
	public String deletSupplier(HttpServletRequest request, HttpServletResponse response) {
		SupplierDetailsHelper helper = new SupplierDetailsHelper();
	     helper.deleteSupplier(request, response);
		/*Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);*/
		 String data="Supplier Deleted Successfully";
		 return data;
	}
	
	// Delete Product
	public String deleteProduct(HttpServletRequest request, HttpServletResponse response) {
		ProductDetailsHelper helper = new ProductDetailsHelper();
	     helper.deleteProduct(request, response);
		/*Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);*/
		 String data="Product Deleted Successfully";
		 return data;
	}
				

	// Purchase report as per single date
	public String getPurchaseDetailsForSingleDate(HttpServletRequest request,
			HttpServletResponse response)throws IOException
	{			
		Map<String, List> returnMap = null;
		GoodsReceiveHelper helper = new GoodsReceiveHelper();
		List categories = helper.getPurchaseDetailsForSingleDate(request, response);
		System.out.println("List categories Size ==> Controller.getPurchaseDetailsForSingleDate ====> "+categories.size());
		if(categories.size()>0)
		{
			returnMap = new HashMap<String, List>();
			returnMap.put("list", categories);
			System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		}
		else
		{
			return toJson("No Data Available");
		}
		return toJson(returnMap);
	}
		/*
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
		*/
	

	// Purchase report between two days
	public String getPurchaseReportBetweenTwoDates(HttpServletRequest request,
			HttpServletResponse response) {
		Map<String, List> returnMap = null;
		GoodsReceiveHelper helper = new GoodsReceiveHelper();
		List categories = helper.getPurchaseDetailByTwoDate(request, response);
		if(categories.size()>0)
		{
			returnMap = new HashMap<String, List>();
			returnMap.put("list", categories);
			System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		}
		else
		{
			return toJson("No Data Available");
		}
		return toJson(returnMap);
	}
	
	
	// GST Summary report between two days
	public String GSTSummaryReportBetweenTwoDates(HttpServletRequest request,
			HttpServletResponse response) {
		List categories = null;
		GoodsReceiveHelper helper = new GoodsReceiveHelper();
		categories = helper.GSTSummaryReportBetweenTwoDates(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
			returnMap = new HashMap<String, List>();
			returnMap.put("list", categories);
			System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		
		return toJson(returnMap);
	}			
		
    // Purchase report as per product
	public String getPurchaseDetailsAsPerProduct(HttpServletRequest request, HttpServletResponse response)
	{
		GoodsReceiveHelper helper = new GoodsReceiveHelper();
		List categories = helper.getPurchaseDetailsAsPerProduct(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		
		System.out.println("Controller.java==>getPurchaseDetailsAsPerProduct categories.size() Records Fetched ==> "+categories.size());
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	// Purchase report as per Supplier
	public String getPurchaseDetailsAsPerSupplier(HttpServletRequest request,
			HttpServletResponse response) {
		GoodsReceiveHelper helper = new GoodsReceiveHelper();
		List categories = helper.getPurchaseDetailsAsPerSupplierName(request,
				response);
		Map<String, List> returnMap = new HashMap<String, List>();
		if(categories.size()>0)
		{
			returnMap.put("list", categories);
			System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		}
		else
		{
			return toJson("No Data Available");
		}
		return toJson(returnMap);
	}

	// Purchase report as per Shop
	public String getPurchaseDetailsAsPerShop(HttpServletRequest request,
			HttpServletResponse response) {
		GoodsReceiveHelper helper = new GoodsReceiveHelper();
		List categories = helper.getPurchaseDetailsAsPerShopName(request, response);
		Map<String, List> returnMap = null;
		if(categories.size()>0)
		{
			returnMap = new HashMap<String, List>();
			returnMap.put("list", categories);
			System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		}
		else
		{
			return toJson("No Data Available");
		}
		return toJson(returnMap);
	}
	
	// Purchase report as per Category
	public String getPurchaseDetailsAsPerCategory(HttpServletRequest request,
			HttpServletResponse response) {
		GoodsReceiveHelper helper = new GoodsReceiveHelper();
		List categories = helper.getPurchaseDetailsAsPerCategory(request,
				response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	// Supplier Account details
	public String getYesterdarTotalAmount(HttpServletRequest request,
			HttpServletResponse response) {
		
		SupplierAccountDetailsHelper helper = new SupplierAccountDetailsHelper();
		Map map = helper.getYesterdarTotalAmount();
		String xyz = toJson(map);
		System.out.println(xyz);
		return xyz;
	}
	
	public String getTodaySaleTotalAmount(HttpServletRequest request,
			HttpServletResponse response) {
	
		SupplierAccountDetailsHelper helper = new SupplierAccountDetailsHelper();
		Map map = helper.getTodaySaleTotalAmount();
		String xyz = toJson(map);
		System.out.println(xyz);
		return xyz;
	}
	
	public String getTodaySaleTotalAmount1(HttpServletRequest request,
			HttpServletResponse response) {
		
		SupplierAccountDetailsHelper helper = new SupplierAccountDetailsHelper();
		Map map = helper.getTodaySaleTotalAmount1();
		String xyz = toJson(map);
		System.out.println(xyz);
		return xyz;
	}

	/*//Tax report as per Category from Sale single date
	  public String getTaxDetailsAsPerCategoryFromSale(HttpServletRequest request , HttpServletResponse response) 
		{
		  FertilizerBillHelper helper  = new FertilizerBillHelper();
			List categories =  helper.getTaxDetailsAsPerCategoryFromSale(request, response);
			Map<String,List> returnMap = new HashMap<String,List>();
					returnMap.put("list",categories);
			System.out.println("$$$$$$$$$$$$$$$$"+returnMap);
			return toJson(returnMap);
	}*/

	  //Tax report as per Category from Sale Two date
	  public String getTaxDetailsAsPerCategoryFromSaleBetweenTwoDate(HttpServletRequest request , HttpServletResponse response) 
		{
		  FertilizerBillHelper helper  = new FertilizerBillHelper();
			List categories =  helper.getTaxDetailsAsPerCategoryFromSaleBetTwoDate(request, response);
			Map<String,List> returnMap = new HashMap<String,List>();
			returnMap.put("list",categories);
			System.out.println("$$$$$$$$$$$$$$$$"+returnMap);
			return toJson(returnMap);			
		}
		  
	  //Tax report as per Category
	  public String getTaxDetailsAsPerCategoryFromPurchase(HttpServletRequest request , HttpServletResponse response) 
		{
		    GoodsReceiveHelper helper  = new GoodsReceiveHelper();
			List categories =  helper.getTaxDetailsFromPurchaseForSingleDateAsPerCategory(request, response);
			Map<String,List> returnMap = new HashMap<String,List>();
					returnMap.put("list",categories);
			System.out.println("$$$$$$$$$$$$$$$$"+returnMap);
			return toJson(returnMap);
		}
		  
		// Edit Tax
		public String edittaxCreation(HttpServletRequest request,
				HttpServletResponse response) {
			System.out.println("IN CONTROLLER");
			TaxCreationHelper tch = new TaxCreationHelper();
			tch.edittaxCreation(request, response);
			return toJson("Data UpDated Successfully");
		}
			
		// Purchase report As Per GST
		public String getGSTPurchaseReport(HttpServletRequest request,
				HttpServletResponse response) {
			GoodsReceiveHelper helper = new GoodsReceiveHelper();
			List categories = helper.getPurchaseDetailByGST(request, response);
			Map<String, List> returnMap = null;
			if(categories.size()>0)
			{
				returnMap = new HashMap<String, List>();
				returnMap.put("list", categories);
				System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
			}
			else
			{
				return toJson("No Data Available");
			}
			
			return toJson(returnMap);
		}
			
		// Purchase return report as per Supplier between two date
		public String getPurchaseReturnDetailsAsPerSupplier(HttpServletRequest request,
				HttpServletResponse response) {
			
			GoodsReceiveHelper helper = new GoodsReceiveHelper();
			List categories = helper.getPurchaseReturnDetailsAsPerSupplierName(request, response);
			Map<String, List> returnMap = null;
			System.out.println("Size of Purchase Return List Controller.java.getPurchaseReturnDetailsAsPerSupplier ==> "+categories.size());
			if(categories.size()>0)
			{
				returnMap = new HashMap<String, List>();
				returnMap.put("list", categories);
				System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
			}
			else
			{
				return toJson("No Data Available");
			}
			return toJson(returnMap);
		}
			
		public String creditCustomerSaleReportBillAndNameWise(HttpServletRequest request,
				HttpServletResponse response)
		{
			GoodsReceiveHelper helper = new GoodsReceiveHelper();
			List creditCustSaleReports = helper.creditCustomerSaleReportBillAndNameWise(request, response);
			Map<String, List> returnMap = new HashMap<String, List>();
			returnMap.put("list", creditCustSaleReports);
			System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
			return toJson(returnMap);				
		}
		
		// GST sale Return Report between two dates
		public String saleGSTReturnReport(
				HttpServletRequest request, HttpServletResponse response) {
			GoodsReceiveHelper helper = new GoodsReceiveHelper();
			List categories = helper.saleGstReturnReportsBetweenTwoDates(request, response);
			Map<String, List> returnMap = new HashMap<String, List>();
			returnMap.put("list", categories);
			System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
			return toJson(returnMap);
		}
			
		// GST Purchase Return Report between two dates
		public String purchaseGSTReturnReport(HttpServletRequest request, HttpServletResponse response)
		{
			System.out.println("CONTROLLER CALLED");
			GoodsReceiveHelper helper = new GoodsReceiveHelper();
			List categories = helper.purchaseGstReturnReportsBetweenTwoDates(request, response);
			Map<String, List> returnMap = new HashMap<String, List>();
			returnMap.put("list", categories);
			System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
			return toJson(returnMap);
		}
						
		public String billWiseSaleReportForGrossTotal(
				HttpServletRequest request, HttpServletResponse response) {
			GoodsReceiveHelper helper = new GoodsReceiveHelper();
			List categories = helper.billWiseSaleReportForGrossTotalHelper(request, response);
			Map<String, List> returnMap = new HashMap<String, List>();
			returnMap.put("list", categories);
			System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
			return toJson(returnMap);
		}
			
		public String cashCustomerSaleReportBillAndNameWise(HttpServletRequest request,
				HttpServletResponse response)
		{
			GoodsReceiveHelper helper = new GoodsReceiveHelper();
			List creditCustSaleReports = helper.cashCustomerSaleReportBillAndNameWise(request, response);
			Map<String, List> returnMap = new HashMap<String, List>();
			returnMap.put("list", creditCustSaleReports);
			System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
			return toJson(returnMap);				
		}
		
		
		public String rangeWiseBillPaidUnpaidCntrl(HttpServletRequest request,
				HttpServletResponse response) {
			GoodsReceiveHelper helper = new GoodsReceiveHelper();
			List categories = helper.rangeWiseBillPaidUnpaidHelper(request, response);
			Map<String, List> returnMap = null;
			if(categories.size()>0)
			{
				returnMap = new HashMap<String, List>();
				returnMap.put("list", categories);
				System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
			}
			else
			{
				return toJson("No Data Available");
			}
			return toJson(returnMap);
		}

		// PROFIR_&_LOSS report between two days
		public String getProfitAndLosstBetweenTwoDates(HttpServletRequest request,
				HttpServletResponse response)
		{
			String startDate = request.getParameter("fisDate");
			String endDate = request.getParameter("endDate");
			
			System.out.println("good receive - - -  -  startdate "+startDate+"\nEnd date = "+endDate);
			GoodsReceiveHelper helper = new GoodsReceiveHelper();
			Map map = helper.getProfitAndLosstBetweenTwoDatesHelper(startDate, endDate);
			Map<String, List> returnMap = new HashMap<String, List>();
			String xyz = toJson(map);
			System.out.println(xyz);
			System.out.println("going out of controller");
			return xyz;
		}	
		
		public String getProfitAndLosstBetweenTwoDatesOExpense(HttpServletRequest request,
				HttpServletResponse response)
		{
			String startDate = request.getParameter("fisDate");
			String endDate = request.getParameter("endDate");
			
			System.out.println("startdate "+startDate+"\nEnd date = "+endDate);
			GoodsReceiveHelper helper = new GoodsReceiveHelper();
			Map map = helper.getProfitAndLosstBetweenTwoDatesOExpenseHelper(startDate, endDate);
			Map<String, List> returnMap = new HashMap<String, List>();
			String xyz = toJson(map);
			System.out.println(xyz);
			System.out.println("going out of controller");
			return xyz;
		}	
		
		public String getProfitAndLosstBetweenTwoDatesSaleAmount(HttpServletRequest request,
				HttpServletResponse response)
		{
			String startDate = request.getParameter("fisDate");
			String endDate = request.getParameter("endDate");
			
			System.out.println("sale report - - -     startdate "+startDate+"\nEnd date = "+endDate);
			GoodsReceiveHelper helper = new GoodsReceiveHelper();
			Map map = helper.getProfitAndLosstBetweenTwoDatesSaleAmountHelper(startDate, endDate);
			Map<String, List> returnMap = new HashMap<String, List>();
			String xyz = toJson(map);
			System.out.println(xyz);
			System.out.println("going out of controller");
			return xyz;
		}	
	
		

		// fetching product details from goods receive for fertilizer bill
		public String getProductDetailsByBarcode(HttpServletRequest request,
				HttpServletResponse response) throws Exception
		{
			System.out.println("In controller for goods fetch for bill");
			String barcodeNo =request.getParameter("barcodeNo");
			System.out.println("BARCODE NO  :  "+barcodeNo);
			GoodsReceiveHelper helper = new GoodsReceiveHelper();
			CustomerBean customer = helper.getProductDetailsByBarcodeForFertiBill(barcodeNo);
			Map<String, CustomerBean> returnMap = new HashMap<String, CustomerBean>();
			returnMap.put("offer", customer);
			System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
			return toJson(returnMap);
		}
		
		//Get Unit Details for edit
		public String getUnitDetailsForEdit(HttpServletRequest request, HttpServletResponse response) 
		{
			System.out.println("in Controller");
					
			MeasuringUnitsHelper helper = new MeasuringUnitsHelper();
			List map =  helper.getUnitDetails(request);
			Map<String,List> returnMap = new HashMap<String, List>();
			String name = toJson(map);
			return name;
		}
		
		// Edit Unit
		public String updateUnitDetails(HttpServletRequest request,HttpServletResponse response) 
		{
			
			System.out.println("IN CONTROLLER");
			MeasuringUnitsHelper tch = new MeasuringUnitsHelper();
			tch.editUnit(request, response);
			return toJson("Data UpDated Successfully");

		}
		//////credit note generation///////
		public String creditnotegeneration(HttpServletRequest request,
				HttpServletResponse response) {
			System.out.println("IN CONTROLLER");
			CreditnoteGenHelper helper = new CreditnoteGenHelper();
			helper.creditNoteGen(request, response);
			return toJson("Data Added Successfully");
		}
		
	///////Sale Return Reports bewtween two Dates/////////
		
		
		public String getSaleReturnReportBetweenTwoDates(HttpServletRequest request,
				HttpServletResponse response) {
			System.out.println("In Controller");
			SaleReturnReportHelper helper=new SaleReturnReportHelper();
			
			List report = helper.getSaleReturnReportBetweenTwoDates(request, response);
			Map<String, Object> returnMap = new HashMap<String, Object>();
			returnMap.put("list", report);
			System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
			return toJson(returnMap);
			
		}
		//
		public String billcnlReportBetweenTwoDates(HttpServletRequest request,
				HttpServletResponse response) {
			System.out.println("In Controller");
			SaleReturnReportHelper helper=new SaleReturnReportHelper();
			
			List report = helper.billcnclReportBetweenTwoDates(request, response);
			Map<String, Object> returnMap = new HashMap<String, Object>();
			returnMap.put("list", report);
			System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
			return toJson(returnMap);
			
		}
	/////////category detail edit/////////////	
		public String updateCatDetails(HttpServletRequest request,HttpServletResponse response) 
		{
			
			System.out.println("IN CONTROLLER");
			CategoryDetailsHelper tch = new CategoryDetailsHelper();
			tch.editCat(request, response);
			return toJson("Data UpDated Successfully");

		}
		//
		public String delCatDetails(HttpServletRequest request,HttpServletResponse response) 
		{
			
			System.out.println("IN CONTROLLER");
			CategoryDetailsHelper tch = new CategoryDetailsHelper();
			tch.delCat(request, response);
			return toJson("Data Deleted Successfully");

		}
		//
		public String delproduct(HttpServletRequest request,HttpServletResponse response) 
		{
			
			System.out.println("IN CONTROLLER");
			ProductDetailsHelper tch = new ProductDetailsHelper();
			tch.delproduct(request, response);
			return toJson("Product Deleted Successfully");

		}
		//
		public String delsupplier(HttpServletRequest request,HttpServletResponse response) 
		{
			
			System.out.println("IN CONTROLLER");
			ProductDetailsHelper tch = new ProductDetailsHelper();
			tch.delsupp(request, response);
			return toJson("Supplier Deleted Successfully");

		}
		//
		public String delcust(HttpServletRequest request,HttpServletResponse response) 
		{
			
			System.out.println("IN CONTROLLER");
			ProductDetailsHelper tch = new ProductDetailsHelper();
			tch.delcust(request, response);
			return toJson("Customer Deleted Successfully");

		}
		public String delexp(HttpServletRequest request,HttpServletResponse response) 
		{
			
			System.out.println("IN CONTROLLER");
			ProductDetailsHelper tch = new ProductDetailsHelper();
			tch.delexp(request, response);
			return toJson("Expenditure Deleted Successfully");

		}
		//
		public String delbank(HttpServletRequest request,HttpServletResponse response) 
		{
			
			System.out.println("IN CONTROLLER");
			ProductDetailsHelper tch = new ProductDetailsHelper();
			tch.delbank(request, response);
			return toJson("Bank Details Deleted Successfully");

		}
		//
		public String delpartner(HttpServletRequest request,HttpServletResponse response) 
		{
			
			System.out.println("IN CONTROLLER");
			ProductDetailsHelper tch = new ProductDetailsHelper();
			tch.delpartner(request, response);
			return toJson("Partner Details Deleted Successfully");

		}
		
		public String delsubCatDetails(HttpServletRequest request,HttpServletResponse response) 
		{
			
			System.out.println("IN CONTROLLER");
			CategoryDetailsHelper tch = new CategoryDetailsHelper();
			tch.delsubCat(request, response);
			return toJson("Data Deleted Successfully");

		}
		
	/////////Sub category detail edit////////
		
		public String updateSubCatDetails(HttpServletRequest request,HttpServletResponse response) 
		{
			
			System.out.println("IN CONTROLLER");
			CategoryDetailsHelper tch = new CategoryDetailsHelper();
			tch.editsubCat(request, response);
			return toJson("Data UpDated Successfully");

		}
		
		public String getAllBillNoforSalereturn(HttpServletRequest request,
				HttpServletResponse response) {
			System.out.println("IN CONTROLLER");
			
			SaleReturnHelper catdh = new SaleReturnHelper();
			Map map=catdh.getAllbillNowithCustName(request);
			String xyz = toJson(map);
			System.out.println(xyz);
			return xyz;
		}
		
		public String getProductDetailsonBillNo(HttpServletRequest request,
				HttpServletResponse response) throws Exception{
			
			System.out.println("In controller for sale return data fetch for bill No");
			SaleReturnHelper helper = new SaleReturnHelper();
			Map returnMap = helper.getProductDetailsForBillNo(request, response);
			System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
			return toJson(returnMap);
		}
		
		//
		public String getProductcancelBillNo(HttpServletRequest request,
				HttpServletResponse response) throws Exception{
			
			System.out.println("In controller for sale return data fetch for bill No");
			SaleReturnHelper helper = new SaleReturnHelper();
			Map returnMap = helper.getProductcancelBillNo(request, response);
			System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
			return toJson(returnMap);
		}
		
		// Fetching Tax Details To Edit
		public String getTaxDetailsToEdit(HttpServletRequest request,
				HttpServletResponse response) {
			
			//String taxID = request.getParameter("taxID");
			//Long taxId = Long.parseLong(taxID);
			
			System.out.println("in controller product : ");
			
			TaxCreationHelper helper = new TaxCreationHelper();
			Map map = helper.getTaxDetailsForEdit(request);
			Map<String, List> returnMap = new HashMap<String, List>();
			String xyz = toJson(map);
			
			System.out.println(xyz);
			System.out.println("going out of controller");
			
			return xyz;
		}
		
		public String getCSGstPercentage(HttpServletRequest request,
				HttpServletResponse response) {
			
			ProductDetailsHelper helper=new ProductDetailsHelper();
			Map items = helper.getCSGstPercentage(request,response);
			String xyz = toJson(items);
			System.out.println(xyz);
			return xyz;
		}
		
		
		// Getting village/city as per customer in credit customer bill from
		// customer details table
		public String getChallanNoByCustomer(HttpServletRequest request, HttpServletResponse response)
		{
			String creditCustomerId = request.getParameter("creditCustomerId");
			challanHelper helper = new challanHelper();
			Map map = helper.getChallanNoByCustomerHelper(creditCustomerId);
			String xyz = toJson(map);
			System.out.println(xyz);
			return xyz;
		}
		
		// Adding fertilizer bill
		public String challanBillHelper(HttpServletRequest request, HttpServletResponse response) throws ParseException, Exception
		{
			System.out.println("IN CONTROLLER");
			challanHelper helper = new challanHelper();
			helper.challanBilling(request, response);
			return toJson("Data Added Successfully");
		}
		
		// Register Partner Details
		public String partnerDetails(HttpServletRequest request,
				HttpServletResponse response) {
			System.out.println("IN CONTROLLER");
			partnerDetailsHelper pdh = new partnerDetailsHelper();
			pdh.partnerDetails(request, response);
			return toJson("Data Added Successfully");
		}
		
		// Fetching Partner Details To Edit
		public String getPartnerDetailsToEdit(HttpServletRequest request,
				HttpServletResponse response) {
			
			System.out.println("in controller partnerId ");
			
			partnerDetailsHelper helper = new partnerDetailsHelper();
			Map map = helper.getPartnerDetailsForEdit(request);
			
			Map<String, List> returnMap = new HashMap<String, List>();
			String xyz = toJson(map);
			System.out.println(xyz);
			System.out.println("going out of controller");
			return xyz;
		}
		
		// update Partner details
		public String updatePartnerDetails(HttpServletRequest request,
				HttpServletResponse response) {
			System.out.println("In controller update Partner Details");
			partnerDetailsHelper helper = new partnerDetailsHelper();
			helper.editPartnerDetail(request, response);
			System.out.println("In controller UpdatePartner");
			return toJson("Data Updated Successfully");
		}
		
		// Registering Expenditure Payment
		public String regPartnerCashBook(HttpServletRequest request,
				HttpServletResponse response) {
			System.out.println("IN CONTROLLER");
			PartnerTransactionHelper helper = new PartnerTransactionHelper();
			helper.regPartnerPayment(request, response);
			return toJson("Data Added Successfully");
		}		
		
		// Expenditure payment report between two days as per name
		public String getPartnersTransactionAsPerExpName(HttpServletRequest request, HttpServletResponse response)
		{
			PartnerTransactionHelper helper = new PartnerTransactionHelper();
			List categories = helper.getPartnersTransactionsPerName(request, response);
			Map<String, List> returnMap = new HashMap<String, List>();
			returnMap.put("list", categories);
			System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
			return toJson(returnMap);
		}
		
		public String registerQuotationBill(HttpServletRequest request,	HttpServletResponse response) throws ParseException, Exception
		{
			System.out.println("IN CONTROLLER");
			QuotationBillHelper helper = new QuotationBillHelper();
			helper.registerQuotationBill(request, response);
			return toJson("Data Added Successfully");
		}
		
		// Adding non GST bill
		public String addingnonGSTBill(HttpServletRequest request,
				HttpServletResponse response) throws ParseException, Exception {
			System.out.println("IN CONTROLLER");
			FertilizerBillHelper helper = new FertilizerBillHelper();
			helper.addnonGSTBilling(request, response);
			return toJson("Data Added Successfully");
		}
		
		//Edit Good Receive Bill Number drop down getSubCategoryDetails
		public String getBillNumberSupplierWise(HttpServletRequest request,
				HttpServletResponse response) {
			
			System.out.println("IN CONTROLLER");
			
			EditGoodsReceiveHelper catdh = new EditGoodsReceiveHelper();
			Map map=catdh.getallbillnumber(request);
			String xyz = toJson(map);
			System.out.println(xyz);
			return xyz;
		}
		
		// Get product detail for edit goods receive 
		public String getAllBillDetailsForEditGoodsReceive(HttpServletRequest request, HttpServletResponse response)
		{		
			System.out.println("IN CONTOLLER");
							
			EditGoodsReceiveHelper helper = new EditGoodsReceiveHelper();
			Map items = helper.getAllBillDetailsForEditGoodsReceive(request);
			String xyz = toJson(items);
			System.out.println("Value of map item which we have sent to Json "+xyz);
			return xyz;
			
		}
		
		//get All Non grid content for edit good receive 
		public String getGoodReceiveForEditNonGrid(HttpServletRequest request, HttpServletResponse response)
		{		
			System.out.println("IN CONTROLLER");
			
			EditGoodsReceiveHelper helper = new EditGoodsReceiveHelper();
			Map items = helper.getBillDetailsForEditGoodReceiveNonGrid(request);
			String xyz = toJson(items);
			System.out.println("Value of map item which we have sent to Json "+xyz);
			return xyz;
		}
		
		//get All Non grid content for edit challan billing
		public String getChallanBillingForEditNonGrid(HttpServletRequest request, HttpServletResponse response)
		{		
			String challanNo = request.getParameter("challanNo");
			
			challanHelper helper = new challanHelper();
			Map items = helper.getChallanBillDetailsForEditCreditBillingNonGrid(challanNo);
			String xyz = toJson(items);
			System.out.println("Value of map item which we have sent to Json "+xyz);
			return xyz;
		}
		//get All Non grid content for edit Purchase Order 
		public String getPurchaseOrderForEditNonGrid(HttpServletRequest request, HttpServletResponse response)
		{		
			System.out.println("IN CONTROLLER");
						
			AdvanceBookingHelper helper = new AdvanceBookingHelper();
			Map items = helper.getBillDetailsForEditGoodReceiveNonGrid(request);
			String xyz = toJson(items);
			System.out.println("Value of map item which we have sent to Json "+xyz);
			return xyz;
		}
		
		// Update Goods Receive
		public String EditUpdateGoodsReceive(HttpServletRequest request,
				HttpServletResponse response) throws ParseException {
			System.out.println("IN CONTROLLER");
			EditGoodsReceiveHelper helper = new EditGoodsReceiveHelper();
			helper.UpdateGoodReceiveBill(request, response);
			return toJson("Goods Receive Upadated Successfully");
		}
		//drop down for expense name in master
		public String getExpenseName(HttpServletRequest request,
				HttpServletResponse response) {
			System.out.println("IN CONTROLLER");
			
			ExpenditureDetailsHelper catdh = new ExpenditureDetailsHelper();
			Map map=catdh.getExpenditureNames(request);
			String xyz = toJson(map);
			System.out.println(xyz);
			return xyz;
		}
		
		//drop down for expense name in cashbook
		public String getExpenseNameForPayment(HttpServletRequest request,
				HttpServletResponse response) {
			System.out.println("IN CONTROLLER");
			
			ExpenditureDetailsHelper catdh = new ExpenditureDetailsHelper();
			Map map=catdh.getExpenditureNamesforPayment(request);
			String xyz = toJson(map);
			System.out.println(xyz);
			return xyz;
		}
		
		// Expenditure payment report as per Expenditure Type Wise
		public String getExpenditurePaymentReportAsPerExpenditureType(
				HttpServletRequest request, HttpServletResponse response) {
			ExpenditurePaymentHelper helper = new ExpenditurePaymentHelper();
			List categories = helper.getExpensePaymentDetailByExpenditureType(request, response);
			Map<String, List> returnMap = new HashMap<String, List>();
			returnMap.put("list", categories);
			System.out.println("$$$$$$$$$$$$$$$$=====> " + returnMap);
			return toJson(returnMap);
		}
		
		// Register Customer Details
		public String addbankDetails(HttpServletRequest request,
				HttpServletResponse response) {
			System.out.println("IN CONTROLLER");
			BankDetailsHelper cdh = new BankDetailsHelper();
			cdh.bankDetailsAdd(request, response);
			return toJson("Data Added Successfully");
		}
		
		// bank details table
		public String getBankAccountNumberAndIFSCcode(
				HttpServletRequest request, HttpServletResponse response) {
			
			System.out.println("IN CONTROLLER");
			
			BankDetailsHelper helper = new BankDetailsHelper();
			Map map = helper.getaccountnoandifsc(request);
			String xyz = toJson(map);
			System.out.println(xyz);
			return xyz;
		}
		
		// Registering Expenditure Payment
		public String addBankPaymentCashBook(HttpServletRequest request,
				HttpServletResponse response) {
			System.out.println("IN CONTROLLER");
			BankPaymentHelper helper = new BankPaymentHelper();
			helper.regBankPayment(request, response);
			return toJson("Data Added Successfully");
		}
		
		//mail ID from supplier details table
		public String getMailIdbySupplierName(
				HttpServletRequest request, HttpServletResponse response) {
			
			System.out.println("IN CONTROLLER");
			
			SupplierDetailsHelper helper = new SupplierDetailsHelper();
			Map map = helper.getmailID(request);
			String xyz = toJson(map);
			System.out.println(xyz);
			return xyz;
		}
		
		//PO Number from supplier details table
		public String getPOnumberbySupplierName(
				HttpServletRequest request, HttpServletResponse response) {
			
			System.out.println("IN CONTROLLER");
			
			GoodsReceiveHelper helper = new GoodsReceiveHelper();
			Map map = helper.getPOnumber(request);
			String xyz = toJson(map);
			System.out.println(xyz);
			return xyz;
		}
		
		//gst Number from supplier details table
		
		public String getgstnumberbySupplierName(
				HttpServletRequest request, HttpServletResponse response) {
			
			System.out.println("IN CONTROLLER");
			
			GoodsReceiveHelper helper = new GoodsReceiveHelper();
			Map map = helper.getgstnumber(request);
			String xyz = toJson(map);
			System.out.println(xyz);
			return xyz;
		}
		
		// Bank payment report as per Bank Name
		public String getBankTransactionAsPerbankName(HttpServletRequest request, HttpServletResponse response)
		{
			BankPaymentHelper helper = new BankPaymentHelper();
			List categories = helper.getBankTransactionsPerbank(request, response);
			Map<String, List> returnMap = new HashMap<String, List>();
			returnMap.put("list", categories);
			System.out.println("##################" + returnMap);
			return toJson(returnMap);
		}
		
		// Purchase order report as per Supplier wise
		public String getPurchaseOrderAsPerSupplierWise(HttpServletRequest request,
				HttpServletResponse response) {
			PurchaseOrderHelper helper = new PurchaseOrderHelper();
			List categories = helper.getPurchaseOrderReportAsPerSupplierwise(request, response);
			Map<String, List> returnMap = null;
			if(categories.size()>0)
			{
				returnMap = new HashMap<String, List>();
				returnMap.put("list", categories);
				System.out.println("Purchase Order List " + returnMap);
			}
			else
			{
				return toJson("Data Not Available");
			}
			return toJson(returnMap);
		}
}
