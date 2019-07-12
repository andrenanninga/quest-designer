import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html className="fixed overflow-hidden">
        <Head>
          <meta
            name="viewport"
            content="user-scalable=1.0,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,width=device-width,minimal-ui,viewport-fit=cover"
          />
          <meta name="apple-mobile-web-app-capable" content="yes" />
        </Head>
        <body className="select-none fixed overflow-hidden font-sans">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
