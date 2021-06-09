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
<title>About Us</title>
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
<link rel="stylesheet" href="resources/css/jquery-ui.css">

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="resources/js/angular.min.js"></script>
</head>
<body>

	<jsp:include page="fragments/header.jsp"></jsp:include>	
	<div class="pageNameContainer">
		<h4>About Us</h4>
	</div>
	<div id="mymain" class="container">
	<div class="row abt_row">

			<div class="col-md-12 abt_us">
				<div class="col-md-5 col-sm-9 col-xs-9 abt_img_placehoder">
					<img src="resources/images/banner1.jpg" class="img_slide">
				</div>
				<div class="col-md-7 col-sm-12 col-xs-12 abt_text_placehoder">
					<p class="about-text">Welcome to eSupportive Supervision page of Ministry of Health and Family Welfare, Government of India. The web application is intended to help organise systematic supervision and maintain a repository of such visits ensuring feedback/follow up. The portal allows planning, user management, data collection, report generation and specific query. Also, the software can be made interoperable with existing health portal of MoHFW.  The software uses a comprehensive checklist comprising of RMNCHA, Disease control programmes, Non Communicable diseases and Health Systems. </p>
					<p>The software is in pilot stage - in 4 States - Chattisgarh (Jashpur), Tamil Nadu (Krishnagiri), Telangana (Sangareddy) and Uttar Pradesh (Varanasi).</p>
					<p>Technical support is from National Health Systems Resource Centre, Bill and Milinda Gates Foundation, John Snow India, ACCESS Health International, IPE Global and UNICEF. </p>
				</div>
			</div>
		</div>
<!-- 	<div class="row abt_row"> -->
		
<!-- 		<div class="col-md-12 abt_us"> -->
<!-- 			<div class="col-md-4 col-sm-12 col-xs-12 abt_img_placehoder"> -->
<!-- 				<img src="resources/images/banner1.jpg" class="img_slide"> -->
<!-- 			</div> -->
<!-- 			<div class="col-md-8 col-sm-12 col-xs-12 abt_text_placehoder"> -->
<!-- 				<p class="abt-text">Supportive supervision is a facilitative -->
<!-- 					approach to supervision that promotes mentorship, joint -->
<!-- 					problem-solving and communication between supervisors and -->
<!-- 					supervisees. In recent years, supportive supervision has been -->
<!-- 					implemented to improve routine program monitoring and evaluation -->
<!-- 					(M&E). However, there is a lack of documentation on how supportive -->
<!-- 					supervision has been applied to M&E at the community-level. The -->
<!-- 					purpose of this research was to develop a case study that could be -->
<!-- 					used as an example for other community-based programs wishing to -->
<!-- 					use supportive supervision in M&E.</p> -->
<!-- 			</div> -->
<!-- 			</div> -->
<!-- 		</div> -->
	</div>
	<jsp:include page="fragments/footer.jsp"></jsp:include>
	
	<script src="resources/js/jquery-ui.js"></script>
	<script
		src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	<script type="text/javascript">
		
	</script>

	<script type="text/javascript">
		$(document).ready(function() {
			$(".about-active").addClass('active');
		});
	</script>  
	
</body>
</html>