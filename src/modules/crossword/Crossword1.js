import React, { useCallback, useRef, useState } from "react";
import Crossword from "@jaredreisinger/react-crossword";
import styled from "styled-components";

const data = {
  down: {
    1: {
      clue: "Remote learning Spectator magazine with a punny name.",
      answer: "QUARANZINE",
      row: 1,
      col: 21,
    },
    2: {
      clue: "“Wait I can’t hear you, you’re ____!”",
      answer: "MUTED",
      row: 2,
      col: 8,
    },
    4: {
      clue: "A means of traversing between floors at Stuyvesant (in theory).",
      answer: "ESCALATOR",
      row: 2,
      col: 16,
    },
    5: {
      clue: "First word of “Ferry’s” real name",
      answer: "GOURMET",
      row: 3,
      col: 11,
    },
    6: {
      clue: "Annual Spectator published on April Fools’ Day.",
      answer: "DISRESPECTATOR",
      row: 3,
      col: 14,
    },
    9: {
      clue: "Number of departments on The Spectator!",
      answer: "THIRTEEN",
      row: 5,
      col: 6,
    },
    15: {
      clue: "Stuyvesant’s go-to social media platform.",
      answer: "FACEBOOK",
      row: 10,
      col: 9,
    },
    17: {
      clue:
        "A common article format to present quotes. For the uneducated—examples include jam, peanut butter, and marmalade.",
      answer: "SPREAD",
      row: 11,
      col: 12,
    },
    19: {
      clue:
        "Most common first name among assistant principals (and former principals).",
      answer: "ERIC",
      row: 12,
      col: 5,
    },
    21: {
      clue: "The symbol used in many outquotes in The Spectator.",
      answer: "EMDASH",
      row: 12,
      col: 16,
    },
    22: {
      clue: "“Please raise your ___ hand!”",
      answer: "BLUE",
      row: 13,
      col: 21,
    },
    28: {
      clue: "The “A” in “A&E.”",
      answer: "ARTS",
      row: 17,
      col: 10,
    },
  },
  across: {
    3: {
      clue: "The clearly inferior video conferencing platform made by Google.",
      answer: "MEETS",
      row: 2,
      col: 15,
    },
    7: {
      clue:
        "The website that the program office is NOT using for program changes this semester.",
      answer: "TALOS",
      row: 4,
      col: 8,
    },
    8: {
      clue:
        "First name of the former Stuyvesant principal for whom the auditorium is named.",
      answer: "MURRAY",
      row: 4,
      col: 19,
    },
    10: {
      clue:
        "Last name of the singer of The Spectator’s pick for the best album of 2019.",
      answer: "EILISH",
      row: 6,
      col: 1,
    },
    11: {
      clue: "Iconic Stuyvesant inter-grade performance competition.",
      answer: "SING",
      row: 6,
      col: 19,
    },
    12: {
      clue:
        "Title of The Spectator magazine that started online beef with the Big Sibs program.",
      answer: "UNDERCURRENTS",
      row: 8,
      col: 2,
    },
    13: {
      clue: "The Spectator’s newest department.",
      answer: "SCIENCE",
      row: 8,
      col: 19,
    },
    14: {
      clue:
        "A section in the Features department that includes personal pieces.",
      answer: "VOICES",
      row: 10,
      col: 2,
    },
    16: {
      clue:
        "Bi-annual Spectator event held in the fall to introduce students to The Spectator.",
      answer: "RECRUITMENTS",
      row: 10,
      col: 13,
    },
    18: {
      clue: "Floor number in which freshmen are told there is a pool.",
      answer: "ELEVEN",
      row: 12,
      col: 1,
    },
    20: {
      clue: "The *best* sauce on Ferry’s sandwiches.",
      answer: "CHIPOTLEMAYO",
      row: 12,
      col: 9,
    },
    23: {
      clue: "Train many Stuyvesant students take to get to school.",
      answer: "LIRR",
      row: 14,
      col: 21,
    },
    24: {
      clue:
        "Last name of the Sports Department’s most recent Athlete of the Issue.",
      answer: "YAO",
      row: 15,
      col: 7,
    },
    26: {
      clue:
        "The machine that plays “Birthday” by The Beatles on your birthday.",
      answer: "SCANNERS",
      row: 16,
      col: 16,
    },
    27: {
      clue:
        "The aha moment! (and joint name of the current Spectator editors-in-chief).",
      answer: "EUREKA",
      row: 17,
      col: 5,
    },
    29: {
      clue:
        "Staircase that covers least number of floors in the school building.",
      answer: "RIVER",
      row: 18,
      col: 10,
    },
    30: {
      clue: "Initials of an iconic Ferry’s sandwich",
      answer: "BLT",
      row: 19,
      col: 8,
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
// #B3DAF1
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
    width: 3.828px;
    height: 3.828px;
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
    float: right;
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
  const [, setMessages] = useState([]);

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
      <Header>Winter Crossword</Header>

      <p>
        <span className="contributor">By</span>
        <a
          href={`${window.location.origin}/contributors/the-editorial-board`}
          className="contributor"
        >
          The Editorial Board
        </a>
        <span className="date">December 23, 2020</span>
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
            focusBackground: "#9ee7ff",
            highlightBackground: "#d9f5ff",
          }}
        />
      </CrosswordWrapper>
      <p className="issue">
        Check out{" "}
        <a href="https://issuu.com/stuyspectator/docs/issue8-online">Issue 8</a>{" "}
        where this crossword was featured! (pg 8)
      </p>
    </Page>
  );
}

export default Crossword1;
