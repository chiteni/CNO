window.JS_COURSE = [
  {
    "id": 1,
    "name": "Variables and Data Types",
    "slides": [
      {
        "kind": "intro",
        "title": "1.1  What is a variable?",
        "text": "A variable is a named box that stores a value."
      },
      {
        "kind": "code",
        "title": "1.1  What is a variable?",
        "code": "let score = 10;",
        "text": "Create a variable using let; its value can change later.",
        "step": "CODE WALKTHROUGH  •  STEP 1 OF 2"
      },
      {
        "kind": "code",
        "title": "1.1  What is a variable?",
        "code": "let score = 10;\nconsole.log(score);",
        "text": "Display this value in the console. Check the output after running the code.",
        "step": "CODE WALKTHROUGH  •  STEP 2 OF 2"
      },
      {
        "kind": "output",
        "title": "1.1  What is a variable?",
        "text": "10"
      },
      {
        "kind": "exercise",
        "title": "1.1  What is a variable?",
        "text": "Store 5 lives and print them."
      },
      {
        "kind": "solution",
        "title": "1.1  What is a variable?",
        "code": "let lives = 5;\nconsole.log(lives);"
      },
      {
        "kind": "intro",
        "title": "1.2  let and const",
        "text": "Use let for a value that may change; use const for a value you do not reassign."
      },
      {
        "kind": "code",
        "title": "1.2  let and const",
        "code": "let score = 0;",
        "text": "Create a variable using let; its value can change later.",
        "step": "CODE WALKTHROUGH  •  STEP 1 OF 4"
      },
      {
        "kind": "code",
        "title": "1.2  let and const",
        "code": "let score = 0;\nconst maxLives = 3;",
        "text": "Create a variable and store a value. const cannot be reassigned.",
        "step": "CODE WALKTHROUGH  •  STEP 2 OF 4"
      },
      {
        "kind": "code",
        "title": "1.2  let and const",
        "code": "let score = 0;\nconst maxLives = 3;\nscore = 10;",
        "text": "Assign a new value to the variable or calculate a result.",
        "step": "CODE WALKTHROUGH  •  STEP 3 OF 4"
      },
      {
        "kind": "code",
        "title": "1.2  let and const",
        "code": "let score = 0;\nconst maxLives = 3;\nscore = 10;\nconsole.log(score, maxLives);",
        "text": "Display this value in the console. Check the output after running the code.",
        "step": "CODE WALKTHROUGH  •  STEP 4 OF 4"
      },
      {
        "kind": "output",
        "title": "1.2  let and const",
        "text": "10 3"
      },
      {
        "kind": "exercise",
        "title": "1.2  let and const",
        "text": "Create a constant called teamName and print it."
      },
      {
        "kind": "solution",
        "title": "1.2  let and const",
        "code": "const teamName = \"Tigers\";\nconsole.log(teamName);"
      },
      {
        "kind": "intro",
        "title": "1.3  Numbers, strings, and booleans",
        "text": "A number is used for calculations, a string is text, and a boolean is true or false."
      },
      {
        "kind": "code",
        "title": "1.3  Numbers, strings, and booleans",
        "code": "let goals = 2;",
        "text": "Create a variable using let; its value can change later.",
        "step": "CODE WALKTHROUGH  •  STEP 1 OF 4"
      },
      {
        "kind": "code",
        "title": "1.3  Numbers, strings, and booleans",
        "code": "let goals = 2;\nlet name = \"Ali\";",
        "text": "Create a variable using let; its value can change later.",
        "step": "CODE WALKTHROUGH  •  STEP 2 OF 4"
      },
      {
        "kind": "code",
        "title": "1.3  Numbers, strings, and booleans",
        "code": "let goals = 2;\nlet name = \"Ali\";\nlet winner = true;",
        "text": "Create a variable using let; its value can change later.",
        "step": "CODE WALKTHROUGH  •  STEP 3 OF 4"
      },
      {
        "kind": "code",
        "title": "1.3  Numbers, strings, and booleans",
        "code": "let goals = 2;\nlet name = \"Ali\";\nlet winner = true;\nconsole.log(goals, name, winner);",
        "text": "Display this value in the console. Check the output after running the code.",
        "step": "CODE WALKTHROUGH  •  STEP 4 OF 4"
      },
      {
        "kind": "output",
        "title": "1.3  Numbers, strings, and booleans",
        "text": "2 Ali true"
      },
      {
        "kind": "exercise",
        "title": "1.3  Numbers, strings, and booleans",
        "text": "Store age 14, nickname \"Ace\", and isReady false."
      },
      {
        "kind": "solution",
        "title": "1.3  Numbers, strings, and booleans",
        "code": "let age = 14;\nlet nickname = \"Ace\";\nlet isReady = false;"
      },
      {
        "kind": "intro",
        "title": "1.4  Declaring and assigning variables",
        "text": "Declaring creates a variable; assigning gives it a value."
      },
      {
        "kind": "code",
        "title": "1.4  Declaring and assigning variables",
        "code": "let points;",
        "text": "Create a variable using let; its value can change later.",
        "step": "CODE WALKTHROUGH  •  STEP 1 OF 3"
      },
      {
        "kind": "code",
        "title": "1.4  Declaring and assigning variables",
        "code": "let points;\npoints = 50;",
        "text": "Assign a new value to the variable or calculate a result.",
        "step": "CODE WALKTHROUGH  •  STEP 2 OF 3"
      },
      {
        "kind": "code",
        "title": "1.4  Declaring and assigning variables",
        "code": "let points;\npoints = 50;\nconsole.log(points);",
        "text": "Display this value in the console. Check the output after running the code.",
        "step": "CODE WALKTHROUGH  •  STEP 3 OF 3"
      },
      {
        "kind": "output",
        "title": "1.4  Declaring and assigning variables",
        "text": "50"
      },
      {
        "kind": "exercise",
        "title": "1.4  Declaring and assigning variables",
        "text": "Declare level, assign 2, and print it."
      },
      {
        "kind": "solution",
        "title": "1.4  Declaring and assigning variables",
        "code": "let level;\nlevel = 2;\nconsole.log(level);"
      },
      {
        "kind": "intro",
        "title": "1.5  Changing variable values",
        "text": "A let variable can receive a new value as the program runs."
      },
      {
        "kind": "code",
        "title": "1.5  Changing variable values",
        "code": "let lives = 3;",
        "text": "Create a variable using let; its value can change later.",
        "step": "CODE WALKTHROUGH  •  STEP 1 OF 3"
      },
      {
        "kind": "code",
        "title": "1.5  Changing variable values",
        "code": "let lives = 3;\nlives = 2;",
        "text": "Assign a new value to the variable or calculate a result.",
        "step": "CODE WALKTHROUGH  •  STEP 2 OF 3"
      },
      {
        "kind": "code",
        "title": "1.5  Changing variable values",
        "code": "let lives = 3;\nlives = 2;\nconsole.log(lives);",
        "text": "Display this value in the console. Check the output after running the code.",
        "step": "CODE WALKTHROUGH  •  STEP 3 OF 3"
      },
      {
        "kind": "output",
        "title": "1.5  Changing variable values",
        "text": "2"
      },
      {
        "kind": "exercise",
        "title": "1.5  Changing variable values",
        "text": "Start with score 5, change it to 15, and print."
      },
      {
        "kind": "solution",
        "title": "1.5  Changing variable values",
        "code": "let score = 5;\nscore = 15;\nconsole.log(score);"
      },
      {
        "kind": "intro",
        "title": "1.6  Basic arithmetic: +, -, *, /, %",
        "text": "Arithmetic operators calculate results. The % operator finds a remainder."
      },
      {
        "kind": "code",
        "title": "1.6  Basic arithmetic: +, -, *, /, %",
        "code": "console.log(8 + 2);",
        "text": "Display this value in the console. Check the output after running the code.",
        "step": "CODE WALKTHROUGH  •  STEP 1 OF 2"
      },
      {
        "kind": "code",
        "title": "1.6  Basic arithmetic: +, -, *, /, %",
        "code": "console.log(8 + 2);\nconsole.log(8 % 3);",
        "text": "Display this value in the console. Check the output after running the code.",
        "step": "CODE WALKTHROUGH  •  STEP 2 OF 2"
      },
      {
        "kind": "output",
        "title": "1.6  Basic arithmetic: +, -, *, /, %",
        "text": "10, then 2"
      },
      {
        "kind": "exercise",
        "title": "1.6  Basic arithmetic: +, -, *, /, %",
        "text": "Print the remainder of 11 divided by 4."
      },
      {
        "kind": "solution",
        "title": "1.6  Basic arithmetic: +, -, *, /, %",
        "code": "console.log(11 % 4); // 3"
      },
      {
        "kind": "intro",
        "title": "1.7  Increment and decrement: ++, --",
        "text": "++ adds one; -- subtracts one. They are shortcuts for updating a number."
      },
      {
        "kind": "code",
        "title": "1.7  Increment and decrement: ++, --",
        "code": "let coins = 4;",
        "text": "Create a variable using let; its value can change later.",
        "step": "CODE WALKTHROUGH  •  STEP 1 OF 3"
      },
      {
        "kind": "code",
        "title": "1.7  Increment and decrement: ++, --",
        "code": "let coins = 4;\ncoins++;",
        "text": "Increase the counter by one.",
        "step": "CODE WALKTHROUGH  •  STEP 2 OF 3"
      },
      {
        "kind": "code",
        "title": "1.7  Increment and decrement: ++, --",
        "code": "let coins = 4;\ncoins++;\nconsole.log(coins);",
        "text": "Display this value in the console. Check the output after running the code.",
        "step": "CODE WALKTHROUGH  •  STEP 3 OF 3"
      },
      {
        "kind": "output",
        "title": "1.7  Increment and decrement: ++, --",
        "text": "5"
      },
      {
        "kind": "exercise",
        "title": "1.7  Increment and decrement: ++, --",
        "text": "Start at 7 and subtract one using --."
      },
      {
        "kind": "solution",
        "title": "1.7  Increment and decrement: ++, --",
        "code": "let lives = 7;\nlives--;\nconsole.log(lives); // 6"
      },
      {
        "kind": "intro",
        "title": "1.8  Displaying results using console.log()",
        "text": "console.log() prints information in the browser console, useful for learning and debugging."
      },
      {
        "kind": "code",
        "title": "1.8  Displaying results using console.log()",
        "code": "let ball = \"football\";",
        "text": "Create a variable using let; its value can change later.",
        "step": "CODE WALKTHROUGH  •  STEP 1 OF 2"
      },
      {
        "kind": "code",
        "title": "1.8  Displaying results using console.log()",
        "code": "let ball = \"football\";\nconsole.log(ball);",
        "text": "Display this value in the console. Check the output after running the code.",
        "step": "CODE WALKTHROUGH  •  STEP 2 OF 2"
      },
      {
        "kind": "output",
        "title": "1.8  Displaying results using console.log()",
        "text": "football"
      },
      {
        "kind": "exercise",
        "title": "1.8  Displaying results using console.log()",
        "text": "Print the number 100 and the text \"GO!\"."
      },
      {
        "kind": "solution",
        "title": "1.8  Displaying results using console.log()",
        "code": "console.log(100);\nconsole.log(\"GO!\");"
      },
      {
        "kind": "intro",
        "title": "1.9  Variable naming and common mistakes",
        "text": "Use descriptive names without spaces. Names are case-sensitive; do not start them with a digit."
      },
      {
        "kind": "code",
        "title": "1.9  Variable naming and common mistakes",
        "code": "let playerScore = 10;",
        "text": "Create a variable using let; its value can change later.",
        "step": "CODE WALKTHROUGH  •  STEP 1 OF 2"
      },
      {
        "kind": "code",
        "title": "1.9  Variable naming and common mistakes",
        "code": "let playerScore = 10;\nconsole.log(playerScore);",
        "text": "Display this value in the console. Check the output after running the code.",
        "step": "CODE WALKTHROUGH  •  STEP 2 OF 2"
      },
      {
        "kind": "output",
        "title": "1.9  Variable naming and common mistakes",
        "text": "10"
      },
      {
        "kind": "exercise",
        "title": "1.9  Variable naming and common mistakes",
        "text": "Correct the invalid name 2goals."
      },
      {
        "kind": "solution",
        "title": "1.9  Variable naming and common mistakes",
        "code": "let goals2 = 2;\nconsole.log(goals2);"
      }
    ],
    "lessons": 9
  },
  {
    "id": 2,
    "name": "Conditions and Decisions",
    "slides": [
      {
        "kind": "intro",
        "title": "2.1  What is a condition?",
        "text": "A condition is a question that JavaScript checks as true or false."
      },
      {
        "kind": "code",
        "title": "2.1  What is a condition?",
        "code": "let score = 20;",
        "text": "Create a variable using let; its value can change later.",
        "step": "CODE WALKTHROUGH  •  STEP 1 OF 2"
      },
      {
        "kind": "code",
        "title": "2.1  What is a condition?",
        "code": "let score = 20;\nconsole.log(score > 10);",
        "text": "Display this value in the console. Check the output after running the code.",
        "step": "CODE WALKTHROUGH  •  STEP 2 OF 2"
      },
      {
        "kind": "output",
        "title": "2.1  What is a condition?",
        "text": "true"
      },
      {
        "kind": "exercise",
        "title": "2.1  What is a condition?",
        "text": "Print whether 7 is greater than 9."
      },
      {
        "kind": "solution",
        "title": "2.1  What is a condition?",
        "code": "console.log(7 > 9); // false"
      },
      {
        "kind": "intro",
        "title": "2.2  Comparison operators: >, <, >=, <=, ===, !==",
        "text": "Comparisons check size or equality. === checks equal value and type; !== checks not equal."
      },
      {
        "kind": "code",
        "title": "2.2  Comparison operators: >, <, >=, <=, ===, !==",
        "code": "console.log(5 >= 5);",
        "text": "Display this value in the console. Check the output after running the code.",
        "step": "CODE WALKTHROUGH  •  STEP 1 OF 2"
      },
      {
        "kind": "code",
        "title": "2.2  Comparison operators: >, <, >=, <=, ===, !==",
        "code": "console.log(5 >= 5);\nconsole.log(5 === \"5\");",
        "text": "Display this value in the console. Check the output after running the code.",
        "step": "CODE WALKTHROUGH  •  STEP 2 OF 2"
      },
      {
        "kind": "output",
        "title": "2.2  Comparison operators: >, <, >=, <=, ===, !==",
        "text": "true, then false"
      },
      {
        "kind": "exercise",
        "title": "2.2  Comparison operators: >, <, >=, <=, ===, !==",
        "text": "Check whether 12 is less than or equal to 15."
      },
      {
        "kind": "solution",
        "title": "2.2  Comparison operators: >, <, >=, <=, ===, !==",
        "code": "console.log(12 <= 15); // true"
      },
      {
        "kind": "intro",
        "title": "2.3  if",
        "text": "if runs a block only when its condition is true."
      },
      {
        "kind": "code",
        "title": "2.3  if",
        "code": "let score = 100;",
        "text": "Create a variable using let; its value can change later.",
        "step": "CODE WALKTHROUGH  •  STEP 1 OF 2"
      },
      {
        "kind": "code",
        "title": "2.3  if",
        "code": "let score = 100;\nif (score >= 100) { console.log(\"Level up!\"); }",
        "text": "Check the condition. The instruction runs only when the test is true.",
        "step": "CODE WALKTHROUGH  •  STEP 2 OF 2"
      },
      {
        "kind": "output",
        "title": "2.3  if",
        "text": "Level up!"
      },
      {
        "kind": "exercise",
        "title": "2.3  if",
        "text": "Print \"Goal!\" if goals is above 0."
      },
      {
        "kind": "solution",
        "title": "2.3  if",
        "code": "let goals = 2;\nif (goals > 0) { console.log(\"Goal!\"); }"
      },
      {
        "kind": "intro",
        "title": "2.4  if...else",
        "text": "if...else chooses one of two paths."
      },
      {
        "kind": "code",
        "title": "2.4  if...else",
        "code": "let lives = 0;",
        "text": "Create a variable using let; its value can change later.",
        "step": "CODE WALKTHROUGH  •  STEP 1 OF 3"
      },
      {
        "kind": "code",
        "title": "2.4  if...else",
        "code": "let lives = 0;\nif (lives > 0) { console.log(\"Play\"); }",
        "text": "Check the condition. The instruction runs only when the test is true.",
        "step": "CODE WALKTHROUGH  •  STEP 2 OF 3"
      },
      {
        "kind": "code",
        "title": "2.4  if...else",
        "code": "let lives = 0;\nif (lives > 0) { console.log(\"Play\"); }\nelse { console.log(\"Game over\"); }",
        "text": "Run this alternative when the previous condition was false.",
        "step": "CODE WALKTHROUGH  •  STEP 3 OF 3"
      },
      {
        "kind": "output",
        "title": "2.4  if...else",
        "text": "Game over"
      },
      {
        "kind": "exercise",
        "title": "2.4  if...else",
        "text": "Print \"Pass\" if mark >= 50, otherwise \"Try again\"."
      },
      {
        "kind": "solution",
        "title": "2.4  if...else",
        "code": "let mark = 60;\nif (mark >= 50) { console.log(\"Pass\"); }\nelse { console.log(\"Try again\"); }"
      },
      {
        "kind": "intro",
        "title": "2.5  if...else if...else",
        "text": "else if lets you test more than two possibilities in order."
      },
      {
        "kind": "code",
        "title": "2.5  if...else if...else",
        "code": "let score = 70;",
        "text": "Create a variable using let; its value can change later.",
        "step": "CODE WALKTHROUGH  •  STEP 1 OF 4"
      },
      {
        "kind": "code",
        "title": "2.5  if...else if...else",
        "code": "let score = 70;\nif (score >= 90) console.log(\"Gold\");",
        "text": "Check the condition. The instruction runs only when the test is true.",
        "step": "CODE WALKTHROUGH  •  STEP 2 OF 4"
      },
      {
        "kind": "code",
        "title": "2.5  if...else if...else",
        "code": "let score = 70;\nif (score >= 90) console.log(\"Gold\");\nelse if (score >= 60) console.log(\"Silver\");",
        "text": "Test another condition if the earlier condition was false.",
        "step": "CODE WALKTHROUGH  •  STEP 3 OF 4"
      },
      {
        "kind": "code",
        "title": "2.5  if...else if...else",
        "code": "let score = 70;\nif (score >= 90) console.log(\"Gold\");\nelse if (score >= 60) console.log(\"Silver\");\nelse console.log(\"Bronze\");",
        "text": "Run this alternative when the previous condition was false.",
        "step": "CODE WALKTHROUGH  •  STEP 4 OF 4"
      },
      {
        "kind": "output",
        "title": "2.5  if...else if...else",
        "text": "Silver"
      },
      {
        "kind": "exercise",
        "title": "2.5  if...else if...else",
        "text": "Print \"High\" for speed >= 10, otherwise \"Low\"."
      },
      {
        "kind": "solution",
        "title": "2.5  if...else if...else",
        "code": "let speed = 12;\nif (speed >= 10) console.log(\"High\");\nelse console.log(\"Low\");"
      },
      {
        "kind": "intro",
        "title": "2.6  Logical operators: &&, ||, !",
        "text": "&& means both, || means either, and ! reverses a boolean."
      },
      {
        "kind": "code",
        "title": "2.6  Logical operators: &&, ||, !",
        "code": "let age = 14;",
        "text": "Create a variable using let; its value can change later.",
        "step": "CODE WALKTHROUGH  •  STEP 1 OF 3"
      },
      {
        "kind": "code",
        "title": "2.6  Logical operators: &&, ||, !",
        "code": "let age = 14;\nlet hasTicket = true;",
        "text": "Create a variable using let; its value can change later.",
        "step": "CODE WALKTHROUGH  •  STEP 2 OF 3"
      },
      {
        "kind": "code",
        "title": "2.6  Logical operators: &&, ||, !",
        "code": "let age = 14;\nlet hasTicket = true;\nconsole.log(age >= 13 && hasTicket);",
        "text": "Display this value in the console. Check the output after running the code.",
        "step": "CODE WALKTHROUGH  •  STEP 3 OF 3"
      },
      {
        "kind": "output",
        "title": "2.6  Logical operators: &&, ||, !",
        "text": "true"
      },
      {
        "kind": "exercise",
        "title": "2.6  Logical operators: &&, ||, !",
        "text": "Print true when lives > 0 AND score >= 10."
      },
      {
        "kind": "solution",
        "title": "2.6  Logical operators: &&, ||, !",
        "code": "let lives = 2, score = 15;\nconsole.log(lives > 0 && score >= 10);"
      },
      {
        "kind": "intro",
        "title": "2.7  Combining multiple conditions",
        "text": "Combine conditions to describe realistic rules."
      },
      {
        "kind": "code",
        "title": "2.7  Combining multiple conditions",
        "code": "let coins = 8, level = 2;",
        "text": "Create a variable using let; its value can change later.",
        "step": "CODE WALKTHROUGH  •  STEP 1 OF 2"
      },
      {
        "kind": "code",
        "title": "2.7  Combining multiple conditions",
        "code": "let coins = 8, level = 2;\nif (coins >= 5 && level >= 2) console.log(\"Unlock\");",
        "text": "Check the condition. The instruction runs only when the test is true.",
        "step": "CODE WALKTHROUGH  •  STEP 2 OF 2"
      },
      {
        "kind": "output",
        "title": "2.7  Combining multiple conditions",
        "text": "Unlock"
      },
      {
        "kind": "exercise",
        "title": "2.7  Combining multiple conditions",
        "text": "Unlock if stars >= 3 OR vip is true."
      },
      {
        "kind": "solution",
        "title": "2.7  Combining multiple conditions",
        "code": "let stars = 1, vip = true;\nif (stars >= 3 || vip) console.log(\"Unlock\");"
      },
      {
        "kind": "intro",
        "title": "2.8  Nested conditions (simple introduction)",
        "text": "A nested condition is an if placed inside another if."
      },
      {
        "kind": "code",
        "title": "2.8  Nested conditions (simple introduction)",
        "code": "let loggedIn = true, points = 50;",
        "text": "Create a variable using let; its value can change later.",
        "step": "CODE WALKTHROUGH  •  STEP 1 OF 4"
      },
      {
        "kind": "code",
        "title": "2.8  Nested conditions (simple introduction)",
        "code": "let loggedIn = true, points = 50;\nif (loggedIn) {",
        "text": "Check the condition. The instruction runs only when the test is true.",
        "step": "CODE WALKTHROUGH  •  STEP 2 OF 4"
      },
      {
        "kind": "code",
        "title": "2.8  Nested conditions (simple introduction)",
        "code": "let loggedIn = true, points = 50;\nif (loggedIn) {\nif (points >= 50) console.log(\"Bonus\");",
        "text": "Check the condition. The instruction runs only when the test is true.",
        "step": "CODE WALKTHROUGH  •  STEP 3 OF 4"
      },
      {
        "kind": "code",
        "title": "2.8  Nested conditions (simple introduction)",
        "code": "let loggedIn = true, points = 50;\nif (loggedIn) {\nif (points >= 50) console.log(\"Bonus\");\n}",
        "text": "This brace marks the end or start of a code block.",
        "step": "CODE WALKTHROUGH  •  STEP 4 OF 4"
      },
      {
        "kind": "output",
        "title": "2.8  Nested conditions (simple introduction)",
        "text": "Bonus"
      },
      {
        "kind": "exercise",
        "title": "2.8  Nested conditions (simple introduction)",
        "text": "Print \"Ready\" only if hasBall and energy > 0."
      },
      {
        "kind": "solution",
        "title": "2.8  Nested conditions (simple introduction)",
        "code": "let hasBall = true, energy = 3;\nif (hasBall) {\nif (energy > 0) console.log(\"Ready\");\n}"
      },
      {
        "kind": "intro",
        "title": "2.9  Common mistakes in conditions",
        "text": "Common mistakes include = instead of ===, missing braces, and checking the wrong boundary."
      },
      {
        "kind": "code",
        "title": "2.9  Common mistakes in conditions",
        "code": "let score = 10;",
        "text": "Create a variable using let; its value can change later.",
        "step": "CODE WALKTHROUGH  •  STEP 1 OF 2"
      },
      {
        "kind": "code",
        "title": "2.9  Common mistakes in conditions",
        "code": "let score = 10;\nif (score === 10) console.log(\"Exactly ten\");",
        "text": "Check the condition. The instruction runs only when the test is true.",
        "step": "CODE WALKTHROUGH  •  STEP 2 OF 2"
      },
      {
        "kind": "output",
        "title": "2.9  Common mistakes in conditions",
        "text": "Exactly ten"
      },
      {
        "kind": "exercise",
        "title": "2.9  Common mistakes in conditions",
        "text": "Fix: if (score = 10) to test equality."
      },
      {
        "kind": "solution",
        "title": "2.9  Common mistakes in conditions",
        "code": "let score = 10;\nif (score === 10) console.log(\"Match\");"
      }
    ],
    "lessons": 9
  },
  {
    "id": 3,
    "name": "Loops",
    "slides": [
      {
        "kind": "intro",
        "title": "3.1  Why do we need loops?",
        "text": "A loop repeats instructions without copying the same line many times."
      },
      {
        "kind": "code",
        "title": "3.1  Why do we need loops?",
        "code": "for (let i = 1; i <= 3; i++) console.log(\"Go!\");",
        "text": "Start a for loop: initialize a counter, test the condition, then update it.",
        "step": "CODE WALKTHROUGH  •  STEP 1 OF 1"
      },
      {
        "kind": "output",
        "title": "3.1  Why do we need loops?",
        "text": "Go! printed three times"
      },
      {
        "kind": "exercise",
        "title": "3.1  Why do we need loops?",
        "text": "Print \"Kick\" twice with a loop."
      },
      {
        "kind": "solution",
        "title": "3.1  Why do we need loops?",
        "code": "for (let i = 0; i < 2; i++) console.log(\"Kick\");"
      },
      {
        "kind": "intro",
        "title": "3.2  for loop",
        "text": "A for loop contains a starting value, a condition, and an update."
      },
      {
        "kind": "code",
        "title": "3.2  for loop",
        "code": "for (let i = 1; i <= 4; i++) console.log(i);",
        "text": "Start a for loop: initialize a counter, test the condition, then update it.",
        "step": "CODE WALKTHROUGH  •  STEP 1 OF 1"
      },
      {
        "kind": "output",
        "title": "3.2  for loop",
        "text": "1, 2, 3, 4"
      },
      {
        "kind": "exercise",
        "title": "3.2  for loop",
        "text": "Count from 0 to 3."
      },
      {
        "kind": "solution",
        "title": "3.2  for loop",
        "code": "for (let i = 0; i <= 3; i++) console.log(i);"
      },
      {
        "kind": "intro",
        "title": "3.3  Counter, condition, and increment",
        "text": "The counter changes each repetition; the condition decides when to stop."
      },
      {
        "kind": "code",
        "title": "3.3  Counter, condition, and increment",
        "code": "for (let i = 2; i <= 6; i += 2) console.log(i);",
        "text": "Start a for loop: initialize a counter, test the condition, then update it.",
        "step": "CODE WALKTHROUGH  •  STEP 1 OF 1"
      },
      {
        "kind": "output",
        "title": "3.3  Counter, condition, and increment",
        "text": "2, 4, 6"
      },
      {
        "kind": "exercise",
        "title": "3.3  Counter, condition, and increment",
        "text": "Print 3, 6, 9 using a loop."
      },
      {
        "kind": "solution",
        "title": "3.3  Counter, condition, and increment",
        "code": "for (let i = 3; i <= 9; i += 3) console.log(i);"
      },
      {
        "kind": "intro",
        "title": "3.4  while loop",
        "text": "while repeats while a condition stays true; update its variable to avoid an endless loop."
      },
      {
        "kind": "code",
        "title": "3.4  while loop",
        "code": "let n = 1;",
        "text": "Create a variable using let; its value can change later.",
        "step": "CODE WALKTHROUGH  •  STEP 1 OF 2"
      },
      {
        "kind": "code",
        "title": "3.4  while loop",
        "code": "let n = 1;\nwhile (n <= 3) { console.log(n); n++; }",
        "text": "Repeat the instructions while the condition remains true.",
        "step": "CODE WALKTHROUGH  •  STEP 2 OF 2"
      },
      {
        "kind": "output",
        "title": "3.4  while loop",
        "text": "1, 2, 3"
      },
      {
        "kind": "exercise",
        "title": "3.4  while loop",
        "text": "Print 1 to 4 with while."
      },
      {
        "kind": "solution",
        "title": "3.4  while loop",
        "code": "let n = 1;\nwhile (n <= 4) { console.log(n); n++; }"
      },
      {
        "kind": "intro",
        "title": "3.5  do...while loop",
        "text": "do...while runs the body at least once before checking its condition."
      },
      {
        "kind": "code",
        "title": "3.5  do...while loop",
        "code": "let n = 5;",
        "text": "Create a variable using let; its value can change later.",
        "step": "CODE WALKTHROUGH  •  STEP 1 OF 2"
      },
      {
        "kind": "code",
        "title": "3.5  do...while loop",
        "code": "let n = 5;\ndo { console.log(n); n++; } while (n < 5);",
        "text": "Run this block first, then test whether to repeat.",
        "step": "CODE WALKTHROUGH  •  STEP 2 OF 2"
      },
      {
        "kind": "output",
        "title": "3.5  do...while loop",
        "text": "5 once"
      },
      {
        "kind": "exercise",
        "title": "3.5  do...while loop",
        "text": "Print \"Start\" once even when ready is false."
      },
      {
        "kind": "solution",
        "title": "3.5  do...while loop",
        "code": "let ready = false;\ndo { console.log(\"Start\"); } while (ready);"
      },
      {
        "kind": "intro",
        "title": "3.6  Difference between the three loops",
        "text": "for suits known counts; while suits condition-driven repetition; do...while always runs once."
      },
      {
        "kind": "code",
        "title": "3.6  Difference between the three loops",
        "code": "for (let i = 0; i < 2; i++) console.log(\"Ball\");",
        "text": "Start a for loop: initialize a counter, test the condition, then update it.",
        "step": "CODE WALKTHROUGH  •  STEP 1 OF 1"
      },
      {
        "kind": "output",
        "title": "3.6  Difference between the three loops",
        "text": "Ball twice"
      },
      {
        "kind": "exercise",
        "title": "3.6  Difference between the three loops",
        "text": "Use a for loop to print 1, 2, 3."
      },
      {
        "kind": "solution",
        "title": "3.6  Difference between the three loops",
        "code": "for (let i = 1; i <= 3; i++) console.log(i);"
      },
      {
        "kind": "intro",
        "title": "3.7  Loops with if conditions",
        "text": "Put an if inside a loop to select only certain repetitions."
      },
      {
        "kind": "code",
        "title": "3.7  Loops with if conditions",
        "code": "for (let i = 1; i <= 5; i++) {",
        "text": "Start a for loop: initialize a counter, test the condition, then update it.",
        "step": "CODE WALKTHROUGH  •  STEP 1 OF 3"
      },
      {
        "kind": "code",
        "title": "3.7  Loops with if conditions",
        "code": "for (let i = 1; i <= 5; i++) {\nif (i % 2 === 0) console.log(i);",
        "text": "Check the condition. The instruction runs only when the test is true.",
        "step": "CODE WALKTHROUGH  •  STEP 2 OF 3"
      },
      {
        "kind": "code",
        "title": "3.7  Loops with if conditions",
        "code": "for (let i = 1; i <= 5; i++) {\nif (i % 2 === 0) console.log(i);\n}",
        "text": "This brace marks the end or start of a code block.",
        "step": "CODE WALKTHROUGH  •  STEP 3 OF 3"
      },
      {
        "kind": "output",
        "title": "3.7  Loops with if conditions",
        "text": "2, 4"
      },
      {
        "kind": "exercise",
        "title": "3.7  Loops with if conditions",
        "text": "Print multiples of 3 from 1 to 9."
      },
      {
        "kind": "solution",
        "title": "3.7  Loops with if conditions",
        "code": "for (let i = 1; i <= 9; i++) {\nif (i % 3 === 0) console.log(i);\n}"
      },
      {
        "kind": "intro",
        "title": "3.8  break and continue",
        "text": "break exits a loop; continue skips the current repetition."
      },
      {
        "kind": "code",
        "title": "3.8  break and continue",
        "code": "for (let i = 1; i <= 5; i++) {",
        "text": "Start a for loop: initialize a counter, test the condition, then update it.",
        "step": "CODE WALKTHROUGH  •  STEP 1 OF 4"
      },
      {
        "kind": "code",
        "title": "3.8  break and continue",
        "code": "for (let i = 1; i <= 5; i++) {\nif (i === 3) continue;",
        "text": "Check the condition. The instruction runs only when the test is true.",
        "step": "CODE WALKTHROUGH  •  STEP 2 OF 4"
      },
      {
        "kind": "code",
        "title": "3.8  break and continue",
        "code": "for (let i = 1; i <= 5; i++) {\nif (i === 3) continue;\nconsole.log(i);",
        "text": "Display this value in the console. Check the output after running the code.",
        "step": "CODE WALKTHROUGH  •  STEP 3 OF 4"
      },
      {
        "kind": "code",
        "title": "3.8  break and continue",
        "code": "for (let i = 1; i <= 5; i++) {\nif (i === 3) continue;\nconsole.log(i);\n}",
        "text": "This brace marks the end or start of a code block.",
        "step": "CODE WALKTHROUGH  •  STEP 4 OF 4"
      },
      {
        "kind": "output",
        "title": "3.8  break and continue",
        "text": "1, 2, 4, 5"
      },
      {
        "kind": "exercise",
        "title": "3.8  break and continue",
        "text": "Stop a loop when i reaches 4."
      },
      {
        "kind": "solution",
        "title": "3.8  break and continue",
        "code": "for (let i = 1; i <= 6; i++) {\nif (i === 4) break;\nconsole.log(i);\n}"
      },
      {
        "kind": "intro",
        "title": "3.9  Infinite loops and how to avoid them",
        "text": "An infinite loop never ends because its condition stays true. Always plan the update."
      },
      {
        "kind": "code",
        "title": "3.9  Infinite loops and how to avoid them",
        "code": "let n = 0;",
        "text": "Create a variable using let; its value can change later.",
        "step": "CODE WALKTHROUGH  •  STEP 1 OF 3"
      },
      {
        "kind": "code",
        "title": "3.9  Infinite loops and how to avoid them",
        "code": "let n = 0;\nwhile (n < 3) { n++; }",
        "text": "Repeat the instructions while the condition remains true.",
        "step": "CODE WALKTHROUGH  •  STEP 2 OF 3"
      },
      {
        "kind": "code",
        "title": "3.9  Infinite loops and how to avoid them",
        "code": "let n = 0;\nwhile (n < 3) { n++; }\nconsole.log(n);",
        "text": "Display this value in the console. Check the output after running the code.",
        "step": "CODE WALKTHROUGH  •  STEP 3 OF 3"
      },
      {
        "kind": "output",
        "title": "3.9  Infinite loops and how to avoid them",
        "text": "3; loop stops safely"
      },
      {
        "kind": "exercise",
        "title": "3.9  Infinite loops and how to avoid them",
        "text": "Fix a while loop so it stops at 5."
      },
      {
        "kind": "solution",
        "title": "3.9  Infinite loops and how to avoid them",
        "code": "let n = 0;\nwhile (n < 5) { n++; }"
      },
      {
        "kind": "intro",
        "title": "3.10  Nested loops (optional)",
        "text": "Nested loops repeat an inner loop for each outer-loop step."
      },
      {
        "kind": "code",
        "title": "3.10  Nested loops (optional)",
        "code": "for (let row = 1; row <= 2; row++) {",
        "text": "Start a for loop: initialize a counter, test the condition, then update it.",
        "step": "CODE WALKTHROUGH  •  STEP 1 OF 3"
      },
      {
        "kind": "code",
        "title": "3.10  Nested loops (optional)",
        "code": "for (let row = 1; row <= 2; row++) {\nfor (let col = 1; col <= 3; col++) console.log(row, col);",
        "text": "Start a for loop: initialize a counter, test the condition, then update it.",
        "step": "CODE WALKTHROUGH  •  STEP 2 OF 3"
      },
      {
        "kind": "code",
        "title": "3.10  Nested loops (optional)",
        "code": "for (let row = 1; row <= 2; row++) {\nfor (let col = 1; col <= 3; col++) console.log(row, col);\n}",
        "text": "This brace marks the end or start of a code block.",
        "step": "CODE WALKTHROUGH  •  STEP 3 OF 3"
      },
      {
        "kind": "output",
        "title": "3.10  Nested loops (optional)",
        "text": "Six row/column pairs"
      },
      {
        "kind": "exercise",
        "title": "3.10  Nested loops (optional)",
        "text": "Print \"*\" six times with 2-by-3 loops."
      },
      {
        "kind": "solution",
        "title": "3.10  Nested loops (optional)",
        "code": "for (let r = 0; r < 2; r++) {\nfor (let c = 0; c < 3; c++) console.log(\"*\");\n}"
      }
    ],
    "lessons": 10
  },
  {
    "id": 4,
    "name": "Functions",
    "slides": [
      {
        "kind": "intro",
        "title": "4.1  What is a function?",
        "text": "A function is a reusable set of instructions with a name."
      },
      {
        "kind": "code",
        "title": "4.1  What is a function?",
        "code": "function cheer() { console.log(\"Goal!\"); }",
        "text": "Define a reusable function. Its instructions run when the function is called.",
        "step": "CODE WALKTHROUGH  •  STEP 1 OF 2"
      },
      {
        "kind": "code",
        "title": "4.1  What is a function?",
        "code": "function cheer() { console.log(\"Goal!\"); }\ncheer();",
        "text": "Call the function by writing its name followed by parentheses.",
        "step": "CODE WALKTHROUGH  •  STEP 2 OF 2"
      },
      {
        "kind": "output",
        "title": "4.1  What is a function?",
        "text": "Goal!"
      },
      {
        "kind": "exercise",
        "title": "4.1  What is a function?",
        "text": "Create greet() that prints \"Hello\"."
      },
      {
        "kind": "solution",
        "title": "4.1  What is a function?",
        "code": "function greet() { console.log(\"Hello\"); }\ngreet();"
      },
      {
        "kind": "intro",
        "title": "4.2  Creating a function",
        "text": "Declare a function with function, a name, parentheses, and a body."
      },
      {
        "kind": "code",
        "title": "4.2  Creating a function",
        "code": "function startGame() { console.log(\"Start\"); }",
        "text": "Define a reusable function. Its instructions run when the function is called.",
        "step": "CODE WALKTHROUGH  •  STEP 1 OF 1"
      },
      {
        "kind": "output",
        "title": "4.2  Creating a function",
        "text": "Nothing prints until it is called"
      },
      {
        "kind": "exercise",
        "title": "4.2  Creating a function",
        "text": "Define sayHi() that prints \"Hi\"."
      },
      {
        "kind": "solution",
        "title": "4.2  Creating a function",
        "code": "function sayHi() { console.log(\"Hi\"); }"
      },
      {
        "kind": "intro",
        "title": "4.3  Calling a function",
        "text": "Calling a function runs its body. Add parentheses after its name."
      },
      {
        "kind": "code",
        "title": "4.3  Calling a function",
        "code": "function kick() { console.log(\"Kick!\"); }",
        "text": "Define a reusable function. Its instructions run when the function is called.",
        "step": "CODE WALKTHROUGH  •  STEP 1 OF 3"
      },
      {
        "kind": "code",
        "title": "4.3  Calling a function",
        "code": "function kick() { console.log(\"Kick!\"); }\nkick();",
        "text": "Call the function by writing its name followed by parentheses.",
        "step": "CODE WALKTHROUGH  •  STEP 2 OF 3"
      },
      {
        "kind": "code",
        "title": "4.3  Calling a function",
        "code": "function kick() { console.log(\"Kick!\"); }\nkick();\nkick();",
        "text": "Call the function by writing its name followed by parentheses.",
        "step": "CODE WALKTHROUGH  •  STEP 3 OF 3"
      },
      {
        "kind": "output",
        "title": "4.3  Calling a function",
        "text": "Kick! twice"
      },
      {
        "kind": "exercise",
        "title": "4.3  Calling a function",
        "text": "Define wave() and call it once."
      },
      {
        "kind": "solution",
        "title": "4.3  Calling a function",
        "code": "function wave() { console.log(\"Wave\"); }\nwave();"
      },
      {
        "kind": "intro",
        "title": "4.4  Functions without parameters",
        "text": "A function without parameters performs the same action each time."
      },
      {
        "kind": "code",
        "title": "4.4  Functions without parameters",
        "code": "function reset() { console.log(\"Score: 0\"); }",
        "text": "Define a reusable function. Its instructions run when the function is called.",
        "step": "CODE WALKTHROUGH  •  STEP 1 OF 2"
      },
      {
        "kind": "code",
        "title": "4.4  Functions without parameters",
        "code": "function reset() { console.log(\"Score: 0\"); }\nreset();",
        "text": "Call the function by writing its name followed by parentheses.",
        "step": "CODE WALKTHROUGH  •  STEP 2 OF 2"
      },
      {
        "kind": "output",
        "title": "4.4  Functions without parameters",
        "text": "Score: 0"
      },
      {
        "kind": "exercise",
        "title": "4.4  Functions without parameters",
        "text": "Write a function that prints \"Ready\"."
      },
      {
        "kind": "solution",
        "title": "4.4  Functions without parameters",
        "code": "function ready() { console.log(\"Ready\"); }\nready();"
      },
      {
        "kind": "intro",
        "title": "4.5  Functions with one parameter",
        "text": "A parameter receives a value when the function is called."
      },
      {
        "kind": "code",
        "title": "4.5  Functions with one parameter",
        "code": "function cheer(name) { console.log(\"Go \" + name); }",
        "text": "Define a reusable function. Its instructions run when the function is called.",
        "step": "CODE WALKTHROUGH  •  STEP 1 OF 2"
      },
      {
        "kind": "code",
        "title": "4.5  Functions with one parameter",
        "code": "function cheer(name) { console.log(\"Go \" + name); }\ncheer(\"Maya\");",
        "text": "Call the function by writing its name followed by parentheses.",
        "step": "CODE WALKTHROUGH  •  STEP 2 OF 2"
      },
      {
        "kind": "output",
        "title": "4.5  Functions with one parameter",
        "text": "Go Maya"
      },
      {
        "kind": "exercise",
        "title": "4.5  Functions with one parameter",
        "text": "Create double(n) that prints n * 2."
      },
      {
        "kind": "solution",
        "title": "4.5  Functions with one parameter",
        "code": "function double(n) { console.log(n * 2); }\ndouble(4);"
      },
      {
        "kind": "intro",
        "title": "4.6  Functions with multiple parameters",
        "text": "Multiple parameters allow a function to use several inputs."
      },
      {
        "kind": "code",
        "title": "4.6  Functions with multiple parameters",
        "code": "function add(a, b) { console.log(a + b); }",
        "text": "Define a reusable function. Its instructions run when the function is called.",
        "step": "CODE WALKTHROUGH  •  STEP 1 OF 2"
      },
      {
        "kind": "code",
        "title": "4.6  Functions with multiple parameters",
        "code": "function add(a, b) { console.log(a + b); }\nadd(3, 4);",
        "text": "Call the function by writing its name followed by parentheses.",
        "step": "CODE WALKTHROUGH  •  STEP 2 OF 2"
      },
      {
        "kind": "output",
        "title": "4.6  Functions with multiple parameters",
        "text": "7"
      },
      {
        "kind": "exercise",
        "title": "4.6  Functions with multiple parameters",
        "text": "Create goal(name, points) that prints both values."
      },
      {
        "kind": "solution",
        "title": "4.6  Functions with multiple parameters",
        "code": "function goal(name, points) { console.log(name, points); }\ngoal(\"Ali\", 2);"
      },
      {
        "kind": "intro",
        "title": "4.7  return values",
        "text": "return sends a value back to the code that called the function."
      },
      {
        "kind": "code",
        "title": "4.7  return values",
        "code": "function square(n) { return n * n; }",
        "text": "Define a reusable function. Its instructions run when the function is called.",
        "step": "CODE WALKTHROUGH  •  STEP 1 OF 2"
      },
      {
        "kind": "code",
        "title": "4.7  return values",
        "code": "function square(n) { return n * n; }\nconsole.log(square(3));",
        "text": "Display this value in the console. Check the output after running the code.",
        "step": "CODE WALKTHROUGH  •  STEP 2 OF 2"
      },
      {
        "kind": "output",
        "title": "4.7  return values",
        "text": "9"
      },
      {
        "kind": "exercise",
        "title": "4.7  return values",
        "text": "Create triple(n) that returns n * 3."
      },
      {
        "kind": "solution",
        "title": "4.7  return values",
        "code": "function triple(n) { return n * 3; }\nconsole.log(triple(4));"
      },
      {
        "kind": "intro",
        "title": "4.8  Difference between return and console.log()",
        "text": "console.log displays a value; return produces a result for further calculations."
      },
      {
        "kind": "code",
        "title": "4.8  Difference between return and console.log()",
        "code": "function add(a,b) { return a + b; }",
        "text": "Define a reusable function. Its instructions run when the function is called.",
        "step": "CODE WALKTHROUGH  •  STEP 1 OF 3"
      },
      {
        "kind": "code",
        "title": "4.8  Difference between return and console.log()",
        "code": "function add(a,b) { return a + b; }\nlet total = add(2,3) * 2;",
        "text": "Create a variable using let; its value can change later.",
        "step": "CODE WALKTHROUGH  •  STEP 2 OF 3"
      },
      {
        "kind": "code",
        "title": "4.8  Difference between return and console.log()",
        "code": "function add(a,b) { return a + b; }\nlet total = add(2,3) * 2;\nconsole.log(total);",
        "text": "Display this value in the console. Check the output after running the code.",
        "step": "CODE WALKTHROUGH  •  STEP 3 OF 3"
      },
      {
        "kind": "output",
        "title": "4.8  Difference between return and console.log()",
        "text": "10"
      },
      {
        "kind": "exercise",
        "title": "4.8  Difference between return and console.log()",
        "text": "Return 8 from a function and print its result."
      },
      {
        "kind": "solution",
        "title": "4.8  Difference between return and console.log()",
        "code": "function getPoints() { return 8; }\nconsole.log(getPoints());"
      },
      {
        "kind": "intro",
        "title": "4.9  Local and global variables",
        "text": "A local variable belongs to its function. A global variable is declared outside functions."
      },
      {
        "kind": "code",
        "title": "4.9  Local and global variables",
        "code": "let score = 10;",
        "text": "Create a variable using let; its value can change later.",
        "step": "CODE WALKTHROUGH  •  STEP 1 OF 3"
      },
      {
        "kind": "code",
        "title": "4.9  Local and global variables",
        "code": "let score = 10;\nfunction show() { let bonus = 5; console.log(score + bonus); }",
        "text": "Define a reusable function. Its instructions run when the function is called.",
        "step": "CODE WALKTHROUGH  •  STEP 2 OF 3"
      },
      {
        "kind": "code",
        "title": "4.9  Local and global variables",
        "code": "let score = 10;\nfunction show() { let bonus = 5; console.log(score + bonus); }\nshow();",
        "text": "Call the function by writing its name followed by parentheses.",
        "step": "CODE WALKTHROUGH  •  STEP 3 OF 3"
      },
      {
        "kind": "output",
        "title": "4.9  Local and global variables",
        "text": "15"
      },
      {
        "kind": "exercise",
        "title": "4.9  Local and global variables",
        "text": "Create a function with a local lives variable and print it inside."
      },
      {
        "kind": "solution",
        "title": "4.9  Local and global variables",
        "code": "function showLives() {\nlet lives = 3;\nconsole.log(lives);\n}\nshowLives();"
      },
      {
        "kind": "intro",
        "title": "4.10  Reusing functions",
        "text": "Functions can be called repeatedly to avoid copying code."
      },
      {
        "kind": "code",
        "title": "4.10  Reusing functions",
        "code": "function jump() { console.log(\"Jump\"); }",
        "text": "Define a reusable function. Its instructions run when the function is called.",
        "step": "CODE WALKTHROUGH  •  STEP 1 OF 2"
      },
      {
        "kind": "code",
        "title": "4.10  Reusing functions",
        "code": "function jump() { console.log(\"Jump\"); }\nfor (let i = 0; i < 3; i++) jump();",
        "text": "Start a for loop: initialize a counter, test the condition, then update it.",
        "step": "CODE WALKTHROUGH  •  STEP 2 OF 2"
      },
      {
        "kind": "output",
        "title": "4.10  Reusing functions",
        "text": "Jump three times"
      },
      {
        "kind": "exercise",
        "title": "4.10  Reusing functions",
        "text": "Write and call clap() twice."
      },
      {
        "kind": "solution",
        "title": "4.10  Reusing functions",
        "code": "function clap() { console.log(\"Clap\"); }\nclap();\nclap();"
      },
      {
        "kind": "intro",
        "title": "4.11  Functions with conditions and loops",
        "text": "Functions can contain loops and conditions to solve larger problems."
      },
      {
        "kind": "code",
        "title": "4.11  Functions with conditions and loops",
        "code": "function countEven(max) {",
        "text": "Define a reusable function. Its instructions run when the function is called.",
        "step": "CODE WALKTHROUGH  •  STEP 1 OF 6"
      },
      {
        "kind": "code",
        "title": "4.11  Functions with conditions and loops",
        "code": "function countEven(max) {\nfor (let i = 1; i <= max; i++) {",
        "text": "Start a for loop: initialize a counter, test the condition, then update it.",
        "step": "CODE WALKTHROUGH  •  STEP 2 OF 6"
      },
      {
        "kind": "code",
        "title": "4.11  Functions with conditions and loops",
        "code": "function countEven(max) {\nfor (let i = 1; i <= max; i++) {\nif (i % 2 === 0) console.log(i);",
        "text": "Check the condition. The instruction runs only when the test is true.",
        "step": "CODE WALKTHROUGH  •  STEP 3 OF 6"
      },
      {
        "kind": "code",
        "title": "4.11  Functions with conditions and loops",
        "code": "function countEven(max) {\nfor (let i = 1; i <= max; i++) {\nif (i % 2 === 0) console.log(i);\n}",
        "text": "This brace marks the end or start of a code block.",
        "step": "CODE WALKTHROUGH  •  STEP 4 OF 6"
      },
      {
        "kind": "code",
        "title": "4.11  Functions with conditions and loops",
        "code": "function countEven(max) {\nfor (let i = 1; i <= max; i++) {\nif (i % 2 === 0) console.log(i);\n}\n}",
        "text": "This brace marks the end or start of a code block.",
        "step": "CODE WALKTHROUGH  •  STEP 5 OF 6"
      },
      {
        "kind": "code",
        "title": "4.11  Functions with conditions and loops",
        "code": "function countEven(max) {\nfor (let i = 1; i <= max; i++) {\nif (i % 2 === 0) console.log(i);\n}\n}\ncountEven(4);",
        "text": "Call the function by writing its name followed by parentheses.",
        "step": "CODE WALKTHROUGH  •  STEP 6 OF 6"
      },
      {
        "kind": "output",
        "title": "4.11  Functions with conditions and loops",
        "text": "2, 4"
      },
      {
        "kind": "exercise",
        "title": "4.11  Functions with conditions and loops",
        "text": "Create printBig(n) that prints \"Big\" when n > 10."
      },
      {
        "kind": "solution",
        "title": "4.11  Functions with conditions and loops",
        "code": "function printBig(n) {\nif (n > 10) console.log(\"Big\");\n}\nprintBig(12);"
      }
    ],
    "lessons": 11
  }
];
