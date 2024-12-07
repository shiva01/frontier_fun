import axios from 'axios';

function playBeep(duration : number, volume : number) {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

  // Create an oscillator node to generate a tone
  const oscillator = audioContext.createOscillator();
  oscillator.type = 'sine'; // Choose the waveform (sine wave for a pure tone)
  oscillator.frequency.setValueAtTime(1000, audioContext.currentTime); // Frequency in Hz (1000 Hz for a standard beep)
  
  // Create a gain node to control volume
  const gainNode = audioContext.createGain();
  gainNode.gain.setValueAtTime(volume, audioContext.currentTime); 

  // Connect the oscillator to the gain node, and the gain node to the destination (speakers)
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  // Start and stop the oscillator to produce a beep
  oscillator.start();
  oscillator.stop(audioContext.currentTime + duration); // Beep duration in seconds (0.2 seconds here)
}

async function monitor(url : string) {
  let count = 0;
  setInterval(async () => {
    count ++;
    console.log(count);
    try {
      const response = await axios.get(url);
      let numberOfActive = 0;
      response.data.forEach((project: any) => {
        const isActive = project.active;
        const projectName = project.data.name;
        console.log(projectName);
        if (isActive) {
          numberOfActive ++;
        }
      });
      if (numberOfActive == 10) {
        playBeep(0.2, 0.05);
      } else
      {
        playBeep(1, 2);
      }
      
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  }, 15000);
}

export default monitor;