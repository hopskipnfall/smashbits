import * as React from 'react';
import ReactPlayer from 'react-player';
import * as URI from 'urijs';

type InputProps = {
  contentUri: URI;
};

/**
 * Twitch clips don't work inside interactible iframes, so we have to handroll one.
 * See https://github.com/CookPete/react-player/issues/607.
 *
 * @param url the clip URL; assumes it's a clips.twitch.tv URL.
 */
const getTwitchClipIframe = (uri: URI) => {
  if (!uri.href().includes('embed?')) {
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
  );
};

/** A container to display embedded media. */
const EmbeddedMediaContainer: React.FunctionComponent<InputProps> = (props) => {
  const { contentUri } = props;
  return (
    <span>
      {/^(https?:\/\/)?clips.twitch.tv/.test(contentUri.href())
        ? getTwitchClipIframe(contentUri)
        : ReactPlayer.canPlay(contentUri.href()) && (
            <ReactPlayer url={contentUri.href()} controls={true} />
          )}
      <a href={contentUri.href()} target="_blank">
        {contentUri.href()}
      </a>
    </span>
  );
};

export default EmbeddedMediaContainer;
