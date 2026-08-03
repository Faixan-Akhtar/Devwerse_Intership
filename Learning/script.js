// const add = (a,b) =>{ return a + b}
// const sub = (a,b) =>{ return a - b}
// const mul = (a,b) =>{ return a * b}
// const div = (a,b) =>{ return a / b}
// console.log(add(2,3))
// console.log(sub(2,3))
// console.log(mul(2,3))
// console.log(div(2,3))


const api = "https://jsonplaceholder.typicode.com/posts"
async function getUser() {
    const response = await fetch(api);
    const data = await response.json()
    console.log(data)
}

getUser()