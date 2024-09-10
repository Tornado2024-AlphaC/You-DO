import { NextResponse } from "next/server";
import spabase from "@/libs/spabase";

type Request = {
    uuid: string;
    name: string;
    gender: string;
    birthday: string;
}

export async function POST(req:any) {
    if (!req.body) {
        return NextResponse.json({
            status: 400,
            message: "Bad Request",
        },{ status: 400 });
    }
    const body = await req.json();

    //いずれかのパラメータが不正な場合はエラー（簡易的なもの）
    if (!body.uuid || !body.name || !body.gender || !body.birthday) {
        return NextResponse.json({
            status: 400,
            message: "Bad Request",
        },{ status: 400 });
    }

    //survey_file_nameとimage_urlは仮の値を入れる
    const insertObj = {
        uuid: body.uuid,
        name: body.name,
        gender: body.gender,
        birthday: body.birthday,
        survey_file_name: "",
        task_completed_count: 0,
        image_url: "https://picsum.photos/200",
        params1: 0,
        params2: 0,
    };

    try {
        //TODO: すでに登録されているuuidがあるか確認
        if(await isConflict(body.uuid)) {
            return NextResponse.json({
                status: 409,
                message: "This uuid is already registered",
            },{ status: 409 });
        }
        const {error} = await spabase.from("sample-User").insert([insertObj]);
        if (error) {
            throw error;
        }
        return NextResponse.json({
            message: "User created successfully",
        });
    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: "Internal Server Error",
        },{status: 500});
    }
}

async function isConflict(uuid: string) {
    const { data, error } = await spabase.from("sample-User").select("*").eq("uuid", uuid);
    if (error) {
        throw error;
    }
    if (data.length > 0) {
        return true;
    }
    return false;
}