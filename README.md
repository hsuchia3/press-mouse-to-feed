# press-mouse-to-feed
Press mouse to feed is a game to feed a monster mushrooms. If the mouse is pressed, there will drop one mushroom on the top to feed the monster. The size of the mushroom is based on the timelength when pressing the mouse, the longer you press, the bigger the mushroom, and vice versa.

This folder contains the full Pixel Monster interactive game with the mouse pressed, originally created with a microphone.

- The size of the mushroom is called "nutrition", which manipulates the size of the monster, the bigger mushrooms make the monster get bigger.

- If the monster is bigger than 256*256, the monster will switch to the "fat pattern", which is the pattern with the mushrooms on the top.

- The game will be continued until the size of the monster reaches the frame(400*400), the monster will be switched to the "Dead pattern" and "GAME OVER" will be shown on the screen.

- tap ' '(space) can restart the game

- Hiding words present the explanation and the statement of the microphone setting, the user can also unhide the microphone setting and check if it works on the laptop(please import the p5 microphone in html file).

"press_mouse_to_feed" file is the main js coding file for the project.
The version of p5 is 1.9.0

There are 11 files to showcase the result:
2 ttf files: text fonts of the game.
sketch, monster, cloud, flower, food.js: main sketches for the game, presenting the specific pattern and statement.
p5.js: the library which was been import.
index.html
style.css

Last updated:
28/09/2026
Chia-Shan Hsu
