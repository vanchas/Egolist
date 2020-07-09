import App from 'next/app';
import { Provider } from 'react-redux';
import React from 'react';
import Layout from '../components/layout/Layout';
import withRedux from "next-redux-wrapper";
import store from '../redux/store.ts';
import './styles/global.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

class MyApp extends App {
  static async getInitialProps(props) {
    const pageProps = props.Component.getInitialProps ? await props.Component.getInitialProps(props.ctx) : {};
    return {
      pageProps: pageProps
    };
  }

  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <Provider store={store}>
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
