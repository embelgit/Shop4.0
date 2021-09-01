
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
<%
	System.out.println("\n**************PDF CODE START**************\n");
	response.setContentType("application/pdf");
	Long billno = (Long) session.getAttribute("fertilizerBillNo");
	String creditCustomerName = (String) session.getAttribute("creditCustomerName"); 

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
	double sale=0d;
	double tota=0d;
	/* Double discount=0d; */
	String grossT = "";

	Connection conn = null;

	try {

		// step 1
				Document document = new Document();

				// step 2

				PdfWriter.getInstance(document, response.getOutputStream());

				// step 3
				document.open();

				Class.forName("com.mysql.jdbc.Driver");
				conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/shop", "root", "root");
				Statement stmt = conn.createStatement();

				//ResultSet rs = stmt.executeQuery("select product_name,village,sale_price,total_amount from fertilizer_bill WHERE customerBill=" + billno);

				//ResultSet rs = stmt.executeQuery("select fertilizer_bill.product_name,village, manufacturing_company, fertilizer_bill.weight, quantity, fertilizer_bill.sale_price, total_amount, total_amount,expenses,gross_total from fertilizer_bill left join product_details on fertilizer_bill.fk_product_id = product_details.pk_product_id where fertilizer_bill.customerBill =" + 166);
				ResultSet rs = stmt.executeQuery("select customer_name, fertilizer_billing.product_name, fertilizer_billing.village, fertilizer_billing.company, fertilizer_billing.weight, fertilizer_billing.kg, fertilizer_billing.grams, fertilizer_billing.quantity, fertilizer_billing.Without_Tax_Rate, fertilizer_billing.total_per_product, fertilizer_billing.total_all_product, fertilizer_billing.hamali_expense, fertilizer_billing.gross_total , fertilizer_billing.tax_percentage,fertilizer_billing.hsn,fertilizer_billing.igstPercentage,fertilizer_billing.fk_shop_id,s.shop_name,fertilizer_billing.Discount_amount ,fertilizer_billing.sale_price, fertilizer_billing.unit, fertilizer_billing.ltr, fertilizer_billing.mili from fertilizer_billing left join shop_details s on fk_shop_id=pk_shop_id where bill_no = 1");
				
				String UnitName = rs.getString(21);
				
				rs.first();

				System.out.println("Query Execute");
				Date d1 = new Date();
				SimpleDateFormat sdf = new SimpleDateFormat("dd-MMM-yyyy");
				SimpleDateFormat sdf1 = new SimpleDateFormat("E");
				SimpleDateFormat sdf2 = new SimpleDateFormat("hh:mm:ss  ");
				sdf2.setTimeZone(TimeZone.getTimeZone("IST"));

				Date billDate = new Date();
				SimpleDateFormat dateFormater = new SimpleDateFormat("dd-MM-yyyy");
				String StrBillDate = dateFormater.format(billDate);

				String stdver1 = (String) sdf.format(d1);
				//String day = sdf1.format(d1.getDate());
				//String Time = sdf2.format(d1.getTime());
				String dtfinl = stdver1;

		DecimalFormat df = new DecimalFormat("#.00");

		Font font15Bold = new Font(Font.FontFamily.TIMES_ROMAN, 15, Font.BOLD, BaseColor.BLACK);
		Font font15BoldUnderline = new Font(Font.FontFamily.TIMES_ROMAN, 15, Font.BOLD | Font.UNDERLINE,
				BaseColor.BLACK);
		Font font12 = new Font(Font.FontFamily.TIMES_ROMAN, 12, Font.BOLD, BaseColor.BLACK);
		Font font11 = new Font(Font.FontFamily.TIMES_ROMAN, 11, Font.BOLD, BaseColor.BLACK);
		Font font12NoBold = new Font(Font.FontFamily.TIMES_ROMAN, 12, Font.NORMAL, BaseColor.BLACK);
		Font font8NoBold = new Font(Font.FontFamily.TIMES_ROMAN, 8, Font.NORMAL, BaseColor.BLACK);
		Font font9NoBold = new Font(Font.FontFamily.TIMES_ROMAN, 9, Font.NORMAL, BaseColor.BLACK);
		Font font10NoBold = new Font(Font.FontFamily.TIMES_ROMAN, 10, Font.NORMAL, BaseColor.BLACK);
		Font font12BoldUnderline = new Font(Font.FontFamily.TIMES_ROMAN, 12, Font.BOLD | Font.UNDERLINE,
				BaseColor.BLACK);
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

		PdfPCell table_cell;
		
		 ShopId = rs.getDouble("fk_shop_id");
		 ShopName = rs.getString("shop_name");
		
			if(ShopId == 1)
			{
				 table_cell = new PdfPCell(new Phrase("Bill Cash/Credit Memorandum", Normalfont11));
					table_cell.setBorder(table_cell.NO_BORDER);
					table.addCell(table_cell);
		
					table_cell = new PdfPCell(new Phrase("|| SHREE ||"));
					table_cell.setBorder(table_cell.NO_BORDER);
					table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
					table.addCell(table_cell);
		
					table_cell = new PdfPCell(new Phrase("GST No. 27ACHPN9714D1ZI", Normalfont11));
					table_cell.setBorder(table_cell.NO_BORDER);
					table.addCell(table_cell);
					}
					else{
						table_cell = new PdfPCell(new Phrase("Bill Cash/Credit Memorandum", Normalfont11));
						table_cell.setBorder(table_cell.NO_BORDER);
						table.addCell(table_cell);
		
						table_cell = new PdfPCell(new Phrase("|| SHREE ||"));
						table_cell.setBorder(table_cell.NO_BORDER);
						table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
						table.addCell(table_cell);
		
						table_cell = new PdfPCell(new Phrase("GST No. 27ACHPN9714D1ZI", Normalfont11));
						table_cell.setBorder(table_cell.NO_BORDER);
						table.addCell(table_cell);
					}
						
					//-----------------
			        if(ShopId == 1){
					table_cell = new PdfPCell(new Phrase("Mob No : 9421841342", Normalfont11));
					table_cell.setBorder(table_cell.NO_BORDER);
					table.addCell(table_cell);
		
					table_cell = new PdfPCell(new Phrase("Tax Invoice", font15Bold));
					table_cell.setBorder(table_cell.NO_BORDER);
					table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
					table.addCell(table_cell);
		
					table_cell = new PdfPCell(new Phrase("Pan No. ACMPN7189D", Normalfont11));
					table_cell.setBorder(table_cell.NO_BORDER);
					table.addCell(table_cell);
			        }
			        else{
			        	table_cell = new PdfPCell(new Phrase("Mob No : 9421841342", Normalfont11));
			    		table_cell.setBorder(table_cell.NO_BORDER);
			    		table.addCell(table_cell);
		
			    		table_cell = new PdfPCell(new Phrase("Tax Invoice", font15Bold));
			    		table_cell.setBorder(table_cell.NO_BORDER);
			    		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
			    		table.addCell(table_cell);
		
			    		table_cell = new PdfPCell(new Phrase("Pan No. ACHPN9714D", Normalfont11));
			    		table_cell.setBorder(table_cell.NO_BORDER);
			    		table.addCell(table_cell);
			        }
					//--------
			        if(ShopId == 1){
					table_cell = new PdfPCell(new Phrase(""));
					table_cell.setBorder(table_cell.NO_BORDER);
					table.addCell(table_cell);
		
					table_cell = new PdfPCell(new Phrase(ShopName, font15Bold));
					table_cell.setBorder(table_cell.NO_BORDER);
					table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
					table.addCell(table_cell);
		
					table_cell = new PdfPCell(new Phrase(""));
					table_cell.setBorder(table_cell.NO_BORDER);
					table.addCell(table_cell);
			        }
			        else {
			        	
			        	table_cell = new PdfPCell(new Phrase(""));
			    		table_cell.setBorder(table_cell.NO_BORDER);
			    		table.addCell(table_cell);
		
			    		table_cell = new PdfPCell(new Phrase(ShopName, font15Bold));
			    		table_cell.setBorder(table_cell.NO_BORDER);
			    		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
			    		table.addCell(table_cell);
		
			    		table_cell = new PdfPCell(new Phrase(""));
			    		table_cell.setBorder(table_cell.NO_BORDER);
			    		table.addCell(table_cell);
			        }
			//-------------
		
			table_cell = new PdfPCell(new Phrase("Bill No: " + billno));
			table_cell.setBorder(table_cell.NO_BORDER);
			table.addCell(table_cell);
		
			table_cell = new PdfPCell(new Phrase("Bhokar Road,Tamsa Pin : 431713", Normalfont14));
			table_cell.setBorder(table_cell.NO_BORDER);
			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
			table.addCell(table_cell);
		
			table_cell = new PdfPCell(new Phrase(""));
			table_cell.setBorder(table_cell.NO_BORDER);
			table_cell.setPaddingBottom(20f);
			table.addCell(table_cell);
			
			
			table_cell = new PdfPCell(new Phrase(""));
			table_cell.setBorder(Rectangle.BOTTOM);
			table.addCell(table_cell);
		
			table_cell = new PdfPCell(new Phrase("Tal.Hadgoan,Dist.Nanded", Normalfont14));
			table_cell.setBorder(Rectangle.BOTTOM);
			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell.setPaddingBottom(20f);
			table.addCell(table_cell);
		
			table_cell = new PdfPCell(new Phrase(""));
			table_cell.setBorder(Rectangle.BOTTOM);
			table_cell.setPaddingBottom(20f);
			table.addCell(table_cell);
		
		document.add(table);
		
		/* table for customer name, village and date */
		
		PdfPTable smallTable = new PdfPTable(3);
		smallTable.setWidthPercentage(100);
		
		float[] smallTablecolumnWidths = { 0.4f, 0.2f, 0.2f };
		smallTable.setWidths(smallTablecolumnWidths);
		
		PdfPCell table_cell2;
		
		String custName;
		
		String cn = String.valueOf(rs.getString("customer_name"));
		
		if(cn.equals("N/A")){
			custName = creditCustomerName;
		}else
		{
			custName = cn;
		}
		
		table_cell2 = new PdfPCell(new Phrase("Mr. " +custName , font12));
		table_cell2.setBorder(table_cell.NO_BORDER);
		smallTable.addCell(table_cell2);
		
		
		
		/* String expenses = String.valueOf(rs.getString("transportation_expense")); */
		String HamaliExpence = String.valueOf(rs.getString("hamali_expense"));
		
		String gross_total = String.valueOf(rs.getString("gross_total"));
		
		table_cell2 = new PdfPCell(new Phrase("Village: " + rs.getString("village")));
		table_cell2.setBorder(table_cell.NO_BORDER);
		table_cell2.setHorizontalAlignment(Element.ALIGN_RIGHT);
		smallTable.addCell(table_cell2);
		
		table_cell2 = new PdfPCell(new Phrase("Date: " + StrBillDate));
		table_cell2.setBorder(table_cell.NO_BORDER);
		table_cell2.setHorizontalAlignment(Element.ALIGN_RIGHT);
		smallTable.addCell(table_cell2);

		document.add(smallTable);
		document.add(new Paragraph(""));

		//Heading Info table
		PdfPTable table3 = new PdfPTable(10);
		table3.setWidthPercentage(100);

		float[] columnWidths3 = { 0.3f, 0.3f, 0.2f, 0.2f,0.1f, 0.2f, 0.2f, 0.2f,0.2f, 0.3f };
		table3.setWidths(columnWidths3);

		PdfPCell table_cell3;

		table_cell3 = new PdfPCell(new Phrase("Product Name", font10NoBold));
		table_cell3.setBorderWidth(1f);
		table_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell3.setBorder(table_cell3.NO_BORDER);
		table_cell3.setPaddingTop(1f);
		table_cell3.setPaddingBottom(1f);
		table3.addCell(table_cell3);

		table_cell3 = new PdfPCell(new Phrase("Company", font10NoBold));
		table_cell3.setBorderWidth(1f);
		table_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell3.setBorder(table_cell3.NO_BORDER);
		table_cell3.setPaddingTop(1f);
		table_cell3.setPaddingBottom(1f);
		table3.addCell(table_cell3);

		/* 
			table_cell3 = new PdfPCell(new Phrase("HSN", font10NoBold));
			table_cell3.setBorderWidth(1f);
			table_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell3.setBorder(table_cell3.NO_BORDER);
			table_cell3.setPaddingTop(1f);
			table_cell3.setPaddingBottom(1f);
			table3.addCell(table_cell3);
		*/

		table_cell3 = new PdfPCell(new Phrase("kg", font10NoBold));
		table_cell3.setBorderWidth(1f);
		table_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell3.setBorder(table_cell3.NO_BORDER);
		table_cell3.setPaddingTop(1f);
		table_cell3.setPaddingBottom(1f);
		table3.addCell(table_cell3);
		
		table_cell3 = new PdfPCell(new Phrase("gm", font10NoBold));
		table_cell3.setBorderWidth(1f);
		table_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell3.setBorder(table_cell3.NO_BORDER);
		table_cell3.setPaddingTop(1f);
		table_cell3.setPaddingBottom(1f);
		table3.addCell(table_cell3);
		
		table_cell3 = new PdfPCell(new Phrase("ltr", font10NoBold));
		table_cell3.setBorderWidth(1f);
		table_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell3.setBorder(table_cell3.NO_BORDER);
		table_cell3.setPaddingTop(1f);
		table_cell3.setPaddingBottom(1f);
		table3.addCell(table_cell3);
		
		table_cell3 = new PdfPCell(new Phrase("ml", font10NoBold));
		table_cell3.setBorderWidth(1f);
		table_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell3.setBorder(table_cell3.NO_BORDER);
		table_cell3.setPaddingTop(1f);
		table_cell3.setPaddingBottom(1f);
		table3.addCell(table_cell3);

		/*
			table_cell3 = new PdfPCell(new Phrase("Unit", font10NoBold));
			table_cell3.setBorderWidth(1f);
			table_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell3.setBorder(table_cell3.NO_BORDER);
			table_cell3.setPaddingTop(1f);
			table_cell3.setPaddingBottom(1f);
			table3.addCell(table_cell3);
		*/

		
		/*
			table_cell3 = new PdfPCell(new Phrase("Price(gst)", font10NoBold));
			table_cell3.setBorderWidth(1f);
			table_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell3.setBorder(table_cell3.NO_BORDER);
			table_cell3.setPaddingTop(1f);
			table_cell3.setPaddingBottom(1f);
			table3.addCell(table_cell3);
		*/
		
		table_cell3 = new PdfPCell(new Phrase("Qty", font10NoBold));
		table_cell3.setBorderWidth(1f);
		table_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell3.setBorder(table_cell3.NO_BORDER);
		table_cell3.setPaddingTop(1f);
		table_cell3.setPaddingBottom(1f);
		table3.addCell(table_cell3);

		table_cell3 = new PdfPCell(new Phrase("GST %", font10NoBold));
		table_cell3.setBorderWidth(1f);
		table_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell3.setBorder(table_cell3.NO_BORDER);
		table_cell3.setPaddingTop(1f);
		table_cell3.setPaddingBottom(1f);
		table3.addCell(table_cell3);
		
		table_cell3 = new PdfPCell(new Phrase("Rate", font10NoBold));
		table_cell3.setBorderWidth(1f);
		table_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell3.setPaddingBottom(3f);
		table_cell3.setBorder(table_cell3.NO_BORDER);
		table3.addCell(table_cell3);

		table_cell3 = new PdfPCell(new Phrase("Amount", font10NoBold));
		table_cell3.setBorderWidth(1f);
		table_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell3.setPaddingBottom(3f);
		table_cell3.setBorder(table_cell3.NO_BORDER);
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

		float[] columnWidths4 = {0.3f, 0.3f, 0.2f, 0.2f,0.1f,0.2f, 0.2f, 0.2f,0.2f, 0.3f};
		table4.setWidths(columnWidths4);

		PdfPTable table5 = new PdfPTable(10);
		table5.setWidthPercentage(100);

		float[] columnWidths5 = { 0.3f, 0.3f, 0.2f, 0.2f,0.1f, 0.2f, 0.2f, 0.2f,0.2f, 0.3f };
		table5.setWidths(columnWidths5);

		PdfPTable table6 = new PdfPTable(10);
		table6.setWidthPercentage(100);

		float[] columnWidths6 = { 0.3f, 0.3f, 0.2f, 0.2f,0.1f, 0.2f, 0.2f, 0.2f,0.2f, 0.3f };
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

		while (rs.next()) {
	//		if (b < 10) {

				String product_name = rs.getString("product_name");
				table_cell4 = new PdfPCell(new Phrase(product_name, font9NoBold));
				table_cell4.setBorder(Rectangle.RIGHT | Rectangle.LEFT);
				table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
                		table_cell4.setBorder(table_cell4.NO_BORDER);
				table_cell4.setBorderWidth(1f);
				table_cell4.setPaddingTop(2);
				table_cell4.setPaddingBottom(2);
				table4.addCell(table_cell4);

				String manufacturing_company = rs.getString("company");
				table_cell4 = new PdfPCell(new Phrase(manufacturing_company, font9NoBold));
				table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
				table_cell4.setBorder(table_cell4.NO_BORDER);
				table_cell4.setBorderWidth(1f);
				table_cell4.setPaddingTop(2);
				table_cell4.setPaddingBottom(2);
				table4.addCell(table_cell4);

				/*
					String hsnNumber = rs.getString("hsn");
					table_cell4 = new PdfPCell(new Phrase(hsnNumber, font9NoBold));
					table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
					table_cell4.setBorder(table_cell4.NO_BORDER);
					table_cell4.setBorderWidth(1f);
					table_cell4.setPaddingTop(2);
					table_cell4.setPaddingBottom(2);
					table4.addCell(table_cell4);
				*/

				double kg = rs.getDouble("kg");
				table_cell4 = new PdfPCell(new Phrase(String.valueOf(kg), font9NoBold));
				table_cell4.setBorder(table_cell4.NO_BORDER);
				table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
				table_cell4.setBorderWidth(1f);
				table_cell4.setPaddingTop(2);
				table_cell4.setPaddingBottom(2);
				table4.addCell(table_cell4);
				
				double grams = rs.getDouble("grams");
				table_cell4 = new PdfPCell(new Phrase(String.valueOf(grams), font9NoBold));
				table_cell4.setBorder(table_cell4.NO_BORDER);
				table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
				table_cell4.setBorderWidth(1f);
				table_cell4.setPaddingTop(2);
				table_cell4.setPaddingBottom(2);
				table4.addCell(table_cell4);
				
				double ltr = rs.getDouble("ltr");
				table_cell4 = new PdfPCell(new Phrase(String.valueOf(ltr), font9NoBold));
				table_cell4.setBorder(table_cell4.NO_BORDER);
				table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
				table_cell4.setBorderWidth(1f);
				table_cell4.setPaddingTop(2);
				table_cell4.setPaddingBottom(2);
				table4.addCell(table_cell4);
				
				double mili = rs.getDouble("mili");
				table_cell4 = new PdfPCell(new Phrase(String.valueOf(mili), font9NoBold));
				table_cell4.setBorder(table_cell4.NO_BORDER);
				table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
				table_cell4.setBorderWidth(1f);
				table_cell4.setPaddingTop(2);
				table_cell4.setPaddingBottom(2);
				table4.addCell(table_cell4);
				
				/*
					String unit = rs.getString("unit");
					table_cell4 = new PdfPCell(new Phrase(String.valueOf(unit), font9NoBold));
					table_cell4.setBorder(table_cell4.NO_BORDER);
					table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
					table_cell4.setBorderWidth(1f);
					table_cell4.setPaddingTop(2);
					table_cell4.setPaddingBottom(2);
					table4.addCell(table_cell4);
				*/

				
				/*  BigDecimal salePrice = rs.getBigDecimal("salePriceWithoutTax", 2);
				String sale_price = String.valueOf(rs.getString("salePriceWithoutTax")); */
				 
				int quantity = rs.getInt("quantity");
				table_cell4 = new PdfPCell(new Phrase(String.valueOf(quantity), font9NoBold));
				table_cell4.setBorder(table_cell4.NO_BORDER);
				table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
				table_cell4.setBorderWidth(1f);
				table_cell4.setPaddingTop(2);
				table_cell4.setPaddingBottom(2);
				table4.addCell(table_cell4);
				
				
				BigDecimal salePrice = rs.getBigDecimal("Without_Tax_Rate", 2);
				
				discount = rs.getDouble("Discount_amount");
				
				double Without_Tax_Rate = rs.getDouble("Without_Tax_Rate");
				 GST = rs.getDouble("tax_percentage");
				 iGST = rs.getDouble("igstPercentage");
				 System.out.println("Rax rate = = ="+Without_Tax_Rate);
				if( iGST == 5 || iGST == 12 || iGST == 18 || iGST == 28){
					double taxPerc = (iGST/100);
					double taxAmount=taxPerc*(Without_Tax_Rate);
					double igstAmount = taxAmount * quantity;
					double qnt=rs.getDouble("quantity");
					double sale_price=rs.getDouble("sale_price");
					sale=(sale_price - taxAmount);
					/* tota = (sale_price * qnt);
					tota =  (sale * qnt) ; */
					
										
					if(UnitName.equalsIgnoreCase("p"))
					{
						if(qnt>0)
						{
							tota = (sale_price * qnt);
							tota =  (sale * qnt) ;
						}
					}
					
					if(qnt == 0)
					{
						if(UnitName.equalsIgnoreCase("kg"))
						{
							System.out.println("KG == Product Name====> "+rs.getString("product_name"));
							double salePricePerGram = sale_price/1000;
							double billingGrams = rs.getDouble("grams");
							double billingKg = rs.getDouble("kg");
							double billingKgInGrams = billingKg*1000;
							double totalGrams = (billingGrams + billingKgInGrams);
							//tota = (sale_price * qnt);
							tota =  (salePricePerGram * totalGrams);
						}
						if(UnitName.equalsIgnoreCase("ltr"))
						{
							System.out.println("LtrMili == Product Name====> "+rs.getString("product_name"));
							double salePricePerMili = sale_price/1000;
							double billingMili = rs.getDouble("mili");
							double billingLtr = rs.getDouble("ltr");
							double billingLtrInMili = billingLtr*1000;
							double totalMili = (billingMili + billingLtrInMili);
							//tota = (sale_price * qnt);
							tota =  (salePricePerMili * totalMili);
						}
					}
					
					igstTotal = igstTotal + igstAmount;
					System.out.println(" ln no 517 if( iGST == 5 || iGST == 12 || iGST == 18 || iGST == 28) =====>  igstTotal = = ="+igstTotal);
				}
				 if(GST == 5.00 || GST == 12.00 || GST == 18.00 || GST == 28.00)
				 {
					double taxPerc = (GST/100);
					double taxAmount=taxPerc*(Without_Tax_Rate);
					double gstAmount = taxAmount * quantity;
					double qnt=rs.getDouble("quantity");
					double sale_price=rs.getDouble("sale_price");
					System.out.println("ln no ==>525 saleprice value from fertilizerBillPDF.jsp  ========>   "+sale_price);
					sale=(sale_price - taxAmount);
					//tota =  (sale * qnt);
					
					if(UnitName.equalsIgnoreCase("p"))				
					 	{
						if(qnt>0)
						{	
							tota = (sale_price * qnt);
							tota =  (sale * qnt) ;
					 	}
					}
					if(UnitName.equalsIgnoreCase("kg"))
					{
						System.out.println("KG == Product Name====> "+rs.getString("product_name"));
						double salePricePerGram = sale_price/1000;
						double billingGrams = rs.getDouble("grams");
						double billingKg = rs.getDouble("kg");
						double billingKgInGrams = billingKg*1000;
						double totalGrams = (billingGrams + billingKgInGrams);
						//tota = (sale_price * qnt);
						tota =  (salePricePerGram * totalGrams);
					}
					if(UnitName.equalsIgnoreCase("ltr"))
					{
						System.out.println("LtrMili == Product Name====> "+rs.getString("product_name"));
						double salePricePerMili = sale_price/1000;
						double billingMili = rs.getDouble("mili");
						double billingLtr = rs.getDouble("ltr");
						double billingLtrInMili = billingLtr*1000;
						double totalMili = (billingMili + billingLtrInMili);
						//tota = (sale_price * qnt);
						tota =  (salePricePerMili * totalMili);
					}
					
					
					gstTotal = gstTotal + gstAmount;
					System.out.println("ln no 529 if(GST == 5.00 || GST == 12.00 || GST == 18.00 || GST == 28.00) ======>   gstTotal = = ="+gstTotal);
				}
				 if(GST == 0.00 || GST == 0)
				 {
					 double sale_price=rs.getDouble("sale_price");
					 double qnt=rs.getDouble("quantity");
					 //tota =  (sale_price * qnt) ;
					 if(UnitName.equalsIgnoreCase("p"))
					 {
						 if(qnt>0)
						 {
							 tota = (sale_price * qnt);
						 }					 
					 }
					 if(UnitName.equalsIgnoreCase("kg"))
						{
							System.out.println("KG == Product Name====> "+rs.getString("product_name"));
							double salePricePerGram = sale_price/1000;
							double billingGrams = rs.getDouble("grams");
							double billingKg = rs.getDouble("kg");
							double billingKgInGrams = billingKg*1000;
							double totalGrams = (billingGrams + billingKgInGrams);
							//tota = (sale_price * qnt);
							tota =  (salePricePerGram * totalGrams);
						}
						if(UnitName.equalsIgnoreCase("ltr"))
						{
							System.out.println("LtrMili == Product Name====> "+rs.getString("product_name"));
							double salePricePerMili = sale_price/1000;
							double billingMili = rs.getDouble("mili");
							double billingLtr = rs.getDouble("ltr");
							double billingLtrInMili = billingLtr*1000;
							double totalMili = (billingMili + billingLtrInMili);
							//tota = (sale_price * qnt);
							tota =  (salePricePerMili * totalMili);
						}
						
					 
					 System.out.println("ln no==>  536 if(GST == 0.00 || GST == 0) ======>   gstTotal = = ="+tota);
				 }
				 
				 
				 System.out.println("ln no ==> 540 tota value from fertilizerBillPDF.jsp  ========>  "+tota);
				 System.out.println("ln no ==> 541 sale value from fertilizerBillPDF.jsp  ========>  "+sale);
				 System.out.println("ln no ==> 542 saleprice value from fertilizerBillPDF.jsp  ========>  "+salePrice);
				 
			  	double qnt=rs.getDouble("quantity");
				/*double sale_price=rs.getDouble("sale_price");
				sale=(sale_price-(igstTotal/qnt) - (gstTotal/qnt)); */
			    
			    double perProuductPrize=tota/qnt;
				
				DecimalFormat formatter = new DecimalFormat("#0.00");
	   			/* double d=formatter.format(sale); */
				String Without_Tax = String.valueOf(formatter.format(perProuductPrize));
	   			
				table_cell3 = new PdfPCell(new Phrase(String.valueOf(Without_Tax_Rate), font12NoBold));			
	/* 			table_cell3 = new PdfPCell(new Phrase(String.valueOf(Without_Tax), font12NoBold));
	 */			table_cell3.setBorder(Rectangle.RIGHT | Rectangle.LEFT);
				table_cell3.setHorizontalAlignment(Element.ALIGN_RIGHT);
				table_cell3.setBorderWidth(1f);
				table_cell3.setPaddingTop(2);
				table_cell3.setPaddingBottom(2);
				table3.addCell(table_cell3);
				
				/* String sale_price1=rs.getString("sale_price");
				table_cell4 = new PdfPCell(new Phrase(sale_price1, font9NoBold));
				table_cell4.setBorder(table_cell4.NO_BORDER);
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


									


						


			table_cell4 = new PdfPCell(	new Phrase("\n\n\n\n\n\n\n\n\n\n\n\n\n\nDiscount" + discount, Normalfont11));
			table_cell4.setColspan(3);
			table_cell4.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell4.setBorder(Rectangle.NO_BORDER);
			table_cell4.setPaddingBottom(1f);
			table_cell4.setPaddingTop(1f);
			table_cell4.setBorderWidth(1f);
			table4.addCell(table_cell4);

			table_cell4 = new PdfPCell(
					new Phrase("\n\n\n\n\n\n\n\n\n\n\n\n\n\nCGST Amount:-" + df.format(gstTotal), Normalfont11));
			table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell4.setBorder(Rectangle.NO_BORDER);
			table_cell4.setColspan(3);
			table_cell4.setPaddingBottom(1f);
			table_cell4.setPaddingTop(1f);
			table_cell4.setBorderWidth(1f);
			table4.addCell(table_cell4);

			table_cell4 = new PdfPCell(new Phrase("\n\n\n\n\n\n\n\n\n\n\n\n\n\n"));
			table_cell4.setColspan(4);
			table_cell4.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell4.setBorder(Rectangle.NO_BORDER);
			table_cell4.setPaddingBottom(1f);
			table_cell4.setPaddingTop(1f);
			table_cell4.setBorderWidth(1f);
			table4.addCell(table_cell4);

			table_cell4 = new PdfPCell(
					new Phrase("Hamali Expense            :-" + HamaliExpence, Normalfont11));
			table_cell4.setColspan(3);
			table_cell4.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell4.setBorder(Rectangle.NO_BORDER);
			table_cell4.setPaddingBottom(1f);
			table_cell4.setPaddingTop(1f);
			table_cell4.setBorderWidth(1f);
			table4.addCell(table_cell4);

			table_cell4 = new PdfPCell(new Phrase("SGST Amount:-" + df.format(gstTotal1), Normalfont11));
			table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell4.setBorder(Rectangle.NO_BORDER);
			table_cell4.setColspan(3);
			table_cell4.setPaddingBottom(1f);
			table_cell4.setPaddingTop(1f);
			table_cell4.setBorderWidth(1f);
			table4.addCell(table_cell4);

			table_cell4 = new PdfPCell(
					new Phrase("Gross Total(Inc GST):-" + df.format(Double.parseDouble(gross_total)), font12));
			table_cell4.setColspan(4);
			table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell4.setBorder(Rectangle.NO_BORDER);
			table_cell4.setPaddingBottom(1f);
			table_cell4.setPaddingTop(1f);
			table_cell4.setBorderWidth(1f);
			table4.addCell(table_cell4);

			table_cell4 = new PdfPCell(new Phrase("", Normalfont11));
			table_cell4.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell4.setBorder(Rectangle.NO_BORDER);
			table_cell4.setPaddingBottom(1f);
			table_cell4.setPaddingTop(1f);
			table_cell4.setColspan(1);
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
			long totalInLong = Math.round(Double.parseDouble(gross_total));
			String grossTotal = String.valueOf(totalInLong);
			int grossTotalInInteger = Integer.parseInt(grossTotal);
			NumToWord w = new NumToWord();
			String amtInWord = w.convert(grossTotalInInteger);

			table_cell4 = new PdfPCell(new Phrase("Rupees in words : " + amtInWord + " Only/-", font11));
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
					"\n Customer Sign                                                                      From "+ShopName,	Normalfont11));
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

			table_cell9 = new PdfPCell(new Phrase(
					"1) Good Once Sold will not be taken Back.2)for agriculture only.3)subject to yavatmal juridisction.4)Sale label tag no.batch no.weight etc checked and purchased in good condition.                                                                            (Agriculture Use Only).",
					font8NoBold));
			table_cell9.setBorder(table_cell.NO_BORDER);
			footer.addCell(table_cell9);

			document.add(footer);
			document.add(new Paragraph(" "));


		rs.close();
		stmt.close();
		conn.close();
		document.close();
	}
	} catch (DocumentException de) {
		throw new IOException(de.getMessage());
	}
%>