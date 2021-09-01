<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
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
<%@page import="java.util.List"%> import java.math.*;
<%@page import="java.math.BigInteger"%>

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
	response.setContentType("application/pdf");
	
	  	Long billno=(Long)session.getAttribute("customerBill"); 
	  	
	  	System.out.println("////////////////////////////////////////////////+++++"+billno);
		System.out.println("///////hi this is kishor"+billno);
	 
		Connection conn = null;
		double gsttotal;
		double sgst;
		double cgst;
		double cgst_amt;
		double sgst_amt;
		String Grand_Total="";
		//String ShopName1 = "sainath industries";
		String ShopName = "SAHYADRI ENTERPRISES";
		String forsainath = "";
		String forOmSai = "";
		String vehicle= "";
		String Gridamount = "";
		double amount = 0.0;
		double bgst = 0.0;
		
	 	try {

		// step 1
		Document document = new Document();

		// step 2

		PdfWriter.getInstance(document, response.getOutputStream());

		// step 3
		document.open();
		/* Image image1 = Image.getInstance("C:/omsailogo1.jpg");
		Image image2 = Image.getInstance("C:/sainath logo.jpg"); */

		Class.forName("com.mysql.jdbc.Driver");
		conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/process_soft", "root", "root");
		Statement stmt = conn.createStatement();

		//ResultSet rs = stmt.executeQuery("select product_name,village,sale_price,total_amount from fertilizer_bill WHERE customerBill=" + billno);

		//ResultSet rs = stmt.executeQuery("select fertilizer_bill.product_name,village, manufacturing_company, fertilizer_bill.weight, quantity, fertilizer_bill.sale_price, total_amount, total_amount,expenses,gross_total from fertilizer_bill left join product_details on fertilizer_bill.fk_product_id = product_details.pk_product_id where fertilizer_bill.customerBill =" + 166);
		ResultSet rs = stmt.executeQuery("SELECT bd.creditcustomer,bd.product_name,bd.tax_amount,bd.address,bd.outwardchallan_no,bd.InwardChallanNo,bd.discount_Amount,bd.gst_No,bd.okquantity,bd.sale_Date,bd.buy_Price,bd.total,bd.gst,bd.Igst,bd.gross_Total,bd.vehicle,bd.description,bd.hsn,bd.Operation,bd.grid_Total,pd.idno,pd.date,bd.ShopName,bd.custname FROM bill_details bd join po_details pd WHERE bill_no ='"+billno+"' group by pk_customer_id");
	
		//select fb.product_name,fb.hsn,fb.length,fb.quantity,fb.sale_price,fb.cgst,fb.sgst,fb.igst,fb.Discount_perc,fb.Discount_amount,fb.gross_total,fb.CustomerGstNo,fb.InwardChallanNo,fb.OutwardChallanNo,sd.supplier_name,sd.address from fertilizer_billing fb  INNER JOIN supplier_details sd on fb.fk_customer_id= sd.pk_supplier_id WHERE bill_no="+billno
		
		rs.first();		
		
		System.out.println("Query Execute");
		Date d1 = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("dd-MMM-yyyy");
		//SimpleDateFormat sdf3 = new SimpleDateFormat("dd-MMM-yyyy");
		
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
		Font font16BoldUnderline = new Font(Font.FontFamily.TIMES_ROMAN, 16, Font.BOLD | Font.UNDERLINE, BaseColor.RED);

		Font font13Bold = new Font(Font.FontFamily.TIMES_ROMAN, 13, Font.BOLD, BaseColor.BLACK);
		Font Normalfont11 = new Font(Font.FontFamily.TIMES_ROMAN, 11, Font.NORMAL, BaseColor.BLACK);
		Font Normalfont12 = new Font(Font.FontFamily.TIMES_ROMAN, 12, Font.NORMAL, BaseColor.BLACK);
		Font Normalfont13 = new Font(Font.FontFamily.TIMES_ROMAN, 13, Font.NORMAL, BaseColor.BLACK);
		Font Normalfont14 = new Font(Font.FontFamily.TIMES_ROMAN, 14, Font.NORMAL, BaseColor.BLACK);
		Font ufont14 = new Font(Font.FontFamily.TIMES_ROMAN, 14, Font.UNDERLINE, BaseColor.BLACK);
		
		Font NormalRedfont11 = new Font(Font.FontFamily.TIMES_ROMAN, 11, Font.NORMAL, BaseColor.RED);
		Font NormalRedfont12 = new Font(Font.FontFamily.TIMES_ROMAN, 12, Font.NORMAL, BaseColor.RED);
		Font NormalRedfont13 = new Font(Font.FontFamily.TIMES_ROMAN, 13, Font.NORMAL, BaseColor.RED);
		Font NormalRedfont16 = new Font(Font.FontFamily.TIMES_ROMAN, 16, Font.NORMAL, BaseColor.RED);

		// step 4
	/* 	System.out.println("Befor IF shop name by vikas "+rs.getString("ShopName"));
		System.out.println("Befor IF shop name by kishor"+ShopName1);
		
		if(ShopName1.equals(rs.getString("ShopName"))){
		System.out.println("if loop For om sai");
/* 		image2.scaleToFit(100f, 200f);
		Image imageCenter2 = Image.getInstance(image2);
		imageCenter2.setAlignment(Image.MIDDLE);
		document.add(imageCenter2);
		}
		else {
			
			System.out.println("if loop For Sainath");
			image1.scaleToFit(100f, 200f);
			Image imageCenter1 = Image.getInstance(image1); 
			imageCenter1.setAlignment(Image.MIDDLE);
			document.add(imageCenter1);
		} */
		
		PdfPTable table = new PdfPTable(3);
		table.setWidthPercentage(100);

		float[] columnWidths = { 0.4f ,0.4f,0.4f};
		table.setWidths(columnWidths);

		PdfPCell table_cell;

			table_cell = new PdfPCell(new Phrase("", Normalfont11));
			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell.setBorder(Rectangle.NO_BORDER);
			table.addCell(table_cell);
	
			table_cell = new PdfPCell(new Phrase("TAX INVOICE", font13));
			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell.setPaddingBottom(6f);
			table_cell.setBorder(Rectangle.NO_BORDER);
			table.addCell(table_cell);
			

			
			table_cell = new PdfPCell(new Phrase("              (ISI Certified)" , Normalfont11));
			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell.setBorder(Rectangle.NO_BORDER);
			table.addCell(table_cell);
			
			document.add(table);
															
			
			PdfPTable table2 = new PdfPTable(3);
			table2.setWidthPercentage(100);

			float[] columnWidths2 = { 0.5f,0.3f,0.2f};
			table2.setWidths(columnWidths2);

			PdfPCell table_cell2;
			//ShopName=rs.getString("ShopName");
			table_cell2 = new PdfPCell(new Phrase(ShopName.toUpperCase(), font16BoldUnderline));
			table_cell2.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell2.setBorder(Rectangle.LEFT |Rectangle.RIGHT|Rectangle.TOP);
			table2.addCell(table_cell2);
			
			String newBillNo = String.valueOf(billno);
			table_cell2 = new PdfPCell(new Phrase("INVOICE NO -"+billno+"/"+"18"+"-"+"19", Normalfont12));
			table_cell2.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell2.setBorder(Rectangle.LEFT |Rectangle.RIGHT|Rectangle.TOP);
			table2.addCell(table_cell2);
			
			table_cell2 = new PdfPCell(new Phrase("Dated-"+StrBillDate, Normalfont11));
			table_cell2.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell2.setBorder(Rectangle.LEFT |Rectangle.RIGHT|Rectangle.TOP);
			table2.addCell(table_cell2);
		
			table_cell2 = new PdfPCell(new Phrase("\nGSTIN NO - 27ACWFS5742B1ZR",font12BoldUnderline));
			table_cell2.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell2.setBorder(Rectangle.LEFT);
			table2.addCell(table_cell2);
				
			
			/* else
			{
				
				
				table_cell2.setHorizontalAlignment(Element.ALIGN_LEFT);
				table_cell2.setBorder(Rectangle.LEFT);
				table2.addCell(table_cell2);
				
			} */
			
			
			/* table_cell2 = new PdfPCell(new Phrase("\nGSTIN NO - "+forSainath,font12BoldUnderline));
			table_cell2.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell2.setBorder(Rectangle.LEFT);
			table2.addCell(table_cell2);
			 */
			 String InwardChallanNo1 =rs.getString("InwardChallanNo");
			 System.out.println("hi t");
			table_cell2 = new PdfPCell(new Phrase("Your Inward Challan No:"+InwardChallanNo1, Normalfont11 ));
			table_cell2.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell2.setBorder(Rectangle.LEFT | Rectangle.RIGHT |Rectangle.TOP  | Rectangle.BOTTOM);
			table2.addCell(table_cell2);
			
			  
				String outwardDate=rs.getString("sale_Date");
			    Date oDate=new SimpleDateFormat("yyyy-MM-dd").parse(outwardDate); 
				 SimpleDateFormat dateFormater1 = new SimpleDateFormat("dd-MM-yyyy");
				 String owDate = dateFormater1.format(oDate);
				 
			table_cell2 = new PdfPCell(new Phrase("Date :"+owDate,Normalfont11));
			table_cell2.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell2.setBorder(Rectangle.LEFT | Rectangle.RIGHT |Rectangle.TOP  | Rectangle.BOTTOM);
			table2.addCell(table_cell2);
		
			
			table_cell2 = new PdfPCell(new Phrase("Plot No, L-9(Part 1) MIDC, Nagapur,                     Ahmednagar -414 111                                                 Email :bothaakshay@gmail.com",Normalfont11));
			table_cell2.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell2.setBorder(Rectangle.LEFT);
			table2.addCell(table_cell2);
			
			String InwardChallanNo=rs.getString("idno");
			table_cell2 = new PdfPCell(new Phrase("Po-No : "+InwardChallanNo, Normalfont11));
			table_cell2.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell2.setBorder(Rectangle.LEFT | Rectangle.RIGHT |Rectangle.TOP  | Rectangle.BOTTOM);
			table2.addCell(table_cell2);
			
				 String inwardDate=rs.getString("date");
				 Date iDate=new SimpleDateFormat("yyyy-MM-dd").parse(inwardDate); 
				 SimpleDateFormat dateFormater2 = new SimpleDateFormat("dd-MM-yyyy");
				 String iwDate = dateFormater2.format(iDate);
			table_cell2 = new PdfPCell(new Phrase("Date :"+iwDate,Normalfont11));
			table_cell2.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell2.setBorder(Rectangle.LEFT | Rectangle.RIGHT |Rectangle.TOP  | Rectangle.BOTTOM);
			table2.addCell(table_cell2);
			
			
			table_cell2 = new PdfPCell(new Phrase(""));
			table_cell2.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell2.setBorder(Rectangle.LEFT |Rectangle.TOP  | Rectangle.BOTTOM);
			table2.addCell(table_cell2);
			
			table_cell2 = new PdfPCell(new Phrase("", Normalfont11));
			table_cell2.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell2.setBorder(Rectangle.BOTTOM);
			table2.addCell(table_cell2);
			
			table_cell2 = new PdfPCell(new Phrase(""));
			table_cell2.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell2.setBorder( Rectangle.RIGHT |Rectangle.TOP  | Rectangle.BOTTOM);
			table2.addCell(table_cell2);
			
			document.add(table2);
			
			
			PdfPTable table3 = new PdfPTable(2);
			table3.setWidthPercentage(100);

			float[] columnWidths3 = { 0.5f,0.5f};
			table3.setWidths(columnWidths3);

			PdfPCell table_cell3;

			String name=rs.getString("creditcustomer");
			table_cell3 = new PdfPCell(new Phrase("Billing To : "+name, Normalfont12));
			table_cell3.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell3.setBorder(Rectangle.LEFT |Rectangle.RIGHT |Rectangle.TOP);
			table3.addCell(table_cell3);
			
			String vendorcode=rs.getString("custname");
			table_cell3 = new PdfPCell(new Phrase("VENDOR CODE : "+vendorcode, Normalfont12));
			table_cell3.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell3.setBorder(Rectangle.LEFT | Rectangle.RIGHT | Rectangle.BOTTOM);
			table3.addCell(table_cell3);
			
			
			
			String address=rs.getString("address");
			table_cell3 = new PdfPCell(new Phrase("Address : "+address, Normalfont12));
			table_cell3.setHorizontalAlignment(Rectangle.LEFT |Rectangle.RIGHT );
			table_cell3.setBorder(Rectangle.LEFT | Rectangle.RIGHT | Rectangle.BOTTOM);
			table3.addCell(table_cell3);
			
			String OutwardChallanNo=rs.getString("outwardchallan_no");
			table_cell3 = new PdfPCell(new Phrase("O/C No : "+OutwardChallanNo, Normalfont11));
			table_cell3.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell3.setBorder(Rectangle.LEFT | Rectangle.RIGHT | Rectangle.BOTTOM);
			table3.addCell(table_cell3);
			
			String CustomerGstNo=rs.getString("gst_No");
			table_cell3 = new PdfPCell(new Phrase("GSTNO : "+CustomerGstNo, Normalfont12));
			table_cell3.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell3.setBorder(Rectangle.LEFT |Rectangle.RIGHT  |Rectangle.BOTTOM);
			table3.addCell(table_cell3);
			
			/* String InwardChallanNo1 =rs.getString("InwardChallanNo"); */
			/* table_cell3 = new PdfPCell(new Phrase("", Normalfont11));
			table_cell3.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell3.setBorder(Rectangle.LEFT | Rectangle.RIGHT | Rectangle.BOTTOM);
			table3.addCell(table_cell3); */
		
			document.add(table3);
		
			
			PdfPTable table4 = new PdfPTable(1);
			table4.setWidthPercentage(100);

			float[] columnWidths4 = { 30f};
			table4.setWidths(columnWidths4);

			PdfPCell table_cell4;

			table_cell4 = new PdfPCell(new Phrase(""));
			table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell4.setBorder(Rectangle.NO_BORDER);
			table4.addCell(table_cell4);
			
			table_cell4 = new PdfPCell(new Phrase("", Normalfont13));
			table_cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell4.setBorder(Rectangle.NO_BORDER);
			table4.addCell(table_cell4);
		
			document.add(table4);
			
			
			PdfPTable table5 = new PdfPTable(2);
			table5.setWidthPercentage(100);

			float[] columnWidths5 = { 0.5f,0.5f};
			table5.setWidths(columnWidths5);

			PdfPCell table_cell5;
			
			//String //name=rs.getString("supplier_name");
			table_cell5 = new PdfPCell(new Phrase(""));
			table_cell5.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell5.setBorder(Rectangle.NO_BORDER);
			table5.addCell(table_cell5);

			table_cell5 = new PdfPCell(new Phrase(""));
			table_cell5.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell5.setBorder(Rectangle.NO_BORDER);
			table5.addCell(table_cell5);
			
			/* table_cell5 = new PdfPCell(new Phrase(""));
			table_cell5.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell5.setBorder(Rectangle.NO_BORDER);
			table5.addCell(table_cell5);
			
			table_cell5 = new PdfPCell(new Phrase(""));
			table_cell5.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell5.setBorder(Rectangle.NO_BORDER);
			table5.addCell(table_cell5);  */
		
			document.add(table5);
			
			
			PdfPTable table8 = new PdfPTable(2);
			table8.setWidthPercentage(100);

			float[] columnWidths8 = { 0.5f,0.5f};
			table8.setWidths(columnWidths8);

			PdfPCell table_cell8;
			
			//String address=rs.getString("address");
			table_cell8 = new PdfPCell(new Phrase(""));
			table_cell8.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell8.setBorder(Rectangle.NO_BORDER);
			table8.addCell(table_cell8);

			//String CustomerGstNo=rs.getString("CustomerGstNo");
			table_cell8 = new PdfPCell(new Phrase(""));
			table_cell8.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell8.setBorder(Rectangle.NO_BORDER);
			table8.addCell(table_cell8);
			
			table_cell8 = new PdfPCell(new Phrase("\n"));
			table_cell8.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell8.setBorder(Rectangle.NO_BORDER);
			table8.addCell(table_cell8);
			
			table_cell8 = new PdfPCell(new Phrase("\n"));
			table_cell8.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell8.setBorder(Rectangle.NO_BORDER);
			table8.addCell(table_cell8); 
		
			document.add(table8);
			
			
			PdfPTable table6 = new PdfPTable(8);
			table6.setWidthPercentage(100);

			float[] columnWidths6 = { 0.4f,0.2f,0.3f,0.2f,0.3f,0.3f,0.3f,0.3f};
			table6.setWidths(columnWidths6);

			PdfPCell table_cell6;

		
			table_cell6 = new PdfPCell(new Phrase("Product Name", Normalfont11));
			table_cell6.setBorderWidth(1f);
			table_cell6.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell6.setPaddingBottom(4f);
			table6.addCell(table_cell6);
			
			table_cell6 = new PdfPCell(new Phrase("HSN", Normalfont11));
			table_cell6.setBorderWidth(1f);
			table_cell6.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell6.setPaddingBottom(4f);
			table6.addCell(table_cell6);

			
			table_cell6 = new PdfPCell(new Phrase("Operation", Normalfont11));
			table_cell6.setBorderWidth(1f);
			table_cell6.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell6.setPaddingBottom(4f);
			table6.addCell(table_cell6);
			
			table_cell6 = new PdfPCell(new Phrase("Qty", Normalfont11));
			table_cell6.setBorderWidth(1f);
			table_cell6.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell6.setPaddingBottom(4f);
			table6.addCell(table_cell6);
			
			table_cell6 = new PdfPCell(new Phrase("Tax_Amount", Normalfont11));
			table_cell6.setBorderWidth(1f);
			table_cell6.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell6.setPaddingBottom(4f);
			table6.addCell(table_cell6);
			
			table_cell6 = new PdfPCell(new Phrase("Description", Normalfont11));//hsn code
			table_cell6.setBorderWidth(1f);
			table_cell6.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell6.setPaddingBottom(4f);
			table6.addCell(table_cell6);
			
		/* 	table_cell6 = new PdfPCell(new Phrase("Discount", Normalfont11));
			table_cell6.setBorderWidth(1f);
			table_cell6.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell6.setPaddingBottom(4f);
			table6.addCell(table_cell6); */
			
			table_cell6 = new PdfPCell(new Phrase("Rate", Normalfont11));
			table_cell6.setBorderWidth(1f);
			table_cell6.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell6.setPaddingBottom(4f);
			table6.addCell(table_cell6);
			
			
			table_cell6 = new PdfPCell(new Phrase("Amount", Normalfont11));
			table_cell6.setBorderWidth(1f);
			table_cell6.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell6.setPaddingBottom(4f);
			table6.addCell(table_cell6);
			
			
			rs.beforeFirst();
			// from here the vlaue can be inserted
		while (rs.next())
		{
				
				vehicle = rs.getString("vehicle");
				 bgst = rs.getDouble("gst");
			
			String pronm=rs.getString("product_name");
			table_cell6 = new PdfPCell(new Phrase(pronm+"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", Normalfont11));
            table_cell6.setBorderWidth(1f);
			table_cell6.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell6.setPaddingBottom(4f);
			table6.addCell(table_cell6);
			
			String hsn=rs.getString("hsn");
		 	table_cell6 = new PdfPCell(new Phrase(hsn+"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", Normalfont11));
			table_cell6.setBorderWidth(1f);
			table_cell6.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell6.setPaddingBottom(4f);
			table6.addCell(table_cell6);
			
			String length=rs.getString("operation");//length.
			table_cell6 = new PdfPCell(new Phrase(length+"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", Normalfont11));
			table_cell6.setBorderWidth(1f);
			table_cell6.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell6.setPaddingBottom(4f);
			table6.addCell(table_cell6);

			String quantity =rs.getString("okquantity");//bundel this is quantity
			table_cell6 = new PdfPCell(new Phrase(quantity+"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n" , Normalfont11));
			table_cell6.setBorderWidth(1f);
			table_cell6.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell6.setPaddingBottom(4f);
			table6.addCell(table_cell6);
			
			
			String weight =rs.getString("tax_amount");//main qty
			table_cell6 = new PdfPCell(new Phrase(weight+"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", Normalfont11));
			table_cell6.setBorderWidth(1f);
			table_cell6.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell6.setPaddingBottom(4f);
			table6.addCell(table_cell6);
			
			/* String hsn =rs.getString("okquantity");//hsm
			if(hsn==null)
			{
				hsn="0";
			} */
			String Description =rs.getString("description");
			table_cell6 = new PdfPCell(new Phrase(Description+"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", Normalfont11));
			table_cell6.setBorderWidth(1f);
			table_cell6.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell6.setPaddingBottom(4f);
			table6.addCell(table_cell6);

			/* String Discount_perc =rs.getString("Discount_perc");
			String discount_amt=rs.getString("Discount_amount");
			table_cell6 = new PdfPCell(new Phrase(""+discount_amt, Normalfont11));
			table_cell6.setBorderWidth(1f);
			table_cell6.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell6.setPaddingBottom(4f);
			table6.addCell(table_cell6); */
			
			String sale_price =rs.getString("buy_Price");
			table_cell6 = new PdfPCell(new Phrase(sale_price+"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", Normalfont11));
			table_cell6.setBorderWidth(1f);
			table_cell6.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell6.setPaddingBottom(4f);
			table6.addCell(table_cell6);

			
			String x=rs.getString("okquantity");
			String y=rs.getString("buy_Price");
			String z=rs.getString("discount_Amount");
		
			double qty=Double.parseDouble(x);
			double price=Double.parseDouble(y);
			double discount=Double.parseDouble(z);
			amount=(qty*price);
			
			
			Gridamount =rs.getString("grid_Total");
			table_cell6 = new PdfPCell(new Phrase(Gridamount+"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", Normalfont11));
			table_cell6.setBorderWidth(1f);
			table_cell6.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell6.setPaddingBottom(4f);
			table6.addCell(table_cell6);
			
			
		
			/* this cell is for mode of tranasport and showing total amount */
			
			table_cell6 = new PdfPCell(new Phrase("MODE OF TRANSPORT:", Normalfont11));
			table_cell6.setBorderWidth(1f);
			table_cell6.setColspan(5);
			table_cell6.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell6.setBorder(Rectangle.LEFT |Rectangle.RIGHT |Rectangle.TOP |Rectangle.BOTTOM);
			table_cell6.setPaddingBottom(4f);
			table6.addCell(table_cell6);
			
			table_cell6 = new PdfPCell(new Phrase("TOTAL", Normalfont11));
			table_cell6.setBorderWidth(1f);
			table_cell6.setColspan(2);
			table_cell6.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell6.setBorder(Rectangle.LEFT |Rectangle.RIGHT |Rectangle.TOP |Rectangle.BOTTOM);
			table_cell6.setPaddingBottom(4f);
			table6.addCell(table_cell6);
			
			//System.out.println("hi this is kishor amount++++++++++++++++++--------****/////"+amount);
			table_cell6 = new PdfPCell(new Phrase(""+Gridamount, Normalfont11));
			table_cell6.setBorderWidth(1f);
			table_cell6.setColspan(2);
			table_cell6.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell6.setBorder(Rectangle.LEFT |Rectangle.RIGHT |Rectangle.TOP |Rectangle.BOTTOM);
			table_cell6.setPaddingBottom(4f);
			table6.addCell(table_cell6);
			
			
			/*after that this cells are for GST no and gramd total*/
			
			 
			table_cell6 = new PdfPCell(new Phrase("Vehicle NO:", Normalfont11));
			table_cell6.setBorderWidth(1f);
			table_cell6.setColspan(2);
			table_cell6.setBorder(Rectangle.LEFT |Rectangle.RIGHT |Rectangle.TOP |Rectangle.BOTTOM);
		    table_cell6.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell6.setPaddingBottom(2f);
			table6.addCell(table_cell6);
			
			table_cell6 = new PdfPCell(new Phrase(" "+vehicle, Normalfont11));
			table_cell6.setBorderWidth(1f);
			table_cell6.setColspan(3);
			table_cell6.setBorder(Rectangle.LEFT |Rectangle.RIGHT |Rectangle.TOP |Rectangle.BOTTOM);
			table_cell6.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell6.setPaddingBottom(2f);
			table6.addCell(table_cell6);

			//gst divided in two value using below method
			  
			out.println("this is gst "+bgst);
			   double gstset = bgst/2;
			 cgst=gstset;
			 sgst=gstset;
			 gsttotal=cgst+sgst;
			 String gt=rs.getString("gross_total");
			 double grand_tot=Double.parseDouble(gt);
			 
			 double gst=Math.round(((amount*gsttotal)/100));
			 System.out.println("hi this is kishor amount++++++++++++++++++-858585-****/////"+amount);
			 System.out.println("hi this is kishor amount++++++++++++++++++-858585-****/////"+gst);
			 
			 cgst_amt=gst/2;
			 sgst_amt=cgst_amt;
			 
			//calculation of CGST amount
			/* String gt=rs.getString("gross_total");
			double grand_tot=Double.parseDouble(gt);
			double cgst=rs.getDouble("cgst");
			double cgst_amt=0.0d;
			cgst_amt=Math.round(((grand_tot*cgst)/100)); */
			
			
			
			table_cell6 = new PdfPCell(new Phrase("C-GST ", Normalfont11));
			table_cell6.setBorderWidth(1f);
			table_cell6.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell6.setPaddingBottom(4f);
			table6.addCell(table_cell6);
			
			table_cell6 = new PdfPCell(new Phrase(cgst+"%", Normalfont11));
			table_cell6.setBorderWidth(1f);
			table_cell6.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell6.setPaddingBottom(4f);
			table6.addCell(table_cell6);

			table_cell6 = new PdfPCell(new Phrase(""+cgst_amt, Normalfont11));
			table_cell6.setBorderWidth(1f);
			table_cell6.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell6.setPaddingBottom(4f);
			table6.addCell(table_cell6);
			

			table_cell6 = new PdfPCell(new Phrase("", Normalfont11));
			table_cell6.setBorderWidth(1f);
			table_cell6.setColspan(5);
			table_cell6.setBorder(Rectangle.LEFT |Rectangle.RIGHT |Rectangle.TOP |Rectangle.BOTTOM);
			//table_cell6.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell6.setPaddingBottom(4f);
			table6.addCell(table_cell6);
			
			/* String gt=rs.getString("gross_total");
			double grand_tot=Double.parseDouble(gt); */
			/* double sgst=rs.getDouble("sgst");
			double sgst_amt=0.0d;
			grand_tot=grand_tot-cgst_amt;
			sgst_amt=Math.rint(((grand_tot*sgst)/100)); */
			
			table_cell6 = new PdfPCell(new Phrase("S-GST", Normalfont11));
			table_cell6.setBorderWidth(1f);
			table_cell6.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell6.setPaddingBottom(4f);
			table6.addCell(table_cell6);
			
			table_cell6 = new PdfPCell(new Phrase(sgst+"%", Normalfont11));
			table_cell6.setBorderWidth(1f);
			table_cell6.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell6.setPaddingBottom(4f);
			table6.addCell(table_cell6);

			table_cell6 = new PdfPCell(new Phrase(""+sgst_amt, Normalfont11));
			table_cell6.setBorderWidth(1f);
			table_cell6.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell6.setPaddingBottom(4f);
			table6.addCell(table_cell6);

			

			table_cell6 = new PdfPCell(new Phrase("", Normalfont11));
			table_cell6.setBorderWidth(1f);
			table_cell6.setColspan(5);
			table_cell6.setBorder(Rectangle.LEFT |Rectangle.RIGHT |Rectangle.TOP |Rectangle.BOTTOM);
			table_cell6.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell6.setPaddingBottom(4f);
			table6.addCell(table_cell6);
			
			
/* 			table_cell6 = new PdfPCell(new Phrase("", Normalfont11));
			table_cell6.setBorderWidth(1f);
			table_cell6.setBorder(Rectangle.NO_BORDER);
			table_cell6.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell6.setPaddingBottom(4f);
			table6.addCell(table_cell6); */
			
			/*-------- Start IGST Code------ */
		
			table_cell6 = new PdfPCell(new Phrase("I-GST ", Normalfont11));
			table_cell6.setBorderWidth(1f);
			table_cell6.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell6.setPaddingBottom(4f);
			table6.addCell(table_cell6);
			
			String asd = rs.getString("grid_Total");
			double ttt = Double.parseDouble(asd);
			
			double igst_amt;
			String igstper;
			if(cgst<=0 || sgst<=0)
			{
				igstper=rs.getString("Igst");
				System.out.println("hi this is kishor++++++++++++++-------------************ "+igstper);
				double igst=Double.parseDouble(igstper);
				igst_amt=((ttt*igst)/100);
				System.out.println("hi this is kishor++++++++++++++-------------***********123* "+igst_amt);
				System.out.println("hi this is kishor++++++++++++++-------------***********12315----+++* "+grand_tot);
			}
			else
			{
				igstper="00";
				igst_amt=0.0d;
			}
			 String txamt =rs.getString("gross_total");
			table_cell6 = new PdfPCell(new Phrase(igstper+"%", Normalfont11));
			table_cell6.setBorderWidth(1f);
			table_cell6.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell6.setPaddingBottom(4f);
			table6.addCell(table_cell6);
			
		
			table_cell6 = new PdfPCell(new Phrase(""+igst_amt, Normalfont11));
			table_cell6.setBorderWidth(1f);
			table_cell6.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell6.setPaddingBottom(4f);
			table6.addCell(table_cell6);
			

			table_cell6 = new PdfPCell(new Phrase("", Normalfont11));
			table_cell6.setBorderWidth(1f);
			table_cell6.setColspan(6);
			table_cell6.setBorder(Rectangle.LEFT |Rectangle.RIGHT |Rectangle.TOP |Rectangle.BOTTOM);
			//table_cell6.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell6.setPaddingBottom(4f);
			table6.addCell(table_cell6);
			

			
			/* String gt=rs.getString("gross_total");
			double grand_tot=Double.parseDouble(gt); */
			//double sgst=rs.getDouble("sgst");
			//double sgst_amt=0.0d;
			//grand_tot=grand_tot-cgst_amt;
			//sgst_amt=Math.rint(((grand_tot*sgst)/100));

			
			/*-------- End IGST Code------ */
			
			/* ------------Grand  Total-------------- */
			
		
			
			table_cell6 = new PdfPCell(new Phrase("Grand Total", Normalfont11));
			table_cell6.setBorderWidth(1f);
			table_cell6.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell6.setPaddingBottom(4f);
			table6.addCell(table_cell6);

			Grand_Total=rs.getString("gross_Total");
			table_cell6 = new PdfPCell(new Phrase(""+Grand_Total, Normalfont11));
			table_cell6.setBorderWidth(1f);
			table_cell6.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell6.setPaddingBottom(4f);
			table6.addCell(table_cell6);

			table_cell6 = new PdfPCell(new Phrase("", Normalfont11));
			table_cell6.setBorderWidth(1f);
			table_cell6.setBorder(Rectangle.LEFT);
			//table_cell6.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell6.setPaddingBottom(4f);
			table6.addCell(table_cell6);
			
			table_cell6 = new PdfPCell(new Phrase("", Normalfont11));
			table_cell6.setBorderWidth(1f);
			table_cell6.setBorder(Rectangle.NO_BORDER);
			table_cell6.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell6.setPaddingBottom(4f);
			table6.addCell(table_cell6);

			table_cell6 = new PdfPCell(new Phrase("", Normalfont11));
			table_cell6.setBorderWidth(1f);
			table_cell6.setBorder(Rectangle.NO_BORDER);
			table_cell6.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell6.setPaddingBottom(4f);
			table6.addCell(table_cell6);
			document.add(table6);
		
			
			/* -------------End Grand Total -------------*/
			
			PdfPTable table7 = new PdfPTable(1);
			table7.setWidthPercentage(100);

			float[] columnWidths7 = { 0.9f};
			table7.setWidths(columnWidths7);

			PdfPCell table_cell7;

			
			String gt1=rs.getString("gross_Total");
			long totalInLong = Math.round(Double.parseDouble(gt1));
			String grossTotal = String.valueOf(totalInLong);
			int grossTotalInInteger = Integer.parseInt(grossTotal);  
		
			NumToWord w = new NumToWord();
			String amtInWord = w.convert(grossTotalInInteger);

		
			table_cell7 = new PdfPCell(new Phrase("Amount Chargeable(in words) ", Normalfont11));
			table_cell7.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell7.setBorder(Rectangle.LEFT |Rectangle.RIGHT);
			table_cell7.setBorderWidth(1f);
			table7.addCell(table_cell7);
			
			table_cell7 = new PdfPCell(new Phrase(""+amtInWord+" Rupees Only/-", Normalfont13));
			table_cell7.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell7.setBorder(Rectangle.LEFT |Rectangle.RIGHT |Rectangle.BOTTOM);
			table_cell7.setBorderWidth(1f);
			table7.addCell(table_cell7);
		
			/* table_cell7 = new PdfPCell(new Phrase("Declaration", NormalRedfont12));
			table_cell7.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell7.setBorder(Rectangle.LEFT | Rectangle.RIGHT );
			table_cell7.setBorderWidth(1f);
			table7.addCell(table_cell7);
			
			table_cell7 = new PdfPCell(new Phrase("I/We hereby certify that our registration	certificate under Maharashtra  value tax act 2002 is in force on on the date on which the good specified in this 'tax invoice' is made by me/us & it shall be accounted for in the turnover of sales while filling of return and the due tax,If any payble on the sale has been paid or shall be paid.", Normalfont11));
			table_cell7.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell7.setBorder(Rectangle.LEFT | Rectangle.RIGHT | Rectangle.BOTTOM);
			table7.addCell(table_cell7);
			
			
		
			table_cell7 = new PdfPCell(new Phrase("\n", Normalfont11));
			table_cell7.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell7.setBorder(Rectangle.LEFT | Rectangle.RIGHT );
			table_cell7.setBorderWidth(1f);
			table7.addCell(table_cell7);
			
			table_cell7 = new PdfPCell(new Phrase(" Receiver's Siganature", Normalfont11));
			table_cell7.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell7.setBorder(Rectangle.LEFT | Rectangle.RIGHT );
			table_cell7.setBorderWidth(1f);
			table7.addCell(table_cell7);
			
			
			table_cell7 = new PdfPCell(new Phrase(" For SAHYADRI ENTERPRISES", Normalfont11));
			table_cell7.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell7.setBorder(Rectangle.LEFT | Rectangle.RIGHT );
			table_cell7.setBorderWidth(1f);
			table7.addCell(table_cell7);
			
			table_cell7 = new PdfPCell(new Phrase("\n\n", Normalfont11));
			table_cell7.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell7.setBorder(Rectangle.LEFT | Rectangle.RIGHT | Rectangle.BOTTOM );
			table_cell7.setBorderWidth(1f);
			table7.addCell(table_cell7);
			
		 */	document.add(table7);
			
			
			
			PdfPTable table9 = new PdfPTable(2);
			table9.setWidthPercentage(100);

			float[] columnWidths9 = { 0.6f,0.4f};
			table9.setWidths(columnWidths9);
			
			PdfPCell table_cell9;

			
			table_cell9 = new PdfPCell(new Phrase("Declaration", NormalRedfont12));
			table_cell9.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell9.setBorder(Rectangle.LEFT | Rectangle.RIGHT );
			table_cell9.setBorderWidth(1f);
			table9.addCell(table_cell9);
			
			table_cell9 = new PdfPCell(new Phrase(" For "+ShopName.toUpperCase(), Normalfont11));
			table_cell9.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell9.setBorder(Rectangle.LEFT | Rectangle.RIGHT );
			table_cell9.setBorderWidth(1f);
			table9.addCell(table_cell9);

			table_cell9 = new PdfPCell(new Phrase("I/We hereby certify that our registration  certificate under Maharashtra value tax act 2002 is in force on the date on which the good specified in this 'tax invoice' is made by me/us & it shall be accounted for in the turnover of sales while filling of return and the due tax,If any payble on the sale has been paid or shall be paid.", Normalfont11));
			table_cell9.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell9.setBorder(Rectangle.LEFT | Rectangle.RIGHT | Rectangle.BOTTOM);
			table9.addCell(table_cell9);
			
			
			
			table_cell9 = new PdfPCell(new Phrase("\n\n\nAuthorised Signatory"));
			table_cell9.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell9.setBorder(Rectangle.LEFT | Rectangle.RIGHT |Rectangle.BOTTOM );
			table_cell9.setBorderWidth(1f);
			table9.addCell(table_cell9);
			
		/* 	table_cell7 = new PdfPCell(new Phrase("\n\n", Normalfont11));
			table_cell7.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell7.setBorder(Rectangle.LEFT | Rectangle.RIGHT | Rectangle.BOTTOM );
			table_cell7.setBorderWidth(1f);
			table7.addCell(table_cell7); */
		
			document.add(table9);
			
			
	
		rs.close();
		
		stmt.close();
		conn.close();
		document.close();
			
	 	}
	}
	 catch (DocumentException de)
	{
		throw new IOException(de.getMessage());
	}
%>