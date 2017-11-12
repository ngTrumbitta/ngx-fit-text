<h1 style="text-align: center">
  <img src="logo.svg" alt="Logo" width="200" /><br />
  Angular FitText
</h1>

<p style="text-align: center">An Angular implementation of @patrickmarabeas/ng-FitText.js</p>

From the original description (slightly edited for clarity):

> Ngx-FitText makes font-sizes flexible. Use this Angular directive in your fluid or responsive layout to achieve scalable headlines that fill the width of a parent element.

![](https://raw.githubusercontent.com/ngTrumbitta/ngx-fit-text/master/examples.gif)

## Prerequisites

This directive has been tested with Angular 5 and Angular CLI. Let me know if you make it work with different versions and tools.

## Installing

Install into your Angular CLI project root folder.

```sh
npm install ngx-fittext -S
```

## Usage

### Import into `AppModule`

**Help wanted!** - At the moment of writing I'm still new to the world of Angular libraries, so I'm in the process of figuring out how to let you avoid having to import the module at the root level instead of importing it just where you need it.

Let me know if you can help with this, and please feel free to open a PR.

```ts
// src/app/app.module.ts

...
import { NgxFitTextModule } from 'ngx-fit-text';
...

@NgModule({
  ...
  imports: [
    ...
    NgxFitTextModule.forRoot()
  ],
  ...
})
export class AppModule { }
```

### Use in a component template

#### Basic usage

**Important!** - The HTML element you apply the directive to, must have a parent element!

```html
<header>
  <h1 [ngxFitText]>Look at how I resize myself</h1>
</header>
```

#### Options (currently implemented but untested)

**Compression ratio** (accepts float, default: `1`)  
Set a overall compression ratio.

```html
<header>
  <h1 [ngxFitText]="0.9">
    Look at how I resize myself
  </h1>
</header>
```

**Minimum / maximum font size** (accepts px or 'inherit', default min: `0`, default max: `Number.POSITIVE_INFINITY`)

```html
<header>
  <h1
    [ngxFitText]
    [ngxFitTextMin]="11"
    [ngxFitTextMax]="18"
  >
    Look at how I resize myself between 11px and 18px
  </h1>
</header>
```

**Debounce resizing** (accepts milliseconds, default: `100`)  
i.e. for controlling how to debounce the `window.resize` event

```html
<header>
  <h1
    [ngxFitText]
    [ngxFitTextDelay]="1000"
  >
    Look at how I resize myself after 1 second
  </h1>
</header>
```

## Development and Contributing

### Prerequisites

You'll need [@gonzofish/angular-librarian](https://github.com/gonzofish/angular-librarian).  
Go ahead and install it, and make sure to follow the instructions about how to make it work in the command line.

It's also **important** to have a [EditorConfig](http://editorconfig.org/) plugin installed and active in you editor / IDE, so that your code will follow the project's style on a base level.

Linting and prettifying tools will be added in the future.

### Installing

1. Clone this repository
1. Go inside the project's root directory: `cd ngx-fit-text`
1. Install Node modules: `npm install`
1. Hack away

### Working with Angular Librarian

You can find all the info about how to run a Angular Librarian project in its documentation, but here's two handy commands:

1. `ngl serve` - to run the project's examples into a Webpack DevServer
1. `npm test` - to run the unit tests before submitting a PR

## Built With

* [Angular Librarian](https://github.com/gonzofish/angular-librarian) - Helping to deal with maintaining an Angular library
* [NPM](https://www.npmjs.com/) - Dependency Management

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/ngTrumbitta/ngx-fit-text/tags).

## Authors

 * **Patrick Marabeas** - *Original AngularJS version* - [patrickmarabeas](https://github.com/patrickmarabeas)
* **William Ghelfi** - *Angular port* - [ngTrumbitta](https://github.com/ngTrumbitta)

## License

This project is licensed under the ISC License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Patrick Marabeas for its initial work