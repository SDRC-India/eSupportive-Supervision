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
<title>Resources</title>
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
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<link rel="stylesheet" href="resources/css/jquery-ui.min.js">
<link rel="stylesheet" href="resources/css/jquery-ui.css">

<style type="text/css">
.pdsa-table1 {
	text-align: center !important;
}
</style>
<script src="resources/js/jquery-ui.js"></script>
<script
	src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script src="resources/js/angular.min.js"></script>
<script type="text/javascript">
	
</script>



</head>
<body ng-app="resourcesApp" ng-controller="resourcesController" ng-cloak>
	<jsp:include page="fragments/header.jsp"></jsp:include>


	<div class="pageNameContainer">
		<h4>Resources</h4>
	</div>
	<div id="mymain" class="container" align="Center">
		<!-- <br>
		<br>
		<br> -->


		<div class="container resource-heading">
			<div class="col-md-12">
				<!-- 		<div class="col-md-6">&nbsp;</div> -->
				<div class="col-md-12">
					<h4>
						<b>eSS Mobile/Web Background and Training Resources</b>
					</h4>
				</div>
			</div>
		</div>

		<table items="tableData" show-filter="true" cellpadding="0"
			cellspacing="0" border="0"
			class="dataTable table table-striped submissionTable" id="dataTable1"
			style="width: 70%; margin-bottom: 20px;">
			<thead>
				<tr>
					<th class="pdsa-table1" style="position: relative; width: 40%;">Resource
						Details</th>

					<!-- <th class="pdsa-table1" style="position: relative; width: 40%;">Description

					</th> -->

					<th class="pdsa-table1" style="position: relative; width: 20%;">Download

					</th>

				</tr>

			</thead>

			<tbody id="myTable" style="width: 100%; height: 300px;">
				<tr style="width: 100%; height: 50px;">

					<td class="pdsa-table"
						style="position: relative; width: 40%; padding-right: 10px !important; padding-right: 10px;">eSS
						Mobile User Manual</td>
				<!-- 	<td class="pdsa-table"
						style="position: relative; width: 40%; padding-right: 10px !important; padding-right: 10px;">The
						eSS mobile user manual from start to finish.</td>-->
					<td class="pdsa-table"> 
					<div ng-click="downloadFile('eSS_Mobile_UserManual_r2.pdf')">
							<img style="width: 20px; cursor: pointer;"
								src="resources/images/icons/svg_first_last_doc.svg">
						</div>
					</td>
				</tr>
				<tr style="width: 100%; height: 50px">
					<td class="pdsa-table"
						style="position: relative; width: 40%; padding-right: 10px !important; padding-right: 10px;">eSS
						Web User Manual</td>
					<!-- <td class="pdsa-table"
						style="position: relative; width: 40%; padding-right: 10px !important; padding-right: 10px;">The
						eSS web user manual from start to finish.</td> -->
					<td class="pdsa-table">
					<div ng-click="downloadFile('eSS_Web_User_Manual_r1.pdf')">
					<img style="width: 20px; cursor: pointer;"
					src="resources/images/icons/svg_first_last_doc.svg">
					</div>
					</td>
				</tr>
				<tr style="width: 100%; height: 50px">
					<td class="pdsa-table"
						style="position: relative; width: 40%; padding-right: 10px !important; padding-right: 10px;">
						eSS Facility Checklist</td>
					<!-- <td class="pdsa-table"
						style="position: relative; width: 40%; padding-right: 10px !important; padding-right: 10px;">The
						eSS Facility Checklist</td> -->
					<td class="pdsa-table">
					<div ng-click="downloadFile('Facility_Checklist.pdf')">
					<img style="width: 20px; cursor: pointer;"
					src="resources/images/icons/svg_first_last_doc.svg">
					</div>
					</td>
				</tr>
				<tr style="width: 100%; height: 50px">
					<td class="pdsa-table"
						style="position: relative; width: 40%; padding-right: 10px !important; padding-right: 10px;">
						eSS Community Checklist</td>
					<!-- <td class="pdsa-table"
						style="position: relative; width: 40%; padding-right: 10px !important; padding-right: 10px;">The
						eSS Community Checklist</td> -->
					<td class="pdsa-table">
					<div ng-click="downloadFile('Community_Checklist.pdf')">
					<img style="width: 20px; cursor: pointer;"
					src="resources/images/icons/svg_first_last_doc.svg">
					</div>
					</td>
				</tr>
				<tr style="width: 100%; height: 50px">
					<td class="pdsa-table"
						style="position: relative; width: 40%; padding-right: 10px !important; padding-right: 10px;">
						SOP</td>
				<!-- 	<td class="pdsa-table"
						style="position: relative; width: 40%; padding-right: 10px !important; padding-right: 10px;">The
						Standard Opearating Procedure</td> -->
					<td class="pdsa-table">
					<div ng-click="downloadFile('SoP_supportive_supervision_RMNCHA.pdf')">
					<img style="width: 20px; cursor: pointer;"
					src="resources/images/icons/svg_first_last_doc.svg">
					</div>
					</td>
				</tr>			
				<tr style="width: 100%; height: 50px">
					<td class="pdsa-table"
						style="position: relative; width: 40%; padding-right: 10px !important; padding-right: 10px;">
						Health System Checklist</td>
				<!-- 	<td class="pdsa-table"
						style="position: relative; width: 40%; padding-right: 10px !important; padding-right: 10px;">
						description</td> -->
					<td class="pdsa-table">
					<div ng-click="downloadFile('Health_System_Checklist.pdf')">
					<img style="width: 20px; cursor: pointer;"
					src="resources/images/icons/svg_first_last_doc.svg">
					</div>
					</td>
				</tr>
				<tr style="width: 100%; height: 50px">
					<td class="pdsa-table"
						style="position: relative; width: 40%; padding-right: 10px !important; padding-right: 10px;">
						CD/NCD Checklist</td>
				<!-- 	<td class="pdsa-table"
						style="position: relative; width: 40%; padding-right: 10px !important; padding-right: 10px;">
						description</td> -->
					<td class="pdsa-table">
					<div ng-click="downloadFile('CD_NCD_Checklist_r1.pdf')">
					<img style="width: 20px; cursor: pointer;"
					src="resources/images/icons/svg_first_last_doc.svg">
					</div>
					</td>
				</tr>
			</tbody>
		</table>

	</div>
	<jsp:include page="fragments/footer.jsp"></jsp:include>
	<script type="text/javascript"
		src="resources/js/controllers/resourcesController.js"></script>

	<script type="text/javascript">
		
	</script>



	<script type="text/javascript">
		$(document).ready(function() {
			$(".resource-active").addClass('active');
		});
	</script>
</body>
</html>