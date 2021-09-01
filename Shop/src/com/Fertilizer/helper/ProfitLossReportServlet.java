package com.Fertilizer.helper;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.itextpdf.text.log.SysoLogger;

@WebServlet("/ProfitLossReportServlet")
public class ProfitLossReportServlet extends HttpServlet
{
	private static final long serialVersionUID = 1L;
       
    public ProfitLossReportServlet() {
        super();
    }
    
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
	{
		System.out.println("servlet called GET");
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
	{
		String fisDate2 = request.getParameter("fisDate2");
		String endDate2 = request.getParameter("endDate2");
		
		System.out.println(fisDate2+" "+endDate2);
		System.out.println("servlet called POST");
	}
}
