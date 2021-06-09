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
<title>Help</title>
<link rel="icon" href="resources/images/icon.png" type="image/png"
	sizes="16x16">
<meta content="width=device-width, initial-scale=1.0" name="viewport">
<!-- <link rel="stylesheet" href="resources/css/bootstrap.min.css"> -->
<link rel="stylesheet" href="resources/css/font-awesome.min.css">
<link rel="stylesheet" href="resources/css/customLoader.css">

<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<link rel="stylesheet" href="resources/css/bootstrap-select.min.css">
<link rel="stylesheet" href="resources/css/styles.css">
<link rel="stylesheet" href="resources/css/jquery-ui.css">
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="resources/js/angular.min.js"></script>
<style>
.error {
	color: #ff0000;
	font-style: italic;
	font-weight: bold;
}
</style>

</head>
<body>

	<jsp:include page="fragments/header.jsp"></jsp:include>
	<div class="container">
			<div class="pageNameContainer">
		<h4>Help</h4>
	</div>
		

		<div class="row help_row help-bottom">
			
			<div class="help_faqs col-sm-12 col-md-12" id="accordion">
				<a class="accordion-toggle" data-toggle="collapse"
					data-parent="#accordion" href="#faq"> <span
					class="glyphicon glyphicon-minus"></span> FAQ
				</a> <img class="faq_line"
					src="resources/images/horizontal_separator_yellow_svg_1.svg">
				<div id="faq" class="collapse in hlp_hdr">
					<div class="moreFaq">
						1) Question -
						<p>The RMNCH+A strategy promotes links between interventions
							across the lifecycle and integrates child survival with other
							important health interventions.</p>
					</div>
					<div class="moreFaq">
						2) Question -
						<p>This approach reflects evidence showing that mother and
							child health cannot be improved in isolation_data show, for
							example, that high-risk pregnancies and maternal mortality</p>
					</div>
					<div class="moreFaq">
						3) Question -
						<p>This approach reflects evidence showing that mother and
							child health cannot be improved in isolation_data show, for
							example, that high-risk pregnancies and maternal mortality</p>
					</div>
					<div id="load_more">
						<a href="#"> More </a>
					</div>
				</div>
			</div>

			<div class="help_tuto col-sm-12 col-md-12" id="accordion">
				<a class="accordion-toggle" data-toggle="collapse"
					data-parent="#accordion" href="#video_tuto"> <span
					class="glyphicon glyphicon-plus"></span> Video Tutorials
				</a> <img class="vid_line"
					src="resources/images/horizontal_separator_yellow_svg_1.svg">
				<div id="video_tuto" class="collapse">
				 <p class="help_nodata">No content available. </p> 
<!-- 					<div class="row row_first"> -->
<!-- 						<div class="col-md-4 bs-example "> -->
<!-- 							<a href="#" -->
<!-- 								onclick="playVideo('resources/images/banner/video_not_available.PNG')" -->
<!-- 								data-toggle="modal"><img -->
<!-- 								src="resources/images/banner/video_not_available.PNG" -->
<!-- 								class="example-image img img-responsive img_tab"></a> -->
<!-- 							Modal HTML -->

<!-- 						</div> -->
<!-- 						<div class=" col-md-4 bs-example "> -->
<!-- 							<a href="#" -->
<!-- 								onclick="playVideo('resources/images/banner/video_not_available.PNG')" -->
<!-- 								data-toggle="modal"><img -->
<!-- 								src="resources/images/banner/video_not_available.PNG" -->
<!-- 								class="example-image img img-responsive img_tab"></a> -->
<!-- 							Modal HTML -->

<!-- 						</div> -->
<!-- 						<div class=" col-md-4 bs-example "> -->
<!-- 							<a href="#" -->
<!-- 								onclick="playVideo('resources/images/banner/video_not_available.PNG')" -->
<!-- 								data-toggle="modal"><img -->
<!-- 								src="resources/images/banner/video_not_available.PNG" -->
<!-- 								class="example-image img img-responsive img_tab"></a> -->
<!-- 							Modal HTML -->

<!-- 						</div> -->
<!-- 					</div> -->
<!-- 					<div class="row row_second"> -->
<!-- 						<div class=" col-md-4 bs-example "> -->
<!-- 							<a href="#" -->
<!-- 								onclick="playVideo('resources/images/banner/video_not_available.PNG')" -->
<!-- 								data-toggle="modal"><img -->
<!-- 								src="resources/images/banner/video_not_available.PNG" -->
<!-- 								class="example-image img img-responsive img_tab"></a> -->
<!-- 							Modal HTML -->

<!-- 						</div> -->
<!-- 						<div class=" col-md-4 bs-example "> -->
<!-- 							<a href="#" -->
<!-- 								onclick="playVideo('resources/images/banner/video_not_available.PNG')" -->
<!-- 								data-toggle="modal"><img -->
<!-- 								src="resources/images/banner/video_not_available.PNG" -->
<!-- 								class="example-image img img-responsive img_tab"></a> -->
<!-- 							Modal HTML -->

<!-- 						</div> -->
<!-- 						<div class=" col-md-4 bs-example "> -->
<!-- 							<a href="#" -->
<!-- 								onclick="playVideo('resources/images/banner/video_not_available.PNG')" -->
<!-- 								data-toggle="modal"><img -->
<!-- 								src="resources/images/banner/video_not_available.PNG" -->
<!-- 								class="example-image img img-responsive img_tab"></a> -->
<!-- 							Modal HTML -->

<!-- 						</div> -->
<!-- 					</div> -->
					<div id="myModal" class="modal fade ">
						<div class="modal-dialog">
							<div class="modal-content gallery-modal-content">
								<div class="modal-header">
									<button type="button" class="close" id="clse"
										data-dismiss="modal" aria-hidden="true">&times;</button>
									<h4 class="modal-title">Help Videos</h4>
								</div>
								<div class="modal-body mdl-bdy">
									<iframe id="video" width="560" height="315" src=""
										frameborder="0" allowfullscreen></iframe>
								</div>
							</div>
						</div>
					</div>
<!-- 								 <div id="loadMore"><a href="#"> More </a></div> -->
				</div>
			</div>
		</div>
	</div>
	
	<jsp:include page="fragments/footer.jsp"></jsp:include>
	<script src="resources/js/jquery-ui.js"></script>
		<script src="resources/js/bootstrap.min.js"></script>
	<script type="text/javascript">
		$(document).ready(function() {
			$(".help-active").addClass('active');
		});
	</script>
	<script>
	
		$(function() {
			$(".moreFaq").slice(0, 2).show();
			$("#load_more").on('click', function(e) {
				e.preventDefault();
				$(".moreFaq:hidden").slice(0, 1).slideDown();
				if ($(".moreFaq:hidden").length == 0) {
					$("#load_more").fadeOut('slow');
				}
			});

			$('.collapse').on(
					'shown.bs.collapse',
					function() {
						$(this).parent().find(".glyphicon-plus").removeClass(
								"glyphicon-plus").addClass("glyphicon-minus");
					}).on(
					'hidden.bs.collapse',
					function() {
						$(this).parent().find(".glyphicon-minus").removeClass(
								"glyphicon-minus").addClass("glyphicon-plus");
					});
		});

		$(".row_first").show();
		$(".row_second").hide();
		$("#loadMore").on('click', function(e) {
			e.preventDefault();
			$(".row_first").show();
			$(".row_second:hidden").slice(0, 1).slideDown();
			if ($(".row_second:hidden").length == 0) {
				$("#loadMore").fadeOut('slow');
			}
		});
	</script>
	<script>
		function playVideo(url) {
			$("#myModal").modal("show");
			$("#myModal").find("iframe").attr("src", url)
		}
		$("#myModal").on('hidden.bs.modal', function(e) {
			$("#myModal iframe").attr("src", "")
		});
	</script>
</body>
</html>