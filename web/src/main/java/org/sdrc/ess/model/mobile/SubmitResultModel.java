package org.sdrc.ess.model.mobile;
/**
 * This model class will take the result json of submit module to mobile device
 * @author Ratikanta Pradhan (ratikanta@sdrc.co.in) on 14-May-2017 9:24:27 am
 */
public class SubmitResultModel {
	private int error;
	private String errorMessage;
	public int getError() {
		return error;
	}
	public void setError(int error) {
		this.error = error;
	}
	public String getErrorMessage() {
		return errorMessage;
	}
	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}
	
}
