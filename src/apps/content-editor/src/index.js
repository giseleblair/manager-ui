import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { HashRouter, Route } from "react-router-dom";
import { get } from "idb-keyval";

// Error reporting
import * as Sentry from "@sentry/browser";
Sentry.init({
  dsn: "https://af24d09ea04a4170ac8f914cc2eb54ad@sentry.io/1352320"
});

import { injectReducer } from "shell/store";

import { contentModels, fetchModels } from "./store/contentModels";
import {
  contentModelItems,
  fetchItemPublishings
} from "./store/contentModelItems";
import { contentModelItemVersions } from "./store/contentModelItemVersions";
import { contentModelFields } from "./store/contentModelFields";
import { contentNav, fetchNav } from "./store/contentNav";
import { contentLogs } from "./store/contentLogs";
import { modal } from "./store/modal";
import { listFilters } from "./store/listFilters";
import { headTags, fetchHeadTags } from "./store/headTags";

import ContentEditor from "./app";

window.ContentEditorApp = class ContentEditorApp extends React.Component {
  componentWillMount() {
    try {
      Promise.all([
        get(`${zesty.site.zuid}:user:selected_lang`),
        get(`${zesty.site.zuid}:contentNav`),
        get(`${zesty.site.zuid}:contentModels`),
        get(`${zesty.site.zuid}:contentModelFields`),
        get(`${zesty.site.zuid}:contentModelItems`)
      ]).then(results => {
        const [lang, nav, models, fields, items] = results;

        ZESTY_REDUX_STORE.dispatch({
          type: "LOADED_LOCAL_USER_LANG",
          payload: { lang }
        });

        // FIXME: This is broken because on initial nav fetch we modify
        // the raw response before entering it into local state so when re-loading
        // from local db it's not in the shape the redux store expects.
        // ZESTY_REDUX_STORE.dispatch({
        //   type: "LOADED_LOCAL_CONTENT_NAV",
        //   raw: nav
        // });

        // ZESTY_REDUX_STORE.dispatch({
        //   type: "LOADED_LOCAL_MODELS",
        //   payload: models
        // });

        // ZESTY_REDUX_STORE.dispatch({
        //   type: "LOADED_LOCAL_FIELDS",
        //   payload: fields
        // });

        // ZESTY_REDUX_STORE.dispatch({
        //   type: "LOADED_LOCAL_ITEMS",
        //   data: items
        // });

        // if (Array.isArray(itemZUIDs)) {
        //   const items = itemZUIDs.map(itemZUID =>
        //     get(`${zesty.site.zuid}:contentModelItems:${itemZUID}`)
        //   );
        //
        //   Promise.all(items).then(itemsArr => {
        //     const itemsObj = itemsArr.reduce((acc, item) => {
        //       acc[item.meta.ZUID] = item;
        //       return acc;
        //     }, {});
        //
        //     ZESTY_REDUX_STORE.dispatch({
        //       type: "LOADED_LOCAL_ITEMS",
        //       data: itemsObj
        //     });
        //   });
        // }
      });
    } catch (err) {
      console.error("IndexedDB:get:error", err);
    }

    // Inject reducers into shared app shell store
    injectReducer(ZESTY_REDUX_STORE, "contentModels", contentModels);
    injectReducer(ZESTY_REDUX_STORE, "contentModelItems", contentModelItems);
    injectReducer(
      ZESTY_REDUX_STORE,
      "contentModelItemVersions",
      contentModelItemVersions
    );
    injectReducer(ZESTY_REDUX_STORE, "contentModelFields", contentModelFields);
    injectReducer(ZESTY_REDUX_STORE, "contentNav", contentNav);
    injectReducer(ZESTY_REDUX_STORE, "contentLogs", contentLogs);
    injectReducer(ZESTY_REDUX_STORE, "modal", modal);
    injectReducer(ZESTY_REDUX_STORE, "listFilters", listFilters);
    injectReducer(ZESTY_REDUX_STORE, "headTags", headTags);

    // NOTE: We expose the content store globally so ActivePreview can
    // resolve the current routes path
    window.ContentAppStore = ZESTY_REDUX_STORE;

    // Kick off loading data before app mount
    // to decrease time to first interaction
    ZESTY_REDUX_STORE.dispatch(fetchNav());
    ZESTY_REDUX_STORE.dispatch(fetchModels());
    ZESTY_REDUX_STORE.dispatch(fetchItemPublishings());
    ZESTY_REDUX_STORE.dispatch(fetchHeadTags());
  }

  render() {
    return (
      <Provider store={ZESTY_REDUX_STORE}>
        <HashRouter
          hashType="hashbang"
          getUserConfirmation={(message, callback) => {
            if (message === "confirm") {
              openNavigationModal();
              callback(false);
            } else {
              callback(true);
            }
          }}
        >
          <Route component={ContentEditor} />
        </HashRouter>
      </Provider>
    );
  }
};
