package com.Fertilizer.utility;

import java.io.File;
import java.io.IOException;

import org.slf4j.LoggerFactory;

public class MyJob
{
	File backup = null;

	public void execute() {
		try {
			//Enter the maile id where you want to backup
			//String to = "cr7rohanchhajed7@gmail.com";
			//String to = "embel12@mailinator.com";
			String to = "sagarembel@gmail.com";
			try
			{
				AutoDatabaseBackupJob data = new AutoDatabaseBackupJob();
				backup = data.mailDatabaseBackup();
			}
			catch (IOException e)
			{
				e.printStackTrace();
			}
			try
			{
				com.Fertilizer.utility.Mailer.sendFile(to, backup);
			}
			catch (Exception e)
			{
				e.printStackTrace();
			}
			System.out.println("mail sent...");
		}
		catch (Exception ex)
		{
			LoggerFactory.getLogger(getClass()).error(ex.getMessage());
		}
	}
}


