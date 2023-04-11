// Import http from "http";
import axios from "axios";

axios
	.get("http://localhost:3000/in.html")
	.then((res) => {
		console.log(res.status);
		console.log(res.data);
	})
	.catch((error) => {
		console.log(error.response.status);
		console.log(error.response.statusText);
	});
// Const req = http.request("http://dlocalhost:3000", (res) => {
// 	console.log(res.statusCode);

// 	res.setEncoding("utf-8");

// 	res.on("data", (data) => {
// 		console.log(data);
// 	});
// });

// req.on("error", (error) => {
// 	console.error("Error: ", error.message);
// });

// req.end();
