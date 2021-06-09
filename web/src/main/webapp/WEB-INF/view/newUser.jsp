<!-- 
@author Devikrushna Nanda (devikrushna@sdrc.co.in) Suman Saurav Das (sumansaurav.das@sdrc.co.in)
 -->
<%@taglib prefix="merror" uri="/WEB-INF/ModalDescripter.tld"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%-- <%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%> --%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://www.springframework.org/tags/form"
	prefix="springForm"%>

<html ng-app="userApp" ng-controller="newUserController" ng-cloak>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title ng-if="!user">User Registration</title>
<title>Profile</title>
<link rel="icon" href="resources/images/icon.png" type="image/png"
	sizes="16x16">
<meta content="width=device-width, initial-scale=1.0" name="viewport">
<!-- <link rel="stylesheet" href="resources/css/bootstrap.min.css"> -->
<link rel="stylesheet" href="resources/css/font-awesome.min.css">
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<link rel="stylesheet" href="resources/css/customLoader.css">
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<link rel="stylesheet" href="resources/css/bootstrap-select.min.css">
<link rel="stylesheet" href="resources/css/styles.css">
<!-- <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css"></script> -->
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<!--   <link rel="stylesheet" href="resources/js/angular.min.js"> -->
<!-- <link rel="stylesheet" href="resources/css/jquery-ui.min.js"> -->
<link rel="stylesheet" href="resources/css/jquery-ui.css">
<style type="text/css">
.error {
	color: #ff0000;
	font-style: italic;
	font-weight: bold;
}
.newregister-user input:focus {
	outline: none !important;
	border: 1px solid rgba(232, 13, 13, 0.27) !important;
	box-shadow: 0 0 10px #719ECE;
}
#ui-datepicker-div {
   z-index:2 !important;
}
@media only screen and (max-device-width: 1020px){
div#mymain{
	margin-top:44px !important;
	}
}
@media (max-width:320px){
	.state-width-check{
	width:189px !important;
}	
.block-wid-check{
	width:190px !important;
}
.facility-box-change{
width:191px !important;
}
.level-facility{
	width: 80% !important;
	}
}
@media (max-width:480px) and (max-height:320px){
	.state-width-check{
	width:336px !important;
}	
.block-wid-check{
	width:338px !important;
}	
}
.label-dsplay{
display:none;
}
.display-web{
display:none;
}
.select-state{
width:402px !important;
}
/* @media only screen and (max-width:545px) and (min-width:300px){
.display-components-inline li:nth-child(3){
	width:51% !important;		
}
} */
@media (max-width:768px){
	.user-level-input{
	width:267px !important;
}
}
@media (max-width:320px){
div#mymain{
margin-top:119px !important;
}
}

@media (max-width:300px){
.uploadFilenWidth{
	width:42% !important;
	}
	.open ul.dropdown-menu{
	max-width: 204px !important;
	}
	.sal-dropdown{
	left:-177px !important;
	}
	.display-components-inline li:nth-child(3){
	width:54% !important;
	}
	div#mymain{
	margin-top:56px !important;
	}
	.user-level-input {
    width: 169px !important;
}
}
@media (max-width:656px) and (max-height:360px){
.user-level-input{
	width:213px !important;
	}
}
/* @media screen and (-webkit-min-device-pixel-ratio:0){
.user-level-input{
	width:80% !important;
	}
	.level-facility{
	width:100% !important;
	}
} */
@media (max-width:991px) and (max-height:600px){
	
	.display-components-inline li:nth-child(3){
	    margin-top: 17px;
	}
}
@media (min-width:300px) and (max-width:480px){
.user-level-input{
	width: 168px !important;
	}
}
@media (max-width:600px){
.user-level-input{
	width:192px !important;
}
}
@media (max-width:601px){
.user-level-input{
	width:192px !important;
}
}
@media (max-width:480px) and (max-height:320px){
.user-level-input{
	width:337px !important;
}
div#mymain{
margin-top:115px !important;
}
}
@media (min-width:320px) and (max-width:480px){
.display-components-inline li:nth-child(3){
width:51% !important;
}
@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
.state-width-check{
	width:621px !important;
}
}
}
@media ( max-width : 360px){
	.user-level-input {
   	 	width: 228px !important;
	}
  }
 @media ( max-width : 320px){
	.user-level-input {
   	 	width: 188px !important;
	}
  } 
@media (max-width:1024px){
/* .calender-icon{	
	left:91% !important;
} */
.display-components-inline li{
	display:block;
}
.display-components-inline{
padding:0px !important;
width:100%;
}
.pdsa-main-margin{
margin-bottom:0px !important;
}
}
</style>
</head>
<body class="newregister-user" ng-cloak>
	<jsp:include page="fragments/header.jsp"></jsp:include>
	
	<div class="pageNameContainer newuser-pagename grp" >
		<h4>{{pageName}}</h4>
	</div>
	<div  class="container user-reg-top">
		<div class="userSelection text-left perinfotop">
			<h5 class="userBorder">Personal Information</h5>
		</div>
		<springForm:form method="POST" modelAttribute="newUser"
			action="register.do" enctype="multipart/form-data" id="userReg"
			name="userReg">
			<fieldset>
				<div class="container">
					<div class="row">
						<div class="col-md-12 per-margn-top">
							<div class="container-fluid">

								<!-- ---------------------New user details  @swarna @devikrushna--- -->
								<input type="hidden" id="salutationArray" value="${Salutation}">


							<div class="form-group sal-res form-sales frst-bottom">
							<label class="col-md-3" for="textinput">Profile photo<span
										class="mandatory_star">&#42;</span>
									</label>
									<div class="col-md-9 text-left sal-upload-file frst-bottom sal-upload-moz">
										<springForm:input path="photoFilePath" type="hidden"
											ng-value="saluationImage" />
										<input type="file" class="file file1" id="uplodsal" accept="image/*" class="img-pass"
											onchange="angular.element('body').scope().getSalutationFile(this)"
											ng-model="salutationUpload" value="files[0]" /> <!-- <span
											id="sal-uplod-icon"><i
											class="fa fa-camera camera-icon" aria-hidden="true"></i></span> -->
										<button
											class="upload btn btn-primary input-lg uploadFilenWidth"
											id="uploadsalfile1" type="button">UPLOAD</button>
										
										<img class="update-image" id="update-profile-image"
											ng-show="!updateimage && salutationUploadName1!=null"
											data-action="zoom"
											ng-src="{{!updateimage?salutationUploadName1:null}}">
										<img
											id="image1"   ng-show="updateimage && saluationImage" ng-src={{saluationImage}}
											 onerror="angular.element(this).scope().imgError('uplodsal')"  height="45" width="45" data-action="zoom"
											 class="update-image">
											
<!-- 											<span style="display: inline-flex;">Upload profile picture</span> -->
											
										<div>
											<springForm:errors path="photoFilePath" cssClass="error" />
										</div>
									</div>
									
							</div>

								<div class="form-group sal-res form-sales">
									<label class="col-md-3" for="textinput"> Salutation<span
										class="mandatory_star">&#42;</span>
									</label>
									<div class="col-md-9 frst-bottom displayInline ">
										<div class="input-group sal-moz"
											style="margin: auto; display: inline;">
											<springForm:input path="salutationId" type="hidden"
												id="salutationId" name="salId"
												ng-value="selectedSalutation.key" />
											<input type="text" placeholder="Select Salutation"
												id="salutation"
												class="form-control not-visible-input middleWidth1 inputBackground dropdown-moz"
												name="state" readonly ng-model="selectedSalutation.value" />
											<div class="input-group-btn" style="position: relative;">
												<button type="button" id="salbtn"
													class="btn btn-danger dropdown-toggle user-button"
													data-toggle="dropdown">
													<span class="caret"></span>
												</button>
												<ul class="dropdown-menu sal-dropdown" id="saldrop"
													role="menu">
													<li ng-repeat="sal in salutationArray"
														ng-click="selectSalutation(sal);"><a href="">{{sal.value}}</a></li>
												</ul>
											</div>
										</div>
									</div>
     							</div>
								

								<div class="form-group user-res-tab">
									<label class="col-md-3 frst-bottom" for="textinput"> First Name <span
										class="mandatory_star">&#42;</span></label>
									<div class="col-md-9 frst-bottom">
										<springForm:input path="firstName" type="hidden"
											id="firstname1" ng-value="newuser.firstname"
											class="form-control inputBackground" />
										<input type="text" id="firstname"
											placeholder="Enter First Name"
											oninvalid="this.setCustomValidity('Please enter firstname')"
											oninput="setCustomValidity('')" required
											onPaste="return false" ng-model="newuser.firstname"
											ng-change="changeUser()" class="form-control inputBackground frst-input-wid"
											fhirty-characters-validation autocomplete="off" />
									</div>
								</div>
								

								<div class="form-group">
									<label class="col-md-3 frst-bottom" for="textinput"> Middle Name </label>
									<div class="col-md-9 frst-bottom">
										<springForm:input path="middleName" type="hidden"
											id="middlename1" ng-value="newuser.middlename"
											class="form-control inputBackground" />
										<input type="text" id="middlename"
											placeholder="Enter Middle Name" ng-model="newuser.middlename"
											ng-change="changeUser()" onPaste="return false"
											class="form-control inputBackground frst-input-wid"
											fhirty-characters-validation autocomplete="off" />
									</div>
								</div>
								
								<div class="form-group">
									<label class="col-md-3 frst-bottom" for="textinput"> Last Name <span
										class="mandatory_star">&#42;</span></label>
									<div class="col-md-9 frst-bottom">
										<springForm:input path="lastName" type="hidden" id="lastname1"
											ng-value="newuser.lastname"
											class="form-control inputBackground" />
										<input type="text" id="lastname" placeholder="Enter Last Name"
											ng-model="newuser.lastname" ng-change="changeUser()"
											onPaste="return false" class="form-control inputBackground frst-input-wid"
											fhirty-characters-validation autocomplete="off" />
									</div>
								</div>
								
								<div class="form-group">
									<label class="col-md-3 frst-bottom" for="textinput"> Gender <span
										class="mandatory_star">&#42;</span>
									</label>
									<div class="col-md-9 frst-bottom">
										<label class="marginright"> <springForm:radiobutton
												path="gender" name="radio" id="m" class="marginLM"
												value="98" ng-model="gender1" /> Male
										</label> <label class="marginright"> <springForm:radiobutton
												path="gender" name="radio" id="f" class="marginLF"
												value="99" ng-model="gender1" />Female
										</label> <label class="marginright"> <springForm:radiobutton
												path="gender" name="radio" id="o" class="marginLF"
												value="100" ng-model="gender1" />Other
										</label>
									</div>
								</div>
								

								<div class="form-group">
									<label class="col-md-3 " for="textinput">Date of Birth <span
										class="mandatory_star">&#42;</span></label>
									<div class="col-md-9 ">
									<ul class="display-components-inline">
									<li></li>
									<li class="date-relative">
										<springForm:input path="birthday" type="hidden" id="dob1"
											placeholder="DD-MM-YYYY" ng-value="newuser.dob"
											class="form-control inputBackground" />

										<input type="text" id="dob" placeholder="DD-MM-YYYY"
											style="cursor: pointer;" ng-model="newuser.dob" readonly
											class="form-control inputBackground  user-input-id" />
											 <i id="calenderIcon"
											class="fa fa-calendar calender-icon" aria-hidden="true"></i>
											</li>
											<li></li>
											</ul>
									</div>
								</div>
								

								<div class="form-group">
									<label class="col-md-3 " for="textinput">Mobile Number <span
										class="mandatory_star">&#42;</span></label>
									<div class="col-md-9 ">
									<ul class="display-components-inline">
									<li>
										<springForm:input path="phoneNo" type="hidden" id="mobileNum1"
											ng-value="newuser.mobileNum" /></li>
										<li><input path="phoneNo" type="text" id="mobileNum"
											placeholder="+91-xxxxx-xxxxx"
											ng-model="newuser.mobileNum"
											ng-keyUp="validatePhone(newuser.mobileNum,'phoneNoError')"
											ng-blur="checkPhoneNo(newuser.mobileNum,'checkNoError')"
											onPaste="return false"
											class="form-control mobilenumField inputBackground user-input-id"
											only-ten-digits autocomplete="off" />
										<div id="phoneNoError" class="error-style"></div>
										<div id="checkNoError" class="error-style"></div></li>
										</ul>
									</div>
								</div>
								

								<div class="form-group">
									<label class="col-md-3 frst-bottom" for="textinput">Primary Email
										ID <span class="mandatory_star">&#42;</span>
									</label>
									<div class="col-md-9 ">
									<ul class="display-components-inline display-inline-ie">
									<li></li>
									<li>
										<springForm:input path="primaryEmailId" type="text"
											id="emailID" placeholder="Enter Primary Email ID"
											ng-model="newuser.emailID"
											ng-pattern="/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/"
											ng-keyup="validateEmail(newuser.emailID,'emailError')"
											ng-blur="checkEmailAvailablity(newuser.emailID,'checkEmailError')"
											class="form-control inputBackground  user-input-id"
											ng-change="generateOtpEmail()" autocomplete="off"
											onPaste="return false" />
										<div id="emailError" class="error-style error-email-ie"></div>
										<div id="checkEmailError" class="error-style"></div>
										<div  id="emilverifiedmsgDiv" class="error-verify-ie"
										ng-show="verified" style="color: green;">Email ID
										verified successfully</div>
										</li>
										<li>
										<button
											class="upload btn btn-primary input-lg uploadFilenWidth"
											id="generateOtp"
											ng-click="showOtp(newuser.emailID,'emailOtpError')"
											ng-show="generateOtpbtn" type="button">Generate OTP</button>

										<button style="margin-bottom: 0"
											class="upload btn btn-primary input-lg uploadFilenWidth"
											id="resendOtp"
											ng-click="resendOtp(newuser.emailID,'emailOtpError')"
											ng-show="resendOtpbtn" type="button">Re-send OTP</button>
											
											
											</li>
											<li>
										<div
											style="display: inline-block; vertical-align: middle;"
											id="emailOtpError" class="error-style"></div>
											</li>
											<li></li>
											</ul>
									</div>
								</div>
								
								<div class="form-group frst-bottom" ng-show="emialOtpDiv">
									<label class="col-md-3" for="textinput">Enter OTP<span
										class="mandatory_star">&#42;</span></label>
									<div class="col-md-9 frst-bottom">
										<ul class="display-components-inline display-inline-ie">
										<li></li>
										<li>
										<input type="password" id="emailOtp"
											placeholder="Enter Email Verification OTP"
											ng-model="newuser.otp" only-four-digits
											class="form-control inputBackground user-input-id" autocomplete="off"
											onPaste="return false"
											ng-blur="clearOtpMsg('verifyOtpError')" />
										
										</li>
										<li>
										<button
											class="upload btn btn-primary input-lg uploadFilenWidth"
											style="margin-bottom: 0" id="validateOtp" type="button"
											ng-click="verifyOtp(newuser.otp,'verifyOtpError')">Validate
											OTP</button></li>
											<li>
										<div
											style="display: inline-block; vertical-align: middle; margin-left: 10px;">
											Time left = <span id="timer"></span>
										</div></li>
										<div id="verifyOtpError" class="error-style"></div>
										</ul>
									</div>
									<!-- <div class="col-md-4" ng-show="showTimerText">
										<button
											class="upload btn btn-primary input-lg uploadFilenWidth"
											style="margin-bottom: 0" id="validateOtp" type="button"
											ng-click="verifyOtp(newuser.otp,'verifyOtpError')">Validate
											OTP</button>
										<div
											style="display: inline-block; vertical-align: middle; margin-left: 10px;">
											Time left = <span id="timer"></span>
										</div>
									</div> -->
								</div>
<!-- 								<span >&nbsp;</span> -->

								<div class="form-group  grp-respn">
									<label class="col-md-3 frst-bottom" for="textinput">Secondary Email
										ID </label>
									<div class="col-md-9 frst-bottom">
									<ul class="display-components-inline">
									<li></li>
									<li>
										<springForm:input path="secondaryEmailId" type="text"
											id="secondaryemailID" placeholder="Enter Secondary Email ID"
											ng-model="newuser.secondaryemailID"
											ng-pattern="/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/"
											onPaste="return false"
											ng-keyup="validateSecEmail(newuser.secondaryemailID,'emailError1')"
											ng-blur="checkprimary(newuser.secondaryemailID,'emailError2',1)"
											class="form-control inputBackground user-input-id" autocomplete="off" />
										<div id="emailError1" class="error-style"></div>
										<div id="emailError2" class="error-style"></div>
										</li>
										</ul>
									</div>
								</div>
								
								<!-- ---------End personal info------------------ -->
								<!-- ----------------Professional info start------------------- -->

								<div class=" text-left prof-bottom ">
									<h5 class="userBorder">Professional Information</h5>
								</div>
								

								<div class="form-group user-res-tab">
									<label class="col-md-3 spcres" for="textinput">User Level <span
										class="mandatory_star">&#42;</span></label>
									<div class="col-md-9 frst-bottom col-xs-12 displayInline1">
	

										<div class="col-md-6 col-xs-12 input-group displayInline1 mrgresnsv resz-respnsv">
											<springForm:input type="hidden" path="" id="designation"
												name="designation" />
											<input type="text" placeholder="Select User level"
												id="userlevel" 
												class="form-control not-visible-input user-level-input inputBackground select-user dropdown-moz"
												name="userlevel" readonly="" ng-disabled="disableOtherDtls"
												ng-model="selectedLevel.levelName">
											<div class="input-group-btn" style="position: relative;">
												<button type="button" ng-disabled="disableOtherDtls"
													class="btn btn-danger dropdown-toggle user-button "
													data-toggle="dropdown">
													<span class="caret"></span>
												</button>
												<ul class="dropdown-menu level-dropdown drpres" role="menu">
													<li ng-repeat="level in userLevel"
														ng-click="selectLevel(level);"><a href="">{{level.levelName}}</a></li>
												</ul>
											</div>
										</div>
										<div class="col-md-6 col-xs-12 displayInline level-facilitytype"
											ng-show="selectedLevel.levelID==8">
											<div class="input-group mrgresnsv1">
												<input type="text" placeholder="Select Facility Type"
													id="facilitytype" 
													class="form-control not-visible-input level-facility wid-internet-explorer mobile-landscape-width inputBackground dropdown-moz"
													name="facility-type" readonly=""
													ng-disabled="disableOtherDtls"
													ng-model="selectedFacilityType.value"
													ng-change="facilityTypeSelected()">
												<div class="input-group-btn" style="position: relative;">
													<button type="button" ng-disabled="disableOtherDtls"
														class="btn btn-danger dropdown-toggle user-button"
														data-toggle="dropdown">
														<span class="caret"></span>
													</button>
													<ul class="dropdown-menu facilitytype-dropdown drpdwn-resp" role="menu">
														<li
															ng-repeat="type in facilityTypeForArea | orderBy : 'orderLevel'"
															ng-click="selectFacilityType(type);"><a href="">{{type.value}}</a></li>
													</ul>
												</div>
											</div>
										</div>

									</div>
								</div>
								<div class="form-group user-res-tab" ng-if="(selectedLevel.levelID !=1 && locationshow) || (userDetails.userLevel !=1 && userDetails.userLevel != null)">
									<label class="col-md-3 spcres" for="textinput">Location
										<span class="mandatory_star">&#42;</span>
									</label>
									<div class="col-md-9 col-xs-12 displayInline1">
									
										<div class="col-md-6 col-xs-12 input-group displayInline1  mrgresnsv resz-respnsv "
										ng-disabled="selectedLevel.levelID !=1 ? false : true">
											<springForm:input type="hidden" path="stateId" id="stateId"
												name="stateId" readonly="" ng-value="selectedState.areaNId" />
											<input type="text" path="stateName"
												placeholder="Select State" id="state"
												ng-disabled="disableOtherDtls"
												class="form-control not-visible-input state-width-check inputBackground  dropdown-moz"
												name="state" readonly="" ng-model="selectedState.name" />
											<div class="input-group-btn" style="position: relative;">
												<button type="button"
													ng-disabled="(selectedLevel.levelID != 1?  flase : true)|| disableOtherDtls"
													class="btn btn-danger dropdown-toggle user-button"
													data-toggle="dropdown">
													<span class="caret"></span>
												</button>
												<ul class="dropdown-menu state-dropdown1" role="menu">
													<li ng-repeat="state in stateList | orderBy : 'name'"
														ng-click="selectState(state);"><a href="">{{state.name}}</a></li>
												</ul>
											</div>
										</div>
										<div class="col-md-6 col-xs-12 displayInline level-facilitytype"
											ng-show="selectedLevel.levelID !=1 && selectedLevel.levelID !=2 ? true : false">
											<div class="input-group mrgresnsv1">
                                            <springForm:input type="hidden" path="districtId"
												id="districtId" name="districtId" readonly=""
												ng-value="selectedDist.areaNId" />
											   <input type="text" placeholder="Select District"
												id="district" ng-disabled="disableOtherDtls" 
												class="form-control not-visible-input wid-internet-explorer level-facility mobile-landscape-width inputBackground dropdown-moz"
												name="state" readonly="" ng-model="selectedDist.name" />
											  <div class="input-group-btn" style="position: relative;">
												<button type="button"
													ng-disabled="(selectedLevel.levelID !=1 && selectedLevel.levelID !=2  ? false : true) || disableOtherDtls"
													class="btn btn-danger dropdown-toggle user-button"
													ng-disabled="disableOtherDtls" data-toggle="dropdown">
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
								</div>
								<div class="form-group user-res-tab professional-top" ng-if="(selectedLevel.levelID !=1 && locationshow) || (userDetails.userLevel !=1 && userDetails.userLevel != null)">
									
									<label class="col-md-3 spcres" for="textinput">
									</label>
									<div class="col-md-9 frst-bottom col-xs-12 displayInline1">
										<div class="col-md-6 col-xs-12 input-group displayInline1 mrgresnsv resz-respnsv professional-top" 
										ng-show="selectedLevel.levelID > 4 && showBlock">
											<springForm:input type="hidden" path="blockId" id="blockId"
												name="blockId" readonly="" ng-value="selectedBlock.areaNId" />
											<input type="text" placeholder="Select Block" id="block"
												ng-disabled="disableOtherDtls"
												class="form-control not-visible-input block-wid-check inputBackground select-user dropdown-moz"
												name="state" readonly="" ng-model="selectedBlock.name" />
											<div class="input-group-btn" style="position: relative;">
												<button type="button"
													ng-disabled="(selectedLevel.levelID !=1 && selectedLevel.levelID !=2 && selectedLevel.levelID !=4 ? false : true) || disableOtherDtls"
													class="btn btn-danger dropdown-toggle user-button"
													ng-disabled="disableOtherDtls" data-toggle="dropdown">
													<span class="caret"></span>
												</button>
												<ul class="dropdown-menu state-dropdown" role="menu">
													<li ng-repeat="block in blockList | orderBy : 'name'"
														ng-click="selectBlock(block);"><a href="">{{block.name}}</a></li>
												</ul>
											</div>
										</div>
										<div class="col-md-6 col-xs-12 displayInline level-facilitytype professional-top" 
											ng-show="selectedLevel.levelID !=1 && selectedLevel.levelID !=2 && selectedLevel.levelID !=4 && selectedLevel.levelID !=5 ? true : false">
											<div class="input-group mrgresnsv1 facility-tab-only">
                                           <springForm:input type="hidden" path="facilityId"
												id="facilityId" name="facilityId" readonly=""
												ng-value="selectedFacility.areaNId" />
											<input type="text" placeholder="Select Facility"
												id="facility" ng-disabled="disableOtherDtls"
												style=""
												class="form-control not-visible-input wid-internet-explorer facility-box-change mobile-landscape-width inputBackground dropdown-moz"
												name="facility" readonly="" ng-model="selectedFacility.name" />
											<div class="input-group-btn" style="position: relative;">
												<button type="button"
													ng-disabled="(selectedLevel.levelID !=1 && selectedLevel.levelID !=2 && selectedLevel.levelID !=4 && selectedLevel.levelID !=5 ? false : true) || disableOtherDtls"
													class="btn btn-danger dropdown-toggle user-button"
													data-toggle="dropdown">
													<span class="caret"></span>
												</button>
												<ul class="dropdown-menu state-dropdown" role="menu">
													<li
														ng-if="facility.facilityType.id == areaWiseFacilityType"
														ng-repeat="facility in facilityList | orderBy : 'name'"
														ng-click="selectFacility(facility);"><a href="">{{facility.name}}</a></li>
												</ul>
											</div>
											</div>
										</div>

									</div>
								</div>
								<span
									ng-if="(selectedLevel.levelID !=1 && locationshow) || (userDetails.userLevel !=1 && userDetails.userLevel != null)"></span>

								<div class="form-group">

									<label class="col-md-3 col-xs-3 col-sm-12" for="textinput"> Organization<span
										class="mandatory_star">&#42;</span>
									</label>
									<div class="col-md-9 frst-bottom displayInline">

										<div class="input-group resp-org"
											style="margin: auto; display: inline !important;">
											<springForm:input path="organizationId" type="hidden"
												id="organizationId" name="salId"
												ng-value="selectedOrganization.key" />
											<input type="text" placeholder="Select Organization"
												id="organization" ng-disabled="disableOtherDtls"
												class="form-control not-visible-input middleWidth inputBackground dropdown-moz"
												name="state" readonly ng-model="selectedOrganization.value" />
											<div class="input-group-btn" style="position: relative;">
												<button type="button" ng-disabled="disableOtherDtls"
													class="btn btn-danger dropdown-toggle user-button"
													data-toggle="dropdown">
													<span class="caret"></span>
												</button>
												<ul class="dropdown-menu level-dropdown" role="menu">
													<li ng-repeat="org in organizations | orderBy : 'value'"
														ng-click="selectOrganization(org);"><a href="">{{org.value}}</a></li>
												</ul>
											</div>
										</div>
									</div>
								</div>
								
								
								
								<div class="form-group" ng-if="selectedOrganization.key == 5">
									<label class="col-md-3 col-sm-12 col-xs-12 specify-label" for="textinput" > Specify
										Development Partners<span class="mandatory_star">&#42;</span>
									</label>
									<div class="col-md-9 col-sm-12 col-xs-12 frst-bottom displayInline">

										<div class="input-group"
											style="margin: auto; display: inline !important;">
											<springForm:input path="develomentpartner" type="hidden"
												id="devId" name="devId" ng-value="selectedDevSector.key" />
											<input type="text" placeholder="Select Development Partners"
												id="devSector" ng-disabled="disableOtherDtls"
												class="form-control not-visible-input middleWidth inputBackground dropdown-moz"
												name="devSector" readonly ng-model="selectedDevSector.value" />
											<div class="input-group-btn" style="position: relative;">
												<button type="button" ng-disabled="disableOtherDtls"
													class="btn btn-danger dropdown-toggle user-button"
													data-toggle="dropdown">
													<span class="caret"></span>
												</button>
												<ul class="dropdown-menu level-dropdown" role="menu">
													<li
														ng-repeat="partner in developmentPartners | orderBy : 'value'"
														ng-click="selectPartner(partner);"><a href="">{{partner.value}}</a></li>
												</ul>
											</div>
										</div>
									</div>
								</div>
								<span ng-if="selectedOrganization.key == 5"></span>			
								
								<div class="form-group">
									<label class="col-md-3 col-sm-12 col-xs-12 frst-designation-label" for="textinput">Designation <span
										class="mandatory_star">&#42;</span></label>
									<div class="col-md-9 col-sm-12 col-xs-12 frst-designation displayInline">
										<div class="input-group resp-org" style="margin: auto; display: inline !important;">
											<springForm:input type="hidden" path="designationId"
												id="designation1" name="designation" readonly=""
												ng-value="selectedDeg.key" />
											<input type="text" placeholder="Select Designation"
												id="designation2" ng-disabled="disableOtherDtls"
												class="form-control not-visible-input middleWidth inputBackground dropdown-moz"
												name="designation" readonly="" ng-model="selectedDeg.value">
											<div class="input-group-btn" style="position: relative;">
												<button type="button" ng-disabled="disableOtherDtls"
													class="btn btn-danger dropdown-toggle user-button"
													data-toggle="dropdown">
													<span class="caret"></span>
												</button>
												<ul class="dropdown-menu level-dropdown" role="menu">
													<li ng-repeat="deg in designations | orderBy : 'value'"
														ng-click="selectDeg(deg);"><a href="">{{deg.value}}</a></li>
												</ul>
											</div>
										</div>

									</div>
								</div>
							
								<div ng-if="selectedDeg && selectedDeg.isFacilityInCharge" class="form-group" >
									<label class="col-md-3 frst-designation-label" for="textinput">Facility Type <span
										class="mandatory_star">&#42;</span></label>
									<div class="col-md-9 frst-designation displayInline">
										<div class="input-group resp-org"
											style="margin: auto; display: inline !important;">
											<input type="text" placeholder="Select FacilityType"
												id="facilityTypeForIncharge" ng-disabled="disableOtherDtls"
												class="form-control not-visible-input middleWidth inputBackground dropdown-moz"
												name="facilityTypeForIncharge" readonly="" ng-model="selectedFacilityTypeForIncharge.value">
											<div class="input-group-btn" style="position: relative;">
												<button type="button" ng-disabled="disableOtherDtls"
													class="btn btn-danger dropdown-toggle user-button"
													data-toggle="dropdown">
													<span class="caret"></span>
												</button>
												<ul class="dropdown-menu level-dropdown" role="menu">
													<li ng-repeat="facilityType in facilityTypeForArea | orderBy : 'orderLevel'"
														ng-click="selectfacilityTypeForDeg(facilityType);"><a href="">{{facilityType.value}}</a></li>
												</ul>
											</div>
										</div>

									</div>
								</div>
								
								<div ng-if="selectedDeg && selectedDeg.isFacilityInCharge
											&& selectedFacilityTypeForIncharge && selectedFacilityTypeForIncharge.key != 105 && selectedLevel && selectedLevel.levelID!=5" class="form-group" >
									<label class="col-md-3 frst-designation-label" for="textinput">Block <span
										class="mandatory_star">&#42;</span></label>
									<div class="col-md-9 frst-designation displayInline">
										<div class="input-group resp-org"
											style="margin: auto; display: inline !important;">
											<input type="text" placeholder="Select Block"
												id="inChargeBlockId" ng-disabled="disableOtherDtls"
												class="form-control not-visible-input middleWidth inputBackground dropdown-moz"
												readonly="" ng-model="blockForFacilityInCharge.name">
											<div class="input-group-btn" style="position: relative;">
												<button type="button" ng-disabled="disableOtherDtls"
													class="btn btn-danger dropdown-toggle user-button"
													data-toggle="dropdown">
													<span class="caret"></span>
												</button>
												<ul class="dropdown-menu level-dropdown" role="menu">
													<li ng-repeat="blockForFacilityInCharge in blockListForFacilityInCharge | orderBy : 'value'"
														ng-click="selectBlockForInCharge(blockForFacilityInCharge);"><a href="">{{blockForFacilityInCharge.name}}</a></li>
												</ul>
											</div>
										</div>

									</div>
								</div>
								<div ng-if="(selectedFacilityTypeForIncharge && facilityListForFacilityInCharge && facilityListForFacilityInCharge.length > 0 ) || (selectedFacilityTypeForIncharge && selectedLevel && (selectedLevel.levelID == 5 || selectedLevel.levelID == 4))" class="form-group">
									<label class="col-md-3 frst-designation-label" for="textinput">Facility <span
										class="mandatory_star">&#42;</span></label>
									<div class="col-md-9 frst-designation displayInline">
										<div class="input-group resp-org"
											style="margin: auto; display: inline !important;">
											<springForm:input type="hidden" path="inChargeFacilityId"
												id="inChargeFacilityId" name="inChargeFacilityId" readonly=""
												ng-value="facilityFacilityInCharge.areaNId" />
											<input type="text" placeholder="Select Facility"
												id="designation2" ng-disabled="disableOtherDtls"
												class="form-control not-visible-input middleWidth inputBackground dropdown-moz"
												name="designation" readonly="" ng-model="facilityFacilityInCharge.name">
											<div class="input-group-btn" style="position: relative;">
												<button type="button" ng-disabled="disableOtherDtls"
													class="btn btn-danger dropdown-toggle user-button"
													data-toggle="dropdown">
													<span class="caret"></span>
												</button>
												<ul class="dropdown-menu level-dropdown" role="menu">
													<li ng-if="facility.facilityType.id == selectedFacilityTypeForIncharge.key" ng-repeat="facility in facilityListForFacilityInCharge | orderBy : 'name'"
														ng-click="selectfacilityForIncharge(facility);"><a href="">{{facility.name}}</a></li>
												</ul>
											</div>
										</div>

									</div>
								</div>
								
								<div class="text-left prof-bottom ">
									<h5 class="userBorder">Identification Information</h5>
								</div>
								

								<div class="form-group user-res-tab  ">
									<label class="col-md-3 spcres" for="textinput">User Name <span
										class="mandatory_star">&#42;</span></label>
									<div class="col-md-9 frst-bottom  col-xs-12">
									<ul class="display-components-inline">
									<li>
										<springForm:input path="username" type="hidden" id="userID1"
											ng-value="newuser.userID"
											class="form-control useridwidth inputBackground" /></li>
										<li><input type="text" id="userID" placeholder="Enter User Name"
											maxlength="30" ng-disabled="disableOtherDtls"
											ng-model="newuser.userID"
											ng-blur="checkUser(newuser.userID,'usererror')"
											onPaste="return false" class="form-control useer user-input-id inputBackground"
											user-name-validation
											autocomplete="off"></li>
									</ul>
									</div>
								
								</div>
								

								<div class="form-group" ng-show="isError && new_user"
									style="margin-top: -20px;">
									<label class="col-md-3" for="textinput"></label>
									<div class="col-md-9">
										<div id="usererror" class="error-style"></div>
										<div>
											<span ng-show="aval">Available:</span>
											<ul class="user-availability">
												<li ng-repeat="avluser in suggestedUser"
													ng-click="setUserName(avluser)"><a href="">{{avluser
														| limitTo:30}}</a></li>
											</ul>
										</div>
									</div>
								</div>
								<span ng-show="isError && new_user"></span>
								<div class="form-group">
									<label class="col-md-3 col-sm-12 col-xs-12 " for="textinput">ID
										Proof&nbsp;(Aadhaar Card) </label>
									<div
										class="col-md-9 col-sm-12 col-xs-12 prof-bottom1 id-aadhar  displayInline upld-mob-resp">
										<ul class="display-components-inline display-inline-ie">
										<li></li>
											<li><springForm:input path="adharCardPhotoNumber"
													type="hidden" id="location" ng-value="newuser.idproof1"
													class="form-control inputBackground" maxlength="12" /> <input
												type="text" id="location2"
												placeholder="Enter Aadhaar Card No" style="height: 31px;"
												ng-model="newuser.idproof1" ng-disabled="disableOtherDtls"
												class="form-control inputBackground user-input-id"
												onPaste="return false"
												ng-keyUp="validateAdhar(newuser.idproof1,'adharError')"
												only-twelve-digits autocomplete="off" /> <span
												id="adharError" class="error-style upload-valid"></span></li>

											<li>
											<button class="upload btn btn-primary upload-right-button upload-tab" type="button"
											id="adharbtnupload" ng-disabled="disableOtherDtls" >UPLOAD</button>
											<input type="file" class="file" accept="image/*"
											id="adharFile"
											onchange="angular.element('body').scope().getAdharFile(this)"
											ng-model="adharUpload" value="adharfiles[0]" />
											 <springForm:input path="adharCardPhotoFilePath" type="hidden"
												ng-value="aadharImage" />					
											</li>
											<li class="id-proof-ie"><img id="image2" ng-src={{aadharImage}} alt="No image"
											height="45" width="45" ng-show="adharfiles!=undefined"
											data-action="zoom" class="pancard-image">
											  <img id="image2" ng-src={{aadharImage}}  onerror="angular.element(this).scope().imgError('adharFile')"
												height="45" width="45" ng-show="updatediv"
											data-action="zoom" class="pancard-image">
											</li>
											 <li><span>Upload scanned copy</span></li>							
										
										</ul>
								</div>
								

								<div class="form-group">
									<label class="col-md-3 col-sm-12 col-xs-12 " for="textinput">ID
										Proof&nbsp;(PAN Card) </label>
									<div
										class="col-md-9 col-sm-12 col-xs-12 prof-bottom1 id-aadhar  displayInline ">
										<ul class="display-components-inline display-inline-ie">
										<li></li>
										<li>
										<springForm:input path="panCardPhotoNumber" type="hidden"
											id="panNo" ng-value="newuser.idproof2"
											class="form-control inputBackground" />
											<input type="text" id="panNo1" placeholder="Enter PAN Card No"
											capitalize ng-model="newuser.idproof2" style="height:31px;"
											ng-disabled="disableOtherDtls" onPaste="return false"
											ng-keyUp="validatePan(newuser.idproof2,'panError')"
											ten-alpha-numeric-validation class="form-control user-input-id inputBackground"
											maxlength="10" autocomplete="off" />									
													<span id="panError" class="error-style upload-valid"></span>							
											</li>

										<li>
										<button class=" btn btn-primary upload-right-button up-load-profile upload-tab" type="button"
											id="panButton" ng-disabled="disableOtherDtls">UPLOAD</button>
											<input type="file" class="file" id="panNumber" accept="image/*"
											onchange="angular.element('body').scope().getPanFile(this)"
											ng-model="panUpload" value="panfiles[0]" /> <springForm:input
												path="panCardPhotoFilePath" type="hidden"
												ng-value="panImage" />
											</li>
											<li class="id-proof-ie">
											<img id="image3" ng-src={{panImage}}  height="45"
											width="45" data-action="zoom" class="pancard-image pan-image" onerror="angular.element(this).scope().imgError('panNumber')"
											ng-show="panfiles!=undefined"/>
											<img id="image3" ng-src={{panImage}} alt="No image" height="45"
											width="45" data-action="zoom" class="pancard-image pan-image"
											ng-show="updatediv"/>
											</li>
											 <li><span class="pan-uplaoad-msg">Upload scanned copy</span></li>											
						
									</ul>
										

									</div>
									<%-- <span><div id="panError" class="error-style adhar-error-msg"></div>
									<input type="file" class="file" id="panNumber" accept="image/*"
											onchange="angular.element('body').scope().getPanFile(this)"
											ng-model="panUpload" value="panfiles[0]" /> <springForm:input
												path="panCardPhotoFilePath" type="hidden"
												ng-value="panImage" />
									</span> --%>
									<%-- <ul>
											<li><div id="panError" class="error-style adhar-error-msg"></div></li>
										  <li><input type="file" class="file" id="panNumber" accept="image/*"
											onchange="angular.element('body').scope().getPanFile(this)"
											ng-model="panUpload" value="panfiles[0]" /> <springForm:input
												path="panCardPhotoFilePath" type="hidden"
												ng-value="panImage" /></li>
										</ul>  --%>
									
									<!-- <div class="form-group display-parent">
									<label class="col-md-3 label-dsplay">&nbsp;</label>
									<div class="col-md-9 col-sm-12 frst-bottom col-xs-12 id-proof-tab text-center">
									<div class="display-web">
									<button class=" btn btn-primary upload-right-button up-load-profile" type="button"
											id="panButton" ng-disabled="disableOtherDtls">UPLOAD</button>
										<img id="image3" ng-src={{panImage}} alt="No image" height="45"
											width="45" data-action="zoom" class="pancard-image pan-image"
											ng-show="panfiles!=undefined"/>
											 <span class="pan-uplaoad-msg">Upload scanned copy of your ID proof</span>
											 </div>
									</div>
									</div> -->
								</div>
							

								<div class="form-group">
									<label class="col-md-3" for="textinput">&nbsp;</label>
									<div class="col-md-9 displayInline">
										<input type="checkbox" ng-model="agreecheckbox" class="mobile-input">
										<h5 class="acceptingInfo">I agree that I have read and
											understood the checklist and its SOP and I am authorized to
											conduct the supportive supervision.</h5>
									</div>
								</div>
								

								<div class="form-group">

									<div class="col-md-12 frst-bottom text-center  tab-top">
										<button ng-show="submitresetdiv"
											ng-disabled="agreecheckbox? false : true"
											ng-model="submitbutton" id="buttonsubmit" name="buttonsubmit"
											class="btn btn-info" ng-click="validateUser()" type="button">SUBMIT</button>
										<button ng-show="submitresetdiv" id="buttonreset"
											ng-disabled="selectedSalutation || (saluationImage && files) || newuser.firstname || newuser.middlename || newuser.lastname || 
											gender1 || newuser.dob || newuser.mobileNum || newuser.emailID || newuser.otp || newuser.secondaryemailID || 
											selectedLevel || selectedFacilityType || selectedState || selectedDist || selectedBlock || selectedFacility || 
											selectedOrganization || selectedDevSector || selectedDeg || newuser.userID || newuser.idproof1 || (aadharImage && adharfiles) || 
											newuser.idproof2 || (panImage && panfiles) ? false : true"
											name="buttonreset" ng-click="resetmodal()"
											class="btn btn-info" type="button">RESET</button>

										<button ng-show="updatediv"
											ng-disabled="agreecheckbox? false : true"
											ng-model="submitbutton" id="buttonsubmit" name="buttonsubmit"
											class="btn btn-info" ng-click="validateUser()" type="button">UPDATE</button>

									</div>
								</div>
								

							</div>
						</div>
					</div>
				</div>
			</fieldset>
		</springForm:form>
	</div>


	 <div id="errorMessageCorrupt" class="modal fade" role="dialog"
		data-backdrop="static" data-keyboard="false">
		<div class="modal-dialog">
			Modal content
			<div class="modal-content ">
				<div class="modal-body text-center corrupt-modal">
					<div class="errorhead"><img alt="" src="resources/images/icons/Messages_warning_caution_icon.svg" style="width: 25px; margin-top: -5px;">&nbsp;ERROR</div>
					<div class="errorbody">{{errorMsg}}</div>
					<button type="button" class="btn errorOk" ng-click="focusinput()">Close</button>
				</div>
			</div>
		</div>
	</div> 
	
	<div id="errorMessage" class="modal fade" role="dialog"
		data-backdrop="static" data-keyboard="false">
		<div class="modal-dialog">
			Modal content
			<div class="modal-content">
				<div class="modal-body text-center">
					<div class="errorhead"><img alt="" src="resources/images/icons/Messages_warning_caution_icon.svg" style="width: 25px; margin-top: -5px;">&nbsp;ERROR</div>
					<div class="errorbody">{{errorMsg}}</div>
					<button type="button" class="btn errorOk" ng-click="focusinput()">Close</button>
				</div>
			</div>
		</div>
	</div>
	
	

	<div id="errorMessage-update" class="modal fade" role="dialog"
		data-backdrop="static" data-keyboard="false">
		<div class="modal-dialog">
			<!-- Modal content -->
			<div class="modal-content">
				<div class="modal-body text-center">
					<div class="errorhead"><img alt="" src="resources/images/icons/Messages_warning_caution_icon.svg" style="width: 25px; margin-top: -5px;">&nbsp;ERROR</div>
					<div class="errorbody">{{errorMsg}}</div>
					<button type="button" class="btn errorOk" data-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>
	<div id="infoMessage1" class="modal fade" role="dialog"
		data-backdrop="static" data-keyboard="false">
		<div class="modal-dialog">
			<!-- Modal content -->
			<div class="modal-content">
				<div class="modal-body text-center">
					<div class="infohead">
						 <img alt="" src="resources/images/icons/Messages_info_icon.svg"
							style="width: 25px; margin-top: -5px;">&nbsp; 
						INFO
					</div>
					<div class="warnbody">Please confirm if you want to clear the
						data entered.</div>
					<span><button type="button" class="btn errorOk"
							id="uploadModal" ng-click="reset()">Yes</button></span>
					<button type="button" class="btn errorOk" data-dismiss="modal">No</button>
				</div>
			</div>
		</div>
	</div>
	<jsp:include page="fragments/footer.jsp"></jsp:include>

	<div id="infoMessage-user" class="modal fade" role="dialog"
		data-backdrop="static" data-keyboard="false">
		<div class="modal-dialog">
			
			<div class="modal-content">
				<button type="button" class="custom-close close summery-close"
					data-dismiss="modal">&times;</button>
				<div class="modal-body text-center">
					<div class="infohead">USER SUMMARY</div>
					<div  class="container " >
						
						<div class="container user-container">
						<div class="userSelection text-left">
							<h5 class="userBorder">Personal Information</h5>
						</div>
							<div class="row">
								<div class="col-md-12 ">
									<div class="container-fluid" style="margin-top:30px;">
									<div class="form-group">
									<label class="col-md-3 col-xs-12 text-left" for="textinput">
												Profile Image<span class="mandatory_star">&#42;</span>
											</label>
											<div class="col-md-9  text-left sal-upload-file frst-bottom">
												<div class="col-md-6 sal-width">
												<img class="update-image modal-img update-image-summary-moz"
													ng-show="!updateimage && salutationUploadName1!=null"
													ng-src="{{!updateimage?salutationUploadName1:null}}">
												<img id="image4" ng-show="updateimage"
													ng-src={{saluationImage}} alt="No image" height="45"
													width="45" class="update-image modal-img">
											</div>
											</div>
									</div>
										<div class="form-group">
											<label class="col-md-3 col-xs-12 text-left" for="textinput">
												Salutation<span class="mandatory_star">&#42;</span>
											</label>
											<div class="col-md-9 col-xs-12 col-sm-12 frst-bottom">
											<div class="col-md-6 sal-width ">

												<div class="input-group"
													style="margin: auto; display: inline !important;">
													<input type="text" placeholder="Select Salutation"
														id="salutation"
														class="form-control not-visible-input  inputBackground"
														name="state" ng-disabled="true"
														ng-model="selectedSalutation.value" />
													<div class="input-group-btn" style="position: relative;">
														<ul class="dropdown-menu sal-dropdown" id="saldrop"
															role="menu">
															<li ng-repeat="sal in salutationArray"
																ng-click="selectSalutation(sal);"><a href="">{{sal.value}}</a></li>
														</ul>
													</div>
												</div>
											</div>
											
										
										</div>
										
										<div class="form-group">
											<label class="col-md-3 col-xs-12 text-left" for="textinput">
												First Name <span class="mandatory_star">&#42;</span>
											</label>
											<div class="col-md-9 frst-bottom">
											<div class="col-md-12 col-xs-12 col-sm-12">
												<input type="text" id="firstname"
													placeholder="Enter First Name"
													oninvalid="this.setCustomValidity('Please enter firstname')"
													oninput="setCustomValidity('')" required ng-disabled="true"
													ng-model="newuser.firstname" ng-change="changeUser()"
													class="form-control inputBackground input-modal-summary"
													fhirty-characters-validation autocomplete="off" />
													</div>
											</div>
										</div>
										
										<div class="form-group">
											<label class="col-md-3 col-xs-12 text-left" for="textinput">
												Middle Name </label>
											<div class="col-md-9 col-sm-12 col-xs-12 frst-bottom">
											<div class="col-md-12 col-xs-12 col-sm-12">
												<input type="text" id="middlename"
													placeholder="Enter Middle Name"
													ng-model="newuser.middlename" ng-change="changeUser()"
													ng-disabled="true" class="form-control inputBackground input-modal-summary"
													fhirty-characters-validation autocomplete="off" />
													</div>
											</div>
										</div>
									
										<div class="form-group">
											<label class="col-md-3 col-xs-12 text-left" for="textinput">
												Last Name <span class="mandatory_star">&#42;</span>
											</label>
											<div class="col-md-9 frst-bottom">
											<div class="col-sm-12 col-md-12 col-xs-12">
												<input type="text" id="lastname"
													placeholder="Enter Last Name" ng-model="newuser.lastname"
													ng-change="changeUser()" ng-disabled="true"
													class="form-control inputBackground input-modal-summary"
													fhirty-characters-validation autocomplete="off" />
													</div>
											</div>
										</div>
										
										<div class="form-group">
											<label class="col-md-3 col-xs-12 text-left" for="textinput">
												Gender <span class="mandatory_star">&#42;</span>
											</label>
											<div class="col-md-9 frst-bottom text-left">
												<div class="col-md-12 col-sm-12 col-xs-12">
												<label class="modal-margin-right"> <input type="radio"
													ng-disabled="true" name="radio" id="m" class="marginLM"
													value="98" ng-model="gender1" /> Male
												</label> <label class="modal-margin-right"> <input type="radio"
													ng-disabled="true" name="radio" id="f" class="marginLF"
													value="99" ng-model="gender1" />Female
												</label> <label class="modal-margin-right"> <input type="radio"
													ng-disabled="true" name="radio" id="f" class="marginLF"
													value="100" ng-model="gender1" />Other
												</label>
												</div>
											</div>
										</div>
									
										<div class="form-group">
											<label class="col-md-3 col-xs-12 text-left" for="textinput">Date
												of Birth <span class="mandatory_star">&#42;</span>
											</label>
											<div class="col-md-9 frst-bottom">
											<div class="col-md-6 col-xs-12">
												<input type="text" id="dob" placeholder="DD-MM-YYYY"
													ng-model="newuser.dob" ng-disabled="true"
													class="form-control inputBackground" />
												</div>
											</div>
										</div>
										

										<div class="form-group">
											<label class="col-md-3 col-xs-12 text-left" for="textinput">Mobile
												Number <span class="mandatory_star">&#42;</span>
											</label>
											<div class="col-md-9 frst-bottom">
												<div class="col-md-6 col-xs-12 col-sm-12">
												<input type="text" id="mobileNum"
													placeholder="Enter Mobile Number"
													ng-model="newuser.mobileNum"
													ng-keyUp="validatePhone(newuser.mobileNum,'phoneNoError')"
													ng-blur="checkPhoneNo(newuser.mobileNum,'checkNoError')"
													ng-disabled="true" class="form-control inputBackground"
													only-ten-digits autocomplete="off" />
												<div id="phoneNoError" class="error-style"></div>
												<div id="checkNoError" class="error-style"></div>
												</div>
											</div>
										</div>
										

										<div class="form-group">
											<label class="col-md-3 col-xs-12 text-left" for="textinput">Primary
												Email ID <span class="mandatory_star">&#42;</span>
											</label>
											<div class="col-md-9 frst-bottom">
											<div class="col-md-6 col-xs-12 col-sm-12">
												<input type="text" id="emailID"
													placeholder="Enter Primary Email ID" ng-disabled="true"
													ng-model="newuser.emailID"
													ng-pattern="/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/"
													ng-keyUp="validateEmail(newuser.emailID,'emailError')"
													ng-blur="checkEmailAvailablity(newuser.emailID,'checkEmailError')"
													class="form-control inputBackground" autocomplete="off"
													ng-change="generateOtpEmail()" />
												<div id="emailError" class="error-style"></div>
												<div id="checkEmailError" class="error-style"></div>
												</div>
											</div>
										</div>
										

										<div class="form-group">
											<label class="col-md-3 col-xs-12 text-left" for="textinput">Secondary
												Email ID </label>
											<div class="col-md-9 frst-bottom">
												<div class="col-md-6 col-xs-12 col-sm-12">
												<input type="text" id="secondaryemailID"
													placeholder="Enter Secondary Email ID" ng-disabled="true"
													ng-model="newuser.secondaryemailID"
													ng-pattern="/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/"
													ng-keyUp="validateEmail(newuser.secondaryemailID,'emailError1')"
													class="form-control inputBackground" autocomplete="off" />
												<div id="emailError1" class="error-style"></div>
												<div id="emailError2" class="error-style"></div>
												</div>
											</div>
										</div>
										
										<!-- ---------End personal info------------------ -->
										<!-- ----------------Professional info start------------------- -->

										<div class="userSelection text-left">
											<h5 class="userBorder">Professional Information</h5>
										</div>
									


										<div class="form-group">
											<label class="col-md-3 text-left col-xs-12" for="textinput">User
												Level <span class="mandatory_star">&#42;</span>
											</label>
											<div class="col-md-9 col-xs-12 modal-user-bottom">
												 <div class="col-md-6 col-sm-6 col-xs-12 summary-tab-margin"
													style="display: inline !important;">
													<input path="designationId" type="text"
														placeholder="Select User level" id="userlevel"														
														class="form-control not-visible-input  inputBackground"
														name="userlevel" ng-disabled="true"
														ng-model="selectedLevel.levelName">
													<div class="input-group-btn" style="position: relative;">
													</div>
												</div> 


												<div class="col-md-6 col-sm-6 col-xs-12 "
													ng-show="selectedLevel.levelID==8">
													<div class="input-group"
														style="margin: auto; display: inline !important;">
														<input type="text" placeholder="Select Facility Type"
															id="facilitytype" 
															class="form-control not-visible-input  inputBackground"
															name="facility-type" ng-disabled="true"
															ng-model="selectedFacilityType.value"
															ng-change="facilityTypeSelected()">
														<div class="input-group-btn" style="position: relative;">
														</div>
													</div>
												</div>
											</div>
										</div>


										<div class="form-group"
											ng-if="(selectedLevel.levelID !=1 && locationshow) || (userDetails.userLevel !=1 && userDetails.userLevel != null)">
											<label class="col-md-3 col-sm-6 col-xs-12 text-left"
												for="textinput">Location <span
												class="mandatory_star">&#42;</span></label>
											<div class="col-md-9 col-xs-12 modal-user-bottom">
												<div class="col-md-6 col-sm-6 col-xs-12 summary-tab-margin"
													ng-disabled="selectedLevel.levelID !=1 ? false : true">
													<div class="input-group stylclsrespnsv1">
														<input type="text" path="stateName"
															placeholder="Select State" id="state"
															class="form-control not-visible-input  inputBackground"
															name="state" ng-disabled="true"
															ng-model="selectedState.name" />
														<div class="input-group-btn" style="position: relative;">
															<ul class="dropdown-menu state-dropdown" role="menu">
																<li ng-repeat="state in stateList | orderBy : 'name'"
																	ng-click="selectState(state);"><a href="">{{state.name}}</a></li>
															</ul>
														</div>
													</div>
												</div>
												<div class="col-md-6 col-sm-6 col-xs-12 "
													ng-show="selectedLevel.levelID !=1 && selectedLevel.levelID !=2 ? true : false">
													<div class="input-group"
														style="margin: auto; display: inline !important;">
														<input type="text" placeholder="Select District"
															id="district"
															class="form-control not-visible-input  inputBackground"
															name="state" ng-disabled="true"
															ng-model="selectedDist.name" />
														<div class="input-group-btn" style="position: relative;">
														</div>
													</div>
												</div>
											</div>
										</div>


										<div class="form-group">
											<label class="col-md-3"></label>
											<div class="col-md-9 col-xs-12 col-sm-12 modal-user-bottom">
											<div class="col-md-6 col-sm-6 col-xs-12 summary-tab-margin"
												
												ng-show="selectedFacilityType.key!=17 && selectedLevel.levelID !=1 && selectedLevel.levelID !=2 && selectedLevel.levelID !=4">
												<div class="input-group"
													style="margin: auto; display: inline !important;">

													<input type="text" placeholder="Select Block" id="block"
														class="form-control not-visible-input  inputBackground"
														name="state" ng-disabled="true"
														ng-model="selectedBlock.name" />
													<div class="input-group-btn" style="position: relative;">
													</div>
												</div>
											</div>
											<div class="col-md-6 col-sm-6 col-xs-12 "
												ng-show="selectedLevel.levelID !=1 && selectedLevel.levelID !=2 && selectedLevel.levelID !=4 && selectedLevel.levelID !=5 ? true : false">
												<div class="input-group"
													style="margin: auto; display: inline !important;">

													<input type="text" placeholder="Select Facility"
														id="facility"
														class="form-control not-visible-input  inputBackground"
														name="facility" ng-disabled="true"
														ng-model="selectedFacility.name" />
													<div class="input-group-btn" style="position: relative;">
													</div>
												</div>
											</div>
											</div>
										</div>
										<span
											ng-if="(selectedLevel.levelID !=1 && locationshow) || (userDetails.userLevel !=1 && userDetails.userLevel != null)"><br>
											<br></span>

										<div class="form-group frst-bottom org-moz">

											<label class="col-md-3 text-left  col-xs-12" for="textinput">
												Organization<span class="mandatory_star">&#42;</span>
											</label>
											<div class="col-md-9 frst-bottom">
												<div class="col-md-6 col-xs-12 col-sm-6">
												<div class="input-group"
													style="margin: auto; display: inline !important;">
													<input type="text" placeholder="Select Organization"
														id="organization"
														class="form-control not-visible-input  inputBackground"
														name="state" ng-disabled="true"
														ng-model="selectedOrganization.value" />
													<div class="input-group-btn" style="position: relative;">
														<ul class="dropdown-menu level-dropdown" role="menu">
															<li ng-repeat="org in organizationArray"
																ng-click="selectOrganization(org);"><a href="">{{org.value}}</a></li>
														</ul>
													</div>
												</div>
												</div>
												<div class="col-md-6 col-xs-6 col-sm-6"></div>
											</div>
										</div>
									
										<div class="form-group frst-bottom" ng-if="selectedOrganization.key == 5">
											<label class="col-md-3 col-xs-12 text-left" for="textinput">
												Specify development sector<span class="mandatory_star">&#42;</span>
											</label>
											<div class="col-md-9 frst-bottom">
												<div class="col-md-6 col-xs-12 col-sm-6">
												<div class="input-group"
													style="margin: auto; display: inline !important;">
													<input type="text" placeholder="Select Development Sector"
														id="devSector"
														class="form-control not-visible-input  inputBackground"
														name="devSector" ng-disabled="true"
														ng-model="selectedDevSector.value" />
													<div class="input-group-btn" style="position: relative;">
														<ul class="dropdown-menu level-dropdown" role="menu">
															<li ng-repeat="partner in developmentPartners"
																ng-click="selectPartner(partner);"><a href="">{{partner.value}}</a></li>
														</ul>
													</div>
												</div>
												</div>
												<div class="col-md-6 col-xs-12 col-sm-12"></div>
											</div>
										</div>
										<span ng-if="selectedOrganization.key == 5"><br> <br></span>
										<div class="form-group large-bottom">
											<label class="col-md-3 text-left  col-xs-12" for="textinput">Designation
												<span class="mandatory_star">&#42;</span>
											</label>
											<div class="col-md-9 frst-bottom designation-bottom">
											<div class="col-md-6 col-xs-12 col-sm-6">
												<div class="input-group"
													style="margin: auto; display: inline !important;">

													<input type="text" placeholder="Select Designation"
														id="designation2"
														class="form-control not-visible-input  inputBackground"
														name="designation" ng-disabled="true"
														ng-model="selectedDeg.value">
													<div class="input-group-btn" style="position: relative;">
														<ul class="dropdown-menu level-dropdown" role="menu">
															<li ng-repeat="deg in designations"
																ng-click="selectDeg(deg);"><a href="">{{deg.value}}</a></li>
														</ul>
													</div>
												</div>
												</div>
												<div class="col-md-6 col-xs-6 col-sm-6"></div>
											</div>
										</div>
																				
										<div class="form-group frst-bottom" ng-if="selectedDeg && selectedDeg.isFacilityInCharge">
											<label class="col-md-3 text-left  col-xs-12" for="textinput">Facility Type
												<span class="mandatory_star">&#42;</span>
											</label>
											<div class="col-md-9 frst-bottom designation-bottom">
											<div class="col-md-6 col-xs-12 col-sm-6">
												<div class="input-group"
													style="margin: auto; display: inline !important;">

													<input type="text" placeholder="Select Facility Type"
														id="designation2"
														class="form-control not-visible-input  inputBackground"
														name="designation" ng-disabled="true"
														ng-model="selectedFacilityTypeForIncharge.value">
													<div class="input-group-btn" style="position: relative;">
														<ul class="dropdown-menu level-dropdown" role="menu">
															<li ng-repeat="facilityType in facilityTypeForArea | orderBy : 'value'"
																ng-click="selectfacilityTypeForDeg(facilityType);"><a href="">{{facilityType.value}}</a></li>
														</ul>
													</div>
												</div>
												</div>
												<div class="col-md-6 col-xs-6 col-sm-6"></div>
											</div>
										</div>
										
										<div class="form-group frst-bottom" ng-if="selectedDeg && selectedDeg.isFacilityInCharge
											&& selectedFacilityTypeForIncharge && selectedFacilityTypeForIncharge.key != 105 
											&& selectedLevel && selectedLevel.levelID!=5" class="form-group">
											<label class="col-md-3 text-left  col-xs-12" for="textinput">Block
												<span class="mandatory_star">&#42;</span>
											</label>
											<div class="col-md-9 frst-bottom designation-bottom">
											<div class="col-md-6 col-xs-12 col-sm-6">
												<div class="input-group"
													style="margin: auto; display: inline !important;">

													<input type="text" placeholder="Select Facility Type"
														id="designation2"
														class="form-control not-visible-input  inputBackground"
														name="designation" ng-disabled="true"
														ng-model="blockForFacilityInCharge.name">
													<div class="input-group-btn" style="position: relative;">
														<ul class="dropdown-menu level-dropdown" role="menu">
															<li ng-repeat="blockForFacilityInCharge in blockListForFacilityInCharge | orderBy : 'value'"
																ng-click="selectBlockForInCharge(blockForFacilityInCharge);"><a href="">{{blockForFacilityInCharge.name}}</a></li>
														</ul>
													</div>
												</div>
												</div>
												<div class="col-md-6 col-xs-6 col-sm-6"></div>
											</div>
										</div>
										
										
										<div class="form-group frst-bottom" ng-if="(selectedFacilityTypeForIncharge && 
										facilityListForFacilityInCharge && facilityListForFacilityInCharge.length > 0 ) ||
										 selectedFacilityTypeForIncharge && selectedLevel && selectedLevel.levelID == 5" class="form-group">
											<label class="col-md-3 text-left  col-xs-12" for="textinput">Facility
												<span class="mandatory_star">&#42;</span>
											</label>
											<div class="col-md-9 frst-bottom designation-bottom">
											<div class="col-md-6 col-xs-12 col-sm-6">
												<div class="input-group"
													style="margin: auto; display: inline !important;">

													<input type="text" placeholder="Select Facility Type"
														id="designation2"
														class="form-control not-visible-input  inputBackground"
														name="designation" ng-disabled="true"
														ng-model="facilityFacilityInCharge.name">
													<div class="input-group-btn" style="position: relative;">
														<ul class="dropdown-menu level-dropdown" role="menu">
															<li ng-if="facility.facilityType.id == selectedFacilityTypeForIncharge.key" ng-repeat="facility in facilityListForFacilityInCharge | orderBy : 'name'"
														ng-click="selectfacilityForIncharge(facility);"><a href="">{{facility.name}}</a></li>
														</ul>
													</div>
												</div>
												</div>
												<div class="col-md-6 col-xs-6 col-sm-6"></div>
											</div>
										</div>
										
										<div class=" text-left identi-info">
											<h5 class="userBorder">Identification Information</h5>
										</div>
										

										<div class="form-group">
											<label class="col-md-3 col-xs-12 text-left text-xs-left" for="textinput">User
												Name <span class="mandatory_star">&#42;</span>
											</label>
											<div class="col-md-9 col-sm-12 col-xs-12 frst-bottom">
											<div class="col-md-6 col-xs-12 col-sm-6">
												<input type="text" id="userID" placeholder="Enter User ID"
													maxlength="30" ng-disabled="true" ng-model="newuser.userID"
													ng-blur="checkUser(newuser.userID,'usererror')"
													class="form-control inputBackground user-input-input" autocomplete="off">
											</div>
											</div>

										</div>
										


										<div class="form-group">
											<label class="col-md-3 col-sm-12 col-xs-12 text-left"
												for="textinput">ID Proof&nbsp;(Aadhaar Card) </label>
											<div
												class="col-md-9 frst-bottom col-sm-12 col-xs-12 id-aadhar frst-bottom-aadhar-ie">
												<div class="col-md-6 col-sm-12 col-xs-12">
													<input type="text" id="location2"
														placeholder="Enter Aadhaar Card No"
														ng-model="newuser.idproof1"
														class="form-control inputBackground upload-tab"
														ng-disabled="true"
														ng-keyUp="validateAdhar(newuser.idproof1,'adharError')"
														only-twelve-digits autocomplete="off" />
												</div>
												<div class="col-md-6 col-sm-12 col-xs-12">
													<img id="aadhar-image" ng-src={{aadharImage}}
														alt="No image" style="float: left" height="33" width="40"
														ng-show="aadharImage!=undefined">

												</div>
											</div>


											<div class="form-group">
												<label class="col-md-3 col-sm-12 col-xs-12 text-left"
													for="textinput">ID Proof&nbsp;(PAN Card) </label>
												<div
													class="col-md-9 frst-bottom col-sm-12 col-xs-12 id-aadhar ">
													<div class="col-md-6 col-xs-12 col-sm-12">
														<input type="text" id="panNo1" 
															placeholder="Enter PAN Card No"
															ng-model="newuser.idproof2" ng-disabled="true"
															ng-keyUp="validatePan(newuser.idproof2,'panError')"
															only-alphabet-number class="form-control inputBackground upload-tab"
															maxlength="10" autocomplete="off" />
													</div>
													<div class="col-md-4 col-sm-12 col-xs-12">
														<img id="pan-image" ng-src={{panImage}} alt="No image"
															style="float: left" height="33" width="40"
															ng-show="panImage!=undefined">
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>



							<div ng-show="submitresetdiv" class="warnbody"
								style="font-weight: bold; font-size: 20px;">Please confirm
								if you wish to submit the registration form.</div>
							<div ng-show="updatediv" class="warnbody"
								style="font-weight: bold; font-size: 20px;">Please confirm
								if you wish to update the registration form.</div>
							<span><button style="margin-top: 15px;" type="button"
									class="btn errorOk" id="uploadModal" ng-click="finalSubmit()">Yes</button></span>
							<button style="margin-top: 15px;" type="button"
								class="btn errorOk" data-dismiss="modal">No</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	</div>
	<div id="pop1" class="modal fade" role="dialog" data-backdrop="static"
		data-keyboard="false">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-body text-center">
					<div class=successhead1><img alt="" src="resources/images/icons/Messages_success_icon.svg" style="width: 25px; margin-top: -5px;">&nbsp;User Registration Submitted</div>
					<div class="successbody">
						<span style="color: #A8C0B9;">Registration Submitted
							Successfully </span><br> After approval, Your User ID and Password
						will be sent to your Primary Email ID and Mobile Number within 15
						days.

					</div>
					<a class="btn btn-default" ng-href="home">Ok</a>
				</div>
			</div>
		</div>
	</div>

	<div id="pop" class="modal fade" role="dialog" data-backdrop="static"
		data-keyboard="false">
		<div class="modal-dialog">
			<!-- Modal content-->
			<div class="modal-content">
				<div class="modal-body text-center">
					<div class="successhead1">&nbsp;SUCCESS</div>
					<div class="successbody">{{msg}}</div>
					<a class="btn btn-default" ng-href="home">Ok</a>
				</div>
			</div>
		</div>
	</div>
	<merror:ModalError id="errorMessage"
		modalCssInfClass="${modalclassName}"
		modalConflictList="${modalformfail}"
		modalFailList="${modalfailError}"
		modalFacilityInchargeList="${modalfacilityinchargeList}">
	</merror:ModalError>
	
	

	<script src="resources/js/jquery-ui.js"></script>
	<script
		src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	<script src="resources/js/angular.min.js"></script>
	<script type="text/javascript"
		src="resources/js/zooming.min.js"></script>
	<script type="text/javascript">
		
	</script>
	<script type="text/javascript"
		src="resources/js/controllers/newUserController.js"></script>
	<script type="text/javascript"
		src="resources/js/angularDirective/directive.js"></script>

	<script type="text/javascript">
		
	</script>
	<script type="text/javascript">
		$(document).ready(function() {
			$(".user-profile").addClass('active');
			

			/* $("#dob").datepicker({
				dateFormat : "dd-mm-yy",

				changeMonth : true,
				changeYear : true,
				minDate : "-100Y",
				yearRange : "c-100:c",
				//showButtonPanel: true,
				maxDate : '-18Y',
			// minDate: '@minDate'
			}); */
		
			$("#calenderIcon").click(function() {
				$("#dob").datepicker("show");
			});

			$('input').blur(function() {
				var value = $.trim($(this).val());
				$(this).val(value);
			});

		});
	</script>
	<!-- <script type="text/javascript">
	$(document).ready(function() {
		$(".useer").on("keypress", function(e) {
			var space = '/^\S';
		    if (e.which === 32 && e.space)
		        e.preventDefault();
		});
	});
	</script> -->
	<script type="text/javascript">
	function nospaces(t){
		  if(t.value.match(/\s/)){
		    t.value=t.value.replace(/\s/,'');
		  }
		}	
	</script>
</body>
</html>