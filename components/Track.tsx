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
              <h1 className="left-info">{song.artist.toUpperCase()}</h1>
              <h1 className="left-info-sub">{song.pantone.toUpperCase()}</h1>
            </div>
          </div>
          <h1 className="song-name">{song.trackname}</h1>
        </div>
      </div>
    );
  });
}
