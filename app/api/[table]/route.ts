import { Controller } from "../controllers/controller";
import ImagesController from "../controllers/images";
import CategoriesController from "../controllers/categories";
import ProblemsController from "../controllers/problems";
import UsersController from "../controllers/users";
import PostsController from "../controllers/posts";
import { NextResponse } from "next/server";

interface TableInfo {
  table: string;
}

interface Context {
  params: TableInfo;
}

function getTableController(tableName: string): Controller | undefined {
  if (tableName === "users") {
    return new UsersController();
  }

  if (tableName === "problems") {
    return new ProblemsController();
  }

  if (tableName === "categories") {
    return new CategoriesController();
  }

  if (tableName === "images") {
    return new ImagesController();
  }

  if (tableName === "posts") {
    return new PostsController();
  }
}

async function Handler(req: Request, tableName: string) {
  const controller = getTableController(tableName);
  if (!controller) {
    console.log(`Unknow table: ${tableName}`);
    return NextResponse.json(
      { error: `Unknown route: api/${tableName}` },
      { status: 500 }
    );
  }
  return controller.requestHandler(req);
}

export async function GET(req: Request, context: Context) {
  return await Handler(req, context.params.table);
}

export async function POST(req: Request, context: Context) {
  return await Handler(req, context.params.table);
}

export async function PUT(req: Request, context: Context) {
  return await Handler(req, context.params.table);
}

export async function DELETE(req: Request, context: Context) {
  return await Handler(req, context.params.table);
}
