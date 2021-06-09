<!-- 
@author Devikrushna Suman
 -->
<%@page import="com.itextpdf.text.log.SysoLogger"%>
<%@page import="java.util.HashMap"%>
<%@page import="java.util.Map"%>
<%@page import="org.sdrc.ess.model.web.UserDesignationFeaturePermissionMappingModel"%>
<%@page import="org.sdrc.ess.model.mobile.UserAreaMappingModel"%>
<%@page import="org.sdrc.ess.domain.UserAreaMapping"%>
<%@ page import="org.sdrc.ess.util.Constants"%>
<%@ page import=" org.sdrc.ess.model.web.EssUserModel"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.List"%>
<!--logo part end-->
<!-- spinner -->

<%
Integer designationId = 0;
Integer userLevel = 0;
EssUserModel user = null;
List<String> features = new ArrayList<String>();
List<String> permissions = new ArrayList<String>();
Boolean openItems = false;
if (request.getSession().getAttribute(Constants.Web.USER_PRINCIPAL) != null) {
	user = (EssUserModel) request.getSession().getAttribute(Constants.Web.USER_PRINCIPAL);
	
	if(user.getUserDesignationFeaturePermissionMappingModels() != null && 
			!user.getUserDesignationFeaturePermissionMappingModels().isEmpty()){
		
		List<UserDesignationFeaturePermissionMappingModel> u = user.getUserDesignationFeaturePermissionMappingModels();
		
		if(u != null){
			List<Integer> designationFeaturePermissionIds = null;
			Map<String,String> map = new HashMap<String, String>();
			for(UserDesignationFeaturePermissionMappingModel udfp : u){
				map.put(udfp.getRoleFeaturePermissionSchemeModel().getFeaturePermissionMapping().getFeature().getFeatureName(), 
						udfp.getRoleFeaturePermissionSchemeModel().getFeaturePermissionMapping().getPermission().getPermissionName());
// 				System.out.println(udfp.getRoleFeaturePermissionSchemeModel().getRoleFeaturePermissionSchemeId());
			}
			openItems = map.containsKey("openItems") ? true : false;
		}
	}
	designationId = user.getDesignationId();
	userLevel = user.getUserLevel();

	
}%>
<script>
	var user = <%=user%>;
	<%-- var user = <%=user!=null?user.getUserId():null%>; --%>
	var d = <%=designationId%>;
	var level = <%=userLevel%>;
</script>
<style type="text/css">
.nav .open>a{
	background-color:#333A3B !important;
}

</style>
<!-- 
<div id="spinner" class="loader" style="display: none;"></div>
<div id="loader-mask" class="loader" style="display: none;"></div> -->
<!-- /spinner -->
<nav class="navbar nav-menu-container navbar-fixed-top">
	<button class="navbar-toggle custom-navbar-mobile"
		style="z-index: 777; background-color: #f0bf7f;"
		data-toggle="collapse" data-target=".navbar-menu-collapse">
		<span class="icon-bar" style="background-color: #333a3b"></span> <span
			class="icon-bar" style="background-color: #333a3b"></span> <span
			class="icon-bar" style="background-color: #333a3b"></span>
	</button>
	<div class="container nav-section" >
		<div class="col-md-4 col-sm-4 col-xs-10 navbar-header" style="padding:0px">
			
				<div class="heading_partDesktop heading_part">
				<a href="home"><img class="logo1" src="resources/images/ess-logo.png" 
				alt="ess Logo" width="auto;" height="74px" style="height:40px"></a>
					<span class="ess-word">e Supportive Supervision</span>
				</div>
		
		</div>
		<div
			class="col-md-8 col-sm-9 col-xs-12 navHeaderCollapse2 navbar-menu-collapse responsive-nav collapse navbar-collapse"
			data-hover="dropdown">

<!-- 			<div class="welcome-user hidden-sm"> -->
<!-- 				<h5> -->
<!-- 					Welcome <b></b> -->
<!-- 				</h5> -->
<!-- 			</div> -->
			
			<ul class="nav navbar-nav navbar-right nav-submenu nav-place-right">
			<li><%if(user!=null){ %>
			<div class="welcome-user hidden-sm">
				<h5>Welcome <b><%=user.getSalutation()%> <%=user.getFirstName()%></b></h5>
				<input type="hidden" id="userId" value=<%=user.getFullName()%>>
				<input type="hidden" id="userLevel" value=<%=user.getUserLevel()%>>
			</div>
			<%} %></li>

				<li class="home-active "><div class="topMenuLinks"><a class="home-active" href="home">&nbsp;Home</a></div></li>
				<li class="about-active "><div class="topMenuLinks"><a class="about-active" href="aboutUs">&nbsp;About Us</a></div></li>
				<!-- <li><a href="dashboard"><div>&nbsp;Dashboard</div></a></li> -->
				<li class="gallery-active dropdown media-menu" style="pointer-events:auto!important">
				<div class="topMenuLinks">&nbsp;Gallery
				<a class="dropdown-toggle " data-toggle="dropdown" href="#"  >
				 <span class="caret"></span>
       				 <ul class="dropdown-menu bg_drk">
          			<li class="drp_1"><a href="gallery">Photo Gallery</a></li>
          			<li class="drp_1"><a href="videogallery">Video Gallery</a></li>	
          			</ul></a>			
				</div></li>
				<li class="resource-active"><div class="topMenuLinks"><a class="resource-active" href="resource">&nbsp;Resources</a></div></li>
				<!-- <li class="help-active"><div class="topMenuLinks"><a href="help">&nbsp;Help</a></div></li> -->
				<li class="contact-active"><div class="topMenuLinks"><a class="contact-active" href="home#contactUs">&nbsp;Contact Us</a></div></li>
				
				<%
					if (request.getSession().getAttribute(Constants.Web.USER_PRINCIPAL) == null) {
				%>
				<!-- <li ng-class="{'active' : activeMenu == 'advanceSearch'}"><a
					href="login">Log in</a></li> -->
				<%
					} else if (request.getSession().getAttribute(Constants.Web.USER_PRINCIPAL) != null) {
				%>
				<li ng-class="{'active' : activeMenu == 'advanceSearch'}"><div class="topMenuLinks"><a
					href="webLogout">Logout</a></div></li>
				<%
					}
				%>


			</ul>
		</div>
	</div>
</nav>
<%if(user!=null){ %>
<div class="menuSlideBtn">
	<button>
		Menu <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
	</button>
</div>
<%} %>
<div class="slideMenu" id="slideMenu">
	
<!-- 		<div class="slide-head-menu slide-head" style="color:#fff;">Menu</div> -->
		<div class="slide-head slide-menu-icon">
			<i class="fa fa-long-arrow-left slide-menu-icon" aria-hidden="true"></i>
		</div>
	<div class="link-container">

		<%
			if (user != null) {
		%>
		
			<div class="col-md-12 userprofile text-center">							
		<img class="header-profile-image" src='<%=user.getPhotoFilePath()%>' >
		</div>	
		<b class="username-header" style="color:#fff;"><%=user.getFullName()%></b>



		<ul class="pageLinks mainmenu vertical-menu slide_menusLinks" id="menulist">
			<%
				if (userLevel!=null && userLevel != 8 && (designationId != null && (designationId != 93 && designationId != 94) ) ) {
			%>
			
				<li class="dashboard" ng-class="{'active' : activeMenu == 'dashboard'}"><a class="dashboard"  href="dashboard"><b>Dashboard</b>&nbsp;</a></li>
				<hr class="line-menu">
			<%
				} if(designationId != null && (designationId != 93 && designationId != 94)){
			%>
			<li class="plan-menu"><a class="plan-menu" href="plan"><b>Plan</b>&nbsp; </a></li>
			<hr class="line-menu">
			<%
				}if (designationId!=null && (designationId != 93 && designationId != 94)) {
			%>
			<li><a href="https://prod2.sdrc.co.in/ess-de-test?userAgent=web" target="_blank"><b>Data Entry</b>&nbsp;</a></li>
			<hr class="line-menu"> 
			<%
				}
			%>
			<%
				if (userLevel!=null && userLevel != 8 && designationId != null) {
			%>
			
			
			<li><a href="#" ><b>Reports</b>&nbsp;
				<i class="fa fa-chevron-down thm-i" aria-hidden="true" style="font-size:10px;"></i></a>
				
				<ul class="report-menu-ul" style="display:none;">
			 		<%
			 			if(designationId != 93 && designationId != 94){
			 		%>
					<li ng-class="{'active': activeMenu == 'improvement'}"><a class="report-impr" href="improvementInFacility">Improvement In Facility</a></li>
					<!-- <hr class="line-child-menu"> -->
					<li ng-class="{'active': activeMenu == 'improvementCommunity'}"><a class="imprcmn" href="improvementInCommunity">Improvement In Community</a></li>
					<li ng-class="{'active': activeMenu == 'indicatorwisegap'}"><a class="report-indicator" href="indicatorWiseGap">Indicator Wise Gap</a></li>
					<li ng-class="{'active': activeMenu == 'planVsactual'}"><a class="report-planactual" href="planVsActualSupervision" >Planned Vs. Actual</a></li>
					<li ng-class="{'active': activeMenu == 'UnsupervisedFcility'}"><a class="report-unsuper" href="unsupervisedFacilityReport" >Unsupervised Facility</a></li>
					<li ng-class="{'active': activeMenu == 'actionitem'}"><a class="report-item" href="actionItemReport">Action Item Status</a></li>
					<li ng-class="{'active': activeMenu == 'delayactionitem'}"><a class="report-delay" href="delayActionItemReport">Delay In Action Item</a></li>
					<li ng-class="{'active': activeMenu == 'rawData'}"><a class="report-raw" href="rawDataReport">Raw Data</a></li>
					<li ng-class="{'active': activeMenu == 'designationWiseSubmission'}"><a class="report-desig" href="designationWiseSubmission">Designation Wise Submission</a></li>
					<%
			 			}else{
					%>
					<li ng-class="{'active': activeMenu == 'monitoringReportUser'}"><a class="report-desig" href="monitoringReportUser">Monitoring Report User</a></li>
					<li ng-class="{'active': activeMenu == 'monitoringReportFacility'}"><a class="report-desig" href="monitoringReportFacility">Monitoring Report Facility</a></li>
					<%
						}
					%>
				</ul>
			</li>
			<hr class="line-menu">
			<%
				}
			%>
			
			<%
				if (openItems) {
			%>
			<hr class="line-menu">
			<li class="open-items"><a class="open-item" href="openItems"><b>Open Items</b>&nbsp; </a></li>
			
			<%
				}
			%>
			<%
				if (userLevel!=null && userLevel != 8 && (designationId != null && (designationId != 93 && designationId != 94) ) ) {
			%>
			
			
			<hr class="line-menu">
			<li ng-class="{'active': activeMenu == 'thematic-view'}"><a class="thematic-view" href="thematicView"><b>Thematic View</b>&nbsp; </a></li>
			<hr class="line-menu">
			<li class="facility-view"><a class="facility-view" href="facilityView"><b>Facility View</b>&nbsp;</a></li>
			<hr class="line-menu">
			
			<%
				}
			%>
			<%
				if (designationId!=null && (designationId == 93 || designationId == 94)) {
			%>
			
			<li ng-class="{'active' : activeMenu == 'user management'}"><a class="user-mgmt" href="userManagement"><b>User Management</b>&nbsp;</a></li>
				<hr class="line-menu">		
		
			<li ng-class="{'active' : activeMenu == 'designationManagement'}">
			<a class="desg-view" href="designationManagement"><b>Designation Management</b>&nbsp; </a></li>
			<hr class="line-menu">
			<%
				}
			%>
			
			
			<li ng-class="{'active' : activeMenu == 'updateProfile'}"><a class="user-profile" href="profile"><b>Profile</b>&nbsp;</a></li>
			<hr class="line-menu">
			<li ng-class="{'active' : activeMenu == 'change password'}"><a class="change-pass" href="resetUserPassword"><b>Change Password</b>&nbsp; </a></li>
			
			<%
				if (designationId!=null && (designationId == 93)) {
			%>
			
			<hr class="line-menu">
			<li><a href="#" ><b>Manage Content</b>&nbsp;
				<i class="fa fa-chevron-down thm-i" aria-hidden="true" style="font-size:10px;"></i></a>
				<ul class="report-menu-ul" style="display:none;">
			
					<li ng-class="{'active' : activeMenu == 'imageentry'}"><a class="image-entry" href="imageEntry">Manage Image Gallery</a></li>
					<li ng-class="{'active' : activeMenu == 'videoentry'}"><a class="video-entry" href="videoEntry">Manage Video Gallery</a></li>
					<li ng-class="{'active' : activeMenu == 'newsupdate'}"><a class="news-entry" href="newsUpdates">Manage News and Updates</a></li>
			
				</ul>
			
			</li>
			
			<%
				}
			%>
			
			
			


		</ul>
		<%
			}
		%>

	</div>

</div>


<div class="loaderMask" id="loader-mask">
	<div class="windows8">
		<div class="wBall" id="wBall_1">
			<div class="wInnerBall"></div>
		</div>
		<div class="wBall" id="wBall_2">
			<div class="wInnerBall"></div>
		</div>
		<div class="wBall" id="wBall_3">
			<div class="wInnerBall"></div>
		</div>
		<div class="wBall" id="wBall_4">
			<div class="wInnerBall"></div>
		</div>
		<div class="wBall" id="wBall_5">
			<div class="wInnerBall"></div>
		</div>
	</div>
</div>

<script type="text/javascript">
		$(document).ready(function() {
			
			$("ul.slide_menusLinks > li a[href='#']").click(function(){
				if($(this).parent().find(".report-menu-ul").css("display") == 'none'){                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
					$(this).parent().find(".report-menu-ul").slideDown("slow");
					$(this).addClass("opened");
					$(this).find("i.fa-chevron-down").css("transform", "rotate(-180deg)");
				}
				else{
					$(this).parent().find(".report-menu-ul").slideUp("slow");
					$(this).removeClass("opened");
					$(this).find("i.fa-chevron-down").css("transform", "rotate(0deg)");
				}
			});
			
	$(".slideMenu").css("height", '100%');

			if($(window).width() <= 1024){
				$(".slideMenu").css("height", "100%");
			}
			$(".menuSlideBtn button").click(function(e) {
				$(".slideMenu").animate({
					left : 0
				}, 500);
				e.stopPropagation();
			});
			$('body').click(function(evt){    
			       if(evt.target.id == "slideMenu")
			          return;
			       //For descendants of menu_content being clicked, remove this check if you do not want to put constraint on descendants.
			       else if($(evt.target).closest('#slideMenu').length)
			          return;             

			      //Do processing of click event here for every element except with id menu_content
			       else{
			    	   $("#slideMenu").animate({
				   			left: "-250px"
				   		}, 500);
			       }
			});
			$(".slide-menu-icon").click(function(){
				$(".slideMenu").animate({
					left: "-250px"
				}, 500);
			});
		});
		$(window).scroll(function(){
			if($(window).scrollTop() >= 76){
				if($(window).width()>767){
				$("#slideMenu").css({
					"position": "fixed",
					"top": "50px"
				})
				}
				else{
					$("#slideMenu").css({
						"position": "fixed",
						"top": "0px"
					})
				}
			}
			else{
				$("#slideMenu").css({
					"position": "absolute",
					"top": "51px"
				})
			}
		})
	</script>
 