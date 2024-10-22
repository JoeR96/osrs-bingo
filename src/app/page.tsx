import Link from "next/link";
import { mock } from "node:test";

const mockUrl = [
  "https://oldschool.runescape.wiki/images/%27perfect%27_necklace_detail_%28beta%29.png?3810f",
  "https://oldschool.runescape.wiki/images/%27perfect%27_necklace_detail_%28beta%29.png?3810f",
  "https://oldschool.runescape.wiki/images/%27perfect%27_necklace_detail_%28beta%29.png?3810f",
  "https://oldschool.runescape.wiki/images/%27perfect%27_necklace_detail_%28beta%29.png?3810f",
  "https://oldschool.runescape.wiki/images/%27perfect%27_necklace_detail_%28beta%29.png?3810f",
  "https://oldschool.runescape.wiki/images/%27perfect%27_necklace_detail_%28beta%29.png?3810f",
  "https://oldschool.runescape.wiki/images/%27perfect%27_necklace_detail_%28beta%29.png?3810f",
  "https://oldschool.runescape.wiki/images/%27perfect%27_necklace_detail_%28beta%29.png?3810f",
]
const mockImages = mockUrl.map((url, index) => ({
  id: index + 1,
  url,
}
))
export default function HomePage() {
  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {mockImages.map((image) => (
          <div key={image.id} className="w-48">
            <img src={image.url} alt="image" />
          </div>
        ))  }
      </div>
    </main>
  );
}
