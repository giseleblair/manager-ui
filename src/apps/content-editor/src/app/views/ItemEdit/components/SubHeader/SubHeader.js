import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRocket,
  faEye,
  faCodeBranch
} from "@fortawesome/free-solid-svg-icons";
import { Url } from "@zesty-io/core/Url";
import { ItemUrl } from "./ItemUrl";

import styles from "./SubHeader.less";
export class SubHeader extends Component {
  render() {
    return (
      <header className={styles.SubHeader}>
        <div className={styles.Path}>
          {this.props.item.web.path &&
            (this.props.instance.live_domain ? (
              <ItemUrl item={this.props.item} instance={this.props.instance} />
            ) : (
              <Url
                target="_blank"
                href={`${CONFIG.URL_ACCOUNTS}/instances/${this.props.modelZUID}/launch`}
              >
                <FontAwesomeIcon icon={faRocket} />
                &nbsp;Launch Instance
              </Url>
            ))}
          <div>
            <span>Preview Links: &nbsp;</span>
            {this.props.item.web.path && (
              <Url
                className={styles.PreviewUrl}
                target="_blank"
                title={`${this.props.instance.preview_domain}${this.props.item.web.path}`}
                href={`${this.props.instance.preview_domain}${this.props.item.web.path}`}
              >
                <FontAwesomeIcon icon={faEye} /> Current Version
              </Url>
            )}
            <span>&nbsp;&nbsp;&nbsp;</span>
            {this.props.item.web.path && (
              <Url
                className={styles.PreviewUrl}
                target="_blank"
                title={`${this.props.instance.preview_domain}${this.props.item.web.path}`}
                href={`${this.props.instance.preview_domain}${this.props.item.web.path}?__version=${this.props.item.meta.version}`}
              >
                <FontAwesomeIcon icon={faCodeBranch} /> Version{" "}
                {this.props.item.meta.version}
              </Url>
            )}
          </div>
        </div>
        <div className={styles.Actions}>{this.props.children}</div>
      </header>
    );
  }
}