package org.sdrc.ess.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "raw_data_question_getter_mapping")
public class RawDataQuestionGetterMapping {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Integer rawDataQuestionGetterMappingId;

	@Column(name = "question_name")
	private String questionName;

	@Column(name = "getter_name")
	private String getterName;

	@Column(name = "type")
	private String type;

	@Column(name = "from_table_name")
	private String fromTableName;

	@Column(name = "col_name_of_other_table")
	private String colNameOfOtherTable;

	public Integer getRawDataQuestionGetterMappingId() {
		return rawDataQuestionGetterMappingId;
	}

	public void setRawDataQuestionGetterMappingId(Integer rawDataQuestionGetterMappingId) {
		this.rawDataQuestionGetterMappingId = rawDataQuestionGetterMappingId;
	}

	public String getQuestionName() {
		return questionName;
	}

	public void setQuestionName(String questionName) {
		this.questionName = questionName;
	}

	public String getGetterName() {
		return getterName;
	}

	public void setGetterName(String getterName) {
		this.getterName = getterName;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getFromTableName() {
		return fromTableName;
	}

	public void setFromTableName(String fromTableName) {
		this.fromTableName = fromTableName;
	}

	public String getColNameOfOtherTable() {
		return colNameOfOtherTable;
	}

	public void setColNameOfOtherTable(String colNameOfOtherTable) {
		this.colNameOfOtherTable = colNameOfOtherTable;
	}

}
