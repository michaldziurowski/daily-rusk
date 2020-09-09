import React from 'react';

import './ComicFeedItem.css';

class ComicFeedItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showOverlay: false,
    };

    this.toggleOverlay = this.toggleOverlay.bind(this);
  }

  toggleOverlay() {
    this.setState({ showOverlay: !this.state.showOverlay });
  }

  render() {
    return (
      // eslint-disable-next-line
      <div
        className={!this.state.showOverlay ? 'comic' : 'comic-overlay'}
        onClick={this.toggleOverlay}
      >
        <img src={this.props.comicUrl} alt="" />
      </div>
    );
  }
}

ComicFeedItem.displayName = 'ComicFeedItem';

export default ComicFeedItem;
