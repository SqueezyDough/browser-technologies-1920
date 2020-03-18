# Browser Technologies @cmda-minor-web 1920

# Table of contents
* [Assignment 1.2](#Assignment-1.2)
* [Assignment 2](#Assignment-2)

<a name="Assignment-1.2"></a>
## Assignment 1.2 - Break your OBA App
### [Understanding progressive enhancement](https://alistapart.com/article/understandingprogressiveenhancement/) summarised

#### `The graceful degradation` VS `The progressive enhancement` perspective
Graceful degradation (GD) focusen on creating websites for the newest browsers. Applications work great on these browsers, but GD accepts compromises on older browsers, aiming for only a passible user experience. Browsers incompatibility is only `patched` in the last quarter of the development cycle (if not after release).

Progessive enhancement (PE) focuses on the content, not the browser. Websites should be functional from their `core`, the content, and should be enhanced through firstly CSS for stylistic purposes, and lastly javascript to create a rich user experience. PE creates a layered user experience with built-in fallbacks if things doesn't go as planned.

------

### Breaking other websites
The first part of the assgnment was to try to break other websites first and see how they could be improved. I've tested both 'big' websites as websites from local businesses around me.

#### Tested Features
##### Disable colors and enable colorblind mode
How to: there are several browser plugins you can install to simulate color blindness.

Results: 
* Most websites handle contrast very well.
* Visited buttons can often not be distinguish.
* Charts that only use color coding to distuinguish values cannot be read by color blind people.
* Switching colors off or users that have a monochromacy color blindless type make sites that use/prefer dark mode makes sites that contains lots of images look very dark.

Fixes:
* Add a 'visited' title or a checkmark for visited links.
* Use labels or titles for color coded charts.
* Use dark mode as a slider that lightens / darkens the back- and foreground colors (images too if needed).

##### Disable local storage and cookies
How to: cookies and local storage cannot be disabled indivually. This makes it more challenging to identify the issue. Checking the error messages in the console might help you to identify the issue. To disable both cookies and local storage in chrome, enter the following value in the url bar: chrome://settings/content/cookies?search=site+set and disable `Allow sites to save and read cookie data (recommended)`. Don't forget to enable the feature after testing.

Results:
* Webshops always use cookies to make the cart items persists through the website. Disabling cookies make it impossible to order anything.
![Zalando](https://user-images.githubusercontent.com/33430653/76712773-d693a680-671b-11ea-8484-86910886749d.png)
Zalando will make the add to cart button red when clicking on it. No explanation about what happened and how to fix it is provided to the user.

------

* Twitch.tv keeps showing a loading indicator. The page will actually never load. This is because the site depends on local storage. Looking at the console helped me to identify this issue.
![Twitch](https://user-images.githubusercontent.com/33430653/76712777-da272d80-671b-11ea-8828-939bc4b1c392.png)
Twitch will never stop loading its local storage dependant content.

Fixes:
* Creata a fallback that checks if a cookie can be set. If not, it will not be possible to order multiple items, so the user will be kindly asked to either buy one item at a time or enable cookies.
* Twitch.tv shouldn't depend on local storage. It should check if local storage can be set or get. If not, it should find another way to make their website function as intended. 

------

### Breaking OBA
#### Features
- [X] Disable images
- [ ] Disable mouse/trackpad
- [X] Disable custom fonts
- [ ] Disable JS
- [X] Disable colors / enable color blind mode
- [ ] Disable local storage / cookies
- [ ] Enable internet throttling

##### Failures
| Feauture | Result | Fix
| -------- | ------ | -----
|`Disable images`| All images use their fallback image. Book summaries can still be viewed. | It makes more sense to either only show the book summary or show the book summary on the front and the fallback image on the back to still indicate a image should be there.

| Feauture | Result | Fix
| -------- | ------ | -----
|`Disable mouse/trackpad` | Can't tab through carousel. | Create a stronger semantic HTML structure. If necessary use `tab-index` to define an index explicitly.

| Feauture | Result | Fix
| -------- | ------ | -----
| `Disable local storage / cookies` | Local storage is necessary for saving the book choices. | Use a query string to pass values via routing if local storage is disabled.

| Feauture | Result | Fix
| -------- | ------ | -----
| `Enable internet throttling` | Site does work when throttled but takes a long time to load without giving feedback to the user | Give feedback a message that content loads slower than usual.

------

### Devices
#### Macbook Pro (2017, macOS Catalina 10.15)
##### Chrome version Chrome 80
Works as intended

##### Firefox version
Works as intended

##### Safari version 13.1
* Backface-visibility bug. Card text is visible on front
* Minor positioning issues

Possible fix: 
* Add support queries to create a fallback for transform properties.

#### Microsoft surface (Windows RT 8.1)
##### Internet explorer version 11.0
Broke everything

* No browser support for css variables
* No browser support for rotate transforms
* No browser support for fetch
* No browser support for imports

Possible fix: 
* Use a build tool to compile css variables to normal css values. A build tool can also minify javascript into a single file which will fix javascript form working on IE11, because it won't support imports. 
* Fetch can be replaced with its older brother XmlHttpRequest which is supported on all browsers, both old and new.
* Add support queries to create a fallback for transform properties.

#### iPhone 8 (iOS 13.4)
##### Safari iOS version 13.1, Firefox version 23.0 iOS, Chrome version 80 iOS
* Horizontal scrollbar
* Scaling issue
* No event to flip card
* Card position issue

Possible fix: 
* Add `<meta name="viewport" content="width=device-width, initial-scale=1">` to make the page scale on mobile devices.
* Add media queries to make the page scrollable horizontically.
* Add `:focus` on all properties that have a `:hover` psuedoclass.
* Add support queries to create a fallback for transform properties.

------

### Screen reader
I've used macOS's built-in voice assistent to narrate my OBA App. The page order was narrated coorectly, however there were some unforseen problems:

* You can't distinguish books from eachother. Each book sounds like the summary from the previous book.
* When the book summaries are longer than average the screenreader hasn't got enough time to narrate all books and the 'Done' button will never be narrated.
* The screenreader will narrate books that you've already eaten.

Fixes:
* Books should be numbered.
* Make the time interval dynamic. Times between new book selections should vary.
* Books should be removed from the DOM when eaten.

<a name="Assignment-2"></a>
## Assignment 2
### Use Case
I will build a progressive enhanced survey that 'remembers' your answers when you return to the page.

### Wireflow
<img width="750" alt="f79cfc3cf42a0365edf40fe83aecb897" src="https://user-images.githubusercontent.com/33430653/76962825-39ee2600-6920-11ea-9637-da659c125273.png">

#### Return PIN
The return PIN is a identifier to store form progression. The data is stored in a JSON file in local storage and on the server as a fallback.

##### No storage
The START page checks whether the user has local storage enables and JS enabled or not. I so it looks for a return pin. The user can provide this is 3 different ways.

##### Automatic return PIN
If the user has a return pin in his local storage, it will automatically display the START - storage screen. Here the user can either continue with his previous session or start a new one.

##### Manual return PIN
If the app can't find a return pin in the local storage or either local storage is disabled, the user can still return to his previous session by filling it in the text input or adding it to the url.

#### Functional
The app uses a progressive disclosed form. The manual return PIN works with HTML and server side rendering.

#### Usable
The app uses local storage to get the return PIN and fetch the user progression.

#### Pleasurable

### Features
* Return PIN that will open the form in its previous closed state.

#### Browser support

#### Accessibility issues


