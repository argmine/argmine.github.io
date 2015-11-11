//preprocessor

var list = [];

var mapSourceTypes = {};
var sourceTypes = [];
var mapSentiments = {};
var sentiments = [];
// data.depth = 0;
// data.active = true;

var topics = [];
console.log(data);
var stack = [];
for(var i = 0; i < data.length; i++){
	stack[i] = data[i];
	list[i] = data[i];
	topics[i] = {
		id: i,
		name: data[i].content
	};
}

console.log("topics", topics);


while (stack.length > 0) {
	var n = stack.pop();
	mapSourceTypes[n.sourceType] = 1;
	mapSentiments[n.sentiment] = 1;

	if (n.children) {
		for (var i = n.children.length - 1; i >= 0; i--) {
			var c = n.children[i];
			stack.push(c);
			c.depth = n.depth + 1;
			c.active = false;
			c.parent = n;
			list.push(c);
		}
	}
}

//console.log(list);
for (var k in mapSourceTypes) {
	if (mapSourceTypes.hasOwnProperty(k))
		sourceTypes.push(k);
}

for (var k in mapSentiments) {
	if (mapSentiments.hasOwnProperty(k))
		sentiments.push(k);
}

sourceTypes = sourceTypes.sort();
sentiments = sentiments.sort();

console.log("data length =", data.children.length);
