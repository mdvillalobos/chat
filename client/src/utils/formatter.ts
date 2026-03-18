
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
    },

    getTimeDifference: (isoString: Date): string => {
        const date = new Date(isoString).getTime();
        const now = Date.now();

        const diffSeconds = Math.floor((now - date) / 1000);

        if (diffSeconds < 60) return "now";

        const diffMinutes = Math.floor(diffSeconds / 60);
        if (diffMinutes < 60) return `${diffMinutes} min${diffMinutes > 1 ? "s" : ""}`;

        const diffHours = Math.floor(diffMinutes / 60);
        if (diffHours < 24) return formatUtil.formatTime(isoString);

        const diffDays = Math.floor(diffHours / 24);
        if (diffDays === 1) return "Yesterday";

        return new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        });
    },
}