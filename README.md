# Browser Technologies @cmda-minor-web 1920

# Table of contents
* [Case description](#case)
* [My App in a nutshell](#app)
* [The semantics of progressive enhanced layers](#semantics)
* [The functional layer](#layer1)
* [The practical layer](#layer2)
* [The delightful layer](#layer3)
* [Feature detection and fallbacks](#feature-detection)
* [Differences between browsers](#browsers)
* [Features tests](#tests)
* [Installation](#install)
* [Assignments](#Assignments)
* [Rounding up](#rounding-up)

<a name="case">
  
## CASE 1: Progressive enhanced survey
### Introduction
This course challenges you to make a survey that is accessible to all users browsing the web. To achieve this I've used the [Progessive enhancement](https://alistapart.com/article/understandingprogressiveenhancement/) paradigm.

------

<a name="app">
  
## My App in a nutshell
### How it works
My app uses (just like kahoot) a PIN to access a previous session. The PIN can be submitted via the homescreen to access it or a new survey can be started. When the user starts a new session the PIN is stored on the server + all the submitted answers. When the user returns and fills in his PIN number on the homescreen, the user is redirected to the page with the first blank input field.

#### Wireflow
<img width="750" alt="f79cfc3cf42a0365edf40fe83aecb897" src="https://user-images.githubusercontent.com/33430653/76962825-39ee2600-6920-11ea-9637-da659c125273.png">

### Enhancing the PIN
When JS and localstorage are both enabled, some extra magic happens. You automatically see your previous session on the homescreen. From here you can either continue or start a new survey.

<details>
  <summary>Image: Home page</summary>
  Option to use your PIN or start a new survey.Both work with thhe same submit button
  
  ![Bitmap](https://user-images.githubusercontent.com/33430653/78004702-bfb79b80-733a-11ea-8b72-a6217bd42695.png)
</details>

<details>
  <summary>Image: Home page - Session found</summary>
  Overview of all your sessions. JS and localstorage dependant.
  
  ![Bitmap2](https://user-images.githubusercontent.com/33430653/78004701-bf1f0500-733a-11ea-921a-9c259889dd92.png)
</details>

<details>
  <summary>Image: Start survey - PIN</summary>
  Start a new survey. Here a new PIN is generated
  
  ![Bitmap3](https://user-images.githubusercontent.com/33430653/78004699-be866e80-733a-11ea-80b6-d8bfcef925d5.png)
</details>

<details>
  <summary>Image: Survey - Booting Up</summary>
  First form.
  
  ![Bitmap4](https://user-images.githubusercontent.com/33430653/78004698-bdedd800-733a-11ea-89e3-8ef1acec0d1f.png)
</details>

<details>
  <summary>Image: Survey - Web lectures</summary>
Second form
  
  ![Bitmap5](https://user-images.githubusercontent.com/33430653/78004695-bd554180-733a-11ea-8bc1-f05e964ae72b.png)
</details>

<details>
  Here are all your filled answers. Unanswered questions are red. 
  <summary>Image: Survey - Overview</summary>
  
  ![Bitmap6](https://user-images.githubusercontent.com/33430653/78004689-bcbcab00-733a-11ea-8ec2-6bafe71a8768.png)
</details>

<details>
  <summary>Image: Resume life - PIN</summary>
  Survey is send.
  
  ![Bitmap7](https://user-images.githubusercontent.com/33430653/78004682-ba5a5100-733a-11ea-9451-ebc401fbfd6e.png)
</details>

------

<a name="semantics">
  
## The semantics of progressive enhanced layers
The course defines 3 layers for progressive enhancement.

* Functional layer - The CORE functionality
* Usable layer - Adding styling
* Pleasurable layer - Adding user delight

In my view the functional term should inherit the usable layer, because a functional application is also usable and an application that is not usable cannot be functional. Therefore I would like to redefine these layers.

* Functional layer - The CORE functionality
* Practical layer - Visual ordening of the HTML structure
* Delightful layer - Adding user delight

------

<a name="layer1">

### The functional layer
The functional layer includes all that makes an app usable for its intended purpose. In my case a survey should at least be accessible to all user in any circumstance, save the filled answers and give a confirmation when sending the survey. As a measurement tool good functionality can be measured by accuracy. A good functional survey should generate expected, and thus accurate, outcomes. 

<details>
  <summary>HTML markup</summary>
    
  Related form inputs are being grouped together using the `<fieldset>` tag.
</details>

<details>
  <summary>Form handler</summary>
    
  User progression is being updated on the server. It first exludes some paths and then looks if the user already has data for this page. If so, it's replaced with the new data and otherwise the form data is pushed to the user.forms object.
       
    ```
    exports.updateUserProgression = (user, formData) => {
      // exclude these pages
      if (formData.page !== -1 && formData.page !== 0) {
          const storagePath = './data/survey-users.json'
          const findFormIndex = user.forms.findIndex((form) => form.page === formData.page)

          findFormIndex === -1 ? user.forms.push(formData) : user.forms[findFormIndex] = formData

          mergeDataCollection(user, storagePath)
      }

      return user
    }
    ```
</details>

<details>
  <summary>Storing user progression</summary>
    
  Data is then stored in a JSON file that exists on the server
    
  ```
  function setUserProgression(data) {
    const json = JSON.stringify(data ,null, 2);
    fs.writeFileSync('./data/survey-users.json', json);
  }
  ```
</details>
<details>
  <summary>Creating back buttons</summary>
    
  Sometimes the user makes a mistake. It's better to add back buttons to make it clear the user can go back, then to solely depend on the browser back button.
        
    ```
    <div class='base-form__submit'>
        <a class="btn -secondary" href="/survey/0/{{user.pin}}">Previous</a>
        <input class="btn -primary" type="submit" value="Next step">
    </div>
    ```
  
</details>

<details>
  <summary>Returning to a previous session</summary>
    
  The option to return to your previous session makes the form even more practical. It enables the user to close the form at any time, but on return the user also sees the page where he left off. 
    
  ```
 function findPreviousSession(user) {
    const uncompletedForm = findNextFormWithBlanks(user.forms)

    if (uncompletedForm) {
        return uncompletedForm.page
    } else {
        // has completed forms but not all
        const surveyPages = [1, 2, 3]
        const unVisitedPaths = surveyPages.filter((page, index) => user.forms[index] === undefined)

        return unVisitedPaths[0]
    }
}
  ```
</details>
    

#### Dependancies
All of this is achieved by handling requests on the server. This is the most robust solution since it only depends on the server being up and running and your internet connection.

#### Fallbacks
No fallbacks needed

------

<a name="layer2">

### The practical layer
The practical layer expands the CORE functionality with a strong visual ordening that makes your app easy to use.
This is ofcourse achieved with CSS.

<details>
  <summary>Make it easy to read</summary>
    
  To make the form easy to read all form text-boxes and labels are put on `display: block`.
    
  ```
  input[type="text"] {
    display: block;
    width: 100%;
  }

  .base-form__label {
    display: block;
    margin: 1rem 0;
    font-family: $header-font-family;

    &.-input {
        font-size: $subheader-font-size;
        margin-bottom: 3rem;
    }
  }
  ```
</details>

<details>
  <summary>Styling back buttons</summary>
  
  #### CSS
  When the browser supports flexbox, I put the buttons side-by-side and make the primary button take all available width. This makes it clear to the user (aside from the more prominent button styling) that this is the primary action. As a fallback I put the buttons underneath eachother. The difference in button styling should still do the job.
  
  ```
  .base-form__submit{
      margin-top: 5rem;

      @supports (display: flex) {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
      }

      .btn {
          display: inline-block;
          margin-bottom: 1rem;
          width: 100%; // fallback

          // make buttons original width so they can be side to side
          @supports (display: flex) {
              min-width: initial;
          }

          @media screen and (min-width: 22rem) {
              width: initial;
          }
      }
  }
  ```
</details>

<details>
  <summary>Styling Progress bar</summary>
  The progress has a default width of 100% `minus` 6.5rem. When animations are supported it chhanges this value to 0;
  
  ```
  &[value] {
        -webkit-appearance: none;
                appearance: none;

        width: calc(100% - 6.5rem); // fallback
        max-width: calc(100% - 6.5rem);
        height: 1rem;
        border: none;


        &::-webkit-progress-bar {
            background-color: $blue;
        }

        &::-webkit-progress-value {
            background-color: $darkRed;
        }

        @supports (animation: 1s) {
            width: 0;
            animation: progession ease-out 1s forwards;
            animation-delay: .2s;
        }

        @keyframes progession {
            to {width: calc(100% - 6.5rem)}
        }
    }
  ```
</details>


#### Dependancies
The part of the app depends on having browser support for specific CSS properties.

#### Fallbacks
If Flex is not supported, it will put the buttons side-by-side.


IE doesn't support the main element. Therefore any styling on it doesn't work. To bypass this, I created another container element and added the styling on this element instead.
```
.ie-wrapper {
    min-height: 100vh;
    max-height: 100vh;
    overflow-y: auto;
    box-shadow: 2px 3px 4px 0 #00000020;
    background-color: $red;
    color: $darkBlue;

    > section, form {
        position: relative;
        z-index: 1;
    }

    @media screen and (min-width: 30rem) {
        max-width: 30rem;
    }
}
```

------

<a name="layer3">

### The delightful layer
The delightful layer includes everything that sparks some emotion from the user including nice micro-animation or pick up where you left off (basically any emotion that can be considered uplifting).


<details>
  <summary>Load your previous session(s)</summary>
    
  With javascript anabled, I can store the survey PINS (ID's) on the client. This enables me to look for these pins on the server when the user comes back.
  
  
  New survey pins are stored when visiting page 0 and local storage is enabled.
  ```
  if (localStorage && endpoint === "?page=0") {
        var rawFormData = document.querySelector('input[name=progressionTracker]').value
        var formData = JSON.parse(rawFormData)

        getLocalStorage() ? updateLocalStorage(formData.pin) : setLocalStorage(formData.pin)
    }
  ```
  
  If local storage is enables and your endpoint is "" (AKA homepage), I look for survey pins and load the previous session.
    
  ```
  if (localStorage && endpoint === "") {
        if (getLocalStorage()) {
            const sessions = getLocalStorage()

            loadPrevSession(sessions)
        }
  }
  ```
</details>

<details>
  <summary>Auto saving when values change</summary>
    
  Form data is usually sent when clicking the submit button. With JS enabled I can do this when values change. This is useful when the useful leaves the page without clicking submit, otherwise the filled in data will be lost.
  
  With this function I add eventlisteners to all inputs I want to watch. They call the sendData() function when the value changes.
    
  ```
  if (localStorage) {
        watchFormValues()
  }
  
  ...
    
  function watchFormValues() {
    var inputs = document.getElementsByClassName('base-form__input')

    for (var i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('change', function() {
            sendData(this)
        })
    }
}
  ```
  
  I use an XHR request to send the data from the input. XHR is also supported in IE while fetch is not.
  ```
  function sendData(input) {
    var tracker = document.querySelector('input[type="hidden"]')
    var page = tracker.getAttribute('data-page')
    var pin = JSON.parse(tracker.value).pin

    var body = [
        pin,
        page,
        {[input.name]: input.value}
    ]

    var bodyString = JSON.stringify(body)

    var url = '../../survey/update-session'
    var request = new XMLHttpRequest()
        request.open("POST", url)
        request.setRequestHeader("Content-Type", "application/json");
        request.send(bodyString)
}
  ```
</details>

#### Dependancies
You'll need JS enables and support local storage to use these features.

#### Fallbacks
The user can still use the submit button to submit the form.

------

<a name="feature-detection">

## Feature detection and fallbacks
When you are writing client side javascript it is important to know which javascript methods you are using. Some if not many are not supported by older browsers. 

### How I wrote JS
I wrote JS entirely in ES5. This is the best supported version. It means you have to write JS like this:

```
if (localStorage && endpoint === "?page=0") {
    var rawFormData = document.querySelector('input[name=progressionTracker]').value
    var formData = JSON.parse(rawFormData)

    getLocalStorage() ? updateLocalStorage(formData.pin) : setLocalStorage(formData.pin)
}
```

------

### Variables
In ES5 you can't use `const` and `let`. Therefore variables should be declared as `var` instead.

```
var url = window.location.href.split('/')
var endpoint = url[url.length -1]
```

------

### Modules
You also cannot use ES6 `modules`. Therfore I wrote my JS in on file called `form-helper.js` that can check the path of the browser to know where we are.

```
var url = window.location.href.split('/')
var endpoint = url[url.length -1]

if (localStorage && endpoint === "?page=0") {...}
```

------

### Loops
Map, filter, reduce and forEach are not supported on IE. Therefore I wrote loops as the old classic for loop.
```
for (var i = 0; i < inputs.length; i++)
```

When I need more advanced loops, like looping through objects, I handle this server side.

### XmlHttpRequest
Fetch is not supported on IE, so I've used XHR to push data to the server,
```
var url = '../../survey/update-session'
var request = new XMLHttpRequest()
    request.open("POST", url)
    request.setRequestHeader("Content-Type", "application/json");
    request.send(bodyString)
```

#### Fallbacks
The user can also click submit to POST the data to the server.

------

### Knowing when the browser supports local storage
You can check whether the browser supports local storage with `if (localStorage) {...}`. In my case I use this to check if the user has any previously stored sessions and loads the sessions page.

#### Fallbacks
If the browser does not support local storage (or is disabled) it will be impossible to access you session automatically. As a fallback the user can still submit a PIN on the homescreen to load his previous session, but the user has to store it himself.

------

### Knowing when the browser supports eventlisteners
Older browsers do not support `eventListeners`.
```
// Fallback for IE8 and below
if(document.addEventListener){
    inputs[i].addEventListener('change', function() {
        sendData(this)
    })
} else {
    inputs[i].attachEvent("change", function(e){
        sendData(this)
    })
}
```

#### Fallback
If the browser does not support `eventListeners` I use `attachEvent` which is widely supported.

------

<a name="browsers">

## Differences between browsers
<details>
  <summary>Contrast colors</summary>
    Color contrast is lower on chrome.
    
  ![6](https://user-images.githubusercontent.com/33430653/78024292-678f9200-7358-11ea-862e-f81710910ee6.png)
</details>

<details>
  <summary>Progress bars</summary>
    Progress bar appear different on firefox and IE11.
    
    
   ![5](https://user-images.githubusercontent.com/33430653/78024294-68c0bf00-7358-11ea-8f41-af10fbf6eafb.png)
</details>

For Safari on iOS I also had to use:
```
-webkit-appearance: none;
    appearance: none;
```

To overwrite the default button styling.

------

<a name="tests">

## Features tests
### Disable images
I only use a background image when a specific device width is reached. Disabling this will not lead to any troubles.

<details>
  <summary>No images</summary>
  
  ![1](https://user-images.githubusercontent.com/33430653/78024300-6b231900-7358-11ea-823c-1bbc7e919563.png)
</details>

------

### Disable Custom fonts
My app has a fallback for custom fonts. It just uses another sans-serif font.
```
$header-font-family: 'Avenir-Heavy', sans-serif;
```

------

### Colors and color blindness
I've used hight contrast colors for important content as labels and buttons. Placeholders and unchecked radio buttons have less contrast because these are visually less important. I've tested them to make sure they were still clearly visible in all color blind modes, no colors and in direct sunlight.

For some reason my plugin can't deal with background-images

<details>
  <summary>Contrast</summary>
  
  ![4](https://user-images.githubusercontent.com/33430653/78024296-69595580-7358-11ea-9c1f-9213478cc427.png)
</details>

<details>
  <summary>No colors</summary>
  
  ![2](https://user-images.githubusercontent.com/33430653/78024299-6a8a8280-7358-11ea-8d43-fb2c04379471.png)
</details>
    
<details>
  <summary>Color blindness: Red-blind(Tritanopia)</summary>
  
  ![3](https://user-images.githubusercontent.com/33430653/78024298-69f1ec00-7358-11ea-922e-87f9a0da18d4.png)
</details>

------

### No mouse or track pad
Every :hover also has a :focus pseudoclass
```
&:hover, &:focus {
    flex-grow: 1;
    transform: scaleY(1.2);
    background-color: $yellow;
    border: 2px solid $darkBlue;
    color: $darkBlue;
}
```

Radio buttons needed some extra attention since you can't see if it when there is a focus on a selected radio button. Labels are uppercase and have a pointer when :focus is active.

```
&:focus {
    + .radio-label {
        text-transform: uppercase;
    }

    + .radio-label::before {
        border: 4px solid $darkBlue;
        background-color: $yellow;
    }

    + .radio-label::after {
        content: '';
        position: absolute;
        right: 0;
        width: 0;
        height: 0;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        border-right:10px solid $darkBlue;
    }
}
```

<details>
  <summary>:focus on a radio button</summary>
  
  ![7](https://user-images.githubusercontent.com/33430653/78024289-665e6500-7358-11ea-9e64-a517561ec60f.png)
</details>

------

### Disable broadband internet
`SLOW 3G:` Everything still works but takes a few seconds to load.

------

### Disable cookies
I'm not using cookies on my website.

------

### Disable local storage
Everything still works, even when you disable it mid-session.

------

<a name="install">

## Installation
### Clone repo
`git clone `

### Install dependencies
`npm i`

### Start application
`npm run start`

------

<a name="Assignments"></a>
## Assignments

<details>
<summary>Assignment 1.1 & 1.2</summary>

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

</details>

<details>
<summary>Assignment 2</summary>
  
### Use Case
I will build a progressive enhanced survey that 'remembers' your answers when you return to the page.

### Wireflow
<img width="750" alt="f79cfc3cf42a0365edf40fe83aecb897" src="https://user-images.githubusercontent.com/33430653/76962825-39ee2600-6920-11ea-9637-da659c125273.png">

#### Return PIN
The return PIN is a identifier to store form progression.

##### No storage
The START page checks whether the user has local storage enables and JS enabled or not. I so it looks for a return pin. The user can provide this is 3 different ways.

##### Automatic return PIN
If the user has a return pin in his local storage, it will automatically display the START - storage screen. Here the user can either continue with his previous session or start a new one.

##### Manual return PIN
If the app can't find a return pin in the local storage or either local storage is disabled, the user can still return to his previous session by filling it in the text input or adding it to the url.

#### Functional
The app uses a progressive disclosed form with pagination. Fetching and sending user progression is handled server-side. This means the CORE functionality will always work.

#### Usable
##### HTML
The app uses basic validation using HTML attributes.

##### CSS
The app uses CSS to style the form in a way the user expects. 

#### Pleasurable
##### JS
###### Automatic return PIN
JS stores the return PIN automatically in local storage when the window / browser is closed. On return it passes the return pin to the server to render the correct page and fill in all the field from the previous session.

The progression bar on the bottom of the screen is multidemensional. Page progression is indicated via the number of filled circles. The disclosed form progression is indicated via the amount the circle is filled (from bottom to top)

</details>

<a name="rounding-up">

## Conclusion
This course is about creating a robust experience where every user can use your website, regardless of which browser, device or context is used. To reach this goal I've built a progressive enhanced website (PE). Along-side this i've built in extra assurances to make sure specific important features had a fallback, to ensure the accessibility of the website when a feature is not supported. This required doing extra research in what features have poor browser support. The most useful website to check how well a feature is supported is [caniuse.com](https://caniuse.com/)

### Scope
Realistically, it is impossible to provide a fallback for all scenario's. Implementing fallbacks sometimes need a lot of work. Although it is important to support older browsers, you'll have to cross a line somewhere to reduce development costs. It's all about finding a balance between trying to reach as much users as possible and development costs. To find this balance it's normally good to look at who is visiting your website. If a good portion of your users is still using IE8, this is definitely a browser you want to test for. However I do not have these numbers. When picking for which browsers I would be testing, I decided to focus on all modern browser and anything above IE 8 and anything above android 4.4.4. IE 11 and 10 provided enough bad support to learn how to create good fallbacks.

### Implementing PE
With PE you first built a strictly functional layer on which your app can fallback to when client-dependant features are not working. You then try to add a new layer to make your app more practical to use using CSS and you can follow up on that using Javascript to add user delight.

#### Core functionality
##### The goals i've set for the functional layer
###### Functionality
> The survey should at least save the filled answers and give a confirmation when sending the survey. The survey should 'remember' all answers from a session, so when the user returns, he can pick up right where he left off.

###### Accessibility
> The survey should be accessible an readable to all user in any circumstance (both inside and outside). No mouse or trackpad should be needed. JS/Fast internet should not be necessary for the app in order to excecute its core functionality. Fonts/no images should not create any hickups.

My app works with good semantic HTML and uses server side javascript to process form data. I've made the server side code as smart as possible without the need of client-side javascript. This created a robust and user-friendly core experience. The follwing features are achieved without the use of client-side JS:

- When you enter you return PIN the server looks up where your last blank field was and redirects you to that page.
- With your return PIn all of your previously answered questions are already filled in.
- The last (overview page) shows all your answers and tells you what anwers are blank.

I've also made sure you could use tab to navigate through the form and tested it with a screenreader

#### Making it practical
Without CSS forms can be hard to read. Adding good CSS adds a visual hierarchy to the HTML which makes your app more practical to use. I've made sure the input fields and labels where standing under each other to improve completion time. I also made sure the website can be used on all screen sizes and included fallbacks for things like `flexbox` and `mix-blend-mode`.

#### Adding delight
I've tried to add delight by auto 'remembering' your return PIN using client-side JS and local storage and show your previous sessions when you return to the homepage. I decided to write JS that can be interpreted by most browsers, including IE 10 and 11. This meant I couldn't use es modules or things that can loop through objects and arrays like `array.forEach`. I engineered my code in a way that the difficult stuff like those loops are handled server side and only send the necessary (simpler) data from the client to the server

#### Feature detection
I learned how to detect specific JS features, by adding `if (localStorage)` to just name an example. With every new feature I had to decide if I had to write a fallback for this feature. Some features don't need a fallback because it is fine to not have it if the browser won't support it. For example, I do check if localStorage is supported to make sure JS won't give me an error when it's not, but don't give any other instructions when there is no support. That is fine, because my app also works without localStorage. In other words it can always fall back to the functional layer.

Other features do need a fallback however. I've made my background-color red and if `mix-blend-mode` is supported I can use a cool animated CMD background. I've also created a fallback for flexbox. If it is supported, I can show them side-by-side and use `flex-grow` to take all the available space when you hover over/focus on it. Just some nice details you can use when you have the support.


