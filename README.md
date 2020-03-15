# Browser Technologies @cmda-minor-web 1920

## Assignment 1.2 - Break your OBA App

### Breaking other websites
The first part of thhe assgnment was to try to break other websites first and see how they could be improved. I've tested both 'big' websites as websites from local businesses around me.

#### Summary 
[Understanding progressive enhancement](https://alistapart.com/article/understandingprogressiveenhancement/)

##### `The graceful degration` VS `The progressive enhancement` perspective
Graceful degration focusen on creating websites for the newest browsers. Applications should work great on these browsers, but accepts compromises on older browsers, aiming for only a passible user experience. Browsers incompatibility is only 'patched' in the last quarter of the development cycle.

Progessive enhancement focuses on just the content, not the browser. Websites should be functional from their `core`, the content, and should be enhanced through firstly CSS for stylistic purposes and lastly javascript to create a rich user experience.

#### Tested Features
##### Disable colors and enable colorblind mode
How to: there are several browser plugins you can install to simulate color blindness

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
How to: cookies and local storage cannot be disabled indiviually. This makes it more challenging to identify the issue. Checking the error messages in the console might help you to identify the issue. To disable both cookies and local storage in chrome, enter the following value in the url bar: chrome://settings/content/cookies?search=site+set and disable `Allow sites to save and read cookie data (recommended)`. Don't forget to enable the feature after testing.

Results:
* Webshops always use cookies to make the cart items persits through the website. Disabling cookies make it impossible to order anything.
* Twitch.tv keeps showing a loading indicator. The page will actually never load. This is because the site depends on local storage. Looking at the console helped me to identify this issue.

Fixes:
* Creata a fallback that checks if a cookie can be set. If not, it will not be possible to order multiple items, so the user will be kindly asked to either buy one item at a time or enable cookies.
* Twitch.tv shouldn't depend on localstorage. It should check if localstorage can be set or get. If not, it should find another way to make their website function as intended. 


### Features
- [X] Disable images
- [ ] Disable mouse/trackpad
- [X] Disable custom fonts
- [ ] Disable JS
- [X] Disable colors / enable color blind mode
- [ ] Disable local storage / cookies
- [ ] Enable internet throttling

#### Notes
##### No JS breaks everything
  

* Can't tab through carousel
* Local storage isn't needed for creating the cards but is needed for saving the choices
* Site does work when throttled but takes a long time to load without giving feedback to the user

## Devices
### Macbook Pro (2017, macOS Catalina 10.15)
#### Chrome version Chrome 80
Works as intended

#### Firefox version
Works as intended

#### Safari version 13.1
* Backface-visibility bug. Card text is visible on front
* Minor positioning issues

### Microsoft surface (Windows RT 8.1)
#### Internet explorer version 11.0
Broke everything

* No browser support for css variables
* No browser support for rotate transforms
* No browser support for fetch
* No browser support for imports

### iPhone 8 (iOS 13.4)
#### Safari iOS version 13.1, Firefox version 23.0 iOS, Chrome version 80 iOS
* Horizontal scrollbar
* Scaling issue
* No event to flip card
* Card position issue

## Screen reader
* Je kunt de boeken niet van elkaar onderscheiden. Boeken moeten worden genummerd.
* Als de beschrijven van de boeken lang zijn zal de screenreader niet de Klaar knop voorlezen.
* Screenreader zal ook boeken voorlezen die je al hebt opgegeten.
