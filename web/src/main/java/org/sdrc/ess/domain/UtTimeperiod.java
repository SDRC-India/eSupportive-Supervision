package org.sdrc.ess.domain;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;


/**
 * @author Harsh Pratyush(harsh@sdrc.co.in)
 * The persistent class for the ut_timeperiod database table.
 * 
 */
@Entity
@Table(name="ut_timeperiod")
public class UtTimeperiod implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int timePeriod_NId;

	@Temporal(TemporalType.TIMESTAMP)
	private Date endDate;

	@JoinColumn(name="periodicity")
	@ManyToOne
	private Preodicity periodicity;

	@Temporal(TemporalType.TIMESTAMP)
	private Date startDate;

	private String timePeriod;


	public int getTimePeriod_NId() {
		return this.timePeriod_NId;
	}

	public void setTimePeriod_NId(int timePeriod_NId) {
		this.timePeriod_NId = timePeriod_NId;
	}

	public Date getEndDate() {
		return this.endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	

	public Date getStartDate() {
		return this.startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public String getTimePeriod() {
		return this.timePeriod;
	}

	public void setTimePeriod(String timePeriod) {
		this.timePeriod = timePeriod;
	}

	public Preodicity getPeriodicity() {
		return periodicity;
	}

	public void setPeriodicity(Preodicity periodicity) {
		this.periodicity = periodicity;
	}

}