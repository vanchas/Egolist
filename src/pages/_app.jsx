import App from "next/app";
import { Provider } from "react-redux";
import React from "react";
import Layout from "../components/layout/Layout";
import withRedux from "next-redux-wrapper";
import store from "../redux/store.ts";
import "./styles/global.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-image-crop/dist/ReactCrop.css";

import "antd/dist/antd.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { css } from "@emotion/core";
import SyncLoader from "react-spinners/SyncLoader";

const override = css`
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

// import NProgress from "nprogress"; //nprogress module
// import "nprogress/nprogress.css";
import Head from "next/head"; //styles of nprogress
//Binding events.
// Router.events.on("routeChangeStart", () => NProgress.start());
// Router.events.on("routeChangeComplete", () => NProgress.done());
// Router.events.on("routeChangeError", () => NProgress.done());

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class MyApp extends App {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      // this.setState({ loading: false });
    }, 500);
  }

  static async getInitialProps(props) {
    const pageProps = props.Component.getInitialProps
      ? await props.Component.getInitialProps(props.ctx)
      : {};
    return {
      pageProps: pageProps,
    };
  }

  render() {
    const { Component, pageProps, store } = this.props;

    return this.state.loading ? (
      <div className="sweet-loading">
        <SyncLoader
          css={override}
          size={20}
          color={"#c78550"}
          loading={this.state.loading}
        />
      </div>
    ) : (
      <Provider store={store}>
        <Head>
          <script
            defer
            src="https://use.fontawesome.com/releases/v5.0.13/js/all.js"
          />
          <title>EGOLIST</title>
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    );
  }
}

//makeStore function that returns a new store for every request
const makeStore = () => store;

//withRedux wrapper that passes the store to the App Component
export default withRedux(makeStore)(MyApp);
