package org.sdrc.ess.domain;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
/**
 * @author Debiprasad Parida(debiprasad@sdrc.co.in) Created on 04-08-2017 this entity
 *         will hold the otp generation module related informations
 */
@Entity
@Table(name = "registration_otp")
public class RegistrationOTP {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)	
	@Column(name = "otp_id_pk")
	private Integer otpId;
	
	@Column(name = "email_id")
	private String emailId;
	
	@Column(name="ip_address")
	private String ipAddress;
	
	@Column(name="created_dateAndTime")
	private Timestamp createdDateAndTime;
	
	@Column(name="varification_code")
	private Integer varificationCode;
	
	@Column(name="is_Active")
	private Boolean isActive;
	
	//GETTER SETTER **********************

	public Integer getOtpId() {
		return otpId;
	}

	public void setOtpId(Integer otpId) {
		this.otpId = otpId;
	}

	public String getEmailId() {
		return emailId;
	}

	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	public String getIpAddress() {
		return ipAddress;
	}

	public void setIpAddress(String ipAddress) {
		this.ipAddress = ipAddress;
	}

	public Timestamp getCreatedDateAndTime() {
		return createdDateAndTime;
	}

	public void setCreatedDateAndTime(Timestamp createdDateAndTime) {
		this.createdDateAndTime = createdDateAndTime;
	}

	public Integer getVarificationCode() {
		return varificationCode;
	}

	public void setVarificationCode(Integer varificationCode) {
		this.varificationCode = varificationCode;
	}

	public Boolean getIsActive() {
		return isActive;
	}

	public void setIsActive(Boolean isActive) {
		this.isActive = isActive;
	}
	
	

}
