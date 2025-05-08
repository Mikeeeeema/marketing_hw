var id = 1;
console.log(id);

function addNumber(num1: number, num2: number): number {
  return num1 + num2;
}

const sumNumber = (a: number, b: number): number => {
  return a + b;
};

const gen = <T>(a: T, b: T): T => {
  return a;
};

interface Person {
  name: string;
  age: number;
}

//class have to give a initialized value
class Person {
  name!: string;
  age!: number;
}

class Trainer implements Person {
  name = "mike";
  age = 15;
}

abstract class HumanBeing {
  abstract height: string;
  work = (): void => {
    console.log("to work");
  };
}

class humanworker extends HumanBeing {
  height = "123";
}
class demo {
  public n1 = 1;
  private n2 = 2;
  protected n3 = 3;
}

const test = new demo();
console.log(test.n1);

function delay(ms: number): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`waited for ${ms}ms`), ms);
  });
}

async function run() {
  console.log("start");
  const result = await delay(1000);
  console.log(result);
  console.log("end");
}

run();

function fetchData(success: boolean): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (success) {
        resolve("Data fetched successfully!");
      } else {
        reject("Fetch failed due to network error.");
      }
    }, 1500);
  });
}

async function runExample() {
  fetchData(false)
    .then((res) => console.log("Result: ", res))
    .catch((err) => console.log("Error: ", err));
}

runExample();
