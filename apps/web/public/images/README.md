# Research & people images

## Research category images

Place category banner/thumbnail images in **`public/images/research/`** with these filenames:

- `automata-grammars.jpg` — Theory and Applications of Automata and Grammars
- `software-verification.jpg` — Software Engineering and Verification
- `ml-ai.jpg` — Machine Learning and Artificial Intelligence
- `networks-broadband.jpg` — Broadband and Mobile Networks
- `robotics-vision.jpg` — Robotics and Computer Vision
- `nlp.jpg` — Natural Language Processing

Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp` (use one per category).

## Staff / people photos (People page, profiles, research groups)

Staff images live in **`public/people/`** and are served at paths like `/people/FileName.jpg`.

**Standard naming:** **`FirstName_LastName_People.jpg`** (underscore between first and last name; extension `.jpg` or `.jpeg`). Use a single extension only (no `.jpg.jpg`).

Examples:

- `Willem_Visser_People.jpg`
- `Cornelia_Ings_People.jpg`
- `Jaco_Geldenhuys_People.jpg`
- `Bernd_Fischer_People.jpg`

Legacy names (still supported via known mappings): `WillemPeople.jpg`, `LynettePeople.webp`, `BrinkPeople.jpeg`, `WalterPeople.jpeg`.

Paths are case-sensitive (Linux production). If no image is found, the app shows a placeholder avatar.
