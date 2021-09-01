package com.Fertilizer.helper;

import java.util.List;

import com.Fertilizer.dao.DailySaleDao;

public class DailySaleHelper {
	
	public List getDay() {
		DailySaleDao dao =  new DailySaleDao();
		return dao.getDay();
		
	}
	
	public List getWeek()
	{
		DailySaleDao dao = new DailySaleDao();
		return dao.getWeek();
	}

	public List getMonth()
	{
		DailySaleDao dao = new DailySaleDao();
		return dao.getMonth();
	}

}
