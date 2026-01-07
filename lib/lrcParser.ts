import { Subtitle } from "@/components/SubtitleDisplay";

export function parseLrc(lrcContent: string): Subtitle[] {
    const lines = lrcContent.split(/\r?\n/);
    const regex = /^\[(\d{2}):(\d{2})(?:\.(\d{2,3}))?\](.*)$/;
    const subtitles: Subtitle[] = [];

    let idCounter = 1;

    for (const line of lines) {
        const match = line.match(regex);
        if (match) {
            const minute = parseInt(match[1], 10);
            const second = parseInt(match[2], 10);
            const millisecond = match[3] ? parseInt(match[3].padEnd(3, '0'), 10) : 0;
            const text = match[4].trim();

            const startTime = minute * 60 + second + millisecond / 1000;

            subtitles.push({
                id: String(idCounter++),
                startTime,
                endTime: 0, // Will close when next line starts
                text
            });
        }
    }

    // Set endTime for each line based on the next line's startTime
    for (let i = 0; i < subtitles.length; i++) {
        if (i < subtitles.length - 1) {
            subtitles[i].endTime = subtitles[i + 1].startTime;
        } else {
            subtitles[i].endTime = subtitles[i].startTime + 5; // Default duration for last line
        }
    }

    return subtitles.filter(sub => sub.text.length > 0); // Optional: filter empty lines
}
