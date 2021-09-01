package com.Fertilizer.helper;

import java.math.BigInteger;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.hibernate.Session;
import org.hibernate.Transaction;

import com.Fertilizer.bean.GetEmployeeDetails;
import com.Fertilizer.dao.EmployeeDetailsDao;
import com.Fertilizer.dao.ProductDetailsDao;
import com.Fertilizer.dao.shopDetailsDao;
import com.Fertilizer.hibernate.EmployeeDetailsBean;
import com.Fertilizer.hibernate.SubCategoryDetailsBean;
import com.Fertilizer.hibernate.shopDetailsBean;
import com.Fertilizer.utility.HibernateUtility;

public class shopDetailHelper{
	
	public void shopDetails(HttpServletRequest request,
			HttpServletResponse response) {

		System.out.println("In helper");

		Long shopid=0l;
		
		shopDetailsDao sdd=new shopDetailsDao();
		List listtxid=sdd.getShopId();
		
		if(listtxid.size()<=0)
		{
			shopid=1l;
		}
		else
		{
		for (int i = 0; i < listtxid.size(); i++) {
			
			shopDetailsBean sdb=(shopDetailsBean) listtxid.get(i);
			shopid=sdb.getShopId();
			shopid++;
		}
	}
		
		String shopName = request.getParameter("shopName");
		String contactNumber = request.getParameter("contactNumber");
		String gstNo = request.getParameter("gstNo");
		String address = request.getParameter("address");	
		String wholesalelicno = request.getParameter("wholesalelicno");
		String shoplicno = request.getParameter("shoplicno");
		String footershopname = request.getParameter("footershopname");
	
		shopDetailsBean sdb = new shopDetailsBean();
		
		sdb.setShopId(shopid);
		sdb.setShopName(shopName);
		sdb.setContactNumber(Long.parseLong(contactNumber));
		sdb.setGstNo(gstNo);
		sdb.setAddress(address);
		sdb.setWholesalelicno(wholesalelicno);
		sdb.setShoplicno(shoplicno);
		sdb.setFootershopname(footershopname);
	
		sdd.addShop(sdb);
	
	}
	
	public Map getShopDetails() {
	      
		int count=1;
		System.out.println("IN HELPER");
		/*String fk_cat_id = request.getParameter("fk_cat_id");
		
		System.out.println("=== == ==="+fk_cat_id);
		
		
		SubCategoryDetailsBean scdb = new SubCategoryDetailsBean();
		
		scdb.setFk_cat_id(Long.parseLong(fk_cat_id));*/
		
		shopDetailsDao sdd = new shopDetailsDao();
		List list=sdd.getShopName();
		
		System.out.println("list ======"+list.size());
		Map  map =  new HashMap();
		for(int i=0;i<list.size();i++)
		{
			System.out.println("IN HELPER");
			Object[] o = (Object[])list.get(i);
			shopDetailsBean bean = new shopDetailsBean();
			System.out.println(Arrays.toString(o));
			bean.setShopId(Long.parseLong(o[0].toString()));
			bean.setShopName(o[1].toString());
			//bean.setTotalAmount((Double)o[1]);
			System.out.println("***************"+o[0]);
			map.put(count,bean);
			count++;
		}
		return map;
	}
	
//////////fetch shop details from databasse////////
public Map getShopDetailsForEdit(Long shopId) {

	
	System.out.println("into helper class");
	shopDetailsDao dao1 = new shopDetailsDao();
	List catList = dao1.getAllShopDetailsForEdit(shopId);
	
	Map  map =  new HashMap();
	for(int i=0;i<catList.size();i++)
	{
		Object[] o = (Object[])catList.get(i);
	
		shopDetailsBean bean = new shopDetailsBean();
		
		bean.setShopName(o[0].toString());
		bean.setContactNumber(Long.parseLong(o[1].toString()));
		bean.setGstNo(o[2].toString());
		bean.setAddress(o[3].toString());
		bean.setWholesalelicno(o[4].toString());
		bean.setShoplicno(o[5].toString());
		bean.setFootershopname(o[6].toString());
				
		map.put(bean.getShopName(),bean);
	}
	System.out.println("out of helper return map : "+map);
	return map;
}

// update shop details
public void editShopDetail(HttpServletRequest request,
		HttpServletResponse response) {

	
	String ShopId = request.getParameter("fkRootShopId");
	
	String shopName = request.getParameter("shopName");
	String contactNumber = request.getParameter("contactNumber");
	String gstNo = request.getParameter("gstNo");
	String address = request.getParameter("address");
	String wholesaleNo = request.getParameter("wholesaleNo");
	String shopLicNo = request.getParameter("shopLicNo");
	String footername = request.getParameter("footername");
		
	HibernateUtility hbu=null;
	Session session = null;
	Transaction transaction = null;
	
	 hbu = HibernateUtility.getInstance();
	 session = hbu.getHibernateSession();
	 transaction = session.beginTransaction();

	long ShopID =Long.parseLong(ShopId);
	shopDetailsBean det = (shopDetailsBean) session.get(shopDetailsBean.class, ShopID);
	
	det.setShopName(shopName);
	det.setContactNumber(Long.parseLong(contactNumber));
	det.setGstNo(gstNo);
	det.setAddress(address);
	det.setWholesalelicno(wholesaleNo);
	det.setShoplicno(shopLicNo);
	det.setFootershopname(footername);
		
    session.saveOrUpdate(det);
	transaction.commit();
	
	System.out.println("Record updated successfully.");

	}
}