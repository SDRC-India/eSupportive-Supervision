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
<title>Sitemap</title>
<link rel="icon" href="resources/images/icon.png" type="image/png" sizes="16x16">
<meta content="width=device-width, initial-scale=1.0" name="viewport">
<!-- <link rel="stylesheet" href="resources/css/bootstrap.min.css"> -->
<link rel="stylesheet" href="resources/css/font-awesome.min.css">
<link rel="stylesheet" href="resources/css/customLoader.css">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<link rel="stylesheet" href="resources/css/bootstrap-select.min.css">
<link rel="stylesheet" href="resources/css/styles.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<link rel="stylesheet" href="resources/css/jquery-ui.min.js">
<link rel="stylesheet" href="resources/css/jquery-ui.css"> 
<script src="resources/js/angular.min.js"></script>
</head>
<body>
	<jsp:include page="fragments/header.jsp"></jsp:include>

	 <div class="pageNameContainer">
		<h4>Sitemap</h4>
	</div>
	<div id="mymain" class="container">
		<form class="sitesection" name="siteForm">
				<div class="col-md-12 col-sm-12 col-xs-12">
				<div class="terms-margin"><h3></h3></div>
					<div style="margin-top: 20px;"></div>
					<ul class="siteMapData">
						<li>Home</li>
							<ul class="siteMapData">
								<li>Login
									<ul class="siteMapData">
										<li>Menu
										<ul class="siteMapData">
										<li>Dashboard</li>
										<li>Plan</li>
										<li>Data Entry</li>
										<li>Reports
											<ul class="siteMapDate">
											<li>Improvement In Facility</li>
											<li>Improvement In Community</li>
											<li>Indicator Wise Gap</li>
											<li>Planned Vs. Actual</li>
											<li>Unsupervised Facility</li>
											<li>Action Item Status</li>
											<li>Delay In Action Item</li>
											<li>Raw Data</li>
											<li>Designation Wise Submission</li>
											</ul>
										</li>
										<li>Thematic View</li>
										<li>Facility View</li>
										<li>User Management</li>
										<li>Designation Management</li>
										<li>Profile</li>
										<li>Change Password</li>
										</ul>
										</li>									
									</ul>
								</li>								
							</ul>
						<li>About Us</li>
						<li>Gallery</li>
							<ul class="siteMapData">
								<li>Photo Gallery</li>
								<li>Video Gallery</li>
							</ul>
						<li>Resources</li>
						<li>Contact Us</li>
						<!-- <li>Change Password</li>
						<li>Dashboard</li>
						<li>Data Entry</li>
						<li>Designation Management</li>
						<li>Facility View</li>
						<li>Open Items</li>
						<li>Plan</li>
						<li>Query</li>
						<li>Reports</li>
						<li>Thematic View</li>
						<li>Update Profile</li>
						<li>User Management</li> -->
						
						
					</ul>
				</div>
			</form>

		
	</div>



	
	<jsp:include page="fragments/footer.jsp"></jsp:include>
	<script src="resources/js/jquery-ui.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	<script type="text/javascript">
	</script>
	

</body>
</html>