package org.sdrc.ess.domain;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * The persistent class for the ut_ic_ius database table.
 * 
 * @author Harsh Pratyush(harsh@sdrc.co.in)
 */
@Entity
@Table(name = "ut_ic_ius")
public class UtIcIus implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int IC_IUSNId;

	private String IC_IUS_Label;

	private double IC_IUS_Order;

	@JoinColumn(name="IC_NId")
	@ManyToOne
	private UtIndicatorClassificationsEn IC_NId;

	@JoinColumn(name="IUSNId")
	@ManyToOne
	private UtIndicatorUnitSubgroup IUSNId;

	public UtIcIus() {
	}

	public int getIC_IUSNId() {
		return this.IC_IUSNId;
	}

	public void setIC_IUSNId(int IC_IUSNId) {
		this.IC_IUSNId = IC_IUSNId;
	}

	public String getIC_IUS_Label() {
		return this.IC_IUS_Label;
	}

	public void setIC_IUS_Label(String IC_IUS_Label) {
		this.IC_IUS_Label = IC_IUS_Label;
	}

	public double getIC_IUS_Order() {
		return this.IC_IUS_Order;
	}

	public void setIC_IUS_Order(double IC_IUS_Order) {
		this.IC_IUS_Order = IC_IUS_Order;
	}

	public UtIndicatorClassificationsEn getIC_NId() {
		return this.IC_NId;
	}

	public void setIC_NId(UtIndicatorClassificationsEn IC_NId) {
		this.IC_NId = IC_NId;
	}

	public UtIndicatorUnitSubgroup getIUSNId() {
		return this.IUSNId;
	}

	public void setIUSNId(UtIndicatorUnitSubgroup IUSNId) {
		this.IUSNId = IUSNId;
	}

}