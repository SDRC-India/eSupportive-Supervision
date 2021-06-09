myAppConstructor
.directive(
		"sdrcPdsaTableHeaderFix",
		function($window, $compile) {
			function link(scope, el) {
				var tableUniqClass = "";
				
				scope.$watch("tableuniqueclass", function(uniqClass) {
					tableUniqClass = uniqClass;
					function createStaticHeader(uniqClass){
						$("."+uniqClass).before('<div class="static-header-container"><div class="static-header ' + uniqClass +'-static-head"></div></div>');
					}
					if(uniqClass)
					createStaticHeader(uniqClass);	
				});
				
				scope.$watch("tabledata", function(data) {
					function fixTableHeader(uniqClass) {
						setTimeout(function(){
							
							if($("."+uniqClass)[0].offsetWidth >= $("."+uniqClass)[0].clientWidth){
								var i=0;rowWidthList=[];
//								angular.element("."+uniqClass+"-static-head").html($("."+uniqClass).html());
								$("."+uniqClass).find("table").clone().appendTo("."+uniqClass+"-static-head");
//								$("."+uniqClass).siblings(".static-header-container").find(".static-header").find("table thead").css("visibility", "visible");
								$("."+uniqClass).scrollLeft(0);
								$("."+uniqClass).siblings(".static-header-container").height($("."+uniqClass).siblings(".static-header-container").find(".static-header table thead").height());
								$("."+uniqClass).css("margin-top", -$("."+uniqClass).siblings(".static-header-container").find(".static-header table thead").height()+"px");
//								$("."+uniqClass).parent()
								$("."+uniqClass).siblings(".static-header-container").css({
									 'overflow-x': 'hidden',
									 'overflow-y': 'hidden',
									 'position': 'relative',
									 'clear': 'both'	 
								});
								$("."+uniqClass).siblings(".static-header-container").find(".static-header").css({
									 'overflow-x': 'auto',
									 'overflow-y': 'hidden'
								})
								$("."+uniqClass).find("table").css({"margin-bottom": "0px"});
//								$("."+uniqClass).find("table thead").css("visibility", "hidden");
								if($(window).width() > 845){
									if($("."+uniqClass)[0].offsetWidth == $("."+uniqClass)[0].clientWidth){
										if($("."+uniqClass).find("table").height() > $("."+uniqClass).height())
											$("."+uniqClass).siblings(".static-header-container").css({'margin-right': "17px"});
										else
											$("."+uniqClass).siblings(".static-header-container").css({'margin-right': "0px"});

									}
									else{
										if($("."+uniqClass).find("table").height() + 17 > $("."+uniqClass).height())
											$("."+uniqClass).siblings(".static-header-container").css({'margin-right': "17px"});
										else
											$("."+uniqClass).siblings(".static-header-container").css({'margin-right': "0px"});

									}
																	}
//								$compile(angular.element(".static-header-container thead th "))(angular.element("body").scope());
								var ignoreTableBodyScroll = false;
								var ignoreTableHeadScroll = false;
								/*$("."+uniqClass+"-static-head").find("table thead th").click(function(){
									angular.element("body").scope().order($(this).text().trim());
								})*/
								$(".header-fixed-table").scroll(function(){
									if($(this).scrollTop() > 2){
										$(this).find("thead").css("visibility", "hidden");
										$(this).prev().find(".static-header table thead").css("visibility", "visible");
									}
									else{
										$(this).find("thead").css("visibility", "visible");
										$(this).prev().find(".static-header table thead").css("visibility", "hidden");
									}
										if(!ignoreTableBodyScroll){
											ignoreTableHeadScroll = true;
										$(this).prev().find(".static-header").scrollLeft($(this).scrollLeft());
										
										}
									
										ignoreTableBodyScroll = false;
										 $('[data-toggle="tooltip"]').tooltip();
								}); 
								$(".static-header").scroll(function(){
									if(!ignoreTableHeadScroll){
										ignoreTableBodyScroll = true;
									$(this).parent().siblings(".table-header-fixed, .header-fixed-table ").scrollLeft($(this).scrollLeft());
									
									}
									ignoreTableHeadScroll = false;
									 $('[data-toggle="tooltip"]').tooltip();
								})

							}
						}, 200);
					};
					if(tableUniqClass && data)
						fixTableHeader(tableUniqClass);
				});
				
			}
			return {
				restrict : "A",
				scope : {
					tableuniqueclass : "=",
					tabledata : "="
				},
				link : link
			};
});
