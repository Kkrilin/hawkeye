import { useState } from "react"
import { getMeetingDetailforStyling, getmeeting, getSlot, Meeting as TypeMeeting, getSlottedMeetings, columnWidths, oneUnit } from "../helper/meetingCalender"

const slots = getSlot(8, 21, 60)

export default function MeetingCalender() {
    const [meetings, setMeetings] = useState(() => getSlottedMeetings(getmeeting(8, 21)))
    return (
        <div className="h-200">
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
                    className="relative flex flex-col justify-between ">
                    {slots.map(() => (
                        <div className="border-b border-b-gray-300 w-300 h-0"></div>
                    ))}
                    {meetings.map((meeting => <Meeting meeting={meeting} />
                    ))}
                </div>
            </div>
        </div>
    )
}

interface MeetingProps {
    meeting: TypeMeeting
}

const Meeting = ({ meeting }: MeetingProps) => {
    const { duration, startHour, startMin, endHour, endMin } = getMeetingDetailforStyling(meeting.start, meeting.end);
    const width = columnWidths.get(meeting.column)
    const height = duration * oneUnit;
    const top = ((startHour - 8) * 60 + startMin) * oneUnit;
    const left = (100 / (meeting.totalConflicts + 1)) * (meeting.column - 1);
    console.log('duration', duration)
    console.log('startHour', startHour)
    console.log('startMin', startMin)
    console.log('endHour', endHour)
    console.log('endMin', endMin)
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
            opacity: "0.8"
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