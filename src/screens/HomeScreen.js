import React from "react";
import Banner from "../banner/Banner";
import "./HomeScreen.css";
import Nav from "../navbar/Nav";
import Row from "../row/Row";
import { requests } from "../API/Request";

export default function Homescreen() {
  return (
    <div className="homeScreen">
      {/* NavBar */}
      <Nav />
      {/* Banner */}
      <Banner />
      {/* Row */}
      <Row title="Film tendance" fetchUrl={requests.fetchTrending} isLargeRow />
      <Row
        title="Originals Netflix"
        fetchUrl={requests.fetchNetflix}
        isLargeRow
      />
      <Row
        title="Les films les mieux notés"
        fetchUrl={requests.fetchTopRated}
        isLargeRow
      />
      <Row title="Film d'action" fetchUrl={requests.fetchAction} isLargeRow />
      <Row title="Film de comédie" fetchUrl={requests.fetchComedy} isLargeRow />
      <Row title="Film d'horreur" fetchUrl={requests.fetchHorror} isLargeRow />
      <Row
        title="Film romantique"
        fetchUrl={requests.fetchRomance}
        isLargeRow
      />
      <Row
        title="Documentaires"
        fetchUrl={requests.fetchDocumentaries}
        isLargeRow
      />
      {/* Row */}
    </div>
  );
}
