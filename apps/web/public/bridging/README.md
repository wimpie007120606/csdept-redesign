# Bridging Course assets

Place files here so they are served at `/bridging/...` in production.

## Recommended structure

- `bridge.txt` – Overview / Bridge.txt (or bridge.pdf)
- `exercises1.pdf`, `exercises2.pdf`, `exercises3.pdf` – Exercise PDFs
- `day1/` – Java files for Day 1 (e.g. HelloWorld.java, Variables.java, Loops.java)
- `day2/` – Java files for Day 2 (e.g. Arrays.java, Methods.java, InputOutput.java)

## Adding more files

Edit `apps/web/src/content/bridgingCourse.ts`:

1. **Exercises:** Add entries to the `exercises` array: `{ label: 'Exercises 4', path: '/bridging/exercises4.pdf', type: 'pdf' }`.
2. **Day programs:** Add entries to the relevant day’s `programs` array: `{ filename: 'MyClass.java', path: '/bridging/day1/MyClass.java', description: 'Optional short description' }`.
3. **New day:** Add a new object to the `days` array with `dayId`, `dayLabel`, and `programs`.

Paths must start with `/bridging/` and match the file location under this folder.
