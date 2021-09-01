package com.Fertilizer.helper;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.Fertilizer.dao.GodownEntryDao;
import com.Fertilizer.hibernate.GodownEntry;

public class GodownDetailsHelper {

	public void godownDetail(HttpServletRequest request,
			HttpServletResponse response) {


		GodownEntry godownEntry = new GodownEntry();
		String godown = request.getParameter("godown");
		godownEntry.setGodownName(godown);
		
		GodownEntryDao dao = new GodownEntryDao();
		dao.addGodown(godownEntry);
	}

}
