import App from "next/app";
import { Provider } from "react-redux";
import Head from "next/head"; //styles of nprogress
import React from "react";
import Router from "next/router";
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

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import NProgress from "nprogress"; //nprogress module
import "nprogress/nprogress.css";
//Binding events.
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const override = css`
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

class MyApp extends App {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false });
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
          <script src="https://js.pusher.com/7.0/pusher.min.js" />
          <title>EGOLIST</title>
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    );
  }
}

const makeStore = () => store;

export default withRedux(makeStore)(MyApp);
