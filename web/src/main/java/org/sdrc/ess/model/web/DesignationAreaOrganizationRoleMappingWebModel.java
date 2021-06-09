package org.sdrc.ess.model.web;

import java.util.List;

import org.sdrc.ess.model.web.designation.DesignationForDesignationModel;
import org.sdrc.ess.model.web.designation.DesignationMangementTableModel;
import org.sdrc.ess.model.web.designation.OrganizationForDesignationModel;
import org.sdrc.ess.model.web.designation.RoleModelForDesignationCountry;
import org.sdrc.ess.model.web.designation.RoleModelForDesignationState;

/**
 * 
 * @author Biswa Ranjan
 *
 */
public class DesignationAreaOrganizationRoleMappingWebModel {

	private List<RoleModelForDesignationCountry> role_country;
	private List<RoleModelForDesignationState> role_state;
	private List<OrganizationForDesignationModel> o_for_d_model;
	private List<DesignationForDesignationModel> d_for_d_model;
	private List<AreaWebModel> states;
	private boolean isStateAdmin;
	private boolean isCountryAdmin;
	private AreaWebModel area;
	private List<DesignationMangementTableModel> designationMangementTableModel;
	
	public AreaWebModel getArea() {
		return area;
	}

	public void setArea(AreaWebModel area) {
		this.area = area;
	}

	public boolean isStateAdmin() {
		return isStateAdmin;
	}

	public void setStateAdmin(boolean isStateAdmin) {
		this.isStateAdmin = isStateAdmin;
	}

	public boolean isCountryAdmin() {
		return isCountryAdmin;
	}

	public void setCountryAdmin(boolean isCountryAdmin) {
		this.isCountryAdmin = isCountryAdmin;
	}

	public List<OrganizationForDesignationModel> getO_for_d_model() {
		return o_for_d_model;
	}

	public void setO_for_d_model(List<OrganizationForDesignationModel> o_for_d_model) {
		this.o_for_d_model = o_for_d_model;
	}

	public List<DesignationForDesignationModel> getD_for_d_model() {
		return d_for_d_model;
	}

	public void setD_for_d_model(List<DesignationForDesignationModel> d_for_d_model) {
		this.d_for_d_model = d_for_d_model;
	}

	public List<AreaWebModel> getStates() {
		return states;
	}

	public void setStates(List<AreaWebModel> states) {
		this.states = states;
	}

	public List<RoleModelForDesignationCountry> getRole_country() {
		return role_country;
	}

	public void setRole_country(List<RoleModelForDesignationCountry> role_country) {
		this.role_country = role_country;
	}

	public List<RoleModelForDesignationState> getRole_state() {
		return role_state;
	}

	public void setRole_state(List<RoleModelForDesignationState> role_state) {
		this.role_state = role_state;
	}

	public List<DesignationMangementTableModel> getDesignationMangementTableModel() {
		return designationMangementTableModel;
	}

	public void setDesignationMangementTableModel(
			List<DesignationMangementTableModel> designationMangementTableModel) {
		this.designationMangementTableModel = designationMangementTableModel;
	}
	

}
