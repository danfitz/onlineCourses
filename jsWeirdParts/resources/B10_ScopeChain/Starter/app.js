function a() {
	function b() {
		console.log(myVar);
	}

	b();
	var myVar = 2;
}

var myVar = 1;
a();