package org.sdrc.ess.domain;

import java.sql.Timestamp;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 * This domain class will let us keep Facility level data in database
 * 
 * @author Ratikanta Pradhan (ratikanta@sdrc.co.in) on 14-May-2017 10:09:02 am
 * @author Naseem Akhtar (naseem@sdrc.co.in) on 4th August 2017 16:46
 * @since 1.0.0
 */
@Entity
@Table(name = "type_detail")
public class TypeDetail {

	@Id
	@Column(name = "id_pk")
	private Integer id;

	private String name;

	@ManyToOne
	@JoinColumn(name = "type_id_fk", nullable = false)
	private Type typeId;

	@Column(name = "created_date")
	private Timestamp createdDate;

	@Column(name = "updated_date")
	private Timestamp updatedDate;

	@Column(name = "order_level")
	private Integer orderLevel;

	@OneToMany(mappedBy = "salutation")
	private List<EssUser> essUsers1;

	@OneToMany(mappedBy = "gender")
	private List<EssUser> essUsers2;

	@OneToMany(mappedBy = "develomentpartner")
	private List<EssUser> essUsers3;

	@OneToMany(mappedBy = "facilityType")
	private List<Area> areas;

	@OneToMany(mappedBy = "levelOfIntervention")
	private List<PlanOfAction> levelOfIntervention;

	@OneToMany(mappedBy = "sectionType")
	private List<PlanOfAction> sectionType;
	
	@OneToMany(mappedBy = "formType")
	private List<PlanOfAction> formType;
	
	@OneToMany(mappedBy = "facilityType")
	private List<CommunityData> facilityType;
	
	@OneToMany(mappedBy = "checkListType")
	private List<Planning> checkListType;
	
	@OneToMany(mappedBy = "c43")
	private List<FacilityData> c43;

	public TypeDetail() {

	}

	public TypeDetail(Integer salutationId) {
		this.id = salutationId;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Type getTypeId() {
		return typeId;
	}

	public void setTypeId(Type typeId) {
		this.typeId = typeId;
	}

	public Timestamp getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Timestamp createdDate) {
		this.createdDate = createdDate;
	}

	public Timestamp getUpdatedDate() {
		return updatedDate;
	}

	public void setUpdatedDate(Timestamp updatedDate) {
		this.updatedDate = updatedDate;
	}

	public Integer getOrderLevel() {
		return orderLevel;
	}

	public void setOrderLevel(Integer orderLevel) {
		this.orderLevel = orderLevel;
	}

}
