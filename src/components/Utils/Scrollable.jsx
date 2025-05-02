import { useState } from 'react';

const Scrollable = ({ children, name, bgColor }) => {
  const [scrollHeight, setScrollHeight] = useState(0);
  const handleScroll = (e) => {
    if (e.target.scrollTop > 200) {
      setScrollHeight(e.target.scrollTop);
    } else {
      setScrollHeight(0);
    }
  };

  return (
    <div className="scroll" onScroll={handleScroll}>
      {scrollHeight > 200 && (
        <h2
          style={{
            backgroundImage: bgColor,
          }}
          className="sticky_ani"
        >
          {name}
        </h2>
      )}
      {children}
    </div>
  );
};

export default Scrollable;
