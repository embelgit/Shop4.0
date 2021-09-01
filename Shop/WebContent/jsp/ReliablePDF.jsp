<%@page import="com.Fertilizer.utility.NumToWord"%>
<%@page import="com.itextpdf.text.log.SysoLogger"%>
<%@page import="java.text.DecimalFormat"%>
<%@page import="java.math.BigDecimal"%>
<%@page import="com.itextpdf.text.Rectangle"%>
<%@page import="com.itextpdf.text.BaseColor"%>
<%@page import="com.itextpdf.text.Font"%>
<%@page import="com.itextpdf.text.FontFactory"%>
<%@page import="java.util.Formatter"%>
<%@page import="javax.sound.midi.Soundbank"%>
<%@page import="com.itextpdf.text.pdf.codec.Base64.OutputStream"%>
<%@page import="java.util.Date"%>
<%@page import="java.io.IOException"%>
<%@page import="com.itextpdf.text.DocumentException"%>
<%@page import="com.itextpdf.text.Paragraph"%>
<%@page import="com.itextpdf.text.pdf.PdfWriter"%>
<%@page import="com.itextpdf.text.Document"%>
<%@page trimDirectiveWhitespaces="true"%>
<%@page import="java.util.Date"%>
<%@page import="java.io.IOException"%>
<%@page import="com.itextpdf.text.DocumentException"%>
<%@page import="com.itextpdf.text.Paragraph"%>
<%@page import="com.itextpdf.text.pdf.PdfWriter"%>
<%@page import="com.itextpdf.text.Document"%>
<%@page import="java.sql.DriverManager"%>
<%@page import="java.sql.Connection"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.Statement"%>
<%@page import="java.awt.Desktop"%>
<%@page import="java.io.File"%>
<%@page import="com.itextpdf.text.pdf.PdfPCell"%>
<%@page import="com.itextpdf.text.pdf.PdfPTable"%>
<%@page import="com.itextpdf.text.Paragraph"%>
<%@page import="java.io.FileOutputStream"%>
<%@page import="com.itextpdf.text.PageSize"%>
<%@page import="com.itextpdf.text.pdf.PdfWriter"%>
<%@page import="java.util.List"%>
<%@ page import="com.itextpdf.text.Element"%>
<%@page import="java.util.List"%>
<%@page import="java.util.TimeZone"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="com.itextpdf.text.Phrase"%>
<%@page import="java.util.Calendar"%>
<%@page import="java.util.Date"%>
<%@page import="com.itextpdf.text.Image"%>
<%@page import="com.itextpdf.text.pdf.PdfContentByte"%>
<%@page import="com.itextpdf.text.Image"%>
<%@page import="com.itextpdf.text.pdf.PdfContentByte"%>
<%@page import="com.itextpdf.text.pdf.PdfGState"%>
<%@page import="com.Fertilizer.utility.PropertiesHelper"%>
<%

response.setContentType("application/pdf");

response.setContentType("application/pdf");
Long billno = (Long) session.getAttribute("fertilizerBillNo");
String onlyShopName = (String) session.getAttribute("onlyShopName");  
 
//System.out.println("ln no ==>66 Bill No ===> "+billno+" Custmor Name ===> "+creditCustomerName);
 

int a = 1;
double sum = 0.0;
double tax = 0.0;
String taxVal = "";
double swachaTax = 0.0;
double groTOT = 0.0;
String xx1 = "";
String ShopName = "";
double iGST = 0d;
double GST = 0d;
double ShopId = 0d;
double gstTotal =0d;
double igstTotal =0d;
double gstTotal1 =0d;
double igstTotal1 =0d;
double discount=0d;
double net_pay_amount=0d;
double sale=0d;
double tota=0d;
int b = 1;
/* Double discount=0d; */
String grossT = "";
String description = "";

Connection conn = null;

try {

	// step 1
	Document document = new Document(PageSize.A7);
	document.setMargins(5 , 5 , 10 , 0);

	// step 2

	PdfWriter.getInstance(document, response.getOutputStream());

	// step 3
	document.open();

	Class.forName("com.mysql.jdbc.Driver");
	conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/shop", "root", "root");
	Statement stmt = conn.createStatement();

	//ResultSet rs = stmt.executeQuery("select product_name,village,sale_price,total_amount from fertilizer_bill WHERE customerBill=" + billno);

	//ResultSet rs = stmt.executeQuery("select fertilizer_bill.product_name,village, manufacturing_company, fertilizer_bill.weight, quantity, fertilizer_bill.sale_price, total_amount, total_amount,expenses,gross_total from fertilizer_bill left join product_details on fertilizer_bill.fk_product_id = product_details.pk_product_id where fertilizer_bill.customerBill =" + 166); 	
	//ResultSet rs = stmt.executeQuery("select fk_customer_id, bill_no, customer_name, credit_customer_name, fertilizer_billing.product_name, fertilizer_billing.village, fertilizer_billing.company, fertilizer_billing.weight, fertilizer_billing.Without_Tax_Rate, fertilizer_billing.total_per_product, fertilizer_billing.total_all_product, fertilizer_billing.hamali_expense, fertilizer_billing.gross_total, fertilizer_billing.tax_percentage,fertilizer_billing.hsn,fertilizer_billing.igstPercentage,fertilizer_billing.fk_shop_id, s.shop_name,fertilizer_billing.Discount_amount ,fertilizer_billing.sale_price, fertilizer_billing.kg, fertilizer_billing.grams, fertilizer_billing.unit, fertilizer_billing.ltr, fertilizer_billing.mili, fertilizer_billing.quantity, fertilizer_billing.total_per_product, fertilizer_billing.kg, fertilizer_billing.grams, fertilizer_billing.ltr, fertilizer_billing.mili, fertilizer_billing.contact_number, fertilizer_billing.GST_No, s.address, fertilizer_billing.saleDate, fertilizer_billing.freeQuantity, fertilizer_billing.net_pay_amount, fertilizer_billing.discount_per_product_perc from fertilizer_billing left join shop_details s on fk_shop_id=pk_shop_id where bill_no = "+billno);
	ResultSet rs = stmt.executeQuery("select fk_customer_id, bill_no, customer_name, credit_customer_name, fb.product_name, fb.village, fb.company, fb.weight, fb.Without_Tax_Rate, fb.total_per_product, fb.total_all_product, fb.hamali_expense, fb.gross_total, fb.tax_percentage, fb.hsn,fb.igstPercentage, fb.fk_shop_id, s.shop_name,fb.Discount_amount ,fb.sale_price, fb.kg, fb.grams, fb.unit, fb.ltr, fb.mili, fb.quantity, fb.total_per_product, fb.kg, fb.grams, fb.ltr, fb.mili, fb.contact_number, fb.GST_No, s.address, fb.saleDate, fb.freeQuantity, fb.net_pay_amount, fb.discount_per_product_perc, fb.description,fb.Tax_amount,fb.cust_type from fertilizer_billing fb left join shop_details s on fk_shop_id=pk_shop_id where bill_no = " +billno);
	
	rs.first();

		System.out.println("Query Execute");
		
		String SaleDate = rs.getString("saleDate");
		SimpleDateFormat dateFormater = new SimpleDateFormat("yyyy-MM-dd");
		Date StrBillDate = dateFormater.parse(SaleDate);
		
		SimpleDateFormat dateFormaterForddMMYYYY = new SimpleDateFormat("dd-MM-yyyy");
		String billSaleDate = dateFormaterForddMMYYYY.format(StrBillDate);

		DecimalFormat df = new DecimalFormat("#.00");

		Font font15Bold = new Font(Font.FontFamily.TIMES_ROMAN, 15, Font.BOLD, BaseColor.BLACK);
		Font font15BoldUnderline = new Font(Font.FontFamily.TIMES_ROMAN, 15, Font.BOLD | Font.UNDERLINE,BaseColor.BLACK);
		Font font12 = new Font(Font.FontFamily.TIMES_ROMAN, 12, Font.BOLD, BaseColor.BLACK);
		Font font11 = new Font(Font.FontFamily.TIMES_ROMAN, 11, Font.BOLD, BaseColor.BLACK);
		Font font12NoBold = new Font(Font.FontFamily.TIMES_ROMAN, 12, Font.NORMAL, BaseColor.BLACK);
		Font font8NoBold = new Font(Font.FontFamily.TIMES_ROMAN, 8, Font.NORMAL, BaseColor.BLACK);
		Font font9NoBold = new Font(Font.FontFamily.TIMES_ROMAN, 9, Font.NORMAL, BaseColor.BLACK);
		Font font10NoBold = new Font(Font.FontFamily.TIMES_ROMAN, 10, Font.NORMAL, BaseColor.BLACK);
		Font font12BoldUnderline = new Font(Font.FontFamily.TIMES_ROMAN, 12, Font.BOLD | Font.UNDERLINE,BaseColor.BLACK);
		Font font17 = new Font(Font.FontFamily.TIMES_ROMAN, 17, Font.BOLD, BaseColor.BLACK);
		Font font13 = new Font(Font.FontFamily.TIMES_ROMAN, 13, Font.BOLD, BaseColor.BLACK);
		Font font13Bold = new Font(Font.FontFamily.TIMES_ROMAN, 13, Font.BOLD, BaseColor.BLACK);
		Font Normalfont11 = new Font(Font.FontFamily.TIMES_ROMAN, 11, Font.NORMAL, BaseColor.BLACK);
		Font Normalfont13 = new Font(Font.FontFamily.TIMES_ROMAN, 13, Font.NORMAL, BaseColor.BLACK);
		Font Normalfont14 = new Font(Font.FontFamily.TIMES_ROMAN, 14, Font.NORMAL, BaseColor.BLACK);
		Font ufont14 = new Font(Font.FontFamily.TIMES_ROMAN, 14, Font.UNDERLINE, BaseColor.BLACK);

		Font font9 = new Font(Font.FontFamily.TIMES_ROMAN, 9, Font.NORMAL, BaseColor.BLACK);
		Font font9Bold = new Font(Font.FontFamily.TIMES_ROMAN, 9, Font.BOLD, BaseColor.BLACK);
		Font font10 = new Font(Font.FontFamily.TIMES_ROMAN, 10, Font.NORMAL, BaseColor.BLACK);
		Font font10Bold = new Font(Font.FontFamily.TIMES_ROMAN, 10, Font.BOLD, BaseColor.BLACK);
		
		// step 4

		PdfPTable table = new PdfPTable(3);
		table.setWidthPercentage(100);

		float[] columnWidths = { 0.3f, 0.2f, 0.2f };
		table.setWidths(columnWidths);
		
		double hamaliExpense = rs.getDouble("hamali_expense");
		discount = rs.getDouble("Discount_amount");		
		PdfPCell table_cell;
		
	    net_pay_amount = rs.getDouble("net_pay_amount");
		ShopId = rs.getDouble("fk_shop_id");
		ShopName = rs.getString("shop_name");
		String shopAddress = rs.getString("address");
		Long shopPrBillno = rs.getLong("bill_no");
		Long mobileNo = rs.getLong("contact_number");
		String gstNo = rs.getString("GST_No");
		String customer_name = rs.getString("customer_name");
		String credit_customer_name = rs.getString("credit_customer_name");
		Long fk_customer_id = rs.getLong("fk_customer_id");
		
		String cust = rs.getString("cust_type");
		
		
			table_cell = new PdfPCell(new Phrase("", font11));
			table_cell.setBorder(table_cell.NO_BORDER);
			table_cell.setHorizontalAlignment(Element.ALIGN_LEFT);
			table.addCell(table_cell);
			
			table_cell = new PdfPCell(new Phrase("Tax Invoice", font13));
			table_cell.setBorder(table_cell.NO_BORDER);
			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
			table.addCell(table_cell);
	
			table_cell = new PdfPCell(new Phrase("",font9NoBold));
			table_cell.setBorder(table_cell.NO_BORDER);
			table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table.addCell(table_cell);
			
			table_cell = new PdfPCell(new Phrase("", font9NoBold));
			table_cell.setBorder(table_cell.NO_BORDER);
			table_cell.setHorizontalAlignment(Element.ALIGN_LEFT);
			table.addCell(table_cell);
			
			table_cell = new PdfPCell(new Phrase("", font9NoBold));
			table_cell.setBorder(table_cell.NO_BORDER);
			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
			table.addCell(table_cell);
	
			table_cell = new PdfPCell(new Phrase("(ORIGINAL FOR )",font9NoBold));
			table_cell.setBorder(table_cell.NO_BORDER);
			table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table.addCell(table_cell);
			
			table_cell = new PdfPCell(new Phrase("", font9NoBold));
			table_cell.setBorder(table_cell.BOTTOM);
			table_cell.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell.setPaddingTop(2f);
			table.addCell(table_cell);
			
			table_cell = new PdfPCell(new Phrase("", Normalfont11));
			table_cell.setBorder(table_cell.BOTTOM);
			table_cell.setPaddingTop(2f);
			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
			table.addCell(table_cell);	
	
			table_cell = new PdfPCell(new Phrase("", font9NoBold));
			table_cell.setBorder(table_cell.BOTTOM);
			table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table.addCell(table_cell);
				
	
		document.add(table);

	
		PdfPTable headertable22 = new PdfPTable(3);
		headertable22.setWidthPercentage(100);

		float[] HeadercolumnWidths22 = { 0.3f,0.2f,0.2f };
		headertable22.setWidths(HeadercolumnWidths22);

		PdfPCell headerTable_cell22;

		
//		headerTable_cell22 = new PdfPCell(new Phrase("GMC Marketing (Bhosari) 2019-20 \n Plot no 65/B T-block \n Village Bhosari \n MIDC Bhosari \n Haveli, Pune 411026 \n GSTIN/UIN no. \n State Name : Maharashtra  Code : 27", Normalfont11));
		headerTable_cell22 = new PdfPCell(new Phrase("Reliable Mart \nCommitted for Best Quality \nPhone No. 7558528876 / 9970045216"));
		headerTable_cell22.setHorizontalAlignment(Element.ALIGN_LEFT);
		headerTable_cell22.setPaddingBottom(10);
		headerTable_cell22.setPaddingTop(10);
		headerTable_cell22.setPaddingLeft(4);
		headerTable_cell22.setBorder(Rectangle.RIGHT | Rectangle.LEFT | Rectangle.BOTTOM | Rectangle.TOP);
		headertable22.addCell(headerTable_cell22); 
		
/* 	headerTable_cell22.setHorizontalAlignment(Element.ALIGN_CENTER);
	headerTable_cell22.setBorder(Rectangle.RIGHT | Rectangle.LEFT | Rectangle.BOTTOM | Rectangle.TOP);
	headertable22.addCell(headerTable_cell22);	 */

	
  		headerTable_cell22 = new PdfPCell(new Phrase("INVOICE NO. "+billno+" \n\n Delivery Note : "+" \n\n\n Supplier's Ref."+" \n", Normalfont11));
		headerTable_cell22.setHorizontalAlignment(Element.ALIGN_LEFT);
		headerTable_cell22.setPaddingBottom(10);
		headerTable_cell22.setPaddingTop(10);
		headerTable_cell22.setBorder(Rectangle.RIGHT | Rectangle.LEFT | Rectangle.BOTTOM | Rectangle.TOP);
		headertable22.addCell(headerTable_cell22);  

		headerTable_cell22 = new PdfPCell(new Phrase("Dated "+billSaleDate+"\n\nMode/Terms of Payment : Not Applicable "+" \n\n Other Reference(s) \n",Normalfont11));
		headerTable_cell22.setHorizontalAlignment(Element.ALIGN_LEFT);
		headerTable_cell22.setPaddingBottom(10);
		headerTable_cell22.setPaddingTop(10);
		headerTable_cell22.setBorder(Rectangle.RIGHT | Rectangle.BOTTOM | Rectangle.TOP);
		headertable22.addCell(headerTable_cell22);
		
		
		/* 	headerTable_cell22 = new PdfPCell(new Phrase("", font13Bold));
		headerTable_cell22.setHorizontalAlignment(Element.ALIGN_RIGHT);
		headerTable_cell22.setPaddingBottom(2);
		headerTable_cell22.setBorder(Rectangle.NO_BORDER);
		headertable22.addCell(headerTable_cell22); 
 */
/* 		headerTable_cell22 = new PdfPCell(new Phrase(""));
		headerTable_cell22.setHorizontalAlignment(Element.ALIGN_CENTER);
		headerTable_cell22.setPaddingBottom(2);
		headerTable_cell22.setBorder(Rectangle.NO_BORDER);
		headertable22.addCell(headerTable_cell22); */



		
/* 
		
		headerTable_cell22 = new PdfPCell(new Phrase(""));
		headerTable_cell22.setHorizontalAlignment(Element.ALIGN_CENTER);
		headerTable_cell22.setBorderWidth(0.5f);
		headerTable_cell22.setPaddingBottom(2);
		headerTable_cell22.setBorder(Rectangle.BOTTOM);
		headertable22.addCell(headerTable_cell22); */
		
/*  		headerTable_cell22 = new PdfPCell(new Phrase(""));
		headerTable_cell22.setHorizontalAlignment(Element.ALIGN_CENTER);
		headerTable_cell22.setPaddingBottom(4);
//		headerTable_cell22.setBorder(Rectangle.NO_BORDER);
		headertable22.addCell(headerTable_cell22);  */
		document.add(headertable22);
		
		
		
		PdfPTable headertable22a = new PdfPTable(3);
		headertable22a.setWidthPercentage(100);

		float[] HeadercolumnWidths22a = { 0.7f,0.3f,0.3f };
		headertable22a.setWidths(HeadercolumnWidths22a);

		PdfPCell headerTable_cell22a;

		if(cust.equals("Cash")){
		
//		headerTable_cell22a = new PdfPCell(new Phrase("Buyer \n4 Wheelers \n SHOP NO.12 GROUND FLOOR, AVDHUT ARCADE, \nS.NO 3 & 4 VADGAON BK \nPUNE - 411041 \n GSTIN/UIN no. \n State Name : Maharashtra  Code : 27", Normalfont11));
		headerTable_cell22a = new PdfPCell(new Phrase(customer_name));		
		headerTable_cell22a.setHorizontalAlignment(Element.ALIGN_LEFT);
		headerTable_cell22a.setPaddingBottom(10);
		headerTable_cell22a.setPaddingTop(10);
		headerTable_cell22a.setPaddingLeft(4);
		headerTable_cell22a.setBorder(Rectangle.RIGHT | Rectangle.LEFT | Rectangle.BOTTOM | Rectangle.TOP);
		headertable22a.addCell(headerTable_cell22a); 
		}
		
		else{
		//	headerTable_cell22a = new PdfPCell(new Phrase("Buyer \n4 Wheelers \n SHOP NO.12 GROUND FLOOR, AVDHUT ARCADE, \nS.NO 3 & 4 VADGAON BK \nPUNE - 411041 \n GSTIN/UIN no. \n State Name : Maharashtra  Code : 27", Normalfont11));
			headerTable_cell22a = new PdfPCell(new Phrase(credit_customer_name));
			headerTable_cell22a.setHorizontalAlignment(Element.ALIGN_LEFT);
			headerTable_cell22a.setPaddingBottom(10);
			headerTable_cell22a.setPaddingTop(10);
			headerTable_cell22a.setPaddingLeft(4);
			headerTable_cell22a.setBorder(Rectangle.RIGHT | Rectangle.LEFT | Rectangle.BOTTOM | Rectangle.TOP);
			headertable22a.addCell(headerTable_cell22a); 
		}

//		headerTable_cell22a = new PdfPCell(new Phrase(" Buyer Order No. \n\n Despatch Document No. \n\n Despatch through  ", Normalfont11));
		headerTable_cell22a = new PdfPCell(new Phrase(""));
		headerTable_cell22a.setHorizontalAlignment(Element.ALIGN_LEFT);
		headerTable_cell22a.setPaddingBottom(10);
		headerTable_cell22a.setPaddingTop(10);
		headerTable_cell22a.setBorder(Rectangle.RIGHT | Rectangle.LEFT | Rectangle.BOTTOM | Rectangle.TOP);
		headertable22a.addCell(headerTable_cell22a);  

		headerTable_cell22a = new PdfPCell(new Phrase(""));
		headerTable_cell22a.setHorizontalAlignment(Element.ALIGN_LEFT);
		headerTable_cell22a.setPaddingBottom(10);
		headerTable_cell22a.setPaddingTop(10);
		headerTable_cell22a.setBorder(Rectangle.RIGHT | Rectangle.BOTTOM | Rectangle.TOP);
		headertable22a.addCell(headerTable_cell22a);
		
		document.add(headertable22a);
		
		
		
/* 		PdfPTable headertable22aa = new PdfPTable(3);
		headertable22aa.setWidthPercentage(100);

		float[] HeadercolumnWidths22aa = { 0.7f,0.3f,0.3f };
		headertable22aa.setWidths(HeadercolumnWidths22aa);

		PdfPCell headerTable_cell22aa;

		
		headerTable_cell22aa = new PdfPCell(new Phrase(""));
		headerTable_cell22aa.setHorizontalAlignment(Element.ALIGN_LEFT);
		headerTable_cell22aa.setPaddingBottom(40);
		headerTable_cell22aa.setPaddingTop(2);
		headerTable_cell22aa.setBorder(Rectangle.RIGHT | Rectangle.LEFT | Rectangle.BOTTOM | Rectangle.TOP);
		headertable22aa.addCell(headerTable_cell22aa); 
		
  		headerTable_cell22aa = new PdfPCell(new Phrase(" Terms of Delivery ", Normalfont11));
		headerTable_cell22aa.setHorizontalAlignment(Element.ALIGN_LEFT);
		headerTable_cell22aa.setPaddingBottom(40);
		headerTable_cell22aa.setPaddingTop(2);
		headerTable_cell22aa.setBorder(Rectangle.LEFT | Rectangle.BOTTOM | Rectangle.TOP);
		headertable22aa.addCell(headerTable_cell22aa);  

		headerTable_cell22aa = new PdfPCell(new Phrase("",font12NoBold));
		headerTable_cell22aa.setHorizontalAlignment(Element.ALIGN_LEFT);
		headerTable_cell22aa.setPaddingBottom(40);
		headerTable_cell22aa.setPaddingTop(2);
		headerTable_cell22aa.setBorder(Rectangle.RIGHT | Rectangle.BOTTOM | Rectangle.TOP);
		headertable22aa.addCell(headerTable_cell22aa);
		
		document.add(headertable22aa); */
		
		
		
		/* table for customer name, village and date */

/* 		PdfPTable smallTable = new PdfPTable(3);
		smallTable.setWidthPercentage(100);
		float[] smallTablecolumnWidths = { 0.3f, 0.3f, 0.2f };
		smallTable.setWidths(smallTablecolumnWidths);

		PdfPCell table_cell2;

		String custName;

	 	if (customer_name.equals("N/A")) {
			custName = credit_customer_name;
		} else {
			custName = customer_name;
		} 
		
		table_cell2 = new PdfPCell(new Phrase("Customer Name : "+custName, font11));
		table_cell2.setBorder(table_cell2.NO_BORDER);
		smallTable.addCell(table_cell2);
		
//		table_cell2 = new PdfPCell(new Phrase("" + rs.getString("village")));
/*		table_cell2.setBorder(table_cell2.NO_BORDER);
		table_cell2.setHorizontalAlignment(Element.ALIGN_CENTER);
		smallTable.addCell(table_cell2);
		
		table_cell2 = new PdfPCell(new Phrase("Date: " + billSaleDate));
		table_cell2.setBorder(table_cell2.NO_BORDER);
		table_cell2.setHorizontalAlignment(Element.ALIGN_RIGHT);
		smallTable.addCell(table_cell2);
		

		document.add(smallTable);*/
 ///		document.add(new Paragraph(""));

		/* String expenses = String.valueOf(rs.getString("transportation_expense"));
		String HamaliExpence = String.valueOf(rs.getString("hamali_expense"));*/
		String gross_total = String.valueOf(rs.getString("gross_total"));
				
		//Heading Info table
		PdfPTable table3 = new PdfPTable(9);
		table3.setWidthPercentage(100);
//0.4f, 0.3f,0.3f, 0.2f, 0.3f, 0.3f
		float[] columnWidths3 = { 1.2f,0.2f, 0.15f, 0.15f, 0.15f, 0.2f, 0.2f, 0.15f, 0.3f};
		table3.setWidths(columnWidths3);

		PdfPCell table_cell3;
//		PdfPCell table_cell;
		rs.beforeFirst();
	
		table_cell3 = new PdfPCell(new Phrase("Product Name", font10NoBold));
		table_cell3.setBorderWidth(1f);
		table_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell3.setBorder(Rectangle.TOP | Rectangle.LEFT | Rectangle.RIGHT);
		table_cell3.setPaddingTop(1f);
		table_cell3.setPaddingBottom(1f);
		table3.addCell(table_cell3);

		/* table_cell3 = new PdfPCell(new Phrase("Company", font10NoBold));
		table_cell3.setBorderWidth(1f);
		table_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell3.setBorder(table_cell3.NO_BORDER);
		table_cell3.setPaddingTop(1f);
		table_cell3.setPaddingBottom(1f);
		table3.addCell(table_cell3); */
		
		table_cell3 = new PdfPCell(new Phrase("HSN", font10NoBold));
		table_cell3.setBorderWidth(1f);
		table_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell3.setBorder(Rectangle.TOP | Rectangle.LEFT | Rectangle.RIGHT);
		table_cell3.setPaddingTop(1f);
		table_cell3.setPaddingBottom(1f);
		table3.addCell(table_cell3); 

		table_cell3 = new PdfPCell(new Phrase("GST %", font10NoBold));
		table_cell3.setBorderWidth(1f);
		table_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell3.setBorder(Rectangle.TOP | Rectangle.LEFT | Rectangle.RIGHT);
		table_cell3.setPaddingTop(1f);
		table_cell3.setPaddingBottom(1f);
		table3.addCell(table_cell3);
		
		table_cell3 = new PdfPCell(new Phrase("IGST %", font10NoBold));
		table_cell3.setBorderWidth(1f);
		table_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell3.setBorder(Rectangle.TOP | Rectangle.LEFT | Rectangle.RIGHT);
		table_cell3.setPaddingTop(1f);
		table_cell3.setPaddingBottom(1f);
		table3.addCell(table_cell3);

		table_cell3 = new PdfPCell(new Phrase("Qty", font10NoBold));
		table_cell3.setBorderWidth(1f);
		table_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell3.setBorder(Rectangle.TOP | Rectangle.LEFT | Rectangle.RIGHT);
		table_cell3.setPaddingTop(1f);
		table_cell3.setPaddingBottom(1f);
		table3.addCell(table_cell3);

		table_cell3 = new PdfPCell(new Phrase("Rate", font10NoBold));
		table_cell3.setBorderWidth(1f);
		table_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell3.setPaddingBottom(3f);
		table_cell3.setBorder(Rectangle.TOP | Rectangle.LEFT | Rectangle.RIGHT);
		table3.addCell(table_cell3);
		
		table_cell3 = new PdfPCell(new Phrase("Unit", font10NoBold));
		table_cell3.setBorderWidth(1f);
		table_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell3.setBorder(Rectangle.TOP | Rectangle.LEFT | Rectangle.RIGHT);
		table_cell3.setPaddingTop(1f);
		table_cell3.setPaddingBottom(1f);
		table3.addCell(table_cell3);
		
		table_cell3 = new PdfPCell(new Phrase("Disc. %", font10NoBold));
		table_cell3.setBorderWidth(1f);
		table_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell3.setBorder(Rectangle.TOP | Rectangle.LEFT | Rectangle.RIGHT);
		table_cell3.setPaddingTop(1f);
		table_cell3.setPaddingBottom(1f);
		table3.addCell(table_cell3);
		
/* 	commit	table_cell3 = new PdfPCell(new Phrase("HSN", font10NoBold));
		table_cell3.setBorderWidth(1f);
		table_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell3.setBorder(Rectangle.TOP | Rectangle.LEFT | Rectangle.RIGHT);
		table_cell3.setPaddingTop(1f);
		table_cell3.setPaddingBottom(1f);
		table3.addCell(table_cell3); */

		
		
		/* table_cell3 = new PdfPCell(new Phrase("Pkg", font10NoBold));
		table_cell3.setBorderWidth(1f);
		table_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell3.setBorder(table_cell3.NO_BORDER);
		table_cell3.setPaddingTop(1f);
		table_cell3.setPaddingBottom(1f);
		table3.addCell(table_cell3); */
		



		
/* 	commit	table_cell3 = new PdfPCell(new Phrase("Price(gst)", font10NoBold));
		table_cell3.setBorderWidth(1f);
		table_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell3.setBorder(Rectangle.TOP | Rectangle.LEFT | Rectangle.RIGHT);
		table_cell3.setPaddingTop(1f);
		table_cell3.setPaddingBottom(1f);
		table3.addCell(table_cell3); */
		
		/* table_cell3 = new PdfPCell(new Phrase("Qty", font10NoBold));
		table_cell3.setBorderWidth(1f);
		table_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell3.setBorder(table_cell3.NO_BORDER);
		table_cell3.setPaddingTop(1f);
		table_cell3.setPaddingBottom(1f);
		table3.addCell(table_cell3); */


		


		table_cell3 = new PdfPCell(new Phrase("Amount", font10NoBold));
		table_cell3.setBorderWidth(1f);
		table_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell3.setPaddingBottom(3f);
		table_cell3.setBorder(Rectangle.TOP | Rectangle.LEFT | Rectangle.RIGHT);
		table3.addCell(table_cell3);
 
/* 		table_cell3 = new PdfPCell(new Phrase(""));
		table_cell3.setBorder(table_cell3.NO_BORDER);
		table_cell3.setBorderWidth(1f);
		table3.addCell(table_cell3);
		
		table_cell3 = new PdfPCell(new Phrase(""));
		table_cell3.setBorder(table_cell3.NO_BORDER);
		table_cell3.setBorderWidth(1f);
		table3.addCell(table_cell3);
		
		table_cell3 = new PdfPCell(new Phrase(""));
		table_cell3.setBorder(table_cell3.NO_BORDER);
		table_cell3.setBorderWidth(1f);
		table3.addCell(table_cell3);

		table_cell3 = new PdfPCell(new Phrase(""));
		table_cell3.setBorder(table_cell3.NO_BORDER);
		table_cell3.setBorderWidth(1f);
		table3.addCell(table_cell3);

		table_cell3 = new PdfPCell(new Phrase(""));
		table_cell3.setBorder(table_cell3.NO_BORDER);
		table_cell3.setBorderWidth(1f);
		table3.addCell(table_cell3);

		table_cell3 = new PdfPCell(new Phrase(""));
		table_cell3.setBorder(table_cell3.NO_BORDER);
		table_cell3.setBorderWidth(1f);
		table3.addCell(table_cell3);

		table_cell3 = new PdfPCell(new Phrase(""));
		table_cell3.setBorder(table_cell3.NO_BORDER);
		table_cell3.setBorderWidth(1f);
		table3.addCell(table_cell3);

		table_cell3 = new PdfPCell(new Phrase(""));
		table_cell3.setBorder(table_cell3.NO_BORDER);
		table_cell3.setBorderWidth(1f);
		table3.addCell(table_cell3);
		document.add(table3);
 */		
		
/* 		table_cell3 = new PdfPCell(new Phrase(""));
		table_cell3.setBorder(table_cell3.NO_BORDER);
		table_cell3.setBorderWidth(1f);
		table3.addCell(table_cell3);

		table_cell3 = new PdfPCell(new Phrase(""));
		table_cell3.setBorder(table_cell3.NO_BORDER);
		table_cell3.setBorderWidth(1f);
		table3.addCell(table_cell3); */
 


		//table for particulars

/*  		PdfPTable table4 = new PdfPTable(8);
		table4.setWidthPercentage(100);

		float[] columnWidths4 = { 1.2f, 0.15f, 0.15f, 0.15f, 0.2f, 0.2f, 0.15f, 0.3f};
		table4.setWidths(columnWidths4); */
/*
		PdfPTable table5 = new PdfPTable(8);
		table5.setWidthPercentage(100);

		float[] columnWidths5 = { 1.2f, 0.15f, 0.15f, 0.15f, 0.2f, 0.2f, 0.15f, 0.3f};
		table5.setWidths(columnWidths5);

		PdfPTable table6 = new PdfPTable(8);
		table6.setWidthPercentage(100);

		float[] columnWidths6 = { 1.2f, 0.15f, 0.15f, 0.15f, 0.2f, 0.2f, 0.15f, 0.3f};
		table6.setWidths(columnWidths6);
*/
	 	PdfPCell table_cell4; 
		rs.beforeFirst();

		PdfPCell cell1 = new PdfPCell(new Paragraph(""));
		PdfPCell cell2 = new PdfPCell(new Paragraph(""));
		PdfPCell cell3 = new PdfPCell(new Paragraph(""));
		PdfPCell cell4 = new PdfPCell(new Paragraph(""));
		PdfPCell cell5 = new PdfPCell(new Paragraph(""));
		PdfPCell cell6 = new PdfPCell(new Paragraph(""));
		PdfPCell cell7 = new PdfPCell(new Paragraph(""));
		PdfPCell cell8 = new PdfPCell(new Paragraph(""));
 		PdfPCell cell9 = new PdfPCell(new Paragraph(""));
/*		PdfPCell cell10 = new PdfPCell(new Paragraph("")); */
		
		 
		table3.addCell(cell1);
		table3.addCell(cell2);
		table3.addCell(cell3);
		table3.addCell(cell4);
		table3.addCell(cell5);
		table3.addCell(cell6);
		table3.addCell(cell7);
		table3.addCell(cell8); 
		table3.addCell(cell9);
//		table4.addCell(cell10);

/* 	 	table5.addCell(cell1);
		table5.addCell(cell2);
		table5.addCell(cell3);
		table5.addCell(cell4);
		table5.addCell(cell5);
		table5.addCell(cell6);
		table5.addCell(cell7);
		table5.addCell(cell8);
		table5.addCell(cell9);
		table5.addCell(cell10);

		table6.addCell(cell1);
		table6.addCell(cell2);
		table6.addCell(cell3);
		table6.addCell(cell4);
		table6.addCell(cell5);
		table6.addCell(cell6);
		table6.addCell(cell7);
		table6.addCell(cell8);
		table6.addCell(cell9);
		table6.addCell(cell10); */
		Double tots  = 0.0;
		
		Double gsts = 0.0;
		long gstst =0l;
		Double gs = 0.0;
		
		while (rs.next())
		{
			description = rs.getString("description");
//			if (b < 80)
//			{
				System.out.println("ln no 519 ==> when b<10");
				System.out.println("ln no 520 == VALUE OF ==> b "+b);

				String product_name = rs.getString("product_name");
				System.out.println("Product name == "+product_name);
 				table_cell3 = new PdfPCell(new Phrase(product_name, font9NoBold));
				table_cell3.setHorizontalAlignment(Element.ALIGN_LEFT);
				table_cell3.setBorder(Rectangle.LEFT | Rectangle.RIGHT );
				table_cell3.setBorderWidth(1f);
				table_cell3.setPaddingTop(2);
				table_cell3.setPaddingLeft(10);
				table_cell3.setPaddingBottom(2);
				table3.addCell(table_cell3);

				String hsnNumber = rs.getString("hsn");
				System.out.println("hsnNumber name == "+hsnNumber);
				table_cell3 = new PdfPCell(new Phrase(hsnNumber, font9NoBold));
				table_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
				table_cell3.setBorder(Rectangle.RIGHT );
				table_cell3.setBorderWidth(1f);
				table_cell3.setPaddingTop(2);
				table_cell3.setPaddingBottom(2);
				table3.addCell(table_cell3);
				
				
		/* 		String manufacturing_company = rs.getString("company");
				System.out.println("manufacturing_company name == "+manufacturing_company);
				table_cell4 = new PdfPCell(new Phrase(manufacturing_company, font9NoBold));
				table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
				table_cell4.setBorder(table_cell4.NO_BORDER);
				table_cell4.setBorderWidth(1f);
				table_cell4.setPaddingTop(2);
				table_cell4.setPaddingBottom(2);
				table4.addCell(table_cell4); */

				iGST = rs.getDouble("igstPercentage");
				System.out.println("IGST == "+iGST);
				GST = rs.getDouble("tax_percentage");
				System.out.println("GST == "+GST);
				double half = 2;
				double halfGST = GST / half; 

				table_cell3 = new PdfPCell(new Phrase(String.valueOf(GST), font9NoBold));
				table_cell3.setBorder(Rectangle.RIGHT );
				table_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
				table_cell3.setBorderWidth(1f);
				table_cell3.setPaddingTop(2);
				table_cell3.setPaddingBottom(2);
				table3.addCell(table_cell3);
				
				table_cell3 = new PdfPCell(new Phrase(String.valueOf(iGST), font9NoBold));
				table_cell3.setBorder(Rectangle.RIGHT );
				table_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
				table_cell3.setBorderWidth(1f);
				table_cell3.setPaddingTop(2);
				table_cell3.setPaddingBottom(2);
				table3.addCell(table_cell3);

				int quantity = rs.getInt("quantity");
				int freeQuantity = rs.getInt("freeQuantity");
				quantity = quantity+freeQuantity;
				
				String unit = rs.getString("unit");
				int weight = rs.getInt("weight");
				int boxqty = quantity / weight;
				
				
				table_cell3 = new PdfPCell(new Phrase(String.valueOf(quantity), font9NoBold));
				table_cell3.setBorder(Rectangle.RIGHT );
				table_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
				table_cell3.setBorderWidth(1f);
				table_cell3.setPaddingTop(2);
				table_cell3.setPaddingBottom(2);
				table3.addCell(table_cell3);
				
				BigDecimal salePrice = rs.getBigDecimal("Without_Tax_Rate", 2);
				System.out.println("salePrice == "+salePrice);
				String sale_price = String.valueOf(rs.getString("Without_Tax_Rate"));
				System.out.println("sale_price == "+sale_price);
				Double tot = rs.getDouble("Without_Tax_Rate");
				Double tot1 = tot*quantity;
				System.out.println(" prce * quan  "+tot+" * "+quantity+" =  total -  "+tot1);
				
				tots = tots + tot1;
				
				System.out.println(" tots "+tots+" =  tot1 -  "+tot1);
				
				table_cell3 = new PdfPCell(new Phrase(sale_price, font10NoBold));
				table_cell3.setBorder(Rectangle.RIGHT );
				table_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
				table_cell3.setBorderWidth(1f);
				table_cell3.setPaddingTop(2);
				table_cell3.setPaddingBottom(2);
				table3.addCell(table_cell3);
				
				table_cell3 = new PdfPCell(new Phrase(unit, font9NoBold));
				table_cell3.setBorder(Rectangle.RIGHT );
				table_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
				table_cell3.setBorderWidth(1f);
				table_cell3.setPaddingTop(2);
				table_cell3.setPaddingBottom(2);
				table3.addCell(table_cell3);
				
				
		String discount_per_product = rs.getString("discount_per_product_perc");
		table_cell3 = new PdfPCell(new Phrase(String.valueOf(discount_per_product), font9NoBold));
		table_cell3.setBorder(Rectangle.RIGHT );
		table_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell3.setBorderWidth(1f);
		table_cell3.setPaddingTop(2);
		table_cell3.setPaddingBottom(2);
		table3.addCell(table_cell3);

				
/* 				String hsnNumber = rs.getString("hsn");
				System.out.println("hsnNumber name == "+hsnNumber);
				table_cell4 = new PdfPCell(new Phrase(hsnNumber, font9NoBold));
				table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
				table_cell4.setBorder(Rectangle.RIGHT );
				table_cell4.setBorderWidth(1f);
				table_cell4.setPaddingTop(2);
				table_cell4.setPaddingBottom(2);
				table4.addCell(table_cell4); */

				/* double weight = rs.getDouble("weight"); */
				/* table_cell4 = new PdfPCell(new Phrase("", font9NoBold));
				table_cell4.setBorder(table_cell4.NO_BORDER);
				table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
				table_cell4.setBorderWidth(1f);
				table_cell4.setPaddingTop(2);
				table_cell4.setPaddingBottom(2);
				table4.addCell(table_cell4); */
				

				
				Double ltr=rs.getDouble("ltr");
				Double calMili=rs.getDouble("mili");
				Double mili = calMili/1000;
				
				Double kg=rs.getDouble("kg");
				Double calGrams=rs.getDouble("grams");
				Double grams = calGrams/1000;

				Double kgAndGrams = kg+grams;
				Double ltrAndMili = ltr+mili;
					
//						table_cell4 = new PdfPCell(new Phrase(String.format("%.3f",kgAndGrams), font9NoBold));


				
	
				 
				String sale_price1 = rs.getString("sale_price");
				System.out.println("sale_price1 == "+sale_price1);
				System.out.println("sale_price1 ==========> ln No: ==> "+sale_price1);

/* 				table_cell4 = new PdfPCell(new Phrase(String.valueOf(sale_price1),font9NoBold));
              //table_cell4 = new PdfPCell(new Phrase("",font9NoBold));
				table_cell4.setBorder(Rectangle.RIGHT );
				table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
				table_cell4.setBorderWidth(1f);
				table_cell4.setPaddingTop(2);
				table_cell4.setPaddingBottom(2);
				table4.addCell(table_cell4); */
				
				/* int quantity = rs.getInt("quantity");
				table_cell4 = new PdfPCell(new Phrase(String.valueOf(quantity), font9NoBold));
				table_cell4.setBorder(table_cell4.NO_BORDER);
				table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
				table_cell4.setBorderWidth(1f);
				table_cell4.setPaddingTop(2);
				table_cell4.setPaddingBottom(2);
				table4.addCell(table_cell4); */


				
				Double XX = Double.parseDouble(sale_price1);
				double taxpergst = (XX * GST)/100;
				double priceWithOutGST = XX- taxpergst;
				long  taxpergst1= Math.round(priceWithOutGST); 
				System.out.println("Rate1234 == "+taxpergst1);
				
				

				
				double salep = rs.getDouble("Without_Tax_Rate");
				System.out.println("salep == "+salep);
				
				double total = XX * quantity;
				long  total1= Math.round(total);
				
				double totalPerProduct = rs.getDouble("total_per_product");
				
//				table_cell3 = new PdfPCell(new Phrase(String.valueOf(totalPerProduct), font10NoBold));
				table_cell3 = new PdfPCell(new Phrase(String.valueOf(tot1), font10NoBold));				
				table_cell3.setBorder(Rectangle.RIGHT );
				table_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
				table_cell3.setBorderWidth(1f);
				table_cell3.setPaddingTop(2);
				table_cell3.setPaddingBottom(2);
				table3.addCell(table_cell3);

				/*  if (iGST == 5 || iGST == 12 || iGST == 18 || iGST == 28) {
					//double taxAmount = (iGST / 100) * (total1);
					//double taxAmount = (iGST / 100) * (totalPerProduct);
					double taxAmount1 =(totalPerProduct/(1+(iGST / 100)));
					double taxAmount = totalPerProduct - taxAmount1;
					igstTotal = igstTotal + taxAmount;
					System.out.println("igstTotal = = =" + igstTotal);
				}
				if (GST == 5.00 || GST == 12.00 || GST == 18.00 || GST == 28.00) {
					
					double taxAmount1 =(totalPerProduct/(1+(GST / 100)));
					double taxAmount = totalPerProduct - taxAmount1;
					gstTotal = gstTotal + taxAmount;
					System.out.println("gstTotal{} = = =" + gstTotal);
				} */
				 if (iGST>0) {
					//double taxAmount = (iGST / 100) * (total1);
					//double taxAmount = (iGST / 100) * (totalPerProduct);
					double taxAmount1 =(totalPerProduct/(1+(iGST / 100)));
					double taxAmount = totalPerProduct - taxAmount1;
					igstTotal = igstTotal + taxAmount;
					System.out.println("igstTotal = = =" + igstTotal);
				}
				if (GST>0) {
					
					double taxAmount1 =(totalPerProduct/(1+(GST / 100)));
					double taxAmount = totalPerProduct - taxAmount1;
					gstTotal = gstTotal + taxAmount;
					System.out.println("gstTotal{} = = =" + gstTotal);
				}
				
				String tx = rs.getString("Tax_amount");
				String gss = rs.getString("total_per_product");
				
				Double txx = Double.parseDouble(tx);
				Double gs1 = Double.parseDouble(gss);
	//			Double txx1 = txx*quantity;
//				gsts = gsts+txx1;
				gsts = gsts+txx;
				

				
				 
				gs = gs + gs1;
				b = b + 1;

	}

	table_cell3 = new PdfPCell(new Phrase(""));
	table_cell3.setBorder(table_cell3.NO_BORDER);
	table_cell3.setBorderWidth(1f);
	table3.addCell(table_cell3);
	
	table_cell3 = new PdfPCell(new Phrase(""));
	table_cell3.setBorder(table_cell3.NO_BORDER);
	table_cell3.setBorderWidth(1f);
	table3.addCell(table_cell3);
	
	table_cell3 = new PdfPCell(new Phrase(""));
	table_cell3.setBorder(table_cell3.NO_BORDER);
	table_cell3.setBorderWidth(1f);
	table3.addCell(table_cell3);

	table_cell3 = new PdfPCell(new Phrase(""));
	table_cell3.setBorder(table_cell3.NO_BORDER);
	table_cell3.setBorderWidth(1f);
	table3.addCell(table_cell3);

	table_cell3 = new PdfPCell(new Phrase(""));
	table_cell3.setBorder(table_cell3.NO_BORDER);
	table_cell3.setBorderWidth(1f);
	table3.addCell(table_cell3);

	table_cell3 = new PdfPCell(new Phrase(""));
	table_cell3.setBorder(table_cell3.NO_BORDER);
	table_cell3.setBorderWidth(1f);
	table3.addCell(table_cell3);

	table_cell3 = new PdfPCell(new Phrase(""));
	table_cell3.setBorder(table_cell3.NO_BORDER);
	table_cell3.setBorderWidth(1f);
	table3.addCell(table_cell3);
	
	table_cell3 = new PdfPCell(new Phrase(""));
	table_cell3.setBorder(table_cell3.NO_BORDER);
	table_cell3.setBorderWidth(1f);
	table3.addCell(table_cell3);

	table_cell3 = new PdfPCell(new Phrase(""));
	table_cell3.setBorder(table_cell3.NO_BORDER);
	table_cell3.setBorderWidth(1f);
	table3.addCell(table_cell3);
	document.add(table3);
		
		
		PdfPTable table3a = new PdfPTable(9);
		table3a.setWidthPercentage(100);

		float[] columnWidths3a = { 1.2f,0.2f, 0.15f, 0.15f, 0.15f, 0.2f, 0.2f, 0.15f, 0.3f};
		table3a.setWidths(columnWidths3a);

		PdfPCell table_cell3a;

		table_cell3a = new PdfPCell(new Phrase("\n\nCGST \n SGST", font10NoBold));
		table_cell3a.setBorderWidth(1f);
		table_cell3a.setHorizontalAlignment(Element.ALIGN_RIGHT);
		table_cell3a.setBorder( Rectangle.LEFT | Rectangle.RIGHT | Rectangle.BOTTOM);
		table_cell3a.setPaddingTop(5f);
		table_cell3a.setPaddingBottom(5f);
		table_cell3a.setPaddingRight(5f);
		table3a.addCell(table_cell3a);

		table_cell3a = new PdfPCell(new Phrase("", font10NoBold));
		table_cell3a.setBorderWidth(1f);
		table_cell3a.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell3a.setBorder( Rectangle.LEFT | Rectangle.RIGHT | Rectangle.BOTTOM);
		table_cell3a.setPaddingTop(1f);
		table_cell3a.setPaddingBottom(1f);
		table3a.addCell(table_cell3a);
		
		table_cell3a = new PdfPCell(new Phrase("", font10NoBold));
		table_cell3a.setBorderWidth(1f);
		table_cell3a.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell3a.setBorder( Rectangle.LEFT | Rectangle.RIGHT | Rectangle.BOTTOM);
		table_cell3a.setPaddingTop(1f);
		table_cell3a.setPaddingBottom(1f);
		table3a.addCell(table_cell3a);
		
		table_cell3a = new PdfPCell(new Phrase("", font10NoBold));
		table_cell3a.setBorderWidth(1f);
		table_cell3a.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell3a.setBorder(Rectangle.LEFT | Rectangle.RIGHT | Rectangle.BOTTOM);
		table_cell3a.setPaddingTop(1f);
		table_cell3a.setPaddingBottom(1f);
		table3a.addCell(table_cell3a);

		table_cell3a = new PdfPCell(new Phrase("", font10NoBold));
		table_cell3a.setBorderWidth(1f);
		table_cell3a.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell3a.setBorder( Rectangle.LEFT | Rectangle.RIGHT | Rectangle.BOTTOM);
		table_cell3a.setPaddingTop(1f);
		table_cell3a.setPaddingBottom(1f);
		table3a.addCell(table_cell3a);

		table_cell3a = new PdfPCell(new Phrase("", font10NoBold));
		table_cell3a.setBorderWidth(1f);
		table_cell3a.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell3a.setPaddingBottom(3f);
		table_cell3a.setBorder( Rectangle.LEFT | Rectangle.RIGHT | Rectangle.BOTTOM);
		table3a.addCell(table_cell3a);
		
		table_cell3a = new PdfPCell(new Phrase("", font10NoBold));
		table_cell3a.setBorderWidth(1f);
		table_cell3a.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell3a.setBorder( Rectangle.LEFT | Rectangle.RIGHT | Rectangle.BOTTOM);
		table_cell3a.setPaddingTop(1f);
		table_cell3a.setPaddingBottom(1f);
		table3a.addCell(table_cell3a);
		
		table_cell3a = new PdfPCell(new Phrase("", font10NoBold));
		table_cell3a.setBorderWidth(1f);
		table_cell3a.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell3a.setBorder(Rectangle.LEFT | Rectangle.RIGHT | Rectangle.BOTTOM);
		table_cell3a.setPaddingTop(1f);
		table_cell3a.setPaddingBottom(1f);
		table3a.addCell(table_cell3a);
		
		long tots1 = Math.round(tots);
		String Amount1 = String.valueOf(tots1);

//		 DecimalFormat f = new DecimalFormat("##.00");

		double roundOff = Math.round(gsts*100)/100; 
		
		table_cell3a = new PdfPCell(new Phrase(Amount1+"\n"+roundOff+"\n"+roundOff, font10NoBold));
		table_cell3a.setBorderWidth(1f);
		table_cell3a.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell3a.setPaddingBottom(3f);
		table_cell3a.setPaddingTop(10f);
		table_cell3a.setBorder(Rectangle.LEFT | Rectangle.RIGHT | Rectangle.BOTTOM);
		table3a.addCell(table_cell3a);
		document.add(table3a);
		
		
		PdfPTable table3aa = new PdfPTable(9);
		table3aa.setWidthPercentage(100);

		float[] columnWidths3aa = { 1.2f,0.2f, 0.15f, 0.15f, 0.15f, 0.2f, 0.2f, 0.15f, 0.3f};
		table3aa.setWidths(columnWidths3aa);

		PdfPCell table_cell3aa;

		table_cell3aa = new PdfPCell(new Phrase("Total", font10NoBold));
		table_cell3aa.setBorderWidth(1f);
		table_cell3aa.setHorizontalAlignment(Element.ALIGN_RIGHT);
		table_cell3aa.setBorder( Rectangle.LEFT | Rectangle.RIGHT | Rectangle.BOTTOM);
		table_cell3aa.setPaddingBottom(3f);
		table_cell3aa.setPaddingTop(3f);
		table_cell3aa.setPaddingRight(5f);
		table3aa.addCell(table_cell3aa);

		table_cell3aa = new PdfPCell(new Phrase("", font10NoBold));
		table_cell3aa.setBorderWidth(1f);
		table_cell3aa.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell3aa.setBorder( Rectangle.LEFT | Rectangle.RIGHT | Rectangle.BOTTOM);
		table_cell3aa.setPaddingTop(1f);
		table_cell3aa.setPaddingBottom(1f);
		table3aa.addCell(table_cell3aa);
		
		table_cell3aa = new PdfPCell(new Phrase("", font10NoBold));
		table_cell3aa.setBorderWidth(1f);
		table_cell3aa.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell3aa.setBorder( Rectangle.LEFT | Rectangle.RIGHT | Rectangle.BOTTOM);
		table_cell3aa.setPaddingTop(1f);
		table_cell3aa.setPaddingBottom(1f);
		table3aa.addCell(table_cell3aa);
		
		table_cell3aa = new PdfPCell(new Phrase("", font10NoBold));
		table_cell3aa.setBorderWidth(1f);
		table_cell3aa.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell3aa.setBorder(Rectangle.LEFT | Rectangle.RIGHT | Rectangle.BOTTOM);
		table_cell3aa.setPaddingTop(1f);
		table_cell3aa.setPaddingBottom(1f);
		table3aa.addCell(table_cell3aa);

		table_cell3aa = new PdfPCell(new Phrase("", font10NoBold));
		table_cell3aa.setBorderWidth(1f);
		table_cell3aa.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell3aa.setBorder( Rectangle.LEFT | Rectangle.RIGHT | Rectangle.BOTTOM);
		table_cell3aa.setPaddingTop(1f);
		table_cell3aa.setPaddingBottom(1f);
		table3aa.addCell(table_cell3aa);

		table_cell3aa = new PdfPCell(new Phrase("", font10NoBold));
		table_cell3aa.setBorderWidth(1f);
		table_cell3aa.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell3aa.setPaddingBottom(1f);
		table_cell3aa.setPaddingTop(1f);
		table_cell3aa.setBorder( Rectangle.LEFT | Rectangle.RIGHT | Rectangle.BOTTOM);
		table3aa.addCell(table_cell3aa);
		
		table_cell3aa = new PdfPCell(new Phrase("", font10NoBold));
		table_cell3aa.setBorderWidth(1f);
		table_cell3aa.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell3aa.setBorder( Rectangle.LEFT | Rectangle.RIGHT | Rectangle.BOTTOM);
		table_cell3aa.setPaddingTop(1f);
		table_cell3aa.setPaddingBottom(1f);
		table3aa.addCell(table_cell3aa);
		
		table_cell3aa = new PdfPCell(new Phrase("", font10NoBold));
		table_cell3aa.setBorderWidth(1f);
		table_cell3aa.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell3aa.setBorder(Rectangle.LEFT | Rectangle.RIGHT | Rectangle.BOTTOM);
		table_cell3aa.setPaddingTop(1f);
		table_cell3aa.setPaddingBottom(1f);
		table3aa.addCell(table_cell3aa);
		
//		long tots1 = Math.round(tots);
//		String Amount1 = String.valueOf(tots1);

		table_cell3aa = new PdfPCell(new Phrase(String.valueOf(gs), font12));
		table_cell3aa.setBorderWidth(1f);
		table_cell3aa.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell3aa.setPaddingBottom(1f);
		table_cell3aa.setPaddingTop(1f);
		table_cell3aa.setBorder(Rectangle.LEFT | Rectangle.RIGHT | Rectangle.BOTTOM);
		table3aa.addCell(table_cell3aa);
		document.add(table3aa);
		
		
		PdfPTable headertable22a1 = new PdfPTable(1);
		headertable22a1.setWidthPercentage(100);
		
		float[] HeadercolumnWidths22aa1 = { 1f };
		headertable22a1.setWidths(HeadercolumnWidths22aa1);

		PdfPCell headerTable_cell22aa1;

		long AmountInLong = Math.round((gs));
		String Amount = String.valueOf(AmountInLong);
		int AmountInInteger = Integer.parseInt(Amount);
		NumToWord w = new NumToWord();
		String amtInWord = w.convert(AmountInInteger);
		
		headerTable_cell22aa1 = new PdfPCell(new Phrase("Amount Chargeable (in words)",font10NoBold));
		headerTable_cell22aa1.setHorizontalAlignment(Element.ALIGN_LEFT);
		headerTable_cell22aa1.setPaddingBottom(2);
		headerTable_cell22aa1.setPaddingTop(2);
		headerTable_cell22aa1.setBorder(Rectangle.RIGHT | Rectangle.LEFT);
		headertable22a1.addCell(headerTable_cell22aa1); 
		
		headerTable_cell22aa1 = new PdfPCell(new Phrase(""+amtInWord+" only",font12));
		headerTable_cell22aa1.setHorizontalAlignment(Element.ALIGN_LEFT);
		headerTable_cell22aa1.setPaddingBottom(10);
//		headerTable_cell22aa1.setPaddingTop(2);
		headerTable_cell22aa1.setBorder(Rectangle.RIGHT | Rectangle.LEFT | Rectangle.BOTTOM);
		headertable22a1.addCell(headerTable_cell22aa1); 
		
		
		document.add(headertable22a1);
		
		PdfPTable headertable22a11 = new PdfPTable(1);
		headertable22a11.setWidthPercentage(100);
		
		float[] HeadercolumnWidths22aa11 = { 1f };
		headertable22a11.setWidths(HeadercolumnWidths22aa11);

		PdfPCell headerTable_cell22aa11;

		
		headerTable_cell22aa11 = new PdfPCell(new Phrase("Declaration :",font10NoBold));
		headerTable_cell22aa11.setHorizontalAlignment(Element.ALIGN_LEFT);
		headerTable_cell22aa11.setPaddingBottom(4);
		headerTable_cell22aa11.setPaddingTop(2);
		headerTable_cell22aa11.setBorder(Rectangle.RIGHT | Rectangle.LEFT);
		headertable22a11.addCell(headerTable_cell22aa11); 
		
		headerTable_cell22aa11 = new PdfPCell(new Phrase("We declare that this invoice shows the actual price of the goods described and that all the particular are true and correct."));
		headerTable_cell22aa11.setHorizontalAlignment(Element.ALIGN_LEFT);
		headerTable_cell22aa11.setPaddingBottom(10);
//		headerTable_cell22aa1.setPaddingTop(2);
		headerTable_cell22aa11.setBorder(Rectangle.RIGHT | Rectangle.LEFT | Rectangle.BOTTOM | Rectangle.TOP);
		headertable22a11.addCell(headerTable_cell22aa11); 
		
		
		document.add(headertable22a11);
		
		
		PdfPTable headertable22aas = new PdfPTable(2);
		headertable22aas.setWidthPercentage(100);

		float[] HeadercolumnWidths22aas = { 0.5f,0.5f};
		headertable22aas.setWidths(HeadercolumnWidths22aas);

		PdfPCell headerTable_cell22aas;

		
		headerTable_cell22aas = new PdfPCell(new Phrase("Customer's Seal and Signature"));
		headerTable_cell22aas.setHorizontalAlignment(Element.ALIGN_LEFT);
		headerTable_cell22aas.setPaddingBottom(40);
		headerTable_cell22aas.setPaddingTop(2);
		headerTable_cell22aas.setBorder(Rectangle.RIGHT | Rectangle.LEFT | Rectangle.BOTTOM | Rectangle.TOP);
		headertable22aas.addCell(headerTable_cell22aas); 
		
//  		headerTable_cell22aas = new PdfPCell(new Phrase("for GMC Marketing (Bhosari) 2019-20  \n\n\n Authorised Signatory", Normalfont11));
  		headerTable_cell22aas = new PdfPCell(new Phrase("Reliable Mart   \n\n\n Authorised Signatory")); 		 
  		headerTable_cell22aas.setHorizontalAlignment(Element.ALIGN_RIGHT);
		headerTable_cell22aas.setPaddingBottom(10);
		headerTable_cell22aas.setPaddingTop(2);
		headerTable_cell22aas.setPaddingRight(5);
		headerTable_cell22aas.setBorder(Rectangle.RIGHT | Rectangle.LEFT | Rectangle.BOTTOM | Rectangle.TOP);
		headertable22aas.addCell(headerTable_cell22aas);  

		
		document.add(headertable22aas);
		
		
		
/*		if (b > 0 && b <= 10)
		{

			System.out.println("ln no 1188 ==> when b > 0 && b <= 10");
			System.out.println("ln no 1023 == VALUE OF ==> b "+b);
			
			table_cell4 = new PdfPCell(new Phrase("\n"));
			table_cell4.setBorder(Rectangle.LEFT | Rectangle.RIGHT |  Rectangle.BOTTOM );
			table_cell4.setBorderWidth(1f);
			table4.addCell(table_cell4);
			
		    table_cell4 = new PdfPCell(new Phrase("\n"));
		    table_cell4.setBorder(Rectangle.RIGHT |  Rectangle.BOTTOM );
			table_cell4.setBorderWidth(1f);
			table4.addCell(table_cell4); 
			
/* 			table_cell4 = new PdfPCell(new Phrase("\n"));
			table_cell4.setBorder(Rectangle.RIGHT |  Rectangle.BOTTOM );
			table_cell4.setBorderWidth(1f);
			table4.addCell(table_cell4);

			table_cell4 = new PdfPCell(new Phrase("\n"));
			table_cell4.setBorder(Rectangle.RIGHT |  Rectangle.BOTTOM );
			table_cell4.setBorderWidth(1f);
			table4.addCell(table_cell4); */

/*			table_cell4 = new PdfPCell(new Phrase("\n"));
			table_cell4.setBorder(Rectangle.RIGHT |  Rectangle.BOTTOM );
			table_cell4.setBorderWidth(1f);
			table4.addCell(table_cell4);

			table_cell4 = new PdfPCell(new Phrase("\n"));
			table_cell4.setBorder(Rectangle.RIGHT |  Rectangle.BOTTOM );
			table_cell4.setBorderWidth(1f);
			table4.addCell(table_cell4);

			table_cell4 = new PdfPCell(new Phrase("\n"));
			table_cell4.setBorder(Rectangle.RIGHT |  Rectangle.BOTTOM );
			table_cell4.setBorderWidth(1f);
			table4.addCell(table_cell4);

			table_cell4 = new PdfPCell(new Phrase("\n"));
			table_cell4.setBorder(Rectangle.RIGHT |  Rectangle.BOTTOM );
			table_cell4.setBorderWidth(1f);
			table4.addCell(table_cell4);

			table_cell4 = new PdfPCell(new Phrase("\n"));
			table_cell4.setBorder(Rectangle.RIGHT |  Rectangle.BOTTOM );
			table_cell4.setBorderWidth(1f);
			table4.addCell(table_cell4);

			table_cell4 = new PdfPCell(new Phrase("\n"));
			table_cell4.setBorder(Rectangle.RIGHT |  Rectangle.BOTTOM );
			table_cell4.setBorderWidth(1f);
			table4.addCell(table_cell4); 
*/
			//-----------------------------------
/*
			double halfGstTotal = (gstTotal)/2;
			
			table_cell4 = new PdfPCell(new Phrase("\n\n\n\n\n\n\n\n\n\n\n\n\n\n"));
			table_cell4.setColspan(2);
			table_cell4.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell4.setBorder(Rectangle.NO_BORDER);
			table_cell4.setPaddingBottom(1f);
			table_cell4.setPaddingTop(1f);
			table_cell4.setBorderWidth(1f);
			table4.addCell(table_cell4);

			table_cell4 = new PdfPCell(new Phrase("\n\n\n\n\n\n\n\n\n\n\n\n\n\n"));
			table_cell4.setColspan(2);
			table_cell4.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell4.setBorder(Rectangle.NO_BORDER);
			table_cell4.setPaddingBottom(1f);
			table_cell4.setPaddingTop(1f);
			table_cell4.setBorderWidth(1f);
			table4.addCell(table_cell4);
			
			table_cell4 = new PdfPCell(new Phrase("\n\n\n\n\n\n\n\n\n\n\n\n\n\n"));
			table_cell4.setColspan(2);
			table_cell4.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell4.setBorder(Rectangle.NO_BORDER);
			table_cell4.setPaddingBottom(1f);
			table_cell4.setPaddingTop(1f);
			table_cell4.setBorderWidth(1f);
			table4.addCell(table_cell4);
			
			table_cell4 = new PdfPCell(new Phrase("\n\n\n\n\n\n\n\n\n\n\n\n\n\n"));
			table_cell4.setColspan(2);
			table_cell4.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell4.setBorder(Rectangle.NO_BORDER);
			table_cell4.setPaddingBottom(1f);
			table_cell4.setPaddingTop(1f);
			table_cell4.setBorderWidth(1f);
			table4.addCell(table_cell4);
			
			table_cell4 = new PdfPCell(new Phrase("\n\n\n\n\n\n\n\n\n\n\n\n\n\n"));
			table_cell4.setColspan(2);
			table_cell4.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell4.setBorder(Rectangle.NO_BORDER);
			table_cell4.setPaddingBottom(1f);
			table_cell4.setPaddingTop(1f);
			table_cell4.setBorderWidth(1f);
			table4.addCell(table_cell4);
			
			table_cell4 = new PdfPCell(new Phrase("\n\n\n\n\n\n\n\n\n\n\n\n\n\n"));
			table_cell4.setColspan(2);
			table_cell4.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell4.setBorder(Rectangle.NO_BORDER);
			table_cell4.setPaddingBottom(1f);
			table_cell4.setPaddingTop(1f);
			table_cell4.setBorderWidth(1f);
			table4.addCell(table_cell4);
			
			table_cell4 = new PdfPCell(new Phrase("\n\n\n\n\n\n\n\n\n\n\n\n\n\n"));
			table_cell4.setColspan(2);
			table_cell4.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell4.setBorder(Rectangle.NO_BORDER);
			table_cell4.setPaddingBottom(1f);
			table_cell4.setPaddingTop(1f);
			table_cell4.setBorderWidth(1f);
			table4.addCell(table_cell4);
			
			table_cell4 = new PdfPCell(new Phrase("\n\n\n\n\n\n\n\n\n\n\n\n\n\n"));
			table_cell4.setColspan(2);
			table_cell4.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell4.setBorder(Rectangle.NO_BORDER);
			table_cell4.setPaddingBottom(1f);
			table_cell4.setPaddingTop(1f);
			table_cell4.setBorderWidth(1f);
			table4.addCell(table_cell4);
			
			table_cell4 = new PdfPCell(new Phrase("\n\n\n\n\n\n\n\n\n\n\n\n\n\n"));
			table_cell4.setColspan(2);
			table_cell4.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell4.setBorder(Rectangle.NO_BORDER);
			table_cell4.setPaddingBottom(1f);
			table_cell4.setPaddingTop(1f);
			table_cell4.setBorderWidth(1f);
			table4.addCell(table_cell4);
			
			table_cell4 = new PdfPCell(new Phrase("\n\n\n\n\n\n\n\n\n\n\n\n\n\n"));
			table_cell4.setColspan(2);
			table_cell4.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell4.setBorder(Rectangle.NO_BORDER);
			table_cell4.setPaddingBottom(1f);
			table_cell4.setPaddingTop(1f);
			table_cell4.setBorderWidth(1f);
			table4.addCell(table_cell4);
					
			table_cell4 = new PdfPCell(new Phrase("\n\n\n\n\n\n\n\n\n\n\n\n\n\nDiscount Amount :-  "+discount, Normalfont11));
			table_cell4.setColspan(2);
			table_cell4.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell4.setBorder(Rectangle.NO_BORDER);
			table_cell4.setPaddingBottom(1f);
			table_cell4.setPaddingTop(1f);
			table_cell4.setBorderWidth(1f);
			table4.addCell(table_cell4);
			
			table_cell4 = new PdfPCell(new Phrase("\n\n\n\n\n\n\n\n\n\n\n\n\n\n     CGST Amount :- " + df.format(halfGstTotal) , Normalfont11));
			table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell4.setBorder(Rectangle.NO_BORDER);
			table_cell4.setColspan(3);
			table_cell4.setPaddingBottom(1f);
			table_cell4.setPaddingTop(1f);
			table_cell4.setBorderWidth(1f);
			table4.addCell(table_cell4);
						
			table_cell4 = new PdfPCell(new Phrase("\n\n\n\n\n\n\n\n\n\n\n\n\n"));
			table_cell4.setColspan(4);
			table_cell4.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell4.setBorder(Rectangle.NO_BORDER);
			table_cell4.setPaddingBottom(1f);
			table_cell4.setPaddingTop(1f);
			table_cell4.setBorderWidth(1f);
			table4.addCell(table_cell4);
			
			table_cell4 = new PdfPCell(new Phrase("\n\n\n\n\n\n\n\n\n\n\n\n\n"));
			table_cell4.setColspan(4);
			table_cell4.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell4.setBorder(Rectangle.NO_BORDER);
			table_cell4.setPaddingBottom(1f);
			table_cell4.setPaddingTop(1f);
			table_cell4.setBorderWidth(1f);
			table4.addCell(table_cell4);

			table_cell4 = new PdfPCell(new Phrase("Labour Expenses  :-  "+hamaliExpense, Normalfont11));
			table_cell4.setColspan(2);
			table_cell4.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell4.setBorder(Rectangle.NO_BORDER);
			table_cell4.setPaddingBottom(1f);
			table_cell4.setPaddingTop(1f);
			table_cell4.setBorderWidth(1f);
			table4.addCell(table_cell4);

			table_cell4 = new PdfPCell(new Phrase("     SGST Amount :- "+ df.format(halfGstTotal), Normalfont11));
			table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell4.setBorder(Rectangle.NO_BORDER);
			table_cell4.setColspan(3);
			table_cell4.setPaddingBottom(1f);
			table_cell4.setPaddingTop(1f);
			table_cell4.setBorderWidth(1f);
			table4.addCell(table_cell4);

			table_cell4 = new PdfPCell(new Phrase("         Gross Total(Incl GST)  :- "+df.format(Double.parseDouble(gross_total)), font12));
			table_cell4.setColspan(4);
			table_cell4.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell4.setBorder(Rectangle.NO_BORDER);
			table_cell4.setPaddingBottom(1f);
			table_cell4.setPaddingTop(1f);
			table_cell4.setBorderWidth(1f);
			table4.addCell(table_cell4);

 			table_cell4 = new PdfPCell(new Phrase("", Normalfont11));
			table_cell4.setColspan(7);
			table_cell4.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell4.setBorder(Rectangle.NO_BORDER);
			table_cell4.setPaddingBottom(1f);
			table_cell4.setPaddingTop(1f);
			table_cell4.setBorderWidth(1f);
	    	table4.addCell(table_cell4);
	    	
			table_cell4 = new PdfPCell(new Phrase("", Normalfont11));
			table_cell4.setColspan(7);
			table_cell4.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell4.setBorder(Rectangle.NO_BORDER);
			table_cell4.setPaddingBottom(1f);
			table_cell4.setPaddingTop(1f);
			table_cell4.setBorderWidth(1f);
			table4.addCell(table_cell4);
			
			table_cell4 = new PdfPCell(new Phrase("", Normalfont11));
			table_cell4.setColspan(7);
			table_cell4.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell4.setBorder(Rectangle.NO_BORDER);
			table_cell4.setPaddingBottom(1f);
			table_cell4.setPaddingTop(1f);
			table_cell4.setBorderWidth(1f);
			table4.addCell(table_cell4);
			
			table_cell4 = new PdfPCell(new Phrase("", Normalfont11));
			table_cell4.setColspan(7);
			table_cell4.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell4.setBorder(Rectangle.NO_BORDER);
			table_cell4.setPaddingBottom(1f);
			table_cell4.setPaddingTop(1f);
			table_cell4.setBorderWidth(1f);
			table4.addCell(table_cell4);
			
			table_cell4 = new PdfPCell(new Phrase("", Normalfont11));
			table_cell4.setColspan(7);
			table_cell4.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell4.setBorder(Rectangle.NO_BORDER);
			table_cell4.setPaddingBottom(1f);
			table_cell4.setPaddingTop(1f);
			table_cell4.setBorderWidth(1f);
			table4.addCell(table_cell4);

			// Gross Total in Words
			long grossTotalInLong = Math.round(Double.parseDouble(gross_total));
			String grossTotal = String.valueOf(grossTotalInLong);
			int grossTotalInInteger = Integer.parseInt(grossTotal);
			NumToWord w = new NumToWord();
			String amtInWord = w.convert(grossTotalInInteger);

			table_cell4 = new PdfPCell(new Phrase("Rupees in Words : "+ amtInWord +"  Only/-", font11));
			table_cell4.setColspan(10);
			table_cell4.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell4.setBorder(Rectangle.NO_BORDER);
			table_cell4.setPaddingBottom(4f);
			table_cell4.setPaddingTop(1f);
			table_cell4.setBorderWidth(1f);
			table4.addCell(table_cell4);

			table_cell4 = new PdfPCell(new Phrase());
			table_cell4.setColspan(10);
			table_cell4.setHorizontalAlignment(Element.ALIGN_JUSTIFIED);
			table_cell4.setBorder(Rectangle.RIGHT | Rectangle.LEFT | Rectangle.TOP);
			table_cell4.setBorderWidth(1f);
			table4.addCell(table_cell4);

			table_cell4 = new PdfPCell(new Phrase(
					"\n Customer Sign                                                                                                     From "+onlyShopName.toUpperCase(),
					Normalfont11));
			table_cell4.setColspan(10);
			table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell4.setBorder(Rectangle.RIGHT | Rectangle.LEFT | Rectangle.BOTTOM);
			table_cell4.setBorderWidth(1f);
			table_cell4.setPaddingBottom(3);
			table4.addCell(table_cell4);
 
			document.add(table4);

			//Instructions
			PdfPTable footer = new PdfPTable(1);
			footer.setWidthPercentage(100);
			float[] footercolumnWidths = { 0.9f };
			footer.setWidths(footercolumnWidths);

			PdfPCell table_cell9;

			table_cell9 = new PdfPCell(new Phrase("*Remark : "+description,font9NoBold));
			table_cell9.setBorder(table_cell.NO_BORDER);
			footer.addCell(table_cell9);

			document.add(footer);
			document.add(new Paragraph(" "));

		}*/

/* 		if (b > 10 && b <= 20)
		{			
			System.out.println("ln no 1399 ==> when b > 10 && b <= 20");
			System.out.println("ln no 1235 == VALUE OF ==> b "+b);
			
			document.add(table4);
			
			document.add(new Paragraph(
					"                                                                                                             Continue On Next Page..."));
			document.add(new Paragraph(
					"					                                   Thank You Visit Again !!!						"));

			document.newPage();

			document.add(new Paragraph("        "));
			document.add(new Paragraph("        "));

			table_cell4 = new PdfPCell(new Phrase("\n"));
			table_cell4.setBorder(table_cell4.NO_BORDER);
			table_cell4.setBorderWidth(1f);
			table5.addCell(table_cell4); 
 */
		/* 	table_cell4 = new PdfPCell(new Phrase("\n"));
			table_cell4.setBorder(table_cell4.NO_BORDER);
			table_cell4.setBorderWidth(1f);
			table5.addCell(table_cell4); */
			
/* 			table_cell4 = new PdfPCell(new Phrase("\n"));
			table_cell4.setBorder(table_cell4.NO_BORDER);
			table_cell4.setBorderWidth(1f);
			table5.addCell(table_cell4);

			table_cell4 = new PdfPCell(new Phrase("\n"));
			table_cell4.setBorder(table_cell4.NO_BORDER);
			table_cell4.setBorderWidth(1f);
			table5.addCell(table_cell4);

			table_cell4 = new PdfPCell(new Phrase("\n"));
			table_cell4.setBorder(table_cell4.NO_BORDER);
			table_cell4.setBorderWidth(1f);
			table5.addCell(table_cell4);

			table_cell4 = new PdfPCell(new Phrase("\n"));
			table_cell4.setBorder(table_cell4.NO_BORDER);
			table_cell4.setBorderWidth(1f);
			table5.addCell(table_cell4);

			table_cell4 = new PdfPCell(new Phrase("\n"));
			table_cell4.setBorder(table_cell4.NO_BORDER);
			table_cell4.setBorderWidth(1f);
			table5.addCell(table_cell4);

			table_cell4 = new PdfPCell(new Phrase("\n"));
			table_cell4.setBorder(table_cell4.NO_BORDER);
			table_cell4.setBorderWidth(1f);
			table5.addCell(table_cell4);

			table_cell4 = new PdfPCell(new Phrase("\n"));
			table_cell4.setBorder(table_cell4.NO_BORDER);
			table_cell4.setBorderWidth(1f);
			table5.addCell(table_cell4);
 */
			//-----------------------------------

/* 			double halfGstTotal = (gstTotal) / 2;

			table_cell4 = new PdfPCell(new Phrase("\n\n\n\n\n\n\n\n\n\n\n\n\n\nDiscount              :- "+discount, Normalfont11));
			table_cell4.setColspan(2);
			table_cell4.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell4.setBorder(Rectangle.NO_BORDER);
			table_cell4.setPaddingBottom(1f);
			table_cell4.setPaddingTop(1f);
			table_cell4.setBorderWidth(1f);
			table5.addCell(table_cell4);

			table_cell4 = new PdfPCell(new Phrase("\n\n\n\n\n\n\n\n\n\n\n\n\n\n     CGST Amount :- " +df.format(halfGstTotal), Normalfont11));
			table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell4.setBorder(Rectangle.NO_BORDER);
			table_cell4.setColspan(3);
			table_cell4.setPaddingBottom(1f);
			table_cell4.setPaddingTop(1f);
			table_cell4.setBorderWidth(1f);
			table5.addCell(table_cell4);

			table_cell4 = new PdfPCell(new Phrase("\n\n\n\n\n\n\n\n\n\n\n\n\n\n"));
			table_cell4.setColspan(4);
			table_cell4.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell4.setBorder(Rectangle.NO_BORDER);
			table_cell4.setPaddingBottom(1f);
			table_cell4.setPaddingTop(1f);
			table_cell4.setBorderWidth(1f);
			table5.addCell(table_cell4);

//			table_cell4 = new PdfPCell(new Phrase("""Hamali Expense  :- "+hamaliExpense, Normalfont11));
			table_cell4.setColspan(2);
			table_cell4.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell4.setBorder(Rectangle.NO_BORDER);
			table_cell4.setPaddingBottom(1f);
			table_cell4.setPaddingTop(1f);
			table_cell4.setBorderWidth(1f);
			table5.addCell(table_cell4);

			table_cell4 = new PdfPCell(new Phrase("     SGST Amount :- "+df.format(halfGstTotal), Normalfont11));
			table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell4.setBorder(Rectangle.NO_BORDER);
			table_cell4.setColspan(3);
			table_cell4.setPaddingBottom(1f);
			table_cell4.setPaddingTop(1f);
			table_cell4.setBorderWidth(1f);
			table5.addCell(table_cell4);

			table_cell4 = new PdfPCell(new Phrase("   Gross Total(Inc GST)  :- "+ df.format(Double.parseDouble(gross_total)), font12));
			table_cell4.setColspan(4);
			table_cell4.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell4.setBorder(Rectangle.NO_BORDER);
			table_cell4.setPaddingBottom(1f);
			table_cell4.setPaddingTop(1f);
			table_cell4.setBorderWidth(1f);
			table5.addCell(table_cell4);
 */
			/* table_cell4 = new PdfPCell(new Phrase("", Normalfont11));
			table_cell4.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell4.setBorder(Rectangle.NO_BORDER);
			table_cell4.setPaddingBottom(1f);
			table_cell4.setPaddingTop(1f);
			table_cell4.setColspan(1);
			table_cell4.setBorderWidth(1f);
			table5.addCell(table_cell4);
			
			table_cell4 = new PdfPCell(new Phrase("", Normalfont11));
			table_cell4.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell4.setBorder(Rectangle.NO_BORDER);
			table_cell4.setPaddingBottom(1f);
			table_cell4.setPaddingTop(1f);
			table_cell4.setColspan(1);
			table_cell4.setBorderWidth(1f);
			table5.addCell(table_cell4);

			table_cell4 = new PdfPCell(new Phrase("", Normalfont11));
			table_cell4.setColspan(7);
			table_cell4.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell4.setBorder(Rectangle.NO_BORDER);
			table_cell4.setPaddingBottom(1f);
			table_cell4.setPaddingTop(1f);
			table_cell4.setBorderWidth(1f);
			table5.addCell(table_cell4);
			
			 table_cell4 = new PdfPCell(new Phrase("", Normalfont11));
			table_cell4.setColspan(7);
			table_cell4.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell4.setBorder(Rectangle.NO_BORDER);
			table_cell4.setPaddingBottom(1f);
			table_cell4.setPaddingTop(1f);
			table_cell4.setBorderWidth(1f);
			table5.addCell(table_cell4); */
			
			/* table_cell4 = new PdfPCell(new Phrase("", Normalfont11));
			table_cell4.setColspan(7);
			table_cell4.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell4.setBorder(Rectangle.NO_BORDER);
			table_cell4.setPaddingBottom(1f);
			table_cell4.setPaddingTop(1f);
			table_cell4.setBorderWidth(1f);
			table5.addCell(table_cell4);  */

			// Gross Total in Words
			/*
			long totalInLong = Math.round(Double.parseDouble(gross_total));
			String grossTotal = String.valueOf(totalInLong);
			int grossTotalInInteger = Integer.parseInt(grossTotal);
			NumToWord w = new NumToWord();
			String amtInWord = w.convert(grossTotalInInteger);
*/		
		    // Gross Total in Words
/*			long grossTotalInLong = Math.round(Double.parseDouble(gross_total));
			String grossTotal = String.valueOf(grossTotalInLong);
			int grossTotalInInteger = Integer.parseInt(grossTotal);
			NumToWord w = new NumToWord();
			String amtInWord = w.convert(grossTotalInInteger);
			

			table_cell4 = new PdfPCell(new Phrase("Rupees in words :  "+amtInWord+"  Only/-", font11));
			table_cell4.setColspan(10);
			table_cell4.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell4.setBorder(Rectangle.NO_BORDER);
			table_cell4.setPaddingBottom(4f);
			table_cell4.setPaddingTop(1f);
			table_cell4.setBorderWidth(1f);
			table5.addCell(table_cell4);

			table_cell4 = new PdfPCell(new Phrase());
			table_cell4.setColspan(10);
			table_cell4.setHorizontalAlignment(Element.ALIGN_JUSTIFIED);
			table_cell4.setBorder(Rectangle.RIGHT | Rectangle.LEFT | Rectangle.TOP);
			table_cell4.setBorderWidth(1f);
			table5.addCell(table_cell4);

			table_cell4 = new PdfPCell(new Phrase("\n Customer Sign                                                                                                     From "+ShopName.toUpperCase(),Normalfont11));
			table_cell4.setColspan(10);
			table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell4.setBorder(Rectangle.RIGHT | Rectangle.LEFT | Rectangle.BOTTOM);
			table_cell4.setBorderWidth(1f);
			table_cell4.setPaddingBottom(3);
			table5.addCell(table_cell4);

			document.add(table5);

			//Instructions
			PdfPTable footer = new PdfPTable(1);
			footer.setWidthPercentage(100);
			float[] footercolumnWidths = { 0.9f };
			footer.setWidths(footercolumnWidths);

			PdfPCell table_cell9;

			table_cell9 = new PdfPCell(new Phrase("*Remark : "+description,font9NoBold));
			table_cell9.setBorder(table_cell.NO_BORDER);
			footer.addCell(table_cell9);
			
			document.add(footer);
			document.add(new Paragraph(" "));

		}*/

/* 		if (b > 20 && b <= 30)
		{
			System.out.println("ln no 1634 ==> when b > 20 && b <= 30");
			System.out.println("ln no 1471 == VALUE OF ==> b "+b);

			System.out.println("=====ln 1366=================================================");
			
			document.add(table4);
			
			document.add(table4);
			document.add(new Paragraph(
					"                                                                                                             Continue On Next Page..."));
			document.add(new Paragraph(
					"					                                   Thank You Visit Again !!!						"));

			document.newPage();

			document.add(new Paragraph("        "));
			document.add(new Paragraph("        "));

			document.add(table5);

			document.add(new Paragraph(
					"                                                                                                             Continue On Next Page..."));
			document.add(new Paragraph(
					"					                                   Thank You Visit Again !!!						"));

			document.newPage();

			document.add(new Paragraph("        "));
			document.add(new Paragraph("        "));
		
			table_cell4 = new PdfPCell(new Phrase("\n"));
			table_cell4.setBorder(table_cell4.NO_BORDER);
			table_cell4.setBorderWidth(1f);
			table6.addCell(table_cell4);
			
			/* table_cell4 = new PdfPCell(new Phrase("\n"));
			table_cell4.setBorder(table_cell4.NO_BORDER);
			table_cell4.setBorderWidth(1f);
			table6.addCell(table_cell4); */
			
/* 			table_cell4 = new PdfPCell(new Phrase("\n"));
			table_cell4.setBorder(table_cell4.NO_BORDER);
			table_cell4.setBorderWidth(1f);
			table6.addCell(table_cell4);

			table_cell4 = new PdfPCell(new Phrase("\n"));
			table_cell4.setBorder(table_cell4.NO_BORDER);
			table_cell4.setBorderWidth(1f);
			table6.addCell(table_cell4);

			table_cell4 = new PdfPCell(new Phrase("\n"));
			table_cell4.setBorder(table_cell4.NO_BORDER);
			table_cell4.setBorderWidth(1f);
			table6.addCell(table_cell4);

			table_cell4 = new PdfPCell(new Phrase("\n"));
			table_cell4.setBorder(table_cell4.NO_BORDER);
			table_cell4.setBorderWidth(1f);
			table6.addCell(table_cell4);

			table_cell4 = new PdfPCell(new Phrase("\n"));
			table_cell4.setBorder(table_cell4.NO_BORDER);
			table_cell4.setBorderWidth(1f);
			table6.addCell(table_cell4);

			table_cell4 = new PdfPCell(new Phrase("\n"));
			table_cell4.setBorder(table_cell4.NO_BORDER);
			table_cell4.setBorderWidth(1f);
			table6.addCell(table_cell4);

			table_cell4 = new PdfPCell(new Phrase("\n"));
			table_cell4.setBorder(table_cell4.NO_BORDER);
			table_cell4.setBorderWidth(1f);
			table6.addCell(table_cell4);

			table_cell4 = new PdfPCell(new Phrase("\n"));
			table_cell4.setBorder(table_cell4.NO_BORDER);
			table_cell4.setBorderWidth(1f);
			table6.addCell(table_cell4);
 
			//-----------------------------------
 
			double halfGstTotal = (gstTotal) / 2;

			table_cell4 = new PdfPCell(new Phrase("\n\n\n\n\n\n\n\n\n\n\n\n\n\nDiscount              :- "+discount, Normalfont11));
			table_cell4.setColspan(2);
			table_cell4.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell4.setBorder(Rectangle.NO_BORDER);
			table_cell4.setPaddingBottom(1f);
			table_cell4.setPaddingTop(1f);
			table_cell4.setBorderWidth(1f);
			table6.addCell(table_cell4);

			table_cell4 = new PdfPCell(new Phrase("\n\n\n\n\n\n\n\n\n\n\n\n\n\n     CGST Amount :- "+df.format(halfGstTotal), Normalfont11));
			table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell4.setBorder(Rectangle.NO_BORDER);
			table_cell4.setColspan(3);
			table_cell4.setPaddingBottom(1f);
			table_cell4.setPaddingTop(1f);
			table_cell4.setBorderWidth(1f);
			table6.addCell(table_cell4);

			table_cell4 = new PdfPCell(new Phrase("\n\n\n\n\n\n\n\n\n\n\n\n\n\n"));
			table_cell4.setColspan(4);
			table_cell4.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell4.setBorder(Rectangle.NO_BORDER);
			table_cell4.setPaddingBottom(1f);
			table_cell4.setPaddingTop(1f);
			table_cell4.setBorderWidth(1f);
			table6.addCell(table_cell4);

//			table_cell4 = new PdfPCell(new Phrase("""Hamali Expense  :- "+hamaliExpense));
	/*		table_cell4.setColspan(2);
			table_cell4.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell4.setBorder(Rectangle.NO_BORDER);
			table_cell4.setPaddingBottom(1f);
			table_cell4.setPaddingTop(1f);
			table_cell4.setBorderWidth(1f);
			table6.addCell(table_cell4);

			table_cell4 = new PdfPCell(new Phrase("     SGST Amount :- "+ df.format(halfGstTotal), Normalfont11));
			table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell4.setBorder(Rectangle.NO_BORDER);
			table_cell4.setColspan(3);
			table_cell4.setPaddingBottom(1f);
			table_cell4.setPaddingTop(1f);
			table_cell4.setBorderWidth(1f);
			table6.addCell(table_cell4);

			table_cell4 = new PdfPCell(new Phrase("   Gross Total(Inc GST)  :- "  + df.format(Double.parseDouble(gross_total)) , font12));
			table_cell4.setColspan(4);
			table_cell4.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell4.setBorder(Rectangle.NO_BORDER);
			table_cell4.setPaddingBottom(1f);
			table_cell4.setPaddingTop(1f);
			table_cell4.setBorderWidth(1f);
			table6.addCell(table_cell4);
 */
			/* table_cell4 = new PdfPCell(new Phrase("", Normalfont11));
			table_cell4.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell4.setBorder(Rectangle.NO_BORDER);
			table_cell4.setPaddingBottom(1f);
			table_cell4.setPaddingTop(1f);
			table_cell4.setColspan(1);
			table_cell4.setBorderWidth(1f);
			table6.addCell(table_cell4); */
			/* table_cell4 = new PdfPCell(new Phrase("", Normalfont11));
			table_cell4.setColspan(7);
			table_cell4.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell4.setBorder(Rectangle.NO_BORDER);
			table_cell4.setPaddingBottom(1f);
			table_cell4.setPaddingTop(1f);
			table_cell4.setBorderWidth(1f);
			table6.addCell(table_cell4);
			
			table_cell4 = new PdfPCell(new Phrase("", Normalfont11));
			table_cell4.setColspan(7);
			table_cell4.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell4.setBorder(Rectangle.NO_BORDER);
			table_cell4.setPaddingBottom(1f);
			table_cell4.setPaddingTop(1f);
			table_cell4.setBorderWidth(1f);
			table6.addCell(table_cell4);
			
			table_cell4 = new PdfPCell(new Phrase("", Normalfont11));
			table_cell4.setColspan(7);
			table_cell4.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell4.setBorder(Rectangle.NO_BORDER);
			table_cell4.setPaddingBottom(1f);
			table_cell4.setPaddingTop(1f);
			table_cell4.setBorderWidth(1f);
			table6.addCell(table_cell4);
			
			table_cell4 = new PdfPCell(new Phrase("", Normalfont11));
			table_cell4.setColspan(7);
			table_cell4.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell4.setBorder(Rectangle.NO_BORDER);
			table_cell4.setPaddingBottom(1f);
			table_cell4.setPaddingTop(1f);
			table_cell4.setBorderWidth(1f);
			table6.addCell(table_cell4); */

			// Gross Total in Words
/*			long totalInLong = Math.round(Double.parseDouble(gross_total));
			String grossTotal = String.valueOf(totalInLong);
			int grossTotalInInteger = Integer.parseInt(grossTotal);
			NumToWord w = new NumToWord();
			String amtInWord = w.convert(grossTotalInInteger);

			table_cell4 = new PdfPCell(new Phrase("Rupees in words :  "+amtInWord +"  Only/-", font11));
			table_cell4.setColspan(10);
			table_cell4.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell4.setBorder(Rectangle.NO_BORDER);
			table_cell4.setPaddingBottom(4f);
			table_cell4.setPaddingTop(1f);
			table_cell4.setBorderWidth(1f);
			table6.addCell(table_cell4);

			table_cell4 = new PdfPCell(new Phrase());
			table_cell4.setColspan(10);
			table_cell4.setHorizontalAlignment(Element.ALIGN_JUSTIFIED);
			table_cell4.setBorder(Rectangle.RIGHT | Rectangle.LEFT | Rectangle.TOP);
			table_cell4.setBorderWidth(1f);
			table6.addCell(table_cell4);

			table_cell4 = new PdfPCell(new Phrase(
					"\n Customer Sign                                                                                                     From "+ShopName.toUpperCase(),
					Normalfont11));
			table_cell4.setColspan(10);
			table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell4.setBorder(Rectangle.RIGHT | Rectangle.LEFT | Rectangle.BOTTOM);
			table_cell4.setBorderWidth(1f);
			table_cell4.setPaddingBottom(3);
			table6.addCell(table_cell4);

			document.add(table6);

			//Instructions
			PdfPTable footer = new PdfPTable(1);
			footer.setWidthPercentage(100);
			float[] footercolumnWidths = { 0.9f };
			footer.setWidths(footercolumnWidths);

			PdfPCell table_cell9;

			table_cell9 = new PdfPCell(new Phrase(
					"*Goods Once Sold will not be taken Back.",
					font8NoBold));
			table_cell9.setBorder(table_cell.NO_BORDER);
			footer.addCell(table_cell9);

			document.add(footer);
			document.add(new Paragraph(" "));
		} */

		rs.close();
		stmt.close();
		conn.close();
		document.close();
	} catch (DocumentException de) {
		throw new IOException(de.getMessage());
	}
%>
