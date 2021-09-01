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

response.setContentType("application/pdf");

response.setContentType("application/pdf");
Long billno = (Long) session.getAttribute("fertilizerBillNo");
String creditCustomerName = (String) session.getAttribute("creditCustomerName");  
 
System.out.println("ln no ==>66 Bill No ===> "+billno+" Custmor Name ===> "+creditCustomerName);
 

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
int b = 1;
/* Double discount=0d; */
String grossT = "";

Connection conn = null;

try {

	Document document = new Document();
	
	Rectangle rect = new Rectangle(220,300);
	
	
	// step 1
	
	//document.setPageSize(rect);
	
	document.setMargins(5 , 5 , 5 , 0);	
	
	// step 2

	PdfWriter.getInstance(document, response.getOutputStream());
	document.setPageSize(rect);

	// step 3
	document.open();


	
	
	
	
	
	Class.forName("com.mysql.jdbc.Driver");
	conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/shop", "root", "root");
	Statement stmt = conn.createStatement();

	ResultSet rs = stmt.executeQuery("select bill_no, customer_name, fertilizer_billing.product_name, fertilizer_billing.village, fertilizer_billing.company, fertilizer_billing.weight, fertilizer_billing.Without_Tax_Rate, fertilizer_billing.total_per_product, fertilizer_billing.total_all_product, fertilizer_billing.hamali_expense, fertilizer_billing.gross_total, fertilizer_billing.tax_percentage,fertilizer_billing.hsn,fertilizer_billing.igstPercentage,fertilizer_billing.fk_shop_id, s.shop_name,fertilizer_billing.Discount_amount ,fertilizer_billing.sale_price, fertilizer_billing.kg, fertilizer_billing.grams, fertilizer_billing.unit, fertilizer_billing.ltr, fertilizer_billing.mili, fertilizer_billing.quantity, fertilizer_billing.total_per_product, fertilizer_billing.kg, fertilizer_billing.grams, fertilizer_billing.ltr, fertilizer_billing.mili, fertilizer_billing.insert_date from fertilizer_billing left join shop_details s on fk_shop_id=pk_shop_id where bill_no = "+billno);
	
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
		String day = sdf1.format(d1.getDate());
		String Time = sdf2.format(d1.getTime());
		String dtfinl = stdver1;

		DecimalFormat df = new DecimalFormat("#.00");

		Font font15Bold = new Font(Font.FontFamily.TIMES_ROMAN, 15, Font.BOLD, BaseColor.BLACK);
		Font font12Bold = new Font(Font.FontFamily.TIMES_ROMAN, 12, Font.BOLD, BaseColor.BLACK);
		Font font15BoldUnderline = new Font(Font.FontFamily.TIMES_ROMAN, 15, Font.BOLD | Font.UNDERLINE,BaseColor.BLACK);
		Font font12 = new Font(Font.FontFamily.TIMES_ROMAN, 12, Font.BOLD, BaseColor.BLACK);
		Font font11 = new Font(Font.FontFamily.TIMES_ROMAN, 11, Font.BOLD, BaseColor.BLACK);
		Font font12NoBold = new Font(Font.FontFamily.TIMES_ROMAN, 12, Font.NORMAL, BaseColor.BLACK);
		Font font8NoBold = new Font(Font.FontFamily.TIMES_ROMAN, 8, Font.NORMAL, BaseColor.BLACK);
		Font font11BoldUnderline = new Font(Font.FontFamily.TIMES_ROMAN, 8, Font.BOLD | Font.UNDERLINE, BaseColor.BLACK);
		Font font6NoBold = new Font(Font.FontFamily.TIMES_ROMAN, 6, Font.NORMAL, BaseColor.BLACK);
		Font font6Bold = new Font(Font.FontFamily.TIMES_ROMAN, 6, Font.BOLD, BaseColor.BLACK);
		Font font7NoBold = new Font(Font.FontFamily.TIMES_ROMAN, 7, Font.NORMAL, BaseColor.BLACK);
		Font font7Bold = new Font(Font.FontFamily.TIMES_ROMAN, 7, Font.BOLD, BaseColor.BLACK);
		Font font9NoBold = new Font(Font.FontFamily.TIMES_ROMAN, 9, Font.NORMAL, BaseColor.BLACK);
		Font font9Bold = new Font(Font.FontFamily.TIMES_ROMAN, 9, Font.BOLD, BaseColor.BLACK);
		Font font10NoBold = new Font(Font.FontFamily.TIMES_ROMAN, 10, Font.NORMAL, BaseColor.BLACK);
		Font font10Bold = new Font(Font.FontFamily.TIMES_ROMAN, 10, Font.BOLD, BaseColor.BLACK);
		Font font12BoldUnderline = new Font(Font.FontFamily.TIMES_ROMAN, 12, Font.BOLD | Font.UNDERLINE,BaseColor.BLACK);
		Font font17 = new Font(Font.FontFamily.TIMES_ROMAN, 17, Font.BOLD, BaseColor.BLACK);
		Font font13 = new Font(Font.FontFamily.TIMES_ROMAN, 13, Font.BOLD, BaseColor.BLACK);
		Font font13Bold = new Font(Font.FontFamily.TIMES_ROMAN, 13, Font.BOLD, BaseColor.BLACK);
		Font Normalfont11 = new Font(Font.FontFamily.TIMES_ROMAN, 11, Font.NORMAL, BaseColor.BLACK);
		Font Normalfont13 = new Font(Font.FontFamily.TIMES_ROMAN, 13, Font.NORMAL, BaseColor.BLACK);
		Font Normalfont14 = new Font(Font.FontFamily.TIMES_ROMAN, 14, Font.NORMAL, BaseColor.BLACK);
		Font ufont14 = new Font(Font.FontFamily.TIMES_ROMAN, 14, Font.UNDERLINE, BaseColor.BLACK);
		Font font8Bold = new Font(Font.FontFamily.TIMES_ROMAN, 8, Font.BOLD, BaseColor.BLACK);
		// step 4

		PdfPTable table = new PdfPTable(1);
		table.setWidthPercentage(100);
		
		float[] columnWidths = {10f};
		table.setWidths(columnWidths);
		
		double hamaliExpense = rs.getDouble("hamali_expense");
		discount = rs.getDouble("Discount_amount");		
		PdfPCell table_cell;
		
		
    	ShopId = rs.getDouble("fk_shop_id");
		ShopName = rs.getString("shop_name");
		Long shopPrBillno = rs.getLong("bill_no");
		String custAddress = "Pune";
		
		table_cell = new PdfPCell(new Phrase("SHADHAWAL. G. MARKETING", font12Bold));
		table_cell.setBorder(Rectangle.LEFT |Rectangle.RIGHT|Rectangle.TOP);
		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
		table.addCell(table_cell);
		
		table_cell = new PdfPCell(new Phrase("SR.NO.6, H.NO. D/6m Ajmera Park, Lane No 2, Kondhwa Bk., Pune 48", font6NoBold));
		table_cell.setBorder(Rectangle.LEFT |Rectangle.RIGHT);
		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
		table.addCell(table_cell);
		
		table_cell = new PdfPCell(new Phrase("Mo. : 8087846141, 8485818628, 8485818627", font8Bold));
		table_cell.setBorder(Rectangle.LEFT |Rectangle.RIGHT);
		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);			
		
		table.addCell(table_cell);				

		document.add(table);

		PdfPTable smallTable = new PdfPTable(2);
		smallTable.setWidthPercentage(100);
		float[] smallTablecolumnWidths = { 0.7f, 0.3f };
		smallTable.setWidths(smallTablecolumnWidths);
		

		PdfPCell table_cell2;

		String custName;

		String cn = String.valueOf(rs.getString("customer_name"));

		if (cn.equals("N/A")) {
			custName = creditCustomerName;
		} else {
			custName = cn;
		}
		
		table_cell2 = new PdfPCell(new Phrase("M/s.: "+custName, font8NoBold));
		table_cell2.setBorder(Rectangle.LEFT |Rectangle.RIGHT|Rectangle.TOP);
		smallTable.addCell(table_cell2);
		
		table_cell2 = new PdfPCell(new Phrase("TAX   INVOICE ",font8Bold));
		table_cell2.setBorder(Rectangle.LEFT |Rectangle.RIGHT|Rectangle.TOP);
		smallTable.addCell(table_cell2);
		
		String village = rs.getString("village");
		
		table_cell2 = new PdfPCell(new Phrase("Add.: "+village, font8NoBold));
		table_cell2.setBorder(Rectangle.LEFT |Rectangle.RIGHT);
		table_cell2.setHorizontalAlignment(Element.ALIGN_LEFT);
		smallTable.addCell(table_cell2);
		
		table_cell2 = new PdfPCell(new Phrase("Inv. No.: "+billno,font8NoBold));
		table_cell2.setBorder(Rectangle.LEFT |Rectangle.RIGHT|Rectangle.TOP);
		table_cell2.setHorizontalAlignment(Element.ALIGN_LEFT);
		table_cell2.setPaddingBottom(4f);
		smallTable.addCell(table_cell2);
		
		table_cell2 = new PdfPCell(new Phrase("",font8NoBold));
		table_cell2.setBorder(Rectangle.LEFT |Rectangle.RIGHT | Rectangle.BOTTOM);
		table_cell2.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell2.setPaddingBottom(4f);
		smallTable.addCell(table_cell2);
		
		
		String billDate11 = rs.getString("insert_date");

		table_cell2 = new PdfPCell(new Phrase("Date: " +billDate11, font8NoBold));
		table_cell2.setBorder(Rectangle.LEFT |Rectangle.RIGHT|Rectangle.BOTTOM);
		table_cell2.setHorizontalAlignment(Element.ALIGN_LEFT);
		table_cell2.setPaddingBottom(4f);
		smallTable.addCell(table_cell2);
		

		document.add(smallTable);
		document.add(new Paragraph(""));
		
		String gross_total = String.valueOf(rs.getString("gross_total"));
		
		//Heading Info table
		PdfPTable table3 = new PdfPTable(5);
		table3.setWidthPercentage(100);

		float[] columnWidths3 = { 0.4f, 0.15f, 0.15f, 0.15f, 0.15f};
		table3.setWidths(columnWidths3);

		PdfPCell table_cell3;		

		table_cell3 = new PdfPCell(new Phrase("Description of Goods", font8NoBold));
		//table_cell3.setBorderWidth(1f);
		table_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell3.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
		/* table_cell3.setPaddingTop(1f);
		table_cell3.setPaddingBottom(1f); */
		table3.addCell(table_cell3);

		table_cell3 = new PdfPCell(new Phrase("Qty", font8NoBold));
		//table_cell3.setBorderWidth(1f);
		table_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell3.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
		/* table_cell3.setPaddingTop(1f);
		table_cell3.setPaddingBottom(1f); */
		table3.addCell(table_cell3);

		table_cell3 = new PdfPCell(new Phrase("Mrp", font8NoBold));
		//table_cell3.setBorderWidth(1f);
		table_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell3.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
		/* table_cell3.setPaddingTop(1f);
		table_cell3.setPaddingBottom(1f); */
		table3.addCell(table_cell3);
		
		table_cell3 = new PdfPCell(new Phrase("Rate", font8NoBold));
		//table_cell3.setBorderWidth(1f);
		table_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell3.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
	/* 	table_cell3.setPaddingTop(1f);
		table_cell3.setPaddingBottom(1f); */
		table3.addCell(table_cell3);

		table_cell3 = new PdfPCell(new Phrase("Amount", font8NoBold));
		//table_cell3.setBorderWidth(1f);
		table_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell3.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
		/* table_cell3.setPaddingTop(1f);
		table_cell3.setPaddingBottom(1f); */
		table3.addCell(table_cell3);

		document.add(table3);

		//table for particulars

		PdfPTable table4 = new PdfPTable(5);
		table4.setWidthPercentage(100);

		float[] columnWidths4 = {0.4f, 0.15f, 0.15f, 0.15f, 0.15f};
		table4.setWidths(columnWidths4);

		PdfPTable table5 = new PdfPTable(3);
		table5.setWidthPercentage(100);

		float[] columnWidths5 = { 0.55f, 0.30f, 0.15f};
		table5.setWidths(columnWidths5);

		/* PdfPTable table6 = new PdfPTable(9);
		table6.setWidthPercentage(100);

		float[] columnWidths6 = { 0.4f, 0.3f, 0.2f, 0.2f, 0.1f, 0.2f, 0.2f, 0.2f, 0.3f};
		table6.setWidths(columnWidths6); */
		
		PdfPTable table6 = new PdfPTable(3);
		table6.setWidthPercentage(100);

		float[] columnWidths6 = { 0.55f, 0.30f, 0.15f};
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
		//PdfPCell cell10 = new PdfPCell(new Paragraph(""));
		
		
		table4.addCell(cell1);
		table4.addCell(cell2);
		table4.addCell(cell3);
		table4.addCell(cell4);
		table4.addCell(cell5);

		table5.addCell(cell1);
		table5.addCell(cell2);
		table5.addCell(cell3);
	/* 	table5.addCell(cell4);
		table5.addCell(cell5);
		table5.addCell(cell6);
		table5.addCell(cell7);
		table5.addCell(cell8);
		table5.addCell(cell9);
//		table5.addCell(cell10); 
 */
		table6.addCell(cell1);
		table6.addCell(cell2);
		table6.addCell(cell3);
		table6.addCell(cell4);
		table6.addCell(cell5);
		table6.addCell(cell6);
		table6.addCell(cell7);
		table6.addCell(cell8);
		table6.addCell(cell9);
//		table6.addCell(cell10);

		while (rs.next())
		{
				
				System.out.println("ln no ==527======================================================");								

				String product_name = rs.getString("product_name");
				System.out.println("Product name == "+product_name);
 				table_cell4 = new PdfPCell(new Phrase(product_name, font8NoBold));
				table_cell4.setBorder(Rectangle.RIGHT | Rectangle.LEFT | Rectangle.BOTTOM);
				table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
				
				table4.addCell(table_cell4);
				
				int quantity = rs.getInt("quantity");
				System.out.println("quantity == "+quantity);
				String kg=rs.getString("kg");
				System.out.println("kg == "+kg);
				String grams=rs.getString("grams");
				System.out.println("grams == "+grams);
				String ltr=rs.getString("ltr");
				System.out.println("ltr == "+ltr);
				String mili=rs.getString("mili");
				System.out.println("mili == "+mili);
				  
				String unit = rs.getString("unit");
				System.out.println("unit == "+unit);
				
				String kgAndGrams = kg+"."+grams;
				String ltrAndMili = ltr+"."+mili;
					
				if(unit.equalsIgnoreCase("kg"))
					{
						table_cell4 = new PdfPCell(new Phrase(String.valueOf(kgAndGrams),/*""*,*/ font8NoBold));
						table_cell4.setBorder(Rectangle.RIGHT | Rectangle.LEFT | Rectangle.BOTTOM);
						table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
						table4.addCell(table_cell4);
					}
					else if(unit.equalsIgnoreCase("ltr"))
					{
						table_cell4 = new PdfPCell(new Phrase(String.valueOf(ltrAndMili),/*""*,*/ font8NoBold));
						table_cell4.setBorder(Rectangle.RIGHT | Rectangle.LEFT | Rectangle.BOTTOM);
						table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
						table4.addCell(table_cell4);
					}
					else if(unit.equalsIgnoreCase("p"))
					{
						table_cell4 = new PdfPCell(new Phrase(String.valueOf(quantity), font8NoBold));
						table_cell4.setBorder(Rectangle.RIGHT | Rectangle.LEFT | Rectangle.BOTTOM);
						table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
						table4.addCell(table_cell4);
					}
				
				BigDecimal salePrice = rs.getBigDecimal("Without_Tax_Rate", 2);
				System.out.println("salePrice == "+salePrice);
				String sale_price = String.valueOf(rs.getString("Without_Tax_Rate"));
				System.out.println("sale_price == "+sale_price);
				 
				String sale_price1=rs.getString("sale_price");
				System.out.println("sale_price1 == "+sale_price1);
				System.out.println("sale_price1 ==========> ln No: ==> "+sale_price1);
				
				table_cell4 = new PdfPCell(new Phrase(String.valueOf(sale_price1),font8NoBold));
				table_cell4.setBorder(Rectangle.RIGHT | Rectangle.LEFT | Rectangle.BOTTOM);
				table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
				table4.addCell(table_cell4);
				
				
				table_cell4 = new PdfPCell(new Phrase(String.valueOf(salePrice), font9NoBold));
				table_cell4.setBorder(Rectangle.RIGHT | Rectangle.LEFT | Rectangle.BOTTOM);
				table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);

				table4.addCell(table_cell4); 


			 	GST = rs.getDouble("tax_percentage");
				System.out.println("GST == "+GST);
				double half = 2;
				double halfGST = GST / half; 				
				
				Double XX =Double.parseDouble(sale_price1);
				double taxpergst = (XX * GST)/100;
				double priceWithOutGST = XX- taxpergst;
				long  taxpergst1= Math.round(priceWithOutGST); 
				
				double salep = rs.getDouble("Without_Tax_Rate");
				System.out.println("salep == "+salep);
				
				double total = XX * quantity;
				long  total1= Math.round(total);
				
				
				double totalPerProduct = rs.getDouble("total_per_product");
				
				table_cell4 = new PdfPCell(new Phrase(String.valueOf(totalPerProduct), font8NoBold));
				table_cell4.setBorder(Rectangle.RIGHT | Rectangle.LEFT | Rectangle.BOTTOM);
				table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
				table4.addCell(table_cell4);

				 if (iGST == 5 || iGST == 12 || iGST == 18 || iGST == 28) {
					//double taxAmount = (iGST / 100) * (total1);
					double taxAmount = (iGST / 100) * (totalPerProduct);
					igstTotal = igstTotal + taxAmount;
					System.out.println("igstTotal = = =" + igstTotal);
				}
				if (GST == 5.00 || GST == 12.00 || GST == 18.00 || GST == 28.00) {
					
					//double taxAmount = (GST / 100) * (total1);
					//double taxAmount = (GST / 100) * (total1);
					double taxAmount = (GST / 100) * (totalPerProduct);
					gstTotal = gstTotal + taxAmount;
					System.out.println("gstTotal{} = = =" + gstTotal);
				} 
	}
	
		
	document.add(table4);
	
	double halfGstTotal = (gstTotal) / 2;

	table_cell4 = new PdfPCell(new Phrase("GST No. :27EXKPS4404P1ZP", font8Bold));
	//table_cell4.setColspan(2);
	table_cell4.setHorizontalAlignment(Element.ALIGN_LEFT);
	table_cell4.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
/* 	table_cell4.setPaddingBottom(1f);
	table_cell4.setPaddingTop(1f);
	table_cell4.setBorderWidth(1f); */
	table6.addCell(table_cell4);

	table_cell4 = new PdfPCell(new Phrase("Total ", font10Bold));
	table_cell4.setHorizontalAlignment(Element.ALIGN_RIGHT);
	table_cell4.setBorder(Rectangle.LEFT | Rectangle.RIGHT | Rectangle.BOTTOM);
	//table_cell4.setColspan(3);
	/* table_cell4.setPaddingBottom(1f);
	table_cell4.setPaddingTop(1f);
	table_cell4.setBorderWidth(1f); */
	table6.addCell(table_cell4);

	table_cell4 = new PdfPCell(new Phrase(gross_total, font10Bold));
//	table_cell4.setColspan(4);
	table_cell4.setHorizontalAlignment(Element.ALIGN_RIGHT);
	table_cell4.setBorder(Rectangle.LEFT | Rectangle.RIGHT | Rectangle.BOTTOM);
	/* table_cell4.setPaddingBottom(1f);
	table_cell4.setPaddingTop(1f);
	table_cell4.setBorderWidth(1f); */
	table6.addCell(table_cell4);

	table_cell4 = new PdfPCell(new Phrase("Terms - Cash of Cheque on Delivery", font7NoBold));
	//table_cell4.setColspan(2);
	table_cell4.setHorizontalAlignment(Element.ALIGN_LEFT);
	table_cell4.setBorder(Rectangle.LEFT | Rectangle.RIGHT | Rectangle.BOTTOM);
	/* table_cell4.setPaddingBottom(1f);
	table_cell4.setPaddingTop(1f);
	table_cell4.setBorderWidth(1f); */
	table6.addCell(table_cell4);

	table_cell4 = new PdfPCell(new Phrase(""));
	table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
	table_cell4.setBorder(Rectangle.NO_BORDER);
	/* table_cell4.setColspan(3);
	table_cell4.setPaddingBottom(1f);
	table_cell4.setPaddingTop(1f);
	table_cell4.setBorderWidth(1f); */
	table6.addCell(table_cell4);

	table_cell4 = new PdfPCell(new Phrase(""));
	table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
	table_cell4.setBorder(Rectangle.RIGHT);
	/* table_cell4.setColspan(3);
	table_cell4.setPaddingBottom(1f);
	table_cell4.setPaddingTop(1f);
	table_cell4.setBorderWidth(1f); */
	table6.addCell(table_cell4);
	
	table_cell4 = new PdfPCell(new Phrase("Goods once Sold not be taken back" , font7NoBold));
	//table_cell4.setColspan(4);
	table_cell4.setHorizontalAlignment(Element.ALIGN_LEFT);
	table_cell4.setBorder(Rectangle.LEFT | Rectangle.RIGHT | Rectangle.BOTTOM);
	/* table_cell4.setPaddingBottom(1f);
	table_cell4.setPaddingTop(1f);
	table_cell4.setBorderWidth(1f); */
	table6.addCell(table_cell4);

	table_cell4 = new PdfPCell(new Phrase("", Normalfont11));
	//table_cell4.setColspan(7);
	table_cell4.setHorizontalAlignment(Element.ALIGN_RIGHT);
	table_cell4.setBorder(Rectangle.NO_BORDER);
	/* table_cell4.setPaddingBottom(1f);
	table_cell4.setPaddingTop(1f);
	table_cell4.setBorderWidth(1f); */
	table6.addCell(table_cell4);
	
	table_cell4 = new PdfPCell(new Phrase("", Normalfont11));
	//table_cell4.setColspan(7);
	table_cell4.setHorizontalAlignment(Element.ALIGN_RIGHT);
	table_cell4.setBorder(Rectangle.RIGHT);
	/* table_cell4.setPaddingBottom(1f);
	table_cell4.setPaddingTop(1f);
	table_cell4.setBorderWidth(1f); */
	table6.addCell(table_cell4);
	
	table_cell4 = new PdfPCell(new Phrase("Cheque retun charges 150/- Rs.", font7NoBold));
	table_cell4.setHorizontalAlignment(Element.ALIGN_LEFT);
	table_cell4.setBorder(Rectangle.BOTTOM | Rectangle.RIGHT | Rectangle.LEFT);
/* 	table_cell4.setPaddingBottom(1f);
	table_cell4.setPaddingTop(1f);
	table_cell4.setColspan(1);
	table_cell4.setBorderWidth(1f); */
	table6.addCell(table_cell4);

	table_cell4 = new PdfPCell(new Phrase("For Shadaval. G. ", font6Bold));
	//table_cell4.setColspan(7);
	table_cell4.setHorizontalAlignment(Element.ALIGN_RIGHT);
	table_cell4.setBorder(Rectangle.BOTTOM);
	/* table_cell4.setPaddingBottom(1f);
	table_cell4.setPaddingTop(1f);
	table_cell4.setBorderWidth(1f); */
	table6.addCell(table_cell4);
	
	table_cell4 = new PdfPCell(new Phrase("Marketing", font6Bold));
	//table_cell4.setColspan(7);
	table_cell4.setHorizontalAlignment(Element.ALIGN_LEFT);
	table_cell4.setBorder(Rectangle.RIGHT | Rectangle.BOTTOM);
	/* table_cell4.setPaddingBottom(1f);
	table_cell4.setPaddingTop(1f);
	table_cell4.setBorderWidth(1f); */
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

	
	document.add(table6);
	
	
	
	

				

		rs.close();
		stmt.close();
		conn.close();
		document.close();
	} catch (DocumentException de) {
		throw new IOException(de.getMessage());
	}
%>
