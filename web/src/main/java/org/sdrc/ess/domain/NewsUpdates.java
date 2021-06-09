package org.sdrc.ess.domain;

import java.io.Serializable;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

	/**
	 * @author Sourav Nath (souravnath@sdrc.co.in)
	 *
	 */
	@Entity
	@Table(name="News_Updates")
	public class NewsUpdates implements Serializable {

		private static final long serialVersionUID = 1L;

		@Id
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		private int newsUpdatesId;

		@Column(name = "News_Title")
		private String title;
		
		@Column(name = "News_Links")
		private String newsLinks;
		
		@Column(name = "created_date")
		private Timestamp createdDate;
		
		@Column(name = "updated_date")
		private Timestamp updatedDate;

		@Column(name = "is_live")
		private Boolean isLive;

		public String getTitle() {
			return title;
		}

		public void setTitle(String title) {
			this.title = title;
		}

		public String getNewsLinks() {
			return newsLinks;
		}

		public void setNewsLinks(String newsLinks) {
			this.newsLinks = newsLinks;
		}

		public Timestamp getCreatedDate() {
			return createdDate;
		}

		public void setCreatedDate(Timestamp createdDate) {
			this.createdDate = createdDate;
		}

		public int getNewsUpdatesId() {
			return newsUpdatesId;
		}

		public void setNewsUpdatesId(int newsUpdatesId) {
			this.newsUpdatesId = newsUpdatesId;
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
		
    }
