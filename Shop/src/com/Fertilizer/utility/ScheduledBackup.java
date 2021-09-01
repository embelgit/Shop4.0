package com.Fertilizer.utility;

import java.util.Timer;
import java.util.TimerTask;

import com.Fertilizer.helper.LogoutController;

public class ScheduledBackup
{
	public static void backupOnTime()
	{
		TimerTask task = new TimerTask() {
			/*LogoutController bb = new LogoutController();
			Date date = new Date();*/
			@Override
			public void run()
			{			
				LogoutController.main1();
			}
		};
		Timer timer = new Timer();
		long delay = 0;
		long intevalPeriod = 1 * 3600 * 1000;//time interval for one hour
		// schedules the task to be run in an interval
		/*long t2 = intevalPeriod/2;
		long t3 = t2/2;*/
		timer.scheduleAtFixedRate(task, delay, intevalPeriod);
	}

	public static void main(String[] args) {
		
	} // end of main
}
