import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import store from './store';

import Home from './containers/Home';
import UserPhotos from './containers/UserPhotos';

import Footer from './containers/Footer';
import SideBar from './containers/SideBar';

import './App.css';

const Wrapper = styled.div`
  height: 100vh;
`;
const ContentWrapper = styled.div`
  width: calc(100vw - 360px);
  height: calc(100vh - 65px);
  margin-left: 360px;
`;

function App() {
  return (
    <Provider store = { store }>
      <Router>
        <Wrapper>
          <Helmet>
            <meta charSet="utf-8" />
            <title>XOTV FrontEnd TEST</title>
          </Helmet>
          <Wrapper>
            <SideBar />
            <ContentWrapper>
              <Routes>
                <Route exact path="/photos" element={<UserPhotos />} />
                <Route exact path="/" element={<Home />} />
              </Routes>
            </ContentWrapper>
            <Footer />
          </Wrapper>
        </Wrapper>
      </Router>
    </Provider>
  );
}

export default App;
