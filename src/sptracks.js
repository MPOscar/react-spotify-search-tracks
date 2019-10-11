import spfetch from './spfetch';

const sptracks = async function (query){
  return new Promise((resolve, reject) => {
    let url = `https://api.spotify.com/v1/search?q=${query}&type=track`;    
    fetch(url, {
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${spfetch.getToken()}`
      }
    })
      .then(resp => resp.json())
      .then(data => {
        resolve (data.tracks ? data.tracks.items : [])
      });
  })
}

export default sptracks;