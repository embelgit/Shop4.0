/*package com.Fertilizer.helper;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.math.BigDecimal;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.hibernate.Query;
import org.hibernate.Session;

import com.Fertilizer.bean.GetBarcode;
import com.Fertilizer.dao.BarcodeDetailDao;
import com.Fertilizer.hibernate.BarcodeDetailsBean;
import com.Fertilizer.utility.HibernateUtility;



public class BarcodeDetailHelper {
	
	
	Long barcodeNo;
	String newSize;
	String itemId;
	
	public Map getItemDetailUsingSaveSize(String itemId) {
		OfferDetailDao dao = new OfferDetailDao();
		List list = dao.getItemDetailUsingSaveSize(itemId);
		Map  map1 =  new HashMap();
		for(int i=0;i<list.size();i++)
		{
			Object[] o = (Object[])list.get(i);
			PoItemDisplayBean bean = new PoItemDisplayBean();
			
			bean.setItemID((BigInteger)o[0]);
			bean.setSize((String)o[1]);
			
			map1.put(bean.getItemID(),bean);
		}
		return map1;
	}
	
	public void offerDetails(HttpServletRequest request, HttpServletResponse response) throws IOException
	
	{
		
		BarcodeDetailsBean odetail = new BarcodeDetailsBean();
		
		BarcodeDetailDao dao1=new BarcodeDetailDao();
		@SuppressWarnings("rawtypes")
		List barcode=dao1.getBarcodeNoPrint();
		for(int i=0;i<barcode.size();i++){
			GetBarcode sa=(GetBarcode)barcode.get(i);
			
			 barcodeNo= sa.getBarcodeNo();
			 barcodeNo++;
			 System.out.println("Barrrrrrr"+barcode);
		}
		
		HibernateUtility hbu = HibernateUtility.getInstance();
		Session session = hbu.getHibernateSession();
		List<PoItemDisplayBean> PoItemDisplay=null;
		String item_id= request.getParameter("item_id");
		Query query = session.createSQLQuery("select i.pk_item_id,i.size from item_details i where i.pk_item_id ="+item_id);
		List <Object[]> list=query.list();
		
		PoItemDisplay =new ArrayList<PoItemDisplayBean>(0);
		
		 for (Object[] object : list) {
			 System.out.println(Arrays.toString(object));
		
			 PoItemDisplayBean cBean=new PoItemDisplayBean();
			 cBean.setSize(object[1].toString());
			 
			 PoItemDisplay.add(cBean);
			 
			 
		
		    Iterator iterator = list.iterator(); iterator.hasNext(); 
			Object[] objects = (Object[]) iterator.next();
			System.out.println(objects[1]);

		    newSize = (objects[1].toString());
		    System.out.println("newsize"+newSize);
	
	     
		
		FileInputStream fstream = new FileInputStream("C:/Users/Mahajan/Desktop/barcose/input.txt");
		
		BufferedReader br = new BufferedReader(new InputStreamReader(fstream));
		FileWriter fw = new FileWriter("C:/Users/Mahajan/Desktop/barcose/Output.txt");
	
		BufferedWriter bw = new BufferedWriter(fw);
		String strLine;
		String str1;
	
		String discount=request.getParameter("discount");
		String buyPrice = request.getParameter("newbuyPrice");
		System.out.println("buyPrice"+buyPrice);
		String commision = request.getParameter("commision");
		System.out.println("comm"+commision);
		String salePrice = request.getParameter("salePrice");
		System.out.println("salePrice"+salePrice);
		
		System.out.println("item_id"+item_id);
		String quantity=request.getParameter("quantity");
		String shopName=request.getParameter("shopName");
		String itemName=request.getParameter("itemName");
		String size = request.getParameter("size");
		
		
		
		
		if(barcodeNo == null){
			odetail.setBarcodeNo(1000l);
		}
		else
		{
			odetail.setBarcodeNo(barcodeNo);	
		}
	
		
		BigDecimal bDecimal = new BigDecimal(buyPrice);
		odetail.setBuyPrice(bDecimal);
	
	
		
		BigDecimal bDecimal1 = new BigDecimal(commision);
		odetail.setCommision(bDecimal1);
		
		odetail.setItem_id(Long.parseLong(item_id));
	
		
		BigDecimal bDecimal2 = new BigDecimal(salePrice);
		odetail.setSalePrice(bDecimal2);
		
		BigDecimal bDecimal3=new BigDecimal(discount);
		odetail.setDiscount(bDecimal3);
		
		System.out.println("=============================================++"+salePrice);
		
		
		BarcodeDetailDao oddao = new BarcodeDetailDao();
		oddao.valOfferDetail(odetail);
		while ((strLine = br.readLine()) != null)   {
			
			if(strLine.equals("~item_id"))
				
			{
				str1=br.readLine();
	                strLine = str1 + item_id;
	              
	        	}
			
			 else if(strLine.equals("~newSize"))
					
	         {
				 	//quantity =StringUtils.leftPad(quantity, 4,"0");
					str1=br.readLine();
	                 strLine = str1 + newSize;
	               
	         }
			else if(strLine.equals("~price"))
				
	             {
	                	 str1=br.readLine();
	                     strLine = str1 + buyPrice;
	                    
	                    
	             }
				
			 else if(strLine.equals("~commision"))
					
	            {
				   
					
				   str1=br.readLine();
					
	                    strLine = str1 + commision;
	                  
	            }
				
			 else if(strLine.equals("~salePrice"))
					
	            {commision =StringUtils.leftPad(commision, 4,"0");
					str1=br.readLine();
	                    strLine = str1 + salePrice;
	                  
	            }
			
			 else if(strLine.equals("barcode"))
					
	         {
				 	//quantity =StringUtils.leftPad(quantity, 4,"0");
					str1=br.readLine();
	                 strLine = str1 + barcodeNo;
	                
	               
	         }
				
			 else if(strLine.equals("~quantity"))
					
	         {
				 quantity =StringUtils.leftPad(quantity, 4,"0");
					str1=br.readLine();
	                 strLine = str1 + quantity;
	               
	         }
				
			 else if(strLine.equals("~shopName"))
					
	         {
				 	//quantity =StringUtils.leftPad(quantity, 4,"0");
					str1=br.readLine();
	                 strLine = str1 + shopName;
	               
	         }
				
			 else if(strLine.equals("~itemName"))
					
	         {
				 	//quantity =StringUtils.leftPad(quantity, 4,"0");
					str1=br.readLine();
	                 strLine = str1 + itemName;
	               
	         }
				 
				System.out.println(strLine);
				bw.write(strLine+"\r\n");
				
			  // Print the content on the console
			 System.out.println (strLine);
			}
		
		bw.close();
		//Close the input stream
		br.close();
		List cmdAndArgs = Arrays.asList("cmd", "/c", "printbatch.bat");
		File dir = new File("C:/Users/Mahajan/Desktop/barcose");

		ProcessBuilder pb = new ProcessBuilder(cmdAndArgs);
		pb.directory(dir);
		Process p = pb.start();
		// String filePath = "C:/Users/ADITYA/Desktop/barcose/printbatch.bat";
		 String  filePath="C:/Users/ADITYA/Desktop/barcose/printbatch.bat";
		//Process p = Runtime.getRuntime().exec(filePath);
		 Runtime rn=Runtime.getRuntime();
		 Process pr=rn.exec(filePath);
		// System.out.println(p);
//		 Process p = Runtime.getRuntime().exec(filePath);
			}
		
		
		
	
	public List getAllOffer(){
		
	BarcodeDetailDao dao=new BarcodeDetailDao();
	return dao.getAllOffer();
		
	}
	
	
	
	
	
	}
*/