import { Eyebrow, Lines, delay } from "@/components/ui/Typography";
import { AudienceTabs } from "./AudienceTabs";

export function Audiences() {
  return (
    <section className="section-y bg-cream" aria-labelledby="publics-titre">
      <div className="wrap">
        <div className="mb-10 grid gap-8 lg:mb-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow>Pour qui ?</Eyebrow>
            <Lines
              id="publics-titre"
              className="display-lg mt-6"
              lines={["Sur le terrain, en examen", <>ou <em className="accent-italic text-navy">au bord du terrain.</em></>]}
            />
          </div></div>
        <div data-reveal style={delay(150)}>
          <AudienceTabs />
        </div>
      </div>
    </section>
  );
}
