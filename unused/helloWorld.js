const list = [0, 1, 2, 3]
const otherLists = {id: 'hello', name: 'world'}
const newList = list.map((integer) => integer + 1)
console.log(newList)
for (let key in otherLists) {
    console.log(otherLists[key])
}