
export const formatUtil = {
    formatTime: (isoString: Date, useUTC: boolean = false): string => {

        const date = new Date(isoString);

        let hours = useUTC ? date.getUTCHours() : date.getHours();
        const minutes = useUTC ? date.getUTCMinutes() : date.getMinutes();

        const ampm = hours >= 12 ? "PM" : "AM";

        hours = hours % 12;
        hours = hours === 0 ? 12 : hours;

        const pad = (num: number) => String(num).padStart(2, "0");

        return `${hours}:${pad(minutes)} ${ampm}`;
    }
}


// function formatTime(isoString: string, useUTC: boolean = false): string {
//     const date = new Date(isoString);
//
//     const hours = useUTC ? date.getUTCHours() : date.getHours();
//     const minutes = useUTC ? date.getUTCMinutes() : date.getMinutes();
//     const seconds = useUTC ? date.getUTCSeconds() : date.getSeconds();
//
//     // Pad with leading zeros if needed
//     const pad = (num: number) => String(num).padStart(2, "0");
//
//     return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
// }