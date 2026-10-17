CNO Coding Games - game-only update

Open index.htm in a browser. No server, packages or external libraries required.
The existing editor layout, Run, Reset, Hide Editor and draggable divider are preserved.
Only the game starter-code string changed in index.htm.
js/game.js contains the ORIGINAL Sprite and Game classes, unchanged.
js/myCode.js supplies platform physics, fixed 960x600 coordinates, ball, coins,
platforms, background, ground, door and a separate text-only WIN sprite.
js/translate.js interprets the bounded student lesson language and connects it to
that runtime. No eval or new Function is used. Unsupported JavaScript is rejected.
The previous brick-game runtime and translator are retained as .previous.txt files.

Students write code in the existing textarea, then press Run. Reset restores the
combined mission starter. Set lesson to 1, 2 or 3 in the code to change the game.
Click the canvas to play: Left/Right move, Space jumps, release and press again
for a double jump. Controls do not move the ball while typing in the editor.
Run resets all sprites, coins, rewards, jump count and WIN; it reuses the original
engine's single animation loop. Invalid code leaves the previous game in place.
The original resize/hide behavior still reruns the current code, as before.

Lesson 1: use speed=5, jumpPower=12 and ballSize=30. Try speed=10, then
jumpPower=16 to reach platforms more easily, then ballSize=50. No coins appear.
Lesson 2: use one reward at a time. Replace the starter's three conditions with:
if (score >= 5) { jumpPower = 20; }
or if (score >= 10) { ballColor = "red"; }
or if (score >= 15) { doorOpen = true; }
First change a threshold in working code, then remove and fill a value, then
write the whole condition yourself. Hints: >= means at least; use braces around
rewards; true opens the door. Run gives unlimited retries.
Separate if/else bonus (replace the other color rule):
if (score >= 10) { ballColor = "red"; } else { ballColor = "cyan"; }
Lesson 3: the default starter activates superJump at 5 coins, red at 10 and the
door at 15. Rewards accumulate. Collecting a coin counts once. There are 16 coins
reachable along the ground. Touch the green exit to reveal WIN.

Supported student syntax: let/var/const declarations, assignments, numeric and
string literals, booleans, line comments, if/else blocks and comparisons.
This is a teaching subset, not a complete JavaScript interpreter. Semicolons are
required. Setup assignments run once; conditions run initially and after each
coin. score and coins are read-only counters. Syntax errors report a source line;
value-range errors report the variable. Logical mistakes are not all detected.

Lesson titles/objectives live in CNOBall.lessons in js/myCode.js. Adding lessons
requires corresponding game rules and permitted student syntax where necessary.
The unchanged engine supplies no platform physics or double jump, so these live
in the adapter. Its camera never scrolls and preview scaling does not alter physics.

Scope: this update intentionally does not add tabs, progress storage, challenge
navigation, syntax highlighting, live error checks, fullscreen controls or an
iframe preview, because those change the editor or its functionality. There is no
per-lesson saved progress. Student code is interpreted rather than executed as
unrestricted JavaScript, so no isolated arbitrary-code execution is needed.
