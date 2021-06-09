package org.sdrc.ess.model.web;

/**
 * @author Sourav Nath (souravnath@sdrc.co.in)
 *
 */

public class NewsUpdatesModel {
	private int newsUpdatesId;

	private String newsTitle;

	private String newsLinks;
	
	private String newsDescription;

	private String createdDate;

	private String createdBy;

	private Boolean isLive;

	public int getNewsUpdatesId() {
		return newsUpdatesId;
	}

	public void setNewsUpdatesId(int newsUpdatesId) {
		this.newsUpdatesId = newsUpdatesId;
	}

	public String getNewsTitle() {
		return newsTitle;
	}

	public void setNewsTitle(String newsTitle) {
		this.newsTitle = newsTitle;
	}

	public String getNewsLinks() {
		return newsLinks;
	}

	public void setNewsLinks(String newsLinks) {
		this.newsLinks = newsLinks;
	}

	public String getNewsDescription() {
		return newsDescription;
	}

	public void setNewsDescription(String newsDescription) {
		this.newsDescription = newsDescription;
	}

	public String getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(String createdDate) {
		this.createdDate = createdDate;
	}

	public String getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public Boolean getIsLive() {
		return isLive;
	}

	public void setIsLive(Boolean isLive) {
		this.isLive = isLive;
	}
	
	
}
