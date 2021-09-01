package com.Fertilizer.helper;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.InputStreamReader;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.hibernate.Session;
import org.hibernate.Transaction;

import com.Fertilizer.bean.Barcode_PDF;
import com.Fertilizer.bean.BillBean;
import com.Fertilizer.dao.AdvanceBookinhDao;
import com.Fertilizer.dao.GoodsReceiveDao;
import com.Fertilizer.dao.StockDao;
import com.Fertilizer.dao.productTransferDao;
import com.Fertilizer.hibernate.GoodsReceiveBean;
import com.Fertilizer.hibernate.PackingHibernate;
import com.Fertilizer.hibernate.Stock;
import com.Fertilizer.hibernate.productTransferHibernate;
import com.Fertilizer.utility.HibernateUtility;

public class productTransferHelper {

	
	public void addproducttx(HttpServletRequest request,
			HttpServletResponse response) throws ParseException {
		
		String shopNameTx = request.getParameter("shopNameTx");
		String fkshopIdTx = request.getParameter("fkshopIdTx");
		
		System.out.println("IN HELPER   -   "+shopNameTx+"  & "+fkshopIdTx);

		GoodsReceiveDao dao = new GoodsReceiveDao();
		
		Integer count = Integer.parseInt(request.getParameter("count"));
		System.out.println(count);
		
		productTransferHibernate bean = new productTransferHibernate();
		
	for(int i =0 ; i<count;i++)
	{
		
			String PkStockId = request.getParameter("PkStockId"+i);
			

			String subCatId  = request.getParameter("subCatId"+i);
			
			String catID = request.getParameter("catID"+i);
			
			Long CatIdUi = Long.parseLong(catID);
			Long subcatidUi = Long.parseLong(subCatId);			
			String productId = request.getParameter("productId"+i);
			Long proidUi = Long.parseLong(productId);
			
			String productName = request.getParameter("productName"+i);
			System.out.println("` `````````````` ```    productName - -   "+productName);
			
			String QuantityTx = request.getParameter("QuantityTx"+i);
			String companyName = request.getParameter("companyName"+i);
			String unit = request.getParameter("unit"+i);
			String shopNameware = request.getParameter("shopName"+i);
			String fk_shop_id = request.getParameter("fk_shop_id"+i);
			String stock = request.getParameter("quantity"+i);
		
			
			String weight = request.getParameter("weight"+i);
			String pack_type = request.getParameter("pack_type"+i);
			Double weig = Double.parseDouble(weight);
			
			Double qq = Double.parseDouble(QuantityTx);
			Double ss = Double.parseDouble(stock);
			
			Double tt = ss - qq;
					
			bean.setStockId(Long.parseLong(PkStockId));
			bean.setCategoryID(CatIdUi);
			bean.setSubCategoryId(subcatidUi);
			bean.setProductId(proidUi);
			bean.setProductName(productName);
			bean.setQuantityTx(Double.parseDouble(QuantityTx));
			bean.setCompanyName(companyName);
			bean.setUnit(unit);
			bean.setShopnametoTx(shopNameTx);
			bean.setShop_idtoTx(Long.parseLong(fkshopIdTx));
			bean.setWare_shopname(shopNameware);
			bean.setWareshop_id(Long.parseLong(fk_shop_id));
			bean.setStock(tt);
			
			String onlyShopName = "";
		
		HttpSession session1 = request.getSession(true);
		
		String username = (String) session1.getAttribute("user");
		String userid = (String) session1.getAttribute("userid");
	//	String shopid = (String) session1.getAttribute("shopid");
		String shopName = (String) session1.getAttribute("shopName");
		
		String ShopNameWithoutId1 = shopName.substring(4);
		String Shopid = shopName.substring(3);
		onlyShopName = ShopNameWithoutId1.trim();
		System.out.println("shopName -  "+shopName+" ShopNameWithoutId1 -  "+ShopNameWithoutId1+"  onlyShopName -  "+onlyShopName+" Shopid - "+Shopid);
		
		bean.setUserName(username);
		bean.setFkuserid(Long.parseLong(userid));
		
		Date date = new Date();
		bean.setDate(date);


		
//		bean.setFkuserid(Long.parseLong(userid));
//		bean.setUserName(username);
//		bean.setShopName(onlyShopName);
		
	//	dao.addGoodsReceive(bean);
		
		productTransferDao daoo = new productTransferDao();
		daoo.registerproduct(bean);	
		
		
		/*****************************************************STOCK ENTRY WHENEVER GOOD RECEIVED*********************************************/
		
		productTransferDao dao1 = new productTransferDao();
        List stkList2  = dao1.getAllStock1(fkshopIdTx);
        

        
        
        if(stkList2.size() == 0){
        	System.out.println("in hello1 stkList.size()= = = - "+stkList2.size());

            Stock newEntry = new Stock();
        	newEntry.setCatID(Long.parseLong(catID));

			newEntry.setSubCatId(Long.parseLong(subCatId));
			newEntry.setFk_shop_id(Long.parseLong(fkshopIdTx));
			
			newEntry.setFkuserid(Long.parseLong(userid));
			newEntry.setShopName(shopNameTx);
			newEntry.setUserName(username);
			//System.out.println(fk_shop_id);

			newEntry.setProductName(productName);
			newEntry.setCompanyName(companyName);
			newEntry.setWeight(Double.parseDouble(weight));
			newEntry.setQuantity(Double.parseDouble(QuantityTx));
							
			//Double weightForConversionStock = Double.parseDouble(weight);
			Double quantityForConversionStock = Double.parseDouble(QuantityTx);
			
			newEntry.setTotalKgLtrPieceQuantity(quantityForConversionStock);
			newEntry.setUnit(unit);
        	newEntry.setProductId(Long.parseLong(productId));
        	newEntry.setPack_type(pack_type);
			
			productTransferDao dao2 = new productTransferDao();
			dao2.registerStock(newEntry);	
        	
        }
        else/*To Update Stock Table If It is Not Empty */
        {
        	
        for(int j=0;j<stkList2.size();j++){
        //	System.out.println("hi this is 2");
        	
        	com.Fertilizer.hibernate.Stock st = (com.Fertilizer.hibernate.Stock)stkList2.get(j);
        	Long catid = st.getCatID();
        	
        	Long subcatidd = st.getSubCatId();
        	Long proid = st.getProductId();
        	String proname = st.getProductName();
        	String com = st.getCompanyName();
        	Double wei = st.getWeight();
        	String pack = st.getPack_type();
        	String un = st.getUnit();
        	
    		System.out.println("com "+com+"   "+catid+" wight - - "+wei+"  packi  - "+pack+" unit - "+un);
    		
        	/*If ItemName Is Already Exists In Stock Table */ 
        	if(CatIdUi.equals(catid) && subcatidUi.equals(subcatidd) && proidUi.equals(proid)  && productName.equals(proname) && companyName.equals(com) && weig.equals(wei) && pack_type.equals(pack) && unit.equals(un)){
        		 Double qunty = st.getQuantity();
        		Long pkid = st.getPkStockId();
        		 Double updatequnty = (double) (qunty + Double.parseDouble(QuantityTx));
        		 System.out.println("for loop stock update Quantity---------- "+updatequnty+"  pkid -  "+pkid);
        				 
  
        		 
        		 HibernateUtility hbu = HibernateUtility.getInstance();
        		 Session session = hbu.getHibernateSession();
        		 Transaction transaction = session.beginTransaction();
        		 
        		 Stock updateStock = (Stock) session.get(Stock.class, new Long(pkid));
        		 
        		 
        		 DateFormat df = new SimpleDateFormat("dd/MM/yyyy");
       // 		 Date date = new Date();
        	
        		// updateStock.setUpdateDate(date);
        		 updateStock.setQuantity(updatequnty);
        		 updateStock.setTotalKgLtrPieceQuantity(updatequnty);

        		 
        		session.saveOrUpdate(updateStock);
        		System.out.println("stock updated !!");
        		transaction.commit();
        		break;
        	}
        	else
        	{
        		//ItemName is Not Exists 
        		if(j+1 == stkList2.size()){
        	        Stock newEntry = new Stock();
        	        
        			System.out.println("HI this is List after More3 Item=-======   "+stkList2.size());
    
        			
                	newEntry.setCatID(Long.parseLong(catID));

        			newEntry.setSubCatId(Long.parseLong(subCatId));
        			newEntry.setFk_shop_id(Long.parseLong(fkshopIdTx));
        			
        			newEntry.setFkuserid(Long.parseLong(userid));
        			newEntry.setShopName(shopNameTx);
        			newEntry.setUserName(username);
        			//System.out.println(fk_shop_id);

        			newEntry.setProductName(productName);
        			newEntry.setCompanyName(companyName);
        			newEntry.setWeight(Double.parseDouble(weight));
        			newEntry.setQuantity(Double.parseDouble(QuantityTx));
        							
        			//Double weightForConversionStock = Double.parseDouble(weight);
        			Double quantityForConversionStock = Double.parseDouble(QuantityTx);
        			
        			newEntry.setTotalKgLtrPieceQuantity(quantityForConversionStock);
        			newEntry.setUnit(unit);
                	newEntry.setProductId(Long.parseLong(productId));
                	newEntry.setPack_type(pack_type);
                	
        			productTransferDao dao2 = new productTransferDao();
        			dao2.registerStock(newEntry);	
        			
        			break;
        		}
        	}
        	
          }	
        }
        
        
		productTransferDao daoa1 = new productTransferDao();
        List stkList3  = daoa1.getAllStock2(fk_shop_id);
        

        for(int j=0;j<stkList3.size();j++){
        //	System.out.println("hi this is 2");
        	
        	com.Fertilizer.hibernate.Stock st = (com.Fertilizer.hibernate.Stock)stkList3.get(j);
        	Long catid = st.getCatID();
        	
        	Long subcatidd = st.getSubCatId();
        	Long proid = st.getProductId();
        	String proname = st.getProductName();
        	String com = st.getCompanyName();
        	Double wei = st.getWeight();
        	String pack = st.getPack_type();
        	String un = st.getUnit();
        	
    		System.out.println("com "+com+"   "+catid+" wight - - "+wei+"  packi  - "+pack+" unit - "+un);
    		System.out.println("com "+com+"   "+catid);
        	/*If ItemName Is Already Exists In Stock Table */ 
//        	if(CatIdUi.equals(catid) && subcatidUi.equals(subcatidd) && proidUi.equals(proid)  && productName.equals(proname) && companyName.equals(com)){    		
        	if(CatIdUi.equals(catid) && subcatidUi.equals(subcatidd) && proidUi.equals(proid)  && productName.equals(proname) && companyName.equals(com) && weig.equals(wei) && pack_type.equals(pack) && unit.equals(un)){

        		 Double quntyy = st.getQuantity();
        		Long pk = st.getPkStockId();
        		 Double updatequnty = (double) (quntyy - Double.parseDouble(QuantityTx));
        		 System.out.println("for loop stock update Quantity---------- "+updatequnty+"  pkid -  "+pk);
        				 
  
        		 
        		 HibernateUtility hbu = HibernateUtility.getInstance();
        		 Session session = hbu.getHibernateSession();
        		 Transaction transaction = session.beginTransaction();
        		 
        		 Stock updateStock = (Stock) session.get(Stock.class, new Long(pk));
        		 
        		 
        		 DateFormat df = new SimpleDateFormat("dd/MM/yyyy");
    //    		 Date date = new Date();
        	
        		// updateStock.setUpdateDate(date);
        		 updateStock.setQuantity(updatequnty);
        		 updateStock.setTotalKgLtrPieceQuantity(updatequnty);

        		 
        		session.saveOrUpdate(updateStock);
        		System.out.println("stock updated !!");
        		transaction.commit();
        		break;
        	}
        }

	
	}
	}
	
	//packing
	
	public void addpacking(HttpServletRequest request,
			HttpServletResponse response) throws ParseException {
		
//		String shopNameTx = request.getParameter("shopNameTx");
//		String fkshopIdTx = request.getParameter("fkshopIdTx");
		
		System.out.println("IN HELPER   -   ");

//		GoodsReceiveDao dao = new GoodsReceiveDao();
		
		
//		productTransferHibernate bean = new productTransferHibernate();
		
		
			String fk_cat_id = request.getParameter("fk_cat_id");
			String fk_subCat_id  = request.getParameter("fk_subCat_id");
			String packweight = request.getParameter("packweight");
			String productId = request.getParameter("productId");
			String proName = request.getParameter("proName");			
				
			Long fkcatid = Long.parseLong(fk_cat_id);
			Long fksubcatid = Long.parseLong(fk_subCat_id);
			Long fkproid = Long.parseLong(productId);
			
			String type = "packed";
			
			String weight = request.getParameter("weight");
			Double wttt = Double.parseDouble(weight);
			String packunit = request.getParameter("packunit");
			String packquantity = request.getParameter("packquantity");
			
			System.out.println("` `````````````` ```    productName - -   ");
			
			String packquankg = request.getParameter("packquankg");
			String stock = request.getParameter("stock");
			String stckid = request.getParameter("stckid");
			Long sstt = Long.parseLong(stckid);

			HttpSession session1 = request.getSession(true);
			
			String username = (String) session1.getAttribute("user");
			String userid = (String) session1.getAttribute("userid");
			String shopid = (String) session1.getAttribute("shopid");
			String shopName = (String) session1.getAttribute("shopName");
	        String onlyShopName = "";
			String ShopNameWithoutId1 = shopName.substring(4);
			onlyShopName = ShopNameWithoutId1.trim();
			
			Double quankg = Double.parseDouble(packquankg);
			Double ss = Double.parseDouble(stock);
			
			Double updtestk = ss - quankg;
			
			PackingHibernate bean = new PackingHibernate();
					
//			bean.setStockId(Long.parseLong(PkStockId));
			bean.setCatID(fkcatid);
			bean.setSubCatId(fksubcatid);
			bean.setProductId(fkproid);
			bean.setProductName(proName);
			bean.setQuantity(Double.parseDouble(packquantity));
			bean.setUnit(packunit);
			Date date = new Date();			
			bean.setDate(date);
			bean.setFkuserid(Long.parseLong(userid));
			bean.setUserName(username);
			bean.setShopName(onlyShopName);
				bean.setFk_shop_id(Long.parseLong(shopid));
		bean.setWeight(wttt);
		productTransferDao dao10 = new productTransferDao();		
		dao10.registerpack(bean);
		
//		productTransferDao daoo = new productTransferDao();
//		daoo.registerproduct(bean);	
		
		
		/*****************************************************STOCK ENTRY WHENEVER GOOD RECEIVED*********************************************/
		
		productTransferDao dao1 = new productTransferDao();
        List stkList2  = dao1.getAllStock10(shopid,type);
        

        
        
        if(stkList2.size() == 0){
        	System.out.println("in hello1 stkList.size()= = = - "+stkList2.size());

            Stock newEntry = new Stock();
        	newEntry.setCatID(Long.parseLong(fk_cat_id));

			newEntry.setSubCatId(Long.parseLong(fk_subCat_id));
			newEntry.setFk_shop_id(Long.parseLong(shopid));
			
			newEntry.setFkuserid(Long.parseLong(userid));
			newEntry.setShopName(ShopNameWithoutId1);
			newEntry.setUserName(username);
			//System.out.println(fk_shop_id);

			newEntry.setProductName(proName);
			newEntry.setCompanyName("NA");
			newEntry.setWeight(Double.parseDouble(weight));
			newEntry.setQuantity(Double.parseDouble(packquantity));
			newEntry.setPack_type(type);
//			newEntry.setPackquantity(Double.parseDouble(packquantity));
	//		newEntry.setUnit(packunit);
			
			//Double weightForConversionStock = Double.parseDouble(weight);
			Double quantityForConversionStock = Double.parseDouble(packquantity);
			
			newEntry.setTotalKgLtrPieceQuantity(quantityForConversionStock);
			newEntry.setUnit(packunit);
        	newEntry.setProductId(Long.parseLong(productId));
			
			
			productTransferDao dao2 = new productTransferDao();
			dao2.registerStock(newEntry);	
        	
        }
        else/*To Update Stock Table If It is Not Empty */
        {
        	
        for(int j=0;j<stkList2.size();j++){
        //	System.out.println("hi this is 2");
        	
        	com.Fertilizer.hibernate.Stock st = (com.Fertilizer.hibernate.Stock)stkList2.get(j);
        	Long catid = st.getCatID();
        	
        	Long subcatidd = st.getSubCatId();
        	Long proid = st.getProductId();
        	String proname = st.getProductName();
        	String com = st.getCompanyName();
        	Double wt = st.getWeight();
 //       	String unt = st.getPackunit();
        	String unt = st.getUnit();
    		System.out.println("com "+com+"   "+catid);
        	/*If ItemName Is Already Exists In Stock Table */ 
        	if(fkcatid.equals(catid) && fksubcatid.equals(subcatidd) && fkproid.equals(proid)  && proName.equals(proname) && packunit.equals(unt) && wttt.equals(wt)){
        		
            	System.out.println("in hello1 if condition  ()= = = - "+stkList2.size()+"     j   -   "+j);
        		
        		Double qunty = st.getQuantity();
        		Long pkid = st.getPkStockId();
        		
   //     		Double pqq = st.getPackquantity();
        		
        		System.out.println("qunty stck -  "+qunty+"  quan from UI -  "+packquankg);
        		
    //    		 Double updatequnty = (double) (pqq + Double.parseDouble(packquantity));
        		 
        		 Double updatequntyy = (double) (qunty + Double.parseDouble(packquantity));
        		 
        		 System.out.println("for loop stock update Quantity----------  pkid -  "+pkid+"  , updatequnty - "+updatequntyy);
        				 
  
        		 
        		 HibernateUtility hbu = HibernateUtility.getInstance();
        		 Session session = hbu.getHibernateSession();
        		 Transaction transaction = session.beginTransaction();
        		 
        		 Stock updateStock = (Stock) session.get(Stock.class, new Long(pkid));
        		 
        		 
        		 DateFormat df = new SimpleDateFormat("dd/MM/yyyy");
       // 		 Date date = new Date();
        	
        		// updateStock.setUpdateDate(date);
        		 updateStock.setQuantity(updatequntyy);
        		 updateStock.setTotalKgLtrPieceQuantity(updatequntyy);

     //   		 updateStock.setPackquantity((updatequnty));
      //  		 updateStock.setPackunit(packunit);
        		 
        		session.saveOrUpdate(updateStock);
        		System.out.println("stock updated !!");
        		transaction.commit();
        		break;
        	}
        	else
        	{
        		//ItemName is Not Exists 
        		if(j+1 == stkList2.size()){
                	System.out.println("in hello1 else condition  ()= = = - "+stkList2.size()+"     j   -   "+j);
                    Stock newEntry = new Stock();
                	newEntry.setCatID(Long.parseLong(fk_cat_id));

        			newEntry.setSubCatId(Long.parseLong(fk_subCat_id));
        			newEntry.setFk_shop_id(Long.parseLong(shopid));
        			
        			newEntry.setFkuserid(Long.parseLong(userid));
        			newEntry.setShopName(ShopNameWithoutId1);
        			newEntry.setUserName(username);
        			//System.out.println(fk_shop_id);
//        			newEntry.setPackquantity(Double.parseDouble(packquantity));
 //       			newEntry.setPackunit(packunit);
        			newEntry.setProductName(proName);
        			newEntry.setCompanyName("NA");
        			newEntry.setWeight(Double.parseDouble(weight));
        			newEntry.setQuantity(Double.parseDouble(packquantity));
        			newEntry.setPack_type(type);			
        			//Double weightForConversionStock = Double.parseDouble(weight);
        			Double quantityForConversionStock = Double.parseDouble(packquantity);
        			
        			newEntry.setTotalKgLtrPieceQuantity(quantityForConversionStock);
        			newEntry.setUnit(packunit);
                	newEntry.setProductId(Long.parseLong(productId));
        			
        			
        			productTransferDao dao2 = new productTransferDao();
        			dao2.registerStock(newEntry);	
          
        			
        			break;
        		}
        	}
        	
          }	
        }
        
        
        productTransferDao daoa1 = new productTransferDao();
        List stkList3  = daoa1.getAllStocks(shopid);
        

        for(int j=0;j<stkList3.size();j++){
        	System.out.println("hi this is 2   -        j  "+j+" list size stk minus  - -    "+stkList3.size());
        	
        	com.Fertilizer.hibernate.Stock st = (com.Fertilizer.hibernate.Stock)stkList3.get(j);
        	Long catid = st.getCatID();
        	
        	Long stckidd = st.getPkStockId();
        	String ttt = st.getPack_type();
        	Long subcatidd = st.getSubCatId();
        	Long proid = st.getProductId();
        	String proname = st.getProductName();
        	String com = st.getCompanyName();
    		System.out.println("com "+com+"   "+catid);
        	/*If ItemName Is Already Exists In Stock Table */ 
       // 	if(CatIdUi.equals(catid) && subcatidUi.equals(subcatidd) && proidUi.equals(proid)  && productName.equals(proname) && companyName.equals(com)){
    		if(stckidd.equals(sstt) && ttt.equals("unpacked")){		 
    			
        		Double quntyy = st.getQuantity();
        		Long pk = st.getPkStockId();
        		 Double updatequnty = (double) (quntyy - Double.parseDouble(packquankg));
        		 System.out.println("for loop stock update Quantity---------- "+updatequnty+"  pkid -  "+pk);
        				 
  
        		 
        		 HibernateUtility hbu = HibernateUtility.getInstance();
        		 Session session = hbu.getHibernateSession();
        		 Transaction transaction = session.beginTransaction();
        		 
        		 Stock updateStock = (Stock) session.get(Stock.class, new Long(pk));
        		 
        		 
        		 DateFormat df = new SimpleDateFormat("dd/MM/yyyy");
    //    		 Date date = new Date();
        	
        		// updateStock.setUpdateDate(date);
        		 updateStock.setQuantity(updatequnty);
        		 updateStock.setTotalKgLtrPieceQuantity(updatequnty);

        		 
        		session.saveOrUpdate(updateStock);
        		System.out.println("stock updated !!");
        		transaction.commit();
        		break;
        	}
        }

	
	
	}
}
