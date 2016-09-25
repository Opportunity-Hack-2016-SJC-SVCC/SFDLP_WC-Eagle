var sf_labor = angular.module('sf_labor1', []);

sf_labor.controller('sf_labor1', function($scope, $http) {
			// var legendData = [];
			// var xAxisLabel = [];
			// for (var i = 0; i < data.length; i++) {
			// 		xAxisLabel.push(data[i].key);
			// 		legendData.push(data[i].value.length);
			// }
			var month_name = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
				'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
			];
			$http({
				method : "GET",
				url : '/jobsgraph'
			}).success(function(response){
				$scope.categories = [];
				$scope.counts =[];
				console.log(response.data);
				for(dt in response.data){
					$scope.categories.push(month_name[response.data[dt].month]);
					$scope.counts.push(response.data[dt].jobs);
				}

				console.log($scope.categories);
				console.log($scope.counts);

				var months = $scope.categories;

				var values = $scope.counts;
				console.log(values);
				// [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4];

							Highcharts.chart('lineChart', {
					      title: {
					        text: 'Jobs Assigned Data'
					      },

					      xAxis: {
					        categories: months

					      },
					      series: [{
									name: "Workers",
					        data: values
					      }]
							});
			});

			$http({
				method : "GET",
				url : '/eventsgraph'
			}).success(function(response){
				$scope.categories = [];
				$scope.counts =[];
				console.log("events graph");
				console.log(response.data);
				for(dt in response.data){
					$scope.categories.push(month_name[response.data[dt].month]);
					$scope.counts.push(response.data[dt].events);
				}

				console.log($scope.categories);
				console.log($scope.counts);

				var month = $scope.categories;

				var events = $scope.counts;
				//console.log(values);
				// [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4];

							Highcharts.chart('lineChart2', {
								title: {
									text: 'Event Engagement Data'
								},

								xAxis: {
									categories: month

								},
								series: [{
									name: "Workers",
									data: events
								}]
							});


			});

			$http({
				method : "GET",
				url : '/signupGraph'
			}).success(function(response){
				$scope.categories = [];
				$scope.counts =[];
				console.log("signup graph");
				console.log(response.data);
				for(dt in response.data){
					$scope.categories.push(month_name[response.data[dt].month]);
					$scope.counts.push(response.data[dt].registrations);
				}

				console.log($scope.categories);
				console.log($scope.counts);

				var month1 = $scope.categories;

				var signups = $scope.counts;
				//console.log(values);
				// [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4];

							Highcharts.chart('lineChart3', {
								chart: {
						  		type: 'column'
						   	},
								title: {
									text: 'Total Users'
								},
								xAxis: {
									categories: month1
								},
								series: [{
									name: "Workers",
									data: signups
								}]
							});
			});

			// Highcharts.chart('barChart', {
			// 	chart: {
			// 			type: 'column'
			// 	},
			// 	title: {
			// 		text: 'User Data'
			// 	},
			//
			// 	xAxis: {
			// 		categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
			// 			'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
			// 		],
			// 			crosshair: true
			// 	},
			// 	yAxis: {
			// 			min: 0,
			// 			title: {
			// 					text: 'User SignUps'
			// 			}
			// 	},
			// 	tooltip: {
			// 		headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
			// 		pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
			// 				'<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
			// 		footerFormat: '</table>',
			// 		shared: true,
			// 		useHTML: true
			// 	},
			// 	plotOptions: {
			// 			column: {
			// 					pointPadding: 0.2,
			// 					borderWidth: 0
			// 			}
			// 	},
			// 	series: [{
			// 		name: 'Users',
			// 		data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
			// 	}]
			// });
			//
			// var legendData = [1,2,3,4];
			// var xAxisLabel = ["Jan","Feb","Mar","Apr"];
			// $('#barChart').highcharts({
			// 		chart: {
			// 				plotShadow: true,
			// 				type: 'bar'
			// 		},
			// 		title: {
			// 				text: 'Top Open Responsible Parties'
			// 		},
			// 		xAxis: {
			// 				categories: xAxisLabel,
			// 				title: {
			// 						text: null
			// 				}
			// 		},
			// 		yAxis: {
			// 				min: 0,
			// 				title: {
			// 						text: 'Count',
			// 						align: 'high'
			// 				},
			// 				labels: {
			// 						overflow: 'justify'
			// 				}
			// 		},
			// 		tooltip: {
			// 				valueSuffix: ' '
			// 		},
			// 		plotOptions: {
			// 				bar: {
			// 						dataLabels: {
			// 								enabled: true
			// 						}
			// 				}
			// 		},
			// 		credits: {
			// 				enabled: false
			// 		},
			// 		series: [{
			// 				name: 'Count',
			// 				colorByPoint: true,
			// 				data: legendData
			// 		}]
			// });
})
