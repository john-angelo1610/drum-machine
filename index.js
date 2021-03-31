const audioClips = [
    {
        keyCode: 81,
        keyTrigger: 'Q',
        id: 'Heater-1',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
    },
    {
        keyCode: 87,
        keyTrigger: 'W',
        id: 'Heater-2',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
    },
    {
        keyCode: 69,
        keyTrigger: 'E',
        id: 'Heater-3',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
    },
    {
        keyCode: 65,
        keyTrigger: 'A',
        id: 'Heater-4',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
    },
    {
        keyCode: 83,
        keyTrigger: 'S',
        id: 'Clap',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
    },
    {
        keyCode: 68,
        keyTrigger: 'D',
        id: 'Open-HH',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
    },
    {
        keyCode: 90,
        keyTrigger: 'Z',
        id: "Kick-n'-Hat",
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
    },
    {
        keyCode: 88,
        keyTrigger: 'X',
        id: 'Kick',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
    },
    {
        keyCode: 67,
        keyTrigger: 'C',
        id: 'Closed-HH',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
    }
];

function App() {
    const [volume, setVolume] = React.useState(0.5);

    return (
        <div className="text-center row align-items-center no-gutters bg-dark p-3 flex-wrap-reverse container">
            <div className="col-lg-6 mt-3 mt-lg-0">
                {audioClips.map(clip => <Pad key={clip.id} clip={clip} volume={volume} />)}
            </div>
            <div className="col-lg-6">
                <h1>Drum Machine</h1>
                <h3 className="lead mt-3">Volume</h3>
                <input onChange={e => setVolume(e.target.value)} type="range" step="0.01" value={volume} max="1" min="0" className="w-50 mb-3" />
                <div>
                    Created by <a href="https://www.freecodecamp.org/john_angelo" target="_blank" rel="noopener noreferrer">John Angelo</a>
                </div>
            </div>
        </div>
    );
}

function Pad({clip, volume}) {
    const [active, setActive] = React.useState(false);

    React.useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        }
    }, []);

    const handleKeyPress = e => {
        if (e.keyCode === clip.keyCode) {
            playSound();
        }
    }

    const playSound = () => {
        const audioTag = document.querySelector(`#${clip.keyTrigger}`);
        setActive(true);
        setTimeout(() => setActive(false), 200);
        audioTag.volume = volume;
        audioTag.currentTime = 0;
        audioTag.play();
        setRecording(prev => prev + clip.keyTrigger + " ");
    };

    return (
        <button type="button" onClick={playSound} className={`drum-pad col-3 btn m-1 p-3 m-md-3 ${active && 'btn-primary'}`}>
            <audio className="clip" id={clip.keyTrigger} src={clip.url} />
            {clip.keyTrigger}
        </button>
    );
}

ReactDOM.render(<App />, document.querySelector("#drum-machine"));