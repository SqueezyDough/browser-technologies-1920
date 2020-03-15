# Browser Technologies @cmda-minor-web 1920

## Assignment 1.2 - Break your OBA App

### Breaking other websites
The first part of thhe assgnment was to try to break other websites first and see how they could be improved. I've tested both 'big' websites as websites from local businesses around me.

#### Tested features
##### Disable colors and enable colorblind mode
###### How to test


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
