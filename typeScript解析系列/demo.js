function greetNane(name: string): string {
    return `hello ${name}`
}

let greetNane: (name: string) => string = function (name: string): string {
    return `hello ${name}`
}

let greetNane: (name: string, age ? : number) => string = function (name: string, age ? : number): string {
    return `hello ${name}`
}

let greetNane: (name: string, age: number = 0) => string = function (name: string, age: number = 0): string {
    return `hello ${name} ${age}`
}

let greetNane: (name: string, age = 0) => string = function (name: string, age = 0): string {
    return `hello ${name} ${age}`
}

let greetNane: (name: string, ...arrs: string[]) => string = function (name: string, ...arrs: string[]): string {
    return `hello ${name} ${age}`
}

function greetNane(name:string) :string;
function greetNane(name:number) :number;
function greetNane(name:boolean) :boolean;
function greetNane(name:(string|number|boolean)):any{
    return name;
}

function greetNane<T>(name:T):T{
    return name
}

greetNane<string>('name')
greetNane('name')