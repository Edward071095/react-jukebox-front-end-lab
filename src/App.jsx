import { useState, useEffect } from 'react';
import * as trackService from './services/trackService';
import TrackList from './components/TrackList/TrackList';
import TrackDetail from './components/TrackDetail/TrackDetail';
import TrackForm from './components/TrackForm/TrackForm';


const App = () => {
  const [tracks, setTracks] = useState([]);
  const [selected, setSelected] = useState(null)
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const fetchTracks = async () => {
        try {
          const fetchedTracks = await trackService.index();

          if (fetchTracks.err) {
            throw new Error(fetchedTracks.err);
          }

          setTracks(fetchedTracks);
        } catch (error) {
          console.log(err);
        }
    };
    fetchTracks();
  }, []);

  const handleSelect = (track) => {
    setSelected(track)
    setIsFormOpen(false);
  };

  const handleFormView = (track) => {
    if (!track._id) setSelected(null);
    setIsFormOpen(!isFormOpen);
  };

  const handleAddTrack = async (formData) => {
    try {
      const newTrack = await trackService.create(formData);

      if (newTrack.err) {
        throw new Error(newTrack.err);
      }

      setTracks([newTrack, ...tracks]);
      setIsFormOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateTrack = async (formData, trackId) => {
    try {
      const updatedTrack = await trackService.update(formData, trackId);

      if (updatedTrack.err) {
        throw new Error(updatedTrack.err);
      }
      const updatedTrackList = tracks.map((track) => (
        track._id !== updatedTrack._id ? track : updatedTrack
      ));

      setTracks(updatedTrackList);
      setSelected(updatedTrack)
      setIsFormOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteTrack = async (trackId) => {
    try {
      const deleteTrack = await trackService.deleteTrack(trackId);

      if (deleteTrack.err) {
        throw new Error(deletedTrack.err);
      }

      setTracks(tracks.filter((track) => track._id != deleteTrack._id));
      setSelected(null);
      setIsFormOpen(false);
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <>
     <TrackList 
      tracks={tracks} 
      handleSelect={handleSelect}
      handleFormView={handleFormView}
      isFormOpen={isFormOpen}
     /> 
      {isFormOpen ? ( 
       <TrackForm 
          handleAddTrack={handleAddTrack} 
          selected={selected}
          handleUpdateTrack={handleUpdateTrack}
          />
     ) : (
      <TrackDetail 
        selected={selected} 
        handleFormView={handleFormView} 
        handleDeleteTrack={handleDeleteTrack}
        />  
     )}
    </>
  );
};



export default App;
