package org.sdrc.ess.model.web;

import java.util.List;

/**
 * @author Sarita Panigrahi created on 21-07-2017 This model class will be used
 *         across the project wherever error/exception occurs
 *
 */
public class ErrorClass {

	private String valid;
	private String errorMessage;
	private String errors;
	private List<String> errorData;
	private String errorType;
	private Integer otp;
	private Integer statusCode;

	public String getValid() {
		return valid;
	}

	public void setValid(String valid) {
		this.valid = valid;
	}

	public String getErrorMessage() {
		return errorMessage;
	}

	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}

	public String getErrors() {
		return errors;
	}

	public void setErrors(String errors) {
		this.errors = errors;
	}

	public List<String> getErrorData() {
		return errorData;
	}

	public void setErrorData(List<String> errorData) {
		this.errorData = errorData;
	}

	public String getErrorType() {
		return errorType;
	}

	public void setErrorType(String errorType) {
		this.errorType = errorType;
	}

	public Integer getOtp() {
		return otp;
	}

	public void setOtp(Integer otp) {
		this.otp = otp;
	}

	public Integer getStatusCode() {
		return statusCode;
	}

	public void setStatusCode(Integer statusCode) {
		this.statusCode = statusCode;
	}

}
