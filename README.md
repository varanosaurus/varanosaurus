# Knead

[![Build Status](https://travis-ci.org/varanosaurus/varanosaurus.svg)](https://travis-ci.org/varanosaurus/varanosaurus)

Homegood and grocery coordination and share-splitting application. 

Note: Currently only on iOS.

## Team

- Amy Chiu
- Kyle Cho
- Naomi Jacobs
- Cameron Martin

## Table of Contents

1. [Usage & Key Features](#usage & key features)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Contributing](#contributing)

## Usage & Key Features

Add items to buy in a pending list and view its details or edit at any time.

<a href="https://gyazo.com/05fe3853aa6d93fa4f87ed2f9eaba45d"><img src="https://i.gyazo.com/05fe3853aa6d93fa4f87ed2f9eaba45d.gif" alt="https://gyazo.com/05fe3853aa6d93fa4f87ed2f9eaba45d"/></a>

Browse an item on Amazon to either buy on the spot, or compare its prices.

<a href="https://gyazo.com/cadc88f76197ea541a80291c4a00eef5"><img src="https://i.gyazo.com/cadc88f76197ea541a80291c4a00eef5.gif" alt="https://gyazo.com/cadc88f76197ea541a80291c4a00eef5"/></a>

When marking an item as bought, enter its bought price and it will be added to the outstanding reckonings list.

<a href="https://gyazo.com/e4005ed39f3869c5c7303650c8b360d0"><img src="https://i.gyazo.com/e4005ed39f3869c5c7303650c8b360d0.gif" alt="https://gyazo.com/e4005ed39f3869c5c7303650c8b360d0"/></a>

View details of a bought item.

<a href="https://gyazo.com/c1c40fc12b019d689bc4ee2cdaa51ec6"><img src="https://i.gyazo.com/c1c40fc12b019d689bc4ee2cdaa51ec6.gif" alt="https://gyazo.com/c1c40fc12b019d689bc4ee2cdaa51ec6"/></a>

Reckon items when you choose and see who owes what (or wait until the end of the month for automatic monthly reckonings).

<a href="https://gyazo.com/fef2692187928bd1e24635c062e80082"><img src="https://i.gyazo.com/fef2692187928bd1e24635c062e80082.gif" alt="https://gyazo.com/fef2692187928bd1e24635c062e80082"/></a>

Pay or request $ via venmo (click on link below to view).

https://hr33.slack.com/files/kylecho/F0E2ARJQN/venmogif


## Requirements

Server:
- Node 4+
- Express
- Sequelize
- bcrypt-nodejs
- ESLint

Mobile client:
- React Native
- Xcode 7


## Development

### Installing Dependencies

From within the root directory:

```sh
npm install
```

From within the `client-mobile` directory:
```
npm install
```
to install `react-native` and enable packaging.

Open the `client-mobile/ios/Knead.xcodeproj` file in Xcode and run in the simulator.

### Roadmap

View the project roadmap [here](LINK_TO_PROJECT_ISSUES)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
