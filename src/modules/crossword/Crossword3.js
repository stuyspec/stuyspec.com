import React, { useCallback, useRef, useState } from "react";
import Crossword from "@jaredreisinger/react-crossword";
import styled from "styled-components";

const data = {
  down: {
    1: {
      clue:
        "Check to make sure you have no embarrassing tabs open before you do this.",
      answer: "SCREENSHARE",
      row: 1,
      col: 10,
    },
    2: {
      clue:
        "Allows you to travel to San Francisco or outer space in the middle of your meeting.",
      answer: "BACKGROUND",
      row: 1,
      col: 15,
    },
    5: {
      clue: "Second in line to the Zoom throne (__host)",
      answer: "CO",
      row: 7,
      col: 3,
    },
    6: {
      clue: "You are one of them!",
      answer: "PARTICIPANTS",
      row: 7,
      col: 8,
    },
    7: {
      clue: "“If you want to speak, click on your ___Hand feature.”",
      answer: "RAISE",
      row: 7,
      col: 13,
    },
    9: {
      clue:
        "For participants, the most tempting red button on the corner of the screen.",
      answer: "LEAVE",
      row: 8,
      col: 4,
    },
    12: {
      clue: "“Can you hear me? Is my ___ working?”",
      answer: "MIC",
      row: 12,
      col: 3,
    },
    14: {
      clue: "The one who asks you to unmute yourself when you don’t want to.",
      answer: "HOST",
      row: 13,
      col: 11,
    },
    17: {
      clue:
        "For hosts, the most tempting red button at the bottom right corner of the screen.",
      answer: "END",
      row: 16,
      col: 12,
    },
  },
  across: {
    3: {
      clue: "When sharing, “Can everyone see my ___?”",
      answer: "SCREEN",
      row: 3,
      col: 8,
    },
    4: {
      clue: "“Mr. Citron, we can’t hear you. You’re ___.”",
      answer: "MUTED",
      row: 5,
      col: 7,
    },
    8: {
      clue: "“Okay everyone, we are going to launch a___.”",
      answer: "POLL",
      row: 8,
      col: 2,
    },
    10: {
      clue: "Raise Hand, Clap, Go Slower.",
      answer: "REACTIONS",
      row: 9,
      col: 8,
    },
    11: {
      clue:
        "A place for turning and talking with muted classmates and awkward silence.",
      answer: "BREAKOUT",
      row: 10,
      col: 1,
    },
    12: {
      clue: "A worse version of Zoom that every P.E.teacher uses.",
      answer: "MEET",
      row: 12,
      col: 3,
    },
    13: {
      clue:
        "You can see your teacher or your crush on full screen by doing this",
      answer: "PIN",
      row: 13,
      col: 7,
    },
    15: {
      clue:
        "“This meeting is being ___ed. By continuing to be in the meeting you are consenting to be _____ed.”",
      answer: "RECORD",
      row: 14,
      col: 1,
    },
    16: {
      clue: "If you accidentally press this button, embarrassment lies ahead",
      answer: "UNMUTE",
      row: 16,
      col: 7,
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
    width: 5.26px;
    height: 5.26px;
  }
  .direction {
    font-family: Circular Std;
    line-height: 1.4;
    font-weight: lighter;
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

function Crossword3() {
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
      <Header>Zooming!</Header>

      <p>
        <span className="contributor">By</span>
        <a
          href={window.location.origin + "/contributors/the-editorial-board"}
          className="contributor"
        >
          The Editorial Board
        </a>

        <span className="date">May 30, 2021</span>
      </p>

      <Commands>
        <Command onClick={reset}>Clear</Command>
        <Command onClick={fillAllAnswers}>Reveal</Command>
      </Commands>

      <CrosswordWrapper>
        <Crossword
          data={data}
          ref={crossword}
          onCorrect={onCorrect}
          onLoadedCorrect={onLoadedCorrect}
          onCrosswordCorrect={onCrosswordCorrect}
          onCellChange={onCellChange}
          theme={{
            gridBackground: "transparent",
            focusBackground: "#56a3ff",
            highlightBackground: "#abd1ff",
          }}
        />
      </CrosswordWrapper>
      <p className="issue">
        Check out{" "}
        <a href="https://issuu.com/stuyspectator/docs/issue16_color">
          Issue 16
        </a>{" "}
        where this crossword was featured! (pg 24)
      </p>
    </Page>
  );
}

export default Crossword3;
