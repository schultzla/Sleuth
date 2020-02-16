# AnonyMobile

React Native app version of AnonyBoard

<p float="left">
  <img src="./images/feed.png" width="200" />
  <img src="./images/post.png" width="200" /> 
</p>


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You will need CocoaPods
``` 
brew install cocoapods
```

### Installing

Installation is simple

First install the node dependencies in the main directory

```
npm install
```

And then install the pods

```
cd ios && pod install
cd ..
```

Then to run the iOS simulator (assuming you have installed) do
```
npx react-native run-ios
```