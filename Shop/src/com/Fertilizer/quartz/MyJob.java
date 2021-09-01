package com.Fertilizer.quartz;
import org.apache.tools.ant.taskdefs.email.Mailer;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.slf4j.LoggerFactory;

public class MyJob implements Job {

	 @Override
	  public void execute(JobExecutionContext context) throws JobExecutionException {
	    try { 

	    	String to="bandewarsumeet22@gmail.com";
			String subject = "Fertilizer total sale amount" ;
			String msg = "";
			//for fertlizer
			DataToMail dm=new DataToMail();
			Double ferti= dm.getTotalSaleAmountOfTheDay();
			//for pesticide
			Double pesti = dm.getTotalSaleAmountOfPesticide();
			//for seed
			Double seedAmount = dm.getTotalSaleAmountOfSeed();
			Double totalSaleAmount = ferti + pesti + seedAmount;
		    com.Fertilizer.quartz.Mailer.send(to, subject,"Your Fertilizer total sale amount is = Rs"+ferti);
		    com.Fertilizer.quartz.Mailer.send(to, subject,"Your Pesticide total sale amount is = Rs"+pesti);
		    com.Fertilizer.quartz.Mailer.send(to, subject,"Your Seed total sale amount is = Rs"+seedAmount);
		    com.Fertilizer.quartz.Mailer.send(to, subject,"Your total sale amount(Including All Category) is = Rs"+totalSaleAmount);
			System.out.println("mail sent...");
			
	    } catch (Exception ex) {
	      LoggerFactory.getLogger(getClass()).error(ex.getMessage());
	    }
	  }
}
