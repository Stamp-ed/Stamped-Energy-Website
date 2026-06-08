import type { HiwJourneyStep } from "@/lib/content/types";

import { ConnectDiagram } from "./ConnectDiagram";
import { DecideDiagram } from "./DecideDiagram";
import { ExecuteDiagram } from "./ExecuteDiagram";
import { ObserveDiagram } from "./ObserveDiagram";
import { VerifyDiagram } from "./VerifyDiagram";

type StepDiagramProps = {
  diagram: HiwJourneyStep["diagram"];
};

export function StepDiagram({ diagram }: StepDiagramProps) {
  switch (diagram) {
    case "connect":
      return <ConnectDiagram />;
    case "observe":
      return <ObserveDiagram />;
    case "decide":
      return <DecideDiagram />;
    case "execute":
      return <ExecuteDiagram />;
    case "verify":
      return <VerifyDiagram />;
    default:
      return null;
  }
}
