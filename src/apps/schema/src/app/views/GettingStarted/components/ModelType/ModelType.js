import React from "react";
import cx from "classnames";

import { Card } from "@zesty-io/core/Card";

import styles from "./ModelType.less";
export function ModelType(props) {
  return (
    <>
      <h2 className={styles.display}>Select Model Type</h2>
      <p className={styles.title}>
        We are going to start by selecting a type of model you would like to
        build?
      </p>

      <main className={styles.Cards}>
        <Card
          onClick={() => props.setModelType("pageset")}
          className={cx(
            styles.Option,
            props.modelType === "pageset" ? styles.Selected : null
          )}
        >
          <i className={cx(`far fa-file`, styles.icon)} />
          <h2 className={styles.headline}>Single page</h2>
          <p className={styles.subheadline}>
            e.g. About Us page, Contact Us page
          </p>
        </Card>
        <Card
          onClick={() => props.setModelType("templateset")}
          className={cx(
            styles.Option,
            props.modelType === "templateset" ? styles.Selected : null
          )}
        >
          <i className={cx(`far fa-copy`, styles.icon)} />
          <h2 className={styles.headline}>Multi-page set</h2>
          <p className={styles.subheadline}>
            e.g. Articles, Team member profiles
          </p>
        </Card>
        <Card
          onClick={() => props.setModelType("dataset")}
          className={cx(
            styles.Option,
            props.modelType === "dataset" ? styles.Selected : null
          )}
        >
          <i className={cx(`fas fa-database`, styles.icon)} />
          <h2 className={styles.headline}>Headless set</h2>
          <p className={styles.subheadline}>
            e.g. app content, mobile navigation, category tags
          </p>
        </Card>
      </main>
    </>
  );
}
