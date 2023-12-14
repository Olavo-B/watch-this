import React, { useState, useEffect } from 'react';

const LoadingBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Atualiza o progresso a cada 500 milissegundos (ou ajuste conforme necessário)
      setProgress(prevProgress => (prevProgress >= 100 ? 0 : prevProgress + 20));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2
      style={{
        color: '#FFFF',
        textAlign: 'center',
        marginTop: '20px',
        marginBottom: '20px',
        fontSize: '20px',
      }}
      >Loding...</h2>
      <div
        style={{
          width: `${progress}%`,
          height: '20px',
          backgroundColor: '#FFFF',
          borderRadius: '4px',
          transition: 'width 0.5s',
        }}
      />
    </div>
  );
};

export default LoadingBar;
