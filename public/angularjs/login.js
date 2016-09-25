var sf_labor = angular.module('sf_labor', []);

sf_labor.controller('sf_labor', function($scope, $http) {
			// var legendData = [];
			// var xAxisLabel = [];
			// for (var i = 0; i < data.length; i++) {
			// 		xAxisLabel.push(data[i].key);
			// 		legendData.push(data[i].value.length);
			// }

			Highcharts.chart('lineChart', {
	      title: {
	        text: 'Turnout Data'
	      },

	      xAxis: {
	        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
	          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
	        ]
	      },
	      series: [{
					name: "Workers",
	        data: [29, 71, 106, 129, 144, 176, 135, 148, 216, 194, 95, 54]
	      }]
			});



			Highcharts.chart('barChart', {
				chart: {
						type: 'column'
				},
				title: {
					text: 'User Data'
				},

				xAxis: {
					categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
						'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
					],
						crosshair: true
				},
				yAxis: {
						min: 0,
						title: {
								text: 'User SignUps'
						}
				},
				tooltip: {
					headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
					pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
							'<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
					footerFormat: '</table>',
					shared: true,
					useHTML: true
				},
				plotOptions: {
						column: {
								pointPadding: 0.2,
								borderWidth: 0
						}
				},
				series: [{
					name: 'Users',
					data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
				}]
			});

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
