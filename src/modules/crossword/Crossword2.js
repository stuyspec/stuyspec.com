import React, { useCallback, useRef, useState } from "react";
import Crossword from "@jaredreisinger/react-crossword";
import styled from "styled-components";

const data = {
  down: {
    1: {
      clue: "Solves problems and makes friends (and solves more problems)",
      answer: "MATHTEAM",
      row: 1,
      col: 8,
    },
    2: {
      clue: "Is a delegate of 10 different countries every year",
      answer: "MODELUN",
      row: 2,
      col: 13,
    },
    3: {
      clue: "No instruments, just vibes (and good voices)",
      answer: "ACAPELLA",
      row: 3,
      col: 16,
    },
    4: {
      clue: "Talks fast, cuts too many cards, does dramatic performances",
      answer: "SPEECHANDDEBATE",
      row: 4,
      col: 11,
    },
    7: {
      clue: "Door-opening",
      answer: "KEYCLUB",
      row: 11,
      col: 19,
    },
    9: {
      clue: "“Bridging the gap” (dictatorship)",
      answer: "STUDENTUNION",
      row: 12,
      col: 15,
    },
    10: {
      clue: "Our school’s theater group, abbr.",
      answer: "STC",
      row: 13,
      col: 4,
    },
    12: {
      clue: "Girls’ racketing!",
      answer: "LOBSTERS",
      row: 14,
      col: 9,
    },
    13: {
      clue: "The pulse of the student body",
      answer: "SPECTATOR",
      row: 14,
      col: 13,
    },
    14: {
      clue: "Had missing stoles (and a broken website)",
      answer: "ARISTA",
      row: 16,
      col: 7,
    },
    15: {
      clue: "_____ing in the shower",
      answer: "SING",
      row: 16,
      col: 17,
    },
  },
  across: {
    5: {
      clue: "Competitive scienceing",
      answer: "SCIENCEOLYMPIAD",
      row: 6,
      col: 5,
    },
    6: {
      clue: "Helps one send flowers and candy to oneself",
      answer: "INDICATOR",
      row: 10,
      col: 6,
    },
    8: {
      clue: "Find them in Van Cortlandt Park",
      answer: "GREYDUCKS",
      row: 12,
      col: 7,
    },
    11: {
      clue: "A club that might be measured in beats per minute",
      answer: "STUYPULSE",
      row: 14,
      col: 3,
    },
    13: {
      clue: "“We’re in”",
      answer: "STUYHACKS",
      row: 14,
      col: 13,
    },
    15: {
      clue: "After-school dance routine run-throughs",
      answer: "SQUAD",
      row: 16,
      col: 17,
    },
    16: {
      clue: "Ms. Shamazov’s cult",
      answer: "CHORUS",
      row: 17,
      col: 4,
    },
    17: {
      clue: "Younger sibling havers",
      answer: "BIGSIBS",
      row: 19,
      col: 1,
    },
  },
};

const Header = styled.h1`
  color: #000;
  font-size: 36px;
  font-weight: normal;
  margin-top: 0;
  text-align: center;
`;

const Page = styled.div`
  padding: 2em;
  color: black;
  font-family: Minion Pro;
  margin: auto;
  width: 80%;
  p {
    margin-bottom: 30px;
    margin-top: 0px;
    text-align: center;
    font-size: 19px;
  }
  .contributor {
    font-size: 15px;
    margin-right: 5px;
    font-weight: bold;
    font-family: Circular Std;
  }
  .date {
    margin-left: 5px;
    font-size: 15px;
    font-weight: bold;
    font-family: Circular Std;
  }
  .issue {
    position: flex;
    align-items: center;
    font-family: Minion Pro;
    font-size: 14px;
    margin-top: 50px;
    color: black;
  }
`;

const Commands = styled.div`
  color: white;
  font-family: Circular Std;
  margin-left: 30px;
`;

const Command = styled.button`
  margin-bottom: -10px;
  margin-right: 1em;
  border: none;
  background-color: #efefef;
  padding: 0.75em;
  border-radius: 4px;
  color: black;
  font-weight: lighter;
  :hover {
    background-color: #bfefff;
  }
  :focus {
    outline: none;
  }
`;
//#B3DAF1
const CrosswordWrapper = styled.div`
  margin-top: 2em;
  max-width: 200em;
  text {
    fill: black !important;
    font-family: Circular Std;
  }
  input {
    :focus {
      outline: none;
      fill: #bfefff;
    }
  }
  svg {
    overflow: overlay;
  }
  g rect {
    //fill: #efefef;
    //stroke-width: 0;
    width: 4.18px;
    height: 4.18px;
  }
  .highlightBackground {
    fill: blue;
  }
  .direction {
    font-family: Minion Pro;
    line-height: 1.4;
    font-weight: light;
    font-size: 15px;
    overflow: scroll;
    max-height: 290px;
    margin: 0 auto;
    padding: 10px;
    margin-bottom: 20px;
  }
  .direction h3 {
    font-family: Circular Std;
    font-size: 15px;
    font-weight: bold;
    border-bottom: 1px solid black;
  }
  .cell {
  }
  .crossword.correct {
    text {
      fill: black !important;
    }
  }
  .clue.correct {
    ::before {
      content: "\u2713"; /* a.k.a. checkmark: ✓ */
      display: inline-block;
      text-decoration: none;
      color: black;
      margin-right: 0.25em;
    }
    text-decoration: line-through;
    color: rgb(192, 192, 192);
  }
`;

// in order to make this a more-comprehensive example, and to vet Crossword's
// features, we actually implement a fair amount...

function Crossword1() {
  const crossword = useRef();

  const fillAllAnswers = useCallback((event) => {
    crossword.current.fillAllAnswers();
  }, []);

  const reset = useCallback((event) => {
    crossword.current.reset();
  }, []);

  // We don't really *do* anything with callbacks from the Crossword component,
  // but we can at least show that they are happening.  You would want to do
  // something more interesting than simply collecting them as messages.
  const [messages, setMessages] = useState([]);

  const addMessage = useCallback((message) => {
    setMessages((m) => m.concat(`${message}\n`));
  }, []);

  // onCorrect is called with the direction, number, and the correct answer.
  const onCorrect = useCallback(
    (direction, number, answer) => {
      addMessage(`onCorrect: "${direction}", "${number}", "${answer}"`);
    },
    [addMessage]
  );

  // onLoadedCorrect is called with an array of the already-correct answers,
  // each element itself is an array with the same values as in onCorrect: the
  // direction, number, and the correct answer.
  const onLoadedCorrect = useCallback(
    (answers) => {
      addMessage(
        `onLoadedCorrect:\n${answers
          .map(
            ([direction, number, answer]) =>
              `    - "${direction}", "${number}", "${answer}"`
          )
          .join("\n")}`
      );
    },
    [addMessage]
  );

  // onCrosswordCorrect is called with a truthy/falsy value.
  const onCrosswordCorrect = useCallback(
    (isCorrect) => {
      addMessage(`onCrosswordCorrect: ${JSON.stringify(isCorrect)}`);
    },
    [addMessage]
  );

  // onCellChange is called with the row, column, and character.
  const onCellChange = useCallback(
    (row, col, char) => {
      addMessage(`onCellChange: "${row}", "${col}", "${char}"`);
    },
    [addMessage]
  );

  return (
    <Page>
      <Header>Clubs and Pubs Galore</Header>

      <p>
        <span className="contributor">By</span>
        <a
          href={window.location.origin + "/contributors/the-editorial-board"}
          className="contributor"
        >
          The Editorial Board
        </a>
        <span className="date">April 27, 2021</span>
      </p>

      <Commands>
        <Command onClick={reset}>Clear</Command>
        <Command onClick={fillAllAnswers}>Reveal</Command>
      </Commands>

      <CrosswordWrapper>
        <Crossword
          viewBox="0 0 101 100"
          data={data}
          ref={crossword}
          onCorrect={onCorrect}
          onLoadedCorrect={onLoadedCorrect}
          onCrosswordCorrect={onCrosswordCorrect}
          onCellChange={onCellChange}
          theme={{
            gridBackground: "transparent",
            focusBackground: "#ffadad",
            highlightBackground: "#ffe0e0",
          }}
        />
      </CrosswordWrapper>
      <p className="issue">
        Check out{" "}
        <a href="https://issuu.com/stuyspectator/docs/issue14_online">
          Issue 14
        </a>{" "}
        where this crossword was featured! (pg 19)
      </p>
    </Page>
  );
}

export default Crossword1;
