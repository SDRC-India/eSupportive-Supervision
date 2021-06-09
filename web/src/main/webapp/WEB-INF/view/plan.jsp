<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%-- <%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%> --%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://www.springframework.org/tags/form"
	prefix="springForm"%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Plan</title>
<link rel="icon" href="resources/images/icon.png" type="image/png"
	sizes="16x16">
<meta content="width=device-width, initial-scale=1.0" name="viewport">
<!-- <link rel="stylesheet" href="resources/css/bootstrap.min.css"> -->
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<link rel="stylesheet" href="resources/css/customLoader.css">
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<link rel="stylesheet" href="resources/css/bootstrap-select.min.css">
<link rel="stylesheet" href="resources/css/styles.css">
<link rel="stylesheet" href="resources/css/jquery-ui.min.js">
<link rel="stylesheet" href="resources/css/jquery-ui.css">
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="resources/js/jquery-ui.js"></script>
<script
	src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>

</head>

</head>
<body ng-app="planApp" ng-controller="planController" ng-cloak
	ng-class="selectedFacility?'datepickeropen':''" class="plan-calender">
	
<style type="text/css">
.modal-open {
	overflow: visible;
}
.plan-calender.datepickeropen>div#ui-datepicker-div[style] {
	height: 170px;
	width: 224px;
	margin-left: 0px !important;
	margin-top: 0px !important;
	margin-bottom: 3px !important;
	display: block !important;
}
.plan-calender div#ui-datepicker-div {
	width: 230px !important;
	height: 177px !important;
	/* z-index: 5555 !important; */
}
#calender {
	display: block;
}
.plan-calender .ui-datepicker table {
	font-size: .65em !important;
}
.plan-calender .ui-datepicker .ui-datepicker-header {
	padding: 0 0;
}
.plan-calender .ui-datepicker .ui-datepicker-prev,.ui-datepicker .ui-datepicker-next {
	display: none !important;
}
@media (max-width: 360px){
.state-dropdown, .open ul.dropdown-menu {
    left: auto !important;
}
}
@media ( max-width : 485px) and  ( max-height : 400px) {
.open ul.dropdown-menu, .state-dropdown {
     min-width: auto !important;
}
.planned-act-data {
	    margin-left: 22px !important;
}
}
@media (max-width: 656px) and (max-height: 360px) {
.open ul.dropdown-menu, .state-dropdown {
     left: auto !important; 
     min-width: 200px !important;
}
}
</style>

	<jsp:include page="fragments/header.jsp"></jsp:include>

	<div class="pageNameContainer">
		<h4>{{pageName}}</h4>
	</div>
	<div id="mymain" class="container">
		<div class="row plan-chklist">
			<div class="col-md-12 col-sm-12 col-xs-12 text-center">
				<div class="plan-label">Checklist Type</div>
				<div class="select-checklist text-center">
					<div class="input-group">
						<input type="text" placeholder="Select CheckList" id="chklist"
							class="form-control not-visible-input inputBackground"
							name="chklist" readonly="" ng-model="selectedCheckList.value">
						<div class="input-group-btn" style="position: relative;">
							<button type="button"
								class="btn btn-danger dropdown-toggle user-button"
								data-toggle="dropdown">
								<span class="caret"></span>
							</button>
							<ul class="dropdown-menu state-dropdown" role="menu">
								<li ng-repeat="checklist in checklists | orderBy : 'key'"
									ng-click="checklistSelectedAction(checklist);"><a href="">{{checklist.value}}</a></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div class="col-md-6 col-xs-12 col-sm-12 text-center plan_actual">Actual vs Plan</div>
		</div>

		<div class="row plan-trendz-div">
			<div class="col-md-6 col-xs-12 col-sm-12">
				<div class="col-md-3 col-xs-12 col-sm-12 planned-act-data">
				 <p class="data-percnt"> {{progressCircle1Monthly}}</p>
				 <p class="plan-box-data">{{actualPlanDataMonthly}} {{totalPlanDataMonthly}}</p>
				 <p class="plan-box-data"> {{progressCircle1MonthlyData}}</p>
				 <p class="plan-box-data"> (Monthly) </p>
				</div>
				<div class="col-md-3 col-xs-12 col-sm-12 planned-act-data">
				 <p class="data-percnt">{{progressCircle1Quart}}</p>
				 <p class="plan-box-data">{{actualPlanDataQuart}} {{totalPlanDataQuart}}</p>
				 <p class="plan-box-data"> {{progressCircle1QuartData}}</p>
				 <p class="plan-box-data"> (Quaterly) </p>
				</div>
			</div>
			<div class="col-md-6 col-xs-12 col-sm-12">
				<div class="line-chart-container">
					<sdrc-thematic-line-chart id='pageLineChart'
						dataprovider="trendChatData" ng-if="trendChatData.length!=0"></sdrc-thematic-line-chart>
					<div class="col-md-6 col-md-offset-3 notrend-data"
						ng-if="trendChatData.length==0">{{trendData}}</div>
				</div>
			</div>
			<img class="plan-separator"
				src="resources/images/horizontal_separator_yellow_svg_1.svg">
			<h3 class="scroll-down-to-plan">PLAN YOUR VISIT</h3>
		</div>

		<div class="row plan-dist-div">
			<div class="col-md-3 col-sm-6 col-xs-6 indicator-mob">
				<div class="facility-label">State</div>
				<div class="select-container text-center">
					<div class="input-group">
						<input type="text" placeholder="Select State" id="state"
							class="form-control not-visible-input inputBackground"
							name="state" readonly="" ng-model="selectedState.name">
						<div class="input-group-btn" style="position: relative;">
							<button type="button"
								class="btn btn-danger dropdown-toggle user-button"
								data-toggle="dropdown">
								<span class="caret"></span>
							</button>
							<ul class="dropdown-menu state-dropdown" role="menu">
								<li ng-repeat="state in stateList | orderBy : 'name'"
									ng-click="selectState(state);"><a href="">{{state.name}}</a></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div class="col-md-3 col-sm-6 col-xs-6 indicator-mob">
				<div class="facility-label">District</div>
				<div class="select-container text-center">
					<div class="input-group">
						<input type="text" placeholder="Select District" id="district"
							class="form-control not-visible-input inputBackground"
							name="district" readonly="" ng-model="selectedDist.name">
						<div class="input-group-btn" style="position: relative;">
							<button type="button"
								class="btn btn-danger dropdown-toggle user-button"
								data-toggle="dropdown">
								<span class="caret"></span>
							</button>
							<ul class="dropdown-menu state-dropdown" role="menu">
								<li ng-repeat="dist in districtList | orderBy : 'name'"
									ng-click="selectDistrict(dist);"><a href="">{{dist.name}}</a></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div class="col-md-3 col-sm-6 col-xs-6 indicator-mob">
				<div class="facility-label">Facility Type</div>
				<div class="select-container text-center">
					<div class="input-group">
						<input type="text" placeholder="Select Facility Type"
							id="facility"
							class="form-control not-visible-input inputBackground"
							name="facility" readonly="" ng-model="selectedfacilityType.value">
						<div class="input-group-btn" style="position: relative;">
							<button type="button"
								class="btn btn-danger dropdown-toggle user-button"
								data-toggle="dropdown">
								<span class="caret"></span>
							</button>
							<ul class="dropdown-menu state-dropdown" role="menu">
								<li
									ng-repeat="facilityType in facilityTypes | orderBy : 'orderLevel'"
									ng-click="selectfacilityType(facilityType);" ng-if="userLevel== 5 ? facilityType.key==105 ?false:true :true"><a href="">{{facilityType.value}}</a></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div class="col-md-3 col-sm-6 col-xs-6 indicator-mob">
				<div class="facility-label" ng-show="showBlock">Block</div>
				<div class="select-container text-center" ng-show="showBlock">
					<div class="input-group">
						<input type="text" placeholder="Select Block" id="block"
							class="form-control not-visible-input inputBackground"
							name="block" readonly="" ng-model="selectedBlock.name">
						<div class="input-group-btn" style="position: relative;">
							<button type="button"
								class="btn btn-danger dropdown-toggle user-button"
								data-toggle="dropdown">
								<span class="caret"></span>
							</button>
							<ul class="dropdown-menu state-dropdown" role="menu">
								<li ng-repeat="block in blockList | orderBy : 'name'"
									ng-click="selectBlock(block);"><a href="">{{block.name}}</a></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>


		<div class="container div_details">
			<div class="row">
				<div class="col-md-12 col-sm-12 col-lg-12">
					<div class="row">
						<div class="col-md-9 col-sm-9">
							<div class="row">
								<div class="col-md-4 col-sm-4" style="padding-top: 27px;">
									<!-- facility data  -->

									<div ng-show="showAssessement" style="margin-left: 7px;">
										<div class="three-col1">
											<div class="three-col-content">
												<div class="three-col-img">
													<h4 class="col3header" style="text-align: center">Facility</h4>
												</div>
											</div>
										</div>
										<div class="three-col2">
											<div class="three-col-content">
												<div class="three-col-img">
													<h4 class="statusdate-font" style="text-align: center">{{selectedFacility.name}}</h4>
												</div>
											</div>
										</div>
										<div class="three-col1">
											<div class="three-col-content">
												<div class="three-col-img">
													<h5 class="col3header" style="text-align: center">Assessment
														History</h5>

												</div>
											</div>
										</div>
										<div class="three-col4">
											<div>
												<!-- Nested media object -->
												<div class="media-body">
													<!-- Nested media object -->
													<div class="media">
														<div class="media-body" style="text-align: center">
															<p class="statusdate-font"
																ng-repeat="assessmentHistory in visitHistoryData">
																{{assessmentHistory.value}}-
																{{assessmentHistory.description}}</p>
														</div>
													</div>
												</div>
											</div>
											<p class="statusdate-font"
												ng-show="visitHistoryData.length==0"
												style="text-align: center;">No history available</p>
										</div>
									</div>

									<!-- / end status and date planned -->
								</div>
								<!--end facility data left -->
								<div class="col-md-8 col-sm-8 div-dis-details"
									ng-show="facilityNameDiv">
									<div class="row three-colr1">
										<div class="col-md-12 col-sm-12 col-lg-12">
											<div class="col-md-4 col-sm-6 col-xs-6 plan-fac-list"
												ng-click="showFacility(facility);clearFile()"
												id="calenderopen" ng-repeat="facility in facilityList"
												data-toggle="tooltip" data-html="true"
												ng-class="facility.name==selectedFacility.name?'selectedDiv-plan':''"
												data-original-title="{{showPlan(facility)}}"
												data-placement='top'>
												<div
													ng-class="facility.planned?'three-colrPlanned':'available-plan'">
													<img ng-if="facility.priority" class="warn-img-plan"
														src="resources/images/icons/Messages_warning-plan_caution_icon.svg">
													<div class="three-col-content">
														<div class="three-col-img">
															<h4 class="col3header1"
																style="text-align: center; height: 24px;">
																{{facility.name}}
																<div
																	ng-repeat="plan in facility.plannedHistory | limitTo : 1"
																	style="margin-top: 4px">
																	{{plan.value}}&nbsp;-&nbsp;{{plan.description}}</div>
															</h4>
														</div>
													</div>
												</div>
											</div>
											<p ng-if="facilityList.length==0"
												style="text-align: center; font-size: 18px; font-weight: bold;">No Data
												Available.</p>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-md-3 col-sm-3">
							<div>
								<ul class="available" style="padding-top: 4px;"
									ng-if="facilityList.length!=0" ng-show="planLegends">
									<li>
										<div id="circle-avail">
											<h5 class="col3-avail">Available</h5>
										</div>
									</li>
									<li>
										<div id="circle-plan">
											<h5 class="col3-avail">Planned</h5>
										</div>
									</li>
									<li>
										<div id="circle-unsupervise">
											<img style="width: 33px; margin-top: 10px;"
												src="resources/images/unsupervised_icon.svg">
											<h5 class="col3-avail1">Unsupervised</h5>
										</div>
									</li>

								</ul>
							</div>
							<div class="three-col1-right" ng-show="planCalender"
								id="calendertavView">
								<div class="three-col-content-cal-rel">
									<ul class="nav nav-tabs cal-rel">
										<li id="calendar-btn" style="margin-bottom: 0px;"><a
											data-toggle="tab" id="plan-font" href="#calender"
											ng-click="planButtonClicked()">Plan</a></li>

										<li id="release-btn" style="float: right; margin-bottom: 0px;"
											ng-if="selectedFacility.planned"><a data-toggle="tab"
											id="release-font" href="#calender"
											ng-click="releaseButtonClicked()">Release</a></li>
									</ul>
									<div class="tab-content">
										<div id="calender" class="tab-pane fade in active">
											<div class="input-group" id="plan-calender-position">
												<input type="text" id="datepicker" class="form-control"
													placeholder="Select date" ng-model="planDate" readonly
													ng-disabled="true" data-inline="true"> <span
													class="p-field-cb"></span> <span class="input-group-addon"><span
													class="p-select-arrow"><i class="fa fa-calendar"
														id="datepicker1"></i></span></span>
											</div>

										</div>

									</div>
								</div>
							</div>

							<div class="" ng-show="release">
								<button class="plan-next" ng-click="releasePlan()">Release</button>
							</div>
							<div class="" ng-show="next">
								<button class="plan-next" ng-click="submitPlan()">Plan</button>
							</div>
							<!-- <div class="" ng-show="submit">
								<button class="plan-next" ng-click="validatePlan()">SUBMIT</button>
							</div> -->
							<!---------------- end  Agenda  ------------->

						</div>
					</div>
				</div>
			</div>
		</div>
		<div style="" class="top-img">
			<a href="#" class="back-top"><img class="scroll-top-img"
				style="width: 40px; margin-top: 10px;"
				src="resources/images/icons/scroll top.svg"> </a>
		</div>

	</div>


	<div id="errorMessage" class="modal fade" role="dialog"
		data-backdrop="static" data-keyboard="false">
		<div class="modal-dialog plan-error">
			<!-- Modal content -->
			<div class="modal-content plan-modal">
				<div class="modal-body text-center">
					<div class="errorhead">
						<img alt=""
							src="resources/images/icons/Messages_warning_caution_icon.svg"
							style="width: 25px; margin-top: -5px;"> ERROR
					</div>
					<div class="planerrorbody">{{errorMsg}}</div>
					<button type="button" class="btn errorOk" data-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>

	<div id="pop" class="modal fade" role="dialog" data-backdrop="static"
		data-keyboard="false">
		<div class="modal-dialog plan-succ">
			Modal content
			<div class="modal-content plan-modal">
				<div class="modal-body text-center">
					<div class="successhead1">
						<img alt="" src="resources/images/icons/Messages_success_icon.svg"
							style="width: 25px; margin-top: -5px;"> SUCCESS
					</div>
					<div class="plansuccessbody">{{msg}}</div>
					<a class="btn btn-default" data-dismiss="modal">Ok</a>
				</div>
			</div>
		</div>
	</div>


	<div id="planConformation" class="modal fade" role="dialog"
		data-backdrop="static" data-keyboard="false">
		<div class="modal-dialog plan-warn">
			<!-- Modal content -->
			<div class="modal-content plan-modal">
				<div class="modal-body text-center" style="padding: 0px !important;">
					<div class="warnhead">
						<img alt=""
							src="resources/images/icons/Messages_warning_caution_icon.svg"
							style="width: 25px; margin-top: -5px;"> WARNING
					</div>
					<div class="planwarnbody">{{conformationmsg}}</div>
					<button type="button" class="btn errorOk" data-dismiss="modal"
						ng-click="rePlan()" style="margin-bottom: 20px;">Yes</button>
					<button type="button" class="btn errorOk" data-dismiss="modal"
						ng-click="closeModal()" style="margin-bottom: 20px;">No</button>
				</div>
			</div>
		</div>
	</div>

	<jsp:include page="fragments/footer.jsp"></jsp:include>

	<script src="resources/js/angular.min.js"></script>
	<script type="text/javascript"
		src="resources/js/controllers/planController.js"></script>
	<script src="https://d3js.org/d3.v3.min.js" charset="utf-8"></script>
	<!-- <script type="text/javascript">
		var app = angular.module("planApp", []);
		var myAppConstructor = angular.module("planApp");
		myAppConstructor.controller("planController", planController);
		
	</script> -->

	<script type="text/javascript"
		src="resources/js/angularDirective/directive.js"></script>
	<script type="text/javascript">
		$(document).ready(function() {

			$('[data-toggle="tooltip"]').tooltip();

			$("#datepicker").click(function() {
				$("#datepicker").datepicker("show");
			});
			$('.datepicker').addClass('plan-calender-div');
		});
	</script>

	<script type="text/javascript">
		$(document).ready(function() {
			/*  jquery.datepicker._checkexternalclick = function(e) {
			 e.preventdefault();
			 e.stoppropagation();
			};  */
			$(".plan-menu").addClass('active');
			$("#plan-to-make-down").click(function() {
				$('html, body').animate({
					scrollTop : 950
				}, 1000);
			});
		});
	</script>
</body>

</html>