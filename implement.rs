struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    // Constructor (associated function)
    fn new(width: u32, height: u32) -> Rectangle {
        Rectangle { width, height }
    }

    // Method
    fn area(&self) -> u32 {
        self.width * self.height
    }

    // Method that modifies the instance
    fn double_size(&mut self) {
        self.width *= 2;
        self.height *= 2;
    }
}

fn main() {
    let mut rect = Rectangle::new(10, 20);
    println!("Area: {}", rect.area());
    rect.double_size();
    println!("New area: {}", rect.area());
}
struct Point {
    x: f64,
    y: f64,
}

impl Point {
    fn new(x: f64, y: f64) -> Point {
        Point { x, y }
    }
}

impl Point {
    fn distance_from_origin(&self) -> f64 {
        (self.x.powi(2) + self.y.powi(2)).sqrt()
    }
}

fn main() {
    let point = Point::new(3.0, 4.0);
    println!("Distance from origin: {}", point.distance_from_origin());
}
trait Printable {
    fn format(&self) -> String;
}

struct Person {
    name: String,
    age: u32,
}

impl Printable for Person {
    fn format(&self) -> String {
        format!("{} ({} years old)", self.name, self.age)
    }
}

fn main() {
    let person = Person { name: String::from("Alice"), age: 30 };
    println!("Formatted: {}", person.format());
}

struct Pair<T> {
    first: T,
    second: T,
}

impl<T: std::fmt::Display> Pair<T> {
    fn new(first: T, second: T) -> Pair<T> {
        Pair { first, second }
    }

    fn print(&self) {
        println!("({}, {})", self.first, self.second);
    }
}

fn main() {
    let pair = Pair::new(1, 2);
    pair.print();

    let string_pair = Pair::new(String::from("hello"), String::from("world"));
    string_pair.print();
}

use std::fmt::Display;

struct Wrapper<T>(T);

impl<T: Display> std::fmt::Display for Wrapper<T> {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        write!(f, "Wrapper({})", self.0)
    }
}

fn main() {
    let w = Wrapper(42);
    println!("w = {}", w);

    let w_string = Wrapper(String::from("hello"));
    println!("w_string = {}", w_string);

    // This would not compile:
    // let w_vec = Wrapper(vec![1, 2, 3]);
    // println!("w_vec = {}", w_vec);
}

trait Greeter {
    fn greet(&self) -> String {
        String::from("Hello!")
    }
}

struct FormalGreeter;
struct CasualGreeter;

impl Greeter for FormalGreeter {}

impl Greeter for CasualGreeter {
    fn greet(&self) -> String {
        String::from("Hey there!")
    }
}

fn main() {
    let formal = FormalGreeter;
    let casual = CasualGreeter;

    println!("Formal: {}", formal.greet());
    println!("Casual: {}", casual.greet());
}