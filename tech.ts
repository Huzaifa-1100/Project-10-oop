#! /usr/bin/env node
import inquirer from "inquirer";

class Student {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}
class Person {
  students: Student[] = [];
  addStudent(obj: Student) {
    this.students.push(obj);
  }
}

const persons = new Person();

console.log("Welcome Chat Box");

const programStart = async (persons: Person) => {
  do {
    const ans = await inquirer.prompt({
      name: "select",
      message: "Who do you want to talk to?",
      type: "list",
      choices: ["staff", "Student", "Exit"],
    });

    if (ans.select === "staff") {
      console.log("You approach the staff room feel free to ask any question");
    }
    if (ans.select === "Student") {
      const answers = await inquirer.prompt({
        name: "student",
        type: "input",
        message: "Which student do you want to talk to?",
      });
      const student = persons.students.find(
        (val) => val.name === answers.student
      );
      if (!student) {
        const name = new Student(answers.student);
        persons.addStudent(name);
        console.log(`Hello I am ${name.name} and I am fine.`);
        console.log("New Student added");
        console.log("Current Student list");
        console.log(persons.students);
      }
      if (student) {
        console.log(`Hello I am ${student.name} and I am already here.`);
        console.log("Existin student list:");
        console.log(persons.students);
      }
    }
    if (ans.select === "Exit") {
      console.log("Bye Bye");
      process.exit();
    }
  } while (true);
};

programStart(persons);
