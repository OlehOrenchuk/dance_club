import React from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Layout from "../Layout/Layout";
import MainScreen from "./MainScreen";
import Opportunities from "./Opportunities";

export default function Main() {
  return (
    <Layout>
      <MainScreen />
      <Opportunities />
    </Layout>
  );
}
