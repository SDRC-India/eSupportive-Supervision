package org.sdrc.ess.util;

/**
 * 
 * @since 1.0.0
 * @author Ratikanta Pradhan (ratikanta@sdrc.co.in) on 24-Apr-2017 6:59:07 pm
 */
public class Constants {

	public static final class Mobile {
		public static final String INVALID_DATA_FROM_MOBILE = "invalid.data.from.mobile";
		public static final String INVALID_CREDENTIALS = "invalid.credentials";
		public static final String INVALID_USER_AREA_MAPPING = "invalid.user.area.mapping";
		public static final String ERROR_PARSING_AREAMAPPING = "error.user.areamapping";
		public static final String ERROR_UNAUTHORIZED_ACCESS = "error.unauthorized.access";
		public static final String ERROR_SERVER_ERROR = "error.server";
		public static final String ERROR_USER_NOT_APPROVED = "error.user.not.approved";
		public static final String ERROR_USER_INACTIVE = "error.user.inactive";
		public static final String ERROR_USER_INVALID = "error.user.invalid";
		public static final String ERROR_USER_REJECTED = "error.user.rejected";
		public static final String DATA_ENTRY_NOT_ALLOWED = "error.data.entry.not.allowed";
		public static final String INVALID_VERSION_NAME = "invalid.version.name";

		// submission file detail in e-mail while sync
		public static final String EXCEL_SHEET_NAME = "excel.sheet.name";
		public static final String EXCEL_FACILITY_CHECKLIST_TEMPLATE_PATH = "excel.facility.checklist.template.path";
		public static final String EXCEL_FACILITY_CHECKLIST_OLD_TEMPLATE_PATH = "excel.facility.checklist.old.template.path";
		public static final String EXCEL_COMMUNITY_CHECKLIST_TEMPLATE_PATH = "excel.community.checklist.template.path";
		public static final String EXCEL_CHECKLIST_GENERATE_PATH = "excel.checklist.generate.path";
		public static final String EXCEL_FACILITY_CHECKLIST_NAME = "excel.facility.checklist.name";
		public static final String EXCEL_COMMUNITY_CHECKLIST_NAME = "excel.community.checklist.name";
		public static final String EXCEL_CHECKLIST_EXTENSION = "excel.checklist.extension";

		// post sync submission mail message
		public static final String SUBMISSION_MESSAGE_SUBJECT = "submission.message.subject";
		public static final String SUBMISSION_MESSAGE_FROM_NAME = "submission.message.from.name";
		public static final String FORM_TYPE_FACILITY_CHECKLIST = "form.facilityChecklist";
		public static final String FORM_TYPE_COMMUNITY_CHECKLIST = "form.communityChecklist";
		public static final String ROLE_CODE_DISTRICT = "role.code.district";
		public static final String ROLE_CODE_FACILITY = "role.code.facility";
		public static final String ROLE_CODE_BLOCK = "role.code.block";
		public static final String ROLE_CODE_STATE = "role.code.state";

		// forgot password submission mail message
		public static final String ERROR_RESETPASSWORD_UNAUTHORIZED = "error.resetpassword.unauthorized";
		public static final String ERROR_RESETPASSWORD_LINK_EXPIRED = "error.resetpassword.linkexpired";
		public static final String SUCCESS_RESETPASSWORD = "success.resetpassword";

		// plan of action
		public static final String PLAN_OF_ACTION = "plan.of.action";
		public static final String PLAN_OF_ACTION_Q1 = "plan.of.action.q1";
		public static final String PLAN_OF_ACTION_Q2 = "plan.of.action.q2";
		public static final String PLAN_OF_ACTION_Q3 = "plan.of.action.q3";
		public static final String PLAN_OF_ACTION_Q4 = "plan.of.action.q4";
		public static final String PLAN_OF_ACTION_Q5 = "plan.of.action.q5";
		public static final String PLAN_OF_ACTION_Q6 = "plan.of.action.q6";
	}

	// e-mail related configuration from notification.properties
	public static final String SMTP_HOST_KEY = "smtp.host.key";
	public static final String SOCKETFACTORY_PORT_KEY = "socketFactory.port.key";
	public static final String SOCKETFACTORY_CLASS_KEY = "socketFactory.class.key";
	public static final String SMTP_AUTH_KEY = "smtp.auth.key";
	public static final String SMTP_PORT_KEY = "smtp.port.key";

	public static final String SMTP_HOST = "smtp.host";
	public static final String SOCKETFACTORY_PORT = "socketFactory.port";
	public static final String SOCKETFACTORY_CLASS = "socketFactory.class";
	public static final String SMTP_AUTH = "smtp.auth";
	public static final String SMTP_PORT = "smtp.port";
	public static final String AUTHENTICATION_USERID = "authentication.userid";
	public static final String AUTHENTICATION_PASSWORD = "authentication.password";
	public static final String MESSAGE_SETFORM = "message.setFrom";

	public static final class Web {

		/*
		 * String maildesclemer =
		 * "This e-mail contains PRIVILEGED AND CONFIDENTIAL INFORMATION intended solely "
		 * +
		 * "for the use of the addressee(s). If you are not the intended recipient, please notify the "
		 * +
		 * "sender by e-mail and delete the original message. Further, you are not "
		 * +
		 * "to copy, disclose, or distribute this e-mail or its contents to any other person and "
		 * +
		 * "any such actions are unlawful. This e-mail may contain viruses. eSS has taken "
		 * +
		 * "very reasonable precaution to minimize this risk, but is not liable for any damage "
		 * +
		 * "you may sustain as a result of any virus in this e-mail. You should carry out your "
		 * +
		 * "own virus checks before opening the e-mail or attachment. eSS reserves the "
		 * +
		 * "right to monitor and review the content of all messages sent to or from this e-mail "
		 * +
		 * "address. Messages sent to or from this e-mail address may be stored on the eSS e-mail system"
		 * ;
		 */

		public static final String INVALID_USERNAME_PASSWORD = "invalid.username.password";
		public static final String USER_PRINCIPAL = "UserPrincipal";
		public static final String SUCCESS_LOGGED_OUT = "success.logged.out";
		public static final String PHOTO_UPLOAD_PATH = "user.photo.upload.path";
		public static final String AADHAAR_UPLOAD_PATH = "user.aadhaar.upload.path";
		public static final String PANCARD_UPLOAD_PATH = "user.pancard.upload.path";

		public static final String ACCESS_DENIED = "accessDenied";
		public static final String STATE_AREA_LEVEL = "state.area.level";
		public static final String COUNTY_LEVEL_ROLE_IDS = "country.level.role.ids";
		public static final String STATE_LEVEL_ROLE_IDS = "state.level.role.ids";
		public static final String EMAIL_DISCLAIRER = "email.disclaimer";
		public static final String DESIGNATION_SUCCESS = "Designation added successfully";
		public static final String DESIGNATION_UPDATE = "Designation updated successfully";
		public static final String DESIGNATION_EXITS = "Designation already exists!";
		public static final String YES_VALUE = "Yes";
		public static final String NO_VALUE = "No";
		public static final String TRUE_VALUE = "True";
		public static final String FALSE_VALUE = "False";
		public static final String TRY_AGAIN = "Try again";
		public static final String GENERATE_OTP_MAX_DIGIT = "generate.otp.max.digit";
		public static final String GENERATE_OTP_MIN_DIGIT = "generate.otp.min.digit";

		/**
		 * @author Sourav keshari nath
		 */
		public static final String NEWS_UPDATES_SUCCESS = "News And Updates added successfully";
		public static final String NEWS_UPDATES_DELETE = "News And Updates deleted successfully";
		public static final String NEWS_UPDATES_SUCCESS_EDIT = "News And Updates updated successfully";
		/**
		 * end
		 */
		public static final String SALUTATION_TYPE_ID = "salutation.type.id";
		public static final String GENDER_TYPE_ID = "gender.type.id";
		public static final String FACILITYTYPE_TYPE_ID = "facilitytype.type.id";
		public static final String FACILITYTYPEFORAREA_TYPE_ID = "facilitytypeforarea.type.id";
		public static final String DEVELOPMENTPARTNERS_TYPE_ID = "development.partners.type.id";
		public static final String USER_MANUAL_PATH = "userManual.download.path";

		/**
		 * @author Sourav keshari nath
		 */
		public static final String IMAGE_GALLERY_SUCCESS = "Image added successfully";
		public static final String IMAGE_GALLERY_DELETE = "Image deleted successfully";
		public static final String IMAGE_GALLERY__SUCCESS_EDIT = "Image updated successfully";

		public static final String VIDEO_GALLERY_SUCCESS = "Video added successfully";
		public static final String VIDEO_GALLERY_DELETE = "Video deleted successfully";
		public static final String VIDEO_GALLERY__SUCCESS_EDIT = "Video updated successfully";
		/**
		 * end
		 */
		public static final String IMAGE_GALLERY_UPLOAD_PATH = "image.gallery.path";

		/**
		 * The following variable will keep the log file directory
		 * 
		 * @author Ratikanta pradhan (ratikanta@sdrc.co.in)
		 */
		public static final String LOG_PATH = "log.path";

		/**
		 * The following variable will keep the log archived folder name
		 * 
		 * @author Ratikanta pradhan (ratikanta@sdrc.co.in)
		 */
		public static final String LOG_ARCHIVED_FOLDER_NAME = "log.archived.folder.name";

		/**
		 * The following variable will keep the log file name
		 * 
		 * @author Ratikanta pradhan (ratikanta@sdrc.co.in)
		 */
		public static final String LOG_FILE_NAME = "log.file.name";

		public static final String FORGOT_PASS_EMAIL_ID = "email.id.forgot.pass";
		public static final String FORGOT_PASS_EMAIL_PASS = "email.pass.forgot.pass";
		public static final String FACILITY_CHECKLIST_NAME = "facility.checklist.name";
		public static final String COMMUNITY_CHECKLIST_NAME = "community.checklist.name";
		public static final String CHECKLIST_TYPE_ID = "checklist.type.id";
		public static final String OPERATOR_TYPE_ID = "operator.type.id";
		/**
		 * @author Sarita Panigrahi
		 */
		public static final String LOGIN_META_ID = "loginMetaId";

		/**
		 * @author Naseem Akhtar (naseem@sdrc.co.in) on 3rd October 2017 0004
		 *         hrs
		 */
		public static final String DISTRICT_CODE = "R-1004";
		public static final String BLOCK_CODE = "R-1005";
		public static final String PLAN_OF_ACTION_STATUS_OPEN = "type.details.status.open.id";
		public static final String PLAN_OF_ACTION_STATUS_CLOSED = "type.details.status.closed.id";
		public static final String OPEN_ITEMS_FEAT_PERM_ID = "open.items.feature.permission.id";

		/**
		 * @author Debiprasad Parida (debiprasad@sdrc.co.in) on 4th October 2017
		 * 
		 */

		public static final String MONTHLY_PERIODICITY = "timeperiod.monthly.periodicity";
		public static final String QUARTERLY_PERIODICITY = "timeperiod.quarterly.periodicity";

		/**
		 * @author Harsh Pratyush (harsh@sdrc.co.in) on 14-10-2017
		 */
		
		public static final String COUNTRY_LEVEL_ROLE_ID = "country.level.id.role";

		public static final String STATE_LEVEL_ROLE_ID = "state.level.id.role";

		public static final String DIVISION_LEVEL_ROLE_ID = "division.level.id.role";

		public static final String DISTRICT_LEVEL_ROLE_ID = "district.level.id.role";

		public static final String BLOCK_LEVEL_ROLE_ID = "block.level.id.role";

		public static final String ADMIN_LEVEL_ROLE_ID = "admin.level.id.role";

		public static final String OTHER_LEVEL_ROLE_ID = "other.level.id.role";

		public static final String FACILITY_LEVEL_ROLE_ID = "facility.level.id.role";
		
		
		
		
		
		public static final String TOP_LINE_INDICATOR="top.line.indicator";
		
		// u5mr
		
		public static final String U5MR_DESCRIPANCY_STATES_ID ="u5mr.discripancy.states.id";
		
		
/// line chart
		public static final String	FEMALES_WITH_PPIUCD_INSERTED_AT_FACILITIES ="females.with.PPIUCD.inserted.at.facilities"; 

		public static final String FACILITIES_WHERE_PPIUCD_FORCEPS_ARE_AVAILABLE="facilities.where.PPIUCD.forceps.are.available";

		public static final String MATERNAL_DEATH_INDICATOR_ID="maternal.death.indicator.id";

		public static final String FACILITIES_WHERE_PARTOGRAPH_IS_USED_TO_MONITOR_PROGRESS_OF_LABOUR="facilities.where.partograph.is.used.to.monitor.progress.of.labour";

		public static final String CHILDREN_UNDER_5_YEARS_ADMITTED_WITH_DIARRHOEA="children.under.5.years.admitted.with.diarrhoea";

		public static final String VHND_SESSIONS_THAT_WERE_ATTENDED_BY_75_OF_THE_BENEFICIARIES_AS_PER_DUE_LIST="VHND.sessions.that.were.attended.by.75%.of.the.beneficiaries.as.per.due.list";

		public static final String ANMS_REPORTING_COMMUNITIES_WHERE_MATERNAL_CHILD_DEATHS_ARE_REPORTED_FROM_THE_AREA_OF_SUB_CENTER_IN_LAST_1_YEAR="ANMs.reporting.communities.where.maternal.child.deaths.are.reported.from.the.area.of.sub.center.in.last.1.year";

		public static final String LINE_CHART_PERCENT_IDS="line.chart.percent.ids";

		public static final String LINE_CHART_NUMBER_IDS="line.chart.number.ids";


		// bar chart
		public static final String NCH_BAR_CHART="nch.bar.chart";


		public static final String HSS_BAR_CHART="hss.bar.chart";
		
		public static final String CD_NCD_BAR_CHART_ID="cd.ncd.bar.chart";
		

		
		
		public static final String JOBSTATUS_DAILY_JOBTYPE = "jobstatus.daily.jobType";
		public static final String JOBSTATUS_PLANNINGREPORT_JOBNAME = "jobstatus.planningReport.jobName";
		public static final String JOBSTATUS_STATUS_SUCCESS = "jobstatus.status.success";
		public static final String JOBSTATUS_STATUS_FAIL = "jobstatus.status.fail";
		public static final String WEB_DOMAIN_NAME = "domain.name";
		
		public static final String FACILITY_TYPE_ID_DH= "facility.type.id.dh";
		
		
		
	

	}
	//dashboard CSS constants
	public static class Slices{
		public static String FIRST_SLICE = "firstslices";
		public static String SECOND_SLICE = "secondslices";
		public static String THIRD_SLICE = "thirdslices";
		public static String FOUTRH_SLICE = "fourthslices";
		public static final String FIFTHSLICES = "fifthslices";
		public static final String SIXTH_SLICES = "sixthslices";
	}
}
