package org.sdrc.ess.util;

import java.io.IOException;
import java.io.StringWriter;
import java.util.List;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.SimpleTagSupport;

public class ModalTagHandler extends SimpleTagSupport {

	private String message;
	private List<String> modalErrorList;
	private String modalCssInfClass;
	private String id;
	private List<String> modalConflictList;
	private String modalConflictCssInfClass;
	private List<String> modalFailList;
	private List<String> modalFacilityInchargeList;

	StringWriter sw = new StringWriter();
	public void doTag() throws JspException, IOException {
		JspWriter writer = getJspContext().getOut();
		if (modalErrorList != null && !modalErrorList.isEmpty()) {
			writer.println("<div  id='" + id + "' class='" + modalCssInfClass
					+ "' role='dialog' data-backdrop='static'data-keyboard='false'>");
			writer.println("<div class='modal-dialog'>");
			writer.println("<div class='modal-content'>");
			writer.println("<div class='modal-body text-center' style='background-color: #ffffff'>");
			writer.println("<div class='successhead1'><img alt='' src='resources/images/icons/Messages_success_icon.svg' style='width: 25px; margin-top: -5px;'>");
			writer.println("SUCCESS");
			writer.println("</div>");
			writer.println(
					"<div class='successbody' ><span style='color:#333a3b;font-weight:bold;'>The registration has been submitted successfully for approval. Once approved the activation link shall be sent to the primary email ID within 15 days.</span><br>");
			writer.println("</div>");
			writer.println("<a class='btn btn-default' href='home'> Ok</a>");
			writer.println("</div>");
			writer.println("</div>");
			writer.println("</div>");
			writer.println("</div>");

		} 
		else if (modalConflictList != null && !modalConflictList.isEmpty()) {
			writer.println("<div  id='" + id + "' class='" + modalCssInfClass
					+ "' role='dialog' data-backdrop='static'data-keyboard='false'>");
			writer.println("<div class='modal-dialog'>");
			writer.println("<div class='modal-content'>");
			writer.println("<div class='modal-body text-center' style='background-color: #ffffff'>");
			writer.println("<div class='errorhead'><img alt='' src='resources/images/icons/Messages_warning_caution_icon.svg' style='width: 25px; margin-top: -5px;'>");
			writer.println("ERROR");
			writer.println("</div>");
			writer.println(
					"<div class='errorbody' ><span style='color:#333a3b;font-weight:bold;'>The registration request unsuccessful as the email/user ID already exists.</span><br>");
			writer.println("</div>");
			writer.println("<a class='btn btn-default reg-fail-modal' href='register'> Ok</a>");
			writer.println("</div>");
			writer.println("</div>");
			writer.println("</div>");
			writer.println("</div>");

		}else if (modalFailList != null && !modalFailList.isEmpty()) {
			writer.println("<div  id='" + id + "' class='" + modalCssInfClass
					+ "' role='dialog' data-backdrop='static'data-keyboard='false'>");
			writer.println("<div class='modal-dialog'>");
			writer.println("<div class='modal-content'>");
			writer.println("<div class='modal-body text-center' style='background-color: #ffffff'>");
			writer.println("<div class='errorhead'><img alt='' src='resources/images/icons/Messages_warning_caution_icon.svg' style='width: 25px; margin-top: -5px;'>");
			writer.println("ERROR");
			writer.println("</div>");
			writer.println(
					"<div class='errorbody' ><span style='color:#333a3b;font-weight:bold;'>The registration request unsuccessful. Please Try again.</span><br>");
			writer.println("</div>");
			writer.println("<a class='btn btn-default reg-fail-modal' href='register'> Ok</a>");
			writer.println("</div>");
			writer.println("</div>");
			writer.println("</div>");
			writer.println("</div>");

		}
		else if (modalFacilityInchargeList != null && !modalFacilityInchargeList.isEmpty()) {
			writer.println("<div  id='" + id + "' class='" + modalCssInfClass
					+ "' role='dialog' data-backdrop='static'data-keyboard='false'>");
			writer.println("<div class='modal-dialog'>");
			writer.println("<div class='modal-content'>");
			writer.println("<div class='modal-body text-center' style='background-color: #ffffff'>");
			writer.println("<div class='errorhead'><img alt='' src='resources/images/icons/Messages_warning_caution_icon.svg' style='width: 25px; margin-top: -5px;'>");
			writer.println("ERROR");
			writer.println("</div>");
			writer.println(
					"<div class='errorbody' ><span style='color:#333a3b;font-weight:bold;'>The registration request unsuccessful as the facility incharge of the selected facility already exists.</span><br>");
			writer.println("</div>");
			writer.println("<a class='btn btn-default reg-fail-modal' href='register'> Ok</a>");
			writer.println("</div>");
			writer.println("</div>");
			writer.println("</div>");
			writer.println("</div>");

		}else {
			getJspBody().invoke(sw);
			getJspContext().getOut().println(sw.toString());
		}
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public List<String> getModalErrorList() {
		return modalErrorList;
	}
	public void setModalErrorList(List<String> modalErrorList) {
		this.modalErrorList = modalErrorList;
	}
	public String getModalCssInfClass() {
		return modalCssInfClass;
	}
	public void setModalCssInfClass(String modalCssInfClass) {
		this.modalCssInfClass = modalCssInfClass;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public List<String> getModalConflictList() {
		return modalConflictList;
	}
	public void setModalConflictList(List<String> modalConflictList) {
		this.modalConflictList = modalConflictList;
	}
	public String getModalConflictCssInfClass() {
		return modalConflictCssInfClass;
	}
	public void setModalConflictCssInfClass(String modalConflictCssInfClass) {
		this.modalConflictCssInfClass = modalConflictCssInfClass;
	}
	public List<String> getModalFailList() {
		return modalFailList;
	}
	public void setModalFailList(List<String> modalFailList) {
		this.modalFailList = modalFailList;
	}
	public List<String> getModalFacilityInchargeList() {
		return modalFacilityInchargeList;
	}
	public void setModalFacilityInchargeList(List<String> modalFacilityInchargeList) {
		this.modalFacilityInchargeList = modalFacilityInchargeList;
	}

}
