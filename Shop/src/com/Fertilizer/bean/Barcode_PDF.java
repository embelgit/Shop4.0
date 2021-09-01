package com.Fertilizer.bean;

import java.io.FileOutputStream;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Image;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.pdf.Barcode128;
import com.itextpdf.text.pdf.BarcodeEAN;
import com.itextpdf.text.pdf.PdfContentByte;
import com.itextpdf.text.pdf.PdfWriter;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

//import org.hibernate.Query;
//import org.hibernate.Session;

import com.Fertilizer.hibernate.GoodsReceiveBean;
import com.Fertilizer.utility.HibernateUtility;
import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Document;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.Rectangle;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
	
	
	public class Barcode_PDF {
	
	 
		  
		public void createPDF(String billName,String bar,int qw) {

System.out.println("in barcode file - - - -      billName - "+billName+"  bar - "+bar+"  qw - "+qw);
			Document doc = new Document();
		    PdfWriter docWriter = null;
			try
			{
		        docWriter = PdfWriter.getInstance(doc, new FileOutputStream("D://Barcode//"+billName+".pdf"));
		        doc.open();

		        
				float fa = 770f;
		        for(int i =1; i<=qw;i++)
			    {
		        	
		     //   		System.out.println("i left - "+i);
		        		
		        PdfContentByte cb = docWriter.getDirectContent();

/*		        PdfPTable table = new PdfPTable(1);
				table.setWidthPercentage(100);
				
				float[] columnWidths = {1f};
				table.setWidths(columnWidths);
				PdfPCell table_cell;
				
				 table_cell = new PdfPCell(new Phrase("\n"));
				table_cell.setHorizontalAlignment(Element.ALIGN_LEFT);
				table_cell.setBorder(Rectangle.NO_BORDER);
				table.addCell(table_cell);
				
				doc.add(table);
	*/
		        
		        
				if(i%2!=0 && i%3!=0) {
					System.out.println("i left - "+i);
		        Barcode128 code128 = new Barcode128();
		        code128.setCode(bar.trim());
		        code128.setCodeType(Barcode128.CODE128);
		        Image code128Image = code128.createImageWithBarcode(cb,null,null);
		        code128Image.setAbsolutePosition(50, fa);
		        code128Image.scalePercent(125);
		        doc.add(code128Image);
				}
				
				else if(i%2==0 && i%3!=0) {
					System.out.println("i middle - "+i);
			        Barcode128 code128 = new Barcode128();
			        code128.setCode(bar.trim());
			        code128.setCodeType(Barcode128.CODE128);
			        Image code128Image = code128.createImageWithBarcode(cb,null,null);
			        	code128Image.setAbsolutePosition(210, fa);
			        code128Image.scalePercent(125);
			        doc.add(code128Image);
				}
				else if(i%3==0) {
					System.out.println("i right - "+i);
			        Barcode128 code128 = new Barcode128();
			        code128.setCode(bar.trim());
			        code128.setCodeType(Barcode128.CODE128);
			        Image code128Image = code128.createImageWithBarcode(cb,null,null);
			        	code128Image.setAbsolutePosition(360, fa);
			        code128Image.scalePercent(125);
			        doc.add(code128Image);
				}
				
					/*
					 * else if(i%4==0) { System.out.println("i right - "+i); Barcode128 code128 =
					 * new Barcode128(); code128.setCode(myString.trim());
					 * code128.setCodeType(Barcode128.CODE128); Image code128Image =
					 * code128.createImageWithBarcode(cb,null,null);
					 * code128Image.setAbsolutePosition(390, fa); //
					 * code128Image.setSpacingBefore(50f); // code128Image.setSpacingAfter(50f);
					 * code128Image.scalePercent(125); // code128Image.setAlignment(aa);
					 * doc.add(code128Image); }
					 */
				
					if(i%3==0) {
		        	fa=fa-50f;
		        	System.out.println("fa -    "+fa);
		       // 	aa++;
					}

			    }
		        
			//    }
		        
		        
		        
		    } catch (DocumentException dex) {
		        dex.printStackTrace();
		    } catch (Exception ex) {
		        ex.printStackTrace();
		    } finally {
		        if (doc != null) {
		            doc.close();
		        }
		        if (docWriter != null) {
		            docWriter.close();
		        }
		    }
			}
			
		
		
	}
		
		
		
		
		
		
	