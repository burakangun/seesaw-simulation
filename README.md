# Seesaw Simulation

## Demo
https://burakangun.github.io/seesaw-simulation

## Development Process
I built this project incrementally, as reflected in the commit history:

1. **Initial layout** — Set up the basic HTML structure and CSS styling
2. **Circle creation on clicked coordinate** — Implemented click detection and object placement
3. **Vertical weight dropping** — Objects appear at the correct position on the plank
4. **Torque calculation and display** — Core physics logic, computing torque for each side
5. **Plank angle added** — Connected torque difference to visual rotation
6. **Reset button added** — Bonus feature to clear the simulation
7. **Local storage added** — State persistence across page refreshes
8. **Total weight display added** — UI indicator for each side's total weight
9. **Smooth movement added** — CSS transition for natural tilting animation
10. **Dynamic sizing added** — Object size scales with weight
11. **Next weight label added** — Shows the upcoming weight before clicking
12. **Angle value added** — Displays current plank angle in UI

## Design Decisions

**Torque Calculation**
Each object's torque is calculated as weight × distance from the pivot. The difference between right and left torque determines the plank angle, capped at ±30 degrees as required.

**Distance Scaling**
Raw pixel distances made the torque values extremely large, causing the plank to snap instantly to maximum angle. I divided the distance by 20 to scale it down to a range that produces realistic, smooth movement.

**Click Listener on Plank**
I attached the click event listener directly to the plank element instead of the container. This ensures only clicks on the plank register, satisfying the requirement that the clickable area is limited to the plank itself.

**Smooth Animation**
Instead of a JavaScript animation loop, I used a single CSS `transition: transform 0.4s ease` on the plank. This keeps the code simple and lets the browser handle the animation efficiently.

## Trade-offs & Limitations

- When the plank is heavily rotated, click coordinates shift slightly because `getBoundingClientRect()` returns the bounds of the already-rotated element. This causes minor positioning inaccuracies at large angles.
- The distance scaling factor (÷20) was determined visually rather than mathematically, so it may not reflect real physics precisely.

## AI Assistance

**LocalStorage** — I struggled to identify a bug where the weight counters were not restoring correctly on page refresh. After spending significant time debugging, I consulted AI to help identify the root cause.

**Syntax & Reference** — Used AI for LocalStorage syntax details, CSS gradient values, and verifying `getBoundingClientRect()` return values.

**Debugging** — Used AI to analyze why the plank was rotating too aggressively with raw pixel distances.

**Documentation** — Used AI assistance to structure and write this README file.

All core logic including torque calculation, DOM manipulation, click interaction, and state management was written and reasoned through by me.