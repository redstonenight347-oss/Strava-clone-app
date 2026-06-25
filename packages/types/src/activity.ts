
export type ActivityType = {
    activityId: number;
    userId: number | null;
    type: string;
    title: string | null;
    description: string | null;
    distance: number;
    duration: number;
    createdAt: Date | null;
}