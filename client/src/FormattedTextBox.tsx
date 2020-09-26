import Linkify from 'linkifyjs/react';
import * as React from 'react';

type InputProps = {
  content: string
};

/** A text field that does fancy things like linkifying, embedding media, etc. */
const FormattedTextBox: React.FunctionComponent<InputProps> = props => {
  const { content } = props;
  return (
    <Linkify options={{ nl2br: true }}>{content}</Linkify>
  );
}

export default FormattedTextBox;