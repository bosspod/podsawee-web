import { GradePage } from "@/components/grade/GradePage";
import { StructuredData } from "@/components/ui/StructuredData";
import { gradeMetadata, requestOrigin } from "@/lib/seo/metadata";
import { gradeStructuredData } from "@/lib/seo/gradeStructuredData";
export async function generateMetadata() { return gradeMetadata("th", await requestOrigin()); }
export default function Page() { return <><StructuredData data={gradeStructuredData("th")} /><GradePage locale="th" /></>; }
