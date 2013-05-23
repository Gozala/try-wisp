# try wisp

This is a little tool to try [wisp][] programing language. Tool
let's you type wisp code and see compilation result (javascript
code) in the right preview panel.


Try wisp: http://jeditoolkit.com/try-wisp

# Hack

This demo is tool is written in wisp and browser bundles are
generated using [browserify][]. If you wanna make changes,
you'll have to install dependencies:

    npm install


Once you make changes you need to make build. You could run command
below to let it take care of recompling every time you save a changes.

    npm start

[wisp]:https://github.com/Gozala/wisp
[browserify]:http://browserify.org/