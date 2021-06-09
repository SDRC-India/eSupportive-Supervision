<%@taglib prefix="serror" uri="/WEB-INF/ErrorDescripter.tld"%>
<%@taglib prefix="merror" uri="/WEB-INF/ModalDescripter.tld"%>
<html>
<head>
<style>
.h1_impo {
	width: 193px !important;
}

@media ( max-width : 600px) {
}

.alert {
	margin-bottom: 0px;
}

.loginPopBtn {
	display: none;
}
</style>
<title>e Supportive Supervision</title>
<link rel="icon" href="resources/images/icon.png" type="image/png"
	sizes="16x16">
<meta content="width=device-width, initial-scale=1.0" name="viewport">
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


<!--   <link rel="stylesheet" href="resources/js/angular.min.js"> -->



<link rel="stylesheet" href="resources/css/jquery-ui.css">

<script src="resources/js/jquery-ui.js"></script>
<script
	src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script src="resources/js/angular.min.js"></script>
</head>

<body ng-app="ESSHomeApp" ng-controller="HomeController" ng-cloak>
	<jsp:include page="fragments/header.jsp"></jsp:include>
	<div class="homeslide-pic home_main home-page">
		<!-- 	<div class="loader">Loading...</div> -->
		<section id="homeslide">
			<div>
				<div>
					<div id="errMsg" class="text-center home-div-mobile">
						<serror:Error id="msgBox" errorList="${formError}"
							cssInfClass="${className}">
						</serror:Error>
					</div>
					<div id="myCarousel" class="carousel slide home-div-mobile1"
						data-ride="carousel">
						<div class="carousel-inner caursl_inner" role="listbox">
							<div class="item img-height active">
								<img src="resources/images/banner1.jpg" alt="ess" width="100%;">
							</div>
							<div class="item img-height">
								<img src="resources/images/banner2.jpg" alt="ess" width="100%;">
							</div>
							<div class="item img-height">
								<img src="resources/images/banner1.jpg" alt="ess" width="100%;">
							</div>
						</div>
						<!-- Left and right controls -->
						<!-- 						<a class="left carousel-control" href="#myCarousel" role="button" -->
						<!-- 							data-slide="prev"> <span -->
						<!-- 							class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span> -->
						<!-- 							<span class="sr-only">Previous</span> -->
						<!-- 						</a> <a class="right carousel-control" href="#myCarousel" -->
						<!-- 							role="button" data-slide="next"> <span -->
						<!-- 							class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span> -->
						<!-- 							<span class="sr-only">Next</span> -->
						<!-- 						</a> -->
					</div>
				</div>
			</div>
		</section>
		<!--Panel-7 News and Updates Panel Start-->
		<div class="section panel-7 home-contact-panel dark">
			<div class="container">
				<div class="inner-wrapper">
					<!--Block Title-->
					<div class="block-title">
						<div class="line-before"></div>
						<h1 class="h1_impo">
							<span>News and Updates</span>
						</h1>
						<div class="line-after"></div>
					</div>
					<!--End-->
				</div>
				<div class="col-md-8 home_news">
					<div id="myCarousel" class="carousel slide" data-ride="carousel">
						<!-- Wrapper for slides -->
						<div class="carousel-inner crsl-innr">

							<div class="item active">
								<img src="resources/images/news/maternalhealth_605.jpg"
									alt="Los Angeles" class="img-responsive headline_img"
									style="width: 100%; height: 362px">
							</div>

							<div class="item">
								<img src="resources/images/news/image.jpg" alt="Chicago"
									class="img-responsive headline_img"
									style="width: 100%; height: 362px">
							</div>
						</div>
					</div>
				</div>
				<!--Update Info Start-->
				<div class="col-md-4 home_rght right-home-line">
					<div class="carousel-content">
						<h4 class="bordernoticeboard">Notice Board</h4>
						<p class="carousel-content">
						<ul style="padding-left: 0;">
							<marquee direction="up" scrollamount="3"
								width:336px; height=336px; onmouseover="this.stop();"
								onmouseout="this.start();">
								<li ng-repeat="item in newsUpdatesList | orderBy:filterType:sortReverse" style="margin-bottom: 10px;">
									<a class="notice-anchr" ng-show="item.newsLinks.length>0" href="{{item.newsLinks}}" target="_blank"
										style="cursor: pointer;">{{item.newsTitle}}</a>
									<span class="notice-anchr_blank" ng-show="item.newsLinks.length==0"
										style="cursor: pointer;">{{item.newsTitle}}</span>
								</li>
								<br>
							</marquee>
						</ul>
						</p>
						</p>
					</div>
				</div>
			</div>
		</div>
		<!--Panel-7 News and Updates Panel End-->
		<!--Panel-7 Important links Panel Start-->
		<div class="section panel-7 home-contact-panel dark">
			<div class="container">
				<div class="row" class="row">
					<div class="inner-wrapper">
						<!--Block Title-->
						<div class="block-title">
							<div class="line-before"></div>
							<h1 class="h1_impo">
								<span>Important Links</span>
							</h1>
							<div class="line-after"></div>
						</div>
						<!--End-->
					</div>

					<div class="container home_hyper ">
						<div class="row">
							<div class="col-md-12">

								<div class="col-md-3 col-sm-6 col-xs-12 text-center padd_logo">
									<a href="http://nhm.gov.in/" target="_blank"><img
										src="resources/images/nhm.png"></a>
								</div>
								<div class="col-md-3 col-sm-6 col-xs-12 text-center padd_logo">
									<a href="http://www.nihfw.org/" target="_blank"><img
										src="resources/images/fblogo.png"></a>
								</div>
								<div class="col-md-3 col-sm-6 col-xs-12 text-center padd_logo">
									<a href="http://nhsrcindia.org/" target="_blank"><img
										src="resources/images/nhsrc-logo.png"></a>
								</div>
								<div class="col-md-3 col-sm-6 col-xs-12 text-center padd_logo">
									<a href="http://mohfw.nic.in/" target="_blank"><img
										src="resources/images/Department-of-Health-Family-Welfare.png"></a>
								</div>

							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--Panel-7 Home Contact Us Panel Start-->
		<div class="b4sectionheading" id="contactUs"></div>
		<div class="section panel-7 home-contact-panel dark">
			<div class="container">
				<div class="row">

					<div class="inner-wrapper">

						<!--Block Title-->
						<div class="block-title">
							<div class="line-before"></div>
							<h1 class="h1_impo">
								<span>Contact Us</span>
							</h1>
							<div class="line-after"></div>
						</div>
						<!--End-->

					</div>

					<!--Input Field Box Start-->
					<div class="col-md-8">
						<div class="box contact-form-wrapper">
							<iframe class="map-home"
								src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14018.586056621563!2d77.1739041!3d28.5503428!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x4871a32e8dc7b25b!2sNational+Health+Systems+Resource+Centre!5e0!3m2!1sen!2sin!4v1501594306061"
								width="100%" height="400" frameborder="0" style="border: 0"
								allowfullscreen></iframe>
						</div>
					</div>
					<!--Input Field Box End-->

					<!--Contact Info Start-->
					<div class="col-md-4">
						<div class="box contact-info-wrapper">
							<ul class="contact-info">
								<li>
									<div class="contact-info-icon">
										<span><i class="fa fa-flag"></i></span>
									</div>
									<div class="contact-info-text number">National Institute
										of Health & Family Welfare Campus, Baba Gangnath Marg,
										Munrika, New Delhi, Delhi 110067</div>
								</li>
								<li>
									<div class="contact-info-icon">
										<span><i class="fa fa-phone-square"></i></span>
									</div>
									<div class="contact-info-text">
										Contact :<br>
										<span class="font-number">011-26108982/83/84/92/93 (Extension:214)</span>
									</div>
								</li>
								<li>
									<div class="contact-info-icon">
										<span><i class="fa fa-envelope"></i></span>
									</div>
									<div class="contact-info-text number">
										Email:<br>nhsrc.india@gmail.com
									</div>
								</li>
								<li>
									<div class="contact-info-icon">
										<span><i class="fa fa-fax"></i></span>
									</div>
									<div class="contact-info-text number">
										Fax:<br>
										<span class="font-number">011-26108994</span>
									</div>
								</li>
							<!-- 	<li>
									<div class="contact-info-icon">
										<span><i class="fa fa-phone"></i></span>
									</div>
									<div class="contact-info-text number">
										Toll-Free Number:<br>
										<span class="font-number">1800 000 000</span>
									</div>
								</li> -->
							</ul>

							<div data-height="41"></div>
							<div class="clearfix"></div>

						</div>
					</div>
					<!--Contact Info End-->

				</div>
			</div>
			<div class="overlay" data-bg-color="#006064" data-opacity="0.7"></div>
		</div>
		<!--Panel-7 Home Contact Us Panel End-->

		<div class="loginPopBtn loginPopBtn1">
			<button>Login</button>
		</div>

		<div class="loginPopForm" id="loginPopForm">
			<h5 class="text-center">
				<b>Login</b>
			</h5>
			<form action="webLogin" method="post">
				<div class="form-group ">
					<input type="text" class="form-control input-field pwd"
						id="username" name="username" placeholder="Username" required
						oninvalid="this.setCustomValidity('Please input your username')"
						oninput="setCustomValidity('')">
				</div>
				<div class="form-group">
					<input type="password" class="form-control input-field pwd"
						id="password" name="password" placeholder="Password" required
						oninvalid="this.setCustomValidity('Please input your password')"
						oninput="setCustomValidity('')">
				</div>
				<button type="submit" id="submit" class="btn btn-default submit"
					ng-click="showLoader()">LOGIN</button>
				<!-- 				<div class="checkbox"> -->
				<!-- 					<label><input type="checkbox"> Stay signed in</label> -->
				<!-- 				</div> -->
				<div class="forgotPass" style="margin-left: 35px">
					<a href="register"><span style="color: black;">Create a
							new account</span></a>
				</div>
				<div class="forgotPass" ng-click="forgotPassword()"
					style="margin-left: 48px">
					<a href=""><span style="color: black;">Forgot password?</span></a>
				</div>
				<!--  <div class="forgotPass" id="forgotPw"  data-toggle="modal" data-target="#errorMessage">Forgot Password</div>  -->
			</form>
		</div>
		<!-- 	email  modal-->
		<div id="homeEmail" class="modal fade forgotpass_modal" role="dialog"
			data-backdrop="static" data-keyboard="false">
			<div class="modal-dialog">
				Modal content
				<div class="modal-content modal_content">

					<div class="modal-body text-center" style="background-color: #ddd;">
						<div class="forgotpw-head">Forgot Password</div>
						<form name="myform">
							<div class="forgotpwbody row">
								<div class="col-md-12">
									<div class="form-group">
										<label class="col-md-3" for="textinput">Email ID<span
											class="mandatory_star">&#42;</span></label>
										<div class="col-md-9">
											<input type="text" id="email" name="f1"
												placeholder="Enter Email ID" ng-model="regEmail"
												class="form-control inputBackground-email"
												autocomplete="off" required
												ng-pattern="/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/"
												ng-keyup="validateEmail(regEmail,'verifyEmail')"
												onPaste="return false" ng-blur="hideemailerror()" />
											<!-- 								<span id="verifyEmail" class="error-style1" style="margin-left:-185px;margin-top:10px;"></span>  -->
											<span ng-show="myform.f1.$error.pattern" class="error-style1"
												style="margin-left: -185px; margin-top: 10px;">Please
												provide correct Email ID</span>

										</div>
									</div>
								</div>
							</div>
						</form>
						<a class="btn btn-default btn-send" ng-click="checkEmail()"
							style="width: 15%; margin-right: 5px; border-radius: 0px;">Send</a>
						<!-- <button class="btn btn-default btn-send" ng-click="checkEmail()">Send</button> -->
						<a class="btn btn-default btn-send" data-dismiss="modal"
							style="width: 15%; border-radius: 0px;" ng-click="clear()">Cancel</a>
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
						<div class="successhead1">
							<img alt=""
								src="resources/images/icons/Messages_success_icon.svg"
								style="width: 25px; margin-top: -5px;">&nbsp;SUCCESS
						</div>
						<div class="successbody">{{modalMessage}}</div>
						<a class="btn btn-default" data-dismiss="modal">Ok</a>
					</div>
				</div>
			</div>
		</div>
		<div id="errorMessage" class="modal fade" role="dialog"
			data-backdrop="static" data-keyboard="false">
			<div class="modal-dialog">
				<!-- Modal content -->
				<div class="modal-content">
					<div class="modal-body text-center">
						<div class="errorhead">
							<img alt=""
								src="resources/images/icons/Messages_warning_caution_icon.svg"
								style="width: 25px; margin-top: -5px;">&nbsp;ERROR
						</div>
						<div class="errorbody">{{errorMsg}}</div>
						<button type="button" class="btn errorOk" data-dismiss="modal">Close</button>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- 	end email  modal-->
	<merror:ModalError id="pop1" modalCssInfClass="${modalclassName}"
		modalErrorList="${modalformError}">
	</merror:ModalError>
	<!--end of thematic and chklist  -->
	<jsp:include page="fragments/footer.jsp"></jsp:include>

	<script type="text/javascript">
// 			$(".contact-active").click(
// 					function() {
// 	   $(".contact-active").addClass('active');	
// 		 	   $(".home-active").removeClass('active');
// 		 	});
	</script>
	<script type="text/javascript">
// 		$("#msgBox").show().delay(8000).fadeOut(8000);
		$(document).ready(function(){
			$(".contact-active").click(function(e){
				e.preventDefault();
				$('html, body').animate({
					scrollTop : $("#contactUs").offset().top
				}, 500);
			});
		});
	</script>
	<script>
     $(window).scroll(function() {
if ($(window).scrollTop() > 1200) {
$(".contact-active").addClass('active');
$(".home-active,.active-about").removeClass('active');
  }
// else if ($(window).scrollTop() > 450) {
//  $(".active-about").addClass('active');
//  $(".home-active,.contact-active").removeClass('active');
// } 
else{
$(".home-active").addClass('active');
$(".active-about,.contact-active").removeClass('active');
}
});
 </script>
 <script>
$(document).ready(function() {
 $(".home-active").addClass('active');
$("#loader-mask").fadeOut();

});
</script>
	<script type="text/javascript">
		$(document).ready(function() {

			if (typeof user != 'undefined') {
				$('.loginPopBtn').show();
			}
			$(".loginPopBtn button").click(function(e) {
				$(".loginPopForm").animate({
					right : 0
				}, 500);
				e.stopPropagation();
			});
			$('body').click(function(evt) {
				if (evt.target.id == "loginPopForm")
					return;
				//For descendants of menu_content being clicked, remove this check if you do not want to put constraint on descendants.
				else if ($(evt.target).closest('#loginPopForm').length)
					return;

				//Do processing of click event here for every element except with id menu_content
				else {
					$("#username").val("");
					$("#password").val("");
					$(".loginPopForm").animate({
						right : "-251px"
					}, 500);
				}

			});
			$(".slideMenu").css("height", $(window).height() - 75);
			if ($(window).width() <= 1024) {
				$(".slideMenu").css("height", "100%");
			}
			$(".menuSlideBtn button").click(function(e) {
				$(".slideMenu").animate({
					left : 0
				}, 500);
				e.stopPropagation();
			});
			$('body').click(function(evt) {
				if (evt.target.id == "slideMenu")
					return;
				//For descendants of menu_content being clicked, remove this check if you do not want to put constraint on descendants.
				else if ($(evt.target).closest('#slideMenu').length)
					return;

				//Do processing of click event here for every element except with id menu_content
				else {
					// 	    	   $("#username").val("");
					// 				$("#password").val("");
					$("#slideMenu").animate({
						left : "-250px"
					}, 500);
				}
			});
			$(".slide-menu-icon").click(function() {
				$(".slideMenu").animate({
					left : "-250px"
				}, 500);
			});
		});
	</script>
	<script type="text/javascript">
		$(document).ready(
				function() {
					$("ul.submenu")
							.each(
									function() {
										if ($(this).find("a.active").length) {
											$(this).css("display", "block");
											$(this).prev().find(
													"i.fa-chevron-down").css(
													"transform",
													"rotate(-180deg)");
										}
									});
					$("ul.pageLinks.mainmenu > li a[href='#']")
							.click(
									function() {
										if ($(this).next(".submenu").css(
												"display") == 'none') {
											$(this).next(".submenu").slideDown(
													"slow");
											$(this).addClass("opened");
											$(this).find("i.fa-chevron-down")
													.css("transform",
															"rotate(-180deg)");
										} else {
											$(this).next(".submenu").slideUp(
													"slow");
											$(this).removeClass("opened");
											$(this).find("i.fa-chevron-down")
													.css("transform",
															"rotate(0deg)");
										}

									});
					$("div#loginPopForm input").focus(
							function() {
								if ($(window).height() <= 665
										&& $(window).width() <= 1024) {
									$("div#loginPopForm").css({
										"z-index" : "9999",
										"top" : "0",
										"transform" : "translateY(0)"
									});
									$(".loginPopBtn1").hide();
								}
							});
					$("div#loginPopForm input").blur(
							function() {
								if ($(window).height() <= 665
										&& $(window).width() <= 1024) {
									if ($(window).height() <= 330) {
										$("div#loginPopForm").css({
											"z-index" : "9999",
											"top" : "51px",
											"transform" : "translateY(0)"
										})
									} else {
										$("div#loginPopForm").css({
											"z-index" : "9999",
											"top" : "75px",
											"transform" : "translateY(0)"
										})
									}

									$(".loginPopBtn1").show();
								}
							});
				});
	</script>

	<script type="text/javascript">
		$("#msgBox").show().delay(2000).fadeOut(400);
	</script>
	<script type="text/javascript"
		src="resources/js/controllers/homeController.js"></script>
</body>

</html>