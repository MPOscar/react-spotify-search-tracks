import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
//
import spfetch from './spfetch';


function App() {

  const [tracks, setTracks] = useState([]);
  const [query, setQuery] = useState('Popular');
  let state = { isLoggedIn: spfetch.isLoggedIn() };

  let handleLoginClick = async () => {
    state = {
      isLoggedIn: await spfetch.login()
    };
    window.location.reload();
  };

  useEffect(() => {
    fetchTracks();
  }, []);

  function fetchTracks() {
    let url = `https://api.spotify.com/v1/search?q=${query}&type=track`;

    fetch(url, {
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${spfetch.getToken()}`
      }
    })
      .then(resp => resp.json())
      .then(data => {
        data.tracks ? setTracks(data.tracks.items) : setTracks([])
      });
  }

  function handleSubmit(e) {
    window.scrollTo(0, 0);
    e.preventDefault();
    fetchTracks();
  }

  return state.isLoggedIn ? (
    <div className="App">

      <header className="App-header">

        <div className="flex pb-5 search-form">

          <img src={logo} className="App-logo" alt="logo" width="50" />

          <form className="w-full max-w-sm" onSubmit={handleSubmit}>

            <div className="flex items-center border-b border-b-2 border-teal-500 py-2">

              <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Search your song"
                onChange={e => setQuery(e.target.value)}
              />

              <button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" >
                Search
              </button>

            </div>

          </form>

        </div>


        <div className="flex flex-wrap justify-evenly px-5 py-24">

          {tracks && tracks.map((track, index) => (

            <div key={index}>

              <div className="max-w-sm rounded overflow-hidden shadow-lg mb-4">

                <img className="w-full" src={track.album.images && track.album.images[0].url} alt={track.name} alt={track.name} />

                <div className="px-6 py-4">

                  <div className="font-bold text-xl mb-2">{track.name}</div>

                  <div className="flex flex-wrap justify-evenly">

                    {track.artists.map((artist, index) => (

                      <div key={index}>

                        <div className="font-bold text-xs mb-2">
                          {artist.name}
                        </div>

                      </div>

                    ))}

                  </div>

                  <p className="text-gray-700 text-base">
                    Release Date: {track.album.release_date}
                  </p>

                </div>

                <div className="px-6 py-4">

                  <a href={track.preview_url} target="_blank">

                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#Preview</span>

                  </a>

                </div>

              </div>

            </div>

          ))}

          {tracks.length === 0 ? <div>There are no results</div> : ''}

        </div>

      </header>

    </div>
  ) : (
      <div className="App">

        <header className="App-header">

          <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            onClick={handleLoginClick}>
            Login
          </button>

        </header>

      </div>
    );
}

export default App;
