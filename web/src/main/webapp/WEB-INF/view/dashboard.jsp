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
<title>Dashboard</title>

<link rel="icon" href="resources/images/icon.png" type="image/png" sizes="16x16">
<meta content="width=device-width, initial-scale=1.0" name="viewport">
<link rel="stylesheet" href="resources/css/font-awesome.min.css">
<link rel="stylesheet" href="resources/css/customLoader.css">
 <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
 <link rel="stylesheet" href="resources/css/bootstrap-select.min.css">
 <link rel="stylesheet" href="resources/css/styles.css">
 
 <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

 <link rel="stylesheet" href="resources/css/jquery-ui.css"> 
 <script src="resources/js/jquery-ui.js"></script>
 <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
 <script src="resources/js/angular.min.js"></script>
</head>

<body ng-app="myApp" ng-controller="dashboardController" ng-cloak>
	<jsp:include page="fragments/header.jsp"></jsp:include>

	<div class="pageNameContainer">
		<h4>{{pageName}}</h4>
	</div>
	<div class="container dash-contner">
	
	      <div class="row key-indcatr">	
	     <!--   <p class="src_text"> Source : {{dashIndicators[0].sourceName}} </p>	 -->
	  		<div class="col-md-3 dash_in dash_brd_indicators chart-indicators" ng-repeat="dash_indctr in dashIndicators" id="tbsection-{{$index}}">
					<p class="dash-ind">{{dash_indctr.dataValue}} </p>					
					<p style="font-weight:bold"> {{dash_indctr.short_Name}} </p>	
					<p>( {{dash_indctr.timeperiod}} )</p>	
			</div>
			<p class="src_text" ng-if="dashIndicators.length > 3"> Source : {{dashIndicators[0].sourceName}} </p>
			<p class="src_text" style="margin-top: 90px;" ng-if="dashIndicators.length <= 3"> Source : {{dashIndicators[0].sourceName}} </p>
			<p class="src_text1">{{dashIndicators[dashIndicators.length-1].message}}</p>		
			<img class="dash_line" src="resources/images/horizontal_separator_yellow_svg_1.svg">
			</div>	
			<div class="row frst_svg">		
			 <h3> RMNCH +A and Service Delivery Indicators</h3>	
			 <h3> Reproductive Health:</h3>	
			  <div class="col-md-12 col-xs-12 col-sm-12 text-center">
			  <div class="dashFirstInd_chart col-md-6 col-xs-12 col-sm-12">
			    <p class="chart-title"> Female with PPIUCD inserted at facilities </p>	
				<sdrc-thematic-line-chart id='pageLineChart' dataprovider="ppAtFacilityLineChart"></sdrc-thematic-line-chart>	
			  </div>	
			   <div class="dashFirstInd_chart col-md-6 col-xs-12 col-sm-12">
			   	<p class="chart-title"> Facilities where PPIUCD forceps are available </p>
				<sdrc-thematic-line-chart id='pageLineChart' dataprovider="forcesLineChart"></sdrc-thematic-line-chart>	
				</div>	
			   </div>				
		    </div>
		    <div class="row frst_svg">		
			 <h3> Maternal Health:</h3>	
			  <div class="col-md-12 col-xs-12 col-sm-12 text-center">
			  <div class="dashFirstInd_chart col-md-6 col-xs-12 col-sm-12">
			    <p class="chart-title"> Maternal deaths </p>	
				<sdrc-thematic-line-chart id='pageLineChart' dataprovider="maternalDeathLineChart"></sdrc-thematic-line-chart>	
			  </div>	
			   <div class="dashFirstInd_chart col-md-6 col-xs-12 col-sm-12">
			   	<p class="chart-title"> Facilities using partograph </p>
				<sdrc-thematic-line-chart id='pageLineChart' dataprovider="patoLineChart"></sdrc-thematic-line-chart>	
				</div>	
			   </div>				
		    </div>
		    <div class="row frst_svg">	
		     <h3> Newborn and Child health:</h3>		
			  <div class="col-md-12 col-xs-12 col-sm-12 text-center">
			  <div class="dashFirstInd_chart col-md-6 col-xs-12 col-sm-12">
			  	<p class="chart-title"> Children under 5 years admitted with diarrhoea </p>		
				<sdrc-thematic-line-chart id='pageLineChart' dataprovider="childDireLineChart"></sdrc-thematic-line-chart>		
			  </div>	
			   <div class="dashBar-chart1 col-md-6 col-xs-12 col-sm-12" ng-repeat="data in newBornBarChart">
					<sdrc-bar-chart dataprovider="data"></sdrc-bar-chart>
					<p class="dash-bar-time">Time Period ({{timePeriodName}})</p>
				</div>	
			   </div>				
		    </div>
		    
		    <hr class="dash-hr">
		    
			<div class="row frst_svg">	
			<h3> CD/NCD and Health System Strengthening: </h3>	
			  <div class="col-md-12 col-xs-12 col-sm-12">
				<div class="dashBar-chart col-md-6 col-xs-12 col-sm-12" ng-repeat="data in cdNcdBarChart">
<!-- 				 <p class="rpt-data"> CD/NCD and Health System Strengthening </p> -->
					<sdrc-bar-chart dataprovider="data"></sdrc-bar-chart>
					<p class="dash-bar-time">Time Period ({{timePeriodName}})</p>
				</div>	
				
				<div class="dashBar-chart col-md-6 col-xs-12 col-sm-12" ng-repeat="data in hssBarChart">
<!-- 				 <p class="rpt-data"> Community </p> -->
					<sdrc-bar-chart dataprovider="data"></sdrc-bar-chart>
					<p class="dash-bar-time">Time Period ({{timePeriodName}})</p>
				</div>	
			</div>					
		  </div>  
		  
		  <hr class="dash-hr">
		  
		  <div class="row frst_svg">	
		  <h3>Community:</h3>					
			  <div class="col-md-12 col-xs-12 col-sm-12 text-center">
			  <div class="dashFirstInd_chart col-md-6 col-xs-12 col-sm-12">
			    <p class="chart-title"> Sub centers reporting maternal/child deaths in last 1 year </p>	
				<sdrc-thematic-line-chart id='pageLineChart' dataprovider="maternalChildDeathsData"></sdrc-thematic-line-chart>	
			  </div>	
			   <div class="dashFirstInd_chart col-md-6 col-xs-12 col-sm-12">
			   	<p class="chart-title"> VHND sessions attended by 75% beneficiaries as per due list</p>
				<sdrc-thematic-line-chart id='pageLineChart' dataprovider="beneficiaryData"></sdrc-thematic-line-chart>	
				</div>	
			   </div>				
		    </div>
	   </div>

	<jsp:include page="fragments/footer.jsp"></jsp:include>
	<script type="text/javascript" src="resources/js/controllers/dashboardController.js"></script>
	<script src="https://d3js.org/d3.v3.min.js" charset="utf-8"></script>
    <script type="text/javascript">
	    var  app = angular.module("myApp", []);
		var  myAppConstructor= angular.module("myApp");
		myAppConstructor.controller("dashboardController", dashboardController);
	 </script>
	
	<script type="text/javascript" src="resources/js/angularDirective/directive.js"></script>
	<script type="text/javascript">
		$(document).ready(function(){
				$(".dashboard").addClass('active');
		});
	</script> 

</body>
</html>