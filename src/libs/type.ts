export type Task = {
    id: number;
    user_id: number;
    title: string;
    limit_time: string;
    parent_id: number;
    available_break: boolean;
    duration: number;
    expectation: number;
    urgency: number;
    firstexpect: number;
    progress: number;
    priority: number;
    skip_count: number;
    created_at: string;
    updated_at: string;
    color: string;
    icon: string;
}

export type Schedule = {
    id: number;
    user_id: number;
    type: string;
    start_time: string;
    end_time: string;
    duration: number;
    updated_at: string;
    created_at: string;
}

export type User = {
    id: number;
    uuid: string;
    name: string;
    gender: string;
    birthday: string;
    survey_file_name: string;
    task_completed_count: number;
    image_url: number;
    params1: number;
    params2: number;
    login_at: string;
    created_at: string;
}