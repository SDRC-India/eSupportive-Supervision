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
 * @author Debiprasad Parida(debiprasad@sdrc.co.in) Created on 09-10-2017 
 */

@Entity
@Table(name = "unplanned")

public class Unplanned{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Integer unplanningId;

	@Column(name = "created_date")
	private Timestamp createdDate;

	@Column(name = "visited_date")
	private Timestamp visitedDate;

	@ManyToOne
	@JoinColumn(name="user_id_fk")
	private EssUser essUser;
	
	@ManyToOne
	@JoinColumn(name="facility_id_fk")
	private Area facility;
	
	@ManyToOne
	@JoinColumn(name = "checklist_id_fk")
	private TypeDetail checkListType;
	
	

	

	public Integer getUnplanningId() {
		return unplanningId;
	}


	public void setUnplanningId(Integer unplanningId) {
		this.unplanningId = unplanningId;
	}


	public Timestamp getCreatedDate() {
		return createdDate;
	}


	public void setCreatedDate(Timestamp createdDate) {
		this.createdDate = createdDate;
	}


	public Timestamp getVisitedDate() {
		return visitedDate;
	}


	public void setVisitedDate(Timestamp visitedDate) {
		this.visitedDate = visitedDate;
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
