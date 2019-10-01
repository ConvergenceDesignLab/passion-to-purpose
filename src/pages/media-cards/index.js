import React from "react";
import { Link } from "react-router-dom";
import { observer, inject } from "mobx-react";
import Container from "../../components/container";
import style from "./index.module.scss";
import GenerateAttribution from "../../components/generator-attribution";

class MediaCards extends React.Component {
  render() {
    const { gameData, nextRoute } = this.props;
    const medium = gameData.medium;
    return (
      <Container>
        <h1 className="title">Let's make a {medium}!</h1>
        <div className="description">
          Cycle through the {medium} category to view various types of projects done similarly in
          your community!
        </div>

        <div className={style.cardsContainer}>
          <div className={style.childCard}>
            {gameData.mediaExampleData["A Game"][0].exampleName}
          </div>
          <div className={style.exampleCard}>
            <img src={gameData.mediaExampleData["A Game"][0].image} />
          </div>
          <div className={style.descriptionCard}>
            <a
              href={gameData.mediaExampleData["A Game"][0].link}
              className={style.logoLink}
              onClick={event => {
                event.preventDefault();
                window.open(gameData.mediaExampleData["A Game"][0].link);
              }}
            >
              {" "}
              Link to Project
            </a>
          </div>
        </div>

        <div className="generateButtonContainer" style={{ textAlign: "center", marginTop: "2rem" }}>
          <GenerateAttribution
            className={style.generatedButton}
            //onClick={this.toggleHiddenPassion.bind(this)}
          />
          <Link className="button" to={nextRoute}>
            Continue ➞
          </Link>
        </div>
      </Container>
    );
  }
}

export default inject("gameData")(observer(MediaCards));
