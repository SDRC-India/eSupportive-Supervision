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
<title>Disclaimer</title>
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
		<h4>Disclaimer</h4>
	</div> 
	<div id="mymain" class="container">
		
	<form class="sitesection" name="siteForm">
				<div class="col-md-12 col-sm-12 col-xs-12" >
				<div class="terms-margin"><h3></h3></div>
					<p class="termsdata">The information contained in this website
						is for general information purposes only. The information is
						provided by eSS and while we endeavour to keep the information
						up to date and correct, we make no representations or warranties
						of any kind, express or implied, about the completeness, accuracy,
						reliability, suitability or availability with respect to the
						website or the information, products, services, or related
						graphics contained on the website for any purpose. Any reliance
						you place on such information is therefore strictly at your own
						risk. Users are advised to verify/check any information, and to
						obtain any appropriate professional advice before acting on the
						information provided on the website.</p>
					<p class="termsdata">In no event will we be liable for any loss
						or damage including without limitation, indirect or consequential
						loss or damage, or any loss or damage whatsoever arising from loss
						of data or profits arising out of, or in connection with, the use
						of this website.</p>
					<p class="termsdata">Every effort is made to keep the website
						up and running smoothly. However, eSS takes no responsibility
						for, and will not be liable for the website being temporarily
						unavailable due to technical issues beyond our control.</p>
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