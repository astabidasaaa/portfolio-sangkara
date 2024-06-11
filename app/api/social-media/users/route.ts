import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// let users = require("/db/social-media.json");

export const GET = async () => {
  const filePath = path.resolve("db/social-media.json");
  const jsonData = fs.readFileSync(filePath);

  const data = await JSON.parse(jsonData.toString());

  return NextResponse.json(
    {
      message: "Users",
      data: data.users,
    },
    { status: 201 }
  );
};

export const POST = async (req: NextRequest) => {
  const filePath = path.resolve("db/social-media.json");
  const jsonData = fs.readFileSync(filePath);

  const data = await JSON.parse(jsonData.toString());

  const { username, id } = await req.json();

  data.users.push({ id, username });

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  return NextResponse.json(
    {
      message: "User added",
      data,
    },
    { status: 201 }
  );
};
