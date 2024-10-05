export interface LessonSchedule {
    dayOfWeek: string;
    hour: number;
}

export enum UserType {
    Assistant,
    User,
}

export interface Transcript {
    user: UserType;
    text: string;
    created: Date;
}

export interface Lesson {
    phone: string;
}

export interface Calls {
    callId: string;
    price: number;
    errorMessage?: string;
    lessonSchedule: LessonSchedule;
    transcripts: Transcript[];
    isTranscription: boolean;
    lesson: Lesson;
}