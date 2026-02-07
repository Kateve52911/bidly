### How to run

```bash
npm run dev
```

# Bidly Auction Site

Template for a feature rich and easy to read README

## Intro

Bidly Auction site is a website where users can either browse auction listings as an unregistered user or they can create a user. If they choose to create a user, they will experience a website where they can auction of items, experiences or anything else they fancy! A user that is logged in will see how many credits they have \* and place bids on other peoples listings. A user can see their bid history on their profile page. On the profile page they can also see their own listings, and if they have won any auctions, it will be displayed here.

\*All new users get 1000 credits when they register a user account.

Bidly Auction Site is my semester project 2 as part of my studies to become a front-end developer.

## Feature overview

- [x] User registration and authentication (1000 credits on signup)
- [x] Browse and search auction listings
- [x] Create, edit, and delete listings
- [x] Place bids on active auctions
- [x] View profile with bid history and won auctions
- [x] Responsive design for all devices

## Contents

- [Getting started](#getting-started)
  - [Requirements](#requirements)
  - [Install](#install)
  - [Usage](#usage)
- [Images and Project Structure](#images-and-project-structure)
  - [Project Structure](#project-structure)
- [Don't forget anything](#dont-forget-anything)
  - [Used Technologies](#used-technologies)
  - [Testing](#testing)
- [Contribute](#contribute)
- [License](#license)
- [Sources](#sources)
- [Conclusion](#conclusion)

## Getting Started

In order to run this project locally on you computer, you have to do the following steps.
It is easier than you think.

### Requirements

Make sure that you have the following installed on your computer:

- Node.js (version 18 or higher)
- npm or yarn
- Git

### Install

#### 1. Clone the repository:

Use git to clone this repository into your computer.

```
https://github.com/Kateve52911/bidly.git
```

#### 2. Install dependencies:

```
npm install
```

### Environment Variables

Create a `.env` file in the root directory, see the .env.example file for an example.

```bash
VITE_API_KEY=your_api_key_here
VITE_API_BASE_URL=https://v2.api.noroff.dev
```

**Note:** Never commit your `.env` file to version control.

### Usage

After installation, run the development server:

```bash
npm run dev
```

Open your browser and navigate to the local host address shown in the terminal.

**As a user you can:**

- Register for an account (receive 1000 credits)
- Browse and search auction listings
- Create your own listings
- Bid on items
- View your profile and bid history

## Images and Project structure:

Here starts the main content of your README. This is why you did it for in the first place.
To describe to future users of this project (including yourself) everything they need to know
to be able to use it and understand it.

Use visuals to help the reader understand better. An image, diagram, chart or code example says
more than thousand words

### Project structure:

```
bidly/
├── src/
│   └── app/
│       ├── api/                    # API integration
│       │   ├── auth/               # Authentication endpoints
│       │   ├── listings/           # Listing CRUD operations
│       │   ├── user/               # User/profile operations
│       │   ├── config/             # API configuration
│       │   └── types/              # TypeScript type definitions
│       ├── components/             # Reusable UI components
│       │   ├── errorHandling/      # Error display components
│       │   ├── forms/              # Form components
│       │   ├── listings/           # Listing display components
│       │   ├── navbar/             # Navigation bar
│       │   ├── profile/            # Profile components
│       │   └── serachAndFilter/    # Search & filter functionality
│       ├── pages/                  # Page-specific TypeScript
│       │   ├── index.ts            # Home page logic
│       │   ├── login.ts            # Login page logic
│       │   ├── register.ts         # Register page logic
│       │   ├── profile.ts          # Profile page logic
│       │   ├── new-listing.ts      # Create listing logic
│       │   └── singleListing.ts    # Single listing view logic
│       ├── ui/                     # UI rendering utilities
│       │   ├── auth/
│       │   └── events/
│       └── utils/                  # Helper functions
│           ├── helpers/            # General utilities
│           │   ├── card/
│           │   ├── delay/
│           │   ├── forms/
│           │   ├── listings/
│           │   └── modal/
│           ├── storage/            # Local storage management
│           └── validation/         # Form validation
├── scss/                           # Styling
│   ├── custom-bootstrap.scss       # Bootstrap customization
│   └── styles.scss                 # Custom styles
├── assets/                         # Static assets
│   ├── favicon/
│   └── images/
├── tests/                          # Unit tests
│   └── unit/
│       └── app/
│           ├── ui/
│           └── utils/
├── index.html                      # Home page
├── listing.html                    # Listing detail page
├── login.html                      # Login page
├── register.html                   # Register page
├── profile.html                    # Profile page
├── new-listing.html                # Create listing page
├── main.ts                         # Application entry point
├── vite.config.ts                  # Vite configuration
├── tsconfig.json                   # TypeScript configuration
└── package.json
```

## Don't forget anything

Think hard about anything that is clear to you but might not be clear for others. Why are you
using this approach or why did you pick this solution instead?

### Used technologies

- Typescript
- Bootstrap
- Vite
- Vitest
- Husky
- ESLint
- PlayWright

### Testing

No tests no success. You SHOULD have tests for every project, but do new users know how to run them?

## Contribute

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Sources

[react-markdown][react-markdown] - Project which served as an inspiration for this README

[Blog post templates][blog-post-templates] - Used to structure this template as an easy to read blog post

[About markdown][about-markdown] - Why should you use markdown?

[Markdown Cheat Sheet][markdown-cheatsheet] - Get a fast overview of the syntax

[//]: # 'Source definitions'
[react-markdown]: https://github.com/remarkjs/react-markdown 'React-markdown project'
[blog-post-templates]: https://backlinko.com/hub/content/blog-post-templates 'Backlinko blog post templates'
[about-markdown]: https://www.markdownguide.org/getting-started/ 'Introduction to markdown'
[markdown-cheatsheet]: https://www.markdownguide.org/cheat-sheet/ 'Markdown Cheat Sheet'

## Conclusion

To summarize.

We have an exhaustive README template with many features. The README is easy to read and navigate like an article.
In our future projects we can use this template to get a great head start in creating a custom README.
