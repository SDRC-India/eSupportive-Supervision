package org.sdrc.ess.model.mobile;

import java.util.List;

public class PrefetchResult {

	private List<PlanOfActionModel> prefetchData;
	private Boolean hasError;
	private String errorMessage;
	private Integer errorCode;

	public List<PlanOfActionModel> getPrefetchData() {
		return prefetchData;
	}

	public void setPrefetchData(List<PlanOfActionModel> prefetchData) {
		this.prefetchData = prefetchData;
	}

	public Integer getErrorCode() {
		return errorCode;
	}

	public void setErrorCode(Integer errorCode) {
		this.errorCode = errorCode;
	}

	public Boolean getHasError() {
		return hasError;
	}

	public void setHasError(Boolean hasError) {
		this.hasError = hasError;
	}

	public String getErrorMessage() {
		return errorMessage;
	}

	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}

}
