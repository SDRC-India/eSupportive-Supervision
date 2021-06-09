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
 * @author Debiprasad Parida(debiprasad@sdrc.co.in) Created on 05-08-2017 this entity
 *         will hold the planning module related informations
 */
@Entity
@Table(name = "planning")
public class Planning  {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Integer planningId;

	@Column(name = "created_date")
	private Timestamp createdDate;

	@Column(name = "plan_date")
	private Timestamp planDate;

	@Column(name = "visited_date")
	private Timestamp visitedDate;

	@Column(name = "is_live")
	private Boolean isLive;
	
	@Column(name = "updated_date")
	private Timestamp updatedDate;

	@ManyToOne
	@JoinColumn(name="user_id_fk")
	private EssUser essUser;
	
	@ManyToOne
	@JoinColumn(name="facility_id_fk")
	private Area facility;
	
	@ManyToOne
	@JoinColumn(name = "checklist_id_fk")
	private TypeDetail checkListType;
	
	//GETTER SETTER **********************
	
	public Integer getPlanningId() {
		return planningId;
	}

	public void setPlanningId(Integer planningId) {
		this.planningId = planningId;
	}

	public Timestamp getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Timestamp createdDate) {
		this.createdDate = createdDate;
	}

	public Timestamp getPlanDate() {
		return planDate;
	}

	public void setPlanDate(Timestamp planDate) {
		this.planDate = planDate;
	}

	public Timestamp getVisitedDate() {
		return visitedDate;
	}

	public void setVisitedDate(Timestamp visitedDate) {
		this.visitedDate = visitedDate;
	}

	public Boolean getIsLive() {
		return isLive;
	}

	public void setIsLive(Boolean isLive) {
		this.isLive = isLive;
	}

	public Timestamp getUpdatedDate() {
		return updatedDate;
	}

	public void setUpdatedDate(Timestamp updatedDate) {
		this.updatedDate = updatedDate;
	}

	public EssUser getEssUser() {
		return essUser;
	}

	public void setEssUser(EssUser essUser) {
		this.essUser = essUser;
	}

	public Area getFacility() {
		return facility;
	}

	public void setFacility(Area facility) {
		this.facility = facility;
	}

	public TypeDetail getCheckListType() {
		return checkListType;
	}

	public void setCheckListType(TypeDetail checkListType) {
		this.checkListType = checkListType;
	}


	

	
	
	
}
