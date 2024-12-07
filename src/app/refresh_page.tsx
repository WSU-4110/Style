import { useEffect } from 'react';

const AutoRefreshPage = () => {
  useEffect(() => {
    const hasRefreshed = sessionStorage.getItem('hasRefreshed');
    if (!hasRefreshed) {
      sessionStorage.setItem('hasRefreshed', 'true');
      setTimeout(() => {
        window.location.reload();
      }, 0);
    }
  }, []);

  return null;
};

export default AutoRefreshPage;
