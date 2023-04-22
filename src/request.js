import axios from "axios";

const url = "http://localhost:3000";

axios
	.get(url + "/todos")
	.then((res) => console.log(res.data))
	.catch((error) => console.log(error));
