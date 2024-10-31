trait Animal {
    fn make_sound(&self);
}

trait Mammal: Animal {
    fn give_birth(&self);
}

struct Dog;

impl Animal for Dog {
    fn make_sound(&self) {
        println!("Woof!");
    }
}

impl Mammal for Dog {
    fn give_birth(&self) {
        println!("Giving birth to puppies");
    }
}

fn main() {
    let dog = Dog;
    dog.make_sound();
    dog.give_birth();
}

struct Engine {
    horsepower: u32,
}

impl Engine {
    fn start(&self) {
        println!("Engine started with {} horsepower", self.horsepower);
    }
}

struct Car {
    engine: Engine,
    model: String,
}

impl Car {
    fn new(model: String, horsepower: u32) -> Self {
        Car {
            engine: Engine { horsepower },
            model,
        }
    }

    fn start(&self) {
        println!("Starting {}", self.model);
        self.engine.start();
    }
}

fn main() {
    let my_car = Car::new(String::from("Rustmobile"), 200);
    my_car.start();
}

trait Greeter {
    fn greet(&self) {
        println!("Hello!");
    }
}

struct FormalGreeter;
struct CasualGreeter;

impl Greeter for FormalGreeter {}

impl Greeter for CasualGreeter {
    fn greet(&self) {
        println!("Hey there!");
    }
}

fn main() {
    let formal = FormalGreeter;
    let casual = CasualGreeter;

    formal.greet();  // Uses the default implementation
    casual.greet();  // Uses the custom implementation
}

trait Drawable {
    fn draw(&self);
}

struct Circle {
    radius: f64,
}

impl Drawable for Circle {
    fn draw(&self) {
        println!("Drawing a circle with radius {}", self.radius);
    }
}

struct Square {
    side: f64,
}

impl Drawable for Square {
    fn draw(&self) {
        println!("Drawing a square with side {}", self.side);
    }
}

fn draw_shape(shape: &dyn Drawable) {
    shape.draw();
}

fn main() {
    let circle = Circle { radius: 5.0 };
    let square = Square { side: 4.0 };

    draw_shape(&circle);
    draw_shape(&square);
}