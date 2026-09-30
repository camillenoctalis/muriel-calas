import { Eyebrow, Lines, delay } from "@/components/ui/Typography";
import { AudienceTabs } from "./AudienceTabs";

export function Audiences() {
  return (
    <section className="section-y relative isolate overflow-hidden bg-cream" aria-labelledby="publics-titre">
      <div aria-hidden="true" className="pointer-events-none absolute -right-[10%] -top-[20%] -z-10 h-[44rem] w-[44rem] rounded-full bg-[radial-gradient(closest-side,rgb(250_247_242/0.9),transparent)]" />
      <div className="wrap">
        <div className="mb-10 lg:mb-14">
          <Eyebrow>Pour qui ?</Eyebrow>
          <Lines
            id="publics-titre"
            className="display-lg mt-6"
            lines={["Sur le terrain, en examen", <>ou <em className="accent-italic text-navy">au bord du terrain.</em></>]}
          />
        </div>
        <div data-reveal style={delay(150)}>
          <AudienceTabs />
        </div>
      </div>
    </section>
  );
}
