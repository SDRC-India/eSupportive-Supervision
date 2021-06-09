package org.sdrc.ess.model.mobile;

/**
 * This model class will help to bring data from mobile
 * @author Ratikanta Pradhan (ratikanta@sdrc.co.in) on 14-May-2017 9:26:01 am
 */
public class SubmitModel {

	private String state;
	private String nameOfSupervisor;
	private String designationOfSupervisor;
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public String getNameOfSupervisor() {
		return nameOfSupervisor;
	}
	public void setNameOfSupervisor(String nameOfSupervisor) {
		this.nameOfSupervisor = nameOfSupervisor;
	}
	public String getDesignationOfSupervisor() {
		return designationOfSupervisor;
	}
	public void setDesignationOfSupervisor(String designationOfSupervisor) {
		this.designationOfSupervisor = designationOfSupervisor;
	}
	
	
}
