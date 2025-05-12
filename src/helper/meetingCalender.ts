export interface Meeting {
  id: number;
  title: string;
  start: string;
  end: string;
  column: number;
  totalConflicts: number;
  modified?: boolean;
}

export const hrOffset = 8;

export const oneUnit = 100 / (12 * 60);
export const columnWidths = new Map<number, number>([
  [1, 100],
  [2, 80],
  [3, 60],
  [4, 40],
  [5, 20],
]);
export function getSlot(
  startTime: number,
  endtime: number,
  timeDifference: number
): string[] {
  const timeSlots = [];
  const tempDate = new Date(0, 0, 0, startTime, 0, 0, 0);
  const endTime = new Date(0, 0, 0, endtime, 0, 0, 0);
  while (tempDate < endTime) {
    const time = formatTime(tempDate);
    timeSlots.push(time);
    tempDate.setMinutes(tempDate.getMinutes() + timeDifference);
  }
  return timeSlots;
}

export const formatTime = (date: Date, format: number = 12) => {
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: format === 12,
  });
};

const MIN_MEETINGS = window.innerWidth < 768 ? 3 : 5;

export function getmeeting(startTime: number, endtime: number) {
  const meetings: Meeting[] = [];
  const numMeeting = Math.floor(Math.random() * MIN_MEETINGS) + MIN_MEETINGS;
  for (let i = 0; i < numMeeting; i++) {
    const startHour = Math.floor(Math.random() * 12) + startTime;
    const startMin = Math.floor(Math.random() * 12) * 5;
    const endHour =
      startHour + Math.floor(Math.random() * (endtime - 1 - startHour));
    let endMin;
    if (startHour === endHour) {
      endMin = startMin + Math.floor((Math.random() * (60 - startMin)) / 5) * 5;
    } else {
      endMin = Math.floor(Math.random() * 12) * 5;
    }
    const start = formatTime(new Date(0, 0, 0, startHour, startMin, 0, 0), 24);
    const end = formatTime(new Date(0, 0, 0, endHour, endMin, 0, 0), 24);

    const { duration } = getMeetingDetailforStyling(start, end);
    if (duration < 15) {
      i--;
      continue;
    }
    meetings.push({
      id: i + 1,
      title: `Meeting ${i + 1}`,
      start,
      end,
    } as Meeting);
  }
  return meetings;
}

export function sortMeetings(meetings: Meeting[]) {
  meetings.sort((m1, m2) => {
    const [m1StartHr, m1StartMin] = m1.start.split(":").map((x) => parseInt(x));
    const [m1EndHr, m1EndMin] = m1.end.split(":").map((x) => parseInt(x));
    const [m2StartHr, m2StartMin] = m2.start.split(":").map((x) => parseInt(x));
    const [m2EndHr, m2EndMin] = m2.end.split(":").map((x) => parseInt(x));

    const m1Duration = (m1EndHr - m1StartHr) * 60 + (m1EndMin - m1StartMin);
    const m2Duration = (m2EndHr - m2StartHr) * 60 + (m2EndMin - m2StartMin);

    // earliest start time first
    if (m1StartHr < m2StartHr) {
      return -1;
    } else if (m1StartHr > m2StartHr) {
      return 1;
    }

    // earliest start minute first
    if (m1StartMin < m2StartMin) {
      return -1;
    } else if (m1StartMin > m2StartMin) {
      return 1;
    }

    // longest duration first
    if (m1Duration > m2Duration) {
      return -1;
    } else if (m1Duration < m2Duration) {
      return 1;
    }

    return 0;
  });

  return meetings;
}

export function sortMeetingsByColumn(meetings: Meeting[]) {
  meetings.sort((m1, m2) => {
    if (m1.column && m2.column) {
      return m1.column - m2.column;
    }

    return 0;
  });

  return meetings;
}
export function getNextNonOverlappingMeeting(
  meetings: Meeting[],
  currentMeeting: Meeting | null
) {
  if (!currentMeeting) {
    return meetings.find((m) => !m.column) ?? null;
  }

  const currentMeetingIdx = meetings.findIndex(
    (m) => m.id === currentMeeting.id
  );

  for (let i = currentMeetingIdx + 1; i < meetings.length; i++) {
    const nextMeeting = meetings[i];
    if (!nextMeeting.column && !checkOverlap(currentMeeting, nextMeeting)) {
      return nextMeeting;
    }
  }

  return null;
}
export function checkOverlap(m1: Meeting, m2: Meeting): boolean {
  const toMinutes = (time: string): number => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const m1Start = toMinutes(m1.start);
  const m1End = toMinutes(m1.end);
  const m2Start = toMinutes(m2.start);
  const m2End = toMinutes(m2.end);

  return m1Start < m2End && m1End > m2Start;
}

export const getMeetingDetailforStyling = (start: string, end: string) => {
  const startHour = start.split(":")[0];
  const startMin = start.split(":")[1];

  const endHour = end.split(":")[0];
  const endMin = end.split(":")[1];

  return {
    duration:
      parseInt(endHour) * 60 +
      parseInt(endMin) -
      (parseInt(startHour) * 60 + parseInt(startMin)),
    startHour: parseInt(startHour),
    startMin: parseInt(startMin),
    endHour: parseInt(endHour),
    endMin: parseInt(endMin),
  };
};

export function getSlottedMeetings(meetings: Meeting[]) {
  meetings.forEach((m) => (m.column = 0));
  const sortedMeetings = sortMeetings(meetings);

  let columnIdx = 1;
  while (sortedMeetings.some((m) => !m.column)) {
    placeMeetingsByColumn(meetings, columnIdx++);
  }

  return meetings;
}

function placeMeetingsByColumn(meetings: Meeting[], column: number) {
  let meeting: Meeting | null = getNextNonOverlappingMeeting(meetings, null);

  // allow only one modification to in one pass
  meetings.forEach((m) => (m.modified = false));
  while (meeting) {
    meeting.column = column;
    setConflicts(meetings, meeting);
    meeting = getNextNonOverlappingMeeting(meetings, meeting);
  }
}

function setConflicts(meetings: Meeting[], meeting: Meeting) {
  const meetingConflicts: boolean[] = [];
  const directlyImpactedMeetings = getImpactedMeetings(meetings, meeting);
  const allImpactedMeetings = getAllImpactedMeetings(meetings, meeting).concat(
    directlyImpactedMeetings
  );

  directlyImpactedMeetings.forEach((m) => {
    meetingConflicts[m.column] = true;
  });

  allImpactedMeetings.forEach((m) => {
    if (!m.modified) {
      m.totalConflicts = (m.totalConflicts ?? 0) + 1;
      m.modified = true;
    }
  });

  meeting.totalConflicts = meetingConflicts.filter(Boolean).length;
}

function getImpactedMeetings(meetings: Meeting[], meeting: Meeting) {
  return meetings.filter(
    (m) => m.column && m.column !== meeting.column && checkOverlap(meeting, m)
  );
}

function getAllImpactedMeetings(meetings: Meeting[], meeting: Meeting) {
  let set = new Set<Meeting>();
  const impactedMeetings = getPreviousColumnImpactedMeetings(meetings, meeting);
  impactedMeetings.forEach((m) => {
    set.add(m);
    set = new Set([...set, ...getAllImpactedMeetings(meetings, m)]);
  });

  return Array.from(set);
}

function getPreviousColumnImpactedMeetings(
  meetings: Meeting[],
  meeting: Meeting
) {
  return meetings.filter(
    (m) => m.column === meeting.column - 1 && checkOverlap(meeting, m)
  );
}
