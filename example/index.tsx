import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  ChakraProvider,
  Box,
  Heading,
  Grid,
  theme,
  Button,
} from '@chakra-ui/react';

import Source from './components/Source';
import Details from './components/Details';
import Controls from './components/Controls';

import useRoover from '../src/hooks/useRoover/useRoover';

const src1: string =
  'https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp3';
const src2: string =
  'https://untitled-audio-bucket-test.s3.amazonaws.com/72d958df474d1a11415dcea5f473d0e85818c1fe.wav';

const App = () => {
  const [track, setTrack] = React.useState<string>(src1);
  const {
    initial,
    loading,
    ready,
    idle,
    playing,
    paused,
    end,
    volume,
    rate,
    duration,
    mute,
    loop,
    error,
    getCurrentTime,
    toggle,
    play,
    pause,
    setVolume,
    setRate,
    toggleMute,
    toggleLoop,
    seekTo,
    skipForward,
    skipBackward,
  } = useRoover({
    src: track,
    autoplay: true,
  });
  const seekRef = React.useRef<number | null>(null);
  const [seek, setSeek] = React.useState<number>(0);
  React.useEffect(() => {
    const animate = () => {
      const seek = getCurrentTime();
      setSeek(seek as number);
      seekRef.current = requestAnimationFrame(animate);
    };
    if (playing) {
      seekRef.current = requestAnimationFrame(animate);
    }
    return () => {
      if (seekRef.current) {
        cancelAnimationFrame(seekRef.current);
      }
    };
  }, [playing]);
  return (
    <ChakraProvider theme={theme}>
      <Box
        w="100%"
        h="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Grid
          templateRows="repeat(6, max-content)"
          templateColumns="repeat(2, 1fr)"
          gap={5}
          alignItems="center"
          justifyContent="center"
        >
          <Heading as="h1" letterSpacing="-0.03em">
            Roover
          </Heading>

          <Grid
            width="auto"
            height="fit-content"
            templateColumns="repeat(8, 1fr)"
            gridRow="2 / 3"
            gridColumn="1 / 3"
            gap={3}
            alignItems="center"
            justifyContent="center"
          >
            <Heading as="h2" fontSize="18px" letterSpacing="-0.03em">
              Source:
            </Heading>
            <Button type="button" onClick={() => setTrack(src1)}>
              Track One
            </Button>
            <Button type="button" onClick={() => setTrack(src2)}>
              Track Two
            </Button>
          </Grid>
          <Source
            gridRow="3 / 3"
            initial={initial}
            loading={loading}
            ready={ready}
            idle={idle}
            playing={playing}
            paused={paused}
            onPlay={play}
            onPause={pause}
            onToggle={toggle}
            onForward={skipForward}
            onBackward={skipBackward}
          />

          <Controls
            seek={seek}
            volume={volume}
            rate={rate}
            duration={duration}
            mute={mute}
            loop={loop}
            onVolume={setVolume}
            onRate={setRate}
            onMute={toggleMute}
            onLoop={toggleLoop}
            onSeek={seekTo}
          />

          <Details
            seek={seek}
            initial={initial}
            loading={loading}
            ready={ready}
            idle={idle}
            playing={playing}
            paused={paused}
            end={end}
            volume={volume}
            rate={rate}
            duration={duration}
            mute={mute}
            loop={loop}
            error={error}
          />
        </Grid>
      </Box>
    </ChakraProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
