import { useEffect, useState } from 'react';

export default function MiamiTime() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const fmt = () => {
      const opts: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'America/New_York',
      };
      setTime(new Intl.DateTimeFormat('en-US', opts).format(new Date()));
    };
    fmt();
    const id = setInterval(fmt, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="live-chip tabular hidden md:inline-flex">
      <span className="blip" />
      MIA · {time}
    </span>
  );
}
