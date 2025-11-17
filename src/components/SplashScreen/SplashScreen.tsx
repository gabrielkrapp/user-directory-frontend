import './SplashScreen.css';

interface SplashScreenProps {
  isVisible: boolean;
}

export function SplashScreen({ isVisible }: SplashScreenProps) {
  if (!isVisible) return null;

  return (
    <div className="splash-screen">
      <div className="splash-circle">
        <div className="splash-inner" />
      </div>
    </div>
  );
}

