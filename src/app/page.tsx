import Link from "next/link";
import { mock } from "node:test";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";



export default async function HomePage() {
  const images = await db.query.bingo_tasks.findMany({
    orderBy:(model, {desc}) => desc(model.id)
  });

  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {images.map((image) => (
          <div key={image.id} className="flex flex-col w-48">
            <img src={image.url}/>
            <div>{image.name}</div>
          </div>
        ))  }
      </div>
    </main>
  );
}
