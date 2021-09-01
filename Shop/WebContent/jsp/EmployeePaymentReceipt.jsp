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


<%@page import="javax.activation.DataSource"%>
<%@page import="javax.mail.util.ByteArrayDataSource"%>
<%@page import="javax.activation.DataHandler"%>
<%@page import="javax.activation.FileDataSource"%>
<%@page import="javax.mail.Multipart"%>
<%@page import="javax.mail.internet.MimeMultipart"%>
<%@page import="javax.mail.internet.MimeBodyPart"%>
<%@page import="javax.mail.Address"%>
<%@page import="com.sun.mail.smtp.SMTPTransport"%>
<%@page import="javax.mail.URLName"%>
<%@page import="javax.mail.internet.InternetAddress"%>
<%@page import="javax.mail.internet.MimeMessage"%>
<%@page import="javax.mail.Transport"%>
<%@page import="javax.mail.Session"%>

<%@ page import="java.io.*, com.itextpdf.text.*, com.itextpdf.text.pdf.*" %>
<%
	response.setContentType("application/pdf");
	Long TransactionId = (Long) session.getAttribute("transactionIdEmp");
    String shopName = (String ) session.getAttribute("onlyShopName");

	//String shopname="";
	String Address="";
	String GST_No="N/A";
	String accountantName="";
	String employeeid="";
	//String Lic_No_Wholesale="";
	//String Lic_No_Shop="";
	//String Footer_Shop_Name="";
		
	Connection conn = null;

	try {

		// step 1
		Document document = new Document(PageSize.A4);
		document.setMargins(2, 2, 1, 1);

		// step 2

		PdfWriter.getInstance(document, response.getOutputStream());
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
        PdfWriter.getInstance(document, baos);

		// step 3
		document.open();

		Class.forName("com.mysql.jdbc.Driver");
		conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/shop", "root", "root");
		
		//Statement stmt = conn.createStatement();
		//ResultSet rs = stmt.executeQuery("SELECT trans_No_Employee, employeeName, insert_date, payment_mode, payment, fk_employee_id from employee_payment  WHERE trans_No_Employee ='"+TransactionId+"'");

		Statement stmt1 = conn.createStatement();
		ResultSet rs1 = stmt1.executeQuery("SELECT trans_No_Employee, employeeName, insert_date, payment_mode, payment, fk_employee_id, person_name from employee_payment  WHERE trans_No_Employee ='"+TransactionId+"'");

		
		while (rs1.next()) {
		// shopname=rs1.getString("shop_name");
		 //Address=rs1.getString("address");
		// GST_No=rs1.getString("N/A");
		// Lic_No_Wholesale=rs1.getString("Lic_No_wholesale");
		// Lic_No_Shop=rs1.getString("Lic_No_shop");
		// Footer_Shop_Name=rs1.getString("footer_shop_name");
		}
		
		rs1.first();

		System.out.println("Query Execute");
		Date d1 = new Date();
		SimpleDateFormat sdf  = new SimpleDateFormat("dd-MMM-yyyy");
		SimpleDateFormat sdf1 = new SimpleDateFormat("E");
		SimpleDateFormat sdf2 = new SimpleDateFormat("hh:mm:ss  ");
		sdf2.setTimeZone(TimeZone.getTimeZone("IST"));

		String insert_date=rs1.getString("insert_date");
		//Date billDate = new Date();
		//SimpleDateFormat dateFormater = new SimpleDateFormat("dd-MM-yyyy");
		//String StrBillDate = dateFormater.format(insert_date);

		String stdver1 = (String) sdf.format(d1);
		String day = sdf1.format(d1.getDate());
		String Time = sdf2.format(d1.getTime());
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
		Font Normalfont12 = new Font(Font.FontFamily.TIMES_ROMAN, 12, Font.NORMAL, BaseColor.BLACK);
		Font Normalfont13 = new Font(Font.FontFamily.TIMES_ROMAN, 13, Font.NORMAL, BaseColor.BLACK);
		Font Normalfont14 = new Font(Font.FontFamily.TIMES_ROMAN, 14, Font.NORMAL, BaseColor.BLACK);
		Font ufont14 = new Font(Font.FontFamily.TIMES_ROMAN, 14, Font.UNDERLINE, BaseColor.BLACK);

		// step 4

		PdfPTable table = new PdfPTable(3);
		table.setWidthPercentage(100);

		float[] columnWidths = { 0.2f, 0.3f, 0.2f };
		table.setWidths(columnWidths);

		PdfPCell table_cell;

		table_cell = new PdfPCell(new Phrase("", Normalfont11));
		table_cell.setBorder(table_cell.NO_BORDER);
		table.addCell(table_cell);

		table_cell = new PdfPCell(new Phrase(shopName, font15Bold));
		table_cell.setBorder(table_cell.NO_BORDER);
		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
		table.addCell(table_cell);

		employeeid=rs1.getString("fk_employee_id");
		table_cell = new PdfPCell(new Phrase("                                    Employee ID    =   "+employeeid,font9NoBold));
		table_cell.setBorder(table_cell.NO_BORDER);
		table.addCell(table_cell);

		//-----------------
 
		table_cell = new PdfPCell(new Phrase(" "));
		table_cell.setBorder(table_cell.NO_BORDER);
		table.addCell(table_cell);

		table_cell = new PdfPCell(new Phrase("Salary Invoice", Normalfont11));
		table_cell.setBorder(table_cell.NO_BORDER);
		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
		table.addCell(table_cell);

	    table_cell = new PdfPCell(new Phrase(" ", font9NoBold));
		table_cell.setBorder(table_cell.NO_BORDER);
		table_cell.setVerticalAlignment(Element.ALIGN_CENTER);
		table.addCell(table_cell); 

		//-----------------

		String transactionNo=rs1.getString("trans_No_Employee");
		table_cell = new PdfPCell(new Phrase("Transaction No : " + transactionNo, Normalfont11));
		table_cell.setBorder(table_cell.NO_BORDER);
		table_cell.setPaddingTop(2f);
		table.addCell(table_cell);

		table_cell = new PdfPCell(new Phrase("", font17));
		table_cell.setBorder(table_cell.NO_BORDER);
		table_cell.setPaddingTop(2f);
		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
		table.addCell(table_cell);

		table_cell = new PdfPCell(new Phrase(" ", font9NoBold));
		table_cell.setVerticalAlignment(Element.ALIGN_TOP);
		table_cell.setBorder(table_cell.NO_BORDER);
		table.addCell(table_cell); 

		//-------------
       
		table_cell = new PdfPCell(new Phrase(""));
		table_cell.setBorder(Rectangle.BOTTOM);
		table_cell.setPaddingBottom(3f);
		table.addCell(table_cell);

		table_cell = new PdfPCell(new Phrase(Address, Normalfont11));
		table_cell.setBorder(Rectangle.BOTTOM);
		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell.setPaddingBottom(2f);
		table.addCell(table_cell);

		table_cell = new PdfPCell(new Phrase(" ", font9NoBold));
		table_cell.setBorder(Rectangle.BOTTOM);
		table_cell.setPaddingBottom(2f);
		table.addCell(table_cell);

		document.add(table);
		
		PdfPTable table1 = new PdfPTable(1);
		table1.setWidthPercentage(100);

		float[] columnWidths1 = { 0.2f};
		table.setWidths(columnWidths);

		PdfPCell table_cell1;
		
		table_cell1 = new PdfPCell(new Phrase("\n", Normalfont11));
		table_cell1.setBorder(Rectangle.RIGHT | Rectangle.LEFT | Rectangle.TOP);
		table1.addCell(table_cell1);
		
		table_cell1 = new PdfPCell(new Phrase("Date: "+insert_date, Normalfont12));
		table_cell1.setPaddingLeft(500f);
		table_cell1.setBorder(Rectangle.RIGHT | Rectangle.LEFT );
		table1.addCell(table_cell1);

		String supplieName=rs1.getString("employeeName");
		table_cell1 = new PdfPCell(new Phrase("Respected Mr/Mrs : "+supplieName, Normalfont12));
		table_cell1.setPaddingLeft(10f);
		table_cell1.setBorder(Rectangle.RIGHT | Rectangle.LEFT );
		table1.addCell(table_cell1);
		
		
		String payment=rs1.getString("payment");
		long AmountInLong = Math.round(Double.parseDouble(payment));
		String Amount = String.valueOf(AmountInLong);
		int AmountInInteger = Integer.parseInt(Amount);
		NumToWord w = new NumToWord();
		String amtInWord = w.convert(AmountInInteger);
		
		
		String payment_mode=rs1.getString("payment_mode");
		table_cell1 = new PdfPCell(new Phrase("Today we will get your personal account from the rest of the Amount in word, ' "+amtInWord+" ', rupees Only Through "+payment_mode+"  Received it into your bank account.", Normalfont12));
		table_cell1.setPaddingLeft(60f);
		table_cell1.setBorder(Rectangle.RIGHT | Rectangle.LEFT);
		table1.addCell(table_cell1);
		
		/* table_cell1 = new PdfPCell(new Phrase("                    Through "+payment_mode+"  Received it into your account", Normalfont12));
		table_cell1.setBorder(Rectangle.RIGHT | Rectangle.LEFT );
		table1.addCell(table_cell1);
		 */
		table_cell1 = new PdfPCell(new Phrase("\n\n", Normalfont11));
		table_cell1.setBorder(Rectangle.RIGHT | Rectangle.LEFT);
		table1.addCell(table_cell1);
		
		table_cell1 = new PdfPCell(new Phrase("Amount Rs. "+payment+"/-", Normalfont14));
		table_cell1.setPaddingLeft(10f);
		table_cell1.setBorder(Rectangle.RIGHT | Rectangle.LEFT);
		table1.addCell(table_cell1);
		
		table_cell1 = new PdfPCell(new Phrase("Rupees in Words : "+amtInWord +" Only/-", Normalfont14));  // amount in words
		table_cell1.setPaddingLeft(10f);
		table_cell1.setBorder(Rectangle.RIGHT | Rectangle.LEFT);
		table1.addCell(table_cell1);
		
		table_cell1 = new PdfPCell(new Phrase("\n\n", Normalfont11));
		table_cell1.setBorder(Rectangle.RIGHT | Rectangle.LEFT);
		table1.addCell(table_cell1);
		
		table_cell1 = new PdfPCell(new Phrase("Thank You...!", Normalfont13));
		table_cell1.setPaddingLeft(400f);
		table_cell1.setBorder(Rectangle.RIGHT | Rectangle.LEFT);
		table1.addCell(table_cell1);
		
	    accountantName=rs1.getString("person_name");
		table_cell1 = new PdfPCell(new Phrase(accountantName, Normalfont12));
		table_cell1.setPaddingLeft(400f);
		table_cell1.setBorder(Rectangle.RIGHT | Rectangle.LEFT);
		table1.addCell(table_cell1);
		
		table_cell1 = new PdfPCell(new Phrase("Signature/Stamp", Normalfont12));
		table_cell1.setPaddingLeft(400f);
		table_cell1.setBorder(Rectangle.RIGHT | Rectangle.LEFT);
		table1.addCell(table_cell1);
		
		table_cell1 = new PdfPCell(new Phrase("\n\n", Normalfont11));
		table_cell1.setBorder(Rectangle.RIGHT | Rectangle.LEFT | Rectangle.BOTTOM);
		table1.addCell(table_cell1);
	
		document.add(table1);
	
		document.add(new Paragraph(""));

		rs1.close();
		stmt1.close();
		conn.close();
	 	document.close();
	
		try{
              /* Session mailSession = Session.getInstance(System.getProperties());
              Transport transport = new SMTPTransport(mailSession,new URLName("smtp.gmail.com"));
              transport = mailSession.getTransport("smtps");
              transport.connect("smtp.gmail.com", 465 ,"embelmessanger@gmail.com","embel@123");
              
              MimeMessage m = new MimeMessage(mailSession); 
              m.setFrom(new InternetAddress("embelbackup@gmail.com"));
              Address[] toAddr = new InternetAddress[] {
              new InternetAddress("embelbackup@gmail.com")
              };
              m.setRecipients(javax.mail.Message.RecipientType.TO, toAddr );
              m.setHeader("Content-Type", "multipart/mixed");
              m.setSubject(" Cashbook Payment pdf");
              m.setSentDate(new java.util.Date());

              MimeBodyPart messageBodyPart = new MimeBodyPart();
              messageBodyPart.setText("CashBook Payment");
              Multipart multipart = new MimeMultipart();
              multipart.addBodyPart(messageBodyPart);

              messageBodyPart = new MimeBodyPart();
         
              DataSource source = new ByteArrayDataSource(baos.toByteArray(), "application/pdf");
              messageBodyPart.setDataHandler(new DataHandler(source));
              messageBodyPart.setFileName("SupplierPaymentReceipt.pdf");
              multipart.addBodyPart(messageBodyPart);
				
  			  m.setContent(multipart);

              transport.sendMessage(m,m.getAllRecipients());
              transport.close();
              out.println("Thanks for sending mail!"); */
            
		      System.out.println("PAYMENT PDF SENT");
	    }catch(Exception e){
	   		 out.println(e.getMessage());
	   		 e.printStackTrace();
		  }
	 }
	catch (DocumentException de) {
		throw new IOException(de.getMessage());
	}
%>
	  