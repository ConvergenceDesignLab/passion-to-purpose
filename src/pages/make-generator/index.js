import React from "react";
//import { Link } from "react-router-dom";
import { observer, inject } from "mobx-react";
import Container from "../../components/container";
//import SocialShare from "../../components/social-share";
import style from "./index.module.scss";

class Generator extends React.Component {
  constructor(props) {
    super(props);

    const gameData = this.props.gameData;
    gameData.generateCombinations();
    this.state = { combinationNumber: 0 };
  }

  componentDidMount() {
    const gameData = this.props.gameData;
    gameData.saveToFirebase();
  }

  getNextCombination = () => {
    this.setState(prev => {
      // TODO: save combo number to DB
      return { combinationNumber: prev.combinationNumber + 1 };
    });
  };

  render() {
    const { gameData } = this.props;
    const { combinationNumber } = this.state;
    const combinations = gameData.combinations;
    const [passionIndex, purposeIndex] = combinations[combinationNumber % combinations.length];
    const passion = gameData.passionStore.responses[passionIndex];
    const purpose = gameData.getPurposesWithVerb()[purposeIndex];

    return (
      <Container>
        <h1 className="title">Define</h1>
        <div className="description">
          Let’s combine your action and medium to define your project!
        </div>
        <div className={style.generatedQuestion}>
          How might we use <span className={style.generatedPassion}>{passion}</span> to{" "}
          <span className={style.generatedPurpose}>{gameData.purpose}</span>? <br />
          Let's make a <span className={style.generatedPassion}>{gameData.medium}</span> to{" "}
          <span className={style.generatedPassion}>{gameData.action}</span>
          .
          <div className={style.generateButtonContainer} />
        </div>
      </Container>
    );
  }
}

export default inject("gameData")(observer(Generator));
