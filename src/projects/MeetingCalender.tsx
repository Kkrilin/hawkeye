import { useState } from "react"
import { getMeetingDetailforStyling, getmeeting, getSlot, Meeting as TypeMeeting, getSlottedMeetings, columnWidths, oneUnit, Layout, getOVerlappingMeetings } from "../helper/meetingCalender"

const slots = getSlot(8, 21, 60)

export default function MeetingCalender() {
    const [meetings, setMeetings] = useState(() => getSlottedMeetings(getmeeting(8, 21)))
    const [layout, setLayout] = useState(Layout.Slotted)

    const handleLayloutChange = (layout: Layout) => {
        setLayout(layout)
        setMeetings(layout === Layout.Slotted ? getSlottedMeetings(meetings) : getOVerlappingMeetings(meetings))
    }

    function resetMeetings() {
        const randomMeetings = getmeeting(8, 21);
        setMeetings(
            layout === Layout.Overlapping
                ? getOVerlappingMeetings(randomMeetings)
                : getSlottedMeetings(randomMeetings)
        );
    }
    return (
        <div className="h-200">
            <div className="flex justify-center gap-3">
                <label >
                    <input
                        name="layout"
                        value={Layout.Overlapping}
                        onChange={() => handleLayloutChange(Layout.Overlapping)}
                        checked={layout === Layout.Overlapping}
                        type="radio"
                    />
                    Overlapping
                </label>
                <label >
                    <input
                        name="layout"
                        value={Layout.Slotted}
                        onChange={() => handleLayloutChange(Layout.Slotted)}
                        checked={layout === Layout.Slotted}
                        type="radio"
                    />
                    Slotted
                </label>
                <button onClick={resetMeetings}>Randomize</button>
            </div>
            <div className="flex gap-10 h-full">
                <div className="flex flex-col justify-between">
                    {slots.map(slot => (
                        <div>
                            <span>{slot}</span>
                        </div>
                    ))}
                </div>
                <div
                    style={{ marginTop: "0.5rem" }}
                    className="relative flex flex-col justify-between w-300">
                    {slots.map(() => (
                        <div className="border-b border-b-gray-300  h-0"></div>
                    ))}
                    {meetings.map((meeting => <Meeting meeting={meeting} layout={layout} />
                    ))}
                </div>
            </div>
        </div>
    )
}

interface MeetingProps {
    meeting: TypeMeeting
    layout: Layout
}

const Meeting = ({ meeting, layout }: MeetingProps) => {
    const { duration, startHour, startMin } = getMeetingDetailforStyling(meeting.start, meeting.end);
    const width = layout === Layout.Overlapping
        ? columnWidths.get(meeting.column)
        : 100 / (meeting.totalConflicts + 1);
    const height = duration * oneUnit;
    const top = ((startHour - 8) * 60 + startMin) * oneUnit;
    const left = (100 / (meeting.totalConflicts + 1)) * (meeting.column - 1);

    return (
        <div style={{
            width: `${width}%`,
            height: `${height}%`,
            backgroundColor: "blue",
            borderRadius: "5px",
            position: "absolute",
            left: `${left}%`,
            top: `${top}%`,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            opacity: "0.8",
            boxShadow: "0 2px 2px white",
            // border: "1px solid white"
        }}>
            <h1>{meeting.title}</h1>
            <div>
                <span>{meeting.start}</span>
                <span>-</span>
                <span>{meeting.end}</span>
            </div>
        </div>
    )
}