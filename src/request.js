import axios from "axios";

const data = { x: 1, y: 2 };
const url = "http://localhost:3000/api";

axios.post(url, data);
