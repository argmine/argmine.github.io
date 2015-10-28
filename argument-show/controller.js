/**
 * Created by tuanchauict on 12/12/14.
 */

var app = angular.module("argumentDemo", []);

app.controller('ArgumentController', ['$scope', function($scope){
	$scope.attrs = {
		filterSentiment: "All",
		filterSrcType: "All",
		sentiments: sentiments,
		sourceTypes: sourceTypes,
		topic: 0,
		topics: topics
	};

	$scope.restData = data;

	$scope.data = $scope.restData[$scope.attrs.topic];

}]);

app.filter("filterBySentiment", function(){
	return function(children, sentiment){
		console.log("length =", children.length);
		if(sentiment == 'All'){
			return children;
		}
		var list = [];
		children.forEach(function(child){
			if(child.sentiment === sentiment){
				list.push(child);
			}
		});
		return list;
	};
});

app.filter("filterBySrcType", function(){
	return function(children, srcType){
		if(srcType === 'All'){
			return children;
		}
		var list = [];
//		console.log(srcType);
		children.forEach(function(child){
//			console.log(child.sourceType, '  vs.  ',srcType)
			if(child.sourceType == srcType){
				list.push(child);
			}
		});
//		console.log('number of children: ', list.length);

		return list;
	};
});