import duration from 'dayjs/plugin/duration';
import dayjs from 'dayjs';

dayjs.extend(duration);
function getDurationStr(seconds: number) {
  return dayjs.duration(seconds, 'seconds').asDays().toFixed(0) + ' days';
}
export { getDurationStr };
