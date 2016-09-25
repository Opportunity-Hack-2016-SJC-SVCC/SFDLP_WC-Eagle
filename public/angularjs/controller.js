var sf_labor = angular.module('sf_labor', []);

sf_labor.controller('controller', function($scope, $http) {

	var selectedGroup ;
	$scope.getMenRankings = function(){
		$http({
			method : "GET",
			url : '/getMenRankings'
		}).success(function(data) {
			$scope.Ranking = data.data;	 
		}).error(function(error) {
		});
	}
	
	$scope.getWomenRankings = function(){
		$http({
			method : "GET",
			url : '/getWomenRankings'
		}).success(function(data) {
			$scope.Ranking = data.data;	 
		}).error(function(error) {
		});
	}	
	
	$scope.getGroups = function(){		
		$http({
			method : "POST",
			url : '/getGroups'
		}).success(function(data) {
			$scope.Groups = data;	 
		}).error(function(error) {
		});
	}

	$scope.getAssociatedRules = function(){
		selectedGroup = $scope.group;
		var selectedGroupId = $scope.group;
		$http({
			method : "POST",
			url : '/getRuleAssociation',
			data : {"groupId" : selectedGroup}
		}).success(function(data) {
			$scope.RuleAssociation = data;	 
		}).error(function(error) {
			$scope.unexpected_error = false;
			$scope.invalid_credentials=true;
		});
	}
	
	$scope.updateRuleAssociation = function(ruleAssociation)
	{
		var isApplicable = 0;

		if(ruleAssociation.is_applicable != 1)
		{
			isApplicable = 1;
		}
		if(ruleAssociation.rule_association_id == null)
		{
			$http({
				method : "POST",
				url : '/insertRuleAssociation',
					data : {
						"ruleId" : ruleAssociation.rule_id,
						"groupId" : selectedGroup,
						"isApplicable" : isApplicable
					}
			}).success(function(data) {

			}).error(function(error) {
				$scope.unexpected_error = false;
				$scope.invalid_credentials=true;
			});
		}
		else
		{
			$http({
				method : "POST",
				url : '/updateRuleAssociation',
					data : {
						"ruleAssociationId" : ruleAssociation.rule_association_id,
						"isApplicable" : isApplicable
					}


			}).success(function(data) {

			}).error(function(error) {
				$scope.unexpected_error = false;
				$scope.invalid_credentials=true;
			});
		}
	}

	$scope.updateRule = function(rule)
	{
		$http({
			method : "POST",
			url : '/updateRule',
			data : {
				"ruleId" : rule.rule_id,
				"rule" : $scope.rule,
				"priority" : $scope.priority,
				"activityPoint" : $scope.activityPoint,
				"expirationDate" : $scope.expirationDate,
			}
		}).success(function(data) {
			if (data.statusCode == 401) {
				$scope.editRuleModal = false;
				alert("Unable to update the rule. Please try again.");

			}
			else {
				$scope.editRuleModal = false;
				$scope.getRules();
			}				 
		}).error(function(error) {
			$scope.unexpected_error = false;
			$scope.invalid_credentials=true;
		});
		//alert(JSON.stringify(rule));
	}

	$scope.getRules = function(){
		$http({
			method : "POST",
			url : '/getRules'
		}).success(function(data) {
			$scope.Rules = data;	 
		}).error(function(error) {
			$scope.unexpected_error = false;
			$scope.invalid_credentials=true;
		});
	}
	
	$scope.editRule = function(rule)
	{
		$scope.RuleToEdit = rule;
		$scope.rule = rule.rule;
		$scope.priority = rule.priority;
		$scope.activityPoint = rule.activity_point;
		$scope.expirationDate = rule.expiration_day;
		$scope.editRuleModal = true;
	}
	
	$scope.updateRule = function(rule)
	{
		$http({
			method : "POST",
			url : '/updateRule',
			data : {
				"ruleId" : rule.rule_id,
				"rule" : $scope.rule,
				"priority" : $scope.priority,
				"activityPoint" : $scope.activityPoint,
				"expirationDate" : $scope.expirationDate,
			}
		}).success(function(data) {
			if (data.statusCode == 401) {
				$scope.editRuleModal = false;
				alert("Unable to update the rule. Please try again.");

			}
			else {
				$scope.editRuleModal = false;
				$scope.getRules();
			}				 
		}).error(function(error) {
			$scope.unexpected_error = false;
			$scope.invalid_credentials=true;
		});
		//alert(JSON.stringify(rule));
	}

})
