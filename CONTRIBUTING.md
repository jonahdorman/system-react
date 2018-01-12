# Contributing to Design System React

First, on behalf of the core maintainers, I'd like to thank you for wanting to contribute and make the user experience for your end-users better and improve the developer experience of this library. :+1::tada: -- [@interactivellama](https://github.com/interactivellama/)

## Contributing process

1. Read the [Codebase Overview](docs/codebase-overview.md) to learn concepts and best practices for the codebase and to confirm it is within project scope.
1. Create a new issue before starting your solution to keep track of what you are trying to contribute. That way, we can offer suggestions, collaborate on a public API (props), or let you know if there is already an effort in progress.
1. Fork this repository, clone your fork locally. Create a topic branch locally.
1. Add the new component to the `/components` folder
1. Add the component name to `/components/constants.js`
1. If you are modifying an existing component, please fix all eslint errors in your pull request as a separate commit. Bonus kudos for fixing warnings!
1. Add documentation site examples and dev storybook stories in `/components/[COMPONENT]/__examples__/`
1. Add Mocha and Snapshot tests to `/components/[COMPONENT]/__tests__/`
1. Hook up site and storybook examples in `/components/[COMPONENT]/__docs__/`
1. Hook up documentation site examples in `/components/site-stories.js`. Site examples only have access to variables exported in `/components/index.js`, so you should limit your component's site example imports to these variables. See [#1192](https://github.com/salesforce/design-system-react/issues/1192) for more information.
1. Push to your username's forked repository.
1. Send us a well-documented pull request targeting `master` from your forked repository. GitHub pull requests should have a descriptive title, a brief summary, @mention several relevant people to review the code, add helpful GitHub comments on lines where you have questions or concerns. All contributors must sign a [Contributor License Agreement](https://cla.salesforce.com/sign-cla).
1. We'll review your code, suggest any needed changes, and hopefully merge it in. Thank you!

## Contributing Guidelines

* Are you a first-time contributor? If you would like a simple task to start out with, you might consider [these issues](https://deepscan.io/dashboard/#view=project&pid=1475&bid=4666&subview=issues) or run `npm run lint` and fix a few warnings.
* UX pattern / design must exist in [SLDS](https://www.lightningdesignsystem.com/). Components in the process of being added to SLDS will be considered as prototypes.
* All new props and components need tests. **Please review the [testing readme](/tests/README.md)**
* Follow `prettier-eslint` settings. [Prettier](https://prettier.io/) is run first. Then [ESlint](https://eslint.org/). Upon commit, staged files will be run through `prettier --write` and `eslint --fix`. This should make them pass the lint task run on the CI server and hopefully avoid style nitpicks. You can enable this behavior at save in your editor, too. For instance, in Visual Studio Code, run the [prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) and set `"editor.formatOnSave": true` and `prettier.eslintIntegration: true`.
* If you are adding a feature, [add a story](https://storybook.js.org/basics/writing-stories/) to the React Storybook that uses your feature, so that reviewers can test it.
* Add enough Storybook stories and testing examples to show use of all component prop and values--if they are enumerated. All examples that are present for a component in the [SLDS website](https://www.lightningdesignsystem.com/) should be created as a Storybook story _and_ imported into the documentaiton site examples.
* Prop description tables on the documentation site are generated from propType comments within the component. Use `npm run build-docs` to confirm comment compatibility. Introductory component descriptions are generated from the comment directly before the component declaration with [react-docgen](https://github.com/reactjs/react-docgen).
* All props descriptions should have a _Tested with snapshot testing._ or _Tested with Mocha framework._ notice in them.

## The review process

1. Read through the modified/added code in the pull request.
1. `git clone` this repository. Pull down the pull requested branch. It will be within the contributor's forked repository. For instance, `git checkout -b interactivellama-data-table-width master` then `git pull git@github.com:interactivellama/design-system-react.git data-table-width`. You could also create an additional remote and pull down the branch directly.
1. Run `npm install` and `npm start`.
1. Review the appropriate Storybook stories at `http://localhost:9001/`.
1. Review tests. Open `http://localhost:8001/` and confirm that tests are passing in your browser.
1. Compare component markup to SLDS markup. Reviewing the snapshot strings is the easiest way. Add year-first date and commit SHA to `last-slds-markup-review` in package.json and push to pull request branch.
1. Request a review of the new component/feature by the Salesforce UX Accessibility Team. Add year-first review date, and commit SHA, `last-accessibility-review`, to `package.json` and push to pull request branch.
   ```js
   {
     "component": "",
     "status": "prod",
     "display-name": "",
     "last-accessibility-review": {
       "date-iso-8601": "2017/12/31",
       "commit-sha": ""
     },
     "last-slds-markup-review": {
       "date-iso-8601": "2017/12/30",
       "commit-sha": ""
     },
     "SLDS-component-path": ""
   },
   ```
1. While the contributor's branch is checked out, run `npm run local-update` within locally cloned [site repo](https://github.com/salesforce-ux/design-system-react-site) to confirm the site will function correctly at the next release. This will also build the bundle (`npm run dist`) and use the bundle in the documentation site and confirm that the bundle works.

## Testing the documentation site (internal)

1. Pull down the documentation site (currenly private) and place in the same parent folder as this library: `git clone git@github.com:salesforce-ux/design-system-react-site.git` and run `npm install`.
1. Run `npm run local-update` from within `design-system-react-site` to build, copy, and serve a local version of this library into the site. You should be able to now view the updated site at `http://localhost:8080/` and resolve any issues with updated documentation.
