/**
 * Creates a track format with song info, title, and artist to display.
 * @param array the track array to parse through
 * @returns
 */
export default function Track({ array }) {
  return array.map((song, index) => {
    return (
      <div className="song" key={"track" + index}>
        <div
          className="song-color"
          style={{ backgroundColor: song.imagecolor }}
        >
          <img src={song.image} alt={song.album} />
        </div>
        <div className="track-info">
          <div className="flex-track">
            <div className="bold-title">
              <h1
                className="left-info"
                style={{ fontSize: 2 - song.artist.length * 0.04 + "vh" }}
              >
                {song.artist.toUpperCase()}
              </h1>
              <h1 className="left-info-sub">{song.pantone.toUpperCase()}</h1>
            </div>
          </div>
          <h1 className="song-name">{song.trackname}</h1>
        </div>
      </div>
    );
  });
}
