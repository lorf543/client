import state from '../store';
import { useSnapshot } from 'valtio';

const CustomButton = ({ type, title, handleClick, customStyle }) => {
  const snap = useSnapshot(state);

  const generateStyle = (type) => {
    switch (type) {
      case 'filled':
        return {
          backgroundColor: snap.color,
          color: '#fff',
        };
      case 'outlined':
        return {
          border: `2px solid ${snap.color}`,
          backgroundColor: 'transparent',
          color: snap.color,
        };
      case 'text':
        return {
          backgroundColor: 'transparent',
          color: snap.color,
        };
      default:
        return {};
    }
  };

  return (
    <button
      className={`px-2 py-1.5 flex-1 cursor-pointer rounded-md ${customStyle}`}
      style={generateStyle(type)}
      onClick={handleClick}
      aria-label={title}
    >
      {title}
    </button>
  );
};

export default CustomButton;
