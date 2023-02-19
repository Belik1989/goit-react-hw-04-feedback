import { useState } from 'react';
import { FeedbackOptions } from './FeedbackOptions.';
import { Statistics } from './Statistics/Statistics';
import { ButtonSection } from './FeedbackOptions.styled';
import { Notification } from './Statistics/Notification';
import { Section } from './Section';
import { FeedbackBlock } from './Section.styled';

export function Feedback() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  // const leaveFeedback = option => {
  //   setState(prevState => ({
  //     [option]: prevState[option] + 1,
  //   }));

  const leaveFeedback = option => {
    switch (option) {
      case 'good':
        setGood(prevGood => prevGood + 1);
        break;
      case 'neutral':
        setNeutral(prevNeutral => prevNeutral + 1);
        break;
      case 'bad':
        setBad(prevBad => prevBad + 1);
        break;
      default:
        return;
    }
  };

  const countTotalFeedback = () => {
    return good + bad + neutral;
  };
  const countPositiveFeedbackPercentage = () => {
    return Math.round((100 * good) / countTotalFeedback());
  };
  return (
    <FeedbackBlock>
      <Section title="Please leave feedback">
        <ButtonSection>
          <FeedbackOptions
            options={{ good, neutral, bad }}
            onLeaveFeedback={leaveFeedback}
          />
        </ButtonSection>
      </Section>
      <Section title="Statistics">
        {countTotalFeedback() === 0 ? (
          <Notification message={'No statistics'} />
        ) : (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        )}
      </Section>
    </FeedbackBlock>
  );
}
