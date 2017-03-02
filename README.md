<p align="center">
  <a href="https://github.com/idancali/react-chunky">
    <img height="256" src="https://raw.githubusercontent.com/idancali/react-chunky/master/logo.png">
  </a>
  <p align="center"> <b> React Chunky </b> Helps You Digest Your React Mobile And Web Apps In Manageable Chunks. </p>
</p>

# React Chunky
[![Version](https://img.shields.io/npm/v/react-chunky.svg)](https://www.npmjs.com/package/react-chunky)
[![Author](https://img.shields.io/badge/say%20hi-%40idancali-green.svg)](https://twitter.com/idancali)
[![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?url=https%3A%2F%2Fgithub.com%2Fidancali)

# Overview

React Chunky helps you build solid React Web and Mobile apps, faster and easier. It does that by splitting up parts of your app into more manageable sections - or Chunks.

# Installation

To use Chunky by itself you need to invoke the AppContainer and you need to bootstrap your app by setting up your AppContainer correctly. While you may want to do that yourself, it's highly recommended that you use one of the pre-configured libraries that are setup correctly and are ready to go.

If you're working on a React Native App, install [react-native-chunky](http://github.com/idancali/react-native-chunky):

```javascript
npm install --save react-native-chunky
```

For React Web App development, install [react-dom-chunky](http://github.com/idancali/react-dom-chunky):

```javascript
npm install --save react-dom-chunky
```

# What's a Chunk?

A Chunk is a full-stack portion of your application that includes all the bits and pieces of functionality from the data layer up to the user interface and even remote operations.

A Chunk usually consists of:

* Redux Actions ✓
* Redux Selectors ✓
* A Redux Reducer ✓
* API Operations ✓
* A Container Component ✓
* A Presentation Component ✓

# Writing A Real-World Chunk

To see a Chunk in action, check the Auth Chunk, that comes with Chunky. It includes the following:

* Auth Actions:
[lib/data/actions/auth.js](https://github.com/idancali/react-chunky/tree/master/lib/data/actions/auth.js)
* Auth Selectors:
[lib/data/selectors/auth.js](https://github.com/idancali/react-chunky/tree/master/lib/data/selectors/auth.js)
* The Auth Reducer:
[lib/data/reducers/auth.js](https://github.com/idancali/react-chunky/tree/master/lib/data/reducers/auth.js)
* The Auth API Operation:
[lib/data/operations/AuthenticateOperation.js](https://github.com/idancali/react-chunky/tree/master/lib/data/operations/AuthenticateOperation.js)
* The Container Component:
[lib/data/containers/auth.js](https://github.com/idancali/react-chunky/tree/master/lib/data/containers/auth.js)

The Presentation Component is implemented as part of the host app. A simple, plain React component will do. To connect it to the Container Component, all you need to do is to wrap it with the container. That's all. Here's a sample of what that would look like:

```javascript
import React, { Component } from 'react'
import { AuthContainer } from 'react-chunky'

class LoginScreen extends Component {
.....
}

export default AuthContainer(LoginScreen)
```

# License

Copyright (c) 2016 I. Dan Calinescu

 Licensed under the The MIT License (MIT) (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 https://raw.githubusercontent.com/idancali/react-chunky/master/LICENSE

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
