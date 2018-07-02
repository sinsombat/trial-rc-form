import React from 'react';
import { AfterRoot, AfterData } from '@jaredpalmer/after';

import serialize from 'serialize-javascript';

class CustomDocument extends React.Component {
  static async getInitialProps({ assets, data, renderPage }) {
    const page = await renderPage();
    return { assets, data, ...page };
  }

  render() {
    const { helmet, assets, data, serverState } = this.props;

    // get attributes from React Helmet
    const htmlAttrs = helmet.htmlAttributes.toComponent();
    const bodyAttrs = helmet.bodyAttributes.toComponent();
    return (
      <html {...htmlAttrs}>
        <head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta charSet="utf-8" />
          <title>React Rezzle After Antd Saga</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {helmet.title.toComponent()}
          {helmet.meta.toComponent()}
          {helmet.link.toComponent()}
          {assets.client.css && (
            <link rel="stylesheet" href={assets.client.css} />
          )}
          {process.env.NODE_ENV === 'production' ? (
            <span
              dangerouslySetInnerHTML={{
                __html: `<script src="${assets.client.js}" defer></script>`,
              }}
            />
          ) : (
            <span
              dangerouslySetInnerHTML={
                { __html: `<script src="${assets.client.js}" defer crossorigin></script>` } // prettier-ignore
              }
            />
          )}
        </head>
        <body {...bodyAttrs}>
          <AfterRoot />
          <AfterData data={data} />
          <span
            dangerouslySetInnerHTML={
              { __html: `<script>window.__PRELOADED_STATE__ = ${serialize(serverState)}</script>` } // prettier-ignore
            }
          />
        </body>
      </html>
    );
  }
}

export default CustomDocument;
