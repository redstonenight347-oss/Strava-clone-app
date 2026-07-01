
export type ActivityType = {
    activityId: number;
    userId: string | null;
    type: string;
    title: string | null;
    description: string | null;
    distance: number;
    duration: number;
    elevation: number | null;
    date: string;
    time: string;
    createdAt: Date | null;
}