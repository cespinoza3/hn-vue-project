# Hacker News entries viewer

This programs allows to read Hacker News posts related to coding in order by date.

## To run
To launch this project you need the yarn package manager, once installed you can use whichever method below. yarn will automatically download and install the required packages of this project.
### Debug
Use `yarn dev` to run the project in debug mode, open [http://localhost:3000](http://localhost:3000) in your browser.

### Production ready
Use `yarn build` to generate a standalone page with all its assets bundled together, then use a terminal, change the working directory to the `dist/` folder in the project and run the page using a http server, such as `python -m http.server`. (Default [http://localhost:8000](http://localhost:8000))