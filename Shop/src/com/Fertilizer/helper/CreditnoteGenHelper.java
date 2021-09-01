package com.Fertilizer.helper;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.Fertilizer.dao.creditnoteDao;
import com.Fertilizer.hibernate.creditnotebean;


public class CreditnoteGenHelper {


	public void creditNoteGen(HttpServletRequest request, HttpServletResponse response )
	{
				Long Txid=0l;
				
				creditnoteDao dao2=new  creditnoteDao();
				List listtxid=dao2.getCreditNoteTxid();
				
				if(listtxid.size()<=0)
				{
					Txid=1l;
				}
				else
				{
				for (int i = 0; i < listtxid.size(); i++) {
					
				creditnotebean bean=(creditnotebean) listtxid.get(i);
				Txid=bean.getTxId();
				Txid++;
				}
			}
			
		String partyname=request.getParameter("partyname");
		String description=request.getParameter("description");
		String amount=request.getParameter("amount");
			
		String paymentMode = request.getParameter("paymentMode");
		String chequeNum = request.getParameter("chequeNum");
		String cardNum = request.getParameter("cardNum");
		String accNum = request.getParameter("accNum");
		String bankName = request.getParameter("bankName");
		String nameOnCheck = request.getParameter("nameOnCheck");
		String creditDate = request.getParameter("creditDate");
		
		System.out.println("cardNum "+cardNum+" accNum "+accNum+" bankName "+bankName+" nameOnCheck "+nameOnCheck+" paymentMode "+paymentMode+" amount "+amount+" chequeNum "+chequeNum);
		
		HttpSession session = request.getSession();
		session.setAttribute("partyname", partyname);

		creditnotebean bean = new creditnotebean();

	    String onlyShopName = "";
		
		HttpSession session1 = request.getSession(true);
		
		String username = (String) session1.getAttribute("user");
		String userid = (String) session1.getAttribute("userid");
		String shopid = (String) session1.getAttribute("shopid");
		String shopName = (String) session1.getAttribute("shopName");
		
		String ShopNameWithoutId1 = shopName.substring(4);
		onlyShopName = ShopNameWithoutId1.trim();
		
		bean.setFkshopid(Long.parseLong(shopid));
		bean.setFkuserid(Long.parseLong(userid));
		bean.setUserName(username);
		bean.setShopName(onlyShopName);		
		bean.setTxId(Txid);
		
		
		bean.setCardNum(Long.parseLong(cardNum));
		bean.setChequeNum(chequeNum);
		bean.setPaymentMode(paymentMode);

		bean.setAccNum(Long.parseLong(accNum));
		bean.setBankName(bankName);
		bean.setNameOnCheck(nameOnCheck);
		
		if(partyname!=null)
		{
			bean.setPartyname(partyname);
		}
		else
		{
			bean.setPartyname("N/A");
		}

		if(description!=null)
		{
			bean.setdescription(description);
		}
		else
		{
			bean.setdescription("N/A");
		}

		if(partyname!=null)
		{
			bean.setAmount(Double.parseDouble(amount));
		}
		else
		{
			bean.setAmount(0.0d);
		}
		
		SimpleDateFormat dateFormat1 = new SimpleDateFormat("yyyy-MM-dd");
		Date pDD = null;
		try {
			pDD = dateFormat1.parse(creditDate);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

				bean.setInsertDate(pDD);

		creditnoteDao dao=new creditnoteDao();
		dao.insertCreditNote(bean);
	}


}
