
<%-- <%@page import="org.apache.batik.script.Window"%> --%>
<%@page import="groovy.ui.Console"%>
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
<%--  <%@page import="com.itextpdf.text.log.SysoLogger"%> --%>
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
		ResultSet rs = stmt.executeQuery("select customer_name, fertilizer_billing.product_name, fertilizer_billing.village, fertilizer_billing.company, fertilizer_billing.weight, fertilizer_billing.kg, fertilizer_billing.grams, fertilizer_billing.quantity, fertilizer_billing.Without_Tax_Rate, fertilizer_billing.total_per_product, fertilizer_billing.total_all_product, fertilizer_billing.hamali_expense, fertilizer_billing.gross_total , fertilizer_billing.tax_percentage,fertilizer_billing.hsn,fertilizer_billing.igstPercentage,fertilizer_billing.fk_shop_id,s.shop_name,fertilizer_billing.Discount_amount ,fertilizer_billing.sale_price, fertilizer_billing.unit, fertilizer_billing.ltr, fertilizer_billing.mili from fertilizer_billing left join shop_details s on fk_shop_id=pk_shop_id where bill_no ="+billno);
		
		rs.first();
		
		int rowNumber = rs.getFetchSize();
		System.out.println("Resultset Count =====>"+rowNumber);
		
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
		Font font15BoldUnderline = new Font(Font.FontFamily.TIMES_ROMAN, 15, Font.BOLD | Font.UNDERLINE, BaseColor.BLACK);
		Font font12 = new Font(Font.FontFamily.TIMES_ROMAN, 12, Font.BOLD, BaseColor.BLACK);
		Font font12NoBold = new Font(Font.FontFamily.TIMES_ROMAN, 12, Font.NORMAL, BaseColor.BLACK);
		Font font12BoldUnderline = new Font(Font.FontFamily.TIMES_ROMAN, 12, Font.BOLD | Font.UNDERLINE, BaseColor.BLACK);
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
			
		
			 if(ShopId == 1){
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
		document.add(new Paragraph(" "));
		//Middle table

		PdfPTable table3 = new PdfPTable(10);
		table3.setWidthPercentage(100);

		float[] columnWidths3 = { 0.2f, 0.2f, 0.1f, 0.1f, 0.1f, 0.1f, 0.1f, 0.1f, 0.1f, 0.2f };
		table3.setWidths(columnWidths3);

		PdfPCell table_cell3;

		table_cell3 = new PdfPCell(new Phrase("Goods Details", font12));
		table_cell3.setBorderWidth(1f);
		table_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell3.setPaddingBottom(4f);
		table3.addCell(table_cell3);

		table_cell3 = new PdfPCell(new Phrase("Company", font12));
		table_cell3.setBorderWidth(1f);
		table_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell3.setPaddingBottom(4f);
		table3.addCell(table_cell3);
		/*
		table_cell3 = new PdfPCell(new Phrase("HSN", font12));
		table_cell3.setBorderWidth(1f);
		table_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell3.setPaddingBottom(4f);
		table3.addCell(table_cell3);
		*/	

		System.out.println("KG/Ltr In column.....");	
		table_cell3 = new PdfPCell(new Phrase("kg/ltr", font12));
		table_cell3.setBorderWidth(1f);
		table_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell3.setPaddingBottom(4f);
		table3.addCell(table_cell3);
		
		System.out.println("Grams/Mili In column.....");	
		table_cell3 = new PdfPCell(new Phrase("gm/ml", font12));
		table_cell3.setBorderWidth(1f);
		table_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell3.setPaddingBottom(4f);
		table3.addCell(table_cell3);
		
		/*
		Litre and mili column should be here
		*/

		System.out.println("Qty In column.....");
		table_cell3 = new PdfPCell(new Phrase("Qty", font12));
		table_cell3.setBorderWidth(1f);
		table_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell3.setPaddingBottom(4f);
		table3.addCell(table_cell3);

		table_cell3 = new PdfPCell(new Phrase("Rate", font12));
		table_cell3.setBorderWidth(1f);
		table_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell3.setPaddingBottom(4f);
		table3.addCell(table_cell3);

		table_cell3 = new PdfPCell(new Phrase("CGST %", font12));
		table_cell3.setBorderWidth(1f);
		table_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell3.setPaddingBottom(4f);
		table3.addCell(table_cell3);

		
		table_cell3 = new PdfPCell(new Phrase("SGST %", font12));
		table_cell3.setBorderWidth(1f);
		table_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell3.setPaddingBottom(4f);
		table3.addCell(table_cell3);
		
		table_cell3 = new PdfPCell(new Phrase("IGST %", font12));
		table_cell3.setBorderWidth(1f);
		table_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell3.setPaddingBottom(4f);
		table3.addCell(table_cell3);
		
		table_cell3 = new PdfPCell(new Phrase("Amount", font12));
		table_cell3.setBorderWidth(1f);
		table_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell3.setPaddingBottom(4f);
		table3.addCell(table_cell3);
		

		table_cell3 = new PdfPCell(new Phrase("\n"));
		table_cell3.setBorder(Rectangle.RIGHT | Rectangle.LEFT);
		table_cell3.setBorderWidth(1f);
		table3.addCell(table_cell3);

		table_cell3 = new PdfPCell(new Phrase("\n"));
		table_cell3.setBorder(Rectangle.RIGHT | Rectangle.LEFT);
		table_cell3.setBorderWidth(1f);
		table3.addCell(table_cell3);

		table_cell3 = new PdfPCell(new Phrase("\n"));
		table_cell3.setBorder(Rectangle.RIGHT | Rectangle.LEFT);
		table_cell3.setBorderWidth(1f);
		table3.addCell(table_cell3);
		
		table_cell3 = new PdfPCell(new Phrase("\n"));
		table_cell3.setBorder(Rectangle.RIGHT | Rectangle.LEFT);
		table_cell3.setBorderWidth(1f);
		table3.addCell(table_cell3);
		
		table_cell3 = new PdfPCell(new Phrase("\n"));
		table_cell3.setBorder(Rectangle.RIGHT | Rectangle.LEFT);
		table_cell3.setBorderWidth(1f);
		table3.addCell(table_cell3);

		table_cell3 = new PdfPCell(new Phrase("\n"));
		table_cell3.setBorder(Rectangle.RIGHT | Rectangle.LEFT);
		table_cell3.setBorderWidth(1f);
		table3.addCell(table_cell3);

		table_cell3 = new PdfPCell(new Phrase("\n"));
		table_cell3.setBorder(Rectangle.RIGHT | Rectangle.LEFT);
		table_cell3.setBorderWidth(1f);
		table3.addCell(table_cell3);

		table_cell3 = new PdfPCell(new Phrase("\n"));
		table_cell3.setBorder(Rectangle.RIGHT | Rectangle.LEFT);
		table_cell3.setBorderWidth(1f);
		table3.addCell(table_cell3);
		
		table_cell3 = new PdfPCell(new Phrase("\n"));
		table_cell3.setBorder(Rectangle.RIGHT | Rectangle.LEFT);
		table_cell3.setBorderWidth(1f);
		table3.addCell(table_cell3);
		
		table_cell3 = new PdfPCell(new Phrase("\n"));
		table_cell3.setBorder(Rectangle.RIGHT | Rectangle.LEFT);
		table_cell3.setBorderWidth(1f);
		table3.addCell(table_cell3);

		rs.beforeFirst();
		
		//ResultSet rs = stmt.executeQuery("select fertilizer_bill.product_name,village, manufacturing_company, batch_no, expiry_date, fertilizer_bill.weight, quantity, fertilizer_bill.sale_price, total_amount, total_amount from fertilizer_bill left join product_details on fertilizer_bill.fk_product_id = product_details.pk_product_id where fertilizer_bill.customerBill =" + billno);
		while (rs.next()) {
			
			ShopId = rs.getDouble("fk_shop_id"); 
			ShopName = rs.getString("shop_name");
			
			String product_name = rs.getString("product_name");
			table_cell3 = new PdfPCell(new Phrase(product_name, font12NoBold));
			table_cell3.setBorder(Rectangle.RIGHT | Rectangle.LEFT);
			table_cell3.setBorderWidth(1f);
			table_cell3.setPaddingTop(2);
			table_cell3.setPaddingBottom(2);
			table3.addCell(table_cell3);

			String manufacturing_company = rs.getString("company");
			table_cell3 = new PdfPCell(new Phrase(manufacturing_company, font12NoBold));
			table_cell3.setBorder(Rectangle.RIGHT | Rectangle.LEFT);
			table_cell3.setBorderWidth(1f);
			table_cell3.setPaddingTop(2);
			table_cell3.setPaddingBottom(2);
			table3.addCell(table_cell3);
			/*
			String hsnNumber = rs.getString("hsn");
			table_cell3 = new PdfPCell(new Phrase(hsnNumber, font12NoBold));
			table_cell3.setBorder(Rectangle.RIGHT | Rectangle.LEFT);
			table_cell3.setBorderWidth(1f);
			table_cell3.setPaddingTop(2);
			table_cell3.setPaddingBottom(2);
			table3.addCell(table_cell3);
			*/
			
			String UnitName = rs.getString("unit");
			
			if(UnitName.equalsIgnoreCase("kg"))
			{
				System.out.println("Setting db table KG In pdf column.....");
				Double kg = rs.getDouble("kg");
				table_cell3 = new PdfPCell(new Phrase(String.valueOf(kg), font12NoBold));
				table_cell3.setBorder(Rectangle.RIGHT | Rectangle.LEFT);
				table_cell3.setHorizontalAlignment(Element.ALIGN_RIGHT);
				table_cell3.setBorderWidth(1f);
				table_cell3.setPaddingTop(2);
				table_cell3.setPaddingBottom(2);
				table3.addCell(table_cell3);
				
				
				System.out.println("Setting db table grams In pdf column.....");
				Double grams = rs.getDouble("grams");
				table_cell3 = new PdfPCell(new Phrase(String.valueOf(grams), font12NoBold));
				table_cell3.setBorder(Rectangle.RIGHT | Rectangle.LEFT);
				table_cell3.setHorizontalAlignment(Element.ALIGN_RIGHT);
				table_cell3.setBorderWidth(1f);
				table_cell3.setPaddingTop(2);
				table_cell3.setPaddingBottom(2);
				table3.addCell(table_cell3);
			}
			
			if(UnitName.equalsIgnoreCase("ltr"))
			{
				System.out.println("Setting db table ltr In pdf column.....");
				Double ltr = rs.getDouble("ltr");
				table_cell3 = new PdfPCell(new Phrase(String.valueOf(ltr), font12NoBold));
				table_cell3.setBorder(Rectangle.RIGHT | Rectangle.LEFT);
				table_cell3.setHorizontalAlignment(Element.ALIGN_RIGHT);
				table_cell3.setBorderWidth(1f);
				table_cell3.setPaddingTop(2);
				table_cell3.setPaddingBottom(2);
				table3.addCell(table_cell3);				
				
				System.out.println("Setting db table mili In pdf column.....");
				Double mili = rs.getDouble("mili");
				table_cell3 = new PdfPCell(new Phrase(String.valueOf(mili), font12NoBold));
				table_cell3.setBorder(Rectangle.RIGHT | Rectangle.LEFT);
				table_cell3.setHorizontalAlignment(Element.ALIGN_RIGHT);
				table_cell3.setBorderWidth(1f);
				table_cell3.setPaddingTop(2);
				table_cell3.setPaddingBottom(2);
				table3.addCell(table_cell3);
			}
						
			//===========Litre and mili should be set here=========

			Integer quantity = rs.getInt("quantity");
			if(UnitName.equalsIgnoreCase("p"))
			{
	      		table_cell3 = new PdfPCell(new Phrase(String.valueOf(quantity), font12NoBold));
				table_cell3 = new PdfPCell(new Phrase(String.valueOf(quantity), font12NoBold));
				table_cell3.setBorder(Rectangle.RIGHT | Rectangle.LEFT);
				table_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
				table_cell3.setBorderWidth(1f);
				table_cell3.setPaddingTop(2);
				table_cell3.setPaddingBottom(2);
				table3.addCell(table_cell3);
			}
			BigDecimal salePrice = rs.getBigDecimal("Without_Tax_Rate", 2);
			
			discount = rs.getDouble("Discount_amount");
			
			double Without_Tax_Rate = rs.getDouble("Without_Tax_Rate");
			 GST = rs.getDouble("tax_percentage");
			 iGST = rs.getDouble("igstPercentage");
			 System.out.println("Rax rate = = ="+Without_Tax_Rate);
			
			 //IGST CALCULATION's
			 
			 if( iGST == 5 || iGST == 12 || iGST == 18 || iGST == 28)
			 {
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
			
			
			GST = rs.getDouble("tax_percentage");
			double half = 2;
			double halfGST = GST/half;
			
			table_cell3 = new PdfPCell(new Phrase(String.valueOf(halfGST), font12NoBold));
			table_cell3.setBorder(Rectangle.RIGHT | Rectangle.LEFT);
			table_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell3.setBorderWidth(1f);
			table_cell3.setPaddingTop(2);
			table_cell3.setPaddingBottom(2);
			table3.addCell(table_cell3);
			
			
			table_cell3 = new PdfPCell(new Phrase(String.valueOf(halfGST), font12NoBold));
			table_cell3.setBorder(Rectangle.RIGHT | Rectangle.LEFT);
			table_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell3.setBorderWidth(1f);
			table_cell3.setPaddingTop(2);
			table_cell3.setPaddingBottom(2);
			table3.addCell(table_cell3);
			
			iGST = rs.getDouble("igstPercentage");
			table_cell3 = new PdfPCell(new Phrase(String.valueOf(iGST), font12NoBold));
			table_cell3.setBorder(Rectangle.RIGHT | Rectangle.LEFT);
			table_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell3.setBorderWidth(1f);
			table_cell3.setPaddingTop(2);
			table_cell3.setPaddingBottom(2);
			table3.addCell(table_cell3);
			
		  	double quantForTotal=rs.getDouble("quantity");
		  	double salePriceForTotal= rs.getDouble("sale_price");
		  	double totalAmountSalePriceXquantity=salePriceForTotal*quantForTotal;
		  	System.out.println("\nln no 590 =============> for FerilizerBillPDF.jsp    ==============> "+totalAmountSalePriceXquantity+"\n");
			
			table_cell3 = new PdfPCell(new Phrase(String.valueOf(formatter.format(tota)), font12NoBold));
			table_cell3.setBorder(Rectangle.RIGHT | Rectangle.LEFT);
			table_cell3.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell3.setBorderWidth(1f);
			table_cell3.setPaddingTop(2);
			table_cell3.setPaddingBottom(2);
			table3.addCell(table_cell3);
			
			
		}

		table_cell3 = new PdfPCell(new Phrase("\n\n"));
		table_cell3.setBorder(Rectangle.RIGHT | Rectangle.LEFT | Rectangle.BOTTOM);
		table_cell3.setBorderWidth(1f);
		table3.addCell(table_cell3);

		table_cell3 = new PdfPCell(new Phrase("\n\n"));
		table_cell3.setBorder(Rectangle.RIGHT | Rectangle.LEFT | Rectangle.BOTTOM);
		table_cell3.setBorderWidth(1f);
		table3.addCell(table_cell3);

		table_cell3 = new PdfPCell(new Phrase("\n\n"));
		table_cell3.setBorder(Rectangle.RIGHT | Rectangle.LEFT | Rectangle.BOTTOM);
		table_cell3.setBorderWidth(1f);
		table3.addCell(table_cell3);
		
		table_cell3 = new PdfPCell(new Phrase("\n\n"));
		table_cell3.setBorder(Rectangle.RIGHT | Rectangle.LEFT | Rectangle.BOTTOM);
		table_cell3.setBorderWidth(1f);
		table3.addCell(table_cell3);

		table_cell3 = new PdfPCell(new Phrase("\n\n"));
		table_cell3.setBorder(Rectangle.RIGHT | Rectangle.LEFT | Rectangle.BOTTOM);
		table_cell3.setBorderWidth(1f);
		table3.addCell(table_cell3);

		table_cell3 = new PdfPCell(new Phrase("\n\n"));
		table_cell3.setBorder(Rectangle.RIGHT | Rectangle.LEFT | Rectangle.BOTTOM);
		table_cell3.setBorderWidth(1f);
		table3.addCell(table_cell3);

		table_cell3 = new PdfPCell(new Phrase("\n\n"));
		table_cell3.setBorder(Rectangle.RIGHT | Rectangle.LEFT | Rectangle.BOTTOM);
		table_cell3.setBorderWidth(1f);
		table3.addCell(table_cell3);
		
		table_cell3 = new PdfPCell(new Phrase("\n\n"));
		table_cell3.setBorder(Rectangle.RIGHT | Rectangle.LEFT | Rectangle.BOTTOM);
		table_cell3.setBorderWidth(1f);
		table3.addCell(table_cell3);
		
		table_cell3 = new PdfPCell(new Phrase("\n\n"));
		table_cell3.setBorder(Rectangle.RIGHT | Rectangle.LEFT | Rectangle.BOTTOM);
		table_cell3.setBorderWidth(1f);
		table3.addCell(table_cell3);
		
		table_cell3 = new PdfPCell(new Phrase("\n\n"));
		table_cell3.setBorder(Rectangle.RIGHT | Rectangle.LEFT | Rectangle.BOTTOM);
		table_cell3.setBorderWidth(1f);
		table3.addCell(table_cell3);

		

		//-----------------------------------

		table_cell3 = new PdfPCell(new Phrase("", font13Bold));
		table_cell3.setColspan(6);
		table_cell3.setHorizontalAlignment(Element.ALIGN_LEFT);
		table_cell3.setPaddingBottom(5f);
		table_cell3.setPaddingTop(5f);
		table_cell3.setBorder(Rectangle.RIGHT | Rectangle.LEFT | Rectangle.TOP);
		table3.addCell(table_cell3);
		
		table_cell3 = new PdfPCell(new Phrase("GST Total Amount", font13Bold));
		table_cell3.setColspan(3);
		table_cell3.setHorizontalAlignment(Element.ALIGN_RIGHT);
		table_cell3.setPaddingBottom(5f);
		table_cell3.setPaddingTop(5f);
		table_cell3.setBorderWidth(1f);
		table3.addCell(table_cell3);

		table_cell3 = new PdfPCell(new Phrase(df.format(gstTotal), font13Bold));
		table_cell3.setHorizontalAlignment(Element.ALIGN_RIGHT);
		table_cell3.setPaddingBottom(5f);
		table_cell3.setPaddingTop(5f);
		table_cell3.setBorderWidth(1f);
		table3.addCell(table_cell3);
		
		table_cell3 = new PdfPCell(new Phrase("", font13Bold));
		table_cell3.setColspan(6);
		table_cell3.setHorizontalAlignment(Element.ALIGN_LEFT);
		table_cell3.setPaddingBottom(5f);
		table_cell3.setPaddingTop(5f);
		table_cell3.setBorder(Rectangle.RIGHT | Rectangle.LEFT );
		table3.addCell(table_cell3);
		
		table_cell3 = new PdfPCell(new Phrase("IGST Total Amount", font13Bold));
		table_cell3.setColspan(3);
		/* table_cell3.setRowspan(2); */
		table_cell3.setHorizontalAlignment(Element.ALIGN_RIGHT);
		table_cell3.setPaddingBottom(5f);
		table_cell3.setPaddingTop(5f);
		table_cell3.setBorderWidth(1f);
		table3.addCell(table_cell3);

		table_cell3 = new PdfPCell(new Phrase(df.format(igstTotal), font13Bold));
		table_cell3.setHorizontalAlignment(Element.ALIGN_RIGHT);
		table_cell3.setPaddingBottom(5f);
		/* table_cell3.setRowspan(2); */
		table_cell3.setPaddingTop(5f);
		table_cell3.setBorderWidth(1f);
		table3.addCell(table_cell3);
		
		
	    table_cell3 = new PdfPCell(new Phrase("", font13Bold));
		table_cell3.setColspan(6);
		table_cell3.setHorizontalAlignment(Element.ALIGN_LEFT);
		table_cell3.setPaddingBottom(5f);
		table_cell3.setPaddingTop(5f);
		table_cell3.setBorder(Rectangle.RIGHT | Rectangle.LEFT );
		table3.addCell(table_cell3);
		
		table_cell3 = new PdfPCell(new Phrase("Discount", font13Bold));
		table_cell3.setColspan(3);
		table_cell3.setHorizontalAlignment(Element.ALIGN_RIGHT);
		table_cell3.setPaddingBottom(5f);
		table_cell3.setPaddingTop(5f);
		table_cell3.setBorder(Rectangle.RIGHT | Rectangle.LEFT | Rectangle.BOTTOM);
		table3.addCell(table_cell3);

		
		
		table_cell3 = new PdfPCell(new Phrase(String.valueOf(discount), font13Bold));
		table_cell3.setHorizontalAlignment(Element.ALIGN_RIGHT);
		table_cell3.setPaddingBottom(5f);
		table_cell3.setPaddingTop(5f);
		table_cell3.setBorderWidth(1f);
		table3.addCell(table_cell3); 
		
		/* table_cell3 = new PdfPCell(new Phrase("                                        for", font13Bold)); */
		table_cell3 = new PdfPCell(new Phrase(""));
		table_cell3.setColspan(6);
		table_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell3.setPaddingBottom(5f);
		table_cell3.setPaddingTop(5f);
		table_cell3.setBorder(Rectangle.RIGHT | Rectangle.LEFT | Rectangle.TOP);
		table3.addCell(table_cell3);
		
		table_cell3 = new PdfPCell(new Phrase("Hamali Expense", font13Bold));
		table_cell3.setColspan(3);
		table_cell3.setHorizontalAlignment(Element.ALIGN_RIGHT);
		table_cell3.setPaddingBottom(5f);
		table_cell3.setPaddingTop(5f);
		table_cell3.setBorderWidth(1f);
		table3.addCell(table_cell3);

		table_cell3 = new PdfPCell(new Phrase(df.format(Double.parseDouble(HamaliExpence)), font13Bold));
		table_cell3.setHorizontalAlignment(Element.ALIGN_RIGHT);
		table_cell3.setPaddingBottom(5f);
		table_cell3.setPaddingTop(5f);
		table_cell3.setBorderWidth(1f);
		table3.addCell(table_cell3);
		//if pdf change and didn't gave desired o/p then remove below commneted code
		 if(ShopId == 1){
			/* table_cell3 = new PdfPCell(new Phrase("Customer sign         "+ShopName, font13Bold)); */
			table_cell3 = new PdfPCell(new Phrase(""));
			table_cell3.setColspan(6);
			table_cell3.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell3.setPaddingBottom(5f);
			table_cell3.setPaddingTop(5f);
			table_cell3.setBorder(Rectangle.RIGHT | Rectangle.LEFT);
			table3.addCell(table_cell3);
			 }
			 else{
				 table_cell3 = new PdfPCell(new Phrase(""));
					table_cell3.setColspan(6);
					table_cell3.setHorizontalAlignment(Element.ALIGN_LEFT);
					table_cell3.setPaddingBottom(5f);
					table_cell3.setPaddingTop(5f);
					table_cell3.setBorder(Rectangle.RIGHT | Rectangle.LEFT);
					table3.addCell(table_cell3);
			 }
		table_cell3 = new PdfPCell(new Phrase("Gross Total(inc Tax)", font13Bold));
		table_cell3.setColspan(3);
		table_cell3.setHorizontalAlignment(Element.ALIGN_RIGHT);
		table_cell3.setPaddingBottom(5f);
		table_cell3.setPaddingTop(5f);
		table_cell3.setBorderWidth(1f);
		table3.addCell(table_cell3);

		
		table_cell3 = new PdfPCell(new Phrase(df.format(Double.parseDouble(gross_total)), font13Bold));
		table_cell3.setHorizontalAlignment(Element.ALIGN_RIGHT);
		table_cell3.setPaddingBottom(5f);
		table_cell3.setPaddingTop(5f);
		table_cell3.setBorderWidth(1f);
		table3.addCell(table_cell3);

		// Gross Total in Words
		long totalInLong = Math.round(Double.parseDouble(gross_total));
		String grossTotal = String.valueOf(totalInLong);
		int grossTotalInInteger = Integer.parseInt(grossTotal);
		NumToWord w = new NumToWord();
		String amtInWord = w.convert(grossTotalInInteger);

		table_cell3 = new PdfPCell(new Phrase("\n Rupees in words : "
				+ amtInWord + " Only/-\n "));
		table_cell3.setColspan(10);
		table_cell3.setHorizontalAlignment(Element.ALIGN_LEFT);
		table_cell3.setPaddingBottom(1f);
		table_cell3.setPaddingTop(1f);
		table_cell3.setBorderWidth(1f);
		table3.addCell(table_cell3);
		
		
		table_cell3 = new PdfPCell(new Phrase("", font12NoBold));
		table_cell3.setColspan(10);
		table_cell3.setHorizontalAlignment(Element.ALIGN_JUSTIFIED);
		table_cell3.setBorder(Rectangle.RIGHT | Rectangle.LEFT | Rectangle.TOP);
		table_cell3.setBorderWidth(1f);
		table3.addCell(table_cell3);

		table_cell3 = new PdfPCell(new Phrase("\n\n\nCustomer Sign                    						                             From "+ShopName, font12NoBold));
		table_cell3.setColspan(10);
		table_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell3.setBorder(Rectangle.RIGHT | Rectangle.LEFT | Rectangle.BOTTOM);
		table_cell3.setBorderWidth(1f);
		table_cell3.setPaddingBottom(3);
		table3.addCell(table_cell3);

		document.add(table3);
		// step 5 

		rs.close();
		stmt.close();
		conn.close();
		document.close();
		

	} catch (DocumentException de) {
		throw new IOException(de.getMessage());
	}
%>