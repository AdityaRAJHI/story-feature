import React, { useState, useEffect, useRef } from 'react';
    import { useSwipeable } from 'react-swipeable';

    function App() {
      const [stories, setStories] = useState([]);
      const [currentStoryIndex, setCurrentStoryIndex] = useState(-1);
      const [progress, setProgress] = useState(0);
      const progressRef = useRef(null);
      const [isPaused, setIsPaused] = useState(false);

      useEffect(() => {
        const storedStories = localStorage.getItem('stories');
        if (storedStories) {
          setStories(JSON.parse(storedStories));
        }
      }, []);

      useEffect(() => {
        localStorage.setItem('stories', JSON.stringify(stories));
      }, [stories]);

      useEffect(() => {
        if (currentStoryIndex === -1) {
          setProgress(0);
          return;
        }

        let timer;
        if (!isPaused) {
          timer = setInterval(() => {
            setProgress((prevProgress) => {
              const newProgress = prevProgress + 1;
              if (newProgress >= 100) {
                clearInterval(timer);
                handleNextStory();
                return 0;
              }
              return newProgress;
            });
          }, 30);
        }

        return () => clearInterval(timer);
      }, [currentStoryIndex, isPaused]);

      const handleAddStory = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.classList.add('hidden-input');
        input.onchange = async (e) => {
          const file = e.target.files[0];
          if (file) {
            const base64 = await convertToBase64(file);
            const newStory = {
              id: Date.now(),
              image: base64,
              timestamp: Date.now(),
            };
            setStories((prevStories) => [...prevStories, newStory]);
          }
        };
        document.body.appendChild(input);
        input.click();
        document.body.removeChild(input);
      };

      const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
          reader.readAsDataURL(file);
        });
      };

      const handleStoryClick = (index) => {
        setCurrentStoryIndex(index);
        setProgress(0);
      };

      const handleCloseStory = () => {
        setCurrentStoryIndex(-1);
        setProgress(0);
      };

      const handleNextStory = () => {
        if (currentStoryIndex < stories.length - 1) {
          setCurrentStoryIndex(currentStoryIndex + 1);
          setProgress(0);
        } else {
          handleCloseStory();
        }
      };

      const handlePrevStory = () => {
        if (currentStoryIndex > 0) {
          setCurrentStoryIndex(currentStoryIndex - 1);
          setProgress(0);
        } else {
          handleCloseStory();
        }
      };

      const handlePause = () => {
        setIsPaused(true);
      };

      const handleResume = () => {
        setIsPaused(false);
      };

      const swipeHandlers = useSwipeable({
        onSwipedLeft: handleNextStory,
        onSwipedRight: handlePrevStory,
        preventDefaultTouchmoveEvent: true,
        trackMouse: true,
      });

      useEffect(() => {
        const now = Date.now();
        const updatedStories = stories.filter(
          (story) => now - story.timestamp < 24 * 60 * 60 * 1000
        );
        if (updatedStories.length !== stories.length) {
          setStories(updatedStories);
        }
      }, [stories]);

      return (
        <div>
          <div className="story-container">
            <div className="add-story" onClick={handleAddStory}>
              +
            </div>
            {stories.map((story, index) => (
              <div
                key={story.id}
                className="story-item"
                onClick={() => handleStoryClick(index)}
              >
                <img src={story.image} alt="story" />
              </div>
            ))}
          </div>

          {currentStoryIndex !== -1 && (
            <div className="story-viewer">
              <div className="progress-bar-container">
                {stories.map((_, index) => (
                  <div
                    key={index}
                    className="progress-bar"
                  >
                    <div
                      className="progress-bar-fill"
                      style={{
                        width:
                          currentStoryIndex === index
                            ? `${progress}%`
                            : currentStoryIndex > index
                            ? '100%'
                            : '0%',
                      }}
                    ></div>
                  </div>
                ))}
              </div>
              <img src={stories[currentStoryIndex].image} alt="story" />
              <div
                className="story-viewer-controls"
                {...swipeHandlers}
                onMouseDown={handlePause}
                onMouseUp={handleResume}
                onMouseLeave={handleResume}
              >
                <div onClick={handlePrevStory}></div>
                <div onClick={handleNextStory}></div>
              </div>
            </div>
          )}
        </div>
      );
    }

    export default App;
