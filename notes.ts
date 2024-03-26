// Notes for TypeScript.

// how to declare a variable
// Types include: number, string, boolean, null, undefined, object, any, unknown, never, enum, and tuple
let age: number = 123_456_789

// now we cannot set to a string as such
// age = 'a'

// typescript infers types as is the case below.
let course = 'TypeScript'
let isTrue = true
let randomThing: any

// We can declare arrays explicitly
let numbers: number[] = []
// or as
let moreNumbers = [1, 2, 3]

// tuples allow us to specify the a list with distinct items
let user: [number, string] = [1, 'Yossi']

// we can create enums which is a set of constants
enum Size {
	Small = 0,
	Medium = 1,
	Large = 2,
}
// first value defaults to 0 and increments
// We use it as such
let mySize: Size = Size.Medium

// functions also need to be annotated with input and return values
function calculateTax(income: number, rate?: number): number | void {
	if (income < 50_000) return 0
	else if (rate) return income * rate
	else return
}

// Next, how do we create objects
// TS infers the shape of an object
const someObject = { name: 'name', id: 1 }
// Or we can explicitly annotate
const anotherObject: {
	name: string
	readonly id: number
	logger: (name: string) => void
} = {
	name: 'name',
	id: 1,
	logger: (name: string) => {
		console.log(name)
	},
}

// A better way to do this is to use a type alias
type Employee = {
	name: string
	readonly id: number
	logger: (name: string) => void
}

const employee: Employee = {
	name: 'name',
	id: 1,
	logger: (name: string) => {
		console.log(name)
	},
}

// Union types with type narrowing for better inference
function kgToLbs(unit: number | string): number {
	if (typeof unit === 'number') {
		return unit * 2.2
	}
	return parseInt(unit) * 2.2
}

// Intersection types
type Draggable = {
	drag: () => void
}

type Resizable = {
	resize: () => void
}

type uiWidget = Draggable & Resizable

// We can also use literal types
let quantity: 50 | 100 = 50
// Or type Quantity = 50 | 100

// Nullable types. Null and undefined are not the same

// We can also use interfaces rather than types. As such:
interface Author {
	name: string
	avatar: string
}

const authorOne: Author = { name: 'mario', avatar: 'mario_image' }

// Generics give us more flexibility
function getFirstElement<T>(array: T[]) {
	return array[0]
}

const number = [1, 2, 3]
const firstNum = getFirstElement<number>(numbers)

// another example
type ApiResponse<T = { status: number }> = {
	data: T
	isError: boolean
}

type UserResponse = { name: string; age: number }

const response: ApiResponse<UserResponse> = {
	data: {
		name: 'kyle',
		age: 28,
	},
	isError: false,
}
