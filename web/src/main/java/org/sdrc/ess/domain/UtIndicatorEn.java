package org.sdrc.ess.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;


/**
 * @author Harsh Pratyush (harsh@sdrc.co.in)
 * The persistent class for the ut_indicator_en database table.
 * 
 */
@Entity
@Table(name="ut_indicator_en")
public class UtIndicatorEn implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int indicator_NId;

	private byte highIsGood;

	@Column(length=65536)
	private String indicator_Info;

	private String indicator_Name;

	private Integer indicator_Order;

	private String short_Name;
	
	@Column(name="indicator_type")
	private String indicatorType;
	
	
	@Column(name="deno_or_max_score")
	private String denominatorOrMaxScore;
	
	@Column(name="column_name")
	private String columnName;


	public int getIndicator_NId() {
		return this.indicator_NId;
	}

	public void setIndicator_NId(int indicator_NId) {
		this.indicator_NId = indicator_NId;
	}



	public byte getHighIsGood() {
		return this.highIsGood;
	}

	public void setHighIsGood(byte highIsGood) {
		this.highIsGood = highIsGood;
	}

	
	public String getIndicator_Info() {
		return this.indicator_Info;
	}

	public void setIndicator_Info(String indicator_Info) {
		this.indicator_Info = indicator_Info;
	}

	public String getIndicator_Name() {
		return this.indicator_Name;
	}

	public void setIndicator_Name(String indicator_Name) {
		this.indicator_Name = indicator_Name;
	}

	public Integer getIndicator_Order() {
		return this.indicator_Order;
	}

	public void setIndicator_Order(Integer indicator_Order) {
		this.indicator_Order = indicator_Order;
	}


	public String getShort_Name() {
		return this.short_Name;
	}

	public void setShort_Name(String short_Name) {
		this.short_Name = short_Name;
	}

	public String getIndicatorType() {
		return indicatorType;
	}

	public void setIndicatorType(String indicatorType) {
		this.indicatorType = indicatorType;
	}

	public String getColumnName() {
		return columnName;
	}

	public void setColumnName(String columnName) {
		this.columnName = columnName;
	}

	public String getDenominatorOrMaxScore() {
		return denominatorOrMaxScore;
	}

	public void setDenominatorOrMaxScore(String denominatorOrMaxScore) {
		this.denominatorOrMaxScore = denominatorOrMaxScore;
	}

	

	
	
	
}