import EventEmitter from "events";

console.clear();

const emitter = new EventEmitter();

emitter.on("hello", (...args) => {
	console.log("hello1", args);
});

emitter.on("hello2", (...args) => {
	console.log("hello21", args);
});

emitter.once("hello", (...args) => {
	console.log("hello2", args);
});

emitter.prependListener("hello", (...args) => {
	console.log("hello0", args);
});

emitter.emit("hello", 1, 1, 1);
emitter.emit("hello", 222);
emitter.emit("hello2", 333);

console.log("after");

console.log(emitter.eventNames());
console.log(emitter.listeners("hello"));

emitter.removeAllListeners("hello");

console.log(emitter.listeners("hello"));
console.log(emitter.listeners("hello2"));
