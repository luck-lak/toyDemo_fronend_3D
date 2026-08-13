# Toy 3D Demo

A tiny 3D graphics demo built from scratch with **JavaScript and HTML Canvas**, without using any 3D graphics library.

The project implements a simple rotating cube using basic 3D math and perspective projection.

## Demo

After enabling GitHub Pages:

`https://luck-lak.github.io/toyDemo_fronend_3D/`

## How it works

The cube is represented by a set of 3D vertices:

```js
{x, y, z}
```

Each frame performs a small graphics pipeline:

```text
3D vertex
   ↓
rotation
   ↓
translation
   ↓
perspective projection
   ↓
screen coordinate conversion
   ↓
Canvas rendering
```

Perspective projection is implemented with:

```text
x' = x / z
y' = y / z
```

The projected coordinates are then converted to Canvas screen coordinates.

The animation continuously rotates the cube and redraws the frame.

## Project Structure

```text
toyDemo_fronend_3D/
├── index.html
├── main.js
└── style.css
```

* `index.html` — contains the Canvas element
* `main.js` — 3D math, projection, rotation and rendering
* `style.css` — basic styling

## What I learned

This project was mainly built to understand the fundamentals behind 3D rendering rather than relying on a graphics library.

It explores:

* HTML Canvas
* Coordinate systems
* Perspective projection
* 3D transformations
* Rotation with `sin` and `cos`
* Animation loops
* Rendering vertices and edges

## Run Locally

Clone the repository and open `index.html` in a browser, or run it with a local development server such as VS Code Live Server.

No dependencies or build step are required.
