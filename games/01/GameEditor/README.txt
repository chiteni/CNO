PADDLE PARTY - CODING EDITOR

Open index.htm for Paddle Party in the existing editor.
Click the game, then use W/S for Player 1 and Up/Down for Player 2.
Press Space to serve at the start and after each point. First to 5 wins.
Run starts a new match with the current code. Reset restores starter settings.
Students configure left and right colors, S (speed), X/Y (starting position),
W/H (width/height); ball color, S (speed), X/Y (serve position), R (radius).
leftSC/rightSC are starting scores, pts is the score per goal, and win
is the winning target. Coordinates use the fixed 1000x600 court.
left, right and ball store colors, not objects. Run applies the settings.

The editor layout and controls are unchanged. Only its game starter code changed.
js/game.js: original, unchanged Sprite and Game engine.
js/myCode.js: Paddle Party sprites adapted from the supplied Paddle_Party_Kids
sample, with canvas score display, fixed coordinates and editor integration.
js/translate.js: bounded settings interpreter, input focus and fresh-match setup.
The game scales proportionally inside the canvas and reuses one animation loop.
No installation or external libraries required.

SuperMario/index.htm: preserved platform-game editor, with its own js folder and
README. Open this separately when you want the previous platform game.
Paddle_Party_Kids/index.html: your supplied standalone Paddle Party, unchanged.
The old brick-game backups remain in js/*.previous.txt.

Only explicitly assigned objects appear. left or leftS/X/Y/W/H enables the left paddle; right and its properties enable the right paddle; ball and its properties enable the ball. Unspecified properties use defaults. leftSC and rightSC independently enable their score displays. Empty code clears the preview.
