import * as React from 'react';
import { Anchorme, LinkComponentProps } from 'react-anchorme';
import ReactPlayer from 'react-player';
import * as URI from 'urijs';

type InputProps = {
  content: string
};

/**
 * Twitch clips don't work inside interactible iframes, so we have to handroll one.
 * See https://github.com/CookPete/react-player/issues/607.
 *
 * @param url the clip URL; assumes it's a clips.twitch.tv URL.
 */
const getTwitchClipIframe = (url: string) => {
  let uri = new URI(url);
  if (!url.includes('embed?')) {
    const path = uri.path().substring(1);
    uri = new URI(`https://clips.twitch.tv/embed?clip=${path}`);
  }
  const host = window.location.hostname;
  uri.setQuery('parent', `${host}`);
  return (
    <>
      <br />
      <iframe
        src={uri.href()}
        height="360px"
        width="640px"
        frameBorder="0"
        allowFullScreen={true}
      />
      <br />
    </>
  )
}

/** A text field that does fancy things like linkifying, embedding media, etc. */
const FormattedTextBox: React.FunctionComponent<InputProps> = props => {
  const { content } = props;
  const PlayerWrapper = (props: LinkComponentProps) => {
    return (
      <span>
        <a href={props.href} target="_blank">{props.href}</a>
        {/^(https?:\/\/)?clips.twitch.tv/.test(props.href) ?
          getTwitchClipIframe(props.href)
          :
          ReactPlayer.canPlay(props.href) && <ReactPlayer url={props.href} controls={true} />
        }
      </span>
    );
  }
  return (
    // Anchorme linkifies everything it finds in the text, and we pass a custom component to render each link in case it's embeddable media.
    // TODO(thenuge): This doesn't handle newlines properly.
    <Anchorme linkComponent={PlayerWrapper}>{content}</Anchorme>
  );
}

export default FormattedTextBox;
