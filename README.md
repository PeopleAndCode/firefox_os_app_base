# Firefox OS App Boilerplate

This app is meant to serve as a base for getting a FireFox OS App up and running while incorporating a set of development tools.

The idea is to streamline the process and teach/add modern dev tools and frameworks for a better development environment.

## Contents

1. [Source directory](#source-directory)


## Source directory

By default the project source files are found in the ```src``` directory.

This folder will house all original source files you will directly write and modify project code in.  This will also include/house all pre-optimized images and libraries you are going to include/add into your project as well.

### Changing the source directory

You can change this to your liking by renaming the directory and changing the ```.bowerrc``` file to reflect this change.

#### Example:

##### Original .bowerrc file

````json
{
    "directory": "src/bower_components"
}
````

##### Updated .bowerrc file
````json
{
  "directory": "new_folder/bower_components"
}
````

## Technologies Used
1. [Yeoman](http://yeoman.io)
2. [Bower](http://bower.io)
3. [Grunt](http://gruntjs.com)
4. [Sass](http://sass-lang.com)
5. [Bootstrap](http://getbootstrap.com)
6. [jQuery](http://jquery.com)