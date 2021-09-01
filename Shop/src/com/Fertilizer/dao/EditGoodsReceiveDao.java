package com.Fertilizer.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.Query;
import org.hibernate.Session;
import org.jfree.util.Log;

import com.Fertilizer.utility.HibernateUtility;

public class EditGoodsReceiveDao {
	
	public List getAllBillDetailsForEdit(String billNum, String supplier, HttpServletRequest request)
	{
		HttpSession usersession = request.getSession(true);
		String userid = (String)usersession.getAttribute("userid");
		String shopid = (String)usersession.getAttribute("shopid");
		
		HibernateUtility hbu=null;
		Session session=null;
		List list = null;
		
		try{
			 String sqlQuery = "";
			 hbu=HibernateUtility.getInstance();
			 session=hbu.getHibernateSession();		 
			 
//			 Query query = session.createSQLQuery("SELECT gr.fk_product_id, p.product_name, p.manufacturing_company, p.hsn, p.weight, su.unit_name, gr.fkCategoryId, gr.fk_subCat_id, gr.buy_price, gr.sale_price, gr.mrp, gr.tax_percentage, t.tax_name, p.sale_price_ex_tax, gr.sgst, gr.cgst, sc.sub_cat_name, gr.iGstPercentage, gr.disc_perc_per_product, gr.disc_amt_per_product, gr.total_excl_tax_per_product, gr.quantity, gr.Per_Product_Total, gr.buy_price_excl_tax, gr.pk_goods_receive_id from product_details p LEFT JOIN tax_details t on fk_tax_id = t.pk_tax_id LEFT JOIN sold_units su on p.fk_unit_id = su.pk_unit_id LEFT JOIN sub_categories sc on p.fk_subCat_id = sc.pk_subcat_id LEFT JOIN goods_receive gr on p.pk_product_id = gr.fk_product_id where gr.fk_supplier_id = '"+supplier+"' AND gr.bill_number = '"+billNum+"' AND gr.fk_shop_id = '"+shopid+"' GROUP BY p.manufacturing_company");
			 Query query = session.createSQLQuery("SELECT gr.fk_product_id, p.product_name, p.manufacturing_company, p.hsn, p.weight, p.buyunit, gr.fkCategoryId, gr.fk_subCat_id, gr.buy_price, gr.sale_price, gr.mrp, gr.tax_percentage, t.tax_name, p.sale_price_ex_tax, gr.sgst, gr.cgst, sc.sub_cat_name, gr.iGstPercentage, gr.disc_perc_per_product, gr.disc_amt_per_product, gr.total_excl_tax_per_product, gr.quantity, gr.Per_Product_Total, gr.buy_price_excl_tax, gr.pk_goods_receive_id,p.unitvalue,p.saleunit from product_details p LEFT JOIN tax_details t on fk_tax_id = t.pk_tax_id LEFT JOIN sold_units su on p.fk_unit_id = su.pk_unit_id LEFT JOIN sub_categories sc on p.fk_subCat_id = sc.pk_subcat_id LEFT JOIN goods_receive gr on p.pk_product_id = gr.fk_product_id where gr.fk_supplier_id = '"+supplier+"' AND gr.bill_number = '"+billNum+"' GROUP BY p.manufacturing_company");			
			 list = query.list();
			 System.out.println(list.size()+"*************");
			}catch(RuntimeException e){
				
			Log.error("Error in getAllBillDetailsForEdit",e);
		   }finally{
		 		if(session!=null){
					 
					hbu.closeSession(session);
				}			
			}
		
		return list;
	}
	
public List EditGoodReceiveBillDetailsNonGrid(String billNum, String supplier, HttpServletRequest request)
{
	HttpSession usersession = request.getSession(true);
	String userid = (String)usersession.getAttribute("userid");
	String shopid = (String)usersession.getAttribute("shopid");
		
	HibernateUtility hbu=null;
	Session session=null;
	List list = null;
	
	try{
		 String sqlQuery = "";
		 hbu=HibernateUtility.getInstance();
		 session=hbu.getHibernateSession();		 
		 
		 Query query = session.createSQLQuery("SELECT expenseTaxPerc, total_amount, discount_percentage, discount_amount, transExpenseIncTax, hamaliExpenseIncTax, gross_total, transExpense_Tax_Amt, hamaliExpense_Tax_Amt FROM goods_receive WHERE fk_supplier_id= '"+supplier+"' AND bill_number= '"+billNum+"' AND fk_shop_id = '"+shopid+"' limit 1");
		
		 list = query.list();
		 System.out.println(list.size()+"*************");
		}catch(RuntimeException e){
			
		Log.error("Error in getAllBillDetailsForEdit",e);
	   }finally{
	 		if(session!=null){
				 
				hbu.closeSession(session);
			}			
		}
	
	return list;
	}

public List getAllbillnumber(String fk_supp_id, HttpServletRequest request)
{
	HttpSession usersession = request.getSession(true);
	String userid = (String)usersession.getAttribute("userid");
	String shopid = (String)usersession.getAttribute("shopid");
	
	System.out.println("IN DAO");
	HibernateUtility hbu = null;
	Session session =  null;
	Query query = null;
	List list = null;
	System.out.println("IN DAO---> "+fk_supp_id);
	
	 try {
		 hbu = HibernateUtility.getInstance();
		 session = hbu.getHibernateSession();
		 System.out.println("IN DAO"+fk_supp_id);
		 
		 query = session.createSQLQuery("SELECT bill_number, product_name from goods_receive where fk_supplier_id = '"+fk_supp_id+"' and fk_shop_id = '"+shopid+"' GROUP BY bill_number" );
		 list = query.list(); 
		 
	} catch (RuntimeException e) {
		Log.error("Error in getAllMainCat", e);
	}
	 
	 finally
	 {
		 if (session!=null) {
			hbu.closeSession(session);
		}
	 }
			return list;
}

}
