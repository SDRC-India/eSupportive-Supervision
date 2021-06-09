//	@author Devikrushna Nanda (devikrushna@sdrc.co.in)

// 100 characters with . - Numbers space
myAppConstructor.directive('hundredCharactersValidation', function() {

	return {
		restrict : 'A',
		require : '?ngModel',
		link : function(scope, element, attrs, ngModelCtrl) {
			if (!ngModelCtrl) {
				return;
			}

			ngModelCtrl.$parsers.push(function(val) {
				if (angular.isUndefined(val)) {
					var val = '';
				}

				var clean = val;
				if (!angular.isUndefined(clean)) {
					var num = 0;
					if (clean.length > 100) {
						num = clean.slice(0, 100);
						clean = num;
					}
					clean = clean.replace(/[^a-zA-z. -^0-9]/g, '');
					clean = clean.replace('^', '');
					clean = clean.replace('_', '');
					clean = clean.replace(/\\/g, '');
					clean = clean.replace('~', '');
					clean = clean.replace('`', '');
					clean = clean.replace('[', '');
					clean = clean.replace(']', '');

				}

				if (val !== clean) {
					ngModelCtrl.$setViewValue(clean);
					ngModelCtrl.$render();
				}
				return clean;
			});
		}
	};
});




// 30 characters 
myAppConstructor.directive('fhirtyCharactersValidation', function() {

	return {
		restrict : 'A',
		require : '?ngModel',
		link : function(scope, element, attrs, ngModelCtrl) {
			if (!ngModelCtrl) {
				return;
			}

			ngModelCtrl.$parsers.push(function(val) {
				if (angular.isUndefined(val)) {
					var val = '';
				}

				var clean = val;
				if (!angular.isUndefined(clean)) {
					var num = 0;
					if (clean.length > 30) {
						num = clean.slice(0, 30);
						clean = num;
					}
					clean = clean.replace(/[^a-zA-z. ]/g, '');
					clean = clean.replace('^', '');
					clean = clean.replace('_', '');
					clean = clean.replace(/\\/g, '');
					clean = clean.replace('~', '');
					clean = clean.replace('`', '');
					clean = clean.replace('[', '');
					clean = clean.replace(']', '');

				}

				if (val !== clean) {
					ngModelCtrl.$setViewValue(clean);
					ngModelCtrl.$render();
				}
				return clean;
			});
		}
	};
});

//10 digit for mobile 

myAppConstructor.
directive('onlyTenDigits', function () {

  return {
      restrict: 'A',
      require: '?ngModel',
      link: function(scope, element, attrs, ngModelCtrl) {
			if(!ngModelCtrl) {
				return; 
			}
			
			ngModelCtrl.$parsers.push(function(val) {
				if (angular.isUndefined(val)) {
					var val = '';
				}
				
				var clean = val.replace(/[^0-9]/g, '');
				if(!angular.isUndefined(clean)) {
	            	 var num=0;
	            	 if(clean.length>10 ){
	            		 num =clean.slice(0,10);
	            		 clean= num;
	            	 }
	            		 
	             }
				
				if (val !== clean) {
					ngModelCtrl.$setViewValue(clean);
					ngModelCtrl.$render();
				}
				return clean;
			});
			
			element.bind('keypress', function(event) {
				if(event.keyCode === 32) {
					event.preventDefault();
				}
			});
		}
  };
});


//4 digit for OTP 

myAppConstructor.
directive('onlyFourDigits', function () {

  return {
      restrict: 'A',
      require: '?ngModel',
      link: function(scope, element, attrs, ngModelCtrl) {
			if(!ngModelCtrl) {
				return; 
			}
			
			ngModelCtrl.$parsers.push(function(val) {
				if (angular.isUndefined(val)) {
					var val = '';
				}
				
				var clean = val.replace(/[^0-9]/g, '');
				if(!angular.isUndefined(clean)) {
	            	 var num=0;
	            	 if(clean.length>4 ){
	            		 num =clean.slice(0,4);
	            		 clean= num;
	            	 }
	            		 
	             }
				
				if (val !== clean) {
					ngModelCtrl.$setViewValue(clean);
					ngModelCtrl.$render();
				}
				return clean;
			});
			
			element.bind('keypress', function(event) {
				if(event.keyCode === 32) {
					event.preventDefault();
				}
			});
		}
  };
});


//12 digit for aadhaar card number

myAppConstructor.
directive('onlyTwelveDigits', function () {

  return {
      restrict: 'A',
      require: '?ngModel',
      link: function(scope, element, attrs, ngModelCtrl) {
			if(!ngModelCtrl) {
				return; 
			}
			
			ngModelCtrl.$parsers.push(function(val) {
				if (angular.isUndefined(val)) {
					var val = '';
				}
				
				var clean = val.replace(/[^0-9]/g, '');
				if(!angular.isUndefined(clean)) {
	            	 var num=0;
	            	 if(clean.length>12 ){
	            		 num =clean.slice(0,12);
	            		 clean= num;
	            	 }
	            		 
	             }
				
				if (val !== clean) {
					ngModelCtrl.$setViewValue(clean);
					ngModelCtrl.$render();
				}
				return clean;
			});
			
			element.bind('keypress', function(event) {
				if(event.keyCode === 32) {
					event.preventDefault();
				}
			});
		}
  };
  
});


myAppConstructor.directive('thirtyAlphaNumericValidation', function() {

	return {
		restrict : 'A',
		require : '?ngModel',
		link : function(scope, element, attrs, ngModelCtrl) {
			if (!ngModelCtrl) {
				return;
			}

			ngModelCtrl.$parsers.push(function(val) {
				if (angular.isUndefined(val)) {
					var val = '';
				}

				var clean = val;
				if (!angular.isUndefined(clean)) {
					var num = 0;
					if (clean.length > 30) {
						num = clean.slice(0, 30);
						clean = num;
					}
					clean = clean.replace(/[^a-zA-z0-9]/g, '');
					clean = clean.replace('^', '');
					clean = clean.replace(/\\/g, '');
					clean = clean.replace('[', '');
					clean = clean.replace(']', '');
					clean = clean.replace('_', '');
					clean=clean.replace(/\s/,'');
				}

				if (val !== clean) {
					ngModelCtrl.$setViewValue(clean);
					ngModelCtrl.$render();
				}
				return clean;
			});
			element.bind('keypress', function(event) {
				if (typeof InstallTrigger !== 'undefined') {
					if (event.charCode === 32) {
						event.preventDefault();
					}
				} else {
					if (event.keyCode === 32) {
						event.preventDefault();
					}
				}

			});
		}
	};
});
myAppConstructor.directive('userNameValidation', function() {

	return {
		restrict : 'A',
		require : '?ngModel',
		link : function(scope, element, attrs, ngModelCtrl) {
			if (!ngModelCtrl) {
				return;
			}

			ngModelCtrl.$parsers.push(function(val) {
				if (angular.isUndefined(val)) {
					var val = '';
				}

				var clean = val;
				if (!angular.isUndefined(clean)) {
					var num = 0;
					if (clean.length > 30) {
						num = clean.slice(0, 30);
						clean = num;
					}
					clean = clean.replace(/[^a-zA-z0-9]/g, '');
					clean = clean.replace('^', '');
					clean = clean.replace(/\\/g, '');
					clean = clean.replace('[', '');
					clean = clean.replace(']', '');
					clean = clean.replace('_', '');
					clean=clean.replace(/\s/,'');
				}

				if (val !== clean) {
					ngModelCtrl.$setViewValue(clean);
					ngModelCtrl.$render();
				}
				return clean;
			});
			element.bind('keypress', function(event) {
				if (typeof InstallTrigger !== 'undefined') {
					if (event.charCode === 32) {
						event.preventDefault();
					}
				} else {
					if (event.keyCode === 32) {
						event.preventDefault();
					}
				}

			});
		}
	};
});
myAppConstructor.directive('passwordValidation', function() {

	return {
		restrict : 'A',
		require : '?ngModel',
		link : function(scope, element, attrs, ngModelCtrl) {
			if (!ngModelCtrl) {
				return;
			}

			ngModelCtrl.$parsers.push(function(val) {
				if (angular.isUndefined(val)) {
					var val = '';
				}

				var clean = val;
				if (!angular.isUndefined(clean)) {
					var num = 0;
					if (clean.length > 30) {
						num = clean.slice(0, 30);
						clean = num;
					}
					clean = clean.replace(/\\/g, '');
					clean = clean.replace('/', '');
					clean = clean.replace('_', '');
					clean=clean.replace(/\s/,'');
				}

				if (val !== clean) {
					ngModelCtrl.$setViewValue(clean);
					ngModelCtrl.$render();
				}
				return clean;
			});
			element.bind('keypress', function(event) {
				if (typeof InstallTrigger !== 'undefined') {
					if (event.charCode === 32) {
						event.preventDefault();
					}
				} else {
					if (event.keyCode === 32) {
						event.preventDefault();
					}
				}

			});
		}
	};
});

myAppConstructor.directive('tenAlphaNumericValidation', function() {

	return {
		restrict : 'A',
		require : '?ngModel',
		link : function(scope, element, attrs, ngModelCtrl) {
			if (!ngModelCtrl) {
				return;
			}

			ngModelCtrl.$parsers.push(function(val) {
				if (angular.isUndefined(val)) {
					var val = '';
				}

				var clean = val;
				if (!angular.isUndefined(clean)) {
					var num = 0;
					if (clean.length > 10) {
						num = clean.slice(0, 10);
						clean = num;
					}
					clean = clean.replace(/[^a-zA-z0-9]/g, '');
					clean = clean.replace('^', '');
					clean = clean.replace(/\\/g, '');
					clean = clean.replace('[', '');
					clean = clean.replace(']', '');
					clean = clean.replace('_', '');
					clean=clean.replace(/\s/,'');
				}

				if (val !== clean) {
					ngModelCtrl.$setViewValue(clean);
					ngModelCtrl.$render();
				}
				return clean;
			});
			element.bind('keypress', function(event) {
				if (typeof InstallTrigger !== 'undefined') {
					if (event.charCode === 32) {
						event.preventDefault();
					}
				} else {
					if (event.keyCode === 32) {
						event.preventDefault();
					}
				}

			});
		}
	};
});

//only alphabet and number for PAN card

myAppConstructor.directive('onlyAlphabetNumber', function() {
	  return {
	    require: 'ngModel',
	    link: function (scope, element, attr, ngModelCtrl) {
	      function fromUser(text) {
	        var transformedInput = text.replace(/[^0-9A-Za-z]/g, '');
	        console.log(transformedInput);
	        if(transformedInput !== text) {
	            ngModelCtrl.$setViewValue(transformedInput);
	            ngModelCtrl.$render();
	        }
	        return transformedInput;
	      }
	      ngModelCtrl.$parsers.push(fromUser);
	    }
	  }; 
	});

//convert lower to upper case letter for PAN card
myAppConstructor
.directive('capitalize', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, modelCtrl) {
      var capitalize = function(inputValue) {
        if (inputValue == undefined) inputValue = '';
        var capitalized = inputValue.toUpperCase();
        if (capitalized !== inputValue) {
          modelCtrl.$setViewValue(capitalized);
          modelCtrl.$render();
        }
        return capitalized;
      }
      modelCtrl.$parsers.push(capitalize);
      capitalize(scope[attrs.ngModel]); // capitalize initial value
    }
  };
});
// prevent the spaces in input fields
myAppConstructor.directive('disallowSpaces', function() {
    return {
        restrict: 'A',
        link: function($scope, $element) {
            $element.bind('keydown', function(e) {
            
                if (e.keyCode == 32 || e.keyCode  == 220 ||  e.keyCode  == 36 || e.keyCode  == 191) {
                    e.preventDefault();
                }
            });
        }
    }
});
// table header fix
var compile;
myAppConstructor
.directive(
		"sdrcTableHeaderFix",
		function($window, $compile) {
			compile = $compile;
			function link(scope, el) {
				var tableUniqClass = "";
				
				scope.$watch("tableuniqueclass", function(uniqClass) {
					tableUniqClass = uniqClass;
					function createStaticHeader(uniqClass){
						$("."+uniqClass).before('<div class="static-header-container"><div class="static-header"></div></div>')
					}
					if(uniqClass)
					createStaticHeader(uniqClass);	
				});
				
				scope.$watch("tabledata", function(data) {
					function fixTableHeader(uniqClass) {
						setTimeout(function(){
							
							if($("."+uniqClass)[0].offsetWidth >= $("."+uniqClass)[0].clientWidth){
								var i=0;rowWidthList=[];
								$("."+uniqClass).siblings(".static-header-container").find(".static-header").html($("."+uniqClass).html());
								$("."+uniqClass).siblings(".static-header-container").find(".static-header").find("table thead").css("visibility", "visible");
								$("."+uniqClass).scrollLeft(0);
								$("."+uniqClass).siblings(".static-header-container").height($("."+uniqClass).siblings(".static-header-container").find(".static-header table thead").height());
								$("."+uniqClass).css("margin-top", -$("."+uniqClass).siblings(".static-header-container").find(".static-header table thead").height()+"px");
//								$("."+uniqClass).css("margin-top", -$("."+uniqClass).siblings(".static-header-container").find(".static-header table thead").height()+"px");
//								$("."+uniqClass).parent()
								$("."+uniqClass).siblings(".static-header-container").css({
									 'overflow-x': 'hidden',
									 'overflow-y': 'hidden',
									 'background-color': '#F1F1F1',
									 'position': 'relative',
									 'clear': 'both'	 
								});
								$("."+uniqClass).siblings(".static-header-container").find(".static-header").css({
									 'overflow-x': 'auto',
									 'overflow-y': 'hidden',
									 'background-color': '#FFF'
								})
								$("."+uniqClass).find("table").css({"margin-bottom": "0px"});
								$("."+uniqClass).find("table thead").css("visibility", "hidden");
								/*if($(window).width()>600){
									$("."+uniqClass).siblings(".static-header-container").css({'margin-right': "17px"});}
									else{
										$("."+uniqClass).siblings(".static-header-container").css({'margin-right': "0px"});
									}
								}*/
								if($(window).width() > 845){
									if($("."+uniqClass)[0].offsetWidth == $("."+uniqClass)[0].clientWidth){
										if($("."+uniqClass).find("table").height() > $("."+uniqClass).height())
											$("."+uniqClass).siblings(".static-header-container").css({'margin-right': "0px"});
										else
											$("."+uniqClass).siblings(".static-header-container").css({'margin-right': "0px"});

									}
									else{
										if($("."+uniqClass).find("table").height() + 17 > $("."+uniqClass).height())
											$("."+uniqClass).siblings(".static-header-container").css({'margin-right': "17px"});
										else
											$("."+uniqClass).siblings(".static-header-container").css({'margin-right': "0px"});

									}
											//console.log('hi');					
											}
								compile(angular.element(".static-header-container .static-header thead"))(angular.element("body").scope());
								var ignoreTableBodyScroll = false;
								var ignoreTableHeadScroll = false;
								$(".header-fixed-table").scroll(function() {
									if (!ignoreTableBodyScroll) {
										ignoreTableHeadScroll = true;
										$(this).prev().find(".static-header").scrollLeft($(this).scrollLeft());

									}

									ignoreTableBodyScroll = false;

								});
								$(".static-header").scroll(
										function() {
											if (!ignoreTableHeadScroll) {
												ignoreTableBodyScroll = true;
												$(this).parent().siblings(".table-header-fixed").scrollLeft(
														$(this).scrollLeft());

											}
											ignoreTableHeadScroll = false;
								});
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


		

//table header fix for report planned vs Actual

		myAppConstructor
		.directive(
				"reportTableHeaderFix",
				function($window) {
					function link(scope, el) {
						var tableUniqClass = "";
						
						scope.$watch("tableuniqueclass", function(uniqClass) {
							tableUniqClass = uniqClass;
							function createStaticHeader(uniqClass){
								$("."+uniqClass).before('<div class="static-header-container"><div class="static-header"></div></div>')
							}
							if(uniqClass)
							createStaticHeader(uniqClass);	
						});
						
						scope.$watch("tabledata", function(data) {
							function fixTableHeader(uniqClass) {
								setTimeout(function(){
									
									if($("."+uniqClass)[0].offsetWidth >= $("."+uniqClass)[0].clientWidth){
										var i=0;rowWidthList=[];
										$("."+uniqClass).siblings(".static-header-container").find(".static-header").html($("."+uniqClass).html());
										$("."+uniqClass).siblings(".static-header-container").find(".static-header").find("table thead").css("visibility", "visible");
										$("."+uniqClass).scrollLeft(0);
										$("."+uniqClass).siblings(".static-header-container").height($("."+uniqClass).siblings(".static-header-container").find(".static-header table thead").height());
										$("."+uniqClass).css("margin-top", -$("."+uniqClass).siblings(".static-header-container").find(".static-header table thead").height()+"px");
//										$("."+uniqClass).parent()
										$("."+uniqClass).siblings(".static-header-container").css({
											 'overflow-x': 'hidden',
											 'overflow-y': 'hidden',
											 'background-color': '#F1F1F1',
											 'position': 'relative',
											 'clear': 'both'	 
										});
										$("."+uniqClass).siblings(".static-header-container").find(".static-header").css({
											 'overflow-x': 'auto',
											 'overflow-y': 'hidden',
											 'background-color': '#FFF'
										})
										$("."+uniqClass).find("table").css({"margin-bottom": "0px"});
										$("."+uniqClass).find("table thead").css("visibility", "hidden");
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
										$compile(angular.element(".static-header-container .static-header thead"))(angular.element("body").scope());
										var ignoreTableBodyScroll = false;
										var ignoreTableHeadScroll = false;
										$(".header-fixed-table").scroll(function(){
												if(!ignoreTableBodyScroll){
													ignoreTableHeadScroll = true;
												$(this).prev().find(".static-header").scrollLeft($(this).scrollLeft());
												
												}
											
												ignoreTableBodyScroll = false;
												
										}); 
										$(".static-header").scroll(function(){
											if(!ignoreTableHeadScroll){
												ignoreTableBodyScroll = true;
											$(this).parent().siblings(".header-fixed-table").scrollLeft($(this).scrollLeft());
											
											}
											ignoreTableHeadScroll = false;
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


//================================= progress circle
 myAppConstructor.directive("circleProgress", function($window) {
	function link(scope, el) {
		draw = function(d, id) {	
			d3.select('#'+id).select("svg").remove();
			var radius;
			var border;
			var colors = {
				'yellow' : '#38685c',
			};

			var color = colors.yellow;	
				radius = 90;
				border = 4;
			

			var padding = 30;
			var startPercent = 0;
			var endPercent = d / 100;

			var twoPi = Math.PI * 2;
			
			var formatPercent = d3.format('.0%');			
			var boxSize = (radius + padding) * 2;

			var count = Math.abs((endPercent - startPercent) / 0.01);
			var step = endPercent < startPercent ? -0.01 : 0.01;

			var arc = d3.svg.arc().startAngle(0).innerRadius(radius)
					.outerRadius(radius - border);

			var parent = d3.select('#' + id);
			
			if($(window).width() >= 400 || id != "circleProgress"){
				var svg = parent.append('svg').attr('width', boxSize).attr(
						'height', boxSize);

			}
			else{
				var svg = parent.append('svg').attr('width', boxSize).attr(
						'height', boxSize + 50);
			}			

			var defs = svg.append('defs');

			var filter = defs.append('filter').attr('id', 'blur');

			filter.append('feGaussianBlur').attr('in', 'SourceGraphic').attr(
					'stdDeviation', '0');

			var g = svg.append('g').attr('transform',
					'translate(' + boxSize / 2 + ',' + boxSize / 2 + ')');

			var meter = g.append('g').attr('class', 'progress-meter');

			meter.append('path').attr('class', 'background').attr('fill',
					'#f0b569').attr('fill-opacity', 0.5).attr('d',
					arc.endAngle(twoPi));

			var foreground = meter.append('path').attr('class', 'foreground')
					.attr('fill', color).attr('fill-opacity', 1).attr('stroke',
							color).attr('stroke-width', 5).attr(
							'stroke-opacity', 1).attr('filter', 'url(#blur)');

			var front = meter.append('path').attr('class', 'foreground').attr(
					'fill', color).attr('fill-opacity', 1);

			var numberText = meter.append('text').attr({
				'fill' : '#000',
				'font-size' : radius / 2
			}).attr('text-anchor', 'middle').attr('dy', '.35em');

			function updateProgress(progress) {						
				if (id === "circleProgress" || id === "circleProgress2") {		
					foreground.attr('d', arc.endAngle(twoPi * progress));
					front.attr('d', arc.endAngle(twoPi * progress));
				  if(d != null || d != undefined)
					numberText.text(formatPercent(progress));
				  else
					  numberText.text('N/A');  				 
			   };

			}

			var progress = startPercent;

			(function loops() {
				updateProgress(progress);

				if (count > 0) {
					count--;
					progress += step;
					setTimeout(loops, 10);
				}
			})();
		};

	
		scope.$watch('dataprovider', function(newValue1, oldValue1) {			
				var d = newValue1;
				draw(d, "circleProgress");	
		}, true);
	
		scope.$watch('quatdataprovider', function(newValue2, oldValue2) {		
				var d = newValue2;
				draw(d, "circleProgress2");		
		}, true);

	}
	return {
		link : link,
		restrict : "E",
		scope : {
			dataprovider : "=",
			quatdataprovider : "="
		}
	};

});	
//================================= progress circle
 myAppConstructor.directive("circlesProgress", function($window) {
	function link(scope, el) {
		draw = function(d, id) {	
			d3.select('#'+id).select("svg").remove();
			var radius;
			var border;
			var colors = {
				'yellow' : '#38685c',
			};

			var color = colors.yellow;	
				radius = 90;
				border = 4;
			
			var padding = 30;
			var startPercent = 0;
			var endPercent = d / 100;

			var twoPi = Math.PI * 2;
			
			var formatPercent = d3.format('.0%');			
			var boxSize = (radius + padding) * 2;

			var count = Math.abs((endPercent - startPercent) / 0.01);
			var step = endPercent < startPercent ? -0.01 : 0.01;

			var arc = d3.svg.arc().startAngle(0).innerRadius(radius)
					.outerRadius(radius - border);

			var parent = d3.select('#' + id);
			
			if($(window).width() >= 400 || id != "circleProgress2"){
				var svg = parent.append('svg').attr('width', boxSize).attr(
						'height', boxSize);
			}
			else{
				var svg = parent.append('svg').attr('width', boxSize).attr(
						'height', boxSize + 50);
			}			

			var defs = svg.append('defs');

			var filter = defs.append('filter').attr('id', 'blur');

			filter.append('feGaussianBlur').attr('in', 'SourceGraphic').attr(
					'stdDeviation', '0');

			var g = svg.append('g').attr('transform',
					'translate(' + boxSize / 2 + ',' + boxSize / 2 + ')');

			var meter = g.append('g').attr('class', 'progress-meter');

			meter.append('path').attr('class', 'background').attr('fill',
					'#f0b569').attr('fill-opacity', 0.5).attr('d',
					arc.endAngle(twoPi));

			var foreground = meter.append('path').attr('class', 'foreground')
					.attr('fill', color).attr('fill-opacity', 1).attr('stroke',
							color).attr('stroke-width', 5).attr(
							'stroke-opacity', 1).attr('filter', 'url(#blur)');

			var front = meter.append('path').attr('class', 'foreground').attr(
					'fill', color).attr('fill-opacity', 1);

			var numberText = meter.append('text').attr({
				'fill' : '#000',
				'font-size' : radius / 2
			}).attr('text-anchor', 'middle').attr('dy', '.35em');

			function updateProgress(progress) {						
				if (id === "circleProgress" || id === "circleProgress2") {		
					foreground.attr('d', arc.endAngle(twoPi * progress));
					front.attr('d', arc.endAngle(twoPi * progress));
				  if(d != null || d != undefined)
					numberText.text(formatPercent(progress));
				  else
					  numberText.text('N/A');  				 
			   };

			}

			var progress = startPercent;

			(function loops() {
				updateProgress(progress);

				if (count > 0) {
					count--;
					progress += step;
					setTimeout(loops, 10);
				}
			})();
		};
			
		scope.$watch('quatdataprovider', function(newValue2, oldValue2) {		
				var d = newValue2;
				draw(d, "circleProgress2");		
		}, true);

	}
	return {
		link : link,
		restrict : "E",
		scope : {			
			quatdataprovider : "="
		}
	};

});	
		
/**************************** Draw Line chart **********************************/
myAppConstructor
.directive(
		"sdrcThematicLineChart",
		function($window) {
			function link(scope, el) {

				var el = el[0];
				var clicks = 0;

				// Render graph based on 'data'
				scope.$watch("dataprovider", function(data) {
					function draw(data) {
						d3.select(el).select("svg").remove();
						var w = $(window);
						var wnw =d3.select(el)[0][0].parentNode.clientWidth;
						if(wnw == 0){
							if(w.width()> 464)
								wnw = 566;
							else{
								wnw = 350;
								
							}
						}
						var wnh = (w.width()> 940)? 950: 950;
				    	d3.select("#pageLineChart");
				    	
						var margin = {
								top : wnh/10,
								right : wnw/120,
								bottom : wnh/10,
								left : wnw/10
							}, 
							width = wnw - (2 * (margin.left + margin.right)), 
							height = 160;
							
						// set the ranges
						var x = d3.scale.ordinal().rangeRoundBands(
								[ 0, width ], 1.0);
						var y = d3.scale.linear().rangeRound([ height, 0 ]);

						// define the axis
						var xAxis = d3.svg.axis().scale(x).orient("bottom")
								.ticks(4);
						var yAxis = d3.svg.axis().scale(y).orient("left")
								.ticks(4);

						// // Define the line
						var lineFunction = d3.svg.line().x(function(d) {
							return x(d.timeperiod);
						}).y(function(d) {
							return y(d.percentageValue);
						});										

						// Adds the svg canvas
						
						if(wnw > 940){
							var svg = d3.select(el).append("svg").attr("id",
							"pageLineChart").attr("width",
									wnw).attr(
							"height",
							height + margin.top + margin.bottom)
							.append("g").attr(
									"transform",
									"translate(" + margin.left + ","
											+ margin.top + ")");
						}
						else{
							var svg = d3.select(el).append("svg").attr("id",
							"pageLineChart").attr("width",
									wnw).attr(
							"height",
							height + margin.top + margin.bottom + 20)
							.append("g").attr(
									"transform",
									"translate(" + 2 * margin.left + ","
											+ margin.top + ")");
						}
						
						// Get the data
						data.forEach(function(d) {
//							console.log(d);
							d.timeperiod = d.timeperiod;
							d.percentageValue = +d.percentageValue;
						});

						x.domain(data.map(function(d) {
							return d.timeperiod;
						}));
						// Y domain set using loop
						var flag = false;
						data.forEach(function (d){
						 if(d.percentageValue  > 100){
								y.domain([ 0, d3.max(data, function(d) {
									return d.percentageValue;
								}) ]);
								flag = true;
						  }
				    	 });
						
						if(!flag){
							y.domain([ 0, 100 ]);
							
						}					

						// Nest the entries by symbol
						var dataNest = d3.nest().key(function(d) {
							return d.key;
						}).entries(data);

						// Loop through each symbol / key
						
							/*if(data[0].key)
								var color = d3.scale.ordinal().range(
								 [ "#333a3b", "#386d5c", "#f0b469",]);	
							else*/
								var color = d3.scale.ordinal().range([ "#386d5c",]);							
						
						// Add the X Axis		
					  if(w.width() == 1024){
						svg.append("g").attr("class", "x axis").attr(
									"transform", "translate(0," + height + ")")
									.call(xAxis).append("text").attr("x",
											width - margin.right).attr("y",
											margin.bottom).attr("dx", "8.71em")
									.style("text-anchor", "").text(
											"Time Period").attr("x", 180)// 
											.attr("y", 50).style({"fill":"#313333", "font-weight": "bold"});
					  }else if(w.width() >= 768 && w.width() <= 992){
						  svg.append("g").attr("class", "x axis").attr(
									"transform", "translate(0," + height + ")")
									.call(xAxis).append("text").attr("x",
											width - margin.right).attr("y",
											margin.bottom).attr("dx", "8.71em")
									.style("text-anchor", "").text(
											"Time Period").attr("x", 380)// 
											.attr("y", 50).style({"fill":"#313333", "font-weight": "bold"});
					  }else if(w.width() == 360){
						  svg.append("g").attr("class", "x axis").attr(
									"transform", "translate(0," + height + ")")
									.call(xAxis).append("text").attr("x",
											width - margin.right).attr("y",
											margin.bottom).attr("dx", "8.71em")
									.style("text-anchor", "").text(
											"Time Period").attr("x", 70)// 
											.attr("y", 50).style({"fill":"#313333", "font-weight": "bold"});
					  }else if(w.width() == 320){
						  svg.append("g").attr("class", "x axis").attr(
									"transform", "translate(0," + height + ")")
									.call(xAxis).append("text").attr("x",
											width - margin.right).attr("y",
											margin.bottom).attr("dx", "8.71em")
									.style("text-anchor", "").text(
											"Time Period").attr("x", 40)// 
											.attr("y", 50).style({"fill":"#313333", "font-weight": "bold"});
					  }else if(w.width() == 480){
						  svg.append("g").attr("class", "x axis").attr(
									"transform", "translate(0," + height + ")")
									.call(xAxis).append("text").attr("x",
											width - margin.right).attr("y",
											margin.bottom).attr("dx", "8.71em")
									.style("text-anchor", "").text(
											"Time Period").attr("x", 165)// 
											.attr("y", 50).style({"fill":"#313333", "font-weight": "bold"});
					  }if(data[0].percentageValue && w.width() >= 1024){
						  svg.append("g").attr("class", "x axis").attr(
									"transform", "translate(0," + height + ")")
									.call(xAxis).append("text").attr("x",
											width - margin.right).attr("y",
											margin.bottom).attr("dx", "8.71em")
									.style("text-anchor", "").text(
											"Time Period").attr("x", 260)// 
											.attr("y", 50).style({"fill":"#313333", "font-weight": "bold"});
					  }else{
						  svg.append("g").attr("class", "x axis").attr(
									"transform", "translate(0," + height + ")")
									.call(xAxis).append("text").attr("x",
											width - margin.right).attr("y",
											margin.bottom).attr("dx", "8.71em")
									.style("text-anchor", "").text(
											"Time Period").attr("x", 250)// 
											.attr("y", 50).style({"fill":"#313333", "font-weight": "bold"});
					  }
											 
						svg.selectAll(".tick text").style("text-anchor",
							"end").attr("dx", "-.8em").attr("dy",
							".15em").style({"fill":"#313333", "font-weight": "normal"}).attr("transform", function(d) {
						return "rotate(-45)";
					   });	

						// Add the Y Axis
						var ya = svg.append("g").attr("class", "y axis").call(yAxis);
						ya.selectAll("text").style({"fill":"#313333", "font-weight": "normal"});
						if(data[0].key)
						ya.append("text").attr("transform",
								"rotate(-90)").attr("y", -65).attr("x", -height/2).attr(
								"dy", "1.2em").style("text-anchor",
								"middle").style({"font-weight": "bold"}).text(function(d){return "Number";}).style("fill",
								"#313333");
						else
							ya.append("text").attr("transform",
							"rotate(-90)").attr("y", -60).attr("x", -height/2).attr(
							"dy", "1.2em").style("text-anchor",
							"middle").style({"font-weight": "bold"}).text(function(d){return "Percentage";}).style("fill",
							"#313333");
					
						// adding multiple line chart

						for (var index = 0; index < dataNest.length; index++) {

							var series = svg.selectAll(".series").data(
									dataNest[index].values).enter().append(
									"g").attr("class", "series").attr("id",
									"tag" + dataNest[index].key);

							series.select(".line").data(function() {
								return dataNest[index].values;
							}).enter().append("path")
									.attr("id", "tag" + dataNest[index].key)
									.attr("d",function(d) {
												return lineFunction(dataNest[index].values);
											}).style("stroke", function(d) {
										return color(dataNest[index].key);
									}).style("stroke-width", "2px").style(
											"fill", "none").style("incorporate", "ordinal");

							series.select(".point").data(function() {
								return dataNest[index].values;
							}).enter().append("circle").attr("id",
									"tag" + dataNest[index].key).attr(
									"class", "point").attr("cx",
									function(d) {
										return x(d.timeperiod);
									}).attr("cy", function(d) {
								return y(d.percentageValue);
							}).attr("r", "3px").style("fill", function(d) {
								return color(dataNest[index].key);
							}).style("stroke", "none").style(
									"stroke-width", "2px").style(
											"cursor", "pointer").on("mouseover",
									function(d) {
										showPopover.call(this, d);
									}).on("mouseout", function(d) {
								removePopovers();
							});

						}	

						function removePopovers() {
							$('.popover').each(function() {
								$(this).remove();
							});
						}
						function showPopover(d) {
							$(this).popover(
									{										
										title : '',
										placement : 'auto top',
										container : 'body',
										trigger : 'manual',
										html : true,
										content : function() {	
											
												return "<span style='color:#333a3b'>" + "Time Period : "
												+ "</span>" + "<span style='color:#6057bb'>"
												+ d.timeperiod + "</span>" + "<br/>"
												+ "<span style='color:#333a3b'>"
												+ "Data Value : " + "</span>"
												+ "<span style='color:#6057bb'>" + d.percentageValue+ ""
												+ "</span>";
										}
									});
							$(this).popover('show');							
						}
					};
					if(data)
					draw(data);
					
		});
	}
	return {
		restrict : "E",
		scope : {
			dataprovider : "="
		},
		link : link
	};
});

/********************Draw Bar Chart ********************/

myAppConstructor.directive("sdrcBarChart",
		function($window) {
			function link(scope, el) {
				var el = el[0];
				draw = function(el, data, xaxisName, xaxisTitle) {

					d3.select(el).select("svg").remove();
					var n = 2, // number of layers
					m = 10, // number of samples per layer
					stack = d3.layout.stack(), layers = stack(data),

					yGroupMax = d3.max(layers, function(layer) {
						return d3.max(layer, function(d) {

							return d.value;
						});
					}), yStackMax = d3.max(layers, function(layer) {
						return d3.max(layer, function(d) {
							return d.y0 + d.value;
						});
					});
					var w = {
							"h": "100",
							"w": "300"
						};
					//var relativewidth = $(window).width() > 768 ? $("#"+el.parentElement.getAttribute("id")).width():$("#"+el.parentElement.getAttribute("id")).width();
					if($(window).width()<=360)
					 var margin = {
						top : 70,
						right : 55,
						bottom : 40, 
						left : 50
					 }, width = 250, height = 300 - margin.top - margin.bottom;
					else
					 var margin = {
							top : 80,
							right : 0,
							bottom : 50, 
							left : 50
					 }, width = 400, height = 240 - margin.top;
					
					var x = d3.scale.ordinal().domain(data[0].map(function(d) {
						return d.axis;
					})).rangeRoundBands([ 0, width ], .1);
					;

					var y = d3.scale.linear().domain([ 0, 100 ]).range(
							[ height, 0 ]);

					var color = [ "#333a3b"];

					var hoverColor = [ "#333a3b" ];

					var formatTick = function(d) {
						return d.split(".")[0];
					};
					
					// define the axis
					var xAxis = d3.svg.axis().scale(x).orient("bottom")
							.tickFormat(formatTick);
				
					var svg = d3.select(el).append("svg").attr("id",
							"columnbarChart").attr("width",
							width + margin.left + margin.right).attr("height",
							height + margin.top + margin.bottom + 20).append("g")
							.attr(
									"transform",
									"translate(" + margin.left + ","
											+ margin.top + ")");

					var layer = svg.selectAll(".layer").data(layers).enter()
							.append("g").attr("class", "layer").style("fill",
									function(d, i) {
										return color[i];
									}).attr("id", function(d, i) {
								return i;
							});
					
					if(data[0] != ''){
						if(data[0][0].axis == 'Facilities where sputum collection and transportation facility is available'){  //Need to remove after 30th demo
							svg.append("g").append("text")
						       .attr("transform", "translate(100,0)")
						       .attr("x", 40)
						       .attr("y", 50)
						       .attr("font-size", "18px")
						       .text("No Data Available.");
						}
						
						
						
						var rect = layer.selectAll("rect").data(function(d) {
							return d;
						}).enter().append("rect").attr("x", function(d) {
							return x(d.axis);
						}).attr("y", height).attr("width", x.rangeBand()).attr(
								"height", 0).style("fill", function(d, i) {
						}).style({"transform" : "translateX("+x.rangeBand()/4+"px)"})
						.on("mouseover", function(d) {
							showPopover.call(this, d);
							d3.select(this).style('fill', function(d, i) {

								if (80 <= d.value) {
									return hoverColor[0];
								} else if (60 <= d.value && d.value < 80) {
									return hoverColor[1];
								} else if (d.value < 60) {
									return hoverColor[2];
								}
							});

						}).on("mouseout", function(d) {
							removePopovers();
							d3.select(this).style('fill', function(d, i) {
								if (80 <= d.value) {
									return color[0];
								} else if (60 <= d.value && d.value < 80) {
									return color[1];
								} else if (d.value < 60) {
									return color[2];
								}
							});
						});
					}else if(data[0]==''){
						svg.append("g").append("text")
					       .attr("transform", "translate(100,0)")
					       .attr("x", 40)
					       .attr("y", 50)
					       .attr("font-size", "18px")
					       .text("No Data Available.")
					}
						
					;
					
					//============Text wrap function in x-axis of column chart=====================
					function wrap(text, width) {
						  text.each(function() {
						    var text = d3.select(this),
						        words = text.text().split(/\s+/).reverse(),
						        word,
						        cnt=0,
						        line = [],
						        lineNumber = 0,
						        lineHeight = 1.1, 
						        y = text.attr("y"),
						        dy = parseFloat(text.attr("dy")),
						        tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
						    while (word = words.pop()) {
						    	cnt++;
						      line.push(word);
						      tspan.text(line.join(" "));
						      if (tspan.node().getComputedTextLength() > width) {
						        line.pop();
						        
						        tspan.text(line.join(" "));	
						        line = [word];
						        if(cnt!=1)
						        tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
						      }
						    }
						  });
						}
					
					svg.append("g").attr("class", "x axis").attr("transform",
							"translate(0," + height + ")").call(xAxis)
							.selectAll("text").style("text-anchor", "middle")
							.attr("class",  function(d,i){return  "evmtext"+i})
							.attr("dx", "-.2em").attr("dy", ".70em")
							.attr('font-size', '11px')		
							.call(wrap,x.rangeBand());
					// start
					var xAxis = d3.svg.axis().scale(x).orient("bottom");

					var yAxis = d3.svg.axis().scale(y).orient("left").ticks(4);

					svg.append("g").attr("class", "x axis title").append(
					"text").attr("transform","translate(0," + 310 + ")").attr("x", width / 2).attr("y", margin.bottom+30).attr("dx",
							"1em").style("text-anchor", "middle").text(xaxisTitle);
					
					svg.append("g").attr("class", "x axis name").append(
					"text").attr("transform","translate(0," + -60 + ")").attr("x", width / 2).attr("y", margin.bottom+30).attr("dx",
							"1em").style("text-anchor", "middle").text(xaxisName);

					svg.append("g").attr("class", "y axis").call(yAxis).append(
							"text").attr("transform", "rotate(-90)").attr("y",
							0 - margin.left).attr("x", 0 - (height / 2)).attr(
							"dy", "10px").style("text-anchor", "middle").style({"font-weight":"bold", "fill":"#313333"}).text(
							"Percentage");

					function transitionGrouped() {
						y.domain([ 0, 100 ]);

						rect.transition().duration(500).delay(function(d, i) {
							return i * 10;
						}).attr("x", function(d, i, j) {
							return x(d.axis) + x.rangeBand() / n * j; // function(d)
					
						}).attr("width", x.rangeBand() / n).transition().attr(
								"y", function(d) {
									return y(d.value);
								}).attr("height", function(d) {
							return height - y(d.value);
						});
						
					}

					transitionGrouped();
					function removePopovers() {
						$('.popover').each(function() {
							$(this).remove();
						});
					}
					function showPopover(d) {
						$(this).popover(
								{
									title : '',
									placement : 'auto top',
									container : 'body',
									trigger : 'manual',
									html : true,
									content : function() {
										if(d.axis != "")
										return "<div style='color: #257ab6;'>" + d.axis + "</div>" + "Percentage : "
												+ d.value + "%";
									}
								});
						$(this).popover('show');
						$('.popover.fade.top.in').css('top', parseFloat($('.popover.fade.top.in').css('top').slice(0, -2)) - 15);
					}
				};
				
				
				scope.$watch('dataprovider', function(newValue, oldValue) {
					if (newValue) {
						draw(el, newValue,'','');						
					}
				}, true);

			}
			return {
				link : link,
				restrict : "E",
				scope : {
					dataprovider : "=",
				}
			};
	});