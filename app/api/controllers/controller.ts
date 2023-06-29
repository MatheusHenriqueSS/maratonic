import { NextResponse } from "next/server";

export abstract class Controller {
    public abstract createCRUD(): CRUD;

    public async requestHandler(req: Request): Promise<Response> {
        const crud = this.createCRUD();

<<<<<<< HEAD
        if (req.method === "POST" && crud.create) {
            try {
                const data = await req.json();
                const objectCreated = await crud.create(data);
                return NextResponse.json(objectCreated, { status: 201 });
            } catch (error) {
                console.error(error);
                return NextResponse.json(
                    { error: "Internal server error" },
                    { status: 500 }
                );
            }
=======
    if (req.method === "POST" && crud.create) {
      try {
        const data = await req.json();
        const objectCreated = await crud.create(data);
        return NextResponse.json(objectCreated, { status: 201 });
      } catch (error) {
        console.error(error);
        return NextResponse.json(
          { error: "Internal server error" },
          { status: 500 }
        );
      }
    }

    if (req.method === "GET" && crud.getAll) {
      try {
        const results = await crud.getAll();
        return NextResponse.json(results, { status: 200 });
      } catch (error) {
        console.error(error);
        return NextResponse.json(
          { error: "Internal server error" },
          { status: 500 }
        );
      }
    }

    if (req.method === "PUT" && crud.updateById) {
      const id = new URL(req.url).searchParams.get("id");
      if (!id) {
        console.log("ID wasn't passed as parameter.");
        return NextResponse.json(
          { error: "Internal server error" },
          { status: 500 }
        );
      }
      try {
        const data = await req.json();
        const objectUpdated = crud.updateById(data, id);
        return NextResponse.json(objectUpdated, { status: 200 });
      } catch (error) {
        console.error(error);
        return NextResponse.json(
          { error: "Internal server error" },
          { status: 500 }
        );
      }
    }

    if (req.method === "DELETE" && crud.deleteById) {
      try {
        const id = new URL(req.url).searchParams.get("id");
        if (!id) {
          console.log("ID wasn't passed as parameter.");
          return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
          );
>>>>>>> develop
        }

        if (req.method === "GET" && crud.getAll) {
            try {
                const results = await crud.getAll();
                return NextResponse.json(results, { status: 200 });
            } catch (error) {
                console.error(error);
                return NextResponse.json(
                    { error: "Internal server error" },
                    { status: 500 }
                );
            }
        }

        if (req.method === "PUT" && crud.updateById) {
            const id = new URL(req.url).searchParams.get("id");
            if (!id) {
                console.log("ID wasn't passed as parameter.");
                return NextResponse.json(
                    { error: "Internal server error" },
                    { status: 500 }
                );
            }
            try {
                const data = await req.json();
                const objectUpdated = crud.updateById(data, id);
                return NextResponse.json(objectUpdated, { status: 200 });
            } catch (error) {
                console.error(error);
                return NextResponse.json(
                    { error: "Internal server error" },
                    { status: 500 }
                );
            }
        }

        if (req.method === "DELETE" && crud.deleteById) {
            try {
                const id = new URL(req.url).searchParams.get("id");
                if (!id) {
                    console.log("ID wasn't passed as parameter.");
                    return NextResponse.json(
                        { error: "Internal server error" },
                        { status: 500 }
                    );
                }
                await crud.deleteById(id);
                return NextResponse.json({}, { status: 204 });
            } catch (error) {
                console.error(error);
                return NextResponse.json(
                    { error: "Internal server error" },
                    { status: 500 }
                );
            }
        }

        return NextResponse.json({}, { status: 405 });
    }
}

export interface CRUD {
    create?(body: any): Promise<any>;
    getAll?(): Promise<any>;
    updateById?(object: any, id: string): Promise<any>;
    deleteById?(id: string): Promise<void>;
}
