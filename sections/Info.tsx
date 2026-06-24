import { phishingInfoItems } from "@/data/phishing-info";

export default function Info() {
  return (
    <section className="space-y-6 px-4 pb-10 lg:px-0">
      {phishingInfoItems.map(({ title, description }) => (
        <article key={title}>
          <h3 className="mb-4 text-xl font-bold">{title}</h3>
          <p className="text-sm text-gray-700">{description}</p>
        </article>
      ))}
    </section>
  );
}
