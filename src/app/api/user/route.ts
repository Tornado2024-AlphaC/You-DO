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

    console.log("デバッグ"+JSON.stringify(body));

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
        const {error} = await spabase.from("sample-User").insert([insertObj]);
        if (error) {
            throw error;
        }
        return NextResponse.json({
            message: "User created successfully",
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            status: 500,
            message: "Internal Server Error",
        },{status: 500});
    }
}