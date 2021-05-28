import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';

dayjs.extend(duration);
dayjs.extend(relativeTime);
function getDurationStr(seconds: number, humanize: boolean = false) {
  if (humanize) {
    return dayjs.duration(seconds).humanize();
  }
  return dayjs.duration(seconds, 'seconds').asDays().toFixed(0) + ' days';
}
export { getDurationStr };
