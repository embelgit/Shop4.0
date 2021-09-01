package com.Fertilizer.helper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.Fertilizer.bean.SaleReturnBean;
import com.Fertilizer.dao.SaleReturnReportDao;
import com.Fertilizer.hibernate.billcancelbean;




////////Sale Return between two dates////////
public class SaleReturnReportHelper {


	public List getSaleReturnReportBetweenTwoDates(
			HttpServletRequest request, HttpServletResponse response) {

		String fDate = request.getParameter("fisDate");
		String tDate = request.getParameter("endDate");
		
		System.out.println("First Date-------------"+fDate);
		System.out.println("last Date-------------"+tDate);

		Map<Long, SaleReturnBean> map = new HashMap<Long, SaleReturnBean>();

		SaleReturnReportDao dao=new SaleReturnReportDao();
		List exp1List = dao.getSaleReturnReportBetweenTwoDates(fDate, tDate);

		return exp1List;
	}
//
	public List billcnclReportBetweenTwoDates(
			HttpServletRequest request, HttpServletResponse response) {

		String fDate = request.getParameter("fisDate");
		String tDate = request.getParameter("endDate");
		
		System.out.println("First Date-------------"+fDate);
		System.out.println("last Date-------------"+tDate);

		Map<Long, billcancelbean> map = new HashMap<Long, billcancelbean>();

		SaleReturnReportDao dao=new SaleReturnReportDao();
		List exp1List = dao.billcnclReportBetweenTwoDates(fDate, tDate);

		return exp1List;
	}










}
