import React, { PureComponent } from "react";
import cx from "classnames";

import { Select, Option } from "@zesty-io/core";

import styles from "./Columns.less";
export class Columns extends PureComponent {
  render() {
    return (
      <header className={styles.TableHeader} style={this.props.style}>
        <span className={styles.wrap}>
          {this.props.cols.map(col => {
            return (
              <div key={col} className={styles.column}>
                <span className={cx(styles.Cell)}>{col.toUpperCase()}</span>
                <Select
                  name={col}
                  onSelect={value => {
                    this.props.handleMap(value, col);
                  }}
                  value="none"
                >
                  <Option text="none" value="none" />
                  {this.props.fields.map(field => (
                    <Option
                      key={field.name}
                      text={field.label}
                      value={field.name}
                    />
                  ))}
                </Select>
              </div>
            );
          })}
        </span>
      </header>
    );
  }
}
