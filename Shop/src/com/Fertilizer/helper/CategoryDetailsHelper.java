package com.Fertilizer.helper;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.hibernate.Session;
import org.hibernate.Transaction;

import com.Fertilizer.dao.CategoryDetailsDao;
import com.Fertilizer.hibernate.CategoryDetailsBean;
import com.Fertilizer.hibernate.MeasuringUnitsBean;
import com.Fertilizer.hibernate.SubCategoryDetailsBean;
import com.Fertilizer.utility.HibernateUtility;

public class CategoryDetailsHelper {

	public void catDetails(HttpServletRequest request,
			HttpServletResponse response) {

		String categoryName = request.getParameter("categoryName");
		
		CategoryDetailsDao cdd = new CategoryDetailsDao();
		CategoryDetailsBean cdb = new CategoryDetailsBean();
		
		cdb.setCategoryName(categoryName);
		
        String onlyShopName = "";
		
		HttpSession session = request.getSession(true);
		
		String username = (String) session.getAttribute("user");
		String userid = (String) session.getAttribute("userid");
		String shopid = (String) session.getAttribute("shopid");
		String shopName = (String) session.getAttribute("shopName");
		
		String ShopNameWithoutId1 = shopName.substring(4);
		onlyShopName = ShopNameWithoutId1.trim();
		
		cdb.setFkshopid(Long.parseLong(shopid));
		cdb.setFkuserid(Long.parseLong(userid));
		cdb.setShopName(onlyShopName);
		cdb.setUserName(username);
		
		cdd.addCategory(cdb);
	
	}
    
	public void subCatDetails(HttpServletRequest request,
			HttpServletResponse response) {
          		
		System.out.println("IN HELPER");
		String fk_cat_id = request.getParameter("fk_cat_id");
		String subcategoryName = request.getParameter("subcategoryName");
		
		CategoryDetailsDao cdd = new CategoryDetailsDao();
		SubCategoryDetailsBean scdb = new SubCategoryDetailsBean();
		
		scdb.setFk_cat_id(Long.parseLong(fk_cat_id));
		scdb.setSubcategoryName(subcategoryName);
		
        String onlyShopName = "";
		
		HttpSession session = request.getSession(true);
		
		String username = (String) session.getAttribute("user");
		String userid = (String) session.getAttribute("userid");
		String shopid = (String) session.getAttribute("shopid");
		String shopName = (String) session.getAttribute("shopName");
		
		String ShopNameWithoutId1 = shopName.substring(4);
		onlyShopName = ShopNameWithoutId1.trim();
		
		scdb.setFkuserid(Long.parseLong(userid));
		scdb.setFkshopid(Long.parseLong(shopid));
		scdb.setUserName(username);
		scdb.setShopName(onlyShopName);
		
		cdd.addSubCategory(scdb);
	
	}
	
	/////////////category detail edit/////////
	
	
	public void editCat(HttpServletRequest request,HttpServletResponse response) 
	{
		
        String oldCatName= request.getParameter("oldCatName");
        String catname= request.getParameter("catname");
        String catId= request.getParameter("catId");
       		
			 Long catId1 = Long.parseLong(catId);
			
			 HibernateUtility hbu = HibernateUtility.getInstance();
			 Session session = hbu.getHibernateSession();
			 Transaction transaction = session.beginTransaction();

			 CategoryDetailsBean updateCat = (CategoryDetailsBean) session.get(CategoryDetailsBean .class, new Long(catId1));
			 
			 updateCat.setCategoryName(catname);
			
			 session.saveOrUpdate(updateCat);
			 transaction.commit();
		
	}
	
	//
	public void delCat(HttpServletRequest request,HttpServletResponse response) 
	{
		
        String catId= request.getParameter("catId");
       		
		System.out.println("catID - -   "+catId);
    		CategoryDetailsDao cdd = new CategoryDetailsDao();
    		cdd.delCategory(catId);
	}
	
	public void delsubCat(HttpServletRequest request,HttpServletResponse response) 
	{
		
        String catId= request.getParameter("catId");
       		
		System.out.println("catID - -   "+catId);
    		CategoryDetailsDao cdd = new CategoryDetailsDao();
    		cdd.delsubCategory(catId);
	}
	////////////subcategory edit//////////////////
	
	public void editsubCat(HttpServletRequest request,HttpServletResponse response) 
	{
		String catId= request.getParameter("catId");
		
        String subcatId= request.getParameter("subcatId");
        String subcatNameOld= request.getParameter("subcatNameOld");
        
        String subcatname= request.getParameter("subcatname");
        
			 Long subcatId1= Long.parseLong(subcatId);
						
			 HibernateUtility hbu = HibernateUtility.getInstance();
			 Session session = hbu.getHibernateSession();
			 Transaction transaction = session.beginTransaction();

			 SubCategoryDetailsBean updatesubCat = (SubCategoryDetailsBean) session.get(SubCategoryDetailsBean.class, new Long(subcatId1));

			 updatesubCat.setSubcategoryName(subcatname);
			
			 session.saveOrUpdate(updatesubCat);
			 transaction.commit();
	}
	
}