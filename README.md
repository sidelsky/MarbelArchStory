#Assemble
------------

##Setup for for Project.

### Tools we use:
- The static site is compiled with assemble: https://github.com/assemble/assemble
- CSS pre-compiled with SCSS.
- JS bundled with Browserify: http://browserify.org/

### Setup

'npm install' - Installs everything needed for the project.

'assemble' - runs the project at - localhost:3000

If this fails to run, you may need to install assemble globally

`npm install -g assemble`


### Assemble tasks

Basically used gulp under the hood. As a build tool, Assemble is an abstraction on top of gulp and gives us more powerful access to middleware for compiling if needed. But tasks are exactly the same as gulp and run from the assemblefile.js in the root of the site.

`assemble` - Default task runs the dev task with live reload and watch tasks

`assemble icons` - Builds an svg icon set from the svg folder

`assemble prod` - Builds out compiled js, css assets as well as other static files like modernizr etc needed for production and copies to the .Site folder.

`assemble modernizr` - This will scan all css and js files and build out Modernizer with only the required files. Currently this is not included as part of the watch task because of the time it takes to run so will have to be run when needed in the prod task.



## Css approach and standards.

We will be using a BEM based approach with the thinking being we create deliverable components and objects comprised of reusable atoms / molecules. Read up here:
http://getbem.com/introduction/
http://bradfrost.com/blog/post/atomic-web-design/

Each component should have it's own file. Modifiers are added at the end of the file. In the rare occasion a component needs to be styled based on it's location, the nesting within the parent should take place in the component's own file.

### Style and naming conventions

- lowercased-hypenated-class-names - The base component class
- double__underscore__child__elements - The child elements. Follow the same nesting of markup.
- double-hyphen--modifier - A descriptive modifier class.
- no nesting of declarations. Except in rare instances when components can only be styled based on location within a parent. We want to try and avoid this though as it can get messy. Use --modifiers wherever possible.
- All header tags (h1,h2) to have classes assigned to them. Base tag style are reset. headers and lists etc in articles and editor content will have an overiding class 'rich-text' assigned to them.
- ems for font sizing. Rems for overiding component font sizing to re-size components like multi-line headers. Use the rems sparingly.
- CSS Objects: layout, grid classes etc. Denoted in markup with { curly-braces }. This makes it more readable.
- CSS Components: class-structure-as-oulined-above. Added in markup after any objects.
- Css utilities: single use classes like animations and positioning. fade-in clearfix etc. Added last in markup.
- So: { object-class } component-class component-class--modifier [ utility-class ]


Example component:
Html:
```
<div class="{ column column--large-12 }">
	<div class="my-component">
		<h2 class="my-component__header">
			My Component
		</h2>
		<p class="my-component__content">
			The content
		</p>
		<button class="my-component__button [fade-in">Help me</button>
	</div>
</div>
```
CSS:
```
.my-component {
	position: relative;
	background: gray;

	&__header {
		font-size: em(20px)
	}

	&__content {
		margin-top: 10px;
	}
}

.my-component--wide {
	width: 100%
}
```
#### Css Vertical rhythym
Simple mixin based approach for font-sizing. Baseline is 10px so we work in multiples of that. The idea is to fix text within a 10, 20, 30 or 40px etc space based on font-size and line height regardless of margins and paddings. We can then easily space elements out with multiples of 10 for padding and margins too. So to set a font size, for example, 18px, we use:

```
.my-header {
	font-size: em(18px);
	set-line-height(18, 20)
}
```

What this does is outputs a font size in em based on the base font-size of the site, in this case: 100% (16px) as well as a relative line-height based on the passed font-size and a mupliple of the base line height. The first parameter of set-line-height() is the font-size you have set. The second parameter is the closest baseline multiple bigger that the font size specified. This gives us fine grained control over rhythym of the page.

So in this example it creates a space of exactly 20 px for the text to sit centered in regardless of padding etc.

Other examples:
```

	font-size: em(14px);
	set-line-height(14, 20)

	font-size: em(30px);
	set-line-height(30, 40)


	font-size: em(60px);
	set-line-height(60, 60)

```
In the third example, set-line-height(60, 60) is equivalent to 'line-height: 1;'


##images
Image sizes. These will be what the cms auto creates from one upload.
### 16x9:

16x9-450
16x9-600
16x9-850
16x9-1000
16x9-1200
16x9-1600
16x9-2000


##Todo
- gulp - JS linting (jshint or jslint)?
- gulp - CSS linting
- Create mock api for Ajax responses. Third party? Do we need this?
- Check and add useful tools and additions from previous projects like Fastclick, css breakpoint JS events etc.
- Strategy for modules pages. Brand page, vertical rhythm, grouped modules pages or actual pages? Mix of both?
