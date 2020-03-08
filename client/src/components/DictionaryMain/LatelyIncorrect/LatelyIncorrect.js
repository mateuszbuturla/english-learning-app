import React from "react";
import styled from 'styled-components';

const Container = styled.div`
    width: 90%;
    margin-top: 30px;
`;

const Word = styled.div`
    width: 100%;
    display: block;
    box-sizing: border-box;
    box-shadow: 0px 0px 5px 2px #bababa;
    padding: 20px;
    margin-top: 10px;
`;

const LatelyIncorrect = ({ words }) => {
    const incorrectWords = words.map((element, index) => <Word>{index + 1}. {element.en} - {element.pl}</Word>)
    return (
        <>
            <Container>
                {incorrectWords}
            </Container>
        </>
    )
}

export default LatelyIncorrect