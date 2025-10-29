//  This hook will allow to play random sound when we press key

const keyStrokeSounds = [
  new Audio("/sounds/keystroke1.mp3"),
  new Audio("/sounds/keystroke2.mp3"),
  new Audio("/sounds/keystroke3.mp3"),
  new Audio("/sounds/keystroke4.mp3"),
];

const useKeyboardSound = () => {
  const playRandomKeyStrokeSound = () => {
    // Play random sound
    const randomSound = keyStrokeSounds[Math.floor(Math.random() * keyStrokeSounds.length)];
    // Optimisation for better user experience
    randomSound.currentTime = 0;
    randomSound.play().catch((err) => console.log("Audio play failed", err));
  };
  // return function out of the hook
  return { playRandomKeyStrokeSound };
};

export default useKeyboardSound;
