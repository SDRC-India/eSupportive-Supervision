package org.sdrc.ess.domain;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * @author Naseem Akhtar, created on: 21st August 2017 This domain class will
 *         hold the meta informations like activation code while user send
 *         requests for forgot password.
 */
@Entity
@Table(name = "user_credentials_meta_data")
public class UserCredentialsMetaData {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "user_credentials_meta_data_pk_id")
	private Long id;

	@Column(name = "ip_address")
	private String ipAddress;

	@Column(name = "created_date")
	private Timestamp createdDate;

	@Column(name = "activation_code", unique = true)
	private String activationCode;

	@Column(name = "is_active")
	private Boolean isActive;

	@ManyToOne
	@JoinColumn(name = "user_id_fk")
	private EssUser essUser;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getIpAddress() {
		return ipAddress;
	}

	public void setIpAddress(String ipAddress) {
		this.ipAddress = ipAddress;
	}

	public Timestamp getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Timestamp createdDate) {
		this.createdDate = createdDate;
	}

	public String getActivationCode() {
		return activationCode;
	}

	public void setActivationCode(String activationCode) {
		this.activationCode = activationCode;
	}

	public Boolean getIsActive() {
		return isActive;
	}

	public void setIsActive(Boolean isActive) {
		this.isActive = isActive;
	}

	public EssUser getEssUser() {
		return essUser;
	}

	public void setEssUser(EssUser essUser) {
		this.essUser = essUser;
	}

}
