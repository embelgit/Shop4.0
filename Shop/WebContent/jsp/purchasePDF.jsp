<%-- <%@page import="com.Shop.utility.CheckInternetConn"%>
<%@page import="com.Fertilizer.utility.DatabaseProperties"%> --%>

<%@page import="java.io.ByteArrayOutputStream"%>
<%@page import="javax.activation.DataHandler"%>
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
<%-- <%@page import="com.smt.bean.ClientDetails"%> --%>
<%@page import="org.w3c.dom.css.Rect"%>
<%@page import="com.Fertilizer.utility.NumToWord"%> 
<%@page import="java.time.LocalDateTime"%>
<%@page import="java.time.format.DateTimeFormatter"%>
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
<%@page import="com.itextpdf.text.Element"%>
<%@page import="java.util.TimeZone"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="com.itextpdf.text.Phrase"%>
<%@page import="java.util.Calendar"%>
<%@page import="com.itextpdf.text.Image"%>
<%@page import="com.itextpdf.text.pdf.PdfContentByte"%>

<%@page import="com.itextpdf.text.pdf.PdfGState"%>



<%
response.setContentType("application/pdf");
//Long billno = (Long) session.getAttribute("BillNo2");
//String customerName = (String) session.getAttribute("creditCustomerName");
//String gstTinNo = (String) session.getAttribute("gstTinNo");
//Double paidAmt = (Double) session.getAttribute("paidAmt");


//Long billno = (Long) session.getAttribute("fertilizerBillNo");
//String onlyShopName = (String) session.getAttribute("onlyShopName");  
String billno = (String) session.getAttribute("fertilizerBillNo");
String shopid = (String) session.getAttribute("shopid");
String gstno = (String) session.getAttribute("gstno");
String shopName = (String) session.getAttribute("shopName");
String email = (String) session.getAttribute("email");
String pass = (String) session.getAttribute("pass");
String onlyShopName="";
String ShopNameWithoutId1 = shopName.substring(4);
onlyShopName = ShopNameWithoutId1.trim();

System.out.println(":::::::::::::::::::::::::::::::::::::::::BillNO:-"+billno+"::::::::::::::::::::::::::::");
System.out.println("::::::::::::::shopName :-  "+shopName+"  ::::::::::::,  onlyShopName::::  "+onlyShopName);
System.out.println("::::::::::::::gstno :-  "+gstno+"  ::::::::::::,  gstno::::  "+gstno);
//System.out.print(":::::::::::::::::::::::::::::::::::::::::creditCustomerName:-"+customerName+"::::::::::::::::::::::::::::");
//ystem.out.print(":::::::::::::::::::::::::::::::::::::::::Paid Amt"+paidAmt+"::::::::::::::::::::::::::::");
	
//	if(customerName == null || customerName.equalsIgnoreCase("") || customerName.isEmpty())
//	{
//		customerName = " ";
//	}	
	int quantCount = 0;
	double finalTotAmountWithoutDis = 0;
	double finalTotAmountWithDis = 0;
	double finalDiscountAmt = 0;
	double finalgross = 0;
	double finalDis = 0;

	double expenseExtra = 0;
	double totalAmount = 0;
	double vatAmount = 0;
	double interGstAmount = 0;
	int itemCount = 0;
	String totAmountStr = "";
	String vatAmountStr = "";
	String extraExpence = "";
	String paymentMode = "";
	double totalBags = 0;
	double packingOfBag = 0;
	String allItemNames = "";
	String AllInOne = "";
	double TotalOfTotalAmtWithoutVat = 0;
	double TotalOfTotalAmtWithoutVat1 = 0;
	double half = 2;
	double gsttax = 0;
	double GrandTotal = 0.0;
	double Total = 0.0;
	double TotalTax = 0.0;
	double stateTaxTotal = 0.0;
	int a = 1;
	String discount = "";
	Double totalDiscount = 0.0;
	int disAmount = 0;
	String gst1 = "";
	Double gstAmt = 0.0;
	String GST_No = "GST No-27AADPU2557K1Z9";
	Double totalTaxAmount = 0.0;
	int totalQty = 0;
	String userName = "";
	String cashAmount = "";
	String cardAmount = "";
	String saleRerturnCreditAmount = "";
	Double tax5 = 0.0;
	Double tax12 = 0.0;
	Double tax18 = 0.0;
	Double tax28 = 0.0;
	Double pendingBillPayment = 0.0;
	String shopname="";
	String Address="";
	
	try
	{
		Connection conn = null;
		Connection conn1 = null;
		// step 1
		//Document document = new Document();
		Document document = new Document(PageSize.A7, 05f, 05f, 0f, 0f);
		document.setMargins(10 , 5 , 0 , 0);
		
		// step 2
		PdfWriter.getInstance(document, response.getOutputStream());
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
        PdfWriter.getInstance(document, baos);
		// step 3
		document.open();
		
/* 		Image image12 = Image.getInstance("C:/shoplogo.jpg");
		//Image image1 = Image.getInstance("/step0003.jpg");
		image12.scaleToFit(520f, 1200f);
		image12.setAlignment(Image.MIDDLE );
		document.add(image12);  */
		
			Class.forName("com.mysql.jdbc.Driver");
			conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/shop", "root", "root");
	
//		Class.forName(DatabaseProperties.dbDriver);
	/* 	conn = DriverManager.getConnection(DatabaseProperties.dbUrl, DatabaseProperties.dbUser, DatabaseProperties.dbPassword); */
		Statement stmt = conn.createStatement();

	
	ResultSet rs = stmt.executeQuery("select g.pk_goods_receive_id,g.product_name,g.company_Name,g.buy_price,g.quantity,g.Tax_Amount,g.unit,g.total_amount,g.gross_total,g.sgst,g.cgst,g.iGstPercentage,g.Per_Product_Total,g.shop_name,g.user_name,g.insertDate,g.buy_price_excl_tax,s.supplier_name,s.email_id from goods_receive g LEFT JOIN supplier_details s on fk_supplier_id=s.pk_supplier_id where g.bill_number='"+billno+"' AND g.fk_shop_id = '"+shopid+"'");

	System.out.println("Query Execute 1");
	
	Statement stmt1 = conn.createStatement();
	ResultSet rs1 = stmt1.executeQuery("SELECT shop_name, address, gstNo, Lic_No_wholesale, Lic_No_shop, footer_shop_name FROM shop_details where shop_id = '"+shopid+"'");
	
	
	while (rs1.next()) {
		 shopname=rs1.getString("shop_name");
		 Address=rs1.getString("address");
		}
	
	
		System.out.println("Query Execute 2");
		Date d1 = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("dd-MMM-yyyy");
		SimpleDateFormat sdf1 = new SimpleDateFormat("E");
		SimpleDateFormat sdf2 = new SimpleDateFormat("hh:mm:ss  ");
		sdf2.setTimeZone(TimeZone.getTimeZone("IST"));
	
		
		Date billDate = new Date();
		SimpleDateFormat dateFormater = new SimpleDateFormat("dd-MM-yyyy");
		String StrBillDate = dateFormater.format(billDate);
		System.out.println(StrBillDate + " =================================================================== ");

		String stdver1 = (String) sdf.format(d1);
		String day = sdf1.format(d1.getDate());
		String Time = sdf2.format(d1.getTime());
		String dtfinl = stdver1;

		DecimalFormat df = new DecimalFormat("#.00");

		Font font6 = new Font(Font.FontFamily.TIMES_ROMAN, 6, Font.NORMAL, BaseColor.BLACK);
		Font font7 = new Font(Font.FontFamily.TIMES_ROMAN, 7, Font.NORMAL, BaseColor.BLACK);
		Font font8 = new Font(Font.FontFamily.TIMES_ROMAN, 8, Font.NORMAL, BaseColor.BLACK);
		Font font8Bold = new Font(Font.FontFamily.TIMES_ROMAN, 8, Font.BOLD, BaseColor.BLACK);
		Font font9 = new Font(Font.FontFamily.TIMES_ROMAN, 9, Font.NORMAL, BaseColor.BLACK);
		Font font9Bold = new Font(Font.FontFamily.TIMES_ROMAN, 9, Font.BOLD, BaseColor.BLACK);
		Font font10 = new Font(Font.FontFamily.TIMES_ROMAN, 10, Font.NORMAL, BaseColor.BLACK);
		Font font10Bold = new Font(Font.FontFamily.TIMES_ROMAN, 10, Font.BOLD, BaseColor.BLACK);

		Font font17Bold = new Font(Font.FontFamily.TIMES_ROMAN, 17, Font.BOLD, BaseColor.BLACK);
		Font font16Bold = new Font(Font.FontFamily.TIMES_ROMAN, 16, Font.BOLD, BaseColor.BLACK);
		Font font15Bold = new Font(Font.FontFamily.TIMES_ROMAN, 15, Font.BOLD, BaseColor.BLACK);
		Font font14Bold = new Font(Font.FontFamily.TIMES_ROMAN, 14, Font.BOLD, BaseColor.BLACK);
		Font font13Bold = new Font(Font.FontFamily.TIMES_ROMAN, 13, Font.BOLD, BaseColor.BLACK);
		Font font12Bold = new Font(Font.FontFamily.TIMES_ROMAN, 12, Font.BOLD, BaseColor.BLACK);
		Font font11Bold = new Font(Font.FontFamily.TIMES_ROMAN, 11, Font.BOLD, BaseColor.BLACK);
		Font font16 = new Font(Font.FontFamily.TIMES_ROMAN, 16, Font.BOLD, BaseColor.BLACK);
		Font font14 = new Font(Font.FontFamily.TIMES_ROMAN, 14, Font.BOLD, BaseColor.BLACK);
		Font font12 = new Font(Font.FontFamily.TIMES_ROMAN, 12, Font.BOLD, BaseColor.BLACK);
		Font font13 = new Font(Font.FontFamily.TIMES_ROMAN, 13, Font.BOLD, BaseColor.BLACK);
		Font Normalfont12 = new Font(Font.FontFamily.TIMES_ROMAN, 12, Font.NORMAL, BaseColor.BLACK);
		Font Normalfont13 = new Font(Font.FontFamily.TIMES_ROMAN, 13, Font.NORMAL, BaseColor.BLACK);
		Font Normalfont14 = new Font(Font.FontFamily.TIMES_ROMAN, 14, Font.NORMAL, BaseColor.BLACK);
		Font ufont14 = new Font(Font.FontFamily.TIMES_ROMAN, 14, Font.UNDERLINE, BaseColor.BLACK);

		//Header Containt Table

		/* image1.scaleToFit(300f, 500f);
		Image imageCenter1 = Image.getInstance(image1); 
		 imageCenter1.setAlignment(Image.MIDDLE ); 
		document.add(imageCenter1); */

		rs.next();

//		String gg = rs.getString("gross_total");
//		String dd = rs.getString("Discount_amount");
//		String type = rs.getString("cust_type");
		String emm = rs.getString("email_id");
				
		SimpleDateFormat dff = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");		
		Date ddd = new Date();
		String cdate = dff.format(ddd);
	//	System.out.println("date  "+as);
		
	//	String ss = rs.getString("sgst");
	//	String ii = rs.getString("igstPercentage");
	//	String iia = rs.getString("igst_tax_amount_per_unit");
	//	String gstamt = rs.getString("total_gst_tax_per_product");
	//	Double ggst = Double.parseDouble(gstamt);
	//	Double ggstt = (ggst)/2;
		
		
/* 					PdfPTable headertable = new PdfPTable(1);
				headertable.setWidthPercentage(100);

				float[] HeadercolumnWidths = {0.5f };
				headertable.setWidths(HeadercolumnWidths);

				PdfPCell headerTable_cell;
				
					Image image1 = Image.getInstance("C:/shoplogo.png");
				image1.scaleToFit(200f, 200f);
				Image imageCenter = Image.getInstance(image1);
				imageCenter.setAlignment(Image.ALIGN_LEFT);
				headerTable_cell = new PdfPCell(new Phrase("", font12));
				headerTable_cell.setImage(image1);
				headerTable_cell.setPaddingTop(7);
				headerTable_cell.setFixedHeight(40f);				
				headerTable_cell.setHorizontalAlignment(Element.ALIGN_LEFT);
				headerTable_cell.setBorder(0);
				
				headertable.addCell(headerTable_cell); */
				
				// End	logo 
		     


//				document.add(headertable);
				
	
		PdfPTable headertable22 = new PdfPTable(1);
		headertable22.setWidthPercentage(100);

		float[] HeadercolumnWidths22 = { 1.0f };
		headertable22.setWidths(HeadercolumnWidths22);

		PdfPCell headerTable_cell22;

		headerTable_cell22 = new PdfPCell(new Phrase(shopname, font13Bold));
		headerTable_cell22.setHorizontalAlignment(Element.ALIGN_CENTER);
		headerTable_cell22.setPaddingBottom(2);
		headerTable_cell22.setPaddingTop(5);
		headerTable_cell22.setBorder(Rectangle.NO_BORDER);
		headertable22.addCell(headerTable_cell22);

		headerTable_cell22 = new PdfPCell(new Phrase(Address, font8Bold));
		headerTable_cell22.setHorizontalAlignment(Element.ALIGN_CENTER);
		headerTable_cell22.setPaddingBottom(2);
		headerTable_cell22.setBorder(Rectangle.NO_BORDER);
		headertable22.addCell(headerTable_cell22);

/* 		headerTable_cell22 = new PdfPCell(new Phrase("NEAR LATUR PHATA, NANDED", font8Bold));
		headerTable_cell22.setHorizontalAlignment(Element.ALIGN_CENTER);
		headerTable_cell22.setPaddingBottom(2);
		headerTable_cell22.setBorder(Rectangle.NO_BORDER);
		headertable22.addCell(headerTable_cell22); */

		headerTable_cell22 = new PdfPCell(new Phrase("Maharashtra", font8Bold));
		headerTable_cell22.setHorizontalAlignment(Element.ALIGN_CENTER);
		headerTable_cell22.setPaddingBottom(2);
		headerTable_cell22.setBorder(Rectangle.NO_BORDER);
		headertable22.addCell(headerTable_cell22);

/* 		headerTable_cell22 = new PdfPCell(new Phrase("Phone No. 024-222222", font9));
		headerTable_cell22.setHorizontalAlignment(Element.ALIGN_CENTER);
		headerTable_cell22.setPaddingBottom(1);
		headerTable_cell22.setBorder(Rectangle.NO_BORDER);
		headertable22.addCell(headerTable_cell22);
		
		headerTable_cell22 = new PdfPCell(new Phrase("Email:  rbspatil5@gmail.com", font9));
		headerTable_cell22.setHorizontalAlignment(Element.ALIGN_CENTER);
		headerTable_cell22.setPaddingBottom(3);
		headerTable_cell22.setBorder(Rectangle.NO_BORDER);
		headertable22.addCell(headerTable_cell22); */
		
		headerTable_cell22 = new PdfPCell(new Phrase(""));
		headerTable_cell22.setHorizontalAlignment(Element.ALIGN_CENTER);
		headerTable_cell22.setBorderWidth(0.5f);
		headerTable_cell22.setPaddingBottom(2);
		headerTable_cell22.setBorder(Rectangle.BOTTOM);
		headertable22.addCell(headerTable_cell22);
		
		headerTable_cell22 = new PdfPCell(new Phrase("Purchase Invoice", font9Bold));
		headerTable_cell22.setHorizontalAlignment(Element.ALIGN_CENTER);
		headerTable_cell22.setPaddingBottom(4);
		headerTable_cell22.setBorder(Rectangle.NO_BORDER);
		headertable22.addCell(headerTable_cell22);


		
		document.add(headertable22);

		PdfPTable headertable21 = new PdfPTable(2);
		headertable21.setWidthPercentage(100);

		float[] HeadercolumnWidths21 = { 1.0f, 0.5f };
		headertable21.setWidths(HeadercolumnWidths21);

		PdfPCell headerTable_cell21;

		document.add(headertable21);

//		String bb = rs.getString("bill_no");
		headerTable_cell21 = new PdfPCell(new Phrase("Invoice No. :   "+billno, font8Bold));
		headerTable_cell21.setBorder(Rectangle.NO_BORDER);
		headerTable_cell21.setHorizontalAlignment(Element.ALIGN_LEFT);
		headertable21.addCell(headerTable_cell21);

		headerTable_cell21 = new PdfPCell(new Phrase("", font8));
		headerTable_cell21.setBorder(Rectangle.NO_BORDER);
		headerTable_cell21.setHorizontalAlignment(Element.ALIGN_LEFT);
		headertable21.addCell(headerTable_cell21);
		
		headerTable_cell21 = new PdfPCell(new Phrase("Date  :  " + cdate, font8));
		headerTable_cell21.setBorder(Rectangle.NO_BORDER);
		headerTable_cell21.setHorizontalAlignment(Element.ALIGN_LEFT);
		headertable21.addCell(headerTable_cell21);

		headerTable_cell21 = new PdfPCell(new Phrase("", font8));
		headerTable_cell21.setHorizontalAlignment(Element.ALIGN_RIGHT);
		headerTable_cell21.setBorder(Rectangle.NO_BORDER);
		headertable21.addCell(headerTable_cell21);

		String ss= rs.getString("supplier_name");
		headerTable_cell21 = new PdfPCell(new Phrase("Supplier Name :   "+ss, font8));
		headerTable_cell21.setBorder(Rectangle.NO_BORDER);
		headerTable_cell21.setHorizontalAlignment(Element.ALIGN_LEFT);
		headertable21.addCell(headerTable_cell21);

		headerTable_cell21 = new PdfPCell(new Phrase("", font8));
		headerTable_cell21.setHorizontalAlignment(Element.ALIGN_RIGHT);
		headerTable_cell21.setBorder(Rectangle.NO_BORDER);
		headertable21.addCell(headerTable_cell21);
		
		headerTable_cell21 = new PdfPCell(new Phrase("GST No :   "+gstno, font8));
		headerTable_cell21.setBorder(Rectangle.NO_BORDER);
		headerTable_cell21.setHorizontalAlignment(Element.ALIGN_LEFT);
		headertable21.addCell(headerTable_cell21);
		
 		headerTable_cell21 = new PdfPCell(new Phrase("\n\n", font8));
		headerTable_cell21.setHorizontalAlignment(Element.ALIGN_LEFT);
		headerTable_cell21.setBorder(Rectangle.NO_BORDER);
		headertable21.addCell(headerTable_cell21);

 		headerTable_cell21 = new PdfPCell(new Phrase("", font8));
		headerTable_cell21.setHorizontalAlignment(Element.ALIGN_CENTER);
		headerTable_cell21.setBorder(Rectangle.BOTTOM);
		headertable21.addCell(headerTable_cell21);

		headerTable_cell21 = new PdfPCell(new Phrase("", font8));
		headerTable_cell21.setHorizontalAlignment(Element.ALIGN_CENTER);
		headerTable_cell21.setBorder(Rectangle.BOTTOM);
		headertable21.addCell(headerTable_cell21);  

		document.add(headertable21);

		//end informatin

		//table for particulars
		PdfPTable table = new PdfPTable(5);
//		table.setSpacingBefore(5);
		table.setWidthPercentage(100);
//		table.setSpacingAfter(5);
		
		float[] columnWidths = {0.4f,0.3f,0.2f,0.3f,0.3f}; //{ 0.1f, 0.7f, 0.3f, 0.3f, 0.3f, 0.5f };
		table.setWidths(columnWidths);

		PdfPTable table1 = new PdfPTable(5);
//		table1.setSpacingBefore(5);
		table1.setWidthPercentage(100);
//		table1.setSpacingAfter(5);

		float[] columnWidths1 = {0.4f,0.3f,0.2f,0.3f,0.3f};
		table1.setWidths(columnWidths1);

		PdfPTable table2 = new PdfPTable(5);
//		table2.setSpacingBefore(5);
		table2.setWidthPercentage(100);
//		table2.setSpacingAfter(5);

		float[] columnWidths2 ={0.4f,0.3f,0.2f,0.3f,0.3f};
		table2.setWidths(columnWidths2);

		PdfPTable table3 = new PdfPTable(5);
//		table3.setSpacingBefore(5);
		table3.setWidthPercentage(100);
//		table3.setSpacingAfter(5);

		float[] columnWidths3 = {0.4f,0.3f,0.2f,0.3f,0.3f};
		table3.setWidths(columnWidths3);

		PdfPTable table4 = new PdfPTable(5);
//		table4.setSpacingBefore(5);
		table4.setWidthPercentage(100);
//		table4.setSpacingAfter(5);

		float[] columnWidths4 = {0.4f,0.3f,0.2f,0.3f,0.3f};
		table4.setWidths(columnWidths4);

		PdfPTable table5 = new PdfPTable(5);
//		table5.setSpacingBefore(5);
		table5.setWidthPercentage(100);
//		table5.setSpacingAfter(5);

		float[] columnWidths5 = {0.4f,0.3f,0.2f,0.3f,0.3f};
		table5.setWidths(columnWidths5);

		PdfPTable table6 = new PdfPTable(5);
//		table6.setSpacingBefore(5);
		table6.setWidthPercentage(100);
//		table6.setSpacingAfter(5);

		float[] columnWidths6 = {0.4f,0.3f,0.2f,0.3f,0.3f};
		table6.setWidths(columnWidths6);

		PdfPTable table7 = new PdfPTable(5);
///		table7.setSpacingBefore(5);
		table7.setWidthPercentage(100);
//		table7.setSpacingAfter(5);

		float[] columnWidths7 = {0.4f,0.3f,0.2f,0.3f,0.3f};
		table7.setWidths(columnWidths7);

		PdfPTable table8 = new PdfPTable(5);
//		table8.setSpacingBefore(5);
		table8.setWidthPercentage(100);
//		table8.setSpacingAfter(5);

		float[] columnWidths8 = {0.4f,0.3f,0.2f,0.3f,0.3f};
		table8.setWidths(columnWidths8);

		PdfPTable table9 = new PdfPTable(5);
//		table9.setSpacingBefore(5);
		table9.setWidthPercentage(100);
//		table9.setSpacingAfter(5);

		float[] columnWidths9 = {0.4f,0.3f,0.2f,0.3f,0.3f};
		table9.setWidths(columnWidths9);

		PdfPCell table_cell;
		rs.beforeFirst();

		PdfPCell cell1 = new PdfPCell(new Paragraph("Product", font8Bold));
		cell1.setHorizontalAlignment(Element.ALIGN_LEFT);
	//	cell1.setBorder(cell1.NO_BORDER);
		cell1.setPaddingBottom(4f);
		cell1.setBorder(Rectangle.BOTTOM);
		
		PdfPCell cell5 = new PdfPCell(new Paragraph("Unit", font8Bold));
		cell5.setHorizontalAlignment(Element.ALIGN_CENTER);
	//	cell5.setBorder(cell5.NO_BORDER);
			cell5.setPaddingBottom(4f);
		cell5.setBorder(Rectangle.BOTTOM);
		
		PdfPCell cell2 = new PdfPCell(new Paragraph("Qty", font8Bold));
		cell2.setHorizontalAlignment(Element.ALIGN_CENTER);
	//	cell2.setBorder(cell2.NO_BORDER);
			cell2.setPaddingBottom(4f);
		cell2.setBorder(Rectangle.BOTTOM);
		
		PdfPCell cell3 = new PdfPCell(new Paragraph("Price", font8Bold));
		cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
	//	cell3.setBorder(cell3.NO_BORDER);
			cell3.setPaddingBottom(4f);
		cell3.setBorder(Rectangle.BOTTOM);
		
/* 		PdfPCell cell6 = new PdfPCell(new Paragraph("Tax Amt", font8Bold));
		cell6.setHorizontalAlignment(Element.ALIGN_CENTER);
	//	cell4.setBorder(cell4.NO_BORDER);
			cell6.setPaddingBottom(4f);
		cell6.setBorder(Rectangle.BOTTOM); */
		
		PdfPCell cell4 = new PdfPCell(new Paragraph("Total", font8Bold));
		cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
	//	cell4.setBorder(cell4.NO_BORDER);
			cell4.setPaddingBottom(4f);
		cell4.setBorder(Rectangle.BOTTOM);
		
		table.addCell(cell1);
		table.addCell(cell5);
		table.addCell(cell2);
		table.addCell(cell3);
//		table.addCell(cell6);
		table.addCell(cell4);
	

		table1.addCell(cell1);
		table1.addCell(cell5);
		table1.addCell(cell2);
		table1.addCell(cell3);
//		table1.addCell(cell6);
		table1.addCell(cell4);


		table2.addCell(cell1);
		table2.addCell(cell5);
		table2.addCell(cell2);
		table2.addCell(cell3);
//		table2.addCell(cell6);
		table2.addCell(cell4);


		table3.addCell(cell1);
		table3.addCell(cell5);
		table3.addCell(cell2);
		table3.addCell(cell3);
//		table3.addCell(cell6);	
		table3.addCell(cell4);


		table4.addCell(cell1);
		table4.addCell(cell5);
		table4.addCell(cell2);
		table4.addCell(cell3);
//		table4.addCell(cell6);
		table4.addCell(cell4);


		table5.addCell(cell1);
		table5.addCell(cell5);
		table5.addCell(cell2);
		table5.addCell(cell3);
//		table5.addCell(cell6);
		table5.addCell(cell4);


		table6.addCell(cell1);
		table6.addCell(cell5);
		table6.addCell(cell2);
		table6.addCell(cell3);
//		table6.addCell(cell6);
		table6.addCell(cell4);


		table7.addCell(cell1);
		table7.addCell(cell5);
		table7.addCell(cell2);
		table7.addCell(cell3);
//		table7.addCell(cell6);
		table7.addCell(cell4);


		table8.addCell(cell1);
		table8.addCell(cell5);
		table8.addCell(cell2);
		table8.addCell(cell3);
//		table8.addCell(cell6);
		table8.addCell(cell4);


		table9.addCell(cell1);
		table9.addCell(cell5);
		table9.addCell(cell2);
		table9.addCell(cell3);
//		table9.addCell(cell6);
		table9.addCell(cell4);
		Double aa  = 0.0;
		int i=0;
		while (rs.next())
		{

//				gst1 = rs.getString("total_per_product");
//				double gst = rs.getDouble("total_per_product");
//				double igst = rs.getDouble("total_per_product");
				double totalAmtWithoutVat = 0;
//				String sale = rs.getString("sale_price");
				String unit = rs.getString("unit");
				

				String itemName = rs.getString("product_name");

				String packing = String.valueOf(rs.getDouble("quantity"));


				table_cell = new PdfPCell(new Phrase("" + itemName , font8));
				table_cell.setHorizontalAlignment(Element.ALIGN_LEFT);
				table_cell.setBorder(Rectangle.NO_BORDER);
				table.addCell(table_cell);

				
				table_cell = new PdfPCell(new Phrase("" + unit , font8));
				table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
				table_cell.setBorder(Rectangle.NO_BORDER);
				table.addCell(table_cell);
				
				String subCat = rs.getString("company_Name");

				table_cell = new PdfPCell(new Phrase("" +packing, font8));
				table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
				table_cell.setBorder(Rectangle.NO_BORDER);
				table.addCell(table_cell);


//				String hsnsac1 = rs.getString("HsnSacNo");
				String disAmt = rs.getString("buy_price");
				Double disAmtCmp = Double.parseDouble(disAmt);

				table_cell = new PdfPCell(new Phrase("" + disAmt, font8));
				table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
				table_cell.setBorder(Rectangle.NO_BORDER);
				table.addCell(table_cell);

/* 				String tac = rs.getString("Tax_Amount");
				table_cell = new PdfPCell(new Phrase("" + tac , font8));
				table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
				table_cell.setBorder(Rectangle.NO_BORDER);
				table.addCell(table_cell); */
					
				double am = rs.getDouble("Per_Product_Total");
				table_cell = new PdfPCell(new Phrase(""+am, font8));
				table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
				table_cell.setBorder(Rectangle.NO_BORDER);
				table.addCell(table_cell);
				
				 aa  = aa+am;
				i++;		
/* 				table_cell = new PdfPCell(new Phrase("" + disAmt, font8));
				table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
				table_cell.setBorder(Rectangle.RIGHT);
				table.addCell(table_cell); */

//				String vatAmt = String.valueOf(rs.getDouble("totalperitem"));
/* 				table_cell = new PdfPCell(new Phrase(" " , font8));
				table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
				table_cell.setBorder(Rectangle.RIGHT);
				table.addCell(table_cell); */


				//code for total item display on second pdf form of sale bill



			

		}

		//if(a>1 && a<=6 )
		{

			
			table_cell = new PdfPCell(new Phrase(""));
			table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell.setBorder(Rectangle.BOTTOM);
			
			table.addCell(table_cell);

			table_cell = new PdfPCell(new Phrase(""));
			table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell.setBorder(Rectangle.BOTTOM);
			table.addCell(table_cell);

			table_cell = new PdfPCell(new Phrase(""));
			table_cell.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell.setBorder(Rectangle.BOTTOM);
			table.addCell(table_cell);

			table_cell = new PdfPCell(new Phrase("", font13));
			table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell.setBorder(Rectangle.BOTTOM);
			table.addCell(table_cell);
			
/* 			table_cell = new PdfPCell(new Phrase("", font13));
			table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell.setBorder(Rectangle.BOTTOM);
			table.addCell(table_cell); */

			table_cell = new PdfPCell(new Phrase("", font13));
			table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);		
			table_cell.setBorder(Rectangle.BOTTOM);
			table_cell.setPaddingBottom(3);
			table.addCell(table_cell);


			document.add(table);

			
			PdfPTable footerTable3aa = new PdfPTable(1);
			footerTable3aa.setWidthPercentage(100);

			float[] footerColumnWidths3a = { 1.3f };
			footerTable3aa.setWidths(footerColumnWidths3a);

			PdfPCell footerTable_cell3a;


			
			footerTable_cell3a = new PdfPCell(new Phrase("Total Amount  :  "+aa, font8Bold));
			footerTable_cell3a.setHorizontalAlignment(Element.ALIGN_RIGHT);
			footerTable_cell3a.setBorder(Rectangle.NO_BORDER);
			footerTable3aa.addCell(footerTable_cell3a);

//			footerTable_cell3a = new PdfPCell(new Phrase("Discount Amount  :  "+dd+"        Net Amount    : "+gg, font8Bold));
/* 				footerTable_cell3a = new PdfPCell(new Phrase("Discount Amount  :  ", font8Bold));
			footerTable_cell3a.setHorizontalAlignment(Element.ALIGN_LEFT);
			footerTable_cell3a.setBorder(Rectangle.NO_BORDER);
			footerTable3aa.addCell(footerTable_cell3a); */
			
			footerTable_cell3a = new PdfPCell(new Phrase(""));
			footerTable_cell3a.setHorizontalAlignment(Element.ALIGN_RIGHT);
			footerTable_cell3a.setBorder(Rectangle.BOTTOM);
			footerTable3aa.addCell(footerTable_cell3a);
			
			document.add(footerTable3aa);
			
			
			PdfPTable footerTable3 = new PdfPTable(1);
			footerTable3.setWidthPercentage(100);

			float[] footerColumnWidths3 = {1f};
			footerTable3.setWidths(footerColumnWidths3);

			PdfPCell footerTable_cell3;


/* 			footerTable_cell3 = new PdfPCell(new Phrase("Tax Summary", font8Bold));
			footerTable_cell3.setHorizontalAlignment(Element.ALIGN_LEFT);
			footerTable_cell3.setBorder(Rectangle.NO_BORDER);
			footerTable3.addCell(footerTable_cell3);
			
			footerTable_cell3 = new PdfPCell(new Phrase("CGST @:  "+0+" 													                             																                              "+0, font8Bold));
			footerTable_cell3.setHorizontalAlignment(Element.ALIGN_LEFT);
			footerTable_cell3.setBorder(Rectangle.NO_BORDER);
			footerTable3.addCell(footerTable_cell3);

			footerTable_cell3 = new PdfPCell(new Phrase("SGST @:  "+0+"              		    					 																						                                          "+0, font8Bold));
			footerTable_cell3.setHorizontalAlignment(Element.ALIGN_LEFT);
			footerTable_cell3.setBorder(Rectangle.NO_BORDER);
			footerTable3.addCell(footerTable_cell3); */
			

/* 			footerTable_cell3 = new PdfPCell(new Phrase("IGST @:  "+0+"              		    					 																						                                          "+iia, font8Bold));
			footerTable_cell3.setHorizontalAlignment(Element.ALIGN_LEFT);
			footerTable_cell3.setBorder(Rectangle.NO_BORDER);
			footerTable3.addCell(footerTable_cell3); */
			
			footerTable_cell3 = new PdfPCell(new Phrase("Total No. of Product:        "+i, font8));
			footerTable_cell3.setHorizontalAlignment(Element.ALIGN_LEFT);
			footerTable_cell3.setPadding(4);
			footerTable_cell3.setBorder(Rectangle.BOTTOM);
//			footerTable3.addCell(footerTable_cell3);

			
/* 			footerTable_cell3 = new PdfPCell(new Phrase("Call for free Home Delivery    : 7030811333          ", font8Bold));
			footerTable_cell3.setHorizontalAlignment(Element.ALIGN_LEFT);
	//		footerTable_cell3.setBorder(Rectangle.TOP);
			footerTable_cell3.setBorder(Rectangle.BOTTOM);
			footerTable_cell3.setPadding(4);
			footerTable3.addCell(footerTable_cell3); */
			
/* 			footerTable_cell3 = new PdfPCell(new Phrase("Terms & Condition apply: ", font9));
			footerTable_cell3.setHorizontalAlignment(Element.ALIGN_LEFT);
			footerTable_cell3.setBorder(Rectangle.NO_BORDER);
			footerTable_cell3.setPadding(1);
			footerTable3.addCell(footerTable_cell3); */
			
/* 			footerTable_cell3 = new PdfPCell(new Phrase("1. Goods once sold cannot be taken back & nor replacement accepted.", font8));
			footerTable_cell3.setHorizontalAlignment(Element.ALIGN_LEFT);
			footerTable_cell3.setBorder(Rectangle.NO_BORDER);
			footerTable_cell3.setPadding(1);
			footerTable3.addCell(footerTable_cell3);
			
			footerTable_cell3 = new PdfPCell(new Phrase("2. All dispute are subject to Nanded jurisdiction only.", font8));
			footerTable_cell3.setHorizontalAlignment(Element.ALIGN_LEFT);
			footerTable_cell3.setBorder(Rectangle.NO_BORDER);
			footerTable_cell3.setPadding(1); */
			
			footerTable3.addCell(footerTable_cell3);
			footerTable_cell3 = new PdfPCell(new Phrase("Thankyou , Please Visit Again!", font8Bold));
			footerTable_cell3.setHorizontalAlignment(Element.ALIGN_LEFT);
			footerTable_cell3.setBorder(Rectangle.NO_BORDER);
			footerTable3.addCell(footerTable_cell3);

/* 			footerTable_cell3 = new PdfPCell(new Phrase("Generated by rbspatil5@gmail.com",font8));
			footerTable_cell3.setHorizontalAlignment(Element.ALIGN_LEFT);
			footerTable_cell3.setBorder(Rectangle.NO_BORDER);
			footerTable3.addCell(footerTable_cell3); */

//			DateTimeFormatter dff = new DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");

			
/* 			footerTable_cell3 = new PdfPCell(new Phrase("",font8));
			footerTable_cell3.setHorizontalAlignment(Element.ALIGN_LEFT);
			footerTable_cell3.setBorder(Rectangle.NO_BORDER);
			footerTable3.addCell(footerTable_cell3); */

/* 			footerTable_cell3 = new PdfPCell(new Phrase("", font8));
			footerTable_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
			footerTable_cell3.setBorder(Rectangle.NO_BORDER);
			footerTable3.addCell(footerTable_cell3); */

/* 			footerTable_cell3 = new PdfPCell(new Phrase("", font8));
			footerTable_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
			footerTable_cell3.setBorder(Rectangle.NO_BO	RDER);
			footerTable3.addCell(footerTable_cell3); */


			document.add(footerTable3);
		}

		


		rs.close();
		stmt.close();
		conn.close();
		// step 5

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
	/*			String emailId = "embelbackup@gmail.com";
				String embelEmail = "prasadbackupacc95@gmail.com";
				String embelPassword = "9527454547";*/
				String emailId = emm;
				String embelEmail = email;
				String embelPassword = pass;
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
				m.setSubject("TAX INVOICE " + billDate);
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

