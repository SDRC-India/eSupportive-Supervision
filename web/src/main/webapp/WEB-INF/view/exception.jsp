<!DOCTYPE html>

<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ page import="org.slf4j.Logger"%>
<%@ page import="org.slf4j.LoggerFactory"%>
<%@ page import="java.io.PrintWriter"%>
<%@ page import="java.io.StringWriter"%>

<html lang="en">

<head>
<title>Error</title>
<meta content="width=device-width, initial-scale=1.0" name="viewport">
<link rel="stylesheet" href="resources/css/font-awesome.min.css">

<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<link rel="stylesheet"
	href="http://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.5.4/bootstrap-select.min.css">
<link rel="stylesheet" href="resources/css/styles.css">
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

<link rel="stylesheet" href="resources/css/jquery-ui.css">

<script src="resources/js/jquery-ui.js"></script>
<script
	src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	<script src="resources/js/angular.min.js"></script>
</head>
<jsp:include page="fragments/header.jsp" />

<body>
	<!-- 	<div id="wrapper"> -->
	<div id="wrapper">

		<div class="content">
			<div class="container-fluid">
				<spring:url value="/resources/images/oops.jpg" var="exceptionImage" />
				<div class="row text-center">
					<h2>
						<img class="oppsImg" src="${exceptionImage}" alt="exception image"
							style="height: 330px; margin-top : 70px" />
					</h2>

					<h2 class="text404 excptionmsg">Oops !!! Looks like you are
						caught in a wrong place ...</h2>

					<p class="text404" style="color: #c9302c;">${exception.message}</p>

					<%
						Logger logger = LoggerFactory.getLogger(Exception.class);

						RuntimeException rte = (RuntimeException) (request.getAttribute("exception"));
						StackTraceElement[] stes = rte != null ? rte.getStackTrace() : null;

						if (stes != null && stes.length > 0) {

							StringWriter stringWritter = new StringWriter();
							PrintWriter printWritter = new PrintWriter(stringWritter, true);
							((RuntimeException) (request.getAttribute("exception"))).printStackTrace(printWritter);
							printWritter.flush();
							stringWritter.flush();

							logger.error("An exception occourred , Stack Trace :" + stringWritter.toString());

						}
					%>
				</div>
			</div>
			<div class="clearfooter"></div>
		</div>
	</div>
	<div class="clearfooter"></div>
	<jsp:include page="fragments/footer.jsp"></jsp:include>
</body>



</html>
