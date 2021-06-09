// Angular app creation

myAppConstructor
		.directive(
				"samikshaMap",
				function($window) {
					function link(scope, el) {

						var el = el[0];
						var DELAY = 300, clicks = 0, timer = null;

						function onmousemove(d) {
							if($(window).width()> 991)
							d3
									.select(".map_popover")
									.style("display", "block")
									.style("left", (d3.event.pageX) - 160 + "px")
									// TODO:
									.style("top", (d3.event.pageY - 900) + "px")
//									.style("top", "auto")
									.style("opacity", "1");

						}
						function onmouseout() {
							d3.select(".map_popover").style("display", "none");
						}
						function onover(d) {
							var rank = d.properties.NAME1_;
							
							var name = d.properties.NAME1_;
							if (d.properties.utdata && d.properties.utdata.rank) {

								rank = d.properties.utdata.rank;

							} else {
								rank = "Not Available";

							}
							if($(window).width() > 991)
							d3
									.select(".map_popover_close")
									.html(
											"<strong>Name :</strong> "
													+ name
													+ "<br><strong>Rank :</strong> <span style='color:red'>"
													+ rank + "</span>");

							d3.select(this.parentNode.appendChild(this))
									.classed("activehover", true);
						}
						function onout(d) {
							d3.select(this.parentNode.appendChild(this))
									.classed("activehover", false);
						}
						d3.selection.prototype.moveToFront = function() {
							return this.each(function() {
								this.parentNode.appendChild(this);
							});
						};
						scope.mapSetup = function(url, success) {
							d3.select(el).selectAll("*").remove();
							var w = scope.getWindowDimensions();
							var feature = "";

							var width = $(el).parent().width(), height = w.h;
							var rectWidth = width / 3 + 50;
							var projection = d3.geo.mercator().scale(1);
							var path = d3.geo.path().projection(projection);

							var svg = d3.select(el).append("svg").attr("id",
									"mapsvg").attr("width", width).attr(
									"height", height);

							var g = svg.append("g").attr("id", "mapg");

							d3
									.json(
											url,
											function(error, us) {
												if (error)
													return;
												feature = topojson.feature(us,
														us.objects.layer1);
												scope.getThematicMapData();
												var b = path.bounds(feature), s = 0.95 / Math
														.max(
																(b[1][0] - b[0][0])
																		/ width,
																(b[1][1] - b[0][1])
																		/ height);
												projection.scale(s);
												b = d3.geo.bounds(feature);
												projection
														.center([
																(b[1][0] + b[0][0]) / 2,
																(b[1][1] + b[0][1]) / 2 ]);
												projection
														.translate([ width / 2,
																height / 2 ]);

												g
														.append("g")

														.attr("class", "states")
														.selectAll("path")
														.data(
																topojson
																		.feature(
																				us,
																				us.objects.layer1).features)
														.enter()
														.append("path")
														.attr(
																"class",
																function(d) {
																	if (d.properties.NAME1_ == "Uttar Pradesh"
																			|| d.properties.NAME1_ == "Chhattisgarh"
																			|| d.properties.NAME1_ == "Telengana"
																			|| d.properties.NAME1_ == "Tamilnadu") {
																		d3
																				.select(
																						this)
																				.moveToFront();
																		return "data-avilable"

																	}

																})

														.attr("d", path)
														.on("mousedown",
																clickHandler)
														.on("mouseover", onover)
														.on("mouseout", onout);

												g
														.append("path")

														.datum(
																topojson
																		.mesh(
																				us,
																				us.objects.layer1,
																				function(
																						a,
																						b) {
																					return a !== b;
																				}))
														.attr("id",
																"states-borders")
														.attr("d", path);
												g.on("mousemove", onmousemove)
														.on("mouseout",
																onmouseout);

												/*if (success)
													success();*/
											});

							function clickHandler(d) {
								clicks++; // count clicks

								if (clicks === 1) {

									timer = setTimeout(function() {

										clicked(d); // perform
										// single-click
										// action
										clicks = 0; // after action performed,
										// reset counter
									}, DELAY);

								} else {
									clearTimeout(timer); // prevent
									
									clicks = 0; // after action performed, reset
									// counter
								}
							}
							function clicked(d) {
								var area_name = d.properties.NAME1_;
								var area_id = d.properties.ID_;
								scope.showViz(d, area_name);
								

							}

						};
						scope
								.$watch(
										"utdata",
										function() {
											d3
													.select("#mapsvg")
													.selectAll("path")

													.attr(
															"class",
															function(d) {
																if (!(scope.utdata && scope.utdata.dataCollection)) {
																	if (d.properties) {
																		d.properties.utdata = null;
																	}
																	return;
																}
																for (var i = 0; i < scope.utdata.dataCollection.length; i++) {
																	if (d.properties
																			&& d.properties.ID_ == scope.utdata.dataCollection[i].areaCode) {
																		d.properties.utdata = scope.utdata.dataCollection[i];
																		return scope.utdata.dataCollection[i].cssClass + " stateAggregateAvailable";
																	} else {
																		if (d.properties) {
																			d.properties.utdata = null;
																		}
																	}
																}
															});

										}, true);
						

						
						if($(window).width() < 991)
						$(window).resize(function(){
							scope.mapSetup(scope.primary_url, function() {
							// scope.selectedGranularity = new
							// ValueObject("IND", "India");
							// scope.start();
							// scope.complete();
						});
						});

					}
					return {
						link : link,
						restrict : "E"
					};
				});

// ===================================

myAppConstructor
		.directive(
				"thematicLineChart",
				function($window) {
					function link(scope, el) {

						var el = el[0];
						var clicks = 0;

						// Render graph based on 'data'
						scope
								.$watch(
										"dataprovider",
										function(data) {
											function draw(data) {
												d3.select(el).select("svg")
														.remove();
												var w = $(window);
												var wnw = d3.select(el)[0][0].parentNode.clientWidth;
												if (wnw == 0) {
													if (w.width() > 464)
														wnw = 490;
													else {
														wnw = 350;

													}
												}
												var wnh = (w.width() > 940) ? 950
														: 950;
												d3.select("#lineChart");
												var margin = {
													top : wnh / 10,
													right : wnw / 120,
													bottom : wnh / 10,
													left : wnw / 10
												}, width = wnw
														- (2 * (margin.left + margin.right)), height = wnw > 940 ? (wnh / 2.9)
														: (wnh / 2.9)
																- margin.top
																- margin.bottom;

												// set the ranges
												var x = d3.scale.ordinal()
														.rangeRoundBands(
																[ 0, width ],
																1.0);
												var y = d3.scale.linear()
														.rangeRound(
																[ height, 0 ]);

												// define the axis
												var xAxis = d3.svg.axis()
														.scale(x).orient(
																"bottom")
														.ticks(4);
												var yAxis = d3.svg.axis()
														.scale(y)
														.orient("left")
														.ticks(4);

												// // Define the line
												var lineFunction = d3.svg
														.line()
														.x(
																function(d) {
																	return x(d.timeperiod);
																})
														.y(
																function(d) {
																	return y(d.dataValue);
																});

												// Adds the svg canvas

												if (wnw > 940) {
													var svg = d3
															.select(el)
															.append("svg")
															.attr("id",
																	"lineChart")
															.attr("width", wnw)
															.attr(
																	"height",
																	height
																			+ margin.top
																			+ margin.bottom)
															.append("g")
															.attr(
																	"transform",
																	"translate("
																			+ margin.left
																			+ ","
																			+ margin.top
																			+ ")");
												} else {
													var svg = d3
															.select(el)
															.append("svg")
															.attr("id",
																	"lineChart")
															.attr("width", wnw)
															.attr(
																	"height",
																	height
																			+ margin.top
																			+ margin.bottom
																			+ 20)
															.append("g")
															.attr(
																	"transform",
																	"translate("
																			+ 2
																			* margin.left
																			+ ","
																			+ margin.top
																			+ ")");
												}

												// Get the data
												data
														.forEach(function(d) {
															// console.log(d);
															d.timeperiod = d.timeperiod;
															d.dataValue = +d.dataValue;
														});

												x.domain(data.map(function(d) {
													return d.timeperiod;
												}));
												// Y domain set using loop
												var flag = false;
												data
														.forEach(function(d) {
															if (d.dataValue > 100) {
																y
																		.domain([
																				0,
																				d3
																						.max(
																								data,
																								function(
																										d) {
																									return d.dataValue;
																								}) ]);
																flag = true;
															}
														});

												if (!flag) {
													y.domain([ 0, 100 ]);

												}

												// Nest the entries by symbol
												var dataNest = d3.nest().key(
														function(d) {
															return d.key;
														}).entries(data);

												// Loop through each symbol /
												// key

												if (data[0].areaName)
													var color = d3.scale
															.ordinal()
															.range(
																	[
																			"#E92D0C",
																			"#256ba7",
																			"#349626"]);
												else
													var color = d3.scale
															.ordinal()
															.range(
																	[
																			"#386d5c", ]);

												// Add the X Axis
												svg
														.append("g")
														.attr("class", "x axis")
														.attr(
																"transform",
																"translate(0,"
																		+ height
																		+ ")")
														.call(xAxis)
														.append("text")
														.attr(
																"x",
																width
																		- margin.right)
														.attr("y",
																margin.bottom)
														.attr("dx", "8.71em")
														.style("text-anchor",
																"middle")
														.text("Time Period")
														.attr("x", width / 2 - 50)
														// 
														.attr("y", 65)
														.style(
																{
																	"fill" : "grey",
																	"font-weight" : "bold"
																});
												if (data[0].areaName)
													svg
															.selectAll(
																	".tick text")
															.style(
																	"text-anchor",
																	"end")
															.attr("dx", "-.8em")
															.attr("dy", ".15em")
															.style(
																	{
																		"fill" : "#333a3b",
																		"font-weight" : "normal",
																		"font-size" : "xx-small"
																	})
															.attr(
																	"transform",
																	function(d) {
																		return "rotate(-45)";
																	});
												else
													svg
															.selectAll(
																	".tick text")
															.style(
																	"text-anchor",
																	"end")
															.attr("dx", "-.8em")
															.attr("dy", ".15em")
															.style(
																	{
																		"fill" : "grey",
																		"font-weight" : "normal"
																	})
															.attr(
																	"transform",
																	function(d) {
																		return "rotate(-45)";
																	});

												// Add the Y Axis
												var ya = svg.append("g").attr(
														"class", "y axis")
														.call(yAxis);
												if (data[0].areaName)
													ya
															.selectAll("text")
															.style(
																	{
																		"fill" : "grey",
																		"font-weight" : "normal",
																		"font-size" : "xx-small",
																	});
												else
													ya
															.selectAll("text")
															.style(
																	{
																		"fill" : "grey",
																		"font-weight" : "normal"
																	});
												ya
														.append("text")
														.attr("transform",
																"rotate(-90)")
														.attr("y", -60)
														.attr("x", -height / 2)
														.attr("dy", "1.2em")
														.style("text-anchor",
																"middle")
														.style(
																{
																	"font-weight" : "bold"
																})
														.text(function(d) {
															return "Percent";
														})
														.style("fill", "grey");

												// adding multiple line chart

												for (var index = 0; index < dataNest.length; index++) {

													var series = svg
															.selectAll(
																	".series")
															.data(
																	dataNest[index].values)
															.enter()
															.append("g")
															.attr("class",
																	"series")
															.attr(
																	"id",
																	"tag"
																			+ dataNest[index].key);

													series
															.select(".line")
															.data(
																	function() {
																		return dataNest[index].values;
																	})
															.enter()
															.append("path")
															.attr(
																	"id",
																	"tag"
																			+ dataNest[index].key)
															.attr(
																	"d",
																	function(d) {
																		return lineFunction(dataNest[index].values);
																	})
															.style(
																	"stroke",
																	function(d) {
																		return color(dataNest[index].key);
																	})
															.style(
																	"stroke-width",
																	"2px")
															.style("fill",
																	"none")
															.style(
																	"incorporate",
																	"ordinal");

													series
															.select(".point")
															.data(
																	function() {
																		return dataNest[index].values;
																	})
															.enter()
															.append("circle")
															.attr(
																	"id",
																	"tag"
																			+ dataNest[index].key)
															.attr("class",
																	"point")
															.attr(
																	"cx",
																	function(d) {
																		return x(d.timeperiod);
																	})
															.attr(
																	"cy",
																	function(d) {
																		return y(d.dataValue);
																	})
															.attr("r", "3px")
															.style(
																	"fill",
																	function(d) {
																		return color(dataNest[index].key);
																	})
															.style("stroke",
																	"none")
															.style(
																	"stroke-width",
																	"2px")
															.on(
																	"mouseover",
																	function(d) {
																		showPopover
																				.call(
																						this,
																						d);
																	})
															.on(
																	"mouseout",
																	function(d) {
																		removePopovers();
																	});

												}

												function removePopovers() {
													$('.popover')
															.each(
																	function() {
																		$(this)
																				.remove();
																	});
												}
												function showPopover(d) {
													$(this)
															.popover(
																	{
																		title : '',
																		placement : 'auto top',
																		container : 'body',
																		trigger : 'manual',
																		html : true,
																		content : function() {
																			//if (d.areaName)
																				return "<span style='color:#333a3b'>"
																						+ "AreaName : "
																						+ "</span>"
																						+ "<span style='color:#6057bb'>"
																						+ d.areaName
																						+ "</span>"
																						+ "<br/>"
																						+ "<span style='color:#333a3b'>"
																						+ "Percentage : "
																						+ "</span>"
																						+ "<span style='color:#6057bb'>"
																						+ d.dataValue
																						+ "%"
																						+ "</span>"
																					
																						;
																		}
																	});
													$(this).popover('show');
												}
											}
											;
											if (data)
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
