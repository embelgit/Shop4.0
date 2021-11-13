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
<%@ page trimDirectiveWhitespaces="true"%>
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


<%@page import="javax.mail.util.ByteArrayDataSource"%>
<%@page import="javax.activation.DataSource"%>
<%@page import="javax.mail.internet.MimeMultipart"%>
<%@page import="javax.mail.Multipart"%>
<%@page import="javax.mail.internet.MimeBodyPart"%>
<%@page import="javax.mail.Address"%>
<%@page import="javax.mail.internet.InternetAddress"%>
<%@page import="javax.mail.internet.MimeMessage"%>
<%@page import="javax.mail.URLName"%>
<%@page import="com.sun.mail.smtp.SMTPTransport"%>
<%@page import="javax.mail.Transport"%>

<%@page import="java.io.ByteArrayOutputStream"%>
<%@page import="javax.activation.DataHandler"%>
<%@page import="javax.mail.util.ByteArrayDataSource"%>
<%@page import="javax.activation.DataSource"%>
<%@page import="javax.mail.internet.MimeMultipart"%>
<%@page import="javax.mail.Multipart"%>
<%@page import="javax.mail.internet.MimeBodyPart"%>


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

Connection conn = null;

try {

	// step 1
	Document document = new Document();
	document.setMargins(10 , 10 , 15 , 0);

	// step 2

	PdfWriter.getInstance(document, response.getOutputStream());
	ByteArrayOutputStream baos = new ByteArrayOutputStream();
    PdfWriter.getInstance(document, baos);
    
	// step 3
	document.open();

	Class.forName("com.mysql.jdbc.Driver");
	conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/shop", "root", "root");
	Statement stmt = conn.createStatement();

	//ResultSet rs = stmt.executeQuery("select product_name,village,sale_price,total_amount from fertilizer_bill WHERE customerBill=" + billno);

	//ResultSet rs = stmt.executeQuery("select fertilizer_bill.product_name,village, manufacturing_company, fertilizer_bill.weight, quantity, fertilizer_bill.sale_price, total_amount, total_amount,expenses,gross_total from fertilizer_bill left join product_details on fertilizer_bill.fk_product_id = product_details.pk_product_id where fertilizer_bill.customerBill =" + 166); 	
	ResultSet rs = stmt.executeQuery("select fk_customer_id, bill_no, customer_name, credit_customer_name, c.product_name, c.village, c.company, c.weight, c.Without_Tax_Rate, c.total_per_product, c.total_all_product, c.hamali_expense, c.gross_total, c.tax_percentage, c.hsn, c.igstPercentage, c.fk_shop_id, s.shop_name, c.Discount_amount, c.sale_price, c.kg, c.grams, c.unit, c.ltr, c.mili, c.quantity, c.total_per_product, c.kg, c.grams, c.ltr, c.mili, c.contact_number, c.GST_No, s.address, c.saleDate, c.freeQuantity, c.net_pay_amount, c.discount_per_product_perc,c.email from challan c left join shop_details s on fk_shop_id = pk_shop_id where bill_no ="+billno);
	
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

		// step 4

		PdfPTable table = new PdfPTable(3);
		table.setWidthPercentage(100);

		float[] columnWidths = { 0.2f, 0.3f, 0.2f };
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
		String email = rs.getString("email");
		
		/* if(ShopId == 1)
		{ */
						
			table_cell = new PdfPCell(new Phrase("CHALLAN BILL", font11));
			table_cell.setBorder(table_cell.NO_BORDER);
			table_cell.setHorizontalAlignment(Element.ALIGN_LEFT);
			table.addCell(table_cell);
		    
		
			table_cell = new PdfPCell(new Phrase(ShopName, font11));
			table_cell.setBorder(table_cell.NO_BORDER);
			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
			table.addCell(table_cell);
	
			table_cell = new PdfPCell(new Phrase("Mob No :"+mobileNo,font9NoBold));
			table_cell.setBorder(table_cell.NO_BORDER);
			table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table.addCell(table_cell);
			
			table_cell = new PdfPCell(new Phrase("Challan No : "+shopPrBillno, font9NoBold));
			table_cell.setBorder(table_cell.BOTTOM);
			table_cell.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell.setPaddingTop(2f);
			table.addCell(table_cell);
						
			table_cell = new PdfPCell(new Phrase(shopAddress, Normalfont11));
			table_cell.setBorder(table_cell.BOTTOM);
			table_cell.setPaddingTop(2f);
			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
			table.addCell(table_cell);	
	
			table_cell = new PdfPCell(new Phrase("GST No. "+gstNo, font9NoBold));
			table_cell.setBorder(table_cell.BOTTOM);
			table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table.addCell(table_cell);
							
		/*  }
		  else if(ShopId == 2)
		 { 
		
		        table_cell = new PdfPCell(new Phrase("Bill Cash/Credit Memorandum", Normalfont11));
				table_cell.setBorder(table_cell.NO_BORDER);
				table.addCell(table_cell);
		
				table_cell = new PdfPCell(new Phrase("|| SHREE ||", Normalfont11));
				table_cell.setBorder(table_cell.NO_BORDER);
				table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
				table.addCell(table_cell);
		
				table_cell = new PdfPCell(new Phrase("Mob No : 9421841342",font9NoBold));
				table_cell.setBorder(table_cell.NO_BORDER);
				table.addCell(table_cell);
				
				table_cell = new PdfPCell(new Phrase("Bill No: " + shopPrBillno, Normalfont11));
				table_cell.setBorder(table_cell.NO_BORDER);
				table_cell.setPaddingTop(2f);
				table.addCell(table_cell);
		
	 			table_cell = new PdfPCell(new Phrase(ShopName.toUpperCase(), font17));
				table_cell.setBorder(table_cell.NO_BORDER);
				table_cell.setPaddingTop(2f);
				table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
				table.addCell(table_cell);			
		
				table_cell = new PdfPCell(new Phrase("Pan No. ACMPN7189D", font9NoBold));
				table_cell.setBorder(table_cell.NO_BORDER);
				table_cell.setVerticalAlignment(Element.ALIGN_CENTER);
				table.addCell(table_cell);
				
				table_cell = new PdfPCell(new Phrase(""));
				table_cell.setBorder(Rectangle.BOTTOM);
				table_cell.setPaddingBottom(3f);
				table.addCell(table_cell);
				
				table_cell = new PdfPCell(new Phrase("Bhokar Road,Tamsa Pin : 431713", Normalfont11));
				table_cell.setBorder(Rectangle.BOTTOM);
				table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
				table_cell.setPaddingBottom(2f);
				table.addCell(table_cell);
				
				table_cell = new PdfPCell(new Phrase(""));
				table_cell.setBorder(Rectangle.BOTTOM);
				table_cell.setPaddingBottom(3f);
				table.addCell(table_cell);
		 }
*/
		document.add(table);

		/* table for customer name, village and date */

		PdfPTable smallTable = new PdfPTable(3);
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
		
		table_cell2 = new PdfPCell(new Phrase(""/* + rs.getString("village")*/));
		table_cell2.setBorder(table_cell2.NO_BORDER);
		table_cell2.setHorizontalAlignment(Element.ALIGN_CENTER);
		smallTable.addCell(table_cell2);
		
		table_cell2 = new PdfPCell(new Phrase("Date: " + billSaleDate));
		table_cell2.setBorder(table_cell2.NO_BORDER);
		table_cell2.setHorizontalAlignment(Element.ALIGN_RIGHT);
		smallTable.addCell(table_cell2);
		

		document.add(smallTable);
		document.add(new Paragraph(""));

		/* String expenses = String.valueOf(rs.getString("transportation_expense"));
		String HamaliExpence = String.valueOf(rs.getString("hamali_expense"));*/
		String gross_total = String.valueOf(rs.getString("gross_total"));
				
		//Heading Info table
		PdfPTable table3 = new PdfPTable(10);
		table3.setWidthPercentage(100);

		float[] columnWidths3 = { 0.5f, 0.2f, 0.2f, 0.2f, 0.2f, 0.2f, 0.2f, 0.3f, 0.2f, 0.2f};
		table3.setWidths(columnWidths3);

		PdfPCell table_cell3;

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

		/* table_cell3 = new PdfPCell(new Phrase("Pkg", font10NoBold));
		table_cell3.setBorderWidth(1f);
		table_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell3.setBorder(table_cell3.NO_BORDER);
		table_cell3.setPaddingTop(1f);
		table_cell3.setPaddingBottom(1f);
		table3.addCell(table_cell3); */
		
		table_cell3 = new PdfPCell(new Phrase("Qty", font10NoBold));
		table_cell3.setBorderWidth(1f);
		table_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell3.setBorder(Rectangle.TOP | Rectangle.LEFT | Rectangle.RIGHT);
		table_cell3.setPaddingTop(1f);
		table_cell3.setPaddingBottom(1f);
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
		
		table_cell3 = new PdfPCell(new Phrase("Price(gst)", font10NoBold));
		table_cell3.setBorderWidth(1f);
		table_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell3.setBorder(Rectangle.TOP | Rectangle.LEFT | Rectangle.RIGHT);
		table_cell3.setPaddingTop(1f);
		table_cell3.setPaddingBottom(1f);
		table3.addCell(table_cell3);
		
		/* table_cell3 = new PdfPCell(new Phrase("Qty", font10NoBold));
		table_cell3.setBorderWidth(1f);
		table_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell3.setBorder(table_cell3.NO_BORDER);
		table_cell3.setPaddingTop(1f);
		table_cell3.setPaddingBottom(1f);
		table3.addCell(table_cell3); */

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
		
		table_cell3 = new PdfPCell(new Phrase("Rate", font10NoBold));
		table_cell3.setBorderWidth(1f);
		table_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell3.setPaddingBottom(3f);
		table_cell3.setBorder(Rectangle.TOP | Rectangle.LEFT | Rectangle.RIGHT);
		table3.addCell(table_cell3);

		table_cell3 = new PdfPCell(new Phrase("Amount", font10NoBold));
		table_cell3.setBorderWidth(1f);
		table_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell3.setPaddingBottom(3f);
		table_cell3.setBorder(Rectangle.TOP | Rectangle.LEFT | Rectangle.RIGHT);
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

		table_cell3 = new PdfPCell(new Phrase(""));
		table_cell3.setBorder(table_cell3.NO_BORDER);
		table_cell3.setBorderWidth(1f);
		table3.addCell(table_cell3);

		table_cell3 = new PdfPCell(new Phrase(""));
		table_cell3.setBorder(table_cell3.NO_BORDER);
		table_cell3.setBorderWidth(1f);
		table3.addCell(table_cell3);
 
		document.add(table3);

		//table for particulars

		PdfPTable table4 = new PdfPTable(10);
		table4.setWidthPercentage(100);

		float[] columnWidths4 = { 0.5f, 0.2f, 0.2f, 0.2f, 0.2f, 0.2f, 0.2f, 0.3f, 0.2f, 0.2f};
		table4.setWidths(columnWidths4);

		PdfPTable table5 = new PdfPTable(10);
		table5.setWidthPercentage(100);

		float[] columnWidths5 = { 0.5f, 0.2f, 0.2f, 0.2f, 0.2f, 0.2f, 0.2f, 0.3f, 0.2f, 0.2f};
		table5.setWidths(columnWidths5);

		PdfPTable table6 = new PdfPTable(10);
		table6.setWidthPercentage(100);

		float[] columnWidths6 = { 0.5f, 0.2f, 0.2f, 0.2f, 0.2f, 0.2f, 0.2f, 0.3f, 0.2f, 0.2f};
		table6.setWidths(columnWidths6);

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
		PdfPCell cell10 = new PdfPCell(new Paragraph(""));
		
		
		table4.addCell(cell1);
		table4.addCell(cell2);
		table4.addCell(cell3);
		table4.addCell(cell4);
		table4.addCell(cell5);
		table4.addCell(cell6);
		table4.addCell(cell7);
		table4.addCell(cell8);
		table4.addCell(cell9);
		table4.addCell(cell10);

	 	table5.addCell(cell1);
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
		table6.addCell(cell10);
	
		while (rs.next())
		{
			if (b < 10)
			{
				System.out.println("ln no 519 ==> when b<10");
				System.out.println("ln no 520 == VALUE OF ==> b "+b);

				String product_name = rs.getString("product_name");
				System.out.println("Product name == "+product_name);
 				table_cell4 = new PdfPCell(new Phrase(product_name, font9NoBold));
				table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
              	table_cell4.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
				table_cell4.setBorderWidth(1f);
				table_cell4.setPaddingTop(2);
				table_cell4.setPaddingBottom(2);
				table4.addCell(table_cell4);

		/* 		String manufacturing_company = rs.getString("company");
				System.out.println("manufacturing_company name == "+manufacturing_company);
				table_cell4 = new PdfPCell(new Phrase(manufacturing_company, font9NoBold));
				table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
				table_cell4.setBorder(table_cell4.NO_BORDER);
				table_cell4.setBorderWidth(1f);
				table_cell4.setPaddingTop(2);
				table_cell4.setPaddingBottom(2);
				table4.addCell(table_cell4); */

				String hsnNumber = rs.getString("hsn");
				System.out.println("hsnNumber name == "+hsnNumber);
				table_cell4 = new PdfPCell(new Phrase(hsnNumber, font9NoBold));
				table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
				table_cell4.setBorder(Rectangle.RIGHT);
				table_cell4.setBorderWidth(1f);
				table_cell4.setPaddingTop(2);
				table_cell4.setPaddingBottom(2);
				table4.addCell(table_cell4);

				/* double weight = rs.getDouble("weight"); */
				/* table_cell4 = new PdfPCell(new Phrase("", font9NoBold));
				table_cell4.setBorder(table_cell4.NO_BORDER);
				table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
				table_cell4.setBorderWidth(1f);
				table_cell4.setPaddingTop(2);
				table_cell4.setPaddingBottom(2);
				table4.addCell(table_cell4); */
				
				int quantity = rs.getInt("quantity");
				
				table_cell4 = new PdfPCell(new Phrase(String.valueOf(quantity), font9NoBold));
				table_cell4.setBorder(table_cell4.NO_BORDER);
				table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
				table_cell4.setBorderWidth(1f);
				table_cell4.setPaddingTop(2);
				table_cell4.setPaddingBottom(2);
				table4.addCell(table_cell4);
				
				int freeQuantity = rs.getInt("freeQuantity");
				quantity = quantity+freeQuantity;
				
				String unit = rs.getString("unit");
				int weight = rs.getInt("weight");
				int boxqty = quantity / weight;
				
				Double ltr=rs.getDouble("ltr");
				Double calMili=rs.getDouble("mili");
				Double mili = calMili/1000;
				
				Double kg=rs.getDouble("kg");
				Double calGrams=rs.getDouble("grams");
				Double grams = calGrams/1000;

				Double kgAndGrams = kg+grams;
				Double ltrAndMili = ltr+mili;
					
			/*	if(unit.equalsIgnoreCase("kg"))
					{
						table_cell4 = new PdfPCell(new Phrase(String.format("%.3f",kgAndGrams), font9NoBold));
						table_cell4.setBorder(Rectangle.RIGHT);
						table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
						table_cell4.setBorderWidth(1f);
						table_cell4.setPaddingTop(2);
						table_cell4.setPaddingBottom(2);
						table4.addCell(table_cell4);
					}
					else if(unit.equalsIgnoreCase("ltr"))
					{
						table_cell4 = new PdfPCell(new Phrase(String.format("%.3f",ltrAndMili), font9NoBold));
						table_cell4.setBorder(Rectangle.RIGHT);
						table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
						table_cell4.setBorderWidth(1f);
						table_cell4.setPaddingTop(2);
						table_cell4.setPaddingBottom(2);
						table4.addCell(table_cell4);
					}
					else if(unit.equalsIgnoreCase("pcs"))
					{
						table_cell4 = new PdfPCell(new Phrase(String.valueOf(boxqty), font9NoBold));
						table_cell4.setBorder(Rectangle.RIGHT);
						table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
						table_cell4.setBorderWidth(1f);
						table_cell4.setPaddingTop(2);
						table_cell4.setPaddingBottom(2);
						table4.addCell(table_cell4);
					}
				
				if(unit.equalsIgnoreCase("pcs")){
					table_cell4 = new PdfPCell(new Phrase("Box/pcs", font9NoBold));
					table_cell4.setBorder(Rectangle.RIGHT);
					table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
					table_cell4.setBorderWidth(1f);
					table_cell4.setPaddingTop(2);
					table_cell4.setPaddingBottom(2);
					table4.addCell(table_cell4);
				}else{
					table_cell4 = new PdfPCell(new Phrase(unit, font9NoBold));
					table_cell4.setBorder(Rectangle.RIGHT);
					table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
					table_cell4.setBorderWidth(1f);
					table_cell4.setPaddingTop(2);
					table_cell4.setPaddingBottom(2);
					table4.addCell(table_cell4);
				}*/
				
				table_cell4 = new PdfPCell(new Phrase(unit, font9NoBold));
				table_cell4.setBorder(Rectangle.RIGHT);
				table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
				table_cell4.setBorderWidth(1f);
				table_cell4.setPaddingTop(2);
				table_cell4.setPaddingBottom(2);
				table4.addCell(table_cell4);
				
				String discount_per_product = rs.getString("discount_per_product_perc");
				table_cell4 = new PdfPCell(new Phrase(String.valueOf(discount_per_product), font9NoBold));
				table_cell4.setBorder(Rectangle.RIGHT);
				table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
				table_cell4.setBorderWidth(1f);
				table_cell4.setPaddingTop(2);
				table_cell4.setPaddingBottom(2);
				table4.addCell(table_cell4);
				
				BigDecimal salePrice = rs.getBigDecimal("Without_Tax_Rate", 2);
				System.out.println("salePrice == "+salePrice);
				String sale_price = String.valueOf(rs.getString("Without_Tax_Rate"));
				System.out.println("sale_price == "+sale_price);
				 
				String sale_price1 = rs.getString("sale_price");
				System.out.println("sale_price1 == "+sale_price1);
				System.out.println("sale_price1 ==========> ln No: ==> "+sale_price1);
				table_cell4 = new PdfPCell(new Phrase(String.valueOf(sale_price1),font9NoBold));
              //table_cell4 = new PdfPCell(new Phrase("",font9NoBold));
				table_cell4.setBorder(Rectangle.RIGHT);
				table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
				table_cell4.setBorderWidth(1f);
				table_cell4.setPaddingTop(2);
				table_cell4.setPaddingBottom(2);
				table4.addCell(table_cell4);
				
				/* int quantity = rs.getInt("quantity");
				table_cell4 = new PdfPCell(new Phrase(String.valueOf(quantity), font9NoBold));
				table_cell4.setBorder(table_cell4.NO_BORDER);
				table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
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

				table_cell4 = new PdfPCell(new Phrase(String.valueOf(GST), font9NoBold));
				table_cell4.setBorder(Rectangle.RIGHT);
				table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
				table_cell4.setBorderWidth(1f);
				table_cell4.setPaddingTop(2);
				table_cell4.setPaddingBottom(2);
				table4.addCell(table_cell4);
				
				table_cell4 = new PdfPCell(new Phrase(String.valueOf(iGST), font9NoBold));
				table_cell4.setBorder(Rectangle.RIGHT);
				table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
				table_cell4.setBorderWidth(1f);
				table_cell4.setPaddingTop(2);
				table_cell4.setPaddingBottom(2);
				table4.addCell(table_cell4);
				
				Double XX = Double.parseDouble(sale_price1);
				double taxpergst = (XX * GST)/100;
				double priceWithOutGST = XX- taxpergst;
				long  taxpergst1= Math.round(priceWithOutGST); 
				System.out.println("Rate1234 == "+taxpergst1);
				
				
				table_cell4 = new PdfPCell(new Phrase(sale_price, font10NoBold));
				table_cell4.setBorder(Rectangle.RIGHT);
				table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
				table_cell4.setBorderWidth(1f);
				table_cell4.setPaddingTop(2);
				table_cell4.setPaddingBottom(2);
				table4.addCell(table_cell4);
				
				double salep = rs.getDouble("Without_Tax_Rate");
				System.out.println("salep == "+salep);
				
				double total = XX * quantity;
				long  total1= Math.round(total);
				
				double totalPerProduct = rs.getDouble("total_per_product");
				
				table_cell4 = new PdfPCell(new Phrase(String.valueOf(totalPerProduct), font10NoBold));
				table_cell4.setBorder(Rectangle.RIGHT);
				table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
				table_cell4.setBorderWidth(1f);
				table_cell4.setPaddingTop(2);
				table_cell4.setPaddingBottom(2);
				table4.addCell(table_cell4);

				 if (iGST == 5 || iGST == 12 || iGST == 18 || iGST == 28) {
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
				}
				b = b + 1;
		}
	else		
	{
		if (b < 20)
		{	
				System.out.println("ln no 699 ==> when b < 20");
				System.out.println("ln no 702 == VALUE OF ==> b "+b);
		
				String product_name = rs.getString("product_name");
				table_cell4 = new PdfPCell(new Phrase(product_name, font9NoBold));
				table_cell4.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
				table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
				table_cell4.setBorderWidth(1f);
				table_cell4.setPaddingTop(2);
				table_cell4.setPaddingBottom(2);
				table5.addCell(table_cell4);

				/* String manufacturing_company = rs.getString("company");
				table_cell4 = new PdfPCell(new Phrase(manufacturing_company, font9NoBold));
				table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
				table_cell4.setBorder(table_cell4.NO_BORDER);
				table_cell4.setBorderWidth(1f);
				table_cell4.setPaddingTop(2);
				table_cell4.setPaddingBottom(2);
				table5.addCell(table_cell4); */

				String hsnNumber = rs.getString("hsn");
				table_cell4 = new PdfPCell(new Phrase(hsnNumber, font9NoBold));
				table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
				table_cell4.setBorder(Rectangle.RIGHT);
				table_cell4.setBorderWidth(1f);
				table_cell4.setPaddingTop(2);
				table_cell4.setPaddingBottom(2);
				table5.addCell(table_cell4);

				//double weight = rs.getDouble("weight");
				/* table_cell4 = new PdfPCell(new Phrase(/* String.valueOf(weight) /*"", font9NoBold));
				table_cell4.setBorder(table_cell4.NO_BORDER);
				table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
				table_cell4.setBorderWidth(1f);
				table_cell4.setPaddingTop(2);
				table_cell4.setPaddingBottom(2);
				table5.addCell(table_cell4); */
				
				//double weight1 = rs.getDouble("weight");
				/* table_cell4 = new PdfPCell(new Phrase(/* String.valueOf(weight1) /*"", font9NoBold));
				table_cell4.setBorder(table_cell4.NO_BORDER);
				table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
				table_cell4.setBorderWidth(1f);
				table_cell4.setPaddingTop(2);
				table_cell4.setPaddingBottom(2);
				table5.addCell(table_cell4); */
				
				int quantity = rs.getInt("quantity");
				int freeQuantity = rs.getInt("freeQuantity");
				quantity = quantity+freeQuantity;
				
				String unit = rs.getString("unit");
					
				Double ltr=rs.getDouble("ltr");
				Double calMili=rs.getDouble("mili");
				Double mili = calMili/1000;
				
				Double kg=rs.getDouble("kg");
				Double calGrams=rs.getDouble("grams");
				Double grams = calGrams/1000;

				Double kgAndGrams = kg+grams;
				Double ltrAndMili = ltr+mili;
					
				if(unit.equalsIgnoreCase("kg"))
				{
					table_cell4 = new PdfPCell(new Phrase(String.format("%.3f",kgAndGrams), font9NoBold));
					
					table_cell4.setBorder(Rectangle.RIGHT);
					table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
					table_cell4.setBorderWidth(1f);
					table_cell4.setPaddingTop(2);
					table_cell4.setPaddingBottom(2);
					table5.addCell(table_cell4);
				}
				else if(unit.equalsIgnoreCase("ltr"))
				{
					table_cell4 = new PdfPCell(new Phrase(String.format("%.3f",ltrAndMili), font9NoBold));
					table_cell4.setBorder(Rectangle.RIGHT);
					table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
					table_cell4.setBorderWidth(1f);
					table_cell4.setPaddingTop(2);
					table_cell4.setPaddingBottom(2);
					table5.addCell(table_cell4);
				}
				else if(unit.equalsIgnoreCase("pcs"))
				{
					table_cell4 = new PdfPCell(new Phrase(String.valueOf(quantity), font9NoBold));
					table_cell4.setBorder(Rectangle.RIGHT);
					table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
					table_cell4.setBorderWidth(1f);
					table_cell4.setPaddingTop(2);
					table_cell4.setPaddingBottom(2);
					table5.addCell(table_cell4);
				}
					
				table_cell4 = new PdfPCell(new Phrase(unit, font9NoBold));
				table_cell4.setBorder(Rectangle.RIGHT);
				table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
				table_cell4.setBorderWidth(1f);
				table_cell4.setPaddingTop(2);
				table_cell4.setPaddingBottom(2);
				table5.addCell(table_cell4);
				
				String discount_per_product = rs.getString("discount_per_product_perc");
				table_cell4 = new PdfPCell(new Phrase(String.valueOf(discount_per_product), font9NoBold));
				table_cell4.setBorder(Rectangle.RIGHT);
				table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
				table_cell4.setBorderWidth(1f);
				table_cell4.setPaddingTop(2);
				table_cell4.setPaddingBottom(2);
				table4.addCell(table_cell4);					
				
				BigDecimal salePrice = rs.getBigDecimal("Without_Tax_Rate", 2);
				String sale_price = String.valueOf(rs.getString("Without_Tax_Rate"));
				String sale_price1=rs.getString("sale_price");
				table_cell4 = new PdfPCell(new Phrase(sale_price1, font9NoBold));
				table_cell4.setBorder(Rectangle.RIGHT);
				table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
				table_cell4.setBorderWidth(1f);
				table_cell4.setPaddingTop(2);
				table_cell4.setPaddingBottom(2);
				table5.addCell(table_cell4);

				 
				//int quantity = rs.getInt("quantity");
				/* table_cell4 = new PdfPCell(new Phrase(String.valueOf(quantity), font9NoBold));
				table_cell4.setBorder(table_cell4.NO_BORDER);
				table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
				table_cell4.setBorderWidth(1f);
				table_cell4.setPaddingTop(2);
				table_cell4.setPaddingBottom(2);
				table5.addCell(table_cell4); */

				iGST = rs.getDouble("igstPercentage");
				System.out.println("IGST == "+iGST);
				GST = rs.getDouble("tax_percentage");
				System.out.println("GST == "+GST);
				double half = 2;
				double halfGST = GST / half;

				table_cell4 = new PdfPCell(new Phrase(String.valueOf(GST), font9NoBold));
				table_cell4.setBorder(Rectangle.RIGHT);
				table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
				table_cell4.setBorderWidth(1f);
				table_cell4.setPaddingTop(2);
				table_cell4.setPaddingBottom(2);
				table5.addCell(table_cell4);
				
				table_cell4 = new PdfPCell(new Phrase(String.valueOf(iGST), font9NoBold));
				table_cell4.setBorder(Rectangle.RIGHT);
				table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
				table_cell4.setBorderWidth(1f);
				table_cell4.setPaddingTop(2);
				table_cell4.setPaddingBottom(2);
				table4.addCell(table_cell4);

				String X =sale_price1.toString();
				Double XX =Double.parseDouble(X);
				double taxpergst = (XX * GST)/100;
				double priceWithOutGST = XX- taxpergst;
				long  taxpergst1= Math.round(priceWithOutGST);
				
				
				table_cell4 = new PdfPCell(new Phrase(""+taxpergst1, font10NoBold));
				table_cell4.setBorder(Rectangle.RIGHT);
				table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
				table_cell4.setBorderWidth(1f);
				table_cell4.setPaddingTop(2);
				table_cell4.setPaddingBottom(2);
				table5.addCell(table_cell4);
				
				double total = XX * quantity;
				long  total1= Math.round(total);
				
				double totalPerProduct = rs.getDouble("total_per_product");
				
				//table_cell4 = new PdfPCell(new Phrase(String.valueOf(total1), font10NoBold));
				table_cell4 = new PdfPCell(new Phrase(String.valueOf(totalPerProduct), font10NoBold));
				table_cell4.setBorder(Rectangle.RIGHT);
				table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
				table_cell4.setBorderWidth(1f);
				table_cell4.setPaddingTop(2);
				table_cell4.setPaddingBottom(2);
				table5.addCell(table_cell4);

				if (iGST == 5 || iGST == 12 || iGST == 18 || iGST == 28) {
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
				}
				b = b + 1;				
			}
		else 
		{
			if (b < 30)
			{
					System.out.println("ln no 880 ==> when b<30");
					System.out.println("ln no 886 == VALUE OF ==> b "+b);
					
					String product_name = rs.getString("product_name");
					table_cell4 = new PdfPCell(new Phrase(product_name, font9NoBold));
					table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
					table_cell4.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
					table_cell4.setBorderWidth(1f);
					table_cell4.setPaddingTop(2);
					table_cell4.setPaddingBottom(2);
					table6.addCell(table_cell4);

					/* String manufacturing_company = rs.getString("company");
					table_cell4 = new PdfPCell(new Phrase(manufacturing_company, font9NoBold));
					table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
					table_cell4.setBorder(table_cell4.NO_BORDER);
					table_cell4.setBorderWidth(1f);
					table_cell4.setPaddingTop(2);
					table_cell4.setPaddingBottom(2);
					table6.addCell(table_cell4); */

					String hsnNumber = rs.getString("hsn");
					table_cell4 = new PdfPCell(new Phrase(hsnNumber, font9NoBold));
					table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
					table_cell4.setBorder(Rectangle.RIGHT);
					table_cell4.setBorderWidth(1f);
					table_cell4.setPaddingTop(2);
					table_cell4.setPaddingBottom(2);
					table6.addCell(table_cell4);
					
					int quantity = rs.getInt("quantity");
					int freeQuantity = rs.getInt("freeQuantity");
					quantity = quantity+freeQuantity;
					
					String unit = rs.getString("unit");
						
					Double ltr=rs.getDouble("ltr");
					Double calMili=rs.getDouble("mili");
					Double mili = calMili/1000;
					
					Double kg=rs.getDouble("kg");
					Double calGrams=rs.getDouble("grams");
					Double grams = calGrams/1000;

					Double kgAndGrams = kg+grams;
					Double ltrAndMili = ltr+mili;
						
					if(unit.equalsIgnoreCase("kg"))
					{
						table_cell4 = new PdfPCell(new Phrase(String.format("%.3f",kgAndGrams), font9NoBold));
						
						table_cell4.setBorder(Rectangle.RIGHT);
						table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
						table_cell4.setBorderWidth(1f);
						table_cell4.setPaddingTop(2);
						table_cell4.setPaddingBottom(2);
						table6.addCell(table_cell4);
					}
					else if(unit.equalsIgnoreCase("ltr"))
					{
						table_cell4 = new PdfPCell(new Phrase(String.format("%.3f",ltrAndMili), font9NoBold));
						table_cell4.setBorder(Rectangle.RIGHT);
						table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
						table_cell4.setBorderWidth(1f);
						table_cell4.setPaddingTop(2);
						table_cell4.setPaddingBottom(2);
						table6.addCell(table_cell4);
					}
					else if(unit.equalsIgnoreCase("pcs"))
					{
						table_cell4 = new PdfPCell(new Phrase(String.valueOf(quantity), font9NoBold));
						table_cell4.setBorder(Rectangle.RIGHT);
						table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
						table_cell4.setBorderWidth(1f);
						table_cell4.setPaddingTop(2);
						table_cell4.setPaddingBottom(2);
						table6.addCell(table_cell4);
					}

					/* double weight = rs.getDouble("weight");
					table_cell4 = new PdfPCell(new Phrase(String.valueOf(weight), font9NoBold));
					table_cell4.setBorder(table_cell4.NO_BORDER);
					table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
					table_cell4.setBorderWidth(1f);
					table_cell4.setPaddingTop(2);
					table_cell4.setPaddingBottom(2);
					table6.addCell(table_cell4);
					
					/* double weight1 = rs.getDouble("weight");*//*
					table_cell4 = new PdfPCell(new Phrase(String.valueOf(""), font9NoBold));
					table_cell4.setBorder(table_cell4.NO_BORDER);
					table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
					table_cell4.setBorderWidth(1f);
					table_cell4.setPaddingTop(2);
					table_cell4.setPaddingBottom(2);
					table6.addCell(table_cell4);  */

					table_cell4 = new PdfPCell(new Phrase(unit+"==", font9NoBold));
					table_cell4.setBorder(Rectangle.RIGHT);
					table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
					table_cell4.setBorderWidth(1f);
					table_cell4.setPaddingTop(2);
					table_cell4.setPaddingBottom(2);
					table6.addCell(table_cell4);
					
					String discount_per_product = rs.getString("discount_per_product_perc");
					table_cell4 = new PdfPCell(new Phrase(String.valueOf(discount_per_product), font9NoBold));
					table_cell4.setBorder(Rectangle.RIGHT);
					table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
					table_cell4.setBorderWidth(1f);
					table_cell4.setPaddingTop(2);
					table_cell4.setPaddingBottom(2);
					table4.addCell(table_cell4);
					
					BigDecimal salePrice = rs.getBigDecimal("Without_Tax_Rate", 2);
					String sale_price = String.valueOf(rs.getString("Without_Tax_Rate"));
					String sale_price1=rs.getString("sale_price");
					table_cell4 = new PdfPCell(new Phrase(sale_price1, font9NoBold));
					table_cell4.setBorder(Rectangle.RIGHT);
					table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
					table_cell4.setBorderWidth(1f);
					table_cell4.setPaddingTop(2);
					table_cell4.setPaddingBottom(2);
					table6.addCell(table_cell4);
					
					/* int quantity = rs.getInt("quantity");
					table_cell4 = new PdfPCell(new Phrase(String.valueOf(quantity), font9NoBold));
					table_cell4.setBorder(table_cell4.NO_BORDER);
					table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
					table_cell4.setBorderWidth(1f);
					table_cell4.setPaddingTop(2);
					table_cell4.setPaddingBottom(2);
					table6.addCell(table_cell4); */

					iGST = rs.getDouble("igstPercentage");
					System.out.println("IGST == "+iGST);
					GST = rs.getDouble("tax_percentage");
					System.out.println("GST == "+GST);
					double half = 2;
					double halfGST = GST / half;

					table_cell4 = new PdfPCell(new Phrase(String.valueOf(GST), font9NoBold));
					table_cell4.setBorder(Rectangle.RIGHT);
					table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
					table_cell4.setBorderWidth(1f);
					table_cell4.setPaddingTop(2);
					table_cell4.setPaddingBottom(2);
					table6.addCell(table_cell4);
					
					table_cell4 = new PdfPCell(new Phrase(String.valueOf(iGST), font9NoBold));
					table_cell4.setBorder(Rectangle.RIGHT);
					table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
					table_cell4.setBorderWidth(1f);
					table_cell4.setPaddingTop(2);
					table_cell4.setPaddingBottom(2);
					table4.addCell(table_cell4);
					
					String X =sale_price1.toString();
					Double XX =Double.parseDouble(X);
					double taxpergst = (XX * GST)/100;
					double priceWithOutGST = XX- taxpergst;
					long  taxpergst1= Math.round(priceWithOutGST);
					
					
					table_cell4 = new PdfPCell(new Phrase(""+taxpergst1, font10NoBold));
					table_cell4.setBorder(Rectangle.RIGHT);
					table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
					table_cell4.setBorderWidth(1f);
					table_cell4.setPaddingTop(2);
					table_cell4.setPaddingBottom(2);
					table6.addCell(table_cell4);

					double total = XX * quantity;
					long  total1= Math.round(total);
					double totalPerProduct = rs.getDouble("total_per_product");
					
					
					/* table_cell4 = new PdfPCell(new Phrase(String.valueOf(total1), font10NoBold)); */
					
					table_cell4 = new PdfPCell(new Phrase(String.valueOf(totalPerProduct), font10NoBold));
					table_cell4.setBorder(Rectangle.RIGHT);
					table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
					table_cell4.setBorderWidth(1f);
					table_cell4.setPaddingTop(2);
					table_cell4.setPaddingBottom(2);
					table4.addCell(table_cell4);
					table6.addCell(table_cell4);

					if (iGST == 5 || iGST == 12 || iGST == 18 || iGST == 28) {
						
						/* double taxAmount = (iGST / 100) * (total1); */
						//double taxAmount = (iGST / 100) * (totalPerProduct);
						double taxAmount1 =(totalPerProduct/(1+(iGST / 100)));
						double taxAmount = totalPerProduct - taxAmount1;
						igstTotal = igstTotal + taxAmount;
						System.out.println("igstTotal = = =" + igstTotal);
					}
					if (GST == 5.00 || GST == 12.00 || GST == 18.00 || GST == 28.00) {
						
//						double taxAmount = (GST / 100) * (total1);
						double taxAmount1 =(totalPerProduct/(1+(GST / 100)));
						double taxAmount = totalPerProduct - taxAmount1;
						gstTotal = gstTotal + taxAmount;
						System.out.println("gstTotal{} = = =" + gstTotal);
					}
					b = b + 1;	
				}
			}
		}			
	}

		if (b > 0 && b <= 10)
		{

			System.out.println("ln no 1188 ==> when b > 0 && b <= 10");
			System.out.println("ln no 1023 == VALUE OF ==> b "+b);
			
			table_cell4 = new PdfPCell(new Phrase("\n"));
			table_cell4.setBorder(Rectangle.LEFT | Rectangle.RIGHT |  Rectangle.BOTTOM);
			table_cell4.setBorderWidth(1f);
			table4.addCell(table_cell4);
			
		    table_cell4 = new PdfPCell(new Phrase("\n"));
			table_cell4.setBorder(Rectangle.RIGHT |  Rectangle.BOTTOM);
			table_cell4.setBorderWidth(1f);
			table4.addCell(table_cell4); 
			
			table_cell4 = new PdfPCell(new Phrase("\n"));
			table_cell4.setBorder(Rectangle.RIGHT |  Rectangle.BOTTOM);
			table_cell4.setBorderWidth(1f);
			table4.addCell(table_cell4);

			table_cell4 = new PdfPCell(new Phrase("\n"));
			table_cell4.setBorder(Rectangle.RIGHT |  Rectangle.BOTTOM);
			table_cell4.setBorderWidth(1f);
			table4.addCell(table_cell4);

			table_cell4 = new PdfPCell(new Phrase("\n"));
			table_cell4.setBorder(Rectangle.RIGHT |  Rectangle.BOTTOM);
			table_cell4.setBorderWidth(1f);
			table4.addCell(table_cell4);

			table_cell4 = new PdfPCell(new Phrase("\n"));
			table_cell4.setBorder(Rectangle.RIGHT |  Rectangle.BOTTOM);
			table_cell4.setBorderWidth(1f);
			table4.addCell(table_cell4);

			table_cell4 = new PdfPCell(new Phrase("\n"));
			table_cell4.setBorder(Rectangle.RIGHT |  Rectangle.BOTTOM);
			table_cell4.setBorderWidth(1f);
			table4.addCell(table_cell4);

			table_cell4 = new PdfPCell(new Phrase("\n"));
			table_cell4.setBorder(Rectangle.RIGHT |  Rectangle.BOTTOM);
			table_cell4.setBorderWidth(1f);
			table4.addCell(table_cell4);

			table_cell4 = new PdfPCell(new Phrase("\n"));
			table_cell4.setBorder(Rectangle.RIGHT |  Rectangle.BOTTOM);
			table_cell4.setBorderWidth(1f);
			table4.addCell(table_cell4);

			table_cell4 = new PdfPCell(new Phrase("\n"));
			table_cell4.setBorder(Rectangle.RIGHT |  Rectangle.BOTTOM);
			table_cell4.setBorderWidth(1f);
			table4.addCell(table_cell4); 

			//-----------------------------------

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

			table_cell4 = new PdfPCell(new Phrase(""));
			table_cell4.setColspan(2);
			table_cell4.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell4.setBorder(Rectangle.NO_BORDER);
			table_cell4.setPaddingBottom(1f);
			table_cell4.setPaddingTop(1f);
			table_cell4.setBorderWidth(1f);
			table4.addCell(table_cell4); 

			table_cell4 = new PdfPCell(new Phrase("    "));
			table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell4.setBorder(Rectangle.NO_BORDER);
			table_cell4.setColspan(3);
			table_cell4.setPaddingBottom(1f);
			table_cell4.setPaddingTop(1f);
			table_cell4.setBorderWidth(1f);
			table4.addCell(table_cell4); 

			table_cell4 = new PdfPCell(new Phrase("     "));
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
			//String amtInWord = w.convert(grossTotalInInteger);

			table_cell4 = new PdfPCell(new Phrase("", font11));
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

			table_cell9 = new PdfPCell(new Phrase("*Goods Once Sold will not be taken Back.",font8NoBold));
			table_cell9.setBorder(table_cell.NO_BORDER);
			footer.addCell(table_cell9);

			document.add(footer);
			document.add(new Paragraph(" "));

		}

		if (b > 10 && b <= 20)
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

		/* 	table_cell4 = new PdfPCell(new Phrase("\n"));
			table_cell4.setBorder(table_cell4.NO_BORDER);
			table_cell4.setBorderWidth(1f);
			table5.addCell(table_cell4); */
			
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

			table_cell4 = new PdfPCell(new Phrase("\n"));
			table_cell4.setBorder(table_cell4.NO_BORDER);
			table_cell4.setBorderWidth(1f);
			table5.addCell(table_cell4);

			//-----------------------------------

			double halfGstTotal = (gstTotal) / 2;

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

			table_cell4 = new PdfPCell(new Phrase(""/*"Hamali Expense  :- "+hamaliExpense*/, Normalfont11));
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
			long grossTotalInLong = Math.round(Double.parseDouble(gross_total));
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

			table_cell9 = new PdfPCell(new Phrase(
					"*Goods Once Sold will not be taken Back.",
					font8NoBold));
			table_cell9.setBorder(table_cell.NO_BORDER);
			footer.addCell(table_cell9);

			document.add(footer);
			document.add(new Paragraph(" "));

		}

		if (b > 20 && b <= 30)
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

			table_cell4 = new PdfPCell(new Phrase(""/*"Hamali Expense  :- "+hamaliExpense*/, Normalfont11));
			table_cell4.setColspan(2);
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
			long totalInLong = Math.round(Double.parseDouble(gross_total));
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
		}

		rs.close();
		stmt.close();
		conn.close();
		document.close();
		
		
		try
		{
	//			int checkI = CheckInternetConn.checkInternet();
			int checkI = 1;
			if(checkI > 0)
			{
/* 				String emailId = ClientDetails.getEmail();
				String embelEmail = ClientDetails.getEmbelEmail();
				String embelPassword = ClientDetails.getEmbelEmailPassword(); */
				String emailId = email;
				String embelEmail = "prasadbackupacc95@gmail.com";
				String embelPassword = "9527454547";
				String vendorName = "";
	
				javax.mail.Session mailSession = javax.mail.Session.getInstance(System.getProperties());
				Transport transport = new SMTPTransport(mailSession, new URLName("smtp.gmail.com"));
				transport = mailSession.getTransport("smtps");
				transport.connect("smtp.gmail.com", 465, embelEmail, embelPassword);
	
				MimeMessage m = new MimeMessage(mailSession);
				m.setFrom(new InternetAddress(emailId));
				Address[] toAddr = new InternetAddress[] { new InternetAddress(emailId) };
				m.setRecipients(javax.mail.Message.RecipientType.TO, toAddr);
				m.setHeader("Content-Type", "multipart/mixed");
				m.setSubject("TAX INVOICE " );
				m.setSentDate(new java.util.Date());
	
				MimeBodyPart messageBodyPart = new MimeBodyPart();
				messageBodyPart.setText("Dear,  " + vendorName);
				Multipart multipart = new MimeMultipart();
				multipart.addBodyPart(messageBodyPart);
	
				messageBodyPart = new MimeBodyPart();
	
				DataSource source = new ByteArrayDataSource(baos.toByteArray(), "application/pdf");
				messageBodyPart.setDataHandler(new DataHandler(source));
				messageBodyPart.setFileName("Tax Invoice.pdf");
				multipart.addBodyPart(messageBodyPart);
	
				m.setContent(multipart);
	
				transport.sendMessage(m, m.getAllRecipients());
				transport.close();
				out.println("Thanks for sending mail!");
				System.out.println("BILLING PDF SENT");
			}
			else
			{
				System.out.println("NO INTERNET");
			}
		} catch (Exception e) {
			out.println(e.getMessage());
			e.printStackTrace();
		}
		
	} catch (DocumentException de) {
		throw new IOException(de.getMessage());
	}
%>
