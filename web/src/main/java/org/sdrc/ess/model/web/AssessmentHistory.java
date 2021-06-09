/**
 * 
 */
package org.sdrc.ess.model.web;

/**
*
* @author Debiprasad Parida (debiprasad@sdrc.co.in) on 06-08-2017 02:20 am
*
*/
public class AssessmentHistory {
	
	private int planningId;

	private String plannedDate;
	
	private String visitedDate;
			
	private int userId;
	
	private int checklistId;
	
	private String userName;

	public int getPlanningId() {
		return planningId;
	}

	public void setPlanningId(int planningId) {
		this.planningId = planningId;
	}

	public String getPlannedDate() {
		return plannedDate;
	}

	public void setPlannedDate(String plannedDate) {
		this.plannedDate = plannedDate;
	}

	public String getVisitedDate() {
		return visitedDate;
	}

	public void setVisitedDate(String visitedDate) {
		this.visitedDate = visitedDate;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}
	public int getChecklistId() {
		return checklistId;
	}

	public void setChecklistId(int checklistId) {
		this.checklistId = checklistId;
	}
	
		
}
