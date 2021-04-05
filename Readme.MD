# HTTP Notification System

## Description
HTTP Notification System

## Table of Content

- [System Setup](#system-setup)
- [Installation](#installation)

### System Setup
Your system will need to have the following software installed:

  * [Node](https://nodejs.org/en/download/)
  * [Redis](https://redis.io/download/)

## Installation
#### Step 1: Clone the repository

```bash
git clone <repo-url>
cd <project-directory>
```

#### Step 2: Install NPM packages
```bash
npm install
```

#### Step 3: Start publisher server
```bash
npm run publisher_server
```

#### Step 4: Start subscriber servers
```bash
npm run subscriber_server
```

## Deployment
1. Clone the repo - `git clone <repo-url>`
2. Navigate into the project directory - `cd <project-directory>`
3. Ensure you have NodeJS (at least v12) installed
4. Install dependencies - `npm install`
8. Create a production build - `npm run build`
9. Start the server - `npm start`