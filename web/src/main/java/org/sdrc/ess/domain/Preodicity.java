/**
 * 
 */
package org.sdrc.ess.domain;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

/**
 * @author Harsh Pratyush (harsh@sdrc.co.in)
 *
 */

@Entity
public class Preodicity {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int preodicityId;
	
	private String preodicityName;
	
	@OneToMany(mappedBy="periodicity")
	List<UtTimeperiod> utTimeperiod;

	public int getPreodicityId() {
		return preodicityId;
	}

	public void setPreodicityId(int preodicityId) {
		this.preodicityId = preodicityId;
	}

	public String getPreodicityName() {
		return preodicityName;
	}

	public void setPreodicityName(String preodicityName) {
		this.preodicityName = preodicityName;
	}

	public List<UtTimeperiod> getUtTimeperiod() {
		return utTimeperiod;
	}

	public void setUtTimeperiod(List<UtTimeperiod> utTimeperiod) {
		this.utTimeperiod = utTimeperiod;
	}
	
	
	
	
}
