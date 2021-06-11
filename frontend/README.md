An example of React implementation for IDStar's Frontend Test.

## Design
This project tries to implement as many [Redux's style guide points](https://redux.js.org/style-guide/style-guide#structure-files-as-feature-folders-with-single-file-logic) as possible. The 'loudest' one is the feature folder structure.

No class components are used.

Components are divided based on the **container pattern** even though hooks are used.

Api services are separated to put abstraction over the logic behind them.

## Lib used
- [redux-toolkit](https://redux-toolkit.js.org/) (and its connector of course [react-redux](https://react-redux.js.org/))
- [react-hook-form](https://react-hook-form.com/)
- [axios](https://axios-http.com/)