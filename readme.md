## freelink
an open source alternative to linktree. fully customizable, self host on netlify.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/boxdox/freelink)

### getting started
1. clone this repo
2. connect to netlify (ignore if already done)
3. in the `data` directory, add a json file (sample configuration below), you can add as many configuration files as you like, and leave the generation and optimization of the pages to the scripts
4. site will be generated in `dist` directory and can be automatically deployed using netlify

### internal workings
#### sample configuration
```json
{
  "title": "boxdox's links",
  "tagline": "i code stuff",
  "slug": "boxdox",
  "main": true,
  "profilePicture": "https://avatars.dicebear.com/api/personas/boxdox.svg",
  "theme": "dracula",
  "links": [
    {
      "name": "Github",
      "url": "https://github.com/boxdox",
      "icon": "github"
    },
    {
      "name": "Twitter",
      "url": "https://twitter.com/vaibhav_kandwal",
      "icon": "twitter"
    }
  ]
}
```

#### here's what these keys mean:
- `title` : headline of your site
- `tagline` : tagline, under the title, leave blank if not needed
- `slug` : generated slug for the page, if not provided, the title will be used
- `main` : if this is set to true, an additional `index.html` will be generated, with the same content and will be treated as default entry page
- `profilePicture` : could be a url on the internet or a path relative to assets directory, as it is copied as it is for the generation, for example, `./assets/profile.jpg`
- `theme` : any theme that exists in `themes` directory, more on theming later
- `links` : an array of links with keys listed below
  - `name`: the name that will be displayed
  - `url`: actual url to the website
  - `icon`: name of the icon, currently using font awesome (brand s only), so you can provide names such as `github`, `facebook`, `twitter` etc. find the full list [here](https://fontawesome.com/v5.15/icons?d=gallery&p=2&s=brands&m=free)

#### following are the phases for generation:
- necessary directories are created, verified and contents of some of them are copied into an intermediate staging area.
- provided data files are verified for the correct structure
- using the content and the template, an unoptimized version of pages are generated
- these unoptimized pages are taken, styles and images are inlined and the code is beautified

### development
1. clone the repo
2. run `yarn install` to install the dependencies
3. start a dev server with `yarn dev`, this will only run the code inside the `index.ts` file, ie. only unoptimized code will be generated in `resources` directory
4. to run a full production build, run `yarn build` and check the contents of `dist` directory

### theming
since `pug.js` is used under the hood for generating html pages, in future, an option can be added to modify the html template, but for now, only css theming is supported.

to create new themes, create a `.css` file in the `themes` directory. for basic styling, you can override the css variables given below. for more advanced styling, you can override the css classes itself (since the theme will be imported after the base style, cascading will take effect)

```css
/* global styling */
--font-family: font used for the whole page
--body-bg: background for the page, could link to image as well

/* ui styling */
--container-bg: background color for the container in the middle, can contain images too
--container-max-width: max width for the container
--container-padding: padding for the container
--text-size: text size for desktop screens
--text-size-sm: text size for mobile screen

/* heading styles */
--heading-text-color: text color for title and tagline
--heading1-text-size:  text size for title, desktop screen
--heading1-text-size-sm: text size for title, mobile screen
--heading2-text-size: text size for tagline, desktop screen
--heading2-text-size-sm: text size for tagline, mobile screen

/* profile image styling */
--profile-image-size: image size for desktop
--profile-image-size-sm: image size for mobile
--profile-image-border: border styling for image
--profile-image-gap: gap/margin for the image

/* links styling */
--link-bg: background color for link, automatically creates hover transition
--link-gap: gap between two links
--link-icon-size: size of icon inside the link, for desktop
--link-icon-size-sm: size of icon inside the link, for mobile
--link-padding: padding inside the link, for desktop
--link-padding-sm: padding inside the link, for mobile
```

### license
[mit](https://boxdox.mit-license.org/)
