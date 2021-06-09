var sdrc_export = new function() {
	"use strict";
	this.root = "http://localhost/";
	this.init = function(rootUri) {
		this.root = rootUri;
		//console.log("in init");
	};

	// Please give container Id and export pdf btn ids
	this.export_pdf = function(containerId, exportPdfbtn) {
		$("#" + exportPdfbtn)
				.on("click",function(event) {
					$("#loader-mask").show();
					$('html, body').animate({
					    scrollTop: $('#legendsection').offset().top
					}, 1000);
					var $scope = angular.element("body").scope();
							event.preventDefault();
							var topBottom;
							var legend;
//							$('#pdfDownloadBtn').html('<i class="fa fa-lg fa-download"></i> Download PDF <img src="resources/images/preloader.gif" />');
							
							var areaName = $("#area").val();
							{
							d3.selectAll("svg").attr("version", 1.1).attr("xmlns", "http://www.w3.org/2000/svg");
							
							d3.select("#mapsvg").selectAll("path").attr("style",function(d) {
								return  "fill:"+ $(this).css('fill')+";stroke:"+$(this).css('stroke');
							});
							var samikshaMapg = $("samiksha-map").html().replace(/\&nbsp;/g, " ");
							//var legendImage = "<svg>" + $(".legendssection").html().replace("nbsp;", "");
							//var topBottomContainer = "<svg>" + $("#legendssection").html().replace("nbsp;", "");
							//remove style
							d3.select("#mapsvg").selectAll("path").attr('style', null);
							
						{
							   
							    var topBottomContainer = $("#tbsection");
								var legendContainer = $("#legendsection");
								var svgs=[] ;
								html2canvas($("#tbsection"),
										{
											useCORS : true,
											onrendered : function(canvas) {
												//var serverUrl = sdrc_export.root+ "/exportToPdf";
												//console.log(canvas.toDataURL('image/png', 1.0));
												svgs.push(canvas.toDataURL('image/png', 1.0));
												topBottom = canvas.toDataURL('image/png', 1.0);
												//$("#imageTopBottomBase64").val(canvas.toDataURL("image/png"));
												
												html2canvas(
														$("#legendsection"),
														{
															useCORS : true,
															onrendered : function(canvas) {

																legend = canvas.toDataURL('image/png', 1.0);
																
																svgs.push(canvas.toDataURL('image/png', 1.0));
																
																svgs.push(samikshaMapg);
																
																
																svgs.push($(window).width());
																svgs.push($scope.selectedSection.value);
																svgs.push($scope.selectedSubSection.value);
																
																var serverUrl="exportMapData?indicatorId=" + $scope.selectedIndicator.description
																	+ '&sourceNid=' + $scope.sourceId
																	+ '&areaId=' + $scope.selectedState.area_id
																	+ '&timeperiodId=' + $scope.selectedTimeperiod.key
																	+ '&parentAreaId=' + $scope.selectedState.parent_area_id
																	+ '&facilityTypeId=' + $scope.selectedFacilityType.id;
																$.ajax({
																	url:serverUrl,
																	method:'POST',
																	data:JSON.stringify(svgs),
																	contentType : 'application/json',
																	 success:function(result){
																		 if(result ==null || result.trim()=="")
																			 {
																			 $scope.formError="Something Went Wrong";
																			 }
																		 else
																		{	 
																		var data = {"fileName" :result};
																		$.download("downloadFile",data,'POST');
																		}
																		
																		
																  	}// end
																		// of
																		// success
																});
															}
														});
												
											}
//										});
//							  	}//end of success
							});
								}
							
							}
				});
	};

	this.export_pdfLine = function(containerId, exportPdfbtn) {
		$("#" + exportPdfbtn)
		.on("click",function(event) {
//			$(".loader").css("display", "block");
			$("#loader-mask").show();
			var $scope = angular.element("body").scope();
			event.preventDefault();
			$scope.lineChartImage=undefined;
			
			
//			$('#pdfDownloadBtnForIndex').html('<i class="fa fa-lg fa-download"></i><img src="resources/images/preloader.gif" />');
			d3.selectAll("svg").attr("version", 1.1).attr("xmlns", "http://www.w3.org/2000/svg");
			
			d3.select("#mapsvg").selectAll("path").attr("style",function(d) {
				return  "fill:"+ $(this).css('fill')+";stroke:"+$(this).css('stroke');
			});
			var samikshaMapg = $("samiksha-map").html().replace(/\&nbsp;/g, " ");
			//var legendImage = "<svg>" + $(".legendssection").html().replace("nbsp;", "");
			//var topBottomContainer = "<svg>" + $("#legendssection").html().replace("nbsp;", "");
			//remove style
			d3.select("#mapsvg").selectAll("path").attr('style', null);
			
			d3.selectAll("svg").attr("version", 1.1).attr("xmlns", "http://www.w3.org/2000/svg");
			
			d3.select("#lineChart").selectAll("path").attr("style",function(d) {
				return  "fill:"+ $(this).css('fill')+";stroke:"+$(this).css('stroke');
			});
			var trendSvg = $("thematic-line-chart").html();
			 var topBottomContainer = $("#tbsection");
				var legendContainer = $("#legendsection");
				var topBottom;
				var legend;
				var svgs=[] ;
			//d3.select("#trendsvg").selectAll("path").attr('style', null);
			$('#lineChart').css('display', "hidden");
			$('#trendPdfButton').css('display', "hidden");
			 html2canvas($("#trendDiv"), {
		            useCORS: true,
		            onrendered: function(canvas) {
		            	$scope.lineChartImage = canvas.toDataURL('image/png', 1.0);
		            
							html2canvas($("#tbsection"),
									{
										useCORS : true,
										onrendered : function(canvas) {
											//var serverUrl = sdrc_export.root+ "/exportToPdf";
											//console.log(canvas.toDataURL('image/png', 1.0));
											svgs.push(canvas.toDataURL('image/png', 1.0));
											topBottom = canvas.toDataURL('image/png', 1.0);
											//$("#imageTopBottomBase64").val(canvas.toDataURL("image/png"));
											
											html2canvas(
													$("#legendsection"),
													{
														useCORS : true,
														onrendered : function(canvas) {

															legend = canvas.toDataURL('image/png', 1.0);
															
															svgs.push(canvas.toDataURL('image/png', 1.0));
															
															svgs.push(samikshaMapg);
															
															
															svgs.push($(window).width());
															sendData();
														 }
											        });
		            }
		        });
							
		            }});
			 
			 function sendData()
			 {
				 	
					$('#lineChart').css('display', "block");
					$('#trendPdfButton').css('display', "block");
				 var serverURL="exportLineData?indicatorId=" + $scope.selectedIndicator.description
					+ '&sourceNid=' + $scope.sourceId
					+ '&areaId=' + $scope.selectedState.area_id
					+ '&timeperiodId=' + $scope.selectedTimeperiod.key
					+ '&parentAreaId=' + $scope.selectedState.parent_area_id
					+'&area_NId=' + $scope.selectedTrend.properties.utdata.areaNid+
					'&periodicity='+ $scope.selectedQuarter.key
					+ '&facilityTypeId=' + $scope.selectedFacilityType.id;
				 svgs.push($scope.lineChartImage);
				 svgs.push($scope.selectedTrendArea);
				 svgs.push($scope.selectedIndicator.value);
				 svgs.push(trendSvg);
				 svgs.push($scope.selectedSection.value);
				svgs.push($scope.selectedSubSection.value);
				 console.log(svgs)
				 $.ajax({
						url : serverURL, 
						method : 'POST',
						data : JSON.stringify(svgs),
						contentType : 'application/json',
						success : function(result) {
							if(result ==null || result.trim()=="")
							 {
							 $scope.formError="Something Went Wrong";
							 }
						 else
						{	 
						var fileName = {"fileName" :result};
						$.download("downloadFile", fileName, 'POST');
//						$('#pdfDownloadBtnForIndex').html('<i class="fa fa-lg fa-download"></i>');
						}
						}
					});
			 }
	
		});
		
	};

};

// download a file
$.download = function(url, data, method) {
	// url and data options required
	if (url && data) {
		// data can be string of parameters or array/object
		data = typeof data == 'string' ? data : jQuery.param(data);
		// split params into form inputs
		var inputs = '';
		jQuery.each(data.split('&'), function() {
			var pair = this.split('=');
			inputs += '<input type="hidden" name="' + pair[0] + '" value="'	+ pair[1] + '" />';
		});
		// send request
		jQuery(
				'<form action="' + url + '" method="' + (method || 'post')
						+ '">' + inputs + '</form>').appendTo('body')
				.submit().remove();
		$("#loader-mask").fadeOut();
	}
	;
this.export_excel = function() {
	alert("excel exported");
};
};
