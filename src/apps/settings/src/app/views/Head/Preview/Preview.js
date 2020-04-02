import React from "react";

import styles from "./Preview.less";
export const Preview = props => (
  <aside className={styles.TagPreviewWrap}>
    {/* {`<!-- Global head tags are inserted before local tags --> \n`} */}
    <pre className={styles.TagPreview}>
      <p className={styles.Tag}>{`<head>`}</p>
      <p>
        {props.item &&
          props.item.web &&
          `  <!-- Auto-generated Head Tags -->
  <title>${props.item.web.metaTitle}</title>
  <meta name="description" content="${props.item.web.metaDescription}" />
  <meta  http-equiv="Content-Type" content="text/html;charset=utf-8">
  <link rel="canonical" href="${props.domain}${props.item.web.path}" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary">
  <meta property="og:title" content="${props.item.web.metaTitle}" />
  <meta name="twitter:title" content="${props.item.web.metaTitle}">
  <meta property="og:description" content="${props.item.web.metaDescription}" />
  <meta property="twitter:description" content="${props.item.web.metaDescription}" />
  <meta property="og:url" content="${props.domain}${props.item.web.path}" />
  <meta property="og:site_name" content="${props.instanceName}" />\n
`}
      </p>
      {`  <!-- Custom Item Head Tags -->\n`}
      {props.tags
        .map(
          tag =>
            `  <${tag.type} ${tag.attributes
              .map(attr => `${attr.key}="${attr.value}"`)
              .join(" ")} />`
        )
        .join("\n")}

      <p className={styles.Tag}>{`</head>`}</p>
    </pre>
  </aside>
);