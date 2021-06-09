package org.sdrc.ess.service;

import java.io.File;

public interface ConfigurationService {

	public boolean configureIndicatorsUnitSubgroups();


	File generateRawDataExcel(int checkListTypeId);
	
	
}
