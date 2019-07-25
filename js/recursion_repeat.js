var s1 = [
  9,
  null,
  true,
  false,
  "Hello world",
]
var s2 = [
  [],
  [8],
  ["hi"],
  [8, "hi"],
  [1, 0, -1, -0.3, 0.3, 1343.32, 3345, 0.0999],
  [8, [[], 3, 4]],
  [[["foo"]]],
];
var s3 = [
  {},
  {"a": "apple"},
  {"foo": true, "bar": false, "baz": null},
  {"boolean, true": true, "boolean, false": false, "null": null}
]
var s4 = [
  {"a": {"b": "c"}},
  {"a": ["b", "c"]},
  [{"a": "b"}, {"c": "d"}],
  {"a": [], "c": {}, "b": true}
];

const stringifyJSON = (obj) => {
  // console.log("진입: ", obj);
  //불린, null, 숫자는 return
  //문자열은 문자열 유지해서 return
  if (typeof obj === "number" || obj === null || typeof obj === "boolean") {
    return '' + obj;
  } else if (typeof obj === "string") {
    return `"${obj}"`;
  }
  var myArr = [];
  if (Array.isArray(obj)) {
    if (Array.length === 0) {
      return '[]'
    } else {
      for (let key in obj) {
        if (typeof obj[key] === "number" || obj[key] === null || typeof obj[key] === "boolean" || typeof obj[key] === "string") {
          myArr.push(stringifyJSON(obj[key]));
        } else if (typeof obj[key] === "object"){
          myArr.push(stringifyJSON(obj[key]));
        }
      }
      return '[' + myArr.join(',') + ']'
    }
  } else {
    var myObj = [];
    if (Object.keys(obj).length === 0) {
      return '{}'
    } else {
      for (let key in obj) {
        console.log("key: ",key,"  robj[key]: ", obj[key])
        if (typeof obj[key] === "number" || obj[key] === null || typeof obj[key] === "boolean" || typeof obj[key] === "string") {
          myObj.push(stringifyJSON(key) + ":" + stringifyJSON(obj[key]));
        } else if ( typeof obj[key] === 'object') {
          myObj.push(stringifyJSON(key) + ":" + stringifyJSON(obj[key]));
        }
      }
      return '{' + {myObj} + '}';
    }
  }
};


console.log(stringifyJSON(s1), "1단계");
console.log(stringifyJSON(s2), "2단계");
console.log(stringifyJSON(s3), "3단계");
console.log(stringifyJSON(s4), "4단계");
